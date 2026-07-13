# Woodland Solapur Website Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Woodland Solapur luxury furniture catalog with three authentic products (Windsor Velvet Sofa, Staggered Center Table, Veneer Conference Desk) from the client's original site, featuring custom AI-generated studio backdrops matching our Sand/Espresso theme.

**Architecture:** We will generate high-end, sand-beige backdrop versions of the original product images using reference paths in the image generation tool. We will then append these products directly to `products.html` and create three dedicated detail pages in `products/` containing URL-encoded WhatsApp CTA links and OpenGraph meta tags.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6), Jina/urllib scraper files, AI Image Generator.

## Global Constraints
- **Naming & Copy**: Brand logo text "Woodland" must be used; all Solapur address and contact details must remain exact and uniform.
- **WhatsApp Integration**: Redirect enquiries to testing phone number +91 87672 23224 (represented as 918767223224 in links).
- **Price Restriction**: Absolutely no prices should be displayed on any page of the website.
- **Design Aesthetics**: Outfit font for headers, Plus Jakarta Sans font for body text, Canvas color `#F4F1EA`, accent color `#524032`.
- **Link Security**: All anchors opening in new tabs must use `rel="noopener noreferrer"`.

---

### Task 1: Generate AI Product Images
Use reference images under `scratch/original_images/` to produce the three luxury theme-aligned product images.

**Files:**
- Create: `assets/images/prod_yellow_sofa.png`
- Create: `assets/images/prod_coffee_table.png`
- Create: `assets/images/prod_office_table.png`

- [ ] **Step 1: Generate the Windsor Velvet Sofa image**
  Use `generate_image` with:
  - **Prompt**: "A luxurious Windsor Velvet Sofa upholstered in premium plush golden yellow velvet. The sofa is built on a solid teak wood inner frame with dark espresso-stained solid wood legs. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_yellow_sofa`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\yellow_sofa.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 2: Copy generated sofa image to assets**
  Copy the generated image from the artifacts directory to `assets/images/prod_yellow_sofa.png`.

- [ ] **Step 3: Generate the Staggered Center Table image**
  Use `generate_image` with:
  - **Prompt**: "A modern Staggered Tier Center Table constructed from solid teak wood panels featuring two levels of integrated grey tempered glass panels. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_coffee_table`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\coffee_table.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 4: Copy generated center table image to assets**
  Copy the generated image from the artifacts directory to `assets/images/prod_coffee_table.png`.

- [ ] **Step 5: Generate the Veneer Conference Desk image**
  Use `generate_image` with:
  - **Prompt**: "An executive Veneer Conference Desk with a smooth teak wood veneer top, matte black steel frame support, and brass accents. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."
  - **ImageName**: `prod_office_table`
  - **ImagePaths**: `['C:\\Users\\rajat\\OneDrive\\Documents\\Antigravity\\Woodland_Solapur\\scratch\\original_images\\office_table.jpg']`
  - **AspectRatio**: `4:3`

- [ ] **Step 6: Copy generated conference desk image to assets**
  Copy the generated image from the artifacts directory to `assets/images/prod_office_table.png`.

- [ ] **Step 7: Verify all files exist**
  Run: `ls assets/images/`
  Expected: Files `prod_yellow_sofa.png`, `prod_coffee_table.png`, and `prod_office_table.png` are present.

- [ ] **Step 8: Commit**
  Run:
  ```bash
  git add assets/images/
  git commit -m "feat(assets): add AI-enhanced original product images with luxury sand-beige backdrops"
  ```

---

### Task 2: Update Catalog Page (`products.html`)
Append the three new product cards to the product grid deck in the catalog markup.

**Files:**
- Modify: `products.html`

- [ ] **Step 1: Locate the products grid**
  In `products.html`, find the grid section container `div.products-grid`.

- [ ] **Step 2: Append the Windsor Velvet Sofa card**
  Add the following card markup:
  ```html
  <!-- Product 7: Windsor Velvet Sofa -->
  <div class="product-card" data-category="living">
      <div class="product-img-wrapper">
          <img src="assets/images/prod_yellow_sofa.png" alt="Windsor Velvet Sofa" loading="lazy">
          <div class="product-overlay">
              <a href="products/windsor-velvet-sofa.html" class="lux-btn lux-btn-light">View Details</a>
          </div>
      </div>
      <div class="product-info">
          <div class="product-cat">Living Room / Sofa</div>
          <h3 class="product-title-card"><a href="products/windsor-velvet-sofa.html">Windsor Velvet Sofa</a></h3>
      </div>
  </div>
  ```

- [ ] **Step 3: Append the Staggered Center Table card**
  Add the following card markup:
  ```html
  <!-- Product 8: Staggered Center Table -->
  <div class="product-card" data-category="living">
      <div class="product-img-wrapper">
          <img src="assets/images/prod_coffee_table.png" alt="Staggered Center Table" loading="lazy">
          <div class="product-overlay">
              <a href="products/staggered-center-table.html" class="lux-btn lux-btn-light">View Details</a>
          </div>
      </div>
      <div class="product-info">
          <div class="product-cat">Living Room / Table</div>
          <h3 class="product-title-card"><a href="products/staggered-center-table.html">Staggered Center Table</a></h3>
      </div>
  </div>
  ```

- [ ] **Step 4: Append the Veneer Conference Desk card**
  Add the following card markup:
  ```html
  <!-- Product 9: Veneer Conference Desk -->
  <div class="product-card" data-category="office">
      <div class="product-img-wrapper">
          <img src="assets/images/prod_office_table.png" alt="Veneer Conference Desk" loading="lazy">
          <div class="product-overlay">
              <a href="products/veneer-conference-desk.html" class="lux-btn lux-btn-light">View Details</a>
          </div>
      </div>
      <div class="product-info">
          <div class="product-cat">Office / Table</div>
          <h3 class="product-title-card"><a href="products/veneer-conference-desk.html">Veneer Conference Desk</a></h3>
      </div>
  </div>
  ```

