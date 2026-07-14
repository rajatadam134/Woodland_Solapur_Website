# Design Specification: Woodland Solapur Contact Section Layout Redesign (July 14, 2026)

## Purpose & Scope
This design specification details the removal of the inquiry form from the Contact Us page (`contact.html`) and the subsequent restructuring of the layout to ensure a clean, modern, and symmetrical visual balance.

---

## 1. Contact Layout & CSS Grid Adjustments

### Symmetrical Split-Panel Grid
With the inquiry form removed, the page will transition to a balanced 2-column split-panel layout on desktop, where the left showroom details card and the right Google Maps card match in height:

*   **Contact Grid Container**:
    `display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; align-items: stretch;`
    *Setting `align-items: stretch` ensures that both columns stretch to match the taller card's height exactly.*

*   **Google Map Container**:
    `height: 100%; min-height: 450px; border-radius: 24px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-soft); margin-bottom: 0;`
    *Setting `height: 100%` and removing the margin-bottom allows the map card to fill the right column cleanly.*

---

## 2. HTML Markup & Script Cleanups

### HTML Header and Cards (`contact.html`)
*   **Description Update**: Update the subtitle description to match the direct WhatsApp/phone communication:
    *"Visit our luxury furniture showroom in Solapur, Maharashtra, or connect with our design consultants directly via phone or WhatsApp to discuss custom designs for your space."*
*   **Remove Form**: Delete the `<form>` node (`id="contactForm"`) from the right side column.
*   **Google Map Container Placement**: Position the `.map-container` div as the sole child of the right grid column.

### Javascript Event Listeners
*   Remove the `contactForm` submit listener script block from the bottom of the page to clean up the code.
