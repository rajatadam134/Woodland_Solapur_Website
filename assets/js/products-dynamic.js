document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const grid = document.getElementById('dynamicProductGrid');
    const filterPills = document.getElementById('dynamicFilterPills');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (!grid) return;

    let allProducts = [];
    let displayedCount = 0;
    const PAGE_SIZE = 16;
    let activeFilter = 'all';

    const DEFAULT_PRODUCTS = [
        { id: 'def_1', title: 'Windsor Velvet Sofa', category: 'living', type: 'product', url: 'assets/images/prod_yellow_sofa.jpg', link: 'products/windsor-velvet-sofa.html', catLabel: 'Living Room / Sofa' },
        { id: 'def_2', title: 'Living Lounge Showcase', category: 'living', type: 'gallery', url: 'assets/images/gal_living_setup.jpg', ref: 'gal-living', catLabel: 'Living Room / Lookbook' },
        { id: 'def_3', title: 'Staggered Center Table', category: 'living', type: 'product', url: 'assets/images/prod_coffee_table.jpg', link: 'products/staggered-center-table.html', catLabel: 'Living Room / Table' },
        { id: 'def_4', title: 'Teak TV Console Unit', category: 'living', type: 'product', url: 'assets/images/prod_tv_console.jpg', link: 'products/teak-tv-console.html', catLabel: 'Living Room / TV Console' },
        { id: 'def_5', title: 'Premium Draped Curtains', category: 'living', type: 'product', url: 'assets/images/prod_curtains.jpg', link: 'products/premium-draped-curtains.html', catLabel: 'Living Room / Curtains' },
        { id: 'def_6', title: 'Bespoke Bedroom Showcase', category: 'bedroom', type: 'gallery', url: 'assets/images/gal_bedroom_setup.jpg', ref: 'gal-bedroom', catLabel: 'Bedroom / Lookbook' },
        { id: 'def_7', title: 'Classic Teak Bed Set', category: 'bedroom', type: 'product', url: 'assets/images/prod_bed_set.jpg', link: 'products/classic-teak-bed-set.html', catLabel: 'Bedroom / Bed' },
        { id: 'def_8', title: 'Luxury Pocket Spring Mattress', category: 'bedroom', type: 'product', url: 'assets/images/prod_mattress.jpg', link: 'products/luxury-pocket-mattress.html', catLabel: 'Bedroom / Mattress' },
        { id: 'def_9', title: 'Luxury Dining Showcase', category: 'dining', type: 'gallery', url: 'assets/images/gal_dining_setup.jpg', ref: 'gal-dining', catLabel: 'Dining Room / Lookbook' },
        { id: 'def_10', title: 'Classic Teak Dining Suite', category: 'dining', type: 'product', url: 'assets/images/prod_dining_suite.jpg', link: 'products/classic-teak-dining-suite.html', catLabel: 'Dining Room / Suite' },
        { id: 'def_11', title: 'Luxury Cream Marble Dining Suite', category: 'dining', type: 'product', url: 'assets/images/prod_cream_dining.jpg', link: 'products/luxury-cream-dining.html', catLabel: 'Dining Room / Suite' },
        { id: 'def_12', title: 'Modern White Marble Dining Table', category: 'dining', type: 'product', url: 'assets/images/prod_white_dining.jpg', link: 'products/modern-white-dining.html', catLabel: 'Dining Room / Table' },
        { id: 'def_13', title: 'Executive Office Showcase', category: 'office', type: 'gallery', url: 'assets/images/gal_office_setup.jpg', ref: 'gal-office', catLabel: 'Office / Lookbook' },
        { id: 'def_14', title: 'Veneer Conference Desk', category: 'office', type: 'product', url: 'assets/images/prod_office_table.jpg', link: 'products/veneer-conference-desk.html', catLabel: 'Office / Table' },
        { id: 'def_15', title: 'Office Executive Ergonomic Chair', category: 'office', type: 'product', url: 'assets/images/prod_office_chair.jpg', link: 'products/office-executive-chair.html', catLabel: 'Office / Chair' },
        { id: 'def_16', title: 'Teak Compactors Storage System', category: 'office', type: 'product', url: 'assets/images/prod_compactors.jpg', link: 'products/teak-compactors-storage.html', catLabel: 'Office / Storage' },
        { id: 'def_17', title: 'Outdoor Balcony Swings', category: 'living', type: 'gallery', url: 'assets/images/gal_outdoor_swing.jpg', ref: 'gal-outdoor-swing', catLabel: 'Living Room / Swings' },
        { id: 'def_18', title: 'Wicker Patio Seating', category: 'living', type: 'gallery', url: 'assets/images/gal_wicker_seating.jpg', ref: 'gal-wicker-seating', catLabel: 'Living Room / Patio' }
    ];

    loadProducts();

    /**
     * Load products from Cloudinary catalog JSON + default static products.
     * No longer uses the broken /image/list/<tag>.json API.
     * No longer reads localStorage (that's admin-only).
     */
    async function loadProducts() {
        // Fetch cloud-synced catalog (uploaded products)
        const cloudProducts = await fetchCatalogFromCloudinary();

        // Cloud-uploaded products first
        allProducts = [...cloudProducts];

        // Append default static products (dedup by URL)
        const existingUrls = new Set(allProducts.map(p => p.url));
        DEFAULT_PRODUCTS.forEach(dp => {
            if (!existingUrls.has(dp.url)) {
                allProducts.push(dp);
                existingUrls.add(dp.url);
            }
        });

        renderCategoryPills();
        renderProducts();
    }

    /**
     * Fetch product catalog from Cloudinary as a raw JSON file.
     * This file is published by the admin page after each upload/delete.
     * Cache-busted with timestamp query param to always get latest version.
     */
    async function fetchCatalogFromCloudinary() {
        try {
            const url = `https://res.cloudinary.com/${config.cloudName}/raw/upload/woodland_catalog.json?_t=${Date.now()}`;
            const res = await fetch(url);
            if (!res.ok) {
                if (res.status === 404) {
                    console.log('No product catalog found on Cloudinary yet — admin needs to upload products first.');
                } else {
                    console.warn(`Product catalog fetch returned HTTP ${res.status}. Products may not show until admin uploads and syncs.`);
                }
                return [];
            }
            const data = await res.json();
            if (!Array.isArray(data)) {
                console.warn('Product catalog is not a valid array, ignoring.');
                return [];
            }
            // Filter out any entries without valid Cloudinary URLs
            return data.filter(item => item.url && item.url.startsWith('https://'));
        } catch (err) {
            console.warn('Failed to fetch product catalog from Cloudinary:', err.message);
            return [];
        }
    }

    function formatCategory(cat) {
        if (!cat) return 'GENERAL';
        const clean = cat.toLowerCase();
        const map = {
            'living': 'LIVING ROOM',
            'bedroom': 'BEDROOM',
            'office': 'OFFICE',
            'dining': 'DINING'
        };
        return map[clean] || clean.toUpperCase();
    }

    function renderCategoryPills() {
        if (!filterPills) return;
        const uniqueCategories = ['all', ...new Set(allProducts.map(p => p.category.toLowerCase()))];
        filterPills.innerHTML = uniqueCategories.map(cat => `
            <li class="filter-pill ${cat === activeFilter ? 'active' : ''}" data-filter="${cat}">
                ${cat === 'all' ? 'All Items' : formatCategory(cat)}
            </li>
        `).join('');

        filterPills.querySelectorAll('.filter-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeFilter = pill.getAttribute('data-filter');
                displayedCount = 0;
                renderProducts();
            });
        });
    }

    function renderProducts() {
        const filtered = activeFilter === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

        const batch = filtered.slice(0, displayedCount + PAGE_SIZE);
        displayedCount = batch.length;

        const dynamicCardsHtml = batch.map(p => {
            const catDisplay = p.catLabel || formatCategory(p.category);
            const refId = p.ref || p.id || 'prod';

            return `
                <div class="product-card gallery-card-item showcase-card" data-category="${p.category}" data-type="gallery" data-image="${p.url}" data-ref="${refId}" data-title="${p.title}" data-catdisplay="${catDisplay}" tabindex="0" role="button">
                    <div class="product-img-wrapper">
                        <img src="${p.url}" alt="${p.title}" loading="lazy">
                        <div class="glass-hover-overlay">
                            <span class="lux-btn"><i class="fa-solid fa-magnifying-glass-plus" style="margin-right: 8px;"></i> Zoom Setup</span>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-cat">${catDisplay}</span>
                        <h3>${p.title}</h3>
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = dynamicCardsHtml;

        // Re-attach lightbox triggers if window.initLightbox exists
        if (typeof window.initLightbox === 'function') {
            window.initLightbox();
        }

        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedCount < filtered.length ? 'inline-block' : 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => renderProducts());
    }
});
