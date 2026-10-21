/* Local design simulator. No Unity assets, player saves, or network calls. */
(() => {
  'use strict';
  const SCHEMA = 2;
  const clamp = (n, low, high) => Math.min(high, Math.max(low, Number.isFinite(Number(n)) ? Number(n) : low));
  const integer = (n, low, high) => Math.trunc(clamp(n, low, high));
  const copy = value => JSON.parse(JSON.stringify(value));
  const roundEven = value => {
    const low = Math.floor(value);
    return value - low === 0.5 ? low + low % 2 : Math.round(value);
  };
  const bonus = value => 1 + Math.max(0, Number(value) || 0) / 100;
  const resistance = value => 100 / (100 + Math.max(0, Number(value) || 0));
  const freeze = value => {
    if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
    return value;
  };
  const tiers = freeze([
    { id: 0, name: 'Base', power: 0, critChance: 0, critDamage: 0, pressure: 0, range: 1, recovery: 0, uses: 0, tasks: 0, milestone: 0, cost: { amethyst_cluster: 0, bronze_shard: 0 } },
    { id: 1, name: 'Awakened', power: 8, critChance: 1, critDamage: 0, pressure: 5, range: 1.05, recovery: 0, uses: 20, tasks: 0, milestone: 1, cost: { amethyst_cluster: 1, bronze_shard: 4 } },
    { id: 2, name: 'Mastered', power: 16, critChance: 2, critDamage: 5, pressure: 10, range: 1.1, recovery: 2, uses: 40, tasks: 2, milestone: 2, cost: { amethyst_cluster: 2, bronze_shard: 8 } },
    { id: 3, name: 'Ascended', power: 24, critChance: 3, critDamage: 10, pressure: 15, range: 1.1, recovery: 2, uses: 60, tasks: 4, milestone: 3, cost: { amethyst_cluster: 3, bronze_shard: 12 } },
  ]);
  const heavy = (id, name) => ({ id, name, kind: 'pressure', power: 6, pressure: 15, mana: 1.1, recovery: 4, motion: 1, description: 'Áp lực BDefense +15 điểm %, damage bonus của chiêu +6 điểm %; MP ×1.10, chu kỳ động tác +4 tick.' });
  const mobile = (id, name) => ({ id, name, kind: 'control', power: -4, pressure: 0, mana: 0.9, recovery: 0, motion: 1.1, description: 'Điều khiển chuyển động của action ×1.10; damage bonus của chiêu −4 điểm %, MP ×0.90. Không cấp bất tử.' });
  const characters = freeze({
    deep: { name: 'Deep', skillId: 'deep.short_sword_slash', skillName: 'Trảm Kích Huyết Nguyệt', canon: 'Kiếm ngắn · phong cách đấu sĩ', icon: '⚔', tags: ['melee', 'blade'], hits: [22], mana: 35, bdefense: 30, fall: 25, rangeX: 65, rangeZ: 20, ticks: 60, baseCrit: 5, task: 'Nối một đòn combo sau hit được xác nhận', taskId: 'confirmed_followup', utility: ['Nhát chém kiếm ngắn nền; Returning Gale vẫn dùng được theo điều kiện synergy hiện có.', 'Tầm action ×1.05; bonus sát thương chỉ thuộc chiêu này.', 'Thu đòn sớm 2 tick (33.3 ms) nếu đã trúng mục tiêu hợp lệ.', 'Chọn một nhánh ở điểm an toàn và mở một socket tương thích.'], branches: [heavy('crimson', 'Crimson Fury'), mobile('phantom', 'Phantom Step')] },
    solei: { name: 'Solei', skillId: 'solei.gale_rush', skillName: 'Cuồng Phong Cước / Gale Rush', canon: 'Karate · chân máy có mắt quỷ', icon: '🦾', tags: ['melee', 'kick'], hits: [18], mana: 30, bdefense: 20, fall: 20, rangeX: 55, rangeZ: 25, ticks: 54, baseCrit: 5, task: 'Nối Backlash sau một cước trúng đích', taskId: 'confirmed_followup', utility: ['Cước pháp nền và điều kiện Returning Gale được giữ từ Base.', 'Tầm cước ×1.05, giữ bộ va chạm của action.', 'Thu đòn sớm 2 tick khi cước trúng; không thêm Super Armor từ Weight.', 'Chọn giữa áp lực cước và khả năng điều hướng, một socket.'], branches: [heavy('storm-eye', 'Storm Eye'), mobile('gale-dance', 'Gale Dance')] },
    block: { name: 'Block', skillId: 'block.counter_punch', skillName: 'Thiết Quyền Phản Kích', canon: 'Da đen · boxing, đấm, đá và đỡ đòn', icon: '🥊', tags: ['melee', 'fist', 'guard'], hits: [25], mana: 25, bdefense: 35, fall: 30, rangeX: 55, rangeZ: 25, ticks: 72, baseCrit: 5, task: 'Đỡ đúng thời điểm rồi phản công trúng', taskId: 'confirmed_counter', utility: ['Thế thủ boxing và một đòn phản công nền.', 'Tầm đấm ×1.05; áp lực tăng có giới hạn.', 'Đỡ phía trước trong 6 tick đầu: áp lực nhận ×0.85; không giảm HP damage.', 'Chọn nhịp đấm áp lực hoặc nhánh thủ, một socket.'], branches: [heavy('slugger', 'Slugger Rush'), { ...mobile('titan', 'Titan Guard'), motion: 1, casterPressure: 0.9, description: 'Trong cửa sổ đỡ 6 tick: áp lực nhận nhân thêm ×0.90; damage bonus của chiêu −4 điểm %, MP ×0.90. Không miễn nhiễm HP.' }] },
    mark: { name: 'Mark', skillId: 'mark.split_blade_crescent', skillName: 'Tách Cung Nhạn Đoạn Trảm', canon: 'Cung tách thành kiếm · kính kiểu laser', icon: '🏹', tags: ['melee', 'blade', 'bow'], hits: [20], mana: 30, bdefense: 25, fall: 20, rangeX: 65, rangeZ: 20, ticks: 60, baseCrit: 8, task: 'Đánh trúng bằng kiếm rồi tái lập khoảng cách', taskId: 'confirmed_reposition', utility: ['Ngân sách một hit cận chiến từ cung tách kiếm; không cộng thêm volley tên.', 'Tầm action ×1.05; giữ nguyên số hit.', 'Thu đòn sớm 2 tick khi đã trúng; không chuyển stance ở 0 tick.', 'Chọn áp lực kiếm hoặc kiểm soát bước lùi, một socket.'], branches: [heavy('twin-blade', 'Twin Blade Blitz'), mobile('measured-retreat', 'Measured Retreat')] },
    tulas: { name: 'Tulas', skillId: 'tulas.returning_blood_spear', skillName: 'Thương Huyết Thập Tự', canon: 'Phép thuật máu · dấu chữ thập ở ngực', icon: '🩸', tags: ['projectile', 'blood'], hits: [12, 12], mana: 60, bdefense: 20, fall: 20, rangeX: 320, rangeZ: 20, ticks: 72, baseCrit: 5, task: 'Thương đi và về cùng trúng một mục tiêu', taskId: 'confirmed_return', utility: ['Hai lượt đi/về từ Base: 12 + 12 HP gốc trên một mục tiêu; mastery chỉ một credit mỗi cast.', 'Tầm thương ×1.05, không thêm hit hoặc hồi MP theo số nạn nhân.', 'Điều hướng lượt về ×1.10; không gắn shield hoặc hút máu tự động.', 'Chọn áp lực thương hoặc điều khiển lượt về, một socket.'], branches: [heavy('blood-lance', 'Crimson Lance'), mobile('blood-return', 'Controlled Return')] },
  });
  const relics = freeze({
    none: { id: 'none', name: 'Không khảm', wikiId: null, sprite: '', tags: [], pressure: 0, mana: 1, casterKnockback: 1, description: 'Giữ thông số chiêu theo bậc và nhánh.' },
    bastonne_pressure_essence: { id: 'bastonne_pressure_essence', name: 'Dấu ấn Chùy Gai Bastonne', wikiId: 'item_0_0', sprite: 'imgs/items/item_r0_c0.png', tags: ['melee'], pressure: 15, mana: 1.1, casterKnockback: 1, description: 'BDefense của chiêu +15 điểm %; MP ×1.10. Không bảo đảm Guard Break. Dùng dấu ấn, không đổi vũ khí của nhân vật.' },
    golden_nautilus_essence: { id: 'golden_nautilus_essence', name: 'Dấu ấn Vỏ Ốc Hoàng Kim', wikiId: 'item_0_1', sprite: 'imgs/items/item_r0_c1.png', tags: ['melee', 'projectile'], pressure: 0, mana: 1.1, casterKnockback: 0.9, description: 'Knockback người thi triển nhận trong action ×0.90; MP ×1.10. Không chống ngắt đòn hoặc phản mọi projectile.' },
    gladiator_blade_essence: { id: 'gladiator_blade_essence', name: 'Dấu ấn Đoản Kiếm Bastonne', wikiId: 'item_3_0', sprite: 'imgs/items/item_r3_c0.png', tags: ['blade'], pressure: 0, pressureMultiplier: 0.9, mana: 0.9, casterKnockback: 1, description: 'MP ×0.90; BDefense của chiêu ×0.90. Tương thích chiêu dùng kiếm; không thêm tốc độ đánh hoặc I-frame.' },
  });
  const materialNames = freeze({ amethyst_cluster: 'Amethyst Cluster', bronze_shard: 'Bronze Shard' });
  const encounterIds = freeze(['review-encounter-1', 'review-encounter-2', 'review-encounter-3']);
  const compatible = (characterId, relicId) => !!characters[characterId] && !!relics[relicId] && (relicId === 'none' || relics[relicId].tags.some(tag => characters[characterId].tags.includes(tag)));

  function calculateCombat(input = {}) {
    const power = Math.max(0, Number(input.power) || 0);
    const chance = clamp(input.chance, 0, 100) / 100;
    const critical = Math.max(1, Number(input.critical) > 0 ? Number(input.critical) / 100 : 1.5);
    const multiplier = bonus(power) * (input.rage ? 1.35 : 1) * (input.strength ? 1.2 : 1);
    const hits = Array.isArray(input.hits) ? input.hits : [Math.max(1, Number(input.damage) || 1)];
    const hitResults = hits.map(raw => {
      const scaled = Math.max(1, Number(raw) || 1) * multiplier;
      const normal = Math.max(1, roundEven(scaled));
      const crit = Math.max(1, roundEven(scaled * critical));
      return { normal, crit, expected: normal * (1 - chance) + crit * chance };
    });
    const pressure = resistance(input.guard) * (input.stone ? 0.7 : 1);
    const agility = Math.max(0, Number(input.agility) || 0);
    const manaMultiplier = input.rage ? 1.6 : 1;
    const rawMana = Math.max(0, Number(input.mana) || 0);
    return {
      hits: hitResults, normal: hitResults.reduce((n, h) => n + h.normal, 0), crit: hitResults.reduce((n, h) => n + h.crit, 0), expected: hitResults.reduce((n, h) => n + h.expected, 0),
      damageMultiplier: multiplier, bdefense: integer(roundEven(clamp(input.bdefense, 0, 255) * pressure), 0, 255), fall: integer(roundEven(clamp(input.fall, 0, 255) * pressure), 0, 255),
      knockback: resistance(input.weight) * (input.stone ? 0.55 : 1), move: bonus(agility) * (input.wind ? 1.25 : 1), air: bonus(agility) * (input.wind ? 1.35 : 1),
      jumpX: bonus(agility) * (input.wind ? 1.15 : 1) * (input.spring ? 1.1 : 1), jumpY: bonus(agility * 0.35) * (input.spring ? 1.45 : 1), mana: rawMana > 0 ? Math.max(1, roundEven(rawMana * manaMultiplier)) : 0,
    };
  }

  function deriveBuild(characterId, tierId = 0, branchId, relicId = 'none', target = {}) {
    const character = characters[characterId];
    if (!character) throw new Error('Nhân vật không hợp lệ.');
    const tier = tiers[integer(tierId, 0, 3)];
    const chosen = character.branches.find(b => b.id === branchId) || character.branches[0];
    const branch = tier.id === 3 ? chosen : { id: 'none', name: 'Chưa mở nhánh', power: 0, pressure: 0, mana: 1, recovery: 0, motion: 1 };
    const allowedRelic = tier.id === 3 && compatible(characterId, relicId) ? relicId : 'none';
    const relic = relics[allowedRelic];
    const power = tier.power + branch.power;
    const bdefense = integer(roundEven(character.bdefense * bonus(tier.pressure + branch.pressure + relic.pressure) * (relic.pressureMultiplier || 1)), 0, 255);
    const manaRaw = character.mana * branch.mana * relic.mana;
    const cycleTicks = Math.max(1, character.ticks - tier.recovery + branch.recovery);
    const combatInput = { hits: character.hits, power, chance: character.baseCrit + tier.critChance, critical: 150 + tier.critDamage, bdefense, fall: character.fall, mana: manaRaw, guard: target.guard || 0, weight: target.weight || 0 };
    const combat = calculateCombat(combatInput);
    return { characterId, skillId: character.skillId, character, tier, branch, relic, power, critChance: combatInput.chance, critDamage: combatInput.critical, bdefense, fall: character.fall, manaRaw, mana: combat.mana,
      hitCount: character.hits.length, rangeX: character.rangeX * tier.range, rangeZ: character.rangeZ * tier.range, cycleTicks, cycleSeconds: cycleTicks / 60,
      expected: combat.expected, dps: combat.expected * 60 / cycleTicks, combat, combatInput,
      casterPressure: characterId === 'block' && tier.id >= 2 ? 0.85 * (branch.casterPressure || 1) : 1,
      casterPressureTicks: characterId === 'block' && tier.id >= 2 ? 6 : 0, casterKnockback: relic.casterKnockback,
      actionControl: (characterId === 'tulas' && tier.id >= 2 ? 1.1 : 1) * branch.motion,
      recoveryReduction: tier.recovery, globalStatBonus: 0,
    };
  }

  function budget(characterId) {
    const base = deriveBuild(characterId, 0);
    const rows = tiers.map(tier => {
      const builds = [];
      for (const branch of characters[characterId].branches) for (const relic of Object.keys(relics)) {
        if (compatible(characterId, relic)) builds.push(deriveBuild(characterId, tier.id, branch.id, relic));
      }
      return { tier: tier.id, name: tier.name, minExpected: Math.min(...builds.map(b => b.expected)), maxExpected: Math.max(...builds.map(b => b.expected)), maxDamageRatio: Math.max(...builds.map(b => b.expected / base.expected)), maxDpsRatio: Math.max(...builds.map(b => b.dps / base.dps)) };
    });
    return { base, rows, passes: rows.every(row => row.maxDamageRatio <= 1.6 && row.maxDpsRatio <= 1.6) };
  }

  function createState() {
    return { schemaVersion: SCHEMA, revision: 0, wallet: { amethyst_cluster: 0, bronze_shard: 0 }, milestone: 0,
      profiles: Object.fromEntries(Object.entries(characters).map(([id, c]) => [id, { skillId: c.skillId, unlockedTier: 0, uses: 0, tasks: 0, branchId: c.branches[0].id, relicId: 'none' }])),
      encounters: Object.fromEntries(encounterIds.map(id => [id, { cleared: false, rewarded: false, uses: {}, tasks: {}, seenCasts: [], seenTasks: [] }])),
    };
  }

  function hydrate(raw) {
    const state = createState();
    if (!raw || raw.schemaVersion !== SCHEMA) return { state, restored: false };
    state.revision = integer(raw.revision, 0, 1000000);
    state.milestone = integer(raw.milestone, 0, 3);
    for (const id of Object.keys(state.wallet)) state.wallet[id] = integer(raw.wallet?.[id], 0, 99);
    for (const [id, character] of Object.entries(characters)) {
      const src = raw.profiles?.[id];
      if (!src || src.skillId !== character.skillId) continue;
      const profile = state.profiles[id];
      profile.unlockedTier = integer(src.unlockedTier, 0, 3);
      profile.uses = integer(src.uses, 0, 60);
      profile.tasks = integer(src.tasks, 0, 15);
      profile.branchId = character.branches.some(b => b.id === src.branchId) ? src.branchId : character.branches[0].id;
      profile.relicId = profile.unlockedTier === 3 && compatible(id, src.relicId) ? src.relicId : 'none';
    }
    for (const id of encounterIds) {
      const src = raw.encounters?.[id];
      if (!src || typeof src !== 'object') continue;
      const enc = state.encounters[id];
      enc.cleared = src.cleared === true;
      enc.rewarded = src.rewarded === true;
      for (const characterId of Object.keys(characters)) {
        enc.uses[characterId] = integer(src.uses?.[characterId], 0, 20);
        enc.tasks[characterId] = integer(src.tasks?.[characterId], 0, 5);
      }
      for (const list of ['seenCasts', 'seenTasks']) enc[list] = [...new Set((Array.isArray(src[list]) ? src[list] : []).filter(x => typeof x === 'string' && x.length < 200))].slice(0, 150);
    }
    return { state, restored: true };
  }

  function requirements(state, characterId) {
    const profile = state.profiles[characterId];
    if (!profile || !characters[characterId]) throw new Error('Nhân vật không hợp lệ.');
    const next = tiers[profile.unlockedTier + 1];
    if (!next) return { ready: false, final: true, tier: null, missing: ['Đã đạt bậc cuối.'] };
    const missing = [];
    if (profile.uses < next.uses) missing.push(`Lượt dùng hiệu quả ${profile.uses}/${next.uses}`);
    if (profile.tasks < next.tasks) missing.push(`Thử thách kỹ năng ${profile.tasks}/${next.tasks}`);
    if (state.milestone < next.milestone) missing.push(`Mốc chiến dịch ${state.milestone}/${next.milestone}`);
    for (const [key, amount] of Object.entries(next.cost)) if (state.wallet[key] < amount) missing.push(`${materialNames[key]} ${state.wallet[key]}/${amount}`);
    return { ready: missing.length === 0, final: false, tier: next, missing };
  }
  const fail = (state, reason) => ({ ok: false, state, reason });
  const changed = (state, reason, extra = {}) => ({ ok: true, state: { ...state, revision: state.revision + 1 }, reason, ...extra });

  function awaken(state, characterId, expectedTier) {
    const req = requirements(state, characterId);
    if (!req.ready) return fail(state, req.missing.join(' · '));
    if (Number(expectedTier) !== req.tier.id) return fail(state, 'Bậc yêu cầu đã thay đổi; không trừ vật liệu lần nữa.');
    const next = copy(state);
    for (const [key, amount] of Object.entries(req.tier.cost)) next.wallet[key] -= amount;
    next.profiles[characterId].unlockedTier = req.tier.id;
    return changed(next, `Đã mở ${req.tier.name}; vật liệu được trừ đúng một lần.`);
  }
  function equip(state, characterId, branchId, relicId, safePoint) {
    if (!state.profiles[characterId] || state.profiles[characterId].unlockedTier < 3) return fail(state, 'Cần mở Ascended để lưu nhánh và socket.');
    if (!safePoint) return fail(state, 'Chỉ đổi cấu hình tại điểm an toàn.');
    if (!characters[characterId].branches.some(b => b.id === branchId)) return fail(state, 'Nhánh không thuộc kỹ năng này.');
    if (!compatible(characterId, relicId)) return fail(state, 'Dấu ấn không tương thích với kỹ năng.');
    const next = copy(state);
    Object.assign(next.profiles[characterId], { branchId, relicId });
    return changed(next, 'Đã lưu một nhánh và tối đa một dấu ấn; không tiêu hủy vật phẩm gốc.');
  }
  function encounterAvailable(state, id) {
    const index = encounterIds.indexOf(id);
    return index >= 0 && (index === 0 || state.encounters[encounterIds[index - 1]].cleared);
  }
  function recordCombatEvent(state, event) {
    const character = characters[event?.characterId];
    const enc = state.encounters[event?.encounterId];
    if (!character || !enc || event.skillId !== character.skillId || !encounterAvailable(state, event.encounterId)) return fail(state, 'Sai kỹ năng hoặc encounter chưa mở.');
    if (event.serverAccepted !== true || event.hostile !== true || event.training === true || event.aliveBefore !== true) return fail(state, 'Chỉ ghi thành công hợp lệ từ đối thủ đang sống; dummy và đồng minh không tính.');
    if (typeof event.castId !== 'string' || !event.castId || event.castId.length > 80) return fail(state, 'Thiếu mã lần dùng hợp lệ.');
    const key = `${event.characterId}:${event.castId}`;
    const next = copy(state);
    const record = next.encounters[event.encounterId];
    const profile = next.profiles[event.characterId];
    if (event.kind === 'task') {
      if (event.taskId !== character.taskId || !enc.seenCasts.includes(key) || event.useful !== true) return fail(state, 'Thử thách cần một lần dùng có đóng góp và đúng tiêu chí của chiêu.');
      if (enc.seenTasks.includes(key)) return fail(state, 'Một cast chỉ được một credit thử thách.');
      if ((enc.tasks[event.characterId] || 0) >= 5) return fail(state, 'Đã đủ 5 credit thử thách cho encounter này.');
      record.seenTasks.push(key);
      record.tasks[event.characterId] = (record.tasks[event.characterId] || 0) + 1;
      profile.tasks = Math.min(15, profile.tasks + 1);
    } else {
      if (!['hit', 'utility'].includes(event.kind)) return fail(state, 'Loại sự kiện không hợp lệ.');
      if (event.kind === 'hit' && !(Number.isFinite(Number(event.hpDamage)) && Number(event.hpDamage) > 0) || event.kind === 'utility' && !(character.tags.includes('guard') && event.useful === true)) return fail(state, 'Đòn 0 damage hoặc hỗ trợ chưa thành công không tăng mastery.');
      if (enc.seenCasts.includes(key)) return fail(state, 'Đã ghi cast này; multi-hit và nhiều mục tiêu vẫn chỉ một credit.');
      if ((enc.uses[event.characterId] || 0) >= 20) return fail(state, 'Đã đủ 20 lượt dùng hiệu quả cho encounter này.');
      record.seenCasts.push(key);
      record.uses[event.characterId] = (record.uses[event.characterId] || 0) + 1;
      profile.uses = Math.min(60, profile.uses + 1);
    }
    return changed(next, event.kind === 'task' ? 'Đã ghi một thử thách đúng kỹ năng.' : 'Đã ghi một lượt dùng hiệu quả; không yêu cầu kết liễu.');
  }
  function completeEncounter(state, encounterId, confirmation = {}) {
    const enc = state.encounters[encounterId];
    if (!enc || !encounterAvailable(state, encounterId)) return fail(state, 'Encounter chưa mở.');
    if (enc.rewarded) return fail(state, 'Encounter đã nhận thưởng; retry không sinh thêm vật liệu.');
    if (confirmation.serverAccepted !== true || confirmation.cleared !== true || !Object.values(enc.uses).some(n => n > 0)) return fail(state, 'Cần đóng góp hợp lệ và xác nhận hoàn tất encounter.');
    if (state.wallet.amethyst_cluster + 2 > 99 || state.wallet.bronze_shard + 8 > 99) return fail(state, 'Ví thử nghiệm tối đa 99 mỗi loại; cần chỗ trước khi nhận, phần thưởng chưa bị tiêu mất.');
    const next = copy(state);
    Object.assign(next.encounters[encounterId], { cleared: true, rewarded: true });
    next.wallet.amethyst_cluster += 2;
    next.wallet.bronze_shard += 8;
    next.milestone = Math.max(next.milestone, encounterIds.indexOf(encounterId) + 1);
    return changed(next, 'Thưởng mẫu một lần: +2 Amethyst Cluster, +8 Bronze Shard và mốc chiến dịch.');
  }
  function prepareNextTier(state, characterId) {
    const req = requirements(state, characterId);
    if (req.final) return fail(state, 'Đã đạt bậc cuối.');
    const next = copy(state);
    next.profiles[characterId].uses = Math.max(next.profiles[characterId].uses, req.tier.uses);
    next.profiles[characterId].tasks = Math.max(next.profiles[characterId].tasks, req.tier.tasks);
    next.milestone = Math.max(next.milestone, req.tier.milestone);
    for (const [key, n] of Object.entries(req.tier.cost)) next.wallet[key] = Math.max(next.wallet[key], n);
    return changed(next, 'Đã nạp tình huống thử đủ điều kiện; chưa mở bậc hoặc trừ vật liệu. Đây là thao tác dành cho review web.');
  }
  globalThis.DivergencyMastery = freeze({ SCHEMA, characters, tiers, relics, materialNames, encounterIds, roundEven, calculateCombat, compatible, deriveBuild, budget, createState, hydrate, requirements, awaken, equip, recordCombatEvent, completeEncounter, encounterAvailable, prepareNextTier });
})();
