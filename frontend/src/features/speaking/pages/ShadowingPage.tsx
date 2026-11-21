import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import type { ShadowSet } from "../data/shadowing.data";
import SentenceDrill from "../components/SentenceDrill";
import { SpeechNotice } from "../components/SpeechParts";
import styles from "../speaking.module.css";

/** /speaking/shadowing/[setId]: practise one set. Only this set's sentences reach the browser. */
export default function ShadowingPage({ set }: { set: ShadowSet }) {
  return (
    <>
      <Link href={ROUTES.SPEAKING_SHADOWING} className={styles.back}>
        <ArrowLeft size={15} aria-hidden="true" /> Chọn bộ câu khác
      </Link>
      <SpeechNotice />
      <SentenceDrill label={set.title} items={set.sentences.map((s) => ({ display: s, target: s }))} />
    </>
  );
}
