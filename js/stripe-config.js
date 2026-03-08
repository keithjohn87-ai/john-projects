// Stripe Configuration
// Replace with your actual Stripe publishable key after account setup
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE';

// Product price IDs (create these in your Stripe Dashboard)
const STRIPE_PRICE_IDS = {
    'essential': 'price_essential_forms',      // $79
    'professional': 'price_professional',       // $149
    'business': 'price_business_system',        // $199
    'complete': 'price_complete_bundle',        // $249
    'sba': 'price_sba_guide'                    // $99
};

// Initialize Stripe (will work once key is added)
let stripe;
if (STRIPE_PUBLISHABLE_KEY !== 'pk_test_YOUR_KEY_HERE') {
    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
}

// Checkout function
async function redirectToCheckout(tier) {
    // For now, show setup message
    if (STRIPE_PUBLISHABLE_KEY === 'pk_test_YOUR_KEY_HERE') {
        showStripeSetupModal();
        return;
    }

    const priceId = STRIPE_PRICE_IDS[tier];
    if (!priceId) {
        alert('Invalid product selected');
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: priceId,
                tier: tier
            }),
        });

        const session = await response.json();

        if (session.error) {
            console.error('Error:', session.error);
            alert('Unable to initiate checkout. Please try again.');
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Checkout service temporarily unavailable. Please try again later.');
    }
}

// Show setup modal for Stripe configuration
function showStripeSetupModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🚀 Almost Ready!</h2>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <p>To enable payments, you need to:</p>
                <ol style="margin: 1rem 0; padding-left: 1.5rem;">
                    <li>Create a <a href="https://stripe.com" target="_blank">Stripe account</a></li>
                    <li>Add your products in the Stripe Dashboard</li>
                    <li>Copy your publishable key to <code>js/stripe-config.js</code></li>
                    <li>Set up the checkout backend (Netlify Functions or similar)</li>
                </ol>
                <p style="margin-top: 1rem; padding: 1rem; background: #e3f2fd; border-radius: 8px;">
                    <strong>Need help?</strong> This takes about 30 minutes to set up.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal(this)">Close</button>
                <a href="https://stripe.com/docs/payments/checkout" target="_blank" class="btn btn-primary">Stripe Docs →</a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Close modal helper
function closeModal(element) {
    const modal = element.closest('.modal');
    if (modal) {
        modal.remove();
    }
}

// Cart functionality (simplified for Stripe)
let cart = [];

function addToCart(tier) {
    // For Stripe Checkout, we redirect immediately
    redirectToCheckout(tier);
}

function showCart() {
    showStripeSetupModal();
}

// Export for use in other scripts
window.StripeCheckout = {
    redirectToCheckout,
    addToCart,
    showCart
};
