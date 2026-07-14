# Woodland Solapur Contact Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the inquiry form from `contact.html`, clean up Javascript handlers, and update `assets/css/style.css` to implement a balanced, stretched 2-column split-panel layout.

---

### Task 1: Update CSS Styles for Contact Grid & Map
Modify `.contact-grid` and `.map-container` rules in `assets/css/style.css`.

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Update CSS in `assets/css/style.css`**
  Modify `.contact-grid` and `.map-container` (around lines 1032-1044) to set equal columns, stretch alignment, and full-height container layout:
  ```css
  .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      align-items: stretch;
  }
  .map-container {
      border-radius: 24px;
      overflow: hidden;
      height: 100%;
      min-height: 450px;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-soft);
      margin-bottom: 0;
  }
  ```

- [ ] **Step 2: Commit css changes**
  Run:
  ```bash
  git add assets/css/style.css
  git commit -m "feat(styles): update contact grid to symmetrical 2-column stretched layout"
  ```

---

### Task 2: Rewrite contact.html Markup & Javascript
Update `contact.html` to remove the inquiry form and clean up event listeners.

**Files:**
- Modify: `contact.html`

- [ ] **Step 1: Update header text and remove form in `contact.html`**
  Modify `contact.html` (lines 51-53) to patch the description, remove the `<form>` element entirely, and position the map container as the single child of the right grid column:
  ```html
              <div class="section-title-wrapper" style="margin-bottom: 50px; text-align: center;">
                  <div class="section-subtitle">Get In Touch</div>
                  <h1 class="section-title">Connect With Our Showroom</h1>
                  <p style="max-width: 600px; margin: 16px auto 0; color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
                      Visit our luxury furniture showroom in Solapur, Maharashtra, or connect with our design consultants directly via phone or WhatsApp to discuss custom designs for your space.
                  </p>
              </div>
  ```
  And replace lines 106-137 to render:
  ```html
                  <!-- Right Side: Maps -->
                  <div class="map-container">
                      <iframe src="https://maps.google.com/maps?q=Woodland%20Furniture%2C%20Laxmi%20Vishnu%20Complex%2C%20Ramlal%20Chowk%2C%20Solapur&t=&z=15&ie=UTF8&iwloc=&output=embed" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </div>
  ```

- [ ] **Step 2: Remove JavaScript listener block**
  Remove script block containing the `contactForm` event listener from the bottom of `contact.html`.

- [ ] **Step 3: Commit markup changes**
  Run:
  ```bash
  git add contact.html
  git commit -m "feat(contact): remove inquiry form and clean up Javascript submit listeners"
  ```

---

### Task 3: Verify and Test
Verify all links and push to GitHub.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status & push origin master**
  Run: `git status`
  Run: `git push origin master`
  Expected: Clean working tree, remote repository successfully updated.
