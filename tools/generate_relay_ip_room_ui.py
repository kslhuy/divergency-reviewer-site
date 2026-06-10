from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
UI_DIR = ROOT / "imgs" / "UI"
SETTINGS_SPRITES = UI_DIR / "settings_menu_sprites"
MAIN_MENU_SPRITES = UI_DIR / "main_menu_sprites"

PREVIEW_BG = UI_DIR / "main_menu_illustration_mockup_805x456.png"
FULL_BG = UI_DIR / "main_menu_illustration_mockup.png"

OUTS = {
    "relay": {
        "full": UI_DIR / "Relay_IP_Room_relay_selected.png",
        "preview": UI_DIR / "relay_ip_room_relay_selected_805x456.png",
    },
    "ip": {
        "full": UI_DIR / "Relay_IP_Room_ip_local_selected.png",
        "preview": UI_DIR / "relay_ip_room_ip_local_selected_805x456.png",
    },
}

BASE_W = 805
BASE_H = 456

GOLD = (202, 142, 48, 255)
GOLD_LIGHT = (238, 205, 138, 255)
GOLD_DIM = (123, 84, 41, 255)
BRASS = (100, 65, 36, 255)
BRASS_DARK = (54, 36, 25, 255)
CREAM = (214, 202, 178, 255)
MUTED = (124, 111, 92, 255)
CYAN = (78, 157, 156, 255)
CYAN_DIM = (31, 89, 88, 255)
RED = (191, 41, 45, 255)
PANEL = (3, 7, 9, 255)
PANEL_SOFT = (7, 10, 11, 230)
ROW_FILL = (8, 10, 10, 226)
HEADER_FILL = (23, 15, 10, 238)
FIELD_FILL = (5, 8, 9, 238)


@dataclass(frozen=True)
class ModeSpec:
    active: str
    subtitle: str
    left_title: str
    empty_title: str
    empty_subtitle: str
    right_title: str
    row_1: tuple[str, str]
    row_2: tuple[str, str]
    row_3: tuple[str, str]
    code_label: str
    placeholder: str
    action: str
    footer_hint: str


