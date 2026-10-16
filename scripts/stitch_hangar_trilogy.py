import os
from PIL import Image

OUT_DIR = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\imgs\Stage1\chap1\marseille_stages\hangar_j4_pier"
GDRIVE_DIR = r"G:\.shortcut-targets-by-id\1WJviqQxEb0WZjNgexsemeSDcDN1Z0n5y\MY PROJCET\UI LF REVIVE\act 1\hangar_j4_pier"

IMG_S1 = r"C:\Users\Quang Huy Nugyen\.gemini\antigravity-ide\brain\c3c768f1-8dd6-4bd0-9cfe-15da5bc520f9\hangar_j4_depot_approach_1792069996358.jpg"
IMG_S2 = os.path.join(OUT_DIR, "hangar_j4_harbor_sunset_master.png")
IMG_S3 = r"C:\Users\Quang Huy Nugyen\.gemini\antigravity-ide\brain\c3c768f1-8dd6-4bd0-9cfe-15da5bc520f9\hangar_j4_slipway_dock_1792070022711.jpg"

os.makedirs(OUT_DIR, exist_ok=True)

# 1. Load 3 Screens
im1 = Image.open(IMG_S1).convert("RGBA")
im2 = Image.open(IMG_S2).convert("RGBA")
im3 = Image.open(IMG_S3).convert("RGBA")

w1, h1 = im1.size
w2, h2 = im2.size
w3, h3 = im3.size

print(f"Loaded Screen 1: {w1}x{h1}")
print(f"Loaded Screen 2: {w2}x{h2}")
print(f"Loaded Screen 3: {w3}x{h3}")

# Save individually named
im1.save(os.path.join(OUT_DIR, "screen_1_container_rail_depot.png"))
im2.save(os.path.join(OUT_DIR, "screen_2_wharf_climax_arena.png"))
im3.save(os.path.join(OUT_DIR, "screen_3_slipway_patrol_dock.png"))

# 2. Stitch Panoramic Scroll (Total Width = w1 + w2 + w3 = 4128px)
total_w = w1 + w2 + w3
total_h = max(h1, h2, h3)

pano = Image.new("RGBA", (total_w, total_h))
pano.paste(im1, (0, 0))
pano.paste(im2, (w1, 0))
pano.paste(im3, (w1 + w2, 0))

pano_path = os.path.join(OUT_DIR, "hangar_j4_panoramic_battle_scroll.png")
pano.save(pano_path)
print(f"Saved Panoramic Scroll: {pano_path} ({total_w}x{total_h})")

# Copy panoramic scroll to imgs/Stage1/chap1 for documentation
pano.save(r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\imgs\Stage1\chap1\hangar_j4_panoramic_battle_scroll.png")

# Also copy a lightweight preview version
preview_w = total_w // 3
preview_h = total_h // 3
pano_preview = pano.resize((preview_w, preview_h), Image.Resampling.LANCZOS)
pano_preview.save(os.path.join(OUT_DIR, "hangar_j4_panoramic_preview.png"))

print("Panoramics stitched successfully!")
