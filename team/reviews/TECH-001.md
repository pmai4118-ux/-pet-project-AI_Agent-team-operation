# Review và kiểm thử TECH-001

- **Phiên bản mã ứng dụng được review** `c261c43fbec32e1ae7eb9c7cd803ef82588b80c4`
- **Reviewer** Google Antigravity CLI 1.0.16, Gemini 3.8 Flash Medium
- **Trạng thái** Đã review tĩnh và xác minh trên máy. Chờ Antigravity tự chạy test.

## Review của Antigravity

Antigravity nhận nội dung ticket và mã ứng dụng lấy trực tiếp từ commit được giao. Reviewer xác nhận mã hỗ trợ các hành vi AC1–AC4 và đề nghị kiểm tra việc chọn lại **Tất cả** bằng bàn phím trên trình duyệt thực tế.

Reviewer cho rằng `node pilot/server.mjs` sẽ thoát vì Node.js thiếu `import.meta.main`. Reviewer đề xuất chạy tiến trình Node riêng để kiểm tra lệnh khởi động.

Phiên headless đã từ chối lệnh cần quyền `command`. Phiên tương tác yêu cầu tin cậy workspace với quyền đọc, sửa và thực thi, nên dừng ở bước đó. Lượt review tĩnh hoàn thành với 0 ca test do Antigravity thực thi.

## Xác minh của Codex

Mình chạy lại đề xuất của Antigravity trên Node.js 24.22.1. Tiến trình `node pilot/server.mjs 0` in địa chỉ loopback, tiếp tục chạy và trả HTTP 200 với trang bảng ticket. Kết quả bác bỏ lỗi khởi động trên phiên bản Node được dùng cho pilot. Node.js có `import.meta.main` từ v24.2.0 và v22.18.0. [Tài liệu Node.js](https://nodejs.org/api/esm.html#importmetamain)

Ca kiểm thử khởi động được lưu ở [server.test.mjs](../../pilot/server.test.mjs). README ghi rõ phiên bản Node dùng cho pilot.

| Người chạy | Kiểm thử | Kết quả |
| --- | --- | --- |
| Codex | `node --test pilot/filter.test.mjs` | 5/5 ca lọc theo ID và thứ tự |
| Codex | `node --test pilot/server.test.mjs` | Máy chủ CLI khởi động và trả HTTP 200 |
| Codex | `node --test pilot/browser.test.mjs` | Edge đạt AC1–AC4, gồm số đếm, trạng thái rỗng và quay về **Tất cả** bằng phím Home |
| Antigravity | Tự chạy bộ test trên workspace | Bị chặn ở bước quyền thực thi |

Lượt chạy gộp trên máy đạt 7/7. Phần trình duyệt và kiểm tra HTTP chạy với quyền mở Edge và kết nối loopback.

## Bàn giao cho Gemini Web

Đã chuẩn bị câu hỏi phản biện ở cuối ticket. Công cụ điều khiển trình duyệt không khởi tạo được với đường dẫn workspace có dấu ngoặc vuông, nên chưa có phản hồi từ Gemini Web.
