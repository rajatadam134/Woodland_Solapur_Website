import os
import glob

def patch_links():
    old_domains = [
        "www.woodlandsolapur.com",
        "woodlandsolapur.com",
        "http://woodlandsolapur.com",
        "https://woodlandsolapur.com"
    ]
    new_domain = "https://rajatadam134.github.io/Woodland_Solapur_Website"
    
    # 1. Scan files
    target_files = glob.glob('*.html') + glob.glob('products/*.html') + glob.glob('assets/js/*.js')
    print(f"Scanning {len(target_files)} files to patch URL structures...")
    
    patched_count = 0
    for file_path in target_files:
        if not os.path.isfile(file_path):
            continue
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            # Apply replacements
            for old in old_domains:
                # First handle case where http/https is specified
                content = content.replace(f"https://{old}", new_domain)
                content = content.replace(f"http://{old}", new_domain)
                # Then handle naked domain
                content = content.replace(old, "rajatadam134.github.io/Woodland_Solapur_Website")
            
            # Specific cleanups to ensure exact canonical domain format
            content = content.replace("https://rajatadam134.github.io/Woodland_Solapur_Website", new_domain)
            content = content.replace("http://rajatadam134.github.io/Woodland_Solapur_Website", new_domain)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Patched domain links in: {file_path}")
                patched_count += 1
        except Exception as e:
            print(f"Error patching file {file_path}: {e}")
            
    print(f"Patching complete! Modified {patched_count} files.")

if __name__ == '__main__':
    patch_links()
