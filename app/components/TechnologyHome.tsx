"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Item = {
  title: string;
  summary?: string;
  url: string;
  source: string;
  group: string;
  ts?: number;
};

type Block = {
  groupTitle: string;
  observation: string;
  items: Item[];
};

export default function TechnologyHome() {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/technology?mode=full", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!data?.ok) return;

        const b: Block[] = Array.isArray(data?.blocks) ? data.blocks : [];
        if (!cancelled) {
          setBlocks(b);
          setActive(0);
        }
      } catch {
        // ignore
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const safeBlocks = blocks ?? [];

  const current = useMemo(() => {
    if (!safeBlocks.length) return null;
    const idx = Math.min(Math.max(active, 0), safeBlocks.length - 1);
    return safeBlocks[idx];
  }, [safeBlocks, active]);

  const items = current?.items?.slice(0, 5) ?? [];

  return (
    <section className="home-card home-tech">
      <div className="home-card-head">
        <div>
          <h3 className="home-card-title">Technology</h3>
          <p className="home-card-sub">— Observing where technology outruns institutions</p>
        </div>

        <Link className="home-card-more" href="/technology">
          Open →
        </Link>
      </div>

      {/* ①〜⑥カテゴリ切替タブ */}
      <div className="tech-tabs" role="tablist" aria-label="Technology categories">
        {safeBlocks.length ? (
          safeBlocks.map((b, i) => (
            <button
              key={b.groupTitle}
              type="button"
              className={`tech-tab ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
            >
              {b.groupTitle}
            </button>
          ))
        ) : (
          <>
            <span className="tech-tab tech-tab-skeleton" />
            <span className="tech-tab tech-tab-skeleton" />
            <span className="tech-tab tech-tab-skeleton" />
          </>
        )}
      </div>

      {/* 観測点 */}
      <div className="tech-observation">
        {current ? (
          <>
            <span className="tech-observation-label">Observation:</span>
            <span className="tech-observation-text">{current.observation}</span>
          </>
        ) : (
          <span className="tech-observation-text">Fetching latest signals…</span>
        )}
      </div>

      {/* 最新5件 */}
      <div className="home-tech-list">
        {items.length ? (
          items.map((it) => (
            <a key={it.url} className="home-tech-item" href={it.url} target="_blank" rel="noreferrer">
              <div className="home-tech-meta">
                <span className="home-tech-source">{it.source}</span>
              </div>
              <div className="home-tech-title">{it.title}</div>
              {it.summary ? <div className="home-tech-summary">{it.summary}</div> : null}
            </a>
          ))
        ) : (
          <div className="home-tech-loading">
            Loading this category…
            <div className="home-tech-loading-sub">If a source blocks access, it falls back gracefully.</div>
          </div>
        )}
      </div>
    </section>
  );
}