"use client";

import { useRef } from "react";
import Link from "next/link";

/* ==========================================================
   ARCHENOVA AETHERION
   THE CIVILIZATION MEGAFACTORY

   BLACK COSMOS × ORBITAL MANUFACTURING ARCHITECTURE

   Design → Build → Test → Correct → Reproduce

   DESIGN PRINCIPLES

   - Full-width black cosmic environment
   - A distinctive orbital megafactory visual identity
   - No giant foreground glass frame
   - Black glass reserved for interactive surfaces
   - No invented manufacturing records or performance claims
   - Independent from the frozen Valley Core
   - Responsive PC / tablet / mobile presentation
========================================================== */

const PROCESSES = [
  {
    number: "01",
    name: "ENGINEERING",
    verb: "DESIGN",
    question: "What must be physically realized?",
    description:
      "Translate validated principles and explicit requirements into an inspectable engineering specification. Define interfaces, constraints, failure modes, and the evidence required before fabrication.",
    signal: "SPECIFICATION",
  },
  {
    number: "02",
    name: "FABRICATION",
    verb: "BUILD",
    question: "What can be constructed?",
    description:
      "Convert an engineering specification into a physical artifact. Record materials, components, configurations, procedures, and changes so that the resulting build can be traced.",
    signal: "PHYSICAL ARTIFACT",
  },
  {
    number: "03",
    name: "VERIFICATION",
    verb: "TEST",
    question: "What does measurement establish?",
    description:
      "Evaluate the artifact against predefined test conditions. Preserve measurement provenance, distinguish observations from interpretations, and document both successful and unsuccessful results.",
    signal: "MEASURED EVIDENCE",
  },
  {
    number: "04",
    name: "CORRECTION",
    verb: "CORRECT",
    question: "What must change?",
    description:
      "Identify discrepancies between specification and observed behavior. Document corrective actions, retest affected functions, and retain the history of superseded configurations.",
    signal: "TRACEABLE REVISION",
  },
  {
    number: "05",
    name: "REPRODUCTION",
    verb: "REPRODUCE",
    question: "Can the result be repeated?",
    description:
      "Establish whether the relevant outcome can be reproduced under documented conditions. Keep internal repetition distinct from independent verification.",
    signal: "REPRODUCIBLE RESULT",
  },
  {
    number: "06",
    name: "RELEASE",
    verb: "TRANSFER",
    question: "What is ready to leave the factory?",
    description:
      "Prepare a documented artifact and its evidence for a separate deployment decision. A completed build does not, by itself, establish safety, approval, or public value.",
    signal: "EVIDENCE PACKAGE",
  },
] as const;

function FactoryGlyph({ className = "" }: { className?: string }) {
  return (
    <span className={`an-aetherion-glyph ${className}`} aria-hidden="true">
      <span className="an-aetherion-glyph__outer" />
      <span className="an-aetherion-glyph__middle" />
      <span className="an-aetherion-glyph__inner" />
      <span className="an-aetherion-glyph__axis" />
      <span className="an-aetherion-glyph__core" />
      <span className="an-aetherion-glyph__point an-aetherion-glyph__point--one" />
      <span className="an-aetherion-glyph__point an-aetherion-glyph__point--two" />
      <span className="an-aetherion-glyph__point an-aetherion-glyph__point--three" />
    </span>
  );
}

