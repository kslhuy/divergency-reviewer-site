# Main Menu UI Sprite Pack

Compact import pack for the generated main menu art.

- Atlas: `Main_menu_spritesheet.png`
- Metadata: `Main_menu_spritesheet.json`
- Preview: `main_menu_preview_805x456.png`
- Source canvas: `805x456`
- Atlas size: `813x622`
- Sprite count: `18`

Use `frame` in the JSON for atlas UV/sprite slicing. Use `source_rect` if you want to rebuild the preview layout on an `805x456` canvas.

Loose PNGs are grouped by use:

- `background/`
- `branding/`
- `buttons/`
- `button_states/`
- `icons/`
- `corner_buttons/`
- `labels/`

The root files `../Main_menu_spritesheet.png` and `../Main_menu_spritesheet.json` mirror the existing project convention. This folder also contains a portable copy of the atlas and JSON.

To regenerate loose PNGs from the root atlas:

```powershell
python tools\extract_spritesheet.py imgs\UI\Main_menu_spritesheet.json imgs\UI\main_menu_sprites --group-folders --force
```
