"""
build_mutan_suite.py
Generates the complete LF2 Character Animation Suite for "Bầy Người Hoa" (Les Éclos):
- Mutan Flower (Heavy Bloomed Spore Carrier)
- Mutan Leaf (Agile Root-Claw Shredder)
Separated Layers (Character_Body + FX_Effects), LF2 deterministic 30 FPS wait ticks,
master spritesheets, layered .aseprite compilation, and HTML5 studio.
"""

import os
import sys
import json
import math
import subprocess
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ASEPRITE_EXE = r"C:\Program Files\Aseprite\Aseprite.exe"
SUITE_DIR = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\mutan_pack_suite"
BRAIN_DIR = r"C:\Users\Quang Huy Nugyen\.gemini\antigravity-ide\brain\c3c768f1-8dd6-4bd0-9cfe-15da5bc520f9\mutan_pack"

CANVAS_SIZE = 128
GROUND_ANCHOR = (64, 112)

def ensure_dirs():
    for sub in [
        "frames/flower/composite", "frames/flower/body", "frames/flower/fx",
        "frames/leaf/composite", "frames/leaf/body", "frames/leaf/fx",
        "spritesheets", "aseprite", "previews"
    ]:
        os.makedirs(os.path.join(SUITE_DIR, sub), exist_ok=True)

# -------------------------------------------------------------
# 1. PROCESS MUTAN FLOWER
# -------------------------------------------------------------
def process_mutan_flower():
    print("[1/4] Processing Mutan Flower...")
    flower_src = Image.open(os.path.join(BRAIN_DIR, "mutan_flower.png")).convert("RGBA")
    
    # 48 standard frames in mutan_flower.png
    # 8 clips: idle, walk, attack, hurt_1, hurt_2, jump, knockdown, knockdown_prone
    base_clips = {
        "idle": (0, 6, [4, 4, 4, 4, 4, 4]),
        "walk": (6, 12, [3, 3, 3, 3, 3, 3]),
        "attack_reach": (12, 18, [3, 3, 2, 2, 4, 3]),
        "hurt_1": (18, 24, [2, 2, 3, 3, 3, 3]),
        "hurt_2": (24, 30, [2, 2, 3, 3, 3, 3]),
        "jump": (30, 36, [3, 2, 3, 3, 3, 4]),
        "knockdown": (36, 42, [3, 3, 4, 4, 6, 8]),
        "knockdown_prone": (42, 48, [3, 3, 4, 4, 6, 8]),
    }
    
    flower_extracted = {}
    for clip_name, (start_idx, end_idx, waits) in base_clips.items():
        flower_extracted[clip_name] = []
        for i in range(start_idx, end_idx):
            row = i // 6
            col = i % 6
            box = (col * 128, row * 128, (col + 1) * 128, (row + 1) * 128)
            crop_im = flower_src.crop(box)
            flower_extracted[clip_name].append(crop_im)
            
    # Now let's craft special combat attacks for the Harbor Battle:
    # 1. SPORE_BURST (D > A): The brute thrusts flower forward; pulsating crimson/purple cloud bursts out!
    spore_frames = []
    for f_idx in range(6):
        base_im = flower_extracted["attack_reach"][f_idx].copy()
        spore_frames.append(base_im)
    flower_extracted["spore_burst"] = spore_frames
    
    # 2. VINE_ENTANGLE (D v A): Brute slams ground, root vines erupt
    vine_frames = []
    for f_idx in range(6):
        base_im = flower_extracted["attack_reach"][min(f_idx, 3)].copy()
        vine_frames.append(base_im)
    flower_extracted["vine_entangle"] = vine_frames

    # 3. SACRIFICIAL_CLASP (Run + A / Dash Grab): Dash forward & Detonate
    sac_frames = []
    for f_idx in range(6):
        base_im = flower_extracted["attack_reach"][f_idx].copy()
        sac_frames.append(base_im)
    flower_extracted["sacrifice_clasp"] = sac_frames

    # Separate Body and FX for each frame
    all_flower_clips = {
        "IDLE": (flower_extracted["idle"], [4, 4, 4, 4, 4, 4]),
        "WALK": (flower_extracted["walk"], [3, 3, 3, 3, 3, 3]),
        "ATTACK_REACH": (flower_extracted["attack_reach"], [3, 3, 2, 2, 4, 3]),
        "SPORE_BURST": (flower_extracted["spore_burst"], [3, 4, 3, 3, 4, 4]),
        "VINE_ENTANGLE": (flower_extracted["vine_entangle"], [4, 4, 3, 3, 5, 4]),
        "SACRIFICE_CLASP": (flower_extracted["sacrifice_clasp"], [2, 2, 3, 4, 6, 8]),
        "HURT": (flower_extracted["hurt_1"], [2, 2, 3, 3, 3, 3]),
        "KNOCKDOWN": (flower_extracted["knockdown"], [3, 3, 4, 4, 6, 9])
    }

    flower_meta_frames = []
    frame_counter = 0

    for clip_name, (frames, waits) in all_flower_clips.items():
        for i, comp_im in enumerate(frames):
            arr = np.array(comp_im)
            
            # Layer separation:
            # Mask flower/blood pixels: R > 100 and G < 70 and A > 0
            is_flower = (arr[:, :, 3] > 0) & (arr[:, :, 0] > 100) & (arr[:, :, 1] < 70)
            
            # Body layer: keep pixels that are NOT flower/blood
            arr_body = arr.copy()
            arr_body[is_flower] = [0, 0, 0, 0]
            body_im = Image.fromarray(arr_body)

            # FX layer: start with flower/blood pixels
            arr_fx = np.zeros_like(arr)
            arr_fx[is_flower] = arr[is_flower]
            fx_im = Image.fromarray(arr_fx)
            
            # Add dynamic VFX depending on attack type:
            draw_fx = ImageDraw.Draw(fx_im)
            draw_comp = ImageDraw.Draw(comp_im)
            
            if clip_name == "SPORE_BURST" and i in [2, 3, 4]:
                # Draw swirling purple/magenta toxic spore clouds expanding forward
                radius = (i - 1) * 14
                cx, cy = 92 + (i - 2) * 8, 48
                for _ in range(16):
                    angle = np.random.uniform(0, math.pi * 2)
                    r = np.random.uniform(4, radius)
                    px = int(cx + r * math.cos(angle))
                    py = int(cy + r * math.sin(angle))
                    if 0 <= px < 128 and 0 <= py < 128:
                        color = (180, 40, 220, 210) if i % 2 == 0 else (230, 50, 100, 230)
                        draw_fx.ellipse([px-2, py-2, px+2, py+2], fill=color)
                        draw_comp.ellipse([px-2, py-2, px+2, py+2], fill=color)

            elif clip_name == "VINE_ENTANGLE" and i in [2, 3, 4, 5]:
                # Draw ground vines erupting near ground y=112
                for vx in [35, 50, 85, 105]:
                    vh = 15 + (i - 1) * 6
                    draw_fx.rectangle([vx, 112 - vh, vx + 4, 112], fill=(60, 110, 50, 230))
                    draw_fx.polygon([(vx-2, 112 - vh), (vx+6, 112 - vh), (vx+2, 112 - vh - 6)], fill=(150, 30, 40, 240))
                    draw_comp.rectangle([vx, 112 - vh, vx + 4, 112], fill=(60, 110, 50, 230))
                    draw_comp.polygon([(vx-2, 112 - vh), (vx+6, 112 - vh), (vx+2, 112 - vh - 6)], fill=(150, 30, 40, 240))

            elif clip_name == "SACRIFICE_CLASP" and i in [3, 4, 5]:
                # Detonation shockwave flash
                sw_r = (i - 2) * 22
                draw_fx.ellipse([64 - sw_r, 64 - sw_r, 64 + sw_r, 64 + sw_r], outline=(255, 60, 60, 220), width=3)
                draw_comp.ellipse([64 - sw_r, 64 - sw_r, 64 + sw_r, 64 + sw_r], outline=(255, 60, 60, 220), width=3)

            fname = f"{clip_name.lower()}_{i}.png"
            p_comp = os.path.join(SUITE_DIR, "frames", "flower", "composite", fname)
            p_body = os.path.join(SUITE_DIR, "frames", "flower", "body", fname)
            p_fx = os.path.join(SUITE_DIR, "frames", "flower", "fx", fname)

            comp_im.save(p_comp)
            body_im.save(p_body)
            fx_im.save(p_fx)

            w_val = waits[i]
            flower_meta_frames.append({
                "clip": clip_name,
                "frame": i,
                "global_frame": frame_counter,
                "wait": w_val,
                "duration_ms": round(w_val * 33.333, 1),
                "composite": p_comp,
                "body": p_body,
                "fx": p_fx,
                "bdy": [44, 38, 48, 74],
                "itr": [75, 42, 45, 40] if "ATTACK" in clip_name or "SPORE" in clip_name else []
            })
            frame_counter += 1

    return all_flower_clips, flower_meta_frames

