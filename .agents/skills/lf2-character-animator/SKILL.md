---
name: lf2-character-animator
description: >-
  Use this skill whenever the user asks to analyze, design, generate, choreograph, or preview animations, attacks, combos, or sprite sheets for Little Fighter 2 (LF2) or Divergency characters (such as Jameson, Deep, John, Henry, Louis, Firen, Freeze, Dennis, Woody, Davis, etc.). Also activate when the user mentions "$lf2-character-animator", "tạo animation nhân vật", "sinh đòn đánh", "animation studio", "tách layer aseprite", "lf2 wait preview", wants consistent 30FPS LF2 wait timings, or needs separated layer .aseprite files (Body + FX) with interactive HTML5 studio suites.
---

# LF2 Character Animator & Layered Studio

Skill chuyên biệt để phân tích, biên đạo đòn đánh, sinh hoạt ảnh pixel art đa khung hình, tự động xuất file **Aseprite đa tầng tách biệt (Separated Layers: Body + FX)**, chuẩn hóa hệ thống nhịp chờ **LF2 Wait Engine (30 FPS Ticks)**, và đóng gói **Animation Studio HTML5 tương tác đa chế độ (Deep Inspector & Show-All Matrix)**.

---

## 1. Nguyên Tắc Cốt Lõi (Core Principles)

1. **Chuẩn hoá Tọa độ & Canh lề (Anchor & Canvas Alignment)**:
   - Giữ nguyên kích thước khung vẽ chuẩn của nhân vật (ví dụ: `399 × 150 px` đối với boss Act 1 Divergency, hoặc `80 × 80 px` chuẩn LF2 cổ điển).
   - Điểm neo mặt sàn (`Ground Baseline`) và gốc tọa độ nhân vật (`Origin Point`, ví dụ: `[200, 144]`) phải đồng nhất 100% giữa các đòn đánh để tránh hiện tượng nhân vật bị giật/trượt vị trí khi chuyển frame.

2. **Cơ chế Tách Lớp Aseprite Bắt Buộc (Separated Layers Architecture)**:
   - Mọi file `.aseprite` xuất ra **bắt buộc phải tách biệt các Layer**:
     - `Character_Body` (hoặc `Body`): Chứa nét vẽ thân hình, đầu, tóc, quần áo, cơ bắp nhân vật.
     - `FX_Effects` (hoặc `Blood_FX` / `Impact_FX`): Chứa hiệu ứng vết cào, vệt móng vuốt, luồng huyết khí, vòng shockwave va chạm, gai đá, tia chớp, bụi đất.
   - Nhờ tách lớp, họa sĩ và lập trình viên có thể tùy biến hoặc tái sử dụng VFX cho đòn đánh khác, cũng như tinh chỉnh body mà không làm hỏng hiệu ứng.

3. **Chuẩn hóa Nhịp Chờ LF2 (Deterministic LF2 Wait Engine)**:
   - Trong Little Fighter 2, thời lượng hiển thị khung hình được đo bằng số nguyên `wait`:
     $$\text{Duration (ms)} = \text{wait} \times 33.333\text{ ms (chuẩn 30 FPS)}$$
     - `wait: 1` = 33.3ms (Chớp mắt, tia sét, flash va chạm).
     - `wait: 2` = 66.7ms (Đòn đánh cực nhanh, vung kiếm, chém vuốt).
     - `wait: 3` = 100.0ms (Nhịp chuẩn của chạy bộ hoặc đòn đánh cơ bản).
     - `wait: 4–6` = 133–200ms (Lấy đà, tụ lực, hồi chiêu nặng).
     - `wait: 9` = 300.0ms (Tiếp đất nện sàn, khựng đòn nặng).
   - Trong Web Preview, phải sử dụng cơ chế **Accumulator Timer** (`performance.now()`) để loại bỏ hoàn toàn hiện tượng trôi khung hình (drift) hoặc giật lag.

