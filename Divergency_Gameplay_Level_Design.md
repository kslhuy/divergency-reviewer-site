# Divergency - Gameplay & Level Design theo cốt truyện hoàn chỉnh

Tài liệu này bám `Divergency_Complete_Story_VI.md` làm canon chính. Một số chi tiết từ bản nháp cũ được đưa lại khi chúng giúp Stage 1 rõ hơn, nhưng đã được chỉnh để không phá canon mới.

Mục tiêu là chuyển cốt truyện hoàn chỉnh thành game design: nhân vật chơi được, cơ chế có thể dùng, puzzle, encounter, boss, nhịp học kỹ năng, và ý tưởng cho từng màn.

## Trụ cột thiết kế

### 1. Sống sót nhờ tin nhau

Divergency không nên mở như câu chuyện của một "người được chọn". Trục chính nên là **đội của Deep, Solei, Henry và Block**: họ đã có lịch sử, có căn cứ, có mục tiêu giải cứu, và có lý do để tin hoặc nghi ngờ nhau. Stranger/Ghost là biến số quan trọng bước vào câu chuyện ở Bastonne, nhưng không nên giành vị trí nhân vật chính ngay từ đầu.

Cơ chế nên phản ánh điều này:

- **COMMAND** là lòng tin, không chỉ là điều khiển NPC.
- Cứu người thường làm màn khó hơn ngay lúc đó, nhưng mở đường, thông tin, hoặc kết quả tốt hơn về sau.
- Party không nên chỉ là nhiều skin đánh nhau; mỗi người có một cách giải quyết tình huống khác nhau.

### 2. Năm mảnh Thần Sơ Sinh là năm luật gameplay

Mỗi mảnh thần nên tạo một "luật chơi" riêng. Người chơi học từng luật qua từng Stage, rồi Stage 5 kiểm tra tất cả.

| Mảnh | Ý nghĩa truyện | Cơ chế gameplay |
|---|---|---|
| **Con Mắt** | Thấy ký ức, ham muốn, sợ hãi, thứ bị che giấu | Ảo giác, vật thể ẩn, enemy đọc hướng nhìn, đồ giả, boss tạo hình từ mong muốn |
| **Cái Tai** | Nghe tiếng nói, âm thanh, ý nghĩ từ xa | Stealth bằng tiếng động, boss đọc input/thói quen, puzzle nhịp âm thanh/im lặng , không nghe command|
| **Cái Lưỡi** | Nói bằng giọng người chết, biến niềm tin thành mệnh lệnh | Gọi tên làm khựng, lệnh giả đảo hành vi (command sai), puzzle phân biệt lời thật/lời bị bóp méo  , đánh đồng đội|
| **Trái Tim** | Khuếch đại cảm xúc, thù hận, tình thương, ý chí tập thể | Rage meter, địch buff theo đám đông, đánh trong giận dữ làm boss mạnh hơn |
| **Dây Rốn** | Nối Thần Sơ Sinh với nơi bên ngoài thế giới | Level biến dạng, ký ức các Stage trộn nhau, final boss đổi luật từng phase |

### 3. Bạo lực không phải đáp án sạch

Game vẫn có combat, nhưng nhiều encounter nên hỏi người chơi: "giết nhanh" có thật là cách tốt nhất không?

Ví dụ:

- Bastonne: Block cuối cùng vẫn được đội cứu, nhưng việc Stranger có giúp Block trong lúc nhà tù loạn hay không sẽ đổi mức độ tin tưởng, thương tích, và một số encounter sau.
- Laundel: cướp shop cho lợi tức thì nhưng mất lòng tin.
- Tàu ngầm: phá máy phát mở Hard Mode và loot tốt hơn, nhưng làm tình hình nguy hiểm hơn.
- Akam Meskul: đánh boss đồng thời phải cứu dân, phá loa tuyên truyền, không truy sát người đầu hàng.
- The Cradle: mục tiêu là trả mảnh thần qua Dây Rốn, không hồi sinh cũng không giết lại thần.

## Nhân vật và cơ chế

| Nhân vật | Vai trò đề xuất | Cơ chế dùng được | Câu hỏi cá nhân |
|---|---|---|---|
| **Solei** | Nhân vật tutorial/nhân vật vào game đầu tiên, speed/counter, đánh nhanh | Quick step, combo cơ bản, chưởng, counter đúng nhịp, đọc văn hóa/ngôn ngữ/dấu nghi lễ | Tôi thuộc về đâu? |
| **Deep** | Trưởng nhóm và heavy fighter, phá giáp, sát thương cao | Guard break, armor crush, giữ vị trí trước đòn mạnh, phá loa tuyên truyền | Sức mạnh của tôi có phải chỉ để người khác dùng không? |
| **Henry** | Chỉ huy/tactical support , bắn tỉa , tầm xa | COMMAND, đánh dấu mục tiêu, ra lệnh giữ vị trí, lệnh không sát thương | Tôi có thể chiến đấu mà không thành kẻ mình ghét không? |
| **Tulas** | Pháp sư máu/chất lỏng, support cơ động, tạo địa hình tạm | Điều khiển máu/nước/chất lỏng, bay/ngã chậm, tạo bệ, khiên, cầu, vật thể tạm, khóa dòng nước/bẫy | Sức mạnh đáng sợ có thể cứu người mà không biến tôi thành quái vật không? |
| **Block** | Tank và COMMAND partner | Giữ cửa, phá vách, khiên chắn, kéo cần, bảo vệ NPC | Lòng trung thành khác gì phục tùng? |
| **Stranger / Ghost** | Biến số trong Bastonne, playable ngắn lúc nhà tù loạn, linh hoạt nhưng không phải mở đầu | Dash/iframe, kháng gọi tên, tương tác Map Ngủ Mơ, đi qua máy nhận diện lỗi | Tôi là ai nếu quá khứ bị xóa? |
| **Heni** | Companion/puzzle key, không nên là DPS chính | Resonance với Heniana, nghe mạch Dây Rốn, mở ký ức, làm dịu nhiễu thần lực | Tôi là bản sao hay một người riêng? |


Mở game nên để người chơi điều khiển **Solei** ở căn cứ của đội Deep. Deep yêu cầu cô khởi động/luyện tập trước nhiệm vụ giải cứu Block: "Ta muốn cháu chứng minh cháu có thể tham gia nhiệm vụ lần này." Đây là tutorial tự nhiên cho di chuyển, đánh thường, combo, chưởng, né, counter, cầm/nhặt/ném vật thể, và nhịp teamwork.

Deep, Henry và Tulas có thể có lịch sử chung từ một cuộc chiến rất xa Marseille. Họ từng được gọi là anh hùng vì đã giải cứu một vùng đất khỏi thế lực hắc ám; cuộc chiến đó đã thắng, nhưng mất mát khiến họ không còn muốn sống như biểu tượng. Khi Deep nhận nuôi Solei, anh đưa cô đến Marseille để sống kín đáo hơn: làm việc, tránh chính quyền, thỉnh thoảng va vào băng nhóm nhưng cố không kéo Solei vào rắc rối lớn. Henry thì tiếp tục con đường ẩn danh, thu thập thông tin và bảo vệ những gì tình cờ lọt vào tay mình.

Trong Bastonne, game có thể cắt sang **Stranger** ở một đoạn ngắn khi nhà tù náo loạn. Lúc này người chơi học sự khác biệt của Stranger: không mạnh như đội Deep, nhưng lạ với hệ thống, khó bị nhận diện, và có thể thoát khỏi các khóa của Jamerson.

Nếu game không có party swap đầy đủ, vẫn nên giữ cảm giác nhân vật chính là **đội Deep/Solei**. Stranger/Ghost là nhân vật playable theo đoạn hoặc party member đặc biệt sau Bastonne, không phải người mở đầu game.

## Hệ thống chính

### Synergy và vật thể tương tác

Synergy nên là lớp phối hợp **vật lý/kỹ năng** giữa party, khác với COMMAND. COMMAND trả lời câu hỏi "ai giữ việc gì"; Synergy trả lời câu hỏi "hai nhân vật kết hợp để làm được hành động nào mà một người không làm được".

Các synergy chính:

- **Deep + Tulas:** Deep bám vào bệ/chùm chất lỏng của Tulas để lao lên không trung, đánh enemy bay, vượt vực, hoặc đập xuống phá giáp diện rộng.
- **Solei + Tulas:** Tulas tạo bệ/tay vịn tạm, Solei dùng speed/counter để chạy tường, nhảy qua bẫy, hoặc vào weakpoint trên cao.
- **Henry + Tulas:** Tulas dựng màn nước làm lệch đạn hoặc tạo thấu kính chất lỏng; Henry bắn xuyên để đánh dấu weakpoint, kích công tắc xa, hoặc làm ricochet có kiểm soát.
- **Block + Tulas:** Tulas gia cố khiên/đường chắn bằng chất lỏng đặc, Block giữ cửa, chặn dòng nước, chặn bẫy hoặc giữ tuyến trước projectile.
- **Ghost + Tulas:** Ghost đi qua vùng máy nhận diện lỗi, Tulas giữ vật thể/cửa ở trạng thái lỏng để Ghost lách qua hoặc kéo cơ quan từ phía bên kia.

Tulas không nên giải mọi puzzle một mình. Năng lực của anh nên có giới hạn: cần nguồn chất lỏng, tốn thời gian giữ hình, bị điện/nhiệt làm yếu, và nếu dùng máu quá nhiều thì tăng rủi ro narrative hoặc combat.

### Cầm, nhặt và ném vật thể

Nhân vật có thể cầm vật thể nhỏ/vừa và ném theo hướng chỉ định. Đây nên là mechanic chung, không chỉ là vũ khí tạm:

- **Combat:** ném ghế, chai, thùng kim loại, đá, bình gas để stun, phá guard, tạo tiếng động hoặc ép enemy đổi vị trí.
- **Puzzle:** ném vật vào công tắc xa, làm kẹt bánh răng, phá khóa yếu, đặt vật lên pressure plate, hoặc ném qua khe cho đồng đội.
- **Synergy:** Tulas có thể tạo vật thể/bệ tạm để nhân vật khác đứng lên, hoặc làm "tay" chất lỏng giữ một vật ở giữa không trung trước khi Deep/Solei/Henry tác động tiếp.
- **Rủi ro:** vật nặng làm nhân vật chậm, dễ bị đánh rơi; ném sai có thể gây tiếng động, phá cover, hoặc kích bẫy sớm.

### COMMAND

COMMAND không nên xuất hiện ngay khi Stranger gặp Block. Nếu làm vậy, cảnh này dễ bị cảm giác như người chơi đang điều khiển một NPC chưa có quan hệ gì với mình.

Flow hợp hơn:

1. **Tutorial teamwork ở căn cứ**: Deep hướng dẫn Solei phối hợp với đồng đội. Đây là nơi dạy assist/team cue cơ bản, chưa cần gọi là COMMAND đầy đủ.
2. **Nhiệm vụ Bastonne**: đội vào nhà tù để giải cứu Block, vì Block là người trong team hoặc đồng minh thân thiết đã bị Jamerson bắt.
3. **Đoạn Stranger**: Stranger tỉnh trong phòng biệt giam, nhớ lời Block dặn phải gây tiếng động. Prompt đầu tiên là nhặt/ném/đánh vật thể như **Throw Cup**, **Kick Bed**, **Break Lamp**, không phải "Command Block".
4. **Henry mở nhầm phòng**: đội đến vì tiếng động và tưởng Stranger là Block. Prompt kế tiếp mới là **Point to Block**, **Help Block**, **Open restraint**, hoặc **Slow the gas**.
5. **Nếu Stranger giúp Block**: Block thoát dễ hơn, ít bị thương hơn, và sau này là người đầu tiên trong đội nói rằng Stranger đã không bỏ mặc mình.
6. **Nếu Stranger không giúp Block**: Solei vẫn cứu Block trong route chính, nhưng Block bị thương hơn, đội mất thời gian hơn, và Henry/Solei có thêm lý do nghi Stranger.
7. **COMMAND chính thức** mở sau khi Block đã trở lại đội và người chơi dùng anh trong teamwork thật, không phải ngay khoảnh khắc Stranger gặp anh.

Cảm giác chính của COMMAND: đội không điều khiển nhau như công cụ, mà chia việc trong áp lực và tin người còn lại sẽ giữ phần của mình.

Với hệ thống command hiện có, nên xem COMMAND là **RTS-lite theo ngữ cảnh**, gần cảm giác ra lệnh nhanh trong AOE/Warcraft nhưng không biến Divergency thành game xây căn cứ hoặc micro quá dày. Người chơi vẫn điều khiển một nhân vật hành động chính; command chỉ mở một lớp chia việc ngắn, rõ, có mục tiêu trên màn.

Ba tầng dùng COMMAND:

1. **Lệnh combat thời gian thực:** dùng trong arena rộng, có nhiều phe ta/địch và nhiều mục tiêu cùng lúc. Đây là phần gần hệ thống command hiện có nhất: chọn General/đội, chọn hướng/formation/assist, rồi để AI giữ vai trò trong vài giây.
2. **Lệnh ngữ cảnh:** dùng khi đứng gần cửa, van, cầu, máy phát, loa tuyên truyền, thang máy, người bị thương. Người chơi không cần mở menu lớn; prompt ngắn như `Break Door`, `Hold Bridge`, `Turn Valve`, `Protect Heni` là đủ.
3. **Quyết định hội thoại hoặc minigame nhỏ:** dùng cho hành động có trọng lượng đạo đức hoặc nhịp cảnh, như không bắn người đầu hàng, thuyết phục dân chạy, hoặc giữ một công tắc trong lúc đồng đội đánh. Những việc này có thể là chọn thoại, giữ nút theo nhịp, hoặc mini objective, không nhất thiết là lệnh AI thuần.

Các dạng lệnh nên được hiểu theo vai trò thiết kế, không nhất thiết là enum riêng ngay từ đầu:

- **Hold:** Block giữ cửa, giữ khiên, giữ cầu, giữ tuyến cho dân chạy.
- **Break:** phá cửa, phá vách, phá giáp máy, phá loa tuyên truyền.
- **Switch:** gạt công tắc, khóa van, vận hành thang máy khi nhân vật chính ở khu khác.
- **Protect:** che Henry/Heni/NPC, giữ người bị thương khỏi đòn boss.
- **Hold Fire:** Henry ra lệnh không bắn người đầu hàng hoặc dân bị ép cải đạo.
- **Focus:** cả đội tập trung vào weakpoint hoặc enemy đang buff.

