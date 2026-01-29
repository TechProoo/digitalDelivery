import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";

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

const STORAGE_KEY = "dl.supportBot.v1";
const OPEN_EVENT = "dl:openSupportBot";

const nowId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function SupportBot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Welcome message
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

  // Socket chat hook
  const { messages: chatMessages, isTyping, sendMessage } = useChat();

  // Load local history
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setMessages([welcome]);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as BotMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      } else {
        setMessages([welcome]);
      }
    } catch {
      setMessages([welcome]);
    }
  }, [welcome]);

  // Persist local messages
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, chatMessages, isTyping, isOpen]);

  // External trigger to open bot
  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  // Merge local + socket messages + typing indicator
  const mergedMessages = useMemo(() => {
    const socketMsgs: BotMessage[] = chatMessages.map((m) => ({
      id: m.id,
      role: "bot",
      text: m.message,
      timestamp: m.timestamp ? new Date(m.timestamp).getTime() : Date.now(),
    }));

    if (isTyping) {
      socketMsgs.push({
        id: "typing-indicator",
        role: "bot",
        text: "…",
        timestamp: Date.now(),
      });
    }

    // Merge and sort by timestamp
    const all = [...messages, ...socketMsgs].sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    // Show all user messages and all bot responses, but only one typing indicator
    const deduped: BotMessage[] = [];
    let typingAdded = false;
    for (let i = 0; i < all.length; i++) {
      const msg = all[i];
      if (msg.id === "typing-indicator") {
        if (!typingAdded) {
          deduped.push(msg);
          typingAdded = true;
        }
      } else {
        deduped.push(msg);
      }
    }
    return deduped;
  }, [messages, chatMessages, isTyping]);

  // Send message
  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMessage: BotMessage = {
      id: nowId(),
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(trimmed);
    setInput("");
  };

  const runAction = (action: BotAction) => {
    if ("to" in action) {
      navigate(action.to);
    } else {
      window.open(action.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="fixed bottom-6 right-6 z-50 grid place-items-center rounded-full"
        style={{
          width: 56,
          height: 56,
          background:
            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
          boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          color: "hsl(var(--primary-foreground))",
        }}
        aria-label={isOpen ? "Close support bot" : "Open support bot"}
        title={isOpen ? "Close" : "Chat with support"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl shadow-2xl"
            style={{
              width: "min(90vw, 400px)",
              height: "min(80vh, 600px)",
              background: "hsl(var(--background) / 0.98)",
              border: "1px solid var(--border-soft)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-3"
              style={{
                borderBottom: "1px solid var(--border-soft)",
                background: "hsl(var(--card) / 0.55)",
              }}
            >
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
            </motion.div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-3"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {mergedMessages.map((m, idx) => {
                    // Under construction UI
                    if (
                      m.role === "bot" &&
                      m.text === "" &&
                      (!m.actions || m.actions.length === 0)
                    ) {
                      return (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          className="flex justify-start"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-yellow-50 border border-yellow-300 text-yellow-900 flex flex-col items-center gap-2"
                          >
                            <motion.span
                              animate={{ rotate: [0, -5, 5, -5, 0] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                              style={{ fontSize: 32, color: "#facc15" }}
                            >
                              🚧
                            </motion.span>
                            <div
                              className="font-bold text-base"
                              style={{ color: "#b45309" }}
                            >
                              Under Construction
                            </div>
                            <div className="text-xs text-yellow-900 text-center max-w-xs">
                              This feature is not available yet because the
                              client hasn't paid the developer.
                              <br />
                              Please check back later!
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    }

                    // Normal messages
                    return (
                      <motion.div
                        key={m.id || `msg-${idx}`}
                        initial={{
                          opacity: 0,
                          x: m.role === "user" ? 20 : -20,
                          scale: 0.95,
                        }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className={
                          m.role === "user"
                            ? "flex justify-end"
                            : "flex justify-start"
                        }
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="max-w-[85%] rounded-2xl px-3 py-2 text-sm"
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
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                {m.text}
                              </motion.span>
                            ) : (
                              m.text
                            )}
                          </div>
                          {m.actions && m.actions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="mt-2 flex flex-wrap gap-2"
                            >
                              {m.actions.map((a, actionIdx) => (
                                <motion.button
                                  key={a.label}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + actionIdx * 0.1 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
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
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Input */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="px-4 py-3"
              style={{ borderTop: "1px solid var(--border-soft)" }}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="grid place-items-center rounded-xl h-10 w-10"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "var(--glow-primary)",
                  }}
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-[11px]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Tip: try "track my shipment", "get a quote", or "talk to
                support".
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
