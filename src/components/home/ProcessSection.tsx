import React from "react";
import { CheckCircle2, ClipboardList, MapPin, Truck } from "lucide-react";
import { motion } from "framer-motion";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tileBg: string;
};

export default function ProcessSection() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Request a Quote",
      description:
        "Tell us what you're shipping and where it's going — get pricing instantly.",
      icon: ClipboardList,
      tileBg: "linear-gradient(145deg, #0ea5e9, #2563eb)",
    },
    {
      number: "02",
      title: "Schedule Pickup",
      description:
        "Choose a pickup window and we'll dispatch the best carrier for the job.",
      icon: Truck,
      tileBg: "linear-gradient(145deg, #f59e0b, #f97316)",
    },
    {
      number: "03",
      title: "Track in Real-Time",
      description:
        "Monitor your freight with live status updates and proactive notifications.",
      icon: MapPin,
      tileBg: "linear-gradient(145deg, #10b981, #06b6d4)",
    },
    {
      number: "04",
      title: "Delivery Confirmed",
      description:
        "Proof of delivery and full shipment history available in one place.",
      icon: CheckCircle2,
      tileBg: "linear-gradient(145deg, #8b5cf6, #a855f7)",
    },
  ];

  return (
    <section
      className="px-4 sm:px-6 lg:px-10"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 82%, aliceblue 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <motion.div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "hsl(var(--accent))",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Simple Process
            </motion.div>
          </div>

          <motion.h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            How{" "}
            <span style={{ color: "var(--accent-teal)" }}>
              Digital Delivery
            </span>{" "}
            Works
          </motion.h2>

          <motion.p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Getting started is easy. Our streamlined process takes you from
            quote to delivery in just four simple steps.
          </motion.p>
        </div>

        <div className="mt-20 max-w-5xl p-auto mx-auto">
          {/* Mobile: stacked steps (icon -> text) */}
          <div className="sm:hidden">
            <div className="grid grid-cols-1 gap-12 text-center">
              {steps.map((s, index) => (
                <motion.div
                  key={s.number}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="grid place-items-center rounded-3xl"
                      style={{
                        width: 88,
                        height: 88,
                        background: s.tileBg,
                        boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                      }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <s.icon className="h-9 w-9 text-white" />
                    </motion.div>

                    <motion.div
                      className="absolute -top-3 -right-3 grid place-items-center rounded-full text-sm font-semibold"
                      style={{
                        width: 34,
                        height: 34,
                        background: "hsl(var(--background) / 0.95)",
                        border: "2px solid hsl(var(--primary))",
                        color: "hsl(var(--primary))",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.12 + 0.2,
                        ease: "backOut",
                      }}
                    >
                      {s.number}
                    </motion.div>
                  </div>

                  <div
                    className="mt-6 text-2xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.title}
                  </div>
                  <p
                    className="mt-4 leading-relaxed"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Icon tiles */}
          <div className="hidden sm:grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {steps.map((s, index) => (
              <motion.div
                key={s.number}
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <div className="relative">
                  <motion.div
                    className="grid place-items-center rounded-3xl"
                    style={{
                      width: 88,
                      height: 88,
                      background: s.tileBg,
                      boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <s.icon className="h-9 w-9 text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute -top-3 -right-3 grid place-items-center rounded-full text-sm font-semibold"
                    style={{
                      width: 34,
                      height: 34,
                      background: "hsl(var(--background) / 0.95)",
                      border: "2px solid hsl(var(--primary))",
                      color: "hsl(var(--primary))",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.15 + 0.2,
                      ease: "backOut",
                    }}
                  >
                    {s.number}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider line (desktop) */}
          <motion.div
            className="mt-12 hidden h-px w-full lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.55), transparent)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />

          {/* Titles + descriptions */}
          <div className="mt-8 hidden sm:grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:text-left">
            {steps.map((s, index) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div
                  className="text-2xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {s.title}
                </div>
                <p
                  className="mt-4 leading-relaxed"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