COMMAND nên có cooldown/nguy cơ. Ra lệnh sai lúc có áp lực có thể làm đồng đội bị thương, nhưng không nên biến thành hệ thống trừng phạt quá nặng.

### Map Ngủ Mơ Khi Chết

Cơ chế này đã nằm trong ghi chú gameplay của bản Complete. Đây là không gian giữa giấc mơ của Thần Sơ Sinh và ý thức Ghost.

Không nên dùng Map Ngủ Mơ ngay trong tutorial Solei ở căn cứ. Cơ chế này nên mở sau đoạn Bastonne, khi Stranger/Ghost đã xuất hiện và người chơi bắt đầu hiểu anh có liên hệ bất thường với Dây Rốn.

Ghost nên là chủ thể chính của Map Ngủ Mơ. Đây không phải hub tinh thần chung cho cả đội, mà là nơi ý thức Ghost bị kéo vào mỗi lần cái chết, ký ức, hoặc Dây Rốn chạm đến anh.

Với nhân vật khác, hệ thống vẫn dùng được nhưng cách kể khác:

- **Ghost chết hoặc đoạn chơi Ghost:** vào thẳng Map Ngủ Mơ, có thoại/tiếng gọi riêng, thấy ký ức và dấu hiệu Dây Rốn rõ nhất.
- **Solei/Deep/Henry/Block/Tulas bị hạ:** không biến họ thành chủ thể của Map Ngủ Mơ. Camera/transition nên cho cảm giác Ghost nghe được "tiếng vọng" của họ rồi kéo cả party về checkpoint hoặc điểm nghỉ.
- **Đổi skill/loadout cho cả đội:** vẫn có thể làm trong Map Ngủ Mơ sau Bastonne, nhưng mỗi nhân vật hiện như một echo, bóng ký ức, hoặc vật neo. Người chơi chỉnh build của họ qua Ghost, không phải vì họ tự mơ cùng một giấc mơ.
- **Heni:** là ngoại lệ cảm nhận được Dây Rốn/Heniana rõ hơn người khác. Cô có thể ổn định đường đi hoặc mở ký ức trong Map Ngủ Mơ, nhưng không nên thay Ghost làm chủ thể của không gian này.
- **Trước Bastonne:** Solei và đội Deep dùng căn cứ, trạm nghỉ, hoặc màn chuẩn bị bình thường. Không dùng Map Ngủ Mơ để tránh lộ Ghost quá sớm.
- **Trong The Cradle:** ranh giới này vỡ ra. Lúc đó cả đội có thể bước vào không gian Ngủ Mơ thật, nhưng payoff vẫn xoay quanh Ghost và Dây Rốn.

Về hệ thống, dùng làm:

- Respawn.
- Đổi skill/loadout.
- Reset kỹ năng bằng tài nguyên.
- Xem lại mảnh ký ức.
- Gợi dần tiếng gọi của Dây Rốn.

Tiến triển theo Stage:

- **Sau Bastonne:** phòng trắng, loa tù nhân, tiếng khí mê.
- **Sau Marseille:** nước cống, ánh Con Mắt trong bề mặt nước.
- **Sau Sakuri:** âm thanh xa, tiếng ý nghĩ bị lặp.
- **Sau Calvaria:** giọng người chết gọi tên cũ của Ghost.
- **Sau Akam Meskul:** nhịp tim làm méo menu.
- **Trong The Cradle:** Map Ngủ Mơ không còn là menu riêng, mà thành một phần thật của level.

### Trust và hậu quả nhỏ

Không cần morality meter to. Divergency không nên nói người chơi là "thiện" hay "ác" bằng một thanh điểm chung. Cách hợp hơn là để từng khu nhớ những việc cụ thể người chơi đã làm: đã giúp ai, đã phá gì, đã nói thật hay im lặng, đã cứu người trong lúc trận khó hơn hay chọn đường nhanh hơn.

Người chơi không cần thấy một UI `Good/Evil`. Họ chỉ thấy hậu quả qua phản ứng của NPC, độ khó của route, assist nhỏ, câu thoại khác, hoặc một chi tiết epilogue. Về kỹ thuật, đây là các flag/counter/state nhỏ được lưu trong save.

Có ba loại biến:

- **Flag:** sự kiện đã xảy ra hay chưa, ví dụ `BlockHelped`, `GrogerUnlocked`.
- **State:** trạng thái hiện tại, ví dụ `BlockInjuryState = Stable/Wounded/Critical`.
- **Counter/trust nhỏ:** điểm cục bộ trong một khu, ví dụ `LaundelTrust = -2..+2`, `Heat = 0..5`, `GrogerClues = 0..4`, `HeniTrust = 0..3`, `CalvariaTruthsFound = 0..5`.

Nguyên tắc dùng:

- Một biến chỉ nên ảnh hưởng khu của nó và 1-2 payoff về sau, không kéo thành nhánh truyện khổng lồ.
- Reward tốt nhất là **hữu ích nhưng không bắt buộc**: shortcut, giảm phục kích, assist trong boss, item riêng, hoặc thêm lựa chọn thoại.
- Hậu quả xấu không nên khóa canon chính. Ví dụ Block vẫn được cứu, Heni vẫn có arc riêng, Jamerson vẫn bị đánh bại; khác biệt nằm ở chi phí, lòng tin, và giọng kể.
- Payoff nên đến nhanh trong 10-20 phút sau lựa chọn, rồi có một echo nhỏ ở cuối game để người chơi nhớ mình đã làm gì.

| Biến | Loại | Tăng/đổi khi nào | Payoff gần | Payoff xa |
|---|---|---|---|---|
| `BlockHelped` | Flag | Ghost gây tiếng động để đội tìm thấy mình, rồi chỉ vị trí Block/mở restraint/làm chậm khí/phá chốt cửa cho Block trong Bastonne. | Block tỉnh hơn trong mini-boss Lockdown Unit, có thể giữ cửa/đỡ một đòn. Henry và Solei bớt nghi ngờ Ghost ở vài câu đầu. | Mở thoại Ghost-Block về chuyện "lòng trung thành không phải phục tùng". COMMAND với Block có cảm giác tự nhiên hơn sau khi anh trở lại đội. |
| `BlockInjuryState` | State | Bị ảnh hưởng bởi việc Stranger giúp hay bỏ qua, đội bảo vệ Block tốt hay tệ trong trận cứu, và cách người chơi xử lý Armorlite. | `Stable`: Block assist sớm. `Wounded`: assist có cooldown lâu hơn. `Critical`: đội phải bảo vệ Block trong một encounter phụ. | Ảnh hưởng vài cảnh Block giữ cầu/evac route. Không làm Block chết ngoài canon, chỉ đổi mức tổn thương và lòng tin. |
| `LaundelTrust` | Counter -2..+2 | Tăng khi mua công bằng, cất vũ khí, giữ lời với phe yếu, bảo vệ shop. Giảm khi cướp, phản bội, rút vũ khí trong chợ, hoặc lấy token của dân nghèo. | Giá shop, tin đồn, shortcut, số phục kích trong cống. | Nếu cao, NPC Laundel thả đèn/chỉ weakpoint khi gặp GROGER. Epilogue nói Laundel có thêm một tuyến tự quản thay vì chỉ là ổ tội phạm. |
| `Heat` | Counter 0..5 | Tăng khi phá quán/shop, đánh quá lâu, để cảnh sát báo động, hoặc chọn route ồn ào. Giảm khi hỏi đúng Jacques, dùng shortcut, giữ dân thường khỏi báo động. | Cảnh sát đến sớm hơn, Marius gọi reinforcement nhiều hơn, một số đường mặt đất bị khóa. | Echo nhỏ trong epilogue Marseille: thành phố có nhớ nhóm như tội phạm phá hoại hay như người phơi bày Bastonne. |
| `GrogerClues` | Counter 0..4 | Tăng khi tìm graffiti, phòng ẩn, tin đồn Áo Ghi, hoặc hỏi ông già ở chòi trước cống cuối. | Đủ clue mở lựa chọn truy GROGER chủ động; thiếu clue thì chỉ còn route bẫy nếu trust thấp. | Nếu đủ clue, hồ sơ GROGER được kể như bi kịch người bị bỏ lại, không chỉ là loot boss. |
| `GrogerUnlocked` | Flag | Bật khi `GrogerClues` đủ ngưỡng hoặc khi `LaundelTrust` quá thấp khiến phe khác đẩy nhóm vào bẫy GROGER. | Mở boss ẩn GROGER. Trust cao biến trận thành điều tra-horror có NPC hỗ trợ; trust thấp biến thành phục kích bẩn và thiếu ánh sáng. | Nếu xử lý tốt, Laundel có tin đồn mới: GROGER từng là người bị bỏ lại, không chỉ là quái. Nếu chỉ giết lấy loot, epilogue lạnh hơn. |
| `SubmarinePowerRoute` | State | `Stable` nếu người chơi dùng terminal để giữ điện; `Sabotage` nếu phá hai máy phát phụ. | `Stable`: tàu sáng hơn, terminal/log dùng được. `Sabotage`: Hard Mode, arena tối, ít telegraph, SheMal nguy hiểm hơn, nhưng loot/skill tốt hơn và một số thí nghiệm bị ngắt. | Epilogue Marseille ghi nhận phòng thí nghiệm mất dữ liệu sống nếu sabotage. Không nên đổi ending chính; chỉ đổi bằng chứng, độ khó, và giọng nói về cái giá của sabotage. |
| `HeniTrust` | Counter 0..3 | Tăng khi trả giá tử tế, không coi Heni như key item, hỏi consent trước khi dùng ký ức/resonance, giúp người bệnh quanh làng. Giảm khi ép cô, mặc cả tàn nhẫn, nói dối về Heniana, hoặc chỉ dùng cô như công cụ. | Heni bán/vừa tặng vật nhỏ, chỉ lối phụ, kể giấc mơ phòng trắng rõ hơn. | Resonance trong The Cradle ổn định hơn. Trong final, Heni có thêm câu tự chọn tên mình; trust thấp không phá canon nhưng cô ít chủ động mở lòng. |
| `CalvariaTruthsFound` | Counter 0..5 | Sửa tên người chết, tìm bằng chứng giáo hội làm giả lời tha thứ, giúp NPC nghèo nghe sự thật, phá khế ước giọng nói. | Ít skeleton hơn trong Dàn Hợp Xướng, giảm số lần Cái Lưỡi dùng giọng người thân để khóa nhân vật. | Dùng làm bằng chứng ở Stage 5 để thuyết phục một nhóm rút khỏi cổng vật tế. Epilogue Calvaria nói người sống tự nói lời tạm biệt. |
| `SlayerJungleStealth` | State | Bật khi vượt qua rừng mà không kích hoạt chuông báo động quá 3 lần ở 3-2. | Nếu thành công (Stealth), đội tuần tra Pháo đài Linh hồn (3-3) bị bất ngờ, làm giảm 30% lượng máu của đợt phòng thủ đầu tiên. | Giảm mức độ truy đuổi đô thị (Heat) cho toàn bộ Stage 3. |
| `SpiritFortressChoice` | State | `Destroy` nếu phá hủy các bình năng lượng linh hồn; `Purify` nếu giải phóng họ an toàn. | `Destroy`: Vách pháo đài sụp đổ nhanh, nổ lan dọn bớt lính xung quanh, nhưng tăng oán hận. `Purify`: Chống đỡ các đợt lính gác phản kích lâu hơn, nhưng giải phóng được linh hồn. | Nếu `Purify`, các linh hồn sẽ xuất hiện tạo lá chắn âm thanh bảo vệ đội trước chiêu cuối của boss Dàn Hợp Xướng (3-9). Nếu `Destroy`, linh hồn oán giận hóa thành quái cận chiến hỗ trợ boss. |
| `AkamCiviliansSaved` | Counter | Cứu người bị ép cải đạo, mở evac route, phá loa tuyên truyền, không đánh người đầu hàng. | Rage của Titan giảm, ít reinforcement, weakpoint mở lâu hơn. | Ở cảnh cuối, số dân hai phe cùng mở đường cho trẻ em/người bị thương thay đổi theo counter này. |
| `FinalMercyActions` | Counter | Trong The Cradle/final: Hold Fire, Disable Weapon thay vì giết, Protect Civilians, từ chối dùng Heniana/Heni như vật tế, không xử tử kẻ đã đầu hàng. | Phase Trái Tim trong final bớt sạc Rage, đồng đội có thêm assist bảo vệ. | Không tạo "good ending" riêng. Nó đổi tone epilogue: thắng bằng cách ít biến người khác thành chi phí hơn, hoặc thắng nhưng thế giới còn cay đắng hơn. |

Ví dụ kết hợp biến:

- `LaundelTrust` cao + `GrogerUnlocked`: dân Laundel hỗ trợ bằng đèn, tiếng gọi weakpoint, hoặc mở đường thoát sau boss.
- `LaundelTrust` thấp + `GrogerUnlocked`: GROGER xuất hiện trong tối, nhiều token mồi hơn, NPC khóa cửa vì sợ nhóm.
- `HeniTrust` cao + `CalvariaTruthsFound` cao: người chơi dễ nhận ra Cái Lưỡi đang giả giọng Heni/Heniana vì Heni từng kể chi tiết thật.
- `AkamCiviliansSaved` cao + `FinalMercyActions` cao: final boss vẫn khó, nhưng phase Trái Tim có nhiều khoảng thở hơn và epilogue bớt tuyệt vọng.

Điểm quan trọng: biến trust không phải để thưởng người chơi "ngoan". Nó làm thế giới nhớ các chi phí nhỏ mà người chơi đã chấp nhận hoặc né tránh.

## UI/UX, menu và flow ngoài gameplay

UI của Divergency nên đi cùng ngôn ngữ thị giác đã có trong các mockup hiện tại: nền tối, kim loại cũ, viền đồng/brass, điểm chọn màu vàng cũ, banner tím, xích, bánh răng, họa tiết góc và footer prompt cho tay cầm/bàn phím. Tránh cảm giác sci-fi neon sạch hoặc menu mobile quá phẳng. UI phải đọc được ở canvas nhỏ `805x456`, vì phần lớn asset hiện tại đã có preview theo tỷ lệ này.

Các asset UI hiện có nên được xem là reference chính:

- `imgs/UI/main_menu_sprites/`: main menu, logo, background, button và icon.
- `imgs/UI/Pause_menu_options_spritesheet.json` và `imgs/UI/pause_menu_options_sprites/`: pause/options overlay.
- `imgs/UI/settings_menu_sections/` và `imgs/UI/settings_menu_sprites/`: Settings theo tab Video/Audio/Controls/Gameplay/Misc.
- `imgs/UI/Character_selected_story_spritesheet.json` và `imgs/UI/character_selected_story_sprites/`: chọn nhân vật, map campaign, stage card, skill panel.
- `imgs/UI/in_game_hud_ui_skill_set/`: HUD trong gameplay, command wheel, skill hotbar, objective marker.
- `imgs/UI/Relay_IP_Room_design_notes.md` và `imgs/UI/relay_ip_room_sprites/`: phòng Relay/IP nếu Story có co-op hoặc lobby.

