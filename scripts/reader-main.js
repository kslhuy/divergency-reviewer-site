
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

    document.querySelectorAll("[data-pitch-lang]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.pitchLang === curLang);
    });

    document.querySelectorAll("[data-pitch-pillar]").forEach((btn) => {
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

initPitchControls();
