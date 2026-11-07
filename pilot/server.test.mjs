import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

test("máy chủ khởi động từ CLI và trả trang TECH-001", { timeout: 10000 }, async (t) => {
  const entry = fileURLToPath(new URL("./server.mjs", import.meta.url));
  const child = spawn(process.execPath, [entry, "0"], {
    stdio: ["ignore", "pipe", "inherit"],
  });
  const exited = once(child, "exit");
  const output = createInterface({ input: child.stdout });
  t.after(async () => {
    output.close();
    child.kill();
    await exited.catch(() => {});
  });

  const [line] = await Promise.race([
    once(output, "line", { signal: t.signal }),
    exited.then(([code]) => {
      throw new Error(`Máy chủ thoát trước khi in địa chỉ, mã thoát ${code}.`);
    }),
  ]);
  const address = line.match(/^TECH-001 · (http:\/\/127\.0\.0\.1:\d+\/)$/);
  assert.ok(address, `Địa chỉ khởi động không hợp lệ: ${line}`);

  const response = await fetch(address[1], { signal: t.signal });
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<h1>Bảng ticket<\/h1>/);
});
