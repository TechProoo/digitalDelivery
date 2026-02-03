export type SupportArticleSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type SupportArticle = {
  id: string;
  title: string;
  summary: string;
  categoryId:
    | "shipments"
    | "billing"
    | "carriers"
    | "international"
    | "docs"
    | "getting-started";
  lastUpdated: string; // ISO date string
  cta?: { label: string; to: string };
  sections: SupportArticleSection[];
};

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: "track-realtime",
    title: "How to track my shipment in real-time",
    summary:
      "Learn where to find your tracking ID, how live updates work, and what to do if tracking hasn’t updated yet.",
    categoryId: "shipments",
    lastUpdated: "2026-02-03",
    cta: { label: "Open Tracking", to: "/dashboard/track" },
    sections: [
      {
        title: "Where to find your Tracking ID",
        body: [
          "Your Tracking ID is created when you book a shipment.",
          "You can find it in your Orders page, in booking confirmations, and on the shipment details screen.",
        ],
        bullets: [
          "Go to Dashboard → Orders",
          "Open the shipment details",
          "Copy the Tracking ID exactly as shown",
        ],
      },
      {
        title: "How real-time updates work",
        body: [
          "Tracking events come from status updates and checkpoints recorded by the platform.",
          "When a shipment changes status (for example: In Transit → Out for Delivery), it appears on your timeline.",
        ],
        bullets: [
          "Status updates reflect the shipment’s current stage",
          "Checkpoints show location-based progress",
          "Notes may provide extra context from support/admin",
        ],
      },
      {
        title: "If tracking is not updating",
        body: [
          "Sometimes updates can be delayed due to network issues, handoffs, or pending scan events.",
          "If your shipment hasn’t updated for a long time, contact support with your Tracking ID.",
        ],
        bullets: [
          "Refresh after a few minutes",
          "Confirm you’re using the correct Tracking ID",
          "If there’s no update within 24 hours, contact support",
        ],
      },
    ],
  },
  {
    id: "rates-quotes",
    title: "Understanding shipping rates and quotes",
    summary:
      "What affects pricing, how estimates are calculated, and how to avoid common quoting mistakes.",
    categoryId: "billing",
    lastUpdated: "2026-02-03",
    cta: { label: "View Resources", to: "/resources" },
    sections: [
      {
        title: "What affects a shipping quote",
        body: [
          "Quotes typically depend on distance, package size/weight, service level, and any special handling.",
          "International shipments may include customs-related costs depending on destination rules.",
        ],
        bullets: [
          "Pickup and destination locations",
          "Weight and dimensions (volumetric weight may apply)",
          "Package type and service type",
          "Optional add-ons (insurance, priority handling)",
        ],
      },
      {
        title: "Best practices for accurate pricing",
        body: [
          "To avoid price changes later, use the most accurate package details possible.",
          "If you’re unsure about size/weight, measure before booking.",
        ],
        bullets: [
          "Measure dimensions in the same unit used on the form",
          "Round weight conservatively (don’t underestimate)",
          "Double-check pickup/destination spelling",
        ],
      },
      {
        title: "Why a quote can change",
        body: [
          "If the actual package differs from what was entered, the final amount may be updated.",
          "Some routes may also change due to operational constraints.",
        ],
      },
    ],
  },
  {
    id: "customs-clearance",
    title: "Customs clearance requirements explained",
    summary:
      "A simple guide to what customs needs, common delays, and how to reduce clearance time.",
    categoryId: "international",
    lastUpdated: "2026-02-03",
    cta: { label: "International Resources", to: "/resources" },
    sections: [
      {
        title: "Common documents",
        body: [
          "Customs requirements vary by destination and goods category.",
          "As a baseline, most international shipments need clear item descriptions and commercial documentation.",
        ],
        bullets: [
          "Commercial invoice (for goods)",
          "Packing list",
          "Receiver identification where applicable",
          "Any product-specific certificates/permits",
        ],
      },
      {
        title: "Common reasons for delays",
        body: [
          "Delays are often caused by missing information or mismatch between declared value and items.",
          "Providing accurate descriptions upfront helps prevent extra inspection.",
        ],
        bullets: [
          "Missing/incorrect product descriptions",
          "Unclear item value or quantity",
          "Restricted items requiring permits",
        ],
      },
      {
        title: "Tips to speed up clearance",
        body: [
          "Use consistent names/addresses and ensure the receiver can be reached quickly.",
          "If customs requests more info, respond as soon as possible.",
        ],
      },
    ],
  },
  {
    id: "damage-claim",
    title: "How to file a damage claim",
    summary:
      "What we need to investigate damage, and how to submit a complete claim quickly.",
    categoryId: "shipments",
    lastUpdated: "2026-02-03",
    cta: { label: "Contact Support", to: "/contact" },
    sections: [
      {
        title: "Before you submit",
        body: [
          "If a package arrives damaged, keep the packaging and contents as-is until you document everything.",
          "Clear evidence helps us resolve your claim faster.",
        ],
        bullets: [
          "Take photos of the outer packaging",
          "Take photos of the damaged item(s)",
          "Keep labels visible in photos",
          "Write down what happened and when you received it",
        ],
      },
      {
        title: "What to include in your message",
        body: [
          "Send your Tracking ID and a short explanation.",
          "Attach images and, if available, any delivery notes.",
        ],
        bullets: [
          "Tracking ID",
          "Delivery date/time",
          "Photos (packaging + item)",
          "Short description of damage",
        ],
      },
      {
        title: "What happens next",
        body: [
          "Our team reviews the evidence and the shipment timeline.",
          "We may request additional details if something is unclear.",
        ],
      },
    ],
  },
  {
    id: "notifications",
    title: "Setting up automatic notifications",
    summary:
      "How shipment updates are delivered, and what to check if you are missing notifications.",
    categoryId: "getting-started",
    lastUpdated: "2026-02-03",
    sections: [
      {
        title: "What notifications you can receive",
        body: [
          "Notifications may include booking confirmations, status changes, and delivery updates.",
          "Availability depends on your account and shipment type.",
        ],
      },
      {
        title: "If you are not receiving updates",
        body: [
          "First confirm the email/phone on your account is correct.",
          "Check spam/junk folders and ensure your device can receive messages.",
        ],
        bullets: [
          "Confirm account email/phone",
          "Check spam/junk",
          "Try logging out and back in",
          "Contact support if it persists",
        ],
      },
    ],
  },
  {
    id: "multi-shipments",
    title: "Managing multiple shipments at once",
    summary:
      "Tips for organizing, tracking, and exporting details when you have many shipments.",
    categoryId: "shipments",
    lastUpdated: "2026-02-03",
    cta: { label: "Open Orders", to: "/dashboard/orders" },
    sections: [
      {
        title: "Keep your shipments organized",
        body: [
          "Use consistent naming and reference numbers in your notes.",
          "For teams, share tracking IDs and expected timelines internally.",
        ],
        bullets: [
          "Store Tracking IDs in one place",
          "Confirm receiver phone numbers",
          "Review timeline events to spot delays early",
        ],
      },
      {
        title: "Troubleshooting in bulk",
        body: [
          "If several shipments show delays, compare route and service type first.",
          "Contact support with multiple tracking IDs in a single message for faster handling.",
        ],
      },
    ],
  },
];

export function getSupportArticleById(id: string | undefined | null) {
  if (!id) return null;
  return SUPPORT_ARTICLES.find((a) => a.id === id) || null;
}
