// Embedded in the reader. Images are read from the project's library, not only the current page.
function createImagePicker({ getSession, onInsert }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-picker';
  dialog.setAttribute('aria-labelledby', 'image-picker-title');
  dialog.innerHTML = `
    <header class="image-picker-header">
      <div><h2 id="image-picker-title">Insert image</h2><p>Choose from the library or upload an image.</p></div>
      <button type="button" class="image-picker-close" aria-label="Close image library">×</button>
    </header>
    <div class="image-picker-tools">
      <label class="image-picker-search">Find image<input type="search" placeholder="Image name or folder…" autocomplete="off"></label>
      <label class="image-picker-folder">Folder<select><option value="">All folders</option></select></label>
      <button class="image-upload-button" type="button">↑ Upload</button>
      <input class="image-upload-input" type="file" accept="image/png,image/jpeg,image/gif,image/webp,.png,.jpg,.jpeg,.gif,.webp" aria-label="Choose an image to upload" hidden>
    </div>
    <div class="image-drop-hint">Drop an image here · PNG, JPG, GIF, WebP · up to 20 MB</div>
    <div class="image-picker-body">
      <section class="image-library" aria-label="Project image library">
        <div class="image-library-heading"><span class="image-result-count" role="status" aria-live="polite">Loading library…</span><button class="image-library-retry" type="button" hidden>Retry</button></div>
        <div class="image-library-scroll" tabindex="0" aria-label="Library images">
          <div class="image-library-grid"></div>
          <p class="image-library-empty" hidden>No images found. Try another name or select all folders.</p>
          <button class="image-library-more" type="button" hidden>Load more</button>
        </div>
      </section>
      <aside class="image-selection" aria-label="Selected image">
        <div class="image-selection-placeholder">Select an image to preview</div>
        <img class="image-selection-preview" alt="" hidden>
        <p class="image-selection-name"></p>
        <p class="image-selection-details"></p>
        <label>Caption <span>(optional)</span><input class="image-selection-caption" placeholder="Image caption…" disabled></label>
      </aside>
    </div>
    <footer class="image-picker-footer">
      <p class="image-picker-status" role="status" aria-live="polite">The image is inserted at the cursor.</p>
      <div><button class="image-picker-cancel" type="button">Cancel</button><button class="image-picker-insert" type="button" disabled>Insert image</button></div>
    </footer>`;
  document.body.append(dialog);
  const find = selector => dialog.querySelector(selector);
  const search = find('input[type="search"]');
  const folder = find('select');
  const grid = find('.image-library-grid');
  const count = find('.image-result-count');
  const status = find('.image-picker-status');
  const more = find('.image-library-more');
  const retry = find('.image-library-retry');
  const empty = find('.image-library-empty');
  const preview = find('.image-selection-preview');
  const placeholder = find('.image-selection-placeholder');
  const caption = find('.image-selection-caption');
  const insert = find('.image-picker-insert');
  const uploadButton = find('.image-upload-button');
  const fileInput = find('.image-upload-input');
  const scroll = find('.image-library-scroll');
  let images = [];
  let selected = null;
  let limit = 60;
  let uploading = false;
  let generation = 0;
  let dragDepth = 0;
  const normalize = text => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase();
  const displayName = name => name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
  const groupOf = image => image.folder.split('/')[0];
  const groupLabel = group => group === 'uploads' ? 'Uploads' : group;
  function message(text, error = false) {
    status.textContent = text;
    status.classList.toggle('is-error', error);
  }
  function updateFolders() {
    const previous = folder.value;
    folder.replaceChildren(new Option('All folders', ''));
    [...new Set(images.map(groupOf))].sort().forEach(group => folder.add(new Option(groupLabel(group), group)));
    if ([...folder.options].some(option => option.value === previous)) folder.value = previous;
  }
  function render() {
    const query = normalize(search.value.trim());
    const matches = images.filter(image => (!folder.value || groupOf(image) === folder.value)
      && normalize(image.name + ' ' + image.folder).includes(query));
    const shown = matches.slice(0, limit);
    count.textContent = matches.length + ' images' + (shown.length < matches.length ? ' · showing ' + shown.length : '');
    empty.hidden = Boolean(matches.length);
    more.hidden = shown.length === matches.length;
    grid.replaceChildren();
    for (const image of shown) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'image-library-card';
      button.setAttribute('aria-label', 'Select image ' + image.name);
      button.setAttribute('aria-pressed', String(selected?.src === image.src));
      button.dataset.src = image.src;
      const thumb = document.createElement('img');
      thumb.src = image.src; thumb.alt = ''; thumb.loading = 'lazy'; thumb.decoding = 'async';
      const name = document.createElement('span'); name.className = 'image-card-name'; name.textContent = image.name;
      const group = document.createElement('span'); group.className = 'image-card-folder'; group.textContent = groupLabel(image.folder);
      const check = document.createElement('span'); check.className = 'image-card-check'; check.textContent = '✓'; check.setAttribute('aria-hidden', 'true');
      button.title = image.folder + '/' + image.name;
      button.append(thumb, name, group, check);
      button.addEventListener('click', () => choose(image));
      grid.append(button);
    }
  }
  function choose(image, label = displayName(image.name)) {
    selected = image;
    grid.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.src === image.src)));
    insert.disabled = true;
    placeholder.hidden = true;
    preview.hidden = false;
    preview.alt = label;
    preview.onload = () => { if (selected === image) { insert.disabled = uploading; message('Image selected. Click Insert image to add it.'); } };
    preview.onerror = () => { if (selected === image) { insert.disabled = true; message('Could not load this image. Choose another or upload a new one.', true); } };
    preview.src = image.src;
    find('.image-selection-name').textContent = image.name;
    find('.image-selection-details').textContent = groupLabel(image.folder) + ' · ' + (image.bytes < 1024 * 1024 ? Math.ceil(image.bytes / 1024) + ' KB' : (image.bytes / 1024 / 1024).toFixed(1) + ' MB');
    caption.disabled = false;
    caption.value = label;
  }
  async function load() {
    const current = generation;
    retry.hidden = true;
    count.textContent = 'Loading library…';
    try {
      const response = await fetch('/api/images', { headers: { 'X-Editor-Token': getSession().token }, signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load the library.');
      if (current !== generation || !dialog.open) return;
      images = data.images;
      if (selected && !images.some(image => image.src === selected.src)) images.unshift(selected);
      updateFolders(); render();
    } catch (error) {
      if (current !== generation || !dialog.open) return;
      count.textContent = 'Library unavailable'; retry.hidden = false;
      message(error.message + ' Retry or upload an image from your computer.', true);
    }
  }
  async function upload(file) {
    if (!file || uploading) return;
    if (file.size > 20 * 1024 * 1024) return message('Each image must be 20 MB or smaller.', true);
    if (!/\.(png|jpe?g|gif|webp)$/i.test(file.name)) return message('Choose a PNG, JPG, GIF or WebP image.', true);
    uploading = true; uploadButton.disabled = true; insert.disabled = true;
    dialog.setAttribute('aria-busy', 'true');
    message('Uploading image…');
    const objectURL = URL.createObjectURL(file);
    try {
      const check = new Image(); check.src = objectURL;
      try { await check.decode(); } catch { throw new Error('Could not read the image. Choose another file.'); }
      const response = await fetch('/api/images', {
        method: 'POST', headers: { 'X-Editor-Token': getSession().token, 'X-Image-Name': encodeURIComponent(file.name), 'Content-Type': file.type || 'application/octet-stream' },
        body: file, signal: AbortSignal.timeout(60000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not upload the image. Try again.');
      images = [data.image, ...images.filter(image => image.src !== data.image.src)];
      updateFolders(); search.value = ''; folder.value = 'uploads'; limit = 60;
      render(); scroll.scrollTop = 0;
      choose(data.image, displayName(file.name));
      message('Image uploaded. Click Insert image to add it.');
    } catch (error) { message(error.message, true); }
    finally {
      URL.revokeObjectURL(objectURL);
      uploading = false; uploadButton.disabled = false; fileInput.value = '';
      dialog.removeAttribute('aria-busy');
      insert.disabled = !selected || !preview.complete || !preview.naturalWidth;
    }
  }
  function close() {
    if (uploading) { message('Uploading image. Please wait.'); return; }
    dialog.close();
  }
  find('.image-picker-close').onclick = close;
  find('.image-picker-cancel').onclick = close;
  dialog.addEventListener('cancel', event => { if (uploading) { event.preventDefault(); message('Uploading image. Please wait.'); } });
  dialog.addEventListener('close', () => { generation++; dialog.classList.remove('is-dragging'); });
  search.addEventListener('input', () => { limit = 60; render(); scroll.scrollTop = 0; });
  folder.addEventListener('change', () => { limit = 60; render(); scroll.scrollTop = 0; });
  more.onclick = () => { limit += 60; render(); };
  retry.onclick = load;
  uploadButton.onclick = () => fileInput.click();
  fileInput.onchange = () => upload(fileInput.files[0]);
  dialog.addEventListener('dragenter', event => {
    if (!event.dataTransfer.types.includes('Files')) return;
    event.preventDefault(); dragDepth++; dialog.classList.add('is-dragging');
  });
  dialog.addEventListener('dragover', event => { if (event.dataTransfer.types.includes('Files')) { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; } });
  dialog.addEventListener('dragleave', () => { dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) dialog.classList.remove('is-dragging'); });
  dialog.addEventListener('drop', event => {
    event.preventDefault(); dragDepth = 0; dialog.classList.remove('is-dragging');
    if (event.dataTransfer.files.length !== 1) return message('Add one image at a time to preview it and choose its position.', true);
    upload(event.dataTransfer.files[0]);
  });
  insert.onclick = () => {
    if (!selected || insert.disabled) return;
    const image = selected;
    const label = caption.value.trim();
    dialog.close(); onInsert(image, label);
  };
  return {
    open() {
      generation++; selected = null; limit = 60; dragDepth = 0;
      search.value = ''; folder.value = ''; caption.value = ''; caption.disabled = true;
      preview.hidden = true; preview.removeAttribute('src'); preview.onload = preview.onerror = null;
      placeholder.hidden = false; insert.disabled = true;
      find('.image-selection-name').textContent = ''; find('.image-selection-details').textContent = '';
      message('The image is inserted at the cursor.');
      dialog.showModal();
      if (images.length) render();
      load(); search.focus();
    },
  };
}
