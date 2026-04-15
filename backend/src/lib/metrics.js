/**
 * In-process HTTP latency samples + counters for /metrics (dev or METRICS_ENABLED=true).
 * Not a replacement for Prometheus/Datadog — enough to report p50/p95/p99 from this process.
 */

const MAX_SAMPLES = 20_000;
const samples = [];
let httpTotal = 0;
let http5xx = 0;
let http4xx = 0;

export function recordHttp(durationMs, statusCode) {
  httpTotal += 1;
  if (statusCode >= 500) http5xx += 1;
  else if (statusCode >= 400) http4xx += 1;

  if (typeof durationMs === "number" && Number.isFinite(durationMs)) {
    samples.push(durationMs);
    if (samples.length > MAX_SAMPLES) samples.shift();
  }
}

function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const idx = Math.min(
    sorted.length - 1,
    Math.ceil((p / 100) * sorted.length) - 1,
  );
  return sorted[Math.max(0, idx)];
}

export function getHttpLatencyPercentilesMs() {
  if (samples.length === 0) {
    return { p50: null, p95: null, p99: null, n: 0 };
  }
  const sorted = [...samples].sort((a, b) => a - b);
  return {
    p50: percentile(sorted, 50),
    p95: percentile(sorted, 95),
    p99: percentile(sorted, 99),
    n: sorted.length,
  };
}

export function getHttpCounters() {
  return {
    requestsTotal: httpTotal,
    responses4xx: http4xx,
    responses5xx: http5xx,
  };
}

/** For tests only */
export function resetMetrics() {
  samples.length = 0;
  httpTotal = 0;
  http5xx = 0;
  http4xx = 0;
}