### Main Menu

Màn hình chính dùng background `main_menu_background_805x456.png` làm cảnh nền tĩnh/animated nhẹ. Logo Divergency ở trên/trái hoặc trên/giữa, không che nhân vật chính trong nền. Menu chính không cần giải thích dài; người chơi phải vào game nhanh.

Các nút chính:

- **Continue:** hiện khi có save gần nhất. Dòng phụ nhỏ ghi Stage/Act, ví dụ `Stage 1-2 Laundel`.
- **Start Story:** vào flow chọn slot hoặc Relay/IP room tùy chế độ chơi.
- **Heroes:** mở màn hình nhân vật/kỹ năng ngoài campaign. Nếu chưa mở đủ nhân vật, hiển thị silhouette hoặc locked card, không spoil Ghost/Heni quá sớm.
- **PvP / Relay:** chỉ bật nếu mode này thật sự có gameplay. Nếu chưa làm, đổi thành `Extras` hoặc ẩn để tránh hứa quá sớm.
- **Settings:** mở Settings overlay.
- **Quit:** thoát game, có confirm đơn giản.

Flow đề xuất:

1. `Continue` -> load autosave gần nhất.
2. `Start Story` -> chọn save slot.
3. Nếu chọn chơi online/co-op -> mở Relay/IP Room.
4. Nếu chơi single-player -> vào Stage 0 tutorial ở căn cứ Deep Team.

### Relay/IP Room

Màn Relay/IP chỉ dùng khi cần kết nối người chơi. Nó không nên thay thế main menu campaign nếu bản chơi hiện tại là single-player. Màn này giữ nền main menu đã dim, mở modal đồng/brass ở giữa, đúng hướng trong `Relay_IP_Room_design_notes.md`.

Nội dung chính:

- Tab **Relay** và **IP Local** ở trên.
- Danh sách phòng bên trái, 5 dòng là đủ cho canvas nhỏ.
- Khu host/join bên phải: region, slot, route, room code/host IP, nút `Host Room`, `Join Selected`, `Connect`.
- Hàng tên người chơi ở đáy modal.
- Nút settings và close ở góc phải, dùng cùng sprite với pause/settings.

### Character Select / Story Select

Màn character select không nên là "shop" nếu dùng trong campaign. Nó nên là màn **Story Party**: chọn nhân vật đang điều khiển, assist, reserve, skill loadout và Stage map.

Layout dùng asset `Character_selected_story` hiện có:

- Tab trái/phải: **Character** và **Map**.
- Cột trái: card nhân vật gồm Deep, Solei, Henry, Tulas, Block. Ghost chỉ mở sau Bastonne; Heni là companion/puzzle key, không đặt như DPS chính nếu story chưa cho phép.
- Trung tâm: nhân vật đang chọn, nameplate, class/role, chỉ số HP/ATK/DEF/SPD, skill slots.
- Dưới: `Current Fighter`, `Assist`, `Reserve`, nút `Ready`.
- Bên Map: các card Stage 1-1, 1-2, 1-3, 1-4, progression node và branch marker.

Luật mở khóa:

- Stage 0 đầu game: chỉ Solei trong tutorial, Deep/Henry/Tulas là assist theo cảnh.
- Sau Bastonne: Deep/Solei/Henry/Block có thể vào party tùy hệ thống swap; Ghost mở như special member hoặc route-specific playable.
- Stage 2: Heni xuất hiện như companion; UI phải gọi cô là **Heni**, không dùng nhãn kiểu `Clone`, `Copy`, `Key Item`.
- Khi nhân vật bị thương theo state như `BlockInjuryState`, card hiển thị trạng thái bằng icon nhỏ và mô tả gameplay, không khóa nhân vật một cách khó hiểu.

### Pause Menu

Pause menu là overlay lên gameplay đã làm tối, không đưa người chơi ra màn hình riêng trừ khi chọn map/settings. Asset hiện tại đã có hướng đúng với title `P1 PAUSED`, chain frame, purple banner và option buttons.

Các lựa chọn chính:

- **Resume:** quay lại gameplay.
- **Change Character:** mở Story Party/Character Select ở trạng thái gọn, chỉ cho đổi nhân vật hợp lệ trong party hiện tại.
- **Command List:** xem COMMAND đã mở, synergy, input, cooldown và ví dụ ngữ cảnh.
- **Options:** mở Settings trên cùng overlay pause.
- **Restart Map:** xác nhận trước khi restart checkpoint/map hiện tại.
- **Quit:** lựa chọn `Quit to Main Menu` và `Quit Game`, luôn có confirm nếu có tiến trình chưa save.

Quy tắc:

- Pause trong combat thường dừng game. Nếu có co-op/online, pause chuyển thành menu không dừng thời gian và cần label rõ.
- Trong cutscene, nút pause chỉ mở `Resume`, `Skip`, `Settings`, `Quit to Main Menu`.
- Nếu người chơi chết sau Bastonne, ưu tiên đưa về Map Ngủ Mơ/respawn flow thay vì pause menu thường.

### Options / Settings

Settings nên dùng bản section/tab hiện tại trong `imgs/UI/settings_menu_sections/`. Cấu trúc:

- **Video:** resolution, window mode, V-Sync, brightness, UI scale, damage numbers.
- **Audio:** master/music/SFX/voice, mute background audio, subtitles.
- **Controls:** keyboard, gamepad, remap, input buffer, vibration.
- **Gameplay:** difficulty assist, camera shake, hold/toggle choices, command slowdown, auto-lock options.
- **Misc:** language, save data, reset defaults, credits/legal.

Các setting quan trọng cho gameplay Divergency:

- **Command Slowdown:** `Off / Light / Full` để người chơi không bị quá tải khi dùng COMMAND.
- **Interact Prompt Size:** vì game có nhiều nhặt/ném/cửa/van/NPC.
- **Subtitles:** bật mặc định, có speaker name và background opacity.
- **Color/Contrast Aid:** cần cho poison, blood, water, rage, hidden objects.
- **Screen Shake:** slider, không chỉ toggle.
- **Hold vs Toggle:** guard, sprint, command wheel, lock-on.

### In-Game HUD

HUD phải giữ nguyên triết lý: không biến mọi lựa chọn thành morality meter. Không hiển thị thanh `Good/Evil`, không hiển thị `Trust +1` kiểu game hệ thống lộ liễu. Hậu quả thể hiện qua NPC, route, giá shop, encounter và epilogue.

HUD chính:

- Góc trên trái: portrait, tên nhân vật, HP, mana/energy, level, status icon.
- Góc trên phải: objective ngắn, icon map/skull/star nếu cần, không quá nhiều text.
- Đáy giữa/phải: skill hotbar `Q/W/E/R` hoặc gamepad equivalent.
- COMMAND: command wheel chỉ hiện khi giữ nút, có segment `Hold`, `Come`, `Free`, `Focus` hoặc lệnh ngữ cảnh.
- Scene marker: enemy guard HP/marker, ally nameplate, objective marker; chỉ hiện khi cần đọc combat.

Stage-specific UI:

- **Con Mắt:** UI có thể sai lệch nhẹ, hiện đồ giả hoặc objective mơ hồ, nhưng không được lừa người chơi bằng nút hệ thống nguy hiểm.
- **Cái Tai:** prompt âm thanh/im lặng, wave/noise indicator.
- **Cái Lưỡi:** command giả hoặc voice prompt bị méo; cần có cách phản biện bằng gameplay, không chỉ làm người chơi mất quyền điều khiển.
- **Trái Tim:** Rage/Heartbeat meter xuất hiện theo encounter, không dùng như thanh "ác".
- **Dây Rốn/The Cradle:** UI và level hòa vào nhau; Map Ngủ Mơ không còn là menu tách biệt.

### Save/Load và Checkpoint

Save screen nên hiển thị thông tin hữu ích nhưng không spoil:

- Stage/Act hiện tại.
- Thời lượng chơi.
- Nhân vật active/assist.
- Checkpoint gần nhất.
- Một dòng trạng thái thế giới nhẹ, ví dụ `Laundel remembers your route`, không ghi số trust cụ thể.

Autosave nên chạy ở:

- đầu Act,
- trước boss,
- sau boss,
- khi vào Map Ngủ Mơ,
- sau lựa chọn có flag/state quan trọng.

Manual save đặt ở căn cứ, safehouse, camp hoặc điểm nghỉ. Không cho save ngay giữa phase boss nếu nó phá encounter.

### Visual rules cho AI sketch UI

Khi tạo sketch UI, dùng brief ngắn này:

```text
Divergency UI concept, dark fantasy sci-fi action RPG, old brass frame, worn dark metal panels, muted gold active selection, purple hanging banners, chain and gear ornaments, readable 805x456 game UI layout, controller prompt footer, cinematic but functional, no neon futuristic HUD, no mobile-game clutter.
```

Màn cần sketch/hoàn thiện trước:

| Ưu tiên | Màn hình | Mục tiêu |
|---|---|---|
| 1 | Main Menu | Nhận diện brand, Start Story/Continue/Settings rõ |
| 2 | Pause Menu | Resume/Change Character/Command List/Options/Restart/Quit |
| 3 | Character Select / Story Party | Chọn active fighter, assist, reserve, skill loadout, map |
| 4 | Settings | Video/Audio/Controls/Gameplay/Misc, dễ đọc ở 805x456 |
| 5 | In-Game HUD | HP/mana/skills/objective/command wheel không che combat |
| 6 | Save/Load | Slot rõ, không spoil, có Stage/Act/checkpoint |
| 7 | Map Ngủ Mơ UI | Respawn/loadout/reset skill nhưng vẫn gắn với Ghost và Dây Rốn |

## Stage 0 - Căn cứ Deep Team và Bastonne Prison

### Mục tiêu gameplay

- Mở game bằng Solei và đội Deep, không phải Stranger.
- Dạy di chuyển, đánh thường, combo, chưởng, né, counter, đọc telegraph.
- Cho người chơi hiểu Block là người trong team/đồng minh cần được giải cứu.
- Sau tutorial, chuyển sang nhiệm vụ Bastonne và giới thiệu Stranger/Ghost như biến số trong nhà tù.
- Cho lựa chọn Stranger có giúp Block hay không, nhưng Block cuối cùng vẫn được đội cứu.

### Cơ chế dùng được

- **Training ở căn cứ:** Deep kiểm tra Solei bằng sparring, dummy, bài né đòn, bài combo, bài chưởng, và bài counter.
- **Team cue cơ bản:** Deep hoặc Henry hô nhịp để Solei học assist, đổi mục tiêu, phá giáp, né đòn lớn.
- **Tulas synergy drill:** Tulas tạo bệ chất lỏng, khiên nước, hoặc vật thể tạm để Solei/Deep học nhảy qua vật cản, chặn projectile, và đánh mục tiêu trên cao.
- **Cầm và ném:** nhặt thùng, ghế, chai, tạ tập hoặc lõi máy để ném vào công tắc, dummy có giáp, hoặc vùng tạo tiếng động.
- **Mission briefing:** mục tiêu rõ ràng là giải cứu Block khỏi Bastonne và lấy bằng chứng về thí nghiệm của Jamerson.
- **Khí mê:** giảm tầm nhìn/stamina theo chu kỳ, nhưng Stranger không ngủ như người khác.
- **Máy nhận diện tù nhân:** cửa/camera không biết xử lý Stranger vì anh không khớp hồ sơ.
- **Loa đọc mã số:** tạo nhịp đóng mở cửa và áp lực thời gian.
- **Lockdown:** cửa tự khóa, guard chuyển sang đội hình khẩn cấp.
- **Noise objective trong phòng giam:** Stranger phải tạo đủ tiếng động bằng cách đánh/nhặt/ném vật thể để Henry tìm đến.
- **Vật thể phòng giam:** đèn, hai cốc sứ, bàn kim loại nhẹ, giường sắt, bình vệ sinh đêm. Đánh giường có thể rơi mảnh kim loại; ném vỡ bình có thể rơi Stimpack cũ và mở UI máu lần đầu.

### Puzzle/encounter

- **Solei khởi động ở căn cứ:** Deep tạo bài kiểm tra ngắn. Người chơi học đi, nhảy/né, đánh thường, combo, chưởng, counter, nhặt/ném vật thể và synergy đơn giản với Tulas. Bài cuối là một sparring nhỏ chứng minh Solei đủ khả năng tham gia nhiệm vụ giải cứu Block.
- **Đột nhập Bastonne:** người chơi điều khiển Solei hoặc đội Deep trong đoạn đầu, học teamwork thật trong môi trường nguy hiểm.
- **Nhà tù náo loạn:** sau khi lockdown/gas/Con Mắt gây nhiễu, game cắt sang Stranger tỉnh dậy trong phòng biệt giam. Anh không có combo mạnh; bài chơi là sống sót, nhặt/ném đồ, và tạo tiếng động.
- **Gây tiếng động gọi đội:** người chơi phải tương tác với ít nhất 2-3 vật thể hoặc đạt ngưỡng noise. Càng ít vật thể bị phá, càng ít guard bị kéo đến; phá hết phòng có thể tăng `Heat` nhưng cho thêm vũ khí tạm.
- **Henry mở nhầm phòng:** đội phá cửa vì tưởng đó là Block. Cutscene ngắn: Henry hỏi về Block, Locke nghi kế hoạch lộ, Daniel báo guard đang tới. Người chơi có thể chỉ phòng Block hoặc chạy theo đội.
- **Cửa không nhận Stranger:** sau khi ra khỏi phòng, người chơi phải đứng trong vùng nhiễu hoặc dùng mã tù nhân để đánh lừa cửa.
- **Stranger gặp Block:** Block bị kẹt sau cửa thủy lực hoặc trong buồng đang bị bơm khí. Stranger có thể giúp bằng cách mở restraint, làm chậm khí, hoặc phá một chốt cửa. Đây là lựa chọn phụ trong lúc Stranger đang tìm đường thoát, không phải nhiệm vụ chính của anh.
- **Nếu Stranger không giúp:** cảnh cắt về Solei. Solei và đội vẫn cứu Block, nhưng phải đánh thêm một encounter, Block bị thương hơn, hoặc mất một shortcut.
- **Nếu Stranger giúp:** khi Solei tới nơi, Block đã có cơ hội chống đỡ hoặc tự bò ra khỏi vùng khí. Đội vẫn là người đưa Block ra ngoài, nhưng Block nhớ Stranger đã không bỏ mặc anh.

