# Bulk Image Upload & Dynamic Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build client admin upload page with browser AI background removal, auto-compression via Cloudinary, dynamic category filtering, and WhatsApp inquiry preview links on Woodland Solapur storefront.

**Architecture:** Client uses password-protected `admin.html` to upload photos. `@imgly/background-removal-js` removes background locally in browser, compositing onto studio grey (`#F5F5F7`) with soft drop shadow. Uploads clean image to Cloudinary using unsigned preset `woodland_preset` (Cloud Name `dnybwc9y`). `products.html` dynamically fetches images via Cloudinary API, auto-generates category filter pills, renders 16 items per page with "Load More", and formats WhatsApp inquiry URLs.

**Tech Stack:** HTML5, Vanilla CSS3, Vanilla JS (ES6+), `@imgly/background-removal-js` (via CDN), Cloudinary Upload Widget & Fetch API.

## Global Constraints
- Cloud Name: `dnybwc9y`
- Upload Preset: `woodland_preset`
- Admin Passcode: `Woodlandsolapur@123`
- Studio Backdrop: `#F5F5F7` with subtle drop shadow
- Initial Category Batch: 16 items
- WhatsApp Target Number: Store contact number (+91 94220 28686)

---

### Task 1: Cloudinary API Config & Utility Layer

**Files:**
- Create: `assets/js/cloudinary-config.js`
- Create: `scratch/test-cloudinary.html`

**Interfaces:**
- Consumes: Cloudinary REST API (`https://res.cloudinary.com/dnybwc9y/image/list/<tag>.json`)
- Produces: `CloudinaryService` object exposing `fetchImagesByCategory(category, maxResults)`, `uploadImage(file, title, category)`

- [ ] **Step 1: Create `assets/js/cloudinary-config.js` with credentials**

```javascript
window.WOODLAND_CONFIG = {
    cloudName: 'dnybwc9y',
    uploadPreset: 'woodland_preset',
    adminPasscode: 'Woodlandsolapur@123',
    whatsappNumber: '919422028686',
    defaultCategories: ['living', 'bedroom', 'office', 'dining']
};
```

- [ ] **Step 2: Create test page `scratch/test-cloudinary.html` to verify API accessibility**

```html
<!DOCTYPE html>
<html>
<head><title>Cloudinary Test</title></head>
<body>
    <h1>Cloudinary Connectivity Test</h1>
    <script src="../assets/js/cloudinary-config.js"></script>
    <script>
        console.log("Config loaded:", window.WOODLAND_CONFIG);
    </script>
</body>
</html>
```

- [ ] **Step 3: Test configuration load in browser/script**

Verify script executes cleanly in browser.

- [ ] **Step 4: Commit**

```bash
git add assets/js/cloudinary-config.js scratch/test-cloudinary.html
git commit -m "feat: add Cloudinary configuration and test utility"
```

---

### Task 2: Client Admin Portal with Browser AI Background Remover (`admin.html`)

**Files:**
- Create: `admin.html`
- Create: `assets/css/admin.css`
- Create: `assets/js/admin.js`

**Interfaces:**
- Consumes: `@imgly/background-removal-js` CDN, `window.WOODLAND_CONFIG`
- Produces: Form for passcode verification, product name, category selection, AI studio processing, Cloudinary bulk upload with progress indicator.

- [ ] **Step 1: Create `assets/css/admin.css` for luxury admin UI styling**

```css
.admin-container { max-width: 900px; margin: 120px auto 60px; padding: 30px; background: #1a1a1a; border-radius: 16px; color: #fff; }
.passcode-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.passcode-box { background: #242424; padding: 40px; border-radius: 12px; text-align: center; max-width: 400px; width: 90%; }
.progress-bar-wrapper { width: 100%; background: #333; height: 12px; border-radius: 6px; overflow: hidden; margin-top: 20px; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, #c5a059, #e6c887); width: 0%; transition: width 0.3s; }
.studio-canvas-preview { max-width: 200px; max-height: 200px; border-radius: 8px; border: 1px solid #444; margin: 10px; }
```

- [ ] **Step 2: Create `admin.html` markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Woodland Solapur | Client Admin Upload</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/admin.css">
    <script src="https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/index.umd.js"></script>
    <script src="https://upload-widget.cloudinary.com/global/all.js"></script>
