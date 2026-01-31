"use client";

import { useEffect, useState } from "react";

type Item = {
  title: string;
  link: string;
  date: string;
};

export default function XLatest() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/api/x")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="home-card">
      <div className="glass-block">
        <h2>Latest Irreversible Move</h2>

        {items.length === 0 ? (
          <p className="text dim">No recent posts available.</p>
        ) : (
          <ul className="x-list">
            {items.map((it, i) => (
              <li key={i} className="x-item">
                <a href={it.link} target="_blank" rel="noreferrer">
                  {it.title}
                </a>
                <span className="x-date">
                  {new Date(it.date).toUTCString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}