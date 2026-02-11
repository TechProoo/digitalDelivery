import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Security() {
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-16 pb-14 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Security
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            How we protect accounts, shipments, and sensitive data.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
        <div
          className="rounded-2xl p-8"
          style={{
            background: "hsl(var(--card) / 0.55)",
            border: "1px solid var(--border-soft)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="space-y-4" style={{ color: "var(--text-secondary)" }}>
            <p>
              We use modern security best practices to protect your data. Keep
              your account secure by using a strong password and not sharing
              login details.
            </p>
            <p>
              If you believe your account is at risk, contact support
              immediately.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
