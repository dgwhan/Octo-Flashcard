import React from "react";
import styles from "./ErrorMessage.module.css";

export interface ErrorMessageProps {
  message?: string | null;
  className?: string;
  id?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className,
  id,
}) => {
  if (!message) return null;

  return (
    <div
      id={id}
      className={`${styles.errorContainer} ${className || ""}`}
      role="alert"
    >
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
