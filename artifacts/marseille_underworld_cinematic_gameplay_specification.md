# 🎬 ĐẶC TẢ ĐIỆN ẢNH & LỐI CHƠI: THẾ GIỚI NGẦM LAUNDEL & ĐẠI CHIẾN BẾN CẢNG
> **Dự án:** *Divergency / LF Revive*  
> **Chương:** Chapter 0 (Bastonne) ➔ Chapter 1 (Marseille & Thế giới ngầm Laundel) ➔ Stage 1-3 (Bến Cảng Hoàng Hôn)  
> **Ngày cập nhật:** 15/10/2026  

---

## 1. TỔNG QUAN HỆ THỐNG 4 THẾ LỰC & SPRITE MAPPING

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              1. QUÂN CHÍNH QUY BASTONNE                                │
│  • Chỉ huy: Cai ngục trưởng Jameson (jam_son.png) - Đã rút về cố thủ ngầm tại MuCEM    │
│  • Lực lượng: Đao phủ khổng lồ Gilles (Torturer.gif), Lính súng (GunSoilder.aseprite)   │
│  • Vai trò: Buôn lậu tủy đột biến & điều hành Tàu ngầm nghiên cứu ngụy trang dưới MuCEM│
└───────────────────────────┬────────────────────────────────┬───────────────────────────┘
                            │ Giao dịch vũ khí lậu bị nổ      │ Xả hóa chất & phế thải
                            ▼                                ▼
┌─────────────────────────────────────────┐    ┌─────────────────────────────────────────┐
│     2. BĂNG TAY SÚNG THUÊ MARSEILLE     │    │   3. DÂN CỐNG BIẾN DỊ "LES ÉCLOS"       │
│ • Thủ lĩnh: Bruno Valette (bro_big_gun) │    │ • Đại diện: Quái Hoa Nhụy (mutan_flower)│
│ • Cận vệ: Antoine (bro_2), Luc (bro_3)  │    │ • Kẻ Cào Rách: mutan_leaf.png           │
│ • VAI TRÒ CẢNG: Đấu 1v1 ➔ Rút về MuCEM  │    │ • Động cơ: Tôn Stranger là Thể Nguyên   │
│ • HÓA SNAKE BOSS: Tại MuCEM Lab (Stage4)│    │   Bản, phát điên do bị xả clo thiêu đốt │
└───────────────────────────┬─────────────┘    └─────────────┬───────────────────────────┘
                            │ Thù hận chia chác địa bàn       │
                            ▼                                 ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         4. BĂNG BỐ GIÀ ÁO ĐEN LAUNDEL (DON MALO)                       │
│ • Bố Già: Don Hector "Big MM" Malo (Big_MM.png) - Áo dạ đen, gậy baton bọc thép       │
│ • HÓA THÀNH BOSS CẢNG: BỌ HUNG THIẾT GIÁP (Stag-Beetle Titan - Big_MM_trans.png)      │
│ • Động cơ: Độc quyền chợ ngầm & cảng biển, thủ sẵn huyết thanh Chitin trong túi áo    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. NGUỒN GỐC "LÔ HÀNG" BASTONNE & MỐI THÙ CHƯƠNG 0

### "Lô hàng" bị nổ tung ở bến nước ngoài khơi Bastonne là gì?
Thế giới tưởng Bastonne là nhà tù bất khả xâm phạm, nhưng thực chất Cai ngục trưởng Jameson (`jam_son.png`) đang điều hành một đường dây buôn lậu hai chiều khổng lồ:
1. **Chiều vào Bastonne (Bruno vận chuyển):** Lô vũ khí quân sự lậu hạng nặng từ các tàu hàng Địa Trung Hải (súng máy drum-mag, đạn xuyên giáp, chất nổ dẻo) cấp cho đội tử sĩ bí mật của Jameson.
2. **Chiều ra thế giới ngầm (Jameson chi trả):** 
   - **3 vali Huyết Mẫu Ký Sinh Thô (Raw Chimera Extracts):** Dịch tủy sống rút trộm từ các tù nhân đột biến (trong đó có mẫu tế bào của Stranger/Ghost). Đây là thứ "vàng đen" mà Don Malo và các tài phiệt chợ đen sẵn sàng trả hàng triệu Francs để nghiên cứu thuốc trường sinh.
   - **Rương vàng thỏi 5 vạn Francs** tiền cọc.

