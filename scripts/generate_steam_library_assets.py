from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
BIB = ROOT / "imgs" / "Steam+kick" / "bib"
PORTRAIT = BIB / "SlashArt_2.png"
SMALL_CAPSULE = ROOT / "imgs" / "Steam+kick" / "steam_capsules" / "divergency_small_capsule_462x174_v2.png"
LOGO = BIB / "divergency_library_logo_1280x720_from_capsule.png"


def load(path):
    return Image.open(path).convert("RGBA")


def crop_alpha(img):
    bbox = img.getchannel("A").getbbox()
    return img.crop(bbox) if bbox else img


def fit_crop(img, size, focal=(0.5, 0.5)):
    target_w, target_h = size
    scale = max(target_w / img.width, target_h / img.height)
    scaled = img.resize((round(img.width * scale), round(img.height * scale)), Image.Resampling.LANCZOS)
    max_x = scaled.width - target_w
    max_y = scaled.height - target_h
    left = round(max_x * focal[0]) if max_x > 0 else 0
    top = round(max_y * focal[1]) if max_y > 0 else 0
    return scaled.crop((left, top, left + target_w, top + target_h))


def overlay(dst, src, center):
    x = round(center[0] - src.width / 2)
    y = round(center[1] - src.height / 2)
    dst.alpha_composite(src, (x, y))


def alpha_layer(src, color, blur=0, expand=0):
    alpha = src.getchannel("A")
    if expand:
        alpha = alpha.filter(ImageFilter.MaxFilter(expand * 2 + 1))
    if blur:
        alpha = alpha.filter(ImageFilter.GaussianBlur(blur))
    layer = Image.new("RGBA", src.size, color)
    layer.putalpha(alpha)
    return layer


def logo_treatment(width, max_height=None, shadow=True):
    logo = crop_alpha(load(LOGO))
    scale = width / logo.width
    target_h = round(logo.height * scale)
    if max_height and target_h > max_height:
        scale = max_height / logo.height
        width = round(logo.width * scale)
        target_h = max_height
    logo = logo.resize((round(width), target_h), Image.Resampling.LANCZOS)
    if not shadow:
        return logo

    pad = max(28, round(width * 0.045))
    canvas = Image.new("RGBA", (logo.width + pad * 2, logo.height + pad * 2), (0, 0, 0, 0))
    base = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    base.alpha_composite(logo, (pad, pad))
    shadow_layer = alpha_layer(base, (1, 2, 5, 225), blur=10, expand=4)
    canvas.alpha_composite(shadow_layer)
    canvas.alpha_composite(base)
    return canvas


def vertical_gradient(size, top=(0, 0, 0, 0), bottom=(0, 0, 0, 0)):
    w, h = size
    grad = Image.new("RGBA", size)
    pix = grad.load()
    for y in range(h):
        t = y / max(1, h - 1)
        rgba = tuple(round(top[i] * (1 - t) + bottom[i] * t) for i in range(4))
        for x in range(w):
            pix[x, y] = rgba
    return grad


def edge_fade_mask(size, edge):
    w, h = size
    mask = Image.new("L", size, 255)
    pix = mask.load()
    for x in range(w):
        alpha = min(255, round((min(x, w - 1 - x) / max(1, edge)) ** 0.75 * 255))
        for y in range(h):
            pix[x, y] = alpha
    return mask


def vignette(size, strength=145):
    w, h = size
    mask = Image.new("L", size, 0)
    pix = mask.load()
    cx, cy = w / 2, h / 2
    max_d = (cx * cx + cy * cy) ** 0.5
    for y in range(h):
        for x in range(w):
            dx = (x - cx) / cx
            dy = (y - cy) / cy
            d = min(1, (dx * dx + dy * dy) ** 0.5 / 1.05)
            pix[x, y] = round((d ** 1.65) * strength)
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    layer.putalpha(mask)
    return layer


def save(img, name):
    img.save(BIB / name, optimize=True)
    print(f"{name}: {img.width}x{img.height}")


def make_library_capsule():
    size = (600, 900)
    art = fit_crop(load(PORTRAIT), size, focal=(0.5, 0.57))
    art = ImageEnhance.Contrast(art).enhance(1.08)
    art = ImageEnhance.Color(art).enhance(1.1)
    art.alpha_composite(vertical_gradient(size, top=(0, 0, 0, 175), bottom=(0, 0, 0, 58)))
    art.alpha_composite(vignette(size, strength=105))

    logo = logo_treatment(560, max_height=168)
    overlay(art, logo, (300, 105))
    save(art.convert("RGB"), "divergency_library_capsule_600x900.png")


def make_header_capsule():
    size = (920, 430)
    bg = fit_crop(load(SMALL_CAPSULE), size, focal=(0.5, 0.46))
    bg = bg.filter(ImageFilter.GaussianBlur(1.15))
    bg = ImageEnhance.Brightness(bg).enhance(0.58)
    bg = ImageEnhance.Color(bg).enhance(1.22)

    art = fit_crop(load(PORTRAIT), (390, 430), focal=(0.5, 0.53))
    art.putalpha(edge_fade_mask(art.size, 96))
    bg.alpha_composite(art, (size[0] - art.width - 22, 0))

    bg.alpha_composite(vertical_gradient(size, top=(0, 0, 0, 80), bottom=(0, 0, 0, 120)))
    logo = logo_treatment(760, max_height=190)
    overlay(bg, logo, (size[0] * 0.45, size[1] * 0.5))
    save(bg.convert("RGB"), "divergency_library_header_capsule_920x430.png")


def make_library_banner():
    size = (3840, 1240)
    src = load(PORTRAIT)
    bg = fit_crop(src, size, focal=(0.5, 0.46))
    bg = bg.filter(ImageFilter.GaussianBlur(28))
    bg = ImageEnhance.Brightness(bg).enhance(0.55)
    bg = ImageEnhance.Color(bg).enhance(1.22)

    strip = fit_crop(src, (1320, 1240), focal=(0.5, 0.42))
    strip = ImageEnhance.Contrast(strip).enhance(1.04)
    strip.putalpha(edge_fade_mask(strip.size, 270))
    overlay(bg, strip, (size[0] / 2, size[1] / 2))

    bg.alpha_composite(vertical_gradient(size, top=(5, 8, 16, 78), bottom=(0, 0, 0, 122)))
    bg.alpha_composite(vignette(size, strength=115))
    save(bg.convert("RGB"), "divergency_library_banner_3840x1240.png")


def make_library_logo():
    size = (1280, 720)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    logo = fit_crop(load(LOGO), size)
    overlay(canvas, logo, (size[0] / 2, size[1] / 2))
    save(canvas, "divergency_library_logo_1280x720.png")


def main():
    make_library_capsule()
    make_header_capsule()
    make_library_banner()
    make_library_logo()


if __name__ == "__main__":
    main()
