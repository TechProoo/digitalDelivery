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
  Calendar,
  ArrowRight,
} from "lucide-react";
import BottomNav from "../components/dashboard/bottom-nav";

import {
  ShipmentStatus,
  ServiceType,
  STATUS_COLORS,
  STATUS_LABELS,
  SERVICE_TYPE_LABELS,
  isValidShipmentStatus,
  isValidServiceType,
} from "../types/shipment";

interface Order {
  id: string;
  origin: string;
  destination: string;
  packageType: string;
  weight: string;
  service: ServiceType;
  status: ShipmentStatus;
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
    service: ServiceType.DOOR_TO_DOOR,
    status: ShipmentStatus.IN_TRANSIT,
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
    service: ServiceType.SEA,
    status: ShipmentStatus.DELIVERED,
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
    service: ServiceType.ROAD,
    status: ShipmentStatus.DELIVERED,
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
    service: ServiceType.AIR,
    status: ShipmentStatus.DELIVERED,
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
    service: ServiceType.ROAD,
    status: ShipmentStatus.PENDING,
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
    service: ServiceType.AIR,
    status: ShipmentStatus.IN_TRANSIT,
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
    service: ServiceType.DOOR_TO_DOOR,
    status: ShipmentStatus.CANCELLED,
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
    service: ServiceType.SEA,
    status: ShipmentStatus.IN_TRANSIT,
    date: "Dec 10, 2025",
    amount: "$3,200.00",
    estimatedDelivery: "Jan 15, 2026",
    trackingNumber: "DD-2024-008",
  },
];

