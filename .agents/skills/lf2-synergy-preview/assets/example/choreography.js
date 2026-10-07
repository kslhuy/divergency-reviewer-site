// Runnable API example. Replace ideas/actors/clips when authoring another cast.
window.PREVIEW_SCENES = {
 'wind-spear'(d,t,missed){
  const sx=290,tx=130,y=d.ground,S='#98dace',T='#d7787e';
  d.shadow(sx,y);d.shadow(tx,y);
  if(t>1&&t<(missed?2.9:7.1))d.sprite('solei','Solei_Combat_solei_tornator',sx,y,.13+((t*1.2)%1)*.68,{normalized:true});
  else if(!missed&&t>=7.1&&t<8.1)d.sprite('solei','Solei_Combat_kick_1',sx,y,d.seg(t,7.1,8.1),{normalized:true});
  else d.sprite('solei','Idle',sx,y,t,{loop:true});
  if(t>.7&&t<3.8)d.sprite('tulas','Tulas_Skill_3_body',tx,y,Math.min(.8,d.seg(t,.7,3.8)),{normalized:true});
  else d.sprite('tulas','Idle',tx,y,t,{loop:true});
  d.label('SOLEI',sx,y+22,S);d.label('TULAS',tx,y+22,T);
  let cx=395,cy=y-36,rx=99,ry=47;
  if(t>=2&&t<3.5){const x=d.mix(tx+25,sx+30,d.seg(t,2,3.5));d.draw(d.frame('tulas','Tulas_Skill_3_ef',.34,true),x,y-42,{center:true,scale:.8});}
  if(t>=3.5&&missed&&t<5.2)d.draw(d.frame('tulas','Tulas_Skill_3_ef',.34,true),d.mix(sx+30,760,d.seg(t,3.5,5.2)),y-42,{center:true,scale:.8});
  if(!missed&&t>=3.5&&t<9.3){
   cx+=d.mix(0,280,d.seg(t,7.7,9.3));const a=(t-3.5)*7;
   d.ring(cx,cy,rx,ry,S,2,.5);d.ring(cx,cy,rx-5,ry-4,T,2,.4);
   for(let i=0;i<2;i++)d.draw(d.frame('tulas','Tulas_Skill_3_ef',.34,true),cx+Math.cos(a+i*Math.PI)*rx,cy+Math.sin(a+i*Math.PI)*ry,{scale:.85,center:true,rotation:a+i*Math.PI+Math.PI/2});
   if(t<4.15){d.burst(sx+30,y-42,d.seg(t,3.5,4.15),S,58);d.event('THƯƠNG · NHẬP BÃO');}
  }
  if(t>=9.3&&!missed)d.burst(690,cy,d.seg(t,9.3,9.9),S,105);
  for(let i=0;i<3;i++){
   let x=400+i*121,ey=y+(i%2)*8;const p=missed?0:d.seg(t,3.9+i*1.7,4.7+i*1.7);
   if(p>0)ey-=Math.sin(p*Math.PI)*35;
   d.shadow(x,y+7,23);d.sprite('enemy',p>0?'hurt_1':'Idle',x,ey,t,{loop:true,flip:true});
  }
 }
};
