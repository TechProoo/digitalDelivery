import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import {
  BookOpen,
  Clock,
  Download,
  FileText,
  Search,
  Sparkles,
  Tag,
  User,
  ArrowRight,
} from "lucide-react";

import {
  ALL_CATEGORIES,
  ALL_TYPES,
  RESOURCES,
  type ResourceType,
  type ResourceCategory,
} from "../data/resources";

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
  const [activeCategory, setActiveCategory] = useState<"All" | ResourceCategory>("All");
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
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: "hsl(var(--card) / 0.7)",
              border: "1px solid var(--border-soft)",
              color: "var(--accent-teal)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Tag className="h-4 w-4" />
            Logistics
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Logistics{" "}
            <span style={{ color: "var(--accent-teal)" }}>Knowledge Hub</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Access industry insights, best practices, whitepapers, and guides to
            optimize your supply chain operations.
          </motion.p>

          {/* Search */}
          <motion.div
            className="mx-auto mt-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "hsl(var(--card) / 0.6)",
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
                placeholder="Search resources…"
                className="w-full bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </motion.div>
        </section>

        {/* Category pills */}
        <section className="pb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {ALL_CATEGORIES.map((cat, index) => {
              const active = cat === activeCategory;
              return (
                <motion.button
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* Type row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {ALL_TYPES.map((t, index) => {
              const active = t === activeType;
              const isAll = t === "All";
              return (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition"
                  style={{
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-tertiary)",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + index * 0.08,
                    ease: "easeOut",
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
                        color: active
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
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
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Cards */}
        <section className="pb-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <motion.article
                key={item.id}
                className="overflow-hidden rounded-2xl"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                {item.cardVariant !== "text" && (
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
                )}

                <div className="p-6">
                  {item.cardVariant === "text" && (
                    <div className="mb-4 flex items-center gap-2">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: "hsl(var(--card) / 0.65)",
                          border: "1px solid var(--border-soft)",
                          color: "var(--accent-sky)",
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: "hsl(var(--card) / 0.65)",
                          border: "1px solid var(--border-soft)",
                          color: "var(--accent-amber)",
                        }}
                      >
                        {item.type}
                      </span>
                    </div>
                  )}

                  <h3
                    className="text-lg font-bold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.excerpt}
                  </p>

                  <div
                    className="mt-4 flex items-center justify-between text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {item.author}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {item.readTimeMinutes} min read
                    </span>
                  </div>

                  <Link
                    to={`/resources/${item.id}`}
                    className="mt-5 w-full rounded-xl px-4 py-2 text-sm font-semibold transition inline-flex items-center justify-center gap-2"
                    style={{
                      border: "1px solid var(--border-soft)",
                      background: "hsl(var(--background) / 0.35)",
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div
              className="mx-auto mt-10 max-w-xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p style={{ color: "var(--text-secondary)" }}>
                No resources match your filters.
              </p>
            </motion.div>
          )}
        </section>

        {/* Newsletter */}
        <section className="pb-20">
          <motion.div
            className="mx-auto max-w-4xl rounded-3xl p-8 sm:p-12 text-center"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-elevated)",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold header"
              style={{ color: "var(--text-primary)" }}
            >
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
              Get the latest logistics insights, industry news, and exclusive
              content delivered to your inbox.
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
              <motion.p
                className="mt-4 text-sm"
                style={{ color: "var(--success)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Subscribed! (Demo only — no email sent.)
              </motion.p>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