MODES = {
    "relay": ModeSpec(
        active="RELAY",
        subtitle="JOIN THROUGH RELAY CODE",
        left_title="LOBBY LIST",
        empty_title="NO RELAY ROOMS",
        empty_subtitle="Refresh or enter a room code.",
        right_title="CREATE LOBBY",
        row_1=("ROUTE", "RELAY"),
        row_2=("REGION", "AUTO"),
        row_3=("SLOTS", "1-4"),
        code_label="ROOM CODE",
        placeholder="ENTER RELAY CODE...",
        action="JOIN",
        footer_hint="ENTER CONFIRM   ESC BACK",
    ),
    "ip": ModeSpec(
        active="IP LOCAL",
        subtitle="LAN / DIRECT IP CONNECTION",
        left_title="LAN ROOMS",
        empty_title="NO LOCAL ROOMS",
        empty_subtitle="Host a room or enter an IP.",
        right_title="HOST LOCAL",
        row_1=("ROUTE", "IP LOCAL"),
        row_2=("HOST IP", "AUTO"),
        row_3=("PORT", "7777"),
        code_label="HOST IP",
        placeholder="ENTER HOST IP...",
        action="CONNECT",
        footer_hint="ENTER CONNECT   ESC BACK",
    ),
}


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts") / path,
        Path("C:/Windows/Fonts/georgiab.ttf"),
        Path("C:/Windows/Fonts/timesbd.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def load_fonts(scale: float) -> dict[str, ImageFont.FreeTypeFont]:
    def sz(value: int) -> int:
        return max(7, round(value * scale))

    return {
        "title": font("BOD_B.TTF", sz(29)),
        "section": font("georgiab.ttf", sz(13)),
        "tab": font("georgiab.ttf", sz(11)),
        "body": font("georgia.ttf", sz(10)),
        "body_bold": font("georgiab.ttf", sz(10)),
        "small": font("georgia.ttf", sz(8)),
        "button": font("georgiab.ttf", sz(10)),
        "field": font("georgiai.ttf", sz(11)),
        "footer": font("georgia.ttf", sz(9)),
    }


def bbox(draw: ImageDraw.ImageDraw, text: str, font_obj: ImageFont.ImageFont) -> tuple[int, int, int, int]:
    return draw.textbbox((0, 0), text, font=font_obj)


def draw_centered(
    draw: ImageDraw.ImageDraw,
    rect: tuple[int, int, int, int],
    text: str,
    font_obj: ImageFont.ImageFont,
    fill: tuple[int, int, int, int],
    stroke: int = 1,
    stroke_fill: tuple[int, int, int, int] = (0, 0, 0, 210),
) -> None:
    x, y, w, h = rect
    tx0, ty0, tx1, ty1 = bbox(draw, text, font_obj)
    tw = tx1 - tx0
    th = ty1 - ty0
    draw.text(
        (x + (w - tw) / 2, y + (h - th) / 2 - ty0),
        text,
        font=font_obj,
        fill=fill,
        stroke_width=stroke,
        stroke_fill=stroke_fill,
    )


def draw_text(
    draw: ImageDraw.ImageDraw,
    pos: tuple[int, int],
    text: str,
    font_obj: ImageFont.ImageFont,
    fill: tuple[int, int, int, int],
    stroke: int = 1,
    shadow: bool = True,
) -> None:
    x, y = pos
    if shadow:
        draw.text((x + 1, y + 1), text, font=font_obj, fill=(0, 0, 0, 190))
    draw.text(
        (x, y),
        text,
        font=font_obj,
        fill=fill,
        stroke_width=stroke,
        stroke_fill=(0, 0, 0, 185),
    )


def chamfered_rect(
    draw: ImageDraw.ImageDraw,
    rect: tuple[int, int, int, int],
    chamfer: int,
    fill: tuple[int, int, int, int] | None,
    outline: tuple[int, int, int, int] | None,
    width: int = 1,
) -> None:
    x, y, w, h = rect
    points = [
        (x + chamfer, y),
        (x + w - chamfer, y),
        (x + w, y + chamfer),
        (x + w, y + h - chamfer),
        (x + w - chamfer, y + h),
        (x + chamfer, y + h),
        (x, y + h - chamfer),
        (x, y + chamfer),
    ]
    if fill is not None:
        draw.polygon(points, fill=fill)
    if outline is not None:
        for i in range(width):
            inset = i
            inner = (x + inset, y + inset, w - inset * 2, h - inset * 2)
            ix, iy, iw, ih = inner
            c = max(1, chamfer - inset)
            outline_points = [
                (ix + c, iy),
                (ix + iw - c, iy),
                (ix + iw, iy + c),
                (ix + iw, iy + ih - c),
                (ix + iw - c, iy + ih),
                (ix + c, iy + ih),
                (ix, iy + ih - c),
                (ix, iy + c),
                (ix + c, iy),
            ]
            draw.line(outline_points, fill=outline, width=1)


def paste_asset(
    canvas: Image.Image,
    relative_path: Path,
    box: tuple[int, int, int, int],
    opacity: int = 255,
) -> None:
    path = relative_path
    if not path.exists():
        return
    asset = Image.open(path).convert("RGBA").resize((box[2], box[3]), Image.Resampling.LANCZOS)
    if opacity < 255:
        alpha = asset.getchannel("A").point(lambda p: p * opacity // 255)
        asset.putalpha(alpha)
    canvas.alpha_composite(asset, (box[0], box[1]))


def draw_rivets(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int], radius: int) -> None:
    x, y, w, h = rect
    points = [
        (x + 13, y + 13),
        (x + w - 13, y + 13),
        (x + 13, y + h - 13),
        (x + w - 13, y + h - 13),
    ]
    for px, py in points:
        draw.ellipse((px - radius, py - radius, px + radius, py + radius), fill=(12, 10, 7, 255), outline=GOLD_DIM)
        draw.point((px - 1, py - 1), fill=GOLD_LIGHT)


def draw_modal(canvas: Image.Image, s: float, spec: ModeSpec) -> tuple[int, int, int, int]:
    draw = ImageDraw.Draw(canvas, "RGBA")
    x = round(145 * s)
    y = round(62 * s)
    w = round(515 * s)
    h = round(348 * s)
    c = round(5 * s)

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow, "RGBA")
    chamfered_rect(sd, (x + round(8 * s), y + round(8 * s), w, h), c, (0, 0, 0, 170), None)
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(1, round(6 * s))))
    canvas.alpha_composite(shadow)

    chamfered_rect(draw, (x, y, w, h), c, PANEL, GOLD_DIM, max(1, round(1 * s)))
    chamfered_rect(
        draw,
        (x + round(4 * s), y + round(4 * s), w - round(8 * s), h - round(8 * s)),
        max(2, round(4 * s)),
        None,
        BRASS_DARK,
        max(1, round(1 * s)),
    )
    draw.rectangle((x + round(18 * s), y + round(63 * s), x + w - round(18 * s), y + round(64 * s)), fill=(95, 67, 42, 150))
    draw.rectangle((x + round(18 * s), y + h - round(57 * s), x + w - round(18 * s), y + h - round(56 * s)), fill=(95, 67, 42, 130))

    rail_y = y + round(5 * s)
    draw.line((x + round(82 * s), rail_y, x + w - round(82 * s), rail_y), fill=BRASS, width=max(1, round(1 * s)))
    draw.line((x + round(100 * s), rail_y + round(3 * s), x + w - round(100 * s), rail_y + round(3 * s)), fill=BRASS_DARK, width=max(1, round(1 * s)))
    paste_asset(
        canvas,
        SETTINGS_SPRITES / "frame" / "top_left_corner_ornament.png",
        (x - round(8 * s), y - round(2 * s), round(42 * s), round(37 * s)),
        215,
    )
    paste_asset(
        canvas,
        SETTINGS_SPRITES / "frame" / "top_right_corner_ornament.png",
        (x + w - round(34 * s), y - round(2 * s), round(39 * s), round(37 * s)),
        215,
    )
    paste_asset(
        canvas,
        SETTINGS_SPRITES / "frame" / "left_purple_banner_full.png",
        (x - round(37 * s), y + round(110 * s), round(38 * s), round(88 * s)),
        145,
    )
    paste_asset(
        canvas,
        SETTINGS_SPRITES / "frame" / "right_purple_banner_full.png",
        (x + w - round(1 * s), y + round(110 * s), round(38 * s), round(88 * s)),
        145,
    )

    draw_rivets(draw, (x, y, w, h), max(1, round(2 * s)))

    return x, y, w, h


