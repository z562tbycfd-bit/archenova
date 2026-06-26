import Link from "next/link";
import Reveal from "../components/Reveal";
import SenateCrossingsPanel from "../components/SenateCrossingsPanel";
import { programs } from "@/lib/programs";
import { getProgramEvidence } from "@/lib/programEvidence";
import { getLatestResolutions } from "@/lib/senateResolutions";
import { getSenateChamberAgenda } from "@/lib/senateChamber";


export default function SenatePage() {
  const agendaPrograms = programs
    .filter((program) =>
      ["Active", "Builder", "Proposed"].includes(program.status)
    )
    .sort((a, b) => b.ledger.completion - a.ledger.completion)
    .slice(0, 5);

  const latestResolutions = getLatestResolutions(6);

  const chamberAgenda = getSenateChamberAgenda();

  return (
    <main className="page-standard senate-page">
      <section className="programs-hero">
        <Reveal>
          <span className="home-section-label">ARCHENOVA SENATE</span>

          <h1>
            Evidence-based
            <br />
            civilizational
            <br />
            deliberation.
          </h1>

          <p className="page-lead">
            The Senate reads Programs, live Evidence, and Crossings to form
            deliberation agendas for ArcheNova.
          </p>

          <div className="crossing-gate-wrap">
            <Link href="/programs" className="crossing-gate-link">
              Open Programs →
            </Link>

            <Link href="/crossings" className="crossing-gate-link">
              Open Crossings →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">SENATE FUNCTION</span>

          <h2>From evidence to judgment.</h2>

          <div className="research-roadmap">
            {[
              "Crossings",
              "Signals",
              "Reports",
              "Evidence",
              "Programs",
              "Deliberation",
              "Resolution",
              "Builder",
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

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">CURRENT AGENDA</span>

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
          <span className="home-section-label">DELIBERATION QUESTIONS</span>

          <h2>Questions before the Senate.</h2>

          <div className="research-report-grid">
            {agendaPrograms.map((program) => (
              <article key={program.slug} className="research-report-card">
                <div className="feed-source">
                  {program.ledger.programId} · Question
                </div>

                <h3>{program.title}</h3>

                <p>
                  Should ArcheNova advance this program from{" "}
                  {program.ledger.lifecycle} toward Builder execution, Institute
                  preservation, or Capital allocation?
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">SENATE PERSPECTIVES</span>

          <h2>Deliberation lenses.</h2>

          <div className="an-grid-4">
            <div className="an-card">
              <strong>Episteme</strong>
              <p>
                Does this expand understanding, evidence, and reality discovery?
              </p>
            </div>

            <div className="an-card">
              <strong>Builder</strong>
              <p>
                Can this become a prototype, system, platform, or capability?
              </p>
            </div>

            <div className="an-card">
              <strong>Institute</strong>
              <p>Should this be preserved as institutional knowledge?</p>
            </div>

            <div className="an-card">
              <strong>Capital</strong>
              <p>Does this deserve resources, partnerships, or allocation?</p>
            </div>
          </div>
        </Reveal>
      </section>

      <SenateCrossingsPanel />

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">PROGRAM LEDGER SUMMARY</span>

          <h2>Programs under review.</h2>

          <div className="an-grid-4">
            {agendaPrograms.map((program) => (
              <div key={program.slug} className="an-card">
                <strong>{program.ledger.programId}</strong>

                <p>
                  {program.title}
                  <br />
                  {program.ledger.lifecycle} · {program.ledger.priority}
                  <br />
                  {program.ledger.completion}% complete
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

       <section className="glass-block">
        <Reveal>
          <span className="home-section-label">SENATE CHAMBER</span>

          <h2>Agenda, opinions, and draft resolutions.</h2>

          <div className="research-report-grid">
            {chamberAgenda.map((agenda) => (
              <article key={agenda.programSlug} className="research-report-card">
                <div className="feed-source">
                  {agenda.programId} · {agenda.status} · {agenda.priority}
                </div>

                <h3>{agenda.title}</h3>

                <p>{agenda.question}</p>

                <div className="plaza-hint">
                  Evidence {agenda.evidenceCount} · Lifecycle{" "}
                  {agenda.lifecycle}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

       <section className="glass-block">
        <Reveal>
          <span className="home-section-label">
            CIVILIZATION DELIBERATION
          </span>

          <h2>Program scores across civilization dimensions.</h2>

          <div className="research-report-grid">
            {chamberAgenda.map((agenda) => (
              <article
                key={agenda.programSlug}
                className="research-report-card"
              >
                <div className="feed-source">
                  {agenda.programId} · Score {agenda.overallScore}/10 ·{" "}
                  {agenda.recommendation}
                </div>

                <h3>{agenda.title}</h3>

                <div className="senate-score-grid">
                  {agenda.deliberationScores.map((score) => (
                    <div
                      key={score.dimension}
                      className="senate-score-row"
                    >
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
                    <strong>{opinion.role} · {opinion.title}</strong>
                    <p>{opinion.opinion}</p>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">DRAFT RESOLUTIONS</span>

          <h2>Provisional Senate direction.</h2>

          <div className="research-report-grid">
            {chamberAgenda.map((agenda) => (
              <article key={agenda.programSlug} className="research-report-card">
                <div className="feed-source">{agenda.programId} · Draft</div>

                <h3>{agenda.title}</h3>

                <p>{agenda.resolutionDraft}</p>

                <div className="plaza-hint">Next: {agenda.nextAction}</div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">RESOLUTION LAYER</span>

          <h2>Possible Senate outcomes.</h2>

          <div className="research-report-grid">
            {[
              "Approve for Builder",
              "Request More Evidence",
              "Archive to Institute",
              "Refer to Capital",
              "Return to Crossings",
              "Defer",
            ].map((item) => (
              <article key={item} className="research-report-card">
                <div className="feed-source">Resolution</div>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="glass-block">
        <Reveal>
          <span className="home-section-label">RESOLUTION HISTORY</span>

          <h2>Recent Senate Resolutions</h2>

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