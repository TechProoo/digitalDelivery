import { Link, useNavigate } from "react-router-dom";
import { Search, ShieldCheck, Timer, Route } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    const value = trackingNumber.trim();
    if (!value) return;
    navigate(`/dashboard/track?tn=${encodeURIComponent(value)}`);
  };

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
              Tracking
            </span>

            <h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Real-time{" "}
              <span style={{ color: "var(--accent-teal)" }}>visibility</span>
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Track shipments with clear milestones, status history, and
              checkpoint updates — so customers always know where things stand.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: "hsl(var(--card) / 0.60)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <Search
                  className="h-5 w-5"
                  style={{ color: "var(--text-tertiary)" }}
                />
                <input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTrack();
                  }}
                />
                <button
                  onClick={handleTrack}
                  className="rounded-xl px-4 py-2 text-sm font-semibold"
                  style={{
                    background: "var(--accent-teal)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Track
                </button>
              </div>
              <p
                className="mt-2 text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                Note: tracking details are available after you sign in.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="rounded-xl px-5 py-3 text-sm font-semibold"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                Sign in
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
              <Route className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Milestones & checkpoints
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              See status history and location checkpoints as your shipment
              progresses.
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
              <Timer className="h-6 w-6" />
            </div>
            <h3
              className="mt-6 text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Faster updates
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Get quick visibility into what’s happening next — pickup, in
              transit, and delivered.
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
              Trusted reporting
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Consistent shipment records for support, audits, and customer
              communication.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
