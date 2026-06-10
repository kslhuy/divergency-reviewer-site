from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "imgs" / "UI" / "settings_menu_sections"
OUT_DIR = ROOT / "imgs" / "UI" / "settings_menu_sprites"
ATLAS_NAME = "Settings_menu_spritesheet.png"
ATLAS_JSON_NAME = "Settings_menu_spritesheet.json"
PREVIEW_NAME = "Settings_menu_spritesheet_preview.png"
PADDING = 4
MAX_ATLAS_WIDTH = 2048

SOURCES = {
    "video": "Settings_section_video.png",
    "audio": "Settings_section_audio.png",
    "controls": "Settings_section_controls.png",
    "gameplay": "Settings_section_gameplay.png",
    "misc": "Settings_section_misc.png",
}

ROW_FILL = (7, 11, 14, 225)
HEADER_FILL = (18, 13, 10, 216)
TAB_NORMAL_FILL = (18, 22, 26, 236)
TAB_ACTIVE_FILL = (37, 22, 9, 246)
KEY_FILL = (31, 27, 20, 235)


@dataclass(frozen=True)
class ClearRect:
    rect: tuple[int, int, int, int]
    fill: tuple[int, int, int, int]


@dataclass(frozen=True)
class SpriteSpec:
    name: str
    group: str
    source: str
    rect: tuple[int, int, int, int]
    alpha_cutoff: int | None = 120
    clear_rects: tuple[ClearRect, ...] = ()
    note: str | None = None


def active_tab_rect(x: int) -> tuple[int, int, int, int]:
    return (x, 237, 196, 72)


def normal_tab_rect(x: int) -> tuple[int, int, int, int]:
    return (x, 250, 170, 45)


