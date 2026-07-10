import type { CSSProperties } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import {
  getCivilizationItemsByLayer,
  IntelligenceLayer,
} from "@/lib/civilizationIntelligenceBase";
import CivilizationIntelligenceMotion from "./CivilizationIntelligenceMotion";


const layers: {
  key: IntelligenceLayer;
  no: string;
  title: string;
  subtitle: string;
  label: string;
  href: string;
}[] = [
  {
    key: "observation",
    no: "Ⅰ",
    title: "Observation",
    subtitle: "World signals become awareness.",
    label: "Latest Signals",
    href: "/observatory",
  },
  {
    key: "understanding",
    no: "Ⅱ",
    title: "Understanding",
    subtitle: "Signals become meaning.",
    label: "Context & Meaning",
    href: "/observatory",
  },
  {
    key: "reasoning",
    no: "Ⅲ",
    title: "Reasoning",
    subtitle: "Meaning becomes judgment.",
    label: "Judgment Layer",
    href: "/governance",
  },
  {
    key: "design",
    no: "Ⅳ",
    title: "Design",
    subtitle: "Judgment becomes architecture.",
    label: "Architecture",
    href: "/architecture",
  },
  {
    key: "realization",
    no: "Ⅴ",
    title: "Realization",
    subtitle: "Architecture becomes reality.",
    label: "Programs",
    href: "/programs",
  },
  {
    key: "memory",
    no: "Ⅵ",
    title: "Memory",
    subtitle: "Reality becomes civilizational memory.",
    label: "Archive",
    href: "/papers",
  },
];

export default function CivilizationIntelligenceDNA() {
  return (
    <main className="ci2-page">
      <CivilizationIntelligenceMotion />
      <section className="ci2-section">
        <div className="ci2-space" aria-hidden="true" />

        <Reveal>
          <div className="ci2-shell">
            <header className="ci2-header">
              <span>CIVILIZATION INTELLIGENCE</span>

              <h1>
                The cognitive architecture
                <br />
                of civilization.
              </h1>

              <p>
                A living intelligence system that observes, understands,
                reasons, designs, realizes, and remembers civilization.
              </p>
            </header>

            <div className="ci2-stage">
              <div className="ci2-orbit orbit-1" />
              <div className="ci2-orbit orbit-2" />
              <div className="ci2-orbit orbit-3" />

              <div className="ci2-dna" aria-hidden="true">
  <div className="ci2-dna-aura" />

  <span className="ci2-strand strand-left" />
  <span className="ci2-strand strand-right" />

  <div className="ci2-rungs">
    {Array.from({ length: 18 }).map((_, index) => (
      <span
        key={index}
        className={`ci2-rung ci2-rung-${index + 1}`}
        style={
          {
            "--rung-index": index,
          } as CSSProperties
        }
      >
        <i className="ci2-rung-end ci2-rung-end-left" />
        <b />
        <i className="ci2-rung-end ci2-rung-end-right" />
      </span>
    ))}
  </div>

  {layers.map((layer, index) => (
    <i key={layer.no} className={`ci2-dna-node node-${index + 1}`}>
      {layer.no}
    </i>
  ))}

  <div className="ci2-core">
    <span>Episteme</span>

    <strong>
      Civilization
      <br />
      Intelligence
    </strong>

    <p>
      Observe → Understand → Reason
      <br />
      Design → Realize → Remember
    </p>
  </div>
</div>

              <div className="ci2-cards">
                {layers.map((layer, index) => {
                  const items = getCivilizationItemsByLayer(layer.key, 3);

                  return (
                    <article
                      key={layer.key}
                      className={`ci2-card card-${index + 1}`}
                    >
                      <div className="ci2-card-head">
                        <span>{layer.no}</span>

                        <div>
                          <strong>{layer.title}</strong>
                          <p>{layer.subtitle}</p>
                        </div>
                      </div>

                      <div className="ci2-line" />

                      <small>{layer.label}</small>

                      <div className="ci2-items">
                        {items.length > 0 ? (
                          items.map((item) =>
                            item.href ? (
                              <Link
                                key={item.id}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <em key={item.id}>{item.title}</em>
                            ),
                          )
                        ) : (
                          <em>Waiting for live knowledge.</em>
                        )}
                      </div>

                      <Link href={layer.href} className="ci2-more">
                        View all →
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
            
          </div>
        </Reveal>
      </section>
    </main>
  );
}