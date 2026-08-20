"use client";

import React from "react";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explore</h1>
      <p className={styles.description}>
        Welcome to Octo Flashcard! Explore public decks and flashcards to supercharge your learning.
      </p>
    </div>
  );
}