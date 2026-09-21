"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA AETHERION PORTAL
   LIVING ORBITAL MEGAFACTORY

   HOME owns the only outer glass card.

   This component:
   - does not create an additional outer card
   - does not fix or cap its content height
   - does not create a nested vertical scroll area
   - preserves the /aetherion destination
   - presents six architectural stages, not live status
========================================================== */

const DOCKS = [
  { number: "01", name: "ENGINEERING" },
  { number: "02", name: "FABRICATION" },
  { number: "03", name: "TESTING" },
  { number: "04", name: "CORRECTION" },
  { number: "05", name: "REPRODUCTION" },
  { number: "06", name: "RELEASE" },
] as const;

const DOCK_POSITIONS = [
  { x: 300, y: 178 },
  { x: 426, y: 224 },
  { x: 426, y: 376 },
  { x: 300, y: 422 },
  { x: 174, y: 376 },
  { x: 174, y: 224 },
] as const;

function MegafactoryVisual({
  transition = false,
}: {
  transition?: boolean;
}) {
  const instanceId = useId().replace(/:/g, "");
  const metalId = `ae-metal-${instanceId}`;
  const spineId = `ae-spine-${instanceId}`;
  const coreId = `ae-core-${instanceId}`;
  const haloId = `ae-halo-${instanceId}`;

  return (
    <svg
      className={[
        "ae-portal__megafactory",
        transition ? "ae-portal__megafactory--transition" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cbd7e0" />
          <stop offset="15%" stopColor="#56636f" />
          <stop offset="38%" stopColor="#171e25" />
          <stop offset="67%" stopColor="#06090d" />
          <stop offset="87%" stopColor="#35414c" />
          <stop offset="100%" stopColor="#9aabb8" />
        </linearGradient>

        <linearGradient id={spineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a0e13" />
          <stop offset="23%" stopColor="#647481" />
          <stop offset="43%" stopColor="#1c2630" />
          <stop offset="70%" stopColor="#06090d" />
          <stop offset="88%" stopColor="#3b4854" />
          <stop offset="100%" stopColor="#080c11" />
        </linearGradient>

        <radialGradient id={coreId}>
          <stop offset="0%" stopColor="#edf5fa" />
          <stop offset="19%" stopColor="#a7bac8" />
          <stop offset="52%" stopColor="#34424d" />
          <stop offset="100%" stopColor="#020406" />
        </radialGradient>

        <radialGradient id={haloId}>
          <stop offset="0%" stopColor="#d8e8f4" stopOpacity=".13" />
          <stop offset="48%" stopColor="#b5d0e3" stopOpacity=".035" />
          <stop offset="100%" stopColor="#b5d0e3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* A restrained atmosphere, rather than a bright icon background. */}
      <circle cx="300" cy="300" r="232" fill={`url(#${haloId})`} />

      <g className="ae-portal__visual-atmosphere">
        <circle
          cx="300"
          cy="300"
          r="231"
          stroke="#d9e7f0"
          strokeOpacity=".075"
          strokeWidth=".8"
          strokeDasharray="2 12"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="255"
          ry="90"
          stroke="#c6d9e7"
          strokeOpacity=".08"
          strokeWidth=".8"
          transform="rotate(-17 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="255"
          ry="90"
          stroke="#c6d9e7"
          strokeOpacity=".05"
          strokeWidth=".8"
          transform="rotate(17 300 300)"
        />
      </g>

      {/* Rear half of the primary industrial ring. */}
      <g className="ae-portal__rear-ring">
        <ellipse
          cx="300"
          cy="300"
          rx="239"
          ry="81"
          stroke="#0b1117"
          strokeWidth="20"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="239"
          ry="81"
          stroke="#c4d3df"
          strokeOpacity=".48"
          strokeWidth="1.4"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="226"
          ry="69"
          stroke="#b6c9d7"
          strokeOpacity=".21"
          strokeWidth="1"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="251"
          ry="92"
          stroke="#d9e6ef"
          strokeOpacity=".13"
          strokeDasharray="3 9"
        />

        {Array.from({ length: 48 }, (_, index) => {
          const angle = (index / 48) * Math.PI * 2;

          return (
            <line
              key={`rear-module-${index}`}
              x1={300 + Math.cos(angle) * 226}
              y1={300 + Math.sin(angle) * 69}
              x2={300 + Math.cos(angle) * 249}
              y2={300 + Math.sin(angle) * 91}
              stroke="#dce9f2"
              strokeOpacity={index % 4 === 0 ? ".36" : ".13"}
              strokeWidth=".9"
            />
          );
        })}
      </g>

      {/* A recognizable vertical manufacturing spine. */}
      <g className="ae-portal__spine">
        <path
          d="M286 56 L300 28 L314 56 L317 544 L300 574 L283 544 Z"
          fill={`url(#${spineId})`}
          stroke="#b9cbd8"
          strokeOpacity=".43"
          strokeWidth="1.1"
        />

        <path
          d="M300 31 L300 571"
          stroke="#e3edf4"
          strokeOpacity=".32"
          strokeWidth="1"
        />
        <path
          d="M288 81 L288 533 M312 81 L312 533"
          stroke="#dce8f1"
          strokeOpacity=".19"
          strokeWidth=".8"
        />

        <path
          d="M283 113 L257 154 L257 230 L283 244 Z"
          fill="#10171e"
          stroke="#a9bac8"
          strokeOpacity=".35"
        />
        <path
          d="M317 367 L344 382 L344 462 L317 496 Z"
          fill="#10171e"
          stroke="#a9bac8"
          strokeOpacity=".35"
        />
        <path
          d="M283 410 L265 433 L265 496 L283 520 Z"
          fill="#0c1218"
          stroke="#a9bac8"
          strokeOpacity=".27"
        />

        {Array.from({ length: 17 }, (_, index) => (
          <line
            key={`spine-module-${index}`}
            x1="285"
            y1={93 + index * 26}
            x2="315"
            y2={93 + index * 26}
            stroke="#dce9f2"
            strokeOpacity={index % 3 === 0 ? ".34" : ".13"}
            strokeWidth=".8"
          />
        ))}

        <path
          d="M292 62 L292 534"
          stroke="#dcebf5"
          strokeOpacity=".23"
          strokeWidth="1.6"
          strokeDasharray="8 7"
        />
        <path
          className="ae-portal__spine-light"
          d="M307 72 L307 526"
          stroke="#e7f4fc"
          strokeOpacity=".48"
          strokeWidth="1.4"
          strokeDasharray="3 15"
        />
      </g>

      {/* Upper ring: an architectural counterpart to the main ring. */}
      <g className="ae-portal__upper-ring">
        <ellipse
          cx="300"
          cy="194"
          rx="145"
          ry="41"
          stroke="#111922"
          strokeWidth="17"
        />
        <ellipse
          cx="300"
          cy="194"
          rx="145"
          ry="41"
          stroke="#c9d8e3"
          strokeOpacity=".64"
          strokeWidth="1.5"
        />
        <ellipse
          cx="300"
          cy="194"
          rx="133"
          ry="32"
          stroke="#a9bdcb"
          strokeOpacity=".4"
          strokeWidth="1.1"
        />
        <ellipse
          cx="300"
          cy="194"
          rx="154"
          ry="47"
          stroke="#d8e5ee"
          strokeOpacity=".17"
          strokeWidth=".8"
        />

        {Array.from({ length: 32 }, (_, index) => {
          const angle = (index / 32) * Math.PI * 2;

          return (
            <line
              key={`upper-module-${index}`}
              x1={300 + Math.cos(angle) * 133}
              y1={194 + Math.sin(angle) * 32}
              x2={300 + Math.cos(angle) * 152}
              y2={194 + Math.sin(angle) * 46}
              stroke="#dce9f2"
              strokeOpacity=".29"
              strokeWidth=".9"
            />
          );
        })}

        <path
          className="ae-portal__upper-current"
          d="M158 194 A142 40 0 0 1 442 194"
          stroke="#eaf4fa"
          strokeOpacity=".54"
          strokeWidth="1.4"
          strokeDasharray="4 13"
        />
      </g>

      {/* Six manufacturing paths, from the chamber to the docks. */}
      <g className="ae-portal__transfer-corridors">
        {DOCK_POSITIONS.map((dock, index) => (
          <g key={`corridor-${index}`}>
            <line
              x1="300"
              y1="300"
              x2={dock.x}
              y2={dock.y}
              stroke="#d4e3ee"
              strokeOpacity=".2"
              strokeWidth="1.8"
              strokeDasharray="3 7"
            />
            <line
              className="ae-portal__transfer-current"
              x1="300"
              y1="300"
              x2={dock.x}
              y2={dock.y}
              stroke="#f0f7fb"
              strokeOpacity=".46"
              strokeWidth="1"
              strokeDasharray="2 16"
              style={{ animationDelay: `${index * -0.85}s` }}
            />
          </g>
        ))}
      </g>

      {/* Central manufacturing chamber and AETHERION nucleus. */}
      <g className="ae-portal__chamber">
        <ellipse
          cx="300"
          cy="300"
          rx="81"
          ry="32"
          fill="#010305"
          stroke="#b9cbd9"
          strokeOpacity=".49"
          strokeWidth="1.4"
        />
        <rect
          x="276"
          y="265"
          width="48"
          height="70"
          rx="8"
          fill={`url(#${metalId})`}
          stroke="#c9d9e5"
          strokeOpacity=".49"
        />
        <ellipse
          cx="300"
          cy="266"
          rx="35"
          ry="12"
          fill="#111a22"
          stroke="#d5e4ee"
          strokeOpacity=".47"
        />
        <ellipse
          cx="300"
          cy="335"
          rx="35"
          ry="12"
          fill="#05090d"
          stroke="#b9cad8"
          strokeOpacity=".36"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="49"
          ry="19"
          stroke="#d7e6f0"
          strokeOpacity=".36"
          strokeWidth="1.7"
        />

        <circle
          className="ae-portal__core-halo"
          cx="300"
          cy="300"
          r="33"
          fill={`url(#${haloId})`}
        />
        <circle
          cx="300"
          cy="300"
          r="17"
          fill="#05090d"
          stroke="#e4eff7"
          strokeOpacity=".5"
          strokeWidth="1.2"
        />
        <circle
          cx="300"
          cy="300"
          r="12"
          fill={`url(#${coreId})`}
          stroke="#e4eff7"
          strokeOpacity=".5"
        />

        {/* An open, approachable aperture rather than a harsh flare. */}
        <circle
          className="ae-portal__core-aperture"
          cx="300"
          cy="300"
          r="6"
          fill="#071017"
          stroke="#e8f3fa"
          strokeOpacity=".74"
          strokeWidth="1.1"
        />
        <circle
          className="ae-portal__core-light"
          cx="300"
          cy="300"
          r="2.2"
          fill="#eef7fc"
        />

        <path
          d="M300 277 V285 M300 315 V323 M277 300 H285 M315 300 H323"
          stroke="#e4f1f9"
          strokeOpacity=".55"
          strokeWidth="1"
        />
      </g>

      {/* Front ring overlays the chamber to establish orbital depth. */}
      <g className="ae-portal__front-ring">
        <path
          d="M61 300 A239 81 0 0 0 539 300"
          stroke="#0a1016"
          strokeWidth="20"
        />
        <path
          d="M61 300 A239 81 0 0 0 539 300"
          stroke="#bacbd8"
          strokeOpacity=".57"
          strokeWidth="1.7"
        />
        <path
          d="M74 303 A226 69 0 0 0 526 303"
          stroke="#d5e3ee"
          strokeOpacity=".28"
          strokeWidth="1.1"
        />
        <path
          className="ae-portal__ring-light"
          d="M67 309 A233 76 0 0 0 533 309"
          stroke="#e9f3fa"
          strokeOpacity=".43"
          strokeWidth="1.4"
          strokeDasharray="3 12"
        />

        {Array.from({ length: 25 }, (_, index) => {
          const angle = (index / 24) * Math.PI;

          return (
            <line
              key={`front-module-${index}`}
              x1={300 - Math.cos(angle) * 226}
              y1={300 + Math.sin(angle) * 69}
              x2={300 - Math.cos(angle) * 249}
              y2={300 + Math.sin(angle) * 91}
              stroke="#dce9f2"
              strokeOpacity={index % 3 === 0 ? ".43" : ".19"}
              strokeWidth=".9"
            />
          );
        })}
      </g>

      {/* Six distinct docking assemblies. */}
      <g className="ae-portal__docks">
        {DOCK_POSITIONS.map((dock, index) => (
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
              r="19"
              stroke="#dceaf4"
              strokeOpacity=".17"
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
              strokeOpacity=".72"
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
              strokeOpacity=".48"
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

      {/* Two small service craft give the factory a sense of scale. */}
      <g className="ae-portal__service-craft">
        <path
          d="M476 144 L490 148 L476 152 L480 148 Z"
          fill="#bdcfdd"
          fillOpacity=".72"
        />
        <path
          d="M111 429 L126 434 L111 439 L116 434 Z"
          fill="#bdcfdd"
          fillOpacity=".46"
        />
      </g>
    </svg>
  );
}

export default function ArcheNovaAetherionPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const enteringRef = useRef(false);

  const [entering, setEntering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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

    return () => {
      media.removeListener(update);
    };
  }, []);

  const enterAetherion = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      router.push("/aetherion");
    }, reducedMotion ? 160 : 1700);
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
      <div className="ae-portal__stage">
        <div className="ae-portal__ambient" aria-hidden="true" />
        <div className="ae-portal__starfield" aria-hidden="true" />

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

        <footer className="ae-portal__footer">
          <span>AETHERION</span>
          <i aria-hidden="true" />
          <span>REALITY RETAINS VETO</span>
        </footer>
      </div>

      {/* Full-screen entry: six docks → chamber approach. */}
      <div className="ae-portal__transition" aria-hidden="true">
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
           ROOT — HOME OWNS THE GLASS CARD
        ================================================== */

        .ae-portal,
        .ae-portal *,
        .ae-portal *::before,
        .ae-portal *::after {
          box-sizing: border-box;
        }

        .ae-portal {
          position: relative;
          display: block;
          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;

          margin: 0;
          padding: 0;

          /*
           * Never clip the bottom of the portal here.
           * HOME remains responsible for its own card
           * height and scroll container.
           */
          overflow: visible;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          color: rgba(247, 249, 251, 0.94);

          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .ae-portal::-webkit-scrollbar,
        .ae-portal *::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          display: none !important;
          background: transparent !important;
        }

        .ae-portal button {
          font: inherit;
        }

        /* ==================================================
           INTERNAL STAGE — NATURAL CONTENT HEIGHT

           The stage grows with its content. There is no
           fixed height, max-height, or clipped middle row.
        ================================================== */

        .ae-portal__stage {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-rows:
            auto
            minmax(min-content, 1fr)
            auto;

          width: 100%;
          min-width: 0;
          min-height: clamp(560px, 58vw, 700px);
          height: auto;
          max-height: none;

          padding: clamp(25px, 4vw, 50px);

          overflow: visible;

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

        .ae-portal__ambient,
        .ae-portal__starfield {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ae-portal__ambient {
          z-index: -2;
          background:
            radial-gradient(
              ellipse at 50% 55%,
              rgba(222, 234, 245, 0.046),
              transparent 43%
            ),
            radial-gradient(
              ellipse at 50% 78%,
              rgba(222, 234, 245, 0.015),
              transparent 52%
            );
        }

        .ae-portal__starfield {
          z-index: -1;
          opacity: 0.17;

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

          background-size: 71px 71px, 109px 109px;
          background-position: 0 0, 29px 23px;

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
          color: rgba(255, 255, 255, 0.34);
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

          color: rgba(240, 244, 249, 0.48);
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

          background: rgba(239, 247, 252, 0.72);
          box-shadow:
            0 0 10px rgba(239, 247, 252, 0.2);

          animation:
            ae-indicator-breathe 8s ease-in-out infinite;
        }

        /* ==================================================
           EXPERIENCE — NO NESTED SCROLL OR CLIPPING
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
          min-height: min-content;
          height: auto;
          max-height: none;

          padding:
            clamp(24px, 4vw, 44px)
            0
            clamp(18px, 3vw, 30px);

          overflow: visible;
          overscroll-behavior: auto;

          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .ae-portal__statement {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;

          width: 100%;
          min-width: 0;
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
           INTERACTIVE LIVING MEGAFACTORY
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
          outline: 1px solid rgba(255, 255, 255, 0.38);
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
            transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .ae-portal__factory-aura {
          position: absolute;
          inset: 11% 9%;
          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(216, 231, 243, 0.085),
              rgba(180, 202, 220, 0.024) 35%,
              transparent 72%
            );

          filter: blur(22px);

          animation:
            ae-aura-breathe 12s ease-in-out infinite;
        }

        .ae-portal__factory-orbit {
          position: absolute;
          width: 85%;
          height: 31%;

          border: 1px solid rgba(226, 239, 249, 0.07);
          border-radius: 50%;

          pointer-events: none;
        }

        .ae-portal__factory-orbit--one {
          transform: rotate(-19deg);
          animation:
            ae-orbit-one 24s ease-in-out infinite;
        }

        .ae-portal__factory-orbit--two {
          width: 78%;
          height: 26%;
          border-color: rgba(226, 239, 249, 0.045);

          transform: rotate(24deg);
          animation:
            ae-orbit-two 29s ease-in-out infinite;
        }

        .ae-portal__factory-object {
          position: relative;
          z-index: 2;

          display: block;
          width: 100%;
          height: 100%;

          transform-origin: center;

          animation:
            ae-factory-float 13s ease-in-out infinite;
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
              0 0 18px rgba(212, 231, 244, 0.04)
            );
        }

        /* ==================================================
           REFINED AMBIENT MOTION
        ================================================== */

        .ae-portal__rear-ring {
          transform-origin: 300px 300px;
          animation:
            ae-ring-breathe 15s ease-in-out infinite;
        }

        .ae-portal__upper-ring {
          transform-origin: 300px 194px;
          animation:
            ae-upper-ring-breathe 17s ease-in-out infinite;
        }

        .ae-portal__spine-light {
          animation:
            ae-spine-current 9s linear infinite;
        }

        .ae-portal__ring-light {
          animation:
            ae-ring-current 18s linear infinite;
        }

        .ae-portal__upper-current {
          animation:
            ae-ring-current 21s linear infinite reverse;
        }

        .ae-portal__transfer-current {
          animation:
            ae-transfer-current 8s linear infinite;
        }

        .ae-portal__core-halo {
          transform-origin: 300px 300px;
          animation:
            ae-core-breathe 8s ease-in-out infinite;
        }

        .ae-portal__core-aperture {
          transform-origin: 300px 300px;
          animation:
            ae-aperture-breathe 8s ease-in-out infinite;
        }

        .ae-portal__core-light {
          transform-origin: 300px 300px;
          animation:
            ae-core-light 8s ease-in-out infinite;
        }

        /*
         * Animate opacity only: the SVG docking groups
         * retain their original translate(x y) positions.
         */
        .ae-portal__dock-assembly {
          animation:
            ae-dock-breathe 12s ease-in-out infinite;
        }

        .ae-portal__dock-assembly--2 {
          animation-delay: -2s;
        }

        .ae-portal__dock-assembly--3 {
          animation-delay: -4s;
        }

        .ae-portal__dock-assembly--4 {
          animation-delay: -6s;
        }

        .ae-portal__dock-assembly--5 {
          animation-delay: -8s;
        }

        .ae-portal__dock-assembly--6 {
          animation-delay: -10s;
        }

        .ae-portal__dock-light {
          opacity: 0.48;
          filter:
            drop-shadow(
              0 0 3px rgba(238, 248, 255, 0.45)
            );
        }

        .ae-portal__service-craft {
          transform-origin: 300px 300px;
          animation:
            ae-service-craft 35s ease-in-out infinite;
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
              rgba(226, 240, 251, 0.065),
              transparent 72%
            );

          filter: blur(13px);
          animation:
            ae-floor-breathe 12s ease-in-out infinite;
        }

        .ae-portal__tap-hint {
          position: absolute;
          z-index: 4;
          bottom: 0;
          left: 50%;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.38);
          font-size: 8px;
          font-weight: 550;
          letter-spacing: 0.12em;
          white-space: nowrap;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .ae-portal__sequence {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;

          width: 100%;
          margin-top: 8px;

          color: rgba(255, 255, 255, 0.32);
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

          color: rgba(255, 255, 255, 0.3);
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
          background: rgba(255, 255, 255, 0.22);
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
              rgba(255, 255, 255, 0.7) 0 0.6px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.28) 0 0.4px,
              transparent 0.8px
            );

          background-size: 89px 89px, 137px 137px;
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
            ae-space-enter 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-stars {
          animation:
            ae-stars-enter 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-grid {
          animation:
            ae-grid-enter 1.7s ease forwards;
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
            ae-dock-activate 0.3s ease forwards;
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
            ae-ring-align 0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__megafactory--transition
        .ae-portal__upper-ring {
          animation:
            ae-upper-ring-align 0.9s ease-in-out forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-target {
          animation:
            ae-target-open 1.7s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-vignette {
          animation:
            ae-vignette-enter 1.7s ease forwards;
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
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes ae-aura-breathe {
          0%, 100% {
            opacity: 0.42;
            transform: scale(0.97);
          }

          50% {
            opacity: 0.82;
            transform: scale(1.05);
          }
        }

        @keyframes ae-orbit-one {
          0%, 100% {
            opacity: 0.45;
            transform: rotate(-19deg);
          }

          50% {
            opacity: 0.8;
            transform: rotate(-13deg);
          }
        }

        @keyframes ae-orbit-two {
          0%, 100% {
            opacity: 0.35;
            transform: rotate(24deg);
          }

          50% {
            opacity: 0.72;
            transform: rotate(18deg);
          }
        }

        @keyframes ae-factory-float {
          0%, 100% {
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
          0%, 100% {
            opacity: 0.84;
            transform: scale(0.996);
          }

          50% {
            opacity: 1;
            transform: scale(1.004);
          }
        }

        @keyframes ae-upper-ring-breathe {
          0%, 100% {
            opacity: 0.82;
            transform: scale(0.994);
          }

          50% {
            opacity: 1;
            transform: scale(1.006);
          }
        }

        @keyframes ae-spine-current {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -72;
          }
        }

        @keyframes ae-ring-current {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -108;
          }
        }

        @keyframes ae-transfer-current {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -72;
          }
        }

        @keyframes ae-core-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.9);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.12);
          }
        }

        @keyframes ae-aperture-breathe {
          0%, 100% {
            opacity: 0.78;
            transform: scale(0.98);
          }

          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes ae-core-light {
          0%, 100% {
            opacity: 0.55;
            transform: scale(0.85);
          }

          50% {
            opacity: 1;
            transform: scale(1.13);
          }
        }

        @keyframes ae-dock-breathe {
          0%, 100% {
            opacity: 0.72;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-service-craft {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }

          50% {
            transform: translate(-7px, 4px);
            opacity: 0.78;
          }
        }

        @keyframes ae-floor-breathe {
          0%, 100% {
            opacity: 0.36;
            transform: scaleX(0.9);
          }

          50% {
            opacity: 0.78;
            transform: scaleX(1.06);
          }
        }

        /* ==================================================
           ENTRY KEYFRAMES
        ================================================== */

        @keyframes ae-space-enter {
          0% {
            opacity: 0;
          }

          16%, 100% {
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
              brightness(1.45)
              drop-shadow(
                0 0 7px rgba(233, 247, 255, 0.52)
              );
          }
        }

        @keyframes ae-ring-align {
          0% {
            transform: scale(0.996);
          }

          70% {
            transform: scale(1.03);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes ae-upper-ring-align {
          0% {
            transform: scale(0.994);
          }

          70% {
            transform: scale(1.04);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes ae-target-open {
          0%, 43% {
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
          0%, 73% {
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
            color: rgba(255, 255, 255, 0.67);
            transform: translate(-50%, -2px);
          }
        }

        /* ==================================================
           MOBILE — SHOW ALL CONTENT

           Natural stage height allows the HOME card's
           existing scroll owner to reach the footer.
        ================================================== */

        @media (max-width: 700px) {
          .ae-portal {
            min-height: 0;
            height: auto;
            max-height: none;
            overflow: visible;
          }

          .ae-portal__stage {
            min-height:
              max(690px, calc(100svh - 42px));

            height: auto;
            max-height: none;

            grid-template-rows:
              auto
              minmax(min-content, 1fr)
              auto;

            padding: 25px 18px 23px;
            overflow: visible;
          }

          .ae-portal__header {
            grid-template-columns: minmax(0, 1fr);
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

            min-height: min-content;
            height: auto;
            max-height: none;

            padding: 30px 0 24px;
            overflow: visible;
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
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .ae-portal__stage {
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
          .ae-portal__upper-current,
          .ae-portal__transfer-current,
          .ae-portal__core-halo,
          .ae-portal__core-aperture,
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