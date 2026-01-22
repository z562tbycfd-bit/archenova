export const dynamic = "force-static";
export const dynamicParams = false;

import Link from "next/link";
import { notFound } from "next/navigation";

type Phase = "Concept" | "Prototype" | "Deployment";

type ProjectDetail = {
  id: string;
  slug: string;
  title: string;
  phase: Phase;
  fixedIrreversibleCondition: string;
  targetScale: {
    years: string;
    generations: string;
    capital: string;
  };
  realityConnection: {
    whatIsFixedNow: string[];
    evidenceArtifacts: string[];
    phaseGate: Record<Phase, string[]>;
  };
};

const PROJECTS: Record<string, ProjectDetail> = {
  "project-001": {
    id: "Project 001",
    slug: "project-001",
    title: "Fundamental Physics — Ambiguity Elimination Experiments",
    phase: "Concept",
    fixedIrreversibleCondition:
      "Measurements must remove interpretive freedom entirely; outcomes force ontology rather than admit tunable explanations.",
    targetScale: {
      years: "5–20+ years",
      generations: "1 generation",
      capital: "Precision instrumentation & cryogenic systems",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Experimental design that collapses interpretive ambiguity.",
        "Failure modes defined at design-time, not post-hoc.",
        "Signal/noise boundaries fixed structurally.",
      ],
      evidenceArtifacts: [
        "Concept experiment note (PDF)",
        "Noise floor & coherence assumptions",
        "Measurement irreversibility analysis",
      ],
      phaseGate: {
        Concept: [
          "Define measurable quantity with zero interpretive slack.",
          "Design apparatus where null results are decisive.",
          "Publish falsifiable criteria.",
        ],
        Prototype: [
          "Demonstrate bounded noise regime.",
          "Confirm reproducibility across runs.",
          "Lock measurement interpretation.",
        ],
        Deployment: [
          "Independent replication.",
          "Archive raw data permanently.",
          "Close interpretive loopholes.",
        ],
      },
    },
  },

  "project-002": {
    id: "Project 002",
    slug: "project-002",
    title: "Quantum Infrastructure — Memory-First Boundary Design",
    phase: "Prototype",
    fixedIrreversibleCondition:
      "Stability must arise from physical boundary conditions, not perpetual correction loops.",
    targetScale: {
      years: "10–30 years",
      generations: "1 generation",
      capital: "Deep-tech R&D and fabrication",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Memory-first architecture locked.",
        "Geometry & material constraints defined.",
        "Failure states structurally refused.",
      ],
      evidenceArtifacts: [
        "Prototype architecture memo",
        "Interface stack diagram",
        "Lifetime & coherence bounds",
      ],
      phaseGate: {
        Concept: [
          "Define refusal conditions.",
          "Specify boundary-driven stability.",
          "Set lifetime targets.",
        ],
        Prototype: [
          "Demonstrate memory lifetime.",
          "Bound correction overhead.",
          "Validate scalability.",
        ],
        Deployment: [
          "Operational protocol freeze.",
          "Custody & authentication layer.",
          "Long-term maintainability proof.",
        ],
      },
    },
  },

  "project-003": {
    id: "Project 003",
    slug: "project-003",
    title: "Energy Systems — Irreversible Safety-by-Design Storage",
    phase: "Concept",
    fixedIrreversibleCondition:
      "Once deployed, the system must remain non-catastrophic without safety-critical intervention.",
    targetScale: {
      years: "30–100+ years",
      generations: "1–3 generations",
      capital: "Infrastructure-grade locked capital",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Abandonment structurally disallowed.",
        "Passive safety dominates design.",
        "Geological custody assumptions fixed.",
      ],
      evidenceArtifacts: [
        "System concept note",
        "Failure mode elimination map",
        "Custody lifecycle plan",
      ],
      phaseGate: {
        Concept: [
          "Define forbidden outcomes.",
          "Map passive safety boundaries.",
          "Specify custody horizon.",
        ],
        Prototype: [
          "Demonstrate bounded failure.",
          "Validate containment.",
          "Stress-test degradation.",
        ],
        Deployment: [
          "Custody & decommission locked.",
          "Monitoring becomes confirmatory.",
          "Intergenerational accountability assigned.",
        ],
      },
    },
  },

  "project-004": {
    id: "Project 004",
    slug: "project-004",
    title: "Planetary Systems — Continuous Power as Civilization Boundary",
    phase: "Concept",
    fixedIrreversibleCondition:
      "Energy availability must be continuous and internally governed, not environmentally contingent.",
    targetScale: {
      years: "10–50 years",
      generations: "1–2 generations",
      capital: "Mission-scale planetary infrastructure",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Decoupling from day-night cycles.",
        "Internal governance of energy.",
        "Permanent presence enabled.",
      ],
      evidenceArtifacts: [
        "Mission power architecture",
        "Environmental decoupling analysis",
        "Continuity justification memo",
      ],
      phaseGate: {
        Concept: [
          "Define continuity requirement.",
          "Map dependency elimination.",
          "Set minimum reliability.",
        ],
        Prototype: [
          "Demonstrate continuous operation.",
          "Validate fault tolerance.",
          "Bound environmental coupling.",
        ],
        Deployment: [
          "Operational permanence.",
          "Industrial enablement.",
          "Civilizational lock-in.",
        ],
      },
    },
  },

  "project-005": {
    id: "Project 005",
    slug: "project-005",
    title: "AI — Constraint-First Computation",
    phase: "Prototype",
    fixedIrreversibleCondition:
      "Catastrophic trajectories must be deleted upstream via hard constraints, not managed after emergence.",
    targetScale: {
      years: "3–10 years",
      generations: "1 generation",
      capital: "Compute & governance design",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Constraint layer precedes capability.",
        "Forbidden trajectories enumerated.",
        "Legitimacy encoded structurally.",
      ],
      evidenceArtifacts: [
        "Constraint schema draft",
        "Failure trajectory taxonomy",
        "Governance binding memo",
      ],
      phaseGate: {
        Concept: [
          "Define catastrophic states.",
          "Specify refusal conditions.",
          "Formalize constraint logic.",
        ],
        Prototype: [
          "Demonstrate constraint enforcement.",
          "Test bypass resistance.",
          "Measure performance impact.",
        ],
        Deployment: [
          "Bind constraints institutionally.",
          "Audit irreversibility.",
          "Prevent rollback.",
        ],
      },
    },
  },

  "project-006": {
    id: "Project 006",
    slug: "project-006",
    title: "Medical Systems — Upstream Diagnosis Before Irreversibility",
    phase: "Concept",
    fixedIrreversibleCondition:
      "Diagnosis must expose latent dynamics before irreversible pathology manifests.",
    targetScale: {
      years: "5–15 years",
      generations: "1 generation",
      capital: "Clinical devices & validation",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Focus on clearance, flow, transfer dynamics.",
        "Shift diagnosis upstream in time.",
        "Intervention windows fixed earlier.",
      ],
      evidenceArtifacts: [
        "Diagnostic protocol concept",
        "Physiological flow models",
        "Clinical feasibility note",
      ],
      phaseGate: {
        Concept: [
          "Identify hidden dynamics.",
          "Define irreversible thresholds.",
          "Select measurable proxies.",
        ],
        Prototype: [
          "Validate early detection.",
          "Correlate with outcomes.",
          "Optimize clinical timing.",
        ],
        Deployment: [
          "Clinical integration.",
          "Regulatory alignment.",
          "Population-scale screening.",
        ],
      },
    },
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

