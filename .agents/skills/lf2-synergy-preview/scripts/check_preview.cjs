/* Validate choreography across every time slice. Browser inspection remains necessary. */
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const root=path.resolve(process.argv[2]||'.'),elements={},logged=[];let drawCalls=0;
class Element{constructor(){this.children=[];this.style={};this.dataset={};this.attrs={};this.textContent='';this.value='';}setAttribute(k,v){this.attrs[k]=v}append(...es){this.children.push(...es)}replaceChildren(...es){this.children=es}querySelectorAll(){return this.children}getContext(){return ctx}}
const ctx=new Proxy({measureText:s=>({width:String(s).length*5})},{get(o,k){if(k in o)return o[k];return (...args)=>{drawCalls++;for(const v of args)if(typeof v==='number'&&!Number.isFinite(v))throw Error(k+' non-finite value');};},set(o,k,v){o[k]=v;return true}});
const buttons=['hit','miss'].map(mode=>{const e=new Element();e.dataset.mode=mode;return e});
const document={getElementById:id=>elements[id]??=new Element(),createElement:()=>new Element(),createTextNode:text=>({textContent:text}),querySelectorAll:()=>buttons,addEventListener(){},hidden:false};
class Image{constructor(){this.width=2048;this.height=4096}set src(v){if(!v.startsWith('data:'))assert(fs.existsSync(path.join(root,v)),'Missing image '+v);queueMicrotask(()=>this.onload?.())}}
const context={window:{},document,Image,history:{replaceState(){}},location:{hash:''},console:{...console,error:e=>logged.push(String(e))},requestAnimationFrame(){},Math,queueMicrotask};
vm.createContext(context);
for(const name of ['preview-data.js','choreography.js','viewer.js'])vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),context,{filename:name});
async function run(){
 await new Promise(resolve=>setImmediate(resolve));const api=context.window.synergyPreview,data=context.window.PREVIEW_DATA;
 assert(api?.state.loaded,'Viewer did not load');assert(data.scenes.length,'No scenes');
 const ids=new Set();for(const c of data.characters){assert(c.id&&!ids.has(c.id),'Duplicate/empty character id');ids.add(c.id)}
 for(const clips of Object.values(data.sprites))for(const c of Object.values(clips)){assert(c.frames.length&&c.ticks>0,'Empty clip');assert.equal(c.frames.reduce((sum,f)=>sum+f.t,0),c.ticks,'Cel ticks differ from clip duration');for(const f of c.frames){assert(f.t>0,'Nonpositive frame duration');if(!f.empty){assert(f.r.length===4&&f.r[2]>0&&f.r[3]>0,'Invalid sprite rect');assert(f.p.length===2,'Invalid pivot');assert(data.atlases[f.atlas||'main'],'Missing atlas key')}}}
 let seekStates=0,maxCast=0;const sceneIds=new Set();
 for(const sc of data.scenes){
  assert(sc.id&&!sceneIds.has(sc.id),'Duplicate/empty scene id');sceneIds.add(sc.id);assert(sc.duration>0,'Invalid duration');
  assert(sc.roles.length>=2,'Synergy requires at least two roles');assert.equal(new Set(sc.roles.map(r=>r.character)).size,sc.roles.length,'Duplicate role');maxCast=Math.max(maxCast,sc.roles.length);
  assert(sc.beats.length>=2&&sc.beats[0].at===0,'Missing opening beat');sc.beats.forEach((b,i)=>{assert(b.at<sc.duration&&(!i||b.at>sc.beats[i-1].at),'Invalid beat ordering');assert(b.title&&b.caption,'Missing beat text')});assert(sc.miss&&sc.miss.at>=0&&sc.miss.at<sc.duration,'Missing/invalid miss outcome');
  api.choose(sc.id);assert.equal(elements.roles.children.length,sc.roles.length,'Dynamic role count mismatch');
  for(const missed of [false,true]){api.outcome(missed);for(let i=0;i<=Math.ceil(sc.duration*30);i++){api.seek(i/30);assert(!api.state.error,api.state.error);seekStates++}api.seek(sc.miss.at+.05);assert.equal(elements.captionTitle.textContent,missed?sc.miss.title:sc.beats.filter(b=>b.at<=sc.miss.at+.05).at(-1).title);api.seek(0);assert.equal(elements.captionTitle.textContent,sc.beats[0].title)}
 }
 assert.deepEqual(logged,[]);const report={passed:true,scenes:data.scenes.length,outcomesPerScene:2,maxCast,seekStates,drawCalls,checks:['source clips and cel duration','finite draw calls','dynamic roles','success/failure captions','forward seek and rewind']};fs.writeFileSync(path.join(root,'validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}
run().catch(e=>{console.error(e);process.exitCode=1});
