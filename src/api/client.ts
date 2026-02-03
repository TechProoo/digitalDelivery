import axios from "axios";
import type { AxiosInstance } from "axios";
import { clearAccessToken, getAccessToken } from "../lib/authToken";

function getBaseUrl() {
  const envUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;
  return envUrl?.trim() || "http://localhost:3000";
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
  }
);
