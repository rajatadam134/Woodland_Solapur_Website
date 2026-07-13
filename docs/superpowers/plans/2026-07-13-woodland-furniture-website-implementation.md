# Woodland Furniture Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxurious, modern, and fully responsive multi-page website for Woodland Solapur with a premium warm neutral palette, glassmorphism elements, product grids with hover-reveal details, and a WhatsApp-based enquiry system.

**Architecture:** The website uses a clean, semantic multi-page structure consisting of Home, Product Catalog, Product Detail Pages, Gallery, About Us, and Contact. A centralized styling sheet (`assets/css/style.css`) handles all luxury styling, layout structures, and fluid micro-interactions, while a lightweight script (`assets/js/main.js`) coordinates interactive elements, dynamic filtering, lightboxes, and WhatsApp prefilled query parameters.

**Tech Stack:** HTML5, CSS3 (Vanilla custom properties, backdrop-filter for glassmorphism, flexbox/grid layouts), ES6 Javascript, Google Fonts (Outfit, Plus Jakarta Sans), and FontAwesome (v6 via CDN).

## Global Constraints
- Naming & Copy: Use the brand logo text "Woodland" and ensure all business details (Solapur address, numbers, hours) are correct.
- WhatsApp Integration: Redirect enquiries to the testing phone number `+91 87672 23224` (represented as `918767223224` in links).
- Price Restriction: Absolutely no prices should be displayed on any page of the website.
- Design Aesthetics: High-end luxury feel, warm neutral colors, Outfit font for headers, Plus Jakarta Sans font for body text.

---

### Task 1: Setup Assets, Fonts, Icon CDNs, and Base CSS

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`

**Interfaces:**
- Consumes: None
- Produces: CSS custom properties, global typography definitions, base reset, and JS utility hooks for later tasks.

- [ ] **Step 1: Create the base directory structure**
  Run commands to verify folder structure:
  Run: `mkdir assets/css, assets/js, assets/images, products -Force` in PowerShell.

- [ ] **Step 2: Create the central stylesheet `assets/css/style.css`**
  Write variables, fonts, and resets to `assets/css/style.css`:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  :root {
      --bg-color: #F4F1EA;
      --surface-color: #FFFFFF;
      --accent-color: #524032;
      --accent-light: #6D675E;
      --text-primary: #222222;
      --text-secondary: #6D675E;
      --border-color: rgba(82, 64, 50, 0.08);
      --glass-bg: rgba(255, 255, 255, 0.45);
      --glass-border: rgba(255, 255, 255, 0.35);
      --shadow-soft: 0 10px 30px rgba(82, 64, 50, 0.06);
      --shadow-hover: 0 20px 40px rgba(82, 64, 50, 0.12);
      
      --font-heading: 'Outfit', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --transition-smooth: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Reset & Base Styles */
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }

  body {
      background-color: var(--bg-color);
      color: var(--text-primary);
      font-family: var(--font-body);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      color: var(--accent-color);
      font-weight: 600;
  }

  a {
      text-decoration: none;
      color: inherit;
      transition: var(--transition-smooth);
  }

  /* Utility Layouts */
  .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
  }

  .lux-card {
      background: var(--surface-color);
      border-radius: 24px;
      padding: 32px;
      box-shadow: var(--shadow-soft);
      border: 1px solid var(--border-color);
      transition: var(--transition-smooth);
  }

  .lux-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
  }

  /* Glassmorphism Panel */
  .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      box-shadow: var(--shadow-soft);
  }

  /* Luxurious Button */
  .lux-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      background: var(--accent-color);
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 500;
      border: 1px solid var(--accent-color);
      border-radius: 50px;
      cursor: pointer;
      transition: var(--transition-smooth);
      letter-spacing: 0.5px;
  }

  .lux-btn:hover {
      background: transparent;
      color: var(--accent-color);
  }

  .lux-btn-outline {
      background: transparent;
      color: var(--accent-color);
      border: 1px solid var(--accent-color);
  }

  .lux-btn-outline:hover {
      background: var(--accent-color);
      color: #FFFFFF;
  }
  ```

