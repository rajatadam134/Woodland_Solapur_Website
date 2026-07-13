# Design Specification: GitHub Pages Configuration & Asset Optimization (July 14, 2026)

## Purpose & Scope
This specification details the conversion of website images from PNG to compressed JPEG to enable instant WhatsApp preview crawling (reducing file sizes from ~800KB to ~50KB) and configures absolute Open Graph paths to point to the live GitHub Pages hosting address: `https://rajatadam134.github.io/Woodland_Solapur_Website/`.

---

## 1. Image Optimization & Extension Conversion

### Conversions (PNG to JPEG)
All `.png` files in `assets/images/` will be compressed into `.jpg` JPEGs at 85% quality using Pillow:
- `cat_bedroom.png` -> `cat_bedroom.jpg`
- `cat_living.png` -> `cat_living.jpg`
- `cat_office.png` -> `cat_office.jpg`
- `gal_bedroom_setup.png` -> `gal_bedroom_setup.jpg`
- `gal_craftsmanship.png` -> `gal_craftsmanship.jpg`
- `gal_dining_setup.png` -> `gal_dining_setup.jpg`
- `gal_living_setup.png` -> `gal_living_setup.jpg`
- `gal_office_setup.png` -> `gal_office_setup.jpg`
- `gal_outdoor_swing.png` -> `gal_outdoor_swing.jpg`
- `gal_sofa_setup.png` -> `gal_sofa_setup.jpg`
- `gal_wicker_seating.png` -> `gal_wicker_seating.jpg`
- `hero_chair1.png` -> `hero_chair1.jpg`
- `hero_table2.png` -> `hero_table2.jpg`
- `prod_bed.png` -> `prod_bed.jpg`
- `prod_bed_set.png` -> `prod_bed_set.jpg`
- `prod_coffee_table.png` -> `prod_coffee_table.jpg`
- `prod_compactors.png` -> `prod_compactors.jpg`
- `prod_contor.png` -> `prod_contor.jpg`
- `prod_cream_dining.png` -> `prod_cream_dining.jpg`
- `prod_curtains.png` -> `prod_curtains.jpg`
- `prod_desk.png` -> `prod_desk.jpg`
- `prod_dining_suite.png` -> `prod_dining_suite.jpg`
- `prod_ergo.png` -> `prod_ergo.jpg`
- `prod_mattress.png` -> `prod_mattress.jpg`
- `prod_office_chair.png` -> `prod_office_chair.jpg`
- `prod_office_table.png` -> `prod_office_table.jpg`
- `prod_sofa.png` -> `prod_sofa.jpg`
- `prod_tv_console.png` -> `prod_tv_console.jpg`
- `prod_white_dining.png` -> `prod_white_dining.jpg`
- `prod_wishbone.png` -> `prod_wishbone.jpg`
- `prod_yellow_sofa.png` -> `prod_yellow_sofa.jpg`
- `story_crafts.png` -> `story_crafts.jpg`

---

## 2. Open Graph & Link Mapping (GitHub Pages Domain)

The canonical site domain is: `https://rajatadam134.github.io/Woodland_Solapur_Website`

### Meta Tag Rules
All 17 HTML files will have their Open Graph headers configured to use this canonical base:
- **Title page (`windsor-velvet-sofa.html`)**:
  - `og:url`: `https://rajatadam134.github.io/Woodland_Solapur_Website/products/windsor-velvet-sofa.html`
  - `og:image`: `https://rajatadam134.github.io/Woodland_Solapur_Website/assets/images/prod_yellow_sofa.jpg`
- **Gallery (`gallery.html`)**:
  - `og:url`: `https://rajatadam134.github.io/Woodland_Solapur_Website/gallery.html`
  - `og:image`: `https://rajatadam134.github.io/Woodland_Solapur_Website/assets/images/gal_living_setup.jpg`

### JavaScript Link Triggers
- In [assets/js/main.js](file:///C:/Users/rajat/OneDrive/Documents/Antigravity/Woodland_Solapur/assets/js/main.js), the pre-filled WhatsApp link template will use the GitHub Pages URL:
  `Link: https://rajatadam134.github.io/Woodland_Solapur_Website/gallery.html#${ref}`
- In all product detail files, the pre-filled WhatsApp message will link to:
  `Link: https://rajatadam134.github.io/Woodland_Solapur_Website/products/PRODUCT_NAME.html`

---

## 3. Remote Git Integration
We will link the local workspace repository to the remote origin:
`git remote add origin https://github.com/rajatadam134/Woodland_Solapur_Website.git`
Then, we will push the `master` branch to the remote repository.
