import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDocs, buildPage } from '../build-reviewer-html.mjs';
import { campaignAssetPaths } from '../src/public-campaign.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const target = path.resolve(root, '_site');
if (path.dirname(target) !== path.resolve(root) || path.basename(target) !== '_site') throw new Error('Invalid Pages output');
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
const html = buildPage(buildDocs());
for (const name of ['index.html', 'Divergency_Reviewer_Tabs.html']) writeFileSync(path.join(target, name), html);

// Copy standalone public pages (Social Hub and redirect helper)
for (const name of ['socials.html', 'links.html']) {
  const pageFile = path.join(root, name);
  if (existsSync(pageFile)) {
    mkdirSync(path.dirname(path.join(target, name)), { recursive: true });
    cpSync(pageFile, path.join(target, name));
  }
}

// Collect campaign assets and assets used by socials.html
const assetSet = new Set(['robots.txt', 'sitemap.xml', ...campaignAssetPaths(html)]);
const socialsPath = path.join(root, 'socials.html');
if (existsSync(socialsPath)) {
  const socialsHtml = readFileSync(socialsPath, 'utf8');
  for (const asset of campaignAssetPaths(socialsHtml)) {
    assetSet.add(asset);
  }
  for (const extra of [
    'imgs/icons/icon_d_color.png',
    'imgs/avatar-talking/K-blink.png',
    'imgs/Steam+kick/K_banner_color.jpg',
    'audio/Music_Trailler_Original.mp3',
    'content/gameplay/audio/Music_Trailler_Original.mp3'
  ]) {
    if (existsSync(path.join(root, extra))) {
      assetSet.add(extra);
    }
  }
}

for (const name of assetSet) {
  const source = path.join(root, name);
  if (!existsSync(source)) continue;
  mkdirSync(path.dirname(path.join(target, name)), { recursive: true });
  cpSync(source, path.join(target, name));
}
writeFileSync(path.join(target, '.nojekyll'), '');
console.log('Prepared English Kickstarter-only Pages artifact with Social Hub.');

