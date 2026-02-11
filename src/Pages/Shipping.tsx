import { Link } from "react-router-dom";
import { Globe, ShieldCheck, Truck } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Shipping() {
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
              Shipping
            </span>

            <h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Deliver with{" "}
              <span style={{ color: "var(--accent-teal)" }}>confidence</span>
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Road, air, and sea shipping options built for speed, visibility,
              and reliable handling — from pickup to delivery.
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
                Create Delivery
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
                Talk to Support
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
              <Truck className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Domestic shipping
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Schedule pickups and move parcels across Nigeria with dependable,
              trackable delivery.
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
              <Globe className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              International options
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Choose air or sea freight based on urgency and cost — with clear
              milestones along the way.
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
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Secure handling
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Careful packaging guidance, optional insurance, and exception
              management for peace of mind.
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
            Need a tailored shipping plan?
          </h2>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            Contact our team for recommendations based on destination, package
            type, and timeline.
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
              Contact us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
