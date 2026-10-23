/**
 * Centralized Color Constants and CSS Variable Tokens
 * Theme: Vibrant electric emerald - premium iOS style (AppColors)
 */

/**
 * Raw Color Palette constants matching AppColors definition
 * Useful for Canvas, Chart libraries, or inline SVG definitions.
 */
export const AppColors = {
  // Brand / Accent (Vibrant electric emerald - premium iOS style)
  accent: "#10B981",
  accentLight: "#34D399",

  // ============ LIGHT THEME ============
  primaryLight: "#10B981",
  backgroundLight: "#F3F4F6",
  cardLight: "#FFFFFF",
  textLight: "#111827",
  subtextLight: "#6B7280",
  btnLight: "#10B981",
  inputFillLight: "#F3F4F6",
  dividerLight: "#E5E7EB",
  iconLight: "#4B5563",

  // ============ DARK THEME ============
  primaryDark: "#10B981",
  backgroundDark: "#090D10", // deep premium glass black
  cardDark: "#151D24",
  surfaceDark: "#1F2937",
  textDark: "#F3F4F6",
  subtextDark: "#D0D2D5", // Color.fromARGB(255, 208, 210, 213)
  btnDark: "#10B981",
  inputFillDark: "#1F2937",
  dividerDark: "#374151",
  iconDark: "#D1D5DB",
} as const;

/**
 * CSS Variable Tokens for TypeScript UI styling
 */
export const colors = {
  // Brand / Accent
  accent: "var(--color-accent)",
  accentLight: "var(--color-accent-light)",
  accentHover: "var(--color-accent-hover)",

  // Primary
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primary-hover)",
  primaryLight: "var(--color-primary-light)",
  primaryRing: "var(--color-primary-ring)",

  // Secondary
  secondary: "var(--color-secondary)",
  secondaryHover: "var(--color-secondary-hover)",
  secondaryLight: "var(--color-secondary-light)",

  // Backgrounds & Surface
  bgMain: "var(--color-bg-main)",
  bgCard: "var(--color-bg-card)",
  bgMuted: "var(--color-bg-muted)",
  bgSubtle: "var(--color-bg-subtle)",
  surface: "var(--color-surface)",

  // Typography
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
  textInverse: "var(--color-text-inverse)",

  // Actions & Inputs
  btn: "var(--color-btn)",
  btnHover: "var(--color-btn-hover)",
  inputFill: "var(--color-input-fill)",
  icon: "var(--color-icon)",

  // Borders & Dividers
  border: "var(--color-border)",
  borderHover: "var(--color-border-hover)",
  borderFocus: "var(--color-border-focus)",
  divider: "var(--color-divider)",

  // Status
  danger: "var(--color-danger)",
  dangerHover: "var(--color-danger-hover)",
  dangerLight: "var(--color-danger-light)",
  dangerBorder: "var(--color-danger-border)",

  success: "var(--color-success)",
  successHover: "var(--color-success-hover)",
  successLight: "var(--color-success-light)",

  warning: "var(--color-warning)",
  warningHover: "var(--color-warning-hover)",
  warningLight: "var(--color-warning-light)",
} as const;

export default colors;
