import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const merge = new Function(readFileSync(new URL('../scripts/merge-gameplay.js',import.meta.url),'utf8')+';return mergeGameplayBlocks;')();
const flat = result => result.flatMap(r => {assert.ok(r.blocks);return r.blocks;});
test('keeps independent edits, deletions and additions from both authors',()=>{
  assert.deepEqual(flat(merge(['a','b','c','d','e'],['A','b','c','d','e','new'],['a','b','c','e'])),['A','b','c','e','new']);
  assert.deepEqual(flat(merge(['a','b'],['a','b'],['new','a','b'])),['new','a','b']);
  assert.deepEqual(flat(merge(['a','b'],['A','b'],['a','B'])),['A','B']);
});
test('overlapping edits require a choice and retain both alternatives',()=>{
  const result=merge(['a','b','c'],['a','mine','c'],['a','theirs','c']);
  assert.deepEqual(result.find(x=>!x.blocks),{mine:['mine'],theirs:['theirs']});
  assert.deepEqual(flat(merge(['a'],['same'],['same'])),['same']);
  assert.deepEqual(merge([],['one'],['two']),[{blocks:[]},{mine:['one'],theirs:['two']},{blocks:[]}]);
});
test('delete versus edit is explicit; unchanged documents never lose remote updates',()=>{
  const result=merge(['a','b','c'],['a','c'],['a','B','c']);
  assert.deepEqual(result.find(x=>!x.blocks),{mine:[],theirs:['B']});
  assert.deepEqual(flat(merge(['a'],['a'],[])),[]);
});
