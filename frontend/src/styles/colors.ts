/**
 * Centralized Theme Color Constants for TypeScript UI styling
 */
export const colors = {
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primary-hover)",
  primaryLight: "var(--color-primary-light)",
  primaryRing: "var(--color-primary-ring)",

  secondary: "var(--color-secondary)",
  secondaryHover: "var(--color-secondary-hover)",
  secondaryLight: "var(--color-secondary-light)",

  bgMain: "var(--color-bg-main)",
  bgCard: "var(--color-bg-card)",
  bgMuted: "var(--color-bg-muted)",
  bgSubtle: "var(--color-bg-subtle)",

  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
  textInverse: "var(--color-text-inverse)",

  border: "var(--color-border)",
  borderHover: "var(--color-border-hover)",
  borderFocus: "var(--color-border-focus)",

  danger: "var(--color-danger)",
  dangerHover: "var(--color-danger-hover)",
  dangerLight: "var(--color-danger-light)",

  success: "var(--color-success)",
  successLight: "var(--color-success-light)",

  warning: "var(--color-warning)",
  warningLight: "var(--color-warning-light)",
} as const;
