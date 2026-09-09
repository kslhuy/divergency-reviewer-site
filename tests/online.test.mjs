import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { prepareGameplay } from '../scripts/web-content.mjs';

// Exercise the actual Worker handler and SQL against SQLite, with only build-time assets injected.
const source = readFileSync(new URL('../online/worker.mjs', import.meta.url),'utf8')
  .replace(/^import .*;\r?\n/gm,'');
const makeWorker = new Function('prepareGameplay','page','initialHTML','library',
  source.replaceAll('export function ','function ').replace('export default {','return {'));
function setup() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../drizzle/0000_aberrant_famine.sql',import.meta.url),'utf8'));
  const prepare = sql => ({bind(...args){return statement(sql,args);},...statement(sql,[])});
  const statement = (sql,args) => ({
    bind(...values){return statement(sql,values);},
    async first(){return sqlite.prepare(sql).get(...args)||null;},
    async all(){return {results:sqlite.prepare(sql).all(...args)};},
    async run(){const r=sqlite.prepare(sql).run(...args);return {meta:{changes:Number(r.changes)}};},
  });
  const DB={prepare,async batch(statements){sqlite.exec('BEGIN');try{const rows=[];for(const s of statements)rows.push(await s.run());sqlite.exec('COMMIT');return rows;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
  const objects=new Map();
  const UPLOADS={async put(key,bytes,metadata){objects.set(key,{bytes,metadata});},async get(key){const o=objects.get(key);return o?{body:o.bytes,writeHttpMetadata(h){h.set('Content-Type',o.metadata.httpMetadata.contentType);}}:null;}};
  const worker=makeWorker(prepareGameplay,'<h1>reader</h1>','<h1>Initial</h1>',[]);
  const env={DB,UPLOADS,ADMIN_EMAIL:'owner@example.test'};
  const request=async(path,method='GET',data,user=null,extra={})=>{
    const headers={'Content-Type':'application/json','Origin':'https://site.test','X-Editor-Token':'same-origin',...extra};
    if(user){headers['oai-authenticated-user-id']=user.id;headers['oai-authenticated-user-email']=user.email;}
    return worker.fetch(new Request('https://site.test'+path,{method,headers,body:data===undefined||data===null?undefined:JSON.stringify(data)}),env);
  };
  return {request,worker,env,sqlite,objects};
}
const owner={id:'owner-id',email:'owner@example.test'};
const editor={id:'editor-id',email:'writer@example.test'};
test('online access: anonymous read, verified owner bootstrap, pending approval, and revocation',async()=>{
  const {request,sqlite}=setup();
  assert.equal((await request('/api/gameplay')).status,200);
  assert.equal((await request('/api/gameplay','PUT',{revision:0,html:'<h1>X</h1>'})).status,401);
  assert.equal((await request('/api/history')).status,401);
  const anonymous=await (await request('/api/editor')).json();assert.equal(anonymous.canEdit,false);
  const admin=await (await request('/api/editor','GET',null,owner)).json();assert.equal(admin.role,'admin');
  assert.equal((await request('/api/access','POST',{},editor)).status,200);
  assert.equal((await request('/api/gameplay','PUT',{revision:0,html:'<h1>X</h1>'},editor)).status,403);
  assert.equal((await request('/api/members','PUT',{userId:editor.id,role:'editor'},editor)).status,403);
  assert.equal((await request('/api/members','PUT',{userId:editor.id,role:'editor'},owner)).status,200);
  assert.equal((await request('/api/gameplay','PUT',{revision:0,html:'<h1>X</h1>'},editor)).status,200);
  await request('/api/members','PUT',{userId:editor.id,role:'revoked'},owner);
  assert.equal((await request('/api/gameplay','PUT',{revision:1,html:'<h1>Y</h1>'},editor)).status,403);
  assert.equal((await request('/api/members','PUT',{userId:owner.id,role:'revoked'},owner)).status,400);
  assert.equal((await request('/api/gameplay','PUT',{revision:1,html:'<h1>Y</h1>'},owner,{Origin:'https://evil.test'})).status,403);
  sqlite.close();
});
test('online saves preserve history, reject stale edits, sanitize HTML, and survive new code seeds',async()=>{
  const {request,sqlite,env}=setup();
  const a=await request('/api/gameplay','PUT',{revision:0,html:'<h1>Team</h1><script>alert(1)</script><img src="imgs/online/a.png" onerror="alert(2)">'},owner);
  assert.equal(a.status,200);
  assert.equal((await request('/api/gameplay','PUT',{revision:0,html:'<h1>Stale</h1>'},owner)).status,409);
  const current=await (await request('/api/gameplay')).json();
  assert.equal(current.revision,1);assert.match(current.html,/Team/);assert.doesNotMatch(current.html,/script|onerror|Stale/);assert.equal(current.savedBy,undefined);
  const history=await (await request('/api/history','GET',null,owner)).json();assert.deepEqual(history.revisions.map(r=>r.revision),[1,0]);
  const nextBuild=makeWorker(prepareGameplay,'new code','<h1>OLD LOCAL FILE</h1>',[]);
  const afterDeploy=await (await nextBuild.fetch(new Request('https://site.test/api/gameplay'),env)).json();
  assert.equal(afterDeploy.html,current.html);
  const restored=await (await request('/api/history?revision=0','GET',null,owner)).json();
  assert.equal((await request('/api/gameplay','PUT',{revision:1,html:restored.html},owner)).status,200);
  assert.equal((await (await request('/api/gameplay')).json()).revision,2);
  sqlite.close();
});
test('online uploads require permission and validate bytes, persist into shared library',async()=>{
  const {request,worker,env,sqlite,objects}=setup();
  await request('/api/editor','GET',null,owner);
  const headers={'Origin':'https://site.test','X-Editor-Token':'same-origin','X-Image-Name':encodeURIComponent('Team image.png'),'oai-authenticated-user-id':owner.id,'oai-authenticated-user-email':owner.email};
  const bad=await worker.fetch(new Request('https://site.test/api/images',{method:'POST',headers,body:'<script>bad</script>'}),env);assert.equal(bad.status,400);
  const png=Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg==','base64'));
  const uploaded=await worker.fetch(new Request('https://site.test/api/images',{method:'POST',headers,body:png}),env);assert.equal(uploaded.status,201);
  const {image}=await uploaded.json();assert.match(image.src,/^imgs\/online\/[a-f0-9]{64}\.png$/);assert.equal(objects.size,1);
  const library=await (await request('/api/images','GET',null,owner)).json();assert.equal(library.images[0].src,image.src);
  const served=await request('/'+image.src);assert.equal(served.headers.get('Content-Type'),'image/png');assert.deepEqual(new Uint8Array(await served.arrayBuffer()),png);
  sqlite.close();
});
