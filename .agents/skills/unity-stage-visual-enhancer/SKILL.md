---
name: unity-stage-visual-enhancer
description: >-
  Use this skill whenever the user provides an image, concept art, panorama, or screenshot of a 2D/2.5D game stage, background, or scene (for Unity or similar engines) and asks for feedback, visual improvement, or art direction. Also activate when the user mentions "$unity-stage-visual-enhancer", "cải thiện visual màn", "nâng cấp đồ họa background", "tối ưu visual stage", "góp ý bối cảnh", or wants practical, copy-paste-ready suggestions for lighting, shaders, post-processing, VFX, and layer separation without over-complicated setups like normal maps or heavy shadow casters.
---

# Unity 2D Stage Visual & Feeling Enhancer

Skill chuyên biệt để tiếp nhận **bất kỳ hình ảnh sân khấu, màn chơi, bối cảnh panorama hoặc screenshot màn đấu 2D/2.5D nào**, tự động phân tích thị giác và đưa ra hướng dẫn cải thiện thực dụng (High-Impact, Fast-to-Implement) trong Unity (URP 2D).

> [!IMPORTANT]
> **Triết lý thực dụng (Practical & High Impact)**:
> - **KHÔNG sa đà vào các kỹ thuật quá phức tạp, tốn công dựng như Pixel Normal Maps hay 2D Shadow Casters hình học nặng nề** (trừ khi người dùng chủ động yêu cầu).
> - **TẬP TRUNG vào những yếu tố "làm nhanh mà visual lập tức bùng nổ"**: Tách layer Parallax, Post-Processing URP, Ánh sáng 2D điểm nhấn (Point/Freeform Light), Shaders chuyển động nhẹ (gió lay lá, nước lăn tăn, sương cuộn) và Particle FX tạo không khí.

---

## 1. Quy Trình Phân Tích Chuẩn (Standard Workflow)

Khi người dùng cung cấp đường dẫn ảnh hoặc yêu cầu cải thiện visual một màn chơi:

### Bước 1: Khảo sát & Đọc file ảnh
1. Sử dụng công cụ `view_file` để xem trực tiếp ảnh nguồn.
2. Xác định thể loại bối cảnh, tỷ lệ khung hình (16:9, siêu rộng Panorama, v.v.), trường đoạn di chuyển và phong cách đồ họa (Pixel Art, Hand-drawn, v.v.).

### Bước 2: Chẩn đoán thị giác (Visual Diagnosis)
Nêu ngắn gọn, sắc bén 2-3 điểm nghẽn chính của ảnh hiện tại:
- **Độ tương phản giá trị sáng-tối (Value Contrast)**: Có bị phẳng lì, "bết" màu, hoặc thiếu sáng không?
- **Bảng màu (Color Harmony & Temperature)**: Có bị đơn điệu một màu (monotone/muddy) không?
- **Chiều sâu không gian (Depth & Layer Separation)**: Các lớp tiền cảnh - sân chơi - hậu cảnh có tách bạch rõ không?
- **Điểm nhấn thị giác (Focal Point)**: Mắt người chơi có bị loãng khi nhìn vào khung cảnh không?

### Bước 3: Đưa ra 5 Trụ Cột Nâng Cấp Thực Dụng (Actionable Pillars)

---

## 2. Cấu Trúc Khung Phản Hồi Bắt Buộc (Response Framework)

Mọi phản hồi cho người dùng cần được cấu trúc rõ ràng theo các mục sau để người dùng có thể **copy và làm ngay**:

### Trụ Cột 1: Phân Tầng Chiều Sâu & Parallax (Layer Separation)
Chỉ rõ cho người dùng cách cắt ảnh thành 3 đến 5 layers cơ bản:
1. **Layer 0 - Foreground Silhouettes (Tiền cảnh che góc)**: Tán cây, mỏm đá hoặc rèm cỏ đen mờ sát ống kính camera, di chuyển cực nhanh khi nhân vật bước đi.
2. **Layer 1 - Play Area (Mặt sàn & Vật thể tương tác)**: Đất, chướng ngại vật, bục nhảy, nơi nhân vật đứng.
3. **Layer 2 - Midground (Cây cối / Công trình gần)**: Nhà cửa, hàng rào, vách đá gần.
4. **Layer 3 - Far Background (Núi non / Rừng xa)**: Được nhuộm màu sương mù mờ ảo.
5. **Layer 4 - Sky & Horizon (Bầu trời & Chân trời)**: Đứng yên hoặc cuộn cực chậm.

