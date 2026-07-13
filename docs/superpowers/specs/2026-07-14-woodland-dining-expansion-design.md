# Design Specification: Woodland Solapur Dining Room Expansion & Grid Symmetry (July 14, 2026)

## Purpose & Scope
This design specification details the expansion of the Dining Room collection to complete the products grid symmetry. The catalog will be expanded from 10 to exactly 12 products, establishing a balanced \(3 \times 4\) grid on desktop. Additionally, any references to the "Kitchen" category will be entirely removed from the filter deck on `products.html`.

The two new dining products are authentic pieces sourced from the client's showroom gallery:
1.  **Luxury Cream Marble Dining Suite** (`WD-DN-02`): Cream-colored marble dining table supported by high-density curved wooden legs, paired with plush upholstered brown chairs.
2.  **Modern White Marble Dining Table** (`WD-DN-03`): Modern sleek white marble-top table supported by light-toned wood legs, paired with upholstered beige chairs.

Both product images will be processed using AI reference-based backdrop generation to place the real products against our luxurious, minimalist, sand-beige (#F4F1EA) studio theme with soft shadows and studio lighting.

---

## 1. Product Specifications

### 11. Luxury Cream Marble Dining Suite (Dining - `dining`)
*   **Original Image**: `scratch/gallery_images/07082019122959.jpg` (foreground left)
*   **AI Backdrop Image**: `assets/images/prod_cream_dining.jpg`
*   **Details**: High-end dining suite featuring a polished luxury cream marble table top resting on a sculptural curved teak wood pedestal base. Paired with ergonomic high-back chairs upholstered in rich earth-brown fabric.
*   **Dimensions**: Table Width: 180 cm | Table Depth: 95 cm | Table Height: 75 cm
*   **Reference Code**: `WD-DN-02`

### 12. Modern White Marble Dining Table (Dining - `dining`)
*   **Original Image**: `scratch/gallery_images/07082019122953.jpg` (foreground center)
*   **AI Backdrop Image**: `assets/images/prod_white_dining.jpg`
*   **Details**: Sleek dining table showcasing a pristine white quartz/marble slab top with soft rounded corners, supported by a clean solid oak subframe and tapered legs. Paired with elegant, minimalist armless dining chairs in sand-beige upholstery.
*   **Dimensions**: Table Width: 160 cm | Table Depth: 90 cm | Table Height: 75 cm
*   **Reference Code**: `WD-DN-03`

---

## 2. Code Changes

### `products.html`
- Remove the `<li class="filter-pill" data-filter="kitchen">Kitchen</li>` element.
- Append two new product cards (Card 11 and Card 12) inside `div.products-grid` mapped to the `dining` category.

### Detail Pages (in `products/`)
- Create [products/luxury-cream-dining.html](file:///C:/Users/rajat/OneDrive/Documents/Antigravity/Woodland_Solapur/products/luxury-cream-dining.html)
- Create [products/modern-white-dining.html](file:///C:/Users/rajat/OneDrive/Documents/Antigravity/Woodland_Solapur/products/modern-white-dining.html)
- Both will follow the standard detail layout, including materials/dimensions accordions and pre-filled WhatsApp concierges pointing to `918767223224`.
