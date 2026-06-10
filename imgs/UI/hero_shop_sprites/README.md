# Hero Shop UI Sprite Pack

Direct-use UI export cropped from `../Heros_Shop.png`.

Files:
- `Heros_Shop_spritesheet.png`: packed transparent RGBA spritesheet.
- `Heros_Shop_spritesheet.json`: atlas metadata with atlas `frame` values and original `source_rect` values.
- `Heros_Shop_spritesheet_preview.png`: atlas QA preview with sprite boxes.
- `Heros_Shop_layout_preview_0_5x.png`: 0.5x placement preview using `source_rect_scaled`.
- `sprites/`: standalone PNG files grouped by UI area.

Export settings:
- Source canvas: `1672x941`
- Export scale: `0.5x`
- Atlas size: `599x1176`
- Padding: `1px`

Groups:
- `buttons`: 3 sprites
- `combo`: 10 sprites
- `helper`: 1 sprite
- `hero_grid`: 16 sprites
- `hero_showcase`: 10 sprites
- `icons`: 8 sprites
- `screen`: 5 sprites
- `skill_icons`: 5 sprites
- `skill_list`: 12 sprites
- `skill_preview`: 7 sprites

Use `frame` for atlas UV slicing. Use `source_rect_scaled` when placing sprites on a 0.5x rebuild canvas.

The source image is flattened, so composite panel crops include the text and artwork already rendered inside them.

Regenerate with:

```powershell
python tools\export_hero_shop_ui.py
```
