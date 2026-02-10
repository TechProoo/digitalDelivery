import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Search,
  ArrowUpDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { SUPPORT_ARTICLES } from "../data/supportArticles";
import { getSupportCategoryById } from "../data/supportCategories";

type SortMode = "newest" | "oldest" | "title";

const SupportCategoryPage = () => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");

  const category = useMemo(() => getSupportCategoryById(id), [id]);

  const articlesBase = useMemo(() => {
    if (!category) return [];
    return SUPPORT_ARTICLES.filter((a) => a.categoryId === category.id);
  }, [category]);

  const articles = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = !q
      ? articlesBase
      : articlesBase.filter((a) =>
          [a.title, a.summary].some((v) => v.toLowerCase().includes(q)),
        );

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const diff = Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated);
      return sort === "newest" ? diff : -diff;
    });

    return sorted;
  }, [articlesBase, query, sort]);

  const latestDate = useMemo(() => {
    if (!articlesBase.length) return null;
    const latest = [...articlesBase].sort(
      (a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated),
    )[0];
    return latest?.lastUpdated ?? null;
  }, [articlesBase]);

  const sectionCardStyle = {
    background: "hsl(var(--card) / 0.55)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(10px)",
  } as const;

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
        {/* Decorative glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.16)" }}
          />
          <div
            className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "hsl(var(--accent-teal) / 0.12)" }}
          />
          <div
            className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.10)" }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 pt-14 pb-12 relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <NavLink
              to="/support"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Support
            </NavLink>

            {category ? (
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                  style={{
                    background: "hsl(var(--card) / 0.65)",
                    border: "1px solid var(--border-soft)",
                    color: category.accent,
                    boxShadow: "var(--shadow-card)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  {articlesBase.length} article
                  {articlesBase.length === 1 ? "" : "s"}
                </span>

                {latestDate && (
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--card) / 0.65)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-tertiary)",
                      boxShadow: "var(--shadow-card)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Calendar className="h-4 w-4" />
                    Latest: {new Date(latestDate).toLocaleDateString("en-NG")}
                  </span>
                )}
              </div>
            ) : null}
          </div>

          {category ? (
            <>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 52,
                    height: 52,
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                    color: category.accent,
                  }}
                  aria-hidden="true"
                >
                  {category.icon}
                </div>

                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight header"
                  style={{ color: "var(--text-primary)" }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {category.title}
                </motion.h1>
              </div>

              <motion.p
                className="mt-4 text-base sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              >
                {category.description}
              </motion.p>

              {/* Search + Sort */}
              <motion.div
                className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              >
                <div
                  className="flex items-center gap-3 rounded-2xl px-5 py-4"
                  style={{
                    ...sectionCardStyle,
                    border: "1px solid hsl(var(--primary) / 0.25)",
                  }}
                >
                  <Search
                    className="h-5 w-5"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search in ${category.title}...`}
                    className="w-full bg-transparent outline-none text-sm sm:text-base"
                    style={{ color: "var(--text-primary)" }}
                    aria-label="Search category articles"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="rounded-xl px-3 py-2 text-xs font-semibold transition"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSort((s) =>
                      s === "newest"
                        ? "oldest"
                        : s === "oldest"
                          ? "title"
                          : "newest",
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition"
                  style={{
                    ...sectionCardStyle,
                    color: "var(--text-primary)",
                  }}
                  aria-label="Change sorting"
                >
                  <ArrowUpDown
                    className="h-4 w-4"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  {sort === "newest"
                    ? "Newest"
                    : sort === "oldest"
                      ? "Oldest"
                      : "Title"}
                </button>
              </motion.div>

              {/* Results line */}
              <div
                className="mt-3 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                Showing{" "}
                <span style={{ color: "var(--text-primary)" }}>
                  {articles.length}
                </span>{" "}
                result{articles.length === 1 ? "" : "s"}
                {query ? (
                  <>
                    {" "}
                    for “
                    <span style={{ color: "var(--text-primary)" }}>
                      {query}
                    </span>
                    ”
                  </>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <h1
                className="mt-8 text-3xl font-bold header"
                style={{ color: "var(--text-primary)" }}
              >
                Category not found
              </h1>
              <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
                The category you’re looking for doesn’t exist.
              </p>

              <div className="mt-6">
                <NavLink
                  to="/support"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition"
                  style={{
                    background: "hsl(var(--primary) / 0.12)",
                    border: "1px solid hsl(var(--primary) / 0.25)",
                    color: "var(--text-primary)",
                  }}
                >
                  Go to Support Home
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </div>
            </>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-12">
        {category ? (
          articles.length ? (
            <div className="grid gap-4">
              <AnimatePresence>
                {articles.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(i * 0.03, 0.18),
                    }}
                  >
                    <NavLink
                      to={`/support/articles/${a.id}`}
                      className="block rounded-2xl p-6 transition"
                      style={{
                        ...sectionCardStyle,
                        color: "var(--text-primary)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-lg font-semibold">{a.title}</div>
                          <div
                            className="mt-2 text-sm"
                            style={{
                              color: "var(--text-tertiary)",
                              lineHeight: 1.7,
                            }}
                          >
                            {a.summary}
                          </div>

                          <div
                            className="mt-4 inline-flex items-center gap-2 text-xs"
                            style={{ color: "var(--text-tertiary)" }}
                          >
                            <Calendar className="h-4 w-4" />
                            Updated{" "}
                            {new Date(a.lastUpdated).toLocaleDateString(
                              "en-NG",
                            )}
                          </div>
                        </div>

                        <span
                          className="grid place-items-center rounded-full shrink-0"
                          style={{
                            width: 40,
                            height: 40,
                            background: "hsl(var(--background) / 0.35)",
                            border: "1px solid hsl(var(--primary) / 0.25)",
                            color: "var(--accent-teal)",
                          }}
                          aria-hidden="true"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>

                      {/* subtle bottom glow */}
                      <div
                        aria-hidden
                        className="mt-6 h-px w-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${category.accent}33, transparent)`,
                          opacity: 0.9,
                        }}
                      />
                    </NavLink>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div
              className="rounded-2xl p-10 text-center"
              style={sectionCardStyle}
            >
              <div
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                No articles yet
              </div>
              <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
                We’re still building content for this category. Check back soon
                or browse other topics.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <NavLink
                  to="/support"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition"
                  style={{
                    background: "hsl(var(--primary) / 0.12)",
                    border: "1px solid hsl(var(--primary) / 0.25)",
                    color: "var(--text-primary)",
                  }}
                >
                  Browse other categories
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </div>
            </div>
          )
        ) : null}

        <Footer />
      </main>
    </div>
  );
};

export default SupportCategoryPage;
