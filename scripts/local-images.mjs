import path from 'node:path';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';

const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

// Shared by the offline editor and Vite: local artwork must never redirect to Pages.
export async function serveLocalImage(req, res, root) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (!pathname.startsWith('/imgs/')) return false;
  const finish = status => { res.writeHead(status); res.end(); return true; };
  if (!['GET', 'HEAD'].includes(req.method)) return finish(405);
  let relative;
  try { relative = decodeURIComponent(pathname.slice(1)); }
  catch { return finish(400); }
  const base = path.resolve(root, 'imgs');
  const file = path.resolve(root, relative);
  if (!file.startsWith(base + path.sep)) return finish(403);
  if (!Object.hasOwn(types, path.extname(file).toLowerCase())) return finish(404);
  try {
    const [actualBase, actualFile] = await Promise.all([realpath(base), realpath(file)]);
    if (!actualFile.startsWith(actualBase + path.sep)) return finish(403);
    const info = await stat(actualFile);
    if (!info.isFile()) return finish(404);
    const etag = `W/"${info.size.toString(16)}-${info.mtimeMs.toString(16)}"`;
    res.setHeader('Content-Type', types[path.extname(file).toLowerCase()]);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('ETag', etag);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.headers['if-none-match']?.split(',').map(value => value.trim()).includes(etag)) return finish(304);
    res.setHeader('Content-Length', info.size);
    res.writeHead(200);
    if (req.method === 'HEAD') res.end();
    else {
      const stream = createReadStream(actualFile);
      res.on('close', () => stream.destroy());
      stream.on('error', () => res.destroy()).pipe(res);
    }
    return true;
  } catch (error) {
    if (['ENOENT', 'ENOTDIR'].includes(error.code)) return finish(404);
    throw error;
  }
}

export function localImages() {
  return {
    name: 'divergency-local-images',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Uploaded online images belong to the local Worker's R2 binding.
        if (new URL(req.url, 'http://localhost').pathname.startsWith('/imgs/online/')) return next();
        serveLocalImage(req, res, server.config.root).then(handled => { if (!handled) next(); }, next);
      });
    },
  };
}
