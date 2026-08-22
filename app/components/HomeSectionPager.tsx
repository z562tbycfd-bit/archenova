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

   Fixed HOME architecture:

   01 Search
   02 Episteme
   03 Inquiry
   04 Knowledge
   05 Intelligence
   06 Realization
   07 Governance
   08 Experience

   Cards added inside Knowledge / Intelligence /
   Realization / Governance / Experience do not become
   new HomeSectionPager pages.
========================================================== */

const CHAPTER_TARGETS:
  readonly ChapterTarget[] = [

  {
    id:
      "archenova-search-section",

    mark:
      "⌭",

    title:
      "SEARCH",

    subtitle:
      "Explore ArcheNova",
  },

  {
    id:
      "episteme-dialogue",

    mark:
      "☻",

    title:
      "EPISTEME",

    subtitle:
      "Dialogue & Reasoning",
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
      "civilization-library",

    mark:
      "⎅",

    title:
      "KNOWLEDGE",

    subtitle:
      "What is known?",
  },

  {
    id:
      "civilization-intelligence",

    mark:
      "⚛︎",

    title:
      "INTELLIGENCE",

    subtitle:
      "What does it mean?",
  },

  {
  id: "civilization-realization",

  mark: "♅",

  title: "IMPLEMENTATION",

  subtitle: "How does it become real?",
},

  {
    id:
      "civilization-governance",

    mark:
      "♆",

    title:
      "GOVERNANCE",

    subtitle:
      "How may it scale?",
  },

  {
    id:
      "civilization-experience",

    mark:
      "❅",

    title:
      "EXPERIENCE",

    subtitle:
      "How is it experienced?",
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


  if (!element) {
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
   * Keep current active section available to
   * IntersectionObserver without rebuilding the observer
   * every time the active section changes.
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
       * Store the most recent ratio for every HOME section.
       *
       * This is more stable than judging only the entries
       * supplied by the current IntersectionObserver callback.
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
             * Do not replace the active page when
             * every tracked section is effectively outside
             * the observation area.
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
             * Multiple thresholds make detection stable
             * for large full-page HOME sections as well as
             * slightly shorter responsive sections.
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
             * Slightly reduce the effective viewport so
             * the next chapter is not activated too early.
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
          .filter(Boolean)
          .join(" ")}
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
            ? "First HOME section"
            : `Previous section: ${previousTarget.title}`
        }
        disabled={
          isFirst
        }
      >
        ↑
      </button>


      {/* ===============================================
          SECTION LIST
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

                <span
                  className="chapter-nav-mark"
                  aria-hidden="true"
                >
                  {
                    target.mark
                  }
                </span>


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
          .filter(Boolean)
          .join(" ")}
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
            ? "Last HOME section"
            : `Next section: ${nextTarget.title}`
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