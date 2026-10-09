"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AEVUM
   THE CONTINUUM OF INQUIRY

   HOME PORTAL — COMPLETE REPLACEMENT

   DESIGN:
   - Monochrome kinetic armillary
   - Asymmetric three-dimensional orbital sculpture
   - Precision silver contours
   - Persistent luminous inquiry core
   - Five intellectual domains
   - Subtle independent orbital motion

   PRESERVE:
   - HOME single-glass ownership by globals.css
   - Existing typography and layout
   - Valley-matched object footprint
   - Mobile proportions
   - Fullscreen transition
   - /continuity navigation

   NO:
   - Secondary rectangular glass
   - Blue tint
   - Canvas or WebGL dependency
   - External assets
========================================================== */

const AEVUM_ROUTE = "/continuity";

const TRANSITION_DURATION = 1150;
const REDUCED_TRANSITION_DURATION = 120;

const ORBIT_PATHS = [
  {
    id: "alpha",
    className: "an-aevum-portal__sculpture-orbit--alpha",
  },
  {
    id: "beta",
    className: "an-aevum-portal__sculpture-orbit--beta",
  },
  {
    id: "gamma",
    className: "an-aevum-portal__sculpture-orbit--gamma",
  },
  {
    id: "delta",
    className: "an-aevum-portal__sculpture-orbit--delta",
  },
] as const;

