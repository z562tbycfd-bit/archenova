"use client";
import { useEffect, useState } from "react";

type Item = { source: string; title: string; url: string; summary: string; ts: number };
type Source = { id: string; name: string };

export default function SciencePage() {
  const [tab, setTab] = useState<string>("nature");
  const [sources, setSources] = useState<Source[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [updated, setUpdated] = useState<string>("—");

  useEffect(() => {
    let cancel = false;
    (async () => {
      const r = await fetch("/api/science?source=" + tab, { cache: "no-store" });
      const j = await r.json();
      if (!j?.ok || cancel) return;
      setSources(j.sources ?? []);
      setItems(j.items ?? []);
      setUpdated(j.updated ? new Date(j.updated).toLocaleString() : "—");
    })();
    return () => { cancel = true; };
  }, [tab]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Science</h1>
        <p className="page-lead">Latest signals from Nature, Science, and APS/PRL — filtered only by recency.</p>
        <p className="page-lead dim">Updated: {updated}</p>
      </div>

      <div className="tabs">
        {sources.map(s => (
          <button
            key={s.id}
            className={`tab ${tab === s.id ? "active" : ""}`}
            onClick={() => setTab(s.id)}
            type="button"
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="feed-list">
        {items.length ? items.map((it, i) => (
          <a key={i} className="feed-row wide" href={it.url} target="_blank" rel="noreferrer">
            <div className="feed-source">{it.source}</div>
            <div className="feed-title">{it.title}</div>
            <div className="feed-summary">{it.summary}</div>
          </a>
        )) : (
          <div className="feed-empty">No items available right now.</div>
        )}
      </div>

      <div className="page-foot">
        <a className="back-link" href="/">← Back</a>
      </div>
    </main>
  );
}