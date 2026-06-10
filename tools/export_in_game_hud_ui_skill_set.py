from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "imgs" / "UI" / "In_game_generated.png"
OUT_DIR = ROOT / "imgs" / "UI" / "in_game_hud_ui_skill_set"
SPRITES_DIR = OUT_DIR / "sprites"
ATLAS_NAME = "In_game_HUD_UI_Skill_Set_spritesheet.png"
ATLAS_JSON_NAME = "In_game_HUD_UI_Skill_Set_spritesheet.json"
PREVIEW_NAME = "In_game_HUD_UI_Skill_Set_spritesheet_preview.png"
PADDING = 4
MAX_ATLAS_WIDTH = 2048


@dataclass(frozen=True)
class SpriteSpec:
    name: str
    group: str
    rect: tuple[int, int, int, int]
    mask: str | None = None
    note: str | None = None


SPRITES: tuple[SpriteSpec, ...] = (
    SpriteSpec("top_player_hud_full", "hud_top_left", (14, 16, 672, 199), "top_player_full"),
    SpriteSpec("top_portrait_panel", "hud_top_left", (15, 17, 170, 196)),
    SpriteSpec("top_portrait_deep", "hud_top_left", (31, 32, 129, 122)),
    SpriteSpec("top_level_plate_lv18", "hud_top_left", (43, 153, 108, 45)),
    SpriteSpec("top_status_stats_panel", "hud_top_left", (185, 21, 495, 143)),
    SpriteSpec("top_name_deep", "hud_top_left", (202, 31, 135, 43)),
    SpriteSpec("top_hp_meter_full", "hud_top_left", (201, 82, 454, 35)),
    SpriteSpec("top_hp_meter_fill", "hud_top_left", (272, 86, 376, 22)),
    SpriteSpec("top_mana_meter_full", "hud_top_left", (201, 124, 455, 35)),
    SpriteSpec("top_mana_meter_fill", "hud_top_left", (279, 128, 370, 22)),
    SpriteSpec("top_status_icon_guard", "hud_top_left", (466, 34, 35, 35)),
    SpriteSpec("top_status_icon_fire", "hud_top_left", (512, 34, 35, 35)),
    SpriteSpec("top_status_icon_heal", "hud_top_left", (558, 34, 35, 35)),
    SpriteSpec("top_skill_counter_full", "hud_top_left", (201, 164, 187, 50)),
    SpriteSpec("top_skill_label", "hud_top_left", (213, 174, 71, 29)),
    SpriteSpec("top_skill_icon_slash", "hud_top_left", (294, 169, 40, 42)),
    SpriteSpec("top_skill_count_1", "hud_top_left", (341, 174, 33, 31)),
    SpriteSpec("top_right_objective_full", "hud_top_right", (1362, 12, 251, 78), "top_right_full"),
    SpriteSpec("top_right_skull_panel", "hud_top_right", (1363, 28, 166, 58)),
    SpriteSpec("top_right_skull_red", "hud_top_right", (1385, 42, 31, 31)),
    SpriteSpec("top_right_skull_gray_1", "hud_top_right", (1434, 43, 31, 30)),
    SpriteSpec("top_right_skull_gray_2", "hud_top_right", (1484, 43, 31, 30)),
    SpriteSpec("top_right_star_panel", "hud_top_right", (1535, 13, 76, 76)),
    SpriteSpec("bottom_command_ui_full", "command_ui", (53, 598, 599, 270), "command_full"),
    SpriteSpec("command_wheel_full", "command_ui", (53, 598, 269, 270), "ellipse"),
    SpriteSpec("command_wheel_center_line", "command_ui", (144, 687, 101, 101), "ellipse"),
    SpriteSpec("command_wheel_free_segment", "command_ui", (119, 604, 144, 91)),
    SpriteSpec("command_wheel_hold_left_segment", "command_ui", (62, 675, 103, 111)),
    SpriteSpec("command_wheel_hold_right_segment", "command_ui", (211, 675, 103, 111)),
    SpriteSpec("command_wheel_come_segment", "command_ui", (119, 778, 144, 82)),
    SpriteSpec("ally_formation_panel_full", "command_ui", (333, 687, 318, 170)),
    SpriteSpec("ally_portrait_solei", "command_ui", (338, 701, 77, 75)),
    SpriteSpec("ally_name_row_solei", "command_ui", (429, 705, 188, 36)),
    SpriteSpec("formation_name_row_line", "command_ui", (429, 747, 198, 36)),
    SpriteSpec("formation_slots_panel", "command_ui", (334, 785, 296, 68)),
    SpriteSpec("formation_slot_active_solei", "command_ui", (467, 795, 33, 47)),
    SpriteSpec("skill_hotbar_full", "skill_set", (1168, 761, 428, 145)),
    SpriteSpec("skill_slot_1_full", "skill_set", (1178, 774, 97, 130)),
    SpriteSpec("skill_slot_1_icon_slash", "skill_set", (1187, 783, 76, 78)),
    SpriteSpec("skill_slot_1_key", "skill_set", (1213, 873, 40, 31)),
    SpriteSpec("skill_slot_2_full", "skill_set", (1284, 774, 98, 130)),
    SpriteSpec("skill_slot_2_icon_arc", "skill_set", (1294, 783, 76, 78)),
    SpriteSpec("skill_slot_2_key", "skill_set", (1320, 873, 40, 31)),
    SpriteSpec("skill_slot_3_full", "skill_set", (1391, 774, 98, 130)),
    SpriteSpec("skill_slot_3_icon_impact", "skill_set", (1402, 783, 76, 78)),
    SpriteSpec("skill_slot_3_key", "skill_set", (1427, 873, 40, 31)),
    SpriteSpec("skill_slot_4_full", "skill_set", (1499, 774, 98, 130)),
    SpriteSpec("skill_slot_4_icon_rock", "skill_set", (1508, 783, 77, 78)),
    SpriteSpec("skill_slot_4_key", "skill_set", (1534, 873, 40, 31)),
    SpriteSpec("ally_nameplate_solei", "scene_markers", (593, 541, 61, 22)),
    SpriteSpec("enemy_guard_hp_bar", "scene_markers", (1121, 413, 115, 8)),
    SpriteSpec("enemy_guard_shield_marker", "scene_markers", (937, 415, 38, 38)),
)


def safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in value).strip("._")


def antialiased_ellipse_mask(size: tuple[int, int], inset: int = 0) -> Image.Image:
    scale = 4
    large = Image.new("L", (size[0] * scale, size[1] * scale), 0)
    draw = ImageDraw.Draw(large)
    box = (
        inset * scale,
        inset * scale,
        (size[0] - inset) * scale - 1,
        (size[1] - inset) * scale - 1,
    )
    draw.ellipse(box, fill=255)
    return large.resize(size, Image.Resampling.LANCZOS)


def antialiased_shape_mask(
    size: tuple[int, int],
    *,
    rectangles: tuple[tuple[int, int, int, int], ...] = (),
    ellipses: tuple[tuple[int, int, int, int], ...] = (),
) -> Image.Image:
    scale = 4
    large = Image.new("L", (size[0] * scale, size[1] * scale), 0)
    draw = ImageDraw.Draw(large)

    for x, y, w, h in rectangles:
        draw.rectangle(
            (
                x * scale,
                y * scale,
                (x + w) * scale - 1,
                (y + h) * scale - 1,
            ),
            fill=255,
        )

    for x, y, w, h in ellipses:
        draw.ellipse(
            (
                x * scale,
                y * scale,
                (x + w) * scale - 1,
                (y + h) * scale - 1,
            ),
            fill=255,
        )

    return large.resize(size, Image.Resampling.LANCZOS)


def crop_sprite(source: Image.Image, spec: SpriteSpec) -> Image.Image:
    x, y, w, h = spec.rect
    crop = source.crop((x, y, x + w, y + h)).convert("RGBA")

    if spec.mask == "ellipse":
        alpha = antialiased_ellipse_mask(crop.size)
        crop.putalpha(alpha)
    elif spec.mask == "top_player_full":
        alpha = antialiased_shape_mask(
            crop.size,
            rectangles=(
                (0, 0, 172, 199),
                (171, 5, 501, 143),
                (187, 148, 187, 50),
            ),
        )
        crop.putalpha(alpha)
    elif spec.mask == "top_right_full":
        alpha = antialiased_shape_mask(
            crop.size,
            rectangles=((1, 16, 166, 58), (173, 0, 78, 78)),
        )
        crop.putalpha(alpha)
    elif spec.mask == "command_full":
        alpha = antialiased_shape_mask(
            crop.size,
            rectangles=((234, 80, 365, 190),),
            ellipses=((0, 0, 269, 270),),
        )
        crop.putalpha(alpha)

    return crop


def write_individual_sprites(source: Image.Image) -> dict[str, Image.Image]:
    crops: dict[str, Image.Image] = {}

    for spec in SPRITES:
        crop = crop_sprite(source, spec)
        target_dir = SPRITES_DIR / safe_name(spec.group)
        target_dir.mkdir(parents=True, exist_ok=True)
        crop.save(target_dir / f"{safe_name(spec.name)}.png")
        crops[spec.name] = crop

    return crops


