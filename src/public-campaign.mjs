import { parse, parseFragment, serialize } from 'parse5';
import { isLocalOnlyPath } from './public-content.mjs';

const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value || '';
const hasClass = (node, name) => attr(node, 'class').split(/\s+/).includes(name);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const replaceContents = (node, html) => {
  node.childNodes = parseFragment(html).childNodes;
  for (const child of node.childNodes) child.parentNode = node;
};
const description = 'Explore the English Kickstarter campaign for Divergency, a dark fantasy tactical brawler by TriLinkage.';
const descriptionFr = 'Découvrez la campagne Kickstarter en français de Divergency, un tactical brawler dark fantasy par TriLinkage.';
const titleEn = 'Divergency by TriLinkage | Dark Fantasy Tactical Brawler';
const titleFr = 'Divergency par TriLinkage | Tactical Brawler Dark Fantasy';

function setAttr(node, name, value) {
  node.attrs = node.attrs || [];
  const existing = node.attrs.find(a => a.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
}

function langSwitcherHtml(compact = false) {
  return `<div class="ks-lang-switcher${compact ? ' ks-lang-switcher--compact' : ''}" role="group" aria-label="Language / Langue"><button type="button" class="ks-lang-btn is-active" data-ks-lang-btn="en" aria-pressed="true">${compact ? 'EN' : 'EN · English'}</button><button type="button" class="ks-lang-btn" data-ks-lang-btn="fr" aria-pressed="false">${compact ? 'FR' : 'FR · Français'}</button></div>`;
}

const publicStyle = `<style>:root{--reader-top:20px;--heading-offset:28px}.doc-pane{display:block}.doc-intro{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:12px 24px;padding:16px 0}.doc-heading{min-width:0}.doc-intro .eyebrow{margin:0 0 5px}.doc-intro h2{font-size:clamp(1.4rem,2.4vw,2rem);line-height:1.2}.doc-intro .doc-summary{margin:8px 0 0;max-width:none;color:var(--muted);font-size:1rem;line-height:1.5}.doc-intro .doc-stats{min-width:0;grid-template-columns:repeat(3,minmax(76px,1fr));gap:6px;margin:0}.doc-intro .doc-stats div{padding:8px 10px;border-radius:5px}.doc-intro .doc-stats dt{font-size:.75rem}.doc-intro .doc-stats dd{margin-top:4px;font-size:1.05rem;white-space:nowrap}.doc-layout{margin-top:22px}.hero-top-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.hero-top-row .eyebrow{margin:0}.hero-top-row .ks-lang-switcher{margin-top:0}body[data-ks-lang="en"] .ks-lang-fr,body:not([data-ks-lang]) .ks-lang-fr{display:none !important}body[data-ks-lang="fr"] .ks-lang-en{display:none !important}@media(max-width:760px){.doc-intro{grid-template-columns:minmax(0,1fr);gap:12px;padding:14px 0}.doc-intro .doc-stats{grid-template-columns:repeat(3,minmax(0,1fr))}}@media print{.toc-panel,.ks-lang-switcher,.progress{display:none !important}.doc-intro{display:block}}</style>`;

const publicScript = `<script>(function(){
var key='ks-lang';
var titleEn=${JSON.stringify(titleEn)};
var titleFr=${JSON.stringify(titleFr)};
var currentLang='en';
var refreshTocLang=null;

function read(){
  try{var p=new URLSearchParams(location.search).get('lang');if(p==='en'||p==='fr')return p;}catch(e){}
  try{var s=localStorage.getItem(key);if(s==='en'||s==='fr')return s;}catch(e){}
  return 'en';
}

function apply(lang,persist){
  lang=lang==='fr'?'fr':'en';
  currentLang=lang;
  if(document.body)document.body.dataset.ksLang=lang;
  var pane=document.getElementById('pane-kickstarter');
  if(pane)pane.dataset.ksLang=lang;
  document.documentElement.lang=lang;
  document.title=lang==='fr'?titleFr:titleEn;
  document.querySelectorAll('[data-ks-lang-btn]').forEach(function(btn){
    var active=btn.getAttribute('data-ks-lang-btn')===lang;
    btn.classList.toggle('is-active',active);
    btn.setAttribute('aria-pressed',active?'true':'false');
  });
  if(refreshTocLang)refreshTocLang();
  if(persist){
    try{localStorage.setItem(key,lang);}catch(e){}
    try{var u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);}catch(e){}
  }
}

document.addEventListener('click',function(e){
  var btn=e.target&&e.target.closest&&e.target.closest('[data-ks-lang-btn]');
  if(btn)apply(btn.getAttribute('data-ks-lang-btn'),true);
});

apply(read(),false);

if(typeof window==='undefined'||typeof document.querySelector!=='function')return;

var progress=document.getElementById('read-progress');
function updateProgress(){
  if(!progress)return;
  var max=document.documentElement.scrollHeight-window.innerHeight;
  var cur=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
  progress.style.width=(cur*100).toFixed(2)+'%';
}

var panel=document.querySelector('#pane-kickstarter .toc-panel');
if(!panel){
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress);
  updateProgress();
  return;
}

var compact=window.matchMedia('(max-width: 1040px)');
var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
var links=Array.prototype.slice.call(panel.querySelectorAll('.toc-link'));
var targets=links.map(function(link){return document.getElementById(link.hash.slice(1));});
var toggle=panel.querySelector('.toc-mobile-toggle');
var currentEl=panel.querySelector('.toc-current');
var filterEl=panel.querySelector('.toc-filter');
var scrollEl=panel.querySelector('.toc-scroll');
var emptyEl=panel.querySelector('.toc-empty');
var activeIndex=-1;
var savedBranches=null;
var autoBranches=new Set();
var frame=0;
var headingOffset=28;

function normalize(value){
  return String(value||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().trim();
}

function activeLinkText(link){
  var span=currentLang==='fr'?link.querySelector('.ks-lang-fr'):link.querySelector('.ks-lang-en');
  return (span||link).textContent||'';
}

function setBranch(button,expanded){
  button.setAttribute('aria-expanded',String(expanded));
  var target=document.getElementById(button.getAttribute('aria-controls'));
  if(target)target.hidden=!expanded;
}

function setDrawer(open,returnFocus){
  panel.classList.toggle('is-open',open);
  if(toggle){
    toggle.setAttribute('aria-expanded',String(open));
    if(returnFocus)toggle.focus({preventScroll:true});
  }
}

function measure(){
  var drawerHeight=compact.matches&&toggle?toggle.offsetHeight:0;
  headingOffset=20+drawerHeight+16;
  document.documentElement.style.setProperty('--reader-top','20px');
  document.documentElement.style.setProperty('--heading-offset',headingOffset+'px');
  schedule();
}

function revealLink(link){
  if(!filterEl||filterEl.value.trim())return;
  var item=link.closest('.toc-item');
  var ancestors=new Map();
  for(var parent=item&&item.parentElement;parent&&panel.contains(parent);parent=parent.parentElement){
    if(parent.matches('ol[id]')){
      var btn=parent.parentElement.querySelector(':scope > .toc-row > .toc-branch-toggle');
      if(btn)ancestors.set(parent.id,btn);
    }
  }
  autoBranches.forEach(function(id){
    if(!ancestors.has(id)){
      var button=panel.querySelector('[aria-controls="'+id+'"]');
      if(button)setBranch(button,false);
      autoBranches.delete(id);
    }
  });
  ancestors.forEach(function(button,id){
    if(button.getAttribute('aria-expanded')!=='true'){
      setBranch(button,true);
      autoBranches.add(id);
    }
  });
  if(!scrollEl||scrollEl.matches(':hover')||panel.contains(document.activeElement))return;
  var bounds=scrollEl.getBoundingClientRect();
  var row=link.getBoundingClientRect();
  if(bounds.height&&(row.top<bounds.top||row.bottom>bounds.bottom)){
    scrollEl.scrollTop+=row.top-bounds.top-bounds.height/3;
  }
}

function mark(index){
  if(activeIndex===index||!links[index])return;
  links.forEach(function(link,pos){
    if(pos===index)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
  activeIndex=index;
  var link=links[index];
  if(currentEl){
    currentEl.replaceChildren.apply(currentEl,Array.from(link.childNodes,function(node){return node.cloneNode(true);}));
    currentEl.title=activeLinkText(link);
  }
  revealLink(link);
}

function update(){
  frame=0;
  if(!targets.length)return;
  var low=0,high=targets.length-1,cur=0;
  while(low<=high){
    var mid=Math.floor((low+high)/2);
    var t=targets[mid];
    if(t&&t.getBoundingClientRect().top<=headingOffset+8){cur=mid;low=mid+1;}
    else high=mid-1;
  }
  if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-3)cur=targets.length-1;
  mark(cur);
}

function schedule(){if(!frame)frame=requestAnimationFrame(update);}

function jumpTo(target,focus){
  if(!target)return;
  setDrawer(false);
  measure();
  requestAnimationFrame(function(){
    target.scrollIntoView({block:'start',behavior:reducedMotion.matches?'instant':'smooth'});
    if(focus)target.focus({preventScroll:true});
    schedule();
  });
}

function filterIndex(){
  if(!filterEl||!scrollEl)return;
  var query=normalize(filterEl.value);
  var branches=Array.prototype.slice.call(panel.querySelectorAll('.toc-branch-toggle'));
  if(query&&!savedBranches){
    savedBranches=branches.map(function(button){return[button,button.getAttribute('aria-expanded')==='true'];});
  }
  function visit(item,parentMatches){
    var link=item.querySelector(':scope > .toc-row > .toc-link');
    var matches=parentMatches||(link&&normalize(activeLinkText(link)).includes(query));
    var children=Array.prototype.slice.call(item.querySelectorAll(':scope > ol > .toc-item'));
    var visibleChildren=children.map(function(child){return visit(child,matches);}).some(Boolean);
    var visible=Boolean(matches||visibleChildren);
    item.hidden=!visible;
    var btn=item.querySelector(':scope > .toc-row > .toc-branch-toggle');
    if(query&&btn)setBranch(btn,visibleChildren);
    return visible;
  }
  var anyVisible=Array.prototype.slice.call(scrollEl.querySelectorAll(':scope > ol > .toc-item')).map(function(item){return visit(item,false);}).some(Boolean);
  if(emptyEl)emptyEl.hidden=anyVisible;
  panel.querySelectorAll('[data-toc-expand]').forEach(function(button){button.disabled=Boolean(query);});
  if(!query&&savedBranches){
    savedBranches.forEach(function(pair){setBranch(pair[0],pair[1]);});
    savedBranches=null;
    if(links[activeIndex])revealLink(links[activeIndex]);
  }
}

refreshTocLang=function(){
  if(currentEl&&links[activeIndex])currentEl.title=activeLinkText(links[activeIndex]);
  if(filterEl&&filterEl.value.trim())filterIndex();
};

if(toggle){
  toggle.addEventListener('click',function(){
    var open=!panel.classList.contains('is-open');
    setDrawer(open);
    if(open){
      if(filterEl)filterEl.focus({preventScroll:true});
      var selected=links[activeIndex];
      if(selected&&scrollEl&&(!filterEl||!filterEl.value.trim())){
        var bounds=scrollEl.getBoundingClientRect();
        scrollEl.scrollTop+=selected.getBoundingClientRect().top-bounds.top-bounds.height/3;
      }
    }
  });
}

panel.querySelectorAll('.toc-branch-toggle').forEach(function(button){
  button.addEventListener('click',function(){
    autoBranches.delete(button.getAttribute('aria-controls'));
    setBranch(button,button.getAttribute('aria-expanded')!=='true');
  });
});

panel.querySelectorAll('[data-toc-expand]').forEach(function(button){
  button.addEventListener('click',function(){
    autoBranches.clear();
    var expand=button.dataset.tocExpand==='true';
    panel.querySelectorAll('.toc-branch-toggle').forEach(function(branch){setBranch(branch,expand);});
  });
});

links.forEach(function(link,index){
  link.addEventListener('click',function(event){
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(location.hash!==link.hash)history.pushState(null,'',link.hash);
    mark(index);
    jumpTo(targets[index],true);
  });
});

if(filterEl){
  filterEl.addEventListener('input',filterIndex);
  filterEl.addEventListener('keydown',function(event){
    if(event.key!=='Enter')return;
    var query=normalize(filterEl.value);
    var first=links.find(function(link){
      return normalize(activeLinkText(link)).includes(query)&&!link.closest('.toc-item').hidden&&!link.closest('ol[hidden]');
    });
    if(first){event.preventDefault();first.click();}
  });
}

panel.addEventListener('keydown',function(event){
  if(event.key==='Escape'&&compact.matches&&panel.classList.contains('is-open')){
    event.preventDefault();
    setDrawer(false,true);
  }
});

panel.addEventListener('focusout',function(){
  requestAnimationFrame(function(){
    if(compact.matches&&!panel.contains(document.activeElement))setDrawer(false);
  });
});

document.addEventListener('click',function(event){
  if(compact.matches&&!panel.contains(event.target))setDrawer(false);
});

document.addEventListener('load',schedule,true);
window.addEventListener('scroll',function(){schedule();updateProgress();},{passive:true});
window.addEventListener('resize',function(){measure();updateProgress();});
compact.addEventListener('change',function(){setDrawer(false);measure();});
if(typeof ResizeObserver!=='undefined'&&toggle)new ResizeObserver(measure).observe(toggle);

if(location.hash&&location.hash.length>1){
  try{
    var hashTarget=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(hashTarget)jumpTo(hashTarget,false);
  }catch(e){}
}

measure();
updateProgress();
})();</script>`;

// Strip private content from the output itself, including inline image manifests
// and editor scripts. The unmodified local reader keeps every document and tool.
export function publicCampaignPage(html) {
  const root = parse(html);
  function clean(parent) {
    parent.childNodes = (parent.childNodes || []).filter(node => {
      if (node.nodeName === '#comment') return false;
      if (node.tagName === 'script' && attr(node, 'type') !== 'application/ld+json') return false;
      if (hasClass(node, 'doc-pane') && attr(node, 'data-doc') !== 'kickstarter') return false;
      if (['toolbar', 'media-band', 'web-edit-fab', 'lightbox', 'doc-editor-row'].some(name => hasClass(node, name))) return false;
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
      if (hasClass(node, 'doc-stats')) {
        const labels = [
          '<span class="ks-lang-en">Read</span><span class="ks-lang-fr" lang="fr">Lecture</span>',
          'Sections',
          '<span class="ks-lang-en">Tables</span><span class="ks-lang-fr" lang="fr">Tableaux</span>',
        ];
        const dts = (node.childNodes || []).flatMap(child => child.childNodes || []).filter(child => child.tagName === 'dt');
        dts.forEach((dt, index) => { if (labels[index]) replaceContents(dt, labels[index]); });
      }
      finish(node);
      if (node.tagName === 'head') {
        const style = parseFragment(publicStyle).childNodes[0];
        style.parentNode = node; node.childNodes.push(style);
      }
      if (node.tagName === 'body') {
        const script = parseFragment(publicScript).childNodes[0];
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
