import {
  LandingHeader,
  LandingHero,
  LandingFeatures,
  LandingSources,
  LandingMethodology,
  LandingCTA,
  LandingFooter,
} from "./sections";
import { SuckerRow } from "@/src/components/ui";
import styles from "./landing.module.css";

function Divider() {
  return (
    <div className={styles.divider}>
      <SuckerRow reveal />
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
