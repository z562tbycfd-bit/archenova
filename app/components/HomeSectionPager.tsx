"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ==========================================================
   ARCHENOVA HOME SECTION PAGER
   COMPLETE TAP-TO-TOGGLE EDITION

   2026

   DESIGN PRINCIPLES
   - Preserve the original visual design
   - Preserve existing CSS class names
   - Preserve scroll navigation
   - Preserve active-section detection
   - No close icon
   - No menu icon
   - No floating toggle button
   - Fully invisible when collapsed
   - Tap the HOME background to toggle visibility
   - Preserve existing HOME interactions
========================================================== */

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

   01 — ORYVANTH CIVILIZATION

   02 — ARCHENOVA SPACE
        ├─ Civilization Synthesis
        ├─ Civilizational Relations
        └─ The ArcheNova World

   03 — ARCHITECTURE OF CIVILIZATION

   04 — CIVILIZATION OPERATING SYSTEM

   The three ArcheNova Space chapters are
   managed inside ArcheNovaSpaceFrame.
========================================================== */

const CHAPTER_TARGETS: readonly ChapterTarget[] = [
  {
    id: "oryvanth-civilization",
    mark: "❂",
    title: "ORYVANTH",
    subtitle:
      "The Totality of Existence and Development.",
  },
  {
    id: "archenova-space",
    mark: "✧",
    title: "ARCHENOVA SPACE",
    subtitle:
      "Synthesis · Relations · World",
  },
  {
    id: "archenova-architecture-of-civilization",
    mark: "⧉",
    title: "ARCHITECTURE",
    subtitle:
      "What is the Architecture?",
  },
  {
    id: "civilization-operating-system",
    mark: "⌱",
    title: "CIVILIZATION OS",
    subtitle:
      "Reality-Connected. Correctable by Design.",
  },
];

/* ==========================================================
   SCROLL NAVIGATION

   Preserve original smooth scrolling.
========================================================== */

function scrollToChapter(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

/* ==========================================================
   COMPONENT
========================================================== */

export default function HomeSectionPager() {
  /* ========================================================
     STATE
  ======================================================== */

  const [activeId, setActiveId] = useState<string>(
    CHAPTER_TARGETS[0].id,
  );

  const [expanded, setExpanded] = useState(true);

  const activeIdRef = useRef<string>(
    CHAPTER_TARGETS[0].id,
  );

  const rootRef = useRef<HTMLElement | null>(null);

  const targets = useMemo(
    () => CHAPTER_TARGETS,
    [],
  );

  /* ========================================================
     ACTIVE ID SYNCHRONIZATION
  ======================================================== */

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  /* ========================================================
     SCREEN TAP TOGGLE

     Tap the HOME background:
       visible → invisible
       invisible → visible

     Ignore:
       - Pager itself
       - Buttons
       - Links
       - Form controls
       - Chapter tabs
       - Editable content
       - Text selections
       - Interactions outside HOME

     No separate toggle UI is rendered.
  ======================================================== */

  useEffect(() => {
    const handleScreenClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      /* Only respond to HOME interactions */

      const home = document.getElementById("home-top");

      if (!home || !home.contains(target)) {
        return;
      }

      /* Ignore the navigator itself */

      if (rootRef.current?.contains(target)) {
        return;
      }

      /* Preserve existing interactive controls */

      const interactive = target.closest(
        [
          "button",
          "a",
          "input",
          "select",
          "textarea",
          "summary",
          "label",
          '[role="button"]',
          '[role="tab"]',
          '[role="link"]',
          '[role="switch"]',
          '[role="checkbox"]',
          '[role="radio"]',
          '[contenteditable="true"]',
        ].join(", "),
      );

      if (interactive) {
        return;
      }

      /* Do not toggle while selecting text */

      const selection = window.getSelection();

      if (
        selection &&
        !selection.isCollapsed &&
        selection.toString().trim().length > 0
      ) {
        return;
      }

      /* Toggle the entire navigator */

      setExpanded((previous) => !previous);
    };

    document.addEventListener(
      "click",
      handleScreenClick,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleScreenClick,
      );
    };
  }, []);

  /* ========================================================
     ACTIVE SECTION DETECTION

     Preserve original:
       - IntersectionObserver
       - Thresholds
       - Root margin
       - Strongest visible section
       - Active state synchronization

     Observe only the four HOME destinations.
  ======================================================== */

  useEffect(() => {
    const elements = targets
      .map((target) =>
        document.getElementById(target.id),
      )
      .filter(
        (element): element is HTMLElement =>
          Boolean(element),
      );

    if (elements.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    elements.forEach((element) => {
      ratios.set(element.id, 0);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting
              ? entry.intersectionRatio
              : 0,
          );
        });

        let strongestId = activeIdRef.current;
        let strongestRatio = 0;

        targets.forEach((target) => {
          const ratio =
            ratios.get(target.id) ?? 0;

          if (ratio > strongestRatio) {
            strongestRatio = ratio;
            strongestId = target.id;
          }
        });

        if (strongestRatio <= 0) {
          return;
        }

        if (strongestId !== activeIdRef.current) {
          activeIdRef.current = strongestId;
          setActiveId(strongestId);
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
        rootMargin: "-5% 0px -5% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [targets]);

  /* ========================================================
     CURRENT POSITION

     Preserve previous / next navigation.
  ======================================================== */

  const currentIndex = targets.findIndex(
    (target) => target.id === activeId,
  );

  const safeCurrentIndex =
    currentIndex >= 0 ? currentIndex : 0;

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
    safeCurrentIndex === targets.length - 1;

  /* ========================================================
     NAVIGATION ACTION

     Navigate to selected section.
     Automatically hide pager after selection.
  ======================================================== */

  const navigateTo = (id: string) => {
    scrollToChapter(id);

    setExpanded(false);
  };

  /* ========================================================
     UI

     Original class names preserved:

       chapter-navigator
       chapter-nav-arrow
       chapter-nav-list
       chapter-nav-item
       chapter-nav-mark
       chapter-nav-copy

     No toggle buttons or additional wrappers.

     When hidden:
       no icon
       no button
       no background
       no border
       no visible navigator
  ======================================================== */

  return (
    <nav
      ref={rootRef}
      className="chapter-navigator"
      aria-label="ArcheNova HOME navigation"
      hidden={!expanded}
    >
      {/* ==================================================
          PREVIOUS ENVIRONMENT
      ================================================== */}

      <button
        type="button"
        className={[
          "chapter-nav-arrow",
          isFirst ? "is-edge" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!isFirst) {
            navigateTo(previousTarget.id);
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

      {/* ==================================================
          HOME DESTINATIONS
      ================================================== */}

      <div className="chapter-nav-list">
        {targets.map((target) => {
          const active =
            activeId === target.id;

          return (
            <button
              key={target.id}
              type="button"
              className={[
                "chapter-nav-item",
                active ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                navigateTo(target.id);
              }}
              aria-label={`Go to ${target.title}`}
              aria-current={
                active ? "page" : undefined
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
        })}
      </div>

      {/* ==================================================
          NEXT ENVIRONMENT
      ================================================== */}

      <button
        type="button"
        className={[
          "chapter-nav-arrow",
          isLast ? "is-edge" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!isLast) {
            navigateTo(nextTarget.id);
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