export default function ContinuityHomePortal() {
  const router = useRouter();

  const transitionTimerRef = useRef<number | null>(null);
  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const enterAevum = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      router.push(AEVUM_ROUTE);
    }, reducedMotion
      ? REDUCED_TRANSITION_DURATION
      : TRANSITION_DURATION);
  }, [router]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, []);

  const transition = (
    <div
      className={[
        "an-aevum-transition",
        entering ? "an-aevum-transition--active" : "",
      ].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="an-aevum-transition__space" />
      <div className="an-aevum-transition__stars" />

      <div className="an-aevum-transition__field">
        <span />
        <span />
        <span />
      </div>

      <div className="an-aevum-transition__axis" />

      <div className="an-aevum-transition__core">
        <span className="an-aevum-transition__shell" />
        <span className="an-aevum-transition__center" />
      </div>

      <div className="an-aevum-transition__copy">
        <span>AEVUM</span>
        <small>Where inquiry endures.</small>
      </div>
    </div>
  );

  return (
    <>
      <section
        className={[
          "an-aevum-portal",
          entering ? "an-aevum-portal--entering" : "",
        ].filter(Boolean).join(" ")}
        aria-labelledby="an-aevum-title"
      >
        <div className="an-aevum-portal__canvas">

          {/* ATMOSPHERE — PRESERVED */}

          <div
            className="an-aevum-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="an-aevum-portal__stars"
            aria-hidden="true"
          />

          <div
            className="an-aevum-portal__reflection"
            aria-hidden="true"
          />

          {/* IDENTITY — PRESERVED */}

          <header className="an-aevum-portal__top">
            <div className="an-aevum-portal__identity">
              <span id="an-aevum-title">
                ARCHENOVA AEVUM
              </span>

              <small>INTELLECTUAL CONTINUITY</small>
            </div>
          </header>

          {/* CENTRAL EXPERIENCE — PRESERVED */}

          <div className="an-aevum-portal__experience">

            <div className="an-aevum-portal__statement">
              <span className="an-aevum-portal__eyebrow">
                THE CONTINUITY OF INQUIRY
              </span>

              <h2>Where inquiry endures.</h2>

              <p>
                Knowledge evolves. Questions remain open.
                <br />
                Inquiry continues beyond any single mind.
              </p>
            </div>

            {/* REFINED AEVUM ENTRY OBJECT */}

            <button
              type="button"
              className="an-aevum-portal__object-button"
              onClick={enterAevum}
              disabled={entering}
              aria-label="Enter ArcheNova Aevum"
            >
              <span
                className="an-aevum-portal__object"
                aria-hidden="true"
              >
                {/* AMBIENT DEPTH */}

                <span className="an-aevum-portal__void" />
                <span className="an-aevum-portal__aura" />
                <span className="an-aevum-portal__dust" />

                {/* INQUIRY FIELD */}

                <span className="an-aevum-portal__time-field">
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--1" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--2" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--3" />
                </span>

                {/* PRECISION ARMILLARY SCULPTURE */}

                <span className="an-aevum-portal__sculpture">

                  <span className="an-aevum-portal__sculpture-shadow" />

                  <span className="an-aevum-portal__sculpture-corona" />

                  <span className="an-aevum-portal__sculpture-meridian an-aevum-portal__sculpture-meridian--outer" />

                  <span className="an-aevum-portal__sculpture-meridian an-aevum-portal__sculpture-meridian--inner" />

                  <span className="an-aevum-portal__sculpture-equator" />

                  <span className="an-aevum-portal__sculpture-equator-glint" />

                  {/* INDEPENDENT ORBITAL ASSEMBLIES */}

                  {ORBIT_PATHS.map((orbit) => (
                    <span
                      key={orbit.id}
                      className={[
                        "an-aevum-portal__sculpture-orbit",
                        orbit.className,
                      ].join(" ")}
                    >
                      <span className="an-aevum-portal__sculpture-orbit-track" />
                      <span className="an-aevum-portal__sculpture-orbit-highlight" />
                      <span className="an-aevum-portal__sculpture-orbit-node" />
                    </span>
                  ))}

                  {/* CROSS-AXIS PRECISION */}

                  <span className="an-aevum-portal__sculpture-spine" />

                  <span className="an-aevum-portal__sculpture-spine-node an-aevum-portal__sculpture-spine-node--top" />

                  <span className="an-aevum-portal__sculpture-spine-node an-aevum-portal__sculpture-spine-node--bottom" />

                  {/* INNER REASONING CHAMBER */}

                  <span className="an-aevum-portal__sculpture-chamber">

                    <span className="an-aevum-portal__sculpture-chamber-shell" />

                    <span className="an-aevum-portal__sculpture-chamber-ring an-aevum-portal__sculpture-chamber-ring--one" />

                    <span className="an-aevum-portal__sculpture-chamber-ring an-aevum-portal__sculpture-chamber-ring--two" />

                    <span className="an-aevum-portal__sculpture-chamber-ring an-aevum-portal__sculpture-chamber-ring--three" />

                    {/* PERSISTENT INQUIRY */}

                    <span className="an-aevum-portal__sculpture-core">

                      <span className="an-aevum-portal__sculpture-core-shell" />

                      <span className="an-aevum-portal__sculpture-core-inner" />

                      <span className="an-aevum-portal__sculpture-core-light" />

                    </span>

                    <span className="an-aevum-portal__sculpture-pulse an-aevum-portal__sculpture-pulse--one" />

                    <span className="an-aevum-portal__sculpture-pulse an-aevum-portal__sculpture-pulse--two" />

                  </span>

                  {/* INTERDEPENDENT KNOWLEDGE SIGNALS */}

                  <span className="an-aevum-portal__sculpture-signal an-aevum-portal__sculpture-signal--one" />

                  <span className="an-aevum-portal__sculpture-signal an-aevum-portal__sculpture-signal--two" />

                  <span className="an-aevum-portal__sculpture-signal an-aevum-portal__sculpture-signal--three" />

                </span>

                {/* FIVE INTELLECTUAL DOMAINS */}

                <span className="an-aevum-portal__domain an-aevum-portal__domain--question">
                  <i />
                  <span>QUESTION</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--evidence">
                  <i />
                  <span>EVIDENCE</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--reasoning">
                  <i />
                  <span>REASONING</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--knowledge">
                  <i />
                  <span>KNOWLEDGE</span>
                </span>

                <span className="an-aevum-portal__domain an-aevum-portal__domain--purpose">
                  <i />
                  <span>PURPOSE</span>
                </span>

                {/* PERSISTENCE AXIS */}

                <span className="an-aevum-portal__axis">
                  <span className="an-aevum-portal__axis-line" />
                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--1" />
                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--2" />
                </span>

                {/* HORIZON */}

                <span className="an-aevum-portal__horizon">
                  <span className="an-aevum-portal__horizon-ring" />
                  <span className="an-aevum-portal__horizon-light" />
                </span>

                {/* BOUNDARIES */}

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--origin">
                  ORIGIN
                </span>

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--continuity">
                  CONTINUITY
                </span>

                {/* ENTRY */}

                <span className="an-aevum-portal__tap">
                  Explore Aevum <span aria-hidden="true">↗</span>
                </span>

              </span>
            </button>

          </div>

          {/* FOOTER — PRESERVED */}

          <footer className="an-aevum-portal__footer">
            <span>ARCHENOVA AEVUM</span>
            <i />
            <small>
              QUESTION · EVIDENCE · REASONING · CONTINUITY
            </small>
          </footer>

        </div>
      </section>

      {mounted && createPortal(transition, document.body)}

      <style jsx global>{`

        /* ==================================================
           01. BOX MODEL
        ================================================== */

        .an-aevum-portal,
        .an-aevum-portal *,
        .an-aevum-portal *::before,
        .an-aevum-portal *::after,
        .an-aevum-transition,
        .an-aevum-transition *,
        .an-aevum-transition *::before,
        .an-aevum-transition *::after {
          box-sizing: border-box;
        }

        /* ==================================================
           02. SINGLE HOME GLASS

           globals.css owns the section surface.

           No new rectangular glass layers.
        ================================================== */

        #archenova-continuity .an-home-2026__glass,
        #archenova-continuity .an-aevum-portal,
        #archenova-continuity .an-aevum-portal__canvas,
        #archenova-continuity .an-aevum-portal__top,
        #archenova-continuity .an-aevum-portal__experience,
        #archenova-continuity .an-aevum-portal__statement,
        #archenova-continuity .an-aevum-portal__footer,
        #archenova-continuity .an-aevum-portal__object-button {
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }

        #archenova-continuity .an-home-2026__glass,
        #archenova-continuity .an-aevum-portal,
        #archenova-continuity .an-aevum-portal__canvas,
        #archenova-continuity .an-aevum-portal__top,
        #archenova-continuity .an-aevum-portal__experience,
        #archenova-continuity .an-aevum-portal__statement,
        #archenova-continuity .an-aevum-portal__object-button {
          border: 0 !important;
        }

        #archenova-continuity .an-home-2026__glass::before,
        #archenova-continuity .an-home-2026__glass::after,
        #archenova-continuity .an-aevum-portal::before,
        #archenova-continuity .an-aevum-portal::after,
        #archenova-continuity .an-aevum-portal__canvas::before,
        #archenova-continuity .an-aevum-portal__canvas::after {
          content: none !important;
          display: none !important;
        }

        /* ==================================================
           03. ROOT
        ================================================== */

        .an-aevum-portal {
          position: relative;
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;
          padding: 0;

          overflow: hidden;

          color: rgba(248, 249, 250, 0.94);

          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }

        /* ==================================================
           04. CANVAS — EXISTING GEOMETRY
        ================================================== */

        .an-aevum-portal__canvas {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          align-items: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height: clamp(560px, 58vw, 700px);

          margin: 0 auto;
          padding: clamp(25px, 4vw, 50px);

          overflow: hidden;

          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;

          transition:
            opacity 0.55s ease,
            transform 0.75s cubic-bezier(0.16, 0.78, 0.22, 1),
            filter 0.55s ease;
        }

        /* ==================================================
           05. ATMOSPHERE — PRESERVED
        ================================================== */

        .an-aevum-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 64%,
              rgba(255, 255, 255, 0.025),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 50% 30%,
              rgba(255, 255, 255, 0.012),
              transparent 34%
            );
        }

        .an-aevum-portal__stars {
          position: absolute;
          inset: 0;
          z-index: -2;

          pointer-events: none;
          opacity: 0.18;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.36) 0 0.42px,
              transparent 0.72px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.16) 0 0.32px,
              transparent 0.62px
            );

          background-size:
            73px 73px,
            119px 119px;

          background-position:
            0 0,
            41px 29px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at 50% 58%,
              black,
              transparent 86%
            );

          mask-image:
            radial-gradient(
              ellipse at 50% 58%,
              black,
              transparent 86%
            );
        }

        .an-aevum-portal__reflection {
          position: absolute;
          z-index: -1;

          top: -28%;
          left: -12%;

          width: 62%;
          height: 64%;

          pointer-events: none;

          transform: rotate(-17deg);

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(255, 255, 255, 0.012),
              transparent
            );

          filter: blur(30px);
        }

        /* ==================================================
           06. IDENTITY — PRESERVED
        ================================================== */

        .an-aevum-portal__top {
          position: relative;
          z-index: 20;

          display: flex;
          align-items: flex-start;
          justify-content: center;

          width: 100%;
          min-width: 0;
        }

        .an-aevum-portal__identity {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 7px;
          text-align: center;
        }

        .an-aevum-portal__identity > span {
          color: rgba(255, 255, 255, 0.82);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.24em;
          white-space: nowrap;
        }

        .an-aevum-portal__identity > small {
          color: rgba(255, 255, 255, 0.24);

          font-size: 6px;
          letter-spacing: 0.14em;
          white-space: nowrap;
        }

        /* ==================================================
           07. EXPERIENCE — PRESERVED
        ================================================== */

        .an-aevum-portal__experience {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;
          align-self: center;

          width: 100%;
          min-width: 0;

          padding:
            clamp(26px, 4vw, 44px)
            0
            clamp(18px, 3vw, 30px);

          overflow: visible;
        }

        /* ==================================================
           08. STATEMENT — PRESERVED
        ================================================== */

        .an-aevum-portal__statement {
          position: relative;
          z-index: 30;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          max-width: 820px;

          margin: 0;
          padding: 0;

          text-align: center;
          pointer-events: none;
        }

        .an-aevum-portal__eyebrow {
          color: rgba(255, 255, 255, 0.22);

          font-size: 6px;
          font-weight: 600;
          letter-spacing: 0.21em;
        }

        .an-aevum-portal__statement h2 {
          width: 100%;
          max-width: 820px;

          margin: 13px 0 0;

          color: rgba(250, 251, 252, 0.97);

          font-family: inherit;

          font-size: clamp(39px, 5.1vw, 70px);
          font-weight: 235;

          line-height: 0.95;
          letter-spacing: -0.058em;

          text-align: center;
          text-wrap: balance;
        }

        .an-aevum-portal__statement p {
          margin: 11px 0 0;

          color: rgba(233, 235, 238, 0.38);

          font-size: 8px;
          font-weight: 400;

          line-height: 1.65;
          letter-spacing: 0.015em;
        }

        /* ==================================================
           09. ENTRY BUTTON — PRESERVED
        ================================================== */

        .an-aevum-portal__object-button {
          position: relative;
          z-index: 10;

          display: block;

          width: min(100%, 590px);
          max-width: 100%;
          min-width: 0;

          margin:
            clamp(13px, 1.8vw, 21px)
            auto
            0;

          padding: 0;

          border: 0;
          outline: 0;

          background: transparent;
          box-shadow: none;

          color: inherit;
          font: inherit;

          cursor: pointer;

          appearance: none;
          -webkit-appearance: none;

          -webkit-tap-highlight-color: transparent;
        }

        .an-aevum-portal__object-button:disabled {
          cursor: default;
        }

        .an-aevum-portal__object-button:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, 0.35)
            !important;

          outline-offset: 8px;
          border-radius: 20px;
        }

        /* ==================================================
           10. OBJECT FOOTPRINT — PRESERVED

           Only the internal sculpture changes.
        ================================================== */

        .an-aevum-portal__object {
          position: relative;
          display: block;

          width: min(100%, 500px);
          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.3;

          margin: 0 auto;

          overflow: visible;

          background: transparent;
          border: 0;
          box-shadow: none;

          transform: translateZ(0);

          transition:
            transform 0.72s cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 0.45s ease,
            filter 0.55s ease;
        }

        /* ==================================================
           11. VOID / AURA / DUST
        ================================================== */

        .an-aevum-portal__void {
          position: absolute;
          z-index: 0;

          top: 6%;
          left: 50%;

          width: 100%;
          height: 88%;

          transform: translateX(-50%);

          background:
            radial-gradient(
              ellipse at 50% 45%,
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.017) 28%,
              rgba(0, 0, 0, 0.14) 53%,
              transparent 78%
            );

          filter: blur(18px);
          opacity: 0.9;
        }

        .an-aevum-portal__aura {
          position: absolute;
          z-index: 1;

          top: 13%;
          left: 50%;

          width: 76%;
          height: 75%;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(255, 255, 255, 0.085),
              rgba(255, 255, 255, 0.022) 38%,
              transparent 75%
            );

          filter: blur(25px);

          animation:
            an-aevum-breathe 12s ease-in-out infinite;
        }

        .an-aevum-portal__dust {
          position: absolute;
          z-index: 2;

          inset: 4% 3% 9%;

          opacity: 0.3;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.45) 0 0.4px,
              transparent 0.7px
            );

          background-size: 49px 49px;

          -webkit-mask-image:
            radial-gradient(
              ellipse,
              black,
              transparent 84%
            );

          mask-image:
            radial-gradient(
              ellipse,
              black,
              transparent 84%
            );
        }

        /* ==================================================
           12. TEMPORAL FIELD
        ================================================== */

        .an-aevum-portal__time-field {
          position: absolute;
          z-index: 3;

          inset: 6% 8% 9%;

          pointer-events: none;

          transform:
            perspective(900px)
            rotateX(12deg);
        }

        .an-aevum-portal__time-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          border:
            1px solid rgba(255, 255, 255, 0.075);

          border-radius: 50%;

          transform: translate(-50%, -50%);

          animation:
            an-aevum-time 15s ease-in-out infinite;
        }

        .an-aevum-portal__time-ring--1 {
          width: 98%;
          height: 98%;
          opacity: 0.5;
        }

        .an-aevum-portal__time-ring--2 {
          width: 78%;
          height: 78%;
          opacity: 0.6;
          animation-delay: -5s;
        }

        .an-aevum-portal__time-ring--3 {
          width: 57%;
          height: 57%;
          opacity: 0.7;
          animation-delay: -10s;
        }

        /* ==================================================
           13. SCULPTURE — CENTRAL ASSEMBLY

           Centered within the existing object.
           No new layout constraints.
        ================================================== */

        .an-aevum-portal__sculpture {
          position: absolute;
          z-index: 10;

          top: 45%;
          left: 50%;

          display: block;

          width: 72%;
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          transform-style: preserve-3d;
          perspective: 900px;

          pointer-events: none;
        }

        .an-aevum-portal__sculpture-shadow {
          position: absolute;
          inset: 4%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(0, 0, 0, 0.98) 0%,
              rgba(4, 5, 6, 0.94) 30%,
              rgba(0, 0, 0, 0.52) 56%,
              transparent 77%
            );

          filter: blur(17px);
        }

        .an-aevum-portal__sculpture-corona {
          position: absolute;
          inset: -16%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.11) 0%,
              rgba(255, 255, 255, 0.045) 22%,
              rgba(255, 255, 255, 0.008) 46%,
              transparent 69%
            );

          filter: blur(16px);

          animation:
            an-aevum-sculpture-corona 12s ease-in-out infinite;
        }

        /* ==================================================
           14. PRECISION MERIDIANS
        ================================================== */

        .an-aevum-portal__sculpture-meridian {
          position: absolute;

          top: 50%;
          left: 50%;

          border-radius: 50%;

          pointer-events: none;
        }

        .an-aevum-portal__sculpture-meridian--outer {
          width: 89%;
          height: 89%;

          border:
            1px solid rgba(244, 246, 248, 0.23);

          transform:
            translate(-50%, -50%)
            rotate(-17deg);

          box-shadow:
            inset 0 0 20px rgba(255, 255, 255, 0.014),
            0 0 20px rgba(255, 255, 255, 0.014);
        }

        .an-aevum-portal__sculpture-meridian--inner {
          width: 72%;
          height: 72%;

          border:
            1px solid rgba(255, 255, 255, 0.14);

          transform:
            translate(-50%, -50%)
            rotate(24deg);
        }

        .an-aevum-portal__sculpture-equator {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 110%;
          height: 33%;

          border:
            1px solid rgba(255, 255, 255, 0.25);

          border-radius: 50%;

          transform:
            translate(-50%, -50%)
            rotate(-18deg);

          box-shadow:
            0 0 14px rgba(255, 255, 255, 0.015);
        }

        .an-aevum-portal__sculpture-equator-glint {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 109%;
          height: 33%;

          border-top:
            1px solid rgba(255, 255, 255, 0.13);

          border-radius: 50%;

          transform:
            translate(-50%, -50%)
            rotate(-18deg);

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent 12%,
              black 38%,
              transparent 75%
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent 12%,
              black 38%,
              transparent 75%
            );
        }

        /* ==================================================
           15. ASYMMETRIC KINETIC ORBITS

           Four independent orbital planes.

           CSS-only animation.
        ================================================== */

        .an-aevum-portal__sculpture-orbit {
          position: absolute;

          top: 50%;
          left: 50%;

          display: block;

          width: 100%;
          height: 100%;

          transform-style: preserve-3d;
          pointer-events: none;
        }

        .an-aevum-portal__sculpture-orbit-track,
        .an-aevum-portal__sculpture-orbit-highlight {
          position: absolute;
          inset: 0;

          display: block;

          border-radius: 50%;
        }

        .an-aevum-portal__sculpture-orbit-track {
          border:
            1px solid rgba(235, 238, 242, 0.32);

          background:
            radial-gradient(
              ellipse at 24% 18%,
              rgba(255, 255, 255, 0.035),
              transparent 45%
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.045),
            0 0 11px rgba(255, 255, 255, 0.025);
        }

        .an-aevum-portal__sculpture-orbit-highlight {
          border-top:
            1px solid rgba(255, 255, 255, 0.45);

          border-left:
            1px solid rgba(255, 255, 255, 0.08);

          -webkit-mask-image:
            linear-gradient(
              130deg,
              transparent 12%,
              black 43%,
              transparent 80%
            );

          mask-image:
            linear-gradient(
              130deg,
              transparent 12%,
              black 43%,
              transparent 80%
            );
        }

        .an-aevum-portal__sculpture-orbit-node {
          position: absolute;

          top: -2px;
          left: 50%;

          width: 4px;
          height: 4px;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            rgba(247, 249, 251, 0.9);

          box-shadow:
            0 0 7px rgba(255, 255, 255, 0.45),
            0 0 18px rgba(255, 255, 255, 0.1);
        }

        .an-aevum-portal__sculpture-orbit--alpha {
          width: 94%;
          height: 94%;

          transform:
            translate(-50%, -50%)
            rotate(-31deg)
            rotateX(64deg);

          animation:
            an-aevum-orbit-alpha 34s linear infinite;
        }

        .an-aevum-portal__sculpture-orbit--beta {
          width: 92%;
          height: 92%;

          transform:
            translate(-50%, -50%)
            rotate(38deg)
            rotateY(67deg);

          animation:
            an-aevum-orbit-beta 41s linear infinite reverse;
        }

        .an-aevum-portal__sculpture-orbit--gamma {
          width: 104%;
          height: 104%;

          transform:
            translate(-50%, -50%)
            rotate(47deg)
            rotateX(75deg);

          animation:
            an-aevum-orbit-gamma 47s linear infinite;
        }

        .an-aevum-portal__sculpture-orbit--delta {
          width: 81%;
          height: 81%;

          transform:
            translate(-50%, -50%)
            rotate(-54deg)
            rotateY(56deg);

          animation:
            an-aevum-orbit-delta 39s linear infinite reverse;
        }

        .an-aevum-portal__sculpture-orbit--beta
        .an-aevum-portal__sculpture-orbit-track {
          border-color:
            rgba(255, 255, 255, 0.23);
        }

        .an-aevum-portal__sculpture-orbit--gamma
        .an-aevum-portal__sculpture-orbit-track {
          border-color:
            rgba(255, 255, 255, 0.17);
        }

        .an-aevum-portal__sculpture-orbit--delta
        .an-aevum-portal__sculpture-orbit-track {
          border-color:
            rgba(255, 255, 255, 0.27);
        }

        /* ==================================================
           16. AXIAL PRECISION
        ================================================== */

        .an-aevum-portal__sculpture-spine {
          position: absolute;
          z-index: 12;

          top: 5%;
          bottom: 5%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(255, 255, 255, 0.16) 18%,
              rgba(255, 255, 255, 0.35) 50%,
              rgba(255, 255, 255, 0.16) 82%,
              transparent
            );
        }

        .an-aevum-portal__sculpture-spine-node {
          position: absolute;
          z-index: 14;

          left: 50%;

          width: 4px;
          height: 4px;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.62);

          box-shadow:
            0 0 8px rgba(255, 255, 255, 0.15);
        }

        .an-aevum-portal__sculpture-spine-node--top {
          top: 6%;
        }

        .an-aevum-portal__sculpture-spine-node--bottom {
          bottom: 6%;
          opacity: 0.55;
        }

        /* ==================================================
           17. INNER REASONING CHAMBER
        ================================================== */

        .an-aevum-portal__sculpture-chamber {
          position: absolute;
          z-index: 15;

          top: 50%;
          left: 50%;

          display: block;

          width: 46%;
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          pointer-events: none;
        }

        .an-aevum-portal__sculpture-chamber-shell {
          position: absolute;
          inset: 0;

          border:
            1px solid rgba(255, 255, 255, 0.31);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 34% 24%,
              rgba(255, 255, 255, 0.16),
              rgba(255, 255, 255, 0.035) 24%,
              rgba(12, 13, 16, 0.76) 53%,
              rgba(1, 2, 3, 0.97) 82%
            );

          box-shadow:
            inset 0 0 27px rgba(255, 255, 255, 0.045),
            inset -14px -16px 28px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(255, 255, 255, 0.035);
        }

        .an-aevum-portal__sculpture-chamber-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          border-radius: 50%;

          pointer-events: none;
        }

        .an-aevum-portal__sculpture-chamber-ring--one {
          width: 112%;
          height: 33%;

          border:
            1px solid rgba(255, 255, 255, 0.35);

          transform:
            translate(-50%, -50%)
            rotate(-29deg);
        }

        .an-aevum-portal__sculpture-chamber-ring--two {
          width: 110%;
          height: 33%;

          border:
            1px solid rgba(255, 255, 255, 0.22);

          transform:
            translate(-50%, -50%)
            rotate(47deg);
        }

        .an-aevum-portal__sculpture-chamber-ring--three {
          width: 82%;
          height: 82%;

          border:
            1px solid rgba(255, 255, 255, 0.22);

          transform:
            translate(-50%, -50%)
            rotateX(63deg)
            rotate(-13deg);
        }

        /* ==================================================
           18. PERSISTENT INQUIRY CORE
        ================================================== */

        .an-aevum-portal__sculpture-core {
          position: absolute;
          z-index: 20;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: 41%;
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          animation:
            an-aevum-sculpture-core 10s ease-in-out infinite;
        }

        .an-aevum-portal__sculpture-core-shell {
          position: absolute;
          inset: 0;

          border:
            1px solid rgba(255, 255, 255, 0.55);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 31% 24%,
              rgba(255, 255, 255, 0.37),
              rgba(110, 115, 122, 0.34) 25%,
              rgba(11, 13, 16, 0.97) 70%,
              #010102 100%
            );

          box-shadow:
            inset 0 0 14px rgba(255, 255, 255, 0.11),
            inset -8px -10px 14px rgba(0, 0, 0, 0.6),
            0 0 18px rgba(255, 255, 255, 0.12);
        }

        .an-aevum-portal__sculpture-core-inner {
          position: absolute;

          width: 62%;
          aspect-ratio: 1;

          border:
            1px solid rgba(255, 255, 255, 0.14);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.12),
              transparent 74%
            );
        }

        .an-aevum-portal__sculpture-core-light {
          position: relative;
          z-index: 3;

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.98);

          box-shadow:
            0 0 8px rgba(255, 255, 255, 0.72),
            0 0 22px rgba(255, 255, 255, 0.35),
            0 0 48px rgba(255, 255, 255, 0.1);
        }

        .an-aevum-portal__sculpture-pulse {
          position: absolute;
          z-index: 18;

          top: 50%;
          left: 50%;

          width: 41%;
          aspect-ratio: 1;

          border:
            1px solid rgba(255, 255, 255, 0.24);

          border-radius: 50%;

          opacity: 0;

          animation:
            an-aevum-sculpture-pulse 12s ease-out infinite;
        }

        .an-aevum-portal__sculpture-pulse--two {
          animation-delay: -6s;
        }

        /* ==================================================
           19. KNOWLEDGE SIGNALS
        ================================================== */

        .an-aevum-portal__sculpture-signal {
          position: absolute;
          z-index: 19;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.78);

          box-shadow:
            0 0 9px rgba(255, 255, 255, 0.3);

          animation:
            an-aevum-sculpture-signal 9s ease-in-out infinite;
        }

        .an-aevum-portal__sculpture-signal--one {
          top: 17%;
          left: 33%;
        }

        .an-aevum-portal__sculpture-signal--two {
          top: 40%;
          right: 7%;

          animation-delay: -3s;
        }

        .an-aevum-portal__sculpture-signal--three {
          bottom: 17%;
          left: 23%;

          animation-delay: -6s;
        }

        /* ==================================================
           20. FIVE INTELLECTUAL DOMAINS

           Existing positions and sizing preserved.
        ================================================== */

        .an-aevum-portal__domain {
          position: absolute;
          z-index: 20;

          display: flex;
          align-items: center;

          gap: 5px;

          color: rgba(255, 255, 255, 0.3);

          font-size: 4px;
          font-weight: 620;

          letter-spacing: 0.11em;
          white-space: nowrap;

          pointer-events: none;
        }

        .an-aevum-portal__domain i {
          display: block;

          width: 5px;
          height: 5px;

          border:
            1px solid rgba(255, 255, 255, 0.32);

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.08);

          box-shadow:
            0 0 9px rgba(255, 255, 255, 0.08);

          animation:
            an-aevum-node 10s ease-in-out infinite;
        }

        .an-aevum-portal__domain--question {
          top: 29%;
          left: 8%;
        }

        .an-aevum-portal__domain--evidence {
          top: 52%;
          left: 10%;
        }

        .an-aevum-portal__domain--reasoning {
          top: 29%;
          right: 7%;
        }

        .an-aevum-portal__domain--knowledge {
          top: 52%;
          right: 8%;
        }

        .an-aevum-portal__domain--purpose {
          top: 75%;
          left: 50%;

          transform: translateX(-50%);
        }

        .an-aevum-portal__domain--evidence i {
          animation-delay: -2s;
        }

        .an-aevum-portal__domain--reasoning i {
          animation-delay: -4s;
        }

        .an-aevum-portal__domain--knowledge i {
          animation-delay: -6s;
        }

        .an-aevum-portal__domain--purpose i {
          animation-delay: -8s;
        }

        /* ==================================================
           21. PERSISTENCE AXIS — PRESERVED
        ================================================== */

        .an-aevum-portal__axis {
          position: absolute;
          z-index: 11;

          top: 46%;
          bottom: 9%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          pointer-events: none;
        }

        .an-aevum-portal__axis-line {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.4),
              rgba(255, 255, 255, 0.14) 38%,
              transparent
            );

          box-shadow:
            0 0 12px rgba(255, 255, 255, 0.08);
        }

        .an-aevum-portal__axis-signal {
          position: absolute;

          top: 0;
          left: 50%;

          width: 3px;
          height: 3px;

          transform: translateX(-50%);

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.9);

          box-shadow:
            0 0 10px rgba(255, 255, 255, 0.3);

          opacity: 0;
        }

        .an-aevum-portal__axis-signal--1 {
          animation:
            an-aevum-axis 9s ease-in-out infinite;
        }

        .an-aevum-portal__axis-signal--2 {
          animation:
            an-aevum-axis 9s ease-in-out infinite -4.5s;
        }

        /* ==================================================
           22. HORIZON — PRESERVED
        ================================================== */

        .an-aevum-portal__horizon {
          position: absolute;
          z-index: 8;

          left: 50%;
          bottom: 9%;

          width: 77%;
          height: 17%;

          transform: translateX(-50%);

          pointer-events: none;
        }

        .an-aevum-portal__horizon-ring {
          position: absolute;
          inset: 0;

          border:
            1px solid rgba(255, 255, 255, 0.12);

          border-radius: 50%;

          transform:
            perspective(350px)
            rotateX(68deg);
        }

        .an-aevum-portal__horizon-light {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 43%;
          height: 55%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(255, 255, 255, 0.1),
              transparent 74%
            );

          filter: blur(12px);
        }

        /* ==================================================
           23. BOUNDARIES — PRESERVED
        ================================================== */

        .an-aevum-portal__boundary {
          position: absolute;
          z-index: 20;

          bottom: 10%;

          color: rgba(255, 255, 255, 0.14);

          font-size: 4px;
          font-weight: 600;

          letter-spacing: 0.16em;

          pointer-events: none;
        }

        .an-aevum-portal__boundary--origin {
          left: 5%;
        }

        .an-aevum-portal__boundary--continuity {
          right: 5%;
        }

        /* ==================================================
           24. ENTRY LABEL — PRESERVED
        ================================================== */

        .an-aevum-portal__tap {
          position: absolute;
          z-index: 30;

          bottom: 0;
          left: 50%;

          max-width: calc(100% - 16px);

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.26);

          font-size: 7px;
          font-weight: 500;

          letter-spacing: 0.12em;
          white-space: nowrap;

          transition:
            color 0.4s ease,
            transform 0.4s ease;
        }

        /* ==================================================
           25. FOOTER — PRESERVED
        ================================================== */

        .an-aevum-portal__footer {
          position: relative;
          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(9px, 1.4vw, 16px);

          width: 100%;
          padding-top: 18px;

          border-top:
            1px solid rgba(255, 255, 255, 0.035)
            !important;

          color: rgba(255, 255, 255, 0.2);

          text-align: center;

          transition: opacity 0.45s ease;
        }

        .an-aevum-portal__footer > span {
          font-size: 5px;
          font-weight: 610;

          letter-spacing: 0.15em;
          white-space: nowrap;
        }

        .an-aevum-portal__footer > i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.14);
        }

        .an-aevum-portal__footer > small {
          color: rgba(255, 255, 255, 0.16);

          font-size: 5px;
          letter-spacing: 0.11em;
        }

        /* ==================================================
           26. ENTERING — PRESERVED
        ================================================== */

        .an-aevum-portal--entering
        .an-aevum-portal__object {
          transform: scale(0.82);
          opacity: 0.12;
          filter: brightness(0.4) blur(2px);
        }

        .an-aevum-portal--entering
        .an-aevum-portal__canvas {
          opacity: 0;
          transform: scale(0.98);
          filter: blur(7px);
        }

        .an-aevum-portal--entering
        .an-aevum-portal__footer {
          opacity: 0;
        }

        /* ==================================================
           27. ANIMATIONS — EXISTING
        ================================================== */

        @keyframes an-aevum-breathe {
          0%, 100% {
            opacity: 0.36;
            transform: translateX(-50%) scale(0.94);
          }

          50% {
            opacity: 0.76;
            transform: translateX(-50%) scale(1.07);
          }
        }

        @keyframes an-aevum-time {
          0%, 100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.75;
          }
        }

        @keyframes an-aevum-node {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.16);
          }
        }

        @keyframes an-aevum-axis {
          0% {
            top: 0;
            opacity: 0;
          }

          15% {
            opacity: 0.85;
          }

          75% {
            opacity: 0.4;
          }

          100% {
            top: 94%;
            opacity: 0;
          }
        }

        /* ==================================================
           28. ANIMATIONS — NEW SCULPTURE
        ================================================== */

        @keyframes an-aevum-sculpture-corona {
          0%, 100% {
            opacity: 0.38;
            transform: scale(0.94);
          }

          50% {
            opacity: 0.78;
            transform: scale(1.07);
          }
        }

        @keyframes an-aevum-orbit-alpha {
          from {
            transform:
              translate(-50%, -50%)
              rotate(-31deg)
              rotateX(64deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(-31deg)
              rotateX(64deg)
              rotateZ(360deg);
          }
        }

        @keyframes an-aevum-orbit-beta {
          from {
            transform:
              translate(-50%, -50%)
              rotate(38deg)
              rotateY(67deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(38deg)
              rotateY(67deg)
              rotateZ(360deg);
          }
        }

        @keyframes an-aevum-orbit-gamma {
          from {
            transform:
              translate(-50%, -50%)
              rotate(47deg)
              rotateX(75deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(47deg)
              rotateX(75deg)
              rotateZ(360deg);
          }
        }

        @keyframes an-aevum-orbit-delta {
          from {
            transform:
              translate(-50%, -50%)
              rotate(-54deg)
              rotateY(56deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(-54deg)
              rotateY(56deg)
              rotateZ(360deg);
          }
        }

        @keyframes an-aevum-sculpture-core {
          0%, 100% {
            filter: brightness(0.86);
          }

          50% {
            filter: brightness(1.24);
          }
        }

        @keyframes an-aevum-sculpture-pulse {
          0% {
            opacity: 0.45;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          70%, 100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(4.1);
          }
        }

        @keyframes an-aevum-sculpture-signal {
          0%, 100% {
            opacity: 0.22;
            transform: scale(0.75);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.3);
          }
        }

        /* ==================================================
           29. HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__object {
            transform: scale(1.02);
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__sculpture-core-shell {
            border-color:
              rgba(255, 255, 255, 0.78);
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__sculpture-orbit-track {
            border-color:
              rgba(255, 255, 255, 0.42);
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__tap {
            color: rgba(255, 255, 255, 0.5);

            transform:
              translateX(-50%)
              translateY(-2px);
          }

        }

        /* ==================================================
           30. MOBILE — EXISTING PROPORTIONS
        ================================================== */

        @media (max-width: 700px) {

          .an-aevum-portal {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding: 0;
            overflow: hidden;
          }

          .an-aevum-portal__canvas {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            min-height: 0;

            height:
              min(
                690px,
                calc(100svh - 42px)
              );

            max-height: 690px;

            padding: 20px 18px 17px;
            overflow: hidden;
          }

          .an-aevum-portal__identity > span {
            font-size: 7px;
            letter-spacing: 0.2em;
          }

          .an-aevum-portal__identity > small {
            margin-top: -1px;

            font-size: 4.5px;
            letter-spacing: 0.1em;
          }

          .an-aevum-portal__experience {
            min-height: 0;
            padding: 16px 0 10px;
            overflow: visible;
          }

          .an-aevum-portal__eyebrow {
            font-size: 5px;
            letter-spacing: 0.18em;
          }

          .an-aevum-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            padding: 0 4px;
            margin-top: 8px;

            font-size: clamp(34px, 10.3vw, 48px);

            line-height: 0.96;
            letter-spacing: -0.052em;
          }

          .an-aevum-portal__statement p {
            margin-top: 9px;

            font-size: 6px;
            line-height: 1.55;
          }

          .an-aevum-portal__object-button {
            width: min(100%, 390px);
            max-width: 100%;
            margin-top: 5px;
          }

          .an-aevum-portal__object {
            width: min(100%, 340px);
            max-width: 100%;
            aspect-ratio: 1.22;
          }

          .an-aevum-portal__domain {
            font-size: 3.4px;
            gap: 4px;
          }

          .an-aevum-portal__domain i {
            width: 4px;
            height: 4px;
          }

          .an-aevum-portal__boundary {
            font-size: 3.3px;
          }

          .an-aevum-portal__tap {
            max-width: calc(100% - 16px);

            overflow: hidden;
            text-overflow: ellipsis;

            font-size: 5.5px;
            letter-spacing: 0.1em;
          }

          .an-aevum-portal__footer {
            gap: 8px;
            padding-top: 13px;
            overflow: hidden;
          }

          .an-aevum-portal__footer > span {
            font-size: 4.5px;
            letter-spacing: 0.12em;
          }

          .an-aevum-portal__footer > small {
            display: none;
          }

          /* Only sculpture internals adapt. */

          .an-aevum-portal__sculpture {
            width: 76%;
          }

          .an-aevum-portal__sculpture-orbit-node {
            width: 3px;
            height: 3px;
          }

          .an-aevum-portal__sculpture-core-light {
            width: 5px;
            height: 5px;
          }

        }

        /* ==================================================
           31. SHORT MOBILE
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {

          .an-aevum-portal__canvas {
            height: calc(100svh - 30px);
            padding: 17px 17px 14px;
          }

          .an-aevum-portal__experience {
            padding: 9px 0 6px;
          }

          .an-aevum-portal__statement h2 {
            font-size: clamp(31px, 9.3vw, 42px);
          }

          .an-aevum-portal__object-button {
            margin-top: 0;
          }

          .an-aevum-portal__object {
            width: min(100%, 292px);
          }

          .an-aevum-portal__footer {
            padding-top: 10px;
          }

        }

        /* ==================================================
           32. SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {

          .an-aevum-portal__canvas {
            padding: 18px 15px 15px;
          }

          .an-aevum-portal__identity > span {
            font-size: 6.5px;
          }

          .an-aevum-portal__identity > small {
            font-size: 4px;
          }

          .an-aevum-portal__statement h2 {
            font-size: clamp(32px, 10.1vw, 43px);
          }

          .an-aevum-portal__object {
            width: min(100%, 302px);
          }

          .an-aevum-portal__domain > span {
            display: none;
          }

          .an-aevum-portal__domain i {
            width: 5px;
            height: 5px;
          }

          .an-aevum-portal__boundary {
            font-size: 3px;
          }

          .an-aevum-portal__tap {
            font-size: 5px;
          }

          .an-aevum-portal__footer > span {
            font-size: 4px;
          }

        }

        /* ==================================================
           33. VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {

          .an-aevum-portal__canvas {
            padding: 16px 13px 14px;
          }

          .an-aevum-portal__identity > small {
            display: none;
          }

          .an-aevum-portal__statement h2 {
            font-size: clamp(30px, 9.7vw, 38px);
          }

          .an-aevum-portal__object {
            width: min(100%, 275px);
          }

          .an-aevum-portal__boundary {
            display: none;
          }

          .an-aevum-portal__footer > i {
            display: none;
          }

        }

        /* ==================================================
           34. FULLSCREEN TRANSITION — PRESERVED
        ================================================== */

        .an-aevum-transition {
          position: fixed;
          inset: 0;
          z-index: 2147483000;

          display: grid;
          place-items: center;

          overflow: hidden;
          background: #000;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition:
            opacity 0.2s ease,
            visibility 0s linear 1.2s;
        }

        .an-aevum-transition--active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;

          transition: opacity 0.2s ease;
        }

        .an-aevum-transition__space {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              ellipse at 50% 45%,
              rgba(19, 20, 22, 0.99),
              rgba(3, 3, 4, 0.998) 48%,
              #000 84%
            );

          opacity: 0;
          transform: scale(1.05);

          transition:
            opacity 0.45s ease,
            transform 1.1s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__stars {
          position: absolute;
          inset: -8%;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.34) 0 0.5px,
              transparent 0.85px
            );

          background-size: 83px 83px;

          transform: scale(0.88);

          transition:
            opacity 0.42s ease,
            transform 1.1s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__field {
          position: absolute;
          inset: 0;

          display: grid;
          place-items: center;

          opacity: 0;
          transform: scale(0.5);

          transition:
            opacity 0.4s ease,
            transform 1.05s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__field > span {
          position: absolute;

          border:
            1px solid rgba(255, 255, 255, 0.09);

          border-radius: 50%;
        }

        .an-aevum-transition__field > span:nth-child(1) {
          width: min(78vw, 900px);
          aspect-ratio: 1;

          transform:
            rotateX(64deg)
            rotate(-18deg);
        }

        .an-aevum-transition__field > span:nth-child(2) {
          width: min(58vw, 680px);
          aspect-ratio: 1;

          transform:
            rotateY(62deg)
            rotate(24deg);
        }

        .an-aevum-transition__field > span:nth-child(3) {
          width: min(38vw, 460px);
          aspect-ratio: 1;
        }

        .an-aevum-transition__axis {
          position: absolute;
          z-index: 10;

          top: 12%;
          bottom: 12%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );

          opacity: 0;

          transition: opacity 0.35s ease 0.2s;
        }

        .an-aevum-transition__core {
          position: absolute;
          z-index: 15;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: min(38vw, 350px);
          aspect-ratio: 1;

          transform:
            translate(-50%, -50%)
            scale(0.45);

          opacity: 0;

          transition:
            opacity 0.35s ease,
            transform 1.08s cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-aevum-transition__shell {
          position: absolute;
          inset: 0;

          border:
            1px solid rgba(255, 255, 255, 0.24);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 40% 28%,
              rgba(255, 255, 255, 0.09),
              rgba(7, 8, 10, 0.86) 48%,
              rgba(0, 0, 0, 0.98) 82%
            );

          box-shadow:
            inset 0 0 45px rgba(255, 255, 255, 0.04),
            0 0 55px rgba(255, 255, 255, 0.035);
        }

        .an-aevum-transition__shell::after {
          content: "";

          position: absolute;

          top: 50%;
          left: -13%;

          width: 126%;
          height: 35%;

          border:
            1px solid rgba(255, 255, 255, 0.24);

          border-radius: 50%;

          transform:
            translateY(-50%)
            rotate(-27deg);
        }

        .an-aevum-transition__center {
          position: relative;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.94);

          box-shadow:
            0 0 14px rgba(255, 255, 255, 0.48),
            0 0 48px rgba(255, 255, 255, 0.14);
        }

        .an-aevum-transition__copy {
          position: absolute;
          z-index: 30;

          bottom: clamp(38px, 7vh, 76px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 9px;

          width: calc(100% - 32px);

          transform: translate(-50%, 8px);

          opacity: 0;
          text-align: center;

          transition:
            opacity 0.36s ease 0.34s,
            transform 0.5s ease 0.34s;
        }

        .an-aevum-transition__copy > span {
          color: rgba(248, 249, 250, 0.78);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(27px, 4vw, 46px);
          font-weight: 400;
          letter-spacing: 0.19em;
        }

        .an-aevum-transition__copy > small {
          color: rgba(225, 228, 231, 0.38);

          font-size: 9px;
          letter-spacing: 0.1em;
        }

        /* ==================================================
           35. ACTIVE TRANSITION — PRESERVED
        ================================================== */

        .an-aevum-transition--active
        .an-aevum-transition__space {
          opacity: 1;
          transform: scale(1);
        }

        .an-aevum-transition--active
        .an-aevum-transition__stars {
          opacity: 0.2;
          transform: scale(1.14);
        }

        .an-aevum-transition--active
        .an-aevum-transition__field {
          opacity: 0.8;
          transform: scale(1.16);
        }

        .an-aevum-transition--active
        .an-aevum-transition__axis {
          opacity: 0.75;
        }

        .an-aevum-transition--active
        .an-aevum-transition__core {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1.45);
        }

        .an-aevum-transition--active
        .an-aevum-transition__copy {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* ==================================================
           36. MOBILE TRANSITION — PRESERVED
        ================================================== */

        @media (max-width: 700px) {

          .an-aevum-transition__core {
            width: min(58vw, 290px);
          }

          .an-aevum-transition__field > span:nth-child(1) {
            width: 112vw;
          }

          .an-aevum-transition__field > span:nth-child(2) {
            width: 86vw;
          }

          .an-aevum-transition__field > span:nth-child(3) {
            width: 58vw;
          }

        }

        /* ==================================================
           37. REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {

          .an-aevum-portal__aura,
          .an-aevum-portal__time-ring,
          .an-aevum-portal__domain i,
          .an-aevum-portal__axis-signal,
          .an-aevum-portal__sculpture-corona,
          .an-aevum-portal__sculpture-orbit,
          .an-aevum-portal__sculpture-core,
          .an-aevum-portal__sculpture-pulse,
          .an-aevum-portal__sculpture-signal {
            animation: none !important;
          }

          .an-aevum-portal__object,
          .an-aevum-portal__canvas,
          .an-aevum-transition,
          .an-aevum-transition__space,
          .an-aevum-transition__stars,
          .an-aevum-transition__field,
          .an-aevum-transition__core,
          .an-aevum-transition__copy {
            transition-duration: 0.12s !important;
            transition-delay: 0s !important;
          }

        }

      `}</style>
    </>
  );
}