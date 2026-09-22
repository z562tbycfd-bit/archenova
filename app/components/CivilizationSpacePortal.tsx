"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA
   CIVILIZATION SPACE PORTAL

   HOME ENVIRONMENT

   Civilization Space
   = Preserve · Understand · Experience

   ArcheNova Valley
   = Implement · Deploy · Learn

   HOME VISUAL GRAMMAR

   Identity
   → Status
   → Statement
   → Singular Entrance
   → Environment

   IMPORTANT

   The HOME environment owns the Black Glass Surface.

   This component does NOT create another glass card.

   TRANSITION PRINCIPLE — REVISED

   The transition belongs to the internal HOME surface.

   It must remain inside the existing glass frame,
   including during ring expansion and on mobile.

   Civilization Space transition:

   Aperture
   → Archive
   → Intelligence
   → Experience
   → Civilization Space

   The existing visual architecture and class names
   are preserved.
========================================================== */

export default function CivilizationSpacePortal() {
  const router = useRouter();

  const transitionTimerRef = useRef<number | null>(null);

  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);

  /* ========================================================
     ENTER CIVILIZATION SPACE
  ======================================================== */

  const enterCivilizationSpace = useCallback(() => {
    if (enteringRef.current) {
      return;
    }

    enteringRef.current = true;
    setEntering(true);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    transitionTimerRef.current = window.setTimeout(() => {
      router.push("/civilization-space");
    }, reducedMotion ? 180 : 1350);
  }, [router]);

/* ========================================================
   CLEANUP
======================================================== */

