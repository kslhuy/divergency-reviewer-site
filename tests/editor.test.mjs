import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import { parse, parseFragment } from 'parse5';
import { prepareGameplay } from '../scripts/web-content.mjs';
import { createContentStore, createEditorServer, projectRoot } from '../scripts/editor-server.mjs';
import { buildDocs, buildPage, renderMarkdown } from '../build-reviewer-html.mjs';
import { listImages, MAX_IMAGE_BYTES, saveImage } from '../scripts/editor-images.mjs';

function walk(node, callback) { callback(node); for (const child of node.childNodes || []) walk(child, callback); }
function contentSignature(html) {
  const text = [], images = [], cells = [];
  function visit(node) {
    if (node.attrs?.some(attr => attr.name === 'class' && attr.value === 'heading-link')) return;
    if (node.nodeName === '#text' && node.value.trim()) text.push(node.value.trim());
    if (node.tagName === 'img') images.push(node.attrs.filter(attr => ['src', 'alt'].includes(attr.name)));
    if (['th', 'td'].includes(node.tagName)) cells.push(node.tagName);
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parseFragment(html));
  return { text, images, cells };
}
function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'divergency-editor-test-'));
  mkdirSync(path.join(root, 'content')); mkdirSync(path.join(root, 'imgs'));
  writeFileSync(path.join(root, 'content/gameplay.html'), '<h1>Gameplay</h1><p>Bản trước</p>');
  writeFileSync(path.join(root, 'Divergency_Reviewer_Tabs.html'), 'old page');
  t.after(() => {
    const resolved = path.resolve(root);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.ok(path.basename(resolved).startsWith('divergency-editor-test-'));
    rmSync(resolved, { recursive: true, force: true });
  });
  return root;
}

const tinyPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRz8AAAAASUVORK5CYII=', 'base64');

test('library finds nested images and safely stores uploads without overwriting names', t => {
  const root = fixture(t);
  mkdirSync(path.join(root, 'imgs', 'Stage1', 'nested'), { recursive: true });
  writeFileSync(path.join(root, 'imgs', 'Stage1', 'nested', 'Bản đồ #1.png'), tinyPNG);
  writeFileSync(path.join(root, 'imgs', 'notes.txt'), 'not an image');
  const library = listImages(root);
  assert.equal(library.length, 1);
  assert.equal(library[0].name, 'Bản đồ #1.png');
  assert.equal(library[0].folder, 'Stage1/nested');
  assert.match(library[0].src, /%23/);
  const image = saveImage(root, '../../Ảnh mới.png', tinyPNG);
  assert.match(image.src, /^imgs\/uploads\/Anh-moi-[a-f0-9]{16}\.png$/);
  assert.deepEqual(readFileSync(path.join(root, image.src)), tinyPNG);
  assert.equal(saveImage(root, '../../Ảnh mới.png', tinyPNG).src, image.src);
  assert.equal(listImages(root).length, 2);
  assert.throws(() => saveImage(root, 'fake.png', Buffer.from('<script>alert(1)</script>')), error => error.status === 400);
  assert.throws(() => saveImage(root, 'too-large.png', Buffer.alloc(MAX_IMAGE_BYTES + 1)), error => error.status === 413);
  assert.equal(listImages(root).length, 2);
});

test('image API authenticates, uploads, serves and lists new images for reuse', async t => {
  const root = fixture(t);
  const server = createEditorServer({ root, renderPage: html => html });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const { token } = await (await fetch(origin + '/api/editor')).json();
  const headers = { 'X-Editor-Token': token, 'X-Image-Name': encodeURIComponent('Ảnh từ máy.png'), 'Content-Type': 'image/png' };
  assert.equal((await fetch(origin + '/api/images')).status, 403);
  assert.equal((await fetch(origin + '/api/images', { method: 'POST', body: tinyPNG })).status, 403);
  assert.equal((await fetch(origin + '/api/images', { method: 'POST', headers: { ...headers, Origin: 'https://external.example' }, body: tinyPNG })).status, 403);
  const response = await fetch(origin + '/api/images', { method: 'POST', headers, body: tinyPNG });
  assert.equal(response.status, 201);
  const { image } = await response.json();
  const served = await fetch(origin + '/' + image.src);
  assert.equal(served.headers.get('content-type'), 'image/png');
  assert.deepEqual(Buffer.from(await served.arrayBuffer()), tinyPNG);
  const { images } = await (await fetch(origin + '/api/images', { headers })).json();
  assert.equal(images.length, 1);
  assert.equal(images[0].src, image.src);
  assert.equal((await fetch(origin + '/api/images', { method: 'POST', headers, body: '<svg onload="alert(1)"></svg>' })).status, 400);
  const content = await (await fetch(origin + '/api/gameplay', { headers })).json();
  const saved = await fetch(origin + '/api/gameplay', { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ revision: content.revision, html: `<h1>Hình mới</h1><figure class="markdown-image"><img src="${image.src}" alt="Ảnh từ máy"><figcaption>Chú thích</figcaption></figure>` }) });
  assert.equal(saved.status, 200);
  assert.ok((await (await fetch(origin + '/')).text()).includes(image.src));
});

test('current gameplay import preserves every text fragment, image, table cell and heading', () => {
  const markdown = readFileSync(path.join(projectRoot, 'Divergency_Gameplay_Level_Design.md'), 'utf8');
  const rendered = renderMarkdown(markdown, 'gameplay');
  const prepared = prepareGameplay(rendered.html);
  assert.deepEqual(contentSignature(prepared.html), contentSignature(rendered.html));
  assert.deepEqual(prepared.toc, rendered.toc);
  assert.equal(prepareGameplay(prepared.html).html, prepared.html, 'repeated builds must be stable');
});

