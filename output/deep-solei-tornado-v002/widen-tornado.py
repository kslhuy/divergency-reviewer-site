from pathlib import Path
from PIL import Image
import json
root=Path(__file__).parent
im=Image.open(root/'assets/tornado-spin-wide-8frames.png').convert('RGBA')
assert im.size==(1536,1024)
alpha_min,alpha_max=im.getchannel('A').getextrema()
assert alpha_min==0 and alpha_max>=240
meta=json.loads((root/'assets/tornado-spin-8frames.json').read_text())
meta['image']='tornado-spin-wide-8frames.png'
meta['shape']='Broad foot and thick column; crown only slightly wider than body.'
for i,f in enumerate(meta['frames']):
 ox,oy,w,h=f['r'];bottom=max(y for y in range(h) for x in range(w) if im.getpixel((ox+x,oy+y))[3]>=160)
 f['p']=[192,bottom+1]
(root/'assets/tornado-spin-wide-8frames.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
p=root/'preview-data.js';data=json.loads(p.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
data['atlases']['tornado']='assets/tornado-spin-wide-8frames.png'
data['sprites']['synergyfx']['TornadoSpin']['frames']=meta['frames']
p.write_text('window.PREVIEW_DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
for name in ['choreography.js','tornado-scene.js']:
 p=root/name;txt=p.read_text(encoding='utf-8').replace('scale:.55*growth','scale:.60*growth').replace('rr=(20+v*79)*growth','rr=(83+v*18)*growth').replace('yy=base-v*223*growth','yy=base-v*256*growth').replace('r=(104-81*p)*growth','r=(124-40*p)*growth');p.write_text(txt,encoding='utf-8')
for name in ['animation-viewer.template.html','build-animation-viewer.py']:
 p=root/name;txt=p.read_text(encoding='utf-8').replace('tornado-spin-8frames','tornado-spin-wide-8frames');p.write_text(txt,encoding='utf-8')
# Keep repeated builds from adding duplicate navigation links.
p=root/'build-animation-viewer.py';txt=p.read_text(encoding='utf-8');txt=txt[:txt.index("p=root/'index.html'")];p.write_text(txt,encoding='utf-8')
p=root/'README-tornado.md';txt=p.read_text(encoding='utf-8').replace('tornado-spin-8frames','tornado-spin-wide-8frames');txt+='\nCập nhật hình dáng: thân lốc dày, chân mở rộng thành vòng gió lớn, miệng chỉ nhỉnh hơn thân; kích thước sân tăng từ scale 0,55 lên 0,60. Giữ 8 cel / 12 FPS và chuỗi hit.\n';p.write_text(txt,encoding='utf-8')
p=root/'sources.md';txt=p.read_text(encoding='utf-8');txt+='\n\n## Broad-column tornado revision — 2026-10-02\n\nActive asset: `assets/tornado-spin-wide-8frames.png`, edited with built-in imagegen from the previous sheet. All eight frames now have a broad swirling foot and thick body; the crown is only slightly wider. Palette and eight-frame loop retained. The old sheet is preserved. Metadata: `assets/tornado-spin-wide-8frames.json`; prompt: `tornado-wide-prompt.txt`. Main preview scale is 0.60; foreground spiral widths now follow the broad column.\n';p.write_text(txt,encoding='utf-8')
p=root/'design.md';txt=p.read_text(encoding='utf-8').replace('neo chân lốc từng cel.','neo chân lốc từng cel. Thân và chân lốc rộng, miệng chỉ nhỉnh hơn thân; vòng chân tương xứng với vùng xoay nhân vật.');p.write_text(txt,encoding='utf-8')
print(json.dumps({'size':im.size,'pivots':[f['p'] for f in meta['frames']]}))
