# DIVERGENCY: BÀI HỌC THIẾT KẾ GAME & NÂNG CẤP HỆ THỐNG TỪ CASE STUDY DIMRAETH (MUDTEK)

> **Tài liệu tham chiếu:** Hệ thống chiến đấu *Tactical Brawler (LF2 style + AI Command System)*, Cơ chế Tải trang bị (Deck Loadout), và Nghiên cứu Cơ chế Game *Dimraeth* (Early Access 09/2026 - 500k Wishlists).  
> **Mục đích:** Đúc kết những tinh hoa thiết kế hệ thống, vòng lặp chuẩn bị, tương tác đồng đội, đồng thời nhận diện các "cái bẫy" thiết kế để tối ưu hóa lối chơi cho *Divergency*.

---

## 1. TỔNG QUAN SO SÁNH & ĐỊNH VỊ THỂ LOẠI

| Tiêu chí | Dimraeth (Mudtek) | Divergency | Ứng dụng & Điều chỉnh |
| :--- | :--- | :--- | :--- |
| **Thể loại cốt lõi** | Isometric Pixel ARPG, Sandbox Survival, Base-building. | 2.5D Pixel Dark Fantasy Tactical Brawler (LF2 / Streets of Rage 4). | Giữ vững bản sắc hành động dồn dập, không biến thành game nông trại/xây nhà. |
| **Nhịp độ chiến đấu** | Souls-lite, quản lý thể lực, tập trung vào đòn đơn và căn nhịp. | Brawler tốc độ cao, chuỗi đòn combo liên hoàn, hủy chiêu (cancel), giáp bá thể (super armor). | Tích hợp chiều sâu kiểm soát tài nguyên và nhịp điệu (Rhythm & Resource Flow). |
| **Quy mô đội hình** | Co-op Multiplayer (1–8 người). | 1 Người chơi trực tiếp + 2 Đồng đội AI chiến thuật (Hệ lệnh Squad Command). | Tái hiện cảm giác "tương tác đồng đội sống động" qua hệ thống phối hợp với AI. |
| **Cấu trúc phát triển** | Cây kỹ năng khổng lồ (500+ nodes) gồm Tộc × Lớp nhân vật. | Tải kỹ năng dạng Bộ bài (Deck Loadout: chọn 4 trong 10+ skill). | Thay vì phình to cây kỹ năng, áp dụng cơ chế **Nhánh Đột Biến (Skill Mutation/Morph)**. |

---

## 2. HỆ THỐNG 1: TỐI ƯU HÓA DECK 4-KỸ NĂNG VỚI "SKILL MUTATION"

### 2.1. Triết lý: "Huge Collection + Tiny Active Loadout"
* **Bài học Dimraeth:** Dù sở hữu kho hơn 300 phép thuật, game chỉ cho phép mang **5 kỹ năng** cùng lúc. Việc giới hạn này buộc người chơi phải suy tính chi phí cơ hội (opportunity cost), tạo nên các "build" cá tính rõ rệt.
* **Thực trạng Divergency:** Divergency đã đi đúng hướng khi giới hạn người chơi chỉ mang **4 kỹ năng** vào mỗi ải từ kho 10+ kỹ năng của từng tướng.
* **Cải tiến tránh bẫy 500 node rác:** Không tạo cây kỹ năng hàng trăm node cộng +3%, +5% chỉ số. Thay vào đó, mỗi kỹ năng trong 10 kỹ năng sẽ có **2 đến 3 Nhánh Đột Biến Cơ Học (Skill Morphs)**. Mỗi morph thay đổi hoàn toàn cách chiêu thức vận hành trên sàn đấu.

### 2.2. Ma trận Đột biến Kỹ năng Mẫu (Skill Morph Matrix)

```
                       ┌──────────────────────────────────────────────┐
                       │     KỸ NĂNG GỐC: ĐẠI ĐAO BỔ SÀN (DEEP)       │
                       │     Đập mạnh xuống đất, gây sát thương AoE   │
                       └──────────────────────┬───────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
         ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
         │  MORPH A: BREAKER  │    │  MORPH B: VORTEX   │    │  MORPH C: BASTION  │
         │ Tăng 250% phá thế  │    │ Hút toàn bộ quái   │    │ Bật Giáp Bá Thể,   │
         │ đập nát khiên giáp │    │ gom về 1 lane để   │    │ giảm 50% dmg nhận  │
         │ của lính Bastonne. │    │ Solei vào combo.   │    │ vào và phản đòn.   │
         └────────────────────┘    └────────────────────┘    └────────────────────┘
```

