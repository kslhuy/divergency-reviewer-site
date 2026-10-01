import * as config from './site-config.mjs';
import { escapeHtml, escapeAttribute } from './html.mjs';
import { renderTabs, renderPane, renderHeroStats } from './components.mjs';
import { collectGalleryGroups, renderGalleryPane } from './gallery.mjs';
import { collectImageSlots, imageSlots } from './images.mjs';
const { siteUrl, siteTitle, siteDescription, siteImage, facebookUrl, bilibiliUrl, youtubeUrl, xUrl, instagramUrl, kickstarterUrl, galleryTab } = config;

export function buildPage(docs) {
  const galleryGroups = collectGalleryGroups();
  const tabs = renderTabs([...docs, galleryTab]);
  const panes = [...docs.map(renderPane), renderGalleryPane(galleryGroups)].join("\n");
  const docIds = [...docs.map((doc) => doc.id), galleryTab.id];
  const allImageSlots = collectImageSlots();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(siteTitle)}</title>
  <meta name="description" content="${escapeAttribute(siteDescription)}">
  <link rel="canonical" href="${siteUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeAttribute(siteTitle)}">
  <meta property="og:description" content="${escapeAttribute(siteDescription)}">
  <meta property="og:url" content="${siteUrl}">
  <meta property="og:image" content="${siteImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttribute(siteTitle)}">
  <meta name="twitter:description" content="${escapeAttribute(siteDescription)}">
  <meta name="twitter:image" content="${siteImage}">
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "TriLinkage",
        url: siteUrl,
        sameAs: [facebookUrl, bilibiliUrl, youtubeUrl, xUrl, instagramUrl],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marseille",
          addressCountry: "FR",
        },
      },
      {
        "@type": "VideoGame",
        "@id": `${siteUrl}#divergency`,
        name: "Divergency",
        description: "A dark fantasy 2.5D tactical brawler with real-time squad commands and a story campaign beginning in Marseille.",
        genre: ["Dark fantasy", "Tactical brawler", "Beat 'em up"],
        operatingSystem: "PC",
        url: siteUrl,
        developer: { "@id": `${siteUrl}#organization` },
        publisher: { "@id": `${siteUrl}#organization` },
      },
    ],
  })}</script>
  <link rel="stylesheet" href="styles/site.css">
  <link rel="stylesheet" href="scripts/gameplay-editor.css">
  <link rel="stylesheet" href="scripts/stage-layouts.css">
  <link rel="stylesheet" href="styles/export.css">
  <link rel="stylesheet" href="styles/workspace.css">
</head>
<body>
  <div class="progress" aria-hidden="true"><span id="read-progress"></span></div>
  <main class="shell">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">TriLinkage studio site</p>
        <h1>Divergency</h1>
        <p>
          A dark fantasy 2.5D tactical brawler from TriLinkage, a small independent
          game studio based in Marseille, France. This site separates the game,
          the studio, the campaign pitch, story, gameplay, rewards, and production notes.
        </p>
        <div class="hero-links" aria-label="Official links">
          <a class="hero-link" href="${facebookUrl}" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a class="hero-link" href="${bilibiliUrl}" target="_blank" rel="noopener noreferrer">Bilibili</a>
          <a class="hero-link" href="${youtubeUrl}" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a class="hero-link" href="${xUrl}" target="_blank" rel="noopener noreferrer">X</a>
          <a class="hero-link" href="${instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a class="hero-link" href="${kickstarterUrl}" target="_blank" rel="noopener noreferrer">Kickstarter</a>
          <a class="hero-link" href="steam-image-tool.html">Steam image formatter</a>
        </div>
        ${renderHeroStats()}
      </div>
    </header>

    <section class="toolbar" aria-label="Document controls">
      <nav class="tabs" aria-label="Document tabs">
        ${tabs}
      </nav>
      <div class="actions">
        <label class="search-wrap">
          <input id="doc-search" type="search" placeholder="Search">
        </label>
        <span class="search-count" id="search-count">0 hits</span>
        <div class="export-quick-actions" aria-label="Export current document">
          <button type="button" data-md-action="copy">Copy MD</button>
          <button type="button" data-md-action="download">Download .md</button>
          <button type="button" data-md-action="preview" title="Preview Markdown or choose a section">Sections…</button>
        </div>
        <span class="md-quick-status" role="status" aria-live="polite"></span>
      </div>
    </section>

    ${panes}
  </main>

  <button class="web-edit-fab" id="web-edit-fab" type="button" title="Edit gameplay (Ctrl+Shift+E)"><span aria-hidden="true">✎</span> <span class="web-edit-fab-label">Edit gameplay</span></button>

  <div class="lightbox" id="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded image viewer" hidden>
    <div class="lightbox-panel">
      <button class="lightbox-close" type="button" id="lightbox-close" aria-label="Close image viewer" title="Close image viewer">&times;</button>
      <button class="lightbox-nav lightbox-prev" type="button" id="lightbox-prev" aria-label="Previous image" title="Previous image">&larr;</button>
      <button class="lightbox-nav lightbox-next" type="button" id="lightbox-next" aria-label="Next image" title="Next image">&rarr;</button>
      <img class="lightbox-image" id="lightbox-image" src="" alt="">
      <p class="lightbox-caption" id="lightbox-caption"></p>
    </div>
  </div>

  <!--
    EASY IMAGE EDIT:
    1. This page automatically includes supported image files under Campaign/Kickstarter/imgs.
    2. Nested imgs/UI folders are skipped in both Visual Slots and Gallery.
    3. Add image paths to IMAGE_SLOTS to pin priority images before the auto-discovered list.
    4. Leave src empty only when you want to keep a placeholder box.
  -->
  <script>
    const DOC_IDS = ${JSON.stringify(docIds)};
    const IMAGE_SLOTS = ${JSON.stringify(imageSlots)};
    const ALL_IMAGE_SLOTS = ${JSON.stringify(allImageSlots)};
  </script>
  <script defer src="scripts/reader-core.js"></script>
  <script defer src="scripts/reader-navigation.js"></script>
  <script defer src="scripts/reader-main.js"></script>
  <script defer src="scripts/stage-layouts.js"></script>
  <script defer src="scripts/online-controls.js"></script>
  <script defer src="scripts/image-picker.js"></script>
  <script defer src="scripts/merge-gameplay.js"></script>
  <script defer src="scripts/gameplay-editor.js"></script>
  <script defer src="scripts/markdown-export.js"></script>
</body>
</html>`;
}
