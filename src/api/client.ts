import axios from "axios";
import type { AxiosInstance } from "axios";
import { clearAccessToken, getAccessToken } from "../lib/authToken";

/**
 * Dev:
 *  - Use Vite proxy: "/api" -> "http://localhost:3000"
 * Prod:
 *  - Set VITE_API_URL to your backend base (e.g. https://api.yourdomain.com)
 *  - OR keep VITE_API_URL empty and reverse-proxy "/api" on the same domain.
 */
function getBaseUrl() {
  const envUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;

  // Production / staging (or any environment where you set VITE_API_URL)
  if (envUrl && envUrl.trim()) return envUrl.trim();

  // Local dev: use same-origin proxy route (configure in vite.config.ts)
  return "/api";
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;

    // Your backend uses a global ResponseInterceptor:
    // { success: true, data: <payload>, message: ... }
    if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      "success" in data
    ) {
      return (data as any).data;
    }

    return data;
  },
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Ensure the app reacts consistently to expired/invalid sessions.
      clearAccessToken();
    }

    return Promise.reject(error);
  },
);
