document.addEventListener('DOMContentLoaded', () => {
    console.log('Woodland website initialized');
    initNavigation();
    initMobileMenu();
    initFilters();
    initProductGallery();
    initAccordions();
    initLightbox();
});

function initNavigation() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const hasHero = document.querySelector('.hero-section');
    if (!hasHero) {
        header.classList.add('scrolled');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function initFilters() {
    const pills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.showcase-card, .product-card, .gallery-card-item');
    
    if (cards.length === 0) return;

    // Read initial URL params
    const urlParams = new URLSearchParams(window.location.search);
    let currentCat = urlParams.get('cat') || 'all';

    const activePill = document.querySelector(`.filter-pill[data-filter="${currentCat}"]`) || pills[0];
    if (activePill) {
        pills.forEach(p => p.classList.remove('active'));
        activePill.classList.add('active');
    }

    applyFilter(currentCat, cards);
    updateFilterCounts(pills, cards);

    // Category Pill Click
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCat = pill.getAttribute('data-filter');
            syncUrl(currentCat);
            applyFilter(currentCat, cards);
        });
    });

    // History popstate
    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        currentCat = params.get('cat') || 'all';

        const pMatch = document.querySelector(`.filter-pill[data-filter="${currentCat}"]`);
        if (pMatch) {
            pills.forEach(p => p.classList.remove('active'));
            pMatch.classList.add('active');
        }

        applyFilter(currentCat, cards);
    });
}

function syncUrl(cat) {
    const newUrl = new URL(window.location);
    if (cat === 'all') {
        newUrl.searchParams.delete('cat');
    } else {
        newUrl.searchParams.set('cat', cat);
    }
    window.history.pushState({}, '', newUrl);
}

function applyFilter(category, cards) {
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateFilterCounts(pills, cards) {
    pills.forEach(pill => {
        const cat = pill.getAttribute('data-filter');
        let count = 0;

        cards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (cat === 'all' || cardCat === cat) count++;
        });

        let countSpan = pill.querySelector('.filter-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.className = 'filter-count';
            pill.appendChild(countSpan);
        }
        countSpan.textContent = count;
    });
}

function initProductGallery() {
    const thumbs = document.querySelectorAll('.thumb-img');
    const mainImg = document.querySelector('.main-detail-img img');
    if (!mainImg) return;
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            const img = thumb.querySelector('img');
            if (img) {
                mainImg.setAttribute('src', img.getAttribute('src'));
            }
        });
    });
}

function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initLightbox() {
    const items = document.querySelectorAll('.gallery-card-item, .gallery-item');
    const modal = document.querySelector('.lightbox-modal');
    if (!modal) return;
    
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.lightbox-close');
    const inquireBtn = modal.querySelector('.lightbox-inquire-btn');

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('a') && !e.target.closest('.glass-hover-overlay')) return;

            let src = item.getAttribute('data-image') || item.querySelector('img')?.getAttribute('src') || '';
            const ref = item.getAttribute('data-ref') || 'showcase';
            const title = item.getAttribute('data-title') || 'Gallery Setup';
            const catDisplay = item.getAttribute('data-catdisplay') || item.querySelector('.product-cat')?.textContent || 'Showcase';
            
            // Convert relative image path to absolute URL for WhatsApp link preview
            if (src && !src.startsWith('http')) {
                const cleanBase = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
                src = new URL(src, cleanBase).href;
            }

            modalImg.setAttribute('src', src);
            
            const waNumber = (window.WOODLAND_CONFIG && window.WOODLAND_CONFIG.whatsappNumber) || '918767223224';
            const pageUrl = window.location.href.split('#')[0];
            const msgText = `Hi Woodland Solapur! I am inquiring about *${title}* (${catDisplay}).\n\nProduct Photo: ${src}\nCatalog Link: ${pageUrl}`;
            inquireBtn.setAttribute('href', `https://wa.me/${waNumber}?text=${encodeURIComponent(msgText)}`);
            
            document.body.style.overflow = 'hidden';
            modal.classList.add('active');
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalImg.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        });
    }

    modal.addEventListener('click', (e) => {
        if (!modalImg.contains(e.target) && !inquireBtn.contains(e.target)) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalImg.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalImg.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        }
    });
}

window.initLightbox = initLightbox;