### Boss/mini-boss đề xuất

Có thể dùng hai mini-boss nhỏ thay vì một boss lớn:

1. **Training Bout ở căn cứ:** Deep hoặc drone tập luyện kiểm tra Solei. Đây là tutorial combo/chưởng/counter, không phải trận sinh tử.
2. **Bastonne Lockdown Unit:** mini-boss trong nhà tù khi đội cứu Block.

- Khiên lớn, súng điện, drone khóa mục tiêu.
- Dạy phá guard, né đòn điện, dùng môi trường và teamwork.
- Nếu Stranger từng giúp Block, Block có thể tỉnh đủ để tự giữ một cửa/đỡ một đòn trong trận. Nếu không, đội phải bảo vệ Block bị thương.

## Stage 1 - Marseille

## 1-1. Quán bar Armorlite

### Mục tiêu gameplay

- Biến Armorlite thành điểm lấy thông tin/safehouse, không phải một quán bar chỉ để đánh nhau ngẫu nhiên.
- Có thể mở bằng một đoạn ngắn ở trụ sở/garage của đội Deep để chuẩn bị nhiệm vụ, rồi chuyển sang Armorlite gặp Jacques.
- Dạy combat nhóm trong không gian chật khi cuộc xô xát đã bị kéo đến từ ngoài phố.
- Dạy vũ khí môi trường.
- Đặt quan hệ căng giữa Stranger/Ghost và đội sau Bastonne, nhưng trọng tâm gameplay vẫn là nhóm Deep/Solei.
- Gắn `BlockHelped`, `BlockInjuryState` và `Heat` vào payoff đầu tiên để lựa chọn Bastonne có trọng lượng ngay trong 10-20 phút sau đó.

### Cơ chế dùng được

- **Hỏi tin Jacques:** chọn chủ đề về bến cảng, đường cống, cảnh sát mật, băng đua xe, hoặc người bị đưa ra ngoài khơi. Hỏi đủ ý mở shortcut hoặc giảm phục kích.
- **Chuẩn bị ở garage/safehouse:** kiểm tra Block bị thương, đổi loadout, nghe Henry/Deep thống nhất mục tiêu trước khi xuống phố. Đây là màn chọn nhân vật ngắn sau chase.
- **Vật thể quán bar:** chai, cốc, ghế, bàn bi-da, đèn neon, cửa kính, thùng đá. Nhân vật đang được chọn sẽ xin lỗi Jacques rồi ném vật đang cầm để mở combat.
- **Heat đô thị:** phá quá nhiều hoặc đánh quá lâu làm cảnh sát đến sớm.
- **Block bị thương:** Block luôn được cứu khỏi Bastonne, nhưng nếu Stranger không giúp ở đoạn nhà tù loạn thì Block bắt đầu Stage 1 với thương tích nặng hơn hoặc Max HP thấp hơn, buộc người chơi chú ý bảo vệ.
- **Mâu thuẫn có sẵn:** băng đua xe đã ghét đội Deep/Henry từ trước vì nhóm từng phá tuyến vận chuyển người, xăng và thuốc của chúng. Chúng bám theo đội đến Armorlite, không phải tự nhiên xuất hiện chỉ vì một cuộc nói chuyện.
- **Moto telegraph:** mũi tên cảnh báo hướng xe lao vào, thời gian tăng tốc ban đầu chậm hơn người chơi để dạy né/nhảy đánh, sau đó mới nhanh dần.
- **Moto rider state:** đánh sau lưng chỉ hất người ngồi sau nếu có passenger; đánh trực diện hoặc dùng vũ khí ném đúng lúc có thể hất cả xe.

### Puzzle/encounter

- **Nói chuyện với Jacques:** hỏi đủ thông tin mở đường cống thuận lợi hơn; hỏi thiếu thì vẫn đi tiếp được nhưng bị dẫn qua đoạn đông địch hơn.
- **Quán bar thành arena:** bàn ghế bị phá sẽ đổi đường đi, có thể tạo cover hoặc tự chặn đường.
- **Băng đua xe ngoài phố:** cuộc phục kích bắt đầu ngoài quán sau khi chúng nhận ra nhóm. Ba kẻ đầu tiên bị văng ra phố; một tên gục ngay, hai tên còn nửa máu. Dạy né đòn lao nhanh và vùng lửa, đồng thời cho thấy Marseille đã có nhiều món nợ cũ với đội.
- **Vũ khí đường phố:** nắp thùng rác, tuýp nước, chai thủy tinh, thanh gỗ, vũ khí rơi từ enemy. Vật ném là cách tốt để hất rider khỏi xe trước khi chúng tăng tốc.

### Boss

**Thủ lĩnh băng đua xe**

- Phase 1A: cưỡi moto lớn, lao ngang, quay xe, để lại vạch lửa. Cần đánh trúng từ phía sau hoặc dùng vũ khí ném đúng timing để làm hắn ngã; mỗi lần ngã chỉ mở cửa sổ gây tối đa khoảng 25% HP.
- Phase 1B: khi đi bộ tạm thời, dùng chém dọc, chém ngang, chém hất chống jump spam, rồi lao nhanh áp sát trước khi leo lại moto.
- Phase 2: dưới 50% HP, rút kiếm gia truyền. Không còn dễ bị hất khỏi xe, gọi đàn em chạy cắt màn hình khoảng 20 giây, tăng tốc nhanh hơn và có combo 3 nhịp khi lướt qua người chơi.
- Special: cắm mũi kiếm xuống đường khi tăng tốc, tạo tia lửa và vệt lửa tồn tại ngắn. Nếu người chơi đứng gần quá lâu khi boss nổ máy, boss quay vòng tại chỗ gây sát thương diện rộng.
- Henry có thể đánh dấu lúc boss quay xe; Solei có cửa sổ counter tốt; Deep phá giáp khi boss đi bộ; Block nếu bị thương nặng chỉ nên assist phòng thủ.

## 1-2. Đường cống và chợ ngầm Laundel

### Mục tiêu gameplay

- Dạy hub nhỏ, faction, shop choice.
- Cho người chơi thấy Marseille ăn thịt người cả ở tầng dưới.
- Tạo nhịp tương phản: cống hẹp/tối trước, rồi Laundel mở ra như một ga metro/chợ khổng lồ dưới lòng đất.

### Cơ chế dùng được

- **Token economy:** mua, mặc cả, làm việc cho phe, hoặc cướp.
- **Luật chợ:** cất vũ khí thì đi qua được; rút vũ khí biến hub thành combat zone.
- **Faction route:** Áo Đen của Jamerson, Xanh Dương bảo kê người nhập cư/thương nhân, Áo Ghi buôn tin và đưa đường.
- **Nước cống:** van nước, dòng chảy, phòng ngập, quái phục kích. Enemy spawn ở trạng thái bơi bị tăng sát thương/stun khi trúng đòn đầu, nhưng mất debuff nếu nhảy lên bờ.
- **Shop specialization:** Áo Đen bán vũ khí cận chiến/thuốc tăng damage; Xanh Dương bán hồi máu, vũ khí tầm xa và bẫy; Áo Ghi bán tin, đổi token, mở shortcut.
- **Enemy shopping:** một số enemy có thể chạy vào shop để mua buff. Nếu người chơi không chặn, encounter khó hơn nhưng shop không bị phá.
- **Laundel layout:** map chính khoảng 4-5 màn hình x 2 tầng; đường ray thấp có nhiều hồi máu/buff, bến ga cao có nhiều vũ khí và shop.

### Puzzle/encounter

- **Mua hay phá shop:** mua mở trust, item hiếm, đường dẫn; phá cho lợi nhanh nhưng tăng phục kích.
- **Graffiti GROGER:** tìm đủ graffiti, hỏi Áo Ghi và ông già trước cửa cống cuối để mở boss ẩn.
- **Van nước nhiều người:** Block giữ cần, Solei chạy qua cửa, Henry bắn khóa van từ xa.
- **Lời mời Áo Đen:** đầu Laundel có cutscene một nhóm Áo Đen đến "mời" đội gặp thủ lĩnh. Số người quá đông cho một lời mời nên chuyển thành combat tutorial token.
- **Shop đầu tiên:** Xanh Dương bán hồi máu/vũ khí tầm xa và giải thích luật chợ. Nếu người chơi tấn công shop này, `LaundelTrust` tụt mạnh và chợ spawn thêm quái từ kiosk xung quanh.
 

### Boss theo route

- Giữ lời với Xanh Dương/Áo Ghi: đánh thủ lĩnh Áo Đen ở tầng 0 của chợ.
- Phản bội hoặc cướp nhiều: bị dẫn vào tuyến cống nguy hiểm hơn, có thêm miniboss hoặc phục kích trước boss.
- Tìm đủ điều kiện qua `GrogerClues`: mở **GROGER** chủ động; trust quá thấp có thể biến GROGER thành bẫy bắt buộc.

### Boss ẩn GROGER

GROGER nên là sản phẩm của Laundel, không chỉ là quái. Ý tưởng mạnh nhất: một người nhập cư bị bỏ lại trong cống, ăn token, rác, xác chết và lời đồn đến khi thành truyền thuyết.

Cơ chế:

- Arena có token rơi. Nhặt token giúp người chơi mua/đổi sau trận, nhưng làm GROGER hung hãn hơn.
- GROGER lặn trong nước, chỉ lộ khi người chơi tạo tiếng động hoặc bật đèn.
- Nếu `LaundelTrust` cao, NPC có thể thả đèn/chỉ điểm weakpoint.

## 1-3. Đường cống chính và hoàng hôn bến cảng

### Mục tiêu gameplay

- Dạy ưu tiên mục tiêu.
- Chuyển từ cống ngầm sang phục kích quân sự.
- Tạo khoảng lặng bến cảng trước khi đánh lớn.
- Thử COMMAND trong một không gian rộng hơn, có nhiều đồng minh, nhiều địch, và nhiều objective chạy song song.

### Cơ chế dùng được

- **Pack leader:** quái đầu đàn buff đàn nhỏ; giết đầu đàn làm đàn nhỏ chậm/dễ stun.
- **Nước sâu tăng dần:** đầu màn còn nhiều lối gạch khô; về cuối nước chiếm phần lớn arena, làm người chơi chậm nếu đi thấp nhưng cho cơ hội đánh quái khi chúng còn bơi.
- **Phòng ẩn/safe room:** cửa bảo trì, vách nứt, dấu phấn hoặc graffiti dẫn vào phòng của người tị nạn cũ, tàn dư Áo Đen, hoặc clue GROGER.
- **Sniper laser:** buộc di chuyển liên tục, dùng cover.
- **Cận chiến có tín hiệu rút súng:** enemy đổi từ dao sang súng, có audio/visual cue.
- **Container cover:** có thể đẩy/kéo để chặn laser.
- **Command RTS-lite ở bến cảng:** người chơi vẫn đánh trực tiếp, nhưng có thể ra lệnh ngắn cho đội giữ cầu, phá khóa container, bảo vệ thuyền, hoặc focus sniper/pack leader. Chỉ nên có 2-3 objective active cùng lúc để không quá tải.
- **Target marker:** Henry đánh dấu mục tiêu ưu tiên; Block/Deep/Solei nhận lệnh theo vai trò thay vì cần người chơi micro từng bước.
- **Heat reinforcement:** `Heat` từ 1-1/1-2 quyết định số đợt cảnh sát mật và thời điểm sniper xuất hiện ở bến cảng.

### Puzzle/encounter

- **Phòng sơ tán thất bại:** phòng ẩn chứa vali, giấy nhập thành, đồ chơi. Dùng để thưởng lore và tài nguyên.
- **Cầu cống rộng:** Block giữ tuyến cho NPC/đội chạy qua, Deep phá mảng tường chặn lối, Henry focus pack leader. Đây là bài test đầu tiên cho Hold/Break/Focus theo ngữ cảnh.
- **Khoảng lặng hoàng hôn:** sau khi ra khỏi cống, khóa combat khoảng 30 giây nhưng vẫn để người chơi tự đi. Nhạc nhẹ, hội thoại ngắn về việc rời Marseille, rồi điểm hẹn thuyền trống phá vỡ hy vọng đó.
- **Autopilot boat:** sau phục kích, không chỉ giết hết địch; phải giữ vị trí đủ lâu để thuyền khóa đường đến tàu ngầm. Người chơi có thể giao một đồng đội giữ bảng điều khiển trong lúc nhân vật chính xử lý sniper.

### Boss

**Marius Vane**

- Không dùng thần lực; dùng smoke, dao, súng, sniper support.
- Phase cuối gọi reinforce theo Heat còn lại.
- Điểm thiết kế: Marius là bộ mặt lạnh của Marseille, coi người nhập cư/tù nhân/người bệnh là chi phí vận hành.

## 1-4. Tàu ngầm nghiên cứu và SheMal

### Mục tiêu gameplay

- Chuyển sang horror phòng thí nghiệm.
- Dạy Con Mắt: ảo giác, mẫu thí nghiệm, vật thể giả.
- Mở route khó "mất điện".
- Cho người chơi chọn giữa route khám phá bằng terminal và route sabotage phá máy phát.

### Cơ chế dùng được

- **Áp suất tàu:** mở một cửa khóa cửa khác; phải chia vai.
- **Bình chứa thí nghiệm:** đánh bừa làm vỡ, thả quái phụ.
- **Con Mắt:** tạo loot giả, cửa giả, bóng Jamerson/Heniana.
- **Ba terminal:** phòng trưởng lính gác, kho dữ liệu thí nghiệm, phòng kiểm soát áp suất. Dùng đủ ba terminal mở lò phản ứng trung tâm theo route ổn định.
- **Hai máy phát phụ:** phá đủ hai máy phát đặt `SubmarinePowerRoute = Sabotage`, mở cửa boss sớm nhưng làm nhiều phòng mất điện.
- **Logic ánh sáng:** vật thí nghiệm thất bại sợ ánh sáng thường và còn bị guard điều khiển phần nào. Khi phòng mất điện/chuyển đèn đỏ, guard bị giết, quái tăng tốc và tăng sát thương.
- **Wall-bounce tàu ngầm:** đòn đánh bay mạnh vào vách/ống khí có thể bật enemy lại thành projectile gây sát thương cho mục tiêu đầu tiên va phải; mỗi enemy có cooldown để tránh lạm dụng.
- **Route mất điện:** phá máy phát làm Hard Mode, loot/skill tốt hơn.

### Puzzle/encounter

