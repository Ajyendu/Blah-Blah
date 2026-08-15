/**
 * In-process HTTP latency samples + counters for /metrics (dev or METRICS_ENABLED=true).
 * Not a replacement for Prometheus/Datadog — enough to report p50/p95/p99 from this process.
 */

const MAX_SAMPLES = 20_000;
const samples = new Array(MAX_SAMPLES);
let sampleCount = 0;
let sampleWrite = 0;
let httpTotal = 0;
let http5xx = 0;
let http4xx = 0;

export function recordHttp(durationMs, statusCode) {
  httpTotal += 1;
  if (statusCode >= 500) http5xx += 1;
  else if (statusCode >= 400) http4xx += 1;

  if (typeof durationMs === "number" && Number.isFinite(durationMs)) {
    samples[sampleWrite] = durationMs;
    sampleWrite = (sampleWrite + 1) % MAX_SAMPLES;
    if (sampleCount < MAX_SAMPLES) sampleCount += 1;
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
  if (sampleCount === 0) {
    return { p50: null, p95: null, p99: null, n: 0 };
  }
  const slice = samples.slice(0, sampleCount).sort((a, b) => a - b);
  return {
    p50: percentile(slice, 50),
    p95: percentile(slice, 95),
    p99: percentile(slice, 99),
    n: sampleCount,
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
  sampleCount = 0;
  sampleWrite = 0;
  httpTotal = 0;
  http5xx = 0;
  http4xx = 0;
}