- [ ] **Step 3: Create the basic JavaScript structure `assets/js/main.js`**
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
      console.log('Woodland website initialized');
      initNavigation();
  });

  function initNavigation() {
      const header = document.querySelector('header');
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      });
  }
  ```

- [ ] **Step 4: Commit**
  ```bash
  git add assets/css/style.css assets/js/main.js
  git commit -m "feat: add luxury design system styles and JavaScript shell"
  ```

---

### Task 2: Implement Navigation, Footer, and Home Page (`index.html`)

**Files:**
- Create: `index.html`
- Modify: `assets/css/style.css` (add navigation, footer, hero, and section styles)

**Interfaces:**
- Consumes: Design system definitions in `assets/css/style.css`

- [ ] **Step 1: Write header and footer styling in `assets/css/style.css`**
  Append layout CSS to `assets/css/style.css` for Header, Hero, Collections, and Footer:
  ```css
  /* Header Navigation */
  header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 24px 0;
      transition: var(--transition-smooth);
  }
  header.scrolled {
      padding: 16px 0;
      background: rgba(244, 241, 234, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
  }
  .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .logo {
      font-family: var(--font-heading);
      font-size: 28px;
      font-weight: 700;
      color: var(--accent-color);
      letter-spacing: 2px;
      text-transform: uppercase;
  }
  .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
  }
  .nav-links a {
      font-size: 15px;
      font-weight: 500;
      color: var(--text-primary);
      position: relative;
  }
  .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent-color);
      transition: var(--transition-smooth);
  }
  .nav-links a:hover::after, .nav-links li.active a::after {
      width: 100%;
  }

  /* Hero Section */
  .hero-section {
      padding: 180px 0 100px;
      min-height: 90vh;
      display: flex;
      align-items: center;
  }
  .hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
  }
  .hero-content h1 {
      font-size: 56px;
      line-height: 1.15;
      margin-bottom: 24px;
      letter-spacing: -1px;
  }
  .hero-content p {
      font-size: 18px;
      color: var(--text-secondary);
      margin-bottom: 36px;
  }
  .hero-images {
      position: relative;
      height: 450px;
  }
  .hero-img-container {
      position: absolute;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: var(--shadow-hover);
      border: 6px solid #FFFFFF;
  }
  .hero-img-1 {
      width: 320px;
      height: 400px;
      top: 0;
      left: 0;
      z-index: 2;
  }
  .hero-img-2 {
      width: 260px;
      height: 320px;
      bottom: 0;
      right: 0;
      z-index: 1;
  }
  .hero-images img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-smooth);
  }
  .hero-images:hover img {
      transform: scale(1.05);
  }

  /* Collections Section */
  .section-title-wrapper {
      text-align: center;
      margin-bottom: 60px;
  }
  .section-subtitle {
      font-size: 14px;
      font-family: var(--font-heading);
      text-transform: uppercase;
      letter-spacing: 3px;
      color: var(--accent-light);
      margin-bottom: 8px;
  }
  .section-title {
      font-size: 40px;
      margin-bottom: 16px;
  }
  .collections-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      margin-bottom: 100px;
  }
  .collection-card {
      position: relative;
      border-radius: 24px;
      height: 480px;
      overflow: hidden;
      box-shadow: var(--shadow-soft);
  }
  .collection-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-smooth);
  }
  .collection-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 40px;
      background: linear-gradient(to top, rgba(82, 64, 50, 0.9), transparent);
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
  }
  .collection-card:hover img {
      transform: scale(1.06);
  }
  .collection-overlay h3 {
      color: #FFFFFF;
      font-size: 28px;
      margin-bottom: 8px;
  }

  /* Footer */
  footer {
      background: #FFFFFF;
      border-top: 1px solid var(--border-color);
      padding: 80px 0 40px;
      margin-top: 100px;
  }
  .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 48px;
      margin-bottom: 60px;
  }
  .footer-col h4 {
      font-size: 18px;
      margin-bottom: 24px;
  }
  .footer-col p {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 16px;
  }
  .footer-links {
      list-style: none;
  }
  .footer-links li {
      margin-bottom: 12px;
  }
  .footer-links a {
      font-size: 14px;
      color: var(--text-secondary);
  }
  .footer-links a:hover {
      color: var(--accent-color);
      padding-left: 4px;
  }
  .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: var(--text-secondary);
  }
  ```

- [ ] **Step 2: Generate premium image files for the Homepage**
  Use `generate_image` to create luxury furniture photos for our hero and catalog:
  - Slide/Hero: Stately high-end modern arm chair in studio lighting. Save to `assets/images/hero_chair1.jpg`.
  - Staggered Hero: High-end luxury side cabinet or coffee table. Save to `assets/images/hero_table2.jpg`.
  - Collections: Living Room luxury sofa setup (`assets/images/cat_living.jpg`), Bedroom teak bed setup (`assets/images/cat_bedroom.jpg`), Executive office table/chair setup (`assets/images/cat_office.jpg`).

- [ ] **Step 3: Create the HTML structure in `index.html`**
  Create `index.html` with correct structural markup, linking styles and main.js:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Woodland | Luxury Bespoke Furniture Solapur</title>
      <meta name="description" content="Discover Woodland Furniture's premium, bespoke household and office woodcraft collection in Solapur, Maharashtra. Exquisite design, tailored comfort.">
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
      <!-- Navigation Header -->
      <header>
          <div class="container nav-wrapper">
              <a href="index.html" class="logo">Woodland</a>
              <ul class="nav-links">
                  <li class="active"><a href="index.html">Home</a></li>
                  <li><a href="products.html">Products</a></li>
                  <li><a href="gallery.html">Gallery</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="contact.html">Contact</a></li>
              </ul>
              <a href="contact.html" class="lux-btn lux-btn-outline" style="padding: 10px 20px; font-size: 14px;">Schedule Visit</a>
          </div>
      </header>

      <!-- Hero Section -->
      <section class="hero-section">
          <div class="container hero-grid">
              <div class="hero-content">
                  <h1>Bespoke Furniture To Match Your Personality</h1>
                  <p>Explore our curated top-class furniture collections. Handcrafted in Solapur, Maharashtra, with timeless premium teak, customized fabrics, and precise structural details.</p>
                  <div style="display: flex; gap: 16px;">
                      <a href="products.html" class="lux-btn">Explore Catalog</a>
                      <a href="about.html" class="lux-btn lux-btn-outline">Our Story</a>
                  </div>
              </div>
              <div class="hero-images">
                  <div class="hero-img-container hero-img-1">
                      <img src="assets/images/hero_chair1.jpg" alt="Luxury Arm Chair">
                  </div>
                  <div class="hero-img-container hero-img-2">
                      <img src="assets/images/hero_table2.jpg" alt="Bespoke Coffee Table">
                  </div>
              </div>
          </div>
      </section>

      <!-- Curated Collections -->
      <section style="padding: 60px 0 100px;">
          <div class="container">
              <div class="section-title-wrapper">
                  <div class="section-subtitle">Curated Collections</div>
                  <h2 class="section-title">Designed For Distinction</h2>
              </div>
              <div class="collections-grid">
                  <a href="products.html?cat=living" class="collection-card">
                      <img src="assets/images/cat_living.jpg" alt="Living Room Collection">
                      <div class="collection-overlay">
                          <h3>Living Room</h3>
                          <p>Timeless sofas, armchairs, and coffee tables.</p>
                      </div>
                  </a>
                  <a href="products.html?cat=bedroom" class="collection-card">
                      <img src="assets/images/cat_bedroom.jpg" alt="Bedroom Collection">
                      <div class="collection-overlay">
                          <h3>Bedroom</h3>
                          <p>Bespoke teak beds, nightstands, and wardrobes.</p>
                      </div>
                  </a>
                  <a href="products.html?cat=office" class="collection-card">
                      <img src="assets/images/cat_office.jpg" alt="Office Collection">
                      <div class="collection-overlay">
                          <h3>Office Suite</h3>
                          <p>Ergonomic chairs and executive desk setups.</p>
                      </div>
                  </a>
              </div>
          </div>
      </section>

      <!-- Footer -->
      <footer>
          <div class="container footer-grid">
              <div class="footer-col">
                  <a href="index.html" class="logo" style="display: inline-block; margin-bottom: 20px;">Woodland</a>
                  <p>A leading household and office furniture designer specializing in premium woodwork, solid teak furniture, and high-end customizations.</p>
                  <p><i class="fa-solid fa-location-dot" style="margin-right: 8px;"></i> Ramlal Chowk, Solapur - 413001</p>
              </div>
              <div class="footer-col">
                  <h4>Quick Links</h4>
                  <ul class="footer-links">
                      <li><a href="index.html">Home</a></li>
                      <li><a href="products.html">Products</a></li>
                      <li><a href="gallery.html">Gallery</a></li>
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="contact.html">Contact</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>Collections</h4>
                  <ul class="footer-links">
                      <li><a href="products.html?cat=living">Living Room</a></li>
                      <li><a href="products.html?cat=bedroom">Bedroom</a></li>
                      <li><a href="products.html?cat=office">Office</a></li>
                      <li><a href="products.html?cat=dining">Dining</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>Showroom Hours</h4>
                  <p>Monday - Sunday: 10:00 AM - 9:00 PM</p>
                  <p>Inquiries: +91 98601 93414</p>
                  <p>Email: surwoodland@yahoo.co.in</p>
              </div>
          </div>
          <div class="container footer-bottom">
              <p>&copy; 2026 Woodland Solapur. All rights reserved.</p>
              <p>Designed for Luxury | Solapur, MH, India</p>
          </div>
      </footer>

      <script src="assets/js/main.js"></script>
  </body>
  </html>
  ```

