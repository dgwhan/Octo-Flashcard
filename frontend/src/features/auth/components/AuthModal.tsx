"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, LogIn } from "lucide-react";
import styles from "./AuthModal.module.css";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  redirectUrl?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = "Login or Register to Continue",
  description = "Login or create an account to start creating your Flashcard sets.",
  redirectUrl = "/decks/create",
}) => {
  // Đóng modal khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng X */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className={styles.iconWrapper}>
          <LogIn size={28} />
        </div>

        {/* Tiêu đề & Nội dung */}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        {/* Nút hành động */}
        <div className={styles.actions}>
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`}
            className={styles.loginBtn}
          >
            Login
          </Link>
          <Link
            href={`/auth/register?redirect=${encodeURIComponent(redirectUrl)}`}
            className={styles.registerBtn}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
