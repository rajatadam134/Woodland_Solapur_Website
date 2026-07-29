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

    // Check existing authenticated session on page load
    async function checkSession() {
        if (!supabaseClient) return;
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            unlockAdmin();
        }
    }

    function unlockAdmin() {
        if (modal) modal.style.display = 'none';
        if (adminMain) adminMain.style.display = 'block';
        renderCatalog();
    }

    function lockAdmin() {
        if (modal) modal.style.display = 'flex';
        if (adminMain) adminMain.style.display = 'none';
    }

    // Listen for auth state changes
    if (supabaseClient) {
        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                lockAdmin();
            }
        });
    }

    checkSession();

    // Login handler using Supabase Auth
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && passwordInput) passwordInput.focus();
        });
    }

    async function handleLogin() {
        if (!supabaseClient) {
            showLoginError('Supabase client not initialized. Check config.js.');
            return;
        }

        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';

        if (!email || !password) {
            showLoginError('Please enter both email and password.');
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing in...';

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';

        if (error) {
            showLoginError(error.message);
            return;
        }

        if (loginError) loginError.style.display = 'none';
        unlockAdmin();
    }

    function showLoginError(message) {
        if (!loginError) return;
        loginError.textContent = message;
        loginError.style.display = 'block';
    }

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (!supabaseClient) return;
            await supabaseClient.auth.signOut();
            lockAdmin();
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
        });
    }

    const categorySelect = document.getElementById('categorySelect');
    const customInput = document.getElementById('customCategoryInput');
    if (categorySelect && customInput) {
        categorySelect.addEventListener('change', () => {
            customInput.style.display = categorySelect.value === 'custom' ? 'block' : 'none';
        });
    }

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-active');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
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
        if (!files || files.length === 0) return;
        if (!supabaseClient) {
            alert('Supabase client not initialized. Check config.js settings.');
            return;
        }

        // Session guard: verify user is authenticated before uploading
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            alert('Session expired. Please sign in again.');
            lockAdmin();
            return;
        }

        // Client-side file validation
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
        const validFiles = [];
        for (const file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                alert(`Skipped "${file.name}": Invalid type (${file.type}). Only JPEG, PNG, WEBP allowed.`);
                continue;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert(`Skipped "${file.name}": File size too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 5MB allowed.`);
                continue;
            }
            validFiles.push(file);
        }
        if (validFiles.length === 0) return;

        let category = categorySelect.value;
        if (category === 'custom') {
            category = customInput.value.trim().toLowerCase();
            if (!category) category = 'general';
        }
        const productNameInput = document.getElementById('productName').value.trim();
        const useAI = document.getElementById('aiBgRemoval').checked;

        const statusArea = document.getElementById('statusArea');
        const statusText = document.getElementById('statusText');
        const progressBar = document.getElementById('progressBar');
        const previewGrid = document.getElementById('previewGrid');
        const successNotice = document.getElementById('successNotice');

        statusArea.style.display = 'block';
        successNotice.style.display = 'none';
        previewGrid.innerHTML = '';

        const total = validFiles.length;
        let uploadedCount = 0;
        let failedCount = 0;

        for (let i = 0; i < total; i++) {
            const file = validFiles[i];
            const title = (total === 1 && productNameInput) ? productNameInput : (productNameInput ? `${productNameInput} #${i+1}` : file.name.replace(/\.[^/.]+$/, ""));
            statusText.innerText = `Processing ${i + 1} of ${total}: ${file.name}`;
            progressBar.style.width = `${((i + 1) / total) * 100}%`;

            let finalBlob = file;
            if (useAI) {
                const bgFn = window.imglyRemoveBackground || window.imglyBackgroundRemoval || (window.imgly && window.imgly.removeBackground);
                if (bgFn) {
                    try {
                        statusText.innerText = `Removing background with AI (${i + 1}/${total}): ${file.name}...`;
                        const blob = await bgFn(file);
                        finalBlob = await compositeOnStudioCanvas(blob);
                    } catch (err) {
                        console.warn("AI BG Removal fallback to studio composite:", file.name, err);
                        finalBlob = await compositeOnStudioCanvas(file);
                    }
                } else {
                    console.warn("imglyBackgroundRemoval not found on window, compositing on studio backdrop:", file.name);
                    finalBlob = await compositeOnStudioCanvas(file);
                }
            } else {
                finalBlob = await compositeOnStudioCanvas(file);
            }

            statusText.innerText = `Uploading compressed studio image to Supabase (${i + 1}/${total}): ${file.name}...`;

            try {
                const dbProduct = await uploadToSupabase(finalBlob, title, category);
                addPreviewCard(previewGrid, dbProduct.url, title);
                uploadedCount++;
            } catch (uploadErr) {
                console.error("Upload FAILED:", file.name, uploadErr);
                failedCount++;
                const errorCard = document.createElement('div');
                errorCard.className = 'preview-card';
                errorCard.style.borderColor = '#D32F2F';
                errorCard.innerHTML = `
                    <div style="color:#D32F2F; padding:10px; text-align:center;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p style="font-size:12px; margin-top:5px;">Upload failed: ${escapeHtml(title)}</p>
                        <p style="font-size:10px; color:#888;">${escapeHtml(String(uploadErr.message || uploadErr))}</p>
                    </div>
                `;
                previewGrid.appendChild(errorCard);
            }
        }

        if (uploadedCount > 0) {
            statusText.innerText = `Done! ${uploadedCount} uploaded to Supabase${failedCount > 0 ? `, ${failedCount} failed` : ''}.`;
        } else {
            statusText.innerText = `All ${total} upload(s) failed. Check Supabase RLS policies and bucket permissions.`;
        }

        progressBar.style.width = '100%';
        if (uploadedCount > 0) {
            successNotice.style.display = 'flex';
        }

        document.getElementById('productName').value = '';
        renderCatalog();
    }

    async function uploadToSupabase(blob, title, category) {
        const fileExt = 'jpg';
        const fileName = `${category}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

        // 1. Upload to Supabase Storage
        const { data: storageData, error: storageErr } = await supabaseClient
            .storage
            .from(config.storageBucket)
            .upload(fileName, blob, {
                contentType: 'image/jpeg',
                upsert: false
            });

        if (storageErr) throw storageErr;

        // 2. Get Public URL
        const { data: urlData } = supabaseClient
            .storage
            .from(config.storageBucket)
            .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        // 3. Insert record into Supabase Database
        const { data: dbData, error: dbErr } = await supabaseClient
            .from('products')
            .insert([
                {
                    title: title,
                    category: category,
                    url: publicUrl,
                    storage_path: fileName
                }
            ])
            .select()
            .single();

        if (dbErr) throw dbErr;

        return dbData;
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

    async function renderCatalog() {
        const catalogGrid = document.getElementById('catalogGrid');
        const catalogCount = document.getElementById('catalogCount');
        if (!catalogGrid || !supabaseClient) return;

        catalogGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#777; padding:20px;"><i class="fa-solid fa-spinner fa-spin"></i> Loading catalog from Supabase...</p>`;

        try {
            const { data: items, error } = await supabaseClient
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            catalogCount.innerText = `${items ? items.length : 0} item(s)`;

            if (!items || items.length === 0) {
                catalogGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#777; padding:20px;">No uploaded products yet. Drag & drop images above to add products.</p>`;
                return;
            }

            catalogGrid.innerHTML = items.map(item => {
                const safeTitle = escapeHtml(item.title);
                const safeCat = escapeHtml(item.category);
                const safeUrl = escapeHtml(item.url);
                const safeId = escapeHtml(item.id);
                const safePath = escapeHtml(item.storage_path);

                return `
                    <div class="catalog-card" data-id="${safeId}">
                        <span class="cat-badge">${safeCat}</span>
                        <img src="${safeUrl}" alt="${safeTitle}" loading="lazy">
                        <div class="card-title">${safeTitle}</div>
                        <button class="delete-btn" data-delete-id="${safeId}" data-delete-path="${safePath}">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                `;
            }).join('');
        } catch (err) {
            console.error('Fetch catalog failed:', err);
            catalogGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#D32F2F; padding:20px;">Error loading catalog: ${escapeHtml(err.message)}</p>`;
        }
    }

    async function deleteProduct(id, storagePath) {
        if (!confirm('Are you sure you want to delete this product from store catalog?')) return;
        if (!supabaseClient) return;

        // Session guard before destructive action
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            alert('Session expired. Please sign in again.');
            lockAdmin();
            return;
        }

        try {
            // 1. Delete from DB
            const { error: dbErr } = await supabaseClient
                .from('products')
                .delete()
                .eq('id', id);

            if (dbErr) throw dbErr;

            // 2. Delete from Storage if path exists
            if (storagePath && storagePath !== 'undefined') {
                await supabaseClient
                    .storage
                    .from(config.storageBucket)
                    .remove([storagePath]);
            }

            renderCatalog();
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Delete failed: ' + err.message);
        }
    }

    // Event delegation for delete buttons
    const catalogGrid = document.getElementById('catalogGrid');
    if (catalogGrid) {
        catalogGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.delete-btn');
            if (!btn) return;
            const id = btn.dataset.deleteId;
            const path = btn.dataset.deletePath;
            if (id) deleteProduct(id, path);
        });
    }

    function compositeOnStudioCanvas(bgRemovedBlob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const pad = Math.max(img.width, img.height) * 0.12;
                canvas.width = Math.round(img.width + pad * 2);
                canvas.height = Math.round(img.height + pad * 2);
                const ctx = canvas.getContext('2d');

                // 1. Studio Gradient Backdrop
                const grad = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height * 0.4, 20,
                    canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.1
                );
                grad.addColorStop(0, '#FFFFFF');
                grad.addColorStop(0.55, '#F0F0F3');
                grad.addColorStop(1, '#E0E0E5');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 2. Base Ground Contact Shadow
                ctx.save();
                const shadowY = pad + img.height * 0.97;
                const shadowRx = img.width * 0.42;
                const shadowRy = Math.max(14, img.height * 0.07);

                const sGrad = ctx.createRadialGradient(
                    canvas.width / 2, shadowY, 0,
                    canvas.width / 2, shadowY, shadowRx
                );
                sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.38)');
                sGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.18)');
                sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = sGrad;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2, shadowY, shadowRx, shadowRy, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // 3. Floating Soft Drop Shadow on product
                ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
                ctx.shadowBlur = Math.round(img.width * 0.04);
                ctx.shadowOffsetY = Math.round(img.height * 0.025);

                ctx.drawImage(img, pad, pad, img.width, img.height);

                // 4. Compress composite image to high-quality JPEG (0.85 quality ratio)
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.85);
            };
            img.onerror = () => resolve(bgRemovedBlob);
            img.src = URL.createObjectURL(bgRemovedBlob);
        });
    }

    function addPreviewCard(container, imageUrl, title) {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}">
            <span>${escapeHtml(title)}</span>
        `;
        container.appendChild(card);
    }
});
