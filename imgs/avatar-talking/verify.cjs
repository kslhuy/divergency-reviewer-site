const sharp = require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const path = require('node:path');
async function main() {
  for (const name of ['K','H','N']) {
    const file=path.join(__dirname,`${name}-talking.gif`);
    const meta=await sharp(file,{animated:true}).metadata();
    const {data,info}=await sharp(file,{animated:true}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    const stride=468*468*4;
    let changedOutsideFace=0, alphaChanges=0, variedFrames=0;
    for(let frame=1;frame<meta.pages;frame++) {
      let changed=0;
      for(let y=0;y<468;y++)for(let x=0;x<468;x++) {
        const i=(y*468+x)*4, j=frame*stride+i;
        if(data[i+3]!==data[j+3])alphaChanges++;
        const different=data[i]!==data[j]||data[i+1]!==data[j+1]||data[i+2]!==data[j+2];
        if(different){changed++;if(x<40*3||x>124*3||y<56*3||y>126*3)changedOutsideFace++;}
      }
      if(changed)variedFrames++;
    }
    if(changedOutsideFace||alphaChanges||!variedFrames)throw Error(`Frame stability failed for ${name}: ${changedOutsideFace}, ${alphaChanges}, ${variedFrames}`);
    console.log(JSON.stringify({name,frames:meta.pages,variedFrames,changedOutsideFace,alphaChanges,loop:meta.loop,size:[468,468],durationMs:meta.delay.reduce((a,b)=>a+b,0)}));
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
