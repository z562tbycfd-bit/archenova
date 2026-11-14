"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ==========================================================
   ARCHENOVA / HOME SECTION PAGER

   INTEGRATED CIVILIZATION NAVIGATION
   2026

   DESIGN PRINCIPLES

   - Preserve existing visual design.
   - Preserve all original CSS class names.
   - Preserve background tap-to-toggle.
   - Preserve smooth scroll navigation.
   - Preserve previous / next controls.
   - Preserve IntersectionObserver.
   - Improve active-section detection.
   - Support independent Inquiry section.
   - Support integrated Civilization OS.
   - Avoid duplicate HOME section targets.
   - Respect reduced-motion preferences.
   - Remain fully invisible when collapsed.
   - No close icon.
   - No menu icon.
   - No floating toggle button.

   CSS ownership:
   app/globals.css

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

   02 — ARCHENOVA CIVILIZATION VISION
        └─ ArcheNovaSpaceFrame
           ├─ Synthesis
           ├─ Relations
           └─ World

   03 — ARCHENOVA INQUIRY
        └─ ArcheNovaInquiryFrame
           ├─ Today's Inquiry
           └─ Permanent Inquiry

   04 — THE ARCHITECTURE OF CIVILIZATION

   05 — CIVILIZATION OS
        └─ ArcheNovaCivilizationOSFrame
           ├─ Overview
           ├─ Operations
           ├─ Integrity
           └─ Continuity

   Internal tabs are managed by their own frames.

========================================================== */

const CHAPTER_TARGETS: readonly ChapterTarget[] = [
  {
    id: "oryvanth-civilization",
    mark: "❂",
    title: "ORYVANTH",
    subtitle:
      "An Independent Scientific Civilization.",
  },
  {
    id: "archenova-space",
    mark: "✪",
    title: "CIVILIZATION VISION",
    subtitle:
      "Synthesis · Relations · World",
  },
  {
    id: "archenova-inquiry",
    mark: "✦",
    title: "ARCHENOVA INQUIRY",
    subtitle:
      "Today's Inquiry · Permanent Inquiry",
  },
  {
    id: "archenova-architecture-of-civilization",
    mark: "⧉",
    title: "ARCHITECTURE",
    subtitle:
      "The Architecture of Civilization.",
  },
  {
    id: "archenova-civilization-os",
    mark: "⌱",
    title: "CIVILIZATION OS",
    subtitle:
      "Reality-Connected. Correctable by Design.",
  },
] as const;

/* ==========================================================
   INTERACTIVE ELEMENT SELECTOR

   HOME background taps must never interfere with:

   - Buttons
   - Links
   - Inputs
   - Tabs
   - Menus
   - Editable content
   - Other interactive elements

========================================================== */

const INTERACTIVE_SELECTOR = [
  "button",
  "a",
  "input",
  "select",
  "textarea",
  "summary",
  "label",
  "option",
  "audio",
  "video",
  "iframe",
  '[role="button"]',
  '[role="tab"]',
  '[role="tablist"]',
  '[role="link"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="menu"]',
  '[role="menuitem"]',
  '[role="slider"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
  "[data-home-pager-ignore]",
].join(", ");

/* ==========================================================
   SCROLL NAVIGATION

   Preserve native scrollIntoView behavior.

========================================================== */

function scrollToChapter(id: string): boolean {
  const element = document.getElementById(id);

  if (!element) {
    return false;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });

  return true;
}

/* ==========================================================
   VIEWPORT POSITION ANALYSIS

   Determines which HOME environment is closest
   to the active reading region.

   The active reading region is approximately
   the central portion of the viewport.

   This is a navigation heuristic, not a
   measurement of actual reading attention.

========================================================== */

