import type { ComponentType } from "react";
import { Eye, Leaf, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cta from "./Cta";

type Stat = {
  value: string;
  label: string;
};

type ValueCard = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconBg: string;
  iconFg: string;
};

type Leader = {
  name: string;
  role: string;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/g);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function About() {
  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  const stats: Stat[] = [
    { value: "2015", label: "Founded" },
    { value: "150+", label: "Countries" },
    { value: "10M+", label: "Shipments" },
    { value: "5,000+", label: "Employees" },
  ];

  const values: ValueCard[] = [
    {
      title: "Innovation",
      description: "Constantly pushing boundaries with AI and automation",
      icon: Lightbulb,
      iconBg: "hsl(var(--accent) / 0.14)",
      iconFg: "hsl(var(--accent))",
    },
    {
      title: "Reliability",
      description: "Delivering on our promises, every time",
      icon: ShieldCheck,
      iconBg: "hsl(var(--info) / 0.14)",
      iconFg: "hsl(var(--info))",
    },
    {
      title: "Sustainability",
      description: "Committed to eco-friendly logistics solutions",
      icon: Leaf,
      iconBg: "hsl(var(--success) / 0.14)",
      iconFg: "hsl(var(--success))",
    },
    {
      title: "Partnership",
      description: "Building lasting relationships with our clients",
      icon: Users,
      iconBg: "hsl(262 83% 60% / 0.20)",
      iconFg: "hsl(262 83% 60%)",
    },
  ];

  const leaders: Leader[] = [
    { name: "Amina Okafor", role: "Chief Executive Officer" },
    { name: "Daniel Hart", role: "Chief Operations Officer" },
    { name: "Sophia Nguyen", role: "Head of Product" },
    { name: "Michael Stone", role: "VP, Partnerships" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl pt-10 pb-10 sm:pt-14 sm:pb-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center">
              <motion.div
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--accent-teal)",
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                About Us
              </motion.div>
            </div>

            <motion.h1
              className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              About{" "}
              <span style={{ color: "var(--accent-teal)" }}>SwiftShip</span>
            </motion.h1>

            <motion.p
              className="mt-5 text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Leading the future of global freight logistics with innovation and
              excellence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl pb-10 sm:pb-14">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, index) => (
              <motion.div
                key={s.label}
                className="rounded-2xl p-7 text-center"
                style={cardStyle}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div
                  className="text-4xl sm:text-5xl font-semibold tracking-tight"
                  style={{ color: "var(--accent-teal)" }}
                >
                  {s.value}
                </div>
                <div className="mt-2" style={{ color: "var(--text-tertiary)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-10 sm:py-14">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              className="rounded-3xl p-8"
              style={cardStyle}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="grid place-items-center rounded-2xl"
                style={{
                  width: 56,
                  height: 56,
                  background: "hsl(var(--primary) / 0.12)",
                  color: "hsl(var(--primary))",
                }}
              >
                <Target className="h-7 w-7" />
              </div>

              <h3
                className="mt-6 text-2xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Our Mission
              </h3>
              <p
                className="mt-4 leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                To revolutionize global logistics by leveraging cutting-edge
                technology and unparalleled service to deliver seamless,
                sustainable, and cost-effective freight solutions for businesses
                of all sizes.
              </p>
            </motion.div>

            <motion.div
              className="rounded-3xl p-8"
              style={cardStyle}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div
                className="grid place-items-center rounded-2xl"
                style={{
                  width: 56,
                  height: 56,
                  background: "hsl(262 83% 60% / 0.20)",
                  color: "hsl(262 83% 60%)",
                }}
              >
                <Eye className="h-7 w-7" />
              </div>

              <h3
                className="mt-6 text-2xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Our Vision
              </h3>
              <p
                className="mt-4 leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                To be the world's most trusted and innovative logistics partner,
                setting new standards in efficiency, reliability, and customer
                experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-10 sm:py-14">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-semibold header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Our Values
          </motion.h2>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, index) => (
              <motion.div
                key={v.title}
                className="rounded-3xl p-7"
                style={cardStyle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: v.iconBg,
                    color: v.iconFg,
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
                <div className="mt-3" style={{ color: "var(--text-tertiary)" }}>
                  {v.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-10 sm:py-14">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-semibold header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Leadership Team
          </motion.h2>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l, index) => (
              <motion.article
                key={l.name}
                className="overflow-hidden rounded-3xl"
                style={cardStyle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div
                  className="h-40"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(17, 207, 220, 0.25), rgba(0,0,0,0) 62%), radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.16), rgba(0,0,0,0) 58%), linear-gradient(135deg, rgba(9, 20, 28, 0.95), rgba(10, 34, 44, 0.75))",
                    borderBottom: "1px solid var(--border-soft)",
                  }}
                />

                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid place-items-center rounded-2xl text-sm font-semibold"
                      style={{
                        width: 44,
                        height: 44,
                        background: "hsl(var(--background) / 0.55)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--accent-teal)",
                      }}
                    >
                      {initials(l.name)}
                    </div>
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {l.name}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {l.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Cta />
      <Footer />
    </div>
  );
}
