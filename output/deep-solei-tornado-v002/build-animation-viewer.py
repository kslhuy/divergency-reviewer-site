from pathlib import Path
import base64,json
root=Path(__file__).parent
data=json.loads((root/'preview-data.js').read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
data['atlases']={k:'data:image/png;base64,'+base64.b64encode((root/data['atlases'][k]).read_bytes()).decode() for k in ['main','tornado']}
data['sprites']={k:{c:data['sprites'][k][c]} for k,c in [('deep','Sk3_Swift'),('solei','Solei_Combat_solei_tornator')]}
meta=json.loads((root/'assets/freeze-exact-10frames.json').read_text())
html=(root/'animation-viewer.template.html').read_text(encoding='utf-8').replace('__DATA__',json.dumps(data,separators=(',',':'))).replace('__META__',json.dumps(meta,separators=(',',':')))
html=html.replace('__PALETTE__',(root/'freeze-palette.js').read_text(encoding='utf-8'))
html=html.replace('__FREEZE_REFERENCE__','data:image/png;base64,'+base64.b64encode((root/'assets/freeze-ww-reference.png').read_bytes()).decode())
(root/'Tornado_Animation.html').write_text(html,encoding='utf-8')
