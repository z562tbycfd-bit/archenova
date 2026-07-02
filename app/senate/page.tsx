import Link from "next/link";
import Reveal from "../components/Reveal";

import { programs } from "@/lib/programs";
import { getProgramEvidence } from "@/lib/programEvidence";
import { getLatestResolutions } from "@/lib/senateResolutions";
import { getSenateChamberAgenda } from "@/lib/senateChamber";
import { getSenateExternalIntelligence } from "@/lib/senateExternalIntelligence";
import { getSenateAgendaFromReports } from "@/lib/senateAgendaEngine";

const deliberationFlow = [
  "Sources",
  "Signals",
  "Reports",
  "Evidence",
  "Senate",
  "Court",
  "Resolution",
  "Programs",
];

const timelineStages = [
  {
    title: "Incoming Signals",
    status: "completed",
    body: "Latest scientific, technological, and civilizational changes are collected through Signals.",
  },
  {
    title: "Agenda Formation",
    status: "completed",
    body: "Reports are organized into constitutional questions before entering the Senate.",
  },
  {
    title: "Current Deliberation",
    status: "current",
    body: "The Senate evaluates evidence, implications, coherence, and long-term civilizational impact.",
  },
  {
    title: "Institution Opinions",
    status: "pending",
    body: "Episteme, Builder, Institute, and Capital provide institutional perspectives.",
  },
  {
    title: "Draft Resolution",
    status: "pending",
    body: "The Senate prepares a provisional direction before Court review.",
  },
];

