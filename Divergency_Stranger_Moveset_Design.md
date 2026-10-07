# DIVERGENCY: THIẾT KẾ MOVE SET, COMBO SKILL & LỘ TRÌNH PHÁT TRIỂN NHÂN VẬT STRANGER (GHOST)

> **Tài liệu tham chiếu:** Hệ thống chiến đấu *Tactical Brawler (LF2 style + AI Command System)* & Cốt truyện chính *Divergency*.  
> **Áp dụng cho:** Thiết kế Gameplay Mechanics, Lập trình Trạng thái Nhân vật (State Machine), Họa sĩ Sprite/Animation 2D, và Thiết kế Trận đấu (Combat Design).

---

## 1. ĐỊNH VỊ NHÂN VẬT & TRIẾT LÝ THIẾT KẾ (CHARACTER PHILOSOPHY)

### 1.1. Thân thế, Tâm lý & Vai trò Hậu cần (The Scavenger & Porter)
* **Danh tính:** Khởi đầu vô danh (*Stranger / Thể Chứa Vô Danh - Prototype Zero* trong Dự Án STRANGER của Jamerson), sau được đội Deep gọi là **Ghost**.
* **Bản chất sức mạnh:** **"Tần Số Bằng Không" (Zero Resonance / Khoảng lặng phàm trần)**. Hệ thần kinh lệch khỏi tần số thao túng của 4 mảnh thần (Con Mắt không soi thấu, Cái Tai không nghe thấy suy nghĩ, Cái Lưỡi không thể ra lệnh, Trái Tim không thể kích động cuồng loạn).
* **Tâm lý & Hình tượng Ba Lô:** Sau khi trốn thoát khỏi Bastonne, Stranger không muốn bản thân tiếp tục là "cỗ máy giết chóc" vô hồn của Jamerson. Anh tự nguyện trở thành **người khuân vác (Pack Mule / Porter)**, lầm lũi vác chiếc túi đồ lớn trên lưng, đi sau nhặt nhạnh phế liệu, băng gạc, bình khí và đạn dược cho đội của Deep để tìm lại cảm giác mình là một con người có ích.
* **Phong cách chuyển hóa:** Tồn tại cơ chế **Song Trạng Thái (Dual-Stance)**: Bình thường là **Kẻ Nhặt Rác Hậu Cần (Porter/Scavenger)** với túi đồ nặng trĩu -> Khi buông túi đồ sẽ bùng nổ thành **Sát Thủ Man Dã (Unburdened Combatant)** -> tiến hóa thành **Kẻ Bước Xuyên Hư Không (Rift Walker)** -> và đối mặt với thực thể vũ trụ (**The Dream Sovereign**).

### 1.2. Ngôn ngữ mỹ thuật & Tạo hình (Art & Animation Bible)

