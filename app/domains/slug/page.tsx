export const dynamic = "force-static";
export const dynamicParams = false;

import Link from "next/link";
import { notFound } from "next/navigation";

type Domain = {
  title: string;
  structuralDefinition: string;
  representative: {
    label: string;
    items: Array<{ title: string; note: string }>;
  };
};

const DOMAINS: Record<string, Domain> = {
  "fundamental-physics": {
    title: "Fundamental Physics",
    structuralDefinition:
      "ArcheNova treats fundamental physics as ambiguity elimination: we do not optimize interpretations, we fix boundary conditions that force reality to answer.",
    representative: {
      label: "Representative paper / project",
      items: [
        {
          title: "Experimental Graviton Detection — ambiguity elimination design",
          note: "A boundary-engineered experiment aimed at forcing a discrete answer: quantum gravity or classical background.",
        },
      ],
    },
  },

  "quantum-infrastructure": {
    title: "Quantum Infrastructure",
    structuralDefinition:
      "Quantum technology becomes infrastructure only when stability is achieved by physical refusal: materials, geometry, interfaces, and protocols that constrain failure modes.",
    representative: {
      label: "Representative paper / project",
      items: [
        {
          title: "Memory-first quantum architecture",
          note: "Long-lived memory as the anchor layer for synchronization, authentication, and buffering at scale.",
        },
      ],
    },
  },

  "energy-planetary-systems": {
    title: "Energy & Planetary Systems",
    structuralDefinition:
      "Energy is not a utility but a boundary condition. Civilization-scale energy systems matter because they impose irreversible obligations and shape long-term responsibility.",
    representative: {
      label: "Representative paper / project",
      items: [
        {
          title: "Fission surface power as planetary continuity",
          note: "Decouples survival and industry from environmental variability, turning presence into permanence.",
        },
      ],
    },
  },

  "ai-computation": {
    title: "AI & Computation",
    structuralDefinition:
      "ArcheNova treats computation as constraint design: the goal is not smarter prediction, but the removal of illegitimate trajectories by hard structural limits.",
    representative: {
      label: "Representative paper / project",
      items: [
        {
          title: "Minimal constraint determination for AGI-scale systems",
          note: "Delete catastrophic futures by fixing a small set of non-negotiable constraints.",
        },
      ],
    },
  },

  "institutional-legal-design": {
    title: "Institutional / Legal Design",
    structuralDefinition:
      "Institutions are irreversible commitments. ArcheNova designs legal and governance structures that prevent responsibility escape across time, capital, and organizational complexity.",
    representative: {
      label: "Representative paper / project",
      items: [
        {
          title: "Irreversible responsibility contracts",
          note: "Structures that bind capital and accountability where withdrawal, dilution, or delegation is structurally blocked.",
        },
      ],
    },
  },

  "civilization-scale-systems": {
    title: "Civilization-scale Systems",
    structuralDefinition:
      "At civilization scale, the task is not optimization but deletion: fix minimal constraints that guarantee remaining trajectories avoid catastrophic collapse.",
    representative: {
      label: "Representative paper / project",
      items: [
        {
          title: "Civilization-scale boundary design principle",
          note: "Minimal irreversible constraints → local freedom + global safety.",
        },
      ],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(DOMAINS).map((slug) => ({ slug }));
}

export default function DomainPage({ params }: { params: { slug: string } }) {
  const domain = DOMAINS[params.slug];
  if (!domain) return notFound();

  return (
    <main className="domain">
      <div className="domain-top">
        <Link href="/domains" className="domain-back">
          ← Back to Domains
        </Link>
      </div>

      <header className="domain-head">
        <h1>{domain.title}</h1>
        <p className="domain-def2">{domain.structuralDefinition}</p>
      </header>

      <section className="domain-block">
        <h2>{domain.representative.label}</h2>
        <ul className="domain-list">
          {domain.representative.items.map((it) => (
            <li key={it.title} className="domain-item">
              <div className="domain-item-title">{it.title}</div>
              <div className="domain-item-note">{it.note}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
