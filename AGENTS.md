# Divergency — danh tính dự án và chuẩn nhân vật bắt buộc

Game của dự án là **Divergency**. **Little Fighter 2 (LF2)** chỉ là một nguồn
cảm hứng. Chỉ nhắc tên game đó trong nội dung xác định rõ nguồn cảm hứng;
không dùng làm tên dự án, runtime, phong cách mặc định, chuẩn kỹ năng, nhãn
studio hay tên công cụ/skill của Divergency. Không gọi Divergency là bản mod,
bản làm lại hoặc phần tiếp theo của một game khác. Dùng artwork, dữ liệu và
quy ước thực tế của Divergency làm nguồn thiết kế; không mặc định xuất `.dat`
hoặc áp đặt định dạng/timing của một engine khác.

Thông tin do tác giả chốt ngày 20/10/2026. Đây là nguồn chuẩn về ngoại hình,
vũ khí và phong cách chiến đấu cho mọi tài liệu, kịch bản, bản dịch, prompt,
skill, mô tả kỹ năng và bản xuất trong dự án.

| Nhân vật | Đặc điểm phải giữ đúng |
| --- | --- |
| Solei | Chuyên đòn chân, đánh võ theo phong cách karate. Chân máy có mắt quỷ. |
| Block | Da đen; chuyên boxing, đấm, đá và đỡ đòn. |
| Mark | Dùng cung có thể tách ra thành kiếm; đeo kính kiểu laser; có chiêu Grenade (ném lựu đạn). |
| Deep | Cầm kiếm ngắn; chiến đấu theo phong cách đấu sĩ. |
| Tulas | Dùng phép thuật máu; có dấu chữ thập ở ngực. |

- Đọc bảng này trước khi viết hoặc sửa nội dung về các nhân vật trên. Không
  suy diễn bộ kỹ năng từ một game khác, ảnh minh họa hay một bản nháp cũ.
- Không gán đao/kiếm/kunai hoặc vai trò pháp sư tầm xa cho Solei; không gán
  khiên trang bị cho Block, súng/nỏ cho Mark, đại kiếm cho Deep hay
  lõi xúc tác tự đặt cho Tulas. Kính kiểu laser của Mark là đặc điểm thiết kế;
  chưa có xác nhận rằng kính bắn được laser.
- Bổ sung do tác giả xác nhận ngày 21/10/2026: Mark có chiêu Grenade. Điều này không thay đổi cung tách kiếm hoặc xác nhận kính bắn laser.
- Bản game test hiện không dùng mana, theo tác giả xác nhận ngày 21/10/2026. Mana trong simulator là ngân sách thiết kế để thử cân bằng; không tự coi số MP khác asset test là lỗi hoặc đồng bộ về 0. Phân biệt rõ code/asset đã có, đề xuất và phần chưa kiểm thử runtime.
- Chỉ tác giả mới thay đổi các đặc điểm đã chốt. Ý tưởng kỹ năng mới phải ghi
  rõ là đề xuất và vẫn tuân thủ bảng trên. Bản dịch giữ nguyên các đặc điểm.
- Sửa tại nguồn `content/` và các kịch bản đang dùng, rồi dựng lại bản xuất.
  Xóa bản nháp trùng hoặc đã bị thay thế khi chúng chỉ lưu thông tin sai.
- Trước khi bàn giao, chạy `npm run check:canon`, kiểm tra các PDF bị ảnh
  hưởng và dựng lại bằng `npm run build:all`. Kiểm tra tự động chỉ phát hiện
  các lỗi đã biết; vẫn phải đọc lại ngữ cảnh của động tác và người thực hiện.

## Serena và làm việc giữa hai project

- Khi bắt đầu, đọc initial instructions của Serena một lần, xác nhận project đang active là `divergency-reviewer-site`, rồi đọc memory `core`. Dùng Serena để tra cứu symbol và sửa mã JavaScript/TypeScript.
- Project game Unity liên quan nằm ở `../LF2Revie`, tên đăng ký Serena là `LF2Revie`. Đây là tên repository; tên game vẫn là **Divergency**.
- Với công việc liên quan cả hai repository, đọc memory `workflow/related_projects`. Trước khi làm ở project kia, activate đúng project Serena và đọc `AGENTS.md` cùng `core` của bên đó.
- Phân biệt hành vi đang được cài đặt trong C#/Unity asset với thiết kế, canon và tài liệu. Đối chiếu và báo rõ chênh lệch trước khi đồng bộ; không tự đổi các đặc điểm tác giả đã chốt.
- Áp dụng công cụ và kiểm tra của đúng repository. Các lệnh Unity phải theo AGENTS.md của game; các lệnh npm của site theo `package.json` hiện tại. Việc chỉ cấu hình Serena hoặc sửa hướng dẫn không cần dựng lại các bản xuất; yêu cầu kiểm tra canon/build ở trên vẫn áp dụng khi sửa nội dung hoặc mã tạo bản xuất.
- Đặt thư mục làm việc của shell rõ ràng; đổi project Serena không đổi quyền ghi của chat hay Unity Editor. Kiểm tra thay đổi hiện có, giữ phần việc của client khác và lưu bàn giao có ngày nếu công việc chưa xong. Chỉ một agent điều khiển cùng một Unity Editor.
