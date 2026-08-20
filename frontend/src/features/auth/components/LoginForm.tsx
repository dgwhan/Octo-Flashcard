"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";
import { authApi } from "../api/auth.api";
import { ApiError } from "@/src/lib/api";
import "../auth.css";

interface FormErrors {
  identifier?: string;
  password?: string;
}

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const newErrors: FormErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = "E-mail is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await authApi.login({
        identifier: identifier.trim(),
        password,
        rememberMe,
      });

      router.push(redirectTarget);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setGeneralError("Email or password is not correct");
        } else {
          setGeneralError(err.message || "Login failed. Please try again");
        }
      } else {
        setGeneralError("Cannot connect to server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-card">
      <h1 className="auth-title">Sign In</h1>

      {generalError && <div className="general-error-text">{generalError}</div>}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="identifier" className="form-label">
            E-mail
          </label>
          <div className="input-wrapper">
            <input
              id="identifier"
              type="text"
              className={`form-input ${errors.identifier ? "input-error" : ""}`}
              placeholder="Enter your name or username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) {
                  setErrors((prev) => ({ ...prev, identifier: undefined }));
                }
              }}
              autoComplete="username"
            />
          </div>
          {errors.identifier && (
            <span className="field-error">{errors.identifier}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`form-input ${errors.password ? "input-error" : ""}`}
              placeholder="8+ Characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              autoComplete="current-password"
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
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
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

        <button type="submit" formNoValidate disabled={isLoading} className="btn-submit">
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

export default function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="auth-form-card">
          <h1 className="auth-title">Sign In</h1>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <span className="spinner" />
          </div>
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}