SPRITES: tuple[SpriteSpec, ...] = (
    # Complete menu states, cropped to the centered settings overlay.
    SpriteSpec("settings_overlay_video", "page_states", "video", (219, 122, 1179, 780), None),
    SpriteSpec("settings_overlay_audio", "page_states", "audio", (219, 122, 1179, 780), None),
    SpriteSpec("settings_overlay_controls", "page_states", "controls", (219, 122, 1179, 780), None),
    SpriteSpec("settings_overlay_gameplay", "page_states", "gameplay", (219, 122, 1179, 780), None),
    SpriteSpec("settings_overlay_misc", "page_states", "misc", (219, 122, 1179, 780), None),

    # Shared frame and ornaments.
    SpriteSpec("top_frame_bar_with_corners", "frame", "video", (285, 122, 1048, 66)),
    SpriteSpec("top_left_corner_ornament", "frame", "video", (285, 122, 75, 66)),
    SpriteSpec("top_right_corner_ornament", "frame", "video", (1268, 122, 65, 66)),
    SpriteSpec("left_purple_banner_full", "frame", "video", (220, 291, 112, 249)),
    SpriteSpec("right_purple_banner_full", "frame", "video", (1288, 291, 112, 249)),
    SpriteSpec("left_chain_hanger", "frame", "video", (220, 291, 108, 66)),
    SpriteSpec("right_chain_hanger", "frame", "video", (1292, 291, 108, 66)),
    SpriteSpec("bottom_chain_with_gears", "frame", "video", (366, 721, 890, 64)),
    SpriteSpec("bottom_center_gears", "frame", "video", (719, 721, 180, 76)),
    SpriteSpec("bottom_chain", "frame", "video", (366, 753, 890, 31)),

    # Header.
    SpriteSpec("title_settings", "header", "video", (660, 170, 300, 52)),
    SpriteSpec("title_divider_full", "header", "video", (587, 225, 452, 11)),
    SpriteSpec("title_divider_left", "header", "video", (587, 225, 166, 11)),
    SpriteSpec("title_divider_right", "header", "video", (872, 225, 167, 11)),

    # Window controls.
    SpriteSpec("top_right_settings_button", "window_controls", "video", (1454, 18, 66, 58)),
    SpriteSpec("top_right_close_button", "window_controls", "video", (1527, 18, 73, 58)),

    # Tabs, normal and active state for every settings section.
    SpriteSpec("tab_video_normal", "tabs", "audio", normal_tab_rect(360)),
    SpriteSpec("tab_audio_normal", "tabs", "video", normal_tab_rect(540)),
    SpriteSpec("tab_controls_normal", "tabs", "video", normal_tab_rect(720)),
    SpriteSpec("tab_gameplay_normal", "tabs", "video", normal_tab_rect(900)),
    SpriteSpec("tab_misc_normal", "tabs", "video", normal_tab_rect(1080)),
    SpriteSpec("tab_video_active", "tabs", "video", active_tab_rect(346)),
    SpriteSpec("tab_audio_active", "tabs", "audio", active_tab_rect(527)),
    SpriteSpec("tab_controls_active", "tabs", "controls", active_tab_rect(707)),
    SpriteSpec("tab_gameplay_active", "tabs", "gameplay", active_tab_rect(887)),
    SpriteSpec("tab_misc_active", "tabs", "misc", active_tab_rect(1067)),
    SpriteSpec("tab_active_diamond", "tabs", "video", (430, 286, 29, 29)),

    # Blank reusable tab/header/row templates. These are cleaned from rendered crops.
    SpriteSpec(
        "template_tab_normal_blank",
        "templates",
        "video",
        normal_tab_rect(540),
        clear_rects=(ClearRect((28, 9, 116, 27), TAB_NORMAL_FILL),),
        note="Normal tab with label cleared.",
    ),
    SpriteSpec(
        "template_tab_active_blank",
        "templates",
        "video",
        active_tab_rect(346),
        clear_rects=(ClearRect((48, 24, 100, 28), TAB_ACTIVE_FILL),),
        note="Active tab frame and diamond with label cleared.",
    ),
    SpriteSpec(
        "template_section_header_blank",
        "templates",
        "video",
        (361, 337, 423, 40),
        clear_rects=(ClearRect((82, 7, 260, 29), HEADER_FILL),),
        note="Panel section header with title cleared.",
    ),
    SpriteSpec(
        "template_row_choice_blank",
        "templates",
        "video",
        (373, 454, 400, 47),
        clear_rects=(
            ClearRect((11, 9, 178, 29), ROW_FILL),
            ClearRect((202, 8, 166, 30), ROW_FILL),
        ),
        note="Choice row with label/value cleared but arrows kept.",
    ),
    SpriteSpec(
        "template_row_selected_choice_blank",
        "templates",
        "video",
        (362, 382, 418, 70),
        clear_rects=(
            ClearRect((24, 25, 210, 31), ROW_FILL),
            ClearRect((252, 24, 124, 31), ROW_FILL),
        ),
        note="Selected choice row with label/value cleared but arrows kept.",
    ),
    SpriteSpec(
        "template_row_toggle_on_blank",
        "templates",
        "video",
        (373, 634, 400, 47),
        clear_rects=(ClearRect((12, 9, 225, 30), ROW_FILL),),
        note="Toggle row with label cleared and ON switch kept.",
    ),
    SpriteSpec(
        "template_row_toggle_off_blank",
        "templates",
        "gameplay",
        (373, 514, 400, 47),
        clear_rects=(ClearRect((12, 9, 225, 30), ROW_FILL),),
        note="Toggle row with label cleared and OFF switch kept.",
    ),
    SpriteSpec(
        "template_row_slider_yellow_blank",
        "templates",
        "video",
        (373, 701, 400, 47),
        clear_rects=(
            ClearRect((12, 9, 140, 30), ROW_FILL),
            ClearRect((350, 10, 38, 27), ROW_FILL),
        ),
        note="Yellow slider row with label/value cleared.",
    ),
    SpriteSpec(
        "template_row_slider_cyan_blank",
        "templates",
        "video",
        (847, 634, 400, 55),
        clear_rects=(
            ClearRect((12, 10, 145, 31), ROW_FILL),
            ClearRect((350, 10, 38, 30), ROW_FILL),
        ),
        note="Cyan slider row with label/value cleared.",
    ),
    SpriteSpec(
        "template_keycap_small_blank",
        "templates",
        "controls",
        (711, 462, 39, 36),
        clear_rects=(ClearRect((6, 5, 28, 25), KEY_FILL),),
        note="Small keycap with glyph cleared.",
    ),
    SpriteSpec(
        "template_keycap_wide_blank",
        "templates",
        "controls",
        (673, 581, 76, 36),
        clear_rects=(ClearRect((5, 5, 66, 25), KEY_FILL),),
        note="Wide keycap with glyph cleared.",
    ),

    # Rendered section panels.
    SpriteSpec("panel_video_display", "panels", "video", (350, 326, 444, 422)),
    SpriteSpec("panel_video_render", "panels", "video", (824, 326, 444, 422)),
    SpriteSpec("panel_audio_volume", "panels", "audio", (350, 326, 444, 422)),
    SpriteSpec("panel_audio_output", "panels", "audio", (824, 326, 444, 422)),
    SpriteSpec("panel_controls_keyboard", "panels", "controls", (350, 326, 444, 422)),
    SpriteSpec("panel_controls_gamepad", "panels", "controls", (824, 326, 444, 422)),
    SpriteSpec("panel_gameplay_combat", "panels", "gameplay", (350, 326, 444, 422)),
    SpriteSpec("panel_gameplay_assist", "panels", "gameplay", (824, 326, 444, 422)),
    SpriteSpec("panel_misc_system", "panels", "misc", (350, 326, 444, 422)),
    SpriteSpec("panel_misc_data", "panels", "misc", (824, 326, 444, 422)),

    # Rendered section headers.
    SpriteSpec("header_display", "section_headers", "video", (361, 337, 423, 40)),
    SpriteSpec("header_render", "section_headers", "video", (835, 337, 423, 40)),
    SpriteSpec("header_volume", "section_headers", "audio", (361, 337, 423, 40)),
    SpriteSpec("header_output", "section_headers", "audio", (835, 337, 423, 40)),
    SpriteSpec("header_keyboard", "section_headers", "controls", (361, 337, 423, 40)),
    SpriteSpec("header_gamepad", "section_headers", "controls", (835, 337, 423, 40)),
    SpriteSpec("header_combat", "section_headers", "gameplay", (361, 337, 423, 40)),
    SpriteSpec("header_assist", "section_headers", "gameplay", (835, 337, 423, 40)),
    SpriteSpec("header_system", "section_headers", "misc", (361, 337, 423, 40)),
    SpriteSpec("header_data", "section_headers", "misc", (835, 337, 423, 40)),

    # Standalone controls.
    SpriteSpec("toggle_on", "controls", "video", (678, 644, 70, 29)),
    SpriteSpec("toggle_off", "controls", "gameplay", (678, 524, 70, 29)),
    SpriteSpec("choice_arrow_left", "controls", "video", (600, 406, 19, 22)),
    SpriteSpec("choice_arrow_right", "controls", "video", (745, 406, 19, 22)),
    SpriteSpec("slider_master_lime_82", "controls", "audio", (525, 410, 207, 28)),
    SpriteSpec("slider_music_purple_64", "controls", "audio", (525, 472, 207, 28)),
    SpriteSpec("slider_sfx_orange_76", "controls", "audio", (525, 535, 207, 28)),
    SpriteSpec("slider_voice_blue_70", "controls", "audio", (525, 598, 207, 28)),
    SpriteSpec("slider_ambient_cyan_57", "controls", "audio", (525, 660, 207, 28)),
    SpriteSpec("slider_bright_yellow_72", "controls", "video", (525, 713, 207, 28)),
    SpriteSpec("slider_ui_scale_cyan_90", "controls", "video", (997, 653, 187, 28)),
    SpriteSpec("slider_shake_yellow_40", "controls", "gameplay", (525, 653, 207, 28)),
    SpriteSpec("slider_input_buffer_cyan_68", "controls", "gameplay", (525, 715, 207, 28)),

    # Keyboard/gamepad button crops.
    SpriteSpec("key_w", "input_buttons", "controls", (561, 403, 39, 36)),
    SpriteSpec("key_a", "input_buttons", "controls", (611, 403, 39, 36)),
    SpriteSpec("key_s", "input_buttons", "controls", (661, 403, 39, 36)),
    SpriteSpec("key_d", "input_buttons", "controls", (711, 403, 39, 36)),
    SpriteSpec("key_j", "input_buttons", "controls", (711, 462, 39, 36)),
    SpriteSpec("key_k", "input_buttons", "controls", (711, 521, 39, 36)),
    SpriteSpec("key_space", "input_buttons", "controls", (673, 581, 76, 36)),
    SpriteSpec("key_shift", "input_buttons", "controls", (687, 639, 62, 36)),
    SpriteSpec("key_e", "input_buttons", "controls", (711, 698, 39, 36)),
    SpriteSpec("gamepad_dpad", "input_buttons", "controls", (1148, 403, 74, 36)),
    SpriteSpec("gamepad_x", "input_buttons", "controls", (1184, 462, 39, 36)),
    SpriteSpec("gamepad_y", "input_buttons", "controls", (1184, 521, 39, 36)),
    SpriteSpec("gamepad_a", "input_buttons", "controls", (1184, 581, 39, 36)),
    SpriteSpec("gamepad_rb", "input_buttons", "controls", (1175, 639, 50, 36)),
    SpriteSpec("gamepad_start", "input_buttons", "controls", (1161, 698, 64, 36)),

    # Bottom controller prompt strip.
    SpriteSpec("bottom_controls_panel", "bottom_controls", "video", (410, 823, 795, 80)),
    SpriteSpec("bottom_dpad_select", "bottom_controls", "video", (468, 833, 178, 61)),
    SpriteSpec("bottom_b_back", "bottom_controls", "video", (737, 835, 140, 57)),
    SpriteSpec("bottom_a_confirm", "bottom_controls", "video", (939, 835, 185, 57)),
)


def safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in value).strip("._")


def apply_alpha_cutoff(image: Image.Image, cutoff: int | None) -> Image.Image:
    if cutoff is None:
        return image

    r, g, b, alpha = image.split()
    alpha = alpha.point(lambda value: 0 if value <= cutoff else value)
    image = Image.merge("RGBA", (r, g, b, alpha))
    return image


def crop_sprite(sources: dict[str, Image.Image], spec: SpriteSpec) -> Image.Image:
    x, y, w, h = spec.rect
    crop = sources[spec.source].crop((x, y, x + w, y + h))

    if spec.clear_rects:
        draw = ImageDraw.Draw(crop)
        for clear in spec.clear_rects:
            cx, cy, cw, ch = clear.rect
            draw.rectangle((cx, cy, cx + cw - 1, cy + ch - 1), fill=clear.fill)

    return apply_alpha_cutoff(crop, spec.alpha_cutoff)


def write_individual_sprites(sources: dict[str, Image.Image]) -> dict[str, Image.Image]:
    crops: dict[str, Image.Image] = {}

    for spec in SPRITES:
        crop = crop_sprite(sources, spec)
        target_dir = OUT_DIR / safe_name(spec.group)
        target_dir.mkdir(parents=True, exist_ok=True)
        crop.save(target_dir / f"{safe_name(spec.name)}.png", optimize=True)
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
        frame = frames[spec.name]
        atlas.alpha_composite(crops[spec.name], (frame["x"], frame["y"]))

    return atlas, frames


