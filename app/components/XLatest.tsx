"use client";

import { useEffect, useState } from "react";

type XItem = {
  url: string;
  text: string;
};

function clamp(text: string, max = 220) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function XLatest() {
  const [items, setItems] = useState<XItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/x?limit=5", { cache: "no-store" });
        const data = await res.json();

        if (!cancelled && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="x-latest x-compact">
      <div className="x-compact-head">
        <h2 className="x-compact-title">Latest Irreversible Move</h2>
        <a
          className="x-compact-cta"
          href="https://x.com/ArcheNova_X"
          target="_blank"
          rel="noreferrer"
        >
          View on X →
        </a>
      </div>

      <div className="x-compact-card">
        <span className="x-compact-reflection" aria-hidden="true" />

        {loading ? (
          <p className="x-compact-text">Loading latest posts…</p>
        ) : items.length === 0 ? (
          <p className="x-compact-text">No recent posts available.</p>
        ) : (
          <>
            {/* 最新1件 */}
            <a
              className="x-compact-feature"
              href={items[0].url}
              target="_blank"
              rel="noreferrer"
            >
              {clamp(items[0].text)}
            </a>

            {/* 残り4件 */}
            <div className="x-compact-list">
              {items.slice(1).map((it) => (
                <a
                  key={it.url}
                  className="x-compact-item"
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {clamp(it.text, 120)}
                  <span className="x-compact-item-arrow">↗</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}