import os
import glob
from PIL import Image

def optimize_images():
    image_dir = 'assets/images'
    png_pattern = os.path.join(image_dir, '*.png')
    png_files = glob.glob(png_pattern)
    
    print(f"Found {len(png_files)} PNG files to optimize.")
    
    # 1. Convert and compress PNGs to JPEGs
    converted_mapping = {}
    for png_path in png_files:
        filename = os.path.basename(png_path)
        name_without_ext = os.path.splitext(filename)[0]
        jpg_filename = f"{name_without_ext}.jpg"
        jpg_path = os.path.join(image_dir, jpg_filename)
        
        try:
            with Image.open(png_path) as img:
                # Handle alpha channel (transparency) by pasting onto a solid white background
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    background = Image.new('RGB', img.size, (250, 249, 246)) # Match our Sand theme light background
                    background.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else img.convert('RGBA').split()[3])
                    img_rgb = background
                else:
                    img_rgb = img.convert('RGB')
                
                # Compress and save as JPEG
                img_rgb.save(jpg_path, 'JPEG', quality=85, optimize=True)
                orig_size = os.path.getsize(png_path)
                new_size = os.path.getsize(jpg_path)
                print(f"Compressed {filename} ({orig_size/1024:.1f} KB) -> {jpg_filename} ({new_size/1024:.1f} KB) [Saved {100 - (new_size/orig_size * 100):.1f}%]")
                converted_mapping[filename] = jpg_filename
        except Exception as e:
            print(f"Error compressing {filename}: {e}")
            
    # 2. Update code references in HTML and CSS files
    target_files = glob.glob('*.html') + glob.glob('products/*.html') + glob.glob('assets/css/*.css') + glob.glob('docs/**/*.md', recursive=True)
    print(f"Scanning {len(target_files)} code files to update image extensions...")
    
    for file_path in target_files:
        if not os.path.isfile(file_path):
            continue
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            # Replace all occurrences of converted images
            for old_png, new_jpg in converted_mapping.items():
                content = content.replace(f"assets/images/{old_png}", f"assets/images/{new_jpg}")
                
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated image links in: {file_path}")
        except Exception as e:
            print(f"Error updating file {file_path}: {e}")
            
    # 3. Delete original PNGs to avoid cluttering and keep repo light
    print("Cleaning up old PNG files...")
    for old_png in converted_mapping.keys():
        png_path = os.path.join(image_dir, old_png)
        try:
            os.remove(png_path)
            print(f"Deleted old asset: {old_png}")
        except Exception as e:
            print(f"Error deleting {old_png}: {e}")
            
    print("Optimization complete!")

if __name__ == '__main__':
    optimize_images()
