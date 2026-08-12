/* ==========================================================================
   AURA FINE ARTISANAL JEWELLERY - APPLICATION LOGIC
   ========================================================================== */

// 1. PRODUCTS DATASET
const PRODUCTS = [
    {
        id: 'aura-001',
        title: 'AURA Solitaire Diamond Ring',
        category: 'Rings',
        price: 2450,
        karat: '18K Yellow Gold',
        gemstone: '1.50 Carat Solitaire Diamond (VVS1 / Color D)',
        rating: 4.9,
        reviews: 42,
        image: 'assets/images/ring-diamond.jpg',
        badge: 'BEST SELLER',
        description: 'Exquisite 18K yellow gold band holding a brilliant round-cut 1.50 carat solitaire diamond with ultra-clean VVS1 clarity and BIS hallmarked certification.'
    },
    {
        id: 'aura-002',
        title: 'Colombian Royal Emerald Necklace',
        category: 'Necklaces',
        price: 5800,
        karat: '18K White Gold',
        gemstone: '4.2 Carat Colombian Emerald & Diamonds',
        rating: 5.0,
        reviews: 28,
        image: 'assets/images/necklace-emerald.jpg',
        badge: 'ROYAL HERITAGE',
        description: 'A breathtaking statement piece featuring vivid green Colombian emeralds surrounded by a halo of brilliant round cut diamonds set in 18K white gold.'
    },
    {
        id: 'aura-003',
        title: 'Heritage Polki Gold Bangles Set',
        category: 'Bangles',
        price: 3200,
        karat: '22K Solid Gold',
        gemstone: 'Uncut Polki Diamonds & Ruby Accents',
        rating: 4.8,
        reviews: 35,
        image: 'assets/images/bangles-gold.jpg',
        badge: 'ARTISANAL 22K',
        description: 'Hand-hammered 22K gold bangles handcrafted by master Jaipur royal goldsmiths, featuring traditional uncut Polki diamond settings.'
    },
    {
        id: 'aura-004',
        title: 'Tahitian Pearl & Sapphire Choker',
        category: 'Pearls',
        price: 4150,
        karat: '18K Yellow Gold',
        gemstone: '12mm South Sea Pearl & Royal Sapphires',
        rating: 4.9,
        reviews: 19,
        image: 'assets/images/choker-pearl.jpg',
        badge: 'EXCLUSIVE',
        description: 'Rare iridescent 12mm Tahitian dark pearl suspended from an 18K gold choker chain adorned with deep blue Ceylon sapphires.'
    },
    {
        id: 'aura-005',
        title: 'Platinum Tourbillon Skeleton Watch',
        category: 'Watches',
        price: 12900,
        karat: '950 Platinum',
        gemstone: 'Baguette Diamond Bezel',
        rating: 5.0,
        reviews: 14,
        image: 'assets/images/watch-platinum.jpg',
        badge: 'HAUTE HORLOGERIE',
        description: 'Precision mechanical tourbillon movement crafted in pure 950 platinum with a hand-set diamond bezel and hand-stitched alligator strap.'
    },
    {
        id: 'aura-006',
        title: 'Rose Gold Eternity Diamond Ring',
        category: 'Rings',
        price: 1890,
        karat: '18K Rose Gold',
        gemstone: '1.2 Carat Cushion Cut Diamonds',
        rating: 4.7,
        reviews: 31,
        image: 'assets/images/ring-diamond.jpg',
        badge: 'NEW ARRIVAL',
        description: 'Delicate warm rose gold band handset with continuous cushion cut pavé diamonds, representing everlasting commitment.'
    },
    {
        id: 'aura-007',
        title: 'Imperial Blue Sapphire Pendant',
        category: 'Necklaces',
        price: 6400,
        karat: 'Platinum & 18K Gold',
        gemstone: '3.8 Carat Ceylon Sapphire',
        rating: 4.9,
        reviews: 22,
        image: 'assets/images/choker-pearl.jpg',
        badge: 'LIMITED EDITION',
        description: 'Unheated royal blue Ceylon sapphire center stone framed by marquise diamonds on a fine platinum chain.'
    },
    {
        id: 'aura-008',
        title: 'Artisanal Filigree Gold Cuff',
        category: 'Bangles',
        price: 2750,
        karat: '22K Gold BIS 916',
        gemstone: 'Pure Gold Filigree',
        rating: 4.8,
        reviews: 26,
        image: 'assets/images/bangles-gold.jpg',
        badge: 'HANDCRAFTED',
        description: 'Intricate openwork filigree gold cuff bracelet reflecting centuries-old royal craftsmanship techniques.'
    }
];

