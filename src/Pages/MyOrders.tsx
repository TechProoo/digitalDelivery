import { useState } from "react";
import { Sidebar } from "../components/dashboard/sidebar";
import {
  Package,
  Search,
  Filter,
  MapPin,
  Truck,
  Plane,
  Ship,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

type OrderStatus = "delivered" | "in-transit" | "pending" | "failed";
type ServiceType = "road" | "air" | "sea" | "express";

interface Order {
  id: string;
  origin: string;
  destination: string;
  packageType: string;
  weight: string;
  service: ServiceType;
  status: OrderStatus;
  date: string;
  amount: string;
  estimatedDelivery: string;
  trackingNumber: string;
}

const sampleOrders: Order[] = [
  {
    id: "DD-2024-001",
    origin: "Lagos, Ikeja",
    destination: "Abuja, Wuse",
    packageType: "Parcel",
    weight: "5.2 kg",
    service: "express",
    status: "in-transit",
    date: "Jan 2, 2026",
    amount: "$125.00",
    estimatedDelivery: "Jan 8, 2026",
    trackingNumber: "DD-2024-001",
  },
  {
    id: "DD-2024-002",
    origin: "Shanghai, China",
    destination: "Lagos, Victoria Island",
    packageType: "Container",
    weight: "2500 kg",
    service: "sea",
    status: "delivered",
    date: "Dec 15, 2025",
    amount: "$2,768.00",
    estimatedDelivery: "Jan 3, 2026",
    trackingNumber: "DD-2024-002",
  },
  {
    id: "DD-2024-003",
    origin: "Port Harcourt",
    destination: "Kano",
    packageType: "Pallet",
    weight: "120 kg",
    service: "road",
    status: "delivered",
    date: "Dec 28, 2025",
    amount: "$85.00",
    estimatedDelivery: "Jan 1, 2026",
    trackingNumber: "DD-2024-003",
  },
  {
    id: "DD-2024-004",
    origin: "London, UK",
    destination: "Abuja, Garki",
    packageType: "Parcel",
    weight: "3.5 kg",
    service: "air",
    status: "delivered",
    date: "Dec 20, 2025",
    amount: "$210.00",
    estimatedDelivery: "Dec 25, 2025",
    trackingNumber: "DD-2024-004",
  },
  {
    id: "DD-2024-005",
    origin: "Ibadan",
    destination: "Enugu",
    packageType: "Parcel",
    weight: "8 kg",
    service: "road",
    status: "pending",
    date: "Jan 4, 2026",
    amount: "$45.00",
    estimatedDelivery: "Jan 10, 2026",
    trackingNumber: "DD-2024-005",
  },
  {
    id: "DD-2024-006",
    origin: "Dubai, UAE",
    destination: "Lagos, Lekki",
    packageType: "Pallet",
    weight: "250 kg",
    service: "air",
    status: "in-transit",
    date: "Jan 1, 2026",
    amount: "$890.00",
    estimatedDelivery: "Jan 6, 2026",
    trackingNumber: "DD-2024-006",
  },
  {
    id: "DD-2024-007",
    origin: "Abuja",
    destination: "Calabar",
    packageType: "Parcel",
    weight: "2 kg",
    service: "express",
    status: "failed",
    date: "Dec 18, 2025",
    amount: "$35.00",
    estimatedDelivery: "Dec 22, 2025",
    trackingNumber: "DD-2024-007",
  },
  {
    id: "DD-2024-008",
    origin: "New York, USA",
    destination: "Port Harcourt",
    packageType: "Container",
    weight: "1800 kg",
    service: "sea",
    status: "in-transit",
    date: "Dec 10, 2025",
    amount: "$3,200.00",
    estimatedDelivery: "Jan 15, 2026",
    trackingNumber: "DD-2024-008",
  },
];

export default function MyOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const itemsPerPage = 5;

  // Filter orders
  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesService =
      serviceFilter === "all" || order.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  // Paginate
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Stats
  const stats = {
    total: sampleOrders.length,
    delivered: sampleOrders.filter((o) => o.status === "delivered").length,
    inTransit: sampleOrders.filter((o) => o.status === "in-transit").length,
    pending: sampleOrders.filter((o) => o.status === "pending").length,
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "var(--status-delivered)";
      case "in-transit":
        return "var(--status-in-transit)";
      case "pending":
        return "var(--status-pending)";
      case "failed":
        return "var(--status-failed)";
    }
  };

  const getStatusBg = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "rgba(46,196,182,0.12)";
      case "in-transit":
        return "rgba(78,168,222,0.12)";
      case "pending":
        return "rgba(244,162,97,0.12)";
      case "failed":
        return "rgba(239,71,111,0.12)";
    }
  };

  const getServiceIcon = (service: ServiceType) => {
    switch (service) {
      case "road":
        return <Truck className="h-4 w-4" />;
      case "air":
        return <Plane className="h-4 w-4" />;
      case "sea":
        return <Ship className="h-4 w-4" />;
      case "express":
        return <Truck className="h-4 w-4" />;
    }
  };

  return (
    <Sidebar>
      <div
        className="min-h-screen p-6"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-3 rounded-xl"
              style={{
                background: "var(--gradient-surface)",
                border: "1px solid var(--border-soft)",
              }}
            >
              <Package
                className="h-6 w-6"
                style={{ color: "var(--accent-teal)" }}
              />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                My Orders
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>
                View and manage all your shipments
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Total Orders
              </span>
              <Package
                className="h-5 w-5"
                style={{ color: "var(--accent-teal)" }}
              />
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {stats.total}
            </div>
          </div>

          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Delivered
              </span>
              <CheckCircle
                className="h-5 w-5"
                style={{ color: "var(--status-delivered)" }}
              />
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--status-delivered)" }}
            >
              {stats.delivered}
            </div>
          </div>

          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                In Transit
              </span>
              <Truck
                className="h-5 w-5"
                style={{ color: "var(--status-in-transit)" }}
              />
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--status-in-transit)" }}
            >
              {stats.inTransit}
            </div>
          </div>

          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Pending
              </span>
              <Clock
                className="h-5 w-5"
                style={{ color: "var(--status-pending)" }}
              />
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--status-pending)" }}
            >
              {stats.pending}
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div
          className="p-4 rounded-xl mb-6"
          style={{
            background: "var(--gradient-surface)",
            border: "1px solid var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--text-secondary)" }}
              />
              <input
                type="text"
                placeholder="Search by ID, origin, or destination..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none text-sm"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--text-secondary)" }}
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as OrderStatus | "all");
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none text-sm appearance-none cursor-pointer"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="in-transit">In Transit</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="relative">
              <Truck
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--text-secondary)" }}
              />
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value as ServiceType | "all");
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none text-sm appearance-none cursor-pointer"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Services</option>
                <option value="road">By Road</option>
                <option value="air">By Air</option>
                <option value="sea">By Sea</option>
                <option value="express">Express</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{
            background: "var(--gradient-surface)",
            border: "1px solid var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--border-soft)" }}
                >
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Order ID
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Route
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Package
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Service
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Date
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Amount
                  </th>
                  <th
                    className="text-left py-4 px-4 text-sm font-semibold uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <AlertCircle
                        className="h-12 w-12 mx-auto mb-3"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <p
                        className="text-lg font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        No orders found
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Try adjusting your filters or search query
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b transition-colors hover:bg-white/5"
                      style={{ borderColor: "var(--border-soft)" }}
                    >
                      <td className="py-4 px-4">
                        <span
                          className="font-semibold"
                          style={{ color: "var(--accent-amber)" }}
                        >
                          {order.id}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div
                              className="text-sm"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {order.origin}
                            </div>
                            <div
                              className="text-xs flex items-center gap-1"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <MapPin className="h-3 w-3" />
                              {order.destination}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className="text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {order.packageType}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {order.weight}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span style={{ color: "var(--accent-teal)" }}>
                            {getServiceIcon(order.service)}
                          </span>
                          <span
                            className="text-sm capitalize"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {order.service}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                          style={{
                            background: getStatusBg(order.status),
                            color: getStatusColor(order.status),
                          }}
                        >
                          {order.status.replace("-", " ")}
                        </span>
                      </td>
                      <td
                        className="py-4 px-4 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {order.date}
                      </td>
                      <td
                        className="py-4 px-4 font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {order.amount}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginatedOrders.length > 0 && (
            <div
              className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <div
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
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

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className="px-3 py-1 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background:
                        currentPage === i + 1
                          ? "var(--accent-teal)"
                          : "transparent",
                      border:
                        currentPage === i + 1
                          ? "none"
                          : "1px solid var(--border-soft)",
                      color:
                        currentPage === i + 1
                          ? "var(--text-inverse)"
                          : "var(--text-primary)",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background:
                      currentPage === totalPages
                        ? "rgba(0,0,0,0.04)"
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
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-soft)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Order Details
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Tracking: {selectedOrder.trackingNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Order Info */}
              <div className="space-y-4 mb-6">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        className="text-xs uppercase mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Order ID
                      </div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--accent-amber)" }}
                      >
                        {selectedOrder.id}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-xs uppercase mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Status
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium capitalize inline-block"
                        style={{
                          background: getStatusBg(selectedOrder.status),
                          color: getStatusColor(selectedOrder.status),
                        }}
                      >
                        {selectedOrder.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <div
                    className="text-xs uppercase mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Route
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        From
                      </div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.origin}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        To
                      </div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.destination}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div
                      className="text-xs uppercase mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Package
                    </div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedOrder.packageType}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedOrder.weight}
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div
                      className="text-xs uppercase mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: "var(--accent-teal)" }}>
                        {getServiceIcon(selectedOrder.service)}
                      </span>
                      <span
                        className="font-semibold capitalize"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.service}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div
                      className="text-xs uppercase mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Order Date
                    </div>
                    <div
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedOrder.date}
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div
                      className="text-xs uppercase mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Est. Delivery
                    </div>
                    <div
                      className="font-semibold"
                      style={{ color: "var(--accent-amber)" }}
                    >
                      {selectedOrder.estimatedDelivery}
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(23,199,189,0.1)",
                    border: "1px solid var(--accent-teal)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Total Amount
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      {selectedOrder.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    window.location.href = `/track-package?id=${selectedOrder.trackingNumber}`;
                  }}
                  className="py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105"
                  style={{
                    background: "var(--accent-teal)",
                    color: "var(--text-inverse)",
                  }}
                >
                  <MapPin className="h-4 w-4" />
                  Track Order
                </button>
                <button
                  className="py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
