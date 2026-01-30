"use client";
import { useEffect, useState } from "react";

type Item = { source: string; title: string; url: string; summary: string; ts: number };

export default function TechnologyHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [updated, setUpdated] = useState<string>("—");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const r = await fetch("/api/technology", { cache: "no-store" });
        const j = await r.json();
        if (!j?.ok || cancel) return;
        setItems((j.items ?? []).slice(0, 5));
        setUpdated(j.updated ? new Date(j.updated).toLocaleString() : "—");
      } catch {}
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <section className="home-card">
      <div className="home-card-head">
        <h3 className="home-card-title">Technology</h3>
        <span className="home-card-meta">Updated: {updated}</span>
      </div>

      <div className="feed-scroll" aria-label="Latest technology posts">
        {items.length ? items.map((it, i) => (
          <a key={i} className="feed-row" href={it.url} target="_blank" rel="noreferrer">
            <div className="feed-source">{it.source}</div>
            <div className="feed-title">{it.title}</div>
            <div className="feed-summary">{it.summary}</div>
          </a>
        )) : (
          <div className="feed-empty">Loading latest technology signals…</div>
        )}
      </div>

      <div className="home-card-foot">
        <a className="mini-link" href="/technology">Open Technology →</a>
      </div>
    </section>
  );
}