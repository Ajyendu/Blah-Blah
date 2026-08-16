import Redis from "ioredis";

let redis = null;

function redisOptions(url) {
  const opts = {
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
    lazyConnect: false,
  };
  if (url.startsWith("rediss://")) {
    opts.tls = { rejectUnauthorized: false };
  }
  return opts;
}

export async function connectRedis() {
  const url = (process.env.REDIS_URL || "").trim();
  if (!url) {
    console.log("Redis skipped: REDIS_URL is not set");
    return null;
  }

  const client = new Redis(url, redisOptions(url));
  client.on("error", (err) => {
    console.error("Redis error:", err.message);
  });

  try {
    await client.ping();
    redis = client;
    console.log("Redis connected");
    return redis;
  } catch (err) {
    console.error("Redis connection failed:", err.message);
    try {
      client.disconnect();
    } catch {
      /* ignore */
    }
    redis = null;
    return null;
  }
}

export function getRedis() {
  return redis;
}

export function isRedisReady() {
  return Boolean(redis && redis.status === "ready");
}

export async function redisGetJson(key) {
  if (!isRedisReady()) return null;
  const raw = await redis.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function redisSetJson(key, value, ttlSec) {
  if (!isRedisReady()) return;
  const payload = JSON.stringify(value);
  if (ttlSec) await redis.set(key, payload, "EX", ttlSec);
  else await redis.set(key, payload);
}

export async function redisDel(key) {
  if (!isRedisReady()) return;
  await redis.del(key);
}
