"use client";

import Link from "next/link";

export default function ContinuityHomePortal() {
  return (
    <div className="an-continuity-home">
      <div className="an-continuity-home__field" aria-hidden="true">
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

      <div className="an-continuity-home__content">

        <h2 className="an-continuity-home__title">
          Continuity
        </h2>

        <p className="an-continuity-home__thesis">
          Where inquiry becomes
          <br />
          cumulative capability.
        </p>

        <p className="an-continuity-home__description">
          Preserve the question, reconnect evidence, continue reasoning,
          and carry intellectual state across ArcheNova.
        </p>

        <div
          className="an-continuity-home__principle"
          aria-label="Continuity of inquiry is not continuity of identity"
        >
          <span>CONTINUITY OF INQUIRY</span>

          <i aria-hidden="true" />

          <span aria-hidden="true">≠</span>

          <i aria-hidden="true" />

          <span>CONTINUITY OF IDENTITY</span>
        </div>

        <Link
          href="/continuity"
          className="an-continuity-home__enter"
          aria-label="Enter ArcheNova Continuity"
        >
          <span>ENTER CONTINUITY</span>

          <svg
            width="34"
            height="12"
            viewBox="0 0 34 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 6H32"
              stroke="currentColor"
              strokeWidth="0.8"
            />

            <path
              d="M27 1L32 6L27 11"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </Link>

        <p className="an-continuity-home__quiet">
          Remember the inquiry, not the individual.
        </p>
      </div>

      <div className="an-continuity-home__status" aria-hidden="true">

        <span className="an-continuity-home__status-line" />

        <span>KNOWLEDGE · EVIDENCE · CONTINUITY</span>
      </div>
    </div>
  );
}