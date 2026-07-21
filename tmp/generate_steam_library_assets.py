from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ART_PATH = ROOT / "imgs" / "Steam+kick" / "bib" / "SlashArt_2.png"
LOGO_PATH = ROOT / "imgs" / "Steam+kick" / "bib" / "divergency_library_logo_1280x720.png"
OUT_DIR = ROOT / "imgs" / "Steam+kick" / "library_assets"


def cover(img, size, center=(0.5, 0.5)):
    target_w, target_h = size
    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    new_size = (round(src_w * scale), round(src_h * scale))
    resized = img.resize(new_size, Image.Resampling.LANCZOS)
    max_x = max(0, resized.width - target_w)
    max_y = max(0, resized.height - target_h)
    left = round(max_x * center[0])
    top = round(max_y * center[1])
    return resized.crop((left, top, left + target_w, top + target_h))


def contain(img, size):
    target_w, target_h = size
    src_w, src_h = img.size
    scale = min(target_w / src_w, target_h / src_h)
    new_size = (round(src_w * scale), round(src_h * scale))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def alpha_trim(img, padding=0):
    rgba = img.convert("RGBA")
    box = rgba.getchannel("A").getbbox()
    if box is None:
        return rgba
    left, top, right, bottom = box
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(rgba.width, right + padding)
    bottom = min(rgba.height, bottom + padding)
    return rgba.crop((left, top, right, bottom))


def tint(img, brightness=1.0, contrast=1.0, saturation=1.0):
    out = ImageEnhance.Brightness(img).enhance(brightness)
    out = ImageEnhance.Contrast(out).enhance(contrast)
    out = ImageEnhance.Color(out).enhance(saturation)
    return out


def add_vertical_shade(canvas, top_alpha=0, bottom_alpha=0):
    w, h = canvas.size
    shade = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    px = shade.load()
    for y in range(h):
        top = top_alpha * max(0, 1 - y / (h * 0.45))
        bottom = bottom_alpha * max(0, (y - h * 0.42) / (h * 0.58))
        a = int(max(top, bottom))
        if a:
            for x in range(w):
                px[x, y] = (0, 0, 0, a)
    canvas.alpha_composite(shade)


def add_vignette(canvas, strength=90):
    w, h = canvas.size
    mask = Image.new("L", canvas.size, 0)
    px = mask.load()
    cx, cy = w / 2, h / 2
    max_d = (cx * cx + cy * cy) ** 0.5
    for y in range(h):
        for x in range(w):
            dx = (x - cx) / cx
            dy = (y - cy) / cy
            d = min(1.0, (dx * dx + dy * dy) ** 0.5 / 1.08)
            px[x, y] = int((d ** 1.8) * strength)
    canvas.paste(Image.new("RGBA", canvas.size, (0, 0, 0, 255)), (0, 0), mask)


def paste_center(base, img, offset=(0, 0)):
    x = (base.width - img.width) // 2 + offset[0]
    y = (base.height - img.height) // 2 + offset[1]
    base.alpha_composite(img, (x, y))
    return (x, y)


def horizontal_fade_mask(size, left_fade=0, right_fade=0, max_alpha=255):
    w, h = size
    mask = Image.new("L", size, max_alpha)
    px = mask.load()
    for y in range(h):
        for x in range(w):
            a = max_alpha
            if left_fade and x < left_fade:
                a = min(a, int(max_alpha * x / left_fade))
            if right_fade and x >= w - right_fade:
                a = min(a, int(max_alpha * (w - 1 - x) / right_fade))
            px[x, y] = max(0, a)
    return mask


def paste_logo(base, logo, max_w, max_h, pos):
    trimmed = alpha_trim(logo, padding=12)
    scale = min(max_w / trimmed.width, max_h / trimmed.height)
    resized = trimmed.resize(
        (round(trimmed.width * scale), round(trimmed.height * scale)),
        Image.Resampling.LANCZOS,
    )
    x, y = pos
    shadow_alpha = resized.getchannel("A").filter(ImageFilter.GaussianBlur(max(6, round(resized.width * 0.025))))
    shadow = Image.new("RGBA", resized.size, (0, 0, 0, 170))
    base.paste(shadow, (x + round(resized.width * 0.012), y + round(resized.height * 0.04)), shadow_alpha)
    base.alpha_composite(resized, (x, y))


