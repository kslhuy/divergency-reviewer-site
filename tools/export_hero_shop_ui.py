from __future__ import annotations

import json
import math
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "imgs" / "UI" / "Heros_Shop.png"
OUT_DIR = ROOT / "imgs" / "UI" / "hero_shop_sprites"
SPRITES_DIR = OUT_DIR / "sprites"

ATLAS_NAME = "Heros_Shop_spritesheet.png"
ATLAS_JSON_NAME = "Heros_Shop_spritesheet.json"
PREVIEW_NAME = "Heros_Shop_spritesheet_preview.png"
LAYOUT_PREVIEW_NAME = "Heros_Shop_layout_preview_0_5x.png"

EXPORT_SCALE = 0.5
PADDING = 1
MAX_ATLAS_WIDTH = 2048


@dataclass(frozen=True)
class SpriteSpec:
    name: str
    group: str
    rect: tuple[int, int, int, int]
    note: str | None = None


@dataclass(frozen=True)
class Rect:
    x: int
    y: int
    w: int
    h: int


SPRITES: tuple[SpriteSpec, ...] = (
    SpriteSpec("title_skill_selection", "screen", (27, 20, 410, 54)),
    SpriteSpec("button_close", "buttons", (1594, 20, 53, 53)),
    SpriteSpec("screen_corner_top_left", "screen", (0, 0, 48, 41)),
    SpriteSpec("screen_corner_top_right", "screen", (1625, 0, 47, 41)),
    SpriteSpec("screen_corner_bottom_left", "screen", (0, 899, 48, 42)),
    SpriteSpec("screen_corner_bottom_right", "screen", (1625, 899, 47, 42)),
    SpriteSpec("heroes_panel_full", "hero_grid", (22, 83, 343, 783), "Composite crop from flattened source."),
    SpriteSpec("heroes_header", "hero_grid", (111, 94, 166, 38)),
    SpriteSpec("hero_card_deep_selected", "hero_grid", (44, 142, 143, 126)),
    SpriteSpec("hero_card_blue_bandana", "hero_grid", (199, 143, 142, 124)),
    SpriteSpec("hero_card_red_hood", "hero_grid", (45, 283, 141, 122)),
    SpriteSpec("hero_card_moss_golem", "hero_grid", (199, 283, 142, 122)),
    SpriteSpec("hero_card_lizard_warrior", "hero_grid", (45, 417, 141, 118)),
    SpriteSpec("hero_card_scarf_archer", "hero_grid", (199, 417, 142, 118)),
    SpriteSpec("hero_card_beast_merchant", "hero_grid", (45, 548, 141, 112)),
    SpriteSpec("hero_card_hunter", "hero_grid", (199, 548, 142, 112)),
    SpriteSpec("hero_card_purple_mage", "hero_grid", (45, 672, 141, 122)),
    SpriteSpec("hero_card_bearded_warrior", "hero_grid", (199, 672, 142, 122)),
    SpriteSpec("hero_selected_diamond", "hero_grid", (103, 249, 28, 29)),
    SpriteSpec("heroes_page_arrow_left", "hero_grid", (77, 812, 36, 47)),
    SpriteSpec("heroes_page_counter", "hero_grid", (159, 819, 58, 35)),
    SpriteSpec("heroes_page_arrow_right", "hero_grid", (273, 812, 37, 47)),
    SpriteSpec("hero_showcase_panel_full", "hero_showcase", (379, 83, 552, 550), "Composite crop from flattened source."),
    SpriteSpec("hero_nameplate_deep", "hero_showcase", (500, 95, 346, 51)),
    SpriteSpec("hero_scene_with_character", "hero_showcase", (399, 101, 511, 414)),
    SpriteSpec("hero_character_deep_crop", "hero_showcase", (543, 176, 257, 329), "Character over source backdrop."),
    SpriteSpec("hero_stone_platform", "hero_showcase", (420, 420, 414, 98)),
    SpriteSpec("hero_stats_panel_full", "hero_showcase", (390, 530, 526, 87)),
    SpriteSpec("hero_stat_hp_block", "hero_showcase", (400, 541, 96, 69)),
    SpriteSpec("hero_stat_mana_block", "hero_showcase", (499, 541, 128, 69)),
    SpriteSpec("hero_stat_role_block", "hero_showcase", (630, 541, 130, 69)),
    SpriteSpec("hero_stat_atk_type_block", "hero_showcase", (763, 541, 150, 69)),
    SpriteSpec("stat_icon_hp", "icons", (405, 547, 25, 27)),
    SpriteSpec("stat_icon_mana", "icons", (514, 546, 27, 30)),
    SpriteSpec("stat_icon_role", "icons", (646, 546, 27, 29)),
    SpriteSpec("stat_icon_atk_type", "icons", (782, 546, 29, 29)),
    SpriteSpec("combo_panel_full", "combo", (379, 640, 552, 286), "Composite crop from flattened source."),
    SpriteSpec("combo_header_equipped_combo", "combo", (452, 653, 426, 30)),
    SpriteSpec("combo_key_dua", "combo", (390, 695, 93, 35)),
    SpriteSpec("combo_key_dda", "combo", (515, 695, 96, 35)),
    SpriteSpec("combo_key_duj", "combo", (647, 695, 97, 35)),
    SpriteSpec("combo_key_ddj", "combo", (795, 695, 96, 35)),
    SpriteSpec("combo_slot_dua_upstork", "combo", (382, 731, 105, 139)),
    SpriteSpec("combo_slot_dda_infernostrike", "combo", (505, 731, 108, 139)),
    SpriteSpec("combo_slot_duj_soul_liberation", "combo", (639, 731, 112, 139)),
    SpriteSpec("combo_slot_ddj_sky_stomp", "combo", (770, 731, 118, 139)),
    SpriteSpec("combo_instruction_bar", "helper", (190, 887, 739, 40)),
    SpriteSpec("info_icon", "icons", (197, 890, 30, 33)),
    SpriteSpec("skills_panel_full", "skill_list", (945, 83, 707, 575), "Composite crop from flattened source."),
    SpriteSpec("skills_header", "skill_list", (1221, 96, 126, 31)),
    SpriteSpec("skill_row_infernostrike", "skill_list", (960, 132, 657, 98)),
    SpriteSpec("skill_row_cut_deep", "skill_list", (960, 237, 657, 98)),
    SpriteSpec("skill_row_sky_stomp_deep", "skill_list", (960, 344, 657, 98)),
    SpriteSpec("skill_row_upstork", "skill_list", (960, 449, 657, 94)),
    SpriteSpec("skill_row_soul_liberation", "skill_list", (960, 548, 657, 96)),
    SpriteSpec("skill_icon_infernostrike", "skill_icons", (972, 144, 82, 82)),
    SpriteSpec("skill_icon_cut_deep", "skill_icons", (972, 248, 82, 82)),
    SpriteSpec("skill_icon_sky_stomp_deep", "skill_icons", (972, 354, 82, 82)),
    SpriteSpec("skill_icon_upstork", "skill_icons", (972, 459, 82, 82)),
    SpriteSpec("skill_icon_soul_liberation", "skill_icons", (972, 558, 82, 82)),
    SpriteSpec("button_equip", "buttons", (1495, 162, 107, 45)),
    SpriteSpec("skills_scroll_track", "skill_list", (1624, 130, 23, 507)),
    SpriteSpec("skills_scroll_thumb", "skill_list", (1628, 153, 15, 120)),
    SpriteSpec("skills_scroll_arrow_up", "skill_list", (1626, 132, 17, 17)),
    SpriteSpec("skills_scroll_arrow_down", "skill_list", (1626, 614, 17, 18)),
    SpriteSpec("skills_list_bottom_marker", "skill_list", (1250, 647, 60, 14)),
    SpriteSpec("skill_stat_icon_mana", "icons", (1323, 150, 21, 24)),
    SpriteSpec("skill_stat_icon_damage", "icons", (1322, 176, 22, 24)),
    SpriteSpec("skill_stat_icon_cooldown", "icons", (1322, 203, 22, 23)),
    SpriteSpec("skill_preview_panel_full", "skill_preview", (945, 670, 707, 247), "Composite crop from flattened source."),
    SpriteSpec("skill_preview_header", "skill_preview", (1017, 684, 175, 31)),
    SpriteSpec("skill_video_frame_full", "skill_preview", (963, 709, 393, 192)),
    SpriteSpec("skill_video_image", "skill_preview", (988, 721, 345, 169)),
    SpriteSpec("skill_play_button", "buttons", (1121, 770, 73, 73)),
    SpriteSpec("skill_preview_text_block", "skill_preview", (1387, 701, 214, 192)),
    SpriteSpec("skill_preview_title_infernostrike", "skill_preview", (1388, 698, 176, 35)),
    SpriteSpec("skill_preview_stats", "skill_preview", (1390, 805, 160, 85)),
)


def safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in value).strip("._")


def scaled_int(value: int, scale: float) -> int:
    return max(1, int(round(value * scale)))


def scaled_rect(rect: tuple[int, int, int, int], scale: float) -> dict[str, int]:
    x, y, w, h = rect
    return {
        "x": int(round(x * scale)),
        "y": int(round(y * scale)),
        "w": scaled_int(w, scale),
        "h": scaled_int(h, scale),
    }


def save_png(image: Image.Image, path: Path) -> None:
    image.save(path, optimize=True, compress_level=9)


def crop_sprite(source: Image.Image, spec: SpriteSpec) -> Image.Image:
    x, y, w, h = spec.rect
    crop = source.crop((x, y, x + w, y + h)).convert("RGBA")
    if EXPORT_SCALE != 1:
        crop = crop.resize(
            (scaled_int(w, EXPORT_SCALE), scaled_int(h, EXPORT_SCALE)),
            Image.Resampling.LANCZOS,
        )
    return crop


def write_individual_sprites(source: Image.Image) -> dict[str, Image.Image]:
    crops: dict[str, Image.Image] = {}
    for spec in SPRITES:
        crop = crop_sprite(source, spec)
        target_dir = SPRITES_DIR / safe_name(spec.group)
        target_dir.mkdir(parents=True, exist_ok=True)
        save_png(crop, target_dir / f"{safe_name(spec.name)}.png")
        crops[spec.name] = crop
    return crops


