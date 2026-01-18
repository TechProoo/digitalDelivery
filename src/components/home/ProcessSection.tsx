import React from "react";
import { CheckCircle2, ClipboardList, MapPin, Truck } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function ProcessSection() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Request a Quote",
      description: "Tell us what you’re shipping and where it’s going — get pricing instantly.",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Schedule Pickup",
      description: "Choose a pickup window and we’ll dispatch the best carrier for the job.",
      icon: Truck,
    },
    {
      number: "03",
      title: "Track in Real-Time",
      description: "Monitor your freight with live status updates and proactive notifications.",
      icon: MapPin,
    },
    {
      number: "04",
      title: "Delivery Confirmed",
      description: "Proof of delivery and full shipment history available in one place.",
      icon: CheckCircle2,
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
              Simple Process
            </div>
          </div>

          <h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            How Digital Logistics <span style={{ color: "var(--accent-teal)" }}>Works</span>
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            From quote to confirmation, your shipments move through a predictable, trackable workflow.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.number} className="rounded-2xl p-6" style={cardStyle}>
              <div className="flex items-start justify-between gap-4">
                <div
                  className="grid place-items-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: "hsl(var(--primary) / 0.12)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <s.icon className="h-7 w-7" />
                </div>

                <div
                  className="text-sm font-semibold"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {s.number}
                </div>
              </div>

              <div className="mt-6 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </div>
              <div className="mt-2" style={{ color: "var(--text-tertiary)" }}>
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
