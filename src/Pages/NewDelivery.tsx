import { useMemo, useState } from "react";
import { Sidebar } from "../components/dashboard/sidebar";
import {
  MapPin,
  Package,
  Truck,
  Box,
  Weight,
  Ruler,
  Clock,
  Zap,
  Ship,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  X,
  Loader2,
  AlertCircle,
  Navigation,
} from "lucide-react";
import BottomNav from "../components/dashboard/bottom-nav";
import { SERVICE_TYPE_LABELS, ServiceType } from "../types/shipment";
import { shipmentsApi, ratesApi } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// ─── Backend rate-engine types (mirrored from backend DTOs) ─────────────────

type ManualMode = "parcel" | "air" | "ocean" | "ground";
type ManualContainerType = "20ft" | "40ft" | "40hc";

interface ManualQuoteRequest {
  mode: ManualMode;
  origin: string;
  destination: string;
  weightKg?: number;
  dimensionsCm?: { length: number; width: number; height: number };
  containerType?: ManualContainerType;
  isExpress?: boolean;
}

interface Money {
  amount: number;
  currency: "NGN";
}

interface BackendQuote {
  provider: "manual-rate-engine";
  mode: ManualMode;
  origin?: string;
  destination?: string;
  chargeableWeightKg?: number;
  breakdown: {
    base: Money;
    surcharges: Money;
    margin: Money;
    total: Money;
    assumptions: string[];
  };
}

// ─── ServiceType → ManualMode ─────────────────────────────────────────────
// ServiceType is "ROAD" | "AIR" | "SEA" | "DOOR_TO_DOOR" (string literals, NOT enum)

const SERVICE_TO_MODE: Record<ServiceType, ManualMode> = {
  ROAD: "ground",
  AIR: "air",
  SEA: "ocean",
  DOOR_TO_DOOR: "ground",
};

