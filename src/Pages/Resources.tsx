import { useMemo, useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import {
  BookOpen,
  Download,
  FileText,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

type ResourceType = "Article" | "Guide" | "Whitepaper" | "Case Study";

type ResourceCategory =
  | "Technology"
  | "Sustainability"
  | "Operations"
  | "Strategy"
  | "Compliance"
  | "E-Commerce"
  | "Specialized"
  | "Industry"
  | "Guides";

type ResourceItem = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTimeMinutes: number;
  category: ResourceCategory;
  type: ResourceType;
  imageUrl: string;
};

import ImgRoad from "../assets/road.jpg";
import ImgAero from "../assets/aero.jpg";
import ImgBoat from "../assets/boat.jpg";
import ImgServices from "../assets/services_img.jpg";
import ImgDoor from "../assets/door.jpg";
import ImgEcom from "../assets/ecom.jpg";

const ALL_CATEGORIES: Array<"All" | ResourceCategory> = [
  "All",
  "Technology",
  "Sustainability",
  "Operations",
  "Strategy",
  "Compliance",
  "E-Commerce",
  "Specialized",
  "Industry",
  "Guides",
];

const ALL_TYPES: Array<"All" | ResourceType> = [
  "All",
  "Article",
  "Guide",
  "Whitepaper",
  "Case Study",
];

const RESOURCES: ResourceItem[] = [
  {
    id: "ai-ml-logistics",
    title: "The Future of Freight: AI and Machine Learning in Logistics",
    excerpt:
      "Discover how artificial intelligence is transforming routing, forecasting, and last-mile efficiency across global supply chains.",
    author: "Sarah Johnson",
    readTimeMinutes: 8,
    category: "Technology",
    type: "Article",
    imageUrl: ImgRoad,
  },
  {
    id: "sustainable-shipping-carbon",
    title: "Sustainable Shipping: Reducing Your Carbon Footprint",
    excerpt:
      "Practical steps to cut emissions with modal mix optimization, packaging improvements, and smarter consolidation strategies.",
    author: "Michael Chen",
    readTimeMinutes: 6,
    category: "Sustainability",
    type: "Guide",
    imageUrl: ImgAero,
  },
  {
    id: "global-trade-trends-2026",
    title: "Global Trade Trends: What to Expect in 2026",
    excerpt:
      "An overview of shifting trade lanes, capacity outlook, port constraints, and how to plan for volatility.",
    author: "Emily Davis",
    readTimeMinutes: 10,
    category: "Industry",
    type: "Whitepaper",
    imageUrl: ImgBoat,
  },
  {
    id: "last-mile-innovations",
    title: "Last-Mile Delivery: Innovations Transforming the Industry",
    excerpt:
      "From micro-fulfillment to route automation, learn what’s working right now to improve delivery speed and customer satisfaction.",
    author: "Robert Wilson",
    readTimeMinutes: 7,
    category: "Operations",
    type: "Article",
    imageUrl: ImgServices,
  },
  {
    id: "supply-chain-resilience",
    title: "Supply Chain Resilience: Lessons from Recent Disruptions",
    excerpt:
      "How leading teams build resilient supply chains through risk mapping, buffers, multi-sourcing, and scenario planning.",
    author: "Lisa Anderson",
    readTimeMinutes: 9,
    category: "Strategy",
    type: "Case Study",
    imageUrl: ImgDoor,
  },
  {
    id: "customs-compliance-guide",
    title: "Customs Compliance: A Complete Guide for Importers",
    excerpt:
      "Navigate HS classification, documentation, duties, and audits with a practical checklist you can adopt in a day.",
    author: "David Kim",
    readTimeMinutes: 12,
    category: "Compliance",
    type: "Guide",
    imageUrl: ImgEcom,
  },
];

function typeIcon(resourceType: ResourceType) {
  switch (resourceType) {
    case "Article":
      return <FileText className="h-4 w-4" />;
    case "Guide":
      return <BookOpen className="h-4 w-4" />;
    case "Whitepaper":
      return <Download className="h-4 w-4" />;
    case "Case Study":
      return <Sparkles className="h-4 w-4" />;
    default:
      return null;
  }
}

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<
    "All" | ResourceCategory
  >("All");
  const [activeType, setActiveType] = useState<"All" | ResourceType>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory)
        return false;
      if (activeType !== "All" && item.type !== activeType) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, activeType, query]);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: "hsl(var(--card) / 0.7)",
              border: "1px solid var(--border-soft)",
              color: "var(--accent-teal)",
            }}
          >
            <Tag className="h-4 w-4" />
            Logistics
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            Logistics <span style={{ color: "var(--accent-teal)" }}>Knowledge Hub</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Access industry insights, best practices, whitepapers, and guides to optimize
            your supply chain operations.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "hsl(var(--card) / 0.6)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Search className="h-5 w-5" style={{ color: "var(--text-tertiary)" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources…"
                className="w-full bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>
        </section>

        {/* Category pills */}
        <section className="pb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {ALL_CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition"
                  style={{
                    background: active
                      ? "hsl(var(--primary))"
                      : "hsl(var(--card) / 0.55)",
                    color: active
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--foreground) / 0.9)",
                    border: active
                      ? "1px solid transparent"
                      : "1px solid var(--border-soft)",
                    boxShadow: active ? "var(--glow-primary)" : undefined,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Type row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {ALL_TYPES.map((t) => {
              const active = t === activeType;
              const isAll = t === "All";
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition"
                  style={{
                    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
                  }}
                >
                  {isAll ? (
                    <span
                      className="rounded-xl px-4 py-2"
                      style={{
                        background: active
                          ? "hsl(var(--card) / 0.75)"
                          : "hsl(var(--card) / 0.45)",
                        border: "1px solid var(--border-soft)",
                        color: active ? "var(--text-primary)" : "var(--text-secondary)",
                      }}
                    >
                      All Types
                    </span>
                  ) : (
                    <>
                      <span style={{ color: "var(--text-tertiary)" }}>
                        {typeIcon(t)}
                      </span>
                      <span>{t}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Cards */}
        <section className="pb-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: "hsl(var(--card) / 0.7)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--accent-sky)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: "hsl(var(--card) / 0.7)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--accent-amber)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-lg font-bold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item.excerpt}
                  </p>

                  <div
                    className="mt-4 flex items-center justify-between text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <span>{item.author}</span>
                    <span>{item.readTimeMinutes} min read</span>
                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl px-4 py-2 text-sm font-semibold transition"
                    style={{
                      border: "1px solid var(--border-soft)",
                      background: "hsl(var(--background) / 0.35)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mx-auto mt-10 max-w-xl text-center">
              <p style={{ color: "var(--text-secondary)" }}>
                No resources match your filters.
              </p>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="pb-20">
          <div
            className="mx-auto max-w-4xl rounded-3xl p-8 sm:p-12 text-center"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold header"
              style={{ color: "var(--text-primary)" }}
            >
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
              Get the latest logistics insights, industry news, and exclusive content delivered
              to your inbox.
            </p>

            <form
              className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) return;
                setSubscribed(true);
              }}
            >
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-2xl px-5 py-4 outline-none"
                style={{
                  background: "hsl(var(--background) / 0.35)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                type="submit"
                className="rounded-2xl px-7 py-4 text-sm font-bold"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "var(--glow-primary)",
                }}
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="mt-4 text-sm" style={{ color: "var(--success)" }}>
                Subscribed! (Demo only — no email sent.)
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
