import React from "react";
import { CheckCircle2, ClipboardList, MapPin, Truck } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tileBg: string;
};

export default function ProcessSection() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Request a Quote",
      description: "Tell us what you’re shipping and where it’s going — get pricing instantly.",
      icon: ClipboardList,
      tileBg: "linear-gradient(145deg, #0ea5e9, #2563eb)",
    },
    {
      number: "02",
      title: "Schedule Pickup",
      description: "Choose a pickup window and we’ll dispatch the best carrier for the job.",
      icon: Truck,
      tileBg: "linear-gradient(145deg, #f59e0b, #f97316)",
    },
    {
      number: "03",
      title: "Track in Real-Time",
      description: "Monitor your freight with live status updates and proactive notifications.",
      icon: MapPin,
      tileBg: "linear-gradient(145deg, #10b981, #06b6d4)",
    },
    {
      number: "04",
      title: "Delivery Confirmed",
      description: "Proof of delivery and full shipment history available in one place.",
      icon: CheckCircle2,
      tileBg: "linear-gradient(145deg, #8b5cf6, #a855f7)",
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
                color: "hsl(var(--accent))",
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
            How <span style={{ color: "var(--accent-teal)" }}>Digital Logistics</span> Works
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Getting started is easy. Our streamlined process takes you from quote to delivery in just
            four simple steps.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          {/* Icon tiles */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {steps.map((s) => (
              <div key={s.number} className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div
                    className="grid place-items-center rounded-3xl"
                    style={{
                      width: 88,
                      height: 88,
                      background: s.tileBg,
                      boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                    }}
                  >
                    <s.icon className="h-9 w-9 text-white" />
                  </div>

                  <div
                    className="absolute -top-3 -right-3 grid place-items-center rounded-full text-sm font-semibold"
                    style={{
                      width: 34,
                      height: 34,
                      background: "hsl(var(--background) / 0.95)",
                      border: "2px solid hsl(var(--primary))",
                      color: "hsl(var(--primary))",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    {s.number}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider line (desktop) */}
          <div
            className="mt-12 hidden h-px w-full lg:block"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.55), transparent)",
            }}
          />

          {/* Titles + descriptions */}
          <div className="mt-8 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:text-left">
            {steps.map((s) => (
              <div key={s.number}>
                <div className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                  {s.title}
                </div>
                <p className="mt-4 leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