- **Cứu tù nhân thí nghiệm:** mở khóa từng buồng làm timer khó hơn, nhưng tăng bằng chứng về Jamerson.
- **Hồ sơ Heniana:** đọc đủ log giảm một phase ảo giác trong boss hoặc mở thoại riêng.
- **Nguồn điện phụ:** người chơi chọn giữ điện ổn định để dễ đi, hoặc phá để ngăn thí nghiệm và nhận reward mạnh hơn.
- **Map tàu:** đầu màn cho người chơi sơ đồ phòng rõ tên. Nếu đi terminal route, map đánh dấu phòng cần tới; nếu sabotage, map hiển thị khu mất điện sau mỗi máy phát bị phá.
- **Cửa nhìn ra biển:** vài đoạn không combat cho thấy tàu đang di chuyển, sinh vật biển lướt ngoài kính, và loa của Jamerson bắt đầu nói như đang thu dữ liệu từ chính trận đánh.

### Boss

**SheMal**

- SheMal nghiêng về cận chiến như một fighter hạng nặng: kích thước ngang Deep, áp sát nhanh, dùng móng vuốt dài ở hai tay để cào, chém chéo, phản đòn và khóa khoảng cách.
- Phase 1: cơ thể lai, grab, lao tường, wall bounce, combo móng vuốt ba nhịp. Người chơi phải đọc footwork thay vì chỉ né projectile.
- Phase 2: liên kết Con Mắt, tạo ảo ảnh Heniana/Jamerson. Đánh nhầm ảo ảnh làm boss hồi hoặc đổi pattern.
- Phase 3 nếu mất điện: ít telegraph hơn, arena tối hơn, nhưng weakpoint sáng rõ theo nhịp.
- Phase transition: mỗi lần SheMal hấp thụ thêm năng lượng từ lò phản ứng, một số buồng thí nghiệm phụ mở ra và thả failed subjects. Nếu `SubmarinePowerRoute = Sabotage`, số buồng ít hơn nhưng quái dữ hơn.

Kết màn phải dẫn được sang Sakuri: SheMal có bản đồ bán đảo, ký hiệu Cái Tai, và ghi chú "nghe tiếng bệnh trong máu ngủ đông".

## Stage 2 - Sakuri

### Định hướng Sakuri và Ryozan

- Sakuri nên đáng thương nhiều hơn là ác. Cô có lúc mất kiểm soát vì Cái Tai bắt cô nghe máu, nhịp bệnh, lời nói dối và ham muốn của người khác quá lâu.
- Cơn khát máu có thể được trình bày như triệu chứng gần ma cà rồng: không phải cô thích giết người, mà cơ thể bị nhiều dòng máu/thần lực kéo lệch, khiến cô thèm tiếng mạch máu và dễ bùng nổ khi bị dồn.
- Ryozan không nên chỉ là nạn nhân bị Sakuri ghét. Ông từng có tình cảm bảo hộ, thương xót, hoặc lời thề với Sakuri, rồi bị gia tộc/lãnh chúa hãm hại. Bi kịch là cả hai bị đẩy vào vai trò làm hại nhau.
- Boss Ryozan nên xuất hiện trước trận Sakuri, ở rừng tre/thác nước/cầu núi, để 2-4 tập trung vào Sakuri và Cái Tai.

## 2-1. Làng chài và Heni

### Mục tiêu gameplay

- Giảm nhịp sau Marseille.
- Giới thiệu Heni như con người, không phải key item.
- Dạy investigation/social nhẹ.

### Cơ chế dùng được

- **Bệnh dịch là hazard mềm:** giảm hồi máu/stamina khi đi qua vùng bệnh lâu.
- **Shop của Heni:** mua vật nhỏ, thuốc, cá khô; cách người chơi trả giá ảnh hưởng `HeniTrust`.
- **Dân làng:** thông tin về cha Heni, mẫu máu, giấc mơ phòng trắng.

### Puzzle/encounter

- **Ba dấu hiệu nhân bản:** ảnh Heniana, giấc mơ phòng trắng, lịch gửi mẫu máu.
- **Cha hiền là điệp viên:** có thể phát hiện qua radio, sổ ghi cơn sốt, tuyến gửi hàng.
- **Không làm xấu mặt cảng:** người bệnh bị đẩy ra rìa. Giúp họ mở đường phụ lên khu cách ly.

## 2-2. Khu cách ly và đường lên thủ phủ

### Mục tiêu gameplay

- Dạy stealth/route bằng âm thanh.
- Biến Cái Tai thành luật chơi trước khi gặp Sakuri.
- Đặt arc của Solei: bị gọi là người ngoài ở cả hai phía.

### Cơ chế dùng được

- **Sound cone:** chạy, phá thùng, bắn súng làm patrol nghe thấy.
- **Dây đánh dấu bệnh:** màu dây cho biết người bệnh bị phân loại thế nào.
- **Escort Heni mềm:** Heni tự nấp ở điểm an toàn, không nên phải babysit liên tục.

### Puzzle/encounter

- **Chuông cách ly:** tắt bằng bắn dây, leo lên, hoặc dùng Block giữ thang.
- **Kho người còn lao động:** cứu họ mở shortcut nhưng tăng patrol.
- **Đường thuốc:** giữ thuốc làm consumable hoặc đem cho trại bệnh để lấy thông tin/thay đổi epilogue.

## 2-2B. Rừng tre, thác nước, cầu đá và Ryozan

### Mục tiêu gameplay

- Tạo màn chuyển nhịp giữa khu cách ly và thủ phủ.
- Dùng địa hình thiên nhiên để dạy âm thanh, tầm nhìn, mép vực, và command giữ cầu.
- Cho Ryozan thành bi kịch riêng trước khi người chơi gặp Sakuri.

### Cơ chế dùng được

- **Rừng tre:** thân tre che line of sight, gãy khi bị đánh mạnh, tạo tiếng động kéo patrol hoặc boss đổi hướng.
- **Thác nước:** tiếng nước che bước chân và che command voice; đứng gần thác giúp né Cái Tai nhưng khó nghe telegraph.
- **Mép núi đá:** knockback nguy hiểm, nhưng cũng có thể dùng Break/Hold để làm sập mảng đá chặn quân đuổi.
- **Cầu đá/cầu gỗ hẹp:** Block giữ cầu, Deep phá chốt, Solei vượt nhanh qua dây treo, Henry focus kẻ bắn xa.

### Boss

**Ryozan oan hồn**

- Phase 1: một thực thể lưỡng cư/non trẻ như nòng nọc đen, kéo lê phần đuôi linh hồn dưới mặt nước và bám vào chân cầu. Nó không phải hình dạng thật của Ryozan, mà là lời thề bảo vệ Sakuri bị yểm thành thứ chưa hoàn chỉnh.
- Phase 2: hiện lại dáng tướng quân mặc giáp đỏ, cầm đao dài, đánh kỷ luật và nặng. Các đòn chính là chém ngang giữ cầu, đâm dài ép khoảng cách, và dậm cán đao tạo sóng âm qua ván cầu.
- Cách thắng tốt không chỉ là đánh cạn máu. Người chơi có thể phá ba mũi yểm trên cầu để Ryozan nhớ lại rằng ông từng muốn cứu Sakuri, không phải canh tù cho cô.

## 2-3. Quốc lộ, chợ trung tâm, và cung điện

### Mục tiêu gameplay

- Cho thấy Sakuri không phải quê hương lý tưởng.
- Dùng chợ như social puzzle.
- Đưa người chơi từ đời sống xa hoa của thủ phủ vào cung điện và DeceptiveDoorPuzzle.

### Cơ chế dùng được

- **Giấy thông hành/dấu gia tộc:** disguise nhẹ, không biến thành stealth game hoàn toàn.
- **Tin đồn là resource:** nghe đủ tin mở đường vào cung điện.
- **Cái Tai đọc thói quen:** spam một hành động nhiều lần làm enemy đoán được.
- **DeceptiveDoorPuzzle:** trong cung điện có cụm cửa đánh lừa bằng màu sắc. Đáp án đúng không phải màu người bình thường thấy, mà là cách người mù màu/nhìn lệch màu phân biệt độ sáng, biểu tượng phụ, vân gỗ và thứ tự cửa.

### Puzzle/encounter

- **Búp bê mặt Heni:** nếu điều tra thay vì phá shop, người chơi biết Heni đã bị bán thành biểu tượng.
- **Hồ sơ Ryozan:** ghép chuyện Ryozan bị hãm hại để hiểu vì sao oan hồn của ông còn giữ cầu lên núi.
- **Chợ nghe lén:** đứng cạnh nguồn ồn để che bước chân và nghe gia tộc nói chuyện.
- **Cửa nhìn sai:** người chơi có thể dùng ghi chú của người hầu, tranh phai màu, hoặc góc nhìn của Heni/Ghost để chọn cửa theo logic mù màu. Chọn theo màu rực rỡ nhất sẽ vào phòng bẫy hoặc quay lại hành lang cũ.

## 2-4. Đền ngầm, đỉnh núi và Sakuri

### Mục tiêu gameplay

- Boss dùng âm thanh, đọc ý định, và áp lực tâm lý.
- Đưa Cái Tai lên thành mechanic rõ ràng.
- Tạo cảnh gặp Sakuri trên đỉnh núi: cành sakura dày, đá lơ lửng, nền đền bị xé khỏi mặt đất.

### Cơ chế dùng được

- **Audio telegraph:** nhiều đòn báo bằng âm thanh. Cần có visual cue/subtitle cho accessibility.
- **Input reading có giới hạn:** Sakuri chỉ đọc được nếu người chơi lặp pattern quá rõ.
- **Phòng im lặng:** tắt nguồn âm khiến Sakuri yếu hơn, nhưng người chơi cũng mất audio cue.
- **Đá lơ lửng:** platform đổi vị trí theo nhịp âm; đánh lệch nhịp làm đá rơi hoặc mở đường sai.
- **Cành sakura:** hấp thụ một số sóng âm, có thể dùng làm cover tạm, nhưng bị héo nếu Sakuri mất kiểm soát cơn khát máu.

### Boss

**Sakuri**

- Sakuri: sóng âm, ảo giác, đọc input, và những cơn bùng nổ khát máu ngắn khi cô nghe quá nhiều nhịp mạch quanh mình.
- Nếu Ryozan được giải yểm ở 2-2B, trận Sakuri có ít add cận chiến hơn và có một cửa sổ cô dao động khi nghe lời thề cũ của ông. Nếu không, giáp đỏ của Ryozan chỉ còn như dư âm bảo vệ máy móc trong một số pattern.
- Ghost gần như không có tiếng nội tâm, tạo khoảng trống làm Sakuri sợ. Đây có thể là cửa sổ burst.
- Solei nên có moment từ chối để Sakuri/địa phương định nghĩa cô bằng dòng máu.

Kết màn: Cái Tai dẫn đến Calvaria và Cái Lưỡi; Heni quyết định đi cùng nhóm.

## Stage 3 - Calvaria

## 3-1. Con đường đơn độc (Solitary Road)

### Mục tiêu gameplay

- Tạo không khí yên tĩnh, u ám xen kẽ hành động nhẹ nhàng để chuyển tiếp nhịp độ sau trận chiến Marseille.
- Dạy người chơi cách xử lý tầm nhìn hạn chế và quái vật dạng vong linh (wandering souls).
- Giới thiệu mối liên hệ kỳ lạ của Ghost với Cái Lưỡi thông qua tiếng gọi ảo giác nhỏ.

### Cơ chế dùng được

- **Sương mù dày đặc:** giảm tầm nhìn của lính bắn tỉa và tầm bắn xa của Henry, buộc người chơi tiến sát hoặc dùng Solei do thám.
- **Bia mộ có thể tương tác:** phá hủy bia mộ gỗ/đá để tìm mảnh hồi sinh stamina hoặc đạn nhẹ cho Henry.
- **Wandering Souls (Vong hồn lang thang):** loại quái vật bay lơ lửng, lướt chéo qua màn hình theo nhịp bất định. Chúng không thể bị đánh bại bằng sát thương vật lý thường của Deep mà phải dùng chưởng/kỹ năng năng lượng của Solei hoặc bắn tỉa của Henry.

### Puzzle/encounter

- **Lối đi sương mù:** Solei phải chạy trước, dùng kỹ năng dò thám để đánh dấu các bia mộ ẩn chứa bẫy trước khi cả nhóm đi qua.
- **Tụ linh trận:** một kết giới chắn ngang đường do Giáo hội thiết lập. Người chơi phải bảo vệ Henry trong 30 giây khi anh dùng COMMAND để định vị và phá hủy 3 viên linh đá ngụy trang ven đường.

## 3-2. Rừng Đồ Tể (Slayer Jungle)

### Mục tiêu gameplay

- Trải nghiệm lén lút (stealth) và né tránh bẫy rập trong môi trường đầm lầy hóa đá chật hẹp, tối tăm.
- Thách thức khả năng kiểm soát nhịp độ chiến đấu dưới áp lực bẫy xung quanh.
- Dạy Tulas cách tương tác với chất độc lỏng tự nhiên.

### Cơ chế dùng được

- **Bẫy chông xương trồi:** kích hoạt khi dẫm lên các bãi lá khô hoặc vùng đất mềm, gây sát thương lớn và làm chậm.
- **Kén độc (Thorn Pods):** treo trên các thân cây hóa đá. Đánh hoặc bắn rụng chúng để tạo ra vùng sương độc ăn mòn giáp và gây choáng cho bất kỳ kẻ địch nào đứng bên trong.
- **Patrol "Slayer":** lính gác đeo mặt nạ có khả năng ẩn thân trong bụi cỏ xương, có đòn chém lưỡi hái kéo ngã và ném bom khói gây mù.

### Puzzle/encounter

- **Vượt rừng lén lút:** người chơi phải di chuyển cẩn thận, dùng bẫy gai độc để hạ tuần tra. Nếu kích hoạt chuông báo động quá 3 lần, trạng thái `SlayerJungleStealth` sẽ chuyển thành `Detected`, ngược lại là `Stealth`.
- **Cơ quan kén gai:** một lối đi bị chắn bởi gai nhọn khổng lồ. Tulas phải dùng năng lực chất lỏng để dẫn dòng nước đen ăn mòn rễ cây gai, mở đường cho nhóm đi qua.

## 3-3. Pháo đài Linh hồn (Spirit Fortress)

### Mục tiêu gameplay

- Trận công thành quy mô lớn kết hợp COMMAND phối hợp hành động nhóm cao độ.
- Đặt người chơi trước lựa chọn đạo đức quan trọng đầu tiên của Stage 3.

### Cơ chế dùng được

