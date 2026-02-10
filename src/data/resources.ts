import ImgBoat from "../assets/images (1) (1).jpeg";
import ImgServices from "../assets/images (10) (1).jpeg";
import Img from "../assets/images (12) (1).jpeg";
import Img1 from "../assets/images (15) (1).jpeg";
import Img2 from "../assets/images (16) (1).jpeg";
import Img3 from "../assets/images (17) (1).jpeg";

export type ResourceType = "Article" | "Guide" | "Whitepaper" | "Case Study";

export type ResourceCategory =
  | "Technology"
  | "Sustainability"
  | "Operations"
  | "Strategy"
  | "Compliance"
  | "E-Commerce"
  | "Specialized"
  | "Industry"
  | "Guides";

export type ResourceItem = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTimeMinutes: number;
  category: ResourceCategory;
  type: ResourceType;
  imageUrl: string;
  cardVariant?: "text" | "image";
};

export const ALL_CATEGORIES: Array<"All" | ResourceCategory> = [
  "All",
  "Technology",
  "Sustainability",
  "Operations",
  "Strategy",
  "Compliance",
  "E-Commerce",
  "Specialized",
  "Industry",
  "Guides",
];

export const ALL_TYPES: Array<"All" | ResourceType> = [
  "All",
  "Article",
  "Guide",
  "Whitepaper",
  "Case Study",
];

export const RESOURCES: ResourceItem[] = [
  {
    id: "freight-rate-negotiation",
    title: "Freight Rate Negotiation: Strategies for Better Contracts",
    excerpt:
      "Learn proven negotiation tactics to secure competitive freight rates and build long-term carrier partnerships.",
    author: "Mark Thompson",
    readTimeMinutes: 8,
    category: "Strategy",
    type: "Article",
    imageUrl: Img,
    cardVariant: "text",
  },
  {
    id: "intermodal-transportation",
    title: "Intermodal Transportation: Optimizing Multi-Modal Shipments",
    excerpt:
      "Maximize efficiency and reduce costs by combining rail, truck, and ocean freight into a single optimized strategy.",
    author: "Steven Lee",
    readTimeMinutes: 10,
    category: "Operations",
    type: "Article",
    imageUrl: Img1,
    cardVariant: "text",
  },
  {
    id: "hazardous-materials-shipping",
    title: "Hazardous Materials Shipping: Compliance and Safety Guide",
    excerpt:
      "Navigate the complex regulations around hazmat transportation with practical compliance and safety best practices.",
    author: "Rachel Green",
    readTimeMinutes: 14,
    category: "Compliance",
    type: "Guide",
    imageUrl: Img2,
    cardVariant: "text",
  },
  {
    id: "real-time-visibility",
    title: "Real-Time Visibility: Transforming Supply Chain Transparency",
    excerpt:
      "How IoT sensors, GPS tracking, and data analytics are revolutionizing shipment visibility and exception management.",
    author: "Chris Morgan",
    readTimeMinutes: 7,
    category: "Technology",
    type: "Article",
    imageUrl: Img3,
    cardVariant: "image",
  },
  {
    id: "peak-season-logistics",
    title: "Peak Season Logistics: Preparing for Holiday Shipping Surges",
    excerpt:
      "Strategic planning and capacity management techniques to ensure smooth operations during peak demand periods.",
    author: "Nancy White",
    readTimeMinutes: 8,
    category: "Operations",
    type: "Case Study",
    imageUrl: ImgServices,
    cardVariant: "image",
  },
  {
    id: "electric-vehicles-freight",
    title: "Electric Vehicles in Freight: The Road to Zero Emissions",
    excerpt:
      "Explore the current state of electric trucks, charging infrastructure, and the timeline for large-scale adoption.",
    author: "Dr. James Carter",
    readTimeMinutes: 12,
    category: "Sustainability",
    type: "Whitepaper",
    imageUrl: ImgBoat,
    cardVariant: "image",
  },
];

export function getResourceById(id: string) {
  return RESOURCES.find((r) => r.id === id);
}
