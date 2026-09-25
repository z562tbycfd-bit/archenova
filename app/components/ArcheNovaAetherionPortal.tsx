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
   ARCHENOVA AETHERION PORTAL

   WORKMODELS GEOMETRY CONTRACT
   ----------------------------------------------------------
   Parent WorkModels owns:
   - available width
   - available height
   - --wm-model-reference-height
   - --wm-model-height
   - --wm-model-scale
   - outer clipping boundary
   - outer navigation

   Aetherion owns:
   - identity
   - statement
   - physical-realization artifact
   - Tap row
   - fullscreen transition

   REFERENCE
   ----------------------------------------------------------
   Canonical reference height:
   690px

   IMPORTANT:
   Aetherion never demands 690px from the parent.

   Instead:

   Parent available height
      ↓
   Identity
      ↓
   Statement
      ↓
   Flexible artifact region
      ↓
   Tap row
      ↓
   Parent frame bottom

   Only the artifact region is allowed to absorb most
   vertical contraction.

   No whole-model transform: scale().
========================================================== */

const AETHERION_NODES = [
  { number: "01", name: "ENGINEERING" },
  { number: "02", name: "FABRICATION" },
  { number: "03", name: "TESTING" },
  { number: "04", name: "CORRECTION" },
  { number: "05", name: "REPRODUCTION" },
  { number: "06", name: "RELEASE" },
] as const;

const ENTRY_DURATION = 1700;

/* ==========================================================
   AETHERION EMBLEM

   Physical-realization architecture:

   Outer system
   → capability / production boundary

   Middle system
   → fabrication trajectories

   Inner system
   → realization chamber

   Center
   → living physical-realization core
========================================================== */

