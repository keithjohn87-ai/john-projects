// Product Delivery Configuration
// This handles email delivery of purchased products

const DELIVERY_CONFIG = {
    // Email service configuration (using EmailJS or similar)
    emailService: 'emailjs', // or 'sendgrid', 'mailgun', 'aws-ses'
    
    // Product file mappings - define what each tier includes
    products: {
        'essential': {
            name: 'Essential Forms Package',
            files: [
                'templates/Preliminary_Notice_Template.html',
                'templates/Mechanics_Lien_Form.html',
                'templates/Release_of_Lien.html',
                'templates/Construction_Contract.html',
                'data/50_State_Lien_Laws_Reference.pdf'
            ],
            readme: 'products/essential/README.md'
        },
        'professional': {
            name: 'Professional Package',
            files: [
                // All Essential files
                'templates/Preliminary_Notice_Template.html',
                'templates/Mechanics_Lien_Form.html',
                'templates/Release_of_Lien.html',
                'templates/Construction_Contract.html',
                'data/50_State_Lien_Laws_Reference.pdf',
                // Professional additions
                'products/templates/Job_Costing_Spreadsheet.csv',
                'products/templates/Change_Order_Log.csv',
                'products/templates/AR_Tracker.csv',
                'products/templates/Subcontractor_Tracker.csv'
            ],
            readme: 'products/professional/README.md'
        },
        'business': {
            name: 'Business System Package',
            files: [
                // All Professional files
                'templates/Preliminary_Notice_Template.html',
                'templates/Mechanics_Lien_Form.html',
                'templates/Release_of_Lien.html',
                'templates/Construction_Contract.html',
                'data/50_State_Lien_Laws_Reference.pdf',
                'products/templates/Job_Costing_Spreadsheet.csv',
                'products/templates/Change_Order_Log.csv',
                'products/templates/AR_Tracker.csv',
                'products/templates/Subcontractor_Tracker.csv',
                // Business System additions
                'products/templates/Project_Tracker.csv',
                'products/templates/AP_Tracker.csv',
                'products/templates/COI_Tracker.csv',
                'products/templates/Subcontractor_Tracker_Pro.csv',
                'products/sba/SBA_Funding_Guide.pdf'
            ],
            readme: 'products/business/README.md'
        },
        'complete': {
            name: 'Complete Bundle',
            files: [
                // Everything
                'templates/Preliminary_Notice_Template.html',
                'templates/Mechanics_Lien_Form.html',
                'templates/Release_of_Lien.html',
                'templates/Construction_Contract.html',
                'data/50_State_Lien_Laws_Reference.pdf',
                'products/templates/Job_Costing_Spreadsheet.csv',
                'products/templates/Change_Order_Log.csv',
                'products/templates/AR_Tracker.csv',
                'products/templates/Subcontractor_Tracker.csv',
                'products/templates/Project_Tracker.csv',
                'products/templates/AP_Tracker.csv',
                'products/templates/COI_Tracker.csv',
                'products/templates/Subcontractor_Tracker_Pro.csv',
                'products/sba/SBA_Funding_Guide.pdf',
                // Bonus materials
                'products/bonus/Contractor_Business_Plan_Template.docx',
                'products/bonus/Marketing_Playbook.pdf'
            ],
            readme: 'products/complete/README.md'
        },
        'sba': {
            name: 'SBA Funding Guide',
            files: [
                'products/sba/SBA_Funding_Guide.pdf',
                'products/sba/Loan_Application_Checklist.docx',
                'products/sba/Financial_Projections_Template.xlsx'
            ],
            readme: 'products/sba/README.md'
        }
    },
    
    // Download link expiration (hours)
    linkExpiration: 72,
    
    // Maximum download attempts
    maxDownloads: 5
};

// Simulate delivery (for testing before email service is configured)
function simulateDelivery(email, tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        console.error('Unknown product tier:', tier);
        return false;
    }
    
    console.log('=== PRODUCT DELIVERY SIMULATION ===');
    console.log('To:', email);
    console.log('Product:', product.name);
    console.log('Files included:', product.files.length);
    console.log('Files:');
    product.files.forEach(file => console.log('  -', file));
    console.log('README:', product.readme);
    console.log('Link expires in:', DELIVERY_CONFIG.linkExpiration, 'hours');
    console.log('Max downloads:', DELIVERY_CONFIG.maxDownloads);
    console.log('====================================');
    
    return true;
}

// Send delivery email (placeholder for actual implementation)
async function sendDeliveryEmail(email, tier, paymentId) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        throw new Error('Unknown product tier: ' + tier);
    }
    
    // Generate unique download token
    const downloadToken = generateDownloadToken(email, tier, paymentId);
    const downloadUrl = `${window.location.origin}/download.html?token=${downloadToken}`;
    
    // For now, simulate the delivery
    if (DELIVERY_CONFIG.emailService === 'emailjs') {
        // EmailJS integration would go here
        // Example:
        // await emailjs.send('service_id', 'template_id', {
        //     to_email: email,
        //     product_name: product.name,
        //     download_link: downloadUrl,
        //     expires_in: DELIVERY_CONFIG.linkExpiration
        // });
        
        console.log('Email would be sent via EmailJS');
        simulateDelivery(email, tier);
        return { success: true, downloadUrl, token: downloadToken };
    }
    
    // Fallback: log for manual delivery
    console.log('Email service not configured. Manual delivery required.');
    simulateDelivery(email, tier);
    return { success: false, manual: true, downloadUrl };
}

// Generate secure download token
function generateDownloadToken(email, tier, paymentId) {
    // Simple token generation - in production use crypto
    const timestamp = Date.now();
    const data = `${email}:${tier}:${paymentId}:${timestamp}`;
    return btoa(data).replace(/=/g, '');
}

// Verify download token
function verifyDownloadToken(token) {
    try {
        const decoded = atob(token);
        const [email, tier, paymentId, timestamp] = decoded.split(':');
        
        // Check expiration
        const age = Date.now() - parseInt(timestamp);
        const maxAge = DELIVERY_CONFIG.linkExpiration * 60 * 60 * 1000;
        
        if (age > maxAge) {
            return { valid: false, error: 'Link expired' };
        }
        
        return { valid: true, email, tier, paymentId };
    } catch (e) {
        return { valid: false, error: 'Invalid token' };
    }
}

// Get product files for download
function getProductFiles(tier) {
    const product = DELIVERY_CONFIG.products[tier];
    return product ? product.files : [];
}

// Create zip package (would need JSZip library in production)
async function createZipPackage(tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) return null;
    
    console.log('Creating zip package for:', product.name);
    console.log('Files to include:', product.files);
    
    // In production, use JSZip to create actual zip
    // const zip = new JSZip();
    // for (const file of product.files) {
    //     const content = await fetch(file).then(r => r.blob());
    //     zip.file(file.split('/').pop(), content);
    // }
    // return zip.generateAsync({type: 'blob'});
    
    return {
        name: `${tier}_package.zip`,
        files: product.files,
        readme: product.readme
    };
}

// Export for use
window.ProductDelivery = {
    config: DELIVERY_CONFIG,
    sendDeliveryEmail,
    simulateDelivery,
    verifyDownloadToken,
    getProductFiles,
    createZipPackage
};