export default function MyOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | "all">(
    "all"
  );
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
    delivered: sampleOrders.filter((o) => o.status === ShipmentStatus.DELIVERED)
      .length,
    inTransit: sampleOrders.filter(
      (o) => o.status === ShipmentStatus.IN_TRANSIT
    ).length,
    pending: sampleOrders.filter((o) => o.status === ShipmentStatus.PENDING)
      .length,
  };

  const getStatusColor = (status: ShipmentStatus) => STATUS_COLORS[status].text;

  const getStatusBg = (status: ShipmentStatus) => STATUS_COLORS[status].bg;

  const getStatusIcon = (status: ShipmentStatus) => {
    switch (status) {
      case ShipmentStatus.DELIVERED:
        return CheckCircle;
      case ShipmentStatus.CANCELLED:
        return AlertCircle;
      case ShipmentStatus.IN_TRANSIT:
      case ShipmentStatus.PICKED_UP:
        return Truck;
      case ShipmentStatus.PENDING:
      case ShipmentStatus.QUOTED:
      case ShipmentStatus.ACCEPTED:
      default:
        return Clock;
    }
  };

  const getServiceIcon = (service: ServiceType) => {
    switch (service) {
      case ServiceType.ROAD:
        return Truck;
      case ServiceType.AIR:
        return Plane;
      case ServiceType.SEA:
        return Ship;
      case ServiceType.DOOR_TO_DOOR:
        return Truck;
    }
  };

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
              <Package
                className="h-5 w-5 sm:h-6 sm:w-6"
                style={{ color: "var(--accent-teal)" }}
              />
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                My Orders
              </h1>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                View and manage all your shipments
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div
            className="p-3 sm:p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs sm:text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Total Orders
              </span>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(23,199,189,0.15)" }}
              >
                <Package
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: "var(--accent-teal)" }}
                />
              </div>
            </div>
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {stats.total}
            </div>
          </div>

          <div
            className="p-3 sm:p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs sm:text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Delivered
              </span>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(46,196,182,0.15)" }}
              >
                <CheckCircle
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: "var(--status-delivered)" }}
                />
              </div>
            </div>
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--status-delivered)" }}
            >
              {stats.delivered}
            </div>
          </div>

          <div
            className="p-3 sm:p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs sm:text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                In Transit
              </span>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(78,168,222,0.15)" }}
              >
                <Truck
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: "var(--status-in-transit)" }}
                />
              </div>
            </div>
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--status-in-transit)" }}
            >
              {stats.inTransit}
            </div>
          </div>

          <div
            className="p-3 sm:p-4 rounded-xl"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs sm:text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Pending
              </span>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(244,162,97,0.15)" }}
              >
                <Clock
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: "var(--status-pending)" }}
                />
              </div>
            </div>
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--status-pending)" }}
            >
              {stats.pending}
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div
          className="p-4 sm:p-4 rounded-xl mb-4 sm:mb-6"
          style={{
            background: "var(--gradient-surface)",
            border: "1px solid var(--border-soft)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--text-secondary)" }}
              />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                style={{ color: "var(--text-secondary)" }}
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "all") {
                    setStatusFilter("all");
                  } else if (isValidShipmentStatus(value)) {
                    setStatusFilter(value);
                  }
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-8 py-2.5 rounded-lg outline-none text-sm appearance-none cursor-pointer"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Status</option>
                <option value={ShipmentStatus.PENDING}>
                  {STATUS_LABELS[ShipmentStatus.PENDING]}
                </option>
                <option value={ShipmentStatus.QUOTED}>
                  {STATUS_LABELS[ShipmentStatus.QUOTED]}
                </option>
                <option value={ShipmentStatus.ACCEPTED}>
                  {STATUS_LABELS[ShipmentStatus.ACCEPTED]}
                </option>
                <option value={ShipmentStatus.PICKED_UP}>
                  {STATUS_LABELS[ShipmentStatus.PICKED_UP]}
                </option>
                <option value={ShipmentStatus.IN_TRANSIT}>
                  {STATUS_LABELS[ShipmentStatus.IN_TRANSIT]}
                </option>
                <option value={ShipmentStatus.DELIVERED}>
                  {STATUS_LABELS[ShipmentStatus.DELIVERED]}
                </option>
                <option value={ShipmentStatus.CANCELLED}>
                  {STATUS_LABELS[ShipmentStatus.CANCELLED]}
                </option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="relative">
              <Truck
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                style={{ color: "var(--text-secondary)" }}
              />
              <select
                value={serviceFilter}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "all") {
                    setServiceFilter("all");
                  } else if (isValidServiceType(value)) {
                    setServiceFilter(value);
                  }
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-8 py-2.5 rounded-lg outline-none text-sm appearance-none cursor-pointer"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Services</option>
                <option value={ServiceType.ROAD}>
                  {SERVICE_TYPE_LABELS[ServiceType.ROAD]}
                </option>
                <option value={ServiceType.AIR}>
                  {SERVICE_TYPE_LABELS[ServiceType.AIR]}
                </option>
                <option value={ServiceType.SEA}>
                  {SERVICE_TYPE_LABELS[ServiceType.SEA]}
                </option>
                <option value={ServiceType.DOOR_TO_DOOR}>
                  {SERVICE_TYPE_LABELS[ServiceType.DOOR_TO_DOOR]}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders - Desktop Table / Mobile Cards */}
        <div className="pb-20 lg:pb-6">
          {/* Desktop Table */}
          <div
            className="hidden lg:block rounded-xl overflow-hidden mb-6"
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
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Order ID
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Route
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Package
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Date
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Amount
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs font-semibold uppercase"
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
                        className="border-b transition-colors hover:bg-white/5 cursor-pointer"
                        style={{ borderColor: "var(--border-soft)" }}
                        onClick={() => setSelectedOrder(order)}
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
                          <div>
                            <div
                              className="text-sm font-medium mb-0.5"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {order.origin}
                            </div>
                            <div
                              className="text-xs flex items-center gap-1"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <ArrowRight className="h-3 w-3" />
                              {order.destination}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div
                            className="text-sm font-medium"
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
                            {(() => {
                              const Icon = getServiceIcon(order.service);
                              return (
                                <Icon
                                  className="h-4 w-4"
                                  style={{ color: "var(--accent-teal)" }}
                                />
                              );
                            })()}
                            <span
                              className="text-sm capitalize font-medium"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {SERVICE_TYPE_LABELS[order.service]}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium capitalize inline-flex items-center gap-1.5"
                            style={{
                              background: getStatusBg(order.status),
                              color: getStatusColor(order.status),
                            }}
                          >
                            {(() => {
                              const Icon = getStatusIcon(order.status);
                              return <Icon className="h-3 w-3" />;
                            })()}
                            {STATUS_LABELS[order.status]}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {order.date}
                        </td>
                        <td
                          className="py-4 px-4 font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {order.amount}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
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
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)}{" "}
                  of {filteredOrders.length} orders
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

                  {Array.from({ length: Math.min(totalPages, 5) }).map(
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                          style={{
                            background:
                              currentPage === pageNum
                                ? "var(--accent-teal)"
                                : "transparent",
                            border:
                              currentPage === pageNum
                                ? "none"
                                : "1px solid var(--border-soft)",
                            color:
                              currentPage === pageNum
                                ? "var(--text-inverse)"
                                : "var(--text-primary)",
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

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
            )}
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {paginatedOrders.length === 0 ? (
              <div
                className="p-8 rounded-xl text-center"
                style={{
                  background: "var(--gradient-surface)",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <AlertCircle
                  className="h-12 w-12 mx-auto mb-3"
                  style={{ color: "var(--text-secondary)" }}
                />
                <p
                  className="text-base font-medium mb-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  No orders found
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              paginatedOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="p-4 rounded-xl cursor-pointer active:scale-[0.98] transition-transform"
                  style={{
                    background: "var(--gradient-surface)",
                    border: "1px solid var(--border-soft)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="font-bold text-sm"
                        style={{ color: "var(--accent-amber)" }}
                      >
                        {order.id}
                      </span>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {order.date}
                      </div>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium capitalize inline-flex items-center gap-1.5"
                      style={{
                        background: getStatusBg(order.status),
                        color: getStatusColor(order.status),
                      }}
                    >
                      {(() => {
                        const Icon = getStatusIcon(order.status);
                        return <Icon className="h-3 w-3" />;
                      })()}
                      {order.status.replace("-", " ")}
                    </span>
                  </div>

                  {/* Route */}
                  <div
                    className="mb-3 p-3 rounded-lg"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <MapPin
                        className="h-3.5 w-3.5"
                        style={{ color: "var(--accent-teal)" }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        FROM
                      </span>
                    </div>
                    <div
                      className="text-sm font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {order.origin}
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <MapPin
                        className="h-3.5 w-3.5"
                        style={{ color: "var(--accent-amber)" }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        TO
                      </span>
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {order.destination}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Package
                      </div>
                      <div
                        className="text-sm font-semibold"
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
                    </div>

                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Service
                      </div>
                      <div className="flex items-center gap-1.5">
                        {(() => {
                          const Icon = getServiceIcon(order.service);
                          return (
                            <Icon
                              className="h-3.5 w-3.5"
                              style={{ color: "var(--accent-teal)" }}
                            />
                          );
                        })()}
                        <span
                          className="text-sm font-semibold capitalize"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {SERVICE_TYPE_LABELS[order.service]}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Amount
                      </div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: "var(--accent-teal)" }}
                      >
                        {order.amount}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3 border-t"
                    style={{ borderColor: "var(--border-soft)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Calendar
                        className="h-3.5 w-3.5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Est: {order.estimatedDelivery}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="text-xs font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{
                        background: "rgba(23,199,189,0.12)",
                        color: "var(--accent-teal)",
                      }}
                    >
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Mobile Pagination */}
            {paginatedOrders.length > 0 && (
              <div className="flex items-center justify-between pt-2">
                <div
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Page {currentPage} of {totalPages}
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
                          : "rgba(23,199,189,0.12)",
                      border: "1px solid var(--border-soft)",
                      color:
                        currentPage === 1
                          ? "var(--text-secondary)"
                          : "var(--accent-teal)",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

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
                          : "rgba(23,199,189,0.12)",
                      border: "1px solid var(--border-soft)",
                      color:
                        currentPage === totalPages
                          ? "var(--text-secondary)"
                          : "var(--accent-teal)",
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
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-soft)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2
                    className="text-lg sm:text-xl font-bold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Order Details
                  </h2>
                  <p
                    className="text-xs sm:text-sm flex items-center gap-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Package className="h-3.5 w-3.5" />
                    {selectedOrder.trackingNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-lg transition-all hover:scale-110 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div
                className="p-4 rounded-xl mb-6"
                style={{
                  background: getStatusBg(selectedOrder.status),
                  border: `1px solid ${getStatusColor(selectedOrder.status)}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = getStatusIcon(selectedOrder.status);
                      return (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            background: getStatusColor(selectedOrder.status),
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: "var(--text-inverse)" }}
                          />
                        </div>
                      );
                    })()}
                    <div>
                      <div
                        className="text-xs uppercase font-medium mb-0.5"
                        style={{ color: getStatusColor(selectedOrder.status) }}
                      >
                        Current Status
                      </div>
                      <div
                        className="font-bold text-sm sm:text-base capitalize"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.status.replace("-", " ")}
                      </div>
                    </div>
                  </div>
                  <span
                    className="font-bold text-xl sm:text-2xl"
                    style={{ color: getStatusColor(selectedOrder.status) }}
                  >
                    {selectedOrder.amount}
                  </span>
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="space-y-4 mb-6">
                {/* Route */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <div
                    className="text-xs uppercase mb-3 font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Shipment Route
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(23,199,189,0.15)" }}
                        >
                          <MapPin
                            className="h-4 w-4"
                            style={{ color: "var(--accent-teal)" }}
                          />
                        </div>
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Origin
                        </span>
                      </div>
                      <div
                        className="font-semibold text-sm pl-10"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.origin}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(244,162,97,0.15)" }}
                        >
                          <MapPin
                            className="h-4 w-4"
                            style={{ color: "var(--accent-amber)" }}
                          />
                        </div>
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Destination
                        </span>
                      </div>
                      <div
                        className="font-semibold text-sm pl-10"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.destination}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div
                      className="text-xs uppercase mb-2 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Package Details
                    </div>
                    <div
                      className="font-semibold mb-1 text-sm"
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
                      className="text-xs uppercase mb-2 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service Type
                    </div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icon = getServiceIcon(selectedOrder.service);
                        return (
                          <Icon
                            className="h-5 w-5"
                            style={{ color: "var(--accent-teal)" }}
                          />
                        );
                      })()}
                      <span
                        className="font-semibold capitalize text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedOrder.service}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <div
                      className="text-xs uppercase mb-2 font-medium flex items-center gap-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Order Date
                    </div>
                    <div
                      className="font-semibold text-sm"
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
                      className="text-xs uppercase mb-2 font-medium flex items-center gap-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      Est. Delivery
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--accent-amber)" }}
                    >
                      {selectedOrder.estimatedDelivery}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    window.location.href = `/dashboard/track?tn=${selectedOrder.trackingNumber}`;
                  }}
                  className="py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
                  style={{
                    background: "var(--accent-teal)",
                    color: "var(--text-inverse)",
                  }}
                >
                  <MapPin className="h-4 w-4" />
                  Track Order
                </button>
                <button
                  className="py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
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

        <BottomNav />
      </div>
    </Sidebar>
  );
}
