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

   PURPOSE
   ----------------------------------------------------------
   Concept is not a dashboard.

   It is the conceptual entrance to ArcheNova:

   PURPOSE
   → HUMAN AGENCY
   → WORLD

   ARCHITECTURE
   ----------------------------------------------------------
   CLOSED

   main
   └─ #archenova-concept

   OPEN

   main
   ├─ #archenova-concept
   ├─ #archenova-civilization-prelude
   ├─ #archenova-ideal-user
   ├─ #archenova-world
   └─ #archenova-concept-end

   IMPORTANT
   ----------------------------------------------------------
   - No wrapper surrounds expanded Concept environments.
   - Purpose preserves its own scroll architecture.
   - Ideal User preserves its own scroll architecture.
   - World preserves its natural document flow.
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

     Collapse the Concept environments first.

     Two animation frames allow React and the browser to
     commit the new document geometry before scrolling back
     to the Concept entrance.
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
              QUIET OPTICAL FIELD

              Decorative only.
              No second glass surface.
          ================================================ */}

          <div
            className="an-concept-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="an-concept-portal__reflection"
            aria-hidden="true"
          />

          {/* ================================================
              HEADER
          ================================================ */}

          <header className="an-concept-portal__header">
            <span className="an-concept-portal__eyebrow">
              ARCHENOVA CONCEPT
            </span>

            <span className="an-concept-portal__count">
              01 — 03
            </span>
          </header>

          {/* ================================================
              CENTRAL IDEA

              One statement only.
              No index.
              No explanatory paragraph.
              No duplicate description.
          ================================================ */}

          <div className="an-concept-portal__body">
            <h2 id="an-concept-title">
              Why ArcheNova exists,
              <br />
              who it serves,
              <br />
              and what it seeks to build.
            </h2>
          </div>

          {/* ================================================
              CONCEPT STRUCTURE

              This is orientation, not navigation.
          ================================================ */}

          <div
            className="an-concept-portal__structure"
            aria-label="ArcheNova Concept structure"
          >
            <span>PURPOSE</span>

            <i aria-hidden="true" />

            <span>HUMAN AGENCY</span>

            <i aria-hidden="true" />

            <span>WORLD</span>
          </div>

          {/* ================================================
              PRIMARY CONTROL
          ================================================ */}

          <footer className="an-concept-portal__footer">
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
              <>
                <div
                  className="an-concept-portal__opened"
                  role="status"
                  aria-live="polite"
                >
                  CONCEPT OPEN
                </div>

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
                    viewBox="0 0 42 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M41 8H2M2 8L9 1M2 8L9 15"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </footer>
        </div>
      </section>

      {/* ====================================================
          02 / EXPANDED CONCEPT

          CRITICAL:
          Fragment only.

          These sections remain direct siblings beneath
          main.an-home-2026.
      ==================================================== */}

      {isOpen && (
        <Fragment>
          {/* ================================================
              01 / PURPOSE
          ================================================ */}

          <ArcheNovaCivilizationPrelude />

          {/* ================================================
              02 / HUMAN AGENCY
          ================================================ */}

          <ArcheNovaIdealUserPrelude />

          {/* ================================================
              03 / WORLD
          ================================================ */}

          <ArcheNovaWorldGallery />

          {/* ================================================
              04 / CONCEPT END
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
                Purpose defines direction.
                <br />
                Human agency gives it meaning.
                <br />
                The world makes it real.
              </p>

              <button
                type="button"
                className="an-concept-portal__return"
                onClick={closeConcept}
                aria-label="Close ArcheNova Concept and return to the Concept entrance"
              >
                <svg
                  viewBox="0 0 42 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M41 8H2M2 8L9 1M2 8L9 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>
                  RETURN TO CONCEPT
                </span>
              </button>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}