import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseFragment } from 'parse5';
import { splitChapters, writeContent, readContent } from '../scripts/chapter-content.mjs';
import { createContentStore } from '../scripts/editor-server.mjs';
const context = vm.createContext({ URL });
vm.runInContext(readFileSync(new URL('../scripts/markdown-export.js', import.meta.url), 'utf8'), context);
const markdown = html => context.DivergencyMarkdown.toMarkdown(parseFragment(html));

test('HTML chapters preserve all original bytes and rebuild in manifest order', () => {
  const html = ' \n<h1>Đầu</h1>\n<p>Mở đầu</p><h2>Chương 1</h2><p>Một</p><h3>Cảnh</h3><p>Hai</p><h2>Chương 2</h2><p>Ba</p>\n';
  const chapters = splitChapters(html);
  assert.equal(chapters.length, 3);
  assert.equal(chapters.map(chapter => chapter.html).join(''), html);
  const root = mkdtempSync(path.join(os.tmpdir(), 'divergency-chapters-'));
  try {
    writeContent(root, 'gameplay', html);
    assert.equal(readContent(root, 'gameplay'), html);
    const store = createContentStore(root, value => '<article>' + value + '</article>');
    const before = store.read();
    store.save({ revision: before.revision, html: '<h1>Đầu mới</h1><h2>Chương mới</h2><p>Đã lưu</p>' });
    assert.match(readContent(root, 'gameplay'), /Đã lưu/);
    assert.throws(() => store.save({ revision: before.revision, html: '<h1>Ghi đè</h1>' }), { status: 409 });
    assert.equal(readFileSync(path.join(root, '.editor-backups', readdirSync(path.join(root, '.editor-backups'))[0]), 'utf8'), html);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('Markdown export preserves Vietnamese, hierarchy, links, images, tables and nested lists', () => {
  const result = markdown('<h2><a class="heading-link" href="#a">#</a>Chương Một</h2><p><strong>Đậm</strong> và <em>nghiêng</em>: <a href="https://example.com">Link</a></p><ul><li>Cha<ul><li>Con</li></ul></li></ul><ol start="3"><li>Ba</li></ol><figure><img src="imgs/my image.png" alt="Ảnh"><figcaption>Chú thích</figcaption></figure><table><tr><th>Tên</th><th>Giá</th></tr><tr><td>A | B</td><td>10<br>20</td></tr></table>');
  assert.match(result, /^## Chương Một/);
  assert.match(result, /\*\*Đậm\*\* và \*nghiêng\*/);
  assert.match(result, /\[Link\]\(https:\/\/example.com\/\)/);
  assert.match(result, /- Cha\n\n  - Con/);
  assert.match(result, /3\. Ba/);
  assert.match(result, /!\[Ảnh\]\(https:\/\/kslhuy.github.io\/divergency-reviewer-site\/imgs\/my%20image.png\)/);
  assert.match(result, /Chú thích/);
  assert.match(result, /\| --- \| --- \|/);
  assert.ok(result.includes('A \\| B'));
  assert.ok(!result.includes('heading-link'));
});

test('Markdown keeps code, quotes, online image origins and removes presentation overlays', () => {
  const result = markdown('<blockquote><p>Nội dung</p></blockquote><pre><code>  a * b\n```\n  c</code></pre><p><code>a`b</code></p><figure><img src="imgs/online/abc.png" alt="Ảnh online"><svg><text>Overlay</text></svg><span class="stage-marker">1</span></figure>');
  assert.match(result, /> Nội dung/);
  assert.ok(result.includes('````\n  a * b\n```\n  c\n````'));
  assert.ok(result.includes('``a`b``'));
  assert.match(result, /https:\/\/divergency-team-editor.huyq1471.chatgpt.site\/imgs\/online\/abc.png/);
  assert.ok(!result.includes('Overlay'));
  assert.ok(markdown('<pre><code>  a\n\n\n  b</code></pre>').includes('  a\n\n\n  b'));
});
