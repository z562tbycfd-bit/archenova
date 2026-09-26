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

   A quiet entrance to the conceptual foundation of ArcheNova.

   PURPOSE
   → HUMAN AGENCY
   → WORLD

   IMPORTANT
   - No wrapper around expanded environments.
   - Existing scroll-driven sections remain direct HOME
     descendants in the rendered DOM.
   - Visual styling belongs to globals.css.
========================================================== */

export default function ArcheNovaConceptPortal() {
  const [isOpen, setIsOpen] =
    useState(false);

  const openConcept =
    useCallback(() => {
      setIsOpen(true);
    }, []);

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
          CONCEPT ENTRANCE
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
              QUIET AMBIENT LAYER
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

            <span
              className="an-concept-portal__count"
              aria-hidden="true"
            >
              01 — 03
            </span>
          </header>

          {/* ================================================
              CENTRAL STATEMENT
          ================================================ */}

          <div className="an-concept-portal__body">
            <h2 id="an-concept-title">
              Why ArcheNova exists,
              <br />
              who it is for,
              <br />
              and the world it seeks
              <br />
              to understand.
            </h2>
          </div>

          {/* ================================================
              CONCEPT STRUCTURE
          ================================================ */}

          <div className="an-concept-portal__structure">
            <span>PURPOSE</span>

            <i aria-hidden="true" />

            <span>HUMAN AGENCY</span>

            <i aria-hidden="true" />

            <span>WORLD</span>
          </div>

          {/* ================================================
              CONTROL
          ================================================ */}

          <footer className="an-concept-portal__footer">
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
              <>
                <span className="an-concept-portal__opened">
                  CONCEPT OPEN
                </span>

                <button
                  type="button"
                  className="an-concept-portal__close"
                  onClick={closeConcept}
                  aria-expanded="true"
                  aria-label="Close ArcheNova Concept"
                >
                  <span>CLOSE</span>

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
              </>
            )}
          </footer>
        </div>
      </section>

      {/* ====================================================
          EXPANDED CONCEPT

          Fragment only:
          no DOM wrapper around the fixed scroll environments.
      ==================================================== */}

      {isOpen && (
        <Fragment>
          <ArcheNovaCivilizationPrelude />

          <ArcheNovaIdealUserPrelude />

          <ArcheNovaWorldGallery />

          {/* ================================================
              CONCEPT END
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
                Purpose.
                <br />
                Human agency.
                <br />
                World.
              </p>

              <button
                type="button"
                className="an-concept-portal__return"
                onClick={closeConcept}
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