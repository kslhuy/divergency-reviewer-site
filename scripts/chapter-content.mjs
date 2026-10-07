import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseFragment } from 'parse5';

const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');
export const slug = value => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 85) || 'intro';

export function splitChapters(html) {
  const root = parseFragment(html, { sourceCodeLocationInfo: true });
  const headings = root.childNodes.filter(node => /^h[12]$/.test(node.tagName || '') && node.sourceCodeLocation);
  const chapters = [];
  let start = 0;
  let title = 'Giới thiệu';
  for (const heading of headings) {
    const offset = heading.sourceCodeLocation.startOffset;
    if (offset > start && html.slice(start, offset).trim()) chapters.push({ title, html: html.slice(start, offset) });
    else if (!html.slice(start, offset).trim()) { /* Keep leading whitespace in the first chapter. */ }
    if (chapters.length) start = offset;
    title = textOf(heading).replace(/^#/, '').trim();
  }
  if (html.slice(start).trim()) chapters.push({ title, html: html.slice(start) });
  return chapters;
}

export function readContent(root, id) {
  const directory = path.join(root, 'content', id);
  const index = path.join(directory, 'index.json');
  if (!existsSync(index)) return readFileSync(path.join(root, 'content', id + '.html'), 'utf8');
  const chapters = JSON.parse(readFileSync(index, 'utf8'));
  return chapters.map(({ file }) => {
    if (!/^[a-zA-Z0-9._-]+\.html$/.test(file)) throw new Error('Invalid chapter filename');
    return readFileSync(path.join(directory, file), 'utf8');
  }).join('');
}

// Chapter files are written before switching the index, so an interrupted save
// leaves the previous document readable. Old chapter versions remain recoverable.
export function writeContent(root, id, html) {
  const directory = path.join(root, 'content', id);
  mkdirSync(directory, { recursive: true });
  const chapters = splitChapters(html).map((chapter, index) => {
    const digest = createHash('sha256').update(chapter.html).digest('hex').slice(0, 10);
    const file = `${String(index + 1).padStart(2, '0')}-${slug(chapter.title)}-${digest}.html`;
    writeFileSync(path.join(directory, file), chapter.html, 'utf8');
    return { title: chapter.title, file };
  });
  const index = path.join(directory, 'index.json');
  writeFileSync(index + '.pending', JSON.stringify(chapters, null, 2) + '\n', 'utf8');
  renameSync(index + '.pending', index);
}

export function describeContent(html) {
  const toc = []; let tables = 0;
  function visit(node) {
    if (node.tagName === 'table') tables++;
    if (/^h[1-6]$/.test(node.tagName || '')) {
      const id = node.attrs.find(attr => attr.name === 'id')?.value;
      if (id) toc.push({ id, level: Number(node.tagName[1]), text: textOf(node).replace(/^#/, '').trim() });
    }
    for (const child of node.childNodes || []) visit(child);
  }
  const root = parseFragment(html); visit(root);
  return { html, toc, tables, sections: toc.filter(item => item.level <= 2).length,
    readMinutes: Math.max(1, Math.ceil(textOf(root).trim().split(/\s+/).length / 220)) };
}
