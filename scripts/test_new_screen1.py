import os
from PIL import Image

OUT_DIR = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\imgs\Stage1\chap1\marseille_stages\hangar_j4_pier"
NEW_S1 = r"C:\Users\Quang Huy Nugyen\.gemini\antigravity-ide\brain\c3c768f1-8dd6-4bd0-9cfe-15da5bc520f9\screen_1_seamless_depot_1792070836531.jpg"
S2 = os.path.join(OUT_DIR, "screen_2_wharf_climax_arena.png")
S3 = os.path.join(OUT_DIR, "screen_3_slipway_patrol_dock.png")

# 1. Load images
im1 = Image.open(NEW_S1).convert("RGBA")
im2 = Image.open(S2).convert("RGBA")
im3 = Image.open(S3).convert("RGBA")

w1, h1 = im1.size
w2, h2 = im2.size
w3, h3 = im3.size

print(f"Im1: {w1}x{h1}, Im2: {w2}x{h2}, Im3: {w3}x{h3}")

# Overwrite screen_1_container_rail_depot.png
im1.save(os.path.join(OUT_DIR, "screen_1_container_rail_depot.png"))

# Stitch new panorama
total_w = w1 + w2 + w3
total_h = max(h1, h2, h3)

pano = Image.new("RGBA", (total_w, total_h))
pano.paste(im1, (0, 0))
pano.paste(im2, (w1, 0))
pano.paste(im3, (w1 + w2, 0))

pano_path = os.path.join(OUT_DIR, "hangar_j4_panoramic_battle_scroll.png")
pano.save(pano_path)
print("Updated panorama saved:", pano_path)

# Also copy to docs location
pano.save(r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\imgs\Stage1\chap1\hangar_j4_panoramic_battle_scroll.png")

# Save preview
preview = pano.resize((total_w // 3, total_h // 3), Image.Resampling.LANCZOS)
preview.save(os.path.join(OUT_DIR, "hangar_j4_panoramic_preview.png"))

# Also save a 1200px zoom-in on the seam between Screen 1 and Screen 2 (x: w1 - 600 to w1 + 600)
seam_crop = pano.crop((w1 - 500, 0, w1 + 500, total_h))
seam_crop.save(os.path.join(OUT_DIR, "seam_screen1_to_screen2.png"))

print("Seam preview saved!")
