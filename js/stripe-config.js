// Stripe Payment Links Configuration
// ContractorPro Payment Processing via Stripe Payment Links
// Simple redirect-based checkout (no embedded Stripe.js needed)

// Payment Links from Stripe Dashboard (Live Mode)
const PAYMENT_LINKS = {
    'essential': 'https://buy.stripe.com/bJebJ1812a8090o42w6sw02',      // Essential Forms
    'professional': 'https://buy.stripe.com/4gM00jepqdkca4s0Qk6sw04',   // Professional Package
    'business': 'https://buy.stripe.com/8x228r1CE1Bu6Sg9mQ6sw03',       // Business System
    'complete': 'https://buy.stripe.com/7sY3cv5SU93WgsQ2Ys6sw01',       // Complete Bundle
    'sba': 'https://buy.stripe.com/6oUbJ10yAfsk3G42Ys6sw00'             // SBA Guide
};

// Product names for reference
const PRODUCT_NAMES = {
    'essential': 'Essential Forms',
    'professional': 'Professional Package',
    'business': 'Business System',
    'complete': 'Complete Bundle',
    'sba': 'SBA Funding Guide'
};

// Checkout with Payment Link (simple redirect)
function redirectToCheckout(tier) {
    const paymentUrl = PAYMENT_LINKS[tier];
    if (!paymentUrl) {
        alert('Invalid product selected');
        return;
    }

    // Store checkout data for post-purchase delivery
    const email = prompt('Please enter your email address for delivery:');
    if (!email || !email.includes('@')) {
        alert('Valid email required for product delivery');
        return;
    }

    // Store for delivery processing
    if (window.EmailDelivery) {
        window.EmailDelivery.storeCheckoutData(email, tier);
    } else {
        localStorage.setItem('lastCheckout', JSON.stringify({
            email: email,
            tier: tier,
            timestamp: Date.now()
        }));
    }

    console.log('Redirecting to Stripe Payment Link:', { tier, paymentUrl, email });
    
    // Redirect to Stripe Payment Link
    window.location.href = paymentUrl;
}

// Process cart checkout with multiple items
// For Payment Links, we'll redirect to the highest-tier item
// (Payment Links don't support multi-item carts directly)
function processCheckout() {
    const cart = JSON.parse(localStorage.getItem('contractorProCart') || '{"items":[]}');
    
    if (!cart.items || cart.items.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Get email for delivery
    const email = prompt('Please enter your email address for delivery:');
    if (!email || !email.includes('@')) {
        alert('Valid email required for product delivery');
        return;
    }

    // Determine primary tier for delivery (complete > business > professional > essential > sba)
    const tierPriority = ['complete', 'business', 'professional', 'essential', 'sba'];
    let primaryTier = cart.items[0].id;
    for (const tier of tierPriority) {
        if (cart.items.some(item => item.id === tier)) {
            primaryTier = tier;
            break;
        }
    }

    // Store for delivery processing
    if (window.EmailDelivery) {
        window.EmailDelivery.storeCheckoutData(email, primaryTier);
    } else {
        localStorage.setItem('lastCheckout', JSON.stringify({
            email: email,
            tier: primaryTier,
            timestamp: Date.now()
        }));
    }

    // If multiple items, show a note
    if (cart.items.length > 1) {
        const itemNames = cart.items.map(item => PRODUCT_NAMES[item.id] || item.id).join(', ');
        alert(`Note: You have ${cart.items.length} items in cart (${itemNames}). Redirecting to checkout for ${PRODUCT_NAMES[primaryTier]}.`);
    }

    // Redirect to Payment Link
    const paymentUrl = PAYMENT_LINKS[primaryTier];
    console.log('Cart checkout redirecting to:', { primaryTier, paymentUrl, email });
    window.location.href = paymentUrl;
}

// Close modal helper
function closeModal(element) {
    const modal = element.closest('.modal');
    if (modal) {
        modal.remove();
    }
}

// Export for use in other scripts
window.StripeCheckout = {
    redirectToCheckout,
    processCheckout
};

console.log('✅ Stripe Payment Links Loaded');
console.log('Available products:', Object.keys(PAYMENT_LINKS));
