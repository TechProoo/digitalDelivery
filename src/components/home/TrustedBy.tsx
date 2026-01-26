import { motion } from "framer-motion";

export default function TrustedBy() {
  const brands = ["FedEx", "UPS", "DHL", "Maersk", "Amazon", "Alibaba"];

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl pb-12 sm:pb-16">
        <motion.div
          className="text-center text-xs sm:text-sm tracking-[0.28em]"
          style={{ color: "hsl(var(--foreground) / 0.55)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          TRUSTED BY INDUSTRY LEADERS WORLDWIDE
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              className="text-center text-3xl sm:text-4xl font-semibold select-none"
              style={{
                color: "hsl(var(--foreground) / 0.25)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: "easeOut",
              }}
            >
              {brand}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.25)" }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
