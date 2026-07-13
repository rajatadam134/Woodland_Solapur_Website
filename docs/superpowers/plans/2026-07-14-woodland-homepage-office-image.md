# Woodland Solapur Homepage Office Image Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a realistic, non-AI-feeling corporate Office Suite image mapping to the warm sand-beige and espresso palette of the other curated collection cards, compress it to JPEG format under 300KB, and push the updated branch to GitHub.

---

### Task 1: Generate & Optimize Real-Feel Office Image
Exhaustively prompt the AI image generator to produce an authentic, premium catalog shot.

- [ ] **Step 1: Generate realistic office image**
  Use `generate_image` with:
  - **Prompt**: "A professional editorial photograph of a luxury executive office suite. In the center, a solid teak wood desk with a leather blotter, and a premium black leather executive office chair. Warm natural side lighting from a window casting soft realistic shadows, warm sand-beige and espresso wood color palette, clean luxury interior, high-end furniture catalog style. No floating elements, no sci-fi screens, realistic and authentic."
  - **ImageName**: `cat_office_real`
  - **AspectRatio**: `4:3`

- [ ] **Step 2: Compress and overwrite `assets/images/cat_office.jpg`**
  Convert/compress the generated image using a python script to target quality=85, saving it directly as `assets/images/cat_office.jpg` (overwriting the old one).

- [ ] **Step 3: Commit and push changes**
  Run:
  ```bash
  git add assets/images/cat_office.jpg
  git commit -m "feat(assets): replace office collection image with realistic teak office suite catalog photo"
  git push origin master
  ```

---

### Task 2: Verify and Test
Verify all links.

- [ ] **Step 1: Run link checker**
  Run: `python scratch/verify_links.py`
  Expected: Success with 0 broken references.

- [ ] **Step 2: Check Git status**
  Run: `git status`
  Expected: Clean working tree.
