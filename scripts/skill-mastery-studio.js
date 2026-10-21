(() => {
  'use strict';
  const M = globalThis.DivergencyMastery;
  const studio = document.getElementById('skill-mastery-studio-app');
  if (!M || !studio) return;
  const key = 'divergency.mastery.web-review.v2';
  const $ = selector => studio.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const fmt = (value, digits = 2) => Number(value).toLocaleString('vi-VN', { maximumFractionDigits: digits });
  const clone = value => JSON.parse(JSON.stringify(value));
  const defaultView = () => ({ characterId: 'deep', encounterId: M.encounterIds[0], target: 'neutral', customGuard: 0, customWeight: 0, eventSequence: 0,
    selections: Object.fromEntries(Object.entries(M.characters).map(([id, c]) => [id, { tier: 0, branchId: c.branches[0].id, relicId: 'none' }])) });
  let state = M.createState();
  let view = defaultView();
  let undo = null;
  let message = 'Chọn một bậc để xem trước; thức tỉnh chỉ mở tuần tự khi đủ điều kiện.';
  let saveStatus = 'Bản mô phỏng web riêng, chưa ghi dữ liệu game.';
  function normalizeView(raw) {
    const value = defaultView();
    if (!raw || typeof raw !== 'object') return value;
    if (M.characters[raw.characterId]) value.characterId = raw.characterId;
    if (M.encounterIds.includes(raw.encounterId)) value.encounterId = raw.encounterId;
    if (['neutral', 'guarded', 'boss', 'custom'].includes(raw.target)) value.target = raw.target;
    value.customGuard = Math.min(10000, Math.max(0, Number(raw.customGuard) || 0));
    value.customWeight = Math.min(10000, Math.max(0, Number(raw.customWeight) || 0));
    value.eventSequence = Math.min(1000000, Math.max(0, Math.trunc(Number(raw.eventSequence) || 0)));
    for (const [id, c] of Object.entries(M.characters)) {
      const selection = raw.selections?.[id];
      if (!selection) continue;
      value.selections[id].tier = Math.min(3, Math.max(0, Math.trunc(Number(selection.tier) || 0)));
      if (c.branches.some(b => b.id === selection.branchId)) value.selections[id].branchId = selection.branchId;
      if (M.compatible(id, selection.relicId)) value.selections[id].relicId = selection.relicId;
    }
    return value;
  }
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      const restored = M.hydrate(parsed.state);
      state = restored.state;
      view = normalizeView(parsed.view);
      if (parsed.undo?.state?.schemaVersion === M.SCHEMA) undo = { state: M.hydrate(parsed.undo.state).state, view: normalizeView(parsed.undo.view) };
      message = restored.restored ? 'Đã khôi phục hồ sơ review: bậc đã mở và bậc xem thử được lưu riêng.' : 'Bản lưu không đúng phiên bản; đã tạo hồ sơ review mới.';
    }
  } catch { message = 'Không đọc được bản lưu; phiên review mới vẫn dùng được.'; }

  function save() {
    try {
      localStorage.setItem(key, JSON.stringify({ state, view, undo }));
      saveStatus = 'Đã lưu riêng trên trình duyệt này · phiên bản review 2.';
    } catch { saveStatus = 'Trình duyệt không cho lưu; thay đổi chỉ tồn tại trong phiên đang mở.'; }
  }
  const target = () => ({ neutral: { guard: 0, weight: 0 }, guarded: { guard: 50, weight: 40 }, boss: { guard: 100, weight: 100 }, custom: { guard: view.customGuard, weight: view.customWeight } }[view.target]);
  function sendTargetToCalculator() {
    const form = document.getElementById('character-power-calculator');
    if (!form) return;
    form.elements.namedItem('guard').value = target().guard;
    form.elements.namedItem('weight').value = target().weight;
    form.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function commit(result) {
    if (result.ok) state = result.state;
    message = result.reason;
    save();
    render();
  }
  function metric(label, value) { return `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`; }
  function render() {
    const id = view.characterId;
    const character = M.characters[id];
    const selection = view.selections[id];
    const profile = state.profiles[id];
    const build = M.deriveBuild(id, selection.tier, selection.branchId, selection.relicId, target());
    const req = M.requirements(state, id);
    const base = M.deriveBuild(id, 0, undefined, 'none', target());
    studio.querySelectorAll('[data-mastery-character]').forEach(button => {
      const active = button.dataset.masteryCharacter === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    studio.querySelectorAll('[data-mastery-tier]').forEach(button => {
      const tier = Number(button.dataset.masteryTier);
      const active = tier === selection.tier;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-unlocked', tier <= profile.unlockedTier);
      button.setAttribute('aria-pressed', String(active));
      button.querySelector('.node-status').textContent = tier <= profile.unlockedTier ? 'Đã mở' : 'Xem trước';
    });
    $('#mastery-preview-status').textContent = `Đang xem ${build.tier.name} · Hồ sơ đã mở ${M.tiers[profile.unlockedTier].name}${selection.tier > profile.unlockedTier ? ' · Bậc này chưa được sở hữu' : ''}`;
    $('#skill-display-name').textContent = `${character.name} · ${character.skillName}`;
    $('#skill-display-tier').textContent = build.tier.name;
    $('#skill-display-avatar').textContent = character.icon;
    $('#skill-display-caption').textContent = character.canon;
    $('#skill-utility-list').innerHTML = character.utility.slice(0, selection.tier + 1).map((text, index) => `<li><strong>${esc(M.tiers[index].name)}:</strong> ${esc(text)}</li>`).join('');
    $('#skill-stats-granted').innerHTML = [
      `Power của riêng chiêu: +${fmt(build.power)}%`,
      `CritChance: ${fmt(character.baseCrit)}% + ${fmt(build.tier.critChance)} điểm % = ${fmt(build.critChance)}%`,
      `CritDamage: 150% + ${fmt(build.tier.critDamage)} điểm % = ${fmt(build.critDamage)}%`,
      'Bonus chỉ số toàn nhân vật: 0',
    ].map(text => `<span class="stat-granted-tag">${esc(text)}</span>`).join('');
    $('#mastery-branches').innerHTML = character.branches.map(branch => `<button type="button" class="evolution-pill-btn${selection.branchId === branch.id ? ' is-active-branch' : ''}" data-mastery-branch="${esc(branch.id)}" aria-pressed="${selection.branchId === branch.id}" ${selection.tier < 3 ? 'disabled' : ''}><strong>${esc(branch.name)}</strong><span>${esc(branch.description)}</span></button>`).join('');
    $('#mastery-branch-note').textContent = selection.tier < 3 ? 'Nhánh bắt đầu ở Ascended. Chọn bậc 3 để xem thử; chưa làm thay đổi hồ sơ đã mở.' : 'Đang thử một nhánh. Chỉ nút Lưu cấu hình mới ghi loadout khi hồ sơ đã mở Ascended và ở điểm an toàn.';
    $('#relic-infusion-select').innerHTML = Object.values(M.relics).map(relic => `<option value="${esc(relic.id)}" ${!M.compatible(id, relic.id) ? 'disabled' : ''}>${esc(relic.name)}${M.compatible(id, relic.id) ? '' : ' — không tương thích'}</option>`).join('');
    $('#relic-infusion-select').value = selection.relicId;
    $('#relic-infusion-select').disabled = selection.tier < 3;
    const chosenRelic = M.relics[selection.relicId];
    $('#relic-effect-preview').textContent = selection.tier < 3 ? 'Socket chưa hoạt động ở bậc đang xem; công thức dùng Không khảm.' : chosenRelic.description;
    $('#mastery-relic-source').innerHTML = chosenRelic.wikiId ? `<a href="#${esc(chosenRelic.wikiId)}">Xem vật phẩm nguồn trong Item Wiki</a><span> · Hiệu ứng khảm là biến thể được định nghĩa riêng; không nhận thêm hiệu ứng trang bị gốc.</span>` : 'Một socket, không cộng dồn hai dấu ấn. Mọi dấu ấn đều được dự kiến kiếm trong gameplay.';
    $('#mastery-results').innerHTML = `<dl>${[
      metric('Lịch hit / 1 mục tiêu', character.hits.map(n => `${fmt(n)} HP gốc`).join(' + ')),
      metric('Damage thường / cast', `${fmt(build.combat.normal)} HP`),
      metric('Damage kỳ vọng / cast', `${fmt(build.expected)} HP (${fmt(build.expected / base.expected)}× Base)`),
      metric('DPS lý thuyết khi đều trúng', `${fmt(build.dps)} HP/s`),
      metric('MP / cast', `${fmt(build.mana)} MP`),
      metric('Chu kỳ action', `${build.cycleTicks} tick / ${fmt(build.cycleSeconds)} s`),
      metric('BDefense trước / sau Guard', `${build.bdefense} → ${build.combat.bdefense}`),
      metric('Fall trước / sau Guard', `${build.fall} → ${build.combat.fall}`),
      metric('Knockback địch nhận', `×${fmt(build.combat.knockback, 3)} (Weight mục tiêu)`),
      metric('Tầm action X / Z', `${fmt(build.rangeX)} / ${fmt(build.rangeZ)} world units`),
      metric('Điều khiển action', `×${fmt(build.actionControl, 3)}; không phải Agility toàn nhân vật`),
      metric('Knockback người thi triển nhận', `×${fmt(build.casterKnockback, 3)} trong action`),
    ].join('')}</dl><p class="mastery-small">${build.casterPressureTicks ? `Cửa sổ đỡ: ${build.casterPressureTicks} tick (${fmt(build.casterPressureTicks / 60 * 1000)} ms), áp lực nhận ×${fmt(build.casterPressure, 3)}; chỉ phía trước, không giảm HP damage.` : 'Không cấp Super Armor, I-frame hoặc HP shield từ các chỉ số trên.'} Số liệu chưa tính hit hụt, cửa sổ boss, hồi MP, nhiều mục tiêu hoặc buff tạm.</p>`;
    $('#mastery-target').value = view.target;
    $('#mastery-progress-summary').textContent = `${character.name}: ${profile.uses}/60 lượt dùng hiệu quả · ${profile.tasks} thử thách · mốc chiến dịch ${state.milestone}/3. Ví chung: ${state.wallet.amethyst_cluster} Amethyst Cluster / ${state.wallet.bronze_shard} Bronze Shard.`;
    $('#mastery-next-tier').textContent = req.final ? 'Đã mở bậc cuối; tiếp tục thử nhánh và socket.' : `Điều kiện mở tiếp ${req.tier.name}; đây là mốc tích lũy, không reset bộ đếm.`;
    $('#mastery-conditions').innerHTML = req.final ? '<p>Tất cả bậc đã mở. Nút thức tỉnh không quay về Base.</p>' : [
      ['Lượt dùng hiệu quả', profile.uses, req.tier.uses], ['Thử thách kỹ năng', profile.tasks, req.tier.tasks], ['Mốc chiến dịch', state.milestone, req.tier.milestone],
    ].map(([label, current, required], index) => `<label for="mastery-condition-${index}">${esc(label)}: ${current}/${required}<progress id="mastery-condition-${index}" value="${Math.min(current, required)}" max="${Math.max(1, required)}">${current}/${required}</progress></label>`).join('');
    $('#mastery-item-costs').innerHTML = req.final ? '<p>Không có khoản phí nâng cấp tiếp theo.</p>' : `<ul>${Object.entries(req.tier.cost).map(([itemId, amount]) => `<li>${esc(M.materialNames[itemId])}: cần ${amount}, đang có ${state.wallet[itemId]} · trừ khi thức tỉnh thành công.</li>`).join('')}</ul>`;
    $('#mastery-missing').textContent = req.ready ? 'Đã đủ mọi điều kiện để thức tỉnh.' : req.missing.join(' · ');
    $('#btn-awaken-action').disabled = !req.ready;
    $('#btn-awaken-action').textContent = req.final ? 'Đã đạt bậc cuối' : `Thức tỉnh ${M.tiers[profile.unlockedTier].name} → ${req.tier.name}`;
    $('#mastery-prepare').disabled = req.final;
    $('#mastery-equip').disabled = profile.unlockedTier < 3 || selection.tier !== 3 || !$('#mastery-safe-point').checked;
    $('#mastery-equipped').textContent = profile.unlockedTier < 3 ? 'Chưa mở nhánh/socket trong hồ sơ; xem thử không đồng nghĩa trang bị.' : `Đã lưu: ${character.branches.find(b => b.id === profile.branchId).name} · ${M.relics[profile.relicId].name}.`;
    $('#mastery-encounter').innerHTML = M.encounterIds.map((encId, index) => `<option value="${encId}" ${!M.encounterAvailable(state, encId) ? 'disabled' : ''}>Encounter thử ${index + 1}${state.encounters[encId].rewarded ? ' · đã thưởng' : ''}</option>`).join('');
    if (!M.encounterAvailable(state, view.encounterId)) view.encounterId = M.encounterIds[0];
    $('#mastery-encounter').value = view.encounterId;
    $('#mastery-task-label').textContent = character.task;
    const enc = state.encounters[view.encounterId];
    $('#mastery-encounter-counts').textContent = `Credit encounter này cho ${character.name}: ${enc.uses[id] || 0}/20 lượt dùng, ${enc.tasks[id] || 0}/5 thử thách. Thưởng vật liệu chung chỉ một lần, kể cả khi đổi nhân vật hoặc retry.`;
    $('#mastery-complete').disabled = enc.rewarded;
    $('#mastery-undo').disabled = !undo;
    $('#mastery-status').textContent = message;
    $('#mastery-save-status').textContent = saveStatus;
    const budget = M.budget(id);
    $('#mastery-budget-body').innerHTML = budget.rows.map(row => `<tr><th scope="row">${esc(row.name)}</th><td>${fmt(row.minExpected)}–${fmt(row.maxExpected)} HP</td><td>×${fmt(row.maxDamageRatio, 3)}</td><td>×${fmt(row.maxDpsRatio, 3)}</td><td>${row.maxDamageRatio <= 1.6 && row.maxDpsRatio <= 1.6 ? 'Đạt trần 1.60×' : 'Vượt trần'}</td></tr>`).join('');
    $('#mastery-budget-status').textContent = budget.passes ? 'Tất cả nhánh và socket tương thích của nhân vật này đều dưới trần +60% damage/cast và DPS lý thuyết, so với Base trên cùng mục tiêu.' : 'Cần chỉnh số trước khi duyệt.';
  }

  studio.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !studio.contains(button) || button.disabled) return;
    const id = view.characterId;
    if (button.dataset.masteryCharacter) {
      view.characterId = button.dataset.masteryCharacter;
      message = 'Đã đổi nhân vật; mỗi chiêu giữ riêng bậc đã mở và cấu hình xem thử.';
    } else if (button.dataset.masteryTier !== undefined) {
      view.selections[id].tier = Number(button.dataset.masteryTier);
      message = 'Đổi bậc xem thử không mở khóa hoặc cấp chỉ số cho hồ sơ.';
    } else if (button.dataset.masteryBranch) {
      view.selections[id].branchId = button.dataset.masteryBranch;
      message = 'Đã đổi nhánh xem thử; số liệu tính lại từ cùng một mô hình.';
    } else if (button.id === 'btn-awaken-action') {
      const req = M.requirements(state, id);
      const result = M.awaken(state, id, req.tier?.id);
      if (result.ok) view.selections[id].tier = result.state.profiles[id].unlockedTier;
      commit(result); return;
    } else if (button.id === 'mastery-equip') {
      const selected = view.selections[id];
      commit(M.equip(state, id, selected.branchId, selected.relicId, $('#mastery-safe-point').checked)); return;
    } else if (button.id === 'mastery-prepare') {
      undo = { state: clone(state), view: clone(view) };
      commit(M.prepareNextTier(state, id)); return;
    } else if (button.id === 'mastery-reset') {
      undo = { state: clone(state), view: clone(view) };
      state = M.createState(); view = defaultView();
      sendTargetToCalculator();
      message = 'Đã đặt lại toàn bộ bản mô phỏng. Có thể hoàn tác lần đặt lại này.';
    } else if (button.id === 'mastery-undo') {
      if (undo) { state = M.hydrate(undo.state).state; view = normalizeView(undo.view); undo = null; sendTargetToCalculator(); message = 'Đã khôi phục tình huống trước lần đặt lại hoặc nạp mẫu gần nhất.'; }
    } else if (button.id === 'mastery-complete') {
      commit(M.completeEncounter(state, view.encounterId, { serverAccepted: true, cleared: true })); return;
    } else if (button.id === 'mastery-hit' || button.id === 'mastery-task' || button.id === 'mastery-zero-hit') {
      const count = button.id === 'mastery-zero-hit' ? 1 : Math.min(20, Math.max(1, Math.trunc(Number($('#mastery-batch').value) || 1)));
      let successes = 0, reason = '';
      for (let index = 0; index < count; index++) {
        const beforeAttempt = state;
        const character = M.characters[id];
        const record = state.encounters[view.encounterId];
        let castId;
        if (button.id === 'mastery-task') {
          if ((record.tasks[id] || 0) >= 5) { reason = 'Đã đủ 5 credit thử thách cho encounter này.'; break; }
          const prior = record.seenCasts.find(castKey => castKey.startsWith(id + ':') && !record.seenTasks.includes(castKey));
          if (prior) castId = prior.slice(id.length + 1);
        }
        castId ||= `review-${++view.eventSequence}`;
        const eventData = { characterId: id, skillId: character.skillId, encounterId: view.encounterId, castId, serverAccepted: true, hostile: true, training: false, aliveBefore: true, hpDamage: button.id === 'mastery-zero-hit' ? 0 : 1, useful: true };
        if (!record.seenCasts.includes(`${id}:${castId}`)) {
          const hit = M.recordCombatEvent(state, { ...eventData, kind: 'hit' });
          if (!hit.ok) { reason = hit.reason; break; }
          state = hit.state;
        }
        if (button.id === 'mastery-task') {
          const task = M.recordCombatEvent(state, { ...eventData, kind: 'task', taskId: character.taskId });
          if (!task.ok) { state = beforeAttempt; reason = task.reason; break; }
          state = task.state;
        }
        successes++;
      }
      message = `${successes ? `Đã ghi ${successes} ${button.id === 'mastery-task' ? 'thử thách' : 'lượt dùng hiệu quả'}. ` : ''}${reason || 'Đếm theo cast hữu ích, không đếm số hit/nạn nhân hoặc mạng kết liễu.'}`;
    } else if (button.id === 'btn-sync-to-calc') {
      const selected = view.selections[id];
      const build = M.deriveBuild(id, selected.tier, selected.branchId, selected.relicId, target());
      const form = document.getElementById('character-power-calculator');
      if (form) {
        form.dispatchEvent(new CustomEvent('divergency:mastery-sync', { detail: { build } }));
        form.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        message = 'Đã đồng bộ mẫu chiêu, lịch hit và MP; đã bỏ buff thử. Guard/Weight của mục tiêu được giữ nguyên.';
      }
    } else return;
    save(); render();
  });
  studio.addEventListener('change', event => {
    if (event.target.id === 'relic-infusion-select') {
      if (!M.compatible(view.characterId, event.target.value)) return;
      view.selections[view.characterId].relicId = event.target.value;
      message = 'Đã đổi một socket xem thử; không cộng thêm hiệu ứng trang bị gốc.';
    } else if (event.target.id === 'mastery-target') { view.target = event.target.value; sendTargetToCalculator(); }
    else if (event.target.id === 'mastery-encounter') view.encounterId = event.target.value;
    else if (event.target.id !== 'mastery-safe-point') return;
    save(); render();
  });
  document.getElementById('character-power-calculator')?.addEventListener('divergency:target-change', event => {
    view.target = 'custom';
    view.customGuard = Math.min(10000, Math.max(0, Number(event.detail?.guard) || 0));
    view.customWeight = Math.min(10000, Math.max(0, Number(event.detail?.weight) || 0));
    save(); render();
  });
  sendTargetToCalculator(); save(); render();
})();
