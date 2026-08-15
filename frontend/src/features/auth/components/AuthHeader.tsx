import React from "react";
import Link from "next/link";
import "../auth.css";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="auth-header">
      <Link href="/" className="auth-header-brand">
        Octo Flashcard
      </Link>
      <h2 className="auth-header-title">{title}</h2>
      {subtitle && <p className="auth-header-subtitle">{subtitle}</p>}
    </div>
  );
}
