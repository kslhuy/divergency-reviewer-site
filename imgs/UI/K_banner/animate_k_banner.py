from __future__ import annotations

import argparse
import math
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "imgs" / "UI" / "K_baner.png"
OUT_WEBP = ROOT / "imgs" / "UI" / "K_baner_animated.webp"
OUT_GIF = ROOT / "imgs" / "UI" / "K_baner_animated.gif"
SUPPORT_TEXT = "Support Us"
SUPPORT_FONT = Path("C:/Windows/Fonts/segoeuib.ttf")


def make_color_mask(
    image: Image.Image,
    predicate,
    *,
    bounds: tuple[int, int, int, int] | None = None,
    blur: float = 0,
    gain: float = 1.0,
) -> Image.Image:
    rgb = np.asarray(image.convert("RGB"), dtype=np.int16)
    r = rgb[:, :, 0]
    g = rgb[:, :, 1]
    b = rgb[:, :, 2]
    cond = predicate(r, g, b)
    value = np.clip((np.maximum.reduce([r, g, b]) - 36) * gain, 0, 255)
    mask = np.where(cond, value, 0).astype(np.uint8)

    if bounds is not None:
        x1, y1, x2, y2 = bounds
        scoped = np.zeros_like(mask)
        scoped[y1:y2, x1:x2] = mask[y1:y2, x1:x2]
        mask = scoped

    out = Image.fromarray(mask, "L")
    if blur:
        out = out.filter(ImageFilter.GaussianBlur(blur))
    return out


def scaled_alpha(mask: Image.Image, scale: float) -> Image.Image:
    scale = max(0.0, min(scale, 3.0))
    return ImageEnhance.Brightness(mask).enhance(scale)


def overlay_mask(
    base: Image.Image,
    mask: Image.Image,
    color: tuple[int, int, int],
    scale: float,
) -> Image.Image:
    layer = Image.new("RGBA", base.size, color + (0,))
    layer.putalpha(scaled_alpha(mask, scale))
    return Image.alpha_composite(base, layer)


