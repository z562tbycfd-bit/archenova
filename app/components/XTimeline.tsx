"use client";

import { useMemo, useState } from "react";
import { LATEST_TWEET_URL } from "../config/latestTweet";

function clampByChars(input: string, maxChars: number) {
  if (!input) return { clamped: "", wasClamped: false };
  if (input.length <= maxChars) return { clamped: input, wasClamped: false };
  const sliced = input.slice(0, maxChars).replace(/\s+\S*$/, "");
  return { clamped: sliced + "…", wasClamped: true };
}

export default function XTimeline() {
  // API取得できないので、最新URL固定で「1件強調」に振り切る
  const [expanded, setExpanded] = useState(false);

  // 表示は「リンク中心」でも成立するようにする（テキストは任意）
  const fullText =
    "Featured post (update this link to reflect the latest irreversible move).";

  const MAX = 260;
  const display = useMemo(() => {
    if (expanded) return { textToShow: fullText, wasClamped: fullText.length > MAX };
    const r = clampByChars(fullText, MAX);
    return { textToShow: r.clamped, wasClamped: r.wasClamped };
  }, [expanded]);

  return (
    <section className="x-latest">
      <div className="x-head">
        <h2 className="x-title">Latest from X</h2>
        <a className="x-more" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
          View on X →
        </a>
      </div>

      <div className="x-card">
        <p className="x-text">{display.textToShow}</p>

        <div className="x-actions">
          {display.wasClamped && (
            <button type="button" className="x-toggle" onClick={() => setExpanded(v => !v)}>
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          <a className="x-link" href={LATEST_TWEET_URL} target="_blank" rel="noreferrer">
            Open the post →
          </a>
        </div>
      </div>
    </section>
  );
}
