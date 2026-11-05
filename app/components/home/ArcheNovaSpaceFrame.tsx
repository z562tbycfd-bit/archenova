"use client";

import { useState, type ReactNode } from "react";

type ChapterKey = "synthesis" | "relations" | "world";
type Props = { synthesis: ReactNode; relations: ReactNode; world: ReactNode };

const CHAPTERS = [
  { key: "synthesis", number: "01", label: "SYNTHESIS", title: "Civilization Synthesis", description: "Principles and the architecture of a correctable civilization." },
  { key: "relations", number: "02", label: "RELATIONS", title: "Civilizational Relations", description: "Independence, coexistence, and accountable relationships." },
  { key: "world", number: "03", label: "WORLD", title: "The ArcheNova World", description: "A spatial expression of the civilization framework." },
] as const;

export default function ArcheNovaSpaceFrame({ synthesis, relations, world }: Props) {
  const [selected, setSelected] = useState<ChapterKey>("synthesis");
  const contents: Record<ChapterKey, ReactNode> = { synthesis, relations, world };

  return (
    <section
  id="civilization-synthesis"
  data-home-chapter="synthesis"
  className="an-synthesis-home an-space-embedded-section"
  aria-labelledby="an-synthesis-home-title"
>
      <header className="an-space-frame__intro">
        <span className="an-space-frame__eyebrow">
  ARCHENOVA CIVILIZATIONAL VISION
</span>

<h2 className="an-space-frame__title">
  The Direction of Civilization.
</h2>

<p className="an-space-frame__lead">
  A vision for the civilization ArcheNova seeks
  to make possible.
</p>
        <nav className="an-space-frame__nav" aria-label="ArcheNova Space chapters">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.key}
              type="button"
              id={`an-space-tab-${chapter.key}`}
              className={`an-space-frame__nav-item${selected === chapter.key ? " is-selected" : ""}`}
              onClick={() => setSelected(chapter.key)}
              aria-selected={selected === chapter.key}
              aria-controls={`an-space-panel-${chapter.key}`}
              role="tab"
              tabIndex={selected === chapter.key ? 0 : -1}
            >
              <span className="an-space-frame__nav-number">{chapter.number}</span>
              <span>{chapter.label}</span>
            </button>
          ))}
        </nav>
      </header>
      {CHAPTERS.map((chapter) => (
        <div
          key={chapter.key}
          id={`an-space-panel-${chapter.key}`}
          className="an-space-frame__chapter"
          data-an-space-chapter={chapter.key}
          role="tabpanel"
          aria-labelledby={`an-space-tab-${chapter.key}`}
          hidden={selected !== chapter.key}
        >
          <div className="an-space-frame__chapter-heading">
            <span className="an-space-frame__chapter-number">CHAPTER {chapter.number} / 03</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
          </div>
          <div className="an-space-frame__content">{contents[chapter.key]}</div>
        </div>
      ))}
      <footer className="an-space-frame__footer">PRINCIPLES <span aria-hidden="true">·</span> RELATIONSHIPS <span aria-hidden="true">·</span> WORLD</footer>
    </section>
  );
}
