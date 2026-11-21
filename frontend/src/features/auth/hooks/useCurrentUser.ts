import { useSyncExternalStore, useMemo } from "react";
import { authApi } from "../api/auth.api";

export interface StoredUser {
  userId: string;
  username: string;
  email: string;
}

export function useCurrentUser(): StoredUser | null {
  const userJson = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("octo-auth-change", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("octo-auth-change", callback);
      };
    },
    () => {
      const stored = authApi.getStoredUser();
      return stored ? JSON.stringify(stored) : "";
    },
    () => ""
  );

  return useMemo(() => {
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as StoredUser;
    } catch {
      return null;
    }
  }, [userJson]);
}
