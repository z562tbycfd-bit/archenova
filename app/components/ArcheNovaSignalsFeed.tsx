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

  whyItMatters?: string;
  strategicRelevance?: string;
  capitalImplication?: string;
  civilizationFunction?: string;
  watchpoint?: string;

  score?: {
    realityDiscovery?: number;
    capabilityExpansion?: number;
    infrastructureImpact?: number;
    synchronizationImpact?: number;
    adaptiveCapacity?: number;
    civilizationImpact?: number;
    overall?: number;
    discovery?: number;
    capability?: number;
    infrastructure?: number;
    civilization?: number;
  };

  ts: number;
};

const civilizationFunctions = [
  "all",
  "Reality Discovery",
  "Capability Expansion",
  "Infrastructure Formation",
  "Adaptive Capacity",
  "Civilization Coordination",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeFunction(category: string) {
  if (
    category === "Synchronization Systems" ||
    category === "Civilization Engineering"
  ) {
    return "Civilization Coordination";
  }

  return category;
}

function formatDate(ts: number) {
  if (!ts) return "—";

  return new Date(ts).toLocaleDateString();
}

export default function ArcheNovaSignalsFeed({
  limit = 30,
}: {
  limit?: number;
}) {
  const [items, setItems] = useState<SignalItem[]>([]);
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [sortMode, setSortMode] = useState("latest");
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
          setItems(data.items || []);
          setUpdated(
            data.updated ? new Date(data.updated).toLocaleString() : "—"
          );
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

  const sources = [
    "all",
    ...Array.from(new Set(items.map((item) => item.source))).sort(),
  ];

  const filteredItems = items.filter((item) => {
    const itemFunction = normalizeFunction(
      item.civilizationFunction || item.category
    );

    const categoryMatch =
      category === "all" || itemFunction === category;

    const sourceMatch =
      source === "all" || item.source === source;

    return categoryMatch && sourceMatch;
  });

  const visibleItems = [...filteredItems]
    .sort((a, b) => {
      if (sortMode === "important") {
        return (b.score?.overall || 0) - (a.score?.overall || 0);
      }

      if (sortMode === "transformative") {
        return (
          (b.score?.civilizationImpact || b.score?.civilization || 0) -
          (a.score?.civilizationImpact || a.score?.civilization || 0)
        );
      }

      if (sortMode === "infrastructure") {
        return (
          (b.score?.infrastructureImpact || b.score?.infrastructure || 0) -
          (a.score?.infrastructureImpact || a.score?.infrastructure || 0)
        );
      }

      if (sortMode === "adaptive") {
        return (
          (b.score?.adaptiveCapacity || 0) -
          (a.score?.adaptiveCapacity || 0)
        );
      }

      return (b.ts || 0) - (a.ts || 0);
    })
    .slice(0, limit);

  return (
    <section className="glass-block">
      <div className="home-card-head">
        <h2>ArcheNova Signal Feed</h2>
        <span className="home-card-meta">Updated: {updated}</span>
      </div>

      <p className="feed-summary">
        Signals are structured into factual observation, strategic relevance,
        capital implication, watchpoints, and ArcheNova interpretation.
      </p>

      <div className="signal-sort-bar">
        <label className="home-card-meta">
          Civilization Function
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="signal-sort"
        >
          {civilizationFunctions.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="signal-sort-bar">
        <label className="home-card-meta">
          Source
        </label>

        <select
          value={source}
          onChange={(event) => setSource(event.target.value)}
          className="signal-sort"
        >
          {sources.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Sources" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="signal-sort-bar">
        <label className="home-card-meta">
          Ranking
        </label>

        <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
          className="signal-sort"
        >
          <option value="latest">Latest</option>
          <option value="important">Highest ArcheNova Score</option>
          <option value="transformative">Highest Civilization Impact</option>
          <option value="infrastructure">Highest Infrastructure Impact</option>
          <option value="adaptive">Highest Adaptive Capacity</option>
        </select>
      </div>

      <div className="feed-list">
        {visibleItems.length ? (
          visibleItems.map((item) => {
            const functionCategory = normalizeFunction(
              item.civilizationFunction || item.category
            );

            return (
              <a
                key={`${item.id}-${item.originalUrl}`}
                href={`/intelligence-platform/signals/${item.id}`}
                className="feed-row wide"
              >
                <div
                  className={`signal-category ${slugify(
                    functionCategory
                  )}`}
                >
                  {functionCategory.toUpperCase()}
                </div>

                <div className="feed-source">
                  Source: {item.source} · Date: {formatDate(item.ts)}
                </div>

                <div className="feed-title">{item.title}</div>

                {item.score && (
                  <div className="signal-score-box signal-score-box-advanced">
                    <div className="signal-score-main">
                      <span>ArcheNova Score</span>

                      <span className="signal-score-overall">
                        {(item.score.overall ?? 0).toFixed(1)} / 10
                      </span>
                    </div>

                    <div className="signal-score-grid signal-score-grid-advanced">
                      <span>
                        <b>Reality</b>
                        {(
                          item.score.realityDiscovery ??
                          item.score.discovery ??
                          0
                        ).toFixed(1)}
                      </span>

                      <span>
                        <b>Capability</b>
                        {(
                          item.score.capabilityExpansion ??
                          item.score.capability ??
                          0
                        ).toFixed(1)}
                      </span>

                      <span>
                        <b>Infrastructure</b>
                        {(
                          item.score.infrastructureImpact ??
                          item.score.infrastructure ??
                          0
                        ).toFixed(1)}
                      </span>

                      <span>
                        <b>Coordination</b>
                        {(
                          item.score.synchronizationImpact ?? 0
                        ).toFixed(1)}
                      </span>

                      <span>
                        <b>Adaptive</b>
                        {(item.score.adaptiveCapacity ?? 0).toFixed(1)}
                      </span>

                      <span>
                        <b>Civilization</b>
                        {(
                          item.score.civilizationImpact ??
                          item.score.civilization ??
                          0
                        ).toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="signal-section">
                  <strong>Observation</strong>
                  <p>{item.observation}</p>
                </div>

                {item.whyItMatters && (
                  <div className="signal-section">
                    <strong>Why It Matters</strong>
                    <p>{item.whyItMatters}</p>
                  </div>
                )}

                {item.strategicRelevance && (
                  <div className="signal-section">
                    <strong>Strategic Relevance</strong>
                    <p>{item.strategicRelevance}</p>
                  </div>
                )}

                {item.capitalImplication && (
                  <div className="signal-section">
                    <strong>Capital Implication</strong>
                    <p>{item.capitalImplication}</p>
                  </div>
                )}

                {item.watchpoint && (
                  <div className="signal-section">
                    <strong>Watchpoint</strong>
                    <p>{item.watchpoint}</p>
                  </div>
                )}

                <div className="signal-section">
                  <strong>ArcheNova Interpretation</strong>
                  <p>{item.commentary}</p>
                </div>
              </a>
            );
          })
        ) : (
          <div className="feed-empty">
            No ArcheNova signals available for this selection.
          </div>
        )}
      </div>
    </section>
  );
}