import os
import json
from PIL import Image, ImageFont, ImageDraw, ImageFilter
import numpy as np

font_path = 'fonts/alagard/alagard.ttf'
out_dir = 'fonts/alagard'
os.makedirs(out_dir, exist_ok=True)

# 1. GENERATE ATLAS AT 32px (HIGH RES 2X)
font = ImageFont.truetype(font_path, 32)
chars = [chr(i) for i in range(32, 127)]

atlas_w, atlas_h = 512, 512
atlas_im = Image.new('RGBA', (atlas_w, atlas_h), (0, 0, 0, 0))
draw = ImageDraw.Draw(atlas_im)

cur_x, cur_y = 12, 12
row_h = 42
padding = 6

glyphs_data = {}
fnt_lines = [
    'info face="Alagard" size=32 bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=0 aa=0 padding=0,0,0,0 spacing=2,2 outline=0',
    f'common lineHeight=38 base=30 scaleW={atlas_w} scaleH={atlas_h} pages=1 packed=0 alphaChnl=0 redChnl=0 greenChnl=0 blueChnl=0',
    'page id=0 file="alagard_atlas.png"',
    f'chars count={len(chars)}'
]

for ch in chars:
    code = ord(ch)
    if ch == ' ':
        advance = 14
        glyphs_data[ch] = {'id': code, 'char': ch, 'x': 0, 'y': 0, 'width': 0, 'height': 0, 'xoffset': 0, 'yoffset': 0, 'xadvance': advance}
        fnt_lines.append(f'char id={code:<4} x=0     y=0     width=0     height=0    xoffset=0     yoffset=0     xadvance={advance:<4} page=0  chnl=15')
        continue

    bbox = draw.textbbox((0, 0), ch, font=font)
    gw = bbox[2] - bbox[0]
    gh = bbox[3] - bbox[1]

    if cur_x + gw + padding > atlas_w - 12:
        cur_x = 12
        cur_y += row_h + padding

    draw.text((cur_x - bbox[0], cur_y - bbox[1]), ch, font=font, fill=(255, 255, 255, 255))
    advance = max(gw + 3, 10)

    glyphs_data[ch] = {
        'id': code,
        'char': ch,
        'x': cur_x,
        'y': cur_y,
        'width': gw,
        'height': gh,
        'xoffset': bbox[0],
        'yoffset': bbox[1],
        'xadvance': advance
    }

    fnt_lines.append(f'char id={code:<4} x={cur_x:<5} y={cur_y:<5} width={gw:<5} height={gh:<5} xoffset={bbox[0]:<5} yoffset={bbox[1]:<5} xadvance={advance:<5} page=0  chnl=15')
    cur_x += gw + padding + 2

atlas_im.save(os.path.join(out_dir, 'alagard_atlas.png'))

with open(os.path.join(out_dir, 'alagard.fnt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(fnt_lines) + '\n')

with open(os.path.join(out_dir, 'alagard_atlas.json'), 'w', encoding='utf-8') as f:
    json.dump({'font': 'Alagard', 'size': 32, 'lineHeight': 38, 'glyphs': glyphs_data}, f, indent=2)

print('Generated white atlas, fnt, and json!')

# 2. GENERATE STYLED ATLASES (Silver Filigree, Crimson Fury, Spectral Cyan, Relic Gold)
alpha_mask = atlas_im.split()[-1]

def make_gradient_atlas(color_top, color_bot, outline_color=None, glow_color=None):
    w, h = atlas_w, atlas_h
    grad = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    grad_arr = np.zeros((h, w, 4), dtype=np.uint8)
    
    # Pre-render vertical gradient repeated per row block
    # We apply gradient relative to row height
    alpha_np = np.array(alpha_mask)
    for y in range(h):
        t = (y % 48) / 48.0
        r = int(color_top[0] * (1 - t) + color_bot[0] * t)
        g = int(color_top[1] * (1 - t) + color_bot[1] * t)
        b = int(color_top[2] * (1 - t) + color_bot[2] * t)
        grad_arr[y, :, 0] = r
        grad_arr[y, :, 1] = g
        grad_arr[y, :, 2] = b
        grad_arr[y, :, 3] = alpha_np[y, :]

    styled = Image.fromarray(grad_arr, 'RGBA')
    
    # Add subtle drop shadow
    shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_arr = np.zeros((h, w, 4), dtype=np.uint8)
    # shift alpha by 1, 1
    shadow_arr[1:, 1:, 3] = (alpha_np[:-1, :-1] * 0.85).astype(np.uint8)
    shadow_arr[:, :, 0] = 10
    shadow_arr[:, :, 1] = 12
    shadow_arr[:, :, 2] = 18
    shadow_im = Image.fromarray(shadow_arr, 'RGBA')
    
    final_im = Image.alpha_composite(shadow_im, styled)
    return final_im

# Metallic Silver (matches in-game plaque)
silver_atlas = make_gradient_atlas((240, 246, 252), (165, 178, 195))
silver_atlas.save(os.path.join(out_dir, 'alagard_silver_atlas.png'))

# Crimson Blood (matches Deep's Crimson Fury)
crimson_atlas = make_gradient_atlas((255, 110, 110), (180, 25, 35))
crimson_atlas.save(os.path.join(out_dir, 'alagard_crimson_atlas.png'))

# Spectral Cyan (matches Deep's Phantom Blade)
cyan_atlas = make_gradient_atlas((190, 255, 250), (45, 195, 185))
cyan_atlas.save(os.path.join(out_dir, 'alagard_cyan_atlas.png'))

# Relic Amber Gold (matches Divergency reward seals)
gold_atlas = make_gradient_atlas((255, 240, 160), (215, 150, 40))
gold_atlas.save(os.path.join(out_dir, 'alagard_gold_atlas.png'))

print('Generated all 4 styled atlases!')
