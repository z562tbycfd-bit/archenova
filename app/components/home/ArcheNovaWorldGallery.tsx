"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

/* ==========================================================
   ARCHENOVA WORLD GALLERY

   Five supplied JPEG images.
   One transparent black HOME glass surface.

   No external animation libraries.
   No CSS-generated substitute artwork.
   No nested glass cards.

   The displayed works are conceptual visualizations,
   not claims of completed physical infrastructure.
========================================================== */

type Exhibition = {
  id: string;
  number: string;
  category: string;
  title: string;
  statement: string;
  description: string;
  image: string;
  alt: string;
  imagePosition?: string;
  layout: "hero" | "portrait" | "landscape";
};

const EXHIBITIONS: readonly Exhibition[] = [
  {
    id: "civilization-systems",

    number: "01",

    category: "CIVILIZATION SYSTEMS",

    title: "A Living Civilization.",

    statement:
      "Where architecture, nature, mobility, and intelligence converge.",

    description:
      "A vision of the city as an interconnected system rather than a collection of isolated buildings. Architecture, green environments, transportation, and information infrastructure are considered together to create spaces that can adapt to human needs over time.",

    image:
      "/images/civilization/world/IMG_2559.jpeg",

    alt:
      "A futuristic city with sculptural architecture, elevated vehicles, transparent structures, and integrated green spaces.",

    imagePosition:
      "center 35%",

    layout:
      "hero",
  },

  {
    id: "cognitive-infrastructure",

    number: "02",

    category: "COGNITIVE INFRASTRUCTURE",

    title: "Intelligence in Dialogue.",

    statement:
      "A new relationship between human inquiry and machine intelligence.",

    description:
      "The image evokes an intelligent system engaged with a dense field of information. The underlying question is how artificial intelligence can help people examine evidence, explore alternatives, and develop useful knowledge while remaining understandable and correctable.",

    image:
      "/images/civilization/world/IMG_2560.jpeg",

    alt:
      "A futuristic humanoid machine examining a luminous blue information interface.",

    imagePosition:
      "center center",

    layout:
      "portrait",
  },

  {
    id: "mobility-engineering",

    number: "03",

    category: "MOBILITY & ENGINEERING",

    title: "Motion, Reimagined.",

    statement:
      "Engineering new possibilities for movement through physical space.",

    description:
      "A streamlined vehicle becomes a starting point for thinking about mobility as a complete engineering problem: energy, materials, control, safety, infrastructure, and the relationship between a vehicle and the environment in which it operates.",

    image:
      "/images/civilization/world/IMG_2561.jpeg",

    alt:
      "A streamlined silver futuristic vehicle displayed inside a panoramic glass architectural space.",

    imagePosition:
      "center center",

    layout:
      "landscape",
  },

  {
    id: "spatial-infrastructure",

    number: "04",

    category: "SPATIAL INFRASTRUCTURE",

    title: "Beyond the Ground.",

    statement:
      "Exploring how human spaces might extend into new environments.",

    description:
      "A tower-like structure above the clouds suggests a future in which research, habitation, transportation, and environmental control may be considered across a wider range of spatial conditions. The image is a conceptual exploration, not a validated engineering design.",

    image:
      "/images/civilization/world/IMG_2562.jpeg",

    alt:
      "A dark, glass-fronted futuristic tower suspended above a vast layer of clouds.",

    imagePosition:
      "center center",

    layout:
      "portrait",
  },

  {
    id: "distributed-habitats",

    number: "05",

    category: "DISTRIBUTED HABITATS",

    title: "A Different Way to Inhabit.",

    statement:
      "Imagining adaptable living spaces beyond conventional urban form.",

    description:
      "Independent, transparent living modules above the clouds suggest a distributed approach to habitation. Their visual separation raises questions about autonomy, shared infrastructure, resource circulation, safety, and how individual spaces might remain connected to a larger community.",

    image:
      "/images/civilization/world/IMG_2563.jpeg",

    alt:
      "Several transparent futuristic living capsules floating above the clouds, with interiors visible through curved glass.",

    imagePosition:
      "center center",

    layout:
      "portrait",
  },
];

/* ==========================================================
   SCROLL REVEAL

   Reveals only the visual presentation.
   Does not hide content when JavaScript is unavailable.
========================================================== */

