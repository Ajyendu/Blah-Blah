import axios from "axios";

const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").trim() || "http://localhost:5050";
const apiBase = backendUrl.replace(/\/$/, "") + "/api";

export const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});