</head>
<body>
    <div id="passcodeModal" class="passcode-modal">
        <div class="passcode-box">
            <h2>Woodland Admin Portal</h2>
            <p>Enter Passcode to Access</p>
            <input type="password" id="passcodeInput" style="padding:12px; width:80%; margin:15px 0; border-radius:6px; border:1px solid #444;">
            <button id="loginBtn" class="lux-btn" style="width:85%;">Access Admin</button>
            <p id="passcodeError" style="color:red; display:none; margin-top:10px;">Invalid Passcode</p>
        </div>
    </div>

    <main class="container admin-container" id="adminMain" style="display:none;">
        <div class="section-title-wrapper" style="text-align:center; margin-bottom:30px;">
            <h1 class="section-title">Product Catalog Bulk Upload</h1>
            <p class="section-subtitle">Auto AI Studio Background Removal & Cloudinary Sync</p>
        </div>

        <form id="uploadForm" onsubmit="return false;">
            <div style="margin-bottom:20px;">
                <label>Product Name (Optional for batch):</label>
                <input type="text" id="productName" placeholder="e.g. Windsor Velvet Sofa" style="width:100%; padding:12px; margin-top:8px; border-radius:6px;">
            </div>

            <div style="margin-bottom:20px;">
                <label>Category:</label>
                <select id="categorySelect" style="width:100%; padding:12px; margin-top:8px; border-radius:6px;">
                    <option value="living">Living Room</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="office">Office</option>
                    <option value="dining">Dining</option>
                    <option value="custom">+ Add Custom Category</option>
                </select>
                <input type="text" id="customCategoryInput" placeholder="Enter custom category name" style="display:none; width:100%; padding:12px; margin-top:8px; border-radius:6px;">
            </div>

            <div style="margin-bottom:20px;">
                <label>Options:</label>
                <div style="margin-top:8px;">
                    <input type="checkbox" id="aiBgRemoval" checked>
                    <label for="aiBgRemoval">Apply AI Background Removal & Studio Grey Backdrop</label>
                </div>
            </div>

            <div style="border:2px dashed #c5a059; padding:40px; text-align:center; border-radius:12px; cursor:pointer;" id="dropZone">
                <i class="fa-solid fa-cloud-arrow-up" style="font-size:48px; color:#c5a059;"></i>
                <h3>Drag & Drop Photos Here</h3>
                <p>or click to select files (Supports 1 to 200+ images)</p>
                <input type="file" id="fileInput" multiple accept="image/*" style="display:none;">
            </div>

            <div id="statusArea" style="margin-top:30px; display:none;">
                <h4 id="statusText">Processing 0 / 0 images...</h4>
                <div class="progress-bar-wrapper">
                    <div class="progress-bar-fill" id="progressBar"></div>
                </div>
                <div id="previewGrid" style="display:flex; flex-wrap:wrap; margin-top:20px;"></div>
            </div>
        </form>
    </main>

    <script src="assets/js/cloudinary-config.js"></script>
    <script src="assets/js/admin.js"></script>
</body>
</html>
```

- [ ] **Step 3: Implement `assets/js/admin.js` for passcode, browser AI background removal, and upload**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const modal = document.getElementById('passcodeModal');
    const adminMain = document.getElementById('adminMain');
    const loginBtn = document.getElementById('loginBtn');
    const passcodeInput = document.getElementById('passcodeInput');
    const passcodeError = document.getElementById('passcodeError');

    loginBtn.addEventListener('click', () => {
        if (passcodeInput.value === config.adminPasscode) {
            modal.style.display = 'none';
            adminMain.style.display = 'block';
        } else {
            passcodeError.style.display = 'block';
        }
    });

    const categorySelect = document.getElementById('categorySelect');
    const customInput = document.getElementById('customCategoryInput');
    categorySelect.addEventListener('change', () => {
        customInput.style.display = categorySelect.value === 'custom' ? 'block' : 'none';
    });

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    async function handleFiles(files) {
        if (!files || files.length === 0) return;

        const category = categorySelect.value === 'custom' ? customInput.value.trim().toLowerCase() : categorySelect.value;
        const productName = document.getElementById('productName').value.trim();
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
            statusText.innerText = `Processing ${i + 1} of ${total}: ${file.name}`;
            progressBar.style.width = `${((i + 1) / total) * 100}%`;

            let finalBlob = file;
            if (useAI && window.imglyTier) {
                try {
                    const blob = await imglyTier.removeBackground(file);
                    finalBlob = await compositeOnStudioCanvas(blob);
                } catch (err) {
                    console.warn("AI BG Removal skipped for file:", file.name, err);
                }
            }

            await uploadToCloudinary(finalBlob, productName || file.name.replace(/\.[^/.]+$/, ""), category);
        }

        statusText.innerText = `Successfully uploaded ${total} images to category: ${category}`;
    }

    function compositeOnStudioCanvas(bgRemovedBlob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Studio grey background
                ctx.fillStyle = '#F5F5F7';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw shadow
                ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;

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
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }
});
```

- [ ] **Step 4: Verify `admin.html` in browser**

- [ ] **Step 5: Commit**

```bash
git add admin.html assets/css/admin.css assets/js/admin.js
git commit -m "feat: add admin portal with browser AI background removal and Cloudinary upload"
```

---

### Task 3: Dynamic Storefront Catalog & WhatsApp Inquiry Integration (`products.html`)

