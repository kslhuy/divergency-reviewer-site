import page from '../Divergency_Reviewer_Tabs.html?raw';
import initialHTML from './generated/gameplay.html?raw';
import assets from './generated/assets.json';
import library from './generated/images.json';
import { prepareGameplay } from '../scripts/web-content.mjs';

const publicOrigin = 'https://kslhuy.github.io';
const imageOrigin = publicOrigin + '/divergency-reviewer-site/';
const json = (status, data, cors = false) => new Response(JSON.stringify(data), { status, headers: {
  'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff', ...(cors ? { 'Access-Control-Allow-Origin': publicOrigin } : {}),
} });
const fail = (status, message) => Object.assign(new Error(message), { status });
export function identity(request) {
  const id = request.headers.get('oai-authenticated-user-id');
  const email = request.headers.get('oai-authenticated-user-email');
  return id && email ? { id, email } : null;
}
export function sameOrigin(request) {
  return request.headers.get('Origin') === new URL(request.url).origin
    && request.headers.get('Sec-Fetch-Site') !== 'cross-site';
}
async function body(request, max = 6_000_000) {
  if (Number(request.headers.get('Content-Length')) > max) throw fail(413, 'Content is too large.');
  const reader = request.body?.getReader();
  if (!reader) throw fail(400, 'Content is missing.');
  let size = 0; const chunks = [];
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > max) { await reader.cancel(); throw fail(413, 'Content is too large.'); }
    chunks.push(value);
  }
  const output = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length; }
  return output;
}
async function jsonBody(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) throw fail(415, 'JSON content is required.');
  try { return JSON.parse(new TextDecoder().decode(await body(request))); }
  catch (e) { if(e.status) throw e; throw fail(400, 'Invalid content.'); }
}
export function contentStore(db, seed = initialHTML) {
  return {
    async read() {
      const current = await db.prepare('SELECT html, revision, saved_at AS savedAt, saved_by AS savedBy FROM documents WHERE id = ?').bind('gameplay').first()
        || { html: seed, revision: 0, savedAt: null, savedBy: 'Bản nhập ban đầu' };
      return { ...current, html: prepareGameplay(current.html).html };
    },
    async save(input, user) {
      if (typeof input.html !== 'string' || !input.html.trim() || input.html.length > 3_000_000 || !Number.isSafeInteger(input.revision) || input.revision < 0)
        throw fail(400, 'Invalid content or version.');
      const prepared = prepareGameplay(input.html);
      if (!prepared.toc.length) throw fail(400, 'Keep at least one heading in the document.');
      const at = new Date().toISOString();
      // One atomic transaction: compare-and-swap and record exactly that saved revision.
      const result = await db.batch([
        db.prepare('INSERT OR IGNORE INTO documents (id, html, revision, saved_at, saved_by) VALUES (?, ?, 0, ?, ?)').bind('gameplay', seed, at, 'Bản nhập ban đầu'),
        db.prepare('INSERT OR IGNORE INTO revisions (revision, html, saved_at, saved_by) SELECT revision, html, saved_at, saved_by FROM documents WHERE id = ?').bind('gameplay'),
        db.prepare('UPDATE documents SET html = ?, revision = revision + 1, saved_at = ?, saved_by = ? WHERE id = ? AND revision = ?').bind(prepared.html, at, user.email, 'gameplay', input.revision),
        db.prepare('INSERT OR IGNORE INTO revisions (revision, html, saved_at, saved_by) SELECT revision, html, saved_at, saved_by FROM documents WHERE id = ?').bind('gameplay'),
      ]);
      if (result[2].meta.changes !== 1) throw fail(409, 'A team member saved a new version. Your draft is safe. Download it and reload to compare; the team version was not overwritten.');
      return { revision: input.revision + 1, savedAt: at, savedBy: user.email };
    },
  };
}
async function member(db, user, env) {
  if (!user) return null;
  if (env.ADMIN_EMAIL && user.email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase()) {
    // Pin bootstrap ownership to the verified, site-scoped subject once, never first visitor wins.
    await db.prepare("INSERT INTO members (user_id, email, role, joined_at) SELECT ?, ?, 'admin', ? WHERE NOT EXISTS (SELECT 1 FROM members WHERE role = 'admin') ON CONFLICT(user_id) DO NOTHING")
      .bind(user.id, user.email, new Date().toISOString()).run();
  }
  return await db.prepare('SELECT user_id AS userId, email, role FROM members WHERE user_id = ?').bind(user.id).first();
}
export function imageType(bytes) {
  const ascii = (a,b) => String.fromCharCode(...bytes.slice(a,b));
  if (bytes.length >= 24 && [137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n) && ascii(12,16)==='IHDR') return ['png','image/png'];
  if (bytes.length >= 4 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255 && bytes.at(-2)===255 && bytes.at(-1)===217) return ['jpg','image/jpeg'];
  if (bytes.length >= 14 && ['GIF87a','GIF89a'].includes(ascii(0,6))) return ['gif','image/gif'];
  if (bytes.length >= 20 && ascii(0,4)==='RIFF' && ascii(8,12)==='WEBP') return ['webp','image/webp'];
  throw fail(400, 'Choose a valid PNG, JPG, GIF or WebP image.');
}
async function handle(request, env) {
  const url = new URL(request.url); const route = url.pathname;
  if (Object.hasOwn(assets, route) && ['GET', 'HEAD'].includes(request.method)) {
    return new Response(request.method === 'HEAD' ? null : assets[route], { headers: {
      'Content-Type': route.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/javascript; charset=utf-8',
      'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff',
    } });
  }
  if (route === '/api/gameplay' && request.method === 'GET') {
    const { savedBy, ...content } = await contentStore(env.DB).read();
    return json(200, content, true);
  }
  if (route.startsWith('/imgs/online/')) {
    if (!['GET','HEAD'].includes(request.method)) return json(405, {error:'Method not supported.'});
    const key = route.slice('/imgs/online/'.length);
    if (!/^[a-f0-9]{64}\.(png|jpg|gif|webp)$/.test(key)) return json(404,{error:'Image not found.'});
    const object = await env.UPLOADS.get(key);
    if (!object) return json(404,{error:'Image not found.'});
    const headers = new Headers(); object.writeHttpMetadata(headers);
    headers.set('Cache-Control','public, max-age=31536000, immutable'); headers.set('X-Content-Type-Options','nosniff');
    return new Response(request.method === 'HEAD' ? null : object.body, {headers});
  }
  if (route.startsWith('/imgs/')) return Response.redirect(new URL(route.slice(1), imageOrigin).href, 302);
  if (route.startsWith('/api/')) {
    const user = identity(request);
    const access = await member(env.DB, user, env);
    const canEdit = ['admin','editor'].includes(access?.role);
    if (route === '/api/editor' && request.method === 'GET') return json(200, {
      app:'divergency-editor', online:true, root:'divergency-online', token:'same-origin',
      user, role:access?.role || 'visitor', canEdit,
    });
    if (!user) return json(401,{error:'Sign in with ChatGPT to edit.'});
    if (!['GET','HEAD'].includes(request.method) && (!sameOrigin(request) || request.headers.get('X-Editor-Token') !== 'same-origin'))
      return json(403,{error:'Open the editor to continue.'});
    if (route === '/api/access' && request.method === 'POST') {
      await env.DB.prepare("INSERT INTO members (user_id, email, role, joined_at) VALUES (?, ?, 'pending', ?) ON CONFLICT(user_id) DO UPDATE SET role = 'pending', email = excluded.email WHERE members.role = 'revoked'")
        .bind(user.id,user.email,new Date().toISOString()).run();
      return json(200,{ok:true});
    }
    if (!canEdit) return json(403,{error:'You do not have editing access yet. Request access from an administrator.'});
    if (route === '/api/gameplay' && request.method === 'PUT') return json(200, await contentStore(env.DB).save(await jsonBody(request),user));
    if (route === '/api/history' && request.method === 'GET') {
      const revision = url.searchParams.get('revision');
      if (revision !== null) {
        if (!/^\d+$/.test(revision)) throw fail(400,'Invalid version.');
        const record = await env.DB.prepare('SELECT html, revision, saved_at AS savedAt, saved_by AS savedBy FROM revisions WHERE revision = ?').bind(Number(revision)).first();
        if (!record) throw fail(404,'Version not found.');
        return json(200,record);
      }
      const rows = await env.DB.prepare('SELECT revision, saved_at AS savedAt, saved_by AS savedBy FROM revisions ORDER BY revision DESC LIMIT 100').all();
      return json(200,{revisions:rows.results});
    }
    if (route === '/api/members') {
      if (access.role !== 'admin') throw fail(403,'Only administrators can manage members.');
      if (request.method === 'GET') return json(200,{members:(await env.DB.prepare('SELECT user_id AS userId, email, role FROM members ORDER BY joined_at DESC').all()).results});
      if (request.method === 'PUT') {
        const input = await jsonBody(request);
        if (typeof input.userId !== 'string' || !['editor','revoked'].includes(input.role)) throw fail(400,'Invalid role.');
        const changed = await env.DB.prepare("UPDATE members SET role = ? WHERE user_id = ? AND role != 'admin'").bind(input.role,input.userId).run();
        if (!changed.meta.changes) throw fail(400,'Cannot change an administrator or an account without an access request.');
        return json(200,{ok:true});
      }
    }
    if (route === '/api/images') {
      if (request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT key, name, bytes FROM images ORDER BY uploaded_at DESC').all();
        return json(200,{images:[...rows.results.map(i=>({src:'imgs/online/'+i.key,name:i.name,bytes:i.bytes,folder:'uploads'})),...library]});
      }
      if (request.method === 'POST') {
        const bytes = await body(request,20*1024*1024); const [ext,type] = imageType(bytes);
        const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(n=>n.toString(16).padStart(2,'0')).join('');
        const key = hash+'.'+ext;
        let name; try {name=decodeURIComponent(request.headers.get('X-Image-Name')||'Image');} catch {throw fail(400,'Invalid image name.');}
        name = name.replaceAll('\\','/').split('/').at(-1).slice(0,200);
        await env.UPLOADS.put(key,bytes,{httpMetadata:{contentType:type}});
        await env.DB.prepare('INSERT OR IGNORE INTO images (key,name,bytes,type,uploaded_by,uploaded_at) VALUES (?,?,?,?,?,?)').bind(key,name,bytes.length,type,user.id,new Date().toISOString()).run();
        return json(201,{image:{src:'imgs/online/'+key,name,bytes:bytes.length,folder:'uploads'}});
      }
    }
    return json(404,{error:'Action not found.'});
  }
  if (['/','/Divergency_Reviewer_Tabs.html'].includes(route) && ['GET','HEAD'].includes(request.method)) {
    const current = request.method === 'HEAD' ? null : await contentStore(env.DB).read();
    const rendered = current && page.replace(/(<article\b[^>]*data-search-root="gameplay"[^>]*>)[\s\S]*?(<\/article>)/, (_,open,close) => open + current.html + close);
    return new Response(rendered,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  }
  if (['/steam-image-tool.html','/rewards-card-poster.html'].includes(route)) return Response.redirect(imageOrigin+route.slice(1),302);
  return json(404,{error:'Page not found.'});
}
export default { async fetch(request,env) {
  try { return await handle(request,env); }
  catch(e) { return json(e.status||500,{error:e.status?e.message:'Could not connect to saved data. Keep your draft and try again.'}); }
} };
