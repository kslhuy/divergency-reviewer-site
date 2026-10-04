/* Render the original Freeze pixels using a fixed RGB lookup. Alpha is never changed. */
window.FREEZE_PALETTE={
 '121,151,197':[106,160,153],
 '188,202,224':[81,234,214],
 '79,111,161':[203,11,11],
 '45,73,118':[117,17,17],
 '9,14,23':[63,103,98],
 '103,129,168':[52,177,162],
 '119,149,196':[128,191,183]
};
window.recolorFreezeAtlas=function(source){
 const canvas=document.createElement('canvas');canvas.width=source.width;canvas.height=source.height;
 const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(source,0,0);
 const frame=ctx.getImageData(0,0,canvas.width,canvas.height),p=frame.data;
 for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;
  const key=p[i]+','+p[i+1]+','+p[i+2],color=window.FREEZE_PALETTE[key];
  if(!color)throw Error('Unexpected Freeze source color: '+key);
  p[i]=color[0];p[i+1]=color[1];p[i+2]=color[2];
 }
 ctx.putImageData(frame,0,0);return canvas;
};
