export const dynamic = "force-static";

type Phase = "Concept" | "Prototype" | "Deployment";

type Project = {
  id: string;
  title: string;
  irreversibleCondition: string;
  scale: {
    years: string;
    generations: string;
    capital: string;
  };
  phase: Phase;
};

const PROJECTS: Project[] = [
  {
    id: "Project 001",
    title: "Underground Long-Duration Energy Storage",
    irreversibleCondition:
      "Once embedded underground, the system must remain safe-by-design without continuous intervention; abandonment is structurally disallowed.",
    scale: {
      years: "30–100+ years",
      generations: "1–3 generations",
      capital: "Infrastructure-grade (locked capital, low reversibility)",
    },
    phase: "Concept",
  },
  {
    id: "Project 002",
    title: "Quantum Memory Infrastructure (Boundary-Stabilized)",
    irreversibleCondition:
      "Stability must be achieved via physical boundary design (materials/geometry/interfaces), not perpetual correction loops.",
    scale: {
      years: "10–30 years",
      generations: "1 generation",
      capital: "Deep-tech scale (capex + long R&D horizon)",
    },
    phase: "Prototype",
  },
  {
    id: "Project 003",
    title: "Irreversible Responsibility Contracts (Institutional Layer)",
    irreversibleCondition:
      "Accountability cannot be diluted or delegated; exit routes are removed by contractual and institutional structure.",
    scale: {
      years: "10–50 years",
      generations: "1–2 generations",
      capital: "Capital governance (commitment > liquidity)",
    },
    phase: "Concept",
  },
];

function PhaseBadge({ phase }: { phase: Phase }) {
  return <span className={`pj-badge pj-${phase.toLowerCase()}`}>{phase}</span>;
}

export default function ProjectsPage() {
  return (
    <main className="projects">
      <header className="projects-head">
        <h1>Projects</h1>
        <p className="projects-lead">
          ArcheNova is not a theory library. Projects are where irreversibility
          is forced to become real: each project fixes a non-negotiable condition
          that cannot be “optimized away” later.
        </p>
      </header>

      <section className="pj-grid" aria-label="ArcheNova projects list">
        {PROJECTS.map((p) => (
          <article key={p.id} className="pj-card">
            <div className="pj-top">
              <div className="pj-id">{p.id}</div>
              <PhaseBadge phase={p.phase} />
            </div>

            <h2 className="pj-title">{p.title}</h2>

            <div className="pj-block">
              <div className="pj-k">Fixed Irreversible Condition</div>
              <div className="pj-v">{p.irreversibleCondition}</div>
            </div>

            <div className="pj-block">
              <div className="pj-k">Target Scale</div>
              <div className="pj-scale">
                <div className="pj-scale-row">
                  <span className="pj-skey">Years</span>
                  <span className="pj-sval">{p.scale.years}</span>
                </div>
                <div className="pj-scale-row">
                  <span className="pj-skey">Generations</span>
                  <span className="pj-sval">{p.scale.generations}</span>
                </div>
                <div className="pj-scale-row">
                  <span className="pj-skey">Capital</span>
                  <span className="pj-sval">{p.scale.capital}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
