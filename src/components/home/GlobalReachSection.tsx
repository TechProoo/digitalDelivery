import type { ComponentType } from "react";
import { Globe, MapPin, Truck, Users } from "lucide-react";
import { motion } from "framer-motion";

type MiniStat = {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
};

export default function GlobalReachSection() {
  const miniStats: MiniStat[] = [
    { icon: Globe, value: "150+", label: "Countries Served" },
    { icon: MapPin, value: "500+", label: "Distribution Centers" },
    { icon: Truck, value: "50K+", label: "Active Carriers" },
    { icon: Users, value: "10M+", label: "Shipments Annually" },
  ];

  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <motion.div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Global Reach
            </motion.div>

            <motion.h2
              className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              We Power One of the
              <br />
              <span style={{ color: "var(--accent-teal)" }}>
                Largest Networks
              </span>{" "}
              in the
              <br />
              World
            </motion.h2>

            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Our extensive global network connects shippers with carriers
              across every continent, providing unmatched capacity and
              flexibility for your logistics needs.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {miniStats.map((s, index) => (
                <motion.div
                  key={s.label}
                  className="flex items-center gap-4 rounded-2xl p-5"
                  style={cardStyle}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="grid place-items-center rounded-2xl"
                    style={{
                      width: 48,
                      height: 48,
                      background: "hsl(var(--primary) / 0.12)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>

                  <div>
                    <div
                      className="text-2xl font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right globe */}
          <motion.div
            className="relative mx-auto w-full max-w-l"
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative aspect-square">
              {/* Rings */}
              <div className="absolute inset-0 globe-ring-1" />
              <div className="absolute inset-0 globe-ring-2" />
              <div className="absolute inset-0 globe-ring-3" />

              {/* Globe body */}
              <div className="absolute inset-8 globe-breathe">
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(17, 207, 220, 0.22), rgba(0,0,0,0.0) 55%), radial-gradient(circle at 70% 65%, rgba(245, 158, 11, 0.16), rgba(0,0,0,0.0) 58%), linear-gradient(135deg, rgba(9, 20, 28, 0.95), rgba(10, 34, 44, 0.75))",
                    border: "1px solid hsl(var(--primary) / 0.20)",
                    boxShadow: "0 50px 120px rgba(0,0,0,0.65)",
                    backdropFilter: "blur(10px)",
                  }}
                />

                {/* Center globe mark */}
                <div className="absolute inset-0 grid place-items-center">
                  <svg
                    width="180"
                    height="180"
                    viewBox="0 0 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ opacity: 0.9 }}
                  >
                    <circle
                      cx="90"
                      cy="90"
                      r="46"
                      stroke="hsl(var(--primary) / 0.65)"
                      strokeWidth="8"
                    />
                    <path
                      d="M44 90H136"
                      stroke="hsl(var(--primary) / 0.65)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M90 44c18 10 30 26 30 46s-12 36-30 46c-18-10-30-26-30-46s12-36 30-46Z"
                      stroke="hsl(var(--primary) / 0.65)"
                      strokeWidth="8"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Floating dots */}
                <div
                  className="absolute left-[18%] top-[62%] h-3 w-3 rounded-full globe-dot"
                  style={{ background: "hsl(var(--primary))" }}
                />
                <div
                  className="absolute left-[30%] top-[52%] h-2 w-2 rounded-full globe-dot"
                  style={{ background: "hsl(var(--primary))", opacity: 0.8 }}
                />
                <div
                  className="absolute left-[44%] top-[40%] h-2.5 w-2.5 rounded-full globe-dot"
                  style={{ background: "hsl(var(--primary))", opacity: 0.7 }}
                />
                <div
                  className="absolute left-[62%] top-[70%] h-4 w-4 rounded-full globe-dot"
                  style={{ background: "hsl(var(--primary))", opacity: 0.75 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
