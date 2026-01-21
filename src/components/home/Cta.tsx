import { CheckCircle2, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Cta = () => {
  const { isAuthenticated } = useAuth();
  const startHref = isAuthenticated ? "/dashboard/new-delivery" : "/signup";
  const trackHref = isAuthenticated ? "/dashboard/track" : "/login";

  const chips = [
    "Free instant quotes",
    "Real-time tracking",
    "24/7 customer support",
    "No hidden fees",
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div
          className="relative overflow-hidden rounded-4xl px-6 py-14 sm:px-10 sm:py-18 text-center"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(17, 207, 220, 0.20), rgba(0,0,0,0) 60%), radial-gradient(circle at 85% 40%, rgba(17, 207, 220, 0.12), rgba(0,0,0,0) 62%), linear-gradient(135deg, rgba(6, 18, 26, 0.98), rgba(8, 38, 52, 0.90))",
            border: "1px solid hsl(var(--primary) / 0.25)",
            boxShadow: "0 50px 120px rgba(0,0,0,0.60)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full"
            style={{
              border: "1px solid hsl(var(--primary) / 0.18)",
              opacity: 0.8,
            }}
          />
          <div
            className="pointer-events-none absolute -left-24 -bottom-28 h-80 w-80 rounded-full"
            style={{
              border: "1px solid hsl(var(--primary) / 0.14)",
              opacity: 0.7,
            }}
          />

          <h2
            className="text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to Transform Your{" "}
            <span style={{ color: "var(--accent-teal)" }}>Logistics</span>?
          </h2>

          <p
            className="mx-auto mt-5 max-w-3xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Join thousands of businesses that trust SwiftShip for their freight
            needs. Get started in minutes with our easy-to-use platform.
          </p>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            {chips.map((label) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "hsl(var(--background) / 0.25)",
                  border: "1px solid hsl(var(--primary) / 0.22)",
                  color: "var(--text-primary)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <CheckCircle2
                  className="h-4 w-4"
                  style={{ color: "var(--accent-teal)" }}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={startHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "var(--primary-foreground)",
                boxShadow: "var(--glow-primary)",
              }}
            >
              Start Shipping Today
              <MoveRight className="h-5 w-5" />
            </Link>

            <Link
              to={trackHref}
              className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold"
              style={{
                background: "transparent",
                border: "2px solid hsl(var(--primary) / 0.35)",
                color: "var(--text-primary)",
                backdropFilter: "blur(10px)",
              }}
            >
              Track a Shipment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