4. **Bắt Buộc Tài Liệu Hóa README (Pose Concepts & Animation Descriptions)**:
   - **Mọi thư mục Suite xuất ra ĐỀU PHẢI CÓ file `README.md`**.
   - Tài liệu này không được viết chung chung, mà phải phân tích sâu:
     - **Ý đồ tư thế (Pose Concept)**: Trọng tâm (center of gravity), độ vặn xoắn cơ thể (torsion), đường lực (line of action), và độ dễ nhận diện hình bóng (silhouette readability).
     - **Mô tả hoạt ảnh (Animation Description)**: Từng nhịp (Anticipation lấy đà -> Strike vung đòn -> Impact va chạm -> Recovery hồi thế).
     - **Mô tả hiệu ứng tầng (Layer FX Separation)**: Cơ chế hiển thị của từng hiệu ứng trên tầng Body và tầng FX độc lập.
     - **Thông số kỹ thuật LF2**: Bảng Wait ticks, mã state, hộp va chạm `bdy` và `itr`.

---

## 2. Quy Trình Làm Việc Chuẩn (Standard Workflow)

### Bước 1: Tiếp nhận Sprite & Phân Tích Khung Hình
1. Quét tệp nguồn: File tĩnh (`.png`), file động (`.gif`), hoặc file `.aseprite` có sẵn.
2. Trích xuất thông tin: Kích thước canvas, bounding box thực tế, bảng màu đặc trưng (da, tóc, áo, ánh mắt, hiệu ứng).
3. Đọc dữ liệu chuyển động gốc: Các thẻ (`frameTags`), nhịp `wait` gốc, và các góc cử động cơ thể.

### Bước 2: Thiết Kế Bộ Đòn Đánh Bổ Sung (Move Design)
Biên soạn các đòn đánh mới phù hợp với Archetype nhân vật (Brawler, Berserker, Assassin, Mage, Boss):
* **Combo cận chiến cơ bản (`A > A > A`)**: Đấm móc, cùi chỏ, nện búa.
* **Special tầm trung (`D > A`)**: Vung vuốt, chém kiếm, phóng năng lượng.
* **Ground Control (`D v A`)**: Dậm sàn, cọc đá, địa chấn.
* **Anti-Air / Surround (`D ^ A`)**: Xoay vòng 360 độ, đá xoáy.
* **Command Grab (`Run + A` / `D > J`)**: Lao tới tóm cổ, nhấc bổng đập sàn.

### Bước 3: Sinh Hoạt Ảnh & Tách Lớp Hình Ảnh (Frame Generation & Layering)
Sử dụng script Python để sinh:
* Thư mục `body/frame_XX.png`: Chỉ chứa lớp cơ thể.
* Thư mục `fx/frame_XX.png`: Chỉ chứa lớp hiệu ứng trong suốt.
* Thư mục `composite/frame_XX.png`: Hợp nhất cả hai cho ảnh động GIF và Web Preview.

### Bước 4: Tự Động Biên Dịch File `.aseprite` Đa Tầng Qua Lua
Chạy lệnh Aseprite CLI kết hợp script Lua tự sinh (`aseprite -b --script export.lua`) để nạp từng frame vào đúng Layer:
```lua
local spr = Sprite(399, 150)
local lBody = spr.layers[1]
lBody.name = "Character_Body"
local lFX = spr:newLayer()
lFX.name = "FX_Effects"

-- Gán hình và đặt nhịp chờ chính xác
spr:newCel(lBody, frame_idx, img_body, Point(0, 0))
spr:newCel(lFX, frame_idx, img_fx, Point(0, 0))
spr.frames[frame_idx].duration = wait_value * 0.033333
```
Đồng thời tạo một file **`Master_Combat.aseprite`** tổng hợp tất cả các chiêu thức theo từng **Tag** riêng biệt (`IDLE`, `RUN`, `COMBO`, `CLAW`, `QUAKE`, `GRAB`, `SPIN`).

