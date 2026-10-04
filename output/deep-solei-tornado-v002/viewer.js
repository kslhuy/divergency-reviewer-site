/* Reusable viewer shell. Project-specific choreography lives in PREVIEW_SCENES. */
(() => {
'use strict';
const $=id=>document.getElementById(id),g=$('stage').getContext('2d'),data=window.PREVIEW_DATA;
const images={},state={index:0,t:0,missed:false,playing:true,speed:1,loaded:false,last:0,error:null};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),mix=(a,b,p)=>a+(b-a)*clamp(p),seg=(t,a,b)=>clamp((t-a)/(b-a)),smooth=p=>{p=clamp(p);return p*p*(3-2*p)};
g.imageSmoothingEnabled=false;
function frame(actor,clip,time,normalized=false,loop=false){
 const c=data.sprites[actor]?.[clip];if(!c||!c.frames.length)throw Error('Missing clip: '+actor+'/'+clip);
 let tick=normalized?clamp(time,0,.999999)*c.ticks:Math.max(0,time)*60;
 tick=loop?tick%c.ticks:Math.min(tick,c.ticks-.001);
 for(const f of c.frames){tick-=f.t;if(tick<0)return f;}return c.frames.at(-1);
}
function draw(f,x,y,o={}){
 if(!f||f.empty)return;const image=images[f.atlas||'main'];if(!image)throw Error('Missing atlas '+(f.atlas||'main'));
 const {scale=1.25,flip=false,alpha=1,rotation=0,center=false}=o,[sx,sy,w,h]=f.r;
 g.save();g.translate(Math.round(x),Math.round(y));g.rotate(rotation);g.scale(flip?-scale:scale,scale);g.globalAlpha=clamp(alpha);
 g.drawImage(image,sx,sy,w,h,center?-w/2:-f.p[0],center?-h/2:-f.p[1],w,h);g.restore();
}
function sprite(actor,clip,x,y,time,o={}){draw(frame(actor,clip,time,o.normalized,o.loop),x,y,o);}
function image(key,x,y,o={}){const im=images[key];if(!im)throw Error('Missing image '+key);const r=o.rect||[0,0,im.width,im.height];draw({atlas:key,r,p:o.anchor||[r[2]/2,r[3]/2]},x,y,o);}
function shadow(x,y,w=32,alpha=.4){g.save();g.globalAlpha=alpha;g.fillStyle='#11191d';g.beginPath();g.ellipse(Math.round(x),Math.round(y)+2,w,6,0,0,Math.PI*2);g.fill();g.restore();}
function label(text,x,y,color='#bdc9ce'){g.font='10px system-ui';g.textAlign='center';g.fillStyle='#172028dd';const w=g.measureText(text).width;g.fillRect(Math.round(x-w/2-6),Math.round(y-10),Math.round(w+12),17);g.fillStyle=color;g.fillText(text,Math.round(x),Math.round(y+2));}
function line(points,color,width=2,alpha=1){g.save();g.globalAlpha=alpha;g.strokeStyle=color;g.lineWidth=width;g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(Math.round(x),Math.round(y)):g.moveTo(Math.round(x),Math.round(y)));g.stroke();g.restore();}
function ring(x,y,rx,ry,color,width=2,alpha=1,a=0,b=Math.PI*2){const pts=[];for(let i=0;i<=64;i++){const angle=mix(a,b,i/64);pts.push([x+Math.cos(angle)*rx,y+Math.sin(angle)*ry]);}line(pts,color,width,alpha);}
function burst(x,y,p,color='#98dace',size=80){if(p<0||p>1)return;const e=smooth(p);for(let i=0;i<14;i++){const a=i*Math.PI*2/14;line([[x+Math.cos(a)*size*e*.65,y+Math.sin(a)*size*e*.65],[x+Math.cos(a)*size*e,y+Math.sin(a)*size*e]],color,2,1-p);}ring(x,y,6+size*e,4+size*e*.45,color,2,1-p);}
function sparks(x,y,t,color='#98dace',n=16,radius=32){for(let i=0;i<n;i++){const p=(t*.75+i*.137)%1,a=i*2.399;g.globalAlpha=(1-p)*.8;g.fillStyle=color;g.fillRect(Math.round(x+Math.cos(a)*radius*p),Math.round(y+Math.sin(a)*radius*.5*p),i%3?2:3,2);}g.globalAlpha=1;}
function event(text){$('eventBadge').textContent=text;$('eventBadge').style.opacity=text?'1':'0';}
function background(t){
 g.clearRect(0,0,800,390);g.fillStyle='#292e37';g.fillRect(0,0,800,390);g.fillStyle='#252a32';g.fillRect(0,0,800,176);
 for(let i=0;i<7;i++){g.fillStyle=i%2?'#2c323a':'#2b3039';g.fillRect(i*130-20,36,77,146);g.fillStyle='#363b43';g.fillRect(i*130-20,35,78,2);}
 g.fillStyle='#454950';g.fillRect(0,183,800,2);g.fillStyle='#333a42';g.fillRect(0,185,800,205);
 for(let y=209;y<390;y+=35){g.fillStyle='#3c434a';g.fillRect(0,y,800,1);for(let x=-(y%70);x<800;x+=97){g.fillStyle='#394149';g.fillRect(x,y,1,35);}}
 g.fillStyle='#515a5e';g.fillRect(35,341,730,1);g.fillRect(35,335,1,12);g.fillRect(764,335,1,12);
 g.fillStyle='#67757d';g.font='9px system-ui';g.textAlign='left';g.fillText(data.title,36,363);g.textAlign='right';g.fillText('KHÔNG GIAN CHIẾN ĐẤU',765,363);
}
function fail(e){state.error=String(e.message||e);state.playing=false;$('loading').hidden=false;$('loading').textContent='Không thể chạy cảnh: '+state.error;console.error(e);}
function render(){
 if(!state.loaded||!data.scenes.length)return;
 try{
  const sc=data.scenes[state.index];background(state.t);event('');
  const routine=window.PREVIEW_SCENES[sc.id];if(!routine)throw Error('Missing choreography: '+sc.id);routine(d,state.t,sc,state.missed);
  let phase=0;sc.beats.forEach((b,i)=>{if(state.t>=b.at)phase=i});
  const b=state.missed&&sc.miss&&state.t>=sc.miss.at?sc.miss:sc.beats[phase];
  $('captionTitle').textContent=b.title;$('captionBody').textContent=b.caption;$('captionIndex').textContent=String(phase+1).padStart(2,'0');
  $('phaseBadge').textContent=String(phase+1).padStart(2,'0')+' / '+b.title.toLocaleUpperCase('vi');
  $('chapters').querySelectorAll('button').forEach((el,i)=>el.setAttribute('aria-current',String(i===phase)));
  $('time').textContent=Math.min(state.t,sc.duration).toFixed(2)+' / '+sc.duration.toFixed(1)+'s';$('timeline').value=Math.round(Math.min(state.t,sc.duration)*100);
  $('stage').setAttribute('aria-label',sc.name+'. '+b.title+'. '+b.caption);
 }catch(e){fail(e);}
}
const d={g,images,width:800,height:390,ground:292,clamp,mix,seg,smooth,frame,draw,sprite,image,shadow,label,line,ring,burst,sparks,event};
function setPlaying(v){state.playing=v;$('play').textContent=v?'Ⅱ Tạm dừng':'▶ Phát';$('play').setAttribute('aria-label',v?'Tạm dừng hoạt cảnh':'Phát hoạt cảnh');}
function dot(color){const el=document.createElement('i');el.className='dot';el.style.background=color;return el;}
function choose(index){
 if(index<0||index>=data.scenes.length)throw Error('Unknown scene');state.index=index;state.t=0;state.missed=false;$('outcome').value='hit';
 const sc=data.scenes[index];$('outcome').hidden=!sc.miss;$('title').textContent=sc.name;$('category').textContent=sc.kind;$('formula').textContent=sc.formula;$('timeline').max=sc.duration*100;
 $('scenarios').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
 $('chapters').style.gridTemplateColumns='repeat('+sc.beats.length+',minmax(0,1fr))';
 $('chapters').replaceChildren(...sc.beats.map((beat,i)=>{const b=document.createElement('button');b.className='chapter';b.textContent=String(i+1).padStart(2,'0')+' '+beat.title;b.onclick=()=>{state.t=beat.at+.01;render()};return b;}));
 $('roles').replaceChildren(...sc.roles.map(role=>{const c=data.characters.find(c=>c.id===role.character);if(!c)throw Error('Unknown role: '+role.character);const el=document.createElement('div'),b=document.createElement('b'),p=document.createElement('p');el.className='role';b.append(dot(c.color),document.createTextNode(c.name.toLocaleUpperCase('vi')));p.textContent=role.text;el.append(b,p);return el;}));
 $('legend').replaceChildren(...sc.roles.map(role=>{const c=data.characters.find(c=>c.id===role.character),el=document.createElement('div');el.append(dot(c.color),document.createTextNode(c.name));return el;}));
 history.replaceState(null,'','#'+sc.id);render();
}
function outcome(missed){state.missed=!!missed&&!!data.scenes[state.index].miss;$('outcome').value=state.missed?'miss':'hit';render();}
$('outcome').onchange=()=>outcome($('outcome').value==='miss');
function seek(t){setPlaying(false);state.t=clamp(t,0,data.scenes[state.index].duration);render();}
$('brand').textContent=data.brand||'DIVERGENCY';$('projectLabel').textContent=data.title+' · '+(data.subtitle||'SYNERGY PREVIEW');document.title=data.title+' — Cộng hưởng';
data.scenes.forEach((sc,i)=>{const b=document.createElement('button'),strong=document.createElement('strong'),small=document.createElement('small');b.className='scenario';strong.textContent=String(i+1).padStart(2,'0')+' '+sc.name;small.textContent=sc.short;b.append(strong,small);b.onclick=()=>{choose(i);setPlaying(true)};$('scenarios').append(b);});
$('play').onclick=()=>setPlaying(!state.playing);$('replay').onclick=()=>{state.t=0;setPlaying(true);render()};$('timeline').oninput=()=>seek(Number($('timeline').value)/100);$('speed').onchange=()=>state.speed=Number($('speed').value);
document.addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName))return;if(e.code==='Space'){e.preventDefault();setPlaying(!state.playing)}if(e.code==='ArrowLeft'||e.code==='ArrowRight'){e.preventDefault();seek(state.t+(e.code==='ArrowLeft'?-.25:.25))}});
document.addEventListener('visibilitychange',()=>state.last=0);
function loop(now){const dt=state.last?Math.min(.1,(now-state.last)/1000):0;state.last=now;if(state.playing&&state.loaded&&!state.error&&!document.hidden){state.t+=dt*state.speed;if(state.t>data.scenes[state.index].duration+1.1)state.t=0;render()}requestAnimationFrame(loop)}
window.synergyPreview={get state(){return {...state,scenario:data.scenes[state.index]?.id}},scenes:data.scenes.map(s=>({id:s.id,duration:s.duration,beats:s.beats.map(b=>b.at)})),seek,outcome,choose:id=>choose(data.scenes.findIndex(s=>s.id===id))};
if(!data.scenes.length){$('loading').textContent='Chưa có cảnh. Điền preview-data.js và choreography.js trước khi bàn giao.';return;}
choose(Math.max(0,data.scenes.findIndex(s=>s.id===(location.hash.slice(1)||data.defaultScene))));
Promise.all(Object.entries(data.atlases).map(([key,url])=>new Promise((resolve,reject)=>{const im=new Image();images[key]=im;im.onload=resolve;im.onerror=()=>reject(Error('Cannot load '+url));im.src=url;}))).then(()=>{images.tornado=window.recolorFreezeAtlas(images.tornado);state.loaded=true;$('loading').hidden=true;render()}).catch(fail);
requestAnimationFrame(loop);
})();
