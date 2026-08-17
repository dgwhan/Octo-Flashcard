"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";
import { authApi } from "../api/auth.api";
import { ApiError } from "@/src/lib/api";
import "../auth.css";

export default function LoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!identifier.trim()) {
      setErrorMessage("Please enter your email or username.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.login({
        identifier: identifier.trim(),
        password,
        rememberMe,
      });

      setSuccessMessage("Signed in successfully! Redirecting...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message || "Sign in failed. Please check your credentials.");
      } else {
        setErrorMessage("Unable to connect to server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-card">
      <h1 className="auth-title">Sign In</h1>

      {errorMessage && <div className="alert-error">{errorMessage}</div>}
      {successMessage && <div className="alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="identifier" className="form-label">
            E-mail
          </label>
          <div className="input-wrapper">
            <input
              id="identifier"
              type="text"
              className="form-input"
              placeholder="Enter your name or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
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
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="8+ Characters, 1 Capital letter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div
          className="remember-row"
          onClick={() => setRememberMe(!rememberMe)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              setRememberMe(!rememberMe);
            }
          }}
        >
          <div className={`custom-checkbox ${rememberMe ? "checked" : ""}`}>
            {rememberMe && <Check size={14} strokeWidth={3} color="#ffffff" />}
          </div>
          <span className="remember-label">Remember me</span>
        </div>

        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? <span className="spinner" /> : "Sign in"}
        </button>
      </form>

      <div className="auth-footer">
        <span>Don&apos;t have account?</span>
        <Link href="/auth/register" className="auth-link">
          Register
        </Link>
      </div>
    </div>
  );
}
