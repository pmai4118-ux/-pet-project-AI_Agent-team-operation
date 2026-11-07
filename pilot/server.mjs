import { readFile } from "node:fs/promises";
import { createServer } from "node:http";

const files = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/app.mjs", ["app.mjs", "text/javascript; charset=utf-8"]],
  ["/filter.mjs", ["filter.mjs", "text/javascript; charset=utf-8"]],
]);

export function createPilotServer() {
  return createServer(async (request, response) => {
    const route = files.get(request.url.split("?")[0]);
    if (!route) {
      response.writeHead(404).end();
      return;
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }

    const [filename, contentType] = route;
    try {
      const body = await readFile(new URL(filename, import.meta.url));
      response.writeHead(200, { "Content-Type": contentType });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch (error) {
      console.error(error.message);
      response.writeHead(500).end();
    }
  });
}

if (import.meta.main) {
  const port = Number(process.argv[2] ?? 4173);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error("Cổng phải là số nguyên từ 0 đến 65535.");
  }
  const server = createPilotServer();
  server.listen(port, "127.0.0.1", () => {
    console.log(`TECH-001 · http://127.0.0.1:${server.address().port}/`);
  });
}