| Giai đoạn & Trạng thái | Tạo hình & Silhouette | Dáng đứng (Idle Stance) | Hiệu ứng hình ảnh (VFX) |
| :--- | :--- | :--- | :--- |
| **Trạng thái Đeo Ba Lô (Toàn bộ hành trình)** | Khoác chiếc ba lô quân dụng chắp vá bằng dây xích, treo lủng lẳng bình oxy, hộp đạn, băng gạc và bánh răng. | Khom lưng, hai tay níu quai đeo trước ngực; mắt chăm chú nhìn mặt sàn tìm kiếm vật phẩm. | Bụi đất dấy lên theo từng bước chân nặng; ánh sáng lấp lánh khi hút vật phẩm. |
| **Stage 0 (Bastonne - Mở màn)** | Mình trần đầy sẹo mổ, ống quần rách, hai cẳng tay quấn xích sắt gãy đẫm máu. | Trọng tâm thấp, gầm gừ như thú săn mồi, lồng ngực phập phồng dữ dội do khí Neuro-B. | Tia lửa ma sát xích sắt, vệt máu văng, khói trắng Neuro-B. |
| **Stage 1–2 (Marseille & Sakuri)** | Áo choàng rách xám tro; khi cởi túi, thân hình thoăn thoắt, xích đan thành găng tay trợ lực. | Đứng thẳng, thả lỏng kỳ dị, lồng ngực hầu như không thở (nhịp tim bằng 0). | Vệt bóng mờ sau lưng (After-image), khói đen xám khi lướt. |
| **Stage 3–4 (Calvaria & Akam Meskul)** | Vết nứt hư không xuất hiện trên da; mắt chuyển thành hố đen sâu thẳm. | Chân lơ lửng cách mặt sàn vài milimet, tà áo bay dù không có gió. | Vết nứt không gian (Chromatic Aberration / Glitch), hào quang tím đen. |
| **Stage 5 (The Cradle)** | Dạng thức tỉnh: Cánh ngân hà bóng tối hoặc hào quang ngọc bích của sự giải thoát. | Đứng uy nghi giữa tâm cõi mộng vô trọng lực. | Bụi sao lân tinh xanh ngọc bích đan xen hố đen hư vô. |

---

## 2. CƠ CHẾ SONG TRẠNG THÁI: ĐEO BALO vs THÁO BALO (DUAL-STANCE SYSTEM)

Đây là cơ chế cốt lõi định hình lối chơi độc đáo của Stranger, kết nối hoàn hảo giữa vai trò hậu cần thầm lặng và bản năng sát thủ bùng nổ.

```
                  ┌──────────────────────────────────────────────┐
                  │      TRẠNG THÁI ĐEO BALO (PORTER STANCE)     │
                  │   - Tự động gom vật phẩm (Auto-Loot)         │
                  │   - Ném đồ quấy rối & Tiếp viện cho đội      │
                  │   - Di chuyển chậm hơn, đòn đánh tự vệ       │
                  └──────────────────────┬───────────────────────┘
                                         │
                 Chủ động (Shift + D)    │    Đồng đội < 20% HP
                 hoặc Túi bị quái đánh   │    hoặc Bùng nổ Nộ khí
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │    TRẠNG THÁI THÁO BALO (UNBURDENED STANCE)  │
                  │   - Balo rơi thành "Trạm Hậu Cần Dã Chiến"   │
                  │   - Mở khóa 100% Combo võ thuật & Xích sắt   │
                  │   - Tốc độ +20%, mở Phase Dash & Just-Evade  │
                  └──────────────────────────────────────────────┘
```

### 2.1. So sánh chi tiết hai trạng thái

| Đặc tính Gameplay | TRẠNG THÁI ĐEO BALO (Porter Stance) | TRẠNG THÁI THÁO BALO (Unburdened Stance) |
| :--- | :--- | :--- |
| **Vai trò chính** | Thu thập tài nguyên, Hỗ trợ tiếp tế, Quấy rối diện rộng. | Sát thủ càn quét tuyến trước, Phá giáp, Dồn sát thương cực đại. |
| **Khả năng nhặt đồ** | **Tự động gom (Auto-Loot):** Hút máu, đạn, chìa khóa, phế liệu trong bán kính 6m mà người chơi không cần bấm nhặt. | Tạm ngừng nhặt đồ, tập trung 100% vào việc giao tranh sinh tử. |
| **Bộ đòn đánh thường** | • Đấm ngắn xua đuổi (`A`).<br>• Vung ba lô quét ngã (`Giữ A` / Heavy Sweep).<br>• Móc đồ trong túi ném (chai lọ, bình oxy cũ). | Mở khóa toàn bộ chuỗi Combo xích sắt, cùi chỏ, kéo xích và đập sàn. |
| **Tốc độ & Cơ động** | Tốc độ di chuyển -15%, lướt ngắn (Heavy Roll). | Tốc độ chạy +20%, mở khóa *Phase Dash* và phản xạ *Just-Evade*. |
| **Thực thể Ba Lô** | Nằm an toàn trên lưng Stranger. | **Rơi trên sàn thành "Trạm Hậu Cần Dã Chiến"**: có thanh máu riêng; đồng đội có thể chạy lại lấy máu/đạn, nhưng quái có thể đánh vỡ nếu không được bảo vệ! |

