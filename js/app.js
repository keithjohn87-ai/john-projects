/**
 * ContractorPro - Construction Business Framework
 * Main Application JavaScript
 */

// Cart State
let cart = {
    items: [],
    hasTier: false
};

// Pricing Configuration
const PRICING = {
    starter: { id: 'starter', name: 'Starter Package', price: 99 },
    professional: { id: 'professional', name: 'Professional Package', price: 199 },
    enterprise: { id: 'enterprise', name: 'Enterprise Package', price: 299 },
    sba: { id: 'sba', name: 'SBA Funding Guide', standalonePrice: 99, addonPrice: 49 }
};

// State Data
const STATE_NAMES = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
    CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
    HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
    KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
    MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
    NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
    OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartUI();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
}

// Cart Functions
function addToCart(itemId) {
    const item = PRICING[itemId];
    if (!item) return;

    // Check if item already in cart
    const existingIndex = cart.items.findIndex(i => i.id === itemId);
    
    if (existingIndex > -1) {
        // Remove if already exists (toggle behavior)
        cart.items.splice(existingIndex, 1);
    } else {
        // Determine price for SBA
        let price = item.price;
        if (itemId === 'sba') {
            price = cart.hasTier ? item.addonPrice : item.standalonePrice;
        }

        cart.items.push({
            id: itemId,
            name: item.name,
            price: price,
            originalPrice: itemId === 'sba' ? item.standalonePrice : null
        });
    }

    // Update hasTier flag
    cart.hasTier = cart.items.some(i => ['starter', 'professional', 'enterprise'].includes(i.id));

    // Recalculate SBA price if needed
    updateSBAPricing();

    saveCart();
    updateCartUI();
    showCart();
}

function updateSBAPricing() {
    const sbaItem = cart.items.find(i => i.id === 'sba');
    if (sbaItem) {
        const newPrice = cart.hasTier ? PRICING.sba.addonPrice : PRICING.sba.standalonePrice;
        sbaItem.price = newPrice;
    }
}

function removeFromCart(itemId) {
    cart.items = cart.items.filter(i => i.id !== itemId);
    cart.hasTier = cart.items.some(i => ['starter', 'professional', 'enterprise'].includes(i.id));
    
    // Recalculate SBA price if still in cart
    updateSBAPricing();
    
    saveCart();
    updateCartUI();
}

function getCartTotal() {
    return cart.items.reduce((total, item) => total + item.price, 0);
}

function getCartCount() {
    return cart.items.length;
}

function saveCart() {
    localStorage.setItem('contractorProCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('contractorProCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

function clearCart() {
    cart = { items: [], hasTier: false };
    saveCart();
    updateCartUI();
}

// UI Updates
function updateCartUI() {
    const count = getCartCount();
    const total = getCartTotal();

    // Update badges
    document.querySelectorAll('#cartCount, #cartCountMobile').forEach(el => {
        if (el) el.textContent = count;
    });

    // Update cart modal content
    updateCartModal();
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;

    if (cart.items.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add a package to get started</p>
                <button class="btn btn-primary" onclick="hideCart(); scrollToSection('pricing')">View Packages</button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">📦</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    ${item.originalPrice ? `<p style="text-decoration: line-through; color: #9ca3af;">$${item.originalPrice}</p>` : ''}
                </div>
                <div class="cart-item-price">$${item.price}</div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `).join('');
    }

    if (cartTotal) {
        cartTotal.textContent = `$${total}`;
    }
}

// Modal Functions
function showCart() {
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showAccountModal() {
    document.getElementById('accountModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideAccountModal() {
    document.getElementById('accountModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showCheckoutModal() {
    hideCart();
    updateCheckoutSummary();
    document.getElementById('checkoutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showSuccessModal() {
    hideCheckoutModal();
    document.getElementById('successModal').classList.add('active');
}

function hideSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = '';
    clearCart();
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Checkout
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (!checkoutItems) return;

    checkoutItems.innerHTML = cart.items.map(item => `
        <div class="checkout-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>
    `).join('');

    if (checkoutTotal) {
        checkoutTotal.textContent = `$${getCartTotal()}`;
    }
}

function processPayment() {
    // Simulate payment processing
    const btn = document.querySelector('#checkoutModal .btn-primary');
    if (btn) {
        btn.textContent = 'Processing...';
        btn.disabled = true;
    }

    setTimeout(() => {
        showSuccessModal();
        if (btn) {
            btn.textContent = 'Complete Purchase';
            btn.disabled = false;
        }
    }, 1500);
}

// Tab Switching
function switchTab(tabId) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId + 'Tab');
    });
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    // Simulate login
    showNotification('Welcome back!', 'success');
    hideAccountModal();
}

function handleRegister(e) {
    e.preventDefault();
    // Simulate registration
    showNotification('Account created successfully!', 'success');
    hideAccountModal();
}

// State Navigation
function navigateToState() {
    const stateSelect = document.getElementById('stateSelect');
    const stateCode = stateSelect.value;
    
    if (stateCode) {
        // Navigate to the state-specific page
        window.location.href = `./state/${stateCode}/index.html`;
    }
}

function showStateInfo(stateCode) {
    const stateName = STATE_NAMES[stateCode];
    
    // Create and show state modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'stateModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeStateModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${stateName} Resources</h2>
                <button class="close-btn" onclick="closeStateModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="state-resources">
                    <div class="resource-card">
                        <h4>📋 Licensing Requirements</h4>
                        <ul>
                            <li>General Contractor License</li>
                            <li>Trade-specific licenses</li>
                            <li>Continuing education</li>
                        </ul>
                    </div>
                    <div class="resource-card">
                        <h4>⚖️ Lien Laws</h4>
                        <ul>
                            <li>Preliminary notice requirements</li>
                            <li>Mechanics lien deadlines</li>
                            <li>Notice of intent templates</li>
                        </ul>
                    </div>
                    <div class="resource-card">
                        <h4>📄 Required Documents</h4>
                        <ul>
                            <li>Contract templates</li>
                            <li>Change order forms</li>
                            <li>Certificate of completion</li>
                        </ul>
                    </div>
                    <div class="resource-card">
                        <h4>🔗 Quick Links</h4>
                        <ul>
                            <li><a href="#">${stateName} Contractor Board</a></li>
                            <li><a href="#">Secretary of State</a></li>
                            <li><a href="#">Tax Registration</a></li>
                        </ul>
                    </div>
                </div>
                <button class="btn btn-primary btn-full" onclick="closeStateModal()" style="margin-top: 1.5rem;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeStateModal() {
    const modal = document.getElementById('stateModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Account for fixed nav
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

function showNotification(message, type = 'info') {
    // Simple notification - could be enhanced
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#22c55e' : '#1e3a5f'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .state-resources {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .resource-card {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
    }
    .resource-card h4 {
        font-weight: 600;
        margin-bottom: 0.75rem;
        font-size: 0.875rem;
    }
    .resource-card ul {
        list-style: none;
        font-size: 0.875rem;
    }
    .resource-card li {
        padding: 0.25rem 0;
        color: #4b5563;
    }
    .resource-card a {
        color: #1e3a5f;
        text-decoration: none;
    }
    .resource-card a:hover {
        text-decoration: underline;
    }
    @media (max-width: 640px) {
        .state-resources {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
