import styles from "../FlashCardViewer.module.css";

/** Keyboard shortcuts legend under the study card. */
export default function ShortcutGuide() {
  return (
    <div className={styles.keyboardGuide}>
      <span className={styles.kbdItem}>
        <kbd className={styles.kbd}>Space</kbd> Lật thẻ
      </span>
      <span className={styles.kbdItem}>
        <kbd className={styles.kbd}>←</kbd> <kbd className={styles.kbd}>→</kbd> Chuyển thẻ
      </span>
      <span className={styles.kbdItem}>
        <kbd className={styles.kbd}>1</kbd> Cần ôn
      </span>
      <span className={styles.kbdItem}>
        <kbd className={styles.kbd}>2</kbd> Đã nhớ
      </span>
      <span className={styles.kbdItem}>
        <kbd className={styles.kbd}>A</kbd> Phát âm
      </span>
      <span className={styles.kbdItem}>
        <kbd className={styles.kbd}>F</kbd> Toàn màn hình
      </span>
    </div>
  );
}
