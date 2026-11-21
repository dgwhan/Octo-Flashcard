"use client";

const POPULAR_WORDS = [
  "resilience",
  "perseverance",
  "eloquent",
  "epiphany",
  "serendipity",
  "innovative",
  "meticulous",
  "pragmatic",
];

interface SearchHistoryProps {
  history: string[];
  onPick: (word: string) => void;
}

/** Recent searches and suggested words, shown before the first search. */
export default function SearchHistory({ history, onPick }: SearchHistoryProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {history.length > 0 && (
        <div>
          <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
            Lịch sử tra cứu gần đây:
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {history.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  onPick(w);
                }}
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-primary-ring)",
                  borderRadius: "8px",
                  padding: "5px 12px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
          Từ vựng gợi ý tra nhanh:
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {POPULAR_WORDS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => {
                onPick(w);
              }}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                borderRadius: "8px",
                padding: "5px 12px",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
