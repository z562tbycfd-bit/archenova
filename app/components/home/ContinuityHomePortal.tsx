"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AEVUM
   SILENT CONTINUUM

   HOME PORTAL — COMPLETE REPLACEMENT

   CHANGE:
   - Entrance icon only
   - Simplified transparent-black central sphere
   - Two asymmetric silver orbital planes
   - Three transparent temporal layers
   - Continuous whole-object rotation
   - Independent orbital and temporal movement
   - Subtle floating and breathing

   PRESERVED:
   - HOME single-glass ownership by globals.css
   - All existing text and layout
   - Five intellectual domains
   - Responsive proportions
   - Fullscreen transition
   - /continuity navigation

   NO:
   - Secondary rectangular glass
   - Blue tint
   - Canvas / WebGL
   - External image assets
========================================================== */

const AEVUM_ROUTE = "/continuity";
const TRANSITION_DURATION = 1150;
const REDUCED_TRANSITION_DURATION = 120;

const DOMAINS = [
  ["question", "QUESTION"],
  ["evidence", "EVIDENCE"],
  ["reasoning", "REASONING"],
  ["knowledge", "KNOWLEDGE"],
  ["purpose", "PURPOSE"],
] as const;

/* ==========================================================
   AEVUM SCULPTURE

   The entire icon moves as one object.
   Its internal orbital planes move independently.

   Center:
     Transparent obsidian inquiry sphere

   Structure:
     Two asymmetric orbital planes

   Time:
     Three translucent temporal membranes

   Motion:
     Continuous rotation + quiet floating
========================================================== */

