"use client";

import { useEffect, useMemo, useState } from "react";

type XItem = {
  title: string;
  description: string;
  link: string;
  source: string;
  pubDate: string;
};

export default function XLatest() {
  const [items, setItems] = useState<XItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/x?limit=5", { cache: "no-store" });
        const data = await res.json();

        const arr: XItem[] = Array.isArray(data?.items) ? data.items : [];
        if (!cancelled) setItems(arr);
      } catch {
        // ここに来ても API側がフォールバック返す想定だが念のため
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

  const head = items?.[0];

  const rest = useMemo(() => (items || []).slice(1, 5), [items]);

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
          Open →
        </a>
      </div>

      <div className="x-compact-card">
        <span className="x-compact-reflection" aria-hidden="true" />

        {loading ? (
          <p className="x-compact-text">Loading…</p>
        ) : head ? (
          <>
            <div className="x-compact-meta">
              <span className="x-compact-source">{head.source || "X"}</span>
              <span className="x-compact-dot">•</span>
              <span className="x-compact-time">
                {head.pubDate ? new Date(head.pubDate).toLocaleString() : ""}
              </span>
            </div>

            <a
              className="x-compact-feature"
              href={head.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="x-compact-feature-title">{head.title}</div>
              <div className="x-compact-feature-desc">{head.description}</div>
            </a>

            {rest.length > 0 && (
              <div className="x-compact-list">
                {rest.map((it, idx) => (
                  <a
                    key={idx}
                    className="x-compact-item"
                    href={it.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="x-compact-item-title">{it.title}</div>
                    <div className="x-compact-item-desc">{it.description}</div>
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="x-compact-text">
            Feed is currently unavailable. Open X to view the latest posts →
          </p>
        )}

        <div className="x-compact-foot">
          <a
            className="x-compact-link"
            href="https://x.com/ArcheNova_X"
            target="_blank"
            rel="noreferrer"
          >
            View on X →
          </a>
        </div>
      </div>
    </section>
  );
}