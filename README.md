# Divergency Reviewer Site

Public product and reviewer site for Divergency, a dark fantasy tactical brawler by TriLinkage, an independent game studio based in Marseille, France.

Live site after GitHub Pages deploys:

https://kslhuy.github.io/divergency-reviewer-site/

## Chỉnh sửa gameplay trực tiếp trên web

1. Mở **`Open-Gameplay-Editor.cmd`** trong thư mục dự án (nhấp đúp trên Windows).
2. Trình duyệt mở `http://127.0.0.1:4177/#gameplay`. Nút nổi **Chỉnh sửa gameplay** luôn nằm ở góc dưới bên phải, kể cả khi cuộn trang. Có thể dùng **Ctrl+Shift+E**. Khi đang đọc gameplay, bật sửa sẽ giữ vị trí đang đọc.
3. Bấm vào chữ, tiêu đề hoặc ô bảng để sửa. Thanh công cụ có in đậm, in nghiêng, tiêu đề, danh sách, thêm bảng/dòng và **+ Chèn ảnh**.
4. Bấm **Lưu vào dự án** hoặc **Ctrl+S**. Nội dung và `Divergency_Reviewer_Tabs.html` được cập nhật cùng lúc; không cần sửa Markdown hay chạy đồng bộ.
5. Bấm **Đóng biên tập** để đọc lại trang đã lưu. Mục lục cũng cập nhật khi sửa tiêu đề.

Máy cần Node.js 22 trở lên; trình mở tự cài thư viện ở lần đầu nếu thiếu. Có thể chạy `npm run edit` thay cho nhấp đúp. Chỉ máy đang chạy chương trình mới truy cập được trình biên tập.

**Chèn ảnh:** đặt con trỏ vào nội dung rồi bấm **+ Chèn ảnh**. Thư viện hiển thị ảnh thu nhỏ từ toàn bộ `imgs/`, có tìm theo tên và lọc thư mục. Chọn ảnh để xem trước, chỉnh chú thích nếu muốn rồi bấm **Chèn ảnh đã chọn**. Để dùng ảnh mới, bấm **Tải ảnh từ máy** hoặc kéo thả một ảnh vào cửa sổ thư viện. Hỗ trợ PNG, JPG, GIF, WebP, tối đa 20 MB/ảnh. Ảnh mới được sao chép vào `imgs/uploads/`, không thay đổi file gốc, và xuất hiện trong mục **Ảnh tải lên** để dùng lại. Đóng hộp chèn ảnh không xóa ảnh đã tải vào thư viện; bấm **Lưu vào dự án** để lưu vị trí ảnh trong tài liệu.

**Bản chính của gameplay là `content/gameplay.html`.** Markdown hiện có được giữ làm bản nhập ban đầu. Việc build hoặc xuất bản sau này dùng nội dung web đã lưu, không ghi đè bằng Markdown cũ. Các tab khác tiếp tục dùng Markdown như trước.

Mỗi lần lưu tạo bản sao trước thay đổi trong `.editor-backups/`. Bản nháp tự lưu trong trình duyệt để khôi phục sau khi đóng nhầm; bản nháp chỉ nằm trên trình duyệt đó cho đến khi bấm **Lưu vào dự án**. Nút **Tải bản nháp** xuất nội dung HTML để dự phòng; hình vẫn tham chiếu thư mục `imgs/`. Hai cửa sổ sửa cùng lúc sẽ được kiểm tra phiên bản để tránh ghi đè.

**Lưu trên máy không tự xuất bản lên website online.** Khi muốn cập nhật GitHub Pages, đưa thay đổi của dự án (đặc biệt `content/gameplay.html`) qua quy trình pull request bên dưới. Không thể ghi ngược vào dự án chỉ bằng cách mở file HTML hoặc trang GitHub Pages; các trang đó có hướng dẫn mở trình biên tập trên máy.

Nếu chủ động muốn thay toàn bộ gameplay bằng một bản Markdown mới, chạy lệnh nhập lại sau. Lệnh này sao lưu bản web trước khi thay thế:

```bash
node build-reviewer-html.mjs --import-gameplay-from-md
```

Muốn khôi phục một bản sao lưu: sao chép file tương ứng từ `.editor-backups/` thành `content/gameplay.html`, rồi chạy `npm run build`.

## Publishing / editing other tabs

1. Create a branch from `main`.
2. Save gameplay in the visual editor, or edit the other tabs' Markdown files in GitHub or locally.
3. Open a pull request into `main`.
4. Wait for the build check to pass.
5. After review, merge the pull request. GitHub Pages will rebuild and publish the site.

## What To Edit

- `Divergency_Kickstarter_Page_Rewrite.md`
- `Divergency_Story_Short_Summary.md`
- `Divergency_Complete_Story_VI.md`
- `content/gameplay.html` — gameplay's authoritative content, saved by the visual editor
- `Divergency_Gameplay_Level_Design.md` — original import/reference; explicit re-import only
- `Rewards_Fulfillment_Checklist.md`
- Web-ready images under `imgs/`

Do not add Unity project files, source code, private planning files, or editable source art files to this repository.

## Local Preview

Run:

```bash
npm ci --ignore-scripts
node build-reviewer-html.mjs
```

Then open `Divergency_Reviewer_Tabs.html` in a browser.

## Steam Screenshot Formatter

Open `steam-image-tool.html` to batch-convert screenshots to Steam-ready 16:9 PNG or JPG files. The tool supports crop-to-fill or fit-with-bars, exports at 1920x1080 or higher, and processes every image locally in the browser.
