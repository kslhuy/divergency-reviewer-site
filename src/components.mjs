import { escapeHtml, escapeAttribute } from './html.mjs';
export function renderTabs(tabItems) {
  return tabItems
    .map(
      (doc, index) => `
        <button class="tab-button${index === 0 ? " is-active" : ""}" type="button" data-tab="${doc.id}" title="${escapeAttribute(doc.label)}">
          <span>${escapeHtml(doc.label)}</span>
          <small>${escapeHtml(doc.eyebrow)}</small>
        </button>`,
    )
    .join("");
}

export function renderHeroStats() {
  return `
    <dl class="hero-stats" aria-label="Product and studio identity">
      <div><dt>Product</dt><dd>Divergency</dd></div>
      <div><dt>Studio</dt><dd>TriLinkage</dd></div>
      <div><dt>Base</dt><dd>Marseille, France</dd></div>
      <div><dt>Status</dt><dd>Playable build</dd></div>
    </dl>`;
}

export function renderToc(doc) {
  const roots = [];
  const stack = [];
  for (const item of doc.toc) {
    const node = { ...item, children: [] };
    while (stack.length && stack.at(-1).level >= item.level) stack.pop();
    (stack.length ? stack.at(-1).children : roots).push(node);
    stack.push(node);
  }
  function renderNodes(nodes, depth = 0) {
    return nodes.map((item) => {
      const expanded = depth === 0;
      const childrenId = `toc-children-${item.id}`;
      return `<li class="toc-item">
        <div class="toc-row" style="--toc-depth: ${depth}">
          ${item.children.length
            ? `<button class="toc-branch-toggle" type="button" aria-expanded="${expanded}" aria-controls="${childrenId}" aria-label="Mở hoặc thu gọn: ${escapeAttribute(item.text)}"><span aria-hidden="true">›</span></button>`
            : '<span class="toc-leaf-spacer" aria-hidden="true"></span>'}
          <a class="toc-link toc-level-${item.level}" href="#${item.id}">${escapeHtml(item.text)}</a>
        </div>
        ${item.children.length ? `<ol id="${childrenId}"${expanded ? "" : " hidden"}>${renderNodes(item.children, depth + 1)}</ol>` : ""}
      </li>`;
    }).join("");
  }
  return roots.length ? `<ol class="toc-tree">${renderNodes(roots)}</ol>` : '<p class="empty-note">Chưa có mục.</p>';
}

export function renderIndex(doc) {
  return `<aside class="toc-panel" aria-label="Mục lục: ${escapeAttribute(doc.label)}">
    <button class="toc-mobile-toggle" type="button" aria-expanded="false" aria-controls="toc-content-${doc.id}">
      <span>Mục lục</span><span class="toc-current">${escapeHtml(doc.label)}</span><span class="toc-mobile-chevron" aria-hidden="true">⌄</span>
    </button>
    <div class="toc-content" id="toc-content-${doc.id}">
      <div class="toc-header"><p class="toc-title">Mục lục</p><span>${doc.toc.length} mục</span></div>
      <label class="toc-filter-label">Tìm mục
        <input class="toc-filter" type="search" placeholder="Tên mục hoặc chương…" autocomplete="off">
      </label>
      <div class="toc-actions">
        <button type="button" data-toc-expand="true">Mở tất cả</button>
        <button type="button" data-toc-expand="false">Thu gọn</button>
      </div>
      <nav class="toc-scroll" aria-label="Các mục trong ${escapeAttribute(doc.label)}">${renderToc(doc)}</nav>
      <p class="toc-empty" role="status" hidden>Không tìm thấy mục phù hợp.</p>
    </div>
  </aside>`.replace(/[ \t]+$/gm, "");
}

export function renderPane(doc, index) {
  return `
    <section class="doc-pane${index === 0 ? " is-active" : ""}" id="pane-${doc.id}" data-doc="${doc.id}" aria-labelledby="tab-title-${doc.id}">
      <div class="doc-intro">
        <div class="doc-heading">
          <p class="eyebrow">${escapeHtml(doc.eyebrow)}</p>
          <h2 id="tab-title-${doc.id}">${escapeHtml(doc.label)}</h2>
          <p class="doc-summary">${escapeHtml(doc.summary)}</p>
        </div>
        <dl class="doc-stats" aria-label="${escapeAttribute(doc.label)} statistics">
          <div><dt>Read</dt><dd>${doc.readMinutes} min</dd></div>
          <div><dt>Sections</dt><dd>${doc.sections}</dd></div>
          <div><dt>Tables</dt><dd>${doc.tables}</dd></div>
        </dl>
${doc.id === "gameplay" ? '        <div class="doc-editor-row"><button class="web-edit-button" id="web-edit-start" type="button">✎ Edit document</button><p class="web-edit-note" id="web-edit-note">Edit and save for the team.</p></div>' : ''}
      </div>

      <section class="media-band" aria-label="${escapeAttribute(doc.label)} image slots">
        <div class="media-head">
          <div class="media-head-text">
            <h3>Visual Slots</h3>
            <p>Browse all images found in <code>imgs/</code>. Edit <code>IMAGE_SLOTS</code> to pin priority images first.</p>
          </div>
          <div class="media-controls" aria-label="${escapeAttribute(doc.label)} image carousel controls">
            <button class="media-nav" type="button" data-media-prev="${doc.id}" aria-label="Previous images" title="Previous images">&larr;</button>
            <span class="media-count" data-media-count="${doc.id}">0 / 0</span>
            <button class="media-nav" type="button" data-media-next="${doc.id}" aria-label="Next images" title="Next images">&rarr;</button>
          </div>
        </div>
        <div class="media-strip">
          <div class="media-grid" data-media-grid="${doc.id}"></div>
        </div>
      </section>

      <div class="doc-layout">
        ${renderIndex(doc)}
        <article class="markdown-body" data-search-root="${doc.id}">
          ${doc.html}
        </article>
      </div>
    </section>`;
}
