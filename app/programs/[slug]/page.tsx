import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import { getProgram, programs } from "@/lib/programs";
import { getProgramEvidence } from "@/lib/programEvidence";

export function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

function EvidenceList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="research-report-card">
      <div className="feed-source">{title}</div>

      {items.length > 0 ? (
        <ul className="program-evidence-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Pending</p>
      )}
    </article>
  );
}

export default function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getProgram(params.slug);

  if (!program) {
    notFound();
  }

  const liveEvidence = getProgramEvidence(program);

  const programHistory = [
    "Program Proposed",
    "Evidence Collection",
    "Senate Deliberation",
    "Program Approved",
    "Builder Assignment",
    "Institute Registration",
    "Capital Allocation",
  ];

  const programFlow = [
    "Dialogue",
    "Evidence",
    "Deliberation",
    "Program",
    "Builder",
    "Institute",
    "Capital",
    "Capability",
  ];

  return (
    <main className="page-standard programs-page">
      <section className="programs-hero">
        <Reveal>
          <span className="home-section-label">
            {program.chapter} · {program.status} Program
          </span>

          <h1>{program.title}</h1>

          <p className="page-lead">{program.summary}</p>

          <div className="crossing-gate-wrap">
            <Link href="/programs" className="crossing-gate-link">
              Program Index →
            </Link>

            <Link href="/home" className="crossing-gate-link">
              Back to Home →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM LEDGER</span>

          <h2>Institutional Record</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>Program ID</strong>
              <p>{program.ledger.programId}</p>
            </div>

            <div className="an-card">
              <strong>Status</strong>
              <p>{program.status}</p>
            </div>

            <div className="an-card">
              <strong>Domain</strong>
              <p>{program.domain}</p>
            </div>

            <div className="an-card">
              <strong>Priority</strong>
              <p>{program.ledger.priority}</p>
            </div>

            <div className="an-card">
              <strong>Lifecycle</strong>
              <p>{program.ledger.lifecycle}</p>
            </div>

            <div className="an-card">
              <strong>Version</strong>
              <p>{program.ledger.version}</p>
            </div>

            <div className="an-card">
              <strong>Owner</strong>
              <p>{program.ledger.owner}</p>
            </div>

            <div className="an-card">
              <strong>Completion</strong>
              <p>{program.ledger.completion}%</p>
            </div>

            <div className="an-card">
              <strong>Created</strong>
              <p>{program.ledger.created}</p>
            </div>

            <div className="an-card">
              <strong>Updated</strong>
              <p>{program.ledger.updated}</p>
            </div>

            <div className="an-card">
              <strong>Visibility</strong>
              <p>{program.ledger.publicVisibility}</p>
            </div>

            <div className="an-card">
              <strong>Chapter</strong>
              <p>{program.chapter}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PURPOSE</span>

          <h2>Why this program exists.</h2>

          <p>{program.purpose}</p>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">CIVILIZATIONAL RELEVANCE</span>

          <h2>Why it matters.</h2>

          <p>{program.whyItMatters}</p>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">LIVE EVIDENCE</span>

          <h2>Automatically connected evidence.</h2>

          <p>
            This section connects the program to live ArcheNova intelligence:
            Signals, Generated Research Reports, and Generated Senate agenda.
          </p>

          <div className="research-report-grid">
            <EvidenceList
              title="Related Signals"
              items={liveEvidence.signals.map((item: any) => item.title)}
            />

            <EvidenceList
              title="Related Reports"
              items={liveEvidence.reports.map((item: any) => item.title)}
            />

            <EvidenceList
              title="Related Senate Agenda"
              items={liveEvidence.senate.map((item: any) => item.title)}
            />
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">STATIC EVIDENCE RECORD</span>

          <h2>Institutional evidence record.</h2>

          <div className="research-report-grid">
            <EvidenceList title="Reports" items={program.evidence.reports} />

            <EvidenceList title="Signals" items={program.evidence.signals} />

            <EvidenceList
              title="Crossings"
              items={program.evidence.crossings}
            />

            <EvidenceList
              title="Senate Decisions"
              items={program.evidence.senateDecisions}
            />

            <EvidenceList
              title="Builder Projects"
              items={program.evidence.builderProjects}
            />
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">SENATE</span>

          <h2>Deliberation and resolution.</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>Last Review</strong>
              <p>{program.ledger.lastSenateReview}</p>
            </div>

            <div className="an-card">
              <strong>Evidence Packages</strong>
              <p>{program.ledger.evidencePackages}</p>
            </div>

            <div className="an-card">
              <strong>Resolutions</strong>
              <p>{program.ledger.senateResolutions}</p>
            </div>

            <div className="an-card">
              <strong>Priority</strong>
              <p>{program.ledger.priority}</p>
            </div>
          </div>

          <div className="crossing-gate-wrap">
            <Link href="/senate" className="crossing-gate-link">
              Open Senate →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">BUILDER</span>

          <h2>Implementation projects.</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>Responsible Builder</strong>
              <p>{program.ledger.responsibleBuilder}</p>
            </div>

            <div className="an-card">
              <strong>Builder Projects</strong>
              <p>{program.evidence.builderProjects.length}</p>
            </div>

            <div className="an-card">
              <strong>Current Stage</strong>
              <p>{program.currentStage}</p>
            </div>

            <div className="an-card">
              <strong>Execution Status</strong>
              <p>{program.status === "Builder" ? "Building" : "Pending"}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">INSTITUTE</span>

          <h2>Knowledge preservation.</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>Institute Status</strong>
              <p>{program.ledger.instituteStatus}</p>
            </div>

            <div className="an-card">
              <strong>Archive</strong>
              <p>{program.outputs.length} outputs</p>
            </div>

            <div className="an-card">
              <strong>Memory Layer</strong>
              <p>
                {program.relatedSystems.includes("Institute")
                  ? "Linked"
                  : "Pending"}
              </p>
            </div>

            <div className="an-card">
              <strong>Continuity</strong>
              <p>Institutional</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">CAPITAL</span>

          <h2>Resource allocation.</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>Capital Status</strong>
              <p>{program.ledger.capitalStatus}</p>
            </div>

            <div className="an-card">
              <strong>Priority</strong>
              <p>{program.ledger.priority}</p>
            </div>

            <div className="an-card">
              <strong>Completion</strong>
              <p>{program.ledger.completion}%</p>
            </div>

            <div className="an-card">
              <strong>Allocation</strong>
              <p>
                {program.ledger.capitalStatus === "Pending"
                  ? "Pending"
                  : "Active"}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">ROADMAP</span>

          <h2>Development Pathway</h2>

          <div className="research-roadmap">
            {program.roadmap.map((item, index) => (
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

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM HISTORY</span>

          <h2>Institutional Timeline</h2>

          <div className="research-roadmap">
            {programHistory.map((item, index) => (
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

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">OUTPUTS</span>

          <h2>Expected Outputs</h2>

          <div className="research-report-grid">
            {program.outputs.map((output) => (
              <article key={output} className="research-report-card">
                <div className="feed-source">Output</div>
                <h3>{output}</h3>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">RELATED SYSTEMS</span>

          <h2>Connected ArcheNova Systems</h2>

          <div className="research-report-grid">
            {program.relatedSystems.map((system) => (
              <article key={system} className="research-report-card">
                <div className="feed-source">System</div>
                <h3>{system}</h3>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM FLOW</span>

          <h2>From program to capability.</h2>

          <p>
            This program connects ArcheNova&apos;s public dialogue, evidence
            generation, Senate deliberation, Builder execution, Institute
            memory, and Capital allocation into a continuous civilizational
            implementation pathway.
          </p>

          <div className="research-roadmap">
            {programFlow.map((item, index) => (
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
        <Link href="/programs" className="back-link">
          ← Back to Programs
        </Link>
      </div>
    </main>
  );
}