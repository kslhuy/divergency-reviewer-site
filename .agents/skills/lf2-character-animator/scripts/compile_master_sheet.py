"""
LF2 Character Animator - Master Spritesheet Compiler
Assembles Composite, Body Only, and FX Only spritesheets from frame sequences.
"""

import os
import sys
import argparse
from PIL import Image

def compile_sheets(suite_frames_dir, out_dir, anim_keys, width=399, height=150):
    os.makedirs(out_dir, exist_ok=True)
    
    # Calculate max frames
    max_frames = 0
    for a in anim_keys:
        c_dir = os.path.join(suite_frames_dir, a, "composite")
        if os.path.exists(c_dir):
            count = len([f for f in os.listdir(c_dir) if f.endswith(".png")])
            if count > max_frames:
                max_frames = count

    sheet_w = width * max_frames
    sheet_h = height * len(anim_keys)

    sheet_comp = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))
    sheet_body = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))
    sheet_fx = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))

    for r_idx, a_name in enumerate(anim_keys):
        c_dir = os.path.join(suite_frames_dir, a_name, "composite")
        b_dir = os.path.join(suite_frames_dir, a_name, "body")
        f_dir = os.path.join(suite_frames_dir, a_name, "fx")

        if not os.path.exists(c_dir):
            continue

        c_files = sorted([f for f in os.listdir(c_dir) if f.endswith(".png")])
        for c_idx, fname in enumerate(c_files):
            x = c_idx * width
            y = r_idx * height

            c_im = Image.open(os.path.join(c_dir, fname))
            b_im = Image.open(os.path.join(b_dir, fname))
            f_im = Image.open(os.path.join(f_dir, fname))

            sheet_comp.paste(c_im, (x, y), c_im)
            sheet_body.paste(b_im, (x, y), b_im)
            sheet_fx.paste(f_im, (x, y), f_im)

    p_comp = os.path.join(out_dir, "Master_All_Attacks_Composite.png")
    p_body = os.path.join(out_dir, "Master_Body_Only.png")
    p_fx = os.path.join(out_dir, "Master_FX_Only.png")

    sheet_comp.save(p_comp)
    sheet_body.save(p_body)
    sheet_fx.save(p_fx)

    print(f"Exported Composite Sheet: {p_comp}")
    print(f"Exported Body Sheet: {p_body}")
    print(f"Exported FX Sheet: {p_fx}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compile master spritesheets")
    parser.add_argument("--frames-dir", required=True, help="Base frames directory containing animation subfolders")
    parser.add_argument("--out-dir", required=True, help="Output directory for generated sheets")
    parser.add_argument("--anims", required=True, help="Comma-separated list of animation keys in row order")
    parser.add_argument("--width", type=int, default=399, help="Frame width")
    parser.add_argument("--height", type=int, default=150, help="Frame height")

    args = parser.parse_args()
    keys = [k.strip() for k in args.anims.split(",")]
    compile_sheets(args.frames_dir, args.out_dir, keys, width=args.width, height=args.height)
