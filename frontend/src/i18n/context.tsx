"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
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
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (savedLocale && (savedLocale === "vi" || savedLocale === "en")) {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      } else {
        const browserLang = navigator.language?.toLowerCase() || "";
        const detectedLocale: Locale = browserLang.startsWith("en") ? "en" : "vi";
        setLocaleState(detectedLocale);
        document.documentElement.lang = detectedLocale;
      }
    } catch {
      // Fallback in case localStorage is disabled
    }
    setIsInitialized(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore storage errors
    }
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
