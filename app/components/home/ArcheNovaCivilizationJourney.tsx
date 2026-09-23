"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import ArcheNovaQuietSpace from "./ArcheNovaQuietSpace";

/* ==========================================================
   ARCHENOVA CIVILIZATION JOURNEY

   MAP
   → THE HORIZON
   → THE ARCHENOVA WORLD
   → THE STILLNESS
   → FOUNDER

   Three independent HOME sections.

   No external animation library.
   No external image dependency.
   No additional HOME glass inside the section surface.
========================================================== */

type World = {
  id: string;
  number: string;
  domain: string;
  title: string;
  statement: string;
  description: string;
  visual: string;
  visualLabel: string;
  coordinates: string;
};

const WORLDS: readonly World[] = [
  {
    id: "spacetime",
    number: "01",
    domain: "SPACETIME SYSTEMS",
    title: "Beyond the Known Horizon.",
    statement: "Expand the boundaries of what humanity can observe.",
    description:
      "A civilization that treats the universe not as a distant backdrop, but as a reality to be understood through observation, physical law, and reproducible engineering.",
    visual: "spacetime",
    visualLabel: "THE OBSERVATORY",
    coordinates: "REALITY / SPACE / TIME",
  },
  {
    id: "cognition",
    number: "02",
    domain: "COGNITIVE INFRASTRUCTURE",
    title: "Intelligence as Infrastructure.",
    statement: "Make knowledge a capability that can be examined and corrected.",
    description:
      "A world in which human inquiry and artificial intelligence work together to investigate evidence, compare explanations, and preserve the ability to revise conclusions.",
    visual: "cognition",
    visualLabel: "THE COGNITIVE COMMONS",
    coordinates: "KNOWLEDGE / REASONING / CORRECTION",
  },
  {
    id: "energy",
    number: "03",
    domain: "ENERGY DYNAMICS",
    title: "Powering Continuity.",
    statement: "Design energy systems for the timescales of civilization.",
    description:
      "An energy landscape conceived around reliable supply, long-term stewardship, recoverability, and the physical infrastructure required to sustain human activity.",
    visual: "energy",
    visualLabel: "THE ENERGY LANDSCAPE",
    coordinates: "ENERGY / INFRASTRUCTURE / TIME",
  },
  {
    id: "biosystems",
    number: "04",
    domain: "BIOSYSTEMS",
    title: "Life, Understood and Protected.",
    statement: "Connect the understanding of life with responsible capability.",
    description:
      "A scientific environment where biological knowledge, engineering, and careful evaluation support the protection of life and the resilience of living systems.",
    visual: "biosystems",
    visualLabel: "THE LIVING SYSTEMS",
    coordinates: "LIFE / SCIENCE / RESILIENCE",
  },
  {
    id: "civilization",
    number: "05",
    domain: "CIVILIZATION INTELLIGENCE",
    title: "Designing for Generations.",
    statement: "Keep the future open to those who will inherit it.",
    description:
      "A civilization in which scientific capability, technological infrastructure, and institutional responsibility develop together—without losing the ability to observe, question, correct, and recover.",
    visual: "civilization",
    visualLabel: "THE CIVILIZATION FORUM",
    coordinates: "CAPABILITY / GOVERNANCE / FUTURE",
  },
];

/* ==========================================================
   REVEAL

   IntersectionObserver is used only to add a visual class.
   Content remains accessible without JavaScript animation.
========================================================== */

function useRevealOnScroll(
  rootRef: React.RefObject<HTMLElement>,
) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-an-journey-reveal]",
      ),
    );

    if (elements.length === 0) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [rootRef]);
}

/* ==========================================================
   SHARED VISUAL

   Original CSS-based conceptual visual language.

   These are representations of proposed worlds, not claims
   that physical ArcheNova facilities already exist.
========================================================== */