### Biến cố đêm bão (Chapter 0 Escape):
* Khi đội Deep phá ngục, Tulas điều khiển sóng biển nhấn chìm bến tàu, Mark bắn đạn lửa xuyên thủng kho dầu xà lan.
* Cột lửa nuốt chửng chiếc xà lan chở hàng. 3 vali Huyết Mẫu và toàn bộ tiền vàng chìm sâu xuống đáy biển!
* **Bruno Valette** sống sót ngoi lên bờ nhưng trắng tay, mất danh dự và bị Jameson quỵt nợ. Bruno biết Jameson đang rút về cứ điểm MuCEM, nên mai phục sẵn tại Hangar J4 để đón đầu.

---

## 3. THIẾT KẾ ĐẶC TẢ LỐI CHƠI: CẤU TRÚC BOSS 2 TẦNG (STAGE 1-3 & STAGE 1-4)

Nhằm giữ tính chân thực, căng thẳng và phân tầng cảm xúc cho toàn bộ Chương 1, cuộc đối đầu được phân bổ hợp lý giữa hai màn chơi:
* **Stage 1-3 (Cầu Cảng Hoàng Hôn):** Đấu tay đôi 1v1 giang hồ với **Bruno Valette** (Dạng Người) ➔ Đại hỗn chiến 4 phe khi Quái Hoa trào lên ➔ Trùm biến dị độc tôn: **Don Hector Malo ➔ STAG-BEETLE TITAN** (`Big_MM_trans.png`).
* **Stage 1-4 (MuCEM Submarine Lab):** Bruno Valette rút chạy vào MuCEM gặp Jameson; khi bị dồn vào đường cùng trong phòng thí nghiệm đáy biển, Bruno mới cắn nắp ống huyết thanh Vector Viper biến thành **SNAKE BOSS** (`Snake_boss.png`)!