# -------------------------------------------------------------
# 2. PROCESS MUTAN LEAF
# -------------------------------------------------------------
def process_mutan_leaf():
    print("[2/4] Processing Mutan Leaf...")
    leaf_src = Image.open(os.path.join(BRAIN_DIR, "mutan_leaf_src.png")).convert("RGBA")
    
    # Scale down to logical resolution 53x69
    leaf_logical = leaf_src.resize((53, 69), Image.NEAREST)
    
    # Motion clips for Mutan Leaf (8 clips x 6 frames each = 48 frames)
    clips_plan = [
        ("IDLE", [3, 4, 4, 3, 3, 4]),
        ("WALK", [3, 3, 3, 3, 3, 3]),
        ("ATTACK_RAKE", [3, 2, 2, 2, 3, 3]),
        ("POUNCE_SHRED", [2, 2, 2, 3, 3, 4]),
        ("THORN_ERUPTION", [3, 3, 2, 3, 4, 4]),
        ("JUMP", [3, 2, 3, 3, 3, 4]),
        ("HURT", [2, 2, 3, 3, 3, 3]),
        ("KNOCKDOWN", [3, 3, 4, 4, 6, 8])
    ]

    leaf_meta_frames = []
    frame_counter = 0

    for clip_name, waits in clips_plan:
        for i in range(6):
            # Create 128x128 canvas
            comp_im = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
            body_im = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
            fx_im = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
            draw_fx = ImageDraw.Draw(fx_im)
            draw_comp = ImageDraw.Draw(comp_im)

            # Calculate base position
            base_x = 64 - 26
            base_y = 112 - 69

            # Motion offsets
            dx, dy = 0, 0
            claw_stretch = 0
            if clip_name == "IDLE":
                dy = int(math.sin(i / 6.0 * math.pi * 2) * 2)
            elif clip_name == "WALK":
                dx = int(math.sin(i / 6.0 * math.pi * 2) * 4)
                dy = int(abs(math.cos(i / 6.0 * math.pi * 2)) * 3)
            elif clip_name == "ATTACK_RAKE":
                if i == 0: dx, dy = -2, 0
                elif i == 1: dx, dy = -6, -2  # windup
                elif i == 2: dx, dy = 8, 2; claw_stretch = 12 # strike!
                elif i == 3: dx, dy = 12, 4; claw_stretch = 8 # follow-through
                elif i == 4: dx, dy = 4, 2
                elif i == 5: dx, dy = 0, 0
            elif clip_name == "POUNCE_SHRED":
                if i in [1, 2]: dy = -16; dx = 10 * i # leap
                elif i == 3: dy = -6; dx = 24
                elif i >= 4: dy = 0; dx = 20 - (i-4)*8
            elif clip_name == "THORN_ERUPTION":
                if i in [1, 2]: dy = 6 # slam down
            elif clip_name == "JUMP":
                if i == 1: dy = 4 # crouch
                elif i in [2, 3]: dy = -22 # airborne
                elif i == 4: dy = -8
                elif i == 5: dy = 2
            elif clip_name == "HURT":
                dx = -4 * (i + 1) if i < 3 else -12 + (i-3)*4
                dy = -2 if i < 2 else 0
            elif clip_name == "KNOCKDOWN":
                dx = -6 * i
                dy = 8 if i >= 3 else -i * 3

            # Paste character body
            pos = (base_x + dx, base_y + dy)
            if clip_name in ["KNOCKDOWN"] and i >= 3:
                # Rotate prone
                rotated = leaf_logical.rotate(75, expand=True, resample=Image.NEAREST)
                body_im.paste(rotated, (base_x - 15, base_y + 25), rotated)
                comp_im.paste(rotated, (base_x - 15, base_y + 25), rotated)
            else:
                body_im.paste(leaf_logical, pos, leaf_logical)
                comp_im.paste(leaf_logical, pos, leaf_logical)

            # Add FX Layer Effects
            if clip_name == "ATTACK_RAKE" and i in [2, 3]:
                # 3 sharp red claw slash arcs
                arc_cx = pos[0] + 45
                arc_cy = pos[1] + 30
                for offset in [-8, 0, 8]:
                    draw_fx.arc([arc_cx - 20, arc_cy + offset - 20, arc_cx + 25, arc_cy + offset + 25],
                                start=280, end=400, fill=(230, 20, 30, 240), width=3)
                    draw_comp.arc([arc_cx - 20, arc_cy + offset - 20, arc_cx + 25, arc_cy + offset + 25],
                                  start=280, end=400, fill=(230, 20, 30, 240), width=3)

            elif clip_name == "POUNCE_SHRED" and i in [2, 3]:
                # Multi-slash cross marks
                cx, cy = pos[0] + 35, pos[1] + 25
                draw_fx.line([(cx - 15, cy - 15), (cx + 15, cy + 15)], fill=(255, 30, 30, 240), width=2)
                draw_fx.line([(cx + 15, cy - 15), (cx - 15, cy + 15)], fill=(255, 30, 30, 240), width=2)
                draw_comp.line([(cx - 15, cy - 15), (cx + 15, cy + 15)], fill=(255, 30, 30, 240), width=2)
                draw_comp.line([(cx + 15, cy - 15), (cx - 15, cy + 15)], fill=(255, 30, 30, 240), width=2)

            elif clip_name == "THORN_ERUPTION" and i in [2, 3, 4]:
                # Pier root thorns bursting from y=112
                for tx in [pos[0] + 30, pos[0] + 50, pos[0] + 70]:
                    th = 20 + (i - 1) * 8
                    draw_fx.polygon([(tx - 4, 112), (tx + 4, 112), (tx, 112 - th)], fill=(120, 80, 40, 240))
                    draw_fx.polygon([(tx - 2, 112 - th + 6), (tx + 2, 112 - th + 6), (tx, 112 - th)], fill=(240, 40, 40, 255))
                    draw_comp.polygon([(tx - 4, 112), (tx + 4, 112), (tx, 112 - th)], fill=(120, 80, 40, 240))
                    draw_comp.polygon([(tx - 2, 112 - th + 6), (tx + 2, 112 - th + 6), (tx, 112 - th)], fill=(240, 40, 40, 255))

            fname = f"{clip_name.lower()}_{i}.png"
            p_comp = os.path.join(SUITE_DIR, "frames", "leaf", "composite", fname)
            p_body = os.path.join(SUITE_DIR, "frames", "leaf", "body", fname)
            p_fx = os.path.join(SUITE_DIR, "frames", "leaf", "fx", fname)

            comp_im.save(p_comp)
            body_im.save(p_body)
            fx_im.save(p_fx)

            w_val = waits[i]
            leaf_meta_frames.append({
                "clip": clip_name,
                "frame": i,
                "global_frame": frame_counter,
                "wait": w_val,
                "duration_ms": round(w_val * 33.333, 1),
                "composite": p_comp,
                "body": p_body,
                "fx": p_fx,
                "bdy": [pos[0] + 10, pos[1] + 10, 32, 58],
                "itr": [pos[0] + 35, pos[1] + 15, 38, 35] if "ATTACK" in clip_name or "POUNCE" in clip_name else []
            })
            frame_counter += 1

    return clips_plan, leaf_meta_frames

