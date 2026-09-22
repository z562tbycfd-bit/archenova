"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ==========================================================
   ARCHENOVA — CIVILIZATION GATE

   Refined edition based on the existing design.

   PRESERVED
   - Cinematic background video and poster fallback
   - Ambient gravitational structure
   - Three automatically rotating story chapters
   - Manual chapter selection
   - Translucent story panel
   - Existing entrance and X destinations
   - Existing visual language and animations

   REFINED
   - Less text
   - More balanced whitespace
   - Less crowded mobile composition
   - Responsive full-screen layout
   - Natural scrolling only when the available height
     cannot accommodate the content without clipping
========================================================== */

type CinematicState =
  | "loading"
  | "playing"
  | "failed";

const STORY = [
  {
    number: "01",
    title: "ORIGIN",
    subtitle: "Gravity & Quantum",
    description:
      "Discover the principles that shape possibility.",
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

  const failCinematic = useCallback(() => {
    setCinematicState("failed");
    videoRef.current?.pause();
  }, []);

  /* ========================================================
     ACCESSIBILITY / REDUCED MOTION
  ======================================================== */

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => {
      setReducedMotion(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  /* ========================================================
     VIDEO PLAYBACK / FALLBACK

     The existing video remains the background.
     The poster remains visible until playback begins,
     or whenever video playback fails.
  ======================================================== */

  useEffect(() => {
    if (reducedMotion) {
      videoRef.current?.pause();
      return;
    }

    if (cinematicState === "failed") {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCinematicState((current) =>
        current === "playing"
          ? current
          : "failed",
      );
    }, 6000);

    const attemptPlayback = async () => {
      try {
        await video.play();
      } catch {
        failCinematic();
      }
    };

    void attemptPlayback();

    return () => {
      window.clearTimeout(timeout);
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
    if (reducedMotion || storyPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStory(
        (current) => (current + 1) % STORY.length,
      );
    }, 5200);

    return () => {
      window.clearInterval(interval);
    };
  }, [reducedMotion, storyPaused]);

  const selectStory = useCallback(
    (index: number) => {
      setActiveStory(index);
      setStoryPaused(true);
    },
    [],
  );

  return (
    <main className="an-gate">
      {/* ====================================================
          FULL-SCREEN CINEMATIC BACKGROUND
      ==================================================== */}

      <div
        className="an-gate__cinema"
        aria-hidden="true"
      >
        <div className="an-gate__poster" />

        {!reducedMotion &&
          cinematicState !== "failed" && (
            <video
              ref={videoRef}
              className={[
                "an-gate__video",
                cinematicState === "playing"
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
                setCinematicState("playing");
              }}
              onError={failCinematic}
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
          MAIN VIEWPORT
      ==================================================== */}

      <section
        className="an-gate__viewport"
        aria-labelledby="an-gate-title"
      >
        {/* HEADER */}

        <header className="an-gate__header">
          <div className="an-gate__brand">
            
            <div className="an-gate__brand-copy">

              <small>
                FROM FIRST PRINCIPLES TO CIVILIZATION
              </small>
            </div>
          </div>
        </header>

        {/* CENTRAL STORY */}

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
              Where understanding becomes
              <br />
              enduring structure.
            </p>

            <p className="an-gate__introduction">
              From fundamental science to
              engineering, governance, and lasting value.
            </p>
          </div>

          {/* LIVING CHAPTER */}

          <div
            className="an-gate__story"
            aria-label="ArcheNova's conceptual journey"
          >
            <div className="an-gate__story-topline">
              <span>THE ARCHENOVA JOURNEY</span>

              <span>
                {STORY[activeStory].number}
                {" / "}
                03
              </span>
            </div>

            <div className="an-gate__story-body">
              <div
                key={activeStory}
                className="an-gate__story-content"
              >
                <span className="an-gate__story-kicker">
                  {STORY[activeStory].title}
                </span>

                <h2>
                  {STORY[activeStory].subtitle}
                </h2>

                <p>
                  {STORY[activeStory].description}
                </p>
              </div>
            </div>

            <div
              className="an-gate__story-navigation"
              aria-label="Choose a story chapter"
            >
              {STORY.map((chapter, index) => (
                <button
                  key={chapter.number}
                  type="button"
                  className={[
                    "an-gate__story-step",
                    activeStory === index
                      ? "is-active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    selectStory(index);
                  }}
                  aria-label={`Show ${chapter.subtitle}`}
                  aria-pressed={activeStory === index}
                >
                  <span className="an-gate__story-step-number">
                    {chapter.number}
                  </span>

                  <span className="an-gate__story-step-track">
                    <span />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="an-gate__actions">
            <Link
              href="/home"
              className="an-gate__enter"
            >
              <span>ENTER ARCHENOVA</span>

              <span
                className="an-gate__enter-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>

            <a
              href="https://x.com/ArcheNova_X"
              target="_blank"
              rel="noopener noreferrer"
              className="an-gate__external"
            >
              <span>EXPLORE ON X</span>

              <span aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* FOOTER */}

        <footer className="an-gate__footer">
          <span>
            PHYSICS
            <i aria-hidden="true" />
            ENGINEERING
            <i aria-hidden="true" />
            CIVILIZATION
          </span>

          <span className="an-gate__footer-right">
            REALITY RETAINS VETO
          </span>
        </footer>
      </section>

      <style jsx global>{`
        /* ==================================================
           ROOT / FULL VIEWPORT
        ================================================== */

        .an-gate,
        .an-gate *,
        .an-gate *::before,
        .an-gate *::after {
          box-sizing: border-box;
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
            "Segoe UI",
            sans-serif;

          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .an-gate a {
          text-decoration: none;
        }

        .an-gate button {
          font: inherit;
        }

        /* ==================================================
           FULL-SCREEN CINEMA
        ================================================== */

        .an-gate__cinema {
          position: absolute;
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

          opacity: 0.72;
        }

        .an-gate__video {
          border: 0;

          object-fit: cover;
          object-position: center;

          opacity: 0;

          transition:
            opacity 1.5s
            cubic-bezier(.22, 1, .36, 1);
        }

        .an-gate__video.is-playing {
          opacity: 0.74;
        }

        .an-gate__cinema-shade {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, .80),
              rgba(0, 0, 0, .45) 48%,
              rgba(0, 0, 0, .69)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, .45),
              rgba(0, 0, 0, .06) 30%,
              rgba(0, 0, 0, .15) 65%,
              rgba(0, 0, 0, .82)
            );
        }

        .an-gate__cinema-vignette {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              ellipse at 50% 45%,
              transparent 15%,
              rgba(0, 0, 0, .28) 55%,
              rgba(0, 0, 0, .75) 100%
            );
        }

        .an-gate__cinema-grain {
          position: absolute;
          inset: 0;

          opacity: .12;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, .35) 0 .45px,
              transparent .8px
            );

          background-size: 67px 67px;
        }

        /* ==================================================
           LIVING COSMOS — ORIGINAL VISUAL PRESERVED
        ================================================== */

        .an-gate__cosmos {
          position: absolute;
          z-index: -1;

          top: 50%;
          right: -9%;

          width: min(64vw, 850px);
          aspect-ratio: 1;

          transform: translateY(-50%);

          display: grid;
          place-items: center;

          pointer-events: none;
          opacity: .42;
        }

        .an-gate__cosmos-halo {
          position: absolute;
          inset: 10%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(214, 233, 246, .075),
              rgba(165, 195, 216, .025) 35%,
              transparent 68%
            );

          filter: blur(22px);

          animation:
            an-cosmos-breathe
            12s ease-in-out infinite;
        }

        .an-gate__orbit {
          position: absolute;

          border: 1px solid
            rgba(233, 243, 250, .16);

          border-radius: 50%;
        }

        .an-gate__orbit--one {
          width: 76%;
          aspect-ratio: 1;

          animation:
            an-orbit-rotate
            85s linear infinite;
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
            rgba(245, 250, 253, .85);

          box-shadow:
            0 0 18px rgba(239, 248, 253, .6);
        }

        .an-gate__orbit--two {
          width: 89%;
          height: 31%;

          transform: rotate(-25deg);

          border-color:
            rgba(233, 243, 250, .13);

          animation:
            an-orbit-tilt
            19s ease-in-out infinite;
        }

        .an-gate__orbit--three {
          width: 35%;
          height: 84%;

          transform: rotate(31deg);

          border-color:
            rgba(233, 243, 250, .1);

          animation:
            an-orbit-vertical
            25s ease-in-out infinite;
        }

        .an-gate__cosmos-core {
          display: grid;
          place-items: center;

          width: 16%;
          aspect-ratio: 1;

          border: 1px solid
            rgba(242, 248, 252, .3);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(235, 246, 252, .13),
              rgba(5, 8, 12, .9) 38%,
              #000 75%
            );

          box-shadow:
            0 0 35px rgba(229, 241, 250, .08),
            inset 0 0 20px rgba(0, 0, 0, .8);

          animation:
            an-core-breathe
            9s ease-in-out infinite;
        }

        .an-gate__cosmos-core span {
          width: 14%;
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            rgba(246, 251, 253, .9);

          box-shadow:
            0 0 12px rgba(239, 248, 253, .8),
            0 0 35px rgba(239, 248, 253, .3);
        }

        /* ==================================================
           VIEWPORT STRUCTURE

           Full available width and height.
           No fixed-height content frame.
        ================================================== */

        .an-gate__viewport {
          position: relative;

          display: grid;
          grid-template-rows:
            auto minmax(0, 1fr) auto;

          width: 100%;
          min-width: 0;

          min-height: 100vh;
          min-height: 100svh;

          padding:
            max(24px, env(safe-area-inset-top))
            clamp(24px, 5.5vw, 96px)
            max(20px, env(safe-area-inset-bottom));
        }

        /* ==================================================
           HEADER
        ================================================== */

        .an-gate__header {
          position: relative;
          z-index: 5;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
          width: 100%;
          min-width: 0;
        }

        .an-gate__brand {
          display: flex;
          align-items: center;

          gap: 12px;
          min-width: 0;
        }

        .an-gate__brand-mark {
          display: grid;
          place-items: center;

          width: 35px;
          height: 35px;
          flex: 0 0 35px;

          border: 1px solid
            rgba(245, 249, 252, .17);

          border-radius: 50%;

          background:
            rgba(13, 17, 21, .42);

          color:
            rgba(246, 250, 253, .9);

          font-size: 12px;
          font-weight: 300;

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .an-gate__brand-copy {
          display: flex;
          flex-direction: column;

          gap: 5px;
          min-width: 0;
        }

        .an-gate__brand-copy strong {
          color: rgba(250, 252, 253, .9);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: .23em;
        }

        .an-gate__brand-copy small {
          color: rgba(232, 241, 247, .45);

          font-size: 7px;
          font-weight: 500;
          letter-spacing: .13em;
        }

        .an-gate__header-status {
          display: flex;
          align-items: center;

          gap: 9px;

          color: rgba(233, 242, 248, .55);

          font-size: 8px;
          font-weight: 550;
          letter-spacing: .17em;

          white-space: nowrap;
        }

        .an-gate__status-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;

          border-radius: 50%;

          background: rgba(240, 249, 253, .8);

          box-shadow:
            0 0 12px rgba(233, 245, 252, .3);

          animation:
            an-status-breathe
            6s ease-in-out infinite;
        }

        /* ==================================================
           MAIN CONTENT

           Vertical rhythm adapts to the screen height.
        ================================================== */

        .an-gate__main {
          position: relative;
          z-index: 4;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          gap: clamp(17px, 2.7svh, 34px);

          width: min(100%, 760px);
          min-width: 0;

          padding:
            clamp(24px, 4.5svh, 65px) 0;
        }

        .an-gate__intro {
          width: 100%;

          animation:
            an-intro-appear
            1.4s cubic-bezier(.22, 1, .36, 1)
            both;
        }

        .an-gate__eyebrow {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        .an-gate__eyebrow > span {
          width: 23px;
          height: 1px;
          flex: 0 0 23px;

          background:
            rgba(233, 243, 250, .35);
        }

        .an-gate__eyebrow p {
          margin: 0;

          color: rgba(229, 240, 247, .57);

          font-size: 9px;
          font-weight: 600;
          line-height: 1.6;
          letter-spacing: .22em;
        }

        .an-gate__mobile-break {
          display: none;
        }

        .an-gate__title {
          margin:
            clamp(14px, 2.2svh, 27px)
            0 0;

          color: rgba(250, 252, 253, .98);

          font-size:
            clamp(70px, 10.2vw, 150px);

          font-weight: 230;
          line-height: .93;
          letter-spacing: -.078em;

          white-space: nowrap;

          text-shadow:
            0 0 65px rgba(220, 239, 251, .055);
        }

        .an-gate__title span {
          color: rgba(224, 237, 245, .82);
        }

        .an-gate__headline {
          margin:
            clamp(16px, 2.5svh, 27px)
            0 0;

          color: rgba(244, 249, 252, .89);

          font-size:
            clamp(21px, 2.45vw, 34px);

          font-weight: 300;
          line-height: 1.3;
          letter-spacing: -.035em;
        }

        .an-gate__introduction {
          width: min(100%, 460px);

          margin: 12px 0 0;

          color: rgba(222, 234, 242, .61);

          font-size:
            clamp(12px, 1vw, 14px);

          font-weight: 350;
          line-height: 1.7;
        }

        /* ==================================================
           TRANSLUCENT STORY PANEL
        ================================================== */

        .an-gate__story {
          width: min(100%, 510px);

          padding:
            clamp(16px, 1.9vw, 23px);

          border: 1px solid
            rgba(236, 245, 251, .13);

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(22, 28, 34, .49),
              rgba(3, 5, 8, .37)
            );

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, .035),
            0 20px 65px
              rgba(0, 0, 0, .16);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          animation:
            an-panel-appear
            1.4s .25s
            cubic-bezier(.22, 1, .36, 1)
            both;
        }

        .an-gate__story-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;

          color: rgba(232, 242, 249, .49);

          font-size: 8px;
          font-weight: 600;
          letter-spacing: .18em;
        }

        .an-gate__story-body {
          display: flex;
          align-items: center;

          min-height: 100px;

          padding: 14px 0 11px;
        }

        .an-gate__story-content {
          width: 100%;

          animation:
            an-story-appear
            .7s cubic-bezier(.22, 1, .36, 1)
            both;
        }

        .an-gate__story-kicker {
          color: rgba(226, 240, 249, .46);

          font-size: 8px;
          font-weight: 650;
          letter-spacing: .23em;
        }

        .an-gate__story-content h2 {
          margin: 7px 0 0;

          color: rgba(248, 251, 253, .96);

          font-size:
            clamp(20px, 1.9vw, 27px);

          font-weight: 350;
          line-height: 1.25;
          letter-spacing: -.035em;
        }

        .an-gate__story-content p {
          max-width: 420px;

          margin: 7px 0 0;

          color: rgba(226, 237, 244, .59);

          font-size: 11px;
          line-height: 1.6;
        }

        /* ==================================================
           STORY NAVIGATION
        ================================================== */

        .an-gate__story-navigation {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));

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

          color: rgba(230, 241, 248, .39);

          cursor: pointer;
          text-align: left;

          -webkit-tap-highlight-color: transparent;
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
            rgba(232, 243, 250, .16);
        }

        .an-gate__story-step-track span {
          display: block;

          width: 100%;
          height: 100%;

          background:
            rgba(244, 250, 253, .9);

          transform: scaleX(0);
          transform-origin: left center;
        }

        .an-gate__story-step.is-active {
          color: rgba(247, 251, 253, .94);
        }

        .an-gate__story-step.is-active
        .an-gate__story-step-track span {
          transform: scaleX(1);
        }

        .an-gate__story-step:focus-visible {
          outline: 1px solid
            rgba(245, 250, 253, .55);

          outline-offset: 5px;
          border-radius: 3px;
        }

        /* ==================================================
           ACTIONS
        ================================================== */

        .an-gate__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 12px;
          width: 100%;

          animation:
            an-panel-appear
            1.4s .45s
            cubic-bezier(.22, 1, .36, 1)
            both;
        }

        .an-gate__enter,
        .an-gate__external {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          gap: 28px;

          min-height: 49px;
          padding: 0 21px;

          border-radius: 999px;

          font-size: 9px;
          font-weight: 650;
          letter-spacing: .15em;

          white-space: nowrap;

          transition:
            transform .3s ease,
            background .3s ease,
            border-color .3s ease,
            color .3s ease,
            box-shadow .3s ease;
        }

        .an-gate__enter {
          min-width: 218px;

          border: 1px solid
            rgba(250, 252, 253, .64);

          background:
            rgba(244, 249, 252, .93);

          color: #070a0d;

          box-shadow:
            0 10px 36px
            rgba(0, 0, 0, .18);
        }

        .an-gate__enter-arrow {
          font-size: 17px;
          font-weight: 350;
          line-height: 1;
        }

        .an-gate__external {
          min-width: 166px;

          border: 1px solid
            rgba(235, 245, 251, .19);

          background:
            rgba(10, 14, 18, .35);

          color:
            rgba(237, 245, 250, .76);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .an-gate__external > span:last-child {
          font-size: 15px;
          font-weight: 350;
        }

        .an-gate__enter:focus-visible,
        .an-gate__external:focus-visible {
          outline: 2px solid
            rgba(247, 251, 253, .85);

          outline-offset: 4px;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .an-gate__footer {
          position: relative;
          z-index: 5;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
          width: 100%;

          padding-top: 13px;

          border-top: 1px solid
            rgba(239, 247, 252, .11);

          color: rgba(230, 240, 247, .43);

          font-size: 8px;
          font-weight: 550;
          letter-spacing: .15em;
        }

        .an-gate__footer > span:first-child {
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
            rgba(239, 247, 252, .4);
        }

        .an-gate__footer-right {
          white-space: nowrap;
        }

        /* ==================================================
           ANIMATIONS — ORIGINAL BEHAVIOR PRESERVED
        ================================================== */

        @keyframes an-cosmos-breathe {
          0%,
          100% {
            opacity: .45;
            transform: scale(.93);
          }

          50% {
            opacity: .9;
            transform: scale(1.06);
          }
        }

        @keyframes an-orbit-rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes an-orbit-tilt {
          0%,
          100% {
            transform: rotate(-25deg);
          }

          50% {
            transform: rotate(-8deg);
          }
        }

        @keyframes an-orbit-vertical {
          0%,
          100% {
            transform: rotate(31deg);
          }

          50% {
            transform: rotate(48deg);
          }
        }

        @keyframes an-core-breathe {
          0%,
          100% {
            opacity: .65;
            transform: scale(.94);
          }

          50% {
            opacity: 1;
            transform: scale(1.07);
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
            transform: translateY(20px);
            filter: blur(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes an-panel-appear {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes an-story-appear {
          from {
            opacity: 0;
            transform: translateY(7px);
            filter: blur(3px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* ==================================================
           DESKTOP HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .an-gate__enter:hover {
            transform: translateY(-2px);

            background: #fff;

            box-shadow:
              0 15px 42px
              rgba(239, 247, 252, .12);
          }

          .an-gate__external:hover {
            transform: translateY(-2px);

            border-color:
              rgba(239, 247, 252, .35);

            background:
              rgba(24, 31, 38, .54);

            color: #fff;
          }

          .an-gate__story-step:hover {
            color: rgba(247, 251, 253, .86);
          }
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1024px) {
          .an-gate__cosmos {
            right: -24%;
            width: min(86vw, 760px);
            opacity: .29;
          }

          .an-gate__main {
            width: min(100%, 700px);
          }

          .an-gate__title {
            font-size:
              clamp(70px, 11.5vw, 116px);
          }
        }

        /* ==================================================
           MOBILE

           Full device width.
           Full visible viewport when content fits.
           Natural scrolling when the device is shorter.
        ================================================== */

        @media (max-width: 700px) {
          .an-gate__viewport {
            min-height: 100vh;
            min-height: 100svh;

            padding:
              max(18px, env(safe-area-inset-top))
              22px
              max(17px, env(safe-area-inset-bottom));
          }

          .an-gate__cinema-shade {
            background:
              linear-gradient(
                180deg,
                rgba(0, 0, 0, .70),
                rgba(0, 0, 0, .44) 25%,
                rgba(0, 0, 0, .64) 65%,
                rgba(0, 0, 0, .88)
              );
          }

          .an-gate__poster {
            background-position: center;
          }

          .an-gate__video {
            object-position: center;
          }

          .an-gate__cosmos {
            top: 39%;
            right: 50%;

            width: min(105vw, 540px);

            transform:
              translate(50%, -50%);

            opacity: .22;
          }

          .an-gate__brand {
            gap: 9px;
          }

          .an-gate__brand-mark {
            width: 30px;
            height: 30px;
            flex-basis: 30px;

            font-size: 10px;
          }

          .an-gate__brand-copy strong {
            font-size: 8px;
            letter-spacing: .16em;
          }

          .an-gate__brand-copy small {
            font-size: 5px;
            letter-spacing: .07em;
          }

          .an-gate__header-status {
            gap: 6px;
            font-size: 0;
          }

          .an-gate__status-dot {
            width: 5px;
            height: 5px;
          }

          .an-gate__main {
            align-items: center;

            gap: clamp(15px, 2.6svh, 24px);

            width: 100%;

            padding:
              clamp(19px, 3.5svh, 38px)
              0
              clamp(18px, 3svh, 32px);

            text-align: center;
          }

          .an-gate__intro {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .an-gate__eyebrow {
            justify-content: center;
            gap: 9px;
          }

          .an-gate__eyebrow > span {
            width: 15px;
            flex-basis: 15px;
          }

          .an-gate__eyebrow p {
            font-size: 7px;
            letter-spacing: .16em;
          }

          .an-gate__title {
            margin-top:
              clamp(12px, 2svh, 19px);

            font-size:
              clamp(53px, 15.5vw, 94px);

            letter-spacing: -.075em;
          }

          .an-gate__headline {
            margin-top:
              clamp(13px, 2svh, 20px);

            font-size:
              clamp(19px, 5.2vw, 28px);

            line-height: 1.36;
          }

          .an-gate__introduction {
            max-width: 340px;

            margin-top: 10px;

            font-size: 11px;
            line-height: 1.65;
          }

          .an-gate__story {
            width: min(100%, 410px);

            padding: 16px 18px;

            border-radius: 18px;

            text-align: left;
          }

          .an-gate__story-topline {
            font-size: 7px;
          }

          .an-gate__story-body {
            min-height: 92px;
            padding: 12px 0 9px;
          }

          .an-gate__story-content h2 {
            font-size: 22px;
          }

          .an-gate__story-content p {
            font-size: 10px;
          }

          .an-gate__actions {
            justify-content: center;
            width: min(100%, 410px);
          }

          .an-gate__enter,
          .an-gate__external {
            min-height: 46px;
            font-size: 8px;
          }

          .an-gate__footer {
            justify-content: center;
            font-size: 7px;
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
            padding-right: 17px;
            padding-left: 17px;
          }

          .an-gate__main {
            gap: clamp(13px, 2.3svh, 19px);
          }

          .an-gate__title {
            font-size:
              clamp(49px, 15.5vw, 67px);
          }

          .an-gate__introduction {
            max-width: 320px;
            font-size: 10px;
          }

          .an-gate__story {
            padding: 15px 16px;
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

            justify-content: center;
            gap: 20px;
          }

          .an-gate__enter {
            justify-content: space-between;
          }
        }

        /* ==================================================
           SHORT SCREENS

           Tighten spacing without hiding content.
        ================================================== */

        @media (max-height: 740px) {
          .an-gate__main {
            padding-top: 18px;
            padding-bottom: 18px;
            gap: 15px;
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
            min-height: 80px;
            padding-top: 9px;
            padding-bottom: 7px;
          }
        }

        /* ==================================================
           VERY SHORT MOBILE SCREENS

           Preserve all content and both navigation links.
           Scrolling is preferable to clipping.
        ================================================== */

        @media (max-width: 700px) and (max-height: 620px) {
          .an-gate__viewport {
            padding-top:
              max(12px, env(safe-area-inset-top));

            padding-bottom:
              max(12px, env(safe-area-inset-bottom));
          }

          .an-gate__main {
            gap: 12px;
            padding: 15px 0;
          }

          .an-gate__title {
            margin-top: 10px;
          }

          .an-gate__headline {
            margin-top: 10px;
          }

          .an-gate__story {
            padding: 12px 15px;
          }

          .an-gate__story-body {
            min-height: 74px;
          }

          .an-gate__footer {
            padding-top: 10px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-gate__video {
            display: none !important;
          }

          .an-gate__cosmos *,
          .an-gate__status-dot,
          .an-gate__intro,
          .an-gate__story,
          .an-gate__story-content,
          .an-gate__actions {
            animation: none !important;
          }

          .an-gate__intro,
          .an-gate__story,
          .an-gate__story-content,
          .an-gate__actions {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }

          .an-gate__video,
          .an-gate__enter,
          .an-gate__external,
          .an-gate__story-step {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}