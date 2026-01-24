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
    function lockLevelFromYears(years: string) {
    const s = years.toLowerCase();
    if (s.includes("100") || s.includes("50") || s.includes("30")) return 5;
    if (s.includes("20") || s.includes("10")) return 4;
    if (s.includes("5")) return 3;
    return 3;
  }

  function lockLevelFromGenerations(g: string) {
    const s = g.toLowerCase();
    if (s.includes("3")) return 5;
    if (s.includes("2")) return 4;
    if (s.includes("1")) return 3;
    return 3;
  }

  function lockLevelFromCapital(c: string) {
    const s = c.toLowerCase();
    if (s.includes("infrastructure") || s.includes("locked") || s.includes("custody")) return 5;
    if (s.includes("mission") || s.includes("governance")) return 4;
    if (s.includes("deep-tech") || s.includes("instrument")) return 3;
    return 3;
  }

  function phaseLock(phase: "Concept" | "Prototype" | "Deployment") {
    if (phase === "Deployment") return 5;
    if (phase === "Prototype") return 4;
    return 3;
  }

  function avgLock(p: {
    scale: { years: string; generations: string; capital: string };
    phase: "Concept" | "Prototype" | "Deployment";
  }) {
    const a = lockLevelFromYears(p.scale.years);
    const b = lockLevelFromGenerations(p.scale.generations);
    const c = lockLevelFromCapital(p.scale.capital);
    const d = phaseLock(p.phase);
    return Math.round((a + b + c + d) / 4);
  }

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
        {[...PROJECTS]
  .sort((a, b) => avgLock(b) - avgLock(a))
  .map((p) => (
          <Link key={p.id} href={`/projects/${p.slug}`} className="pj-card">
           <div className="pj-top">
  <div className="pj-id">
    {p.id} <span className="pj-lockchip">L{avgLock(p)}/5</span>
  </div>
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
            {/* Mini Lock Meter (summary) */}
            <div className="pj-mini">
              <div className="pj-mini-k">Irreversibility Lock</div>
              <div className="pj-mini-meter" aria-label={`Lock level ${avgLock(p)} of 5`}>
                <div
                  className="pj-mini-fill"
                  style={{ width: `${(avgLock(p) / 5) * 100}%` }}
                />
              </div>
              <div className="pj-mini-note">Level {avgLock(p)}/5</div>
            </div>

            <div className="pj-open">Open →</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
