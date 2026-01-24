"use client";

import { useEffect, useMemo, useState } from "react";

type Latest = {
  url: string;
  text: string;
};

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function clampTextByChars(text: string, maxChars: number) {
  if (text.length <= maxChars) return { clamped: text, wasClamped: false };
  const sliced = text.slice(0, maxChars).replace(/\s+\S*$/, ""); // 単語途中で切らない
  return { clamped: sliced + "…", wasClamped: true };
}

export default function XTimeline() {
  const [latest, setLatest] = useState<Latest | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const endpoint =
          "https://cdn.syndication.twimg.com/widgets/timelines/profile?screen_name=ArcheNova_X&lang=en";

        const res = await fetch(endpoint, {
          headers: {
            "User-Agent": "Mozilla/5.0",
            Accept: "application/json,text/plain,*/*",
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const body: string = data?.body ?? "";
        if (!body) return;

        const m =
          body.match(/https:\/\/x\.com\/ArcheNova_X\/status\/\d+/) ??
          body.match(/https:\/\/twitter\.com\/ArcheNova_X\/status\/\d+/);

        const url = m?.[0];
        if (!url) return;

        const p = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        const text = stripHtml(p?.[0] ?? "");

        if (!cancelled) {
          setLatest({
            url,
            text: text || "Open the latest post on X →",
          });
        }
      } catch {
        // 失敗しても落とさない
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // 文字数ベースで省略（行数だけだと環境差で崩れやすいので）
  const maxChars = 260;
  const view = useMemo(() => {
    if (!latest?.text) return { text: "", wasClamped: false };
    if (expanded) return { text: latest.text, wasClamped: latest.text.length > maxChars };
    return clampTextByChars(latest.text, maxChars);
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
            <p className={`x-text ${expanded ? "is-expanded" : ""}`}>{view.text}</p>

            <div className="x-actions">
              {view.wasClamped && (
                <button
                  type="button"
                  className="x-toggle"
                  onClick={() => setExpanded((v) => !v)}
                >
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