// 2. STATE MANAGEMENT
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('aura_wishlist')) || [];
let activeCategory = 'All';
let activeSearchQuery = '';
let activeSortOption = 'featured';
let appliedPromoDiscount = 0; // 0.1 for 10% off

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupCartDrawer();
    setupProductModal();
    setupSearchAndFilters();
    setupContactForm();
    
    // Initial Render
    renderHomeBestSellers();
    renderCatalog();
    updateCartUI();
    updateWishlistUI();
}

// 4. NAVIGATION & SPA ROUTING
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchPage(target);
        });
    });

    // Hash based routing if available
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (['home', 'catalog', 'about', 'contact'].includes(hash)) {
            switchPage(hash);
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-links');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = '#0b0c10';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '1px solid var(--border-gold)';
            } else {
                navMenu.style.display = '';
            }
        });
    }
}

function switchPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(sec => {
        if (sec.id === pageId) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('data-target') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. SEARCH & CATEGORY FILTERING
function setupSearchAndFilters() {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            activeSearchQuery = e.target.value.toLowerCase();
            switchPage('catalog');
            renderCatalog();
        });
    }

    const categoryPills = document.querySelectorAll('#category-pills .pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCategory = pill.getAttribute('data-category');
            renderCatalog();
        });
    });

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            activeSortOption = e.target.value;
            renderCatalog();
        });
    }
}