### 2.2. Điều kiện & Cách thức chuyển đổi trạng thái

1. **Chủ động tháo túi (`Shift + Phòng thủ D`):**
   * *Diễn hoạt:* Stranger giật phăng đai ngực, vung chiếc ba lô nặng trịch ném thẳng vào mặt kẻ địch trước mắt. Cú ném gây sát thương cực lớn và hất ngã quái vật (Knockdown), tạo tiền đề mở màn chuỗi combo.
2. **Kích hoạt bị động theo tâm lý (Cinematic Trigger):**
   * **Đồng đội gặp nguy kịch:** Khi máu của Solei hoặc Deep tụt xuống dưới 20% và đang bị dồn ép, Stranger phát ra tiếng gầm nghẹn ngào, tự động giật đứt quai túi, kích hoạt trạng thái **Nổi Điên (Enrage)** xông vào tử chiến cứu bạn.
   * **Ba lô bị đánh trúng:** Nếu kẻ địch tấn công từ phía sau trúng ba lô làm văng tung tóe số thuốc men/đạn dược vừa nhặt được, Stranger khựng lại 0.3s, ánh mắt chuyển từ vẻ rụt rè sang ánh nhìn dã thú lạnh tanh -> Tự động vào trạng thái chiến đấu.
3. **Thu hồi túi sau trận chiến:**
   * Khi phòng chơi được quét sạch quái vật, Stranger thở dốc điều hòa nhịp tim, tiến lại nhặt chiếc ba lô, cẩn thận kiểm tra từng món đồ rồi đeo lại lên lưng, trở lại dáng vẻ lầm lũi thường ngày.

---

## 3. TƯƠNG TÁC HỆ LỆNH COMMAND THEO TRẠNG THÁI (`Shift + ...`)

Khi người chơi điều khiển Solei hoặc Deep và dùng `Shift + Tab` chọn **General Stranger/Ghost**, các lệnh Command sẽ hoạt động tương ứng với trạng thái hiện tại của anh:

### 3.1. Khi Stranger đang ĐEO BA LÔ (Chế độ Tiếp Vận & Hậu Cần)

| Thao tác phím | Lệnh thực tế | Hành vi của Stranger trên sân | Ứng dụng chiến thuật |
| :--- | :--- | :--- | :--- |
| **Giữ Shift + Lên** | **Tự Do (`Free`)** | **Chế Độ Nhặt Rác (Scavenge Mode):** Tự động né tránh giao tranh, lách qua góc khuất và thùng vỡ để gom sạch toàn bộ đạn, máu, phế liệu rơi trên sàn. | Người chơi rảnh tay tập trung đánh trùm mà không sợ sót đồ hoặc hết giờ nhặt. |
| **Giữ Shift + Xuống** | **Tập Hợp (`Regroup`)** | **Tiếp Tế Khẩn Cấp (Supply Delivery):** Stranger chạy thục mạng về phía người chơi, thò tay vào túi ném vật phẩm cần thiết nhất xuống chân người chơi:<br>• Nếu máu thấp: Ném gói bông băng sơ cứu.<br>• Nếu súng hết đạn: Thả hộp đạn tương ứng.<br>• Nếu tay không: Ném 1 bình oxy nổ vào tay. | Cứu nguy tức thì giữa làn mưa đạn mà không cần dừng đánh để tìm hòm đồ. |
| **Giữ Shift + Trái/Phải** | **Giữ Vị Trí (`Hold`)** | **Dựng Trạm Hậu Cần Dã Chiến:** Stranger tháo ba lô đặt cố định tại góc phòng, đứng thủ thế bảo vệ túi. Điểm này phát ra hào quang hồi phục nhẹ cho đồng đội đứng gần. | Tạo điểm tập kết hồi sức cho cả đội trong những đợt sóng quái kéo dài. |
| **Shift + Tấn công + 0** | **Kỹ Năng Đặc Trưng** | **Bom Phế Liệu Tự Chế (Scrap Shrapnel):** Rút ra một khối phế liệu nhồi thuốc súng tự chế ném vào đám đông, nổ tung văng đinh sắt gây chảy máu và choáng diện rộng. | Quấy rối và làm chậm bước tiến của bầy lính tuần tra. |