| Nhân vật | Kỹ năng cơ bản | Morph 1 (Khống chế / Mở giao tranh) | Morph 2 (Sát thương / Dồn dập) | Morph 3 (Hỗ trợ / Phòng thủ) |
| :--- | :--- | :--- | :--- | :--- |
| **Deep** | *Đại Đao Bổ Sàn* | **Vortex Sweep:** Quét đao tạo lốc kéo quái trên 3 lane về một điểm. | **Sundering Cleave:** Để lại vết rách địa chấn gây sát thương kéo dài. | **Iron Bastion:** Bá thể không thể bị hất văng, phản đòn khi bị đánh trúng. |
| **Solei** | *Song Nhẫn Phi Thân* | **Shadow Pin:** Ghim mục tiêu xuống sàn, bất động 2 giây. | **Bleed Rush:** Chém 6 nhát liên hoàn gây hiệu ứng Chảy Máu cực mạnh. | **Decoy Shift:** Để lại phân thân thu hút quái, dịch chuyển ra sau lưng địch. |
| **Mark** | *Mìn Khói Tác Chiến* | **Blind Spot:** Mù mắt kẻ địch, khiến xạ thủ đối phương bắn nhầm đồng đội. | **Shrapnel Trap:** Nổ văng mảnh thép găm sâu, giảm 30% tốc độ di chuyển của địch. | **Stim Gas:** Vùng khói hồi phục thể lực và tăng 20% tốc độ di chuyển cho cả đội. |
| **Stranger** | *Xiềng Xích Hư Không* | **Void Snare:** Khóa cứng 2 quái tinh nhuệ trong lồng xích. | **Reaper Reel:** Giật mạnh kẻ địch va đập vào nhau gây nổ chấn động. | **Anchor Shield:** Cố định xích vào nền đất tạo rào chắn chặn mọi đạn đạo. |

### 2.3. Công thức Ngân sách Sức mạnh (Power Budget Formula)
Mỗi kỹ năng và đột biến phải được cân bằng theo công thức tổng ngân sách:
$$\text{Power Budget} = \text{Damage} + \text{Safety} + \text{Mobility} + \text{Control} + \text{Resource Generation}$$
* Nếu kỹ năng có **Khống chế cứng (Control)** và **Lướt an toàn (Mobility/Safety)** $\rightarrow$ Bắt buộc **Sát thương (Damage)** phải thấp hoặc tiêu tốn nhiều tài nguyên.
* Nếu kỹ năng thuần sát thương dồn $\rightarrow$ Người chơi phải chấp nhận thời gian thi triển dài (không an toàn) và không có độ cơ động.

---

## 3. HỆ THỐNG 2: VÒNG LẶP CHIẾN ĐẤU & QUẢN LÝ TÀI NGUYÊN (ACTION FLOW)

### 3.1. Nhịp điệu 3 Tầng: Normals $\rightarrow$ Deck $\rightarrow$ Squad Assist
Dimraeth xây dựng thành công chuỗi hành động: *Đánh thường hồi Concentration $\rightarrow$ Tiêu Concentration dùng phép $\rightarrow$ Đòn đánh thứ 3 (Final Attack) tạo động lực hoàn thành combo*. 

Trong Divergency, cấu trúc này được chuyển hóa thành cơ chế liên kết chiến thuật:

```
[ĐÒN THƯỜNG / 3-HIT COMBO]
- Tấn công cơ bản (Phím A)
- Đòn kết chuỗi (Final Attack) hất văng địch
- Tích lũy điểm [Focus / Tần Số Đồng Điệu]
          │
          ▼ (Tiêu hao Focus)
[KỸ NĂNG DECK (ACTIVE SKILLS)]
- Gây sát thương diện rộng
- Đột phá phòng ngự, tạo trạng thái bất lợi:
  [Gãy Thế / Bị Đánh Dấu / Chảy Máu / Lơ Lửng]
          │
          ▼ (Kích hoạt điều kiện)
[LỆNH ĐỒNG ĐỘI (SQUAD COMMAND ASSIST)]
- Đồng đội AI tự nhận diện trạng thái kẻ địch
- Kích hoạt [Đòn Phối Hợp Đồng Bộ / Assist Execution]
- Gây sát thương chí mạng mà không tốn lệnh của người chơi
```