- **Bình chứa Linh hồn (Spirit Batteries):** các máy phát năng lượng cho lá chắn pháo đài. Phá hủy bình sẽ tiêu diệt linh hồn bên trong; giải thoát bình yêu cầu đứng yên bảo vệ vòng thanh tẩy.
- **Pháo linh hồn:** bắn đạn năng lượng oán khí từ đỉnh tháp gác xuống.
- **COMMAND công thành:** ra lệnh Block giương khiên thép che chắn đạn pháo, ra lệnh Deep đập cửa vách đá, và ra lệnh Solei leo ròng rọc tiếp cận tháp gác.

### Puzzle/encounter

- **Công phá 3 tháp năng lượng:**
    *   Tháp 1: Deep và Block kết hợp đột kích phá cổng bảo vệ lò năng lượng.
    *   Tháp 2: Solei vượt rào và ngắt các cáp kết nối để lộ lò năng lượng từ trên cao.
    *   Tháp 3: Cả nhóm chống đỡ các đợt phản kích của lính canh để lộ bình chứa.
- **Quyết định `SpiritFortressChoice`:** Sau khi hạ gục chỉ huy pháo đài, người chơi quyết định phá hủy nhanh các bình linh hồn (Destroy) hoặc dùng Ghost/Tulas để thanh tẩy giải thoát họ (Purify).

## 3-4. Lối đi bí mật dưới lòng đất (Under Secret Passage)

### Mục tiêu gameplay

- Câu đố môi trường (platforming puzzle) kết hợp né tránh bẫy trong không gian hẹp hầm ngầm.
- Thể hiện sự hữu dụng của Ghost khi đi qua các thiết bị quét năng lượng của Giáo hội.

### Cơ chế dùng được

- **Cổng đá thủy lực:** cổng nặng tự động sập xuống theo thời gian, cần người/vật giữ đòn bẩy.
- **Van xả khí gas nóng:** phun khí theo chu kỳ gây sát thương lớn và đẩy lùi.
- **Glitched Light Sweep (Quét ánh sáng lỗi):** hệ thống quét an ninh của Giáo hội. Ghost đi qua sẽ không kích hoạt bẫy vì cơ thể anh là một lỗi hệ thống, nhưng các nhân vật khác đi vào sẽ kích hoạt đá rơi lập tức.

### Puzzle/encounter

- **Giải mã áp suất thủy lực:** Tulas điều khiển dòng nước ngầm đổ vào ống áp suất để giữ cổng đá mở lâu hơn. Block gồng mình giữ cổng để Solei trượt qua cắt đứt van gas độc.
- **Đường đi quét an ninh:** Người chơi điều khiển Ghost đi qua các luồng ánh sáng quét lỗi để tìm và phá hủy bộ máy phát bẫy từ phía bên kia, mở đường an toàn cho cả đội.

## 3-5. Sông Oán Hận (River of Hatred 3)

### Mục tiêu gameplay

- Trải nghiệm sinh tồn nhịp độ nhanh (auto-scrolling / raft survival) độc đáo.
- Phối hợp bảo vệ mục tiêu di động (Raft HP) trước các đòn tấn công môi trường và quái vật.

### Cơ chế dùng được

- **Raft HP (Máu của Bè):** Bè gỗ có thanh HP riêng. Rơi về 0 gây game over (Map Ngủ Mơ).
- **Đá nhọn trôi nổi:** trôi từ thượng nguồn xuống, gây sát thương lớn cho bè nếu va chạm trực diện.
- **Water Ghouls (Quái cống sông đen):** quái vật xương trồi lên từ nước đen bám vào bè để tự nổ hoặc cắn phá.

### Puzzle/encounter

- **Hành trình trên sông oán hận:**
    *   Deep dùng đòn đập Break phá đá lớn chắn đường.
    *   Tulas điều khiển nước đen tạo sóng phản lực giúp bè đổi hướng nhanh để né tránh xoáy nước hoặc đẩy lùi lũ quái tụ đông ở đuôi bè.
    *   Henry dùng súng bắn tỉa phá hủy các neo xích của lính xương từ hai bên bờ đá trước khi chúng kéo bè vào bãi chông đá.

## 3-6. Đường hành hương

### Mục tiêu gameplay

- Chuyển từ "nghe" sang "nói".
- Cho người chơi thấy cái chết bị biến thành kinh tế.
- Đào sâu Deep và Henry: chiến tranh xưa, mất mát, mệt mỏi, và câu hỏi người sống có được quyền nghỉ sau khi đã sống sót không.
- Dùng Cái Lưỡi như mechanic moi lời thú tội/thứ sâu trong lòng, không chỉ là máy giả giọng.

### Cơ chế dùng được

- **Đám đông hành hương:** che line of sight, tạo hoảng loạn, cản đường.
- **Last Breath Token:** token để mua lời nhắn/nghi thức, nhưng dùng nhiều là nuôi hệ thống giáo hội.
- **Người ghi tên:** enemy/merchant thu phí từng cái chết.
- **Lời trong tim gan ruột:** nếu người chơi dùng confession booth, nhận buff, hoặc nghe quá nhiều lời người chết, boss có thêm câu thoại/đòn đánh cá nhân hóa vào Deep hoặc Henry.

### Puzzle/encounter

- **Tên trong Sổ Thở Cuối:** tìm tên đúng để mở cửa mộ. Có thể mua, trộm, hoặc giúp thân nhân.
- **Đường một chiều:** đi thuận dòng an toàn hơn; đi ngược mở phòng ẩn nhưng gặp phục kích.
- **Lời nhắn miễn phí:** một NPC nghèo xin nghe người chết. Giúp họ mở thông tin về giáo hội.

## 3-7. Chợ xương và hầm mộ sống

### Mục tiêu gameplay

- Dungeon puzzle về xương, tên, và giọng nói.
- Bắt đầu đe dọa Ghost bằng tên cũ.

### Cơ chế dùng được

- **Xương làm key vật lý:** chỉ đúng nếu đặt đúng tên/đúng bia.
- **Chiến binh xương:** nhận lệnh từ Cái Lưỡi; có thể phá loa, đổi bia tên, hoặc counter-command.
- **Tên cũ của Ghost:** đi theo tiếng gọi mở lore nhưng có nguy cơ ambush.

### Puzzle/encounter

- **Hài cốt sai tên:** sửa tên cho người chết làm giảm số skeleton ở boss.
- **Giọng Heni/Heniana:** Cái Lưỡi giả giọng để dụ Heni. Đáp án dựa vào hành vi và ký ức, không chỉ âm thanh.

## 3-8. Đại giáo đường Hơi Thở Cuối

### Mục tiêu gameplay

- Set-piece xã hội: an ủi biến thành dịch vụ, dịch vụ thành quyền lực.
- Đặt Mẹ Bề Trên Voro như đối thủ có niềm tin thật.
- Cho Deep/Henry thấy mặt tối của việc dùng quá khứ làm mệnh lệnh: tượng anh hùng, lời tha thứ giả, và giọng người chết gọi người sống tiếp tục chiến đấu.

### Cơ chế dùng được

- **Confession booth:** checkpoint phụ/hồi máu, nhưng lời thú tội có thể bị Cái Lưỡi dùng trong boss.
- **Lời người chết:** buff hoặc debuff tùy người chơi tin/kháng.
- **Deep và tượng anh hùng:** điều tra tượng mở nâng cấp chống rage; phá vì giận có reward ngắn hạn nhưng tăng rủi ro Stage 4.

### Puzzle/encounter

- **Ba lời tha thứ:** ba NPC trả tiền để nghe người chết tha thứ. Người chơi chọn lộ sự thật, im lặng, hoặc tìm bằng chứng.
- **Mẹ Bề Trên Voro:** social mini-boss hoặc boss phụ. Bà không lừa đảo tầm thường; bà tin mình đang giúp người đau khổ.

## 3-9. Phòng Cái Lưỡi

### Mục tiêu gameplay

- Boss về tên gọi, mệnh lệnh, giọng người chết.
- Ghost chọn tên đồng đội gọi thay vì tên cũ.
- Tích hợp hệ quả từ quyết định ở Pháo đài Linh hồn (`SpiritFortressChoice`).

### Cơ chế dùng được

- **Gọi tên làm khựng:** nhân vật bị gọi đúng tên/danh xưng sẽ chậm trong chốc lát.
- **Mệnh lệnh giọng nói:** "quỳ", "im", "lùi lại", "đánh" gây hiệu ứng ngắn. Dùng ít, rõ, không gây khó chịu.
- **Phá lời nói dối:** đánh thân boss không đủ; phải phá các nút lời thề/khế ước quanh arena.

### Boss

**Dàn Hợp Xướng**

- Nhiều giọng: mẹ Henry, đồng đội Deep, người thân Solei, Heniana, cuối cùng là giọng người chơi.
- Với Henry: nhiễu COMMAND bằng tội lỗi cũ, biến lệnh bảo vệ thành lệnh truy sát nếu người chơi không phá nút khế ước.
- Với Deep: gọi danh hiệu anh hùng cũ, buff Rage khi người chơi truy sát hoặc đứng đánh như một biểu tượng chiến tranh.
- Với Ghost: chỉ mở thêm mảnh ký ức/tên cũ, không giải thích toàn bộ quá khứ ngay ở Stage 3.
- Mỗi giọng tạo một kiểu đòn.
- **Hệ quả của `SpiritFortressChoice`:**
    *   *Nếu đã thanh tẩy linh hồn (Purify):* các linh hồn được giải phóng sẽ bay quanh đấu trường, định kỳ tạo ra một *Lá chắn oán niệm* màu lam nhạt bao quanh cả nhóm. Lá chắn này tự động hấp thụ toàn bộ sát thương và hiệu ứng choáng của 1 đòn sóng âm oán niệm cực đại từ boss trong mỗi phase.
    *   *Nếu đã phá hủy bình linh hồn (Destroy):* các linh hồn oán giận hóa thành các quái vật cận chiến (Vong hồn thù hận) liên tục xuất hiện từ rìa màn hình. Chúng lao vào ôm chặt nhân vật, khóa hoàn toàn thanh COMMAND của Henry và tự phát nổ gây sát thương diện rộng.

Reward: nhóm giữ mảnh Cái Lưỡi bị cháy, biết Thần Sơ Sinh không nguyền rủa mà đang gọi mẹ. Mục tiêu chuyển sang tìm Dây Rốn.

## Stage 4 - Akam Meskul

### Cơ chế gameplay đặc trưng của Stage 4

#### 1. Cơ chế "Nhịp Đập Oán Hận" (Resonant Heartbeat)
Trái Tim của Thần Sơ Sinh khuếch đại cảm xúc cực đoan của vùng đất và phát ra nhịp đập oán oán theo chu kỳ (mỗi 5 giây một lần, thể hiện bằng hiệu ứng đỏ nhấp nháy trên viền màn hình và âm thanh thịch-thịch trầm đục).
- **Trong Chiến Đấu**:
    *   **Resonant Strike (Đòn đánh cộng hưởng)**: Nhấp phím tấn công hoặc tung kỹ năng vào đúng khoảnh khắc nhịp tim đập (dung sai 0.3 giây) sẽ tăng 100% sát thương chí mạng và lập tức phá vỡ giáp bảo vệ (Guard Break) của địch.
    *   **Rage Build-up (Tích tụ Nộ khí)**: Tấn công liên tục và bị lệch nhịp sẽ tích lũy thanh Rage cục bộ của trận đấu. Khi thanh Rage đầy, kẻ địch xung quanh sẽ gầm lên và rơi vào trạng thái cuồng loạn (Frenzy) - tăng 50% tốc độ di chuyển và công kích nhưng giảm 30% phòng thủ.
- **Trong Di Chuyển (Traversal)**:
    *   Một số cầu máu, chướng ngại vật chất lỏng hoặc các dải xương rồng sáp nhập chỉ cứng lại và đi qua được trong 1.5 giây trùng khớp với nhịp tim. Người chơi phải căn thời gian di chuyển để nhảy và lướt qua.

#### 2. Kỹ năng mở rộng của Tulas (Toxic Triage & Vascular Lock)
Akam Meskul đẩy kỹ năng kiểm soát dịch thể của Tulas lên cực hạn, chạm vào ranh giới của cấm thuật sinh học:
- **Màng Lọc Huyết Dịch (Toxic Filtration Aura)**: Tulas tạo một vòng hào quang nước bao bọc xung quanh, trung hòa hoàn toàn khí độc trong phạm vi nhỏ. Người chơi có thể dùng lệnh COMMAND bắt Tulas giữ vị trí tĩnh để che chắn cho Henry bắn tỉa hoặc bảo vệ nhóm NPC tị nạn. Kỹ năng này tiêu hao năng lượng từ các vũng nước hoặc bình thí nghiệm vỡ quanh map.
- **Khóa Huyết Quản (Vascular Lock)**: Cứu mạng đồng đội hoặc dân thường bị phơi nhiễm khí độc bằng cách đông cứng tạm thời độc tố trong huyết quản của họ. Kích hoạt kỹ năng này sẽ khóa 25% lượng Máu tối đa của Tulas cho đến khi quay về checkpoint, đòi hỏi người chơi phải quản lý tài nguyên máu cực kỳ cẩn thận.

#### 3. Kỹ năng mở rộng của Block: "Cực Hạn Chắn Đỡ" (Bastion Shield)
- Block có thể nhặt các mảnh xương sườn rồng Akam Meskul khổng lồ nằm rải rác trên màn chơi để biến thành lá chắn di động hạng nặng. Kỹ năng này cho phép Block dựng một bức tường vững chắc, hấp thụ hoàn toàn các đợt bão oán niệm và tia lửa địa nhiệt, mở đường cho Solei và Ghost áp sát mục tiêu phía sau.

#### 4. Lựa chọn phi sát thương: "Hold Fire" & "Phá Hủy Vật Neo"
- Thay vì tiêu diệt các chiến binh cuồng giáo bị Matriarch Vanya thao túng, Henry có thể ra lệnh **Hold Fire**. Solei hoặc Ghost sẽ sử dụng tốc độ cơ động để vượt qua hàng phòng thủ, phá hủy các "Vật Neo Nghi Lễ" (cột xương, đền thờ đá mini). Khi Vật Neo vỡ, các chiến binh sẽ thoát khỏi ảo giác, dừng chiến đấu và bỏ chạy, giúp giảm 50% thanh Rage oán niệm của khu vực và tăng chỉ số cứu dân.

