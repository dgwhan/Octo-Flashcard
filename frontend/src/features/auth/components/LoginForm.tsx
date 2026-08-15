"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { ApiError } from "@/src/lib/api";
import "../auth.css";

export default function LoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!identifier.trim()) {
      setErrorMessage("Vui lòng nhập Username hoặc Email.");
      return;
    }
    if (!password) {
      setErrorMessage("Vui lòng nhập Password.");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.login({
        identifier: identifier.trim(),
        password,
        rememberMe,
      });

      setSuccessMessage("Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message || "Đăng nhập thất bại.");
      } else {
        setErrorMessage("Không thể kết nối đến máy chủ.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-box">
      <h2>Login</h2>

      {errorMessage && <div className="alert-error">{errorMessage}</div>}
      {successMessage && <div className="alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Username / Email</label>
          <input
            id="identifier"
            type="text"
            className="form-input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="auth-switch">
        <span>Don&apos;t have an account? </span>
        <Link href="/auth/register">Register</Link>
      </div>
    </div>
  );
}
