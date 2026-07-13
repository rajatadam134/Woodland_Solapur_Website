# Woodland Solapur Gallery Catalog Grid Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Inspiration Gallery (`gallery.html`) into a clean, spacious 3x3 square catalog grid containing 9 centered product assets, correcting all zoomed-in/cluttered appearance.

---

### Task 1: Update CSS Styles for catalog-grid
Add the new grid and spacing styles to `assets/css/style.css`.

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Append catalog-grid styles**
  Append the new styles to the end of `assets/css/style.css`:
  ```css
  /* Catalog Grid Gallery Layout */
  .gallery-grid.catalog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      padding: 40px 0;
      align-items: stretch;
  }
  
  .gallery-grid.catalog-grid .gallery-item {
      position: relative;
      aspect-ratio: 1 / 1;
      background: #FAF9F6;
      border-radius: 24px;
      padding: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(82, 64, 50, 0.03);
      border: 1px solid rgba(82, 64, 50, 0.05);
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  }
  
  .gallery-grid.catalog-grid .gallery-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(82, 64, 50, 0.08);
  }
  
  .gallery-grid.catalog-grid .gallery-item img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain !important;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .gallery-grid.catalog-grid .gallery-item:hover img {
      transform: scale(1.04);
  }
  
  /* Responsive breakpoint adjustments for catalog grid */
  @media (max-width: 992px) {
      .gallery-grid.catalog-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px;
      }
      .gallery-grid.catalog-grid .gallery-item {
          padding: 36px;
      }
  }
  
  @media (max-width: 576px) {
      .gallery-grid.catalog-grid {
          grid-template-columns: 1fr !important;
          gap: 20px;
      }
      .gallery-grid.catalog-grid .gallery-item {
          padding: 24px;
      }
  }
  ```

- [ ] **Step 2: Commit css changes**
  Run:
  ```bash
  git add assets/css/style.css
  git commit -m "feat(styles): add catalog-grid styles for spaced gallery blocks"
  ```

---

### Task 2: Rewrite Gallery HTML markup
Update `gallery.html` to house 9 clean product catalog items.

**Files:**
- Modify: `gallery.html`

- [ ] **Step 1: Replace grid container in `gallery.html`**
  Modify `<main class="container gallery-grid staggered-collage">` to use the `catalog-grid` class and populate it with 9 items:
  ```html
      <main class="container gallery-grid catalog-grid">
          <div class="gallery-item" data-image="assets/images/prod_yellow_sofa.png" data-ref="gal-sofa" data-title="Windsor Velvet Sofa" tabindex="0" role="button">
              <img src="assets/images/prod_yellow_sofa.png" alt="Windsor Velvet Sofa" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_office_chair.png" data-ref="gal-office-chair" data-title="Office Executive Chair" tabindex="0" role="button">
              <img src="assets/images/prod_office_chair.png" alt="Office Executive Chair" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_white_dining.png" data-ref="gal-white-dining" data-title="Modern White Marble Dining Table" tabindex="0" role="button">
              <img src="assets/images/prod_white_dining.png" alt="Modern White Dining Table" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_coffee_table.png" data-ref="gal-coffee-table" data-title="Staggered Center Table" tabindex="0" role="button">
              <img src="assets/images/prod_coffee_table.png" alt="Staggered Center Table" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_dining_suite.png" data-ref="gal-dining-suite" data-title="Classic Teak Dining Suite" tabindex="0" role="button">
              <img src="assets/images/prod_dining_suite.png" alt="Classic Teak Dining Suite" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_cream_dining.png" data-ref="gal-cream-dining" data-title="Luxury Cream Marble Dining Suite" tabindex="0" role="button">
              <img src="assets/images/prod_cream_dining.png" alt="Luxury Cream Dining Suite" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_compactors.png" data-ref="gal-compactors" data-title="Teak Compactors Storage System" tabindex="0" role="button">
              <img src="assets/images/prod_compactors.png" alt="Teak Compactors Storage System" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_bed_set.png" data-ref="gal-bed-set" data-title="Classic Teak Bed Set" tabindex="0" role="button">
              <img src="assets/images/prod_bed_set.png" alt="Classic Teak Bed Set" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/prod_tv_console.png" data-ref="gal-tv-console" data-title="Teak TV Console Unit" tabindex="0" role="button">
              <img src="assets/images/prod_tv_console.png" alt="Teak TV Console Unit" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
      </main>
  ```

- [ ] **Step 2: Commit markup changes**
  Run:
  ```bash
  git add gallery.html
  git commit -m "feat(gallery): rebuild gallery markup for 9 centered catalog products"
  ```

---

### Task 3: Verify and Test
Verify all links.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status**
  Run: `git status`
  Expected: Clean working tree.