function useGalleryReveal(
  rootRef: React.RefObject<HTMLElement>,
) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-an-world-reveal]",
      ),
    );

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

        rootMargin:
          "0px 0px -4% 0px",
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
   EXHIBITION CARD
========================================================== */

function ExhibitionCard({
  exhibition,
  index,
}: {
  exhibition: Exhibition;
  index: number;
}) {
  const [isExpanded, setIsExpanded] =
    useState(false);

  const detailId =
    `an-world-detail-${exhibition.id}`;

  return (
    <article
      className={[
        "an-world-gallery__item",
        `an-world-gallery__item--${exhibition.layout}`,
      ].join(" ")}
      data-an-world-reveal
    >
      <button
        type="button"
        className="an-world-gallery__artwork-button"
        aria-expanded={isExpanded}
        aria-controls={detailId}
        aria-label={
          `${exhibition.title}. ${
            isExpanded
              ? "Close exhibition details"
              : "Open exhibition details"
          }`
        }
        onClick={() => {
          setIsExpanded((current) => !current);
        }}
      >
        <div className="an-world-gallery__image-frame">
          <Image
            src={exhibition.image}
            alt={exhibition.alt}
            fill
            sizes={
              exhibition.layout === "hero"
                ? "(max-width: 768px) 100vw, 90vw"
                : "(max-width: 768px) 100vw, 46vw"
            }
            className="an-world-gallery__image"
            style={{
              objectPosition:
                exhibition.imagePosition ??
                "center center",
            }}
            priority={index === 0}
            quality={90}
          />

          <span
            className="an-world-gallery__image-number"
            aria-hidden="true"
          >
            {exhibition.number} / 05
          </span>

          <span
            className="an-world-gallery__image-control"
            aria-hidden="true"
          >
            {isExpanded ? "−" : "+"}
          </span>
        </div>

        <div className="an-world-gallery__caption">
          <span className="an-world-gallery__category">
            {exhibition.category}
          </span>

          <h3 className="an-world-gallery__item-title">
            {exhibition.title}
          </h3>

          <p className="an-world-gallery__statement">
            {exhibition.statement}
          </p>

          <span className="an-world-gallery__action">
            {isExpanded
              ? "CLOSE THE EXHIBITION"
              : "EXPLORE THE EXHIBITION"}

            <span aria-hidden="true">
              {isExpanded ? "−" : "↗"}
            </span>
          </span>
        </div>
      </button>

      <div
        id={detailId}
        className="an-world-gallery__detail"
        hidden={!isExpanded}
      >
        <span className="an-world-gallery__detail-heading">
          EXHIBITION {exhibition.number}
        </span>

        <p>{exhibition.description}</p>

        <span className="an-world-gallery__detail-note">
          CONCEPTUAL VISUALIZATION
        </span>
      </div>
    </article>
  );
}

/* ==========================================================
   MAIN GALLERY
========================================================== */

export default function ArcheNovaWorldGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGalleryReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="archenova-world"
      data-home-section
      className={[
        "an-home-2026__section",
        "an-world-gallery",
      ].join(" ")}
      aria-labelledby="an-world-gallery-title"
    >
      <div className="an-world-gallery__inner">

        {/* INTRODUCTION */}

        <header
          className="an-world-gallery__header"
          data-an-world-reveal
        >


          <h2
            id="an-world-gallery-title"
            className="an-world-gallery__title"
          >
            The ArcheNova
            <br />
            World.
          </h2>

          <p className="an-world-gallery__introduction">
            <small>
            Five visions of a world
            <br />
            yet to be built.
            </small>
          </p>

          <div className="an-world-gallery__header-bottom">
            
            <span>THE COLLECTION / 2026 ↓</span>
          </div>
        </header>

        {/* FIVE EXHIBITIONS */}

        <div className="an-world-gallery__collection">
          {EXHIBITIONS.map(
            (exhibition, index) => (
              <ExhibitionCard
                key={exhibition.id}
                exhibition={exhibition}
                index={index}
              />
            ),
          )}
        </div>

        {/* CLOSING STATEMENT */}

        <footer
          className="an-world-gallery__footer"
          data-an-world-reveal
        >
          <p>
            A world to imagine.
            <br />
            A reality to investigate.
            <br />
            A future to build responsibly.
          </p>
        </footer>
      </div>
    </section>
  );
}