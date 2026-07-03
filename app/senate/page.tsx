import Link from "next/link";
import Reveal from "../components/Reveal";

import { programs } from "@/lib/programs";
import { getProgramEvidence } from "@/lib/programEvidence";
import { getLatestResolutions } from "@/lib/senateResolutions";
import { getSenateChamberAgenda } from "@/lib/senateChamber";
import { getSenateExternalIntelligence } from "@/lib/senateExternalIntelligence";
import { getSenateAgendaFromReports } from "@/lib/senateAgendaEngine";
import { getSenateConsensus } from "@/lib/senateConsensusEngine";


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
  const consensus=getSenateConsensus();

  return (
    <main className="page-standard senate-page">
     <section className="programs-hero senate-hero senate-entrance">

 <Reveal>

   <span className="home-section-label">
     ARCHENOVA SENATE
   </span>

   <div className="senate-entrance-seal">

     <div className="senate-entrance-ring">

       <div className="senate-entrance-core">
         ♖
       </div>

     </div>

   </div>

   <h1>
     Entrance Hall
   </h1>

   <h2 className="senate-entrance-title">
     The Great Senate
     <br />
     of ArcheNova
   </h2>

   <p className="page-lead">

     Every scientific discovery,

     technological capability,

     institutional proposal,

     and civilizational question

     enters this chamber

     before becoming direction.

   </p>

   <div className="senate-entrance-statement">

     <div>

       <span>MISSION</span>

       <strong>

         Preserve constitutional coherence.

       </strong>

     </div>

     <div>

       <span>PURPOSE</span>

       <strong>

         Transform evidence into civilization.

       </strong>

     </div>

     <div>

       <span>CURRENT STATUS</span>

       <strong>

         Deliberation in Progress

       </strong>

     </div>

   </div>

   <div className="crossing-gate-wrap">

     <Link
     href="/architecture"
     className="crossing-gate-link">

       Evidence →
     </Link>

     <Link
     href="/court"
     className="crossing-gate-link">

       Constitutional Review →
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

      <section className="glass-block senate-current-deliberation">

  <Reveal>

    <span className="home-section-label">
      CURRENT DELIBERATION
    </span>

    <h2>
      Matters currently
      <br />
      before the Senate.
    </h2>

    <p className="page-lead">
      The Senate is presently evaluating the highest-priority
      scientific, technological, and civilizational questions
      generated from live Signals, Reports, and institutional
      evidence.
    </p>

    <div className="senate-current-grid">

      {generatedAgenda.slice(0,3).map((item)=>(

        <article
          key={item.id}
          className="senate-current-card"
        >

          <div className="senate-current-rank">

            #{item.rank}

          </div>

          <div className="feed-source">

            {item.category}

            ·

            Score {item.score}/10

          </div>

          <h3>

            {item.title}

          </h3>

          <div className="senate-current-question">

            {item.question}

          </div>

          <div className="senate-current-status">

            Deliberation in Progress

          </div>

        </article>

      ))}

    </div>

  </Reveal>

</section>



<section className="glass-block senate-evidence-wall-block">
  <Reveal>
    <span className="home-section-label">EVIDENCE WALL</span>

    <h2>
      Signals, Reports,
      <br />
      and Programs converge.
    </h2>

    <p className="page-lead">
      Evidence Wall integrates external Signals, generated Reports, and
      ArcheNova Programs into one review surface before Senate deliberation.
    </p>

    <div className="senate-evidence-wall">
      <div className="senate-evidence-column">
        <div className="senate-evidence-column-head">
          <span>01</span>
          <strong>Signals</strong>
        </div>

        {external.signals.slice(0, 4).map((signal) => (
          <a
            key={signal.id}
            href={signal.href}
            target="_blank"
            rel="noreferrer"
            className="senate-evidence-item"
          >
            <span>{signal.source} · {signal.category}</span>
            <strong>{signal.title}</strong>
            <p>Score {signal.score}/10</p>
          </a>
        ))}
      </div>

      <div className="senate-evidence-column senate-evidence-column-main">
        <div className="senate-evidence-column-head">
          <span>02</span>
          <strong>Reports</strong>
        </div>

        {external.reports.slice(0, 4).map((report) => (
          <Link
            key={report.slug}
            href={report.href}
            className="senate-evidence-item"
          >
            <span>{report.source} · {report.category}</span>
            <strong>{report.title}</strong>
            <p>{report.summary}</p>
          </Link>
        ))}
      </div>

      <div className="senate-evidence-column">
        <div className="senate-evidence-column-head">
          <span>03</span>
          <strong>Programs</strong>
        </div>

        {agendaPrograms.slice(0, 4).map((program) => {
          const evidence = getProgramEvidence(program);

          return (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="senate-evidence-item"
            >
              <span>
                {program.ledger.programId} · {program.status}
              </span>
              <strong>{program.title}</strong>
              <p>
                Signals {evidence.signals.length} · Reports{" "}
                {evidence.reports.length} · Senate {evidence.senate.length}
              </p>
            </Link>
          );
        })}
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

      <section className="glass-block senate-debate-block">
  <Reveal>
    <span className="home-section-label">
      INSTITUTION DEBATE
    </span>

    <h2>
      Four institutions debate
      <br />
      before constitutional judgment.
    </h2>

    <p className="page-lead">
      Every agenda is examined from four permanent institutional
      perspectives before the Senate prepares a Resolution.
    </p>

    <div className="senate-debate-grid">

      {chamberAgenda.slice(0,4).map((agenda)=>(

        <article
          key={agenda.programSlug}
          className="senate-debate-card"
        >

          <div className="senate-debate-header">

            <span>{agenda.programId}</span>

            <strong>
              Under Debate
            </strong>

          </div>

          <h3>{agenda.title}</h3>

          {agenda.opinions.map((opinion)=>(

            <div
              key={opinion.role}
              className="senate-debate-opinion"
            >

              <div className="senate-role">

                {opinion.role}

              </div>

              <div className="senate-role-body">

                <strong>
                  {opinion.title}
                </strong>

                <p>
                  {opinion.opinion}
                </p>

              </div>

            </div>

          ))}

        </article>

      ))}

    </div>

  </Reveal>
</section>

<section className="glass-block senate-consensus-block">
  <Reveal>

    <span className="home-section-label">
      CONSENSUS FORMATION
    </span>

    <h2>
      Consensus emerges
      <br />
      from institutional debate.
    </h2>

    <p className="page-lead">
      The Senate compares institutional positions before drafting a
      constitutional direction.
    </p>

    <div className="senate-consensus-grid">

      {chamberAgenda.slice(0,4).map((agenda)=>(

        <article
          key={agenda.programSlug}
          className="senate-consensus-card"
        >

          <div className="feed-source">

            {agenda.programId}

          </div>

          <h3>{agenda.title}</h3>

          <div className="senate-consensus-section">

            <strong>
              Areas of Agreement
            </strong>

            <p>
              Scientific validity, engineering feasibility,
              institutional preservation,
              and long-term civilization value are broadly supported.
            </p>

          </div>

          <div className="senate-consensus-section">

            <strong>
              Points of Debate
            </strong>

            <p>
              Resource allocation,
              implementation timing,
              operational risk,
              and constitutional priority remain under discussion.
            </p>

          </div>

          <div className="senate-consensus-final">

            <span>
              Senate Consensus
            </span>

            <strong>
              {agenda.recommendation}
            </strong>

          </div>

        </article>

      ))}

    </div>

  </Reveal>
</section>

      <section className="glass-block senate-resolution-hall-block">
  <Reveal>
    <span className="home-section-label">RESOLUTION HALL</span>

    <h2>
      Provisional resolutions
      <br />
      become institutional acts.
    </h2>

    <p className="page-lead">
      Resolution Hall formalizes Senate consensus into provisional acts of
      civilizational direction before Court review.
    </p>

    <div className="senate-resolution-hall">
      {consensus.slice(0, 3).map((item, index) => (
        <article key={item.programSlug} className="senate-resolution-act">
          <div className="senate-resolution-act-top">
            <span>ArcheNova Senate Resolution</span>
            <strong>ARSN-{String(index + 1).padStart(3, "0")}</strong>
          </div>

          <div className="senate-resolution-act-seal">Ⅰ</div>

          <h3>{item.title}</h3>

          <div className="senate-resolution-act-meta">
            <div>
              <span>Consensus</span>
              <strong>{item.consensusLevel}</strong>
            </div>

            <div>
              <span>Score</span>
              <strong>{item.consensusScore}/10</strong>
            </div>

            <div>
              <span>Next</span>
              <strong>{item.nextInstitution}</strong>
            </div>
          </div>

          <div className="senate-resolution-act-body">
            <p>
              The Senate provisionally recognizes this agenda as requiring
              institutional direction under the principles of evidence,
              feasibility, continuity, and constitutional coherence.
            </p>

            <p>
              <strong>Final Recommendation:</strong>{" "}
              {item.finalRecommendation}
            </p>
          </div>

          <div className="senate-resolution-act-clause">
            <strong>Resolved</strong>
            <p>
              This matter shall proceed according to the Senate&apos;s
              provisional recommendation and remain subject to constitutional
              review before execution.
            </p>
          </div>

          <div className="senate-resolution-act-footer">
            <span>Status: Provisional</span>
            <span>Pending: Court Review</span>
          </div>
        </article>
      ))}
    </div>
  </Reveal>
</section>

      <section className="glass-block senate-constitution-review-block">
  <Reveal>
    <span className="home-section-label">CONSTITUTION REVIEW</span>

    <h2>
      Every resolution must pass
      <br />
      constitutional review.
    </h2>

    <p className="page-lead">
      Before execution, each Senate Resolution is reviewed against the
      Constitution, Foundation, Evidence, Continuity, and Court authority.
    </p>

    <div className="senate-review-grid">
      {consensus.slice(0, 4).map((item) => (
        <article key={item.programSlug} className="senate-review-card">
          <div className="senate-review-header">
            <span>{item.programId}</span>
            <strong>{item.nextInstitution}</strong>
          </div>

          <h3>{item.title}</h3>

          <div className="senate-review-checklist">
            <div className="senate-review-row passed">
              <span>Constitution</span>
              <strong>Aligned</strong>
            </div>

            <div className="senate-review-row passed">
              <span>Foundation</span>
              <strong>Coherent</strong>
            </div>

            <div className="senate-review-row caution">
              <span>Evidence</span>
              <strong>Review Required</strong>
            </div>

            <div className="senate-review-row pending">
              <span>Court</span>
              <strong>Pending</strong>
            </div>

            <div className="senate-review-row passed">
              <span>Continuity</span>
              <strong>Preserved</strong>
            </div>
          </div>

          <div className="senate-review-verdict">
            <span>Review Verdict</span>
            <strong>{item.finalRecommendation}</strong>
          </div>
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