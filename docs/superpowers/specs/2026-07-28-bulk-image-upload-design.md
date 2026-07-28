# Design Spec: Dynamic Product Catalog & Bulk Image Upload System

**Date:** 2026-07-28  
**Project:** Woodland Solapur Website  

---

## 1. Overview & Goals
Enable client to continuously upload product photos (2–5 routine uploads, up to 100–200 bulk uploads). Automatically clean up cluttered backgrounds into studio-style photos, compress heavy files into optimized WebP images, tag products into expandable categories, and render them dynamically on `products.html` with direct WhatsApp inquiry functionality. Zero monthly hosting cost.

---

## 2. Core Architecture & Storage
- **Media Hosting:** Cloudinary Free Tier (25 GB free monthly credit ≈ 25,000+ optimized WebP images).
- **Auto Optimization:** On fetch, Cloudinary applies `f_auto,q_auto` to convert heavy JPG/PNG/HEIC files into lightweight WebP/AVIF images.
- **Data Model:**
  - `title`: Product name (e.g. "Windsor Velvet Sofa").
  - `tags`: Category identifier (e.g. `living`, `bedroom`, `dining`, `office`, `patio`, `lighting`, custom tags).
  - `public_id` & `secure_url`: Managed by Cloudinary.

---

## 3. Client Admin Portal & Studio Processing (`admin.html`)
- **Access Control:** Password-protected simple passcode check.
- **Browser-Side AI Background Remover (`@imgly/background-removal-js`):**
  - Runs 100% locally in client browser on CPU/GPU.
  - Removes photo background automatically without third-party API costs or credit limits.
  - Applies neutral studio backdrop (grey `#F5F5F7` or pure white `#FFFFFF`) + soft drop shadow effect.
- **Upload Form & Widget:**
  - Client enters Product Name.
  - Client selects existing category from dropdown OR types a new custom category.
  - Client drops 1 to 200 images.
  - Images processed locally by AI, then uploaded to Cloudinary tagged with category and title metadata.

---

## 4. Dynamic Frontend Catalog (`products.html`)
- **Dynamic Category Sync:** Frontend fetches list of all unique category tags via Cloudinary API.
- **Auto-Generated Filter Pills:** UI renders category pills dynamically (`All`, `Living Room`, `Bedroom`, `Office`, `Dining`, + any new client categories).
- **Lazy Loading & Infinite Scroll:** Loads initial 16 items per category. "Load More" button or scroll trigger fetches next batch.
- **WhatsApp Inquiry Button:**
  - Each product card features "Inquire on WhatsApp" button.
  - Generates deep link: `https://wa.me/91XXXXXXXXXX?text=Hi!%20Inquiring%20about%20*<ProductName>*.%20Image:%20<CloudinaryImageURL>`.
  - WhatsApp automatically renders visual image preview card inside chat.

---

## 5. Verification Plan
1. Open `admin.html`, verify passcode login.
2. Upload test product image with messy background, select category `living`, enter name "Teak Lounge Chair".
3. Confirm browser AI removes background, applies studio grey backdrop, and uploads to Cloudinary.
4. Open `products.html`, verify "Living Room" tab shows item, name appears correctly, WebP format loaded.
5. Click "Inquire on WhatsApp", verify URL pre-fills product name and Cloudinary image link with visual preview.
