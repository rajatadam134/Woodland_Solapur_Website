from bs4 import BeautifulSoup
import os

def parse_household():
    path = "scratch/household_raw.html"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    print("\n--- HOUSEHOLD PRODUCTS ---")
    # Let's search for product listings
    # Many simple templates use cards or blocks with class like "product", "col-md-...", or similar
    # Let's find all images and trace their parents/siblings
    for img in soup.find_all("img"):
        src = img.get("src")
        if "product" in src:
            # Look for adjacent headings or text
            parent = img.parent
            title = ""
            for _ in range(4): # bubble up to find container
                if parent is None:
                    break
                # Look for headings or text
                h3 = parent.find("h3")
                h4 = parent.find("h4")
                h5 = parent.find("h5")
                p = parent.find("p")
                
                if h3: title = h3.get_text(strip=True)
                elif h4: title = h4.get_text(strip=True)
                elif h5: title = h5.get_text(strip=True)
                
                parent = parent.parent
            
            print(f"Product Image: {src} | Title found: '{title}'")

def parse_office():
    path = "scratch/office_raw.html"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    print("\n--- OFFICE PRODUCTS ---")
    for img in soup.find_all("img"):
        src = img.get("src")
        if "product" in src:
            parent = img.parent
            title = ""
            for _ in range(4):
                if parent is None:
                    break
                h3 = parent.find("h3")
                h4 = parent.find("h4")
                h5 = parent.find("h5")
                if h3: title = h3.get_text(strip=True)
                elif h4: title = h4.get_text(strip=True)
                elif h5: title = h5.get_text(strip=True)
                parent = parent.parent
            print(f"Product Image: {src} | Title found: '{title}'")

if __name__ == "__main__":
    parse_household()
    parse_office()
