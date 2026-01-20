export const dynamic = "force-static";

import Link from "next/link";

const DOMAINS = [
  {
    slug: "fundamental-physics",
    title: "Fundamental Physics",
    def: "Fixing the upstream constraints of reality: what must be true before models, measurements, or interpretations diverge.",
    rep: "Representative: Experimental graviton detection as ambiguity elimination (Project / Note).",
  },
  {
    slug: "quantum-infrastructure",
    title: "Quantum Infrastructure",
    def: "Quantum systems as irreversible infrastructure: stability by boundary design, not continuous correction.",
    rep: "Representative: Memory-first quantum architecture (Quantum memory / silicon defects).",
  },
  {
    slug: "energy-planetary-systems",
    title: "Energy & Planetary Systems",
    def: "Energy as a civilizational boundary condition: systems that bind long-term responsibility across generations and environments.",
    rep: "Representative: Fission surface power as planetary continuity (Project / Note).",
  },
  {
    slug: "ai-computation",
    title: "AI & Computation",
    def: "Computation under constraints: eliminate catastrophic trajectories by embedding legitimacy and refusal into systems.",
    rep: "Representative: Constraint-first governance for AGI-scale capability (Essay / Draft).",
  },
  {
    slug: "institutional-legal-design",
    title: "Institutional / Legal Design",
    def: "Institutions as irreversible commitments: contracts and governance that prevent responsibility escape.",
    rep: "Representative: Irreversible responsibility contracts for infrastructure (Framework / Draft).",
  },
  {
    slug: "civilization-scale-systems",
    title: "Civilization-scale Systems",
    def: "Minimal non-negotiable constraints that keep civilization locally free but globally safe.",
    rep: "Representative: Minimal constraint determination (Civilization-scale design principle).",
  },
] as const;

export default function DomainsPage() {
  return (
    <main className="domains">
      <header className="domains-head">
        <h1>Domains</h1>
        <p className="domains-lead">
          ArcheNova organizes work by domains where irreversibility matters most.
          Each domain page states a short structural definition and highlights a
          representative paper or project.
        </p>
      </header>

      <section className="domains-grid" aria-label="ArcheNova domains">
        {DOMAINS.map((d) => (
          <Link key={d.slug} href={`/domains/${d.slug}`} className="domain-card">
            <div className="domain-title">{d.title}</div>
            <div className="domain-def">{d.def}</div>
            <div className="domain-rep">{d.rep}</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
