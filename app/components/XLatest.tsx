"use client";

import { LATEST_TWEET } from "../config/latestTweet";

export default function XLatest() {
  return (
    <section className="x-latest-card">
      <div className="x-latest-head">
        <h2 className="x-latest-title">Latest Irreversible Move</h2>
        <a
          className="x-latest-open"
          href={LATEST_TWEET.url}
          target="_blank"
          rel="noreferrer"
        >
          Open →
        </a>
      </div>

      <div className="x-latest-body">
        <div className="x-latest-tags">
          {LATEST_TWEET.tags.map((t) => (
            <span key={t} className="x-latest-tag">
              {t}
            </span>
          ))}
        </div>

        <p className="x-latest-text">
          {LATEST_TWEET.description}
        </p>
      </div>

      <div className="x-latest-foot">
        <a
          href="https://x.com/ArcheNova_X"
          target="_blank"
          rel="noreferrer"
        >
          View @ArcheNova_X →
        </a>
      </div>
    </section>
  );
}