### 3.2. Cơ chế "Final Attack" (Đòn đánh kết thúc chuỗi)
* **Vấn đề cần tránh:** Người chơi chỉ nhấp 1 đòn lẻ rồi lướt chạy (hit-and-run vô nghĩa).
* **Giải pháp:** Đòn đánh thứ 3 trong chuỗi combo thông thường của mỗi nhân vật phải mang lại **phần thưởng cơ học vượt trội**:
  * *Deep:* Đòn chém thứ 3 tạo chấn động ngắt chiêu quái đang tụ lực.
  * *Solei:* Cú đá quét thứ 3 hất tung địch lên không trung, mở ra cơ hội Juggle.
  * *Stranger:* Cú thúc cùi chỏ thứ 3 tích ngay 1 điểm Nộ khí hoặc tự động hút vật phẩm quanh bán kính 4m.

---

## 4. HỆ THỐNG 3: TƯƠNG TÁC ĐỒNG ĐỘI TRỰC TIẾP (DIRECT CO-OP FEELING)

Dù là game điều khiển 1 người chơi kết hợp AI, Divergency phải tạo được những khoảnh khắc *"Đồng đội cứu nguy"* giống như cảm giác ném Potion cứu bạn trong Dimraeth.

### 4.1. Khai thác Chiếc Ba Lô của Stranger (Porter Stance)
Chiếc ba lô của Stranger không chỉ là yếu tố tạo hình mà là một **Thực thể Gameplay Sống động (Dynamic Gameplay Entity)**:
1. **Ném Tiếp Tế Tức Thì:** Khi người chơi (Solei/Deep) tụt dưới 20% HP, Stranger phát âm thanh cảnh báo và tự ném gói băng gạc sơ cứu hoặc hộp tiếp đạn thẳng vào vị trí người chơi.
2. **Trạm Hậu Cần Dã Chiến Trên Sàn:** Khi tháo ba lô để hóa dạng chiến đấu, ba lô rơi xuống sàn trở thành trạm tiếp tế dã chiến:
   * Có thanh máu riêng ($\approx 30\%$ HP của Stranger).
   * Đồng đội đứng gần được hồi phục nhẹ và nạp đạn nhanh.
   * **Cơ chế rủi ro:** Quái vật sẽ ưu tiên lao vào đập phá chiếc túi. Nếu để túi bị phá vỡ, toàn bộ phế liệu nhặt trong ải bị rơi mất $\rightarrow$ Buộc người chơi phải dùng lệnh `Hold` để bảo vệ vị trí chiếc túi.

### 4.2. Tương tác Cơ học 2 Chiều với Đồng Đội AI
* **Deep Tóm Ném (Grab & Toss):** Khi Deep tóm được một tên lính tuần tra, nếu người chơi đang dùng Solei ở cự ly gần, Deep sẽ ném bổng mục tiêu về phía Solei để người chơi thực hiện Air-combo.
* **Bệ Phóng Khiên Của Block (Shield Vault):** Khi ra lệnh Block giữ vị trí (`Hold`), người chơi có thể lướt tới đạp lên mặt khiên của Block để nhảy phóng vút lên cao, tung đòn giáng đất diện rộng (*Aerial Dropkick*).
* **Cầu Máu / Dòng Chảy Của Tulas:** Tulas tạo dải chất lỏng bắc qua bẫy axit hoặc vực thẳm, cho phép cả đội chạy qua an toàn mà không mất máu.

---

## 5. HỆ THỐNG 4: VÒNG LẶP TRẠM NGHỈ & CHUẨN BỊ (EXPEDITION & SHELTER LOOP)

Thay vì sao chép hệ thống xây nhà trồng trọt làm loãng nhịp hành động, Divergency sẽ cô đọng vòng lặp này tại **Nơi Trú Ẩn / Trại Dã Chiến (Shelter / Camp)** gắn liền với cơ chế **5 Mảnh Thần Sơ Sinh**.

