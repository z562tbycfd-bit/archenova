"use client";

import {
  Fragment,
  useCallback,
  useState,
} from "react";

import ArcheNovaCivilizationPrelude from "./ArcheNovaCivilizationPrelude";
import ArcheNovaIdealUserPrelude from "./ArcheNovaIdealUserPrelude";
import ArcheNovaWorldGallery from "./ArcheNovaWorldGallery";

/* ==========================================================
   ARCHENOVA CONCEPT

   HOME
   └─ ArcheNova Concept
      │
      ├─ Purpose
      │    └─ ArcheNovaCivilizationPrelude
      │
      ├─ Human Agency
      │    └─ ArcheNovaIdealUserPrelude
      │
      └─ World
           └─ ArcheNovaWorldGallery

   CLOSED
   - Only the Concept entrance exists.
   - Concept content is removed from the DOM.

   OPEN
   - Purpose / Human Agency / World are mounted.
   - They remain DOM siblings of the Concept entrance.
   - No wrapper is placed around the scroll-driven sections.

   IMPORTANT
   - Purpose keeps its 500svh scroll architecture.
   - Ideal User keeps its dynamic chapter height.
   - START / FIXED / END remain viewport-based.
   - data-home-section remains on the existing components.
   - HomeSectionPager still exposes Concept as one target only.
   - All visual CSS belongs in globals.css.
========================================================== */

export default function ArcheNovaConceptPortal() {
  const [isOpen, setIsOpen] =
    useState(false);

  /* ========================================================
     OPEN
  ======================================================== */

  const openConcept =
    useCallback(() => {
      setIsOpen(true);
    }, []);

  /* ========================================================
     CLOSE

     Wait until the expanded Concept sections have actually
     been removed from layout before returning to the
     Concept entrance.

     Double requestAnimationFrame gives React/layout one
     frame to commit the collapsed document geometry.

     Reduced-motion preference is respected.
  ======================================================== */

  const closeConcept =
    useCallback(() => {
      setIsOpen(false);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const concept =
            document.getElementById(
              "archenova-concept",
            );

          if (!concept) return;

          const reducedMotion =
            window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;

          concept.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",
            block: "start",
          });
        });
      });
    }, []);

  return (
    <Fragment>
      {/* ====================================================
          01 / CONCEPT ENTRANCE

          This is the only Concept target exposed to
          HomeSectionPager.

          The expanded environments below retain their own
          IDs and data-home-section attributes, but the
          pager ignores them because it uses its explicit
          CHAPTER_TARGETS list.
      ==================================================== */}

      <section
        id="archenova-concept"
        data-home-section
        className={[
          "an-home-2026__section",
          "an-concept-portal",
          isOpen
            ? "an-concept-portal--open"
            : "an-concept-portal--closed",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="an-concept-title"
      >
        <div className="an-concept-portal__surface">
          {/* ================================================
              AMBIENT ARCHITECTURE

              Decorative only.
              These elements remain inside the Concept
              entrance and never wrap the fixed descendants.
          ================================================ */}

          <div
            className="an-concept-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__grid"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__reflection"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__axis"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          {/* ================================================
              HEADER
          ================================================ */}

          <header className="an-concept-portal__header">
            <div className="an-concept-portal__identity">
              <span className="an-concept-portal__eyebrow">
                ARCHENOVA CONCEPT
              </span>

              <span className="an-concept-portal__principle">
                PURPOSE · HUMAN AGENCY · WORLD
              </span>
            </div>

            {isOpen && (
              <button
                type="button"
                className="an-concept-portal__close"
                onClick={closeConcept}
                aria-label="Close ArcheNova Concept"
                aria-expanded="true"
              >
                <span>CLOSE</span>

                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10H16M10 4L16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </header>

          {/* ================================================
              CENTRAL STATEMENT
          ================================================ */}

          <div className="an-concept-portal__body">
            <div className="an-concept-portal__statement">
              <span className="an-concept-portal__index">
                00 / CONCEPT
              </span>

              <h2 id="an-concept-title">
                The ideas behind
                <br />
                ArcheNova.
              </h2>

              <p>
                Why it exists. Who it is for.
                <br />
                What kind of world it seeks to examine.
              </p>
            </div>

            <div
              className="an-concept-portal__architecture"
              aria-hidden="true"
            >
              <div className="an-concept-portal__architecture-line" />

              <div className="an-concept-portal__architecture-items">
                <span>
                  <small>01</small>
                  PURPOSE
                </span>

                <span>
                  <small>02</small>
                  HUMAN AGENCY
                </span>

                <span>
                  <small>03</small>
                  WORLD
                </span>
              </div>
            </div>
          </div>

          {/* ================================================
              CONTROL
          ================================================ */}

          <div className="an-concept-portal__footer">
            {!isOpen ? (
              <button
                type="button"
                className="an-concept-portal__enter"
                onClick={openConcept}
                aria-expanded="false"
              >
                <span>
                  EXPLORE CONCEPT
                </span>

                <svg
                  viewBox="0 0 42 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 8H40M40 8L33 1M40 8L33 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <div
                className="an-concept-portal__opened"
                role="status"
                aria-live="polite"
              >
                <span>
                  CONCEPT ENVIRONMENT OPEN
                </span>

                <span aria-hidden="true">
                  ↓
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          02 / CONCEPT ENVIRONMENTS

          CRITICAL ARCHITECTURE

          There is intentionally NO DOM wrapper here.

          Because this component itself is rendered directly
          under <main>, React Fragment produces:

          <main>
            #archenova-concept
            #archenova-civilization-prelude
            #archenova-ideal-user
            #archenova-world
            .an-concept-portal__closing
          </main>

          This restores the original HOME relationship and
          prevents a Concept wrapper from interfering with
          position: fixed.
      ==================================================== */}

      {isOpen && (
        <Fragment>
          {/* ================================================
              01 / PURPOSE

              Existing:
              - 500svh
              - START / FIXED / END
              - five scroll-driven chapters
          ================================================ */}

          <ArcheNovaCivilizationPrelude />

          {/* ================================================
              02 / HUMAN AGENCY

              Existing:
              - dynamic chapter count
              - START / FIXED / END
              - scroll-driven chapter switching
          ================================================ */}

          <ArcheNovaIdealUserPrelude />

          {/* ================================================
              03 / WORLD

              Existing:
              - natural document height
              - exhibition interaction
              - independent reveal behavior
          ================================================ */}

          <ArcheNovaWorldGallery />

          {/* ================================================
              04 / END OF CONCEPT

              This remains a HOME section, but it is not a
              HomeSectionPager target.
          ================================================ */}

          <section
            id="archenova-concept-end"
            data-home-section
            className={[
              "an-home-2026__section",
              "an-concept-portal__closing",
            ].join(" ")}
            aria-label="End of ArcheNova Concept"
          >
            <div className="an-concept-portal__closing-surface">
              <span className="an-concept-portal__closing-eyebrow">
                ARCHENOVA CONCEPT
              </span>

              <p>
                Purpose becomes direction.
                <br />
                Direction becomes architecture.
                <br />
                Architecture becomes possibility.
              </p>

              <button
                type="button"
                onClick={closeConcept}
                className="an-concept-portal__return"
                aria-label="Close ArcheNova Concept and return to its entrance"
              >
                <svg
                  viewBox="0 0 42 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 8H40M40 8L33 1M40 8L33 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>
                  CLOSE CONCEPT
                </span>
              </button>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}