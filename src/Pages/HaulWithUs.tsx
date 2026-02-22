import { useState, useRef, useCallback } from "react";
import {
  Bike,
  Car,
  CheckCircle2,
  FileText,
  IdCard,
  Loader2,
  MapPin,
  Phone,
  User,
  Video,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  Truck,
  Shield,
  Zap,
} from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { driversApi } from "../api";

type VehicleType = "VAN" | "BIKE" | "LORRY" | "TRUCK";

type FileKey =
  | "proofOfOwnership"
  | "vehicleLicense"
  | "hackneyPermit"
  | "vehicleInsurance"
  | "vehicleVideo"
  | "driversLicense"
  | "meansOfId"
  | "driverFacePhoto"
  | "driverFullBodyPhoto"
  | "guarantorMeansOfId";

// ─── File Drop Field ──────────────────────────────────────────────────────────

function FileField(props: {
  label: string;
  required?: boolean;
  accept?: string;
  hint?: string;
  icon?: React.ReactNode;
  file: File | null;
  onPick: (file: File | null) => void;
}) {
  const { label, required, accept, hint, icon, file, onPick } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) onPick(dropped);
    },
    [onPick],
  );

  return (
    <div>
      <label
        className="block text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--text-tertiary)" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--accent-teal)" }}>
            *
          </span>
        )}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="relative cursor-pointer rounded-2xl transition-all duration-200 overflow-hidden"
        style={{
          border: dragging
            ? "2px dashed var(--accent-teal)"
            : file
              ? "2px solid var(--accent-sky)"
              : "2px dashed var(--border-soft)",
          background: dragging
            ? "hsl(var(--primary) / 0.06)"
            : file
              ? "hsl(var(--primary) / 0.04)"
              : "hsl(var(--card) / 0.3)",
        }}
      >
        {file ? (
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div
              className="grid place-items-center rounded-xl shrink-0"
              style={{
                width: 40,
                height: 40,
                background: "hsl(var(--primary) / 0.12)",
                color: "var(--accent-teal)",
              }}
            >
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className="text-sm font-semibold truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {file.name}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "var(--accent-teal)" }}
              >
                {(file.size / 1024 / 1024).toFixed(2)} MB · Ready
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPick(null);
              }}
              className="shrink-0 rounded-full p-1.5 transition"
              style={{
                background: "hsl(var(--card) / 0.55)",
                color: "var(--text-tertiary)",
              }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center">
            <div
              className="grid place-items-center rounded-2xl mb-1"
              style={{
                width: 44,
                height: 44,
                background: "hsl(var(--background) / 0.35)",
                color: "var(--text-tertiary)",
              }}
            >
              <Upload className="h-5 w-5" />
            </div>
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Drop file or{" "}
              <span style={{ color: "var(--accent-sky)" }}>browse</span>
            </div>
            {hint && (
              <div
                className="text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                {hint}
              </div>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept={accept}
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = ["Vehicle", "Driver", "Guarantor", "Review"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 w-full mb-10">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="grid place-items-center rounded-full text-xs font-black transition-all duration-300"
                style={{
                  width: 36,
                  height: 36,
                  background: done
                    ? "hsl(var(--primary))"
                    : active
                      ? "hsl(var(--primary) / 0.15)"
                      : "hsl(var(--card) / 0.55)",
                  border: active
                    ? "2px solid hsl(var(--primary))"
                    : done
                      ? "2px solid hsl(var(--primary))"
                      : "2px solid var(--border-soft)",
                  color: done
                    ? "var(--primary-foreground)"
                    : active
                      ? "hsl(var(--primary))"
                      : "var(--text-tertiary)",
                  boxShadow: active ? "var(--glow-primary)" : "none",
                }}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider hidden sm:block"
                style={{
                  color: active
                    ? "hsl(var(--primary))"
                    : done
                      ? "var(--text-secondary)"
                      : "var(--text-tertiary)",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-px mx-2 transition-all duration-500"
                style={{
                  background: done
                    ? "hsl(var(--primary))"
                    : "var(--border-soft)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field wrappers ───────────────────────────────────────────────────────────

const inputBase =
  "w-full px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 outline-none";

function Field({
  label,
  children,
  span2 = false,
}: {
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <label
        className="block text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--text-tertiary)" }}
      >
        {label} <span style={{ color: "var(--accent-teal)" }}>*</span>
      </label>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HaulWithUs() {
  const [step, setStep] = useState(0);

  // Vehicle
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
  const [plateNumber, setPlateNumber] = useState("");

  // Driver
  const [driverName, setDriverName] = useState("");
  const [driverAddress, setDriverAddress] = useState("");

  // Guarantor
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorAddress, setGuarantorAddress] = useState("");
  const [guarantorPhone, setGuarantorPhone] = useState("");
  const [guarantorNin, setGuarantorNin] = useState("");

  const [files, setFiles] = useState<Record<FileKey, File | null>>({
    proofOfOwnership: null,
    vehicleLicense: null,
    hackneyPermit: null,
    vehicleInsurance: null,
    vehicleVideo: null,
    driversLicense: null,
    meansOfId: null,
    driverFacePhoto: null,
    driverFullBodyPhoto: null,
    guarantorMeansOfId: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const pickFile = (key: FileKey, file: File | null) =>
    setFiles((s) => ({ ...s, [key]: file }));

  // Per-step validation
  const validateStep = (s: number): string | null => {
    if (s === 0) {
      if (!vehicleType) return "Please select a vehicle type.";
      if (!plateNumber.trim()) return "Plate number is required.";
      if (!files.proofOfOwnership) return "Proof of ownership is required.";
      if (!files.vehicleLicense) return "Vehicle license is required.";
      if (!files.hackneyPermit) return "Hackney permit is required.";
      if (!files.vehicleInsurance) return "Vehicle insurance is required.";
      if (!files.vehicleVideo) return "Vehicle video is required.";
    }
    if (s === 1) {
      if (!driverName.trim()) return "Driver name is required.";
      if (!driverAddress.trim()) return "Driver address is required.";
      if (!files.driversLicense) return "Driver's license is required.";
      if (!files.meansOfId) return "Means of ID is required.";
      if (!files.driverFacePhoto) return "Driver face photo is required.";
      if (!files.driverFullBodyPhoto) return "Full body photo is required.";
    }
    if (s === 2) {
      if (!guarantorName.trim()) return "Guarantor name is required.";
      if (!guarantorAddress.trim()) return "Guarantor address is required.";
      if (!guarantorPhone.trim()) return "Guarantor phone is required.";
      if (!guarantorNin.trim()) return "Guarantor NIN is required.";
      if (!files.guarantorMeansOfId) return "Guarantor ID is required.";
    }
    return null;
  };

  const next = () => {
    const err = validateStep(step);
    if (err) {
      setSubmitError(err);
      return;
    }
    setSubmitError(null);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setSubmitError(null);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("vehicleType", vehicleType);
      data.append("plateNumber", plateNumber.trim());
      data.append("driverName", driverName.trim());
      data.append("driverAddress", driverAddress.trim());
      data.append("guarantorName", guarantorName.trim());
      data.append("guarantorAddress", guarantorAddress.trim());
      data.append("guarantorPhone", guarantorPhone.trim());
      data.append("guarantorNin", guarantorNin.trim());
      (Object.keys(files) as FileKey[]).forEach((k) => {
        const f = files[k];
        if (f) data.append(k, f);
      });
      await driversApi.submitApplication(data);
      setSubmitted(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Submission failed. Please try again.";
      setSubmitError(String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  // ── Review rows ──
  const reviewRows: { label: string; value: string }[] = [
    { label: "Vehicle type", value: vehicleType || "—" },
    { label: "Plate number", value: plateNumber || "—" },
    { label: "Driver name", value: driverName || "—" },
    { label: "Driver address", value: driverAddress || "—" },
    { label: "Guarantor name", value: guarantorName || "—" },
    { label: "Guarantor phone", value: guarantorPhone || "—" },
    { label: "Guarantor address", value: guarantorAddress || "—" },
    { label: "Guarantor NIN", value: guarantorNin || "—" },
  ];

  const uploadedCount = (Object.values(files) as (File | null)[]).filter(
    Boolean,
  ).length;

  return (
    <>
      {/* Google fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .haul-page {
          font-family: 'DM Sans', sans-serif;
        }

        .haul-input {
          font-family: 'DM Sans', sans-serif;
          background: hsl(var(--background) / 0.35);
          border: 1.5px solid var(--border-soft);
          color: var(--text-primary);
          transition: border-color .2s, box-shadow .2s;
        }
        .haul-input::placeholder { color: var(--text-tertiary); }
        .haul-input:focus {
          border-color: var(--accent-sky);
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.12);
          outline: none;
        }

        .vehicle-card {
          transition: all .2s;
        }
        .vehicle-card:hover { transform: translateY(-2px); }
        .vehicle-card.active { transform: translateY(-2px); }

        .glow-btn {
          transition: all .2s;
        }
        .glow-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: var(--glow-primary) !important;
        }

        .slide-in {
          animation: slideIn 0.25s ease-out both;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div
        className="haul-page min-h-screen"
        style={{ background: "hsl(var(--background))" }}
      >
        <Navbar />

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), hsl(var(--background))",
            borderBottom: "1px solid var(--border-soft)",
          }}
        >
          {/* Decorative grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-20 pb-16 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "hsl(var(--card) / 0.65)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
              }}
            >
              <Truck className="h-3.5 w-3.5" />
              Haul With Us
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              Drive. Earn.{" "}
              <span
                style={{
                  color: "var(--accent-teal)",
                }}
              >
                Grow.
              </span>
            </h1>

            <p
              className="mx-auto mt-5 max-w-xl text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Join our delivery network in minutes. Submit your details once —
              we handle the rest.
            </p>

            {/* Stats strip */}
            <div
              className="mt-10 inline-flex divide-x gap-0 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid var(--border-soft)",
                background: "hsl(var(--card) / 0.4)",
              }}
            >
              {[
                {
                  icon: <Zap className="h-4 w-4" />,
                  stat: "48 hrs",
                  label: "Review time",
                },
                {
                  icon: <Shield className="h-4 w-4" />,
                  stat: "100%",
                  label: "Secure uploads",
                },
                {
                  icon: <Truck className="h-4 w-4" />,
                  stat: "4 steps",
                  label: "Simple process",
                },
              ].map(({ icon, stat, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-5 py-3"
                  style={{ borderColor: "var(--border-soft)" }}
                >
                  <div style={{ color: "var(--accent-teal)" }}>{icon}</div>
                  <div className="text-left">
                    <div
                      className="text-sm font-black"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      {stat}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form ── */}
        <main className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
          {submitted ? (
            <div
              className="rounded-3xl p-12 text-center"
              style={{
                background: "hsl(var(--success) / 0.08)",
                border: "1px solid hsl(var(--success) / 0.2)",
              }}
            >
              <div
                className="mx-auto mb-6 grid place-items-center rounded-full"
                style={{
                  width: 80,
                  height: 80,
                  background: "hsl(var(--success) / 0.12)",
                  border: "2px solid hsl(var(--success))",
                  boxShadow: "0 0 40px hsl(var(--success) / 0.2)",
                  color: "hsl(var(--success))",
                }}
              >
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                Application Submitted
              </h2>
              <p
                className="text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                We've received your details and will review them within 48
                hours. Expect a call or email from our team.
              </p>
            </div>
          ) : (
            <div
              className="rounded-3xl p-6 sm:p-10"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <StepBar current={step} />

              {submitError && (
                <div
                  className="mb-6 rounded-2xl px-4 py-3 text-sm font-medium"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#fca5a5",
                  }}
                >
                  {submitError}
                </div>
              )}

              {/* ── Step 0: Vehicle ── */}
              {step === 0 && (
                <div className="slide-in space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-black"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      Vehicle Details
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Tell us about the vehicle you'll be using for deliveries.
                    </p>
                  </div>

                  {/* Vehicle type */}
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        {
                          type: "VAN",
                          label: "Van",
                          sub: "Cargo van deliveries",
                          icon: <Car className="h-6 w-6" />,
                        },
                        {
                          type: "BIKE",
                          label: "Bike",
                          sub: "Motorcycle deliveries",
                          icon: <Bike className="h-6 w-6" />,
                        },
                        {
                          type: "LORRY",
                          label: "Lorry",
                          sub: "Heavy-duty deliveries",
                          icon: <Truck className="h-6 w-6" />,
                        },
                        {
                          type: "TRUCK",
                          label: "Truck",
                          sub: "Long-haul deliveries",
                          icon: <Truck className="h-6 w-6" />,
                        },
                      ] as const
                    ).map(({ type, label, sub, icon }) => {
                      const active = vehicleType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setVehicleType(type)}
                          className={`vehicle-card rounded-2xl p-5 text-left ${active ? "active" : ""}`}
                          style={{
                            background: active
                              ? "hsl(var(--primary) / 0.14)"
                              : "hsl(var(--card) / 0.55)",
                            border: active
                              ? "2px solid hsl(var(--primary) / 0.5)"
                              : "2px solid var(--border-soft)",
                            boxShadow: active ? "var(--shadow-card)" : "none",
                          }}
                        >
                          <div
                            className="grid place-items-center rounded-xl mb-3"
                            style={{
                              width: 48,
                              height: 48,
                              background: active
                                ? "hsl(var(--primary) / 0.2)"
                                : "hsl(var(--background) / 0.35)",
                              color: active
                                ? "hsl(var(--primary))"
                                : "var(--accent-teal)",
                            }}
                          >
                            {icon}
                          </div>
                          <div
                            className="font-black text-base"
                            style={{
                              fontFamily: "'Syne', sans-serif",
                              color: active
                                ? "hsl(var(--primary))"
                                : "var(--text-primary)",
                            }}
                          >
                            {label}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: "var(--text-tertiary)" }}
                          >
                            {sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <Field label="Plate number">
                    <input
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      placeholder="e.g. ABC-123XY"
                      className={`${inputBase} haul-input`}
                    />
                  </Field>

                  <div className="grid gap-4">
                    <FileField
                      label="Proof of ownership"
                      required
                      accept="image/*,application/pdf"
                      hint="PNG, JPG, or PDF"
                      icon={<FileText className="h-4 w-4" />}
                      file={files.proofOfOwnership}
                      onPick={(f) => pickFile("proofOfOwnership", f)}
                    />
                    <FileField
                      label="Vehicle license"
                      required
                      accept="image/*,application/pdf"
                      hint="PNG, JPG, or PDF"
                      icon={<FileText className="h-4 w-4" />}
                      file={files.vehicleLicense}
                      onPick={(f) => pickFile("vehicleLicense", f)}
                    />
                    <FileField
                      label="Hackney permit"
                      required
                      accept="image/*,application/pdf"
                      hint="PNG, JPG, or PDF"
                      icon={<FileText className="h-4 w-4" />}
                      file={files.hackneyPermit}
                      onPick={(f) => pickFile("hackneyPermit", f)}
                    />
                    <FileField
                      label="Vehicle insurance"
                      required
                      accept="image/*,application/pdf"
                      hint="PNG, JPG, or PDF"
                      icon={<FileText className="h-4 w-4" />}
                      file={files.vehicleInsurance}
                      onPick={(f) => pickFile("vehicleInsurance", f)}
                    />
                    <FileField
                      label="1-minute video of vehicle"
                      required
                      accept="video/*"
                      hint="MP4, MOV — max 100 MB"
                      icon={<Video className="h-4 w-4" />}
                      file={files.vehicleVideo}
                      onPick={(f) => pickFile("vehicleVideo", f)}
                    />
                  </div>
                </div>
              )}

              {/* ── Step 1: Driver ── */}
              {step === 1 && (
                <div className="slide-in space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-black"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      Driver Information
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Your personal details and identification documents.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name">
                      <div className="relative">
                        <User
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
                          style={{ color: "var(--text-tertiary)" }}
                        />
                        <input
                          value={driverName}
                          onChange={(e) => setDriverName(e.target.value)}
                          placeholder="Full name"
                          className={`${inputBase} haul-input pl-10`}
                        />
                      </div>
                    </Field>
                    <Field label="Home address">
                      <div className="relative">
                        <MapPin
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
                          style={{ color: "var(--text-tertiary)" }}
                        />
                        <input
                          value={driverAddress}
                          onChange={(e) => setDriverAddress(e.target.value)}
                          placeholder="Residential address"
                          className={`${inputBase} haul-input pl-10`}
                        />
                      </div>
                    </Field>
                  </div>

                  <div className="grid gap-4">
                    <FileField
                      label="Driver's license"
                      required
                      accept="image/*,application/pdf"
                      hint="PNG, JPG, or PDF"
                      icon={<IdCard className="h-4 w-4" />}
                      file={files.driversLicense}
                      onPick={(f) => pickFile("driversLicense", f)}
                    />
                    <FileField
                      label="Means of ID (NIN, Voter's card, Passport)"
                      required
                      accept="image/*,application/pdf"
                      hint="Any valid government ID"
                      icon={<IdCard className="h-4 w-4" />}
                      file={files.meansOfId}
                      onPick={(f) => pickFile("meansOfId", f)}
                    />
                    <FileField
                      label="Clear face photograph"
                      required
                      accept="image/*"
                      hint="Passport-style, plain background"
                      icon={<User className="h-4 w-4" />}
                      file={files.driverFacePhoto}
                      onPick={(f) => pickFile("driverFacePhoto", f)}
                    />
                    <FileField
                      label="Full body photograph"
                      required
                      accept="image/*"
                      hint="Standing, full length, good lighting"
                      icon={<User className="h-4 w-4" />}
                      file={files.driverFullBodyPhoto}
                      onPick={(f) => pickFile("driverFullBodyPhoto", f)}
                    />
                  </div>
                </div>
              )}

              {/* ── Step 2: Guarantor ── */}
              {step === 2 && (
                <div className="slide-in space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-black"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      Guarantor Details
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Someone who can vouch for you. They must be reachable.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Guarantor full name">
                      <input
                        value={guarantorName}
                        onChange={(e) => setGuarantorName(e.target.value)}
                        placeholder="Full name"
                        className={`${inputBase} haul-input`}
                      />
                    </Field>
                    <Field label="Phone number">
                      <div className="relative">
                        <Phone
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
                          style={{ color: "var(--text-tertiary)" }}
                        />
                        <input
                          value={guarantorPhone}
                          onChange={(e) => setGuarantorPhone(e.target.value)}
                          placeholder="+2349012345678"
                          className={`${inputBase} haul-input pl-10`}
                        />
                      </div>
                    </Field>
                    <Field label="Address" span2>
                      <input
                        value={guarantorAddress}
                        onChange={(e) => setGuarantorAddress(e.target.value)}
                        placeholder="Guarantor's home address"
                        className={`${inputBase} haul-input`}
                      />
                    </Field>
                    <Field label="NIN" span2>
                      <input
                        value={guarantorNin}
                        onChange={(e) => setGuarantorNin(e.target.value)}
                        placeholder="National Identification Number"
                        className={`${inputBase} haul-input`}
                      />
                    </Field>
                  </div>

                  <FileField
                    label="Guarantor means of identification"
                    required
                    accept="image/*,application/pdf"
                    hint="NIN slip, Voter's card, or Passport"
                    icon={<IdCard className="h-4 w-4" />}
                    file={files.guarantorMeansOfId}
                    onPick={(f) => pickFile("guarantorMeansOfId", f)}
                  />
                </div>
              )}

              {/* ── Step 3: Review ── */}
              {step === 3 && (
                <div className="slide-in space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-black"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      Review & Submit
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Double-check everything before sending.
                    </p>
                  </div>

                  {/* Info rows */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid var(--border-soft)" }}
                  >
                    {reviewRows.map(({ label, value }, i) => (
                      <div
                        key={label}
                        className="flex justify-between gap-4 px-4 py-3"
                        style={{
                          background:
                            i % 2 === 0
                              ? "hsl(var(--card) / 0.4)"
                              : "transparent",
                          borderBottom:
                            i < reviewRows.length - 1
                              ? "1px solid var(--border-soft)"
                              : "none",
                        }}
                      >
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-sm font-semibold text-right"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Upload summary */}
                  <div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{
                      background: "hsl(var(--success) / 0.08)",
                      border: "1px solid hsl(var(--success) / 0.2)",
                    }}
                  >
                    <CheckCircle2
                      className="h-5 w-5 shrink-0"
                      style={{ color: "hsl(var(--success))" }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {uploadedCount} of 10 documents uploaded
                    </span>
                  </div>

                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    By submitting, you confirm that all information provided is
                    accurate and that you are the rightful owner or authorised
                    user of the vehicle.
                  </p>
                </div>
              )}

              {/* ── Navigation ── */}
              <div className="flex items-center justify-between mt-10 gap-4">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition"
                    style={{
                      background: "hsl(var(--card) / 0.55)",
                      border: "1.5px solid var(--border-soft)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="glow-btn flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black uppercase tracking-wider"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "var(--primary-foreground)",
                      boxShadow: "var(--glow-primary)",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="glow-btn flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black uppercase tracking-wider"
                    style={{
                      background: submitting
                        ? "hsl(var(--primary) / 0.6)"
                        : "hsl(var(--primary))",
                      color: "var(--primary-foreground)",
                      boxShadow: "var(--glow-primary)",
                      fontFamily: "'Syne', sans-serif",
                      opacity: submitting ? 0.8 : 1,
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