def draw_title(draw: ImageDraw.ImageDraw, modal: tuple[int, int, int, int], fonts: dict[str, ImageFont.ImageFont], spec: ModeSpec, s: float) -> None:
    x, y, w, _ = modal
    draw_centered(draw, (x, y + round(17 * s), w, round(33 * s)), "STORY ROOM", fonts["title"], CREAM, 1, (22, 13, 8, 230))
    divider_y = y + round(55 * s)
    draw.line((x + round(158 * s), divider_y, x + round(236 * s), divider_y), fill=BRASS, width=max(1, round(1 * s)))
    draw.line((x + w - round(236 * s), divider_y, x + w - round(158 * s), divider_y), fill=BRASS, width=max(1, round(1 * s)))
    draw.polygon(
        [
            (x + w // 2, divider_y - round(4 * s)),
            (x + w // 2 + round(4 * s), divider_y),
            (x + w // 2, divider_y + round(4 * s)),
            (x + w // 2 - round(4 * s), divider_y),
        ],
        fill=(12, 10, 7, 255),
        outline=GOLD_DIM,
    )
    draw_centered(draw, (x, y + round(58 * s), w, round(14 * s)), spec.subtitle, fonts["footer"], MUTED, 0)


def draw_tab(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int], label: str, active: bool, font_obj: ImageFont.ImageFont, s: float) -> None:
    fill = (41, 26, 12, 244) if active else (13, 16, 17, 235)
    outline = GOLD_DIM
    chamfered_rect(draw, rect, max(2, round(4 * s)), fill, outline, max(1, round(1 * s)))
    x, y, w, h = rect
    draw.line((x + round(5 * s), y + round(5 * s), x + w - round(5 * s), y + round(5 * s)), fill=(225, 159, 52, 105) if active else (123, 84, 41, 80))
    draw_centered(draw, rect, label, font_obj, GOLD_LIGHT if active else CREAM, 1)
    if active:
        draw.polygon(
            [
                (x + w // 2, y + h + round(5 * s)),
                (x + w // 2 + round(5 * s), y + h),
                (x + w // 2, y + h - round(5 * s)),
                (x + w // 2 - round(5 * s), y + h),
            ],
            fill=(86, 36, 92, 255),
            outline=GOLD_DIM,
        )


def draw_tabs(draw: ImageDraw.ImageDraw, modal: tuple[int, int, int, int], fonts: dict[str, ImageFont.ImageFont], spec: ModeSpec, s: float) -> None:
    x, y, w, _ = modal
    tab_y = y + round(82 * s)
    tab_w = round(126 * s)
    gap = round(10 * s)
    start = x + (w - tab_w * 2 - gap) // 2
    draw_tab(draw, (start, tab_y, tab_w, round(29 * s)), "RELAY", spec.active == "RELAY", fonts["tab"], s)
    draw_tab(draw, (start + tab_w + gap, tab_y, tab_w, round(29 * s)), "IP LOCAL", spec.active == "IP LOCAL", fonts["tab"], s)


def draw_section_panel(
    draw: ImageDraw.ImageDraw,
    rect: tuple[int, int, int, int],
    title: str,
    fonts: dict[str, ImageFont.ImageFont],
    s: float,
) -> tuple[int, int, int, int]:
    x, y, w, h = rect
    chamfered_rect(draw, rect, max(2, round(4 * s)), (4, 7, 8, 218), GOLD_DIM, max(1, round(1 * s)))
    chamfered_rect(draw, (x + round(5 * s), y + round(5 * s), w - round(10 * s), h - round(10 * s)), max(2, round(3 * s)), None, BRASS_DARK)
    header = (x + round(8 * s), y + round(8 * s), w - round(16 * s), round(25 * s))
    chamfered_rect(draw, header, max(2, round(3 * s)), HEADER_FILL, GOLD_DIM)
    draw_centered(draw, header, title, fonts["section"], GOLD_LIGHT, 1)
    return (x + round(12 * s), y + round(42 * s), w - round(24 * s), h - round(52 * s))


def draw_signal_icon(draw: ImageDraw.ImageDraw, center: tuple[int, int], s: float) -> None:
    cx, cy = center
    r = max(1, round(2 * s))
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=CYAN, outline=(0, 0, 0, 160))
    for radius in (7, 13, 19):
        rr = round(radius * s)
        draw.arc((cx - rr, cy - rr, cx + rr, cy + rr), 220, 320, fill=(CYAN[0], CYAN[1], CYAN[2], 130), width=max(1, round(1 * s)))
    draw.line((cx, cy + round(3 * s), cx, cy + round(14 * s)), fill=GOLD_DIM, width=max(1, round(1 * s)))
    draw.line((cx - round(6 * s), cy + round(14 * s), cx + round(6 * s), cy + round(14 * s)), fill=GOLD_DIM, width=max(1, round(1 * s)))


def draw_left_panel(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int], fonts: dict[str, ImageFont.ImageFont], spec: ModeSpec, s: float) -> None:
    content = draw_section_panel(draw, rect, spec.left_title, fonts, s)
    x, y, w, h = content
    draw.rectangle((x, y, x + w, y + h), fill=(1, 4, 5, 112), outline=(28, 42, 42, 170))
    draw_signal_icon(draw, (x + w // 2, y + round(18 * s)), s)
    draw_centered(draw, (x, y + round(31 * s), w, round(16 * s)), spec.empty_title, fonts["body_bold"], GOLD_LIGHT, 1)
    draw_centered(draw, (x, y + round(47 * s), w, round(13 * s)), spec.empty_subtitle, fonts["small"], MUTED, 0)

    button_y = y + h - round(23 * s)
    draw_button(draw, (x + round(8 * s), button_y, round(92 * s), round(21 * s)), "REFRESH", fonts["button"], False, s)
    draw_button(draw, (x + w - round(100 * s), button_y, round(92 * s), round(21 * s)), "QUICK JOIN", fonts["button"], False, s)


def draw_setting_row(
    draw: ImageDraw.ImageDraw,
    rect: tuple[int, int, int, int],
    label: str,
    value: str,
    fonts: dict[str, ImageFont.ImageFont],
    s: float,
) -> None:
    x, y, w, h = rect
    chamfered_rect(draw, rect, max(2, round(3 * s)), ROW_FILL, BRASS_DARK)
    draw_text(draw, (x + round(8 * s), y + round(5 * s)), label, fonts["small"], CREAM, 0)
    tx0, _, tx1, _ = bbox(draw, value, fonts["body_bold"])
    draw_text(draw, (x + w - (tx1 - tx0) - round(8 * s), y + round(4 * s)), value, fonts["body_bold"], GOLD_LIGHT, 0)


def draw_right_panel(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int], fonts: dict[str, ImageFont.ImageFont], spec: ModeSpec, s: float) -> None:
    content = draw_section_panel(draw, rect, spec.right_title, fonts, s)
    x, y, w, _ = content
    row_h = round(21 * s)
    draw_setting_row(draw, (x, y, w, row_h), spec.row_1[0], spec.row_1[1], fonts, s)
    draw_setting_row(draw, (x, y + round(24 * s), w, row_h), spec.row_2[0], spec.row_2[1], fonts, s)
    draw_setting_row(draw, (x, y + round(48 * s), w, row_h), spec.row_3[0], spec.row_3[1], fonts, s)
    draw_button(draw, (x + round(5 * s), y + round(75 * s), w - round(10 * s), round(22 * s)), "HOST ROOM", fonts["button"], True, s)


def draw_button(
    draw: ImageDraw.ImageDraw,
    rect: tuple[int, int, int, int],
    label: str,
    font_obj: ImageFont.ImageFont,
    selected: bool,
    s: float,
) -> None:
    fill = (36, 22, 10, 242) if selected else (10, 13, 14, 238)
    outline = GOLD_DIM
    chamfered_rect(draw, rect, max(2, round(3 * s)), fill, outline, max(1, round(1 * s)))
    x, y, w, h = rect
    if selected:
        draw.rectangle((x + round(5 * s), y + round(4 * s), x + w - round(5 * s), y + round(5 * s)), fill=(215, 145, 42, 80))
    draw_centered(draw, rect, label, font_obj, GOLD_LIGHT if selected else CREAM, 1)


def draw_input_bar(draw: ImageDraw.ImageDraw, modal: tuple[int, int, int, int], fonts: dict[str, ImageFont.ImageFont], spec: ModeSpec, s: float) -> None:
    x, y, w, h = modal
    row_y = y + h - round(69 * s)
    label_x = x + round(42 * s)
    row_h = round(25 * s)
    draw_text(draw, (label_x, row_y + round(6 * s)), spec.code_label, fonts["body_bold"], CREAM, 0)
    field_x = x + round(128 * s)
    field_w = round(228 * s)
    field = (field_x, row_y, field_w, row_h)
    chamfered_rect(draw, field, max(2, round(3 * s)), FIELD_FILL, GOLD_DIM, max(1, round(1 * s)))
    draw_text(draw, (field_x + round(12 * s), row_y + round(6 * s)), spec.placeholder, fonts["field"], GOLD_LIGHT, 0)
    draw_button(draw, (field_x + field_w + round(10 * s), row_y, round(78 * s), row_h), spec.action, fonts["button"], True, s)

    name_y = row_y + round(36 * s)
    draw_text(draw, (label_x, name_y + round(5 * s)), "YOUR NAME:", fonts["body_bold"], GOLD_LIGHT, 0)
    draw_text(draw, (label_x + round(82 * s), name_y + round(5 * s)), "Displayed Name", fonts["body_bold"], CYAN, 0)
    edit_x = label_x + round(226 * s)
    chamfered_rect(draw, (edit_x, name_y, round(25 * s), round(21 * s)), max(2, round(3 * s)), (10, 13, 14, 235), GOLD_DIM)
    draw.line((edit_x + round(7 * s), name_y + round(13 * s), edit_x + round(17 * s), name_y + round(13 * s)), fill=CYAN, width=max(1, round(1 * s)))
    draw.line((edit_x + round(15 * s), name_y + round(8 * s), edit_x + round(18 * s), name_y + round(13 * s), edit_x + round(15 * s), name_y + round(18 * s)), fill=CYAN, width=max(1, round(1 * s)))


def draw_footer(canvas: Image.Image, modal: tuple[int, int, int, int], fonts: dict[str, ImageFont.ImageFont], spec: ModeSpec, s: float) -> None:
    draw = ImageDraw.Draw(canvas, "RGBA")
    x, y, w, h = modal
    footer_w = round(372 * s)
    footer_h = round(38 * s)
    footer_x = x + (w - footer_w) // 2
    footer_y = y + h + round(5 * s)
    paste_asset(canvas, SETTINGS_SPRITES / "bottom_controls" / "bottom_controls_panel.png", (footer_x, footer_y, footer_w, footer_h), 215)


def draw_corner_controls(canvas: Image.Image, s: float) -> None:
    x = canvas.width - round(77 * s)
    y = round(18 * s)
    paste_asset(canvas, SETTINGS_SPRITES / "window_controls" / "top_right_settings_button.png", (x, y, round(32 * s), round(29 * s)), 235)
    paste_asset(canvas, SETTINGS_SPRITES / "window_controls" / "top_right_close_button.png", (x + round(37 * s), y, round(36 * s), round(29 * s)), 235)


def draw_scanlines(draw: ImageDraw.ImageDraw, modal: tuple[int, int, int, int], s: float) -> None:
    x, y, w, h = modal
    step = max(6, round(8 * s))
    for yy in range(y + round(16 * s), y + h - round(16 * s), step):
        draw.line((x + round(24 * s), yy, x + w - round(24 * s), yy), fill=(116, 43, 39, 8), width=1)


def render(bg_path: Path, out_path: Path, mode_key: str) -> None:
    bg = Image.open(bg_path).convert("RGBA")
    scale = bg.width / BASE_W
    fonts = load_fonts(scale)
    spec = MODES[mode_key]

    canvas = bg.copy()
    dim = Image.new("RGBA", canvas.size, (0, 0, 0, 150))
    canvas.alpha_composite(dim)

    draw_corner_controls(canvas, scale)
    modal = draw_modal(canvas, scale, spec)
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_title(draw, modal, fonts, spec, scale)
    draw_tabs(draw, modal, fonts, spec, scale)

    x, y, w, _ = modal
    panel_y = y + round(122 * scale)
    left = (x + round(28 * scale), panel_y, round(294 * scale), round(142 * scale))
    right = (x + round(337 * scale), panel_y, round(150 * scale), round(142 * scale))
    draw_left_panel(draw, left, fonts, spec, scale)
    draw_right_panel(draw, right, fonts, spec, scale)
    draw_input_bar(draw, modal, fonts, spec, scale)
    draw_footer(canvas, modal, fonts, spec, scale)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(out_path, quality=95)


def main() -> None:
    for mode in ("relay", "ip"):
        render(FULL_BG, OUTS[mode]["full"], mode)
        render(PREVIEW_BG, OUTS[mode]["preview"], mode)


if __name__ == "__main__":
    main()
