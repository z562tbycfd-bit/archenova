"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  source: "Nature" | "Science" | "APS(PRL)";
  title: string;
  url: string;
  date?: string;     // YYYY-MM-DD
  summary?: string;  // short snippet
};

function clamp(input: string, max = 160) {
  const s = (input || "").trim();
  if (!s) return "";
  if (s.length <= max) return s;
  return s.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function ScienceTechHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/science-tech", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data?.items) throw new Error("bad");

        if (!cancelled) {
          setItems(data.items);
          setIdx(0);
        }
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const current = useMemo(() => items[idx], [items, idx]);

  const prev = () => setIdx((v) => (items.length ? (v - 1 + items.length) % items.length : 0));
  const next = () => setIdx((v) => (items.length ? (v + 1) % items.length : 0));

  return (
    <div className="home-card home-scitech" role="region" aria-label="Science & Tech">
      <div className="home-card-head">
        <div className="home-card-title">Science & Tech</div>
        <a className="home-card-link" href="/science-tech">
          Open →
        </a>
      </div>

      {loading ? (
        <div className="home-card-body">
          <div className="home-scitech-meta dim">Loading latest signals…</div>
        </div>
      ) : items.length === 0 ? (
        <div className="home-card-body">
          <div className="home-scitech-meta dim">No feed available right now.</div>
          <div className="home-scitech-actions">
            <a className="home-scitech-open" href="/science-tech">
              View the page →
            </a>
          </div>
        </div>
      ) : (
        <div className="home-card-body">
          <div className="home-scitech-meta">
            <span className="tag">{current?.source}</span>
            {current?.date ? <span className="date">{current.date}</span> : null}
          </div>

          <a className="home-scitech-title" href={current.url} target="_blank" rel="noreferrer">
            {current.title}
          </a>

          <div className="home-scitech-summary">
            {clamp(current.summary || "", 220) || "Open to read the latest update →"}
          </div>

          <div className="home-scitech-actions">
            <button type="button" className="home-scitech-btn" onClick={prev}>
              ←
            </button>

            <div className="home-scitech-dots" aria-label="Slide selector">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`dot ${i === idx ? "on" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Item ${i + 1}`}
                />
              ))}
            </div>

            <button type="button" className="home-scitech-btn" onClick={next}>
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}