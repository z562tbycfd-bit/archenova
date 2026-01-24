"use client";

const LATEST_TWEET_URL = "https://x.com/ArcheNova_X/status/2012537819747786821"; // ←ここだけ差し替え

export default function XTimeline() {
  const src =
    "https://twitframe.com/show?url=" + encodeURIComponent(LATEST_TWEET_URL);

  return (
    <section className="x-timeline">
      <div className="x-head">
        <h2 className="x-title">Latest from X</h2>
        <a className="x-more" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
          View on X →
        </a>
      </div>

      <div className="x-frame x-frame--single" aria-label="Latest post from ArcheNova_X">
        <iframe
          src={src}
          title="ArcheNova_X latest post"
          width="100%"
          height="360"
          frameBorder="0"
          scrolling="no"
          allowTransparency
        />
      </div>
    </section>
  );
}
