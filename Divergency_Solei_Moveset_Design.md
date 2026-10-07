# DIVERGENCY: THIẾT KẾ MOVE SET, NGUYÊN TỐ GIÓ & HỆ THỐNG KỸ NĂNG SOLEI (THE ZEPHYR RUNNER)

> **Tài liệu tham chiếu:** Hệ thống chiến đấu *Tactical Brawler (LF2 style + AI Command System)*, Cốt truyện chính *Divergency*, và Dữ liệu trích xuất từ source Unity (`moveset-description-Characters/Solei`).  
> **Áp dụng cho:** Thiết kế Gameplay Mechanics, Lập trình Trạng thái Nhân vật (State Machine), Họa sĩ Sprite/Animation 2D, Thiết kế VFX/SFX và Tác giả Kịch bản Combat Synergy.

---

## 1. ĐỊNH VỊ NHÂN VẬT & TRIẾT LÝ THIẾT KẾ (CHARACTER PHILOSOPHY)

### 1.1. Thân thế, Tinh thần & Bản ngã của "Ngọn Gió Tự Do"
* **Danh tính:** **Solei** — Biệt danh: *"The Swift Runner"* (Ngọn gió thành Marseille / Cánh chim tự do của Bastonne).
* **Nguồn cội & Tâm lý:** 
  * Cháu gái của Deep, mang dòng máu lai Á – Âu (mẹ gốc Á, thừa hưởng nét thanh thoát và võ công khinh linh phương Đông; lớn lên tại thành cảng Marseille ngập tràn gió biển).
  * Trong một thế giới đổ nát bị giam cầm bởi định kiến, chiến tranh và các thế lực tà thần, Solei luôn mang trong mình nỗi bất an của tuổi trẻ: cảm giác lạc lõng, hoang mang về căn cước và vị trí của mình giữa tập thể những chiến binh dạn dày sẹo mổ (Deep, Jamerson, Block).
  * Nhưng chính khi **chạy** và **chuyển động**, mọi nghi ngại tan biến. Chuyển động với Solei là bản ngã, là sự giải thoát thuần khiết nhất.
* **Tuyên ngôn chiến đấu:** 
  > *"I'm still young. I still doubt. But when I run, I know exactly who I am."*  
  > *(Tôi còn trẻ. Tôi vẫn còn hoài nghi. Nhưng khi đôi chân này chạy, tôi biết chính xác mình là ai.)*
* **Phong cách chiến đấu:** **High-Speed Aerial Duelist / Lane Drifter / Crowd Disrupter**.
  * Tương phản hoàn toàn với **Block** (nặng nề, vững chãi, đấm nứt không gian) và **Deep** (trực diện, uy lực cự kiếm), Solei là hiện thân của **Tốc độ, Sự nhẹ nhõm và Khả năng kiểm soát không trung**.
  * Lối đánh lấy cước pháp liên hoàn làm trọng tâm (kết hợp nhịp điệu uyển chuyển của Capoeira, sự bùng nổ của Taekwondo và sự phóng khoáng của Parkour đường phố).

---

### 1.2. Tại Sao Nguyên Tố Gió (Zephyr Element) Là Mảnh Ghép Hoàn Hảo Cho Solei?

Ý tưởng đưa **Nguyên tố Gió (Aero/Zephyr)** vào Solei không chỉ hợp cảm giác trực quan ("nhẹ, nhanh, lướt trên không, chim gió") mà còn **trùng khớp 100% với nền tảng asset và logic đã có sẵn trong source Unity**:

