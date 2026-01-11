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
  accessToken: string;
  customer: Customer;
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

export async function me(): Promise<{ customer: Customer | null }> {
  try {
    return await apiClient.get("/auth/me");
  } catch (err) {
    throw toApiError(err);
  }
}