- [ ] **Step 4: Commit**
  ```bash
  git add index.html assets/css/style.css
  git commit -m "feat: implement homepage layout, styles, header, footer, and basic imagery"
  ```

---

### Task 3: Create Products Grid Page (`products.html`) with Hover-Reveal Overlay

**Files:**
- Create: `products.html`
- Modify: `assets/css/style.css` (add product grid, glassmorphic hover, and filtering css)
- Modify: `assets/js/main.js` (add Javascript filter logic)

**Interfaces:**
- Consumes: Navigation styling, CSS custom properties, collections categories

- [ ] **Step 1: Write Products styles in `assets/css/style.css`**
  Append products layout styles:
  ```css
  /* Category Filter Pills */
  .filter-panel-wrapper {
      padding: 140px 0 40px;
      display: flex;
      justify-content: center;
  }
  .filter-pills {
      display: flex;
      gap: 12px;
      padding: 8px 16px;
      border-radius: 50px;
      list-style: none;
  }
  .filter-pill {
      padding: 10px 24px;
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 500;
      border-radius: 50px;
      cursor: pointer;
      color: var(--accent-light);
      transition: var(--transition-smooth);
  }
  .filter-pill:hover, .filter-pill.active {
      background: var(--accent-color);
      color: #FFFFFF;
  }

  /* Product Catalog Grid */
  .product-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      margin-bottom: 80px;
  }
  .product-card {
      position: relative;
      background: var(--surface-color);
      border-radius: 24px;
      padding: 24px;
      box-shadow: var(--shadow-soft);
      border: 1px solid var(--border-color);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: var(--transition-smooth);
  }
  .product-img-wrapper {
      position: relative;
      height: 280px;
      border-radius: 16px;
      overflow: hidden;
      background: #ECE9E2;
      margin-bottom: 20px;
  }
  .product-img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-smooth);
  }
  .product-info h3 {
      font-size: 22px;
      margin-bottom: 6px;
  }
  .product-info .product-cat {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--text-secondary);
      margin-bottom: 12px;
      display: block;
  }

  /* Glassmorphism Hover Overlay */
  .glass-hover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(82, 64, 50, 0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition-smooth);
      z-index: 3;
  }
  .product-card:hover .glass-hover-overlay {
      opacity: 1;
  }
  .product-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
  }
  .product-card:hover .product-img-wrapper img {
      transform: scale(1.05);
  }
  ```

