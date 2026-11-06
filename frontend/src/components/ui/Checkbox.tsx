import React, { InputHTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = "", checked, disabled, id, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label
        htmlFor={inputId}
        className={`${styles.checkboxRow} ${disabled ? styles.disabled : ""} ${className}`}
      >
        <span className={styles.checkboxWrapper}>
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className={styles.hiddenInput}
            {...props}
          />
          <span className={`${styles.customCheckbox} ${checked ? styles.checked : ""}`}>
            {checked && <Check size={14} className={styles.checkIcon} />}
          </span>
        </span>
        {(label || description) && (
          <span className={styles.labelCol}>
            {label && <span className={styles.labelText}>{label}</span>}
            {description && <span className={styles.descText}>{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className = "", checked, disabled, id, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label
        htmlFor={inputId}
        className={`${styles.switchRow} ${disabled ? styles.disabled : ""} ${className}`}
      >
        <span className={styles.switchWrapper}>
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className={styles.hiddenInput}
            {...props}
          />
          <span className={`${styles.switchTrack} ${checked ? styles.switchChecked : ""}`}>
            <span className={styles.switchThumb} />
          </span>
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Checkbox;
