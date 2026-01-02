import { Timeline } from "./timeline";
import { Package, Truck, Send, Home } from "lucide-react";

import type { TimelineItem } from "./timeline";

export default function DemoTimeline() {
  const items: TimelineItem[] = [
    {
      id: "1",
      title: "Book Your Delivery",
      description: "Share your pickup and delivery details with us",
      status: "completed",
      icon: <Package className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "We Pick Up",
      description: "We collect your items from your doorstep",
      status: "completed",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Fast Dispatch",
      description: "We dispatch via your preferred transport method",
      status: "active",
      icon: <Send className="h-5 w-5" />,
    },
    {
      id: "4",
      title: "Safe Delivery",
      description: "Your package arrives safely at its destination",
      status: "pending",
      icon: <Home className="h-5 w-5" />,
    },
  ];
  return (
    <div className="w-full">
      <Timeline
        items={items}
        variant="spacious"
        className="text-xl md:text-2xl"
      />
    </div>
  );
}
