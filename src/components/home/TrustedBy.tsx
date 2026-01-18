export default function TrustedBy() {
  const brands = ["FedEx", "UPS", "DHL", "Maersk", "Amazon", "Alibaba"];

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl pb-12 sm:pb-16">
        <div
          className="text-center text-xs sm:text-sm tracking-[0.28em]"
          style={{ color: "hsl(var(--foreground) / 0.55)" }}
        >
          TRUSTED BY INDUSTRY LEADERS WORLDWIDE
        </div>

        <div className="mt-10 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-center text-3xl sm:text-4xl font-semibold select-none"
              style={{
                color: "hsl(var(--foreground) / 0.25)",
                letterSpacing: "0.02em",
              }}
            >
              {brand}
            </div>
          ))}
        </div>

        <div
          className="mt-14"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.25)" }}
        />
      </div>
    </section>
  );
}
