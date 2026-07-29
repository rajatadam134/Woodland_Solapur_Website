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

    const supabaseClient = (window.supabase && config.supabaseUrl)
        ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
        : null;

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
        { id: 'def_12', title: 'Modern White Marble Dining Table', category: 'dining', type: 'product', url: 'assets/images/prod_white_dining.jpg', link: 'products/modern-white-dining.html', catLabel: 'Dining Room / Table' }
    ];

    loadProducts();

    async function loadProducts() {
        let cloudProducts = [];
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient
                    .from('products')
                    .select('*')
                    .eq('is_archived', false)
                    .order('sort_order', { ascending: true })
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    cloudProducts = data;
                }
            } catch (err) {
                console.error('Supabase fetch error:', err);
            }
        }

        const seenUrls = new Set();
        allProducts = [];

        cloudProducts.forEach(p => {
            if (p.url && !seenUrls.has(p.url)) {
                allProducts.push(p);
                seenUrls.add(p.url);
            }
        });

        DEFAULT_PRODUCTS.forEach(dp => {
            if (!seenUrls.has(dp.url)) {
                allProducts.push(dp);
                seenUrls.add(dp.url);
            }
        });

        renderCategoryPills();
        renderProducts();
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

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderProducts() {
        const filtered = activeFilter === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

        const batch = filtered.slice(0, displayedCount + PAGE_SIZE);
        displayedCount = batch.length;

        const dynamicCardsHtml = batch.map(p => {
            const rawCatDisplay = p.catLabel || formatCategory(p.category);
            const catDisplay = escapeHtml(rawCatDisplay);
            const refId = escapeHtml(p.ref || p.id || 'prod');
            const displayTitle = p.use_custom_display_name && p.display_name ? p.display_name : p.title;
            const safeTitle = escapeHtml(displayTitle);
            const safeCategory = escapeHtml(p.category);
            const safeUrl = escapeHtml(p.url);

            // Compute automatic tags
            let badgeHtml = '';
            if (p.created_at) {
                const daysOld = (Date.now() - new Date(p.created_at).getTime()) / (1000 * 60 * 60 * 24);
                if (daysOld <= 7) badgeHtml += `<span class="product-tag-badge badge-new">New Arrival</span>`;
            }
            if ((p.inquiry_count || 0) >= 5) {
                badgeHtml += `<span class="product-tag-badge badge-top">Top Pick</span>`;
            }

            return `
                <div class="product-card gallery-card-item showcase-card" data-id="${p.id || ''}" data-category="${safeCategory}" data-type="gallery" data-image="${safeUrl}" data-ref="${refId}" data-title="${safeTitle}" data-catdisplay="${catDisplay}" tabindex="0" role="button">
                    <div class="product-img-wrapper">
                        <div class="product-badges-overlay">${badgeHtml}</div>
                        <img src="${safeUrl}" alt="${safeTitle}" loading="lazy" onerror="this.closest('.product-card').style.display='none'">
                        <div class="glass-hover-overlay">
                            <span class="lux-btn"><i class="fa-solid fa-magnifying-glass-plus" style="margin-right: 8px;"></i> Zoom & Inquire</span>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-cat">${catDisplay}</span>
                        <h3>${safeTitle}</h3>
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = dynamicCardsHtml;

        if (typeof window.initLightbox === 'function') {
            window.initLightbox();
        }

        // Attach click view counter & inquiry logger
        grid.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', async () => {
                const id = card.dataset.id;
                const title = card.dataset.title;

                if (id && supabaseClient && !id.startsWith('def_')) {
                    // Increment view count
                    try {
                        await supabaseClient.rpc('increment_view_count', { row_id: id }).catch(async () => {
                            // Fallback direct update
                            const { data: current } = await supabaseClient.from('products').select('view_count').eq('id', id).single();
                            if (current) {
                                await supabaseClient.from('products').update({ view_count: (current.view_count || 0) + 1 }).eq('id', id);
                            }
                        });
                    } catch (e) {}
                }
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedCount < filtered.length ? 'inline-block' : 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => renderProducts());
    }
});