- [ ] **Step 2: Generate high-resolution product images**
  Generate images using `generate_image` and save as:
  - `assets/images/prod_contor.jpg` (Contor Arm Chair)
  - `assets/images/prod_wishbone.jpg` (Wishbone Chair)
  - `assets/images/prod_bed.jpg` (Teak wood Bed)
  - `assets/images/prod_desk.jpg` (Minimalist Desk)
  - `assets/images/prod_ergo.jpg` (Ergonomic Office Chair)
  - `assets/images/prod_sofa.jpg` (Chesterfield Sofa)

- [ ] **Step 3: Create the HTML structure in `products.html`**
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Woodland | Our Collections</title>
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
      <!-- Header -->
      <header class="scrolled">
          <div class="container nav-wrapper">
              <a href="index.html" class="logo">Woodland</a>
              <ul class="nav-links">
                  <li><a href="index.html">Home</a></li>
                  <li class="active"><a href="products.html">Products</a></li>
                  <li><a href="gallery.html">Gallery</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="contact.html">Contact</a></li>
              </ul>
              <a href="contact.html" class="lux-btn lux-btn-outline" style="padding: 10px 20px; font-size: 14px;">Schedule Visit</a>
          </div>
      </header>

      <!-- Category Filtering -->
      <div class="container filter-panel-wrapper">
          <ul class="filter-pills glass-panel">
              <li class="filter-pill active" data-filter="all">All Furniture</li>
              <li class="filter-pill" data-filter="living">Living Room</li>
              <li class="filter-pill" data-filter="bedroom">Bedroom</li>
              <li class="filter-pill" data-filter="office">Office</li>
              <li class="filter-pill" data-filter="dining">Dining</li>
          </ul>
      </div>

      <!-- Product Showcase -->
      <main class="container" style="min-height: 60vh;">
          <div class="product-grid">
              <!-- Card 1 -->
              <div class="product-card" data-category="living">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_contor.jpg" alt="Contor Arm Chair">
                      <div class="glass-hover-overlay">
                          <a href="products/contor-arm-chair.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Living Room</span>
                      <h3>Contor Arm Chair</h3>
                  </div>
              </div>
              <!-- Card 2 -->
              <div class="product-card" data-category="dining">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_wishbone.jpg" alt="Wishbone Dining Chair">
                      <div class="glass-hover-overlay">
                          <a href="products/wishbone-dining-chair.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Dining Room</span>
                      <h3>Wishbone Dining Chair</h3>
                  </div>
              </div>
              <!-- Card 3 -->
              <div class="product-card" data-category="bedroom">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_bed.jpg" alt="Serene Teak Bed">
                      <div class="glass-hover-overlay">
                          <a href="products/serene-teak-bed.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Bedroom</span>
                      <h3>Serene Teak Bed</h3>
                  </div>
              </div>
              <!-- Card 4 -->
              <div class="product-card" data-category="office">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_desk.jpg" alt="Minimalist Work Desk">
                      <div class="glass-hover-overlay">
                          <a href="products/minimalist-work-desk.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Office</span>
                      <h3>Minimalist Work Desk</h3>
                  </div>
              </div>
              <!-- Card 5 -->
              <div class="product-card" data-category="office">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_ergo.jpg" alt="ErgoPro Task Chair">
                      <div class="glass-hover-overlay">
                          <a href="products/ergopro-task-chair.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Office</span>
                      <h3>ErgoPro Task Chair</h3>
                  </div>
              </div>
              <!-- Card 6 -->
              <div class="product-card" data-category="living">
                  <div class="product-img-wrapper">
                      <img src="assets/images/prod_sofa.jpg" alt="Chesterfield Sofa">
                      <div class="glass-hover-overlay">
                          <a href="products/chesterfield-sofa.html" class="lux-btn">View Details</a>
                      </div>
                  </div>
                  <div class="product-info">
                      <span class="product-cat">Living Room</span>
                      <h3>Chesterfield Sofa</h3>
                  </div>
              </div>
          </div>
      </main>

      <!-- Footer (same structure as index.html) -->
      <!-- Include footer markup here... -->

      <script src="assets/js/main.js"></script>
  </body>
  </html>
  ```

- [ ] **Step 4: Update JavaScript logic in `assets/js/main.js`**
  Add filter selection routing script to bottom of `assets/js/main.js`:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
      initFilters();
  });

  function initFilters() {
      const pills = document.querySelectorAll('.filter-pill');
      const cards = document.querySelectorAll('.product-card');

      // Check query parameter (e.g. ?cat=bedroom)
      const urlParams = new URLSearchParams(window.location.search);
      const initialCat = urlParams.get('cat');
      if (initialCat) {
          const matchingPill = document.querySelector(`.filter-pill[data-filter="${initialCat}"]`);
          if (matchingPill) {
              pills.forEach(p => p.classList.remove('active'));
              matchingPill.classList.add('active');
              filterProducts(initialCat, cards);
          }
      }

      pills.forEach(pill => {
          pill.addEventListener('click', () => {
              pills.forEach(p => p.classList.remove('active'));
              pill.classList.add('active');
              const filter = pill.getAttribute('data-filter');
              filterProducts(filter, cards);
          });
      });
  }

  function filterProducts(category, cards) {
      cards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
              card.style.display = 'flex';
          } else {
              card.style.display = 'none';
          }
      });
  }
  ```