function PhaseBadge({ phase }: { phase }) {
  return <span className={`pj-badge pj-${phase.toLowerCase()}`}>{phase}</span>;
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = PROJECTS[params.slug];
  if (!p) return notFound();

  return (
    <main className="project">
      <div className="project-top">
        <Link href="/projects" className="project-back">
          ← Back to Projects
        </Link>
        <PhaseBadge phase={p.phase} />
      </div>

      <header className="project-head">
        <div className="project-id">{p.id}</div>
        <h1>{p.title}</h1>
      </header>

      <section className="project-block">
        <h2>Fixed Irreversible Condition</h2>
        <p className="project-text">{p.fixedIrreversibleCondition}</p>
      </section>

      <section className="project-block">
        <h2>Target Scale</h2>
        <div className="project-scale">
          <div className="project-scale-row">
            <span className="project-skey">Years</span>
            <span className="project-sval">{p.targetScale.years}</span>
          </div>
          <div className="project-scale-row">
            <span className="project-skey">Generations</span>
            <span className="project-sval">{p.targetScale.generations}</span>
          </div>
          <div className="project-scale-row">
            <span className="project-skey">Capital</span>
            <span className="project-sval">{p.targetScale.capital}</span>
          </div>
        </div>
      </section>

      <section className="project-block">
        <h2>Reality Connection</h2>

        <div className="project-sub">
          <h3>What is fixed now</h3>
          <ul className="project-list">
            {p.realityConnection.whatIsFixedNow.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="project-sub">
          <h3>Evidence artifacts</h3>
          <ul className="project-list">
            {p.realityConnection.evidenceArtifacts.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="project-sub">
          <h3>Phase gates</h3>
          <div className="project-gates">
            {(["Concept", "Prototype", "Deployment"] as Phase[]).map((ph) => (
              <div key={ph} className="project-gate">
                <div className="project-gate-title">{ph}</div>
                <ul className="project-list">
                  {p.realityConnection.phaseGate[ph].map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