function filterByCategory(cat) {
    activeCategory = cat;
    const categoryPills = document.querySelectorAll('#category-pills .pill');
    categoryPills.forEach(pill => {
        if (pill.getAttribute('data-category') === cat) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
    switchPage('catalog');
    renderCatalog();
}

// 6. RENDER PRODUCTS
function getFilteredProducts() {
    return PRODUCTS.filter(prod => {
        const matchesCategory = (activeCategory === 'All') || (prod.category === activeCategory);
        const matchesSearch = prod.title.toLowerCase().includes(activeSearchQuery) ||
                              prod.category.toLowerCase().includes(activeSearchQuery) ||
                              prod.gemstone.toLowerCase().includes(activeSearchQuery);
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (activeSortOption === 'price-low') return a.price - b.price;
        if (activeSortOption === 'price-high') return b.price - a.price;
        if (activeSortOption === 'rating') return b.rating - a.rating;
        return 0; // featured
    });
}

function renderHomeBestSellers() {
    const grid = document.getElementById('home-bestsellers-grid');
    if (!grid) return;
    const bestSellers = PRODUCTS.slice(0, 4);
    grid.innerHTML = bestSellers.map(prod => createProductCardHTML(prod)).join('');
}

function renderCatalog() {
    const grid = document.getElementById('catalog-products-grid');
    if (!grid) return;
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--gold-primary);">No Gems Match Your Search</h3>
                <p style="color: var(--text-muted); margin-top: 8px;">Try searching for "Solitaire", "Emerald", or change your category filter.</p>
                <button class="btn btn-gold" style="margin-top: 20px;" onclick="resetFilters()">View All Collections</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(prod => createProductCardHTML(prod)).join('');
}

function resetFilters() {
    activeCategory = 'All';
    activeSearchQuery = '';
    const searchInput = document.getElementById('global-search');
    if (searchInput) searchInput.value = '';
    const categoryPills = document.querySelectorAll('#category-pills .pill');
    categoryPills.forEach(pill => {
        if (pill.getAttribute('data-category') === 'All') pill.classList.add('active');
        else pill.classList.remove('active');
    });
    renderCatalog();
}

function createProductCardHTML(prod) {
    const isWishlisted = wishlist.includes(prod.id);
    return `
        <div class="product-card">
            <div class="product-image-box">
                <span class="badge-tag">${prod.badge}</span>
                <img src="${prod.image}" alt="${prod.title}">
                <button class="quick-view-overlay-btn" onclick="openProductModal('${prod.id}')">Quick View</button>
            </div>
            <div class="product-details">
                <span class="product-category">${prod.category} • ${prod.karat}</span>
                <h3 class="product-title">${prod.title}</h3>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(prod.rating))} <span class="rating-count">(${prod.reviews} reviews)</span>
                </div>
                <div class="product-price-row">
                    <span class="product-price">$${prod.price.toLocaleString()}</span>
                    <div class="card-action-btns">
                        <button class="btn-icon" title="Toggle Wishlist" onclick="toggleWishlist('${prod.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? 'var(--gold-primary)' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                        <button class="btn-icon" title="Add to Bag" onclick="addToCart('${prod.id}', 1)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 7. PRODUCT DETAIL MODAL
function setupProductModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

function openProductModal(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-body-content');

    const whatsappMessage = encodeURIComponent(
        `Hello AURA Concierge, I am interested in purchasing the *${prod.title}* (Price: $${prod.price.toLocaleString()}, Karat: ${prod.karat}). Please assist me with order confirmation.`
    );

    modalContent.innerHTML = `
        <div class="modal-product-layout">
            <div class="modal-img-container">
                <img src="${prod.image}" alt="${prod.title}">
            </div>
            <div class="modal-product-info">
                <span class="product-category">${prod.category} • ${prod.badge}</span>
                <h2>${prod.title}</h2>
                <div class="modal-price">$${prod.price.toLocaleString()}</div>
                
                <div class="modal-specs">
                    <div><span>Metal Purity:</span> <strong>${prod.karat}</strong></div>
                    <div><span>Gemstone Details:</span> <strong>${prod.gemstone}</strong></div>
                    <div><span>Certification:</span> <strong>GIA / BIS 916 Hallmarked</strong></div>
                    <div><span>Availability:</span> <strong style="color: #10b981;">In Stock (Bespoke Ready)</strong></div>
                </div>

                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
                    ${prod.description}
                </p>

                <div class="qty-selector">
                    <span>Quantity:</span>
                    <button class="qty-btn" onclick="updateModalQty(-1)">-</button>
                    <span id="modal-qty-num" style="font-weight: 600; width: 24px; text-align: center;">1</span>
                    <button class="qty-btn" onclick="updateModalQty(1)">+</button>
                </div>

                <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px;">
                    <button class="btn btn-gold" onclick="addModalItemToCart('${prod.id}')">Add to Shopping Bag</button>
                    <a href="https://wa.me/919876543210?text=${whatsappMessage}" target="_blank" class="btn btn-whatsapp">
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

let modalQty = 1;
function updateModalQty(change) {
    modalQty = Math.max(1, modalQty + change);
    const qtySpan = document.getElementById('modal-qty-num');
    if (qtySpan) qtySpan.textContent = modalQty;
}

function addModalItemToCart(productId) {
    addToCart(productId, modalQty);
    modalQty = 1;
    document.getElementById('product-modal').classList.remove('active');
}

// 8. SHOPPING CART DRAWER & WHATSAPP CHECKOUT
function setupCartDrawer() {
    const trigger = document.getElementById('cart-trigger');
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const closeBtn = document.getElementById('cart-close-btn');

    const openCart = () => {
        drawer.classList.add('active');
        overlay.classList.add('active');
    };

    const closeCart = () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    };

    if (trigger) trigger.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);

    // Promo code handler
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }

    // WhatsApp Checkout handler
    const checkoutBtn = document.getElementById('whatsapp-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkoutViaWhatsApp);
    }
}

