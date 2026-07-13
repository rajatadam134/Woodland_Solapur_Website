# Woodland Solapur Product Catalog Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely replace the fictional product catalog on the website with exactly 10 authentic products from the client's original site, featuring sand-beige luxury-themed studio backdrops.

**Architecture:** We will generate 7 additional luxury-themed product images using AI reference-based mapping. We will then rewrite `products.html` to house exactly the 10 real products and recreate the detail files in the `products/` subdirectory.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6), AI Image Generator, BeautifulSoup link validator.

## Global Constraints
- **Naming & Copy**: Brand logo text "Woodland" must be used; all Solapur showroom contact and location copy must remain exact and uniform.
- **WhatsApp Integration**: Mapped all CTA buttons to testing number +91 87672 23224 (represented as 918767223224 in links).
- **Price Restriction**: Absolutely no prices should be displayed on any page.
- **Design Aesthetics**: Outfit font for headers, Plus Jakarta Sans font for body text, Canvas color `#F4F1EA`, accent color `#524032`.
- **Link Security**: All anchors opening in new tabs must use `rel="noopener noreferrer"`.

---

### Task 1: Generate AI Backdrop Product Images
Use reference images under `scratch/original_images/` to produce the remaining 7 luxury sand-beige backdrop product images.

**Files:**
- Create: `assets/images/prod_bed_set.png`
- Create: `assets/images/prod_dining_suite.png`
- Create: `assets/images/prod_office_chair.png`
- Create: `assets/images/prod_compactors.png`
- Create: `assets/images/prod_tv_console.png`
- Create: `assets/images/prod_mattress.png`
- Create: `assets/images/prod_curtains.png`

- [ ] **Step 1: Generate the Bed Set image**
  Use `generate_image` with:
  - **Prompt**: "A luxurious master double bed set. Padded solid teak wood frame with built-in headboard paneling in rich plum/purple fabric. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_bed_set`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\bedroom_set.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 2: Copy bed set image to assets**
  Copy from the artifacts folder to `assets/images/prod_bed_set.png`.

- [ ] **Step 3: Generate the Dining Suite image**
  Use `generate_image` with:
  - **Prompt**: "A handcrafted rectangular teak wood dining table with six matching high-back chairs. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_dining_suite`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\dining_table.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 4: Copy dining suite image to assets**
  Copy from the artifacts folder to `assets/images/prod_dining_suite.png`.

- [ ] **Step 5: Generate the Office Chair image**
  Use `generate_image` with:
  - **Prompt**: "A commercial ergonomic high-back executive mesh/cushion office chair. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_office_chair`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\office_chair.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 6: Copy office chair image to assets**
  Copy from the artifacts folder to `assets/images/prod_office_chair.png`.

- [ ] **Step 7: Generate the Compactors image**
  Use `generate_image` with:
  - **Prompt**: "A heavy-duty metal and teak wood compactor locker storage system. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_compactors`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\compactors.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 8: Copy compactors image to assets**
  Copy from the artifacts folder to `assets/images/prod_compactors.png`.

- [ ] **Step 9: Generate the TV Console image**
  Use `generate_image` with:
  - **Prompt**: "A modern low-profile teak wood television console unit with wide open shelving. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_tv_console`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\tv_console.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 10: Copy TV console image to assets**
  Copy from the artifacts folder to `assets/images/prod_tv_console.png`.

- [ ] **Step 11: Generate the Mattress image**
  Use `generate_image` with:
  - **Prompt**: "A premium comfort orthopedic pocket spring mattress with cooling memory foam layers. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_mattress`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\mattress.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 12: Copy mattress image to assets**
  Copy from the artifacts folder to `assets/images/prod_mattress.png`.

- [ ] **Step 13: Generate the Curtains image**
  Use `generate_image` with:
  - **Prompt**: "Premium draped luxury window showroom curtains hanging elegantly. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_curtains`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\curtains.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 14: Copy curtains image to assets**
  Copy from the artifacts folder to `assets/images/prod_curtains.png`.

- [ ] **Step 15: Commit image assets**
  Run:
  ```bash
  git add assets/images/
  git commit -m "feat(assets): add complete suite of authentic client product images with luxury sand backdrops"
  ```

---

### Task 2: Rewrite Catalog Page (`products.html`)
Modify `products.html` to host exactly the 10 authentic products mapped to correct categories.

**Files:**
- Modify: `products.html`

