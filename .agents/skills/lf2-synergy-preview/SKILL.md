---
name: lf2-synergy-preview
description: >-
  Use this skill whenever the user asks to design, preview, or choreograph character synergy movesets, team combos, or cooperative abilities for LF2 or Divergency characters (such as Solei, Tulas, Deep, Mark, Stranger, Dimraeth, Block, etc.). Also activate when the user requests "$lf2-synergy-preview", mentions "synergy preview", "hợp chiêu", "combo phối hợp", "minh họa combo", or wants an interactive HTML preview of character combos with timeline scrub, speed controls, hit/miss branches, and offline packaging.
---

# LF2 Synergy Preview

Tạo **bản minh họa chuyển động có thể xem ngay** (interactive HTML viewer), không dừng ở danh sách ý tưởng hoặc kế hoạch dạng text. Giữ phong cách trình chiếu của [bản mẫu Solei × Tulas](assets/reference-preview.html). Sử dụng [khung viewer](assets/viewer/index.html) và các script đi kèm; dựng chuyển động và kỹ năng phối hợp mới, hỗ trợ tua timeline, chỉnh tốc độ 0.5x/1x/1.5x, xem nhánh Đúng nhịp / Lỡ nhịp, và xuất file offline duy nhất `Synergy_Preview.html`.

## Nhận đầu vào và chọn phạm vi

- **Nhân vật**: Tên nhân vật, Avatar, CharacterStateSO, SpriteShow hoặc file sprite/Aseprite. Tự động kiểm tra trong workspace (như các file moveset `Divergency_Block_Moveset_Design.md`, `Divergency_Stranger_Moveset_Design.md`, v.v.).
- **Nguồn ý tưởng**:
  - *Tự nghĩ*: Phân tích moveset hiện có của các nhân vật và đề xuất các combo phối hợp (thay đổi quỹ đạo, hợp nhất nguyên tố, truyền động lực, hỗ trợ trên không, v.v.).
  - *Từ file thiết kế*: Đọc tài liệu chỉ định của người dùng.
  - *Kết hợp*: Giữ ý tưởng gốc của người dùng và bổ sung các nhịp tương tác còn thiếu.
- **Quy mô**: Mặc định từ 2 đến 3 synergy khác nhau về cơ chế cho mỗi cặp hoặc nhóm (2-3+ nhân vật).
- **Nguyên tắc**: Luôn có 2 nhánh kết quả: **Đúng nhịp (Hit)** và **Lỡ nhịp (Miss)**.

Đọc [WORKFLOW.md](WORKFLOW.md) để xem các ví dụ câu lệnh. Đọc [viewer-contract.md](references/viewer-contract.md) để nắm schema của `preview-data.js` và hàm render trong `choreography.js`.

## Xây dựng ý tưởng Synergy dựa trên nhân vật thật

1. **Phân tích moveset gốc**: Đọc kỹ năng đã có của nhân vật. Phân biệt rõ chiêu đã có trong game với cơ chế mới được sinh ra từ sự cộng hưởng (Synergy). Nếu Unity Editor đang mở, có thể dùng `unityMCP` hoặc powershell để xuất sprite/animation data.
2. **Cơ chế cộng hưởng thực chất**: Ưu tiên thay đổi hình thể chiêu thức, quỹ đạo bay, tạo điểm nổ mới, nảy tường, chuyền bóng/vũ khí, hoặc khống chế kẻ địch cho đồng đội dứt điểm. Tránh chỉ tăng damage hay buff chỉ số đơn thuần.
3. **Phân vai rõ ràng**: Từng nhân vật phải có vai trò cụ thể: Mở chiêu (Setup) → Kích hoạt/Biến đổi (Trigger/Mod) → Kết thúc (Finisher). Nếu người thứ 2 hoặc thứ 3 bấm sai nhịp (Miss), kết quả kỹ năng phải thay đổi trực quan (hụt đòn, nổ ngược, mất đà).
4. **Chia 4 nhịp trực quan (Beats)**:
   - `Nhịp 0: Chuẩn bị`: Vị trí khởi đầu, pose chuẩn bị xuất chiêu.
   - `Nhịp 1: Giao điểm / Kích hoạt`: Khoảnh khắc đòn đánh chạm nhau hoặc đồng đội vào vị trí.
   - `Nhịp 2: Cộng hưởng`: Hiệu ứng kỹ năng mới xuất hiện và tương tác mục tiêu.
   - `Nhịp 3: Kết thúc`: Thoát thế chiêu, pose hồi chiêu, kết quả trên mục tiêu.
5. **Tài liệu hóa**: Ghi `design.md` tóm tắt công thức kỹ năng, điều kiện kích hoạt, thời lượng và nhánh hụt.