function getViewportActiveChapter(
  targets: readonly ChapterTarget[],
): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const viewportHeight = window.innerHeight;

  if (viewportHeight <= 0) {
    return null;
  }

  const readingLine = viewportHeight * 0.42;

  let containingId: string | null = null;
  let containingDistance = Number.POSITIVE_INFINITY;

  let nearestId: string | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const target of targets) {
    const element = document.getElementById(
      target.id,
    );

    if (!element) {
      continue;
    }

    const rect = element.getBoundingClientRect();

    if (
      rect.height <= 0 ||
      rect.width <= 0
    ) {
      continue;
    }

    const intersectsViewport =
      rect.bottom > 0 &&
      rect.top < viewportHeight;

    if (!intersectsViewport) {
      continue;
    }

    const containsReadingLine =
      rect.top <= readingLine &&
      rect.bottom >= readingLine;

    const distanceToReadingLine =
      containsReadingLine
        ? 0
        : Math.min(
            Math.abs(rect.top - readingLine),
            Math.abs(rect.bottom - readingLine),
          );

    const centerDistance = Math.abs(
      (rect.top + rect.bottom) / 2 -
        readingLine,
    );

    if (
      containsReadingLine &&
      centerDistance < containingDistance
    ) {
      containingDistance = centerDistance;
      containingId = target.id;
    }

    if (
      distanceToReadingLine < nearestDistance
    ) {
      nearestDistance = distanceToReadingLine;
      nearestId = target.id;
    }
  }

  return containingId ?? nearestId;
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

  const frameRef = useRef<number | null>(null);

  const targets = CHAPTER_TARGETS;

  /* ========================================================
     ACTIVE STATE UPDATE

     Avoid redundant React updates.
  ======================================================== */

  const updateActiveId = useCallback(
    (nextId: string) => {
      if (activeIdRef.current === nextId) {
        return;
      }

      activeIdRef.current = nextId;
      setActiveId(nextId);
    },
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

     Tap non-interactive HOME content:

       visible → invisible
       invisible → visible

     Preserve:
       - Existing HOME controls
       - Tabs and accordions
       - Links
       - Form inputs
       - Text selections
       - Interactions outside HOME

     No separate toggle UI is rendered.
  ======================================================== */

  useEffect(() => {
    const handleScreenClick = (
      event: MouseEvent,
    ) => {
      if (event.defaultPrevented) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const home = document.getElementById(
        "home-top",
      );

      if (
        !home ||
        !home.contains(target)
      ) {
        return;
      }

      if (rootRef.current?.contains(target)) {
        return;
      }

      if (
        target.closest(INTERACTIVE_SELECTOR)
      ) {
        return;
      }

      const selection = window.getSelection();

      if (
        selection &&
        !selection.isCollapsed &&
        selection.toString().trim().length > 0
      ) {
        return;
      }

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

     IntersectionObserver:
       detects section visibility.

     Viewport analysis:
       selects the active reading region.

     RequestAnimationFrame:
       prevents repeated synchronous measurements
       during rapid scrolling.

     Only top-level HOME environments are observed.

     Internal frame tabs are excluded.
  ======================================================== */

  useEffect(() => {
    const elements = targets
      .map((target) =>
        document.getElementById(target.id),
      )
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement,
      );

    if (elements.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    elements.forEach((element) => {
      ratios.set(element.id, 0);
    });

    const detectActiveChapter = () => {
      frameRef.current = null;

      const viewportId =
        getViewportActiveChapter(targets);

      if (viewportId) {
        updateActiveId(viewportId);
        return;
      }

      let strongestId: string | null = null;
      let strongestRatio = 0;

      for (const target of targets) {
        const ratio =
          ratios.get(target.id) ?? 0;

        if (ratio > strongestRatio) {
          strongestRatio = ratio;
          strongestId = target.id;
        }
      }

      if (
        strongestId &&
        strongestRatio > 0
      ) {
        updateActiveId(strongestId);
      }
    };

    const scheduleDetection = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current =
        window.requestAnimationFrame(
          detectActiveChapter,
        );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting
              ? entry.intersectionRatio
              : 0,
          );
        }

        scheduleDetection();
      },
      {
        threshold: [
          0,
          0.05,
          0.12,
          0.2,
          0.32,
          0.45,
          0.6,
          0.75,
          1,
        ],
        rootMargin: "-5% 0px -5% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    window.addEventListener(
      "scroll",
      scheduleDetection,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      scheduleDetection,
      { passive: true },
    );

    scheduleDetection();

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        scheduleDetection,
      );

      window.removeEventListener(
        "resize",
        scheduleDetection,
      );

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(
          frameRef.current,
        );

        frameRef.current = null;
      }
    };
  }, [targets, updateActiveId]);

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

     Navigate to selected HOME environment.

     Hide navigator after successful navigation.
  ======================================================== */

  const navigateTo = useCallback(
    (id: string) => {
      const navigated =
        scrollToChapter(id);

      if (!navigated) {
        return;
      }

      updateActiveId(id);

      setExpanded(false);
    },
    [updateActiveId],
  );

  /* ========================================================
     UI

     ORIGINAL CLASS NAMES PRESERVED

     chapter-navigator
     chapter-nav-arrow
     chapter-nav-list
     chapter-nav-item
     chapter-nav-mark
     chapter-nav-copy

     No additional toggle controls.

     Collapsed state:
       no icon
       no button
       no visible background
       no visible border

========================================================== */

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
                active ? "location" : undefined
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