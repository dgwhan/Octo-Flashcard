import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";
import LandingFeatures from "./LandingFeatures";
import LandingSources from "./LandingSources";
import LandingMethodology from "./LandingMethodology";
import LandingCTA from "./LandingCTA";
import LandingFooter from "./LandingFooter";
import { SuckerRow } from "@/src/components/ui";
import styles from "./landing.module.css";

function Divider() {
  return (
    <div className={styles.divider}>
      <SuckerRow />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      <LandingHeader />
      <main>
        <LandingHero />
        <Divider />
        <LandingFeatures />
        <LandingSources />
        <LandingMethodology />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
