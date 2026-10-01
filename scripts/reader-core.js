const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const panes = Array.from(document.querySelectorAll(".doc-pane"));
const searchInput = document.getElementById("doc-search");
const searchCount = document.getElementById("search-count");
const progress = document.getElementById("read-progress");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
let lastFocusedElement = null;
let lightboxItems = [];
let lightboxIndex = -1;

function mergedImageSlots(docSlots) {
  const seen = new Set();
  return [...(docSlots || []), ...ALL_IMAGE_SLOTS].filter((slot) => {
    if (!slot.src) return true;
    if (seen.has(slot.src)) return false;
    seen.add(slot.src);
    return true;
  });
}

function mediaElements(docId) {
  return {
    grid: document.querySelector('[data-media-grid="' + docId + '"]'),
    count: document.querySelector('[data-media-count="' + docId + '"]'),
    prev: document.querySelector('[data-media-prev="' + docId + '"]'),
    next: document.querySelector('[data-media-next="' + docId + '"]'),
  };
}

function renderMediaSlot(slot) {
  const caption = escapeHtml(slot.caption || "Add image");
  const alt = escapeHtml(slot.alt || slot.caption || "Divergency image");
  if (slot.src) {
    const src = escapeHtml(slot.src);
    return '<figure class="media-slot"><button class="media-image-button" type="button" data-lightbox-src="' + src + '" data-lightbox-alt="' + alt + '" data-lightbox-caption="' + caption + '" aria-label="View larger image: ' + caption + '"><img src="' + src + '" alt="' + alt + '" loading="lazy"></button><figcaption>' + caption + '</figcaption></figure>';
  }
  return '<figure class="media-slot"><div class="media-placeholder"><span>Image slot<br>Add path in IMAGE_SLOTS</span></div><figcaption>' + caption + '</figcaption></figure>';
}

function renderImageSlots() {
  DOC_IDS.forEach((docId) => {
    const slots = mergedImageSlots(IMAGE_SLOTS[docId]);
    const { grid } = mediaElements(docId);
    if (!grid) return;
    grid.innerHTML = slots.map(renderMediaSlot).join("");
    updateMediaControls(docId);
  });
}

function updateMediaControls(docId) {
  const { grid, count, prev, next } = mediaElements(docId);
  if (!grid || !count || !prev || !next) return;

  const total = grid.children.length;
  if (!total) {
    count.textContent = "0 / 0";
    prev.disabled = true;
    next.disabled = true;
    return;
  }

  const item = grid.querySelector(".media-slot");
  const styles = window.getComputedStyle(grid);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  const itemWidth = item?.getBoundingClientRect().width || grid.clientWidth || 1;
  const step = itemWidth + gap;
  const visible = Math.max(1, Math.floor((grid.clientWidth + gap) / step));
  const start = Math.min(total, Math.max(1, Math.round(grid.scrollLeft / step) + 1));
  const end = Math.min(total, start + visible - 1);
  const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth - 2);

  count.textContent = start === end ? start + " / " + total : start + "-" + end + " / " + total;
  prev.disabled = grid.scrollLeft <= 2;
  next.disabled = grid.scrollLeft >= maxScroll;
}

function scrollMedia(docId, direction) {
  const { grid } = mediaElements(docId);
  if (!grid) return;
  const amount = Math.max(240, grid.clientWidth * 0.86);
  grid.scrollBy({ left: amount * direction, behavior: "smooth" });
  window.setTimeout(() => updateMediaControls(docId), 360);
}

function collectLightboxItems(button) {
  const container = button.closest(".media-grid, .gallery-grid");
  const buttons = container
    ? Array.from(container.querySelectorAll("[data-lightbox-src]"))
    : [button];

  return buttons.filter((item) => item.dataset.lightboxSrc);
}

function showLightboxItem(index) {
  if (!lightboxItems.length) return;
  const total = lightboxItems.length;
  lightboxIndex = ((index % total) + total) % total;
  const button = lightboxItems[lightboxIndex];

  lightboxImage.src = button.dataset.lightboxSrc;
  lightboxImage.alt = button.dataset.lightboxAlt || "";
  lightboxCaption.textContent = button.dataset.lightboxCaption || "";
  lightboxPrev.disabled = total < 2;
  lightboxNext.disabled = total < 2;
}

function moveLightbox(direction) {
  if (lightbox.hidden || lightboxItems.length < 2) return;
  showLightboxItem(lightboxIndex + direction);
}

function openLightbox(button) {
  if (!button || !button.dataset.lightboxSrc) return;
  lastFocusedElement = document.activeElement;
  lightboxItems = collectLightboxItems(button);
  lightboxIndex = Math.max(0, lightboxItems.indexOf(button));
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  showLightboxItem(lightboxIndex);
  lightboxClose.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  lightboxItems = [];
  lightboxIndex = -1;
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function activeDocId() {
  return document.querySelector(".doc-pane.is-active")?.dataset.doc || DOC_IDS[0];
}

function clearSearch() {
  document.querySelectorAll(".search-hit").forEach((node) => {
    node.classList.remove("search-hit");
  });
  searchCount.textContent = "0 hits";
}

function runSearch() {
  clearSearch();
  const query = searchInput.value.trim().toLowerCase();
  if (query.length < 2) return;
  const active = document.querySelector(".doc-pane.is-active .markdown-body");
  if (!active) return;
  let hits = 0;
  active.querySelectorAll("p, li, td, th, blockquote").forEach((node) => {
    if (node.textContent.toLowerCase().includes(query)) {
      node.classList.add("search-hit");
      hits += 1;
    }
  });
  searchCount.textContent = hits + (hits === 1 ? " hit" : " hits");
}

