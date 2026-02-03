import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { SUCCESS_STORIES, getSuccessStoryById } from "../data/successStories";

function estimateReadingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function SuccessStory() {
  const { id } = useParams();
  const story = useMemo(() => getSuccessStoryById(id), [id]);

  const readingTime = useMemo(() => {
    if (!story) return 1;
    const combined = [
      story.title,
      story.summary,
      ...story.sections.flatMap((s) => [
        s.title,
        ...s.body,
        ...(s.bullets ?? []),
      ]),
    ].join(" ");
    return estimateReadingTimeMinutes(combined);
  }, [story]);

  const related = useMemo(() => {
    if (!story) return [];
    return SUCCESS_STORIES.filter(
      (s) => s.id !== story.id && s.tag === story.tag,
    ).slice(0, 4);
  }, [story]);

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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 pt-14 pb-12">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </NavLink>

          {story ? (
            <>
              <motion.div
                className="mt-8 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--accent-teal)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {story.tag}
              </motion.div>

              <motion.h1
                className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight header"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {story.title}
              </motion.h1>

              <div className="mt-3" style={{ color: "var(--text-tertiary)" }}>
                {story.company}
              </div>

              <motion.p
                className="mt-4 text-base sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              >
                {story.summary}
              </motion.p>

              <div
                className="mt-6 flex flex-wrap items-center gap-4 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Updated{" "}
                  {new Date(story.lastUpdated).toLocaleDateString("en-NG")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </span>
              </div>

              <div
                className="mt-8 overflow-hidden rounded-3xl"
                style={{ border: "1px solid var(--border-soft)" }}
              >
                <img
                  src={story.image}
                  alt=""
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>
            </>
          ) : (
            <>
              <h1
                className="mt-8 text-3xl font-bold header"
                style={{ color: "var(--text-primary)" }}
              >
                Case study not found
              </h1>
              <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
                The story you’re looking for doesn’t exist.
              </p>
            </>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-12">
        {story ? (
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="px-6 sm:px-10 py-10">
              {story.sections.map((section) => (
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
            <div
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Related case studies
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((s) => (
                <NavLink
                  key={s.id}
                  to={`/success-stories/${s.id}`}
                  className="rounded-2xl p-5 transition"
                  style={{
                    background: "hsl(var(--card) / 0.55)",
                    border: "1px solid var(--border-soft)",
                    boxShadow: "var(--shadow-card)",
                    color: "var(--text-primary)",
                  }}
                >
                  <div className="font-semibold">{s.title}</div>
                  <div
                    className="mt-2 text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {s.summary}
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
}
