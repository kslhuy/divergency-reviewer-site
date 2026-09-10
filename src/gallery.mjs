import { galleryTab } from './site-config.mjs';
import { escapeHtml, escapeAttribute } from './html.mjs';
import { renderIndex } from './components.mjs';
import { collectImageSlots, galleryFolderOrder, galleryFolderLabels, readableName, excludedGalleryImageSlots, excludedGalleryImageFolders } from './images.mjs';
export function galleryGroupId(key) {
  return `gallery-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function galleryGroupForSlot(slot) {
  const parts = slot.src.split("/");
  const topFolder = parts[1] || "others";
  const orderIndex = galleryFolderOrder.indexOf(topFolder);

  return {
    key: topFolder,
    id: galleryGroupId(topFolder),
    label: galleryFolderLabels.get(topFolder) || readableName(topFolder),
    order: orderIndex === -1 ? galleryFolderOrder.length : orderIndex,
  };
}

export function collectGalleryGroups() {
  const groups = new Map();
  const gallerySlots = collectImageSlots({
    includeExcluded: true,
    includeNestedUi: false,
    galleryCaptions: true,
  });

  gallerySlots
    .filter((slot) => (
      !excludedGalleryImageSlots.has(slot.src) &&
      !excludedGalleryImageFolders.some((folder) => slot.src.startsWith(folder))
    ))
    .forEach((slot) => {
      const groupInfo = galleryGroupForSlot(slot);
      if (!groups.has(groupInfo.key)) {
        groups.set(groupInfo.key, {
          ...groupInfo,
          slots: [],
        });
      }

      groups.get(groupInfo.key).slots.push(slot);
    });

  return [...groups.values()].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.label.localeCompare(b.label, undefined, { numeric: true });
  });
}

export function renderGalleryImage(slot) {
  const src = escapeAttribute(slot.src);
  const caption = escapeHtml(slot.caption || "Divergency image");
  const captionAttr = escapeAttribute(slot.caption || "Divergency image");
  const alt = escapeAttribute(slot.alt || slot.caption || "Divergency image");

  return `
          <figure class="gallery-slot">
            <button class="gallery-image-button" type="button" data-lightbox-src="${src}" data-lightbox-alt="${alt}" data-lightbox-caption="${captionAttr}" aria-label="View larger image: ${captionAttr}">
              <img src="${src}" alt="${alt}" loading="lazy">
            </button>
            <figcaption>${caption}</figcaption>
          </figure>`;
}

export function renderGalleryPane(groups) {
  const imageCount = groups.reduce((total, group) => total + group.slots.length, 0);
  const sections = groups
    .map(
      (group) => `
      <section class="gallery-section" id="${group.id}" tabindex="-1" aria-labelledby="${group.id}-title">
        <div class="gallery-section-head">
          <h3 id="${group.id}-title">${escapeHtml(group.label)}</h3>
          <span>${group.slots.length} images</span>
        </div>
        <div class="gallery-grid" data-gallery-grid="${escapeAttribute(group.key)}">
${group.slots.map(renderGalleryImage).join("")}
        </div>
      </section>`,
    )
    .join("");

  return `
    <section class="doc-pane gallery-pane" id="pane-${galleryTab.id}" data-doc="${galleryTab.id}" aria-labelledby="tab-title-${galleryTab.id}">
      <div class="doc-intro">
        <div>
          <p class="eyebrow">${escapeHtml(galleryTab.eyebrow)}</p>
          <h2 id="tab-title-${galleryTab.id}">${escapeHtml(galleryTab.label)}</h2>
          <p>${escapeHtml(galleryTab.summary)}</p>
        </div>
        <dl class="doc-stats" aria-label="${escapeAttribute(galleryTab.label)} statistics">
          <div><dt>Folders</dt><dd>${groups.length}</dd></div>
          <div><dt>Images</dt><dd>${imageCount}</dd></div>
          <div><dt>Order</dt><dd>Folder</dd></div>
        </dl>
      </div>

      <div class="doc-layout">
        ${renderIndex({ ...galleryTab, toc: groups.map(group => ({ id: group.id, level: 2, text: group.label })) })}
        <div class="gallery-body">
${sections || '<p class="empty-note">No images found.</p>'}
        </div>
      </div>
    </section>`;
}

