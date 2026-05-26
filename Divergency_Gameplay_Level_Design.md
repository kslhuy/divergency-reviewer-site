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
| `AkamCiviliansSaved` | Counter | Cứu người bị ép cải đạo, mở evac route, phá loa tuyên truyền, không đánh người đầu hàng. | Rage của Titan giảm, ít reinforcement, weakpoint mở lâu hơn. | Ở cảnh cuối, số dân hai phe cùng mở đường cho trẻ em/người bị thương thay đổi theo counter này. |
| `FinalMercyActions` | Counter | Trong The Cradle/final: Hold Fire, Disable Weapon thay vì giết, Protect Civilians, từ chối dùng Heniana/Heni như vật tế, không xử tử kẻ đã đầu hàng. | Phase Trái Tim trong final bớt sạc Rage, đồng đội có thêm assist bảo vệ. | Không tạo "good ending" riêng. Nó đổi tone epilogue: thắng bằng cách ít biến người khác thành chi phí hơn, hoặc thắng nhưng thế giới còn cay đắng hơn. |

Ví dụ kết hợp biến:

- `LaundelTrust` cao + `GrogerUnlocked`: dân Laundel hỗ trợ bằng đèn, tiếng gọi weakpoint, hoặc mở đường thoát sau boss.
- `LaundelTrust` thấp + `GrogerUnlocked`: GROGER xuất hiện trong tối, nhiều token mồi hơn, NPC khóa cửa vì sợ nhóm.
- `HeniTrust` cao + `CalvariaTruthsFound` cao: người chơi dễ nhận ra Cái Lưỡi đang giả giọng Heni/Heniana vì Heni từng kể chi tiết thật.
- `AkamCiviliansSaved` cao + `FinalMercyActions` cao: final boss vẫn khó, nhưng phase Trái Tim có nhiều khoảng thở hơn và epilogue bớt tuyệt vọng.

Điểm quan trọng: biến trust không phải để thưởng người chơi "ngoan". Nó làm thế giới nhớ các chi phí nhỏ mà người chơi đã chấp nhận hoặc né tránh.

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

## 3-1. Đường hành hương

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

## 3-2. Chợ xương và hầm mộ sống

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

## 3-3. Đại giáo đường Hơi Thở Cuối

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

## 3-4. Phòng Cái Lưỡi

### Mục tiêu gameplay

- Boss về tên gọi, mệnh lệnh, giọng người chết.
- Ghost chọn tên đồng đội gọi thay vì tên cũ.

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
- Cách thắng là phá các lời nói dối đang buộc người sống phục tùng người chết.

Reward: nhóm giữ mảnh Cái Lưỡi bị cháy, biết Thần Sơ Sinh không nguyền rủa mà đang gọi mẹ. Mục tiêu chuyển sang tìm Dây Rốn.

## Stage 4 - Akam Meskul

## 4-1. Ngoài cửa hang rồng

### Mục tiêu gameplay

- Combat chiến trường.
- Giới thiệu hai phe đều có lý do và đều sai.
- Dạy cứu người bị ép cải đạo.

### Cơ chế dùng được

- **Người bị bắt cải đạo:** enemy yếu; có thể giết nhanh hoặc phá bùa để họ bỏ chạy.
- **Zealot:** mob chính, buff theo chant.
- **Demon tamer:** gọi quái; nếu tamer chết khi quái còn sống, quái quay sang đánh mọi phe.
- **Malaestro:** chỉ huy làm toàn bộ địch focus một nhân vật.

### Puzzle/encounter

- **Bẫy lời nguyền:** khí độc/ảo giác làm hiện đường giả. Solei đọc dấu nghi lễ để tìm đường thật.
- **Giải cải đạo:** cứu nhiều người làm boss Crusader Band ít reinforcement hơn.

### Boss

**Crusader Band**

Boss nhóm, gồm shield, spear, chant, beast handler. Giết chant trước làm boss yếu nhưng có thể khiến con tin mất kiểm soát; cứu con tin trước làm trận lâu hơn.

## 4-2. Đường hầm trong xác Akam Meskul

### Mục tiêu gameplay

