// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all product cards and sections
document.querySelectorAll('.product-card, .about-content').forEach(el => {
    observer.observe(el);
});

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Ferme le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        // Ferme le menu
        navLinks.classList.remove('active');
        // Remet l'icône hamburger
        const icon = mobileMenuToggle.querySelector('i');
        if (icon && icon.classList.contains('fa-times')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ========== CART FUNCTIONALITY ==========
let cartCount = 0;
let favoritesCount = 0;

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.nav-icon[title="Panier"] .badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// Update favorites badge
function updateFavoritesBadge() {
    const favoritesBadge = document.querySelector('.nav-icon[title="Favoris"] .badge');
    if (favoritesBadge) {
        favoritesBadge.textContent = favoritesCount;
    }
}

// Add to cart functionality (example)
function addToCart(productName, price) {
    cartCount++;
    updateCartBadge();
    
    // You can add more sophisticated cart logic here
    console.log(`Ajouté au panier: ${productName} - ${price}`);
    
    // Optional: Show notification
    showNotification(`${productName} ajouté au panier !`);
}

// Add to favorites functionality (example)
function addToFavorites(productName) {
    favoritesCount++;
    updateFavoritesBadge();
    
    console.log(`Ajouté aux favoris: ${productName}`);
    showNotification(`${productName} ajouté aux favoris !`);
}

// Simple notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-gold);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 1001;
        transform: translateX(100%);
        transition: var(--transition);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========== PRODUCT CARDS INTERACTION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Suppression du clic pour ajouter au panier
        // card.addEventListener('click', function() {
        //     const productName = this.querySelector('.product-title').textContent;
        //     const productPrice = this.querySelector('.product-price').textContent;
        //     addToCart(productName, productPrice);
        // });
    });
});

// ========== CONTACT INFO ANIMATION ==========
const contactInfo = document.querySelector('.contact-info');
if (contactInfo) {
    contactInfo.addEventListener('click', function() {
        // Add pulse animation
        this.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll listener
const debouncedScrollHandler = debounce(function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.removeEventListener('scroll', window.scrollHandler);
window.addEventListener('scroll', debouncedScrollHandler);

// ========== PRODUITS FILTER ==========
// Déplace le script de filtre ici depuis le HTML
document.addEventListener('DOMContentLoaded', function() {
    // Filtre produits
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.product-card').forEach(card => {
                if (card.classList.contains(filter)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    // Affiche uniquement la catégorie "pain" au chargement
    const filter = 'pain';
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.classList.contains(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});