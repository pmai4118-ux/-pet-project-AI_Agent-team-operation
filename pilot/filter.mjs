export const statuses = [
  { id: "todo", label: "Cần làm" },
  { id: "doing", label: "Đang làm" },
  { id: "done", label: "Đã xong" },
  { id: "blocked", label: "Bị chặn" },
];

export const tickets = [
  { id: "DEMO-01", title: "Viết hướng dẫn khởi động", status: "todo" },
  { id: "DEMO-02", title: "Kiểm tra luồng đăng nhập", status: "doing" },
  { id: "DEMO-03", title: "Tạo bộ dữ liệu mẫu", status: "done" },
  { id: "DEMO-04", title: "Chuẩn bị ca kiểm thử bàn phím", status: "todo" },
  { id: "DEMO-05", title: "Rà soát nhãn trạng thái", status: "doing" },
];

export function filterTickets(items, status) {
  return status === "all" ? items : items.filter((ticket) => ticket.status === status);
}
