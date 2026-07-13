# Woodland Solapur Dining Room Expansion & Grid Symmetry Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove kitchen category references and expand the product list to exactly 12 products by adding 2 new authentic dining suites, completing grid symmetry.

---

### Task 1: Generate AI Backdrop Product Images
Use reference gallery images to produce the 2 new dining product images.

**Files:**
- Create: `assets/images/prod_cream_dining.jpg`
- Create: `assets/images/prod_white_dining.jpg`

- [ ] **Step 1: Generate the Luxury Cream Dining image**
  Use `generate_image` with:
  - **Prompt**: "A high-end luxury dining set. Polished cream-colored marble table top supported by sculptural curved teak wood pedestal base. Paired with ergonomic high-back chairs upholstered in rich earth-brown fabric. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_cream_dining`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019122959.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 2: Copy image to assets**
  Copy from the artifacts folder to `assets/images/prod_cream_dining.jpg`.

- [ ] **Step 3: Generate the Modern White Dining image**
  Use `generate_image` with:
  - **Prompt**: "A modern sleek dining set. Pristine white quartz/marble table top with soft rounded corners, supported by solid oak legs. Paired with elegant armless dining chairs in sand-beige upholstery. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_white_dining`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019122953.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 4: Copy image to assets**
  Copy from the artifacts folder to `assets/images/prod_white_dining.jpg`.

- [ ] **Step 5: Commit images**
  Run:
  ```bash
  git add assets/images/
  git commit -m "feat(assets): add 2 new dining room product images with sand-beige studio backdrops"
  ```

---

### Task 2: Rewrite Catalog Page (`products.html`)
Modify `products.html` to remove the Kitchen filter pill and add the two new dining cards.

**Files:**
- Modify: `products.html`

- [ ] **Step 1: Remove the Kitchen filter pill**
  Delete line 55 containing `<li class="filter-pill" data-filter="kitchen">Kitchen</li>`.

- [ ] **Step 2: Append dining cards to the products grid**
  Insert the two new cards at the end of the products grid:
  ```html
              <!-- Card 11: Luxury Cream Marble Dining Suite -->
              <div class="product-card" data-category="dining">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_cream_dining.jpg" alt="Luxury Cream Marble Dining Suite" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/luxury-cream-dining.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Dining Room / Suite</span>
                      <h3>Luxury Cream Marble Dining Suite</h3>
                  </div>
              </div>
              <!-- Card 12: Modern White Marble Dining Table -->
              <div class="product-card" data-category="dining">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_white_dining.jpg" alt="Modern White Marble Dining Table" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/modern-white-dining.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Dining Room / Table</span>
                      <h3>Modern White Marble Dining Table</h3>
                  </div>
              </div>
  ```

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add products.html
  git commit -m "feat(catalog): remove kitchen filter and add 2 new dining products for grid symmetry"
  ```

---

### Task 3: Create Detail Pages
Build the 2 new detail subpages.

**Files:**
- Create: `products/luxury-cream-dining.html`
- Create: `products/modern-white-dining.html`

- [ ] **Step 1: Create `products/luxury-cream-dining.html`**
  Build the detail page targeting `WD-DN-02` with pre-filled WhatsApp concierges.

- [ ] **Step 2: Create `products/modern-white-dining.html`**
  Build the detail page targeting `WD-DN-03` with pre-filled WhatsApp concierges.

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add products/
  git commit -m "feat(detail-pages): add detail pages for the 2 new dining products"
  ```

---

### Task 4: Verify and Test
Validate routes and links.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status**
  Run: `git status`
  Expected: Clean working tree.
