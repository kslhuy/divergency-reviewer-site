const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('C:/Users/Quang Huy Nugyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const dir = __dirname;
const source = 'C:/Users/Quang Huy Nugyen/Documents/Video_edit/avatar_H_K_N.png';
async function main() {
  await fs.mkdir(path.join(dir, 'sources'), { recursive: true });
  const avatars = [{ name: 'K', left: 4, width: 142 }, { name: 'H', left: 146, width: 142 }, { name: 'N', left: 288, width: 142 }];
  for (const a of avatars) {
    const crop = await sharp(source).extract({ left: a.left, top: 0, width: a.width, height: 155 }).png().toBuffer();
    const square = await sharp({ create: { width: 156, height: 156, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: crop, left: Math.floor((156 - a.width) / 2), top: 0 }]).png().toBuffer();
    await fs.writeFile(path.join(dir, 'sources', `${a.name}-original.png`), square);
    await sharp(square).resize(624, 624, { kernel: 'nearest' }).png().toFile(path.join(dir, 'sources', `${a.name}-reference.png`));
  }
  console.log('Prepared K (left), H (middle), N (right) reference portraits.');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
