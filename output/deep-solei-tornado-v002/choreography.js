/* All choreography is a pure function of absolute time. Original source cels only. */
(() => {
'use strict';
const M='#98dace', R='#d7787e', V='#b2aed5', S={deep:1.25,solei:1.5,enemy:1.4};
const C=window.PREVIEW_DATA.sprites;
function cell(d,a,c,i,x,y,o={}) {const f=C[a][c].frames[Math.max(0,Math.min(C[a][c].frames.length-1,Math.floor(i)))]; d.draw(f,x,y,{scale:S[a]||1.25,...o});}
function hero(d,a,c,x,y,t,o={}) {d.shadow(x,o.ground||300,30,.32);d.sprite(a,c,x,y,t,{scale:S[a],loop:c==='Idle'||c==='Run'||c==='Run_1',...o});d.label(a.toUpperCase(),x,(o.ground||300)+24,a==='solei'?M:V);}
function pose(d,a,c,i,x,y,o={}) {d.shadow(x,o.ground||300,30,.32);cell(d,a,c,i,x,y,o);d.label(a.toUpperCase(),x,(o.ground||300)+24,a==='solei'?M:V);}
function idle(d,a,x,t,o={}) {hero(d,a,'Idle',x,o.y||300,t,o);}
function action(d,a,c,x,y,t,start,end,o={}) {hero(d,a,c,x,y,d.seg(t,start,end),{normalized:true,...o});}
function fx(d,a,c,x,y,t,o={}) {d.sprite(a,c,x,y,t,{scale:1.4,center:true,loop:true,...o});}
function impact(d,x,y,t,at,color=M,size=48) {if(t>=at&&t<at+.65){d.burst(x,y,(t-at)/.65,color,size);fx(d,'soleifx','ef_kick_hit',x,y,t-at,{loop:false,scale:1.8});}}
function enemy(d,x,y,t,at=99,dx=65,o={}) {
 const p=d.seg(t,at,at+1.05),hit=t>=at,xx=x+dx*d.smooth(p),yy=hit?d.mix(y,o.ground||300,p)-Math.sin(Math.PI*p)*35:y;
 d.shadow(xx,o.ground||300,24,.28);
 d.sprite('enemy',hit?(p>.92?'laying':'falling'):'Idle',xx,yy,hit?t-at:t,{scale:1.4,flip:o.flip??true});
 if(o.label)d.label(o.label,xx,yy-92,'#c2c5b2');
 return [xx,yy];
}
function arrow(d,points,color=M,alpha=.45) {d.line(points,color,1,alpha);const b=points.at(-1),a=points.at(-2),ang=Math.atan2(b[1]-a[1],b[0]-a[0]);d.line([[b[0]-8*Math.cos(ang-.5),b[1]-8*Math.sin(ang-.5)],b,[b[0]-8*Math.cos(ang+.5),b[1]-8*Math.sin(ang+.5)]],color,1,alpha);}
function target(d,x,y,t,color=M) {d.ring(x,y,17,8,color,1,.45+.18*Math.sin(t*4));d.line([[x-6,y],[x+6,y]],color,1,.6);}
function trail(d,fun,p,color) {const pts=[];for(let i=0;i<=20;i++)pts.push(fun(Math.max(0,p-.2+i*.01)));d.line(pts,color,2,.52);}
function sword(d,x,y,t,rotation=0,scale=1.1) {cell(d,'deepfx','Sky_Stomp_Sword',8,x,y,{center:true,scale:scale*1.35,rotation});}
function wind(d,x,y,t,scale=1.3) {fx(d,'soleifx','ef_tornator_spin',x,y,t,{scale});}
function spin(d,a,c,x,y,t,o={}) {const n=a==='deep'?5+Math.floor((t*10)%18):3+Math.floor((t*10)%15);pose(d,a,c,n,x,y,o);}
function bird(d,x,y,rotation=0,alpha=1) {d.image('chimkiem',x,y,{scale:130/d.images.chimkiem.width,rotation,alpha});}

window.PREVIEW_SCENES={
 'huyet-duc-kiem-hon'(d,t,scene){
  const airY=d.mix(300,205,d.smooth(d.seg(t,.8,1.8)))+0;
  enemy(d,610,airY,t,4.7,42,{label:t<1.7?'TRÊN CAO':undefined});
  enemy(d,670,300,t,6.7,52);
  if(t<1.1||t>3.4)idle(d,'deep',140,t);else action(d,'deep','Sk1_Soul_Liberation',140,300,t,1.1,3.3);
  if(t<1.4||t>3.6)idle(d,'solei',285,t);else action(d,'solei','Sk3_HoldKick',285,300,t,1.4,3.5);
  if(t<2.8){target(d,440,220,t,V);if(t>1){arrow(d,[[205,242],[440,220]],V,.32);arrow(d,[[340,257],[440,220]],R,.32);}}
  if(t>=2.05&&t<2.8){const p=d.seg(t,2.05,2.8);fx(d,'deepfx','Bullet_Soul_Liberation',d.mix(205,440,p),d.mix(242,220,p),t-2.05,{scale:1.35});}
  if(t>=2.35&&t<2.8){const p=d.seg(t,2.35,2.8);fx(d,'soleifx','bird_fly_projectil',d.mix(340,440,p),d.mix(257,220,p),t-2.35,{scale:1.65});}
  {
   impact(d,440,220,t,2.8,V,62);if(t>=2.8&&t<3.8)d.event('HUYẾT DỰC KIẾM HỒN');
   const first=p=>[d.mix(440,610,p),d.mix(220,163,p)-Math.sin(p*Math.PI)*27];
   const second=p=>[d.mix(610,670,p)+Math.sin(p*Math.PI)*42,d.mix(163,257,p)];
   if(t>=2.85&&t<4.7){let p=d.smooth(d.seg(t,3.15,4.7));trail(d,first,p,V);const [x,y]=first(p);bird(d,x,y,-.22);}
   if(t>=4.7&&t<6.7){const p=d.smooth(d.seg(t,4.9,6.7));trail(d,second,p,R);const [x,y]=second(p);bird(d,x,y,.45+p*.55);if(t<5.8)d.label('ĐỔI MỤC TIÊU',590,112,M);}
   impact(d,610,163,t,4.7,V,54);impact(d,670,257,t,6.7,R,65);
   if(t>6.7&&t<7.5)fx(d,'deepfx','hit_ef',670,257,t-6.7,{scale:2,loop:false});
  }
 },
 'quy-dao-hoi-phong'(d,t,scene,missed=false){
  const cyan='#51ead6',red='#cb0b0b',cx=520,base=310;
  const growth=d.smooth(d.seg(t,2.8,3.65)),fade=1-d.smooth(d.seg(t,8,8.85)),power=growth*fade;
  // Both branches and all hit pulses depend only on absolute time, including rewind.
  if(missed){
   if(t>=1&&t<2.65){spin(d,'solei','Solei_Combat_solei_tornator',330,300,t);wind(d,350,260,t,1.5);}else idle(d,'solei',330,t);
   const x=t<2.8?d.mix(145,380,d.smooth(d.seg(t,1.7,2.8))):d.mix(380,620,d.smooth(d.seg(t,3.15,4.55)));
   if(t>=1.7&&t<4.55)spin(d,'deep','Sk3_Swift',x,300,t);else idle(d,'deep',x,t);
   enemy(d,535,300,t,4.05,68);enemy(d,645,300,t);
   impact(d,535,256,t,4.05,cyan,35);
   if(t>=2.8&&t<4)d.event('LỠ NHỊP · HAI CHIÊU TÁCH RỜI');
   return;
  }
  // Source attack poses remain visible to the left and along the outside of the vortex.
  if(t>=1&&t<8){spin(d,'solei','Solei_Combat_solei_tornator',330,300,t);wind(d,350,260,t,1.5);}else idle(d,'solei',330,t);
  let dx=145,dy=300,flip=false;
  if(t>=1.7&&t<2.8)dx=d.mix(145,395,d.smooth(d.seg(t,1.7,2.8)));
  if(t>=2.8&&t<8){const p=d.seg(t,2.8,8),angle=Math.PI+p*Math.PI*2;dx=cx+Math.cos(angle)*143;dy=270+Math.sin(angle)*77;flip=Math.sin(angle)<0;}
  if(t>=8){dx=d.mix(377,240,d.smooth(d.seg(t,8,8.75)));dy=d.mix(270,300,d.smooth(d.seg(t,8,8.75)));flip=true;}
  if(t>=1.7&&t<8.75)spin(d,'deep','Sk3_Swift',dx,dy,t,{flip});else idle(d,'deep',dx,t,{flip});
  if(t>=2.3&&t<3.5){d.line([[360,265],[400,265],[cx,base-35]],cyan,3,.7);d.line([[dx,dy-30],[450,270],[cx,base-35]],red,3,.7);}
  if(power>0){
   d.shadow(cx,base,75*growth,.25*fade);
   // Ten original Freeze cels; fixed palette substitution only.
   // Original aspect ratio and bottom-center pivots, no added tornado geometry.
   d.sprite('synergyfx','TornadoSpin',cx,base,t-2.8,{scale:1.6*growth,loop:true,alpha:fade});

  }
  for(let j=0;j<2;j++){
   const startX=j?645:535,phase=j*Math.PI;
   let ex=startX,ey=300,rotation=0,clip='Idle';
   if(t>=3&&t<3.6){const p=d.smooth(d.seg(t,3,3.6));ex=d.mix(startX,cx+Math.cos(phase)*45,p);ey=d.mix(300,270,p);clip='hurt_1';}
   const orbit=u=>{const p=d.seg(u,3.6,8),a=(u-3.6)*5+phase;return [cx+Math.cos(a)*(45+20*p),270-137*p+Math.sin(a)*9];};
   if(t>=3.6&&t<8){[ex,ey]=orbit(t);rotation=Math.sin((t-3.6)*5+phase)*.35;clip='falling';}
   if(t>=8){const [sx,sy]=orbit(8),p=d.seg(t,8,9.55+j*.25);ex=d.mix(sx,j?710:435,p);ey=d.mix(sy,300,p)-Math.sin(Math.PI*p)*120;rotation=(j?1:-1)*Math.PI*2*p;clip=p>=1?'laying':'falling';if(p>=1)rotation=0;}
   d.shadow(ex,300,24,.12+.16*d.seg(ey,80,300));
   const hitIndex=t>=3.6&&t<8?Math.min(10,Math.floor((t-3.6)/.36)):-1,hitAt=3.6+hitIndex*.36;
   const hitPulse=hitIndex>=0&&t-hitAt<.16;
   d.sprite('enemy',hitPulse?'hurt_1':clip,ex+(hitPulse?Math.sin((t-hitAt)*90)*3:0),ey,t,{scale:1.4,flip:j===0,rotation});
   if(hitPulse)d.burst(ex,ey-34,(t-hitAt)/.16,hitIndex%2?red:cyan,28);
   impact(d,ex,ey-30,t,8,j?red:cyan,60);
   if(t>=3.6&&t<9.2){const hits=t>=8?12:Math.min(11,1+Math.floor((t-3.6)/.36));d.label(hits+' HIT',ex,ey-76,j?red:cyan);}
   impact(d,j?710:435,300,t,9.55+j*.25,j?red:cyan,30);
  }
  impact(d,400,265,t,2.8,cyan,58);
  if(t>=2.8&&t<3.55)d.event('CỘNG HƯỞNG · LỐC XANH–ĐỎ');
  if(t>=3.6&&t<7.7)d.label('CUỐN LÊN · '+Math.min(11,1+Math.floor((t-3.6)/.36))+'/12 HIT MỖI ĐỊCH',520,337,cyan);
  if(t>=8&&t<9)d.event('HỒI PHONG · HẤT TUNG · 12 HIT');
 },
 'thang-kiem-phong'(d,t,scene){
  const aerialY=d.mix(300,170,d.smooth(d.seg(t,.5,2)))+0;
  enemy(d,478,aerialY,t,4.85,80);
  let dx=180,dy=300;
  if(t>=.7&&t<2.6){const p=d.seg(t,.7,2.6);dy=300-118*Math.sin(Math.PI*p);action(d,'deep','Sk5_Sky_Stomp_DEEP',dx,dy,t,.7,3.1);}
  else if(t>=6.7&&t<8.2){dx=d.mix(180,300,d.smooth(d.seg(t,6.7,8)));hero(d,'deep','Run_1',dx,300,t);}
  else idle(d,'deep',t>=8.2&&!180,t);
  if(t<1.6||t>=4.5)idle(d,'solei',402,t);
  else if(t<3.0)pose(d,'solei','Sk4_HyperStorm',d.mix(0,12,d.seg(t,1.6,3)),402,300);
  else if(t<3.45)pose(d,'solei','Sk4_HyperStorm',12,402,300);
  else pose(d,'solei','Sk4_HyperStorm',d.mix(13,47,d.seg(t,3.45,4.5)),402,300);
  if(t<3.2)target(d,445,292,t,V);
  if(t>=1.35&&t<2.3){const p=d.seg(t,1.35,2.3);sword(d,d.mix(230,447,p),d.mix(158,264,p),t,0,1);}
  if(t>=2.3&&t<(3.2)){sword(d,447,266,t,0,1);fx(d,'deepfx','Stomp_Blood_EF',447,291,t-2.3,{scale:1,center:false,loop:false});}
  impact(d,447,292,t,2.3,R,40);
  {
   if(t>=3.2&&t<5.25){const p=d.seg(t,3.2,5.25),x=447+Math.sin(p*Math.PI*3)*23,y=d.mix(266,118,d.smooth(p));sword(d,x,y,t,Math.PI+p*.45,1.15);wind(d,x,y+20,t,1.25);d.line([[447,287],[x,y+15]],M,2,.35);}
   if(t>=5.25&&t<7.8){const p=d.smooth(d.seg(t,5.25,7.8));sword(d,d.mix(447,320,p),d.mix(118,252,p)-Math.sin(p*Math.PI)*25,t,Math.PI*(1+p),1.1);}
   impact(d,447,279,t,3.2,M,58);impact(d,478,128,t,4.85,V,58);
   if(t>3.2&&t<4.1)d.event('ĐẢO MŨI KIẾM · XOÁY NGƯỢC');
   if(t>=7.8&&t<8.5)impact(d,320,252,t,7.8,V,25);
  }
 },
 'chuyen-moi-nghich-tram'(d,t,scene){
  let ex=325,ey=300,ec='Idle';
  if(t>=2.05&&t<3.65){const p=d.seg(t,2.05,3.65);ex=d.mix(325,522,p);ey=300-75*Math.sin(p*Math.PI*.65);ec='falling';}
  if(t>=3.65){
   if(t<5.7){const p=d.seg(t,3.65,5.7);ex=d.mix(522,322,p);ey=d.mix(233,275,p)-Math.sin(p*Math.PI)*40;ec='falling';}
   else {const p=d.seg(t,6.65,7.9);ex=d.mix(322,440,d.smooth(p));ey=300-Math.sin(p*Math.PI)*54;ec=t<6.65?'hurt_1':p>.95?'laying':'falling';}
  }
  d.shadow(ex,300,24,.28);d.sprite('enemy',ec,ex,ey,t,{scale:1.4,flip:true});
  if(t<.85)idle(d,'solei',248,t);else if(t<2.7)action(d,'solei','Solei_Combat_kick_fly',248,300,t,.85,3);else if(t<5.1)idle(d,'solei',248,t);else if(t<7.3)action(d,'solei','Sk1_MultiKICK',248,300,t,5.1,7.3);else idle(d,'solei',248,t);
  if(t<2.65||t>4.55)idle(d,'deep',565,t,{flip:true});
  
  else action(d,'deep','Sk7_UpStom',565,300-Math.sin(d.seg(t,2.65,4.55)*Math.PI)*35,t,2.65,4.55,{flip:true});
  impact(d,315,253,t,2.05,M,40);
  if(true){impact(d,522,193,t,3.65,V,53);impact(d,322,237,t,5.7,M,35);impact(d,322,250,t,6.65,M,55);}
  if(t>=2.05&&t<3.65){arrow(d,[[335,236],[445,182],[514,204]],M,.34);d.label('CHUYỀN →',416,164,M);}
  if(t>=3.65&&t<5.7){arrow(d,[[512,210],[424,180],[330,238]],V,.34);d.label('← TRẢ MỒI',422,147,V);}
  if(t>3.65&&t<4.8)d.event('NGHỊCH TRẢM · ĐẢO LỰC HẤT');
 },
 'gap-khuc-song-kich'(d,t,scene){
  enemy(d,500,308,t,5.55,58);
  enemy(d,666,245,t,5.25,55,{ground:245,label:t<1.5?'LÀN SAU':undefined});
  let dx=150,dy=300,dc='Idle';
  if(t>=1.4&&t<2.8){dx=d.mix(150,348,d.smooth(d.seg(t,1.4,2.8)));dc='Skill4_Cut_Deep';}
  if(t>=2.8){
   {const p=d.smooth(d.seg(t,2.8,5.25));dx=d.mix(348,614,p);dy=d.mix(300,245,p);dc=t<5.9?'Skill4_Cut_Deep':'Idle';}
  }
  if(dc==='Idle')idle(d,'deep',dx,t,{y:dy,ground:dy});
  else {const idx=t<2.8?d.mix(0,10,d.seg(t,1.4,2.8)):d.mix(10,21,d.seg(t,2.8,5.25));pose(d,'deep',dc,idx,dx,dy,{ground:dy});}
  const sx=t<2.8?408:d.mix(408,426,d.smooth(d.seg(t,3.3,4.7)));
  if(t<1.55||t>6.2)idle(d,'solei',sx,t,{y:308,ground:308});
  else if(t>=2.65&&t<3.15)pose(d,'solei','Sk2_KickBack',10,sx,308,{flip:true,ground:308});
  else if(t<3.6){const start=1.55;action(d,'solei','Sk2_KickBack',sx,308,t,start,3.6,{flip:true,ground:308});}
  else if(t<4.6)idle(d,'solei',sx,t,{y:308,ground:308});
  else action(d,'solei','Solei_Combat_kick_1',sx,308,t,4.6,6.2,{ground:308});
  if(t<2.8)target(d,355,256,t,M);
  if(true){
   impact(d,355,256,t,2.8,M,45);
   if(t>=2.8&&t<5.25){arrow(d,[[355,299],[485,275],[614,245]],M,.55);fx(d,'deepfx','Dash_EF_2',dx-32,dy-25,t,{scale:1.15});}
   impact(d,654,197,t,5.25,V,50);impact(d,490,258,t,5.55,M,48);
   if(t>2.8&&t<4)d.event('GẤP KHÚC · ĐỔI LÀN');
  } else {impact(d,490,258,t,4.15,V,45);if(t>2.8&&t<4)d.event('LỆCH ĐIỂM HẸN · LAO THẲNG');}
 }
};
})();
