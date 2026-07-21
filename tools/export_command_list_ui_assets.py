from __future__ import annotations

import json
import math
import shutil
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "imgs" / "UI" / "Command_list_generated.png"
OUT_DIR = ROOT / "imgs" / "UI" / "command_list_sprites"
SPRITES_DIR = OUT_DIR / "sprites"
ATLAS_NAME = "Command_list_spritesheet.png"
ATLAS_JSON_NAME = "Command_list_spritesheet.json"
PREVIEW_NAME = "Command_list_spritesheet_preview.png"
PADDING = 4
MAX_ATLAS_WIDTH = 2048


@dataclass(frozen=True)
class SpriteSpec:
    name: str
    group: str
    rect: tuple[int, int, int, int]
    mask: str | None = None
    process: str | None = None
    note: str | None = None


@dataclass(frozen=True)
class Rect:
    x: int
    y: int
    w: int
    h: int


SPRITES: tuple[SpriteSpec, ...] = (
    SpriteSpec("menu_top_frame_bar", "frame", (192, 38, 1238, 37)),
    SpriteSpec("menu_top_left_corner_ornament", "frame", (192, 38, 71, 65)),
    SpriteSpec("menu_top_right_corner_ornament", "frame", (1357, 38, 72, 65)),
    SpriteSpec("menu_left_chain_hanger", "frame", (150, 95, 58, 221)),
    SpriteSpec("menu_left_purple_banner_full", "frame", (149, 298, 61, 217)),
    SpriteSpec("menu_right_chain_hanger", "frame", (1405, 95, 59, 221)),
    SpriteSpec("menu_right_purple_banner_full", "frame", (1404, 298, 61, 217)),
    SpriteSpec("menu_bottom_chain", "frame", (237, 782, 1110, 44)),
    SpriteSpec("menu_bottom_center_gears", "frame", (720, 777, 181, 62)),
    SpriteSpec("menu_bottom_controls_panel_blank", "frame", (357, 851, 906, 78), process="blank_bottom_controls"),
    SpriteSpec("portrait_panel_blank", "header", (239, 75, 120, 120), process="blank_portrait_panel"),
    SpriteSpec("portrait_deep", "characters", (251, 84, 96, 95)),
    SpriteSpec("player_status_chevrons", "header", (384, 124, 59, 25)),
    SpriteSpec("title_command_list", "header", (620, 75, 388, 50)),
    SpriteSpec("title_divider_full", "header", (576, 132, 473, 17)),
    SpriteSpec("title_divider_left", "header", (576, 132, 225, 14)),
    SpriteSpec("title_divider_right", "header", (825, 132, 225, 14)),
    SpriteSpec("title_divider_gem", "header", (797, 122, 35, 31)),
    SpriteSpec("tab_special_moves_active", "tabs", (382, 177, 278, 53)),
    SpriteSpec("tab_normal_moves", "tabs", (672, 177, 281, 53)),
    SpriteSpec("tab_common_moves", "tabs", (964, 177, 281, 53)),
    SpriteSpec("tab_active_diamond", "tabs", (508, 214, 31, 25)),
    SpriteSpec("command_list_panel_full", "command_list", (255, 252, 595, 533), process="blank_command_panel"),
    SpriteSpec("command_row_selected_blank", "command_list", (255, 253, 594, 111), process="blank_selected_row"),
    SpriteSpec("command_row_normal_blank", "command_list", (256, 383, 594, 108), process="blank_normal_row"),
    SpriteSpec("command_row_empty_area", "command_list", (256, 619, 594, 165)),
    SpriteSpec("command_scroll_markers", "command_list", (856, 381, 18, 145)),
    SpriteSpec("detail_panel_full", "details", (891, 248, 465, 511), process="blank_detail_panel"),
    SpriteSpec("move_preview_window", "details", (900, 248, 455, 306), process="blank_preview_window"),
    SpriteSpec("move_preview_viewport_background", "details", (927, 270, 378, 270), process="blank_preview_viewport"),
    SpriteSpec(
        "move_preview_character_deep_layer",
        "characters",
        (900, 248, 455, 306),
        process="preview_character_layer",
        note="Same canvas size as move_preview_window so it can be overlaid or replaced per character.",
    ),
    SpriteSpec("detail_text_panel_blank", "details", (902, 558, 444, 193), process="blank_detail_text_panel"),
    SpriteSpec("detail_row_blank", "details", (922, 599, 407, 35), process="blank_detail_row"),
    SpriteSpec("input_keycap_blank", "inputs", (778, 273, 42, 37), process="blank_keycap"),
    SpriteSpec("input_icon_circle_blank", "inputs", (288, 314, 35, 36), "ellipse", process="blank_input_circle"),
    SpriteSpec("bottom_icon_b", "bottom_controls", (573, 861, 43, 44), "ellipse"),
    SpriteSpec("bottom_icon_r", "bottom_controls", (817, 861, 44, 44), "ellipse"),
)


def safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in value).strip("._")


def antialiased_ellipse_mask(size: tuple[int, int], inset: int = 0) -> Image.Image:
    scale = 4
    large = Image.new("L", (size[0] * scale, size[1] * scale), 0)
    draw = ImageDraw.Draw(large)
    draw.ellipse(
        (
            inset * scale,
            inset * scale,
            (size[0] - inset) * scale - 1,
            (size[1] - inset) * scale - 1,
        ),
        fill=255,
    )
    return large.resize(size, Image.Resampling.LANCZOS)


def crop_rect(source: Image.Image, rect: tuple[int, int, int, int]) -> Image.Image:
    x, y, w, h = rect
    return source.crop((x, y, x + w, y + h)).convert("RGBA")


def tiled_source(source: Image.Image, rect: tuple[int, int, int, int], size: tuple[int, int]) -> Image.Image:
    texture = crop_rect(source, rect)
    output = Image.new("RGBA", size, (0, 0, 0, 0))
    for y in range(0, size[1], texture.height):
        for x in range(0, size[0], texture.width):
            output.alpha_composite(texture, (x, y))
    return output.crop((0, 0, size[0], size[1]))


def fill_with_texture(
    source: Image.Image,
    crop: Image.Image,
    rect: tuple[int, int, int, int],
    texture_rect: tuple[int, int, int, int],
) -> None:
    x, y, w, h = rect
    crop.paste(tiled_source(source, texture_rect, (w, h)), (x, y))


COMMAND_PANEL_TEXTURE = (310, 650, 360, 95)
DETAIL_PANEL_TEXTURE = COMMAND_PANEL_TEXTURE
KEY_FILL = (31, 27, 20, 255)
INPUT_FILL = (22, 23, 22, 255)


def blank_selected_row(source: Image.Image, crop: Image.Image) -> Image.Image:
    for rect in (
        (24, 18, 360, 37),
        (24, 54, 405, 43),
        (510, 16, 66, 48),
    ):
        fill_with_texture(source, crop, rect, COMMAND_PANEL_TEXTURE)
    return crop


def blank_normal_row(source: Image.Image, crop: Image.Image) -> Image.Image:
    for rect in (
        (24, 17, 360, 37),
        (24, 53, 250, 43),
        (510, 15, 66, 48),
    ):
        fill_with_texture(source, crop, rect, COMMAND_PANEL_TEXTURE)
    return crop


def blank_command_panel(source: Image.Image, crop: Image.Image) -> Image.Image:
    selected_rects = ((24, 19, 360, 37), (24, 55, 405, 43), (510, 17, 66, 48))
    normal_rects = ((24, 17, 390, 37), (24, 53, 390, 43), (510, 15, 66, 48))

    for x, y, w, h in selected_rects:
        fill_with_texture(source, crop, (x, y + 1, w, h), COMMAND_PANEL_TEXTURE)
    for row_y in (131, 257):
        for x, y, w, h in normal_rects:
            fill_with_texture(source, crop, (x, y + row_y, w, h), COMMAND_PANEL_TEXTURE)
    return crop


