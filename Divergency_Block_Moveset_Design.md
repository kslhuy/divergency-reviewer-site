# DIVERGENCY: THIẾT KẾ MOVE SET, COMBO SKILL & LỘ TRÌNH PHÁT TRIỂN NHÂN VẬT BLOCK (THE GRAPHENE VAJRA GUARDIAN)

> **Tài liệu tham chiếu:** Hệ thống chiến đấu *Tactical Brawler (LF2 style + AI Command System)* & Cốt truyện chính *Divergency*.  
> **Áp dụng cho:** Thiết kế Gameplay Mechanics, Lập trình Trạng thái Nhân vật (State Machine), Họa sĩ Sprite/Animation 2D, Thiết kế Trận đấu (Combat Design) và Biên kịch Cốt truyện.

---

## 1. ĐỊNH VỊ NHÂN VẬT & TRIẾT LÝ THIẾT KẾ (CHARACTER PHILOSOPHY)

### 1.1. Thân thế, Bản ngã & Sự Tiến Hóa của "Tấm Khiên"
* **Danh tính:** **Block** (Tên gọi vừa là biệt hiệu, vừa là định mệnh: *"Khối chắn" / "Tấm khiên"*).
<!-- * **Bản chất sức mạnh:** **"Mạng Lục Giác Graphene Sinh Học & Kim Thân Bất Hoại" (Bio-Graphene Honeycomb Matrix & Vajra Hardening)**. 
  * Khởi điểm là một võ tăng trẻ tuổi thuộc phái khổ hạnh phương Đông, tinh thông công phu ngoại gia *Thiết Bố Sam / Kim Chung Triệu*.
  * Sau khi bị Jamerson bắt giam tại Pháo đài Bastonne (Dự án Hộ Vệ Thể Chế Số 2), cơ thể Block bị cưỡng bức cấy ghép cấu trúc nano Carbon-Graphene liên kết nội bào nhằm tạo ra một "tấm bia thịt sống".
  * Nhờ căn cơ võ đạo khổ hạnh cùng thể phách tráng kiện, Block không những không bị biến thành quái vật vô hồn mà còn hòa hợp hoàn toàn với cấu trúc Graphene, biến xương thịt thành hợp kim siêu nhẹ nhưng cứng hơn kim cương 200 lần. -->
* **Triết lý nhân vật & Trọng trách bảo hộ:**
  * **Câu hỏi bản ngã:** *"Lòng trung thành khác gì sự phục tùng?"* — Block bảo vệ đồng đội không phải vì nhận mệnh lệnh như một cỗ máy, mà bởi vì anh chủ động chọn lấy tư cách làm bức tường thành kiên cố nhất để không một người bạn nào phải ngã xuống.
  * **Tuyên ngôn chiến đấu:** *"Call me boy or call me man. I'll stand on my own two feet and fight with my fists."* (Không cần khiên sắt cồng kềnh, chính đôi tay và thân thể này là tấm khiên bất hoại).
* **Phong cách chiến đấu:** **Frontline Anchor / Kinetic Brawler / Spatial Disruptor**.
  * Kết hợp giữa **Võ thuật Thiếu Lâm Tự** (tấn pháp kiên định, chưởng ấn, điểm huyệt nén khí), **Quyền Anh áp sát dồn dập (Paquito - MLBB)**, **Cơ chế đấm ép góc găm tường (Badang - MLBB)**, **Kỹ năng hút gom khống chế (Aurelion Sol / Galio - LOL)** và **Uy lực đấm nứt toác không gian (Râu Trắng - One Piece)**.

---

### 1.2. Ngôn ngữ Mỹ Thuật & Tạo Hình (Art & Animation Bible)

```
        ┌─────────────────────────────────────────────────────────────┐
        │            SILHOUETTE CỐT LÕI: PHẬT TĂNG KIM CƯƠNG           │
        │  - Đầu cạo trọc, dáng người vạm vỡ, chuỗi bồ đề lớn cổ & tay│
        │  - Vân mạng Graphene lục giác phát sáng ngọc bích / hổ phách│
        │  - Pháp tướng Thiên Thủ tỏa ra từ lưng khi bộc phát nội công│
        └─────────────────────────────────────────────────────────────┘
```

| Yếu tố tạo hình | Chi tiết diễn hoạt & Visual Assets | Hiệu ứng hình ảnh (VFX) | Âm thanh (SFX) |
| :--- | :--- | :--- | :--- |
| **Silhouette & Dáng đứng (Idle Stance)** | • Đứng tấn bán mã vững chãi, hai tay thủ quyền ngang ngực hoặc chắp ấn thiền môn.<br>• Chuỗi tràng hạt bằng gỗ mun đại bồ đề lơ lửng nhẹ theo nhịp thở nội công.<br>• Bờ vai rộng, cẳng tay nổi cơ bắp cuồn cuộn với các vi mạch Graphene đen ánh than chì. | Hào quang mờ nhạt hình mạng tổ ong (Honeycomb) lăn tăn trên bề mặt da; bụi đất dưới chân khẽ rung theo từng nhịp tim. | Tiếng chuông đồng ngân vang trầm đục kết hợp tiếng vo ve tần số cao của nano carbon. |
| **Trạng thái Gồng Thủ (Block/Parry `D`)** | • Hai cẳng tay bắt chéo hình chữ X trước ngực.<br>• Thân thể hạ trọng tâm cắm chặt xuống mặt đất như rễ cây đại thụ. | Mạng tinh thể Graphene trên da bừng sáng rực rỡ, dựng lên một bức tường lục giác trong suốt phản chiếu đòn đánh. | Tiếng kim loại nặng va đập ken két đanh thép, tiếng văng tia lửa điện graphene. |
| **Đấm Không Gian (Spatial Punch)** | • Nắm đấm co lại sau lưng, không gian xung quanh bàn tay bị co rút tạo thấu kính hội tụ méo mó.<br>• Khi đấm bung ra: tạo vết nứt rạn không gian hình mạng nhện. | Vết nứt vỡ không gian (Glass Fracture VFX) màu trắng bạc lóa mắt; sóng xung kích tỏa hình nón làm rung lắc camera (Screen Shake). | Tiếng thủy tinh vỡ toác vang dội như sấm sét xé toạc bầu trời; tiếng gầm hạ âm (Sub-bass rumble). |
| **Pháp Tướng Thiên Thủ (Asura/Vajra State)** | • Block đứng tĩnh tại chắp tay (như ảnh tham chiếu).<br>• Phía sau lưng bộc phát vầng hào quang rực rỡ, xuất hiện hàng chục đến hàng trăm cánh tay thần quyền trong suốt. | Hàng chục cánh tay năng lượng tung quyền liên hoàn siêu thanh, để lại vệt tàn ảnh (After-image) vàng kim đan xen đen ánh tím. | Chuỗi âm thanh đấm búa dồn dập như súng máy hạng nặng (Gatling punch barrage); tiếng tụng kinh vang vọng đa âm sắc. |
| **Bạch Hoàng Thánh Thể (White Ultimate Transform)** | • Toàn thân Block phát sáng màu **Trắng Tinh Khiết (Pure White / Platinum)** sau khi dung hợp hai thể Light (Lôi) & Water (Thủy).<br>• Hai nắm đấm được bao bọc bởi hai quả cầu chấn động khí nén trắng lóa bập bùng (phong cách Edward Newgate / Râu Trắng).<br>• Dáng đứng uy nghiêm sừng sững như cự nhân, tà áo và cơ bắp phủ vân Graphene kim cương trắng.<br>• **Khả năng Không Gian (Spatial Skills):** Đấm toái không bắn quyền khí nén (`vfx_rift_fist`) hoặc sóng chấn động lưỡi liềm (`vfx_seismic_wave`); xé rách không gian mở cánh cổng hư không viền bạch kim (`vfx_spatial_gate`) và bước xuyên không gian qua cổng ra (`white_rift_step`). | Không gian xung quanh Block liên tục bị bẻ cong; các vết nứt không gian vỡ vụn phát sáng chói lọi; sóng xung kích địa chấn trắng xóa quét ngang sàn đấu; lòng cổng hư không alpha trong suốt hiển lộ chiều không gian khác; các mảnh vỡ không gian phát nổ tan biến (`vfx_spatial_break`). | Tiếng "Rắc! Rắc!" như kính cường lực trời đất vỡ toác; tiếng gầm động đất long trời lở đất; tiếng gió rít dồn dập của áp suất khí quyển; tiếng nổ đanh gọn khi màng không gian bị xé rách và tái lập. |

---

## 2. BỐN CƠ CHẾ NỘI TẠI CỐT LÕI (CORE GAMEPLAY MECHANICS)

### 2.1. Thiết Bố Sam & Mạng Graphene (Graphene Hardening & Super Armor)
* **Thanh Kim Thân (Vajra Gauge - 100 điểm):**
  * Tích lũy khi Block tung đòn trúng đích (+5 điểm/hit) hoặc kích hoạt đỡ đòn hoàn hảo (*Just-Block*: +25 điểm).
  * Khi đạt 100%: Toàn thân Block chuyển sang màu hổ phách ánh kim, mở khóa trạng thái **Kim Thân Bất Hoại (Super Armor)** trong 6 giây:
    * Kháng 100% mọi hiệu ứng choáng, ngắt chiêu (Hyper Armor), giảm 50% toàn bộ sát thương nhận vào.
    * Đòn đánh thường được tăng thêm 30% sát thương chấn động diện rộng.
    * Khi bị kẻ địch tấn công cận chiến, 25% sát thương sẽ phản ngược lại dưới dạng sóng xung kích đánh ngã quái nhỏ.

### 2.2. Vòng Xoáy Hấp Dẫn & Gom Quái (Graphene Singularity - Galio & Aurelion Sol Style)
* **Nguyên lý:** Block nén các hạt nano Graphene cực hạn tạo thành một trường hấp dẫn cục bộ, bẻ cong không gian xung quanh.
* **Cơ chế kéo dồn (Vacuum Pull):**
  * Kẻ địch trong phạm vi 360 độ (bán kính 6–8 mét) liên tục bị kéo giật ngược về phía trước ngực Block.
  * Trong thời gian gồng niệm, Block nhận 75% giảm sát thương (Damage Reduction) tương tự chiêu *Shield of Durand* của Galio.
  * Khi bộc phát, trường năng lượng nổ tung hất văng và làm choáng toàn bộ kẻ địch đã gom tụ lại một điểm, tạo cơ hội cho Solei hoặc Deep xả trọn bộ combo diện rộng.

### 2.3. Đấm Nứt Không Gian (Spatial Shatter Punch - Whitebeard Style)
* **Nguyên lý:** Nắm đấm Graphene nén áp suất không khí tới mức tới hạn khiến ranh giới không gian cục bộ bị xé toạc.
* **Cơ chế sát thương chấn động:**
  * Đòn đấm tạo ra vệt nứt không gian đa phương diện xuyên thấu mọi loại giáp trụ và lá chắn chắn đòn của kẻ địch.
  * Tác động lực đẩy cực đại: Thổi bay toàn bộ mục tiêu theo đường thẳng, hất tung cả quái vật dạng Heavy Juggernaut.
  * Nếu mục tiêu bị va chạm vào chướng ngại vật/vách tường sẽ kích hoạt cơ chế đấm tường.

### 2.4. Quyền Pháp Ép Góc & Đấm Tường (Wall-Slam Combo - Badang & Paquito Style)
* **Bộ pháp đấm bốc uyển chuyển (Paquito Stance Flow):** 
  * Cho phép hủy hoạt ảnh sau đòn đánh (Animation Cancel) bằng bước lướt né nhẹ (Sway / Weave), duy trì áp lực dồn dập không có khoảng trễ.
* **Cơ chế va đập tường (Badang Wall-Impact):**
  * Khi một kẻ địch bị đấm văng vào vách tường, chướng ngại vật môi trường (hoặc bức tường Graphene do Block dựng lên):
    * Kẻ địch nhận thêm **80% sát thương va đập vật lý**.
    * Bị dính trạng thái **Găm Tường / Choáng Nặng (Wall-Stun)** trong 1.8 giây.
    * Block có thể tiếp tục kích hoạt chuỗi liên hoàn đấm bão táp để dồn ép đối thủ vào chân tường đến chết mà không cho chúng cơ hội hồi đòn.

