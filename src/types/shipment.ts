// Generated from Prisma schema
// Location: src/types/shipment.ts

// ==================== ENUMS ====================

export const ShipmentStatus = {
  PENDING: "PENDING",
  QUOTED: "QUOTED",
  ACCEPTED: "ACCEPTED",
  PICKED_UP: "PICKED_UP",
  IN_TRANSIT: "IN_TRANSIT",
  HANDED_OFF: "HANDED_OFF",
  IN_AIR: "IN_AIR",
  AT_SEA: "AT_SEA",
  ARRIVED_HUB: "ARRIVED_HUB",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type ShipmentStatus =
  (typeof ShipmentStatus)[keyof typeof ShipmentStatus];

export const ServiceType = {
  ROAD: "ROAD",
  AIR: "AIR",
  SEA: "SEA",
  DOOR_TO_DOOR: "DOOR_TO_DOOR",
} as const;

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];

// ==================== BASE MODELS ====================

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string; // ISO date string from API
  updatedAt: string;
}

export interface ShipmentStatusHistory {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  timestamp: string; // ISO date string
  adminName: string | null;
  note: string | null;
}

export interface ShipmentCheckpoint {
  id: string;
  shipmentId: string;
  location: string;
  description: string;
  timestamp: string; // ISO date string
  adminName: string | null;
}

export interface ShipmentNote {
  id: string;
  shipmentId: string;
  text: string;
  timestamp: string; // ISO date string
  adminName: string | null;
}

export interface Shipment {
  id: string;
  trackingId: string;
  phone: string;
  receiverPhone: string | null;
  amount: number;
  currency: string;
  customerId: string;
  driverId: string | null;
  serviceType: ServiceType;
  status: ShipmentStatus;
  pickupLocation: string;
  destinationLocation: string;
  packageType: string;
  weight: string;
  dimensions: string;
  createdAt: string; // ISO date string
  updatedAt: string;
}

// ==================== EXTENDED MODELS WITH RELATIONS ====================

export interface ShipmentWithRelations extends Shipment {
  customer: Customer;
  statusHistory: ShipmentStatusHistory[];
  checkpoints: ShipmentCheckpoint[];
  notes: ShipmentNote[];
}

// ==================== DISPLAY/UI TYPES ====================

// For the dashboard table view
export interface ShipmentListItem {
  id: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  route: string; // formatted as "pickup → destination"
  serviceType: ServiceType;
  status: ShipmentStatus;
  createdAt: string;
}

// For the status timeline component
export interface StatusTimelineItem {
  status: ShipmentStatus;
  timestamp: string;
  admin: string;
  note?: string;
}

// ==================== API REQUEST/RESPONSE TYPES ====================

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// List shipments response
export interface ShipmentsListResponse {
  shipments: ShipmentWithRelations[];
  total: number;
  page: number;
  limit: number;
}

// Create shipment request
export interface CreateShipmentRequest {
  customerId: string;
  serviceType: ServiceType;
  pickupLocation: string;
  destinationLocation: string;
  packageType: string;
  weight: string;
  dimensions: string;
  phone: string;
  receiverPhone?: string;
  /** Declared item value (whole number). Optional. */
  declaredValueNgn?: number;
  /** Amount (whole number). Optional; can be set later by admin. */
  amount?: number;
  /** ISO 4217 currency code. Defaults to NGN if omitted. */
  currency?: string;
}

// Update shipment status request
export interface UpdateShipmentStatusRequest {
  status: ShipmentStatus;
  adminName: string;
  note?: string;
}

// Add checkpoint request
export interface AddCheckpointRequest {
  location: string;
  description: string;
  adminName: string;
}

// Add note request
export interface AddNoteRequest {
  text: string;
  adminName: string;
}

// ==================== STATUS CONFIGURATION ====================

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  [ShipmentStatus.PENDING]: "Pending",
  [ShipmentStatus.QUOTED]: "Quoted",
  [ShipmentStatus.ACCEPTED]: "Accepted",
  [ShipmentStatus.PICKED_UP]: "Picked Up",
  [ShipmentStatus.IN_TRANSIT]: "In Transit",
  [ShipmentStatus.HANDED_OFF]: "Handed Off",
  [ShipmentStatus.IN_AIR]: "In Air",
  [ShipmentStatus.AT_SEA]: "At Sea",
  [ShipmentStatus.ARRIVED_HUB]: "Arrived at Hub",
  [ShipmentStatus.DELIVERED]: "Delivered",
  [ShipmentStatus.CANCELLED]: "Cancelled",
};

export const STATUS_COLORS: Record<
  ShipmentStatus,
  { bg: string; text: string; border: string }
