# Deep × Solei — 5 synergy

Bản phác thảo visual dựa trên asset hiện tại, tạo ngày 2026-09-21. Không triển khai gameplay Unity. Toàn bộ cơ chế hợp thể dưới đây là **đề xuất mới**; tên gọi Deep được rút gọn từ tên clip vì nhiều ComboSkill chưa có tên trình bày. Chuyền Mồi là kỹ năng đã tồn tại, nhánh trả lại của Deep là phần mới.

Timing mỗi cảnh là 12 giây để đọc được các nhịp, không phải timing cân bằng gameplay. Quỹ Đạo Hồi Phong có hai nhánh Đúng nhịp / Lỡ nhịp; bốn cảnh còn lại giữ bản gốc thành công.

## Huyết Dực Kiếm Hồn

**Nguồn hiện có:** Deep Sk1_Soul_Liberation / Bullet_Soul_Liberation; Solei Sk3_HoldKick / bird_fly_projectil.

**Phần mới:** Kiếm hồn + Huyết Dực → chim kiếm đổi hướng giữa hai mục tiêu.

**Kích hoạt:** Hai projectile đồng đội đi qua cùng vùng nhỏ trong một cửa sổ đề xuất khoảng 0,2 giây; chưa va mục tiêu.

**Đánh đổi:** Tiêu cả hai đạn; chỉ được đổi hướng một lần. Không khóa vô hạn và không tạo thêm bản sao.

- 0s — Hai đường đạn: Deep chém phóng kiếm hồn. Solei đá Bloodwing thấp hơn, hướng vào cùng một giao điểm.
- 2.8s — Ghép cánh và lưỡi: Hai đầu đạn gặp nhau trước khi chạm địch. Cánh đỏ ôm lấy lõi kiếm tím xám.
- 4s — Lượn rồi bổ xuống: Chim kiếm đuổi mục tiêu trên cao, sau đó đổi hướng lao xuống mục tiêu dưới đất; hai đạn đơn không có đường bay này.
- 7.7s — Giải phóng lõi: Cánh tan sau cú bổ. Hai nhân vật hồi thế; chỉ một lần đổi mục tiêu cho mỗi lần hợp thể.


## Quỹ Đạo Hồi Phong — Lốc xanh–đỏ (cập nhật 2026-10-02)

**Nguồn hiện có:** Deep Sk3_Swift: melee xoay, Dx=250, có SlowGravity; Solei Solei_Combat_solei_tornator: vòng gió có thể đứng yên.

**Phần mới:** Xoáy kiếm + Tâm Bão → lốc xanh–đỏ cuốn địch lên trời.

**Kích hoạt:** Swift đi vào mép Tâm Bão đang hoạt động trong cửa sổ đề xuất 0,2 giây; Solei duy trì tâm đến cú kết.

**Đánh đổi:** Lốc có vùng hút cố định và thời hạn hữu hạn. 11 hit cuốn + 1 hit hất mỗi mục tiêu; không tái bắt mục tiêu sau cú kết. Solei bị khóa giữ thế, Deep phải hoàn tất vòng hồi phong.

- 0s — **Dựng Tâm Bão**: Solei giữ tâm xoáy. Deep lao Xoáy kiếm vào mép gió; hai luồng năng lượng xanh và đỏ bắt đầu quấn nhau.
- 2.8s — **Hợp thành cột lốc**: Hai chiêu giao nhau tạo cơn lốc hình phễu xanh–đỏ. Chân lốc kéo hai địch từ mặt đất vào lõi.
- 3.6s — **Cuốn lên · liên hoàn hit**: Địch xoắn lên cao theo cột gió, nhận 11 hit liên tiếp mỗi mục tiêu. Deep chạy vòng ngoài, Solei giữ nguồn gió.
- 8s — **Hồi phong · hất tung**: Deep chém quay về, kích hit thứ 12 mỗi mục tiêu. Lốc bung đỉnh hất địch lên rồi văng ra hai phía, tan dần và kết thúc khống chế.

**Lỡ nhịp:** Deep vào muộn sau khi Tâm Bão ngắt. Hai chiêu tách rời: Deep lao ngang đánh một mục tiêu, không hút, không cuốn lên và không có chuỗi đa hit.

**Animation VFX:** Dùng đúng 10 frame gốc của Freeze `freeze_ww.png`, chỉ thay RGB sang đỏ Deep và mint Solei. Giữ nguyên silhouette, nét pixel, alpha và pivot; không thêm vòng lốc bên ngoài. Kích thước gốc 160 × 160/frame, scale đều 1,6; phát minh họa 12 FPS.

