#!/usr/bin/env node
/**
 * Stress-test concurrent Socket.IO connections (same JWT opens many sockets — valid for this app).
 *
 * Usage:
 *   LOAD_TEST_JWT="<paste Bearer token>" node scripts/socket-load-test.mjs --count 500 --url http://localhost:5000
 *
 * Get a token: log in via the app, copy localStorage token or /api/auth/check response.
 */

import { io as ioClient } from "socket.io-client";

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  return process.argv[i + 1] ?? def;
}

const count = Math.max(1, parseInt(String(arg("count", "100")), 10) || 100);
const url = String(arg("url", "http://localhost:5000")).replace(/\/$/, "");
const token = process.env.LOAD_TEST_JWT?.trim();
if (!token) {
  console.error("Set LOAD_TEST_JWT to a valid JWT (same as browser socket auth).");
  process.exit(1);
}

const sockets = [];
let connected = 0;
let failed = 0;

async function main() {
  console.log(`Connecting ${count} sockets to ${url} ...`);

  for (let i = 0; i < count; i++) {
    const s = ioClient(url, {
      path: "/socket.io",
      transports: ["websocket"],
      auth: { token },
      reconnection: false,
      timeout: 15_000,
    });
    sockets.push(s);
    s.on("connect", () => {
      connected += 1;
    });
    s.on("connect_error", (err) => {
      failed += 1;
      if (failed <= 3) console.error("connect_error:", err?.message || err);
    });
  }

  await new Promise((r) => setTimeout(r, 5000));
  console.log(`After 5s: connected=${connected}, failed=${failed}, target=${count}`);
  console.log(`GET ${url}/metrics (if enabled) for sockets.connected`);

  for (const s of sockets) {
    try {
      s.close();
    } catch (_) {}
  }
  process.exit(failed > count * 0.5 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