function inferContainerType(
  packageType: string,
): ManualContainerType | undefined {
  return packageType === "container" ? "40ft" : undefined;
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormData {
  originStreet: string;
  originCity: string;
  originState: string;
  originCountry: string;
  destStreet: string;
  destCity: string;
  destState: string;
  destCountry: string;
  packageType: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  declaredValueNgn: string;
  serviceType: ServiceType | "";
  userWhatsApp: string;
  receiverWhatsApp: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function NewDelivery() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEstimateLoading, setIsEstimateLoading] = useState(false);
  const [isEstimateDrawerOpen, setIsEstimateDrawerOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [backendQuote, setBackendQuote] = useState<BackendQuote | null>(null);

  const [formData, setFormData] = useState<FormData>({
    originStreet: "",
    originCity: "",
    originState: "",
    originCountry: "",
    destStreet: "",
    destCity: "",
    destState: "",
    destCountry: "",
    packageType: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValueNgn: "",
    serviceType: "",
    userWhatsApp: "",
    receiverWhatsApp: "",
  });

  const packageTypes = [
    { id: "parcel", label: "Parcel", icon: Package },
    { id: "pallet", label: "Boxes", icon: Box },
    { id: "container", label: "Container", icon: Box },
    { id: "full-freight", label: "Full Freight", icon: Truck },
  ];

  // Use string literal values directly — no enum dot-access
  const serviceTypes: Array<{
    id: ServiceType;
    label: string;
    icon: React.ElementType;
  }> = [
    { id: "ROAD", label: SERVICE_TYPE_LABELS["ROAD"], icon: Clock },
    { id: "AIR", label: SERVICE_TYPE_LABELS["AIR"], icon: Zap },
    { id: "SEA", label: SERVICE_TYPE_LABELS["SEA"], icon: Ship },
    {
      id: "DOOR_TO_DOOR",
      label: SERVICE_TYPE_LABELS["DOOR_TO_DOOR"],
      icon: Navigation,
    },
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setBackendQuote(null); // clear stale estimate on every edit
  };

  // ── Validation ─────────────────────────────────────────────────────────────

  const canProceedStep1 = () =>
    !!(
      formData.originStreet &&
      formData.originCity &&
      formData.originState &&
      formData.originCountry &&
      formData.destStreet &&
      formData.destCity &&
      formData.destState &&
      formData.destCountry
    );

  const canProceedStep2 = () =>
    !!(formData.packageType && formData.weight && formData.serviceType);

  const canProceedStep3 = () =>
    formData.userWhatsApp.trim().length > 0 &&
    formData.receiverWhatsApp.trim().length > 0;

  // ── Derived fields for shipmentsApi.create ────────────────────────────────

  const pickupLocation = useMemo(
    () =>
      `${formData.originStreet}, ${formData.originCity}, ${formData.originState}, ${formData.originCountry}`.trim(),
    [
      formData.originStreet,
      formData.originCity,
      formData.originState,
      formData.originCountry,
    ],
  );

  const destinationLocation = useMemo(
    () =>
      `${formData.destStreet}, ${formData.destCity}, ${formData.destState}, ${formData.destCountry}`.trim(),
    [
      formData.destStreet,
      formData.destCity,
      formData.destState,
      formData.destCountry,
    ],
  );

  const dimensions = useMemo(() => {
    const l = formData.length?.trim();
    const w = formData.width?.trim();
    const h = formData.height?.trim();
    return l && w && h ? `${l}x${w}x${h} cm` : "";
  }, [formData.length, formData.width, formData.height]);

  // ── Client-side estimate (instant preview / fallback) ─────────────────────

  const clientEstimate = useMemo(() => {
    const toNum = (v: string) => {
      const n = parseFloat(String(v ?? "").trim());
      return Number.isFinite(n) ? n : 0;
    };
    const norm = (v: string) =>
      String(v ?? "")
        .trim()
        .toLowerCase();

    const originCountry = norm(formData.originCountry);
    const destCountry = norm(formData.destCountry);
    const originState = norm(formData.originState);
    const destState = norm(formData.destState);

    const actualWeightKg = Math.max(0, toNum(formData.weight));
    const l = Math.max(0, toNum(formData.length));
    const w = Math.max(0, toNum(formData.width));
    const h = Math.max(0, toNum(formData.height));
    const volumetricWeightKg = l && w && h ? (l * w * h) / 5000 : 0;
    const chargeableWeightKg = Math.max(
      actualWeightKg,
      volumetricWeightKg,
      0.5,
    );

    const routeFactor = (() => {
      if (originCountry && destCountry && originCountry !== destCountry)
        return 1.7;
      if (originState && destState && originState !== destState) return 1.25;
      return 1.0;
    })();

    const st = formData.serviceType;
    const ratePerKg = st === "AIR" ? 4500 : st === "SEA" ? 2200 : 2500;
    const baseFee = st === "AIR" ? 12000 : st === "SEA" ? 10000 : 8000;

    const handlingFee =
      formData.packageType === "container"
        ? 20000
        : formData.packageType === "full-freight"
          ? 25000
          : formData.packageType === "pallet"
            ? 8000
            : 4000;

    const transportFee = ratePerKg * chargeableWeightKg * routeFactor;
    const subtotal = baseFee + handlingFee + transportFee;
    const fuelSurcharge = subtotal * 0.12;
    const estimatedTotal = subtotal + fuelSurcharge;

    const roundTo = (v: number, step: number) => Math.round(v / step) * step;
    const low = roundTo(estimatedTotal * 0.9, 500);
    const high = roundTo(estimatedTotal * 1.15, 500);

    const formatNgn = (value: number) => {
      try {
        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(value);
      } catch {
        return `₦${value.toFixed(0)}`;
      }
    };

    return {
      isReady: canProceedStep1() && canProceedStep2() && canProceedStep3(),
      chargeableWeightKg,
      actualWeightKg,
      volumetricWeightKg,
      routeFactor,
      ratePerKg,
      baseFee,
      handlingFee,
      transportFee,
      fuelSurcharge,
      low,
      high,
      formatNgn,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.originCountry,
    formData.destCountry,
    formData.originState,
    formData.destState,
    formData.weight,
    formData.length,
    formData.width,
    formData.height,
    formData.serviceType,
    formData.packageType,
  ]);

  // ── Shared NGN formatter for backend values ────────────────────────────────

  const formatNgn = (amount: number) => {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `₦${amount.toFixed(0)}`;
    }
  };

  // ── WhatsApp message ───────────────────────────────────────────────────────

  const buildWhatsAppMessage = (opts?: { trackingId?: string }) => {
    const companyWhatsApp = "2349010191502";
    const serviceTypeLabel = formData.serviceType
      ? SERVICE_TYPE_LABELS[formData.serviceType]
      : "Not specified";

    const trackingLine = opts?.trackingId
      ? `\nTracking Number: ${opts.trackingId}`
      : "";

    const estimateLine = backendQuote
      ? `\n\n🧮 *ESTIMATED QUOTE (rate engine)*\n${formatNgn(backendQuote.breakdown.total.amount)}`
      : clientEstimate.isReady
        ? `\n\n🧮 *ESTIMATED QUOTE*\n${clientEstimate.formatNgn(clientEstimate.low)} – ${clientEstimate.formatNgn(clientEstimate.high)} (estimate only)`
        : "";

    const message = `Hello! I would like to get a quote for my shipment:${trackingLine}

📦 *SHIPMENT DETAILS*
━━━━━━━━━━━━━━━━━━
📍 Origin: ${formData.originStreet}, ${formData.originCity}, ${formData.originState}, ${formData.originCountry}
📍 Destination: ${formData.destStreet}, ${formData.destCity}, ${formData.destState}, ${formData.destCountry}

📋 *PACKAGE INFORMATION*
━━━━━━━━━━━━━━━━━━
Type: ${formData.packageType}
Weight: ${formData.weight} kg
Dimensions: ${formData.length}×${formData.width}×${formData.height} cm
Declared value: ${formData.declaredValueNgn.trim() ? `₦${formData.declaredValueNgn}` : "Not provided"}

Service: ${serviceTypeLabel}${estimateLine}

📱 *MY CONTACT*
━━━━━━━━━━━━━━━━━━
WhatsApp: ${formData.userWhatsApp}

📱 *RECEIVER CONTACT*
━━━━━━━━━━━━━━━━━━
WhatsApp: ${formData.receiverWhatsApp}

Please provide pricing for this shipment. Thank you!`;

    return {
      message,
      whatsappUrl: `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(message)}`,
    };
  };

  // ── Submit Step 3: call rate engine → open drawer ─────────────────────────

  const handleSubmitOpenEstimate = async () => {
    if (!canProceedStep1() || !canProceedStep2() || !canProceedStep3()) return;

    setSubmitError(null);
    setIsEstimateLoading(true);

    try {
      const st = formData.serviceType as ServiceType;
      const weightKg = parseFloat(formData.weight);
      const l = parseFloat(formData.length);
      const w = parseFloat(formData.width);
      const h = parseFloat(formData.height);

      const payload: ManualQuoteRequest = {
        mode: SERVICE_TO_MODE[st],
        origin: `${formData.originCity}, ${formData.originCountry}`,
        destination: `${formData.destCity}, ${formData.destCountry}`,
        weightKg:
          Number.isFinite(weightKg) && weightKg > 0 ? weightKg : undefined,
        dimensionsCm:
          Number.isFinite(l) &&
          l > 0 &&
          Number.isFinite(w) &&
          Number.isFinite(h)
            ? { length: l, width: w, height: h }
            : undefined,
        containerType: inferContainerType(formData.packageType),
        isExpress: st === "AIR" ? false : undefined,
      };

      // ratesApi.manualEstimate uses apiClient under the hood — same auth/base URL as everything else
      const result = await ratesApi.manualEstimate(payload);
      setBackendQuote(
        result?.status === "ok" && result.quote ? result.quote : null,
      );
    } catch {
      setBackendQuote(null); // silently fall back to client-side estimate
    } finally {
      setIsEstimateLoading(false);
      setIsEstimateDrawerOpen(true);
    }
  };

  // ── Final submit: create shipment record → WhatsApp ───────────────────────

  const handlePlaceOrderToWhatsApp = async () => {
    if (!canProceedStep1() || !canProceedStep2() || !canProceedStep3()) return;

    const waWindow = window.open("about:blank", "_blank");
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const declaredValueNgn = (() => {
        const raw = String(formData.declaredValueNgn ?? "").trim();
        if (!raw) return undefined;
        const n = parseInt(raw, 10);
        return Number.isFinite(n) && n >= 0 ? n : undefined;
      })();

      const shipment = await shipmentsApi.create({
        serviceType: formData.serviceType as ServiceType,
        pickupLocation,
        destinationLocation,
        packageType: formData.packageType,
        weight: formData.weight,
        dimensions,
        phone: formData.userWhatsApp.trim(),
        receiverPhone: formData.receiverWhatsApp.trim(),
        declaredValueNgn,
      });

      const { whatsappUrl } = buildWhatsAppMessage({
        trackingId: shipment.trackingId,
      });

      if (waWindow && !waWindow.closed) {
        waWindow.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, "_blank");
      }

      setIsEstimateDrawerOpen(false);
      navigate(
        `/dashboard/track?tn=${encodeURIComponent(shipment.trackingId)}`,
      );
    } catch (err: any) {
      if (err?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      if (waWindow && !waWindow.closed) waWindow.close();
      setSubmitError(err?.message ?? "Failed to create shipment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Drawer display values ─────────────────────────────────────────────────

  const drawerTotal = backendQuote
    ? formatNgn(backendQuote.breakdown.total.amount)
    : `${clientEstimate.formatNgn(clientEstimate.low)} – ${clientEstimate.formatNgn(clientEstimate.high)}`;

  const drawerLabel = backendQuote ? "Rate Engine Estimate" : "Estimated Range";

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

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
              <Truck
                className="h-5 w-5 sm:h-6 sm:w-6"
                style={{ color: "var(--accent-teal)" }}
              />
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                DigitalDelivery
              </h1>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                New Shipment
              </p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-4 max-w-3xl mx-auto overflow-x-auto pb-2">
          {[1, 2, 3].map((step, idx) => (
            <div key={step} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all shrink-0"
                  style={{
                    background:
                      currentStep >= step
                        ? "var(--accent-teal)"
                        : "rgba(255,255,255,0.05)",
                    color:
                      currentStep >= step
                        ? "var(--text-inverse)"
                        : "var(--text-secondary)",
                    border:
                      currentStep === step
                        ? "2px solid var(--accent-teal)"
                        : "none",
                  }}
                >
                  {step}
                </div>
                <span
                  className="text-xs sm:text-sm font-medium whitespace-nowrap"
                  style={{
                    color:
                      currentStep >= step
                        ? "var(--accent-teal)"
                        : "var(--text-secondary)",
                  }}
                >
                  {step === 1 ? "Route" : step === 2 ? "Package" : "Contact"}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className="h-0.5 w-12 sm:w-24 lg:w-32 shrink-0"
                  style={{
                    background:
                      currentStep > step
                        ? "var(--accent-teal)"
                        : "rgba(255,255,255,0.1)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
            style={{
              background: "var(--gradient-surface)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-soft)",
              borderTop: "3px solid var(--accent-teal)",
            }}
          >
            {/* ── Step 1: Route ── */}
            {currentStep === 1 && (
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Shipment Route
                </h2>
                <p
                  className="mb-4 sm:mb-6 text-sm sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Enter origin and destination details
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Origin */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <MapPin
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: "var(--accent-teal)" }}
                      />
                      <h3
                        className="text-base sm:text-lg font-semibold uppercase"
                        style={{ color: "var(--accent-teal)" }}
                      >
                        Origin
                      </h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {(
                        [
                          {
                            field: "originStreet",
                            label: "Street",
                            placeholder: "e.g., 12 Harbor Road",
                          },
                          {
                            field: "originCity",
                            label: "City",
                            placeholder: "e.g., Shanghai",
                          },
                          {
                            field: "originState",
                            label: "State",
                            placeholder: "e.g., Guangdong",
                          },
                          {
                            field: "originCountry",
                            label: "Country",
                            placeholder: "e.g., China",
                          },
                        ] as const
                      ).map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label
                            className="block text-xs sm:text-sm font-medium mb-2 uppercase"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {label}
                          </label>
                          <input
                            type="text"
                            placeholder={placeholder}
                            value={formData[field]}
                            onChange={(e) =>
                              updateFormData(field, e.target.value)
                            }
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              border: "1px solid var(--border-soft)",
                              color: "var(--text-primary)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <MapPin
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: "var(--accent-amber)" }}
                      />
                      <h3
                        className="text-base sm:text-lg font-semibold uppercase"
                        style={{ color: "var(--accent-amber)" }}
                      >
                        Destination
                      </h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {(
                        [
                          {
                            field: "destStreet",
                            label: "Street",
                            placeholder: "e.g., 500 Sunset Blvd",
                          },
                          {
                            field: "destCity",
                            label: "City",
                            placeholder: "e.g., Los Angeles",
                          },
                          {
                            field: "destState",
                            label: "State",
                            placeholder: "e.g., California",
                          },
                          {
                            field: "destCountry",
                            label: "Country",
                            placeholder: "e.g., United States",
                          },
                        ] as const
                      ).map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label
                            className="block text-xs sm:text-sm font-medium mb-2 uppercase"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {label}
                          </label>
                          <input
                            type="text"
                            placeholder={placeholder}
                            value={formData[field]}
                            onChange={(e) =>
                              updateFormData(field, e.target.value)
                            }
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              border: "1px solid var(--border-soft)",
                              color: "var(--text-primary)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedStep1()}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center gap-2 transition-all text-sm sm:text-base"
                    style={{
                      background: canProceedStep1()
                        ? "var(--accent-teal)"
                        : "rgba(255,255,255,0.05)",
                      color: canProceedStep1()
                        ? "var(--text-inverse)"
                        : "var(--text-secondary)",
                      cursor: canProceedStep1() ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Package ── */}
            {currentStep === 2 && (
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Package Details
                </h2>
                <p
                  className="mb-4 sm:mb-6 text-sm sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Specify package type, weight, and dimensions
                </p>

                {/* Package Type */}
                <div className="mb-4 sm:mb-6">
                  <label
                    className="block text-xs sm:text-sm font-medium mb-3 uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Package Type
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {packageTypes.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => updateFormData("packageType", pkg.id)}
                        className="p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105 active:scale-95"
                        style={{
                          background:
                            formData.packageType === pkg.id
                              ? "rgba(23,199,189,0.15)"
                              : "rgba(0,0,0,0.2)",
                          border:
                            formData.packageType === pkg.id
                              ? "2px solid var(--accent-teal)"
                              : "1px solid var(--border-soft)",
                        }}
                      >
                        <pkg.icon
                          className="h-6 w-6 sm:h-8 sm:w-8"
                          style={{
                            color:
                              formData.packageType === pkg.id
                                ? "var(--accent-teal)"
                                : "var(--text-secondary)",
                          }}
                        />
                        <span
                          className="font-medium text-xs sm:text-sm text-center"
                          style={{
                            color:
                              formData.packageType === pkg.id
                                ? "var(--text-primary)"
                                : "var(--text-secondary)",
                          }}
                        >
                          {pkg.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight & Dimensions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {(
                    [
                      {
                        field: "weight",
                        label: "Weight (KG)",
                        Icon: Weight,
                        placeholder: "0.00",
                      },
                      {
                        field: "length",
                        label: "L (CM)",
                        Icon: Ruler,
                        placeholder: "0",
                      },
                      {
                        field: "width",
                        label: "W (CM)",
                        Icon: Ruler,
                        placeholder: "0",
                      },
                      {
                        field: "height",
                        label: "H (CM)",
                        Icon: Ruler,
                        placeholder: "0",
                      },
                    ] as const
                  ).map(({ field, label, Icon, placeholder }) => (
                    <div key={field}>
                      <label
                        className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4" /> {label}
                      </label>
                      <input
                        type="number"
                        placeholder={placeholder}
                        value={formData[field]}
                        onChange={(e) => updateFormData(field, e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid var(--border-soft)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Declared Value */}
                <div className="mb-4 sm:mb-6">
                  <label
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Package className="h-3 w-3 sm:h-4 sm:w-4" /> Item Value (₦)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    placeholder="e.g. 500000"
                    value={formData.declaredValueNgn}
                    onChange={(e) =>
                      updateFormData("declaredValueNgn", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  />
                  <p
                    className="mt-2 text-xs sm:text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Used for risk/insurance consideration.
                  </p>
                </div>

                {/* Service Type */}
                <div className="mb-4 sm:mb-6">
                  <label
                    className="block text-xs sm:text-sm font-medium mb-3 uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Service Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.id}
                        onClick={() =>
                          updateFormData("serviceType", service.id)
                        }
                        className="p-3 sm:p-4 rounded-xl transition-all hover:scale-105 active:scale-95"
                        style={{
                          background:
                            formData.serviceType === service.id
                              ? "rgba(23,199,189,0.15)"
                              : "rgba(0,0,0,0.2)",
                          border:
                            formData.serviceType === service.id
                              ? "2px solid var(--accent-teal)"
                              : "1px solid var(--border-soft)",
                        }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <service.icon
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            style={{
                              color:
                                formData.serviceType === service.id
                                  ? "var(--accent-teal)"
                                  : "var(--text-secondary)",
                            }}
                          />
                          <span
                            className="font-semibold text-xs sm:text-sm"
                            style={{
                              color:
                                formData.serviceType === service.id
                                  ? "var(--text-primary)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {service.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-2 sm:order-1"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedStep2()}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-1 sm:order-2"
                    style={{
                      background: canProceedStep2()
                        ? "var(--accent-teal)"
                        : "rgba(255,255,255,0.05)",
                      color: canProceedStep2()
                        ? "var(--text-inverse)"
                        : "var(--text-secondary)",
                      cursor: canProceedStep2() ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Contact ── */}
            {currentStep === 3 && (
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Contact Details
                </h2>
                <p
                  className="mb-4 sm:mb-6 text-sm sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  We'll discuss your quote via WhatsApp
                </p>

                {/* Summary */}
                <div
                  className="p-4 sm:p-6 rounded-xl mb-4 sm:mb-6"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <h3
                    className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Shipment Summary
                  </h3>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: "var(--accent-teal)" }}
                      />
                      <div>
                        <div
                          className="text-xs uppercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Origin
                        </div>
                        <div
                          className="font-semibold text-sm sm:text-base"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formData.originStreet}, {formData.originCity},{" "}
                          {formData.originState}, {formData.originCountry}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      className="h-5 w-5 hidden sm:block shrink-0"
                      style={{ color: "var(--accent-teal)" }}
                    />
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: "var(--accent-amber)" }}
                      />
                      <div>
                        <div
                          className="text-xs uppercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Destination
                        </div>
                        <div
                          className="font-semibold text-sm sm:text-base"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formData.destStreet}, {formData.destCity},{" "}
                          {formData.destState}, {formData.destCountry}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <div
                        className="text-xs uppercase mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Package
                      </div>
                      <div
                        className="font-semibold capitalize text-sm sm:text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formData.packageType.replace("-", " ")}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-xs uppercase mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Weight
                      </div>
                      <div
                        className="font-semibold text-sm sm:text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formData.weight} kg
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div
                        className="text-xs uppercase mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Dimensions
                      </div>
                      <div
                        className="font-semibold text-sm sm:text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formData.length}×{formData.width}×{formData.height} cm
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-3 sm:mt-4 pt-3 sm:pt-4"
                    style={{ borderTop: "1px solid var(--border-soft)" }}
                  >
                    <div
                      className="text-xs uppercase mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Service Type
                    </div>
                    <div
                      className="font-semibold text-sm sm:text-base"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      {formData.serviceType
                        ? SERVICE_TYPE_LABELS[formData.serviceType]
                        : ""}
                    </div>
                  </div>
                </div>

                {/* WhatsApp inputs */}
                {(
                  [
                    {
                      field: "userWhatsApp",
                      label: "Your WhatsApp Number",
                      placeholder: "e.g., +234 801 234 5678",
                    },
                    {
                      field: "receiverWhatsApp",
                      label: "Receiver's WhatsApp Number",
                      placeholder: "e.g., +234 801 234 5678",
                    },
                  ] as const
                ).map(({ field, label, placeholder }) => (
                  <div key={field} className="mb-4 sm:mb-6">
                    <label
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />{" "}
                      {label}
                    </label>
                    <input
                      type="tel"
                      placeholder={placeholder}
                      value={formData[field]}
                      onChange={(e) => updateFormData(field, e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <p
                      className="text-xs mt-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Include country code (e.g., +234 for Nigeria)
                    </p>
                  </div>
                ))}

                {submitError && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {submitError}
                  </div>
                )}

                {/* Info box */}
                <div
                  className="p-3 sm:p-4 rounded-lg mb-4 sm:mb-6"
                  style={{
                    background: "rgba(23,199,189,0.1)",
                    border: "1px solid var(--accent-teal)",
                  }}
                >
                  <div className="flex gap-2 sm:gap-3">
                    <MessageCircle
                      className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5"
                      style={{ color: "var(--accent-teal)" }}
                    />
                    <div>
                      <p
                        className="text-xs sm:text-sm font-medium mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Get Your Quote on WhatsApp
                      </p>
                      <p
                        className="text-xs sm:text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Click below to see your estimate and send your shipment
                        details to our team.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-2 sm:order-1"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  <button
                    onClick={handleSubmitOpenEstimate}
                    disabled={!canProceedStep3() || isEstimateLoading}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-1 sm:order-2"
                    style={{
                      background:
                        canProceedStep3() && !isEstimateLoading
                          ? "var(--accent-teal)"
                          : "rgba(255,255,255,0.05)",
                      color:
                        canProceedStep3() && !isEstimateLoading
                          ? "var(--text-inverse)"
                          : "var(--text-secondary)",
                      cursor:
                        canProceedStep3() && !isEstimateLoading
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    {isEstimateLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Getting
                        estimate…
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4" /> Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Estimate Drawer ── */}
        {isEstimateDrawerOpen && (
          <div className="fixed inset-0 z-60">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close estimate drawer"
              onClick={() => setIsEstimateDrawerOpen(false)}
            />

            <div
              role="dialog"
              aria-modal="true"
              className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto"
              style={{
                background: "hsl(var(--card) / 0.95)",
                borderLeft: "1px solid var(--border-soft)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {drawerLabel}
                    </p>
                    <h3
                      className="mt-2 text-xl sm:text-2xl font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {drawerTotal}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Get a real quotation on WhatsApp — this is just an
                      estimate.
                    </p>
                    <p
                      className="mt-2 text-sm font-extrabold"
                      style={{ color: "#FF0000" }}
                    >
                      This is just an estimate. The WhatsApp quote may vary once
                      we confirm item value.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEstimateDrawerOpen(false)}
                    className="rounded-lg p-2 shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Breakdown */}
                <div
                  className="mt-6 rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Estimate breakdown
                  </p>

                  {backendQuote ? (
                    <div
                      className="mt-3 space-y-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>Base freight</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatNgn(backendQuote.breakdown.base.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Surcharges</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatNgn(backendQuote.breakdown.surcharges.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Service margin</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatNgn(backendQuote.breakdown.margin.amount)}
                        </span>
                      </div>
                      {backendQuote.chargeableWeightKg && (
                        <div className="flex items-center justify-between gap-3">
                          <span>Chargeable weight</span>
                          <span
                            className="font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {backendQuote.chargeableWeightKg.toFixed(1)} kg
                          </span>
                        </div>
                      )}
                      <details className="mt-3">
                        <summary
                          className="cursor-pointer text-xs uppercase tracking-wide select-none"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Pricing assumptions ▸
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {backendQuote.breakdown.assumptions.map((a, i) => (
                            <li
                              key={i}
                              className="text-xs flex items-start gap-1.5"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <span
                                className="mt-0.5 shrink-0"
                                style={{ color: "var(--accent-teal)" }}
                              >
                                •
                              </span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  ) : (
                    <div
                      className="mt-3 space-y-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div
                        className="flex items-center gap-2 p-2 rounded-lg mb-3"
                        style={{
                          background: "rgba(255,200,0,0.08)",
                          border: "1px solid rgba(255,200,0,0.2)",
                        }}
                      >
                        <AlertCircle
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: "#FFC800" }}
                        />
                        <span className="text-xs" style={{ color: "#FFC800" }}>
                          Using simplified estimate — rate engine unavailable
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Chargeable weight</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {clientEstimate.chargeableWeightKg.toFixed(1)} kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Transport</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {clientEstimate.formatNgn(
                            Math.round(clientEstimate.transportFee),
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Base fee</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {clientEstimate.formatNgn(clientEstimate.baseFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Handling</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {clientEstimate.formatNgn(clientEstimate.handlingFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Fuel surcharge (est.)</span>
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {clientEstimate.formatNgn(
                            Math.round(clientEstimate.fuelSurcharge),
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {submitError}
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handlePlaceOrderToWhatsApp}
                    disabled={isSubmitting}
                    className="w-full px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: !isSubmitting
                        ? "var(--accent-teal)"
                        : "rgba(255,255,255,0.05)",
                      color: !isSubmitting
                        ? "var(--text-inverse)"
                        : "var(--text-secondary)",
                      cursor: !isSubmitting ? "pointer" : "not-allowed",
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isSubmitting
                      ? "Placing…"
                      : "Request Live Quote & Place Order via WhatsApp"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEstimateDrawerOpen(false)}
                    className="w-full px-5 py-3 rounded-xl font-medium"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Edit details
                  </button>
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
