
local spr = Sprite(1376, 768)
spr.filename = "c:/Users/Quang Huy Nugyen/divergency-reviewer-site/imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/hangar_j4_pier_layered.aseprite"

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

add_layer_from_file("Layer 0: Sky & Far Horizon", "c:/Users/Quang Huy Nugyen/divergency-reviewer-site/imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/layer_0_sky_distant.png")
add_layer_from_file("Layer 1: Sea & Wrecked Boat", "c:/Users/Quang Huy Nugyen/divergency-reviewer-site/imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/layer_1_sea_wrecked_boat.png")
add_layer_from_file("Layer 2: Pier Playfield Floor", "c:/Users/Quang Huy Nugyen/divergency-reviewer-site/imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/layer_2_pier_playfield.png")
add_layer_from_file("Layer 3: Props & Obstacles", "c:/Users/Quang Huy Nugyen/divergency-reviewer-site/imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/layer_3_props_and_vehicles.png")

spr:deleteLayer(default_layer)
spr:saveAs("c:/Users/Quang Huy Nugyen/divergency-reviewer-site/imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/hangar_j4_pier_layered.aseprite")
print("SUCCESS_ASEPRITE_CREATED")
