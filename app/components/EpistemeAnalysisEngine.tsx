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

const categoryTemplates: Record<
  string,
  {
    structural: string;
    assumptions: string;
    constraints: string;
    future: string;
  }
> = {
  "Reality Discovery": {
    structural:
      "This signal expands civilization's ability to observe, model, and understand reality.",
    assumptions:
      "Observed phenomena accurately reflect underlying structures of reality.",
    constraints:
      "Measurement limitations, uncertainty, reproducibility, and incomplete models.",
    future:
      "New scientific models, improved prediction, and deeper reality accessibility.",
  },

  "Capability Expansion": {
    structural:
      "This signal expands operational capability and increases the range of achievable actions.",
    assumptions:
      "The capability can become reliable, scalable, and economically viable.",
    constraints:
      "Manufacturing limits, deployment costs, and operational reliability.",
    future:
      "Industrial deployment and expansion of practical capability.",
  },

  "Infrastructure Formation": {
    structural:
      "This signal contributes to the emergence of durable infrastructure systems.",
    assumptions:
      "Infrastructure can be maintained across institutions and generations.",
    constraints:
      "Capital requirements, maintenance burden, and interoperability.",
    future:
      "Infrastructure accumulation and civilization-scale stability.",
  },

  "Synchronization Systems": {
    structural:
      "This signal improves coordination between distributed systems.",
    assumptions:
      "Synchronization increases efficiency and reduces systemic friction.",
    constraints:
      "Latency, interoperability, security, and governance complexity.",
    future:
      "Planetary-scale coordination and distributed intelligence.",
  },

  "Adaptive Capacity": {
    structural:
      "This signal increases civilization's ability to adapt under uncertainty.",
    assumptions:
      "Adaptation mechanisms remain responsive to changing conditions.",
    constraints:
      "Response delays, information quality, and resource limitations.",
    future:
      "Improved resilience, recovery, and long-term survivability.",
  },

  "Civilization Engineering": {
    structural:
      "This signal affects the architecture through which civilization evolves.",
    assumptions:
      "Institutions, technology, and knowledge can be integrated coherently.",
    constraints:
      "Governance, legitimacy, coordination complexity, and path dependency.",
    future:
      "Transformation of civilization-scale systems and future possibility space.",
  },
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
          (data.items || []).find(
            (item: Signal) => item.title === query
          ) ||
          (data.items || []).find((item: Signal) =>
            item.title
              .toLowerCase()
              .includes(normalizedQuery)
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

  const analysis = signal
    ? categoryTemplates[
        signal.category as keyof typeof categoryTemplates
      ] ??
      categoryTemplates["Civilization Engineering"]
    : null;

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
              <p>{analysis?.structural}</p>
            </div>

            <div>
              <strong>Underlying Assumptions</strong>
              <p>{analysis?.assumptions}</p>
            </div>

            <div>
              <strong>Potential Constraints</strong>
              <p>{analysis?.constraints}</p>
            </div>

            <div>
              <strong>Civilizational Relevance</strong>
              <p>{signal.commentary}</p>
            </div>

            <div>
              <strong>Future Trajectory</strong>
              <p>{analysis?.future}</p>
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
          Episteme received the signal context,
          but no matching local signal record
          was found.
        </p>
      )}
    </section>
  );
}