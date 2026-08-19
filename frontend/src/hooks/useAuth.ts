"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/src/features/auth/api/auth.api";

export interface AuthUser {
  userId: string;
  username: string;
  email: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshAuth = useCallback(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    const storedToken = authApi.getStoredToken();
    const storedUser = authApi.getStoredUser();

    setToken(storedToken);
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "user") {
        refreshAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refreshAuth]);

  const logout = useCallback(() => {
    authApi.logout();
    setToken(null);
    setUser(null);
    router.push("/auth/login");
    router.refresh();
  }, [router]);

  return {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    refreshAuth,
    logout,
  };
}