- Organic dungeon trong xác rồng.
- Arc của Deep: anh hùng có thể bị dùng làm biểu tượng che thất bại.

### Cơ chế dùng được

- **Xương sườn/cột đền:** platform và cover.
- **Da rồng đóng cứng:** tường có thể phá bằng Deep.
- **Khoang nội tạng rỗng:** đường vòng, phòng ẩn.
- **Ký ức Aramut:** đường thật/giả hiện theo lời nguyền.

### Puzzle/encounter

- **Ký ức bị cắt:** ghép ba hồi tưởng để biết Aramut chết vì kế hoạch sai, không phải vinh quang đơn giản.
- **Cầu xương gãy:** Block giữ, Solei chạy, Deep đóng chốt.
- **Nhịp rồng chết:** cửa mở theo nhịp tim giả; đánh lệch nhịp gọi quái.

## 4-3. Thành phố nhân tạo và bộ tộc ẩn

### Mục tiêu gameplay

- Faction puzzle không có phe sạch.
- Arc của Solei: từ chối bị định nghĩa bằng dòng máu.
- Arc của Tulas: dùng năng lực máu/chất lỏng để cứu người trong vùng độc, nhưng luôn có rủi ro bị xem như cấm thuật.
- Arc của Block: hiểu sức mạnh không chỉ để đánh, mà để giữ tuyến, che chở, và làm nơi trú cho người khác.

### Cơ chế dùng được

- **Hai hub đối xứng:** thành phố lọc khí của Tàn Dư Sáu Vương Quốc và khu nghi lễ của Con Cháu Chiếc Nôi.
- **Reputation cục bộ:** tin một phe quá sâu sẽ làm phe kia khóa cửa, nhưng không phe nào là "good route".
- **Kiểm tra máu:** có thể từ chối, hack máy, dùng nghi lễ che dấu, hoặc phá cửa.
- **Máu nhiễm độc:** Tulas có thể kéo/khóa/lọc tạm thời để cứu NPC hoặc mở đường, nhưng dùng quá nhiều làm tăng nguy cơ combat hoặc khiến NPC sợ anh.
- **Tuyến che chở:** Block có thể giữ cửa, giữ cầu, chắn khí độc hoặc vác NPC. Đây là objective bảo vệ chủ động, không chỉ là tank đứng chịu đòn.

### Puzzle/encounter

- **Máu không phải chìa khóa:** puzzle chủ đề cho Solei. Đáp án tốt là tìm cách đi qua mà không để cô bị biến thành bằng chứng cho phe nào.
- **Máu không phải vật liệu:** puzzle chủ đề cho Tulas. Đáp án tốt là dùng máu/chất lỏng để cứu người mà không biến người đó thành công cụ mở khóa.
- **Anh hùng không phải tượng:** encounter chủ đề cho Block. Người chơi giữ tuyến cho dân thoát thay vì đuổi boss phụ lấy loot.
- **Hai phòng thí nghiệm:** một bên thử tù nhân, bên kia tẩy não trẻ em. Cứu phòng nào trước ảnh hưởng encounter 4-4.

## 4-4. Trái Tim và Titan Rồng

### Mục tiêu gameplay

- Boss đa mục tiêu.
- Người chơi vừa đánh boss vừa ngăn chiến tranh giết dân thường.
- Trái Tim biến cảm xúc thành luật combat.

### Cơ chế dùng được

- **Rage meter:** đánh trong giận dữ, truy sát lính rút lui, hoặc để dân chết làm meter tăng; Titan mạnh hơn.
- **Loa tuyên truyền:** buff hai phe. Deep phá loa thay vì truy sát.
- **Evac route:** Block giữ tuyến, Henry ra lệnh không giết người đầu hàng, Solei cứu trẻ bị đánh dấu.
- **Tulas triage:** Tulas khóa vết thương, lọc độc, dựng màng chắn chất lỏng, hoặc kéo NPC ra khỏi vùng đỏ. Làm tốt giảm Rage và mở assist; làm quá tay có thể khiến vài NPC hoảng sợ hoặc tăng Heat cục bộ.
- **Block shelter:** Block cắm khiên/giữ cầu trong thời gian giới hạn. Nếu người chơi bỏ mặc tuyến này, dân thường chết và Titan sạc nhanh hơn.
- **Nhịp tim Heniana:** đánh đúng nhịp gây damage tốt; đánh loạn nhịp tăng Rage.

