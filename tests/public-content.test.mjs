import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDocs, buildPage } from '../build-reviewer-html.mjs';
import { isLocalOnlyPath, publicContent, preserveLocalContent } from '../src/public-content.mjs';
import { prepareGameplay } from '../scripts/web-content.mjs';
import { parse } from 'parse5';
import { campaignAssetPaths } from '../src/public-campaign.mjs';

test('public reader contains bilingual EN/FR campaign; local reader retains other tabs and editing', async () => {
  const { Script } = await import('node:vm');
  const html = buildPage(buildDocs());
  assert.deepEqual([...html.matchAll(/data-doc="([^"]+)"/g)].map(m => m[1]), ['kickstarter']);
  assert.doesNotMatch(html, /ALL_IMAGE_SLOTS|IMAGE_SLOTS|id="web-edit|data-md-action|src="[^"]*gameplay-editor|Mục lục|Chưa|Tìm mục/);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /data-ks-lang="en"/);
  assert.match(html, /data-ks-lang-btn="en"/);
  assert.match(html, /data-ks-lang-btn="fr"/);
  assert.match(html, /Kickstarter Campaign/);
  assert.match(html, /Campagne Kickstarter/);
  assert.match(html, /Contents/);
  assert.match(html, /Sommaire/);
  assert.match(html, /Combattants jouables/);
  const scripts = [...html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g)]
    .filter(m => !m[0].includes('application/ld+json'))
    .map(m => m[1]);
  assert.equal(scripts.length, 1);
  assert.doesNotThrow(() => new Script(scripts[0]));
  const makeBtn = lang => {
    const classes = new Set(lang === 'en' ? ['is-active'] : []);
    const attrs = { 'data-ks-lang-btn': lang, 'aria-pressed': lang === 'en' ? 'true' : 'false' };
    return {
      getAttribute: k => attrs[k] ?? null,
      setAttribute: (k, v) => { attrs[k] = String(v); },
      classList: { toggle: (c, on) => on ? classes.add(c) : classes.delete(c), contains: c => classes.has(c) },
      closest: sel => sel === '[data-ks-lang-btn]' ? makeBtnRef(lang) : null,
    };
  };
  const btns = [makeBtn('en'), makeBtn('fr')];
  const makeBtnRef = lang => btns[lang === 'en' ? 0 : 1];
  let clickHandler;
  const store = new Map();
  const body = { dataset: { ksLang: 'en' } };
  const pane = { dataset: { ksLang: 'en' } };
  const docEl = { lang: 'en' };
  const doc = {
    body,
    documentElement: docEl,
    title: '',
    getElementById: id => id === 'pane-kickstarter' ? pane : null,
    querySelectorAll: sel => sel === '[data-ks-lang-btn]' ? btns : [],
    addEventListener: (ev, fn) => { if (ev === 'click') clickHandler = fn; },
  };
  const ctx = {
    document: doc,
    location: { href: 'https://kslhuy.github.io/divergency-reviewer-site/?lang=fr', search: '?lang=fr' },
    localStorage: { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) },
    history: { replaceState: (_s, _t, u) => { ctx.location.href = String(u); } },
    URL,
    URLSearchParams,
  };
  new Script(scripts[0]).runInNewContext(ctx);
  assert.equal(body.dataset.ksLang, 'fr');
  assert.equal(pane.dataset.ksLang, 'fr');
  assert.equal(docEl.lang, 'fr');
  assert.match(doc.title, /par TriLinkage/);
  assert.equal(btns[1].getAttribute('aria-pressed'), 'true');
  assert.equal(btns[0].getAttribute('aria-pressed'), 'false');
  clickHandler({ target: { closest: () => btns[0] } });
  assert.equal(body.dataset.ksLang, 'en');
  assert.equal(docEl.lang, 'en');
  assert.equal(store.get('ks-lang'), 'en');
  assert.match(ctx.location.href, /\?lang=en/);
  const { existsSync } = await import('node:fs');
  const assets = campaignAssetPaths(html);
  assert.ok(assets.includes('imgs/UI/K_banner/K_baner_animated.gif'));
  assert.ok(!assets.some(isLocalOnlyPath));
  for (const file of assets) assert.ok(existsSync(new URL('../' + file, import.meta.url)), `Missing campaign asset: ${file}`);
  assert.doesNotMatch(html, /Visual Slots/);
  const local = buildPage(buildDocs(undefined, {local:true}), {local:true});
  for (const tab of ['story', 'gameplay', 'rewards', 'gallery']) assert.ok(local.includes(`data-doc="${tab}"`));
  const texts = [];
  function visit(node) { if(node.nodeName === '#text' && !['script','style'].includes(node.parentNode?.tagName)) texts.push(node.value); for(const child of node.childNodes || []) visit(child); }
  visit(parse(html));
  assert.doesNotMatch(texts.join(' '), /[ảãạăằắẳẵặầấẩẫậđẻẽẹềếểễệỉĩịỏõọồốổỗộơờớởỡợủũụừứửữựỳýỷỹỵ]/i);
});

test('public builds omit private chapters, rewards and image manifests; local retains them in dedicated tabs while syncing Kickstarter 1:1', () => {
  const publicPage = buildPage(buildDocs());
  assert.doesNotMatch(publicPage, /imgs\/backgrounds\/use\/stage5__|imgs\/rewards\/|data-tab="rewards"|data-doc="rewards"|stage-05|stage_5|Stage 5|Chapitre 5|Chương 5|Side-Eye Recognition|Nightmare Harbinger|Expédition et livraison/);
  assert.match(publicPage, /Stage 4/);
  assert.match(publicPage, /Chapitre 4/);
  const localDocs = buildDocs(undefined, {local:true});
  const publicDocs = buildDocs();
  assert.equal(localDocs.find(d => d.id === 'kickstarter').html, publicDocs[0].html);
  assert.deepEqual(localDocs.find(d => d.id === 'kickstarter').toc, publicDocs[0].toc);
  assert.equal(localDocs.find(d => d.id === 'kickstarter').summary, publicDocs[0].summary);
  const local = buildPage(localDocs, {local:true});
  const localKsArticle = local.match(/<article class="markdown-body" data-search-root="kickstarter">([\s\S]*?)<\/article>/)?.[1];
  const publicKsArticle = publicPage.match(/<article class="markdown-body" data-search-root="kickstarter">([\s\S]*?)<\/article>/)?.[1];
  assert.ok(localKsArticle);
  assert.equal(localKsArticle, publicKsArticle);
  assert.match(local, /data-tab="rewards"/);
  assert.match(local, /imgs\/(?:Stage5\/|backgrounds\/use\/stage5__)/);
  assert.match(local, /Side-Eye Recognition/);
  assert.match(local, /gameplay-5-3/);
});

test('private direct URLs include encoded paths and artwork outside the main folders', () => {
  for (const file of ['imgs/backgrounds/use/stage5__test.gif', 'imgs/backgrounds/no-use/stage1__draft.png', '/imgs/backgrounds/%6Eo-use/draft.png', 'imgs/Stage5/test.gif', 'imgs/rewards/a.png', '/imgs/%53tage5/a.png', 'imgs/story-panels/divergency-ai-stage-05-cradle-pixel.png', 'imgs/UI/main_menu_backgrounds/stage_5_the_cradle_cosmic_umbilical.png', 'imgs/campaign-panels/kick/Reward.png', 'imgs/campaign-panels/kick/reward/reward 1.png', '/rewards-card-poster.html', '/rewards-proofs-showcase.html']) assert.equal(isLocalOnlyPath(file), true, file);
  assert.equal(isLocalOnlyPath('imgs/Stage4/view_final.gif'), false);
});

test('section filtering removes bodies, subchapters, inline references and private image captions', () => {
  const source = '<h1>Gameplay</h1><h2>Chương 4</h2><p>Keep me</p><h2>Chương 5</h2><p>Secret finale</p><h3>Boss</h3><p>Secret boss</p><h2>5-1. Dream</h2><p>Secret dream</p><h2>7. Mechanics</h2><table><tr><td>Stage 5</td><td>Secret row</td></tr><tr><td>Stage 4</td><td>Keep row</td></tr></table><figure><img src="imgs/rewards/a.png"><figcaption>Secret caption</figcaption></figure>';
  const output = publicContent(source, {documentId:'gameplay'});
  assert.doesNotMatch(output, /Secret|Chương 5|5-1/);
  assert.match(output, /Keep me/);
  assert.match(output, /Keep row/);
  const saved = prepareGameplay(preserveLocalContent(source, output.replace('Keep me', 'Edited'), {documentId:'gameplay'})).html;
  assert.match(saved, /Secret finale/);
  assert.match(saved, /Secret row/);
  assert.match(saved, /Edited/);
  assert.doesNotMatch(publicContent(saved, {documentId:'gameplay'}), /Secret/);
  const savedAgain = prepareGameplay(preserveLocalContent(saved, output, {documentId:'gameplay'})).html;
  assert.equal((savedAgain.match(/Secret finale/g) || []).length, 1);
});

test('Pages artifact includes the public Social Hub bio page and its media assets', async () => {
  const root = new URL('../', import.meta.url);
  const siteDir = new URL('../_site/', import.meta.url);
  const { existsSync, readFileSync } = await import('node:fs');
  assert.equal(existsSync(new URL('socials.html', root)), true);
  assert.equal(existsSync(new URL('links.html', root)), true);
  const socials = readFileSync(new URL('socials.html', root), 'utf8');
  assert.match(socials, /TRILINKAGE/);
  assert.match(socials, /Music_Trailler_Original\.mp3/);
  if (existsSync(new URL('socials.html', siteDir))) {
    assert.equal(existsSync(new URL('links.html', siteDir)), true);
    assert.equal(existsSync(new URL('audio/Music_Trailler_Original.mp3', siteDir)), true);
    assert.equal(existsSync(new URL('imgs/icons/icon_d_color.png', siteDir)), true);
  }
});

