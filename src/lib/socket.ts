import { io } from "socket.io-client";

function computeSocketUrl(): string {
  const socketEnv =
    (import.meta.env.VITE_SOCKET_URL as string | undefined) || undefined;
  const apiEnv =
    (import.meta.env.VITE_API_URL as string | undefined) || undefined;

  // If an explicit socket URL is set, use it unless it points to localhost
  // while the app itself is not running on localhost (common Netlify mistake).
  if (socketEnv) {
    try {
      const parsed = new URL(socketEnv);
      const envIsLocal =
        parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
      const runningLocally =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");

      if (!envIsLocal || runningLocally) {
        return socketEnv;
      }
      // If socketEnv points to localhost but the app isn't running on localhost, ignore it.
    } catch {
      // If parsing fails, fall back to using the raw env value
      return socketEnv;
    }
  }

  // If an API URL is provided, derive a websocket endpoint from it (secure when HTTPS)
  if (apiEnv) {
    try {
      const parsedApi = new URL(apiEnv);
      const secure = parsedApi.protocol === "https:";
      return `${secure ? "wss" : "ws"}://${parsedApi.host}/chat`;
    } catch {
      // fall through to runtime derivation
    }
  }

  // Derive from current page origin (works for same-origin deployments)
  if (typeof window !== "undefined" && window.location) {
    const isSecure = window.location.protocol === "https:";
    const scheme = isSecure ? "wss" : "ws";
    return `${scheme}://${window.location.host}/chat`;
  }

  // Final fallback for local development
  return "ws://localhost:3000/chat";
}

export const socket = io(computeSocketUrl(), {
  transports: ["websocket"],
  autoConnect: false,
});
