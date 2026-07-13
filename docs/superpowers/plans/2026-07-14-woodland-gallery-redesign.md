# Woodland Solapur Gallery Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Inspiration Gallery (`gallery.html`) with a custom staggered grid layout, generating 6 themed showroom assets and simplified WhatsApp link enquiries.

---

### Task 1: Generate Showroom Image Assets
Use reference gallery photos in `scratch/gallery_images/` to produce the 6 luxury-themed showroom setups.

**Files:**
- Create: `assets/images/gal_living_setup.jpg`
- Create: `assets/images/gal_dining_setup.jpg`
- Create: `assets/images/gal_bedroom_setup.jpg`
- Create: `assets/images/gal_office_setup.jpg`
- Create: `assets/images/gal_outdoor_swing.jpg`
- Create: `assets/images/gal_wicker_seating.jpg`

- [ ] **Step 1: Generate Living Lounge Showcase**
  Use `generate_image` with:
  - **Prompt**: "A luxury living room display showroom filled with modern glass-top coffee tables and elegant center tables. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `gal_living_setup`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\05072019053519.jpg']`
  - **AspectRatio**: `3:4`

- [ ] **Step 2: Copy image to assets**
  Copy from the artifacts folder to `assets/images/gal_living_setup.jpg`.

- [ ] **Step 3: Generate Luxury Dining Showcase**
  Use `generate_image` with:
  - **Prompt**: "A luxury dining table showroom displaying high-end marble-top and solid wood dining table sets with upholstered chairs. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `gal_dining_setup`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019122953.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 4: Copy image to assets**
  Copy from the artifacts folder to `assets/images/gal_dining_setup.jpg` (overwriting the existing fictional one).

- [ ] **Step 5: Generate Bespoke Bedroom Showcase**
  Use `generate_image` with:
  - **Prompt**: "A luxury bedroom set showroom exhibiting a premium solid wood bed frame, side tables, and wardrobe. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `gal_bedroom_setup`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019122809.jpg']`
  - **AspectRatio**: `16:9`

- [ ] **Step 6: Copy image to assets**
  Copy from the artifacts folder to `assets/images/gal_bedroom_setup.jpg` (overwriting the existing fictional one).

- [ ] **Step 7: Generate Executive Office Showcase**
  Use `generate_image` with:
  - **Prompt**: "An executive office showcase displaying rows of premium leather and ergonomic task chairs. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `gal_office_setup`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019123238.jpg']`
  - **AspectRatio**: `4:5`

- [ ] **Step 8: Copy image to assets**
  Copy from the artifacts folder to `assets/images/gal_office_setup.jpg` (overwriting the existing fictional one).

- [ ] **Step 9: Generate Outdoor Balcony Swings**
  Use `generate_image` with:
  - **Prompt**: "An outdoor balcony leisure showcase displaying a luxury hanging wicker egg chair with a soft cushion and a double swing set canopy. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `gal_outdoor_swing`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019010352.jpg']`
  - **AspectRatio**: `1:1`

- [ ] **Step 10: Copy image to assets**
  Copy from the artifacts folder to `assets/images/gal_outdoor_swing.jpg`.

- [ ] **Step 11: Generate Wicker Patio Seating**
  Use `generate_image` with:
  - **Prompt**: "A balcony patio lounge showcase exhibiting a dark rattan/wicker seating set with two rounded tub chairs and a matching circular coffee table. Placed in a high-end luxury minimalist showroom studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `gal_wicker_seating`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\gallery_images\\07082019010649.jpg']`
  - **AspectRatio**: `16:10`

- [ ] **Step 12: Copy image to assets**
  Copy from the artifacts folder to `assets/images/gal_wicker_seating.jpg`.

- [ ] **Step 13: Commit image assets**
  Run:
  ```bash
  git add assets/images/
  git commit -m "feat(assets): add 6 new gallery showroom images with sand-beige studio backdrops"
  ```

---

