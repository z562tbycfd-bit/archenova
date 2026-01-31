// app/components/GateFragments.tsx
"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  text: string;
  createdAt: string;
};

export default function GateFragments({ limit = 5 }: { limit?: number }) {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/gate?limit=${limit}`, { cache: "no-store" });
        if (!res.ok) throw new Error("bad");
        const data = await res.json();
        if (!cancelled) setItems(data.items ?? []);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return (
    <section className="gate-fragments">
      <div className="x-head">
        <h2 className="x-title">Recent Crossings</h2>
        <a className="x-more" href="/gate">
          Enter Gate →
        </a>
      </div>

      <div className="x-card">
        {items === null ? (
          <p className="x-text">Loading fragments…</p>
        ) : items.length === 0 ? (
          <p className="x-text">No fragments yet. Be the first to cross.</p>
        ) : (
          <ul className="frag-list">
            {items.map((it) => (
              <li key={it.id} className="frag-item">
                <span className="frag-dot" aria-hidden="true" />
                <span className="frag-text">{it.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}