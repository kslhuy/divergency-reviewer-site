import { parseFragment, serialize, serializeOuter } from 'parse5';

// Publication policy is enforced while building and on server responses, never
// by a query parameter or CSS. Local source documents remain complete.
const stageFive = /(?:^|[^a-z0-9])(?:stage|chapter|chuong)[\s_-]*0?5(?![a-z0-9])/i;
const reward = /\brewards?\b|\bpledge[\s_-]*(?:tiers?|manager)\b/i;
const normalized = value => String(value).normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[đĐ]/g, 'd');
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join(' ');
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value || '';
const privateText = value => stageFive.test(normalized(value)) || reward.test(value);

export function isLocalOnlyPath(value) {
  let decoded = String(value);
  try { for (let n = 0; n < 3; n++) { const next = decodeURIComponent(decoded); if (next === decoded) break; decoded = next; } }
  catch { return true; }
  decoded = decoded.replaceAll('\\', '/');
  return stageFive.test(decoded) || /(?:^|[\/_-])rewards?(?:[\/_. -]|$)/i.test(decoded)
    || /(?:^|\/)pledge-tiers(?:\/|$)/i.test(decoded)
    || /(?:^|\/)divergency-(?:ai-)?story-03-cradle-bargain\./i.test(decoded);
}

export function publicContent(html, { documentId = '', retainHidden } = {}) {
  const root = parseFragment(html);
  const originals = new Map(root.childNodes.map(node => [node, serializeOuter(node)]));
  function hiddenHeading(node) {
    const label = normalized(textOf(node)).replace(/^#/, '').trim();
    return privateText(label) || privateText(attr(node, 'id'))
      || (documentId === 'gameplay' && /^5[-.]\d+\b/.test(label))
      || /^(?:Shipping And Fulfillment|Epilogue|Y nghia cai ket|Chu de ket lai)$/i.test(label);
  }
  function privateMedia(node) {
    return (node.attrs || []).some(a => ['src', 'href', 'poster', 'data-lightbox-src'].includes(a.name) && isLocalOnlyPath(a.value))
      || (node.childNodes || []).some(privateMedia);
  }
  function visit(parent) {
    let hiddenLevel = 0;
    parent.childNodes = (parent.childNodes || []).filter(node => {
      const level = /^h[1-6]$/.test(node.tagName || '') ? Number(node.tagName[1]) : 0;
      if (level && hiddenLevel && level <= hiddenLevel) hiddenLevel = 0;
      if (hiddenLevel) return false;
      if (level && hiddenHeading(node)) { hiddenLevel = level; return false; }
      // The campaign's reward section begins with an image banner instead of h2.
      if (node.tagName === 'figure' && (node.childNodes || []).some(n => /\/kick\/Reward\.png$/i.test(attr(n, 'src')))) {
        hiddenLevel = 2;
        return false;
      }
      if (node.nodeName === '#comment') return false;
      if (node.attrs?.some(a => a.name === 'data-local-only')) return false;
      if (['figure', 'a', 'img', 'video', 'source'].includes(node.tagName) && privateMedia(node)) return false;
      if (['p', 'li', 'tr', 'figcaption'].includes(node.tagName) && privateText(textOf(node))) return false;
      visit(node);
      return true;
    });
  }
  visit(root);
  if (retainHidden) {
    for (const [node, original] of originals) {
      if (!root.childNodes.includes(node) || serializeOuter(node) !== original) {
        if (node.nodeName === '#comment' || !original.trim()) continue;
        // Preserve an already retained block without nesting a new wrapper.
        retainHidden.push(node.attrs?.some(a => a.name === 'data-local-only') ? serialize(node) : original);
      }
    }
  }
  return serialize(root);
}

// Public edits must not erase chapters which the editor cannot see. Keep the
// original hidden blocks in a server-only annex, including complete table rows.
export function preserveLocalContent(previous, updated, options = {}) {
  const hidden = [];
  publicContent(previous, { ...options, retainHidden: hidden });
  const visible = publicContent(updated, options);
  return visible + (hidden.length ? `<div data-local-only="true">${hidden.join('')}</div>` : '');
}
