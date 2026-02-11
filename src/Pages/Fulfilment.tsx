import { Link } from "react-router-dom";
import { Boxes, ClipboardList, PackageCheck } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Fulfilment() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-16 pb-14">
          <div className="text-center">
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
              Fulfilment
            </span>

            <h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Ship orders{" "}
              <span style={{ color: "var(--accent-teal)" }}>faster</span>
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              From storage to picking, packing, and last-mile delivery —
              fulfilment that keeps your customers informed and happy.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/dashboard/new-delivery"
                className="rounded-xl px-5 py-3 text-sm font-semibold"
                style={{
                  background: "var(--accent-teal)",
                  color: "var(--bg-primary)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                Start a Shipment
              </Link>
              <Link
                to="/contact"
                className="rounded-xl px-5 py-3 text-sm font-semibold"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="grid place-items-center rounded-2xl"
              style={{
                width: 56,
                height: 56,
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
              }}
            >
              <Boxes className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Warehousing
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Safe storage and inventory visibility to keep your operations
              smooth.
            </p>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="grid place-items-center rounded-2xl"
              style={{
                width: 56,
                height: 56,
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
              }}
            >
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Pick & pack
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Standardized packing workflows to reduce errors and improve
              delivery outcomes.
            </p>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="grid place-items-center rounded-2xl"
              style={{
                width: 56,
                height: 56,
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
              }}
            >
              <PackageCheck className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Dispatch & delivery
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Fast dispatch with tracking updates so customers always know
              what’s next.
            </p>
          </div>
        </div>

        <div
          className="mt-10 rounded-2xl p-8"
          style={{
            background: "hsl(var(--card) / 0.55)",
            border: "1px solid var(--border-soft)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <h2
            className="text-2xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Built for growing teams
          </h2>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            Whether you ship 10 orders a day or 10,000 — we’ll help you design a
            fulfilment workflow that scales.
          </p>
          <div className="mt-5">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-semibold"
              style={{
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
              }}
            >
              Speak with an expert
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
