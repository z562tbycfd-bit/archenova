"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA / WORKS

   FULL-VIEWPORT EXHIBITION
   PURE BLACK × TRANSLUCENT BLACK GLASS

   DISPLAY PRINCIPLES

   - Every exhibition occupies the full available width.
   - Each exhibition has at least one viewport of height.
   - Content may extend vertically when the device is short.
   - Heading, artwork and navigation have separate layout zones.
   - No fixed-position foreground cards over the artwork.
   - No narrow outer container or 1440px width limit.
   - Artwork is decorative, not experimental evidence.
========================================================== */

type VisualType = "episteme" | "aetherion" | "research";

type Work = {
  number: string;
  id: VisualType;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  status: string;
  statusDetail: string;
  evidence: string;
  openQuestion: string;
  collaboration: string;
  href: string;
  action: string;
};

const WORKS: Work[] = [
  {
    number: "01",
    id: "episteme",
    category: "COGNITIVE INTELLIGENCE",
    name: "Episteme",
    subtitle: "A space to think beyond the question.",
    description:
      "ArcheNova's evolving cognitive environment for dialogue, reasoning, and research exploration.",
    status: "DIGITAL ENVIRONMENT",
    statusDetail:
      "The public experience can be explored through ArcheNova. Individual capabilities may be at different stages of development.",
    evidence:
      "Explore the public interface and its currently accessible interactions. Implementation details and independently verified performance are not implied by the interface alone.",
    openQuestion:
      "How can scientific reasoning remain traceable, testable, and correctable as cognitive capabilities expand?",
    collaboration:
      "AI systems, scientific reasoning, evaluation methods, and human–AI interaction.",
    href: "/home#episteme-dialogue",
    action: "EXPERIENCE EPISTEME",
  },
  {
    number: "02",
    id: "aetherion",
    category: "ORBITAL MANUFACTURING",
    name: "Aetherion",
    subtitle: "Manufacturing beyond the ground.",
    description:
      "An architectural concept exploring orbital manufacturing and civilization-scale production systems.",
    status: "SYSTEM CONCEPT",
    statusDetail:
      "Aetherion is presented as a design concept. It is not represented here as an operating manufacturing facility.",
    evidence:
      "Conceptual architecture, enabling technologies, feasibility conditions, and unresolved engineering constraints require separate examination.",
    openQuestion:
      "Which technical, economic, operational, and safety conditions must be demonstrated before orbital production becomes feasible?",
    collaboration:
      "Space systems, manufacturing engineering, energy, robotics, safety, and systems architecture.",
    href: "/home#aetherion",
    action: "EXPLORE THE CONCEPT",
  },
  {
    number: "03",
    id: "research",
    category: "SCIENTIFIC INQUIRY",
    name: "Research & Scientific Frameworks",
    subtitle: "Questions that reality can answer.",
    description:
      "Scientific questions, theoretical propositions, and frameworks designed to distinguish claims from evidence.",
    status: "RESEARCH & FRAMEWORKS",
    statusDetail:
      "Research documents and conceptual frameworks must be distinguished from completed experiments and independently reproduced findings.",
    evidence:
      "Relevant publications, mathematical formulations, testable predictions, and experimental results should be associated with each individual research claim.",
    openQuestion:
      "What observations or experiments could distinguish competing explanations and falsify the proposed models?",
    collaboration:
      "Theoretical research, experimental design, measurement, reproducibility, and independent scientific review.",
    href: "/research",
    action: "EXPLORE RESEARCH",
  },
];

const EVIDENCE_STEPS = [
  {
    number: "01",
    title: "Experience",
    description:
      "Access the public environment or examine the artifact currently presented.",
  },
  {
    number: "02",
    title: "Examine",
    description:
      "Separate implemented capabilities, conceptual designs, and independently verified findings.",
  },
  {
    number: "03",
    title: "Challenge",
    description:
      "Identify unresolved questions, feasibility conditions, and evidence needed to advance the work.",
  },
];

/* ==========================================================
   SHARED COMPONENTS
========================================================== */

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="aw-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {diagonal ? (
        <>
          <path d="M5 19 19 5" />
          <path d="M8 5h11v11" />
        </>
      ) : (
        <>
          <path d="M3 12h17" />
          <path d="m13 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px 60px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`aw-reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`aw-glass ${className}`}>{children}</div>;
}

/* ==========================================================
   DETERMINISTIC DECORATIVE PARTICLES
========================================================== */

function seeded(index: number, seed: number) {
  const value =
    Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;

  return value - Math.floor(value);
}

function StarField({
  count = 170,
  seed = 1,
  concentrated = false,
}: {
  count?: number;
  seed?: number;
  concentrated?: boolean;
}) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const angle = seeded(index, seed + 1) * Math.PI * 2;
        const radius = Math.sqrt(seeded(index, seed + 2));

        const x = concentrated
          ? 500 + Math.cos(angle) * radius * 405
          : seeded(index, seed + 3) * 1000;

        const y = concentrated
          ? 500 + Math.sin(angle) * radius * 405
          : seeded(index, seed + 4) * 1000;

        const size = 0.35 + seeded(index, seed + 5) * 1.5;
        const opacity =
          0.13 + seeded(index, seed + 6) * 0.67;

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={size}
            fill="white"
            opacity={opacity}
          />
        );
      })}
    </g>
  );
}

/* ==========================================================
   EPISTEME / ABSTRACT NEURAL SILHOUETTE
========================================================== */

