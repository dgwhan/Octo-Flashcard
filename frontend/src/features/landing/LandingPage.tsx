"use client";

import {
  LandingHeader,
  LandingHero,
  LandingFeatures,
  LandingMethodology,
  LandingCTA,
  LandingFooter,
} from "./sections";
import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      {/* Dedicated Standalone Floating Header */}
      <LandingHeader />

      {/* Main Content Body */}
      <main>
        {/* Hero Section & 2-Row Big Numbers Metrics */}
        <LandingHero />

        {/* 6 Core Pillars Features (Sticky Notes Zigzag) */}
        <LandingFeatures />

        {/* Cognitive & Pedagogical Methodology */}
        <LandingMethodology />

        {/* Call to Action Banner to Console */}
        <LandingCTA />
      </main>

      {/* Comprehensive Landing Footer */}
      <LandingFooter />
    </div>
  );
}
