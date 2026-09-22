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

   Framework:
   - claims are provisional
   - evidence must remain distinguishable from interpretation
   - reproducibility precedes engineering authority
   - correctability bounds permissible scale

   HOME owns the only outer glass card.

   Desktop:
   - internal stage scrolls if HOME constrains its height
   - scrollbar remains invisible

   Mobile:
   - natural content height
   - HOME scrolling remains intact

   Entry:
   - independent Framework transition
   - rendered under document.body
   - centered relative to the viewport
   - destination: /framework
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

function FrameworkEmblem({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const metal = `fw-metal-${id}`;
  const light = `fw-light-${id}`;
  const core = `fw-core-${id}`;
  const atmosphere = `fw-atmosphere-${id}`;
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
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={metal}
          x1="80"
          y1="65"
          x2="420"
          y2="435"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#F7FAFF"
            stopOpacity=".88"
          />
          <stop
            offset="28%"
            stopColor="#9EADC2"
            stopOpacity=".46"
          />
          <stop
            offset="52%"
            stopColor="#3A4658"
            stopOpacity=".28"
          />
          <stop
            offset="76%"
            stopColor="#AFC0D7"
            stopOpacity=".62"
          />
          <stop
            offset="100%"
            stopColor="#F7FAFF"
            stopOpacity=".86"
          />
        </linearGradient>

        <linearGradient
          id={light}
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".06"
          />
          <stop
            offset="48%"
            stopColor="#E5F0FF"
            stopOpacity=".8"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity=".12"
          />
        </linearGradient>

        <radialGradient id={atmosphere}>
          <stop
            offset="0%"
            stopColor="#D7E8FF"
            stopOpacity=".15"
          />
          <stop
            offset="42%"
            stopColor="#9EBAD9"
            stopOpacity=".055"
          />
          <stop
            offset="100%"
            stopColor="#9EBAD9"
            stopOpacity="0"
          />
        </radialGradient>

        <radialGradient id={core}>
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />
          <stop
            offset="22%"
            stopColor="#E9F3FF"
            stopOpacity=".92"
          />
          <stop
            offset="54%"
            stopColor="#BDD7F4"
            stopOpacity=".4"
          />
          <stop
            offset="100%"
            stopColor="#BDD7F4"
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

      {/* A quiet field, not an additional card. */}
      <circle
        cx="250"
        cy="250"
        r="218"
        fill={`url(#${atmosphere})`}
      />

      {/* The external boundary of the framework. */}
      <g className="fw-portal__boundary">
        <circle
          cx="250"
          cy="250"
          r="191"
          stroke={`url(#${metal})`}
          strokeOpacity=".38"
          strokeWidth=".9"
          strokeDasharray="2 9"
        />

        <path
          d="
            M250 54
            L420 152
            L420 348
            L250 446
            L80 348
            L80 152
            Z
          "
          stroke={`url(#${metal})`}
          strokeOpacity=".52"
          strokeWidth="1.1"
        />

        <path
          d="
            M250 54
            L250 446
            M80 152
            L420 348
            M420 152
            L80 348
          "
          stroke="#E4EEFF"
          strokeOpacity=".11"
          strokeWidth=".8"
        />
      </g>

      {/* Independent evidence and test structures. */}
      <g className="fw-portal__evidence">
        <path
          d="
            M250 100
            L380 175
            L380 325
            L250 400
            L120 325
            L120 175
            Z
          "
          stroke={`url(#${metal})`}
          strokeOpacity=".67"
          strokeWidth="1.1"
        />

        <path
          d="
            M250 100
            L380 325
            L120 325
            Z
            M250 400
            L120 175
            L380 175
            Z
          "
          stroke={`url(#${light})`}
          strokeOpacity=".36"
          strokeWidth=".85"
        />
      </g>

      {/* The inner structure is distinct from the evidence layer. */}
      <g className="fw-portal__model">
        <path
          d="
            M250 146
            L340 198
            L340 302
            L250 354
            L160 302
            L160 198
            Z
          "
          stroke="#EAF3FF"
          strokeOpacity=".7"
          strokeWidth="1"
        />

        <path
          d="
            M250 146
            L250 354
            M160 198
            L340 302
            M340 198
            L160 302
          "
          stroke="#D8E9FF"
          strokeOpacity=".27"
          strokeWidth=".85"
        />

        <circle
          cx="250"
          cy="250"
          r="69"
          stroke="#DDEBFC"
          strokeOpacity=".22"
          strokeWidth=".8"
        />
      </g>

      {/* The claim remains a small, testable center. */}
      <g className="fw-portal__claim">
        <circle
          cx="250"
          cy="250"
          r="42"
          fill={`url(#${core})`}
          opacity=".16"
          filter={`url(#${glow})`}
        />

        <circle
          cx="250"
          cy="250"
          r="36"
          stroke="#F4F9FF"
          strokeOpacity=".46"
          strokeWidth=".9"
        />

        <path
          d="
            M250 221
            L279 250
            L250 279
            L221 250
            Z
          "
          stroke="#F7FBFF"
          strokeOpacity=".84"
          strokeWidth="1"
        />

        <path
          d="
            M250 221
            V279
            M221 250
            H279
          "
          stroke="#E7F2FF"
          strokeOpacity=".33"
          strokeWidth=".8"
        />

        <circle
          cx="250"
          cy="250"
          r="5"
          fill="#F8FCFF"
        />

        <circle
          cx="250"
          cy="250"
          r="2"
          fill="#FFFFFF"
          filter={`url(#${glow})`}
        />
      </g>

      {/* Six separately addressable framework gates. */}
      <g className="fw-portal__nodes">
        {FRAMEWORK_NODES.map((node, index) => {
          const angle =
            -Math.PI / 2 +
            (index * Math.PI * 2) /
              FRAMEWORK_NODES.length;

          const x =
            250 + Math.cos(angle) * 191;

          const y =
            250 + Math.sin(angle) * 191;

          return (
            <g
              key={node.number}
              className="fw-portal__node"
              style={{
                animationDelay: `${index * -1.15}s`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#070B11"
                stroke="#E5F0FF"
                strokeOpacity=".48"
                strokeWidth=".9"
              />

              <circle
                cx={x}
                cy={y}
                r="1.65"
                fill="#F5FAFF"
                fillOpacity=".88"
              />
            </g>
          );
        })}
      </g>

      {/* Moving light indicates ongoing inquiry, not validation. */}
      <circle
        className="fw-portal__signal"
        cx="250"
        cy="59"
        r="2.8"
        fill="#FFFFFF"
      />
    </svg>
  );
}

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
      <div className="fw-entry__coordinates" />
      <div className="fw-entry__vignette" />

      <div className="fw-entry__structure">
        <div className="fw-entry__halo" />
        <FrameworkEmblem transition />
      </div>

      <div className="fw-entry__aperture">
        <span className="fw-entry__aperture-ring" />
        <span className="fw-entry__aperture-core" />
      </div>

      <div className="fw-entry__wave" />

      <div className="fw-entry__copy">
        <span>FRAMEWORK</span>
        <small>Entering the inquiry architecture</small>
      </div>
    </div>
  );
}

