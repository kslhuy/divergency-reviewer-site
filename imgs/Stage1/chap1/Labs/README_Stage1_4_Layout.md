# 1-4. Tàu ngầm nghiên cứu và SheMal — Bộ ảnh bổ sung

Bộ ảnh concept bổ sung ngày 09/09/2026, nối cảng hoàng hôn với tàu ngầm và mở rộng các phòng lab. Minimap dùng góc nhìn cắt ngang: đuôi tàu bên trái, mũi tàu bên phải. Số phòng dưới đây là mã mới của bộ ảnh này, không tương ứng trực tiếp với số viết tay trên `map_submarine_lab.png` cũ.

## Bảy ảnh mới

| Mã phòng | Ảnh | Vai trò |
| --- | --- | --- |
| 00–11 | [Minimap toàn bộ bố cục](submarine_lab_minimap_full_v1.png) | Tuyến chính màu cyan; nhánh máy phát màu vàng cam; các phòng phụ nằm phía trên hành lang. |
| 01 | [Bến dịch vụ và transition từ cảng](submarine_service_dock_transition.png) | Thuyền cập cầu tàu; nhân vật đi sang phải vào tháp thang nâng kín để xuống tàu ngầm. |
| 02 | [Thang nâng và khoang vào](submarine_service_lift_airlock.png) | Điểm đặt chân trong tàu, cửa áp suất và điểm nghỉ; cửa phải dẫn vào hành lang 03. |
| 03 | [Khoang hành lang chính](submarine_main_corridor_03.png) | Cửa trái về 02; cửa phải sang 07; ba cửa phía sau dẫn lên 04/05/06; cầu thang có lan can xuống 08. Sàn phía trước liên tục để di chuyển và chiến đấu. |
| 05 | [Phòng hồ sơ và cứu hộ](submarine_archive_rescue_bay.png) | Đọc hồ sơ, kiểm tra cửa thật/giả và cứu người. Khoang cứu hộ để trống để đặt NPC trong game. |
| 06 | [Phòng điều áp](submarine_pressure_regulation_room.png) | Khóa van rò hơi, cân hai đồng hồ rồi gạt cần an toàn. |
| 08 | [Máy phát phụ A](submarine_auxiliary_generator_a.png) | Nhánh tầng dưới, có bảng điều khiển và cầu dao khôi phục; cửa phải nối máy phát B. |

Minimap: 1536 × 1024 px. Sáu background: 2172 × 724 px, tỷ lệ 3:1. Tất cả là PNG.

## Ghép với ảnh đã có

| Mã phòng | Ảnh tham chiếu có sẵn |
| --- | --- |
| 04 — Trưởng gác / giám sát | [Phòng giám sát](lab_under_mechanical_surveillance_room.png) |
| 07 — Dãy bình mẫu | [Lab bình mẫu](lab_3.png) |
| 09 — Máy phát B | [Máy phát B và phòng nhiệt](submarine_backup_generator_b_engine_heat_room.png) |
| 10 — Cửa lò | [Lối vào lò trung tâm](submarine_central_reactor_access.png) |
| 11 — SheMal | [Buồng giam SheMal](submarine_shemal_containment_chamber.png) |

## Di chuyển và chuyển màn đề xuất

1. **Cảng 00 → bến dịch vụ 01:** thuyền chở nhân vật rời cảng; cutscene ngắn khi thuyền cập cầu tàu, trả điều khiển tại bến. Đi bộ sang phải vào tháp nâng.
2. **Bến 01 → khoang vào 02:** đóng cửa tháp, nghe tiếng động cơ và chuyển động hạ thang; cắt màn khi cửa kín. Mở cửa ở khoang vào sau khi cân áp. Cấu trúc kín nối bến nổi với thân tàu giúp nhân vật xuống lab mà không cần bơi.
3. **Khoang vào 02 → hành lang 03:** cửa phải dẫn vào trục phân phối. Cầu thang xuống tầng máy nằm gần ngã ba đầu hành lang 02/03.
4. **Tuyến lab:** từ 03 tiếp cận ba phòng 04, 05 và 06; hoàn tất các tác vụ cần thiết rồi đi qua 07 → 10 → 11. Ba phòng phía trên là các nhánh của hành lang, không buộc đi xuyên tuần tự cả ba phòng.
5. **Nhánh máy phát:** 03 → 08 → 09 → 10. Máy A và B là hai phòng nối tiếp. Cửa từ tầng máy lên 10 cần được mở bằng điều khiển tại chỗ. Pin khẩn cấp duy trì đèn chỉ đường và cơ cấu thoát sau khi cắt máy phát.
6. **Quay về:** 11 → 10 → 07 → 03 → 02 → 01; mở chốt từ phía trong để tránh phải giải lại các khóa trên đường ra.

Âm thanh dùng ít lớp: tiếng nước và gió ở bến; cửa đóng làm âm ngoài trời nhỏ đi; tiếng thang nâng nối hai màn; trong tàu dùng nền thông gió, tiếng máy lớn dần khi xuống tầng dưới và tiếng rò hơi định hướng ở phòng 06. Khi dừng máy phát, giảm tiếng máy và chuyển sang nhịp nguồn khẩn cấp để phản hồi rõ hành động.

## Phạm vi của bộ ảnh

Đây là background concept phẳng và sơ đồ đề xuất. Va chạm, cửa tương tác, camera, van, NPC, âm thanh và chuyển màn cần được dựng trong game; các ảnh chưa phải scene chơi được. Các cửa và thiết bị vẽ sẵn là mốc để đặt đối tượng tương tác. Minimap thể hiện liên kết phòng, không phải bản đo kích thước để dựng collision.

Để AI đọc gọn: gửi file này và chỉ ảnh của phòng cần sửa; thêm minimap khi cần kiểm tra liên kết giữa các phòng.
