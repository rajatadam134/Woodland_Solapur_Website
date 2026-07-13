import urllib.request
import os

images_to_download = {
    "tv_console.jpg": "http://www.woodlandsolapur.com/images/product/GALAXY.jpg",
    "office_chair.jpg": "http://www.woodlandsolapur.com/images/product/logo.jpg",
    "mattress.jpg": "http://www.woodlandsolapur.com/images/product/Logo3.jpg",
    "curtains.jpg": "http://www.woodlandsolapur.com/images/product/CURTAINS_LOGO.jpg"
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
