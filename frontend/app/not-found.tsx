import Link from "next/link";
import { SuckerRow } from "@/src/components/ui";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <SuckerRow count={8} />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Xúc tu này không chạm tới trang nào.</h1>
      <p className={styles.lead}>Đường dẫn có thể đã đổi hoặc bị gõ sai. Thử quay về một trong 8 module.</p>
      <Link href="/" className={styles.link}>
        Về trang chủ
      </Link>
    </main>
  );
}
