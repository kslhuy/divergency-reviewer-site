import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { buildReviewer } from '../build-reviewer-html.mjs';
import { listImages } from '../scripts/editor-images.mjs';
if (existsSync('imgs')) buildReviewer();
mkdirSync('online/generated', { recursive: true });
if (existsSync('imgs')) writeFileSync('online/generated/images.json', JSON.stringify(listImages(process.cwd())));
else if (!existsSync('online/generated/images.json')) throw new Error('Missing deployment image manifest');
