import os
import re
from bs4 import BeautifulSoup

def verify_all_links():
    html_files = []
    
    # 1. Gather all HTML files in root and products/
    for root, dirs, files in os.walk("."):
        if ".git" in root or ".superpowers" in root or ".impeccable" in root or "scratch" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
                
    print(f"Found {len(html_files)} HTML files to verify: {html_files}")
    
    broken_count = 0
    checked_count = 0
    
    for html_path in html_files:
        print(f"\nVerifying links in: {html_path}")
        with open(html_path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
            
        file_dir = os.path.dirname(html_path)
        
        # Check all anchors (href)
        for a in soup.find_all("a"):
            href = a.get("href")
            if not href or href.startswith("http") or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("javascript:") or href.startswith("#"):
                continue
            
            # Remove hash query
            clean_href = href.split("?")[0].split("#")[0]
            if not clean_href:
                continue
                
            checked_count += 1
            target_path = os.path.normpath(os.path.join(file_dir, clean_href))
            if not os.path.exists(target_path):
                print(f"  [BROKEN LINK] Anchor href='{href}' points to '{target_path}' which does not exist!")
                broken_count += 1
            else:
                pass
                
        # Check all images (src)
        for img in soup.find_all("img"):
            src = img.get("src")
            if not src or src.startswith("http") or src.startswith("data:"):
                continue
                
            checked_count += 1
            target_path = os.path.normpath(os.path.join(file_dir, src))
            if not os.path.exists(target_path):
                print(f"  [BROKEN IMAGE] Img src='{src}' points to '{target_path}' which does not exist!")
                broken_count += 1
            else:
                pass
                
    print(f"\nVerification complete. Checked {checked_count} paths. Broken: {broken_count}")
    return broken_count == 0

if __name__ == "__main__":
    import sys
    success = verify_all_links()
    if not success:
        sys.exit(1)
