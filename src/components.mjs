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
  const togglePrefix = doc.id === "kickstarter" ? "Toggle section: " : "Mở hoặc thu gọn: ";
  const emptyNote = doc.id === "kickstarter" ? "No sections." : "Chưa có mục.";
  function renderNodes(nodes, depth = 0) {
    return nodes.map((item) => {
      const expanded = depth === 0;
      const childrenId = `toc-children-${item.id}`;
      return `<li class="toc-item">
        <div class="toc-row" style="--toc-depth: ${depth}">
          ${item.children.length
            ? `<button class="toc-branch-toggle" type="button" aria-expanded="${expanded}" aria-controls="${childrenId}" aria-label="${togglePrefix}${escapeAttribute(item.text)}"><span aria-hidden="true">›</span></button>`
            : '<span class="toc-leaf-spacer" aria-hidden="true"></span>'}
          <a class="toc-link toc-level-${item.level}" href="#${item.id}">${item.textFr ? `<span class="ks-lang-en">${escapeHtml(item.text)}</span><span class="ks-lang-fr" lang="fr">${escapeHtml(item.textFr)}</span>` : escapeHtml(item.text)}</a>
        </div>
        ${item.children.length ? `<ol id="${childrenId}"${expanded ? "" : " hidden"}>${renderNodes(item.children, depth + 1)}</ol>` : ""}
      </li>`;
    }).join("");
  }
  return roots.length ? `<ol class="toc-tree">${renderNodes(roots)}</ol>` : `<p class="empty-note">${emptyNote}</p>`;
}

export function renderIndex(doc) {
  if (doc.id === "kickstarter") {
    return `<aside class="toc-panel" aria-label="Contents: ${escapeAttribute(doc.label)}">
    <button class="toc-mobile-toggle" type="button" aria-expanded="false" aria-controls="toc-content-${doc.id}">
      <span><span class="ks-lang-en">Contents</span><span class="ks-lang-fr" lang="fr">Sommaire</span></span><span class="toc-current">${escapeHtml(doc.label)}</span><span class="toc-mobile-chevron" aria-hidden="true">⌄</span>
    </button>
    <div class="toc-content" id="toc-content-${doc.id}">
      <div class="ks-lang-switcher ks-lang-switcher--compact" role="group" aria-label="Language / Langue"><button type="button" class="ks-lang-btn is-active" data-ks-lang-btn="en" aria-pressed="true">EN</button><button type="button" class="ks-lang-btn" data-ks-lang-btn="fr" aria-pressed="false">FR</button></div>
      <div class="toc-header"><p class="toc-title"><span class="ks-lang-en">Contents</span><span class="ks-lang-fr" lang="fr">Sommaire</span></p><span>${doc.toc.length}</span></div>
      <label class="toc-filter-label"><span class="ks-lang-en">Filter</span><span class="ks-lang-fr" lang="fr">Filtrer</span>
        <input class="toc-filter" type="search" placeholder="Section…" autocomplete="off">
      </label>
      <div class="toc-actions">
        <button type="button" data-toc-expand="true"><span class="ks-lang-en">Expand all</span><span class="ks-lang-fr" lang="fr">Tout déplier</span></button>
        <button type="button" data-toc-expand="false"><span class="ks-lang-en">Collapse</span><span class="ks-lang-fr" lang="fr">Tout replier</span></button>
      </div>
      <nav class="toc-scroll" aria-label="Sections in ${escapeAttribute(doc.label)}">${renderToc(doc)}</nav>
      <p class="toc-empty" role="status" hidden><span class="ks-lang-en">No matching sections.</span><span class="ks-lang-fr" lang="fr">Aucune section trouvée.</span></p>
    </div>
  </aside>`.replace(/[ \t]+$/gm, "");
  }
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
  const isKs = doc.id === "kickstarter";
  const headingHtml = isKs
    ? `          <p class="eyebrow"><span class="ks-lang-en">Campaign pitch</span><span class="ks-lang-fr" lang="fr">Présentation de la campagne</span></p>
          <h2 id="tab-title-${doc.id}"><span class="ks-lang-en">Kickstarter Campaign</span><span class="ks-lang-fr" lang="fr">Campagne Kickstarter</span></h2>
          <p class="doc-summary"><span class="ks-lang-en">${escapeHtml(doc.summary)}</span><span class="ks-lang-fr" lang="fr">Présentation du jeu : combats, deck de compétences & Vesliction, synergie d'escouade, combattants jouables, histoire et musique.</span></p>
          <div class="ks-lang-switcher" role="group" aria-label="Language / Langue"><button type="button" class="ks-lang-btn is-active" data-ks-lang-btn="en" aria-pressed="true">EN · English</button><button type="button" class="ks-lang-btn" data-ks-lang-btn="fr" aria-pressed="false">FR · Français</button></div>`
    : `          <p class="eyebrow">${escapeHtml(doc.eyebrow)}</p>
          <h2 id="tab-title-${doc.id}">${escapeHtml(doc.label)}</h2>
          <p class="doc-summary">${escapeHtml(doc.summary)}</p>`;
  return `
    <section class="doc-pane${index === 0 ? " is-active" : ""}" id="pane-${doc.id}" data-doc="${doc.id}"${isKs ? ' data-ks-lang="en"' : ''} aria-labelledby="tab-title-${doc.id}">
      <div class="doc-intro">
        <div class="doc-heading">
${headingHtml}
        </div>
        <dl class="doc-stats" aria-label="${escapeAttribute(doc.label)} statistics">
          <div><dt>Read</dt><dd>${doc.readMinutes} min</dd></div>
          <div><dt>Sections</dt><dd>${doc.sections}</dd></div>
          <div><dt>Tables</dt><dd>${doc.tables}</dd></div>
        </dl>
${doc.id === "gameplay" ? '        <div class="doc-editor-row"><button class="web-edit-button" id="web-edit-start" type="button">✎ Edit document</button><p class="web-edit-note" id="web-edit-note">Edit and save for the team.</p></div>' : ''}
      </div>



      <div class="doc-layout">
        ${renderIndex(doc)}
        <article class="markdown-body" data-search-root="${doc.id}">
          ${doc.html}
        </article>
      </div>
    </section>`;
}
