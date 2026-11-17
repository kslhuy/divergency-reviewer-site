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
const descriptionFr = 'Découvrez la campagne Kickstarter en français de Divergency, un tactical brawler dark fantasy par TriLinkage.';
const titleEn = 'Divergency by TriLinkage | Dark Fantasy Tactical Brawler';
const titleFr = 'Divergency par TriLinkage | Tactical Brawler Dark Fantasy';

function findClassText(node, targetClass) {
  if (hasClass(node, targetClass)) return textOf(node);
  for (const child of node.childNodes || []) {
    const found = findClassText(child, targetClass);
    if (found) return found;
  }
  return '';
}

function setAttr(node, name, value) {
  node.attrs = node.attrs || [];
  const existing = node.attrs.find(a => a.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
}

function langSwitcherHtml(compact = false) {
  return `<div class="ks-lang-switcher${compact ? ' ks-lang-switcher--compact' : ''}" role="group" aria-label="Language / Langue"><button type="button" class="ks-lang-btn is-active" data-ks-lang-btn="en" aria-pressed="true">${compact ? 'EN' : 'EN · English'}</button><button type="button" class="ks-lang-btn" data-ks-lang-btn="fr" aria-pressed="false">${compact ? 'FR' : 'FR · Français'}</button></div>`;
}

const publicStyle = `<style>.campaign-contents{align-self:start;position:sticky;top:20px;padding:20px;border:1px solid var(--line,#484039);border-radius:8px}.campaign-contents summary{cursor:pointer;font-weight:bold}.campaign-contents ul{padding-left:18px}.campaign-contents li{margin:10px 0}.campaign-contents a{color:inherit}.doc-pane{display:block}.doc-layout{grid-template-columns:260px minmax(0,1fr)}.hero-top-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.hero-top-row .eyebrow{margin:0}.ks-lang-switcher{display:inline-flex;flex-wrap:wrap;gap:6px;align-items:center}.ks-lang-switcher--compact{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line-soft,#312b25);width:100%}.ks-lang-btn{min-height:34px;padding:5px 12px;border:1px solid var(--line,#4a3f34);border-radius:6px;background:rgba(20,19,18,0.86);color:var(--muted,#bdb2a2);font:inherit;font-size:0.84rem;font-weight:600;cursor:pointer;transition:all 150ms ease}.ks-lang-btn:hover,.ks-lang-btn:focus-visible{color:var(--ink,#f5eee3);border-color:var(--amber,#d8a64d);outline:none}.ks-lang-btn.is-active{background:var(--teal,#6fb8ae);color:#11100f;border-color:var(--teal,#6fb8ae);font-weight:700}body[data-ks-lang="en"] .ks-lang-fr,body:not([data-ks-lang]) .ks-lang-fr{display:none !important}body[data-ks-lang="fr"] .ks-lang-en{display:none !important}@media(max-width:900px){.doc-layout{display:block}.campaign-contents{position:static;margin:16px 0}.doc-intro{display:block}}@media print{.campaign-contents,.ks-lang-switcher{display:none}}</style>`;

const publicLangScript = `<script>(function(){var key='ks-lang';var titleEn=${JSON.stringify(titleEn)};var titleFr=${JSON.stringify(titleFr)};function read(){try{var p=new URLSearchParams(location.search).get('lang');if(p==='en'||p==='fr')return p;}catch(e){}try{var s=localStorage.getItem(key);if(s==='en'||s==='fr')return s;}catch(e){}return 'en';}function apply(lang,persist){lang=lang==='fr'?'fr':'en';if(document.body)document.body.dataset.ksLang=lang;var pane=document.getElementById('pane-kickstarter');if(pane)pane.dataset.ksLang=lang;document.documentElement.lang=lang;document.title=lang==='fr'?titleFr:titleEn;document.querySelectorAll('[data-ks-lang-btn]').forEach(function(btn){var active=btn.getAttribute('data-ks-lang-btn')===lang;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',active?'true':'false');});if(persist){try{localStorage.setItem(key,lang);}catch(e){}try{var u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);}catch(e){}}}document.addEventListener('click',function(e){var btn=e.target&&e.target.closest&&e.target.closest('[data-ks-lang-btn]');if(btn)apply(btn.getAttribute('data-ks-lang-btn'),true);});apply(read(),false);})();</script>`;

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
      if (attr(node, 'lang') && !/^(?:en|fr)(?:-|$)/i.test(attr(node, 'lang'))) return false;
      if (node.tagName === 'meta' && ['description', 'og:description', 'twitter:description'].includes(attr(node, 'name') || attr(node, 'property'))) {
        node.attrs.find(a => a.name === 'content').value = description;
      }
      if (node.tagName === 'p' && hasClass(parent, 'hero-copy')) {
        if (hasClass(node, 'eyebrow')) {
          replaceContents(node, '<span class="ks-lang-en">TriLinkage studio site</span><span class="ks-lang-fr" lang="fr">Site du studio TriLinkage</span>');
        } else {
          replaceContents(node, `<span class="ks-lang-en">${escape(description)}</span><span class="ks-lang-fr" lang="fr">${escape(descriptionFr)}</span>`);
        }
      }
      if (hasClass(parent, 'doc-heading')) {
        if (node.tagName === 'p' && hasClass(node, 'eyebrow')) replaceContents(node, '<span class="ks-lang-en">Campaign pitch</span><span class="ks-lang-fr" lang="fr">Présentation de la campagne</span>');
        if (node.tagName === 'h2' && attr(node, 'id') === 'tab-title-kickstarter') replaceContents(node, '<span class="ks-lang-en">Kickstarter Campaign</span><span class="ks-lang-fr" lang="fr">Campagne Kickstarter</span>');
        if (node.tagName === 'p' && hasClass(node, 'doc-summary')) replaceContents(node, '<span class="ks-lang-en">Game showcase: combat, skill deck &amp; Vesliction, squad synergy, playable fighters, story, and music.</span><span class="ks-lang-fr" lang="fr">Présentation du jeu : combats, deck de compétences &amp; Vesliction, synergie d\'escouade, combattants jouables, histoire et musique.</span>');
      }
      if (/^h[23]$/.test(node.tagName || '') && attr(node, 'id').startsWith('kickstarter-')) {
        const en = (findClassText(node, 'ks-lang-en') || textOf(node)).replace(/^#/, '').trim();
        const fr = (findClassText(node, 'ks-lang-fr') || en).replace(/^#/, '').trim();
        headings.push({ id: attr(node, 'id'), en, fr });
      }
      clean(node);
      return true;
    });
  }
  clean(root);
  function finish(parent) {
    for (const node of parent.childNodes || []) {
      if (node.tagName === 'body') setAttr(node, 'data-ks-lang', 'en');
      if (hasClass(node, 'hero-copy')) {
        const eyebrowIndex = (node.childNodes || []).findIndex(child => child.tagName === 'p' && hasClass(child, 'eyebrow'));
        if (eyebrowIndex !== -1) {
          const eyebrow = node.childNodes[eyebrowIndex];
          const topRow = parseFragment(`<div class="hero-top-row">${langSwitcherHtml(false)}</div>`).childNodes[0];
          eyebrow.parentNode = topRow;
          topRow.childNodes.unshift(eyebrow);
          topRow.parentNode = node;
          node.childNodes.splice(eyebrowIndex, 1, topRow);
        }
      }
      if (hasClass(node, 'hero-stats')) {
        replaceContents(node, '<div><dt><span class="ks-lang-en">Product</span><span class="ks-lang-fr" lang="fr">Produit</span></dt><dd>Divergency</dd></div><div><dt>Studio</dt><dd>TriLinkage</dd></div><div><dt><span class="ks-lang-en">Base</span><span class="ks-lang-fr" lang="fr">Basé à</span></dt><dd>Marseille, France</dd></div><div><dt><span class="ks-lang-en">Status</span><span class="ks-lang-fr" lang="fr">Statut</span></dt><dd><span class="ks-lang-en">Playable build</span><span class="ks-lang-fr" lang="fr">Build jouable</span></dd></div>');
      }
      if (hasClass(node, 'toc-panel')) {
        node.attrs = [{ name: 'class', value: 'campaign-contents' }, { name: 'aria-label', value: 'Campaign contents' }];
        replaceContents(node, `${langSwitcherHtml(true)}<details open><summary><span class="ks-lang-en">Contents</span><span class="ks-lang-fr" lang="fr">Sommaire</span></summary><nav aria-label="Campaign sections"><ul>${headings.map(h => `<li><a href="#${escape(h.id)}"><span class="ks-lang-en">${escape(h.en)}</span><span class="ks-lang-fr" lang="fr">${escape(h.fr)}</span></a></li>`).join('')}</ul></nav></details>`);
      }
      finish(node);
      if (node.tagName === 'head') {
        const style = parseFragment(publicStyle).childNodes[0];
        style.parentNode = node; node.childNodes.push(style);
      }
      if (node.tagName === 'body') {
        const script = parseFragment(publicLangScript).childNodes[0];
        script.parentNode = node; node.childNodes.push(script);
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
