# Command List UI Sprite Pack

Reusable UI export cropped from `../Command_list_generated.png`.

Files:
- `Command_list_spritesheet.png`: packed transparent RGBA spritesheet.
- `Command_list_spritesheet.json`: atlas metadata with `frame` and original `source_rect` values.
- `Command_list_spritesheet_preview.png`: atlas QA preview with sprite boxes.
- `sprites/`: standalone PNG files grouped by UI area.

Atlas size: `2016x869`
Sprite count: `37`

Groups:
- `frame`: 10 sprites
- `header`: 7 sprites
- `characters`: 2 sprites
- `tabs`: 4 sprites
- `command_list`: 5 sprites
- `details`: 5 sprites
- `inputs`: 2 sprites
- `bottom_controls`: 2 sprites

Unity notes:
- Import `Command_list_spritesheet.png` as Texture Type `Sprite (2D and UI)`.
- Set Sprite Mode to `Multiple`, then use the JSON `frame` rectangles for slicing.
- The `source_rect` rectangles map each sprite back to the original 1621x970 mockup.

Notes:
- Command rows and detail rows are blank templates for runtime text/icons.
- `move_preview_window` is a background/frame layer; `move_preview_character_deep_layer` is the separate character layer.
- The source image is flattened, so the empty preview background is rebuilt from the painted pixels.
