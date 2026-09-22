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
   CHAPTERS

   New HOME architecture:

   01 ArcheNova Map
      Explore the ArcheNova system.

   02 Episteme
      Dialogue, reasoning, and cognition.

   03 Today's Inquiry
      Focus attention on a living question.

   04 ArcheNova Valley
      Where knowledge becomes reality.

   Knowledge / Intelligence / Implementation /
   Governance / Experience now live inside:

   /archenova-valley

   They are no longer independent HOME pages.

   HOME:
   Map
   → Episteme
   → Inquiry
   → Valley

   VALLEY:
   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization
========================================================== */

const CHAPTER_TARGETS:
  readonly ChapterTarget[] = [

    {
  id: "founder-digital-twin",
  mark: "☀︎",
  title: "FOUNDER",
  subtitle: "Why does ArcheNova exist?",
},

{
    id:
      "archenova-search-section",

    mark:
      "⌭",

    title:
      "MAP",

    subtitle:
      "Where are we?",
  },

{
  id: "works",
  mark: "⎅",
  title: "WORKS",
  subtitle: "What can we become?",
},

{
  id: "work-models",
  mark: "⏣",
  title: "MODELS",
  subtitle: "What can we imagine?",
},

  {
    id:
      "todays-inquiry",

    mark:
      "☁︎",

    title:
      "INQUIRY",

    subtitle:
      "What should we ask?",
  },

  {
    id:
      "civilization-space",

    mark:
      "⧫",

    title:
      "CIVILIZATION",

    subtitle:
      "what can we build?",
  },

  {
    id:
      "archenova-valley",

    mark:
      "⏥",

    title:
      "VALLEY",

    subtitle:
      "what can we realize?",
  },

];


/* ==========================================================
   SCROLL
========================================================== */

