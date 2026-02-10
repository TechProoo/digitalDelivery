import { motion } from "framer-motion";
import Alibaba from "../../assets/alibaba.jpg";
import Aliexpress from "../../assets/aliexpress.jpg";
import DHL from "../../assets/dhl.jpg";
import Maersk from "../../assets/maersk.jpg";
import Fedex from "../../assets/fedex.jpg";
import Amazon from "../../assets/amazon.jpg";

export default function TrustedBy() {
  const brands = [
    { name: "Alibaba", logo: Alibaba },
    { name: "AliExpress", logo: Aliexpress },
    { name: "DHL", logo: DHL },
    { name: "Maersk", logo: Maersk },
    { name: "FedEx", logo: Fedex },
    { name: "Amazon", logo: Amazon },
  ];

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
              key={brand.name}
              className="grid place-items-center select-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: "easeOut",
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="h-10 sm:h-12 w-auto object-contain"
                style={{
                  opacity: 0.55,
                  // filter: "grayscale(1)",
                }}
              />
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
