import React from "react";
import { Bell, Globe, Headset, LineChart, MapPin, ShieldCheck, Truck, Zap } from "lucide-react";

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconFg: string;
};

export default function FeaturesSection() {
  const highlights: FeatureCard[] = [
    {
      title: "Proactive Alerts",
      description: "Get notified before small issues become big delays.",
      icon: Bell,
      iconBg: "hsl(var(--info) / 0.14)",
      iconFg: "hsl(var(--info))",
    },
    {
      title: "Express Delivery",
      description: "Fast lanes and optimized routes for urgent freight.",
      icon: Truck,
      iconBg: "hsl(var(--warning) / 0.14)",
      iconFg: "hsl(var(--warning))",
    },
    {
      title: "Global Network",
      description: "Ship across borders with a trusted carrier ecosystem.",
      icon: Globe,
      iconBg: "hsl(var(--primary) / 0.12)",
      iconFg: "hsl(var(--primary))",
    },
    {
      title: "24/7 Support",
      description: "Always-on help from logistics specialists.",
      icon: Headset,
      iconBg: "hsl(var(--success) / 0.14)",
      iconFg: "hsl(var(--success))",
    },
  ];

  const mainFeatures: FeatureCard[] = [
    {
      title: "Real-Time Tracking",
      description: "Track every milestone with live location updates.",
      icon: MapPin,
      iconBg: "hsl(var(--info) / 0.10)",
      iconFg: "hsl(var(--info))",
    },
    {
      title: "Instant Quotes",
      description: "Generate accurate pricing in seconds — not hours.",
      icon: Zap,
      iconBg: "hsl(var(--warning) / 0.14)",
      iconFg: "hsl(var(--warning))",
    },
    {
      title: "Secure Handling",
      description: "Best-in-class security and compliance baked in.",
      icon: ShieldCheck,
      iconBg: "hsl(var(--success) / 0.14)",
      iconFg: "hsl(var(--success))",
    },
    {
      title: "Smart Analytics",
      description: "Identify savings, bottlenecks, and carrier performance.",
      icon: LineChart,
      iconBg: "hsl(var(--primary) / 0.12)",
      iconFg: "hsl(var(--primary))",
    },
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((f) => (
            <div key={f.title} className="rounded-2xl p-6" style={cardStyle}>
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

              <div className="mt-6 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                {f.title}
              </div>
              <div className="mt-2" style={{ color: "var(--text-tertiary)" }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl text-center">
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

          <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            A complete logistics platform designed for modern businesses. Streamline operations, reduce costs,
            and delight your customers.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mainFeatures.map((f) => (
            <div key={f.title} className="rounded-2xl p-6" style={cardStyle}>
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

              <div className="mt-6 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
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
