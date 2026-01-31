import { io } from "socket.io-client";

function computeSocketUrl(): string {
  // Prefer explicit env var when provided (set at build/deploy time)
  if (import.meta.env.VITE_SOCKET_URL)
    return import.meta.env.VITE_SOCKET_URL as string;

  // Otherwise derive from current location (works for deployed apps)
  if (typeof window !== "undefined" && window.location) {
    const isSecure = window.location.protocol === "https:";
    const scheme = isSecure ? "wss" : "ws";
    // keep same host and add /chat namespace which backend expects
    return `${scheme}://${window.location.host}/chat`;
  }

  // Fallback to localhost
  return "ws://localhost:3000/chat";
}

export const socket = io(computeSocketUrl(), {
  transports: ["websocket"],
  autoConnect: false,
  withCredentials: true,
});
