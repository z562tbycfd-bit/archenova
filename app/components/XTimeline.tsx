"use client";

import { useEffect, useState } from "react";

type XItem = {
  title: string;
  url: string;
};

export default function XTimeline() {
  const [items, setItems] = useState<XItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/x?limit=5", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.items) setItems(data.items);
      } finally {
        setLoading(false);
      }
    };
    run();
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
        {loading && <p className="x-compact-text">Loading…</p>}

        {!loading && items.length === 0 && (
          <p className="x-compact-text">No recent posts available.</p>
        )}

        {items.map((it) => (
          <a
            key={it.url}
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="x-compact-item"
          >
            {it.title}
          </a>
        ))}
      </div>
    </section>
  );
}