export default function SenatePage() {
  const external = getSenateExternalIntelligence();

  const agendaPrograms = programs
    .filter((program) =>
      ["Active", "Builder", "Proposed"].includes(program.status),
    )
    .sort((a, b) => b.ledger.completion - a.ledger.completion)
    .slice(0, 5);

  const latestResolutions = getLatestResolutions(6);
  const chamberAgenda = getSenateChamberAgenda();
  const generatedAgenda = getSenateAgendaFromReports(8);

  return (
    <main className="page-standard senate-page">
      <section className="programs-hero senate-hero">
        <Reveal>
          <span className="home-section-label">ARCHENOVA SENATE</span>

          <h1>
            Signals become
            <br />
            deliberation.
          </h1>

          <p className="page-lead">
            Senate reads Signals, generated Reports, external
            evidence, and ArcheNova Programs before forming civilizational
            resolutions.
          </p>

          <div className="crossing-gate-wrap">
            <Link href="/architecture" className="crossing-gate-link">
              Signals & Reports →
            </Link>

            <Link href="/court" className="crossing-gate-link">
              Court Review →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="glass-block senate-intelligence-block">
        <Reveal>
          <span className="home-section-label">EXTERNAL INTELLIGENCE DOCKET</span>

          <h2>Latest world signals entering Senate.</h2>

          <p className="page-lead">
            Updated {new Date(external.updated).toLocaleString()}
          </p>

          <div className="research-roadmap">
            {deliberationFlow.map((item, index) => (
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

      <section className="glass-block senate-timeline-block">
        <Reveal>
          <span className="home-section-label">DELIBERATION TIMELINE</span>

          <h2>Current stage of Senate deliberation.</h2>

          <div className="senate-timeline">
            {timelineStages.map((stage) => (
              <div
                key={stage.title}
                className={`senate-stage ${stage.status}`}
              >
                <div className="senate-stage-dot" />

                <div className="senate-stage-content">
                  <strong>{stage.title}</strong>
                  <p>{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block senate-chamber-block">
        <Reveal>
          <span className="home-section-label">SENATE CHAMBER</span>

          <h2>
            The Great Round Table of
            <br />
            Civilizational Deliberation.
          </h2>

          <p className="page-lead">
            Every Signal, Report, Program, and Evidence converges into a single
            deliberation space before constitutional judgment.
          </p>

          <div className="senate-chamber">
            <div className="senate-node north">
              <span>Signals</span>
            </div>

            <div className="senate-node west">
              <span>Reports</span>
            </div>

            <div className="senate-node east">
              <span>Programs</span>
            </div>

            <div className="senate-node southwest">
              <span>Evidence</span>
            </div>

            <div className="senate-node southeast">
              <span>Opinions</span>
            </div>

            <div className="senate-node south">
              <span>Resolution</span>
            </div>

            <div className="senate-roundtable">
              <div className="senate-roundtable-core">
                <div className="senate-core-symbol">◎</div>

                <h3>
                  Current
                  <br />
                  Deliberation
                </h3>

                <p>Constitutional evaluation in progress</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">DERIVED SIGNALS</span>

          <h2>Signals under observation.</h2>

          <div className="research-report-grid">
            {external.signals.slice(0, 6).map((signal) => (
              <a
                key={signal.id}
                href={signal.href}
                target="_blank"
                rel="noreferrer"
                className="research-report-card senate-signal-card"
              >
                <div className="feed-source">
                  {signal.source} · {signal.category} · Score {signal.score}/10
                </div>

                <h3>{signal.title}</h3>

                <p>{signal.implication}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">GENERATED REPORTS</span>

          <h2>Signals converted into structured interpretation.</h2>

          <div className="research-report-grid">
            {external.reports.slice(0, 6).map((report) => (
              <Link
                key={report.slug}
                href={report.href}
                className="research-report-card senate-report-card"
              >
                <div className="feed-source">
                  {report.source} · {report.category} · Score {report.score}/10
                </div>

                <h3>{report.title}</h3>

                <p>{report.summary}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block senate-agenda-engine-block">
  <Reveal>
    <span className="home-section-label">SENATE AGENDA ENGINE</span>

    <h2>Reports become deliberation agenda.</h2>

    <div className="senate-agenda-engine-grid">
      {generatedAgenda.map((item) => (
        <article
          key={item.id}
          className="senate-agenda-engine-card"
        >
          <div className="senate-agenda-engine-meta">
            Rank {item.rank} · {item.category} · Score {item.score}/10 ·{" "}
            {item.priority}
          </div>

          <h3>{item.title}</h3>

          <p className="senate-agenda-question">{item.question}</p>

          <div className="senate-agenda-detail">
            <strong>Rationale</strong>
            <p>{item.rationale}</p>
          </div>

          <div className="senate-agenda-detail">
            <strong>Constitutional Concern</strong>
            <p>{item.constitutionalConcern}</p>
          </div>

          <div className="senate-agenda-action">
            <span>{item.action}</span>
            <p>{item.recommendedPath}</p>
          </div>
        </article>
      ))}
    </div>
  </Reveal>
</section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM AGENDA</span>

          <h2>Programs entering deliberation.</h2>

          <div className="research-report-grid">
            {agendaPrograms.map((program) => {
              const evidence = getProgramEvidence(program);

              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="research-report-card"
                >
                  <div className="feed-source">
                    {program.ledger.programId} · {program.status} ·{" "}
                    {program.ledger.priority}
                  </div>

                  <h3>{program.title}</h3>

                  <p>{program.summary}</p>

                  <div className="plaza-hint">
                    Signals {evidence.signals.length} · Reports{" "}
                    {evidence.reports.length} · Senate{" "}
                    {evidence.senate.length}
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">CIVILIZATION DELIBERATION</span>

          <h2>Program scores across civilization dimensions.</h2>

          <div className="research-report-grid">
            {chamberAgenda.map((agenda) => (
              <article key={agenda.programSlug} className="research-report-card">
                <div className="feed-source">
                  {agenda.programId} · Score {agenda.overallScore}/10 ·{" "}
                  {agenda.recommendation}
                </div>

                <h3>{agenda.title}</h3>

                <div className="senate-score-grid">
                  {agenda.deliberationScores.map((score) => (
                    <div key={score.dimension} className="senate-score-row">
                      <span>{score.dimension}</span>
                      <strong>{score.score}/10</strong>
                    </div>
                  ))}
                </div>

                <div className="senate-implication-block">
                  <p>{agenda.builderImplication}</p>
                  <p>{agenda.instituteImplication}</p>
                  <p>{agenda.capitalImplication}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">SENATE OPINIONS</span>

          <h2>Deliberation by institutional lens.</h2>

          <div className="research-report-grid">
            {chamberAgenda.map((agenda) => (
              <article key={agenda.programSlug} className="research-report-card">
                <div className="feed-source">{agenda.programId}</div>

                <h3>{agenda.title}</h3>

                {agenda.opinions.map((opinion) => (
                  <div key={opinion.role} className="senate-opinion-block">
                    <strong>
                      {opinion.role} · {opinion.title}
                    </strong>
                    <p>{opinion.opinion}</p>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block senate-resolution-document-block">
        <Reveal>
          <span className="home-section-label">SENATE RESOLUTION</span>

          <h2>
            Provisional acts of
            <br />
            civilizational direction.
          </h2>

          <div className="senate-resolution-documents">
            {chamberAgenda.slice(0, 3).map((agenda, index) => (
              <article
                key={agenda.programSlug}
                className="senate-resolution-document"
              >
                <div className="senate-resolution-header">
                  <span>Resolution</span>
                  <strong>ARSN-{String(index + 1).padStart(3, "0")}</strong>
                </div>

                <div className="senate-resolution-seal">Ⅰ</div>

                <h3>{agenda.title}</h3>

                <p className="senate-resolution-question">
                  {agenda.question}
                </p>

                <div className="senate-resolution-body">
                  <p>
                    The Senate provisionally recognizes this agenda as requiring
                    structured civilizational review under the principles of
                    evidence, feasibility, continuity, and constitutional
                    coherence.
                  </p>

                  <p>
                    Recommended direction:{" "}
                    <strong>{agenda.recommendation}</strong>
                  </p>

                  <p>Draft resolution: {agenda.resolutionDraft}</p>
                </div>

                <div className="senate-resolution-footer">
                  <span>Status: Draft</span>
                  <span>Next: {agenda.nextAction}</span>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block senate-constitution-check-block">
        <Reveal>
          <span className="home-section-label">CONSTITUTION CHECK</span>

          <h2>
            Every resolution must pass
            <br />
            constitutional coherence.
          </h2>

          <p className="page-lead">
            Senate resolutions remain provisional until they are tested against
            the Constitution, Foundation, evidence quality, and long-term
            continuity.
          </p>

          <div className="senate-check-grid">
            {chamberAgenda.slice(0, 4).map((agenda) => (
              <article key={agenda.programSlug} className="senate-check-card">
                <div className="senate-check-header">
                  <span>{agenda.programId}</span>
                  <strong>Under Review</strong>
                </div>

                <h3>{agenda.title}</h3>

                <div className="senate-check-list">
                  <div className="senate-check-row passed">
                    <span>Constitution</span>
                    <strong>Aligned</strong>
                  </div>

                  <div className="senate-check-row passed">
                    <span>Foundation</span>
                    <strong>Coherent</strong>
                  </div>

                  <div className="senate-check-row caution">
                    <span>Evidence</span>
                    <strong>Requires review</strong>
                  </div>

                  <div className="senate-check-row pending">
                    <span>Court</span>
                    <strong>Pending</strong>
                  </div>
                </div>

                <p className="senate-check-note">
                  This agenda may proceed only after Court confirms that the
                  draft direction remains consistent with ArcheNova&apos;s
                  constitutional constraints.
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">RESOLUTION HISTORY</span>

          <h2>Recent Senate Resolutions.</h2>

          <div className="research-report-grid">
            {latestResolutions.map((resolution) => (
              <Link
                key={resolution.id}
                href={`/programs/${resolution.programSlug}`}
                className="research-report-card"
              >
                <div className="feed-source">
                  {resolution.id} · {resolution.status}
                </div>

                <h3>{resolution.title}</h3>

                <p>{resolution.decision}</p>

                <div className="plaza-hint">Next: {resolution.nextAction}</div>
              </Link>
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