"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type SourceKey = "NATURE" | "SCIENCE" | "APS";

type SciItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceKey: SourceKey;
};

type ApiResponse = {
  ok: boolean;
  updatedAt: string;
  items: SciItem[];
  error?: string;
};

const SOURCE_LABEL: Record<SourceKey, string> = {
  NATURE: "Nature",
  SCIENCE: "Science",
  APS: "APS (PRL)",
};

export default function ScienceHome({ mode = "page" }: { mode?: "home" | "page" }) {
  const [active, setActive] = useState<SourceKey>("NATURE");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/science?src=${active}`, { cache: "no-store" });
        const json: ApiResponse = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setData({ ok: false, updatedAt: "", items: [], error: "Fetch failed" });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [active]);

  const items = useMemo(() => {
    const list = data?.items ?? [];
    return list.slice(0, mode === "home" ? 5 : 10);
  }, [data, mode]);

  const updated = data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : "—";

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (mode === "home") {
      return (
        <section className="home-card">
          <div className="home-card-head">
            <h2 className="home-card-title">Science</h2>
            <span className="home-card-meta">Updated: {updated}</span>
          </div>
          <p className="home-card-sub">Major journals, distilled.</p>
          {children}
          <Link className="home-card-link" href="/science">
            Open Science →
          </Link>
        </section>
      );
    }

    return (
      <section className="tech-panel">
        <div className="tech-head">
          <div className="tech-head-left">
            <h2 className="tech-title">Latest Posts</h2>
            <p className="tech-sub">Select a source. Titles + short structural summaries.</p>
          </div>
          <div className="tech-head-right">
            <span className="tech-updated">Updated: {updated}</span>
          </div>
        </div>
        {children}
      </section>
    );
  };

  return (
    <Wrapper>
      {/* Source tabs */}
      <div className="tech-tabs">
        {(["NATURE", "SCIENCE", "APS"] as SourceKey[]).map((k) => (
          <button
            key={k}
            type="button"
            className={`tech-tab ${active === k ? "active" : ""}`}
            onClick={() => setActive(k)}
          >
            <span className="tech-tab-k">•</span>
            <span className="tech-tab-t">{SOURCE_LABEL[k]}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="tech-list-wrap">
        {loading ? <div className="tech-empty">Loading…</div> : null}
        {!loading && data?.ok === false ? (
          <div className="tech-empty">Could not load now.</div>
        ) : null}

        <ul className="tech-list">
          {items.map((it) => (
            <li key={it.id} className="tech-item">
              <div className="tech-item-top">
                <span className="tech-source">{it.source}</span>
                <span className="tech-cat">{SOURCE_LABEL[it.sourceKey]}</span>
              </div>

              <a className="tech-link" href={it.url} target="_blank" rel="noreferrer">
                <span className="tech-title2">{it.title}</span>
                <span className="tech-arrow">↗</span>
              </a>

              <p className="tech-summary">{it.summary}</p>
            </li>
          ))}
        </ul>

        {!loading && items.length === 0 ? <div className="tech-empty">No items.</div> : null}
      </div>
    </Wrapper>
  );
}