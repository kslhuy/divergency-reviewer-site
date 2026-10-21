import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
const installedModel = new URL('../scripts/skill-mastery-model.js', import.meta.url);
await import(existsSync(installedModel) ? installedModel : new URL('./skill-mastery-model.js', import.meta.url));
const M = globalThis.DivergencyMastery;
const first = M.encounterIds[0];
const event = (castId = 'cast-1', overrides = {}) => ({ characterId: 'deep', skillId: M.characters.deep.skillId, encounterId: first, castId, serverAccepted: true, hostile: true, aliveBefore: true, training: false, hpDamage: 10, kind: 'hit', useful: true, ...overrides });
const nextState = result => { assert.equal(result.ok, true, result.reason); return result.state; };

test('one model derives neutral formulas, per-hit crit rounding and full-cast expectation', () => {
  assert.equal(M.roundEven(2.5), 2); assert.equal(M.roundEven(3.5), 4);
  const out = M.calculateCombat({ hits: [20], power: 25, chance: 20, critical: 150, guard: 50, weight: 50, bdefense: 65, fall: 40, rage: true, mana: 50 });
  assert.equal(out.normal, 34); assert.equal(out.crit, 51); assert.equal(out.expected, 37.400000000000006);
  assert.equal(out.bdefense, 43); assert.equal(out.fall, 27); assert.equal(out.mana, 80);
  const tulas = M.deriveBuild('tulas', 0);
  assert.equal(tulas.hitCount, 2); assert.equal(tulas.combat.normal, 24); assert(Math.abs(tulas.expected - 24.6) < 1e-8);
});
test('tier bonuses replace previous tier and never increase global character stats', () => {
  const base = M.deriveBuild('deep', 0), tier2 = M.deriveBuild('deep', 2);
  assert.equal(tier2.power, 16); assert.equal(tier2.critChance, 7); assert.equal(tier2.critDamage, 155);
  assert.deepEqual(base.character.hits, tier2.character.hits); assert.equal(tier2.globalStatBonus, 0);
  assert.equal(M.deriveBuild('deep', 1, 'phantom', 'gladiator_blade_essence').relic.id, 'none');
});
test('every branch and permitted socket of all five heroes remains inside damage and cadence budgets', () => {
  for (const id of Object.keys(M.characters)) {
    assert(M.budget(id).passes, id);
    const base = M.deriveBuild(id, 0);
    for (let tier = 0; tier <= 3; tier++) for (const branch of M.characters[id].branches) for (const relic of Object.keys(M.relics)) {
      if (!M.compatible(id, relic)) continue;
      const build = M.deriveBuild(id, tier, branch.id, relic);
      assert(build.expected / base.expected <= 1.6, `${id}/${tier}/${branch.id}/${relic} damage`);
      assert(build.dps / base.dps <= 1.6, `${id}/${tier}/${branch.id}/${relic} DPS`);
      assert.equal(build.hitCount, base.hitCount);
    }
  }
});
test('branch and socket change real metrics with costs; unsupported sockets do not leak', () => {
  const heavy = M.deriveBuild('deep', 3, 'crimson', 'none');
  const mobile = M.deriveBuild('deep', 3, 'phantom', 'none');
  assert(heavy.expected > mobile.expected); assert(heavy.mana > mobile.mana); assert(heavy.cycleTicks > mobile.cycleTicks); assert(mobile.actionControl > heavy.actionControl);
  const shell = M.deriveBuild('deep', 3, 'crimson', 'golden_nautilus_essence');
  assert(shell.mana > heavy.mana); assert.equal(shell.casterKnockback, .9);
  assert.equal(M.deriveBuild('tulas', 3, 'blood-lance', 'gladiator_blade_essence').relic.id, 'none');
  assert.equal(M.relics.gladiator_blade_essence.wikiId, 'item_3_0');
});
test('target Guard/Weight affect reactions without decreasing outgoing HP damage', () => {
  const plain = M.deriveBuild('deep', 3, 'crimson');
  const boss = M.deriveBuild('deep', 3, 'crimson', 'none', { guard: 100, weight: 100 });
  assert.equal(plain.expected, boss.expected); assert(boss.combat.bdefense < plain.combat.bdefense); assert.equal(boss.combat.knockback, .5);
});
test('preview is pure and cannot unlock tiers or create resources', () => {
  const state = M.createState(), original = JSON.stringify(state);
  M.deriveBuild('deep', 3, 'phantom', 'gladiator_blade_essence');
  assert.equal(JSON.stringify(state), original); assert.equal(M.requirements(state, 'deep').ready, false);
  const denied = M.awaken(state, 'deep', 1); assert.equal(denied.ok, false); assert.equal(denied.state, state);
});
test('effective cast credit deduplicates multi-hit and victim reports without a kill requirement', () => {
  let state = nextState(M.recordCombatEvent(M.createState(), event()));
  assert.equal(state.profiles.deep.uses, 1);
  const duplicate = M.recordCombatEvent(state, event('cast-1', { targetId: 'another-victim', hpDamage: 100 }));
  assert.equal(duplicate.ok, false); assert.equal(duplicate.state.profiles.deep.uses, 1);
  state = nextState(M.recordCombatEvent(state, event('cast-1', { characterId: 'solei', skillId: M.characters.solei.skillId })));
  assert.equal(state.profiles.solei.uses, 1); assert.equal(state.profiles.deep.uses, 1);
});
test('invalid damage, unconfirmed, friendly, dead and dummy events never gain mastery', () => {
  const state = M.createState();
  for (const override of [{ hpDamage: 0 }, { hpDamage: -1 }, { hpDamage: NaN }, { hpDamage: Infinity }, { hostile: false }, { aliveBefore: false }, { serverAccepted: false }, { training: true }, { skillId: 'another-skill' }]) {
    const result = M.recordCombatEvent(state, event('bad', override)); assert.equal(result.ok, false, JSON.stringify(override)); assert.equal(result.state, state);
  }
});
test('defensive utility has equivalent mastery credit; random utility does not', () => {
  const state = M.createState();
  assert.equal(M.recordCombatEvent(state, event('utility', { kind: 'utility' })).ok, false);
  const result = M.recordCombatEvent(state, event('guard', { characterId: 'block', skillId: M.characters.block.skillId, kind: 'utility', hpDamage: 0, useful: true }));
  assert.equal(result.ok, true); assert.equal(result.state.profiles.block.uses, 1);
});
test('challenge requires the configured skill task and a useful accepted cast, only once', () => {
  let state = M.createState();
  const task = event('counter', { kind: 'task', taskId: 'confirmed_followup' });
  assert.equal(M.recordCombatEvent(state, task).ok, false);
  state = nextState(M.recordCombatEvent(state, event('counter')));
  assert.equal(M.recordCombatEvent(state, { ...task, taskId: 'confirmed_return' }).ok, false);
  state = nextState(M.recordCombatEvent(state, task));
  assert.equal(state.profiles.deep.tasks, 1); assert.equal(M.recordCombatEvent(state, task).ok, false);
});
test('encounter caps survive serialized retry and reward is shared once across heroes', () => {
  let state = M.createState();
  for (let i = 0; i < 20; i++) state = nextState(M.recordCombatEvent(state, event('cap-'+i)));
  for (let i = 0; i < 5; i++) state = nextState(M.recordCombatEvent(state, event('cap-'+i, { kind: 'task', taskId: 'confirmed_followup' })));
  state = M.hydrate(JSON.parse(JSON.stringify(state))).state;
  assert.equal(M.recordCombatEvent(state, event('new-cast')).ok, false);
  assert.equal(M.recordCombatEvent(state, event('cap-6', { kind: 'task', taskId: 'confirmed_followup' })).ok, false);
  state = nextState(M.completeEncounter(state, first, { serverAccepted: true, cleared: true }));
  assert.deepEqual(state.wallet, { amethyst_cluster: 2, bronze_shard: 8 });
  assert.equal(M.completeEncounter(state, first, { serverAccepted: true, cleared: true }).ok, false);
});
test('three meaningful encounters can fund three upgrades using cumulative counters and finite costs', () => {
  let state = M.createState();
  let spentAmethyst = 0, spentBronze = 0;
  for (let index = 0; index < 3; index++) {
    const encounterId = M.encounterIds[index];
    for (let cast = 0; cast < 20; cast++) state = nextState(M.recordCombatEvent(state, event(`run-${index}-${cast}`, { encounterId })));
    for (let cast = 0; cast < 2; cast++) state = nextState(M.recordCombatEvent(state, event(`run-${index}-${cast}`, { encounterId, kind: 'task', taskId: 'confirmed_followup' })));
    state = nextState(M.completeEncounter(state, encounterId, { serverAccepted: true, cleared: true }));
    const before = { ...state.wallet };
    state = nextState(M.awaken(state, 'deep', index + 1));
    spentAmethyst += before.amethyst_cluster - state.wallet.amethyst_cluster;
    spentBronze += before.bronze_shard - state.wallet.bronze_shard;
  }
  assert.equal(state.profiles.deep.unlockedTier, 3); assert.equal(state.profiles.deep.uses, 60);
  assert.equal(spentAmethyst, 6); assert.equal(spentBronze, 24); assert.deepEqual(state.wallet, { amethyst_cluster: 0, bronze_shard: 0 });
  assert(M.requirements(state, 'deep').final); assert(!M.awaken(state, 'deep', 0).ok);
});
test('full wallet does not consume an encounter reward or silently lose resources', () => {
  const state = nextState(M.recordCombatEvent(M.createState(), event()));
  state.wallet.bronze_shard = 99;
  const result = M.completeEncounter(state, first, { serverAccepted: true, cleared: true });
  assert.equal(result.ok, false); assert.equal(result.state.encounters[first].rewarded, false); assert.equal(result.state.wallet.bronze_shard, 99);
});
test('atomic upgrade checks expected next tier, spends exactly once and does not reset progression', () => {
  let state = nextState(M.prepareNextTier(M.createState(), 'deep'));
  const original = JSON.stringify(state);
  const opened = M.awaken(state, 'deep', 1); assert.equal(opened.ok, true); assert.equal(JSON.stringify(state), original);
  state = opened.state;
  assert.equal(state.profiles.deep.uses, 20); assert.equal(state.wallet.amethyst_cluster, 0);
  const ready2 = nextState(M.prepareNextTier(state, 'deep'));
  const duplicate = M.awaken(ready2, 'deep', 1); assert(!duplicate.ok); assert.deepEqual(duplicate.state.wallet, ready2.wallet);
  assert.equal(ready2.profiles.solei.unlockedTier, 0);
});
test('equip requires actual unlock, compatible skill branch, one relic and safe point', () => {
  let state = M.createState();
  assert.equal(M.equip(state, 'deep', 'phantom', 'none', true).ok, false);
  for (let tier = 1; tier <= 3; tier++) { state = nextState(M.prepareNextTier(state, 'deep')); state = nextState(M.awaken(state, 'deep', tier)); }
  assert(!M.equip(state, 'deep', 'phantom', 'none', false).ok);
  assert(!M.equip(state, 'deep', 'gale-dance', 'none', true).ok);
  const wallet = { ...state.wallet };
  state = nextState(M.equip(state, 'deep', 'phantom', 'gladiator_blade_essence', true));
  assert.equal(state.profiles.deep.relicId, 'gladiator_blade_essence'); assert.deepEqual(state.wallet, wallet);
  assert.equal(state.profiles.solei.relicId, 'none');
});
test('versioned restore validates IDs, clamps damaged numeric fields and rejects unknown schema', () => {
  assert.equal(M.hydrate(null).restored, false); assert.equal(M.hydrate({ schemaVersion: 900 }).restored, false);
  const damaged = M.createState(); damaged.wallet.amethyst_cluster = -50; damaged.wallet.bronze_shard = Infinity;
  damaged.profiles.solei.branchId = 'crimson'; damaged.profiles.solei.relicId = 'gladiator_blade_essence'; damaged.profiles.solei.unlockedTier = 99; damaged.profiles.solei.uses = 999;
  const state = M.hydrate(damaged).state;
  assert.equal(state.wallet.amethyst_cluster, 0); assert.equal(state.wallet.bronze_shard, 0);
  assert.equal(state.profiles.solei.branchId, 'storm-eye'); assert.equal(state.profiles.solei.relicId, 'none'); assert.equal(state.profiles.solei.unlockedTier, 3); assert.equal(state.profiles.solei.uses, 60);
  assert.deepEqual(M.hydrate(JSON.parse(JSON.stringify(state))).state, state);
});
