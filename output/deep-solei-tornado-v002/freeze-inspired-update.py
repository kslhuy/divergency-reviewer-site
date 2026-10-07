from pathlib import Path
from PIL import Image
import json,base64
root=Path(__file__).parent
im=Image.open(root/'assets/tornado-freeze-inspired-8frames.png').convert('RGBA')
assert im.size==(1536,1024)
lo,hi=im.getchannel('A').getextrema();assert lo==0 and hi>=240
meta=json.loads((root/'assets/tornado-spin-wide-8frames.json').read_text())
meta.update(image='tornado-freeze-inspired-8frames.png',styleReference='freeze-ww-reference.png',shape='Broad wind envelope, scratchy broken horizontal wind streaks and sparse open spiral rings inspired by Freeze freeze_ww.png.')
for f in meta['frames']:
 ox,oy,w,h=f['r'];bottom=max(y for y in range(h) for x in range(w) if im.getpixel((ox+x,oy+y))[3]>=160)
 f['p']=[192,bottom+1]
(root/'assets/tornado-freeze-inspired-8frames.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
p=root/'preview-data.js';data=json.loads(p.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
data['atlases']['tornado']='assets/tornado-freeze-inspired-8frames.png';data['sprites']['synergyfx']['TornadoSpin']['frames']=meta['frames']
p.write_text('window.PREVIEW_DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
for name in ['choreography.js','tornado-scene.js']:
 p=root/name;txt=p.read_text(encoding='utf-8').replace('k%2?red:cyan,3,.65*fade','k%2?red:cyan,1,.35*fade');p.write_text(txt,encoding='utf-8')
for name in ['animation-viewer.template.html','build-animation-viewer.py','README-tornado.md']:
 p=root/name;txt=p.read_text(encoding='utf-8').replace('tornado-spin-wide-8frames','tornado-freeze-inspired-8frames');p.write_text(txt,encoding='utf-8')
p=root/'animation-viewer.template.html';txt=p.read_text(encoding='utf-8');txt=txt.replace('8-frame tornado loop · Deep’s crimson sword spin × Solei’s mint wind.','Freeze-inspired wind streaks · Deep’s crimson × Solei’s mint · 8-frame loop.')
txt=txt.replace('<footer>','<details style="margin-top:20px;color:#a3b3b9"><summary style="cursor:pointer">Style reference · original Freeze / freeze_ww.png</summary><img src="__FREEZE_REFERENCE__" alt="Original Freeze tornado sprite sheet used as the visual reference" style="max-width:100%;image-rendering:pixelated;margin-top:12px;background:#292e37"></details><footer>')
p.write_text(txt,encoding='utf-8')
p=root/'build-animation-viewer.py';txt=p.read_text(encoding='utf-8');txt=txt.replace("(root/'Tornado_Animation.html').write_text", "html=html.replace('__FREEZE_REFERENCE__','data:image/png;base64,'+base64.b64encode((root/'assets/freeze-ww-reference.png').read_bytes()).decode())\n(root/'Tornado_Animation.html').write_text");p.write_text(txt,encoding='utf-8')
p=root/'sources.md';txt=p.read_text(encoding='utf-8');txt+='''

## Freeze-inspired wind revision — 2026-10-02

Active animation: `assets/tornado-freeze-inspired-8frames.png` / `.json`. Built-in imagegen generated eight distinct cels using the user-provided `C:/Users/Quang Huy Nugyen/LF2Revie/Assets/Images/Animation/Olds_LF2/Freeze/Freeze/freeze_ww.png` as the primary reference. The original source was copied without edits to `assets/freeze-ww-reference.png` for comparison. It remains unchanged in the Unity project.

The new effect borrows Freeze's scratchy horizontal wind slivers, broken elliptical arcs and transparent gaps, retaining the broad wind envelope and Deep/Solei red–mint palette. It is an AI-generated interpretation, not the original Freeze animation recolored. Full prompt: `tornado-freeze-prompt.txt`. Eight cels at 12 FPS; foot pivots aligned per frame, existing launch and multi-hit timings retained.
''';p.write_text(txt,encoding='utf-8')
p=root/'design.md';txt=p.read_text(encoding='utf-8').replace('Thân và chân lốc rộng,','Nét gió đứt mảnh và vòng xoắn thoáng tham chiếu Freeze `freeze_ww.png`. Thân và chân lốc rộng,');p.write_text(txt,encoding='utf-8')
print(json.dumps({'size':im.size,'pivots':[f['p'] for f in meta['frames']],'alphaRange':[lo,hi]}))
