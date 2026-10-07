const {chromium}=require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert'),crypto=require('crypto');
(async()=>{
const source='C:/Users/Quang Huy Nugyen/LF2Revie/Assets/Images/Animation/Olds_LF2/Freeze/Freeze/freeze_ww.png';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');assert.equal(hash(source),hash(path.join(__dirname,'assets/freeze-ww-reference.png')));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),page=await browser.newPage({viewport:{width:1100,height:1100}});
await page.goto(require('url').pathToFileURL(path.join(__dirname,'Tornado_Animation.html')).href);await page.waitForFunction(()=>window.tornadoAnimation?.state.loaded);
const result=await page.evaluate(async()=>{
const source=new Image();source.src=data.atlases.tornado;await source.decode();const c=document.createElement('canvas');c.width=source.width;c.height=source.height;const ctx=c.getContext('2d');ctx.drawImage(source,0,0);const a=ctx.getImageData(0,0,c.width,c.height).data,b=tornadoAnimation.atlas.getContext('2d').getImageData(0,0,c.width,c.height).data;
let alphaMismatch=0,paletteMismatch=0,changedOpaquePixels=0,opaquePixels=0;
for(let i=0;i<a.length;i+=4){if(a[i+3]!==b[i+3])alphaMismatch++;if(!a[i+3])continue;opaquePixels++;const p=FREEZE_PALETTE[a[i]+','+a[i+1]+','+a[i+2]];if(!p||b[i]!==p[0]||b[i+1]!==p[1]||b[i+2]!==p[2])paletteMismatch++;if(a[i]!==b[i]||a[i+1]!==b[i+1]||a[i+2]!==b[i+2])changedOpaquePixels++;}
return {width:c.width,height:c.height,pixels:a.length/4,opaquePixels,alphaMismatch,paletteMismatch,changedOpaquePixels};});
assert.equal(result.alphaMismatch,0);assert.equal(result.paletteMismatch,0);assert.equal(result.changedOpaquePixels,result.opaquePixels);
const downloaded=page.waitForEvent('download');await page.locator('#download').click();const download=await downloaded;await download.saveAs(path.join(__dirname,'assets/freeze-red-mint-exact.png'));
await page.evaluate(()=>tornadoAnimation.seek(5));await page.screenshot({path:path.join(__dirname,'preview-exact-comparison.png'),fullPage:true});
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'validation.json')));report.exactPalette={passed:true,sourceFileByteIdentical:true,...result};fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.exactPalette));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
