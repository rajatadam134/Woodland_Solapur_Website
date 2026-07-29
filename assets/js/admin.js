document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const modal = document.getElementById('loginModal');
    const adminMain = document.getElementById('adminMain');
    const loginBtn = document.getElementById('loginBtn');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');

    // Initialize Supabase Client
    const supabaseClient = (window.supabase && config.supabaseUrl)
        ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
        : null;

    let catalogProducts = [];
    let isReorderMode = false;
    let draggedCard = null;

    // Check auth session
    async function checkSession() {
        if (!supabaseClient) return;
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) unlockAdmin();
    }

    function unlockAdmin() {
        if (modal) modal.style.display = 'none';
        if (adminMain) adminMain.style.display = 'flex';
        initTabs();
        loadDashboardStats();
        loadCatalog();
        loadAnalytics();
    }

    function lockAdmin() {
        if (modal) modal.style.display = 'flex';
        if (adminMain) adminMain.style.display = 'none';
    }

    if (supabaseClient) {
        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) lockAdmin();
        });
    }

    checkSession();

    // Login handlers
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }

    async function handleLogin() {
        if (!supabaseClient) return showLoginError('Supabase config missing');
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        if (!email || !password) return showLoginError('Enter email and password');

        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing in...';

        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';

        if (error) return showLoginError(error.message);
        if (loginError) loginError.style.display = 'none';
        unlockAdmin();
    }

    function showLoginError(msg) {
        if (!loginError) return;
        loginError.textContent = msg;
        loginError.style.display = 'block';
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (supabaseClient) await supabaseClient.auth.signOut();
            lockAdmin();
        });
    }

    // Navigation Tabs
    function initTabs() {
        const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
        const tabPanes = document.querySelectorAll('.tab-pane');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetTab = item.dataset.tab;
                navItems.forEach(i => i.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                item.classList.add('active');
                const pane = document.getElementById(targetTab);
                if (pane) pane.classList.add('active');

                if (targetTab === 'tabDashboard') loadDashboardStats();
                if (targetTab === 'tabManage') loadCatalog();
                if (targetTab === 'tabAnalytics') loadAnalytics();
            });
        });
    }

    // Dual Naming Sync Checkbox
    const syncCheckbox = document.getElementById('syncDisplayName');
    const customNameRow = document.getElementById('customDisplayNameRow');
    if (syncCheckbox && customNameRow) {
        syncCheckbox.addEventListener('change', () => {
            customNameRow.style.display = syncCheckbox.checked ? 'none' : 'block';
        });
    }

    const categorySelect = document.getElementById('categorySelect');
    const customCatInput = document.getElementById('customCategoryInput');
    if (categorySelect && customCatInput) {
        categorySelect.addEventListener('change', () => {
            customCatInput.style.display = categorySelect.value === 'custom' ? 'block' : 'none';
        });
    }

    // Upload & Drag Drop
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());
        ['dragenter', 'dragover'].forEach(eName => {
            dropZone.addEventListener(eName, (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-active');
            });
        });
        ['dragleave', 'drop'].forEach(eName => {
            dropZone.addEventListener(eName, (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-active');
            });
        });
        dropZone.addEventListener('drop', (e) => {
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        });
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    }

    async function handleFiles(files) {
        if (!files || files.length === 0 || !supabaseClient) return;

        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) return lockAdmin();

        const titleInput = document.getElementById('productName').value.trim();
        const displayInput = document.getElementById('displayNameInput') ? document.getElementById('displayNameInput').value.trim() : '';
        const isSynced = syncCheckbox ? syncCheckbox.checked : true;
        const useAI = document.getElementById('aiBgRemoval') ? document.getElementById('aiBgRemoval').checked : true;

        let category = categorySelect ? categorySelect.value : 'living';
        if (category === 'custom' && customCatInput) {
            category = customCatInput.value.trim().toLowerCase() || 'general';
        }

        const statusArea = document.getElementById('statusArea');
        const statusText = document.getElementById('statusText');
        const progressBar = document.getElementById('progressBar');
        const previewGrid = document.getElementById('previewGrid');
        const successNotice = document.getElementById('successNotice');

        if (statusArea) statusArea.style.display = 'block';
        if (successNotice) successNotice.style.display = 'none';
        if (previewGrid) previewGrid.innerHTML = '';

        const total = files.length;
        let uploaded = 0;

        for (let i = 0; i < total; i++) {
            const file = files[i];
            const fileTitle = (total === 1 && titleInput) ? titleInput : (titleInput ? `${titleInput} #${i+1}` : file.name.replace(/\.[^/.]+$/, ""));
            const displayName = isSynced ? null : (displayInput || fileTitle);

            if (statusText) statusText.innerText = `Processing (${i + 1}/${total}): ${file.name}`;
            if (progressBar) progressBar.style.width = `${((i + 1) / total) * 100}%`;

            let finalBlob = file;
            if (useAI) {
                const bgFn = window.imglyRemoveBackground || window.imglyBackgroundRemoval || (window.imgly && window.imgly.removeBackground);
                if (bgFn) {
                    try {
                        const blob = await bgFn(file);
                        finalBlob = await compositeStudio(blob);
                    } catch (err) {
                        finalBlob = await compositeStudio(file);
                    }
                } else {
                    finalBlob = await compositeStudio(file);
                }
            } else {
                finalBlob = await compositeStudio(file);
            }

            try {
                const dbProd = await uploadProduct(finalBlob, fileTitle, displayName, category, !isSynced);
                addPreviewCard(previewGrid, dbProd.url, dbProd.display_name || dbProd.title);
                uploaded++;
            } catch (err) {
                console.error("Upload fail:", err);
            }
        }

        if (statusText) statusText.innerText = `Uploaded ${uploaded} of ${total} images!`;
        if (successNotice && uploaded > 0) successNotice.style.display = 'flex';
        loadCatalog();
        loadDashboardStats();
    }

    async function uploadProduct(blob, title, displayName, category, useCustom) {
        const fileName = `${category}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.jpg`;

        const { error: sErr } = await supabaseClient.storage.from(config.storageBucket).upload(fileName, blob, { contentType: 'image/jpeg' });
        if (sErr) throw sErr;

        const { data: urlData } = supabaseClient.storage.from(config.storageBucket).getPublicUrl(fileName);

        const { data, error: dbErr } = await supabaseClient.from('products').insert([{
            title: title,
            display_name: displayName,
            use_custom_display_name: useCustom,
            category: category,
            url: urlData.publicUrl,
            storage_path: fileName,
            sort_order: 0
        }]).select().single();

        if (dbErr) throw dbErr;

        // Auto tag New Arrival
        await supabaseClient.from('product_tags').insert([{
            product_id: data.id,
            tag: 'New Arrival',
            tag_type: 'system',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }]);

        return data;
    }

    // Canvas composite studio background
    function compositeStudio(blob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const pad = Math.max(img.width, img.height) * 0.12;
                canvas.width = Math.round(img.width + pad * 2);
                canvas.height = Math.round(img.height + pad * 2);
                const ctx = canvas.getContext('2d');

                const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.4, 20, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height));
                grad.addColorStop(0, '#FFFFFF');
                grad.addColorStop(0.55, '#F0F0F3');
                grad.addColorStop(1, '#E0E0E5');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(img, pad, pad, img.width, img.height);
                canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.85);
            };
            img.onerror = () => resolve(blob);
            img.src = URL.createObjectURL(blob);
        });
    }

    function addPreviewCard(container, url, title) {
        if (!container) return;
        const card = document.createElement('div');
        card.className = 'catalog-card-v2';
        card.innerHTML = `<div class="card-img-wrap"><img src="${url}"></div><div class="card-content"><strong>${escapeHtml(title)}</strong></div>`;
        container.appendChild(card);
    }

    // Dashboard Statistics
    async function loadDashboardStats() {
        if (!supabaseClient) return;

        const { data: prods } = await supabaseClient.from('products').select('*');
        if (prods) {
            document.getElementById('dashTotalProducts').innerText = prods.length;
            const featuredCount = prods.filter(p => p.is_featured).length;
            const totalViews = prods.reduce((acc, p) => acc + (p.view_count || 0), 0);
            const totalInquiries = prods.reduce((acc, p) => acc + (p.inquiry_count || 0), 0);

            document.getElementById('dashTotalFeatured').innerText = featuredCount;
            document.getElementById('dashTotalViews').innerText = totalViews;
            document.getElementById('dashTotalInquiries').innerText = totalInquiries;

            // Top Inquired
            const topList = [...prods].sort((a, b) => (b.inquiry_count || 0) - (a.inquiry_count || 0)).slice(0, 5);
            const topContainer = document.getElementById('dashTopInquiredList');
            if (topContainer) {
                topContainer.innerHTML = topList.map(p => `
                    <div class="dash-item-row">
                        <div class="dash-item-info">
                            <img src="${escapeHtml(p.url)}">
                            <div>
                                <strong>${escapeHtml(p.display_name || p.title)}</strong>
                                <br><small class="text-muted">${escapeHtml(p.category)}</small>
                            </div>
                        </div>
                        <span class="badge badge-gold"><i class="fa-solid fa-comments"></i> ${p.inquiry_count || 0}</span>
                    </div>
                `).join('') || '<p class="text-muted">No inquiries yet.</p>';
            }
        }
    }

    // Manage Catalog & Reordering
    async function loadCatalog() {
        const grid = document.getElementById('manageCatalogGrid');
        if (!grid || !supabaseClient) return;

        const { data: items, error } = await supabaseClient.from('products').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
        if (error) return;

        catalogProducts = items || [];
        renderCatalogGrid(catalogProducts);
    }

    function renderCatalogGrid(items) {
        const grid = document.getElementById('manageCatalogGrid');
        if (!grid) return;

        if (items.length === 0) {
            grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">No products found.</p>';
            return;
        }

        grid.innerHTML = items.map((item, idx) => `
            <div class="catalog-card-v2 ${isReorderMode ? 'reorder-active' : ''}" data-id="${item.id}" draggable="${isReorderMode}">
                <div class="card-img-wrap">
                    <img src="${escapeHtml(item.url)}" loading="lazy">
                    <div class="card-badges">
                        <span class="badge badge-gold">${escapeHtml(item.category)}</span>
                        ${item.is_featured ? '<span class="badge badge-purple">Featured</span>' : ''}
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-title-text" contenteditable="${!isReorderMode}" data-field="title">${escapeHtml(item.title)}</div>
                    <div class="card-disp-text">Website Display: <span contenteditable="${!isReorderMode}" data-field="display_name">${escapeHtml(item.display_name || item.title)}</span></div>
                    <div class="card-actions-row">
                        <button class="btn-icon toggle-feat-btn" data-id="${item.id}">${item.is_featured ? '⭐ Featured' : '☆ Feature'}</button>
                        <button class="btn-icon danger delete-prod-btn" data-id="${item.id}" data-path="${item.storage_path}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');

        attachCatalogEvents();
    }

    function attachCatalogEvents() {
        const grid = document.getElementById('manageCatalogGrid');
        if (!grid) return;

        grid.querySelectorAll('.delete-prod-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Delete this product permanently?')) {
                    await supabaseClient.from('products').delete().eq('id', btn.dataset.id);
                    if (btn.dataset.path) await supabaseClient.storage.from(config.storageBucket).remove([btn.dataset.path]);
                    loadCatalog();
                }
            });
        });

        grid.querySelectorAll('.toggle-feat-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const item = catalogProducts.find(p => p.id === btn.dataset.id);
                if (item) {
                    await supabaseClient.from('products').update({ is_featured: !item.is_featured }).eq('id', item.id);
                    loadCatalog();
                }
            });
        });

        // Inline edit title / display_name
        grid.querySelectorAll('[contenteditable="true"]').forEach(el => {
            el.addEventListener('blur', async () => {
                const card = el.closest('.catalog-card-v2');
                const id = card.dataset.id;
                const field = el.dataset.field;
                const val = el.innerText.trim();

                const updateObj = {};
                updateObj[field] = val;
                if (field === 'display_name') updateObj['use_custom_display_name'] = true;

                await supabaseClient.from('products').update(updateObj).eq('id', id);
            });
        });
    }

    // Reorder Mode Toggle
    const toggleReorderBtn = document.getElementById('toggleReorderBtn');
    const saveOrderBtn = document.getElementById('saveOrderBtn');

    if (toggleReorderBtn && saveOrderBtn) {
        toggleReorderBtn.addEventListener('click', () => {
            isReorderMode = !isReorderMode;
            toggleReorderBtn.classList.toggle('gold-btn');
            toggleReorderBtn.innerHTML = isReorderMode ? '<i class="fa-solid fa-xmark"></i> Exit Reorder' : '<i class="fa-solid fa-arrow-down-short-wide"></i> Reorder Mode';
            saveOrderBtn.style.display = isReorderMode ? 'inline-flex' : 'none';
            renderCatalogGrid(catalogProducts);
            if (isReorderMode) enableDragDrop();
        });

        saveOrderBtn.addEventListener('click', async () => {
            const cards = document.querySelectorAll('#manageCatalogGrid .catalog-card-v2');
            for (let i = 0; i < cards.length; i++) {
                const id = cards[i].dataset.id;
                await supabaseClient.from('products').update({ sort_order: i }).eq('id', id);
            }
            alert('Order saved successfully!');
            isReorderMode = false;
            saveOrderBtn.style.display = 'none';
            toggleReorderBtn.innerHTML = '<i class="fa-solid fa-arrow-down-short-wide"></i> Reorder Mode';
            loadCatalog();
        });
    }

    function enableDragDrop() {
        const grid = document.getElementById('manageCatalogGrid');
        if (!grid) return;

        grid.querySelectorAll('.catalog-card-v2').forEach(card => {
            card.addEventListener('dragstart', () => {
                draggedCard = card;
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                draggedCard = null;
            });
            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (draggedCard && draggedCard !== card) {
                    const rect = card.getBoundingClientRect();
                    const next = (e.clientX - rect.left) / (rect.right - rect.left) > 0.5;
                    grid.insertBefore(draggedCard, next ? card.nextSibling : card);
                }
            });
        });
    }

    // Analytics
    async function loadAnalytics() {
        const logsContainer = document.getElementById('analyticsLogsTable');
        if (!logsContainer || !supabaseClient) return;

        const { data: logs } = await supabaseClient.from('inquiry_logs').select('*').order('created_at', { ascending: false }).limit(20);

        if (logs && logs.length > 0) {
            logsContainer.innerHTML = `
                <table style="width:100%; border-collapse:collapse; font-size:13px;">
                    <thead><tr style="text-align:left; border-bottom:1px solid #DDD;"><th style="padding:8px;">Time</th><th style="padding:8px;">Product</th><th style="padding:8px;">Channel</th></tr></thead>
                    <tbody>
                        ${logs.map(l => `
                            <tr style="border-bottom:1px solid #EEE;">
                                <td style="padding:8px;">${new Date(l.created_at).toLocaleString()}</td>
                                <td style="padding:8px;"><strong>${escapeHtml(l.product_title || 'General Inquiry')}</strong></td>
                                <td style="padding:8px;"><span class="badge badge-green">${escapeHtml(l.inquiry_type)}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            logsContainer.innerHTML = '<p class="text-muted text-center" style="padding:20px;">No customer click logs recorded yet.</p>';
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
});

