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
   ----------------------------------------------------------
   One quiet HOME entrance.

   OPEN
   ----------------------------------------------------------
   Purpose / Human Agency / World are mounted in their
   original form as direct siblings beneath HOME.

   DOM WHEN OPEN
   ----------------------------------------------------------
   <main>
     #archenova-concept
     #archenova-civilization-prelude
     #archenova-ideal-user
     #archenova-world
     #archenova-concept-end
   </main>

   IMPORTANT
   ----------------------------------------------------------
   - Existing Concept components remain unchanged.
   - Closed content is removed from the DOM.
   - No wrapper surrounds the scroll-driven environments.
   - Purpose keeps its original chapter architecture.
   - Human Agency keeps its original chapter architecture.
   - World keeps its natural document flow.
   - data-home-section remains on existing components.
   - HomeSectionPager exposes Concept as one major target.
   - Visual styling belongs in globals.css.
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

     Expanded sections are removed first.

     Two animation frames allow React and the browser to
     commit the collapsed document geometry before returning
     to the Concept entrance.

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
        ].join(" ")}
        aria-labelledby="an-concept-title"
      >
        <div className="an-concept-portal__surface">
          {/* ================================================
              AMBIENT ARCHITECTURE

              Decorative only.

              These elements belong only to the Concept
              entrance and never surround the expanded
              scroll-driven environments.
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
              >
                <span>
                  CLOSE
                </span>

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

            {/* ==============================================
                CONCEPT ARCHITECTURE

                Orientation only.
                These are not separate navigation controls.
            ============================================== */}

            <div
              className="an-concept-portal__architecture"
              aria-label="ArcheNova Concept structure"
            >
              <div
                className="an-concept-portal__architecture-line"
                aria-hidden="true"
              />

              <div className="an-concept-portal__architecture-items">
                <span>
                  <small>
                    01
                  </small>

                  PURPOSE
                </span>

                <span>
                  <small>
                    02
                  </small>

                  HUMAN AGENCY
                </span>

                <span>
                  <small>
                    03
                  </small>

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
                aria-expanded={false}
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
          ----------------------------------------------------
          There is intentionally NO DOM wrapper here.

          Fragment produces:

          <main>
            #archenova-concept
            #archenova-civilization-prelude
            #archenova-ideal-user
            #archenova-world
            #archenova-concept-end
          </main>

          This preserves the original relationship between
          HOME and each expanded Concept environment.
      ==================================================== */}

      {isOpen && (
        <Fragment>
          {/* ================================================
              01 / PURPOSE

              Existing component keeps:
              - its own data-home-section
              - scroll-driven chapters
              - START / FIXED / END behavior
          ================================================ */}

          <ArcheNovaCivilizationPrelude />

          {/* ================================================
              02 / HUMAN AGENCY

              Existing component keeps:
              - its own data-home-section
              - dynamic chapter count
              - START / FIXED / END behavior
          ================================================ */}

          <ArcheNovaIdealUserPrelude />

          {/* ================================================
              03 / WORLD

              Existing component keeps:
              - its own data-home-section
              - natural document height
              - exhibition interaction
              - reveal behavior
          ================================================ */}

          <ArcheNovaWorldGallery />

          {/* ================================================
              04 / END OF CONCEPT

              A quiet terminus for the Concept journey.

              It remains a HOME section but is intentionally
              not a HomeSectionPager target.
          ================================================ */}

          <section
            id="archenova-concept-end"
            data-home-section
            className={[
              "an-home-2026__section",
              "an-concept-portal__closing",
            ].join(" ")}
            aria-labelledby="an-concept-end-title"
          >
            <div className="an-concept-portal__closing-surface">
              <span className="an-concept-portal__closing-eyebrow">
                ARCHENOVA CONCEPT
              </span>

              <p id="an-concept-end-title">
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