test('HTML parser strips active content and unsafe URLs, preserving useful formatting', () => {
  const result = prepareGameplay('<h1 onclick="alert(1)">Thiết kế</h1><script>alert(1)</script><svg onload="alert(1)"></svg><p><strong>Đội</strong> <a href="jav&#x61;script:alert(1)">link</a><a href="https://example.com">safe</a></p><img src="https://tracker.example/x" onerror="alert(1)"><img src="imgs/a b.png" alt="Hình"><table><tr><th>Vai trò</th></tr><tr><td>Block</td></tr></table>');
  assert.doesNotMatch(result.html, /onclick|onerror|script|svg|tracker/);
  assert.match(result.html, /<strong>Đội<\/strong>/);
  assert.match(result.html, /href="https:\/\/example.com"/);
  assert.match(result.html, /src="imgs\/a b.png"/);
  assert.equal(result.tables, 1);
});

test('save persists canonical content, rebuilds reader, backs up, and rejects stale revisions', t => {
  const root = fixture(t);
  const store = createContentStore(root, html => '<html>' + html + '</html>');
  const before = store.read();
  const saved = store.save({ html: '<h1>Thiết kế mới</h1><p><b>Đội hình</b></p>', revision: before.revision });
  assert.notEqual(saved.revision, before.revision);
  assert.match(readFileSync(path.join(root, 'Divergency_Reviewer_Tabs.html'), 'utf8'), /Thiết kế mới/);
  assert.equal(readFileSync(path.join(root, '.editor-backups', saved.backup), 'utf8'), before.html);
  assert.throws(() => store.save({ html: '<h1>Overwrite</h1>', revision: before.revision }), error => error.status === 409);
  assert.equal(store.read().revision, saved.revision);
  assert.equal(readdirSync(path.join(root, '.editor-backups')).length, 1);
});

test('a failed page build does not modify either document', t => {
  const root = fixture(t);
  const store = createContentStore(root, () => { throw new Error('build failed'); });
  const before = store.read();
  assert.throws(() => store.save({ html: '<h1>New</h1>', revision: before.revision }), /build failed/);
  assert.deepEqual(store.read(), before);
  assert.equal(readFileSync(path.join(root, 'Divergency_Reviewer_Tabs.html'), 'utf8'), 'old page');
});

test('HTTP editor saves, reloads, enforces origin and token, and does not serve private files', async t => {
  const root = fixture(t);
  const server = createEditorServer({ root, renderPage: html => '<html>' + html + '</html>' });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const session = await (await fetch(origin + '/api/editor')).json();
  const headers = { 'X-Editor-Token': session.token, 'Content-Type': 'application/json' };
  const before = await (await fetch(origin + '/api/gameplay', { headers })).json();
  const response = await fetch(origin + '/api/gameplay', { method: 'PUT', headers, body: JSON.stringify({ revision: before.revision, html: '<h1>Lưu trên web</h1><p>Tiếng Việt &amp; bảng</p>' }) });
  assert.equal(response.status, 200);
  const after = await response.json();
  assert.match(after.html, /Lưu trên web/);
  assert.match(await (await fetch(origin + '/')).text(), /Lưu trên web/);
  assert.equal((await fetch(origin + '/', { headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 200, 'opening the reader from another page must work');
  assert.equal((await (await fetch(origin + '/api/gameplay', { headers })).json()).revision, after.revision);
  assert.equal((await fetch(origin + '/api/gameplay')).status, 403);
  assert.equal((await fetch(origin + '/api/editor', { headers: { Origin: 'https://external.example' } })).status, 403);
  const spoofedHostStatus = await new Promise((resolve, reject) => {
    http.get(origin + '/api/editor', { headers: { Host: 'external.example' } }, res => { res.resume(); resolve(res.statusCode); }).on('error', reject);
  });
  assert.equal(spoofedHostStatus, 403);
  assert.equal((await fetch(origin + '/content/gameplay.html')).status, 404);
  assert.equal((await fetch(origin + '/.git/config')).status, 404);
  assert.equal((await fetch(origin + '/api/gameplay', { method: 'PUT', headers, body: '{' })).status, 400);
});

test('build uses the web source and includes working scripts and valid gameplay index targets', () => {
  const override = '<h1>Bản chính trên web</h1><h2>Mục trùng</h2><p>Nội dung</p><h2>Mục trùng</h2>';
  const docs = buildDocs(override);
  const gameplay = docs.find(doc => doc.id === 'gameplay');
  assert.equal(gameplay.toc.length, 3);
  assert.notEqual(gameplay.toc[1].id, gameplay.toc[2].id);
  const page = buildPage(docs);
  let scripts = 0;
  walk(parse(page), node => {
    if (node.tagName !== 'script' || node.attrs.some(attr => attr.name === 'type' && attr.value === 'application/ld+json')) return;
    new vm.Script(node.childNodes.map(child => child.value || '').join(''));
    scripts++;
  });
  assert.equal(scripts, 2);
  assert.match(page, /Chỉnh sửa trực tiếp/);
  for (const item of gameplay.toc) {
    assert.ok(page.includes(`id="${item.id}"`));
    assert.ok(page.includes(`href="#${item.id}"`));
  }
});
