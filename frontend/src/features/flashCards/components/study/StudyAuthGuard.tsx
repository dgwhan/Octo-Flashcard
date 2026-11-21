import Link from "next/link";
import { Lock, LogIn } from "lucide-react";
import styles from "../FlashCardViewer.module.css";

/** Shown instead of the study card when nobody is signed in. */
export default function StudyAuthGuard({ redirectTarget }: { redirectTarget: string }) {
  return (
    <div className={styles.authGuardBox}>
      <div className={styles.lockIconCircle}>
        <Lock size={30} />
      </div>
      <h3 className={styles.authGuardTitle}>Yêu cầu đăng nhập để học tập</h3>
      <p className={styles.authGuardDesc}>
        Bạn cần đăng nhập tài khoản Octo Flashcard để sử dụng giao diện học thẻ 2 mặt, phát âm giọng đọc, theo dõi tỷ lệ nhớ và lưu trữ tiến độ cá nhân của bạn.
      </p>
      <div className={styles.authGuardButtons}>
        <Link
          href={`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`}
          className={styles.btnPrimaryAction}
        >
          <LogIn size={18} />
          <span>Đăng nhập ngay</span>
        </Link>
        <Link
          href={`/auth/register?redirect=${encodeURIComponent(redirectTarget)}`}
          className={styles.btnSecondaryAction}
        >
          <span>Tạo tài khoản mới</span>
        </Link>
      </div>
    </div>
  );
}
