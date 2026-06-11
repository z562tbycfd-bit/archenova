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

score?: {
  discovery: number;
  capability: number;
  infrastructure: number;
  civilization: number;
  overall: number;
};

  ts: number;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ArcheNovaSignalsFeed({ limit = 30 }: { limit?: number }) {
  const [items, setItems] = useState<SignalItem[]>([]);
  const [category, setCategory] = useState("all");
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

const visibleItems =
  category === "all"
    ? items
    : items.filter(
        (item) => item.category === category
      );

  return (

    
    <section className="glass-block">
      <div className="home-card-head">
        <h2>ArcheNova Signal Feed</h2>
        <span className="home-card-meta">Updated: {updated}</span>
      </div>

      <div className="signal-filter-bar">

  <button
    className={`signal-filter ${
      category === "all" ? "active" : ""
    }`}
    onClick={() => setCategory("all")}
  >
    All
  </button>

  <button
    className={`signal-filter ${
      category === "Reality Discovery" ? "active" : ""
    }`}
    onClick={() =>
      setCategory("Reality Discovery")
    }
  >
    Reality
  </button>

  <button
    className={`signal-filter ${
      category === "Capability Expansion"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setCategory("Capability Expansion")
    }
  >
    Capability
  </button>

  <button
    className={`signal-filter ${
      category === "Infrastructure Formation"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setCategory("Infrastructure Formation")
    }
  >
    Infrastructure
  </button>

  <button
    className={`signal-filter ${
      category === "Synchronization Systems"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setCategory("Synchronization Systems")
    }
  >
    Sync
  </button>

  <button
    className={`signal-filter ${
      category === "Adaptive Capacity"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setCategory("Adaptive Capacity")
    }
  >
    Adaptive
  </button>

  <button
    className={`signal-filter ${
      category === "Civilization Engineering"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setCategory("Civilization Engineering")
    }
  >
    Civilization
  </button>

</div>

      <div className="feed-list">
        {visibleItems.length ? (
          visibleItems.map((item) => (
            <a
              key={item.id}
              href={`/intelligence-platform/signals/${item.id}`}
              target="_blank"
              rel="noreferrer"
              className="feed-row wide"
            >
              <div className={`signal-category ${slugify(item.category)}`}>
  {item.category.toUpperCase()}
</div>

<div className="feed-source">
  {item.source}
</div>

              <div className="feed-title">
                {item.title}
              </div>

              {item.score && (
  <div className="signal-score-box">
    <div className="signal-score-main">
      Overall {item.score.overall} / 10
    </div>

    <div className="signal-score-grid">
      <span>Discovery {item.score.discovery}</span>
      <span>Capability {item.score.capability}</span>
      <span>Infrastructure {item.score.infrastructure}</span>
      <span>Civilization {item.score.civilization}</span>
    </div>
  </div>
)}

              <div className="signal-section">
  <strong>Observation</strong>
  <p>{item.observation}</p>
</div>

<div className="signal-section">
  <strong>Implication</strong>
  <p>{item.implication}</p>
</div>

<div className="signal-section">
  <strong>Civilization Relevance</strong>
  <p>{item.commentary}</p>
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