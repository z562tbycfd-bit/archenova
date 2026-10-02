"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ==========================================================
   ARCHENOVA — CIVILIZATION GATE
   CIVILIZATION TWIN GALLERY

   PRESERVED
   - Cinematic background video
   - Poster fallback
   - Ambient gravitational structure
   - Three rotating story chapters
   - Manual story selection
   - /home entrance
   - X destination
   - Reduced-motion support

   EVOLVED
   - Centered museum-like composition
   - Civilization Twin artwork
   - Founder's Digital Twin statement
   - Unified transparent optical glass
   - Transparent ENTER ARCHENOVA
   - Desktop / tablet / mobile optimization
========================================================== */

type CinematicState =
  | "loading"
  | "playing"
  | "failed";

const STORY = [
  {
    number: "01",
    title: "ORIGIN",
    subtitle: "Reality & Understanding",
    description:
      "Begin with reality. Understand the systems that shape civilization.",
  },
  {
    number: "02",
    title: "REALIZATION",
    subtitle: "Science & Engineering",
    description:
      "Transform knowledge into reliable capability.",
  },
  {
    number: "03",
    title: "CONTINUITY",
    subtitle: "Civilization Design",
    description:
      "Design structures that create enduring value.",
  },
] as const;

export default function GatePage() {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const [
    cinematicState,
    setCinematicState,
  ] = useState<CinematicState>("loading");

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  const [
    activeStory,
    setActiveStory,
  ] = useState(0);

  const [
    storyPaused,
    setStoryPaused,
  ] = useState(false);

  const failCinematic =
    useCallback(() => {
      setCinematicState("failed");
      videoRef.current?.pause();
    }, []);

  /* ========================================================
     REDUCED MOTION
  ======================================================== */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    const update = () => {
      setReducedMotion(
        media.matches,
      );
    };

    update();

    media.addEventListener(
      "change",
      update,
    );

    return () => {
      media.removeEventListener(
        "change",
        update,
      );
    };
  }, []);

  /* ========================================================
     CINEMATIC BACKGROUND
  ======================================================== */

  useEffect(() => {
    if (reducedMotion) {
      videoRef.current?.pause();
      return;
    }

    if (
      cinematicState ===
      "failed"
    ) {
      return;
    }

    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    const timeout =
      window.setTimeout(() => {
        setCinematicState(
          (current) =>
            current ===
            "playing"
              ? current
              : "failed",
        );
      }, 6000);

    const attemptPlayback =
      async () => {
        try {
          await video.play();
        } catch {
          failCinematic();
        }
      };

    void attemptPlayback();

    return () => {
      window.clearTimeout(
        timeout,
      );
    };
  }, [
    cinematicState,
    failCinematic,
    reducedMotion,
  ]);

  /* ========================================================
     LIVING STORY
  ======================================================== */

  useEffect(() => {
    if (
      reducedMotion ||
      storyPaused
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setActiveStory(
          (current) =>
            (current + 1) %
            STORY.length,
        );
      }, 5200);

    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, [
    reducedMotion,
    storyPaused,
  ]);

  const selectStory =
    useCallback(
      (index: number) => {
        setActiveStory(index);
        setStoryPaused(true);
      },
      [],
    );

  return (
    <main className="an-gate">
      {/* ====================================================
          CINEMATIC BACKGROUND
      ==================================================== */}

      <div
        className="an-gate__cinema"
        aria-hidden="true"
      >
        <div className="an-gate__poster" />

        {!reducedMotion &&
          cinematicState !==
            "failed" && (
            <video
              ref={videoRef}
              className={[
                "an-gate__video",
                cinematicState ===
                "playing"
                  ? "is-playing"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/archenova-gate-poster.jpg"
              onPlaying={() => {
                setCinematicState(
                  "playing",
                );
              }}
              onError={
                failCinematic
              }
            >
              <source
                src="/videos/archenova-cosmos.mp4"
                type="video/mp4"
              />
            </video>
          )}

        <div className="an-gate__cinema-shade" />
        <div className="an-gate__cinema-vignette" />
        <div className="an-gate__cinema-grain" />
      </div>

      {/* ====================================================
          AMBIENT GRAVITATIONAL STRUCTURE
      ==================================================== */}

      <div
        className="an-gate__cosmos"
        aria-hidden="true"
      >
        <div className="an-gate__cosmos-halo" />

        <div className="an-gate__orbit an-gate__orbit--one" />
        <div className="an-gate__orbit an-gate__orbit--two" />
        <div className="an-gate__orbit an-gate__orbit--three" />

        <div className="an-gate__cosmos-core">
          <span />
        </div>
      </div>

      {/* ====================================================
          CIVILIZATION GATE
      ==================================================== */}

      <section
        className="an-gate__viewport"
        aria-labelledby="an-gate-title"
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="an-gate__header">
          <div className="an-gate__brand-copy">
            <small>
              FROM FIRST PRINCIPLES
              TO CIVILIZATION
            </small>
          </div>

          <div
            className="an-gate__edition"
            aria-label="ArcheNova Civilization Twin"
          >
            <span className="an-gate__edition-dot" />

            <span>
              CIVILIZATION TWIN
            </span>
          </div>
        </header>

        {/* ==================================================
            CENTRAL GALLERY
        ================================================== */}

        <div className="an-gate__gallery">
          {/* ================================================
              IDENTITY / JOURNEY
          ================================================ */}

          <div className="an-gate__main">
            <div className="an-gate__intro">
              <div className="an-gate__eyebrow">
                <span />

                <p>
                  FOUNDER-LED
                  <br className="an-gate__mobile-break" />
                  {" "}
                  CIVILIZATION DESIGN
                </p>

                <span />
              </div>

              <h1
                id="an-gate-title"
                className="an-gate__title"
              >
                Arche<span>Nova</span>
              </h1>

              <p className="an-gate__headline">
                Designing the structures
                <br />
                through which civilization
                endures.
              </p>

              <p className="an-gate__introduction">
                From fundamental science
                to engineering,
                institutional design,
                and lasting human value.
              </p>
            </div>

            {/* ==============================================
                JOURNEY
            ============================================== */}

            <div
              className="an-gate__story an-optical-glass"
              aria-label="ArcheNova's conceptual journey"
            >
              <div className="an-gate__story-topline">
                <span>
                  THE ARCHENOVA STORY
                </span>

                <span>
                  {
                    STORY[
                      activeStory
                    ].number
                  }
                  {" / "}
                  03
                </span>
              </div>

              <div className="an-gate__story-body">
                <div
                  key={
                    activeStory
                  }
                  className="an-gate__story-content"
                >
                  <span className="an-gate__story-kicker">
                    {
                      STORY[
                        activeStory
                      ].title
                    }
                  </span>

                  <h2>
                    {
                      STORY[
                        activeStory
                      ].subtitle
                    }
                  </h2>

                  <p>
                    {
                      STORY[
                        activeStory
                      ].description
                    }
                  </p>
                </div>
              </div>

              <div
                className="an-gate__story-navigation"
                aria-label="Choose a story chapter"
              >
                {STORY.map(
                  (
                    chapter,
                    index,
                  ) => (
                    <button
                      key={
                        chapter.number
                      }
                      type="button"
                      className={[
                        "an-gate__story-step",
                        activeStory ===
                        index
                          ? "is-active"
                          : "",
                      ]
                        .filter(
                          Boolean,
                        )
                        .join(" ")}
                      onClick={() => {
                        selectStory(
                          index,
                        );
                      }}
                      aria-label={`Show ${chapter.subtitle}`}
                      aria-pressed={
                        activeStory ===
                        index
                      }
                    >
                      <span className="an-gate__story-step-number">
                        {
                          chapter.number
                        }
                      </span>

                      <span className="an-gate__story-step-track">
                        <span />
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* ==============================================
                ACTIONS
            ============================================== */}

            <div className="an-gate__actions">
              <Link
                href="/home"
                className="an-gate__enter an-optical-glass"
              >
                <span>
                  ARCHENOVA SPACE
                </span>

                <span
                  className="an-gate__enter-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
              
            </div>
          </div>

          {/* ================================================
              CIVILIZATION TWIN ART EXHIBITION
          ================================================ */}

          <aside
            className="an-gate__exhibition"
            aria-label="ArcheNova Civilization Twin artwork"
          >
            <figure className="an-gate__artwork an-optical-glass">
              <div className="an-gate__artwork-top">
                <span>
                  ARCHENOVA
                  {" · "}
                  CIVILIZATION
                </span>

              </div>

              <div className="an-gate__artwork-window">
                <Image
                  src="/images/IMG_2667.jpeg"
                  alt="Conceptual artwork representing ArcheNova as an evolving digital twin for civilization design, connecting humanity, Earth, scientific systems, technological infrastructure, and possible civilizations."
                  fill
                  priority
                  sizes="(max-width: 700px) 92vw, (max-width: 900px) 72vw, (max-width: 1180px) 42vw, 520px"
                  className="an-gate__artwork-image"
                />

                <div
                  className="an-gate__artwork-light"
                  aria-hidden="true"
                />

                <div
                  className="an-gate__artwork-edge"
                  aria-hidden="true"
                />
              </div>

              <figcaption className="an-gate__artwork-caption">
                <div className="an-gate__artwork-index">
                  <span>
                    FOUNDER&apos;S
                    DIGITAL TWIN
                  </span>

                  <span>
                    CIVILIZATION DESIGN
                  </span>
                </div>

                <h2>
                  A living digital twin
                  for civilization design.
                </h2>

                <p>
                  ArcheNova is the
                  founder&apos;s evolving
                  digital twin—connecting
                  scientific understanding,
                  technological capability,
                  and civilization systems
                  toward responsible and
                  enduring progress.
                </p>

                <div className="an-gate__artwork-principle">
                  <span>
                    SCIENCE
                  </span>

                  <i />

                  <span>
                    CAPABILITY
                  </span>

                  <i />

                  <span>
                    CIVILIZATION
                  </span>
                </div>
              </figcaption>
            </figure>
          </aside>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="an-gate__footer">
          <span className="an-gate__footer-right">
            All RIGHTS RESERVED
          </span>

          <span className="an-gate__footer-left">
            REALITY RETAINS VETO
          </span>
        </footer>
      </section>

      <style jsx global>{`
        /* ==================================================
           FOUNDATION
        ================================================== */

        .an-gate,
        .an-gate *,
        .an-gate *::before,
        .an-gate *::after {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        .an-gate {
          position: relative;
          isolation: isolate;

          width: 100%;
          min-width: 0;
          max-width: none !important;

          min-height: 100vh;
          min-height: 100svh;

          margin: 0 !important;
          padding: 0 !important;

          overflow-x: clip;

          background: #020304;
          color: #f5f7f9;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "SF Pro Text",
            "Segoe UI",
            sans-serif;

          -webkit-font-smoothing:
            antialiased;

          text-rendering:
            optimizeLegibility;
        }

        .an-gate a {
          text-decoration: none;
        }

        .an-gate button {
          font: inherit;
        }

        /* ==================================================
           OPTICAL GLASS

           One transparent material language shared by:
           - Journey
           - Enter ArcheNova
           - Explore on X
           - Civilization artwork
        ================================================== */

        .an-optical-glass {
          position: relative;
          isolation: isolate;

          background:
            radial-gradient(
              circle at 18% 0%,
              rgba(
                255,
                255,
                255,
                .080
              ),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                .065
              ) 0%,
              rgba(
                255,
                255,
                255,
                .025
              ) 44%,
              rgba(
                255,
                255,
                255,
                .009
              ) 100%
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .13
            );

          -webkit-backdrop-filter:
            blur(28px)
            saturate(112%);

          backdrop-filter:
            blur(28px)
            saturate(112%);

          box-shadow:
            inset 0 1px 0
              rgba(
                255,
                255,
                255,
                .11
              ),
            inset 0 -1px 0
              rgba(
                255,
                255,
                255,
                .018
              ),
            0 28px 90px
              rgba(
                0,
                0,
                0,
                .15
              );
        }

        .an-optical-glass::before {
          content: "";

          position: absolute;
          inset: 0;

          z-index: -1;

          border-radius: inherit;

          pointer-events: none;

          background:
            linear-gradient(
              115deg,
              rgba(
                255,
                255,
                255,
                .060
              ),
              transparent 21%,
              transparent 76%,
              rgba(
                255,
                255,
                255,
                .018
              )
            );
        }

        /* ==================================================
           CINEMATIC BACKGROUND
        ================================================== */

        .an-gate__cinema {
          position: fixed;
          inset: 0;

          z-index: -3;

          overflow: hidden;

          background: #020304;

          pointer-events: none;
        }

        .an-gate__poster,
        .an-gate__video {
          position: absolute;
          inset: 0;

          display: block;

          width: 100%;
          height: 100%;
        }

        .an-gate__poster {
          background:
            #020304
            url("/images/archenova-gate-poster.jpg")
            center center / cover
            no-repeat;

          opacity: .72;
        }

        .an-gate__video {
          border: 0;

          object-fit: cover;
          object-position: center;

          opacity: 0;

          transition:
            opacity 1.5s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            );
        }

        .an-gate__video.is-playing {
          opacity: .69;
        }

        .an-gate__cinema-shade {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, .70),
              rgba(0, 0, 0, .30) 50%,
              rgba(0, 0, 0, .58)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, .42),
              rgba(0, 0, 0, .08) 30%,
              rgba(0, 0, 0, .18) 68%,
              rgba(0, 0, 0, .80)
            );
        }

        .an-gate__cinema-vignette {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              ellipse at 50% 44%,
              transparent 13%,
              rgba(0, 0, 0, .20) 56%,
              rgba(0, 0, 0, .72) 100%
            );
        }

        .an-gate__cinema-grain {
          position: absolute;
          inset: 0;

          opacity: .08;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                .34
              ) 0 .42px,
              transparent .78px
            );

          background-size:
            71px 71px;
        }

        /* ==================================================
           AMBIENT COSMOS
        ================================================== */

        .an-gate__cosmos {
          position: fixed;

          z-index: -1;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width:
            min(70vw, 920px);

          aspect-ratio: 1;

          transform:
            translate(
              -50%,
              -50%
            );

          opacity: .23;

          pointer-events: none;
        }

        .an-gate__cosmos-halo {
          position: absolute;
          inset: 10%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                214,
                233,
                246,
                .075
              ),
              rgba(
                165,
                195,
                216,
                .025
              ) 35%,
              transparent 68%
            );

          filter: blur(22px);

          animation:
            an-cosmos-breathe
            12s ease-in-out
            infinite;
        }

        .an-gate__orbit {
          position: absolute;

          border:
            1px solid
            rgba(
              233,
              243,
              250,
              .15
            );

          border-radius: 50%;
        }

        .an-gate__orbit--one {
          width: 76%;

          aspect-ratio: 1;

          animation:
            an-orbit-rotate
            85s linear
            infinite;
        }

        .an-gate__orbit--one::before {
          content: "";

          position: absolute;

          top: 0;
          left: 50%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              245,
              250,
              253,
              .85
            );

          box-shadow:
            0 0 18px
            rgba(
              239,
              248,
              253,
              .6
            );
        }

        .an-gate__orbit--two {
          width: 89%;
          height: 31%;

          transform:
            rotate(-25deg);

          border-color:
            rgba(
              233,
              243,
              250,
              .13
            );

          animation:
            an-orbit-tilt
            19s ease-in-out
            infinite;
        }

        .an-gate__orbit--three {
          width: 35%;
          height: 84%;

          transform:
            rotate(31deg);

          border-color:
            rgba(
              233,
              243,
              250,
              .10
            );

          animation:
            an-orbit-vertical
            25s ease-in-out
            infinite;
        }

        .an-gate__cosmos-core {
          display: grid;
          place-items: center;

          width: 16%;

          aspect-ratio: 1;

          border:
            1px solid
            rgba(
              242,
              248,
              252,
              .30
            );

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                235,
                246,
                252,
                .13
              ),
              rgba(
                5,
                8,
                12,
                .90
              ) 38%,
              #000 75%
            );

          box-shadow:
            0 0 35px
              rgba(
                229,
                241,
                250,
                .08
              ),
            inset 0 0 20px
              rgba(
                0,
                0,
                0,
                .8
              );

          animation:
            an-core-breathe
            9s ease-in-out
            infinite;
        }

        .an-gate__cosmos-core span {
          width: 14%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            rgba(
              246,
              251,
              253,
              .90
            );

          box-shadow:
            0 0 12px
              rgba(
                239,
                248,
                253,
                .8
              ),
            0 0 35px
              rgba(
                239,
                248,
                253,
                .3
              );
        }

        /* ==================================================
           VIEWPORT
        ================================================== */

        .an-gate__viewport {
          position: relative;

          display: grid;

          grid-template-rows:
            auto 1fr auto;

          width: 100%;

          min-width: 0;

          min-height: 100vh;
          min-height: 100svh;

          padding:
            max(
              25px,
              env(
                safe-area-inset-top
              )
            )
            clamp(
              24px,
              4vw,
              74px
            )
            max(
              21px,
              env(
                safe-area-inset-bottom
              )
            );
        }

        /* ==================================================
           HEADER
        ================================================== */

        .an-gate__header {
          position: relative;

          z-index: 10;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          width: min(
            100%,
            1440px
          );

          margin-inline: auto;
        }

        .an-gate__brand-copy small,
        .an-gate__edition {
          color:
            rgba(
              235,
              243,
              248,
              .52
            );

          font-size: 7px;

          font-weight: 570;

          letter-spacing:
            .17em;
        }

        .an-gate__edition {
          display: flex;

          align-items: center;

          gap: 9px;

          white-space: nowrap;
        }

        .an-gate__edition-dot {
          width: 4px;
          height: 4px;

          flex: 0 0 4px;

          border-radius: 50%;

          background:
            rgba(
              246,
              250,
              253,
              .82
            );

          box-shadow:
            0 0 14px
            rgba(
              246,
              250,
              253,
              .26
            );

          animation:
            an-status-breathe
            6s ease-in-out
            infinite;
        }

        /* ==================================================
           CENTRAL GALLERY

           Both columns are centered as one museum object.
        ================================================== */

        .an-gate__gallery {
          position: relative;

          z-index: 4;

          display: grid;

          grid-template-columns:
            minmax(420px, 640px)
            minmax(390px, 540px);

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              48px,
              5vw,
              92px
            );

          width: min(
            100%,
            1320px
          );

          margin-inline: auto;

          padding:
            clamp(
              42px,
              5svh,
              76px
            )
            0;
        }

        /* ==================================================
           IDENTITY
        ================================================== */

        .an-gate__main {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap:
            clamp(
              22px,
              2.8svh,
              36px
            );

          width: 100%;

          min-width: 0;

          margin-inline: auto;

          text-align: center;
        }

        .an-gate__intro {
          display: flex;

          flex-direction: column;

          align-items: center;

          width: 100%;

          animation:
            an-intro-appear
            1.35s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            )
            both;
        }

        .an-gate__eyebrow {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;
        }

        .an-gate__eyebrow > span {
          width: 22px;

          height: 1px;

          flex: 0 0 22px;

          background:
            rgba(
              238,
              246,
              251,
              .34
            );
        }

        .an-gate__eyebrow p {
          margin: 0;

          color:
            rgba(
              233,
              242,
              248,
              .60
            );

          font-size: 8px;

          font-weight: 600;

          line-height: 1.6;

          letter-spacing:
            .22em;
        }

        .an-gate__mobile-break {
          display: none;
        }

        .an-gate__title {
          margin:
            clamp(
              15px,
              2.2svh,
              28px
            )
            0 0;

          color:
            rgba(
              251,
              252,
              253,
              .98
            );

          font-size:
            clamp(
              68px,
              7.7vw,
              126px
            );

          font-weight: 220;

          line-height: .92;

          letter-spacing:
            -.078em;

          white-space: nowrap;

          text-align: center;

          text-shadow:
            0 0 70px
            rgba(
              220,
              239,
              251,
              .06
            );
        }

        .an-gate__title span {
          color:
            rgba(
              225,
              237,
              245,
              .82
            );
        }

        .an-gate__headline {
          margin:
            clamp(
              18px,
              2.4svh,
              28px
            )
            0 0;

          color:
            rgba(
              247,
              250,
              252,
              .91
            );

          font-size:
            clamp(
              22px,
              2vw,
              34px
            );

          font-weight: 290;

          line-height: 1.28;

          letter-spacing:
            -.038em;

          text-align: center;
        }

        .an-gate__introduction {
          width: min(
            100%,
            480px
          );

          margin:
            13px auto 0;

          color:
            rgba(
              225,
              235,
              242,
              .61
            );

          font-size:
            clamp(
              11px,
              .9vw,
              14px
            );

          font-weight: 350;

          line-height: 1.75;

          text-align: center;
        }

        /* ==================================================
           JOURNEY GLASS
        ================================================== */

        .an-gate__story {
          width: min(
            100%,
            510px
          );

          margin-inline: auto;

          padding:
            clamp(
              17px,
              1.7vw,
              23px
            );

          border-radius: 22px;

          text-align: left;

          animation:
            an-panel-appear
            1.4s .20s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            )
            both;
        }

        .an-gate__story-topline {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 16px;

          color:
            rgba(
              235,
              243,
              248,
              .50
            );

          font-size: 7px;

          font-weight: 600;

          letter-spacing:
            .18em;
        }

        .an-gate__story-body {
          display: flex;

          align-items: center;

          min-height: 98px;

          padding:
            14px 0 10px;
        }

        .an-gate__story-content {
          width: 100%;

          animation:
            an-story-appear
            .7s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            )
            both;
        }

        .an-gate__story-kicker {
          color:
            rgba(
              229,
              239,
              246,
              .46
            );

          font-size: 7px;

          font-weight: 650;

          letter-spacing:
            .23em;
        }

        .an-gate__story-content h2 {
          margin: 7px 0 0;

          color:
            rgba(
              250,
              252,
              253,
              .96
            );

          font-size:
            clamp(
              20px,
              1.65vw,
              27px
            );

          font-weight: 340;

          line-height: 1.24;

          letter-spacing:
            -.035em;
        }

        .an-gate__story-content p {
          max-width: 420px;

          margin: 7px 0 0;

          color:
            rgba(
              228,
              237,
              243,
              .59
            );

          font-size: 10px;

          line-height: 1.65;
        }

        /* ==================================================
           STORY NAVIGATION
        ================================================== */

        .an-gate__story-navigation {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 11px;
        }

        .an-gate__story-step {
          display: flex;

          flex-direction: column;

          gap: 8px;

          min-width: 0;

          min-height: 29px;

          padding: 5px 0;

          border: 0;

          background: transparent;

          color:
            rgba(
              230,
              241,
              248,
              .39
            );

          cursor: pointer;

          text-align: left;

          -webkit-tap-highlight-color:
            transparent;
        }

        .an-gate__story-step-number {
          font-size: 8px;

          letter-spacing: .1em;

          transition:
            color .35s ease;
        }

        .an-gate__story-step-track {
          display: block;

          width: 100%;

          height: 1px;

          overflow: hidden;

          background:
            rgba(
              232,
              243,
              250,
              .16
            );
        }

        .an-gate__story-step-track span {
          display: block;

          width: 100%;

          height: 100%;

          background:
            rgba(
              247,
              251,
              253,
              .92
            );

          transform:
            scaleX(0);

          transform-origin:
            left center;

          transition:
            transform .45s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            );
        }

        .an-gate__story-step.is-active {
          color:
            rgba(
              247,
              251,
              253,
              .94
            );
        }

        .an-gate__story-step.is-active
        .an-gate__story-step-track
        span {
          transform:
            scaleX(1);
        }

        .an-gate__story-step:focus-visible {
          outline:
            1px solid
            rgba(
              245,
              250,
              253,
              .55
            );

          outline-offset: 5px;

          border-radius: 3px;
        }

        /* ==================================================
           ACTIONS
        ================================================== */

        .an-gate__actions {
          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap: 12px;

          width: 100%;

          animation:
            an-panel-appear
            1.4s .38s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            )
            both;
        }

        .an-gate__enter,
        .an-gate__external {
          display: inline-flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 27px;

          min-height: 49px;

          padding:
            0 21px;

          border-radius: 999px;

          color:
            rgba(
              248,
              251,
              253,
              .92
            );

          font-size: 8px;

          font-weight: 650;

          letter-spacing:
            .15em;

          white-space: nowrap;

          transition:
            transform .3s ease,
            background .3s ease,
            border-color .3s ease,
            color .3s ease,
            box-shadow .3s ease;
        }

        /* ==================================================
           ENTER ARCHENOVA
           TRANSPARENT GLASS — NO WHITE FILL
        ================================================== */

        .an-gate__enter {
          min-width: 218px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .16
            );

          background:
            radial-gradient(
              circle at 20% 0%,
              rgba(
                255,
                255,
                255,
                .085
              ),
              transparent 40%
            ),
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                .075
              ),
              rgba(
                255,
                255,
                255,
                .025
              ) 48%,
              rgba(
                255,
                255,
                255,
                .010
              )
            );

          color:
            rgba(
              248,
              251,
              253,
              .95
            );

          -webkit-backdrop-filter:
            blur(28px)
            saturate(112%);

          backdrop-filter:
            blur(28px)
            saturate(112%);

          box-shadow:
            inset 0 1px 0
              rgba(
                255,
                255,
                255,
                .11
              ),
            inset 0 -1px 0
              rgba(
                255,
                255,
                255,
                .018
              ),
            0 20px 60px
              rgba(
                0,
                0,
                0,
                .14
              );
        }

        .an-gate__enter-arrow {
          font-size: 17px;

          font-weight: 350;

          line-height: 1;
        }

        .an-gate__external {
          min-width: 166px;

          color:
            rgba(
              240,
              246,
              250,
              .80
            );
        }

        .an-gate__external
        > span:last-child {
          font-size: 15px;

          font-weight: 350;
        }

        .an-gate__enter:focus-visible,
        .an-gate__external:focus-visible {
          outline:
            2px solid
            rgba(
              247,
              251,
              253,
              .85
            );

          outline-offset: 4px;
        }

        /* ==================================================
           ART EXHIBITION
        ================================================== */

        .an-gate__exhibition {
          display: flex;

          align-items: center;

          justify-content: center;

          width: 100%;

          min-width: 0;

          animation:
            an-artwork-appear
            1.7s .18s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            )
            both;
        }

        .an-gate__artwork {
          width: min(
            100%,
            540px
          );

          margin: 0 auto;

          padding:
            clamp(
              12px,
              1.15vw,
              17px
            );

          border-radius: 30px;
        }

        .an-gate__artwork-top {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 16px;

          min-height: 31px;

          padding:
            0 5px 10px;

          color:
            rgba(
              238,
              245,
              249,
              .47
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            .18em;
        }

        .an-gate__artwork-window {
          position: relative;

          width: 100%;

          aspect-ratio:
            1120 / 1408;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .14
            );

          border-radius: 20px;

          background:
            rgba(
              255,
              255,
              255,
              .018
            );

          box-shadow:
            inset 0 1px 0
              rgba(
                255,
                255,
                255,
                .09
              ),
            0 20px 70px
              rgba(
                0,
                0,
                0,
                .16
              );
        }

        .an-gate__artwork-image {
          object-fit: contain;

          object-position:
            center center;

          transform: none;

          filter:
            saturate(.96)
            contrast(1.01)
            brightness(.96);
        }

        .an-gate__artwork-light {
          position: absolute;

          inset: 0;

          z-index: 2;

          pointer-events: none;

          background:
            linear-gradient(
              115deg,
              rgba(
                255,
                255,
                255,
                .11
              ) 0%,
              rgba(
                255,
                255,
                255,
                .025
              ) 16%,
              transparent 33%,
              transparent 72%,
              rgba(
                255,
                255,
                255,
                .025
              ) 100%
            );

          mix-blend-mode:
            screen;

          opacity: .42;
        }

        .an-gate__artwork-edge {
          position: absolute;

          inset: 0;

          z-index: 3;

          border-radius: inherit;

          pointer-events: none;

          box-shadow:
            inset 0 0 0 1px
              rgba(
                255,
                255,
                255,
                .025
              ),
            inset 0 22px 50px
              rgba(
                255,
                255,
                255,
                .018
              );
        }

        /* ==================================================
           ARTWORK CAPTION
        ================================================== */

        .an-gate__artwork-caption {
          padding:
            clamp(
              20px,
              2vw,
              29px
            )
            clamp(
              7px,
              .7vw,
              12px
            )
            clamp(
              7px,
              .7vw,
              12px
            );

          text-align: left;
        }

        .an-gate__artwork-index {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 16px;

          color:
            rgba(
              233,
              242,
              248,
              .45
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            .18em;
        }

        .an-gate__artwork-caption h2 {
          max-width: 450px;

          margin:
            13px 0 0;

          color:
            rgba(
              250,
              252,
              253,
              .96
            );

          font-size:
            clamp(
              21px,
              1.7vw,
              30px
            );

          font-weight: 300;

          line-height: 1.25;

          letter-spacing:
            -.035em;
        }

        .an-gate__artwork-caption p {
          max-width: 475px;

          margin:
            11px 0 0;

          color:
            rgba(
              228,
              237,
              243,
              .59
            );

          font-size:
            clamp(
              9px,
              .68vw,
              11px
            );

          font-weight: 350;

          line-height: 1.72;
        }

        .an-gate__artwork-principle {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-top: 17px;

          color:
            rgba(
              237,
              244,
              249,
              .43
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            .15em;
        }

        .an-gate__artwork-principle i {
          width: 3px;

          height: 3px;

          flex: 0 0 3px;

          border-radius: 50%;

          background:
            rgba(
              240,
              247,
              251,
              .38
            );
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .an-gate__footer {
          position: relative;

          z-index: 5;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;

          width: min(
            100%,
            1440px
          );

          margin-inline: auto;

          padding-top: 13px;

          border-top:
            1px solid
            rgba(
              239,
              247,
              252,
              .11
            );

          color:
            rgba(
              230,
              240,
              247,
              .43
            );

          font-size: 7px;

          font-weight: 550;

          letter-spacing:
            .15em;
        }

        .an-gate__footer
        > span:first-child {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .an-gate__footer i {
          display: inline-block;

          width: 3px;

          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              239,
              247,
              252,
              .40
            );
        }

        .an-gate__footer-right {
          white-space: nowrap;
        }

        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes an-cosmos-breathe {
          0%,
          100% {
            opacity: .45;

            transform:
              scale(.93);
          }

          50% {
            opacity: .9;

            transform:
              scale(1.06);
          }
        }

        @keyframes an-orbit-rotate {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes an-orbit-tilt {
          0%,
          100% {
            transform:
              rotate(-25deg);
          }

          50% {
            transform:
              rotate(-8deg);
          }
        }

        @keyframes an-orbit-vertical {
          0%,
          100% {
            transform:
              rotate(31deg);
          }

          50% {
            transform:
              rotate(48deg);
          }
        }

        @keyframes an-core-breathe {
          0%,
          100% {
            opacity: .65;

            transform:
              scale(.94);
          }

          50% {
            opacity: 1;

            transform:
              scale(1.07);
          }
        }

        @keyframes an-status-breathe {
          0%,
          100% {
            opacity: .4;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes an-intro-appear {
          from {
            opacity: 0;

            transform:
              translateY(20px);

            filter:
              blur(5px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);

            filter:
              blur(0);
          }
        }

        @keyframes an-panel-appear {
          from {
            opacity: 0;

            transform:
              translateY(14px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes an-story-appear {
          from {
            opacity: 0;

            transform:
              translateY(7px);

            filter:
              blur(3px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);

            filter:
              blur(0);
          }
        }

        @keyframes an-artwork-appear {
          from {
            opacity: 0;

            transform:
              translateY(24px)
              scale(.985);

            filter:
              blur(7px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter:
              blur(0);
          }
        }

        /* ==================================================
           DESKTOP HOVER
        ================================================== */

        @media
          (hover: hover)
          and
          (pointer: fine) {

          .an-gate__enter:hover {
            transform:
              translateY(-2px);

            border-color:
              rgba(
                255,
                255,
                255,
                .27
              );

            background:
              radial-gradient(
                circle at 20% 0%,
                rgba(
                  255,
                  255,
                  255,
                  .12
                ),
                transparent 42%
              ),
              linear-gradient(
                145deg,
                rgba(
                  255,
                  255,
                  255,
                  .10
                ),
                rgba(
                  255,
                  255,
                  255,
                  .035
                ) 50%,
                rgba(
                  255,
                  255,
                  255,
                  .014
                )
              );

            color: #fff;

            box-shadow:
              inset 0 1px 0
                rgba(
                  255,
                  255,
                  255,
                  .15
                ),
              0 24px 72px
                rgba(
                  0,
                  0,
                  0,
                  .17
                );
          }

          .an-gate__external:hover {
            transform:
              translateY(-2px);

            border-color:
              rgba(
                255,
                255,
                255,
                .24
              );

            background:
              radial-gradient(
                circle at 20% 0%,
                rgba(
                  255,
                  255,
                  255,
                  .10
                ),
                transparent 42%
              ),
              linear-gradient(
                145deg,
                rgba(
                  255,
                  255,
                  255,
                  .085
                ),
                rgba(
                  255,
                  255,
                  255,
                  .026
                )
              );

            color: #fff;
          }

          .an-gate__story-step:hover {
            color:
              rgba(
                247,
                251,
                253,
                .86
              );
          }

          .an-gate__artwork {
            transition:
              transform .7s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              ),
              border-color .7s ease;
          }

          .an-gate__artwork:hover {
            transform:
              translateY(-3px);

            border-color:
              rgba(
                255,
                255,
                255,
                .18
              );
          }
        }

        /* ==================================================
           MID-SIZE DESKTOP
        ================================================== */

        @media (max-width: 1180px) {
          .an-gate__gallery {
            grid-template-columns:
              minmax(360px, 1fr)
              minmax(330px, .82fr);

            gap:
              clamp(
                32px,
                4vw,
                52px
              );

            width: min(
              100%,
              1060px
            );
          }

          .an-gate__title {
            font-size:
              clamp(
                64px,
                8.8vw,
                104px
              );
          }

          .an-gate__artwork {
            width: min(
              100%,
              480px
            );
          }

          .an-gate__cosmos {
            width:
              min(
                86vw,
                760px
              );

            opacity: .19;
          }
        }

        /* ==================================================
           TABLET / VERTICAL GALLERY
        ================================================== */

        @media (max-width: 900px) {
          .an-gate__gallery {
            grid-template-columns:
              minmax(0, 1fr);

            gap: 56px;

            width: min(
              100%,
              700px
            );

            padding:
              58px 0;
          }

          .an-gate__main {
            width: min(
              100%,
              620px
            );

            margin-inline: auto;
          }

          .an-gate__exhibition {
            justify-content:
              center;
          }

          .an-gate__artwork {
            width: min(
              100%,
              560px
            );
          }

          .an-gate__cosmos {
            top: 28%;

            width:
              min(
                100vw,
                680px
              );

            opacity: .17;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .an-gate__viewport {
            display: block;

            min-height: 100svh;

            padding:
              max(
                18px,
                env(
                  safe-area-inset-top
                )
              )
              18px
              max(
                17px,
                env(
                  safe-area-inset-bottom
                )
              );
          }

          .an-gate__header {
            margin-bottom: 26px;
          }

          .an-gate__brand-copy small,
          .an-gate__edition {
            font-size: 5px;

            letter-spacing:
              .12em;
          }

          .an-gate__edition {
            gap: 6px;
          }

          .an-gate__cinema-shade {
            background:
              linear-gradient(
                180deg,
                rgba(
                  0,
                  0,
                  0,
                  .68
                ),
                rgba(
                  0,
                  0,
                  0,
                  .40
                ) 22%,
                rgba(
                  0,
                  0,
                  0,
                  .52
                ) 58%,
                rgba(
                  0,
                  0,
                  0,
                  .84
                )
              );
          }

          .an-gate__cosmos {
            top: 24%;

            left: 50%;

            width:
              min(
                112vw,
                560px
              );

            transform:
              translate(
                -50%,
                -50%
              );

            opacity: .14;
          }

          .an-gate__gallery {
            display: flex;

            flex-direction: column;

            align-items: center;

            gap: 46px;

            width: 100%;

            padding:
              27px 0 45px;
          }

          .an-gate__main {
            align-items: center;

            gap:
              clamp(
                20px,
                3svh,
                28px
              );

            width: 100%;

            text-align: center;
          }

          .an-gate__intro {
            align-items: center;
          }

          .an-gate__eyebrow {
            justify-content:
              center;

            gap: 9px;
          }

          .an-gate__eyebrow
          > span {
            width: 15px;

            flex-basis: 15px;
          }

          .an-gate__eyebrow p {
            font-size: 7px;

            letter-spacing:
              .16em;
          }

          .an-gate__title {
            margin-top: 15px;

            font-size:
              clamp(
                54px,
                15.5vw,
                94px
              );

            letter-spacing:
              -.075em;
          }

          .an-gate__headline {
            margin-top: 17px;

            font-size:
              clamp(
                20px,
                5.4vw,
                29px
              );

            line-height: 1.34;
          }

          .an-gate__introduction {
            max-width: 350px;

            margin-top: 10px;

            font-size: 11px;

            line-height: 1.68;
          }

          .an-gate__story {
            width: min(
              100%,
              420px
            );

            padding:
              17px 18px;

            border-radius: 20px;

            text-align: left;
          }

          .an-gate__story-body {
            min-height: 91px;
          }

          .an-gate__story-content h2 {
            font-size: 22px;
          }

          .an-gate__story-content p {
            font-size: 10px;
          }

          .an-gate__actions {
            justify-content:
              center;

            width: min(
              100%,
              420px
            );
          }

          /* ================================================
             MOBILE ART EXHIBITION
          ================================================ */

          .an-gate__exhibition {
            width: 100%;
          }

          .an-gate__artwork {
            width: min(
              100%,
              520px
            );

            padding: 10px;

            border-radius: 25px;
          }

          .an-gate__artwork-top {
            min-height: 28px;

            padding:
              0 4px 9px;

            font-size: 5px;
          }

          .an-gate__artwork-window {
            border-radius: 17px;
          }

          .an-gate__artwork-caption {
            padding:
              22px 9px 10px;

            text-align: left;
          }

          .an-gate__artwork-index {
            font-size: 5px;
          }

          .an-gate__artwork-caption h2 {
            max-width: 360px;

            margin-top: 12px;

            font-size:
              clamp(
                23px,
                6vw,
                29px
              );
          }

          .an-gate__artwork-caption p {
            max-width: 420px;

            font-size: 10px;

            line-height: 1.7;
          }

          .an-gate__artwork-principle {
            flex-wrap: wrap;

            margin-top: 16px;

            font-size: 5px;
          }

          .an-gate__footer {
            justify-content:
              center;

            width: 100%;

            padding-top: 16px;

            font-size: 6px;
          }

          .an-gate__footer-right {
            display: none;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-gate__viewport {
            padding-right: 14px;

            padding-left: 14px;
          }

          .an-gate__header {
            margin-bottom: 21px;
          }

          .an-gate__gallery {
            padding-top: 22px;

            gap: 39px;
          }

          .an-gate__title {
            font-size:
              clamp(
                49px,
                15.5vw,
                67px
              );
          }

          .an-gate__headline {
            font-size:
              clamp(
                19px,
                5.6vw,
                24px
              );
          }

          .an-gate__introduction {
            max-width: 320px;

            font-size: 10px;
          }

          .an-gate__story {
            padding:
              15px 16px;

            border-radius: 18px;
          }

          .an-gate__story-body {
            min-height: 88px;
          }

          .an-gate__actions {
            gap: 9px;
          }

          .an-gate__enter,
          .an-gate__external {
            width: 100%;

            min-width: 0;

            justify-content:
              center;

            gap: 20px;
          }

          .an-gate__enter {
            justify-content:
              space-between;
          }

          .an-gate__artwork {
            border-radius: 22px;
          }

          .an-gate__artwork-window {
            border-radius: 15px;
          }

          .an-gate__artwork-caption h2 {
            font-size: 22px;
          }
        }

        /* ==================================================
           SHORT DESKTOP SCREENS

           Preserve all content.
           Allow natural scrolling instead of clipping.
        ================================================== */

        @media
          (min-width: 901px)
          and
          (max-height: 780px) {

          .an-gate__gallery {
            padding:
              30px 0;
          }

          .an-gate__main {
            gap: 17px;
          }

          .an-gate__title {
            margin-top: 12px;
          }

          .an-gate__headline {
            margin-top: 13px;
          }

          .an-gate__introduction {
            margin-top: 8px;
          }

          .an-gate__story-body {
            min-height: 76px;

            padding:
              9px 0 7px;
          }

          .an-gate__artwork {
            width: min(
              100%,
              430px
            );
          }

          .an-gate__artwork-caption {
            padding-top: 15px;
          }

          .an-gate__artwork-caption h2 {
            margin-top: 9px;

            font-size: 21px;
          }

          .an-gate__artwork-caption p {
            margin-top: 7px;

            line-height: 1.55;
          }

          .an-gate__artwork-principle {
            margin-top: 11px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media
          (prefers-reduced-motion:
            reduce) {

          .an-gate__video {
            display:
              none !important;
          }

          .an-gate__cosmos *,
          .an-gate__edition-dot,
          .an-gate__intro,
          .an-gate__story,
          .an-gate__story-content,
          .an-gate__actions,
          .an-gate__exhibition {
            animation:
              none !important;
          }

          .an-gate__intro,
          .an-gate__story,
          .an-gate__story-content,
          .an-gate__actions,
          .an-gate__exhibition {
            opacity:
              1 !important;

            transform:
              none !important;

            filter:
              none !important;
          }

          .an-gate__video,
          .an-gate__enter,
          .an-gate__external,
          .an-gate__story-step,
          .an-gate__artwork {
            transition:
              none !important;
          }
        }
      `}</style>
    </main>
  );
}