```
┌─────────────────────────────────────────────────────────────┐
│                 TRẠM DỪNG CHÂN / NƠI TRÚ ẨN                 │
│  - Chọn lựa 4 Kỹ năng (Deck Attunement) theo luật của ải    │
│  - Chế tạo vật phẩm dã chiến (Khí Neuro-B, Băng nẹp, Mìn)   │
│  - Đối thoại tâm lý đồng đội (Nâng chỉ số Tin Tưởng/Morale) │
└──────────────────────────────┬──────────────────────────────┘
                               │ Xuất phát
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 ẢI CHIẾN DỊCH (EXPEDITION)                   │
│  - Khám phá đường nhánh, đọc dấu hiệu môi trường            │
│  - Đối mặt với Quy luật của Mảnh Thần (Mắt, Tai, Lưỡi,...)  │
│  - Giải cứu thường dân, thu thập hồ sơ chứng cứ             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Hoàn thành / Thất trận rút lui
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 HẬU QUẢ & PHẢN HỒI THẾ GIỚI                 │
│  - Mở khóa công thức chế tạo mới từ phế liệu nhặt được      │
│  - Nhận hỗ trợ từ người được cứu                            │
│  - Thế giới ghi nhận cái giá bạo lực mà người chơi đã trả   │
└─────────────────────────────────────────────────────────────┘
```

### Ứng dụng Chuẩn bị Khắc chế 5 Mảnh Thần:
* **Gặp Trùm Chịu Ảnh Hưởng Bởi "Cái Tai" (Phạt tiếng động):**
  * *Thất bại lần đầu $\rightarrow$ Rút về trại.*
  * *Chuẩn bị:* Đổi Deck sang trang bị vũ khí hãm thanh của Solei, lắp Morph *Mìn Khói Câm Lặng* của Mark, điều chế thuốc giảm nhịp tim để quái không phát hiện.
* **Gặp Trùm Chịu Ảnh Hưởng Bởi "Con Mắt" (Tạo ảo ảnh & điểm yếu giả):**
  * *Chuẩn bị:* Nhờ Heni tinh chế giọt tinh chất Định Thần; Deep lắp kỹ năng quét diện rộng phá tan toàn bộ hình chiếu giả.

---

## 6. HỆ THỐNG 5: THUỘC TÍNH VỚI NGƯỠNG KÍCH HOẠT (STAT BREAKPOINTS)

Học tập cách Dimraeth không dùng cấm đoán cứng (Hard Restriction) mà dùng **Chuyên môn hóa mềm (Soft Specialization)** và **Ngưỡng Đột Phá (Breakpoints)**:

```
Không thiết kế: STR +10 => Tăng 10 sát thương (Nhàm chán)
Thiết kế chuẩn: STR đạt mốc 20 => Mở khóa cơ chế đòn đánh hoàn toàn mới!
```

| Nhân vật | Thuộc tính ưu tiên | Ngưỡng (Breakpoint) | Hiệu ứng cơ học mở khóa |
| :--- | :--- | :--- | :--- |
| **Solei** | *Thân Pháp (Agility)* | **Mốc 20 Điểm** | **Bóng Ảnh Tức Thời:** Pha né đòn hoàn hảo (*Just-Evade*) để lại một phân thân ảnh ảo thu hút đòn đánh của địch trong 1.5 giây. |
| **Deep** | *Cương Lực (Strength)* | **Mốc 25 Điểm** | **Địa Chấn Lan:** Mọi đòn đánh nặng đánh trúng đất đều phát ra sóng xung kích ngầm làm ngã quái vật nhỏ xung quanh. |
| **Mark** | *Chiến Thuật (Tactics)* | **Mốc 20 Điểm** | **Đạn Điểm Huyệt:** Phát bắn tỉa chính xác làm kẻ địch bị *Câm Lặng*, không thể gọi viện binh hoặc dùng chiêu thức trong 4 giây. |
| **Stranger** | *Tần Số Zero (Resonance)* | **Mốc 15 Điểm** | **Hư Không Đột Kích:** Hạ gục một kẻ địch trong trạng thái Tháo Ba Lô sẽ hồi lại lập tức 1 lần lướt *Phase Dash*. |

---

## 7. BỐN CÁI BẪY CỦA DIMRAETH CẦN TRÁNH TUYỆT ĐỐI

Dựa trên phản hồi thực tế từ cộng đồng Steam (đánh giá ~80% với nhiều phàn nàn trong tuần đầu ra mắt của Dimraeth), Divergency bắt buộc phải né tránh 4 sai lầm sau:

