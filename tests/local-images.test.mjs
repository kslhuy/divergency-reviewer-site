import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { localImages } from '../scripts/local-images.mjs';

test('Vite serves local image bytes, revalidates changed files, and leaves uploads to R2', async t => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'divergency-images-'));
  mkdirSync(path.join(root, 'imgs'));
  const file = path.join(root, 'imgs', 'Map #1.png');
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg==', 'base64');
  writeFileSync(file, png);
  writeFileSync(path.join(root, 'private.png'), 'private');
  let middleware;
  localImages().configureServer({ config: { root }, middlewares: { use(fn) { middleware = fn; } } });
  const server = http.createServer((req, res) => middleware(req, res, error => {
    res.writeHead(error ? 500 : 418); res.end('worker');
  }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    rmSync(root, { recursive: true, force: true });
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const url = origin + '/imgs/Map%20%231.png';
  const first = await fetch(url, { redirect: 'manual' });
  assert.equal(first.status, 200);
  assert.equal(first.headers.get('Location'), null);
  assert.equal(first.headers.get('Content-Type'), 'image/png');
  assert.deepEqual(Buffer.from(await first.arrayBuffer()), png);
  const etag = first.headers.get('ETag');
  const cached = await fetch(url, { headers: { 'If-None-Match': etag } });
  assert.equal(cached.status, 304);
  assert.equal(await cached.text(), '');
  writeFileSync(file, Buffer.concat([png, Buffer.from('updated')]));
  assert.equal((await fetch(url, { headers: { 'If-None-Match': etag } })).status, 200);
  const head = await fetch(url, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal((await fetch(origin + '/imgs/missing.png')).status, 404);
  assert.equal((await fetch(origin + '/imgs/%ZZ.png')).status, 400);
  assert.equal((await fetch(origin + '/imgs/..%2Fprivate.png')).status, 403);
  assert.equal((await fetch(url, { method: 'POST' })).status, 405);
  assert.equal((await fetch(origin + '/imgs/online/test.png')).status, 418);
  assert.equal((await fetch(origin + '/api/gameplay')).status, 418);
});
