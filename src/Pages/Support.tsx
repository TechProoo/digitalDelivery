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
