# TECH-001 · Lọc bảng ticket theo trạng thái

- **Người phụ trách** Codex
- **Người review** Antigravity
- **Phạm vi** Bảng ticket mẫu chạy trên trình duyệt, dùng dữ liệu cố định.

## Tiêu chí nghiệm thu

- **AC1** Khi mở bảng, bộ lọc mặc định là **Tất cả**, bảng hiện 5 ticket và số đếm là 5.
- **AC2** Chọn lần lượt **Cần làm**, **Đang làm**, **Đã xong**. Bảng chỉ hiện ticket cùng trạng thái và số đếm lần lượt là 2, 2, 1.
- **AC3** Chọn **Bị chặn**. Bảng hiện số đếm 0 và thông báo **Không có ticket ở trạng thái này.**
- **AC4** Chọn lại **Tất cả** bằng bàn phím. Bảng hiện đủ 5 ticket, theo thứ tự ban đầu.

## Bàn giao cho Antigravity

> Review độc lập TECH-001 trong workspace này. Đọc AGENTS.md và ticket này, xem mã trong pilot/ và giữ nguyên mã nguồn. Trước hết ghi commit HEAD đang kiểm tra hoặc ghi rõ nếu chưa có commit. Chạy node --test pilot/filter.test.mjs và báo kết quả thực tế. Tự chạy node --test pilot/browser.test.mjs theo hướng dẫn trong README.md hoặc mở bản chạy từ node pilot/server.mjs để kiểm tra AC1 đến AC4, gồm thao tác bàn phím. Báo từng mục theo PASS, FAIL hoặc BLOCKED và ghi bằng chứng quan sát được. Ghi lỗi đáng xử lý kèm vị trí hoặc bước tái hiện. Nêu rõ mục nào chỉ đọc code mà chưa chạy. Trả kết quả trong phiên hiện tại bằng tiếng Việt.

## Nghiệm thu

Product Owner đối chiếu tiêu chí với kết quả review và quyết định.
