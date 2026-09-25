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
   ARCHENOVA FRAMEWORK PORTAL

   EPISTEME GEOMETRY CONTRACT
   --------------------------------
   690px reference
   → available-height fit
   → title / artifact / Tap fully contained

   Framework visual principle:
   Reality
   → Evidence
   → Distinction
   → Test
   → Reproduction
   → Engineering
   → Correction

   HOME owns the visible outer glass.

   Framework owns:
   - internal inquiry architecture
   - white structural wireframe
   - full-screen framework-collapse transition
   - /framework navigation
========================================================== */

const FRAMEWORK_NODES = [
  { number: "01", name: "OBSERVE" },
  { number: "02", name: "DISTINGUISH" },
  { number: "03", name: "TEST" },
  { number: "04", name: "REPRODUCE" },
  { number: "05", name: "ENGINEER" },
  { number: "06", name: "CORRECT" },
] as const;

const ENTRY_DURATION = 1650;

/* ==========================================================
   FRAMEWORK EMBLEM

   A white structural instrument rather than
   a decorative logo.

   Outer boundary:
   permissible domain

   Six gates:
   inquiry / validation sequence

   Inner structures:
   evidence → model → engineering

   Central point:
   provisional claim
========================================================== */

function FrameworkEmblem({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const wire = `fw-wire-${id}`;
  const faintWire = `fw-faint-${id}`;
  const core = `fw-core-${id}`;
  const glow = `fw-glow-${id}`;

  return (
    <svg
      className={[
        "fw-portal__emblem",
        transition
          ? "fw-portal__emblem--transition"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={wire}
          x1="86"
          y1="74"
          x2="414"
          y2="426"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity=".5"
          />
          <stop
            offset=".48"
            stopColor="#FFFFFF"
            stopOpacity=".94"
          />
          <stop
            offset="1"
            stopColor="#FFFFFF"
            stopOpacity=".42"
          />
        </linearGradient>

        <linearGradient
          id={faintWire}
          x1="100"
          y1="410"
          x2="400"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity=".1"
          />
          <stop
            offset=".5"
            stopColor="#FFFFFF"
            stopOpacity=".52"
          />
          <stop
            offset="1"
            stopColor="#FFFFFF"
            stopOpacity=".08"
          />
        </linearGradient>

        <radialGradient id={core}>
          <stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />
          <stop
            offset=".16"
            stopColor="#FFFFFF"
            stopOpacity=".82"
          />
          <stop
            offset=".48"
            stopColor="#FFFFFF"
            stopOpacity=".14"
          />
          <stop
            offset="1"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </radialGradient>

        <filter
          id={glow}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ------------------------------------------
          OUTER REALITY / PERMISSIBLE BOUNDARY
      ------------------------------------------ */}

      <g className="fw-portal__boundary">
        <circle
          cx="250"
          cy="250"
          r="206"
          stroke={`url(#${wire})`}
          strokeWidth=".72"
          strokeOpacity=".18"
          strokeDasharray="1.5 9"
        />

        <path
          d="
            M250 48
            L425 149
            L425 351
            L250 452
            L75 351
            L75 149
            Z
          "
          stroke={`url(#${wire})`}
          strokeWidth="1.05"
          strokeOpacity=".58"
        />
      </g>

      {/* ------------------------------------------
          SIX INQUIRY PLANES
      ------------------------------------------ */}

      <g className="fw-portal__evidence">
        <path
          d="
            M250 83
            L395 167
            L395 333
            L250 417
            L105 333
            L105 167
            Z
          "
          stroke={`url(#${wire})`}
          strokeWidth=".9"
          strokeOpacity=".62"
        />

        <path
          d="
            M250 83
            L250 417

            M105 167
            L395 333

            M395 167
            L105 333
          "
          stroke={`url(#${faintWire})`}
          strokeWidth=".72"
        />

        <path
          d="
            M250 83
            L395 333
            L105 333
            Z

            M250 417
            L105 167
            L395 167
            Z
          "
          stroke={`url(#${faintWire})`}
          strokeWidth=".72"
          strokeOpacity=".66"
        />
      </g>

      {/* ------------------------------------------
          REPRODUCIBLE MODEL LAYER
      ------------------------------------------ */}

      <g className="fw-portal__model">
        <circle
          cx="250"
          cy="250"
          r="118"
          stroke={`url(#${wire})`}
          strokeWidth=".72"
          strokeOpacity=".3"
        />

        <path
          d="
            M250 132
            L352 191
            L352 309
            L250 368
            L148 309
            L148 191
            Z
          "
          stroke={`url(#${wire})`}
          strokeWidth="1"
          strokeOpacity=".78"
        />

        <path
          d="
            M250 132
            L250 368

            M148 191
            L352 309

            M352 191
            L148 309
          "
          stroke={`url(#${faintWire})`}
          strokeWidth=".75"
        />
      </g>

      {/* ------------------------------------------
          ENGINEERING / CORRECTION LAYER
      ------------------------------------------ */}

      <g className="fw-portal__correction">
        <circle
          cx="250"
          cy="250"
          r="77"
          stroke={`url(#${wire})`}
          strokeWidth=".8"
          strokeOpacity=".44"
          strokeDasharray="3 8"
        />

        <path
          d="
            M250 185
            L315 250
            L250 315
            L185 250
            Z
          "
          stroke={`url(#${wire})`}
          strokeWidth="1"
          strokeOpacity=".72"
        />

        <path
          d="
            M250 185
            V315

            M185 250
            H315
          "
          stroke={`url(#${faintWire})`}
          strokeWidth=".75"
        />
      </g>

      {/* ------------------------------------------
          PROVISIONAL CLAIM
      ------------------------------------------ */}

      <g className="fw-portal__claim">
        <circle
          cx="250"
          cy="250"
          r="44"
          fill={`url(#${core})`}
          opacity=".11"
          filter={`url(#${glow})`}
        />

        <circle
          cx="250"
          cy="250"
          r="29"
          stroke="#FFFFFF"
          strokeWidth=".8"
          strokeOpacity=".5"
        />

        <circle
          cx="250"
          cy="250"
          r="4.5"
          fill="#FFFFFF"
          fillOpacity=".9"
        />

        <circle
          cx="250"
          cy="250"
          r="2"
          fill="#FFFFFF"
          filter={`url(#${glow})`}
        />
      </g>

      {/* ------------------------------------------
          SIX INDEPENDENT GATES
      ------------------------------------------ */}

      <g className="fw-portal__nodes">
        {FRAMEWORK_NODES.map((node, index) => {
          const angle =
            -Math.PI / 2 +
            (index * Math.PI * 2) /
              FRAMEWORK_NODES.length;

          const x =
            250 + Math.cos(angle) * 202;

          const y =
            250 + Math.sin(angle) * 202;

          return (
            <g
              key={node.number}
              className="fw-portal__node"
              style={{
                animationDelay: `${index * -1.05}s`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#030303"
                stroke="#FFFFFF"
                strokeWidth=".8"
                strokeOpacity=".48"
              />

              <circle
                cx={x}
                cy={y}
                r="1.55"
                fill="#FFFFFF"
                fillOpacity=".92"
              />
            </g>
          );
        })}
      </g>

      {/* ------------------------------------------
          MOVING TEST SIGNAL
      ------------------------------------------ */}

      <circle
        className="fw-portal__signal"
        cx="250"
        cy="48"
        r="2.6"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/* ==========================================================
   FULL VIEWPORT FRAMEWORK TRANSITION
========================================================== */

function FrameworkEntryTransition({
  entering,
}: {
  entering: boolean;
}) {
  return (
    <div
      className={[
        "fw-entry",
        entering ? "fw-entry--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="fw-entry__space" />

      <div className="fw-entry__stars" />

      <div className="fw-entry__grid" />

      <div className="fw-entry__vignette" />

      <div className="fw-entry__lensing">
        <span className="fw-entry__lens fw-entry__lens--1" />
        <span className="fw-entry__lens fw-entry__lens--2" />
        <span className="fw-entry__lens fw-entry__lens--3" />
        <span className="fw-entry__lens fw-entry__lens--4" />
      </div>

      <div className="fw-entry__structure">
        <span className="fw-entry__structure-glow" />

        <FrameworkEmblem transition />
      </div>

      <div className="fw-entry__aperture">
        <span className="fw-entry__aperture-glow" />
        <span className="fw-entry__aperture-ring fw-entry__aperture-ring--outer" />
        <span className="fw-entry__aperture-ring fw-entry__aperture-ring--middle" />
        <span className="fw-entry__aperture-ring fw-entry__aperture-ring--inner" />
        <span className="fw-entry__aperture-horizon" />
        <span className="fw-entry__aperture-core" />
      </div>

      <div className="fw-entry__collapse-wave" />

      <div className="fw-entry__copy">
        <span>FRAMEWORK</span>

        <small>
          Entering the inquiry architecture
        </small>
      </div>
    </div>
  );
}

/* ==========================================================
   PORTAL
========================================================== */

export default function ArcheNovaFrameworkPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const enteringRef = useRef(false);

  const [entering, setEntering] =
    useState(false);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setReducedMotion(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener(
        "change",
        update
      );

      return () => {
        media.removeEventListener(
          "change",
          update
        );
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (
        transitionTimerRef.current !== null
      ) {
        clearTimeout(
          transitionTimerRef.current
        );
      }
    };
  }, []);

  const enterFramework = useCallback(() => {
    if (enteringRef.current) {
      return;
    }

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current =
      setTimeout(() => {
        router.push("/framework");
      }, reducedMotion ? 160 : ENTRY_DURATION);
  }, [reducedMotion, router]);

  return (
    <>
      <section
        className={[
          "fw-portal",
          entering
            ? "fw-portal--entering"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="fw-portal-title"
      >
        <div className="fw-portal__stage">
          <div
            className="fw-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="fw-portal__field"
            aria-hidden="true"
          />

          <header className="fw-portal__header">
            <div className="fw-portal__identity">
              <span>FRAMEWORK</span>

              <small>
                ArcheNova&apos;s inquiry architecture
              </small>
            </div>
          </header>

          <div className="fw-portal__experience">
            <div className="fw-portal__statement">
              <h2 id="fw-portal-title">
                Implementing a Framework.
              </h2>
            </div>

            <button
              type="button"
              className="fw-portal__entry-button"
              onClick={enterFramework}
              disabled={entering}
              aria-label="Enter ArcheNova Framework"
            >
              <span className="fw-portal__artifact">
                <span
                  className="fw-portal__artifact-aura"
                  aria-hidden="true"
                />

                <span
                  className="fw-portal__artifact-orbit fw-portal__artifact-orbit--outer"
                  aria-hidden="true"
                />

                <span
                  className="fw-portal__artifact-orbit fw-portal__artifact-orbit--inner"
                  aria-hidden="true"
                />

                <span
                  className="fw-portal__artifact-orbit fw-portal__artifact-orbit--vertical"
                  aria-hidden="true"
                />

                <span
                  className="fw-portal__artifact-object"
                  aria-hidden="true"
                >
                  <FrameworkEmblem />
                </span>

                <span
                  className="fw-portal__artifact-floor"
                  aria-hidden="true"
                />

                <span className="fw-portal__tap-hint">
                  Tap the framework to enter
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {mounted &&
        createPortal(
          <FrameworkEntryTransition
            entering={entering}
          />,
          document.body
        )}

      <style jsx global>{`
        /* ==================================================
           ROOT
        ================================================== */

        .fw-portal,
        .fw-portal *,
        .fw-portal *::before,
        .fw-portal *::after,
        .fw-entry,
        .fw-entry *,
        .fw-entry *::before,
        .fw-entry *::after {
          box-sizing: border-box;
        }

        .fw-portal {
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
          outline: 0;

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

        .fw-portal button {
          font: inherit;
        }

        /* ==================================================
           TWO-ROW STAGE
        ================================================== */

        .fw-portal__stage {
          position: relative;
          isolation: isolate;

          flex: 1 0 auto;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height:
            clamp(560px, 58vw, 700px);

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr);

          overflow: hidden;

          padding:
            clamp(25px, 4vw, 50px);

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          box-shadow: none;

          transition:
            opacity 0.65s ease,
            transform 0.8s
              cubic-bezier(
                0.16,
                0.78,
                0.22,
                1
              ),
            filter 0.65s ease;
        }

        .fw-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -6;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 51%,
              rgba(
                255,
                255,
                255,
                0.026
              ),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 17% 23%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 83% 76%,
              rgba(
                255,
                255,
                255,
                0.01
              ),
              transparent 36%
            );
        }

        .fw-portal__field {
          position: absolute;
          inset: 0;
          z-index: -5;

          pointer-events: none;
          opacity: 0.095;

          background-image:
            linear-gradient(
              rgba(
                  255,
                  255,
                  255,
                  0.13
                )
                1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                  255,
                  255,
                  255,
                  0.13
                )
                1px,
              transparent 1px
            );

          background-size:
            67px 67px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at 50% 52%,
              black,
              transparent 80%
            );

          mask-image:
            radial-gradient(
              ellipse at 50% 52%,
              black,
              transparent 80%
            );
        }

        /* ==================================================
           HEADER
        ================================================== */

        .fw-portal__header {
          position: relative;
          z-index: 10;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            auto
            minmax(0, 1fr);

          align-items: start;
          align-self: start;
        }

        .fw-portal__identity {
          grid-column: 2;

          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 7px;

          text-align: center;
        }

        .fw-portal__identity > span {
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.24em;

          white-space: nowrap;
        }

        .fw-portal__identity > small {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;
          letter-spacing: 0.14em;

          white-space: nowrap;
        }

        /* ==================================================
           EXPERIENCE
        ================================================== */

        .fw-portal__experience {
          position: relative;
          z-index: 5;

          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding:
            clamp(28px, 4vw, 46px)
            0
            clamp(20px, 3vw, 32px);

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: touch;

          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .fw-portal__experience::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        .fw-portal__statement {
          position: relative;
          z-index: 5;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity 0.38s ease,
            transform 0.55s ease,
            filter 0.45s ease;
        }

        .fw-portal__statement h2 {
          width: 100%;
          max-width: 820px;

          margin: 0;

          color:
            rgba(
              250,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              39px,
              5.1vw,
              70px
            );

          font-weight: 235;
          line-height: 1.015;
          letter-spacing: -0.058em;

          text-align: center;
          overflow-wrap: break-word;
          text-wrap: balance;

          text-shadow:
            0 1px 0
              rgba(
                255,
                255,
                255,
                0.02
              );
        }

        /* ==================================================
           FRAMEWORK ARTIFACT
        ================================================== */

        .fw-portal__entry-button {
          position: relative;
          z-index: 6;

          width:
            min(100%, 520px);

          max-width: 100%;
          min-width: 0;

          display: block;

          margin-top:
            clamp(
              13px,
              1.8vw,
              22px
            );

          padding: 0;

          border: 0;
          outline: 0;

          background: transparent;
          box-shadow: none;

          color: inherit;

          cursor: pointer;

          appearance: none;
          -webkit-appearance: none;

          -webkit-tap-highlight-color:
            transparent;
        }

        .fw-portal__entry-button:disabled {
          cursor: default;
        }

        .fw-portal__entry-button:focus-visible {
          outline:
            1px solid
              rgba(
                255,
                255,
                255,
                0.18
              );

          outline-offset: 8px;
          border-radius: 50%;
        }

        .fw-portal__artifact {
          position: relative;

          width:
            min(100%, 450px);

          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.22;

          display: grid;
          place-items: center;

          margin: 0 auto;

          overflow: visible;

          background: transparent;
          border: 0;
          box-shadow: none;

          transform: translateZ(0);

          transition:
            transform 0.75s
              cubic-bezier(
                0.2,
                0.8,
                0.2,
                1
              );
        }

        .fw-portal__artifact-aura {
          position: absolute;
          z-index: 0;

          width: 80%;
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 13%,
              rgba(
                255,
                255,
                255,
                0.035
              )
                34%,
              rgba(
                255,
                255,
                255,
                0.008
              )
                54%,
              transparent 73%
            );

          filter: blur(12px);

          pointer-events: none;

          animation:
            fw-aura-breathe
            10.8s ease-in-out
            infinite;
        }

        .fw-portal__artifact-orbit {
          position: absolute;
          z-index: 1;

          left: 50%;
          top: 50%;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.034
              );

          border-radius: 50%;

          pointer-events: none;
        }

        .fw-portal__artifact-orbit--outer {
          width: 76%;
          height: 39%;

          transform:
            translate(-50%, -50%)
            rotate(-8deg);

          opacity: 0.66;
        }

        .fw-portal__artifact-orbit--inner {
          width: 58%;
          height: 28%;

          transform:
            translate(-50%, -50%)
            rotate(17deg);

          opacity: 0.4;
        }

        .fw-portal__artifact-orbit--vertical {
          width: 28%;
          height: 61%;

          transform:
            translate(-50%, -50%)
            rotate(-19deg);

          opacity: 0.2;
        }

        .fw-portal__artifact-object {
          position: relative;
          z-index: 5;

          width: 84%;
          height: 76%;

          display: grid;
          place-items: center;

          transform-style:
            preserve-3d;

          filter:
            drop-shadow(
              0 27px 40px
                rgba(0, 0, 0, 0.76)
            )
            drop-shadow(
              0 0 13px
                rgba(
                  255,
                  255,
                  255,
                  0.065
                )
            );

          animation:
            fw-artifact-breathe
            10.8s
            cubic-bezier(
              0.45,
              0,
              0.55,
              1
            )
            infinite;

          transition:
            filter 0.55s ease,
            transform 0.55s ease,
            opacity 0.55s ease;
        }

        .fw-portal__emblem {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;
        }

        .fw-portal__boundary,
        .fw-portal__evidence,
        .fw-portal__model,
        .fw-portal__correction,
        .fw-portal__claim {
          transform-box: view-box;
          transform-origin:
            250px 250px;
        }

        .fw-portal__boundary {
          animation:
            fw-boundary-breathe
            13s ease-in-out
            infinite;
        }

        .fw-portal__evidence {
          animation:
            fw-evidence-turn
            25s ease-in-out
            infinite;
        }

        .fw-portal__model {
          animation:
            fw-model-turn
            29s ease-in-out
            infinite;
        }

        .fw-portal__correction {
          animation:
            fw-correction-turn
            19s ease-in-out
            infinite;
        }

        .fw-portal__claim {
          animation:
            fw-claim-breathe
            7s ease-in-out
            infinite;
        }

        .fw-portal__node {
          animation:
            fw-node-breathe
            7s ease-in-out
            infinite;
        }

        .fw-portal__signal {
          transform-box: view-box;
          transform-origin:
            250px 250px;

          filter:
            drop-shadow(
              0 0 4px
                rgba(
                  255,
                  255,
                  255,
                  0.72
                )
            );

          animation:
            fw-signal-travel
            16s linear infinite;
        }

        .fw-portal__artifact-floor {
          position: absolute;
          z-index: 3;

          bottom: 16%;
          left: 50%;

          width: 49%;
          height: 7%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.047
              ),
              rgba(
                255,
                255,
                255,
                0.008
              )
                38%,
              rgba(
                0,
                0,
                0,
                0.24
              )
                59%,
              transparent 76%
            );

          filter: blur(9px);
          opacity: 0.58;

          animation:
            fw-floor-breathe
            10.8s ease-in-out
            infinite;
        }

        .fw-portal__tap-hint {
          position: absolute;
          z-index: 10;

          bottom: 1.5%;
          left: 50%;

          max-width: 100%;

          transform:
            translateX(-50%);

          color:
            rgba(
              255,
              255,
              255,
              0.26
            );

          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.12em;

          white-space: nowrap;

          transition:
            color 0.4s ease,
            transform 0.4s ease,
            opacity 0.35s ease;
        }

        /* ==================================================
           FULL-SCREEN FRAMEWORK ENTRY

           Same cinematic scale as Episteme,
           but the physical metaphor differs:

           Episteme:
           cognition → black-hole collapse

           Framework:
           structures → validation aperture
           → coordinate collapse
        ================================================== */

        .fw-entry {
          position: fixed;
          inset: 0;

          z-index: 2147483647;

          width: 100vw;
          height: 100vh;
          height: 100dvh;

          display: grid;
          place-items: center;

          margin: 0;
          padding: 0;

          overflow: hidden;
          overflow: clip;

          opacity: 0;
          visibility: hidden;

          pointer-events: none;

          background: #000;

          transition:
            opacity 0.12s ease,
            visibility 0s
              linear 1.65s;
        }

        .fw-entry--active {
          opacity: 1;
          visibility: visible;

          pointer-events: all;

          transition:
            opacity 0.12s ease;
        }

        .fw-entry__space {
          position: absolute;
          inset: -5%;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(
                18,
                19,
                22,
                1
              )
                0%,
              rgba(
                5,
                5,
                7,
                1
              )
                34%,
              rgba(
                1,
                1,
                2,
                1
              )
                63%,
              #000 100%
            );

          opacity: 0;

          transform: scale(1.08);
        }

        .fw-entry__stars {
          position: absolute;
          inset: -20%;

          z-index: 1;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(
                  255,
                  255,
                  255,
                  0.48
                )
                0 0.5px,
              transparent 0.9px
            ),
            radial-gradient(
              circle,
              rgba(
                  255,
                  255,
                  255,
                  0.2
                )
                0 0.4px,
              transparent 0.8px
            );

          background-size:
            89px 89px,
            139px 139px;

          background-position:
            12px 8px,
            47px 34px;

          transform: scale(1.15);
        }

        .fw-entry__grid {
          position: absolute;
          inset: -35%;

          z-index: 2;

          opacity: 0;

          background:
            repeating-linear-gradient(
              90deg,
              transparent
                0 79px,
              rgba(
                  255,
                  255,
                  255,
                  0.052
                )
                80px,
              transparent
                81px
            ),
            repeating-linear-gradient(
              0deg,
              transparent
                0 79px,
              rgba(
                  255,
                  255,
                  255,
                  0.052
                )
                80px,
              transparent
                81px
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 72%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 72%
            );
        }

        .fw-entry__vignette {
          position: absolute;
          inset: 0;

          z-index: 8;

          opacity: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 24%,
              rgba(
                0,
                0,
                0,
                0.18
              )
                49%,
              rgba(
                0,
                0,
                0,
                0.92
              )
                100%
            );
        }

        .fw-entry__lensing {
          position: absolute;

          z-index: 3;

          left: 50%;
          top: 50%;

          width:
            min(112vmin, 920px);

          aspect-ratio: 1;

          transform:
            translate(-50%, -50%)
            scale(0.3);

          opacity: 0;

          pointer-events: none;
        }

        .fw-entry__lens {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;
          border: 1px solid transparent;
        }

        .fw-entry__lens--1 {
          width: 91%;
          height: 91%;

          border-top-color:
            rgba(
              255,
              255,
              255,
              0.1
            );

          transform:
            translate(-50%, -50%)
            rotate(-18deg);
        }

        .fw-entry__lens--2 {
          width: 76%;
          height: 76%;

          border-bottom-color:
            rgba(
              255,
              255,
              255,
              0.08
            );

          transform:
            translate(-50%, -50%)
            rotate(27deg);
        }

        .fw-entry__lens--3 {
          width: 108%;
          height: 46%;

          border-top-color:
            rgba(
              255,
              255,
              255,
              0.055
            );

          transform:
            translate(-50%, -50%)
            rotate(-9deg);
        }

        .fw-entry__lens--4 {
          width: 61%;
          height: 103%;

          border-right-color:
            rgba(
              255,
              255,
              255,
              0.04
            );

          transform:
            translate(-50%, -50%)
            rotate(17deg);
        }

        .fw-entry__structure {
          position: absolute;

          z-index: 4;

          top: 50%;
          left: 50%;

          width:
            min(78vmin, 760px);

          aspect-ratio: 1;

          display: grid;
          place-items: center;

          opacity: 0;

          transform:
            translate3d(
              -50%,
              -50%,
              0
            )
            scale(0.08);

          transform-origin:
            center center;

          filter: blur(7px);

          will-change:
            transform,
            opacity,
            filter;
        }

        .fw-entry__structure-glow {
          position: absolute;

          inset: 5%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 12%,
              rgba(
                255,
                255,
                255,
                0.045
              )
                38%,
              rgba(
                255,
                255,
                255,
                0.008
              )
                59%,
              transparent 75%
            );

          filter: blur(18px);
        }

        .fw-entry__structure
        > .fw-portal__emblem--transition {
          position: relative;

          z-index: 2;

          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;
        }

        /* ------------------------------------------
           FRAMEWORK APERTURE

           Deliberately resembles an event horizon
           in scale, but remains geometric and
           architectural rather than astrophysical.
        ------------------------------------------ */

        .fw-entry__aperture {
          position: absolute;

          z-index: 6;

          top: 50%;
          left: 50%;

          width:
            min(50vmin, 470px);

          aspect-ratio: 1;

          display: grid;
          place-items: center;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.1);

          pointer-events: none;
        }

        .fw-entry__aperture-glow {
          position: absolute;

          width: 135%;
          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.02
              )
                0%,
              rgba(
                255,
                255,
                255,
                0.055
              )
                23%,
              rgba(
                255,
                255,
                255,
                0.015
              )
                43%,
              transparent 68%
            );

          filter: blur(18px);
        }

        .fw-entry__aperture-ring {
          position: absolute;

          border-radius: 50%;
        }

        .fw-entry__aperture-ring--outer {
          width: 100%;
          height: 100%;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.13
              );
        }

        .fw-entry__aperture-ring--middle {
          width: 76%;
          height: 76%;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.31
              );
        }

        .fw-entry__aperture-ring--inner {
          width: 55%;
          height: 55%;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.68
              );

          box-shadow:
            0 0 22px
              rgba(
                255,
                255,
                255,
                0.08
              );
        }

        .fw-entry__aperture-horizon {
          position: absolute;

          width: 48%;
          height: 48%;

          border-radius: 50%;

          background: #000;

          box-shadow:
            0 0 0 1px
              rgba(
                255,
                255,
                255,
                0.08
              ),
            0 0 34px
              rgba(
                255,
                255,
                255,
                0.045
              );
        }

        .fw-entry__aperture-core {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: #000;
        }

        .fw-entry__collapse-wave {
          position: absolute;

          z-index: 7;

          left: 50%;
          top: 50%;

          width: 14vmax;
          height: 14vmax;

          border-radius: 50%;

          transform:
            translate(-50%, -50%)
            scale(0.1);

          background: #000;

          opacity: 0;

          pointer-events: none;
        }

        .fw-entry__copy {
          position: absolute;

          z-index: 9;

          bottom:
            clamp(
              44px,
              8vh,
              90px
            );

          left: 50%;

          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          padding: 0 20px;

          transform:
            translate(-50%, 9px);

          opacity: 0;

          text-align: center;

          transition:
            opacity 0.32s
              ease 0.44s,
            transform 0.5s
              ease 0.44s;
        }

        .fw-entry__copy > span {
          color:
            rgba(
              246,
              248,
              249,
              0.58
            );

          font-size: 7px;
          font-weight: 620;
          letter-spacing: 0.25em;
        }

        .fw-entry__copy > small {
          color:
            rgba(
              221,
              227,
              230,
              0.2
            );

          font-size: 6px;
          letter-spacing: 0.08em;
        }

        /* ==================================================
           ENTERING
        ================================================== */

        .fw-portal--entering
        .fw-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(0.985);

          filter: blur(2px);
        }

        .fw-portal--entering
        .fw-portal__artifact-object {
          animation: none;

          transform: scale(0.31);

          opacity: 0;

          filter:
            brightness(0.22)
            blur(2px);
        }

        .fw-portal--entering
        .fw-portal__artifact-aura,
        .fw-portal--entering
        .fw-portal__artifact-orbit,
        .fw-portal--entering
        .fw-portal__artifact-floor,
        .fw-portal--entering
        .fw-portal__tap-hint {
          opacity: 0;
        }

        .fw-portal--entering
        .fw-portal__stage {
          opacity: 0;

          transform: scale(0.982);

          filter:
            brightness(0.42)
            blur(9px);
        }

        .fw-entry--active
        .fw-entry__space {
          animation:
            fw-entry-space
            1.65s ease forwards;
        }

        .fw-entry--active
        .fw-entry__stars {
          animation:
            fw-entry-stars
            1.65s ease forwards;
        }

        .fw-entry--active
        .fw-entry__grid {
          animation:
            fw-entry-grid
            1.65s ease forwards;
        }

        .fw-entry--active
        .fw-entry__lensing {
          animation:
            fw-entry-lensing
            1.65s
            cubic-bezier(
              0.16,
              0.76,
              0.2,
              1
            )
            forwards;
        }

        .fw-entry--active
        .fw-entry__structure {
          animation:
            fw-entry-structure
            1.65s
            cubic-bezier(
              0.12,
              0.72,
              0.16,
              1
            )
            forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__boundary {
          animation:
            fw-entry-boundary
            1.35s
            ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__evidence {
          animation:
            fw-entry-evidence
            1.35s
            ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__model {
          animation:
            fw-entry-model
            1.35s
            ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__correction {
          animation:
            fw-entry-correction
            1.35s
            ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__claim {
          animation:
            fw-entry-claim
            1.35s
            ease-in-out forwards;
        }

        .fw-entry--active
        .fw-entry__aperture {
          animation:
            fw-entry-aperture
            1.65s
            cubic-bezier(
              0.16,
              0.76,
              0.2,
              1
            )
            forwards;
        }

        .fw-entry--active
        .fw-entry__vignette {
          animation:
            fw-entry-vignette
            1.65s ease forwards;
        }

        .fw-entry--active
        .fw-entry__collapse-wave {
          animation:
            fw-entry-collapse
            1.65s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            )
            forwards;
        }

        .fw-entry--active
        .fw-entry__copy {
          opacity: 1;

          transform:
            translate(-50%, 0);
        }

        /* ==================================================
           PORTAL ANIMATIONS
        ================================================== */

        @keyframes fw-aura-breathe {
          0%,
          100% {
            opacity: 0.26;
            transform: scale(0.93);
          }

          50% {
            opacity: 0.66;
            transform: scale(1.055);
          }
        }

        @keyframes fw-artifact-breathe {
          0%,
          100% {
            transform:
              translateY(1px)
              scale(0.975);
          }

          50% {
            transform:
              translateY(-2px)
              scale(1.028);
          }
        }

        @keyframes fw-boundary-breathe {
          0%,
          100% {
            opacity: 0.52;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.01);
          }
        }

        @keyframes fw-evidence-turn {
          0%,
          100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(6deg);
          }
        }

        @keyframes fw-model-turn {
          0%,
          100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(-8deg);
          }
        }

        @keyframes fw-correction-turn {
          0%,
          100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(13deg);
          }
        }

        @keyframes fw-claim-breathe {
          0%,
          100% {
            opacity: 0.72;
            transform: scale(0.95);
          }

          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fw-node-breathe {
          0%,
          100% {
            opacity: 0.38;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes fw-signal-travel {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fw-floor-breathe {
          0%,
          100% {
            opacity: 0.25;

            transform:
              translateX(-50%)
              scaleX(0.84);
          }

          50% {
            opacity: 0.58;

            transform:
              translateX(-50%)
              scaleX(1.07);
          }
        }

        /* ==================================================
           ENTRY ANIMATIONS
        ================================================== */

        @keyframes fw-entry-space {
          0% {
            opacity: 0;
            transform: scale(1.08);
          }

          14%,
          100% {
            opacity: 1;
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes fw-entry-stars {
          0% {
            opacity: 0;
            transform: scale(1.15);
          }

          20% {
            opacity: 0.34;
          }

          72% {
            opacity: 0.2;
          }

          100% {
            opacity: 0;
            transform: scale(2.8);
          }
        }

        @keyframes fw-entry-grid {
          0% {
            opacity: 0;
            transform: scale(1.5);
          }

          25% {
            opacity: 0.32;
          }

          63% {
            opacity: 0.16;
          }

          100% {
            opacity: 0;
            transform: scale(0.28);
          }
        }

        @keyframes fw-entry-lensing {
          0% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.3)
              rotate(0deg);
          }

          28% {
            opacity: 0.58;
          }

          68% {
            opacity: 0.82;

            transform:
              translate(-50%, -50%)
              scale(1.03)
              rotate(8deg);
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(2.5)
              rotate(18deg);
          }
        }

        @keyframes fw-entry-structure {
          0% {
            opacity: 0;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(0.08);

            filter: blur(7px);
          }

          18% {
            opacity: 1;
          }

          48% {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(0.8);

            filter: blur(0);
          }

          69% {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(1.12);

            filter: blur(0);
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(6.5);

            filter: blur(8px);
          }
        }

        @keyframes fw-entry-boundary {
          0% {
            transform: scale(1);
            opacity: 0.58;
          }

          56% {
            transform:
              scale(1.08)
              rotate(9deg);

            opacity: 1;
          }

          100% {
            transform:
              scale(1.58)
              rotate(38deg);

            opacity: 0;
          }
        }

        @keyframes fw-entry-evidence {
          0% {
            transform: scale(1);
            opacity: 0.62;
          }

          56% {
            transform:
              scale(0.92)
              rotate(-17deg);

            opacity: 1;
          }

          100% {
            transform:
              scale(0.45)
              rotate(-67deg);

            opacity: 0;
          }
        }

        @keyframes fw-entry-model {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }

          56% {
            transform:
              scale(1.1)
              rotate(20deg);

            opacity: 1;
          }

          100% {
            transform:
              scale(1.8)
              rotate(82deg);

            opacity: 0;
          }
        }

        @keyframes fw-entry-correction {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }

          56% {
            transform:
              scale(0.86)
              rotate(-29deg);

            opacity: 1;
          }

          100% {
            transform:
              scale(0.16)
              rotate(-120deg);

            opacity: 0;
          }
        }

        @keyframes fw-entry-claim {
          0% {
            transform: scale(0.75);
            opacity: 0.32;
          }

          55% {
            transform: scale(1.28);
            opacity: 1;
          }

          100% {
            transform: scale(0.03);
            opacity: 0;
          }
        }

        @keyframes fw-entry-aperture {
          0%,
          35% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.1);
          }

          52% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(0.55);
          }

          72% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1.25);
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(9);
          }
        }

        @keyframes fw-entry-vignette {
          0% {
            opacity: 0;
          }

          54% {
            opacity: 0.26;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes fw-entry-collapse {
          0%,
          72% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.1);
          }

          79% {
            opacity: 0.18;
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(21);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .fw-portal__entry-button:hover
          .fw-portal__artifact {
            transform:
              scale(1.018)
              translateY(-2px);
          }

          .fw-portal__entry-button:hover
          .fw-portal__artifact-object {
            filter:
              drop-shadow(
                0 31px 48px
                  rgba(
                    0,
                    0,
                    0,
                    0.82
                  )
              )
              drop-shadow(
                0 0 19px
                  rgba(
                    255,
                    255,
                    255,
                    0.12
                  )
              )
              brightness(1.075);
          }

          .fw-portal__entry-button:hover
          .fw-portal__tap-hint {
            color:
              rgba(
                255,
                255,
                255,
                0.52
              );

            transform:
              translateX(-50%)
              translateY(-2px);
          }
        }

        /* ==================================================
           MOBILE
           690px REFERENCE → AVAILABLE-HEIGHT FIT

           Coordinate contract:
           header
           → title
           → artifact
           → Tap

           The complete interaction is always contained
           inside the available Work Models stage.
        ================================================== */

        @media (max-width: 700px) {
          .fw-portal {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            /*
             * 690px is the reference geometry.
             * The portal itself may shrink to the
             * height actually supplied by Work Models.
             */
            min-height: 0;
            height: 100%;
            max-height: 100%;

            overflow: hidden;
          }

          .fw-portal__stage {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            /*
             * Critical:
             * do not force a physical 690px box into
             * a shorter parent.
             *
             * 690px remains the design reference,
             * while 100% is the actual available box.
             */
            min-height: 0;
            height: 100%;
            max-height: 100%;

            display: grid;

            grid-template-rows:
              auto
              minmax(0, 1fr);

            padding:
              clamp(15px, 3.6svh, 25px)
              18px
              clamp(12px, 3.2svh, 23px);

            overflow: hidden;
          }

          .fw-portal__header {
            align-self: start;
          }

          .fw-portal__identity > span {
            font-size: 7px;
            letter-spacing: 0.2em;
          }

          .fw-portal__identity > small {
            margin-top: -1px;

            font-size: 4.5px;
            letter-spacing: 0.1em;
          }

          .fw-portal__experience {
            align-self: stretch;

            /*
             * The remaining row is the entire
             * interaction budget.
             */
            min-height: 0;

            justify-content: center;

            padding:
              clamp(10px, 3.7svh, 35px)
              0
              clamp(8px, 3.1svh, 30px);

            overflow: hidden;
          }

          .fw-portal__statement {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            flex: 0 0 auto;

            gap: 9px;
          }

          .fw-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            margin: 0;
            padding: 0 4px;

            font-size:
              clamp(
                27px,
                min(9.4vw, 5.9svh),
                46px
              );

            line-height: 1;
            letter-spacing: -0.052em;
          }

          .fw-portal__entry-button {
            width:
              min(100%, 350px);

            max-width: 100%;
            min-width: 0;

            flex:
              0 1 auto;

            margin:
              clamp(
                1px,
                1.15svh,
                8px
              )
              auto
              0;

            /*
             * Allows the visual envelope to yield
             * before the Tap label is clipped.
             */
            min-height: 0;
          }

          .fw-portal__artifact {
            /*
             * Episteme 305px reference.
             *
             * Available-height term prevents
             * short phones / embedded WorkModels
             * from losing the Tap label.
             */
            width:
              min(
                100%,
                305px,
                37svh
              );

            max-width: 100%;
            min-width: 0;

            aspect-ratio: 1.17;

            margin: 0 auto;
          }

          .fw-portal__artifact-object {
            width: 92%;
            height: 82%;
          }

          .fw-portal__artifact-aura {
            width: 75%;
          }

          .fw-portal__artifact-orbit--outer {
            width: 70%;
          }

          .fw-portal__artifact-orbit--inner {
            width: 53%;
          }

          .fw-portal__artifact-orbit--vertical {
            width: 26%;
            height: 57%;
          }

          .fw-portal__tap-hint {
            bottom: 0.5%;

            max-width:
              calc(100% - 16px);

            overflow: visible;

            font-size: 5.5px;
            letter-spacing: 0.1em;

            /*
             * No ellipsis:
             * "Tap..." is part of the required
             * interaction contract.
             */
            text-overflow: clip;
            white-space: nowrap;
          }

          .fw-entry__structure {
            width:
              min(92vmin, 610px);
          }

          .fw-entry__lensing {
            width:
              min(126vmin, 760px);
          }

          .fw-entry__aperture {
            width:
              min(62vmin, 390px);
          }
        }

        /* ==================================================
           SHORT MOBILE

           Preserve the full interaction:
           title + Framework + Tap.

           Scale the artifact before removing content.
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .fw-portal__stage {
            padding:
              14px 17px 12px;
          }

          .fw-portal__experience {
            padding:
              9px 0 7px;
          }

          .fw-portal__statement h2 {
            font-size:
              clamp(
                26px,
                min(8.9vw, 5.6svh),
                40px
              );
          }

          .fw-portal__entry-button {
            margin-top: 0;
          }

          .fw-portal__artifact {
            width:
              min(
                100%,
                265px,
                34svh
              );
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .fw-portal__stage {
            padding:
              clamp(
                14px,
                3.3svh,
                25px
              )
              15px
              clamp(
                11px,
                2.8svh,
                21px
              );
          }

          .fw-portal__identity > span {
            font-size: 6.5px;
          }

          .fw-portal__identity > small {
            font-size: 4px;
          }

          .fw-portal__statement h2 {
            font-size:
              clamp(
                27px,
                min(9.7vw, 5.8svh),
                41px
              );
          }

          .fw-portal__artifact {
            width:
              min(
                100%,
                285px,
                36svh
              );
          }

          .fw-portal__tap-hint {
            font-size: 5px;
          }
        }

        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {
          .fw-portal__stage {
            padding:
              13px 13px 11px;
          }

          .fw-portal__identity > small {
            display: none;
          }

          .fw-portal__statement h2 {
            font-size:
              clamp(
                26px,
                min(9.4vw, 5.5svh),
                37px
              );
          }

          .fw-portal__artifact {
            width:
              min(
                100%,
                255px,
                33svh
              );
          }
        }

        /* ==================================================
           EXTREMELY SHORT AVAILABLE HEIGHT

           Last-resort fit layer.
           Nothing semantically important is removed.
        ================================================== */

        @media (max-width: 700px) and (max-height: 620px) {
          .fw-portal__stage {
            padding:
              10px 13px 8px;
          }

          .fw-portal__identity {
            gap: 3px;
          }

          .fw-portal__identity > span {
            font-size: 6px;
          }

          .fw-portal__identity > small {
            font-size: 3.8px;
          }

          .fw-portal__experience {
            padding:
              5px 0 3px;
          }

          .fw-portal__statement h2 {
            font-size:
              clamp(
                24px,
                min(8.6vw, 5.2svh),
                34px
              );
          }

          .fw-portal__artifact {
            width:
              min(
                100%,
                235px,
                31svh
              );
          }

          .fw-portal__tap-hint {
            bottom: 0;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .fw-portal__artifact-aura,
          .fw-portal__artifact-object,
          .fw-portal__boundary,
          .fw-portal__evidence,
          .fw-portal__model,
          .fw-portal__correction,
          .fw-portal__claim,
          .fw-portal__node,
          .fw-portal__signal,
          .fw-portal__artifact-floor {
            animation: none !important;
          }

          .fw-portal__artifact,
          .fw-portal__artifact-object,
          .fw-portal__stage,
          .fw-portal__statement {
            transition-duration:
              0.25s !important;
          }

          .fw-entry--active
          .fw-entry__space,
          .fw-entry--active
          .fw-entry__stars,
          .fw-entry--active
          .fw-entry__grid,
          .fw-entry--active
          .fw-entry__lensing,
          .fw-entry--active
          .fw-entry__structure,
          .fw-entry--active
          .fw-entry__aperture,
          .fw-entry--active
          .fw-entry__vignette,
          .fw-entry--active
          .fw-entry__collapse-wave {
            animation:
              none !important;
          }

          .fw-entry--active
          .fw-entry__space {
            opacity: 1;
            transform: scale(1);
          }

          .fw-entry--active
          .fw-entry__structure {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(1);

            filter: none;
          }

          .fw-entry--active
          .fw-entry__aperture {
            opacity: 0.82;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          .fw-entry--active
          .fw-entry__copy {
            opacity: 1;

            transform:
              translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}