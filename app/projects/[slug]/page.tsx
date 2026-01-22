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
    evidenceArtifacts: string[]; // later: PDFs, specs, drawings
    phaseGate: Record<Phase, string[]>;
  };
};

const PROJECTS: Record<string, ProjectDetail> = {
  "project-001": {
    id: "Project 001",
    slug: "project-001",
    title: "Underground Long-Duration Energy Storage",
    phase: "Concept",
    fixedIrreversibleCondition:
      "Once embedded underground, the system must remain safe-by-design without continuous intervention; abandonment is structurally disallowed.",
    targetScale: {
      years: "30–100+ years",
      generations: "1–3 generations",
      capital: "Infrastructure-grade (locked capital, low reversibility)",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Safety-by-design requirement (no dependency on continuous monitoring to remain non-catastrophic).",
        "Geological embedding as a long-term custody constraint (cannot be casually relocated).",
        "Commitment structure: capital is locked, exit is costly by design.",
      ],
      evidenceArtifacts: [
        "Concept note (PDF) — to be attached",
        "Site/geo assumptions (document) — to be attached",
        "Failure mode map (diagram) — to be attached",
      ],
      phaseGate: {
        Concept: [
          "Define non-negotiable safety constraints (what must never happen).",
          "Specify boundary conditions (site, materials, containment logic).",
          "Produce failure-mode map and mitigation by structure (not by reaction).",
        ],
        Prototype: [
          "Demonstrate bounded failure behavior in representative conditions.",
          "Validate containment pathways and degradation limits.",
          "Show maintainability without increasing long-run complexity.",
        ],
        Deployment: [
          "Custody + decommission plan locked contractually.",
          "Monitoring becomes confirmatory, not safety-critical.",
          "Long-horizon accountability assigned (no responsibility escape).",
        ],
      },
    },
  },

  "project-002": {
    id: "Project 002",
    slug: "project-002",
    title: "Quantum Memory Infrastructure (Boundary-Stabilized)",
    phase: "Prototype",
    fixedIrreversibleCondition:
      "Stability must be achieved via physical boundary design (materials/geometry/interfaces), not perpetual correction loops.",
    targetScale: {
      years: "10–30 years",
      generations: "1 generation",
      capital: "Deep-tech scale (capex + long R&D horizon)",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Architecture prioritizes long-lived memory as the anchoring layer.",
        "Failure modes are removed by interface/geometry design, not by control density.",
        "Scalability must not accumulate irreversible operational complexity.",
      ],
      evidenceArtifacts: [
        "Prototype note (PDF) — to be attached",
        "Interface stack assumptions — to be attached",
        "Coherence budget + failure bounds — to be attached",
      ],
      phaseGate: {
        Concept: [
          "Define memory-first architecture and refusal conditions.",
          "Specify materials/thermal/optical boundary constraints.",
          "State required lifetime/coherence targets.",
        ],
        Prototype: [
          "Demonstrate memory lifetime and repeatable operation.",
          "Show stability without increasing active correction burden.",
          "Publish measurable failure bounds (what it refuses to do).",
        ],
        Deployment: [
          "Integrate into a minimal operational protocol set.",
          "Prove maintainability + upgrade path without fragility.",
          "Establish custody and authentication as infrastructure primitives.",
        ],
      },
    },
  },

  "project-003": {
    id: "Project 003",
    slug: "project-003",
    title: "Irreversible Responsibility Contracts (Institutional Layer)",
    phase: "Concept",
    fixedIrreversibleCondition:
      "Accountability cannot be diluted or delegated; exit routes are removed by contractual and institutional structure.",
    targetScale: {
      years: "10–50 years",
      generations: "1–2 generations",
      capital: "Capital governance (commitment > liquidity)",
    },
    realityConnection: {
      whatIsFixedNow: [
        "Responsibility is indivisible: no diffusion across subsidiaries or intermediaries.",
        "Capital withdrawal paths are structurally blocked where irreversible risk exists.",
        "Contracts encode refusal: what cannot be allowed, even under incentives.",
      ],
      evidenceArtifacts: [
        "Contract structure memo (PDF) — to be attached",
        "Governance flow diagram — to be attached",
        "Compliance / audit boundary conditions — to be attached",
      ],
      phaseGate: {
        Concept: [
          "Define the responsibility unit (who cannot escape).",
          "Define forbidden outcomes and enforceable refusal clauses.",
          "Draft governance + audit pathways with minimal ambiguity.",
        ],
        Prototype: [
          "Pilot with a small real contract (limited scope).",
          "Test enforcement and audit cycles.",
          "Validate that escape routes are truly closed.",
        ],
        Deployment: [
          "Standardize templates and escalation procedures.",
          "Institutionalize custody and long-horizon accountability.",
          "Publish a playbook for replication.",
        ],
      },
    },
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

function PhaseBadge({ phase }: { phase: Phase }) {
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
