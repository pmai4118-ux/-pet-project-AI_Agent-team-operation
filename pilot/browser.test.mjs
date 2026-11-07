import assert from "node:assert/strict";
import { once } from "node:events";
import { createRequire } from "node:module";
import { test } from "node:test";
import { createPilotServer } from "./server.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.TECH_PILOT_PLAYWRIGHT ?? "playwright");

test("TECH-001 · kiểm tra bộ lọc trên Microsoft Edge", { timeout: 30000 }, async (t) => {
  const server = createPilotServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const browser = await chromium.launch({ channel: "msedge" });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 375, height: 700 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  const select = page.getByRole("combobox", { name: "Trạng thái" });
  const count = page.getByRole("status");
  const empty = page.getByText("Không có ticket ở trạng thái này.");
  const rows = page.getByRole("listitem");
  const displayedIds = async () =>
    (await rows.allTextContents()).map((row) => row.split(" · ")[0]);
  const initialIds = ["DEMO-01", "DEMO-02", "DEMO-03", "DEMO-04", "DEMO-05"];

  assert.equal(await select.inputValue(), "all");
  assert.deepEqual(await displayedIds(), initialIds);
  assert.equal(await count.textContent(), "5 ticket");
  await page.keyboard.press("Tab");
  assert.equal(await select.evaluate((element) => document.activeElement === element), true);

  for (const [status, ids] of [
    ["todo", ["DEMO-01", "DEMO-04"]],
    ["doing", ["DEMO-02", "DEMO-05"]],
    ["done", ["DEMO-03"]],
  ]) {
    await select.selectOption(status);
    assert.deepEqual(await displayedIds(), ids);
    assert.equal(await count.textContent(), `${ids.length} ticket`);
    assert.equal(await empty.isVisible(), false);
  }

  await select.selectOption("blocked");
  assert.equal(await rows.count(), 0);
  assert.equal(await count.textContent(), "0 ticket");
  assert.equal(await empty.isVisible(), true);

  await page.keyboard.press("Home");
  assert.equal(await select.inputValue(), "all");
  assert.deepEqual(await displayedIds(), initialIds);
  assert.equal(await count.textContent(), "5 ticket");
  assert.equal(await empty.isVisible(), false);
  assert.deepEqual(errors, []);
});