def blank_detail_text_panel(source: Image.Image, crop: Image.Image) -> Image.Image:
    return generated_detail_text_panel(crop.size)


def blank_detail_row(source: Image.Image, crop: Image.Image) -> Image.Image:
    row = generated_detail_text_panel(crop.size)
    draw = ImageDraw.Draw(row, "RGBA")
    draw.line((0, crop.height - 2, crop.width, crop.height - 2), fill=(67, 73, 68, 130), width=1)
    return row


def blank_keycap(_: Image.Image, crop: Image.Image) -> Image.Image:
    draw = ImageDraw.Draw(crop)
    draw.rectangle((7, 6, crop.width - 8, crop.height - 8), fill=KEY_FILL)
    return crop


def blank_input_circle(_: Image.Image, crop: Image.Image) -> Image.Image:
    draw = ImageDraw.Draw(crop)
    draw.ellipse((8, 7, crop.width - 9, crop.height - 8), fill=INPUT_FILL)
    return crop


def blank_bottom_controls(source: Image.Image, crop: Image.Image) -> Image.Image:
    for rect in (
        (170, 8, 240, 50),
        (445, 8, 395, 50),
    ):
        fill_with_texture(source, crop, rect, COMMAND_PANEL_TEXTURE)
    return crop


def blank_portrait_panel(source: Image.Image, crop: Image.Image) -> Image.Image:
    fill_with_texture(source, crop, (12, 10, 97, 102), COMMAND_PANEL_TEXTURE)
    return crop


