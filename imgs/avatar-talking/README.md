# Avatar nói chuyện — K, H, N

Ba GIF riêng, kích thước 468 × 468 pixel, lặp vô hạn, không âm thanh. Giữ pixel art và phần trong suốt bên ngoài khung của ảnh gốc.

- K-talking.gif — nhân vật bên trái, 5,68 giây.
- H-talking.gif — nhân vật ở giữa, 6,11 giây.
- N-talking.gif — nhân vật bên phải, 5,44 giây.

Khẩu hình và mắt được tạo bằng công cụ image_gen tích hợp, sau đó ghép vào ảnh gốc. Tóc, kính, quần áo và khung đứng yên. Mỗi GIF có 44 frame với thời gian hiển thị thay đổi theo nhịp nói, khoảng nghỉ và chớp mắt.

Toàn bộ prompt đã dùng nằm trong generation.json. Các sheet gốc được lưu trong sheets/, các frame đã ghép ở frames/. Script build-gifs.cjs ghép và xuất GIF; verify.cjs kiểm tra số frame, vòng lặp, alpha và độ ổn định ngoài vùng mặt.