- [ ] **Step 5: Commit**
  ```bash
  git add products.html assets/css/style.css assets/js/main.js
  git commit -m "feat: build dynamic product filtering grid with custom glass overlays"
  ```

---

### Task 4: Implement High-End Product Detail Pages and WhatsApp Inquiry Handlers

**Files:**
- Create: `products/wishbone-dining-chair.html`
- Create: `products/contor-arm-chair.html`
- Create: `products/serene-teak-bed.html`
- Create: `products/minimalist-work-desk.html`
- Create: `products/ergopro-task-chair.html`
- Create: `products/chesterfield-sofa.html`
- Modify: `assets/css/style.css` (add product details layouts, gallery thumbs, spec accordions)
- Modify: `assets/js/main.js` (add detail gallery slider and accordion collapsible triggers)

**Interfaces:**
- Consumes: Product image assets, product names, target WhatsApp number `8767223224`

- [ ] **Step 1: Write Product Details Layout in `assets/css/style.css`**
  Append layout CSS to `assets/css/style.css`:
  ```css
  /* Product details layout */
  .details-wrapper {
      padding: 140px 0 80px;
  }
  .details-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 60px;
  }
  .detail-gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
  }
  .main-detail-img {
      width: 100%;
      height: 480px;
      background: #ECE9E2;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: var(--shadow-soft);
      border: 1px solid var(--border-color);
  }
  .main-detail-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  .gallery-thumbs {
      display: flex;
      gap: 16px;
  }
  .thumb-img {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      overflow: hidden;
      background: #ECE9E2;
      cursor: pointer;
      border: 2px solid transparent;
      transition: var(--transition-smooth);
  }
  .thumb-img.active, .thumb-img:hover {
      border-color: var(--accent-color);
  }
  .thumb-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  .details-panel h1 {
      font-size: 42px;
      margin-bottom: 8px;
  }
  .details-panel .category-tag {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: var(--accent-light);
      margin-bottom: 24px;
      display: block;
      font-weight: 500;
  }
  .details-panel .description {
      font-size: 16px;
      color: var(--text-secondary);
      margin-bottom: 32px;
  }
  
  /* Spec Accordion */
  .spec-accordion {
      margin-top: 40px;
      border-top: 1px solid var(--border-color);
  }
  .accordion-item {
      border-bottom: 1px solid var(--border-color);
  }
  .accordion-header {
      padding: 18px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 500;
      color: var(--accent-color);
  }
  .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 300ms ease-out;
  }
  .accordion-content p {
      padding-bottom: 20px;
      font-size: 15px;
      color: var(--text-secondary);
  }
  .accordion-item.active .accordion-content {
      max-height: 200px;
  }
  .accordion-item.active i {
      transform: rotate(180deg);
  }
  .accordion-header i {
      transition: var(--transition-smooth);
  }
  ```

