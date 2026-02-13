import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { SUCCESS_STORIES } from "../../data/successStories";

function MetricItem({
  icon: Icon,
  value,
  label,
}: (typeof SUCCESS_STORIES)[number]["metrics"][number]): ReactNode {
  return (
    <div className="flex items-start gap-3">
      <span style={{ color: "var(--accent-teal)" }}>
        <Icon className="mt-0.5 h-5 w-5" />
      </span>
      <div>
        <div
          className="text-xl font-semibold"
          style={{ color: "hsl(var(--primary-foreground))" }}
        >
          {value}
        </div>
        <div
          className="text-sm"
          style={{ color: "hsl(var(--primary-foreground) / 0.70)" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function SuccessStoriesSection() {
  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--foreground) / 0.70)",
    border: "1px solid hsl(var(--primary-foreground) / 0.12)",
    boxShadow: "0 14px 38px hsl(var(--primary-foreground) / 0.12)",
    backdropFilter: "blur(12px)",
  };

  const stories = SUCCESS_STORIES;

  return (
    <section
      className="px-4 sm:px-6 lg:px-10"
      style={{
        background: "linear-gradient(180deg, aliceblue 0%, aliceblue 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <motion.div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "hsl(var(--foreground) / 0.65)",
                border: "1px solid hsl(var(--primary-foreground) / 0.12)",
                color: "hsl(var(--primary-foreground))",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Success Stories
            </motion.div>
          </div>

          <motion.h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "hsl(var(--primary-foreground))" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            See How{" "}
            <span style={{ color: "var(--accent-teal)" }}>
              Industry Leaders
            </span>
            <br />
            Succeed
          </motion.h2>

          <motion.p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "hsl(var(--primary-foreground) / 0.78)" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Discover how enterprises across industries are transforming their
            logistics operations with Digital Delivery.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              className="overflow-hidden rounded-3xl"
              style={cardStyle}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.15,
                ease: "easeOut",
              }}
            >
              <div className="relative h-44 sm:h-52">
                <img
                  src={story.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.95)" }}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)",
                  }}
                />

                <div className="absolute bottom-4 left-4">
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                    style={{
                      background: "hsl(var(--foreground) / 0.65)",
                      border: "1px solid hsl(var(--primary-foreground) / 0.12)",
                      color: "var(--accent-teal)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {story.tag}
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <div
                  className="text-sm"
                  style={{ color: "hsl(var(--primary-foreground) / 0.70)" }}
                >
                  {story.company}
                </div>

                <h3
                  className="mt-3 text-2xl font-semibold"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  {story.title}
                </h3>

                <p
                  className="mt-4 leading-relaxed"
                  style={{ color: "hsl(var(--primary-foreground) / 0.70)" }}
                >
                  {story.summary}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <MetricItem {...story.metrics[0]} />
                  <MetricItem {...story.metrics[1]} />
                </div>

                <div className="mt-8">
                  <NavLink
                    to={`/success-stories/${story.id}`}
                    className="group inline-flex items-center gap-2 font-semibold"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    <span>Read case study</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </NavLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
