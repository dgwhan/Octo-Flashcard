"use client";

import { useState } from "react";
import { AudioButton } from "@/src/components/ui/AudioButton";
import { speakingVoice } from "../lib/voice/voice";
import type { SoundGroup } from "../data/pronunciation.data";
import { spokenForm } from "../data/pronunciation.data";
import SentenceDrill from "../components/SentenceDrill";
import { SpeechNotice } from "../components/SpeechParts";
import styles from "../speaking.module.css";

interface LabGroup extends SoundGroup {
  phonemes: { symbol: string; name: string; audioUrl?: string }[];
}

export default function PronunciationPage({ groups }: { groups: LabGroup[] }) {
  const [id, setId] = useState(groups[0].id);
  const group = groups.find((g) => g.id === id) ?? groups[0];

  return (
    <div className={styles.stack}>
      <div className={styles.chips} role="group" aria-label="Nhóm âm">
        {groups.map((g) => (
          <button key={g.id} type="button" className={styles.chip} aria-pressed={g.id === id} onClick={() => setId(g.id)}>
            {g.title}
          </button>
        ))}
      </div>

      <section className={styles.soundCard} aria-labelledby="sound-title">
        <h2 id="sound-title" className={styles.panelTitle}>
          {group.title}
        </h2>
        <p className={styles.tip}>{group.tip}</p>
        <div className={styles.phonemes}>
          {group.phonemes.map((p) => (
            <span key={p.symbol} className={styles.phoneme}>
              <span className={styles.phonemeSymbol}>/{p.symbol}/</span>
              {p.audioUrl && (
                <AudioButton player={speakingVoice} text={p.symbol} audioUrl={p.audioUrl} size="sm" variant="subtle" aria-label={`Nghe âm /${p.symbol}/`} />
              )}
            </span>
          ))}
        </div>
      </section>

      <SpeechNotice />
      {/* key: a new group starts a fresh drill */}
      <SentenceDrill
        key={group.id}
        label={group.title}
        items={[...group.words, ...group.sentences].map((w) => ({ display: w, target: spokenForm(w) }))}
      />
      <p className={styles.muted}>
        Với cặp từ rất giống nhau (ship và sheep), nhận dạng giọng nói đôi khi đoán theo ngữ cảnh, nên hãy nghe lại bản ghi
        của mình để tự so với mẫu.
      </p>
    </div>
  );
}