### Bước 5: Tạo File `README.md` Ý Tưởng Pose & Đóng Gói Bộ Suite
Viết file `README.md` theo cấu trúc mục 3 dưới đây, sau đó xuất bộ thư mục hoàn chỉnh:
```
<Character>_Animation_Suite/
├── README.md                 # TÀI LIỆU Ý TƯỞNG CÁC POSE & MÔ TẢ CHI TIẾT ANIMATION
├── aseprite/                 # Chứa các file .aseprite có tách layer Body + FX
│   ├── <Character>_Master_Combat.aseprite
│   └── <Character>_<anim>_layered.aseprite
├── gifs/                     # Các file .gif xem nhanh
├── spritesheets/             # Master Spritesheets (Composite, Body Only, FX Only)
├── frames/                   # Từng frame lẻ chia theo body/ fx/ composite/
├── metadata.json             # Dữ liệu timing, hitboxes itr/bdy, wait ticks
└── index.html                # Animation Studio tương tác offline
```

---

## 3. Cấu Trúc Bắt Buộc Của File `README.md` Cho Nhân Vật

Mỗi khi tạo hoạt ảnh, file `README.md` phải gồm các phần sau:

1. **Tổng Quan Nhân Vật & Visual Archetype**:
   - Tên, vai trò trong cốt truyện, phong cách chiến đấu, kích thước canvas và điểm neo (`Anchor Origin`).
   - Ngôn ngữ hình thể đặc trưng (khom lưng, hiên ngang, thoăn thoắt, lơ lửng).
2. **Bảng Danh Mục Đòn Đánh (Move List Table)**:
   - Tên đòn, lệnh bấm LF2, số frames, tổng nhịp `wait` ticks, vai trò chiến thuật.
3. **Chi Tiết Ý Tưởng Từng Pose & Phân Tích Động Tác (Deep Pose Concepts)**:
   - Với **mỗi đòn đánh**:
     - *Ý tưởng tư thế (Pose Intent & Mechanics)*: Tại sao nhân vật vào pose đó? Trọng tâm đặt ở đâu? Đường lực (Line of Action) chạy từ chân qua hông lên tay như thế nào?
     - *Diễn biến từng nhịp (Anticipation -> Strike -> Impact -> Recovery)*: Phân tích cơ bắp, tà áo, nét mặt và vũ khí/móng vuốt.
     - *Tách lớp Body & FX*: Lớp Body làm gì, lớp FX làm gì.
4. **Bảng Thông Số LF2 Data & Frame Timings**:
   - Bảng ánh xạ Frame, Wait ticks, thời lượng ms, vùng sát thương `itr` và thân thể `bdy`.
5. **Hướng Dẫn Sử Dụng File Aseprite & Studio**:
   - Cách mở các layer trong Aseprite, cách chạy Studio offline.

---

## 3. Tính Năng Của Animation Studio HTML5
Studio HTML5 tự chứa (`Self-Contained Offline Web App`) cung cấp 2 chế độ:

1. **Chế độ Deep Inspector**:
   - Thanh trượt scrubber chính xác từng tick `wait`.
   - Bảng trực quan hóa thời lượng khung hình tỷ lệ (`Proportional Wait Blocks`).
   - Lựa chọn bật/tắt Layer: `🌟 Composite` | `🧍 Body Only` | `🩸 FX Only`.
   - Hiển thị vùng sát thương LF2: `itr` (Đỏ) và `bdy` (Xanh ngọc).
   - Kỹ thuật Onion Skinning (hiển thị bóng mờ frame trước).
   - Trình tạo code LF2 Data tương ứng với frame đang chọn.

2. **Chế độ Show All (Matrix Gallery)**:
   - Hiển thị toàn bộ các hoạt ảnh cùng lúc trên lưới trực quan.
   - Cơ chế chạy đồng thời hoặc độc lập với nhịp `wait` chuẩn 30 FPS.
   - Nút chuyển nhanh tầng hiển thị toàn cục (`Global Layer Toggle`).
   - Bấm vào bất kỳ card nào để chuyển ngay sang chế độ Deep Inspector.

---

## 4. Scripts Tái Sử Dụng Đi Kèm
Trong thư mục `scripts/` của Skill:
* `build_layered_aseprite.py`: Biên dịch ảnh PNG thành file `.aseprite` tách lớp qua Lua.
* `compile_master_sheet.py`: Ghép các frame thành Spritesheet Master.
