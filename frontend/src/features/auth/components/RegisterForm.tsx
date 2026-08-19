"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { ApiError } from "@/src/lib/api";
import "../auth.css";

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!username.trim()) {
      setErrorMessage("Vui lòng nhập Username.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập Email.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      setSuccessMessage("Đăng ký thành công! Đang đăng nhập...");
      
      try {
        await authApi.login({
          identifier: username.trim(),
          password,
          rememberMe: true,
        });
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      } catch {
        setTimeout(() => {
          router.push("/auth/login");
        }, 800);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message || "Đăng ký thất bại.");
      } else {
        setErrorMessage("Không thể kết nối đến máy chủ.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-card">
      <h1 className="auth-title">Register</h1>

      {errorMessage && <div className="alert-error">{errorMessage}</div>}
      {successMessage && <div className="alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-wrapper">
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="8+ Characters, 1 Capital letter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="btn-submit" style={{ marginTop: "6px" }}>
          {isLoading ? <span className="spinner" /> : "Sign Up"}
        </button>
      </form>

      <div className="auth-footer">
        <span>Already have an account?</span>
        <Link href="/auth/login" className="auth-link">
          Sign In
        </Link>
      </div>
    </div>
  );
}