def make_smoke_sprite(
    size: tuple[int, int],
    color: tuple[int, int, int],
    seed: int,
    *,
    density: int,
    blur: float,
) -> Image.Image:
    rng = random.Random(seed)
    sprite = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(sprite, "RGBA")
    w, h = size

    for _ in range(density):
        x = rng.randint(-w // 8, w + w // 8)
        y = rng.randint(-h // 8, h + h // 8)
        rx = rng.randint(max(28, w // 22), max(70, w // 8))
        ry = rng.randint(max(12, h // 16), max(30, h // 4))
        alpha = rng.randint(1, 3)
        draw.ellipse((x - rx, y - ry, x + rx, y + ry), fill=color + (alpha,))

    for _ in range(max(4, density // 4)):
        points = []
        start_x = rng.randint(-80, w + 80)
        start_y = rng.randint(0, h)
        for step in range(5):
            points.append(
                (
                    start_x + step * rng.randint(45, 90),
                    start_y + int(math.sin(step * 1.3 + rng.random() * 4) * rng.randint(8, 26)),
                )
            )
        draw.line(points, fill=color + (rng.randint(1, 4),), width=rng.randint(10, 24))

    sprite = sprite.filter(ImageFilter.GaussianBlur(blur))
    alpha = sprite.getchannel("A").point(lambda value: 0 if value < 2 else min(255, value))
    sprite.putalpha(alpha)
    return sprite


def tint_alpha(image: Image.Image, alpha_scale: float) -> Image.Image:
    if alpha_scale == 1:
        return image
    layer = image.copy()
    alpha = layer.getchannel("A")
    layer.putalpha(scaled_alpha(alpha, alpha_scale))
    return layer


def paste_layer(base: Image.Image, layer: Image.Image, xy: tuple[int, int], alpha_scale: float = 1.0) -> None:
    layer = tint_alpha(layer, alpha_scale)
    base.alpha_composite(layer, dest=xy)


def radial_glow(
    size: tuple[int, int],
    center: tuple[float, float],
    radius: tuple[float, float],
    color: tuple[int, int, int],
    alpha: float,
) -> Image.Image:
    w, h = size
    cx, cy = center
    rx, ry = radius
    y, x = np.ogrid[:h, :w]
    dist = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2
    mask = np.clip(1.0 - dist, 0, 1) ** 2
    a = (mask * alpha * 255).astype(np.uint8)
    arr = np.zeros((h, w, 4), dtype=np.uint8)
    arr[:, :, 0] = color[0]
    arr[:, :, 1] = color[1]
    arr[:, :, 2] = color[2]
    arr[:, :, 3] = a
    return Image.fromarray(arr, "RGBA").filter(ImageFilter.GaussianBlur(2.0))


def build_particles() -> list[dict[str, float]]:
    rng = random.Random(28)
    particles: list[dict[str, float]] = []
    zones = [
        (9, 365, 100, 940, 325, (116, 250, 255)),
        (7, 890, 245, 1080, 345, (255, 95, 224)),
        (5, 610, 465, 760, 545, (255, 225, 126)),
    ]

    for count, x1, y1, x2, y2, color in zones:
        for _ in range(count):
            particles.append(
                {
                    "x": rng.uniform(x1, x2),
                    "y": rng.uniform(y1, y2),
                    "phase": rng.random(),
                    "speed": rng.uniform(0.65, 1.55),
                    "drift": rng.uniform(10, 34),
                    "size": rng.uniform(1.1, 3.4),
                    "r": color[0],
                    "g": color[1],
                    "b": color[2],
                }
            )
    return particles


def draw_particles(frame: Image.Image, particles: list[dict[str, float]], t: float) -> None:
    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")

    for p in particles:
        phase = (t * p["speed"] + p["phase"]) % 1.0
        pulse = math.sin(phase * math.tau)
        twinkle = max(0.0, math.sin((phase * 2.0 + 0.15) * math.pi))
        x = p["x"] + math.sin((t + p["phase"]) * math.tau) * p["drift"]
        y = p["y"] - phase * 24 + math.cos((t * 0.75 + p["phase"]) * math.tau) * 7
        radius = p["size"] * (0.7 + twinkle * 0.9)
        alpha = int(20 + twinkle * 105)
        color = (int(p["r"]), int(p["g"]), int(p["b"]), alpha)

        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
        if radius > 2.0:
            draw.line((x - 4 - pulse * 2, y, x + 4 + pulse * 2, y), fill=color, width=1)
            draw.line((x, y - 4 - pulse * 2, x, y + 4 + pulse * 2), fill=color, width=1)

    frame.alpha_composite(layer.filter(ImageFilter.GaussianBlur(0.45)))


def draw_eye_flare(
    frame: Image.Image,
    center: tuple[int, int],
    color: tuple[int, int, int],
    strength: float,
    *,
    length: int,
    angle: float = 0.0,
    t: float = 0.0,
    travel: int = 42,
    spread: float = 0.0,
    rays: int = 1,
) -> None:
    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    cx, cy = center

    draw.ellipse((cx - 3, cy - 3, cx + 3, cy + 3), fill=(255, 245, 230, int(120 * strength)))
    ray_count = max(1, rays)
    for ray_index in range(ray_count):
        offset = (ray_index - (ray_count - 1) / 2) * spread
        ray_angle = angle + offset
        ux = math.cos(ray_angle)
        uy = math.sin(ray_angle)

        for segment in range(2):
            phase = (t * 1.18 + segment * 0.5 + ray_index * 0.09) % 1.0
            envelope = math.sin(phase * math.pi) ** 1.35
            start = 5 + phase * travel
            span = length * (0.38 + (1 - phase) * 0.52)
            end = start + span
            alpha = int(168 * strength * envelope * (1 - segment * 0.18))
            if alpha <= 0:
                continue

            x1 = cx + ux * start
            y1 = cy + uy * start
            x2 = cx + ux * end
            y2 = cy + uy * end
            width = 3 if strength > 0.55 else 2
            draw.line((x1, y1, x2, y2), fill=color + (alpha,), width=width)
            draw.line((x1, y1, x2, y2), fill=(255, 245, 230, int(alpha * 0.58)), width=1)

    frame.alpha_composite(layer.filter(ImageFilter.GaussianBlur(1.05)))


def add_light_sweep(frame: Image.Image, logo_mask: Image.Image, t: float) -> None:
    progress = (t * 1.05 + 0.08) % 1.0
    intensity = max(0.0, math.sin(progress * math.pi))
    if intensity < 0.05:
        return

    sweep = Image.new("L", frame.size, 0)
    draw = ImageDraw.Draw(sweep)
    x = 260 + progress * 780
    draw.line((x - 72, 28, x + 66, 350), fill=int(165 * intensity), width=34)
    draw.line((x - 38, 35, x + 96, 340), fill=int(225 * intensity), width=5)
    sweep = sweep.filter(ImageFilter.GaussianBlur(13))
    sweep = ImageChops.multiply(sweep, logo_mask)
    overlay = Image.new("RGBA", frame.size, (205, 255, 255, 0))
    overlay.putalpha(sweep)
    frame.alpha_composite(overlay)


def add_text_glint(frame: Image.Image, text_mask: Image.Image, t: float) -> None:
    progress = (t * 1.22 + 0.02) % 1.0
    edge_fade = math.sin(progress * math.pi) ** 0.75
    sweep = Image.new("L", frame.size, 0)
    draw = ImageDraw.Draw(sweep)
    x = 360 + progress * 760
    draw.line((x - 54, 82, x + 82, 348), fill=int(220 * edge_fade), width=34)
    draw.line((x - 14, 92, x + 106, 336), fill=int(255 * edge_fade), width=7)
    draw.line((x + 54, 116, x + 122, 322), fill=int(160 * edge_fade), width=3)
    sweep = sweep.filter(ImageFilter.GaussianBlur(7))
    sweep = ImageChops.multiply(sweep, text_mask)

    glow = Image.new("RGBA", frame.size, (95, 252, 255, 0))
    glow.putalpha(scaled_alpha(sweep, 0.92))
    frame.alpha_composite(glow)

    core = Image.new("RGBA", frame.size, (255, 255, 245, 0))
    core.putalpha(scaled_alpha(sweep, 0.52))
    frame.alpha_composite(core)


def add_logo_glow(frame: Image.Image, logo_mask: Image.Image, t: float) -> None:
    pulse = 0.72 + 0.28 * math.sin((t + 0.08) * math.tau)
    aura_mask = logo_mask.filter(ImageFilter.GaussianBlur(18))
    aura = Image.new("RGBA", frame.size, (72, 235, 240, 0))
    aura.putalpha(scaled_alpha(aura_mask, 0.18 + pulse * 0.16))
    frame.alpha_composite(aura)

    edge = Image.new("RGBA", frame.size, (184, 255, 255, 0))
    edge.putalpha(scaled_alpha(logo_mask, 0.08 + pulse * 0.08))
    frame.alpha_composite(edge)


def load_support_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if SUPPORT_FONT.exists():
        return ImageFont.truetype(str(SUPPORT_FONT), size=size)
    return ImageFont.load_default()


def draw_support_text(frame: Image.Image, t: float) -> None:
    text = SUPPORT_TEXT
    font = load_support_font(42)
    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")

    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = frame.size[0] - text_w - 58
    y = frame.size[1] - text_h - 44
    pulse = 0.72 + 0.28 * math.sin((t + 0.18) * math.tau)

    draw.text((x + 2, y + 3), text, font=font, fill=(4, 9, 13, 205))
    draw.text((x, y), text, font=font, fill=(192, 252, 255, 205))

    glow = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow, "RGBA")
    glow_draw.text((x, y), text, font=font, fill=(65, 232, 238, int(96 * pulse)))
    frame.alpha_composite(glow.filter(ImageFilter.GaussianBlur(5.0)))
    frame.alpha_composite(layer)

    glint_progress = (t * 1.15 + 0.42) % 1.0
    glint_alpha = math.sin(glint_progress * math.pi) ** 1.2
    glint = Image.new("L", frame.size, 0)
    glint_draw = ImageDraw.Draw(glint)
    glint_x = x - 40 + glint_progress * (text_w + 80)
    glint_draw.line((glint_x - 20, y - 6, glint_x + 26, y + text_h + 8), fill=int(185 * glint_alpha), width=10)

    text_mask = Image.new("L", frame.size, 0)
    mask_draw = ImageDraw.Draw(text_mask)
    mask_draw.text((x, y), text, font=font, fill=255)
    glint = ImageChops.multiply(glint.filter(ImageFilter.GaussianBlur(3)), text_mask)
    glint_layer = Image.new("RGBA", frame.size, (255, 255, 245, 0))
    glint_layer.putalpha(glint)
    frame.alpha_composite(glint_layer)


def draw_moving_eye_highlight(
    frame: Image.Image,
    center: tuple[float, float],
    color: tuple[int, int, int],
    t: float,
    *,
    travel: float,
    angle: float,
    strength: float,
    phase: float = 0.0,
    radius: float = 4.0,
    streak: float = 34.0,
) -> None:
    progress = 0.5 + 0.5 * math.sin((t * 1.12 + phase) * math.tau)
    signed = progress * 2.0 - 1.0
    ux = math.cos(angle)
    uy = math.sin(angle)
    px = center[0] + ux * signed * travel * 0.5
    py = center[1] + uy * signed * travel * 0.5
    alpha = int(168 * strength * (0.72 + 0.28 * math.sin((t * 2.1 + phase) * math.tau) ** 2))

    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    draw.line(
        (px - ux * streak * 0.55, py - uy * streak * 0.55, px + ux * streak * 0.55, py + uy * streak * 0.55),
        fill=color + (alpha,),
        width=2,
    )
    draw.line(
        (px - ux * streak * 0.25, py - uy * streak * 0.25, px + ux * streak * 0.25, py + uy * streak * 0.25),
        fill=(255, 246, 226, int(alpha * 0.66)),
        width=1,
    )
    draw.ellipse((px - radius, py - radius, px + radius, py + radius), fill=color + (int(alpha * 0.62),))
    draw.ellipse((px - 1.4, py - 1.4, px + 1.4, py + 1.4), fill=(255, 255, 236, int(alpha * 0.92)))
    frame.alpha_composite(layer.filter(ImageFilter.GaussianBlur(0.8)))


def draw_right_eye_highlights(frame: Image.Image, t: float) -> None:
    draw_moving_eye_highlight(
        frame,
        (1153, 133),
        (118, 190, 255),
        t,
        travel=26,
        angle=0.14,
        strength=0.72,
        phase=0.08,
        radius=4.2,
        streak=40,
    )
    draw_moving_eye_highlight(
        frame,
        (1008, 297),
        (255, 82, 220),
        t,
        travel=122,
        angle=0.01,
        strength=0.82,
        phase=0.36,
        radius=5.0,
        streak=64,
    )
    draw_moving_eye_highlight(
        frame,
        (1099, 419),
        (238, 84, 150),
        t,
        travel=34,
        angle=0.24,
        strength=0.52,
        phase=0.64,
        radius=3.4,
        streak=30,
    )
    draw_moving_eye_highlight(
        frame,
        (697, 507),
        (255, 226, 120),
        t,
        travel=44,
        angle=-0.03,
        strength=0.66,
        phase=0.22,
        radius=3.8,
        streak=42,
    )


def make_deep_hand_asset(base: Image.Image) -> dict[str, object]:
    box = (205, 350, 565, 705)
    crop = np.asarray(base.crop(box), dtype=np.float32)
    mask = Image.new("L", (box[2] - box[0], box[3] - box[1]), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((72, 116, 326, 350), fill=220)
    draw.ellipse((-8, 82, 178, 320), fill=210)
    draw.ellipse((96, 22, 258, 162), fill=205)
    draw.ellipse((244, 82, 370, 254), fill=190)
    draw.polygon(((50, 178), (128, 94), (260, 112), (336, 218), (282, 344), (92, 330)), fill=215)
    mask = mask.filter(ImageFilter.GaussianBlur(16))
    return {
        "box": box,
        "crop": crop,
        "mask": np.asarray(mask, dtype=np.float32) / 255.0,
    }


def deep_hand_offset(t: float) -> tuple[float, float]:
    dx = math.sin((t + 0.08) * math.tau) * 2.8 + math.sin((t * 2.0 + 0.2) * math.tau) * 0.7
    dy = math.cos((t + 0.12) * math.tau) * 2.1
    return dx, dy


def sample_crop(crop: np.ndarray, x: np.ndarray, y: np.ndarray) -> np.ndarray:
    h, w, _ = crop.shape
    x = np.clip(x, 0, w - 1.001)
    y = np.clip(y, 0, h - 1.001)
    x0 = np.floor(x).astype(np.int32)
    y0 = np.floor(y).astype(np.int32)
    x1 = np.clip(x0 + 1, 0, w - 1)
    y1 = np.clip(y0 + 1, 0, h - 1)
    wx = (x - x0)[:, :, None]
    wy = (y - y0)[:, :, None]

    top = crop[y0, x0] * (1 - wx) + crop[y0, x1] * wx
    bottom = crop[y1, x0] * (1 - wx) + crop[y1, x1] * wx
    return top * (1 - wy) + bottom * wy


def apply_deep_hand_motion(frame: Image.Image, asset: dict[str, object], t: float) -> tuple[float, float]:
    box = asset["box"]
    crop = asset["crop"]
    mask = asset["mask"]
    assert isinstance(box, tuple)
    assert isinstance(crop, np.ndarray)
    assert isinstance(mask, np.ndarray)

    dx, dy = deep_hand_offset(t)
    h, w = mask.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)

    # The weighted source offset creates a tiny local warp instead of a hard cutout slide.
    strength = mask ** 1.25
    src_x = xx - dx * strength
    src_y = yy - dy * strength
    warped = sample_crop(crop, src_x, src_y)

    current = np.asarray(frame.crop(box), dtype=np.float32)
    alpha = (mask ** 0.85 * 0.94)[:, :, None]
    blended = current * (1 - alpha) + warped * alpha
    frame.paste(Image.fromarray(np.clip(blended, 0, 255).astype(np.uint8), "RGBA"), box)
    return dx, dy


def draw_deep_mouth_close(frame: Image.Image, t: float, offset: tuple[float, float]) -> None:
    close = (0.5 + 0.5 * math.sin((t * 1.35 + 0.18) * math.tau)) ** 1.25
    if close < 0.08:
        return

    ox, oy = offset
    ox *= 0.8
    oy *= 0.8
    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    alpha = int(148 * close)

    upper = [(392 + ox, 504 + oy), (446 + ox, 505 + oy), (441 + ox, 520 + oy), (400 + ox, 522 + oy)]
    lower = [(397 + ox, 533 + oy), (440 + ox, 528 + oy), (447 + ox, 518 + oy), (397 + ox, 521 + oy)]
    draw.polygon(upper, fill=(36, 80, 62, int(alpha * 1.08)))
    draw.polygon(lower, fill=(21, 50, 40, int(alpha * 0.96)))
    draw.line((399 + ox, 520 + oy, 444 + ox, 517 + oy), fill=(9, 21, 19, int(96 * close)), width=2)
    draw.arc((392 + ox, 499 + oy, 452 + ox, 538 + oy), 188, 348, fill=(78, 125, 103, int(58 * close)), width=1)

    left_upper = [(236 + ox, 546 + oy), (317 + ox, 542 + oy), (304 + ox, 560 + oy), (243 + ox, 566 + oy)]
    left_lower = [(240 + ox, 577 + oy), (302 + ox, 570 + oy), (317 + ox, 557 + oy), (238 + ox, 561 + oy)]
    draw.polygon(left_upper, fill=(34, 84, 64, int(alpha * 1.06)))
    draw.polygon(left_lower, fill=(18, 47, 37, int(alpha * 0.94)))
    draw.line((244 + ox, 562 + oy, 306 + ox, 558 + oy), fill=(7, 18, 16, int(130 * close)), width=2)
    draw.arc((234 + ox, 540 + oy, 320 + ox, 580 + oy), 190, 348, fill=(82, 146, 115, int(86 * close)), width=1)
    frame.alpha_composite(layer.filter(ImageFilter.GaussianBlur(0.45)))


def path_point(points: list[tuple[float, float]], distance: float) -> tuple[float, float]:
    remaining = distance
    for start, end in zip(points, points[1:]):
        sx, sy = start
        ex, ey = end
        seg = math.hypot(ex - sx, ey - sy)
        if remaining <= seg or seg == 0:
            ratio = 0 if seg == 0 else remaining / seg
            return sx + (ex - sx) * ratio, sy + (ey - sy) * ratio
        remaining -= seg
    return points[-1]


def draw_moving_path(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[float, float]],
    progress: float,
    span: float,
    color: tuple[int, int, int],
    alpha: int,
    width: int,
) -> tuple[float, float]:
    lengths = [math.hypot(ex - sx, ey - sy) for (sx, sy), (ex, ey) in zip(points, points[1:])]
    total = sum(lengths)
    head = progress * total
    start = max(0.0, head - span)
    samples = [path_point(points, start + (head - start) * step / 5) for step in range(6)]
    draw.line(samples, fill=color + (alpha,), width=width, joint="curve")
    return samples[-1]


def draw_environment_wisps(frame: Image.Image, t: float) -> None:
    top_paths = [
        ([(410, 54), (560, 24), (705, 40), (860, 22), (1030, 44), (1250, 18)], 0.00, 270),
        ([(540, 100), (710, 70), (900, 88), (1080, 62), (1295, 84)], 0.31, 220),
        ([(850, 32), (970, 10), (1105, 34), (1235, 20), (1350, 44)], 0.62, 180),
        ([(260, 108), (440, 84), (610, 96), (790, 72), (985, 94)], 0.78, 210),
    ]
    bottom_paths = [
        ([(430, 686), (590, 638), (735, 664), (885, 612), (1045, 648), (1250, 626)], 0.10, 285),
        ([(520, 708), (690, 684), (845, 708), (995, 660), (1215, 688)], 0.37, 230),
        ([(720, 608), (850, 574), (980, 594), (1130, 556), (1305, 586)], 0.66, 210),
        ([(375, 640), (525, 614), (680, 636), (840, 600), (1010, 618)], 0.84, 220),
    ]

    smoke = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    flare = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    smoke_draw = ImageDraw.Draw(smoke, "RGBA")
    flare_draw = ImageDraw.Draw(flare, "RGBA")

    def warped_path(
        path: list[tuple[float, float]],
        phase: float,
        *,
        x_amp: float,
        y_amp: float,
        speed: float,
    ) -> list[tuple[float, float]]:
        warped: list[tuple[float, float]] = []
        for point_index, (x, y) in enumerate(path):
            p = phase + point_index * 0.17
            warped.append(
                (
                    x + math.sin((t * speed + p) * math.tau) * x_amp,
                    y + math.cos((t * (speed * 0.82) + p * 1.3) * math.tau) * y_amp,
                )
            )
        return warped

    for path, phase, span in top_paths:
        progress = (t * 2.18 + phase) % 1.0
        fade = 0.35 + 0.65 * (math.sin(progress * math.pi) ** 0.72)
        warped = warped_path(path, phase, x_amp=34, y_amp=18, speed=1.28)
        if fade <= 0.05:
            continue
        end = draw_moving_path(smoke_draw, warped, progress, span, (44, 63, 128), int(118 * fade), 15)
        draw_moving_path(smoke_draw, warped, (progress + 0.18) % 1.0, span * 0.75, (26, 35, 80), int(72 * fade), 20)
        draw_moving_path(flare_draw, warped, progress, span * 0.55, (106, 174, 255), int(112 * fade), 4)
        draw_moving_path(flare_draw, warped, progress, span * 0.28, (196, 238, 255), int(78 * fade), 1)
        ex, ey = end
        flare_draw.ellipse((ex - 3, ey - 3, ex + 3, ey + 3), fill=(142, 205, 255, int(54 * fade)))

    for path, phase, span in bottom_paths:
        progress = (t * 2.34 + phase) % 1.0
        fade = 0.38 + 0.62 * (math.sin(progress * math.pi) ** 0.78)
        warped = warped_path(path, phase, x_amp=48, y_amp=24, speed=1.42)
        if fade <= 0.05:
            continue
        end = draw_moving_path(smoke_draw, warped, progress, span, (130, 34, 66), int(132 * fade), 17)
        draw_moving_path(smoke_draw, warped, (progress + 0.21) % 1.0, span * 0.70, (58, 16, 35), int(82 * fade), 22)
        draw_moving_path(flare_draw, warped, progress, span * 0.54, (255, 63, 121), int(126 * fade), 4)
        draw_moving_path(flare_draw, warped, progress, span * 0.26, (255, 162, 181), int(80 * fade), 1)
        ex, ey = end
        flare_draw.ellipse((ex - 3, ey - 3, ex + 3, ey + 3), fill=(255, 87, 130, int(58 * fade)))

    frame.alpha_composite(smoke.filter(ImageFilter.GaussianBlur(5.0)))
    frame.alpha_composite(flare.filter(ImageFilter.GaussianBlur(1.1)))


def make_painted_smoke_asset(
    base: Image.Image,
    box: tuple[int, int, int, int],
    strokes: list[tuple[list[tuple[int, int]], int]],
) -> dict[str, object]:
    crop = np.asarray(base.crop(box), dtype=np.float32)
    mask = Image.new("L", (box[2] - box[0], box[3] - box[1]), 0)
    draw = ImageDraw.Draw(mask)
    for points, width in strokes:
        draw.line(points, fill=220, width=width, joint="curve")
    mask = mask.filter(ImageFilter.GaussianBlur(18))
    return {
        "box": box,
        "crop": crop,
        "mask": np.asarray(mask, dtype=np.float32) / 255.0,
    }


def build_painted_smoke_assets(base: Image.Image) -> list[dict[str, object]]:
    return [
        make_painted_smoke_asset(
            base,
            (315, 0, 1280, 145),
            [
                ([(0, 126), (180, 78), (338, 96), (520, 62), (700, 92), (930, 44)], 62),
                ([(360, 34), (520, 54), (675, 28), (850, 42), (1030, 22)], 58),
                ([(610, 110), (755, 82), (920, 100), (1110, 78)], 50),
            ],
        ),
        make_painted_smoke_asset(
            base,
            (420, 555, 1280, 720),
            [
                ([(0, 130), (155, 86), (315, 108), (475, 60), (660, 94), (840, 68)], 68),
                ([(65, 155), (250, 132), (410, 154), (585, 114), (805, 140)], 54),
                ([(345, 34), (500, 58), (645, 26), (830, 52)], 50),
            ],
        ),
    ]


def apply_painted_smoke_motion(frame: Image.Image, asset: dict[str, object], t: float, phase: float) -> None:
    box = asset["box"]
    crop = asset["crop"]
    mask = asset["mask"]
    assert isinstance(box, tuple)
    assert isinstance(crop, np.ndarray)
    assert isinstance(mask, np.ndarray)

    h, w = mask.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    strength = mask ** 1.15
    drift_x = math.sin((t + phase) * math.tau) * 9.0
    drift_y = math.cos((t + phase * 1.7) * math.tau) * 4.0
    wave_x = np.sin((yy / max(1, h)) * math.tau * 2.4 + (t * 1.35 + phase) * math.tau) * 4.8
    wave_y = np.sin((xx / max(1, w)) * math.tau * 1.8 - (t * 1.10 + phase) * math.tau) * 2.8
    src_x = xx - (drift_x + wave_x) * strength
    src_y = yy - (drift_y + wave_y) * strength
    warped = sample_crop(crop, src_x, src_y)

    current = np.asarray(frame.crop(box), dtype=np.float32)
    alpha = (mask ** 0.85 * 0.82)[:, :, None]
    blended = current * (1 - alpha) + warped * alpha
    frame.paste(Image.fromarray(np.clip(blended, 0, 255).astype(np.uint8), "RGBA"), box)


def draw_hand_magic_flare(frame: Image.Image, t: float, offset: tuple[float, float]) -> None:
    ox, oy = offset
    paths = [
        ([(505, 386), (470, 411), (444, 451), (403, 480), (358, 507), (300, 552), (250, 590)], 0.18, 58),
    ]

    layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for path, phase, span in paths:
        shifted = [(x + ox * 0.75, y + oy * 0.75) for x, y in path]
        progress = (t * 1.32 + phase) % 1.0
        intensity = math.sin(progress * math.pi) ** 0.9
        if intensity <= 0.02:
            continue

        alpha = int(66 * intensity)
        draw_moving_path(draw, shifted, progress, span, (67, 255, 218), alpha, 2)
        draw_moving_path(draw, shifted, progress, span * 0.55, (230, 255, 248), int(alpha * 0.50), 1)

    frame.alpha_composite(layer.filter(ImageFilter.GaussianBlur(0.7)))


def generate_frames(base: Image.Image, frame_count: int) -> list[Image.Image]:
    size = base.size
    masks = {
        "cyan_glow": make_color_mask(
            base,
            lambda r, g, b: (r + g + b > 235) & (g > 72) & (b > 82) & (g + b > r * 1.65),
            blur=9,
            gain=1.25,
        ),
        "logo_sweep": make_color_mask(
            base,
            lambda r, g, b: (r + g + b > 300) & (g > 70) & (b > 70) & ((g >= r - 10) | (b >= r - 10)),
            bounds=(250, 28, 1088, 355),
            blur=2,
            gain=1.9,
        ),
        "text_glint": make_color_mask(
            base,
            lambda r, g, b: (r + g + b > 300) & (g > 70) & (b > 70) & ((g >= r - 10) | (b >= r - 10)),
            bounds=(250, 28, 1088, 355),
            blur=1,
            gain=2.25,
        ),
        "magenta_eye": make_color_mask(
            base,
            lambda r, g, b: (r > 122) & (b > 100) & (g < 92) & (r > g + 35) & (b > g + 30),
            bounds=(835, 205, 1115, 365),
            blur=10,
            gain=1.55,
        ),
        "red_eye": make_color_mask(
            base,
            lambda r, g, b: (r > 80) & (r > g + 34) & (r > b + 26),
            bounds=(70, 165, 230, 205),
            blur=8,
            gain=2.1,
        ),
        "blue_eye": make_color_mask(
            base,
            lambda r, g, b: (b > 88) & (b > r + 32) & (g > 48),
            bounds=(1090, 70, 1225, 180),
            blur=8,
            gain=1.8,
        ),
        "gold_eye": make_color_mask(
            base,
            lambda r, g, b: (r > 112) & (g > 84) & (b < 105) & (r > b + 35),
            bounds=(610, 430, 805, 565),
            blur=9,
            gain=1.75,
        ),
        "right_red_eye": make_color_mask(
            base,
            lambda r, g, b: (r > 70) & (r > g + 25) & (b > 45) & (b > g + 10),
            bounds=(1085, 350, 1255, 485),
            blur=8,
            gain=1.8,
        ),
        "hand_magic": make_color_mask(
            base,
            lambda r, g, b: (g > 90) & (b > 82) & (g > r + 18),
            bounds=(240, 300, 560, 650),
            blur=12,
            gain=1.7,
        ),
    }

    right_smoke = make_smoke_sprite((560, 560), (92, 38, 90), 31, density=26, blur=20)
    green_smoke = make_smoke_sprite((520, 410), (28, 96, 78), 47, density=20, blur=18)
    particles = build_particles()
    deep_hand_asset = make_deep_hand_asset(base)
    painted_smoke_assets = build_painted_smoke_assets(base)

    frames: list[Image.Image] = []
    for index in range(frame_count):
        t = index / frame_count
        wave = math.sin(t * math.tau)
        flicker = math.sin((t * 3.0 + 0.17) * math.tau) * 0.5 + 0.5
        slow = math.sin((t + 0.2) * math.tau) * 0.5 + 0.5
        frame = base.copy()
        deep_offset = apply_deep_hand_motion(frame, deep_hand_asset, t)
        for smoke_index, smoke_asset in enumerate(painted_smoke_assets):
            apply_painted_smoke_motion(frame, smoke_asset, t, phase=smoke_index * 0.37)

        paste_layer(frame, right_smoke, (775 + int(18 * math.sin((t + 0.45) * math.tau)), 110), 0.012 + flicker * 0.006)
        paste_layer(frame, green_smoke, (125 + int(14 * math.sin((t + 0.72) * math.tau)), 280), 0.010 + flicker * 0.006)

        frame = overlay_mask(frame, masks["cyan_glow"], (87, 249, 255), 0.13 + slow * 0.08)
        frame = overlay_mask(frame, masks["hand_magic"], (83, 255, 213), 0.18 + flicker * 0.17)
        frame = overlay_mask(frame, masks["magenta_eye"], (255, 70, 217), 0.31 + slow * 0.25)
        frame = overlay_mask(frame, masks["red_eye"], (255, 45, 29), 0.44 + flicker * 0.32)
        frame = overlay_mask(frame, masks["blue_eye"], (105, 181, 255), 0.34 + slow * 0.25)
        frame = overlay_mask(frame, masks["gold_eye"], (255, 223, 118), 0.31 + flicker * 0.22)
        frame = overlay_mask(frame, masks["right_red_eye"], (238, 84, 150), 0.26 + slow * 0.20)

        frame.alpha_composite(radial_glow(size, (1015, 286), (138, 34), (255, 76, 219), 0.035 + slow * 0.055))
        frame.alpha_composite(radial_glow(size, (438, 520), (190, 118), (61, 255, 208), 0.025 + flicker * 0.045))
        frame.alpha_composite(radial_glow(size, (678, 510), (64, 28), (255, 229, 121), 0.035 + flicker * 0.045))
        frame.alpha_composite(radial_glow(size, (156, 187), (64, 15), (255, 36, 26), 0.045 + flicker * 0.04))
        frame.alpha_composite(radial_glow(size, (1167, 126), (40, 16), (116, 184, 255), 0.045 + slow * 0.045))
        frame.alpha_composite(radial_glow(size, (1099, 419), (42, 19), (238, 84, 150), 0.028 + slow * 0.035))
        draw_deep_mouth_close(frame, t, deep_offset)
        draw_hand_magic_flare(frame, t, deep_offset)

        add_logo_glow(frame, masks["logo_sweep"], t)
        add_light_sweep(frame, masks["logo_sweep"], t)
        add_text_glint(frame, masks["text_glint"], t)
        draw_eye_flare(
            frame,
            (156, 187),
            (255, 30, 24),
            0.52 + flicker * 0.58,
            length=58,
            angle=math.pi - 0.02 + wave * 0.025,
            t=t,
            travel=66,
            spread=0.08,
            rays=2,
        )
        draw_eye_flare(
            frame,
            (1167, 126),
            (115, 182, 255),
            0.36 + slow * 0.48,
            length=34,
            angle=0.16 + wave * 0.035,
            t=t + 0.17,
            travel=38,
            spread=0.10,
            rays=2,
        )
        draw_eye_flare(
            frame,
            (1008, 297),
            (255, 78, 220),
            0.30 + slow * 0.42,
            length=72,
            angle=0.01 + wave * 0.02,
            t=t + 0.33,
            travel=78,
            spread=0.045,
            rays=2,
        )
        draw_eye_flare(
            frame,
            (696, 507),
            (255, 227, 126),
            0.24 + flicker * 0.35,
            length=34,
            angle=math.pi - 0.04 + wave * 0.025,
            t=t + 0.62,
            travel=40,
            spread=0.04,
            rays=1,
        )
        draw_right_eye_highlights(frame, t)
        draw_particles(frame, particles, t)
        draw_support_text(frame, t)

        frames.append(frame)

    return frames


def save_gif(frames: list[Image.Image], output: Path, duration_ms: int, colors: int) -> None:
    gif_frames = [
        frame.convert("RGB").convert(
            "P",
            palette=Image.Palette.ADAPTIVE,
            colors=colors,
            dither=Image.Dither.NONE,
        )
        for frame in frames
    ]
    gif_frames[0].save(
        output,
        save_all=True,
        append_images=gif_frames[1:],
        duration=duration_ms,
        loop=0,
        optimize=True,
        disposal=2,
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create subtle overlay animation for K_baner.png.")
    parser.add_argument("--src", type=Path, default=SRC)
    parser.add_argument("--webp", type=Path, default=OUT_WEBP)
    parser.add_argument("--gif", type=Path, default=OUT_GIF)
    parser.add_argument("--frames", type=int, default=48)
    parser.add_argument("--duration-ms", type=int, default=58)
    parser.add_argument("--gif-frame-step", type=int, default=2)
    parser.add_argument("--gif-colors", type=int, default=256)
    parser.add_argument("--skip-gif", action="store_true")
    parser.add_argument("--skip-webp", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    base = Image.open(args.src).convert("RGBA")
    frames = generate_frames(base, args.frames)

    if not args.skip_webp:
        args.webp.parent.mkdir(parents=True, exist_ok=True)
        frames[0].save(
            args.webp,
            save_all=True,
            append_images=frames[1:],
            duration=args.duration_ms,
            loop=0,
            quality=88,
            method=6,
            lossless=False,
        )

    if not args.skip_gif:
        args.gif.parent.mkdir(parents=True, exist_ok=True)
        step = max(1, args.gif_frame_step)
        gif_frames = frames[::step]
        save_gif(gif_frames, args.gif, args.duration_ms * step, args.gif_colors)


if __name__ == "__main__":
    main()
