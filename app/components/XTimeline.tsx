"use client";

import { useEffect, useMemo, useState } from "react";

type LatestPost = {
  url: string;
  content: string;
};

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function clampByChars(input: string, maxChars: number) {
  if (!input) return { clamped: "", wasClamped: false };
  if (input.length <= maxChars) return { clamped: input, wasClamped: false };
  const sliced = input.slice(0, maxChars).replace(/\s+\S*$/, "");
  return { clamped: sliced + "…", wasClamped: true };
}

export default function XTimeline() {
  const [latest, setLatest] = useState<LatestPost | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
  try {
    const res = await fetch("/api/latest-x");
    if (!res.ok) return;

    const data: any = await res.json();
    if (!data?.ok) return;

    if (!cancelled) {
      setLatest({
        url: data.url,
        content: data.content,
      });
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

  const MAX = 260;

  const display = useMemo(() => {
    const full = latest?.content ?? "";
    if (expanded) return { textToShow: full, wasClamped: full.length > MAX };
    const r = clampByChars(full, MAX);
    return { textToShow: r.clamped, wasClamped: r.wasClamped };
  }, [latest, expanded]);

  return (
    <section className="x-latest">
      <div className="x-head">
        <h2 className="x-title">Latest from X</h2>
        <a className="x-more" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
          View on X →
        </a>
      </div>

      <div className="x-card">
        {latest ? (
          <>
            <p className="x-text">{display.textToShow}</p>

            <div className="x-actions">
              {display.wasClamped && (
                <button type="button" className="x-toggle" onClick={() => setExpanded(v => !v)}>
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}

              <a className="x-link" href={latest.url} target="_blank" rel="noreferrer">
                Open the post →
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="x-text">Loading the latest post…</p>
            <a className="x-link" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
              Open on X →
            </a>
          </>
        )}
      </div>
    </section>
  );
}