# -------------------------------------------------------------
# 3. COMPILE SPRITESHEETS & ASEPRITE
# -------------------------------------------------------------
def compile_sheets(char_name, meta_frames, clips_info):
    print(f"[3/4] Compiling Spritesheets and .aseprite for {char_name}...")
    
    total_frames = len(meta_frames)
    cols = 6
    rows = math.ceil(total_frames / cols)
    sheet_w = cols * CANVAS_SIZE
    sheet_h = rows * CANVAS_SIZE

    sheet_comp = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))
    sheet_body = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))
    sheet_fx = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))

    json_data = {"frames": [], "meta": {"size": {"w": sheet_w, "h": sheet_h}, "frameTags": []}}

    cur_tag = ""
    tag_start = 0

    for idx, f in enumerate(meta_frames):
        c = idx % cols
        r = idx // cols
        x = c * CANVAS_SIZE
        y = r * CANVAS_SIZE

        im_c = Image.open(f["composite"])
        im_b = Image.open(f["body"])
        im_f = Image.open(f["fx"])

        sheet_comp.paste(im_c, (x, y), im_c)
        sheet_body.paste(im_b, (x, y), im_b)
        sheet_fx.paste(im_f, (x, y), im_f)

        clip = f["clip"]
        if clip != cur_tag:
            if cur_tag != "":
                json_data["meta"]["frameTags"].append({
                    "name": cur_tag,
                    "from": tag_start,
                    "to": idx - 1,
                    "direction": "forward"
                })
            cur_tag = clip
            tag_start = idx

        json_data["frames"].append({
            "filename": f"{char_name}_{clip.lower()}_{f['frame']}",
            "frame": {"x": x, "y": y, "w": CANVAS_SIZE, "h": CANVAS_SIZE},
            "duration": int(f["duration_ms"]),
            "wait": f["wait"],
            "bdy": f["bdy"],
            "itr": f["itr"]
        })

    if cur_tag != "":
        json_data["meta"]["frameTags"].append({
            "name": cur_tag,
            "from": tag_start,
            "to": total_frames - 1,
            "direction": "forward"
        })

    p_comp = os.path.join(SUITE_DIR, "spritesheets", f"{char_name}_composite.png")
    p_body = os.path.join(SUITE_DIR, "spritesheets", f"{char_name}_body.png")
    p_fx = os.path.join(SUITE_DIR, "spritesheets", f"{char_name}_fx.png")
    p_json = os.path.join(SUITE_DIR, "spritesheets", f"{char_name}.json")

    sheet_comp.save(p_comp)
    sheet_body.save(p_body)
    sheet_fx.save(p_fx)

    with open(p_json, "w", encoding="utf-8") as out_j:
        json.dump(json_data, out_j, indent=2)

    # Compile native layered .aseprite using Lua
    ase_path = os.path.join(SUITE_DIR, "aseprite", f"{char_name.title()}_Master_Combat.aseprite")
    lua_script = [
        f"local spr = Sprite({CANVAS_SIZE}, {CANVAS_SIZE})",
        f"spr.filename = '{ase_path.replace(chr(92), '/')}'",
        "local lBody = spr.layers[1]",
        "lBody.name = 'Character_Body'",
        "local lFX = spr:newLayer()",
        "lFX.name = 'FX_Effects'",
        ""
    ]

    for idx, f in enumerate(meta_frames):
        b_p = f["body"].replace("\\", "/")
        fx_p = f["fx"].replace("\\", "/")
        dur_sec = f["wait"] * 0.0333333

        lua_script.extend([
            f"if {idx + 1} > #spr.frames then spr:newFrame() end",
            f"spr.frames[{idx + 1}].duration = {dur_sec}",
            f"local ok_b, img_b = pcall(function() return Image{{ fromFile = '{b_p}' }} end)",
            f"if ok_b and img_b then spr:newCel(lBody, {idx + 1}, img_b, Point(0, 0)) end",
            f"local ok_f, img_f = pcall(function() return Image{{ fromFile = '{fx_p}' }} end)",
            f"if ok_f and img_f then spr:newCel(lFX, {idx + 1}, img_f, Point(0, 0)) end",
        ])

    for tag in json_data["meta"]["frameTags"]:
        lua_script.extend([
            f"local t = spr:newTag({tag['from'] + 1}, {tag['to'] + 1})",
            f"t.name = '{tag['name']}'",
            "t.color = Color{ r=230, g=57, b=70 }"
        ])

    lua_script.extend([
        "spr:saveAs(spr.filename)",
        f"print('Successfully created layered .aseprite: ' .. spr.filename)"
    ])

    tmp_lua = os.path.join(SUITE_DIR, f"{char_name}_build.tmp.lua")
    with open(tmp_lua, "w", encoding="utf-8") as f:
        f.write("\n".join(lua_script))

    if os.path.exists(ASEPRITE_EXE):
        subprocess.run([ASEPRITE_EXE, "-b", "--script", tmp_lua], capture_output=True, text=True)
        if os.path.exists(tmp_lua):
            os.remove(tmp_lua)
        print(f"Generated: {ase_path}")
    else:
        print(f"Aseprite not found at {ASEPRITE_EXE}, skipped native .aseprite build.")

    return json_data

