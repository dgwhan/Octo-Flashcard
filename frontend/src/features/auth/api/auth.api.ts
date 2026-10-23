import { apiClient } from "@/src/lib/api";
import { API_ENDPOINTS } from "@/src/config/routes";
import {
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/src/types/auth";
import {
  saveSecureUser,
  getSecureUser,
  clearSecureUser,
  purgeLegacyPlaintextStorage,
} from "@/src/utils/secureStorage";

export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    if (typeof window !== "undefined" && res?.accessToken) {
      // Clean up any legacy plaintext user info
      purgeLegacyPlaintextStorage();

      // Store sensitive user profile in obfuscated secure storage
      saveSecureUser(
        {
          userId: res.userId,
          username: res.username,
          email: res.email,
        },
        data.rememberMe
      );

      if (data.rememberMe) {
        localStorage.setItem("accessToken", res.accessToken);
        sessionStorage.removeItem("accessToken");
      } else {
        sessionStorage.setItem("accessToken", res.accessToken);
        localStorage.removeItem("accessToken");
      }
    }

    return res;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
  },

  async getCurrentUser(): Promise<CurrentUserResponse> {
    return apiClient.get<CurrentUserResponse>(API_ENDPOINTS.AUTH.ME);
  },

  logout(): void {
    if (typeof window !== "undefined") {
      clearSecureUser();
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      purgeLegacyPlaintextStorage();
    }
  },

  getStoredUser(): { userId: string; username: string; email: string } | null {
    if (typeof window === "undefined") return null;

    // Check secure obfuscated storage first
    const secureUser = getSecureUser();
    if (secureUser) {
      return secureUser;
    }

    // Auto-migrate legacy plaintext if present and immediately purge plaintext
    try {
      const legacyUserStr = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (legacyUserStr) {
        const parsed = JSON.parse(legacyUserStr);
        purgeLegacyPlaintextStorage();
        if (parsed?.userId && parsed?.username) {
          saveSecureUser(parsed, true);
          return parsed;
        }
      }
    } catch {
      purgeLegacyPlaintextStorage();
    }

    return null;
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return (
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken")
    );
  },
};
