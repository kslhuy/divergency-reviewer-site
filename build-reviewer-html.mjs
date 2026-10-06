import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareGameplay } from './scripts/web-content.mjs';
import { readContent, describeContent } from './scripts/chapter-content.mjs';
import { buildPage } from './src/page.mjs';
import { publicContent } from './src/public-content.mjs';
export { buildPage };
const here = fileURLToPath(new URL('.', import.meta.url));
const outputFile = path.join(here, 'Divergency_Reviewer_Tabs.html');

export function buildDocs(gameplayOverride, { local = false } = {}) {
  const documents = JSON.parse(readFileSync(path.join(here, 'content/documents.json'), 'utf8'));
  return documents.filter(doc => local || doc.id !== 'rewards').map(doc => {
    const source = doc.id === 'gameplay' && gameplayOverride !== undefined ? gameplayOverride : readContent(here, doc.id);
    const html = local ? source : publicContent(source, { documentId: doc.id });
    if (!local && doc.id === 'kickstarter') doc.summary = 'Campaign pitch: hook, gameplay, story, funding, timeline, and risks.';
    if (!local && ['story', 'story-summary'].includes(doc.id)) doc.summary = 'Divergency story, characters, and the journey through Stage 4.';
    return { ...doc, ...(doc.id === 'gameplay' ? prepareGameplay(html) : describeContent(html)) };
  });
}

export function buildReviewer({ local = false, output = outputFile } = {}) {
  writeFileSync(output, buildPage(buildDocs(undefined, { local }), { local }), 'utf8');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildReviewer({ local: process.argv.includes('--local') });
  console.log('Wrote Divergency_Reviewer_Tabs.html from HTML chapters');
}
