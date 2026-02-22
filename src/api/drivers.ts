import { apiClient } from "./client";

export async function submitApplication(form: FormData) {
  return apiClient.post("/drivers/applications", form, {
    headers: {
      // Let Axios/browser set the correct multipart boundary
      "Content-Type": "multipart/form-data",
    },
  });
}
