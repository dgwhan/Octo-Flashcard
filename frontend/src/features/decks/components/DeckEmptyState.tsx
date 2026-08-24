"use client";

import React from "react";
import { Layers } from "lucide-react";
import styles from "./DeckEmptyState.module.css";

interface DeckEmptyStateProps {
  onCreateClick?: () => void;
}

export default function DeckEmptyState({}: DeckEmptyStateProps = {}) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconWrapper}>
        <Layers size={36} className={styles.icon} />
      </div>
      <h3 className={styles.title}>No decks found</h3>
    </div>
  );
}
