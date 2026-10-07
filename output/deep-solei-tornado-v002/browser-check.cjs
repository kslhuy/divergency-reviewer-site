const {chromium}=require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('path'),fs=require('fs'),assert=require('assert');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(require('url').pathToFileURL(path.join(__dirname,'Synergy_Preview.html')).href);
 await page.waitForFunction(()=>window.synergyPreview?.state.loaded);
 assert.equal(await page.evaluate(()=>synergyPreview.state.scenario),'quy-dao-hoi-phong');
 await page.evaluate(()=>synergyPreview.seek(5.6));
 await page.screenshot({path:path.join(__dirname,'preview-tornado-wide.png')});
 const first=await page.locator('#stage').evaluate(c=>c.toDataURL());
 await page.evaluate(()=>{synergyPreview.seek(8.12);synergyPreview.seek(5.6)});
 assert.equal(await page.locator('#stage').evaluate(c=>c.toDataURL()),first,'Rewind differs');
 await page.evaluate(()=>synergyPreview.seek(8.15));
 await page.screenshot({path:path.join(__dirname,'preview-tornado-finish.png')});
 await page.selectOption('#outcome','miss');
 await page.evaluate(()=>synergyPreview.seek(5.6));
 assert.match(await page.locator('#captionTitle').textContent(),/Lỡ/);
 assert.notEqual(await page.locator('#stage').evaluate(c=>c.toDataURL()),first);
 await page.screenshot({path:path.join(__dirname,'preview-tornado-miss.png')});
 await page.selectOption('#outcome','hit');
 await page.selectOption('#speed','0.5');
 assert.equal(await page.evaluate(()=>synergyPreview.state.speed),.5);
 for(const s of await page.evaluate(()=>synergyPreview.scenes)){
  await page.evaluate(id=>{synergyPreview.choose(id);synergyPreview.seek(5.6)},s.id);
  assert.equal(await page.evaluate(()=>synergyPreview.state.error),null);
 }
 await page.evaluate(()=>{synergyPreview.choose('quy-dao-hoi-phong');synergyPreview.seek(5.6)});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:path.join(__dirname,'preview-tornado-narrow.png'),fullPage:true});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Page overflows');
 assert.deepEqual(errors,[]);
 const report=JSON.parse(fs.readFileSync(path.join(__dirname,'validation.json')));
 report.browser={passed:true,offline:true,rewindPixelIdentical:true,hitMissDistinct:true,speedControl:true,allScenesLoaded:true,viewports:[1440,390],errors};
 fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report.browser));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