### Boss

**Titan Trái Tim**

- Core chính nối với xác rồng.
- Hai phe vẫn đánh nhau trong arena.
- Weakpoint xuất hiện khi người chơi giảm Rage bằng hành động bảo vệ.
- Kết trận: Jamerson lấy Trái Tim và bỏ lại hàng trăm người đang chết. Nhóm nên bị buộc chọn cứu người thay vì đuổi theo ngay; đây là payoff cho Tulas và Block, vì họ dùng chính sức mạnh/cơ thể bị xem là thô bạo để giữ người khác sống.

## Stage 5 - The Cradle

## 5-1. Vùng mơ của Thần Sơ Sinh

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

### Puzzle/encounter

- **Phòng ngủ đông trắng:** Heni nghe Heniana mơ; người chơi phải phân biệt ký ức của Heni, Heniana và Jamerson.
- **Cổng ký ức:** mỗi cổng cần một luật đã học: nhìn qua Con Mắt, đi im lặng qua Cái Tai, từ chối tên của Cái Lưỡi, hạ Rage của Trái Tim.
- **Ghost không có hồ sơ:** cổng chỉ mở cho kẻ "thất bại" ngoài dữ liệu. Đây là payoff cho Bastonne.
- **Lối thoát Marseille giả:** mở ra nếu bỏ lại các bóng tù nhân. Cách đúng là quay lại cứu họ, làm route dài hơn nhưng giảm áp lực encounter 5-2.
- **Lời hứa im lặng của Sakuri:** Heni có thể mở cổng nhanh bằng cộng hưởng đau đớn. Cách đúng là để Solei giữ cô lại và tìm đường khác bằng stealth/âm thanh.
- **Bàn thờ Calvaria:** giọng người chết chỉ đường rất ngắn. Cách đúng là dùng Cái Lưỡi để nhận ra lời giả và chọn đường không có phần thưởng tức thì.

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

### Nghi lễ ngược sau boss

Sau The Father-Eye, không nên cắt thẳng sang cinematic dài. Người chơi nên có một đoạn điều khiển ngắn, chậm hơn combat nhưng vẫn có áp lực, để trả các mảnh thần qua Dây Rốn.

Mục tiêu:

- **Keep Links Severed:** các liên kết Mắt/Tai/Lưỡi/Tim cố nối lại vào Heniana, Heni hoặc xác Jamerson. Người chơi phải giữ từng tuyến bằng nhân vật phù hợp.
- **Protect Heni and Heniana:** Heni cần đứng gần Dây Rốn nhưng không được bị kéo thành vật tế. Heniana cần được giữ ổn định như một người bệnh, không như core thần lực.
- **Open Evac Route:** Block và Deep giữ đường rút cho dân, tù binh và cả lính đầu hàng của hai phe.
- **No More Sacrifice:** Henry giữ lệnh Hold Fire/Protect Civilians; nếu người chơi giết mục tiêu đầu hàng ở đoạn này, nghi lễ bất ổn hơn.
- **Triage:** Tulas cứu người bị nối vào mạch thần. Cứu càng nhiều, epilogue càng rõ cảm giác thế giới nhẹ đi.

Vai trò payoff:

- **Ghost:** cắt Con Mắt vì hệ thống không nhận diện anh.
- **Solei:** giữ Heni bằng tên riêng, không để UI gọi cô là "clone key" hay "Heniana copy".
- **Henry:** dùng COMMAND lần cuối để cấm vật tế thay vì tối ưu sát thương.
- **Deep:** không đánh đòn kết liễu; anh giữ tuyến và kéo người sống ra ngoài.
- **Tulas:** dùng máu/chất lỏng để cứu người mà không biến họ thành công cụ mở khóa.
- **Block:** giữ cổng đủ lâu để người sống rời đi, kể cả người từng là địch.
- **Heni:** tự chạm Dây Rốn khi người chơi đã tạo đủ khoảng an toàn; đây là prompt xác nhận agency, không phải nút hi sinh.

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