function EpistemeVisual() {
  const nodes = Array.from({ length: 115 }, (_, index) => {
    const angle = seeded(index, 11) * Math.PI * 2;
    const radius = Math.sqrt(seeded(index, 12));

    return {
      x: 510 + Math.cos(angle) * radius * 260,
      y: 420 + Math.sin(angle) * radius * 310,
      r: 0.8 + seeded(index, 13) * 2.3,
    };
  });

  return (
    <svg
      className="aw-art-svg aw-art-svg--episteme"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Abstract luminous neural network forming a human head silhouette"
    >
      <defs>
        <radialGradient id="aw-episteme-light">
          <stop offset="0%" stopColor="#fff8e5" />
          <stop
            offset="22%"
            stopColor="#ead4a5"
            stopOpacity=".8"
          />
          <stop
            offset="100%"
            stopColor="#bda47e"
            stopOpacity="0"
          />
        </radialGradient>

        <filter id="aw-episteme-glow">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        <clipPath id="aw-episteme-clip">
          <path d="M659 155 C555 91 389 125 309 222 C260 279 246 355 260 423 C269 464 246 497 210 538 C186 568 204 591 247 594 L238 643 C233 664 248 675 276 680 C272 722 290 742 342 744 C370 744 399 736 424 739 C468 754 476 818 465 921 L777 921 C736 829 712 765 730 690 C751 625 812 560 813 445 C814 312 756 209 659 155 Z" />
        </clipPath>
      </defs>

      <g className="aw-episteme-breath">
        <path
          d="M659 155 C555 91 389 125 309 222 C260 279 246 355 260 423 C269 464 246 497 210 538 C186 568 204 591 247 594 L238 643 C233 664 248 675 276 680 C272 722 290 742 342 744 C370 744 399 736 424 739 C468 754 476 818 465 921 L777 921 C736 829 712 765 730 690 C751 625 812 560 813 445 C814 312 756 209 659 155 Z"
          fill="#cdb992"
          fillOpacity=".025"
          stroke="#d9c9aa"
          strokeOpacity=".44"
          strokeWidth="1.2"
        />

        <g clipPath="url(#aw-episteme-clip)">
          {Array.from({ length: 42 }, (_, index) => {
            const x = 200 + index * 14;
            const bend = seeded(index, 20) * 130 - 65;

            return (
              <path
                key={`v-${index}`}
                d={`M${x} 90 C${x + bend} 310 ${
                  x - bend
                } 570 ${x + bend * 0.45} 970`}
                fill="none"
                stroke="#e7d7b3"
                strokeOpacity={
                  0.08 + seeded(index, 21) * 0.28
                }
                strokeWidth=".8"
              />
            );
          })}

          {Array.from({ length: 34 }, (_, index) => {
            const y = 170 + index * 21;
            const bend = seeded(index, 22) * 120 - 60;

            return (
              <path
                key={`h-${index}`}
                d={`M180 ${y} C370 ${
                  y + bend
                } 610 ${y - bend} 850 ${y + bend * 0.4}`}
                fill="none"
                stroke="#e7d7b3"
                strokeOpacity={
                  0.07 + seeded(index, 23) * 0.2
                }
                strokeWidth=".8"
              />
            );
          })}

          {nodes.map((node, index) => {
            const next =
              nodes[(index * 7 + 19) % nodes.length];

            return (
              <line
                key={`line-${index}`}
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                stroke="#f0d7a5"
                strokeOpacity=".14"
                strokeWidth=".8"
              />
            );
          })}

          {nodes.map((node, index) => (
            <g key={`node-${index}`}>
              {index % 8 === 0 && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r * 5}
                  fill="url(#aw-episteme-light)"
                  opacity=".75"
                />
              )}

              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="#fff4d9"
                opacity={
                  0.45 + seeded(index, 24) * 0.55
                }
              />
            </g>
          ))}

          <path
            d="M430 220 C550 300 380 390 520 480 S390 630 500 730 S590 820 560 970"
            fill="none"
            stroke="#fff1c8"
            strokeOpacity=".35"
            strokeWidth="12"
            filter="url(#aw-episteme-glow)"
          />

          <path
            d="M430 220 C550 300 380 390 520 480 S390 630 500 730 S590 820 560 970"
            fill="none"
            stroke="#fff1c8"
            strokeOpacity=".85"
            strokeWidth="1.5"
          />
        </g>
      </g>
    </svg>
  );
}

/* ==========================================================
   AETHERION / SILVER ORBITAL ARTWORK

   Inspired by the supplied visual reference:
   intersecting fine white-silver orbital paths,
   scattered stellar particles and a luminous core.

   Conceptual artwork, not an orbital simulation.
========================================================== */

