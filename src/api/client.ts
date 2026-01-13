import axios from "axios";
import type { AxiosInstance } from "axios";

function getBaseUrl() {
  const envUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;
  return envUrl?.trim() || "http://localhost:3000";
}

console.log(getBaseUrl);

export const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
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
    return Promise.reject(error);
  }
);