def rects_intersect(a: Rect, b: Rect) -> bool:
    return a.x < b.x + b.w and a.x + a.w > b.x and a.y < b.y + b.h and a.y + a.h > b.y


def rect_contains(a: Rect, b: Rect) -> bool:
    return b.x >= a.x and b.y >= a.y and b.x + b.w <= a.x + a.w and b.y + b.h <= a.y + a.h


def split_free_rect(free: Rect, used: Rect) -> list[Rect]:
    if not rects_intersect(free, used):
        return [free]

    splits: list[Rect] = []

    if used.x > free.x:
        splits.append(Rect(free.x, free.y, used.x - free.x, free.h))
    if used.x + used.w < free.x + free.w:
        splits.append(
            Rect(
                used.x + used.w,
                free.y,
                free.x + free.w - (used.x + used.w),
                free.h,
            )
        )
    if used.y > free.y:
        splits.append(Rect(free.x, free.y, free.w, used.y - free.y))
    if used.y + used.h < free.y + free.h:
        splits.append(
            Rect(
                free.x,
                used.y + used.h,
                free.w,
                free.y + free.h - (used.y + used.h),
            )
        )

    return [rect for rect in splits if rect.w > 0 and rect.h > 0]


def prune_free_rects(rects: list[Rect]) -> list[Rect]:
    pruned: list[Rect] = []
    for index, rect in enumerate(rects):
        if any(index != other_index and rect_contains(other, rect) for other_index, other in enumerate(rects)):
            continue
        pruned.append(rect)
    return pruned


def pack_with_width(
    ordered_specs: list[SpriteSpec],
    sizes: dict[str, tuple[int, int]],
    target_width: int,
) -> tuple[dict[str, dict[str, int]], int, int] | None:
    large_height = sum(height + PADDING for _, height in sizes.values()) + PADDING
    free_rects = [Rect(0, 0, target_width, large_height)]
    frames: dict[str, dict[str, int]] = {}

    for spec in ordered_specs:
        sprite_w, sprite_h = sizes[spec.name]
        pack_w = sprite_w + PADDING
        pack_h = sprite_h + PADDING

        best_index = -1
        best_rect: Rect | None = None
        best_score = (math.inf, math.inf, math.inf)

        for index, free in enumerate(free_rects):
            if pack_w > free.w or pack_h > free.h:
                continue
            leftover_w = free.w - pack_w
            leftover_h = free.h - pack_h
            score = (min(leftover_w, leftover_h), max(leftover_w, leftover_h), free.y)
            if score < best_score:
                best_score = score
                best_index = index
                best_rect = free

        if best_rect is None:
            return None

        placed = Rect(best_rect.x, best_rect.y, pack_w, pack_h)
        frames[spec.name] = {"x": placed.x, "y": placed.y, "w": sprite_w, "h": sprite_h}

        next_free: list[Rect] = []
        for free in free_rects:
            next_free.extend(split_free_rect(free, placed))
        free_rects = prune_free_rects(next_free)

    used_w = max(frame["x"] + frame["w"] for frame in frames.values())
    used_h = max(frame["y"] + frame["h"] for frame in frames.values())
    return frames, used_w, used_h


