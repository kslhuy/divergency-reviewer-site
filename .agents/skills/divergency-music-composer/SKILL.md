---
name: divergency-music-composer
description: >-
  Use this skill whenever the user asks to compose, generate, create, or preview music, soundtrack (OST), background music (BGM), ambient soundscapes, boss battle themes, character leitmotifs, or sound effects (SFX, kiếm chém, phép thuật, va chạm, tiếng động UI, ambient loop) for Divergency or LF2. Also activate when the user requests "$divergency-music-composer", mentions "tạo nhạc", "sinh nhạc", "làm nhạc", "nhạc không lời", "music generator", "soundtrack", "tạo sfx", "âm thanh kiếm", "tiếng động game", or simply provides an idea for a track or sound effect (e.g., "Tạo nhạc cho boss Dimraeth", "Nhạc lúc Solei gặp mẹ", "SFX kiếm chém của Solei", "Tiếng chưởng phép Sakuri"). The skill automatically builds storyline/combat context, verifies and opens ACE-Step (port 7865) and Aura Audio Studio (port 8765), autonomously generates audio, and syncs to both the project and the Studio library.
---

# Divergency Music & Audio Composer (Skill Tạo Nhạc & Sound FX Tự Động)

Skill này cho phép trợ lý AI đóng vai trò **Nhà Thiết Kế Âm Thanh & Soạn Nhạc Tự Động (Autonomous Audio & Music Designer)** cho dự án Divergency / LF2. Sau khi hợp nhất bộ công cụ **Aura Audio Studio** (kết hợp **ACE-Step 3.5B** và **Stable Audio 3 Engine**), agent có khả năng tạo cả:
1. **Nhạc nền, OST, Vocal & Leitmotif (ACE-Step Engine):** Thời lượng 30s - 180s+, đa tầng nhạc cụ dân tộc/gothic/công nghiệp, hỗ trợ cả không lời `[instrumental]` và có lời hát.
2. **Phát triển & Sửa nhạc (Audio Remix / Extend / Repaint):** Nạp bài hát bất kỳ (.wav/.mp3), AI giữ giai điệu/motif gốc để phối khí lại theo phong cách mới (orchestral, metal, oriental, synthwave), nối dài thời lượng (+15s đến +60s) hoặc thay thế đoạn nhạc cụ thể.
3. **Hiệu ứng âm thanh Sound FX & Foley (Stable Audio Engine):** Tiếng vung kiếm, va chạm giáp sắt, phép thuật hư không, nện đất chấn động, tiếng bước chân, âm thanh UI game.
4. **Vòng lặp không gian Ambient (Seamless Loops):** Âm hưởng hang động, đền đài, bến cảng mưa rơi lặp liền mạch không vết nối.

Tất cả file tạo ra đều tự động đồng bộ về thư mục dự án `content/gameplay/audio/` và xuất hiện trực tiếp trên bàn phát **Aura Studio Web Deck** (`http://127.0.0.1:8765/`) với biểu đồ sóng âm (Waveform Visualizer) và nút bấm 1-click **🪄 Sửa / Remix**.

---

## Kiến Trúc Hệ Thống Đồng Bộ

- **Aura Audio Studio (Master UI):** `http://127.0.0.1:8765/` (Khởi động bằng `START_AUDIO_STUDIO.bat`).
- **ACE-Step 3.5B Engine:** `http://127.0.0.1:7865/` (Xử lý nhạc dài, phối khí, ca khúc).
- **Thư mục âm thanh dự án:** `content/gameplay/audio/`
- **Thư viện âm thanh Studio:** `C:\Users\Quang Huy Nugyen\Videos\Marketting_game\Music_SoundFX_MrLinken91\Music_SoundFX_MrLinken91\output\generated\`

---

## Quy Trình Thực Hiện Tự Động (Autonomous Workflow)

### Bước 1: Khai Thác Bối Cảnh Cốt Truyện / Combat Context
- Nếu yêu cầu là **Nhạc (OST / BGM / Theme)**:
  - Tra cứu cốt truyện tại `content/story/`, `content/story-summary/`, hoặc [lore_music_matrix.md](references/lore_music_matrix.md).
  - Chọn 3 - 5 nhạc cụ định danh phù hợp (VD: Solei - sáo trúc shakuhachi & chuông ngọc; Dimraeth - violin điện gào thét & trống công nghiệp; Calvaria - đại phong cầm pipe organ).
- Nếu yêu cầu là **Hiệu ứng âm thanh (SFX / Foley)**:
  - Xác định chất liệu va chạm (kim loại, đất đá, gỗ, năng lượng sóng âm), độ sắc bén, độ vang sub-bass, và tính cô lập (isolated sound effect, no music).

### Bước 2: Tự Động Kiểm Tra Máy Chủ Âm Thanh
Chạy script kiểm tra tự động trước khi gọi lệnh:
```powershell
python ".agents/skills/divergency-music-composer/scripts/ensure_server.py"
```
- Script tự động phát hiện nếu engine đang chạy trên port 7865 / 8765.
- Nếu chưa chạy, script sẽ tự động kích hoạt launcher `START_AUDIO_STUDIO.bat` hoặc `START_ACE_STEP.bat`.

### Bước 3: Chuẩn Hóa Cấu Trúc Prompt & Tham Số

#### A. Tạo Nhạc Nền / OST (ACE-Step - Mặc định)
- **Lyrics:** Luôn là `"[instrumental]"` nếu người dùng muốn nhạc không lời.
- **Tags (Prompt):** Thể loại/không gian + Nhạc cụ chi tiết + Cảm xúc cốt truyện + Tempo BPM.
- **Thời lượng:** `45.0`s (hoặc `30` - `90`s).
- **Inference Steps:** `50`. Guidance Scale: `15.0`.

#### B. Tạo Hiệu Ứng Âm Thanh (Sound FX)
- **Prompt:** `one sharp sword slash cutting through air and metallic impact, crisp clean game sound effect, isolated, no music`
- **Thời lượng:** `1.5`s đến `4.0`s. Steps: `10`. CFG: `3.5`.

#### C. Tạo Vòng Lặp Âm Thanh Nền (Ambient Loop)
- **Prompt:** `low brooding dungeon ambient drone, distant dripping water, faint eerie wind whispers, seamless loop background`
- **Thời lượng:** `25.0`s. Steps: `10`. CFG: `2.5`.

### Bước 4: Tự Động Kích Hoạt Sinh Âm Thanh & Lưu File

#### Tạo Nhạc Nền (Mode Music):
```powershell
python ".agents/skills/divergency-music-composer/scripts/generate_music.py" `
  --mode music `
  --prompt "<Chuỗi Tags âm nhạc chi tiết>" `
  --lyrics "[instrumental]" `
  --duration 45.0 `
  --infer-steps 50 `
  --output-name "<tên_file_goi_nho>" `
  --output-dir "c:\Users\Quang Huy Nugyen\divergency-reviewer-site\content\gameplay\audio"
```

