type Stat = {
  value: string;
  label: string;
};

export default function StatsStrip() {
  const stats: Stat[] = [
    { value: "5M+", label: "Shipments Delivered" },
    { value: "150+", label: "Countries Served" },
    { value: "99.8%", label: "On-Time Delivery Rate" },
    { value: "10K+", label: "Happy Customers" },
    { value: "50M", label: "Miles Covered" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-10 sm:py-12">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background) / 0.30), hsl(var(--background) / 0.65))",
            border: "1px solid hsl(var(--primary) / 0.18)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-48 -translate-x-1/2"
            style={{
              width: 900,
              background:
                "radial-gradient(closest-side, hsl(var(--primary) / 0.22), transparent 70%)",
              filter: "blur(12px)",
            }}
          />

          <div className="relative grid grid-cols-2 gap-y-10 px-6 py-10 text-center sm:px-10 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="text-4xl sm:text-5xl font-semibold tracking-tight"
                  style={{ color: "var(--accent-teal)" }}
                >
                  {s.value}
                </div>
                <div className="mt-3" style={{ color: "var(--text-tertiary)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
