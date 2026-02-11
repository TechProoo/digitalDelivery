import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Cta from "../components/home/Cta";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Cpu,
  Globe,
  Laptop,
  PackageSearch,
  Settings2,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";

export default function Solutions() {
  const sections = [
    {
      eyebrow: "Platforms",
      title: "Control tower for shipping",
      description:
        "Plan, rate, tender, and monitor shipments with a single operational view — across carriers, lanes, and service levels.",
      items: [
        {
          label: "TMS & workflow automation",
          icon: Laptop,
          note: "Standardize SOPs, approvals, and handoffs across teams.",
        },
        {
          label: "AI-assisted operations",
          icon: Cpu,
          note: "Spot risk early, summarize exceptions, and reduce manual work.",
        },
        {
          label: "Network visibility",
          icon: PackageSearch,
          note: "Unified milestones, ETAs, and live status updates.",
        },
      ],
      outcomes: [
        "Faster booking cycles",
        "Fewer manual tickets",
        "Better on-time performance",
      ],
    },
    {
      eyebrow: "Managed Services",
      title: "Capacity and execution",
      description:
        "Flexible 3PL/4PL support with standardized processes, measurable SLAs, and real humans to run the day-to-day.",
      items: [
        {
          label: "3PL & 4PL operations",
          icon: Boxes,
          note: "Inbound/outbound flows, lane management, and vendor coordination.",
        },
        {
          label: "Over-the-road execution",
          icon: Truck,
          note: "Dispatch, tracking, and escalation across shipments in motion.",
        },
        {
          label: "Exception management",
          icon: Settings2,
          note: "Proactive issue resolution with clear accountability.",
        },
      ],
      outcomes: [
        "Lower exception rate",
        "More predictable costs",
        "Cleaner SLAs",
      ],
    },
    {
      eyebrow: "Global",
      title: "Cross-border coverage",
      description:
        "International shipments with compliant documentation, clear customs workflows, and end-to-end tracking you can trust.",
      items: [
        {
          label: "Cross-border coordination",
          icon: Globe,
          note: "Multi-country handoffs with consistent communication.",
        },
        {
          label: "Milestone tracking",
          icon: PackageSearch,
          note: "Ports, clearance, last-mile — all in one timeline.",
        },
        {
          label: "End-to-end reporting",
          icon: Settings2,
          note: "Performance reporting that highlights bottlenecks and wins.",
        },
      ],
      outcomes: [
        "Fewer border delays",
        "Cleaner compliance",
        "Higher visibility",
      ],
    },
  ] as const;

  const capabilityPillars = [
    {
      title: "Speed that scales",
      icon: Zap,
      desc: "Move from quote to booked shipments faster with repeatable workflows and fewer handoffs.",
    },
    {
      title: "Operational transparency",
      icon: PackageSearch,
      desc: "Know what’s happening, what’s at risk, and what to do next — without digging across tools.",
    },
    {
      title: "Compliance-first",
      icon: ShieldCheck,
      desc: "Documentation and process controls designed to reduce errors and support cross-border movement.",
    },
  ] as const;

  const proofPoints = [
    "Centralized operational view across shipments and partners",
    "Clear SLAs and standardized processes for reliable execution",
    "Automations that reduce repetitive manual tasks",
    "Structured exception handling with measurable resolution times",
    "Tracking milestones built for customer visibility and internal control",
    "Reporting that supports continuous cost and performance optimization",
  ] as const;

  const faqs = [
    {
      q: "Who are these solutions built for?",
      a: "Teams that ship at scale — e-commerce brands, manufacturers, distributors, and logistics operators — who want better visibility, fewer exceptions, and more predictable execution.",
    },
    {
      q: "Do I need all three solutions to get value?",
      a: "No. Many teams start with one area (platform visibility, managed execution, or cross-border) and expand as lanes and volume grow.",
    },
    {
      q: "What does “control tower” mean here?",
      a: "One operational view that brings together planning, booking, milestones, alerts, and reporting so your team can make decisions quickly and act without delays.",
    },
    {
      q: "How do you handle exceptions?",
      a: "We treat exceptions like operational events — detection, ownership, action, updates, and close-out — with clear timelines and measurable resolution outcomes.",
    },
  ] as const;

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-16 pb-14 text-center">
          <span
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold"
            style={{
              background: "hsl(var(--card) / 0.65)",
              border: "1px solid var(--border-soft)",
              color: "var(--accent-teal)",
              boxShadow: "var(--shadow-card)",
              backdropFilter: "blur(10px)",
            }}
          >
            Solutions
          </span>

          <h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Explore our{" "}
            <span style={{ color: "var(--accent-teal)" }}>solutions</span>
          </h1>

          <p
            className="mx-auto mt-4 max-w-3xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            A full view of platforms, managed services, and industry playbooks
            built to make shipping simple, transparent, and reliable — from
            quote to delivery.
          </p>

          {/* small trust bar */}
          <div className="mx-auto mt-8 max-w-5xl">
            <div
              className="grid gap-3 sm:grid-cols-3 rounded-3xl p-4"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
                backdropFilter: "blur(12px)",
              }}
            >
              {capabilityPillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl p-4 text-left"
                  style={{
                    background: "hsl(var(--background) / 0.28)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="grid place-items-center rounded-xl"
                      style={{
                        width: 40,
                        height: 40,
                        background: "hsl(var(--primary) / 0.12)",
                        color: "hsl(var(--primary))",
                      }}
                    >
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {p.title}
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-14 sm:py-18">
          <div className="grid gap-6 lg:grid-cols-3">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl p-7 sm:p-8 h-full"
                style={{
                  background: "hsl(var(--card) / 0.50)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--card) / 0.65)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--accent-teal)",
                    }}
                  >
                    {section.eyebrow}
                  </div>

                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <CheckCircle2
                      className="h-4 w-4"
                      style={{ color: "var(--accent-teal)" }}
                    />
                    Built for reliability
                  </div>
                </div>

                <h2
                  className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {section.title}
                </h2>

                <p
                  className="mt-3 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {section.description}
                </p>

                <div className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl px-4 py-3"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                      }}
                    >
                      <div
                        className="grid place-items-center rounded-xl flex-shrink-0"
                        style={{
                          width: 40,
                          height: 40,
                          background: "hsl(var(--primary) / 0.12)",
                          color: "hsl(var(--primary))",
                        }}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="mt-1 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outcomes */}
                <div className="mt-7">
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background:
                        "radial-gradient(700px 260px at 10% 0%, hsl(var(--primary) / 0.14), transparent 60%), hsl(var(--background) / 0.28)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      Expected outcomes
                    </p>
                    <div className="mt-3 grid gap-2">
                      {section.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: "hsl(var(--primary))" }}
                          />
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {o}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* OPERATING MODEL */}
          <div
            className="mt-10 rounded-3xl p-7 sm:p-8"
            style={{
              background:
                "radial-gradient(900px 380px at 18% 0%, hsl(var(--primary) / 0.14), transparent 60%), hsl(var(--card) / 0.40)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h3
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  A single operating model from quote to delivery
                </h3>
                <p
                  className="mt-3 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  We combine technology, managed execution, and real-time
                  visibility so your team can ship faster, reduce exceptions,
                  and keep customers informed. Every step is designed to be
                  measurable — so you can improve over time, not just “move
                  freight.”
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {proofPoints.slice(0, 4).map((p) => (
                    <div
                      key={p}
                      className="flex items-start gap-3 rounded-2xl px-4 py-3"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                      }}
                    >
                      <ShieldCheck
                        className="h-5 w-5 mt-0.5 flex-shrink-0"
                        style={{ color: "var(--accent-teal)" }}
                      />
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          style={{ color: "var(--text-primary)" }}
                          className="font-semibold"
                        >
                          {p}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid gap-3">
                  {[
                    {
                      step: "Quote & plan",
                      detail:
                        "Define service levels, lanes, and constraints before execution begins.",
                    },
                    {
                      step: "Book & execute",
                      detail:
                        "Standard workflows reduce delays and keep ownership clear.",
                    },
                    {
                      step: "Track & notify",
                      detail:
                        "Milestones + alerts keep teams and customers aligned.",
                    },
                    {
                      step: "Analyze & optimize",
                      detail:
                        "Reports highlight costs, exceptions, and improvement opportunities.",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="rounded-2xl px-4 py-4"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.step}
                        </span>
                        <ArrowRight
                          className="h-4 w-4"
                          style={{ color: "var(--accent-teal)" }}
                        />
                      </div>
                      <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {s.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div
                className="rounded-3xl p-7 sm:p-8"
                style={{
                  background: "hsl(var(--card) / 0.45)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  FAQs
                </h3>
                <p
                  className="mt-3 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Clear answers to common questions about how the solutions fit
                  different shipping models.
                </p>

                <div className="mt-6 space-y-3">
                  {proofPoints.slice(4).map((p) => (
                    <div
                      key={p}
                      className="flex items-start gap-3 rounded-2xl px-4 py-3"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                      }}
                    >
                      <CheckCircle2
                        className="h-5 w-5 mt-0.5 flex-shrink-0"
                        style={{ color: "hsl(var(--primary))" }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-3xl p-7 sm:p-8"
                style={{
                  background:
                    "radial-gradient(900px 380px at 18% 0%, hsl(var(--primary) / 0.14), transparent 60%), hsl(var(--card) / 0.40)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="space-y-4">
                  {faqs.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-2xl px-4 py-4"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                      }}
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className="text-sm sm:text-base font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {f.q}
                          </span>
                          <span
                            className="grid place-items-center rounded-xl"
                            style={{
                              width: 36,
                              height: 36,
                              background: "hsl(var(--primary) / 0.12)",
                              color: "hsl(var(--primary))",
                            }}
                          >
                            <ArrowRight className="h-4 w-4 group-open:rotate-90 transition" />
                          </span>
                        </div>
                      </summary>

                      <p
                        className="mt-3 text-sm sm:text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-10">
          <Cta />
        </div>
      </div>

      <Footer />
    </div>
  );
}