1. **Hệ thống tên chiêu hiện hữu:** Toàn bộ bộ chiêu đã đăng ký trong engine đều gắn liền với gió lốc: `Gale Rush` (Gió lốc áp sát), `Backlash` (Bật lùi lướt gió), `Bloodwing` (Khai phóng cánh chim), `Storm Eye` (Mắt bão xoay), `Gale Drift` (Lướt bão điều hướng), `Gale Dance` (Vũ điệu cuồng phong), `Hyperstorm` (Cực bão xoay).
2. **Kho Visual Assets & VFX thực tế:**
   * Clip và prefab `Solei_bird.prefab` cùng `bird_fly_projectil` trong `solei_EF.asset` chứng minh tạo hình **Chim (Raptor / Falcon)** đã là DNA thiết kế gốc của nhân vật.
   * Hiệu ứng bão gió `Solei_tornato_group.aseprite` (21 sprite xoay), `ef_Solei_tornato_hit.aseprite` (bụi đất lốc xoáy, vệt chém xoay) đã sẵn sàng trong project.
   * Hoạt ảnh đá bay lướt `multi_kick_lowfly.aseprite` và bộ động tác nhảy 2 nhịp `PunnyJump1`, `DoubleJump2`, `Air` là mảnh đất vàng để mở khóa cơ chế **"Chạy / Lướt trên không"**.

---

### 1.3. Ngôn Ngữ Mỹ Thuật & Visual Bible (Art & Animation Bible)

```
        ┌─────────────────────────────────────────────────────────────┐
        │              SILHOUETTE CỐT LÕI: PHONG NỮ KHINH LINH         │
        │  - Thân hình mảnh mai, dẻo dai, vạt áo & dải băng bay vút  │
        │  - Đôi bốt bọc hợp kim nhẹ trợ lực phóng khí nén           │
        │  - VFX gió: Xanh ngọc lam (Turquoise / Teal) đan xen bạc   │
        │  - Biểu tượng linh thú: Chim ưng gió (Peregrine Falcon)     │
        └─────────────────────────────────────────────────────────────┘
```

| Yếu tố tạo hình | Diễn hoạt Sprite & Assets | Hiệu ứng hình ảnh (VFX) | Âm thanh (SFX) |
| :--- | :--- | :--- | :--- |
| **Dáng đứng (Idle & Move)** | Thân người nhấp nhô nhịp nhàng theo bước nhảy thể thao; mũi chân tiếp đất nhẹ như không trọng lượng. | Bụi gió cuộn nhẹ quanh gót chân mỗi khi đổi trụ; tà áo và dải buộc tóc bay phất phơ. | Tiếng gió rít khẽ luồn qua kẽ vải, tiếng bước chân thanh thoát lách tách. |
| **Bộ pháp lướt (Gale Run / Dash)** | Nghiêng mình lao về phía trước, tàn ảnh để lại phía sau như bị gió cuốn. | Vệt khí động học hình nón trắng bạc mỏng bao quanh cơ thể, tàn ảnh màu xanh ngọc lam (Teal After-image). | Tiếng rít siêu thanh (Sonic slipstream), tiếng không khí bị xé toạc rào rào. |
| **Chạy trên không (Sky Stride / Air Run)** | Solei đạp liên tiếp vào các tầng không khí, hai tay mở rộng giữ thăng bằng như chim sải cánh. | Mỗi bước chân đạp ra một vòng sóng xung kích khí nén tròn xoe (Air Ripple Ring) lơ lửng rồi tan biến. | Tiếng "Póp! Póp!" nén khí thanh thoát, tiếng cánh chim vỗ mạnh giữa không trung. |
| **Phong Điểu Cước (Falcon Projectile)** | Vung chân vẽ một đường cung 180 độ; từ gót chân bộc phát một chú chim ưng gió vút thẳng. | Chú chim cấu tạo từ dòng xoáy khí nén ngọc lam viền sáng trắng bạc, sải cánh xòe lông vũ phát quang. | Tiếng chim ưng réo vang sắc nhọn (Falcon screech) hòa lẫn tiếng gió rít dồn dập. |
| **Cơn Lốc Xoáy (Tornado Spin)** | Xoay tròn người theo trục thẳng đứng, hai chân quét ngang tạo vòng bão khép kín. | Lốc xoáy mini màu ngọc lam bao bọc lấy Solei, cuốn bụi đất và lá cây/mảnh vỡ sàn nhà bay lên cao. | Tiếng tuabin gió gầm rú dồn dập, tiếng va đập "vút vút vút" liên hồi. |