#### Tạo Sound FX (Mode SFX):
```powershell
python ".agents/skills/divergency-music-composer/scripts/generate_music.py" `
  --mode sfx `
  --prompt "one sharp katana slash with spark deflection ping, isolated game combat sound effect, no music" `
  --duration 2.5 `
  --infer-steps 10 `
  --output-name "solei_slash_01" `
  --output-dir "c:\Users\Quang Huy Nugyen\divergency-reviewer-site\content\gameplay\audio"
```

*(Script tự động tải/copy file `.wav` về `content/gameplay/audio/` VÀ tự động đồng bộ sang thư viện của Aura Audio Studio để người dùng nghe lại trên web bất kỳ lúc nào).*

### Bước 5: Phản Hồi Người Dùng
Báo cáo kết quả theo cấu trúc chuẩn:
1. **Link file nghe ngay:** Clickable markdown link dạng `[tên_file.wav](file:///c:/Users/Quang%20Huy%20Nugyen/divergency-reviewer-site/content/gameplay/audio/tên_file.wav)`.
2. **Link mở Studio Web Deck:** Nhắc người dùng có thể nghe thử và xem biểu đồ sóng âm trực tiếp tại [Aura Studio (http://127.0.0.1:8765/)](http://127.0.0.1:8765/).
3. **Hồ sơ âm thanh (Identity):** Chế độ (Music/SFX), thời lượng, BPM, nhạc cụ / chất liệu âm thanh.
4. **Phân tích nghệ thuật & Gợi ý ứng dụng:** Giải thích ý đồ hòa âm hoặc cách gắn sự kiện âm thanh vào animation hitframe của game.

---

## Bảng Tra Cứu Nhanh Theo Yêu Cầu Phổ Biến

| Yêu Cầu Người Dùng | Chế Độ (`--mode`) | Nhạc Cụ / Prompt Đề Xuất | File Đầu Ra |
| :--- | :--- | :--- | :--- |
| *"Tạo nhạc cho Solei"* | `music` | Sáo trúc shakuhachi, đàn koto, chuông ngọc tuyết rơi, 72 BPM. | `solei_theme.wav` |
| *"Tạo nhạc cho boss Dimraeth"* | `music` | Violin điện biến dạng gào thét, cello u tối, trống dồn 135 BPM. | `dimraeth_boss_duel.wav` |
| *"Tạo nhạc Chapter 3 Calvaria"* | `music` | Đại phong cầm pipe organ, hợp xướng ma quái, chuông tử thần 55 BPM. | `calvaria_bone_cathedral.wav` |
| *"Tạo tiếng chém kiếm của Solei"* | `sfx` | `one sharp sword slash cutting air, crisp metallic impact, isolated game sfx` | `solei_sword_slash.wav` |
| *"Tiếng phép thuật sóng âm Sakuri"* | `sfx` | `destructive sonic resonance burst, screeching glass and air blast, game sfx` | `sakuri_sonic_blast.wav` |
| *"Tiếng đỡ khiên parry"* | `sfx` | `heavy metallic shield parry deflection with high-pitched spark ping, combat sfx` | `shield_parry_hit.wav` |
| *"Vòng lặp hang động ẩm ướt"* | `ambient` | `subterranean cave ambient drone, dripping water echoes, seamless loop` | `dungeon_cave_loop.wav` |
