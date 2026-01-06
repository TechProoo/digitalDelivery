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
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import BottomNav from "../components/dashboard/bottom-nav";

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

  const paginatedOrders = recentOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(recentOrders.length / itemsPerPage);

  return (
    <Sidebar>
      <div
        className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Welcome Card */}
        <div
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,162,97,0.08), rgba(78,168,222,0.03))",
            border: "1px solid var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1">
              {/* Date Badge */}
              <div
                className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(244,162,97,0.12)" }}
              >
                <Clock
                  className="h-4 w-4"
                  style={{ color: "var(--accent-amber)" }}
                />
                <span
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: "var(--accent-amber)" }}
                >
                  Saturday, 3 Jan
                </span>
              </div>

              {/* Welcome Text */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Welcome back,{" "}
                <span style={{ color: "var(--accent-coral)" }}>John!</span>
              </h1>

              <p
                className="text-sm sm:text-base mb-6 lg:mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Here's what's happening with your deliveries today.
              </p>

              {/* Mini Stats */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(244,162,97,0.12)" }}
                  >
                    <Package
                      className="h-5 w-5"
                      style={{ color: "var(--accent-amber)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-lg sm:text-xl font-bold"
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

                <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(78,168,222,0.08)" }}
                  >
                    <MapPin
                      className="h-5 w-5"
                      style={{ color: "var(--accent-sky)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-lg sm:text-xl font-bold"
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/new-delivery")
                }
                className="rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  background: "var(--gradient-primary)",
                  color: "var(--text-inverse)",
                  boxShadow: "var(--glow-accent)",
                }}
              >
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Send Package</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => (window.location.href = "/dashboard/track")}
                className="rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold border transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  borderColor: "var(--border-medium)",
                }}
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                Track Package
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            {
              label: "Total Deliveries",
              value: "1,247",
              change: "+12%",
              trend: "up",
              icon: Package,
              color: "var(--accent-amber)",
            },
            {
              label: "Active Shipments",
              value: "23",
              change: "+8%",
              trend: "up",
              icon: Truck,
              color: "var(--status-in-transit)",
            },
            {
              label: "Completed Orders",
              value: "1,189",
              change: "+5%",
              trend: "up",
              icon: CheckCircle,
              color: "var(--status-delivered)",
            },
            {
              label: "Total Spent",
              value: "₦2.4M",
              change: "-15%",
              trend: "down",
              icon: DollarSign,
              color: "#ef6a6a",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-xl"
              style={{
                background: "var(--gradient-surface)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        stat.trend === "up"
                          ? "rgba(46,196,182,0.12)"
                          : "rgba(231,111,81,0.08)",
                      color:
                        stat.trend === "up"
                          ? "var(--status-delivered)"
                          : "#ef6a6a",
                    }}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(244,162,97,0.06)" }}
                >
                  <stat.icon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{ color: stat.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          <h3
            className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Our Services
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                name: "By Road",
                icon: Truck,
                gradient: "linear-gradient(135deg,#f4a261,#e76f51)",
              },
              {
                name: "By Air",
                icon: Plane,
                gradient: "linear-gradient(135deg,#4ea8de,#2ec4b6)",
              },
              {
                name: "By Sea",
                icon: Ship,
                gradient: "linear-gradient(135deg,#2ec4b6,#0ea5a4)",
              },
              {
                name: "Door Pickup",
                icon: Home,
                gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
              },
              {
                name: "E-commerce",
                icon: ShoppingBag,
                gradient: "linear-gradient(135deg,#f43f5e,#fb7185)",
              },
            ].map((service) => (
              <button
                key={service.name}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: service.gradient,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  }}
                >
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div
                  className="text-xs sm:text-sm font-medium text-center"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3
            className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Quick Actions
          </h3>

          {/* Track Input */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                style={{ color: "var(--text-secondary)" }}
              />
              <input
                placeholder="Enter tracking number..."
                className="w-full rounded-lg pl-10 pr-3 py-3 text-sm sm:text-base"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <button
              className="rounded-lg px-6 py-3 font-semibold text-sm sm:text-base whitespace-nowrap"
              style={{
                background: "var(--gradient-primary)",
                color: "var(--text-inverse)",
              }}
            >
              Track
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => (window.location.href = "/dashboard/new-delivery")}
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: "transparent",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
              }}
            >
              <Calculator className="h-5 w-5" />
              Get Quote
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard/orders")}
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: "transparent",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
              }}
            >
              <List className="h-5 w-5" />
              All Orders
            </button>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="mb-6">
          <div
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3
                className="text-base sm:text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Active Shipments
              </h3>
              <span
                className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                style={{
                  background: "rgba(244,162,97,0.12)",
                  color: "var(--accent-amber)",
                }}
              >
                {shipments.length} active
              </span>
            </div>

            <div className="space-y-4">
              {shipments.map((shipment) => (
                <div
                  key={shipment.code}
                  className="p-4 rounded-xl"
                  style={{
                    border: "1px solid var(--border-soft)",
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(244,162,97,0.12)",
                        }}
                      >
                        <Package
                          className="h-5 w-5"
                          style={{ color: "var(--accent-amber)" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-sm sm:text-base font-semibold"
                          style={{ color: "var(--accent-amber)" }}
                        >
                          {shipment.code}
                        </div>
                        <div
                          className="text-xs sm:text-sm flex items-center gap-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{shipment.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <div
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Est. Delivery
                      </div>
                      <div
                        className="text-xs sm:text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {shipment.est}
                      </div>
                      <div
                        className="text-sm font-bold mt-1"
                        style={{ color: "var(--accent-amber)" }}
                      >
                        {shipment.progress}%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full h-2 rounded-full bg-[rgba(0,0,0,0.3)]">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${shipment.progress}%`,
                          background: "var(--accent-amber)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Timeline - Desktop */}
                  <div className="hidden sm:flex items-center justify-between text-center">
                    {shipment.steps.map((step, idx) => (
                      <div key={idx} className="flex-1">
                        <div className="flex justify-center mb-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                            style={{
                              background: step.done
                                ? "var(--accent-amber)"
                                : "transparent",
                              border: step.done
                                ? "none"
                                : "2px solid var(--border-soft)",
                              color: step.done
                                ? "white"
                                : "var(--text-secondary)",
                            }}
                          >
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
                        <div
                          className="text-xs font-medium"
                          style={{
                            color: step.done
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                          }}
                        >
                          {step.title}
                        </div>
                        {step.date && (
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {step.date}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Timeline - Mobile */}
                  <div className="sm:hidden space-y-2">
                    {shipment.steps
                      .filter((s) => s.done)
                      .map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "var(--accent-amber)" }}
                          >
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-xs font-medium"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {step.title}
                            </div>
                            {step.date && (
                              <div
                                className="text-xs"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {step.date}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders - Desktop Table */}
        <div className="hidden lg:block">
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
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
                onClick={() => (window.location.href = "/dashboard/orders")}
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
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: "var(--border-soft)" }}
                  >
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Order ID
                    </th>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Route
                    </th>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service
                    </th>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Date
                    </th>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b transition-colors hover:bg-white/5"
                      style={{ borderColor: "var(--border-soft)" }}
                    >
                      <td className="py-4 px-4">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "var(--accent-amber)" }}
                        >
                          {order.id}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className="text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {order.pickup}
                        </div>
                        <div
                          className="text-xs flex items-center gap-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <ArrowRight className="h-3 w-3" />
                          {order.dest}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {order.service === "Air" ? (
                            <Plane
                              className="h-4 w-4"
                              style={{ color: "var(--accent-teal)" }}
                            />
                          ) : order.service === "Sea" ? (
                            <Ship
                              className="h-4 w-4"
                              style={{ color: "var(--accent-teal)" }}
                            />
                          ) : (
                            <Truck
                              className="h-4 w-4"
                              style={{ color: "var(--accent-teal)" }}
                            />
                          )}
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {order.service}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                          style={{
                            background:
                              order.status === "Delivered"
                                ? "rgba(46,196,182,0.15)"
                                : order.status === "Pending"
                                ? "rgba(244,162,97,0.15)"
                                : "rgba(78,168,222,0.15)",
                            color:
                              order.status === "Delivered"
                                ? "var(--status-delivered)"
                                : order.status === "Pending"
                                ? "var(--status-pending)"
                                : "var(--status-in-transit)",
                          }}
                        >
                          {order.status === "Delivered" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : order.status === "Pending" ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <Truck className="h-3 w-3" />
                          )}
                          {order.status}
                        </span>
                      </td>
                      <td
                        className="py-4 px-4 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {order.date}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() =>
                            (window.location.href = "/dashboard/orders")
                          }
                          className="p-2 rounded-lg transition-all hover:scale-110 active:scale-95"
                          style={{
                            background: "rgba(23,199,189,0.12)",
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

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
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
                      currentPage === 1
                        ? "rgba(255,255,255,0.03)"
                        : "transparent",
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

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background:
                          currentPage === pageNum
                            ? "var(--accent-amber)"
                            : "transparent",
                        border:
                          currentPage === pageNum
                            ? "none"
                            : "1px solid var(--border-soft)",
                        color:
                          currentPage === pageNum
                            ? "#061f29"
                            : "var(--text-primary)",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background:
                      currentPage === totalPages
                        ? "rgba(255,255,255,0.03)"
                        : "transparent",
                    border: "1px solid var(--border-soft)",
                    color:
                      currentPage === totalPages
                        ? "var(--text-secondary)"
                        : "var(--text-primary)",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders - Mobile Cards */}
        <div className="lg:hidden">
          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Recent Orders
              </h3>
              <button
                onClick={() => (window.location.href = "/my-orders")}
                className="text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-primary)",
                }}
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {paginatedOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3 rounded-lg"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--accent-amber)" }}
                    >
                      {order.id}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background:
                          order.status === "Delivered"
                            ? "rgba(46,196,182,0.15)"
                            : order.status === "Pending"
                            ? "rgba(244,162,97,0.15)"
                            : "rgba(78,168,222,0.15)",
                        color:
                          order.status === "Delivered"
                            ? "var(--status-delivered)"
                            : order.status === "Pending"
                            ? "var(--status-pending)"
                            : "var(--status-in-transit)",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div
                    className="text-xs mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {order.pickup}
                  </div>
                  <div
                    className="text-xs flex items-center gap-1 mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <ArrowRight className="h-3 w-3" />
                    {order.dest}
                  </div>

                  <div
                    className="flex items-center justify-between text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      {order.service === "Air" ? (
                        <Plane className="h-3 w-3" />
                      ) : order.service === "Sea" ? (
                        <Ship className="h-3 w-3" />
                      ) : (
                        <Truck className="h-3 w-3" />
                      )}
                      {order.service}
                    </div>
                    <span>{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
        <Footer />
      </div>
    </Sidebar>
  );
}
