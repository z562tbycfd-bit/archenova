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

export default function ArcheNovaPaperGenerator({
  query,
}: {
  query: string;
}) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

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

        setSignal(found || null);
      } catch {
        setSignal(null);
      }
    }

    load();
  }, [query]);

  if (!query || !signal) return null;

  return (
    <section className="glass-block archenova-paper-generator">
      <span className="home-section-label">
        ARCHENOVA PAPER GENERATOR
      </span>

      <h2>Generate ArcheNova Paper</h2>

      <p>
        Transform this signal into a structured ArcheNova paper: scientific
        basis, engineering pathway, infrastructure formation, civilization
        impact, and future possibility space.
      </p>

      <button
        type="button"
        className="inline-link"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Paper ↑" : "Generate Paper →"}
      </button>

      {open && (
        <div className="archenova-paper">
          <h2>{signal.title}</h2>

          <h3>Scientific Basis</h3>
          <p>{signal.observation}</p>

          <h3>Engineering Pathway</h3>
          <p>
            The engineering significance of this signal lies in whether the
            observed knowledge can be transformed into reliable, reproducible,
            scalable, and operationally useful capability.
          </p>

          <h3>Implementation Logic</h3>
          <p>
            Implementation requires validation, system integration,
            manufacturability, economic feasibility, governance legitimacy,
            safety, and long-term operational reliability.
          </p>

          <h3>Infrastructure Formation</h3>
          <p>
            From the ArcheNova perspective, this signal becomes important when
            it moves beyond isolated discovery and begins contributing to
            durable infrastructure, institutional workflows, platforms,
            standards, or civilization-scale operating systems.
          </p>

          <h3>Civilization Impact</h3>
          <p>{signal.commentary}</p>

          <h3>Future Possibility Space</h3>
          <p>
            The deeper value of this signal is its potential to expand what
            civilization can observe, understand, build, coordinate, adapt to,
            and realize across longer time horizons.
          </p>

          <h3>Original Source</h3>
          <a
            href={signal.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="back-link"
          >
            Open Original Source →
          </a>
        </div>
      )}
    </section>
  );
}