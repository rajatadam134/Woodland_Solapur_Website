# Woodland Solapur Gallery Showroom Grid Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Inspiration Gallery (`gallery.html`) to display the 6 showroom images (reverting from product catalog images) in a clean, spaced 3-column grid of padded containers, setting container aspect ratio to 4:3 for widescreen showroom fits.

---

### Task 1: Update CSS Styles for catalog-grid aspect-ratio
Modify the aspect-ratio and padding on `.gallery-grid.catalog-grid .gallery-item` in `assets/css/style.css` to fit widescreen showroom layouts (4:3 instead of 1:1).

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Modify catalog-grid CSS in `assets/css/style.css`**
  Modify `.gallery-grid.catalog-grid .gallery-item` selector around line 1221 to use `aspect-ratio: 4 / 3;` and adjust padding to `32px`:
  ```css
  .gallery-grid.catalog-grid .gallery-item {
      position: relative;
      aspect-ratio: 4 / 3;
      background: #FAF9F6;
      border-radius: 24px;
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(82, 64, 50, 0.03);
      border: 1px solid rgba(82, 64, 50, 0.05);
      height: auto !important;
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  }
  ```

- [ ] **Step 2: Commit css changes**
  Run:
  ```bash
  git add assets/css/style.css
  git commit -m "feat(styles): adjust catalog-grid aspect-ratio to 4:3 for showroom image grids"
  ```

---

### Task 2: Revert Gallery HTML markup to Showroom Images
Update `gallery.html` to map the 6 showroom setup images.

**Files:**
- Modify: `gallery.html`

- [ ] **Step 1: Replace grid container in `gallery.html`**
  Modify `<main class="container gallery-grid catalog-grid">` to populate it with our 6 showroom setups:
  ```html
      <main class="container gallery-grid catalog-grid" style="margin-top: 40px;">
          <div class="gallery-item" data-image="assets/images/gal_living_setup.png" data-ref="gal-living" data-title="Living Lounge Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_living_setup.png" alt="Living Lounge Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_dining_setup.png" data-ref="gal-dining" data-title="Luxury Dining Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_dining_setup.png" alt="Luxury Dining Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_bedroom_setup.png" data-ref="gal-bedroom" data-title="Bespoke Bedroom Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_bedroom_setup.png" alt="Bespoke Bedroom Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_office_setup.png" data-ref="gal-office" data-title="Executive Office Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_office_setup.png" alt="Executive Office Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_outdoor_swing.png" data-ref="gal-outdoor-swing" data-title="Outdoor Balcony Swings" tabindex="0" role="button">
              <img src="assets/images/gal_outdoor_swing.png" alt="Outdoor Balcony Swings" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_wicker_seating.png" data-ref="gal-wicker-seating" data-title="Wicker Patio Seating" tabindex="0" role="button">
              <img src="assets/images/gal_wicker_seating.png" alt="Wicker Patio Seating" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
      </main>
  ```

- [ ] **Step 2: Commit markup changes**
  Run:
  ```bash
  git add gallery.html
  git commit -m "feat(gallery): revert gallery items to use the 6 showroom images"
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
