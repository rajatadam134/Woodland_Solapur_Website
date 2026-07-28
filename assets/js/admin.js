document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const modal = document.getElementById('passcodeModal');
    const adminMain = document.getElementById('adminMain');
    const loginBtn = document.getElementById('loginBtn');
    const passcodeInput = document.getElementById('passcodeInput');
    const passcodeError = document.getElementById('passcodeError');

    const STORAGE_KEY = 'WOODLAND_STORED_PRODUCTS';
    const SESSION_KEY = 'woodland_admin_authed';

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
        const newlyUploaded = [];

        for (let i = 0; i < total; i++) {
            const file = files[i];
            const title = (total === 1 && productNameInput) ? productNameInput : (productNameInput ? `${productNameInput} #${i+1}` : file.name.replace(/\.[^/.]+$/, ""));
            statusText.innerText = `Processing ${i + 1} of ${total}: ${file.name}`;
            progressBar.style.width = `${((i + 1) / total) * 100}%`;

            let finalBlob = file;
            if (useAI && window.imgly) {
                try {
                    statusText.innerText = `Removing background with AI (${i + 1}/${total}): ${file.name}...`;
                    const blob = await window.imgly.removeBackground(file);
                    finalBlob = await compositeOnStudioCanvas(blob);
                } catch (err) {
                    console.warn("AI BG Removal fallback to original file:", file.name, err);
                }
            }

            statusText.innerText = `Uploading image (${i + 1}/${total}): ${file.name}...`;

            let imageUrl = '';
            try {
                const data = await uploadToCloudinary(finalBlob, title, category);
                imageUrl = data.secure_url;
            } catch (uploadErr) {
                console.warn("Cloudinary upload failed, saving locally:", uploadErr);
                imageUrl = await blobToDataURL(finalBlob);
            }

            const item = {
                id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                title: title,
                category: category,
                url: imageUrl,
                created_at: new Date().toISOString()
            };

            saveToLocalStorage(item);
            newlyUploaded.push(item);
            addPreviewCard(previewGrid, imageUrl, title);
        }

        statusText.innerText = `Successfully uploaded ${total} image(s) to category '${category}'.`;
        progressBar.style.width = '100%';
        successNotice.style.display = 'flex';

        document.getElementById('productName').value = '';
        renderCatalog();
    }

    function saveToLocalStorage(item) {
        const items = getStoredProducts();
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

    window.deleteProduct = function(id) {
        if (!confirm('Are you sure you want to delete this product from store catalog?')) return;
        let items = getStoredProducts();
        items = items.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        renderCatalog();
    };

    function blobToDataURL(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    function compositeOnStudioCanvas(bgRemovedBlob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = '#F5F5F7';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
                ctx.shadowBlur = 24;
                ctx.shadowOffsetY = 12;

                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.92);
            };
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
