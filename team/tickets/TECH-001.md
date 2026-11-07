# TECH-001 · Lọc bảng ticket theo trạng thái

- **Người phụ trách** Codex
- **Người review** Antigravity
- **Phạm vi** Bảng ticket mẫu chạy trên trình duyệt, dùng dữ liệu cố định.
- **Trạng thái** Kiểm thử chéo đạt, chờ Product Owner nghiệm thu.

## Tiêu chí nghiệm thu

- **AC1** Khi mở bảng, bộ lọc mặc định là **Tất cả**, bảng hiện 5 ticket và số đếm là 5.
- **AC2** Chọn lần lượt **Cần làm**, **Đang làm**, **Đã xong**. Bảng chỉ hiện ticket cùng trạng thái và số đếm lần lượt là 2, 2, 1.
- **AC3** Chọn **Bị chặn**. Bảng hiện số đếm 0 và thông báo **Không có ticket ở trạng thái này.**
- **AC4** Chọn lại **Tất cả** bằng bàn phím. Bảng hiện đủ 5 ticket, theo thứ tự ban đầu.

## Bàn giao cho Antigravity

> Review độc lập TECH-001 trong workspace này. Đọc AGENTS.md và ticket này, xem mã trong pilot/ và giữ nguyên mã nguồn. Trước hết ghi commit HEAD đang kiểm tra. Chạy node --test pilot/filter.test.mjs pilot/server.test.mjs và báo kết quả thực tế. Tự chạy node --test pilot/browser.test.mjs theo hướng dẫn trong README.md hoặc mở bản chạy từ node pilot/server.mjs để kiểm tra AC1 đến AC4, gồm thao tác bàn phím. Báo từng mục theo PASS, FAIL hoặc BLOCKED và ghi bằng chứng quan sát được. Ghi lỗi đáng xử lý kèm vị trí hoặc bước tái hiện. Nêu rõ mục nào chỉ đọc code mà chưa chạy. Trả kết quả trong phiên hiện tại bằng tiếng Việt.

## Kết quả kiểm thử chéo

Ngày 07/11/2026, Antigravity CLI 1.5.3 chạy bộ kiểm thử tại commit `add495c12242e2a88b573478ff638379246fd553`. Cả 7 ca đều đạt. Lệnh thoát với mã `0`.

| Tiêu chí | Kết quả | Quan sát trên Microsoft Edge |
| --- | --- | --- |
| AC1 | Đạt | Mặc định **Tất cả** hiển thị 5 ticket theo thứ tự ban đầu. |
| AC2 | Đạt | **Cần làm**, **Đang làm** và **Đã xong** trả đúng danh sách và số đếm 2, 2, 1. |
| AC3 | Đạt | **Bị chặn** hiển thị số đếm 0 và thông báo danh sách rỗng. |
| AC4 | Đạt | Phím Home chọn lại **Tất cả** và khôi phục đủ 5 ticket theo thứ tự ban đầu. |

## Nghiệm thu

Product Owner đối chiếu tiêu chí với kết quả và quyết định nghiệm thu. [Hồ sơ review và kiểm thử](../reviews/TECH-001.md)

## Câu hỏi cho Gemini Web

> Antigravity cho rằng `import.meta.main` không tồn tại trong Node.js. Pilot dùng Node.js 24.22.1. Bài kiểm thử gọi trực tiếp `node pilot/server.mjs 0` nhận địa chỉ loopback và HTTP 200. Đối chiếu tài liệu Node.js chính thức về `import.meta.main` rồi đánh giá nhận xét đó. Nêu điều kiện phiên bản cần ghi trong README và trường hợp nào sẽ cần đổi cách nhận diện entry point.
