"use client";

import { useEffect, useState } from "react";

type SignalItem = {
  id: string;
  title: string;
  source: string;
  originalUrl: string;
  category: string;
  observation: string;
  implication: string;
  commentary: string;
  ts: number;
};

export default function ArcheNovaSignalsFeed({ limit = 30 }: { limit?: number }) {
  const [items, setItems] = useState<SignalItem[]>([]);
  const [updated, setUpdated] = useState("—");

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const res = await fetch("/data/signals.json", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!cancel && data?.ok) {
          setItems((data.items || []).slice(0, limit));
          setUpdated(data.updated ? new Date(data.updated).toLocaleString() : "—");
        }
      } catch {
        if (!cancel) {
          setItems([]);
          setUpdated("—");
        }
      }
    }

    load();

    return () => {
      cancel = true;
    };
  }, [limit]);

  return (
    <section className="glass-block">
      <div className="home-card-head">
        <h2>ArcheNova Signal Feed</h2>
        <span className="home-card-meta">Updated: {updated}</span>
      </div>

      <div className="feed-list">
        {items.length ? (
          items.map((item) => (
            <a
              key={item.id}
              href={item.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="feed-row wide"
            >
              <div className="feed-source">
                {item.category} / {item.source}
              </div>

              <div className="feed-title">
                {item.title}
              </div>

              <div className="feed-summary">
                {item.commentary}
              </div>
            </a>
          ))
        ) : (
          <div className="feed-empty">
            No ArcheNova signals available right now.
          </div>
        )}
      </div>
    </section>
  );
}