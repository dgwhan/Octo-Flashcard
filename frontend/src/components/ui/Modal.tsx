"use client";

import React, { ReactNode, useEffect, forwardRef, HTMLAttributes } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
  className = "",
}) => {
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
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={`${styles.modal} ${styles[maxWidth]} ${className}`}>
        {(title || description) && (
          <div className={styles.header}>
            <div className={styles.headerText}>
              {title && typeof title === "string" ? (
                <h2 className={styles.title}>{title}</h2>
              ) : (
                title
              )}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${styles.header} ${className}`} {...props}>
      {children}
    </div>
  )
);
ModalHeader.displayName = "ModalHeader";

export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${styles.body} ${className}`} {...props}>
      {children}
    </div>
  )
);
ModalBody.displayName = "ModalBody";

export const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${styles.footer} ${className}`} {...props}>
      {children}
    </div>
  )
);
ModalFooter.displayName = "ModalFooter";

export default Modal;
