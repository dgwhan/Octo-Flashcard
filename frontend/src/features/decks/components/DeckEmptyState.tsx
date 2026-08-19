"use client";

import React from "react";
import { Plus, Layers } from "lucide-react";
import styles from "./DeckEmptyState.module.css";

interface DeckEmptyStateProps {
  onCreateClick?: () => void;
}

export default function DeckEmptyState({ onCreateClick }: DeckEmptyStateProps) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconWrapper}>
        <Layers size={36} className={styles.icon} />
      </div>
      <h3 className={styles.title}>No decks found</h3>
      <p className={styles.description}>
        There are currently no public decks available. Create a new deck to get started.
      </p>
      <button
        type="button"
        className={styles.createBtn}
        onClick={onCreateClick}
      >
        <Plus size={18} />
        <span>Create Deck</span>
      </button>
    </div>
  );
}
