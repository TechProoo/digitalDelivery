import { useState } from "react";
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
  Shield,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import BottomNav from "../components/dashboard/bottom-nav";

type PackageType = "parcel" | "pallet" | "container" | "full-freight";
type ServiceLevel = "standard" | "express" | "priority";

interface FormData {
  originCity: string;
  originCountry: string;
  destCity: string;
  destCountry: string;
  packageType: PackageType | "";
  weight: string;
  length: string;
  width: string;
  height: string;
  serviceLevel: ServiceLevel | "";
  userWhatsApp: string;
}

export default function NewDelivery() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    originCity: "",
    originCountry: "",
    destCity: "",
    destCountry: "",
    packageType: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    serviceLevel: "",
    userWhatsApp: "",
  });

  const packageTypes = [
    { id: "parcel", label: "Parcel", icon: Package },
    { id: "pallet", label: "Pallet", icon: Box },
    { id: "container", label: "Container", icon: Box },
    { id: "full-freight", label: "Full Freight", icon: Truck },
  ];

  const serviceLevels = [
    {
      id: "standard",
      label: "Standard",
      icon: Clock,
      time: "5-7 business days",
    },
    { id: "express", label: "Express", icon: Zap, time: "2-3 business days" },
    {
      id: "priority",
      label: "Priority",
      icon: Shield,
      time: "1-2 business days",
    },
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = () => {
    return (
      formData.originCity &&
      formData.originCountry &&
      formData.destCity &&
      formData.destCountry
    );
  };

  const canProceedStep2 = () => {
    return formData.packageType && formData.weight && formData.serviceLevel;
  };

  const canProceedStep3 = () => {
    return formData.userWhatsApp.trim().length > 0;
  };

  const handleWhatsAppRedirect = () => {
    // Company WhatsApp number (replace with actual number)
    const companyWhatsApp = "2348012345678"; // Replace with your WhatsApp number

    const message = `Hello! I would like to get a quote for my shipment:\n\n*Shipment Details:*\nOrigin: ${formData.originCity}, ${formData.originCountry}\nDestination: ${formData.destCity}, ${formData.destCountry}\n\n*Package Information:*\nType: ${formData.packageType}\nWeight: ${formData.weight} kg\nDimensions: ${formData.length}×${formData.width}×${formData.height} cm\nService Level: ${formData.serviceLevel}\n\n*My WhatsApp:* ${formData.userWhatsApp}\n\nPlease provide pricing for this shipment. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
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

        {/* Form Container */}
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
            {/* Step 1: Route */}
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
                      <div>
                        <label
                          className="block text-xs sm:text-sm font-medium mb-2 uppercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Shanghai"
                          value={formData.originCity}
                          onChange={(e) =>
                            updateFormData("originCity", e.target.value)
                          }
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid var(--border-soft)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs sm:text-sm font-medium mb-2 uppercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., China"
                          value={formData.originCountry}
                          onChange={(e) =>
                            updateFormData("originCountry", e.target.value)
                          }
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid var(--border-soft)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>
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
                      <div>
                        <label
                          className="block text-xs sm:text-sm font-medium mb-2 uppercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Los Angeles"
                          value={formData.destCity}
                          onChange={(e) =>
                            updateFormData("destCity", e.target.value)
                          }
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid var(--border-soft)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs sm:text-sm font-medium mb-2 uppercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., United States"
                          value={formData.destCountry}
                          onChange={(e) =>
                            updateFormData("destCountry", e.target.value)
                          }
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid var(--border-soft)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>
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
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Package */}
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
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <label
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Weight className="h-3 w-3 sm:h-4 sm:w-4" />
                      Weight (KG)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Ruler className="h-3 w-3 sm:h-4 sm:w-4" />L (CM)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.length}
                      onChange={(e) => updateFormData("length", e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Ruler className="h-3 w-3 sm:h-4 sm:w-4" />W (CM)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.width}
                      onChange={(e) => updateFormData("width", e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Ruler className="h-3 w-3 sm:h-4 sm:w-4" />H (CM)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.height}
                      onChange={(e) => updateFormData("height", e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg outline-none text-sm sm:text-base"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Service Level */}
                <div className="mb-4 sm:mb-6">
                  <label
                    className="block text-xs sm:text-sm font-medium mb-3 uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Service Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {serviceLevels.map((service) => (
                      <button
                        key={service.id}
                        onClick={() =>
                          updateFormData("serviceLevel", service.id)
                        }
                        className="p-3 sm:p-4 rounded-xl transition-all hover:scale-105 active:scale-95"
                        style={{
                          background:
                            formData.serviceLevel === service.id
                              ? "rgba(23,199,189,0.15)"
                              : "rgba(0,0,0,0.2)",
                          border:
                            formData.serviceLevel === service.id
                              ? "2px solid var(--accent-teal)"
                              : "1px solid var(--border-soft)",
                        }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <service.icon
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            style={{
                              color:
                                formData.serviceLevel === service.id
                                  ? "var(--accent-teal)"
                                  : "var(--text-secondary)",
                            }}
                          />
                          <span
                            className="font-semibold text-sm sm:text-base"
                            style={{
                              color:
                                formData.serviceLevel === service.id
                                  ? "var(--text-primary)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {service.label}
                          </span>
                        </div>
                        <p
                          className="text-xs sm:text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {service.time}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-2 sm:order-1"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
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
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Summary */}
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

                {/* Shipment Summary */}
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

                  {/* Route */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin
                        className="h-4 w-4 mt-0.5"
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
                          {formData.originCity}, {formData.originCountry}
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      className="h-5 w-5 hidden sm:block"
                      style={{ color: "var(--accent-teal)" }}
                    />

                    <div className="flex items-start gap-2 flex-1">
                      <MapPin
                        className="h-4 w-4 mt-0.5"
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
                          {formData.destCity}, {formData.destCountry}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
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
                      Service Level
                    </div>
                    <div
                      className="font-semibold capitalize text-sm sm:text-base"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      {formData.serviceLevel}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Input */}
                <div className="mb-4 sm:mb-6">
                  <label
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-2 uppercase"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Your WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g., +234 801 234 5678"
                    value={formData.userWhatsApp}
                    onChange={(e) =>
                      updateFormData("userWhatsApp", e.target.value)
                    }
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

                {/* Info Box */}
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
                        Click the button below to open WhatsApp with your
                        shipment details. Our team will respond with a
                        personalized quote.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-2 sm:order-1"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <button
                    onClick={handleWhatsAppRedirect}
                    disabled={!canProceedStep3()}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base order-1 sm:order-2"
                    style={{
                      background: canProceedStep3()
                        ? "var(--accent-teal)"
                        : "rgba(255,255,255,0.05)",
                      color: canProceedStep3()
                        ? "var(--text-inverse)"
                        : "var(--text-secondary)",
                      cursor: canProceedStep3() ? "pointer" : "not-allowed",
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      Get Quote on WhatsApp
                    </span>
                    <span className="sm:hidden">Get Quote</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <BottomNav />
      </div>

    </Sidebar>
  );
}
