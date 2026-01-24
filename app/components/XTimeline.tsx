"use client";

export default function XTimeline() {
  return (
    <section className="x-timeline">
      <div className="x-head">
        <h2 className="x-title">Latest from X</h2>
        <a className="x-more" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
          View on X →
        </a>
      </div>

      {/* 最新1件が見える高さに固定（上だけ見せる） */}
      <div className="x-frame x-frame--single" aria-label="Latest post from ArcheNova_X">
        <iframe
          src="https://twitframe.com/show?url=https://x.com/ArcheNova_X"
          title="ArcheNova_X latest post"
          width="100%"
          height="320"
          frameBorder="0"
          scrolling="no"
          allowTransparency
        />
      </div>

      <p className="x-note">
        The feed is intentionally constrained to a single post—what matters is the latest irreversible move.
      </p>
    </section>
  );
}