---

## 2. BA CƠ CHẾ NỘI TẠI NGUYÊN TỐ GIÓ ĐỘC BẢN

```
                        ┌───────────────────────────────┐
                        │      ÁP SUẤT KHÍ LƯU          │
                        │    (Aero Velocity Flow)       │
                        │ Tích tầng tốc độ & lực gió    │
                        └──────────────┬────────────────┘
                                       │
                 ┌─────────────────────┴─────────────────────┐
                 ▼                                           ▼
  ┌─────────────────────────────┐             ┌─────────────────────────────┐
  │   PHONG BỘ (SKY STRIDE)     │             │ PHONG ĐIỂU (ZEPHYR FALCON)  │
  │ • Chạy / Lướt trên không    │             │ • Đạn chim gió quét đường   │
  │ • Chuyển trục Z tự do       │             │ • Hành lang tăng tốc đồng đội│
  │ • Hủy hoạt ảnh rơi tự do    │             │ • Đẩy lùi & mở góc combat   │
  └─────────────────────────────┘             └─────────────────────────────┘
```

### 2.1. Phong Bộ — Chạy & Lướt Trên Không (Sky Stride / Air-Run)
* **Nguyên lý cơ học:** Bốt chiến đấu của Solei kết hợp năng lực phong nguyên tố nén áp suất không khí ngay dưới lòng bàn chân, tạo thành điểm tựa chân không tức thời giữa bầu trời.
* **Cơ chế vận hành:**
  * **Air Sprint (Chạy trên không):** Khi đang ở trạng thái nhảy (`Jump_High` hoặc `Jump_Low`), bấm đúp hướng tiến `>>` hoặc giữ nút chạy `Run`: Solei sẽ không rơi xuống ngay mà bước chạy thẳng trên không trung trong cự ly ngắn (tối đa 1.2 giây).
  * **Z-Axis Air Drift (Lướt chuyển làn trên không):** Cho phép bấm `Up` / `Down` trong lúc đang chạy trên không để trượt chéo làn đường theo trục Z. Đây là lợi thế cực kỳ độc tôn trong hệ game LF2, giúp Solei thoát khỏi mọi bẫy đòn thẳng hàng của đối thủ hoặc vòng ra sau lưng boss.
  * **Aerial Cancel:** Bất kỳ đòn đá trên không (`Attack_Jump`) nào chạm trúng địch đều cho phép bấm `Jump` để đạp bật ngược ra sau (Backlash) hoặc đạp khí bồi thêm một nhịp lướt không cần chạm đất.

### 2.2. Áp Suất Khí Lưu (Aero Velocity Stacks)
* **Tích tầng:** Mỗi đòn đá trúng mục tiêu (trong chuỗi `Gale Rush`, `Gale Dance`) tích lũy 1 tầng **Áp Suất Khí Lưu** (tối đa 5 tầng).
* **Hiệu ứng:**
  * Ở 5 tầng, toàn thân Solei bao phủ luồng gió xoáy ngọc lam: Tốc độ di chuyển tăng 25%, tốc độ ra đòn tăng 15%.
  * Cường hóa đòn kết thúc: Đòn kết thúc của `Gale Dance` (`Solei_Combat_kick_fly`) hoặc `Solei_Combat_solei_tornator` sẽ bung ra một luồng bão gió đẩy lùi hoặc hất tung toàn bộ kẻ địch xung quanh với bán kính rộng gấp đôi.

