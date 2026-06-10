# Settings Menu UI Sprite Pack

Direct-use UI export cropped from `../settings_menu_sections/`.

Files:
- `Settings_menu_spritesheet.png`: packed RGBA spritesheet.
- `Settings_menu_spritesheet.json`: atlas metadata with `frame` and original `source_rect` values.
- `Settings_menu_spritesheet_preview.png`: atlas QA preview with sprite boxes.
- Group folders contain loose PNGs for direct import into a game project.

Export settings:
- Atlas size: `2024x6050`
- Padding: `4px`
- Sprite count: `95`
- Component sprites remove source pixels with alpha <= 120 so the dimmed game backdrop does not travel with the UI piece.
- `page_states/` keeps the original alpha and contains the complete cropped menu overlays for each tab.

Groups:
- `bottom_controls`: 4 sprites
- `controls`: 13 sprites
- `frame`: 10 sprites
- `header`: 4 sprites
- `input_buttons`: 15 sprites
- `page_states`: 5 sprites
- `panels`: 10 sprites
- `section_headers`: 10 sprites
- `tabs`: 11 sprites
- `templates`: 11 sprites
- `window_controls`: 2 sprites

Use `frame` for atlas UV slicing. Use `source_rect` when rebuilding from the original 1620x912 source canvases.

The source images are flattened mockups, so rendered panels/tabs include the text already present in the PNG. The `templates/` group provides cleaned blanks for common rows, tabs, headers, toggles, sliders, and keycaps.

Regenerate with:

```powershell
python tools\export_settings_menu_ui_assets.py
```
