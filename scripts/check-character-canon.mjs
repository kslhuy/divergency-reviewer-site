import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFragment } from 'parse5';

const root = fileURLToPath(new URL('../', import.meta.url));
const generated = new Set(['Divergency_Reviewer_Local.html', 'Divergency_Reviewer_Tabs.html']);
const extensions = new Set(['.html', '.md', '.tex', '.txt', '.json', '.py', '.yaml', '.js', '.mjs', '.cs']);
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join(' ');

// These rules catch known regressions. AGENTS.md remains the author's source of truth.
const mistakes = [
  ['Solei: weapon', /\bSolei\s*[:—-]?\s*\(?\s*(?:(?:đang|chủ động)\s+)?(?:rút|cầm|vung|tra|hạ|chĩa)\s+(?:thanh\s+|song\s+)?(?:kiếm|đao|kunai)/iu],
  ['Solei: weapon', /(?:phi đao|song đao|kiếm|sword slash|chém kiếm)\s+của Solei/iu],
  ['Solei: caster', /Solei (?:dùng chiêu thức ma thuật|kiểm soát không gian bằng hỏa lực|controls space with ranged elemental magic)|ma thuật kiểm soát của Solei|Solei['’]s ranged crowd control/iu],
  ['Solei: archetype', /Solei\s*(?:\([^)]*\)\s*)?(?:[·:/-]\s*)?(?:Song Đao|Breteur|Dual Blades)/iu],
  ['Solei: scripted action', /speaker\s*:\s*["']SOLEI["']\s*,\s*action\s*:\s*["'][^"']{0,220}(?:song đao|chuôi kiếm|rút kiếm|tra kiếm)/iu],
  ['Deep: weapon', /(?:đại kiếm|trọng kiếm|greatsword)\s+của Deep|Deep[^.!?;\n]{0,70}(?:chuôi đại kiếm|thanh đại kiếm|cầm đại kiếm|cắm đại kiếm|Trọng Kiếm|Épée Lourde)|Leader with Greatsword/iu],
  ['Mark: firearm', /(?:súng|súng trường) (?:của )?Mark|Mark[^.!?;\n]{0,25}(?:chĩa mũi súng|xả đạn|bắn đạn|bắn một phát đạn|tỉa đạn|tra đạn vào súng|lên đạn khẩu súng)|Mark[^.!?;\n]{0,20}(?:soi kính ngắm súng|chỉnh lại ống ngắm súng)/iu],
  ['Block: equipment', /Block[^.!?;\n]{0,40}(?:giương|dựng|cầm|dùng|húc|huých)\s+(?:chiếc\s+|đại\s+)?(?:khiên|thuẫn)|(?:khiên|thuẫn) (?:của )?Block|quanh khiên của Block|đai khiên thép|BLOCK \(Heavy Shield\)/iu],
  ['Obsolete profile', /Twin Steel Kunai|Relic-Iron Greatsword|Silent Crossbow|Tower Aegis Shield|Liquid Catalyst Core|Double Lame Courte|Carabine & Grenades|Pavois d'Acier Lourd/iu],
  ['Project identity', /Divergency\s*[&/]\s*LF2|(?:remake|remaking|làm lại)\s+(?:LF2|Little Fighter 2)|(?:runtime|chuẩn|phong cách|kỹ năng|combo|Hitbox)\s+LF2|LF2\s+(?:Animation Studio|Wait Engine|Boss Suite|Studio|Data Frame)|lf2-(?:character-animator|synergy-preview|25d-stage-background)|LF2Revie|Divergency\s+\.DAT CODE|Divergency Wait Engine/iu],
];

export function characterCanonViolations(source) {
  const plain = source.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  return mistakes.flatMap(([reason, pattern]) => {
    const match = plain.match(pattern);
    return match ? [{ reason, excerpt: match[0] }] : [];
  });
}

function sourceFiles(includeGenerated) {
  const files = [];
  function visit(directory) {
    if (!existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory() && !['__pycache__', 'node_modules'].includes(entry.name)) visit(file);
      else if (entry.isFile() && extensions.has(path.extname(file))) files.push(file);
    }
  }
  for (const folder of ['content', 'artifacts', 'dev_log_video', '.agents/skills', 'output/skills', 'sakuri_animation_suite', 'imgs']) visit(path.join(root, folder));
  for (const entry of readdirSync(root)) {
    if (entry.endsWith('.html') && (includeGenerated || !generated.has(entry))) files.push(path.join(root, entry));
  }
  return files;
}

export function assertCharacterCanon({ includeGenerated = false } = {}) {
  const errors = [];
  const files = sourceFiles(includeGenerated);
  for (const file of files) {
    for (const { reason, excerpt } of characterCanonViolations(readFileSync(file, 'utf8'))) {
      errors.push(`${path.relative(root, file)}: ${reason}: ${excerpt}`);
    }
  }

  // Check each character's own profile, so a correct teammate cannot mask an omission.
  const profiles = [
    ['content/story/05-nhan-vat-trung-tam-d34f521cf6.html', 'h3', {
      Solei: [/karate/i, /chân máy/i, /mắt quỷ/i],
      Block: [/da đen/i, /boxing/i, /đấm/i, /đá/i, /đỡ đòn/i],
      Mark: [/cung/i, /tách.*kiếm/i, /kính kiểu laser/i],
      Deep: [/kiếm ngắn/i, /đấu sĩ/i],
      Tulas: [/phép thuật máu/i, /chữ thập.*ngực/i],
    }],
  ];
  for (const [file, heading, characters] of profiles) {
    const nodes = parseFragment(readFileSync(path.join(root, file), 'utf8')).childNodes;
    for (const [character, facts] of Object.entries(characters)) {
      const start = nodes.findIndex(node => node.tagName === heading && textOf(node).includes(character));
      let end = start + 1;
      while (end < nodes.length && nodes[end].tagName !== heading) end++;
      const profile = start < 0 ? '' : nodes.slice(start, end).map(textOf).join(' ');
      for (const fact of facts) if (!fact.test(profile)) errors.push(`${file}: ${character} missing ${fact}`);
    }
  }
  if (errors.length) throw new Error(`Character canon conflicts. Read AGENTS.md.\n${errors.join('\n')}`);
  return files.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(`Character canon checked: ${assertCharacterCanon({ includeGenerated: true })} files.`);
}
