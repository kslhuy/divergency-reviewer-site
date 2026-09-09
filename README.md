# Divergency Reviewer Site

## Chỉnh sửa gameplay

Mở **https://divergency-team-editor.huyq1471.chatgpt.site/?edit=1#gameplay** hoặc **Open-Gameplay-Editor.cmd**.

Sửa trực tiếp rồi bấm **Lưu online** (Ctrl+S). Thành viên khác tải lại trang sẽ thấy thay đổi. Không cần chỉnh Markdown, đồng bộ file hoặc push Git để lưu gameplay.

- Đăng nhập bằng ChatGPT. Thành viên mới gửi yêu cầu quyền sửa; quản trị viên duyệt tại **Thành viên**. Ai có link cũng đọc được tài liệu.
- **+ Chèn ảnh** cho phép chọn ảnh trong thư viện hoặc tải ảnh mới từ máy (PNG/JPG/GIF/WebP, tối đa 20 MB).
- **Lịch sử** giữ các phiên bản để xem lại và khôi phục.
- Khi hai người cùng lưu, các thay đổi không trùng nhau được gộp. Nếu cùng sửa một đoạn, chọn nội dung muốn giữ rồi bấm **Gộp và lưu**, ngay trên trang.

Nội dung online và ảnh tải lên được lưu riêng với code. Push hoặc triển khai lại giao diện không ghi đè gameplay đã lưu online. Đây là biên tập dùng chung có kiểm tra phiên bản; chưa hiển thị con trỏ/gõ đồng thời như Google Docs.

## Development

- `npm ci --ignore-scripts` installs dependencies; `npm test` checks storage, permissions, conflicts, merging and uploads.
- `npm run dev:online` runs the online app locally. Local authentication uses `seedy@sites.test`; configure `ADMIN_EMAIL` in the ignored `.dev.vars` file.
- `npm run build:online` builds the Sites Worker. `.openai/hosting.json` identifies the existing project, D1 database and R2 uploads binding. Production migrations are managed by Drizzle; never reseed live content.
- `node scripts/prepare-online-source.mjs` prepares the small Sites source checkout in `.editor-runtime/site-source`. Build, commit and push this exact source before packaging and publishing through Sites.
- Gameplay in D1 is authoritative online. `content/gameplay.html` is the initial/fallback content; Markdown is a manual import source. Neither automatically overwrites online content.
- Other tabs are built from their Markdown files by `node build-reviewer-html.mjs`.
- For deliberate offline development only: `npm run edit`, then `http://127.0.0.1:4177/?local=1#gameplay`. Local saves do not publish online.

## GitHub Pages

Public reader: https://kslhuy.github.io/divergency-reviewer-site/

Change code or other tabs on a branch, open a PR, and merge after checks and review. GitHub Pages rebuilds from main. Its gameplay reader loads shared online content, and edit buttons open the online editor. Worker changes require a Sites deployment as well.

Do not add Unity project files, private planning files, or editable source art to this repository.

## Steam Screenshot Formatter

Open `steam-image-tool.html` to batch-convert screenshots to Steam-ready 16:9 PNG or JPG files. It supports crop-to-fill or fit-with-bars and processes images locally in the browser.
