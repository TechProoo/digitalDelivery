import type { ReactNode } from "react";
import {
  CreditCard,
  FileText,
  Globe,
  Package,
  Rocket,
  Truck,
} from "lucide-react";

export type SupportCategoryId =
  | "shipments"
  | "billing"
  | "carriers"
  | "international"
  | "docs"
  | "getting-started";

export type SupportCategory = {
  id: SupportCategoryId;
  title: string;
  description: string;
  icon: ReactNode;
  accent: string;
};

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: "shipments",
    title: "Shipments",
    description: "Track, manage, and troubleshoot shipments",
    icon: <Package className="h-6 w-6" />,
    accent: "var(--accent-teal)",
  },
  {
    id: "billing",
    title: "Billing & Payments",
    description: "Invoices, payment methods, and refunds",
    icon: <CreditCard className="h-6 w-6" />,
    accent: "hsl(var(--success))",
  },
  {
    id: "carriers",
    title: "Carriers & Partners",
    description: "Partner registration and management",
    icon: <Truck className="h-6 w-6" />,
    accent: "#8b5cf6",
  },
  {
    id: "international",
    title: "International Shipping",
    description: "Customs, duties, and cross-border logistics",
    icon: <Globe className="h-6 w-6" />,
    accent: "var(--accent-amber)",
  },
  {
    id: "docs",
    title: "Documentation",
    description: "BOL, customs forms, and compliance",
    icon: <FileText className="h-6 w-6" />,
    accent: "#fb7185",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "New user guides and tutorials",
    icon: <Rocket className="h-6 w-6" />,
    accent: "#38bdf8",
  },
];

export function getSupportCategoryById(id: string | undefined | null) {
  if (!id) return null;
  return SUPPORT_CATEGORIES.find((c) => c.id === id) || null;
}
