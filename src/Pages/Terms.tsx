import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            These terms govern the use of our website and services.
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
              By using our services, you agree to comply with applicable laws
              and provide accurate information when creating shipments and
              accounts.
            </p>
            <p>
              For questions about these terms, please contact our support team.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
