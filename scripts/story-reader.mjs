import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspace = fileURLToPath(new URL('../', import.meta.url));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

// The standalone reader is derived from the same chapters as the local reviewer.
// It deliberately has no separately maintained narrative copy.
export function renderStoryReader(root = workspace) {
  const directory = path.join(root, 'content', 'story');
  const chapters = JSON.parse(readFileSync(path.join(directory, 'index.json'), 'utf8'))
    .filter(({ file }) => /^(10|11|12)-/.test(file))
    .map(item => {
      const html = readFileSync(path.join(directory, item.file), 'utf8')
        .replace(/<a\b[^>]*class="heading-link"[^>]*>[\s\S]*?<\/a>/g, '')
        .replace(/src="imgs\//g, 'src="../imgs/');
      const id = html.match(/<h2\b[^>]*id="([^"]+)"/)?.[1];
      if (!id) throw new Error(`Story chapter has no heading anchor: ${item.file}`);
      return { ...item, html, id };
    });
  if (chapters.length !== 3) throw new Error('Expected exactly the three canonical story chapters 3–5');
  const navigation = chapters.map((chapter, index) => `<a href="#${escape(chapter.id)}">Chương ${index + 3}</a>`).join('');
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Divergency — Cốt truyện Chương 3–5</title><style>
:root{color-scheme:dark;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#111820;color:#e9edf0}*{box-sizing:border-box}body{margin:0}main{max-width:960px;margin:auto;padding:38px 28px 90px}h1{font-size:clamp(30px,5vw,50px);line-height:1.2}h2{font-size:30px;border-top:1px solid #49616e;margin:70px 0 25px;padding-top:32px;scroll-margin-top:80px}h3{font-size:22px;margin-top:36px;scroll-margin-top:80px}p,li{font-size:18px;line-height:1.85}strong{color:#fff0cd}nav{position:sticky;top:0;display:flex;gap:24px;background:#111820f5;padding:16px 0;border-bottom:1px solid #344752;z-index:2}a{color:#aedbd4;text-underline-offset:4px}figure{margin:28px 0}img{display:block;max-width:100%;height:auto;border:1px solid #344752}figcaption,footer,.eyebrow{font-size:14px;line-height:1.7;color:#b7c4ca}blockquote{border-left:3px solid #c6a477;margin:24px 0;padding:2px 22px;background:#1d272f}footer{border-top:1px solid #344752;margin-top:50px;padding-top:22px}@media(max-width:600px){main{padding:22px 18px 60px}p,li{font-size:17px}h2{font-size:26px}}@media print{:root{color-scheme:light;background:#fff;color:#111}strong,a{color:#111}nav{position:static}h2{break-before:page}figure{break-inside:avoid}blockquote{background:#eee}}
</style></head><body><main>
<header><p class="eyebrow">DIVERGENCY · BẢN TRUYỆN ĐỒNG BỘ · 20/10/2026</p><h1>Từ Calvaria tới Chiếc Nôi</h1></header>
<nav aria-label="Chọn chương">${navigation}</nav>
<article id="chat-narrative">${chapters.map(chapter => chapter.html).join('\n')}</article>
<footer>Bản đọc này được dựng trực tiếp từ các chương trong mục Complete Story. Gameplay, khởi nguồn và bản tóm tắt dùng cùng quy ước chiến dịch ngày 20/10/2026.</footer>
</main></body></html>\n`;
}

export function writeStoryReader(root = workspace) {
  const target = path.join(root, 'artifacts', 'chapters3-5_story.html');
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, renderStoryReader(root), 'utf8');
  return target;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(`Wrote ${writeStoryReader()}`);
}
