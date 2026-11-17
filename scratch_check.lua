
local spr = Sprite{ fromFile = "c:/Users/Quang Huy Nugyen/divergency-reviewer-site/Sakuri_Animation_Suite/aseprite/Sakuri_Master_Combat.aseprite" }
if spr then
    print("Master Aseprite Open Success!")
    print("Size: " .. spr.width .. "x" .. spr.height .. ", Frames: " .. #spr.frames)
    for i, l in ipairs(spr.layers) do
        print("  Layer " .. i .. ": " .. l.name)
    end
    print("Tags:")
    for _, t in ipairs(spr.tags) do
        print("  - " .. t.name .. ": " .. t.fromFrame.frameNumber .. ".." .. t.toFrame.frameNumber)
    end
    spr:close()
else
    print("Failed to open Master Aseprite")
end
