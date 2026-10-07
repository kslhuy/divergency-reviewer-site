const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = __dirname;
const configs = {
  K: {
    mouth: { target: [90, 102, 24, 18], size: [86, 64], centers: [[328,354],[322,350],[330,349],[322,349]] },
    eyes: [ {crop:[190,243,74,57],target:[60,76,22,16]}, {crop:[312,186,68,64],target:[98,60,22,18]} ],
  },
  H: {
    mouth: { target: [62, 100, 28, 22], size: [94, 72], centers: [[249,361],[232,359],[264,345],[249,341]] },
    eyes: [ {crop:[138,246,60,27],target:[50,82,16,10]}, {crop:[264,246,60,27],target:[84,82,18,10]} ],
  },
  N: {
    mouth: { target: [50, 102, 26, 20], size: [84, 66], centers: [[213,350],[195,349],[233,335],[212,334]] },
    eyes: [ {crop:[141,226,30,21],target:[48,74,10,8]}, {crop:[220,222,57,25],target:[74,76,18,8]} ],
  },
};
function median(a) { return a.sort((x,y)=>x-y)[Math.floor(a.length/2)]; }
const clamp = x => Math.max(0, Math.min(255, Math.round(x)));
async function patch(sheet, frame, crop, target, original, kind='mouth') {
  const [x,y,w,h]=crop;
  const [tx,ty,tw,th]=target;
  const small = await sharp(sheet).extract({left:frame%3*512+x,top:Math.floor(frame/3)*512+y,width:w,height:h})
    .resize(tw/2,th/2,{kernel:'nearest'}).ensureAlpha().raw().toBuffer();
  const data = await sharp(small,{raw:{width:tw/2,height:th/2,channels:4}}).resize(tw,th,{kernel:'nearest'}).raw().toBuffer();
  const sourceEdge=[[],[],[]], destEdge=[[],[],[]];
  for(let py=0;py<th;py++) for(let px=0;px<tw;px++) {
    const rad=Math.sqrt(((px+.5-tw/2)/(tw/2))**2+((py+.5-th/2)/(th/2))**2);
    if(rad>.75 && rad<1) for(let c=0;c<3;c++) {
      sourceEdge[c].push(data[(py*tw+px)*4+c]);
      destEdge[c].push(original[((ty+py)*156+tx+px)*4+c]);
    }
  }
  const shifts=sourceEdge.map((a,c)=>Math.max(-24,Math.min(24,median(destEdge[c])-median(a))));
  for(let py=0;py<th;py++) for(let px=0;px<tw;px++) {
    const i=(py*tw+px)*4;
    const rad=Math.sqrt(((px+.5-tw/2)/(tw/2))**2+((py+.5-th/2)/(th/2))**2);
    const opacity=kind==='mouth'?Math.max(0,Math.min(1,(1-rad)/.22)):Math.max(0,Math.min(1,Math.min(px+.5,py+.5,tw-px-.5,th-py-.5)));
    for(let c=0;c<3;c++) data[i+c]=clamp(data[i+c]+shifts[c]);
    data[i+3]=clamp(opacity*255);
  }
  return {input:await sharp(data,{raw:{width:tw,height:th,channels:4}}).png().toBuffer(),left:tx,top:ty};
}
const rhythm = [
 [0,320],[1,100],[4,130],[1,90],[2,130],[1,90],[3,150],[1,90],[0,180],
 [6,50],[5,90],[6,50],[0,120],[1,100],[2,140],[4,110],[1,90],[3,130],[1,100],[0,230],
 [1,100],[4,120],[2,150],[1,90],[4,130],[1,100],[0,280],[1,100],[3,160],[1,90],[2,130],[1,90],[0,160],
 [6,50],[5,80],[6,50],[0,170],[1,100],[4,140],[1,90],[2,130],[4,130],[1,100],[0,450]
];
async function main() {
  await fs.mkdir(path.join(root,'frames'),{recursive:true});
  const contact=[];
  const manifest=[];
  for(const [ci,name] of ['K','H','N'].entries()) {
    const cfg=configs[name];
    const sheet=path.join(root,'sheets',`${name}-sheet.png`);
    const original=await fs.readFile(path.join(root,'sources',`${name}-original.png`));
    const raw=await sharp(original).ensureAlpha().raw().toBuffer();
    const states=[original];
    for(let i=0;i<4;i++) {
      const [cx,cy]=cfg.mouth.centers[i], [w,h]=cfg.mouth.size;
      const p=await patch(sheet,i+1,[cx-w/2,cy-h/2,w,h],cfg.mouth.target,raw);
      states.push(await sharp(original).composite([p]).png().toBuffer());
    }
    const eyelids=[];
    for(const eye of cfg.eyes) eyelids.push(await patch(sheet,5,eye.crop,eye.target,raw,'eyes'));
    const blink=await sharp(original).composite(eyelids).png().toBuffer();
    states.push(blink);
    const halfway=await sharp(blink).ensureAlpha().raw().toBuffer();
    for(let i=0;i<halfway.length;i+=4) for(let c=0;c<3;c++) halfway[i+c]=Math.round((halfway[i+c]+raw[i+c])/2);
    states.push(await sharp(halfway,{raw:{width:156,height:156,channels:4}}).png().toBuffer());
    for(let i=0;i<states.length;i++) await fs.writeFile(path.join(root,'frames',`${name}-${i}.png`),states[i]);
    for(let i=0;i<6;i++) contact.push({input:states[i],left:i*156,top:ci*156});
    const sequence=ci===0?rhythm:rhythm.map(([s,d],i)=>[s===2&&i%3===ci?3:s,Math.round(d*(ci===1?1.06:.95)/10)*10]);
    const images=await Promise.all(sequence.map(([s])=>sharp(states[s]).resize(468,468,{kernel:'nearest'}).png().toBuffer()));
    const output=path.join(root,`${name}-talking.gif`);
    await sharp(images,{join:{animated:true}}).gif({loop:0,delay:sequence.map(x=>x[1]),colours:256,dither:0,effort:7}).toFile(output);
    const meta=await sharp(output,{animated:true}).metadata();
    if(meta.pages<2 || meta.loop!==0 || meta.width!==468 || meta.pageHeight!==468) throw new Error(`Invalid GIF for ${name}`);
    manifest.push({name,file:`${name}-talking.gif`,width:meta.width,height:meta.pageHeight,frames:meta.pages,durationMs:meta.delay.reduce((a,b)=>a+b,0),loop:meta.loop});
  }
  const strip=await sharp({create:{width:936,height:468,channels:4,background:'#252831'}}).composite(contact).png().toBuffer();
  await sharp(strip).resize(1872,936,{kernel:'nearest'}).png().toFile(path.join(root,'contact-sheet.png'));
  await fs.writeFile(path.join(root,'manifest.json'),JSON.stringify(manifest,null,2));
  console.log(JSON.stringify(manifest,null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
