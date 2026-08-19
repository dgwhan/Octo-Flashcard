import React from "react";
import styles from "./layout.module.css";

export default function DeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.deckLayout}>{children}</div>;
}
