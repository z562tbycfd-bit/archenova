"use client";

import { useEffect, useState } from "react";

type Signal = {
  id: string;
  title: string;
  source: string;
  originalUrl: string;
  category: string;
  observation: string;
  implication: string;
  commentary: string;
};

export default function EpistemeAnalysisEngine({
  query,
}: {
  query: string;
}) {
  const [signal, setSignal] = useState<Signal | null>(null);

  useEffect(() => {
    if (!query) {
      setSignal(null);
      return;
    }

    let cancel = false;

    async function load() {
      try {
        const res = await fetch("/data/signals.json", {
          cache: "no-store",
        });

        const data = await res.json();

        const normalizedQuery = query.toLowerCase();

        const found =
          (data.items || []).find((item: Signal) => item.title === query) ||
          (data.items || []).find((item: Signal) =>
            item.title.toLowerCase().includes(normalizedQuery)
          );

        if (!cancel) {
          setSignal(found || null);
        }
      } catch {
        if (!cancel) {
          setSignal(null);
        }
      }
    }

    load();

    return () => {
      cancel = true;
    };
  }, [query]);

  if (!query) return null;

  return (
    <section className="glass-block episteme-analysis">
      <span className="home-section-label">
        EPISTEME ANALYSIS
      </span>

      <h2>{query}</h2>

      {signal ? (
        <>
          <div className="episteme-analysis-grid">
            <div>
              <strong>Structural Meaning</strong>
              <p>
                This signal belongs to the category of{" "}
                <b>{signal.category}</b>. Its deeper meaning is not the article
                itself, but the structural transition it may indicate.
              </p>
            </div>

            <div>
              <strong>Underlying Assumptions</strong>
              <p>
                The signal assumes that the observed scientific or technological
                development can become reliable, scalable, and institutionally
                meaningful.
              </p>
            </div>

            <div>
              <strong>Potential Constraints</strong>
              <p>
                Constraints may include validation, cost, reproducibility,
                governance, infrastructure compatibility, and long-term
                operational reliability.
              </p>
            </div>

            <div>
              <strong>Civilizational Relevance</strong>
              <p>{signal.commentary}</p>
            </div>
          </div>

          <div className="page-foot">
            <a
              href={signal.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="back-link"
            >
              Open Original Source →
            </a>
          </div>
        </>
      ) : (
        <p>
          Episteme received the signal context, but no matching local signal
          record was found.
        </p>
      )}
    </section>
  );
}