## Chuẩn bị hình ảnh & Sprite

- **Ưu tiên sprite gốc**: Tận dụng sprite có sẵn trong dự án LF2/Divergency. [ExportSynergyPreview.cs](scripts/ExportSynergyPreview.cs) và [pack_sprites.py](scripts/pack_sprites.py) hỗ trợ trích xuất và đóng gói sprite sheet atlas không làm giảm chất lượng.
- **Tạo tài nguyên còn thiếu bằng công cụ AI (`generate_image`)**:
  - Khi thiếu frame động tác mới hoặc hiệu ứng VFX cộng hưởng đặc thù, sử dụng tool `generate_image` với prompt bám sát phong cách pixel art / 2D sprite gốc (giữ bảng màu, silhouette, kích thước pixel).
  - Ghi chú rõ các sprite nào là nguyên bản, sprite nào là concept tạo mới vào `sources.md`.
- **Canvas Effects**: Các đường quỹ đạo bay, tia năng lượng, vòng shockwave, vệt lướt, bóng đổ có thể vẽ trực tiếp bằng HTML5 Canvas 2D context trong `choreography.js`.

## Quy trình dựng Preview (Workflow)

### Bước 1: Khởi tạo thư mục preview mới
Chạy script khởi tạo qua công cụ dòng lệnh (powershell):

```powershell
python '<skill-path>/scripts/new_preview.py' --out 'output/<nhom>-synergy-v001' --title '<Tên bản minh họa>'
```

Thư mục sẽ được tạo với cấu trúc:
- `index.html`: Khung giao diện chuẩn Solei × Tulas.
- `viewer.js`: Engine canvas điều khiển phát, dừng, seek, nhịp, vai trò, speed.
- `preview-data.js`: Cấu hình danh sách nhân vật, atlases, sprites metadata, scenes, beats, miss conditions.
- `choreography.js`: Chứa hàm render theo thời gian `draw(d, t, missed, scene)`.
- `assets/`: Chứa file sprite atlas (`packed.png`).

### Bước 2: Viết dữ liệu và diễn hoạt
1. Khai báo nhân vật và scenes trong `preview-data.js` theo đúng schema [viewer-contract.md](references/viewer-contract.md).
2. Viết hàm chuyển động trong `choreography.js` dưới dạng hàm toán học thuần túy theo thời gian `t` (tính bằng giây).
   - Dùng các helper có sẵn của engine: `d.mix()`, `d.smooth()`, `d.seg()`, `d.sprite()`, `d.shadow()`, `d.label()`, `d.event()`.
   - Đảm bảo animation có tính xác định (deterministic): tua ngược/xuôi bất kỳ thời điểm nào `t` cũng cho ra đúng khung hình và vị trí, không dùng random hay biến đếm ngoài hàm.

### Bước 3: Kiểm tra tự động
Chạy script kiểm tra headless bằng Node.js:

```powershell
node '<skill-path>/scripts/check_preview.cjs' '<output-dir>'
```
Script sẽ tự động quét qua toàn bộ các frame, kiểm tra tính toàn vẹn của sprite atlas, beats, captions, và ghi kết quả vào `validation.json`.

### Bước 4: Đóng gói thành file HTML Offline
Chạy script bundle để nhúng toàn bộ ảnh, CSS, JS thành 1 file HTML duy nhất:

```powershell
python '<skill-path>/scripts/bundle_preview.py' '<output-dir>'
```
Lệnh này tạo ra file **`Synergy_Preview.html`** có thể mở trực tiếp trên bất kỳ trình duyệt nào mà không cần web server.

### Bước 5: Bàn giao và kiểm tra trên trình duyệt
1. Mở file xem trước bằng trình duyệt hoặc `browser_subagent` để kiểm tra trực quan.
2. Cung cấp đường dẫn file `Synergy_Preview.html` cho người dùng kèm tóm tắt các cơ chế cộng hưởng và hướng dẫn xem (nút phát/dừng, tua thanh trượt, đổi nút Đúng nhịp / Lỡ nhịp).

## Bàn giao tối thiểu
Mỗi sản phẩm preview hoàn chỉnh gồm:
1. `Synergy_Preview.html`: File xem độc lập, chạy offline.
2. Thư mục mã nguồn (`index.html`, `viewer.js`, `preview-data.js`, `choreography.js`, `assets/`).
3. `design.md`: Bản mô tả thiết kế gameplay, điều kiện kích hoạt, công thức combo.
4. `sources.md`: Nguồn gốc sprite sử dụng và prompt hình ảnh nếu có tạo mới.
5. `validation.json`: Báo cáo kiểm tra chất lượng tự động.
