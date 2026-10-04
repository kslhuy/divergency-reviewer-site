const sharp = require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
async function main() {
  const spec = require('./generation.json');
  await fs.mkdir(path.join(__dirname, 'sheets'), {recursive: true});
  for (const c of spec.characters) {
    const file = path.join(__dirname, 'sheets', `${c.character}-sheet.png`);
    await fs.copyFile(c.sheetPath, file);
    console.log(c.character, await sharp(file).metadata());
    const tile = await sharp(file).extract({left:0,top:0,width:512,height:512}).resize(156,156,{kernel:'nearest'}).png().toBuffer();
    await sharp({create:{width:312,height:156,channels:4,background:'#242730'}}).composite([
      {input:path.join(__dirname,'sources',`${c.character}-original.png`),left:0,top:0},
      {input:tile,left:156,top:0}
    ]).png().toBuffer().then(b=>sharp(b).resize(1248,624,{kernel:'nearest'}).toFile(path.join(__dirname, `${c.character}-compare.png`)));
  }
}
main().catch(e=>{console.error(e);process.exitCode=1});
