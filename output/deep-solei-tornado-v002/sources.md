# Nguồn hình và ghi chú

## Sprite nguyên bản

Project: `C:/Users/Quang Huy Nugyen/LF2Revie`. Xuất read-only qua Unity Editor 6000.4.5f1 bằng unity-cli; không lưu scene, không đổi asset, import settings hay gameplay.

- Deep bản mới: `Assets/Images/Animation/Olds_LF2/Deep/Deep_New/Animation_clip_deep/ANI_IMAGE`; SpriteShow `Assets/SOs/SpriteAnimation/Deep/Deep_Sprite.asset`.
- Solei: `Assets/Images/Animation/Solei`; SpriteShow `Assets/SOs/SpriteAnimation/Solei/Solei_Sprite.asset`.
- VFX Deep: `Assets/SOs/SpriteAnimation/Deep/Effect_Deep.asset`.
- VFX Solei: `Assets/SOs/SpriteAnimation/Solei/solei_EF.asset`.
- Mục tiêu tập Gunn: `Assets/SOs/SpriteAnimation/NPC/Gunn_Anim.asset`.

`raw/` giữ texture và metadata xuất từ Unity. `selection.json` chỉ ra các clip dùng cho bản cuối; `assets/packed.png` chứa 477 hình gốc đóng gói lossless, không tô lại màu. Các pivot và thời lượng cel được giữ trong `assets/sprites.json`. Với cel nguồn có tick không dương, bản minh họa dùng 6 tick/cel; mọi thay đổi này nằm trong `assets/packing-notes.json`. Timing đã kéo giãn, các đoạn giữ pose và quỹ đạo mới chỉ phục vụ xem ý tưởng.

Deep lấy từ `Deep_New`, không dùng bộ kỹ năng Deep cũ. Các nguồn cơ chế: `Assets/LF2_multiplayer/GamePlay/Game/NewStateMachine/Deep_New/Skill_1_Deep`, `Skill_3_Deep`, `Skill_4_Deep`, `Skill_5_Deep`, `Skill_7_UpStom`; phía Solei là `Skill_3_Solei`, `Skill_4_Solei`, `NewCombat`, `RelayKick` và `Skill_2_Solei`. Xem chi tiết từng ý tưởng trong `design.md`.

## Hình mới

`assets/chim-kiem.png` là concept mới của bản đầu, tạo bằng công cụ Imagegen tích hợp. Hình tham chiếu `_work/concept-reference.png` được ghép từ sprite nguyên bản, chỉ làm hướng dẫn palette và mật độ pixel. PNG RGBA do Imagegen trả về được dùng trực tiếp với alpha, không chroma key hay tô lại nhân vật. Đã xem hình trên nền sân tập và ở cả bố cục rộng/hẹp.

Prompt đã sử dụng:

> Use case: stylized-concept. Create one new pixel-art game projectile sprite for LF2Revie Deep × Solei synergy. The attached sheet is only an authoritative STYLE AND PALETTE REFERENCE, not an edit target. Upper left is Solei's crimson Bloodwing bird; upper right is Deep's slate-lavender Soul Liberation ghost projectile. Create their fused projectile: a compact right-facing angular crimson energy bird whose TWO swept wings terminate in curved slate-lavender sword blades, with a small ivory blade beak and dark wine central core. Readable hooked bird silhouette, no humanoid ghost, no character bodies. Preserve the reference's small chunky pixel clusters and muted palette. Actual low-resolution sprite appearance, approximately 88 by 56 logical pixels enlarged by nearest neighbor on a transparent square canvas. A single centered sprite, occupies 85% canvas width, with ample transparent padding; no other images, no text, no labels, no frames. Colors limited to dark wine #460817, crimson #980d22, vermilion #d32b37, slate #424b67, gray lavender #8894b5, pale ivory #d9dfdf. Flat discrete pixel colors, no gradients, no smooth antialiasing, no glow blur, no photorealism. Genuinely transparent background. This is a new combined magical projectile concept; do not alter or redraw either character.

Các vòng mốc, tia va chạm, đường gợi ý và vệt chuyển động đơn giản được vẽ bằng Canvas. Phần nhân vật, kiếm cắm và VFX khác đều dùng sprite gốc. Cơ chế hợp thể là đề xuất mới, không phải xác nhận gameplay đang tồn tại.

## Khung xem và kiểm tra

