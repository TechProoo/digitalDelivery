import { useState, useEffect } from "react";
import { Sidebar } from "../components/dashboard/sidebar";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Home,
  AlertCircle,
  Calendar,
  User,
  ArrowRight,
  Phone,
} from "lucide-react";

interface TrackingData {
  trackingNumber: string;
  status: "in-transit" | "delivered" | "pending" | "failed";
  currentLocation: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  packageType: string;
  weight: string;
  service: string;
  timeline: {
    title: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
  sender: {
    name: string;
    phone: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
}

// Sample tracking data
const sampleTrackingData: { [key: string]: TrackingData } = {
  "DD-2024-001": {
    trackingNumber: "DD-2024-001",
    status: "in-transit",
    currentLocation: "Port Harcourt Hub",
    origin: "Lagos, Nigeria",
    destination: "Abuja, Nigeria",
    estimatedDelivery: "Jan 8, 2026",
    packageType: "Parcel",
    weight: "5.2 kg",
    service: "Express",
    timeline: [
      {
        title: "Order Received",
        location: "Lagos, Ikeja",
        date: "Jan 2, 2026",
        time: "09:30 AM",
        completed: true,
      },
      {
        title: "Package Processed",
        location: "Lagos Sorting Center",
        date: "Jan 2, 2026",
        time: "02:15 PM",
        completed: true,
      },
      {
        title: "In Transit",
        location: "Port Harcourt Hub",
        date: "Jan 4, 2026",
        time: "10:45 AM",
        completed: true,
      },
      {
        title: "Out for Delivery",
        location: "Abuja Distribution Center",
        date: "Jan 7, 2026",
        time: "08:00 AM",
        completed: false,
      },
      {
        title: "Delivered",
        location: "Abuja, Wuse",
        date: "Jan 8, 2026",
        time: "-- : --",
        completed: false,
      },
    ],
    sender: {
      name: "John Adebayo",
      phone: "+234 801 234 5678",
    },
    receiver: {
      name: "Sarah Okafor",
      phone: "+234 803 987 6543",
      address: "Plot 45, Cadastral Zone, Wuse, Abuja",
    },
  },
  "DD-2024-002": {
    trackingNumber: "DD-2024-002",
    status: "delivered",
    currentLocation: "Delivered",
    origin: "Shanghai, China",
    destination: "Lagos, Nigeria",
    estimatedDelivery: "Jan 3, 2026",
    packageType: "Container",
    weight: "2500 kg",
    service: "Standard",
    timeline: [
      {
        title: "Order Received",
        location: "Shanghai Port",
        date: "Dec 15, 2025",
        time: "11:00 AM",
        completed: true,
      },
      {
        title: "Customs Cleared",
        location: "Shanghai Port",
        date: "Dec 16, 2025",
        time: "03:30 PM",
        completed: true,
      },
      {
        title: "In Transit - Sea Freight",
        location: "Indian Ocean",
        date: "Dec 20, 2025",
        time: "06:00 AM",
        completed: true,
      },
      {
        title: "Arrived at Port",
        location: "Apapa Port, Lagos",
        date: "Jan 2, 2026",
        time: "02:15 PM",
        completed: true,
      },
      {
        title: "Delivered",
        location: "Lagos, Victoria Island",
        date: "Jan 3, 2026",
        time: "04:30 PM",
        completed: true,
      },
    ],
    sender: {
      name: "Li Wei Trading Co.",
      phone: "+86 138 1234 5678",
    },
    receiver: {
      name: "Chukwuma Industries Ltd",
      phone: "+234 802 345 6789",
      address: "12 Ahmadu Bello Way, Victoria Island, Lagos",
    },
  },
};

import { useSearchParams } from "react-router-dom";
import BottomNav from "../components/dashboard/bottom-nav";

export default function TrackPackage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSearch = (param?: string) => {
    const num = (param ?? trackingNumber).trim();
    if (!num) return;

    setIsSearching(true);
    setNotFound(false);

    // Simulate API call
    setTimeout(() => {
      const data = sampleTrackingData[num];
      if (data) {
        setTrackingData(data);
        setNotFound(false);
        setTrackingNumber(num);
      } else {
        setTrackingData(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 800);
  };

  useEffect(() => {
    const tnParam = searchParams.get("tn");
    if (tnParam) {
      handleSearch(tnParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "var(--status-delivered)";
      case "in-transit":
        return "var(--status-in-transit)";
      case "pending":
        return "var(--status-pending)";
      case "failed":
        return "var(--status-failed)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "delivered":
        return "rgba(46,196,182,0.15)";
      case "in-transit":
        return "rgba(78,168,222,0.15)";
      case "pending":
        return "rgba(244,162,97,0.15)";
      case "failed":
        return "rgba(239,71,111,0.15)";
      default:
        return "rgba(255,255,255,0.05)";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "in-transit":
        return Truck;
      case "pending":
        return Clock;
      case "failed":
        return AlertCircle;
      default:
        return Package;
    }
  };

  const StatusIcon = trackingData
    ? getStatusIcon(trackingData.status)
    : Package;

  return (
    <Sidebar>
      <div
        className="min-h-screen p-4 sm:p-6 lg:p-8"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2.5 sm:p-3 rounded-xl"
              style={{
                background: "var(--gradient-surface)",
                border: "1px solid var(--border-soft)",
              }}
            >
              <MapPin
                className="h-5 w-5 sm:h-6 sm:w-6"
                style={{ color: "var(--accent-teal)" }}
              />
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Track Shipment
              </h1>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                Enter your tracking number to get real-time updates
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-5xl mx-auto mb-6 sm:mb-8">
          <div
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: "var(--text-secondary)" }}
                />
                <input
                  type="text"
                  placeholder="Enter tracking number (e.g., DD-2024-001)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <button
                onClick={() => handleSearch()}
                disabled={isSearching || !trackingNumber.trim()}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap"
                style={{
                  background:
                    isSearching || !trackingNumber.trim()
                      ? "rgba(255,255,255,0.05)"
                      : "var(--accent-teal)",
                  color:
                    isSearching || !trackingNumber.trim()
                      ? "var(--text-secondary)"
                      : "var(--text-inverse)",
                  cursor:
                    isSearching || !trackingNumber.trim()
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-current border-t-transparent rounded-full" />
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Track</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Search Examples */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className="text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Try:
              </span>
              {Object.keys(sampleTrackingData).map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setTrackingNumber(code);
                    handleSearch(code);
                  }}
                  className="text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(23,199,189,0.1)",
                    border: "1px solid var(--accent-teal)",
                    color: "var(--accent-teal)",
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Not Found Message */}
        {notFound && (
          <div className="max-w-5xl mx-auto">
            <div
              className="p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center"
              style={{
                background: "rgba(239,71,111,0.1)",
                border: "1px solid var(--status-failed)",
              }}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(239,71,111,0.2)",
                }}
              >
                <AlertCircle
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  style={{ color: "var(--status-failed)" }}
                />
              </div>
              <h3
                className="text-lg sm:text-xl font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Tracking Number Not Found
              </h3>
              <p
                className="text-sm sm:text-base max-w-md mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                We couldn't find a shipment with tracking number "
                {trackingNumber}". Please check and try again.
              </p>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && (
          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-20 lg:pb-6">
            {/* Status Overview Card */}
            <div
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
              style={{
                background: "var(--gradient-surface)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-soft)",
                borderTop: `3px solid ${getStatusColor(trackingData.status)}`,
              }}
            >
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: getStatusBg(trackingData.status),
                    }}
                  >
                    <StatusIcon
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      style={{ color: getStatusColor(trackingData.status) }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Package
                        className="h-4 w-4"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <span
                        className="text-xs uppercase font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Tracking Number
                      </span>
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-bold truncate"
                      style={{ color: "var(--accent-amber)" }}
                    >
                      {trackingData.trackingNumber}
                    </h2>
                  </div>
                </div>
                <span
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase whitespace-nowrap"
                  style={{
                    background: getStatusBg(trackingData.status),
                    color: getStatusColor(trackingData.status),
                  }}
                >
                  {trackingData.status.replace("-", " ")}
                </span>
              </div>

              {/* Route Visualization */}
              <div
                className="p-4 sm:p-5 rounded-xl mb-6"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Origin */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(23,199,189,0.2)" }}
                      >
                        <MapPin
                          className="h-4 w-4"
                          style={{ color: "var(--accent-teal)" }}
                        />
                      </div>
                      <span
                        className="text-xs uppercase font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        From
                      </span>
                    </div>
                    <p
                      className="font-semibold text-sm sm:text-base truncate pl-10"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.origin}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 hidden sm:block">
                    <ArrowRight
                      className="h-6 w-6"
                      style={{ color: "var(--accent-teal)" }}
                    />
                  </div>

                  {/* Destination */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(244,162,97,0.2)" }}
                      >
                        <MapPin
                          className="h-4 w-4"
                          style={{ color: "var(--accent-amber)" }}
                        />
                      </div>
                      <span
                        className="text-xs uppercase font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        To
                      </span>
                    </div>
                    <p
                      className="font-semibold text-sm sm:text-base truncate pl-10"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.destination}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Location Highlight */}
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(23,199,189,0.12)",
                  border: "1px solid var(--accent-teal)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "var(--accent-teal)" }}
                  >
                    <MapPin
                      className="h-5 w-5"
                      style={{ color: "var(--text-inverse)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs uppercase mb-1 font-medium"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      Current Location
                    </div>
                    <div
                      className="font-semibold text-sm sm:text-base truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.currentLocation}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details & Timeline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Package Details */}
              <div
                className="lg:col-span-1 p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                style={{
                  background: "var(--gradient-surface)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <h3
                  className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Package
                    className="h-5 w-5"
                    style={{ color: "var(--accent-teal)" }}
                  />
                  Package Info
                </h3>

                <div className="space-y-4">
                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Type
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.packageType}
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Weight
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.weight}
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service Level
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.service}
                    </div>
                  </div>

                  <div
                    className="pt-4"
                    style={{ borderTop: "1px solid var(--border-soft)" }}
                  >
                    <div
                      className="text-xs uppercase mb-1.5 flex items-center gap-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Estimated Delivery
                    </div>
                    <div
                      className="font-bold text-base"
                      style={{ color: "var(--accent-amber)" }}
                    >
                      {trackingData.estimatedDelivery}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div
                className="lg:col-span-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                style={{
                  background: "var(--gradient-surface)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <h3
                  className="text-base sm:text-lg font-semibold mb-6 flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Clock
                    className="h-5 w-5"
                    style={{ color: "var(--accent-teal)" }}
                  />
                  Shipment Timeline
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {trackingData.timeline.map((event, index) => (
                    <div key={index} className="flex gap-3 sm:gap-4">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all"
                          style={{
                            background: event.completed
                              ? "var(--accent-teal)"
                              : "rgba(255,255,255,0.05)",
                            border: event.completed
                              ? "none"
                              : "2px solid var(--border-soft)",
                          }}
                        >
                          {event.completed ? (
                            <CheckCircle
                              className="h-4 w-4 sm:h-5 sm:w-5"
                              style={{ color: "var(--text-inverse)" }}
                            />
                          ) : (
                            <Clock
                              className="h-4 w-4 sm:h-5 sm:w-5"
                              style={{ color: "var(--text-secondary)" }}
                            />
                          )}
                        </div>
                        {index < trackingData.timeline.length - 1 && (
                          <div
                            className="w-0.5 h-12 sm:h-16 mt-2"
                            style={{
                              background: event.completed
                                ? "var(--accent-teal)"
                                : "var(--border-soft)",
                            }}
                          />
                        )}
                      </div>

                      {/* Event details */}
                      <div className="flex-1 pb-2 min-w-0">
                        <div
                          className="font-semibold mb-1.5 text-sm sm:text-base"
                          style={{
                            color: event.completed
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                          }}
                        >
                          {event.title}
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm mb-1">
                          <MapPin
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5 mt-0.5 shrink-0"
                            style={{
                              color: event.completed
                                ? "var(--accent-teal)"
                                : "var(--text-secondary)",
                            }}
                          />
                          <span
                            className="wrap-break-word"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {event.location}
                          </span>
                        </div>
                        <div
                          className="text-xs sm:text-sm flex items-center gap-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <Clock className="h-3 w-3" />
                          {event.date} • {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Sender */}
              <div
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                style={{
                  background: "var(--gradient-surface)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(23,199,189,0.15)" }}
                  >
                    <User
                      className="h-5 w-5"
                      style={{ color: "var(--accent-teal)" }}
                    />
                  </div>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Sender
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Name
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.sender.name}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 flex items-center gap-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Phone className="h-3 w-3" />
                      Phone
                    </div>
                    <a
                      href={`tel:${trackingData.sender.phone}`}
                      className="font-semibold text-sm hover:underline"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      {trackingData.sender.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Receiver */}
              <div
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                style={{
                  background: "var(--gradient-surface)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(244,162,97,0.15)" }}
                  >
                    <Home
                      className="h-5 w-5"
                      style={{ color: "var(--accent-amber)" }}
                    />
                  </div>
                  <h3
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Receiver
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Name
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.receiver.name}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 flex items-center gap-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Phone className="h-3 w-3" />
                      Phone
                    </div>
                    <a
                      href={`tel:${trackingData.receiver.phone}`}
                      className="font-semibold text-sm hover:underline"
                      style={{ color: "var(--accent-amber)" }}
                    >
                      {trackingData.receiver.phone}
                    </a>
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase mb-1.5 flex items-center gap-1.5 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <MapPin className="h-3 w-3" />
                      Address
                    </div>
                    <div
                      className="font-medium text-sm wrap-break-word"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trackingData.receiver.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <BottomNav />
      </div>
    </Sidebar>
  );
}
