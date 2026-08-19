"use client";

import React from "react";
import styles from "./TopProgressBar.module.css";

interface TopProgressBarProps {
  isLoading?: boolean;
  className?: string;
}

export default function TopProgressBar({
  isLoading = true,
  className = "",
}: TopProgressBarProps) {
  if (!isLoading) return null;

  return (
    <div
      className={`${styles.progressContainer} ${className}`}
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
    >
      <div className={styles.progressBar} />
    </div>
  );
}
