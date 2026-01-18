import React from "react";
import { ArrowRight, Plane, Ship, Truck } from "lucide-react";

const ServicesComponent = () => {
  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  const services = [
    {
      title: "Air Freight",
      description:
        "Express delivery across continents. Perfect for time-sensitive and high-value cargo requiring rapid transit.",
      bullets: [
        "Same-day dispatch",
        "Temperature-controlled options",
        "Customs clearance included",
      ],
      icon: Plane,
      tileBg: "linear-gradient(145deg, #0ea5e9, #2563eb)",
      featured: false,
    },
    {
      title: "Ground Freight",
      description:
        "Reliable land transportation with extensive network coverage. Cost-effective for domestic and regional deliveries.",
      bullets: ["Door-to-door service", "Real-time GPS tracking", "Flexible scheduling"],
      icon: Truck,
      tileBg: "linear-gradient(145deg, #f59e0b, #f97316)",
      featured: true,
    },
    {
      title: "Ocean Freight",
      description:
        "Global sea transport for large volume shipments. Economical solution for international trade.",
      bullets: ["FCL & LCL options", "Port-to-port service", "Container tracking"],
      icon: Ship,
      tileBg: "linear-gradient(145deg, #10b981, #06b6d4)",
      featured: false,
    },
  ] as const;

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
                color: "hsl(var(--accent))",
                backdropFilter: "blur(10px)",
              }}
            >
              Our Services
            </div>
          </div>

          <h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            Move Cargo <span style={{ color: "var(--accent-teal)" }}>Your Way</span>
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Choose from our comprehensive range of freight solutions. Whatever your needs, we have the
            perfect shipping option.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-3xl p-7 sm:p-8 transition-colors"
              style={{
                ...cardStyle,
                border: s.featured
                  ? "1px solid hsl(var(--primary) / 0.55)"
                  : "1px solid var(--border-soft)",
              }}
            >
              <div
                className="grid place-items-center rounded-2xl"
                style={{
                  width: 64,
                  height: 64,
                  background: s.tileBg,
                  boxShadow: "0 16px 34px rgba(0,0,0,0.45)",
                }}
              >
                <s.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mt-7 text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                {s.description}
              </p>

              <ul className="mt-7 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3" style={{ color: "var(--text-tertiary)" }}>
                    <span
                      className="inline-block rounded-full"
                      style={{ width: 6, height: 6, background: "hsl(var(--primary))" }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <button
                  className="group flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3 font-semibold"
                  style={{
                    background: "hsl(var(--background) / 0.45)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                  type="button"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;
