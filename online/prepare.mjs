import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { buildReviewer } from '../build-reviewer-html.mjs';
import { listImages } from '../scripts/editor-images.mjs';
import { readContent } from '../scripts/chapter-content.mjs';
import { assetFiles } from '../src/asset-files.mjs';
import { isLocalOnlyPath, publicContent } from '../src/public-content.mjs';
const local = process.argv.includes('--local');
mkdirSync('online/generated', { recursive: true });
buildReviewer({ local, output: 'online/generated/page.html' });
// A reduced deployment checkout must carry public output, never a local preview.
if (!local && /imgs\/Stage5\/|imgs\/rewards\/|data-tab="rewards"/.test(readFileSync('online/generated/page.html', 'utf8'))) throw new Error('Refusing to publish a local-only preview');
const gameplay = readContent(process.cwd(), 'gameplay');
writeFileSync('online/generated/gameplay.html', local ? gameplay : publicContent(gameplay, { documentId: 'gameplay' }));
writeFileSync('online/generated/visibility.json', JSON.stringify({ local }));
writeFileSync('online/generated/assets.json', JSON.stringify(Object.fromEntries(assetFiles.map(file => ['/' + file, readFileSync(file, 'utf8')]))));
if (existsSync('imgs')) writeFileSync('online/generated/images.json', JSON.stringify(listImages(process.cwd()).filter(image => local || !isLocalOnlyPath(image.src))));
else if (!existsSync('online/generated/images.json')) throw new Error('Missing deployment image manifest');
