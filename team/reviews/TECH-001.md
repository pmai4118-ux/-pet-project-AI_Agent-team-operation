# Review và kiểm thử TECH-001

- **Phiên bản mã ứng dụng được review** `c261c43fbec32e1ae7eb9c7cd803ef82588b80c4`
- **Reviewer tĩnh** Google Antigravity CLI 1.0.16, Gemini 3.8 Flash Medium
- **Kiểm thử chéo** Google Antigravity CLI 1.5.3, Gemini 3.8 Flash Medium
- **Trạng thái** Kiểm thử chéo đạt, chờ Product Owner nghiệm thu.

## Review của Antigravity

Antigravity nhận nội dung ticket và mã ứng dụng lấy trực tiếp từ commit được giao. Reviewer xác nhận mã hỗ trợ các hành vi AC1–AC4 và đề nghị kiểm tra việc chọn lại **Tất cả** bằng bàn phím trên trình duyệt thực tế.

Reviewer cho rằng `node pilot/server.mjs` sẽ thoát vì Node.js thiếu `import.meta.main`. Reviewer đề xuất chạy tiến trình Node riêng để kiểm tra lệnh khởi động.

Trong lượt đầu, phiên headless từ chối lệnh cần quyền `command` và phiên tương tác dừng ở bước yêu cầu tin cậy workspace. Kết quả bên dưới ghi lượt thực thi sau khi Product Owner cấp quyền.

## Xác minh của Codex

Mình chạy lại đề xuất của Antigravity trên Node.js 24.22.1. Tiến trình `node pilot/server.mjs 0` in địa chỉ loopback, tiếp tục chạy và trả HTTP 200 với trang bảng ticket. Kết quả bác bỏ lỗi khởi động trên phiên bản Node được dùng cho pilot. Node.js có `import.meta.main` từ v24.2.0 và v22.18.0. [Tài liệu Node.js](https://nodejs.org/api/esm.html#importmetamain)

Ca kiểm thử khởi động được lưu ở [server.test.mjs](../../pilot/server.test.mjs). README ghi rõ phiên bản Node dùng cho pilot.

| Người chạy | Kiểm thử                             | Kt quả                                                                             |
| ---------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| Codex      | `node --test pilot/filter.test.mjs`  | 5/5 ca lọc theo ID và thứ tự                                                       |
| Codex      | `node --test pilot/server.test.mjs`  | Máy chủ CLI khởi động và trả HTTP 200                                              |
| Codex      | `node --test pilot/browser.test.mjs` | Edge đạt AC1–AC4, gồm số đếm, trạng thái rỗng và quay về **Tất cả** bằng phím Home |

Lượt chạy gộp trên máy đạt 7/7. Phần trình duyệt và kiểm tra HTTP chạy với quyền mở Edge và kết nối loopback.

## Kiểm thử chéo của Antigravity

Ngày 07/11/2026, Antigravity tự chạy `git rev-parse HEAD` và xác nhận commit `add495c12242e2a88b573478ff638379246fd553`. Phiên headless dùng quyền riêng cho lệnh xác nhận commit và lệnh kiểm thử đã duyệt. Lệnh kiểm thử chạy trực tiếp trên máy để dùng Edge và kết nối HTTP loopback.

```powershell
node --test pilot/filter.test.mjs pilot/server.test.mjs pilot/browser.test.mjs
```

Mã thoát `0`. Antigravity ghi nhận 7/7 ca đạt, gồm 5 ca lọc, 1 ca khởi động máy chủ và 1 ca Edge kiểm tra AC1–AC4. Thời gian bộ test là 1,49 giây. Phiên Antigravity `595e27a5-9448-4c60-96ab-da1bee04bf31`.

## Bàn giao cho Gemini Web

Đã chuẩn bị câu hỏi phản biện ở cuối ticket. Công cụ điều khiển trình duyệt không khởi tạo được với đường dẫn workspace có dấu ngoặc vuông, nên chưa có phản hồi từ Gemini Web.
