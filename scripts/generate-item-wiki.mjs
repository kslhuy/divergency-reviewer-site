import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('../', import.meta.url));

export const ITEMS_DATA = [
  // ROW 0
  {
    id: "item_0_0",
    row: 0, col: 0,
    sprite: "imgs/items/item_r0_c0.png",
    nameVi: "Chùy Gai Rỉ Máu Bastonne",
    nameEn: "Bloodied Trench Club",
    category: "Vũ khí cận chiến",
    stage: "Chương 0: Nhà tù Bastonne",
    role: "Phá vỡ thế thủ (Guard Break) & Gây Chảy Máu",
    desc: "Khối chùy gỗ đặc bịt đai sắt đóng đầy đinh rỉ, thấm đẫm máu khô của các cai ngục và tù nhân trong cuộc hỗn chiến ngục tối.",
    combat: "Đòn đánh chậm nhưng lực va chạm cực mạnh. Đòn vung hạng nặng (Heavy Swing) lập tức bẻ gãy thế thủ (Guard Break) của lính giáp, gây hiệu ứng Choáng (Stagger) kéo dài 1.5 giây và tích lũy trạng thái Chảy Máu (Bleed).",
    synergy: "Rất hợp khi mở đầu combat để đập vỡ khiên chắn của đối phương, tạo cửa sổ cho đồng đội lao vào tung chuỗi liên hoàn đòn."
  },
  {
    id: "item_0_1",
    row: 0, col: 1,
    sprite: "imgs/items/item_r0_c1.png",
    nameVi: "Vỏ Ốc Xà Cừ Hoàng Kim",
    nameEn: "Golden Nautilus Shell",
    category: "Cổ vật bảo hộ",
    stage: "Chương 1: Cảng Cổ Marseille",
    role: "Kháng âm thanh chấn động & Lệch sóng ma thuật",
    desc: "Hóa thạch ốc anh vũ biển sâu dát lớp xà cừ óng ánh hổ phách, lưu giữ tiếng vọng của đại dương tiền sử trước thảm họa Sao Rơi.",
    combat: "Khi kích hoạt, tạo ra một trường cộng hưởng âm học trong 6 giây: giảm 40% sát thương từ các đòn chấn động, tiếng thét của đàn hợp xướng (Voro Choir) và sóng xung kích diện rộng.",
    synergy: "Bảo vệ cả đội khỏi bị ngắt chuỗi combo khi giao chiến với nhóm quái dị giáo có đòn gầm thét gây choáng."
  },
  {
    id: "item_0_2",
    row: 0, col: 2,
    sprite: "imgs/items/item_r0_c2.png",
    nameVi: "Bàn Tay Quỷ Đứt Lìa",
    nameEn: "Severed Fiend Claw",
    category: "Dị vật hiến tế",
    stage: "Chương 2: Tế đàn Sakuri",
    role: "Cường hóa đòn vật (Grapple) & Hút sinh lực",
    desc: "Bàn tay ba ngón xám ngoét với móng vuốt cong hoắm, phần cổ tay đứt lìa vẫn còn rỉ chất dịch đen ma quỷ.",
    combat: "Gia tăng 25% uy lực cho các chiêu quật ngã, tóm bắt và ném đối thủ. Khi đè nghiến kẻ địch xuống mặt sàn, bàn tay sẽ siết chặt khí quản mục tiêu, hồi 5% HP cho người thi triển.",
    synergy: "Đặc biệt hiệu quả trong các pha khống chế đấu sĩ đơn lẻ hoặc quái vật tinh anh (Elite creeps)."
  },
  {
    id: "item_0_3",
    row: 0, col: 3,
    sprite: "imgs/items/item_r0_c3.png",
    nameVi: "Khối Đá Mắt Ma Ám",
    nameEn: "Ghost-Eye Soul Stone",
    category: "Ngọc cảm ứng",
    stage: "Chương 3: Hẻm đá Calvaria",
    role: "Phát hiện phục kích & Cảnh báo nguy hiểm",
    desc: "Khối đá núi lửa màu tro xám với con mắt đỏ ngầu nằm ẩn giữa các nếp đá, liên tục đảo quanh quan sát.",
    combat: "Soi sáng và định vị toàn bộ kẻ địch tàng hình, lính bắn lén núp sau thùng gỗ và bẫy ngầm trong bán kính 10 mét. Khi lượng HP của đội rơi vào mức báo động đỏ, ngọc sẽ phát ra luồng xung kích nhẹ đẩy lùi quái nhỏ.",
    synergy: "Giúp người chơi kiểm soát nhịp độ bản đồ, tránh bị móc lốp bất ngờ trong các màn cống ngầm tối tăm."
  },
  {
    id: "item_0_4",
    row: 0, col: 4,
    sprite: "imgs/items/item_r0_c4.png",
    nameVi: "Lưỡi Quỷ Câm Lặng",
    nameEn: "Flayed Hex Tongue",
    category: "Xúc tác cấm thuật",
    stage: "Chương 3: Thánh đường Calvaria",
    role: "Vùng câm lặng (Silence Aura) & Ngắt chú",
    desc: "Chiếc lưỡi thịt đỏ lòm bị xẻ đôi của một kẻ cuồng tín, rỉ máu đen phong ấn lời nguyền báng bổ.",
    combat: "Nghiền nát vật phẩm để phóng ra làn sóng Câm Lặng bán kính 8 mét trong 8 giây: toàn bộ pháp sư địch và lính dị giáo lập tức bị khóa chiêu thức phép thuật, buộc phải đánh cận chiến.",
    synergy: "Khắc chế tuyệt đối các đợt niệm phép diện rộng của dàn tế lễ Voro Choir."
  },
  {
    id: "item_0_5",
    row: 0, col: 5,
    sprite: "imgs/items/item_r0_c5.png",
    nameVi: "Vòng Xiềng Đá Tội Đồ Bastonne",
    nameEn: "Bastonne Shackle Torc",
    category: "Trang bị kiên định",
    stage: "Chương 0: Nhà tù Bastonne",
    role: "Kháng hất văng (Knockback Resist) & Trụ vững",
    desc: "Vòng đai đá cứng bọc sắt rạn nứt mang mã số tù khổ sai, minh chứng cho ý chí sinh tồn không thể bẻ gãy.",
    combat: "Giảm 35% lực đẩy lùi và kháng 40% trạng thái bay người khi bị kẻ địch đánh dồn. Giúp đấu sĩ đứng vững chân trên sàn đấu để phản kích ngay tức thì.",
    synergy: "Hoàn hảo cho lối đánh áp sát trực diện, biến đấu sĩ thành bức tường thành không thể suy chuyển."
  },
  {
    id: "item_0_6",
    row: 0, col: 6,
    sprite: "imgs/items/item_r0_c6.png",
    nameVi: "Trùng Tủy Sống Có Cánh",
    nameEn: "Winged Spinal Parasite",
    category: "Ký sinh trùng hắc ám",
    stage: "Chương 4: Hang Rồng Akam Meskul",
    role: "Bảo hộ tử địa & Nổ gai xương",
    desc: "Sinh vật đốt xương gớm ghiếc có đôi cánh thịt tím thẫm và hàm răng tua tủa, chuyên bám vào đốt sống.",
    combat: "Khi chịu đòn đánh chí mạng có thể dẫn đến gục ngã, trùng tủy lập tức phát nổ bung các gai xương xung quanh: gây sát thương đẩy lùi đám đông và giữ người chơi sống sót ở mức 1 HP (hồi lại sau mỗi màn chơi).",
    synergy: "Bảo hiểm sinh mạng vô giá trong các trận chạm trán boss có đòn dứt điểm chết người."
  },
  {
    id: "item_0_7",
    row: 0, col: 7,
    sprite: "imgs/items/item_r0_c7.png",
    nameVi: "Chân Xác Ướp Phong Ấn",
    nameEn: "Mummified Stalker Foot",
    category: "Cổ vật di chuyển",
    stage: "Chương 4: Hầm mộ xương rồng",
    role: "Gia tăng cự ly lướt né & Vệt làm chậm",
    desc: "Bàn chân khô quắt bọc dải vải vàng vương triều cổ, rỉ ra làn khói mù mịt mang tử khí.",
    combat: "Tăng 25% khoảng cách lướt né (Dash distance) và tốc độ trượt sàn. Khi lướt qua chân kẻ địch, để lại vệt tro tàn làm giảm 30% tốc độ chạy của đối thủ trong 3 giây.",
    synergy: "Tối ưu hóa khả năng thả diều (kiting) và cơ động thoát khỏi vòng vây của đám đông quái vật."
  },

  // ROW 1
  {
    id: "item_1_0",
    row: 1, col: 0,
    sprite: "imgs/items/item_r1_c0.png",
    nameVi: "Vải Liệm Rách Bastonne",
    nameEn: "Torn Bastonne Shroud",
    category: "Dụng cụ sinh tồn",
    stage: "Chương 0: Nhà tù Bastonne",
    role: "Cầm máu tức thì & Xóa hiệu ứng Bleed",
    desc: "Mảnh vải bao bố thô rách tơi tả dính đất bùn và vệt máu khô, vật dụng cấp cứu thô sơ nhưng cứu mạng của tử tù.",
    combat: "Sử dụng khẩn cấp để ngừng ngay trạng thái Mất Máu liên tục (Bleed) và hồi phục 10% lượng máu tối đa. Có thể mang theo số lượng lớn trong túi đồ dã chiến.",
    synergy: "Cần thiết trong mọi cuộc đối đầu với lính dùng dao găm hoặc quái có vuốt cào xé."
  },
  {
    id: "item_1_1",
    row: 1, col: 1,
    sprite: "imgs/items/item_r1_c1.png",
    nameVi: "Hoa Huyết Liên Heniana",
    nameEn: "Heniana Cursed Lotus",
    category: "Dược thảo thánh địa",
    stage: "Chương 2: Cầu Sakuri & Heniana",
    role: "Hồi Thể Lực & Năng Lượng Đòn Phối Hợp",
    desc: "Đóa hoa màu hồng tím rực rỡ với nhị vàng chói lọi, mọc lên từ những khe đá ngấm huyết dịch nguyên thủy.",
    combat: "Nhai hoa giúp hồi phục lập tức 50% thanh Thể Lực (Stamina) và tích đầy 1 nấc thanh Synergy của đội. Tác dụng phụ: màn hình hơi chao đảo ánh tím trong 4 giây.",
    synergy: "Cung cấp nguồn năng lượng dồi dào để lập tức kích hoạt chuỗi hợp chiêu đồng đội giải nguy."
  },
  {
    id: "item_1_2",
    row: 1, col: 2,
    sprite: "imgs/items/item_r1_c2.png",
    nameVi: "Sọ Nứt Khát Máu",
    nameEn: "Cracked Crimson Skull",
    category: "Dị vật cuồng nộ",
    stage: "Chương 3: Đấu trường Calvaria",
    role: "Trạng thái Cuồng Sát (Berserk) khi thấp máu",
    desc: "Hộp sọ vỡ toác để lộ khoang rỗng bốc khói đỏ thẫm, chứa đựng sự hận thù của những đấu sĩ tử trận.",
    combat: "Khi HP của nhân vật tụt xuống dưới 30%, sọ nứt phát hỏa: tăng 35% tốc độ ra đòn và 40% sát thương chí mạng cho tới khi HP được hồi phục lại.",
    synergy: "Biến tình thế ngàn cân treo sợi tóc thành đợt phản công lội ngược dòng ngoạn mục."
  },
  {
    id: "item_1_3",
    row: 1, col: 3,
    sprite: "imgs/items/item_r1_c3.png",
    nameVi: "Nanh Độc & Xương Nhọn Bẫy Chông",
    nameEn: "Bone Shards & Venom Fangs",
    category: "Vũ khí đặt bẫy",
    stage: "Chương 1: Phố Noailles & Cống ngầm",
    role: "Rải chông sàn đấu & Bẫy làm khựng kẻ địch",
    desc: "Cụm xương sườn gãy bén ngót cùng răng nanh thú săn mồi ngâm trong dịch độc màu xanh lục bảo.",
    combat: "Rải một cụm chông xương trên mặt sàn. Kẻ địch giẫm phải sẽ bị đâm xuyên chân, khựng đòn (Hitstun) 1.2 giây và nhận sát thương độc ăn mòn rút máu dần.",
    synergy: "Bảo vệ sườn và lưng của đội, chia cắt đội hình địch khi bị bao vây từ hai phía."
  },
  {
    id: "item_1_4",
    row: 1, col: 4,
    sprite: "imgs/items/item_r1_c4.png",
    nameVi: "Mặt Nạ Tóc Bện Người Chết",
    nameEn: "Matted Hair Shroud Mask",
    category: "Mặt nạ kinh hoàng",
    stage: "Chương 3: Nhà thờ Calvaria",
    role: "Áp đảo tinh thần & Làm đối thủ đánh trượt",
    desc: "Mặt nạ làm bằng da mặt thuộc thủ công kết hợp tóc bện khô cứng, toát ra tử khí kinh rợn.",
    combat: "Kẻ địch cận chiến đứng gần người đeo mặt nạ sẽ bị giảm 20% lực tấn công và có 25% tỷ lệ tung đòn đánh bị trượt (Whiff) do hoảng sợ tinh thần.",
    synergy: "Giảm tải áp lực sát thương cho tuyến đầu khi đối đầu bầy quái vật đông đảo."
  },
  {
    id: "item_1_5",
    row: 1, col: 5,
    sprite: "imgs/items/item_r1_c5.png",
    nameVi: "Cánh Tay Bóng Tối Hư Vô",
    nameEn: "Abyssal Shadow Arm",
    category: "Xúc tác không gian",
    stage: "Chương 2: Sakuri",
    role: "Kéo rớt mục tiêu trên không & Khống chế sàn",
    desc: "Cánh tay quỷ màu xám tro vươn lên từ các sợi gân máu đen, như muốn lôi tuột mọi sinh linh xuống vực thẳm.",
    combat: "Trong lúc tung đòn kết hợp, cánh tay bóng tối trồi lên tóm chặt kẻ địch đang nhảy né trên không trung, quật thẳng xuống mặt đất gây choáng diện rộng.",
    synergy: "Trừng phạt triệt để các đơn vị kẻ địch có thói quen bay lượn hoặc nhảy đạp từ trên cao."
  },
  {
    id: "item_1_6",
    row: 1, col: 6,
    sprite: "imgs/items/item_r1_c6.png",
    nameVi: "Cấm Thư Pha Lê Phong Ấn",
    nameEn: "Crystal-Bound Grimoire",
    category: "Cấm thư bí thuật",
    stage: "Chương 1: Trạm ngầm MuCEM Shemal",
    role: "Giảm thời gian hồi chiêu & Tăng slot chiêu thức",
    desc: "Cuốn sách bìa da dày cộp nẹp các phiến đá thạch anh tím phát quang, lưu giữ nghiên cứu cấm về đột biến thể xác.",
    combat: "Rút ngắn 20% thời gian hồi của tất cả kỹ năng kích hoạt của toàn đội; gia tăng 15% diện tích ảnh hưởng của các chiêu thức hỗ trợ.",
    synergy: "Trang bị cốt cán cho đội hình thiên về sử dụng kỹ năng đặc biệt liên tục."
  },
  {
    id: "item_1_7",
    row: 1, col: 7,
    sprite: "imgs/items/item_r1_c7.png",
    nameVi: "Ổ Kén Bào Tử Tím",
    nameEn: "Clustered Spore Pods",
    category: "Bom sinh học",
    stage: "Chương 4: Hang Rồng",
    role: "Nổ sương mù độc hại & Giảm tầm nhìn địch",
    desc: "Chùm trứng tím sẫm dập dờn như kén ong bắp cày đột biến, sẵn sàng nổ tung khi chịu lực tác động.",
    combat: "Vật phẩm ném: Khi chạm đất nổ tung thành đám mây sương mù độc tố tím che khuất tầm nhìn, khiến quái vật trong vùng ảnh hưởng bị trúng độc và mất mục tiêu tấn công trong 5 giây.",
    synergy: "Tạo khoảng trống an toàn cho đồng đội lùi bước hồi phục hoặc hồi sinh thành viên bị ngã."
  },

  // ROW 2
  {
    id: "item_2_0",
    row: 2, col: 0,
    sprite: "imgs/items/item_r2_c0.png",
    nameVi: "Chuông Đồng Hồn Bastonne",
    nameEn: "Golden Funeral Bell",
    category: "Công cụ chỉ huy",
    stage: "Chương 0: Nhà tù Bastonne",
    role: "Giải cứu trạng thái khống chế & Tăng phòng ngự",
    desc: "Quả chuông bằng đồng đúc hoa văn tang lễ, tiếng chuông ngân vang có thể xua tan sự u mê ám ảnh.",
    combat: "Rung chuông lập tức xóa bỏ toàn bộ hiệu ứng Choáng, Đóng Băng và Bị Trói cho cả đội ngũ, đồng thời tăng 25% Giáp trụ cho toàn bộ thành viên trong 8 giây.",
    synergy: "Nút bấm cứu cánh tối thượng khi đội hình bị dồn vào chân tường bởi kỹ năng khống chế diện rộng của boss."
  },
  {
    id: "item_2_1",
    row: 2, col: 1,
    sprite: "imgs/items/item_r2_c1.png",
    nameVi: "Hóa Thạch Cúc Đá Vực Sâu",
    nameEn: "Fossilized Ammonite Shell",
    category: "Giáp ngực phòng ngự",
    stage: "Chương 1: Bờ biển Marseille",
    role: "Giảm sát thương đâm xuyên & Chống đạn tầm xa",
    desc: "Vỏ cúc đá hóa thạch hàng triệu năm tuổi với các đường vân xoắn ốc hoàn mỹ, cứng hơn thép tôi luyện.",
    combat: "Giảm 30% sát thương từ mọi đòn tấn công tầm xa (mũi tên, đạn súng lính canh, dao phóng) từ góc chính diện.",
    synergy: "Cho phép đấu sĩ tiên phong dẫn đầu mở đường tiếp cận toán xạ thủ địch mà không bị tỉa máu."
  },
  {
    id: "item_2_2",
    row: 2, col: 2,
    sprite: "imgs/items/item_r2_c2.png",
    nameVi: "Mặt Nạ Quỷ Lửa Tím",
    nameEn: "Phantom Pyre Mask",
    category: "Mặt nạ nguyên tố",
    stage: "Chương 2: Sakuri",
    role: "Đốt cháy nội lực kẻ địch (Mana Burn)",
    desc: "Mặt nạ nứt nửa bốc ngọn lửa ma thuật màu tím ma mị, hút lấy tinh thần lực của kẻ thù bị thiêu đốt.",
    combat: "Mỗi đòn đánh trúng đích gây thêm sát thương hỏa ngục tím và thiêu đốt 10% thanh nộ/mana của đối thủ, ngăn cản trùm sử dụng tuyệt kỹ.",
    synergy: "Cực kỳ giá trị khi đánh trùm để trì hoãn các đòn quét sàn chí mạng."
  },
  {
    id: "item_2_3",
    row: 2, col: 3,
    sprite: "imgs/items/item_r2_c3.png",
    nameVi: "Móng Vuốt Ăn Mòn Axit",
    nameEn: "Corrosive Acid Stinger",
    category: "Chất phủ vũ khí",
    stage: "Chương 1: Cống ngầm Laundel",
    role: "Bào mòn thanh Giáp Trụ & Tăng sát thương đội",
    desc: "Móng vuốt bọ cạp cống rãnh đột biến, đầu ngọn nhỏ giọt axit xanh chanh sôi sùng sục làm mủn cả kim loại.",
    combat: "Bôi lên vũ khí trong 15 giây: các đòn đánh sẽ phá hủy 35% lớp giáp cứng của mục tiêu, khiến các đòn đánh sau của toàn đội gây thêm 25% sát thương lên kẻ đó.",
    synergy: "Vũ khí phối hợp ăn ý để dồn sát thương tiêu diệt các quái vật thể xác trâu bò."
  },
  {
    id: "item_2_4",
    row: 2, col: 4,
    sprite: "imgs/items/item_r2_c4.png",
    nameVi: "Trái Tim Tội Lỗi Ngọ Nguậy",
    nameEn: "Pulsing Heart of Sin",
    category: "Dị vật lõi trùm",
    stage: "Chương 3: Rớt từ Trùm Calvaria",
    role: "Tăng mạnh công kích & Tự tổn thương nhỏ",
    desc: "Khối thịt dạng trái tim màu tím thẫm đập thình thịch, mở ra một con mắt đỏ rực giữa những xúc tu ngoe nguẩy.",
    combat: "Cổ vật cực mạnh: Tăng 45% tổng lực sát thương và tăng 25% tốc độ thực hiện đòn đánh; đổi lại, người giữ mất 1.5% máu sau mỗi 10 giây chiến đấu.",
    synergy: "Dành riêng cho người chơi có kỹ năng né đòn điêu luyện, chuộng lối đánh hủy diệt dồn dập."
  },
  {
    id: "item_2_5",
    row: 2, col: 5,
    sprite: "imgs/items/item_r2_c5.png",
    nameVi: "Thủ Cấp Quỷ Đá Galio",
    nameEn: "Galio Stone Gargoyle Head",
    category: "Vật ném hạng nặng",
    stage: "Chương 1: Marseille",
    role: "Ném đè bẹp lính & Chắn lối đi hẹp",
    desc: "Đầu tượng đá gãy từ mái vòm nhà thờ cổ, nhe hàm răng sắc nhọn với ánh mắt trừng trừng dữ dội.",
    combat: "Có thể bưng lên ném thẳng vào hàng ngũ địch: gây sát thương đè bẹp diện rộng và tạo thành một chướng ngại vật cản đường trên sàn đấu.",
    synergy: "Tận dụng các lối đi hẹp để phong tỏa đường tiến của viện binh địch."
  },
  {
    id: "item_2_6",
    row: 2, col: 6,
    sprite: "imgs/items/item_r2_c6.png",
    nameVi: "Cây Nến Mắt Lệ Khóc",
    nameEn: "Weeping Eye Candle",
    category: "Nguồn sáng tâm linh",
    stage: "Chương 1: Mê cung Laundel",
    role: "Soi tỏ lối đi bí mật & Làm yếu quái bóng tối",
    desc: "Cây nến sáp trắng tạc hình con mắt nhỏ lệ, ngọn lửa xanh soi tỏ những thứ ẩn giấu nơi tăm tối.",
    combat: "Xua tan hoàn toàn sương mù hắc ám trong màn cống ngầm; làm suy yếu 30% phòng thủ của các sinh vật sống trong bóng tối khi chúng bước vào vùng sáng.",
    synergy: "Vật phẩm bắt buộc phải có để hoàn thành trọn vẹn các bí mật và phòng ẩn ở Màn 1-4."
  },
  {
    id: "item_2_7",
    row: 2, col: 7,
    sprite: "imgs/items/item_r2_c7.png",
    nameVi: "Khối Băng Tinh Linh Thể",
    nameEn: "Pure Frost Shard Cluster",
    category: "Tinh thể băng",
    stage: "Chương 3: Vực gió tuyết Calvaria",
    role: "Tích tụ Đóng Băng (Freeze) & Đập Vỡ (Shatter)",
    desc: "Cụm băng vĩnh cửu bao bọc lấy một viên ngọc tím ở tâm, tỏa ra luồng khí hàn băng buốt giá.",
    combat: "Gán sát thương Băng vào các đòn đánh: sau 4 đòn đánh trúng, kẻ địch bị đóng băng hoàn toàn trong 2.5 giây; một đòn đánh nặng tiếp theo sẽ kích hoạt Đập Vỡ gây thêm 50% sát thương bộc phát.",
    synergy: "Tạo cơ hội vàng cho toàn đội tập trung tung đòn kết liễu an toàn tuyệt đối."
  },

  // ROW 3
  {
    id: "item_3_0",
    row: 3, col: 0,
    sprite: "imgs/items/item_r3_c0.png",
    nameVi: "Đoản Kiếm Đấu Sĩ Bastonne",
    nameEn: "Gladiator Short Sword",
    category: "Vũ khí cận chiến",
    stage: "Chương 0: Nhà tù Bastonne",
    role: "Tốc độ vung đòn nhanh, đỡ gạt (Parry) & Phản đòn",
    desc: "Thanh đoản kiếm chuôi chữ thập đúc từ sắt phế liệu ngục tù, lưỡi kiếm mẻ nhiều vết nhưng mũi nhọn vẫn cực kỳ sắc bén.",
    combat: "Kiếm ngắn chuẩn mực cho phong cách chiến đấu đấu sĩ. Khung thời gian thu đòn (Recovery) chớp nhoáng, cho phép hóa giải đòn đánh của địch bằng đòn Đỡ Gạt (Parry) chính xác và phản kích tức thì.",
    synergy: "Hoàn hảo cho người chơi ưa thích lối đánh đấu sĩ cự ly gần: công thủ toàn diện và không có độ trễ động tác."
  },
  {
    id: "item_3_1",
    row: 3, col: 1,
    sprite: "imgs/items/item_r3_c1.png",
    nameVi: "Thân Tượng Đá Nữ Thần Vô Diện",
    nameEn: "Marble Idol Torso",
    category: "Cổ vật kiên định",
    stage: "Chương 1: Đền thờ cổ Vieux-Port",
    role: "Tăng Siêu Cương Thể (Super Armor)",
    desc: "Pho tượng bán thân bằng cẩm thạch trắng bị bào mòn bởi sóng biển, toát lên vẻ trang nghiêm bất khả xâm phạm.",
    combat: "Gia tăng 60% chỉ số Kiên Cường (Poise). Khi chiến binh bước vào động tác vung đòn tấn công đặc biệt, sẽ hoàn toàn không bị gián đoạn bởi các đòn đánh thông thường.",
    synergy: "Đảm bảo các tuyệt chiêu diện rộng luôn được thi triển trọn vẹn ngay giữa làn mưa đòn."
  },
  {
    id: "item_3_2",
    row: 3, col: 2,
    sprite: "imgs/items/item_r3_c2.png",
    nameVi: "Cánh Tay Xác Sống Trương Phình",
    nameEn: "Swollen Ghoul Arm",
    category: "Dị vật thể xác",
    stage: "Chương 1: Hố rác cống ngầm",
    role: "Tăng cự ly tóm bắt & Ném đập tường (Wall-Splat)",
    desc: "Cánh tay thây ma cơ bắp phình to quấn chặt bằng gân mục nát, các ngón tay co quắp như móng kẹp sắt.",
    combat: "Tăng cự ly thi triển đòn tóm bắt thêm 30%. Khi ném kẻ địch va vào vách tường đá, tạo dư chấn chấn động làm ngã ngửa các kẻ địch lân cận.",
    synergy: "Tận dụng triệt để địa hình chật hẹp trong hẻm phố Marseille để kiểm soát đám đông."
  },
  {
    id: "item_3_3",
    row: 3, col: 3,
    sprite: "imgs/items/item_r3_c3.png",
    nameVi: "Răng Quỷ Nhuốm Máu Tươi",
    nameEn: "Blood-Rooted Demon Molar",
    category: "Bùa chú thể chất",
    stage: "Chương 3: Calvaria",
    role: "Kích hoạt Thân Thể Sắt (Iron Body)",
    desc: "Chiếc răng hàm khổng lồ hai chân răng đẫm máu tươi, tỏa ra hơi ấm kỳ dị của loài quái thú hung tợn.",
    combat: "Cắn vỡ răng quỷ để nhận trạng thái Thiết Bì trong 10 giây: miễn nhiễm hoàn toàn với ngã ngựa, choáng và giật lùi, sẵn sàng càn quét thẳng vào tuyến hỏa lực địch.",
    synergy: "Mở đường xung phong phá vỡ các đội hình lính bắn tỉa hoặc phòng thủ khiên kiên cố."
  },
  {
    id: "item_3_4",
    row: 3, col: 4,
    sprite: "imgs/items/item_r3_c4.png",
    nameVi: "Lọ Độc Dược Tím Đậm",
    nameEn: "Concentrated Nightshade Phial",
    category: "Dược phẩm chiến thuật",
    stage: "Chương 1: Quán bar Armorlite",
    role: "Gia tốc né tránh & Gây hỗn loạn đối thủ",
    desc: "Ống nghiệm thủy tinh nút bấc chứa chất lỏng màu tím phát quang, điều chế từ thảo dược ngầm Marseille.",
    combat: "Uống để tăng 40% tốc độ di chuyển và tốc độ né tránh trong 12 giây; đồng thời các đòn đánh tay có 20% khả năng khiến kẻ địch bị Lú Lẫn tự tấn công đồng bọn.",
    synergy: "Gây rối loạn phòng tuyến đông đúc của địch, tạo cơ hội cho đồng đội rảnh tay hành động."
  },
  {
    id: "item_3_5",
    row: 3, col: 5,
    sprite: "imgs/items/item_r3_c5.png",
    nameVi: "Bình Rượu Ngục Bện Rơm Bastonne",
    nameEn: "Bastonne Woven Canteen",
    category: "Dược phẩm hồi phục",
    stage: "Chương 0: Nhà tù Bastonne",
    role: "Hồi phục Thể Lực & Xóa bỏ Kiệt Sức",
    desc: "Bình gốm bọc dây gai đan thủ công kèm dây đeo vai, đựng loại rượu nặng giúp tù nhân chống chọi cái lạnh thấu xương.",
    combat: "Lập tức hồi phục 70% thanh Thể Lực và xóa bỏ hoàn toàn trạng thái Kiệt Sức (Exhaustion), tăng 50% tốc độ hồi thể lực trong 20 giây tiếp theo.",
    synergy: "Duy trì khả năng ra đòn liên tục không ngừng nghỉ trong các trận hỗn chiến kéo dài."
  },
  {
    id: "item_3_6",
    row: 3, col: 6,
    sprite: "imgs/items/item_r3_c6.png",
    nameVi: "Đao Cong Hải Tặc Vieux-Port",
    nameEn: "Vieux-Port Harbor Cutlass",
    category: "Vũ khí chém quét",
    stage: "Chương 1: Bến cảng Marseille",
    role: "Quét góc 180 độ & Hất tung diện rộng",
    desc: "Thanh đao cong một lưỡi với quai chuôi bằng đồng thau nặng trịch, vũ khí ưa thích của giới buôn lậu hải cảng.",
    combat: "Đòn chém quét hình bán nguyệt cực rộng phía trước, dễ dàng hất tung 3-4 tên địch cùng lúc lên không trung để tiếp nối combo không chiến.",
    synergy: "Giải vây ngoạn mục khi bị bao vây tứ phía bởi toán lính cận chiến số lượng đông."
  },
  {
    id: "item_3_7",
    row: 3, col: 7,
    sprite: "imgs/items/item_r3_c7.png",
    nameVi: "Hắc Thư Khế Ước Laundel",
    nameEn: "Laundel Smuggler Ledger",
    category: "Tài liệu chiến dịch",
    stage: "Chương 1: Trạm Laundel",
    role: "Mở đường tắt cống ngầm & Bổ sung tiền thưởng",
    desc: "Cuốn sổ bìa da đen ghi chép các tuyến vận chuyển hàng ngầm và mật mã mở các cửa cống sluice dock.",
    combat: "Mở khóa các lối đi tắt bí mật qua cống ngầm Laundel, cho phép đội bỏ qua các chốt chặn hiểm trở và thu thập rương báu ẩn.",
    synergy: "Tăng lượng tiền thưởng nhận được sau màn chơi lên 30% để mua sắm nâng cấp trang bị."
  },

  // ROW 4
  {
    id: "item_4_0",
    row: 4, col: 0,
    sprite: "imgs/items/item_r4_c0.png",
    nameVi: "Mũi Lao Đá Silex Cổ",
    nameEn: "Ancient Flint Spearhead",
    category: "Vũ khí ném xuyên thấu",
    stage: "Chương 1: Vách đá Calanques",
    role: "Xuyên thấu hàng dọc & Ghim địch vào tường",
    desc: "Mũi lao tam diện bằng đá hoa cương nhọn hoắt, đẽo gọt công phu từ thời kỳ dựng làng ven biển.",
    combat: "Phóng thẳng với vận tốc cực cao, đâm xuyên qua toàn bộ kẻ thù đứng trên một đường thẳng và ghim chặt tên cuối cùng vào bờ tường đá trong 2 giây.",
    synergy: "Gom cụm toàn bộ hàng lính địch lại một chỗ để đồng đội tung đòn dứt điểm."
  },
  {
    id: "item_4_1",
    row: 4, col: 1,
    sprite: "imgs/items/item_r4_c1.png",
    nameVi: "Chuỗi Hạt Ngọc Huyết Tế Lễ",
    nameEn: "Bloodstone Rosary",
    category: "Phụ kiện ma thuật máu",
    stage: "Chương 2: Tu viện Sakuri",
    role: "Tiết kiệm tiêu hao máu khi thi triển huyết thuật",
    desc: "Sợi dây kim loại mảnh xâu các hạt ngọc đỏ rực như giọt máu đông, mang dấu ấn đức tin tử vì đạo.",
    combat: "Giảm 30% lượng HP phải tiêu hao khi kích hoạt các ấn chú ma thuật máu; tăng 15% tầm lan tỏa của các đòn bộc phá huyết thuật.",
    synergy: "Tối ưu hóa sức mạnh của người sử dụng phép thuật máu có dấu chữ thập ở ngực, giúp thi triển chiêu an toàn hơn."
  },
  {
    id: "item_4_2",
    row: 4, col: 2,
    sprite: "imgs/items/item_r4_c2.png",
    nameVi: "Mặt Nạ Kẻ Lắng Nghe",
    nameEn: "Mask of the Listening Route",
    category: "Cổ vật nhận diện đặc trưng",
    stage: "Chương 1: Hầm ngầm Marseille",
    role: "Mở rộng cửa sổ né đòn (Perfect Dodge) & Phản đòn",
    desc: "Mặt nạ đá trắng muốt với đôi mắt nhỏ lệ trầm tư, biểu tượng di sản quý báu của Divergency. Bản có công năng kiếm được trong gameplay; biến thể dành cho backer chỉ khác ngoại hình.",
    combat: "Mở rộng khung thời gian Né Tránh Hoàn Hảo (Perfect Dodge Window) thêm 0.25 giây; khi né sát sạt đòn địch, kích hoạt hiệu ứng Làm Chậm thời gian trong 1.5 giây để phản đòn chí mạng.",
    synergy: "Nâng tầm kỹ năng cá nhân của người chơi lên mức thượng thừa trong mọi kèo đấu tay đôi."
  },
  {
    id: "item_4_3",
    row: 4, col: 3,
    sprite: "imgs/items/item_r4_c3.png",
    nameVi: "Mặt Nạ Khâu Thịt Đơn Sừng",
    nameEn: "Stitched Flesh Horned Mask",
    category: "Mặt nạ chiến binh",
    stage: "Chương 3: Calvaria",
    role: "Cường hóa đòn húc đầu & Uy hiếp tinh thần",
    desc: "Mặt nạ chắp vá từ các thớ thịt thuộc cứng với chiếc sừng quỷ nhọn hoắt bên trán, vương mùi máu tanh nồng.",
    combat: "Tăng 35% sát thương cho các đòn húc, đòn đấm thẳng và phi thân; khi hạ gục một chỉ huy địch, phát ra tiếng gầm làm choáng lính xung quanh trong 1.5 giây.",
    synergy: "Rất thích hợp cho phong cách chiến đấu quyền anh, đấm đá cận chiến vũ bão."
  },
  {
    id: "item_4_4",
    row: 4, col: 4,
    sprite: "imgs/items/item_r4_c4.png",
    nameVi: "Lọ Huyết Thanh Đỏ Tươi",
    nameEn: "Vital Crimson Blood Phial",
    category: "Dược phẩm hồi máu cốt lõi",
    stage: "Chương 0 & Mọi màn chơi",
    role: "Hồi phục 40% Max HP tức thì",
    desc: "Ống nghiệm chứa tinh chất máu tươi thanh khiết nút bấc kín, dược phẩm sống còn của mọi chiến binh trên chiến trường.",
    combat: "Sử dụng tức thì để hồi phục ngay 40% thanh Máu tối đa. Có thể tích trữ tối đa 3 lọ trong túi trang bị mang theo.",
    synergy: "Huyết mạch duy trì sự sinh tồn của đội ngũ trong các đợt công kích dồn dập của trùm cuối."
  },
  {
    id: "item_4_5",
    row: 4, col: 5,
    sprite: "imgs/items/item_r4_c5.png",
    nameVi: "Đôi Giày Thám Hiểm Cảng Cổ",
    nameEn: "Harbor Runner Boots",
    category: "Trang bị di chuyển",
    stage: "Chương 1: Khu thợ đóng tàu",
    role: "Tăng tốc độ chạy & Chống trơn trượt địa hình",
    desc: "Đôi bốt da đanh dày gót đóng đinh tán, bảo vệ đôi chân chiến binh khỏi bùn lầy, nước bẩn và mảnh thủy tinh vỡ.",
    combat: "Tăng 15% tốc độ di chuyển cơ bản; miễn nhiễm hoàn toàn với hiệu ứng trơn trượt trên vũng nước dầu loang hoặc bùn lầy cống ngầm.",
    synergy: "Giúp người chơi duy trì thế chủ động về vị trí, chạy chỗ linh hoạt để bọc lót đồng đội."
  },
  {
    id: "item_4_6",
    row: 4, col: 6,
    sprite: "imgs/items/item_r4_c6.png",
    nameVi: "Thủ Cấp Chiến Mã Tế Đàn",
    nameEn: "Ritual Warsteed Skull",
    category: "Biểu tượng xung phong",
    stage: "Chương 4: Chiến trường Titan Trái Tim",
    role: "Cường hóa đòn đá phi thân & Phá vỡ đội hình",
    desc: "Đầu ngựa chiến sơn trắng vạch tế lễ đỏ quanh mắt, biểu trưng cho lòng dũng cảm của các kỵ sĩ tử thủ.",
    combat: "Tăng 30% sát thương và lực hất văng cho các cú đá phi thân (Running Kick / Flying Tackle), xuyên phá mọi hàng rào phòng thủ của đối phương.",
    synergy: "Xé toạc đội hình phòng ngự kiên cố của kẻ địch trong nháy mắt."
  },
  {
    id: "item_4_7",
    row: 4, col: 7,
    sprite: "imgs/items/item_r4_c7.png",
    nameVi: "Phi Tiêu Kunai Buộc Dải Lụa Đỏ",
    nameEn: "Tasseled Throwing Kunai",
    category: "Vũ khí ném tầm xa cơ động",
    stage: "Chương 1: Noailles",
    role: "Ngắt chiêu niệm chú tầm xa & Kích nổ thùng hàng",
    desc: "Lưỡi thép hai cạnh sắc bén có vòng khuyên buộc dải lụa đỏ thắm, trang bị ném dã chiến tiện dụng.",
    combat: "Phóng nhanh với quỹ đạo thẳng tắp: dùng để ngắt lời niệm chú của xạ thủ hoặc pháp sư địch từ xa, hoặc phóng kích nổ các thùng dầu/thùng thuốc nổ ven đường.",
    synergy: "Vũ khí hỗ trợ tầm xa hữu hiệu giúp đội kiểm soát tình hình mà không cần áp sát."
  },

  // ROW 5
  {
    id: "item_5_0",
    row: 5, col: 0,
    sprite: "imgs/items/item_r5_c0.png",
    nameVi: "Chén Thánh Huyết Tế Có Cánh",
    nameEn: "Winged Sacrificial Chalice",
    category: "Cổ vật hiến tế bàn thờ",
    stage: "Chương 0: Hầm mộ Bastonne",
    role: "Hiến tế máu đổi vô hạn thể lực & Tăng bạo kích",
    desc: "Chiếc chén bạc tạc hình mắt đỏ có cánh, chứa thứ huyết dịch cổ xưa của các nghi lễ hiến tế trần gian.",
    combat: "Chỉ người kích hoạt tự trả 10% MaxHP, không được làm HP còn dưới 1 và không trừ HP đồng đội. Đổi lấy 8 giây MP cost ×0.90 và CritChance +5 điểm phần trăm; một lần mỗi encounter, không cộng dồn hoặc làm mới thời gian. Không bỏ qua khóa encounter. Đây là đề xuất ngoài bản mastery thử nghiệm đầu.",
    synergy: "Chiến thuật tấn công tổng lực 'được ăn cả ngã về không' để kết liễu nhanh trùm nguy hiểm."
  },
  {
    id: "item_5_1",
    row: 5, col: 1,
    sprite: "imgs/items/item_r5_c1.png",
    nameVi: "Hình Nhân Rơm Phản Huyết Nguyền",
    nameEn: "Woven Retaliation Effigy",
    category: "Bùa chú phản đòn",
    stage: "Chương 2: Sakuri",
    role: "Phản sát thương thật (True Damage) lại kẻ tấn công",
    desc: "Hình nhân đan bằng rơm khô bị ghim đầy kim châm và bọc vải đen rách, kết nối nhân quả với linh hồn người đeo.",
    combat: "Khi nhân vật bị dính đòn nặng hoặc bị quăng ngã, 45% lượng sát thương nhận vào sẽ phản ngược trực tiếp thành sát thương thật lên kẻ vừa ra chiêu.",
    synergy: "Trừng phạt nghiêm khắc các tên trùm có đòn đánh sát thương khủng khiếp."
  },
  {
    id: "item_5_2",
    row: 5, col: 2,
    sprite: "imgs/items/item_r5_c2.png",
    nameVi: "Tượng Lữ Hành Vượt Biển Áo Xám",
    nameEn: "Drifting Pilgrim Figurine",
    category: "Bùa bình an",
    stage: "Chương 1: Vallon des Auffes",
    role: "Miễn nhiễm bẫy môi trường tự nhiên",
    desc: "Tượng nhỏ nặn hình người lữ hành trùm áo choàng đứng trên chiếc bè trôi, tượng trưng cho hành trình an toàn qua bão tố.",
    combat: "Bảo hộ người mang khỏi mọi cạm bẫy môi trường tự nhiên: không bị dính sát thương từ gai nhọn ngầm, axit rỉ cống rãnh hay đá sập từ trần hang.",
    synergy: "Giúp chiến binh thoải mái chiến đấu tự do mà không cần bận tâm đến địa hình hiểm trở."
  },
  {
    id: "item_5_3",
    row: 5, col: 3,
    sprite: "imgs/items/item_r5_c3.png",
    nameVi: "Khế Ước Da Cừu Bastonne Cổ",
    nameEn: "Bastonne Covenant Scroll",
    category: "Khế ước nhiệm vụ",
    stage: "Chương 0: Tủ hồ sơ Bastonne",
    role: "Mở khóa thử thách săn tiền thưởng trùm phụ",
    desc: "Cuộn giấy da dê ố vàng chép các thỏa ước bí mật giữa ban quản ngục Bastonne và tổ chức thế giới ngầm.",
    combat: "Kích hoạt nhiệm vụ săn tiền thưởng (Bounty Hunt) trong màn chơi: triệu hồi một tên trùm phụ tinh anh mang theo nhiều vật phẩm hiếm khi bị đánh bại.",
    synergy: "Gia tăng độ khó thử thách và mang lại lượng phần thưởng nâng cấp đồ sộ cho người chơi."
  },
  {
    id: "item_5_4",
    row: 5, col: 4,
    sprite: "imgs/items/item_r5_c4.png",
    nameVi: "Lam Ngọc Đầu Lâu Hồi Sinh",
    nameEn: "Emerald Soul Shard",
    category: "Cổ vật hồi sinh kỳ tích",
    stage: "Phần thưởng gameplay · biến thể backer chỉ đổi ngoại hình",
    role: "Tự động hồi sinh đồng đội gục ngã",
    desc: "Khối ngọc bích màu xanh lục trong vắt kết tinh hình đầu lâu, chứa đựng nguồn năng lượng linh hồn thuần khiết.",
    combat: "Đề xuất mở rộng: tiêu một charge để hồi sinh đồng đội với 30% MaxHP (tối thiểu 1 HP), tối đa một lần cho mỗi người mỗi encounter. Không tự tạo thêm charge, không kích hoạt dây chuyền, không vượt khóa kết thúc màn. Có thể kiếm bằng gameplay; không thuộc socket mastery bản đầu.",
    synergy: "Vị cứu tinh số một trong các màn vượt ải độ khó cao nhất của chiến dịch."
  },
  {
    id: "item_5_5",
    row: 5, col: 5,
    sprite: "imgs/items/item_r5_c5.png",
    nameVi: "Đại Chiến Búa Sọ Rồng Đỏ",
    nameEn: "Dragon Bone Warhammer",
    category: "Vũ khí hai tay hạng nặng",
    stage: "Chương 4: Hang Xương Rồng",
    role: "Đập sàn tạo địa chấn & Hất tung diện rộng",
    desc: "Cây búa chiến khổng lồ gắn hộp sọ rồng đỏ sừng nhọn hoắt, nặng tựa ngàn cân với sức tàn phá kinh hoàng.",
    combat: "Cú dộng búa cực mạnh xuống mặt sàn tạo sóng địa chấn nứt toác mặt đất trong bán kính 6 mét, hất tung toàn bộ kẻ địch lên không trung và vô hiệu hóa giáp nặng.",
    synergy: "Thiết lập tiền đề hoàn hảo cho chuỗi combo trên không của toàn đội."
  },
  {
    id: "item_5_6",
    row: 5, col: 6,
    sprite: "imgs/items/item_r5_c6.png",
    nameVi: "Thủ Cấp Ngâm Hũ Hóa Sinh MuCEM",
    nameEn: "Preserved Head in Formalin Jar",
    category: "Di cốt nghiên cứu khoa học",
    stage: "Chương 1: Trạm MuCEM Shemal",
    role: "Giải mã kháng tính & Mở khóa đặc quyền đội",
    desc: "Cái đầu người ngâm trong bình dung dịch hóa chất phát sáng xanh lục, mẫu vật giải phẫu của phòng thí nghiệm dưới biển.",
    combat: "Mang về xưởng căn cứ để phân tích gen: vĩnh viễn hiển thị thanh Máu và điểm yếu nguyên tố của tất cả quái vật trong các màn chơi kế tiếp.",
    synergy: "Cung cấp lợi thế thông tin chiến thuật vô giá để đội chuẩn bị trang bị khắc chế trước trận đánh."
  },
  {
    id: "item_5_7",
    row: 5, col: 7,
    sprite: "imgs/items/item_r5_c7.png",
    nameVi: "Ấu Trùng Sâu Mộ Ăn Xác",
    nameEn: "Carnivorous Grave Maggot",
    category: "Sinh vật hỗ trợ dọn dẹp",
    stage: "Chương 0 & Hầm mộ",
    role: "Tiêu thụ xác địch & Nhả ngọc hồi máu",
    desc: "Ấu trùng béo múp màu nâu đốt ngấn với vòng răng kim nhọn hoắt, chuyên rúc trong các hầm mộ ẩm ướt.",
    combat: "Thả ấu trùng ra sàn đấu: nó sẽ tự bò đến các xác chết của lính địch bị hạ gục, tiêu hóa xác và nhả ra các viên ngọc năng lượng hồi phục Máu và Thể Lực cho đội.",
    synergy: "Duy trì sinh lực dồi dào trong các màn chơi sinh tồn làn sóng quái vật đông đúc (Horde waves)."
  }
];