> = {
  [ShipmentStatus.PENDING]: {
    bg: "rgba(153, 153, 153, 0.12)",
    text: "var(--status-pending)",
    border: "var(--status-pending)",
  },
  [ShipmentStatus.QUOTED]: {
    bg: "rgba(102, 102, 102, 0.12)",
    text: "var(--status-in-transit)",
    border: "var(--status-in-transit)",
  },
  [ShipmentStatus.ACCEPTED]: {
    bg: "rgba(34, 34, 34, 0.12)",
    text: "var(--status-delivered)",
    border: "var(--status-delivered)",
  },
  [ShipmentStatus.PICKED_UP]: {
    bg: "rgba(102, 102, 102, 0.12)",
    text: "var(--status-in-transit)",
    border: "var(--status-in-transit)",
  },
  [ShipmentStatus.IN_TRANSIT]: {
    bg: "rgba(102, 102, 102, 0.12)",
    text: "var(--status-in-transit)",
    border: "var(--status-in-transit)",
  },
  [ShipmentStatus.DELIVERED]: {
    bg: "rgba(34, 34, 34, 0.12)",
    text: "var(--status-delivered)",
    border: "var(--status-delivered)",
  },
  [ShipmentStatus.HANDED_OFF]: {
    bg: "rgba(249, 115, 22, 0.12)",
    text: "#f97316",
    border: "#f97316",
  },
  [ShipmentStatus.IN_AIR]: {
    bg: "rgba(14, 165, 233, 0.12)",
    text: "#0ea5e9",
    border: "#0ea5e9",
  },
  [ShipmentStatus.AT_SEA]: {
    bg: "rgba(37, 99, 235, 0.12)",
    text: "#2563eb",
    border: "#2563eb",
  },
  [ShipmentStatus.ARRIVED_HUB]: {
    bg: "rgba(20, 184, 166, 0.12)",
    text: "#14b8a6",
    border: "#14b8a6",
  },
  [ShipmentStatus.CANCELLED]: {
    bg: "rgba(0, 0, 0, 0.12)",
    text: "var(--status-failed)",
    border: "var(--status-failed)",
  },
};

// Valid status transitions
export const VALID_STATUS_TRANSITIONS: Record<
  ShipmentStatus,
  ShipmentStatus[]
> = {
  [ShipmentStatus.PENDING]: [ShipmentStatus.QUOTED, ShipmentStatus.CANCELLED],
  [ShipmentStatus.QUOTED]: [ShipmentStatus.ACCEPTED, ShipmentStatus.CANCELLED],
  [ShipmentStatus.ACCEPTED]: [
    ShipmentStatus.PICKED_UP,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.PICKED_UP]: [
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.IN_TRANSIT]: [
    ShipmentStatus.HANDED_OFF,
    ShipmentStatus.DELIVERED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.HANDED_OFF]: [
    ShipmentStatus.IN_AIR,
    ShipmentStatus.AT_SEA,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.IN_AIR]: [ShipmentStatus.ARRIVED_HUB],
  [ShipmentStatus.AT_SEA]: [ShipmentStatus.ARRIVED_HUB],
  [ShipmentStatus.ARRIVED_HUB]: [
    ShipmentStatus.PICKED_UP,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.DELIVERED]: [], // Terminal state
  [ShipmentStatus.CANCELLED]: [], // Terminal state
};

// ==================== SERVICE TYPE CONFIGURATION ====================

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.ROAD]: "Road",
  [ServiceType.AIR]: "Air",
  [ServiceType.SEA]: "Sea",
  [ServiceType.DOOR_TO_DOOR]: "Door to Door",
};

// ==================== COMPONENT PROP TYPES ====================

export interface ShipmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentId: string;
  onUpdate?: () => void;
}

export interface StatusTimelineProps {
  statusHistory: ShipmentStatusHistory[];
  currentStatus: ShipmentStatus;
}

export interface CheckpointListProps {
  checkpoints: ShipmentCheckpoint[];
  onAddCheckpoint: (location: string, description: string) => Promise<void>;
  isLoading?: boolean;
}

export interface InternalNotesProps {
  notes: ShipmentNote[];
  onAddNote: (text: string) => Promise<void>;
  isLoading?: boolean;
}

// ==================== UTILITY TYPES ====================

// For filtering and searching
export interface ShipmentFilters {
  status?: ShipmentStatus;
  serviceType?: ServiceType;
  search?: string; // searches trackingId, customer name, phone
  dateFrom?: string;
  dateTo?: string;
}

// For pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: "createdAt" | "updatedAt" | "trackingId";
  sortOrder?: "asc" | "desc";
}

// Combined query params
export interface ShipmentQueryParams extends PaginationParams {
  filters?: ShipmentFilters;
}

// ==================== TYPE GUARDS ====================

export function isValidShipmentStatus(value: string): value is ShipmentStatus {
  return Object.values(ShipmentStatus).includes(value as ShipmentStatus);
}

export function isValidServiceType(value: string): value is ServiceType {
  return Object.values(ServiceType).includes(value as ServiceType);
}

// Check if status transition is valid
export function isValidStatusTransition(
  currentStatus: ShipmentStatus,
  newStatus: ShipmentStatus,
): boolean {
  return VALID_STATUS_TRANSITIONS[currentStatus].includes(newStatus);
}

// ==================== FORMATTERS ====================

// Format date from ISO string
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Format route for display
export function formatRoute(pickup: string, destination: string): string {
  return `${pickup} → ${destination}`;
}

// Convert Shipment with relations to list item
export function shipmentToListItem(
  shipment: ShipmentWithRelations,
): ShipmentListItem {
  return {
    id: shipment.id,
    trackingId: shipment.trackingId,
    customerName: shipment.customer.name,
    customerEmail: shipment.customer.email,
    customerPhone: shipment.customer.phone,
    route: formatRoute(shipment.pickupLocation, shipment.destinationLocation),
    serviceType: shipment.serviceType,
    status: shipment.status,
    createdAt: shipment.createdAt,
  };
}
