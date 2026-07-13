# Woodland Solapur GitHub Pages Configuration & Asset Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expose absolute Open Graph link tags to the canonical GitHub Pages domain `https://rajatadam134.github.io/Woodland_Solapur_Website/`, optimize/convert PNG images to light JPEGs, update codebase link references, and push the local master branch to the user's remote Git repository.

---

### Task 1: Convert & Optimize Image Assets
Write and execute a Python script to compress PNGs into JPEGs at 85% quality and modify all code occurrences of `.png` to `.jpg` extensions.

**Files:**
- Create: `scratch/optimize_assets.py`
- Modify: All `.html` and `.css` files in the project
- Delete: All `.png` files in `assets/images/`

- [ ] **Step 1: Execute Python image converter**
  Run `python scratch/optimize_assets.py` to convert files and replace code references.
  *Note: Ensure Pillow handles RGBA transparency by flattening transparent layers onto a solid beige background `#FAF9F6`.*

- [ ] **Step 2: Commit optimized image assets**
  Run:
  ```bash
  git add assets/images/
  git add .
  git commit -m "feat(assets): optimize and convert PNG assets to lightweight JPEGs"
  ```

---

### Task 2: Configure Absolute Open Graph Tags & Canonical Base Links
Update the Open Graph headers and JavaScript redirection links in the HTML and JS files to use the live GitHub Pages domain.

**Files:**
- Modify: All `.html` files in root and inside `products/`
- Modify: `assets/js/main.js`

- [ ] **Step 1: Write and run a python script to patch URLs**
  We will create a python script `scratch/patch_og_links.py` to scan all HTML and JS files and update links:
  - Find all `http://www.woodlandsolapur.com/` and replace with `https://rajatadam134.github.io/Woodland_Solapur_Website/`
  - Ensure every `<meta property="og:image" content="...">` uses the absolute path: `https://rajatadam134.github.io/Woodland_Solapur_Website/assets/images/IMAGE_NAME.jpg`
  - Ensure every `<meta property="og:url" content="...">` uses the absolute path: `https://rajatadam134.github.io/Woodland_Solapur_Website/products/PRODUCT_NAME.html`
  - Update `assets/js/main.js` gallery WhatsApp template links to use `https://rajatadam134.github.io/Woodland_Solapur_Website/`

- [ ] **Step 2: Execute link patching script**
  Run `python scratch/patch_og_links.py`.

- [ ] **Step 3: Commit Open Graph link changes**
  Run:
  ```bash
  git add .
  git commit -m "feat(seo): configure absolute Open Graph tags and JS WhatsApp links for GitHub Pages deployment"
  ```

---

### Task 3: Remote Push to GitHub Repository
Configure Git remote origin and push the master branch code to GitHub.

- [ ] **Step 1: Add git remote origin**
  Run:
  ```bash
  git remote add origin https://github.com/rajatadam134/Woodland_Solapur_Website.git
  ```

- [ ] **Step 2: Push code to remote**
  Run:
  ```bash
  git push -u origin master --force
  ```

---

### Task 4: Verify and Test
Verify all links.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status**
  Run: `git status`
  Expected: Clean working tree.
