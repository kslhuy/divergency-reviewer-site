from pathlib import Path
import json
root=Path(__file__).parent
p=root/'preview-data.js';data=json.loads(p.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
meta=json.loads((root/'assets/tornado-spin-8frames.json').read_text())
data['atlases']['tornado']='assets/tornado-spin-8frames.png'
data['sprites']['synergyfx']={'TornadoSpin':{'frames':meta['frames'],'ticks':meta['ticks']}}
p.write_text('window.PREVIEW_DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
for name in ['choreography.js','tornado-scene.js']:
 p=root/name;txt=p.read_text(encoding='utf-8');txt=txt.replace("const cyan='#62d8df',red='#f05b71'","const cyan='#51ead6',red='#cb0b0b'")
 start=txt.index('   // Animate the generated RGBA image in narrow bands;')
 end=txt.index('   d.ring(cx,base,92*growth',start)
 txt=txt[:start]+'''   // Eight distinct sprite cels at 12 FPS, pinned at the foot of the funnel.
   // No strip deformation: the wind ribbons change pose within the sprite sheet.
   d.sprite('synergyfx','TornadoSpin',cx,base,t-2.8,{scale:.55*growth,loop:true,alpha:.92*fade});
'''+txt[end:]
 p.write_text(txt,encoding='utf-8')
p=root/'sources.md';txt=p.read_text(encoding='utf-8')
txt+='''

## Tornado animation correction — 2026-10-02

The active VFX is now `assets/tornado-spin-8frames.png`: eight distinct AI-generated rotation cels in a 4 × 2 sheet, 1536 × 1024 pixels. Cells are 384 × 512; metadata/pivots in `assets/tornado-spin-8frames.json`. The renderer plays 12 FPS (5 ticks per cel) and aligns each foot pivot, with no horizontal-strip deformation. The previous one-image VFX is retained only as a historical concept.

Color/style reference: original `Deep/Sk3_Swift` and `Solei/Solei_Combat_solei_tornator`, plus `soleifx/ef_tornator_spin`, extracted without repainting into `assets/tornado-style-reference.png`. Source colors sampled directly from the atlas: Deep #cb0b0b / #751111; Solei #51ead6 / #6aa099 / #3f6762 / #80bfb7 / #34b1a2 / #59ffea. Imagegen was guided by those colors and the original flat pixel clusters. Canvas accents now use #51ead6 and #cb0b0b. Generated pixels are not claimed to be an exact indexed palette.

Tool: built-in imagegen with transparent background. Full generation prompt: `tornado-animation-prompt.txt`. Isolated animation and cel inspection: `Tornado_Animation.html`. Main synergy choreography and its 12-hit timing remain intact.
'''
p.write_text(txt,encoding='utf-8')
p=root/'design.md';txt=p.read_text(encoding='utf-8');txt=txt.replace('**Nhịp hit minh họa:**','**Animation VFX:** 8 cel xoay riêng biệt, 12 FPS, lặp 0,667 giây; neo chân lốc từng cel. Màu đỏ theo Deep Swift, mint/teal theo Solei Tâm Bão.\n\n**Nhịp hit minh họa:**');p.write_text(txt,encoding='utf-8')
p=root/'README-tornado.md';txt=p.read_text(encoding='utf-8');txt=txt.replace('Ảnh VFX: `assets/tornado-cyan-crimson.png` (PNG alpha do imagegen tạo). Chuyển động VFX do Canvas diễn hoạt từ ảnh này; chưa phải sprite sheet Unity.','Animation VFX: `assets/tornado-spin-8frames.png`, sprite sheet PNG alpha 4 × 2, 8 cel, 12 FPS. Mỗi cel 384 × 512; pivot và timing trong `assets/tornado-spin-8frames.json`. Mở `Tornado_Animation.html` để xem riêng vòng xoay và từng frame. Màu theo Deep Swift (đỏ) và Solei Tâm Bão (mint/teal).');p.write_text(txt,encoding='utf-8')
