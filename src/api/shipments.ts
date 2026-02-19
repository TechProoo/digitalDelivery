import { apiClient } from "./client";
import { toApiError } from "./errors";
import type {
  AddCheckpointRequest,
  AddNoteRequest,
  CreateShipmentRequest,
  ShipmentWithRelations,
  ShipmentStatus,
  UpdateShipmentStatusRequest,
} from "../types/shipment";

export type CreateShipmentInput = Omit<CreateShipmentRequest, "customerId"> & {
  customerId?: string;
};

export async function create(
  input: CreateShipmentInput,
): Promise<ShipmentWithRelations> {
  try {
    return await apiClient.post("/shipments", input);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function list(params?: {
  customerId?: string;
  status?: ShipmentStatus;
}): Promise<ShipmentWithRelations[]> {
  try {
    return await apiClient.get("/shipments", { params });
  } catch (err) {
    throw toApiError(err);
  }
}

export async function findOne(id: string): Promise<ShipmentWithRelations> {
  try {
    return await apiClient.get(`/shipments/${id}`);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function findByTrackingId(
  trackingId: string,
): Promise<ShipmentWithRelations> {
  try {
    return await apiClient.get(`/shipments/tracking/${trackingId}`);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateStatus(
  id: string,
  input: UpdateShipmentStatusRequest,
): Promise<ShipmentWithRelations> {
  try {
    return await apiClient.patch(`/shipments/${id}/status`, input);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function addCheckpoint(
  id: string,
  input: AddCheckpointRequest,
): Promise<unknown> {
  try {
    return await apiClient.post(`/shipments/${id}/checkpoints`, input);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function addNote(
  id: string,
  input: AddNoteRequest,
): Promise<unknown> {
  try {
    return await apiClient.post(`/shipments/${id}/notes`, input);
  } catch (err) {
    throw toApiError(err);
  }
}
