import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import {
  SUPPORT_ARTICLES,
  getSupportArticleById,
} from "../data/supportArticles";

function estimateReadingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
}

const SupportArticle = () => {
  const { id } = useParams();

  const article = useMemo(() => getSupportArticleById(id), [id]);

  const readingTime = useMemo(() => {
    if (!article) return 1;
    const combined = [
      article.title,
      article.summary,
      ...article.sections.flatMap((s) => [s.title, ...s.body, ...(s.bullets ?? [])]),
    ].join(" ");
    return estimateReadingTimeMinutes(combined);
  }, [article]);

  const related = useMemo(() => {
    if (!article) return [];
    return SUPPORT_ARTICLES.filter(
      (a) => a.id !== article.id && a.categoryId === article.categoryId,
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 pt-14 pb-12">
          <div className="flex items-center justify-between gap-4">
            <NavLink
              to="/support"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
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

            {article?.cta ? (
              <NavLink
                to={article.cta.to}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--accent-teal)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {article.cta.label}
                <ExternalLink className="h-4 w-4" />
              </NavLink>
            ) : null}
          </div>

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
                {article.summary}
              </motion.p>

              <div
                className="mt-6 flex flex-wrap items-center gap-4 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Updated {new Date(article.lastUpdated).toLocaleDateString("en-NG")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </span>
              </div>
            </>
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
            className="overflow-hidden rounded-2xl"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="px-6 sm:px-10 py-10">
              {article.sections.map((section) => (
                <section key={section.title} className="mb-10 last:mb-0">
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.title}
                  </h2>

                  <div className="mt-3 space-y-3" style={{ color: "var(--text-secondary)" }}>
                    {section.body.map((p, idx) => (
                      <p key={idx} style={{ lineHeight: 1.8 }}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul
                      className="mt-4 list-disc pl-6 space-y-2"
                      style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
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
            <div
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Related articles
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((a) => (
                <NavLink
                  key={a.id}
                  to={`/support/articles/${a.id}`}
                  className="rounded-2xl p-5 transition"
                  style={{
                    background: "hsl(var(--card) / 0.55)",
                    border: "1px solid var(--border-soft)",
                    boxShadow: "var(--shadow-card)",
                    color: "var(--text-primary)",
                  }}
                >
                  <div className="font-semibold">{a.title}</div>
                  <div
                    className="mt-2 text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {a.summary}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}

        <Footer />
      </main>
    </div>
  );
};

export default SupportArticle;
