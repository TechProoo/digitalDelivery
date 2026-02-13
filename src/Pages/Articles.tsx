import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from "../data/articles";

function formatDate(dateIso: string) {
  try {
    return new Date(dateIso).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateIso;
  }
}

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState<"All" | ArticleCategory>(
    "All",
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (activeCategory !== "All" && a.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [activeCategory, query]);

  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.55)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-14 pb-12">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              color: "var(--accent-teal)",
              backdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Tag className="h-4 w-4" />
            Resources
          </motion.div>

          <motion.h1
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Latest Updates &{" "}
            <span style={{ color: "var(--accent-teal)" }}>Insights</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-3xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
          >
            Deep dives, practical playbooks, and market notes — written to help
            you ship smarter, reduce exceptions, and keep customers happy.
          </motion.p>

          <motion.div
            className="mt-8 grid gap-4 lg:grid-cols-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "hsl(var(--card) / 0.60)",
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
                placeholder="Search articles…"
                className="w-full bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ARTICLE_CATEGORIES.map((cat) => {
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
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((a) => (
            <motion.article
              key={a.id}
              className="group overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1"
              style={cardStyle}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="relative h-52">
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.95)" }}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.76) 100%)",
                  }}
                />
                <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--card) / 0.7)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--accent-teal)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {a.category}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span
                    className="inline-flex items-center gap-2"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <Calendar className="h-4 w-4" />
                    {formatDate(a.date)}
                  </span>
                  <span style={{ color: "var(--text-tertiary)" }}>•</span>
                  <span
                    className="inline-flex items-center gap-2"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <Clock className="h-4 w-4" />
                    {a.readTimeMinutes} min read
                  </span>
                </div>

                <h3
                  className="mt-4 text-2xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {a.title}
                </h3>

                <p
                  className="mt-4 leading-relaxed"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {a.excerpt}
                </p>

                <div className="mt-7">
                  <NavLink
                    to={`/articles/${a.id}`}
                    className="inline-flex items-center gap-2 font-semibold"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </NavLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="mt-10 rounded-3xl p-8 text-center"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
              color: "var(--text-secondary)",
            }}
          >
            No articles match your search.
          </div>
        ) : null}

        <div className="mt-14">
          <Footer />
        </div>
      </main>
    </div>
  );
}
