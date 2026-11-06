import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loadingText?: string;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loadingText = "Đang tải...",
      isLoading = false,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${
          className || ""
        }`}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className={styles.spinner}
              role="status"
              aria-label="loading"
            />
            {loadingText}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
