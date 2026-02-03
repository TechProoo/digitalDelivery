import { apiClient } from "./client";
import { toApiError } from "./errors";

export async function downloadShipmentInvoicePdf(
  shipmentId: string
): Promise<Blob> {
  try {
    return await apiClient.get(`/invoices/shipments/${shipmentId}/pdf`, {
      responseType: "blob",
    });
  } catch (err) {
    throw toApiError(err);
  }
}
