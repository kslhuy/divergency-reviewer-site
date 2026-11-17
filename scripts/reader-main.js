
function activateTab(docId, updateHash = true, scrollTop = true) {
  if (!DOC_IDS.includes(docId)) docId = DOC_IDS[0];
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === docId);
  });
  panes.forEach((pane) => {
    pane.classList.toggle("is-active", pane.dataset.doc === docId);
  });
  readerNavigation.activate(docId);
  runSearch();
  if (updateHash) {
    history.replaceState(null, "", "#" + docId);
  }
  if (scrollTop) {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "instant" : "smooth" });
  }
  requestAnimationFrame(() => updateMediaControls(docId));
}

function openHash() {
  let hash;
  try { hash = decodeURIComponent(window.location.hash.replace(/^#/, "")); }
  catch { return activateTab(DOC_IDS[0], false, false); }
  if (!hash) return activateTab(DOC_IDS[0], false, false);
  if (DOC_IDS.includes(hash)) return activateTab(hash, false, false);
  const target = document.getElementById(hash);
  if (!target) return activateTab(DOC_IDS[0], false, false);
  const pane = target.closest(".doc-pane");
  if (pane) {
    activateTab(pane.dataset.doc, false, false);
    readerNavigation.jumpTo(target);
  }
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  progress.style.width = (current * 100).toFixed(2) + "%";
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});

document.querySelectorAll("[data-media-prev]").forEach((button) => {
  button.addEventListener("click", () => scrollMedia(button.dataset.mediaPrev, -1));
});

document.querySelectorAll("[data-media-next]").forEach((button) => {
  button.addEventListener("click", () => scrollMedia(button.dataset.mediaNext, 1));
});

document.querySelectorAll(".media-grid").forEach((grid) => {
  grid.addEventListener("scroll", () => updateMediaControls(grid.dataset.mediaGrid), { passive: true });
});

document.querySelectorAll(".media-grid, .gallery-grid").forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lightbox-src]");
    if (button) openLightbox(button);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") {
    closeLightbox();
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLightbox(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLightbox(1);
  }
});

searchInput.addEventListener("input", runSearch);
window.addEventListener("hashchange", openHash);
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", () => {
  updateProgress();
  DOC_IDS.forEach(updateMediaControls);
});

renderImageSlots();
openHash();
updateProgress();

function initPitchControls() {
  const pitchPane = document.getElementById("pane-pitch-france");
  if (!pitchPane) return;

  const savedLang = localStorage.getItem("pitch-france-lang") || "fr";
  const savedPillar = localStorage.getItem("pitch-france-pillar") || "all";
  pitchPane.setAttribute("data-pitch-lang", savedLang);
  pitchPane.setAttribute("data-pitch-pillar", savedPillar);

  function syncButtons() {
    const curLang = pitchPane.getAttribute("data-pitch-lang") || "fr";
    const curPillar = pitchPane.getAttribute("data-pitch-pillar") || "all";

    document.querySelectorAll("button[data-pitch-lang]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.pitchLang === curLang);
    });

    document.querySelectorAll("button[data-pitch-pillar]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.pitchPillar === curPillar);
    });
  }

  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest("[data-pitch-lang]");
    if (langBtn) {
      const lang = langBtn.dataset.pitchLang;
      pitchPane.setAttribute("data-pitch-lang", lang);
      localStorage.setItem("pitch-france-lang", lang);
      syncButtons();
      return;
    }

    const pillarBtn = e.target.closest("[data-pitch-pillar]");
    if (pillarBtn) {
      const pillar = pillarBtn.dataset.pitchPillar;
      pitchPane.setAttribute("data-pitch-pillar", pillar);
      localStorage.setItem("pitch-france-pillar", pillar);
      syncButtons();
      return;
    }
  });

  syncButtons();
}

function initItemWikiControls() {
  const searchInput = document.getElementById("item-search-input");
  const pills = document.querySelectorAll(".item-pill");
  const cards = document.querySelectorAll(".item-card");

  if (!searchInput || !cards.length) return;

  let currentCat = "all";
  let searchQuery = "";

  function applyFilter() {
    const q = searchQuery.toLowerCase().trim();
    cards.forEach((card) => {
      const text = (card.textContent || "").toLowerCase();
      const cat = card.getAttribute("data-category") || "";
      const slot = card.getAttribute('data-slot') || '';
      const matchesCat = currentCat === 'all' || cat.includes(currentCat) || slot === currentCat;
      const matchesSearch = !q || text.includes(q);

      if (matchesCat && matchesSearch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    applyFilter();
  });

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      currentCat = pill.getAttribute("data-cat") || "all";
      applyFilter();
    });
  });
}

function initKickstarterControls() {
  const pane = document.getElementById("pane-kickstarter");
  if (!pane) return;

  function applyLang(lang, persist) {
    const next = lang === "fr" ? "fr" : "en";
    pane.setAttribute("data-ks-lang", next);
    document.querySelectorAll("[data-ks-lang-btn]").forEach((btn) => {
      const active = btn.dataset.ksLangBtn === next;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (persist) {
      try { localStorage.setItem("ks-lang", next); } catch {}
    }
  }

  let initial = "en";
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "en" || param === "fr") initial = param;
    else {
      const saved = localStorage.getItem("ks-lang");
      if (saved === "en" || saved === "fr") initial = saved;
    }
  } catch {}

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-ks-lang-btn]");
    if (btn) applyLang(btn.dataset.ksLangBtn, true);
  });

  applyLang(initial, false);
}

initPitchControls();
initKickstarterControls();
initItemWikiControls();