### Task 2: Implement CSS Styles for Staggered Collage
Add grid layout and offsets to `assets/css/style.css`.

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Append collage styles**
  Append the staggered collage styles to the end of `assets/css/style.css`:
  ```css
  /* Staggered Collage Gallery Layout */
  .gallery-grid.staggered-collage {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 32px;
      align-items: center;
      padding: 40px 0;
  }
  
  .gallery-grid.staggered-collage .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  }
  
  .gallery-grid.staggered-collage .gallery-item:hover {
      box-shadow: var(--shadow-lg);
  }
  
  /* Staggered Spans & Offsets */
  .gallery-grid.staggered-collage .gallery-item:nth-child(1) { grid-column: span 5; aspect-ratio: 3/4; }
  .gallery-grid.staggered-collage .gallery-item:nth-child(2) { grid-column: span 7; aspect-ratio: 16/10; transform: translateY(40px); }
  .gallery-grid.staggered-collage .gallery-item:nth-child(3) { grid-column: span 7; aspect-ratio: 16/9; transform: translateY(-20px); }
  .gallery-grid.staggered-collage .gallery-item:nth-child(4) { grid-column: span 5; aspect-ratio: 4/5; }
  .gallery-grid.staggered-collage .gallery-item:nth-child(5) { grid-column: span 6; aspect-ratio: 1/1; transform: translateY(30px); }
  .gallery-grid.staggered-collage .gallery-item:nth-child(6) { grid-column: span 6; aspect-ratio: 16/10; transform: translateY(-30px); }
  
  /* Responsive breakpoint adjustments for staggered grid */
  @media (max-width: 992px) {
      .gallery-grid.staggered-collage {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px;
      }
      .gallery-grid.staggered-collage .gallery-item {
          grid-column: span 1 !important;
          transform: none !important;
          aspect-ratio: 4/3 !important;
      }
  }
  
  @media (max-width: 576px) {
      .gallery-grid.staggered-collage {
          grid-template-columns: 1fr !important;
          gap: 16px;
      }
  }
  ```

- [ ] **Step 2: Commit css changes**
  Run:
  ```bash
  git add assets/css/style.css
  git commit -m "feat(styles): add staggered collage CSS grid styles for the gallery"
  ```

---

### Task 3: Rewrite Gallery HTML & WhatsApp Redirections
Update `gallery.html` markup and `assets/js/main.js` to dynamically encode WhatsApp messages based on reference anchors.

**Files:**
- Modify: `gallery.html`
- Modify: `assets/js/main.js`

- [ ] **Step 1: Rewrite gallery items grid in `gallery.html`**
  Modify `gallery.html` to update the gallery container element `<main class="gallery-grid">` with class `staggered-collage` and populate it with our 6 items:
  ```html
      <main class="container gallery-grid staggered-collage">
          <div class="gallery-item" data-image="assets/images/gal_living_setup.jpg" data-ref="gal-living" data-title="Living Lounge Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_living_setup.jpg" alt="Living Lounge Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_dining_setup.jpg" data-ref="gal-dining" data-title="Luxury Dining Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_dining_setup.jpg" alt="Luxury Dining Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_bedroom_setup.jpg" data-ref="gal-bedroom" data-title="Bespoke Bedroom Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_bedroom_setup.jpg" alt="Bespoke Bedroom Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_office_setup.jpg" data-ref="gal-office" data-title="Executive Office Showcase" tabindex="0" role="button">
              <img src="assets/images/gal_office_setup.jpg" alt="Executive Office Showcase" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_outdoor_swing.jpg" data-ref="gal-outdoor-swing" data-title="Outdoor Balcony Swings" tabindex="0" role="button">
              <img src="assets/images/gal_outdoor_swing.jpg" alt="Outdoor Balcony Swings" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_wicker_seating.jpg" data-ref="gal-wicker-seating" data-title="Wicker Patio Seating" tabindex="0" role="button">
              <img src="assets/images/gal_wicker_seating.jpg" alt="Wicker Patio Seating" loading="lazy">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
      </main>
  ```

- [ ] **Step 2: Update Javascript Lightbox inquiry link generator**
  Modify [assets/js/main.js](file:///C:/Users/rajat/OneDrive/Documents/Antigravity/Woodland_Solapur/assets/js/main.js) to dynamically change the WhatsApp URL in the lightbox, reading the clicked item's `data-title` and `data-ref`.
  Update `openLightbox(src, alt, ref)` (or the event listener) to set the WhatsApp button `href` to:
  `https://wa.me/918767223224?text=Hi%20Woodland%20Solapur!%20I%20would%20like%20to%20enquire%20about%20this%20and%20similar%20types%20of%20products:%20*[TITLE]*%20(Ref:%20[REF]).%20Link:%20http://www.woodlandsolapur.com/gallery.html%23[REF]`

- [ ] **Step 3: Commit code changes**
  Run:
  ```bash
  git add gallery.html assets/js/main.js
  git commit -m "feat(gallery): rebuild gallery HTML structure and dynamic WhatsApp lightbox inquiry script"
  ```

---

### Task 4: Verify and Test
Verify all links.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status**
  Run: `git status`
  Expected: Clean working tree.
