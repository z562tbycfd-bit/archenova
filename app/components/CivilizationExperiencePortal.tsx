import Link from "next/link";
import Reveal from "./Reveal";

export default function CivilizationExperiencePortal() {
  return (
    <section className="ce-home-portal">
      {/* ==================================================
          CINEMATIC BACKGROUND
      ================================================== */}

      <div
        className="ce-home-portal__image"
        aria-hidden="true"
      />

      <div
        className="ce-home-portal__glass"
        aria-hidden="true"
      />

      {/* ==================================================
          CONTENT
      ================================================== */}

      <Reveal>
        <div className="ce-home-portal__content">
          {/* ==============================================
              EYEBROW
          ============================================== */}

          <div className="ce-home-portal__eyebrow">
            <span />

            <p>
              CIVILIZATION EXPERIENCE
            </p>

            <span />
          </div>

          {/* ==============================================
              TITLE
          ============================================== */}

          <h2>
            Enter the science.
            <br />
            Test the reality.
          </h2>

          {/* ==============================================
              LEAD
          ============================================== */}

          <p className="ce-home-portal__lead">
            Select a scientific paper and enter
            a simulation where theoretical
            explanations generate predictions,
            experimental choices confront
            evidence, and surviving knowledge
            is tested against reality.
          </p>

          {/* ==============================================
              EXPERIENCE MODEL
          ============================================== */}

          <div className="ce-home-portal__signal">
            <small>
              SCIENTIFIC SIMULATION
            </small>

            <strong>
              Theory → Prediction → Experiment
            </strong>

            <span>
              One selected scientific object
              at a time
            </span>
          </div>

          {/* ==============================================
              ENTRY
          ============================================== */}

          <Link
            href="/civilization-experience"
            className="ce-home-portal__enter"
          >
            <span>
              Enter Simulation
            </span>

            <span
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}