- [ ] **Step 2: Add interactive functions to `assets/js/main.js`**
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
      initProductGallery();
      initAccordions();
  });

  function initProductGallery() {
      const thumbs = document.querySelectorAll('.thumb-img');
      const mainImg = document.querySelector('.main-detail-img img');
      if (!mainImg) return;
      thumbs.forEach(thumb => {
          thumb.addEventListener('click', () => {
              thumbs.forEach(t => t.classList.remove('active'));
              thumb.classList.add('active');
              const newSrc = thumb.querySelector('img').getAttribute('src');
              mainImg.setAttribute('src', newSrc);
          });
      });
  }

  function initAccordions() {
      const headers = document.querySelectorAll('.accordion-header');
      headers.forEach(header => {
          header.addEventListener('click', () => {
              const item = header.parentElement;
              const isActive = item.classList.contains('active');
              document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
              if (!isActive) {
                  item.classList.add('active');
              }
          });
      });
  }
  ```

- [ ] **Step 3: Create the Product Detail files (e.g. `products/wishbone-dining-chair.html`)**
  Write the HTML detail page structure. Note: URLs are relative to root.
  We will implement standard SEO metadata (OpenGraph tags) to enable WhatsApp rich preview formatting.
  Example file: `products/wishbone-dining-chair.html`
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wishbone Dining Chair | Woodland</title>
      
      <!-- OpenGraph Metadata for WhatsApp Link Preview -->
      <meta property="og:title" content="Wishbone Dining Chair | Woodland Furniture">
      <meta property="og:description" content="Discover hand-crafted solid teak wood comfort. Available for custom orders from Woodland Solapur.">
      <meta property="og:image" content="https://woodlandsolapur.com/assets/images/prod_wishbone.jpg">
      <meta property="og:type" content="product">
      
      <link rel="stylesheet" href="../assets/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
      <!-- Header -->
      <header class="scrolled">
          <div class="container nav-wrapper">
              <a href="../index.html" class="logo">Woodland</a>
              <ul class="nav-links">
                  <li><a href="../index.html">Home</a></li>
                  <li class="active"><a href="../products.html">Products</a></li>
                  <li><a href="../gallery.html">Gallery</a></li>
                  <li><a href="../about.html">About Us</a></li>
                  <li><a href="../contact.html">Contact</a></li>
              </ul>
              <a href="../contact.html" class="lux-btn lux-btn-outline" style="padding: 10px 20px; font-size: 14px;">Schedule Visit</a>
          </div>
      </header>

      <main class="container details-wrapper">
          <div class="details-grid">
              <!-- Gallery -->
              <div class="detail-gallery">
                  <div class="main-detail-img">
                      <img src="../assets/images/prod_wishbone.jpg" alt="Wishbone Dining Chair">
                  </div>
                  <div class="gallery-thumbs">
                      <div class="thumb-img active"><img src="../assets/images/prod_wishbone.jpg" alt="Angle 1"></div>
                      <div class="thumb-img"><img src="../assets/images/prod_wishbone.jpg" alt="Angle 2"></div>
                  </div>
              </div>

              <!-- Product Details Panel -->
              <div class="details-panel">
                  <span class="category-tag">Dining Room</span>
                  <h1>Wishbone Dining Chair</h1>
                  <p class="description">Sculpted from premium choice Burma teak, the Wishbone Dining Chair marries mid-century Scandinavian simplicity with unparalleled structural resilience. Features a hand-woven organic cord seat and contoured backrest designed for luxurious ergonomic support.</p>
                  
                  <!-- WhatsApp Enquiry Button -->
                  <a href="https://wa.me/918767223224?text=Hi%20Woodland%20Solapur!%20I'm%20interested%20in%20inquiring%20about%20the%20*Wishbone%20Dining%20Chair*%20(Dining%20Room%20Category).%20Could%20you%20please%20share%20the%20availability%20and%20finish%20options?%20Link:%20http://woodlandsolapur.com/products/wishbone-dining-chair.html" 
                     target="_blank" 
                     class="lux-btn" 
                     style="width: 100%; margin-top: 10px; gap: 10px;">
                      <i class="fa-brands fa-whatsapp" style="font-size: 20px;"></i>
                      Inquire for Price (WhatsApp)
                  </a>

                  <!-- Spec Accordion -->
                  <div class="spec-accordion">
                      <div class="accordion-item active">
                          <div class="accordion-header">
                              Materials & Craftsmanship
                              <i class="fa-solid fa-chevron-down"></i>
                          </div>
                          <div class="accordion-content">
                              <p>Constructed entirely of seasoned A-Grade teakwood sourced sustainably. Finished with a natural food-safe matte wood oil sealant that showcases the raw grain details.</p>
                          </div>
                      </div>
                      <div class="accordion-item">
                          <div class="accordion-header">
                              Dimensions & Details
                              <i class="fa-solid fa-chevron-down"></i>
                          </div>
                          <div class="accordion-content">
                              <p>Height: 75 cm | Width: 55 cm | Depth: 51 cm. Seat Height: 45 cm. Fully assembled upon delivery.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>

      <script src="../assets/js/main.js"></script>
  </body>
  </html>
  ```
  *(Implement similar corresponding detail page structures for the remaining 5 product detail files: `contor-arm-chair.html`, `serene-teak-bed.html`, `minimalist-work-desk.html`, `ergopro-task-chair.html`, `chesterfield-sofa.html` in the products folder).*

