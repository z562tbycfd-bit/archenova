"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ==========================================================
   TYPES
========================================================== */

type ChapterTarget = {
  id: string;
  mark: string;
  title: string;
  subtitle: string;
};

/* ==========================================================
   HOME ENVIRONMENTS

   ORYVANTH CIVILIZATION
      └─ CIVILIZATION SYNTHESIS
         ├─ Civilizational Charter
         └─ Research Architecture

   ARCHENOVA WORLD
      └─ Five Conceptual Civilizational Exhibitions

   THE ARCHITECTURE OF CIVILIZATION
      ├─ Civilization Discovery
      ├─ Civilization Inquiry
      ├─ Civilization Responsibility
      ├─ Civilization Continuity
      ├─ Civilization Engineering
      ├─ Civilization Systems
      └─ Civilization Implementation

   Existing navigation and behavior preserved.
========================================================== */

const CHAPTER_TARGETS: readonly ChapterTarget[] = [
   {
    id: "oryvanth-civilization",
    mark: "❂",
    title: "ORYVANTH",
    subtitle: "The Totality of Existence and Development.",
  },
  {
    id: "civilization-synthesis",
    mark: "✪",
    title: "SYNTHESIS",
    subtitle: "Engineering a Correctable Civilization.",
  },
  {
    id: "archenova-architecture-of-civilization",
    mark: "⧉",
    title: "ARCHITECTURE",
    subtitle: "What is the Architecture?",
  },
];

/* ==========================================================
   SCROLL

   Preserved original behavior.
========================================================== */

function scrollToChapter(id: string) {
  const element =
    document.getElementById(id);

  if (!element) return;

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

  element.scrollIntoView({
    behavior:
      reducedMotion
        ? "auto"
        : "smooth",

    block: "start",
  });
}

/* ==========================================================
   COMPONENT
========================================================== */

export default function HomeSectionPager() {
  const [activeId, setActiveId] =
    useState<string>(
      CHAPTER_TARGETS[0].id,
    );

  const activeIdRef =
    useRef<string>(
      CHAPTER_TARGETS[0].id,
    );

  const targets =
    useMemo(
      () => CHAPTER_TARGETS,
      [],
    );

  useEffect(() => {
    activeIdRef.current =
      activeId;
  }, [activeId]);

  /* ========================================================
     ACTIVE SECTION DETECTION

     Only IDs declared in CHAPTER_TARGETS are observed.

     All original observer thresholds, root margins,
     and active-selection logic are preserved.
  ======================================================== */

  useEffect(() => {
    const elements = targets
      .map((target) =>
        document.getElementById(
          target.id,
        ),
      )
      .filter(
        (
          element,
        ): element is HTMLElement =>
          Boolean(element),
      );

    if (elements.length === 0) {
      return;
    }

    const ratios =
      new Map<string, number>();

    elements.forEach(
      (element) => {
        ratios.set(
          element.id,
          0,
        );
      },
    );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              ratios.set(
                entry.target.id,

                entry.isIntersecting
                  ? entry.intersectionRatio
                  : 0,
              );
            },
          );

          let strongestId =
            activeIdRef.current;

          let strongestRatio = 0;

          targets.forEach(
            (target) => {
              const ratio =
                ratios.get(
                  target.id,
                ) ?? 0;

              if (
                ratio >
                strongestRatio
              ) {
                strongestRatio =
                  ratio;

                strongestId =
                  target.id;
              }
            },
          );

          if (
            strongestRatio <= 0
          ) {
            return;
          }

          if (
            strongestId !==
            activeIdRef.current
          ) {
            activeIdRef.current =
              strongestId;

            setActiveId(
              strongestId,
            );
          }
        },
        {
          threshold: [
            0.05,
            0.12,
            0.2,
            0.32,
            0.45,
            0.6,
            0.75,
          ],

          rootMargin:
            "-5% 0px -5% 0px",
        },
      );

    elements.forEach(
      (element) => {
        observer.observe(
          element,
        );
      },
    );

    return () => {
      observer.disconnect();
    };
  }, [targets]);

  /* ========================================================
     CURRENT POSITION

     Preserved original logic.
  ======================================================== */

  const currentIndex =
    targets.findIndex(
      (target) =>
        target.id === activeId,
    );

  const safeCurrentIndex =
    currentIndex >= 0
      ? currentIndex
      : 0;

  const previousTarget =
    targets[
      Math.max(
        0,
        safeCurrentIndex - 1,
      )
    ];

  const nextTarget =
    targets[
      Math.min(
        targets.length - 1,
        safeCurrentIndex + 1,
      )
    ];

  const isFirst =
    safeCurrentIndex === 0;

  const isLast =
    safeCurrentIndex ===
    targets.length - 1;

  /* ========================================================
     UI

     Original structure and CSS class names preserved.
  ======================================================== */

  return (
    <nav
      className="chapter-navigator"
      aria-label="ArcheNova HOME navigation"
    >
      <button
        type="button"
        className={[
          "chapter-nav-arrow",
          isFirst
            ? "is-edge"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!isFirst) {
            scrollToChapter(
              previousTarget.id,
            );
          }
        }}
        aria-label={
          isFirst
            ? "First HOME environment"
            : `Previous environment: ${previousTarget.title}`
        }
        disabled={isFirst}
      >
        ↑
      </button>

      <div className="chapter-nav-list">
        {targets.map(
          (target) => {
            const active =
              activeId ===
              target.id;

            return (
              <button
                key={target.id}
                type="button"
                className={[
                  "chapter-nav-item",
                  active
                    ? "active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  scrollToChapter(
                    target.id,
                  );
                }}
                aria-label={
                  `Go to ${target.title}`
                }
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                title={
                  `${target.title} · ${target.subtitle}`
                }
              >
                <span
                  className="chapter-nav-mark"
                  aria-hidden="true"
                >
                  {target.mark}
                </span>

                <span className="chapter-nav-copy">
                  <strong>
                    {target.title}
                  </strong>

                  <small>
                    {target.subtitle}
                  </small>
                </span>
              </button>
            );
          },
        )}
      </div>

      <button
        type="button"
        className={[
          "chapter-nav-arrow",
          isLast
            ? "is-edge"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!isLast) {
            scrollToChapter(
              nextTarget.id,
            );
          }
        }}
        aria-label={
          isLast
            ? "Last HOME environment"
            : `Next environment: ${nextTarget.title}`
        }
        disabled={isLast}
      >
        ↓
      </button>
    </nav>
  );
}