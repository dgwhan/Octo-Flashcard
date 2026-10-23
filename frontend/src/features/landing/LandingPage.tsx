"use client";

import React from "react";
import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";
import LandingFeatures from "./LandingFeatures";
import LandingSources from "./LandingSources";
import LandingMethodology from "./LandingMethodology";
import LandingCTA from "./LandingCTA";
import LandingFooter from "./LandingFooter";
import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      {/* Dedicated Standalone Header */}
      <LandingHeader />

      {/* Main Content Body */}
      <main>
        {/* Hero Section */}
        <LandingHero />

        {/* 6 Core Pillars Features */}
        <LandingFeatures />

        {/* Public Domain & 3rd Party Open Sources Attribution Showcase */}
        <LandingSources />

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
