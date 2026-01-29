"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Cat = "A" | "B" | "C" | "D" | "E" | "F";

type TechItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: Cat;
};

type ApiResponse = {
  ok: boolean;
  updatedAt: string;
  items: TechItem[];
  error?: string;
};

const CATEGORY_LABEL: Record<Cat, string> = {
  A: "Institutions × Technology",
  B: "AI & Computational Boundaries",
  C: "Semiconductors & Infrastructure",
  D: "Quantum Systems",
  E: "Energy & Planetary Infrastructure",
  F: "Biological Irreversibility",
};

const CATEGORY_HINT: Record<Cat, string> = {
  A: "Where technology overtakes institutions.",
  B: "Where human judgment becomes unnecessary—or impossible.",
  C: "Where physical supply constraints become irreversible.",
  D: "Signals of transition from control to structure.",
  E: "Designed for the assumption that humans cannot stop it.",
  F: "Life manipulation that cannot be undone.",
};

export default function TechnologyHome({ mode = "page" }: { mode?: "home" | "page" }) {
  const [active, setActive] = useState<Cat>("A");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/technology?cat=${active}`, { cache: "no-store" });
        const json: ApiResponse = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) {
          setData({
            ok: false,
            updatedAt: "",
            items: [],
            error: "Fetch failed",
          });
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
    // HOMEは最大5件、専用ページは最大10件
    return list.slice(0, mode === "home" ? 5 : 10);
  }, [data, mode]);

  const updated = data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : "—";

  // HOMEカード用の外枠（他カードと同じ見た目）
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (mode === "home") {
      return (
        <section className="home-card">
          <div className="home-card-head">
            <h2 className="home-card-title">Technology</h2>
            <span className="home-card-meta">Updated: {updated}</span>
          </div>
          <p className="home-card-sub">Signals where options disappear.</p>
          {children}
          <Link className="home-card-link" href="/technology">
            Open Technology →
          </Link>
        </section>
      );
    }

    // 専用ページ
    return (
      <section className="tech-panel">
        <div className="tech-head">
          <div className="tech-head-left">
            <h2 className="tech-title">Latest Signals</h2>
            <p className="tech-sub">{CATEGORY_HINT[active]}</p>
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
      {/* Tabs */}
      <div className="tech-tabs">
        {(["A", "B", "C", "D", "E", "F"] as Cat[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`tech-tab ${active === key ? "active" : ""}`}
            onClick={() => setActive(key)}
          >
            <span className="tech-tab-k">{"①②③④⑤⑥"[["A","B","C","D","E","F"].indexOf(key)]}</span>
            <span className="tech-tab-t">{CATEGORY_LABEL[key]}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="tech-list-wrap">
        {loading ? (
          <div className="tech-empty">Loading…</div>
        ) : !data?.ok ? (
          <div className="tech-empty">
            Could not load now. (Fallback list is shown if available.)
          </div>
        ) : null}

        <ul className="tech-list">
          {items.map((it) => (
            <li key={it.id} className="tech-item">
              <div className="tech-item-top">
                <span className="tech-source">{it.source}</span>
                <span className="tech-cat">{CATEGORY_LABEL[it.category]}</span>
              </div>

              <a className="tech-link" href={it.url} target="_blank" rel="noreferrer">
                <span className="tech-title2">{it.title}</span>
                <span className="tech-arrow">↗</span>
              </a>

              <p className="tech-summary">{it.summary}</p>
            </li>
          ))}
        </ul>

        {items.length === 0 && !loading && <div className="tech-empty">No items.</div>}
      </div>
    </Wrapper>
  );
}