### 2.3. Linh Hồn Phong Điểu (The Zephyr Falcon)
* **Nguyên lý:** Thay vì chỉ là một đường đạn vô tri, chim gió của Solei mang đặc tính khí động học:
  * **Đường bay quét làn (Curved Trajectory):** Chim gió có thể uốn lượn nhẹ theo hướng điều khiển của người chơi (hơi chúc lên hoặc chúi xuống trục Z).
  * **Hành lang gió (Wind Slipstream):** Vệt đường bay mà chim gió đi qua tạo thành một đường hầm khí động trong 3 giây. Bất kỳ ai trong đội (Deep, Block, Stranger, Solei) chạy trên đường hầm này đều nhận **+35% Tốc độ di chuyển** và giảm tiêu hao thể lực/mana.

---

## 3. THIẾT KẾ CHI TIẾT BỘ CHIÊU THỨC (FULL MOVESET SPECIFICATION)

### 3.1. Đòn Đánh Cơ Bản & Không Chiến (Normals & Aerials)

| Đòn đánh / Input | Hoạt ảnh Sprite | Mô tả hành động & Tác động | Hiệu ứng Gió & Hitbox |
| :--- | :--- | :--- | :--- |
| **Chuỗi đòn đất** (`A -> A -> A`) | `Attack1` (9 cel) -> `Attack2` (6 cel) -> `AttackRun` (4 cel) | Cú đá quét thấp -> đá móc ngang sườn -> cú đá xoay vòng hất tung đối thủ lên không. | Gió xoáy quấn quanh mắt cá chân; cú đá thứ 3 tạo luồng khí đẩy địch bay cao một góc 60 độ. |
| **Đá lướt chạy** (`Run + A`) | `AttackRun` | Solei xoay người trượt dài trên mặt sàn, hai chân quét hình chiếc kéo. | Vệt gió cọ xát mặt sàn bắn tia sáng ngọc lam; hất ngã mọi kẻ địch cản đường. |
| **Không chiến cơ bản** (`Jump + A`) | `Attack_Jump` (11 cel) | Tung 2 cú đá liên tiếp trên không, giữ Solei lơ lửng nhẹ trong thời gian ra đòn. | Cắt ngang không khí tạo 2 lưỡi dao gió chân không (Vacuum blades). |
| **Gót Cước Giáng Trần** (`Air + Down + A`) | `Air -> Land` | Từ trên không gập người giáng gót cước sấm sét thẳng đứng xuống đất. | Gây chấn động khí nén khi tiếp đất (Air Burst), hất văng địch xung quanh và kích hoạt tiếp đất an toàn. |

---

### 3.2. Bốn Ô Kỹ Năng Mặc Định (Default 4-Skill Loadout)

#### [Slot DUA] — Mắt Bão Cuồng Nộ (Storm Eye — Skill_5 / State 48)
* **Input:** `Defense + Up + Attack`
* **Mana tiêu hao:** 25 MP
* **Asset tham chiếu:** `Spin_Stationary.asset`, `Solei_Combat_solei_tornator` (21 cel), `Solei_tornato_group.aseprite`.
* **Cơ chế hoạt động:**
  * Solei xoay tròn thân mình với tốc độ kinh hoàng, biến bản thân thành tâm điểm của một cơn lốc xoáy màu ngọc lam.
  * **Lực hút chân không (Micro-Vacuum):** Kẻ địch trong phạm vi gần bị cuốn giật vào tâm bão, nhận sát thương liên hoàn đa đoạn (6 damage raw x 16 hit).
  * **Kháng đòn tầm xa:** Vòng xoáy gió làm chệch hướng toàn bộ tên bắn và đạn nhỏ của kẻ địch bắn vào.
  * **Tùy biến:** Giữ nút hướng để di chuyển lốc xoáy lướt đi săn lùng mục tiêu (tích hợp cơ chế của `Gale Drift`).

#### [Slot DUJ] — Phong Hành Lướt / Chạy Trên Không (Gale Drift & Sky Stride — Skill_6 / State 49)
* **Input:** `Defense + Up + Jump`
* **Mana tiêu hao:** 15 MP
* **Asset tham chiếu:** `Spin_Moving.asset`, `Solei_Sprite.asset` (`Air`, `Run`).
* **Cơ chế hoạt động:**
  * **Khi dùng dưới đất:** Solei bọc luồng gió quanh người, lướt siêu tốc xuyên qua đội hình địch (Phase Dash), không bị va chạm vật lý cản trở.
  * **Khi dùng trên không:** Kích hoạt **Phong Bộ (Sky Stride)**: Solei chạy lướt trên không trung 3 bước sải dài, tự do đổi làn Z để né đòn hoặc tiếp cận đối thủ từ góc chết trên cao.