function addToCart(productId, qty = 1) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        const prod = PRODUCTS.find(p => p.id === productId);
        if (prod) {
            cart.push({ ...prod, qty });
        }
    }
    saveCart();
    updateCartUI();
    showToast(`Added to your Shopping Bag! ✨`);

    // Auto open drawer
    document.getElementById('cart-drawer').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
}

function updateCartQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCountBadge = document.getElementById('cart-count');
    const drawerCount = document.getElementById('cart-drawer-count');
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');

    const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const discount = subtotal * appliedPromoDiscount;
    const finalTotal = subtotal - discount;

    if (cartCountBadge) cartCountBadge.textContent = totalQty;
    if (drawerCount) drawerCount.textContent = totalQty;

    if (container) {
        if (cart.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--gold-primary); margin-bottom: 12px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
                    <p style="font-size: 1rem;">Your bag is currently empty.</p>
                </div>
            `;
        } else {
            container.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                            <span style="font-size: 0.85rem; font-weight: 600;">${item.qty}</span>
                            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <button style="color: var(--text-muted);" onclick="updateCartQty('${item.id}', -${item.qty})">&times;</button>
                </div>
            `).join('');
        }
    }

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (discountEl) discountEl.textContent = `-$${discount.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toLocaleString()}`;
}

function applyPromoCode() {
    const input = document.getElementById('promo-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (code === 'AURA10') {
        appliedPromoDiscount = 0.1;
        showToast('VIP Promo Code AURA10 applied! 10% Discount unlocked. 🎉');
        updateCartUI();
    } else {
        showToast('Invalid promo code. Try AURA10.');
    }
}

function checkoutViaWhatsApp() {
    if (cart.length === 0) {
        showToast('Your bag is empty! Add items before checking out.');
        return;
    }

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const discount = subtotal * appliedPromoDiscount;
    const finalTotal = subtotal - discount;

    let itemsText = cart.map((item, index) => 
        `  ${index + 1}. *${item.title}* (${item.karat})\n     Qty: ${item.qty} x $${item.price.toLocaleString()} = *$${(item.qty * item.price).toLocaleString()}*`
    ).join('\n');

    const text = `🛍️ *NEW ORDER INQUIRY - AURA HAUTE JOAILLERIE*\n` +
                 `----------------------------------------\n` +
                 `${itemsText}\n` +
                 `----------------------------------------\n` +
                 `💰 *Subtotal:* $${subtotal.toLocaleString()}\n` +
                 `✨ *Discount Applied:* -$${discount.toLocaleString()}\n` +
                 `💳 *FINAL TOTAL AMOUNT:* *$${finalTotal.toLocaleString()}*\n` +
                 `🚚 *Shipping:* Complimentary Express Insured Delivery\n\n` +
                 `Kindly confirm my order, availability, and payment details!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encodedText}`, '_blank');
}

// 9. WISHLIST MANAGEMENT
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from Wishlist');
    } else {
        wishlist.push(productId);
        showToast('Saved to your Wishlist ❤️');
    }
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderHomeBestSellers();
    renderCatalog();
}

function updateWishlistUI() {
    const countEl = document.getElementById('wishlist-count');
    if (countEl) countEl.textContent = wishlist.length;
}

// 10. CONTACT FORM & TOAST ALERTS
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            showToast(`Thank you, ${name}! Your private inquiry has been received. Our concierge will contact you shortly.`);
            form.reset();
        });
    }
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if (email && email.includes('@')) {
        showToast('Welcome to AURA Private Vault updates! ✨');
        document.getElementById('newsletter-email').value = '';
    } else {
        showToast('Please enter a valid email address.');
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
