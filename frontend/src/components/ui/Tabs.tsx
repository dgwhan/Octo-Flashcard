"use client";

import React, { createContext, useContext, ReactNode, forwardRef, ButtonHTMLAttributes, HTMLAttributes } from "react";
import styles from "./Tabs.module.css";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant?: "pill" | "underline";
}

const TabsContext = createContext<TabsContextType | null>(null);

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  variant?: "pill" | "underline";
  className?: string;
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  variant = "pill",
  className = "",
  children,
}) => {
  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onValueChange, variant }}>
      <div className={`${styles.tabs} ${styles[variant]} ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className = "", children, ...props }, ref) => {
    const context = useContext(TabsContext);
    const variant = context?.variant || "pill";

    return (
      <div
        ref={ref}
        role="tablist"
        className={`${styles.tabList} ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabList.displayName = "TabList";

export interface TabTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: ReactNode;
}

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ value, icon, className = "", children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        className={`${styles.tabTrigger} ${isActive ? styles.active : ""} ${className}`}
        onClick={() => context.setActiveTab(value)}
        {...props}
      >
        {icon && <span className={styles.tabIcon}>{icon}</span>}
        {children}
      </button>
    );
  }
);
TabTrigger.displayName = "TabTrigger";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className = "", children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabPanel must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
      <div ref={ref} role="tabpanel" className={`${styles.tabPanel} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
TabPanel.displayName = "TabPanel";

export default Tabs;
