import React, { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
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
          <textarea
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`${styles.input} ${styles.textarea} ${className}`}
            {...props}
          />
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

Textarea.displayName = "Textarea";

export default Textarea;
