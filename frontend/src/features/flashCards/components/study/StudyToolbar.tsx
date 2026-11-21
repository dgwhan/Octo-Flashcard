"use client";

import { ArrowLeftRight, Maximize2, Minimize2, Shuffle, UserCheck } from "lucide-react";
import styles from "../FlashCardViewer.module.css";

interface StudyToolbarProps {
  username?: string;
  isShuffled: boolean;
  isReversed: boolean;
  isFullscreen: boolean;
  onShuffle: () => void;
  onReverse: () => void;
  onFullscreen: () => void;
}

/** Who the progress is saved for, plus shuffle / reverse / fullscreen toggles. */
export default function StudyToolbar({
  username,
  isShuffled,
  isReversed,
  isFullscreen,
  onShuffle,
  onReverse,
  onFullscreen,
}: StudyToolbarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.userStatusBadge} title="Tiến độ học tập được lưu tự động cho tài khoản">
        <span className={styles.userDot} />
        <UserCheck size={14} />
        <span>
          Lưu cho: <span className={styles.userNameHighlight}>{username || "Tài khoản của bạn"}</span>
        </span>
      </div>

      <div className={styles.topTools}>
        <button
          type="button"
          className={`${styles.toolBtn} ${isShuffled ? styles.toolBtnActive : ""}`}
          onClick={onShuffle}
          title="Xáo trộn thứ tự thẻ (Phím S)"
          aria-label="Shuffle cards"
        >
          <Shuffle size={14} />
          <span>Xáo trộn</span>
        </button>

        <button
          type="button"
          className={`${styles.toolBtn} ${isReversed ? styles.toolBtnActive : ""}`}
          onClick={onReverse}
          title="Đảo mặt thẻ (Định nghĩa <-> Thuật ngữ)"
          aria-label="Reverse card faces"
        >
          <ArrowLeftRight size={14} />
          <span>Đổi mặt hỏi</span>
        </button>

        <button
          type="button"
          className={styles.toolBtn}
          onClick={onFullscreen}
          title="Bật/Tắt toàn màn hình (Phím F)"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </div>
  );
}