function scrollToChapter(
  id: string,
) {

  const element =
    document.getElementById(
      id,
    );


  if (
    !element
  ) {
    return;
  }


  element.scrollIntoView({
    behavior:
      "smooth",

    block:
      "start",
  });
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function HomeSectionPager() {

  const [
    activeId,
    setActiveId,
  ] =
    useState<string>(
      CHAPTER_TARGETS[0].id,
    );


  /*
   * Keep the current active section available to
   * IntersectionObserver without rebuilding the observer
   * whenever the active HOME environment changes.
   */
  const activeIdRef =
    useRef<string>(
      CHAPTER_TARGETS[0].id,
    );


  const targets =
    useMemo(
      () =>
        CHAPTER_TARGETS,
      [],
    );


  useEffect(
    () => {

      activeIdRef.current =
        activeId;

    },
    [
      activeId,
    ],
  );


  /* ========================================================
     ACTIVE SECTION DETECTION

     The HOME now contains four large environments.

     We continue to compare intersection ratios rather than
     activating a section simply because it has entered the
     viewport. This preserves the visual behavior of the
     previous eight-section navigator.
  ======================================================== */

  useEffect(
    () => {

      const elements =
        targets
          .map(
            (
              target,
            ) =>
              document.getElementById(
                target.id,
              ),
          )
          .filter(
            (
              element,
            ): element is HTMLElement =>
              Boolean(
                element,
              ),
          );


      if (
        elements.length ===
        0
      ) {
        return;
      }


      /*
       * Store the latest observed intersection ratio
       * for every HOME environment.
       */
      const ratios =
        new Map<
          string,
          number
        >();


      elements.forEach(
        (
          element,
        ) => {

          ratios.set(
            element.id,
            0,
          );

        },
      );


      const observer =
        new IntersectionObserver(
          (
            entries,
          ) => {

            entries.forEach(
              (
                entry,
              ) => {

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


            let strongestRatio =
              0;


            targets.forEach(
              (
                target,
              ) => {

                const ratio =
                  ratios.get(
                    target.id,
                  ) ??
                  0;


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


            /*
             * Preserve the current HOME environment
             * when every tracked section is outside
             * the effective observation area.
             */
            if (
              strongestRatio <=
              0
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
            /*
             * Keep the existing multi-threshold behavior.
             *
             * It remains useful because Map, Episteme,
             * Inquiry, and Valley can have slightly
             * different responsive heights.
             */
            threshold: [
              0.05,
              0.12,
              0.2,
              0.32,
              0.45,
              0.6,
              0.75,
            ],

            /*
             * Slightly reduce the effective viewport
             * so the next environment is not selected
             * prematurely during smooth scrolling.
             */
            rootMargin:
              "-5% 0px -5% 0px",
          },
        );


      elements.forEach(
        (
          element,
        ) => {

          observer.observe(
            element,
          );

        },
      );


      return () => {

        observer.disconnect();

      };

    },
    [
      targets,
    ],
  );


  /* ========================================================
     CURRENT POSITION
  ======================================================== */

  const currentIndex =
    targets.findIndex(
      (
        target,
      ) =>
        target.id ===
        activeId,
    );


  const safeCurrentIndex =
    currentIndex >=
      0
      ? currentIndex
      : 0;


  const previousTarget =
    targets[
      Math.max(
        0,
        safeCurrentIndex -
          1,
      )
    ];


  const nextTarget =
    targets[
      Math.min(
        targets.length -
          1,
        safeCurrentIndex +
          1,
      )
    ];


  const isFirst =
    safeCurrentIndex ===
    0;


  const isLast =
    safeCurrentIndex ===
    targets.length -
      1;


  /* ========================================================
     UI
  ======================================================== */

  return (
    <nav
      className="chapter-navigator"
      aria-label="ArcheNova HOME navigation"
    >

      {/* ===============================================
          PREVIOUS
      =============================================== */}

      <button
        type="button"
        className={[
          "chapter-nav-arrow",

          isFirst
            ? "is-edge"
            : "",
        ]
          .filter(
            Boolean,
          )
          .join(
            " ",
          )}
        onClick={() => {

          if (
            isFirst
          ) {
            return;
          }


          scrollToChapter(
            previousTarget.id,
          );

        }}
        aria-label={
          isFirst
            ? "First HOME environment"
            : `Previous environment: ${previousTarget.title}`
        }
        disabled={
          isFirst
        }
      >
        ↑
      </button>


      {/* ===============================================
          ENVIRONMENT LIST
      =============================================== */}

      <div className="chapter-nav-list">

        {targets.map(
          (
            target,
          ) => {

            const active =
              activeId ===
              target.id;


            return (
              <button
                key={
                  target.id
                }
                type="button"
                className={[
                  "chapter-nav-item",

                  active
                    ? "active"
                    : "",
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    " ",
                  )}
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

                {/* =========================================
                    SYMBOL
                ========================================= */}

                <span
                  className="chapter-nav-mark"
                  aria-hidden="true"
                >
                  {
                    target.mark
                  }
                </span>


                {/* =========================================
                    COPY
                ========================================= */}

                <span className="chapter-nav-copy">

                  <strong>
                    {
                      target.title
                    }
                  </strong>

                  <small>
                    {
                      target.subtitle
                    }
                  </small>

                </span>

              </button>
            );
          },
        )}

      </div>


      {/* ===============================================
          NEXT
      =============================================== */}

      <button
        type="button"
        className={[
          "chapter-nav-arrow",

          isLast
            ? "is-edge"
            : "",
        ]
          .filter(
            Boolean,
          )
          .join(
            " ",
          )}
        onClick={() => {

          if (
            isLast
          ) {
            return;
          }


          scrollToChapter(
            nextTarget.id,
          );

        }}
        aria-label={
          isLast
            ? "Last HOME environment"
            : `Next environment: ${nextTarget.title}`
        }
        disabled={
          isLast
        }
      >
        ↓
      </button>

    </nav>
  );
}