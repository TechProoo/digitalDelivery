import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

type Stat = {
  value: string;
  label: string;
};

function Counter({
  value,
  duration = 2,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  // Extract number from value (e.g., "5M+" -> 5, "99.8%" -> 99.8)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "");

  const rounded = useTransform(count, (latest) => {
    // If it's a decimal number, show one decimal place
    if (value.includes(".")) {
      return latest.toFixed(1) + suffix;
    }
    return Math.round(latest) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, { duration });
      return controls.stop;
    }
  }, [isInView, count, numericValue, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-4xl sm:text-5xl font-semibold tracking-tight"
      style={{ color: "var(--accent-teal)" }}
    >
      {rounded}
    </motion.div>
  );
}

export default function StatsStrip() {
  const stats: Stat[] = [
    { value: "5M+", label: "Shipments Delivered" },
    { value: "150+", label: "Countries Served" },
    { value: "99.8%", label: "On-Time Delivery Rate" },
    { value: "10K+", label: "Happy Customers" },
    { value: "50M", label: "Miles Covered" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section
      className="px-4 sm:px-6 lg:px-10"
      style={{ backgroundColor: "aliceblue" }}
    >
      <div className="mx-auto max-w-7xl py-10 sm:py-12">
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--foreground) / 0.55), hsl(var(--foreground) / 0.85))",
            border: "1px solid hsl(var(--primary-foreground) / 0.12)",
            boxShadow: "0 18px 50px hsl(var(--primary-foreground) / 0.12)",
            backdropFilter: "blur(18px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-48 -translate-x-1/2"
            style={{
              width: 900,
              background:
                "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent 70%)",
              filter: "blur(12px)",
            }}
          />

          <div className="relative grid grid-cols-2 gap-y-10 px-6 py-10 text-center sm:px-10 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s, index) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.08,
                  ease: "easeOut",
                }}
              >
                <Counter value={s.value} duration={2} />
                <motion.div
                  className="mt-3"
                  style={{ color: "hsl(var(--primary-foreground) / 0.70)" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.08,
                  }}
                >
                  {s.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
