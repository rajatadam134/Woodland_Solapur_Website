import urllib.request
import os

images_to_download = {
    "yellow_sofa.jpg": "http://www.woodlandsolapur.com/images/product/windsor_3a_windsorvelvet_yellow_view151.jpg",
    "bedroom_set.jpg": "http://www.woodlandsolapur.com/images/product/HG-PLUM.jpg",
    "dining_table.jpg": "http://www.woodlandsolapur.com/images/product/LOGO.jpg",
    "coffee_table.jpg": "http://www.woodlandsolapur.com/images/product/CT_03.jpeg",
    "office_table.jpg": "http://www.woodlandsolapur.com/images/product/conference-merit1.jpg",
    "compactors.jpg": "http://www.woodlandsolapur.com/images/product/COMPACTORS.jpg"
}

os.makedirs("scratch/original_images", exist_ok=True)

for name, url in images_to_download.items():
    dest = os.path.join("scratch/original_images", name)
    print(f"Downloading {url} to {dest}...")
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        print(f"Successfully downloaded {name} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
