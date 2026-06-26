import Link from "next/link";
import Reveal from "../components/Reveal";
import {
  getActivePrograms,
  getProposedPrograms,
  getBuilderPrograms,
  getCompletedPrograms,
  getFeaturedPrograms,
  getProgramStatistics,
  programs,
  type ArcheNovaProgram,
} from "@/lib/programs";

function ProgramCard({ program }: { program: ArcheNovaProgram }) {
  return (
    <Link href={`/programs/${program.slug}`} className="research-report-card">
      <div className="feed-source">
        {program.ledger.programId} · {program.status} · {program.domain}
      </div>

      <h3>{program.title}</h3>

      <p>{program.summary}</p>

      <div className="plaza-hint">
        {program.ledger.priority} Priority · {program.ledger.completion}%
        Complete
      </div>
    </Link>
  );
}

function ProgramSection({
  label,
  title,
  description,
  items,
}: {
  label: string;
  title: string;
  description: string;
  items: ArcheNovaProgram[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="glass-block">
      <Reveal>
        <span className="home-section-label">{label}</span>

        <h2>{title}</h2>

        <p>{description}</p>

        <div className="research-report-grid">
          {items.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default function ProgramsPage() {
  const activePrograms = getActivePrograms();
  const proposedPrograms = getProposedPrograms();
  const builderPrograms = getBuilderPrograms();
  const completedPrograms = getCompletedPrograms();
  const featuredPrograms = getFeaturedPrograms(4);
  const stats = getProgramStatistics();

  return (
    <main className="page-standard programs-page">
      <section className="programs-hero">
        <Reveal>
          <span className="home-section-label">CHAPTER III · PROGRAM OS</span>

          <h1>
            Turning civilizational
            <br />
            thought into programs.
          </h1>

          <p className="page-lead">
            Programs are the implementation layer of ArcheNova: structured
            initiatives that connect public dialogue, evidence, Senate
            deliberation, Builder execution, Institute memory, and Capital
            allocation.
          </p>

          <div className="crossing-gate-wrap">
            <Link href="/home" className="crossing-gate-link">
              Back to Home →
            </Link>

            <Link href="/senate" className="crossing-gate-link">
              Open Senate →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM DASHBOARD</span>

          <h2>Current Program Status</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>{stats.total}</strong>
              <p>
                Total
                <br />
                Programs
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.active}</strong>
              <p>
                Active
                <br />
                Programs
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.builder}</strong>
              <p>
                Builder
                <br />
                Programs
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.proposed}</strong>
              <p>
                Proposed
                <br />
                Programs
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.completed}</strong>
              <p>
                Completed
                <br />
                Programs
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.high}</strong>
              <p>
                High
                <br />
                Priority
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.medium}</strong>
              <p>
                Medium
                <br />
                Priority
              </p>
            </div>

            <div className="an-card">
              <strong>{stats.critical}</strong>
              <p>
                Critical
                <br />
                Priority
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">FEATURED PROGRAMS</span>

          <h2>Programs currently shaping ArcheNova.</h2>

          <p>
            Featured programs are selected by their operational relevance,
            completion progress, and connection to ArcheNova&apos;s current
            implementation architecture.
          </p>

          <div className="research-report-grid">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM SYSTEM</span>

          <h2>From dialogue to implementation.</h2>

          <p>
            ArcheNova Programs create continuity between Crossings, live
            evidence, Senate deliberation, Builder execution, Institute memory,
            and Capital allocation.
          </p>

          <div className="research-roadmap">
            {[
              "Crossings",
              "Signals",
              "Reports",
              "Evidence",
              "Senate",
              "Program",
              "Builder",
              "Institute",
              "Capital",
            ].map((item, index) => (
              <div key={item} className="research-roadmap-step">
                <div className="research-roadmap-index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="research-roadmap-node">{item}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <ProgramSection
        label="ACTIVE PROGRAMS"
        title="Programs currently forming ArcheNova capability."
        description="Active programs are operating initiatives that are already shaping ArcheNova's intelligence, program, and implementation architecture."
        items={activePrograms}
      />

      <ProgramSection
        label="BUILDER PROGRAMS"
        title="Programs already connected to implementation."
        description="Builder programs are programs that have moved beyond concept and are connected to prototypes, execution layers, or operational systems."
        items={builderPrograms}
      />

      <ProgramSection
        label="PROPOSED PROGRAMS"
        title="Candidate programs awaiting further deliberation."
        description="Proposed programs are emerging initiatives that may become active after further evidence, Senate review, and implementation planning."
        items={proposedPrograms}
      />

      <ProgramSection
        label="COMPLETED PROGRAMS"
        title="Completed programs and archived capability records."
        description="Completed programs preserve the outputs, lessons, and institutional memory of finished ArcheNova initiatives."
        items={completedPrograms}
      />

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM INDEX</span>

          <h2>All Programs</h2>

          <p>
            The Program Index lists every ArcheNova program currently registered
            in Chapter III.
          </p>

          <div className="feed-list">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="feed-row wide"
              >
                <div className="feed-source">
                  {program.ledger.programId} · {program.status} ·{" "}
                  {program.domain}
                </div>

                <div className="feed-title">{program.title}</div>

                <div className="feed-summary">{program.summary}</div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">CHAPTER III SUMMARY</span>

          <h2>Programs convert thought into capability.</h2>

          <p>
            Chapter III establishes ArcheNova&apos;s program layer: the bridge
            between public dialogue, evidence, deliberation, implementation,
            preservation, and resource allocation.
          </p>

          <div className="research-roadmap">
            {[
              "Principles",
              "Dialogue",
              "Evidence",
              "Deliberation",
              "Program",
              "Implementation",
              "Memory",
              "Capability",
            ].map((item, index) => (
              <div key={item} className="research-roadmap-step">
                <div className="research-roadmap-index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="research-roadmap-node">{item}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="page-foot">
        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}