### 3.2. Khi Stranger đã THÁO BA LÔ (Chế độ Chiến Đấu Man Dã / Hư Không)

| Thao tác phím | Lệnh thực tế | Hành vi của Ghost trên sân | Ứng dụng chiến thuật |
| :--- | :--- | :--- | :--- |
| **Giữ Shift + Lên** | **Tự Do (`Free`)** | Chủ động truy lùng và triệt hạ mục tiêu yếu máu nhất của đối phương với tốc độ bão táp. | Dọn dẹp xạ thủ hoặc lính y tế của địch ở tuyến sau. |
| **Giữ Shift + Xuống** | **Tập Hợp (`Regroup`)** | Dùng *Phase Dash* lướt tức thời về sau lưng người chơi (Instant Blink), che chắn góc khuất. | Thoát hiểm khẩn cấp khi sàn đấu bị rỉ axit/độc dược. |
| **Giữ Shift + Trái/Phải** | **Giữ Vị Trí (`Hold`)** | Ẩn mình vào bóng tối tại điểm chỉ định (Stealth Guard), hoàn toàn vô hình trước tầm quét của địch. | Phục kích hoặc đón đầu đường rút lui của kẻ địch. |
| **Shift + Tấn công + 0** | **Kỹ Năng Đặc Trưng** | **Xiềng Xích Giam Hãm (Void Snare):** Phóng 2 sợi xích bóng tối trói chặt 2 mục tiêu nguy hiểm nhất trong 3.5 giây. | Khống chế quái tinh nhuệ để Deep bổ búa hoặc Solei dồn combo kết liễu. |
| **Shift + Nhảy** | **Hỗ Trợ Di Chuyển** | **Khe Nứt Hư Không (Rift Gate):** Tạo cổng không gian ngắn cho phép cả đội nhảy lướt qua các vực sâu hoặc bẫy gai. | Vượt chướng ngại vật giải đố môi trường. |

---

## 4. BỘ MOVE SET CHIẾN ĐẤU KHI THÁO BA LÔ (STAGE 0: ĐÊM MÁU BASTONNE)

Khi cởi bỏ gánh nặng hậu cần, toàn bộ bản năng dã thú và sức mạnh cơ bắp của Stranger bộc phát trọn vẹn:

### 4.1. Đòn Đánh Cơ Bản (Normal Attack String)
* **Light 1 – Móc Xích Tạt Cằm (Chain Jab):** `A`. Đấm thẳng tay trái, xích sắt cọ vào đốt ngón tay tóe tia lửa. Khởi động 4 frames, gây khựng nhẹ (hit-stun).
* **Light 2 – Cùi Chỏ Rung Chấn (Elbow Smash):** `A` lần 2. Xoay người giật cùi chỏ phải bọc xích giáng vào thái dương đối thủ, đẩy lùi nửa bước.
* **Light 3 – Quất Xích Quét Ngang (Chain Whiplash):** `A` lần 3. Bung đoạn xích dài quét một vòng bán nguyệt 180°, đánh văng đám lính vây quanh.