export default function ArcheNovaFrameworkPortal() {
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
      "(prefers-reduced-motion: reduce)"
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

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const enterFramework = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      router.push("/framework");
    }, reducedMotion ? 160 : ENTRY_DURATION);
  }, [reducedMotion, router]);

  return (
    <>
      <section
        className={[
          "fw-portal",
          entering ? "fw-portal--entering" : "",
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
                ArcheNova's inquiry architecture
              </small>
            </div>

            <div className="ep-dialogue-portal__live">
            <i />
            <span>INQUIRY</span>
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
           ROOT — HOME OWNS THE OUTER GLASS
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
          min-height: 0;
          height: 100%;

          margin: 0;
          padding: 0;
          overflow: hidden;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          color: rgba(247, 250, 253, .96);
        }

        .fw-portal button {
          font: inherit;
        }

        .fw-portal,
        .fw-portal__stage {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .fw-portal::-webkit-scrollbar,
        .fw-portal__stage::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        /* ==================================================
           STAGE
        ================================================== */

        .fw-portal__stage {
          position: relative;
          isolation: isolate;

          display: grid;
          grid-template-rows:
            auto
            minmax(min-content, 1fr);

          flex: 1 1 auto;

          width: 100%;
          min-width: 0;
          min-height: 0;
          height: 100%;
          max-height: 100%;

          padding: clamp(22px, 3vw, 38px);

          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: touch;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          transition:
            opacity .45s ease,
            transform .65s ease,
            filter .6s ease;
        }

        .fw-portal__ambient,
        .fw-portal__field {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fw-portal__ambient {
          z-index: -2;
          background:
            radial-gradient(
              ellipse at 50% 51%,
              rgba(169, 198, 232, .075),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 50% 80%,
              rgba(141, 170, 210, .018),
              transparent 55%
            );
        }

        .fw-portal__field {
          z-index: -1;
          opacity: .17;

          background-image:
            linear-gradient(
              rgba(210, 227, 250, .12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(210, 227, 250, .12) 1px,
              transparent 1px
            );

          background-size: 56px 56px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 76%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 76%
            );
        }

        /* ==================================================
           HEADER — AETHERION-ALIGNED GEOMETRY
        ================================================== */

        .fw-portal__header {
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

        .fw-portal__identity {
          grid-column: 2;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          text-align: center;
        }

        .fw-portal__identity > span {
          color: rgba(255, 255, 255, .88);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: .25em;
        }

        .fw-portal__identity > small {
          color: rgba(255, 255, 255, .34);
          font-size: 7px;
          font-weight: 500;
          letter-spacing: .16em;
          white-space: nowrap;
        }

        .fw-portal__indicator {
          grid-column: 3;
          justify-self: end;

          display: inline-flex;
          align-items: center;
          gap: 8px;

          min-width: 0;

          color: rgba(240, 244, 249, .48);
          font-size: 7px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: .12em;
          white-space: nowrap;
        }

        .fw-portal__indicator i {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;
          border-radius: 50%;

          background: rgba(229, 241, 255, .78);
          box-shadow:
            0 0 10px rgba(209, 230, 255, .3);

          animation:
            fw-indicator-breathe
            8s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .fw-portal__experience {
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

          padding:
            clamp(16px, 2.2vw, 27px)
            0
            clamp(13px, 2vw, 22px);

          overflow: visible;
        }

        .fw-portal__statement {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;

          width: 100%;
          min-width: 0;
          text-align: center;

          transition:
            opacity .35s ease,
            transform .5s ease,
            filter .4s ease;
        }

        .fw-portal__eyebrow {
          color: rgba(255, 255, 255, .34);
          font-size: 7px;
          font-weight: 600;
          letter-spacing: .17em;
          text-align: center;
        }

        .fw-portal__statement h2 {
          width: 100%;
          margin: 0;

          color: rgba(250, 252, 255, .98);
          font-size: clamp(39px, 5.1vw, 70px);
          font-weight: 235;
          line-height: 1.025;
          letter-spacing: -.058em;

          text-align: center;
          text-wrap: balance;
        }

        /* ==================================================
           FRAMEWORK ARTIFACT

           Unlike Aetherion's orbital factory, this is
           a layered evidence / model / correction structure.
        ================================================== */

        .fw-portal__entry-button {
          position: relative;
          z-index: 6;

          display: block;
          width: min(100%, 360px);
          min-width: 0;

          margin:
            clamp(6px, 1vw, 12px)
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

        .fw-portal__entry-button:disabled {
          cursor: default;
        }

        .fw-portal__entry-button:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, .5);
          outline-offset: 7px;
          border-radius: 24px;
        }

        .fw-portal__artifact {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 330px);
          aspect-ratio: 1.17;

          margin: 0 auto;
          background: transparent;

          transform: translateZ(0);

          transition:
            transform .75s
            cubic-bezier(.2, .8, .2, 1);
        }

        .fw-portal__artifact-aura {
          position: absolute;
          inset: 13% 12%;
          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(195, 219, 250, .12),
              rgba(160, 193, 233, .025) 44%,
              transparent 73%
            );

          filter: blur(18px);

          animation:
            fw-aura-breathe
            12s ease-in-out infinite;
        }

        .fw-portal__artifact-object {
          position: relative;
          z-index: 2;

          display: block;
          width: 100%;
          height: 100%;

          transform-origin: center;

          animation:
            fw-artifact-float
            13s ease-in-out infinite;
        }

        .fw-portal__emblem {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;

          filter:
            drop-shadow(
              0 12px 19px rgba(0, 0, 0, .38)
            )
            drop-shadow(
              0 0 12px rgba(211, 230, 255, .08)
            );
        }

        .fw-portal__boundary,
        .fw-portal__evidence,
        .fw-portal__model,
        .fw-portal__claim {
          transform-box: view-box;
          transform-origin: 250px 250px;
        }

        .fw-portal__boundary {
          animation:
            fw-boundary-breathe
            14s ease-in-out infinite;
        }

        .fw-portal__evidence {
          animation:
            fw-evidence-turn
            25s ease-in-out infinite;
        }

        .fw-portal__model {
          animation:
            fw-model-turn
            29s ease-in-out infinite;
        }

        .fw-portal__claim {
          animation:
            fw-claim-breathe
            7s ease-in-out infinite;
        }

        .fw-portal__node {
          animation:
            fw-node-breathe
            7s ease-in-out infinite;
        }

        .fw-portal__signal {
          transform-box: view-box;
          transform-origin: 250px 250px;

          filter:
            drop-shadow(
              0 0 4px rgba(235, 245, 255, .7)
            );

          animation:
            fw-signal-travel
            16s linear infinite;
        }

        .fw-portal__artifact-floor {
          position: absolute;
          z-index: 1;
          bottom: 13%;

          width: 44%;
          height: 7%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(214, 231, 255, .065),
              transparent 72%
            );

          filter: blur(12px);

          animation:
            fw-floor-breathe
            12s ease-in-out infinite;
        }

        .fw-portal__tap-hint {
          position: absolute;
          z-index: 4;

          bottom: 0;
          left: 50%;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, .4);
          font-size: 8px;
          font-weight: 550;
          letter-spacing: .12em;
          white-space: nowrap;

          transition:
            color .3s ease,
            transform .3s ease;
        }

        /* ==================================================
           VIEWPORT ENTRY — NOT CLIPPED BY HOME
        ================================================== */

        .fw-entry {
          position: fixed;
          inset: 0;
          z-index: 2147483647;

          display: grid;
          place-items: center;

          width: 100%;
          height: 100%;
          height: 100dvh;

          margin: 0;
          padding: 0;

          overflow: hidden;
          overflow: clip;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          background: #05080d;

          transition:
            opacity .12s ease,
            visibility 0s linear 1.65s;
        }

        .fw-entry--active {
          opacity: 1;
          visibility: visible;
          pointer-events: all;

          transition: opacity .12s ease;
        }

        .fw-entry__space,
        .fw-entry__coordinates,
        .fw-entry__vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fw-entry__space {
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              #1C2938,
              #0B111B 42%,
              #030509 76%,
              #000 100%
            );
        }

        .fw-entry__coordinates {
          inset: -25%;
          opacity: 0;

          background:
            repeating-linear-gradient(
              90deg,
              transparent 0 78px,
              rgba(207, 228, 255, .065) 79px,
              transparent 80px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 78px,
              rgba(207, 228, 255, .065) 79px,
              transparent 80px
            );

          transform:
            perspective(800px)
            rotateX(0deg)
            scale(1.5);

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 73%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 73%
            );
        }

        .fw-entry__vignette {
          z-index: 4;
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 8%,
              rgba(0, 0, 0, .32) 55%,
              #000 100%
            );
        }

        .fw-entry__structure {
          position: absolute;
          z-index: 3;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: min(88vw, 680px);
          aspect-ratio: 1;

          margin: 0;
          padding: 0;

          opacity: 0;

          transform:
            translate3d(-50%, -50%, 0)
            scale(.14);

          transform-origin: center center;

          filter: blur(8px);

          will-change: transform, opacity, filter;
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

        .fw-entry__halo {
          position: absolute;
          inset: 16%;
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(210, 232, 255, .13),
              rgba(210, 232, 255, .025) 43%,
              transparent 72%
            );

          filter: blur(26px);
        }

        .fw-entry__aperture {
          position: absolute;
          z-index: 5;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: min(18vw, 120px);
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(.2);
        }

        .fw-entry__aperture-ring {
          position: absolute;

          width: 100%;
          aspect-ratio: 1;

          border:
            1px solid rgba(234, 245, 255, .7);
          border-radius: 50%;

          box-shadow:
            0 0 30px rgba(211, 234, 255, .16);
        }

        .fw-entry__aperture-core {
          width: 19%;
          aspect-ratio: 1;
          border-radius: 50%;

          background: #F8FCFF;

          box-shadow:
            0 0 18px rgba(226, 243, 255, .7),
            0 0 50px rgba(226, 243, 255, .25);
        }

        .fw-entry__wave {
          position: absolute;
          z-index: 6;

          top: 50%;
          left: 50%;

          width: 12vmax;
          aspect-ratio: 1;

          border-radius: 50%;
          background: #000;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(.1);
        }

        .fw-entry__copy {
          position: absolute;
          z-index: 7;

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
            opacity .3s ease .45s,
            transform .4s ease .45s;
        }

        .fw-entry__copy > span {
          color: rgba(247, 250, 253, .78);
          font-size: 9px;
          font-weight: 620;
          letter-spacing: .25em;
        }

        .fw-entry__copy > small {
          color: rgba(229, 239, 248, .4);
          font-size: 8px;
          letter-spacing: .1em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .fw-portal--entering
        .fw-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(.98);

          filter: blur(3px);
        }

        .fw-portal--entering
        .fw-portal__stage {
          opacity: 0;

          transform: scale(.975);

          filter:
            brightness(.35)
            blur(8px);
        }

        .fw-entry--active .fw-entry__space {
          animation:
            fw-space-enter
            1.65s ease forwards;
        }

        .fw-entry--active .fw-entry__coordinates {
          animation:
            fw-coordinates-enter
            1.65s ease forwards;
        }

        .fw-entry--active .fw-entry__structure {
          animation:
            fw-structure-enter
            1.65s
            cubic-bezier(.16, .76, .2, 1)
            forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__boundary {
          animation:
            fw-entry-boundary
            1.2s ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__evidence {
          animation:
            fw-entry-evidence
            1.2s ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__model {
          animation:
            fw-entry-model
            1.2s ease-in-out forwards;
        }

        .fw-entry--active
        .fw-portal__emblem--transition
        .fw-portal__claim {
          animation:
            fw-entry-claim
            1.2s ease-in-out forwards;
        }

        .fw-entry--active .fw-entry__aperture {
          animation:
            fw-aperture-open
            1.65s ease forwards;
        }

        .fw-entry--active .fw-entry__vignette {
          animation:
            fw-vignette-enter
            1.65s ease forwards;
        }

        .fw-entry--active .fw-entry__wave {
          animation:
            fw-wave-enter
            1.65s
            cubic-bezier(.4, 0, .2, 1)
            forwards;
        }

        .fw-entry--active .fw-entry__copy {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* ==================================================
           AMBIENT ANIMATION
        ================================================== */

        @keyframes fw-indicator-breathe {
          0%, 100% {
            opacity: .45;
            transform: scale(.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes fw-aura-breathe {
          0%, 100% {
            opacity: .42;
            transform: scale(.97);
          }

          50% {
            opacity: .8;
            transform: scale(1.04);
          }
        }

        @keyframes fw-artifact-float {
          0%, 100% {
            transform:
              translateY(2px)
              scale(.994);
          }

          50% {
            transform:
              translateY(-3px)
              scale(1.006);
          }
        }

        @keyframes fw-boundary-breathe {
          0%, 100% {
            opacity: .55;
            transform: scale(.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.01);
          }
        }

        @keyframes fw-evidence-turn {
          0%, 100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(8deg);
          }
        }

        @keyframes fw-model-turn {
          0%, 100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(-8deg);
          }
        }

        @keyframes fw-claim-breathe {
          0%, 100% {
            opacity: .76;
            transform: scale(.96);
          }

          50% {
            opacity: 1;
            transform: scale(1.045);
          }
        }

        @keyframes fw-node-breathe {
          0%, 100% {
            opacity: .4;
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
          0%, 100% {
            opacity: .35;
            transform: scaleX(.9);
          }

          50% {
            opacity: .7;
            transform: scaleX(1.05);
          }
        }

        /* ==================================================
           ENTRY ANIMATION
        ================================================== */

        @keyframes fw-space-enter {
          0% {
            opacity: 0;
          }

          16%, 100% {
            opacity: 1;
          }
        }

        @keyframes fw-coordinates-enter {
          0% {
            opacity: 0;
            transform: scale(1.5);
          }

          30% {
            opacity: .5;
          }

          100% {
            opacity: 0;
            transform: scale(.55);
          }
        }

        @keyframes fw-structure-enter {
          0% {
            opacity: 0;

            transform:
              translate3d(-50%, -50%, 0)
              scale(.14);

            filter: blur(8px);
          }

          20% {
            opacity: 1;
          }

          47% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(.75);

            filter: blur(0);
          }

          68% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1);

            filter: blur(0);
          }

          100% {
            opacity: 0;

            transform:
              translate3d(-50%, -50%, 0)
              scale(5.2);

            filter: blur(8px);
          }
        }

        @keyframes fw-entry-boundary {
          0% {
            transform: scale(1);
            opacity: .55;
          }

          55% {
            transform: scale(1.1) rotate(10deg);
            opacity: 1;
          }

          100% {
            transform: scale(1.45) rotate(35deg);
            opacity: 0;
          }
        }

        @keyframes fw-entry-evidence {
          0% {
            transform: scale(1);
            opacity: .65;
          }

          55% {
            transform: scale(.95) rotate(-15deg);
            opacity: 1;
          }

          100% {
            transform: scale(.7) rotate(-55deg);
            opacity: 0;
          }
        }

        @keyframes fw-entry-model {
          0% {
            transform: scale(1);
            opacity: .7;
          }

          55% {
            transform: scale(1.08) rotate(18deg);
            opacity: 1;
          }

          100% {
            transform: scale(1.5) rotate(65deg);
            opacity: 0;
          }
        }

        @keyframes fw-entry-claim {
          0% {
            transform: scale(.7);
            opacity: .3;
          }

          55% {
            transform: scale(1.2);
            opacity: 1;
          }

          100% {
            transform: scale(.1);
            opacity: 0;
          }
        }

        @keyframes fw-aperture-open {
          0%, 42% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(.2);
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

        @keyframes fw-vignette-enter {
          0% {
            opacity: 0;
          }

          55% {
            opacity: .38;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes fw-wave-enter {
          0%, 73% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(.1);
          }

          80% {
            opacity: .22;
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
          .fw-portal__entry-button:hover
          .fw-portal__artifact {
            transform:
              translateY(-2px)
              scale(1.035);
          }

          .fw-portal__entry-button:hover
          .fw-portal__emblem {
            filter:
              drop-shadow(
                0 15px 22px rgba(0, 0, 0, .43)
              )
              drop-shadow(
                0 0 13px rgba(211, 230, 255, .16)
              );
          }

          .fw-portal__entry-button:hover
          .fw-portal__tap-hint {
            color: rgba(255, 255, 255, .7);

            transform:
              translate(-50%, -2px);
          }
        }

        /* ==================================================
           MOBILE — NATURAL HOME SCROLL
        ================================================== */

        @media (max-width: 700px) {
          .fw-portal {
            display: block;

            min-height: 0;
            height: auto;
            max-height: none;

            overflow: visible;
          }

          .fw-portal__stage {
            display: grid;
            grid-template-rows:
              auto
              minmax(min-content, 1fr);

            min-height:
              max(690px, calc(100svh - 42px));

            height: auto;
            max-height: none;

            padding: 25px 18px 23px;

            overflow: visible;
            overscroll-behavior: auto;
          }

          .fw-portal__header {
            grid-template-columns: minmax(0, 1fr);
            justify-items: center;
            row-gap: 12px;
          }

          .fw-portal__identity {
            grid-column: 1;
            grid-row: 1;
            gap: 7px;
          }

          .fw-portal__identity > span {
            font-size: 9px;
            letter-spacing: .21em;
          }

          .fw-portal__identity > small {
            font-size: 6px;
            letter-spacing: .1em;
          }

          .fw-portal__indicator {
            grid-column: 1;
            grid-row: 2;
            justify-self: center;

            gap: 6px;
            font-size: 7px;
            letter-spacing: .09em;
          }

          .fw-portal__indicator i {
            width: 4px;
            height: 4px;
            flex-basis: 4px;
          }

          .fw-portal__experience {
            align-self: stretch;
            justify-content: center;

            min-height: min-content;
            height: auto;
            max-height: none;

            padding: 30px 0 24px;
            overflow: visible;
          }

          .fw-portal__statement {
            gap: 12px;
          }

          .fw-portal__eyebrow {
            font-size: 6px;
            letter-spacing: .1em;
          }

          .fw-portal__statement h2 {
            font-size: clamp(33px, 9.2vw, 46px);
            line-height: 1.035;
            letter-spacing: -.054em;
          }

          .fw-portal__entry-button {
            width: min(100%, 340px);
            margin-top: 12px;
          }

          .fw-portal__artifact {
            width: min(100%, 310px);
            aspect-ratio: 1.12;
          }

          .fw-portal__tap-hint {
            font-size: 7px;
            letter-spacing: .08em;
          }

          .fw-entry__structure {
            width: min(88vw, 520px);
          }
        }

        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .fw-portal__stage {
            padding: 22px 17px 19px;
          }

          .fw-portal__experience {
            padding: 22px 0 18px;
          }

          .fw-portal__statement h2 {
            font-size: clamp(31px, 8.9vw, 42px);
          }

          .fw-portal__entry-button {
            margin-top: 7px;
          }

          .fw-portal__artifact {
            width: min(100%, 285px);
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .fw-portal__stage {
            padding: 25px 15px 21px;
          }

          .fw-portal__statement h2 {
            font-size: clamp(32px, 9.5vw, 42px);
          }

          .fw-portal__artifact {
            width: min(100%, 295px);
          }
        }

        @media (max-width: 360px) {
          .fw-portal__stage {
            padding: 23px 13px 19px;
          }

          .fw-portal__statement h2 {
            font-size: clamp(29px, 9.2vw, 37px);
          }

          .fw-portal__artifact {
            width: min(100%, 260px);
          }

          .fw-portal__eyebrow {
            font-size: 5.5px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .fw-portal__indicator i,
          .fw-portal__artifact-aura,
          .fw-portal__artifact-object,
          .fw-portal__boundary,
          .fw-portal__evidence,
          .fw-portal__model,
          .fw-portal__claim,
          .fw-portal__node,
          .fw-portal__signal,
          .fw-portal__artifact-floor {
            animation: none !important;
          }

          .fw-portal__artifact,
          .fw-portal__stage,
          .fw-portal__statement {
            transition-duration: .12s !important;
          }

          .fw-entry--active .fw-entry__space,
          .fw-entry--active .fw-entry__coordinates,
          .fw-entry--active .fw-entry__structure,
          .fw-entry--active
          .fw-portal__emblem--transition
          .fw-portal__boundary,
          .fw-entry--active
          .fw-portal__emblem--transition
          .fw-portal__evidence,
          .fw-entry--active
          .fw-portal__emblem--transition
          .fw-portal__model,
          .fw-entry--active
          .fw-portal__emblem--transition
          .fw-portal__claim,
          .fw-entry--active .fw-entry__aperture,
          .fw-entry--active .fw-entry__vignette,
          .fw-entry--active .fw-entry__wave {
            animation: none !important;
          }

          .fw-entry--active .fw-entry__space {
            opacity: 1;
          }

          .fw-entry--active .fw-entry__structure {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1);

            filter: none;
          }

          .fw-entry--active .fw-entry__copy {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}