useEffect(() => {
  return () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };
}, []);

  return (
    <div
      className={[
        "an-civilization-space-portal",
        entering
          ? "an-civilization-space-portal--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="an-civilization-space-title"
      aria-busy={entering}
    >
      {/* ==================================================
          INTERNAL CIVILIZATION FIELD

          Transparent only.
          HOME owns the Black Glass Surface.

          The transition is now a child of this surface,
          so its clipping boundary matches the HOME area.
      ================================================== */}

      <div className="an-civilization-space-portal__surface">
        <div
          className="an-civilization-space-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="an-civilization-space-portal__grid"
          aria-hidden="true"
        />

        <div
          className="an-civilization-space-portal__reflection"
          aria-hidden="true"
        />

        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="an-civilization-space-portal__header">
          <div className="an-civilization-space-portal__identity">
            <span className="an-civilization-space-portal__eyebrow">
              CIVILIZATION SPACE
            </span>

            <span className="an-civilization-space-portal__principle">
              PRESERVE · UNDERSTAND · EXPERIENCE
            </span>
          </div>
          
        </header>

        {/* ==================================================
            CENTRAL EXPERIENCE
        ================================================== */}

        <div className="an-civilization-space-portal__center">
          {/* ================================================
              STATEMENT
          ================================================= */}

          <div className="an-civilization-space-portal__statement">
        

            <h2 id="an-civilization-space-title">
              Civilization Space.
            </h2>


          </div>

          {/* ================================================
              CIVILIZATION APERTURE

              Existing visual structure is preserved.
          ================================================= */}

          <button
            type="button"
            className="an-civilization-space-portal__entrance"
            onClick={enterCivilizationSpace}
            disabled={entering}
            aria-label={
              entering
                ? "Entering Civilization Space"
                : "Enter Civilization Space"
            }
          >
            <span
              className="an-civilization-space-portal__aperture"
              aria-hidden="true"
            >
              {/* OUTER CONTINUITY FIELD */}

              <span className="an-civilization-space-portal__halo" />

              <span className="an-civilization-space-portal__orbit an-civilization-space-portal__orbit--outer" />

              <span className="an-civilization-space-portal__orbit an-civilization-space-portal__orbit--middle" />

              <span className="an-civilization-space-portal__orbit an-civilization-space-portal__orbit--inner" />

              {/* THREE CIVILIZATION DOMAINS */}

              <span className="an-civilization-space-portal__domain an-civilization-space-portal__domain--library">
                <i />
                <small>LIBRARY</small>
              </span>

              <span className="an-civilization-space-portal__domain an-civilization-space-portal__domain--intelligence">
                <i />
                <small>INTELLIGENCE</small>
              </span>

              <span className="an-civilization-space-portal__domain an-civilization-space-portal__domain--experience">
                <i />
                <small>EXPERIENCE</small>
              </span>

              {/* CONNECTION ARCHITECTURE */}

              <span className="an-civilization-space-portal__connection an-civilization-space-portal__connection--left" />

              <span className="an-civilization-space-portal__connection an-civilization-space-portal__connection--right" />

              <span className="an-civilization-space-portal__connection an-civilization-space-portal__connection--base" />

              {/* CENTRAL ARCHITECTURE */}

              <span className="an-civilization-space-portal__core">
                <span className="an-civilization-space-portal__core-ring" />

                <span className="an-civilization-space-portal__core-axis" />

                <span className="an-civilization-space-portal__core-level an-civilization-space-portal__core-level--one" />

                <span className="an-civilization-space-portal__core-level an-civilization-space-portal__core-level--two" />

                <span className="an-civilization-space-portal__core-level an-civilization-space-portal__core-level--three" />

                <span className="an-civilization-space-portal__core-node an-civilization-space-portal__core-node--one" />

                <span className="an-civilization-space-portal__core-node an-civilization-space-portal__core-node--two" />

                <span className="an-civilization-space-portal__core-node an-civilization-space-portal__core-node--three" />
              </span>

              {/* CONTINUITY SIGNAL */}

              <span className="an-civilization-space-portal__signal an-civilization-space-portal__signal--one" />

              <span className="an-civilization-space-portal__signal an-civilization-space-portal__signal--two" />

              <span className="an-civilization-space-portal__signal an-civilization-space-portal__signal--three" />
            </span>

            <span className="an-civilization-space-portal__enter-label">
              {entering
                ? "OPENING CIVILIZATION SPACE"
                : "ENTER CIVILIZATION SPACE"}
            </span>
          </button>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="an-civilization-space-portal__footer">
          <span>LIBRARY</span>

          <i aria-hidden="true" />

          <span>INTELLIGENCE</span>

          <i aria-hidden="true" />

          <span>EXPERIENCE</span>
        </footer>

        {/* ==================================================
            BOUNDED CIVILIZATION TRANSITION

            REVISED:
            - Inside __surface, not outside it.
            - position:absolute, not position:fixed.
            - inset:0 follows the existing HOME area.
            - overflow:hidden clips every animated layer.
            - Rings use bounded percentage-based geometry.
        ================================================== */}

        <div
          className="an-civilization-space-portal__transition"
          aria-hidden="true"
        >
          <div className="an-civilization-space-portal__transition-void" />

          <div className="an-civilization-space-portal__transition-grid" />

          <div className="an-civilization-space-portal__transition-field" />

          {/* EXPANDING APERTURE */}

          <div className="an-civilization-space-portal__transition-aperture">
            <span className="an-civilization-space-portal__transition-ring an-civilization-space-portal__transition-ring--one" />

            <span className="an-civilization-space-portal__transition-ring an-civilization-space-portal__transition-ring--two" />

            <span className="an-civilization-space-portal__transition-ring an-civilization-space-portal__transition-ring--three" />

            <span className="an-civilization-space-portal__transition-ring an-civilization-space-portal__transition-ring--four" />
          </div>

          {/* THREE CIVILIZATION LAYERS */}

          <div className="an-civilization-space-portal__transition-layers">
            <span className="an-civilization-space-portal__transition-layer an-civilization-space-portal__transition-layer--library">
              <i />
              <small>LIBRARY</small>
            </span>

            <span className="an-civilization-space-portal__transition-layer an-civilization-space-portal__transition-layer--intelligence">
              <i />
              <small>INTELLIGENCE</small>
            </span>

            <span className="an-civilization-space-portal__transition-layer an-civilization-space-portal__transition-layer--experience">
              <i />
              <small>EXPERIENCE</small>
            </span>
          </div>

          {/* CENTRAL CIVILIZATION AXIS */}

          <div className="an-civilization-space-portal__transition-axis">
            <span />
            <i />
          </div>

          {/* TRANSITION COPY */}

          <div className="an-civilization-space-portal__transition-copy">
            <span>CIVILIZATION SPACE</span>

            <small>
              Preserve · Understand · Experience
            </small>
          </div>
        </div>
      </div>

      {/* ==================================================
          STYLES
      ================================================== */}

      <style jsx>{`
        /* ==================================================
           ROOT
        ================================================== */

        .an-civilization-space-portal,
        .an-civilization-space-portal *,
        .an-civilization-space-portal *::before,
        .an-civilization-space-portal *::after {
          box-sizing: border-box;
        }

        .an-civilization-space-portal {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height: 100%;
          min-height: 0;

          margin: 0;
          padding: 0;

          /*
           * The component remains transparent.
           * The HOME environment owns the outer glass.
           */
          overflow: hidden;

          border-radius: inherit;

          color: #fff;
        }

        button {
          font: inherit;
        }

        /* ==================================================
           TRANSPARENT INTERNAL SURFACE

           HOME owns the Black Glass Surface.

           REVISED:
           This surface is now the clipping boundary
           for the transition animation.
        ================================================== */

        .an-civilization-space-portal__surface {
          position: relative;

          isolation: isolate;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height: 100%;

          min-height: clamp(
            560px,
            58vw,
            700px
          );

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          overflow: hidden;

          padding: clamp(
            25px,
            4vw,
            50px
          );

          border: 0;

          border-radius: inherit;

          background: transparent;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          box-shadow: none;

          color: rgba(
            248,
            249,
            250,
            0.94
          );
        }

        .an-civilization-space-portal__surface::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          background: linear-gradient(
            132deg,
            rgba(255, 255, 255, 0.012),
            transparent 20%,
            transparent 80%,
            rgba(255, 255, 255, 0.004)
          );
        }

        /* ==================================================
           AMBIENT FIELD
        ================================================== */

        .an-civilization-space-portal__ambient {
          position: absolute;

          z-index: -5;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 53%,
              rgba(219, 228, 232, 0.04),
              transparent 29%
            ),
            radial-gradient(
              ellipse at 50% 112%,
              rgba(132, 151, 160, 0.035),
              transparent 45%
            );
        }

        .an-civilization-space-portal__grid {
          position: absolute;

          z-index: -4;

          inset: 0;

          pointer-events: none;

          opacity: 0.055;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.022) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.022) 1px,
              transparent 1px
            );

          background-size: 68px 68px;

          -webkit-mask-image: radial-gradient(
            ellipse at center,
            #000,
            transparent 78%
          );

          mask-image: radial-gradient(
            ellipse at center,
            #000,
            transparent 78%
          );
        }

        .an-civilization-space-portal__reflection {
          position: absolute;

          z-index: -3;

          top: -24%;
          left: -14%;

          width: 64%;
          height: 62%;

          pointer-events: none;

          transform: rotate(-16deg);

          background: linear-gradient(
            110deg,
            transparent,
            rgba(255, 255, 255, 0.012),
            transparent
          );

          filter: blur(30px);
        }

        /* ==================================================
           HEADER
        ================================================== */

        .an-civilization-space-portal__header {
          position: relative;

          z-index: 20;

          width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: start;

          transition:
            opacity 0.42s ease,
            transform 0.58s ease;
        }

        .an-civilization-space-portal__identity {
          grid-column: 2;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          text-align: center;
        }

        .an-civilization-space-portal__eyebrow {
          color: rgba(255, 255, 255, 0.82);

          font-size: 9px;

          font-weight: 650;

          letter-spacing: 0.24em;

          white-space: nowrap;
        }

        .an-civilization-space-portal__principle {
          color: rgba(255, 255, 255, 0.24);

          font-size: 6px;

          font-weight: 500;

          letter-spacing: 0.14em;

          white-space: nowrap;
        }

        .an-civilization-space-portal__status {
          grid-column: 3;

          justify-self: end;

          display: inline-flex;

          align-items: center;

          gap: 7px;

          color: rgba(255, 255, 255, 0.32);

          font-size: 6px;

          font-weight: 600;

          letter-spacing: 0.14em;

          white-space: nowrap;
        }

        .an-civilization-space-portal__status i {
          width: 4px;
          height: 4px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.62);

          box-shadow:
            0 0 9px rgba(255, 255, 255, 0.2);

          animation:
            an-civilization-status
            9s
            ease-in-out
            infinite;
        }

        /* ==================================================
           CENTER
        ================================================== */

        .an-civilization-space-portal__center {
          position: relative;

          z-index: 10;

          align-self: center;

          width: 100%;
          min-width: 0;
          min-height: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            clamp(24px, 3.8vw, 42px)
            0
            clamp(16px, 2.6vw, 28px);
        }

        /* ==================================================
           STATEMENT
        ================================================== */

        .an-civilization-space-portal__statement {
          position: relative;

          z-index: 20;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 11px;

          text-align: center;

          transition:
            opacity 0.42s ease,
            transform 0.62s ease;
        }

        .an-civilization-space-portal__statement-eyebrow {
          color: rgba(255, 255, 255, 0.22);

          font-size: 6px;

          font-weight: 600;

          letter-spacing: 0.21em;
        }

        .an-civilization-space-portal__statement h2 {
          width: 100%;

          max-width: 820px;

          margin: 0;

          color: rgba(250, 251, 252, 0.97);

          font-size: clamp(
            39px,
            5.1vw,
            70px
          );

          font-weight: 235;

          line-height: 0.95;

          letter-spacing: -0.058em;

          text-align: center;

          text-wrap: balance;
        }

        .an-civilization-space-portal__statement p {
          width: min(100%, 480px);

          margin: 0;

          color: rgba(210, 221, 226, 0.27);

          font-size: clamp(
            8px,
            0.8vw,
            10px
          );

          line-height: 1.65;

          text-align: center;

          text-wrap: balance;
        }

        /* ==================================================
           ENTRANCE
        ================================================== */

        .an-civilization-space-portal__entrance {
          position: relative;

          z-index: 12;

          width: min(100%, 420px);

          max-width: 100%;
          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 11px;

          margin-top: clamp(
            9px,
            1.5vw,
            17px
          );

          padding: 0;

          border: 0;

          outline: 0;

          background: transparent;

          box-shadow: none;

          color: rgba(235, 241, 244, 0.34);

          cursor: pointer;

          appearance: none;

          -webkit-appearance: none;

          -webkit-tap-highlight-color: transparent;
        }

        .an-civilization-space-portal__entrance:disabled {
          cursor: default;
        }

        .an-civilization-space-portal__entrance:focus-visible {
          outline: 1px solid rgba(255, 255, 255, 0.16);

          outline-offset: 8px;

          border-radius: 20px;
        }

        /* ==================================================
           CIVILIZATION APERTURE

           Existing design preserved.
           The entrance itself never expands outside
           the HOME surface during activation.
        ================================================== */

        .an-civilization-space-portal__aperture {
          position: relative;

          width: min(100%, 280px);

          aspect-ratio: 1;

          display: block;

          margin: 0 auto;

          overflow: hidden;

          border-radius: 50%;

          transform: translateZ(0);

          transition:
            transform
              0.72s
              cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 0.45s ease,
            filter 0.55s ease;
        }

        /* ==================================================
           HALO
        ================================================== */

        .an-civilization-space-portal__halo {
          position: absolute;

          z-index: 0;

          inset: 6%;

          border-radius: 50%;

          background: radial-gradient(
            circle at 50% 48%,
            rgba(223, 233, 237, 0.055),
            rgba(12, 14, 15, 0.045) 31%,
            transparent 69%
          );

          filter: blur(8px);

          opacity: 0.78;

          animation:
            an-civilization-halo
            10.8s
            ease-in-out
            infinite;
        }

        /* ==================================================
           ORBITS
        ================================================== */

        .an-civilization-space-portal__orbit {
          position: absolute;

          z-index: 2;

          top: 50%;
          left: 50%;

          border: 1px solid rgba(230, 237, 240, 0.07);

          border-radius: 50%;

          pointer-events: none;
        }

        .an-civilization-space-portal__orbit--outer {
          width: 88%;
          height: 48%;

          transform:
            translate(-50%, -50%)
            rotate(-12deg);
        }

        .an-civilization-space-portal__orbit--middle {
          width: 67%;
          height: 67%;

          transform:
            translate(-50%, -50%)
            rotate(36deg);

          opacity: 0.72;
        }

        .an-civilization-space-portal__orbit--inner {
          width: 48%;
          height: 48%;

          transform:
            translate(-50%, -50%)
            rotate(-31deg);

          opacity: 0.6;
        }

        /* ==================================================
           DOMAINS
        ================================================== */

        .an-civilization-space-portal__domain {
          position: absolute;

          z-index: 12;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 5px;

          color: rgba(255, 255, 255, 0.22);

          pointer-events: none;
        }

        .an-civilization-space-portal__domain i {
          width: 5px;
          height: 5px;

          border: 1px solid rgba(235, 241, 244, 0.38);

          border-radius: 50%;

          background: rgba(4, 5, 6, 0.92);

          box-shadow:
            0 0 9px rgba(255, 255, 255, 0.08);

          animation:
            an-civilization-domain
            9.6s
            ease-in-out
            infinite;
        }

        .an-civilization-space-portal__domain small {
          font-size: 4px;

          font-weight: 620;

          letter-spacing: 0.12em;

          white-space: nowrap;
        }

        .an-civilization-space-portal__domain--library {
          top: 25%;
          left: 11%;
        }

        .an-civilization-space-portal__domain--intelligence {
          top: 17%;
          left: 50%;

          transform: translateX(-50%);
        }

        .an-civilization-space-portal__domain--experience {
          top: 25%;
          right: 8%;
        }

        .an-civilization-space-portal__domain--intelligence i {
          animation-delay: -3.2s;
        }

        .an-civilization-space-portal__domain--experience i {
          animation-delay: -6.4s;
        }

        /* ==================================================
           CONNECTIONS
        ================================================== */

        .an-civilization-space-portal__connection {
          position: absolute;

          z-index: 4;

          height: 1px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(231, 238, 241, 0.08),
            transparent
          );

          pointer-events: none;
        }

        .an-civilization-space-portal__connection--left {
          top: 37%;
          left: 22%;

          width: 31%;

          transform: rotate(27deg);

          transform-origin: left center;
        }

        .an-civilization-space-portal__connection--right {
          top: 37%;
          right: 22%;

          width: 31%;

          transform: rotate(-27deg);

          transform-origin: right center;
        }

        .an-civilization-space-portal__connection--base {
          top: 57%;
          left: 50%;

          width: 44%;

          transform: translateX(-50%);
        }

        /* ==================================================
           CORE
        ================================================== */

        .an-civilization-space-portal__core {
          position: absolute;

          z-index: 10;

          top: 50%;
          left: 50%;

          width: 43%;
          height: 43%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background: radial-gradient(
            circle at 48% 38%,
            rgba(213, 225, 230, 0.075),
            rgba(5, 6, 7, 0.68) 48%,
            rgba(0, 0, 0, 0.92) 78%
          );

          border: 1px solid rgba(231, 238, 241, 0.08);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.035),
            inset 0 -16px 28px rgba(0, 0, 0, 0.46);

          transition:
            transform
              0.55s
              cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.45s ease;
        }

        .an-civilization-space-portal__core-ring {
          position: absolute;

          inset: 15%;

          border: 1px solid rgba(224, 233, 237, 0.075);

          border-radius: 50%;

          transform:
            rotateX(67deg)
            rotateZ(-16deg);
        }

        .an-civilization-space-portal__core-axis {
          position: absolute;

          top: 18%;
          bottom: 17%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(228, 236, 239, 0.42) 18%,
            rgba(228, 236, 239, 0.15) 82%,
            transparent
          );
        }

        .an-civilization-space-portal__core-level {
          position: absolute;

          left: 50%;

          height: 1px;

          transform: translateX(-50%);

          background: linear-gradient(
            90deg,
            transparent,
            rgba(231, 238, 241, 0.4),
            transparent
          );
        }

        .an-civilization-space-portal__core-level--one {
          top: 34%;
          width: 35%;
        }

        .an-civilization-space-portal__core-level--two {
          top: 50%;
          width: 55%;
        }

        .an-civilization-space-portal__core-level--three {
          top: 66%;
          width: 74%;
        }

        .an-civilization-space-portal__core-node {
          position: absolute;

          left: 50%;

          width: 4px;
          height: 4px;

          transform: translateX(-50%);

          border: 1px solid rgba(235, 241, 244, 0.45);

          border-radius: 50%;

          background: rgba(4, 5, 6, 0.95);
        }

        .an-civilization-space-portal__core-node--one {
          top: calc(34% - 2px);
        }

        .an-civilization-space-portal__core-node--two {
          top: calc(50% - 2px);
        }

        .an-civilization-space-portal__core-node--three {
          top: calc(66% - 2px);
        }

        /* ==================================================
           SIGNALS
        ================================================== */

        .an-civilization-space-portal__signal {
          position: absolute;

          z-index: 15;

          top: 50%;
          left: 50%;

          width: 3px;
          height: 3px;

          margin: -1.5px 0 0 -1.5px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.72);

          box-shadow:
            0 0 10px rgba(255, 255, 255, 0.18);

          opacity: 0;
        }

        .an-civilization-space-portal__signal--one {
          animation:
            an-civilization-signal-one
            9.8s
            ease-in-out
            infinite;
        }

        .an-civilization-space-portal__signal--two {
          animation:
            an-civilization-signal-two
            9.8s
            ease-in-out
            infinite
            -3.26s;
        }

        .an-civilization-space-portal__signal--three {
          animation:
            an-civilization-signal-three
            9.8s
            ease-in-out
            infinite
            -6.52s;
        }

        /* ==================================================
           ENTER LABEL
        ================================================== */

        .an-civilization-space-portal__enter-label {
          color: rgba(255, 255, 255, 0.25);

          font-size: 6px;

          font-weight: 620;

          letter-spacing: 0.15em;

          text-align: center;

          transition:
            color 0.4s ease,
            transform 0.4s ease,
            opacity 0.4s ease;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .an-civilization-space-portal__footer {
          position: relative;

          z-index: 20;

          width: 100%;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: clamp(
            8px,
            1.4vw,
            16px
          );

          padding-top: 18px;

          border-top: 1px solid rgba(255, 255, 255, 0.035);

          color: rgba(255, 255, 255, 0.16);

          font-size: 5px;

          font-weight: 600;

          letter-spacing: 0.15em;

          text-align: center;

          transition: opacity 0.42s ease;
        }

        .an-civilization-space-portal__footer i {
          width: 20px;
          height: 1px;

          background: rgba(255, 255, 255, 0.055);
        }

        /* ==================================================
           BOUNDED TRANSITION

           MAIN FIX

           Previously:
             position: fixed;
             inset: 0;
             width: 100vw;
             height: 100dvh;

           Now:
             position: absolute;
             inset: 0;

           This overlay fills ONLY the internal surface.
           The surface clips all expanding visual effects.
        ================================================== */

        .an-civilization-space-portal__transition {
          position: absolute;

          inset: 0;

          z-index: 40;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          overflow: hidden;

          display: grid;

          place-items: center;

          border-radius: inherit;

          background: transparent;

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          isolation: isolate;

          transition:
            opacity 0.16s ease,
            visibility 0s linear 1.4s,
            background 0.72s ease;
        }

        /* ==================================================
           TRANSITION VOID

           Dark cinematic depth remains inside the card.
        ================================================== */

        .an-civilization-space-portal__transition-void {
          position: absolute;

          z-index: 0;

          inset: 0;

          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(19, 21, 23, 0.995),
            rgba(4, 5, 6, 0.998) 47%,
            #000 84%
          );

          opacity: 0;

          transform: scale(1.035);

          transition:
            opacity 0.42s ease,
            transform
              1.12s
              cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        /* ==================================================
           TRANSITION GRID

           The grid is clipped by the transition overlay.
        ================================================== */

        .an-civilization-space-portal__transition-grid {
          position: absolute;

          z-index: 1;

          inset: 0;

          opacity: 0;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            );

          background-size: 68px 68px;

          transform:
            perspective(700px)
            rotateX(62deg)
            scale(0.78);

          transform-origin: center center;

          -webkit-mask-image: radial-gradient(
            ellipse,
            black,
            transparent 75%
          );

          mask-image: radial-gradient(
            ellipse,
            black,
            transparent 75%
          );

          transition:
            opacity 0.5s ease 0.06s,
            transform
              1.16s
              cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        /* ==================================================
           TRANSITION FIELD

           Bounded glow.
           No 4.8x viewport expansion.
        ================================================== */

        .an-civilization-space-portal__transition-field {
          position: absolute;

          z-index: 2;

          top: 50%;
          left: 50%;

          width: min(62%, 300px);

          aspect-ratio: 1;

          transform:
            translate(-50%, -50%)
            scale(0.38);

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.085),
            rgba(255, 255, 255, 0.018) 35%,
            transparent 72%
          );

          filter: blur(18px);

          opacity: 0;

          transition:
            opacity 0.4s ease,
            transform
              1.12s
              cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        /* ==================================================
           TRANSITION APERTURE

           MAIN FIX

           The original full-screen aperture is retained
           as a visual concept, but its rings now scale
           within a bounded central geometry.
        ================================================== */

        .an-civilization-space-portal__transition-aperture {
          position: absolute;

          z-index: 8;

          top: 50%;
          left: 50%;

          /*
           * The aperture is limited by BOTH the available
           * width and height of the HOME surface.
           */
          width: min(
            76%,
            76cqh,
            440px
          );

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          overflow: visible;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.28);

          transition:
            opacity 0.36s ease 0.05s,
            transform
              1.16s
              cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .an-civilization-space-portal__transition-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          border: 1px solid rgba(255, 255, 255, 0.075);

          border-radius: 50%;

          transform: translate(-50%, -50%);

          pointer-events: none;
        }

        .an-civilization-space-portal__transition-ring--one {
          width: 24%;
          aspect-ratio: 1;
        }

        .an-civilization-space-portal__transition-ring--two {
          width: 43%;
          aspect-ratio: 1;

          opacity: 0.78;
        }

        .an-civilization-space-portal__transition-ring--three {
          width: 68%;
          aspect-ratio: 1;

          opacity: 0.52;
        }

        .an-civilization-space-portal__transition-ring--four {
          width: 96%;
          aspect-ratio: 1;

          opacity: 0.28;
        }

        /* ==================================================
           TRANSITION LAYERS

           Labels remain within the central HOME area.
        ================================================== */

        .an-civilization-space-portal__transition-layers {
          position: absolute;

          z-index: 14;

          inset: 0;

          pointer-events: none;
        }

        .an-civilization-space-portal__transition-layer {
          position: absolute;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 8px;

          color: rgba(255, 255, 255, 0.26);

          opacity: 0;

          transform: translate(-50%, 12px);

          transition:
            opacity 0.38s ease,
            transform
              0.62s
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .an-civilization-space-portal__transition-layer i {
          width: 6px;
          height: 6px;

          border: 1px solid rgba(255, 255, 255, 0.58);

          border-radius: 50%;

          background: rgba(0, 0, 0, 0.82);

          box-shadow:
            0 0 16px rgba(255, 255, 255, 0.12);
        }

        .an-civilization-space-portal__transition-layer small {
          font-size: 6px;

          font-weight: 620;

          letter-spacing: 0.18em;

          white-space: nowrap;
        }

        .an-civilization-space-portal__transition-layer--library {
          top: 49%;
          left: 22%;

          transition-delay: 0.22s;
        }

        .an-civilization-space-portal__transition-layer--intelligence {
          top: 25%;
          left: 50%;

          transition-delay: 0.32s;
        }

        .an-civilization-space-portal__transition-layer--experience {
          top: 49%;
          left: 78%;

          transition-delay: 0.42s;
        }

        /* ==================================================
           TRANSITION AXIS
        ================================================== */

        .an-civilization-space-portal__transition-axis {
          position: absolute;

          z-index: 18;

          top: 19%;
          bottom: 18%;
          left: 50%;

          width: 1px;

          transform: translateX(-50%);

          opacity: 0;
        }

        .an-civilization-space-portal__transition-axis > span {
          position: absolute;

          inset: 0;

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.54) 24%,
            rgba(255, 255, 255, 0.12) 72%,
            transparent
          );

          box-shadow:
            0 0 12px rgba(255, 255, 255, 0.08);
        }

        .an-civilization-space-portal__transition-axis > i {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 6px;
          height: 6px;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.94);

          box-shadow:
            0 0 14px rgba(255, 255, 255, 0.42),
            0 0 52px rgba(255, 255, 255, 0.12);
        }

        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .an-civilization-space-portal__transition-copy {
          position: absolute;

          z-index: 30;

          bottom: clamp(
            25px,
            6%,
            52px
          );

          left: 50%;

          width: min(
            calc(100% - 32px),
            600px
          );

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 8px;

          transform: translate(-50%, 8px);

          opacity: 0;

          text-align: center;

          transition:
            opacity 0.36s ease 0.38s,
            transform 0.5s ease 0.38s;
        }

        .an-civilization-space-portal__transition-copy > span {
          color: rgba(245, 247, 248, 0.62);

          font-size: 7px;

          font-weight: 620;

          letter-spacing: 0.24em;
        }

        .an-civilization-space-portal__transition-copy > small {
          color: rgba(220, 226, 229, 0.22);

          font-size: 6px;

          letter-spacing: 0.1em;
        }

        /* ==================================================
           ENTERING — HOME CONTENT

           REVISED:
           Do not fade or transform the entire __surface,
           because the transition now lives inside it.
        ================================================== */

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__header,
        .an-civilization-space-portal--entering
        .an-civilization-space-portal__statement,
        .an-civilization-space-portal--entering
        .an-civilization-space-portal__footer {
          opacity: 0;
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__header {
          transform: translateY(-6px);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__statement {
          transform: translateY(-7px);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__aperture {
          transform: scale(0.78);

          opacity: 0.08;

          filter:
            brightness(0.42)
            blur(2px);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__enter-label {
          opacity: 0;
        }

        /*
         * Intentionally removed:
         *
         * .__surface {
         *   opacity: 0;
         *   transform: scale(...);
         *   filter: blur(...);
         * }
         *
         * That old rule would also hide the transition
         * now that the overlay is inside the surface.
         */

        /* ==================================================
           ENTERING — BOUNDED TRANSITION
        ================================================== */

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition {
          visibility: visible;

          opacity: 1;

          background: #000;

          transition:
            opacity 0.16s ease,
            background 0.72s ease;
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-void {
          opacity: 1;

          transform: scale(1);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-grid {
          opacity: 0.18;

          transform:
            perspective(700px)
            rotateX(62deg)
            scale(1.08);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-field {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1.65);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-aperture {
          opacity: 0.88;

          transform:
            translate(-50%, -50%)
            scale(1);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-layer {
          opacity: 1;

          transform: translate(-50%, 0);
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-axis {
          opacity: 0.76;

          transition: opacity 0.36s ease 0.22s;
        }

        .an-civilization-space-portal--entering
        .an-civilization-space-portal__transition-copy {
          opacity: 1;

          transform: translate(-50%, 0);
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .an-civilization-space-portal__entrance:not(:disabled):hover
          .an-civilization-space-portal__aperture {
            transform: scale(1.025);
          }

          .an-civilization-space-portal__entrance:not(:disabled):hover
          .an-civilization-space-portal__core {
            border-color: rgba(240, 245, 247, 0.15);

            transform:
              translate(-50%, -50%)
              scale(1.04);
          }

          .an-civilization-space-portal__entrance:not(:disabled):hover
          .an-civilization-space-portal__enter-label {
            color: rgba(255, 255, 255, 0.52);

            transform: translateY(-2px);
          }
        }

        /* ==================================================
           ANIMATIONS — ORIGINAL VISUAL BEHAVIOR
        ================================================== */

        @keyframes an-civilization-status {
          0%,
          100% {
            opacity: 0.38;

            transform: scale(0.78);
          }

          50% {
            opacity: 0.95;

            transform: scale(1.08);
          }
        }

        @keyframes an-civilization-halo {
          0%,
          100% {
            opacity: 0.4;

            transform: scale(0.92);
          }

          50% {
            opacity: 0.8;

            transform: scale(1.07);
          }
        }

        @keyframes an-civilization-domain {
          0%,
          100% {
            opacity: 0.26;

            transform: scale(0.78);
          }

          50% {
            opacity: 0.9;

            transform: scale(1.12);
          }
        }

        @keyframes an-civilization-signal-one {
          0% {
            opacity: 0;

            transform: translate(-86px, -48px);
          }

          18% {
            opacity: 0.82;
          }

          78% {
            opacity: 0.38;
          }

          100% {
            opacity: 0;

            transform: translate(0, 0);
          }
        }

        @keyframes an-civilization-signal-two {
          0% {
            opacity: 0;

            transform: translate(0, -88px);
          }

          18% {
            opacity: 0.82;
          }

          78% {
            opacity: 0.38;
          }

          100% {
            opacity: 0;

            transform: translate(0, 0);
          }
        }

        @keyframes an-civilization-signal-three {
          0% {
            opacity: 0;

            transform: translate(86px, -48px);
          }

          18% {
            opacity: 0.82;
          }

          78% {
            opacity: 0.38;
          }

          100% {
            opacity: 0;

            transform: translate(0, 0);
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .an-civilization-space-portal {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            height: 100%;

            padding: 0;

            overflow: hidden;
          }

          .an-civilization-space-portal__surface {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            min-height: 0;

            height: min(
              690px,
              calc(100svh - 42px)
            );

            max-height: 690px;

            padding:
              20px
              18px
              17px;

            overflow: hidden;

            border: 0;

            border-radius: inherit;

            background: transparent;

            -webkit-backdrop-filter: none;
            backdrop-filter: none;

            box-shadow: none;
          }

          .an-civilization-space-portal__eyebrow {
            font-size: 7px;

            letter-spacing: 0.2em;
          }

          .an-civilization-space-portal__principle {
            margin-top: -1px;

            font-size: 4.5px;

            letter-spacing: 0.1em;
          }

          .an-civilization-space-portal__status {
            gap: 5px;

            font-size: 5px;
          }

          .an-civilization-space-portal__center {
            min-height: 0;

            padding:
              16px
              0
              10px;

            overflow: hidden;
          }

          .an-civilization-space-portal__statement {
            gap: 8px;
          }

          .an-civilization-space-portal__statement-eyebrow {
            font-size: 5px;

            letter-spacing: 0.18em;
          }

          .an-civilization-space-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            padding: 0 4px;

            font-size: clamp(
              34px,
              10.3vw,
              48px
            );

            line-height: 0.96;

            letter-spacing: -0.052em;
          }

          .an-civilization-space-portal__statement p {
            width: min(100%, 340px);

            font-size: 8px;

            line-height: 1.55;
          }

          .an-civilization-space-portal__entrance {
            width: min(100%, 350px);

            margin-top: 4px;
          }

          .an-civilization-space-portal__aperture {
            width: min(100%, 230px);
          }

          .an-civilization-space-portal__domain small {
            font-size: 3.5px;
          }

          .an-civilization-space-portal__enter-label {
            font-size: 5.5px;

            letter-spacing: 0.11em;
          }

          .an-civilization-space-portal__footer {
            gap: 8px;

            padding-top: 13px;

            overflow: hidden;

            font-size: 4px;
          }

          .an-civilization-space-portal__footer i {
            width: 12px;
          }

          /* ================================================
             MOBILE TRANSITION GEOMETRY

             The labels stay away from the side edges.
             Rings remain bounded by the surface.
          ================================================= */

          .an-civilization-space-portal__transition-aperture {
            width: min(
              76%,
              68cqh,
              300px
            );
          }

          .an-civilization-space-portal__transition-layer--library {
            left: 20%;
          }

          .an-civilization-space-portal__transition-layer--experience {
            left: 80%;
          }

          .an-civilization-space-portal__transition-layer small {
            font-size: 5px;
          }

          .an-civilization-space-portal__transition-copy {
            bottom: 26px;
          }
        }

        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .an-civilization-space-portal__surface {
            height: calc(100svh - 30px);

            padding:
              17px
              17px
              14px;
          }

          .an-civilization-space-portal__center {
            padding:
              9px
              0
              6px;
          }

          .an-civilization-space-portal__statement {
            gap: 5px;
          }

          .an-civilization-space-portal__statement h2 {
            font-size: clamp(
              31px,
              9.3vw,
              42px
            );
          }

          .an-civilization-space-portal__statement p {
            line-height: 1.45;
          }

          .an-civilization-space-portal__entrance {
            margin-top: 0;
          }

          .an-civilization-space-portal__aperture {
            width: min(100%, 190px);
          }

          .an-civilization-space-portal__footer {
            padding-top: 10px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .an-civilization-space-portal__surface {
            padding:
              18px
              15px
              15px;
          }

          .an-civilization-space-portal__eyebrow {
            font-size: 6.5px;
          }

          .an-civilization-space-portal__principle {
            font-size: 4px;
          }

          .an-civilization-space-portal__statement h2 {
            font-size: clamp(
              32px,
              10.1vw,
              43px
            );
          }

          .an-civilization-space-portal__statement p {
            max-width: 300px;

            font-size: 7.5px;
          }

          .an-civilization-space-portal__aperture {
            width: min(100%, 205px);
          }

          .an-civilization-space-portal__domain small {
            display: none;
          }

          .an-civilization-space-portal__domain i {
            width: 5px;
            height: 5px;
          }

          .an-civilization-space-portal__footer {
            font-size: 3.8px;
          }

          .an-civilization-space-portal__transition-layer small {
            font-size: 4px;
          }

          .an-civilization-space-portal__transition-layer--library {
            left: 18%;
          }

          .an-civilization-space-portal__transition-layer--experience {
            left: 82%;
          }
        }

        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {
          .an-civilization-space-portal__surface {
            padding:
              16px
              13px
              14px;
          }

          .an-civilization-space-portal__principle {
            display: none;
          }

          .an-civilization-space-portal__statement h2 {
            font-size: clamp(
              30px,
              9.7vw,
              38px
            );
          }

          .an-civilization-space-portal__statement p {
            font-size: 7px;
          }

          .an-civilization-space-portal__aperture {
            width: min(100%, 178px);
          }

          .an-civilization-space-portal__footer i {
            display: none;
          }

          .an-civilization-space-portal__transition-layer--library {
            left: 17%;
          }

          .an-civilization-space-portal__transition-layer--experience {
            left: 83%;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-civilization-space-portal__status i,
          .an-civilization-space-portal__halo,
          .an-civilization-space-portal__domain i,
          .an-civilization-space-portal__signal {
            animation: none !important;
          }

          .an-civilization-space-portal__header,
          .an-civilization-space-portal__statement,
          .an-civilization-space-portal__aperture,
          .an-civilization-space-portal__core,
          .an-civilization-space-portal__transition,
          .an-civilization-space-portal__transition-void,
          .an-civilization-space-portal__transition-grid,
          .an-civilization-space-portal__transition-field,
          .an-civilization-space-portal__transition-aperture,
          .an-civilization-space-portal__transition-layer,
          .an-civilization-space-portal__transition-axis,
          .an-civilization-space-portal__transition-copy {
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
}