```
[Stage 1-3: Cầu Cảng Hangar J4]
┌─────────────────────────────────┐      ┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│ PHASE 1: ĐẤU TAY ĐÔI 1 VS 1     │ ───► │ PHASE 2: ĐẠI HỖN CHIẾN 4 PHE    │ ───► │ PHASE 3: STAG-BEETLE TITAN BOSS │
│ Deep vs Bruno (Luật bến bãi)    │      │ MuCEM xả clo, Quái Hoa trào dâng│      │ Don Malo tự chích Huyết Chitin  │
│ Quyết đấu võ thuật & súng ngắn  │      │ Bruno ném bom khói rút sang MuCEM│     │ Trùm Bọ Hung khổng lồ 24,000 HP │
└─────────────────────────────────┘      └─────────────────────────────────┘      └─────────────────────────────────┘

[Stage 1-4: MuCEM Submarine Lab - Tầng Đáy Biển]
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ BOSS CLIMAX STAGE 1-4: BRUNO VALETTE HÓA SNAKE BOSS (Snake_boss.png)                                      │
│ Bị dồn vào phòng áp suất tàu ngầm, Bruno nuốt trọn huyết thanh biến dị xà vương quyết tử chiến!          │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### BOSS STAGE 1-3: DON HECTOR "BIG MM" MALO ➔ STAG-BEETLE TITAN

Don Malo vốn đã **thủ sẵn ống Huyết thanh Chitin trong túi áo dạ** (Jameson đưa trước làm tiền cọc mua mạng Stranger). Khi bầy quái hoa tràn lên cắn nát đoàn xe và xé xác đàn em, lão già 70 tuổi tuyệt vọng tự cắm kim tiêm vào động mạch cổ!

| Chỉ số & Kỹ năng | Dạng Người Bố Già (`Big_MM.png`) | Dạng Biến Dị Stag-Beetle Titan (`Big_MM_trans.png`) |
| :--- | :--- | :--- |
| **Máu (HP)** | 8,000 HP | 24,000 HP (Lớp mai Chitin giảm 40% sát thương vật lý) |
| **Tốc độ** | Chậm (0.8x), thế đứng vững chãi | Nặng nề nhưng bộc phát (1.1x), mỗi bước dậm rung lắc camera |
| **Kỹ năng 1** | **Baton Smash:** Vung gậy thép quét bán nguyệt, gây choáng 1.5s. | **Sừng Kìm Nghiền Nát (Pincer Crush):** Cặp sừng kẹp dài 3m ngoạm lấy người chơi, quật 3 lần xuống sàn bê tông. |
| **Kỹ năng 2** | **Lệnh Bảo Kê:** Huýt sáo gọi 4 đàn em Áo Đen vung mã tấu lao vào. | **Thiết Giáp Địa Chấn (Earthquake Slam):** Nhảy lên cao và dập mạnh 6 chân bọ xuống sàn, tạo sóng xung kích toàn sàn (Phải Nhảy để né!). |
| **Kỹ năng 3** | **Khiên Cận Vệ:** Chống gậy thủ thế, phản 100% đòn cận chiến. | **Ủi Sập Container (Freight Charge):** Cú ủi đầu gãy sập mọi container trên đường đi, hất văng mọi creep xuống biển. |
| **Điểm yếu** | Đòn đánh sau lưng (Backstab) ngay khi vừa vung gậy xong. | **Gốc sừng kìm & Khớp chân sau:** Khi ủi trúng container thép, sừng bị mắc kẹt 4 giây ➔ Lộ điểm yếu sau gáy nhận 200% sát thương! |

---

### MINI-BOSS STAGE 1-3: BRUNO VALETTE (DẠNG NGƯỜI - `bro_big_gun.png`)

| Chỉ số & Kỹ năng | Chỉ số | Hành vi & Ứng dụng chiến thuật |
| :--- | :--- | :--- |
| **Máu (HP)** | 7,000 HP | Giai đoạn Đấu 1v1 với Deep: Tôn trọng luật giang hồ không dùng súng lớn. |
| **Tốc độ** | Nhanh nhẹn (1.3x) | Lộn nhào né đòn, gạt kiếm phản xạ cực nhanh. |
| **Kỹ năng 1** | **Đấm Găng Chì (Lead Hook):** Cú đấm móc hàm bọc chì gây choáng 1s. |
| **Kỹ năng 2** | **Rút Súng Ghìm Tầm Gần (Point-Blank Revolver):** Bắn 3 phát đạn xuyên giáp khi đối thủ hở sườn. |
| **Kỹ năng 3** | **Lựu Đạn Khói Tháo Chạy (Tactical Smoke Exit):** Khi bầy quái hoa tràn lên và máu dưới 30%, ném bom mù trốn vào cống MuCEM. |

---

## 4. CHIẾN THUẬT SÀN ĐẤU: MA TRẬN AI INFIGHTING & TƯƠNG TÁC ĐỊA HÌNH

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      MA TRẬN HẬN THÙ AI (FACTION INFIGHTING MATRIX)                    │
├──────────────────────┬────────────────────────┬────────────────────────────────────────┤
│ Kẻ tấn công          │ Mục tiêu ưu tiên       │ Hành vi & Tương tác đặc biệt           │
├──────────────────────┼────────────────────────┼────────────────────────────────────────┤
│ **Stag-Beetle Malo** │ Bầy Quái Hoa "Éclos"   │ Điên cuồng vì bị quái hoa bu bám;      │
│                      │                        │ chủ động ủi càn đè bẹp đàn quái hoa!   │
├──────────────────────┼────────────────────────┼────────────────────────────────────────┤
│ **Bầy Quái Hoa**     │ Băng Áo Đen & Don Malo │ Cào cấu xé xác lính mafia trả thù;     │
│                      │                        │ KHÔNG TẤN CÔNG STRANGER/GHOST!         │
├──────────────────────┼────────────────────────┼────────────────────────────────────────┤
│ **Băng Áo Đen**      │ Bầy Quái Hoa           │ Bắn súng loạn xạ trong hoảng loạn      │
├──────────────────────┼────────────────────────┼────────────────────────────────────────┤
│ **Người chơi**       │ Điều phối chiến trường │ Dẫn dụ cú ủi sừng bọ hung dọn dẹp quái │
└──────────────────────┴────────────────────────┴────────────────────────────────────────┘
```