def pack_sprites(crops: dict[str, Image.Image]) -> tuple[Image.Image, dict[str, dict[str, int]]]:
    sizes = {name: crop.size for name, crop in crops.items()}
    ordered_specs = sorted(
        SPRITES,
        key=lambda spec: (
            -(sizes[spec.name][0] * sizes[spec.name][1]),
            -max(sizes[spec.name]),
            spec.group,
            spec.name,
        ),
    )

    min_width = max(width + PADDING for width, _ in sizes.values())
    start_width = max(4, int(math.floor(min_width / 4) * 4))
    widths = set(range(start_width, MAX_ATLAS_WIDTH + 1, 4))
    widths.add(min_width)

    best: tuple[int, int, int, dict[str, dict[str, int]]] | None = None
    for width in sorted(widths):
        result = pack_with_width(ordered_specs, sizes, width)
        if result is None:
            continue
        frames, used_w, used_h = result
        area = used_w * used_h
        score = (area, max(used_w, used_h), used_w)
        if best is None or score < (best[0], max(best[1], best[2]), best[1]):
            best = (area, used_w, used_h, frames)

    if best is None:
        raise RuntimeError("Could not pack hero shop sprites.")

    _, atlas_w, atlas_h, frames = best
    atlas = Image.new("RGBA", (atlas_w, atlas_h), (0, 0, 0, 0))
    for name, crop in crops.items():
        frame = frames[name]
        atlas.alpha_composite(crop, (frame["x"], frame["y"]))

    return atlas, frames


def write_metadata(source: Image.Image, atlas: Image.Image, frames: dict[str, dict[str, int]]) -> None:
    metadata = {
        "image": ATLAS_NAME,
        "source": "imgs/UI/Heros_Shop.png",
        "source_size": {"w": source.width, "h": source.height},
        "export_scale": EXPORT_SCALE,
        "canvas_size": {
            "w": scaled_int(source.width, EXPORT_SCALE),
            "h": scaled_int(source.height, EXPORT_SCALE),
        },
        "size": {"w": atlas.width, "h": atlas.height},
        "padding": PADDING,
        "sprite_count": len(SPRITES),
        "packing": "MaxRects best-short-side-fit, non-rotated, exact non-power-of-two atlas, 0.5x export",
        "sprites": {},
        "notes": (
            "Cropped from a flattened hero shop mockup. Frame values are atlas pixels; "
            "source_rect values are original Heros_Shop.png pixels. Use source_rect_scaled "
            "to rebuild the 0.5x layout canvas."
        ),
    }

    for spec in SPRITES:
        x, y, w, h = spec.rect
        entry = {
            "group": spec.group,
            "frame": frames[spec.name],
            "source_rect": {"x": x, "y": y, "w": w, "h": h},
            "source_rect_scaled": scaled_rect(spec.rect, EXPORT_SCALE),
            "rotated": False,
            "trimmed": False,
            "original_size": {"w": w, "h": h},
            "exported_size": {
                "w": scaled_int(w, EXPORT_SCALE),
                "h": scaled_int(h, EXPORT_SCALE),
            },
            "trim_rect": {"x": 0, "y": 0, "w": w, "h": h},
        }
        if spec.note:
            entry["note"] = spec.note
        metadata["sprites"][spec.name] = entry

    (OUT_DIR / ATLAS_JSON_NAME).write_text(json.dumps(metadata, indent=2), encoding="utf-8")


def draw_checkerboard(size: tuple[int, int], cell: int = 12) -> Image.Image:
    image = Image.new("RGBA", size, (46, 48, 50, 255))
    draw = ImageDraw.Draw(image)
    for y in range(0, size[1], cell):
        for x in range(0, size[0], cell):
            if (x // cell + y // cell) % 2 == 0:
                draw.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(30, 32, 35, 255))
    return image


