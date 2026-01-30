"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  title: string;
  summary: string;
  url: string;
  source?: string;
  published?: string;
};

export default function TechnologyHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/technology", { cache: "no-store" });
        const data = await res.json();

        // APIが categories を返す前提：全カテゴリを時系列に混ぜて上位5件
        const cats = data?.categories ?? [];
        const merged: Item[] = cats.flatMap((c: any) => c.items ?? []);

        if (!cancelled) setItems(merged.slice(0, 5));
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

  return (
    <section className="home-card">
      <div className="home-card-head">
        <h3 className="home-card-title">Technology</h3>
        <Link className="home-card-more" href="/technology">
          Open →
        </Link>
      </div>

      {loading ? (
        <p className="home-card-text">Loading latest technology signals…</p>
      ) : items.length ? (
        <div className="home-feed">
          {items.map((it) => (
            <a key={it.url} className="home-feed-item" href={it.url} target="_blank" rel="noreferrer">
              <div className="home-feed-title">{it.title}</div>
              <div className="home-feed-summary">{it.summary}</div>
              <div className="home-feed-meta">
                {it.source ? <span>{it.source}</span> : <span />}
                {it.published ? <span>Updated: {it.published}</span> : <span />}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="home-card-text dim">No items available right now (feed may require URL update).</p>
      )}
    </section>
  );
}