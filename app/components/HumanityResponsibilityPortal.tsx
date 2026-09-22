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
   ARCHENOVA / HUMANITY RESPONSIBILITY PORTAL

   PERMANENT INQUIRY

   HOME OWNS:
   - The only visible outer glass surface
   - Card dimensions and positioning
   - HOME navigation

   PORTAL OWNS:
   - Header / central experience / footer
   - Responsibility symbol
   - Entry interaction and fullscreen transition

   DESIGN:
   - No blue full-card atmosphere
   - No additional glass surface
   - Neutral silver symbol with restrained illumination
   - Human agency remains the visual center
========================================================== */

const DESTINATION = "/humanity-responsibility";

/* ==========================================================
   RESPONSIBILITY SYMBOL

   HUMAN:
   The accountable agent.

   INTERSECTING ORBITS:
   Power and consequences across connected systems.

   OPEN OUTER ARC:
   Responsibility is never a completed question.

   MARKERS:
   Decisions persist across generations.

   The symbol has no background rectangle or glass layer.
========================================================== */

function ResponsibilitySymbol({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const humanGradient = `hrp-human-${id}`;
  const orbitGradient = `hrp-orbit-${id}`;
  const coreGradient = `hrp-core-${id}`;

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
          id={humanGradient}
          x1="148"
          y1="126"
          x2="252"
          y2="285"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".98"
          />
          <stop
            offset="52%"
            stopColor="#E0E2E4"
            stopOpacity=".91"
          />
          <stop
            offset="100%"
            stopColor="#9B9FA4"
            stopOpacity=".76"
          />
        </linearGradient>

        <linearGradient
          id={orbitGradient}
          x1="74"
          y1="64"
          x2="326"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".10"
          />
          <stop
            offset="33%"
            stopColor="#F5F5F4"
            stopOpacity=".54"
          />
          <stop
            offset="66%"
            stopColor="#D6D8D9"
            stopOpacity=".35"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity=".09"
          />
        </linearGradient>

        <radialGradient
          id={coreGradient}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(200 204) rotate(90) scale(57)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".085"
          />
          <stop
            offset="55%"
            stopColor="#FFFFFF"
            stopOpacity=".025"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* LOCAL LIGHT — INSIDE THE SYMBOL ONLY */}

      <circle
        className="hrp-symbol__core-light"
        cx="200"
        cy="204"
        r="57"
        fill={`url(#${coreGradient})`}
      />

      {/* GENERATIONAL REFERENCE RING */}

      <circle
        className="hrp-symbol__reference-ring"
        cx="200"
        cy="200"
        r="151"
        stroke="#F0F0EF"
        strokeOpacity=".13"
        strokeWidth=".75"
        strokeDasharray="1 9"
      />

      {/* TWO INTERSECTING SYSTEM ORBITS */}

      <g
        className="hrp-symbol__orbits"
        stroke={`url(#${orbitGradient})`}
        strokeWidth="1.15"
      >
        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="65"
          transform="rotate(-34 200 200)"
        />

        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="65"
          transform="rotate(34 200 200)"
        />
      </g>

      {/* QUIET VERTICAL AXIS */}

      <path
        className="hrp-symbol__axis"
        d="M200 67 V121 M200 279 V333"
        stroke="#ECEDEC"
        strokeOpacity=".19"
        strokeWidth=".8"
        strokeLinecap="round"
      />

      {/* OPEN RESPONSIBILITY ARC */}

      <g
        className="hrp-symbol__open-arc"
        stroke={`url(#${orbitGradient})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M84 113 A148 148 0 1 1 316 113"
          strokeWidth="1.55"
        />

        <path
          d="M97 102 L84 113 L82 96"
          strokeWidth="1.05"
          opacity=".72"
        />
      </g>

      {/* HUMAN PRESENCE */}

      <g
        className="hrp-symbol__human"
        stroke={`url(#${humanGradient})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="200"
          cy="158"
          r="13"
          strokeWidth="1.85"
        />

        <path
          d="
            M200 175
            C181 175 169 188 168 205

            M200 175
            C219 175 231 188 232 205

            M168 205
            L154 239

            M232 205
            L246 239

            M181 192
            L181 234
            L172 274

            M219 192
            L219 234
            L228 274

            M181 234
            Q200 244 219 234
          "
          strokeWidth="1.8"
        />

        <path
          d="
            M200 181
            V226

            M181 210
            Q200 218 219 210
          "
          strokeWidth=".8"
          opacity=".52"
        />
      </g>

      {/* ACCOUNTABILITY POINT */}

      <circle
        className="hrp-symbol__core-halo"
        cx="200"
        cy="205"
        r="8"
        fill="#FFFFFF"
        fillOpacity=".055"
      />

      <circle
        className="hrp-symbol__core"
        cx="200"
        cy="205"
        r="2"
        fill="#FFFFFF"
      />

      {/* CONSEQUENCE MARKERS */}

      <g
        className="hrp-symbol__points"
        fill="#F4F4F3"
      >
        <circle
          cx="200"
          cy="49"
          r="1.55"
          opacity=".85"
        />

        <circle
          cx="200"
          cy="351"
          r="1.55"
          opacity=".85"
        />

        <circle
          cx="84"
          cy="113"
          r="1.8"
          opacity=".9"
        />

        <circle
          cx="316"
          cy="113"
          r="1.8"
          opacity=".9"
        />

        <circle
          cx="76"
          cy="261"
          r="1.15"
          opacity=".46"
        />

        <circle
          cx="324"
          cy="261"
          r="1.15"
          opacity=".46"
        />
      </g>

      {/* GENERATIONAL TIME MARKERS */}

      <g
        className="hrp-symbol__time-marks"
        stroke="#E9EAE9"
        strokeOpacity=".31"
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
              strokeWidth={
                index % 3 === 0 ? 1 : 0.65
              }
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ==========================================================
   FULLSCREEN ENTRY TRANSITION

   This is intentionally separate from the HOME glass.
   It is mounted in document.body only when entering.
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
      </div>

      <div className="hrp-entry__symbol">
        <ResponsibilitySymbol transition />
      </div>

      <div className="hrp-entry__copy">
        <span>
          ARCHENOVA / PERMANENT INQUIRY
        </span>

        <strong>
          Can Humanity Remain Responsible
          <br />
          for the Power It Creates?
        </strong>

        <small>
          Capability must never outgrow responsibility.
        </small>
      </div>
    </div>
  );
}

/* ==========================================================
   PORTAL
========================================================== */

export default function HumanityResponsibilityPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [reducedMotion, setReducedMotion] =
    useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => {
      setReducedMotion(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);

      return () => {
        media.removeEventListener("change", update);
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);

  const enterInquiry = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      router.push(DESTINATION);
    }, reducedMotion ? 160 : 1250);
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
          {/* ROW 1 / HEADER */}

          <header className="hrp-portal__header">
            <div className="hrp-portal__identity">
              <span>
                ARCHENOVA / PERMANENT INQUIRY
              </span>

              <small>
                 A QUESTION WITHOUT AN EXPIRATION DATE
              </small>
            </div>
          </header>

          {/* ROW 2 / CENTRAL EXPERIENCE */}

          <div className="hrp-portal__experience">
            <div className="hrp-portal__statement">

              <h2 id="hrp-portal-title">
                Can Humanity Remain
                <br />
                Responsible for the
                <br />
                Power It Creates?
              </h2>
            </div>

            <button
              type="button"
              className="hrp-portal__symbol-button"
              onClick={enterInquiry}
              disabled={entering}
              aria-label="Explore ArcheNova's permanent inquiry: Can Humanity Remain Responsible for the Power It Creates?"
            >
              <span className="hrp-portal__symbol-space">
                <span
                  className="hrp-portal__symbol-object"
                  aria-hidden="true"
                >
                  <ResponsibilitySymbol />
                </span>

                <span className="hrp-portal__tap-hint">
                  <span>
                    EXPLORE THE QUESTION
                  </span>

                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M3 8 H12 M8.5 4.5 L12 8 L8.5 11.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </button>

            <div className="hrp-portal__sequence">
              <span>POWER</span>

              <i aria-hidden="true" />

              <span>RESPONSIBILITY</span>

              <i aria-hidden="true" />

              <span>GENERATIONS</span>
            </div>
          </div>

          {/* ROW 3 / FOOTER */}

          <footer className="hrp-portal__footer">
            <span>ARCHENOVA / HUMANITY</span>

            <i aria-hidden="true" />

            <span>
              CAPABILITY MUST NEVER OUTGROW RESPONSIBILITY
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
           BASE

           No card-level background, gradient,
           pseudo-glass, or blue overlay.
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

          display: flex;
          flex-direction: column;
          align-self: stretch;

          flex: 1 0 auto;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height: 100%;
          height: auto;

          margin: 0;
          padding: 0;

          overflow: hidden;

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

        .hrp-portal,
        .hrp-portal__stage,
        .hrp-portal__experience {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hrp-portal::-webkit-scrollbar,
        .hrp-portal__stage::-webkit-scrollbar,
        .hrp-portal__experience::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        /* ==================================================
           STAGE

           Three rows only.
           Entire stage is optically transparent.
        ================================================== */

        .hrp-portal__stage {
          position: relative;

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          flex: 1 0 auto;

          width: 100%;
          min-width: 0;

          min-height: clamp(560px, 58vw, 700px);
          height: auto;
          max-height: none;

          padding: clamp(18px, 2.5vw, 32px);

          overflow: hidden;

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;
          background-image: none;

          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

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
          align-items: flex-start;
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
          color: rgba(255, 255, 255, 0.87);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.25em;
        }

        .hrp-portal__identity > small {
          color: rgba(255, 255, 255, 0.36);

          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.16em;

          white-space: nowrap;
        }

        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .hrp-portal__experience {
          position: relative;
          z-index: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          align-self: stretch;

          width: 100%;
          min-width: 0;
          min-height: 0;

          padding:
            clamp(12px, 2vw, 24px)
            0
            clamp(10px, 1.6vw, 18px);

          overflow: hidden;

          background: transparent;
        }

        .hrp-portal__statement {
          position: relative;
          z-index: 2;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;

          width: 100%;
          min-width: 0;

          text-align: center;
        }

        .hrp-portal__eyebrow {
          color: rgba(235, 235, 233, 0.43);

          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.18em;

          text-align: center;
        }

        .hrp-portal__statement h2 {
          width: 100%;
          margin: 0;

          color: rgba(251, 251, 250, 0.97);

          font-size: clamp(34px, 4.6vw, 63px);
          font-weight: 300;
          line-height: 1.06;
          letter-spacing: -0.057em;

          text-align: center;
          text-wrap: balance;
        }

        /* ==================================================
           SYMBOL INTERACTION

           No surrounding glass panel.
           No large blue aura.
           Only the SVG itself is illuminated.
        ================================================== */

        .hrp-portal__symbol-button {
          position: relative;
          z-index: 3;

          display: block;
          flex: 0 1 auto;

          width: min(100%, 360px);
          min-width: 0;

          margin:
            clamp(5px, 0.8vw, 10px)
            auto
            0;

          padding: 0;

          border: 0;
          outline: 0;

          background: transparent;
          background-image: none;

          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

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
          outline:
            1px solid rgba(245, 245, 243, 0.72);

          outline-offset: 7px;
          border-radius: 18px;
        }

        .hrp-portal__symbol-space {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 330px);
          aspect-ratio: 1.17;

          margin: 0 auto;

          background: transparent;
          background-image: none;

          border: 0;
          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          transition:
            transform 0.75s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hrp-portal__symbol-object {
          position: relative;
          z-index: 1;

          display: block;

          width: 100%;
          height: 100%;

          animation:
            hrp-symbol-float
            13s ease-in-out infinite;
        }

        .hrp-symbol {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          filter:
            drop-shadow(
              0 0 7px rgba(255, 255, 255, 0.055)
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
            14s ease-in-out infinite;
        }

        .hrp-symbol__open-arc {
          animation:
            hrp-arc-breathe
            11s ease-in-out infinite;
        }

        .hrp-symbol__human {
          animation:
            hrp-human-breathe
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
           EXPLORE HINT

           A minimal text-and-arrow affordance.
           No pill, background, or additional card.
        ================================================== */

        .hrp-portal__tap-hint {
          position: absolute;
          z-index: 2;

          bottom: 0;
          left: 50%;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.49);

          font-size: 8px;
          font-weight: 550;
          letter-spacing: 0.14em;

          white-space: nowrap;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .hrp-portal__tap-hint svg {
          display: block;

          width: 13px;
          height: 13px;

          flex: 0 0 auto;

          transition:
            transform 0.3s ease;
        }

        /* ==================================================
           SEQUENCE
        ================================================== */

        .hrp-portal__sequence {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;

          width: 100%;

          margin-top: 9px;

          color: rgba(255, 255, 255, 0.37);

          font-size: 7px;
          font-weight: 550;
          letter-spacing: 0.12em;

          white-space: nowrap;
        }

        .hrp-portal__sequence i {
          width: clamp(16px, 4vw, 42px);
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(245, 245, 243, 0.30),
              transparent
            );
        }

        /* ==================================================
           FOOTER — THIRD GRID ROW
        ================================================== */

        .hrp-portal__footer {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(9px, 1.4vw, 16px);

          align-self: end;

          width: 100%;
          min-height: 20px;

          padding-top: 12px;

          border-top:
            1px solid rgba(255, 255, 255, 0.055);

          color: rgba(255, 255, 255, 0.34);
        }

        .hrp-portal__footer > span {
          font-size: 6px;
          font-weight: 610;
          letter-spacing: 0.15em;

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

           This is not a HOME card surface.
           Neutral black replaces the old blue background.
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
          overflow: clip;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          background: #050505;
        }

        .hrp-entry--active {
          opacity: 1;
          visibility: visible;
        }

        .hrp-entry__background {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              ellipse at 50% 45%,
              #171717 0%,
              #0B0B0B 43%,
              #030303 83%
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

        .hrp-entry__symbol {
          position: absolute;

          top: 44%;
          left: 50%;

          width: min(64vmin, 440px);
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.75);

          filter: blur(7px);

          pointer-events: none;
        }

        .hrp-entry__symbol .hrp-symbol {
          width: 100%;
          height: 100%;
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

          width: min(100%, 760px);

          padding: 0 20px;

          opacity: 0;

          transform:
            translate(-50%, 8px);

          text-align: center;
        }

        .hrp-entry__copy > span {
          color: rgba(245, 245, 243, 0.62);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.2em;
        }

        .hrp-entry__copy > strong {
          color: rgba(250, 250, 249, 0.96);

          font-size: clamp(20px, 3.3vw, 36px);
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.04em;
        }

        .hrp-entry__copy > small {
          color: rgba(245, 245, 243, 0.53);

          font-size: 10px;
          line-height: 1.6;
          letter-spacing: 0.04em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .hrp-portal--entering
        .hrp-portal__stage {
          opacity: 0;

          transform: scale(0.975);

          filter:
            brightness(0.4)
            blur(7px);
        }

        .hrp-entry--active
        .hrp-entry__background {
          animation:
            hrp-entry-background
            1.25s ease forwards;
        }

        .hrp-entry--active
        .hrp-entry__rings > span {
          animation:
            hrp-entry-ring
            1.25s ease-out forwards;
        }

        .hrp-entry--active
        .hrp-entry__rings > span:nth-child(2) {
          animation-delay: 0.12s;
        }

        .hrp-entry--active
        .hrp-entry__symbol {
          animation:
            hrp-entry-symbol
            1.25s
            cubic-bezier(0.2, 0.75, 0.2, 1)
            forwards;
        }

        .hrp-entry--active
        .hrp-entry__copy {
          animation:
            hrp-entry-copy
            1.25s ease forwards;
        }

        /* ==================================================
           AMBIENT ANIMATIONS

           Small motion, no rotating card-sized glow.
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
            opacity: 0.5;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.04);
          }
        }

        @keyframes hrp-orbits-breathe {
          0%, 100% {
            opacity: 0.7;
            transform: rotate(-1deg);
          }

          50% {
            opacity: 1;
            transform: rotate(1deg);
          }
        }

        @keyframes hrp-arc-breathe {
          0%, 100% {
            opacity: 0.7;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes hrp-human-breathe {
          0%, 100% {
            opacity: 0.87;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes hrp-core-breathe {
          0%, 100% {
            opacity: 0.62;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes hrp-points-breathe {
          0%, 100% {
            opacity: 0.6;
          }

          50% {
            opacity: 1;
          }
        }

        /* ==================================================
           ENTRY ANIMATIONS — 1250ms
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
            opacity: 0.6;
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
              scale(0.75);

            filter: blur(7px);
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
            opacity: 0.2;

            transform:
              translate(-50%, -50%)
              scale(1.3);

            filter: blur(8px);
          }
        }

        @keyframes hrp-entry-copy {
          0%, 18% {
            opacity: 0;

            transform:
              translate(-50%, 8px);
          }

          40%, 85% {
            opacity: 1;

            transform:
              translate(-50%, 0);
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%, -5px);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .hrp-portal__symbol-button:hover
          .hrp-portal__symbol-space {
            transform:
              translateY(-2px)
              scale(1.025);
          }

          .hrp-portal__symbol-button:hover
          .hrp-symbol {
            filter:
              drop-shadow(
                0 0 10px rgba(255, 255, 255, 0.12)
              );
          }

          .hrp-portal__symbol-button:hover
          .hrp-portal__tap-hint {
            color: rgba(255, 255, 255, 0.88);

            transform:
              translate(-50%, -2px);
          }

          .hrp-portal__symbol-button:hover
          .hrp-portal__tap-hint svg {
            transform: translateX(3px);
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .hrp-portal {
            display: flex;
            flex-direction: column;
            align-self: stretch;

            flex: 1 0 auto;

            width: 100%;
            min-width: 0;

            min-height: max(
              690px,
              calc(100svh - 42px)
            );

            height: auto;
            max-height: none;

            overflow: hidden;
          }

          .hrp-portal__stage {
            display: grid;

            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto;

            flex: 1 0 auto;

            width: 100%;
            min-width: 0;

            min-height: max(
              690px,
              calc(100svh - 42px)
            );

            height: auto;
            max-height: none;

            padding: 25px 18px 23px;

            overflow: hidden;
          }

          .hrp-portal__header {
            align-items: center;
          }

          .hrp-portal__identity {
            gap: 5px;
          }

          .hrp-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.17em;
          }

          .hrp-portal__identity > small {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .hrp-portal__experience {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            align-self: stretch;

            flex: 1 1 auto;

            width: 100%;
            min-width: 0;
            min-height: 0;

            height: auto;
            max-height: none;

            padding: 35px 0 30px;

            overflow-x: hidden;
            overflow-y: auto;

            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;
          }

          .hrp-portal__statement {
            flex: 0 0 auto;
            gap: 11px;
          }

          .hrp-portal__eyebrow {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .hrp-portal__statement h2 {
            font-size: clamp(29px, 7vw, 38px);
            line-height: 1.07;
            letter-spacing: -0.055em;
          }

          .hrp-portal__symbol-button {
            flex: 0 0 auto;

            width: min(100%, 310px);

            margin-top: 10px;
          }

          .hrp-portal__symbol-space {
            width: min(100%, 275px);
            aspect-ratio: 1.12;
          }

          .hrp-portal__tap-hint {
            gap: 6px;

            font-size: 7px;
            letter-spacing: 0.1em;
          }

          .hrp-portal__tap-hint svg {
            width: 12px;
            height: 12px;
          }

          .hrp-portal__sequence {
            flex: 0 0 auto;

            gap: 8px;
            margin-top: 9px;

            font-size: 6px;
            letter-spacing: 0.07em;
          }

          .hrp-portal__sequence i {
            width: 17px;
          }

          .hrp-portal__footer {
            flex: 0 0 auto;
            align-self: end;

            gap: 7px;

            width: 100%;
            min-height: 20px;

            padding-top: 12px;
          }

          .hrp-portal__footer > span {
            font-size: 5.5px;
            letter-spacing: 0.08em;
          }

          .hrp-entry__symbol {
            width: min(74vw, 440px);
          }
        }

        /* ==================================================
           NARROW MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .hrp-portal__stage {
            padding: 25px 15px 21px;
          }

          .hrp-portal__identity > span {
            font-size: 8px;
            letter-spacing: 0.13em;
          }

          .hrp-portal__statement h2 {
            font-size: clamp(27px, 7.15vw, 34px);
          }

          .hrp-portal__symbol-space {
            width: min(100%, 260px);
          }

          .hrp-portal__footer > span {
            font-size: 5px;
          }
        }

        @media (max-width: 360px) {
          .hrp-portal__stage {
            padding: 23px 13px 19px;
          }

          .hrp-portal__statement h2 {
            font-size: 25px;
          }

          .hrp-portal__eyebrow {
            font-size: 5.5px;
          }

          .hrp-portal__symbol-space {
            width: min(100%, 235px);
          }

          .hrp-portal__sequence {
            gap: 5px;
            font-size: 5.5px;
          }

          .hrp-portal__sequence i {
            width: 12px;
          }

          .hrp-portal__footer > span {
            font-size: 4.5px;
          }
        }

        /* ==================================================
           SHORT VIEWPORTS
        ================================================== */

        @media (max-width: 700px) and (max-height: 760px) {
          .hrp-portal__experience {
            padding: 24px 0 20px;
          }

          .hrp-portal__statement {
            gap: 8px;
          }

          .hrp-portal__symbol-button {
            margin-top: 6px;
          }

          .hrp-portal__symbol-space {
            width: min(100%, 245px);
          }

          .hrp-portal__sequence {
            margin-top: 6px;
          }
        }

        @media (max-width: 700px) and (max-height: 640px) {
          .hrp-portal__experience {
            padding: 18px 0 15px;
          }

          .hrp-portal__statement h2 {
            font-size: clamp(25px, 6.6vw, 32px);
          }

          .hrp-portal__symbol-space {
            width: min(100%, 215px);
          }
        }

        @media (max-width: 430px) and (max-height: 760px) {
          .hrp-portal__symbol-space {
            width: min(100%, 235px);
          }
        }

        @media (max-width: 430px) and (max-height: 640px) {
          .hrp-portal__symbol-space {
            width: min(100%, 205px);
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .hrp-portal__symbol-object,
          .hrp-symbol__core-light,
          .hrp-symbol__orbits,
          .hrp-symbol__open-arc,
          .hrp-symbol__human,
          .hrp-symbol__core,
          .hrp-symbol__points {
            animation: none !important;
          }

          .hrp-portal__symbol-space,
          .hrp-portal__stage {
            transition-duration: 0.12s !important;
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

            transform:
              translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}