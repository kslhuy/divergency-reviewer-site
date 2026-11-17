import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, randomBytes } from 'node:crypto';
import { createReadStream, existsSync, mkdirSync, readFileSync, realpathSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { buildDocs, buildPage, buildReviewer } from '../build-reviewer-html.mjs';
import { prepareGameplay } from './web-content.mjs';
import { readContent, writeContent } from './chapter-content.mjs';
import { assetFiles } from '../src/asset-files.mjs';
import { listImages, MAX_IMAGE_BYTES, saveImage } from './editor-images.mjs';
import { serveLocalImage } from './local-images.mjs';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const revisionOf = value => createHash('sha256').update(value).digest('hex');

export function createContentStore(root, renderPage) {
  const source = path.join(root, 'content/gameplay.html');
  const output = path.join(root, 'Divergency_Reviewer_Tabs.html');
  const localOutput = path.join(root, 'Divergency_Reviewer_Local.html');
  const read = () => {
    const html = readContent(root, 'gameplay');
    return { html, revision: revisionOf(html) };
  };
  return {
    read,
    save({ html, revision }) {
      if (typeof html !== 'string' || !html.trim() || html.length > 3_000_000) {
        throw Object.assign(new Error('Content is empty or too large. Changes were not saved.'), { status: 400 });
      }
      const previous = read();
      if (revision !== previous.revision) {
        throw Object.assign(new Error('This document changed in another window. Download your draft and reload to compare. The saved version was not overwritten.'), { status: 409 });
      }
      const prepared = prepareGameplay(html);
      if (!prepared.toc.length) throw Object.assign(new Error('Keep at least one heading in the document.'), { status: 400 });
      // Complete rendering before touching either authoritative file.
      const page = renderPage(prepared.html);
      const oldPage = existsSync(output) ? readFileSync(output) : null;
      const oldLocalPage = existsSync(localOutput) ? readFileSync(localOutput) : null;
      const backupDir = path.join(root, '.editor-backups');
      mkdirSync(backupDir, { recursive: true });
      const backup = `gameplay-${new Date().toISOString().replace(/[:.]/g, '-')}-${randomBytes(3).toString('hex')}.html`;
      writeFileSync(path.join(backupDir, backup), previous.html, 'utf8');
      const chapterMode = existsSync(path.join(root, 'content/gameplay/index.json'));
      if (!chapterMode) writeFileSync(source + '.pending', prepared.html, 'utf8');
      writeFileSync(output + '.pending', page, 'utf8');

      let hasLocalOutput = false;
      if (oldLocalPage) {
        try {
          const localDocs = buildDocs(prepared.html, { local: true });
          const localHtml = buildPage(localDocs, { local: true });
          writeFileSync(localOutput + '.pending', localHtml, 'utf8');
          hasLocalOutput = true;
        } catch {
          hasLocalOutput = false;
        }
      }

      try {
        if (chapterMode) writeContent(root, 'gameplay', prepared.html);
        else renameSync(source + '.pending', source);
        renameSync(output + '.pending', output);
        if (hasLocalOutput && existsSync(localOutput + '.pending')) {
          renameSync(localOutput + '.pending', localOutput);
        }
      } catch (error) {
        if (chapterMode) writeContent(root, 'gameplay', previous.html);
        else writeFileSync(source, previous.html, 'utf8');
        if (oldPage) writeFileSync(output, oldPage);
        if (oldLocalPage && hasLocalOutput) writeFileSync(localOutput, oldLocalPage);
        throw error;
      }
      return { ...read(), backup, savedAt: new Date().toISOString() };
    },
  };
}

export function createEditorServer({ root = projectRoot, renderPage = html => buildPage(buildDocs(html, { local: true }), { local: true }) } = {}) {
  const store = createContentStore(root, renderPage);
  const token = randomBytes(32).toString('hex');
  const mime = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
  Object.assign(mime, { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' });
  const publicFiles = new Set(['Divergency_Reviewer_Tabs.html', 'Divergency_Reviewer_Local.html', 'steam-image-tool.html', 'rewards-card-poster.html', 'robots.txt', 'sitemap.xml', ...assetFiles]);
  const json = (res, status, data) => {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify(data));
  };
  const server = http.createServer(async (req, res) => {
    try {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': req.headers.origin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Editor-Token, X-Image-Name',
          'Access-Control-Max-Age': '86400',
        });
        return res.end();
      }
      const origin = `http://127.0.0.1:${server.address().port}`;
      const pathname = new URL(req.url, origin).pathname;
      const isAllowedOrigin = !req.headers.origin || req.headers.origin === origin || req.headers.origin === 'null' || req.headers.origin === `http://localhost:${server.address().port}`;
      if (req.headers.host !== new URL(origin).host || (pathname.startsWith('/api/') && (
        !isAllowedOrigin || (req.headers['sec-fetch-site'] === 'cross-site' && req.headers.origin !== 'null')
      ))) return json(res, 403, { error: 'Open the editor on this computer to continue.' });
      if (pathname === '/api/editor' && req.method === 'GET') {
        return json(res, 200, { app: 'divergency-editor', root, token });
      }
      if (pathname === '/api/images') {
        if (req.headers['x-editor-token'] !== token) return json(res, 403, { error: 'Your editing session expired. Download your draft and reopen the page.' });
        if (req.method === 'GET') return json(res, 200, { images: listImages(root) });
        if (req.method !== 'POST') return json(res, 405, { error: 'Method not supported.' });
        if (Number(req.headers['content-length']) > MAX_IMAGE_BYTES) return json(res, 413, { error: 'Each image must be 20 MB or smaller.' });
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > MAX_IMAGE_BYTES) return json(res, 413, { error: 'Each image must be 20 MB or smaller.' });
          chunks.push(chunk);
        }
        let name;
        try { name = decodeURIComponent(req.headers['x-image-name'] || 'anh'); }
        catch { return json(res, 400, { error: 'Invalid image name.' }); }
        return json(res, 201, { image: saveImage(root, name, Buffer.concat(chunks)) });
      }
      if (pathname === '/api/gameplay') {
        if (req.headers['x-editor-token'] !== token) return json(res, 403, { error: 'Your editing session expired. Download your draft and reopen the page.' });
        if (req.method === 'GET') return json(res, 200, store.read());
        if (req.method !== 'PUT') return json(res, 405, { error: 'Method not supported.' });
        if (!req.headers['content-type']?.startsWith('application/json')) return json(res, 415, { error: 'JSON content is required.' });
        let size = 0;
        const chunks = [];
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 6_000_000) return json(res, 413, { error: 'Content is too large. Changes were not saved.' });
          chunks.push(chunk);
        }
        let body;
        try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
        catch { return json(res, 400, { error: 'Invalid content.' }); }
        return json(res, 200, store.save(body || {}));
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not supported.' });
      if (await serveLocalImage(req, res, root)) return;
      let relative;
      if (pathname === '/') {
        relative = existsSync(path.join(root, 'Divergency_Reviewer_Local.html')) ? 'Divergency_Reviewer_Local.html' : 'Divergency_Reviewer_Tabs.html';
      } else {
        relative = decodeURIComponent(pathname.slice(1));
      }
      if (!publicFiles.has(relative) && !relative.startsWith('imgs/')) return json(res, 404, { error: 'Not found.' });
      const file = path.resolve(root, relative);
      const assetRoot = path.resolve(root, 'imgs') + path.sep;
      if (relative.startsWith('imgs/') && (!file.startsWith(assetRoot) || !realpathSync(file).startsWith(realpathSync(path.join(root, 'imgs')) + path.sep))) {
        return json(res, 403, { error: 'Invalid path.' });
      }
      if (!statSync(file).isFile()) return json(res, 404, { error: 'Not found.' });
      res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
      if (req.method === 'HEAD') return res.end();
      createReadStream(file).on('error', () => res.destroy()).pipe(res);
    } catch (error) {
      if (!res.headersSent) json(res, error.status || (error.code === 'ENOENT' ? 404 : 500), {
        error: error.status ? error.message : 'Could not read or save the document. Keep your draft and check the local editor.',
      });
      else res.destroy();
    }
  });
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildReviewer({ local: true });
  const port = Number(process.env.DIVERGENCY_EDITOR_PORT || 4177);
  const server = createEditorServer();
  server.on('error', error => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Divergency editor server is already running on http://127.0.0.1:${port}/?local=1#gameplay`);
      return;
    }
    console.error(`Editor could not start: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => console.log(`Divergency editor: http://127.0.0.1:${port}/?local=1#gameplay`));
}
