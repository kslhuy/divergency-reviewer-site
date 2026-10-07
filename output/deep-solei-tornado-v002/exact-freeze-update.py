from pathlib import Path
import json
root=Path(__file__).parent
meta={'image':'freeze-ww-reference.png','colorTransform':'../freeze-palette.js','columns':5,'rows':2,'frameWidth':160,'frameHeight':160,'frameCount':10,'fps':12,'loop':True,'ticks':50,'frames':[{'r':[(i%5)*160,(i//5)*160,160,160],'p':[80,160],'t':5,'atlas':'tornado','u':1} for i in range(10)],'notes':'Original frames and bottom-center pivots from freeze_ww.png.meta. Preview playback 12 FPS; original gameplay timing not inferred.'}
(root/'assets/freeze-exact-10frames.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
p=root/'preview-data.js';data=json.loads(p.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
data['atlases']['tornado']='assets/freeze-ww-reference.png';data['sprites']['synergyfx']['TornadoSpin']={'frames':meta['frames'],'ticks':50}
p.write_text('window.PREVIEW_DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
p=root/'viewer.js';txt=p.read_text(encoding='utf-8').replace('state.loaded=true;', 'images.tornado=window.recolorFreezeAtlas(images.tornado);state.loaded=true;');p.write_text(txt,encoding='utf-8')
p=root/'index.html';txt=p.read_text(encoding='utf-8').replace('<script src="viewer.js">','<script src="freeze-palette.js"></script>\n<script src="viewer.js">').replace('8 frame','10 frame');p.write_text(txt,encoding='utf-8')
for name in ['choreography.js','tornado-scene.js']:
 p=root/name;txt=p.read_text(encoding='utf-8').replace('// Eight distinct sprite cels at 12 FPS, pinned at the foot of the funnel.','// Ten original Freeze cels; fixed palette substitution only.').replace('// No strip deformation: the wind ribbons change pose within the sprite sheet.','// Original aspect ratio and bottom-center pivots, no added tornado geometry.').replace('scale:.60*growth,loop:true,alpha:.92*fade','scale:1.6*growth,loop:true,alpha:fade')
 a=txt.index('   d.ring(cx,base,92*growth');b=txt.index('\n  }\n  for(let j=0;',a);txt=txt[:a]+txt[b:]
 a=txt.index('  // Foreground half-rings');b=txt.index('  impact(d,400,265',a);txt=txt[:a]+txt[b:]
 p.write_text(txt,encoding='utf-8')
p=root/'animation-viewer.template.html';txt=p.read_text(encoding='utf-8')
txt=txt.replace('repeat(8,1fr)','repeat(5,1fr)').replace('Freeze-inspired wind streaks · Deep’s crimson × Solei’s mint · 8-frame loop.','Original Freeze pixels · color substitution only · all 10 source frames.')
txt=txt.replace('NEW / TORNADO LOOP','ORIGINAL FREEZE / RECOLORED').replace('500,367,.68','500,367,1.8').replace("+' / 08'","+' / '+String(meta.frameCount).padStart(2,'0')")
txt=txt.replace('((i%8)+8)%8','((i%meta.frameCount)+meta.frameCount)%meta.frameCount').replace('state.frame/12','state.frame/meta.fps').replace('i<8','i<meta.frameCount').replace('state.time*12)%8','state.time*meta.fps)%meta.frameCount').replace('60,143,.28','60,135,.68')
txt=txt.replace('const data=__DATA__','__PALETTE__\nconst data=__DATA__')
txt=txt.replace('state.loaded=true;for','images.tornado=window.recolorFreezeAtlas(images.tornado);window.tornadoAnimation.atlas=images.tornado;state.loaded=true;for')
txt=txt.replace('assets/tornado-freeze-inspired-8frames.json','assets/freeze-exact-10frames.json').replace('<a href="assets/tornado-freeze-inspired-8frames.png" download>Sprite sheet PNG</a>','<a id="download" download="freeze-red-mint-exact.png" href="#">Recolored PNG</a>')
txt=txt.replace("window.tornadoAnimation={state,seek};", "window.tornadoAnimation={state,seek};\n$('download').onclick=()=>{$('download').href=images.tornado.toDataURL('image/png')};")
txt=txt.replace('4 × 2 sheet · 384 × 512 pixels per cell · foot pivots in metadata. Generated VFX; original character sprites shown for comparison.','5 × 2 original sheet · 160 × 160 pixels per cell. Original shapes, pixel positions and alpha; only seven RGB palette entries are replaced. Playback timing is for this preview.')
p.write_text(txt,encoding='utf-8')
p=root/'build-animation-viewer.py';txt=p.read_text(encoding='utf-8').replace('tornado-freeze-inspired-8frames.json','freeze-exact-10frames.json');txt=txt.replace("html=html.replace('__FREEZE_REFERENCE__'", "html=html.replace('__PALETTE__',(root/'freeze-palette.js').read_text(encoding='utf-8'))\nhtml=html.replace('__FREEZE_REFERENCE__'");p.write_text(txt,encoding='utf-8')
p=root/'check-preview.cjs';txt=p.read_text(encoding='utf-8').replace("measureText:s=>", "getImageData:()=>({data:[0,0,0,0]}),measureText:s=>").replace("'choreography.js','viewer.js'","'choreography.js','freeze-palette.js','viewer.js'");p.write_text(txt,encoding='utf-8')
p=root/'check-animation.cjs';txt=p.read_text(encoding='utf-8').replace('i<8','i<10').replace('size,8','size,10').replace('frame),7','frame),9').replace('distinctFrames:8','distinctFrames:10').replace('loopPeriodSeconds:8/12','loopPeriodSeconds:10/12');p.write_text(txt,encoding='utf-8')
p=root/'sources.md';txt=p.read_text(encoding='utf-8');txt+='''

## Exact original art, palette-only — current version

The active atlas is now the byte-for-byte original `freeze_ww.png`, copied as `assets/freeze-ww-reference.png`. None of the generated interpretations is used. `freeze-palette.js` replaces seven source RGB values in a canvas at load time; it leaves each pixel position and alpha value intact. Original ten 160 × 160 frames, 5 × 2 sheet, original bottom-center pivots. No additional tornado rings or texture are drawn over it. The inspector can export the recolored canvas directly as PNG.

Frames/pivots are read from the original `.png.meta`; 12 FPS is an illustrative playback choice, not a claim about Freeze gameplay timing. Main preview renders at a uniform scale of 1.6. `assets/freeze-exact-10frames.json` records the original rectangles. This version uses direct palette rendering, not generative image editing.
''';p.write_text(txt,encoding='utf-8')
p=root/'README-tornado.md';p.write_text('''# Exact Freeze tornado recolor

Open `Tornado_Animation.html` to play or step through all 10 ORIGINAL Freeze frames, recolored in Deep red and Solei mint. Download the colored PNG from its Recolored PNG link. The original source sheet, silhouette, texture, alpha and sprite pivots remain unchanged. Only RGB colors are substituted by `freeze-palette.js`.

`Synergy_Preview.html` includes the same recolored source animation in Quỹ Đạo Hồi Phong and preserves the enemy launch / multi-hit choreography.

Source: `assets/freeze-ww-reference.png` (800 × 320). Cells: 160 × 160, five columns, two rows. Metadata: `assets/freeze-exact-10frames.json`. Preview playback: 12 FPS. Prior generated sheets are retained for history and are not active.
''',encoding='utf-8')
p=root/'design.md';txt=p.read_text(encoding='utf-8');a=txt.index('**Animation VFX:**');b=txt.index('**Nhịp hit minh họa:**',a);txt=txt[:a]+'**Animation VFX:** Dùng đúng 10 frame gốc của Freeze `freeze_ww.png`, chỉ thay RGB sang đỏ Deep và mint Solei. Giữ nguyên silhouette, nét pixel, alpha và pivot; không thêm vòng lốc bên ngoài. Kích thước gốc 160 × 160/frame, scale đều 1,6; phát minh họa 12 FPS.\n\n'+txt[b:];p.write_text(txt,encoding='utf-8')