### 4.2. Đòn Nặng & Phá Thủ (Heavy & Guard Break)
* **Heavy Attack – Bổ Búa Trọng Lực (Chain Hammer Down):** `Giữ A` hoặc `Xuống + A`. Stranger đan chặt hai nắm tay quấn xích giơ cao quá đầu, dập thẳng xuống sàn. **Phá vỡ hoàn toàn thế đỡ của lính khiên Bastonne (Guard Break)**, gây rung chấn sàn làm choáng nhẹ diện hẹp.
* **Shoulder Charge – Húc Vai Dã Thú:** `Chạy đà (Nhấn đôi Hướng) + A`. Hạ thấp vai lao sầm vào đội hình đối phương như một khối thép sống.

### 4.3. Di Chuyển, Lướt & Phản Đòn (Mobility & Defense)
* **Feral Slip (Lướt Thấp Bản Năng):** `Space / Dash + Hướng`. Trượt thấp người sát đất luồn qua đòn quét tầm cao và đạn súng điện.
* **Just-Evade – Khoảng Lặng Tần Số 0 (Zero-Frequency Slip):** Nhấn `Dash` tại khung hình đòn đánh địch sắp chạm người (Active Window 4–6 frames). Thân thể nhòe đi (glitch frame), âm thanh bị bóp nghẹt 0.5s, trượt ngay ra sau gáy địch.
* **Zero Parry (Gạt Đòn Triệt Tiêu):** `Phòng thủ (D) -> Nhấn A ngay khi trúng đòn`. Bắt đòn bằng cẳng tay bọc xích rồi húc đầu man rợ làm choáng địch 2 giây.

### 4.4. Vật Cận Chiến & Tương Tác Môi Trường (Grab & Environment)
* **Brutal Clench (Áp Sát Bóp Nghẹt):** Tiếp cận địch bị choáng + `E`.
  * Nhấn `A`: Nện đầu đối thủ liên tiếp vào sàn/tường đá.
  * Nhấn `Hướng + A`: Xoay người quăng bổng tên lính vào nhóm kẻ thù phía trước hoặc vào bảng điện cao thế.
* **Improvised Projectile (Cầm Ném Vật Thể):** Nhặt bình oxy, thanh sắt gãy (`E`) -> Nhấn `A` ném với góc bay trực diện cực mạnh, ngắt đòn tụ lực của trùm (như đòn bổ chùy của Gilles).

### 4.5. Nội Tại Mở Màn Theo Cốt Truyện (Dilemma Trait)
* **Nếu chọn hy sinh ở buồng số 5:** Stranger thọc tay trần mở van nhiệt cứu Block -> Mở khóa trait **Ý Chí Bất Diệt (Undying Will)**:
  * *Hệ quả:* Giảm 15% Max HP ở Stage 1 (vết bỏng nhiệt).
  * *Bù đắp:* Khi máu dưới 30%, toàn bộ đòn đánh xích kích hoạt **Super Armor** (không bị ngắt chiêu) và tăng thêm 25% sát thương vật lý.

---

## 5. CÁC CHUỖI COMBO THỰC CHIẾN (COMBO ROUTES)

* **Combo 1: "Xiềng Xích Đồ Tể" (Chain Executioner)**
  * **Input:** `A -> A -> Giữ A -> Tiến + A`
  * **Diễn hoạt:** Đấm móc 2 cú phá nhịp (`A -> A`) -> Bổ búa hai tay dập vỡ khiên (`Giữ A`) -> Phóng đầu xích găm ngực địch, xoay gót kéo ném đập vào tường đá (`Tiến + A`).
* **Combo 2: "Kéo Lưới & Dập Sàn" (Rebound Slam)**
  * **Input:** `Nhảy (Space) -> Đánh trên không (A) -> Xuống + A`
  * **Diễn hoạt:** Nhảy đạp tường phóng lên bổ đòn hất tung địch -> Ở đỉnh cú nhảy, vung xích quấn chân kẻ địch lơ lửng, kéo ngược cắm đầu xuống đất tạo sóng xung kích hất ngã đám lính xung quanh.