def make_capsule(art, logo):
    size = (600, 900)
    bg = cover(art, size, center=(0.5, 0.52)).filter(ImageFilter.GaussianBlur(12))
    bg = tint(bg, brightness=0.66, contrast=1.22, saturation=0.95)
    canvas = bg.convert("RGBA")

    foreground = contain(art, (size[0] - 54, size[1]))
    paste_center(canvas, foreground)
    add_vertical_shade(canvas, top_alpha=110, bottom_alpha=125)
    add_vignette(canvas, strength=78)
    paste_logo(canvas, logo, max_w=515, max_h=205, pos=(42, 38))
    return canvas


def make_header(art, logo):
    size = (920, 430)
    bg = cover(art, size, center=(0.5, 0.58)).filter(ImageFilter.GaussianBlur(15))
    bg = tint(bg, brightness=0.58, contrast=1.22, saturation=0.95)
    canvas = bg.convert("RGBA")

    art_panel = contain(art, (370, 560))
    art_panel = tint(art_panel, brightness=0.95, contrast=1.06, saturation=1.02)
    art_mask = horizontal_fade_mask(art_panel.size, left_fade=150, max_alpha=230)
    canvas.paste(art_panel, (size[0] - art_panel.width - 28, -72), art_mask)

    left_glow = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_px = left_glow.load()
    for y in range(size[1]):
        for x in range(size[0]):
            a = int(max(0, 165 * (1 - x / 620)))
            glow_px[x, y] = (0, 0, 0, a)
    canvas.alpha_composite(left_glow)
    add_vignette(canvas, strength=55)
    paste_logo(canvas, logo, max_w=560, max_h=225, pos=(52, 112))
    return canvas


def make_hero(art):
    size = (3840, 1240)
    bg = cover(art, size, center=(0.5, 0.55)).filter(ImageFilter.GaussianBlur(42))
    bg = tint(bg, brightness=0.58, contrast=1.15, saturation=0.9)
    canvas = bg.convert("RGBA")

    wide_detail = cover(art, size, center=(0.5, 0.58))
    wide_detail = tint(wide_detail, brightness=0.44, contrast=1.08, saturation=0.82)
    wide_detail.putalpha(105)
    canvas.alpha_composite(wide_detail)

    # Preserve the original key art in the Steam safe-area while allowing wide edges to crop gracefully.
    foreground = contain(art, (820, size[1]))
    x = (size[0] - foreground.width) // 2
    y = (size[1] - foreground.height) // 2

    edge_mask = Image.new("L", foreground.size, 255)
    mask_px = edge_mask.load()
    fade = max(1, round(foreground.width * 0.075))
    for yy in range(foreground.height):
        for xx in range(foreground.width):
            edge = min(xx, foreground.width - 1 - xx)
            if edge < fade:
                mask_px[xx, yy] = int(255 * edge / fade)
    canvas.paste(foreground, (x, y), edge_mask)

    add_vertical_shade(canvas, top_alpha=88, bottom_alpha=118)
    add_vignette(canvas, strength=96)
    return canvas


def save_png(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)


def flatten_opaque(img):
    base = Image.new("RGBA", img.size, (0, 0, 0, 255))
    base.alpha_composite(img.convert("RGBA"))
    return base


def main():
    art = Image.open(ART_PATH).convert("RGBA")
    logo = Image.open(LOGO_PATH).convert("RGBA")

    outputs = {
        "divergency_library_capsule_600x900.png": flatten_opaque(make_capsule(art, logo)),
        "divergency_library_header_920x430.png": flatten_opaque(make_header(art, logo)),
        "divergency_library_hero_3840x1240.png": flatten_opaque(make_hero(art)),
        "divergency_library_logo_1280x720.png": logo,
    }

    for name, image in outputs.items():
        save_png(image, OUT_DIR / name)
        print(f"{OUT_DIR / name} {image.width}x{image.height}")


if __name__ == "__main__":
    main()
