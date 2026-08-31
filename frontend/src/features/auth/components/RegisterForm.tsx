"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authApi } from "../api/auth.api";
import { ApiError } from "@/src/lib/api";
import "../auth.css";

interface RegisterFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const newErrors: RegisterFormErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "E-mail is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await authApi.register({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      try {
        await authApi.login({
          identifier: username.trim(),
          password,
          rememberMe: true,
        });
        router.push("/");
        router.refresh();
      } catch {
        router.push("/auth/login");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        const msg = err.message || "";
        if (msg.toLowerCase().includes("username")) {
          setErrors({ username: "Username already exists" });
        } else if (msg.toLowerCase().includes("email")) {
          setErrors({ email: "Email already exists" });
        } else if (err.status === 409) {
          setGeneralError("Username or email already exists");
        } else {
          setGeneralError(msg || "Registration failed. Please try again");
        }
      } else {
        setGeneralError("Cannot connect to server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-card auth-form-card-wide">
      <h1 className="auth-title">Register</h1>

      {generalError && <div className="general-error-text">{generalError}</div>}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="auth-grid-2cols">
          {/* Left Column: Username & E-mail */}
          <div className="auth-col">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-wrapper">
                <input
                  id="username"
                  type="text"
                  className={`form-input ${errors.username ? "input-error" : ""}`}
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) {
                      setErrors((prev) => ({ ...prev, username: undefined }));
                    }
                  }}
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <span className="field-error">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Right Column: Password & Confirm Password */}
          <div className="auth-col">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                  placeholder="8+ characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  autoComplete="new-password"
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

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          formNoValidate
          disabled={isLoading}
          className="btn-submit"
          style={{ marginTop: "10px" }}
        >
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
