// Embedded in the reader. Images are read from the project's library, not only the current page.
function createImagePicker({ getSession, onInsert }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-picker';
  dialog.setAttribute('aria-labelledby', 'image-picker-title');
  dialog.innerHTML = `
    <header class="image-picker-header">
      <div><h2 id="image-picker-title">Chèn hình minh họa</h2><p>Chọn ảnh trong thư viện hoặc thêm ảnh từ máy.</p></div>
      <button type="button" class="image-picker-close" aria-label="Đóng thư viện ảnh">×</button>
    </header>
    <div class="image-picker-tools">
      <label class="image-picker-search">Tìm ảnh<input type="search" placeholder="Tên ảnh hoặc thư mục…" autocomplete="off"></label>
      <label class="image-picker-folder">Thư mục<select><option value="">Tất cả thư mục</option></select></label>
      <button class="image-upload-button" type="button">↑ Tải ảnh từ máy</button>
      <input class="image-upload-input" type="file" accept="image/png,image/jpeg,image/gif,image/webp,.png,.jpg,.jpeg,.gif,.webp" aria-label="Chọn ảnh từ máy" hidden>
    </div>
    <div class="image-drop-hint">Kéo thả ảnh vào cửa sổ này để thêm vào thư viện · PNG, JPG, GIF, WebP · tối đa 20 MB/ảnh</div>
    <div class="image-picker-body">
      <section class="image-library" aria-label="Thư viện ảnh dự án">
        <div class="image-library-heading"><span class="image-result-count" role="status" aria-live="polite">Đang tải thư viện…</span><button class="image-library-retry" type="button" hidden>Thử lại</button></div>
        <div class="image-library-scroll" tabindex="0" aria-label="Các ảnh trong thư viện">
          <div class="image-library-grid"></div>
          <p class="image-library-empty" hidden>Không tìm thấy ảnh. Thử tên khác hoặc chọn tất cả thư mục.</p>
          <button class="image-library-more" type="button" hidden>Xem thêm ảnh</button>
        </div>
      </section>
      <aside class="image-selection" aria-label="Ảnh đang chọn">
        <div class="image-selection-placeholder">Chọn một ảnh để xem trước</div>
        <img class="image-selection-preview" alt="" hidden>
        <p class="image-selection-name"></p>
        <p class="image-selection-details"></p>
        <label>Chú thích <span>(không bắt buộc)</span><input class="image-selection-caption" placeholder="Nhập chú thích cho hình…" disabled></label>
      </aside>
    </div>
    <footer class="image-picker-footer">
      <p class="image-picker-status" role="status" aria-live="polite">Ảnh được chèn tại vị trí con trỏ trong nội dung.</p>
      <div><button class="image-picker-cancel" type="button">Hủy</button><button class="image-picker-insert" type="button" disabled>Chèn ảnh đã chọn</button></div>
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
  const groupLabel = group => group === 'uploads' ? 'Ảnh tải lên' : group;
  function message(text, error = false) {
    status.textContent = text;
    status.classList.toggle('is-error', error);
  }
  function updateFolders() {
    const previous = folder.value;
    folder.replaceChildren(new Option('Tất cả thư mục', ''));
    [...new Set(images.map(groupOf))].sort().forEach(group => folder.add(new Option(groupLabel(group), group)));
    if ([...folder.options].some(option => option.value === previous)) folder.value = previous;
  }
  function render() {
    const query = normalize(search.value.trim());
    const matches = images.filter(image => (!folder.value || groupOf(image) === folder.value)
      && normalize(image.name + ' ' + image.folder).includes(query));
    const shown = matches.slice(0, limit);
    count.textContent = matches.length + ' ảnh' + (shown.length < matches.length ? ' · đang hiện ' + shown.length : '');
    empty.hidden = Boolean(matches.length);
    more.hidden = shown.length === matches.length;
    grid.replaceChildren();
    for (const image of shown) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'image-library-card';
      button.setAttribute('aria-label', 'Chọn ảnh ' + image.name);
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
    preview.onload = () => { if (selected === image) { insert.disabled = uploading; message('Ảnh đã chọn. Bấm Chèn ảnh để thêm vào nội dung.'); } };
    preview.onerror = () => { if (selected === image) { insert.disabled = true; message('Không đọc được ảnh này. Chọn ảnh khác hoặc tải ảnh mới.', true); } };
    preview.src = image.src;
    find('.image-selection-name').textContent = image.name;
    find('.image-selection-details').textContent = groupLabel(image.folder) + ' · ' + (image.bytes < 1024 * 1024 ? Math.ceil(image.bytes / 1024) + ' KB' : (image.bytes / 1024 / 1024).toFixed(1) + ' MB');
    caption.disabled = false;
    caption.value = label;
  }
  async function load() {
    const current = generation;
    retry.hidden = true;
    count.textContent = 'Đang tải thư viện…';
    try {
      const response = await fetch('/api/images', { headers: { 'X-Editor-Token': getSession().token }, signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không tải được thư viện.');
      if (current !== generation || !dialog.open) return;
      images = data.images;
      if (selected && !images.some(image => image.src === selected.src)) images.unshift(selected);
      updateFolders(); render();
    } catch (error) {
      if (current !== generation || !dialog.open) return;
      count.textContent = 'Chưa tải được thư viện'; retry.hidden = false;
      message(error.message + ' Bạn có thể thử lại hoặc tải ảnh từ máy.', true);
    }
  }
  async function upload(file) {
    if (!file || uploading) return;
    if (file.size > 20 * 1024 * 1024) return message('Mỗi ảnh cần nhỏ hơn hoặc bằng 20 MB.', true);
    if (!/\.(png|jpe?g|gif|webp)$/i.test(file.name)) return message('Chọn ảnh PNG, JPG, GIF hoặc WebP.', true);
    uploading = true; uploadButton.disabled = true; insert.disabled = true;
    dialog.setAttribute('aria-busy', 'true');
    message('Đang thêm ảnh vào thư viện…');
    const objectURL = URL.createObjectURL(file);
    try {
      const check = new Image(); check.src = objectURL;
      try { await check.decode(); } catch { throw new Error('Không đọc được ảnh. Chọn một tệp ảnh khác.'); }
      const response = await fetch('/api/images', {
        method: 'POST', headers: { 'X-Editor-Token': getSession().token, 'X-Image-Name': encodeURIComponent(file.name), 'Content-Type': file.type || 'application/octet-stream' },
        body: file, signal: AbortSignal.timeout(60000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không tải được ảnh. Hãy thử lại.');
      images = [data.image, ...images.filter(image => image.src !== data.image.src)];
      updateFolders(); search.value = ''; folder.value = 'uploads'; limit = 60;
      render(); scroll.scrollTop = 0;
      choose(data.image, displayName(file.name));
      message('Đã thêm ảnh vào thư viện. Bấm Chèn ảnh để đưa vào nội dung.');
    } catch (error) { message(error.message, true); }
    finally {
      URL.revokeObjectURL(objectURL);
      uploading = false; uploadButton.disabled = false; fileInput.value = '';
      dialog.removeAttribute('aria-busy');
      insert.disabled = !selected || !preview.complete || !preview.naturalWidth;
    }
  }
  function close() {
    if (uploading) { message('Đang lưu ảnh vào thư viện. Vui lòng đợi hoàn tất.'); return; }
    dialog.close();
  }
  find('.image-picker-close').onclick = close;
  find('.image-picker-cancel').onclick = close;
  dialog.addEventListener('cancel', event => { if (uploading) { event.preventDefault(); message('Đang lưu ảnh vào thư viện. Vui lòng đợi hoàn tất.'); } });
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
    if (event.dataTransfer.files.length !== 1) return message('Thêm từng ảnh để xem trước và chọn vị trí chèn.', true);
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
      message('Ảnh được chèn tại vị trí con trỏ trong nội dung.');
      dialog.showModal();
      if (images.length) render();
      load(); search.focus();
    },
  };
}
