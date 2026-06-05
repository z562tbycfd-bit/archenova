// app/components/GateFragments.tsx
"use client";

import Link from "next/link";

const crossings = [
  {
    category: "Science",
    text: "Quantum error correction is becoming engineering.",
    author: "Observer #472",
    likes: 12,
    reposts: 3,
    replies: 5,
  },
  {
    category: "Technology",
    text: "Physical AI is entering deployment phase.",
    author: "Builder #118",
    likes: 24,
    reposts: 8,
    replies: 9,
  },
  {
    category: "Civilization",
    text: "Fusion increases strategic autonomy.",
    author: "Architect #221",
    likes: 41,
    reposts: 12,
    replies: 18,
  },
];

export default function GateFragments() {
  return (
    <section className="gate-fragments">
      <div className="x-card crossings-card">
        <div className="crossings-title">Today&apos;s Crossings</div>

        <div className="crossings-feed">
          {crossings.map((item) => (
            <article key={item.text} className="crossing-post">
              <div className="crossing-category">[{item.category}]</div>

              <p className="crossing-text">{item.text}</p>

              <div className="crossing-author">{item.author}</div>

              <div className="crossing-stats">
                ♥ {item.likes} &nbsp; ↺ {item.reposts} &nbsp; 💬 {item.replies}
              </div>
            </article>
          ))}
        </div>

        <div className="crossing-gate-wrap">
          <Link href="/gate" className="crossing-gate-link">
            Enter Gate →
          </Link>
        </div>
      </div>
    </section>
  );
}