export default function AetherionPage() {
  const operationsRef = useRef<HTMLDivElement | null>(null);

  function enterAetherion() {
    operationsRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <main className="an-aetherion">
      {/* ==================================================
          PAGE-WIDE COSMOS
      ================================================== */}

      <div className="an-aetherion__cosmos" aria-hidden="true">
        <div className="an-aetherion__stars" />
        <div className="an-aetherion__nebula" />
        <div className="an-aetherion__dust" />
        <div className="an-aetherion__vignette" />
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="an-aetherion-hero"
        aria-labelledby="an-aetherion-title"
      >
        <div className="an-aetherion-hero__architecture" aria-hidden="true">
          <div className="an-aetherion-hero__halo" />
          <div className="an-aetherion-hero__ring an-aetherion-hero__ring--outer" />
          <div className="an-aetherion-hero__ring an-aetherion-hero__ring--middle" />
          <div className="an-aetherion-hero__ring an-aetherion-hero__ring--inner" />

          <div className="an-aetherion-hero__station">
            <div className="an-aetherion-hero__station-shell" />
            <div className="an-aetherion-hero__station-axis" />
            <div className="an-aetherion-hero__station-core" />
            <div className="an-aetherion-hero__station-light" />
          </div>

          <div className="an-aetherion-hero__orbital-path" />
          <div className="an-aetherion-hero__orbital-point an-aetherion-hero__orbital-point--one" />
          <div className="an-aetherion-hero__orbital-point an-aetherion-hero__orbital-point--two" />
          <div className="an-aetherion-hero__orbital-point an-aetherion-hero__orbital-point--three" />
        </div>

        <div className="an-aetherion-hero__horizon" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <header className="an-aetherion-hero__top">
          <Link href="/home" className="an-aetherion-back">
            <span className="an-aetherion-back__arrow" aria-hidden="true" />
            <span>ARCHENOVA</span>
          </Link>

          <div className="an-aetherion-hero__identity">
            <FactoryGlyph className="an-aetherion-glyph--small" />
            <span>PHYSICAL REALIZATION</span>
          </div>
        </header>

        <div className="an-aetherion-hero__content">
          <div className="an-aetherion-hero__eyebrow">
            <span className="an-aetherion-hero__eyebrow-line" />
            <span>ARCHENOVA · CIVILIZATION ENGINEERING</span>
          </div>

          <h1 id="an-aetherion-title">AETHERION</h1>

          <p className="an-aetherion-hero__subtitle">
            THE CIVILIZATION MEGAFACTORY
          </p>

          <p className="an-aetherion-hero__statement">
            From physical principles
            <br />
            to reproducible reality.
          </p>

          <p className="an-aetherion-hero__description">
            An ArcheNova environment for connecting engineering design,
            physical construction, measurement, correction, and
            reproducibility. Its purpose is to make the path from an idea
            to a verifiable physical result explicit.
          </p>

          <div className="an-aetherion-hero__actions">
            <button
              type="button"
              className="an-aetherion-button an-aetherion-button--primary"
              onClick={enterAetherion}
            >
              <FactoryGlyph className="an-aetherion-glyph--button" />
              <span>ENTER AETHERION</span>
              <span className="an-aetherion-button__arrow" aria-hidden="true" />
            </button>

            <Link
              href="/archenova-valley"
              className="an-aetherion-button an-aetherion-button--secondary"
            >
              <span>EXPLORE ARCHENOVA VALLEY</span>
              <span className="an-aetherion-button__arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="an-aetherion-hero__bottom" aria-hidden="true">
          <span>DESIGN</span>
          <i />
          <span>BUILD</span>
          <i />
          <span>TEST</span>
          <i />
          <span>CORRECT</span>
          <i />
          <span>REPRODUCE</span>
        </div>
      </section>

      {/* ==================================================
          MANUFACTURING ARCHITECTURE
      ================================================== */}

      <div ref={operationsRef} className="an-aetherion-operations">
        <section className="an-aetherion-intro">
          <div className="an-aetherion-intro__visual" aria-hidden="true">
            <FactoryGlyph className="an-aetherion-glyph--large" />
            <div className="an-aetherion-intro__visual-halo" />
          </div>

          <div className="an-aetherion-intro__copy">
            <span className="an-aetherion-kicker">
              THE PHYSICAL REALIZATION LAYER
            </span>

            <h2>
              Knowledge is not
              <br />
              yet capability.
            </h2>

            <p>
              AETHERION represents the physical realization layer of
              ArcheNova: the transition from validated understanding to
              engineered artifacts and measured outcomes. Every stage
              must remain open to inspection, correction, and
              reproduction.
            </p>

            <div className="an-aetherion-intro__equation">
              <span>PRINCIPLE</span>
              <i />
              <span>ARTIFACT</span>
              <i />
              <span>EVIDENCE</span>
            </div>
          </div>
        </section>

        {/* ==================================================
            PROCESS
        ================================================== */}

        <section
          id="manufacturing-architecture"
          className="an-aetherion-process"
          aria-labelledby="an-aetherion-process-title"
        >
          <div className="an-aetherion-section-heading">
            <div>
              <span className="an-aetherion-kicker">
                01 / MANUFACTURING ARCHITECTURE
              </span>

              <h2 id="an-aetherion-process-title">
                The path to
                <br />
                physical reality.
              </h2>
            </div>

            <p>
              Six distinct responsibilities connect engineering intent
              with an evidence-bearing artifact. Advancing through a
              stage does not imply that later stages have been verified.
            </p>
          </div>

          <div className="an-aetherion-process__grid">
            {PROCESSES.map((process) => (
              <article
                key={process.number}
                className="an-aetherion-process__item"
              >
                <div className="an-aetherion-process__top">
                  <span className="an-aetherion-process__number">
                    {process.number}
                  </span>

                  <span className="an-aetherion-process__signal">
                    {process.signal}
                  </span>
                </div>

                <div className="an-aetherion-process__symbol" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="an-aetherion-process__verb">
                  {process.verb}
                </span>

                <h3>{process.name}</h3>
                <h4>{process.question}</h4>
                <p>{process.description}</p>

                <div className="an-aetherion-process__foot" aria-hidden="true">
                  <span>AETHERION / {process.number}</span>
                  <i />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ==================================================
            BUILD REGISTRY
        ================================================== */}

        <section
          id="build-registry"
          className="an-aetherion-registry"
          aria-labelledby="an-aetherion-registry-title"
        >
          <div className="an-aetherion-registry__header">
            <div>
              <span className="an-aetherion-kicker">
                02 / PHYSICAL EVIDENCE
              </span>

              <h2 id="an-aetherion-registry-title">
                Build
                <br />
                Registry.
              </h2>
            </div>

            <p>
              A future connection point for documented physical builds,
              configurations, test procedures, measurements, revisions,
              and reproduction records.
            </p>
          </div>

          <div className="an-aetherion-registry__surface">
            <div className="an-aetherion-registry__top">
              <div className="an-aetherion-registry__identity">
                <FactoryGlyph className="an-aetherion-glyph--small" />

                <div>
                  <strong>AETHERION / BUILD REGISTRY</strong>
                  <span>PHYSICAL RECORD INTERFACE</span>
                </div>
              </div>

              <span className="an-aetherion-registry__state">
                NOT CONNECTED
              </span>
            </div>

            <div className="an-aetherion-registry__empty">
              <div
                className="an-aetherion-registry__empty-symbol"
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </div>

              <span>REGISTRY CONNECTION / PENDING</span>

              <h3>Evidence before declaration.</h3>

              <p>
                No live Build Registry is connected to this page.
                Physical build records, test results, and verification
                states will appear here only when an actual data source
                has been implemented and connected.
              </p>
            </div>

            <div className="an-aetherion-registry__footer" aria-hidden="true">
              <span>CONFIGURATION</span>
              <i />
              <span>MEASUREMENT</span>
              <i />
              <span>REVISION</span>
              <i />
              <span>REPRODUCTION</span>
            </div>
          </div>
        </section>

        {/* ==================================================
            VERIFICATION PRINCIPLES
        ================================================== */}

        <section className="an-aetherion-standards">
          <div className="an-aetherion-section-heading">
            <div>
              <span className="an-aetherion-kicker">
                03 / EVIDENCE REQUIREMENTS
              </span>

              <h2>
                Built to be
                <br />
                questioned.
              </h2>
            </div>

            <p>
              A physical artifact becomes a trustworthy capability only
              through documented conditions, measurable performance,
              explicit limitations, and the ability to correct or
              reproduce its results.
            </p>
          </div>

          <div className="an-aetherion-standards__grid">
            <article>
              <span>01 / TRACEABILITY</span>
              <h3>Know what was built.</h3>
              <p>
                Preserve the relationship between requirements,
                components, configuration, procedures, and the
                resulting artifact.
              </p>
            </article>

            <article>
              <span>02 / MEASUREMENT</span>
              <h3>Know what occurred.</h3>
              <p>
                Record test conditions, instruments, raw observations,
                uncertainty, and deviations from the expected result.
              </p>
            </article>

            <article>
              <span>03 / CORRECTABILITY</span>
              <h3>Keep revision possible.</h3>
              <p>
                Make failures inspectable and corrective actions
                traceable without erasing earlier configurations or
                unsuccessful tests.
              </p>
            </article>

            <article>
              <span>04 / REPRODUCIBILITY</span>
              <h3>Make results repeatable.</h3>
              <p>
                Define the conditions required to reproduce an outcome
                and distinguish internal repetition from independent
                confirmation.
              </p>
            </article>
          </div>
        </section>
      </div>

      {/* ==================================================
          TERMINUS
      ================================================== */}

      <section className="an-aetherion-terminus">
        <div className="an-aetherion-terminus__orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <FactoryGlyph className="an-aetherion-glyph--terminus" />

        <span className="an-aetherion-kicker">
          FROM PHYSICAL REALIZATION TO CIVILIZATION
        </span>

        <h2>
          Build what can
          <br />
          withstand reality.
        </h2>

        <p>
          AETHERION concerns the physical artifact and the evidence
          supporting it. Decisions about commercialization, capital,
          governance, and deployment remain separate responsibilities
          within ArcheNova Valley.
        </p>

        <div className="an-aetherion-terminus__actions">
          <Link
            href="/archenova-valley"
            className="an-aetherion-button an-aetherion-button--primary"
          >
            <span>ENTER ARCHENOVA VALLEY</span>
            <span className="an-aetherion-button__arrow" aria-hidden="true" />
          </Link>

          <Link
            href="/home"
            className="an-aetherion-button an-aetherion-button--secondary"
          >
            <span>RETURN TO ARCHENOVA</span>
            <span className="an-aetherion-button__arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          PRESENTATION
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           FOUNDATION
        ================================================== */

        .an-aetherion,
        .an-aetherion *,
        .an-aetherion *::before,
        .an-aetherion *::after {
          box-sizing: border-box;
        }

        .an-aetherion {
          --ae-white: rgba(250, 251, 253, 0.97);
          --ae-secondary: rgba(221, 226, 233, 0.76);
          --ae-muted: rgba(183, 193, 205, 0.56);
          --ae-line: rgba(235, 240, 248, 0.11);
          --ae-metal: rgba(219, 226, 237, 0.75);

          position: relative;
          isolation: isolate;

          width: 100%;
          max-width: none;
          min-width: 0;
          min-height: 100svh;

          overflow-x: clip;

          color: var(--ae-white);

          background:
            linear-gradient(
              180deg,
              #000 0%,
              #030405 24%,
              #010102 53%,
              #050607 76%,
              #000 100%
            );
        }

        .an-aetherion a,
        .an-aetherion button {
          -webkit-tap-highlight-color: transparent;
        }

        .an-aetherion a:focus-visible,
        .an-aetherion button:focus-visible {
          outline: 2px solid rgba(245, 248, 253, 0.95);
          outline-offset: 5px;
        }

        /* ==================================================
           PAGE-WIDE BLACK COSMOS
        ================================================== */

        .an-aetherion__cosmos {
          position: absolute;
          z-index: -1;

          inset: 0;

          overflow: hidden;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse 42% 13% at 78% 6%,
              rgba(187, 198, 214, 0.09),
              transparent 80%
            ),
            radial-gradient(
              ellipse 35% 12% at 14% 40%,
              rgba(145, 156, 173, 0.05),
              transparent 80%
            ),
            radial-gradient(
              ellipse 38% 15% at 81% 75%,
              rgba(172, 182, 198, 0.05),
              transparent 82%
            ),
            linear-gradient(
              180deg,
              #000 0%,
              #030405 25%,
              #010102 55%,
              #030405 78%,
              #000 100%
            );
        }

        .an-aetherion__stars {
          position: absolute;
          inset: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(247, 249, 255, 0.74) 0 0.55px,
              transparent 1.15px
            ),
            radial-gradient(
              circle,
              rgba(213, 223, 237, 0.48) 0 0.45px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.29) 0 0.35px,
              transparent 0.95px
            );

          background-size:
            211px 197px,
            319px 283px,
            149px 173px;

          background-position:
            27px 41px,
            97px 113px,
            63px 89px;

          opacity: 0.42;
        }

        .an-aetherion__nebula {
          position: absolute;

          top: -3%;
          right: -23%;

          width: 110%;
          height: min(1200px, 120svh);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse at 50% 50%,
              rgba(223, 231, 243, 0.1),
              rgba(114, 130, 153, 0.055) 25%,
              rgba(42, 52, 68, 0.025) 45%,
              transparent 72%
            );

          filter: blur(75px);
          opacity: 0.7;
        }

        .an-aetherion__dust {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              ellipse 42% 4% at 73% 8%,
              rgba(232, 238, 247, 0.08),
              transparent 96%
            ),
            radial-gradient(
              ellipse 38% 5% at 24% 48%,
              rgba(179, 191, 207, 0.045),
              transparent 96%
            ),
            radial-gradient(
              ellipse 38% 5% at 77% 79%,
              rgba(210, 220, 234, 0.045),
              transparent 96%
            );

          filter: blur(35px);
        }

        .an-aetherion__vignette {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.54),
              transparent 35%,
              transparent 70%,
              rgba(0, 0, 0, 0.28)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.16),
              transparent 18%,
              transparent 84%,
              rgba(0, 0, 0, 0.36)
            );
        }

        /* ==================================================
           AETHERION FACTORY GLYPH
        ================================================== */

        .an-aetherion-glyph {
          position: relative;

          display: inline-block;
          flex: 0 0 auto;

          width: 48px;
          height: 48px;

          color: rgba(235, 241, 250, 0.9);
        }

        .an-aetherion-glyph__outer,
        .an-aetherion-glyph__middle,
        .an-aetherion-glyph__inner,
        .an-aetherion-glyph__axis,
        .an-aetherion-glyph__core,
        .an-aetherion-glyph__point {
          position: absolute;
          display: block;
        }

        .an-aetherion-glyph__outer {
          inset: 5%;

          border: 1px solid rgba(226, 235, 248, 0.48);
          border-radius: 50%;

          transform: rotate(-29deg) scaleY(0.52);
        }

        .an-aetherion-glyph__middle {
          inset: 17%;

          border: 1px solid rgba(226, 235, 248, 0.43);
          border-radius: 50%;

          transform: rotate(34deg) scaleY(0.62);
        }

        .an-aetherion-glyph__inner {
          inset: 30%;

          border: 1px solid rgba(241, 246, 253, 0.57);
          border-radius: 50%;

          box-shadow:
            0 0 18px rgba(219, 231, 248, 0.11);
        }

        .an-aetherion-glyph__axis {
          top: 10%;
          bottom: 10%;
          left: calc(50% - 0.5px);

          width: 1px;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(232, 240, 251, 0.58) 27%,
              rgba(232, 240, 251, 0.58) 73%,
              transparent
            );
        }

        .an-aetherion-glyph__core {
          top: 43%;
          left: 43%;

          width: 14%;
          height: 14%;

          border: 1px solid rgba(250, 252, 255, 0.92);
          border-radius: 50%;

          background: rgba(241, 247, 255, 0.72);

          box-shadow:
            0 0 15px rgba(233, 242, 255, 0.5),
            0 0 30px rgba(208, 225, 248, 0.2);
        }

        .an-aetherion-glyph__point {
          width: 4%;
          height: 4%;

          border-radius: 50%;
          background: rgba(242, 247, 255, 0.92);
        }

        .an-aetherion-glyph__point--one {
          top: 30%;
          left: 10%;
        }

        .an-aetherion-glyph__point--two {
          top: 18%;
          right: 21%;
        }

        .an-aetherion-glyph__point--three {
          right: 10%;
          bottom: 30%;
        }

        .an-aetherion-glyph--small {
          width: 31px;
          height: 31px;
        }

        .an-aetherion-glyph--button {
          width: 27px;
          height: 27px;
        }

        .an-aetherion-glyph--large {
          width: min(48vw, 380px);
          height: min(48vw, 380px);
        }

        .an-aetherion-glyph--terminus {
          width: 86px;
          height: 86px;
        }

        /* ==================================================
           HERO
        ================================================== */

        .an-aetherion-hero {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: 100%;
          min-width: 0;
          min-height: 100svh;

          overflow: hidden;

          padding:
            clamp(20px, 3vw, 44px)
            clamp(16px, 4vw, 72px)
            clamp(28px, 4vw, 52px);

          background: transparent;
        }

        .an-aetherion-hero__top {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;
          gap: 18px;
        }

        .an-aetherion-back {
          display: inline-flex;
          align-items: center;

          min-height: 42px;
          gap: 12px;

          color: var(--ae-secondary);
          text-decoration: none;

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.13em;

          transition: color 0.25s ease;
        }

        .an-aetherion-back:hover {
          color: #fff;
        }

        .an-aetherion-back__arrow {
          width: 9px;
          height: 9px;

          border-left: 1px solid currentColor;
          border-bottom: 1px solid currentColor;

          transform: rotate(45deg);
        }

        .an-aetherion-hero__identity {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.13em;
        }

        /* ==================================================
           HERO ORBITAL MEGAFACTORY
        ================================================== */

        .an-aetherion-hero__architecture {
          position: absolute;
          z-index: -1;

          top: 43%;
          right: -12%;

          width: min(74vw, 1100px);
          aspect-ratio: 1;

          transform: translateY(-50%);

          pointer-events: none;
        }

        .an-aetherion-hero__halo {
          position: absolute;
          inset: 8%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(233, 241, 252, 0.12) 0%,
              rgba(130, 150, 177, 0.07) 20%,
              rgba(61, 78, 102, 0.025) 42%,
              transparent 69%
            );

          filter: blur(28px);
        }

        .an-aetherion-hero__ring {
          position: absolute;

          border: 1px solid rgba(230, 238, 250, 0.16);
          border-radius: 50%;

          box-shadow:
            inset 0 0 35px rgba(224, 235, 251, 0.025),
            0 0 36px rgba(224, 235, 251, 0.025);
        }

        .an-aetherion-hero__ring--outer {
          inset: 5%;

          transform: rotate(-25deg) scaleY(0.57);

          border-width: 2px;
          border-color: rgba(233, 240, 250, 0.21);

          animation: ae-orbit-a 42s linear infinite;
        }

        .an-aetherion-hero__ring--middle {
          inset: 17%;

          transform: rotate(34deg) scaleY(0.68);

          border-color: rgba(228, 237, 250, 0.23);

          animation: ae-orbit-b 35s linear infinite;
        }

        .an-aetherion-hero__ring--inner {
          inset: 31%;

          border-color: rgba(235, 242, 252, 0.16);

          box-shadow:
            0 0 50px rgba(224, 237, 253, 0.05);
        }

        .an-aetherion-hero__station {
          position: absolute;

          top: 33%;
          left: 33%;

          width: 34%;
          height: 34%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(220, 234, 251, 0.13),
              rgba(34, 46, 62, 0.08) 34%,
              transparent 70%
            );
        }

        .an-aetherion-hero__station-shell {
          position: absolute;
          inset: 10%;

          border: 1px solid rgba(236, 243, 253, 0.3);
          border-radius: 50%;

          background:
            repeating-conic-gradient(
              from 0deg,
              rgba(230, 239, 252, 0.11) 0deg 3deg,
              transparent 3deg 29deg
            );

          box-shadow:
            inset 0 0 38px rgba(231, 240, 252, 0.06),
            0 0 60px rgba(225, 238, 253, 0.06);

          animation: ae-station 65s linear infinite;
        }

        .an-aetherion-hero__station-axis {
          position: absolute;

          top: -15%;
          bottom: -15%;
          left: calc(50% - 1px);

          width: 2px;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(233, 241, 253, 0.15) 16%,
              rgba(238, 245, 255, 0.5) 48%,
              rgba(233, 241, 253, 0.15) 84%,
              transparent
            );
        }

        .an-aetherion-hero__station-core {
          position: absolute;

          inset: 36%;

          border: 1px solid rgba(246, 250, 255, 0.65);
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(250, 252, 255, 0.88) 0%,
              rgba(204, 225, 251, 0.3) 25%,
              rgba(89, 119, 157, 0.1) 60%,
              transparent 100%
            );

          box-shadow:
            0 0 28px rgba(232, 243, 255, 0.24),
            0 0 95px rgba(194, 221, 253, 0.09);
        }

        .an-aetherion-hero__station-light {
          position: absolute;

          inset: 47%;

          border-radius: 50%;
          background: rgba(251, 253, 255, 0.94);

          box-shadow:
            0 0 20px rgba(242, 248, 255, 0.8),
            0 0 70px rgba(210, 231, 255, 0.28);

          animation: ae-core-pulse 5s ease-in-out infinite;
        }

        .an-aetherion-hero__orbital-path {
          position: absolute;
          inset: 0;

          border: 1px dashed rgba(232, 240, 251, 0.07);
          border-radius: 50%;

          transform: rotate(18deg) scaleY(0.76);
        }

        .an-aetherion-hero__orbital-point {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;
          background: rgba(244, 249, 255, 0.88);

          box-shadow:
            0 0 15px rgba(236, 245, 255, 0.55);
        }

        .an-aetherion-hero__orbital-point--one {
          top: 20%;
          left: 20%;
        }

        .an-aetherion-hero__orbital-point--two {
          top: 31%;
          right: 11%;
        }

        .an-aetherion-hero__orbital-point--three {
          right: 23%;
          bottom: 15%;
        }

        .an-aetherion-hero__horizon {
          position: absolute;
          z-index: -1;

          right: -12%;
          bottom: -210px;

          width: 125%;
          height: 420px;

          border-top: 1px solid rgba(228, 237, 250, 0.14);
          border-radius: 50% 50% 0 0;

          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(194, 213, 239, 0.045),
              transparent 48%
            );

          pointer-events: none;
        }

        .an-aetherion-hero__horizon span {
          position: absolute;

          top: 12%;
          left: 10%;

          width: 80%;
          height: 80%;

          border-top: 1px solid rgba(226, 237, 251, 0.045);
          border-radius: 50%;
        }

        .an-aetherion-hero__horizon span:nth-child(2) {
          top: 24%;
          left: 20%;
          width: 60%;
        }

        .an-aetherion-hero__horizon span:nth-child(3) {
          top: 38%;
          left: 30%;
          width: 40%;
        }

        /* ==================================================
           HERO CONTENT
        ================================================== */

        .an-aetherion-hero__content {
          position: relative;
          z-index: 2;

          width: 100%;
          min-width: 0;

          margin: auto 0 0;
          padding: clamp(85px, 13vh, 155px) 0 0;
        }

        .an-aetherion-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: 13px;

          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.16em;
        }

        .an-aetherion-hero__eyebrow-line {
          width: 32px;
          height: 1px;

          background: rgba(238, 245, 253, 0.62);
        }

        .an-aetherion-hero__content h1 {
          max-width: 100%;

          margin: 22px 0 0;

          color: var(--ae-white);

          font-size: clamp(58px, 10.8vw, 166px);
          font-weight: 250;
          line-height: 0.96;
          letter-spacing: -0.075em;

          overflow-wrap: anywhere;

          text-shadow:
            0 4px 50px rgba(0, 0, 0, 0.6);
        }

        .an-aetherion-hero__subtitle {
          margin: 18px 0 0;

          color: rgba(235, 241, 249, 0.76);

          font-size: clamp(11px, 1.2vw, 16px);
          font-weight: 600;
          letter-spacing: 0.28em;
          line-height: 1.7;
        }

        .an-aetherion-hero__statement {
          margin: clamp(35px, 5vw, 66px) 0 0;

          color: rgba(248, 250, 254, 0.94);

          font-size: clamp(23px, 2.6vw, 38px);
          font-weight: 300;
          line-height: 1.35;
          letter-spacing: -0.035em;
        }

        .an-aetherion-hero__description {
          max-width: 760px;

          margin: 23px 0 0;

          color: var(--ae-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.85;
        }

        .an-aetherion-hero__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 13px;
          margin-top: 37px;
        }

        /* ==================================================
           BLACK GLASS ACTIONS
        ================================================== */

        .an-aetherion-button {
          position: relative;
          isolation: isolate;

          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          min-height: 54px;
          max-width: 100%;

          gap: 17px;
          padding: 12px 22px;

          overflow: hidden;

          border: 1px solid rgba(236, 243, 253, 0.22);
          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              rgba(39, 45, 54, 0.6),
              rgba(5, 7, 10, 0.76)
            );

          -webkit-backdrop-filter: blur(24px);
          backdrop-filter: blur(24px);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.09),
            0 13px 38px rgba(0, 0, 0, 0.24);

          color: var(--ae-white);
          text-decoration: none;

          cursor: pointer;

          font-family: inherit;
          font-size: 11px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.09em;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .an-aetherion-button::before {
          content: "";

          position: absolute;
          z-index: -1;

          inset: 0;

          background:
            linear-gradient(
              105deg,
              transparent 20%,
              rgba(242, 248, 255, 0.075) 50%,
              transparent 80%
            );

          transform: translateX(-125%);

          transition: transform 0.65s ease;
        }

        .an-aetherion-button:hover {
          transform: translateY(-3px);

          border-color: rgba(245, 249, 255, 0.5);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 18px 48px rgba(0, 0, 0, 0.38);
        }

        .an-aetherion-button:hover::before {
          transform: translateX(125%);
        }

        .an-aetherion-button:active {
          transform: scale(0.985);
        }

        .an-aetherion-button--primary {
          border-color: rgba(242, 247, 255, 0.38);

          background:
            linear-gradient(
              145deg,
              rgba(63, 73, 87, 0.72),
              rgba(10, 13, 18, 0.83)
            );
        }

        .an-aetherion-button--primary:hover
          .an-aetherion-glyph__outer {
          animation: ae-glyph-orbit 1.4s ease-in-out;
        }

        .an-aetherion-button--primary:hover
          .an-aetherion-glyph__core {
          box-shadow:
            0 0 20px rgba(239, 247, 255, 0.75),
            0 0 36px rgba(211, 230, 255, 0.36);
        }

        .an-aetherion-button__arrow {
          flex: 0 0 auto;

          width: 8px;
          height: 8px;

          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;

          transform: rotate(45deg);
        }

        .an-aetherion-hero__bottom {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 13px;
          margin-top: clamp(55px, 8vw, 105px);

          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        .an-aetherion-hero__bottom i {
          width: 24px;
          height: 1px;

          background: rgba(230, 239, 252, 0.17);
        }

        /* ==================================================
           OPERATIONS
        ================================================== */

        .an-aetherion-operations {
          position: relative;

          width: 100%;
          min-width: 0;

          scroll-margin-top: 16px;
        }

        .an-aetherion-kicker {
          display: block;

          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 650;
          line-height: 1.6;
          letter-spacing: 0.16em;
        }

        /* ==================================================
           INTRO — THE FACTORY CORE
        ================================================== */

        .an-aetherion-intro {
          position: relative;

          display: grid;
          grid-template-columns:
            minmax(0, 0.85fr)
            minmax(0, 1fr);

          align-items: center;

          min-height: 78svh;

          gap: clamp(35px, 7vw, 130px);

          padding:
            clamp(90px, 10vw, 155px)
            clamp(18px, 5vw, 90px);

          border-top: 1px solid rgba(234, 241, 251, 0.075);
        }

        .an-aetherion-intro__visual {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;
          min-height: 380px;
        }

        .an-aetherion-intro__visual
          .an-aetherion-glyph {
          z-index: 1;

          filter:
            drop-shadow(0 0 38px rgba(220, 234, 252, 0.12));
        }

        .an-aetherion-intro__visual-halo {
          position: absolute;

          width: min(70vw, 520px);
          aspect-ratio: 1;

          border: 1px solid rgba(229, 238, 251, 0.055);
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(211, 227, 247, 0.075),
              transparent 65%
            );

          box-shadow:
            0 0 100px rgba(208, 225, 248, 0.025);
        }

        .an-aetherion-intro__copy {
          min-width: 0;
        }

        .an-aetherion-intro__copy h2,
        .an-aetherion-section-heading h2,
        .an-aetherion-registry__header h2 {
          margin: 21px 0 0;

          color: var(--ae-white);

          font-size: clamp(43px, 5.3vw, 86px);
          font-weight: 270;
          line-height: 1.06;
          letter-spacing: -0.06em;

          overflow-wrap: break-word;
        }

        .an-aetherion-intro__copy > p {
          max-width: 700px;

          margin: 26px 0 0;

          color: var(--ae-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.9;
        }

        .an-aetherion-intro__equation {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 13px;
          margin-top: 40px;

          color: rgba(238, 244, 253, 0.82);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .an-aetherion-intro__equation i {
          width: 27px;
          height: 1px;

          background: rgba(230, 239, 252, 0.25);
        }

        /* ==================================================
           SECTION HEADING
        ================================================== */

        .an-aetherion-section-heading {
          display: grid;
          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(0, 0.75fr);

          align-items: end;

          gap: clamp(28px, 5vw, 90px);

          margin-bottom: clamp(42px, 6vw, 85px);
        }

        .an-aetherion-section-heading > p {
          max-width: 620px;

          margin: 0;

          color: var(--ae-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.85;
        }

        /* ==================================================
           PROCESS
        ================================================== */

        .an-aetherion-process {
          position: relative;

          padding:
            clamp(90px, 10vw, 155px)
            clamp(18px, 4vw, 75px);

          border-top: 1px solid rgba(234, 241, 251, 0.075);
        }

        .an-aetherion-process__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));

          gap: clamp(12px, 1.6vw, 24px);
        }

        .an-aetherion-process__item {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          min-width: 0;
          min-height: 390px;

          overflow: hidden;

          padding: clamp(21px, 2.3vw, 34px);

          border: 1px solid rgba(234, 242, 253, 0.13);
          border-radius: 24px;

          background:
            radial-gradient(
              ellipse at 85% 0%,
              rgba(214, 229, 249, 0.055),
              transparent 47%
            ),
            linear-gradient(
              145deg,
              rgba(32, 38, 47, 0.55),
              rgba(4, 6, 9, 0.77) 65%,
              rgba(0, 0, 0, 0.84)
            );

          -webkit-backdrop-filter: blur(25px);
          backdrop-filter: blur(25px);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.065),
            0 18px 50px rgba(0, 0, 0, 0.18);

          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .an-aetherion-process__item:hover {
          transform: translateY(-5px);

          border-color: rgba(237, 245, 255, 0.31);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 25px 60px rgba(0, 0, 0, 0.3);
        }

        .an-aetherion-process__top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;
        }

        .an-aetherion-process__number {
          color: rgba(240, 246, 255, 0.91);

          font-size: 26px;
          font-weight: 300;
          letter-spacing: -0.04em;
        }

        .an-aetherion-process__signal {
          color: var(--ae-muted);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.1em;
          text-align: right;
        }

        .an-aetherion-process__symbol {
          position: relative;

          width: 100%;
          height: 76px;

          margin: 25px 0 22px;
        }

        .an-aetherion-process__symbol span {
          position: absolute;

          top: 50%;
          left: 50%;

          border: 1px solid rgba(232, 241, 253, 0.19);
          border-radius: 50%;

          transform: translate(-50%, -50%);
        }

        .an-aetherion-process__symbol span:nth-child(1) {
          width: 70px;
          height: 70px;

          transform:
            translate(-50%, -50%)
            rotate(-25deg)
            scaleY(0.48);
        }

        .an-aetherion-process__symbol span:nth-child(2) {
          width: 48px;
          height: 48px;

          transform:
            translate(-50%, -50%)
            rotate(35deg)
            scaleY(0.68);
        }

        .an-aetherion-process__symbol span:nth-child(3) {
          width: 9px;
          height: 9px;

          border-color: rgba(245, 250, 255, 0.78);
          background: rgba(236, 246, 255, 0.7);

          box-shadow:
            0 0 22px rgba(222, 239, 255, 0.33);
        }

        .an-aetherion-process__verb {
          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.17em;
        }

        .an-aetherion-process__item h3 {
          margin: 11px 0 0;

          color: var(--ae-white);

          font-size: clamp(19px, 2vw, 28px);
          font-weight: 400;
          letter-spacing: 0.04em;
        }

        .an-aetherion-process__item h4 {
          margin: 19px 0 0;

          color: rgba(244, 248, 254, 0.9);

          font-size: 14px;
          font-weight: 500;
          line-height: 1.55;
        }

        .an-aetherion-process__item p {
          margin: 13px 0 0;

          color: var(--ae-secondary);

          font-size: 13px;
          line-height: 1.8;
        }

        .an-aetherion-process__foot {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          margin-top: auto;
          padding-top: 28px;

          color: var(--ae-muted);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .an-aetherion-process__foot i {
          width: 8px;
          height: 8px;

          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;

          transform: rotate(45deg);
        }

        /* ==================================================
           BUILD REGISTRY
        ================================================== */

        .an-aetherion-registry {
          position: relative;

          padding:
            clamp(95px, 10vw, 160px)
            clamp(18px, 4vw, 75px);

          border-top: 1px solid rgba(234, 241, 251, 0.075);
        }

        .an-aetherion-registry__header {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.75fr);

          align-items: end;

          gap: clamp(28px, 5vw, 90px);

          margin-bottom: clamp(45px, 6vw, 85px);
        }

        .an-aetherion-registry__header > p {
          max-width: 620px;

          margin: 0;

          color: var(--ae-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.85;
        }

        .an-aetherion-registry__surface {
          position: relative;
          isolation: isolate;

          width: 100%;
          min-width: 0;

          overflow: hidden;

          border: 1px solid rgba(235, 243, 254, 0.16);
          border-radius: 28px;

          background:
            radial-gradient(
              ellipse at 50% 30%,
              rgba(176, 199, 227, 0.055),
              transparent 55%
            ),
            linear-gradient(
              145deg,
              rgba(31, 38, 48, 0.57),
              rgba(5, 7, 11, 0.79) 58%,
              rgba(0, 0, 0, 0.9)
            );

          -webkit-backdrop-filter: blur(30px);
          backdrop-filter: blur(30px);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.075),
            0 25px 70px rgba(0, 0, 0, 0.24);
        }

        .an-aetherion-registry__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          gap: 20px;
          padding: 25px clamp(20px, 3vw, 42px);

          border-bottom: 1px solid rgba(232, 241, 253, 0.095);
        }

        .an-aetherion-registry__identity {
          display: inline-flex;
          align-items: center;
          gap: 13px;
        }

        .an-aetherion-registry__identity > div {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .an-aetherion-registry__identity strong {
          color: var(--ae-white);

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.11em;
        }

        .an-aetherion-registry__identity
          > div > span {
          color: var(--ae-muted);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .an-aetherion-registry__state {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          color: rgba(230, 238, 249, 0.72);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.1em;
        }

        .an-aetherion-registry__state::before {
          content: "";

          width: 6px;
          height: 6px;

          border: 1px solid rgba(230, 240, 252, 0.55);
          border-radius: 50%;
        }

        .an-aetherion-registry__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          min-height: 460px;

          padding:
            clamp(55px, 7vw, 105px)
            clamp(22px, 5vw, 75px);

          text-align: center;
        }

        .an-aetherion-registry__empty-symbol {
          position: relative;

          width: 100px;
          height: 100px;

          margin-bottom: 30px;
        }

        .an-aetherion-registry__empty-symbol span {
          position: absolute;

          border: 1px solid rgba(233, 242, 254, 0.3);
          border-radius: 50%;
        }

        .an-aetherion-registry__empty-symbol span:nth-child(1) {
          inset: 5%;

          transform: rotate(-30deg) scaleY(0.5);
        }

        .an-aetherion-registry__empty-symbol span:nth-child(2) {
          inset: 22%;

          transform: rotate(30deg) scaleY(0.65);
        }

        .an-aetherion-registry__empty-symbol span:nth-child(3) {
          inset: 44%;

          background: rgba(238, 247, 255, 0.72);

          box-shadow:
            0 0 20px rgba(226, 241, 255, 0.4);
        }

        .an-aetherion-registry__empty > span {
          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.14em;
        }

        .an-aetherion-registry__empty h3 {
          margin: 19px 0 0;

          color: var(--ae-white);

          font-size: clamp(27px, 3.4vw, 49px);
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: -0.045em;
        }

        .an-aetherion-registry__empty p {
          max-width: 680px;

          margin: 19px 0 0;

          color: var(--ae-secondary);

          font-size: 13px;
          line-height: 1.85;
        }

        .an-aetherion-registry__footer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 12px;
          padding: 20px;

          border-top: 1px solid rgba(232, 241, 253, 0.095);

          color: var(--ae-muted);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.09em;
        }

        .an-aetherion-registry__footer i {
          width: 19px;
          height: 1px;

          background: rgba(231, 241, 253, 0.19);
        }

        /* ==================================================
           VERIFICATION STANDARDS
        ================================================== */

        .an-aetherion-standards {
          padding:
            clamp(95px, 10vw, 160px)
            clamp(18px, 4vw, 75px);

          border-top: 1px solid rgba(234, 241, 251, 0.075);
        }

        .an-aetherion-standards__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));

          gap: clamp(12px, 1.6vw, 24px);
        }

        .an-aetherion-standards__grid article {
          min-width: 0;

          padding: 28px 0 15px;

          border-top: 1px solid rgba(236, 244, 255, 0.27);
        }

        .an-aetherion-standards__grid article > span {
          color: var(--ae-muted);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.11em;
        }

        .an-aetherion-standards__grid h3 {
          margin: 35px 0 0;

          color: var(--ae-white);

          font-size: clamp(20px, 2vw, 29px);
          font-weight: 350;
          line-height: 1.3;
          letter-spacing: -0.025em;
        }

        .an-aetherion-standards__grid p {
          margin: 17px 0 0;

          color: var(--ae-secondary);

          font-size: 13px;
          line-height: 1.85;
        }

        /* ==================================================
           TERMINUS
        ================================================== */

        .an-aetherion-terminus {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          min-height: 85svh;

          overflow: hidden;

          padding:
            clamp(100px, 12vw, 170px)
            clamp(18px, 4vw, 75px);

          border-top: 1px solid rgba(234, 241, 251, 0.075);

          text-align: center;

          background:
            radial-gradient(
              ellipse at 50% 47%,
              rgba(188, 208, 233, 0.065),
              transparent 50%
            );
        }

        .an-aetherion-terminus__orbit {
          position: absolute;
          z-index: -1;

          top: 50%;
          left: 50%;

          width: min(88vw, 1100px);
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          pointer-events: none;
        }

        .an-aetherion-terminus__orbit span {
          position: absolute;

          border: 1px solid rgba(234, 242, 253, 0.075);
          border-radius: 50%;
        }

        .an-aetherion-terminus__orbit span:nth-child(1) {
          inset: 0;

          transform: rotate(-25deg) scaleY(0.58);
        }

        .an-aetherion-terminus__orbit span:nth-child(2) {
          inset: 18%;

          transform: rotate(35deg) scaleY(0.68);
        }

        .an-aetherion-terminus__orbit span:nth-child(3) {
          inset: 35%;
        }

        .an-aetherion-terminus
          .an-aetherion-glyph--terminus {
          margin-bottom: 35px;
        }

        .an-aetherion-terminus h2 {
          max-width: 100%;

          margin: 25px 0 0;

          color: var(--ae-white);

          font-size: clamp(46px, 7.3vw, 116px);
          font-weight: 260;
          line-height: 1.02;
          letter-spacing: -0.065em;

          overflow-wrap: break-word;
        }

        .an-aetherion-terminus > p {
          max-width: 830px;

          margin: 29px 0 0;

          color: var(--ae-secondary);

          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.85;
        }

        .an-aetherion-terminus__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 14px;
          margin-top: 42px;
        }

        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes ae-orbit-a {
          from {
            transform: rotate(-25deg) scaleY(0.57);
          }

          to {
            transform: rotate(335deg) scaleY(0.57);
          }
        }

        @keyframes ae-orbit-b {
          from {
            transform: rotate(34deg) scaleY(0.68);
          }

          to {
            transform: rotate(-326deg) scaleY(0.68);
          }
        }

        @keyframes ae-station {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ae-core-pulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }

        @keyframes ae-glyph-orbit {
          0% {
            transform: rotate(-29deg) scaleY(0.52);
          }

          100% {
            transform: rotate(331deg) scaleY(0.52);
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1100px) {
          .an-aetherion-hero__architecture {
            right: -32%;
            width: 95vw;
            opacity: 0.7;
          }

          .an-aetherion-process__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .an-aetherion-standards__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 30px;
          }

          .an-aetherion-intro {
            gap: 35px;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 760px) {
          .an-aetherion__nebula {
            top: 0;
            right: -85%;

            width: 185%;
            height: 750px;

            filter: blur(50px);
            opacity: 0.53;
          }

          .an-aetherion__stars {
            opacity: 0.33;
          }

          .an-aetherion-hero {
            min-height: 100svh;

            padding: 19px 15px 28px;
          }

          .an-aetherion-back {
            font-size: 10px;
          }

          .an-aetherion-hero__identity {
            gap: 6px;
            font-size: 8px;
            letter-spacing: 0.07em;
          }

          .an-aetherion-hero__identity
            .an-aetherion-glyph {
            width: 25px;
            height: 25px;
          }

          .an-aetherion-hero__architecture {
            top: 31%;
            right: -73%;

            width: 155vw;

            opacity: 0.46;
          }

          .an-aetherion-hero__horizon {
            right: -35%;
            bottom: -135px;

            width: 170%;
            height: 280px;
          }

          .an-aetherion-hero__content {
            margin-top: 0;
            padding-top: clamp(90px, 16svh, 160px);
          }

          .an-aetherion-hero__eyebrow {
            gap: 9px;

            font-size: 9px;
            letter-spacing: 0.07em;
          }

          .an-aetherion-hero__eyebrow-line {
            width: 18px;
          }

          .an-aetherion-hero__content h1 {
            margin-top: 19px;

            font-size: clamp(40px, 10.2vw, 77px);
            letter-spacing: -0.065em;
          }

          .an-aetherion-hero__subtitle {
            margin-top: 13px;

            font-size: 9px;
            letter-spacing: 0.15em;
          }

          .an-aetherion-hero__statement {
            margin-top: 34px;

            font-size: clamp(21px, 5.3vw, 29px);
          }

          .an-aetherion-hero__description {
            font-size: 13px;
            line-height: 1.8;
          }

          .an-aetherion-hero__actions {
            flex-direction: column;
            align-items: stretch;

            gap: 10px;
            margin-top: 32px;
          }

          .an-aetherion-button {
            justify-content: space-between;

            width: 100%;
            min-height: 53px;

            font-size: 10px;
          }

          .an-aetherion-hero__bottom {
            gap: 8px;
            margin-top: 48px;

            font-size: 8px;
            letter-spacing: 0.05em;
          }

          .an-aetherion-hero__bottom i {
            width: 11px;
          }

          .an-aetherion-intro {
            grid-template-columns: minmax(0, 1fr);

            gap: 10px;

            padding: 85px 16px;
          }

          .an-aetherion-intro__visual {
            min-height: 260px;
          }

          .an-aetherion-glyph--large {
            width: min(66vw, 260px);
            height: min(66vw, 260px);
          }

          .an-aetherion-intro__visual-halo {
            width: 75vw;
          }

          .an-aetherion-intro__copy h2,
          .an-aetherion-section-heading h2,
          .an-aetherion-registry__header h2 {
            font-size: clamp(40px, 9vw, 62px);
          }

          .an-aetherion-intro__copy > p {
            font-size: 13px;
          }

          .an-aetherion-intro__equation {
            gap: 9px;

            font-size: 9px;
            letter-spacing: 0.06em;
          }

          .an-aetherion-intro__equation i {
            width: 15px;
          }

          .an-aetherion-process,
          .an-aetherion-registry,
          .an-aetherion-standards {
            padding: 85px 15px;
          }

          .an-aetherion-section-heading,
          .an-aetherion-registry__header {
            grid-template-columns: minmax(0, 1fr);

            gap: 22px;
            margin-bottom: 40px;
          }

          .an-aetherion-section-heading > p,
          .an-aetherion-registry__header > p {
            font-size: 13px;
          }

          .an-aetherion-process__grid {
            grid-template-columns: minmax(0, 1fr);

            gap: 12px;
          }

          .an-aetherion-process__item {
            min-height: 340px;

            padding: 24px;

            border-radius: 20px;
          }

          .an-aetherion-process__item h3 {
            font-size: 23px;
          }

          .an-aetherion-registry__surface {
            border-radius: 21px;
          }

          .an-aetherion-registry__top {
            padding: 20px;
          }

          .an-aetherion-registry__identity strong {
            font-size: 10px;
          }

          .an-aetherion-registry__empty {
            min-height: 400px;
            padding: 60px 22px;
          }

          .an-aetherion-registry__empty p {
            font-size: 13px;
          }

          .an-aetherion-registry__footer {
            gap: 8px;

            font-size: 8px;
            letter-spacing: 0.04em;
          }

          .an-aetherion-registry__footer i {
            width: 10px;
          }

          .an-aetherion-standards__grid {
            grid-template-columns: minmax(0, 1fr);

            gap: 24px;
          }

          .an-aetherion-standards__grid article {
            padding-top: 22px;
          }

          .an-aetherion-standards__grid h3 {
            margin-top: 22px;
          }

          .an-aetherion-terminus {
            min-height: 78svh;
            padding: 90px 16px;
          }

          .an-aetherion-terminus h2 {
            font-size: clamp(39px, 9.3vw, 69px);
          }

          .an-aetherion-terminus > p {
            font-size: 13px;
          }

          .an-aetherion-terminus__actions {
            flex-direction: column;
            align-items: stretch;

            width: 100%;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 390px) {
          .an-aetherion-hero {
            padding-right: 11px;
            padding-left: 11px;
          }

          .an-aetherion-hero__content h1 {
            font-size: clamp(37px, 9.9vw, 46px);
          }

          .an-aetherion-hero__identity {
            font-size: 7px;
          }

          .an-aetherion-process,
          .an-aetherion-registry,
          .an-aetherion-standards {
            padding-right: 11px;
            padding-left: 11px;
          }

          .an-aetherion-terminus {
            padding-right: 12px;
            padding-left: 12px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-aetherion-hero__ring--outer,
          .an-aetherion-hero__ring--middle,
          .an-aetherion-hero__station-shell,
          .an-aetherion-hero__station-light,
          .an-aetherion-button--primary:hover
            .an-aetherion-glyph__outer {
            animation: none !important;
          }

          .an-aetherion-button,
          .an-aetherion-button::before,
          .an-aetherion-process__item,
          .an-aetherion-back {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}