#### [Slot DDA] — Vũ Điệu Cuồng Phong (Gale Dance — Skill_7 / State 50)
* **Input:** `Defense + Down + Attack` (Nối chuỗi: `A -> A -> J`)
* **Mana tiêu hao:** 25 MP (chỉ tiêu hao ở đòn mở đầu)
* **Asset tham chiếu:** `Solei_Combat_kick_1/2/3/fly` (chuỗi 4 state, tổng 88 cel), `multi_kick_lowfly.aseprite`.
* **Cơ chế hoạt động:**
  * **Đoạn 1 (`Kick_1` - Nhấn `A`):** 3 cú đá chớp nhoáng tại chỗ giam chân đối phương.
  * **Đoạn 2 (`Kick_2` - Nhấn `A` tiếp):** Xoay người tung 3 cú đá vòng cung bọc gió nén, dồn ép đối thủ lùi sát rìa.
  * **Đoạn 3 (`Kick_3` - Nhấn `A` tiếp):** Cú đá móc đẩy mục tiêu khựng lại trong trạng thái lơ lửng.
  * **Finisher Đoạn 4 (`Kick_Fly` - Nhấn `J`):** Solei phóng mình lướt theo luồng gió ngang qua người đối thủ, tung cú đá bay xé gió kết liễu hất tung kẻ địch văng xa cả màn hình.

#### [Slot DDJ] — Vũ Điệu Chuyền Mồi (Falcon Relay Kick — Skill_8 / State 51)
* **Input:** `Defense + Down + Jump` (Nối chuỗi: `A -> A -> J`)
* **Asset tham chiếu:** `Relay_Kick_1/2/3/Fly.asset`, `SoleiRelayKickSO.cs`.
* **Cơ chế hoạt động:**
  * Kế thừa toàn bộ chuỗi cước của Gale Dance nhưng biến cú đá kết thành **đòn phối hợp chiến thuật bọc gió**.
  * Thay vì đá văng tự do, cú đá cuối bọc một quả cầu gió chân không quanh nạn nhân, biến kẻ địch thành "quả bóng mồi" bị phóng theo quỹ đạo cầu vồng thẳng tới vị trí của đồng đội gần nhất (Deep hoặc Block).
  * Khi nạn nhân bay tới vị trí đồng đội, đồng đội AI sẽ tự động kích hoạt đòn đánh đón đầu (Deep chém xẻ đôi, Block tung đấm nứt không gian) tạo ra combo Synergy hoàn hảo.

---

### 3.3. Kỹ Năng Mở Rộng & Tuyệt Chiêu Phong Điểu

#### [Kỹ Năng Độc Quyền] — Phong Điểu Kích / Cánh Cú Săn Mồi (Peregrine Gale / Bloodwing Reborn — Skill_3 / State 46)
* **Input:** `Defense + Forward + Attack` (`DFA`)
* **Asset tham chiếu:** `Solei_Sk3.asset`, `Sk3_HoldKick` (17 cel), `Solei_bird.prefab`, `solei_EF.asset / bird_fly_projectil`.
* **Mô tả hành động:**
  * Solei trụ chân trái, gập người tung cú đá quét hình bán nguyệt hướng thẳng lên trời.
  * Tại cel 13, từ mũi chân bùng nổ một **Linh Hồn Chim Ưng Gió (Zephyr Falcon)** sải cánh dài 1.5m bay vút về phía trước với vận tốc 400 pixel/s.
