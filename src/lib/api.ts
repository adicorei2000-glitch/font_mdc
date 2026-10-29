import axios from "axios";
import { useAuthStore } from "./auth";
import type { AuthResponse } from "@/types";

export const api = axios.create({
  // Use the Vite /api proxy in development and allow deployments to set their own API URL.
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT access token to every request.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear the session; ProtectedRoute will redirect to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export function login(email: string, password: string) {
  return api.post<AuthResponse>("/auth/login", { email, password });
}

export function register(payload: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "patient" | "doctor" | "hospital_admin";
}) {
  return api.post<AuthResponse>("/auth/register", payload);
}

// Mocks are opt-in for local development; production uses the real API by default.
export const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === "true";

function fakeUser(email: string, fullName = "Aziza Karimova"): AuthResponse["user"] {
  return {
    id: "mock-user-1",
    fullName,
    email,
    phone: "+998 90 123 45 67",
    role: "patient",
  };
}

function mockResponse(user: AuthResponse["user"]) {
  return {
    data: {
      user,
      accessToken: "mock-access-token",
    } satisfies AuthResponse,
  };
}

export function mockLogin(email: string) {
  return new Promise<ReturnType<typeof mockResponse>>((resolve) => {
    setTimeout(() => resolve(mockResponse(fakeUser(email))), 400);
  });
}

export function mockRegister(fullName: string, email: string) {
  return new Promise<ReturnType<typeof mockResponse>>((resolve) => {
    setTimeout(() => resolve(mockResponse(fakeUser(email, fullName))), 400);
  });
}
