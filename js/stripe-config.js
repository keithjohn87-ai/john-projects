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

// Map the storefront's contractor-type cards to the backend's sub-trade
// codes. 'general' is intentionally absent: a GC gets the state-only ref,
// which the backend resolves to the Complete-GC variant. The backend's
// _SUB_TRADES are ("steel","plumbing","electrical","mechanical").
const CONTRACTOR_TYPE_TO_TRADE = {
    structural: 'steel',
    plumbing: 'plumbing',
    electrical: 'electrical',
    mechanical: 'mechanical'
};

// Build the client_reference_id the webhook backend parses to pick the
// state-tailored (and, for the Complete tier, trade-specific) zip. Shapes:
//   "TN"            → state-only  → Complete-GC / state-tailored lower tiers
//   "TN__plumbing"  → state+trade → Complete-Sub-Plumbing
// No selected state → return null and let the backend fall back to the
// legacy non-tailored bundle.
function buildClientRef() {
    const state = (localStorage.getItem('selectedState') || '').trim().toUpperCase();
    if (!state) return null;
    const type = (localStorage.getItem('contractorType') || '').trim().toLowerCase();
    const trade = CONTRACTOR_TYPE_TO_TRADE[type];
    return trade ? `${state}__${trade}` : state;
}

// Append the client_reference_id to a Stripe Payment Link URL.
function withClientRef(url) {
    const ref = buildClientRef();
    if (!ref) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}client_reference_id=${encodeURIComponent(ref)}`;
}

// Checkout with Payment Link (simple redirect)
function redirectToCheckout(tier) {
    const paymentUrl = PAYMENT_LINKS[tier];
    if (!paymentUrl) {
        alert('Invalid product selected');
        return;
    }
    // Delivery is now server-side via the ContrPro webhook backend.
    // Stripe collects the customer's email at checkout and pings the
    // backend on payment completion — no need to ask the browser. The
    // backend sends a signed download link to the email Stripe captured.
    // We ride the buyer's state + trade selection through to the backend
    // via client_reference_id so they get the state-tailored zip.
    const finalUrl = withClientRef(paymentUrl);
    console.log('Redirecting to Stripe Payment Link:', { tier, finalUrl });
    window.location.href = finalUrl;
}

// Process cart checkout with multiple items.
// For Payment Links, we redirect to the highest-tier item (Payment Links
// don't support multi-item carts directly). The webhook backend will
// deliver whichever single tier Stripe charges for.
function processCheckout() {
    const cart = JSON.parse(localStorage.getItem('contractorProCart') || '{"items":[]}');

    if (!cart.items || cart.items.length === 0) {
        alert('Your cart is empty');
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

    if (cart.items.length > 1) {
        const itemNames = cart.items.map(item => PRODUCT_NAMES[item.id] || item.id).join(', ');
        alert(`Note: You have ${cart.items.length} items in cart (${itemNames}). Redirecting to checkout for ${PRODUCT_NAMES[primaryTier]}.`);
    }

    const paymentUrl = withClientRef(PAYMENT_LINKS[primaryTier]);
    console.log('Cart checkout redirecting to:', { primaryTier, paymentUrl });
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
