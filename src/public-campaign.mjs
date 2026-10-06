import { parse, parseFragment, serialize } from 'parse5';
import { isLocalOnlyPath } from './public-content.mjs';

const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value || '';
const hasClass = (node, name) => attr(node, 'class').split(/\s+/).includes(name);
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const replaceContents = (node, html) => {
  node.childNodes = parseFragment(html).childNodes;
  for (const child of node.childNodes) child.parentNode = node;
};
const description = 'Explore the English Kickstarter campaign for Divergency, a dark fantasy tactical brawler by TriLinkage.';

// Strip private content from the output itself, including inline image manifests
// and editor scripts. The unmodified local reader keeps every document and tool.
export function publicCampaignPage(html) {
  const root = parse(html);
  const headings = [];
  function clean(parent) {
    parent.childNodes = (parent.childNodes || []).filter(node => {
      if (node.nodeName === '#comment') return false;
      if (node.tagName === 'script' && attr(node, 'type') !== 'application/ld+json') return false;
      if (hasClass(node, 'doc-pane') && attr(node, 'data-doc') !== 'kickstarter') return false;
      if (['toolbar', 'media-band', 'web-edit-fab', 'lightbox', 'progress', 'doc-stats', 'doc-editor-row'].some(name => hasClass(node, name))) return false;
      if (node.tagName === 'link' && attr(node, 'rel') === 'stylesheet' && attr(node, 'href') !== 'styles/site.css') return false;
      if (node.tagName === 'a' && /(?:steam-image-tool|rewards[^/]*|socials|links)\.html/.test(attr(node, 'href'))) return false;
      if (attr(node, 'lang') && !/^en(?:-|$)/i.test(attr(node, 'lang'))) return false;
      if (node.tagName === 'meta' && ['description', 'og:description', 'twitter:description'].includes(attr(node, 'name') || attr(node, 'property'))) {
        node.attrs.find(a => a.name === 'content').value = description;
      }
      if (node.tagName === 'p' && hasClass(parent, 'hero-copy') && !hasClass(node, 'eyebrow')) replaceContents(node, description);
      if (node.tagName === 'h2' && attr(node, 'id') === 'tab-title-kickstarter') replaceContents(node, 'Kickstarter Campaign');
      if (/^h[23]$/.test(node.tagName || '') && attr(node, 'id').startsWith('kickstarter-')) headings.push({ id: attr(node, 'id'), title: textOf(node).replace(/^#/, '').trim() });
      clean(node);
      return true;
    });
  }
  clean(root);
  function finish(parent) {
    for (const node of parent.childNodes || []) {
      if (hasClass(node, 'toc-panel')) {
        node.attrs = [{ name: 'class', value: 'campaign-contents' }, { name: 'aria-label', value: 'Campaign contents' }];
        replaceContents(node, `<details open><summary>Contents</summary><nav aria-label="Campaign sections"><ul>${headings.map(h => `<li><a href="#${escape(h.id)}">${escape(h.title)}</a></li>`).join('')}</ul></nav></details>`);
      }
      finish(node);
      if (node.tagName === 'head') {
        const style = parseFragment('<style>.campaign-contents{align-self:start;position:sticky;top:20px;padding:20px;border:1px solid var(--line,#484039);border-radius:8px}.campaign-contents summary{cursor:pointer;font-weight:bold}.campaign-contents ul{padding-left:18px}.campaign-contents li{margin:10px 0}.campaign-contents a{color:inherit}.doc-pane{display:block}.doc-layout{grid-template-columns:260px minmax(0,1fr)}@media(max-width:900px){.doc-layout{display:block}.campaign-contents{position:static;margin:16px 0}.doc-intro{display:block}}@media print{.campaign-contents{display:none}}</style>').childNodes[0];
        style.parentNode = node; node.childNodes.push(style);
      }
    }
  }
  finish(root);
  return serialize(root);
}

export function campaignAssetPaths(html) {
  const files = new Set(['imgs/UI/K_banner/K_baner_animated.gif']);
  function add(value) {
    let pathname;
    try { pathname = decodeURIComponent(new URL(value, 'https://kslhuy.github.io/divergency-reviewer-site/').pathname).replace(/^\/divergency-reviewer-site\//, '').replace(/^\//, ''); }
    catch { return; }
    if (/^(?:imgs|audio)\//.test(pathname) && !pathname.split('/').includes('..') && !isLocalOnlyPath(pathname)) files.add(pathname);
    if (pathname === 'styles/site.css') files.add(pathname);
  }
  function visit(node) {
    for (const a of node.attrs || []) if (['src', 'href', 'poster'].includes(a.name)) add(a.value);
    if (node.tagName === 'meta' && /^(?:og:image|twitter:image)$/.test(attr(node, 'property') || attr(node, 'name'))) add(attr(node, 'content'));
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(html));
  return [...files].sort();
}
