document.addEventListener('DOMContentLoaded', () => {
    console.log('Woodland website initialized');
    initNavigation();
    initMobileMenu();
    initFilters();
    initProductGallery();
    initAccordions();
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
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function initFilters() {
    const pills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.product-card');
    
    if (pills.length === 0 || cards.length === 0) return;

    // Check query parameter (e.g. ?cat=bedroom)
    const urlParams = new URLSearchParams(window.location.search);
    const initialCat = urlParams.get('cat');
    if (initialCat) {
        const matchingPill = document.querySelector(`.filter-pill[data-filter="${initialCat}"]`);
        if (matchingPill) {
            pills.forEach(p => p.classList.remove('active'));
            matchingPill.classList.add('active');
            filterProducts(initialCat, cards);
        }
    }

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const filter = pill.getAttribute('data-filter');
            // Update URL search param without reloading page
            const newUrl = new URL(window.location);
            if (filter === 'all') {
                newUrl.searchParams.delete('cat');
            } else {
                newUrl.searchParams.set('cat', filter);
            }
            window.history.pushState({}, '', newUrl);
            filterProducts(filter, cards);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('cat') || 'all';
        const matchingPill = document.querySelector(`.filter-pill[data-filter="${cat}"]`);
        if (matchingPill) {
            pills.forEach(p => p.classList.remove('active'));
            matchingPill.classList.add('active');
            filterProducts(cat, cards);
        }
    });
}

function filterProducts(category, cards) {
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
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
            const newSrc = thumb.querySelector('img').getAttribute('src');
            mainImg.setAttribute('src', newSrc);
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
