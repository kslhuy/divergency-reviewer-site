# Divergency Reviewer Site

## Chỉnh sửa gameplay

Mở **https://divergency-team-editor.huyq1471.chatgpt.site/?edit=1#gameplay** hoặc **Open-Gameplay-Editor.cmd**.

Sửa trực tiếp rồi bấm **Lưu online** (Ctrl+S). Thành viên khác tải lại trang sẽ thấy thay đổi. Không cần chỉnh Markdown, đồng bộ file hoặc push Git để lưu gameplay.

- Đăng nhập bằng ChatGPT. Thành viên mới gửi yêu cầu quyền sửa; quản trị viên duyệt tại **Thành viên**. Ai có link cũng đọc được tài liệu.
- **+ Chèn ảnh** cho phép chọn ảnh trong thư viện hoặc tải ảnh mới từ máy (PNG/JPG/GIF/WebP, tối đa 20 MB).
- **Lịch sử** giữ các phiên bản để xem lại và khôi phục.
- Khi hai người cùng lưu, các thay đổi không trùng nhau được gộp. Nếu cùng sửa một đoạn, chọn nội dung muốn giữ rồi bấm **Gộp và lưu**, ngay trên trang.

Nội dung online và ảnh tải lên được lưu riêng với code. Push hoặc triển khai lại giao diện không ghi đè gameplay đã lưu online. Đây là biên tập dùng chung có kiểm tra phiên bản; chưa hiển thị con trỏ/gõ đồng thời như Google Docs.

## Nội dung và xuất Markdown

Thanh điều khiển và đầu mỗi tab có **Copy MD** và **Download .md** để dùng ngay. **Choose section… / Sections…** mở bản xem trước và cho phép chọn riêng từng mục/chương. Các nút copy/tải cũng có trong thanh chỉnh sửa. Bản xuất lấy nội dung đang hiển thị, gồm cả thay đổi chưa lưu; ảnh dùng đường dẫn đầy đủ. Bảng có ô gộp được giữ dưới dạng HTML trong Markdown để không mất cấu trúc.

Thanh chỉnh sửa dùng tiếng Anh và các nút nhỏ gọn. **Style** tự nhận kiểu tại con trỏ: Text, Title, Header, Subheader, Small heading, Heading 5/6, Quote hoặc Code. Các lựa chọn dùng thẻ HTML và CSS có sẵn của tài liệu, không thay đổi font, màu hay kích thước chữ hiện tại.

Web không đọc hay gom các file Markdown để tạo nội dung nữa. Các file `.md` cũ chỉ giữ làm tư liệu; sửa chúng không thay đổi web.

| Cần sửa | Nơi sửa |
| --- | --- |
| Tên và mô tả tab | `content/documents.json` |
| Nội dung từng chương | `content/<tên-tab>/*.html`; `index.json` quyết định thứ tự |
| Khung trang | `src/page.mjs` |
| Tab, mục lục, khung đọc | `src/components.mjs` |
| Gallery và danh sách ảnh | `src/gallery.mjs`, `src/images.mjs` |
| Kiểu trang và cửa sổ xuất | `styles/site.css`, `styles/export.css` |
| Chức năng đọc và xuất | `scripts/reader-*.js`, `scripts/markdown-export.js` |

Gameplay online vẫn dùng bản đã lưu trong cơ sở dữ liệu. Các chương trong `content/gameplay/` là bản dự phòng và nguồn biên tập local. Lưu local cập nhật danh sách chương và giữ bản sao khôi phục; không ghi đè nội dung online. `Divergency_Reviewer_Tabs.html` là kết quả tạo tự động, không sửa trực tiếp. Khi mang web sang thư mục khác, mang theo `scripts/`, `styles/` và `imgs/`.

## Development

- `npm ci --ignore-scripts` installs dependencies; `npm test` checks storage, permissions, conflicts, merging and uploads.
- `npm run dev:online` runs the online app locally. Local authentication uses `seedy@sites.test`; configure `ADMIN_EMAIL` in the ignored `.dev.vars` file.
- `npm run build:online` builds the Sites Worker. `.openai/hosting.json` identifies the existing project, D1 database and R2 uploads binding. Production migrations are managed by Drizzle; never reseed live content.
- `node scripts/prepare-online-source.mjs` prepares the small Sites source checkout in `.editor-runtime/site-source`. Build, commit and push this exact source before packaging and publishing through Sites.
- Gameplay in D1 is authoritative online. `content/gameplay/index.json` and its HTML chapters provide the initial/fallback content and never overwrite saved online content.
- All tabs are built from their HTML chapters by `node build-reviewer-html.mjs`. The optional legacy Markdown parser is retained only for compatibility checks; it is not imported by the build.
- Browser CSS and JavaScript are separate files. The local server, GitHub Pages workflow and Sites Worker serve only the declared browser assets in `src/asset-files.mjs`.
- For deliberate offline development only: `npm run edit`, then `http://127.0.0.1:4177/?local=1#gameplay`. Local saves do not publish online.

## GitHub Pages

Public reader: https://kslhuy.github.io/divergency-reviewer-site/

Change code or other tabs on a branch, open a PR, and merge after checks and review. GitHub Pages rebuilds from main. Its gameplay reader loads shared online content, and edit buttons open the online editor. Worker changes require a Sites deployment as well.

Do not add Unity project files, private planning files, or editable source art to this repository.

## Steam Screenshot Formatter

Open `steam-image-tool.html` to batch-convert screenshots to Steam-ready 16:9 PNG or JPG files. It supports crop-to-fill or fit-with-bars and processes images locally in the browser.
