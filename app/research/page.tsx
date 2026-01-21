export const dynamic = "force-static";

type Summary = {
  question: string;
  significance: string;
  irreversibility: string;
};

type Entry = {
  title: string;
  domain:
    | "Fundamental Physics"
    | "Quantum Infrastructure"
    | "Energy & Planetary Systems"
    | "AI & Computation"
    | "Institutional / Legal Design"
    | "Civilization-scale Systems"
    | "ArcheNova";
  summary: Summary;
  pdf?: string;   // 例: "/files/your-paper.pdf"
  arxiv?: string; // 例: "https://arxiv.org/abs/XXXX.XXXXX"
  kind: "Essay" | "Paper";
};

const ESSAYS: Entry[] = [
  {
    kind: "Essay",
    domain: "ArcheNova",
    title: "Minimal Constraint Determination — A Civilization Design Principle",
    summary: {
      question:
        "What is the smallest set of non-negotiable constraints that eliminates catastrophic futures?",
      significance:
        "Shifts governance from optimization/regulation to boundary-design: delete illegitimate trajectories upstream.",
      irreversibility:
        "Once constraints are embedded as infrastructure-level commitments, responsibility cannot be delegated or reversed.",
    },
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
  },
  {
    kind: "Essay",
    domain: "ArcheNova",
    title: "Irreversibility as Infrastructure — Beyond Monitoring and Correction",
    summary: {
      question:
        "How can civilization remain locally free while globally safe under accelerating capability?",
      significance:
        "Reframes stability as refusal-by-design (materials, geometry, contracts), not continuous adjustment.",
      irreversibility:
        "Embedding refusal into structure converts failure from a managed risk into an impossible trajectory.",
    },
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
  },
];

const DOMAIN_PAPERS: Entry[] = [
  {
    kind: "Paper",
    domain: "Fundamental Physics",
    title: "Experimental Graviton Detection — Ambiguity Elimination Design",
    summary: {
      question: "Does gravity participate in quantum reality as a discrete interaction?",
      significance:
        "Designs an experiment that removes interpretive freedom by forcing a measurable consequence under extreme coherence.",
      irreversibility:
        "A positive/negative result fixes the ontology of gravity in a way that cannot be 'explained away' by noise models.",
    },
    pdf: "/files/example-graviton-note.pdf",
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
  },
  {
    kind: "Paper",
    domain: "Quantum Infrastructure",
    title: "Memory-first Quantum Infrastructure — Stability by Boundary Design",
    summary: {
      question: "What makes quantum systems infrastructure rather than fragile devices?",
      significance:
        "Moves the center from active correction to physical refusal: interfaces, thermal paths, geometry, and protocols.",
      irreversibility:
        "When failure modes are structurally removed, scaling does not accumulate operational complexity irreversibly.",
    },
    pdf: "/files/example-quantum-infra.pdf",
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
  },
  {
    kind: "Paper",
    domain: "Energy & Planetary Systems",
    title: "Fission Surface Power as Planetary Continuity",
    summary: {
      question: "What changes when energy is decoupled from planetary variability?",
      significance:
        "Transforms presence into permanence: continuous power becomes a boundary condition for industry, life-support, computation.",
      irreversibility:
        "Deployment binds intergenerational responsibility (safety, custody, decommissioning) that cannot be exited cheaply.",
    },
    pdf: "/files/example-fission-surface.pdf",
  },
  {
    kind: "Paper",
    domain: "AI & Computation",
    title: "Constraint-first Computation — Deleting Catastrophic Trajectories",
    summary: {
      question: "How do we prevent futures that must never exist under AGI-scale capability?",
      significance:
        "Treats governance as a design problem: encode legitimacy and refusal into systems, not external monitoring.",
      irreversibility:
        "Once capability compresses, ex post correction is too slow; only upstream constraints remain actionable.",
    },
    pdf: "/files/example-ai-constraints.pdf",
  },
  {
    kind: "Paper",
    domain: "Institutional / Legal Design",
    title: "Irreversible Responsibility Contracts — Preventing Accountability Escape",
    summary: {
      question: "How do we bind power and responsibility when organizations fragment accountability?",
      significance:
        "Uses institutional design to block dilution/withdrawal: responsibility must remain indivisible at scale.",
      irreversibility:
        "Contracts become structural constraints—exit routes are removed by design, not by enforcement after failure.",
    },
    pdf: "/files/example-legal-contracts.pdf",
  },
  {
    kind: "Paper",
    domain: "Civilization-scale Systems",
    title: "Civilization-scale Boundary Design — Local Freedom, Global Safety",
    summary: {
      question:
        "What constraints guarantee safety while preserving degrees of freedom inside the safe region?",
      significance:
        "Formalizes minimal non-negotiables as the only scalable governance primitive for coupled irreversible systems.",
      irreversibility:
        "Once embedded at infrastructure/legal layers, catastrophic trajectories are not 'managed'—they are deleted.",
    },
    pdf: "/files/example-civ-scale.pdf",
  },
];

function Card({ e }: { e: Entry }) {
  return (
    <article className="rp-card">
      <div className="rp-top">
        <span className="rp-badge">{e.kind}</span>
        <span className="rp-domain">{e.domain}</span>
      </div>

      <h2 className="rp-title">{e.title}</h2>

      <div className="rp-summary">
        <div className="rp-row">
          <div className="rp-k">Question</div>
          <div className="rp-v">{e.summary.question}</div>
        </div>
        <div className="rp-row">
          <div className="rp-k">Structural Significance</div>
          <div className="rp-v">{e.summary.significance}</div>
        </div>
        <div className="rp-row">
          <div className="rp-k">Irreversibility</div>
          <div className="rp-v">{e.summary.irreversibility}</div>
        </div>
      </div>

      <div className="rp-links">
        {e.pdf && (
          <a href={e.pdf} target="_blank" rel="noreferrer">
            PDF
          </a>
        )}
        {e.arxiv && (
          <a href={e.arxiv} target="_blank" rel="noreferrer">
            arXiv
          </a>
        )}
      </div>
    </article>
  );
}

export default function ResearchPage() {
  return (
    <main className="rp">
      <header className="rp-head">
        <h1>Research / Papers</h1>
        <p className="rp-lead">
          ArcheNova publishes essays and papers as boundary statements. Each entry is summarized as:
          <strong> Question → Structural Significance → Irreversibility</strong>.
        </p>
      </header>

      <section className="rp-section">
        <h2 className="rp-h2">ArcheNova Essays</h2>
        <div className="rp-grid">
          {ESSAYS.map((e) => (
            <Card key={e.title} e={e} />
          ))}
        </div>
      </section>

      <section className="rp-section">
        <h2 className="rp-h2">Domain Papers (PDF)</h2>
        <div className="rp-grid">
          {DOMAIN_PAPERS.map((e) => (
            <Card key={e.title} e={e} />
          ))}
        </div>
      </section>
    </main>
  );
}
