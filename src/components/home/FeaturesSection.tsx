import {
  Bell,
  Bolt,
  Globe,
  Headset,
  LineChart,
  Shield,
  Timer,
  MapPin,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconFg: string;
};

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      title: "Real-Time Tracking",
      description:
        "Track every shipment with GPS precision. Get checkpoint updates as your cargo moves through our network.",
      icon: MapPin,
      iconBg: "hsl(var(--info) / 0.14)",
      iconFg: "hsl(var(--info))",
    },
    {
      title: "Instant Quotes",
      description:
        "Get competitive rates in seconds. Compare air, ground, and express options with transparent pricing.",
      icon: Timer,
      iconBg: "hsl(var(--warning) / 0.14)",
      iconFg: "hsl(var(--warning))",
    },
    {
      title: "Secure Handling",
      description:
        "End-to-end cargo protection with insurance options. Your freight is in safe hands from pickup to delivery.",
      icon: Shield,
      iconBg: "hsl(var(--success) / 0.14)",
      iconFg: "hsl(var(--success))",
    },
    {
      title: "Smart Analytics",
      description:
        "Powerful dashboard with insights on delivery performance, costs, and optimization opportunities.",
      icon: LineChart,
      iconBg: "hsl(var(--primary) / 0.12)",
      iconFg: "hsl(var(--primary))",
    },
    {
      title: "Proactive Alerts",
      description:
        "Stay informed with automated notifications for status changes, delays, and delivery confirmations.",
      icon: Bell,
      iconBg: "hsl(var(--destructive) / 0.12)",
      iconFg: "hsl(var(--destructive))",
    },
    {
      title: "Express Delivery",
      description:
        "Priority handling for time-sensitive shipments. Same-day and next-day options available.",
      icon: Bolt,
      iconBg: "hsl(var(--accent) / 0.14)",
      iconFg: "hsl(var(--accent))",
    },
    {
      title: "Global Network",
      description:
        "Access to 150+ countries with local expertise. Seamless cross-border logistics made simple.",
      icon: Globe,
      iconBg: "hsl(var(--info) / 0.12)",
      iconFg: "hsl(var(--info))",
    },
    {
      title: "24/7 Support",
      description:
        "Dedicated logistics experts available around the clock. We're here whenever you need us.",
      icon: Headset,
      iconBg: "hsl(var(--warning) / 0.10)",
      iconFg: "hsl(var(--warning))",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
                backdropFilter: "blur(10px)",
              }}
            >
              Powerful Features
            </div>
          </div>

          <h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            Everything You Need to <span style={{ color: "var(--accent-teal)" }}>Move</span>
            <br />
            <span style={{ color: "var(--accent-teal)" }}>Freight</span>
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A complete logistics platform designed for modern businesses. Streamline operations,
            reduce costs, and delight your customers.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6"
              style={{
                background: "hsl(var(--card) / 0.50)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="grid place-items-center rounded-2xl"
                style={{
                  width: 56,
                  height: 56,
                  background: f.iconBg,
                  color: f.iconFg,
                }}
              >
                <f.icon className="h-7 w-7" />
              </div>

              <div
                className="mt-6 text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {f.title}
              </div>
              <div className="mt-2" style={{ color: "var(--text-tertiary)" }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
