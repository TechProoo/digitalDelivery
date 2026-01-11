import axios from "axios";
import type { AxiosError } from "axios";

export type ApiError = {
  status?: number;
  message: string;
  details?: unknown;
};

function isBackendEnvelope(value: unknown): value is {
  success?: boolean;
  data?: unknown;
  message?: unknown;
} {
  return Boolean(value) && typeof value === "object";
}

export function toApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: error instanceof Error ? error.message : "Unexpected error",
      details: error,
    };
  }

  const axiosError = error as AxiosError;
  const status = axiosError.response?.status;
  const responseData = axiosError.response?.data;

  // Nest ValidationPipe often returns: { statusCode, message: string[] | string, error }
  if (responseData && typeof responseData === "object") {
    const maybe = responseData as any;
    const msg = Array.isArray(maybe.message)
      ? maybe.message.join("\n")
      : typeof maybe.message === "string"
      ? maybe.message
      : undefined;

    if (msg) {
      return { status, message: msg, details: responseData };
    }

    // If backend wraps success/data, try to pull a message
    if (
      isBackendEnvelope(responseData) &&
      typeof (responseData as any).message === "string"
    ) {
      return {
        status,
        message: (responseData as any).message,
        details: responseData,
      };
    }
  }

  return {
    status,
    message:
      axiosError.message ||
      (status ? `Request failed with status ${status}` : "Request failed"),
    details: responseData,
  };
}
