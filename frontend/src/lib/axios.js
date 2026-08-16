import axios from "axios";

const backendUrl =
  (import.meta.env.VITE_BACKEND_URL || "").trim() || "http://localhost:5050";
const normalized = backendUrl.replace(/\/$/, "");
export const backendOrigin = normalized.endsWith("/api")
  ? normalized.slice(0, -4)
  : normalized;
const apiBase = normalized.endsWith("/api") ? normalized : `${normalized}/api`;

export const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
  timeout: 15000,
});

/** Hit /health so a sleeping Render instance wakes before auth. */
export async function wakeBackend(timeoutMs = 45000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(`${backendOrigin}/health`, {
      method: "GET",
      signal: controller.signal,
      mode: "cors",
      cache: "no-store",
    });
  } catch {
    // Cold start or network — caller still tries the real request.
  } finally {
    clearTimeout(timer);
  }
}