* **Đặc tính tương tác:**
  * Chim ưng đâm xuyên mục tiêu đầu tiên, đẩy lùi kẻ địch về phía sau và phát nổ thành sóng xung kích gió hất ngã hàng loạt quái nhỏ.
  * Để lại vệt khí lưu tăng 35% tốc chạy cho toàn đội.
  * **Biến thể Aerial Falcon:** Nếu dùng chiêu này trên không trung, chim ưng sẽ lao chúc chéo xuống đất một góc 45 độ, phát nổ hất tung kẻ địch lên trời để Solei tiếp đất an toàn.

#### [Tuyệt Kỹ Tối Thượng] — Siêu Bão Cuồng Nộ (Hyperstorm — Skill_4 / State 47)
* **Input:** `Defense + Forward + Jump` (`DFJ`) hoặc Kích hoạt Nộ khí khi đủ 100 Mana.
* **Asset tham chiếu:** `Solei_Sk4.asset`, `Sk4_HyperStorm` (48 cel).
* **Mô tả hành động:**
  * Solei bộc phát toàn bộ phong nguyên tố, biến thành một cơn cuồng phong siêu bão di động.
  * Cô lướt qua lại 5 lần giữa các hàng kẻ địch với tốc độ ánh sáng, để lại hàng chục tàn ảnh đá liên hoàn.
  * Kết thúc bằng cú lộn nhào vút lên tận đỉnh bão và giáng gót cước khổng lồ xuống tâm chấn, tạo ra cột lốc xoáy khổng lồ quét sạch toàn bộ sàn đấu.

---

## 4. CHIẾN THUẬT KẾT HỢP ĐỒNG ĐỘI (TEAM SYNERGY CHOREOGRAPHY)

```
        ┌─────────────────────────────────────────────────────────────┐
        │                 TAM GIÁC CHIẾN THUẬT KINH ĐIỂN              │
        │                                                             │
        │                       [ SOLEI ]                             │
        │                     (Phong / Tốc Độ)                        │
        │                       /          \                          │
        │         Gió Đẩy Mồi  /            \ Lốc Xoáy Hút Quái       │
        │                     ▼              ▼                        │
        │               [ BLOCK ] --------> [ DEEP ]                  │
        │            (Vajra / Hút)  Gom Lại  (Cự Kiếm / Trảm)        │
        └─────────────────────────────────────────────────────────────┘
```

### 4.1. Combo Solei × Block: "Cơn Bão Kim Cương" (Vajra Tempest)
* **Bước 1 (Block gom quái):** Block dùng *Vòng Xoáy Hấp Dẫn (Graphene Singularity)* hút gom toàn bộ quái trong bán kính 8m lại trước ngực.
* **Bước 2 (Solei thả bão):** Solei lướt vào giữa tâm đám đông vừa bị hút gom, kích hoạt ngay `Storm Eye` (Mắt Bão). Toàn bộ quái bị xoay tít trong lốc ngọc lam, không thể phản kháng.
* **Bước 3 (Chuyền Mồi & Đấm Nứt Không Gian):** Solei kết thúc chuỗi bằng cú đá `Chuyền Mồi` đẩy con quái trâu bò nhất bay thẳng về phía Block. Block đã tích tụ đủ lực tung ra cú **Đấm Nứt Không Gian (Spatial Shatter Punch)** đập nát mục tiêu găm thẳng vào vách tường!

### 4.2. Combo Solei × Deep: "Phong Lôi Kiếm Vũ" (Tempest Blade Dance)
* **Bước 1 (Solei hất tung):** Solei phóng `Phong Điểu Kích` đẩy lùi đàn lính khiên, sau đó lướt không `Sky Stride` tung cú đá bay hất boss bay bổng lên không trung.
* **Bước 2 (Deep chém trảm trên không):** Deep nhìn thấy mục tiêu bị lơ lửng, lập tức tung đòn nhảy chém rực lửa/sấm sét bổ đôi con mồi từ trên cao cắm phập xuống sàn đấu.
* **Bước 3 (Hành lang tăng tốc):** Vệt gió chim ưng của Solei giúp Deep (vốn nặng nề, di chuyển chậm) lao vào áp sát đội hình tàn dư với tốc độ tăng thêm 35%.