* **Combo 3: "Bóng Ma Phục Kích" (Ghost Ambush)**
  * **Input:** `Just-Evade -> Lướt ra sau -> E (Tóm) -> Lùi + A (Quật ngã)`
  * **Mục đích:** Trừng phạt các đòn đánh nặng của quái, phản công tức thì.

---

## 6. LỘ TRÌNH THĂNG TIẾN KỸ NĂNG THEO CỐT TRUYỆN (PROGRESSION TREE)

```
[STAGE 0: FERAL ESCAPEE & PACK PORTER]
 ├── Đeo Balo: Auto-Loot, Tiếp tế, Quấy rối phế liệu
 ├── Tháo Balo: Xích sắt gãy, Nắm đấm trần, Ném môi trường
 └── Trait: Ý Chí Bất Diệt (Tăng lực khi thấp máu)
         │
         ▼
[STAGE 1 & 2: PHANTOM INFILTRATOR - "GHOST"]
 ├── Phase Dash: Lướt xuyên bẫy điện, cảm biến an ninh, kẻ địch
 ├── Phantom Harpoon: Phóng xích đu tường / kéo mục tiêu tầm xa
 └── Silent Choke: Ám sát không tiếng động (Vượt kiểm soát Sakuri)
         │
         ▼
[STAGE 3 & 4: RIFT WALKER]
 ├── Phase Shifting: Bước xuyên vật thể cứng (vách xương, tường đá)
 ├── Shadow Echoes: Bóng lặp mô phỏng chiêu thức khi Độ Nhiễu > 70%
 └── Severing Blade: Đòn hư không chém đứt liên kết thần lực
         │
         ▼
[STAGE 5: THE CRADLE]
 ├── Nhánh 1 (Nhân Tính): The Sovereign Severance (Vùng Tĩnh Lặng Vô Cực)
 └── Nhánh 2 (Bùng Nhiễu 100%): Boss Ẩn - The Dream Sovereign
```

### Chi tiết các giai đoạn tiến hóa:

* **Stage 1–2 (Marseille & Sakuri) – Bóng Ma Thâm Nhập:**
  1. *Phase Dash (Lướt Xuyên Không):* `Space`. Biến cơ thể thành làn sương mờ trong 0.35s, lướt xuyên qua tia laser báo động và thân xác kẻ địch không bị chặn va chạm.
  2. *Phantom Harpoon (Móc Xích Cơ Động):* Giữ `E + Hướng`. Bắn xích bám vào xà bến cảng để đu người vượt hố độc, hoặc giật kẻ địch từ xa kéo lại chân mình.
  3. *Silent Elimination (Triệt Hạ Im Lặng):* Tiếp cận lính tuần tra từ phía sau mà không phát ra bất kỳ sóng rung động nào, vô hiệu hóa còi báo động tại Sakuri.
* **Stage 3–4 (Calvaria & Akam Meskul) – Kẻ Bước Xuyên Hư Không:**
  1. *Phase Shifting (Bước Đi Vô Cực):* `Phòng thủ + Nhảy`. Tan biến thân thể trong 1.5s, **bước thẳng xuyên qua các bức tường xương đá hoặc cửa chắn kim loại dày** mở đường cho đồng đội.
  2. *Shadow Echoes (Cơ Chế Bóng Lặp Thần Lực):* Khi Độ Nhiễu > 70%, sau mỗi combo của người chơi, **một bóng đen hư vô xuất hiện mô phỏng lại đòn đánh đó sau 0.4s** (thêm 50% sát thương).
  3. *Severing Strike (Đòn Chém Đứt Liên Kết):* Đòn đánh nặng phủ hào quang hư không đen tím, cắt đứt dây truyền dịch tà thần của trùm Titan.