function AevumSculpture({ prefix }: { prefix: string }) {
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <svg
      className="an-aevum-portal__art"
      viewBox="0 0 600 480"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Transparent obsidian surface */}

        <radialGradient
          id={id("obsidian")}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(250 163) rotate(54) scale(268)"
        >
          <stop
            offset="0"
            stopColor="#f6f8fa"
            stopOpacity=".19"
          />
          <stop
            offset=".2"
            stopColor="#a9b0b9"
            stopOpacity=".105"
          />
          <stop
            offset=".47"
            stopColor="#202329"
            stopOpacity=".43"
          />
          <stop
            offset=".78"
            stopColor="#030405"
            stopOpacity=".77"
          />
          <stop
            offset="1"
            stopColor="#000"
            stopOpacity=".42"
          />
        </radialGradient>

        {/* Inner transparent glass */}

        <radialGradient
          id={id("inner-glass")}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(275 198) rotate(52) scale(118)"
        >
          <stop
            offset="0"
            stopColor="#ffffff"
            stopOpacity=".21"
          />
          <stop
            offset=".3"
            stopColor="#c3c9d0"
            stopOpacity=".065"
          />
          <stop
            offset=".72"
            stopColor="#08090c"
            stopOpacity=".46"
          />
          <stop
            offset="1"
            stopColor="#000"
            stopOpacity=".67"
          />
        </radialGradient>

        {/* Fine metallic contour */}

        <linearGradient
          id={id("silver")}
          x1="151"
          y1="91"
          x2="455"
          y2="383"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#ffffff"
            stopOpacity=".8"
          />
          <stop
            offset=".25"
            stopColor="#ffffff"
            stopOpacity=".18"
          />
          <stop
            offset=".56"
            stopColor="#ffffff"
            stopOpacity=".08"
          />
          <stop
            offset=".83"
            stopColor="#ffffff"
            stopOpacity=".64"
          />
          <stop
            offset="1"
            stopColor="#ffffff"
            stopOpacity=".16"
          />
        </linearGradient>

        {/* Asymmetric orbit illumination */}

        <linearGradient
          id={id("orbit")}
          x1="73"
          y1="318"
          x2="532"
          y2="124"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#ffffff"
            stopOpacity=".08"
          />
          <stop
            offset=".23"
            stopColor="#ffffff"
            stopOpacity=".72"
          />
          <stop
            offset=".49"
            stopColor="#ffffff"
            stopOpacity=".16"
          />
          <stop
            offset=".78"
            stopColor="#ffffff"
            stopOpacity=".8"
          />
          <stop
            offset="1"
            stopColor="#ffffff"
            stopOpacity=".1"
          />
        </linearGradient>

        {/* Soft monochrome inquiry light */}

        <radialGradient id={id("light")}>
          <stop
            offset="0"
            stopColor="#ffffff"
            stopOpacity=".98"
          />
          <stop
            offset=".15"
            stopColor="#ffffff"
            stopOpacity=".78"
          />
          <stop
            offset=".42"
            stopColor="#ffffff"
            stopOpacity=".15"
          />
          <stop
            offset="1"
            stopColor="#ffffff"
            stopOpacity="0"
          />
        </radialGradient>

        {/* Temporal membrane shading */}

        <linearGradient
          id={id("membrane")}
          x1="182"
          y1="134"
          x2="422"
          y2="327"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#ffffff"
            stopOpacity=".13"
          />
          <stop
            offset=".4"
            stopColor="#ffffff"
            stopOpacity=".018"
          />
          <stop
            offset="1"
            stopColor="#ffffff"
            stopOpacity=".09"
          />
        </linearGradient>

        <clipPath id={id("sphere-clip")}>
          <circle cx="300" cy="228" r="153" />
        </clipPath>
      </defs>

      {/* ==================================================
          WHOLE SCULPTURE

          All internal visual components participate
          in one slow continuous rotation.
      ================================================== */}

      <g className="an-aevum-portal__continuum">

        {/* Quiet spatial halo */}

        <circle
          cx="300"
          cy="228"
          r="197"
          fill={`url(#${id("light")})`}
          opacity=".075"
        />

        {/* ================================================
            REAR ORBIT

            First asymmetric orbital plane.
        ================================================= */}

        <g className="an-aevum-portal__orbit-back">
          <ellipse
            cx="300"
            cy="228"
            rx="220"
            ry="74"
            transform="rotate(-37 300 228)"
            stroke={`url(#${id("orbit")})`}
            strokeWidth="1.15"
            opacity=".62"
          />

          <ellipse
            cx="300"
            cy="228"
            rx="104"
            ry="191"
            transform="rotate(28 300 228)"
            stroke="#ffffff"
            strokeWidth=".72"
            opacity=".19"
          />
        </g>

        {/* ================================================
            TRANSPARENT BLACK OUTER SPHERE
        ================================================= */}

        <circle
          cx="300"
          cy="228"
          r="153"
          fill={`url(#${id("obsidian")})`}
          opacity=".94"
        />

        <circle
          cx="300"
          cy="228"
          r="153"
          stroke={`url(#${id("silver")})`}
          strokeWidth="1.2"
        />

        {/* ================================================
            TRANSPARENT TEMPORAL LAYERS

            Three restrained layers instead of a
            complex collection of intersecting lines.
        ================================================= */}

        <g clipPath={`url(#${id("sphere-clip")})`}>

          <g className="an-aevum-portal__temporal">

            {/* Time layer I */}

            <ellipse
              cx="300"
              cy="228"
              rx="147"
              ry="52"
              transform="rotate(-22 300 228)"
              fill={`url(#${id("membrane")})`}
              fillOpacity=".23"
              stroke="#ffffff"
              strokeWidth=".8"
              strokeOpacity=".26"
            />

            {/* Time layer II */}

            <ellipse
              cx="300"
              cy="228"
              rx="79"
              ry="148"
              transform="rotate(34 300 228)"
              fill={`url(#${id("membrane")})`}
              fillOpacity=".16"
              stroke="#ffffff"
              strokeWidth=".7"
              strokeOpacity=".22"
            />

            {/* Time layer III */}

            <ellipse
              cx="300"
              cy="228"
              rx="144"
              ry="92"
              transform="rotate(38 300 228)"
              fill="none"
              stroke="#ffffff"
              strokeWidth=".65"
              strokeOpacity=".15"
            />

          </g>

          {/* Restrained glass reflections */}

          <path
            d="M187 122Q240 78 309 77"
            stroke="#ffffff"
            strokeWidth="1.65"
            strokeLinecap="round"
            opacity=".28"
          />

          <path
            d="M405 333Q373 366 327 376"
            stroke="#ffffff"
            strokeWidth=".95"
            strokeLinecap="round"
            opacity=".13"
          />

        </g>

        {/* ================================================
            INNER TIME CHAMBER
        ================================================= */}

        <circle
          cx="300"
          cy="228"
          r="99"
          fill={`url(#${id("inner-glass")})`}
          opacity=".65"
        />

        <circle
          cx="300"
          cy="228"
          r="99"
          stroke="#ffffff"
          strokeWidth=".8"
          opacity=".29"
        />

        {/* One quiet inner temporal orbit */}

        <ellipse
          cx="300"
          cy="228"
          rx="100"
          ry="29"
          transform="rotate(43 300 228)"
          stroke="#ffffff"
          strokeWidth=".85"
          opacity=".3"
        />

        {/* ================================================
            CENTRAL INQUIRY SPHERE
        ================================================= */}

        <circle
          cx="300"
          cy="228"
          r="56"
          fill={`url(#${id("inner-glass")})`}
          opacity=".96"
        />

        <circle
          cx="300"
          cy="228"
          r="56"
          stroke={`url(#${id("silver")})`}
          strokeWidth="1.05"
        />

        <circle
          cx="300"
          cy="228"
          r="42"
          stroke="#ffffff"
          strokeWidth=".65"
          opacity=".2"
        />

        {/* Central light */}

        <circle
          cx="300"
          cy="228"
          r="30"
          fill={`url(#${id("light")})`}
          opacity=".38"
        />

        <circle
          className="an-aevum-portal__heart"
          cx="300"
          cy="228"
          r="4"
          fill="#ffffff"
        />

        {/* ================================================
            FRONT ASYMMETRIC ORBIT

            Second principal orbital plane.
        ================================================= */}

        <g className="an-aevum-portal__orbit-front">

          <ellipse
            cx="300"
            cy="228"
            rx="225"
            ry="82"
            transform="rotate(31 300 228)"
            stroke={`url(#${id("orbit")})`}
            strokeWidth="1.55"
            opacity=".87"
          />

          <ellipse
            cx="300"
            cy="228"
            rx="86"
            ry="185"
            transform="rotate(-27 300 228)"
            stroke="#ffffff"
            strokeWidth=".8"
            opacity=".27"
          />

          {/* Two delicate orbital signals */}

          <circle
            cx="119"
            cy="134"
            r="2.3"
            fill="#ffffff"
            opacity=".88"
          />

          <circle
            cx="481"
            cy="322"
            r="1.9"
            fill="#ffffff"
            opacity=".72"
          />

        </g>

      </g>
    </svg>
  );
}

