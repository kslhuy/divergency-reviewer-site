(() => {
  'use strict';
  const M = globalThis.DivergencyMastery;
  const form = document.getElementById('character-power-calculator');
  if (!M || !form) return;
  const result = form.querySelector('.power-results');
  const source = form.querySelector('.power-calc-source');
  const number = (name, min = 0, max = 10000) => {
    const raw = Number(form.elements.namedItem(name)?.value);
    return Math.min(max, Math.max(min, Number.isFinite(raw) ? raw : min));
  };
  const checked = name => form.elements.namedItem(name)?.checked === true;
  const format = value => value.toLocaleString('vi-VN', { maximumFractionDigits: 3 });
  function update() {
    const hits = Array.from({ length: Math.trunc(number('hits', 1, 12)) }, () => number('damage', 1, 100000));
    const data = M.calculateCombat({ hits, power: number('power'), chance: number('chance', 0, 100), critical: number('critical'), guard: number('guard'), weight: number('weight'), agility: number('agility'), bdefense: number('bdefense', 0, 255), fall: number('fall', 0, 255), mana: number('mana', 0, 10000), rage: checked('rage'), strength: checked('strength'), wind: checked('wind'), spring: checked('spring'), stone: checked('stone') });
    const values = [
      ['Damage thường / hit', `${format(data.hits[0].normal)} HP`], ['Damage crit / hit', `${format(data.hits[0].crit)} HP`], ['Damage kỳ vọng / cast / 1 mục tiêu', `${format(data.expected)} HP`],
      ['Số hit nếu đều trúng', String(hits.length)], ['Hệ số damage', `×${format(data.damageMultiplier)}`], ['MP / cast', `${format(data.mana)} MP`],
      ['BDefense nhận', format(data.bdefense)], ['Fall nhận', format(data.fall)], ['Knockback mục tiêu nhận', `×${format(data.knockback)}`],
      ['Di chuyển (Agility/buff)', `×${format(data.move)}`], ['Vận tốc ngang nhảy', `×${format(data.jumpX)}`], ['Vận tốc dọc nhảy', `×${format(data.jumpY)}`], ['Điều khiển trên không', `×${format(data.air)}`],
    ];
    const list = document.createElement('dl');
    for (const [label, value] of values) {
      const item = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = label; dd.textContent = value; item.append(dt, dd); list.append(item);
    }
    result.replaceChildren(list);
  }
  form.addEventListener('divergency:mastery-sync', event => {
    const build = event.detail?.build;
    if (!build || !M.characters[build.characterId]) return;
    const data = { damage: build.character.hits[0], hits: build.hitCount, mana: build.manaRaw, power: build.power, chance: build.critChance, critical: build.critDamage, agility: 0, bdefense: build.bdefense, fall: build.fall };
    for (const [name, value] of Object.entries(data)) form.elements.namedItem(name).value = value;
    for (const name of ['rage', 'strength', 'wind', 'spring', 'stone']) form.elements.namedItem(name).checked = false;
    if (source) source.textContent = `Mẫu thiết kế: ${build.character.name} · ${build.tier.name} · ${build.branch.name} · ${build.relic.name}. Chỉ tính bonus của chiêu; Guard/Weight dưới đây thuộc mục tiêu. Buff thử đã tắt.`;
    update();
  });
  form.addEventListener('input', event => {
    if (source) source.textContent = 'Đang tính tay theo các ô nhập; mỗi hit trong lịch này có cùng damage gốc. Guard và Weight thuộc mục tiêu.';
    update();
    if (['guard', 'weight'].includes(event.target.name)) form.dispatchEvent(new CustomEvent('divergency:target-change', { detail: { guard: number('guard'), weight: number('weight') } }));
  });
  form.addEventListener('change', update);
  form.addEventListener('reset', () => queueMicrotask(() => {
    if (source) source.textContent = 'Đã đặt lại ví dụ tính tay; tiến trình mastery được giữ nguyên.';
    update();
    form.dispatchEvent(new CustomEvent('divergency:target-change', { detail: { guard: number('guard'), weight: number('weight') } }));
  }));
  form.addEventListener('submit', event => event.preventDefault());
  update();
})();
