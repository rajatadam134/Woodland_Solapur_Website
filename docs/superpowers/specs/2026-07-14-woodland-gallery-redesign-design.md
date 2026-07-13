# Design Specification: Woodland Solapur Gallery Layout Redesign (July 14, 2026)

## Purpose & Scope
This design specification details the redesign of the Inspiration Gallery (`gallery.html`). The gallery will transition from a simple uniform grid into a staggered, editorial-style scattered collage layout. 

Six themed showroom assets will be generated using representative client photos from their original live gallery. Each gallery card, when expanded in the fullscreen lightbox, will link to a simplified WhatsApp enquiry text.

---

## 1. Gallery Layout & CSS Styling

### Staggered Collage Grid System
We will use a 12-column grid layout with varying column spans, aspect ratios, and custom vertical offsets to produce a premium, scattered look:

*   **Gallery Grid Container**:
    `display: grid; grid-template-columns: repeat(12, 1fr); gap: 32px; align-items: center; padding: 40px 0;`
*   **Item 1 (Living Showcase)**:
    `grid-column: span 5; aspect-ratio: 3/4;`
*   **Item 2 (Dining Showcase)**:
    `grid-column: span 7; aspect-ratio: 16/10; transform: translateY(40px);`
*   **Item 3 (Bedroom Showcase)**:
    `grid-column: span 7; aspect-ratio: 16/9; transform: translateY(-20px);`
*   **Item 4 (Office Showcase)**:
    `grid-column: span 5; aspect-ratio: 4/5;`
*   **Item 5 (Outdoor Swings)**:
    `grid-column: span 6; aspect-ratio: 1/1; transform: translateY(30px);`
*   **Item 6 (Wicker Seating)**:
    `grid-column: span 6; aspect-ratio: 16/10; transform: translateY(-30px);`

---

## 2. Showroom Image Assets Mapping

1.  **Living Lounge Showcase** (`assets/images/gal_living_setup.png`):
    *   *Reference Image*: `scratch/gallery_images/05072019053519.jpg` (showroom coffee tables)
2.  **Luxury Dining Showcase** (`assets/images/gal_dining_setup.png`):
    *   *Reference Image*: `scratch/gallery_images/07082019122953.jpg` (marble & wood dining tables)
3.  **Bespoke Bedroom Showcase** (`assets/images/gal_bedroom_setup.png`):
    *   *Reference Image*: `scratch/gallery_images/07082019122809.jpg` (teak bedroom set)
4.  **Executive Office Showcase** (`assets/images/gal_office_setup.png`):
    *   *Reference Image*: `scratch/gallery_images/07082019123238.jpg` (executive office chair rows)
5.  **Outdoor Balcony Swings** (`assets/images/gal_outdoor_swing.png`):
    *   *Reference Image*: `scratch/gallery_images/07082019010352.jpg` (egg chair & swing)
6.  **Wicker Patio Seating** (`assets/images/gal_wicker_seating.png`):
    *   *Reference Image*: `scratch/gallery_images/07082019010649.jpg` (balcony wicker seating set)

---

## 3. WhatsApp Redirection Config

In the lightbox modal, the inquiry button will trigger a WhatsApp redirect to `918767223224` with a pre-filled, URL-encoded string:

*   **Template**:
    `Hi Woodland Solapur! I would like to enquire about this and similar types of products: *[SHOWCASE_NAME]* (Ref: [REF]). Link: [GALLERY_PAGE_URL]#[ANCHOR]`
*   **Ref Codes**:
    *   Item 1: `gal-living`
    *   Item 2: `gal-dining`
    *   Item 3: `gal-bedroom`
    *   Item 4: `gal-office`
    *   Item 5: `gal-outdoor-swing`
    *   Item 6: `gal-wicker-seating`
