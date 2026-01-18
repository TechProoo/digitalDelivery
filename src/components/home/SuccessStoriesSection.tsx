import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Boxes, Clock, DollarSign, TrendingUp } from "lucide-react";

import RetailImg from "../../assets/services_img.jpg";
import ManufacturingImg from "../../assets/road.jpg";
import CpgImg from "../../assets/door.jpg";

type Metric = {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
};

type Story = {
  tag: string;
  company: string;
  title: string;
  description: string;
  image: string;
  metrics: [Metric, Metric];
};

function MetricItem({ icon: Icon, value, label }: Metric): ReactNode {
  return (
    <div className="flex items-start gap-3">
      <span style={{ color: "var(--accent-teal)" }}>
        <Icon className="mt-0.5 h-5 w-5" />
      </span>
      <div>
        <div
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </div>
        <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

export default function SuccessStoriesSection() {
  const cardStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.50)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(12px)",
  };

  const stories: Story[] = [
    {
      tag: "Retail",
      company: "Global Retail Co.",
      title: "40% Cost Reduction Through Network Optimization",
      description:
        "Implemented end-to-end logistics optimization resulting in significant cost savings and improved delivery performance.",
      image: RetailImg,
      metrics: [
        { icon: DollarSign, value: "$4.2M", label: "Annual Savings" },
        { icon: Clock, value: "32%", label: "Faster Delivery" },
      ],
    },
    {
      tag: "Manufacturing",
      company: "Tech Manufacturing Inc.",
      title: "Supply Chain Transformation with AI-Powered Insights",
      description:
        "Leveraged advanced analytics to optimize inventory management and reduce transportation costs across facilities.",
      image: ManufacturingImg,
      metrics: [
        { icon: TrendingUp, value: "63%", label: "Accuracy Increase" },
        { icon: Boxes, value: "18K", label: "Daily Shipments" },
      ],
    },
    {
      tag: "CPG",
      company: "Fresh Foods Distribution",
      title: "Temperature-Controlled Logistics Excellence",
      description:
        "Achieved industry-leading cold chain performance with real-time monitoring and proactive exception handling.",
      image: CpgImg,
      metrics: [
        { icon: Clock, value: "99.8%", label: "On-Time Rate" },
        { icon: DollarSign, value: "28%", label: "Cost Reduction" },
      ],
    },
  ];

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
              Success Stories
            </div>
          </div>

          <h2
            className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tight header"
            style={{ color: "var(--text-primary)" }}
          >
            See How{" "}
            <span style={{ color: "var(--accent-teal)" }}>
              Industry Leaders
            </span>
            <br />
            Succeed
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Discover how enterprises across industries are transforming their
            logistics operations with Digital Logistics.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-3xl"
              style={cardStyle}
            >
              <div className="relative h-44 sm:h-52">
                <img
                  src={story.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.95)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)",
                  }}
                />

                <div className="absolute bottom-4 left-4">
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                    style={{
                      background: "hsl(var(--background) / 0.70)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                      color: "var(--accent-teal)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {story.tag}
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <div
                  className="text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {story.company}
                </div>

                <h3
                  className="mt-3 text-2xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {story.title}
                </h3>

                <p
                  className="mt-4 leading-relaxed"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {story.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <MetricItem {...story.metrics[0]} />
                  <MetricItem {...story.metrics[1]} />
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 font-semibold"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    <span>Read case study</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
