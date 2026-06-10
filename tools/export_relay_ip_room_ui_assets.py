from __future__ import annotations

import json
import math
import argparse
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw, ImageFont

sys.dont_write_bytecode = True
import generate_relay_ip_room_ui as relay_ui


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "imgs" / "UI" / "relay_ip_room_sprites"
SPRITES_DIR = OUT_DIR / "sprites"

ATLAS_NAME = "Relay_IP_Room_spritesheet.png"
ATLAS_JSON_NAME = "Relay_IP_Room_spritesheet.json"
PREVIEW_NAME = "Relay_IP_Room_spritesheet_preview.png"
LAYOUT_RELAY_NAME = "Relay_IP_Room_layout_relay_ui_only.png"
LAYOUT_IP_NAME = "Relay_IP_Room_layout_ip_local_ui_only.png"

CANVAS_SIZE = (relay_ui.BASE_W, relay_ui.BASE_H)
EXPORT_SCALE = 1.0
PADDING = 1
MAX_ATLAS_WIDTH = 1024


@dataclass(frozen=True)
class Rect:
    x: int
    y: int
    w: int
    h: int


@dataclass(frozen=True)
class SpriteSpec:
    name: str
    group: str
    image: Image.Image
    source_rect: Rect | None = None
    note: str | None = None


def safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in value).strip("._")


def save_png(image: Image.Image, path: Path) -> None:
    image.save(path, optimize=True, compress_level=9)


def new_canvas(w: int, h: int) -> Image.Image:
    return Image.new("RGBA", (w, h), (0, 0, 0, 0))


def trim_transparent(image: Image.Image) -> tuple[Image.Image, Rect]:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        return new_canvas(1, 1), Rect(0, 0, 1, 1)
    x0, y0, x1, y1 = bbox
    return image.crop(bbox), Rect(x0, y0, x1 - x0, y1 - y0)


def draw_asset(size: tuple[int, int], fn: Callable[[Image.Image, ImageDraw.ImageDraw], None]) -> Image.Image:
    image = new_canvas(*size)
    draw = ImageDraw.Draw(image, "RGBA")
    fn(image, draw)
    return image


def resize_existing(path: Path, size: tuple[int, int]) -> Image.Image:
    return Image.open(path).convert("RGBA").resize(size, Image.Resampling.LANCZOS)


def render_ui_only(mode_key: str) -> Image.Image:
    canvas = new_canvas(*CANVAS_SIZE)
    scale = 1.0
    fonts = relay_ui.load_fonts(scale)
    spec = relay_ui.MODES[mode_key]

    relay_ui.draw_corner_controls(canvas, scale)
    modal = relay_ui.draw_modal(canvas, scale, spec)
    draw = ImageDraw.Draw(canvas, "RGBA")
    relay_ui.draw_title(draw, modal, fonts, spec, scale)
    relay_ui.draw_tabs(draw, modal, fonts, spec, scale)

    x, y, _, _ = modal
    panel_y = y + round(105 * scale)
    left = (x + round(24 * scale), panel_y, round(328 * scale), round(214 * scale))
    right = (x + round(362 * scale), panel_y, round(149 * scale), round(214 * scale))
    relay_ui.draw_left_panel(draw, left, fonts, spec, scale)
    relay_ui.draw_right_panel(draw, right, fonts, spec, scale)
    relay_ui.draw_name_row(draw, modal, fonts, scale)
    relay_ui.draw_footer(canvas, modal, fonts, spec, scale)
    return canvas


def render_modal_frame() -> tuple[Image.Image, Rect]:
    canvas = new_canvas(*CANVAS_SIZE)
    relay_ui.draw_modal(canvas, 1.0, relay_ui.MODES["relay"])
    return trim_transparent(canvas)


def render_header(spec_key: str) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)
    spec = relay_ui.MODES[spec_key]
    return draw_asset(
        (535, 66),
        lambda _image, draw: relay_ui.draw_title(draw, (0, 0, 535, 358), fonts, spec, 1.0),
    )


