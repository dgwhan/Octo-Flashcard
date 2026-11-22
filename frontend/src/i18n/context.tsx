"use client";

import React, { createContext, useContext, useEffect, useCallback, useMemo, useSyncExternalStore } from "react";
import { Locale, TranslationSchema } from "./types";
import { vi } from "./locales/vi";
import { en } from "./locales/en";

interface I18nContextValue {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const dictionaries: Record<Locale, TranslationSchema> = {
  vi,
  en,
};

const STORAGE_KEY = "octo_locale";
const DEFAULT_LOCALE: Locale = "vi";
const LOCALE_EVENT = "octo-locale-change";

const subscribeLocale = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(LOCALE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(LOCALE_EVENT, cb);
  };
};

/** Saved choice, else the browser language. The server renders DEFAULT_LOCALE. */
function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "vi" || saved === "en") return saved;
  } catch {
    // localStorage disabled: fall back to the browser language
  }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "vi";
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

function getNestedValue(obj: Record<string, unknown>, path: string): string | null {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return null;
    }
  }

  return typeof current === "string" ? current : null;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => DEFAULT_LOCALE);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // shortcut: with storage blocked the choice cannot be kept, so the locale stays on the browser language
    }
    window.dispatchEvent(new Event(LOCALE_EVENT));
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = dictionaries[locale] as unknown as Record<string, unknown>;
      const fallbackDict = dictionaries.vi as unknown as Record<string, unknown>;

      let text = getNestedValue(activeDict, key) ?? getNestedValue(fallbackDict, key) ?? key;

      if (params && typeof text === "string") {
        Object.entries(params).forEach(([placeholder, value]) => {
          text = text.replace(new RegExp(`\\{${placeholder}\\}`, "g"), String(value));
        });
      }

      return text;
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