**Nhịp hit minh họa:** 3,60 + n × 0,36 giây, n=0…10; cú kết tại 8,00 giây. 12 hit/mục tiêu (24 tiếp xúc tổng cộng với hai địch), không phải thông số damage hay timing gameplay đã chốt. Hai địch chạm đất ở 9,55 và 9,80 giây.

## Thăng Kiếm Phong

**Nguồn hiện có:** Deep Sk5_Sky_Stomp_DEEP + Sky_Stomp_Sword; DeepN_Sk5Logic và Stom_Sword_Deep có các pha ném, cắm, chờ, thu. Solei Sk4_HyperStorm có các cú đá quét và hất.

**Phần mới:** Kiếm cắm đất + cú đá hất → kiếm xoáy ngược lên trời.

**Kích hoạt:** Hyperstorm chạm sống kiếm đang ở pha WaitingToBeRetrieved; chưa bắt đầu thu hồi.

**Đánh đổi:** Mất vùng dư chấn dưới đất; Deep phải chờ kiếm quay lại. Một kiếm chỉ được hất một lần.

- 0s — Cắm kiếm làm neo: Deep nhảy ném Sky Stomp. Lưỡi kiếm cắm trước Solei, tạo một vật thể thật để phối hợp.
- 3.2s — Đá trúng sống kiếm: Cú đá quét của Hyperstorm chạm đúng sống kiếm. Kiếm rời đất và đảo mũi hướng lên.
- 4.2s — Xoáy ngược lên cao: Gió nâng kiếm theo đường xoắn vào đối thủ trên không; dư chấn dưới đất kết thúc khi kiếm rời chỗ.
- 7.8s — Trả kiếm cho Deep: Kiếm rơi về tay Deep, Solei tiếp đất. Bỏ vùng sát thương mặt đất để đổi lấy khả năng bắt mục tiêu trên cao.


## Chuyền Mồi Nghịch Trảm

**Nguồn hiện có:** ChuyenMoi_Skill.asset / SoleiRelayKickSO đã có chuyển mục tiêu cho đồng đội; Deep Sk7_UpStom có melee trên không và đảo hướng khi kết thúc.

**Phần mới:** Chuyền Mồi → kiếm hất ngược → Solei bắt lại bằng chuỗi đá.

**Kích hoạt:** Up Stom chạm mục tiêu trong cửa sổ nhận chuyền; Deep hướng lực trả về Solei còn đứng trong tầm.

**Đánh đổi:** Chỉ một lần trả lại, tiêu nhịp kết của cả hai; hụt nhận sẽ để mục tiêu ra ngoài đội hình. Không bỏ qua giáp/phòng thủ.

- 0s — Mở cú chuyền: Solei áp sát và dùng nhịp cuối Chuyền Mồi, đưa địch sang Deep đang chờ bên phải.
- 3.65s — Deep nhận và đảo lực: Deep hất kiếm vào mục tiêu đang bay, chuyển lực về phía Solei thay vì đẩy địch ra xa đội.
- 4.6s — Trả về cú đá: Mục tiêu quay lại qua một cung thấp. Solei đón bằng chuỗi đá và tung cú kết cuối.
- 8s — Kết thúc một vòng: Mục tiêu rơi trước đội hình. Giới hạn một lần chuyền đi và một lần trả lại để tránh khóa trên không vô hạn.


## Gấp Khúc Song Kích

**Nguồn hiện có:** Deep Skill4_Cut_Deep có đoạn lao chém; Solei Sk2_KickBack là cú đá lộn ngược. Sự đổi làn và bàn đạp gió là đề xuất mới.

**Phần mới:** Lao kiếm + cú đá lùi tại điểm hẹn → đường lao gấp khúc.

**Kích hoạt:** Deep chạm vùng xung gió ở đỉnh Backlash; hai người cùng hướng và đã chọn làn đích.

**Đánh đổi:** Phải hẹn vị trí chính xác, đường lao gấp khúc cố định và có recovery; không dịch chuyển xuyên mọi vật cản.

- 0s — Chia hai mục tiêu: Một địch chặn chính diện, một địch đứng sau ở làn trên. Deep lao tới Solei đang chuẩn bị cú đá lùi.
- 2.8s — Bật ở điểm hẹn: Chân máy của Solei chạm đúng điểm tựa bên cạnh Deep. Xung gió bẻ hướng lao theo đường chéo.
- 4s — Hai góc áp sát: Deep vượt làn chắn, lao sang mục tiêu xa. Solei lùi rồi đá địch chính diện, hai người tự mở khoảng trống cho nhau.
- 7.8s — Tách ra hồi thế: Deep giữ làn trên, Solei giữ làn dưới. Cú đổi hướng chỉ xảy ra một lần, không cho phép bẻ góc tiếp.