* **Stage 5 (The Cradle) – Sự Thức Tỉnh Tại Cõi Mộng:**
  * *Trạng thái 1: Kẻ Giải Thoát Vô Cực (The Sovereign Severance):* Kỹ năng *Null-Domain* kích hoạt Tần Số Bằng Không diện rộng, vô hiệu hóa toàn bộ ma thuật thần tính của Jamerson trong 8 giây. Đòn phối hợp đội hình tối thượng cùng Deep và Solei.
  * *Trạng thái 2: Boss Ẩn Tối Thượng – THE DREAM SOVEREIGN (Nếu Độ Nhiễu đạt 100%):* Biến thành thực thể vũ trụ với cánh ngân hà bóng tối, sao chép đòn thế của cả đội ở tốc độ ánh sáng. Đội phải dùng hệ thống Command nhắc lại ký ức để thức tỉnh nhân tính của anh.

---

## 7. HƯỚNG DẪN HOẠT HỌA TỪNG KHUNG HÌNH (ANIMATION KEYFRAME BIBLE)

Dành cho họa sĩ Sprite Sheet, Spine 2D hoặc Concept Art:

```
[Porter Idle]              [Unburdening Action]           [Impact / Contact]           [Combat Recovery]
Còng lưng níu quai balo,   Giật phăng đai khóa ngực,      Xích sắt dập thẳng tóe lửa,  Thu tay về thế thủ dã thú,
mắt nhìn sàn nhặt đồ       vung ném balo vào mặt quái     bụi đất & tia lửa văng rộng  máu rỉ từ mắt xích rơi sàn
```

1. **Khung hình Đeo Ba Lô Chờ (Porter Idle - 8 frames):**
   * *Frame 1–4:* Lưng hơi khom, hai tay nắm chặt quai đeo trước ngực; các vật thể treo bên ngoài túi (bình oxy, ca sắt) lắc lư nhịp nhàng.
   * *Frame 5–8:* Cúi người xuống 10cm nhặt một vỏ đạn rơi trên sàn, nhét nhanh vào túi bên hông balo rồi ngẩng lên nhìn quanh cảnh giác.
2. **Khung hình Tháo Ba Lô Tấn Công (Unburden Throw - 10 frames):**
   * *Frames 1–3 (Gỡ chốt):* Hai tay giật mạnh đai khóa kim loại trước ngực; hai quai đeo tuột khỏi vai.
   * *Frames 4–6 (Vung ném - Smear Frame):* Stranger xoay gót 180°, túm lấy quai đỉnh balo vung một vòng cung lực lưỡng ném chiếc túi bay thẳng vào kẻ địch.
   * *Frames 7–10 (Hạ thế thủ):* Thân hình nhẹ bẫng lập tức đứng thẳng dậy, bung hai cẳng tay bọc xích vào tư thế chiến đấu Feral Brawler.
3. **Khung hình Tiếp Tế Đồng Đội (Supply Throw - 6 frames):**
   * Một tay giữ quai túi, tay kia thò vào ngăn kéo rút ra hộp sơ cứu/băng gạc và ném bổng hình cầu vồng chính xác về phía vị trí của người chơi.
4. **Khung hình Bước Đi Vô Cực (Phase Shift - 6 frames):**
   * Tách thân thể Stranger thành **3 lớp silhouette**:
     * Lớp 1 (Trung tâm): Cơ thể thật mờ 40%.
     * Lớp 2 (Bóng trước): Vệt màu **Cyan Neon (#00FFFF)** lệch 4 pixel về bên phải.
     * Lớp 3 (Bóng sau): Vệt màu **Đen Khói Hư Không (#0A0A14)** kéo dài về phía sau.
   * Hiệu ứng vỡ không gian (Glitch Filter) nhẹ quanh viền thân người.

---

*Tài liệu này được đồng bộ hoàn toàn với thế giới quan và thiết kế màn chơi của dự án Divergency.*
