# TÀI LIỆU ĐẶC TẢ THIẾT KẾ HOÀN CHỈNH: CHAPTER 2 – VÙNG ĐẤT SAKURI VÀ CÁI TAI
> **Dự án:** Divergency (Dark Fantasy Tactical Brawler)  
> **Cơ chế chính:** Tactical Squad Combat (LF2 Heritage), Noise Management, Pattern Counter-Adaptation, Nonlethal Climax.  
> **Tài nguyên liên kết:** `ChapterTwoMechanics.cs`, `ChapterTwoContent.json`, `Chapter2Dialogue.md`.

---

## MỤC LỤC
1. [Tổng Quan Thiết Kế & Quy Luật Cốt Lõi (Core Rules)](#1-tong-quan-thiet-ke--quy-luat-cot-loi)
2. [Hệ Thống Trọng Yếu & Biến Số Gameplay (Global Variables)](#2-he-thong-trong-yeu--bien-so-gameplay)
3. [Vai Trò & Tương Tác Đồng Đội (Squad Synergy & Roles)](#3-vai-tro--tuong-tac-dong-doi)
4. [Đặc Tả Chi Tiết 23 Phân Vùng (Detailed 23-Area Specification)](#4-dac-ta-chi-tiet-23-phan-vung)
5. [Thiết Kế Chi Tiết Các Trận Đánh Trùm (Boss Encounters)](#5-thiet-ke-chi-tiet-cac-tran-danh-trum)
6. [Các Câu Đố Môi Trường (Environmental Puzzles)](#6-cac-cau-do-moi-truong)
7. [Hướng Dẫn Triển Khai Code Unity C# (`ChapterTwoMechanics.cs`)](#7-huong-dan-trien-khai-code-unity-c)

---

## 1. TỔNG QUAN THIẾT KẾ & QUY LUẬT CỐT LÕI

Chương 2 dẫn dắt người chơi qua hành trình gồm **23 phân vùng (Areas)** từ làng chài hoang tàn ven biển đến thánh địa tuyết trên đỉnh núi thiêng. Toàn bộ chương xoay quanh mảnh bảo vật **Cái Tai** của Thần Sơ Sinh:

```
[Nghe môi trường] ──> [Điều khiển tiếng động] ──> [Phá vỡ thói quen lặp] ──> [Đối đầu kẻ đọc ý nghĩ]
```

### Các Quy Luật Cốt Lõi:
1. **Bán kính tiếng động (Decibel Footprint / Noise Radius):** Chạy nước rút, nhảy tiếp đất mạnh, nổ súng hoặc phá hòm gỗ đều phát ra sóng âm lan tỏa. Vượt ngưỡng an toàn sẽ báo động tuần tra hoặc kích hoạt phản xạ của Cái Tai.
2. **Ghi nhớ và phản đòn thói quen lặp (Pattern Counter-Adaptation):** Lính bùa Cái Tai và Boss Sakuri có khả năng nhớ chuỗi combo. Nếu người chơi spam cùng 1 đòn đánh quá 2-3 lần, kẻ địch sẽ tự động Parry / Phản đòn tức thì.
3. **Vùng Im Lặng (Silent Zones):** Những khu vực treo chuông gió ngọc hoặc hoa anh đào có khả năng hấp thụ sóng âm, giúp ẩn mình và ngắt kết nối thấu thị của Cái Tai.
4. **Kết thúc Phi Bạo Lực (Non-lethal Rescue):** Máu của Sakuri không thể giảm xuống dưới **16% HP**. Trận đấu bắt buộc phải được giải quyết bằng lòng trắc ẩn, bài hát ru của mẹ và kỷ vật chuông gió.

---

## 2. HỆ THỐNG TRỌNG YẾU & BIẾN SỐ GAMEPLAY

Trong file `ChapterTwoMechanics.cs`, cần quản lý các biến trạng thái sau:

| Tên biến (Variable) | Kiểu dữ liệu | Ý nghĩa & Tác động Gameplay |
|---|---|---|
| `HeniTrust` | `int (0 - 100)` | Điểm lòng tin của bé Heni. Ảnh hưởng đến việc Heni cảnh báo giọng giả ở Area 12 và giữ dây ở Area 21-22. |
| `NoiseLevel` | `float (0.0 - 100.0)` | Mức ồn hiện tại trong phân cảnh. Vượt 45 ở Area 11 sẽ mất cơ hội trộm thư lén lút. |
| `RyozanPurified` | `bool` | `true`: Giải yểm Ryozan (giảm thời gian giữ yên lặng ở trùm cuối từ 3s xuống 1s, mở khóa hội thoại cổng Torii). `false`: Tiêu diệt Ryozan. |
| `KurotakeMaskEquipped` | `bool` | Giảm 50% sát thương và thời gian trúng độc Hắc Trầm Hương khi đã cứu Tù trưởng. |
| `RepeatedAttackCounter` | `int` | Đếm số lần tung cùng 1 chiêu thức. Đạt ngưỡng 3 sẽ kích hoạt khiên phòng ngự của lính Cái Tai. |
| `TwinChimeResonated` | `bool` | Kích hoạt khi Solei rung chuông gió ngọc đối ứng với chuông của Sakuri. |

---

## 3. VAI TRÒ & TƯƠNG TÁC ĐỒNG ĐỘI (SQUAD SYNERGY)

* **Solei (Trọng tâm Cảm xúc & Cơ động):** Tốc độ cao, leo trèo cắt dây chuông, tra kiếm hát ru ở trận cuối, mang dòng máu của người dưỡng mẫu.
* **Stranger / Ghost (Quân bài tẩy "Vô Niệm"):** Tâm trí trống rỗng không có toan tính. **Hoàn toàn miễn nhiễm với cơ chế phản đòn lặp** của lính Cái Tai và có thể đi xuyên bức tường sóng âm của Sakuri.
* **Block (Tấm khiên bảo hộ phi sát thương):** Sử dụng lệnh `HOLD` để tạo khiên đẩy lùi dân làng cuồng loạn ở Area 3 mà không gây sát thương; cắm khiên làm điểm tựa cho Heni bám ở vực đá tuyết.
* **Tulas (Pháp sư điều khiển chất lỏng):** Tạo bệ nước nâng đồng đội lên cao cắt chuông; dùng dòng nước dập tắt đám cháy chòi gỗ ở Area 2; hút bùn khoáng từ xa ở Area 9; bắc cầu chất lỏng qua thác nước ở Area 6.
* **Deep (Cựu binh dũng mãnh):** Gánh sát thương nặng, phá vỡ trụ yểm phong ấn đá và dùng đòn đập nặng đại kiếm giáng thẳng vào trống Taiko để tạo sóng xung kích.
* **Mark (Hỏa lực chiến thuật & Tầm xa):** Bắn tỉa chuông báo động từ xa, bắn hạ cột phong ấn trên vách đá cao, ném đạn khói che mắt địch.

---

## 4. ĐẶC TẢ CHI TIẾT 23 PHÂN VÙNG (23 AREAS)

### VÙNG 1: BẾN THUYỀN LÀNG CHÀI (Fishing-Village Landing)
* **Gameplay:** Cập bến lúc chạng vạng trong sương lạnh. Tiếp cận quầy hàng của Heni bán cá khô, rong biển và thảo dược. Người chơi chọn trả giá sòng phẳng hoặc mặc cả. Trả tiền sòng phẳng cộng **+15 HeniTrust** và nhận cá khô (hồi năng lượng).
* **Story & Thoại:** Chỉ còn đúng 3 ngày nữa là đến Đại Lễ Trích Huyết. Đội phải tiếp cận Sakuri trước khi tàu tiếp tế của Jamerson tới.
* **Chi tiết mới:** Solei để ý thấy vết thâm tím trên cổ tay Heni (dấu vết lấy máu xét nghiệm định kỳ).

### VÙNG 2: KÝ ỨC CỦA HENI & VẠCH TRẦN MẬT VỤ (Heni’s Memories)
* **Gameplay:** Tìm 3 manh mối trong chòi: (1) Bức ảnh Heniana, (2) Lắng nghe giấc mơ phòng kính của Heni, (3) Cuốn sổ theo dõi cơn sốt và lịch gửi mẫu máu.
* **Tình huống cao trào:** Tên mật vụ đập vỡ đèn dầu châm lửa đốt chòi, giật chuông báo động vu khống nhóm là cướp biển dịch hạch.
* **Cơ chế tương tác:** Tulas dùng phép nước dập lửa cứu tài liệu trong 20 giây; cả đội bảo vệ Heni rút lui.

### VÙNG 3: ĐÀO THOÁT KHỎI LÀNG CHÀI (Escape the Village)
* **Gameplay:** Cuộc rượt đuổi phi sát thương (*Non-lethal Evasion*). Dân làng và lính tuần sai cầm lao cá, đuốc đỏ bao vây vì phần thưởng 10 bao gạo của Lãnh chúa.
* **Cơ chế:** Dân làng không gây sát thương chí mạng nhưng ném lưới làm chậm. Người chơi dùng **Block bật khiên to đẩy lùi**, cấm sát hại dân thường (giết dân = trừ Karma và tăng độ thù địch). Bế Heni nhảy qua các sàn thuyền gỗ mục trèo lên vách đá.
* **Thoại:** Solei và Block nhắc nhở nhau: *"Họ chỉ là những người dân đói nghèo bị lừa gạt, tuyệt đối không được rút gươm!"* Heni hét lên: *"Cháu tự nguyện đi theo mọi người!"*

### VÙNG 4: TRẠM KIỂM SOÁT CÁCH LY (Quarantine Checkpoint)
* **Gameplay:** Lính gác xé giấy thông hành Marseille, sỉ nhục Solei là "con hoang lai căng". Buộc phải đi đường vòng.
* **Cơ chế:** Quản lý vòng tiếng ồn (*Noise Radius*). Ném đá dụ lính gác rời chốt. Tulas dựng bệ nước nâng Solei lên cắt dây chuông đồng báo động.
* **Nhiệm vụ phụ:** Thu thập thảo dược chữa trị cho 2 bà cháu ho ra máu bên vệ đường. Nhận lại mảnh vải lụa thêu hoa văn cung đình bị cháy sém. Bà lão nhận ra nút thắt túi thuốc gia truyền của vị nữ quan năm xưa.

### VÙNG 5: CÂY CẦU DƯỚI THÁC NƯỚC (Bridge Beneath the Waterfall)
* **Gameplay:** Băng qua cây cầu đá hẹp sạt lở dưới chân thác gầm rú, đối đầu với lính kiếm và lính súng.
* **Cơ chế Âm thanh Thác nước:** Tiếng thác nước gầm rú át tiếng bước chân của đội, **nhưng đồng thời xóa sạch tín hiệu âm thanh báo đòn (Audio Cues) của địch**. Người chơi phải nhìn vệt sáng của đao kiếm để đỡ đòn.
* **Bóng đen dưới nước:** Dưới dòng xoáy cuộn trào, một thực thể bóng tối khổng lồ đang trườn theo dõi cả đội.

### VÙNG 6: BA CỘT YỂM PHONG ẤN (Three Seals)
* **Gameplay:** Trước khi thực thể bóng tối trồi lên, người chơi phải phối hợp phá vỡ 3 Cột Yểm Phong Ấn giữa dòng nước xiết:
  * *Cột 1:* Solei lướt qua các bệ đá trơn trượt chém đứt bùa yểm.
  * *Cột 2:* Tulas bắc cầu chất lỏng qua dòng nước cuộn để Deep tung đòn nặng đập nát trụ đá.
  * *Cột 3:* Mark canh thời điểm bọt nước tạm lắng để bắn tỉa ngòi nổ trên vách đá cao.

### VÙNG 7: LỜI THỀ CỦA RYOZAN (Ryozan’s Oath - Boss Fight)
* **Gameplay:** Đánh bại Oan hồn Tướng quân Ryozan (Xem chi tiết ở [Mục 5](#5-thiet-ke-chi-tiet-cac-tran-danh-trum)).
* **Lựa chọn phân nhánh:**
  * **Purify (Giải yểm):** Ryozan trao lại lời dặn: *"Trên đỉnh núi tuyết, khi vạn vật chìm vào im lặng, cháu có thể nghe thấy cả tiếng thở của chính mình"*. Giảm thời gian giữ yên lặng ở màn cuối từ 3s xuống 1s.
  * **Slay (Tiêu diệt):** Kết thúc lời nguyền ngay lập tức, nhưng giáp đỏ rỗng của ông bị Cái Tai thu hồi làm tay sai ở đỉnh núi.

### VÙNG 8: RỪNG TRE ĐEN KUROTAKE (Kurotake Bamboo Forest)
* **Gameplay:** Vượt qua bẫy chông ngầm và lao tre của bộ tộc mặt nạ gỗ.
* **Cơ chế Vật lý & Âm thanh:** Chặt đứt thân tre lớn để đè bẹp kẻ địch và làm rơi các mầm lá tre non sạch. Lợi dụng tiếng gió thổi tre xào xạc để lướt qua các vùng trống mà không bị Cái Tai nghe thấy. Heni chủ động chạy lại băng bó cho chiến binh Kurotake bị thương.

### VÙNG 9: SUỐI KHOÁNG NÚI ĐÁ (Mineral Spring)
* **Gameplay:** Thu thập bùn khoáng ven suối. Khí độc bốc lên ven bờ.
* **Cơ chế:** Nấp gần chuông gió để hạ thanh Noise. Tulas dùng năng lực điều khiển chất lỏng kéo khối bùn khoáng tinh khiết lên bờ. Heni phối hợp chỉ dẫn tỉ lệ trộn thuốc dù không nhớ ai đã dạy mình.

### VÙNG 10: THỦ LĨNH RỪNG TRE (Forest Guardian)
* **Gameplay:** Kết hợp lá tre non và bùn khoáng đắp lên vết thương hiểm nghèo của Tù trưởng Kurotake.
* **Story & Phần thưởng:** Tù trưởng nhận ra phương thuốc của người nữ quan năm xưa đã cứu bộ tộc trong nạn đói. Hiểu lầm được xóa bỏ. Bộ tộc trao tặng **Mặt nạ thảo mộc Kurotake** (giúp lọc 50% độc khí Hắc Trầm Hương) và mở lối mòn bí mật xuyên hẻm núi lên quốc lộ.

### VÙNG 11: QUÁN TRÀ QUỐC LỘ HOÀNG HÔN (Highway Teahouse)
* **Gameplay:** Tiếp cận quán trà sầm uất đối diện cổng thành. Người chơi có 2 phương án:
  * *Stealth:* Giữ `NoiseLevel < 45`, cải trang nghe lén, trộm bức mật thư niêm phong sáp đỏ.
  * *Brawl:* Lật bàn đánh tan toán mật vụ nếu bị phát hiện.
* **Story:** Bức thư vạch trần việc Lãnh chúa Masatomo bán máu Sakuri lấy vũ khí của Jamerson. Heni nhìn thấy búp bê sứ giống hệt mình, bàng hoàng nhận ra mình bị coi như món đồ chơi thượng lưu.

### VÙNG 12: ĐƯỜNG KHÓI HẮC TRẦM HƯƠNG (Poison-Incense Road)
* **Gameplay:** Tiến vào hành lang tẩm điện ngập tràn khói Hắc Trầm Hương. Khói độc gây ảo giác âm thanh (False Auditory Cues).
* **Cơ chế:** Kéo cần van thông gió trên xà nhà hoặc dùng Tulas dập tắt 3 lư hương đồng. Có âm thanh giả giọng Deep gọi Solei vào hố bẫy. Nếu `HeniTrust >= 30`, Heni sẽ giữ tay Solei lại cảnh báo: *"Giọng đó không có nhịp thở thật!"*.

### VÙNG 13: VỰC THẲM ĐÁ BAY (Ravine Crossing)
* **Gameplay:** Nhảy chuyền qua các bệ đá trôi nổi trên vực sâu trong lúc chiến đấu với các bóng ma bay (vong hồn thánh nữ cũ).
* **Cơ chế:** Mark cảnh báo bóng đổ trên vực không phản ánh đúng độ cao bệ đá do ảo ảnh âm thanh. Ghost ra đòn đánh tan các bóng ma dễ dàng vì không bị tác động bởi nỗi sợ.

### VÙNG 14: LÍNH BÙA CÁI TAI (Ear-Charmed Soldiers)
* **Gameplay:** Chạm trán đội cấm vệ mang bùa Cái Tai. Kẻ địch có khả năng nhận biết chiêu thức lặp lại: tung cùng 1 chiêu 3 lần sẽ khiến địch bật khiên đỡ hoàn toàn trong 4 giây.
* **Khắc chế:** Luân chuyển đòn đánh nhẹ/nặng, ném bình vò gốm, HOẶC **chuyển sang điều khiển Ghost** (đòn đánh của Ghost không có sóng ý nghĩ nên không thể bị đoán trước).

### VÙNG 15: TRƯỚC TẨM ĐIỆN CUNG ĐÌNH (Outside the Palace)
* **Gameplay:** Tìm thấy cuộn giấy cổ và gương nứt miêu tả cơ cấu cánh cửa an toàn của tẩm điện.
* **Story:** Solei đứng trước cung điện xa hoa, nhận ra sự đối lập tàn nhẫn với làng chài nghèo khổ và nhớ lại kỳ vọng thuở ấu thơ về một cội nguồn bao dung.

### VÙNG 16: SÂN KHẤU KỊCH NOH (Noh Stage - Boss Fight)
* **Gameplay:** Xuống lòng đất, đối đầu với **Rết Khổng Lồ Song Kiếm (Dual-Blade Centipede)** mang mặt nạ Hannya.
* **Cơ chế:** Gõ dùi vào một trong hai chiếc trống Taiko đại để tạo luồng sóng chấn động âm trầm làm con rết bị điếc và choáng trong **7 giây**, lật ngửa phần bụng mềm màu đỏ để cả đội dồn sát thương. Mở ra lối đi bí mật thông ra chân núi tuyết.

### VÙNG 17: DI VẬT CỦA NGƯỜI DƯỠNG MẪU (The Caregiver’s Relics)
* **Gameplay:** Đánh bại toán ninja phục kích trong tàng thư các cũ bỏ hoang.
* **Manh mối chấn động:** Đọc cuốn nhật ký của mẹ Solei và thu thập **Chiếc Chuông Gió Bằng Ngọc (Nửa Hoa Sen)**.
* **Sự thật hé lộ:** Mẹ Solei từng là dưỡng mẫu nuôi Sakuri từ thuở ẵm ngửa. Bà liều mình phản đối nghi thức bịt mắt công chúa lúc 6 tuổi nên bị khép tội phản nghịch. Bà phải ôm Solei bỏ trốn sang Marseille vì không thể cứu được cả hai đứa trẻ!

### VÙNG 18: BA CÁNH CỬA ĐÁNH LỪA (Three Doors Puzzle)
* **Gameplay:** Phòng bẫy gồm Cửa Đỏ (A), Cửa Xanh (B), Cửa Đen (C) phía trên hầm chông.
* **Giải mã:** Dựa vào cuộn giấy của mẹ và gương nứt để chọn **Cửa B** (Gỗ gụ mộc, cành mai khắc chìm, ngưỡng cửa mòn vẹt vì người thật đi lại).
* **Hình phạt cửa sai:** Chọn sai sẽ rơi xuống phòng bẫy chém quay (Guillotine Trap Room), phải hạ cơ quan ngắt bẫy mới được quay lại chọn cửa thật.

### VÙNG 19: CHÂN NÚI THIÊNG (Sacred Mountain Foothills)
* **Gameplay:** Không gian chuyển giao nghệ thuật: Hoa anh đào nở rộ dưới chân núi dần nhường chỗ cho rừng thông tuyết phủ trắng xóa. Nghỉ ngơi dưới chuông gió để phục hồi thanh năng lượng và hạ Noise về 0.
* **Thoại:** Heni nhìn thấy hoa nở dưới trời tuyết; Solei đau lòng khi nghĩ đến việc Sakuri đã bị giam lỏng cô độc trên đỉnh núi này suốt 10 năm.

### VÙNG 20: CỔNG TORII VÁCH ĐÁ TUYẾT (Torii Gate)
* **Gameplay:** Tiến lên sườn núi dốc. Không gian bắt đầu rung lên từng đợt bởi sóng âm của Cái Tai.
* **Tương tác đặc biệt:** Nếu đã giải yểm Ryozan ở Area 7, Solei sẽ cất tiếng nhắc lại lời hứa của ông: *"Trên đỉnh núi tuyết, khi vạn vật im lặng, cháu có thể nghe thấy cả tiếng thở của chính mình"*. Tiếng sóng âm chói tai của Sakuri khựng lại trong thoáng chốc.

### VÙNG 21: ĐÁ NỔI TẦNG 1 – NHỊP CHUÔNG (First Resonant-Platform Section)
* **Gameplay:** Nhảy qua các phiến đá trôi nổi giữa vực thẳm. Đá sụp vỡ sau **2 giây** đứng yên.
* **Cơ chế Nhịp Điệu:** Lắng nghe nhịp chuông của Cái Tai: Chuông trong trẻo = đá vững vàng; Chuông rít gào = đá rung lắc vỡ vụn. Đưa Heni sang bờ bên kia an toàn và chốt chặt dây thừng cố định.

### VÙNG 22: ĐÁ NỔI TẦNG 2 – BÃO TUYẾT MÙ LÒA (Second Resonant-Platform Section)
* **Gameplay:** Bão tuyết dữ dội che khuất hoàn toàn tầm nhìn (màn hình mờ trắng xóa).
* **Cơ chế Định vị Âm thanh (Blind Platforming):** Người chơi không thể nhìn thấy mép đá tiếp theo bằng mắt, buộc phải **lắng nghe tiếng chuông gió ngọc rung leng keng** và tiếng hát của Solei để nhảy sang phiến đá kế tiếp. Cả đội tụ họp an toàn tại đỉnh núi tuyết.

### VÙNG 23: THÁNH ĐỊA ĐỈNH NÚI – TRÙM CUỐI SAKURI (Sakuri — The Ear)
* **Gameplay:** Trận chiến 3 Phase đầy cảm xúc kết thúc bằng giải cứu phi bạo lực (Xem chi tiết ở [Mục 5](#5-thiet-ke-chi-tiet-cac-tran-danh-trum)).

---

## 5. THIẾT KẾ CHI TIẾT CÁC TRẬN ĐÁNH TRÙM (BOSS ENCOUNTERS)

### BOSS 1: OAN HỒN RYOZAN (Area 7)
* **Bối cảnh:** Cây cầu đá mục bắc ngang thác nước gầm rú. Lời thề bảo vệ bị bẻ cong thành lời nguyền giam cầm.
* **Phase 1 – Thực Thể Nòng Nọc Khổng Lồ (The Shadow Tadpole):**
  * Quái vật trườn dưới đáy thác, quẫy đuôi tạo sóng thần hất ngược lên cầu và phun cầu bóng tối phá vỡ các nhịp đá.
  * Người chơi phải phá hủy 3 Cột Yểm Phong Ấn ở các mỏm đá để tước bỏ lớp màng bất hoại của nó.
* **Phase 2 – Tướng Quân Giáp Đỏ (Red-Armor General):**
  * Làn sương đen tan biến, Ryozan hiện hình trong bộ giáp đỏ rực, cầm đại đao sừng sững giữa tiếng thác gầm.
  * Đòn đánh tầm quét cực rộng, nhịp độ đối kháng võ thuật chuẩn xác.
* **Kết thúc:** Lựa chọn **Purify (Giải yểm)** để nhận ký ức thiêng liêng làm chìa khóa cứu Sakuri, hoặc **Slay (Tiêu diệt)**.

### BOSS 2: RẾT KHỔNG LỒ SONG KIẾM (Dual-Blade Centipede - Area 16)
* **Bối cảnh:** Sân khấu kịch Noh hoang phế đẫm máu dưới đáy đền ngầm, nơi yểm xác các thánh nữ tiền nhiệm.
* **Tạo hình:** Thân rết nghìn chân bọc giáp đen, đầu mang mặt nạ quỷ Hannya rỉ máu, hai cánh tay trước cầm cặp katana dài bén ngọt.
* **Cơ chế:**
  * Bò trên vách đá và xà nhà, bất ngờ bổ nhào quét kiếm hình chữ X.
  * Giáp lưng miễn nhiễm mọi đòn đánh thường.
  * **Taiko Resonance:** Dụ rết lại gần hoặc dùng Deep đập mạnh vào trống Taiko đại. Tiếng trống tạo sóng siêu trầm gây choáng thính giác con rết (*Sonic Stun*) trong **7 giây**, khiến nó quằn quại lật ngửa phần bụng mềm màu đỏ máu để cả đội dồn sát thương.

### BOSS 3: THÁNH NỮ SAKURI & MẢNH THẦN CÁI TAI (Area 23)
* **Bối cảnh:** Đấu trường đá mở toang giữa đỉnh núi tuyết chênh vênh. Sakuri ngồi cô độc trên đài đá, mắt bịt dải lụa trắng, kết nối với Cái Tai bằng vàng rực rỡ sau lưng.
* **Phase 1 – Sóng Âm & Ảo Giác (Sonic Waves & Illusions):**
  * Sakuri ngồi thiền định phát sóng âm gây choáng đẩy lùi và tạo phân thân. Đọc trước mọi chuỗi chiêu thức lặp lại.
  * Người chơi phải nấp vào các **Vùng Im Lặng** quanh cành anh đào/chuông gió để ngắt định vị.
  * **Ghost làm mũi nhọn:** Ghost có tâm trí trống rỗng nên Sakuri hoàn toàn bất lực không thể đọc trước, cho phép Ghost lao vào phá kết giới bảo vệ của cô.
* **Phase 2 – Cuồng Loạn Khát Máu (Vampiric Frenzy Phase):**
  * Quá tải bởi hàng triệu lời dối trá tích tụ mười năm, Sakuri giật tung dải lụa bịt mắt, lao vào trạng thái khát máu điên cuồng.
  * Di chuyển với tốc độ chớp nhoáng, tấn công dồn dập bằng móng vuốt và tơ kim loại xé gió (đậm chất đối kháng võ thuật Little Fighter 2).
  * Block phải canh thời điểm đỡ đòn (Parry) chuẩn xác để tạo sơ hở cho cả đội phản công.
* **Phase 3 – Thức Tỉnh Tâm Hồn & Giải Cứu Bằng Bài Hát Ru (< 16% HP):**
  * Sát thương của người chơi không thể làm máu Sakuri giảm dưới 16%.
  * Sakuri đọc tâm trí Solei và bàng hoàng chấn động: **Lần đầu tiên trong đời, cô nghe thấy một tâm hồn hoàn toàn không có lời nói dối!**
  * **Tương tác Chuông Gió Đôi:** Solei giơ nửa chuông gió ngọc của mẹ; nửa chuông gió nứt vỡ trên cổ Sakuri tự động cộng hưởng ngân vang.
  * Solei tra kiếm vào vỏ, bước qua làn tuyết lạnh, cất tiếng hát ru năm xưa của người mẹ hòa cùng lời dặn của Ryozan (*"Nghe thấy tiếng thở của chính mình"*).
  * Sakuri rơi lệ, buông móng vuốt, mỉm cười thanh thản gục vào vòng tay Solei: *"Hóa ra... thế gian vẫn còn có người nói thật với ta..."*

---

## 6. CÁC CÂU ĐỐ MÔI TRƯỜNG (ENVIRONMENTAL PUZZLES)

### Câu đố 1: Cửa Đánh Lừa (Deceptive Door Puzzle - Area 18)
* **Thiết lập:** 3 cánh cửa (Đỏ son A, Xanh ngọc B, Đen mun C) dựng trên hầm chông. Cửa Đỏ son lộng lẫy nhất là bẫy mồi nhử chết người.
* **Manh mối giải mã:**
  1. *Độ sáng thực:* Nhìn qua gương nứt của mẹ để kiểm tra độ tương phản ánh sáng.
  2. *Vân gỗ:* Cửa thật làm từ gỗ gụ mộc nguyên khối có vân sóng nước đặc trưng.
  3. *Họa tiết cành mai:* Khắc chìm theo đúng thứ tự trên cuộn giấy người hầu để lại.
  4. *Dấu mòn chân tường:* Ngưỡng cửa có vết mòn rêu phong nơi lính hầu thực sự bước qua mỗi ngày.
* **Đáp án:** **Cửa B**. Chọn sai rơi vào phòng bẫy chém quay (Guillotine Trap Room).

### Câu đố 2: Điều Hướng Bão Tuyết Theo Âm Thanh (Blind Platforming - Area 22)
* **Thiết lập:** Bão tuyết xóa sạch tầm nhìn thị giác.
* **Giải pháp:** Sử dụng hệ thống âm thanh vòm (Spatial Audio). Người chơi lắng nghe hướng phát ra tiếng leng keng của chuông gió và tiếng gọi nhịp của Solei để bấm phím nhảy đúng hướng tiếp đất.

---

## 7. HƯỚNG DẪN TRIỂN KHAI CODE UNITY C# (`ChapterTwoMechanics.cs`)

Dưới đây là khung sườn triển khai mẫu các hàm xử lý logic quan trọng trong Unity:

```csharp
using UnityEngine;
using System.Collections;

public class ChapterTwoMechanics : MonoBehaviour
{
    [Header("Global Stage State")]
    public int currentArea = 1;
    public int heniTrust = 0;
    public float noiseLevel = 0f;
    public bool isRyozanPurified = false;
    public bool hasKurotakeMask = false;
    public bool twinChimesResonated = false;

    [Header("Pattern Counter System")]
    private int repeatedAttackCount = 0;
    private int lastAttackId = -1;
    public float enemyParryWindow = 4.0f;

    [Header("Boss Sakuri References")]
    public float sakuriHealth = 100f;
    public bool isSakuriFrenzy = false;
    public bool isLullabyAvailable = false;

    // 1. Quản lý Pattern Counter-Adaptation
    public bool RegisterPlayerAttack(int attackId, CharacterType activeChar)
    {
        // Ghost có tâm vô niệm -> Khắc chế hoàn toàn cơ chế phản đòn
        if (activeChar == CharacterType.Ghost)
        {
            repeatedAttackCount = 0;
            return true; // Đòn đánh trúng bình thường
        }

        if (attackId == lastAttackId)
        {
            repeatedAttackCount++;
            if (repeatedAttackCount >= 3)
            {
                TriggerEnemyEarParry();
                return false; // Bị kẻ địch phản đòn / đỡ đòn
            }
        }
        else
        {
            repeatedAttackCount = 1;
            lastAttackId = attackId;
        }
        return true;
    }

    private void TriggerEnemyEarParry()
    {
        Debug.Log("Kẻ địch Cái Tai đã đọc trước đòn đánh! Kích hoạt phản đòn.");
        // Phát âm thanh tiếng chuông Cái Tai ngân lên & hiện vệt sáng phòng thủ
    }

    // 2. Xử lý sát thương Sakuri (Non-lethal Cap 16%)
    public void ApplyDamageToSakuri(float damage)
    {
        sakuriHealth -= damage;
        if (sakuriHealth <= 50f && !isSakuriFrenzy)
        {
            TriggerSakuriFrenzyPhase();
        }

        if (sakuriHealth <= 16f)
        {
            sakuriHealth = 16f; // Khóa máu tối thiểu
            if (!isLullabyAvailable)
            {
                EnableLullabyInteraction();
            }
        }
    }

    private void TriggerSakuriFrenzyPhase()
    {
        isSakuriFrenzy = true;
        Debug.Log("Sakuri giật dải bịt mắt! Bắt đầu Phase Cuồng Loạn Khát Máu.");
        // Kích hoạt animation móng vuốt, tăng tốc độ di chuyển và đòn đánh
    }

    private void EnableLullabyInteraction()
    {
        isLullabyAvailable = true;
        Debug.Log("Sakuri kiệt sức! Cho phép Solei tiến lại kích hoạt tương tác Hát Ru (E).");
        // Hiển thị Prompt phím [E] và rung chuông gió ngọc đôi
    }

    // 3. Xử lý tương tác Hát Ru cuối cùng
    public void PerformFinalRescue()
    {
        if (isLullabyAvailable)
        {
            float requiredHoldTime = isRyozanPurified ? 1.0f : 3.0f;
            StartCoroutine(RescueRoutine(requiredHoldTime));
        }
    }

    private IEnumerator RescueRoutine(float holdDuration)
    {
        Debug.Log($"Bắt đầu hát ru trong {holdDuration} giây...");
        yield return new WaitForSeconds(holdDuration);
        
        Debug.Log("Thức tỉnh thành công! Sakuri rơi lệ buông móng vuốt. Chapter 2 Complete.");
        // Kích hoạt cutscene kết thúc và chuyển hướng sang Calvaria
    }
}

public enum CharacterType
{
    Deep,
    Solei,
    Ghost,
    Block,
    Tulas,
    Mark
}
```

---

## 8. TỔNG KẾT BẢN THIẾT KẾ
Tài liệu này đã bổ sung đầy đủ:
1. **Liên kết cảm xúc sâu sắc:** Bí mật mẹ Solei là dưỡng mẫu của Sakuri + Kỷ vật Cặp Chuông Gió Đôi.
2. **Chiều sâu chiến thuật Divergency:** Đưa Ghost vào làm khắc tinh của Cái Tai; Block dùng khiên cản dân phi bạo lực; Tulas dập lửa và hút bùn; Deep đập trống Taiko làm choáng Boss Rết.
3. **Pacing chặt chẽ:** Tách biệt 2 tầng leo núi đá nổi (Nhịp điệu vs Bão tuyết định vị âm thanh); biến các màn thu thập thành tương tác vật lý chiến đấu.
4. **Code sẵn sàng:** Đầy đủ logic biến số và hàm mẫu để tích hợp trực tiếp vào Unity.