- [ ] **Step 4: Commit**
  ```bash
  git add products/ assets/css/style.css assets/js/main.js
  git commit -m "feat: complete product detail pages and prefilled WhatsApp triggers"
  ```

---

### Task 5: Build Gallery Showcase Page (`gallery.html`) with Blur-Lightbox

**Files:**
- Create: `gallery.html`
- Modify: `assets/css/style.css` (add grid and lightbox modal styling)
- Modify: `assets/js/main.js` (add Javascript zoom and popup triggers)

**Interfaces:**
- Consumes: UI framework, lightbox modals

- [ ] **Step 1: Write Lightbox and Gallery styles in `assets/css/style.css`**
  ```css
  /* Gallery masonry grid */
  .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin: 140px auto 80px;
  }
  .gallery-item {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      height: 350px;
      box-shadow: var(--shadow-soft);
      cursor: pointer;
  }
  .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-smooth);
  }
  .gallery-item:hover img {
      transform: scale(1.05);
  }
  .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(82, 64, 50, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition-smooth);
      color: #FFFFFF;
      font-size: 24px;
  }
  .gallery-item:hover .gallery-overlay {
      opacity: 1;
  }

  /* Lightbox Modal */
  .lightbox-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(34, 34, 34, 0.9);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: var(--transition-smooth);
  }
  .lightbox-modal.active {
      opacity: 1;
      pointer-events: auto;
  }
  .lightbox-content {
      position: relative;
      max-width: 900px;
      max-height: 80vh;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0,0,0,0.3);
  }
  .lightbox-content img {
      width: 100%;
      height: 100%;
      object-fit: contain;
  }
  .lightbox-close {
      position: absolute;
      top: 24px;
      right: 24px;
      color: #FFFFFF;
      font-size: 32px;
      cursor: pointer;
      z-index: 2001;
      transition: var(--transition-smooth);
  }
  .lightbox-close:hover {
      transform: scale(1.1);
  }
  .lightbox-inquire-btn {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2001;
  }
  ```

- [ ] **Step 2: Generate unique Gallery showcase images**
  Generate beautiful showroom/installation snapshots using `generate_image` tool:
  - `assets/images/gal_sofa_setup.jpg` (Living room layout showcase)
  - `assets/images/gal_bedroom_setup.jpg` (Bespoke bedroom setup)
  - `assets/images/gal_office_setup.jpg` (Premium office workstation setup)
  - `assets/images/gal_dining_setup.jpg` (Luxury wooden dining arrangement)
  - `assets/images/gal_craftsmanship.jpg` (Detail view of wood craftsmanship texture)