def pack_sprites(crops: dict[str, Image.Image]) -> tuple[Image.Image, dict[str, dict[str, int]]]:
    frames: dict[str, dict[str, int]] = {}
    x = PADDING
    y = PADDING
    row_h = 0
    atlas_w = 0

    ordered_specs = sorted(
        SPRITES,
        key=lambda spec: (
            spec.group,
            -crops[spec.name].height,
            -crops[spec.name].width,
            spec.name,
        ),
    )

    for spec in ordered_specs:
        crop = crops[spec.name]
        w, h = crop.size
        if x > PADDING and x + w + PADDING > MAX_ATLAS_WIDTH:
            x = PADDING
            y += row_h + PADDING
            row_h = 0

        frames[spec.name] = {"x": x, "y": y, "w": w, "h": h}
        x += w + PADDING
        row_h = max(row_h, h)
        atlas_w = max(atlas_w, x)

    atlas_h = y + row_h + PADDING
    atlas = Image.new("RGBA", (atlas_w, atlas_h), (0, 0, 0, 0))

    for spec in ordered_specs:
        crop = crops[spec.name]
        frame = frames[spec.name]
        atlas.alpha_composite(crop, (frame["x"], frame["y"]))

    return atlas, frames


def write_metadata(source: Image.Image, atlas: Image.Image, frames: dict[str, dict[str, int]]) -> None:
    specs = {spec.name: spec for spec in SPRITES}
    metadata = {
        "image": ATLAS_NAME,
        "source": "imgs/UI/In_game_generated.png",
        "source_size": {"w": source.width, "h": source.height},
        "size": {"w": atlas.width, "h": atlas.height},
        "padding": PADDING,
        "sprite_count": len(SPRITES),
        "packing": "Shelf pack, non-rotated, transparent RGBA atlas",
        "sprites": {},
        "notes": (
            "Standalone in-game HUD, command UI, and skill-set crops from the flattened "
            "gameplay concept image. Individual PNGs are grouped under sprites/."
        ),
    }

    for spec in SPRITES:
        x, y, w, h = spec.rect
        entry = {
            "group": spec.group,
            "frame": frames[spec.name],
            "source_rect": {"x": x, "y": y, "w": w, "h": h},
            "rotated": False,
            "trimmed": False,
        }
        if spec.mask:
            entry["mask"] = spec.mask
        if spec.note:
            entry["note"] = spec.note
        metadata["sprites"][spec.name] = entry

    (OUT_DIR / ATLAS_JSON_NAME).write_text(json.dumps(metadata, indent=2), encoding="utf-8")


def draw_checkerboard(size: tuple[int, int], cell: int = 16) -> Image.Image:
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
        label = spec.name
        label_box = draw.textbbox((0, 0), label, font=font)
        label_w = label_box[2] - label_box[0] + 6
        label_h = label_box[3] - label_box[1] + 4
        if w >= 60 and h >= 24:
            draw.rectangle((x, y, x + min(label_w, w), y + label_h), fill=(0, 0, 0, 185))
            draw.text((x + 3, y + 2), label[: max(1, min(len(label), w // 6))], fill=(255, 226, 138, 255), font=font)

    preview.save(OUT_DIR / PREVIEW_NAME)


def write_readme() -> None:
    groups: dict[str, list[str]] = {}
    for spec in SPRITES:
        groups.setdefault(spec.group, []).append(spec.name)

    lines = [
        "# In-Game HUD UI Skill Set",
        "",
        "Direct-use UI export cropped from `../In_game_generated.png`.",
        "",
        "Files:",
        f"- `{ATLAS_NAME}`: packed transparent RGBA spritesheet.",
        f"- `{ATLAS_JSON_NAME}`: atlas metadata with `frame` and original `source_rect` values.",
        f"- `{PREVIEW_NAME}`: atlas QA preview with sprite boxes.",
        "- `sprites/`: standalone PNG files grouped by UI area.",
        "",
        "Groups:",
    ]
    for group, names in groups.items():
        lines.append(f"- `{group}`: {len(names)} sprites")

    lines.extend(
        [
            "",
            "Note: the source image is a flattened gameplay mockup, so panel interiors and text are cropped as rendered.",
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
    atlas.save(OUT_DIR / ATLAS_NAME)
    write_metadata(source, atlas, frames)
    write_preview(atlas, frames)
    write_readme()

    print(f"Wrote {len(SPRITES)} sprites to {OUT_DIR}")
    print(f"Wrote atlas: {OUT_DIR / ATLAS_NAME}")
    print(f"Wrote metadata: {OUT_DIR / ATLAS_JSON_NAME}")


if __name__ == "__main__":
    main()
