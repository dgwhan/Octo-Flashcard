"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { useUserSettings } from "@/src/lib/userSettings";
import styles from "../settings.module.css";

/** Shown where an AI feature needs the user's Gemini key; renders nothing once a key is saved. */
export default function AiKeyNotice({ feature }: { feature: string }) {
  const { status, settings } = useUserSettings();
  if (status === "loading" || settings.hasGeminiKey) return null;

  const signedOut = status === "anonymous";
  return (
    <p className={styles.notice}>
      <KeyRound size={16} aria-hidden="true" />
      <span>
        {feature} dùng API key Gemini của bạn.{" "}
        {signedOut ? (
          <>
            <Link href={`${ROUTES.AUTH.LOGIN}?redirect=${ROUTES.SETTINGS}`} className={styles.linkBtn}>
              Đăng nhập
            </Link>{" "}
            rồi thêm key trong Cài đặt.
          </>
        ) : (
          <>
            Thêm key trong{" "}
            <Link href={ROUTES.SETTINGS} className={styles.linkBtn}>
              Cài đặt
            </Link>{" "}
            (miễn phí, lưu mã hoá theo tài khoản).
          </>
        )}
      </span>
    </p>
  );
}
