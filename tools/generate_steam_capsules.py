from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "imgs" / "Steam+kick" / "K_banner_color.jpg"
OUT_DIR = ROOT / "imgs" / "Steam+kick" / "steam_capsules"


def cover_crop(img: Image.Image, size: tuple[int, int], focus: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    target_w, target_h = size
    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    resized = img.resize((round(src_w * scale), round(src_h * scale)), Image.Resampling.LANCZOS)
    resize_w, resize_h = resized.size
    max_left = max(0, resize_w - target_w)
    max_top = max(0, resize_h - target_h)
    left = round(max_left * focus[0])
    top = round(max_top * focus[1])
    return resized.crop((left, top, left + target_w, top + target_h))


def add_vignette(img: Image.Image, strength: float = 0.25) -> Image.Image:
    arr = np.asarray(img).astype(np.float32)
    h, w = arr.shape[:2]
    y, x = np.ogrid[-1:1:h * 1j, -1:1:w * 1j]
    radius = np.sqrt((x * 0.88) ** 2 + (y * 1.05) ** 2)
    edge = np.clip((radius - 0.38) / 0.72, 0, 1) ** 1.6
    arr *= (1 - strength * edge[..., None])
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def boost_logo_highlights(img: Image.Image, amount: float = 0.22) -> Image.Image:
    arr = np.asarray(img).astype(np.float32)
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    luma = 0.299 * r + 0.587 * g + 0.114 * b
    cool = ((g + b) / 2) - (r * 0.55)
    mask = np.clip((luma - 55) / 150, 0, 1) * np.clip((cool - 12) / 95, 0, 1)
    mask = mask[..., None] * amount
    tint = np.array([16, 34, 31], dtype=np.float32)
    arr = arr * (1 + mask) + tint * mask
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def polish(img: Image.Image, contrast: float = 1.06, color: float = 1.08, sharpness: float = 1.08) -> Image.Image:
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(color)
    img = ImageEnhance.Sharpness(img).enhance(sharpness)
    return boost_logo_highlights(img)


def extract_logo(src: Image.Image) -> Image.Image:
    crop = src.crop((245, 20, 1115, 270)).convert("RGBA")
    arr = np.asarray(crop).astype(np.float32)
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    luma = 0.299 * r + 0.587 * g + 0.114 * b
    cool = ((g + b) / 2) - (r * 0.50)
    alpha = np.clip((luma - 92) / 112, 0, 1) * np.clip((cool - 18) / 82, 0, 1)
    alpha = np.maximum(alpha, np.clip((luma - 178) / 62, 0, 1) * 0.82)
    alpha_img = Image.fromarray(np.clip(alpha * 255, 0, 255).astype(np.uint8), "L")
    alpha_img = alpha_img.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.5))
    alpha_img = alpha_img.point(lambda p: 0 if p < 30 else p)
    crop.putalpha(alpha_img)
    bbox = alpha_img.point(lambda p: 255 if p > 18 else 0).getbbox()
    if bbox:
        pad = 8
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(crop.width, bbox[2] + pad)
        bottom = min(crop.height, bbox[3] + pad)
        crop = crop.crop((left, top, right, bottom))
    return crop


def tint_logo(logo: Image.Image) -> Image.Image:
    arr = np.asarray(logo.convert("RGBA")).astype(np.float32)
    alpha = arr[..., 3]
    intensity = np.clip((arr[..., :3].max(axis=2) - 90) / 145, 0, 1)
    base = np.array([176, 229, 222], dtype=np.float32)
    highlight = np.array([236, 255, 250], dtype=np.float32)
    arr[..., :3] = base * (1 - intensity[..., None]) + highlight * intensity[..., None]
    arr[..., 3] = alpha
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")


def alpha_paste(base: Image.Image, overlay: Image.Image, xy: tuple[int, int], opacity: float = 1.0) -> Image.Image:
    out = base.convert("RGBA")
    layer = overlay.copy()
    if opacity < 1:
        alpha = layer.getchannel("A").point(lambda p: round(p * opacity))
        layer.putalpha(alpha)
    out.alpha_composite(layer, xy)
    return out.convert("RGB")


def place_logo(base: Image.Image, logo: Image.Image, width: int, y: int, opacity: float = 0.96) -> Image.Image:
    scale = width / logo.width
    resized = logo.resize((width, round(logo.height * scale)), Image.Resampling.LANCZOS)
    x = round((base.width - resized.width) / 2)

    glow_alpha = resized.getchannel("A").filter(ImageFilter.GaussianBlur(max(5, round(width * 0.025))))
    glow = Image.new("RGBA", resized.size, (64, 229, 218, 0))
    glow.putalpha(glow_alpha.point(lambda p: round(p * 0.42)))

    out = alpha_paste(base, glow, (x, y), opacity=opacity)
    return alpha_paste(out, resized, (x, y), opacity=opacity)


