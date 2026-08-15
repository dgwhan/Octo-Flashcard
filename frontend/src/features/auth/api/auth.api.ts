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
    const res = await apiClient<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (typeof window !== "undefined" && res.accessToken) {
      if (data.rememberMe) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify({
          userId: res.userId,
          username: res.username,
          email: res.email,
        }));
      } else {
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", JSON.stringify({
          userId: res.userId,
          username: res.username,
          email: res.email,
        }));
        // Also keep in localStorage for simplicity
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify({
          userId: res.userId,
          username: res.username,
          email: res.email,
        }));
      }
    }

    return res;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getCurrentUser(): Promise<CurrentUserResponse> {
    return apiClient<CurrentUserResponse>("/auth/me", {
      method: "GET",
    });
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