```
┌──────────────────────────────────────┬──────────────────────────────────────┐
│        SAI LẦM CỦA DIMRAETH          │        GIẢI PHÁP CHO DIVERGENCY      │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ 1. Cây kỹ năng 500 node (+3% chỉ số) │ Ít node nhưng mỗi node/morph thay đổi│
│    Complexity ≠ Depth.               │ trực tiếp cách bấm chiêu hoặc combo. │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ 2. Enemy HP Sponge (Quái quá trâu)   │ Tăng độ khó bằng Đội hình AI (Khiên  │
│    Kéo dài trận đấu một cách mệt mỏi.│ + Xạ thủ + Móc lốp), không nhân máu. │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ 3. Quest Navigation mơ hồ            │ Tận dụng Visual Cues của Pixel Art   │
│    Vùng quét rộng thiếu manh mối rõ. │ (Vết máu, biểu tượng Mảnh Thần,...). │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ 4. Lạm dụng Base-Building dông dài   │ Giữ Hub gọn gàng là Trại dã chiến,   │
│    Làm loãng nhịp brawler sinh tử.   │ tập trung 100% vào Chuẩn Bị Tác Chiến│
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 8. BÀI HỌC MARKETING & CHIẾN LƯỢC RA MẮT (KICKSTARTER & STEAM)

Dimraeth đạt bước nhảy vọt từ **60k wishlist lên 500k wishlist** và cán mốc hơn 11.000 người chơi đồng thời trong tuần đầu nhờ chiến lược truyền thông bài bản:

1. **Sức Mạnh của Short-form GIF / Video Combat:**
   * Những đoạn hoạt họa pixel có độ nảy cao (*Screen shake, Hit-stop, Particle effects*) cực kỳ ăn khách trên Reddit (`r/pixelart`, `r/IndieGaming`), Twitter/X và TikTok.
   * *Nội dung cần đẩy mạnh:* Khoảnh khắc Stranger giật đứt quai ba lô ném thẳng vào mặt quái, Deep gồng đại đao chém vỡ toang khiên hộ vệ, hoặc pha phối hợp Solei đạp lên khiên Block phóng lên không trung.
2. **Tiếp Cận Nhà Sáng Tạo Nội Dung Ngách (Creator Outreach):**
   * Gửi demo sớm cho các YouTuber/Streamer chuyên dòng Retro Brawler, Souls-lite và Pixel Art (như *Splattercat, Iron Pineapple, Clemps, WoolieVersus*).
3. **Bản Demo Có Vòng Lặp Trải Nghiệm Khép Kín:**
   * Không làm demo quá dài; chỉ cần gói gọn trong 30–45 phút với 1 vòng lặp hoàn chỉnh:
     * *Tại Trại:* Tự do chọn 4 skill cho Solei hoặc Deep.
     * *Vào Ải:* Chiến đấu qua 2 màn, trải nghiệm ra lệnh Squad AI (Shift + Command).
     * *Đối mặt Boss:* Một con Boss chịu ảnh hưởng của Mảnh Thần (buộc người chơi phải ứng dụng luật chơi thay vì chỉ spam đòn).

---

## 9. CHECKLIST HÀNH ĐỘNG DÀNH CHO ĐỘI NGŨ PHÁT TRIỂN

- [ ] **Game Designers:** Hoàn thiện bảng thiết kế Morph (2–3 biến thể) cho 10 kỹ năng của 5 nhân vật chính.
- [ ] **Combat Programmer:** Tích hợp logic "Combo Finisher (Hit 3) nạp tài nguyên Focus" vào State Machine của nhân vật.
- [ ] **Combat Programmer:** Thiết lập thực thể "Ba Lô Của Stranger" có thanh máu và cơ chế thu hút sự chú ý của quái vật trên sàn đấu.
- [ ] **Level & UI Designer:** Xây dựng màn hình Trại Tạm (Campsite Attunement UI) cho phép người chơi đổi Deck 4 skill và nhận thông tin tình báo về quy luật của Boss trước khi vào ải.
- [ ] **Marketing / Artist:** Cắt trích xuất 3 đoạn GIF hoạt họa đòn đánh đẹp nhất (Stranger ném balo, Deep đập khiên, Solei phản đòn) để chuẩn bị cho chiến dịch truyền thông và Kickstarter.
