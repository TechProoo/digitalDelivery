import { apiClient } from "./client";
import { toApiError } from "./errors";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  customer: Customer;
  accessToken?: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ForgotPasswordResponse = {
  ok: boolean;
  resetLink?: string;
};

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  ok: boolean;
};

export async function register(input: RegisterInput): Promise<AuthResponse> {
  try {
    return await apiClient.post("/auth/register", input);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  try {
    return await apiClient.post("/auth/login", input);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function logout(): Promise<{ ok: boolean }> {
  try {
    return await apiClient.post("/auth/logout");
  } catch (err) {
    throw toApiError(err);
  }
}

export async function me(): Promise<{ customer: Customer | null }> {
  try {
    return await apiClient.get("/auth/me");
  } catch (err) {
    throw toApiError(err);
  }
}

export async function forgotPassword(
  input: ForgotPasswordInput,
): Promise<ForgotPasswordResponse> {
  try {
    return await apiClient.post("/auth/forgot-password", input);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function resetPassword(
  input: ResetPasswordInput,
): Promise<ResetPasswordResponse> {
  try {
    return await apiClient.post("/auth/reset-password", input);
  } catch (err) {
    throw toApiError(err);
  }
}
