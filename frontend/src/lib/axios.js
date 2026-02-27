import axios from "axios";

// Backend base URL without /api (e.g. http://localhost:5050). Do not include /api here.
const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").trim() || "http://localhost:5050";
const normalized = backendUrl.replace(/\/$/, "");
const apiBase = normalized.endsWith("/api") ? normalized : `${normalized}/api`;

export const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});
