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
