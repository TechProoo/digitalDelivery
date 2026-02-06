import ImgRoad from "../assets/road.jpg";
import ImgAero from "../assets/aero.jpg";
import ImgServices from "../assets/services_img.jpg";
import ImgBoat from "../assets/boat.jpg";
import ImgDoor from "../assets/door.jpg";
import ImgHiw from "../assets/hiw.jpg";

export type ArticleCategory =
  | "Industry Report"
  | "Technology"
  | "Market Update"
  | "Operations"
  | "Compliance"
  | "E‑commerce"
  | "Cost Optimization";

export type ArticleSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type ArticleItem = {
  id: string;
  category: ArticleCategory;
  date: string; // ISO date string
  title: string;
  excerpt: string;
  author: string;
  readTimeMinutes: number;
  imageUrl: string;
  sections: ArticleSection[];
};

export const ARTICLE_CATEGORIES: Array<"All" | ArticleCategory> = [
  "All",
  "Industry Report",
  "Technology",
  "Market Update",
  "Operations",
  "Compliance",
  "E‑commerce",
  "Cost Optimization",
];

export const ARTICLES: ArticleItem[] = [
  {
    id: "freight-trucking-rates-2026",
    category: "Industry Report",
    date: "2026-01-15",
    title: "A Guide to Freight Trucking Rates in 2026",
    excerpt:
      "As we move into 2026, the freight market is showing signs of change. Here’s how to read rate signals, negotiate smarter, and avoid costly surprises.",
    author: "Digital Delivery Insights",
    readTimeMinutes: 8,
    imageUrl: ImgRoad,
    sections: [
      {
        title: "What’s driving trucking rates right now",
        body: [
          "Rates are influenced by capacity, fuel prices, route density, and service-level requirements.",
          "In 2026, shippers are prioritizing reliability over the cheapest lane price — especially for time-sensitive goods.",
        ],
        bullets: [
          "Fuel volatility and surcharges",
          "Driver availability and lane imbalance",
          "Peak season demand spikes",
          "Service level: same-day vs next-day vs economy",
        ],
      },
      {
        title: "How to estimate a fair rate",
        body: [
          "Start with your shipment’s chargeable weight/space, then factor distance, handling, and delivery commitments.",
          "If your details are incomplete (weight or dimensions), the quote can shift after verification.",
        ],
        bullets: [
          "Provide accurate pickup/drop-off and package details",
          "Use chargeable weight (actual vs volumetric) for air/courier",
          "Expect adjustments for hard-to-reach destinations",
        ],
      },
      {
        title: "Negotiation checklist",
        body: [
          "Strong negotiations come from predictability. Share volumes, seasonality, and service expectations.",
        ],
        bullets: [
          "Ask for price breaks at volume tiers",
          "Confirm what’s included (handling, re-delivery, storage)",
          "Lock fuel surcharge rules and review cadence",
        ],
      },
    ],
  },
  {
    id: "ai-supply-chain-visibility",
    category: "Technology",
    date: "2026-01-12",
    title: "How AI is Transforming Supply Chain Visibility",
    excerpt:
      "AI helps teams see delays before they happen — by turning tracking events, location pings, and patterns into early warnings and better ETAs.",
    author: "Digital Delivery Labs",
    readTimeMinutes: 7,
    imageUrl: ImgAero,
    sections: [
      {
        title: "From tracking to prediction",
        body: [
          "Traditional tracking tells you where a shipment is. AI-powered visibility predicts what will happen next.",
          "With enough history, models can flag risk lanes, facilities, and time windows where delays cluster.",
        ],
      },
      {
        title: "What data improves ETAs",
        body: [
          "High-quality ETAs depend on consistent event capture and clean timestamps.",
        ],
        bullets: [
          "Scan events and milestone timestamps",
          "Traffic and route context",
          "Weather disruption indicators",
          "Carrier performance by lane",
        ],
      },
      {
        title: "How to start (without boiling the ocean)",
        body: [
          "Pick one route or service level, define the success metric (e.g., on-time rate), then expand.",
        ],
        bullets: [
          "Start with exception alerts",
          "Add customer-facing tracking updates",
          "Then optimize inventory and planning",
        ],
      },
    ],
  },
  {
    id: "q4-2025-insights",
    category: "Market Update",
    date: "2026-01-10",
    title: "Q4 2025 Insights and Recommendations",
    excerpt:
      "A practical summary of what changed last quarter — demand, capacity, and service reliability — plus actions to take this month.",
    author: "Digital Delivery Insights",
    readTimeMinutes: 6,
    imageUrl: ImgServices,
    sections: [
      {
        title: "Key takeaways",
        body: [
          "Q4 typically increases pressure on last-mile performance. The biggest wins came from proactive planning and clear cut-off times.",
        ],
        bullets: [
          "Confirm cut-off times with carriers",
          "Build buffer for high-risk routes",
          "Communicate ETAs early to reduce support load",
        ],
      },
      {
        title: "What to do next",
        body: [
          "Use your Q4 performance as a baseline. Create a simple scorecard and review weekly.",
        ],
        bullets: [
          "On-time delivery %",
          "Average transit time",
          "Exception rate",
          "Cost per shipment",
        ],
      },
    ],
  },
  {
    id: "volumetric-weight-explained",
    category: "Operations",
    date: "2026-01-06",
    title: "Volumetric vs Actual Weight: Why Your Quote Changes",
    excerpt:
      "Light but bulky shipments can cost more than heavy compact ones. Learn how volumetric weight works and how to avoid surprises.",
    author: "Operations Team",
    readTimeMinutes: 5,
    imageUrl: ImgHiw,
    sections: [
      {
        title: "What is volumetric weight",
        body: [
          "Carriers price based on the space you occupy as well as weight. Volumetric weight converts package volume into a weight equivalent.",
        ],
        bullets: [
          "Measure length × width × height accurately",
          "Use consistent units (cm/in)",
          "Expect different divisors by carrier/service",
        ],
      },
      {
        title: "How to reduce chargeable weight",
        body: [
          "Packaging decisions matter. Right-size cartons, reduce void fill, and avoid double boxing when possible.",
        ],
      },
    ],
  },
  {
    id: "customs-documentation-checklist",
    category: "Compliance",
    date: "2026-01-03",
    title: "Customs Documentation Checklist for Faster Clearance",
    excerpt:
      "The fastest shipments are the ones with clean paperwork. Here’s a checklist to reduce clearance delays and extra charges.",
    author: "Compliance Desk",
    readTimeMinutes: 9,
    imageUrl: ImgDoor,
    sections: [
      {
        title: "Core documents to prepare",
        body: [
          "Different destinations may request additional forms, but these are the common baseline documents.",
        ],
        bullets: [
          "Commercial invoice",
          "Packing list",
          "Proof of payment (where applicable)",
          "HS codes and item descriptions",
        ],
      },
      {
        title: "Most common reasons clearance stalls",
        body: [
          "Clearance issues are usually caused by mismatched values, vague descriptions, or missing consignee information.",
        ],
        bullets: [
          "Undervalued invoices",
          "Missing consignee phone/address",
          "Generic item descriptions (e.g., “parts”)",
        ],
      },
    ],
  },
  {
    id: "last-mile-reliability",
    category: "Operations",
    date: "2025-12-22",
    title: "Last-Mile Reliability: The Small Fixes That Improve On-Time Delivery",
    excerpt:
      "On-time delivery isn’t magic — it’s process. Here are the small operational changes that reduce failed deliveries and re-attempts.",
    author: "Delivery Ops",
    readTimeMinutes: 7,
    imageUrl: ImgBoat,
    sections: [
      {
        title: "Fix address quality",
        body: [
          "Most last-mile failures start with incomplete addresses. Standardize your address capture and validate phone numbers.",
        ],
      },
      {
        title: "Use delivery windows",
        body: [
          "Simple delivery windows reduce missed deliveries and improve customer satisfaction.",
        ],
        bullets: [
          "Morning / afternoon windows",
          "Send confirmation before dispatch",
          "Allow rescheduling",
        ],
      },
    ],
  },
  {
    id: "ecommerce-returns-playbook",
    category: "E‑commerce",
    date: "2025-12-12",
    title: "E-commerce Returns Playbook: Reduce Costs Without Hurting Experience",
    excerpt:
      "Returns are part of e-commerce. The goal is to make them predictable and affordable while staying customer-friendly.",
    author: "E-commerce Team",
    readTimeMinutes: 10,
    imageUrl: ImgServices,
    sections: [
      {
        title: "Design your return policy for logistics",
        body: [
          "A good policy sets expectations on eligibility, packaging, timeframes, and refund triggers.",
        ],
        bullets: [
          "Define acceptable return condition",
          "Set clear pickup/drop-off rules",
          "Automate status updates",
        ],
      },
      {
        title: "Lower the cost per return",
        body: [
          "Consolidate return pickups and route them to the closest hub when possible.",
        ],
      },
    ],
  },
  {
    id: "cut-shipping-costs-quick-wins",
    category: "Cost Optimization",
    date: "2025-12-02",
    title: "7 Quick Wins to Cut Shipping Costs This Month",
    excerpt:
      "Reduce spend without breaking service quality: packaging discipline, consolidation, better cut-offs, and smarter carrier mix.",
    author: "Finance & Ops",
    readTimeMinutes: 6,
    imageUrl: ImgRoad,
    sections: [
      {
        title: "Quick wins you can implement immediately",
        body: [
          "Start with the highest-impact operational levers. These typically require little tooling and deliver results fast.",
        ],
        bullets: [
          "Right-size packaging",
          "Consolidate pickups",
          "Negotiate lane-based pricing",
          "Reduce re-deliveries with better contact validation",
        ],
      },
      {
        title: "Track a simple weekly scorecard",
        body: [
          "You can’t optimize what you don’t measure. Start with cost per shipment and exception rate.",
        ],
      },
    ],
  },
];

export function getArticleById(id?: string) {
  if (!id) return undefined;
  return ARTICLES.find((a) => a.id === id);
}
