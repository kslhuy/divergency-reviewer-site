// A small, reproducible Sites source checkout. Original artwork stays on GitHub Pages.
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const target=path.resolve(root,'.editor-runtime/site-source');
if(!target.startsWith(root+path.sep))throw new Error('Source checkout must stay in workspace');
mkdirSync(target,{recursive:true});
for(const name of readdirSync(root)) {
  if (/\.(md|html)$/.test(name) || ['build-reviewer-html.mjs','package.json','package-lock.json','vite.config.mjs','drizzle.config.ts','.gitignore','.env.example'].includes(name))
    cpSync(path.join(root,name),path.join(target,name));
}
for(const name of ['.openai','scripts','src','styles','content','online','db','drizzle','tests'])
  cpSync(path.join(root,name),path.join(target,name),{recursive:true});
console.log('Sites source prepared in '+target);
