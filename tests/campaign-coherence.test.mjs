import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, parseFragment } from 'parse5';
import { renderStoryReader } from '../scripts/story-reader.mjs';
import { Script } from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join(' ');
const entries = directory => JSON.parse(readFileSync(path.join(root, 'content', directory, 'index.json'), 'utf8'));
const chapter = (directory, prefix) => {
  const item = entries(directory).find(item => item.file.startsWith(prefix));
  assert.ok(item, `${directory}/${prefix}`);
  return readFileSync(path.join(root, 'content', directory, item.file), 'utf8');
};
const plain = html => textOf(parseFragment(html)).replace(/\s+/g, ' ').trim();

test('campaign manifests contain every maintained HTML chapter exactly once', () => {
  for (const directory of ['origin', 'story', 'story-summary', 'gameplay']) {
    const listed = entries(directory).map(item => item.file);
    assert.equal(new Set(listed).size, listed.length, directory);
    assert.deepEqual([...listed].sort(), readdirSync(path.join(root, 'content', directory)).filter(file => file.endsWith('.html')).sort(), directory);
  }
});

test('campaign illustrations resolve to existing local assets, including encoded paths', () => {
  for (const directory of ['origin', 'story', 'story-summary', 'gameplay']) {
    for (const { file } of entries(directory)) {
      const source = parseFragment(readFileSync(path.join(root, 'content', directory, file), 'utf8'));
      function visit(node) {
        if (node.tagName === 'img') {
          const src = node.attrs.find(item => item.name === 'src')?.value;
          if (src?.startsWith('imgs/')) assert.ok(existsSync(path.join(root, decodeURIComponent(src))), `${directory}/${file}: ${src}`);
        }
        for (const child of node.childNodes || []) visit(child);
      }
      visit(source);
    }
  }
});

test('known superseded campaign events do not reappear in maintained sources', () => {
  const obsolete = [
    /Gilles|Jameson|Sarrasin/u,
    /Trùm Chính Tuyến:\s*Jamerson|Jamerson trong Giáp Năm Mảnh Thần/iu,
    /Vụ nổ sà lan ở Bastonne đã|lô hàng.{0,20}bị nổ ở Bastonne/iu,
    /Năm cột sáng tâm linh|chiếm lĩnh từng cột sáng/iu,
    /thực thể ngoài vòm trời thức tỉnh trong lồng ngực Ghost/iu,
    /Ghost (?:dùng lưỡi dao của mình )?cắt đứt cuống/iu,
    /một tâm trí hoàn toàn không có lời nói dối/iu,
  ];
  for (const directory of ['origin', 'story', 'story-summary', 'gameplay']) {
    for (const { file } of entries(directory)) {
      const text = plain(readFileSync(path.join(root, 'content', directory, file), 'utf8'));
      for (const expression of obsolete) assert.doesNotMatch(text, expression, `${directory}/${file}`);
    }
  }
});

test('chapter 0 and all accounts of the ending retain the agreed outcomes', () => {
  for (const directory of ['story', 'gameplay', 'story-summary']) {
    const prefix = directory === 'story' ? '07-' : directory === 'gameplay' ? '08-' : '04-';
    const text = plain(chapter(directory, prefix));
    assert.match(text, /James Kid/);
    assert.match(text, /Skyjet/);
  }
  assert.match(plain(chapter('story', '11-')), /Jamerson chết/);
  for (const [directory, prefix] of [['story','12-'], ['gameplay','39-'], ['story-summary','09-']]) {
    const text = plain(chapter(directory, prefix));
    assert.match(text, /Dream Sovereign/);
    assert.match(text, /ba mốc/);
    assert.match(text, /Dây Rốn tự thu/);
    const start = text.indexOf('5-4');
    const ending = text.slice(start);
    assert.match(ending, /Tai[\s\S]*Lưỡi[\s\S]*Tim[\s\S]*Mắt/);
    assert.ok(ending.indexOf('Mắt') < ending.indexOf('vành'), `${directory}: return the cores before retreating`);
    assert.ok(ending.indexOf('vành') < ending.indexOf('Dây Rốn tự thu'), `${directory}: retreat before closure`);
  }
});

