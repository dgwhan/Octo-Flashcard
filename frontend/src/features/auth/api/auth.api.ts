import { apiClient } from "@/src/lib/api";
import {
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/src/types/auth";

export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>("/auth/login", data);

    if (typeof window !== "undefined" && res?.accessToken) {
      const userPayload = JSON.stringify({
        userId: res.userId,
        username: res.username,
        email: res.email,
      });

      if (data.rememberMe) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", userPayload);
      } else {
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", userPayload);
        // Also keep in localStorage for consistency
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", userPayload);
      }
    }

    return res;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>("/auth/register", data);
  },

  async getCurrentUser(): Promise<CurrentUserResponse> {
    return apiClient.get<CurrentUserResponse>("/auth/me");
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
    }
  },

  getStoredUser(): { userId: string; username: string; email: string } | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  },
};
