"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  title: string;
  summary: string;
  url: string;
  source?: string;
  published?: string;
};

type Category = {
  key: string;
  label: string;
  items: Item[];
};

export default function TechnologyPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [activeKey, setActiveKey] = useState<string>(""); // ← keyで管理
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/technology", { cache: "no-store" });
        const data = await res.json();

        const categories: Category[] = data?.categories ?? [];
        if (cancelled) return;

        setCats(categories);
        setActiveKey(categories?.[0]?.key ?? "");
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const active = useMemo(() => {
    return cats.find((c) => c.key === activeKey) ?? null;
  }, [cats, activeKey]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Technology</h1>
        <p className="page-lead">
          Signals where technology overtakes institutions, incentives, and reversible control.
        </p>
      </div>

      {/* Tabs */}
      <div className="tech-tabs">
        {cats.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`tech-tab ${c.key === activeKey ? "active" : ""}`}
            onClick={() => setActiveKey(c.key)}  // ← keyで切替
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <section className="glass-block">
        {loading ? (
          <p className="text">Loading latest technology signals…</p>
        ) : !active ? (
          <p className="text dim">No items available right now.</p>
        ) : active.items?.length ? (
          <div className="feed-list">
            {active.items.map((it, idx) => (
              <article key={it.url ?? idx} className="feed-item">
                <a className="feed-title" href={it.url} target="_blank" rel="noreferrer">
                  {it.title}
                </a>
                <p className="feed-summary">{it.summary}</p>
                <div className="feed-meta">
                  <span>{it.source ?? ""}</span>
                  <span>{it.published ? `Updated: ${it.published}` : ""}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text dim">No items available right now (feed may require URL update).</p>
        )}
      </section>

      <div className="page-foot">
        <a className="back-link" href="/">← Back</a>
      </div>
    </main>
  );
}