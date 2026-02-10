import ImgRoad from "../assets/road.jpg";
import ImgAero from "../assets/ai_trans.png";
import ImgServices from "../assets/q4.png";
import ImgBoat from "../assets/boat.jpg";
import ImgDoor from "../assets/checklist.png";
import Cut from "../assets/images (14) (1).jpeg";
import Ecom from "../assets/ecom.jpg";
import Vol from "../assets/vol.png";
// import ImgHiw from "../assets/hiw.jpg";

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
    readTimeMinutes: 10,
    imageUrl: ImgRoad,
    sections: [
      {
        title: "What’s driving trucking rates right now",
        body: [
          "Trucking rates rarely move because of one factor. They respond to the balance between available capacity (trucks and drivers) and demand (how many loads are competing for that capacity).",
          "In early 2026, many shippers are paying more attention to consistency — fewer missed pickups, clearer appointment windows, and predictable transit times — even if the lane rate is slightly higher.",
          "Rates also differ by lane. Two routes with the same distance can price differently depending on backhaul availability, congestion, and how often drivers can reload quickly.",
        ],
        bullets: [
          "Fuel volatility and surcharges (especially on long-haul lanes)",
          "Driver availability and lane imbalance (high outbound vs low inbound)",
          "Facility wait times (detention) and appointment delays",
          "Peak season demand spikes and holiday inventory pulls",
          "Equipment type: flatbed, reefer, dry van, specialized",
          "Service level: same-day, next-day, economy, dedicated capacity",
        ],
      },
      {
        title: "Linehaul vs accessorials (the hidden cost drivers)",
        body: [
          "Many quote disagreements come from accessorials — extra charges attached to special handling or operational friction.",
          "If you only compare base lane pricing, you may pick a carrier that looks cheaper but costs more after re-delivery, waiting time, or special pickup requirements are added.",
        ],
        bullets: [
          "Detention and demurrage (time-based charges at facilities)",
          "Liftgate, inside delivery, residential delivery fees",
          "Tolls, congestion fees, and route restrictions",
          "Re-delivery and address correction charges",
          "Weekend/after-hours pickup premiums",
        ],
      },
      {
        title: "How to estimate a fair rate",
        body: [
          "Start with your shipment profile: distance, stops, weight/volume, and pickup/drop complexity.",
          "Then layer in operational reality: appointment windows, likely wait times, and risk (weather, congestion, security).",
          "If your shipment details are incomplete — missing weight, wrong dimensions, vague address — your quote can change after verification.",
        ],
        bullets: [
          "Provide accurate pickup/drop-off addresses and required delivery windows",
          "Confirm equipment type and handling needs upfront",
          "Use chargeable weight rules (actual vs volumetric) for courier/air legs",
          "Expect adjustments for hard-to-reach or restricted destinations",
          "Ask for a cost breakdown: base rate + accessorial assumptions",
        ],
      },
      {
        title: "Negotiation checklist",
        body: [
          "Strong negotiations come from predictability. When carriers can plan, they price better.",
          "Share what you can: weekly volumes, seasonality, shipment consistency, and service expectations.",
        ],
        bullets: [
          "Ask for price breaks at volume tiers (e.g., 10/wk, 25/wk, 50/wk)",
          "Confirm what’s included (handling, re-delivery, storage, tolls)",
          "Lock fuel surcharge rules and a review cadence (weekly/monthly)",
          "Negotiate detention-free time and clear detention rates",
          "Request lane performance reporting (on-time %, exceptions, claims)",
        ],
      },
      {
        title: "Quick actions to stabilize costs this month",
        body: [
          "You don’t need a big system change to improve rates. Small operational improvements reduce carrier risk and unlock better pricing.",
        ],
        bullets: [
          "Reduce facility wait time with better appointment scheduling",
          "Standardize shipment data (weights, dims, addresses) to cut re-quotes",
          "Bundle lanes with the same carrier to improve pricing leverage",
          "Run a weekly scorecard: on-time pickup, on-time delivery, claims",
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
    readTimeMinutes: 9,
    imageUrl: ImgAero,
    sections: [
      {
        title: "From tracking to prediction",
        body: [
          "Traditional tracking answers: Where is the shipment now?",
          "AI-powered visibility answers: What is most likely to happen next, and what should we do about it?",
          "With enough history, models can identify lanes, facilities, and time windows where delays cluster — then create early warnings before customers feel the impact.",
        ],
        bullets: [
          "Predict late deliveries before the first SLA breach",
          "Flag risky handoffs (port → truck, hub → last mile)",
          "Recommend proactive actions (reroute, upgrade, notify)",
        ],
      },
      {
        title: "What data improves ETAs",
        body: [
          "Good ETAs depend on clean, consistent events. AI doesn’t fix messy data — it amplifies it.",
          "Your biggest wins usually come from improving timestamp accuracy and milestone completeness.",
        ],
        bullets: [
          "Scan events and milestone timestamps (picked up, arrived hub, out for delivery)",
          "Traffic and route context",
          "Weather disruption indicators",
          "Carrier performance by lane and service level",
          "Facility dwell times and appointment adherence",
        ],
      },
      {
        title: "Where AI helps the most (practical use-cases)",
        body: [
          "Most teams don’t need a complex control tower on day one. Start where AI reduces cost or support workload immediately.",
        ],
        bullets: [
          "Exception detection: missing scans, stalled shipments, repeated delays",
          "Customer comms: proactive ETA updates to reduce “Where is my order?” tickets",
          "Inventory planning: buffer adjustments based on predicted delays",
          "Carrier scorecards: performance by lane, week, and service level",
        ],
      },
      {
        title: "How to start (without boiling the ocean)",
        body: [
          "Pick one route, one service level, and one metric. Prove value quickly, then expand.",
          "The best first metric is usually on-time delivery %, exception rate, or customer support tickets per 100 shipments.",
        ],
        bullets: [
          "Start with exception alerts",
          "Add customer-facing tracking updates",
          "Then optimize planning and inventory placement",
          "Document what “good” looks like and train teams to trust the signal",
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
    readTimeMinutes: 8,
    imageUrl: ImgServices,
    sections: [
      {
        title: "What Q4 exposed (operational pressure points)",
        body: [
          "Q4 demand amplified every weak link: poor cut-off times, slow exceptions handling, and last-mile failures.",
          "Teams that performed best didn’t just ship faster — they communicated better and reduced surprises.",
        ],
        bullets: [
          "Cut-off time confusion created missed pickups",
          "Support tickets increased when ETA updates were inconsistent",
          "Stockouts increased where transit buffers were too optimistic",
        ],
      },
      {
        title: "Key takeaways",
        body: [
          "The biggest wins came from proactive planning and clear cut-off times.",
          "Carriers performed better when they received clean shipment data and realistic delivery expectations.",
        ],
        bullets: [
          "Confirm cut-off times with carriers and hubs",
          "Build buffer for high-risk routes and handoffs",
          "Communicate ETAs early to reduce support load",
          "Use exception categories (delay reason codes) to fix root causes",
        ],
      },
      {
        title: "What to do next",
        body: [
          "Use your Q4 performance as a baseline. Create a simple scorecard and review weekly.",
          "Start with a lightweight process: a 20-minute weekly ops review is enough to spot recurring problems.",
        ],
        bullets: [
          "On-time delivery %",
          "Average transit time",
          "Exception rate",
          "Cost per shipment",
          "Claims / damage rate",
          "Re-delivery rate",
        ],
      },
      {
        title: "Recommended focus areas for January–February",
        body: [
          "The first quarter is the best time to standardize processes. Small fixes now prevent expensive Q4 chaos later.",
        ],
        bullets: [
          "Address quality improvements (validation + formatting)",
          "Carrier mix review (speed vs cost by lane)",
          "Returns flow mapping (where does it slow down?)",
          "Packaging audit (reduce volumetric weight surprises)",
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
    readTimeMinutes: 7,
    imageUrl: Vol,
    sections: [
      {
        title: "The simple idea behind chargeable weight",
        body: [
          "Carriers don’t only sell transportation — they sell capacity. If your package is large, it consumes more space, even if it’s light.",
          "That’s why many services bill using chargeable weight: the higher of actual weight or volumetric weight.",
        ],
        bullets: [
          "Actual weight = what the scale shows",
          "Volumetric (dimensional) weight = space converted into a weight equivalent",
          "Chargeable weight = max(actual, volumetric)",
        ],
      },
      {
        title: "What is volumetric weight",
        body: [
          "Volumetric weight converts package volume into a weight number so carriers can price fairly across different shipment shapes.",
          "A big lightweight box can block space that could have been used for multiple smaller parcels — that space has value.",
        ],
        bullets: [
          "Measure length × width × height accurately",
          "Use consistent units (cm/in) across the entire quote",
          "Expect different divisors by carrier/service (air vs courier vs express)",
          "Round-up rules may apply (e.g., 9.1kg → 10kg billed)",
        ],
      },
      {
        title: "Why quotes change after pickup",
        body: [
          "The most common reason quotes change is re-measurement. If the courier measures different dimensions than what was submitted, chargeable weight updates.",
          "This happens a lot with soft packaging that expands, irregular shapes, or cartons packed with excess void fill.",
        ],
        bullets: [
          "Dimensions entered were estimated, not measured",
          "Units mismatch (inches submitted as centimeters)",
          "Packaging expanded after sealing",
          "Double-boxing increased outer dimensions",
        ],
      },
      {
        title: "How to reduce chargeable weight",
        body: [
          "Packaging discipline saves money. The goal is to reduce wasted volume without compromising product protection.",
          "Start with the highest-volume SKUs and standardize packaging sizes.",
        ],
        bullets: [
          "Right-size cartons and reduce void fill",
          "Avoid double boxing unless required",
          "Use mailers for soft goods instead of rigid boxes",
          "Ship disassembled where possible (flat-pack)",
          "Standardize box sizes around your top 20 SKUs",
        ],
      },
      {
        title: "A quick pre-quote checklist (to avoid surprises)",
        body: [
          "If you do these four things before requesting a quote, your pricing will be far more stable.",
        ],
        bullets: [
          "Weigh the parcel after final packaging",
          "Measure the outer dimensions (not product-only)",
          "Confirm units and service divisor",
          "Ask if rounding rules apply for billed weight",
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
    readTimeMinutes: 11,
    imageUrl: ImgDoor,
    sections: [
      {
        title: "Core documents to prepare",
        body: [
          "Different destinations request different forms, but these are the baseline documents customs expects for most commercial shipments.",
          "When these documents are complete and consistent with each other, clearance is usually fast and predictable.",
        ],
        bullets: [
          "Commercial invoice (accurate value + currency)",
          "Packing list (weights, quantities, carton count)",
          "Proof of payment (where applicable)",
          "HS codes and item descriptions (specific and clear)",
          "Shipper/consignee contact details (phone + email)",
        ],
      },
      {
        title: "How to write product descriptions that clear faster",
        body: [
          "Generic descriptions cause delays because customs can’t classify or assess risk properly.",
          "Descriptions should identify what the item is, what it’s made of, and what it’s used for.",
        ],
        bullets: [
          "Bad: “Parts” → Good: “Aluminum phone casing parts for smartphone assembly”",
          "Bad: “Clothes” → Good: “Men’s cotton t-shirts, 100% cotton, size mix”",
          "Add material + use-case + model/SKU where possible",
        ],
      },
      {
        title: "Most common reasons clearance stalls",
        body: [
          "Clearance problems are usually caused by mismatched values, vague descriptions, or missing consignee information.",
          "Many holds can be avoided by verifying invoice totals, HS codes, and consignee contact details before dispatch.",
        ],
        bullets: [
          "Undervalued invoices or inconsistent totals",
          "Missing consignee phone/address",
          "Generic item descriptions (e.g., “electronics”, “parts”)",
          "Missing country of origin",
          "HS code mismatches vs product description",
        ],
      },
      {
        title: "Preventable fees to watch for",
        body: [
          "Clean documentation reduces not just delays — it reduces cost. Most surprise fees come from missing data that triggers manual handling.",
        ],
        bullets: [
          "Storage fees during holds",
          "Reprocessing / document correction fees",
          "Inspection fees triggered by unclear declarations",
          "Return-to-sender charges if consignee is unreachable",
        ],
      },
    ],
  },

  {
    id: "last-mile-reliability",
    category: "Operations",
    date: "2025-12-22",
    title:
      "Last-Mile Reliability: The Small Fixes That Improve On-Time Delivery",
    excerpt:
      "On-time delivery isn’t magic — it’s process. Here are the small operational changes that reduce failed deliveries and re-attempts.",
    author: "Delivery Ops",
    readTimeMinutes: 9,
    imageUrl: ImgBoat,
    sections: [
      {
        title: "Fix address quality",
        body: [
          "Most last-mile failures start with incomplete addresses. Standardize your address capture and validate phone numbers.",
          "Add simple guardrails: required landmarks, street numbers, and a reachable phone number.",
        ],
        bullets: [
          "Use address autocomplete where possible",
          "Require a phone number with country code",
          "Add optional landmark field for hard-to-find locations",
          "Normalize city/state formatting to reduce sorting errors",
        ],
      },
      {
        title: "Use delivery windows",
        body: [
          "Simple delivery windows reduce missed deliveries and improve customer satisfaction.",
          "They also reduce driver time wasted on failed attempts.",
        ],
        bullets: [
          "Morning / afternoon windows",
          "Send confirmation before dispatch",
          "Allow rescheduling via link or WhatsApp",
          "Set expectations for high-traffic delivery areas",
        ],
      },
      {
        title: "Reduce re-deliveries with proactive communication",
        body: [
          "A short “delivery is coming” message reduces failed attempts dramatically, especially for residential deliveries.",
        ],
        bullets: [
          "Send “Out for delivery” notifications",
          "Add driver call rules for unreachable customers",
          "Confirm payment method (COD vs prepaid) before dispatch",
        ],
      },
    ],
  },

  {
    id: "ecommerce-returns-playbook",
    category: "E‑commerce",
    date: "2025-12-12",
    title:
      "E-commerce Returns Playbook: Reduce Costs Without Hurting Experience",
    excerpt:
      "Returns are part of e-commerce. The goal is to make them predictable and affordable while staying customer-friendly.",
    author: "E-commerce Team",
    readTimeMinutes: 12,
    imageUrl: Ecom,
    sections: [
      {
        title: "Design your return policy for logistics",
        body: [
          "A good policy sets expectations on eligibility, packaging, timeframes, and refund triggers.",
          "The clearer your rules are, the fewer support tickets you’ll receive — and the fewer disputes you’ll handle.",
        ],
        bullets: [
          "Define acceptable return condition (unused, tags intact, etc.)",
          "Set clear pickup/drop-off rules",
          "Define time window (7/14/30 days) by product type",
          "Automate status updates (requested → approved → in transit → received)",
        ],
      },
      {
        title: "Lower the cost per return (without being harsh)",
        body: [
          "The cheapest return is the one you prevent. The second cheapest is the one you consolidate efficiently.",
          "Route returns to the closest hub, bundle pickups, and avoid shipping a single item across the country if you don’t need to.",
        ],
        bullets: [
          "Consolidate pickups by area and day",
          "Route to nearest hub for inspection",
          "Offer exchanges/store credit as the default option",
          "Use returnless refunds for low-value items when fraud risk is low",
        ],
      },
      {
        title: "Prevent returns upstream (high impact)",
        body: [
          "Most returns happen because expectations didn’t match reality. Fix listing clarity and packaging protection to reduce damage and “not as described” returns.",
        ],
        bullets: [
          "Better product photos and size charts",
          "Clear specs and materials",
          "Packaging upgrades for fragile items",
          "Post-purchase education (setup tips, usage guidance)",
        ],
      },
      {
        title: "Operational return scorecard",
        body: [
          "Track a few metrics weekly. You’ll quickly see what’s driving cost and dissatisfaction.",
        ],
        bullets: [
          "Return rate (%) by SKU/category",
          "Return reason distribution",
          "Cost per return",
          "Time to refund",
          "Exchange rate vs refund rate",
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
    readTimeMinutes: 9,
    imageUrl: Cut,
    sections: [
      {
        title: "Quick wins you can implement immediately",
        body: [
          "Start with the highest-impact operational levers. These typically require little tooling and deliver results fast.",
          "Most savings come from reducing waste: wasted volume, wasted trips, wasted re-deliveries, and wasted handling.",
        ],
        bullets: [
          "Right-size packaging to reduce volumetric billing",
          "Consolidate pickups and reduce ad-hoc dispatches",
          "Negotiate lane-based pricing (don’t accept a flat rate for all lanes)",
          "Reduce re-deliveries with better contact validation",
          "Standardize cut-off times and publish them internally",
          "Reduce address corrections by validating during checkout",
          "Audit accessorial charges and challenge recurring ones",
        ],
      },
      {
        title: "Track a simple weekly scorecard",
        body: [
          "You can’t optimize what you don’t measure. Start small and review consistently.",
          "A weekly scorecard prevents slow cost creep and exposes recurring exceptions.",
        ],
        bullets: [
          "Cost per shipment",
          "Exception rate",
          "Re-delivery rate",
          "On-time delivery %",
          "Claims / damage rate",
        ],
      },
      {
        title: "When to switch carriers (and when not to)",
        body: [
          "Don’t switch carriers just because one lane is expensive. First confirm whether the issue is lane density, address quality, or service level mismatch.",
          "Switch only when performance is consistently poor or cost is not aligned with service outcomes.",
        ],
        bullets: [
          "Run a 2–4 week pilot before migrating fully",
          "Compare performance by lane and service level",
          "Negotiate improvements before switching",
        ],
      },
    ],
  },
];

export function getArticleById(id?: string) {
  if (!id) return undefined;
  return ARTICLES.find((a) => a.id === id);
}
