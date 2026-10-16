"""
LF2 Character Animator - Layered Aseprite Builder
Generates native .aseprite files with separated layers (Body + FX) using Aseprite CLI and Lua.
"""

import os
import sys
import argparse
import subprocess

ASEPRITE_DEFAULT_PATH = r"C:\Program Files\Aseprite\Aseprite.exe"

def build_layered_aseprite(anim_name, frames_body, frames_fx, frame_waits, out_path, aseprite_exe=ASEPRITE_DEFAULT_PATH, width=399, height=150):
    if not os.path.exists(aseprite_exe):
        raise FileNotFoundError(f"Aseprite executable not found at: {aseprite_exe}")

    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    temp_lua = out_path + ".tmp.lua"

    lua_lines = [
        f"local spr = Sprite({width}, {height})",
        f"spr.filename = '{out_path.replace(chr(92), '/')}'",
        "local lBody = spr.layers[1]",
        "lBody.name = 'Character_Body'",
        "local lFX = spr:newLayer()",
        "lFX.name = 'FX_Effects'",
        ""
    ]

    count = len(frames_body)
    for i in range(count):
        b_path = frames_body[i].replace('\\', '/')
        f_path = frames_fx[i].replace('\\', '/') if i < len(frames_fx) else ""
        wait_val = frame_waits[i] if i < len(frame_waits) else 3
        dur_sec = wait_val * 0.0333333

        lua_lines.extend([
            f"if {i + 1} > #spr.frames then spr:newFrame() end",
            f"spr.frames[{i + 1}].duration = {dur_sec}",
            f"local ok_b, img_b = pcall(function() return Image{{ fromFile = '{b_path}' }} end)",
            f"if ok_b and img_b then spr:newCel(lBody, {i + 1}, img_b, Point(0, 0)) end",
        ])

        if f_path and os.path.exists(f_path):
            lua_lines.extend([
                f"local ok_f, img_f = pcall(function() return Image{{ fromFile = '{f_path}' }} end)",
                f"if ok_f and img_f then spr:newCel(lFX, {i + 1}, img_f, Point(0, 0)) end",
            ])

    lua_lines.extend([
        f"local tag = spr:newTag(1, {count})",
        f"tag.name = '{anim_name.upper()}'",
        "tag.color = Color{ r=230, g=57, b=70 }",
        f"spr:saveAs(spr.filename)",
        f"print('Successfully created layered .aseprite: ' .. spr.filename)"
    ])

    with open(temp_lua, "w", encoding="utf-8") as f:
        f.write("\n".join(lua_lines))

    res = subprocess.run([aseprite_exe, "-b", "--script", temp_lua], capture_output=True, text=True)
    if os.path.exists(temp_lua):
        os.remove(temp_lua)

    if res.returncode != 0:
        print(f"Error building Aseprite file: {res.stderr}", file=sys.stderr)
        return False
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build layered Aseprite files from Body and FX frames")
    parser.add_argument("--name", required=True, help="Animation Name")
    parser.add_argument("--body-dir", required=True, help="Directory containing body frames")
    parser.add_argument("--fx-dir", required=True, help="Directory containing FX frames")
    parser.add_argument("--waits", required=True, help="Comma-separated LF2 wait tick values")
    parser.add_argument("--out", required=True, help="Output .aseprite filepath")
    parser.add_argument("--width", type=int, default=399, help="Canvas width")
    parser.add_argument("--height", type=int, default=150, help="Canvas height")

    args = parser.parse_args()
    b_files = sorted([os.path.join(args.body_dir, f) for f in os.listdir(args.body_dir) if f.endswith(".png")])
    f_files = sorted([os.path.join(args.fx_dir, f) for f in os.listdir(args.fx_dir) if f.endswith(".png")])
    w_vals = [int(x.strip()) for x in args.waits.split(",")]

    success = build_layered_aseprite(args.name, b_files, f_files, w_vals, args.out, width=args.width, height=args.height)
    if success:
        print(f"Done! Created: {args.out}")
    else:
        sys.exit(1)
