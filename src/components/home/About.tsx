import type { ComponentType } from "react";
import React, { useMemo } from "react";
import {
  Eye,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cta from "./Cta";

type ValueCard = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconBg: string;
  iconFg: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function About() {
  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  const softPanelStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.45)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(14px)",
  };

  const sectionGlowStyle: React.CSSProperties = {
    background:
      "radial-gradient(900px 380px at 50% 0%, hsl(var(--primary) / 0.16), transparent 60%)",
    borderTop: "1px solid var(--border-soft)",
    borderBottom: "1px solid var(--border-soft)",
  };

  const experience: ValueCard[] = [
    {
      title: "Precision Pickups",
      description:
        "You no longer need to navigate traffic to reach a shipping hub or wait in long queues. Through our intuitive platform, you schedule a pickup at your convenience. We arrive at your doorstep—home, office, or warehouse—to begin the journey.",
      icon: Target,
      iconBg: "hsl(var(--primary) / 0.12)",
      iconFg: "hsl(var(--primary))",
    },
    {
      title: "Global Connectivity without Borders",
      description:
        "Logistics is a puzzle of borders, regulations, and carriers. At Digital Logistics, we solve that puzzle for you. Our network spans globally, ensuring that whether your destination is a major city or a remote town, we have a reliable path to get it there.",
      icon: Users,
      iconBg: "hsl(var(--accent) / 0.14)",
      iconFg: "hsl(var(--accent))",
    },
    {
      title: "Total Visibility & Live Updates",
      description:
        "The “black hole” of shipping is a thing of the past. Our dashboard provides real-time updates so you stay informed at every milestone—from pickup scan to final delivery confirmation.",
      icon: Eye,
      iconBg: "hsl(var(--info) / 0.14)",
      iconFg: "hsl(var(--info))",
    },
  ];

  const commitments: ValueCard[] = [
    {
      title: "Scalability for Every Scale",
      description:
        "We apply the same level of precision to a single document as we do to large-scale freight. If it matters to you, it’s a priority for us—always.",
      icon: Users,
      iconBg: "hsl(var(--accent) / 0.14)",
      iconFg: "hsl(var(--accent))",
    },
    {
      title: "Innovation-First Approach",
      description:
        "We use modern logistics software and analytics to optimize routes and reduce delays—improving delivery speed while supporting a more sustainable supply chain.",
      icon: Lightbulb,
      iconBg: "hsl(var(--primary) / 0.12)",
      iconFg: "hsl(var(--primary))",
    },
    {
      title: "Unwavering Reliability",
      description:
        "Trust is the currency of logistics. Our partners are vetted and our processes are accountable—so “seamless” isn’t marketing, it’s how we operate.",
      icon: ShieldCheck,
      iconBg: "hsl(var(--info) / 0.14)",
      iconFg: "hsl(var(--info))",
    },
  ];

  const stats = useMemo(
    () => [
      { label: "Pickup scheduling", value: "Fast" },
      { label: "Live tracking", value: "Real-time" },
      { label: "Support", value: "24/7" },
    ],
    [],
  );

  const timeline = useMemo(
    () => [
      { title: "Book", desc: "Create your delivery request in minutes." },
      {
        title: "Pickup",
        desc: "We collect from your location—home or office.",
      },
      { title: "Move", desc: "Track progress with live status updates." },
      { title: "Deliver", desc: "Delivered with confirmation at destination." },
    ],
    [],
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        {/* Decorative blobs */}
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
            className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.10)" }}
          />
        </div>

        <div className="px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl pt-12 pb-12 sm:pt-16 sm:pb-16 relative">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--accent-teal)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "var(--shadow-card)",
                }}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Sparkles className="h-4 w-4" />
                About Us: Digital Logistics
              </motion.div>

              <motion.h1
                className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              >
                Redefining the Horizon of{" "}
                <span style={{ color: "var(--accent-teal)" }}>
                  Global Delivery
                </span>
              </motion.h1>

              <motion.p
                className="mt-5 text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
              >
                In an era where the world is more connected yet more demanding
                than ever, Digital Logistics was born from a simple idea:
                shipping should be as fluid as the digital information we
                exchange every day.
              </motion.p>

              {/* Quick stats */}
              <motion.div
                className="mt-8 grid gap-3 sm:grid-cols-3"
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-4"
                    style={softPanelStyle}
                  >
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {s.label}
                    </div>
                    <div
                      className="mt-1 text-xl font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Timeline strip */}
              <motion.div
                className="mt-8 rounded-3xl p-5 sm:p-6"
                style={cardStyle}
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
              >
                <div className="grid gap-4 sm:grid-cols-4">
                  {timeline.map((t, idx) => (
                    <div key={t.title} className="text-left">
                      <div className="flex items-center gap-2">
                        <span
                          className="grid place-items-center rounded-full text-xs font-bold"
                          style={{
                            width: 26,
                            height: 26,
                            background: "hsl(var(--background) / 0.35)",
                            border: "1px solid hsl(var(--primary) / 0.25)",
                            color: "var(--accent-teal)",
                          }}
                        >
                          {idx + 1}
                        </span>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {t.title}
                        </div>
                      </div>
                      <div
                        className="mt-2 text-sm"
                        style={{
                          color: "var(--text-tertiary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {t.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO PANEL */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-10 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="rounded-3xl p-8 sm:p-10"
              style={cardStyle}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                We aren't just a transport company; we are a technology-driven
                logistics partner dedicated to removing friction, uncertainty,
                and complexity from global shipping.
              </p>
              <p
                className="mt-5 text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                From our inception, we set out to bridge the gap between “here”
                and “there” by merging heavy-duty physical infrastructure with a
                sophisticated digital interface.
              </p>
              <p
                className="mt-5 text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                Whether you are a business scaling to international markets or
                an individual sending a personal item to a loved one across an
                ocean, Digital Logistics provides the bridge that makes the
                world feel smaller and more accessible.
              </p>

              {/* subtle divider */}
              <div
                className="mt-8 h-px w-full"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.35), transparent)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="px-4 sm:px-6 lg:px-10" style={sectionGlowStyle}>
        <div className="mx-auto max-w-7xl py-12 sm:py-16">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-semibold header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            The Digital Logistics Experience
          </motion.h2>

          <p
            className="mx-auto mt-4 max-w-3xl text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            A smooth process from pickup to delivery—built around visibility,
            reliability, and speed.
          </p>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
            {experience.map((v, index) => (
              <motion.div
                key={v.title}
                className="group rounded-3xl p-7 transition"
                style={cardStyle}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="grid place-items-center rounded-2xl"
                    style={{
                      width: 56,
                      height: 56,
                      background: v.iconBg,
                      color: v.iconFg,
                      border: "1px solid hsl(var(--border) / 0.25)",
                    }}
                  >
                    <v.icon className="h-7 w-7" />
                  </div>

                  <div
                    aria-hidden
                    className="h-10 w-10 rounded-full grid place-items-center"
                    style={{
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                      color: "var(--accent-teal)",
                    }}
                  >
                    <span className="text-sm font-bold">+</span>
                  </div>
                </div>

                <div
                  className="mt-6 text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.title}
                </div>

                <div
                  className="mt-3"
                  style={{ color: "var(--text-tertiary)", lineHeight: 1.75 }}
                >
                  {v.description}
                </div>

                {/* accent line */}
                <div
                  className="mt-7 h-px w-full"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.35), transparent)",
                    opacity: 0.8,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-12 sm:py-16">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-semibold header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Our Core Commitments
          </motion.h2>

          <p
            className="mx-auto mt-4 max-w-3xl text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            The principles we refuse to compromise—no matter the distance, the
            package, or the destination.
          </p>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
            {commitments.map((v, index) => (
              <motion.div
                key={v.title}
                className="group rounded-3xl p-7 transition"
                style={{
                  ...cardStyle,
                  border: "1px solid hsl(var(--primary) / 0.18)",
                }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
              >
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: v.iconBg,
                    color: v.iconFg,
                    border: "1px solid hsl(var(--border) / 0.25)",
                  }}
                >
                  <v.icon className="h-7 w-7" />
                </div>

                <div
                  className="mt-6 text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.title}
                </div>

                <div
                  className="mt-3"
                  style={{ color: "var(--text-tertiary)", lineHeight: 1.75 }}
                >
                  {v.description}
                </div>

                <div
                  className="mt-7 h-px w-full"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.35), transparent)",
                    opacity: 0.8,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="px-4 sm:px-6 lg:px-10" style={sectionGlowStyle}>
        <div className="mx-auto max-w-7xl py-12 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="rounded-3xl p-8 sm:p-10"
              style={cardStyle}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3
                className="text-2xl sm:text-3xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Beyond the Dashboard: Our Vision for the Future
              </h3>

              <p
                className="mt-4 text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                The website you see today is just the beginning. Our vision is
                to become the invisible backbone of modern trade for everyday
                users—constantly improving our dashboard experience and
                expanding our logistics network so shipping never slows your
                growth or your connections.
              </p>

              <p
                className="mt-5 text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                Experience a world where logistics is no longer a chore, but a
                competitive advantage. At Digital Logistics, we don't just move
                boxes; we move your world forward.
              </p>

              <div
                className="mt-8 h-px w-full"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.35), transparent)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Cta />
      <Footer />
    </div>
  );
}
