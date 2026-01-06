import { Truck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const StepCard = ({ Icon, title, children }: any) => (
  <div className="flex flex-col items-start gap-4 rounded-lg border border-(--border-soft) bg-(--bg-secondary) p-6 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-(--bg-primary) text-(--accent-teal)">
      <Icon className="h-6 w-6" />
    </div>
    <h4 className="text-lg font-semibold text-(--text-primary)">{title}</h4>
    <p className="text-sm text-(--text-secondary)">{children}</p>
  </div>
);

export default function DeliveryFlow() {
  return (
    <section className="mx-auto my-12 max-w-6xl px-4 sm:px-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-(--text-primary) header">
          Simple, predictable deliveries
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-(--text-secondary)">
          Book a pickup, follow the journey and get proof of delivery — all from
          one place.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <StepCard Icon={Truck} title="Request a Quote">
          Tell us what you're sending and where — get a quick quote in seconds.
        </StepCard>

        <StepCard Icon={Clock} title="Schedule Pickup">
          Choose a convenient time and we'll pick up from your doorstep.
        </StepCard>

        <StepCard Icon={CheckCircle} title="Track & Deliver">
          Real-time tracking and instant delivery confirmation for every
          shipment.
        </StepCard>
      </div>

      <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-4">
        <Link
          to="/new-delivery"
          className="rounded-md bg-(--accent-teal) px-5 py-2 text-sm font-medium text-(--bg-primary) shadow-sm"
        >
          Get a Quote
        </Link>

        <Link
          to="/track-package"
          className="rounded-md border border-(--border-soft) px-5 py-2 text-sm font-medium text-(--text-primary)"
        >
          Track a Package
        </Link>
      </div>
    </section>
  );
}