function WorldVisual({
  visual,
  label,
  quiet = false,
}: {
  visual: string;
  label: string;
  quiet?: boolean;
}) {
  return (
    <div
      className={[
        "an-journey-visual",
        `an-journey-visual--${visual}`,
        quiet ? "an-journey-visual--quiet" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="an-journey-visual__ambient" />
      <div className="an-journey-visual__grid" />

      <div className="an-journey-visual__architecture">
        <div className="an-journey-visual__arch an-journey-visual__arch--one" />
        <div className="an-journey-visual__arch an-journey-visual__arch--two" />
        <div className="an-journey-visual__arch an-journey-visual__arch--three" />
      </div>

      <div className="an-journey-visual__core">
        <span className="an-journey-visual__ring an-journey-visual__ring--one" />
        <span className="an-journey-visual__ring an-journey-visual__ring--two" />
        <span className="an-journey-visual__ring an-journey-visual__ring--three" />
        <span className="an-journey-visual__light" />
      </div>

      <div className="an-journey-visual__horizon" />

      <span className="an-journey-visual__label">
        {label}
      </span>
    </div>
  );
}

/* ==========================================================
  THE HORIZON

  Outward contemplation.
========================================================== */

export function ArcheNovaHorizon() {
 return (
   <ArcheNovaQuietSpace
     id="archenova-horizon"
     variant="horizon"
     accessibleName="The Horizon"
     sentence="A quiet view of the world we seek to understand."
   />
 );
}


/* ==========================================================
   02 — THE ARCHENOVA WORLD
========================================================== */

export function ArcheNovaWorld() {
  const sectionRef = useRef<HTMLElement>(null);

  const [selectedWorldId, setSelectedWorldId] =
    useState<string | null>(null);

  const selectedWorld =
    WORLDS.find((world) => world.id === selectedWorldId) ??
    null;

  useRevealOnScroll(sectionRef);

  useEffect(() => {
    if (!selectedWorld) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedWorldId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedWorld]);

  return (
    <section
      ref={sectionRef}
      id="archenova-world"
      data-home-section
      className={[
        "home-page",
        "an-home-2026__section",
        "an-journey-section",
        "an-journey-section--world",
      ].join(" ")}
      aria-labelledby="an-world-title"
    >
      <header className="an-journey-world__intro">
        <div
          className="an-journey-eyebrow"
          data-an-journey-reveal
        >
          <span className="an-journey-eyebrow__line" />

          ARCHENOVA / CIVILIZATION COLLECTION
        </div>

        <h2
          id="an-world-title"
          className="an-journey-world__title"
          data-an-journey-reveal
        >
          The ArcheNova
          <br />
          World.
        </h2>

        <p
          className="an-journey-world__lead"
          data-an-journey-reveal
        >
          A world shaped by science.
          <br />
          Built through engineering.
          <br />
          Sustained by responsibility.
        </p>

        <div
          className="an-journey-world__intro-bottom"
          data-an-journey-reveal
        >
          <span>FIVE DOMAINS / ONE CIVILIZATION</span>

          <span>EXPLORE THE COLLECTION ↓</span>
        </div>
      </header>

      <div className="an-journey-world__collection">
        {WORLDS.map((world, index) => {
          const isSelected =
            selectedWorldId === world.id;

          return (
            <article
              key={world.id}
              className={[
                "an-journey-world-card",
                index === 0 || index === 4
                  ? "an-journey-world-card--wide"
                  : "",
                isSelected
                  ? "an-journey-world-card--selected"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-an-journey-reveal
              style={
                {
                  "--an-journey-card-index": index,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className="an-journey-world-card__button"
                aria-expanded={isSelected}
                aria-controls={`an-world-detail-${world.id}`}
                onClick={() => {
                  setSelectedWorldId(
                    isSelected ? null : world.id,
                  );
                }}
              >
                <div className="an-journey-world-card__image">
                  <WorldVisual
                    visual={world.visual}
                    label={world.visualLabel}
                  />

                  <span className="an-journey-world-card__image-index">
                    WORLD {world.number} / 05
                  </span>

                  <span
                    className="an-journey-world-card__image-action"
                    aria-hidden="true"
                  >
                    {isSelected ? "−" : "+"}
                  </span>
                </div>

                <div className="an-journey-world-card__caption">
                  <div className="an-journey-world-card__meta">
                    <span>{world.domain}</span>

                    <span>{world.number} / 05</span>
                  </div>

                  <h3>{world.title}</h3>

                  <p>{world.statement}</p>

                  <span className="an-journey-world-card__explore">
                    {isSelected
                      ? "CLOSE THE WORLD"
                      : "EXPLORE THE WORLD"}

                    <span aria-hidden="true">
                      {isSelected ? "−" : "↗"}
                    </span>
                  </span>
                </div>
              </button>

              <div
                id={`an-world-detail-${world.id}`}
                className={[
                  "an-journey-world-card__detail",
                  isSelected ? "is-open" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                hidden={!isSelected}
              >
                <span className="an-journey-world-card__detail-label">
                  {world.coordinates}
                </span>

                <p>{world.description}</p>

                <span className="an-journey-world-card__detail-note">
                  A CONCEPTUAL WORLD BY ARCHENOVA
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <footer
        className="an-journey-world__footer"
        data-an-journey-reveal
      >
        <span>ARCHENOVA / FIVE DOMAINS</span>

        <p>
          Not a finished destination.
          <br />
          A world to be understood, tested, and built.
        </p>
      </footer>
    </section>
  );
}

/* ==========================================================
  THE STILLNESS

  Inward contemplation.
========================================================== */

export function ArcheNovaStillness() {
 return (
   <ArcheNovaQuietSpace
     id="archenova-stillness"
     variant="stillness"
     accessibleName="The Stillness"
     sentence="Beyond every discovery lies a question worth contemplating."
   />
 );
}