import { apiClient } from "./client";

/**
 * Submit a driver application.
 * Files have already been uploaded to R2 — this sends JSON with
 * text fields + R2 object keys for each document.
 */
export async function submitApplication(payload: Record<string, string>) {
  return apiClient.post("/drivers/applications", payload);
}