### 4.3. Combo Solei × Stranger: "Cơn Lốc Tiếp Vận" (Slipstream Supply)
* **Bước 1 (Stranger thả trạm):** Stranger tháo ba lô tạo thành trạm hậu cần dã chiến trên sàn đấu.
* **Bước 2 (Solei càn quét bảo vệ):** Lũ quái lao vào phá ba lô liền bị Solei dùng `Gale Drift` lướt vòng tròn tạo rào cản bão gió đẩy lùi mọi hiểm họa xung quanh trạm.
* **Bước 3 (Tiếp viện siêu tốc):** Solei lướt gió nhặt nhanh các bình khí/đạn dược từ túi Stranger và ném phân phối ngay cho Deep và Block ở tiền tuyến mà không mất một giây trễ nhịp nào.

---

## 5. BẢNG TỔNG HỢP ÁNH XẠ KỸ THUẬT (UNITY ASSET & LOGIC MAPPING)

Dành cho lập trình viên State Machine và Combat Designer khi triển khai vào dự án:

| Tên Logic / Skill Name | Input Code | StateType | Script Logic SO | Visual Sprite Asset | Prefab / Effect |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gale Rush** | Command/Combo | 44 | `Solei_Sk1SO.cs` | `Solei_Base_Attack.aseprite` | `ef_Solei_tornato_hit` |
| **Backlash** | Command/Combo | 45 | `Solei_Sk2SO.cs` | `Solei_1.aseprite` | `ef_kickdef` |
| **Bloodwing / Phong Điểu** | DFA / Skill_3 | 46 | `Solei_Sk3SO.cs` | `Solei_HoldKick 1.aseprite` | `Solei_bird.prefab` + `bird_fly_projectil` |
| **Hyperstorm** | DFJ / Ultimate | 47 | `Solei_Sk4SO.cs` | `multi_kick_lowfly.aseprite` | `ef_tornator_dust_ground` |
| **Storm Eye** | DUA | 48 | `SoleiCombatSO.cs` | `Solei_tornato_group.aseprite` | `ef_tornator_spin` |
| **Gale Drift & Sky Stride** | DUJ | 49 | `SoleiCombatSO.cs` | `multi_kick_lowfly.aseprite` | `ef_kick_hit` |
| **Gale Dance** | DDA (`A->A->J`) | 50 | `SoleiCombatSO.cs` | `multi_kick_lowfly.aseprite` | `ef_Solei_tornato_hit` |
| **Chuyền Mồi (Relay)** | DDJ (`A->A->J`) | 51 | `SoleiRelayKickSO.cs` | `multi_kick_lowfly.aseprite` | Quỹ đạo Server Relay Vector |

---

## 6. KẾT LUẬN & ĐÁNH GIÁ THIẾT KẾ

1. **Tính khả thi cực cao:** Toàn bộ ý tưởng gió, chim săn mồi và cước pháp không gian đều **được xây dựng trực tiếp trên các tài sản mỹ thuật và mã nguồn có thật** tại `G:\...\Solei`, không yêu cầu vẽ lại toàn bộ nhân vật từ đầu mà chỉ tối ưu và mở khóa các hook đã lập trình sẵn.
2. **Cảm giác gameplay sống động (Juiciness):** Cơ chế "Chạy trên không" và "Lướt đổi trục Z" biến Solei thành nhân vật cơ động bậc nhất Divergency, đối trọng hoàn mỹ với chất nặng đô của Block và Deep.
3. **Bản sắc cốt truyện sâu sắc:** Ngọn gió tự do chính là tuyên ngôn thoát khỏi xiềng xích của Solei — biến cô từ một thiếu nữ trẻ hoang mang về căn cước thành đôi cánh chở che, người dẫn đường lộng gió cho toàn đội tiến vào Cõi Mộng.
