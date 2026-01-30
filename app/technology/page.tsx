"use client";
import { useEffect, useState } from "react";

type Item = { source: string; title: string; url: string; summary: string; ts: number };
type Cat = { id: string; name: string };

export default function TechnologyPage() {
  const [tab, setTab] = useState<string>("policy");
  const [cats, setCats] = useState<Cat[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [updated, setUpdated] = useState<string>("—");

  useEffect(() => {
    let cancel = false;
    (async () => {
      const r = await fetch("/api/technology?cat=" + tab, { cache: "no-store" });
      const j = await r.json();
      if (!j?.ok || cancel) return;
      setCats(j.categories ?? []);
      setItems(j.items ?? []);
      setUpdated(j.updated ? new Date(j.updated).toLocaleString() : "—");
    })();
    return () => { cancel = true; };
  }, [tab]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Technology</h1>
        <p className="page-lead">Switch categories. Watch where technology overtakes institutions — in public signals.</p>
        <p className="page-lead dim">Updated: {updated}</p>
      </div>

      <div className="tabs">
        {cats.map(c => (
          <button
            key={c.id}
            className={`tab ${tab === c.id ? "active" : ""}`}
            onClick={() => setTab(c.id)}
            type="button"
          >
            {c.name}
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
          <div className="feed-empty">No items available right now (feed may require URL update).</div>
        )}
      </div>

      <div className="page-foot">
        <a className="back-link" href="/">← Back</a>
      </div>
    </main>
  );
}