def render_tab(label: str, active: bool) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)
    height = 32 if active else 27
    return draw_asset(
        (126, height),
        lambda _image, draw: relay_ui.draw_tab(draw, (0, 0, 126, 27), label, active, fonts["tab"], 1.0),
    )


def render_section_panel(title: str, size: tuple[int, int]) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)
    return draw_asset(
        size,
        lambda _image, draw: relay_ui.draw_section_panel(draw, (0, 0, size[0], size[1]), title, fonts, 1.0),
    )


def render_section_header(title: str, width: int) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)

    def draw_header(_image: Image.Image, draw: ImageDraw.ImageDraw) -> None:
        rect = (0, 0, width, 25)
        relay_ui.chamfered_rect(draw, rect, 3, relay_ui.HEADER_FILL, relay_ui.GOLD_DIM)
        if title:
            relay_ui.draw_centered(draw, rect, title, fonts["section"], relay_ui.GOLD_LIGHT, 1)

    return draw_asset((width, 25), draw_header)


def render_room_row(room: tuple[str, str, str, str, str], selected: bool) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)
    return draw_asset(
        (294, 23),
        lambda _image, draw: relay_ui.draw_room_row(draw, (0, 0, 294, 23), room, selected, fonts, 1.0),
    )


def render_button(label: str, selected: bool, size: tuple[int, int]) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)
    return draw_asset(
        size,
        lambda _image, draw: relay_ui.draw_button(draw, (0, 0, size[0], size[1]), label, fonts["button"], selected, 1.0),
    )


def render_setting_row(label: str, value: str) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)
    return draw_asset(
        (125, 21),
        lambda _image, draw: relay_ui.draw_setting_row(draw, (0, 0, 125, 21), label, value, fonts, 1.0),
    )


def render_entry_field(placeholder: str) -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)

    def draw_field(_image: Image.Image, draw: ImageDraw.ImageDraw) -> None:
        relay_ui.chamfered_rect(draw, (0, 0, 115, 21), 3, relay_ui.FIELD_FILL, relay_ui.GOLD_DIM)
        if placeholder:
            relay_ui.draw_text(draw, (7, 5), placeholder, fonts["small"], relay_ui.GOLD_LIGHT, 0)

    return draw_asset((115, 21), draw_field)


def render_name_row() -> Image.Image:
    fonts = relay_ui.load_fonts(1.0)

    def draw_name(_image: Image.Image, draw: ImageDraw.ImageDraw) -> None:
        relay_ui.draw_text(draw, (0, 5), "YOUR NAME:", fonts["body_bold"], relay_ui.GOLD_LIGHT, 0)
        relay_ui.draw_text(draw, (82, 5), "Displayed Name", fonts["body_bold"], relay_ui.CYAN, 0)
        relay_ui.chamfered_rect(draw, (226, 0, 25, 21), 3, (10, 13, 14, 235), relay_ui.GOLD_DIM)
        draw.line((233, 13, 243, 13), fill=relay_ui.CYAN, width=1)
        draw.line((241, 8, 244, 13, 241, 18), fill=relay_ui.CYAN, width=1)

    return draw_asset((251, 21), draw_name)


def render_edit_arrow_button() -> Image.Image:
    def draw_edit(_image: Image.Image, draw: ImageDraw.ImageDraw) -> None:
        relay_ui.chamfered_rect(draw, (0, 0, 25, 21), 3, (10, 13, 14, 235), relay_ui.GOLD_DIM)
        draw.line((7, 13, 17, 13), fill=relay_ui.CYAN, width=1)
        draw.line((15, 8, 18, 13, 15, 18), fill=relay_ui.CYAN, width=1)

    return draw_asset((25, 21), draw_edit)