---

## 3. BỘ MOVE SET CHI TIẾT & HỆ THỐNG PHÍM LF2 (INPUT SYSTEM)

Block sử dụng hệ thống phím kinh điển của phong cách Little Fighter 2 kết hợp Brawler hiện đại:  
`A`: Tấn công (Attack) | `D`: Phòng thủ / Gồng lực (Defend) | `J`: Nhảy / Lướt (Jump) | `Phím mũi tên`: Điều hướng.

```
                     ┌──────────────────────────────────────────────┐
                     │            SƠ ĐỒ HỆ PHÁP CỦA BLOCK           │
                     ├──────────────────────────────────────────────┤
                     │  • D + > + A : Đấm Nứt Không Gian (Râu Trắng)│
                     │  • D + v + A : Vòng Xoáy Gom Quái (AuSol)    │
                     │  • D + > + J : Húc Ép Tường & Đấm (Badang)   │
                     │  • D + ^ + A : Kim Cang Phản Đòn (Galio)     │
                     │  • D + ^ + J : THIÊN THỦ HÀNG MA (Ultimate)  │
                     └──────────────────────────────────────────────┘
```

---

### 3.1. Đòn đánh thường & Chuỗi Combo Boxing (Paquito Flow)

| Thao tác phím | Tên đòn đánh | Diễn hoạt & Tính chất cơ học | Frame Data / Thuộc tính |
| :--- | :--- | :--- | :--- |
| `A` | **Tấn Phong Tả Quyền (Left Jab)** | Đấm thẳng tay trước chớp nhoáng, tầm ngắn, ngắt nhịp chiêu của quái vật. | Khởi động 4 frames, gây khựng nhẹ (Flinch). |
| `A -> A` | **Hữu Trực Quyền (Right Straight)** | Đấm thẳng tay sau bọc graphene, phá vỡ thế thủ của quái nhỏ. | Khởi động 6 frames, xuyên nhẹ giáp thường. |
| `A -> A -> A` | **Thấu Cốt Quyền (Body Hook)** | Đấm móc sườn dồn dập, găm mục tiêu tại chỗ, cộng dồn 10 điểm Kim Thân. | Đòn đánh thứ 3 ngắt chiêu gồng của lính thường. |
| `A -> A -> A -> A` | **Phá Thiên Quyền (Heavy Uppercut)** | Cú móc hàm cực mạnh bọc chấn động graphene, hất tung kẻ địch lên không trung (*Launch / Juggle*). | Hất bổng mục tiêu, mở chuỗi Air Combo cho Solei. |
| `Chạy (>> hoặc <<) + A` | **Lôi Phong Thiết Khảm (Sprinting Elbow)** | Lao người tới phía trước thúc cùi chỏ cực mạnh, đâm thủng hàng ngũ kẻ địch. | Gây hiệu ứng Đẩy Lùi (Knockback 4m). |
| `Nhảy (J) + A` | **Kim Cang Toạ Sơn (Aerial Body Slam)** | Co gối dộng thẳng từ trên không xuống mặt sàn, tạo sóng chấn động tròn. | Gây ngã quái nhỏ trong bán kính 3m quanh điểm chạm đất. |
| `D + Hướng (Lên/Xuống/Lùi)` | **Hư Thân Lách Đòn (Sway & Slip)** | Lắc hông luồn qua đòn đánh của địch (Paquito Weave), không mất thể lực nếu né đúng nhịp. | 0.2s bất tử (I-frames), hồi ngay thế đánh tiếp theo. |

---

### 3.2. Bộ Kỹ Năng Đặc Trưng (Special Skills)

#### 1. Kim Cang Hấp Tinh Ấn (Graphene Singularity / Aurelion Sol & Galio Style)
* **Thao tác:** `Phòng thủ (D) + Hướng Xuống (v) + Tấn công (A)` *(Có thể giữ phím để tụ lực tối đa 3 giây)*.
* **Diễn hoạt:** 
  * Block hạ trọng tâm, hai bàn tay bắt ấn hộ pháp trước ngực, toàn thân phát ra ánh hào quang lục giác hổ phách.
  * Dưới chân mở ra một vòng xoáy từ trường Graphene màu xanh ngọc bích sẫm, liên tục co rút không gian, kéo giật toàn bộ quái vật xung quanh (kể cả quái tàng hình hoặc quái bay tầm thấp) về phía trước mặt Block.
  * Trong thời gian tụ lực, Block nhận **75% giảm sát thương**, miễn nhiễm hoàn toàn với hiệu ứng đẩy lùi.
* **Bộc phát:** Khi thả phím hoặc hết thời gian tụ, Block bung hai tay chấn động:
  * Vòng xoáy nổ tung gây sát thương chấn động lớn.
  * Toàn bộ kẻ địch bị gom lại dính trạng thái **Khiêu Khích / Tê Liệt (Taunt & Stun)** trong 2 giây.

#### 2. Bạt Sơn Không Gian Quyền (Spatial Fracture Punch / Whitebeard Gura Gura Style)
* **Thao tác:** `Phòng thủ (D) + Hướng Tiến (>) + Tấn công (A)`.
* **Diễn hoạt:**
  * Block co nắm đấm phải về sau, các vi mạch Graphene trên cẳng tay phát sáng chói lòa, không khí xung quanh nắm tay bị bóp méo thành một quả cầu áp suất chân không rung bần bật.
  * Block dậm chân đấm mạnh một cú thẳng vào không khí: **Một mảng không gian phía trước vỡ nát thành hàng chục vệt rạn nứt phát sáng như kính vỡ**!
* **Tính chất cơ học:**
  * Phóng ra một luồng sóng xung kích địa chấn hình quạt cực đại kéo dài 10 mét.
  * **Sát thương xuyên giáp:** Bỏ qua 100% lá chắn của khiên cơ giới hoặc giáp thép quân ngục Bastonne.
  * **Đẩy văng cực hạn:** Đánh bạt toàn bộ kẻ địch trên đường truyền. Nếu kẻ địch va vào tường sẽ kích hoạt cơ chế đấm tường Badang.

#### 3. Cầm Nã Liên Quyền & Bích Đột (Qigong Rush & Wall Slam / Badang Style)
* **Thao tác:** `Phòng thủ (D) + Hướng Tiến (>) + Nhảy (J)`.
* **Diễn hoạt:**
  * Block bọc giáp Graphene toàn thân, phóng vút về phía trước như một mũi tên sắt (Dash Grapple).
  * Khi chạm trúng kẻ địch đầu tiên: Block tóm chặt cổ áo đối thủ, xoay người tông thẳng vào vách tường gần nhất.
  * Sau khi găm kẻ địch vào tường, Block tung liên tiếp **8 cú đấm siêu tốc (Flurry Punches)** làm rung chuyển cả mảng tường đá.
* **Tính chất cơ học:**
  * Nếu có sẵn tường: Kẻ địch chịu gấp đôi sát thương và bị choáng vĩnh viễn trong suốt thời gian nhận đòn.
  * Nếu không có tường gần đó: Đòn đấm thứ 8 của Block sẽ nén khí bộc phát, tự tạo một **Khối Tinh Thể Graphene Dựng Đứng** tạm thời sau lưng kẻ địch để đập nát chúng vào đó.

#### 4. Kim Chung Bất Diệt Phản Kình (Iron Bell Reflection)
* **Thao tác:** `Phòng thủ (D) + Hướng Lên (^) + Tấn công (A)`.
* **Diễn hoạt:**
  * Block chắp hai tay niệm chú, toàn thân xuất hiện hình ảnh một quả chuông kim cang Graphene màu vàng kim bao phủ.
  * Bất kỳ đòn đánh tầm xa nào (đạn pháo, tên, dao găm, tia laser) bắn vào quả chuông đều bị **dội ngược 100% về phía kẻ bắn**.
  * Nếu bị đòn cận chiến đánh trúng đúng lúc kích hoạt: Chuông ngân vang một tiếng cực đại, làm nổ tung toàn bộ vũ khí của kẻ tấn công và đánh ngã chúng.

---

### 3.3. Chiêu Tối Thượng (Ultimate): THIÊN THỦ HÀNG MA ẤN (Thousand-Hand Vajra Barrage)

> **Cảm hứng trực tiếp từ Hình ảnh tham chiếu:** Võ tăng chắp ấn thiền môn, phía sau tỏa ra quang luân hàng chục/hàng trăm cánh tay thần quyền Asura/Guanyin.

* **Thao tác:** `Phòng thủ (D) + Hướng Lên (^) + Nhảy (J)` *(Yêu cầu 100% Nộ khí / Kim Thân Gauge)*.
* **Cinematic Transition & Diễn hoạt:**
  1. **Khởi thức (Mudra Stance):** Trận đấu thoáng khựng lại 0.5s (Cinematic Freeze), camera zoom cận cảnh Block. Block khép mắt, hai tay chắp lại trước ngực trong tư thế Bồ Đề Ấn thanh tịnh, chuỗi tràng hạt bồ đề tự động tách ra xoay tròn quanh người anh.
  2. **Khai quang (Manifestation):** Từ lưng Block bùng nổ một vầng hào quang kim cương rực rỡ. **Hàng chục, rồi hàng trăm cánh tay thần quyền bằng năng lượng Graphene trong suốt** vươn ra từ sau lưng, đan xen tạo thành hình cánh quạt quang luân khổng lồ bao phủ toàn bộ phía sau anh.
  3. **Vạn Quyền Giáng Thế (The Barrage):** Block mở trừng mắt, ánh mắt phát ra luồng linh khí hoàng kim:
     * Hàng trăm cánh tay thần quyền đồng loạt xuất kích với tốc độ siêu thanh như súng máy Gatling bao trùm toàn bộ màn hình.
     * Từng cú đấm năng lượng nện xuống sàn đấu tạo ra hàng nghìn vết nứt không gian li ti, hút chặt toàn bộ quái vật trên sân vào tâm chấn mà không thể nhúc nhích hay lăn né.
  4. **Chung Thức - Bàn Thạch Thần Chưởng:** Sau chuỗi 108 cú đấm siêu tốc, toàn bộ các cánh tay năng lượng hợp nhất lại thành một **Đại Phật Thủ Graphene khổng lồ**, giáng thẳng từ trên không xuống tâm đấu trường, tạo nên một vụ nổ chấn động hủy diệt làm sụp đổ hoàn toàn mặt sàn và thổi bay mọi kẻ thù.

