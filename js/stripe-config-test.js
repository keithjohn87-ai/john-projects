// Stripe Configuration - TEST MODE
// ContractorPro Payment Processing (Test Environment)
// Use this for testing checkout flows without real charges

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51T8L2EFKOFIqbTF2Zt79ELCMBKWEMjIpxarieIxIO8OVN0qONuk5zVmrEZ7eJY5bZkLMEAK0KFmeHf5bAvQ03qMX000yLraoqV';

// Test Product price IDs from Stripe Dashboard (Test Mode)
// Updated: March 8, 2026 with actual test price IDs
const STRIPE_PRICE_IDS = {
    'essential': 'price_1T8oGsFKOFIqbTF2iX9SrA82',      // $79 - Essential Forms
    'professional': 'price_1T8oGSFKOFIqbTF2e4ApNmCh',   // $149 - Professional Package
    'business': 'price_1T8oFxFKOFIqbTF2JAub1ACs',       // $199 - Business System
    'complete': 'price_1T8oFVFKOFIqbTF2TNPldU2h',       // $249 - Complete Bundle
    'sba': 'price_1T8oF4FKOFIqbTF2xXFxNoC1'             // $99 - SBA Guide
};

// Test Mode Flag
const STRIPE_TEST_MODE = true;

// Initialize Stripe (with fallback for when script loads before Stripe library)
let stripe = null;
let stripeInitialized = false;

function initStripe() {
    if (typeof Stripe !== 'undefined') {
        try {
            stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
            stripeInitialized = true;
            console.log('✅ Stripe initialized in test mode');
            return true;
        } catch (e) {
            console.error('❌ Stripe initialization error:', e);
            return false;
        }
    }
    console.error('❌ Stripe library not loaded');
    return false;
}

// Try to initialize immediately (if Stripe is already loaded)
if (typeof Stripe !== 'undefined') {
    initStripe();
} else {
    // Wait for Stripe to load
    window.addEventListener('load', function() {
        initStripe();
        // Re-export after Stripe loads
        if (stripeInitialized) {
            window.StripeCheckout = {
                redirectToCheckout,
                processCheckout
            };
            console.log('🔧 StripeCheckout re-exported after Stripe loaded');
        }
    });
}

// Checkout with Stripe Checkout (client-side only)
async function redirectToCheckout(tier) {
    // Ensure Stripe is initialized
    if (!stripe && !initStripe()) {
        alert('Payment system not ready. Please refresh the page and try again.');
        return;
    }
    
    const priceId = STRIPE_PRICE_IDS[tier];
    if (!priceId) {
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

    console.log('Starting Stripe checkout with:', { priceId, email, stripe: !!stripe });
    
    // Mobile-friendly debug output
    function showDebug(msg) {
        console.log(msg);
        const debugDiv = document.getElementById('stripe-debug') || document.createElement('div');
        debugDiv.id = 'stripe-debug';
        debugDiv.style.cssText = 'position:fixed;bottom:10px;left:10px;right:10px;background:#000;color:#0f0;padding:10px;z-index:99999;font-size:12px;max-height:200px;overflow:auto;';
        debugDiv.innerHTML += '<div>' + new Date().toLocaleTimeString() + ': ' + msg + '</div>';
        if (!document.getElementById('stripe-debug')) {
            document.body.appendChild(debugDiv);
        }
    }
    
    showDebug('Checkout starting...');
    showDebug('PriceID: ' + priceId);
    showDebug('Stripe ready: ' + !!stripe);
    
    try {
        showDebug('Calling stripe.redirectToCheckout...');
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            successUrl: 'https://contrpro.com/success.html',
            cancelUrl: 'https://contrpro.com/cancel.html',
            customerEmail: email
        });

        if (error) {
            console.error('Stripe error:', error);
            showDebug('ERROR: ' + error.message);
            alert('Unable to start checkout: ' + error.message);
        } else {
            showDebug('Redirect should have started...');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        showDebug('CATCH ERROR: ' + error.message);
        alert('Checkout error: ' + error.message);
    }
}

// Process cart checkout with multiple items
async function processCheckout() {
    // Ensure Stripe is initialized
    if (!stripe && !initStripe()) {
        alert('Payment system not ready. Please refresh the page and try again.');
        return;
    }
    
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

    // Determine primary tier for delivery (complete > business > professional > essential)
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

    // Build line items from cart
    const lineItems = cart.items.map(item => ({
        price: STRIPE_PRICE_IDS[item.id],
        quantity: 1
    })).filter(item => item.price);
    
    console.log('Cart items:', cart.items);
    console.log('Line items for Stripe:', lineItems);

    if (lineItems.length === 0) {
        alert('No valid items in cart');
        console.error('No valid line items. Cart items:', cart.items);
        return;
    }

    console.log('Starting processCheckout with lineItems:', lineItems);
    
    try {
        const result = await stripe.redirectToCheckout({
            lineItems: lineItems,
            mode: 'payment',
            successUrl: 'https://contrpro.com/success.html',
            cancelUrl: 'https://contrpro.com/cancel.html',
            customerEmail: email
        });

        if (result.error) {
            console.error('Stripe error:', result.error);
            alert('Checkout error: ' + result.error.message);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Checkout error: ' + error.message);
    }
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

// Global error handler for debugging
window.addEventListener('error', function(e) {
    console.error('🚨 Stripe Config Error:', e.message, 'at', e.filename, ':', e.lineno);
});

console.log('🔧 Stripe Test Mode Loaded');
console.log('Account:', '51T8L2E');
console.log('Stripe object available:', typeof Stripe !== 'undefined');
console.log('StripeCheckout exported:', typeof window.StripeCheckout !== 'undefined');
