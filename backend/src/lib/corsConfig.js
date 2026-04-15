/**
 * CORS for browser clients (Vercel production, preview *.vercel.app, localhost, env list).
 * Uses explicit reflected Origin so credentials work; avoids edge cases with preview URLs.
 */
function parseOriginsList(raw) {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isTrustedHostname(hostname) {
  if (!hostname) return false;
  if (hostname === "localhost" || hostname.endsWith(".localhost")) return true;
  if (hostname.endsWith(".local")) return true;
  // Vercel production + preview deployments (e.g. *.vercel.app, *-*-*.vercel.app)
  if (hostname === "vercel.app" || hostname.endsWith(".vercel.app")) return true;
  return false;
}

/** Shared by Express `cors` and Socket.IO (same rules). */
export function corsOriginCallback(origin, callback) {
  if (!origin) {
    callback(null, true);
    return;
  }
  try {
    const u = new URL(origin);
    const fromEnv = [
      ...parseOriginsList(process.env.FRONTEND_URL),
      ...parseOriginsList(process.env.CORS_ORIGINS),
    ];
    if (fromEnv.includes(origin)) {
      callback(null, origin);
      return;
    }
    if (isTrustedHostname(u.hostname)) {
      callback(null, origin);
      return;
    }
    if (u.protocol === "https:" || u.protocol === "http:") {
      callback(null, origin);
      return;
    }
    callback(null, false);
  } catch {
    callback(null, false);
  }
}

/**
 * @type {import("cors").CorsOptions}
 */
export const corsOptions = {
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Cookie",
    "Accept",
    "Origin",
  ],
  exposedHeaders: [],
  maxAge: 86400,
  origin: corsOriginCallback,
};
