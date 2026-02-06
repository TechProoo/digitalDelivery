import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import { ARTICLES, getArticleById } from "../data/articles";

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

export default function Article() {
  const { id } = useParams();

  const article = useMemo(() => getArticleById(id), [id]);

  const related = useMemo(() => {
    if (!article) return [];
    return ARTICLES.filter(
      (a) => a.id !== article.id && a.category === article.category,
    ).slice(0, 4);
  }, [article]);

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar />

      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 pt-14 pb-10">
          <NavLink
            to="/articles"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </NavLink>

          {article ? (
            <>
              <motion.h1
                className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight header"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {article.title}
              </motion.h1>

              <motion.p
                className="mt-4 text-base sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              >
                {article.excerpt}
              </motion.p>

              <div
                className="mt-6 flex flex-wrap items-center gap-4 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTimeMinutes} min read
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "hsl(var(--card) / 0.55)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--accent-teal)",
                  }}
                >
                  {article.category}
                </span>
              </div>
            </
            >
          ) : (
            <>
              <h1
                className="mt-8 text-3xl font-bold header"
                style={{ color: "var(--text-primary)" }}
              >
                Article not found
              </h1>
              <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
                The article you’re looking for doesn’t exist.
              </p>
            </>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-12">
        {article ? (
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="relative h-64 sm:h-72">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.12))",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div
                  className="text-sm font-semibold"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  By {article.author}
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-10 py-10">
              {article.sections.map((section) => (
                <section key={section.title} className="mb-10 last:mb-0">
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.title}
                  </h2>

                  <div
                    className="mt-3 space-y-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {section.body.map((p, idx) => (
                      <p key={idx} style={{ lineHeight: 1.8 }}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul
                      className="mt-4 list-disc pl-6 space-y-2"
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        ) : null}

        {related.length ? (
          <div className="mt-12">
            <div className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Related articles
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((a) => (
                <NavLink
                  key={a.id}
                  to={`/articles/${a.id}`}
                  className="rounded-2xl p-5 transition"
                  style={{
                    background: "hsl(var(--card) / 0.55)",
                    border: "1px solid var(--border-soft)",
                    boxShadow: "var(--shadow-card)",
                    color: "var(--text-primary)",
                  }}
                >
                  <div className="font-semibold">{a.title}</div>
                  <div className="mt-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
                    {a.excerpt}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-14">
          <Footer />
        </div>
      </main>
    </div>
  );
}
