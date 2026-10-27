"use client";

import Image from "next/image";

export default function OryvanthCivilizationPortal() {
  const scrollToCivilizationSynthesis = () => {
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
  };

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
              <span
                className="an-oryvanth-home__eyebrow-line"
                aria-hidden="true"
              />
              <span>
                ARCHENOVA / ETERNAL CIVILIZATION
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
              Oryvanth is an integrated, immortal civilization
              in which science, intelligence, energy,
              engineering, infrastructure, capital, and
              governance exist as one coherent whole—
              continuously evolving, regenerating, and
              preserving its continuity across generations,
              transformations, and epochs.
            </p>

            <div className="an-oryvanth-home__signature">
              <span
                className="an-oryvanth-home__signature-line"
                aria-hidden="true"
              />
              <span>
                UNITY · EXISTENCE · EVOLUTION · IMMORTALITY
              </span>
            </div>
          </header>

          <div className="an-oryvanth-home__visual-column">
            <figure className="an-oryvanth-home__visual">
              <Image
                src="/images/oryvanth-civilization.jpeg"
                alt="Oryvanth Civilization represented as an integrated cosmic civilization encompassing interconnected worlds, orbital structures, and enduring systems of existence."
                width={1125}
                height={1113}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="an-oryvanth-home__image"
              />
            </figure>

            <div
              className="an-oryvanth-home__synthesis-guide"
              aria-labelledby="an-oryvanth-synthesis-title"
            >
              <div className="an-oryvanth-home__synthesis-eyebrow">
                <span
                  className="an-oryvanth-home__eyebrow-line"
                  aria-hidden="true"
                />
                <span>
                  THE ARCHITECTURE OF CIVILIZATION
                </span>
              </div>

              <h2
                id="an-oryvanth-synthesis-title"
                className="an-oryvanth-home__synthesis-title"
              >
                Civilization Synthesis
              </h2>

              <button
                type="button"
                className="an-oryvanth-home__explore"
                onClick={scrollToCivilizationSynthesis}
              >
                <span>
                  Explore
                </span>
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}