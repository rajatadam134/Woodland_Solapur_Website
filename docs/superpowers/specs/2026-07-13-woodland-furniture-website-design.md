# Woodland Furniture Website Design Specification

## Overview
A bespoke, highly luxurious, and modern multi-page website for **Woodland Solapur**, a premier household and office furniture business located in Solapur, Maharashtra, India. The design leverages a premium hybrid of Minimalist Scandinavian Luxury and Organic Glassmorphism, utilizing a soft neutral palette, elegant curved containers, subtle typography, and smooth micro-animations.

Prices are not displayed on the website. Instead, product listings and detail pages feature an elegant "Inquire for Price" call-to-action (CTA) that links directly to WhatsApp.

## Business Details
- **Brand Name**: Woodland
- **Location**: Shop No. 12/13, Laxmi Vishnu (L.V.) Complex, Ramlal Chowk, Railway Line, Solapur – 413001, Maharashtra, India (Opposite Chitnis Nursing Home)
- **Contact Numbers**: +91 98601 93414, +91 76669 73120, 0217-2623120
- **Email**: surwoodland@yahoo.co.in
- **Operating Hours**: Monday to Sunday, 10:00 AM – 9:00 PM
- **WhatsApp Enquiry Number (Testing)**: +91 87672 23224 (Use exactly this number for all WhatsApp product queries)

## Design System

### Color Palette
- **Background (Canvas)**: `#F4F1EA` (Warm sand / soft beige)
- **Surface**: `#FFFFFF` (Pure white for cards, panels, and content cards)
- **Primary Accent**: `#524032` (Rich, deep dark-wood espresso/taupe brown for active text, buttons, and headings)
- **Text Primary**: `#222222` (Soft off-black for body copy)
- **Text Secondary**: `#6D675E` (Warm, muted grey-brown for subtext, labels, and icons)
- **Glass Overlay (Frosted)**: `rgba(255, 255, 255, 0.45)` with `backdrop-filter: blur(12px)`
- **Soft Shadow**: `rgba(82, 64, 50, 0.06)`

### Typography
- **Headings (H1, H2, H3)**: `Outfit` (Modern, geometric sans-serif for a luxurious architectural feel)
- **Body Text**: `Plus Jakarta Sans` (Clean, warm, highly readable, and contemporary)

### Logo
- Minimally typeset text brand mark: **"Woodland"** using Outfit bold with generous letter-spacing.

---

## Page-by-Page Structure

### 1. Home Page (`index.html`)
- **Header**: Sticky glassmorphic navigation header featuring the "Woodland" wordmark, navigation links (Home, Products, Gallery, About Us, Contact), and a CTA button ("Book Consultation").
- **Hero Section**: 
  - Asymmetric design. Left column: Large luxury typography ("Bespoke Furniture to Match Your Personality") and a subtitle. Right column: Staggered furniture images overlapping the container's rounded bounds.
- **Curated Collections**: Staggered cards showcasing three key categories:
  - *Living Luxury* (Sofa sets, Lounge chairs, Diwans)
  - *Serene Bedroom* (Beds, Almirahs, Cupboards)
  - *Executive Office* (Office desks, Ergonomic chairs)
- **Story Preview**: Interlocking image and text grid outlining the brand's local craftsmanship heritage in Solapur.
- **Footer**: Detailed site-map, business address, quick contact links, and standard copyright.

### 2. Product Catalog Page (`products.html`)
- **Dynamic Category Filter**: Elegant floating tab pill buttons at the top of the grid (All, Living Room, Bedroom, Office, Dining, Kitchen).
- **Product Grid**: Staggered luxury grid layout. 
  - Staged product images isolated on clean, off-white studio backdrops.
  - Hover interaction: Elevates the card (`translateY(-4px)` with enhanced shadow), fades in a frosted-glass overlay, and reveals a "View Details" button.
  - No prices are displayed on the grid cards.

### 3. Product Detail Pages (e.g., `products/wishbone-dining-chair.html`)
- **Layout**: Staggered layout.
  - **Left**: Multi-angle image carousel showing detail close-ups of the craftsmanship.
  - **Right**: Product category label (spaced uppercase), title, description copy focusing on materials (Teak wood, high-density foam), specifications accordions (Dimensions, Finish, Wood Type), and the primary CTA.
- **WhatsApp Call-to-Action**:
  - A prominent, elegant button with a custom WhatsApp icon and the label **"Inquire for Price"**.
  - On click, redirects to: `https://wa.me/918767223224?text=Hi%20Woodland,%20I'm%20interested%20in%20the%20*Wishbone%20Dining%20Chair*%20(Ref:%20wishbone-chair).%20Could%20you%20please%20share%20the%20price%20and%20customization%20options?%20Link:%20[URL_OF_PAGE]`
  - Short clean URLs are used so the link stays minimal.
  - OpenGraph meta tags are defined on each page to automatically generate a rich preview card inside WhatsApp when the link is shared.

### 4. Gallery Page (`gallery.html`)
- **Layout**: Clean masonry or custom staggered layout.
  - Showcase real showroom images, completed interior decorator projects, and woodcraft close-ups.
- **Interactivity**: Clicking any image opens a full-screen blurred-backdrop lightbox view.
  - The lightbox includes a small button: "Inquire about this style", linking to WhatsApp with a prefilled question about that specific showroom setup.

### 5. About Page (`about.html`)
- **Heritage Narrative**: Multi-section editorial telling the story of Woodland, Solapur.
- **Key Sections**:
  - *The Craftsmanship*: Detailed look at teakwood selection, carving, and durability.
  - *Local Footprint*: Highlighting the store's deep roots in Solapur, Maharashtra, and its status as a leading furniture provider.

### 6. Contact Page (`contact.html`)
- **Layout**: Clean grid.
  - Left column: Detailed address, hours, contact phone numbers (both mobile and landline), and contact email.
  - Right column: Google Maps iframe widget with matching grayscale/warm tint.
- **Direct Inquiry Form**: Elegant minimalist email inquiry form.

---

## Technical & Interaction Implementation Details
- **Build Stack**: HTML5, CSS3 (Vanilla transitions, CSS variables, Glassmorphism, CSS 3D transforms), and Vanilla ES6 JavaScript for routing, carousel logic, and filter behaviors.
- **Animation System**: 
  - Standardized transitions (`all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
  - Floating element animations for hero images.
  - Fade-in scroll animations (Intersection Observer API).
- **Responsive Guidelines**:
  - Desktop: 1200px container width. Staggered grid.
  - Tablet: Scrollable horizontal grids and cards.
  - Mobile: Single-column full-width layouts, hamburger navigation, sticky bottom WhatsApp inquiry floating action on product pages.
