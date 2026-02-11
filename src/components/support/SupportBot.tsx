import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/AuthContext";

type BotRole = "user" | "bot";

type BotAction =
  | { label: string; to: string; kind?: "primary" | "secondary" }
  | { label: string; href: string; kind?: "primary" | "secondary" };

type BotMessage = {
  id: string;
  role: BotRole;
  text: string;
  timestamp: number;
  actions?: BotAction[];
};

const OPEN_EVENT = "dl:openSupportBot";
const nowId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function SupportBot() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotMessage[]>([]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { messages: chatMessages, isTyping, sendMessage } = useChat();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const welcome = useMemo<BotMessage>(
    () => ({
      id: nowId(),
      role: "bot",
      text: "Hi! I'm Digital Logistics Assistant. How can I help you today?",
      timestamp: Date.now(),
      actions: [
        { label: "Track shipment", to: "/dashboard/track", kind: "primary" },
        {
          label: "Get a quote",
          to: "/dashboard/new-delivery",
          kind: "secondary",
        },
      ],
    }),
    [],
  );

  useEffect(() => setMessages([welcome]), [welcome]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen, isAuthenticated]);

  // Optional: lock background scroll while open (mobile especially)
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const mergedMessages = useMemo(() => {
    const socketMsgs: BotMessage[] = chatMessages.map((cm) => {
      const tsNum = (() => {
        try {
          const t = cm.timestamp as unknown as string;
          const parsed = Date.parse(t);
          return Number.isFinite(parsed) ? parsed : Date.now();
        } catch {
          return Date.now();
        }
      })();

      return {
        id: nowId(),
        role: "bot",
        text: (cm.message as string) || "",
        timestamp: tsNum,
      };
    });

    const all = [...messages, ...socketMsgs].sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    if (isTyping) {
      all.push({
        id: "typing-indicator",
        role: "bot",
        text: "Typing...",
        timestamp: Date.now() + 1,
      });
    }

    return all;
  }, [messages, chatMessages, isTyping]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: BotMessage = {
      id: nowId(),
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (sendMessage) sendMessage(trimmed);
  };

  const runAction = (action: BotAction) => {
    if ("to" in action) {
      navigate(action.to);
      setIsOpen(false);
    } else {
      window.open(action.href, "_blank");
    }
  };

  return (
    <>
      {/* Floating action button (smaller + safer on mobile) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed z-50 grid place-items-center rounded-full shadow-2xl
                   bottom-10 right-4 sm:right-6 h-14 w-14 sm:h-16 sm:w-16"
        style={{
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          boxShadow: "var(--glow-primary)",
        }}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.55)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat container: Fullscreen on mobile, floating panel on desktop */}
            <motion.div
              className="fixed z-50 flex flex-col overflow-hidden
                         inset-x-0 bottom-0 sm:inset-auto sm:bottom-24 sm:right-6"
              style={{
                background: "hsl(var(--background) / 0.98)",
                border: "1px solid var(--border-soft)",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-strong)",
              }}
              // Mobile: full height. Desktop: fixed size.
              // Use inline styles for dynamic sizing.
              // eslint-disable-next-line react/jsx-no-duplicate-props
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div
                className="w-full sm:rounded-3xl"
                style={{
                  width: "100vw",
                  height: "calc(100dvh - 0px)",
                  maxHeight: "100dvh",
                }}
              >
                <div
                  className="h-full w-full flex flex-col sm:rounded-3xl"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Desktop sizing override */}
                  <div
                    className="hidden sm:block"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 24,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Wrapper that applies desktop dimensions */}
                  <div
                    className="h-full w-full flex flex-col sm:rounded-3xl"
                    style={{
                      // On desktop, override to your original size
                      ...(window.matchMedia?.("(min-width: 640px)")?.matches
                        ? {
                            width: "min(92vw, 420px)",
                            height: "min(80vh, 620px)",
                          }
                        : {}),
                    }}
                  >
                    {/* Header (sticky-ish) */}
                    <div
                      className="px-4 py-3 flex items-start justify-between gap-3"
                      style={{
                        borderBottom: "1px solid var(--border-soft)",
                        background: "hsl(var(--card) / 0.55)",
                      }}
                    >
                      <div>
                        <div
                          className="text-base font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Support Assistant
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          We typically reply instantly
                        </div>
                      </div>

                      {/* Close button in header for mobile comfort */}
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="grid place-items-center rounded-xl h-10 w-10 shrink-0"
                        style={{
                          background: "hsl(var(--background) / 0.35)",
                          border: "1px solid var(--border-soft)",
                          color: "var(--text-primary)",
                        }}
                        aria-label="Close chat"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Messages */}
                    <div
                      ref={listRef}
                      className="flex-1 overflow-y-auto px-4 py-3"
                      style={{
                        scrollbarWidth: "thin",
                        WebkitOverflowScrolling: "touch",
                      }}
                    >
                      {authLoading ? (
                        <div className="h-full grid place-items-center">
                          Loading…
                        </div>
                      ) : !isAuthenticated ? (
                        <div className="h-full grid place-items-center px-4">
                          <div
                            className="w-full max-w-sm text-center rounded-2xl p-6"
                            style={{
                              background: "hsl(var(--card) / 0.70)",
                              border: "1px solid var(--border-soft)",
                              boxShadow: "var(--shadow-card)",
                            }}
                          >
                            <div
                              className="text-xl font-semibold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              Sign in to chat with Support
                            </div>
                            <div
                              className="mt-2 text-sm"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              Sign in to access personalized help and pricing
                              information.
                            </div>
                            <div className="mt-5 grid gap-2">
                              <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="rounded-full px-4 py-3 text-sm font-semibold"
                                style={{
                                  background: "hsl(var(--primary))",
                                  color: "hsl(var(--primary-foreground))",
                                  boxShadow: "var(--glow-primary)",
                                }}
                              >
                                Sign in
                              </button>
                              <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="rounded-full px-4 py-3 text-sm font-semibold"
                                style={{
                                  background: "hsl(var(--background) / 0.35)",
                                  border: "1px solid var(--border-soft)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                Create account
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {mergedMessages.map((m) => (
                            <div
                              key={m.id}
                              className={
                                m.role === "user"
                                  ? "flex justify-end"
                                  : "flex justify-start"
                              }
                            >
                              <div
                                className="max-w-[88%] sm:max-w-[85%] rounded-2xl px-3 py-2 text-sm"
                                style={{
                                  background:
                                    m.role === "user"
                                      ? "hsl(var(--primary) / 0.18)"
                                      : "hsl(var(--card) / 0.55)",
                                  border: "1px solid var(--border-soft)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                <div className="whitespace-pre-wrap leading-relaxed">
                                  {m.id === "typing-indicator" ? (
                                    <motion.span
                                      animate={{ opacity: [0.3, 1, 0.3] }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                      }}
                                    >
                                      {m.text}
                                    </motion.span>
                                  ) : (
                                    m.text
                                  )}
                                </div>

                                {m.actions?.length ? (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {m.actions.map((a) => (
                                      <button
                                        key={a.label}
                                        type="button"
                                        onClick={() => runAction(a)}
                                        className="rounded-full px-3 py-1 text-xs font-semibold"
                                        style={{
                                          background:
                                            a.kind === "primary"
                                              ? "hsl(var(--primary))"
                                              : "hsl(var(--background) / 0.35)",
                                          color:
                                            a.kind === "primary"
                                              ? "hsl(var(--primary-foreground))"
                                              : "var(--text-primary)",
                                          border:
                                            a.kind === "primary"
                                              ? "none"
                                              : "1px solid var(--border-soft)",
                                        }}
                                      >
                                        {a.label}
                                      </button>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Input (sticky bottom, safe space) */}
                    {isAuthenticated && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          send(input);
                        }}
                        className="px-4 pt-3 pb-4"
                        style={{
                          borderTop: "1px solid var(--border-soft)",
                          paddingBottom:
                            "calc(16px + env(safe-area-inset-bottom))",
                          background: "hsl(var(--background) / 0.98)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message…"
                            className="flex-1 rounded-xl px-3 py-3 text-sm outline-none"
                            style={{
                              background: "hsl(var(--background) / 0.35)",
                              border: "1px solid var(--border-soft)",
                              color: "var(--text-primary)",
                            }}
                          />
                          <button
                            type="submit"
                            className="grid place-items-center rounded-xl h-11 w-11"
                            style={{
                              background: "hsl(var(--primary))",
                              color: "hsl(var(--primary-foreground))",
                              boxShadow: "var(--glow-primary)",
                            }}
                            aria-label="Send"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>

                        <div
                          className="mt-2 text-[11px]"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          Tip: try “track my shipment”, “get a quote”, or “talk
                          to support”.
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
