import urllib.request
import re
import os

def download_and_parse(url, name):
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
        # Let's save the HTML for reference
        os.makedirs("scratch", exist_ok=True)
        raw_path = os.path.join("scratch", f"{name}_raw.html")
        with open(raw_path, "w", encoding="utf-8") as f:
            f.write(html)
            
        print(f"Saved raw HTML to {raw_path}")
        
        # Simple extraction of images and descriptions
        # Woodland website typically uses structures like:
        # <img src="images/product/..." or similar
        # Let's find all images and surrounding text
        # We can extract all <img src="..."> tags
        img_tags = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html)
        print(f"Found {len(img_tags)} images in page.")
        
        # Filter for product images (which are usually under images/logo, images/slideshow, images/product, etc.)
        for img in img_tags[:30]:
            print(f"  - Image URL: {img}")
            
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")

if __name__ == "__main__":
    download_and_parse("http://www.woodlandsolapur.com/", "home")
    download_and_parse("http://www.woodlandsolapur.com/product/1", "household")
    download_and_parse("http://www.woodlandsolapur.com/product/2", "office")
    download_and_parse("http://www.woodlandsolapur.com/gallery", "gallery")
