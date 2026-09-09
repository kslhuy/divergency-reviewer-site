// Embedded by build-reviewer-html.mjs so the exported HTML also works offline.
const readerNavigation = (() => {
  const toolbar = document.querySelector('.toolbar');
  const compact = window.matchMedia('(max-width: 1040px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const entries = new Map();
  let active = null;
  let frame = 0;
  let headingOffset = 126;

  const normalize = (value) => value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().trim();

  function setBranch(button, expanded) {
    button.setAttribute('aria-expanded', String(expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
  }

  function setDrawer(entry, open, returnFocus = false) {
    entry.panel.classList.toggle('is-open', open);
    entry.toggle.setAttribute('aria-expanded', String(open));
    if (returnFocus) entry.toggle.focus({ preventScroll: true });
  }

  function measure() {
    const top = toolbar.offsetHeight + 16;
    const drawerHeight = compact.matches && active ? active.toggle.offsetHeight : 0;
    headingOffset = top + drawerHeight + 16;
    document.documentElement.style.setProperty('--reader-top', top + 'px');
    document.documentElement.style.setProperty('--heading-offset', headingOffset + 'px');
    schedule();
  }

  function revealLink(entry, link) {
    if (entry.filter.value.trim()) return;
    let item = link.closest('.toc-item');
    const ownToggle = item.querySelector(':scope > .toc-row > .toc-branch-toggle');
    if (ownToggle) setBranch(ownToggle, true);
    for (let parent = item.parentElement; entry.panel.contains(parent); parent = parent.parentElement) {
      if (parent.matches('ol[id]')) {
        setBranch(parent.parentElement.querySelector(':scope > .toc-row > .toc-branch-toggle'), true);
      }
    }
    if (entry.scroll.matches(':hover') || entry.panel.contains(document.activeElement)) return;
    const bounds = entry.scroll.getBoundingClientRect();
    const row = link.getBoundingClientRect();
    if (bounds.height && (row.top < bounds.top || row.bottom > bounds.bottom)) {
      // Scroll only the index; scrollIntoView here would also move the article.
      entry.scroll.scrollTop += row.top - bounds.top - bounds.height / 3;
    }
  }

  function mark(entry, index) {
    if (entry.index === index || !entry.links[index]) return;
    entry.links.forEach((link, position) => {
      if (position === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    entry.index = index;
    const link = entry.links[index];
    entry.current.textContent = link.textContent;
    entry.current.title = link.textContent;
    revealLink(entry, link);
  }

  function update() {
    frame = 0;
    if (!active || !active.targets.length) return;
    // Heading order is stable; live positions account for lazy-loaded images.
    let low = 0;
    let high = active.targets.length - 1;
    let current = 0;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      if (active.targets[middle].getBoundingClientRect().top <= headingOffset + 8) {
        current = middle;
        low = middle + 1;
      } else high = middle - 1;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
      current = active.targets.length - 1;
    }
    mark(active, current);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function jumpTo(target, focus = false) {
    if (active) setDrawer(active, false);
    measure();
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      if (focus) target.focus({ preventScroll: true });
      schedule();
    });
  }

  function filterIndex(entry) {
    const query = normalize(entry.filter.value);
    const branches = Array.from(entry.panel.querySelectorAll('.toc-branch-toggle'));
    if (query && !entry.savedBranches) {
      entry.savedBranches = branches.map(button => [button, button.getAttribute('aria-expanded') === 'true']);
    }
    function visit(item, parentMatches = false) {
      const link = item.querySelector(':scope > .toc-row > .toc-link');
      const matches = parentMatches || normalize(link.textContent).includes(query);
      const children = Array.from(item.querySelectorAll(':scope > ol > .toc-item'));
      const visibleChildren = children.map(child => visit(child, matches)).some(Boolean);
      const visible = matches || visibleChildren;
      item.hidden = !visible;
      const toggle = item.querySelector(':scope > .toc-row > .toc-branch-toggle');
      if (query && toggle) setBranch(toggle, visibleChildren);
      return visible;
    }
    const visible = Array.from(entry.scroll.querySelectorAll(':scope > ol > .toc-item'))
      .map(item => visit(item)).some(Boolean);
    entry.panel.querySelector('.toc-empty').hidden = visible;
    entry.panel.querySelectorAll('[data-toc-expand]').forEach(button => { button.disabled = Boolean(query); });
    if (!query && entry.savedBranches) {
      entry.savedBranches.forEach(([button, expanded]) => setBranch(button, expanded));
      entry.savedBranches = null;
      if (entry.links[entry.index]) revealLink(entry, entry.links[entry.index]);
    }
  }

  function registerPanel(panel) {
    const links = Array.from(panel.querySelectorAll('.toc-link'));
    const entry = {
      panel, links,
      targets: links.map(link => document.getElementById(link.hash.slice(1))),
      toggle: panel.querySelector('.toc-mobile-toggle'),
      current: panel.querySelector('.toc-current'),
      filter: panel.querySelector('.toc-filter'),
      scroll: panel.querySelector('.toc-scroll'),
      index: -1,
      savedBranches: null,
    };
    entries.set(panel.closest('.doc-pane').dataset.doc, entry);
    entry.toggle.addEventListener('click', () => {
      const open = !panel.classList.contains('is-open');
      setDrawer(entry, open);
      if (open) {
        entry.filter.focus({ preventScroll: true });
        const selected = links[entry.index];
        if (selected && !entry.filter.value.trim()) {
          const bounds = entry.scroll.getBoundingClientRect();
          entry.scroll.scrollTop += selected.getBoundingClientRect().top - bounds.top - bounds.height / 3;
        }
      }
    });
    panel.querySelectorAll('.toc-branch-toggle').forEach(button => {
      button.addEventListener('click', () => setBranch(button, button.getAttribute('aria-expanded') !== 'true'));
    });
    panel.querySelectorAll('[data-toc-expand]').forEach(button => {
      button.addEventListener('click', () => {
        panel.querySelectorAll('.toc-branch-toggle').forEach(branch => setBranch(branch, button.dataset.tocExpand === 'true'));
      });
    });
    links.forEach((link, index) => link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      mark(entry, index);
      jumpTo(entry.targets[index], true);
    }));
    entry.filter.addEventListener('input', () => filterIndex(entry));
    entry.filter.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      const query = normalize(entry.filter.value);
      const first = links.find(link => normalize(link.textContent).includes(query)
        && !link.closest('.toc-item').hidden && !link.closest('ol[hidden]'));
      if (first) { event.preventDefault(); first.click(); }
    });
    panel.addEventListener('keydown', event => {
      if (event.key === 'Escape' && compact.matches && panel.classList.contains('is-open')) {
        event.preventDefault();
        setDrawer(entry, false, true);
      }
    });
    panel.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (compact.matches && !panel.contains(document.activeElement)) setDrawer(entry, false);
      });
    });
  }
  document.querySelectorAll('.toc-panel').forEach(registerPanel);

  document.addEventListener('click', event => {
    if (compact.matches && active && !active.panel.contains(event.target)) setDrawer(active, false);
  });
  document.addEventListener('load', schedule, true);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  compact.addEventListener('change', () => {
    entries.forEach(entry => {
      if (compact.matches && entry.panel.contains(document.activeElement)) setDrawer(entry, true);
      else setDrawer(entry, false);
    });
    measure();
  });
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);
    entries.forEach(entry => observer.observe(entry.toggle));
  }

  return {
    refresh(docId, tree, count) {
      const entry = entries.get(docId);
      if (!entry) return;
      const panel = entry.panel.cloneNode(true);
      panel.querySelector('.toc-scroll').replaceChildren(tree);
      panel.querySelector('.toc-header > span').textContent = count + ' mục';
      panel.querySelector('.toc-filter').value = '';
      panel.querySelector('.toc-empty').hidden = true;
      entry.panel.replaceWith(panel);
      registerPanel(panel);
      if (active === entry) { active = entries.get(docId); measure(); }
    },
    activate(docId) {
      entries.forEach(entry => setDrawer(entry, false));
      active = entries.get(docId) || null;
      if (active) {
        active.index = -1;
        // A previous filter should not conceal sections when returning to a tab.
        active.filter.value = '';
        filterIndex(active);
      }
      measure();
    },
    jumpTo,
  };
})();
