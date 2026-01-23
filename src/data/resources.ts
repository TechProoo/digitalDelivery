import ImgRoad from "../assets/road.jpg";
import ImgBoat from "../assets/boat.jpg";
import ImgServices from "../assets/services_img.jpg";
import ImgDoor from "../assets/door.jpg";

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
    imageUrl: ImgServices,
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
    imageUrl: ImgBoat,
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
    imageUrl: ImgDoor,
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
    imageUrl: ImgBoat,
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
    imageUrl: ImgRoad,
    cardVariant: "image",
  },
];

export function getResourceById(id: string) {
  return RESOURCES.find((r) => r.id === id);
}