def generated_preview_viewport(size: tuple[int, int]) -> Image.Image:
    width, height = size
    image = Image.new("RGBA", size, (8, 13, 15, 255))
    draw = ImageDraw.Draw(image, "RGBA")
    wall_height = int(height * 0.72)

    for y in range(height):
        if y < wall_height:
            shade = 13 + min(10, y // 28)
            color = (shade, shade + 8, shade + 10, 255)
        else:
            shade = 14 + min(8, (y - wall_height) // 16)
            color = (shade, shade + 6, shade + 6, 255)
        draw.line((0, y, width, y), fill=color)

    brick_h = 18
    brick_w = 42
    for row, y in enumerate(range(8, wall_height - 4, brick_h)):
        offset = -brick_w // 2 if row % 2 else 0
        draw.line((0, y, width, y), fill=(36, 47, 48, 105))
        for x in range(offset, width, brick_w):
            draw.line((x, y, x, min(y + brick_h, wall_height)), fill=(28, 38, 39, 80))
            draw.rectangle((x + 2, y + 2, x + brick_w - 4, y + brick_h - 4), outline=(5, 8, 9, 38))

    center = (width // 2, int(wall_height * 0.55))
    for radius, alpha in ((90, 46), (66, 58), (42, 48)):
        draw.ellipse(
            (
                center[0] - radius,
                center[1] - radius,
                center[0] + radius,
                center[1] + radius,
            ),
            outline=(94, 78, 54, alpha),
            width=2,
        )
    draw.line((center[0] - 92, center[1], center[0] + 92, center[1]), fill=(79, 69, 51, 38), width=1)
    draw.line((center[0], center[1] - 92, center[0], center[1] + 92), fill=(79, 69, 51, 38), width=1)

    floor_y = wall_height + 14
    draw.line((0, wall_height, width, wall_height), fill=(42, 47, 43, 180), width=2)
    for y in range(wall_height + 18, height, 23):
        draw.line((0, y, width, y), fill=(37, 41, 38, 110))
    for x in range(-20, width, 48):
        draw.line((x, wall_height, x - 34, height), fill=(22, 28, 27, 92))

    for rx, ry, alpha in ((142, 34, 100), (98, 23, 82), (62, 14, 68)):
        draw.ellipse(
            (
                center[0] - rx,
                floor_y - ry,
                center[0] + rx,
                floor_y + ry,
            ),
            outline=(78, 66, 45, alpha),
            width=2,
        )
    return image


def generated_detail_text_panel(size: tuple[int, int]) -> Image.Image:
    width, height = size
    image = Image.new("RGBA", size, (7, 13, 15, 255))
    draw = ImageDraw.Draw(image, "RGBA")

    for y in range(height):
        shade = 8 + min(9, y // 26)
        draw.line((0, y, width, y), fill=(shade, shade + 6, shade + 8, 255))

    for y in range(12, height, 18):
        draw.line((0, y, width, y), fill=(20, 28, 30, 54))

    for y in (38, 72, 110, 145):
        if y < height:
            draw.line((12, y, width - 14, y), fill=(70, 74, 68, 150), width=1)
            draw.line((12, y + 1, width - 14, y + 1), fill=(10, 15, 17, 145), width=1)

    return image


def preview_character_masks(crop: Image.Image) -> tuple["np.ndarray", "np.ndarray"]:
    import cv2
    import numpy as np

    rgb = np.array(crop.convert("RGB"))
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    _, saturation, value = cv2.split(hsv)

    allowed = np.zeros_like(value, dtype="uint8")
    cv2.ellipse(allowed, (224, 54), (70, 26), -26, 0, 360, 255, -1)
    cv2.ellipse(allowed, (248, 139), (82, 90), -18, 0, 360, 255, -1)
    cv2.ellipse(allowed, (207, 198), (70, 34), -14, 0, 360, 255, -1)
    cv2.ellipse(allowed, (270, 248), (50, 70), -10, 0, 360, 255, -1)
    cv2.rectangle(allowed, (168, 34), (286, 98), 255, -1)

    foreground = np.where(
        (((saturation > 28) & (value > 42)) | ((value > 86) & (saturation > 10))),
        255,
        0,
    ).astype("uint8")
    foreground = cv2.bitwise_and(foreground, allowed)
    foreground[:8, :] = 0
    foreground[-8:, :] = 0

    kernel = np.ones((3, 3), np.uint8)
    foreground = cv2.morphologyEx(foreground, cv2.MORPH_OPEN, kernel, iterations=1)
    foreground = cv2.morphologyEx(foreground, cv2.MORPH_CLOSE, kernel, iterations=2)

    components, labels, stats, centroids = cv2.connectedComponentsWithStats(foreground, 8)
    keep = np.zeros_like(foreground)
    useful_boxes = ((148, 0, 150, 110), (162, 55, 188, 200), (224, 190, 110, 116))
    for index in range(1, components):
        area = stats[index, cv2.CC_STAT_AREA]
        x = stats[index, cv2.CC_STAT_LEFT]
        y = stats[index, cv2.CC_STAT_TOP]
        w = stats[index, cv2.CC_STAT_WIDTH]
        h = stats[index, cv2.CC_STAT_HEIGHT]
        if area < 18:
            continue
        intersects = any(
            x < bx + bw and x + w > bx and y < by + bh and y + h > by
            for bx, by, bw, bh in useful_boxes
        )
        if intersects:
            keep[labels == index] = 255

    foreground = cv2.dilate(keep, np.ones((3, 3), np.uint8), iterations=1)
    inpaint_mask = cv2.dilate(foreground, np.ones((7, 7), np.uint8), iterations=2)
    return foreground, inpaint_mask


def blank_preview_window(_: Image.Image, crop: Image.Image) -> Image.Image:
    inner = generated_preview_viewport((378, 290))
    crop.paste(inner, (27, 10))
    return crop


def preview_character_layer(_: Image.Image, crop: Image.Image) -> Image.Image:
    import numpy as np

    foreground, _ = preview_character_masks(crop)
    rgba = np.array(crop)
    rgba[:, :, 3] = np.where(foreground > 0, rgba[:, :, 3], 0).astype("uint8")
    return Image.fromarray(rgba, "RGBA")


def blank_preview_viewport(source: Image.Image, _: Image.Image) -> Image.Image:
    return generated_preview_viewport((378, 270))


def blank_detail_panel(source: Image.Image, crop: Image.Image) -> Image.Image:
    window = blank_preview_window(source, crop_rect(source, (900, 248, 455, 306)))
    text_panel = blank_detail_text_panel(source, crop_rect(source, (902, 558, 444, 193)))
    crop.paste(window, (9, 0))
    crop.paste(text_panel, (11, 310))
    return crop


def process_sprite(source: Image.Image, spec: SpriteSpec, crop: Image.Image) -> Image.Image:
    if spec.process == "blank_command_panel":
        return blank_command_panel(source, crop)
    if spec.process == "blank_selected_row":
        return blank_selected_row(source, crop)
    if spec.process == "blank_normal_row":
        return blank_normal_row(source, crop)
    if spec.process == "blank_detail_panel":
        return blank_detail_panel(source, crop)
    if spec.process == "blank_preview_window":
        return blank_preview_window(source, crop)
    if spec.process == "blank_preview_viewport":
        return blank_preview_viewport(source, crop)
    if spec.process == "preview_character_layer":
        return preview_character_layer(source, crop)
    if spec.process == "blank_detail_text_panel":
        return blank_detail_text_panel(source, crop)
    if spec.process == "blank_detail_row":
        return blank_detail_row(source, crop)
    if spec.process == "blank_keycap":
        return blank_keycap(source, crop)
    if spec.process == "blank_input_circle":
        return blank_input_circle(source, crop)
    if spec.process == "blank_bottom_controls":
        return blank_bottom_controls(source, crop)
    if spec.process == "blank_portrait_panel":
        return blank_portrait_panel(source, crop)
    return crop


def crop_sprite(source: Image.Image, spec: SpriteSpec) -> Image.Image:
    crop = crop_rect(source, spec.rect)
    crop = process_sprite(source, spec, crop)

    if spec.mask == "ellipse":
        crop.putalpha(antialiased_ellipse_mask(crop.size))

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


def rect_contains(outer: Rect, inner: Rect) -> bool:
    return (
        inner.x >= outer.x
        and inner.y >= outer.y
        and inner.x + inner.w <= outer.x + outer.w
        and inner.y + inner.h <= outer.y + outer.h
    )


def split_free_rect(free: Rect, used: Rect) -> list[Rect]:
    if (
        used.x >= free.x + free.w
        or used.x + used.w <= free.x
        or used.y >= free.y + free.h
        or used.y + used.h <= free.y
    ):
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
        raise RuntimeError("Could not pack command-list sprites.")

    _, atlas_w, atlas_h, frames = best
    atlas = Image.new("RGBA", (atlas_w, atlas_h), (0, 0, 0, 0))
    for name, crop in crops.items():
        frame = frames[name]
        atlas.alpha_composite(crop, (frame["x"], frame["y"]))

    return atlas, frames


def build_metadata(source: Image.Image, atlas: Image.Image, frames: dict[str, dict[str, int]]) -> dict:
    metadata = {
        "image": ATLAS_NAME,
        "source": "imgs/UI/Command_list_generated.png",
        "source_size": {"w": source.width, "h": source.height},
        "size": {"w": atlas.width, "h": atlas.height},
        "padding": PADDING,
        "sprite_count": len(SPRITES),
        "packing": "MaxRects best-short-side-fit, non-rotated, exact non-power-of-two transparent RGBA atlas",
        "sprites": {},
        "notes": (
            "Reusable command-list UI crops from the flattened generated source. "
            "Skill-specific row text was cleared into blank templates, and the move preview is split into background and character layers."
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
        if spec.process:
            entry["process"] = spec.process
        if spec.note:
            entry["note"] = spec.note
        metadata["sprites"][spec.name] = entry

    return metadata


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
        if w < 56 or h < 24:
            continue

        label = spec.name
        label_box = draw.textbbox((0, 0), label, font=font)
        label_w = min(label_box[2] - label_box[0] + 6, w)
        label_h = label_box[3] - label_box[1] + 4
        draw.rectangle((x, y, x + label_w, y + label_h), fill=(0, 0, 0, 185))
        draw.text((x + 3, y + 2), label[: max(1, w // 6)], fill=(255, 226, 138, 255), font=font)

    preview.save(OUT_DIR / PREVIEW_NAME)


def write_readme(atlas: Image.Image) -> None:
    groups: dict[str, list[str]] = {}
    for spec in SPRITES:
        groups.setdefault(spec.group, []).append(spec.name)

    lines = [
        "# Command List UI Sprite Pack",
        "",
        "Reusable UI export cropped from `../Command_list_generated.png`.",
        "",
        "Files:",
        f"- `{ATLAS_NAME}`: packed transparent RGBA spritesheet.",
        f"- `{ATLAS_JSON_NAME}`: atlas metadata with `frame` and original `source_rect` values.",
        f"- `{PREVIEW_NAME}`: atlas QA preview with sprite boxes.",
        "- `sprites/`: standalone PNG files grouped by UI area.",
        "",
        f"Atlas size: `{atlas.width}x{atlas.height}`",
        f"Sprite count: `{len(SPRITES)}`",
        "",
        "Groups:",
    ]

    for group, names in groups.items():
        lines.append(f"- `{group}`: {len(names)} sprites")

    lines.extend(
        [
            "",
            "Unity notes:",
            "- Import `Command_list_spritesheet.png` as Texture Type `Sprite (2D and UI)`.",
            "- Set Sprite Mode to `Multiple`, then use the JSON `frame` rectangles for slicing.",
            "- The `source_rect` rectangles map each sprite back to the original 1621x970 mockup.",
            "",
        "Notes:",
        "- Command rows and detail rows are blank templates for runtime text/icons.",
        "- `move_preview_window` is a background/frame layer; `move_preview_character_deep_layer` is the separate character layer.",
        "- The source image is flattened, so the empty preview background is rebuilt from the painted pixels.",
    ]
    )
    (OUT_DIR / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def clean_previous_output() -> None:
    if not SPRITES_DIR.exists():
        return

    target = SPRITES_DIR.resolve()
    output_root = OUT_DIR.resolve()
    if output_root not in target.parents:
        raise RuntimeError(f"Refusing to delete unexpected path: {target}")

    shutil.rmtree(target)


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Source image not found: {SOURCE}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    clean_previous_output()
    source = Image.open(SOURCE).convert("RGBA")
    crops = write_individual_sprites(source)
    atlas, frames = pack_sprites(crops)

    atlas_path = OUT_DIR / ATLAS_NAME
    metadata_path = OUT_DIR / ATLAS_JSON_NAME
    atlas.save(atlas_path)
    metadata = build_metadata(source, atlas, frames)
    metadata_path.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    write_preview(atlas, frames)
    write_readme(atlas)

    shutil.copyfile(atlas_path, ROOT / "imgs" / "UI" / ATLAS_NAME)
    shutil.copyfile(metadata_path, ROOT / "imgs" / "UI" / ATLAS_JSON_NAME)

    print(f"Wrote {len(SPRITES)} sprites to {OUT_DIR}")
    print(f"Wrote atlas: {atlas_path}")
    print(f"Wrote metadata: {metadata_path}")
    print(f"Mirrored atlas and metadata to {ROOT / 'imgs' / 'UI'}")


if __name__ == "__main__":
    main()