function AetherionEmblem({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const metal = `ae-metal-${id}`;
  const metalSoft = `ae-metal-soft-${id}`;
  const orbitalLight = `ae-orbital-light-${id}`;
  const atmosphere = `ae-atmosphere-${id}`;
  const chamber = `ae-chamber-${id}`;
  const core = `ae-core-${id}`;
  const coreOuter = `ae-core-outer-${id}`;
  const glow = `ae-glow-${id}`;
  const softGlow = `ae-soft-glow-${id}`;

  return (
    <svg
      className={[
        "ae-portal__emblem",
        transition
          ? "ae-portal__emblem--transition"
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
          id={metal}
          x1="74"
          y1="68"
          x2="430"
          y2="432"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFF8F8"
            stopOpacity=".9"
          />

          <stop
            offset="22%"
            stopColor="#C6B9C5"
            stopOpacity=".5"
          />

          <stop
            offset="48%"
            stopColor="#514B56"
            stopOpacity=".25"
          />

          <stop
            offset="72%"
            stopColor="#BBAEBB"
            stopOpacity=".58"
          />

          <stop
            offset="100%"
            stopColor="#FFF8F7"
            stopOpacity=".88"
          />
        </linearGradient>

        <linearGradient
          id={metalSoft}
          x1="90"
          y1="410"
          x2="410"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#D9C8D6"
            stopOpacity=".08"
          />

          <stop
            offset="48%"
            stopColor="#FFF8F5"
            stopOpacity=".62"
          />

          <stop
            offset="100%"
            stopColor="#D9C8D6"
            stopOpacity=".08"
          />
        </linearGradient>

        <linearGradient
          id={orbitalLight}
          x1="58"
          y1="250"
          x2="442"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#FFF8F5"
            stopOpacity="0"
          />

          <stop
            offset="31%"
            stopColor="#F0DDE8"
            stopOpacity=".22"
          />

          <stop
            offset="50%"
            stopColor="#FFFFFF"
            stopOpacity=".95"
          />

          <stop
            offset="69%"
            stopColor="#EEDAE6"
            stopOpacity=".2"
          />

          <stop
            offset="100%"
            stopColor="#FFF8F5"
            stopOpacity="0"
          />
        </linearGradient>

        <radialGradient id={atmosphere}>
          <stop
            offset="0%"
            stopColor="#E9D8E3"
            stopOpacity=".13"
          />

          <stop
            offset="45%"
            stopColor="#BDA9B8"
            stopOpacity=".04"
          />

          <stop
            offset="100%"
            stopColor="#9C8F9B"
            stopOpacity="0"
          />
        </radialGradient>

        <radialGradient id={chamber}>
          <stop
            offset="0%"
            stopColor="#FFF9F5"
            stopOpacity=".13"
          />

          <stop
            offset="45%"
            stopColor="#BCA9B9"
            stopOpacity=".08"
          />

          <stop
            offset="100%"
            stopColor="#28232B"
            stopOpacity=".02"
          />
        </radialGradient>

        <radialGradient id={coreOuter}>
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity=".6"
          />

          <stop
            offset="22%"
            stopColor="#FFF1EE"
            stopOpacity=".42"
          />

          <stop
            offset="53%"
            stopColor="#E4BDD4"
            stopOpacity=".15"
          />

          <stop
            offset="100%"
            stopColor="#C6A7BE"
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
            offset="24%"
            stopColor="#FFF9F2"
            stopOpacity=".96"
          />

          <stop
            offset="55%"
            stopColor="#F3DCE5"
            stopOpacity=".58"
          />

          <stop
            offset="100%"
            stopColor="#C7A8BF"
            stopOpacity="0"
          />
        </radialGradient>

        <filter
          id={glow}
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation="8" />
        </filter>

        <filter
          id={softGlow}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Quiet physical-realization field */}
      <circle
        cx="250"
        cy="250"
        r="220"
        fill={`url(#${atmosphere})`}
      />

      {/* ==================================================
          OUTER CAPABILITY BOUNDARY
      ================================================== */}

      <g className="ae-portal__boundary">
        <circle
          cx="250"
          cy="250"
          r="190"
          stroke={`url(#${metal})`}
          strokeOpacity=".34"
          strokeWidth=".9"
          strokeDasharray="2 9"
        />

        <circle
          cx="250"
          cy="250"
          r="174"
          stroke={`url(#${metalSoft})`}
          strokeOpacity=".22"
          strokeWidth=".8"
        />
      </g>

      {/* ==================================================
          FABRICATION RINGS
      ================================================== */}

      <g className="ae-portal__orbit ae-portal__orbit--one">
        <ellipse
          cx="250"
          cy="250"
          rx="172"
          ry="67"
          stroke={`url(#${metal})`}
          strokeOpacity=".54"
          strokeWidth="1.1"
        />

        <ellipse
          className="ae-portal__current ae-portal__current--one"
          cx="250"
          cy="250"
          rx="172"
          ry="67"
          stroke={`url(#${orbitalLight})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="28 1100"
        />
      </g>

      <g className="ae-portal__orbit ae-portal__orbit--two">
        <ellipse
          cx="250"
          cy="250"
          rx="172"
          ry="67"
          stroke={`url(#${metal})`}
          strokeOpacity=".44"
          strokeWidth="1"
        />

        <ellipse
          className="ae-portal__current ae-portal__current--two"
          cx="250"
          cy="250"
          rx="172"
          ry="67"
          stroke="#FFF6F5"
          strokeOpacity=".65"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="19 1100"
        />
      </g>

      <g className="ae-portal__orbit ae-portal__orbit--three">
        <ellipse
          cx="250"
          cy="250"
          rx="172"
          ry="67"
          stroke={`url(#${metal})`}
          strokeOpacity=".4"
          strokeWidth="1"
        />

        <ellipse
          className="ae-portal__current ae-portal__current--three"
          cx="250"
          cy="250"
          rx="172"
          ry="67"
          stroke="#F5E4ED"
          strokeOpacity=".58"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="23 1100"
        />
      </g>

      {/* ==================================================
          MANUFACTURING SPINE
      ================================================== */}

      <g className="ae-portal__spine">
        <path
          d="M250 103 V397"
          stroke={`url(#${metalSoft})`}
          strokeOpacity=".32"
          strokeWidth=".8"
        />

        <path
          d="
            M123 176
            L377 324
            M377 176
            L123 324
          "
          stroke={`url(#${metalSoft})`}
          strokeOpacity=".18"
          strokeWidth=".75"
        />

        <circle
          cx="250"
          cy="250"
          r="116"
          stroke="#F4E7EE"
          strokeOpacity=".11"
          strokeWidth=".75"
          strokeDasharray="1 8"
        />
      </g>

      {/* ==================================================
          REALIZATION CHAMBER
      ================================================== */}

      <g className="ae-portal__chamber">
        <circle
          cx="250"
          cy="250"
          r="75"
          fill={`url(#${chamber})`}
          stroke="#F1E2EA"
          strokeOpacity=".18"
          strokeWidth=".8"
        />

        <circle
          cx="250"
          cy="250"
          r="58"
          stroke="#F8EDF2"
          strokeOpacity=".21"
          strokeWidth=".85"
        />

        <path
          d="
            M250 192
            L300 221
            L300 279
            L250 308
            L200 279
            L200 221
            Z
          "
          stroke={`url(#${metal})`}
          strokeOpacity=".48"
          strokeWidth=".9"
        />

        <path
          d="
            M250 192
            V308
            M200 221
            L300 279
            M300 221
            L200 279
          "
          stroke="#F7EAF0"
          strokeOpacity=".16"
          strokeWidth=".7"
        />
      </g>

      {/* ==================================================
          LIVING REALIZATION CORE
      ================================================== */}

      <g className="ae-portal__core">
        <circle
          className="ae-portal__core-atmosphere"
          cx="250"
          cy="250"
          r="46"
          fill={`url(#${coreOuter})`}
          filter={`url(#${glow})`}
        />

        <circle
          className="ae-portal__core-shell"
          cx="250"
          cy="250"
          r="28"
          fill={`url(#${chamber})`}
          stroke="#FFF3F2"
          strokeOpacity=".38"
          strokeWidth=".85"
        />

        <path
          className="ae-portal__core-flame ae-portal__core-flame--outer"
          d="
            M250 222
            C257 232 267 238 263 248
            C273 246 270 260 261 267
            C253 275 239 270 234 260
            C228 249 235 239 243 235
            C244 230 247 225 250 222
            Z
          "
          fill={`url(#${coreOuter})`}
        />

        <path
          className="ae-portal__core-flame ae-portal__core-flame--inner"
          d="
            M251 234
            C255 241 260 245 257 252
            C261 257 256 264 250 264
            C242 264 238 257 242 251
            C246 247 248 241 251 234
            Z
          "
          fill={`url(#${core})`}
        />

        <circle
          className="ae-portal__core-heart"
          cx="250"
          cy="251"
          r="7"
          fill={`url(#${core})`}
        />

        <circle
          className="ae-portal__core-heart-light"
          cx="250"
          cy="251"
          r="2.4"
          fill="#FFFFFF"
          filter={`url(#${softGlow})`}
        />

        <path
          className="ae-portal__core-filament"
          d="
            M232 250
            C239 241 245 247 250 239
            C256 247 263 242 269 251

            M236 259
            C244 254 251 265 264 257
          "
          stroke="#FFF5F3"
          strokeOpacity=".46"
          strokeWidth=".7"
          strokeLinecap="round"
        />
      </g>

      {/* ==================================================
          SIX CAPABILITY NODES
      ================================================== */}

      <g className="ae-portal__nodes">
        {AETHERION_NODES.map((node, index) => {
          const angle =
            -Math.PI / 2 +
            (index * Math.PI * 2) /
              AETHERION_NODES.length;

          const x =
            250 + Math.cos(angle) * 190;

          const y =
            250 + Math.sin(angle) * 190;

          return (
            <g
              key={node.number}
              className="ae-portal__node"
              style={{
                animationDelay: `${index * -1.2}s`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#09090D"
                stroke="#F1E4EB"
                strokeOpacity=".5"
                strokeWidth=".9"
              />

              <circle
                cx={x}
                cy={y}
                r="1.55"
                fill="#FFF8F5"
                fillOpacity=".9"
              />
            </g>
          );
        })}
      </g>

      {/* Persistent manufacturing signal */}
      <circle
        className="ae-portal__signal"
        cx="250"
        cy="60"
        r="2.6"
        fill="#FFF9F6"
      />
    </svg>
  );
}

/* ==========================================================
   FULL VIEWPORT ENTRY TRANSITION
========================================================== */

function AetherionEntryTransition({
  entering,
}: {
  entering: boolean;
}) {
  return (
    <div
      className={[
        "ae-entry",
        entering ? "ae-entry--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="ae-entry__space" />
      <div className="ae-entry__stars" />
      <div className="ae-entry__coordinates" />
      <div className="ae-entry__vignette" />

      <div className="ae-entry__architecture">
        <div className="ae-entry__halo" />

        <AetherionEmblem transition />

        <div className="ae-entry__aperture">
          <span className="ae-entry__aperture-ring ae-entry__aperture-ring--outer" />
          <span className="ae-entry__aperture-ring ae-entry__aperture-ring--inner" />
          <span className="ae-entry__aperture-core" />
        </div>
      </div>

      <div className="ae-entry__wave" />

      <div className="ae-entry__copy">
        <span>AETHERION</span>

        <small>
          Entering physical realization
        </small>
      </div>
    </div>
  );
}

/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaAetherionPortal() {
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

  const enterAetherion = useCallback(() => {
    if (enteringRef.current) {
      return;
    }

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current =
      setTimeout(() => {
        router.push("/aetherion");
      }, reducedMotion ? 160 : ENTRY_DURATION);
  }, [reducedMotion, router]);

  return (
    <>
      <section
        className={[
          "ae-portal",
          entering
            ? "ae-portal--entering"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="ae-portal-title"
      >
        <div className="ae-portal__stage">
          <div
            className="ae-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="ae-portal__starfield"
            aria-hidden="true"
          />

          {/* =================================================
              ROW 1 — IDENTITY
          ================================================= */}

          <header className="ae-portal__header">
            <div className="ae-portal__identity">
              <span>AETHERION</span>

              <small>
                ArcheNova&apos;s physical realization architecture
              </small>
            </div>
          </header>

          {/* =================================================
              ROW 2 — STATEMENT
          ================================================= */}

          <div className="ae-portal__statement">
            <h2 id="ae-portal-title">
              Build with Aetherion.
            </h2>
          </div>

          {/* =================================================
              ROW 3 — FLEXIBLE PHYSICAL-REALIZATION FIELD

              This row receives the remaining parent height.
              Artifact geometry contracts inside this row.
          ================================================= */}

          <button
            type="button"
            className="ae-portal__entry-button"
            onClick={enterAetherion}
            disabled={entering}
            aria-label="Enter Aetherion, ArcheNova's physical realization architecture"
          >
            <span className="ae-portal__visual-slot">
              <span
                className="ae-portal__artifact-aura"
                aria-hidden="true"
              />

              <span
                className="ae-portal__artifact-object"
                aria-hidden="true"
              >
                <AetherionEmblem />
              </span>

              <span
                className="ae-portal__artifact-floor"
                aria-hidden="true"
              />
            </span>
          </button>

          {/* =================================================
              ROW 4 — DEDICATED TAP ROW

              The Tap instruction is no longer absolutely
              positioned inside the artifact.

              Therefore:
              artifact → Tap → parent bottom

              remains physically guaranteed.
          ================================================= */}

          <button
            type="button"
            className="ae-portal__tap-row"
            onClick={enterAetherion}
            disabled={entering}
            aria-label="Enter Aetherion"
          >
            <span className="ae-portal__tap-hint">
              Tap Aetherion to enter
            </span>
          </button>
        </div>
      </section>

      {mounted &&
        createPortal(
          <AetherionEntryTransition
            entering={entering}
          />,
          document.body
        )}

      <style jsx global>{`
        /* ==================================================
           BOX MODEL
        ================================================== */

        .ae-portal,
        .ae-portal *,
        .ae-portal *::before,
        .ae-portal *::after,
        .ae-entry,
        .ae-entry *,
        .ae-entry *::before,
        .ae-entry *::after {
          box-sizing: border-box;
        }

        /* ==================================================
           ROOT

           IMPORTANT:
           Parent WorkModels height is authoritative.

           No:
           min-height: 690px
           max(690px, ...)
           100svh dependency
        ================================================== */

        .ae-portal {
          position: relative;

          display: block;

          width: 100%;
          height: 100%;

          max-width: 100%;
          max-height: 100%;

          min-width: 0;
          min-height: 0;

          margin: 0;
          padding: 0;

          overflow: hidden;

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;

          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          color:
            rgba(247, 249, 251, 0.94);
        }

        .ae-portal button {
          font: inherit;
        }

        /* ==================================================
           FOUR-ROW STAGE

           1. identity
           2. statement
           3. flexible artifact
           4. Tap

           Only row 3 receives remaining height.
        ================================================== */

        .ae-portal__stage {
          position: relative;
          isolation: isolate;

          width: 100%;
          height: 100%;

          max-width: 100%;
          max-height: 100%;

          min-width: 0;
          min-height: 0;

          display: grid;

          grid-template-rows:
            auto
            auto
            minmax(0, 1fr)
            auto;

          align-items: stretch;

          padding:
            clamp(18px, 3.4vw, 40px)
            clamp(18px, 3.8vw, 42px)
            clamp(14px, 2.8vw, 30px);

          overflow: hidden;

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;

          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          transition:
            opacity 0.45s ease,
            transform 0.65s ease,
            filter 0.6s ease;
        }

        /* ==================================================
           AMBIENT FIELD
        ================================================== */

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
              ellipse at 50% 52%,
              rgba(222, 204, 217, 0.055),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 50% 78%,
              rgba(185, 167, 181, 0.018),
              transparent 54%
            );
        }

        .ae-portal__starfield {
          z-index: -1;

          opacity: 0.13;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.48)
                0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.2)
                0 0.35px,
              transparent 0.7px
            );

          background-size:
            71px 71px,
            109px 109px;

          background-position:
            0 0,
            29px 23px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 82%
            );

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 82%
            );
        }

        /* ==================================================
           ROW 1 — IDENTITY
        ================================================== */

        .ae-portal__header {
          position: relative;
          z-index: 10;

          width: 100%;
          min-width: 0;

          display: flex;
          justify-content: center;
          align-items: flex-start;

          flex: none;
        }

        .ae-portal__identity {
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap:
            clamp(3px, 0.65vh, 7px);

          text-align: center;
        }

        .ae-portal__identity > span {
          color:
            rgba(255, 255, 255, 0.82);

          font-size:
            clamp(6px, 0.72vw, 9px);

          font-weight: 650;

          line-height: 1.2;

          letter-spacing: 0.24em;

          white-space: nowrap;
        }

        .ae-portal__identity > small {
          color:
            rgba(255, 255, 255, 0.24);

          font-size:
            clamp(4px, 0.48vw, 6px);

          font-weight: 500;

          line-height: 1.2;

          letter-spacing: 0.14em;

          white-space: nowrap;
        }

        /* ==================================================
           ROW 2 — STATEMENT

           Sized to coexist with Episteme / Framework
           inside the same WorkModels envelope.
        ================================================== */

        .ae-portal__statement {
          position: relative;
          z-index: 5;

          width: 100%;
          min-width: 0;

          display: flex;
          justify-content: center;
          align-items: center;

          padding-top:
            clamp(13px, 2.4vh, 25px);

          padding-bottom:
            clamp(4px, 0.8vh, 8px);

          text-align: center;

          transition:
            opacity 0.35s ease,
            transform 0.5s ease,
            filter 0.4s ease;
        }

        .ae-portal__statement h2 {
          width: 100%;
          max-width: 760px;

          margin: 0;
          padding: 0;

          color:
            rgba(250, 251, 252, 0.97);

          font-size:
            clamp(
              28px,
              min(4.25vw, 6.2vh),
              58px
            );

          font-weight: 235;

          line-height: 1;

          letter-spacing: -0.052em;

          text-align: center;

          overflow-wrap: break-word;

          text-wrap: balance;

          text-shadow:
            0 1px 0
              rgba(255, 255, 255, 0.02);
        }

        /* ==================================================
           ROW 3 — ENTRY / FLEXIBLE VISUAL REGION

           Parent gives this row whatever remains.
        ================================================== */

        .ae-portal__entry-button {
          position: relative;
          z-index: 6;

          width: 100%;
          height: 100%;

          max-width: 100%;
          max-height: 100%;

          min-width: 0;
          min-height: 0;

          display: grid;
          place-items: center;

          justify-self: stretch;
          align-self: stretch;

          margin: 0;
          padding: 0;

          overflow: hidden;

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

        .ae-portal__entry-button:disabled,
        .ae-portal__tap-row:disabled {
          cursor: default;
        }

        .ae-portal__entry-button:focus-visible,
        .ae-portal__tap-row:focus-visible {
          outline:
            1px solid
              rgba(255, 255, 255, 0.2);

          outline-offset: 3px;
        }

        /* ==================================================
           VISUAL SLOT

           Unlike the old artifact:
           - no fixed 450px height demand
           - no 305px mobile demand
           - no svh dependency

           It is bounded simultaneously by:
           - available width
           - remaining row height
        ================================================== */

        .ae-portal__visual-slot {
          position: relative;

          width:
            min(
              100%,
              390px
            );

          height:
            min(
              100%,
              390px
            );

          max-width: 100%;
          max-height: 100%;

          min-width: 0;
          min-height: 0;

          aspect-ratio: 1 / 1;

          display: grid;
          place-items: center;

          justify-self: center;
          align-self: center;

          overflow: visible;

          background: transparent;

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

        /* ==================================================
           AETHERION OPTICAL OCCUPATION

           Aetherion remains visually distinct from
           Episteme / Framework, but its external envelope
           obeys the same parent geometry.
        ================================================== */

        .ae-portal__artifact-aura {
          position: absolute;
          z-index: 0;

          width: 80%;
          height: 80%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(230, 210, 224, 0.115),
              rgba(191, 170, 187, 0.027)
                42%,
              transparent 73%
            );

          filter: blur(18px);

          pointer-events: none;

          animation:
            ae-aura-breathe
            12s ease-in-out
            infinite;
        }

        .ae-portal__artifact-object {
          position: relative;
          z-index: 2;

          width: 72%;
          height: 72%;

          max-width: 100%;
          max-height: 100%;

          display: grid;
          place-items: center;

          transform-origin: center;

          animation:
            ae-artifact-float
            13s ease-in-out
            infinite;

          transition:
            filter 0.55s ease,
            opacity 0.55s ease,
            transform 0.55s ease;
        }

        .ae-portal__emblem {
          display: block;

          width: 100%;
          height: 100%;

          max-width: 100%;
          max-height: 100%;

          overflow: visible;

          filter:
            drop-shadow(
              0 12px 19px
                rgba(0, 0, 0, 0.37)
            )
            drop-shadow(
              0 0 11px
                rgba(239, 222, 231, 0.055)
            );
        }

        /* ==================================================
           EMBLEM MOTION
        ================================================== */

        .ae-portal__boundary,
        .ae-portal__orbit,
        .ae-portal__spine,
        .ae-portal__chamber,
        .ae-portal__core {
          transform-box: view-box;

          transform-origin:
            250px 250px;
        }

        .ae-portal__boundary {
          animation:
            ae-boundary-breathe
            15s ease-in-out
            infinite;
        }

        .ae-portal__orbit--one {
          animation:
            ae-orbit-one
            27s ease-in-out
            infinite;
        }

        .ae-portal__orbit--two {
          animation:
            ae-orbit-two
            31s ease-in-out
            infinite;
        }

        .ae-portal__orbit--three {
          animation:
            ae-orbit-three
            35s ease-in-out
            infinite;
        }

        .ae-portal__current {
          opacity: 0.82;

          filter:
            drop-shadow(
              0 0 3px
                rgba(255, 242, 246, 0.38)
            );

          animation:
            ae-current-flow
            12s linear
            infinite;
        }

        .ae-portal__current--two {
          animation-duration: 15s;
          animation-direction: reverse;
        }

        .ae-portal__current--three {
          animation-duration: 18s;
        }

        .ae-portal__spine {
          animation:
            ae-spine-breathe
            12s ease-in-out
            infinite;
        }

        .ae-portal__chamber {
          animation:
            ae-chamber-breathe
            10s ease-in-out
            infinite;
        }

        .ae-portal__core {
          animation:
            ae-core-breathe
            8s ease-in-out
            infinite;
        }

        .ae-portal__core-atmosphere {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-core-atmosphere
            6.8s ease-in-out
            infinite;
        }

        .ae-portal__core-shell {
          animation:
            ae-core-shell
            8s ease-in-out
            infinite;
        }

        .ae-portal__core-flame {
          transform-box: fill-box;
          transform-origin: center;
        }

        .ae-portal__core-flame--outer {
          animation:
            ae-flame-outer
            5.6s ease-in-out
            infinite;
        }

        .ae-portal__core-flame--inner {
          animation:
            ae-flame-inner
            4.1s ease-in-out
            infinite;
        }

        .ae-portal__core-heart {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-heart
            4.4s ease-in-out
            infinite;
        }

        .ae-portal__core-heart-light {
          animation:
            ae-heart-light
            4.4s ease-in-out
            infinite;
        }

        .ae-portal__core-filament {
          animation:
            ae-filament
            7s ease-in-out
            infinite;
        }

        .ae-portal__node {
          animation:
            ae-node-breathe
            7.2s ease-in-out
            infinite;
        }

        .ae-portal__signal {
          transform-box: view-box;

          transform-origin:
            250px 250px;

          filter:
            drop-shadow(
              0 0 4px
                rgba(255, 241, 245, 0.68)
            );

          animation:
            ae-signal-travel
            17s linear
            infinite;
        }

        /* ==================================================
           FLOOR
        ================================================== */

        .ae-portal__artifact-floor {
          position: absolute;
          z-index: 1;

          bottom: 7%;
          left: 50%;

          width: 43%;
          height: 6%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(235, 217, 229, 0.06),
              transparent 72%
            );

          filter: blur(10px);

          opacity: 0.58;

          pointer-events: none;

          animation:
            ae-floor-breathe
            12s ease-in-out
            infinite;
        }

        /* ==================================================
           ROW 4 — DEDICATED TAP

           No absolute positioning.
           No overlap with SVG.
        ================================================== */

        .ae-portal__tap-row {
          position: relative;
          z-index: 10;

          width: 100%;

          min-width: 0;

          display: flex;
          justify-content: center;
          align-items: center;

          justify-self: stretch;

          margin: 0;

          padding:
            clamp(5px, 0.8vh, 9px)
            0
            0;

          border: 0;
          outline: 0;

          background: transparent;

          color: inherit;

          cursor: pointer;

          appearance: none;
          -webkit-appearance: none;

          -webkit-tap-highlight-color:
            transparent;
        }

        .ae-portal__tap-hint {
          display: block;

          max-width: 100%;

          color:
            rgba(255, 255, 255, 0.29);

          font-size:
            clamp(
              5px,
              0.55vw,
              7px
            );

          font-weight: 500;

          line-height: 1.25;

          letter-spacing: 0.12em;

          text-align: center;

          white-space: nowrap;

          transition:
            color 0.3s ease,
            transform 0.3s ease,
            opacity 0.35s ease;
        }

        /* ==================================================
           HOME PORTAL ENTERING
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
        .ae-portal__artifact-object {
          animation: none;

          opacity: 0;

          transform: scale(0.3);

          filter:
            brightness(0.28)
            blur(2px);
        }

        .ae-portal--entering
        .ae-portal__artifact-aura,
        .ae-portal--entering
        .ae-portal__artifact-floor,
        .ae-portal--entering
        .ae-portal__tap-row {
          opacity: 0;
        }

        .ae-portal--entering
        .ae-portal__stage {
          opacity: 0;

          transform: scale(0.975);

          filter:
            brightness(0.35)
            blur(8px);
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .ae-portal__entry-button:hover
          .ae-portal__visual-slot {
            transform:
              translateY(-2px)
              scale(1.018);
          }

          .ae-portal__entry-button:hover
          .ae-portal__emblem {
            filter:
              drop-shadow(
                0 15px 22px
                  rgba(0, 0, 0, 0.43)
              )
              drop-shadow(
                0 0 14px
                  rgba(244, 226, 237, 0.13)
              );
          }

          .ae-portal__tap-row:hover
          .ae-portal__tap-hint {
            color:
              rgba(255, 255, 255, 0.58);

            transform:
              translateY(-2px);
          }
        }

        /* ==================================================
           AMBIENT KEYFRAMES
        ================================================== */

        @keyframes ae-aura-breathe {
          0%,
          100% {
            opacity: 0.42;
            transform: scale(0.97);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.04);
          }
        }

        @keyframes ae-artifact-float {
          0%,
          100% {
            transform:
              translateY(2px)
              scale(0.994);
          }

          50% {
            transform:
              translateY(-3px)
              scale(1.006);
          }
        }

        @keyframes ae-boundary-breathe {
          0%,
          100% {
            opacity: 0.58;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.01);
          }
        }

        @keyframes ae-orbit-one {
          0%,
          100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(6deg);
          }
        }

        @keyframes ae-orbit-two {
          0%,
          100% {
            transform: rotate(60deg);
          }

          50% {
            transform: rotate(54deg);
          }
        }

        @keyframes ae-orbit-three {
          0%,
          100% {
            transform: rotate(-60deg);
          }

          50% {
            transform: rotate(-54deg);
          }
        }

        @keyframes ae-current-flow {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -1100;
          }
        }

        @keyframes ae-spine-breathe {
          0%,
          100% {
            opacity: 0.55;
          }

          50% {
            opacity: 0.92;
          }
        }

        @keyframes ae-chamber-breathe {
          0%,
          100% {
            opacity: 0.75;
            transform: scale(0.985);
          }

          50% {
            opacity: 1;
            transform: scale(1.018);
          }
        }

        @keyframes ae-core-breathe {
          0%,
          100% {
            transform: scale(0.96);
          }

          50% {
            transform: scale(1.045);
          }
        }

        @keyframes ae-core-atmosphere {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.88);
          }

          50% {
            opacity: 1;
            transform: scale(1.14);
          }
        }

        @keyframes ae-core-shell {
          0%,
          100% {
            stroke-opacity: 0.25;
          }

          50% {
            stroke-opacity: 0.52;
          }
        }

        @keyframes ae-flame-outer {
          0%,
          100% {
            opacity: 0.62;

            transform:
              translateY(1px)
              scale(0.94)
              rotate(-3deg);
          }

          50% {
            opacity: 0.96;

            transform:
              translateY(-2px)
              scale(1.09)
              rotate(4deg);
          }
        }

        @keyframes ae-flame-inner {
          0%,
          100% {
            opacity: 0.82;

            transform:
              translateY(1px)
              scale(0.94);
          }

          50% {
            opacity: 1;

            transform:
              translateY(-2px)
              scale(1.12);
          }
        }

        @keyframes ae-heart {
          0%,
          100% {
            opacity: 0.78;
            transform: scale(0.86);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes ae-heart-light {
          0%,
          100% {
            opacity: 0.58;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-filament {
          0%,
          100% {
            opacity: 0.28;
          }

          50% {
            opacity: 0.82;
          }
        }

        @keyframes ae-node-breathe {
          0%,
          100% {
            opacity: 0.42;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-signal-travel {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ae-floor-breathe {
          0%,
          100% {
            opacity: 0.34;

            transform:
              translateX(-50%)
              scaleX(0.9);
          }

          50% {
            opacity: 0.72;

            transform:
              translateX(-50%)
              scaleX(1.05);
          }
        }

        /* ==================================================
           MOBILE

           Parent frame remains authoritative.

           No 690px minimum.
           No 100svh-based internal height.
        ================================================== */

        @media (max-width: 700px) {
          .ae-portal {
            width: 100%;
            height: 100%;

            max-width: 100%;
            max-height: 100%;

            min-width: 0;
            min-height: 0;

            overflow: hidden;
          }

          .ae-portal__stage {
            width: 100%;
            height: 100%;

            max-width: 100%;
            max-height: 100%;

            min-width: 0;
            min-height: 0;

            grid-template-rows:
              auto
              auto
              minmax(0, 1fr)
              auto;

            padding:
              clamp(11px, 2.3vh, 18px)
              16px
              clamp(9px, 1.8vh, 14px);

            overflow: hidden;
          }

          .ae-portal__identity {
            gap: 3px;
          }

          .ae-portal__identity > span {
            font-size:
              clamp(
                6px,
                1.8vw,
                7px
              );

            letter-spacing: 0.2em;
          }

          .ae-portal__identity > small {
            margin: 0;

            font-size:
              clamp(
                4px,
                1.1vw,
                4.5px
              );

            letter-spacing: 0.1em;
          }

          .ae-portal__statement {
            padding-top:
              clamp(
                10px,
                2vh,
                17px
              );

            padding-bottom:
              clamp(
                2px,
                0.5vh,
                5px
              );
          }

          .ae-portal__statement h2 {
            max-width: 100%;

            padding: 0 3px;

            font-size:
              clamp(
                23px,
                min(8vw, 5vh),
                36px
              );

            line-height: 1;

            letter-spacing: -0.048em;
          }

          .ae-portal__entry-button {
            width: 100%;
            height: 100%;

            max-width: 100%;
            max-height: 100%;

            min-width: 0;
            min-height: 0;

            overflow: hidden;
          }

          .ae-portal__visual-slot {
            width:
              min(
                100%,
                290px
              );

            height:
              min(
                100%,
                290px
              );

            max-width: 100%;
            max-height: 100%;

            min-width: 0;
            min-height: 0;

            aspect-ratio: 1 / 1;
          }

          .ae-portal__artifact-object {
            width: 70%;
            height: 70%;
          }

          .ae-portal__artifact-aura {
            width: 76%;
            height: 76%;
          }

          .ae-portal__artifact-floor {
            bottom: 7%;

            width: 41%;
          }

          .ae-portal__tap-row {
            flex: none;

            padding:
              clamp(
                4px,
                0.8vh,
                7px
              )
              0
              0;
          }

          .ae-portal__tap-hint {
            max-width:
              calc(100% - 12px);

            overflow: hidden;

            font-size:
              clamp(
                4.8px,
                1.35vw,
                5.5px
              );

            letter-spacing: 0.1em;

            text-overflow: ellipsis;

            white-space: nowrap;
          }
        }

        /* ==================================================
           SHORT FRAME
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .ae-portal__stage {
            padding:
              10px 14px 8px;
          }

          .ae-portal__identity {
            gap: 2px;
          }

          .ae-portal__statement {
            padding-top: 8px;
            padding-bottom: 1px;
          }

          .ae-portal__statement h2 {
            font-size:
              clamp(
                22px,
                min(7.5vw, 4.6vh),
                31px
              );
          }

          .ae-portal__visual-slot {
            width:
              min(
                100%,
                250px
              );

            height:
              min(
                100%,
                250px
              );
          }

          .ae-portal__artifact-object {
            width: 68%;
            height: 68%;
          }

          .ae-portal__tap-row {
            padding-top: 3px;
          }
        }

        /* ==================================================
           VERY SHORT FRAME

           Semantic content remains.
           Optical occupation contracts first.
        ================================================== */

        @media (max-width: 700px) and (max-height: 620px) {
          .ae-portal__stage {
            padding:
              8px 12px 6px;
          }

          .ae-portal__identity > span {
            font-size: 5.8px;
          }

          .ae-portal__identity > small {
            font-size: 3.8px;
          }

          .ae-portal__statement {
            padding-top: 6px;
            padding-bottom: 0;
          }

          .ae-portal__statement h2 {
            font-size:
              clamp(
                20px,
                min(7vw, 4.25vh),
                27px
              );
          }

          .ae-portal__visual-slot {
            width:
              min(
                100%,
                220px
              );

            height:
              min(
                100%,
                220px
              );
          }

          .ae-portal__artifact-object {
            width: 65%;
            height: 65%;
          }

          .ae-portal__artifact-aura {
            width: 71%;
            height: 71%;
          }

          .ae-portal__tap-row {
            padding-top: 2px;
          }

          .ae-portal__tap-hint {
            font-size: 4.6px;
          }
        }

        /* ==================================================
           NARROW MOBILE
        ================================================== */

        @media (max-width: 380px) {
          .ae-portal__stage {
            padding-left: 12px;
            padding-right: 12px;
          }

          .ae-portal__statement h2 {
            font-size:
              clamp(
                21px,
                7.3vw,
                29px
              );
          }

          .ae-portal__visual-slot {
            width:
              min(
                100%,
                240px
              );

            height:
              min(
                100%,
                240px
              );
          }
        }

        /* ==================================================
           FULLSCREEN ENTRY

           Global because this tree is portaled to body.
        ================================================== */

        .ae-entry {
          position: fixed;
          inset: 0;

          z-index: 2147483647;

          width: 100vw;
          width: 100dvw;

          height: 100vh;
          height: 100dvh;

          min-height: 100svh;

          display: grid;
          place-items: center;

          margin: 0;
          padding: 0;

          overflow: hidden;
          overflow: clip;

          opacity: 0;
          visibility: hidden;

          pointer-events: none;

          isolation: isolate;

          background: #07070a;

          transition:
            opacity 0.12s ease,
            visibility 0s
              linear ${ENTRY_DURATION}ms;
        }

        .ae-entry--active {
          opacity: 1;
          visibility: visible;

          pointer-events: auto;

          transition:
            opacity 0.12s ease;
        }

        .ae-entry__space,
        .ae-entry__stars,
        .ae-entry__coordinates,
        .ae-entry__vignette {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .ae-entry__space {
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              #292129,
              #111014 40%,
              #050507 76%,
              #000 100%
            );
        }

        .ae-entry__stars {
          inset: -20%;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.68)
                0 0.55px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.25)
                0 0.4px,
              transparent 0.8px
            );

          background-size:
            89px 89px,
            137px 137px;

          transform: scale(1.3);
        }

        .ae-entry__coordinates {
          inset: -28%;

          opacity: 0;

          background:
            repeating-linear-gradient(
              90deg,
              transparent 0 78px,
              rgba(240, 225, 235, 0.05)
                79px,
              transparent 80px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 78px,
              rgba(240, 225, 235, 0.05)
                79px,
              transparent 80px
            );

          transform:
            perspective(900px)
            rotateX(62deg)
            scale(1.6);

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

        .ae-entry__vignette {
          z-index: 4;

          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 8%,
              rgba(0, 0, 0, 0.34)
                54%,
              #000 100%
            );
        }

        /* ==================================================
           ENTRY ARCHITECTURE
        ================================================== */

        .ae-entry__architecture {
          position: absolute;
          z-index: 3;

          top: 50%;
          left: 50%;

          width:
            min(88vw, 680px);

          aspect-ratio: 1;

          display: grid;
          place-items: center;

          margin: 0;
          padding: 0;

          opacity: 0;

          transform:
            translate3d(
              -50%,
              -50%,
              0
            )
            scale(0.14);

          transform-origin:
            center center;

          filter: blur(8px);

          will-change:
            transform,
            opacity,
            filter;
        }

        .ae-entry__architecture
        > .ae-portal__emblem--transition {
          position: relative;
          z-index: 2;

          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;
        }

        .ae-entry__halo {
          position: absolute;

          inset: 15%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(239, 219, 231, 0.14),
              rgba(225, 202, 217, 0.025)
                42%,
              transparent 72%
            );

          filter: blur(26px);
        }

        /* ==================================================
           ENTRY APERTURE
        ================================================== */

        .ae-entry__aperture {
          position: absolute;
          z-index: 5;

          top: 50%;
          left: 50%;

          width:
            min(18vw, 120px);

          aspect-ratio: 1;

          display: grid;
          place-items: center;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.2);
        }

        .ae-entry__aperture-ring {
          position: absolute;

          aspect-ratio: 1;

          border-radius: 50%;

          box-shadow:
            0 0 30px
              rgba(242, 221, 233, 0.14);
        }

        .ae-entry__aperture-ring--outer {
          width: 100%;

          border:
            1px solid
              rgba(255, 240, 247, 0.68);
        }

        .ae-entry__aperture-ring--inner {
          width: 68%;

          border:
            1px solid
              rgba(255, 240, 247, 0.32);
        }

        .ae-entry__aperture-core {
          width: 19%;

          aspect-ratio: 1;

          border-radius: 50%;

          background: #fff9f4;

          box-shadow:
            0 0 18px
              rgba(255, 238, 245, 0.7),
            0 0 52px
              rgba(246, 220, 235, 0.24);
        }

        .ae-entry__wave {
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
            scale(0.1);
        }

        .ae-entry__copy {
          position: absolute;
          z-index: 7;

          bottom:
            clamp(44px, 8vh, 90px);

          left: 50%;

          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          padding: 0 20px;

          opacity: 0;

          transform:
            translate(-50%, 9px);

          text-align: center;

          transition:
            opacity 0.3s
              ease 0.46s,
            transform 0.4s
              ease 0.46s;
        }

        .ae-entry__copy > span {
          color:
            rgba(247, 250, 253, 0.78);

          font-size: 9px;

          font-weight: 620;

          letter-spacing: 0.25em;
        }

        .ae-entry__copy > small {
          color:
            rgba(235, 226, 233, 0.4);

          font-size: 8px;

          letter-spacing: 0.1em;
        }

        /* ==================================================
           ENTRY SEQUENCE
        ================================================== */

        .ae-entry--active
        .ae-entry__space {
          animation:
            ae-entry-space
            1.7s ease
            forwards;
        }

        .ae-entry--active
        .ae-entry__stars {
          animation:
            ae-entry-stars
            1.7s ease
            forwards;
        }

        .ae-entry--active
        .ae-entry__coordinates {
          animation:
            ae-entry-coordinates
            1.7s ease
            forwards;
        }

        .ae-entry--active
        .ae-entry__architecture {
          animation:
            ae-entry-architecture
            1.7s
            cubic-bezier(
              0.16,
              0.76,
              0.2,
              1
            )
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__boundary {
          animation:
            ae-entry-boundary
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__orbit--one {
          animation:
            ae-entry-orbit-one
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__orbit--two {
          animation:
            ae-entry-orbit-two
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__orbit--three {
          animation:
            ae-entry-orbit-three
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__spine {
          animation:
            ae-entry-spine
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__chamber {
          animation:
            ae-entry-chamber
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__core {
          animation:
            ae-entry-core
            1.28s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__node {
          animation:
            ae-entry-node
            0.72s ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-entry__aperture {
          animation:
            ae-entry-aperture
            1.7s ease
            forwards;
        }

        .ae-entry--active
        .ae-entry__vignette {
          animation:
            ae-entry-vignette
            1.7s ease
            forwards;
        }

        .ae-entry--active
        .ae-entry__wave {
          animation:
            ae-entry-wave
            1.7s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            )
            forwards;
        }

        .ae-entry--active
        .ae-entry__copy {
          opacity: 1;

          transform:
            translate(-50%, 0);
        }

        /* ==================================================
           ENTRY KEYFRAMES
        ================================================== */

        @keyframes ae-entry-space {
          0% {
            opacity: 0;
          }

          16%,
          100% {
            opacity: 1;
          }
        }

        @keyframes ae-entry-stars {
          0% {
            opacity: 0;
            transform: scale(1.3);
          }

          28% {
            opacity: 0.48;
          }

          100% {
            opacity: 0;
            transform: scale(0.48);
          }
        }

        @keyframes ae-entry-coordinates {
          0% {
            opacity: 0;

            transform:
              perspective(900px)
              rotateX(62deg)
              scale(1.6);
          }

          30% {
            opacity: 0.44;
          }

          100% {
            opacity: 0;

            transform:
              perspective(900px)
              rotateX(62deg)
              scale(0.48);
          }
        }

        @keyframes ae-entry-architecture {
          0% {
            opacity: 0;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(0.14);

            filter: blur(8px);
          }

          18% {
            opacity: 1;
          }

          46% {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(0.73);

            filter: blur(0);
          }

          67% {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(1);

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
              scale(5.25);

            filter: blur(8px);
          }
        }

        @keyframes ae-entry-boundary {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }

          58% {
            opacity: 1;

            transform:
              scale(1.08)
              rotate(8deg);
          }

          100% {
            opacity: 0;

            transform:
              scale(1.48)
              rotate(30deg);
          }
        }

        @keyframes ae-entry-orbit-one {
          0% {
            opacity: 0.75;
            transform: rotate(0deg);
          }

          60% {
            opacity: 1;

            transform:
              rotate(18deg)
              scale(1.04);
          }

          100% {
            opacity: 0;

            transform:
              rotate(58deg)
              scale(1.65);
          }
        }

        @keyframes ae-entry-orbit-two {
          0% {
            opacity: 0.7;
            transform: rotate(60deg);
          }

          60% {
            opacity: 1;

            transform:
              rotate(38deg)
              scale(1.03);
          }

          100% {
            opacity: 0;

            transform:
              rotate(-4deg)
              scale(1.58);
          }
        }

        @keyframes ae-entry-orbit-three {
          0% {
            opacity: 0.7;
            transform: rotate(-60deg);
          }

          60% {
            opacity: 1;

            transform:
              rotate(-37deg)
              scale(1.03);
          }

          100% {
            opacity: 0;

            transform:
              rotate(5deg)
              scale(1.58);
          }
        }

        @keyframes ae-entry-spine {
          0% {
            opacity: 0.45;
            transform: scale(1);
          }

          58% {
            opacity: 1;
            transform: scale(0.94);
          }

          100% {
            opacity: 0;
            transform: scale(0.58);
          }
        }

        @keyframes ae-entry-chamber {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }

          58% {
            opacity: 1;
            transform: scale(1.13);
          }

          100% {
            opacity: 0;
            transform: scale(0.45);
          }
        }

        @keyframes ae-entry-core {
          0% {
            opacity: 0.7;
            transform: scale(0.82);
          }

          58% {
            opacity: 1;
            transform: scale(1.38);
          }

          100% {
            opacity: 0;
            transform: scale(0.08);
          }
        }

        @keyframes ae-entry-node {
          0% {
            opacity: 0.3;
          }

          38% {
            opacity: 1;
          }

          100% {
            opacity: 0.18;
          }
        }

        @keyframes ae-entry-aperture {
          0%,
          42% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.2);
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

        @keyframes ae-entry-vignette {
          0% {
            opacity: 0;
          }

          55% {
            opacity: 0.38;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes ae-entry-wave {
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
           FULLSCREEN ENTRY — MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .ae-entry__architecture {
            width:
              min(92vmin, 560px);
          }

          .ae-entry__aperture {
            width:
              min(25vw, 110px);
          }
        }

        /* ==================================================
           REDUCED MOTION — LOCAL
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ae-portal__artifact-aura,
          .ae-portal__artifact-object,
          .ae-portal__boundary,
          .ae-portal__orbit,
          .ae-portal__current,
          .ae-portal__spine,
          .ae-portal__chamber,
          .ae-portal__core,
          .ae-portal__core-atmosphere,
          .ae-portal__core-shell,
          .ae-portal__core-flame,
          .ae-portal__core-heart,
          .ae-portal__core-heart-light,
          .ae-portal__core-filament,
          .ae-portal__node,
          .ae-portal__signal,
          .ae-portal__artifact-floor {
            animation: none !important;
          }

          .ae-portal__orbit--one {
            transform: rotate(0deg);
          }

          .ae-portal__orbit--two {
            transform: rotate(60deg);
          }

          .ae-portal__orbit--three {
            transform: rotate(-60deg);
          }

          .ae-portal__visual-slot,
          .ae-portal__stage,
          .ae-portal__statement {
            transition-duration:
              0.12s !important;
          }
        }

        /* ==================================================
           REDUCED MOTION — FULLSCREEN
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ae-entry--active
          .ae-entry__space,
          .ae-entry--active
          .ae-entry__stars,
          .ae-entry--active
          .ae-entry__coordinates,
          .ae-entry--active
          .ae-entry__architecture,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__boundary,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__orbit,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__spine,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__chamber,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__core,
          .ae-entry--active
          .ae-portal__emblem--transition
          .ae-portal__node,
          .ae-entry--active
          .ae-entry__aperture,
          .ae-entry--active
          .ae-entry__vignette,
          .ae-entry--active
          .ae-entry__wave {
            animation: none !important;
          }

          .ae-entry--active
          .ae-entry__space {
            opacity: 1;
          }

          .ae-entry--active
          .ae-entry__architecture {
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

          .ae-entry--active
          .ae-entry__aperture {
            opacity: 0.82;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          .ae-entry--active
          .ae-entry__copy {
            opacity: 1;

            transform:
              translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}