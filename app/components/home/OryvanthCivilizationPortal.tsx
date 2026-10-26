"use client";

import Image from "next/image";

export default function OryvanthCivilizationPortal() {
  return (
    <section
      id="oryvanth-civilization"
      data-home-section
      data-home-chapter="oryvanth"
      className="home-page an-home-2026__section an-oryvanth-home"
      aria-labelledby="an-oryvanth-title"
    >
      <div className="an-home-2026__glass an-oryvanth-home__glass">
        <div className="an-oryvanth-home__layout">
          <header className="an-oryvanth-home__intro">
            <div className="an-oryvanth-home__eyebrow">
              <span className="an-oryvanth-home__eyebrow-line" />
              <span>
                ARCHENOVA / CIVILIZATIONAL VISION
              </span>
            </div>

            <h1
              id="an-oryvanth-title"
              className="an-oryvanth-home__title"
            >
              Oryvanth
              <span>Civilization.</span>
            </h1>

            <p className="an-oryvanth-home__statement">
              The Totality of Existence and Development.
            </p>

            <p className="an-oryvanth-home__description">
              An ArcheNova civilization-scale vision
              integrating scientific discovery, engineering,
              intelligence, infrastructure, capital,
              public trust, and legitimate institutional
              authority into enduring human capability.
            </p>

            <div className="an-oryvanth-home__signature">
              <span className="an-oryvanth-home__signature-line" />
              <span>
                EXISTENCE · KNOWLEDGE · DEVELOPMENT · CONTINUITY
              </span>
            </div>

            <button
              type="button"
              className="an-oryvanth-home__explore"
              onClick={() => {
                const target = document.getElementById(
                  "civilization-synthesis"
                );

                if (!target) return;

                const reducedMotion = window.matchMedia(
                  "(prefers-reduced-motion: reduce)"
                ).matches;

                target.scrollIntoView({
                  behavior: reducedMotion ? "auto" : "smooth",
                  block: "start",
                });
              }}
            >
              <span>Explore Civilization Synthesis</span>
              <span aria-hidden="true">↓</span>
            </button>
          </header>

          <figure className="an-oryvanth-home__visual">
            <Image
              src="/images/oryvanth-civilization.jpeg"
              alt="A black-robed figure overlooking a vast cosmic civilization, with orbital structures, galaxies, and interconnected worlds."
              width={1125}
              height={1113}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className="an-oryvanth-home__image"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}