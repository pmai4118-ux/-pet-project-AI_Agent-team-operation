import assert from "node:assert/strict";
import { test } from "node:test";
import { filterTickets, tickets } from "./filter.mjs";

const scenarios = [
  ["all", ["DEMO-01", "DEMO-02", "DEMO-03", "DEMO-04", "DEMO-05"]],
  ["todo", ["DEMO-01", "DEMO-04"]],
  ["doing", ["DEMO-02", "DEMO-05"]],
  ["done", ["DEMO-03"]],
  ["blocked", []],
];

for (const [status, expectedIds] of scenarios) {
  test(`danh sách ticket khi lọc trạng thái ${status}`, () => {
    assert.deepEqual(filterTickets(tickets, status).map((ticket) => ticket.id), expectedIds);
  });
}
