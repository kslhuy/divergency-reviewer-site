import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = name => {
  const installed = new URL('../scripts/' + name, import.meta.url);
  return readFileSync(existsSync(installed) ? installed : new URL('./' + name, import.meta.url), 'utf8');
};
const installedHTML = new URL('../content/character-power.html', import.meta.url);
const html = readFileSync(existsSync(installedHTML) ? installedHTML : new URL('./character-power.html', import.meta.url), 'utf8');
// DOM test adapter for the retained form and event wiring; no browser/network involved.
function boot(saved = new Map(), brokenStorage = false) {
  class Element {
    constructor(tag = 'div', attrs = {}) {
      this.tagName = tag.toUpperCase(); this.id = attrs.id || ''; this.name = attrs.name || '';
      this.dataset = Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith('data-')).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, char) => char.toUpperCase()), value]));
      this.value = attrs.value || ''; this.checked = 'checked' in attrs; this.disabled = 'disabled' in attrs;
      this.children = []; this.handlers = {}; this.attrs = { ...attrs }; this.style = {}; this.textContent = ''; this.classList = { toggle() {} };
    }
    setAttribute(key, value) { this.attrs[key] = value; }
    addEventListener(type, callback) { (this.handlers[type] ||= []).push(callback); }
    dispatchEvent(event) { event.target ||= this; for (const callback of this.handlers[event.type] || []) callback(event); return true; }
    querySelector(selector) { if (selector === '.node-status') return this.status ||= new Element(); if (this.id === 'character-power-calculator' && selector === '.power-results') return result; if (selector === '.power-calc-source') return calcSource; return ids.get(selector.slice(1)) || null; }
    querySelectorAll(selector) { return all.filter(element => selector === '[data-mastery-character]' ? !!element.dataset.masteryCharacter : selector === '[data-mastery-tier]' ? element.dataset.masteryTier !== undefined : false); }
    closest(selector) { return selector === 'button' && this.tagName === 'BUTTON' ? this : null; }
    contains() { return true; }
    append(...elements) { this.children.push(...elements); }
    replaceChildren(...elements) { this.children = elements; }
    scrollIntoView() {}
  }
  const ids = new Map(), all = [], fields = new Map();
  for (const [, tag, raw] of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)) {
    const attrs = {};
    for (const [, name, value] of raw.matchAll(/([a-zA-Z][\w:-]*)(?:\s*=\s*"([^"]*)")?/g)) attrs[name] = value ?? '';
    if (!attrs.id && !attrs.name && !attrs['data-mastery-character'] && attrs['data-mastery-tier'] === undefined) continue;
    const element = new Element(tag, attrs); all.push(element);
    if (attrs.id) ids.set(attrs.id, element);
    if (attrs.name) fields.set(attrs.name, element);
  }
  const result = new Element(), calcSource = new Element();
  const form = ids.get('character-power-calculator');
  form.elements = { namedItem: name => fields.get(name) || null };
  const document = { getElementById: id => ids.get(id), createElement: tag => new Element(tag) };
  class Event { constructor(type, options = {}) { this.type = type; Object.assign(this, options); } preventDefault() {} }
  const context = vm.createContext({ document, Event, CustomEvent: Event, queueMicrotask: callback => callback(), matchMedia: () => ({ matches: true }),
    localStorage: { getItem(key) { if (brokenStorage) throw Error('blocked'); return saved.get(key) || null; }, setItem(key, value) { if (brokenStorage) throw Error('blocked'); saved.set(key, value); } },
  });
  for (const file of ['skill-mastery-model.js', 'character-power.js', 'skill-mastery-studio.js']) vm.runInContext(source(file), context, { filename: file });
  const studio = ids.get('skill-mastery-studio-app');
  const click = (id, dataset) => {
    const button = dataset ? Object.assign(new Element('button'), { dataset }) : ids.get(id);
    if (!button.disabled) studio.dispatchEvent(new Event('click', { target: button }));
  };
  const change = (id, value) => { const element = ids.get(id); element.value = value; studio.dispatchEvent(new Event('change', { target: element })); };
  const persisted = () => JSON.parse(saved.get('divergency.mastery.web-review.v2'));
  const calculation = () => Object.fromEntries(result.children[0].children.map(item => item.children.map(element => element.textContent)));
  return { ids, fields, context, click, change, persisted, saved, calculation, input(name, value) { const element = fields.get(name); element.value = value; form.dispatchEvent(new Event('input', { target: element })); }, preview(tier) { click('', { masteryTier: String(tier) }); }, hero(id) { click('', { masteryCharacter: id }); }, branch(id) { click('', { masteryBranch: id }); } };
}
test('studio boots from real markup, preview never unlocks and each hero retains its own selection', () => {
  const ui = boot();
  assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 0);
  ui.preview(3); assert.equal(ui.persisted().view.selections.deep.tier, 3); assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 0);
  assert.equal(ui.ids.get('mastery-equip').disabled, true);
  ui.branch('phantom'); ui.hero('solei');
  assert.equal(ui.persisted().view.selections.solei.tier, 0); assert.equal(ui.persisted().view.selections.solei.branchId, 'storm-eye');
  ui.hero('deep'); assert.equal(ui.persisted().view.selections.deep.branchId, 'phantom');
});
test('AWAKEN checks requirements, charges once and reaches final without wrapping to Base', () => {
  const ui = boot(); assert(ui.ids.get('btn-awaken-action').disabled);
  for (let tier = 1; tier <= 3; tier++) {
    ui.click('mastery-prepare'); assert(!ui.ids.get('btn-awaken-action').disabled);
    ui.click('btn-awaken-action');
    assert.equal(ui.persisted().state.profiles.deep.unlockedTier, tier);
    assert.equal(ui.persisted().state.wallet.amethyst_cluster, 0); assert.equal(ui.persisted().state.wallet.bronze_shard, 0);
  }
  assert(ui.ids.get('btn-awaken-action').disabled); ui.click('btn-awaken-action');
  assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 3);
});
test('failed challenge batches do not sneak additional uses into progression', () => {
  const ui = boot(); ui.ids.get('mastery-batch').value = '20'; ui.click('mastery-task');
  assert.equal(ui.persisted().state.profiles.deep.tasks, 5); assert.equal(ui.persisted().state.profiles.deep.uses, 5);
  ui.click('mastery-task'); assert.equal(ui.persisted().state.profiles.deep.uses, 5);
  ui.click('mastery-zero-hit'); assert.equal(ui.persisted().state.profiles.deep.uses, 5);
});
test('branch/socket metrics and calculator derive from the same build while keeping target separate', () => {
  const ui = boot();
  ui.preview(3); ui.branch('phantom'); ui.change('relic-infusion-select', 'gladiator_blade_essence');
  ui.change('mastery-target', 'boss');
  ui.fields.get('rage').checked = true; ui.fields.get('stone').checked = true;
  ui.click('btn-sync-to-calc');
  assert.equal(ui.fields.get('guard').value, 100); assert.equal(ui.fields.get('weight').value, 100);
  assert.equal(ui.fields.get('rage').checked, false); assert.equal(ui.fields.get('stone').checked, false);
  const expected = ui.context.DivergencyMastery.deriveBuild('deep', 3, 'phantom', 'gladiator_blade_essence', { guard: 100, weight: 100 });
  assert.equal(ui.fields.get('power').value, expected.power); assert.equal(ui.fields.get('bdefense').value, expected.bdefense);
  assert.equal(ui.calculation()['Damage kỳ vọng / cast / 1 mục tiêu'], expected.expected.toLocaleString('vi-VN', { maximumFractionDigits: 3 }) + ' HP');
  ui.input('guard', '77'); assert.equal(ui.persisted().view.target, 'custom'); assert.equal(ui.persisted().view.customGuard, 77);
  ui.click('btn-sync-to-calc'); assert.equal(ui.fields.get('guard').value, '77');
  ui.hero('tulas'); ui.preview(3); ui.click('btn-sync-to-calc');
  assert.equal(ui.fields.get('hits').value, 2); assert.equal(ui.fields.get('damage').value, 12);
});
test('reload restores unlock/selection/target, reset has undo and calculator reset does not reset mastery', () => {
  const first = boot(); first.click('mastery-prepare'); first.click('btn-awaken-action'); first.preview(3); first.branch('phantom'); first.change('mastery-target', 'boss');
  const ui = boot(first.saved);
  assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 1); assert.equal(ui.persisted().view.selections.deep.tier, 3); assert.equal(ui.fields.get('guard').value, 100);
  ui.click('mastery-reset'); assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 0); assert.equal(ui.fields.get('guard').value, 0);
  ui.click('mastery-undo'); assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 1); assert.equal(ui.fields.get('guard').value, 100);
  ui.ids.get('character-power-calculator').dispatchEvent(new ui.context.Event('reset'));
  assert.equal(ui.persisted().state.profiles.deep.unlockedTier, 1);
});
test('corrupt save and storage denied still render a usable isolated review', () => {
  const saved = new Map([['divergency.mastery.web-review.v2', 'not-json']]);
  const recovered = boot(saved); assert.equal(recovered.persisted().state.profiles.deep.unlockedTier, 0);
  const denied = boot(new Map(), true);
  assert.match(denied.ids.get('mastery-save-status').textContent, /không cho lưu/);
  denied.preview(3); assert.match(denied.ids.get('mastery-preview-status').textContent, /Ascended/);
});
