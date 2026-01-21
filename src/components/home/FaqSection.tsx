import { ChevronDown } from "lucide-react";
import { useId, useMemo, useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const baseId = useId();
  const items: FaqItem[] = useMemo(
    () => [
      {
        question: "How quickly can I get a shipping quote?",
        answer:
          "Our instant quote system provides accurate pricing within seconds. Simply enter your shipment details, and you'll receive competitive rates for air, ground, and ocean freight options immediately.",
      },
      {
        question: "What types of cargo do you handle?",
        answer:
          "We handle a wide range of cargo including general freight, parcels, pallets, temperature-controlled goods, and high-value shipments. If you have special handling requirements, our team can help tailor the right solution.",
      },
      {
        question: "How does real-time tracking work?",
        answer:
          "Once your shipment is booked, you'll get a tracking link with milestone updates. We combine carrier scans and status events to provide a clear timeline, so you always know where your package is and what's next.",
      },
      {
        question: "What are your delivery timeframes?",
        answer:
          "Delivery timeframes depend on the route, service level, and customs processing (if applicable). We'll show estimated transit times at checkout and keep you updated if anything changes during transit.",
      },
      {
        question: "Do you handle customs clearance?",
        answer:
          "Yes. For international shipments, we can support customs documentation and clearance workflows, depending on the destination. We'll guide you on required documents and fees to avoid delays.",
      },
      {
        question: "What insurance options are available?",
        answer:
          "We offer optional shipment protection to cover loss or damage in transit. Coverage options and limits vary by route and cargo type — you'll see available choices during booking.",
      },
      {
        question: "How do I become a customer?",
        answer:
          "Create an account, verify your details, and you're ready to ship. If you're a business shipping at volume, we can also set up tailored pricing and dedicated support.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major cards and common online payment methods. For enterprise accounts, invoicing may be available depending on eligibility.",
      },
    ],
    [],
  );

  const [openIndex, setOpenIndex] = useState<number>(0);

  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-14 sm:py-18">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
                backdropFilter: "blur(10px)",
              }}
            >
              FAQ
            </div>
          </div>

          <h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently Asked{" "}
            <span style={{ color: "var(--accent-teal)" }}>Questions</span>
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything you need to know about shipping with SwiftShip.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `${baseId}-faq-${idx}`;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl"
                style={{
                  ...cardStyle,
                  border: isOpen
                    ? "1px solid hsl(var(--primary) / 0.35)"
                    : "1px solid var(--border-soft)",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() =>
                    setOpenIndex((cur) => (cur === idx ? -1 : idx))
                  }
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="text-lg sm:text-xl font-semibold">
                    {item.question}
                  </span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform duration-300"
                    style={{
                      color: "var(--text-primary)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    className="px-6 pb-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div
                      style={{
                        borderTop: "1px solid var(--border-soft)",
                        paddingTop: "1rem",
                      }}
                    >
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
