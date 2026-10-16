import os
from PIL import Image, ImageFilter, ImageDraw
import numpy as np

os.makedirs('public/images/brand', exist_ok=True)

# Load the high-res crop
img = Image.open('scripts/temp/dove_highres.png').convert('RGBA')
w, h = img.size

cx, cy = w / 2, h / 2
r_outer = 485

arr = np.array(img, dtype=float)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
lum = 0.299 * r + 0.587 * g + 0.114 * b

Y, X = np.ogrid[:h, :w]
dist = np.sqrt((X - cx)**2 + (Y - cy)**2)

# Dove lines mask inside r < 460
inner_mask = dist < 460
dove_alpha = np.clip((215.0 - lum) / 90.0, 0.0, 1.0) * inner_mask

# Ring smooth edges:
ring_alpha = np.clip(1.0 - np.abs(dist - 474) / 12.0, 0.0, 1.0) * (dist < 490)

# Nib at bottom:
# Look for the gold quill tip extending from y: 800 to 1000
nib_zone = (dist >= 450) & (dist <= 505) & (Y > cy + 280) & (np.abs(X - (cx - 40)) < 90) & (Y < h - 20)
nib_alpha = np.clip((220.0 - lum) / 80.0, 0.0, 1.0) * nib_zone

total_alpha = np.clip(dove_alpha + ring_alpha + nib_alpha, 0.0, 1.0)
# Cut off bottom 15 pixels to ensure no border artifacts
total_alpha[h-18:, :] = 0.0
total_alpha[:, :10] = 0.0
total_alpha[:, w-10:] = 0.0
total_alpha[:10, :] = 0.0
mask_img = Image.fromarray((total_alpha * 255).astype(np.uint8)).filter(ImageFilter.SMOOTH_MORE)

# 1. Primary Dark Ink version with Gold Nib
final_ink = Image.new('RGBA', (w, h), (0,0,0,0))
ink_layer = Image.new('RGBA', (w, h), (26, 22, 18, 255))
final_ink.paste(ink_layer, (0, 0), mask=mask_img)

# Gold tint on nib
nib_mask_img = Image.fromarray(((nib_alpha > 0.18).astype(np.uint8) * 255)).filter(ImageFilter.GaussianBlur(1.5))
gold_layer = Image.new('RGBA', (w, h), (201, 168, 146, 255))
final_ink.paste(gold_layer, (0, 0), mask=nib_mask_img)

final_ink.save('public/images/brand/dove_logo_primary.png')

# 2. Pure Warm Gold (#C9A892)
gold_full = Image.new('RGBA', (w, h), (0,0,0,0))
gold_layer_full = Image.new('RGBA', (w, h), (201, 168, 146, 255))
gold_full.paste(gold_layer_full, (0, 0), mask=mask_img)
gold_full.save('public/images/brand/dove_logo_gold.png')

# 3. Pure White (#FFFFFF)
white_full = Image.new('RGBA', (w, h), (0,0,0,0))
white_layer_full = Image.new('RGBA', (w, h), (255, 255, 255, 255))
white_full.paste(white_layer_full, (0, 0), mask=mask_img)
white_full.save('public/images/brand/dove_logo_white.png')

print('All 3 brand logo assets saved successfully in public/images/brand!')
