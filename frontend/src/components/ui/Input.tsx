import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = "",
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div
        className={`${styles.container} ${fullWidth ? styles.fullWidth : ""} ${
          disabled ? styles.disabled : ""
        }`}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div
          className={`${styles.inputWrapper} ${error ? styles.hasError : ""}`}
        >
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`${styles.input} ${leftIcon ? styles.hasLeftIcon : ""} ${
              rightIcon ? styles.hasRightIcon : ""
            } ${className}`}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>

        {error ? (
          <span className={styles.errorText} role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span className={styles.helperText}>{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
