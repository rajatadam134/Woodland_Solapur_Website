# Design Specification: Woodland Solapur Product Catalog Replacement (July 14, 2026)

## Purpose & Scope
This specification details the total migration of the Woodland Solapur product catalog. All fictional product placeholders (Contor Arm Chair, Wishbone Dining Chair, Serene Teak Bed, Minimalist Work Desk, ErgoPro Task Chair, and Chesterfield Sofa) will be entirely removed from the website. 

Instead, the catalog will feature exactly 10 authentic products sourced directly from the client's live website. All 10 product images will be processed using AI reference-based backdrop generation to place the real products against our luxurious, minimalist, sand-beige (#F4F1EA) studio theme with soft shadows and studio lighting.

---

## 1. Complete Product Catalog & Specifications

### 1. Windsor Velvet Sofa (Living Room - `living`)
*   **Original Image**: `scratch/original_images/yellow_sofa.jpg`
*   **AI Backdrop Image**: `assets/images/prod_yellow_sofa.png`
*   **Details**: Contemporary button-tufted sofa upholstered in premium golden yellow velvet, supported by a solid teak wood inner frame with dark espresso-stained solid wood legs.
*   **Dimensions**: Width: 220 cm | Depth: 95 cm | Height: 82 cm
*   **Reference Code**: `WD-SF-01`

### 2. Staggered Center Table (Living Room - `living`)
*   **Original Image**: `scratch/original_images/coffee_table.jpg`
*   **AI Backdrop Image**: `assets/images/prod_coffee_table.png`
*   **Details**: Staggered-tier coffee table constructed from premium solid teak wood panels featuring two levels of integrated grey tempered glass segments.
*   **Dimensions**: Width: 120 cm | Depth: 80 cm | Height: 42 cm
*   **Reference Code**: `WD-TB-01`

### 3. Teak TV Console Unit (Living Room - `living`)
*   **Original Image**: `scratch/original_images/tv_console.jpg`
*   **AI Backdrop Image**: `assets/images/prod_tv_console.png`
*   **Details**: Low-profile solid teak wood media console designed with wide open shelving and integrated cable management routing.
*   **Dimensions**: Width: 180 cm | Depth: 45 cm | Height: 50 cm
*   **Reference Code**: `WD-TV-01`

### 4. Premium Draped Curtains (Living Room - `living`)
*   **Original Image**: `scratch/original_images/curtains.jpg`
*   **AI Backdrop Image**: `assets/images/prod_curtains.png`
*   **Details**: Showroom-quality custom draped window curtains crafted from organic heavyweight drapes, designed for elegant pleating.
*   **Dimensions**: Height: 275 cm | Width: Custom
*   **Reference Code**: `WD-CR-01`

### 5. Classic Teak Bed Set (Bedroom - `bedroom`)
*   **Original Image**: `scratch/original_images/bedroom_set.jpg`
*   **AI Backdrop Image**: `assets/images/prod_bed_set.png`
*   **Details**: Heavy solid teak wood double bed frame featuring a built-in padded headboard panel in rich plum/purple velvet, complete under-bed storage drawers, and matching bedside tables.
*   **Dimensions**: Width: 195 cm (King size) | Length: 215 cm | Headboard Height: 120 cm
*   **Reference Code**: `WD-BD-01`

### 6. Luxury Pocket Spring Mattress (Bedroom - `bedroom`)
*   **Original Image**: `scratch/original_images/mattress.jpg`
*   **AI Backdrop Image**: `assets/images/prod_mattress.png`
*   **Details**: High-density orthopedic mattress constructed with pocket springs and cooling memory foam layers to provide contoured sleep support.
*   **Dimensions**: Width: 180 cm | Length: 200 cm | Thickness: 25 cm
*   **Reference Code**: `WD-MT-01`

### 7. Classic Teak Dining Suite (Dining - `dining`)
*   **Original Image**: `scratch/original_images/dining_table.jpg`
*   **AI Backdrop Image**: `assets/images/prod_dining_suite.png`
*   **Details**: Handcrafted solid teak dining set including a rectangular dining table with a detailed wood grain top and six matching high-back chairs.
*   **Dimensions**: Table Width: 180 cm | Table Depth: 90 cm | Table Height: 76 cm
*   **Reference Code**: `WD-DN-01`

### 8. Veneer Conference Desk (Office - `office`)
*   **Original Image**: `scratch/original_images/office_table.jpg`
*   **AI Backdrop Image**: `assets/images/prod_office_table.png`
*   **Details**: Executive conference and board room table showcasing a smooth teak wood veneer top, heavy-duty matte black steel subframe legs, and matte brass hardware details.
*   **Dimensions**: Width: 240 cm | Depth: 110 cm | Height: 75 cm
*   **Reference Code**: `WD-DK-01`

### 9. Office Executive Ergonomic Chair (Office - `office`)
*   **Original Image**: `scratch/original_images/office_chair.jpg`
*   **AI Backdrop Image**: `assets/images/prod_office_chair.png`
*   **Details**: High-back executive chair featuring active lumbar support cushion, breathable contoured mesh backrest, and responsive armrest adjustments.
*   **Dimensions**: Height: 115-125 cm (Adjustable) | Width: 65 cm
*   **Reference Code**: `WD-CH-01`

### 10. Teak Compactors Storage System (Office - `office`)
*   **Original Image**: `scratch/original_images/compactors.jpg`
*   **AI Backdrop Image**: `assets/images/prod_compactors.png`
*   **Details**: Space-efficient mobile compactor storage bay system combining secure sheet-steel lockers and solid teak decorative fascia panels.
*   **Dimensions**: Custom modular config (Standard: Width: 320 cm | Depth: 100 cm | Height: 210 cm)
*   **Reference Code**: `WD-CM-01`

---

## 2. Technical Integration Plan

### Catalog Page (`products.html`) Updates
*   The product grid will contain exactly 10 product cards.
*   All cards will display the new AI-enhanced backdrop image assets.
*   Filter categories will be mapped strictly to: `living`, `bedroom`, `office`, `dining`.

### Product Detail Subpages (in `products/`)
*   We will delete all existing 6 fictional HTML detail files from `products/`.
*   We will generate 10 new, authentic product detail HTML files under `products/` containing:
    *   Descriptions, Materials, Dimensions, Care Instructions.
    *   OpenGraph metadata matching the real product's title and description.
    *   WhatsApp "Inquire for Price" links with pre-filled encoded text pointing back to the specific product path.