function AetherionVisual() {
  return (
    <svg
      className="aw-art-svg aw-art-svg--aetherion"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Abstract white-silver intersecting orbital paths surrounding a luminous central core"
    >
      <defs>
        <radialGradient id="aw-aetherion-core">
          <stop offset="0%" stopColor="#ffffff" />
          <stop
            offset="15%"
            stopColor="#ffffff"
            stopOpacity=".95"
          />
          <stop
            offset="40%"
            stopColor="#e7eaf0"
            stopOpacity=".42"
          />
          <stop
            offset="100%"
            stopColor="#ffffff"
            stopOpacity="0"
          />
        </radialGradient>

        <filter id="aw-aetherion-glow">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <StarField count={210} seed={34} />

      <g className="aw-aetherion-system">
        <g
          fill="none"
          stroke="#f0f1f4"
          strokeLinecap="round"
        >
          {Array.from({ length: 13 }, (_, index) => (
            <ellipse
              key={`vertical-${index}`}
              cx="500"
              cy="500"
              rx={148 + index * 2.7}
              ry={337 + index * 1.5}
              transform={`rotate(${
                index * 0.45 - 3
              } 500 500)`}
              strokeWidth={
                index % 4 === 0 ? 1.3 : 0.65
              }
              strokeOpacity={
                0.16 + (index % 5) * 0.07
              }
            />
          ))}

          {Array.from({ length: 15 }, (_, index) => (
            <ellipse
              key={`left-${index}`}
              cx="500"
              cy="500"
              rx={346 + index * 1.9}
              ry={128 + index * 1.3}
              transform={`rotate(${
                -31 + index * 0.36
              } 500 500)`}
              strokeWidth={
                index % 5 === 0 ? 1.2 : 0.65
              }
              strokeOpacity={
                0.14 + (index % 6) * 0.055
              }
            />
          ))}

          {Array.from({ length: 15 }, (_, index) => (
            <ellipse
              key={`right-${index}`}
              cx="500"
              cy="500"
              rx={346 + index * 1.9}
              ry={128 + index * 1.3}
              transform={`rotate(${
                31 - index * 0.36
              } 500 500)`}
              strokeWidth={
                index % 5 === 0 ? 1.2 : 0.65
              }
              strokeOpacity={
                0.14 + (index % 6) * 0.055
              }
            />
          ))}
        </g>

        <g
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".12"
          strokeWidth=".65"
        >
          {Array.from({ length: 9 }, (_, index) => (
            <ellipse
              key={`inner-${index}`}
              cx="500"
              cy="500"
              rx={105 + index * 7}
              ry={245 + index * 6}
              transform={`rotate(${
                index * 13
              } 500 500)`}
            />
          ))}
        </g>

        <StarField
          count={310}
          seed={48}
          concentrated
        />

        <circle
          cx="500"
          cy="500"
          r="126"
          fill="url(#aw-aetherion-core)"
          filter="url(#aw-aetherion-glow)"
          opacity=".8"
        />

        <circle
          cx="500"
          cy="500"
          r="84"
          fill="url(#aw-aetherion-core)"
        />

        <circle
          cx="500"
          cy="500"
          r="23"
          fill="#ffffff"
          opacity=".94"
        />

        {Array.from({ length: 105 }, (_, index) => {
          const angle =
            seeded(index, 61) * Math.PI * 2;

          const radius =
            Math.sqrt(seeded(index, 62)) * 105;

          return (
            <circle
              key={`core-${index}`}
              cx={
                500 + Math.cos(angle) * radius
              }
              cy={
                500 + Math.sin(angle) * radius
              }
              r={
                0.6 + seeded(index, 63) * 2.1
              }
              fill="white"
              opacity={
                0.28 + seeded(index, 64) * 0.72
              }
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ==========================================================
   RESEARCH / ABSTRACT PARTICLE MANIFOLD
========================================================== */

function ResearchVisual() {
  const rows = 45;
  const columns = 100;

  const points = Array.from(
    { length: rows * columns },
    (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;

      const u =
        (column / (columns - 1)) * Math.PI * 2;

      const v =
        (row / (rows - 1)) * Math.PI;

      const folds =
        1 +
        0.17 * Math.sin(6 * u + 2 * v) +
        0.11 * Math.cos(9 * u - 3 * v);

      const radius =
        (285 +
          62 * Math.sin(3 * v + 4 * u)) *
        folds;

      const x =
        500 +
        Math.cos(u) *
          Math.sin(v) *
          radius +
        20 * Math.sin(5 * v);

      const y =
        500 +
        Math.sin(u) *
          Math.sin(v) *
          radius *
          0.72 +
        Math.cos(v) * 120;

      const depth =
        Math.cos(u + v * 0.8);

      const opacity = Math.max(
        0.07,
        Math.min(
          0.83,
          0.3 + depth * 0.22,
        ),
      );

      return { x, y, opacity };
    },
  );

  return (
    <svg
      className="aw-art-svg aw-art-svg--research"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Abstract translucent folded scientific manifold formed by fine particles"
    >
      <defs>
        <radialGradient id="aw-research-core">
          <stop
            offset="0%"
            stopColor="#fffaf4"
            stopOpacity=".8"
          />
          <stop
            offset="25%"
            stopColor="#d5d2eb"
            stopOpacity=".36"
          />
          <stop
            offset="100%"
            stopColor="#b8b6df"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <g className="aw-research-manifold">
        <ellipse
          cx="500"
          cy="500"
          rx="270"
          ry="160"
          fill="url(#aw-research-core)"
          transform="rotate(-12 500 500)"
        />

        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={
              index % 19 === 0 ? 1.05 : 0.55
            }
            fill={
              index % 7 === 0
                ? "#fff0dc"
                : "#d6d4f2"
            }
            opacity={point.opacity}
          />
        ))}

        {Array.from({ length: 15 }, (_, index) => (
          <ellipse
            key={`fold-${index}`}
            cx="500"
            cy="500"
            rx={125 + index * 8}
            ry={45 + index * 6}
            transform={`rotate(${
              -24 + index * 3
            } 500 500)`}
            fill="none"
            stroke="#e6def4"
            strokeWidth=".65"
            strokeOpacity=".08"
          />
        ))}
      </g>
    </svg>
  );
}

function WorkVisual({ type }: { type: VisualType }) {
  return (
    <div className={`aw-visual aw-visual--${type}`}>
      {type === "episteme" && <EpistemeVisual />}
      {type === "aetherion" && <AetherionVisual />}
      {type === "research" && <ResearchVisual />}
    </div>
  );
}

function WorkCaption({ type }: { type: VisualType }) {
  const captions: Record<VisualType, string> = {
    episteme:
      "COGNITIVE ENVIRONMENT / ABSTRACT VISUAL",
    aetherion:
      "ORBITAL ARCHITECTURE / CONCEPT VISUAL",
    research:
      "SCIENTIFIC INQUIRY / ABSTRACT VISUAL",
  };

  return <span>{captions[type]}</span>;
}

/* ==========================================================
   PAGE
========================================================== */

export default function WorksPage() {
  const [activeWork, setActiveWork] =
    useState<VisualType>("episteme");

  const selectedWork =
    WORKS.find(
      (work) => work.id === activeWork,
    ) ?? WORKS[0];

  return (
    <main className="aw">
      {/* ==================================================
          OPENING / FULL VIEWPORT
      ================================================== */}

      <section
        className="aw-screen aw-opening"
        aria-labelledby="aw-page-title"
      >
        <header className="aw-opening__top">
          <Link
            href="/home"
            className="aw-back"
          >
            <span
              className="aw-back__arrow"
              aria-hidden="true"
            />
            <span>ARCHENOVA</span>
          </Link>

          <span className="aw-opening__top-label">
            WORKS / RESEARCH · ENGINEERING · CREATION
          </span>
        </header>

        <div className="aw-opening__content">
          <Reveal>
            <p className="aw-kicker">
              AN EXHIBITION OF WORK IN PROGRESS
            </p>

            <h1 id="aw-page-title">
              Ideas become
              <br />
              <span>work.</span>
            </h1>

            <p className="aw-opening__intro">
              Enter the work. Discover its structure.
              Examine what exists — and what remains
              to be proven.
            </p>
          </Reveal>
        </div>

        <nav
          className="aw-opening__index"
          aria-label="Works exhibition"
        >
          {WORKS.map((work) => (
            <a
              key={work.id}
              href={`#${work.id}`}
              className="aw-opening__index-link"
            >
              <span className="aw-opening__index-number">
                {work.number}
              </span>

              <strong>{work.name}</strong>

              <Arrow diagonal />
            </a>
          ))}
        </nav>

        <div className="aw-opening__bottom">
          <span>THREE FIELDS OF WORK</span>

          <a href="#explore">
            ENTER THE EXHIBITION
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* ==================================================
          INTRODUCTION / FULL VIEWPORT
      ================================================== */}

      <section
        id="explore"
        className="aw-screen aw-introduction"
        aria-labelledby="aw-introduction-title"
      >
        <div className="aw-section-inner aw-introduction__layout">
          <Reveal>
            <p className="aw-kicker">
              THE WORKS / 001—003
            </p>

            <h2
              id="aw-introduction-title"
              className="aw-display"
            >
              Three frontiers.
              <br />
              <span>
                One evolving body of work.
              </span>
            </h2>
          </Reveal>

          <Reveal>
            <Glass className="aw-introduction__note">
              <p>
                Cognitive intelligence.
                Orbital manufacturing.
                Scientific inquiry.
              </p>

              <p>
                Each work is presented according to its
                current stage of development. An accessible
                digital experience, an architectural concept,
                and a scientific framework are different
                forms of progress.
              </p>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          WORKS / FULL-VIEWPORT EXHIBITIONS
      ================================================== */}

      {WORKS.map((work) => (
        <section
          key={work.id}
          id={work.id}
          className={`aw-work aw-work--${work.id}`}
          aria-labelledby={`aw-${work.id}-title`}
        >
          {/* EXHIBITION HERO */}

          <div className="aw-screen aw-work__hero">
            <header className="aw-work__hero-top">
              <div className="aw-work__identity">
                <span>WORK {work.number} / 03</span>
                <span>{work.category}</span>
              </div>

              <a
                href="#explore"
                className="aw-work__all"
              >
                ALL WORKS
                <Arrow diagonal />
              </a>
            </header>

            {/*
              Artwork has its own grid area.
              It cannot sit on top of the heading or footer.
            */}

            <div className="aw-work__art-stage">
              <WorkVisual type={work.id} />
            </div>

            <div className="aw-work__hero-copy">
              <Reveal>
                <Glass className="aw-work__heading-glass">
                  <h2 id={`aw-${work.id}-title`}>
                    {work.name}
                  </h2>

                  <p>{work.subtitle}</p>
                </Glass>
              </Reveal>
            </div>

            <div className="aw-work__hero-bottom">
              <span>
                <WorkCaption type={work.id} />
              </span>

              <a href={`#${work.id}-inside`}>
                DISCOVER THE WORK
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* INSIDE THE WORK */}

          <div
            id={`${work.id}-inside`}
            className="aw-screen aw-work__inside"
          >
            <div className="aw-section-inner aw-work__inside-layout">
              <Reveal>
                <div className="aw-work__inside-heading">
                  <p className="aw-kicker">
                    INSIDE THE WORK / {work.number}
                  </p>

                  <h3 className="aw-display">
                    Look closer.
                    <br />
                    <span>
                      Understand the idea.
                    </span>
                  </h3>
                </div>
              </Reveal>

              <Reveal>
                <Glass className="aw-work__description">
                  <span className="aw-small-label">
                    THE WORK
                  </span>

                  <p>{work.description}</p>

                  <Link
                    href={work.href}
                    className="aw-button aw-button--light"
                  >
                    <span>{work.action}</span>
                    <Arrow diagonal />
                  </Link>
                </Glass>
              </Reveal>
            </div>
          </div>

          {/* RESEARCH AND ENGINEERING */}

          <div className="aw-screen aw-work__depth">
            <div className="aw-section-inner aw-work__depth-layout">
              <Reveal>
                <div className="aw-work__depth-heading">
                  <p className="aw-kicker">
                    RESEARCH & ENGINEERING / {work.number}
                  </p>

                  <h3 className="aw-display">
                    What exists.
                    <br />
                    <span>
                      What remains open.
                    </span>
                  </h3>
                </div>
              </Reveal>

              <div className="aw-work__detail-grid">
                <Reveal>
                  <Glass className="aw-detail">
                    <span className="aw-small-label">
                      01 / CURRENT STATE
                    </span>

                    <h4>{work.status}</h4>

                    <p>{work.statusDetail}</p>
                  </Glass>
                </Reveal>

                <Reveal>
                  <Glass className="aw-detail">
                    <span className="aw-small-label">
                      02 / EVIDENCE & LIMITS
                    </span>

                    <h4>
                      What can be examined.
                    </h4>

                    <p>{work.evidence}</p>
                  </Glass>
                </Reveal>

                <Reveal>
                  <Glass className="aw-detail">
                    <span className="aw-small-label">
                      03 / OPEN QUESTION
                    </span>

                    <h4>What comes next.</h4>

                    <p>{work.openQuestion}</p>
                  </Glass>
                </Reveal>
              </div>

              <Reveal>
                <Glass className="aw-work__next">
                  <div className="aw-work__next-copy">
                    <span className="aw-small-label">
                      EXPLORE / COLLABORATE
                    </span>

                    <p>
                      Examine the work or propose a
                      specific research and technical
                      collaboration.
                    </p>
                  </div>

                  <div className="aw-work__next-actions">
                    <Link
                      href={work.href}
                      className="aw-button aw-button--light"
                    >
                      <span>{work.action}</span>
                      <Arrow diagonal />
                    </Link>

                    <a
                      href="#collaboration"
                      className="aw-button aw-button--dark"
                      onClick={() =>
                        setActiveWork(work.id)
                      }
                    >
                      <span>DISCUSS THIS WORK</span>
                      <Arrow />
                    </a>
                  </div>
                </Glass>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ==================================================
          EVIDENCE / FULL VIEWPORT
      ================================================== */}

      <section
        id="evidence"
        className="aw-screen aw-evidence"
        aria-labelledby="aw-evidence-title"
      >
        <div className="aw-section-inner aw-evidence__layout">
          <Reveal>
            <p className="aw-kicker">
              EVIDENCE & LIMITATIONS
            </p>

            <h2
              id="aw-evidence-title"
              className="aw-display"
            >
              See the work.
              <br />
              <span>
                Understand its boundaries.
              </span>
            </h2>

            <p className="aw-section-intro">
              Public interfaces, research propositions,
              and conceptual architectures should not
              be mistaken for the same level of
              experimental or operational validation.
            </p>
          </Reveal>

          <div className="aw-evidence__grid">
            {EVIDENCE_STEPS.map((step) => (
              <Reveal key={step.number}>
                <Glass className="aw-evidence__card">
                  <span className="aw-small-label">
                    {step.number} / 03
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          COLLABORATION / FULL VIEWPORT
      ================================================== */}

      <section
        id="collaboration"
        className="aw-screen aw-collaboration"
        aria-labelledby="aw-collaboration-title"
      >
        <div className="aw-section-inner aw-collaboration__layout">
          <Reveal>
            <p className="aw-kicker">
              RESEARCH & TECHNICAL COLLABORATION
            </p>

            <h2
              id="aw-collaboration-title"
              className="aw-display"
            >
              Build what
              <br />
              <span>comes next.</span>
            </h2>

            <p className="aw-section-intro">
              Collaboration begins with a specific
              research question, technical challenge,
              or implementation opportunity.
            </p>
          </Reveal>

          <Reveal>
            <Glass className="aw-collaboration__panel">
              <p className="aw-small-label">
                SELECT AN AREA OF INTEREST
              </p>

              <div className="aw-collaboration__options">
                {WORKS.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    className={`aw-collaboration__option ${
                      activeWork === work.id
                        ? "is-active"
                        : ""
                    }`}
                    aria-pressed={
                      activeWork === work.id
                    }
                    onClick={() =>
                      setActiveWork(work.id)
                    }
                  >
                    <span>{work.name}</span>

                    <span aria-hidden="true">
                      {activeWork === work.id
                        ? "●"
                        : "○"}
                    </span>
                  </button>
                ))}
              </div>

              <div
                className="aw-collaboration__selection"
                aria-live="polite"
              >
                <span className="aw-small-label">
                  COLLABORATION FOCUS
                </span>

                <p>
                  {selectedWork.collaboration}
                </p>
              </div>

              <Link
                href={`/contact?subject=${encodeURIComponent(
                  `ArcheNova Works — ${selectedWork.name}`,
                )}`}
                className="aw-button aw-button--light aw-collaboration__cta"
              >
                <span>
                  DISCUSS COLLABORATION
                </span>

                <Arrow diagonal />
              </Link>

              <p className="aw-collaboration__note">
                Identify the work, the question or
                challenge, and the expertise or
                contribution you wish to propose.
              </p>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="aw-footer">
        <Glass className="aw-footer__frame">
          <div>
            <span className="aw-small-label">
              ARCHENOVA / WORKS
            </span>

            <p>
              Research. Engineering. Creation.
            </p>
          </div>

          <Link href="/home">
            <span>RETURN TO ARCHENOVA</span>
            <Arrow diagonal />
          </Link>
        </Glass>
      </footer>

      {/* ==================================================
          PRESENTATION
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           FOUNDATION

           Based on the full-width approach used in
           CivilizationSpacePortal.tsx.

           No narrow page-wide shell.
        ================================================== */

        html {
          scroll-behavior: smooth;
          background: #000;
        }

        body {
          background: #000;
        }

        .aw,
        .aw *,
        .aw *::before,
        .aw *::after {
          box-sizing: border-box;
        }

        .aw {
          --aw-white: rgba(250, 251, 253, 0.98);
          --aw-muted: rgba(233, 236, 242, 0.74);
          --aw-faint: rgba(233, 236, 242, 0.49);
          --aw-line: rgba(255, 255, 255, 0.13);

          --aw-side: clamp(16px, 3.5vw, 68px);
          --aw-block: clamp(28px, 4vw, 60px);

          position: relative;
          isolation: isolate;

          width: 100%;
          max-width: none;
          min-width: 0;
          min-height: 100svh;

          overflow-x: clip;

          background: #000 !important;
          color: var(--aw-white);

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "SF Pro Text",
            "Helvetica Neue",
            Arial,
            sans-serif;

          -webkit-font-smoothing: antialiased;
        }

        .aw a {
          color: inherit;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }

        .aw button {
          font: inherit;
          -webkit-tap-highlight-color: transparent;
        }

        .aw a:focus-visible,
        .aw button:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 4px;
        }

        .aw a,
        .aw button,
        .aw h1,
        .aw h2,
        .aw h3,
        .aw h4,
        .aw p,
        .aw strong,
        .aw span {
          min-width: 0;
        }

        .aw-screen {
          position: relative;

          display: flex;
          flex-direction: column;
          justify-content: center;

          width: 100%;
          max-width: none;
          min-width: 0;

          /*
           * At least one viewport.
           * Never force content into a fixed height.
           */
          min-height: 100svh;
          height: auto;

          padding:
            var(--aw-block)
            var(--aw-side);

          overflow: clip;

          background: #000 !important;

          scroll-margin-top: 0;
        }

        .aw-section-inner {
          width: 100%;
          max-width: none;
          min-width: 0;

          margin: 0;
        }

        .aw-kicker,
        .aw-small-label {
          font-size: 10px;
          font-weight: 550;
          line-height: 1.6;
          letter-spacing: 0.15em;
        }

        .aw-kicker {
          margin: 0 0 clamp(18px, 3vw, 38px);
          color: var(--aw-faint);
        }

        .aw-small-label {
          color: var(--aw-faint);
        }

        .aw-display {
          max-width: 100%;
          margin: 0;

          font-size: clamp(42px, 7.2vw, 116px);
          font-weight: 510;
          line-height: 1.07;
          letter-spacing: -0.072em;

          overflow-wrap: break-word;
        }

        .aw-display span {
          color: rgba(237, 240, 245, 0.48);
        }

        .aw-section-intro {
          max-width: 760px;

          margin: clamp(24px, 3vw, 38px) 0 0;

          color: var(--aw-muted);
          font-size: clamp(15px, 1.4vw, 20px);
          line-height: 1.8;
        }

        .aw-arrow {
          flex: 0 0 auto;

          width: 19px;
          height: 19px;

          stroke: currentColor;
          stroke-width: 1.35;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* ==================================================
           TRANSLUCENT BLACK GLASS
        ================================================== */

        .aw-glass {
          position: relative;
          isolation: isolate;

          min-width: 0;
          max-width: 100%;

          overflow: hidden;

          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: clamp(20px, 2.3vw, 34px);

          background:
            linear-gradient(
              145deg,
              rgba(36, 38, 43, 0.48),
              rgba(12, 13, 17, 0.59) 48%,
              rgba(4, 5, 8, 0.68)
            );

          -webkit-backdrop-filter:
            blur(24px) saturate(105%);
          backdrop-filter:
            blur(24px) saturate(105%);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.085),
            0 22px 75px rgba(0, 0, 0, 0.23);
        }

        .aw-glass::before {
          content: "";

          position: absolute;
          z-index: -1;
          inset: 0;

          border-radius: inherit;
          pointer-events: none;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.04),
              transparent 40%,
              transparent 80%,
              rgba(255, 255, 255, 0.012)
            );
        }

        /* ==================================================
           REVEAL

           Reveals do not establish fixed heights.
        ================================================== */

        .aw-reveal {
          width: 100%;
          min-width: 0;

          opacity: 0;
          transform: translate3d(0, 20px, 0);

          transition:
            opacity 0.8s ease,
            transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .aw-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ==================================================
           OPENING / FULL AVAILABLE WIDTH
        ================================================== */

        .aw-opening {
          justify-content: space-between;
          gap: clamp(24px, 4svh, 52px);
        }

        .aw-opening__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;
          min-width: 0;

          gap: 16px;
        }

        .aw-back {
          display: inline-flex;
          align-items: center;
          gap: 12px;

          min-height: 40px;

          color: var(--aw-muted);

          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.13em;
        }

        .aw-back__arrow {
          flex: 0 0 auto;

          width: 9px;
          height: 9px;

          border-left: 1px solid currentColor;
          border-bottom: 1px solid currentColor;

          transform: rotate(45deg);
        }

        .aw-opening__top-label {
          color: var(--aw-faint);

          font-size: 10px;
          line-height: 1.6;
          letter-spacing: 0.12em;

          text-align: right;
        }

        .aw-opening__content {
          width: 100%;
          min-width: 0;

          margin: auto 0;
          padding-block: clamp(12px, 3svh, 46px);
        }

        .aw-opening__content h1 {
          max-width: 100%;
          margin: 0;

          font-size: clamp(62px, 11vw, 190px);
          font-weight: 510;
          line-height: 0.98;
          letter-spacing: -0.085em;

          overflow-wrap: break-word;
        }

        .aw-opening__content h1 span {
          color: rgba(238, 241, 246, 0.44);
        }

        .aw-opening__intro {
          max-width: 660px;

          margin: clamp(24px, 3vw, 42px) 0 0;

          color: var(--aw-muted);

          font-size: clamp(16px, 1.5vw, 22px);
          line-height: 1.75;
        }

        .aw-opening__index {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          width: 100%;
          min-width: 0;

          gap: clamp(10px, 1.5vw, 22px);
        }

        .aw-opening__index-link {
          display: grid;
          grid-template-columns:
            25px
            minmax(0, 1fr)
            19px;

          align-items: center;

          min-width: 0;
          min-height: 94px;

          gap: clamp(10px, 1.2vw, 20px);
          padding: clamp(17px, 2vw, 28px);

          border: 1px solid var(--aw-line);
          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(35, 37, 42, 0.46),
              rgba(7, 8, 11, 0.66)
            );

          -webkit-backdrop-filter: blur(24px);
          backdrop-filter: blur(24px);

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .aw-opening__index-number {
          color: var(--aw-faint);
          font-size: 10px;
        }

        .aw-opening__index-link strong {
          min-width: 0;

          font-size: clamp(15px, 1.5vw, 23px);
          font-weight: 480;
          line-height: 1.25;
          letter-spacing: -0.035em;

          overflow-wrap: anywhere;
        }

        .aw-opening__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;

          gap: 16px;

          color: var(--aw-faint);

          font-size: 9px;
          line-height: 1.6;
          letter-spacing: 0.12em;
        }

        .aw-opening__bottom a,
        .aw-work__hero-bottom a {
          display: inline-flex;
          align-items: center;

          gap: 14px;

          color: var(--aw-white);
        }

        .aw-opening__bottom a span,
        .aw-work__hero-bottom a span {
          font-size: 20px;
          line-height: 1;
        }

        /* ==================================================
           INTRODUCTION
        ================================================== */

        .aw-introduction__layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(0, 0.8fr);

          align-items: center;

          gap: clamp(32px, 5vw, 90px);
        }

        .aw-introduction__note {
          width: 100%;
          padding: clamp(26px, 3.5vw, 58px);
        }

        .aw-introduction__note p:first-child {
          margin: 0 0 22px;

          font-size: clamp(22px, 2.5vw, 38px);
          line-height: 1.38;
          letter-spacing: -0.045em;
        }

        .aw-introduction__note p:last-child {
          margin: 0;

          color: var(--aw-muted);

          font-size: clamp(14px, 1.15vw, 18px);
          line-height: 1.85;
        }

        /* ==================================================
           WORK HERO / FULL VIEWPORT

           Four independent zones:
           1. Top identity
           2. Artwork
           3. Heading
           4. Bottom navigation

           No absolute positioning of text over artwork.
        ================================================== */

        .aw-work {
          width: 100%;
          min-width: 0;

          background: #000;
        }

        .aw-work__hero {
          display: grid;

          grid-template-columns: minmax(0, 1fr);
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto
            auto;

          align-content: stretch;

          min-height: 100svh;
          height: auto;

          gap: clamp(12px, 2svh, 26px);
        }

        .aw-work__hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          min-width: 0;
          gap: 12px 24px;
        }

        .aw-work__identity {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 10px 24px;

          color: var(--aw-faint);

          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.12em;
        }

        .aw-work__all {
          display: inline-flex;
          align-items: center;

          gap: 9px;

          color: var(--aw-muted);

          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.1em;
        }

        .aw-work__all .aw-arrow {
          width: 15px;
          height: 15px;
        }

        /*
         * Artwork occupies a dedicated layout row.
         * aspect-ratio + contain prevents stretching.
         */

        .aw-work__art-stage {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;

          /*
           * Keep a useful art area on tall screens.
           * Short screens can grow vertically.
           */
          min-height: clamp(230px, 39svh, 620px);

          overflow: hidden;

          pointer-events: none;
        }

        .aw-visual {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;
          min-width: 0;

          overflow: hidden;

          background: transparent;
        }

        .aw-art-svg {
          display: block;

          width: min(100%, 850px);
          height: 100%;

          max-height: 620px;

          aspect-ratio: 1 / 1;
          object-fit: contain;

          overflow: visible;
        }

        .aw-art-svg--episteme {
          width: min(100%, 750px);
        }

        .aw-art-svg--aetherion {
          width: min(100%, 900px);
        }

        .aw-art-svg--research {
          width: min(100%, 850px);
        }

        /*
         * Heading is in normal document flow.
         * It never covers the artwork.
         */

        .aw-work__hero-copy {
          width: 100%;
          min-width: 0;
        }

        .aw-work__heading-glass {
          width: fit-content;
          max-width: 100%;

          padding:
            clamp(22px, 2.5vw, 38px)
            clamp(24px, 3vw, 46px);
        }

        .aw-work__heading-glass h2 {
          max-width: 100%;
          margin: 0;

          font-size: clamp(54px, 6.6vw, 110px);
          font-weight: 510;
          line-height: 1.02;
          letter-spacing: -0.078em;

          overflow-wrap: break-word;
        }

        .aw-work--research
          .aw-work__heading-glass h2 {
          font-size: clamp(35px, 4.8vw, 76px);
          line-height: 1.08;
        }

        .aw-work__heading-glass p {
          margin: clamp(12px, 1.5vw, 22px) 0 0;

          color: var(--aw-muted);

          font-size: clamp(15px, 1.35vw, 21px);
          line-height: 1.6;
        }

        .aw-work__hero-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;
          min-width: 0;

          gap: 12px 22px;
          padding: 16px 20px;

          border: 1px solid var(--aw-line);
          border-radius: 17px;

          background: rgba(9, 10, 13, 0.56);

          -webkit-backdrop-filter: blur(18px);
          backdrop-filter: blur(18px);

          color: var(--aw-faint);

          font-size: 9px;
          line-height: 1.6;
          letter-spacing: 0.11em;
        }

        /* ==================================================
           ART MOTION
        ================================================== */

        .aw-episteme-breath {
          transform-origin: 50% 50%;
          animation:
            awEpistemeBreath
            9s ease-in-out infinite;
        }

        .aw-aetherion-system {
          transform-origin: 50% 50%;
          animation:
            awAetherionBreath
            14s ease-in-out infinite;
        }

        .aw-research-manifold {
          transform-origin: 50% 50%;
          animation:
            awResearchBreath
            12s ease-in-out infinite;
        }

        @keyframes awEpistemeBreath {
          0%,
          100% {
            opacity: 0.83;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.012);
          }
        }

        @keyframes awAetherionBreath {
          0%,
          100% {
            opacity: 0.84;
            transform: scale(0.985);
          }

          50% {
            opacity: 1;
            transform: scale(1.012);
          }
        }

        @keyframes awResearchBreath {
          0%,
          100% {
            opacity: 0.78;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.015);
          }
        }

        /* ==================================================
           INSIDE THE WORK
        ================================================== */

        .aw-work__inside-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.85fr);

          align-items: center;

          gap: clamp(30px, 5vw, 90px);
        }

        .aw-work__description {
          width: 100%;

          padding: clamp(26px, 3.5vw, 60px);
        }

        .aw-work__description > p {
          margin: 26px 0 36px;

          font-size: clamp(19px, 2vw, 29px);
          line-height: 1.6;
          letter-spacing: -0.035em;
        }

        /* ==================================================
           RESEARCH AND ENGINEERING
        ================================================== */

        .aw-work__depth-layout {
          display: grid;

          gap: clamp(26px, 4vw, 56px);
        }

        .aw-work__detail-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          align-items: stretch;

          gap: clamp(12px, 1.5vw, 24px);
        }

        .aw-work__detail-grid > .aw-reveal {
          height: 100%;
        }

        .aw-detail {
          width: 100%;
          height: 100%;
          min-height: 270px;

          padding: clamp(24px, 2.6vw, 42px);
        }

        .aw-detail h4 {
          margin: 28px 0 18px;

          font-size: clamp(22px, 2.1vw, 32px);
          font-weight: 490;
          line-height: 1.3;
          letter-spacing: -0.04em;

          overflow-wrap: break-word;
        }

        .aw-detail p {
          margin: 0;

          color: var(--aw-muted);

          font-size: 14px;
          line-height: 1.85;
        }

        .aw-work__next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;
          gap: 24px;

          padding: clamp(24px, 2.8vw, 44px);
        }

        .aw-work__next-copy {
          flex: 1 1 290px;
        }

        .aw-work__next-copy p {
          max-width: 530px;

          margin: 14px 0 0;

          color: var(--aw-muted);

          font-size: 14px;
          line-height: 1.75;
        }

        .aw-work__next-actions {
          display: flex;
          align-items: stretch;
          flex-wrap: wrap;

          min-width: 0;
          gap: 12px;
        }

        /* ==================================================
           BUTTONS
        ================================================== */

        .aw-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          min-width: 0;
          max-width: 100%;
          min-height: 54px;

          gap: 18px;
          padding: 13px 22px;

          border-radius: 999px;

          font-size: 10px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.09em;

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .aw-button > span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .aw-button--light {
          background: rgba(248, 250, 252, 0.97);
          color: #08090b !important;
        }

        .aw-button--dark {
          border: 1px solid rgba(255, 255, 255, 0.24);

          background: rgba(255, 255, 255, 0.055);
          color: var(--aw-white) !important;
        }

        /* ==================================================
           EVIDENCE
        ================================================== */

        .aw-evidence__layout {
          display: grid;

          gap: clamp(30px, 4vw, 66px);
        }

        .aw-evidence__grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          align-items: stretch;

          gap: clamp(12px, 1.5vw, 24px);
        }

        .aw-evidence__grid > .aw-reveal {
          height: 100%;
        }

        .aw-evidence__card {
          width: 100%;
          height: 100%;
          min-height: 240px;

          padding: clamp(24px, 2.7vw, 42px);
        }

        .aw-evidence__card h3 {
          margin: 30px 0 18px;

          font-size: clamp(27px, 3vw, 45px);
          font-weight: 490;
          line-height: 1.2;
          letter-spacing: -0.05em;
        }

        .aw-evidence__card p {
          margin: 0;

          color: var(--aw-muted);

          font-size: 14px;
          line-height: 1.8;
        }

        /* ==================================================
           COLLABORATION
        ================================================== */

        .aw-collaboration__layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(0, 0.9fr);

          align-items: center;

          gap: clamp(30px, 5vw, 90px);
        }

        .aw-collaboration__panel {
          width: 100%;

          padding: clamp(25px, 3.5vw, 54px);
        }

        .aw-collaboration__panel
          > .aw-small-label {
          display: block;
          margin: 0 0 24px;
        }

        .aw-collaboration__options {
          border-top: 1px solid var(--aw-line);
        }

        .aw-collaboration__option {
          display: flex;
          align-items: center;
          justify-content: space-between;

          width: 100%;
          min-width: 0;
          min-height: 65px;

          gap: 16px;
          padding: 14px 0;

          border: 0;
          border-bottom: 1px solid var(--aw-line);

          background: transparent;
          color: var(--aw-muted);

          font-size: 15px;
          line-height: 1.5;
          text-align: left;

          cursor: pointer;
        }

        .aw-collaboration__option > span:first-child {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .aw-collaboration__option > span:last-child {
          flex: 0 0 auto;
          font-size: 10px;
        }

        .aw-collaboration__option.is-active {
          color: #fff;
        }

        .aw-collaboration__selection {
          min-height: 125px;
          padding-top: 26px;
        }

        .aw-collaboration__selection p {
          margin: 14px 0 0;

          font-size: 15px;
          line-height: 1.75;
        }

        .aw-collaboration__cta {
          width: 100%;
          margin-top: 14px;
        }

        .aw-collaboration__note {
          margin: 20px 0 0;

          color: var(--aw-faint);

          font-size: 11px;
          line-height: 1.75;
        }

        /* ==================================================
           FOOTER / FULL WIDTH
        ================================================== */

        .aw-footer {
          width: 100%;
          min-width: 0;

          padding:
            0
            var(--aw-side)
            var(--aw-block);

          background: #000 !important;
        }

        .aw-footer__frame {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          width: 100%;

          gap: 25px;
          padding: clamp(24px, 3vw, 44px);
        }

        .aw-footer__frame p {
          margin: 12px 0 0;

          color: var(--aw-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .aw-footer__frame > a {
          display: inline-flex;
          align-items: center;

          gap: 14px;

          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.1em;
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) {
          .aw-opening__index-link:hover {
            transform: translateY(-3px);

            border-color: rgba(255, 255, 255, 0.36);
            background: rgba(28, 28, 31, 0.55);
          }

          .aw-button:hover {
            transform: translateY(-2px);
          }

          .aw-button--light:hover {
            background: #fff;
          }

          .aw-button--dark:hover {
            border-color: rgba(255, 255, 255, 0.5);
          }

          .aw-collaboration__option:hover {
            color: #fff;
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1100px) {
          .aw-introduction__layout,
          .aw-work__inside-layout,
          .aw-collaboration__layout {
            grid-template-columns: minmax(0, 1fr);
          }

          .aw-introduction__note,
          .aw-work__description,
          .aw-collaboration__panel {
            max-width: 100%;
          }

          .aw-work__detail-grid,
          .aw-evidence__grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .aw-work__next {
            align-items: stretch;
          }

          .aw-work__next-actions {
            width: 100%;
          }
        }

        /* ==================================================
           MOBILE / FULL AVAILABLE WIDTH
        ================================================== */

        @media (max-width: 760px) {
          .aw {
            --aw-side: 12px;
            --aw-block: clamp(24px, 4svh, 42px);
          }

          .aw-screen {
            min-height: 100svh;

            padding:
              var(--aw-block)
              var(--aw-side);
          }

          .aw-glass {
            border-radius: 21px;
          }

          .aw-kicker,
          .aw-small-label {
            font-size: 9px;
            letter-spacing: 0.12em;
          }

          .aw-display {
            font-size: clamp(39px, 9vw, 70px);
            line-height: 1.08;
          }

          .aw-section-intro {
            font-size: 14px;
          }

          /* OPENING */

          .aw-opening {
            gap: 22px;
          }

          .aw-opening__top-label {
            display: none;
          }

          .aw-back {
            font-size: 10px;
          }

          .aw-opening__content {
            padding-block: 20px;
          }

          .aw-opening__content h1 {
            font-size: clamp(54px, 11.5vw, 90px);
            line-height: 1;
          }

          .aw-opening__intro {
            margin-top: 23px;
            font-size: 15px;
          }

          .aw-opening__index {
            grid-template-columns: minmax(0, 1fr);
            gap: 9px;
          }

          .aw-opening__index-link {
            min-height: 70px;

            gap: 12px;
            padding: 15px 17px;

            border-radius: 17px;
          }

          .aw-opening__index-link strong {
            font-size: clamp(15px, 4.1vw, 20px);
          }

          .aw-opening__bottom {
            font-size: 8px;
            letter-spacing: 0.07em;
          }

          /* INTRODUCTION */

          .aw-introduction__layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }

          .aw-introduction__note {
            padding: 26px;
          }

          .aw-introduction__note p:first-child {
            font-size: 23px;
          }

          .aw-introduction__note p:last-child {
            font-size: 13px;
          }

          /* WORK HERO */

          .aw-work__hero {
            /*
             * All four zones remain in normal flow.
             * A short mobile viewport may scroll
             * instead of overlapping its content.
             */
            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto
              auto;

            gap: clamp(12px, 2svh, 20px);
          }

          .aw-work__identity {
            gap: 6px 14px;
            font-size: 9px;
          }

          .aw-work__all {
            font-size: 9px;
          }

          .aw-work__art-stage {
            min-height: clamp(230px, 35svh, 470px);
          }

          .aw-art-svg,
          .aw-art-svg--episteme,
          .aw-art-svg--aetherion,
          .aw-art-svg--research {
            width: min(100%, 570px);
            max-height: 470px;
          }

          .aw-work__heading-glass {
            width: 100%;
            max-width: 100%;

            padding: 22px;
          }

          .aw-work__heading-glass h2 {
            font-size: clamp(48px, 11vw, 76px);
            line-height: 1.04;
          }

          .aw-work--research
            .aw-work__heading-glass h2 {
            font-size: clamp(32px, 7.8vw, 56px);
            line-height: 1.1;
          }

          .aw-work__heading-glass p {
            margin-top: 12px;
            font-size: 14px;
          }

          .aw-work__hero-bottom {
            gap: 9px;
            padding: 14px 16px;

            font-size: 8px;
            letter-spacing: 0.07em;
          }

          /* INSIDE THE WORK */

          .aw-work__inside-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }

          .aw-work__description {
            padding: 26px;
          }

          .aw-work__description > p {
            margin: 22px 0 28px;
            font-size: 20px;
          }

          /* TECHNICAL DEPTH */

          .aw-work__depth-layout {
            gap: 24px;
          }

          .aw-work__detail-grid,
          .aw-evidence__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
          }

          .aw-detail {
            min-height: 0;
            padding: 26px;
          }

          .aw-detail h4 {
            margin: 22px 0 14px;
            font-size: 25px;
          }

          .aw-detail p {
            font-size: 13px;
          }

          .aw-work__next {
            gap: 24px;
            padding: 25px;
          }

          .aw-work__next-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .aw-button {
            width: 100%;
            min-height: 53px;

            padding: 12px 18px;

            font-size: 9px;
          }

          /* EVIDENCE */

          .aw-evidence__layout {
            gap: 28px;
          }

          .aw-evidence__card {
            min-height: 0;
            padding: 26px;
          }

          .aw-evidence__card h3 {
            margin: 22px 0 13px;
            font-size: 31px;
          }

          .aw-evidence__card p {
            font-size: 13px;
          }

          /* COLLABORATION */

          .aw-collaboration__layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }

          .aw-collaboration__panel {
            padding: 25px;
          }

          .aw-collaboration__option {
            min-height: 61px;
            font-size: 13px;
          }

          /* FOOTER */

          .aw-footer__frame {
            align-items: flex-start;
            gap: 25px;
            padding: 25px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 390px) {
          .aw {
            --aw-side: 9px;
          }

          .aw-opening__content h1 {
            font-size: clamp(43px, 10.8vw, 54px);
          }

          .aw-work__heading-glass {
            padding: 19px;
          }

          .aw-work__heading-glass h2 {
            font-size: clamp(42px, 10.4vw, 52px);
          }

          .aw-work--research
            .aw-work__heading-glass h2 {
            font-size: clamp(29px, 7.5vw, 39px);
          }

          .aw-work__hero-bottom {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        /* ==================================================
           SHORT VIEWPORTS / LANDSCAPE

           Content remains readable and scrollable.
           No fixed-height clipping.
        ================================================== */

        @media (max-height: 650px) {
          .aw {
            --aw-block: 20px;
          }

          .aw-opening {
            gap: 18px;
          }

          .aw-opening__content {
            padding-block: 8px;
          }

          .aw-work__hero {
            gap: 12px;
          }

          .aw-work__art-stage {
            min-height: 210px;
          }

          .aw-art-svg {
            max-height: 360px;
          }

          .aw-work__heading-glass {
            padding: 19px 24px;
          }

          .aw-work__heading-glass h2 {
            font-size: clamp(40px, 5vw, 75px);
          }

          .aw-work--research
            .aw-work__heading-glass h2 {
            font-size: clamp(30px, 3.8vw, 56px);
          }

          .aw-work__heading-glass p {
            margin-top: 9px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .aw *,
          .aw *::before,
          .aw *::after {
            animation: none !important;
            transition: none !important;
          }

          .aw-reveal {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}