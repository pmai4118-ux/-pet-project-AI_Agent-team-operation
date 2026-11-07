# Phòng ban tech AI

Workspace này thử quy trình Codex điều phối và triển khai, Antigravity kiểm thử chéo, Gemini Web phản biện khi cần. Bạn là Product Owner và chốt nghiệm thu. Trạng thái và bằng chứng nằm cùng ticket để người khác có thể tiếp tục công việc từ một phiên mới.

## Chạy tính năng thử

TECH-001 là bộ lọc trạng thái cho một bảng ticket mẫu. Dùng Node.js từ 24.2 trở lên. Ứng dụng và test logic dùng thư viện chuẩn của Node.js.

```powershell
node --test pilot/filter.test.mjs pilot/server.test.mjs
node pilot/server.mjs
```

Mở địa chỉ in trong terminal, mặc định là `http://127.0.0.1:4173`. Thử bốn trạng thái và mục **Tất cả**. Nhấn Ctrl+C để dừng máy chủ. Có thể truyền số cổng khác, ví dụ `node pilot/server.mjs 4174`.

Để tự động kiểm tra trên trình duyệt, dùng Microsoft Edge và Playwright. Trên máy này có thể dùng Playwright đi kèm runtime của Codex:

```powershell
$env:TECH_PILOT_PLAYWRIGHT = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
node --test pilot/browser.test.mjs
```

Test trình duyệt tự mở máy chủ loopback trên một cổng trống và dừng sau khi chạy.

## Giao việc và bàn giao

1. Tạo ticket từ [mẫu](team/templates/ticket.md). Product Owner chốt đầu ra và tiêu chí nghiệm thu. Codex chọn các [vai cần thiết](team/roles.md) rồi giao một người thực hiện chính.
2. Codex triển khai, chạy test và gửi ticket kèm commit hoặc diff, kết quả test và cách tái hiện. Khi có remote, dùng PR làm nơi lưu diff và phản hồi.
3. Antigravity đọc phiên bản được giao, tự chạy test và kiểm tra tiêu chí. Reviewer ghi rõ từng bước đã chạy, điều quan sát được và bước nào bị chặn. Nếu sửa code sau review, gửi lại phiên bản mới.
4. Khi tiêu chí còn mơ hồ hoặc có bất đồng, đưa phần bối cảnh cần thiết vào [mẫu Gemini Web](team/templates/gemini-review.md). Ghi câu hỏi và quyết định sau phản biện trong ticket.
5. Product Owner đối chiếu kết quả và quyết định nghiệm thu. Nếu có lỗi hoặc thiếu bằng chứng, ticket quay lại người phụ trách.

Pilot hiện tại dùng [ticket TECH-001](team/tickets/TECH-001.md) và lưu bằng chứng trong [hồ sơ review](team/reviews/TECH-001.md). Có thể dán yêu cầu bàn giao trong ticket vào Antigravity IDE. Để dùng CLI tương tác trên Windows, chạy từ thư mục gốc:

```powershell
agy --sandbox --prompt-interactive 'Review TECH-001 using team/tickets/TECH-001.md and follow its Antigravity handoff.'
```

CLI tương tác có thể yêu cầu chủ workspace xác nhận tin cậy thư mục và duyệt từng lệnh. Chế độ headless trên máy này đã chặn lệnh test cần duyệt. Khi gặp trường hợp đó, có thể yêu cầu review tĩnh bằng cách cung cấp nội dung của đúng commit và ghi riêng phần kiểm thử bị chặn.
