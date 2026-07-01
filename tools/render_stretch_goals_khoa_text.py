from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "imgs" / "UI" / "Goal_money" / "stretch-goals-Khoa.png"
OUTPUT = ROOT / "imgs" / "UI" / "Goal_money" / "stretch-goals-Khoa-text.png"

FONT_DIR = Path("C:/Windows/Fonts")
PRICE_FONT = FONT_DIR / "AGENCYB.TTF"
TITLE_FONT = FONT_DIR / "AGENCYB.TTF"
BODY_FONT = FONT_DIR / "bahnschrift.ttf"

ROWS = [
    {
        "y": 135,
        "price": "$20K",
        "title": ["Full Story", "Campaign"],
        "body": "Combat, bosses, QA, PC release",
    },
    {
        "y": 477,
        "price": "$30K",
        "title": ["Extended", "Masteries"],
        "body": "Skill upgrades, cosmetics",
    },
    {
        "y": 828,
        "price": "$40K",
        "title": ["Lore &", "Secret Routes"],
        "body": "Hidden rooms, backstories",
    },
    {
        "y": 1176,
        "price": "$50K",
        "title": ["Local", "Co-op"],
        "body": "Shared-screen team play",
    },
    {
        "y": 1566,
        "price": "$60K",
        "title": ["Survival", "+ Boss Rush"],
        "body": "Replay modes, SFX polish",
    },
]


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def fit_font(draw: ImageDraw.ImageDraw, text: str, path: Path, max_width: int, start_size: int, min_size: int) -> ImageFont.FreeTypeFont:
    size = start_size
    while size >= min_size:
        candidate = font(path, size)
        width = draw.textbbox((0, 0), text, font=candidate, stroke_width=0)[2]
        if width <= max_width:
            return candidate
        size -= 2
    return font(path, min_size)


def draw_stroked(draw: ImageDraw.ImageDraw, position: tuple[int, int], text: str, font_obj: ImageFont.FreeTypeFont, fill: str, stroke: int = 3) -> None:
    x, y = position
    draw.text((x + 4, y + 5), text, font=font_obj, fill=(0, 0, 0, 150))
    draw.text((x, y), text, font=font_obj, fill=fill, stroke_width=stroke, stroke_fill="#141217")


def main() -> None:
    image = Image.open(SOURCE).convert("RGBA")
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    label_font = font(BODY_FONT, 22)
    price_font = font(PRICE_FONT, 92)
    body_font = font(BODY_FONT, 23)

    for row in ROWS:
        y = row["y"]
        panel_x = 351
        panel_right = 979
        panel_h = 132
        price_x = panel_x + 23
        text_x = panel_x + 258
        separator_x = panel_x + 225

        draw.rounded_rectangle(
            (panel_x + 5, y + 9, panel_right - 10, y + panel_h - 10),
            radius=10,
            fill=(20, 18, 25, 50),
        )
        draw.line((separator_x, y + 20, separator_x, y + panel_h - 20), fill=(152, 117, 165, 210), width=5)

        price_bbox = draw.textbbox((0, 0), row["price"], font=price_font, stroke_width=5)
        price_h = price_bbox[3] - price_bbox[1]
        price_y = y + (panel_h - price_h) // 2 - 2
        draw_stroked(draw, (price_x - 4, price_y), row["price"], price_font, "#e9e2d4", stroke=5)

        title_lines = row["title"]
        title_font = fit_font(draw, max(title_lines, key=len), TITLE_FONT, 350, 39, 31)
        line_gap = 35
        title_block_h = (len(title_lines) - 1) * line_gap + title_font.size
        body_h = draw.textbbox((0, 0), row["body"], font=body_font, stroke_width=2)[3]
        group_h = title_block_h + 13 + body_h
        title_y = y + max(14, (panel_h - group_h) // 2 - 4)
        for line in title_lines:
            draw_stroked(draw, (text_x, title_y), line, title_font, "#fff3df", stroke=3)
            title_y += line_gap

        body = row["body"]
        selected_body = fit_font(draw, body, BODY_FONT, 380, 23, 19)
        draw_stroked(draw, (text_x, title_y + 10), body, selected_body, "#d8d1c7", stroke=2)

    result = Image.alpha_composite(image, overlay)
    result.save(OUTPUT)
    print(f"Wrote {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
