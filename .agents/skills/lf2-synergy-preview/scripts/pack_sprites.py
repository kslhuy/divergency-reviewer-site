"""Pack selected exported Unity sprite rectangles losslessly, preserving blank cel durations."""
from pathlib import Path
from PIL import Image
import argparse,json

def pack(raw_path,out,selection=None,width=2048,zero_tick_duration=None):
    data=json.loads(raw_path.read_text(encoding='utf-8'));raw=raw_path.parent
    selected=json.loads(selection.read_text(encoding='utf-8')) if selection else {a:list(v) for a,v in data.items()}
    textures={};unique={};result={};notes=[];x=y=rowh=0
    for actor,names in selected.items():
        result[actor]={}
        for name in names:
            clip=data[actor][name];frames=[]
            for cel in clip['frames']:
                s=cel['s'];ticks=cel['ticks']
                if ticks<=0:
                    if zero_tick_duration is None:raise ValueError(f'Nonpositive source duration: {actor}/{name}. Inspect source timing or explicitly pass --zero-tick-duration for preview-only pacing.')
                    notes.append({'actor':actor,'clip':name,'frame':len(frames),'sourceTicks':ticks,'previewTicks':zero_tick_duration});ticks=zero_tick_duration
                if not s:frames.append({'empty':True,'t':ticks});continue
                key=tuple(s[k] for k in ('file','x','y','w','h'))
                if key not in unique:
                    if s['file'] not in textures:textures[s['file']]=Image.open(raw/s['file']).convert('RGBA')
                    sx,sy,w,h=[round(s[k]) for k in ('x','y','w','h')];tex=textures[s['file']]
                    if min(sx,sy)<0 or w<=0 or h<=0 or sx+w>tex.width or sy+h>tex.height:raise ValueError(f'Invalid rect: {key}')
                    if w>width:raise ValueError(f'Sprite width {w} exceeds atlas width {width}; increase --width')
                    if x+w>width:x=0;y+=rowh+2;rowh=0
                    unique[key]=((x,y,w,h),tex.crop((sx,sy,sx+w,sy+h)))
                    x+=w+2;rowh=max(rowh,h)
                frames.append({'r':unique[key][0],'p':[s['px'],s['py']],'u':s['ppu'],'t':ticks})
            if not frames:raise ValueError(f'Empty clip: {actor}/{name}')
            result[actor][name]={'frames':frames,'ticks':sum(f['t'] for f in frames)}
    if not unique:raise ValueError('No drawable sprites')
    sheet=Image.new('RGBA',(width,y+rowh))
    for (x,y,w,h),image in unique.values():sheet.paste(image,(x,y))
    out.mkdir(parents=True,exist_ok=True);sheet.save(out/'packed.png',optimize=True)
    (out/'sprites.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    (out/'packing-notes.json').write_text(json.dumps({'previewTimingOverrides':notes},ensure_ascii=False,indent=2),encoding='utf-8')
    return {'atlas':str(out/'packed.png'),'size':sheet.size,'sprites':len(unique),'actors':list(result)}

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--raw',type=Path,required=True);parser.add_argument('--out',type=Path,required=True);parser.add_argument('--select',type=Path);parser.add_argument('--width',type=int,default=2048);parser.add_argument('--zero-tick-duration',type=int,help='Explicit preview-only duration for source cels whose ticks are zero/negative');args=parser.parse_args()
    if args.width<=0:parser.error('--width must be positive')
    if args.zero_tick_duration is not None and args.zero_tick_duration<=0:parser.error('--zero-tick-duration must be positive')
    print(json.dumps(pack(args.raw,args.out,args.select,args.width,args.zero_tick_duration)))