test('standalone story reader contains the current source prose and working navigation', () => {
  const html = renderStoryReader(root);
  assert.equal(readFileSync(path.join(root, 'artifacts', 'chapters3-5_story.html'), 'utf8'), html, 'Rebuild the standalone reader after editing source chapters');
  const document = parse(html);
  const article = [];
  const anchors = new Set();
  const navigation = [];
  function visit(node) {
    const attr = name => node.attrs?.find(item => item.name === name)?.value;
    if (attr('id')) anchors.add(attr('id'));
    if (node.tagName === 'a' && attr('href')?.startsWith('#')) navigation.push(attr('href').slice(1));
    if (node.tagName === 'article') article.push(node);
    if (node.tagName === 'img') {
      assert.ok(existsSync(path.resolve(root, 'artifacts', attr('src'))), attr('src'));
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(document);
  assert.equal(article.length, 1);
  for (const id of navigation) assert.ok(anchors.has(id), id);
  const expected = ['10-','11-','12-'].map(prefix => plain(chapter('story', prefix).replace(/<a\b[^>]*class="heading-link"[^>]*>[\s\S]*?<\/a>/g,''))).join(' ');
  assert.equal(textOf(article[0]).replace(/\s+/g,' ').trim(), expected);
});

test('final rescue distinguishes projections, tangible constructs and nonlethal progress', () => {
  const core = plain(chapter('gameplay', '04-'));
  const final = plain(chapter('gameplay', '39-'));
  assert.match(core, /Ảnh chiếu:[\s\S]*không có body collider[\s\S]*Bóng Nhiễu:[\s\S]*có collider và hurtbox/);
  assert.match(final, /ba đợt hữu hạn, tối đa hai bóng/);
  assert.match(final, /không đo sinh lực Ghost/);
  assert.match(final, /sát thương không trừ HP cơ thể anh/);
  for (const [directory, prefix] of [['story','12-'], ['gameplay','39-'], ['story-summary','09-']]) {
    const text = plain(chapter(directory, prefix));
    assert.match(text, /xả áp/i);
    assert.match(text, /van (?:chính )?trả lõi/i);
  }
});

test('medical supply and advance evidence are established before the final fight', () => {
  for (const [directory, prefix] of [['story','11-'], ['gameplay','34-']]) {
    const text = plain(chapter(directory, prefix));
    assert.match(text, /Bastonne[\s\S]*Calvaria/);
    assert.match(text, /số liệu thô cũ/);
    assert.match(text, /máy phát thường/i);
    assert.match(text, /thử (?:ngắt lưới Tim|điện y tế)|thử máy phát/);
  }
  for (const [directory, prefix] of [['story','12-'], ['gameplay','39-'], ['story-summary','10-']]) {
    const text = plain(chapter(directory, prefix));
    assert.match(text, /máy phát thường/i);
    assert.match(text, /huyết dịch nhiễm bẩn/i);
  }
});

test('later personal memories and the injured guide have an earlier cause', () => {
  assert.match(plain(chapter('story','09-')), /giấu nửa chiếc bánh/);
  assert.match(plain(chapter('gameplay','16-')), /giấu nửa chiếc bánh/);
  assert.match(plain(chapter('story','10-')), /bản đồ, rồi ở lại kho Barnaby để điều trị/);
  assert.match(plain(chapter('gameplay','30-')), /bản đồ rồi ở lại kho Barnaby điều trị/);
  assert.match(plain(chapter('story','11-')), /bản đồ người phu/);
});

test('harbor dialogue uses documentary evidence and preserves the hostage objective', () => {
  const harbor = plain(chapter('gameplay', '13-'));
  assert.doesNotMatch(harbor, /buộc thả con tin|Mateo đang ở đó/);
  assert.match(harbor, /không có quyền thả Mateo/);
  assert.match(harbor, /Lệnh chuyển ghi MuCEM, sơ đồ dịch vụ/);
  const html = readFileSync(path.join(root,'hangar_j4_briefing_cutscene.html'),'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]);
  for (const source of scripts) assert.doesNotThrow(() => new Script(source));
  assert.match(html, /speaker: "MARK",\s*action: "\(đối chiếu lệnh chuyển Mateo với sơ đồ dịch vụ\)"/);
  assert.doesNotMatch(html, /Dưới MuCEM… còn nhiều người\. Tôi nghe thấy họ\./);
});
