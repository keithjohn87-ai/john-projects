// EmailJS Integration for Product Delivery
// ContractorPro - Automatic product delivery via email

// EmailJS Configuration
// ContractorPro Email Delivery
const EMAILJS_CONFIG = {
    publicKey: 'pGbHyVfGzZIP1-ipO',      // Account API key
    serviceId: 'service_rax06vu',        // Gmail service
    templateId: 'template_gilqz69'       // Product delivery template
};

// Initialize EmailJS (call this on page load)
function initEmailJS() {
    console.log('Initializing EmailJS...');
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS library not loaded');
        return false;
    }
    if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        console.warn('EmailJS public key not configured');
        return false;
    }
    try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
        return true;
    } catch (error) {
        console.error('EmailJS init failed:', error);
        return false;
    }
}

// Send product delivery email
async function sendProductEmail(customerEmail, tier, paymentId, customerName = '') {
    const product = window.ProductDelivery.config.products[tier];
    if (!product) {
        console.error('Unknown product tier:', tier);
        return { success: false, error: 'Invalid product' };
    }

    // Generate download token
    const downloadToken = window.ProductDelivery.generateDownloadToken(customerEmail, tier, paymentId);
    const downloadUrl = `${window.location.origin}/download.html?token=${downloadToken}`;

    // Check if EmailJS is ready
    if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        console.log('EmailJS not configured - logging for manual delivery');
        console.log('====================================');
        console.log('DELIVERY REQUIRED:');
        console.log('To:', customerEmail);
        console.log('Product:', product.name);
        console.log('Download URL:', downloadUrl);
        console.log('====================================');
        
        // Store for manual follow-up
        storePendingDelivery(customerEmail, tier, paymentId, downloadUrl);
        
        return { 
            success: false, 
            manual: true, 
            downloadUrl,
            message: 'Email service not configured - delivery logged for manual processing'
        };
    }

    // Prepare template parameters (matching EmailJS template variables)
    // Note: EmailJS template should use {{to_name}}, {{product_name}}, {{download_link}}, etc.
    const templateParams = {
        to_name: customerName || customerEmail.split('@')[0],
        to_email: customerEmail,
        product_name: product.name,
        download_link: downloadUrl,
        expires_in: '72 hours',
        file_count: product.files.length,
        support_email: 'support@contrpro.com',
        reply_to: 'support@contrpro.com'
    };

    try {
        console.log('Sending email with params:', templateParams);
        console.log('Service ID:', EMAILJS_CONFIG.serviceId);
        console.log('Template ID:', EMAILJS_CONFIG.templateId);
        console.log('Public Key:', EMAILJS_CONFIG.publicKey.substring(0, 10) + '...');
        
        // Debug: Verify emailjs is properly initialized
        if (!emailjs || typeof emailjs.send !== 'function') {
            throw new Error('EmailJS not properly initialized');
        }
        
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams,
            EMAILJS_CONFIG.publicKey
        );

        console.log('Email sent successfully:', response);
        
        // Store delivery record
        storeDeliveryRecord(customerEmail, tier, paymentId, downloadToken, 'sent');
        
        return { 
            success: true, 
            downloadUrl,
            messageId: response.status
        };

    } catch (error) {
        console.error('Email send failed:', error);
        
        // Store for retry
        storePendingDelivery(customerEmail, tier, paymentId, downloadUrl);
        
        return { 
            success: false, 
            error: error.message,
            manual: true,
            downloadUrl
        };
    }
}

// Store pending delivery for manual processing
function storePendingDelivery(email, tier, paymentId, downloadUrl) {
    const pending = JSON.parse(localStorage.getItem('pendingDeliveries') || '[]');
    pending.push({
        email,
        tier,
        paymentId,
        downloadUrl,
        timestamp: Date.now(),
        status: 'pending'
    });
    localStorage.setItem('pendingDeliveries', JSON.stringify(pending));
}

// Store successful delivery record
function storeDeliveryRecord(email, tier, paymentId, token, status) {
    const deliveries = JSON.parse(localStorage.getItem('deliveryRecords') || '[]');
    deliveries.push({
        email,
        tier,
        paymentId,
        token,
        status,
        timestamp: Date.now()
    });
    localStorage.setItem('deliveryRecords', JSON.stringify(deliveries));
}

// Get pending deliveries (for admin dashboard)
function getPendingDeliveries() {
    return JSON.parse(localStorage.getItem('pendingDeliveries') || '[]');
}

// Clear pending delivery after manual processing
function clearPendingDelivery(paymentId) {
    const pending = JSON.parse(localStorage.getItem('pendingDeliveries') || '[]');
    const filtered = pending.filter(d => d.paymentId !== paymentId);
    localStorage.setItem('pendingDeliveries', JSON.stringify(filtered));
}

// Process delivery from Stripe success
async function processStripeSuccess(sessionId) {
    // In production, verify session with backend
    // For now, extract from URL or localStorage
    const checkoutData = JSON.parse(localStorage.getItem('lastCheckout') || '{}');
    
    if (!checkoutData.email || !checkoutData.tier) {
        console.error('No checkout data found');
        return { success: false, error: 'No checkout data' };
    }

    return await sendProductEmail(
        checkoutData.email,
        checkoutData.tier,
        sessionId,
        checkoutData.name
    );
}

// Store checkout data before redirecting to Stripe
function storeCheckoutData(email, tier, name = '') {
    localStorage.setItem('lastCheckout', JSON.stringify({
        email,
        tier,
        name,
        timestamp: Date.now()
    }));
}

// Export functions
window.EmailDelivery = {
    init: initEmailJS,
    send: sendProductEmail,
    processStripeSuccess,
    storeCheckoutData,
    getPendingDeliveries,
    clearPendingDelivery,
    config: EMAILJS_CONFIG
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', initEmailJS);