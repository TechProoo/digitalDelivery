import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";

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

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferResponse(userText: string): {
  text: string;
  actions?: BotAction[];
} {
  const q = normalize(userText);

  const wantsSolutions =
    /(solution|explore solution|all solutions|platform solution|show solution|see solution|see all solution|see all solutions|explore all solution|explore all solutions)/.test(
      q,
    );
  if (wantsSolutions) {
    return {
      text: "__UNDER_CONSTRUCTION__",
    };
  }

  const wantsTracking = /(track|tracking|where|status|locate|shipment)/.test(q);
  if (wantsTracking) {
    return {
      text: "I can help you track a shipment. If you have a tracking number, open the tracking page and paste it in.",
      actions: [
        { label: "Track shipment", to: "/dashboard/track", kind: "primary" },
        { label: "My orders", to: "/dashboard/orders", kind: "secondary" },
      ],
    };
  }

  const wantsQuote = /(quote|rate|price|cost|shipping|deliver)/.test(q);
  if (wantsQuote) {
    return {
      text: "To get a quote, start a new delivery. You'll enter route + package details and we'll take it from there.",
      actions: [
        {
          label: "Get a quote",
          to: "/dashboard/new-delivery",
          kind: "primary",
        },
      ],
    };
  }

  const wantsAbout =
    /(about|who are you|who is|what is digital|company|yourself|about us|who runs|founder|team|history|mission|vision|values)/.test(
      q,
    );
  if (wantsAbout) {
    return {
      text: "We are Digital Logistics, a modern delivery and shipping platform. Our mission is to make logistics simple, fast, and reliable for everyone. We connect customers, carriers, and technology to deliver packages across Nigeria and beyond. Learn more about our story, team, and values on our About page.",
      actions: [
        { label: "About us", to: "/about", kind: "primary" },
        { label: "Contact", to: "/contact", kind: "secondary" },
      ],
    };
  }

  const wantsAuthHelp =
    /(login|sign in|signin|password|reset|account|signup|register)/.test(q);
  if (wantsAuthHelp) {
    return {
      text: "Need help accessing your account? You can sign in, or create an account if you're new.",
      actions: [
        { label: "Sign in", to: "/login", kind: "primary" },
        { label: "Sign up", to: "/signup", kind: "secondary" },
      ],
    };
  }

  const wantsBilling = /(bill|billing|invoice|payment|refund)/.test(q);
  if (wantsBilling) {
    return {
      text: "For billing and payments, the quickest path is to contact support with your invoice/shipment details.",
      actions: [{ label: "Contact support", to: "/contact", kind: "primary" }],
    };
  }

  const wantsHuman = /(agent|human|support|help|call|email|whatsapp|chat)/.test(
    q,
  );
  if (wantsHuman) {
    const whatsapp = "https://wa.me/2349010191502";
    return {
      text: "Sure — you can reach a human via WhatsApp, or use the contact page for email/call details.",
      actions: [
        { label: "WhatsApp", href: whatsapp, kind: "primary" },
        { label: "Contact page", to: "/contact", kind: "secondary" },
      ],
    };
  }

  return {
    text: "I can help with tracking, quotes, account access, support, and company info. What are you trying to do?",
    actions: [
      { label: "Track shipment", to: "/dashboard/track", kind: "secondary" },
      {
        label: "Get a quote",
        to: "/dashboard/new-delivery",
        kind: "secondary",
      },
      { label: "About us", to: "/about", kind: "secondary" },
      { label: "Contact support", to: "/contact", kind: "secondary" },
    ],
  };
}

export default function SupportBot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // Load history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setMessages([welcome]);
        return;
      }
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

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isOpen]);

  // Allow other pages/components to open the bot.
  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: nowId(), role: "user", text: trimmed, timestamp: Date.now() },
    ]);

    const response = inferResponse(trimmed);
    if (response.text === "__UNDER_CONSTRUCTION__") {
      setMessages((prev) => [
        ...prev,
        {
          id: nowId(),
          role: "bot",
          text: "",
          timestamp: Date.now(),
          actions: undefined,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: nowId(),
          role: "bot",
          text: response.text,
          timestamp: Date.now(),
          actions: response.actions,
        },
      ]);
    }

    setInput("");
  };

  const runAction = (action: BotAction) => {
    // If the action is for solutions, show under construction UI
    if (
      ("to" in action && action.to && action.to.includes("solution")) ||
      (action.label && /solution/i.test(action.label))
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: nowId(),
          role: "bot",
          text: "",
          timestamp: Date.now(),
        },
      ]);
      return;
    }
    if ("to" in action) {
      navigate(action.to);
      return;
    }
    window.open(action.href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Launcher */}
      <button
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
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl shadow-2xl"
          style={{
            width: "min(90vw, 400px)",
            height: "min(80vh, 600px)",
            background: "hsl(var(--background) / 0.98)",
            border: "1px solid var(--border-soft)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
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
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
              We typically reply instantly
            </div>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-4 py-3"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="space-y-3">
              {messages.map((m, idx) => {
                // Under construction UI for solutions
                if (
                  m.role === "bot" &&
                  m.text === "" &&
                  (!m.actions || m.actions.length === 0)
                ) {
                  return (
                    <div key={m.id || idx} className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-yellow-50 border border-yellow-300 text-yellow-900 flex flex-col items-center gap-2">
                        <span style={{ fontSize: 32, color: "#facc15" }}>
                          🚧
                        </span>
                        <div
                          className="font-bold text-base"
                          style={{ color: "#b45309" }}
                        >
                          Under Construction
                        </div>
                        <div className="text-xs text-yellow-900 text-center max-w-xs">
                          This feature is not available yet because the client
                          hasn't paid the developer.
                          <br />
                          Please check back later!
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={m.id}
                    className={
                      m.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
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
                        {m.text}
                      </div>

                      {m.actions && m.actions.length > 0 && (
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
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
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
              <button
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
              </button>
            </div>
            <div
              className="mt-2 text-[11px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              Tip: try "track my shipment", "get a quote", or "talk to support".
            </div>
          </form>
        </div>
      )}
    </>
  );
}