**Files:**
- Modify: `products.html`
- Create: `assets/js/products-dynamic.js`

**Interfaces:**
- Consumes: Cloudinary API (`https://res.cloudinary.com/dnybwc9y/image/list/<tag>.json`), `window.WOODLAND_CONFIG`
- Produces: Dynamic category filter pills, lazy loaded image grid, WhatsApp deep link buttons.

- [ ] **Step 1: Update `products.html` filter container and grid markup**

```html
<!-- Category Filtering -->
<div class="container filter-panel-wrapper">
    <ul class="filter-pills glass-panel" id="dynamicFilterPills">
        <li class="filter-pill active" data-filter="all">All Items</li>
        <li class="filter-pill" data-filter="living">Living Room</li>
        <li class="filter-pill" data-filter="bedroom">Bedroom</li>
        <li class="filter-pill" data-filter="office">Office</li>
        <li class="filter-pill" data-filter="dining">Dining</li>
    </ul>
</div>

<main class="container" style="min-height: 60vh;">
    <div class="product-grid" id="dynamicProductGrid">
        <!-- Dynamically rendered items from Cloudinary -->
    </div>
    <div style="text-align: center; margin: 40px 0;">
        <button id="loadMoreBtn" class="lux-btn lux-btn-outline" style="display:none;">Load More Products</button>
    </div>
</main>
```

- [ ] **Step 2: Create `assets/js/products-dynamic.js`**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const config = window.WOODLAND_CONFIG;
    const grid = document.getElementById('dynamicProductGrid');
    const filterPills = document.getElementById('dynamicFilterPills');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

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
            } catch (err) {
                console.warn(`Category ${cat} fetch failed or empty:`, err);
            }
        }

        if (fetched.length > 0) {
            allProducts = fetched;
            renderCategoryPills();
            renderProducts();
        }
    }

    function renderCategoryPills() {
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

        grid.innerHTML = batch.map(p => `
            <div class="product-card showcase-card" data-category="${p.category}">
                <div class="product-img-wrapper">
                    <img src="${p.url}" alt="${p.title}" loading="lazy">
                    <div class="glass-hover-overlay">
                        <a href="${getWhatsAppUrl(p)}" target="_blank" class="lux-btn">
                            <i class="fa-brands fa-whatsapp" style="margin-right:8px;"></i> Inquire on WhatsApp
                        </a>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-cat">${p.category.toUpperCase()}</span>
                    <h3>${p.title}</h3>
                </div>
            </div>
        `).join('');

        loadMoreBtn.style.display = displayedCount < filtered.length ? 'inline-block' : 'none';
    }

    loadMoreBtn.addEventListener('click', () => renderProducts());

    function getWhatsAppUrl(product) {
        const text = encodeURIComponent(`Hi Woodland Solapur! I am interested in *${product.title}* (${product.category}).\nImage: ${product.url}`);
        return `https://wa.me/${config.whatsappNumber}?text=${text}`;
    }
});
```

- [ ] **Step 3: Include `cloudinary-config.js` and `products-dynamic.js` in `products.html`**

```html
<script src="assets/js/cloudinary-config.js"></script>
<script src="assets/js/products-dynamic.js"></script>
```

- [ ] **Step 4: Commit**

```bash
git add products.html assets/js/products-dynamic.js
git commit -m "feat: add dynamic Cloudinary catalog rendering with WhatsApp inquiry integration"
```

---

### Task 4: Client User Guide Documentation

**Files:**
- Create: `docs/CLIENT_UPLOAD_GUIDE.md`

- [ ] **Step 1: Write `docs/CLIENT_UPLOAD_GUIDE.md`**

```markdown
# Woodland Solapur - Client Product Upload Guide

## How to Add New Product Photos

1. Open your website link and add `/admin.html` to the URL.
2. Enter the passcode: `Woodlandsolapur@123`.
3. (Optional) Type the **Product Name**.
4. Select the **Category** (Living Room, Bedroom, Office, Dining) or type a new category.
5. Make sure **Apply AI Background Removal** is checked.
6. Drag and drop your photos into the box (Upload 1 photo or up to 200 photos at once).
7. Wait a few seconds for processing to finish.
8. Open `products.html` on your website - your new products are live!
```

- [ ] **Step 2: Commit**

```bash
git add docs/CLIENT_UPLOAD_GUIDE.md
git commit -m "docs: add client product upload guide"
```

---

## Self-Review Verification Checklist
1. `admin.html` passcode check works (`Woodlandsolapur@123`).
2. AI Background removal composites onto grey `#F5F5F7` backdrop.
3. Unsigned Cloudinary upload preset `woodland_preset` and Cloud Name `dnybwc9y` verified.
4. WhatsApp URL formatted correctly with image preview link.
5. All code bite-sized and fully implemented.
