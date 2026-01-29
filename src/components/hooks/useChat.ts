import { useEffect, useState } from "react";
import { socket } from "../../lib/socket";
import type { ChatResponse } from "../../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("[useChat] useEffect mount");

    // Only connect if not already connected
    if (!socket.connected) {
      socket.connect();
      console.log("[useChat] socket.connect() called");
    }

    // Attach listeners once globally to avoid duplicate handlers (React Strict Mode)
    if (!(window as any).__dd_listeners_attached) {
      (window as any).__dd_listeners_attached = true;
      console.log("[useChat] attaching socket listeners");

      socket.on("connect", () => {
        console.log("[useChat] socket connected");
        setConnected(true);
      });
      socket.on("disconnect", () => {
        console.log("[useChat] socket disconnected");
        setConnected(false);
      });

      socket.on("chat:response", (data: ChatResponse) => {
        console.log("[useChat] chat:response", data);
        // Broadcast to all hook instances; window listeners will update local state.
        try {
          window.dispatchEvent(
            new CustomEvent("dd:chat:response", { detail: data }),
          );
        } catch (e) {
          // ignore
        }
      });

      socket.on("chat:typing", ({ isTyping }) => {
        console.log("[useChat] chat:typing", isTyping);
        // Broadcast typing status; window listeners will update local state.
        try {
          window.dispatchEvent(
            new CustomEvent("dd:chat:typing", { detail: { isTyping } }),
          );
        } catch (e) {}
      });

      socket.on("chat:error", (err) => {
        console.log("[useChat] chat:error", err);
        setMessages((prev) => [
          ...prev,
          { message: err.message, timestamp: new Date().toISOString() },
        ]);
      });
    } else {
      console.log("[useChat] listeners already attached; skipping");
    }

    return () => {
      console.log(
        "[useChat] useEffect unmount (no cleanup to preserve global connection)",
      );
      // Intentionally do not remove global listeners or disconnect here. Keeping a single
      // connection/listener set prevents duplicates in React Strict Mode development.
    };
  }, []);

  // Subscribe to window-level events so every hook instance receives updates
  useEffect(() => {
    const onResponse = (e: Event) => {
      const ce = e as CustomEvent<ChatResponse>;
      if (ce?.detail) setMessages((prev) => [...prev, ce.detail]);
    };
    const onTyping = (e: Event) => {
      const ce = e as CustomEvent<{ isTyping: boolean }>;
      if (ce?.detail) setIsTyping(ce.detail.isTyping);
    };

    window.addEventListener("dd:chat:response", onResponse as EventListener);
    window.addEventListener("dd:chat:typing", onTyping as EventListener);

    return () => {
      window.removeEventListener(
        "dd:chat:response",
        onResponse as EventListener,
      );
      window.removeEventListener("dd:chat:typing", onTyping as EventListener);
    };
  }, []);

  const sendMessage = (message: string) => {
    console.log("[useChat] sendMessage", message);
    socket.emit("chat:message", { message, userId: "web-user" });
  };

  return { messages, isTyping, connected, sendMessage };
}