#### 5. Khả năng tương tác ảo ảnh của Ghost
- Với hệ thần kinh kháng thôi miên độc lập, Ghost là nhân vật duy nhất nhìn thấy các điểm nứt gãy của ảo ảnh lịch sử Aramut. Trong Act 4-2, người chơi điều khiển Ghost chạm vào các ảo ảnh oán niệm để giải mã các cơ quan cổ xưa, làm biến đổi địa hình hoặc mở các con đường ẩn chứa tài liệu lore đặc biệt.

---

### Thiết kế màn chơi chi tiết (Acts)

## 4-1. Ngoài cửa hang rồng (Biên giới Quỷ Huyệt)
![Stage 4-1 playable map - Dragon Cave Approach](<imgs/Stage4/stage4_act_4_1_dragon_cave_approach_map.png>)

### Mục tiêu gameplay
- Dạy người chơi cách phối hợp vượt chướng ngại khí độc địa nhiệt.
- Giới thiệu cơ chế phi sát thương thông qua việc phá hủy Vật Neo Nghi Lễ.

### Cơ chế dùng được
- **Địa nhiệt độc**: Các vents phun khí độc theo chu kỳ. Block có thể dùng COMMAND để nhặt đá đè lên chặn lỗ phun, hoặc Tulas tạo màng lọc độc để nhóm đi qua.
- **Demon tamer**: Kẻ địch gọi quái vật. Tiêu diệt tamer sẽ khiến quái quay sang cắn lính tuần tra.
- **Malaestro**: Chỉ huy tế tự, buff sát thương và ép lính tập trung tấn công Solei.

### Puzzle/encounter
- **Vượt Quỷ Huyệt**: Sử dụng COMMAND phối hợp Block đè đá chặn khí độc, Solei leo vách đá tiêu diệt sniper của phe Con Cháu Chiếc Nôi.
- **Giải cải đạo**: Gặp nhóm người tị nạn bị ép cải đạo làm lá chắn thịt. Người chơi phải dùng đòn phi sát thương của Henry và phá Vật Neo để cứu họ, mở lối đi tắt.

### Boss: Crusader Band
Trận chiến với toán cảnh vệ tiên phong của Vanya trên một sườn núi dốc.
- Gồm: 1 khiên lớn bảo vệ, 2 thương thủ lướt nhanh, và 1 Malaestro đứng sau tụng kinh buff giáp.
- Phá hủy cột tế đàn trung tâm sẽ ngắt hoàn toàn buff của Malaestro, khiến cả toán lính rơi vào trạng thái choáng (Stun).

---

## 4-2. Đường hầm trong xác Akam Meskul (Dragon Bone Catacombs)
![Stage 4-2 playable map - Dragon Bone Catacombs](<imgs/Stage4/stage4_act_4_2_dragon_bone_catacombs_map.png>)

### Mục tiêu gameplay
- Khám phá dungeon sinh học khổng lồ bên trong xác thánh long.
- Kể chuyện về cuộc đời Aramut qua ảo ảnh cộng hưởng của Ghost.

### Cơ chế dùng được
- **Địa hình sinh học**: Da rồng hóa thạch làm tường chắn (chỉ phá được bằng búa nặng của Deep), xương sườn làm bệ nhảy.
- **Ảo ảnh Aramut**: Các sự kiện lịch sử hiện về dưới dạng ảo ảnh vật lý gây sát thương. Chỉ Ghost mới có thể hóa giải hoặc tương tác để mở đường.

### Puzzle/encounter
- **Phân khu "Lục Phủ Ngũ Tạng"**:
    *   *Buồng Phổi*: Các luồng gió độc thổi mạnh theo nhịp, có thể thổi bay nhân vật xuống vực. Block phải dựng Bastion Shield chắn gió để cả đội đi sau lưng.
    *   *Buồng Tim (Organ Chamber)*: Trọng lực đảo lộn liên tục theo nhịp tim. Người chơi phải thực hiện các cú nhảy platform đồng bộ với nhịp đập để đi qua bể axit bên dưới.
- **Ghost và các vết nứt oán niệm**: Ghost tương tác với ảo ảnh Aramut bị phản bội để mở các rương báu cổ xưa chứa vật phẩm nâng cấp kỹ năng.

---

## 4-3. Phân tranh lưỡng cực (Thành phố kính & Ca động tế lễ)
![Stage 4-3 playable map - Glass City and Ritual Cave](<imgs/Stage4/stage4_act_4_3_glass_city_ritual_cave_map.png>)

### Mục tiêu gameplay
- Lựa chọn route xâm nhập với phong cách chơi đối lập: Stealth vs Combat.
- Giải quyết khủng hoảng sức khỏe của Heni bằng kỹ năng hi sinh máu của Tulas.

### Cơ chế dùng được
- **Cơn sốt của Heni**: Heni bị sốt cao do cộng hưởng. Tulas phải dùng Vascular Lock để ổn định mạch máu cho cô bé, giảm 25% HP tối đa của anh suốt Act.
- **Tuyến Tàn Dư (Eldar Kaelen)**: Thành phố kính đầy rẫy camera quét lỗi và drone an ninh. Người chơi dùng Ghost lẻn vào hack terminal để giải cứu tù nhân.
- **Tuyến Con Cháu (Matriarch Vanya)**: Ca động rực lửa với bẫy hiến tế. Lối chơi combat dồn dập, Solei dùng phản đòn và Tulas dùng chất lỏng dập lửa tế để cứu trẻ em.

### Puzzle/encounter
- **Lực lượng hỗ trợ**: Cứu được tù nhân ở tuyến Tàn dư sẽ mở khóa ụ súng máy hỗ trợ trong trận Titan; cứu trẻ em tuyến Con Cháu sẽ được các tế sư phục hồi lượng máu bị khóa của Tulas.

---

## 4-4. Thần Long Titan (Titan Trái Tim)
![Stage 4-4 playable map - Heart Titan Battlefield](<imgs/Stage4/stage4_act_4_4_heart_titan_battlefield_map.png>)

### Mục tiêu gameplay
- Boss khổng lồ đa mục tiêu trên đấu trường sụp đổ.
- Lồng ghép cơ chế Rage và nhiệm vụ cứu hộ dân thường.

### Cơ chế dùng được
- **Titan Trái Tim (Boss Sinh Học)**: Một thực thể khổng lồ làm từ xương rồng cổ đại, cơ thịt đan xen ống thép rỉ sét, lồng ngực để lộ Trái Tim rực sáng quấn quanh bởi các rễ cây thần.
- **Rage oán niệm**: Giết lính rút lui hoặc để dân thường chết sẽ tăng Rage của boss, khiến boss tung chiêu quét đấu trường bằng oán niệm cực đại.
- **COMMAND phân việc cứu hộ**: Bảo vệ dân thường trong lúc chiến đấu.

### Thiết kế trận đánh Boss: Titan Trái Tim
- **Phase 1: Đấu trường hỗn loạn**: Hai phe lính của Kaelen và Vanya liên tục chém giết nhau và xả súng vào đấu trường. Người chơi phải dùng Henry ra lệnh Hold Fire và ra lệnh Block giương khiên bảo vệ nhóm dân thường tị nạn ở rìa sân đấu. Titan dùng tay xương khổng lồ đập quét sân khấu.
- **Phase 2: Rễ cây oán niệm**: Titan cắm các mạch máu xương vào mặt đất, tạo ra các vũng máu độc phát nổ theo nhịp đập. Tulas phải liên tục di chuyển để dọn dẹp các vũng máu độc, trong khi Ghost dùng khả năng kháng ảo ảnh định vị điểm yếu thực sự của Titan.
- **Phase 3: Nhịp đập chí mạng**: Titan để lộ lõi Trái Tim ở ngực. Người chơi phải căn đúng nhịp đập (Resonant Heartbeat) để tung đòn đánh cộng hưởng phá hủy lớp giáp xương bao bọc lõi.
- **Kết trận**: Titan sụp đổ. Jamerson xuất hiện trên buồng ngủ đông của Heniana, cướp lấy Trái Tim thần và trốn thoát. Đấu trường sụp đổ hoàn toàn. Cả nhóm phải lựa chọn dừng lại cứu những người lính và người dân đang bị vùi lấp (phát triển tâm lý Tulas & Block về giá trị của sức mạnh bảo vệ) thay vì đuổi theo Jamerson ngay lập tức. Hai phe tàn quân dừng chiến đấu trước nghĩa cử của nhóm, chỉ cho họ đường tiến vào The Cradle.

## Stage 5 - The Cradle

## 5-1. Vùng mơ của Thần Sơ Sinh
![Cradle Landscape](<imgs/Stage5/the_cradle_landscape.png>)

### Mục tiêu gameplay

- Remix tất cả Stage trước.
- Map Ngủ Mơ trở thành không gian thật.
- Ghost nhìn thấy quá khứ mình là thí nghiệm thất bại, không phải vị cứu tinh.
- Kiểm tra lại các lựa chọn đạo đức của người chơi: thoát một mình, dùng trẻ em làm công cụ, nghe lệnh người chết, hoặc để chiến tranh tự nuốt dân thường.
- Làm rõ Heni không phải chìa khóa vô tri; cô là companion có quyền sợ và quyền từ chối.

### Cơ chế dùng được

- **Địa hình ký ức:** Armorlite, Laundel, làng chài, Calvaria, xác rồng, phòng ngủ đông xuất hiện như mảnh ghép.
- **Không khí độc:** buộc quản lý filter/điểm an toàn.
- **Heni Resonance:** đứng gần Heni thấy đường thật hoặc ổn định vật thể.
- **Skill loadout thành vật thể:** những skill người chơi chọn trong Map Ngủ Mơ có thể hiện thành cổng/đòn hỗ trợ trong level.
- **Ký ức cám dỗ:** mỗi vùng ký ức đưa ra một lối giải dễ nhưng sai chủ đề, như bỏ tù nhân để mở đường nhanh, dùng Heni làm khóa, nghe giọng người chết để mở cổng, hoặc để hai phe tự giết nhau cho boss yếu đi.
- **Từ chối lối tắt:** route tốt thường khó hơn ngay lúc đó nhưng giữ trust, giảm Rage cuối, mở assist hoặc giảm số nạn nhân trong epilogue.
- **Cơ chế Cộng hưởng nhịp tim (Heartbeat Resonance):** Nhịp tim của Ghost và Heni hiển thị trực tiếp trên HUD. Nhịp tim tăng khi chạy nhanh, chiến đấu hoặc đứng trong vùng oán niệm quá lâu. Khi nhịp tim quá cao, màn hình bị nhiễu ảo giác nặng và sinh ra **Shadow Echoes** (quái vật bóng ma chỉ tập trung săn đuổi nhân vật có nhịp tim cao). Để giảm nhịp tim: Tulas sử dụng kỹ năng lọc/tuần hoàn máu, hoặc ra lệnh COMMAND cho Block giương khiên tạo vùng trú ẩn an toàn để Ghost/Heni đứng yên tĩnh tâm.

### Puzzle/encounter

- **Phòng ngủ đông trắng:** Heni nghe Heniana mơ; người chơi phải phân biệt ký ức của Heni, Heniana và Jamerson.
- **Cổng ký ức:** mỗi cổng cần một luật đã học: nhìn qua Con Mắt, đi im lặng qua Cái Tai, từ chối tên của Cái Lưỡi, hạ Rage của Trái Tim.
- **Ghost không có hồ sơ:** cổng chỉ mở cho kẻ "thất bại" ngoài dữ liệu. Đây là payoff cho Bastonne.
- **Lối thoát Marseille giả:** mở ra nếu bỏ lại các bóng tù nhân. Cách đúng là quay lại cứu họ, làm route dài hơn nhưng giảm áp lực encounter 5-2.
- **Lời hứa im lặng của Sakuri:** Heni có thể mở cổng nhanh bằng cộng hưởng đau đớn. Cách đúng là để Solei giữ cô lại và tìm đường khác bằng stealth/âm thanh.
- **Bàn thờ Calvaria:** giọng người chết chỉ đường rất ngắn. Cách đúng là dùng Cái Lưỡi để nhận ra lời giả và chọn đường không có phần thưởng tức thì.
- **Giải đố Phản chiếu Không gian (Space Inversion Puzzle):** Vùng Mơ chứa các mảng không gian lơ lửng đại diện cho ký ức cũ. Người chơi phải hoán đổi vị trí của các nhân vật nằm ở các vùng ký ức khác nhau (ví dụ: Solei ở Marseille, Ghost ở Bastonne) để họ cùng đẩy vật thể, kéo cần hoặc kích hoạt công tắc đồng bộ ở hai chiều không gian để mở cổng tiếp theo.

## 5-2. Chiến trường của hai chính nghĩa

### Mục tiêu gameplay

- Encounter đạo đức lớn nhất.
- Không chọn phe nào làm chân lý cuối.
- Bảo vệ người không muốn chiến đấu.
- Gieo rõ ba kết thúc sai trước khi vào boss: phục thù, kiểm soát, sở hữu.

### Cơ chế dùng được

- **Ba thế lực:** Con Cháu Chiếc Nôi, Tàn Dư Sáu Vương Quốc, Jamerson.
- **Mục tiêu phi sát thương:** mở evac route, tắt vũ khí, phá tế đàn phụ, ngăn vật tế.
- **COMMAND cấp cuối:** Hold Fire, Protect Civilians, Disable Weapon, Open Route.
- **Faction pressure:** mỗi phe có thanh áp lực riêng. Giết nhiều quân của một phe làm phe đó cực đoan hơn; cứu dân/thả tù binh/đưa bằng chứng làm thanh áp lực giảm.
- **Bằng chứng từ các Stage trước:** tài liệu Bastonne, lời khai Laundel, tên thật ở Calvaria, dữ kiện Aramut/Akam có thể dùng để buộc một số nhóm rút khỏi cổng vật tế mà không cần giết họ.

### Puzzle/encounter

- **Cổng vật tế:** cần năng lượng từ nhiều phe. Có thể cướp bằng bạo lực, nhưng cách tốt hơn là làm từng phe rút khỏi cổng bằng bằng chứng/sự thật đã thu được.
- **Không ai được dùng xác người làm phí:** sau câu Henry nói với Ghost, mở lệnh bảo vệ diện rộng hoặc objective "không để dân thường chết".
- **Ba lối sai hiện hình:** game cho người chơi thấy kết quả nhanh của từng phe: hồi sinh thần để thanh tẩy, dùng thần như vũ khí, dùng Heniana làm cửa. Người chơi không chọn một trong ba để thắng; mục tiêu là phá logic của cả ba.

## 5-3. Jamerson và Heniana

### Mục tiêu gameplay

- Final boss dùng đủ năm mảnh thần.
- Kết thúc arc Jamerson: tình yêu biến thành quyền sở hữu.
- Heni và Heniana được quyền từ chối làm biểu tượng.
- Sau boss có gameplay nghi lễ ngược, không chỉ cutscene.

