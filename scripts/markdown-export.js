(function () {
  const tag = node => (node.tagName || '').toLowerCase();
  const children = node => Array.from(node.childNodes || []);
  const attr = (node, name) => node.getAttribute?.(name) ?? node.attrs?.find(item => item.name === name)?.value ?? '';
  const text = node => node.nodeType === 3 || node.nodeName === '#text' ? (node.nodeValue ?? node.value) : children(node).map(text).join('');
  const escape = value => value.replace(/([\\`*_[\]<>])/g, '\\$1').replace(/(^|\n)(\s*)([#>+-]|\d+\.)/g, '$1$2\\$3');
  const block = value => '\n\n' + value.trim() + '\n\n';
  function toMarkdown(root, base = 'https://kslhuy.github.io/divergency-reviewer-site/') {
    const verbatim = [];
    const protect = value => { const token = '\u0000MD' + verbatim.length + '\u0000'; verbatim.push(value); return token; };
    function url(value) {
      if (!value) return '';
      if (value.startsWith('imgs/online/')) return 'https://divergency-team-editor.huyq1471.chatgpt.site/' + value;
      try { return new URL(value, base).href.replaceAll('(', '%28').replaceAll(')', '%29'); }
      catch { return value.replaceAll(' ', '%20'); }
    }
    function render(node) {
      if (node.nodeType === 3 || node.nodeName === '#text') return escape(text(node).replace(/\s+/g, ' '));
      const name = tag(node);
      if (['script', 'style', 'svg', 'button'].includes(name) || attr(node, 'aria-hidden') === 'true' || /\b(heading-link|stage-marker)\b/.test(attr(node, 'class'))) return '';
      const inner = () => children(node).map(render).join('');
      if (/^h[1-6]$/.test(name)) return block('#'.repeat(Number(name[1])) + ' ' + inner().trim());
      if (['strong', 'b'].includes(name)) return '**' + inner().trim() + '**';
      if (['em', 'i'].includes(name)) return '*' + inner().trim() + '*';
      if (['s', 'del'].includes(name)) return '~~' + inner().trim() + '~~';
      if (name === 'br') return '  \n';
      if (name === 'hr') return block('---');
      if (name === 'img') return '![' + escape(attr(node, 'alt')) + '](' + url(attr(node, 'src')) + ')';
      if (name === 'a') return attr(node, 'href') ? '[' + inner().trim() + '](' + url(attr(node, 'href')) + ')' : inner();
      if (name === 'pre') {
        const value = text(node).replace(/\n$/, '');
        const fence = '`'.repeat(Math.max(3, ...Array.from(value.matchAll(/`+/g), match => match[0].length + 1)));
        return block(protect(fence + '\n' + value + '\n' + fence));
      }
      if (name === 'code') {
        const value = text(node);
        const fence = '`'.repeat(Math.max(1, ...Array.from(value.matchAll(/`+/g), match => match[0].length + 1)));
        return fence + (/^`|`$/.test(value) ? ' ' + value + ' ' : value) + fence;
      }
      if (name === 'blockquote') return block(inner().trim().split('\n').map(line => '> ' + line).join('\n'));
      if (name === 'ul' || name === 'ol') {
        let number = Number(attr(node, 'start')) || 1;
        return block(children(node).filter(child => tag(child) === 'li').map(item => {
          const prefix = name === 'ol' ? number++ + '. ' : '- ';
          const value = children(item).map(render).join('').trim();
          return prefix + value.replace(/\n/g, '\n' + ' '.repeat(prefix.length));
        }).join('\n'));
      }
      if (name === 'table') {
        // Markdown cannot represent merged cells; retain their HTML table.
        if (node.querySelector?.('[rowspan], [colspan]')) {
          const clone = node.cloneNode(true);
          clone.querySelectorAll('img[src]').forEach(image => image.setAttribute('src', url(image.getAttribute('src'))));
          clone.querySelectorAll('a[href]').forEach(link => link.setAttribute('href', url(link.getAttribute('href'))));
          return block(protect(clone.outerHTML));
        }
        const rows = [];
        function visit(parent) {
          for (const child of children(parent)) {
            if (tag(child) === 'tr') rows.push(children(child).filter(cell => ['th', 'td'].includes(tag(cell))));
            else if (['thead', 'tbody', 'tfoot'].includes(tag(child))) visit(child);
          }
        }
        visit(node);
        if (!rows.length) return '';
        const width = Math.max(...rows.map(row => row.length));
        const lines = rows.map(row => '| ' + Array.from({ length: width }, (_, index) => row[index] ? children(row[index]).map(render).join('').trim().replace(/\n+/g, '<br>').replace(/\|/g, '\\|') : '').join(' | ') + ' |');
        if (!rows[0].some(cell => tag(cell) === 'th')) lines.unshift('| ' + Array(width).fill('').join(' | ') + ' |');
        lines.splice(1, 0, '| ' + Array(width).fill('---').join(' | ') + ' |');
        return block(lines.join('\n'));
      }
      if (['p', 'div', 'section', 'article', 'figure', 'figcaption'].includes(name)) return block(inner());
      return inner();
    }
    return render(root).replace(/\n[ \t]+\n/g, '\n\n').replace(/\n{3,}/g, '\n\n').trim().replace(/\u0000MD(\d+)\u0000/g, (_, index) => verbatim[Number(index)]) + '\n';
  }
  globalThis.DivergencyMarkdown = { toMarkdown };
  if (typeof document === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'markdown-export-dialog';
  dialog.setAttribute('aria-labelledby', 'markdown-export-title');
  dialog.innerHTML = `<form method="dialog" class="markdown-export-header"><h2 id="markdown-export-title">Export Markdown</h2><button aria-label="Close" title="Close">×</button></form>
    <label>Document or section <select id="markdown-export-scope"></select></label>
    <p class="markdown-export-note">Includes the current text and unsaved edits. Images are exported as links.</p>
    <label>Markdown <textarea id="markdown-export-text" readonly spellcheck="false"></textarea></label>
    <div class="markdown-export-footer"><span role="status" aria-live="polite"></span><button type="button" data-copy-md>Copy MD</button><button type="button" data-download-md>Download .md</button></div>`;
  document.body.append(dialog);
  const scope = dialog.querySelector('select');
  const output = dialog.querySelector('textarea');
  const status = dialog.querySelector('[role="status"]');
  let article, pane, headings, opener;
  const headingText = heading => { const clone = heading.cloneNode(true); clone.querySelectorAll('.heading-link').forEach(link => link.remove()); return clone.textContent.trim(); };
  function refresh() {
    let root = article;
    if (scope.value !== 'all') {
      const index = Number(scope.value);
      const heading = headings[index];
      const level = Number(heading.tagName[1]);
      const end = headings.slice(index + 1).find(item => Number(item.tagName[1]) <= level);
      const range = document.createRange(); range.setStartBefore(heading);
      if (end) range.setEndBefore(end); else range.setEnd(article, article.childNodes.length);
      root = range.cloneContents();
    }
    const base = location.protocol === 'file:' ? 'https://kslhuy.github.io/divergency-reviewer-site/' : document.baseURI;
    output.value = toMarkdown(root, base);
    status.textContent = '';
  }
  function notify(message) {
    status.textContent = message;
    document.querySelector('.md-quick-status').textContent = message;
    if (document.body.classList.contains('is-editing')) {
      const editorStatus = document.querySelector('.editor-status');
      if (editorStatus) editorStatus.textContent = message;
    }
  }
  function prepare(button) {
    const doc = button.closest('[data-export-doc]')?.dataset.exportDoc;
    pane = doc ? document.getElementById('pane-' + doc) : document.querySelector('.doc-pane.is-active');
    article = pane?.querySelector('.markdown-body'); opener = button;
    if (!article) { notify('Choose a document tab to export.'); return false; }
    if (article.hidden || article.getAttribute('aria-busy') === 'true') {
      notify('The document is loading. Try again in a moment.'); return false;
    }
    headings = Array.from(article.querySelectorAll('h1,h2,h3,h4,h5,h6'));
    scope.replaceChildren(new Option('Whole document: ' + pane.querySelector('.doc-intro h2').textContent, 'all'));
    headings.forEach((heading, index) => scope.add(new Option('  '.repeat(Number(heading.tagName[1]) - 1) + headingText(heading), String(index))));
    refresh(); return true;
  }
  function preview() { if (!dialog.open) dialog.showModal(); scope.focus(); }
  async function copyMarkdown() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(output.value);
      notify('Markdown copied.');
    } catch {
      preview();
      output.focus(); output.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* Keep selected text available. */ }
      notify(copied ? 'Markdown copied.' : 'Press Ctrl+C / ⌘C to copy the selected Markdown.');
    }
  }
  function downloadMarkdown() {
    const suffix = scope.value === 'all' ? '' : '-' + headingText(headings[Number(scope.value)]).normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-zA-Z0-9]+/g, '-').slice(0, 90);
    const blobUrl = URL.createObjectURL(new Blob([output.value], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = blobUrl; link.download = 'Divergency-' + pane.dataset.doc + suffix + '.md';
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    notify('Markdown file downloaded.');
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-md-action]');
    if (!button || !prepare(button)) return;
    if (button.dataset.mdAction === 'copy') copyMarkdown();
    else if (button.dataset.mdAction === 'download') downloadMarkdown();
    else preview();
  });
  scope.addEventListener('change', refresh);
  dialog.addEventListener('close', () => opener?.focus());
  dialog.querySelector('[data-copy-md]').addEventListener('click', copyMarkdown);
  dialog.querySelector('[data-download-md]').addEventListener('click', downloadMarkdown);
  function updateAvailability() {
    const available = Boolean(document.querySelector('.doc-pane.is-active .markdown-body'));
    document.querySelectorAll('.export-quick-actions button').forEach(button => { button.disabled = !available; });
    document.querySelector('.md-quick-status').textContent = '';
  }
  const observer = new MutationObserver(updateAvailability);
  document.querySelectorAll('.doc-pane').forEach(item => observer.observe(item, { attributes: true, attributeFilter: ['class'] }));
  updateAvailability();
})();
