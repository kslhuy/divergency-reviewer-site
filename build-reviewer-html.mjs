import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareGameplay } from './scripts/web-content.mjs';
import { readContent, describeContent } from './scripts/chapter-content.mjs';
import { buildPage } from './src/page.mjs';
export { buildPage };
const here = fileURLToPath(new URL('.', import.meta.url));
const outputFile = path.join(here, 'Divergency_Reviewer_Tabs.html');

export function buildDocs(gameplayOverride) {
  const documents = JSON.parse(readFileSync(path.join(here, 'content/documents.json'), 'utf8'));
  return documents.map(doc => {
    const html = doc.id === 'gameplay' && gameplayOverride !== undefined ? gameplayOverride : readContent(here, doc.id);
    return { ...doc, ...(doc.id === 'gameplay' ? prepareGameplay(html) : describeContent(html)) };
  });
}

export function buildReviewer() {
  writeFileSync(outputFile, buildPage(buildDocs()), 'utf8');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildReviewer();
  console.log('Wrote Divergency_Reviewer_Tabs.html from HTML chapters');
}
