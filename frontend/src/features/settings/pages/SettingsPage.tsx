"use client";

import { useUserSettings } from "@/src/lib/userSettings";
import VoicePicker from "../components/VoicePicker";
import VoiceSpeed from "../components/VoiceSpeed";
import GeminiKeySettings from "../components/GeminiKeySettings";
import styles from "../settings.module.css";

/** /settings: voice and AI key, saved to the account and used everywhere in the app. */
export default function SettingsPage() {
  const { status } = useUserSettings();

  return (
    <div className={styles.page}>
      {status === "anonymous" && (
        <p className={styles.notice}>
          Bạn chưa đăng nhập: giọng đọc chỉ được nhớ trên trình duyệt này. Đăng nhập để cài đặt theo tài khoản và dùng
          được trên mọi thiết bị.
        </p>
      )}
      {status === "error" && (
        <p className={styles.notice}>Không tải được cài đặt từ máy chủ. Thay đổi lúc này có thể chưa được lưu.</p>
      )}

      <section className={styles.section} aria-labelledby="voice-title">
        <header className={styles.sectionHead}>
          <span className={styles.sectionNum}>01</span>
          <div>
            <h2 id="voice-title" className={styles.sectionTitle}>
              Giọng đọc
            </h2>
            <p className={styles.muted}>
              Dùng cho mọi nút nghe: truyện VOA, cụm từ, từ vựng, flashcard và các bài luyện nói. Từ đơn vẫn ưu tiên bản thu
              của người bản xứ.
            </p>
          </div>
        </header>
        <VoicePicker />
        <h3 className={styles.subTitle}>Tốc độ đọc mặc định</h3>
        <VoiceSpeed />
      </section>

      <section className={styles.section} aria-labelledby="ai-title">
        <header className={styles.sectionHead}>
          <span className={styles.sectionNum}>02</span>
          <div>
            <h2 id="ai-title" className={styles.sectionTitle}>
              API key Gemini
            </h2>
            <p className={styles.muted}>
              Dùng cho hội thoại nhập vai, chấm band IELTS, giọng đọc AI Gemini và tạo thẻ bằng AI (không bị giới hạn lượt
              mỗi ngày như khi dùng key chung).
            </p>
          </div>
        </header>
        <GeminiKeySettings />
      </section>
    </div>
  );
}
