import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDocs, buildPage } from '../build-reviewer-html.mjs';
// This release embeds its browser scripts and styles in the generated HTML.
const assetFiles = [];
import { isLocalOnlyPath } from '../src/public-content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const target = path.resolve(root, '_site');
if (path.dirname(target) !== path.resolve(root) || path.basename(target) !== '_site') throw new Error('Invalid Pages output');
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
const html = buildPage(buildDocs());
for (const name of ['index.html', 'Divergency_Reviewer_Tabs.html']) writeFileSync(path.join(target, name), html);
for (const name of ['steam-image-tool.html', 'socials.html', 'links.html', 'robots.txt', 'sitemap.xml', ...assetFiles]) {
  mkdirSync(path.dirname(path.join(target, name)), { recursive: true });
  cpSync(path.join(root, name), path.join(target, name));
}
for (const name of ['imgs', 'audio']) cpSync(path.join(root, name), path.join(target, name), {
  recursive: true, filter: source => !isLocalOnlyPath(path.relative(root, source)),
});
writeFileSync(path.join(target, '.nojekyll'), '');
console.log('Prepared public Pages artifact without local-only content or artwork.');
