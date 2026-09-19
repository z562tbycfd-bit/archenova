"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import CivilizationRealizationPortal from "../components/CivilizationRealizationPortal";
import ValleyProjectsReadOnly from "../components/valley/ValleyProjectsReadOnly";

/* ==========================================================
   TYPES
========================================================== */

type ImplementationDistrictProps = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  question: string;
  children?: ReactNode;
  className?: string;
};

type ArchitectureMetricProps = {
  label: string;
  value: string;
  description: string;
};

/* ==========================================================
   IMPLEMENTATION DISTRICT
========================================================== */

function ImplementationDistrict({
  index,
  eyebrow,
  title,
  description,
  question,
  children,
  className = "",
}: ImplementationDistrictProps) {
  const id =
    title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      id={id}
      className={[
        "an-valley-district",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="an-valley-district__header">
        <div className="an-valley-district__identity">
          <div className="an-valley-district__meta">
            <span className="an-valley-district__number">
              {index}
            </span>

            <i aria-hidden="true" />

            <span>{eyebrow}</span>
          </div>

          <h2>{title}</h2>
        </div>

        <div className="an-valley-district__statement">
          <strong>{question}</strong>
          <p>{description}</p>
        </div>
      </header>

      {children && (
        <div className="an-valley-district__body">
          {children}
        </div>
      )}
    </section>
  );
}

/* ==========================================================
   ARCHITECTURE METRIC
========================================================== */

function ArchitectureMetric({
  label,
  value,
  description,
}: ArchitectureMetricProps) {
  return (
    <div className="an-valley-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{description}</p>
    </div>
  );
}

/* ==========================================================
   COMMERCIALIZATION

   Presentation only.
   No runtime commercialization state is inferred.
========================================================== */

function CommercializationDistrict() {
  return (
    <div className="an-valley-system an-valley-system--conditional">
      <div className="an-valley-conditional">
        <div className="an-valley-conditional__branch">
          <span className="an-valley-kicker">
            CONDITIONAL PATH
          </span>

          <strong className="an-valley-display">
            Commercialization
            <br />
            is not universal.
          </strong>

          <p className="an-valley-copy">
            Commercialization is entered only when
            implementation requires an adoptable
            delivery, demand, market, revenue, or
            operating model. Projects that do not
            require it continue directly toward
            capital.
          </p>
        </div>

        <div
          className="an-valley-conditional__diagram"
          aria-label="Conditional commercialization path"
        >
          <div className="an-valley-conditional__source">
            <span>PROJECT</span>
          </div>

          <div className="an-valley-conditional__routes">
            <div className="an-valley-conditional__route">
              <small>REQUIRED</small>
              <i aria-hidden="true" />
              <strong>COMMERCIALIZATION</strong>
              <i aria-hidden="true" />
              <span>CAPITAL</span>
            </div>

            <div className="an-valley-conditional__route">
              <small>NOT REQUIRED</small>
              <i aria-hidden="true" />
              <strong>DIRECT</strong>
              <i aria-hidden="true" />
              <span>CAPITAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   CAPITAL
========================================================== */

function CapitalDistrict() {
  return (
    <div className="an-valley-system">
      <div className="an-valley-system__architecture">
        <div className="an-valley-system__primary">
          <span className="an-valley-kicker">
            CAPITAL ARCHITECTURE
          </span>

          <strong className="an-valley-display">
            Bound resources
            <br />
            before scale.
          </strong>

          <p className="an-valley-copy">
            Capital is treated as implementation
            structure rather than permission to
            expand. Cost, runway, contingency,
            capital at risk, first loss, liability,
            funding sources, and failure boundaries
            must remain visible.
          </p>
        </div>

        <div className="an-valley-system__metrics">
          <ArchitectureMetric
            label="READINESS"
            value="EVIDENCE"
            description="Readiness depends on supported claims, not presentation."
          />

          <ArchitectureMetric
            label="RISK"
            value="BOUNDED"
            description="Capital exposure and failure boundaries remain explicit."
          />

          <ArchitectureMetric
            label="LIABILITY"
            value="ASSIGNED"
            description="Responsibility cannot disappear behind financing structure."
          />
        </div>
      </div>

      <div className="an-valley-system__flow">
        <span>PROJECT</span>
        <i aria-hidden="true" />
        <strong>CAPITAL</strong>
        <i aria-hidden="true" />
        <span>GOVERNANCE GATE</span>
      </div>
    </div>
  );
}

/* ==========================================================
   GOVERNANCE GATE
========================================================== */

function GovernanceGateDistrict() {
  const decisions = [
    {
      decision: "PASS",
      description: "Requirements support advancement.",
    },
    {
      decision: "CONDITIONAL",
      description:
        "Advancement remains bound to explicit conditions.",
    },
    {
      decision: "HOLD",
      description:
        "Execution pauses without destroying state or history.",
    },
    {
      decision: "REVISE",
      description:
        "The implementation must return for correction.",
    },
    {
      decision: "STOP",
      description:
        "The execution path does not advance.",
    },
  ];

  return (
    <div className="an-valley-system">
      <div className="an-valley-governance">
        <div className="an-valley-governance__intro">
          <span className="an-valley-kicker">
            RESPONSIBILITY GATE
          </span>

          <strong className="an-valley-display">
            Authority does not
            <br />
            emerge from capability.
          </strong>

          <p className="an-valley-copy">
            Deployment requires an explicit governance
            decision. Evidence and analysis may support
            that decision, but they do not grant
            themselves authority to approve execution.
          </p>
        </div>

        <div className="an-valley-governance__decisions">
          {decisions.map((item, index) => (
            <div
              key={item.decision}
              className="an-valley-governance__decision"
            >
              <span className="an-valley-governance__decision-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{item.decision}</strong>

              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="an-valley-governance__principle">
          <span>DECISION SUPPORT</span>
          <i aria-hidden="true" />
          <strong>≠</strong>
          <i aria-hidden="true" />
          <span>DECISION AUTHORITY</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   DEPLOYMENT
========================================================== */

function DeploymentDistrict() {
  const outcomes = [
    "ACCEPT",
    "CORRECT",
    "RECOVER",
    "REDESIGN",
    "SUSPEND",
    "TERMINATE",
  ];

  return (
    <div className="an-valley-system an-valley-system--deployment">
      <div className="an-valley-deployment">
        <div className="an-valley-deployment__header">
          <div>
            <span className="an-valley-kicker">
              REALITY BOUNDARY
            </span>

            <strong className="an-valley-display">
              Deployment
              <br />
              is not success.
            </strong>
          </div>

          <p className="an-valley-copy">
            Deployment creates contact with operating
            reality. Expected state and observed state
            remain distinct until explicit observation
            produces evidence of what actually occurred.
          </p>
        </div>

        <div className="an-valley-deployment__reality">
          <div className="an-valley-deployment__state">
            <span>EXPECTED REALITY</span>
            <strong>EXPECTED STATE</strong>
            <small>BEFORE OBSERVATION</small>
          </div>

          <div className="an-valley-deployment__crossing">
            <span>DEPLOY</span>
            <i aria-hidden="true" />
            <strong>REALITY</strong>
            <i aria-hidden="true" />
            <span>OBSERVE</span>
          </div>

          <div className="an-valley-deployment__state">
            <span>OBSERVED REALITY</span>
            <strong>OBSERVED STATE</strong>
            <small>AFTER REALITY CONTACT</small>
          </div>
        </div>

        <div className="an-valley-deployment__delta">
          <span>ΔREALITY</span>

          <i aria-hidden="true" />

          <div>
            {outcomes.map((outcome) => (
              <strong key={outcome}>
                {outcome}
              </strong>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   REALITY / LEARNING
========================================================== */

function RealityLearningDistrict() {
  const stages = [
    "DEPLOYMENT",
    "OBSERVATION",
    "EVIDENCE",
    "FEEDBACK",
    "LEARNING",
  ];

  const principles = [
    "REALITY",
    "EVIDENCE",
    "AUTHORITY",
    "CORRECTABILITY",
    "HISTORY",
  ];

  return (
    <section
      id="reality"
      className="an-valley-reality"
    >
      <div
        className="an-valley-reality__horizon"
        aria-hidden="true"
      />

      <div className="an-valley-reality__content">
        <span className="an-valley-reality__eyebrow">
          REALITY RETAINS VETO
        </span>

        <h2>
          Reality
          <br />
          closes the loop.
        </h2>

        <p>
          Implementation becomes knowledge only when
          observed reality can challenge expectations,
          expose contradiction, trigger correction,
          preserve history, and return evidence upstream.
        </p>

        <div className="an-valley-reality__loop">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className="an-valley-reality__loop-step"
            >
              <span className="an-valley-reality__loop-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{stage}</strong>
            </div>
          ))}

          <strong className="an-valley-reality__return-symbol">
            ↺
          </strong>
        </div>

        <div className="an-valley-reality__constitution">
          {principles.map((principle) => (
            <span key={principle}>
              {principle}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   ARCHENOVA VALLEY
========================================================== */

export default function ArcheNovaValleyPage() {
  const implementationStages = [
    {
      index: "01",
      title: "REALIZATION",
      href: "#realization",
    },
    {
      index: "02",
      title: "PROJECTS",
      href: "#projects",
    },
    {
      index: "03",
      title: "COMMERCIALIZATION",
      href: "#commercialization",
      conditional: true,
    },
    {
      index: "04",
      title: "CAPITAL",
      href: "#capital",
    },
    {
      index: "05",
      title: "GOVERNANCE",
      href: "#governance",
    },
    {
      index: "06",
      title: "DEPLOYMENT",
      href: "#deployment",
    },
  ];

  return (
    <main className="an-valley">
      {/* ==================================================
          PAGE-WIDE COSMIC ENVIRONMENT
      ================================================== */}

      <div
        className="an-valley-city"
        aria-hidden="true"
      >
        <div className="an-valley-city__stars" />
        <div className="an-valley-city__horizon" />

        <div className="an-valley-city__left">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="an-valley-city__right">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="an-valley-city__spine" />
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="an-valley__hero"
        aria-labelledby="an-valley-title"
      >
        <header className="an-valley__top">
          <Link
            href="/home"
            className="an-valley__back"
          >
            <span
              className="an-valley__back-arrow"
              aria-hidden="true"
            />

            <span>ARCHENOVA</span>
          </Link>

          <div className="an-valley__environment">
            <i aria-hidden="true" />

            <span>IMPLEMENTATION ENVIRONMENT</span>
          </div>
        </header>

        <div className="an-valley__hero-content">
          <span className="an-valley__hero-eyebrow">
            CIVILIZATION IMPLEMENTATION
          </span>

          <h1 id="an-valley-title">
            ArcheNova
            <br />
            Valley
          </h1>

          <p className="an-valley__hero-statement">
            Build what can survive reality.
          </p>

          <p className="an-valley__hero-description">
            A civilization implementation environment
            where validated knowledge is transformed
            into bounded projects, capital,
            responsibility, deployment, evidence,
            correction, and durable learning.
          </p>
        </div>

        {/* ==================================================
            EXECUTION MAP
        ================================================== */}

        <nav
          className="an-valley__map"
          aria-label="ArcheNova Valley implementation sequence"
        >
          {implementationStages.map((stage) => (
            <a
              key={stage.index}
              href={stage.href}
              className={
                stage.conditional
                  ? "is-conditional"
                  : ""
              }
            >
              <small>{stage.index}</small>

              <i aria-hidden="true" />

              <strong>{stage.title}</strong>

              {stage.conditional && (
                <span>CONDITIONAL</span>
              )}
            </a>
          ))}
        </nav>

        <div className="an-valley__hero-footer">
          <span>KNOWLEDGE</span>
          <i aria-hidden="true" />
          <span>CAPABILITY</span>
          <i aria-hidden="true" />
          <span>RESPONSIBILITY</span>
          <i aria-hidden="true" />
          <span>REALITY</span>
        </div>
      </section>

      {/* ==================================================
          IMPLEMENTATION
      ================================================== */}

      <section
        className="an-valley__implementation"
        aria-label="ArcheNova Valley implementation districts"
      >
        <div className="an-valley__implementation-head">
          <span>IMPLEMENTATION</span>

          <h2>
            From possibility
            <br />
            to reality.
          </h2>

          <p>
            Each district represents a distinct
            execution boundary. Advancement does not
            imply truth, approval, success, or
            permanence. Reality and explicit authority
            remain capable of stopping the process.
          </p>
        </div>

        <ImplementationDistrict
          index="01"
          eyebrow="KNOWLEDGE → CAPABILITY"
          title="Realization"
          question="What minimum structure would make it real?"
          description="Transform validated research into reproducible knowledge, minimum causal structure, implementable capability, correctable deployment, and durable value."
          className="an-valley-district--realization"
        >
          <div className="an-valley-realization-portal">
            <CivilizationRealizationPortal />
          </div>
        </ImplementationDistrict>

        <ImplementationDistrict
          index="02"
          eyebrow="PROJECT FORMATION"
          title="Projects"
          question="What exactly will be built?"
          description="Convert realizable capability into explicit execution objects whose objectives, requirements, resources, milestones, risks, failure criteria, and exit conditions remain inspectable."
        >
          <ValleyProjectsReadOnly />
        </ImplementationDistrict>

        <ImplementationDistrict
          index="03"
          eyebrow="CONDITIONAL VALUE PATH"
          title="Commercialization"
          question="Does implementation require a market path?"
          description="Commercialization is conditional rather than universal. It exists only when adoption, delivery, demand, revenue, manufacturing, or sustainable operation are necessary to implementation."
          className="an-valley-district--conditional"
        >
          <CommercializationDistrict />
        </ImplementationDistrict>

        <ImplementationDistrict
          index="04"
          eyebrow="CAPITAL ARCHITECTURE"
          title="Capital"
          question="What resources may responsibly be placed at risk?"
          description="Structure implementation resources while keeping capital exposure, first loss, liability, funding sources, contingency, and failure boundaries explicit."
        >
          <CapitalDistrict />
        </ImplementationDistrict>

        <ImplementationDistrict
          index="05"
          eyebrow="RESPONSIBILITY GATE"
          title="Governance"
          question="Under what explicit authority may it advance?"
          description="The implementation-level Governance Gate determines whether a specific execution path may proceed toward deployment. It is distinct from civilization-scale governance."
        >
          <GovernanceGateDistrict />
        </ImplementationDistrict>

        <ImplementationDistrict
          index="06"
          eyebrow="REAL-WORLD OPERATION"
          title="Deployment"
          question="What does reality actually permit?"
          description="Move approved implementation into explicit contact with operating reality while preserving observation, correction, recovery, suspension, termination, and evidence feedback."
        >
          <DeploymentDistrict />
        </ImplementationDistrict>
      </section>

      {/* ==================================================
          REALITY / FEEDBACK / LEARNING
      ================================================== */}

      <RealityLearningDistrict />

      {/* ==================================================
          TERMINUS
      ================================================== */}

      <section className="an-valley__terminus">
        <span>ARCHENOVA VALLEY</span>

        <h2>
          Implementation
          <br />
          remains answerable
          <br />
          to reality.
        </h2>

        <p>
          Reality retains veto. Evidence constrains
          claims. Authority constrains mutation.
          Correctability constrains scale. History
          remains inspectable.
        </p>

        <Link
          href="/home"
          className="an-valley__return"
        >
          <span>RETURN TO ARCHENOVA</span>
          <i aria-hidden="true" />
        </Link>
      </section>

      {/* ==================================================
          FULL-VIEWPORT PRESENTATION
      ================================================== */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #020304;
        }

        .an-valley,
        .an-valley *,
        .an-valley *::before,
        .an-valley *::after {
          box-sizing: border-box;
        }

        .an-valley {
          --valley-gutter: clamp(24px, 5vw, 112px);
          --valley-line: rgba(226, 236, 242, 0.12);
          --valley-muted: rgba(224, 234, 240, 0.57);
          --valley-soft: rgba(224, 234, 240, 0.38);

          position: relative;
          isolation: isolate;

          width: 100%;
          min-width: 0;
          min-height: 100svh;

          overflow: clip;

          color: #f5f8fa;

          background:
            radial-gradient(
              ellipse at 50% 5%,
              rgba(137, 169, 185, 0.09),
              transparent 29%
            ),
            linear-gradient(
              180deg,
              #050709 0%,
              #030506 40%,
              #010203 100%
            );
        }

        .an-valley a {
          -webkit-tap-highlight-color: transparent;
        }

        .an-valley a:focus-visible {
          outline: 1px solid rgba(240, 248, 252, 0.85);
          outline-offset: 6px;
        }

        /* ==================================================
           PAGE-WIDE COSMIC CITY

           Fixed background stays behind every district.
           Content scrolls normally above it.
        ================================================== */

        .an-valley-city {
          position: fixed;
          inset: 0;
          z-index: -1;

          width: 100%;
          height: 100svh;

          overflow: hidden;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 88%,
              rgba(135, 164, 178, 0.1),
              transparent 48%
            ),
            linear-gradient(
              180deg,
              #05080b 0%,
              #030506 55%,
              #010203 100%
            );
        }

        .an-valley-city__stars {
          position: absolute;
          inset: 0;

          opacity: 0.75;

          background-image:
            radial-gradient(
              circle at 12% 16%,
              rgba(255,255,255,.52) 0 .7px,
              transparent 1px
            ),
            radial-gradient(
              circle at 78% 12%,
              rgba(255,255,255,.42) 0 .6px,
              transparent 1px
            ),
            radial-gradient(
              circle at 39% 27%,
              rgba(255,255,255,.36) 0 .7px,
              transparent 1px
            ),
            radial-gradient(
              circle at 92% 39%,
              rgba(255,255,255,.3) 0 .6px,
              transparent 1px
            ),
            radial-gradient(
              circle at 25% 73%,
              rgba(255,255,255,.28) 0 .6px,
              transparent 1px
            ),
            radial-gradient(
              circle at 69% 65%,
              rgba(255,255,255,.25) 0 .6px,
              transparent 1px
            );
        }

        .an-valley-city__horizon {
          position: absolute;
          left: 50%;
          bottom: 12%;

          width: 125vw;
          height: 38%;

          transform: translateX(-50%);

          border-bottom:
            1px solid rgba(220, 236, 244, 0.12);

          border-radius: 0 0 50% 50%;

          background:
            radial-gradient(
              ellipse at 50% 100%,
              rgba(179, 208, 223, 0.13),
              transparent 55%
            );
        }

        .an-valley-city__left,
        .an-valley-city__right {
          position: absolute;
          bottom: 0;

          width: 36%;
          height: 53%;

          opacity: 0.7;
        }

        .an-valley-city__left {
          left: -3%;
          transform: perspective(900px) rotateY(10deg);
        }

        .an-valley-city__right {
          right: -3%;
          transform: perspective(900px) rotateY(-10deg);
        }

        .an-valley-city__left i,
        .an-valley-city__right i {
          position: absolute;
          bottom: 0;
          display: block;

          border:
            1px solid rgba(213, 234, 244, 0.09);

          background:
            linear-gradient(
              180deg,
              rgba(181, 210, 225, 0.06),
              rgba(8, 13, 17, 0.2) 42%,
              rgba(0, 0, 0, 0.56)
            );

          box-shadow:
            inset 0 1px 0 rgba(230, 244, 250, 0.045);
        }

        .an-valley-city__left i:nth-child(1),
        .an-valley-city__right i:nth-child(1) {
          left: 2%;
          width: 15%;
          height: 47%;
        }

        .an-valley-city__left i:nth-child(2),
        .an-valley-city__right i:nth-child(2) {
          left: 20%;
          width: 22%;
          height: 73%;
        }

        .an-valley-city__left i:nth-child(3),
        .an-valley-city__right i:nth-child(3) {
          left: 46%;
          width: 16%;
          height: 39%;
        }

        .an-valley-city__left i:nth-child(4),
        .an-valley-city__right i:nth-child(4) {
          left: 67%;
          width: 27%;
          height: 86%;
        }

        .an-valley-city__spine {
          position: absolute;
          left: 50%;
          bottom: 0;

          width: 1px;
          height: 63%;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(227, 242, 250, 0.18),
              rgba(227, 242, 250, 0.035)
            );

          box-shadow:
            0 0 36px rgba(215, 235, 246, 0.11);
        }

        /* ==================================================
           SHARED TYPOGRAPHY
        ================================================== */

        .an-valley-kicker {
          display: block;

          color: var(--valley-muted);
          font-size: 11px;
          font-weight: 550;
          letter-spacing: 0.17em;
        }

        .an-valley-display {
          display: block;

          margin-top: 22px;

          color: rgba(250, 252, 253, 0.96);

          font-size: clamp(40px, 4.4vw, 86px);
          font-weight: 280;
          line-height: 1.03;
          letter-spacing: -0.055em;
          overflow-wrap: anywhere;
        }

        .an-valley-copy {
          max-width: 67ch;

          margin: 25px 0 0;

          color: var(--valley-muted);
          font-size: clamp(14px, 1vw, 17px);
          line-height: 1.8;
        }

        /* ==================================================
           HERO
        ================================================== */

        .an-valley__hero {
          position: relative;

          min-height: 100svh;

          display: grid;
          grid-template-rows: auto 1fr auto auto;

          gap: clamp(28px, 5vh, 70px);

          padding:
            clamp(28px, 4vh, 56px)
            var(--valley-gutter)
            clamp(32px, 5vh, 64px);
        }

        .an-valley__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .an-valley__back {
          display: inline-flex;
          align-items: center;
          gap: 14px;

          color: rgba(241, 248, 251, 0.75);
          text-decoration: none;

          font-size: 11px;
          font-weight: 550;
          letter-spacing: 0.17em;

          transition: color 0.25s ease;
        }

        .an-valley__back:hover {
          color: #fff;
        }

        .an-valley__back-arrow {
          width: 9px;
          height: 9px;

          border-left: 1px solid currentColor;
          border-bottom: 1px solid currentColor;

          transform: rotate(45deg);
        }

        .an-valley__environment {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          color: var(--valley-muted);

          font-size: 10px;
          letter-spacing: 0.15em;
        }

        .an-valley__environment i {
          width: 6px;
          height: 6px;

          border: 1px solid rgba(231, 245, 251, 0.65);
          border-radius: 50%;

          box-shadow:
            0 0 14px rgba(221, 241, 250, 0.2);
        }

        .an-valley__hero-content {
          align-self: center;
          justify-self: center;

          width: 100%;

          padding: clamp(28px, 6vh, 80px) 0;

          text-align: center;
        }

        .an-valley__hero-eyebrow {
          display: block;

          color: rgba(226, 238, 244, 0.65);

          font-size: clamp(10px, 0.8vw, 13px);
          letter-spacing: 0.22em;
        }

        .an-valley__hero-content h1 {
          margin: 24px 0 0;

          color: rgba(251, 253, 254, 0.98);

          font-size: clamp(78px, 13vw, 220px);
          font-weight: 220;
          line-height: 0.86;
          letter-spacing: -0.075em;
        }

        .an-valley__hero-statement {
          margin: clamp(35px, 5vw, 72px) 0 0;

          color: rgba(248, 251, 253, 0.88);

          font-size: clamp(22px, 2.4vw, 38px);
          font-weight: 320;
          letter-spacing: -0.035em;
        }

        .an-valley__hero-description {
          max-width: 68ch;

          margin: 24px auto 0;

          color: var(--valley-muted);

          font-size: clamp(13px, 1vw, 17px);
          line-height: 1.8;
        }

        /* ==================================================
           EXECUTION MAP
        ================================================== */

        .an-valley__map {
          position: relative;

          display: grid;
          grid-template-columns:
            repeat(6, minmax(0, 1fr));

          width: 100%;

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley__map a {
          position: relative;

          min-width: 0;
          min-height: 116px;

          display: grid;
          align-content: center;
          justify-items: start;

          gap: 10px;

          padding: 18px clamp(12px, 1.8vw, 30px);

          color: rgba(235, 244, 248, 0.65);
          text-decoration: none;

          border-right: 1px solid rgba(230, 241, 247, 0.08);

          transition:
            background 0.25s ease,
            color 0.25s ease;
        }

        .an-valley__map a:first-child {
          padding-left: 0;
        }

        .an-valley__map a:last-child {
          border-right: 0;
        }

        .an-valley__map a:hover {
          color: #fff;
          background: rgba(218, 238, 249, 0.045);
        }

        .an-valley__map small {
          font-size: 11px;
          letter-spacing: 0.15em;
        }

        .an-valley__map a > i {
          width: 20px;
          height: 1px;

          background: rgba(226, 241, 249, 0.3);
        }

        .an-valley__map a.is-conditional > i {
          background:
            repeating-linear-gradient(
              90deg,
              rgba(226, 241, 249, 0.4) 0 3px,
              transparent 3px 6px
            );
        }

        .an-valley__map strong {
          font-size: clamp(9px, 0.8vw, 12px);
          font-weight: 570;
          letter-spacing: 0.075em;
          overflow-wrap: anywhere;
        }

        .an-valley__map a > span {
          color: rgba(222, 236, 243, 0.52);
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .an-valley__hero-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: clamp(12px, 2vw, 30px);

          color: rgba(230, 242, 248, 0.52);

          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .an-valley__hero-footer i {
          width: clamp(18px, 3vw, 56px);
          height: 1px;

          background: rgba(230, 242, 248, 0.18);
        }

        /* ==================================================
           IMPLEMENTATION INTRO
        ================================================== */

        .an-valley__implementation {
          position: relative;

          width: 100%;

          padding: 0 var(--valley-gutter);

          background:
            linear-gradient(
              180deg,
              rgba(2, 4, 6, 0.78),
              rgba(1, 3, 5, 0.48) 20%,
              rgba(1, 3, 5, 0.58) 80%,
              rgba(2, 4, 6, 0.8)
            );
        }

        .an-valley__implementation-head {
          min-height: 85svh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: clamp(90px, 12vh, 160px) 0;

          text-align: center;
        }

        .an-valley__implementation-head > span {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.2em;
        }

        .an-valley__implementation-head h2 {
          margin: 26px 0 0;

          color: rgba(251, 253, 254, 0.98);

          font-size: clamp(60px, 9vw, 154px);
          font-weight: 230;
          line-height: 0.9;
          letter-spacing: -0.068em;
        }

        .an-valley__implementation-head p {
          max-width: 68ch;

          margin: 35px 0 0;

          color: var(--valley-muted);

          font-size: clamp(14px, 1vw, 17px);
          line-height: 1.8;
        }

        /* ==================================================
           FULL-WIDTH DISTRICT
        ================================================== */

        .an-valley-district {
          position: relative;

          width: 100%;
          min-width: 0;
          min-height: 100svh;

          padding:
            clamp(90px, 11vh, 170px)
            0;

          border-top: 1px solid var(--valley-line);

          scroll-margin-top: 0;
        }

        .an-valley-district::before {
          content: "";

          position: absolute;
          top: 0;
          right: 0;

          width: 32vw;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(235, 246, 251, 0.4)
            );

          pointer-events: none;
        }

        .an-valley-district__header {
          display: grid;
          grid-template-columns:
            minmax(0, 1.15fr)
            minmax(0, 0.85fr);

          align-items: end;

          gap: clamp(35px, 7vw, 130px);
        }

        .an-valley-district__identity,
        .an-valley-district__statement {
          min-width: 0;
        }

        .an-valley-district__meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 16px;

          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.15em;
        }

        .an-valley-district__number {
          color: rgba(248, 252, 254, 0.9);
          font-size: 16px;
          font-weight: 450;
        }

        .an-valley-district__meta i {
          width: 44px;
          height: 1px;

          background: rgba(230, 243, 250, 0.26);
        }

        .an-valley-district__identity h2 {
          margin: 24px 0 0;

          color: rgba(251, 253, 254, 0.98);

          font-size: clamp(52px, 6.8vw, 120px);
          font-weight: 230;
          line-height: 0.94;
          letter-spacing: -0.065em;

          overflow-wrap: anywhere;
        }

        .an-valley-district__statement strong {
          display: block;

          color: rgba(247, 251, 253, 0.88);

          font-size: clamp(20px, 1.8vw, 30px);
          font-weight: 350;
          line-height: 1.35;
          letter-spacing: -0.025em;
        }

        .an-valley-district__statement p {
          max-width: 68ch;

          margin: 19px 0 0;

          color: var(--valley-muted);

          font-size: clamp(14px, 1vw, 17px);
          line-height: 1.8;
        }

        .an-valley-district__body {
          min-width: 0;
          width: 100%;

          margin-top: clamp(60px, 8vw, 130px);
        }

        /* ==================================================
           REALIZATION

           Existing portal remains a separate component.
           Only its placement is changed here.
        ================================================== */

        .an-valley-realization-portal {
          width: 100%;
          min-width: 0;
          min-height: min(85svh, 960px);
        }

        .an-valley-realization-portal
        .an-realization-entry-shell {
          width: 100%;
          min-height: inherit;
        }

        /* ==================================================
           OPEN SYSTEM FIELD

           No outer card, border radius, or nested
           glass container.
        ================================================== */

        .an-valley-system {
          position: relative;

          width: 100%;
          min-width: 0;
          min-height: 60svh;

          padding: clamp(20px, 3vw, 55px) 0;

          border-top:
            1px solid rgba(230, 243, 250, 0.09);

          border-bottom:
            1px solid rgba(230, 243, 250, 0.09);

          background:
            linear-gradient(
              90deg,
              rgba(180, 210, 226, 0.018),
              transparent 36%,
              transparent 68%,
              rgba(180, 210, 226, 0.018)
            );
        }

        .an-valley-system__architecture {
          display: grid;
          grid-template-columns:
            minmax(0, 0.9fr)
            minmax(0, 1.1fr);

          gap: clamp(48px, 8vw, 150px);
        }

        .an-valley-system__primary,
        .an-valley-conditional__branch,
        .an-valley-governance__intro {
          min-width: 0;
        }

        /* ==================================================
           CAPITAL METRICS
        ================================================== */

        .an-valley-system__metrics {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          align-self: end;

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley-metric {
          min-width: 0;

          padding:
            clamp(22px, 2.6vw, 44px)
            clamp(15px, 2vw, 32px);

          border-right:
            1px solid rgba(230, 243, 250, 0.09);
        }

        .an-valley-metric:first-child {
          padding-left: 0;
        }

        .an-valley-metric:last-child {
          padding-right: 0;
          border-right: 0;
        }

        .an-valley-metric span {
          color: var(--valley-muted);

          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .an-valley-metric strong {
          display: block;

          margin-top: 18px;

          color: rgba(249, 252, 254, 0.9);

          font-size: clamp(20px, 2vw, 36px);
          font-weight: 350;
          letter-spacing: -0.035em;
        }

        .an-valley-metric p {
          max-width: 30ch;

          margin: 15px 0 0;

          color: var(--valley-muted);

          font-size: clamp(12px, 0.85vw, 15px);
          line-height: 1.65;
        }

        .an-valley-system__flow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: clamp(12px, 2vw, 34px);

          margin-top: clamp(75px, 9vw, 160px);
          padding: 30px 0 0;

          border-top:
            1px solid rgba(230, 243, 250, 0.08);

          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .an-valley-system__flow i {
          width: clamp(24px, 5vw, 110px);
          height: 1px;

          background: rgba(230, 243, 250, 0.25);
        }

        .an-valley-system__flow strong {
          color: rgba(249, 252, 254, 0.9);
          font-weight: 600;
        }

        /* ==================================================
           COMMERCIALIZATION

           A branch diagram, not a collection of cards.
        ================================================== */

        .an-valley-conditional {
          display: grid;
          grid-template-columns:
            minmax(0, 0.8fr)
            minmax(0, 1.2fr);

          align-items: center;

          gap: clamp(55px, 8vw, 150px);
        }

        .an-valley-conditional__diagram {
          min-width: 0;

          display: grid;
          grid-template-columns:
            minmax(100px, 0.25fr)
            minmax(0, 1fr);

          align-items: center;

          gap: clamp(20px, 3vw, 55px);
        }

        .an-valley-conditional__source {
          min-height: 180px;

          display: grid;
          place-items: center;

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);

          color: rgba(247, 251, 253, 0.88);

          font-size: 13px;
          font-weight: 550;
          letter-spacing: 0.12em;
        }

        .an-valley-conditional__routes {
          display: grid;
          gap: 20px;
        }

        .an-valley-conditional__route {
          min-width: 0;
          min-height: 105px;

          display: grid;
          grid-template-columns:
            minmax(0, 0.85fr)
            minmax(12px, 0.2fr)
            minmax(0, 1.5fr)
            minmax(12px, 0.2fr)
            minmax(0, 0.6fr);

          align-items: center;

          gap: clamp(7px, 1vw, 20px);

          padding: 20px 0;

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley-conditional__route small {
          color: var(--valley-muted);

          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .an-valley-conditional__route i {
          height: 1px;

          background: rgba(230, 243, 250, 0.23);
        }

        .an-valley-conditional__route strong {
          color: rgba(248, 252, 254, 0.9);

          font-size: clamp(11px, 0.85vw, 15px);
          font-weight: 540;
          letter-spacing: 0.04em;

          overflow-wrap: anywhere;
        }

        .an-valley-conditional__route span {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.08em;
        }

        /* ==================================================
           GOVERNANCE
        ================================================== */

        .an-valley-governance__intro {
          max-width: 1100px;
        }

        .an-valley-governance__decisions {
          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          margin-top: clamp(60px, 8vw, 140px);

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley-governance__decision {
          min-width: 0;
          min-height: 230px;

          display: flex;
          flex-direction: column;

          padding:
            clamp(24px, 2.5vw, 46px)
            clamp(16px, 2vw, 35px);

          border-right:
            1px solid rgba(230, 243, 250, 0.09);
        }

        .an-valley-governance__decision:first-child {
          padding-left: 0;
        }

        .an-valley-governance__decision:last-child {
          padding-right: 0;
          border-right: 0;
        }

        .an-valley-governance__decision-index {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .an-valley-governance__decision strong {
          margin-top: auto;

          color: rgba(248, 252, 254, 0.92);

          font-size: clamp(15px, 1.2vw, 22px);
          font-weight: 470;
          letter-spacing: 0.025em;

          overflow-wrap: anywhere;
        }

        .an-valley-governance__decision p {
          max-width: 29ch;

          margin: 16px 0 0;

          color: var(--valley-muted);

          font-size: clamp(12px, 0.8vw, 15px);
          line-height: 1.65;
        }

        .an-valley-governance__principle {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: clamp(12px, 2vw, 32px);

          margin-top: clamp(55px, 6vw, 110px);

          color: var(--valley-muted);

          font-size: clamp(10px, 0.85vw, 14px);
          letter-spacing: 0.12em;
        }

        .an-valley-governance__principle i {
          width: clamp(25px, 5vw, 95px);
          height: 1px;

          background: rgba(230, 243, 250, 0.24);
        }

        .an-valley-governance__principle strong {
          color: rgba(249, 252, 254, 0.94);

          font-size: 24px;
          font-weight: 350;
        }

        /* ==================================================
           DEPLOYMENT
        ================================================== */

        .an-valley-deployment__header {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.8fr);

          align-items: end;

          gap: clamp(50px, 8vw, 150px);
        }

        .an-valley-deployment__header > p {
          margin-bottom: 0;
        }

        .an-valley-deployment__reality {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(110px, 0.4fr)
            minmax(0, 1fr);

          align-items: stretch;

          gap: clamp(15px, 3vw, 55px);

          margin-top: clamp(65px, 8vw, 140px);
        }

        .an-valley-deployment__state {
          min-width: 0;
          min-height: 260px;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          gap: 14px;

          padding: clamp(25px, 3vw, 55px) 0;

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley-deployment__state span,
        .an-valley-deployment__state small {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .an-valley-deployment__state strong {
          color: rgba(249, 252, 254, 0.93);

          font-size: clamp(25px, 2.8vw, 48px);
          font-weight: 300;
          letter-spacing: -0.045em;
        }

        .an-valley-deployment__crossing {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 16px;

          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .an-valley-deployment__crossing i {
          width: 1px;
          height: 35px;

          background: rgba(230, 243, 250, 0.25);
        }

        .an-valley-deployment__crossing strong {
          color: rgba(249, 252, 254, 0.94);

          font-size: 15px;
          font-weight: 500;
        }

        .an-valley-deployment__delta {
          display: grid;
          grid-template-columns:
            auto minmax(30px, 0.3fr) minmax(0, 1fr);

          align-items: center;

          gap: clamp(20px, 3vw, 55px);

          margin-top: clamp(40px, 5vw, 85px);
          padding: 28px 0;

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley-deployment__delta > span {
          color: rgba(249, 252, 254, 0.9);

          font-size: 14px;
          letter-spacing: 0.12em;
        }

        .an-valley-deployment__delta > i {
          height: 1px;

          background: rgba(230, 243, 250, 0.24);
        }

        .an-valley-deployment__delta > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          gap: 18px;
        }

        .an-valley-deployment__delta strong {
          color: var(--valley-muted);

          font-size: 11px;
          font-weight: 530;
          letter-spacing: 0.1em;
        }

        /* ==================================================
           REALITY / LEARNING
        ================================================== */

        .an-valley-reality {
          position: relative;

          min-height: 100svh;

          display: grid;
          align-items: center;

          padding:
            clamp(110px, 14vh, 220px)
            var(--valley-gutter);

          border-top: 1px solid var(--valley-line);

          background:
            radial-gradient(
              ellipse at 50% 45%,
              rgba(164, 199, 218, 0.07),
              transparent 48%
            ),
            rgba(1, 3, 5, 0.52);
        }

        .an-valley-reality__horizon {
          position: absolute;
          top: 50%;
          left: 0;

          width: 100%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(230, 243, 250, 0.16),
              transparent
            );

          pointer-events: none;
        }

        .an-valley-reality__content {
          position: relative;
          z-index: 1;

          width: 100%;
        }

        .an-valley-reality__eyebrow {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.18em;
        }

        .an-valley-reality h2 {
          margin: 28px 0 0;

          color: rgba(251, 253, 254, 0.98);

          font-size: clamp(66px, 10vw, 175px);
          font-weight: 230;
          line-height: 0.9;
          letter-spacing: -0.07em;
        }

        .an-valley-reality__content > p {
          max-width: 68ch;

          margin: 36px 0 0;

          color: var(--valley-muted);

          font-size: clamp(14px, 1vw, 17px);
          line-height: 1.8;
        }

        .an-valley-reality__loop {
          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr)) auto;

          align-items: stretch;

          gap: 0;

          margin-top: clamp(85px, 10vw, 180px);

          border-top: 1px solid var(--valley-line);
          border-bottom: 1px solid var(--valley-line);
        }

        .an-valley-reality__loop-step {
          min-width: 0;
          min-height: 145px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          gap: 24px;

          padding: 27px clamp(12px, 2vw, 35px);

          border-right:
            1px solid rgba(230, 243, 250, 0.09);
        }

        .an-valley-reality__loop-step:first-child {
          padding-left: 0;
        }

        .an-valley-reality__loop-number {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .an-valley-reality__loop-step strong {
          color: rgba(249, 252, 254, 0.88);

          font-size: clamp(10px, 0.9vw, 15px);
          font-weight: 500;
          letter-spacing: 0.06em;

          overflow-wrap: anywhere;
        }

        .an-valley-reality__return-symbol {
          align-self: center;

          padding-left: clamp(18px, 3vw, 50px);

          color: rgba(249, 252, 254, 0.75);

          font-size: 35px;
          font-weight: 300;
        }

        .an-valley-reality__constitution {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: clamp(12px, 2vw, 35px);

          margin-top: 45px;
        }

        .an-valley-reality__constitution span {
          color: var(--valley-muted);

          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .an-valley-reality__constitution span + span::before {
          content: "—";
          margin-right: clamp(12px, 2vw, 35px);
          color: rgba(230, 243, 250, 0.28);
        }

        /* ==================================================
           TERMINUS
        ================================================== */

        .an-valley__terminus {
          position: relative;

          min-height: 90svh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding:
            clamp(110px, 14vh, 220px)
            var(--valley-gutter);

          border-top: 1px solid var(--valley-line);

          text-align: center;

          background:
            linear-gradient(
              180deg,
              rgba(1, 3, 5, 0.65),
              rgba(1, 3, 5, 0.9)
            );
        }

        .an-valley__terminus > span {
          color: var(--valley-muted);

          font-size: 11px;
          letter-spacing: 0.2em;
        }

        .an-valley__terminus h2 {
          margin: 30px 0 0;

          color: rgba(251, 253, 254, 0.98);

          font-size: clamp(55px, 8vw, 140px);
          font-weight: 230;
          line-height: 0.94;
          letter-spacing: -0.065em;
        }

        .an-valley__terminus p {
          max-width: 68ch;

          margin: 36px 0 0;

          color: var(--valley-muted);

          font-size: clamp(14px, 1vw, 17px);
          line-height: 1.8;
        }

        .an-valley__return {
          display: inline-flex;
          align-items: center;
          gap: 15px;

          margin-top: 55px;
          padding: 18px 0;

          border-bottom: 1px solid var(--valley-line);

          color: rgba(246, 251, 253, 0.78);
          text-decoration: none;

          font-size: 11px;
          font-weight: 550;
          letter-spacing: 0.13em;

          transition: color 0.25s ease;
        }

        .an-valley__return:hover {
          color: #fff;
        }

        .an-valley__return i {
          width: 9px;
          height: 9px;

          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;

          transform: rotate(45deg);
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1100px) {
          .an-valley {
            --valley-gutter: clamp(26px, 4vw, 55px);
          }

          .an-valley__map {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .an-valley__map a {
            border-bottom:
              1px solid rgba(230, 243, 250, 0.08);
          }

          .an-valley__map a:nth-child(3n) {
            border-right: 0;
          }

          .an-valley__map a:nth-last-child(-n + 3) {
            border-bottom: 0;
          }

          .an-valley__map a:nth-child(4) {
            padding-left: 0;
          }

          .an-valley-district__header,
          .an-valley-system__architecture,
          .an-valley-conditional,
          .an-valley-deployment__header {
            grid-template-columns: minmax(0, 1fr);
            gap: 45px;
          }

          .an-valley-district__statement {
            max-width: 760px;
          }

          .an-valley-conditional__diagram {
            grid-template-columns:
              minmax(100px, 0.25fr)
              minmax(0, 1fr);
          }

          .an-valley-governance__decisions {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .an-valley-governance__decision {
            border-bottom:
              1px solid rgba(230, 243, 250, 0.09);
          }

          .an-valley-governance__decision:nth-child(3) {
            border-right: 0;
          }

          .an-valley-governance__decision:nth-child(4),
          .an-valley-governance__decision:nth-child(5) {
            border-bottom: 0;
          }

          .an-valley-governance__decision:nth-child(4) {
            padding-left: 0;
          }
        }

        /* ==================================================
           MOBILE

           Full viewport width, vertical execution
           corridor, no horizontal information squeeze.
        ================================================== */

        @media (max-width: 768px) {
          .an-valley {
            --valley-gutter: clamp(18px, 5vw, 28px);
          }

          .an-valley-city__left,
          .an-valley-city__right {
            width: 48%;
            height: 38%;
            opacity: 0.43;
          }

          .an-valley-city__horizon {
            bottom: 18%;
          }

          .an-valley__hero {
            min-height: 100svh;

            gap: 30px;

            padding:
              max(24px, env(safe-area-inset-top))
              var(--valley-gutter)
              max(28px, env(safe-area-inset-bottom));
          }

          .an-valley__back {
            font-size: 10px;
          }

          .an-valley__environment {
            max-width: 150px;
            font-size: 9px;
            line-height: 1.4;
            text-align: right;
          }

          .an-valley__hero-content {
            padding: 35px 0 10px;
          }

          .an-valley__hero-eyebrow {
            font-size: 9px;
          }

          .an-valley__hero-content h1 {
            font-size: clamp(61px, 17vw, 112px);
            line-height: 0.9;
          }

          .an-valley__hero-statement {
            margin-top: 32px;
            font-size: clamp(21px, 5vw, 30px);
          }

          .an-valley__hero-description {
            font-size: 13px;
          }

          .an-valley__map {
            grid-template-columns: minmax(0, 1fr);

            border-top: 1px solid var(--valley-line);
          }

          .an-valley__map a {
            min-height: 57px;

            grid-template-columns:
              32px 18px minmax(0, 1fr) auto;

            align-items: center;
            align-content: center;
            justify-items: start;

            gap: 10px;

            padding: 10px 0;

            border-right: 0;
            border-bottom:
              1px solid rgba(230, 243, 250, 0.09);
          }

          .an-valley__map a:last-child {
            border-bottom: 0;
          }

          .an-valley__map a > i {
            width: 8px;
            height: 8px;

            border: 1px solid rgba(230, 243, 250, 0.5);
            border-radius: 50%;

            background: rgba(230, 243, 250, 0.1);
          }

          .an-valley__map a.is-conditional > i {
            border-style: dashed;
            background: transparent;
          }

          .an-valley__map strong {
            font-size: 11px;
          }

          .an-valley__map a > span {
            font-size: 8px;
          }

          .an-valley__hero-footer {
            gap: 9px;
            font-size: 8px;
          }

          .an-valley__hero-footer i {
            width: 12px;
          }

          .an-valley__implementation-head {
            min-height: 75svh;
            padding: 90px 0;
          }

          .an-valley__implementation-head h2 {
            font-size: clamp(54px, 12vw, 88px);
          }

          .an-valley__implementation-head p {
            font-size: 14px;
          }

          .an-valley-district {
            min-height: 100svh;
            padding: 90px 0;
          }

          .an-valley-district__header {
            gap: 30px;
          }

          .an-valley-district__meta {
            gap: 11px;
            font-size: 9px;
          }

          .an-valley-district__number {
            font-size: 14px;
          }

          .an-valley-district__meta i {
            width: 25px;
          }

          .an-valley-district__identity h2 {
            margin-top: 20px;

            font-size: clamp(42px, 11vw, 76px);
            overflow-wrap: anywhere;
          }

          .an-valley-district__statement strong {
            font-size: 20px;
          }

          .an-valley-district__statement p {
            font-size: 14px;
          }

          .an-valley-district__body {
            margin-top: 50px;
          }

          .an-valley-realization-portal {
            min-height: 560px;
          }

          .an-valley-system {
            min-height: 0;
            padding: 30px 0;
          }

          .an-valley-kicker {
            font-size: 10px;
          }

          .an-valley-display {
            font-size: clamp(38px, 10vw, 62px);
          }

          .an-valley-copy {
            font-size: 14px;
          }

          .an-valley-system__architecture {
            gap: 55px;
          }

          .an-valley-system__metrics {
            grid-template-columns: minmax(0, 1fr);
          }

          .an-valley-metric,
          .an-valley-metric:first-child,
          .an-valley-metric:last-child {
            padding: 24px 0;

            border-right: 0;
            border-bottom:
              1px solid rgba(230, 243, 250, 0.09);
          }

          .an-valley-metric:last-child {
            border-bottom: 0;
          }

          .an-valley-metric span {
            font-size: 10px;
          }

          .an-valley-metric strong {
            font-size: 27px;
          }

          .an-valley-metric p {
            font-size: 13px;
          }

          .an-valley-system__flow {
            justify-content: flex-start;
            gap: 12px;

            margin-top: 60px;

            font-size: 9px;
          }

          .an-valley-system__flow i {
            width: 20px;
          }

          .an-valley-conditional {
            gap: 65px;
          }

          .an-valley-conditional__diagram {
            grid-template-columns: minmax(0, 1fr);
            gap: 26px;
          }

          .an-valley-conditional__source {
            min-height: 65px;
            font-size: 12px;
          }

          .an-valley-conditional__routes {
            gap: 35px;
          }

          .an-valley-conditional__route {
            grid-template-columns: minmax(0, 1fr);
            justify-items: start;

            min-height: 0;
            gap: 14px;

            padding: 22px 0;
          }

          .an-valley-conditional__route small {
            font-size: 10px;
          }

          .an-valley-conditional__route i {
            width: 1px;
            height: 20px;

            background: rgba(230, 243, 250, 0.25);
          }

          .an-valley-conditional__route strong {
            font-size: 16px;
          }

          .an-valley-conditional__route span {
            font-size: 13px;
          }

          .an-valley-governance__decisions {
            grid-template-columns: minmax(0, 1fr);
            margin-top: 65px;
          }

          .an-valley-governance__decision,
          .an-valley-governance__decision:first-child,
          .an-valley-governance__decision:last-child,
          .an-valley-governance__decision:nth-child(4) {
            min-height: 140px;

            padding: 23px 0;

            border-right: 0;
            border-bottom:
              1px solid rgba(230, 243, 250, 0.09);
          }

          .an-valley-governance__decision:last-child {
            border-bottom: 0;
          }

          .an-valley-governance__decision strong {
            margin-top: 24px;
            font-size: 19px;
          }

          .an-valley-governance__decision p {
            max-width: 48ch;
            margin-top: 10px;
            font-size: 13px;
          }

          .an-valley-governance__principle {
            gap: 10px;
            margin-top: 60px;
            font-size: 9px;
          }

          .an-valley-governance__principle i {
            width: 12px;
          }

          .an-valley-deployment__header {
            gap: 30px;
          }

          .an-valley-deployment__reality {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
            margin-top: 65px;
          }

          .an-valley-deployment__state {
            min-height: 175px;
            padding: 25px 0;
          }

          .an-valley-deployment__state span,
          .an-valley-deployment__state small {
            font-size: 10px;
          }

          .an-valley-deployment__state strong {
            font-size: clamp(26px, 7vw, 38px);
          }

          .an-valley-deployment__crossing {
            min-height: 100px;
            gap: 10px;
          }

          .an-valley-deployment__crossing i {
            height: 16px;
          }

          .an-valley-deployment__delta {
            grid-template-columns: minmax(0, 1fr);
            gap: 22px;
            margin-top: 45px;
          }

          .an-valley-deployment__delta > i {
            width: 100%;
          }

          .an-valley-deployment__delta > div {
            justify-content: flex-start;
            gap: 18px 22px;
          }

          .an-valley-deployment__delta strong {
            font-size: 10px;
          }

          .an-valley-reality {
            padding: 110px var(--valley-gutter);
          }

          .an-valley-reality h2 {
            font-size: clamp(57px, 13vw, 94px);
          }

          .an-valley-reality__content > p {
            font-size: 14px;
          }

          .an-valley-reality__loop {
            grid-template-columns: minmax(0, 1fr);
            margin-top: 75px;
          }

          .an-valley-reality__loop-step,
          .an-valley-reality__loop-step:first-child {
            min-height: 80px;

            flex-direction: row;
            align-items: center;

            gap: 18px;
            padding: 20px 0;

            border-right: 0;
            border-bottom:
              1px solid rgba(230, 243, 250, 0.09);
          }

          .an-valley-reality__loop-step strong {
            font-size: 13px;
          }

          .an-valley-reality__return-symbol {
            justify-self: center;
            padding: 18px 0;
          }

          .an-valley-reality__constitution {
            gap: 14px;
          }

          .an-valley-reality__constitution span {
            font-size: 9px;
          }

          .an-valley-reality__constitution span + span::before {
            margin-right: 14px;
          }

          .an-valley__terminus {
            min-height: 85svh;
          }

          .an-valley__terminus h2 {
            font-size: clamp(49px, 11vw, 80px);
          }

          .an-valley__terminus p {
            font-size: 14px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-valley__environment {
            max-width: 115px;
            font-size: 8px;
          }

          .an-valley__hero-content h1 {
            font-size: clamp(57px, 16vw, 76px);
          }

          .an-valley__hero-eyebrow {
            font-size: 8px;
          }

          .an-valley__map a > span {
            font-size: 7px;
          }

          .an-valley-district__identity h2 {
            font-size: clamp(39px, 10.5vw, 53px);
          }

          .an-valley-reality h2 {
            font-size: clamp(51px, 12vw, 67px);
          }

          .an-valley__terminus h2 {
            font-size: clamp(43px, 10vw, 60px);
          }
        }

        /* ==========================================================
   FULL-WIDTH CONTENT OVERRIDE
   Place immediately BEFORE the REDUCED MOTION block.
========================================================== */

/* The page itself must not become a narrow foreground panel. */

.an-valley {
  width: 100%;
  max-width: none;
  min-width: 0;
  overflow-x: clip;
}

.an-valley__hero,
.an-valley__implementation,
.an-valley-reality,
.an-valley__terminus {
  width: 100%;
  max-width: none;
  min-width: 0;
}

/* Keep the cosmic background subtle and behind the content. */

.an-valley__implementation {
  padding:
    clamp(72px, 8vw, 128px)
    clamp(20px, 3.5vw, 64px)
    clamp(80px, 9vw, 140px);

  background: transparent;
}

.an-valley__implementation::before {
  opacity: 0.35;
}

/* Remove the narrow central content corridor. */

.an-valley-district {
  width: 100%;
  max-width: none;
  min-width: 0;

  grid-template-columns:
    36px
    minmax(0, 1fr);

  gap: clamp(18px, 2.5vw, 40px);

  padding: clamp(64px, 7vw, 112px) 0;
}

.an-valley-district__content,
.an-valley-district__body {
  width: 100%;
  max-width: none;
  min-width: 0;
}

.an-valley-district__header {
  width: 100%;
  min-width: 0;

  grid-template-columns:
    minmax(0, 0.8fr)
    minmax(0, 1.2fr);

  gap: clamp(24px, 4vw, 72px);
}

.an-valley-district__statement,
.an-valley-district__identity {
  min-width: 0;
}

.an-valley-district__statement p {
  max-width: 760px;
}

/* The system sections are open page regions, not black cards. */

.an-valley-system {
  width: 100%;
  max-width: none;
  min-width: 0;
  min-height: 0;

  overflow: visible;

  padding: clamp(24px, 3vw, 48px) 0;

  border: 0;
  border-top: 1px solid rgba(230, 238, 242, 0.11);
  border-radius: 0;

  background: transparent;

  -webkit-backdrop-filter: none;
  backdrop-filter: none;

  box-shadow: none;
}

.an-valley-system::before {
  display: none;
}

/* Capital, commercialization and deployment can use the
   available width without rigid minimum column widths. */

.an-valley-system__architecture,
.an-valley-conditional,
.an-valley-deployment__header {
  width: 100%;
  min-width: 0;

  grid-template-columns:
    minmax(0, 0.85fr)
    minmax(0, 1.15fr);

  gap: clamp(28px, 4vw, 76px);
}

.an-valley-system__primary,
.an-valley-system__metrics,
.an-valley-conditional__branch,
.an-valley-conditional__diagram,
.an-valley-deployment {
  min-width: 0;
}

/* Avoid placing the capital flow on top of content. */

.an-valley-system__flow {
  position: relative;
  right: auto;
  bottom: auto;
  left: auto;

  width: 100%;
  margin-top: clamp(32px, 5vw, 64px);
  padding-top: 24px;

  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Improve actual reading size and contrast. */

.an-valley-district__identity > span,
.an-valley-system__primary > span,
.an-valley-conditional__branch > span,
.an-valley-governance__intro > span,
.an-valley-deployment__header span {
  font-size: clamp(10px, 0.8vw, 12px);
  color: rgba(218, 229, 234, 0.6);
}

.an-valley-district__statement p,
.an-valley-system__primary > p,
.an-valley-conditional__branch > p,
.an-valley-governance__intro > p,
.an-valley-deployment__header > p {
  font-size: clamp(13px, 1vw, 16px);
  line-height: 1.8;
  color: rgba(220, 230, 235, 0.7);
}

.an-valley-district__statement strong {
  font-size: clamp(17px, 1.45vw, 23px);
  color: rgba(246, 249, 250, 0.92);
}

.an-valley-metric span,
.an-valley-conditional__routes small,
.an-valley-conditional__routes strong,
.an-valley-conditional__routes span,
.an-valley-governance__decision strong,
.an-valley-deployment__state span,
.an-valley-deployment__state small,
.an-valley-deployment__delta strong {
  font-size: clamp(10px, 0.8vw, 12px);
}

.an-valley-metric p,
.an-valley-governance__decision p {
  font-size: clamp(12px, 0.95vw, 14px);
  line-height: 1.65;
  color: rgba(220, 230, 235, 0.65);
}

/* Readable execution diagrams. */

.an-valley-conditional__diagram {
  grid-template-columns:
    minmax(90px, 0.3fr)
    minmax(0, 1fr);
}

.an-valley-conditional__routes > div {
  grid-template-columns:
    minmax(78px, 0.8fr)
    minmax(12px, 0.3fr)
    minmax(0, 1.5fr)
    minmax(12px, 0.3fr)
    minmax(48px, 0.6fr);

  gap: 10px;
}

.an-valley-conditional__routes strong,
.an-valley-conditional__routes span,
.an-valley-conditional__routes small {
  overflow-wrap: anywhere;
}

.an-valley-governance__decisions {
  gap: clamp(10px, 1.5vw, 20px);
}

.an-valley-governance__decision {
  min-width: 0;
  min-height: 170px;
  padding: clamp(16px, 2vw, 26px);
}

.an-valley-deployment__reality {
  grid-template-columns:
    minmax(0, 1fr)
    minmax(130px, 0.6fr)
    minmax(0, 1fr);
}

/* ==========================================================
   TABLET
========================================================== */

@media (max-width: 1100px) {
  .an-valley-district__header,
  .an-valley-system__architecture,
  .an-valley-conditional,
  .an-valley-deployment__header {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .an-valley-system__metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .an-valley-metric {
    border-bottom: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }

  .an-valley-metric:last-child {
    border-right: 0;
  }

  .an-valley-governance__decisions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* ==========================================================
   MOBILE: CONTENT USES ALMOST THE ENTIRE SCREEN WIDTH
========================================================== */

@media (max-width: 768px) {
  .an-valley__hero {
    padding-right: 18px;
    padding-left: 18px;
  }

  .an-valley__implementation {
    padding:
      72px
      16px
      88px;
  }

  .an-valley__implementation-head {
    width: 100%;
    margin-bottom: 56px;
  }

  .an-valley-district {
    display: block;

    width: 100%;
    padding: 56px 0;
  }

  /* The section number no longer consumes a permanent
     vertical column beside the entire section. */

  .an-valley-district__marker {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    gap: 12px;
    margin-bottom: 22px;
  }

  .an-valley-district__marker span {
    font-size: 11px;
    color: rgba(224, 233, 237, 0.58);
  }

  .an-valley-district__marker i {
    width: 7px;
    height: 7px;
    box-shadow: none;
  }

  .an-valley-district__header {
    display: block;
    width: 100%;
  }

  .an-valley-district__identity h2 {
    font-size: clamp(39px, 10.5vw, 60px);
    overflow-wrap: anywhere;
  }

  .an-valley-district__statement {
    margin-top: 24px;
  }

  .an-valley-district__statement strong {
    font-size: 18px;
    line-height: 1.4;
  }

  .an-valley-district__statement p {
    font-size: 14px;
    line-height: 1.75;
  }

  .an-valley-district__body {
    width: 100%;
    margin-top: 30px;
  }

  .an-valley-system {
    min-height: 0;
    padding: 26px 0 12px;
    border-radius: 0;
    background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  .an-valley-system__architecture,
  .an-valley-conditional,
  .an-valley-deployment__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .an-valley-system__primary > strong,
  .an-valley-conditional__branch > strong,
  .an-valley-governance__intro > strong,
  .an-valley-deployment__header strong {
    font-size: clamp(30px, 8.5vw, 43px);
  }

  .an-valley-system__primary > p,
  .an-valley-conditional__branch > p,
  .an-valley-governance__intro > p,
  .an-valley-deployment__header > p {
    font-size: 14px;
    line-height: 1.75;
  }

  .an-valley-system__metrics {
    grid-template-columns: minmax(0, 1fr);
  }

  .an-valley-metric {
    padding: 20px 16px;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .an-valley-metric:last-child {
    border-bottom: 0;
  }

  .an-valley-metric strong {
    font-size: 18px;
  }

  .an-valley-metric p {
    font-size: 13px;
  }

  .an-valley-system__flow {
    position: relative;
    right: auto;
    bottom: auto;
    left: auto;

    margin-top: 30px;
    padding-top: 20px;

    flex-wrap: wrap;
    gap: 12px;

    font-size: 10px;
  }

  .an-valley-system__flow i {
    width: 20px;
  }

  /* Branches become readable vertical paths. */

  .an-valley-conditional__diagram {
    grid-template-columns: minmax(0, 1fr);
    padding: 16px;
  }

  .an-valley-conditional__source {
    min-height: 54px;
    font-size: 11px;
  }

  .an-valley-conditional__routes > div {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    padding: 18px 16px;
  }

  .an-valley-conditional__routes i {
    width: 1px;
    height: 18px;
    justify-self: center;
  }

  .an-valley-conditional__routes small,
  .an-valley-conditional__routes strong,
  .an-valley-conditional__routes span {
    font-size: 11px;
    text-align: center;
  }

  .an-valley-governance__decisions {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }

  .an-valley-governance__decision {
    min-height: 112px;
    padding: 18px;
  }

  .an-valley-governance__decision strong {
    font-size: 12px;
  }

  .an-valley-governance__decision p {
    font-size: 13px;
  }

  .an-valley-deployment__reality {
    grid-template-columns: minmax(0, 1fr);
  }

  .an-valley-deployment__crossing {
    flex-direction: row;
  }

  .an-valley-deployment__crossing i {
    width: 24px;
    height: 1px;
  }

  .an-valley-deployment__delta {
    grid-template-columns: minmax(0, 1fr);
  }

  .an-valley-deployment__delta > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 12px 16px;
  }

  .an-valley-deployment__delta strong {
    font-size: 11px;
  }

  .an-valley-realization-portal {
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  .an-valley-realization-portal
  .an-realization-entry-shell {
    width: 100%;
    min-width: 0;
  }

  .an-valley-reality__content,
  .an-valley__terminus {
    min-width: 0;
  }
}

/* ==========================================================
   SMALL MOBILE
========================================================== */

@media (max-width: 430px) {
  .an-valley__implementation {
    padding-right: 12px;
    padding-left: 12px;
  }

  .an-valley-district {
    display: block;
    padding: 48px 0;
  }

  .an-valley-district__identity h2 {
    font-size: clamp(36px, 10vw, 46px);
  }

  .an-valley-system {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 12px;
  }

  .an-valley-conditional__diagram {
    padding: 12px;
  }
}

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .an-valley *,
          .an-valley *::before,
          .an-valley *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}