import os
import sys
from PIL import Image, ImageDraw, ImageFilter
import subprocess

SRC_IMG = r"C:\Users\Quang Huy Nugyen\.gemini\antigravity-ide\brain\c3c768f1-8dd6-4bd0-9cfe-15da5bc520f9\hangar_j4_harbor_map_1792069570308.jpg"
OUT_DIR = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\imgs\Stage1\chap1\marseille_stages\hangar_j4_pier"
ASEPRITE_EXE = r"C:\Program Files\Aseprite\Aseprite.exe"

os.makedirs(OUT_DIR, exist_ok=True)

# 1. Load Source Image
img = Image.open(SRC_IMG).convert("RGBA")
W, H = img.size
print(f"Loaded master image: {W}x{H}")

# Save master PNG
master_png = os.path.join(OUT_DIR, "hangar_j4_harbor_sunset_master.png")
img.save(master_png)
print(f"Saved master PNG: {master_png}")

# Also copy to imgs/Stage1/chap1 for markdown references
shorter_target = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\imgs\Stage1\chap1\hangar_j4_harbor_sunset_master.png"
img.save(shorter_target)

# Pier quay edge line is roughly at y = 455
# Water starts at y ~ 230 to 455
# Left sedans: x 0..360, y 520..768
# Right containers: x 1080..1376, y 285..768
# Center manholes:
#  M1: (600, 470, 680, 500)
#  M2: (700, 630, 800, 675)
#  M3: (850, 480, 940, 520)
#  M4: (560, 570, 650, 615)
# Boat and smoke: x 470..850, y 10..470

# 2. Build Layer 0: Sky & Far Horizon (Background only)
# Keep sky, mountains, Fort Saint-Jean, sea horizon.
# Pier edge is at y=455. In Layer 0, the pier can either be solid dark silhouette or full base.
layer0 = img.copy()
layer0_path = os.path.join(OUT_DIR, "layer_0_sky_distant.png")
layer0.save(layer0_path)
print("Saved Layer 0")

# 3. Build Layer 1: Sea & Wrecked Boat
# Crop or mask the sea and boat region
layer1 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
# Boat & smoke region
# Boat bounding box roughly x: 450..1000, y: 0..470
boat_mask = Image.new("L", (W, H), 0)
draw_mask = ImageDraw.Draw(boat_mask)
# Ellipse/polygon around smoke and boat
draw_mask.polygon([
    (480, 460), (450, 360), (510, 310), (570, 150), (620, 20),
    (780, 0), (880, 60), (850, 160), (760, 220), (700, 340),
    (830, 410), (830, 465), (480, 465)
], fill=255)
# Soften mask slightly
boat_mask = boat_mask.filter(ImageFilter.GaussianBlur(1.5))
layer1.paste(img, (0, 0), mask=boat_mask)
layer1_path = os.path.join(OUT_DIR, "layer_1_sea_wrecked_boat.png")
layer1.save(layer1_path)
print("Saved Layer 1 (Wrecked Boat & Smoke)")

# 4. Build Layer 2: Pier Playfield Floor
# Floor is from y=455 to H=768
layer2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
floor_mask = Image.new("L", (W, H), 0)
draw_floor = ImageDraw.Draw(floor_mask)
# Pier edge has a slight jagged line around y=455
draw_floor.rectangle([(0, 455), (W, H)], fill=255)
layer2.paste(img, (0, 0), mask=floor_mask)
layer2_path = os.path.join(OUT_DIR, "layer_2_pier_playfield.png")
layer2.save(layer2_path)
print("Saved Layer 2 (Pier Playfield Floor)")

# 5. Build Layer 3: Props & Obstacles (Cars, Containers, Manholes)
layer3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
props_mask = Image.new("L", (W, H), 0)
draw_props = ImageDraw.Draw(props_mask)

# Left Sedans mask
draw_props.polygon([
    (0, 520), (330, 520), (360, 650), (280, 768), (0, 768)
], fill=255)

# Right Containers mask
draw_props.polygon([
    (1070, 280), (1376, 280), (1376, 768), (1070, 768)
], fill=255)

# Manhole grates masks
manholes = [
    (580, 455, 680, 510),
    (690, 615, 810, 685),
    (835, 470, 950, 535),
    (540, 560, 660, 630)
]
for m in manholes:
    draw_props.ellipse(m, fill=255)

layer3.paste(img, (0, 0), mask=props_mask)
layer3_path = os.path.join(OUT_DIR, "layer_3_props_and_vehicles.png")
layer3.save(layer3_path)
print("Saved Layer 3 (Props, Sedans, Containers, Manholes)")

# 6. Extract Individual Props
# 6.1 Mafia Sedans Trio
sedans_crop = img.crop((0, 515, 360, 768))
sedans_crop.save(os.path.join(OUT_DIR, "prop_mafia_sedans_trio.png"))

# 6.2 Shipping Containers 2-Tier
containers_crop = img.crop((1070, 280, 1376, 768))
containers_crop.save(os.path.join(OUT_DIR, "prop_shipping_containers_2tier.png"))

# 6.3 Wrecked Boat with Smoke
boat_crop = layer1.crop((450, 0, 880, 475))
boat_crop.save(os.path.join(OUT_DIR, "prop_wrecked_boat_smoking.png"))

# 6.4 Single Manhole with Toxic Fume
manhole_crop = img.crop((685, 580, 815, 685))
manhole_crop.save(os.path.join(OUT_DIR, "prop_manhole_toxic_grate.png"))

print("Extracted individual props successfully!")

# 7. Create Native .aseprite file using Lua script
lua_script_path = os.path.join(OUT_DIR, "create_layered_stage.lua")
out_dir_posix = OUT_DIR.replace("\\", "/")
layer0_posix = layer0_path.replace("\\", "/")
layer1_posix = layer1_path.replace("\\", "/")
layer2_posix = layer2_path.replace("\\", "/")
layer3_posix = layer3_path.replace("\\", "/")
aseprite_target_posix = f"{out_dir_posix}/hangar_j4_pier_layered.aseprite"

with open(lua_script_path, "w", encoding="utf-8") as f:
    f.write(f'''
local spr = Sprite({W}, {H})
spr.filename = "{aseprite_target_posix}"

-- Remove default layer
local default_layer = spr.layers[1]

-- Helper to load image to layer
function add_layer_from_file(layer_name, file_path)
    local doc = app.open(file_path)
    local img_clone = doc.cels[1].image:clone()
    doc:close()
    
    local new_layer = spr:newLayer()
    new_layer.name = layer_name
    spr:newCel(new_layer, 1, img_clone, Point(0, 0))
    return new_layer
end

add_layer_from_file("Layer 0: Sky & Far Horizon", "{layer0_posix}")
add_layer_from_file("Layer 1: Sea & Wrecked Boat", "{layer1_posix}")
add_layer_from_file("Layer 2: Pier Playfield Floor", "{layer2_posix}")
add_layer_from_file("Layer 3: Props & Obstacles", "{layer3_posix}")

spr:deleteLayer(default_layer)
spr:saveAs("{aseprite_target_posix}")
print("SUCCESS_ASEPRITE_CREATED")
''')

# Run Aseprite script
cmd = [ASEPRITE_EXE, "-b", "--script", lua_script_path]
proc = subprocess.run(cmd, capture_output=True, text=True)
print("Aseprite script output:", proc.stdout)
if os.path.exists(os.path.join(OUT_DIR, "hangar_j4_pier_layered.aseprite")):
    print("Aseprite layered file created successfully!")
else:
    print("Warning: Aseprite file not created directly. Will verify.")
