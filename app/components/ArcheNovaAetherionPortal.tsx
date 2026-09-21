"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AETHERION PORTAL
   LIVING ORBITAL MEGAFACTORY

   HOME owns the only outer glass card.

   This component owns only:
   - internal layout
   - the orbital megafactory illustration
   - six manufacturing docks
   - ambient motion
   - the full-screen entry transition

   The six docks describe the manufacturing architecture.
   Their illumination is a visual metaphor, not live
   manufacturing or operational status.
========================================================== */

const DOCKS = [
  { number: "01", name: "ENGINEERING" },
  { number: "02", name: "FABRICATION" },
  { number: "03", name: "TESTING" },
  { number: "04", name: "CORRECTION" },
  { number: "05", name: "REPRODUCTION" },
  { number: "06", name: "RELEASE" },
] as const;

/* ==========================================================
   ORBITAL MEGAFACTORY

   SVG is used for precise structural geometry:
   - vertical manufacturing spine
   - two inhabited / industrial orbital rings
   - six docking nodes
   - transfer corridors
   - central manufacturing chamber

   The same structure is reused in the HOME illustration
   and the full-screen entry sequence.
========================================================== */

function MegafactoryVisual({
  transition = false,
}: {
  transition?: boolean;
}) {
  const dockPositions = [
    { x: 300, y: 183 },
    { x: 422, y: 220 },
    { x: 422, y: 380 },
    { x: 300, y: 417 },
    { x: 178, y: 380 },
    { x: 178, y: 220 },
  ];

  return (
    <svg
      className={[
        "ae-portal__megafactory",
        transition
          ? "ae-portal__megafactory--transition"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 600 600"
      role="img"
      aria-label={
        transition
          ? "Aetherion megafactory entry animation"
          : "Aetherion orbital megafactory with six manufacturing docks"
      }
    >
      <defs>
        <linearGradient
          id={
            transition
              ? "ae-metal-transition"
              : "ae-metal-home"
          }
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#d6e0e8" />
          <stop offset="12%" stopColor="#66737f" />
          <stop offset="33%" stopColor="#1d252d" />
          <stop offset="58%" stopColor="#080c10" />
          <stop offset="82%" stopColor="#3b4854" />
          <stop offset="100%" stopColor="#a5b5c3" />
        </linearGradient>

        <linearGradient
          id={
            transition
              ? "ae-spine-transition"
              : "ae-spine-home"
          }
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#10161d" />
          <stop offset="25%" stopColor="#778794" />
          <stop offset="38%" stopColor="#26313b" />
          <stop offset="64%" stopColor="#070b10" />
          <stop offset="86%" stopColor="#34414d" />
          <stop offset="100%" stopColor="#090d12" />
        </linearGradient>

        <radialGradient
          id={
            transition
              ? "ae-core-transition"
              : "ae-core-home"
          }
        >
          <stop offset="0%" stopColor="#e9f4fb" />
          <stop offset="15%" stopColor="#91a8ba" />
          <stop offset="48%" stopColor="#26333e" />
          <stop offset="100%" stopColor="#020406" />
        </radialGradient>

        <filter
          id={
            transition
              ? "ae-glow-transition"
              : "ae-glow-home"
          }
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Deep orbital atmosphere */}

      <g className="ae-portal__visual-atmosphere">
        <circle
          cx="300"
          cy="300"
          r="226"
          fill="none"
          stroke="#dce8f1"
          strokeOpacity=".055"
          strokeWidth=".7"
          strokeDasharray="2 10"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="252"
          ry="89"
          fill="none"
          stroke="#cbdbe7"
          strokeOpacity=".075"
          strokeWidth=".8"
          transform="rotate(-17 300 300)"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="251"
          ry="89"
          fill="none"
          stroke="#cbdbe7"
          strokeOpacity=".045"
          strokeWidth=".8"
          transform="rotate(17 300 300)"
        />
      </g>

      {/* Rear manufacturing ring */}

      <g className="ae-portal__rear-ring">
        <ellipse
          cx="300"
          cy="300"
          rx="237"
          ry="80"
          fill="none"
          stroke="#8394a3"
          strokeOpacity=".16"
          strokeWidth="17"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="237"
          ry="80"
          fill="none"
          stroke="#c4d3df"
          strokeOpacity=".37"
          strokeWidth="1.2"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="224"
          ry="68"
          fill="none"
          stroke="#d5e1e9"
          strokeOpacity=".13"
          strokeWidth="1"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="249"
          ry="91"
          fill="none"
          stroke="#e6eef5"
          strokeOpacity=".12"
          strokeWidth="1"
          strokeDasharray="3 8"
        />

        {Array.from({ length: 48 }, (_, index) => {
          const angle = (index / 48) * Math.PI * 2;
          const x1 = 300 + Math.cos(angle) * 225;
          const y1 = 300 + Math.sin(angle) * 69;
          const x2 = 300 + Math.cos(angle) * 244;
          const y2 = 300 + Math.sin(angle) * 86;

          return (
            <line
              key={`rear-segment-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d6e3ec"
              strokeOpacity={
                index % 4 === 0 ? ".31" : ".12"
              }
              strokeWidth=".9"
            />
          );
        })}
      </g>

      {/* Vertical industrial spine */}

      <g className="ae-portal__spine">
        <path
          d="M286 55 L300 29 L314 55 L317 546 L300 572 L283 546 Z"
          fill={`url(#${
            transition
              ? "ae-spine-transition"
              : "ae-spine-home"
          })`}
          stroke="#b8c9d7"
          strokeOpacity=".37"
          strokeWidth="1.1"
        />

        <path
          d="M300 32 L300 570"
          stroke="#e8f1f7"
          strokeOpacity=".3"
          strokeWidth="1"
        />

        <path
          d="M288 79 L288 535 M312 79 L312 535"
          stroke="#dbe7f0"
          strokeOpacity=".17"
          strokeWidth=".8"
        />

        <path
          d="M283 112 L258 153 L258 232 L283 244 Z"
          fill="#111820"
          stroke="#a9bac8"
          strokeOpacity=".28"
        />

        <path
          d="M317 367 L344 381 L344 461 L317 496 Z"
          fill="#10161d"
          stroke="#a9bac8"
          strokeOpacity=".28"
        />

        <path
          d="M283 411 L266 433 L266 495 L283 521 Z"
          fill="#111820"
          stroke="#a9bac8"
          strokeOpacity=".21"
        />

        {Array.from({ length: 17 }, (_, index) => (
          <line
            key={`spine-module-${index}`}
            x1="285"
            y1={93 + index * 26}
            x2="315"
            y2={93 + index * 26}
            stroke="#dce9f2"
            strokeOpacity={
              index % 3 === 0 ? ".31" : ".12"
            }
            strokeWidth=".8"
          />
        ))}

        <path
          d="M292 61 L292 533"
          stroke="#dcebf5"
          strokeOpacity=".22"
          strokeWidth="2"
          strokeDasharray="8 7"
        />

        <path
          className="ae-portal__spine-light"
          d="M307 72 L307 526"
          stroke="#e7f5ff"
          strokeOpacity=".34"
          strokeWidth="1.5"
          strokeDasharray="3 13"
        />
      </g>

      {/* Upper orbital production ring */}

      <g className="ae-portal__upper-ring">
        <ellipse
          cx="300"
          cy="194"
          rx="143"
          ry="40"
          fill="none"
          stroke="#17212b"
          strokeWidth="16"
        />

        <ellipse
          cx="300"
          cy="194"
          rx="143"
          ry="40"
          fill="none"
          stroke="#c4d5e1"
          strokeOpacity=".59"
          strokeWidth="1.6"
        />

        <ellipse
          cx="300"
          cy="194"
          rx="132"
          ry="31"
          fill="none"
          stroke="#a8bac8"
          strokeOpacity=".36"
          strokeWidth="1.2"
        />

        <ellipse
          cx="300"
          cy="194"
          rx="152"
          ry="46"
          fill="none"
          stroke="#c9d9e5"
          strokeOpacity=".15"
          strokeWidth="1"
        />

        {Array.from({ length: 32 }, (_, index) => {
          const angle = (index / 32) * Math.PI * 2;

          return (
            <line
              key={`upper-module-${index}`}
              x1={300 + Math.cos(angle) * 132}
              y1={194 + Math.sin(angle) * 31}
              x2={300 + Math.cos(angle) * 149}
              y2={194 + Math.sin(angle) * 44}
              stroke="#dce9f2"
              strokeOpacity=".26"
              strokeWidth=".9"
            />
          );
        })}

        <path
          d="M300 154 L300 234 M158 194 L442 194"
          stroke="#dbe8f2"
          strokeOpacity=".11"
          strokeWidth="1"
        />
      </g>

      {/* Six transfer corridors */}

      <g className="ae-portal__transfer-corridors">
        {dockPositions.map((dock, index) => (
          <line
            key={`transfer-${index}`}
            x1="300"
            y1="300"
            x2={dock.x}
            y2={dock.y}
            stroke="#d4e3ee"
            strokeOpacity=".19"
            strokeWidth="2"
            strokeDasharray="3 7"
          />
        ))}
      </g>

      {/* Central manufacturing chamber */}

      <g className="ae-portal__chamber">
        <ellipse
          cx="300"
          cy="300"
          rx="79"
          ry="31"
          fill="#010305"
          stroke="#b8cbd9"
          strokeOpacity=".4"
          strokeWidth="1.5"
        />

        <rect
          x="277"
          y="266"
          width="46"
          height="68"
          rx="8"
          fill={`url(#${
            transition
              ? "ae-metal-transition"
              : "ae-metal-home"
          })`}
          stroke="#c9d9e5"
          strokeOpacity=".44"
          strokeWidth="1"
        />

        <ellipse
          cx="300"
          cy="267"
          rx="34"
          ry="12"
          fill="#101820"
          stroke="#d5e4ee"
          strokeOpacity=".42"
        />

        <ellipse
          cx="300"
          cy="334"
          rx="34"
          ry="12"
          fill="#060a0e"
          stroke="#b9cad8"
          strokeOpacity=".32"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="48"
          ry="18"
          fill="none"
          stroke="#d7e6f0"
          strokeOpacity=".3"
          strokeWidth="2"
        />

        <ellipse
          className="ae-portal__core-glow"
          cx="300"
          cy="300"
          rx="30"
          ry="30"
          fill="#e5f2fb"
          fillOpacity=".12"
          filter={`url(#${
            transition
              ? "ae-glow-transition"
              : "ae-glow-home"
          })`}
        />

        <circle
          cx="300"
          cy="300"
          r="14"
          fill={`url(#${
            transition
              ? "ae-core-transition"
              : "ae-core-home"
          })`}
          stroke="#e4eff7"
          strokeOpacity=".52"
        />

        <circle
          className="ae-portal__core-light"
          cx="300"
          cy="300"
          r="3.5"
          fill="#eef7fd"
        />

        <path
          d="M300 278 L300 287 M300 313 L300 322 M278 300 L286 300 M314 300 L322 300"
          stroke="#e4f1f9"
          strokeOpacity=".5"
          strokeWidth="1"
        />
      </g>

      {/* Front half of the primary ring creates depth */}

      <g className="ae-portal__front-ring">
        <path
          d="M63 300 A237 80 0 0 0 537 300"
          fill="none"
          stroke="#0b1117"
          strokeWidth="19"
        />

        <path
          d="M63 300 A237 80 0 0 0 537 300"
          fill="none"
          stroke="#aebfcd"
          strokeOpacity=".51"
          strokeWidth="1.7"
        />

        <path
          d="M76 303 A224 68 0 0 0 524 303"
          fill="none"
          stroke="#d5e3ee"
          strokeOpacity=".24"
          strokeWidth="1.2"
        />

        <path
          className="ae-portal__ring-light"
          d="M70 309 A232 75 0 0 0 530 309"
          fill="none"
          stroke="#e5f1fa"
          strokeOpacity=".29"
          strokeWidth="1.5"
          strokeDasharray="3 10"
        />

        {Array.from({ length: 25 }, (_, index) => {
          const angle =
            (index / 24) * Math.PI;

          return (
            <line
              key={`front-module-${index}`}
              x1={300 - Math.cos(angle) * 225}
              y1={300 + Math.sin(angle) * 68}
              x2={300 - Math.cos(angle) * 244}
              y2={300 + Math.sin(angle) * 86}
              stroke="#dbe8f2"
              strokeOpacity={
                index % 3 === 0 ? ".4" : ".18"
              }
              strokeWidth=".9"
            />
          );
        })}
      </g>

      {/* Dock assemblies */}

      <g className="ae-portal__docks">
        {dockPositions.map((dock, index) => (
          <g
            key={DOCKS[index].number}
            className={[
              "ae-portal__dock-assembly",
              `ae-portal__dock-assembly--${index + 1}`,
            ].join(" ")}
            transform={`translate(${dock.x} ${dock.y})`}
          >
            <circle
              className="ae-portal__dock-halo"
              r="18"
              fill="none"
              stroke="#dceaf4"
              strokeOpacity=".13"
              strokeWidth=".8"
            />

            <rect
              x="-10"
              y="-10"
              width="20"
              height="20"
              rx="2"
              transform="rotate(45)"
              fill="#0a1016"
              stroke="#c9dbe8"
              strokeOpacity=".62"
              strokeWidth="1.2"
            />

            <rect
              x="-5"
              y="-5"
              width="10"
              height="10"
              rx="1"
              transform="rotate(45)"
              fill="#28343e"
              stroke="#d7e5ef"
              strokeOpacity=".38"
              strokeWidth=".8"
            />

            <circle
              className="ae-portal__dock-light"
              r="2.5"
              fill="#edf7fd"
            />
          </g>
        ))}
      </g>

      {/* Small independent orbital craft */}

      <g className="ae-portal__service-craft">
        <path
          d="M477 144 L489 148 L477 152 L480 148 Z"
          fill="#b5c7d5"
          fillOpacity=".7"
        />

        <path
          d="M112 430 L125 434 L112 438 L116 434 Z"
          fill="#b5c7d5"
          fillOpacity=".4"
        />
      </g>
    </svg>
  );
}

export default function ArcheNovaAetherionPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  useEffect(() => {
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
        media.removeEventListener(
          "change",
          update,
        );
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);

  const enterAetherion = useCallback(() => {
    if (enteringRef.current) {
      return;
    }

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(
      () => {
        router.push("/aetherion");
      },
      reducedMotion ? 160 : 1700,
    );
  }, [reducedMotion, router]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      className={[
        "ae-portal",
        entering ? "ae-portal--entering" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="ae-portal-title"
    >
      {/* ==================================================
          TRANSPARENT INTERNAL STAGE
      ================================================== */}

      <div className="ae-portal__stage">
        <div
          className="ae-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ae-portal__starfield"
          aria-hidden="true"
        />

        {/* HEADER */}

        <header className="ae-portal__header">
          <div className="ae-portal__identity">
            <span>AETHERION</span>

            <small>ORBITAL MEGAFACTORY</small>
          </div>

          <div className="ae-portal__indicator">
            <i aria-hidden="true" />

            <span>PHYSICAL REALIZATION</span>
          </div>
        </header>

        {/* CENTRAL EXPERIENCE */}

        <div className="ae-portal__experience">
          <div className="ae-portal__statement">
            <span className="ae-portal__eyebrow">
              ENGINEERING · MANUFACTURING · VERIFICATION
            </span>

            <h2 id="ae-portal-title">
              Build what
              <br />
              reality can verify.
            </h2>
          </div>

          <button
            type="button"
            className="ae-portal__factory-button"
            onClick={enterAetherion}
            disabled={entering}
            aria-label="Enter Aetherion, the ArcheNova engineering and physical realization environment"
          >
            <span className="ae-portal__factory">
              <span
                className="ae-portal__factory-aura"
                aria-hidden="true"
              />

              <span
                className="ae-portal__factory-orbit ae-portal__factory-orbit--one"
                aria-hidden="true"
              />

              <span
                className="ae-portal__factory-orbit ae-portal__factory-orbit--two"
                aria-hidden="true"
              />

              <span
                className="ae-portal__factory-object"
                aria-hidden="true"
              >
                <MegafactoryVisual />
              </span>

              <span
                className="ae-portal__factory-floor"
                aria-hidden="true"
              />

              <span className="ae-portal__tap-hint">
                Tap the megafactory to enter
              </span>
            </span>
          </button>

          <div className="ae-portal__sequence">
            <span>01 ENGINEERING</span>

            <i aria-hidden="true" />

            <span>06 RELEASE</span>
          </div>
        </div>

        {/* FOOTER */}

        <footer className="ae-portal__footer">
          <span>AETHERION</span>

          <i aria-hidden="true" />

          <span>REALITY RETAINS VETO</span>
        </footer>
      </div>

      {/* ==================================================
          FULL-SCREEN ENTRY TRANSITION

          1. Space opens
          2. Six docks activate in sequence
          3. Orbital rings align
          4. Camera approaches the central chamber
          5. Chamber aperture becomes the next space
      ================================================== */}

      <div
        className="ae-portal__transition"
        aria-hidden="true"
      >
        <div className="ae-portal__transition-space" />

        <div className="ae-portal__transition-stars" />

        <div className="ae-portal__transition-grid" />

        <div className="ae-portal__transition-vignette" />

        <div className="ae-portal__transition-factory">
          <div className="ae-portal__transition-halo" />

          <MegafactoryVisual transition />

          <div className="ae-portal__transition-target">
            <span className="ae-portal__transition-target-ring ae-portal__transition-target-ring--one" />

            <span className="ae-portal__transition-target-ring ae-portal__transition-target-ring--two" />

            <span className="ae-portal__transition-target-core" />
          </div>
        </div>

        <div className="ae-portal__transition-wave" />

        <div className="ae-portal__transition-copy">
          <span>AETHERION</span>

          <small>Entering the megafactory</small>
        </div>
      </div>

      <style jsx global>{`
        /* ==================================================
           ROOT

           No outer card styling. HOME remains the sole
           owner of the visible glass surface.
        ================================================== */

        .ae-portal,
        .ae-portal *,
        .ae-portal *::before,
        .ae-portal *::after {
          box-sizing: border-box;
        }

        .ae-portal {
          position: relative;
          display: flex;
          flex-direction: column;
          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 100%;

          margin: 0;
          padding: 0;

          overflow: hidden;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;

          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          color: rgba(247, 249, 251, 0.94);
        }

        .ae-portal button {
          font: inherit;
        }

        /* ==================================================
           INTERNAL STAGE

           Header / experience / footer are distributed
           across the available card height.
        ================================================== */

        .ae-portal__stage {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          flex: 1 0 auto;

          width: 100%;
          min-width: 0;
          min-height: clamp(560px, 58vw, 700px);

          padding: clamp(25px, 4vw, 50px);

          overflow: hidden;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;

          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          transition:
            opacity 0.45s ease,
            transform 0.65s ease,
            filter 0.6s ease;
        }

        /* ==================================================
           ATMOSPHERE
        ================================================== */

        .ae-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -2;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 56%,
              rgba(222, 234, 245, 0.043),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 50% 73%,
              rgba(222, 234, 245, 0.015),
              transparent 52%
            );
        }

        .ae-portal__starfield {
          position: absolute;
          inset: 0;
          z-index: -1;

          pointer-events: none;

          opacity: 0.19;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.5) 0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.2) 0 0.35px,
              transparent 0.7px
            );

          background-size:
            71px 71px,
            109px 109px;

          background-position:
            0 0,
            29px 23px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 82%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 82%
            );
        }

        /* ==================================================
           HEADER
        ================================================== */

        .ae-portal__header {
          position: relative;
          z-index: 5;

          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            auto
            minmax(0, 1fr);

          align-items: start;

          width: 100%;
          min-width: 0;
        }

        .ae-portal__identity {
          grid-column: 2;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          text-align: center;
        }

        .ae-portal__identity > span {
          color: rgba(255, 255, 255, 0.88);

          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.25em;
        }

        .ae-portal__identity > small {
          color: rgba(255, 255, 255, 0.33);

          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.16em;

          white-space: nowrap;
        }

        .ae-portal__indicator {
          grid-column: 3;
          justify-self: end;

          display: inline-flex;
          align-items: center;

          gap: 8px;

          min-width: 0;

          color: rgba(240, 244, 249, 0.47);

          font-size: 7px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: 0.12em;

          white-space: nowrap;
        }

        .ae-portal__indicator i {
          width: 5px;
          height: 5px;

          flex: 0 0 5px;

          border-radius: 50%;

          background: rgba(239, 247, 252, 0.7);

          box-shadow:
            0 0 10px rgba(239, 247, 252, 0.2);

          animation:
            ae-indicator-breathe
            8s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .ae-portal__experience {
          position: relative;
          z-index: 4;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          align-self: stretch;

          width: 100%;
          min-width: 0;
          min-height: 0;

          padding:
            clamp(24px, 4vw, 44px)
            0
            clamp(18px, 3vw, 30px);

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: touch;

          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .ae-portal__experience::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        /* ==================================================
           STATEMENT
        ================================================== */

        .ae-portal__statement {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 14px;

          width: 100%;

          text-align: center;

          transition:
            opacity 0.35s ease,
            transform 0.5s ease,
            filter 0.4s ease;
        }

        .ae-portal__eyebrow {
          color: rgba(255, 255, 255, 0.32);

          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.17em;

          text-align: center;
        }

        .ae-portal__statement h2 {
          width: 100%;

          margin: 0;

          color: rgba(250, 251, 252, 0.97);

          font-size: clamp(39px, 5.1vw, 70px);
          font-weight: 235;
          line-height: 1.025;
          letter-spacing: -0.058em;

          text-align: center;
          text-wrap: balance;
        }

        /* ==================================================
           INTERACTIVE FACTORY
        ================================================== */

        .ae-portal__factory-button {
          position: relative;
          z-index: 6;

          display: block;

          width: min(100%, 560px);
          min-width: 0;

          margin:
            clamp(10px, 1.6vw, 20px)
            auto
            0;

          padding: 0;

          border: 0;
          outline: 0;
          background: transparent;

          color: inherit;

          cursor: pointer;

          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }

        .ae-portal__factory-button:disabled {
          cursor: default;
        }

        .ae-portal__factory-button:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, 0.38);

          outline-offset: 7px;
          border-radius: 24px;
        }

        .ae-portal__factory {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 490px);
          aspect-ratio: 1.12;

          margin: 0 auto;

          background: transparent;

          transform: translateZ(0);

          transition:
            transform
            0.7s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .ae-portal__factory-aura {
          position: absolute;
          inset: 11% 9%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(216, 231, 243, 0.09),
              rgba(180, 202, 220, 0.024) 35%,
              transparent 72%
            );

          filter: blur(22px);

          animation:
            ae-aura-breathe
            11s ease-in-out infinite;
        }

        .ae-portal__factory-orbit {
          position: absolute;

          width: 85%;
          height: 31%;

          border:
            1px solid rgba(226, 239, 249, 0.07);

          border-radius: 50%;

          pointer-events: none;
        }

        .ae-portal__factory-orbit--one {
          transform: rotate(-19deg);

          animation:
            ae-orbit-one
            22s ease-in-out infinite;
        }

        .ae-portal__factory-orbit--two {
          width: 78%;
          height: 26%;

          border-color:
            rgba(226, 239, 249, 0.045);

          transform: rotate(24deg);

          animation:
            ae-orbit-two
            27s ease-in-out infinite;
        }

        .ae-portal__factory-object {
          position: relative;
          z-index: 2;

          display: block;

          width: 100%;
          height: 100%;

          transform-origin: center;

          animation:
            ae-factory-float
            12s ease-in-out infinite;
        }

        .ae-portal__megafactory {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          filter:
            drop-shadow(
              0 18px 24px rgba(0, 0, 0, 0.58)
            )
            drop-shadow(
              0 0 18px rgba(212, 231, 244, 0.035)
            );
        }

        /* ==================================================
           LIVING MEGAFACTORY

           Motion is intentionally slow and restrained.
           Structural geometry remains recognizable.
        ================================================== */

        .ae-portal__rear-ring {
          transform-origin: 300px 300px;

          animation:
            ae-ring-breathe
            13s ease-in-out infinite;
        }

        .ae-portal__upper-ring {
          transform-origin: 300px 194px;

          animation:
            ae-upper-ring-breathe
            15s ease-in-out infinite;
        }

        .ae-portal__spine-light {
          animation:
            ae-spine-current
            7s linear infinite;
        }

        .ae-portal__ring-light {
          animation:
            ae-ring-current
            16s linear infinite;
        }

        .ae-portal__core-glow {
          transform-origin: 300px 300px;

          animation:
            ae-core-breathe
            7s ease-in-out infinite;
        }

        .ae-portal__core-light {
          transform-origin: 300px 300px;

          animation:
            ae-core-light
            7s ease-in-out infinite;
        }

        .ae-portal__dock-assembly {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-dock-breathe
            9s ease-in-out infinite;
        }

        .ae-portal__dock-assembly--2 {
          animation-delay: -1.5s;
        }

        .ae-portal__dock-assembly--3 {
          animation-delay: -3s;
        }

        .ae-portal__dock-assembly--4 {
          animation-delay: -4.5s;
        }

        .ae-portal__dock-assembly--5 {
          animation-delay: -6s;
        }

        .ae-portal__dock-assembly--6 {
          animation-delay: -7.5s;
        }

        .ae-portal__dock-light {
          opacity: 0.35;

          filter:
            drop-shadow(
              0 0 3px rgba(238, 248, 255, 0.5)
            );
        }

        .ae-portal__service-craft {
          transform-origin: 300px 300px;

          animation:
            ae-service-craft
            32s ease-in-out infinite;
        }

        .ae-portal__factory-floor {
          position: absolute;
          z-index: 1;

          bottom: 11%;

          width: 49%;
          height: 8%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(226, 240, 251, 0.07),
              transparent 72%
            );

          filter: blur(13px);

          animation:
            ae-floor-breathe
            10s ease-in-out infinite;
        }

        .ae-portal__tap-hint {
          position: absolute;
          z-index: 4;

          bottom: 0;
          left: 50%;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.35);

          font-size: 8px;
          font-weight: 550;
          letter-spacing: 0.12em;

          white-space: nowrap;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        /* ==================================================
           SEQUENCE
        ================================================== */

        .ae-portal__sequence {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 14px;

          width: 100%;

          margin-top: 8px;

          color: rgba(255, 255, 255, 0.3);

          font-size: 7px;
          font-weight: 550;
          letter-spacing: 0.12em;

          white-space: nowrap;
        }

        .ae-portal__sequence i {
          width: clamp(24px, 8vw, 80px);
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.22),
              transparent
            );
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .ae-portal__footer {
          position: relative;
          z-index: 5;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(9px, 1.4vw, 16px);

          align-self: end;

          width: 100%;

          padding-top: 18px;

          border-top:
            1px solid rgba(255, 255, 255, 0.055);

          color: rgba(255, 255, 255, 0.29);

          transition: opacity 0.35s ease;
        }

        .ae-portal__footer > span {
          font-size: 6px;
          font-weight: 610;
          letter-spacing: 0.15em;
        }

        .ae-portal__footer > i {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.22);
        }

        /* ==================================================
           FULL-SCREEN ENTRY TRANSITION
        ================================================== */

        .ae-portal__transition {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: grid;
          place-items: center;

          overflow: hidden;

          opacity: 0;
          visibility: hidden;

          pointer-events: none;

          transition:
            opacity 0.12s ease,
            visibility 0s linear 1.7s;
        }

        .ae-portal__transition-space {
          position: absolute;
          inset: 0;

          opacity: 0;

          background:
            radial-gradient(
              circle at center,
              #151c23,
              #06090d 44%,
              #000 82%
            );
        }

        .ae-portal__transition-stars {
          position: absolute;
          inset: -20%;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.7)
              0 0.6px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.28)
              0 0.4px,
              transparent 0.8px
            );

          background-size:
            89px 89px,
            137px 137px;

          transform: scale(1.3);
        }

        .ae-portal__transition-grid {
          position: absolute;
          inset: -35%;

          opacity: 0;

          background:
            repeating-linear-gradient(
              90deg,
              transparent 0 83px,
              rgba(235, 246, 253, 0.055) 84px,
              transparent 85px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 83px,
              rgba(235, 246, 253, 0.055) 84px,
              transparent 85px
            );

          transform:
            perspective(800px)
            rotateX(68deg)
            scale(1.6);

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 70%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 70%
            );
        }

        .ae-portal__transition-vignette {
          position: absolute;
          inset: 0;
          z-index: 4;

          opacity: 0;

          background:
            radial-gradient(
              circle at center,
              transparent 9%,
              rgba(0, 0, 0, 0.35) 54%,
              #000 100%
            );
        }

        .ae-portal__transition-factory {
          position: relative;
          z-index: 3;

          display: grid;
          place-items: center;

          width: min(94vw, 780px);
          aspect-ratio: 1;

          opacity: 0;

          transform: scale(0.12);

          filter: blur(9px);
        }

        .ae-portal__megafactory--transition {
          position: relative;
          z-index: 2;

          width: 100%;
          height: 100%;
        }

        .ae-portal__transition-halo {
          position: absolute;
          inset: 16%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(220, 237, 249, 0.12),
              rgba(220, 237, 249, 0.025) 40%,
              transparent 72%
            );

          filter: blur(26px);
        }

        .ae-portal__transition-target {
          position: absolute;
          z-index: 4;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: 10%;
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.35);
        }

        .ae-portal__transition-target-ring {
          position: absolute;

          width: 100%;
          aspect-ratio: 1;

          border:
            1px solid rgba(238, 248, 255, 0.6);

          border-radius: 50%;

          box-shadow:
            0 0 22px rgba(228, 243, 253, 0.15);
        }

        .ae-portal__transition-target-ring--two {
          width: 72%;

          border-color:
            rgba(238, 248, 255, 0.32);
        }

        .ae-portal__transition-target-core {
          width: 26%;
          aspect-ratio: 1;

          border-radius: 50%;

          background: #e9f5fd;

          box-shadow:
            0 0 18px rgba(234, 247, 255, 0.75),
            0 0 52px rgba(234, 247, 255, 0.25);
        }

        .ae-portal__transition-wave {
          position: absolute;
          z-index: 5;

          top: 50%;
          left: 50%;

          width: 12vmax;
          aspect-ratio: 1;

          border-radius: 50%;

          background: #000;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.1);
        }

        .ae-portal__transition-copy {
          position: absolute;
          z-index: 6;

          bottom: clamp(44px, 8vh, 90px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          width: 100%;

          padding: 0 20px;

          opacity: 0;

          transform: translate(-50%, 9px);

          text-align: center;

          transition:
            opacity 0.3s ease 0.48s,
            transform 0.4s ease 0.48s;
        }

        .ae-portal__transition-copy > span {
          color: rgba(247, 250, 253, 0.75);

          font-size: 9px;
          font-weight: 620;
          letter-spacing: 0.25em;
        }

        .ae-portal__transition-copy > small {
          color: rgba(229, 239, 248, 0.37);

          font-size: 8px;
          letter-spacing: 0.1em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .ae-portal--entering
        .ae-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(0.98);

          filter: blur(3px);
        }

        .ae-portal--entering
        .ae-portal__stage {
          opacity: 0;

          transform: scale(0.975);

          filter:
            brightness(0.35)
            blur(8px);
        }

        .ae-portal--entering
        .ae-portal__transition {
          opacity: 1;
          visibility: visible;

          transition: opacity 0.12s ease;
        }

        .ae-portal--entering
        .ae-portal__transition-space {
          animation:
            ae-space-enter
            1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-stars {
          animation:
            ae-stars-enter
            1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-grid {
          animation:
            ae-grid-enter
            1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-factory {
          animation:
            ae-factory-enter
            1.7s
            cubic-bezier(0.16, 0.76, 0.2, 1)
            forwards;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly {
          animation:
            ae-dock-activate
            0.3s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly--1 {
          animation-delay: 0.12s;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly--2 {
          animation-delay: 0.23s;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly--3 {
          animation-delay: 0.34s;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly--4 {
          animation-delay: 0.45s;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly--5 {
          animation-delay: 0.56s;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__dock-assembly--6 {
          animation-delay: 0.67s;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__rear-ring {
          animation:
            ae-ring-align
            0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__upper-ring {
          animation:
            ae-upper-ring-align
            0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-target {
          animation:
            ae-target-open
            1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-vignette {
          animation:
            ae-vignette-enter
            1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-wave {
          animation:
            ae-wave-enter
            1.7s
            cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-copy {
          opacity: 1;

          transform: translate(-50%, 0);
        }

        /* ==================================================
           AMBIENT KEYFRAMES
        ================================================== */

        @keyframes ae-indicator-breathe {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.85);
          }

          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes ae-aura-breathe {
          0%,
          100% {
            opacity: 0.42;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.85;
            transform: scale(1.06);
          }
        }

        @keyframes ae-orbit-one {
          0%,
          100% {
            opacity: 0.45;
            transform: rotate(-19deg);
          }

          50% {
            opacity: 0.85;
            transform: rotate(-12deg);
          }
        }

        @keyframes ae-orbit-two {
          0%,
          100% {
            opacity: 0.35;
            transform: rotate(24deg);
          }

          50% {
            opacity: 0.75;
            transform: rotate(17deg);
          }
        }

        @keyframes ae-factory-float {
          0%,
          100% {
            transform:
              translateY(3px)
              scale(0.992);
          }

          50% {
            transform:
              translateY(-4px)
              scale(1.012);
          }
        }

        @keyframes ae-ring-breathe {
          0%,
          100% {
            opacity: 0.82;
            transform: scale(0.995);
          }

          50% {
            opacity: 1;
            transform: scale(1.005);
          }
        }

        @keyframes ae-upper-ring-breathe {
          0%,
          100% {
            opacity: 0.78;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.01);
          }
        }

        @keyframes ae-spine-current {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -64;
          }
        }

        @keyframes ae-ring-current {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -104;
          }
        }

        @keyframes ae-core-breathe {
          0%,
          100% {
            opacity: 0.42;
            transform: scale(0.85);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.18);
          }
        }

        @keyframes ae-core-light {
          0%,
          100% {
            opacity: 0.52;
            transform: scale(0.85);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes ae-dock-breathe {
          0%,
          100% {
            opacity: 0.62;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-service-craft {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.35;
          }

          50% {
            transform: translate(-8px, 5px);
            opacity: 0.8;
          }
        }

        @keyframes ae-floor-breathe {
          0%,
          100% {
            opacity: 0.35;
            transform: scaleX(0.88);
          }

          50% {
            opacity: 0.8;
            transform: scaleX(1.08);
          }
        }

        /* ==================================================
           ENTRY KEYFRAMES
        ================================================== */

        @keyframes ae-space-enter {
          0% {
            opacity: 0;
          }

          16%,
          100% {
            opacity: 1;
          }
        }

        @keyframes ae-stars-enter {
          0% {
            opacity: 0;
            transform: scale(1.3);
          }

          28% {
            opacity: 0.5;
          }

          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        @keyframes ae-grid-enter {
          0% {
            opacity: 0;

            transform:
              perspective(800px)
              rotateX(68deg)
              scale(1.6);
          }

          32% {
            opacity: 0.4;
          }

          100% {
            opacity: 0;

            transform:
              perspective(800px)
              rotateX(68deg)
              scale(0.5);
          }
        }

        @keyframes ae-factory-enter {
          0% {
            opacity: 0;
            transform: scale(0.12);
            filter: blur(9px);
          }

          18% {
            opacity: 1;
          }

          44% {
            opacity: 1;
            transform: scale(0.72);
            filter: blur(0);
          }

          66% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: scale(5.2);
            filter: blur(8px);
          }
        }

        @keyframes ae-dock-activate {
          0% {
            opacity: 0.25;
            filter: brightness(0.7);
          }

          100% {
            opacity: 1;

            filter:
              brightness(1.5)
              drop-shadow(
                0 0 8px rgba(233, 247, 255, 0.6)
              );
          }
        }

        @keyframes ae-ring-align {
          0% {
            transform: scale(0.995);
          }

          70% {
            transform: scale(1.035);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes ae-upper-ring-align {
          0% {
            transform: scale(0.99);
          }

          70% {
            transform: scale(1.045);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes ae-target-open {
          0%,
          43% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.35);
          }

          62% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(18);
          }
        }

        @keyframes ae-vignette-enter {
          0% {
            opacity: 0;
          }

          55% {
            opacity: 0.4;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes ae-wave-enter {
          0%,
          73% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.1);
          }

          80% {
            opacity: 0.22;
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(19);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .ae-portal__factory-button:hover
          .ae-portal__factory {
            transform:
              translateY(-3px)
              scale(1.025);
          }

          .ae-portal__factory-button:hover
          .ae-portal__megafactory {
            filter:
              drop-shadow(
                0 21px 28px rgba(0, 0, 0, 0.65)
              )
              drop-shadow(
                0 0 21px rgba(219, 237, 249, 0.1)
              );
          }

          .ae-portal__factory-button:hover
          .ae-portal__tap-hint {
            color: rgba(255, 255, 255, 0.65);

            transform:
              translate(-50%, -2px);
          }
        }

        /* ==================================================
           MOBILE — FULL-HEIGHT COMPOSITION

           Do not collapse the internal stage to the
           height of its content.

           min-height is used instead of fixed height so
           the HOME card can continue scrolling naturally.
        ================================================== */

        @media (max-width: 700px) {
          .ae-portal {
            min-height:
              max(690px, calc(100svh - 42px));
          }

          .ae-portal__stage {
            height: auto;

            min-height:
              max(690px, calc(100svh - 42px));

            max-height: none;

            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto;

            padding: 25px 18px 23px;
          }

          .ae-portal__header {
            grid-template-columns:
              minmax(0, 1fr);

            justify-items: center;

            row-gap: 12px;
          }

          .ae-portal__identity {
            grid-column: 1;
            grid-row: 1;

            gap: 7px;
          }

          .ae-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.21em;
          }

          .ae-portal__identity > small {
            font-size: 6px;
            letter-spacing: 0.11em;
          }

          .ae-portal__indicator {
            grid-column: 1;
            grid-row: 2;

            justify-self: center;

            gap: 6px;

            color: rgba(240, 244, 249, 0.56);

            font-size: 7px;
            letter-spacing: 0.09em;
          }

          .ae-portal__indicator i {
            width: 4px;
            height: 4px;

            flex-basis: 4px;
          }

          .ae-portal__experience {
            align-self: stretch;
            justify-content: center;

            padding: 30px 0 24px;

            overflow-x: hidden;
            overflow-y: auto;

            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;

            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .ae-portal__experience::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }

          .ae-portal__statement {
            gap: 12px;
          }

          .ae-portal__eyebrow {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .ae-portal__statement h2 {
            font-size: clamp(33px, 9.2vw, 46px);
            line-height: 1.035;
            letter-spacing: -0.054em;
          }

          .ae-portal__factory-button {
            width: min(100%, 370px);

            margin-top: 12px;
          }

          .ae-portal__factory {
            width: min(100%, 330px);
            aspect-ratio: 1.1;
          }

          .ae-portal__tap-hint {
            font-size: 7px;
            letter-spacing: 0.08em;
          }

          .ae-portal__sequence {
            gap: 10px;

            margin-top: 9px;

            font-size: 6px;
            letter-spacing: 0.09em;
          }

          .ae-portal__sequence i {
            width: 28px;
          }

          .ae-portal__footer {
            align-self: end;

            gap: 9px;

            margin-top: 0;
            padding-top: 15px;
          }

          .ae-portal__footer > span {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .ae-portal__transition-factory {
            width: min(112vw, 680px);
          }
        }

        /* ==================================================
           SHORT MOBILE

           Preserve the full-height layout and reduce
           internal spacing instead of collapsing the card.
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .ae-portal__stage {
            min-height:
              max(690px, calc(100svh - 42px));

            padding: 22px 17px 19px;
          }

          .ae-portal__experience {
            padding: 22px 0 18px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(31px, 8.9vw, 42px);
          }

          .ae-portal__factory-button {
            margin-top: 7px;
          }

          .ae-portal__factory {
            width: min(100%, 295px);
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .ae-portal__stage {
            min-height:
              max(690px, calc(100svh - 42px));

            padding: 25px 15px 21px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(32px, 9.5vw, 42px);
          }

          .ae-portal__factory {
            width: min(100%, 305px);
          }

          .ae-portal__footer > span {
            font-size: 5.5px;
          }
        }

        @media (max-width: 360px) {
          .ae-portal__stage {
            min-height:
              max(690px, calc(100svh - 42px));

            padding: 23px 13px 19px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(29px, 9.2vw, 37px);
          }

          .ae-portal__factory {
            width: min(100%, 270px);
          }

          .ae-portal__eyebrow {
            font-size: 5.5px;
          }

          .ae-portal__footer > span {
            font-size: 5px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ae-portal__indicator i,
          .ae-portal__factory-aura,
          .ae-portal__factory-orbit,
          .ae-portal__factory-object,
          .ae-portal__rear-ring,
          .ae-portal__upper-ring,
          .ae-portal__spine-light,
          .ae-portal__ring-light,
          .ae-portal__core-glow,
          .ae-portal__core-light,
          .ae-portal__dock-assembly,
          .ae-portal__service-craft,
          .ae-portal__factory-floor {
            animation: none !important;
          }

          .ae-portal__factory,
          .ae-portal__stage,
          .ae-portal__statement {
            transition-duration: 0.12s !important;
          }

          .ae-portal--entering
          .ae-portal__transition-space,
          .ae-portal--entering
          .ae-portal__transition-stars,
          .ae-portal--entering
          .ae-portal__transition-grid,
          .ae-portal--entering
          .ae-portal__transition-factory,
          .ae-portal--entering
          .ae-portal__megafactory--transition
          .ae-portal__dock-assembly,
          .ae-portal--entering
          .ae-portal__megafactory--transition
          .ae-portal__rear-ring,
          .ae-portal--entering
          .ae-portal__megafactory--transition
          .ae-portal__upper-ring,
          .ae-portal--entering
          .ae-portal__transition-target,
          .ae-portal--entering
          .ae-portal__transition-vignette,
          .ae-portal--entering
          .ae-portal__transition-wave {
            animation: none !important;
          }

          .ae-portal--entering
          .ae-portal__transition-space {
            opacity: 1;
          }

          .ae-portal--entering
          .ae-portal__transition-factory {
            opacity: 1;
            transform: scale(1);
            filter: none;
          }

          .ae-portal--entering
          .ae-portal__transition-copy {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </section>
  );
}