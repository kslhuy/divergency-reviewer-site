"""Inline local scripts, styles and image references into one offline HTML file."""
from pathlib import Path
import argparse,base64,json,mimetypes,re

def bundle(root):
    root=root.resolve()
    def resolve(name):
        path=(root/name).resolve()
        if not path.is_relative_to(root):raise ValueError('Resource escapes preview directory: '+name)
        if not path.is_file():raise FileNotFoundError(path)
        return path
    def uri(path):
        mime=mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
        return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode('ascii')
    pattern=re.compile(r'([\x22\x27])((?:assets/)[^\x22\x27\r\n]+\.(?:png|webp|jpg|jpeg|gif))\1',re.I)
    def inline_script(match):
        script=resolve(match.group(1)).read_text(encoding='utf-8')
        script=pattern.sub(lambda m:json.dumps(uri(resolve(m.group(2)))),script)
        if re.search(r'\bfetch\s*\(|https?://',script):raise ValueError('Runtime script contains a fetch or external URL; make its resources local first.')
        return '<script>\n'+script.replace('</script','<\\/script')+'\n</script>'
    html=(root/'index.html').read_text(encoding='utf-8')
    html=re.sub(r'<script\s+src="([^"]+)"\s*></script>',inline_script,html)
    html=re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>',lambda m:'<style>\n'+resolve(m.group(1)).read_text(encoding='utf-8')+'\n</style>',html)
    html=pattern.sub(lambda m:json.dumps(uri(resolve(m.group(2)))),html)
    if re.search(r'<script[^>]+src=|<link[^>]+rel="stylesheet"',html):raise ValueError('Unbundled scripts/styles remain')
    path=root/'Synergy_Preview.html';path.write_text(html,encoding='utf-8')
    return path

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('directory');args=parser.parse_args()
    path=bundle(Path(args.directory));print(json.dumps({'html':str(path),'bytes':path.stat().st_size}))
