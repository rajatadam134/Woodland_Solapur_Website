import urllib.request
import os
import re

gallery_urls = [
    "http://www.woodlandsolapur.com/images/gallery/28052019054718.jpg",
    "http://www.woodlandsolapur.com/images/gallery/05072019053519.jpg",
    "http://www.woodlandsolapur.com/images/gallery/05072019055458.jpg",
    "http://www.woodlandsolapur.com/images/gallery/05072019073521.jpg",
    "http://www.woodlandsolapur.com/images/gallery/05072019073853.jpg",
    "http://www.woodlandsolapur.com/images/gallery/05072019074057.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019122405.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019122809.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019122829.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019122953.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019122959.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019123238.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019123429.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019010352.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019010359.jpg",
    "http://www.woodlandsolapur.com/images/gallery/07082019010649.jpg"
]

os.makedirs("scratch/gallery_images", exist_ok=True)

for url in gallery_urls:
    name = os.path.basename(url)
    dest = os.path.join("scratch/gallery_images", name)
    print(f"Downloading {url}...")
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
