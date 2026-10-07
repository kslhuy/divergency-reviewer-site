# Deep × Solei

Mở **Synergy_Preview.html** bằng Chrome hoặc Edge. File này nhúng toàn bộ ảnh và mã, chạy offline độc lập.

5 cảnh, mỗi cảnh 12 giây:

1. Huyết Dực Kiếm Hồn — hợp thể projectile, lượn qua mục tiêu cao rồi bổ xuống.
2. Quỹ Đạo Hồi Phong — vòng Swift qua sau địch rồi quay lại tâm gió.
3. Thăng Kiếm Phong — đá hất kiếm cắm đất thành đòn phòng không.
4. Chuyền Mồi Nghịch Trảm — chuyền địch tới Deep rồi trả lại cho Solei.
5. Gấp Khúc Song Kích — dùng Backlash làm điểm bật đổi làn cho đòn lao kiếm.

Chọn cảnh bên trái (hoặc thanh ngang trên màn hình nhỏ), bấm phát/dừng, kéo timeline, chọn nhịp hoặc đổi tốc độ 0,5× / 1× / 1,5×. Space phát/dừng; mũi tên trái/phải tua 0,25 giây khi không đang tập trung vào điều khiển.

Đây là phác thảo visual. Các cơ chế mới chưa được triển khai trong Unity.

Source để chỉnh tiếp: `index.html`, `viewer.js`, `choreography.js`, `preview-data.js`, `assets/`. `design.md` giải thích nguồn chiêu, điều kiện và đánh đổi. `sources.md` ghi nguồn asset và prompt Imagegen. `raw/` cùng `_work/` giữ dữ liệu xuất, script dựng và ảnh kiểm tra.

Sau khi sửa source, chạy `python _work/bundle_preview.py .` để cập nhật bản offline. Có thể kiểm tra bằng `node _work/check_preview.cjs .`.
