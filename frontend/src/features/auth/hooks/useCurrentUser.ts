"use client";

import { useSyncExternalStore, useMemo } from "react";
import { authApi } from "../api/auth.api";

export interface StoredUser {
  userId: string;
  username: string;
  email: string;
}

const subscribeAuth = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("octo-auth-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("octo-auth-change", callback);
  };
};

export function useCurrentUser(): StoredUser | null {
  const userJson = useSyncExternalStore(
    subscribeAuth,
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

/** Whether an access token is stored. null on the server and during hydration: render a loading state then. */
export function useSignedIn(): boolean | null {
  return useSyncExternalStore(subscribeAuth, () => !!authApi.getStoredToken(), () => null);
}