```
                   [ CINEMATIC ULTIMATE: THIÊN THỦ HÀNG MA ẤN ]
                                      
                                    .---.
                                   /     \      (Hào quang Phật quang)
                       \  |  /    |  (o)  |    \  |  /
                     ---  *  ---   \     /   ---  *  ---
                    /  / | \  \     `---'   /  / | \  \
                   (Hàng chục cánh tay Thần Quyền Graphene)
                                      |
                                  .-""""-.
                                 /  _  _  \
                                 | (o)(o) |   (Block chắp tay niệm ấn)
                                 |   /\   |
                                  \  ==  /
                                   `----'
                                  /|    |\
                                 / |    | \
                                /  |====|  \
                                   |    |
                                  /      \
                                 /        \
                                |          |
                                 \________/
                                 /   ||   \
                                (____||____)
                    ====================================
                    (Địa chấn nứt toác không gian mặt sàn)
```

---

### 3.4. Hệ Thống Biến Hình Đa Tố & Trạng Thái Gồng Cực Đại (Form System & Overcharge Surge)

#### 1. Tổng quan Hệ thống 5 Hình thái của Block trong Engine

Trong kiến trúc State Machine của dự án (`Block_Forms.asset`), Block sở hữu các dạng hình thái chiến đấu độc lập với hai cấp độ: **Trạng Thái Cơ Bản (Tier 1)** và **Trạng Thái Gồng Cực Đại (Tier 2 - Overcharge Surge)**:

| Form ID | Tên Hình Thái | Màu Sắc & Thuộc Tính | Phong Cách Chiến Đấu | Mapping Kỹ Năng Mặc Định (Cơ Bản / Gồng Lv.2) |
| :--- | :--- | :--- | :--- | :--- |
| **0** | `NormalShirt` | Màu da mộc, áo cộc | Boxing cơ bản, đấm đẩy, áp sát cận chiến | DDA: Spatial Punch \| DDJ: Wall Rush \| DUA: Water Form \| DUJ: Lightning Form |
| **1** | `NormalJacket` | Áo khoác da Bastonne | Tăng độ lì đòn, giáp trụ phản chấn | DDA: Spatial Punch \| DDJ: Wall Rush \| DUA: Water Form \| DUJ: Lightning Form |
| **2** | `Water Form` (Bích Hải) | Xanh biển sâu / Thủy lưu | Jinbe, Bang, Akaza, Giyu, Noelle: Nhu quyền dẫn lực & Nước nặng ngàn cân | **[Tier 1 Cơ Bản]:** DDA: Ngư Nhân Thủy Phá Quyền \| DUA: Nhu Thần Lưu Thủy Kính \| DDJ: Thủy Áp Pháo Đơn<br>**[Tier 2 Gồng Surge]:** DVA: Thủy Bích Trọng Trụy (Splash Crown) \| DDJ: Phá Hoại Sát 3 Vòng (Akaza) \| DUJ: Trở Về Dạng Thường |
| **3** | `Lightning Form` (Kim Lôi) | Vàng kim / Sấm sét | Raikage & Super Saiyan: Thần tốc điện quang & Quyền cước bão sét | **[Tier 1 Cơ Bản]:** DDA: Lôi Tuyền Phong Xoay Đấm \| DUA: Lôi Ngược Thủy Bình Chop \| Nhảy+D+A: Đoạn Đầu Đài \| Chạy+A: Lariat<br>**[Tier 2 Gồng SSJ2]:** DVA: Lôi Ngọa Bạo Trụy (Liger Bomb) \| DDJ: Nhất Bản Quán Thủ (Hell Stab) \| DUJ: Trở Về Dạng Thường |
| **4** | `White Form (Bạch Hoàng)` | Trắng Tinh Khiết / Platinum | Edward Newgate & Không Gian Sư: Đấm toái không, bắn quyền khí/sóng chấn động & Đi xuyên khe nứt không gian | DDA: Toái Không Quyền (Kèm Đạn Quyền Khí/Sóng Chấn Động) \| D>J: Khai Môn & Xuyên Hư Không (Rift Open & Step) \| DDJ: Khuynh Đảo Càn Khôn \| DUA: Bách Thủ Toái Không \| DUJ: Trở Về Dạng Thường |

---

#### 2. DẠNG VÀNG ĐIỆN: KIM LÔI THẦN THỂ (LIGHTNING FORM — RAIKAGE & SUPER SAIYAN 2 STYLE)

```
        ┌─────────────────────────────────────────────────────────────┐
        │       DẠNG VÀNG ĐIỆN: KIM LÔI THẦN THỂ (LIGHTNING FORM)      │
        │  - Cảm hứng: Raikage Ay (Naruto) & Super Saiyan 2 (DBZ)     │
        │  - Hào quang sấm sét vàng rực, tia điện răng cưa bao quanh  │
        │  - Đòn đánh: Xoay đấm lôi bão, Liger Bomb, Guillotine Drop  │
        │  - Cơ chế Gồng Cực Đại (Overcharge Lv.2): Lôi Giáp Cực Hạn  │
        └─────────────────────────────────────────────────────────────┘
```

##### A. Ngôn ngữ Hình ảnh, Âm thanh & Trạng thái Khởi kích
* **Visual & Silhouette:**
  * Toàn thân Block tỏa ra luồng khí hoàng kim rực lửa. Các mạch dẫn nano Graphene dưới da phát quang màu vàng điện chói lòa như mạng lưới siêu dẫn plasma.
  * Mọi chuyển động bước chân để lại vệt tàn ảnh tia chớp vàng (Lightning Ghost Trail); bước chạy lướt (Dash) đi kèm tiếng nổ đanh gọn của không khí bị ion hóa.
* **Cách kích hoạt:**
  * Từ dạng thường (`NormalShirt`/`NormalJacket`), bấm lệnh: **`D + ^ + J` (`DUJ`)**.
  * Block giậm mạnh chân, một tia sét từ tầng mây giáng thẳng xuống đỉnh đầu (Thunder Strike Invocation), chuyển hóa Block thành Kim Lôi Thần Thể trong tiếng nổ sấm rền.

##### B. Cơ Chế GỒNG TĂNG ÁP CỰC ĐẠI (Level 2 Overcharge — Siêu Saiyan 2 & Raikage Chakra Mode Max)
> **Trọng tâm phản hồi người chơi:** Dù đã biến thành dạng vàng, Block vẫn có thể **"gồng mạnh hơn nữa"** để bộc phát cảnh giới tột đỉnh giống như Super Saiyan 2 trong Dragon Ball bùng nổ tia sét bao quanh, hoặc Đệ Tứ Raikage kích hoạt Lôi Độn Khải Giáp cấp độ tối đa khi đối đầu Sasuke/Madara!

* **Thao tác Gồng:**
  * Khi đang ở Lightning Form, **Nhấn giữ phím Phòng Thủ (`D`) trong 1.2 giây** (hoặc gõ nhanh nhịp phím `D -> D` rồi giữ).
* **Diễn hoạt Gồng Sức Mạnh (Power-Up Cinematic Animation):**
  1. **Tụ lực hạ tấn (The Charge):** Block chùng thấp trọng tâm, hai tay siết chặt nắm đấm đặt bên hông eo. Cơ bắp cuồn cuộn căng nở tối đa, các đường vân Graphene vàng bừng sáng rực rỡ.
  2. **Dị tượng môi trường (Levitation & Debris):** Mặt đất dưới chân Block rung chuyển dữ dội, nứt rách thành từng mảng. Đất đá vụn xung quanh bắt đầu **bay lơ lửng ngược trọng lực** quanh cơ thể anh (hiệu ứng kinh điển của Super Saiyan).
  3. **Bộc phát bão sét (The Lightning Nova):** Block gầm lên một tiếng sấm vang dội, luồng hào quang vàng kim bùng cao gấp đôi hình ngọn lửa bất diệt. **Hàng chục tia điện sấm sét răng cưa màu vàng chanh và xanh neon liên tục phóng ra, giật tách lách bôm bốp dữ dội bao bọc xung quanh cơ thể** (Bio-electricity Arcing).
* **Hiệu Ứng Bổ Trợ Trạng Thái Gồng Lv.2 (Buffs):**
  * **Tốc độ Tia Chớp (Lightning Shunshin):** Tốc độ di chuyển tăng 60%. Bước lướt né (`Dash` / `Sway`) đạt tốc độ tức thời, nhân vật biến mất hoàn toàn và để lại một vệt sét nổ giật trước khi xuất hiện ngay sau lưng đối thủ.
  * **Lôi Giáp Phản Kích (Raiton Armor Spikes):** Nhận Super Armor cấp cao. Bất kỳ kẻ địch nào đánh trúng Block bằng đòn cận chiến sẽ bị điện áp cao thế giật tê liệt (Micro-Stun 0.4s) và nhận 35% sát thương phản hồi.
  * **Lôi Điện Lan Truyền (Chain Lightning):** Mọi cú đấm thường hoặc kỹ năng đều kích hoạt chuỗi sét lan giật xuyên qua tối đa 4 mục tiêu lân cận.

##### C. Phân Bổ Bộ Kỹ Năng Lôi Điện: TIER 1 (CƠ BẢN) & TIER 2 (GỒNG CỰC ĐẠI)

> **Triết lý cân bằng:** Ở **Tier 1 (Base Form)**, người chơi vẫn có đầy đủ bộ chiêu thức xoay đấm, chém ngang, đá rìu trên không và lướt lariat cực kỳ cơ động và bạo liệt mà không cần tốn thời gian gồng. Khi kích hoạt **Tier 2 (Gồng Overcharge Lv.2 `Giữ D 1.2s`)**, các đòn Tier 1 được nâng cấp lên dạng EX kèm sét lan, đồng thời mở khóa thêm 2 tuyệt kỹ "nặng đô" hủy diệt: **Liger Bomb** và **Hell Stab 1 ngón**!

###### ─── NHÓM 1: KỸ NĂNG TIER 1 (CƠ BẢN — SỬ DỤNG NGAY KHI VÀO FORM) ───

1. **Lôi Tuyền Phong Toái Quyền (Spinning Thunder Hurricane Punch — Cú Xoay Đấm Lôi Bão):**
   * *Thao tác:* `D + > + A` (ở Lightning Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Block dậm chân xoay tròn cơ thể 360 độ cực nhanh liên tục 3 vòng quét sạch kẻ thù bu quanh trong bán kính 4m, kết thúc bằng cú nện búa sét (*Thunder Hammer Fist*) xuống sàn tạo vòng vương miện lôi điện làm tê liệt kẻ địch 1.5 giây. Tiêu hao ít MP, là công cụ dọn quái cận chiến chủ lực.

2. **Lôi Ngược Thủy Bình Cước / Trảm (Raigyaku Suihei Choppu — Lôi Trảm Phá Kình):**
   * *Thao tác:* `D + ^ + A` (ở Lightning Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Lao tới với vận tốc âm thanh, giáng nhát chém ngang karate bạt gió bằng cẳng tay và mu bàn tay bọc lôi điện đặc quánh. Phá vỡ khiên chắn của lính cơ giới và hất văng mục tiêu văng ngang đập vào vách tường, kích hoạt trạng thái *Găm Tường Badang*.

3. **Đoạn Đầu Đài Lôi Cước (Girochin Doroppu / Guillotine Drop — Rìu Sét Giáng Trần):**
   * *Thao tác:* `Nhảy (J) + D + A` (ở Lightning Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Nhảy lên không trung giơ chân cao 180° rồi bổ gót rìu sét (Axe Kick) thẳng đứng cắm xuống sàn. Có khả năng đánh trúng cả mục tiêu đang nằm bất động dưới đất (*OTG*) và xé rách sàn đấu thành rãnh sét rực lửa.

4. **Lôi Thiểm Thúc Cổ & Trọng Khảm Lôi Chỏ (Thunder Lariat & Sprinting Chō-Eru Elbow):**
   * *Thao tác:* `Chạy (>> hoặc <<) + A` (ở Lightning Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Lướt chớp giật vung cùi chỏ thúc chấn thủy hoặc vung cẳng tay móc ngang họng đối thủ, nổ sóng âm (*Sonic Boom*) hất tung đối thủ bay qua nửa màn hình.

---

###### ─── NHÓM 2: TUYỆT KỸ ĐẶC QUYỀN TIER 2 (CHỈ MỞ KHÓA KHI GỒNG OVERCHARGE LV.2) ───

5. **Lôi Ngọa Bạo Trụy (Raiga Bōmu / Liger Bomb — Tuyệt Kỹ Nện Đất Chấn Động):**
   * *Thao tác:* `D + v + A` (khi áp sát) hoặc `Chạy (>>) + D + A` *(Chỉ mở khóa ở Tier 2 Overcharge)*.
   * *Diễn hoạt & Uy lực (Tier 2 Exclusive):* Block lướt siêu tốc tóm chặt hai vai kẻ địch, bốc bổng qua đỉnh đầu rồi bật nhảy lên cao 5m. Ở đỉnh cú nhảy, anh lộn ngược người cắm đầu đối thủ nện thẳng xuống sàn đá với gia tốc sấm sét kinh hoàng! Mặt sàn vỡ nát thành **miệng hố thiên thạch (Crater VFX)**, sóng chấn động quét tròn 360° làm choáng toàn sân và lưu lại vùng từ trường điện tích 3 giây.

6. **Nhất Bản Quán Thủ / Tối Cường Chi Mâu (Jigokuzuki / Hell Stab — Đệ Tam Raikage Style):**
   * *Thao tác:* `D + > + J` *(Chỉ mở khóa ở Tier 2 Overcharge)*.
   * *Diễn hoạt & Uy lực (Tier 2 Exclusive):* Thu tay về sát sườn nén toàn bộ lôi điện vào **duy nhất 1 ngón tay** (*Nhất Bản Quán Thủ*), phóng vút về phía trước đâm thủng mục tiêu với vận tốc ánh sáng. Gây **100% Sát Thương Chuẩn (True Damage)** xuyên thấu hoàn toàn mọi loại khiên chắn kim loại và chỉ số phòng ngự của Boss.

---

###### ─── NHÓM 3: CƯỜNG HÓA EX CHO KỸ NĂNG TIER 1 KHI Ở TRẠNG THÁI TIER 2 ───

* **Lôi Tuyền Phong EX:** Block vừa xoay đấm vừa lướt tiến 6m như một cơn bão sét di động (Lightning Cyclone), hút toàn bộ quái trên đường lướt vào tâm bão trước khi nổ búa sét diện rộng.
* **Lôi Thiểm Lariat EX:** Để lại chuỗi tia sét nổ giật bôm bốp trên đường lướt gây tê liệt kẻ thù chạy sau.
* **Toàn bộ đòn đánh:** Kích hoạt nội tại **Sét Lan (Chain Lightning)** giật xuyên qua 4 mục tiêu lân cận.

---

#### 3. DẠNG XANH BIỂN: BÍCH HẢI THỦY LƯU THỂ (WATER VAJRA FORM — FISH-MAN KARATE & FLOW BRAWLER)

```
        ┌─────────────────────────────────────────────────────────────┐
        │       DẠNG XANH BIỂN: BÍCH HẢI THỦY LƯU (WATER FORM)        │
        │  5 NGUỒN CẢM HỨNG CỐT LÕI (THE 5 MARTIAL WATER PILLARS):    │
        │  1. Bang (OPM)        → Flow & Redirection (Dẫn lực lệch đòn)│
        │  2. Akaza (KNY)       → Martial Arts to Shockwave Projectile│
        │  3. Jinbe (OP)        → Fish-Man Karate: "Nước có trọng lượng"│
        │  4. Giyu/Tanjiro (KNY)→ VFX Shape Language (Hình học nước)  │
        │  5. Noelle (BC)       → Silhouette & Water Armor Progression│
        └─────────────────────────────────────────────────────────────┘
```

##### A. Triết Lý Thiết Kế 5 Cột Trụ (The 5 Core Design Pillars)

> **Nguyên tắc nền tảng:** Block ở dạng Xanh Biển tuyệt đối **KHÔNG PHẢI LÀ PHÁP SƯ ĐỨNG XA CAST PHÉP (Not a Wizard/Mage)**. Nước ở đây là công cụ khuếch đại uy lực cho thể thuật và quyền cước cận chiến của một đấu sĩ võ tăng brawler.

1. **Bang (Silver Fang - One Punch Man) → Flow & Redirection (Nhu Quyền Lệch Hướng):**
   * Điểm tinh hoa của Bang không phải là phóng nước, mà nước giải thích cách thức vận động cơ thể: **Không đứng tank đòn thô bạo mà uốn lượn xung quanh đòn đánh**.
   * Dải nước xanh lam chạy dọc theo cánh tay minh họa dòng chuyển động vật lý:
     ```
     ↘ incoming attack  (Đòn đánh của địch lao tới)
     〰 redirect         (Dải nước xanh uốn lượn đón lấy và bẻ lệch quỹ đạo)
     ⟳ circular movement (Xoay tròn thân bộ theo quán tính dòng chảy)
     → impact           (Mượn lực trả đòn nện đối thủ văng ra xa)
     ```
   * Người chơi nhìn vào animation là lập tức hiểu ngay tính chất võ học: Đón đỡ mềm mại, mượn lực đả lực.

2. **Akaza (Kimetsu no Yaiba) → Võ Thuật Kéo Dài Thành Áp Suất Chưởng Lực (Martial Arts Extension):**
   * Chưởng lực không bao giờ bắt đầu bằng việc đứng yên niệm chú (Cast spell), mà luôn là **phần kéo dài tự nhiên từ chuỗi quyền cước**:
     ```
     Jab (Đấm thẳng) ──> Elbow (Thúc chỏ) ──> Kick (Đá quét) ──> Water Compression Shockwave
     ```
   * *Biến thể áp suất nước của Block:*
     * `Punch` (Thôi quyền) ──> `Compression Ring` (Vòng nén áp suất nước) ──> `Water Pressure Projectile` (Bắn xuyên thấu).
     * `Palm` (Chưởng ấn) ──> `Circular Water Seal` (Vòng ấn chú nước nén) ──> `Pressure Burst` (Nổ tung xung chấn).

3. **Jinbe & Hack (One Piece) → Fish-Man Karate & Jujutsu ("Nước Có Trọng Lượng"):**
   * **Nếu Bang là "Nước Mềm" (Soft/Flow) thì Jinbe là "Nước Nặng" (Heavy/Impact).**
   * Nhịp đánh có độ đầm chắc cực đại:
     ```
     Anticipation ngắn ──> ĐÒN TRÚNG ĐÍCH (HIT STOP) ──> Nước nổ tung áp lực ──> Kẻ địch bị thổi bay
     ```
   * Không lạm dụng hiệu ứng hạt nước (particles) li ti vụn vặt gây rối mắt. Trọng tâm là **Cảm Giác Áp Suất (Heavy Pressure)**: Nắm đấm tác động thẳng vào phân tử nước trong không khí và cơ thể kẻ thù, tạo chấn động xuyên thấu giáp ngoài (Internal Damage) làm rung chuyển màn hình.

4. **Giyu Tomioka & Tanjiro (Demon Slayer) → Shape Language (Ngôn Ngữ Hình Học Của Nước):**
   * Định chuẩn hình học thị giác (VFX Geometry) cho toàn bộ chuyển động tay không của Block:
     * `Slash / Dash` (Chém tay / Lướt né) ──> **Crescent** (Dải trăng khuyết nước sắc bén).
     * `Spin` (Xoay người quét quyền) ──> **Circle** (Vòng tròn nước xoáy hoàn chỉnh).
     * `Uppercut` (Móc hàm nâng bổng) ──> **Rising Wave** (Cột sóng trào dâng đội ngược đối thủ).
     * `Ground Slam` (Nện đất dập sàn) ──> **Splash Crown** (Vương miện nước nổ bung 360 độ).
     * `Projectile` (Chưởng áp suất nén) ──> **Compressed Wave Ring** (Vòng sóng phẳng nén ép).
     * `Ultimate / Overcharge` (Cực đại) ──> **Dragon / Maelstrom** (Thủy long bão tố cuộn trào).

5. **Noelle Silva (Black Clover - Valkyrie Armor) → Silhouette & Combat Form Progression:**
   * Nước không chỉ là hiệu ứng đòn đánh, mà biến đổi **Silhouette (Đường nét nhân vật)** theo 4 cấp bậc tiến trình chiến đấu:
     * **Level 1 (Base Water Stance):** Cổ tay và cổ chân chỉ có dải lụa nước mỏng (*Water Ribbons*) uốn lượn thanh thoát theo từng nhịp thở.
     * **Level 2 (Flow State - Duy trì Combo / Meter 50%):** Cẳng tay (*Forearm*) và cẳng chân (*Shin*) được bọc kín lớp nước nén áp suất đặc quánh như găng đấm boxing và xà cạp kim cương bằng nước trong suốt (*Vajra Water Gauntlets & Greaves*).
     * **Level 3 (Surge State - Gồng Overcharge Lv.2):** Sau lưng và hai bên vai mọc ra các **Vây nước áp suất / Cánh nước phát quang** (*Water Fins & Streamers*) bồng bềnh, tạo dáng vẻ cự nhân hộ thần biển sâu.
     * **Level 4 (Peak / Ultimate Form):** Toàn thân phủ trọn bộ **Chiến Giáp Nước Nén (Full Water Martial Armor)**, nước luân chuyển với vận tốc siêu cao bảo hộ tuyệt đối trước mọi đòn tấn công.

---

##### B. Cơ Chế GỒNG TĂNG ÁP THỦY TRIỀU (Level 2 Overcharge — Surge State & Vây Nước)
* **Thao tác Gồng:** Khi đang ở Water Form, **Nhấn giữ phím Phòng Thủ (`D`) trong 1.2 giây**.
* **Diễn hoạt Gồng Sức Mạnh:**
  * Block khép mắt thở một hơi dài thanh tịnh, hai tay vung vẽ một vòng tròn thái cực nước trong không gian.
  * Nước ngầm từ lòng đất trào dâng, bốc ngược lên lưng Block định hình thành **Đôi Cánh Vây Nước Áp Suất (Surge Fins)** bồng bềnh phát sáng màu xanh ngọc bích.
  * Cơ bắp toàn thân được bao bọc bởi một lớp màng nước siêu nén, hơi nước áp suất cao bốc lên nghi ngút như động cơ phản lực thủy lực.
* **Hiệu Ứng Bổ Trợ Trạng Thái Gồng Lv.2:**
  * **Hóa Kình Bất Động (Fluid Redirection):** Giảm 65% toàn bộ sát thương nhận vào; 25% sát thương gánh chịu được tích trữ và chuyển hóa thành HP hồi phục cho Block và đồng đội đứng gần.
  * **Lưu Thủy Tật Bộ (Aqua Slip - Bang Style):** Khi đối phương tấn công vào thế thủ, Block tự động hóa lỏng bộ pháp lướt trượt ra sau lưng đối thủ (I-frames) mà không tốn mana/thể lực.
  * **Nội Áp Ngư Nhân (Internal Penetration - Jinbe Style):** Mọi đòn đánh đều gây sát thương xuyên giáp, tác động thẳng vào nội lực của mục tiêu.

---

##### C. Phân Bổ Bộ Kỹ Năng Thủy Quyền: TIER 1 (CƠ BẢN) & TIER 2 (GỒNG CỰC ĐẠI)

> **Triết lý cân bằng:** Ở **Tier 1 (Base Form - Dải lụa nước Ribbon)**, Block sở hữu đầy đủ bộ võ thuật cận chiến: Nhu quyền hóa giải của Bang, cú đấm nước nặng của Jinbe, và phát bắn thủy áp cơ bản. Khi kích hoạt **Tier 2 (Gồng Surge State `Giữ D 1.2s` - Mọc Vây Nước Noelle)**, Block mở khóa thêm tuyệt kỹ nện sàn **Splash Crown** diện rộng và chuỗi võ thuật bắn 3 vòng nén áp suất siêu xa của **Akaza**, cùng khả năng cường hóa Thủy Long!

###### ─── NHÓM 1: KỸ NĂNG TIER 1 (CƠ BẢN — SỬ DỤNG NGAY KHI VÀO FORM) ───

1. **Ngư Nhân Thủy Phá Quyền & Tuyền Phong (Fish-Man Karate Maelstrom Punch — Jinbe & Bang Style):**
   * *Thao tác:* `D + > + A` (ở Water Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Block xoay tròn thân người 360 độ theo đường tròn hoàn mỹ (Circle Shape), hai cánh tay bọc dải nước xanh bẻ lệch toàn bộ đòn đánh của địch bu quanh. Lực xoay hội tụ vào nắm đấm phải tung cú đấm Fish-Man Karate cắm vào ngực đối thủ. Khoảnh khắc HIT đóng băng 0.1s (*Hit Stop* cực nặng), cột nước áp suất nổ tung xuyên thẳng qua cơ thể hất văng mục tiêu bay xa 10m đập vào tường. Tiêu hao ít MP, sát thương đầm chắc.

2. **Nhu Thần Lưu Thủy Chi Kính (Water Stream Rock Smashing Parry — Bang Style):**
   * *Thao tác:* `D + ^ + A` (ở Water Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Bắt chéo hai cẳng tay trước ngực vẽ dải nước xanh xoay tròn tạo gương nước thái cực. Phản hồi 100% đạn bắn xa về phía kẻ bắn. Nếu bị đòn cận chiến đánh trúng, Block lập tức trượt luồn nách (Water Slip I-frames), bẻ khóa khớp vai và tung chưởng ấn nước nén vào lưng đối thủ tông vào vách tường.

3. **Thủy Triều Đoán Cước & Ba Đào Quyền (Rising Wave & Crescent Slice — Giyu Shape Language):**
   * *Thao tác:* `Chạy (>>) + A` hoặc `Nhảy (J) + A` (ở Water Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Lướt tới chém mu bàn chân tạo vệt nước trăng khuyết (*Crescent*) quét ngã quái, bồi thêm cú móc hàm kéo theo ngọn sóng trào (*Rising Wave*) hất bổng đối thủ lên không trung mở Air Combo.

4. **Thủy Áp Pháo Đơn (Single Water Jet Thrust — Đấm Thôi Quyền Bắn Nước):**
   * *Thao tác:* `D + > + J` (ở Water Form cơ bản).
   * *Diễn hoạt & Tính chất (Tier 1):* Hạ tấn thôi một cú đấm thẳng bọc nước, phóng một luồng tia nước áp suất nén phẳng đường kính 0.6m dài 8 mét đẩy lùi toàn bộ quái vật dạng nhẹ.

---

###### ─── NHÓM 2: TUYỆT KỸ ĐẶC QUYỀN TIER 2 (CHỈ MỞ KHÓA KHI GỒNG SURGE STATE MỌC VÂY NƯỚC) ───

5. **Thủy Bích Trọng Trụy & Vương Miện Nước (Ocean Slam & Splash Crown — Jinbe Jujutsu & Giyu Style):**
   * *Thao tác:* `D + v + A` (áp sát mục tiêu) *(Chỉ mở khóa ở Tier 2 Surge State)*.
   * *Diễn hoạt & Uy lực (Tier 2 Exclusive):* Block áp sát tóm chặt thắt lưng kẻ địch, vận thủy kình tạo thành một quả cầu bong bóng nước nén khổng lồ giam cầm mục tiêu bên trong. Anh bốc bổng kẻ địch xoay 2 vòng trên không rồi đập sầm mục tiêu xuống sàn đá! Ngay khi chạm đất, khối nước nổ tung bốc ngược lên thành một **Vương Miện Nước Khổng Lồ (Splash Crown VFX 360°)** bạt ngã toàn bộ kẻ địch đứng gần trong bán kính 6 mét, găm mục tiêu chính xuống đất dính trạng thái **Ứ Nước (Soaked - giảm 30% kháng lôi)**.

6. **Phá Hoại Sát: Thủy Áp Xung Kích Pháo (Destructive 3-Rings Water Cannon — Akaza Style):**
   * *Thao tác:* `D + > + J` *(Tự động kích hoạt thay thế Thủy Áp Pháo Đơn khi ở Tier 2)*.
   * *Diễn hoạt & Uy lực (Tier 2 Exclusive):* Block tung chuỗi đòn vũ bão: `Jab tay trước ──> Thúc cùi chỏ ──> Xoay người tung cú đấm thẳng cực mạnh`. Từ nắm đấm bung ra **3 Vòng Nước Nén Áp Suất (Water Compression Rings)** xếp chồng, phóng vút về phía trước thành một luồng đại pháo thủy áp phẳng xuyên thấu 12 mét, thổi bay toàn bộ hàng ngũ quái vật và dập tắt dung nham.

---

###### ─── NHÓM 3: CƯỜNG HÓA EX CHO KỸ NĂNG TIER 1 KHI Ở TRẠNG THÁI TIER 2 ───

* **Ngư Nhân Thủy Phá Quyền EX:** Cột nước áp suất nổ tung hóa thành một con **Thủy Long (Water Dragon)** gầm thét xuyên qua cả hàng dọc đấu trường, lưu lại dải nước làm chậm quái 50% trong 4 giây.
* **Nhu Thần Lưu Thủy Kính EX:** Bẫy nước trói chặt đối thủ 3.5 giây và hút 20% sinh lực địch chuyển hóa thành hào quang hồi phục cho Block và đồng đội đứng gần.
* **Bộ Pháp Aqua Slip EX:** Khi đỡ đòn thành công, Block lướt biến ảnh trượt nước hoàn toàn miễn nhiễm sát thương trong 0.8 giây.

---

#### 4. Nguyên Lý Dung Hợp Nhị Hợp (Dual-Elemental Fusion -> Pure White)

```
        ┌─────────────────────────┐               ┌─────────────────────────┐
        │       WATER FORM        │               │     LIGHTNING FORM      │
        │   (Thủy Lưu Áp Suất)    │               │    (Lôi Quang Cực Hạn)  │
        │    Màu Xanh Biển Sâu    │               │       Màu Vàng Điện     │
        └────────────┬────────────┘               └────────────┬────────────┘
                     │                                         │
                     └────────────────────┬────────────────────┘
                                          │
                         [ DUNG HỢP 100% NỘ KHÍ / MANA ]
                                          ▼
                     ┌─────────────────────────────────────────┐
                     │         BẠCH HOÀNG THÁNH THỂ            │
                     │          (WHITE VAJRA FORM)             │
                     │  • Màu Trắng Tinh Khiết / Platinum      │
                     │  • Nắm đấm bọc quả cầu chân không       │
                     │  • Năng lực: Làm Vỡ Không Gian (Râu Trắng)│
                     └─────────────────────────────────────────┘
```

* **Hiện tượng vật lý & Triết lý:** 
  * Khi dòng nước áp suất siêu cao (`Water`) va chạm trực diện với nhiệt lượng hàng vạn độ của sấm sét (`Lightning`), hiện tượng bốc hơi siêu tới hạn (Supercritical Steam & Plasma) diễn ra, triệt tiêu mọi quang phổ màu đơn lẻ và hợp nhất thành **Ánh Sáng Trắng Thuần Khiết (Pure White Light)**.
  * Trong võ đạo phương Đông, đây là cảnh giới **"Chân Không Vô Niệm"**: Block vượt qua ranh giới của vật chất ngũ hành, biến chính thể xác và khí quyển xung quanh thành một thể thống nhất.
  * **Điều kiện tối thượng:** Khi người chơi đã thuần thục cảnh giới Gồng Cực Đại (Overcharge Lv.2) của cả Vàng Điện và Xanh Biển, việc kích hoạt Bạch Hoàng Thánh Thể sẽ đạt được 100% uy lực chân chính.

* **Cách thức kích hoạt biến hình:**
  * Khi Block ở dạng `Water` hoặc `Lightning` và tích lũy đủ **100% Nộ khí (Vajra Gauge)** hoặc 100 MP:
  * Nhập lệnh: **`Defense + Up + Jump` (`DUJ`)** kết hợp nhấn giữ 1.0 giây (hoặc `Shift + D + J` khi ra lệnh hỗ trợ).
  * Toàn bộ đấu trường lóe sáng trắng chói lòa (Flash Whiteout), Block bùng nổ chuyển hóa thành dạng **Bạch Hoàng**.

---

#### 5. Bộ Năng Lực Đặc Quyền Dạng Trắng: ĐIỀU KHIỂN KHÍ QUYỂN & KHÔNG GIAN HƯ KHÔNG (Edward Newgate & Spatial Rift Master)

Ở trạng thái Bạch Hoàng, toàn bộ cơ chế của Block được nâng cấp lên mức địa chấn toàn cục kết hợp thao túng không - thời gian:

##### A. Nội tại: Quả Cầu Chấn Động Bạch Khí (Seismic Bubble Aura) & Combo Quyền Khí (`white_attack_combo`)
* Hai bàn tay Block liên tục được bao bọc bởi hai **quả cầu áp suất khí nén chân không màu trắng sữa phát quang** bập bùng như ngọn lửa lạnh.
* **Chuỗi đòn đánh thường Bạch Hoàng (`white_attack_combo` - 8 frame, 720ms):**
  * Thao tác: `A -> A -> A` (Jab tay trước ──> Hữu trực quyền ──> Móc sườn chấn động).
  * Mọi cú đấm đều phát ra sóng chấn động khí nén đẩy lùi quái nhỏ ra xa 2 mét, phá vỡ 100% trạng thái phòng thủ (Guard Break) của kẻ thù.

##### B. Slot DDA: Thiên Địa Toái Không Quyền (`white_spatial_shatter`) & Đạn Chấn Động Hư Không (`vfx_rift_fist` / `vfx_seismic_wave`)
* **Thao tác:** `D + > + A` (ở dạng White Form).
* **Diễn hoạt cận chiến (`white_spatial_shatter` - 8 frame, 667ms):**
  * Block co nắm đấm phải bọc quả cầu khí trắng về phía sau, cơ bắp căng phồng; không khí xung quanh nắm tay bị hút lõm lại thành một điểm đen thấu kính.
  * Block dậm mạnh chân đấm thẳng vào khoảng không vô định trước mặt: **Một tiếng "RẮC TOÁC!" vang dội kinh hoàng, toàn bộ mảng không gian phía trước mặt vỡ nát thành hàng chục mảnh nứt phát sáng như tấm gương trời bị nện búa tạ!** (Kích hoạt event `spatial_fracture_impact` tại frame 3).
* **Cơ chế phát đạn chấn động (Projectile Muzzle Spawn):**
  * Tại **frame 3** (localFrame0: 3), từ điểm bắn (Muzzle Pixel) tham khảo `(132, 80)` trên canvas 192×160, cú đấm nén khí có thể phóng ra một thực thể projectile chấn động bay theo hướng `+X` (pivot gốc `96, 80`):
    1. **Nhánh 1 — Nhấn nhả `D + > + A` (Quyền Khí Nứt Không Gian - `vfx_rift_fist`):**
       - Phóng một **Nắm đấm khí nén trắng** lơ lửng bên trong quả cầu áp suất trong suốt bay vụt sang phải (8 frame loop, 520ms).
       - Nắm đấm khí nén này **xé rách không gian** trên suốt đường bay, kéo theo vòng áp suất khí nén và chuỗi vết rạn không gian rực sáng.
       - Sát thương xuyên giáp thẳng tắp, đánh bạt mọi lính cơ giới trên đường bay.
    2. **Nhánh 2 — Giữ phím hoặc gõ nhịp `D + > + A -> A` (Sóng Địa Chấn Lưỡi Liềm - `vfx_seismic_wave`):**
       - Chuyển hóa áp suất thành một **Sóng chấn động hình lưỡi liềm** cong đứng sắc bén bay sang phải (8 frame loop, 560ms).
       - Lưỡi sóng áp suất cao xé toạc không khí, dải năng lượng bạc càn quét ngang toàn bộ trục Z, đẩy lùi toàn bộ quái vật bu đông.
  * **Cơ chế nổ va chạm (Spatial Break Impact - `vfx_spatial_break`):**
    - Khi projectile chạm trúng mục tiêu, va vào tường/địa hình hoặc đạt giới hạn tầm bay: Lập tức ngắt chu kỳ travel và phát nổ hiệu ứng **Toái Không Bạo Liệt (`vfx_spatial_break` - 8 frame, 700ms)** tại tọa độ va chạm.
    - Hiệu ứng bung nở từ điểm nứt ban đầu thành mạng tinh thể vỡ vụn và hàng chục mảnh không gian trắng bạc nổ tung tan biến, gây sát thương chấn động thứ cấp diện rộng và kích hoạt găm tường nếu mục tiêu văng vào vách đá.

##### C. Slot D>J (KỸ NĂNG MỚI THEO SPATIAL_SKILLS): Khai Môn Tật Bộ & Xuyên Hư Không (Spatial Rift Portal & Void Traverse — Phá & Đi Xuyên Không Gian)

> **Cảm hứng & Thiết kế Animation:** Bổ sung theo quy chuẩn hoạt họa `Block_White_Ultimate_animations_v001` (16 frame nhân vật + 8 frame VFX cổng). Cho phép Block không chỉ phá vỡ không gian bằng nắm đấm mà còn chủ động **xé rách ranh giới không gian để bước xuyên qua cõi hư không**, xuất hiện tức thời tại vị trí chiến lược!

```
    [ white_rift_open ]                      [ vfx_spatial_gate ]                    [ white_rift_step ]
 1. Đấm nứt không gian              2. Cổng hư không mở ra              3. Bước vào cổng (Tàn ảnh I-frames)
 2. Hai tay kéo rách khe nứt  ───>     (Lòng cổng alpha thật)     ───>  4. Chuyển Root sang cổng ra
 3. Hồi thế thủ vững vàng              (Giữ mở liên tục pose 3-4)       5. Xuất hiện phía bên kia & Tấn công
```

* **Thao tác:** `Phòng thủ (D) + Hướng Tiến (>) + Nhảy (J)` (`D + > + J` ở White Form) hoặc `Chạy (>>) + J`.
* **Cơ chế Diễn Hoạt 2 Pha Liên Hoàn:**
  1. **Pha 1 — Khai Môn Khe Nứt (`white_rift_open` - 8 frame, 1130ms):**
     - Block co quyền nén khí đấm mạnh vào không trung tạo đường rạn nứt đứng. Hai tay Block vươn tới bám chặt vào hai mép vết nứt, dùng kình lực xé toạc không gian ra hai bên (`spawn_spatial_gate` tại frame 3), sau đó thu tay hồi thế thủ (`gate_open_hold` tại frame 5).
     - **VFX Cổng Không Gian (`vfx_spatial_gate` - 8 frame, 880ms):**
       * Cổng xuất hiện ngay phía trước tâm chân Block khoảng **+36 px** (`offset: [36, 0]`, anchor chân cổng `96, 132`).
       * Cổng hình bầu dục viền rạn nứt phát sáng màu trắng bạch kim chói lọi; **lòng cổng hoàn toàn trong suốt (Alpha thật 0/255)**, không có đĩa màu đen hay dải thiên hà giả, hiển lộ trực tiếp không gian phía sau.
       * Cổng lặp chu kỳ pose 3–4 (JSON index) trong engine để duy trì trạng thái mở ổn định.
  2. **Pha 2 — Xuyên Hư Không Bước Qua Cổng (`white_rift_step` - 8 frame, 940ms):**
     - Block cất bước tiến thẳng vào mặt phẳng của cổng không gian. Thân thể bắt đầu tan biến từng phần từ chân đến đầu, hòa tan vào cõi hư không dưới dạng tàn ảnh trong suốt (`enter_rift_ghost` tại frame 4).
     - **Trạng thái Tàn Ảnh (Pose 4):** Block nhận **100% Khung Bất Tử (I-frames)**, hoàn toàn miễn nhiễm với mọi loại sát thương, hiệu ứng khống chế và đạn đạo.
     - **Chuyển vị trí gốc (Root Relocation):** Hệ thống hoán đổi tọa độ gốc (Root Transform) của Block sang cổng ra phía trước mặt hoặc phía sau lưng kẻ địch **ngay trước pose 5** (`relocate_root_to_exit`), triệt tiêu độ trễ chuyển động.
     - **Tái hiện ở cổng ra (Pose 5–8):** Thân thể Block ngưng tụ lại sắc nét khi bước ra khỏi cổng ra, thu thế chiến đấu tức thì.
* **Tính Chất Cơ Học & Ứng Dụng Chiến Thuật:**
  * **Vượt địa hình & Bỏ qua va chạm (Collision Bypass):** Dịch chuyển xuyên qua các vật cản môi trường (cửa sắt Bastonne, đá sập Calvaria, hố sâu) và xuyên thẳng qua thân hình khổng lồ của các Boss hạng nặng (Hyper Armor Juggernaut).
  * **Đột kích móc lốp & Ép góc tường (Flank to Wall-Impact):** Xuất hiện ngay sau lưng đối thủ, hủy động tác hồi thế (Animation Cancel) bằng một cú `white_spatial_shatter` hoặc `white_attack_combo` để đấm dồn mục tiêu văng cắm đầu vào tường đá (kích hoạt *Badang Wall-Impact*).
  * **Lối thoát chiến thuật cho Đồng đội:** Cánh cổng tồn tại duy trì trong 2 giây, đồng đội (Solei, Tulas, Deep) có thể chạy xuyên qua cổng để thoát khỏi vòng vây hoặc tiếp cận hỗ trợ.

##### D. Slot DDJ: Khuynh Đảo Càn Khôn (Atmospheric Tilt & Screen Quake — Tóm Lấy Bầu Không Khí)
* **Thao tác:** `D + v + J` (ở dạng White Form).
* **Diễn hoạt (`white_atmospheric_tilt` - 8 frame, 1084ms):**
  * Block bành hai cánh tay sang hai bên, hai bàn tay co quắp lại như nắm chặt vào hai mảng không khí vô hình.
  * Anh gầm lên một tiếng sấm sét, hai tay kéo giật mạnh chéo xuống đất (`atmospheric_pull_camera_tilt_15deg` tại frame 4): **TOÀN BỘ MÀN HÌNH GAME BỊ NGHIÊNG HẲN MỘT GÓC 15 ĐỘ (Camera Tilt & Heavy Shake)!**
  * Mặt đất rung chuyển dữ dội, các tảng đá sàn nhà nứt toác đội ngược lên.
* **Cơ chế chiến thuật:**
  * Toàn bộ kẻ địch trên toàn màn hình bị mất trọng lực, trượt ngã nhào và bị lực kéo khí quyển hút dồn thẳng về tâm trước mặt Block.
  * Quái bay trên trời bị áp suất kéo rơi thẳng cẳng xuống mặt sàn.
  * Tạo khoảng trống vàng tuyệt đối để đồng đội (Solei lướt gió hoặc Deep múa kiếm) xả trọn vẹn combo kết liễu.

##### E. Slot DUA: Bách Thủ Toái Không Ấn (Hundred Hands: Spatial Cataclysm — Ultimate Chiêu)
* **Thao tác:** `D + ^ + A` (ở dạng White Form).
* **Diễn hoạt (`white_cataclysm` - 64 frame timeline, 5684ms):**
  * Block đứng tấn vững chãi, hai tay chắp lại trước ngực.
  * Phía sau lưng bùng nổ **Pháp Tướng Bách Thủ (Hundred Hands) nhưng toàn bộ cánh tay năng lượng mang màu TRẮNG TINH KHIẾT ÁNH BẠCH KIM**.
  * Hàng trăm cánh tay thực hiện **17 chu kỳ lặp 3 pose liên quyền ở tốc độ 60ms/frame** (`barrage_begin` tại frame 5), đồng loạt thụi liên hoàn vào bầu không khí xung quanh, tạo ra hàng trăm vết nứt không gian đa phương diện đan xen như mạng nhện bao trùm 100% diện tích màn hình.
  * Kết thúc bằng cú **Chắp hai Đại Phật Thủ khổng lồ** nghiền nát toàn bộ các mảng nứt không gian (`giant_palms_clap` tại frame 60), tạo vụ nổ siêu tân tinh trắng xóa thổi bay mọi boss và quái vật.

##### F. Slot DUJ: Chấn Động Phóng Thích / Trở Về Dạng Thường (`white_seismic_dispersion`)
* **Thao tác:** `D + ^ + J` (ở dạng White Form).
* **Diễn hoạt (`white_seismic_dispersion` - 8 frame, 1110ms):**
  * Block tụ khí nén rồi xả toàn bộ năng lượng trắng ra xung quanh dưới dạng một làn sóng xung kích địa chấn 360 độ (`seismic_ring_release` tại frame 3) hất văng quái áp sát.
  * Thân thể dịu lại, đưa nhân vật trở về trạng thái áo khoác thường (`return_NormalJacket` tại frame 7).


---

## 4. TƯƠNG TÁC HỆ LỆNH COMMAND THEO TRẠNG THÁI (`Shift + ...`)

Khi người chơi điều khiển Solei hoặc Deep / Ghost và dùng `Shift + Tab` chọn **General Block**, các lệnh phối hợp chiến thuật sẽ phát huy tối đa sức mạnh bảo hộ của anh:

| Thao tác phím | Lệnh thực tế | Hành vi của Block trên sân đấu | Ứng dụng chiến thuật & Squad Synergy |
| :--- | :--- | :--- | :--- |
| **Giữ Shift + Lên** | **Tự Do (`Free`)** | **Hộ Vệ Tiên Phong (Frontline Breaker):** Block chủ động áp sát cụm quái đông nhất, kích hoạt *Kim Cang Hấp Tinh Ấn* để gom sạch quái nhỏ và quái cơ động lại một góc cho Solei / Deep xả chiêu. | Giảm tải áp lực bị bao vây cho cả đội, gom quái để tối đa hóa DPS diện rộng. |
| **Giữ Shift + Xuống** | **Tập Hợp (`Regroup`)** | **Vạn Lý Kim Cang Bích (Aegis Bastion):** Block dùng *Phase Leap* lập tức phóng về đứng chắn ngay trước mặt người chơi, bành hai tay dựng lên **Bức Tường Graphene Bán Nguyệt** cản phá 100% đạn pháo và đòn đánh trùm. | Cứu mạng người chơi khi bị Boss xả đạn tầm xa hoặc khi thanh máu rơi vào vùng báo động đỏ (<20%). |
| **Giữ Shift + Trái/Phải** | **Giữ Vị Trí (`Hold`)** | **Bệ Phóng Chiến Thuật (Shield Vault Platform):** Block cắm chân giữ vững vị trí chỉ định, giương đôi tay hộ pháp tạo thành bệ đỡ vững chắc như bàn thạch. | **Tương tác đặc biệt:** Người chơi lướt tới đạp lên tay Block để bật nhảy lên không trung, tung đòn giáng đất diện rộng (*Aerial Dropkick*). |
| **Shift + Tấn công + 0** | **Kỹ Năng Hỗ Trợ (`Assist`)** | **Cú Đấm Không Gian Xuyên Phá:** Block tức thì xuất hiện sau lưng mục tiêu mà người chơi đang nhắm, tung một cú đấm nứt không gian làm vỡ nát toàn bộ thanh giáp hộ mệnh của quái tinh nhuệ. | Phá vỡ thế phòng thủ của những tên Boss có giáp bất hoại (như lính bọc thép Bastonne hay Boss Gilles). |
| **Shift + Nhảy (J)** | **Hỗ Trợ Di Chuyển** | **Cột Trụ Kim Cang:** Block dùng hai tay nâng các tảng đá sập hoặc cánh cửa sắt nặng hàng tấn lên cao trong 5 giây cho đồng đội trườn qua. | Giải đố môi trường, mở lối đi bí mật trong các hầm ngục chật hẹp. |

---

## 5. TIẾN TRÌNH PHÁT TRIỂN & CỐT TRUYỆN THEO CÁC MÀN (STAGE 0 ĐẾN STAGE 5)

### Stage 0: Đêm Máu Bastonne — Nơi Tế Bào Thức Tỉnh
* **Bối cảnh:** Block bị Jamerson giam cầm tại Buồng số 5 để làm vật thí nghiệm tiêm tế bào Graphene và chịu khí độc Neuro-B.
* **Khoảnh khắc then chốt:** Khi buồng xả nhiệt kích hoạt, Block kiên cường gõ vách tường ra tín hiệu cho Stranger. Khi được giải cứu, cơ thể anh đã hoàn tất quá trình dung hợp sinh học. Trong trận đối đầu Cai ngục Gilles, Block dùng chính đôi tay trần đã hóa kim cương của mình để đấm gãy cây chùy máy rung của Gilles, mở đường máu cho cả đội rút lui.
* **Mở khóa năng lực:** Mở khóa chuỗi combo Boxing Paquito và cơ chế *Thiết Bố Sam (Super Armor)*.

### Stage 1: Marseille Bất Ổn — Tấm Khiên Của Những Kẻ Bị Bỏ Rơi
* **Bối cảnh:** Bến cảng Marseille bị cảnh sát mật của Jamerson và các băng nhóm bủa vây; thường dân tị nạn kẹt giữa làn đạn pháo.
* **Hành động anh hùng:** Block không màng nguy hiểm, dùng thân thể mình làm tấm bia chắn hỏa lực từ các tàu tuần tra bến cảng để che chở cho đoàn người già và trẻ nhỏ xuống thuyền an toàn.
* **Mở khóa năng lực:** Mở khóa chiêu thức gom quái *Kim Cang Hấp Tinh Ấn*.

### Stage 2: Sakuri — Cuộc Chạm Trán Với Cội Nguồn Võ Phái
* **Bối cảnh:** Ngôi làng ven biển và võ phái cổ truyền nơi các sư phụ từng trục xuất Block vì cho rằng anh đã "làm vấy bẩn võ đạo bằng công nghệ ngoại lai".
* **Đấu tranh nội tâm:** Block chứng minh rằng võ thuật không nằm ở sự cố chấp cổ hủ, mà nằm ở tâm nguyện bảo vệ kẻ yếu. Trong trận tỷ thí tại võ đường, anh dùng quyền pháp thuần túy để thuyết phục các trưởng lão.
* **Mở khóa năng lực:** Mở khóa cơ chế đấm ép tường *Badang Wall-Impact* và đòn *Kim Chung Bất Diệt Phản Kình*.

### Stage 3: Calvaria — Trụ Đỡ Chốn Địa Ngục Tro Tàn
* **Bối cảnh:** Dưới hầm mỏ tử thần Calvaria, các đường hầm sập đổ liên tục do hỏa lực và khí nổ gas.
* **Khoảnh khắc chấn động:** Khi cánh cổng vòm ngàn tấn đang sụp xuống đè lên Solei và Tulas, Block lao vào dùng hai vai và đôi tay gồng gánh toàn bộ sức nặng của ngọn núi tro tàn, tạo hành lang cho cả đội vượt qua.
* **Mở khóa năng lực:** Mở khóa *Bạt Sơn Không Gian Quyền (Spatial Fracture Punch)*.

### Stage 4: Akam Meskul — Bức Tường Trước Huyết Long Khổng Lồ
* **Bối cảnh:** Trận chiến bên trong lồng ngực quái vật Titan Trái Tim; máu độc và xương sườn rồng vỡ vụn rơi như mưa bão.
* **Vai trò:** Block là người đứng mũi chịu sào, liên tục hứng chịu các cú quét vuốt man rợ của Titan để Tulas có thời gian thanh tẩy độc chất và Solei chặt đứt xích neo.

### Stage 5: The Cradle (Chiếc Nôi) — Thiên Thủ Khai Mở Cõi Mộng
* **Bối cảnh:** Cõi Mộng vô tận nơi Stranger bị bóng tối nuốt chửng. Thể xác Heni đang được Block bế trên tay trong hành trình qua bão tuyết tâm linh.
* **Trận tử chiến thức tỉnh:** Đối mặt với những ảo ảnh bóng ma do Cõi Mộng triệu hồi, Block đạt tới cảnh giới tối cao của võ đạo: buông bỏ mọi sợ hãi và phẫn nộ, tâm cảnh hòa nhập vào hư không vô lượng. Hai dòng năng lượng Thủy lưu (`Water Form`) và Lôi quang (`Lightning Form`) trong kinh mạch Block tự động dung hợp, bùng nổ thành **Bạch Hoàng Thánh Thể (White Vajra Ultimate Form)**. Hai nắm đấm bọc quả cầu khí chấn động trắng xóa, Block tóm lấy bầu không khí kéo sụp toàn bộ kết cấu mộng cảnh và đấm nứt toạc không gian (Edward Newgate Style), kéo Stranger trở về với ánh sáng thực tại.
* **Mở khóa năng lực:** Mở khóa **Trạng Thái Biến Hình Bạch Hoàng (White Form)** và chiêu thức tối thượng *Bách Thủ Toái Không Ấn*.

---

## 6. BẢNG THÔNG SỐ CÂN BẰNG, HITBOX & FRAME DATA

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CHỈ SỐ THIẾT KẾ CƠ BẢN                         │
├────────────────────────────────────────────────────────────────────────┤
│  • Sinh lực cơ bản (Base HP): 1,250 (Cao nhất trong dàn nhân vật)      │
│  • Tốc độ di chuyển: 4.8 m/s (Chậm hơn Solei 25%, ngang bằng Deep)     │
│  • Kháng sát thương vật lý nội tại: 20%                               │
│  • Kháng sát thương va đập môi trường: 50%                             │
│  • Tầm với nắm đấm (Fist Reach): Trung bình - Cận chiến                │
│  • Bán kính đòn Chấn Động Không Gian: 10m (Hình nón 60 độ)             │
│  • Bán kính Vòng Xoáy Hút Quái: 7m (Hình tròn 360 độ)                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Bảng Frame Data Chi Tiết Các Đòn Kỹ Năng

| Tên đòn đánh | Startup (Frames) | Active (Frames) | Recovery (Frames) | On-Block Advantage | Hitbox Type & Hiệu ứng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Jab 1 (`A`)** | 4 | 2 | 8 | +2 | Mid - Cận chiến nhanh, ngắt chiêu. |
| **Straight 2 (`A-A`)** | 6 | 3 | 10 | +1 | Mid - Phá giáp nhẹ. |
| **Body Hook 3 (`A-A-A`)** | 7 | 3 | 12 | 0 | Low - Gây khựng nặng tại chỗ. |
| **Heavy Uppercut (`Finisher`)** | 10 | 4 | 18 | -4 | Launch - Hất tung kẻ địch lên không. |
| **Không Gian Quyền (`D + > + A`)** | 14 | 6 | 22 | +4 (Xuyên thủ) | Full Screen Shockwave - Nứt không gian, Knockback 8m. |
| **Hấp Tinh Ấn (`D + v + A`)** | 8 | Tụ tối đa 180 | 14 | +6 | AoE 360 độ - Hút kéo liên tục, làm choáng 2.0s. |
| **Húc Ép Tường (`D + > + J`)** | 11 | 15 (Lao tới) | 20 | -2 (Nếu hụt) | Grab/Dash - Ép góc, găm tường gây Choáng 1.8s. |
| **Thiên Thủ Hàng Ma (`Ultimate`)** | 1 (Invincible) | 240 (Liên hoàn) | 30 | +12 (Bất tử) | Screen-wide AoE - Vạn quyền bão táp, sát thương cực đại. |
| **[LÔI ĐIỆN - T1] Lôi Tuyền Phong Xoay Đấm (`D+>+A`)** | 8 | 24 (Xoay 3 vòng) | 14 | +3 | AoE 360 độ - Xoay đấm bão sét, dập búa sét tạo vương miện lôi điện làm choáng 1.5s. |
| **[LÔI ĐIỆN - T1] Lôi Ngược Thủy Bình Chop (`D+^+A`)** | 7 | 4 | 16 | +5 (Phá Giáp) | High Piercing Chop - Chém ngang bạt gió, phá khiên giáp quái, Knockback xa. |
| **[LÔI ĐIỆN - T1] Đoạn Đầu Đài Lôi Cước (`Nhảy+D+A`)** | 10 | 6 (Đá chẻ) | 18 | +4 | Overhead OTG - Bổ gót rìu sét từ trên trời cắm thẳng xuống đất, đánh trúng quái nằm sàn. |
| **[LÔI ĐIỆN - T1] Lôi Thiểm Thúc Cổ Lariat (`Chạy+A`)** | 6 | 8 (Lao tới) | 12 | +2 | Fast Mid - Cùi chỏ/cánh tay lướt thần tốc móc họng, tạo Sonic Boom hất tung đối thủ. |
| **[LÔI ĐIỆN - T2] Gồng Tăng Áp SSJ2 (`Giữ D 1.2s`)** | 10 (I-frames) | 72 (Tụ sét) | 12 | +8 | Power-Up Buff - Hào quang sét giật SSJ2/Raikage, tốc độ +60%, kích hoạt Chain Lightning. |
| **[LÔI ĐIỆN - T2] Lôi Ngọa Bạo Trụy / Liger Bomb (`D+v+A`)** | 9 | 35 (Vật & Nện) | 18 | +6 | Command Grab - Bốc bổng đối thủ, nện cắm đầu xuống sàn tạo hố thiên thạch, AoE Stun. |
| **[LÔI ĐIỆN - T2] Nhất Bản Quán Thủ Hell Stab (`D+>+J`)** | 12 | 5 (Xuyên thấu) | 15 | +7 (Xuyên Giáp) | True Damage Thrust - 1 ngón đâm xuyên táo hàng dọc, bỏ qua 100% phòng ngự & kháng phép. |
| **[THỦY LƯU - T1] Ngư Nhân Thủy Phá Quyền (`D+>+A`)** | 9 | 28 (Xoay & Đấm) | 16 | +4 | Heavy Hit - Xoay né đòn Bang + Đấm nước nặng Jinbe (Hit stop 0.1s), nổ cột áp suất hất văng 10m. |
| **[THỦY LƯU - T1] Nhu Thần Lưu Thủy Kính (`D+^+A`)** | 4 | 60 (Dải nước xoay) | 10 | +4 | Bang Parry - Phản ngược 100% đạn bắn xa, luồn nách bẻ khớp chưởng lưng đập tường Badang. |
| **[THỦY LƯU - T1] Thủy Áp Pháo Đơn (`D+>+J`)** | 8 | 12 (Thôi quyền) | 14 | +2 | Mid Projectile - Đấm thôi quyền bắn tia nước áp suất 8m đẩy lùi quái nhỏ. |
| **[THỦY LƯU - T2] Gồng Tăng Áp Surge State (`Giữ D 1.2s`)** | 12 (I-frames) | 72 (Tụ thủy) | 14 | +6 | Power-Up Buff - Mọc vây nước Noelle, hồi phục 25% HP gánh chịu, giảm 65% dmg, lướt trượt né Bang Style. |
| **[THỦY LƯU - T2] Thủy Bích Trọng Trụy (`D+v+A`)** | 10 | 30 (Giam & Nện) | 16 | +5 | Command Grab - Bọc bong bóng nước nện sàn, nổ Vương Miện Nước (Splash Crown) làm ngã quái 6m. |
| **[THỦY LƯU - T2] Phá Hoại Sát Thủy Áp Pháo (`D+>+J`)** | 10 | 18 (Chuỗi võ thuật) | 16 | +5 | Martial Projectile - Chuỗi Jab-Elbow-Punch Akaza, phóng 3 vòng nén áp suất xuyên thấu 12m. |
| **[BẠCH HOÀNG] Combo Quyền Chấn Động (`white_attack_combo` / `A-A-A`)** | 4 | 18 (3 đòn Jab-Straight-Hook) | 10 | +3 | Close Quarters - 720ms (8 frames Aseprite), đấm sóng khí nén đẩy lùi 2m, phá thế thủ. |
| **[BẠCH HOÀNG] Toái Không Quyền (`white_spatial_shatter` / `D+>+A`)** | 6 | 8 (Đấm nứt không gian) | 16 | +6 (Guard Break) | Full Screen Shockwave - 667ms (8 frames Aseprite), kích hoạt nứt không gian và phát đạn tại frame 3 (muzzle 132, 80). |
| **[BẠCH HOÀNG - VFX] Đạn Quyền Khí (`vfx_rift_fist`)** | 3 (Spawn) | Loop travel (520ms) | — | Piercing (Xuyên Giáp) | Projectile Loop - Nắm đấm khí nén trắng bay sang phải (+X), xé rách không gian, nổ `vfx_spatial_break` khi va chạm. |
| **[BẠCH HOÀNG - VFX] Sóng Chấn Động (`vfx_seismic_wave`)** | 3 (Spawn) | Loop travel (560ms) | — | Wide Sweep (Quét Rộng) | Projectile Loop - Sóng áp suất lưỡi liềm bay sang phải (+X), xé không khí, nổ `vfx_spatial_break` khi va chạm. |
| **[BẠCH HOÀNG - VFX] Va Chạm Vỡ Không Gian (`vfx_spatial_break`)** | 1 | 8 frames (700ms) | — | Heavy Knockback | Impact Burst - Điểm nứt bung mạng vỡ và mảnh không gian tan đi, gây sát thương chấn động thứ cấp. |
| **[BẠCH HOÀNG] Khai Môn Khe Nứt (`white_rift_open` / `D+>+J` pha 1)** | 8 | 12 (Kéo rách không gian) | 14 | +4 | Spatial Tear - 1130ms (8 frames Aseprite), đấm nứt và xé màng không gian, spawn cổng tại frame 3, giữ cổng frame 5. |
| **[BẠCH HOÀNG - VFX] Cổng Không Gian (`vfx_spatial_gate`)** | 1 | 8 frames (880ms) | — | Traversable Portal | Portal Doorway - Cổng đứng viền bạch kim, lòng cổng alpha thật, spawn cách chân +36px (anchor 96, 132), lặp giữ pose 3-4. |
| **[BẠCH HOÀNG] Xuyên Hư Không Dịch Chuyển (`white_rift_step` / `D+>+J` pha 2)** | 4 | 8 (Tan biến & Xuất hiện) | 10 | +8 (I-frames) | Spatial Teleport - 940ms (8 frames Aseprite), I-frames tàn ảnh frame 4, chuyển root sang cổng ra trước frame 5. |
| **[BẠCH HOÀNG] Khuynh Đảo Càn Khôn (`white_atmospheric_tilt` / `D+v+J`)** | 16 | 25 (Kéo khí quyển) | 24 | +8 | Screen Tilt 15° - 1084ms (8 frames Aseprite), nghiêng màn hình và hút quái toàn sân về trước mặt tại frame 4. |
| **[BẠCH HOÀNG] Bách Thủ Toái Không (`white_cataclysm` / `D+^+A`)** | 1 (Invincible) | 300 (17 vòng liên quyền) | 40 | +16 (Bất tử) | Cataclysm AoE - 5684ms (64 frames Aseprite), bão quyền 60ms/frame, đại chưởng vỗ nát không gian frame 60. |
| **[BẠCH HOÀNG] Chấn Động Phóng Thích (`white_seismic_dispersion` / `D+^+J`)** | 8 | 12 (Xung kích 360°) | 16 | +4 | Dispersion Wave - 1110ms (8 frames Aseprite), sóng xung kích đẩy lùi frame 3, hồi về NormalJacket frame 7. |
| **[BẠCH HOÀNG] Chuyển Dạng Thủy / Lôi (`transform_white_water/lightning`)** | 6 | 16 (Dung hợp Flash) | 12 | +6 (I-frames) | Form Morph - 1350ms (8 frames Aseprite mỗi dạng), Flash Whiteout dung hợp 2 nguyên tố chuyển thành Bạch Hoàng. |

---

## 7. KẾ HOẠCH TÍCH HỢP CODE & SẢN XUẤT ASSETS TIẾP THEO

1. **State Machine & Form System (FSM C# trong Unity / Godot):**
   - Đăng ký cấu hình đa hình thái trong `Block_Forms.asset`: `Block_Lightning_Form.asset`, `Block_Water_Form.asset`, và `Block_White_Form.asset` kế thừa CharacterState.
   - Tạo các FSM State cho dạng Lôi Điện (Raikage / SSJ2):
     * `BlockLightningOverchargeCharge`: Quản lý thời gian gồng lực giữ phím `D`, hiệu ứng rung lắc đất đá bay lơ lửng.
     * `BlockLigerBombGrabAirSlam`: Quản lý cơ chế tóm mục tiêu, nhảy vọt lên không và nện cắm đầu xuống sàn.
     * `BlockSpinningThunderSmash`: Quản lý 3 vòng xoay đấm lôi bão 360 độ và cú nện búa sét dập đất.
     * `BlockGuillotineDrop`: Diễn hoạt nhảy lên không và giáng cú đá chẻ gót rìu sét OTG.
     * `BlockHellStabPiercing`: Quản lý nén ngón tay từ 4 xuống 1 ngón đâm xuyên thấu giáp.
   - Tạo các FSM State cho dạng Thủy Lưu (Jinbe & Bang Style):
     * `BlockWaterSurgeCharge`: Quản lý kích hoạt Surge State mọc vây nước Noelle Style.
     * `BlockFishmanKaratePunch`: Diễn hoạt xoay né đòn Bang Style kết hợp đòn đấm nước nặng Jinbe Style (Hit stop 0.1s + cột áp suất).
     * `BlockAkazaWaterShockwave`: Quản lý combo quyền cước kéo dài thành 3 vòng nén áp suất nước phóng thẳng.
     * `BlockOceanSlamSplashCrown`: Quản lý tóm mục tiêu, bọc quả cầu nước nện sàn bộc phát Splash Crown VFX.
     * `BlockBangWaterParry`: Quản lý dẫn hướng đòn đánh của địch, phản hồi đạn đạo và luồn nách bẻ khớp.
   - **Tạo các FSM State cho dạng Bạch Hoàng & Kỹ Năng Không Gian (White Ultimate & Spatial Skills):**
     * `BlockWhiteAttackCombo`: Quản lý chuỗi quyền cước chấn động khí nén 3 đòn phá vỡ giáp thủ (`white_attack_combo`).
     * `BlockWhiteSpatialShatter`: Quản lý đòn đấm vỡ không gian, trigger event nứt không gian tại frame 3 (`spatial_fracture_impact`) và phát projectile `vfx_rift_fist` hoặc `vfx_seismic_wave` tại muzzle `(132, 80)`.
     * `BlockWhiteRiftOpen`: Quản lý animation xé rách không gian, instantiate prefab `vfx_spatial_gate` tại offset `[+36, 0]` so với root chân nhân vật (anchor 96, 132).
     * `BlockWhiteRiftStep`: Quản lý animation bước vào cổng, kích hoạt I-frames tại frame 4 (`enter_rift_ghost`), thực thi `relocate_root_to_exit` chuyển root sang cổng ra trước frame 5 (`teleportBeforeLocalFrame0: 5`), kiểm tra raycast/navmesh để tránh lỗi xuyên lọt map hoặc kẹt góc tường.
     * `BlockWhiteAtmosphericTilt`: Kích hoạt Camera Matrix Tilt 15° và lực kéo hút quái toàn màn hình tại frame 4 (`atmospheric_pull_camera_tilt_15deg`).
     * `BlockWhiteCataclysm`: Quản lý chuỗi 17 chu kỳ lặp 3 pose liên quyền 60ms và cú vỗ Đại Phật Thủ nghiền nát không gian tại frame 60 (`giant_palms_clap`).
     * `BlockWhiteSeismicDispersion`: Kích hoạt sóng chấn động đẩy lùi 360° tại frame 3 (`seismic_ring_release`) và chuyển hóa State Machine về `NormalJacket` tại frame 7 (`return_NormalJacket`).
   - Script thực thi SO: `BlockFormCombatSO.cs`, `BlockWhiteCombatSO.cs` và `BlockSpatialRiftSO.cs` quản lý logic dịch chuyển cổng, offset spawn, kiểm tra va chạm tường và camera matrix tilt.

2. **Hệ Thống VFX & Hiện Trạng Sprite Assets 2D (Bộ Hoạt Họa Aseprite Đã Sản Xuất):**
   - Viết Shader *GrapheneHexMesh.shader*: Hiển thị đường vân tổ ong lục giác phát sáng trên da nhân vật khi kích hoạt Super Armor hoặc nhận đòn đánh.
   - **VFX Lôi Điện & Gồng Siêu Saiyan:**
     * *LightningOvercharge_Aura.shader*: Hào quang hoàng kim bùng cháy quanh cơ thể Block.
     * *BioElectricityArcing.prefab*: Particle System tạo hàng chục tia sét răng cưa màu vàng chanh và xanh neon liên tục phóng xẹt bôm bốp quanh cơ thể.
     * *LigerBomb_Crater.prefab*: Miệng hố thiên thạch sụp đổ mặt sàn bốc khói sét và lưu lại vùng từ trường điện tích giật tê liệt.
     * *GuillotineAxeSlash.prefab*: Vệt chém sét dọc xé rách sàn đấu.
   - **VFX Thủy Lưu (Jinbe, Bang, Akaza, Giyu, Noelle Style):**
     * *WaterSurgeFins.shader*: Cánh vây nước áp suất phát quang màu ngọc bích bồng bềnh sau lưng Block ở Surge State.
     * *WaterRibbons.prefab*: Dải lụa nước xanh uốn lượn mềm mại theo từng đường quyền cước dẫn lực.
     * *WaterCompressionRing.prefab*: 3 vòng nén sóng nước phẳng rít gào theo đường thẳng.
     * *SplashCrown_VFX.prefab*: Vương miện nước 360 độ nổ tung khi nện đất.
     * *FishmanImpact_Internal.prefab*: Sóng chấn động xuyên thấu nội tạng rung lắc camera cực mạnh.
   - **Bộ Asset 2D & VFX Bạch Hoàng Thánh Thể (Thư viện `Block_White_Ultimate_animations_v001`):**
     * **File Nhân Vật:** `Block_White_Ultimate.aseprite` (136 frames timeline, 10 main tags, 88 pose nguồn vẽ mới bằng Built-in ImageGen, canvas 192×160, root 96,132, palette White 48 màu):
       - `white_idle` (1–8 / 1140ms), `transform_white_water` (9–16 / 1350ms), `transform_white_lightning` (17–24 / 1350ms), `white_attack_combo` (25–32 / 720ms), `white_spatial_shatter` (33–40 / 667ms), `white_atmospheric_tilt` (41–48 / 1084ms), `white_cataclysm` (49–112 / 5684ms), `white_seismic_dispersion` (113–120 / 1110ms), `white_rift_open` (121–128 / 1130ms), `white_rift_step` (129–136 / 940ms).
     * **File VFX Không Gian:** `Block_White_Spatial_VFX.aseprite` (32 frames timeline, 4 main tags, 32 pose nguồn vẽ mới):
       - `vfx_spatial_gate` (1–8 / 880ms, pivot 96,132, lặp giữ pose 3–4, lòng cổng alpha thật 0/255).
       - `vfx_rift_fist` (9–16 / 520ms, pivot 96,80, đạn quyền khí bay hướng +X).
       - `vfx_seismic_wave` (17–24 / 560ms, pivot 96,80, đạn sóng áp suất bay hướng +X).
       - `vfx_spatial_break` (25–32 / 700ms, pivot 96,80, hiệu ứng nổ vỡ mảnh không gian khi va chạm).
     * **Tổng quy mô asset:** 168 frame timeline, 14 main tags, 120 pose nguồn vẽ mới.
     * **Quy chuẩn kỹ thuật Marker & Tích hợp Engine (SPATIAL_SKILLS.md & Manifest):**
       - **Cổng Hư Không:** Xuất hiện phía trước tâm chân Block khoảng `+36 px`; anchor VFX chân cổng `(96, 132)`. Giữ/lặp pose 3–4 (JSON, từ 0) trong game.
       - **Dịch chuyển Root:** Trong `white_rift_step`, pose 4 là trạng thái xuyên không gian (ghost); chuyển root nhân vật sang cổng ra trước pose 5 (`teleportBeforeLocalFrame0: 5`). Tránh dịch chuyển giật lùi theo offset chuyển động đã có sẵn trong sprite animation.
       - **Bắn Đạn Không Gian:** Projectile phát từ `white_spatial_shatter` ở pose 3 tại pixel `(132, 80)` trên canvas 192×160 hướng `+X`. Anchor root `(96, 80)`. Kết thúc travel khi trúng đích/vượt tầm; phát nổ `vfx_spatial_break` tại điểm va chạm.
       - **Kiểm thử trực quan đã xây dựng:** `preview.html` (offline scrubber cho nhân vật), `vfx-preview.html` (offline scrubber cho VFX), `spatial-demo.html` (demo tương tác đi xuyên 2 đầu cổng và projectile phá không gian).

3. **Sound Design (SFX):**
   - Thiết kế âm thanh Lôi Điện: Tiếng rít cao tần của dòng điện cao áp tích tụ khi gồng (High-voltage power hum); tiếng nổ giòn giã của các tia sét răng cưa giật bôm bốp; tiếng rít chém gió xé toạc âm thanh của đòn Lôi Ngược Thủy Bình và Lariat; tiếng nổ ầm ầm long trời lở đất khi nện Liger Bomb xuống sàn đá (Heavy Sub-bass slam).
   - Thiết kế âm thanh Thủy Lưu: Tiếng "ĐÙNG!" đanh thép nén áp suất của cú đấm Jinbe; tiếng xé gió êm dịu uốn lượn của dải nước Bang; tiếng rít xoáy nén của vòng áp suất Akaza; tiếng nước dội gầm thét như sóng thần vỡ bờ.
   - Thiết kế âm thanh Bạch Hoàng & Thao Túng Không Gian: Tiếng "Rắc! Rắc!" giòn giã mô phỏng không gian bị xé rách như kính cường lực vỡ; tiếng gầm hạ âm động đất đại chấn; tiếng xé toạc màng không gian đanh gọn khi mở khe nứt (`Spatial Tear SFX`); tiếng rít áp suất cao của đạn quyền khí bay xé gió (`Rift Fist Flight SFX`); tiếng nổ vỡ vụn tan biến của các mảnh không gian khi đạn va chạm (`Spatial Break Explosion`); tiếng từ trường rung trầm ngân vang duy trì quanh miệng cổng hư không (`Void Portal Ambience`).

