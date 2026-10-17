"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA / PERMANENT INQUIRY

   CIVILIZATION AS AN OPEN, CORRECTABLE SYSTEM

   HOME OWNS:
   - Outer obsidian glass
   - HOME section geometry
   - Vertical page scrolling
   - HOME navigation

   PORTAL OWNS:
   - Inquiry identity
   - Central question
   - Civilization evolution symbol
   - Entry interaction
   - Fullscreen transition

   PRINCIPLES:
   - Reality remains independent of representation.
   - Scientific and technological capability can evolve.
   - Civilization must remain observable and correctable.
   - No inner vertical scroll container.
   - No additional HOME glass surface.
   - Reduced-motion accessibility.
========================================================== */

const DESTINATION = "/humanity-responsibility";

const INQUIRY_TITLE =
  "Can Civilization Advance Without Losing the Capacity to Correct Itself?";

const INQUIRY_SUBTITLE =
  "Scientific discovery, technological capability, and civilization must evolve without losing the ability to question, correct, and recover.";

const INQUIRY_SEQUENCE = [
  "DISCOVERY",
  "CAPABILITY",
  "CIVILIZATION",
  "CORRECTION",
] as const;

/* ==========================================================
   CIVILIZATION EVOLUTION SYMBOL

   CENTER:
   Reality and the limits of representation.

   INNER STRUCTURE:
   Scientific discovery and reproducibility.

   INTERCONNECTED ORBITS:
   Technology, intelligence, infrastructure, life.

   OPEN OUTER ARC:
   Civilization is never a finished system.

   RETURN PATH:
   Observation, correction, recovery.

   No human silhouette.
   No background rectangle.
   No additional glass layer.
========================================================== */

