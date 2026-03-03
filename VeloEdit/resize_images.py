#!/usr/bin/env python3
from PIL import Image
import os
import glob

source_dir = "/root/lzq2/projects/xmulzq.github.io/VeloEdit/assets/It is daytime now._20260303_093214"
target_resolution = (878, 1020)

# Get all PNG files in the directory
image_files = glob.glob(os.path.join(source_dir, "*.png"))

print(f"Found {len(image_files)} images to resize")
print(f"Target resolution: {target_resolution[0]}x{target_resolution[1]}")

for img_path in image_files:
    try:
        # Open image
        img = Image.open(img_path)
        original_size = img.size
        
        # Resize image
        img_resized = img.resize(target_resolution, Image.LANCZOS)
        
        # Save back to the same file
        img_resized.save(img_path)
        
        print(f"✓ Resized: {os.path.basename(img_path)} ({original_size[0]}x{original_size[1]} -> {target_resolution[0]}x{target_resolution[1]})")
        
    except Exception as e:
        print(f"✗ Error processing {os.path.basename(img_path)}: {e}")

print(f"\nCompleted! Resized {len(image_files)} images.")
