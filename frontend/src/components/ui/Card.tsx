import React, { HTMLAttributes, forwardRef } from "react";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "outline";
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hoverable = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.card} ${styles[variant]} ${
          hoverable ? styles.hoverable : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${styles.header} ${className}`} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", children, ...props }, ref) => (
    <h3 ref={ref} className={`${styles.title} ${className}`} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", children, ...props }, ref) => (
    <p ref={ref} className={`${styles.description} ${className}`} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${styles.content} ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${styles.footer} ${className}`} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export default Card;