### Trụ Cột 2: Ánh Sáng 2D Thực Dụng (Practical Unity 2D Lighting)
*Bỏ qua Normal Map và Shadow Caster phức tạp, tập trung vào:*
- **Global Light 2D (URP)**:
  - Thiết lập góc chiếu và cặp màu đối lập: Ví dụ Ánh sáng trực tiếp ngả **Cam/Vàng ấm** đối lập với Màu môi trường (Ambient) ngả **Tím/Xanh lạnh**.
- **Point Lights & Freeform Lights điểm xuyết (Accent Lighting)**:
  - Đặt đèn tại các vị trí kể chuyện: Đèn lồng, khung cửa sổ phát sáng, đốm lửa ma, bảo ngọc, đốm nấm phát quang.
- **Fake Light Beams (Tia sáng / God Rays nhẹ)**:
  - Dùng Sprite bán trong suốt (Additive / Soft Add Blend) chiếu xiên qua tán cây hoặc khe mây, không tốn tài nguyên.

### Trụ Cột 3: Shaders Nhẹ Nhàng & Sống Động (Lightweight High-Impact Shaders)
*Không dùng shader nặng tính toán, chỉ dùng các shader giải quyết cảm giác "tĩnh lặng chết chóc":*
- **Foliage Wind Sway Shader (Gió lay cành lá)**: Vertex displacement theo hàm Sin trên kênh Alpha/Tọa độ Y để cành cây, dây leo đu đưa tự nhiên.
- **Water UV Scroll Shader (Mặt nước)**: Cuộn UV sóng gợn nhẹ và tạo dải sáng phản quang (shimmer) đơn giản.
- **Scrolling Mist/Fog (Sương khói là đà)**: Một Sprite Quad dài có texture sương mù cuộn UV ngang chậm rãi trên mặt đất hoặc mặt sông.

### Trụ Cột 4: Post-Processing URP (Vũ Khí Nhanh Nhất & Đẹp Tức Thì)
Cung cấp thông số khuyến nghị cụ thể để người dùng chỉnh ngay trong Volume Profile:
- **Color Adjustments**:
  - `Post Exposure`: Cân bằng độ sáng.
  - `Contrast`: Tăng $+15\%$ đến $+25\%$ để tách khối.
- **Split Toning / Shadows-Midtones-Highlights**:
  - Shadow: Nhuộm tone lạnh (Xanh chàm / Xanh đen).
  - Highlight: Nhuộm tone ấm (Cam hổ phách / Vàng mơ).
- **Bloom**:
  - `Threshold`: $0.8 - 0.9$ (chỉ để các nguồn sáng thật như đèn, mặt trời, bọt sóng phát sáng, tránh làm mờ đục pixel art).
  - `Intensity`: Nhẹ nhàng ($0.5 - 1.2$).
- **Vignette**: Bo góc đen nhẹ ($0.2 - 0.25$) để hút mắt vào trung tâm hành động.

### Trụ Cột 5: Particles & Nhịp Thở Môi Trường (Ambient VFX)
Gợi ý 2-3 hệ thống hạt nhẹ (Particle Systems) phù hợp với bối cảnh:
- Lá khô rơi / Cánh hoa bay / Tàn tro bay chéo theo chiều gió.
- Hạt bụi phát sáng / Đom đóm / Đốm lửa linh hồn lập lòe.
- Bụi đất cuốn sát mặt sàn khi có gió mạnh.

---

## 3. Bảng Phân Vùng Cảm Xúc (Zone Storytelling Table - Dành cho Màn Dài / Panorama)

Nếu ảnh là một cảnh dài hoặc có nhiều khu vực chuyển tiếp, lập một bảng phân chia trạng thái:

| Khu vực (Zone) | Cảm xúc & Mood | Tông màu chủ đạo | Yếu tố thị giác nổi bật |
| :--- | :--- | :--- | :--- |
| **Zone A** | Tên cảm xúc | Màu chính + Màu phụ | Đèn/VFX đặc trưng |
| **Zone B** | Tên cảm xúc | Màu chính + Màu phụ | Đèn/VFX đặc trưng |

---

## 4. Checklist Thực Hành Nhanh (Actionable Step-by-Step for Dev/Artist)

Cuối bài luôn tóm tắt **Checklist 4 bước làm ngay**:
1. **Bước 1: Cắt & Gán Sorting Layer** (Foreground, Player, Background).
2. **Bước 2: Ném Global Light 2D & Đổi màu** (Kéo màu ấm vùng sáng, màu lạnh vùng tối).
3. **Bước 3: Tạo URP Volume** (Bật Color Adjustments tăng Contrast + Bloom nhẹ).
4. **Bước 4: Thêm 1 Particle System hoặc 1 Shader gió/nước** để khung cảnh thở nhịp nhàng.