export function generateItemsHtml({ root = here } = {}) {
  const itemsDir = path.join(root, 'content/items');
  fs.mkdirSync(itemsDir, { recursive: true });

  // 1. Chapter 1: Tổng quan và Hệ thống kho tương tác
  const ch1 = `<h1 id="item-wiki-overview">Kho Vật Phẩm & Cổ Vật Chiến Đấu (Item Wiki 48 Relics)</h1>
<p class="doc-summary">Bách khoa toàn thư lưu trữ toàn bộ 48 vật phẩm dã chiến, vũ khí cận chiến, cấm thư ma pháp, dị vật hiến tế và dược phẩm sinh tồn trong Divergency. Mỗi vật phẩm đều có vai trò cơ chế rõ ràng, gắn liền với bối cảnh thành phố cảng Marseille, nhà tù Bastonne và thần thoại Khởi Nguyên.</p>

<div class="item-wiki-summary-strip">
  <div class="item-wiki-stat-box">
    <span class="item-wiki-stat-num">48</span>
    <span class="item-wiki-stat-label">Vật phẩm & Cổ vật</span>
  </div>
  <div class="item-wiki-stat-box">
    <span class="item-wiki-stat-num">5</span>
    <span class="item-wiki-stat-label">Phân nhánh tác chiến</span>
  </div>
  <div class="item-wiki-stat-box">
    <span class="item-wiki-stat-num">5</span>
    <span class="item-wiki-stat-label">Chương bản đồ gắn kết</span>
  </div>
  <div class="item-wiki-stat-box">
    <span class="item-wiki-stat-num">60 Hz</span>
    <span class="item-wiki-stat-label">Tick combat · tách khỏi FPS hình</span>
  </div>
</div>

<blockquote class="item-mastery-scope"><strong>Phạm vi thiết kế đã sửa 21/10/2026:</strong> 48 artwork là danh mục ý tưởng, không phải 48 hiệu ứng đã chạy trong game hoặc đều được khảm. Runtime hiện có catalog 20 item riêng. Bản duyệt mastery dùng ba dấu ấn từ Chùy Gai (item_0_0), Vỏ Ốc (item_0_1), Đoản Kiếm (item_3_0); lọc theo tag chiêu và một socket. Dấu ấn có hiệu ứng khảm riêng, không cộng thêm hiệu ứng cầm/trang bị gốc. Mọi công năng chiến đấu kiếm được bằng gameplay; biến thể backer chỉ đổi ngoại hình. Các hiệu ứng mạnh ở thẻ ý tưởng bên dưới cần cân bằng và giới hạn theo luật mở rộng; không được tính thêm vào Studio. Xem <a href="#power-mastery-sockets">luật socket, DOT, hút máu, boss và hồi sinh</a> cùng <a href="#power-skill-mastery">bản mastery để duyệt</a>.</blockquote>

<h2 id="item-master-sheet">Bảng Lưu Trữ Tổng Hợp 48 Vật Phẩm (Master Sprite Sheet)</h2>
<p>Hình ảnh nguồn từ tập tin <code>item_in_khoa.png</code> (8 cột x 6 hàng) được chế tác tỉ mỉ theo tỷ lệ chuẩn pixel art, mỗi ô vật phẩm nằm gọn trong khung viền kim loại - đá cổ kính đặc trưng của vũ trụ Divergency.</p>

<figure class="item-sheet-figure">
  <div class="item-sheet-viewer">
    <img src="imgs/items/item_in_khoa.png" alt="Bảng tổng hợp 48 vật phẩm và dị vật chiến đấu trong Divergency" class="item-sheet-img" loading="lazy">
  </div>
  <figcaption>Bảng lưu trữ tổng hợp 48 Relics & Dị vật chiến đấu (item_in_khoa.png · 8 cột x 6 hàng)</figcaption>
</figure>

<h2 id="item-cards-explorer">Hệ Thống Phân Loại & Bộ Lọc Tương Tác (Item Cards Explorer)</h2>
<p>Nhấp vào các thẻ phân loại bên dưới hoặc gõ từ khóa vào ô tìm kiếm để lọc nhanh danh mục 48 vật phẩm theo tên, công dụng, thuộc tính phá giáp, hồi phục hoặc bối cảnh màn chơi.</p>

<div class="item-filter-container" id="item-wiki-filter-app">
  <div class="item-filter-toolbar">
    <input type="search" class="item-search-input" id="item-search-input" placeholder="Tìm tên vật phẩm, cơ chế (Bleed, Guard Break, Hồi Máu, Bastonne...)..." autocomplete="off">
    <div class="item-category-pills">
      <button type="button" class="item-pill is-active" data-cat="all">Tất cả (48)</button>
      <button type="button" class="item-pill" data-cat="Vũ khí cận chiến">Vũ khí & Công cụ</button>
      <button type="button" class="item-pill" data-cat="Cổ vật">Dị vật & Cổ vật</button>
      <button type="button" class="item-pill" data-cat="Dược phẩm">Dược phẩm & Sinh tồn</button>
      <button type="button" class="item-pill" data-cat="Ký sinh">Xúc tác & Ký sinh</button>
      <button type="button" class="item-pill" data-cat="Mặt nạ">Mặt nạ & Phòng hộ</button>
    </div>
  </div>

  <div class="item-cards-grid" id="item-cards-grid">
${ITEMS_DATA.map(item => `    <article class="item-card" data-category="${item.category}" data-stage="${item.stage}" data-id="${item.id}" id="${item.id}">
      <div class="item-card-top">
        <div class="item-sprite-frame">
          <img src="${item.sprite}" alt="${item.nameVi}" class="item-sprite-img" loading="lazy">
        </div>
        <div class="item-card-title-group">
          <span class="item-coord-badge">R${item.row}·C${item.col}</span>
          <h3 class="item-card-name">${item.nameVi}</h3>
          <p class="item-card-en">${item.nameEn}</p>
        </div>
      </div>
      <div class="item-card-badges">
        <span class="item-tag item-tag-cat">${item.category}</span>
        <span class="item-tag item-tag-stage">${item.stage.split(':')[0]}</span>
      </div>
      <p class="item-card-role"><strong>Công năng:</strong> ${item.role}</p>
      <p class="item-card-desc">${item.desc}</p>
      <div class="item-card-combat">
        <p><strong>Cơ chế chiến đấu:</strong> ${item.combat}</p>
        <p class="item-synergy-text"><strong>Đồng đội phối hợp:</strong> ${item.synergy}</p>
      </div>
    </article>`).join('\n')}
  </div>
</div>
`;

  // 2. Chapter 2: Vũ khí và Công cụ tác chiến
  const weapons = ITEMS_DATA.filter(i => i.category.includes('Vũ khí'));
  const ch2 = `<h2 id="item-weapons-tools">1. Vũ Khí & Công Cụ Tác Chiến Cận Chiến</h2>
<p>Hệ thống vũ khí nhặt trên chiến trường trong Divergency kế thừa tinh hoa đòn đánh của game brawler, với cơ chế va chạm vật lý hiện đại: độ hồi phục động tác (Recovery frames), khả năng phá vỡ thế thủ (Guard Break) và tương tác phản đòn (Parry).</p>

<div class="table-wrap">
  <table class="item-wiki-table">
    <thead>
      <tr>
        <th style="width: 70px;">Icon</th>
        <th>Tên Vũ Khí</th>
        <th>Loại & Cự Ly</th>
        <th>Cơ Chế Phá Giáp & Hiệu Ứng</th>
        <th>Bối Cảnh Xuất Hiện</th>
      </tr>
    </thead>
    <tbody>
${weapons.map(w => `      <tr>
        <td style="text-align: center;"><img src="${w.sprite}" alt="${w.nameVi}" style="width: 44px; height: 44px; image-rendering: pixelated; border-radius: 4px; background: #1a1714; border: 1px solid #4a3f34;"></td>
        <td><strong>${w.nameVi}</strong><br><small style="color: var(--amber);">${w.nameEn}</small></td>
        <td><code>${w.category}</code></td>
        <td>${w.combat}</td>
        <td><small>${w.stage}</small></td>
      </tr>`).join('\n')}
    </tbody>
  </table>
</div>

<h3>Đặc tính cơ chế vũ khí trong giao tranh brawler</h3>
<ul>
  <li><strong>Chùy Gai Rỉ Máu (Row 0, Col 0):</strong> Đòn đánh quán tính nặng nề, hoàn toàn khắc chế các đối thủ giơ khiên hoặc đỡ đòn liên tục, tạo cơ hội cho đòn hất tung tiếp theo.</li>
  <li><strong>Đoản Kiếm Đấu Sĩ (Row 3, Col 0):</strong> Thiết kế chuôi chữ thập chuẩn đấu sĩ, tốc độ xuất chiêu và thu chiêu cực ngắn giúp người chơi dễ dàng thực hiện thao tác Đỡ Gạt (Parry) chuẩn xác.</li>
  <li><strong>Đao Cong Hải Tặc (Row 3, Col 6):</strong> Diện tích quét kiếm hình bán nguyệt rộng 180 độ, lý tưởng để dọn dẹp các đợt lính rác vây bọc từ nhiều hướng.</li>
  <li><strong>Đại Chiến Búa Sọ Rồng (Row 5, Col 5):</strong> Vũ khí hạng nặng cấp cao nhất, tạo sóng chấn động mặt sàn nứt nẻ và hất tung toàn bộ mục tiêu trong bán kính 6 mét.</li>
  <li><strong>Mũi Lao Đá & Kunai (Row 4, Col 0 & Col 7):</strong> Đóng vai trò công cụ khống chế tầm xa, ngắt chiêu niệm chú của đối phương từ xa để bảo vệ an toàn cho đội hình.</li>
</ul>
`;

  // 3. Chapter 3: Dị vật hiến tế & Cổ vật thần bí
  const relics = ITEMS_DATA.filter(i => i.category.includes('Cổ vật') || i.category.includes('hiến tế') || i.category.includes('Ngọc') || i.category.includes('Mặt nạ'));
  const ch3 = `<h2 id="item-relics-pacts">2. Dị Vật Hiến Tế & Cổ Vật Thần Bí</h2>
<p>Divergency xây dựng trên nền tảng thần thoại u tối của Đứa Trẻ Sao Rơi và cuộc Phân Xác Khởi Nguyên. Các dị vật và cổ vật hiến tế mang trong mình nguồn năng lượng huyền bí nhưng luôn đòi hỏi sự đánh đổi chiến thuật rõ rệt.</p>

<div class="table-wrap">
  <table class="item-wiki-table">
    <thead>
      <tr>
        <th style="width: 70px;">Icon</th>
        <th>Dị Vật & Cổ Vật</th>
        <th>Loại Thuộc Tính</th>
        <th>Tác Động Lên Trận Đánh & Đánh Đổi</th>
        <th>Khu Vực Thu Thập</th>
      </tr>
    </thead>
    <tbody>
${relics.slice(0, 15).map(r => `      <tr>
        <td style="text-align: center;"><img src="${r.sprite}" alt="${r.nameVi}" style="width: 44px; height: 44px; image-rendering: pixelated; border-radius: 4px; background: #1a1714; border: 1px solid #4a3f34;"></td>
        <td><strong>${r.nameVi}</strong><br><small style="color: var(--teal);">${r.nameEn}</small></td>
        <td><code>${r.category}</code></td>
        <td>${r.combat}</td>
        <td><small>${r.stage}</small></td>
      </tr>`).join('\n')}
    </tbody>
  </table>
</div>

<h3 id="item-relics-philosophy">Triết lý thiết kế Dị Vật: Rủi ro cao - Phần thưởng lớn (High Risk, High Reward)</h3>
<p>Trong các trận đánh khốc liệt, người chơi có thể trang bị các dị vật hiến tế để gia tăng đột biến sức mạnh chiến đấu:</p>
<ul>
  <li><strong>Trái Tim Tội Lỗi (Row 2, Col 4):</strong> Gia tăng đến 45% tổng lực sát thương và 25% tốc độ combo, đổi lại mỗi 10 giây bị trừ 1.5% HP. Đây là món đồ tối ưu cho người chơi tự tin vào kỹ năng né đòn.</li>
  <li><strong>Chén Thánh Huyết Tế (Row 5, Col 0):</strong> Chỉ người kích hoạt tự trả 10% MaxHP, không được làm HP còn dưới 1 và không trừ HP đồng đội. Đổi lấy 8 giây MP cost ×0.90 và CritChance +5 điểm phần trăm; một lần mỗi encounter, không cộng dồn hoặc làm mới thời gian. Không bỏ qua khóa encounter. Đây là đề xuất ngoài bản mastery thử nghiệm đầu.</li>
  <li><strong>Mặt Nạ Kẻ Lắng Nghe (Row 4, Col 2):</strong> Cổ vật đại diện cho dự án Divergency, phần thưởng số dành cho cộng đồng ủng hộ. Mở rộng khung giờ né đòn hoàn hảo và làm chậm thời gian khi kích hoạt thành công.</li>
  <li><strong>Lam Ngọc Đầu Lâu Hồi Sinh (Row 5, Col 4):</strong> Đề xuất mở rộng: tiêu một charge để hồi sinh đồng đội với 30% MaxHP (tối thiểu 1 HP), tối đa một lần cho mỗi người mỗi encounter. Không tự tạo thêm charge, không kích hoạt dây chuyền, không vượt khóa kết thúc màn. Có thể kiếm bằng gameplay; không thuộc socket mastery bản đầu.</li>
</ul>
`;

  // 4. Chapter 4: Dược phẩm, Bình tiếp tế & Sinh vật ký sinh
  const consumables = ITEMS_DATA.filter(i => i.category.includes('Dược phẩm') || i.category.includes('Ký sinh') || i.category.includes('sinh tồn') || i.category.includes('Bom') || i.category.includes('Dược thảo') || i.category.includes('Sinh vật'));
  const ch4 = `<h2 id="item-potions-catalysts">3. Dược Phẩm, Bình Tiếp Tế & Sinh Vật Ký Sinh</h2>
<p>Hệ thống vật phẩm tiêu hao và sinh vật hỗ trợ giúp người chơi ứng biến trước các tình huống bất trắc trên chiến trường. Việc quản lý thể lực, máu và giải trừ các trạng thái bất lợi (Chảy Máu, Độc Tố, Kiệt Sức) là chìa khóa then chốt để sinh tồn trong các màn chơi dài.</p>

<div class="table-wrap">
  <table class="item-wiki-table">
    <thead>
      <tr>
        <th style="width: 70px;">Icon</th>
        <th>Vật Phẩm / Sinh Vật</th>
        <th>Nhóm Dược Liệu</th>
        <th>Hiệu Lực Phục Hồi & Tác Dụng Phụ</th>
        <th>Tối Đa Mang Theo</th>
      </tr>
    </thead>
    <tbody>
${consumables.map(c => `      <tr>
        <td style="text-align: center;"><img src="${c.sprite}" alt="${c.nameVi}" style="width: 44px; height: 44px; image-rendering: pixelated; border-radius: 4px; background: #1a1714; border: 1px solid #4a3f34;"></td>
        <td><strong>${c.nameVi}</strong><br><small style="color: var(--green);">${c.nameEn}</small></td>
        <td><code>${c.category}</code></td>
        <td>${c.combat}</td>
        <td style="text-align: center;"><span class="item-carry-badge">3 - 5 chiếc</span></td>
      </tr>`).join('\n')}
    </tbody>
  </table>
</div>

<h3 id="item-ecology">Tương tác môi trường và chuỗi sinh thái chiến trường</h3>
<ul>
  <li><strong>Bình Huyết Thanh Đỏ (Row 4, Col 4):</strong> Vật phẩm hồi phục 40% HP khẩn cấp, xuất hiện từ việc mở hòm đồ gỗ hoặc rơi từ lính cứu thương đối phương.</li>
  <li><strong>Ấu Trùng Sâu Mộ (Row 5, Col 7):</strong> Tận dụng bãi chiến trường ngổn ngang xác địch để biến xác chết thành các viên ngọc năng lượng nuôi sống cả đội.</li>
  <li><strong>Trùng Tủy Sống (Row 0, Col 6):</strong> Bám chặt vào đốt sống chiến binh để ngăn chặn cái chết bất đắc kỳ tử khi nhận phải đòn quét sàn chí mạng.</li>
  <li><strong>Bình Rượu Bastonne & Vải Liệm Rách (Row 3, Col 5 & Row 1, Col 0):</strong> Mang đậm tính chất đường phố và ngục tù kham khổ, xóa bỏ kiệt sức và cầm máu nhanh chóng.</li>
</ul>
`;

  // 5. Chapter 5: Bảng tra cứu toàn diện 48 vật phẩm
  const ch5 = `<h2 id="item-master-matrix">4. Bảng Tra Cứu Toàn Diện 48 Vật Phẩm (Master Wiki Matrix)</h2>
<p>Bảng tổng hợp chi tiết toàn bộ 48 vật phẩm theo đúng thứ tự tọa độ từ hàng 0 cột 0 (trên cùng bên trái) đến hàng 5 cột 7 (dưới cùng bên phải) của tập tin sprite <code>item_in_khoa.png</code>.</p>

<div class="table-wrap">
  <table class="item-wiki-table master-matrix-table">
    <thead>
      <tr>
        <th style="width: 50px;">Tọa độ</th>
        <th style="width: 60px;">Sprite</th>
        <th>Tên Vật Phẩm (Vi / En)</th>
        <th>Phân Loại</th>
        <th>Bản Đồ Xuất Hiện</th>
        <th>Công Năng & Cơ Chế Chiến Đấu</th>
      </tr>
    </thead>
    <tbody>
${ITEMS_DATA.map(item => `      <tr id="matrix-${item.id}">
        <td style="text-align: center;"><code>[${item.row},${item.col}]</code></td>
        <td style="text-align: center;"><a href="${item.sprite}" data-lightbox-src="${item.sprite}" data-lightbox-caption="${item.nameVi} (${item.nameEn})"><img src="${item.sprite}" alt="${item.nameVi}" style="width: 44px; height: 44px; image-rendering: pixelated; border-radius: 4px; background: #1a1714; border: 1px solid #4a3f34;"></a></td>
        <td><strong>${item.nameVi}</strong><br><small style="color: var(--amber);">${item.nameEn}</small></td>
        <td><code>${item.category}</code></td>
        <td><small>${item.stage}</small></td>
        <td>${item.combat}</td>
      </tr>`).join('\n')}
    </tbody>
  </table>
</div>
`;

  // Write chapter files
  fs.writeFileSync(path.join(itemsDir, '01-tong-quan-kho-vat-pham-divergency.html'), ch1, 'utf8');
  fs.writeFileSync(path.join(itemsDir, '02-vu-khi-va-cong-cu-tac-chien.html'), ch2, 'utf8');
  fs.writeFileSync(path.join(itemsDir, '03-di-vat-hien-te-va-khe-uoc-than-bi.html'), ch3, 'utf8');
  fs.writeFileSync(path.join(itemsDir, '04-duoc-pham-va-xuc-tac-sinh-hoc.html'), ch4, 'utf8');
  fs.writeFileSync(path.join(itemsDir, '05-bang-tra-cuu-toan-dien-48-items.html'), ch5, 'utf8');

  // Write index.json
  const indexJson = [
    {
      title: "Kho Vật Phẩm & Cổ Vật Chiến Đấu (Item Wiki 48 Relics)",
      file: "01-tong-quan-kho-vat-pham-divergency.html"
    },
    {
      title: "Vũ Khí & Công Cụ Tác Chiến Cận Chiến",
      file: "02-vu-khi-va-cong-cu-tac-chien.html"
    },
    {
      title: "Dị Vật Hiến Tế & Cổ Vật Thần Bí",
      file: "03-di-vat-hien-te-va-khe-uoc-than-bi.html"
    },
    {
      title: "Dược Phẩm, Bình Tiếp Tế & Sinh Vật Ký Sinh",
      file: "04-duoc-pham-va-xuc-tac-sinh-hoc.html"
    },
    {
      title: "Bảng Tra Cứu Toàn Diện 48 Vật Phẩm (Master Wiki Matrix)",
      file: "05-bang-tra-cuu-toan-dien-48-items.html"
    }
  ];
  fs.writeFileSync(path.join(itemsDir, 'index.json'), JSON.stringify(indexJson, null, 2), 'utf8');
  console.log('Successfully wrote content/items chapter files and index.json');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputIndex = process.argv.indexOf('--output-root');
  generateItemsHtml({ root: outputIndex >= 0 ? path.resolve(process.argv[outputIndex + 1]) : here });
}