def write_preview(atlas: Image.Image, frames: dict[str, dict[str, int]]) -> None:
    preview = draw_checkerboard(atlas.size)
    preview.alpha_composite(atlas)
    draw = ImageDraw.Draw(preview)
    font = ImageFont.load_default()

    for spec in SPRITES:
        frame = frames[spec.name]
        x, y, w, h = frame["x"], frame["y"], frame["w"], frame["h"]
        draw.rectangle((x, y, x + w - 1, y + h - 1), outline=(245, 185, 67, 255), width=1)
        if w >= 50 and h >= 18:
            label = spec.name
            label_box = draw.textbbox((0, 0), label, font=font)
            label_w = min(label_box[2] - label_box[0] + 6, w)
            label_h = min(label_box[3] - label_box[1] + 4, h)
            draw.rectangle((x, y, x + label_w, y + label_h), fill=(0, 0, 0, 185))
            draw.text((x + 3, y + 2), label[: max(1, w // 6)], fill=(255, 226, 138, 255), font=font)

    save_png(preview, OUT_DIR / PREVIEW_NAME)


def write_layout_preview(crops: dict[str, Image.Image], source: Image.Image) -> None:
    preview = Image.new(
        "RGBA",
        (scaled_int(source.width, EXPORT_SCALE), scaled_int(source.height, EXPORT_SCALE)),
        (8, 13, 18, 255),
    )
    for spec in SPRITES:
        target = scaled_rect(spec.rect, EXPORT_SCALE)
        preview.alpha_composite(crops[spec.name], (target["x"], target["y"]))
    save_png(preview, OUT_DIR / LAYOUT_PREVIEW_NAME)


def write_readme(atlas: Image.Image, source: Image.Image) -> None:
    groups: dict[str, list[str]] = {}
    for spec in SPRITES:
        groups.setdefault(spec.group, []).append(spec.name)

    lines = [
        "# Hero Shop UI Sprite Pack",
        "",
        "Direct-use UI export cropped from `../Heros_Shop.png`.",
        "",
        "Files:",
        f"- `{ATLAS_NAME}`: packed transparent RGBA spritesheet.",
        f"- `{ATLAS_JSON_NAME}`: atlas metadata with atlas `frame` values and original `source_rect` values.",
        f"- `{PREVIEW_NAME}`: atlas QA preview with sprite boxes.",
        f"- `{LAYOUT_PREVIEW_NAME}`: 0.5x placement preview using `source_rect_scaled`.",
        "- `sprites/`: standalone PNG files grouped by UI area.",
        "",
        "Export settings:",
        f"- Source canvas: `{source.width}x{source.height}`",
        f"- Export scale: `{EXPORT_SCALE}x`",
        f"- Atlas size: `{atlas.width}x{atlas.height}`",
        f"- Padding: `{PADDING}px`",
        "",
        "Groups:",
    ]
    for group, names in sorted(groups.items()):
        noun = "sprite" if len(names) == 1 else "sprites"
        lines.append(f"- `{group}`: {len(names)} {noun}")

    lines.extend(
        [
            "",
            "Use `frame` for atlas UV slicing. Use `source_rect_scaled` when placing sprites on a 0.5x rebuild canvas.",
            "",
            "The source image is flattened, so composite panel crops include the text and artwork already rendered inside them.",
            "",
            "Regenerate with:",
            "",
            "```powershell",
            "python tools\\export_hero_shop_ui.py",
            "```",
        ]
    )

    (OUT_DIR / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Source image not found: {SOURCE}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE).convert("RGBA")
    crops = write_individual_sprites(source)
    atlas, frames = pack_sprites(crops)
    save_png(atlas, OUT_DIR / ATLAS_NAME)
    write_metadata(source, atlas, frames)
    write_preview(atlas, frames)
    write_layout_preview(crops, source)
    write_readme(atlas, source)

    print(f"Wrote {len(SPRITES)} sprites to {OUT_DIR}")
    print(f"Wrote atlas: {OUT_DIR / ATLAS_NAME} ({atlas.width}x{atlas.height})")
    print(f"Wrote metadata: {OUT_DIR / ATLAS_JSON_NAME}")


if __name__ == "__main__":
    main()