def write_metadata(
    sources: dict[str, Image.Image],
    atlas: Image.Image,
    frames: dict[str, dict[str, int]],
) -> None:
    metadata = {
        "image": ATLAS_NAME,
        "sources": {
            key: {
                "path": f"imgs/UI/settings_menu_sections/{filename}",
                "size": {"w": sources[key].width, "h": sources[key].height},
            }
            for key, filename in SOURCES.items()
        },
        "size": {"w": atlas.width, "h": atlas.height},
        "padding": PADDING,
        "sprite_count": len(SPRITES),
        "packing": "Shelf pack, non-rotated, transparent RGBA atlas",
        "sprites": {},
        "notes": (
            "Cropped from the flattened settings-section PNGs. Component crops use "
            "alpha_cutoff=120 to remove the dimmed game backdrop around standalone UI pieces. "
            "Complete page-state crops keep their original alpha."
        ),
    }

    for spec in SPRITES:
        x, y, w, h = spec.rect
        entry = {
            "group": spec.group,
            "source": spec.source,
            "frame": frames[spec.name],
            "source_rect": {"x": x, "y": y, "w": w, "h": h},
            "rotated": False,
            "trimmed": False,
        }
        if spec.alpha_cutoff is not None:
            entry["alpha_cutoff"] = spec.alpha_cutoff
        if spec.clear_rects:
            entry["clear_regions"] = [
                {
                    "x": clear.rect[0],
                    "y": clear.rect[1],
                    "w": clear.rect[2],
                    "h": clear.rect[3],
                }
                for clear in spec.clear_rects
            ]
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
        if w >= 55 and h >= 20:
            label = spec.name
            label_box = draw.textbbox((0, 0), label, font=font)
            label_w = min(label_box[2] - label_box[0] + 6, w)
            label_h = min(label_box[3] - label_box[1] + 4, h)
            draw.rectangle((x, y, x + label_w, y + label_h), fill=(0, 0, 0, 185))
            draw.text((x + 3, y + 2), label[: max(1, w // 6)], fill=(255, 226, 138, 255), font=font)

    preview.save(OUT_DIR / PREVIEW_NAME, optimize=True)


def write_readme(atlas: Image.Image) -> None:
    groups: dict[str, list[str]] = {}
    for spec in SPRITES:
        groups.setdefault(spec.group, []).append(spec.name)

    lines = [
        "# Settings Menu UI Sprite Pack",
        "",
        "Direct-use UI export cropped from `../settings_menu_sections/`.",
        "",
        "Files:",
        f"- `{ATLAS_NAME}`: packed RGBA spritesheet.",
        f"- `{ATLAS_JSON_NAME}`: atlas metadata with `frame` and original `source_rect` values.",
        f"- `{PREVIEW_NAME}`: atlas QA preview with sprite boxes.",
        "- Group folders contain loose PNGs for direct import into a game project.",
        "",
        "Export settings:",
        f"- Atlas size: `{atlas.width}x{atlas.height}`",
        f"- Padding: `{PADDING}px`",
        f"- Sprite count: `{len(SPRITES)}`",
        "- Component sprites remove source pixels with alpha <= 120 so the dimmed game backdrop does not travel with the UI piece.",
        "- `page_states/` keeps the original alpha and contains the complete cropped menu overlays for each tab.",
        "",
        "Groups:",
    ]
    for group, names in sorted(groups.items()):
        noun = "sprite" if len(names) == 1 else "sprites"
        lines.append(f"- `{group}`: {len(names)} {noun}")

    lines.extend(
        [
            "",
            "Use `frame` for atlas UV slicing. Use `source_rect` when rebuilding from the original 1620x912 source canvases.",
            "",
            "The source images are flattened mockups, so rendered panels/tabs include the text already present in the PNG. The `templates/` group provides cleaned blanks for common rows, tabs, headers, toggles, sliders, and keycaps.",
            "",
            "Regenerate with:",
            "",
            "```powershell",
            "python tools\\export_settings_menu_ui_assets.py",
            "```",
        ]
    )

    (OUT_DIR / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def load_sources() -> dict[str, Image.Image]:
    sources: dict[str, Image.Image] = {}
    for key, filename in SOURCES.items():
        path = SOURCE_DIR / filename
        if not path.exists():
            raise FileNotFoundError(f"Source image not found: {path}")
        sources[key] = Image.open(path).convert("RGBA")
    return sources


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    sources = load_sources()
    crops = write_individual_sprites(sources)
    atlas, frames = pack_sprites(crops)
    atlas.save(OUT_DIR / ATLAS_NAME, optimize=True)
    write_metadata(sources, atlas, frames)
    write_preview(atlas, frames)
    write_readme(atlas)

    print(f"Wrote {len(SPRITES)} sprites to {OUT_DIR}")
    print(f"Wrote atlas: {OUT_DIR / ATLAS_NAME} ({atlas.width}x{atlas.height})")
    print(f"Wrote metadata: {OUT_DIR / ATLAS_JSON_NAME}")


if __name__ == "__main__":
    main()
