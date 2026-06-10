# Relay / IP Story Room UI Sprite Pack

Unity-ready transparent UI export generated from `tools/generate_relay_ip_room_ui.py`.

Files:
- `Relay_IP_Room_spritesheet.png`: compact transparent RGBA spritesheet.
- `Relay_IP_Room_spritesheet.json`: atlas metadata with `frame` values and 805x456 `source_rect` placement hints.
- `sprites/`: standalone PNG files grouped by UI area.

Export settings:
- Native UI canvas: `805x456`
- Atlas size: `927x700`
- Padding: `1px`
- Sprite count: `55`
- Large 1620x912 screenshots are intentionally not duplicated in this folder.
- QA preview PNGs are skipped by default to keep the Unity import folder small.

Groups:
- `buttons`: 5 sprites
- `fields`: 2 sprites
- `footer`: 1 sprite
- `frame`: 5 sprites
- `header`: 2 sprites
- `name_row`: 2 sprites
- `panels`: 2 sprites
- `room_rows`: 10 sprites
- `section_headers`: 4 sprites
- `setting_rows`: 6 sprites
- `tabs`: 4 sprites
- `templates`: 10 sprites
- `window_controls`: 2 sprites

Unity import:
- Loose PNGs: set Texture Type to `Sprite (2D and UI)`.
- Atlas: set Sprite Mode to `Multiple`, then slice with the JSON `frame` rectangles.
- `source_rect` values place sprites on an 805x456 reference canvas.

Regenerate with:

```powershell
python tools\export_relay_ip_room_ui_assets.py
```

Optional QA previews:

```powershell
python tools\export_relay_ip_room_ui_assets.py --with-previews
```
