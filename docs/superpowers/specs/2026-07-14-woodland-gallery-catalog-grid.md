# Design Specification: Gallery Catalog Grid Layout (July 14, 2026)

## Purpose & Scope
This specification describes the redesign of `gallery.html` to match the clean, spacious, minimalist 3x3 square grid inspired by the user's reference image. This fixes the zoomed-in look, visual clashing, and lack of space between images.

---

## 1. Gallery Layout & CSS Styling

### Minimalist Square Grid
We will use a 3-column grid of perfectly square cells where product images float centered inside:

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
        aspect-ratio: 1/1; /* Force perfect squares */
        background: #FAF9F6; /* Premium soft off-white/sand */
        border-radius: 24px;
        padding: 48px; /* Large padding to isolate products */
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(82, 64, 50, 0.03);
        border: 1px solid rgba(82, 64, 50, 0.05);
        cursor: pointer;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    }
    .gallery-grid.catalog-grid .gallery-item:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(82, 64, 50, 0.08);
    }
    ```

*   **Product Image Inside Cell**:
    ```css
    .gallery-grid.catalog-grid .gallery-item img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain; /* Keep original aspect ratio, do not zoom or crop */
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .gallery-grid.catalog-grid .gallery-item:hover img {
        transform: scale(1.04);
    }
    ```

*   **Responsive Breakpoints**:
    ```css
    @media (max-width: 992px) {
        .gallery-grid.catalog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }
    }
    @media (max-width: 576px) {
        .gallery-grid.catalog-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        .gallery-grid.catalog-grid .gallery-item {
            padding: 32px;
        }
    }
    ```

---

## 2. Product Image Mapping (9 Selected Items)

To showcase our clean studio assets in the gallery:

1.  **Windsor Velvet Sofa** (`assets/images/prod_yellow_sofa.jpg`):
    *   *Reference*: Living room luxury sofa
    *   *Anchor Ref*: `gal-sofa`
2.  **Office Executive Ergonomic Chair** (`assets/images/prod_office_chair.jpg`):
    *   *Reference*: Tall back office chair
    *   *Anchor Ref*: `gal-office-chair`
3.  **Modern White Marble Dining Table** (`assets/images/prod_white_dining.jpg`):
    *   *Reference*: Dining table showcase
    *   *Anchor Ref*: `gal-white-dining`
4.  **Staggered Center Table** (`assets/images/prod_coffee_table.jpg`):
    *   *Reference*: Center coffee table
    *   *Anchor Ref*: `gal-coffee-table`
5.  **Classic Teak Dining Suite** (`assets/images/prod_dining_suite.jpg`):
    *   *Reference*: Classic solid wood dining suite
    *   *Anchor Ref*: `gal-dining-suite`
6.  **Luxury Cream Marble Dining Suite** (`assets/images/prod_cream_dining.jpg`):
    *   *Reference*: Pedestal dining table with upholstered seats
    *   *Anchor Ref*: `gal-cream-dining`
7.  **Teak Compactors Storage System** (`assets/images/prod_compactors.jpg`):
    *   *Reference*: Office drawer/cabinet system
    *   *Anchor Ref*: `gal-compactors`
8.  **Classic Teak Bed Set** (`assets/images/prod_bed_set.jpg`):
    *   *Reference*: Master bed frame set
    *   *Anchor Ref*: `gal-bed-set`
9.  **Teak TV Console Unit** (`assets/images/prod_tv_console.jpg`):
    *   *Reference*: Living room console TV console
    *   *Anchor Ref*: `gal-tv-console`