def place_feathered_logo_panel(base: Image.Image, src: Image.Image, width: int, y: int) -> Image.Image:
    panel = src.crop((170, 0, 1140, 286)).convert("RGBA")
    scale = width / panel.width
    panel = panel.resize((width, round(panel.height * scale)), Image.Resampling.LANCZOS)
    h, w = panel.height, panel.width
    yy, xx = np.ogrid[:h, :w]
    horizontal_distance = np.minimum(xx, w - 1 - xx)
    vertical_distance = np.minimum(yy, h - 1 - yy)
    edge_distance = np.minimum(horizontal_distance, vertical_distance).astype(np.float32)
    feather = 82
    alpha = np.clip(edge_distance / feather, 0, 1) ** 0.65
    alpha = np.clip(alpha * 245, 0, 245).astype(np.uint8)
    panel.putalpha(Image.fromarray(alpha, "L"))
    x = round((base.width - panel.width) / 2)
    return alpha_paste(base, panel, (x, y), opacity=1.0)


def add_top_shadow(img: Image.Image, height: int, max_alpha: int = 120) -> Image.Image:
    out = img.convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    alpha = Image.new("L", (img.width, height), 0)
    grad = np.linspace(max_alpha, 0, height, dtype=np.uint8)
    grad = np.tile(grad[:, None], (1, img.width))
    alpha.paste(Image.fromarray(grad, "L"), (0, 0))
    shadow = Image.new("RGBA", (img.width, height), (2, 2, 8, 255))
    shadow.putalpha(alpha)
    overlay.alpha_composite(shadow, (0, 0))
    out.alpha_composite(overlay)
    return out.convert("RGB")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    src = Image.open(SOURCE).convert("RGB")
    logo = extract_logo(src)
    clean_logo = tint_logo(logo)

    main_capsule = cover_crop(src, (1232, 706), focus=(0.5, 0.5))
    main_capsule = add_vignette(polish(main_capsule, 1.05, 1.08, 1.07), 0.18)
    main_capsule.save(OUT_DIR / "divergency_main_capsule_1232x706.png")

    small_crop = src.crop((148, 0, 1175, 387))
    small_capsule = small_crop.resize((462, 174), Image.Resampling.LANCZOS)
    small_capsule = add_top_shadow(polish(small_capsule, 1.13, 1.10, 1.20), height=96, max_alpha=45)
    small_capsule = add_vignette(small_capsule, 0.12)
    small_capsule.save(OUT_DIR / "divergency_small_capsule_462x174.png")
    small_capsule.save(OUT_DIR / "divergency_small_capsule_462x174_v2.png")

    vertical_source = src.crop((0, 330, src.width, src.height))
    vertical_bg = cover_crop(vertical_source, (748, 896), focus=(0.50, 0.44))
    vertical_bg = ImageEnhance.Brightness(vertical_bg.filter(ImageFilter.GaussianBlur(12))).enhance(0.58)
    vertical_bg = ImageEnhance.Color(vertical_bg).enhance(1.25)

    vertical_sharp = cover_crop(vertical_source, (748, 896), focus=(0.46, 0.44))
    vertical_sharp = polish(vertical_sharp, 1.08, 1.12, 1.04).convert("RGBA")
    vertical_sharp.putalpha(188)
    vertical = vertical_bg.convert("RGBA")
    vertical.alpha_composite(vertical_sharp)
    top_art = polish(src.resize((748, round(748 * src.height / src.width)), Image.Resampling.LANCZOS), 1.05, 1.08, 1.08)
    top_art = top_art.convert("RGBA")
    fade_start = round(top_art.height * 0.56)
    alpha = np.ones((top_art.height, top_art.width), dtype=np.float32) * 255
    fade = np.linspace(1, 0, top_art.height - fade_start, dtype=np.float32) ** 1.35
    alpha[fade_start:, :] = fade[:, None] * 255
    top_art.putalpha(Image.fromarray(np.clip(alpha, 0, 255).astype(np.uint8), "L"))
    vertical.alpha_composite(top_art, (0, 0))
    vertical = add_top_shadow(vertical.convert("RGB"), height=220, max_alpha=45)
    vertical = add_vignette(vertical, 0.28)
    vertical.save(OUT_DIR / "divergency_vertical_capsule_748x896.png")

    for path in sorted(OUT_DIR.glob("divergency_*_capsule_*.png")):
        with Image.open(path) as img:
            print(f"{path.relative_to(ROOT)} {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