function CivilizationEvolutionSymbol({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const orbitGradient = `hrp-orbit-${id}`;
  const coreGradient = `hrp-core-${id}`;
  const axisGradient = `hrp-axis-${id}`;

  return (
    <svg
      className={[
        "hrp-symbol",
        transition ? "hrp-symbol--transition" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={orbitGradient}
          x1="70"
          y1="64"
          x2="332"
          y2="338"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".13"
          />
          <stop
            offset="34%"
            stopColor="#F4F4F2"
            stopOpacity=".75"
          />
          <stop
            offset="65%"
            stopColor="#BFC3C5"
            stopOpacity=".39"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity=".10"
          />
        </linearGradient>

        <linearGradient
          id={axisGradient}
          x1="200"
          y1="46"
          x2="200"
          y2="354"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
          <stop
            offset="48%"
            stopColor="#FFFFFF"
            stopOpacity=".56"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </linearGradient>

        <radialGradient
          id={coreGradient}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(200 200) rotate(90) scale(78)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".16"
          />
          <stop
            offset="45%"
            stopColor="#FFFFFF"
            stopOpacity=".045"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* REALITY / LOCAL LIGHT */}

      <circle
        className="hrp-symbol__core-light"
        cx="200"
        cy="200"
        r="78"
        fill={`url(#${coreGradient})`}
      />

      {/* CIVILIZATION REFERENCE RING */}

      <circle
        className="hrp-symbol__reference-ring"
        cx="200"
        cy="200"
        r="151"
        stroke="#F0F0EF"
        strokeOpacity=".18"
        strokeWidth=".8"
        strokeDasharray="1 8"
      />

      {/* INTERCONNECTED SCIENTIFIC SYSTEMS */}

      <g
        className="hrp-symbol__orbits"
        stroke={`url(#${orbitGradient})`}
        strokeWidth="1.15"
      >
        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="63"
          transform="rotate(-37 200 200)"
        />

        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="63"
          transform="rotate(37 200 200)"
        />

        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="63"
          transform="rotate(90 200 200)"
        />
      </g>

      {/* SCIENTIFIC REPRODUCIBILITY RINGS */}

      <g className="hrp-symbol__inner-rings">
        <circle
          cx="200"
          cy="200"
          r="49"
          stroke="#E6E8E8"
          strokeOpacity=".43"
          strokeWidth=".85"
        />

        <circle
          cx="200"
          cy="200"
          r="31"
          stroke="#E6E8E8"
          strokeOpacity=".22"
          strokeWidth=".7"
          strokeDasharray="2 6"
        />
      </g>

      {/* OBSERVATION AXES */}

      <g
        className="hrp-symbol__axes"
        stroke={`url(#${axisGradient})`}
        strokeWidth=".8"
        strokeLinecap="round"
      >
        <path d="M200 45 V355" />
        <path d="M45 200 H355" />
      </g>

      {/* CORRECTABLE CIVILIZATION ARC */}

      <g
        className="hrp-symbol__open-arc"
        stroke={`url(#${orbitGradient})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M86 111 A148 148 0 1 1 314 111"
          strokeWidth="1.65"
        />

        <path
          d="M99 99 L86 111 L84 94"
          strokeWidth="1.1"
          opacity=".82"
        />
      </g>

      {/* STRUCTURAL CORE */}

      <g className="hrp-symbol__structure">
        <path
          d="M200 154 L246 200 L200 246 L154 200 Z"
          stroke="#F4F4F2"
          strokeOpacity=".62"
          strokeWidth="1.1"
        />

        <path
          d="M200 168 L232 200 L200 232 L168 200 Z"
          stroke="#F4F4F2"
          strokeOpacity=".25"
          strokeWidth=".75"
        />

        <path
          d="M200 154 V246 M154 200 H246"
          stroke="#FFFFFF"
          strokeOpacity=".16"
          strokeWidth=".7"
        />
      </g>

      {/* CORRECTION / RETURN PATH */}

      <g
        className="hrp-symbol__return-path"
        stroke="#F2F2F0"
        strokeOpacity=".45"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M174 200 A26 26 0 1 1 200 226"
          strokeWidth="1.05"
        />

        <path
          d="M193 221 L200 226 L193 231"
          strokeWidth=".9"
        />
      </g>

      {/* REALITY REFERENCE */}

      <circle
        className="hrp-symbol__core-halo"
        cx="200"
        cy="200"
        r="10"
        fill="#FFFFFF"
        fillOpacity=".075"
      />

      <circle
        className="hrp-symbol__core"
        cx="200"
        cy="200"
        r="2.5"
        fill="#FFFFFF"
      />

      {/* INTERCONNECTED SYSTEM NODES */}

      <g
        className="hrp-symbol__points"
        fill="#F4F4F2"
      >
        <circle cx="200" cy="49" r="1.6" opacity=".9" />
        <circle cx="200" cy="351" r="1.6" opacity=".9" />
        <circle cx="49" cy="200" r="1.5" opacity=".7" />
        <circle cx="351" cy="200" r="1.5" opacity=".7" />

        <circle cx="86" cy="111" r="2" opacity=".95" />
        <circle cx="314" cy="111" r="2" opacity=".95" />

        <circle cx="101" cy="299" r="1.6" opacity=".75" />
        <circle cx="299" cy="299" r="1.6" opacity=".75" />

        <circle cx="200" cy="151" r="1.5" opacity=".75" />
        <circle cx="249" cy="200" r="1.5" opacity=".75" />
        <circle cx="200" cy="249" r="1.5" opacity=".75" />
        <circle cx="151" cy="200" r="1.5" opacity=".75" />
      </g>

      {/* TIME / GENERATIONAL MARKERS */}

      <g
        className="hrp-symbol__time-marks"
        stroke="#E9EAE9"
        strokeOpacity=".32"
        strokeLinecap="round"
      >
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * Math.PI) / 6;

          const inner = index % 3 === 0 ? 165 : 170;
          const outer = 175;

          const x1 = 200 + Math.sin(angle) * inner;
          const y1 = 200 - Math.cos(angle) * inner;

          const x2 = 200 + Math.sin(angle) * outer;
          const y2 = 200 - Math.cos(angle) * outer;

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={index % 3 === 0 ? 1 : 0.65}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ==========================================================
   FULLSCREEN ENTRY TRANSITION
========================================================== */

function ResponsibilityEntryTransition() {
  return (
    <div
      className="hrp-entry hrp-entry--active"
      aria-hidden="true"
    >
      <div className="hrp-entry__background" />

      <div className="hrp-entry__rings">
        <span />
        <span />
        <span />
      </div>

      <div className="hrp-entry__symbol">
        <CivilizationEvolutionSymbol transition />
      </div>

      <div className="hrp-entry__copy">
        <span>ARCHENOVA / PERMANENT INQUIRY</span>

        <strong>{INQUIRY_TITLE}</strong>

        <small>
          Civilization must remain open to correction.
        </small>
      </div>
    </div>
  );
}

/* ==========================================================
   PERMANENT INQUIRY PORTAL
========================================================== */

export default function HumanityResponsibilityPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => setReducedMotion(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);

      return () => {
        media.removeEventListener("change", update);
      };
    }

    media.addListener(update);

    return () => media.removeListener(update);
  }, []);

  const enterInquiry = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      router.push(DESTINATION);
    }, reducedMotion ? 100 : 1150);
  }, [reducedMotion, router]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <section
        className={[
          "hrp-portal",
          entering ? "hrp-portal--entering" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="hrp-portal-title"
      >
        <div className="hrp-portal__stage">
          {/* HEADER */}

          <header className="hrp-portal__header">
            <div className="hrp-portal__identity">
              <span>
                ARCHENOVA / PERMANENT INQUIRY
              </span>

              <small>
                THE OPEN QUESTION OF CIVILIZATION
              </small>
            </div>
          </header>

          {/* CENTRAL EXPERIENCE */}

          <div className="hrp-portal__experience">
            <div className="hrp-portal__statement">
              <span className="hrp-portal__eyebrow">
                SCIENCE / TECHNOLOGY / CIVILIZATION
              </span>

              <h2 id="hrp-portal-title">
                Can Civilization Advance
                <br />
                Without Losing the Capacity
                <br />
                to Correct Itself?
              </h2>

              <p className="hrp-portal__description">
                {INQUIRY_SUBTITLE}
              </p>
            </div>

            <button
              type="button"
              className="hrp-portal__symbol-button"
              onClick={enterInquiry}
              disabled={entering}
              aria-label={`Explore ArcheNova's permanent inquiry: ${INQUIRY_TITLE}`}
            >
              <span className="hrp-portal__symbol-space">
                <span
                  className="hrp-portal__symbol-object"
                  aria-hidden="true"
                >
                  <CivilizationEvolutionSymbol />
                </span>

                <span className="hrp-portal__tap-hint">
                  <span>ENTER THE INQUIRY</span>

                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M3 8 H12 M8.5 4.5 L12 8 L8.5 11.5"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </button>

            <div className="hrp-portal__sequence">
              {INQUIRY_SEQUENCE.map((item, index) => (
                <span
                  className="hrp-portal__sequence-item"
                  key={item}
                >
                  {index > 0 && (
                    <i aria-hidden="true" />
                  )}

                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* FOOTER */}

          <footer className="hrp-portal__footer">
            <span>ARCHENOVA / CIVILIZATION</span>

            <i aria-hidden="true" />

            <span>
              DISCOVER / BUILD / QUESTION / CORRECT
            </span>
          </footer>
        </div>
      </section>

      {mounted &&
        entering &&
        createPortal(
          <ResponsibilityEntryTransition />,
          document.body,
        )}

      <style jsx global>{`
        /* ==================================================
           BASE / SCROLL-SAFE

           No internal vertical scroll.
           No scroll trapping.
           No additional glass.
        ================================================== */

        .hrp-portal,
        .hrp-portal *,
        .hrp-portal *::before,
        .hrp-portal *::after,
        .hrp-entry,
        .hrp-entry *,
        .hrp-entry *::before,
        .hrp-entry *::after {
          box-sizing: border-box;
        }

        .hrp-portal {
          position: relative;
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height: auto;
          min-height: 0;
          max-height: none;

          margin: 0;
          padding: 0;

          overflow: visible;
          overscroll-behavior: auto;

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;
          background-image: none;

          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          color: rgba(248, 248, 247, 0.94);
        }

        .hrp-portal::before,
        .hrp-portal::after {
          content: none;
          display: none;
        }

        .hrp-portal button {
          font: inherit;
        }

        /* ==================================================
           STAGE / NATURAL DOCUMENT FLOW
        ================================================== */

        .hrp-portal__stage {
          position: relative;

          display: grid;
          grid-template-rows: auto auto auto;

          width: 100%;
          min-width: 0;

          height: auto;
          min-height: 0;
          max-height: none;

          margin: 0;

          padding:
            clamp(24px, 3vw, 44px)
            clamp(20px, 4vw, 64px)
            clamp(22px, 3vw, 40px);

          overflow: visible;

          background: transparent;
          border: 0;
          box-shadow: none;

          transition:
            opacity 0.4s ease,
            transform 0.55s ease,
            filter 0.5s ease;
        }

        .hrp-portal__stage::before,
        .hrp-portal__stage::after {
          content: none;
          display: none;
        }

        /* ==================================================
           HEADER
        ================================================== */

        .hrp-portal__header {
          position: relative;
          z-index: 2;

          display: flex;
          justify-content: center;

          width: 100%;
          min-width: 0;
        }

        .hrp-portal__identity {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          text-align: center;
        }

        .hrp-portal__identity > span {
          color: rgba(255, 255, 255, 0.86);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.23em;
        }

        .hrp-portal__identity > small {
          color: rgba(255, 255, 255, 0.39);

          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.16em;
        }

        /* ==================================================
           EXPERIENCE
        ================================================== */

        .hrp-portal__experience {
          position: relative;
          z-index: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;

          height: auto;
          min-height: 0;
          max-height: none;

          padding:
            clamp(38px, 5vw, 70px)
            0
            clamp(34px, 4vw, 58px);

          overflow: visible;
          overscroll-behavior: auto;

          background: transparent;
        }

        .hrp-portal__statement {
          position: relative;
          z-index: 2;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;

          width: 100%;
          min-width: 0;

          text-align: center;
        }

        .hrp-portal__eyebrow {
          color: rgba(235, 235, 233, 0.43);

          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
        }

        .hrp-portal__statement h2 {
          width: 100%;
          max-width: 1080px;

          margin: 0;

          color: rgba(251, 251, 250, 0.97);

          font-size: clamp(34px, 4.2vw, 62px);
          font-weight: 300;
          line-height: 1.12;
          letter-spacing: -0.052em;

          text-align: center;
          text-wrap: balance;
        }

        .hrp-portal__description {
          max-width: 690px;

          margin: 0;

          color: rgba(245, 245, 243, 0.55);

          font-size: clamp(12px, 1.1vw, 15px);
          font-weight: 400;
          line-height: 1.85;
          letter-spacing: 0.005em;

          text-align: center;
          text-wrap: pretty;
        }

        /* ==================================================
           SYMBOL / INTERACTION
        ================================================== */

        .hrp-portal__symbol-button {
          position: relative;
          z-index: 3;

          display: block;

          width: min(100%, 340px);
          min-width: 0;

          margin: clamp(18px, 2vw, 28px) auto 0;
          padding: 0;

          border: 0;
          outline: 0;

          background: transparent;
          box-shadow: none;

          color: inherit;
          cursor: pointer;

          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;

          touch-action: manipulation;
        }

        .hrp-portal__symbol-button:disabled {
          cursor: default;
        }

        .hrp-portal__symbol-button:focus-visible {
          outline: 1px solid rgba(245, 245, 243, 0.75);
          outline-offset: 7px;
          border-radius: 12px;
        }

        .hrp-portal__symbol-space {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 310px);
          aspect-ratio: 1.1;

          margin: 0 auto;

          background: transparent;
          border: 0;
          box-shadow: none;

          transition:
            transform 0.8s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hrp-portal__symbol-object {
          position: relative;
          z-index: 1;

          display: block;

          width: 100%;
          height: 100%;

          animation:
            hrp-symbol-float 13s ease-in-out infinite;
        }

        .hrp-symbol {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          filter:
            drop-shadow(
              0 0 9px rgba(255, 255, 255, 0.07)
            );
        }

        .hrp-symbol__core-light {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            hrp-core-light-breathe
            10s ease-in-out infinite;
        }

        .hrp-symbol__orbits {
          transform-origin: 200px 200px;

          animation:
            hrp-orbits-breathe
            16s ease-in-out infinite;
        }

        .hrp-symbol__inner-rings {
          transform-origin: 200px 200px;

          animation:
            hrp-inner-rings-breathe
            12s ease-in-out infinite;
        }

        .hrp-symbol__open-arc {
          animation:
            hrp-arc-breathe
            11s ease-in-out infinite;
        }

        .hrp-symbol__structure {
          animation:
            hrp-structure-breathe
            9s ease-in-out infinite;
        }

        .hrp-symbol__core {
          animation:
            hrp-core-breathe
            6s ease-in-out infinite;
        }

        .hrp-symbol__points {
          animation:
            hrp-points-breathe
            8s ease-in-out infinite;
        }

        /* ==================================================
           ENTRY HINT
        ================================================== */

        .hrp-portal__tap-hint {
          position: absolute;
          z-index: 2;

          bottom: -8px;
          left: 50%;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.52);

          font-size: 9px;
          font-weight: 550;
          letter-spacing: 0.16em;

          white-space: nowrap;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .hrp-portal__tap-hint svg {
          display: block;

          width: 14px;
          height: 14px;

          flex: 0 0 auto;

          transition: transform 0.3s ease;
        }

        /* ==================================================
           CIVILIZATION SEQUENCE
        ================================================== */

        .hrp-portal__sequence {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          gap: 12px;

          width: 100%;
          margin-top: 24px;

          color: rgba(255, 255, 255, 0.43);

          font-size: 8px;
          font-weight: 550;
          letter-spacing: 0.12em;
        }

        .hrp-portal__sequence-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .hrp-portal__sequence-item i {
          display: block;

          width: 24px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(245, 245, 243, 0.36),
              transparent
            );
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .hrp-portal__footer {
          position: relative;
          z-index: 2;

          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          gap: 12px;

          width: 100%;

          padding-top: 18px;

          border-top:
            1px solid rgba(255, 255, 255, 0.055);

          color: rgba(255, 255, 255, 0.36);
        }

        .hrp-portal__footer > span {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.14em;

          text-align: center;
        }

        .hrp-portal__footer > i {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.22);
        }

        /* ==================================================
           FULLSCREEN ENTRY TRANSITION
        ================================================== */

        .hrp-entry {
          position: fixed;
          inset: 0;

          z-index: 2147483647;

          display: grid;
          place-items: center;

          width: 100%;
          height: 100dvh;

          margin: 0;
          padding: 0;

          overflow: hidden;

          opacity: 1;
          visibility: visible;

          pointer-events: none;

          background: #050505;
        }

        .hrp-entry__background {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              ellipse at 50% 45%,
              #181818 0%,
              #0B0B0B 45%,
              #030303 85%
            );

          opacity: 0;
        }

        .hrp-entry__rings {
          position: absolute;

          top: 50%;
          left: 50%;

          width: min(85vmin, 680px);
          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          pointer-events: none;
        }

        .hrp-entry__rings > span {
          position: absolute;
          inset: 10%;

          display: block;

          border:
            1px solid rgba(245, 245, 243, 0.19);

          border-radius: 50%;

          opacity: 0;

          transform: scale(0.5);
        }

        .hrp-entry__rings > span:nth-child(2) {
          inset: 24%;

          border-color:
            rgba(245, 245, 243, 0.28);
        }

        .hrp-entry__rings > span:nth-child(3) {
          inset: 37%;

          border-color:
            rgba(245, 245, 243, 0.35);
        }

        .hrp-entry__symbol {
          position: absolute;

          top: 44%;
          left: 50%;

          width: min(64vmin, 440px);
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.7);

          filter: blur(8px);

          pointer-events: none;
        }

        .hrp-entry__copy {
          position: absolute;
          z-index: 3;

          bottom: clamp(35px, 8vh, 90px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;

          width: min(100%, 800px);

          padding: 0 20px;

          opacity: 0;

          transform: translate(-50%, 8px);

          text-align: center;
        }

        .hrp-entry__copy > span {
          color: rgba(245, 245, 243, 0.64);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.2em;
        }

        .hrp-entry__copy > strong {
          color: rgba(250, 250, 249, 0.97);

          font-size: clamp(21px, 3.2vw, 36px);
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.04em;
        }

        .hrp-entry__copy > small {
          color: rgba(245, 245, 243, 0.55);

          font-size: 10px;
          line-height: 1.6;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .hrp-portal--entering .hrp-portal__stage {
          opacity: 0;

          transform: scale(0.975);

          filter:
            brightness(0.4)
            blur(7px);
        }

        .hrp-entry--active .hrp-entry__background {
          animation:
            hrp-entry-background
            1.15s ease forwards;
        }

        .hrp-entry--active .hrp-entry__rings > span {
          animation:
            hrp-entry-ring
            1.15s ease-out forwards;
        }

        .hrp-entry--active
        .hrp-entry__rings > span:nth-child(2) {
          animation-delay: 0.1s;
        }

        .hrp-entry--active
        .hrp-entry__rings > span:nth-child(3) {
          animation-delay: 0.2s;
        }

        .hrp-entry--active .hrp-entry__symbol {
          animation:
            hrp-entry-symbol
            1.15s
            cubic-bezier(0.2, 0.75, 0.2, 1)
            forwards;
        }

        .hrp-entry--active .hrp-entry__copy {
          animation:
            hrp-entry-copy
            1.15s ease forwards;
        }

        /* ==================================================
           AMBIENT ANIMATIONS
        ================================================== */

        @keyframes hrp-symbol-float {
          0%, 100% {
            transform: translateY(2px);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes hrp-core-light-breathe {
          0%, 100% {
            opacity: 0.55;
            transform: scale(0.97);
          }

          50% {
            opacity: 0.95;
            transform: scale(1.04);
          }
        }

        @keyframes hrp-orbits-breathe {
          0%, 100% {
            opacity: 0.72;
            transform: rotate(-1.5deg);
          }

          50% {
            opacity: 1;
            transform: rotate(1.5deg);
          }
        }

        @keyframes hrp-inner-rings-breathe {
          0%, 100% {
            opacity: 0.62;
            transform: scale(0.98);
          }

          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @keyframes hrp-arc-breathe {
          0%, 100% {
            opacity: 0.72;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes hrp-structure-breathe {
          0%, 100% {
            opacity: 0.78;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes hrp-core-breathe {
          0%, 100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes hrp-points-breathe {
          0%, 100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        /* ==================================================
           ENTRY ANIMATIONS
        ================================================== */

        @keyframes hrp-entry-background {
          0% {
            opacity: 0;
          }

          20%, 100% {
            opacity: 1;
          }
        }

        @keyframes hrp-entry-ring {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }

          35% {
            opacity: 0.55;
          }

          100% {
            opacity: 0;
            transform: scale(1.65);
          }
        }

        @keyframes hrp-entry-symbol {
          0% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.7);

            filter: blur(8px);
          }

          25% {
            opacity: 1;
            filter: blur(0);
          }

          70% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1.04);
          }

          100% {
            opacity: 0.15;

            transform:
              translate(-50%, -50%)
              scale(1.32);

            filter: blur(9px);
          }
        }

        @keyframes hrp-entry-copy {
          0%, 15% {
            opacity: 0;
            transform: translate(-50%, 8px);
          }

          38%, 82% {
            opacity: 1;
            transform: translate(-50%, 0);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -5px);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .hrp-portal__symbol-button:hover
          .hrp-portal__symbol-space {
            transform:
              translateY(-3px)
              scale(1.035);
          }

          .hrp-portal__symbol-button:hover
          .hrp-symbol {
            filter:
              drop-shadow(
                0 0 12px rgba(255, 255, 255, 0.14)
              );
          }

          .hrp-portal__symbol-button:hover
          .hrp-portal__tap-hint {
            color: rgba(255, 255, 255, 0.92);

            transform: translate(-50%, -2px);
          }

          .hrp-portal__symbol-button:hover
          .hrp-portal__tap-hint svg {
            transform: translateX(4px);
          }
        }

        /* ==================================================
           MOBILE / NATURAL PAGE SCROLL
        ================================================== */

        @media (max-width: 700px) {
          .hrp-portal {
            height: auto;
            min-height: 0;
            max-height: none;

            overflow: visible;
            overscroll-behavior: auto;
          }

          .hrp-portal__stage {
            grid-template-rows: auto auto auto;

            height: auto;
            min-height: 0;
            max-height: none;

            padding: 28px 18px 24px;

            overflow: visible;
          }

          .hrp-portal__identity {
            gap: 6px;
          }

          .hrp-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.16em;
          }

          .hrp-portal__identity > small {
            font-size: 7px;
            letter-spacing: 0.1em;
          }

          .hrp-portal__experience {
            height: auto;
            min-height: 0;
            max-height: none;

            padding: 44px 0 40px;

            overflow: visible;
            overscroll-behavior: auto;
          }

          .hrp-portal__statement {
            gap: 15px;
          }

          .hrp-portal__eyebrow {
            font-size: 7px;
            letter-spacing: 0.12em;
          }

          .hrp-portal__statement h2 {
            font-size: clamp(28px, 7vw, 39px);
            line-height: 1.12;
            letter-spacing: -0.05em;
          }

          .hrp-portal__statement h2 br {
            display: none;
          }

          .hrp-portal__description {
            max-width: 440px;

            font-size: 12px;
            line-height: 1.75;
          }

          .hrp-portal__symbol-button {
            width: min(100%, 290px);
            margin-top: 20px;
          }

          .hrp-portal__symbol-space {
            width: min(100%, 260px);
          }

          .hrp-portal__tap-hint {
            font-size: 8px;
            letter-spacing: 0.11em;
          }

          .hrp-portal__sequence {
            gap: 8px;
            margin-top: 22px;

            font-size: 7px;
            letter-spacing: 0.07em;
          }

          .hrp-portal__sequence-item {
            gap: 8px;
          }

          .hrp-portal__sequence-item i {
            width: 14px;
          }

          .hrp-portal__footer {
            gap: 8px;
            padding-top: 15px;
          }

          .hrp-portal__footer > span {
            font-size: 6px;
            letter-spacing: 0.09em;
          }

          .hrp-entry__symbol {
            width: min(74vw, 440px);
          }
        }

        @media (max-width: 430px) {
          .hrp-portal__stage {
            padding: 25px 15px 22px;
          }

          .hrp-portal__statement h2 {
            font-size: clamp(27px, 7.1vw, 34px);
          }

          .hrp-portal__symbol-space {
            width: min(100%, 240px);
          }

          .hrp-portal__sequence {
            column-gap: 7px;
            row-gap: 10px;
          }
        }

        @media (max-width: 360px) {
          .hrp-portal__stage {
            padding: 23px 12px 20px;
          }

          .hrp-portal__statement h2 {
            font-size: 25px;
          }

          .hrp-portal__symbol-space {
            width: min(100%, 215px);
          }

          .hrp-portal__sequence {
            font-size: 6px;
          }

          .hrp-portal__sequence-item i {
            width: 10px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .hrp-portal__symbol-object,
          .hrp-symbol__core-light,
          .hrp-symbol__orbits,
          .hrp-symbol__inner-rings,
          .hrp-symbol__open-arc,
          .hrp-symbol__structure,
          .hrp-symbol__core,
          .hrp-symbol__points {
            animation: none !important;
          }

          .hrp-portal__symbol-space,
          .hrp-portal__stage {
            transition: none !important;
          }

          .hrp-entry--active
          .hrp-entry__background,
          .hrp-entry--active
          .hrp-entry__rings > span,
          .hrp-entry--active
          .hrp-entry__symbol,
          .hrp-entry--active
          .hrp-entry__copy {
            animation: none !important;
          }

          .hrp-entry--active
          .hrp-entry__background {
            opacity: 1;
          }

          .hrp-entry--active
          .hrp-entry__symbol {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1);

            filter: none;
          }

          .hrp-entry--active
          .hrp-entry__copy {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}