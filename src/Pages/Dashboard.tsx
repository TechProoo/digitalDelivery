import Footer from "../components/home/Footer";
import { useState } from "react";
import Sidebar from "../components/dashboard/sidebar";
import {
  Package,
  MapPin,
  ArrowRight,
  Clock,
  Truck,
  CheckCircle,
  DollarSign,
  Search,
  List,
  Calculator,
  Plane,
  Ship,
  Home,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const shipments = [
    {
      code: "DD-2024-001",
      location: "Abuja, Wuse",
      est: "Jan 16, 2024 - 2:00 PM",
      progress: 60,
      steps: [
        { title: "Order Received", date: "Jan 15, 9:00 AM", done: true },
        { title: "Processed", date: "Jan 15, 11:30 AM", done: true },
        { title: "In Transit", date: "Jan 15, 2:00 PM", done: true },
        { title: "Arriving", date: "", done: false },
        { title: "Delivered", date: "", done: false },
      ],
    },
    {
      code: "DD-2024-004",
      location: "Enugu",
      est: "Jan 17, 2024 - 10:00 AM",
      progress: 40,
      steps: [
        { title: "Order Received", date: "Jan 16, 9:00 AM", done: true },
        { title: "Processed", date: "Jan 16, 11:30 AM", done: true },
        { title: "In Transit", date: "Jan 16, 2:00 PM", done: false },
        { title: "Arriving", date: "", done: false },
        { title: "Delivered", date: "", done: false },
      ],
    },
  ];
  const recentOrders = [
    {
      id: "DD-2024-001",
      pickup: "Lagos, Ikeja",
      dest: "Abuja, Wuse",
      service: "Air",
      status: "In Transit",
      date: "2024-01-15",
    },
    {
      id: "DD-2024-002",
      pickup: "Port Harcourt",
      dest: "Lagos, VI",
      service: "Road",
      status: "Delivered",
      date: "2024-01-14",
    },
    {
      id: "DD-2024-003",
      pickup: "Kano",
      dest: "Lagos, Lekki",
      service: "Air",
      status: "Pending",
      date: "2024-01-14",
    },
    {
      id: "DD-2024-004",
      pickup: "Calabar",
      dest: "Enugu",
      service: "Road",
      status: "In Transit",
      date: "2024-01-13",
    },
    {
      id: "DD-2024-005",
      pickup: "Lagos, Apapa",
      dest: "Accra, Ghana",
      service: "Sea",
      status: "Pending",
      date: "2024-01-12",
    },
  ];

  return (
    <Sidebar>
      <div className="dashboard_container">
        <div
          className="welcome_card rounded-2xl p-6 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,162,97,0.08), rgba(78,168,222,0.03))",
            boxShadow: "var(--shadow-soft)",
            color: "var(--text-primary)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(244,162,97,0.12)",
                    color: "var(--accent-amber)",
                    fontWeight: 700,
                  }}
                >
                  <Clock size={15} />
                </span>
                <span style={{ color: "var(--accent-amber)", fontWeight: 700 }}>
                  Saturday, 3 Jan
                </span>
              </div>

              <h1
                className="text-2xl lg:text-4xl font-extrabold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Welcome back,{" "}
                <span style={{ color: "var(--accent-coral)" }}>John!</span>
              </h1>

              <p
                className="text-sm lg:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                Here's what's happening with your deliveries today.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] rounded-lg px-4 py-3">
                  <div
                    className="p-2 rounded-md"
                    style={{
                      background: "rgba(244,162,97,0.12)",
                      color: "var(--accent-amber)",
                    }}
                  >
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      23
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Active shipments
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] rounded-lg px-4 py-3">
                  <div
                    className="p-2 rounded-md"
                    style={{
                      background: "rgba(78,168,222,0.08)",
                      color: "var(--accent-sky)",
                    }}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      3
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Arriving today
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                className="rounded-full px-6 py-3 text-base font-semibold shadow-md flex items-center gap-3"
                style={{
                  background: "var(--gradient-primary)",
                  color: "var(--text-inverse)",
                  boxShadow: "var(--glow-accent)",
                }}
              >
                <Package className="h-5 w-5" />
                <span>Send a Package</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                className="rounded-lg px-5 py-3 text-base font-semibold border"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  borderColor: "var(--border-medium)",
                }}
              >
                <MapPin className="h-5 w-5 mr-2 inline-block" />
                Track Package
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-xs font-medium header"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Total Deliveries
                </div>
                <div
                  className="text-2xl lg:text-3xl font-extrabold"
                  style={{ color: "var(--text-primary)" }}
                >
                  1,247
                </div>
                <div
                  className="mt-2 inline-flex items-center gap-2 text-sm"
                  style={{ color: "var(--status-delivered)" }}
                >
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(46,196,182,0.12)",
                      color: "var(--status-delivered)",
                      fontWeight: 700,
                    }}
                  >
                    ↑ 12%
                  </span>
                </div>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "rgba(244,162,97,0.06)",
                  color: "var(--accent-amber)",
                }}
              >
                <Package className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-xs font-medium header"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Active Shipments
                </div>
                <div
                  className="text-2xl lg:text-3xl font-extrabold"
                  style={{ color: "var(--text-primary)" }}
                >
                  23
                </div>
                <div
                  className="mt-2 inline-flex items-center gap-2 text-sm"
                  style={{ color: "var(--status-in-transit)" }}
                >
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(78,168,222,0.08)",
                      color: "var(--status-in-transit)",
                      fontWeight: 700,
                    }}
                  >
                    ↑ 8%
                  </span>
                </div>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "rgba(244,162,97,0.06)",
                  color: "var(--accent-amber)",
                }}
              >
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-xs font-medium header"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Completed Orders
                </div>
                <div
                  className="text-2xl lg:text-3xl font-extrabold"
                  style={{ color: "var(--text-primary)" }}
                >
                  1,189
                </div>
                <div
                  className="mt-2 inline-flex items-center gap-2 text-sm"
                  style={{ color: "var(--status-delivered)" }}
                >
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(46,196,182,0.12)",
                      color: "var(--status-delivered)",
                      fontWeight: 700,
                    }}
                  >
                    ↑ 5%
                  </span>
                </div>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "rgba(244,162,97,0.06)",
                  color: "var(--accent-amber)",
                }}
              >
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-xs font-medium header"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Total Spent
                </div>
                <div
                  className="text-2xl lg:text-3xl  font-extrabold"
                  style={{ color: "var(--text-primary)" }}
                >
                  ₦2.4M
                </div>
                <div
                  className="mt-2 inline-flex items-center gap-2 text-sm"
                  style={{ color: "#ef6a6a" }}
                >
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(231,111,81,0.08)",
                      color: "#ef6a6a",
                      fontWeight: 700,
                    }}
                  >
                    ↓ 15%
                  </span>
                </div>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "rgba(244,162,97,0.06)",
                  color: "var(--accent-amber)",
                }}
              >
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Services (polished) */}
        <div className="mt-10">
          <div className="p-3 rounded-2xl">
            <h3
              className="text-lg font-semibold mb-3 header"
              style={{ color: "var(--text-primary)" }}
            >
              Our Services
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                {
                  name: "By Road",
                  icon: <Truck className="h-5 w-5" />,
                  color: "linear-gradient(135deg,#f4a261,#e76f51)",
                },
                {
                  name: "By Air",
                  icon: <Plane className="h-5 w-5" />,
                  color: "linear-gradient(135deg,#4ea8de,#2ec4b6)",
                },
                {
                  name: "By Sea",
                  icon: <Ship className="h-5 w-5" />,
                  color: "linear-gradient(135deg,#2ec4b6,#0ea5a4)",
                },
                {
                  name: "Door Pickup",
                  icon: <Home className="h-5 w-5" />,
                  color: "linear-gradient(135deg,#8b5cf6,#ec4899)",
                },
                {
                  name: "E-commerce",
                  icon: <ShoppingBag className="h-5 w-5" />,
                  color: "linear-gradient(135deg,#f43f5e,#fb7185)",
                },
              ].map((s) => (
                <button
                  key={s.name}
                  aria-label={s.name}
                  className="flex flex-col items-center gap-2 p-2 rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-1"
                    style={{
                      background: s.color,
                      color: "#fff",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    }}
                  >
                    {s.icon}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <div className="p-4 rounded-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-lg font-semibold header"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Quick Actions
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <Search className="h-5 w-5" />
                      </span>
                      <input
                        aria-label="Track package"
                        placeholder="Enter tracking number..."
                        className="w-full rounded-lg px-12 py-3 border"
                        style={{
                          background: "transparent",
                          borderColor: "var(--border-medium)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    className="rounded-lg px-6 py-3 font-semibold"
                    style={{
                      background: "var(--gradient-primary)",
                      color: "var(--text-inverse)",
                    }}
                  >
                    Track
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    className="w-full flex items-center justify-center gap-3 rounded-lg px-4 py-4"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Calculator className="h-5 w-5" />
                    <span>Get Quote</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-3 rounded-lg px-4 py-4"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <List className="h-5 w-5" />
                    <span>All Orders</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="mt-6">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Active Shipments
              </h3>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: "rgba(244,162,97,0.12)",
                  color: "var(--accent-amber)",
                  fontWeight: 700,
                }}
              >
                {" "}
                {shipments.length} active
              </span>
            </div>

            <div className="space-y-4">
              {shipments.map((sh) => (
                <div
                  key={sh.code}
                  className="p-4 rounded-lg border"
                  style={{
                    borderColor: "var(--border-soft)",
                    background: "transparent",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: "rgba(244,162,97,0.06)",
                            color: "var(--accent-amber)",
                          }}
                        >
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <div
                            className="text-base font-semibold"
                            style={{ color: "var(--accent-amber)" }}
                          >
                            {sh.code}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <MapPin className="inline-block mr-1" />{" "}
                            {sh.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Est. Delivery
                      </div>
                      <div
                        className="text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {sh.est}
                      </div>
                      <div
                        className="text-sm mt-2"
                        style={{
                          color: "var(--accent-amber)",
                          fontWeight: 700,
                        }}
                      >
                        {sh.progress}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full h-2 rounded-full bg-[rgba(0,0,0,0.06)]">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${sh.progress}%`,
                          background: "var(--accent-amber)",
                        }}
                      />
                    </div>

                    <div
                      className="mt-4 flex items-center justify-between text-center text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {sh.steps.map((step, idx) => (
                        <div key={step.title} className="flex-1">
                          <div className="flex items-center justify-center">
                            <div
                              className={
                                step.done
                                  ? "w-8 h-8 rounded-full flex items-center justify-center"
                                  : "w-8 h-8 rounded-full border flex items-center justify-center"
                              }
                              style={{
                                background: step.done
                                  ? "var(--accent-amber)"
                                  : "transparent",
                                color: step.done
                                  ? "white"
                                  : "var(--text-secondary)",
                                borderColor: "var(--border-soft)",
                              }}
                            >
                              <div className="opacity-90">
                                {idx === 0 ? (
                                  <Package className="h-4 w-4" />
                                ) : idx === 1 ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : idx === 2 ? (
                                  <Truck className="h-4 w-4" />
                                ) : idx === 3 ? (
                                  <MapPin className="h-4 w-4" />
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className="mt-2 font-medium"
                            style={{
                              color: step.done
                                ? "var(--text-primary)"
                                : "var(--text-secondary)",
                            }}
                          >
                            {step.title}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {step.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-6">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Recent Orders
                </h3>
                <div
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Your latest deliveries
                </div>
              </div>
              <button
                onClick={() => (window.location.href = "/my-orders")}
                className="rounded-lg px-4 py-2 transition-all hover:scale-105"
                style={{
                  border: "1px solid var(--border-medium)",
                  background: "transparent",
                  color: "var(--text-primary)",
                }}
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: "var(--border-soft)" }}
                  >
                    <th
                      className="py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Order ID
                    </th>
                    <th
                      className="py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Route
                    </th>
                    <th
                      className="py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service
                    </th>
                    <th
                      className="py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Status
                    </th>
                    <th
                      className="py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Date
                    </th>
                    <th
                      className="py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((o) => (
                      <tr
                        key={o.id}
                        className="border-b transition-colors hover:bg-white/5"
                        style={{ borderColor: "var(--border-soft)" }}
                      >
                        <td className="py-4 px-4">
                          <span
                            className="font-semibold"
                            style={{ color: "var(--accent-amber)" }}
                          >
                            {o.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div
                              className="text-sm"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {o.pickup}
                            </div>
                            <div
                              className="text-xs flex items-center gap-1"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <MapPin className="h-3 w-3" />
                              {o.dest}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span style={{ color: "var(--accent-teal)" }}>
                              {o.service === "Air" ? (
                                <Plane className="h-4 w-4" />
                              ) : o.service === "Sea" ? (
                                <Ship className="h-4 w-4" />
                              ) : (
                                <Truck className="h-4 w-4" />
                              )}
                            </span>
                            <span
                              className="text-sm"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {o.service}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              background:
                                o.status === "Delivered"
                                  ? "rgba(46,196,182,0.12)"
                                  : o.status === "Pending"
                                  ? "rgba(244,162,97,0.12)"
                                  : "rgba(78,168,222,0.12)",
                              color:
                                o.status === "Delivered"
                                  ? "var(--status-delivered)"
                                  : o.status === "Pending"
                                  ? "var(--status-pending)"
                                  : "var(--status-in-transit)",
                            }}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {o.date}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() =>
                              (window.location.href = "/my-orders")
                            }
                            className="p-2 rounded-lg transition-all hover:scale-110"
                            style={{
                              background: "rgba(23,199,189,0.1)",
                              border: "1px solid var(--accent-teal)",
                              color: "var(--accent-teal)",
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, recentOrders.length)} of{" "}
                {recentOrders.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background:
                      currentPage === 1 ? "rgba(0,0,0,0.04)" : "transparent",
                    border: "1px solid var(--border-soft)",
                    color:
                      currentPage === 1
                        ? "var(--text-secondary)"
                        : "var(--text-primary)",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({
                  length: Math.ceil(recentOrders.length / itemsPerPage),
                }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className="px-3 py-1 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background:
                        currentPage === i + 1
                          ? "var(--accent-amber)"
                          : "transparent",
                      border:
                        currentPage === i + 1
                          ? "none"
                          : "1px solid var(--border-soft)",
                      color:
                        currentPage === i + 1
                          ? "#061f29"
                          : "var(--text-primary)",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(
                        Math.ceil(recentOrders.length / itemsPerPage),
                        p + 1
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(recentOrders.length / itemsPerPage)
                  }
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background:
                      currentPage ===
                      Math.ceil(recentOrders.length / itemsPerPage)
                        ? "rgba(0,0,0,0.04)"
                        : "transparent",
                    border: "1px solid var(--border-soft)",
                    color:
                      currentPage ===
                      Math.ceil(recentOrders.length / itemsPerPage)
                        ? "var(--text-secondary)"
                        : "var(--text-primary)",
                    cursor:
                      currentPage ===
                      Math.ceil(recentOrders.length / itemsPerPage)
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Sidebar>
  );
}