/* ==========================================================
   HOME PORTAL

   Existing content and navigation retained.
========================================================== */

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
      "(prefers-reduced-motion: reduce)"
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
      className={`an-aevum-transition${
        entering ? " an-aevum-transition--active" : ""
      }`}
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
        className={`an-aevum-portal${
          entering ? " an-aevum-portal--entering" : ""
        }`}
        aria-labelledby="an-aevum-title"
      >
        <div className="an-aevum-portal__canvas">

          {/* EXISTING ATMOSPHERE */}

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

          {/* EXISTING IDENTITY */}

          <header className="an-aevum-portal__top">
            <div className="an-aevum-portal__identity">
              <span id="an-aevum-title">
                ARCHENOVA AEVUM
              </span>

              <small>
                INTELLECTUAL CONTINUITY
              </small>
            </div>
          </header>

          {/* EXISTING CENTRAL EXPERIENCE */}

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

            {/* REFINED MOVING ENTRANCE ICON */}

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
                <span className="an-aevum-portal__void" />
                <span className="an-aevum-portal__aura" />
                <span className="an-aevum-portal__dust" />

                <span className="an-aevum-portal__time-field">
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--1" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--2" />
                  <span className="an-aevum-portal__time-ring an-aevum-portal__time-ring--3" />
                </span>

                <span className="an-aevum-portal__sculpture">
                  <AevumSculpture prefix="an-aevum-home" />
                </span>

                {/* FIVE EXISTING DOMAINS */}

                {DOMAINS.map(([key, label]) => (
                  <span
                    key={key}
                    className={`an-aevum-portal__domain an-aevum-portal__domain--${key}`}
                  >
                    <i />
                    <span>{label}</span>
                  </span>
                ))}

                {/* EXISTING PERSISTENCE AXIS */}

                <span className="an-aevum-portal__axis">
                  <span className="an-aevum-portal__axis-line" />

                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--1" />

                  <span className="an-aevum-portal__axis-signal an-aevum-portal__axis-signal--2" />
                </span>

                {/* EXISTING HORIZON */}

                <span className="an-aevum-portal__horizon">
                  <span className="an-aevum-portal__horizon-ring" />
                  <span className="an-aevum-portal__horizon-light" />
                </span>

                {/* EXISTING BOUNDARIES */}

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--origin">
                  ORIGIN
                </span>

                <span className="an-aevum-portal__boundary an-aevum-portal__boundary--continuity">
                  CONTINUITY
                </span>

                {/* EXISTING ENTRY LABEL */}

                <span className="an-aevum-portal__tap">
                  Explore Aevum{" "}
                  <span aria-hidden="true">↗</span>
                </span>

              </span>
            </button>

          </div>

          {/* EXISTING FOOTER */}

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
           01. BOX MODEL — PRESERVED
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
           02. SINGLE HOME GLASS — PRESERVED
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
           03. ROOT — PRESERVED
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
          color: rgba(248,249,250,.94);
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }

        /* ==================================================
           04. CANVAS — PRESERVED
        ================================================== */

        .an-aevum-portal__canvas {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto minmax(0,1fr) auto;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: clamp(560px,58vw,700px);
          margin: 0 auto;
          padding: clamp(25px,4vw,50px);
          overflow: hidden;
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          transition:
            opacity .55s ease,
            transform .75s cubic-bezier(.16,.78,.22,1),
            filter .55s ease;
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
              rgba(255,255,255,.025),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 50% 30%,
              rgba(255,255,255,.012),
              transparent 34%
            );
        }

        .an-aevum-portal__stars {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          opacity: .18;
          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.36) 0 .42px,
              transparent .72px
            ),
            radial-gradient(
              circle,
              rgba(255,255,255,.16) 0 .32px,
              transparent .62px
            );
          background-size: 73px 73px,119px 119px;
          background-position: 0 0,41px 29px;
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
              rgba(255,255,255,.012),
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
          color: rgba(255,255,255,.82);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: .24em;
          white-space: nowrap;
        }

        .an-aevum-portal__identity > small {
          color: rgba(255,255,255,.24);
          font-size: 6px;
          letter-spacing: .14em;
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
            clamp(26px,4vw,44px)
            0
            clamp(18px,3vw,30px);
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
          color: rgba(255,255,255,.22);
          font-size: 6px;
          font-weight: 600;
          letter-spacing: .21em;
        }

        .an-aevum-portal__statement h2 {
          width: 100%;
          max-width: 820px;
          margin: 13px 0 0;
          color: rgba(250,251,252,.97);
          font-family: inherit;
          font-size: clamp(39px,5.1vw,70px);
          font-weight: 235;
          line-height: .95;
          letter-spacing: -.058em;
          text-align: center;
          text-wrap: balance;
        }

        .an-aevum-portal__statement p {
          margin: 11px 0 0;
          color: rgba(233,235,238,.38);
          font-size: 8px;
          font-weight: 400;
          line-height: 1.65;
          letter-spacing: .015em;
        }

        /* ==================================================
           09. ENTRY BUTTON — PRESERVED
        ================================================== */

        .an-aevum-portal__object-button {
          position: relative;
          z-index: 10;
          display: block;
          width: min(100%,590px);
          max-width: 100%;
          min-width: 0;
          margin:
            clamp(13px,1.8vw,21px)
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
            1px solid rgba(255,255,255,.35)
            !important;
          outline-offset: 8px;
          border-radius: 20px;
        }

        /* ==================================================
           10. OBJECT FOOTPRINT — PRESERVED
        ================================================== */

        .an-aevum-portal__object {
          position: relative;
          display: block;
          width: min(100%,500px);
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
            transform .72s cubic-bezier(.2,.8,.2,1),
            opacity .45s ease,
            filter .55s ease;
        }

        /* ==================================================
           11. EXISTING ATMOSPHERE — PRESERVED
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
              rgba(255,255,255,.055),
              rgba(255,255,255,.017) 28%,
              rgba(0,0,0,.14) 53%,
              transparent 78%
            );
          filter: blur(18px);
          opacity: .9;
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
              rgba(255,255,255,.085),
              rgba(255,255,255,.022) 38%,
              transparent 75%
            );
          filter: blur(25px);
          animation:
            an-aevum-breathe
            12s ease-in-out infinite;
        }

        .an-aevum-portal__dust {
          position: absolute;
          z-index: 2;
          inset: 4% 3% 9%;
          opacity: .3;
          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.45) 0 .4px,
              transparent .7px
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
            1px solid rgba(255,255,255,.075);
          border-radius: 50%;
          transform:
            translate(-50%,-50%);
          animation:
            an-aevum-time
            15s ease-in-out infinite;
        }

        .an-aevum-portal__time-ring--1 {
          width: 98%;
          height: 98%;
          opacity: .5;
        }

        .an-aevum-portal__time-ring--2 {
          width: 78%;
          height: 78%;
          opacity: .6;
          animation-delay: -5s;
        }

        .an-aevum-portal__time-ring--3 {
          width: 57%;
          height: 57%;
          opacity: .7;
          animation-delay: -10s;
        }

        /* ==================================================
           12. NEW ENTRANCE SCULPTURE

           Continuous whole-object movement.
           All geometry remains inside the original
           icon footprint.
        ================================================== */

        .an-aevum-portal__sculpture {
          position: absolute;
          z-index: 10;
          top: 45%;
          left: 50%;
          display: block;
          width: 100%;
          aspect-ratio: 600 / 480;
          transform: translate(-50%,-50%);
          pointer-events: none;
          filter:
            drop-shadow(
              0 0 22px rgba(255,255,255,.055)
            );
          animation:
            an-aevum-sculpture-float
            13s ease-in-out infinite;
        }

        .an-aevum-portal__art {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* ==================================================
           13. WHOLE-OBJECT ROTATION

           The entire sculptural assembly rotates
           continuously around its visual center.

           Slow rotation preserves a quiet,
           architectural appearance.
        ================================================== */

        .an-aevum-portal__continuum {
          transform-origin: 300px 228px;
          transform-box: view-box;
          animation:
            an-aevum-continuum-rotation
            110s linear infinite;
          will-change: transform;
        }

        /* ==================================================
           14. ASYMMETRIC ORBITAL MOVEMENT

           Independent motion prevents the object
           from appearing mechanically rigid.
        ================================================== */

        .an-aevum-portal__orbit-back {
          transform-origin: 300px 228px;
          transform-box: view-box;
          animation:
            an-aevum-orbit-back
            44s linear infinite;
        }

        .an-aevum-portal__orbit-front {
          transform-origin: 300px 228px;
          transform-box: view-box;
          animation:
            an-aevum-orbit-front
            56s linear infinite reverse;
        }

        /* ==================================================
           15. TRANSPARENT TEMPORAL MOTION

           The temporal layers rotate independently
           within the transparent black sphere.
        ================================================== */

        .an-aevum-portal__temporal {
          transform-origin: 300px 228px;
          transform-box: view-box;
          animation:
            an-aevum-temporal-rotation
            72s linear infinite;
        }

        /* ==================================================
           16. PERMANENT INQUIRY LIGHT
        ================================================== */

        .an-aevum-portal__heart {
          transform-origin: 300px 228px;
          transform-box: view-box;
          filter:
            drop-shadow(
              0 0 7px rgba(255,255,255,.72)
            );
          animation:
            an-aevum-heart
            8s ease-in-out infinite;
        }

        /* ==================================================
           17. FIVE DOMAINS — PRESERVED
        ================================================== */

        .an-aevum-portal__domain {
          position: absolute;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,.3);
          font-size: 4px;
          font-weight: 620;
          letter-spacing: .11em;
          white-space: nowrap;
          pointer-events: none;
        }

        .an-aevum-portal__domain i {
          display: block;
          width: 5px;
          height: 5px;
          border:
            1px solid rgba(255,255,255,.32);
          border-radius: 50%;
          background:
            rgba(255,255,255,.08);
          box-shadow:
            0 0 9px rgba(255,255,255,.08);
          animation:
            an-aevum-node
            10s ease-in-out infinite;
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
           18. PERSISTENCE AXIS — PRESERVED
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
              rgba(255,255,255,.4),
              rgba(255,255,255,.14) 38%,
              transparent
            );
          box-shadow:
            0 0 12px rgba(255,255,255,.08);
        }

        .an-aevum-portal__axis-signal {
          position: absolute;
          top: 0;
          left: 50%;
          width: 3px;
          height: 3px;
          transform: translateX(-50%);
          border-radius: 50%;
          background:
            rgba(255,255,255,.9);
          box-shadow:
            0 0 10px rgba(255,255,255,.3);
          opacity: 0;
        }

        .an-aevum-portal__axis-signal--1 {
          animation:
            an-aevum-axis
            9s ease-in-out infinite;
        }

        .an-aevum-portal__axis-signal--2 {
          animation:
            an-aevum-axis
            9s ease-in-out infinite -4.5s;
        }

        /* ==================================================
           19. HORIZON — PRESERVED
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
            1px solid rgba(255,255,255,.12);
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
          transform:
            translate(-50%,-50%);
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,.1),
              transparent 74%
            );
          filter: blur(12px);
        }

        /* ==================================================
           20. BOUNDARIES — PRESERVED
        ================================================== */

        .an-aevum-portal__boundary {
          position: absolute;
          z-index: 20;
          bottom: 10%;
          color:
            rgba(255,255,255,.14);
          font-size: 4px;
          font-weight: 600;
          letter-spacing: .16em;
          pointer-events: none;
        }

        .an-aevum-portal__boundary--origin {
          left: 5%;
        }

        .an-aevum-portal__boundary--continuity {
          right: 5%;
        }

        /* ==================================================
           21. ENTRY LABEL — PRESERVED
        ================================================== */

        .an-aevum-portal__tap {
          position: absolute;
          z-index: 30;
          bottom: 0;
          left: 50%;
          max-width:
            calc(100% - 16px);
          transform:
            translateX(-50%);
          color:
            rgba(255,255,255,.26);
          font-size: 7px;
          font-weight: 500;
          letter-spacing: .12em;
          white-space: nowrap;
          transition:
            color .4s ease,
            transform .4s ease;
        }

        /* ==================================================
           22. FOOTER — PRESERVED
        ================================================== */

        .an-aevum-portal__footer {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          gap:
            clamp(9px,1.4vw,16px);
          width: 100%;
          padding-top: 18px;
          border-top:
            1px solid rgba(255,255,255,.035)
            !important;
          color:
            rgba(255,255,255,.2);
          text-align: center;
          transition:
            opacity .45s ease;
        }

        .an-aevum-portal__footer > span {
          font-size: 5px;
          font-weight: 610;
          letter-spacing: .15em;
          white-space: nowrap;
        }

        .an-aevum-portal__footer > i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background:
            rgba(255,255,255,.14);
        }

        .an-aevum-portal__footer > small {
          color:
            rgba(255,255,255,.16);
          font-size: 5px;
          letter-spacing: .11em;
        }

        /* ==================================================
           23. ENTERING — PRESERVED
        ================================================== */

        .an-aevum-portal--entering
        .an-aevum-portal__object {
          transform: scale(.82);
          opacity: .12;
          filter:
            brightness(.4)
            blur(2px);
        }

        .an-aevum-portal--entering
        .an-aevum-portal__canvas {
          opacity: 0;
          transform: scale(.98);
          filter: blur(7px);
        }

        .an-aevum-portal--entering
        .an-aevum-portal__footer {
          opacity: 0;
        }

        /* ==================================================
           24. EXISTING ANIMATIONS — PRESERVED
        ================================================== */

        @keyframes an-aevum-breathe {
          0%,100% {
            opacity: .36;
            transform:
              translateX(-50%)
              scale(.94);
          }
          50% {
            opacity: .76;
            transform:
              translateX(-50%)
              scale(1.07);
          }
        }

        @keyframes an-aevum-time {
          0%,100% {
            opacity: .35;
          }
          50% {
            opacity: .75;
          }
        }

        @keyframes an-aevum-node {
          0%,100% {
            opacity: .3;
            transform: scale(.8);
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
            opacity: .85;
          }
          75% {
            opacity: .4;
          }
          100% {
            top: 94%;
            opacity: 0;
          }
        }

        /* ==================================================
           25. NEW WHOLE-SCULPTURE ANIMATIONS
        ================================================== */

        @keyframes an-aevum-sculpture-float {
          0%,100% {
            transform:
              translate(-50%,-50%)
              translateY(3px)
              scale(.987);
          }

          50% {
            transform:
              translate(-50%,-50%)
              translateY(-5px)
              scale(1.012);
          }
        }

        @keyframes an-aevum-continuum-rotation {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes an-aevum-orbit-back {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes an-aevum-orbit-front {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes an-aevum-temporal-rotation {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes an-aevum-heart {
          0%,100% {
            opacity: .78;
            transform: scale(.86);
          }

          50% {
            opacity: 1;
            transform: scale(1.18);
          }
        }

        /* ==================================================
           26. HOVER — PRESERVED
        ================================================== */

        @media (hover:hover) and (pointer:fine) {

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__object {
            transform: scale(1.02);
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__sculpture {
            filter:
              drop-shadow(
                0 0 28px rgba(255,255,255,.13)
              );
          }

          .an-aevum-portal__object-button:hover
          .an-aevum-portal__tap {
            color:
              rgba(255,255,255,.5);
            transform:
              translateX(-50%)
              translateY(-2px);
          }

        }

        /* ==================================================
           27. MOBILE — PRESERVED
        ================================================== */

        @media (max-width:700px) {

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
            padding:
              20px 18px 17px;
            overflow: hidden;
          }

          .an-aevum-portal__identity > span {
            font-size: 7px;
            letter-spacing: .2em;
          }

          .an-aevum-portal__identity > small {
            margin-top: -1px;
            font-size: 4.5px;
            letter-spacing: .1em;
          }

          .an-aevum-portal__experience {
            min-height: 0;
            padding: 16px 0 10px;
            overflow: visible;
          }

          .an-aevum-portal__eyebrow {
            font-size: 5px;
            letter-spacing: .18em;
          }

          .an-aevum-portal__statement h2 {
            width: 100%;
            max-width: 100%;
            padding: 0 4px;
            margin-top: 8px;
            font-size:
              clamp(34px,10.3vw,48px);
            line-height: .96;
            letter-spacing: -.052em;
          }

          .an-aevum-portal__statement p {
            margin-top: 9px;
            font-size: 6px;
            line-height: 1.55;
          }

          .an-aevum-portal__object-button {
            width: min(100%,390px);
            max-width: 100%;
            margin-top: 5px;
          }

          .an-aevum-portal__object {
            width: min(100%,340px);
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
            max-width:
              calc(100% - 16px);
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 5.5px;
            letter-spacing: .1em;
          }

          .an-aevum-portal__footer {
            gap: 8px;
            padding-top: 13px;
            overflow: hidden;
          }

          .an-aevum-portal__footer > span {
            font-size: 4.5px;
            letter-spacing: .12em;
          }

          .an-aevum-portal__footer > small {
            display: none;
          }

        }

        /* ==================================================
           28. SHORT MOBILE — PRESERVED
        ================================================== */

        @media (max-width:700px) and (max-height:720px) {

          .an-aevum-portal__canvas {
            height:
              calc(100svh - 30px);
            padding:
              17px 17px 14px;
          }

          .an-aevum-portal__experience {
            padding: 9px 0 6px;
          }

          .an-aevum-portal__statement h2 {
            font-size:
              clamp(31px,9.3vw,42px);
          }

          .an-aevum-portal__object-button {
            margin-top: 0;
          }

          .an-aevum-portal__object {
            width: min(100%,292px);
          }

          .an-aevum-portal__footer {
            padding-top: 10px;
          }

        }

        /* ==================================================
           29. SMALL MOBILE — PRESERVED
        ================================================== */

        @media (max-width:430px) {

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
            font-size:
              clamp(32px,10.1vw,43px);
          }

          .an-aevum-portal__object {
            width: min(100%,302px);
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
           30. VERY SMALL MOBILE — PRESERVED
        ================================================== */

        @media (max-width:360px) {

          .an-aevum-portal__canvas {
            padding: 16px 13px 14px;
          }

          .an-aevum-portal__identity > small {
            display: none;
          }

          .an-aevum-portal__statement h2 {
            font-size:
              clamp(30px,9.7vw,38px);
          }

          .an-aevum-portal__object {
            width: min(100%,275px);
          }

          .an-aevum-portal__boundary {
            display: none;
          }

          .an-aevum-portal__footer > i {
            display: none;
          }

        }

        /* ==================================================
           31. FULLSCREEN TRANSITION — PRESERVED
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
            opacity .2s ease,
            visibility 0s linear 1.2s;
        }

        .an-aevum-transition--active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition:
            opacity .2s ease;
        }

        .an-aevum-transition__space {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse at 50% 45%,
              rgba(19,20,22,.99),
              rgba(3,3,4,.998) 48%,
              #000 84%
            );
          opacity: 0;
          transform: scale(1.05);
          transition:
            opacity .45s ease,
            transform 1.1s cubic-bezier(.16,.78,.18,1);
        }

        .an-aevum-transition__stars {
          position: absolute;
          inset: -8%;
          opacity: 0;
          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.34) 0 .5px,
              transparent .85px
            );
          background-size: 83px 83px;
          transform: scale(.88);
          transition:
            opacity .42s ease,
            transform 1.1s cubic-bezier(.16,.78,.18,1);
        }

        .an-aevum-transition__field {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          opacity: 0;
          transform: scale(.5);
          transition:
            opacity .4s ease,
            transform 1.05s cubic-bezier(.16,.78,.18,1);
        }

        .an-aevum-transition__field > span {
          position: absolute;
          border:
            1px solid rgba(255,255,255,.09);
          border-radius: 50%;
        }

        .an-aevum-transition__field > span:nth-child(1) {
          width: min(78vw,900px);
          aspect-ratio: 1;
          transform:
            rotateX(64deg)
            rotate(-18deg);
        }

        .an-aevum-transition__field > span:nth-child(2) {
          width: min(58vw,680px);
          aspect-ratio: 1;
          transform:
            rotateY(62deg)
            rotate(24deg);
        }

        .an-aevum-transition__field > span:nth-child(3) {
          width: min(38vw,460px);
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
              rgba(255,255,255,.3),
              transparent
            );
          opacity: 0;
          transition:
            opacity .35s ease .2s;
        }

        .an-aevum-transition__core {
          position: absolute;
          z-index: 15;
          top: 50%;
          left: 50%;
          display: grid;
          place-items: center;
          width: min(38vw,350px);
          aspect-ratio: 1;
          transform:
            translate(-50%,-50%)
            scale(.45);
          opacity: 0;
          transition:
            opacity .35s ease,
            transform 1.08s cubic-bezier(.16,.78,.18,1);
        }

        .an-aevum-transition__shell {
          position: absolute;
          inset: 0;
          border:
            1px solid rgba(255,255,255,.24);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 40% 28%,
              rgba(255,255,255,.09),
              rgba(7,8,10,.86) 48%,
              rgba(0,0,0,.98) 82%
            );
          box-shadow:
            inset 0 0 45px rgba(255,255,255,.04),
            0 0 55px rgba(255,255,255,.035);
        }

        .an-aevum-transition__shell::after {
          content: "";
          position: absolute;
          top: 50%;
          left: -13%;
          width: 126%;
          height: 35%;
          border:
            1px solid rgba(255,255,255,.24);
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
          background:
            rgba(255,255,255,.94);
          box-shadow:
            0 0 14px rgba(255,255,255,.48),
            0 0 48px rgba(255,255,255,.14);
        }

        .an-aevum-transition__copy {
          position: absolute;
          z-index: 30;
          bottom:
            clamp(38px,7vh,76px);
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          width:
            calc(100% - 32px);
          transform:
            translate(-50%,8px);
          opacity: 0;
          text-align: center;
          transition:
            opacity .36s ease .34s,
            transform .5s ease .34s;
        }

        .an-aevum-transition__copy > span {
          color:
            rgba(248,249,250,.78);
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size:
            clamp(27px,4vw,46px);
          font-weight: 400;
          letter-spacing: .19em;
        }

        .an-aevum-transition__copy > small {
          color:
            rgba(225,228,231,.38);
          font-size: 9px;
          letter-spacing: .1em;
        }

        /* ==================================================
           32. ACTIVE TRANSITION — PRESERVED
        ================================================== */

        .an-aevum-transition--active
        .an-aevum-transition__space {
          opacity: 1;
          transform: scale(1);
        }

        .an-aevum-transition--active
        .an-aevum-transition__stars {
          opacity: .2;
          transform: scale(1.14);
        }

        .an-aevum-transition--active
        .an-aevum-transition__field {
          opacity: .8;
          transform: scale(1.16);
        }

        .an-aevum-transition--active
        .an-aevum-transition__axis {
          opacity: .75;
        }

        .an-aevum-transition--active
        .an-aevum-transition__core {
          opacity: 1;
          transform:
            translate(-50%,-50%)
            scale(1.45);
        }

        .an-aevum-transition--active
        .an-aevum-transition__copy {
          opacity: 1;
          transform:
            translate(-50%,0);
        }

        /* ==================================================
           33. MOBILE TRANSITION — PRESERVED
        ================================================== */

        @media (max-width:700px) {

          .an-aevum-transition__core {
            width: min(58vw,290px);
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
           34. REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion:reduce) {

          .an-aevum-portal__aura,
          .an-aevum-portal__time-ring,
          .an-aevum-portal__domain i,
          .an-aevum-portal__axis-signal,
          .an-aevum-portal__sculpture,
          .an-aevum-portal__continuum,
          .an-aevum-portal__orbit-back,
          .an-aevum-portal__orbit-front,
          .an-aevum-portal__temporal,
          .an-aevum-portal__heart {
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
            transition-duration: .12s !important;
            transition-delay: 0s !important;
          }

        }

      `}</style>
    </>
  );
}