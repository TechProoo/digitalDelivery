import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { getResourceById } from "../data/resources";
import { generateResourceBody } from "../lib/topicText";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Tag,
  User,
  FileText,
  BookOpen,
  Download,
  Sparkles,
} from "lucide-react";
import type { ResourceType } from "../data/resources";

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

const ResourceDetails = () => {
  const { id } = useParams();

  const resource = useMemo(() => {
    if (!id) return null;
    return getResourceById(id);
  }, [id]);

  const generated = useMemo(() => {
    if (!resource) return null;
    return generateResourceBody(resource);
  }, [resource]);

  if (!resource) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "hsl(var(--background))" }}
      >
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10 py-16">
          <div
            className="rounded-3xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <h1
              className="text-2xl sm:text-3xl font-bold header"
              style={{ color: "var(--text-primary)" }}
            >
              Resource not found
            </h1>
            <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
              That resource doesn't exist (or the link is broken).
            </p>
            <Link
              to="/resources"
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              style={{
                border: "1px solid var(--border-soft)",
                background: "hsl(var(--background) / 0.35)",
                color: "var(--text-primary)",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <section className="pt-10 pb-10">
          <div className="flex flex-col gap-6">
            <Link
              to="/resources"
              className="inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              style={{
                border: "1px solid var(--border-soft)",
                background: "hsl(var(--background) / 0.35)",
                color: "var(--text-primary)",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            {/* Hero Image Card - Separate from content */}
            <div
              className="overflow-hidden rounded-3xl"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-elevated)",
              }}
            >
              <div className="relative">
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="h-72 sm:h-72 w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15))",
                  }}
                />
                <div className="absolute left-6 top-6 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--card) / 0.7)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--accent-sky)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {resource.category}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--card) / 0.7)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--accent-amber)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {typeIcon(resource.type)}
                    {resource.type}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight header"
                    style={{ color: "white" }}
                  >
                    {resource.title}
                  </h1>
                  <p
                    className="mt-3 max-w-3xl"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {resource.excerpt}
                  </p>

                  <div
                    className="mt-5 flex flex-wrap items-center gap-4 text-sm"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {resource.author}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {resource.readTimeMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {resource.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid - Now outside overflow-hidden container */}
            <div className="grid gap-8 lg:grid-cols-3">
              <aside className="lg:col-span-1">
                <div
                  className="rounded-2xl p-5 sticky top-20"
                  style={{
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <h2
                    className="text-base font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Key takeaways
                  </h2>
                  <ul
                    className="mt-3 space-y-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {generated?.takeaways.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span style={{ color: "var(--accent-teal)" }}>•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/resources"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
                    style={{
                      border: "1px solid var(--border-soft)",
                      background: "hsl(var(--card) / 0.55)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Explore more resources
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>

              <article className="lg:col-span-2">
                <div className="space-y-8">
                  {generated?.sections.map((s) => (
                    <section key={s.heading}>
                      <h2
                        className="text-xl sm:text-2xl font-bold header"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {s.heading}
                      </h2>
                      <div className="mt-3 space-y-3">
                        {s.paragraphs.map((p, idx) => (
                          <p
                            key={`${s.heading}-${idx}`}
                            className="text-sm sm:text-base leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResourceDetails;
