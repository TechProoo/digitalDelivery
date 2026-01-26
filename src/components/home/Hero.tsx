import { Box, Headset, MoveRight, Plane, Play, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const trackHref = isAuthenticated ? "/dashboard/track" : "/login";

  const stats = [
    {
      icon: Box,
      value: "5M+",
      label: "Shipments Delivered",
    },
    {
      icon: Truck,
      value: "150+",
      label: "Countries Served",
    },
    {
      icon: Plane,
      value: "99.8%",
      label: "Customer Satisfaction",
    },
    {
      icon: Headset,
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl pt-10 pb-14 sm:pt-14 sm:pb-18">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
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
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--accent-teal)" }}
              />
              <span className="text-sm font-semibold">
                Enterprise Logistics
              </span>
            </motion.div>
          </div>

          <motion.h1
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Maximize your logistics
            <br />
            <span style={{ color: "var(--accent-teal)" }}>
              savings &amp; efficiency
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Harness Digital Logistics's AI-led enterprise suite of solutions
            backed by industry data, technology, and hands-on partnership.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "var(--primary-foreground)",
                boxShadow: "var(--glow-primary)",
              }}
            >
              Quote &amp; Ship Today
              <MoveRight className="h-4 w-4" />
            </Link>

            <Link
              to={trackHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
              style={{
                background: "transparent",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Play className="h-4 w-4" />
              Track a Shipment
            </Link>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-6 text-center"
              style={{
                background: "hsl(var(--card) / 0.50)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
            >
              <div
                className="mx-auto grid place-items-center rounded-xl"
                style={{
                  width: 44,
                  height: 44,
                  background: "hsl(var(--background) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--accent-teal)",
                }}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className="mt-4 text-4xl font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
