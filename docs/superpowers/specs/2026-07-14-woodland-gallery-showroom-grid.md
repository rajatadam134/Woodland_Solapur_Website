# Design Specification: Showroom Grid Gallery Layout (July 14, 2026)

## Purpose & Scope
This specification describes reverting the gallery images in `gallery.html` to the 6 showroom setup images (which are different from the storefront product catalog items) and arranging them in a clean, spacious 3-column grid of padded containers, preventing any cropping, zooming, or visual clashing.

---

## 1. Gallery Layout & CSS Styling

### Spacious Showroom Grid
We will display 6 showroom setup cards in a 3-column grid (2 rows of 3 columns) with a `4/3` aspect ratio:

*   **Gallery Grid Container**:
    ```css
    .gallery-grid.catalog-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        padding: 40px 0;
        align-items: stretch;
    }
    ```

*   **Grid Item (Cell)**:
    ```css
    .gallery-grid.catalog-grid .gallery-item {
        position: relative;
        aspect-ratio: 4 / 3; /* Fits widescreen showroom setups beautifully */
        background: #FAF9F6;
        border-radius: 24px;
        padding: 32px; /* Margins to isolate showroom pictures */
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

*   **Responsive Breakpoints**:
    ```css
    @media (max-width: 992px) {
        .gallery-grid.catalog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px;
        }
        .gallery-grid.catalog-grid .gallery-item {
            padding: 24px;
        }
    }
    @media (max-width: 576px) {
        .gallery-grid.catalog-grid {
            grid-template-columns: 1fr !important;
            gap: 20px;
        }
        .gallery-grid.catalog-grid .gallery-item {
            padding: 16px;
        }
    }
    ```

---

## 2. Showroom Image Mapping (6 Showroom Setups)

We will use the 6 custom showroom setup images:

1.  **Living Lounge Showcase** (`assets/images/gal_living_setup.jpg`):
    *   *Anchor Ref*: `gal-living`
2.  **Luxury Dining Showcase** (`assets/images/gal_dining_setup.jpg`):
    *   *Anchor Ref*: `gal-dining`
3.  **Bespoke Bedroom Showcase** (`assets/images/gal_bedroom_setup.jpg`):
    *   *Anchor Ref*: `gal-bedroom`
4.  **Executive Office Showcase** (`assets/images/gal_office_setup.jpg`):
    *   *Anchor Ref*: `gal-office`
5.  **Outdoor Balcony Swings** (`assets/images/gal_outdoor_swing.jpg`):
    *   *Anchor Ref*: `gal-outdoor-swing`
6.  **Wicker Patio Seating** (`assets/images/gal_wicker_seating.jpg`):
    *   *Anchor Ref*: `gal-wicker-seating`