def add_asset(
    specs: list[SpriteSpec],
    name: str,
    group: str,
    image: Image.Image,
    source_rect: Rect | None = None,
    note: str | None = None,
) -> None:
    specs.append(SpriteSpec(name=name, group=group, image=image, source_rect=source_rect, note=note))


def build_specs() -> list[SpriteSpec]:
    specs: list[SpriteSpec] = []
    modal_image, modal_rect = render_modal_frame()
    add_asset(
        specs,
        "modal_frame_with_shadow",
        "frame",
        modal_image,
        modal_rect,
        "Transparent centered modal backplate, trimmed from the 805x456 UI canvas.",
    )

    add_asset(specs, "header_relay_subtitle", "header", render_header("relay"), Rect(135, 52, 535, 66))
    add_asset(specs, "header_ip_local_subtitle", "header", render_header("ip"), Rect(135, 52, 535, 66))

    add_asset(specs, "tab_relay_active", "tabs", render_tab("RELAY", True), Rect(271, 121, 126, 32))
    add_asset(specs, "tab_relay_normal", "tabs", render_tab("RELAY", False), Rect(271, 121, 126, 27))
    add_asset(specs, "tab_ip_local_active", "tabs", render_tab("IP LOCAL", True), Rect(407, 121, 126, 32))
    add_asset(specs, "tab_ip_local_normal", "tabs", render_tab("IP LOCAL", False), Rect(407, 121, 126, 27))
    add_asset(specs, "template_tab_active_blank", "templates", render_tab("", True), None, "Active tab frame with text cleared.")
    add_asset(specs, "template_tab_normal_blank", "templates", render_tab("", False), None, "Normal tab frame with text cleared.")

    add_asset(specs, "panel_left_blank", "panels", render_section_panel("", (328, 214)), Rect(159, 157, 328, 214))
    add_asset(specs, "panel_right_blank", "panels", render_section_panel("", (149, 214)), Rect(497, 157, 149, 214))

    for title, width, x in (
        ("LOBBY LIST", 312, 167),
        ("LAN ROOMS", 312, 167),
        ("CREATE LOBBY", 133, 505),
        ("HOST LOCAL", 133, 505),
    ):
        add_asset(
            specs,
            f"section_header_{safe_name(title).lower()}",
            "section_headers",
            render_section_header(title, width),
            Rect(x, 165, width, 25),
        )
    add_asset(specs, "template_section_header_left_blank", "templates", render_section_header("", 312))
    add_asset(specs, "template_section_header_right_blank", "templates", render_section_header("", 133))

    row_y = 203
    for mode_key, prefix in (("relay", "relay"), ("ip", "ip_local")):
        for index, room in enumerate(relay_ui.MODES[mode_key].rooms):
            row_name = safe_name(room[0].lower())
            add_asset(
                specs,
                f"{prefix}_room_row_{index + 1}_{row_name}",
                "room_rows",
                render_room_row(room, index == 0),
                Rect(176, row_y + index * 25, 294, 23),
            )

    blank_room = ("", "", "", "", "")
    add_asset(specs, "template_room_row_selected_blank", "templates", render_room_row(blank_room, True))
    add_asset(specs, "template_room_row_normal_blank", "templates", render_room_row(blank_room, False))

    buttons = (
        ("button_refresh", "REFRESH", False, (88, 21), Rect(176, 338, 88, 21)),
        ("button_join_selected", "JOIN SELECTED", True, (122, 21), Rect(348, 338, 122, 21)),
        ("button_host_room", "HOST ROOM", True, (115, 21), Rect(514, 272, 115, 21)),
        ("button_join", "JOIN", True, (115, 20), Rect(514, 339, 115, 20)),
        ("button_connect", "CONNECT", True, (115, 20), Rect(514, 339, 115, 20)),
    )
    for name, label, selected, size, rect in buttons:
        add_asset(specs, name, "buttons", render_button(label, selected, size), rect)
    add_asset(specs, "template_button_selected_blank_115x21", "templates", render_button("", True, (115, 21)))
    add_asset(specs, "template_button_normal_blank_88x21", "templates", render_button("", False, (88, 21)))

    setting_rows = (
        ("setting_route_relay", "ROUTE", "RELAY", Rect(509, 199, 125, 21)),
        ("setting_region_auto", "REGION", "AUTO", Rect(509, 223, 125, 21)),
        ("setting_slots_1_4", "SLOTS", "1-4", Rect(509, 247, 125, 21)),
        ("setting_route_ip_local", "ROUTE", "IP LOCAL", Rect(509, 199, 125, 21)),
        ("setting_host_ip_auto", "HOST IP", "AUTO", Rect(509, 223, 125, 21)),
        ("setting_port_7777", "PORT", "7777", Rect(509, 247, 125, 21)),
    )
    for name, label, value, rect in setting_rows:
        add_asset(specs, name, "setting_rows", render_setting_row(label, value), rect)
    add_asset(specs, "template_setting_row_blank", "templates", render_setting_row("", ""))

    add_asset(specs, "field_room_code_placeholder", "fields", render_entry_field("ENTER RELAY CODE..."), Rect(514, 314, 115, 21))
    add_asset(specs, "field_host_ip_placeholder", "fields", render_entry_field("ENTER HOST IP..."), Rect(514, 314, 115, 21))
    add_asset(specs, "template_entry_field_blank", "templates", render_entry_field(""))

    add_asset(specs, "name_row_displayed_name", "name_row", render_name_row(), Rect(177, 376, 251, 21))
    add_asset(specs, "edit_arrow_button", "name_row", render_edit_arrow_button(), Rect(403, 376, 25, 21))

    settings_sprites = relay_ui.SETTINGS_SPRITES
    add_asset(
        specs,
        "top_right_settings_button",
        "window_controls",
        resize_existing(settings_sprites / "window_controls" / "top_right_settings_button.png", (32, 29)),
        Rect(728, 18, 32, 29),
    )
    add_asset(
        specs,
        "top_right_close_button",
        "window_controls",
        resize_existing(settings_sprites / "window_controls" / "top_right_close_button.png", (36, 29)),
        Rect(765, 18, 36, 29),
    )
    add_asset(
        specs,
        "top_left_corner_ornament",
        "frame",
        resize_existing(settings_sprites / "frame" / "top_left_corner_ornament.png", (42, 37)),
        Rect(127, 50, 42, 37),
    )
    add_asset(
        specs,
        "top_right_corner_ornament",
        "frame",
        resize_existing(settings_sprites / "frame" / "top_right_corner_ornament.png", (39, 37)),
        Rect(636, 50, 39, 37),
    )
    add_asset(
        specs,
        "left_purple_banner",
        "frame",
        resize_existing(settings_sprites / "frame" / "left_purple_banner_full.png", (38, 88)),
        Rect(98, 162, 38, 88),
    )
    add_asset(
        specs,
        "right_purple_banner",
        "frame",
        resize_existing(settings_sprites / "frame" / "right_purple_banner_full.png", (38, 88)),
        Rect(669, 162, 38, 88),
    )
    add_asset(
        specs,
        "footer_prompt_panel",
        "footer",
        resize_existing(settings_sprites / "bottom_controls" / "bottom_controls_panel.png", (372, 38)),
        Rect(216, 415, 372, 38),
    )

    return specs