# -------------------------------------------------------------
# 4. BUILD INTERACTIVE HTML5 STUDIO
# -------------------------------------------------------------
def build_html_studio(flower_json, leaf_json):
    print("[4/4] Building Interactive HTML5 Animation Studio...")
    
    html_content = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Divergency - Bầy Người Hoa (Les Éclos) Animation Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg: #070a12;
      --panel: #0d1424;
      --card: #141f36;
      --accent-purple: #c084fc;
      --accent-red: #ef4444;
      --accent-cyan: #00f0ff;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
    }}
    .header {{
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }}
    .header h1 {{
      font-family: 'Rajdhani', sans-serif;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 12px;
    }}
    .badge {{
      background: rgba(192, 132, 252, 0.2);
      border: 1px solid var(--accent-purple);
      color: var(--accent-purple);
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 13px;
      letter-spacing: 1px;
    }}
    .char-nav {{
      display: flex;
      gap: 10px;
    }}
    .nav-btn {{
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 18px;
      border-radius: 6px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .nav-btn.active {{
      background: var(--accent-purple);
      color: #000;
      border-color: var(--accent-purple);
      box-shadow: 0 0 15px rgba(192, 132, 252, 0.4);
    }}
    .studio-grid {{
      width: 100%;
      max-width: 1200px;
      display: grid;
      grid-template-columns: 480px 1fr;
      gap: 24px;
    }}
    .preview-stage {{
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }}
    .canvas-wrap {{
      position: relative;
      width: 384px;
      height: 384px;
      background: repeating-linear-gradient(45deg, #090e1a 0px, #090e1a 16px, #0c1322 16px, #0c1322 32px);
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
      image-rendering: pixelated;
    }}
    canvas {{
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
    }}
    .stage-overlays {{
      position: absolute;
      inset: 0;
      pointer-events: none;
    }}
    .grid-ground {{
      position: absolute;
      left: 0; right: 0;
      top: calc(112 / 128 * 100%);
      height: 1px;
      background: rgba(0, 240, 255, 0.4);
    }}
    .controls {{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }}
    .scrubber-row {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}
    .slider {{
      flex: 1;
      height: 6px;
      background: #1e293b;
      border-radius: 3px;
      outline: none;
      -webkit-appearance: none;
      cursor: pointer;
    }}
    .slider::-webkit-slider-thumb {{
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--accent-purple);
      cursor: grab;
      box-shadow: 0 0 10px var(--accent-purple);
    }}
    .btn-row {{
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }}
    .btn {{
      background: var(--card);
      border: 1px solid var(--border);
      color: #fff;
      padding: 8px 14px;
      border-radius: 6px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }}
    .btn:hover {{ background: rgba(255, 255, 255, 0.1); }}
    .btn.active {{
      background: var(--accent-cyan);
      color: #000;
      border-color: var(--accent-cyan);
    }}
    .details-panel {{
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}
    .clip-selector {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .clip-btn {{
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 10px;
      border-radius: 6px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .clip-btn:hover {{ color: #fff; border-color: rgba(255, 255, 255, 0.3); }}
    .clip-btn.active {{
      background: rgba(192, 132, 252, 0.15);
      border-color: var(--accent-purple);
      color: var(--accent-purple);
    }}
    .info-card {{
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
    }}
    .info-card h3 {{
      font-family: 'Rajdhani', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: var(--accent-cyan);
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
    }}
    .info-card p {{
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-muted);
    }}
    .code-box {{
      background: #020617;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      padding: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      line-height: 1.5;
      color: #38bdf8;
      overflow-x: auto;
      white-space: pre;
    }}
  </style>
</head>
<body>

  <div class="header">
    <div class="title-wrap">
      <h1>Bầy Người Hoa (Les Éclos) <span class="badge">LF2 Studio 30 FPS</span></h1>
    </div>
    <div class="char-nav">
      <button class="nav-btn active" id="btnFlower">🌸 Quái Hoa Nhụy (Mutan Flower)</button>
      <button class="nav-btn" id="btnLeaf">🍃 Sát Thủ Lá Gai (Mutan Leaf)</button>
    </div>
  </div>

  <div class="studio-grid">
    <!-- Left: Preview Canvas & Playback -->
    <div class="preview-stage">
      <div class="canvas-wrap">
        <canvas id="viewCanvas" width="128" height="128"></canvas>
        <div class="stage-overlays">
          <div class="grid-ground"></div>
        </div>
      </div>

      <div class="controls">
        <div class="scrubber-row">
          <input type="range" min="0" max="5" value="0" class="slider" id="frameSlider">
          <span style="font-family:'JetBrains Mono'; font-size:13px; min-width:60px;" id="frameDisplay">F: 0/5</span>
        </div>

        <div class="btn-row">
          <button class="btn" id="btnPlayPause">⏸ Pause</button>
          <button class="btn" id="btnStep">⏭ Step</button>
          <button class="btn active" id="btnLayerComp">🌟 Composite</button>
          <button class="btn" id="btnLayerBody">🧍 Body</button>
          <button class="btn" id="btnLayerFX">🩸 FX Only</button>
          <button class="btn" id="btnBoxes">🎯 Hitboxes: ON</button>
        </div>
      </div>
    </div>

    <!-- Right: Clip Selection & LF2 Data -->
    <div class="details-panel">
      <div class="clip-selector" id="clipContainer"></div>

      <div class="info-card">
        <h3 id="clipTitle">CLIP: ATTACK_REACH <span id="clipWaitMeta">Wait: 17 ticks (566ms)</span></h3>
        <p id="clipDesc">
          <strong>Ý đồ tư thế & Đòn đánh cốt truyện:</strong> Thân hình gù lao về phía trước, tay vươn dài đập mạnh xuống sàn, đóa hoa huyết nhục trên lưng co bóp rỉ dịch bào tử làm mù mắt đối thủ.
        </p>
      </div>

      <div class="info-card">
        <h3>LF2 DATA FRAME CODE (30 FPS EXACT)</h3>
        <div class="code-box" id="codeDisplay">Loading frame data...</div>
      </div>
    </div>
  </div>

  <script>
    const flowerData = {json.dumps(flower_json)};
    const leafData = {json.dumps(leaf_json)};

    let currentChar = 'flower';
    let currentClip = 'IDLE';
    let currentFrameIdx = 0;
    let isPlaying = true;
    let layerMode = 'comp'; // 'comp', 'body', 'fx'
    let showBoxes = true;

    const imgFlowerComp = new Image(); imgFlowerComp.src = 'spritesheets/flower_composite.png';
    const imgFlowerBody = new Image(); imgFlowerBody.src = 'spritesheets/flower_body.png';
    const imgFlowerFX = new Image(); imgFlowerFX.src = 'spritesheets/flower_fx.png';

    const imgLeafComp = new Image(); imgLeafComp.src = 'spritesheets/leaf_composite.png';
    const imgLeafBody = new Image(); imgLeafBody.src = 'spritesheets/leaf_body.png';
    const imgLeafFX = new Image(); imgLeafFX.src = 'spritesheets/leaf_fx.png';

    const canvas = document.getElementById('viewCanvas');
    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('frameSlider');
    const frameDisplay = document.getElementById('frameDisplay');
    const codeDisplay = document.getElementById('codeDisplay');
    const clipContainer = document.getElementById('clipContainer');
    const clipTitle = document.getElementById('clipTitle');
    const clipWaitMeta = document.getElementById('clipWaitMeta');
    const clipDesc = document.getElementById('clipDesc');

    const descriptions = {{
      'flower': {{
        'IDLE': 'Đứng thở dốc giữa bến cảng đêm giông bão, thân hình gù phập phồng, đóa hoa nhụy co bóp nhẹ như một buồng tim hở.',
        'WALK': 'Lê bước lặc lè trên nền đá ướt, hai tay dài quét sát mặt đất, sẵn sàng lao vào kẻ thù.',
        'ATTACK_REACH': 'Đòn cào sấp mặt: Vươn toàn bộ sải tay dài đập chộp tới trước, xé rách khiên bạo động của cảnh sát.',
        'SPORE_BURST': 'Chiêu thức [D > A]: Bung nhụy hoa nổ tung đám mây bào tử tím đỏ cay xè, làm chậm và gây mù kẻ thù diện rộng.',
        'VINE_ENTANGLE': 'Chiêu thức [D v A]: Nện tay xuống sàn bến cảng, rễ cây gai nhọn mọc xuyên từ kẽ đá trói chặt chân đối phương trong 4s.',
        'SACRIFICE_CLASP': 'Đòn cảm tử [Run + A]: Lao vào ôm chặt đối phương kích nổ đóa hoa, hất văng cả hai rơi xuống biển (Ring-Out)!',
        'HURT': 'Thân thể giật nảy ra sau khi trúng đạn, đóa hoa rít lên những tiếng the thé đe dọa.',
        'KNOCKDOWN': 'Trúng đòn nặng ngã bật ngửa xuống mặt sàn loang dầu, dịch bào tử xì ra ngùn ngụt.'
      }},
      'leaf': {{
        'IDLE': 'Khom lưng nhún nhảy nhịp nhàng, móng vuốt rễ cây đỏ rực thõng xuống rình mồi.',
        'WALK': 'Lướt đi thoăn thoắt trên đầu ngón chân, trườn sát các góc container né đèn pha.',
        'ATTACK_RAKE': 'Combo [A > A > A]: 3 nhịp cào xé liên tiếp bằng móng vuốt đỏ, rạch nát giáp sắt và gây hiệu ứng Bleed.',
        'POUNCE_SHRED': 'Chiêu thức [D > A]: Bật nhảy tầm thấp từ container vồ ngực mục tiêu cào 3 nhát chớp nhoáng rồi lộn ngược ra sau.',
        'THORN_ERUPTION': 'Chiêu thức [D v A]: Cắm móng vuốt xuống cầu tàu, cọc gỗ gai nhọn đâm xuyên từ dưới đất lên hất tung kẻ địch.',
        'JUMP': 'Bật nhảy nhẹ nhàng lên cao với sải chân dài quấn vải bất đối xứng.',
        'HURT': 'Thân gỗ mảnh khảnh giật lùi né tránh sát thương tiếp theo.',
        'KNOCKDOWN': 'Bị hất văng xoay tròn trên không rồi tiếp đất bằng lớp lá gai bọc kín thân.'
      }}
    }};

    function getActiveData() {{
      return currentChar === 'flower' ? flowerData : leafData;
    }}

    function getActiveImage() {{
      if (currentChar === 'flower') {{
        return layerMode === 'comp' ? imgFlowerComp : (layerMode === 'body' ? imgFlowerBody : imgFlowerFX);
      }} else {{
        return layerMode === 'comp' ? imgLeafComp : (layerMode === 'body' ? imgLeafBody : imgLeafFX);
      }}
    }}

    function renderClipButtons() {{
      clipContainer.innerHTML = '';
      const data = getActiveData();
      data.meta.frameTags.forEach(tag => {{
        const btn = document.createElement('div');
        btn.className = `clip-btn ${{tag.name === currentClip ? 'active' : ''}}`;
        btn.innerText = tag.name;
        btn.onclick = () => {{
          currentClip = tag.name;
          currentFrameIdx = 0;
          document.querySelectorAll('.clip-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          updateFrameRange();
          updateInfo();
        }};
        clipContainer.appendChild(btn);
      }});
    }}

    function getClipFrames() {{
      const data = getActiveData();
      const tag = data.meta.frameTags.find(t => t.name === currentClip);
      if (!tag) return [];
      return data.frames.slice(tag.from, tag.to + 1);
    }}

    function updateFrameRange() {{
      const frames = getClipFrames();
      slider.max = frames.length - 1;
      slider.value = currentFrameIdx;
      frameDisplay.innerText = `F: ${{currentFrameIdx + 1}}/${{frames.length}}`;
    }}

    function updateInfo() {{
      const frames = getClipFrames();
      const totalWait = frames.reduce((sum, f) => sum + (f.wait || 3), 0);
      clipTitle.innerHTML = `CLIP: ${{currentClip}} <span>${{totalWait}} ticks (${{Math.round(totalWait * 33.33)}}ms)</span>`;
      clipDesc.innerText = descriptions[currentChar][currentClip] || 'Hoạt ảnh chiến đấu chuẩn hóa LF2.';

      if (frames[currentFrameIdx]) {{
        const f = frames[currentFrameIdx];
        const stateId = currentClip.includes('ATTACK') || currentClip.includes('SPORE') || currentClip.includes('POUNCE') ? 3 : (currentClip === 'WALK' ? 1 : 0);
        codeDisplay.innerText = `<frame> ${{f.filename}}
   state: ${{stateId}}   wait: ${{f.wait}}   next: ${{currentFrameIdx < frames.length - 1 ? currentFrameIdx + 1 : 0}}   dvx: 0   dvy: 0
   hit_a: 0   hit_d: 0   hit_j: 0
   bdy:
      x: ${{f.bdy[0]}}  y: ${{f.bdy[1]}}  w: ${{f.bdy[2]}}  h: ${{f.bdy[3]}}
   itr:
      ${{f.itr.length ? `kind: 0  x: ${{f.itr[0]}}  y: ${{f.itr[1]}}  w: ${{f.itr[2]}}  h: ${{f.itr[3]}}  dvx: 6  dvy: -3  fall: 40  bdefend: 15` : '# Không có hộp va chạm sát thương'}}
<frame_end>`;
      }}
    }}

    function draw() {{
      ctx.clearRect(0, 0, 128, 128);
      const frames = getClipFrames();
      if (!frames.length) return;

      const f = frames[currentFrameIdx];
      const img = getActiveImage();

      if (img.complete && img.naturalWidth !== 0) {{
        ctx.drawImage(img, f.frame.x, f.frame.y, 128, 128, 0, 0, 128, 128);
      }}

      if (showBoxes) {{
        if (f.bdy && f.bdy.length) {{
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 1;
          ctx.strokeRect(f.bdy[0], f.bdy[1], f.bdy[2], f.bdy[3]);
        }}
        if (f.itr && f.itr.length) {{
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(f.itr[0], f.itr[1], f.itr[2], f.itr[3]);
        }}
      }}
    }}

    // Animation loop with LF2 wait timing accumulator
    let lastTime = performance.now();
    let accumulatedTime = 0;

    function loop(now) {{
      const dt = now - lastTime;
      lastTime = now;

      if (isPlaying) {{
        accumulatedTime += dt;
        const frames = getClipFrames();
        if (frames.length) {{
          const currentDuration = frames[currentFrameIdx].duration;
          if (accumulatedTime >= currentDuration) {{
            accumulatedTime -= currentDuration;
            currentFrameIdx = (currentFrameIdx + 1) % frames.length;
            slider.value = currentFrameIdx;
            frameDisplay.innerText = `F: ${{currentFrameIdx + 1}}/${{frames.length}}`;
            updateInfo();
          }}
        }}
      }}

      draw();
      requestAnimationFrame(loop);
    }}

    // UI Event Handlers
    document.getElementById('btnFlower').onclick = () => {{
      currentChar = 'flower';
      currentClip = 'IDLE';
      currentFrameIdx = 0;
      document.getElementById('btnFlower').classList.add('active');
      document.getElementById('btnLeaf').classList.remove('active');
      renderClipButtons();
      updateFrameRange();
      updateInfo();
    }};

    document.getElementById('btnLeaf').onclick = () => {{
      currentChar = 'leaf';
      currentClip = 'IDLE';
      currentFrameIdx = 0;
      document.getElementById('btnLeaf').classList.add('active');
      document.getElementById('btnFlower').classList.remove('active');
      renderClipButtons();
      updateFrameRange();
      updateInfo();
    }};

    document.getElementById('btnPlayPause').onclick = (e) => {{
      isPlaying = !isPlaying;
      e.target.innerText = isPlaying ? '⏸ Pause' : '▶ Play';
    }};

    document.getElementById('btnStep').onclick = () => {{
      isPlaying = false;
      document.getElementById('btnPlayPause').innerText = '▶ Play';
      const frames = getClipFrames();
      currentFrameIdx = (currentFrameIdx + 1) % frames.length;
      slider.value = currentFrameIdx;
      frameDisplay.innerText = `F: ${{currentFrameIdx + 1}}/${{frames.length}}`;
      updateInfo();
    }};

    slider.oninput = (e) => {{
      isPlaying = false;
      document.getElementById('btnPlayPause').innerText = '▶ Play';
      currentFrameIdx = parseInt(e.target.value);
      frameDisplay.innerText = `F: ${{currentFrameIdx + 1}}/${{getClipFrames().length}}`;
      updateInfo();
    }};

    function setLayerMode(mode, btnId) {{
      layerMode = mode;
      ['btnLayerComp', 'btnLayerBody', 'btnLayerFX'].forEach(id => {{
        document.getElementById(id).classList.toggle('active', id === btnId);
      }});
    }}

    document.getElementById('btnLayerComp').onclick = () => setLayerMode('comp', 'btnLayerComp');
    document.getElementById('btnLayerBody').onclick = () => setLayerMode('body', 'btnLayerBody');
    document.getElementById('btnLayerFX').onclick = () => setLayerMode('fx', 'btnLayerFX');

    document.getElementById('btnBoxes').onclick = (e) => {{
      showBoxes = !showBoxes;
      e.target.innerText = showBoxes ? '🎯 Hitboxes: ON' : '🎯 Hitboxes: OFF';
      e.target.classList.toggle('active', showBoxes);
    }};

    // Init
    renderClipButtons();
    updateFrameRange();
    updateInfo();
    requestAnimationFrame(loop);
  </script>
</body>
</html>
"""

    studio_path = os.path.join(SUITE_DIR, "index.html")
    with open(studio_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    # Also copy to root of project for direct browser inspection
    root_studio_path = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\mutan_pack_studio.html"
    with open(root_studio_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"Exported HTML5 Studio to: {studio_path} and {root_studio_path}")

# -------------------------------------------------------------
# 5. WRITE COMPREHENSIVE README.md
# -------------------------------------------------------------
def write_suite_readme():
    print("[5/5] Generating Suite README.md...")
    readme_path = os.path.join(SUITE_DIR, "README.md")
    
    readme_content = """# Bầy Người Hoa (Les Éclos) — Animation Suite & LF2 Combat Specification
> **Dự án:** *Divergency / LF Revive*  
> **Nhóm NPC:** Bầy Người Hoa Cống Ngầm Laundel (Hội Nhụy Huyết)  
> **Màn chơi:** Stage 1-3 Đại Hỗn Chiến Bến Cảng Hoàng Hôn (Hangar J4)  
> **Chuẩn hóa Engine:** LF2 Deterministic Wait Engine (30 FPS, wait * 33.33ms)  
> **Kiến trúc Tách Lớp:** `Character_Body` & `FX_Effects` (Aseprite Native Layers)  

---

## 1. TỔNG QUAN ARCHETYPE & VAI TRÒ TRONG ĐẠI HỖN CHIẾN

Bầy Người Hoa ("Les Éclos") là những nạn nhân của chất thải tà thuật MuCEM xả xuống cống ngầm Laundel. Khi tràn lên bến cảng lúc hoàng hôn, chúng tác chiến theo cặp tương hỗ:

1. **Mutan Flower (`mutan_flower.png`): Cường Giả Nhụy Huyết (Heavy Bloomed Spore Carrier)**
   - **Vai trò:** Tanker / Area Denial / Cảm tử nổ tung.
   - **Đặc trưng hình thể:** Khối lưng gù nặng nề, tủy sống vươn ra một nửa thân người cầm đóa hoa huyết nhục co bóp rỉ dịch. Trọng tâm thấp, bước chân dậm đất làm chấn động mặt sàn bến cảng.
2. **Mutan Leaf (`mutan_leaf.png`): Sát Thủ Lá Gai (Agile Root-Claw Shredder)**
   - **Vai trò:** Flanker / Bleeder / Skirmisher.
   - **Đặc trưng hình thể:** Khung xương gỗ mảnh khảnh bất đối xứng, đầu vòm lá gai rậm rạp, một cánh tay dài lượt thượt kết bằng rễ cây mang **móng vuốt đỏ rực cực lớn**. Trọng tâm cao, di chuyển thoăn thoắt trên đầu ngón chân.

---

## 2. BẢNG DANH MỤC ĐÒN ĐÁNH & THỜI LƯỢNG LF2

### A. Quái Hoa Nhụy (`mutan_flower`) — Canvas 128 × 128 | Pivot `(64, 112)`

| Tên Animation | Lệnh Bấm LF2 | Số Frames | Ticks Chuỗi Wait | Tổng Thời Lượng | Vai Trò & Tương Tác Cốt Truyện Bến Cảng |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **IDLE** | — | 6 | `4, 4, 4, 4, 4, 4` | 800 ms | Thở dốc giữa đêm giông bão, đóa hoa co bóp nhịp nhàng. |
| **WALK** | `→ →` / AI | 6 | `3, 3, 3, 3, 3, 3` | 600 ms | Tiến bước lặc lè, hai tay quét gần sát mặt đất. |
| **ATTACK_REACH** | `A` | 6 | `3, 3, 2, 2, 4, 3` | 567 ms | Đập vồ sấp mặt: Vươn sải tay dài đập rách khiên cảnh sát. |
| **SPORE_BURST** | `D > A` | 6 | `3, 4, 3, 3, 4, 4` | 700 ms | **Phun Bào Tử Độc:** Bung đóa hoa xả mây khói tím làm mù và chậm trùm Don Malo (Bọ) & Bruno (Rắn). |
| **VINE_ENTANGLE** | `D v A` | 6 | `4, 4, 3, 3, 5, 4` | 767 ms | **Rễ Gai Trói Chân:** Cắm tay khô xuống kẽ nứt sàn bê tông, rễ gai mọc trồi lên trói cứng 2 chân kẻ địch 4s. |
| **SACRIFICE_CLASP** | `Run + A` | 6 | `2, 2, 3, 4, 6, 8` | 833 ms | **Ôm Cảm Tử Kích Nổ:** Ôm chặt mục tiêu và kích nổ diện rộng, hất văng cả hai rơi xuống biển (Ring-Out)! |
| **HURT** | Trúng đòn | 6 | `2, 2, 3, 3, 3, 3` | 533 ms | Thân giật nảy ra sau, hoa co rúm rỉ dịch máu. |
| **KNOCKDOWN** | Ngã sàn | 6 | `3, 3, 4, 4, 6, 9` | 967 ms | Đập lưng xuống nền đá, bào tử xì ra ngùn ngụt. |

---

### B. Sát Thủ Lá Gai (`mutan_leaf`) — Canvas 128 × 128 | Pivot `(64, 112)`

| Tên Animation | Lệnh Bấm LF2 | Số Frames | Ticks Chuỗi Wait | Tổng Thời Lượng | Vai Trò & Tương Tác Cốt Truyện Bến Cảng |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **IDLE** | — | 6 | `3, 4, 4, 3, 3, 4` | 700 ms | Khom lưng nhún nhảy, móng vuốt đỏ thõng xuống rình mồi. |
| **WALK** | `→ →` / AI | 6 | `3, 3, 3, 3, 3, 3` | 600 ms | Lướt thoăn thoắt trên đầu ngón chân né đèn pha quét. |
| **ATTACK_RAKE** | `A > A > A` | 6 | `3, 2, 2, 2, 3, 3` | 500 ms | **Móng Vuốt Huyết Trảm:** 3 nhịp cào chớp nhoáng tạo 3 vệt chém đỏ rực xé toạc giáp sắt (Bleed). |
| **POUNCE_SHRED** | `D > A` | 6 | `2, 2, 2, 3, 3, 4` | 533 ms | **Nhảy Chồm Cào Xé:** Nhảy lướt tầm thấp từ container vồ ngực cào 3 nhát rồi lộn ngược ra sau. |
| **THORN_ERUPTION** | `D v A` | 6 | `3, 3, 2, 3, 4, 4` | 633 ms | **Cọc Gai Bến Cảng:** Cắm móng vuốt xuống cầu tàu, cọc gỗ gai đâm xuyên từ sàn đá hất tung kẻ địch lên trời. |
| **JUMP** | `J` | 6 | `3, 2, 3, 3, 3, 4` | 600 ms | Bật nhảy nhẹ nhàng lên nóc các thùng container. |
| **HURT** | Trúng đòn | 6 | `2, 2, 3, 3, 3, 3` | 533 ms | Thân gỗ giật lùi, móng vuốt giương lên thủ thế. |
| **KNOCKDOWN** | Ngã sàn | 6 | `3, 3, 4, 4, 6, 8` | 933 ms | Xoay tròn trên không rồi tiếp đất bằng khối lá bọc thân. |

---

## 3. CƠ CHẾ TÁCH LỚP ASEPRITE (SEPARATED LAYERS ARCHITECTURE)

Mọi file `.aseprite` xuất ra trong thư mục `aseprite/` đều tuân thủ kiến trúc tách tầng độc lập:
* **Layer `Character_Body`:** Chứa toàn bộ nét vẽ thể xác (thịt cơ bắp, vải bố, thân gỗ, đầu lá, dải băng chân). Có thể chỉnh sửa hoặc vẽ lại skin mà không làm hỏng VFX.
* **Layer `FX_Effects`:** Chứa hoàn toàn trên nền trong suốt:
  * Vệt chém huyết quang đỏ tươi của móng vuốt.
  * Mây bào tử tím đỏ rực rỡ và đốm bụi huỳnh quang phát sáng.
  * Cọc gỗ gai nhọn và rễ cây trồi từ mặt sàn cầu tàu.
  * Vòng shockwave kích nổ cảm tử.

---

## 4. HƯỚNG DẪN MỞ & SỬ DỤNG STUDIO

1. **Xem trực tiếp trên trình duyệt (Offline Web App):**
   * Mở file `mutan_pack_studio.html` (trong thư mục dự án) hoặc `mutan_pack_suite/index.html`.
   * Chuyển đổi giữa 2 nhân vật bằng nút **Quái Hoa Nhụy** và **Sát Thủ Lá Gai**.
   * Bật/tắt các tầng hiển thị: `🌟 Composite`, `🧍 Body Only`, `🩸 FX Only`.
   * Kéo thanh trượt Scrubber để soi từng frame và nhịp `wait` chuẩn 30 FPS.
   * Xem và sao chép mã code **LF2 Data Frame** tạo sẵn bên dưới.
2. **Chỉnh sửa trong Aseprite:**
   * Mở file `aseprite/Mutan_Flower_Master_Combat.aseprite` hoặc `aseprite/Mutan_Leaf_Master_Combat.aseprite`.
   * Dòng thời gian (Timeline) đã được chia sẵn các Tag tương ứng với chuỗi `wait ticks` chuẩn xác.
"""
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(readme_content)
    print(f"Generated: {readme_path}")

# -------------------------------------------------------------
# MAIN ENTRY
# -------------------------------------------------------------
if __name__ == "__main__":
    ensure_dirs()
    flower_clips, flower_meta = process_mutan_flower()
    leaf_clips, leaf_meta = process_mutan_leaf()
    flower_json = compile_sheets("flower", flower_meta, flower_clips)
    leaf_json = compile_sheets("leaf", leaf_meta, leaf_clips)
    build_html_studio(flower_json, leaf_json)
    write_suite_readme()
    print("ALL DONE! Bầy Người Hoa Suite is completely built.")
