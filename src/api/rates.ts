import { apiClient } from "./client";
import { toApiError } from "./errors";

// ─── Types (mirrored from backend DTOs) ──────────────────────────────────────

type ManualMode = "parcel" | "air" | "ocean" | "ground";
type ManualContainerType = "20ft" | "40ft" | "40hc";

export interface ManualQuoteRequest {
  mode: ManualMode;
  origin: string;
  destination: string;
  weightKg?: number;
  dimensionsCm?: { length: number; width: number; height: number };
  volumeCbm?: number;
  containerType?: ManualContainerType;
  distanceKm?: number;
  isExpress?: boolean;
  freeText?: string;
}

export interface Money {
  amount: number;
  currency: "NGN";
}

export interface ManualQuoteBreakdown {
  base: Money;
  surcharges: Money;
  margin: Money;
  total: Money;
  assumptions: string[];
}

export interface ManualQuoteResult {
  provider: "manual-rate-engine";
  mode: ManualMode;
  origin?: string;
  destination?: string;
  chargeableWeightKg?: number;
  breakdown: ManualQuoteBreakdown;
}

export interface ManualQuoteResponse {
  status: "ok" | "needs_clarification" | "error";
  message?: string;
  missingFields?: string[];
  quote?: ManualQuoteResult;
}

// ─── API call ─────────────────────────────────────────────────────────────────

export async function manualEstimate(
  input: ManualQuoteRequest,
): Promise<ManualQuoteResponse> {
  try {
    return (await apiClient.post(
      "/rates/manual-quote",
      input,
    )) as ManualQuoteResponse;
  } catch (err) {
    throw toApiError(err);
  }
}
