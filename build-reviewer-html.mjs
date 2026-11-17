import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareGameplay } from './scripts/web-content.mjs';
import { readContent, describeContent } from './scripts/chapter-content.mjs';
import { buildPage } from './src/page.mjs';
import { publicContent } from './src/public-content.mjs';
import { assertCharacterCanon, characterCanonViolations } from './scripts/check-character-canon.mjs';
import { writeStoryReader } from './scripts/story-reader.mjs';
export { buildPage };
const here = fileURLToPath(new URL('.', import.meta.url));
const outputFile = path.join(here, 'Divergency_Reviewer_Tabs.html');
const localOutputFile = path.join(here, 'Divergency_Reviewer_Local.html');

export function buildDocs(gameplayOverride, { local = false } = {}) {
  assertCharacterCanon();
  if (gameplayOverride !== undefined && characterCanonViolations(gameplayOverride).length) {
    throw new Error('Character canon conflict in gameplay draft. Read AGENTS.md before saving.');
  }
  const documents = JSON.parse(readFileSync(path.join(here, 'content/documents.json'), 'utf8'));
  return documents.filter(doc => local || doc.id === 'kickstarter').map(doc => {
    const source = doc.id === 'gameplay' && gameplayOverride !== undefined ? gameplayOverride : readContent(here, doc.id);
    // Kickstarter stays 1:1 synced between local and online (both exclude Rewards & Stage 5;
    // Rewards live in the Rewards Checklist tab and Stage 5 lives in Story/Gameplay tabs).
    const html = (local && doc.id !== 'kickstarter') ? source : publicContent(source, { documentId: doc.id });
    if (doc.id === 'kickstarter') doc.summary = 'Game showcase: combat, skill deck & Vesliction, squad synergy, playable fighters, story, and music.';
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

  if (customOutput) {
    const target = buildReviewer({ local: isLocal, output: customOutput });
    if (isLocal) writeStoryReader(here);
    console.log(`Wrote ${path.basename(target)} from HTML chapters`);
  } else if (isAll) {
    buildReviewer({ local: false, output: outputFile });
    buildReviewer({ local: true, output: localOutputFile });
    writeStoryReader(here);
    console.log('Wrote public reviewer, full local reviewer and artifacts/chapters3-5_story.html from canonical chapter sources');
  } else if (isLocal) {
    const target = buildReviewer({ local: true, output: localOutputFile });
    buildReviewer({ local: false, output: outputFile });
    writeStoryReader(here);
    console.log(`Wrote ${path.basename(target)} and synced ${path.basename(outputFile)}`);
  } else {
    const target = buildReviewer({ local: false, output: outputFile });
    buildReviewer({ local: true, output: localOutputFile });
    console.log(`Wrote ${path.basename(target)} and synced ${path.basename(localOutputFile)}`);
  }
}
