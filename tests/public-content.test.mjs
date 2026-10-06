import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDocs, buildPage } from '../build-reviewer-html.mjs';
import { isLocalOnlyPath, publicContent, preserveLocalContent } from '../src/public-content.mjs';
import { prepareGameplay } from '../scripts/web-content.mjs';
import { parse } from 'parse5';
import { campaignAssetPaths } from '../src/public-campaign.mjs';

test('public reader contains only the English campaign; local reader retains other tabs and editing', () => {
  const html = buildPage(buildDocs());
  assert.deepEqual([...html.matchAll(/data-doc="([^"]+)"/g)].map(m => m[1]), ['kickstarter']);
  assert.doesNotMatch(html, /ALL_IMAGE_SLOTS|IMAGE_SLOTS|id="web-edit|data-md-action|src="[^"]*gameplay-editor|Mục lục|Chưa|Tìm mục/);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /Kickstarter Campaign/);
  assert.match(html, /Contents/);
  const assets = campaignAssetPaths(html);
  assert.ok(assets.includes('imgs/UI/K_banner/K_baner_animated.gif'));
  assert.ok(!assets.some(isLocalOnlyPath));
  const local = buildPage(buildDocs(undefined, {local:true}), {local:true});
  for (const tab of ['story', 'gameplay', 'rewards', 'gallery']) assert.ok(local.includes(`data-doc="${tab}"`));
  const texts = [];
  function visit(node) { if(node.nodeName === '#text' && !['script','style'].includes(node.parentNode?.tagName)) texts.push(node.value); for(const child of node.childNodes || []) visit(child); }
  visit(parse(html));
  assert.doesNotMatch(texts.join(' '), /[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/i);
});

test('public builds omit private chapters, rewards and image manifests; local retains them', () => {
  const publicPage = buildPage(buildDocs());
  assert.doesNotMatch(publicPage, /imgs\/Stage5\/|imgs\/rewards\/|data-tab="rewards"|data-doc="rewards"|stage-05|stage_5|Stage 5|Chương 5|Side-Eye Recognition|Nightmare Harbinger/);
  assert.match(publicPage, /Stage 4/);
  const local = buildPage(buildDocs(undefined, {local:true}), {local:true});
  assert.match(local, /data-tab="rewards"/);
  assert.match(local, /imgs\/Stage5\//);
  assert.match(local, /Side-Eye Recognition/);
  assert.match(local, /gameplay-5-3/);
});

test('private direct URLs include encoded paths and artwork outside the main folders', () => {
  for (const file of ['imgs/Stage5/test.gif', 'imgs/rewards/a.png', '/imgs/%53tage5/a.png', 'imgs/story-panels/divergency-ai-stage-05-cradle-pixel.png', 'imgs/UI/main_menu_backgrounds/stage_5_the_cradle_cosmic_umbilical.png', 'imgs/campaign-panels/kick/Reward.png', 'imgs/campaign-panels/kick/reward/reward 1.png', '/rewards-card-poster.html', '/rewards-proofs-showcase.html']) assert.equal(isLocalOnlyPath(file), true, file);
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
