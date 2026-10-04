import fs from 'fs';
import path from 'path';
import { parseFragment } from 'parse5';

const tag = node => (node.tagName || '').toLowerCase();
const children = node => Array.from(node.childNodes || []);
const attr = (node, name) => node.getAttribute?.(name) ?? node.attrs?.find(item => item.name === name)?.value ?? '';
const text = node => node.nodeType === 3 || node.nodeName === '#text' ? (node.nodeValue ?? node.value) : children(node).map(text).join('');
const block = value => '\n\n' + value.trim() + '\n\n';

function toMarkdown(root) {
  const verbatim = [];
  const protect = value => { const token = '\u0000MD' + verbatim.length + '\u0000'; verbatim.push(value); return token; };
  
  function url(value) {
    if (!value) return '';
    return value.trim();
  }

  function render(node) {
    if (node.nodeType === 3 || node.nodeName === '#text') {
      return (node.nodeValue ?? node.value);
    }
    const name = tag(node);
    if (['script', 'style', 'svg', 'button'].includes(name) || attr(node, 'aria-hidden') === 'true' || /\b(heading-link|stage-marker)\b/.test(attr(node, 'class'))) {
      return '';
    }
    const inner = () => children(node).map(render).join('');
    
    if (/^h[1-6]$/.test(name)) {
      return block('#'.repeat(Number(name[1])) + ' ' + inner().trim());
    }
    if (['strong', 'b'].includes(name)) return '**' + inner().trim() + '**';
    if (['em', 'i'].includes(name)) return '*' + inner().trim() + '*';
    if (['s', 'del'].includes(name)) return '~~' + inner().trim() + '~~';
    if (name === 'br') return '  \n';
    if (name === 'hr') return block('---');
    if (name === 'img') {
      const src = url(attr(node, 'src'));
      const alt = attr(node, 'alt');
      return block(`![${alt}](<${src}>)`);
    }
    if (name === 'a') {
      const href = attr(node, 'href');
      const textVal = inner().trim();
      return href ? `[${textVal}](${url(href)})` : inner();
    }
    if (name === 'pre') {
      const value = text(node).replace(/\n$/, '');
      const fence = '`'.repeat(Math.max(3, ...Array.from(value.matchAll(/`+/g), match => match[0].length + 1)));
      return block(protect(fence + '\n' + value + '\n' + fence));
    }
    if (name === 'code') {
      const value = text(node);
      const fence = '`'.repeat(Math.max(1, ...Array.from(value.matchAll(/`+/g), match => match[0].length + 1)));
      return fence + (/^`|`$/.test(value) ? ' ' + value + ' ' : value) + fence;
    }
    if (name === 'blockquote') {
      const bq = inner().trim().split('\n').map(line => {
        const trimmed = line.trim();
        return trimmed ? '> ' + trimmed : '>';
      }).join('\n');
      return block(bq.replace(/(\n>[ \t]*){2,}\n/g, '\n>\n'));
    }
    if (name === 'ul' || name === 'ol') {
      let number = Number(attr(node, 'start')) || 1;
      const items = children(node).filter(child => tag(child) === 'li').map(item => {
        const prefix = name === 'ol' ? number++ + '. ' : '- ';
        const itemContent = children(item).map(render).join('').trim();
        return prefix + itemContent.replace(/\n/g, '\n' + ' '.repeat(prefix.length));
      });
      return block(items.join('\n'));
    }
    if (name === 'table') {
      const rows = [];
      function visit(parent) {
        for (const child of children(parent)) {
          if (tag(child) === 'tr') rows.push(children(child).filter(cell => ['th', 'td'].includes(tag(cell))));
          else if (['thead', 'tbody', 'tfoot'].includes(tag(child))) visit(child);
        }
      }
      visit(node);
      if (!rows.length) return '';
      const width = Math.max(...rows.map(row => row.length));
      const cleanCell = cell => {
        let c = children(cell).map(render).join('').trim();
        c = c.replace(/\n+/g, '<br>').replace(/(<br>\s*){2,}/g, '<br><br>').replace(/[ \t]+/g, ' ').replace(/\|/g, '\\|');
        return c;
      };
      const lines = rows.map(row => '| ' + Array.from({ length: width }, (_, index) => row[index] ? cleanCell(row[index]) : '').join(' | ') + ' |');
      if (!rows[0].some(cell => tag(cell) === 'th')) lines.unshift('| ' + Array(width).fill('').join(' | ') + ' |');
      lines.splice(1, 0, '| ' + Array(width).fill('---').join(' | ') + ' |');
      return block(lines.join('\n'));
    }
    if (name === 'figure') {
      return block(inner().trim());
    }
    if (name === 'figcaption') {
      const cap = inner().trim();
      return cap ? `*${cap}*` : '';
    }
    if (['p', 'div', 'section', 'article'].includes(name)) return block(inner());
    return inner();
  }

  let result = render(root);
  return result.replace(/\n[ \t]+\n/g, '\n\n').replace(/\n{3,}/g, '\n\n').trim().replace(/\u0000MD(\d+)\u0000/g, (_, index) => verbatim[Number(index)]) + '\n';
}

export function generateStoryMarkdown() {
  const storyIndex = JSON.parse(fs.readFileSync('./content/story/index.json', 'utf8'));
  const fullHtml = storyIndex.map(c => fs.readFileSync(path.join('./content/story', c.file), 'utf8')).join('\n');
  const parsed = parseFragment(fullHtml);
  return toMarkdown(parsed);
}

if (process.argv[1] && process.argv[1].endsWith('export_story_md.mjs')) {
  const md = generateStoryMarkdown();
  fs.writeFileSync('./Divergency_Complete_Story_VI.md', md, 'utf8');
  console.log(`Successfully updated Divergency_Complete_Story_VI.md (${md.length} characters) from content/story/ HTML files.`);
}
