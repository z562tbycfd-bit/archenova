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

export default function ArcheNovaResearchEngine({
  query,
}: {
  query: string;
}) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function load() {
      const res = await fetch("/data/signals.json", {
        cache: "no-store",
      });

      const data = await res.json();

      const found =
        (data.items || []).find(
          (item: Signal) => item.title === query
        ) ||
        (data.items || []).find((item: Signal) =>
          item.title
            .toLowerCase()
            .includes(query.toLowerCase())
        );

      setSignal(found || null);
    }

    load();
  }, [query]);

  if (!signal) return null;

  return (
    <section className="glass-block">
      <span className="home-section-label">
        ARCHENOVA RESEARCH ENGINE
      </span>

      <h2>Research Engine</h2>

      <p>
        Transform signal intelligence into implementation,
        infrastructure, strategic, and civilization analysis.
      </p>

      <button
        className="inline-link"
        onClick={() => setOpen(!open)}
      >
        {open
          ? "Hide Research Analysis ↑"
          : "Generate Research Analysis →"}
      </button>

      {open && (
        <div className="archenova-paper">

          <h3>Implementation Roadmap</h3>
          <p>
            Laboratory validation → Engineering integration →
            Industrial deployment → Infrastructure formation →
            Civilization-scale adoption.
          </p>

          <h3>Infrastructure Requirements</h3>
          <p>
            Technical standards, manufacturing capability,
            operational governance, capital allocation,
            workforce development, and institutional support.
          </p>

          <h3>Bottlenecks</h3>
          <p>
            Cost, scalability, reliability, regulation,
            interoperability, and deployment complexity.
          </p>

          <h3>Strategic Importance</h3>
          <p>
            This signal may influence long-term capability,
            competitiveness, resilience, and future option space.
          </p>

          <h3>Civilization Impact</h3>
          <p>
            The signal contributes to the expansion of
            civilization's ability to discover reality,
            implement capability, coordinate systems,
            and expand future possibility space.
          </p>

          <h3>Future Scenarios</h3>

          <p>
            <strong>Conservative:</strong>
            Limited domain adoption.
          </p>

          <p>
            <strong>Moderate:</strong>
            Industry-wide integration.
          </p>

          <p>
            <strong>Transformative:</strong>
            Civilization-scale infrastructure impact.
          </p>

        </div>
      )}
    </section>
  );
}