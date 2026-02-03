import type { ComponentType } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import RetailImg from "../assets/services_img.jpg";
import ManufacturingImg from "../assets/road.jpg";
import CpgImg from "../assets/door.jpg";

export type SuccessMetric = {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
};

export type SuccessStorySection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type SuccessStory = {
  id: string;
  tag: string;
  company: string;
  title: string;
  summary: string;
  image: string;
  lastUpdated: string; // ISO date
  metrics: [SuccessMetric, SuccessMetric];
  sections: SuccessStorySection[];
};

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "lagos-retail-fulfillment",
    tag: "E‑commerce",
    company: "Lagos Fashion Retailer",
    title: "Cut delivery delays with smart dispatch + live tracking",
    summary:
      "A growing retailer reduced missed deliveries by improving address validation, customer contact checks, and proactive timeline updates.",
    image: RetailImg,
    lastUpdated: "2026-02-03",
    metrics: [
      { icon: Clock, value: "-31%", label: "Fewer delayed deliveries" },
      { icon: TrendingUp, value: "+24%", label: "Repeat customer orders" },
    ],
    sections: [
      {
        title: "The challenge",
        body: [
          "As order volume increased, customer support requests also grew — mostly around ‘Where is my package?’ and missed deliveries due to unreachable receivers.",
          "The team needed a clearer shipment timeline and a repeatable dispatch process.",
        ],
      },
      {
        title: "What we changed",
        body: [
          "We standardized booking details (receiver phone, pickup/destination) and used shipment timeline events to keep customers informed.",
        ],
        bullets: [
          "Verified receiver phone before dispatch",
          "Reduced address ambiguity using consistent location formatting",
          "Used timeline updates (status + checkpoints) for visibility",
        ],
      },
      {
        title: "Result",
        body: [
          "Fewer failed delivery attempts and fewer support escalations. Customers could self-serve updates from the tracking view, and delivery performance improved as volume scaled.",
        ],
      },
    ],
  },
  {
    id: "abuja-manufacturing-inbound",
    tag: "Manufacturing",
    company: "Abuja Electronics Manufacturer",
    title: "Improved inbound planning with clearer checkpoints",
    summary:
      "A manufacturer reduced production downtime by tracking inbound parts with predictable checkpoints and earlier exception detection.",
    image: ManufacturingImg,
    lastUpdated: "2026-02-03",
    metrics: [
      { icon: MapPin, value: "6", label: "Standardized checkpoints" },
      {
        icon: ArrowDownRight,
        value: "-18%",
        label: "Fewer stock-out incidents",
      },
    ],
    sections: [
      {
        title: "The challenge",
        body: [
          "Inbound parts were arriving unpredictably, which made it difficult to plan production runs.",
          "When delays happened, the team often found out late.",
        ],
      },
      {
        title: "What we changed",
        body: [
          "We aligned shipping updates to meaningful operational milestones and made exceptions visible earlier.",
        ],
        bullets: [
          "Defined consistent checkpoint locations per route",
          "Added clearer timeline notes for delay reasons",
          "Used delivery estimates to prioritize urgent parts",
        ],
      },
      {
        title: "Result",
        body: [
          "The team gained a predictable view of inbound shipments, reduced unplanned downtime, and improved coordination between procurement and operations.",
        ],
      },
    ],
  },
  {
    id: "cold-chain-cpg",
    tag: "Cold Chain",
    company: "Fresh Foods Distributor",
    title: "Higher on-time performance with proactive exceptions",
    summary:
      "A food distributor improved on-time deliveries by standardizing handoffs and using timeline notes to resolve issues faster.",
    image: CpgImg,
    lastUpdated: "2026-02-03",
    metrics: [
      { icon: ShieldCheck, value: "99.2%", label: "On-time delivery" },
      { icon: ArrowUpRight, value: "+15%", label: "Faster issue resolution" },
    ],
    sections: [
      {
        title: "The challenge",
        body: [
          "Perishable deliveries require reliable timing and clear communication when something goes wrong.",
          "Late updates made it hard to coordinate receivers and storage.",
        ],
      },
      {
        title: "What we changed",
        body: [
          "We focused on consistent shipment events and quicker escalation when delays were detected.",
        ],
        bullets: [
          "Standardized status transitions for handoffs",
          "Captured delivery blockers as timeline notes",
          "Reduced repeated customer calls with self-serve tracking",
        ],
      },
      {
        title: "Result",
        body: [
          "Improved delivery reliability and faster resolution when issues happened, with less manual follow-up required from the team.",
        ],
      },
    ],
  },
];

export function getSuccessStoryById(id: string | undefined | null) {
  if (!id) return null;
  return SUCCESS_STORIES.find((s) => s.id === id) || null;
}
