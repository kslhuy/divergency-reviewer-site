(() => {
  const article = document.querySelector('[data-search-root="gameplay"]');
  const start = document.getElementById('web-edit-start');
  const floatingStart = document.getElementById('web-edit-fab');
  const note = document.getElementById('web-edit-note');
  const onlineOrigin = 'https://divergency-team-editor.coral-glade-6347.chatgpt.site';
  const isLocalEditor = location.hostname === '127.0.0.1' && location.port === '4177';
  const isOnline = location.origin === onlineOrigin || (location.hostname === '127.0.0.1' && !isLocalEditor);
  const isPublishedReader = location.hostname === 'kslhuy.github.io';
  let loadError = '';
  if (!article || !start) return;
  const draftKey = 'divergency-gameplay-web-draft-v1';
  let session = null;
  let revision = '';
  let editing = false;
  let dirty = false;
  let saving = false;
  let savedRange = null;
  let draftTimer;
  let storageFailed = false;
  const bar = document.createElement('section');
  bar.className = 'editor-bar';
  bar.hidden = true;
  bar.setAttribute('aria-label', 'Biên tập gameplay');
  bar.innerHTML = `
    <div class="editor-bar-row" role="group" aria-label="Định dạng văn bản">
      <button type="button" data-command="undo" title="Hoàn tác (Ctrl+Z)">↶</button>
      <button type="button" data-command="redo" title="Làm lại (Ctrl+Y)">↷</button>
      <button type="button" data-command="bold" title="In đậm (Ctrl+B)"><b>B</b></button>
      <button type="button" data-command="italic" title="In nghiêng (Ctrl+I)"><i>I</i></button>
      <label>Kiểu <select id="editor-format"><option value="p">Đoạn văn</option><option value="h1">Tiêu đề chính</option><option value="h2">Tiêu đề 2</option><option value="h3">Tiêu đề 3</option><option value="h4">Tiêu đề 4</option><option value="blockquote">Trích dẫn</option></select></label>
      <button type="button" data-command="insertUnorderedList">• Danh sách</button>
      <button type="button" id="editor-add-row">+ Dòng bảng</button>
      <button type="button" id="editor-add-table">+ Bảng</button>
      <button type="button" id="editor-add-image">+ Chèn ảnh</button>
    </div>
    <div class="editor-bar-row">
      <span class="editor-status" role="status" aria-live="polite">Bấm vào nội dung để sửa. Ctrl+S để lưu.</span>
      <button type="button" id="editor-download">Tải bản nháp</button>
      <button type="button" id="editor-finish">Đóng biên tập</button>
      <button type="button" id="editor-save" class="editor-primary">Lưu vào dự án</button>
    </div>`;
  document.body.append(bar);
  const status = bar.querySelector('.editor-status');
  const saveButton = bar.querySelector('#editor-save');
  const finishButton = bar.querySelector('#editor-finish');
  const dialog = document.createElement('dialog');
  dialog.className = 'editor-dialog';
  document.body.append(dialog);
  function message(text, error = false) {
    status.textContent = text;
    status.classList.toggle('is-error', error);
  }
  function help() {
    if (isOnline) {
      onlineControls.access();
      return;
    }
    if (isPublishedReader) {
      location.href = onlineOrigin + '/?edit=1#gameplay';
      return;
    }
    dialog.innerHTML = '<h2>Chỉnh sửa trên máy của bạn</h2><p>Mở <strong>Open-Gameplay-Editor.cmd</strong> trong thư mục dự án. Trình duyệt sẽ mở trang biên tập; bấm <strong>Chỉnh sửa trực tiếp</strong> để bắt đầu.</p><p>Nút Lưu cập nhật dự án trên máy. Website online được cập nhật khi bạn xuất bản dự án.</p><form method="dialog"><button>Đã hiểu</button></form>';
    dialog.showModal();
  }
  const ready = (async () => {
    if (!isOnline && !isLocalEditor && !isPublishedReader) return;
    try {
      if (isOnline || isPublishedReader) {
        note.textContent = 'Đang tải nội dung đã lưu online…';
        const content = await fetch((isPublishedReader ? onlineOrigin : '') + '/api/gameplay', {signal:AbortSignal.timeout(20000)});
        if (!content.ok) throw new Error('Chưa tải được bản online. Trang đang hiển thị bản đi kèm giao diện; hãy tải lại.');
        const current = await content.json();
        article.innerHTML = current.html;
        if (isPublishedReader) article.querySelectorAll('img[src^="imgs/online/"]').forEach(img => img.src = onlineOrigin + '/' + img.getAttribute('src'));
        refreshIndex();
        const metrics = document.querySelectorAll('#pane-gameplay .doc-stats dd');
        if(metrics.length===3) {
          metrics[0].textContent = Math.max(1,Math.ceil(article.textContent.trim().split(/\s+/).length/220))+' min';
          metrics[1].textContent = article.querySelectorAll('h1,h2').length;
          metrics[2].textContent = article.querySelectorAll('table').length;
        }
        note.textContent = current.savedAt ? 'Bản online đã lưu lúc '+new Date(current.savedAt).toLocaleString('vi-VN') : 'Nội dung đã sẵn sàng để nhóm biên tập online.';
        if (isPublishedReader) return;
      }
      const response = await fetch('/api/editor', { signal: AbortSignal.timeout(10000) });
      const result = await response.json();
      if (response.ok && result.app === 'divergency-editor') {
        session = result;
        if (session.online) onlineControls.update();
        else note.textContent = 'Bản trên máy. Lưu ở đây không thay đổi nội dung online của nhóm.';
      }
    } catch (error) {
      loadError = error.message;
      if(isOnline || isPublishedReader) note.textContent = 'Không tải được bản online. Đang hiển thị bản đi kèm giao diện; hãy tải lại trang.';
    }
  })();
  const onlineControls = createOnlineControls({ getSession: () => session, note, bar, saveButton, dialog,
    restore: html => { article.innerHTML = html; editableState(true); refreshIndex(); changed(); },
    isEditing: () => editing, hasChanges: () => dirty,
  });
  async function request(method, data) {
    const response = await fetch('/api/gameplay', {
      method, headers: { 'Content-Type': 'application/json', 'X-Editor-Token': session.token },
      body: data ? JSON.stringify(data) : undefined,
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Không lưu được. Giữ bản nháp và thử lại.');
    return result;
  }
  function cleanHTML() {
    const copy = article.cloneNode(true);
    copy.querySelectorAll('.heading-link').forEach(node => node.remove());
    copy.querySelectorAll('*').forEach(node => {
      node.removeAttribute('contenteditable');
      node.removeAttribute('tabindex');
      node.removeAttribute('id');
      node.classList.remove('search-hit');
      if (!node.className) node.removeAttribute('class');
    });
    return copy.innerHTML;
  }
  function storeDraft() {
    clearTimeout(draftTimer);
    if (!editing || !dirty) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ root: session.root, revision, html: cleanHTML(), savedAt: Date.now() }));
      storageFailed = false;
    } catch {
      storageFailed = true;
      message('Không lưu được bản nháp tự động. Bấm Lưu vào dự án hoặc Tải bản nháp.', true);
    }
  }
  function refreshIndex() {
    const roots = [];
    const stack = [];
    const slugs = new Map();
    const headings = [...article.querySelectorAll('h1,h2,h3,h4,h5,h6')];
    for (const heading of headings) {
      const copy = heading.cloneNode(true);
      copy.querySelectorAll('.heading-link').forEach(link => link.remove());
      const text = copy.textContent.trim();
      const base = text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
        .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
      const count = slugs.get(base) || 0; slugs.set(base, count + 1);
      heading.id = 'gameplay-' + base + (count ? '-' + (count + 1) : '');
      heading.tabIndex = -1;
      const permalink = heading.querySelector('.heading-link');
      if (permalink) permalink.setAttribute('href', '#' + heading.id);
      const item = { id: heading.id, text, level: Number(heading.tagName[1]), children: [] };
      while (stack.length && stack.at(-1).level >= item.level) stack.pop();
      (stack.length ? stack.at(-1).children : roots).push(item); stack.push(item);
    }
    function tree(nodes, depth = 0) {
      const list = document.createElement('ol');
      for (const item of nodes) {
        const li = document.createElement('li'); li.className = 'toc-item';
        const row = document.createElement('div'); row.className = 'toc-row'; row.style.setProperty('--toc-depth', depth);
        const branch = document.createElement(item.children.length ? 'button' : 'span');
        branch.className = item.children.length ? 'toc-branch-toggle' : 'toc-leaf-spacer';
        if (item.children.length) {
          branch.type = 'button'; branch.setAttribute('aria-expanded', String(depth === 0));
          branch.setAttribute('aria-controls', 'toc-children-' + item.id);
          branch.setAttribute('aria-label', 'Mở hoặc thu gọn: ' + item.text);
          branch.innerHTML = '<span aria-hidden="true">›</span>';
        }
        const link = document.createElement('a'); link.className = 'toc-link toc-level-' + item.level;
        link.setAttribute('href', '#' + item.id); link.textContent = item.text;
        row.append(branch, link); li.append(row);
        if (item.children.length) {
          const children = tree(item.children, depth + 1); children.id = 'toc-children-' + item.id;
          children.hidden = depth !== 0; li.append(children);
        }
        list.append(li);
      }
      return list;
    }
    const index = tree(roots); index.className = 'toc-tree';
    readerNavigation.refresh('gameplay', index, headings.length);
  }
  function changed() {
    if (!editing) return;
    dirty = true;
    message('Có thay đổi chưa lưu vào dự án.');
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => { storeDraft(); refreshIndex(); }, 750);
  }
  function rememberSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount && article.contains(selection.anchorNode) && article.contains(selection.focusNode)) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }
  }
  function restoreSelection() {
    article.focus({ preventScroll: true });
    const selection = window.getSelection();
    selection.removeAllRanges();
    if (savedRange && article.contains(savedRange.commonAncestorContainer)) selection.addRange(savedRange);
    else {
      const range = document.createRange();
      range.selectNodeContents(article);
      range.collapse(false);
      selection.addRange(range);
    }
  }
  function command(name, value) {
    restoreSelection();
    document.execCommand(name, false, value);
    rememberSelection();
    changed();
  }
  function editableState(enabled) {
    article.contentEditable = String(enabled);
    article.spellcheck = true;
    if (enabled) { article.setAttribute('role', 'textbox'); article.setAttribute('aria-label', 'Nội dung gameplay, chỉnh sửa trực tiếp'); article.setAttribute('aria-multiline', 'true'); }
    else { article.removeAttribute('role'); article.removeAttribute('aria-label'); article.removeAttribute('aria-multiline'); }
    article.querySelectorAll('.heading-link, img').forEach(node => { node.contentEditable = 'false'; });
  }
  function offerDraft() {
    let draft;
    try { draft = JSON.parse(localStorage.getItem(draftKey)); } catch { return; }
    if (!draft || draft.root !== session.root || typeof draft.html !== 'string') return;
    dialog.innerHTML = '<h2>Có bản nháp chưa lưu</h2><p id="draft-description"></p><button type="button" id="draft-restore">Khôi phục bản nháp</button> <button type="button" id="draft-skip">Giữ bản đang lưu</button>';
    dialog.querySelector('#draft-description').textContent = draft.revision === revision
      ? 'Khôi phục nội dung bạn đã sửa trong lần biên tập trước?'
      : 'Bản nháp dựa trên phiên bản cũ. Bạn có thể khôi phục để tải bản nháp và đối chiếu; hệ thống sẽ chặn ghi đè bản mới.';
    dialog.querySelector('#draft-restore').onclick = () => {
      // Drafts are plain data in storage, but still sanitize before inserting into the live document.
      const template = document.createElement('template');
      template.innerHTML = draft.html;
      const allowed = new Set('H1 H2 H3 H4 H5 H6 P BR STRONG B EM I U S UL OL LI BLOCKQUOTE PRE CODE TABLE THEAD TBODY TFOOT TR TH TD FIGURE FIGCAPTION IMG DIV SPAN A HR'.split(' '));
      template.content.querySelectorAll('*').forEach(node => {
        if (!allowed.has(node.tagName)) { node.remove(); return; }
        for (const attribute of [...node.attributes]) {
          if (!['class', 'src', 'alt', 'href', 'colspan', 'rowspan', 'start'].includes(attribute.name)) node.removeAttribute(attribute.name);
        }
        if (node.hasAttribute('src') && !/^imgs\//.test(node.getAttribute('src'))) node.removeAttribute('src');
        if (node.hasAttribute('href') && !/^(https?:\/\/|mailto:|#)/i.test(node.getAttribute('href'))) node.removeAttribute('href');
      });
      article.replaceChildren(template.content);
      revision = draft.revision;
      editableState(true);
      refreshIndex();
      changed();
      dialog.close();
    };
    dialog.querySelector('#draft-skip').onclick = () => { dialog.close(); };
    dialog.showModal();
  }
  function syncEditorControls() {
    const active = document.getElementById('pane-gameplay').classList.contains('is-active');
    bar.hidden = !editing || !active;
    floatingStart.hidden = editing && active;
    floatingStart.querySelector('.web-edit-fab-label').textContent = editing ? 'Tiếp tục sửa gameplay' : 'Chỉnh sửa gameplay';
  }
  async function beginEditing() {
    const wasActive = document.getElementById('pane-gameplay').classList.contains('is-active');
    const keepPosition = wasActive && article.getBoundingClientRect().top < window.innerHeight * 0.6;
    const readingPosition = window.scrollY;
    if (editing) {
      if (!wasActive) { activateTab('gameplay', true, false); readerNavigation.jumpTo(article.querySelector('h1,h2,h3') || article); }
      syncEditorControls(); article.focus({ preventScroll: true }); return;
    }
    start.disabled = floatingStart.disabled = true;
    try {
      await ready;
      if (isOnline && loadError) throw new Error(loadError);
      if (!session || (session.online && !session.canEdit)) { help(); return; }
      const current = await request('GET');
      if (!wasActive) activateTab('gameplay', true, false);
      revision = current.revision;
      article.innerHTML = current.html;
      editing = true;
      dirty = false;
      syncEditorControls();
      document.body.classList.add('is-editing');
      editableState(true);
      refreshIndex();
      note.textContent = session.online ? 'Đang biên tập online. Lưu để cả nhóm thấy thay đổi.' : 'Đang biên tập bản trên máy.';
      if (keepPosition) window.scrollTo({ top: readingPosition, behavior: 'instant' });
      else readerNavigation.jumpTo(article.querySelector('h1,h2,h3') || article);
      message('Bấm vào nội dung để sửa. Ctrl+S để lưu.');
      offerDraft();
    } catch (error) {
      dialog.innerHTML = '<h2>Chưa mở được trình biên tập</h2><p></p><form method="dialog"><button>Đóng</button></form>';
      dialog.querySelector('p').textContent = error.message;
      dialog.showModal();
    } finally { start.disabled = floatingStart.disabled = false; }
  }
  start.addEventListener('click', beginEditing);
  floatingStart.addEventListener('click', beginEditing);
  async function save() {
    if (saving || !editing) return;
    if (!dirty) { message('Nội dung đã được lưu vào dự án.'); return; }
    saving = true;
    storeDraft();
    const submitted = cleanHTML();
    const submittedRevision = revision;
    saveButton.disabled = true;
    finishButton.disabled = true;
    message('Đang lưu và cập nhật trang…');
    try {
      const result = await request('PUT', { revision: submittedRevision, html: submitted });
      revision = result.revision;
      // Keep the cursor and any typing performed while the request was in flight.
      dirty = cleanHTML() !== submitted;
      refreshIndex();
      if (dirty) storeDraft();
      else {
        clearTimeout(draftTimer);
        try {
          const stored = JSON.parse(localStorage.getItem(draftKey));
          if (stored?.revision === submittedRevision && stored?.html === submitted) localStorage.removeItem(draftKey);
        } catch { /* Saving to disk does not depend on browser storage. */ }
      }
      message(dirty ? 'Đã lưu. Có nội dung bạn vừa sửa thêm; bấm Lưu khi xong.' : (session.online ? 'Đã lưu online cho cả nhóm lúc ' : 'Đã lưu trên máy lúc ') + new Date(result.savedAt).toLocaleTimeString('vi-VN') + '.');
      // Refresh the reader in place after leaving editing; this also refreshes its index.
    } catch (error) { message(error.message, true); }
    finally { saving = false; saveButton.disabled = false; finishButton.disabled = false; }
  }
  function finish() {
    if (saving) return;
    if (dirty) {
      dialog.innerHTML = '<h2>Còn thay đổi chưa lưu</h2><p>Bạn muốn lưu trước khi đóng biên tập?</p><button type="button" id="finish-save">Lưu và đóng</button> <button type="button" id="finish-discard">Đóng, giữ bản nháp</button> <button type="button" id="finish-cancel">Tiếp tục sửa</button>';
      dialog.querySelector('#finish-save').onclick = async () => { dialog.close(); await save(); if (!dirty) closeEditor(); };
      dialog.querySelector('#finish-discard').onclick = () => {
        storeDraft();
        if (storageFailed) { dialog.close(); return; }
        dialog.close(); closeEditor();
      };
      dialog.querySelector('#finish-cancel').onclick = () => dialog.close();
      dialog.showModal();
    } else closeEditor();
  }
  function closeEditor() {
    dirty = false;
    editing = false;
    location.hash = 'gameplay';
    location.reload();
  }
  saveButton.addEventListener('click', save);
  finishButton.addEventListener('click', finish);
  article.addEventListener('input', changed);
  document.addEventListener('selectionchange', rememberSelection);
  bar.addEventListener('mousedown', event => { if (event.target.closest('button')) event.preventDefault(); });
  bar.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => command(button.dataset.command)));
  bar.querySelector('#editor-format').addEventListener('change', event => command('formatBlock', event.target.value));
  article.addEventListener('click', event => { if (editing && event.target.closest('a')) event.preventDefault(); });
  article.addEventListener('paste', event => {
    if (!editing) return;
    event.preventDefault();
    document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
  });
  article.addEventListener('drop', event => { if (editing) { event.preventDefault(); message('Bấm + Chèn ảnh để chọn ảnh trong thư viện hoặc tải ảnh từ máy.'); } });
  bar.querySelector('#editor-add-row').addEventListener('click', () => {
    restoreSelection();
    const selection = window.getSelection();
    const node = selection.anchorNode?.nodeType === Node.ELEMENT_NODE ? selection.anchorNode : selection.anchorNode?.parentElement;
    const row = node?.closest('tr');
    if (!row || !article.contains(row)) return message('Đặt con trỏ trong bảng cần thêm dòng.');
    const table = row.closest('table');
    const next = document.createElement('tr');
    for (const cell of row.cells) {
      const td = document.createElement('td');
      if (cell.colSpan > 1) td.colSpan = cell.colSpan;
      td.append(document.createElement('br'));
      next.append(td);
    }
    if (row.parentElement.tagName === 'THEAD') (table.tBodies[0] || table.createTBody()).prepend(next);
    else row.after(next);
    const range = document.createRange(); range.selectNodeContents(next.cells[0]); range.collapse(true);
    selection.removeAllRanges(); selection.addRange(range); rememberSelection(); changed();
    message('Đã thêm dòng. Thay đổi cấu trúc bảng được giữ trong bản nháp.');
  });
  bar.querySelector('#editor-add-table').addEventListener('click', () => {
    command('insertHTML', '<div class="table-wrap"><table><thead><tr><th>Cột 1</th><th>Cột 2</th><th>Cột 3</th></tr></thead><tbody><tr><td>Nội dung</td><td>Nội dung</td><td>Nội dung</td></tr></tbody></table></div><p><br></p>');
  });
  const imagePicker = createImagePicker({
    getSession: () => session,
    onInsert(image, caption) {
      const figure = document.createElement('figure'); figure.className = 'markdown-image';
      const img = document.createElement('img'); img.setAttribute('src', image.src); img.alt = caption || image.name; img.loading = 'lazy';
      figure.append(img);
      if (caption) { const figcaption = document.createElement('figcaption'); figcaption.textContent = caption; figure.append(figcaption); }
      command('insertHTML', figure.outerHTML + '<p><br></p>');
      message('Đã chèn ảnh. Bấm Lưu vào dự án khi chỉnh sửa xong.');
    },
  });
  bar.querySelector('#editor-add-image').addEventListener('click', () => {
    rememberSelection();
    imagePicker.open();
  });
  bar.querySelector('#editor-download').addEventListener('click', () => {
    const html = '<!doctype html><html lang="vi"><meta charset="utf-8"><title>Divergency — Bản nháp gameplay</title><body>' + cleanHTML() + '</body></html>';
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'Divergency_Gameplay_Draft.html'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'e' && !document.querySelector('dialog[open]')) { event.preventDefault(); beginEditing(); }
    if (editing && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') { event.preventDefault(); save(); }
  });
  window.addEventListener('beforeunload', event => {
    if (!editing || !dirty) return;
    storeDraft(); event.preventDefault(); event.returnValue = '';
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) storeDraft(); });
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', syncEditorControls));
  window.addEventListener('hashchange', syncEditorControls);
  syncEditorControls();
  ready.then(() => { if (isOnline && new URLSearchParams(location.search).get('edit') === '1') beginEditing(); });
})();
