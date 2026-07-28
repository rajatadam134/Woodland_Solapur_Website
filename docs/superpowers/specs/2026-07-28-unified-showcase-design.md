# Design Spec: Unified Products & Gallery Showcase (Option A+)

## Goal
Merge `gallery.html` into `products.html` to create a single, cohesive showcase experience for Woodland Solapur. Provide category filters, view type toggles (`All`, `Product Catalog`, `Room Inspirations`), deep link support via URL parameters, tagged product cross-references in gallery lightboxes, and a persistent floating WhatsApp CTA.

---

## 1. Navigation & URL Structure

- **Navigation Links** (on all pages):
  - `Home` -> `index.html`
  - `Collections & Gallery` -> `products.html`
  - `About Us` -> `about.html`
  - `Contact` -> `contact.html`
- **Legacy `gallery.html`**:
  - Redirect to `products.html?view=gallery` via meta refresh & JS fallback.

---

## 2. Page Architecture (`products.html`)

### Filter & Toggle Controls
1. **Category Pills**:
   - `All`
   - `Living Room`
   - `Bedroom`
   - `Office`
   - `Dining`
2. **View Mode Switcher**:
   - `All Showcase`
   - `Products Only`
   - `Room Inspirations`

### Grid Contents
- **12 Product Cards**: Hover overlay to detail page (`products/*.html`).
- **6 Inspiration Cards**: Lightbox overlay with inquiry button & related product tags.

### JavaScript Functionality (`assets/js/main.js`)
- Filter logic handles category + view mode combinations.
- URL query parser (`?cat=living`, `?view=gallery`, `?cat=bedroom&view=products`) auto-applies filters on page load.
- Dynamic item count badges on filter pills.
- Lightbox popup with direct WhatsApp inquiry link per image.

---

## 3. Persistent Floating WhatsApp CTA

- Fixed floating button in bottom-right corner across all pages (`index.html`, `products.html`, `about.html`, `contact.html`).
- Direct link to `https://wa.me/919860193414?text=Hi%20Woodland%2C%20I%20am%20interested%20in%20your%20furniture%20collections.`

---

## 4. Verification Plan

- Test category pill filtering (Living, Bedroom, Office, Dining).
- Test view mode switching (Products vs Inspirations vs All).
- Test URL query parameters (`products.html?cat=living`).
- Test Lightbox popup and WhatsApp links.
- Verify mobile navigation header & floating CTA positioning.
