import React, { SelectHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className = "",
      disabled,
      children,
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
          <select
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`${styles.input} ${styles.select} ${className}`}
            {...props}
          >
            {children}
          </select>
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

Select.displayName = "Select";

export default Select;
