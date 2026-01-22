export const dynamic = "force-static";

import Link from "next/link";

type Phase = "Concept" | "Prototype" | "Deployment";

type Project = {
  id: string; // "Project 001"
  slug: string; // "project-001"
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
    slug: "project-001",
    title: "Fundamental Physics — Ambiguity Elimination Experiments",
    irreversibleCondition:
      "Design measurements that remove interpretive freedom: the result must force a discrete ontology rather than a tunable explanation.",
    scale: {
      years: "5–20+ years",
      generations: "1 generation",
      capital: "High-sensitivity instrumentation (focused capex)",
    },
    phase: "Concept",
  },
  {
    id: "Project 002",
    slug: "project-002",
    title: "Quantum Infrastructure — Memory-First, Boundary-Stabilized Stack",
    irreversibleCondition:
      "Stability must be achieved by boundary design (materials/geometry/interfaces), not by continuous correction that accumulates operational complexity.",
    scale: {
      years: "10–30 years",
      generations: "1 generation",
      capital: "Deep-tech scale (R&D + capex)",
    },
    phase: "Prototype",
  },
  {
    id: "Project 003",
    slug: "project-003",
    title: "Energy Systems — Irreversible Safety-by-Design Storage",
    irreversibleCondition:
      "Once deployed, the system must remain non-catastrophic without safety-critical intervention; abandonment is structurally disallowed.",
    scale: {
      years: "30–100+ years",
      generations: "1–3 generations",
      capital: "Infrastructure-grade (locked capital, long custody)",
    },
    phase: "Concept",
  },
  {
    id: "Project 004",
    slug: "project-004",
    title: "Planetary Systems — Continuous Power as a Boundary Condition",
    irreversibleCondition:
      "Energy availability must be continuous and internally governed (not environmentally contingent), enabling permanence rather than provisional presence.",
    scale: {
      years: "10–50 years",
      generations: "1–2 generations",
      capital: "Mission-scale infrastructure (high commitment)",
    },
    phase: "Concept",
  },
  {
    id: "Project 005",
    slug: "project-005",
    title: "AI — Constraint-First Computation (Deleting Catastrophic Trajectories)",
    irreversibleCondition:
      "Legitimacy is embedded as hard constraints: catastrophic trajectories are deleted upstream rather than monitored and corrected after emergence.",
    scale: {
      years: "3–10 years",
      generations: "1 generation",
      capital: "Compute + governance design (capability-compressed)",
    },
    phase: "Prototype",
  },
  {
    id: "Project 006",
    slug: "project-006",
    title: "Medical Systems — Upstream Diagnosis Before Irreversible Decline",
    irreversibleCondition:
      "Shift detection and intervention upstream of irreversible pathology: diagnostics must expose hidden dynamics (clearance, flow, transfer) within clinical time.",
    scale: {
      years: "5–15 years",
      generations: "1 generation",
      capital: "Clinical-grade validation (devices + trials)",
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
          <Link key={p.id} href={`/projects/${p.slug}`} className="pj-card">
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

            <div className="pj-open">Open →</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
