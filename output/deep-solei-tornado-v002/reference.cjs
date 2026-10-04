const {chromium}=require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1000,height:650}});
await page.goto(require('url').pathToFileURL(path.join(__dirname,'Synergy_Preview.html')).href);await page.waitForFunction(()=>window.synergyPreview?.state.loaded);
await page.evaluate(async()=>{
 const data=PREVIEW_DATA,im=new Image();im.src=data.atlases.main;await im.decode();document.body.innerHTML='<canvas width="1000" height="650" id="ref"></canvas>';document.body.style.margin='0';
 const c=document.getElementById('ref'),g=c.getContext('2d');g.fillStyle='#292e37';g.fillRect(0,0,1000,650);g.imageSmoothingEnabled=false;g.font='20px sans-serif';g.fillStyle='#fff';
 for(const [row,actor,clip] of [[0,'deep','Sk3_Swift'],[1,'solei','Solei_Combat_solei_tornator'],[2,'soleifx','ef_tornator_spin']]){
  g.fillText(actor+' / '+clip,20,row*215+25);
  [5,9,13].forEach((idx,col)=>{const f=data.sprites[actor][clip].frames[idx], [x,y,w,h]=f.r;g.drawImage(im,x,y,w,h,20+col*325,row*215+45,w*2.7,h*2.7)})
 }
});await page.locator('#ref').screenshot({path:path.join(__dirname,'assets/tornado-style-reference.png')});await browser.close()})();
