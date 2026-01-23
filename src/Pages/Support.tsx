import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  FileText,
  Globe,
  MessageCircle,
  Package,
  Rocket,
  Search,
  Truck,
  BookOpen,
  ExternalLink,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

type SupportCategory = {
  id: string;
  title: string;
  description: string;
  articlesCount: number;
  icon: React.ReactNode;
  accent: string;
};

const CATEGORIES: SupportCategory[] = [
  {
    id: "shipments",
    title: "Shipments",
    description: "Track, manage, and troubleshoot shipments",
    articlesCount: 24,
    icon: <Package className="h-6 w-6" />,
    accent: "var(--accent-teal)",
  },
  {
    id: "billing",
    title: "Billing & Payments",
    description: "Invoices, payment methods, and refunds",
    articlesCount: 18,
    icon: <CreditCard className="h-6 w-6" />,
    accent: "hsl(var(--success))",
  },
  {
    id: "carriers",
    title: "Carriers & Partners",
    description: "Partner registration and management",
    articlesCount: 15,
    icon: <Truck className="h-6 w-6" />,
    accent: "#8b5cf6",
  },
  {
    id: "international",
    title: "International Shipping",
    description: "Customs, duties, and cross-border logistics",
    articlesCount: 32,
    icon: <Globe className="h-6 w-6" />,
    accent: "var(--accent-amber)",
  },
  {
    id: "docs",
    title: "Documentation",
    description: "BOL, customs forms, and compliance",
    articlesCount: 21,
    icon: <FileText className="h-6 w-6" />,
    accent: "#fb7185",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "New user guides and tutorials",
    articlesCount: 12,
    icon: <Rocket className="h-6 w-6" />,
    accent: "#38bdf8",
  },
];

