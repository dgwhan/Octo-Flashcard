"use client";

import React from "react";
import Link from "next/link";
import { DotIcon } from "lucide-react";
import styles from "./DeckCard.module.css";

interface DeckCardProps {
  id: string;
  name: string;
  author: string;
  onClick?: () => void;
}

export default function DeckCard({
  id,
  name,
  author,
  onClick,
}: DeckCardProps) {
  const interactiveProps = onClick
    ? {
        onClick,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            onClick();
          }
        },
      }
    : {};

  const cardContent = (
    <div className={styles.card} {...interactiveProps}>
      <h3 className={styles.title}>{name}</h3>
      <span className={styles.icon}>
        <DotIcon />
      </span>
      <span className={styles.author}>{author}</span>
    </div>
  );

  if (id && !onClick) {
    return (
      <Link href={`/decks/${id}`} className={styles.cardLink}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}