### 💡 4 Đòn phối hợp chiến thuật (Player Exploits):

1. **Dẫn Dụ Cú Húc Càn (Freight Charge Exploit):**
   * Canh lúc Don Malo gồng đòn *Freight Charge*, người chơi né sang bên. Cú ủi đầu của Bọ Hung sẽ quét sạch toàn bộ lính Áo Đen và bầy quái hoa trên đường đi, đồng thời cắm sừng vào thùng container chịu 4 giây Choáng.
2. **Ring-Out Execution (Đẩy rơi biển Địa Trung Hải):**
   * Mép cầu cảng Hangar J4 không có rào chắn. Dùng cú quét đại kiếm của Deep hoặc cú húc khiên phản đòn của Block để hất lính Áo Đen và quái hoa rơi xuống biển chết tức thì (Instant KO).
3. **Cộng hưởng Nhụy Hoa của Stranger (Stranger's Resonance):**
   * Khi Stranger dùng thanh Nộ (EX Gauge), bầy Quái Hoa nhận diện tần số Thể Nguyên Bản và phóng những chùm rễ gai từ mép cống trói chặt 6 chân của Don Malo trong 4 giây, phá vỡ lớp giáp Chitin.
4. **Hạ Gục Bằng Cáp Cẩu Pallet:**
   * Mark bắn đứt dây cáp cẩu hàng trên cao, thả các khối container thép rơi xuống đè bẹp Boss khi đang vận công dậm đất.

---

## 5. KỊCH BẢN PHIM (CINEMATIC SCREENPLAY) GIAI ĐOẠN HOÀNG HÔN

### SCENE: BẾN CẢNG HOÀNG HÔN (HANGAR J4) - DUSK
*(Camera từ từ hạ thấp từ bầu trời hoàng hôn đỏ ối như máu xuống mặt cầu cảng loang dầu. Tiếng gió biển rít qua các khe hở container.)*

**MARK** *(quỳ bên xác chiếc thuyền cá bị băm nát buồng máy, siết chặt nắm tay dính máu)*:  
— *"Động cơ bị đập nát bằng búa tạ. Vết máu kéo dài về phía trạm cẩu... Mateo đã bị bắt."*

**SOLEI** *(chĩa song đao về phía sương mù)*:  
— *"Có tiếng động cơ... Rất đông!"*

*(Ba chiếc xe sedan bọc thép đen bóng phanh cháy lốp chặn ngang lối vào cảng. Hàng chục tay chân Áo Đen cầm mã tấu tản ra. DON HECTOR MALO bước xuống, chống gậy baton thép, điềm nhiên rít một hơi xì gà. Trong túi áo dạ của lão lộ ra ống nghiệm thủy tinh bọc kim loại chứa dung dịch xanh đen).*

*(Trên nóc container tầng hai, BRUNO VALETTE xuất hiện cùng Antoine và Luc, khẩu tiểu liên drum-mag gác hờ hững trên vai).*

**BRUNO** *(nhổ toẹt đầu xì-gà xuống sàn bê tông, ngón tay gõ nhịp trên thân súng)*:  
— *"Mày nhìn kìa Deep. Cả cái vịnh Marseille này đêm nay không có chiếc thuyền nào đón mày đâu. Vụ nổ ở Bastonne của tụi mày đã đốt sạch xà lan hàng năm vạn Francs của tao thành tro bụi. Giờ mày trồi lên đây với hai bàn tay trắng để tao xả nát gáo à?"*

**DON HECTOR MALO** *(chống gậy baton cười khàn đặc, mắt liếc nhìn Stranger)*:  
— *"Cầu cảng này là đất của Malo. Thằng nhóc Bastonne có lệnh truy nã đáng giá bằng cả một con tàu hàng, còn mày, Bruno... Mày chỉ là thằng buôn súng hết thời bị thằng bạn làm ăn Jameson quẳng lại bến bãi. Lượn đi trước khi tao bảo tụi nhỏ quẳng xác mày xuống nuôi cá trích."*

**BRUNO** *(lên đạn rôm rốp, mắt tóe lửa)*:  
— *"Ông già, ngậm cái mồm thối lại. Tiền Bastonne là tao chung vốn với Jameson. Lão ta đang giấu mình trong cái hầm MuCEM kia kìa. Còn món nợ Bastonne hôm nay, tao phải tính sổ với thằng cầm đại kiếm trước!"*

**DEEP** *(bước lên một bước, cắm phập thanh đại kiếm xuống khe đá kè cảng, giọng trầm lạnh)*:  
— *"Muốn tính nợ Bastonne? Bỏ súng máy xuống. Bước ra đây một chọi một theo Luật Cầu Tàu. Đừng để tiếng súng máy của mày đánh động pháo bờ biển."*

**BRUNO** *(nhếch mép cười gằn, ném khẩu súng lớn cho Antoine)*:  
— *"Được lắm. Để tao xem kiếm thép Bastonne cứng hay nắm đấm bọc chì của tao nhanh hơn!"*

*(Đoạn phim chuyển sang gameplay 1 vs 1: Deep đấu tay đôi với Bruno giữa vòng vây. Tiếng va chạm nảy lửa giữa đao kiếm và súng ngắn).*

*(Đúng lúc trận đấu lên đỉnh điểm, âm thanh rầm rộ dưới cống ngầm dội lên! Bọn băng đảng trước đó đã bắt giữ con tin và người dưới cống hòng khống chế các loài sinh vật ngầm, vô tình kích động cơn cuồng nộ hoang dã. BÙNGGG! Hàng chục nắp cống gang bị đạp tung lên trời. BẦY QUÁI HOA "LES ÉCLOS" (mutan_flower, mutan_leaf) đạp cống trào lên mặt cảng như thác lũ, lao vào cắn xé loạn xạ bất kể ai ngáng đường! Trận 1v1 vỡ vụn thành đại hỗn chiến 4 phe).*

**BRUNO** *(bị quái hoa cào rách vai, súng ngắn cạn đạn, nhìn sang thấy hàng trăm quái vật trào lên)*:  
— *"Khốn kiếp! Lũ quái cống trào lên rồi! Chỗ này hỏng bét rồi... Jameson, tao sẽ sang MuCEM tìm mày tính nợ!"*  
*(Bruno ném quả lựu đạn khói mù mịt, cùng hai cận vệ đạp cửa hầm kỹ thuật tháo chạy sang đường hầm MuCEM).*

*(Sau khi Bruno tháo chạy, Don Malo dạng người Big_MM.png trực tiếp vung gậy baton thép xông vào nghênh chiến. Bị Team Deep dồn combo đánh cho thừa sống thiếu chết, gãy gậy baton, máu cạn đáy và quỳ gục run rẩy sát mép biển).*

**DON MALO** *(thở dốc, máu ứa khóe miệng, nhìn cả đội đang tiến tới)*:  
— *"Lũ khốn... Ta là vua của Marseille! Ta không thể chết ở đây!..."*  
*(Trong cơn tuyệt vọng vì cận kề cái chết, Don Malo rút ống Huyết thanh Chitin trong túi áo cắm phập vào cổ! Cơ thể lão nổ tung, hồi sinh và biến dị khủng khiếp thành STAG-BEETLE TITAN với cặp sừng khổng lồ gầm vang trời đất!)*

*(Sau trận huyết chiến nghẹt thở, lớp mai giáp bọ hung vỡ nát, Don Malo rơi xuống biển sâu. Khói súng tan dần. Chiếc thuyền cá tị nạn ban đầu đã cháy rụi trơ khung sắt, động cơ bị búa tạ đập nát bấy, hoa tiêu Mateo đã bị áp giải sang khối bảo tàng MuCEM bên kia vịnh. Đội chiếm được chiếc ca-nô tuần tra cao tốc ở bãi slipway, nhưng không thể cứ thế nổ máy phóng bừa ra biển).*

### CUTSCENE: CUỘC HỌP BÀN TÁC CHIẾN BÊN BẾN CẢNG (WAR COUNCIL AT HANGAR J4)

**CẢNH 1: TÀN CUỘC & CHIẾC CA-NÔ CAO TỐC**  
*(Deep thu kiếm tra vào bao sau lưng, bước nhanh qua bãi vỏ đạn và xác quái vật. Mark đang kiểm tra khoang máy chiếc thuyền cá tị nạn đã bị đốt đen thui).*

**MARK** *(lắc đầu)*:  
— *"Động cơ thuyền bị đập nát bấy bằng búa tạ. Vết máu kéo dài về phía bãi ca-nô quân sự... Mateo đã bị kéo đi rồi."*

**BLOCK** *(chống chiếc khiên thép nặng trĩu xuống sàn bê tông nứt nẻ, thở dốc)*:  
— *"Không còn thuyền cá thì chúng ta dùng chiếc ca-nô cao tốc vừa cướp được kia. Leo lên hết, nổ máy phóng thẳng ra hải phận quốc tế là xong!"*

**CẢNH 2: NGUY CƠ BỊ BẮN TỬ THẦN**  
*(Góc máy rộng từ sau lưng Deep lia ra cửa vịnh: Hai luồng đèn pha khổng lồ từ pháo đài Fort Saint-Jean và tháp nổi MuCEM quét qua quét lại trên mặt sóng rợn người).*

**MARK** *(lắc đầu quả quyết, chĩa ngón tay ra luồng nước mở)*:  
— *"Không được! Nhìn ra cửa vịnh đi! MuCEM không phải bảo tàng bình thường. Hệ thống radar vi ba và các tháp pháo cao tốc điều khiển từ xa dưới chân đế của nó đang quét 360 độ. Nếu 5 đứa mình cùng ngồi lên một chiếc ca-nô lao ra mặt nước trống, pháo phòng thủ bờ biển sẽ băm nát chúng ta thành tro bụi trong vòng 30 giây!"*

**SOLEI** *(song đao tra vào bao, mắt nheo lại quan sát khối kiến trúc mắt cáo đang phát sáng xanh lơ)*:  
— *"Đường bộ trên quảng trường chính thì cảnh sát mật đã dựng rào chắn sinh trắc học và xe bọc thép. Đường biển thì bị tháp pháo khóa họng. Chẳng lẽ đứng đây chờ chết?"*

**CẢNH 3: TIẾNG GỌI TÂM LINH CỦA STRANGER**  
*(Góc quay cận cảnh: Stranger quỳ sụp một gối xuống sàn kè, hai tay ôm chặt đầu, gân máu nổi hằn thái dương. Đôi mắt cậu ánh lên sắc xanh lam dị thường. Tiếng vọng kêu cứu nghẹn ngào dưới nước sâu dội thẳng vào tâm thức).*

**STRANGER** *(giọng run rẩy nhưng rõ ràng từng chữ, ngón tay run rẩy chỉ thẳng xuống chân đế MuCEM)*:  
— *"Dưới đáy biển... dưới chân khối bê tông đó... Không chỉ có Mateo... Hàng chục sinh mệnh... đang bị xẻ thịt cấy ghép trong buồng áp suất ngầm... Họ đang gào khóc gọi tôi... Có một cửa âu ngập nước... cửa thoát nước kỹ thuật dưới đáy chân đế bảo tàng. Đó là lối vào duy nhất mà hệ thống giám sát trên cao không nhìn thấy."*

**CẢNH 4: KẾ HOẠCH TÁC CHIẾN TÁCH 2 CÁNH (THE DUAL-WING PLAN)**  
*(Góc máy từ trên cao: Mark trải tấm hải đồ tác chiến lên mặt thùng hàng, Deep rút dao găm cắm mốc định vị).*

**MARK** *(vạch hai đường mũi tên lên hải đồ)*:  
— *"Muốn chiếc ca-nô áp sát được cửa âu ngầm đó mà không bị bắn chìm, bắt buộc phải làm 'mù' mắt MuCEM trước! Tôi có kế hoạch tách làm hai cánh:*
* *Cánh 1 — Đột nhập & Phá hoại (Mark & Solei): Men theo dải bờ đá công nghiệp, lẻn vào Trạm kiểm soát kỹ thuật ven bờ đối diện MuCEM. Hack console ngắt nguồn điện radar bờ biển, triệt hạ đội ca-nô tuần tra của Jamerson.*
* *Cánh 2 — Đột kích đường biển (Deep, Stranger, Block): Ở lại giữ chiếc ca-nô này. Khi thấy dàn đèn pha quét biển của pháo đài vụt tắt — đó là tín hiệu thành công! Deep lập tức nổ máy, rẽ sóng men theo điểm mù dưới chân vách đá Fort Saint-Jean, đâm thẳng vào cửa âu ngầm MuCEM."*

**DEEP** *(nhìn Solei và Mark)*:  
— *"Sau khi dập xong radar trạm bờ, hai người rút thế nào?"*

**SOLEI** *(nhếch mép cười tự tin)*:  
— *"Giữa trạm kiểm soát bờ và MuCEM có một cây cầu treo bảo trì (Skybridge) bắc ngang qua eo biển. Tôi và Mark sẽ cắt qua cây cầu đó, đột kích tầng mái và hội quân với mọi người tại Ga ngầm đáy biển (Subway Dock)!"*

**CẢNH 5: LỜI THỀ BẾN CẢNG & XUẤT QUÂN**  
*(Góc máy thấp hùng tráng: Deep cắm phập thanh đại kiếm xuống sàn gỗ cầu cảng, lần lượt nhìn vào mắt từng đồng đội).*

**BLOCK** *(siết chặt đai khiên thép, gật đầu chắc nịch)*:  
— *"Kế hoạch rất rõ ràng. Có đường vào, có điểm hẹn, không đâm đầu vào chỗ chết vô ích."*

**DEEP** *(ánh mắt kiên định rực lửa hoàng hôn)*:  
— *"Thuyền nát rồi, Mateo đang bị giam dưới đó, và họng súng của chúng khóa chết cả thành phố. Chúng ta đã chạy trốn một lần từ Bastonne... Nhưng đêm nay, chúng ta không chạy trốn nữa! Đêm nay, kết thúc tất cả ở MuCEM! Xuất kích!"*

*(Cutscene khép lại: Màn hình chia đôi — Mark và Solei đeo mặt nạ lặn bóng tối trườn dọc bờ đá công nghiệp; Deep, Stranger và Block cúi thấp người trong khoang ca-nô, tay đặt sẵn trên cần gạt chân vịt, nín thở chờ đợi dàn đèn pha đối diện vụt tắt. Trò chơi chính thức bước vào Stage 1-4: Chiến Dịch Đột Kích MuCEM).*

---

## 6. DANH MỤC FILE SPRITE & TÍCH HỢP CODE ANIMATION

| Sprite Tên File | Vị trí lưu trữ | Vai trò trong Game | Trạng thái Code / Rigging |
| :--- | :--- | :--- | :--- |
| `Big_MM.png` | `act 1/NPC_sprite/Big_MM.png` | Don Malo Dạng Người | Idle, Walk, Cane Swing, Call Henchmen |
| `Big_MM_trans.png` | `act 1/NPC_sprite/Big_MM_trans.png` | Don Malo Dạng Stag Beetle | Boss Độc Tôn Stage 1-3: Pincer Grab, Ground Slam, Horn Charge |
| `bro_big_gun.png` | `act 1/NPC_sprite/bro_big_gun.png` | Bruno Dạng Người | Mini-Boss Stage 1-3: 1v1 Melee, Pistol Quickdraw, Smoke Exit |
| `Snake_boss.png` | `NPCss/Aspire/act1/Snake_boss.png` | Bruno Dạng Snake Boss | Boss Đỉnh Cao Stage 1-4 (MuCEM Lab): Slither, Venom Spit, Lunge |
| `Snake_boss_animations_v001/` | Thư mục cùng tên | Bộ khung Animation Snake Boss | Đã xuất spritesheet + FX + JSON hoàn chỉnh |
| `mutan_flower.png` | `NPCss/Aspire/act1/mutan_flower.png` | Quái Hoa Nhụy | Spore Mist, Grab, Sacrificial Root Stun |
| `mutan_leaf.png` | `NPCss/Aspire/act1/mutan_leaf.png` | Quái Cào Cấu Nhanh | Slash, Wall Cling, Dive Claw |
| `jam_son.png` | `act 1/NPC_sprite/jam_son.png` | Cai ngục Jameson | Boss Cố Thủ MuCEM Submarine |

