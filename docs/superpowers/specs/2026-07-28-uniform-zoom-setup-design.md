# Uniform Zoom Setup & Lightbox Inquiry Design Specification

## Problem
Product cards currently have inconsistent hover overlays:
- Some default products show "View Details".
- Gallery lookbooks show "Zoom Setup".
- Uploaded admin images show direct "Inquire on WhatsApp" button.

Users want uniform interaction across all cards on `products.html`.

## Goal
Standardize card overlay UI and interaction logic so every card displays "Zoom Setup" on hover, opening Lightbox modal with pre-filled WhatsApp inquiry link targeting test number `918767223224`.

---

## Proposed Changes

### 1. Card Markup Generation (`assets/js/products-dynamic.js`)
- Standardize HTML generator for all items (default catalog, gallery lookbooks, admin uploads, Cloudinary images).
- Hover overlay markup:
  ```html
  <div class="glass-hover-overlay">
      <span class="lux-btn"><i class="fa-solid fa-magnifying-glass-plus" style="margin-right: 8px;"></i> Zoom Setup</span>
  </div>
  ```
- Pass dataset attributes on card wrapper (`data-image`, `data-title`, `data-category`, `data-ref`).

### 2. Lightbox Modal Interaction (`assets/js/main.js` & `assets/js/products-dynamic.js`)
- `initLightbox()` captures image URL, title, and category label from clicked card.
- Sets modal image src to high-resolution card image URL.
- Configures modal inquiry button URL:
  `https://wa.me/918767223224?text=${encodeURIComponent('Hi Woodland Solapur! I would like to inquire about: ' + title + ' (' + category + '). Direct Photo: ' + imageUrl)}`

---

## Verification Plan

### Manual Verification
1. Load `products.html`.
2. Hover over default products, lookbooks, and uploaded admin images.
3. Confirm ALL cards show "Zoom Setup" overlay.
4. Click card. Confirm Lightbox modal opens.
5. Click "Inquire About This Style" / WhatsApp button in Lightbox.
6. Verify URL targets `918767223224` with product title and image link.
