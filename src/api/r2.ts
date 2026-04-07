import { apiClient } from "./client";

export interface PresignResult {
  key: string;
  uploadUrl: string;
}

/**
 * Get a presigned PUT URL from the backend so we can upload
 * directly to Cloudflare R2.
 */
export async function presignUpload(
  folder: string,
  filename: string,
  contentType: string,
  fileSize: number,
): Promise<PresignResult> {
  // The frontend apiClient response interceptor already unwraps the
  // { success, data } envelope, so the resolved value IS the inner data.
  const data = (await apiClient.post("/uploads/presign", {
    folder,
    filename,
    contentType,
    fileSize,
  })) as unknown as PresignResult;
  return data;
}

/**
 * Upload a file directly to R2 using the presigned URL.
 * Returns the R2 object key.
 */
export async function uploadFileToR2(
  file: File,
  folder: string,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const { key, uploadUrl } = await presignUpload(
    folder,
    file.name,
    file.type || "application/octet-stream",
    file.size,
  );

  // PUT directly to R2 (no auth header — the presigned URL is self-authenticating)
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader(
      "Content-Type",
      file.type || "application/octet-stream",
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else
        reject(new Error(`R2 upload failed: ${xhr.status} ${xhr.statusText}`));
    };

    xhr.onerror = () => reject(new Error("Network error during R2 upload"));
    xhr.send(file);
  });

  return key;
}
