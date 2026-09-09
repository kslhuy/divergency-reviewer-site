import { parseFragment, serialize } from 'parse5';

const tags = new Set('h1 h2 h3 h4 h5 h6 p br strong b em i u s ul ol li blockquote pre code table thead tbody tfoot tr th td figure figcaption img div span a hr'.split(' '));
const classes = new Set('table-wrap markdown-image inline-markdown-image is-title-ornament is-page-divider is-campaign-splash is-story-panel'.split(' '));
// Fixed presentation classes only: editable layout notes never admit inline styles or scripts.
for (const name of ['stage-plan', 'stage-plan-scroll', 'stage-map', 'stage-marker',
  'stage-map-sewer2', 'stage-map-laundel', 'stage-map-sewer4', 'stage-map-harbor',
  'stage-map-generator', 'stage-map-shemal', ...Array.from({ length: 6 }, (_, i) => `stage-marker-${i + 1}`)]) classes.add(name);
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value || '';
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');

function safeUrl(value, image = false) {
  const url = value.trim();
  if (!url || /[\u0000-\u0020\u007f]/.test(url.replaceAll(' ', '')) || url.includes('\\')) return '';
  if (image) return /^imgs\//.test(url) && !url.split('/').includes('..') ? url : '';
  if (/^(https?:\/\/|mailto:|#)/i.test(url)) return url;
  return '';
}

// Parse as HTML before filtering. Never use regex to sanitize editable HTML.
export function prepareGameplay(input) {
  const root = parseFragment(input);
  function clean(parent) {
    parent.childNodes = (parent.childNodes || []).filter(node => {
      if (node.nodeName === '#text') return true;
      if (!tags.has(node.tagName)) return false;
      if (attr(node, 'class').split(/\s+/).includes('heading-link')) return false;
      const attributes = [];
      const keep = (name, value) => { if (value) attributes.push({ name, value }); };
      keep('class', attr(node, 'class').split(/\s+/).filter(name => classes.has(name)).join(' '));
      if (node.tagName === 'img') {
        const src = safeUrl(attr(node, 'src'), true);
        if (!src) return false;
        keep('src', src);
        attributes.push({ name: 'alt', value: attr(node, 'alt') });
        keep('loading', 'lazy');
      }
      if (node.tagName === 'a') keep('href', safeUrl(attr(node, 'href')));
      if (['td', 'th'].includes(node.tagName)) {
        for (const name of ['colspan', 'rowspan']) {
          const value = attr(node, name);
          if (/^[1-9]\d?$/.test(value)) keep(name, value);
        }
      }
      if (node.tagName === 'ol' && /^\d{1,5}$/.test(attr(node, 'start'))) keep('start', attr(node, 'start'));
      node.attrs = attributes;
      clean(node);
      return true;
    });
  }
  clean(root);
  const toc = [];
  const slugs = new Map();
  let tables = 0;
  function headings(parent) {
    for (const node of parent.childNodes || []) {
      if (node.tagName === 'table') tables++;
      if (/^h[1-6]$/.test(node.tagName || '')) {
        const text = textOf(node).trim();
        const base = text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
          .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
        const count = slugs.get(base) || 0;
        slugs.set(base, count + 1);
        const id = `gameplay-${base}${count ? `-${count + 1}` : ''}`;
        node.attrs.push({ name: 'id', value: id }, { name: 'tabindex', value: '-1' });
        const link = parseFragment(`<a class="heading-link" href="#${id}" aria-label="Link to section">#</a>`).childNodes[0];
        link.parentNode = node;
        node.childNodes.unshift(link);
        toc.push({ id, level: Number(node.tagName[1]), text });
      }
      headings(node);
    }
  }
  const words = textOf(root).split(/\s+/).filter(Boolean).length;
  headings(root);
  return { html: serialize(root), toc, tables, readMinutes: Math.max(1, Math.ceil(words / 220)), sections: toc.filter(item => item.level <= 2).length };
}
