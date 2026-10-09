"use client";

import Link from "next/link";

/**
 * ArcheNova Aevum
 *
 * Intellectual continuity across ArcheNova.
 *
 * The inquiry persists.
 * Personal identity is not required.
 *
 * HOME entrance only.
 * Visual styling remains in app/globals.css.
 */
export default function ContinuityHomePortal() {
  return (
    <div className="an-continuity-home">
      {/* Intellectual continuity field */}

      <div
        className="an-continuity-home__field"
        aria-hidden="true"
      >
        <span className="an-continuity-home__axis an-continuity-home__axis--horizontal" />
        <span className="an-continuity-home__axis an-continuity-home__axis--vertical" />

        <span className="an-continuity-home__orbit an-continuity-home__orbit--outer" />
        <span className="an-continuity-home__orbit an-continuity-home__orbit--inner" />

        <span className="an-continuity-home__node an-continuity-home__node--question">
          QUESTION
        </span>

        <span className="an-continuity-home__node an-continuity-home__node--evidence">
          EVIDENCE
        </span>

        <span className="an-continuity-home__node an-continuity-home__node--reasoning">
          REASONING
        </span>

        <span className="an-continuity-home__node an-continuity-home__node--purpose">
          PURPOSE
        </span>

        <span className="an-continuity-home__node an-continuity-home__node--state">
          STATE
        </span>
      </div>

      {/* Aevum identity */}

      <div className="an-continuity-home__content">

        <h2 className="an-continuity-home__title">
          Aevum
        </h2>

        <p className="an-continuity-home__thesis">
          Where inquiry endures.
        </p>

        <p className="an-continuity-home__description">
          Carry questions, evidence, and reasoning
          across ArcheNova.
        </p>

        <Link
          href="/continuity"
          className="an-continuity-home__enter"
          aria-label="Enter ArcheNova Aevum"
        >
          <span>ENTER AEVUM</span>

          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 14L14 4M5 4H14V13"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <p className="an-continuity-home__quiet">
          Preserve thought, not identity.
        </p>
      </div>

      {/* Continuity foundation */}

      <div
        className="an-continuity-home__status"
        aria-hidden="true"
      >
        <span>INTELLECTUAL ENVIRONMENT</span>

        <span className="an-continuity-home__status-line" />

        <span>KNOWLEDGE · EVIDENCE · CONTINUITY</span>
      </div>
    </div>
  );
}