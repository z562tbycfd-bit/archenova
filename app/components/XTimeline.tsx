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
      <div className="x-head-left">
        <h2 className="x-title">LATEST IRREVERSIBLE MOVE</h2>
        <div className="x-tags">
          <span className="x-tag">BOUNDARY</span>
          <span className="x-tag">INITIAL CONDITIONS</span>
          <span className="x-tag">NO OPTIMIZATION</span>
        </div>
      </div>

      <a
        className="x-more"
        href="https://x.com/ArcheNova_X"
        target="_blank"
        rel="noreferrer"
      >
        View on X →
      </a>
    </div>

    <div className="x-card x-card-arche">
      {/* ここは今の表示ロジックのままでOK */}
      {/* latest がある/ない の表示をそのまま置いてください */}
    </div>
  </section>
);
}
