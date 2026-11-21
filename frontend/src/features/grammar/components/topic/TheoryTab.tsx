"use client";

import { ArrowRight, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import type { GrammarTopic, UserGrammarProgress } from "../../types";
import styles from "../../pages/GrammarTopicPage.module.css";

const FORMULA_SIGN: Record<string, string> = {
  affirmative: "+",
  negative: "−",
  interrogative: "?",
  special: "*",
};

interface TheoryTabProps {
  topic: GrammarTopic;
  progress: UserGrammarProgress;
  isSaving: boolean;
  onComplete: () => void;
}

/** Summary, formulas, usages, examples, common mistakes and tips. */
export default function TheoryTab({ topic, progress, isSaving, onComplete }: TheoryTabProps) {
  return (
    <div id="panel-theory" role="tabpanel" aria-labelledby="tab-theory" className={styles.panel}>
      <p className={styles.summary}>{topic.theory.summary}</p>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Công thức</h2>
        <div className={styles.formulas}>
          {topic.theory.formulas.map((f, i) => (
            <article key={i} className={styles.formula}>
              <p className={styles.formulaLabel}>
                <span className={styles.formulaSign} aria-hidden="true">
                  {FORMULA_SIGN[f.type] ?? "*"}
                </span>
                {f.label}
              </p>
              <p className={styles.formulaStructure}>{f.structure}</p>
              <p className={styles.exampleEn} lang="en">
                {f.exampleEn}
              </p>
              <p className={styles.exampleVi}>{f.exampleVi}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Khi nào dùng</h2>
        <ol className={styles.usages}>
          {topic.theory.usages.map((u, i) => (
            <li key={u.id || i} className={styles.usage}>
              <span className={styles.usageNum}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.usageTitle}>{u.title}</h3>
                <p className={styles.usageText}>{u.explanation}</p>
                <blockquote className={styles.example}>
                  <p className={styles.exampleEn} lang="en">
                    {u.exampleEn}
                  </p>
                  <p className={styles.exampleVi}>{u.exampleVi}</p>
                </blockquote>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Dấu hiệu nhận biết</h2>
        <div className={styles.signals}>
          {topic.theory.signals.map((s, i) => (
            <div key={i} className={styles.signal}>
              <h3 className={styles.signalTitle}>{s.category}</h3>
              <ul className={styles.chips}>
                {s.words.map((w) => (
                  <li key={w} className={styles.chip} lang="en">
                    {w}
                  </li>
                ))}
              </ul>
              <p className={styles.signalText}>{s.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Lỗi hay gặp</h2>
        <ul className={styles.mistakes}>
          {topic.theory.commonMistakes.map((m, i) => (
            <li key={i} className={styles.mistake}>
              <p className={styles.wrong}>
                <XCircle size={16} aria-label="Sai" />
                <s lang="en">{m.incorrect}</s>
              </p>
              <p className={styles.right}>
                <CheckCircle2 size={16} aria-label="Đúng" />
                <span lang="en">{m.correct}</span>
              </p>
              <p className={styles.mistakeText}>{m.explanation}</p>
            </li>
          ))}
        </ul>
      </section>

      {topic.theory.proTips.length > 0 && (
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Mẹo nhớ</h2>
          <ul className={styles.tips}>
            {topic.theory.proTips.map((tip, i) => (
              <li key={i}>
                <Lightbulb size={16} aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.nextStep}>
        <p className={styles.nextStepText}>Đọc xong phần lý thuyết? Đánh dấu để lưu tiến độ và chuyển sang bài tập.</p>
        <button type="button" className={styles.primaryBtn} onClick={onComplete} disabled={isSaving}>
          {progress.isTheoryCompleted ? "Sang bài thực hành" : "Đã hiểu, sang thực hành"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
