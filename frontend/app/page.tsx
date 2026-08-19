"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/src/features/auth/api/auth.api";

interface UserProfile {
  userId: string;
  username: string;
  email: string;
}

const emptySubscribe = () => () => {};

export default function HomePage() {
  const router = useRouter();

  const currentUserJson = useSyncExternalStore(
    emptySubscribe,
    () => {
      const user = authApi.getStoredUser();
      return user ? JSON.stringify(user) : null;
    },
    () => null
  );

  const currentUser: UserProfile | null = currentUserJson ? JSON.parse(currentUserJson) : null;

  const handleLogout = () => {
    authApi.logout();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <main style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Hello, welcome to Octo Flashcard</h1>

      <div style={{ marginTop: "24px" }}>
        {currentUser ? (
          <div>
            <p>
              Logged in as: <strong>{currentUser.username}</strong> ({currentUser.email})
            </p>
            <button
              onClick={handleLogout}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                backgroundColor: "#000",
                color: "#fff",
                border: "1px solid #000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </div>
        )}
      </div>
    </main>
  );
}