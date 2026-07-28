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

    fetchProductsFromCloudinary();

    async function fetchProductsFromCloudinary() {
        const categories = config.defaultCategories;
        const fetched = [];

        for (const cat of categories) {
            try {
                const res = await fetch(`https://res.cloudinary.com/${config.cloudName}/image/list/${cat}.json`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.resources) {
                        data.resources.forEach(resItem => {
                            fetched.push({
                                id: resItem.public_id,
                                title: resItem.context?.custom?.caption || resItem.context?.custom?.title || `${cat.toUpperCase()} Item`,
                                category: cat,
                                url: `https://res.cloudinary.com/${config.cloudName}/image/upload/f_auto,q_auto/${resItem.public_id}.${resItem.format}`,
                                created_at: resItem.created_at
                            });
                        });
                    }
                }
            } catch (err) {
                console.warn(`Category '${cat}' list fetch info:`, err.message);
            }
        }

        if (fetched.length > 0) {
            allProducts = fetched;
            renderCategoryPills();
            renderProducts();
        }
    }

    function renderCategoryPills() {
        if (!filterPills) return;
        const uniqueCategories = ['all', ...new Set(allProducts.map(p => p.category))];
        filterPills.innerHTML = uniqueCategories.map(cat => `
            <li class="filter-pill ${cat === activeFilter ? 'active' : ''}" data-filter="${cat}">
                ${cat.charAt(0).toUpperCase() + cat.slice(1)}
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
        const filtered = activeFilter === 'all' ? allProducts : allProducts.filter(p => p.category === activeFilter);
        const batch = filtered.slice(0, displayedCount + PAGE_SIZE);
        displayedCount = batch.length;

        // Append dynamic items to existing or replace grid content
        const dynamicCardsHtml = batch.map(p => `
            <div class="product-card showcase-card" data-category="${p.category}">
                <div class="product-img-wrapper">
                    <img src="${p.url}" alt="${p.title}" loading="lazy">
                    <div class="glass-hover-overlay">
                        <a href="${getWhatsAppUrl(p)}" target="_blank" class="lux-btn" style="padding:10px 16px; font-size:13px;">
                            <i class="fa-brands fa-whatsapp" style="margin-right:6px;"></i> Inquire on WhatsApp
                        </a>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-cat">${p.category.toUpperCase()}</span>
                    <h3>${p.title}</h3>
                </div>
            </div>
        `).join('');

        grid.innerHTML = dynamicCardsHtml;

        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedCount < filtered.length ? 'inline-block' : 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => renderProducts());
    }

    function getWhatsAppUrl(product) {
        const text = encodeURIComponent(`Hi Woodland Solapur! I am inquiring about *${product.title}* (${product.category}).\nDirect Photo: ${product.url}`);
        return `https://wa.me/${config.whatsappNumber}?text=${text}`;
    }
});
