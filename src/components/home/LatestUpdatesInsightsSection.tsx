import { ArrowRight, Calendar } from "lucide-react";

import AeroImg from "../../assets/aero.jpg";
import RoadImg from "../../assets/road.jpg";
import ServicesImg from "../../assets/services_img.jpg";

type Article = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href?: string;
};

export default function LatestUpdatesInsightsSection() {
  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  const articles: Article[] = [
    {
      category: "Industry Report",
      date: "Jan 15, 2026",
      title: "A Guide to Freight Trucking Rates in 2026",
      excerpt:
        "As we move into 2026, the freight market is showing signs of change. Both demand and...",
      image: RoadImg,
    },
    {
      category: "Technology",
      date: "Jan 12, 2026",
      title: "How AI is Transforming Supply Chain Visibility",
      excerpt:
        "Advanced machine learning algorithms are revolutionizing how companies track and opti...",
      image: AeroImg,
    },
    {
      category: "Market Update",
      date: "Jan 10, 2026",
      title: "Q4 2025 Insights and Recommendations",
      excerpt:
        "Our quarterly market update provides valuable insights to help shippers, carriers, and logistics...",
      image: ServicesImg,
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
                backdropFilter: "blur(10px)",
              }}
            >
              Resources
            </div>

            <h2
              className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
              style={{ color: "var(--text-primary)" }}
            >
              Latest Updates &{" "}
              <span style={{ color: "var(--accent-teal)" }}>Insights</span>
            </h2>

            <p
              className="mt-5 text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Stay informed with the latest logistics news, market trends, and
              industry best practices.
            </p>
          </div>

          <a
            href="https://swiftshipco.lovable.app/blog"
            target="_blank"
            rel="noreferrer"
            className="group mt-2 inline-flex items-center gap-2 font-semibold"
            style={{ color: "var(--accent-teal)" }}
          >
            <span>View all articles</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.title}
              className="group overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1"
              style={cardStyle}
            >
              <div className="relative h-48 sm:h-56">
                <img
                  src={a.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.95)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.72) 100%)",
                  }}
                />
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex items-center gap-3 text-sm">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    {a.category}
                  </span>
                  <span style={{ color: "var(--text-tertiary)" }}>•</span>
                  <span
                    className="inline-flex items-center gap-2"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <Calendar className="h-4 w-4" />
                    {a.date}
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

                {a.href && (
                  <div className="mt-7">
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-semibold"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      <span>Read more</span>
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
