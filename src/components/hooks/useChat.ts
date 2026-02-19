import { useEffect, useState } from "react";
import { socket } from "../../lib/socket";
import type { ChatResponse } from "../../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [connected, setConnected] = useState(false);

  // Subscribe to window-level events first so every hook instance receives updates
  // before any socket-dispatched events arrive (avoids race conditions).
  useEffect(() => {
    const onResponse = (e: Event) => {
      const ce = e as CustomEvent<ChatResponse>;
      if (ce?.detail) {
        setMessages((prev) => [...prev, ce.detail]);
      }
    };
    const onTyping = (e: Event) => {
      const ce = e as CustomEvent<{ isTyping: boolean }>;
      if (ce?.detail) {
        setIsTyping(ce.detail.isTyping);
      }
    };

    window.addEventListener("dd:chat:response", onResponse as EventListener);
    window.addEventListener("dd:chat:typing", onTyping as EventListener);

    // Drain any messages that may have been queued before listeners attached
    const queue = (window as any).__dd_message_queue as
      | ChatResponse[]
      | undefined;
    if (Array.isArray(queue) && queue.length > 0) {
      queue.forEach((m) =>
        window.dispatchEvent(
          new CustomEvent("dd:chat:response", { detail: m }),
        ),
      );
      (window as any).__dd_message_queue = [];
    }

    return () => {
      window.removeEventListener(
        "dd:chat:response",
        onResponse as EventListener,
      );
      window.removeEventListener("dd:chat:typing", onTyping as EventListener);
    };
  }, []);

  // Then attach socket listeners (attached once globally)
  useEffect(() => {
    // Only connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    // Attach listeners once globally to avoid duplicate handlers (React Strict Mode)
    if (!(window as any).__dd_listeners_attached) {
      (window as any).__dd_listeners_attached = true;

      socket.on("connect", () => {
        setConnected(true);
      });
      socket.on("disconnect", () => {
        setConnected(false);
      });

      socket.on("chat:response", (data: ChatResponse) => {
        // Ensure a global in-memory queue exists to hold messages if no listeners yet
        (window as any).__dd_message_queue =
          (window as any).__dd_message_queue || [];

        // Try to dispatch to window listeners. If none are attached yet they will get
        // drained by the listener effect above on mount.
        try {
          window.dispatchEvent(
            new CustomEvent("dd:chat:response", { detail: data }),
          );
        } catch (e) {
          // ignore
        } finally {
          // Always push into the queue so late-mounting listeners can drain it.
          (window as any).__dd_message_queue.push(data);
        }
      });

      socket.on("chat:typing", ({ isTyping }) => {
        try {
          window.dispatchEvent(
            new CustomEvent("dd:chat:typing", { detail: { isTyping } }),
          );
        } catch (e) {}
      });

      socket.on("chat:error", (err) => {
        setMessages((prev) => [
          ...prev,
          { message: err.message, timestamp: new Date().toISOString() },
        ]);
      });
    } else {
    }

    return () => {
      // Intentionally do not remove global listeners or disconnect here.
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("chat:message", { message, userId: "web-user" });
  };

  return { messages, isTyping, connected, sendMessage };
}
