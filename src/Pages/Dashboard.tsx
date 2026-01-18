import Footer from "../components/home/Footer";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/sidebar";
import {
  Package,
  MapPin,
  ArrowRight,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { shipmentsApi } from "../api";
import type { ShipmentWithRelations } from "../types/shipment";

import {
  ShipmentStatus,
  ServiceType,
  STATUS_COLORS,
  STATUS_LABELS,
  SERVICE_TYPE_LABELS,
} from "../types/shipment";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shipmentsData, setShipmentsData] = useState<ShipmentWithRelations[]>(
    [],
  );
  const [isLoadingShipments, setIsLoadingShipments] = useState(false);
  const [shipmentsError, setShipmentsError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const NEW_USER_KEY = "dd_is_new_user";
  const [isNewUser, setIsNewUser] = useState(() => {
    try {
      return sessionStorage.getItem(NEW_USER_KEY) === "1";
    } catch {
      return false;
    }
  });

  const displayName =
    user?.name?.trim()?.split(" ")?.[0] ||
    user?.email?.trim()?.split("@")?.[0] ||
    "there";

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatNairaCompact = (amount: number) => {
    const safe = Number.isFinite(amount) ? amount : 0;
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: safe >= 1_000_000 ? 1 : 0,
      }).format(safe);
    } catch {
      return `₦${Math.round(safe).toLocaleString("en-NG")}`;
    }
  };

  const getProgressForStatus = (status: ShipmentStatus) => {
    switch (status) {
      case ShipmentStatus.DELIVERED:
        return 100;
      case ShipmentStatus.IN_TRANSIT:
        return 80;
      case ShipmentStatus.PICKED_UP:
        return 60;
      case ShipmentStatus.ACCEPTED:
        return 40;
      case ShipmentStatus.QUOTED:
        return 30;
      case ShipmentStatus.PENDING:
        return 20;
      case ShipmentStatus.CANCELLED:
      default:
        return 0;
    }
  };

  const STATUS_STEPS: ShipmentStatus[] = [
    ShipmentStatus.PENDING,
    ShipmentStatus.ACCEPTED,
    ShipmentStatus.PICKED_UP,
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.DELIVERED,
  ];

  const statusRank = (status: ShipmentStatus) => {
    if (status === ShipmentStatus.QUOTED) return 1;
    const idx = STATUS_STEPS.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  const loadShipments = async (customerId: string) => {
    setIsLoadingShipments(true);
    setShipmentsError(null);

    try {
      const result = await shipmentsApi.list({ customerId });
      setShipmentsData(result);
    } catch (err: any) {
      setShipmentsError(err?.message ?? "Failed to load shipments.");
      setShipmentsData([]);
    } finally {
      setIsLoadingShipments(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    void loadShipments(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const {
    shipments,
    recentOrders,
    hasData,
    activeCount,
    deliveredCount,
    totalSpentLabel,
    totalSpentChangeLabel,
    totalSpentTrend,
  } = useMemo(() => {
    const all = shipmentsData ?? [];

    const active = all.filter(
      (s) =>
        s.status !== ShipmentStatus.DELIVERED &&
        s.status !== ShipmentStatus.CANCELLED,
    );
    const delivered = all.filter((s) => s.status === ShipmentStatus.DELIVERED);

    const shipmentsUi = active.slice(0, 5).map((s) => {
      const rank = statusRank(s.status);
      return {
        code: s.trackingId,
        location: s.destinationLocation,
        est: formatDateTime(s.updatedAt ?? s.createdAt),
        progress: getProgressForStatus(s.status),
        steps: STATUS_STEPS.map((stepStatus, idx) => ({
          status: stepStatus,
          date:
            idx === rank && s.statusHistory?.[0]?.timestamp
              ? formatDateTime(s.statusHistory[0].timestamp)
              : "",
          done: idx <= rank && s.status !== ShipmentStatus.CANCELLED,
        })),
      };
    });

    const ordersUi = all.slice(0, 50).map((s) => ({
      id: s.trackingId,
      pickup: s.pickupLocation,
      dest: s.destinationLocation,
      serviceType: s.serviceType,
      status: s.status,
      date: new Date(s.createdAt).toISOString().slice(0, 10),
    }));

    const amounts = all
      .map((s) => (typeof s.amount === "number" ? s.amount : 0))
      .filter((a) => Number.isFinite(a) && a > 0);

    const totalSpent = amounts.reduce((sum, a) => sum + a, 0);

    const DAY_MS = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const last30Start = now - 30 * DAY_MS;
    const prev30Start = now - 60 * DAY_MS;

    const sumInRange = (startMs: number, endMs: number) =>
      all.reduce((sum, s) => {
        const ts = new Date(s.createdAt).getTime();
        const a = typeof s.amount === "number" ? s.amount : 0;
        if (!Number.isFinite(ts) || ts < startMs || ts >= endMs) return sum;
        if (!Number.isFinite(a) || a <= 0) return sum;
        return sum + a;
      }, 0);

    const spentLast30 = sumInRange(last30Start, now);
    const spentPrev30 = sumInRange(prev30Start, last30Start);

    const changePct =
      spentPrev30 > 0
        ? ((spentLast30 - spentPrev30) / spentPrev30) * 100
        : spentLast30 > 0
          ? 100
          : 0;

    const roundedPct = Math.round(changePct);
    const trend: "up" | "down" = roundedPct >= 0 ? "up" : "down";
    const changeLabel =
      totalSpent > 0 ? `${roundedPct >= 0 ? "+" : ""}${roundedPct}%` : "—";

    return {
      shipments: shipmentsUi,
      recentOrders: ordersUi,
      hasData: all.length > 0,
      activeCount: active.length,
      deliveredCount: delivered.length,
      totalSpentLabel: formatNairaCompact(totalSpent),
      totalSpentChangeLabel: changeLabel,
      totalSpentTrend: trend,
    };
  }, [shipmentsData]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentOrders.length]);

  const dismissOnboarding = () => {
    try {
      sessionStorage.setItem(NEW_USER_KEY, "0");
    } catch {
      // ignore
    }
    setIsNewUser(false);
  };

  const startFirstDelivery = () => {
    dismissOnboarding();
    navigate("/dashboard/new-delivery");
  };

  if (isLoadingShipments) {
    return (
      <Sidebar>
        <div
          className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8"
          style={{ background: "var(--bg-primary)" }}
        >
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div
                  className="h-4 w-44 rounded-md animate-pulse"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <div
                  className="h-3 w-64 rounded-md mt-3 animate-pulse"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              </div>
              <div
                className="h-10 w-32 rounded-lg animate-pulse"
                style={{ background: "rgba(46,196,182,0.10)" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{
                    border: "1px solid var(--border-soft)",
                    background: "rgba(0,0,0,0.18)",
                  }}
                >
                  <div
                    className="h-10 w-10 rounded-xl mb-4 animate-pulse"
                    style={{ background: "rgba(244,162,97,0.10)" }}
                  />
                  <div
                    className="h-4 w-40 rounded-md animate-pulse"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <div
                    className="h-3 w-56 rounded-md mt-3 animate-pulse"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <BottomNav />
          <Footer />
        </div>
      </Sidebar>
    );
  }

  if (!hasData) {
    return (
      <Sidebar>
        <div
          className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8"
          style={{ background: "var(--bg-primary)" }}
        >
          <div
            className="rounded-2xl p-5 sm:p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(46,196,182,0.10), rgba(244,162,97,0.06))",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
                  style={{
                    background: "rgba(46,196,182,0.12)",
                    color: "var(--accent-teal)",
                  }}
                >
                  {shipmentsError ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    {shipmentsError
                      ? "We couldn't load your shipments"
                      : isNewUser
                        ? "Account created successfully"
                        : "No shipments yet"}
                  </span>
                </div>

                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Welcome, {displayName}
                </h1>

                <p
                  className="text-sm sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {shipmentsError
                    ? shipmentsError
                    : "Your dashboard is empty for now — create your first delivery to start tracking shipments here."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <button
                  onClick={() =>
                    shipmentsError && user?.id
                      ? loadShipments(user.id)
                      : startFirstDelivery()
                  }
                  className="rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{
                    background: "var(--gradient-primary)",
                    color: "var(--text-inverse)",
                    boxShadow: "var(--glow-accent)",
                  }}
                >
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>
                    {shipmentsError
                      ? "Retry loading"
                      : "Send your first package"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => navigate("/dashboard/track")}
                  className="rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold border transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
                  style={{
                    background: "transparent",
                    color: "var(--text-primary)",
                    borderColor: "var(--border-medium)",
                  }}
                >
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Track a package
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                title: "Create a delivery",
                desc: "Fill pickup, destination, and package details.",
                icon: Package,
                accentBg: "rgba(244,162,97,0.10)",
                accent: "var(--accent-amber)",
              },
              {
                title: "Track updates",
                desc: "See status changes and delivery progress in real time.",
                icon: Truck,
                accentBg: "rgba(78,168,222,0.10)",
                accent: "var(--accent-sky)",
              },
              {
                title: "Manage orders",
                desc: "View history, receipts, and shipment details anytime.",
                icon: List,
                accentBg: "rgba(46,196,182,0.10)",
                accent: "var(--accent-teal)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-5"
                style={{
                  background: "var(--gradient-surface)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: item.accentBg, color: item.accent }}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <BottomNav />
          <Footer />
        </div>
      </Sidebar>
    );
  }

  const paginatedOrders = recentOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
                <span style={{ color: "var(--accent-coral)" }}>
                  {displayName}!
                </span>
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
                      {activeCount}
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
                      {deliveredCount}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Delivered
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => navigate("/dashboard/new-delivery")}
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
                onClick={() => navigate("/dashboard/track")}
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
              value: String(shipmentsData.length),
              change: "+12%",
              trend: "up",
              icon: Package,
              color: "var(--accent-amber)",
            },
            {
              label: "Active Shipments",
              value: String(activeCount),
              change: "+8%",
              trend: "up",
              icon: Truck,
              color: "var(--status-in-transit)",
            },
            {
              label: "Completed Orders",
              value: String(deliveredCount),
              change: "+5%",
              trend: "up",
              icon: CheckCircle,
              color: "var(--status-delivered)",
            },
            {
              label: "Total Spent",
              value: totalSpentLabel,
              change: totalSpentChangeLabel,
              trend: totalSpentTrend,
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
                {activeCount} active
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
                          {STATUS_LABELS[step.status]}
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
                              {STATUS_LABELS[step.status]}
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
                          {order.serviceType === ServiceType.AIR ? (
                            <Plane
                              className="h-4 w-4"
                              style={{ color: "var(--accent-teal)" }}
                            />
                          ) : order.serviceType === ServiceType.SEA ? (
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
                            {SERVICE_TYPE_LABELS[order.serviceType]}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                          style={{
                            background: STATUS_COLORS[order.status].bg,
                            color: STATUS_COLORS[order.status].text,
                          }}
                        >
                          {order.status === ShipmentStatus.DELIVERED ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : order.status === ShipmentStatus.PENDING ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <Truck className="h-3 w-3" />
                          )}
                          {STATUS_LABELS[order.status]}
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
                        background: STATUS_COLORS[order.status].bg,
                        color: STATUS_COLORS[order.status].text,
                      }}
                    >
                      {STATUS_LABELS[order.status]}
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
                      {order.serviceType === ServiceType.AIR ? (
                        <Plane className="h-3 w-3" />
                      ) : order.serviceType === ServiceType.SEA ? (
                        <Ship className="h-3 w-3" />
                      ) : (
                        <Truck className="h-3 w-3" />
                      )}
                      {SERVICE_TYPE_LABELS[order.serviceType]}
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
