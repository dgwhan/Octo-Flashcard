"use client";

import React, { useState, useEffect, useEffectEvent, useMemo, useSyncExternalStore } from "react";
import { AlertCircle } from "lucide-react";
import { dictionaryApi } from "../api/dictionary.api";
import { DictionaryEntry } from "../types";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import EntryCard from "../components/EntryCard";

const HISTORY_KEY = "_octo_dict_history";
const SPEED_KEY = "_octo_dict_speed";
const STORAGE_EVENT = "octo-dict-storage";

// History and speed live in localStorage; read them through useSyncExternalStore so the server render
// (no storage) and other open tabs stay consistent without copying them into state in an effect.
const subscribeStorage = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(STORAGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(STORAGE_EVENT, cb);
  };
};
const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
// shortcut: if storage is blocked, a new speed or history entry is not kept even for this page view
const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

interface DictionaryViewProps {
  initialWord?: string;
  onSelectWord?: (word: string) => void;
  isCompact?: boolean;
}

export default function DictionaryPage({
  initialWord = "",
  onSelectWord,
  isCompact = false,
}: DictionaryViewProps) {
  const [searchTerm, setSearchTerm] = useState(initialWord);
  // The lookup in flight (id changes on every search, so searching the same word again retries) and its result
  const [request, setRequest] = useState<{ word: string; id: number } | null>(() =>
    initialWord.trim() ? { word: initialWord.trim(), id: 1 } : null
  );
  const [result, setResult] = useState<{ id: number; entries?: DictionaryEntry[]; error?: string } | null>(null);
  const current = request && result?.id === request.id ? result : null;
  const loading = !!request && !current;
  const entries = current?.entries ?? null;
  const error = current?.error ?? null;
  const historyRaw = useSyncExternalStore(subscribeStorage, () => readStorage(HISTORY_KEY), () => null);
  const history = useMemo<string[]>(() => {
    try {
      const parsed = JSON.parse(historyRaw ?? "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [historyRaw]);
  const speedRaw = useSyncExternalStore(subscribeStorage, () => readStorage(SPEED_KEY), () => null);
  const voiceSpeed = parseFloat(speedRaw ?? "") > 0 ? parseFloat(speedRaw ?? "") : 1.0;

  const handleSpeedChange = (newSpeed: number) => writeStorage(SPEED_KEY, String(newSpeed));

  const saveToHistory = (word: string) => {
    const updated = [word, ...history.filter((w) => w.toLowerCase() !== word.toLowerCase())].slice(0, 8);
    writeStorage(HISTORY_KEY, JSON.stringify(updated));
  };

  const handleSearch = (wordToSearch?: string) => {
    const word = (wordToSearch ?? searchTerm).trim();
    if (word) setRequest((r) => ({ word, id: (r?.id ?? 0) + 1 }));
  };

  // A new initialWord (QuickLookupModal reuses this view) fills the box and starts a lookup
  const [prevInitialWord, setPrevInitialWord] = useState(initialWord);
  if (initialWord !== prevInitialWord) {
    setPrevInitialWord(initialWord);
    if (initialWord) {
      setSearchTerm(initialWord);
      handleSearch(initialWord);
    }
  }

  const onFound = useEffectEvent((word: string) => {
    saveToHistory(word);
    onSelectWord?.(word);
  });
  useEffect(() => {
    if (!request) return;
    let live = true;
    dictionaryApi.lookup(request.word).then(
      (found) => {
        if (!live) return;
        setResult({ id: request.id, entries: found });
        onFound(request.word);
      },
      (err) => {
        if (live)
          setResult({
            id: request.id,
            error: err instanceof Error ? err.message : "Không thể tra cứu từ điển lúc này. Vui lòng thử lại.",
          });
      }
    );
    return () => {
      live = false;
    };
  }, [request]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      {/* Search Input Bar */}
      <SearchBar
        value={searchTerm}
        loading={loading}
        onChange={setSearchTerm}
        onKeyDown={handleKeyDown}
        onSearch={() => handleSearch()}
        onClear={() => {
          setSearchTerm("");
          setRequest(null);
        }}
      />

      {/* Suggested Words & History */}
      {!entries && !loading && (
        <SearchHistory
          history={history}
          onPick={(w) => {
            setSearchTerm(w);
            handleSearch(w);
          }}
        />
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "var(--color-danger-light)",
            border: "1px solid var(--color-danger-border)",
            color: "var(--color-danger)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.925rem",
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {entries && entries.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {entries.map((entry, eIdx) => (
              <EntryCard
                key={eIdx}
                entry={entry}
                isCompact={isCompact}
                voiceSpeed={voiceSpeed}
                onSpeed={handleSpeedChange}
                onLookup={(w) => {
                  setSearchTerm(w);
                  handleSearch(w);
                }}
              />
          ))}
        </div>
      )}
    </div>
  );
}
