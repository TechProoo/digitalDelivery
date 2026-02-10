import { useMemo, useState } from "react";
import {
  Boxes,
  Cpu,
  Globe,
  Laptop,
  Leaf,
  PackageSearch,
  Pill,
  Settings2,
  Sparkles,
  Train,
  Truck,
  Utensils,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "solutions" | "industries";

type Card = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconFg: string;
};

export default function SolutionsSection() {
  const [tab, setTab] = useState<TabKey>("solutions");

  const solutions: Card[] = useMemo(
    () => [
      {
        title: "TMS Platform",
        description: "Streamline operations end-to-end",
        icon: Laptop,
        iconBg: "hsl(var(--primary) / 0.12)",
        iconFg: "hsl(var(--primary))",
      },
      {
        title: "3PL & 4PL",
        description: "Managed logistics services",
        icon: Boxes,
        iconBg: "hsl(var(--success) / 0.14)",
        iconFg: "hsl(var(--success))",
      },
      {
        title: "Cross-Border",
        description: "International freight solutions",
        icon: Globe,
        iconBg: "hsl(var(--info) / 0.14)",
        iconFg: "hsl(var(--info))",
      },
      {
        title: "Intermodal",
        description: "Multi-mode optimization",
        icon: Train,
        iconBg: "hsl(var(--accent) / 0.14)",
        iconFg: "hsl(var(--accent))",
      },
      {
        title: "Over the Road",
        description: "Full truckload & LTL",
        icon: Truck,
        iconBg: "hsl(var(--warning) / 0.14)",
        iconFg: "hsl(var(--warning))",
      },
      {
        title: "End-to-End",
        description: "Complete supply chain",
        icon: Settings2,
        iconBg: "hsl(var(--muted-foreground) / 0.12)",
        iconFg: "hsl(var(--foreground) / 0.7)",
      },
      {
        title: "SMB Freight",
        description: "Small business solutions",
        icon: PackageSearch,
        iconBg: "hsl(var(--info) / 0.10)",
        iconFg: "hsl(var(--info))",
      },
      {
        title: "AI Technology",
        description: "Intelligent automation",
        icon: Cpu,
        iconBg: "hsl(var(--primary) / 0.10)",
        iconFg: "hsl(var(--primary))",
      },
    ],
    [],
  );

  const industries: Card[] = useMemo(
    () => [
      {
        title: "Retail",
        description: "E-commerce & omnichannel",
        icon: PackageSearch,
        iconBg: "rgba(236, 72, 153, 0.18)",
        iconFg: "rgba(236, 72, 153, 1)",
      },
      {
        title: "Manufacturing",
        description: "Just-in-time logistics",
        icon: Truck,
        iconBg: "rgba(249, 115, 22, 0.18)",
        iconFg: "rgba(249, 115, 22, 1)",
      },
      {
        title: "CPG",
        description: "Consumer packaged goods",
        icon: Globe,
        iconBg: "rgba(59, 130, 246, 0.18)",
        iconFg: "rgba(59, 130, 246, 1)",
      },
      {
        title: "Automotive",
        description: "OEM & aftermarket",
        icon: Settings2,
        iconBg: "rgba(139, 92, 246, 0.18)",
        iconFg: "rgba(139, 92, 246, 1)",
      },
      {
        title: "Chemical",
        description: "Hazmat compliant shipping",
        icon: Leaf,
        iconBg: "rgba(16, 185, 129, 0.18)",
        iconFg: "rgba(16, 185, 129, 1)",
      },
      {
        title: "Healthcare",
        description: "Temperature-controlled",
        icon: Pill,
        iconBg: "rgba(244, 63, 94, 0.18)",
        iconFg: "rgba(244, 63, 94, 1)",
      },
      {
        title: "Technology",
        description: "High-value goods",
        icon: Sparkles,
        iconBg: "rgba(99, 102, 241, 0.18)",
        iconFg: "rgba(99, 102, 241, 1)",
      },
      {
        title: "Food & Beverage",
        description: "Cold chain expertise",
        icon: Utensils,
        iconBg: "rgba(234, 179, 8, 0.18)",
        iconFg: "rgba(234, 179, 8, 1)",
      },
    ],
    [],
  );

  const cards = tab === "solutions" ? solutions : industries;

  return (
    <section className="px-4 sm:px-6 lg:px-10" id="solutions">
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              className="text-4xl sm:text-6xl font-semibold tracking-tight header"
              style={{ color: "var(--text-primary)" }}
            >
              Enterprise{" "}
              <span style={{ color: "var(--accent-teal)" }}>Solutions</span>
            </h2>
            <p
              className="mt-3 text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Comprehensive logistics solutions tailored to your industry needs.
            </p>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-1 rounded-2xl p-1 self-start"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => setTab("solutions")}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors"
              style={
                tab === "solutions"
                  ? {
                      background: "hsl(var(--primary))",
                      color: "var(--primary-foreground)",
                      boxShadow: "0 10px 24px -16px rgba(0,0,0,0.6)",
                    }
                  : { color: "var(--text-secondary)" }
              }
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => setTab("industries")}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors"
              style={
                tab === "industries"
                  ? {
                      background: "hsl(var(--primary))",
                      color: "var(--primary-foreground)",
                      boxShadow: "0 10px 24px -16px rgba(0,0,0,0.6)",
                    }
                  : { color: "var(--text-secondary)" }
              }
            >
              Industries
            </button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="wait">
            {cards.map((card, index) => (
              <motion.div
                key={`${tab}-${card.title}`}
                className="rounded-2xl p-6"
                style={{
                  background: "hsl(var(--card) / 0.50)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: card.iconBg,
                    color: card.iconFg,
                  }}
                >
                  <card.icon className="h-7 w-7" />
                </div>
                <div
                  className="mt-6 text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </div>
                <div className="mt-1" style={{ color: "var(--text-tertiary)" }}>
                  {card.description}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        >
          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-xl px-7 py-3 text-sm font-semibold"
            style={{
              background: "transparent",
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
              backdropFilter: "blur(12px)",
            }}
          >
            Explore all solutions
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
