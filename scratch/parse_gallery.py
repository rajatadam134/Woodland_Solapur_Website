from bs4 import BeautifulSoup
import os

def parse_gallery():
    path = "scratch/gallery_raw.html"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    print("\n--- GALLERY IMAGES & TEXT ---")
    # Let's search for gallery thumbnails and look for text or alternate tags
    for img in soup.find_all("img"):
        src = img.get("src")
        if "gallery" in src:
            alt = img.get("alt", "")
            title = img.get("title", "")
            # Look at parent anchors and paragraphs
            parent = img.parent
            text = ""
            for _ in range(3):
                if parent is None:
                    break
                p = parent.find("p")
                h = parent.find(["h3", "h4", "h5", "div"])
                if p: text += p.get_text(strip=True) + " "
                if h: text += h.get_text(strip=True) + " "
                parent = parent.parent
            print(f"Gallery Image: {src} | Alt: '{alt}' | Title: '{title}' | Context: '{text[:100]}'")

if __name__ == "__main__":
    parse_gallery()
