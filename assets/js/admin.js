document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const modal = document.getElementById('passcodeModal');
    const adminMain = document.getElementById('adminMain');
    const loginBtn = document.getElementById('loginBtn');
    const passcodeInput = document.getElementById('passcodeInput');
    const passcodeError = document.getElementById('passcodeError');

    const STORAGE_KEY = 'WOODLAND_STORED_PRODUCTS';
    const SESSION_KEY = 'woodland_admin_authed';

    // Clean up old data: URLs from localStorage on load
    cleanupDataUrls();

    // Auto-unlock if session authenticated
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        modal.style.display = 'none';
        adminMain.style.display = 'block';
        renderCatalog();
    }

    loginBtn.addEventListener('click', handleLogin);
    passcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    async function handleLogin() {
        const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(passcodeInput.value));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (hashHex === config.adminPasscodeHash) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            modal.style.display = 'none';
            adminMain.style.display = 'block';
            renderCatalog();
        } else {
            passcodeError.style.display = 'block';
        }
    }

    const categorySelect = document.getElementById('categorySelect');
    const customInput = document.getElementById('customCategoryInput');
    categorySelect.addEventListener('change', () => {
        customInput.style.display = categorySelect.value === 'custom' ? 'block' : 'none';
    });

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

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

    async function handleFiles(files) {
        if (!files || files.length === 0) return;

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

        const total = files.length;
        let uploadedCount = 0;
        let failedCount = 0;

        for (let i = 0; i < total; i++) {
            const file = files[i];
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
            }

            statusText.innerText = `Uploading to Cloudinary (${i + 1}/${total}): ${file.name}...`;

            try {
                const data = await uploadToCloudinary(finalBlob, title, category);
                const item = {
                    id: data.public_id || ('prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)),
                    title: title,
                    category: category,
                    url: data.secure_url,
                    public_id: data.public_id,
                    created_at: new Date().toISOString()
                };
                saveToLocalStorage(item);
                addPreviewCard(previewGrid, data.secure_url, title);
                uploadedCount++;
            } catch (uploadErr) {
                console.error("Cloudinary upload FAILED:", file.name, uploadErr);
                failedCount++;
                const errorCard = document.createElement('div');
                errorCard.className = 'preview-card';
                errorCard.style.borderColor = '#D32F2F';
                errorCard.innerHTML = `
                    <div style="color:#D32F2F; padding:10px; text-align:center;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p style="font-size:12px; margin-top:5px;">Upload failed: ${title}</p>
                        <p style="font-size:10px; color:#888;">${uploadErr.message}</p>
                    </div>
                `;
                previewGrid.appendChild(errorCard);
            }
        }

        // Publish catalog to Cloudinary as raw JSON for cross-device access
        if (uploadedCount > 0) {
            statusText.innerText = 'Publishing catalog to cloud...';
            try {
                await publishCatalog();
                statusText.innerText = `Done! ${uploadedCount} uploaded${failedCount > 0 ? `, ${failedCount} failed` : ''} — catalog synced to cloud.`;
            } catch (pubErr) {
                console.error('Catalog publish failed:', pubErr);
                statusText.innerText = `${uploadedCount} image(s) uploaded to Cloudinary. Catalog sync failed — see console. Products may not appear on other devices until next sync.`;
            }
        } else {
            statusText.innerText = `All ${total} upload(s) failed. Check Cloudinary upload preset settings in dashboard.`;
        }

        progressBar.style.width = '100%';
        if (uploadedCount > 0) {
            successNotice.style.display = 'flex';
        }

        document.getElementById('productName').value = '';
        renderCatalog();
    }

    /**
     * Remove old data: URL items and duplicates from localStorage.
     * data: URLs only work on the device that created them and bloat storage.
     * Duplicates happen when same image is uploaded multiple times.
     */
    function cleanupDataUrls() {
        const items = getStoredProducts();
        // Remove data: URLs
        let cleaned = items.filter(item => item.url && !item.url.startsWith('data:'));
        // Remove duplicates (keep first occurrence of each URL)
        const seenUrls = new Set();
        cleaned = cleaned.filter(item => {
            if (seenUrls.has(item.url)) return false;
            seenUrls.add(item.url);
            return true;
        });
        if (cleaned.length !== items.length) {
            const removedCount = items.length - cleaned.length;
            console.log(`Cleaned ${removedCount} invalid/duplicate item(s) from localStorage.`);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
        }
    }

    function saveToLocalStorage(item) {
        const items = getStoredProducts();
        // Prevent duplicates — skip if same URL already exists
        if (items.some(existing => existing.url === item.url)) {
            console.log('Duplicate URL skipped:', item.title);
            return;
        }
        items.unshift(item);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.error("Failed to save to localStorage:", e);
        }
    }

    function getStoredProducts() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Publish product catalog as a raw JSON file to Cloudinary.
     * Merges cloud-stored items with localStorage to prevent data loss.
     */
    async function publishCatalog() {
        let items = getStoredProducts();
        
        // Try fetching existing cloud catalog to merge
        try {
            const cloudRes = await fetch(`https://res.cloudinary.com/${config.cloudName}/raw/upload/woodland_catalog.json?_t=${Date.now()}`);
            if (cloudRes.ok) {
                const cloudItems = await cloudRes.json();
                if (Array.isArray(cloudItems)) {
                    const seenUrls = new Set(items.map(i => i.url));
                    cloudItems.forEach(ci => {
                        if (ci.url && ci.url.startsWith('https://') && !seenUrls.has(ci.url)) {
                            items.push(ci);
                            seenUrls.add(ci.url);
                        }
                    });
                    // Save merged list back to localStorage
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
                }
            }
        } catch (e) {
            console.warn('Could not fetch existing cloud catalog for merge:', e.message);
        }

        // Filter out any invalid non-https URLs or dummy test URLs
        const validItems = items.filter(item => item.url && item.url.startsWith('https://') && !item.url.includes('v1722170000'));

        const catalogJson = JSON.stringify(validItems, null, 2);
        const blob = new Blob([catalogJson], { type: 'application/json' });

        const formData = new FormData();
        formData.append('file', blob, 'woodland_catalog_v1.json');
        formData.append('upload_preset', config.catalogPreset || config.uploadPreset);
        formData.append('public_id', 'woodland_catalog_v1.json');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/raw/upload`, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        console.log('Catalog published to Cloudinary:', data.secure_url);
        return data;
    }

    // Expose publishCatalog globally for the Sync button
    window.syncCatalogToCloud = async function() {
        const syncBtn = document.getElementById('syncCatalogBtn');
        if (syncBtn) {
            syncBtn.disabled = true;
            syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Syncing...';
        }
        try {
            await publishCatalog();
            if (syncBtn) {
                syncBtn.innerHTML = '<i class="fa-solid fa-check"></i> Synced!';
                setTimeout(() => {
                    syncBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sync to Cloud';
                    syncBtn.disabled = false;
                }, 2000);
            }
        } catch (err) {
            console.error('Manual catalog sync failed:', err);
            if (syncBtn) {
                syncBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Sync Failed';
                syncBtn.style.borderColor = '#D32F2F';
                syncBtn.style.color = '#D32F2F';
                setTimeout(() => {
                    syncBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sync to Cloud';
                    syncBtn.disabled = false;
                    syncBtn.style.borderColor = '';
                    syncBtn.style.color = '';
                }, 3000);
            }
            alert('Catalog sync failed. Make sure the "woodland_catalog" upload preset exists in your Cloudinary dashboard (Settings > Upload > Upload Presets). It should be Unsigned, with Overwrite ON and Unique Filename OFF.');
        }
    };

    function renderCatalog() {
        const catalogGrid = document.getElementById('catalogGrid');
        const catalogCount = document.getElementById('catalogCount');
        if (!catalogGrid) return;

        const items = getStoredProducts();
        catalogCount.innerText = `${items.length} item(s)`;

        if (items.length === 0) {
            catalogGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#777; padding:20px;">No uploaded products yet. Drag & drop images above to add products.</p>`;
            return;
        }

        catalogGrid.innerHTML = items.map(item => `
            <div class="catalog-card" data-id="${item.id}">
                <span class="cat-badge">${item.category}</span>
                <img src="${item.url}" alt="${item.title}" loading="lazy">
                <div class="card-title">${item.title}</div>
                <button class="delete-btn" onclick="deleteProduct('${item.id}')">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        `).join('');
    }

    window.deleteProduct = async function(id) {
        if (!confirm('Are you sure you want to delete this product from store catalog?')) return;
        let items = getStoredProducts();
        items = items.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        renderCatalog();

        // Re-publish catalog to Cloudinary so the deletion is reflected cross-device
        try {
            await publishCatalog();
            console.log('Catalog updated after product deletion.');
        } catch (err) {
            console.error('Failed to sync catalog after delete:', err);
        }
    };

    function compositeOnStudioCanvas(bgRemovedBlob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const pad = Math.max(img.width, img.height) * 0.08;
                canvas.width = Math.round(img.width + pad * 2);
                canvas.height = Math.round(img.height + pad * 2);
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = '#F5F5F7';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
                ctx.shadowBlur = 24;
                ctx.shadowOffsetY = 12;

                ctx.drawImage(img, pad, pad, img.width, img.height);
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.92);
            };
            img.onerror = () => resolve(bgRemovedBlob);
            img.src = URL.createObjectURL(bgRemovedBlob);
        });
    }

    function uploadToCloudinary(blob, title, category) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blob);
            formData.append('upload_preset', config.uploadPreset);
            formData.append('tags', category);
            formData.append('context', `caption=${title}|title=${title}`);

            fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP status ${res.status}`);
                return res.json();
            })
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }

    function addPreviewCard(container, imageUrl, title) {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <span>${title}</span>
        `;
        container.appendChild(card);
    }
});
