# Workflow: từ nhân vật và ý tưởng đến HTML xem combo

Dùng **`$lf2-synergy-preview`** rồi ghi nhân vật và điều bạn muốn xem. Có thể cung cấp đường dẫn asset/file; không cần tự viết JSON hay code.

**Luồng chung:** nhận nhân vật → đọc kỹ năng và art → lấy/tạo ý tưởng → chia nhịp phối hợp → lấy sprite hoặc tạo hình thiếu → dựng animation → kiểm tra → mở HTML.

| Đầu vào | Cách xử lý |
|---|---|
| Chỉ tên/asset nhân vật | Tự xem bộ kỹ năng rồi nghĩ các kiểu cộng hưởng phù hợp. |
| Nhân vật + file ý tưởng | Đọc file và minh họa các chiêu được chỉ định. |
| File + yêu cầu sáng tạo thêm | Giữ phần gốc, bổ sung biến thể và ghi rõ phần mới. |
| Nhiều nhân vật | Dựng các cặp/nhóm yêu cầu, bao gồm combo ba người trở lên. |
| Thiếu hình mới | Tạo concept dựa trên sprite tham chiếu, giữ nét và màu. |

Mỗi lần xuất cùng kiểu xem: danh sách chiêu, sân diễn có animation, chú thích theo nhịp, vai trò từng người, đúng/lỡ nhịp, phát/dừng, tua, tốc độ 0,5×. Có một file **`Synergy_Preview.html`** để mở offline và source để sửa tiếp.

## Câu lệnh dùng ngay

**Tự nghĩ cho một cặp:**

```text
$lf2-synergy-preview
Nhân vật: Deep và Tulas trong project này.
Tự nghĩ 3 synergy tạo thành kỹ năng mới, có điều kiện thời gian hoặc vị trí.
Đọc skill/animation thật, giữ style và màu; thiếu hình thì tạo.
Xuất HTML xem như bản Solei × Tulas, có đúng nhịp và lỡ nhịp.
```

**Lấy ý tưởng từ file:**

```text
$lf2-synergy-preview
Đọc ý tưởng trong C:\duong-dan\combo-ideas.md, chỉ dựng mục 2 và 4.
Nhân vật và asset lấy theo file. Chỗ nào chưa đủ hãy bổ sung hợp lý và ghi rõ.
Xuất HTML animation theo cùng khung xem, kèm file offline.
```

**Cộng hưởng ba người:**

```text
$lf2-synergy-preview
Nhóm: Solei + Tulas + Deep. Nghĩ 2 combo cần cả ba người phối hợp.
Cho thấy ai mở chiêu, ai biến đổi chiêu, ai kết thúc;
nếu người thứ ba hụt nhịp thì kết quả thay đổi thế nào.
Dựng HTML chuyển động, không chỉ viết mô tả.
```

**Nhiều cặp trong một bản xem:**

```text
$lf2-synergy-preview
Các cặp: Solei + Deep, Tulas + Mark, Deep + Mark.
Mỗi cặp 2 ý tưởng, dùng cùng một HTML và hiển thị đúng vai trò theo cảnh.
```

**Sửa một bản đã có:**

```text
$lf2-synergy-preview
Sửa cảnh <tên chiêu> trong <đường dẫn output>:
kéo dài đoạn chuẩn bị, làm rõ khoảnh khắc hai chiêu hợp lại.
Giữ các cảnh khác và cách xem hiện tại.
```

Đây là workflow duyệt ý tưởng/visual. Khi chọn được chiêu, triển khai và kiểm thử gameplay Unity là bước riêng theo yêu cầu tiếp theo.
