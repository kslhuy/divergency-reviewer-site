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
const localOutputFile = path.join(here, 'Divergency_Reviewer_Local.html');

export function buildDocs(gameplayOverride, { local = false } = {}) {
  const documents = JSON.parse(readFileSync(path.join(here, 'content/documents.json'), 'utf8'));
  return documents.filter(doc => local || doc.id === 'kickstarter').map(doc => {
    const source = doc.id === 'gameplay' && gameplayOverride !== undefined ? gameplayOverride : readContent(here, doc.id);
    const html = local ? source : publicContent(source, { documentId: doc.id });
    if (!local && doc.id === 'kickstarter') doc.summary = 'Campaign pitch: hook, gameplay, story, funding, timeline, and risks.';
    if (!local && ['story', 'story-summary'].includes(doc.id)) doc.summary = 'Divergency story, characters, and the journey through Stage 4.';
    return { ...doc, ...(doc.id === 'gameplay' ? prepareGameplay(html) : describeContent(html)) };
  });
}

export function buildReviewer({ local = false, output } = {}) {
  const targetOutput = output || (local ? localOutputFile : outputFile);
  writeFileSync(targetOutput, buildPage(buildDocs(undefined, { local }), { local }), 'utf8');
  return targetOutput;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const isLocal = process.argv.includes('--local');
  const isAll = process.argv.includes('--all');
  const outputArgIdx = process.argv.indexOf('--output');
  const customOutput = outputArgIdx !== -1 && process.argv[outputArgIdx + 1] ? path.resolve(here, process.argv[outputArgIdx + 1]) : null;

  if (isAll) {
    buildReviewer({ local: false, output: outputFile });
    buildReviewer({ local: true, output: localOutputFile });
    console.log('Wrote Divergency_Reviewer_Tabs.html (public) and Divergency_Reviewer_Local.html (full local)');
  } else if (isLocal) {
    const target = buildReviewer({ local: true, output: customOutput || localOutputFile });
    console.log(`Wrote ${path.basename(target)} with all chapters and tabs`);
  } else {
    const target = buildReviewer({ local: false, output: customOutput || outputFile });
    console.log(`Wrote ${path.basename(target)} from HTML chapters`);
  }
}