- [ ] **Step 1: Replace the products grid contents**
  Open `products.html` and replace all elements inside `div.products-grid` with the following 10 cards:
  ```html
              <!-- Card 1: Windsor Velvet Sofa -->
              <div class="product-card" data-category="living">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_yellow_sofa.png" alt="Windsor Velvet Sofa" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/windsor-velvet-sofa.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Living Room / Sofa</span>
                      <h3>Windsor Velvet Sofa</h3>
                  </div>
              </div>
              <!-- Card 2: Staggered Center Table -->
              <div class="product-card" data-category="living">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_coffee_table.png" alt="Staggered Center Table" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/staggered-center-table.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Living Room / Table</span>
                      <h3>Staggered Center Table</h3>
                  </div>
              </div>
              <!-- Card 3: Teak TV Console Unit -->
              <div class="product-card" data-category="living">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_tv_console.png" alt="Teak TV Console Unit" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/teak-tv-console.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Living Room / TV Console</span>
                      <h3>Teak TV Console Unit</h3>
                  </div>
              </div>
              <!-- Card 4: Premium Draped Curtains -->
              <div class="product-card" data-category="living">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_curtains.png" alt="Premium Draped Curtains" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/premium-draped-curtains.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Living Room / Curtains</span>
                      <h3>Premium Draped Curtains</h3>
                  </div>
              </div>
              <!-- Card 5: Classic Teak Bed Set -->
              <div class="product-card" data-category="bedroom">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_bed_set.png" alt="Classic Teak Bed Set" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/classic-teak-bed-set.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Bedroom / Bed</span>
                      <h3>Classic Teak Bed Set</h3>
                  </div>
              </div>
              <!-- Card 6: Luxury Pocket Spring Mattress -->
              <div class="product-card" data-category="bedroom">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_mattress.png" alt="Luxury Pocket Spring Mattress" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/luxury-pocket-mattress.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Bedroom / Mattress</span>
                      <h3>Luxury Pocket Spring Mattress</h3>
                  </div>
              </div>
              <!-- Card 7: Classic Teak Dining Suite -->
              <div class="product-card" data-category="dining">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_dining_suite.png" alt="Classic Teak Dining Suite" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/classic-teak-dining-suite.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Dining Room / Suite</span>
                      <h3>Classic Teak Dining Suite</h3>
                  </div>
              </div>
              <!-- Card 8: Veneer Conference Desk -->
              <div class="product-card" data-category="office">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_office_table.png" alt="Veneer Conference Desk" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/veneer-conference-desk.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Office / Table</span>
                      <h3>Veneer Conference Desk</h3>
                  </div>
              </div>
              <!-- Card 9: Office Executive Ergonomic Chair -->
              <div class="product-card" data-category="office">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_office_chair.png" alt="Office Executive Ergonomic Chair" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/office-executive-chair.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Office / Chair</span>
                      <h3>Office Executive Ergonomic Chair</h3>
                  </div>
              </div>
              <!-- Card 10: Teak Compactors Storage System -->
              <div class="product-card" data-category="office">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_compactors.png" alt="Teak Compactors Storage System" loading="lazy">
                      <div class="glass-hover-overlay">
                          <a href="products/teak-compactors-storage.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Office / Storage</span>
                      <h3>Teak Compactors Storage System</h3>
                  </div>
              </div>
  ```

- [ ] **Step 2: Commit catalog changes**
  Run:
  ```bash
  git add products.html
  git commit -m "feat(catalog): completely rebuild products list with 10 real client items"
  ```

---

### Task 3: Clean Fictional Pages and Create Real Detail Pages
Delete the fictional pages and create the new detail pages under `products/`.

**Files:**
- Delete: `products/chesterfield-sofa.html`
- Delete: `products/contor-arm-chair.html`
- Delete: `products/ergopro-task-chair.html`
- Delete: `products/minimalist-work-desk.html`
- Delete: `products/serene-teak-bed.html`
- Delete: `products/wishbone-dining-chair.html`
- Create: `products/teak-tv-console.html`
- Create: `products/premium-draped-curtains.html`
- Create: `products/classic-teak-bed-set.html`
- Create: `products/luxury-pocket-mattress.html`
- Create: `products/classic-teak-dining-suite.html`
- Create: `products/office-executive-chair.html`
- Create: `products/teak-compactors-storage.html`

- [ ] **Step 1: Delete all old fictional HTML files**
  Delete:
  - `products/chesterfield-sofa.html`
  - `products/contor-arm-chair.html`
  - `products/ergopro-task-chair.html`
  - `products/minimalist-work-desk.html`
  - `products/serene-teak-bed.html`
  - `products/wishbone-dining-chair.html`

- [ ] **Step 2: Create `products/teak-tv-console.html`**
  Build the detail page with OpenGraph tags, spec accordions, and WhatsApp prefilled text targeting `WD-TV-01`.

- [ ] **Step 3: Create `products/premium-draped-curtains.html`**
  Build the detail page targeting `WD-CR-01`.

- [ ] **Step 4: Create `products/classic-teak-bed-set.html`**
  Build the detail page targeting `WD-BD-01`.

- [ ] **Step 5: Create `products/luxury-pocket-mattress.html`**
  Build the detail page targeting `WD-MT-01`.

- [ ] **Step 6: Create `products/classic-teak-dining-suite.html`**
  Build the detail page targeting `WD-DN-01`.

- [ ] **Step 7: Create `products/office-executive-chair.html`**
  Build the detail page targeting `WD-CH-01`.

- [ ] **Step 8: Create `products/teak-compactors-storage.html`**
  Build the detail page targeting `WD-CM-01`.

- [ ] **Step 9: Commit changes**
  Run:
  ```bash
  git add products/
  git commit -m "feat(detail-pages): replace all fictional pages with real client product subpages"
  ```

---

### Task 4: Verify and Test
Verify all routes and links.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status**
  Run: `git status`
  Expected: Clean working tree.
