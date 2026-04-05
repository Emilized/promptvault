// --- PRODUCT DATA ---
const products = [
    { id: 1, name: "2026 AI Starter Kit", price: 0, category: "Free", image: "kit.jpg" },
    { id: 2, name: "Hyper-Real Real Estate Pack", price: 49, category: "Business", image: "re.jpg" },
    { id: 3, name: "E-commerce Model Vault", price: 39, category: "Marketing", image: "model.jpg" }
];

let cart = JSON.parse(localStorage.getItem('pv_cart')) || [];

// --- CORE FUNCTIONS ---

// Step 6: Search & Filter Logic
export const renderProducts = (filterText = "") => {
    const container = document.getElementById('product-list');
    if (!container) return;

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(filterText.toLowerCase())
    );

    container.innerHTML = filtered.map(product => `
        <div class="product-card" style="background:var(--glass); padding:20px; border-radius:20px; border:1px solid var(--border);">
            <img src="${product.image}" onerror="this.src='https://via.placeholder.com/150'" style="width:100%; border-radius:10px; margin-bottom:15px;">
            <h4 style="margin:0;">${product.name}</h4>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                <span style="font-weight:800; color:var(--secondary)">$${product.price}</span>
                <button onclick="addToCart(${product.id})" class="btn-main" style="padding:8px 15px; font-size:0.8rem; background:var(--accent);">+ Add to Cart</button>
            </div>
        </div>
    `).join('');
};

// Step 5: Add to Cart & UI Feedback
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('pv_cart', JSON.stringify(cart));
    
    // Update Counter
    document.getElementById('cart-count-pill').innerText = cart.length;
    
    // Visual Feedback (Sales Notif)
    const notif = document.getElementById('sales-notif');
    document.getElementById('notif-text').innerText = `Added ${product.name} to cart!`;
    notif.style.display = 'flex';
    setTimeout(() => notif.style.display = 'none', 3000);
};

// Step 2 & 7: Auth & Payment Placeholders
window.handleEmailAuth = () => {
    const email = document.getElementById('email-field').value;
    if(email) {
        alert(`Welcome, ${email}! Accessing the Vault...`);
        UI.modal('auth-overlay', 'close');
        document.getElementById('login-pill').innerText = "Account";
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Event Listener for Search Bar
    const searchInput = document.getElementById('vault-search');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => renderProducts(e.target.value));
    }
    
    // Sync cart count on load
    document.getElementById('cart-count-pill').innerText = cart.length;
});