### Boss: Jamerson trong giáp mảnh thần
![Final Boss Jamerson](<imgs/Stage5/final_boss_jamerson.png>)

Mỗi phase dùng một luật:

- **Con Mắt:** ảo giác từ ham muốn. Jamerson tạo cảnh Heniana khỏe mạnh, gia đình cũ, lối cứu giả.
- **Cái Tai:** phản đòn theo tiếng động và input lặp. Người chơi phải đổi nhịp hoặc dùng im lặng.
- **Cái Lưỡi:** gọi tên làm nhân vật khựng. Ghost kháng tốt hơn vì không bám vào tên cũ; Heni phản bằng tên mình tự chọn.
- **Trái Tim:** đánh liên tục trong rage gây damage cao nhưng sạc boss. Bảo vệ đồng đội và không đánh mục tiêu đầu hàng làm giảm nhịp.
- **Dây Rốn:** kéo arena vào giấc mơ của Thần Sơ Sinh, đổi địa hình và khoảng cách.

### Puzzle trong boss

Không nên chỉ đánh cạn máu. Mục tiêu là **cắt liên kết** giữa Jamerson và các mảnh thần:

- Ghost cắt Con Mắt bằng cách đi qua vùng máy không nhận diện.
- Solei phá nhịp Cái Tai bằng counter đúng thời điểm.
- Henry dùng counter-COMMAND để vô hiệu lệnh của Cái Lưỡi.
- Deep giữ Trái Tim khỏi bùng Rage bằng phá loa/core phụ.
- Tulas khóa các mạch máu độc quanh arena để cứu nạn nhân và giảm hồi phục của boss.
- Block giữ cổng/rìa arena không sụp để dân và party không bị kéo vào Dây Rốn.
- Heni chạm Dây Rốn để mở đường trả mảnh thần, nhưng chỉ khi người chơi đã bảo vệ cô đủ lâu để hành động này là lựa chọn của cô, không phải cưỡng ép.

### Phase cuối: The Father-Eye

Con Mắt chiếm Jamerson. Đây là phase ít lời, nhiều hình ảnh: người cha không còn kiểm soát mong muốn của mình.

Cơ chế:

- Arena hẹp dần quanh buồng ngủ đông.
- Eye beam đọc vị trí người chơi nhưng có blind spot nếu đứng gần Heniana/Heni đúng lúc.
- Các mảnh thần bị kéo về Con Mắt; người chơi phải giữ từng liên kết đã cắt không nối lại.

Kết thúc đúng với bản Complete: Ghost cắt liên kết, Jamerson rơi xuống bên buồng ngủ đông, không được tha thứ nhưng lần đầu không còn ra lệnh.

### Nghi lễ ngược (Inverse Ritual Mode) sau boss
![Heni and Heniana Resonance](<imgs/Stage5/heni_heniana_resonance.png>)

Sau The Father-Eye, không nên cắt thẳng sang cinematic dài. Người chơi sẽ bước vào một chế độ chơi phòng thủ chiến thuật thời gian thực thu nhỏ (**Inverse Ritual Mode**), nơi cả 6 thành viên trong đội đều xuất hiện trên đấu trường và người chơi phải phân chia vai trò để bảo vệ lõi Dây Rốn và Heni/Heniana trong khi tiến trình ngắt kết nối diễn ra.

**Mục tiêu chiến thuật:**

- **Keep Links Severed (Solei & Ghost):** Các liên kết năng lượng từ các mảnh cổ vật cố gắng tái kết nối vào Heniana hoặc xác Jamerson. Người chơi điều khiển Solei chạy tường cơ động để chém đứt các liên kết oán niệm (Corruption Links), trong khi Ghost tiếp cận trực tiếp lõi Dây Rốn để đồng bộ và ngắt kết nối an toàn.
- **Evac & Defense (Block & Deep):** Các quái vật oán niệm (Relic Distortions) liên tục trào ra từ các vết nứt không gian để phá vỡ nghi lễ. Block phải giương khiên đặc chặn hướng tấn công chính, trong khi Deep dùng đao nặng cản phá các đợt quái lớn và hỗ trợ giữ đường rút lui cho những người sống sót (bao gồm cả tàn quân hai phe).
- **Triage & Life Support (Tulas):** Dòng năng lượng Dây Rốn rút cạn sinh lực của hai cô bé. Người chơi điều khiển Tulas sử dụng kỹ năng tuần hoàn máu để ổn định thể trạng của Heni và Heniana, ngăn không cho thanh sinh lực của họ tụt xuống mức nguy kịch.
- **Command Control (Henry):** Cái Lưỡi phát ra các lệnh giả làm nhiễu loạn hành vi của đồng đội. Henry phải sử dụng COMMAND cấp cuối (Hold Fire / Protect / Focus) để triệt tiêu các lệnh gây nhiễu và phối hợp hành động của cả đội.

**Vai trò payoff cụ thể:**

- **Ghost:** Cắt Con Mắt vì hệ thống sinh học lỗi không nhận diện được anh.
- **Solei:** Giữ Heni bằng tên riêng (Heni), không để UI chuyển thành "Clone Core" hay "Heniana Copy".
- **Henry:** Dùng COMMAND lần cuối để cấm tuyệt đối việc sử dụng vật tế người, bất kể điều đó làm nhịp phòng thủ khó hơn.
- **Deep:** Từ chối tung đòn kết liễu tàn quân; tập trung kéo những người bị thương ra xa khỏi vùng sụp đổ.
- **Tulas:** Lọc độc tố và cứu người bị nối vào mạch thần mà không dùng cơ thể ai làm công cụ mở khóa.
- **Block:** Giữ cánh cổng ngầm mở đủ lâu để toàn bộ người sống rút lui an toàn.
- **Heni:** Tự tay chạm vào Dây Rốn thông qua một prompt xác nhận ý chí tự do (agency prompt) của chính cô bé khi người chơi đã tạo ra đủ khoảng an toàn, chấm dứt hoàn toàn nghi lễ.

Kết quả tốt nhất không phải "perfect victory". Nó là ending bittersweet: Đại Họa giảm dần, Heniana chỉ còn cơ hội mong manh như người thường, Heni sống tiếp như một người riêng, và Jamerson không được tôn vinh.

## Puzzle/mechanic dùng lại

### Gọi tên và từ chối tên

Dùng ở Bastonne, Calvaria, The Cradle. Ghost bị gọi bằng mã tù, tên cũ, hoặc danh xưng vật chứa. Đáp án không phải luôn là tìm tên thật; nhiều lúc là từ chối cái tên dùng để điều khiển mình.

### Cứu người làm trận khó hơn

Dùng xuyên game:

- Stranger có giúp Block trong lúc nhà tù loạn hay không; Block vẫn được Solei/đội cứu, nhưng trạng thái và lòng tin thay đổi.
- Không cướp Laundel.
- Cứu tù nhân thí nghiệm.
- Đưa thuốc cho khu cách ly.
- Sửa tên cho người chết ở Calvaria.
- Giải cải đạo ở Akam.
- Mở đường dân thường ở The Cradle.

Reward nên là route, trust, assist, item, hoặc epilogue detail, không chỉ cộng điểm đạo đức.

### Synergy địa hình

Dùng xuyên game để làm party có cảm giác thật sự phối hợp:

- Tulas tạo bệ/chùm chất lỏng để Deep hoặc Solei vượt vực, đánh enemy trên cao, hoặc vào đường phụ.
- Block giữ khiên trong khi Tulas gia cố bằng nước/máu đông, tạo tuyến an toàn cho dân chạy.
- Henry bắn công tắc/weakpoint qua màn chất lỏng do Tulas tạo, mở puzzle xa mà không cần biến Henry thành người giải mọi thứ.
- Ghost đi qua vùng máy không nhận diện, rồi Tulas giữ cửa hoặc kéo vật thể từ phía bên kia để mở đường cho đội.
- Synergy nên có cooldown, nguồn chất lỏng hoặc điểm neo rõ ràng để không phá level design.

### Cầm và ném vật thể

Dùng từ Stage 0 để người chơi hiểu môi trường là công cụ:

- Ném vật vào công tắc, chuông, khóa, bánh răng, pressure plate.
- Ném chai/đá tạo tiếng động dụ patrol trong Stage 2.
- Ném thùng/container nhỏ tạo cover tạm ở Marseille.
- Ném vật có chất lỏng để Tulas biến thành khiên, bệ, hoặc dây kéo.
- Vật thể nặng cần nhân vật khỏe như Deep/Block; vật thể nhẹ phù hợp Solei/Ghost để giải puzzle nhanh.

### Nghe/Im lặng

Dùng từ Stage 2 trở đi:

- Đi theo nhịp chuông.
- Tạo tiếng động giả để dụ patrol.
- Tắt nguồn âm để boss không đọc được mình.
- Im lặng giúp tránh Cái Tai nhưng làm mất audio cue.

### Rage/Không truy sát

Dùng mạnh ở Stage 4 và final boss:

- Đánh kẻ đầu hàng tăng Rage.
- Cứu dân giảm Rage.
- Phá loa tuyên truyền giảm buff địch.
- Deep có kỹ năng giữ vị trí để chặn Rage wave.

## Enemy families

| Nhóm địch | Màn | Vai trò |
|---|---|---|
| Bastonne guards | Stage 0 | Dạy shield, baton, taser, alarm |
| Scanner/drone | Stage 0-1 | Lock-on, camera, phát hiện lỗi dữ liệu |
| Marseille gang | 1-1 | Mob đông, vũ khí môi trường |
| Laundel enforcers | 1-2 | Faction combat, phục kích |
| Sewer mutants | 1-2, 1-3 | Pack leader, poison, nước cống |
| Secret police | 1-3 | Sniper laser, smoke, súng ngắn |
| Lab experiments | 1-4 | Horror, grab, bình chứa |
| Quarantine patrol | 2-2 | Sound cone, bắt người bệnh |
| Sakuri acolytes | 2-3, 2-4 | Âm thanh, đọc thói quen |
| Bone clergy | Stage 3 | Gọi tên, revive, mệnh lệnh |
| Cradle zealots | Stage 4-5 | Buff theo chant, hy sinh |
| Six Kingdom machines | Stage 4-5 | Shield, turret, filtered zone |
| Relic distortions | Stage 5 | Biến thể theo Mắt/Tai/Lưỡi/Tim/Dây Rốn |

## Boss list

| Màn | Boss | Cơ chế chính |
|---|---|---|
| 0 | Training Bout + Bastonne Lockdown Unit | Solei tutorial, combo/chưởng/counter, teamwork, hậu quả Stranger có giúp Block |
| 1-1 | Thủ lĩnh băng đua xe | Moto phase, vạch lửa, kiếm phase |
| 1-2 | Thủ lĩnh Áo Đen / GROGER | Route theo LaundelTrust, boss ẩn token/nước cống |
| 1-3 | Marius Vane | Sniper, smoke, Heat reinforcement |
| 1-4 | SheMal | Con Mắt, ảo giác, bình chứa, route mất điện |
| 2-2B | Ryozan oan hồn | Cầu núi, phase nòng nọc linh hồn, giáp đỏ và đao dài |
| 2-4 | Sakuri | Âm thanh, input reading, cơn khát máu, đá lơ lửng |
| 3-4 | Dàn Hợp Xướng | Gọi tên, giọng người chết, phá lời nói dối |
| 4-1 | Crusader Band | Boss nhóm, cứu người bị cải đạo |
| 4-4 | Titan Trái Tim | Rage, cứu dân, phá loa, đánh core |
| 5-3 | Jamerson Relic Armor | Năm mảnh thần, cắt liên kết |
| 5-3 Final | The Father-Eye | Con Mắt chiếm Jamerson, giữ liên kết không nối lại |

## Nhịp học kỹ năng

- **Stage 0:** Solei tutorial ở căn cứ, combo/chưởng/counter, cầm-ném vật thể, synergy Tulas cơ bản, nhiệm vụ giải cứu Block, đoạn Stranger gây tiếng động trong phòng giam, state `BlockHelped`.
- **Stage 1:** party combat, môi trường, vật thể ném, synergy trong không gian đô thị, faction choice, route mất điện.
- **Stage 2:** âm thanh, stealth nhẹ, Heni, boss đọc thói quen.
- **Stage 3:** tên gọi, giọng người chết, mệnh lệnh, ký ức.
- **Stage 4:** chiến trường, faction phức tạp, Rage, cứu người trong boss.
- **Stage 5:** remix toàn bộ luật, Map Ngủ Mơ thành level, final boss năm mảnh thần.

## Câu hỏi cần quyết định

- Game có party swap đầy đủ hay đội Deep/Solei là core với assist/COMMAND theo ngữ cảnh?
- Tulas là party member đầy đủ từ Stage 0, assist theo đoạn, hay mở sau khi nhóm rời Bastonne?
- Synergy nên là input riêng, command ngữ cảnh, hay tự động hiện prompt khi hai nhân vật/điểm neo đứng đúng vị trí?
- Cầm-ném vật thể là mechanic cho mọi nhân vật hay chỉ một số nhân vật có sức mạnh/kỹ năng phù hợp?
- Stranger/Ghost là party member đầy đủ sau Bastonne hay chỉ playable ở các đoạn đặc biệt?
- Tuning cụ thể cho `BlockInjuryState`: giảm Max HP bao nhiêu, assist cooldown bao lâu, encounter phụ có spawn bao nhiêu enemy?
- Heni là companion active trong gameplay hay chỉ dùng ở puzzle/cutscene?
- Mức độ hậu quả của LaundelTrust nên lớn đến đâu?
- `SubmarinePowerRoute` nên thưởng loot/skill ở mức nào để đáng chọn Hard Mode mà không biến thành route bắt buộc?
- Final boss có cho chọn kết thúc không, hay canon luôn là trả mảnh thần qua Dây Rốn?
- `Start Story` luôn vào save slot trước, hay vào Relay/IP Room khi người chơi chọn co-op từ main menu?
- `Heroes` trên main menu là character viewer ngoài campaign, hay chính là Story Party/Character Select?
- Pause menu có dừng thời gian trong mọi mode không, hay online/co-op dùng pause không dừng thời gian?
- Character Select cho đổi active fighter mọi lúc ở checkpoint, hay chỉ tại căn cứ/Map Ngủ Mơ/safehouse?
- Settings nên dùng layout v2 một trang rộng hay v3 tabbed sections cho bản đầu tiên?
- UI có cần language toggle Việt/Anh ngay từ đầu không, hay để sau khi khóa text chính?
