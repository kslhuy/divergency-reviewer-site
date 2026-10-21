import test from 'node:test';
import assert from 'node:assert/strict';
import { assertCharacterCanon, characterCanonViolations } from '../scripts/check-character-canon.mjs';
import { buildDocs } from '../build-reviewer-html.mjs';

test('maintained documents and skills follow the author-approved character canon', () => {
  assert.ok(assertCharacterCanon({ includeGenerated: true }) > 100);
});

test('known weapon and role mixups fail even across HTML formatting', () => {
  for (const text of [
    '<strong>Solei:</strong> (rút song đao, chắn trước mặt Mark)',
    'Solei chủ động tra kiếm vào vỏ.',
    'Solei dùng chiêu thức ma thuật diện rộng.',
    'Deep nắm chuôi đại kiếm.',
    'Mark chĩa mũi súng vào trong.',
    'Block giương khiên chắn đòn.',
    'Signature Weapon: Twin Steel Kunai',
    'speaker: "SOLEI", action: "(vỗ vào chuôi song đao)",',
    'Divergency / LF2 Audio Showcase',
    'Từ làm lại LF2 đến game mới',
    'LF2 Animation Studio',
  ]) assert.ok(characterCanonViolations(text).length, text);
});

test('teammate swords, enemy weapons, liquid barriers and metaphors remain valid', () => {
  for (const text of [
    'Solei đá ép góc; Deep dùng kiếm ngắn kết thúc.',
    'Solei né đòn khi con rết vung kiếm.',
    'Block đỡ đòn bằng thế thủ boxing; Tulas tạo khiên chất lỏng.',
    'Block là tấm khiên bảo vệ đồng đội bằng cơ thể vững chãi.',
    'Mark bắn tên; Bruno cầm súng.',
    'Mark tách cung thành kiếm, đeo kính kiểu laser.',
    'Divergency is an original game. Little Fighter 2 is a source of inspiration.',
  ]) assert.deepEqual(characterCanonViolations(text), [], text);
});

test('editor drafts containing a canon conflict are rejected before saving', () => {
  assert.throws(() => buildDocs('<h1>Test</h1><p>Solei rút song đao.</p>', { local: true }), /Character canon conflict/);
});