def write_individual_sprites(specs: list[SpriteSpec]) -> dict[str, Image.Image]:
    crops: dict[str, Image.Image] = {}
    for spec in specs:
        target_dir = SPRITES_DIR / safe_name(spec.group)
        target_dir.mkdir(parents=True, exist_ok=True)
        target = target_dir / f"{safe_name(spec.name)}.png"
        save_png(spec.image, target)
        crops[spec.name] = spec.image
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
        splits.append(Rect(used.x + used.w, free.y, free.x + free.w - (used.x + used.w), free.h))
    if used.y > free.y:
        splits.append(Rect(free.x, free.y, free.w, used.y - free.y))
    if used.y + used.h < free.y + free.h:
        splits.append(Rect(free.x, used.y + used.h, free.w, free.y + free.h - (used.y + used.h)))
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

        best_rect: Rect | None = None
        best_score = (math.inf, math.inf, math.inf)
        for free in free_rects:
            if pack_w > free.w or pack_h > free.h:
                continue
            leftover_w = free.w - pack_w
            leftover_h = free.h - pack_h
            score = (min(leftover_w, leftover_h), max(leftover_w, leftover_h), free.y)
            if score < best_score:
                best_score = score
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


def pack_sprites(specs: list[SpriteSpec], crops: dict[str, Image.Image]) -> tuple[Image.Image, dict[str, dict[str, int]]]:
    sizes = {name: crop.size for name, crop in crops.items()}
    ordered_specs = sorted(
        specs,
        key=lambda spec: (
            -(sizes[spec.name][0] * sizes[spec.name][1]),
            -max(sizes[spec.name]),
            spec.group,
            spec.name,
        ),
    )

    min_width = max(width + PADDING for width, _ in sizes.values())
    widths = set(range(max(4, int(math.floor(min_width / 4) * 4)), MAX_ATLAS_WIDTH + 1, 4))
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
        raise RuntimeError("Could not pack Relay/IP room sprites.")

    _, atlas_w, atlas_h, frames = best
    atlas = new_canvas(atlas_w, atlas_h)
    for name, crop in crops.items():
        frame = frames[name]
        atlas.alpha_composite(crop, (frame["x"], frame["y"]))
    return atlas, frames