Khung `lf2-synergy-preview/assets/viewer`, cùng bố cục Solei × Tulas; đã đồng bộ phiên bản chỉ minh họa thành công trong ngày 2026-09-21. JavaScript chạy offline, không fetch, CDN hay tài nguyên mạng. `validation.json` chứa kiểm tra tĩnh, 1.805 mốc tua và kết quả kiểm tra browser; ảnh kiểm tra nằm trong `_work/`.


## VFX lốc xanh–đỏ — 2026-10-02

`assets/tornado-cyan-crimson.png`: concept VFX mới tạo bằng công cụ imagegen tích hợp, nền alpha trong suốt; dùng trực tiếp, không sửa sprite nhân vật. Preview co giãn từng dải ảnh theo thời gian tuyệt đối, thêm các vòng xoắn trước/sau, hạt hút, hit spark và chuyển động địch bằng Canvas. Prompt đầy đủ ở `tornado-prompt.txt`. Đây là một ảnh VFX được diễn hoạt trong canvas, chưa phải sprite sheet animation cho Unity.

Bản cập nhật thêm nhánh hụt riêng cho Quỹ Đạo Hồi Phong; giữ bốn cảnh khác. Kiểm tra bổ sung ghi trong validation.json.


## Tornado animation correction — 2026-10-02

The active VFX is now `assets/tornado-spin-8frames.png`: eight distinct AI-generated rotation cels in a 4 × 2 sheet, 1536 × 1024 pixels. Cells are 384 × 512; metadata/pivots in `assets/tornado-spin-8frames.json`. The renderer plays 12 FPS (5 ticks per cel) and aligns each foot pivot, with no horizontal-strip deformation. The previous one-image VFX is retained only as a historical concept.

Color/style reference: original `Deep/Sk3_Swift` and `Solei/Solei_Combat_solei_tornator`, plus `soleifx/ef_tornator_spin`, extracted without repainting into `assets/tornado-style-reference.png`. Source colors sampled directly from the atlas: Deep #cb0b0b / #751111; Solei #51ead6 / #6aa099 / #3f6762 / #80bfb7 / #34b1a2 / #59ffea. Imagegen was guided by those colors and the original flat pixel clusters. Canvas accents now use #51ead6 and #cb0b0b. Generated pixels are not claimed to be an exact indexed palette.

Tool: built-in imagegen with transparent background. Full generation prompt: `tornado-animation-prompt.txt`. Isolated animation and cel inspection: `Tornado_Animation.html`. Main synergy choreography and its 12-hit timing remain intact.


## Broad-column tornado revision — 2026-10-02

Active asset: `assets/tornado-spin-wide-8frames.png`, edited with built-in imagegen from the previous sheet. All eight frames now have a broad swirling foot and thick body; the crown is only slightly wider. Palette and eight-frame loop retained. The old sheet is preserved. Metadata: `assets/tornado-spin-wide-8frames.json`; prompt: `tornado-wide-prompt.txt`. Main preview scale is 0.60; foreground spiral widths now follow the broad column.


## Freeze-inspired wind revision — 2026-10-02

Active animation: `assets/tornado-freeze-inspired-8frames.png` / `.json`. Built-in imagegen generated eight distinct cels using the user-provided `C:/Users/Quang Huy Nugyen/LF2Revie/Assets/Images/Animation/Olds_LF2/Freeze/Freeze/freeze_ww.png` as the primary reference. The original source was copied without edits to `assets/freeze-ww-reference.png` for comparison. It remains unchanged in the Unity project.

The new effect borrows Freeze's scratchy horizontal wind slivers, broken elliptical arcs and transparent gaps, retaining the broad wind envelope and Deep/Solei red–mint palette. It is an AI-generated interpretation, not the original Freeze animation recolored. Full prompt: `tornado-freeze-prompt.txt`. Eight cels at 12 FPS; foot pivots aligned per frame, existing launch and multi-hit timings retained.


## Exact original art, palette-only — current version

The active atlas is now the byte-for-byte original `freeze_ww.png`, copied as `assets/freeze-ww-reference.png`. None of the generated interpretations is used. `freeze-palette.js` replaces seven source RGB values in a canvas at load time; it leaves each pixel position and alpha value intact. Original ten 160 × 160 frames, 5 × 2 sheet, original bottom-center pivots. No additional tornado rings or texture are drawn over it. The inspector can export the recolored canvas directly as PNG.

Frames/pivots are read from the original `.png.meta`; 12 FPS is an illustrative playback choice, not a claim about Freeze gameplay timing. Main preview renders at a uniform scale of 1.6. `assets/freeze-exact-10frames.json` records the original rectangles. This version uses direct palette rendering, not generative image editing.
