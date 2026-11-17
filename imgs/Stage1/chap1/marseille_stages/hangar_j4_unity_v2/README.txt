HANGAR J4 — PARALLAX / UNITY ASSET PACK V2

Nội dung
- Textures/: 14 PNG RGBA có alpha thật.
- left / center / right: mỗi đoạn có L0_sky_far, L1_sea, L2_playfield.
- L0 gộp bầu trời và bờ xa/Fort Saint-Jean; không có MuCEM.
- 5 prop riêng: sedan bọc thép, container gỉ, container xanh, thuyền hỏng + khói, nắp cống.
- Xe/container là vật thể hoàn chỉnh, được vẽ bù phần trước đây bị che/cắt.
- Source/: ba ảnh nền sạch dùng làm nguồn tách; không dùng ảnh nguồn như layer.
- preview.html: xem ba đoạn, bật/tắt lớp, cuộn camera và tải từng PNG.
- generation-prompts.json: các prompt và nguồn ảnh; công cụ built-in image_gen.

Bố cục
- Ba đoạn trái–giữa–phải rộng tổng cộng 6000 x 786 pixel bố cục, mỗi đoạn 2000 x 786.
- PNG giữ nguyên kích thước do công cụ xuất; một số lệch 1–2 px. Preview và script Unity căn về cùng khung 2000 x 786.
- Không ghi đè ảnh đã duyệt v1. Nền v2 được vẽ bù và mở rộng nên một số chi tiết khác v1.
- 3 xe trong bố cục dùng chung 1 sprite. Hai container gỉ ở dưới, một container xanh ở trên.
- Thuyền và cột khói hiện chung một sprite; có thể di chuyển cả cụm độc lập.

Import Unity
1. Copy nguyên thư mục hangar_j4_unity_v2 vào Assets của project.
2. Chờ Unity compile. Chọn Tools > Divergency > Hangar J4 > 1 - Configure sprites.
3. Muốn ráp mẫu: chọn 2 - Build preview in new additive scene. Lệnh tạo scene mới chưa lưu; không sửa scene hiện có. Lưu scene mới ở vị trí bạn muốn.
4. Trong Play Mode, di chuyển Hangar Preview Camera theo trục X để xem parallax; tham khảo X từ -20 đến +20, Y=3.93, orthographic size=3.93. Đặt aspect Game View gần 2000:786 để xem nguyên một đoạn.

Thiết lập sprite
Sprite (2D and UI), Single; 100 PPU; Filter=Point; Compression=None; Mip Maps=Off; Wrap=Clamp; Max Size=4096; Mesh=Full Rect; Pivot=Bottom Left.
Script dùng manifest bounds để bù padding trong suốt của prop. Nếu tự kéo ảnh vào scene, chỉnh scale/pivot theo ý bạn.
Sky/far: sorting -20, scroll factor 0.12.
Sea: sorting -30, scroll factor 0.35. Sky/far đè lên mép trên sea để giữ bờ xa sạch.
Boat/smoke: sorting -10, factor 0.40.
Playfield: sorting 0, factor 1 (đứng yên trong world).
Manholes: sorting 10. Cars/containers: sorting 20–22, factor 1.
Một dải màu teal hẹp ở sau đường bờ nước che các khe alpha nhỏ, không nằm trên sân đấu.

Phạm vi kiểm tra
Đã kiểm tra kích thước, alpha và vùng nội dung của 14 PNG. Asset hình ảnh được kiểm tra trực tiếp khi xuất.
Chưa chạy/compile bộ script trong Unity Editor của project bạn; đây là bộ asset kèm công cụ ráp mẫu, chưa phải map gameplay có collider/navigation.
Các panel mở rộng được vẽ riêng: đường chân trời và mặt sàn đã căn chung, nhưng texture/mây tại đường nối có thể cần tinh chỉnh thêm theo camera trong game.
Không tự cấu hình URP/Built-in, Pixel Perfect Camera, physics, collision, ánh sáng hoặc post-processing của project.

Gợi ý dùng trong map
- Giữ playfield và props cùng hệ tọa độ world; chỉ nhóm background có parallax.
- Đặt collider phù hợp hệ di chuyển hiện tại lên xe và nóc từng container để nhảy hai tầng.
- Dùng bốn nắp cống làm marker spawn Quái Hoa.
- Với shader/FX, có thể thêm shimmer nhẹ trên biển và particle smoke thay cột khói tĩnh khi tích hợp.