def write_metadata(specs: list[SpriteSpec], atlas: Image.Image, frames: dict[str, dict[str, int]]) -> None:
    metadata = {
        "image": ATLAS_NAME,
        "source": "tools/generate_relay_ip_room_ui.py",
        "native_canvas_size": {"w": CANVAS_SIZE[0], "h": CANVAS_SIZE[1]},
        "export_scale": EXPORT_SCALE,
        "size": {"w": atlas.width, "h": atlas.height},
        "padding": PADDING,
        "sprite_count": len(specs),
        "packing": "MaxRects best-short-side-fit, non-rotated, exact non-power-of-two transparent RGBA atlas",
        "sprites": {},
        "notes": (
            "Transparent 1x UI sprites generated from the Relay/IP room drawing code. "
            "Use frame for atlas UV slicing. source_rect is the recommended position on an 805x456 Unity UI canvas when present."
        ),
    }

    for spec in specs:
        entry: dict[str, object] = {
            "group": spec.group,
            "frame": frames[spec.name],
            "rotated": False,
            "trimmed": False,
            "size": {"w": spec.image.width, "h": spec.image.height},
        }
        if spec.source_rect is not None:
            entry["source_rect"] = {
                "x": spec.source_rect.x,
                "y": spec.source_rect.y,
                "w": spec.source_rect.w,
                "h": spec.source_rect.h,
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


def write_preview(specs: list[SpriteSpec], atlas: Image.Image, frames: dict[str, dict[str, int]]) -> None:
    preview = draw_checkerboard(atlas.size)
    preview.alpha_composite(atlas)
    draw = ImageDraw.Draw(preview)
    font = ImageFont.load_default()

    for spec in specs:
        frame = frames[spec.name]
        x, y, w, h = frame["x"], frame["y"], frame["w"], frame["h"]
        draw.rectangle((x, y, x + w - 1, y + h - 1), outline=(245, 185, 67, 255), width=1)
        if w >= 48 and h >= 18:
            label = spec.name
            label_box = draw.textbbox((0, 0), label, font=font)
            label_w = min(label_box[2] - label_box[0] + 6, w)
            label_h = min(label_box[3] - label_box[1] + 4, h)
            draw.rectangle((x, y, x + label_w, y + label_h), fill=(0, 0, 0, 185))
            draw.text((x + 3, y + 2), label[: max(1, w // 6)], fill=(255, 226, 138, 255), font=font)

    save_png(preview, OUT_DIR / PREVIEW_NAME)


def write_readme(specs: list[SpriteSpec], atlas: Image.Image, include_previews: bool) -> None:
    groups: dict[str, list[str]] = {}
    for spec in specs:
        groups.setdefault(spec.group, []).append(spec.name)

    lines = [
        "# Relay / IP Story Room UI Sprite Pack",
        "",
        "Unity-ready transparent UI export generated from `tools/generate_relay_ip_room_ui.py`.",
        "",
        "Files:",
        f"- `{ATLAS_NAME}`: compact transparent RGBA spritesheet.",
        f"- `{ATLAS_JSON_NAME}`: atlas metadata with `frame` values and 805x456 `source_rect` placement hints.",
        "- `sprites/`: standalone PNG files grouped by UI area.",
    ]
    if include_previews:
        lines.extend(
            [
                f"- `{PREVIEW_NAME}`: atlas QA preview with sprite boxes.",
                f"- `{LAYOUT_RELAY_NAME}`: Relay state UI-only layout preview.",
                f"- `{LAYOUT_IP_NAME}`: IP Local state UI-only layout preview.",
            ]
        )

    lines.extend(
        [
            "",
        "Export settings:",
        f"- Native UI canvas: `{CANVAS_SIZE[0]}x{CANVAS_SIZE[1]}`",
        f"- Atlas size: `{atlas.width}x{atlas.height}`",
        f"- Padding: `{PADDING}px`",
        f"- Sprite count: `{len(specs)}`",
        "- Large 1620x912 screenshots are intentionally not duplicated in this folder.",
            "- QA preview PNGs are skipped by default to keep the Unity import folder small.",
        "",
        "Groups:",
        ]
    )
    for group, names in sorted(groups.items()):
        noun = "sprite" if len(names) == 1 else "sprites"
        lines.append(f"- `{group}`: {len(names)} {noun}")

    lines.extend(
        [
            "",
            "Unity import:",
            "- Loose PNGs: set Texture Type to `Sprite (2D and UI)`.",
            "- Atlas: set Sprite Mode to `Multiple`, then slice with the JSON `frame` rectangles.",
            "- `source_rect` values place sprites on an 805x456 reference canvas.",
            "",
            "Regenerate with:",
            "",
            "```powershell",
            "python tools\\export_relay_ip_room_ui_assets.py",
            "```",
            "",
            "Optional QA previews:",
            "",
            "```powershell",
            "python tools\\export_relay_ip_room_ui_assets.py --with-previews",
            "```",
        ]
    )

    (OUT_DIR / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Export compact Relay/IP story room UI sprites for Unity.")
    parser.add_argument(
        "--with-previews",
        action="store_true",
        help="Also write atlas and layout QA preview PNGs. Omitted by default to keep the asset folder small.",
    )
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    specs = build_specs()
    crops = write_individual_sprites(specs)
    atlas, frames = pack_sprites(specs, crops)
    save_png(atlas, OUT_DIR / ATLAS_NAME)
    write_metadata(specs, atlas, frames)
    if args.with_previews:
        write_preview(specs, atlas, frames)
        save_png(render_ui_only("relay"), OUT_DIR / LAYOUT_RELAY_NAME)
        save_png(render_ui_only("ip"), OUT_DIR / LAYOUT_IP_NAME)
    write_readme(specs, atlas, args.with_previews)

    print(f"Wrote {len(specs)} sprites to {OUT_DIR}")
    print(f"Wrote atlas: {OUT_DIR / ATLAS_NAME} ({atlas.width}x{atlas.height})")
    print(f"Wrote metadata: {OUT_DIR / ATLAS_JSON_NAME}")


if __name__ == "__main__":
    main()
