import React, { HTMLAttributes, forwardRef } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline"
  | "a1"
  | "a2"
  | "b1"
  | "b2"
  | "c1"
  | "c2";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  interactive?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "neutral",
      size = "md",
      interactive = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.badge} ${styles[variant]} ${styles[size]} ${
          interactive ? styles.interactive : ""
        } ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
