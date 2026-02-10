import type { SupportCategoryId } from "./supportCategories";

export type SupportArticleSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type SupportArticle = {
  id: string;
  title: string;
  summary: string;
  categoryId: SupportCategoryId;
  lastUpdated: string; // ISO date string
  cta?: { label: string; to: string };
  sections: SupportArticleSection[];
};

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: "track-realtime",
    title: "How to track my shipment in real-time",
    summary:
      "Find your Tracking ID, understand live status updates, and know what to do if tracking pauses or looks wrong.",
    categoryId: "shipments",
    lastUpdated: "2026-02-03",
    cta: { label: "Open Tracking", to: "/dashboard/track" },
    sections: [
      {
        title: "Where to find your Tracking ID",
        body: [
          "Your Tracking ID is generated right after you successfully book a shipment.",
          "You can find it inside your Orders page, your booking confirmation, and the shipment details screen.",
          "If you booked for someone else, share the Tracking ID with the receiver so they can follow progress too.",
        ],
        bullets: [
          "Go to Dashboard → Orders",
          "Open the shipment details",
          "Copy the Tracking ID exactly as shown (avoid extra spaces)",
          "Paste it on the Track page to view the live timeline",
        ],
      },
      {
        title: "How real-time tracking works",
        body: [
          "Tracking updates are created from shipment status changes and checkpoint scans.",
          "Each time your package moves to a new stage (for example: Booked → Picked Up → In Transit → Out for Delivery), the timeline updates.",
          "Some events are location-based, while others are operational updates from the carrier or support team.",
        ],
        bullets: [
          "Status shows the shipment’s current stage",
          "Checkpoints show progress on the route",
          "Notes can include extra context (e.g., ‘awaiting pickup confirmation’)",
        ],
      },
      {
        title: "Common statuses and what they mean",
        body: [
          "Understanding statuses helps you know what’s normal and what needs attention.",
        ],
        bullets: [
          "Booked: your shipment request is created and confirmed",
          "Picked Up: the package has been collected from the pickup address",
          "In Transit: it’s moving between hubs or on-route to the destination",
          "Out for Delivery: the rider/driver is heading to the receiver",
          "Delivered: delivery completed (sometimes with proof of delivery)",
        ],
      },
      {
        title: "If tracking is not updating",
        body: [
          "Sometimes tracking pauses due to network delays, hub handoffs, pending scans, or operational updates batching.",
          "If the shipment hasn’t updated for a long time, contact support with your Tracking ID so we can check the latest carrier activity.",
        ],
        bullets: [
          "Refresh after a few minutes",
          "Confirm you’re using the correct Tracking ID",
          "If there’s no update within 24 hours, contact support",
          "If you suspect a wrong address or receiver phone, report it immediately",
        ],
      },
    ],
  },

  {
    id: "rates-quotes",
    title: "Understanding shipping rates and quotes",
    summary:
      "What affects pricing, how estimates work (including chatbot estimates), and when you’ll receive your final real quote via WhatsApp.",
    categoryId: "billing",
    lastUpdated: "2026-02-10",
    cta: { label: "View Resources", to: "/resources" },
    sections: [
      {
        title: "Estimated quote vs real quote (important)",
        body: [
          "Our platform can show estimates so you can plan ahead — but final pricing is confirmed after your shipment details are reviewed.",
          "You may receive an estimated quote at the final stage of creating your delivery request, based on the info you entered.",
          "Our chatbot can also calculate an estimated delivery price, using your pickup, destination, and item details.",
          "However, your real live quote and final price are confirmed on WhatsApp (or by support), especially for items with uncertain weight/size or special handling needs.",
        ],
        bullets: [
          "Estimated quote = quick planning price (not final)",
          "Real quote = confirmed price after review (final)",
          "Final confirmation is sent on WhatsApp",
        ],
      },
      {
        title: "What affects a shipping quote",
        body: [
          "Shipping prices are influenced by distance, size/weight, service type, and handling requirements.",
          "International deliveries may include customs, documentation, and destination-specific charges depending on the route and product type.",
        ],
        bullets: [
          "Pickup and destination locations",
          "Weight and dimensions (volumetric weight may apply)",
          "Item type (fragile, liquid, electronics, perishable, etc.)",
          "Speed/service level (standard vs priority)",
          "Add-ons (insurance, special packaging, priority handling)",
          "Customs/doc requirements for international shipments",
        ],
      },
      {
        title: "How estimates are calculated",
        body: [
          "Estimates use the information you provide: addresses, package details, and delivery preferences.",
          "If any detail changes later (especially weight/dimensions), your final price may change.",
          "To get the closest estimate possible, enter accurate dimensions and a realistic weight.",
        ],
        bullets: [
          "Measure length × width × height",
          "Use the correct unit (cm/inches) consistently",
          "Avoid underestimating weight—round slightly up",
          "Enter the correct destination (wrong city/state changes pricing)",
        ],
      },
      {
        title: "Why your final price can change",
        body: [
          "Final prices can change if the actual item differs from what was entered during the request.",
          "This is common when packages are larger/heavier than declared, or need special handling.",
        ],
        bullets: [
          "Actual package weight/dimensions differ from your entry",
          "Item requires special handling or packaging",
          "Pickup/delivery location is updated",
          "Route or carrier constraints require adjustments",
        ],
      },
      {
        title: "How to get a real quote fast (WhatsApp checklist)",
        body: [
          "If you want the real confirmed quote quickly, send the details below on WhatsApp.",
          "The clearer your message is, the faster we can confirm the exact price.",
        ],
        bullets: [
          "Pickup location (full address + landmark)",
          "Delivery location (full address + landmark)",
          "Item type (e.g., documents, electronics, food, clothing)",
          "Weight + dimensions (or a photo beside a ruler/hand for size reference)",
          "Quantity and packaging type (box, sack, envelope, crate)",
          "Delivery urgency (standard vs urgent)",
        ],
      },
    ],
  },

  {
    id: "customs-clearance",
    title: "Customs clearance requirements explained",
    summary:
      "Know what customs needs, what causes delays, and how to prepare clean documentation for faster international deliveries.",
    categoryId: "international",
    lastUpdated: "2026-02-03",
    cta: { label: "International Resources", to: "/resources" },
    sections: [
      {
        title: "Common documents (baseline)",
        body: [
          "Customs requirements vary by destination country, product type, and declared value.",
          "As a baseline, most international shipments need clear item descriptions and commercial documentation.",
          "If you’re unsure, contact support before shipment pickup—missing paperwork is the #1 cause of delays.",
        ],
        bullets: [
          "Commercial invoice (for goods)",
          "Packing list",
          "Receiver identification where applicable",
          "Any product-specific certificates/permits",
          "Accurate declared value and currency",
        ],
      },
      {
        title: "What customs checks for",
        body: [
          "Customs primarily verifies that the shipment details match what is physically shipped and what is legally allowed to enter the destination country.",
          "Clear descriptions reduce inspections and speed up clearance.",
        ],
        bullets: [
          "Correct item name (avoid vague terms like “stuff” or “gift”)",
          "Declared value matches item type and quantity",
          "No restricted/prohibited goods",
          "Valid permits for regulated items",
        ],
      },
      {
        title: "Common reasons for delays",
        body: [
          "Delays usually happen when information is missing, unclear, or inconsistent across documents.",
          "If customs requests extra info, fast response from the sender/receiver helps a lot.",
        ],
        bullets: [
          "Missing/incorrect product descriptions",
          "Unclear value, quantity, or currency",
          "Restricted items needing permits",
          "Receiver not reachable for confirmation",
        ],
      },
      {
        title: "Tips to speed up clearance",
        body: [
          "Use consistent names/addresses and make sure the receiver can be reached quickly.",
          "If customs asks for clarification, respond immediately to avoid storage delays.",
        ],
        bullets: [
          "Keep receiver phone/email active",
          "Use the same shipper/consignee details everywhere",
          "Declare accurate value and quantity",
          "Avoid prohibited items for the destination country",
        ],
      },
    ],
  },

  {
    id: "damage-claim",
    title: "How to file a damage claim",
    summary:
      "What we need to investigate damage, how to submit a complete claim, and how to avoid delays during review.",
    categoryId: "shipments",
    lastUpdated: "2026-02-03",
    cta: { label: "Contact Support", to: "/contact" },
    sections: [
      {
        title: "Before you submit",
        body: [
          "If a package arrives damaged, keep the packaging and contents as-is until you document everything.",
          "Clear evidence helps us resolve your claim faster and reduces back-and-forth.",
        ],
        bullets: [
          "Take photos of the outer packaging (all sides)",
          "Take close-up photos of the damaged item(s)",
          "Keep labels visible in photos",
          "If possible, take a short video showing the damage",
          "Write down what happened and when you received it",
        ],
      },
      {
        title: "What to include in your message",
        body: [
          "Send your Tracking ID and a short explanation of what happened.",
          "Attach images and, if available, delivery notes or proof-of-delivery details.",
        ],
        bullets: [
          "Tracking ID",
          "Delivery date/time",
          "Photos (packaging + item)",
          "Short description of damage",
          "Any delivery notes or driver/rider remarks",
        ],
      },
      {
        title: "What happens next",
        body: [
          "We review your evidence alongside the shipment timeline and handling notes.",
          "If anything is unclear, we may request additional information before resolution.",
        ],
        bullets: [
          "We confirm shipment status and handling events",
          "We compare packaging vs damage pattern",
          "We may request more photos or item value proof",
        ],
      },
    ],
  },

  {
    id: "notifications",
    title: "Setting up automatic notifications",
    summary:
      "How shipment updates are delivered, what types of notifications exist, and what to do if you’re missing alerts.",
    categoryId: "getting-started",
    lastUpdated: "2026-02-03",
    sections: [
      {
        title: "What notifications you can receive",
        body: [
          "Notifications can include booking confirmations, pickup updates, status changes, and delivery completion alerts.",
          "Some notifications depend on shipment type and your account settings.",
        ],
        bullets: [
          "Booking confirmation",
          "Pickup confirmation",
          "In-transit updates",
          "Out-for-delivery alert",
          "Delivered confirmation",
        ],
      },
      {
        title: "How to make sure notifications reach you",
        body: [
          "Check that your email and phone number are correct on your account.",
          "On mobile, ensure notification permissions are enabled for your browser/app.",
        ],
        bullets: [
          "Confirm account email/phone",
          "Check spam/junk folders",
          "Whitelist our sender address (if you use email filters)",
          "Ensure your device has notification permissions enabled",
        ],
      },
      {
        title: "If you are not receiving updates",
        body: [
          "Sometimes messages fail due to network issues, wrong contact details, or notification permissions.",
          "If it continues after checking your settings, contact support with your Tracking ID.",
        ],
        bullets: [
          "Log out and log back in",
          "Try another browser/device",
          "Confirm your email/phone is correct",
          "Contact support if it persists",
        ],
      },
    ],
  },

  {
    id: "multi-shipments",
    title: "Managing multiple shipments at once",
    summary:
      "Organize shipments efficiently, track progress without missing updates, and troubleshoot issues in bulk.",
    categoryId: "shipments",
    lastUpdated: "2026-02-03",
    cta: { label: "Open Orders", to: "/dashboard/orders" },
    sections: [
      {
        title: "Keep your shipments organized",
        body: [
          "When you have many shipments, structure matters. Use consistent naming and reference numbers in your notes.",
          "If a team is involved, share tracking IDs and expected timelines in a shared channel or spreadsheet.",
        ],
        bullets: [
          "Store Tracking IDs in one place (sheet/CRM/notes)",
          "Use internal reference numbers (e.g., INV-2031, Order-55)",
          "Confirm receiver phone numbers before pickup",
          "Review timeline events daily to spot delays early",
        ],
      },
      {
        title: "Bulk troubleshooting (faster support)",
        body: [
          "If several shipments show delays, compare route and service type first—some routes update less frequently.",
          "When messaging support, send multiple tracking IDs in one message to reduce back-and-forth.",
        ],
        bullets: [
          "Group tracking IDs by route/service level",
          "Send issues + tracking IDs in one message",
          "Mention what you expect (pickup, delivery, address update, etc.)",
        ],
      },
      {
        title: "When to escalate",
        body: [
          "If high-value or time-sensitive shipments show no movement for too long, escalate early.",
        ],
        bullets: [
          "No update after 24 hours",
          "Wrong address/receiver phone",
          "Time-sensitive or medical deliveries",
          "Repeated delivery attempts failing",
        ],
      },
    ],
  },

  {
    id: "carrier-onboarding",
    title: "Carriers & partners: onboarding and requirements",
    summary:
      "What we need to set up your carrier profile, common verification issues, and how to get activated faster.",
    categoryId: "carriers",
    lastUpdated: "2026-02-10",
    cta: { label: "Contact Support", to: "/contact" },
    sections: [
      {
        title: "What you should prepare",
        body: [
          "Onboarding is fastest when your submitted details match your official documentation.",
          "If you operate in multiple locations, start with one primary location first—then expand after verification.",
        ],
        bullets: [
          "Legal business name and registration details",
          "Operating address and contact information",
          "Service coverage (regions, routes, delivery types)",
          "Proof of insurance (where applicable)",
          "Billing contact and payout details",
          "Support contact (phone/WhatsApp/email)",
        ],
      },
      {
        title: "Common onboarding issues (and how to avoid them)",
        body: [
          "Most onboarding delays come from mismatched business details or missing contacts for verification.",
          "Double-check spellings, phone numbers, and document validity before submitting.",
        ],
        bullets: [
          "Mismatched business name/address",
          "Expired or incomplete documents",
          "Unreachable phone/email for verification",
          "Missing service coverage details",
        ],
      },
      {
        title: "Next steps",
        body: [
          "When you’re ready, contact support with your company name and the services you provide.",
          "We’ll confirm eligibility and guide you through activation steps.",
        ],
        bullets: [
          "Send company name + service coverage",
          "Share docs for verification",
          "Confirm payout details",
          "Receive activation confirmation",
        ],
      },
    ],
  },

  {
    id: "bol-basics",
    title: "Bill of Lading (BOL): what it is and when you need it",
    summary:
      "A practical overview of BOLs, what to verify before pickup, and what to do if shipment details are incorrect.",
    categoryId: "docs",
    lastUpdated: "2026-02-10",
    cta: { label: "View Resources", to: "/resources" },
    sections: [
      {
        title: "What a BOL is",
        body: [
          "A Bill of Lading (BOL) is a shipping document that describes the shipment and serves as a receipt and contract of carriage.",
          "For many freight moves, it’s required at pickup and referenced during delivery, audits, or claims.",
          "Treat it like a ‘source of truth’—details should match what’s physically being shipped.",
        ],
      },
      {
        title: "What to verify before pickup",
        body: [
          "Confirm the shipment details match what is actually being shipped.",
          "Incorrect details can lead to delays, rework, unexpected charges, or claim disputes later.",
        ],
        bullets: [
          "Shipper/consignee names and addresses",
          "Package count and packaging type",
          "Weight and dimensions (if listed)",
          "Special handling notes (fragile, temperature control)",
          "Reference numbers used by your team",
          "Declared value (where applicable)",
        ],
      },
      {
        title: "If information is wrong",
        body: [
          "If you notice an error, contact support as soon as possible with your Tracking ID and the correction.",
          "If the shipment is already in transit, some fields may be locked depending on operational constraints.",
        ],
        bullets: [
          "Share Tracking ID + incorrect field + correct value",
          "Send photo evidence (if applicable)",
          "Escalate quickly if it affects delivery address/receiver contact",
        ],
      },
    ],
  },
];

export function getSupportArticleById(id: string | undefined | null) {
  if (!id) return null;
  return SUPPORT_ARTICLES.find((a) => a.id === id) || null;
}
