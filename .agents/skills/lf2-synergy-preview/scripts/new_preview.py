"""Create a new editable preview. Does not overwrite an existing directory."""
from pathlib import Path
import argparse,json,shutil

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out',required=True)
    parser.add_argument('--title',default='Cộng hưởng nhân vật')
    parser.add_argument('--example',action='store_true',help='Copy the two-character API example, including original sprites')
    args=parser.parse_args()
    skill=Path(__file__).resolve().parents[1]
    out=Path(args.out).resolve()
    if out.exists():parser.error('Output already exists; choose a new version or edit its source explicitly.')
    out.mkdir(parents=True)
    (out/'assets').mkdir()
    for name in ('index.html','viewer.js'):shutil.copy2(skill/'assets/viewer'/name,out/name)
    if args.example:
        for name in ('preview-data.js','choreography.js'):shutil.copy2(skill/'assets/example'/name,out/name)
        shutil.copy2(skill/'assets/example/packed.png',out/'assets/packed.png')
        shutil.copy2(skill/'assets/example/timing-notes.json',out/'assets/timing-notes.json')
    else:
        data={'title':args.title,'brand':'DIVERGENCY','subtitle':'SYNERGY PREVIEW','characters':[],'atlases':{},'sprites':{},'scenes':[]}
        (out/'preview-data.js').write_text('window.PREVIEW_DATA = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
        (out/'choreography.js').write_text('window.PREVIEW_SCENES = {};\n',encoding='utf-8')
    (out/'sources.md').write_text('# Nguồn hình và ý tưởng\n\n'+('Mẫu API dùng sprite gốc Solei/Tulas/Gunn từ LF2Revie; không phải ý tưởng mới cho roster khác.\n' if args.example else 'Ghi nguồn clip, nhân vật, file ý tưởng và prompt hình mới tại đây trước khi bàn giao.\n'),encoding='utf-8')
    print(json.dumps({'output':str(out),'example':args.example,'ready':False,'next':'Fill data/choreography, verify, then run bundle_preview.py'},ensure_ascii=False))

if __name__=='__main__':main()
