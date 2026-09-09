(() => {
  const article = document.querySelector('[data-search-root="gameplay"]');
  const start = document.getElementById('web-edit-start');
  const floatingStart = document.getElementById('web-edit-fab');
  const note = document.getElementById('web-edit-note');
  const onlineOrigin = 'https://divergency-team-editor.huyq1471.chatgpt.site';
  const isLocalEditor = location.hostname === '127.0.0.1' && location.port === '4177';
  const isOnline = location.origin === onlineOrigin || (location.hostname === '127.0.0.1' && !isLocalEditor);
  const isPublishedReader = location.hostname === 'kslhuy.github.io';
  const localOptIn = isLocalEditor && new URLSearchParams(location.search).has('local');
  if ((location.protocol === 'file:' || isLocalEditor) && !localOptIn) {
    window.addEventListener('hashchange', () => { if (location.hash.startsWith('#gameplay')) location.replace(onlineOrigin + '/' + location.hash); });
  }
  if ((location.protocol === 'file:' || isLocalEditor) && !localOptIn &&
      (location.hash.startsWith('#gameplay') || new URLSearchParams(location.search).has('edit'))) {
    location.replace(onlineOrigin + '/' + (new URLSearchParams(location.search).has('edit') ? '?edit=1' : '') + (location.hash || '#gameplay'));
    return;
  }
  let loadError = '';
  if (!article || !start) return;
  const draftKey = 'divergency-gameplay-web-draft-v1';
  let session = null;
  let revision = '';
  let baseBlocks = null;
  let editing = false;
  let dirty = false;
  let saving = false;
  let savedRange = null;
  let draftTimer;
  let storageFailed = false;
  const bar = document.createElement('section');
  bar.className = 'editor-bar';
  bar.hidden = true;
  bar.setAttribute('aria-label', 'Gameplay editor');
  bar.innerHTML = `
    <div class="editor-bar-row" role="group" aria-label="Text formatting">
      <button type="button" data-command="undo" title="Undo (Ctrl+Z)">↶</button>
      <button type="button" data-command="redo" title="Redo (Ctrl+Y)">↷</button>
      <button type="button" data-command="bold" title="Bold (Ctrl+B)"><b>B</b></button>
      <button type="button" data-command="italic" title="Italic (Ctrl+I)"><i>I</i></button>
      <label class="editor-style-label">Style <select id="editor-format" aria-label="Current text style" title="Use the existing document styles"><option value="p">Text</option><option value="h1">Title</option><option value="h2">Header</option><option value="h3">Subheader</option><option value="h4">Small heading</option><option value="h5">Heading 5</option><option value="h6">Heading 6</option><option value="blockquote">Quote</option><option value="pre">Code</option></select></label>
      <button type="button" data-command="insertUnorderedList">• List</button>
      <button type="button" id="editor-add-row">+ Row</button>
      <button type="button" id="editor-add-table">+ Table</button>
      <button type="button" id="editor-add-image">+ Image</button>
    </div>
    <div class="editor-bar-row">
      <span class="editor-status" role="status" aria-live="polite">Click text to edit · Ctrl+S to save</span>
      <button type="button" id="editor-download">Draft .html</button>
      <button type="button" data-md-action="copy" data-export-doc="gameplay" title="Copy the current gameplay as Markdown">Copy MD</button>
      <button type="button" data-md-action="download" data-export-doc="gameplay" title="Download the current gameplay as a Markdown file">Download .md</button>
      <button type="button" id="editor-finish">Close</button>
      <button type="button" id="editor-save" class="editor-primary">Save</button>
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
    location.href = onlineOrigin + '/?edit=1' + (location.hash.startsWith('#gameplay') ? location.hash : '#gameplay');
  }
  const ready = (async () => {
    if (!isOnline && !isLocalEditor && !isPublishedReader) return;
    try {
      if (isOnline || isPublishedReader) {
        note.textContent = 'Loading saved content…';
        article.setAttribute('aria-busy', 'true');
        if (isPublishedReader) article.hidden = true;
        const content = await fetch((isPublishedReader ? onlineOrigin : '') + '/api/gameplay', {cache:'no-store',signal:AbortSignal.timeout(20000)});
        if (!content.ok) throw new Error('Could not load the saved document. Reload the page to try again.');
        const current = await content.json();
        article.innerHTML = current.html;
        article.hidden = false;
        article.removeAttribute('aria-busy');
        if (isPublishedReader) article.querySelectorAll('img[src^="imgs/online/"]').forEach(img => img.src = onlineOrigin + '/' + img.getAttribute('src'));
        refreshIndex();
        const target = document.getElementById(location.hash.slice(1));
        if (target && article.contains(target)) readerNavigation.jumpTo(target);
        const metrics = document.querySelectorAll('#pane-gameplay .doc-stats dd');
        if(metrics.length===3) {
          metrics[0].textContent = Math.max(1,Math.ceil(article.textContent.trim().split(/\s+/).length/220))+' min';
          metrics[1].textContent = article.querySelectorAll('h1,h2').length;
          metrics[2].textContent = article.querySelectorAll('table').length;
        }
        note.textContent = 'Shared document · v' + current.revision + (current.savedAt ? ' · saved ' + new Date(current.savedAt).toLocaleString('en-GB') : '');
        if (isPublishedReader) return;
      }
      const response = await fetch('/api/editor', { signal: AbortSignal.timeout(10000) });
      const result = await response.json();
      if (response.ok && result.app === 'divergency-editor') {
        session = result;
        if (session.online) onlineControls.update();
        else note.textContent = 'Local copy. Saving here does not update the shared document.';
      }
    } catch (error) {
      loadError = error.message;
      article.removeAttribute('aria-busy');
      if (isOnline || isPublishedReader) note.innerHTML = 'Could not load the shared document. Reload or <a href="' + onlineOrigin + '/#gameplay">open the online editor</a>.';
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
    if (!response.ok) throw Object.assign(new Error(result.error || 'Could not save. Keep your draft and try again.'), {status:response.status});
    return result;
  }
  function normalizedHTML(html) {
    const copy = document.createElement('div');
    copy.innerHTML = html;
    stagePlans.clear(copy);
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
  function cleanHTML() { return normalizedHTML(article.innerHTML); }
  function safeFragment(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const allowed = new Set('H1 H2 H3 H4 H5 H6 P BR STRONG B EM I U S UL OL LI BLOCKQUOTE PRE CODE TABLE THEAD TBODY TFOOT TR TH TD FIGURE FIGCAPTION IMG DIV SPAN A HR'.split(' '));
    template.content.querySelectorAll('*').forEach(node => {
      if (!allowed.has(node.tagName)) { node.remove(); return; }
      for (const attribute of [...node.attributes]) {
        if (!['class','src','alt','href','colspan','rowspan','start'].includes(attribute.name)) node.removeAttribute(attribute.name);
      }
      if (node.hasAttribute('src')) {
        let src = node.getAttribute('src');
        for (const prefix of [onlineOrigin + '/', 'https://kslhuy.github.io/divergency-reviewer-site/']) {
          if (src.startsWith(prefix)) src = src.slice(prefix.length);
        }
        if (/^imgs\//.test(src) && !src.split('/').includes('..')) node.setAttribute('src',src);
        else node.removeAttribute('src');
      }
      if (node.hasAttribute('href') && !/^(https?:\/\/|mailto:|#)/i.test(node.getAttribute('href'))) node.removeAttribute('href');
    });
    const copy = document.createElement('div'); copy.append(template.content);
    stagePlans.clear(copy);
    return copy.innerHTML;
  }
  function blocks(html) {
    const copy = document.createElement('div'); copy.innerHTML = normalizedHTML(html);
    return [...copy.childNodes].filter(n => n.nodeType !== 3 || n.textContent.trim())
      .map(n => {
        if (n.nodeType === 1) return n.outerHTML;
        const escaped = document.createElement('div'); escaped.textContent = n.textContent; return escaped.innerHTML;
      });
  }
  function storeDraft() {
    clearTimeout(draftTimer);
    if (!editing || !dirty) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ root: session.root, revision, html: cleanHTML(), savedAt: Date.now() }));
      storageFailed = false;
    } catch {
      storageFailed = true;
      message('Autosave is unavailable. Save or download your draft.', true);
    }
  }
  function refreshIndex() {
    // Full-document paste can inherit the first heading and wrap body blocks in H1.
    for (const heading of article.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      if (!heading.querySelector('p,div,ul,ol,li,blockquote,pre,table,figure,hr,h1,h2,h3,h4,h5,h6')) continue;
      heading.querySelectorAll('.heading-link').forEach(link => link.remove());
      const body = document.createElement('div');
      body.append(...heading.childNodes);
      heading.replaceWith(body);
    }
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
          branch.setAttribute('aria-label', 'Expand or collapse: ' + item.text);
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
    if (!editing) stagePlans.enhance(article);
  }
  function changed() {
    if (!editing) return;
    dirty = true;
    message('Unsaved changes · Ctrl+S to save');
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => { storeDraft(); refreshIndex(); }, 750);
  }
  function rememberSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount && article.contains(selection.anchorNode) && article.contains(selection.focusNode)) {
      savedRange = selection.getRangeAt(0).cloneRange();
      syncTextStyle(selection.anchorNode);
    }
  }
  function syncTextStyle(node) {
    if (!editing || !node || !article.contains(node)) return;
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    const block = element?.closest('p,h1,h2,h3,h4,h5,h6,blockquote,pre');
    const select = bar.querySelector('#editor-format');
    const value = block && article.contains(block) ? block.tagName.toLowerCase() : 'p';
    if (document.activeElement !== select) select.value = value;
    for (const name of ['bold', 'italic']) {
      bar.querySelector('[data-command="' + name + '"]').setAttribute('aria-pressed', String(document.queryCommandState(name)));
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
    if (name === 'formatBlock' && !['p','h1','h2','h3','h4','h5','h6','blockquote','pre'].includes(value)) return;
    restoreSelection();
    document.execCommand(name, false, value);
    rememberSelection();
    changed();
  }
  function editableState(enabled) {
    if (enabled) stagePlans.clear(article);
    article.contentEditable = String(enabled);
    article.spellcheck = true;
    if (enabled) document.execCommand('styleWithCSS', false, false);
    if (enabled) { article.setAttribute('role', 'textbox'); article.setAttribute('aria-label', 'Editable gameplay document'); article.setAttribute('aria-multiline', 'true'); }
    else { article.removeAttribute('role'); article.removeAttribute('aria-label'); article.removeAttribute('aria-multiline'); }
    article.querySelectorAll('.heading-link, img').forEach(node => { node.contentEditable = 'false'; });
    if (!enabled) stagePlans.enhance(article);
  }
  function offerDraft() {
    let draft;
    try { draft = JSON.parse(localStorage.getItem(draftKey)); } catch { return; }
    if (!draft || draft.root !== session.root || typeof draft.html !== 'string') return;
    dialog.innerHTML = '<h2>Unsaved draft found</h2><p id="draft-description"></p><button type="button" id="draft-restore">Restore draft</button> <button type="button" id="draft-skip">Keep saved version</button>';
    dialog.querySelector('#draft-description').textContent = draft.revision === revision
      ? 'Restore your previous editing session?'
      : 'Restore your draft. New team changes can be merged when you save.';
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
      baseBlocks = draft.revision === revision ? baseBlocks : null;
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
    floatingStart.querySelector('.web-edit-fab-label').textContent = editing ? 'Resume editing' : 'Edit gameplay';
  }
  async function beginEditing() {
    if (!isOnline && !localOptIn && !editing) { help(); return; }
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
      baseBlocks = blocks(current.html);
      article.innerHTML = current.html;
      editing = true;
      dirty = false;
      syncEditorControls();
      document.body.classList.add('is-editing');
      editableState(true);
      refreshIndex();
      note.textContent = session.online ? 'Editing online. Save to share changes with the team.' : 'Editing a local copy.';
      if (keepPosition) window.scrollTo({ top: readingPosition, behavior: 'instant' });
      else readerNavigation.jumpTo(article.querySelector('h1,h2,h3') || article);
      message('Click text to edit · Ctrl+S to save');
      offerDraft();
    } catch (error) {
      dialog.innerHTML = '<h2>Could not open the editor</h2><p></p><form method="dialog"><button>Close</button></form>';
      dialog.querySelector('p').textContent = error.message;
      dialog.showModal();
    } finally { start.disabled = floatingStart.disabled = false; }
  }
  start.addEventListener('click', beginEditing);
  floatingStart.addEventListener('click', beginEditing);
  async function resolveConflict() {
    const latest = await request('GET');
    const mine = blocks(cleanHTML()), theirs = blocks(latest.html);
    const merged = baseBlocks ? mergeGameplayBlocks(baseBlocks, mine, theirs) : [{mine, theirs}];
    const conflicts = merged.filter(part => !part.blocks);
    const apply = () => {
      article.innerHTML = merged.flatMap(part => part.blocks || part[part.choice]).join('\n');
      revision = latest.revision; baseBlocks = theirs;
      editableState(true); refreshIndex(); changed(); storeDraft();
    };
    if (!conflicts.length) { apply(); return true; }
    dialog.replaceChildren();
    const title = document.createElement('h2'); title.textContent = 'Resolve overlapping changes';
    const description = document.createElement('p'); description.textContent = 'Other changes have been merged. Choose which version to keep for each passage, then save.';
    dialog.append(title, description);
    for (const [index, conflict] of conflicts.entries()) {
      const field = document.createElement('fieldset'); field.className = 'editor-conflict';
      const legend = document.createElement('legend'); legend.textContent = 'Passage ' + (index + 1); field.append(legend);
      for (const [side, label] of [['mine','My changes'],['theirs','Team version']]) {
        const option = document.createElement('label');
        const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'conflict-' + index;
        radio.onchange = () => { conflict.choice = side; accept.disabled = conflicts.some(c => !c.choice); };
        option.append(radio, document.createTextNode(label));
        const preview = document.createElement('div'); preview.className = 'editor-conflict-preview';
        const text = document.createElement('div'); text.innerHTML = conflict[side].join('\n');
        preview.textContent = text.textContent || '(Deleted passage)';
        option.append(preview); field.append(option);
      }
      dialog.append(field);
    }
    const accept = document.createElement('button'); accept.textContent = 'Merge and save'; accept.className = 'editor-primary'; accept.disabled = true;
    accept.onclick = () => { apply(); dialog.close(); save(); };
    const cancel = document.createElement('button'); cancel.textContent = 'Keep editing draft'; cancel.onclick = () => dialog.close();
    dialog.append(accept, cancel); dialog.showModal();
    message('Your draft is safe. Choose which passages to keep in the merge window.');
    return false;
  }
  async function save(mergeAttempt = 0) {
    if (typeof mergeAttempt !== 'number') mergeAttempt = 0;
    if (saving || !editing) return;
    if (!dirty) { message('All changes saved.'); return; }
    saving = true;
    storeDraft();
    const submitted = cleanHTML();
    const submittedRevision = revision;
    saveButton.disabled = true;
    finishButton.disabled = true;
    message('Saving…');
    try {
      const result = await request('PUT', { revision: submittedRevision, html: submitted });
      revision = result.revision;
      baseBlocks = blocks(result.html || submitted);
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
      message(dirty ? 'Saved. New edits are still unsaved.' : (session.online ? 'Saved for the team at ' : 'Saved locally at ') + new Date(result.savedAt).toLocaleTimeString('en-GB') + '.');
      // Refresh the reader in place after leaving editing; this also refreshes its index.
    } catch (error) {
      if (error.status === 409 && mergeAttempt < 3) {
        try {
          if (await resolveConflict()) {
            saving = false;
            await save(mergeAttempt + 1);
          }
        } catch (mergeError) { message(mergeError.message + ' Your draft is still available.', true); }
      } else message(error.status === 409 ? 'The team is saving frequent changes. Your draft is safe; click Save to retry.' : error.message, true);
    }
    finally { saving = false; saveButton.disabled = false; finishButton.disabled = false; }
  }
  function finish() {
    if (saving) return;
    if (dirty) {
      dialog.innerHTML = '<h2>Unsaved changes</h2><p>Save before closing the editor?</p><button type="button" id="finish-save">Save and close</button> <button type="button" id="finish-discard">Close, keep draft</button> <button type="button" id="finish-cancel">Keep editing</button>';
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
    const readerURL = new URL(location.href);
    readerURL.searchParams.delete('edit');
    readerURL.hash = 'gameplay';
    history.replaceState(null, '', readerURL);
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
    const html = event.clipboardData.getData('text/html');
    if (html) document.execCommand('insertHTML', false, safeFragment(html));
    else document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
  });
  article.addEventListener('drop', event => { if (editing) { event.preventDefault(); message('Use + Image to choose from the library or upload an image.'); } });
  bar.querySelector('#editor-add-row').addEventListener('click', () => {
    restoreSelection();
    const selection = window.getSelection();
    const node = selection.anchorNode?.nodeType === Node.ELEMENT_NODE ? selection.anchorNode : selection.anchorNode?.parentElement;
    const row = node?.closest('tr');
    if (!row || !article.contains(row)) return message('Place the cursor in a table to add a row.');
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
    message('Row added. Save when ready.');
  });
  bar.querySelector('#editor-add-table').addEventListener('click', () => {
    command('insertHTML', '<div class="table-wrap"><table><thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead><tbody><tr><td>Text</td><td>Text</td><td>Text</td></tr></tbody></table></div><p><br></p>');
  });
  const imagePicker = createImagePicker({
    getSession: () => session,
    onInsert(image, caption) {
      const figure = document.createElement('figure'); figure.className = 'markdown-image';
      const img = document.createElement('img'); img.setAttribute('src', image.src); img.alt = caption || image.name; img.loading = 'lazy';
      figure.append(img);
      if (caption) { const figcaption = document.createElement('figcaption'); figcaption.textContent = caption; figure.append(figcaption); }
      command('insertHTML', figure.outerHTML + '<p><br></p>');
      message('Image inserted. Save when ready.');
    },
  });
  bar.querySelector('#editor-add-image').addEventListener('click', () => {
    rememberSelection();
    imagePicker.open();
  });
  bar.querySelector('#editor-download').addEventListener('click', () => {
    const html = '<!doctype html><html lang="vi"><meta charset="utf-8"><title>Divergency — Gameplay draft</title><body>' + cleanHTML() + '</body></html>';
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