- [ ] **Step 5: Verify category filtering**
  Ensure the filters function correctly for the new cards. All new cards must show when "All" is active, and filter properly under "Living Room" and "Office" respectively.

- [ ] **Step 6: Commit**
  Run:
  ```bash
  git add products.html
  git commit -m "feat(catalog): append Windsor Velvet Sofa, Staggered Center Table, and Veneer Conference Desk to catalog grid"
  ```

---

### Task 3: Create Product Detail Pages
Create three new product detail HTML files in the `products/` subdirectory.

**Files:**
- Create: `products/windsor-velvet-sofa.html`
- Create: `products/staggered-center-table.html`
- Create: `products/veneer-conference-desk.html`

- [ ] **Step 1: Create `products/windsor-velvet-sofa.html`**
  Write the detail layout file with the following specifications:
  - Subtitle: `Contemporary Luxury`
  - Title: `Windsor Velvet Sofa`
  - Reference: `WD-SF-03`
  - Description: `Indulge in the plush comfort and stately design of the Windsor Velvet Sofa. Upholstered in premium golden yellow velvet and framed by high-density solid teak wood, it provides a warm focal point for sophisticated living rooms. Detailed button-tufting and dark espresso-finished legs ensure timeless elegance.`
  - Accordion Dimensions: `220 cm (Width) x 95 cm (Depth) x 82 cm (Height)`
  - Accordion Materials: `Golden Yellow Velvet, Solid Teak Inner Frame, Premium Density Foam`
  - Accordion Care: `Vacuum with soft brush attachment. Blot spills immediately with dry cloth. Avoid exposure to direct sunlight.`
  - WhatsApp Prefilled Link: `https://wa.me/918767223224?text=Hi%20Woodland%20Solapur!%20I'm%20interested%20in%20inquiring%20about%20the%20*Windsor%20Velvet%20Sofa*%20(Ref:%20WD-SF-03).%20Could%20you%20please%20share%20the%20availability%20and%20customization%20options?%20Link:%20http://www.woodlandsolapur.com/products/windsor-velvet-sofa.html`
  - Rel Tag: `rel="noopener noreferrer"`

- [ ] **Step 2: Create `products/staggered-center-table.html`**
  Write the detail layout file with the following specifications:
  - Subtitle: `Modern Organic`
  - Title: `Staggered Center Table`
  - Reference: `WD-TB-03`
  - Description: `Crafted from selected solid teak wood planks, the Staggered Center Table represents geometric sophistication. Featuring a tiered layout with two levels of integrated grey tempered glass segments, it blends rich wood grains with clean, modern transparency.`
  - Accordion Dimensions: `120 cm (Width) x 80 cm (Depth) x 42 cm (Height)`
  - Accordion Materials: `Solid Teak Wood, Grey Tempered Glass`
  - Accordion Care: `Wipe wood with a clean, dry microfiber cloth. Clean glass with standard glass cleaner. Avoid placing wet cups directly on wood.`
  - WhatsApp Prefilled Link: `https://wa.me/918767223224?text=Hi%20Woodland%20Solapur!%20I'm%20interested%20in%20inquiring%20about%20the%20*Staggered%20Center%20Table*%20(Ref:%20WD-TB-03).%20Could%20you%20please%20share%20the%20availability%20and%20customization%20options?%20Link:%20http://www.woodlandsolapur.com/products/staggered-center-table.html`
  - Rel Tag: `rel="noopener noreferrer"`

- [ ] **Step 3: Create `products/veneer-conference-desk.html`**
  Write the detail layout file with the following specifications:
  - Subtitle: `Executive Suite`
  - Title: `Veneer Conference Desk`
  - Reference: `WD-DK-03`
  - Description: `Command presence in the boardroom with our Veneer Conference Desk. Designed for executives, it features a smooth teak veneer top highlighting natural wood grain, supported by a heavy-duty matte black steel subframe with premium brass details and clean wire routing channels.`
  - Accordion Dimensions: `240 cm (Width) x 110 cm (Depth) x 75 cm (Height)`
  - Accordion Materials: `Oak Core with Teak Wood Veneer, Powder-coated Steel Subframe, Brass hardware`
  - Accordion Care: `Wipe with a soft dry cloth. Do not use chemical abrasive cleaners. Use desk pads to prevent writing indentation.`
  - WhatsApp Prefilled Link: `https://wa.me/918767223224?text=Hi%20Woodland%20Solapur!%20I'm%20interested%20in%20inquiring%20about%20the%20*Veneer%20Conference%20Desk*%20(Ref:%20WD-DK-03).%20Could%20you%20please%20share%20the%20availability%20and%20customization%20options?%20Link:%20http://www.woodlandsolapur.com/products/veneer-conference-desk.html`
  - Rel Tag: `rel="noopener noreferrer"`

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add products/
  git commit -m "feat(detail-pages): add Windsor Velvet Sofa, Staggered Center Table, and Veneer Conference Desk detail pages"
  ```

---

### Task 4: Verify Integrity & Quality
Run the custom verification script and review page layouts under mobile and desktop.

- [ ] **Step 1: Check all links and asset references**
  Run: `python scratch/verify_links.py` (Wait, let's write or reuse the link verifier script to check that the three new HTML files and their asset references are completely valid and resolve without 404s).
  Expected: Link verification succeeds with 0 broken links.

- [ ] **Step 2: Commit and complete**
  Run:
  ```bash
  git status
  ```
  Expected: Working tree clean.