- [ ] **Step 3: Create the HTML structure in `gallery.html`**
  Include a `.lightbox-modal` element in the document structure:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Woodland | Inspiration Gallery</title>
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
      <!-- Header -->
      <header class="scrolled">
          <div class="container nav-wrapper">
              <a href="index.html" class="logo">Woodland</a>
              <ul class="nav-links">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="products.html">Products</a></li>
                  <li class="active"><a href="gallery.html">Gallery</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="contact.html">Contact</a></li>
              </ul>
              <a href="contact.html" class="lux-btn lux-btn-outline" style="padding: 10px 20px; font-size: 14px;">Schedule Visit</a>
          </div>
      </header>

      <!-- Grid -->
      <div class="container gallery-grid">
          <div class="gallery-item" data-image="assets/images/gal_sofa_setup.jpg" data-ref="luxury-sofa-setup">
              <img src="assets/images/gal_sofa_setup.jpg" alt="Luxury Living Setup">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_bedroom_setup.jpg" data-ref="bedroom-setup">
              <img src="assets/images/gal_bedroom_setup.jpg" alt="Bespoke Bedroom Suite">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_office_setup.jpg" data-ref="executive-office">
              <img src="assets/images/gal_office_setup.jpg" alt="Executive Corporate Workspace">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_dining_setup.jpg" data-ref="dining-arrangement">
              <img src="assets/images/gal_dining_setup.jpg" alt="Crafted Dining Layout">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
          <div class="gallery-item" data-image="assets/images/gal_craftsmanship.jpg" data-ref="woodwork-texture">
              <img src="assets/images/gal_craftsmanship.jpg" alt="Teakwood Craftsmanship Details">
              <div class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
          </div>
      </div>

      <!-- Lightbox Modal -->
      <div class="lightbox-modal">
          <div class="lightbox-close"><i class="fa-solid fa-xmark"></i></div>
          <div class="lightbox-content">
              <img src="" alt="Zoomed view">
              <a href="" target="_blank" class="lux-btn lightbox-inquire-btn">
                  <i class="fa-brands fa-whatsapp" style="margin-right: 8px;"></i> Inquire About This Style
              </a>
          </div>
      </div>

      <!-- Footer -->
      <script src="assets/js/main.js"></script>
  </body>
  </html>
  ```

- [ ] **Step 4: Update JavaScript logic in `assets/js/main.js`**
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
      initLightbox();
  });

  function initLightbox() {
      const items = document.querySelectorAll('.gallery-item');
      const modal = document.querySelector('.lightbox-modal');
      if (!modal) return;
      
      const modalImg = modal.querySelector('img');
      const closeBtn = modal.querySelector('.lightbox-close');
      const inquireBtn = modal.querySelector('.lightbox-inquire-btn');

      items.forEach(item => {
          item.addEventListener('click', () => {
              const src = item.getAttribute('data-image');
              const ref = item.getAttribute('data-ref');
              modalImg.setAttribute('src', src);
              
              // Set custom prefilled WhatsApp message
              const message = encodeURIComponent(`Hi Woodland! I'm interested in inquiring about the custom gallery layout/setup shown in: ${ref}. Can we customize this for our space?`);
              inquireBtn.setAttribute('href', `https://wa.me/918767223224?text=${message}`);
              
              modal.classList.add('active');
          });
      });

      closeBtn.addEventListener('click', () => {
          modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
          if (e.target === modal) {
              modal.classList.remove('active');
          }
      });
  }
  ```

- [ ] **Step 5: Commit**
  ```bash
  git add gallery.html assets/css/style.css assets/js/main.js
  git commit -m "feat: design inspiration gallery with full-screen blurred lightbox modal"
  ```

---

### Task 6: Implement About and Contact Pages (`about.html`, `contact.html`)

**Files:**
- Create: `about.html`
- Create: `contact.html`
- Modify: `assets/css/style.css` (add styled grids, map containers, and form styling)

**Interfaces:**
- Consumes: Contact details (Address: Shop No. 12/13, L.V. Complex, Ramlal Chowk, Railway Line, Solapur – 413001)

- [ ] **Step 1: Write About & Contact styles in `assets/css/style.css`**
  ```css
  /* About layout */
  .about-hero {
      padding: 180px 0 80px;
      text-align: center;
  }
  .about-content-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      margin-bottom: 100px;
  }
  
  /* Contact layout */
  .contact-wrapper {
      padding: 140px 0 80px;
  }
  .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 60px;
  }
  .map-container {
      border-radius: 24px;
      overflow: hidden;
      height: 450px;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-soft);
  }
  .contact-info-list {
      list-style: none;
      margin-top: 30px;
  }
  .contact-info-list li {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      font-size: 16px;
      color: var(--text-secondary);
      margin-bottom: 24px;
  }
  .contact-info-list i {
      color: var(--accent-color);
      font-size: 20px;
      margin-top: 4px;
  }
  ```

- [ ] **Step 2: Create the HTML structure in `about.html`**
  Create `about.html` highlighting the Solapur history, sustainable teak sourcing, and the brand identity.
  *(Create structure linked to style.css and main.js)*

- [ ] **Step 3: Create the HTML structure in `contact.html`**
  Include correct showroom address, numbers, hours, email, Google Maps iframe embed, and an elegant inquiry form.
  *(Create contact.html structure linked to style.css and main.js)*

- [ ] **Step 4: Commit**
  ```bash
  git add about.html contact.html assets/css/style.css
  git commit -m "feat: write about and contact pages with stylized maps and contact lists"
  ```

---

### Task 7: Quality Verification and Responsive Adjustments

**Files:**
- Modify: `assets/css/style.css` (add media queries for responsive adjustments)

**Interfaces:**
- Consumes: Complete website layout and styling

- [ ] **Step 1: Write responsive CSS media queries in `assets/css/style.css`**
  Ensure the website adapts flawlessly to smaller screens, including a mobile slide-out menu drawer and adjusted padding:
  ```css
  /* Responsive Queries */
  @media (max-width: 992px) {
      .hero-grid, .collections-grid, .product-grid, .details-grid, .gallery-grid, .about-content-row, .contact-grid {
          grid-template-columns: 1fr;
      }
      .hero-images {
          height: 380px;
          margin-top: 40px;
      }
      .hero-img-1 {
          width: 260px;
          height: 320px;
      }
      .hero-img-2 {
          width: 200px;
          height: 250px;
      }
      .footer-grid {
          grid-template-columns: 1fr 1fr;
      }
  }

  @media (max-width: 768px) {
      .nav-links {
          display: none; /* Can expand to simple hamburger in final code if required */
      }
      .footer-grid {
          grid-template-columns: 1fr;
      }
      .hero-content h1 {
          font-size: 38px;
      }
  }
  ```

- [ ] **Step 2: Run verification tests**
  Start a local HTTP server inside the workspace to verify all routes, assets, hover actions, dynamic filters, and lightboxes:
  Run: `npx -y http-server -p 8080` in Cwd.

- [ ] **Step 3: Commit**
  ```bash
  git add assets/css/style.css
  git commit -m "feat: verify all page responsiveness, route links, and complete styling polish"
  ```
