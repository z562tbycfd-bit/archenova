"use client";

import { LATEST_TWEET } from "../config/latestTweet";

export default function XTimeline() {
  return (
    <section className="x-latest x-compact">
      <div className="x-compact-head">
        <h2 className="x-compact-title">Latest Irreversible Move</h2>
        <a
          className="x-compact-cta"
          href={LATEST_TWEET.url}
          target="_blank"
          rel="noreferrer"
        >
          Open →
        </a>
      </div>

      <div className="x-compact-card">
        {/* 反射（スクロールで動く前提：--scroll-p を利用） */}
        <span className="x-compact-reflection" aria-hidden="true" />

        {/* タグ */}
        <div className="x-compact-tags">
          {LATEST_TWEET.tags.map((t) => (
            <span key={t} className="x-compact-tag">
              {t}
            </span>
          ))}
        </div>

        {/* 本文（1回だけ） */}
        <p className="x-compact-text">{LATEST_TWEET.description}</p>

        {/* 下部リンク */}
        <div className="x-compact-foot">
          <a
            className="x-compact-link"
            href="https://x.com/ArcheNova_X"
            target="_blank"
            rel="noreferrer"
          >
            View on X →
          </a>

          <a
            className="x-compact-link"
            href={LATEST_TWEET.url}
            target="_blank"
            rel="noreferrer"
          >
            Open the post →
          </a>
        </div>
      </div>
    </section>
  );
}
