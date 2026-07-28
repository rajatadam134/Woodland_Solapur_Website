document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const modal = document.getElementById('passcodeModal');
    const adminMain = document.getElementById('adminMain');
    const loginBtn = document.getElementById('loginBtn');
    const passcodeInput = document.getElementById('passcodeInput');
    const passcodeError = document.getElementById('passcodeError');

    loginBtn.addEventListener('click', handleLogin);
    passcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    async function handleLogin() {
        const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(passcodeInput.value));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (hashHex === config.adminPasscodeHash) {
            modal.style.display = 'none';
            adminMain.style.display = 'block';
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
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
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

        statusArea.style.display = 'block';
        previewGrid.innerHTML = '';

        const total = files.length;
        for (let i = 0; i < total; i++) {
            const file = files[i];
            const title = productNameInput || file.name.replace(/\.[^/.]+$/, "");
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

            statusText.innerText = `Uploading to Cloudinary (${i + 1}/${total}): ${file.name}...`;
            try {
                const data = await uploadToCloudinary(finalBlob, title, category);
                addPreviewCard(previewGrid, data.secure_url || URL.createObjectURL(finalBlob), title);
            } catch (uploadErr) {
                console.error("Cloudinary upload failed:", uploadErr);
            }
        }

        statusText.innerText = `Successfully uploaded ${total} images to category '${category}'.`;
        progressBar.style.width = '100%';
    }

    function compositeOnStudioCanvas(bgRemovedBlob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Studio grey background #F5F5F7
                ctx.fillStyle = '#F5F5F7';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Subtle shadow
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
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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
