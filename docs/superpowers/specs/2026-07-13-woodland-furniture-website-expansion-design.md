# Design Specification: Woodland Solapur Website Expansion (July 13, 2026)

## Purpose & Scope
This specification describes the expansion of the Woodland Solapur luxury furniture catalog to integrate three authentic client products retrieved from their live site. To fit our premium, sand-beige luxury design system, these products will undergo AI-driven backdrop modification to align their visual style while preserving their physical characteristics.

---

## 1. Selected Products & Material Descriptions

### Windsor Velvet Sofa
*   **Original Image**: `scratch/original_images/yellow_sofa.jpg`
*   **Design & Silhouette**: Contemporary tufted sofa upholstered in premium golden yellow velvet.
*   **Frame**: Solid teak wood inner frame with elegant dark-espresso stained legs.
*   **Upholstery & Care**: Velvet surface vacuuming, light brushing, professional dry cleaning.
*   **Dimensions**:
    *   **Width**: 220 cm (86.6 in)
    *   **Depth**: 95 cm (37.4 in)
    *   **Height**: 82 cm (32.3 in)

### Staggered Tier Center Table
*   **Original Image**: `scratch/original_images/coffee_table.jpg`
*   **Design & Silhouette**: A staggered, two-level coffee table in solid wood panels.
*   **Frame/Material**: Premium solid teak wood base with integrated grey tempered glass panel segments.
*   **Upholstery & Care**: Glass cleaner for glass surfaces, natural oil/wax polish for teak frame.
*   **Dimensions**:
    *   **Width**: 120 cm (47.2 in)
    *   **Depth**: 80 cm (31.5 in)
    *   **Height**: 42 cm (16.5 in)

### Veneer Conference Desk
*   **Original Image**: `scratch/original_images/office_table.jpg`
*   **Design & Silhouette**: A minimalist executive and board conference desk.
*   **Frame/Material**: Solid oak wood core wrapped in hand-selected teak veneer, supported by a matte black powder-coated steel base frame with brass hardware accents.
*   **Upholstery & Care**: Wipe with soft dry cloth, avoid dampness/extreme heat, brass polish for metal accents.
*   **Dimensions**:
    *   **Width**: 240 cm (94.5 in)
    *   **Depth**: 110 cm (43.3 in)
    *   **Height**: 75 cm (29.5 in)

---

## 2. AI Image Generation Pipeline
The new product assets will be generated using the `generate_image` tool, feeding the live original images as references to preserve the actual physical products.

*   **Prompt Constraints**:
    *   **Sofa**: *"A luxurious Windsor Velvet Sofa upholstered in premium plush golden yellow velvet. The sofa is built on a solid teak wood inner frame with dark espresso-stained solid wood legs. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."*
    *   **Center Table**: *"A modern Staggered Tier Center Table constructed from solid teak wood panels featuring two levels of integrated grey tempered glass panels. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."*
    *   **Conference Desk**: *"An executive Veneer Conference Desk with a smooth teak wood veneer top, matte black steel frame support, and brass accents. Placed in a high-end luxury minimalist studio backdrop, warm sand-beige (#F4F1EA) canvas, soft elegant side studio lighting casting realistic gentle shadows."*

---

## 3. Technical Integration Plan

### Catalog Cards in `products.html`
Three HTML cards will be appended to the products grid with matching styles:
1.  **Sofa**: `data-category="living"`
2.  **Center Table**: `data-category="living"`
3.  **Conference Desk**: `data-category="office"`

### Product Detail Subpages in `products/`
Three new subpages will be created, linking to standard scripts and stylesheets:
*   `products/windsor-velvet-sofa.html` (Reference: `WD-SF-03`)
*   `products/staggered-center-table.html` (Reference: `WD-TB-03`)
*   `products/veneer-conference-desk.html` (Reference: `WD-DK-03`)

#### Pre-filled WhatsApp CTA Links
*   **WhatsApp Number**: `918767223224`
*   **Template Message**:
    `Hi Woodland Solapur! I'm interested in inquiring about the *[PRODUCT_NAME]* (Ref: [REF]). Could you please share the availability and customization options? Link: http://www.woodlandsolapur.com/products/[FILENAME]`
