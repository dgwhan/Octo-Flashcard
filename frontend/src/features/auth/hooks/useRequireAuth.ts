"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

export function useRequireAuth(redirectTo: string = "/auth/login") {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const returnUrl = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`${redirectTo}${returnUrl}`);
    }
  }, [isLoading, isAuthenticated, router, pathname, redirectTo]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    logout,
  };
}