const Support = () => {
  const [query, setQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("track");

  const popularArticles = useMemo(
    () => [
      {
        id: "track-realtime",
        title: "How to track my shipment in real-time",
        to: "/dashboard/track",
      },
      {
        id: "rates-quotes",
        title: "Understanding shipping rates and quotes",
        to: "/resources",
      },
      {
        id: "customs-clearance",
        title: "Customs clearance requirements explained",
        to: "/resources",
      },
      {
        id: "damage-claim",
        title: "How to file a damage claim",
        to: "/contact",
      },
      {
        id: "notifications",
        title: "Setting up automatic notifications",
        to: "/resources",
      },
      {
        id: "multi-shipments",
        title: "Managing multiple shipments at once",
        to: "/dashboard/orders",
      },
    ],
    [],
  );

  const faqs = useMemo(
    () => [
      {
        id: "track",
        question: "How do I track my shipment?",
        answer:
          "You can track your shipment by entering your tracking ID on our Track page, or by logging into your account dashboard. Real-time updates are available for all active shipments.",
      },
      {
        id: "timeframes",
        question: "What are your delivery timeframes?",
        answer:
          "Delivery timeframes vary by route, service level, and customs processing. You'll see an estimated delivery window at checkout and in your shipment details.",
      },
      {
        id: "quote",
        question: "How do I request a quote?",
        answer:
          "Use the “Get a Quote” button in the navbar or contact our support team. Provide pickup/drop-off, package details, and preferred service, and we’ll respond quickly.",
      },
      {
        id: "international-docs",
        question: "What documents are required for international shipping?",
        answer:
          "Common documents include a commercial invoice, packing list, and any product-specific certificates. Requirements can vary by destination; our team can help you confirm what's needed.",
      },
      {
        id: "damaged-goods",
        question: "How do I file a claim for damaged goods?",
        answer:
          "Contact support with your tracking ID, photos of the damage, and a short description. If available, include delivery notes and packaging photos to speed up processing.",
      },
      {
        id: "address-change",
        question: "Can I change my delivery address after booking?",
        answer:
          "In many cases, yes. Changes depend on shipment status and carrier constraints. Contact support as soon as possible to request an address update.",
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) =>
      [c.title, c.description].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-16 pb-16 text-center">
          <div className="flex justify-center">
            <span
              className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                background: "hsl(var(--card) / 0.65)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
                boxShadow: "var(--shadow-card)",
                backdropFilter: "blur(10px)",
              }}
            >
              Support Center
            </span>
          </div>

          <h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            How Can We <span style={{ color: "var(--accent-teal)" }}>Help</span>
            ?
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Find answers to common questions, browse our knowledge base, or
            contact our support team.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Search
                className="h-5 w-5"
                style={{ color: "var(--text-tertiary)" }}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full bg-transparent outline-none text-sm sm:text-base"
                style={{ color: "var(--text-primary)" }}
                aria-label="Search for help articles"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
        {/* Browse by Category */}

        <section className="pb-10">
          <h2
            className="text-center text-3xl sm:text-4xl font-bold header"
            style={{ color: "var(--text-primary)" }}
          >
            Browse by Category
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat) => (
              <div
                key={cat.id}
                className="group text-left rounded-2xl p-7 transition"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="grid place-items-center rounded-2xl"
                    style={{
                      width: 52,
                      height: 52,
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid var(--border-soft)",
                      color: cat.accent,
                    }}
                  >
                    {cat.icon}
                  </div>

                  <span
                    className="grid place-items-center rounded-full"
                    style={{
                      width: 40,
                      height: 40,
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--accent-teal)",
                    }}
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="mt-5">
                  <div
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {cat.title}
                  </div>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cat.description}
                  </p>

                  <div
                    className="mt-4 text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {cat.articlesCount} articles
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mx-auto mt-10 max-w-xl text-center">
              <p style={{ color: "var(--text-secondary)" }}>
                No categories match your search.
              </p>
            </div>
          )}
        </section>

        {/* Popular + FAQ */}
        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Popular Articles */}
            <div>
              <div className="flex items-center gap-3">
                <BookOpen
                  className="h-5 w-5"
                  style={{ color: "var(--accent-teal)" }}
                />
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Popular Articles
                </h3>
              </div>

              <div
                className="mt-5 overflow-hidden rounded-2xl"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {popularArticles.map((a, idx) => (
                  <NavLink
                    key={a.id}
                    to={a.to}
                    className="flex items-center justify-between gap-4 px-6 py-5 transition"
                    style={{
                      borderTop:
                        idx === 0
                          ? undefined
                          : "1px solid hsl(var(--border) / 0.35)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="font-medium">{a.title}</span>
                    <ExternalLink
                      className="h-4 w-4"
                      style={{ color: "var(--text-tertiary)" }}
                    />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center gap-3">
                <HelpCircle
                  className="h-5 w-5"
                  style={{ color: "var(--accent-teal)" }}
                />
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Frequently Asked Questions
                </h3>
              </div>

              <div
                className="mt-5 overflow-hidden rounded-2xl"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {faqs.map((f, idx) => {
                  const open = openFaqId === f.id;
                  return (
                    <div
                      key={f.id}
                      style={{
                        borderTop:
                          idx === 0
                            ? undefined
                            : "1px solid hsl(var(--border) / 0.35)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(open ? null : f.id)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        style={{ color: "var(--text-primary)" }}
                        aria-expanded={open}
                      >
                        <span className="font-semibold">{f.question}</span>
                        {open ? (
                          <ChevronUp
                            className="h-5 w-5"
                            style={{ color: "var(--accent-teal)" }}
                          />
                        ) : (
                          <ChevronDown
                            className="h-5 w-5"
                            style={{ color: "var(--text-tertiary)" }}
                          />
                        )}
                      </button>

                      {open && (
                        <div
                          className="px-6 pb-6"
                          style={{
                            color: "var(--text-secondary)",
                            lineHeight: 1.7,
                          }}
                        >
                          {f.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Still need help */}
        <section className="py-10">
          <div className="text-center">
            <h3
              className="text-3xl sm:text-4xl font-bold header"
              style={{ color: "var(--text-primary)" }}
            >
              Still Need Help?
            </h3>
            <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
              Our support team is available 24/7 to assist you
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Live chat */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex justify-center">
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--accent-teal)",
                  }}
                >
                  <MessageSquare className="h-6 w-6" />
                </div>
              </div>
              <div
                className="mt-6 text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Live Chat
              </div>
              <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
                Chat with our AI-powered assistant for instant help
              </p>
              <NavLink
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold"
                style={{
                  width: "100%",
                  background: "hsl(var(--background) / 0.35)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                Start Chat
              </NavLink>
            </div>

            {/* Call */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid hsl(var(--primary) / 0.35)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex justify-center">
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                    color: "hsl(var(--success))",
                  }}
                >
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <div
                className="mt-6 text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Call Us
              </div>
              <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
                Speak directly with a support agent
              </p>
              <a
                href="tel:+18005551234"
                className="mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold"
                style={{
                  width: "100%",
                  background: "hsl(var(--background) / 0.35)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                +1 (800) 555-1234
              </a>
            </div>

            {/* Email */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex justify-center">
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                    color: "#8b5cf6",
                  }}
                >
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <div
                className="mt-6 text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Email Support
              </div>
              <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
                Get a response within 24 hours
              </p>
              <NavLink
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold"
                style={{
                  width: "100%",
                  background: "hsl(var(--background) / 0.35)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Floating chat */}
      <NavLink
        to="/contact"
        className="fixed bottom-6 right-6 z-50 grid place-items-center rounded-full"
        style={{
          width: 56,
          height: 56,
          background:
            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
          boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          color: "hsl(var(--primary-foreground))",
        }}
        aria-label="Chat with support"
        title="Chat with support"
      >
        <MessageCircle className="h-6 w-6" />
      </NavLink>
    </div>
  );
};

export default Support;
