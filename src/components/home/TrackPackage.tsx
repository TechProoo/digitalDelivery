import { useState, useEffect, useRef } from "react";
import { Search, Truck, Box } from "lucide-react";

const mockStatuses = [
  { key: "booked", label: "Booked" },
  { key: "picked", label: "Picked up" },
  { key: "in_transit", label: "In Transit" },
  { key: "arriving", label: "Arriving at Hub" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function TrackPackage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [statusIndex, setStatusIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  function startMockTracking() {
    if (!trackingNumber) return;
    setLoading(true);
    setStatusIndex(0);

    let i = 0;
    timerRef.current = window.setInterval(() => {
      i++;
      if (i >= mockStatuses.length) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        setLoading(false);
        setStatusIndex(mockStatuses.length - 1);
        return;
      }
      setStatusIndex(i);
    }, 1200);
  }

  function clear() {
    setTrackingNumber("");
    setStatusIndex(null);
    setLoading(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
  }

  return (
    <section className="track_section my-12">
      <div className="flex justify-center items-center">
        <div className="badge_design text-center">
          DEMO
          <span></span>
        </div>
      </div>
      <div className="bg-(--bg-secondary) rounded-2xl mt-10 p-6 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-(--text-primary)">
              Track Your Shipment
            </h3>
            <p className="text-sm text-(--text-secondary) mt-2">
              Enter a tracking number to get real-time status updates.
            </p>

            <div className="mt-4 flex gap-3 items-center">
              <div className="flex-1">
                <input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number e.g. VL-2024-8847521"
                  className="w-full p-3 rounded-lg bg-(--bg-primary) border border-(--border-soft) text-(--text-primary)"
                />
              </div>
              <button
                onClick={startMockTracking}
                className="px-4 py-2 rounded-lg bg-(--accent-amber) text-(--text-inverse) font-semibold flex items-center gap-2"
                aria-label="Track"
              >
                <Search className="w-4 h-4" />
                Track
              </button>
              <button
                onClick={clear}
                className="px-3 py-2 rounded-lg bg-transparent border border-(--border-soft) text-(--text-secondary)"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-(--bg-primary) p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-(--accent-teal)/10">
                  <Truck className="w-6 h-6 text-(--accent-teal)" />
                </div>
                <div>
                  <div className="text-xs text-(--text-tertiary)">Status</div>
                  <div className="text-sm font-semibold text-(--text-primary)">
                    {statusIndex === null
                      ? "No tracking"
                      : mockStatuses[statusIndex].label}
                  </div>
                </div>
              </div>

                  <div className="mt-4">
                <div className="h-2 bg-(--bg-primary) rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-(--accent-amber) via-(--accent-teal) to-(--accent-sky) transition-width duration-700"
                    style={{
                      width: `${
                        statusIndex === null
                          ? 0
                          : ((statusIndex + 1) / mockStatuses.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-(--text-tertiary)">
                  {loading
                    ? "Updating..."
                    : statusIndex === null
                    ? "—"
                    : "Last updated just now"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-(--text-primary)">
            Recent checkpoints
          </h4>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {mockStatuses.map((s, idx) => (
              <div
                key={s.key}
                className="flex items-center gap-3 p-3 rounded-lg bg-(--bg-primary)"
              >
                <div
                  className={`p-2 rounded-full ${
                      idx <= (statusIndex ?? -1)
                        ? "bg-(--accent-teal)"
                        : "bg-(--bg-secondary)"
                    }`}
                >
                  <Box className="w-4 h-4 text-(--text-primary)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-(--text-primary)">
                    {s.label}
                  </div>
                  <div className="text-xs text-(--text-tertiary)">
                    {idx <= (statusIndex ?? -1) ? "Completed" : "Pending"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
