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

   COORDINATE CONTRACT
   ----------------------------------------------------------
   Episteme is the dimensional reference.

   1. 690px is the canonical entrance composition.
   2. If more vertical space is available, the portal may
      expand into that available height.
   3. If less than 690px is available, the composition does
      not collapse below the reference geometry.
   4. The parent WorkModels stage remains responsible for
      outer vertical reachability.
   5. AETHERION → statement → artifact → Tap remains inside
      the complete 690px composition.

   STRUCTURE
   ----------------------------------------------------------
   Two rows only:
   - header
   - experience

   No internal footer.
   No WorkModels navigation ownership.
   No outer glass ownership.

   IDENTITY
   ----------------------------------------------------------
   Aetherion is represented as an orbital physical-
   realization architecture:

   Engineering
      ↓
   Fabrication
      ↓
   Testing
      ↓
   Correction
      ↓
   Reproduction
      ↓
   Release

   ENTRY
   ----------------------------------------------------------
   Tap:
   - capability nodes synchronize
   - fabrication architecture activates
   - orbital layers separate
   - realization core ignites
   - aperture opens
   - viewpoint crosses the manufacturing boundary
   - /aetherion
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

   A physical-realization architecture rather than a generic
   orbital symbol.

   Outer system:
   capability / production boundary

   Middle system:
   fabrication trajectories

   Inner system:
   realization chamber

   Center:
   living physical-realization core
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
          d="
            M250 103
            V397
          "
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
   ENTRY TRANSITION
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
      null,
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
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => {
      setReducedMotion(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener(
        "change",
        update,
      );

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

  useEffect(() => {
    return () => {
      if (
        transitionTimerRef.current !== null
      ) {
        clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);

  const enterAetherion = useCallback(() => {
    if (enteringRef.current) return;

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

          <header className="ae-portal__header">
            <div className="ae-portal__identity">
              <span>AETHERION</span>

              <small>
                ArcheNova&apos;s physical realization architecture
              </small>
            </div>
          </header>

          <div className="ae-portal__experience">
            <div className="ae-portal__statement">
              <h2 id="ae-portal-title">
                Build with Aetherion.
              </h2>
            </div>

            <button
              type="button"
              className="ae-portal__entry-button"
              onClick={enterAetherion}
              disabled={entering}
              aria-label="Enter Aetherion, ArcheNova's physical realization architecture"
            >
              <span className="ae-portal__artifact">
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

                <span className="ae-portal__tap-hint">
                  Tap Aetherion to enter
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {mounted &&
        createPortal(
          <AetherionEntryTransition
            entering={entering}
          />,
          document.body,
        )}

      <style jsx global>{`
        /* ==================================================
           RESET
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

           HOME / WorkModels owns the outer container.
        ================================================== */

        .ae-portal {
          --ae-reference-height: 690px;

          position: relative;

          display: flex;
          flex-direction: column;
          align-self: stretch;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height: var(--ae-reference-height);
          height: auto;

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
            rgba(247, 249, 251, .94);
        }

        .ae-portal button {
          font: inherit;
        }

        .ae-portal,
        .ae-portal__stage,
        .ae-portal__experience {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .ae-portal::-webkit-scrollbar,
        .ae-portal__stage::-webkit-scrollbar,
        .ae-portal__experience::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        /* ==================================================
           TWO-ROW STAGE

           Canonical:
           HEADER
           EXPERIENCE

           690px minimum is never compressed away.
        ================================================== */

        .ae-portal__stage {
          position: relative;
          isolation: isolate;

          flex: 1 0 auto;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height: var(--ae-reference-height);
          height: 100%;

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr);

          padding:
            clamp(25px, 4vw, 50px);

          overflow: hidden;

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;

          box-shadow: none;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          transition:
            opacity .45s ease,
            transform .65s ease,
            filter .6s ease;
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
              rgba(222, 204, 217, .055),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 50% 78%,
              rgba(185, 167, 181, .018),
              transparent 54%
            );
        }

        .ae-portal__starfield {
          z-index: -1;

          opacity: .13;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, .48)
                0 .45px,
              transparent .8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, .2)
                0 .35px,
              transparent .7px
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
           HEADER — EPISTEME COORDINATE
        ================================================== */

        .ae-portal__header {
          position: relative;
          z-index: 5;

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

        .ae-portal__identity {
          grid-column: 2;

          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 7px;

          text-align: center;
        }

        .ae-portal__identity > span {
          color:
            rgba(255, 255, 255, .82);

          font-size: 9px;
          font-weight: 650;
          letter-spacing: .24em;

          white-space: nowrap;
        }

        .ae-portal__identity > small {
          color:
            rgba(255, 255, 255, .24);

          font-size: 6px;
          font-weight: 500;
          letter-spacing: .14em;

          white-space: nowrap;
        }

        /* ==================================================
           EXPERIENCE
        ================================================== */

        .ae-portal__experience {
          position: relative;
          z-index: 4;

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

          transition:
            opacity .35s ease,
            transform .5s ease,
            filter .4s ease;
        }

        /* ==================================================
           STATEMENT
        ================================================== */

        .ae-portal__statement {
          position: relative;
          z-index: 5;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          flex: 0 0 auto;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity .35s ease,
            transform .5s ease,
            filter .4s ease;
        }

        .ae-portal__statement h2 {
          width: 100%;
          max-width: 820px;

          margin: 0;

          color:
            rgba(250, 251, 252, .97);

          font-size:
            clamp(39px, 5.1vw, 70px);

          font-weight: 235;
          line-height: 1.015;
          letter-spacing: -.058em;

          text-align: center;

          overflow-wrap: break-word;
          text-wrap: balance;

          text-shadow:
            0 1px 0
            rgba(255, 255, 255, .02);
        }

        /* ==================================================
           ENTRY BUTTON — EPISTEME ENVELOPE
        ================================================== */

        .ae-portal__entry-button {
          position: relative;
          z-index: 6;

          display: block;

          width: min(100%, 520px);
          max-width: 100%;
          min-width: 0;

          flex: 0 0 auto;

          margin:
            clamp(13px, 1.8vw, 22px)
            auto
            0;

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

        .ae-portal__entry-button:disabled {
          cursor: default;
        }

        .ae-portal__entry-button:focus-visible {
          outline:
            1px solid
            rgba(255, 255, 255, .22);

          outline-offset: 8px;

          border-radius: 50%;
        }

        /* ==================================================
           AETHERION ARTIFACT

           Outer dimensions follow Episteme.
           Internal optical occupation remains Aetherion-
           specific.
        ================================================== */

        .ae-portal__artifact {
          position: relative;

          width: min(100%, 450px);
          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.22;

          display: grid;
          place-items: center;

          margin: 0 auto;

          overflow: visible;

          background: transparent;

          transform: translateZ(0);

          transition:
            transform .75s
            cubic-bezier(.2, .8, .2, 1);
        }

        .ae-portal__artifact-aura {
          position: absolute;
          z-index: 0;

          inset: 12% 11%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(230, 210, 224, .115),
              rgba(191, 170, 187, .027)
                42%,
              transparent 73%
            );

          filter: blur(18px);

          animation:
            ae-aura-breathe
            12s
            ease-in-out
            infinite;
        }

        .ae-portal__artifact-object {
          position: relative;
          z-index: 2;

          display: block;

          width: 86%;
          height: 80%;

          transform-origin: center;

          animation:
            ae-artifact-float
            13s
            ease-in-out
            infinite;
        }

        .ae-portal__emblem {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          filter:
            drop-shadow(
              0 12px 19px
              rgba(0, 0, 0, .37)
            )
            drop-shadow(
              0 0 11px
              rgba(239, 222, 231, .055)
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
          transform-origin: 250px 250px;
        }

        .ae-portal__boundary {
          animation:
            ae-boundary-breathe
            15s ease-in-out infinite;
        }

        .ae-portal__orbit--one {
          animation:
            ae-orbit-one
            27s ease-in-out infinite;
        }

        .ae-portal__orbit--two {
          animation:
            ae-orbit-two
            31s ease-in-out infinite;
        }

        .ae-portal__orbit--three {
          animation:
            ae-orbit-three
            35s ease-in-out infinite;
        }

        .ae-portal__current {
          opacity: .82;

          filter:
            drop-shadow(
              0 0 3px
              rgba(255, 242, 246, .38)
            );

          animation:
            ae-current-flow
            12s linear infinite;
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
            12s ease-in-out infinite;
        }

        .ae-portal__chamber {
          animation:
            ae-chamber-breathe
            10s ease-in-out infinite;
        }

        .ae-portal__core {
          animation:
            ae-core-breathe
            8s ease-in-out infinite;
        }

        .ae-portal__core-atmosphere {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-core-atmosphere
            6.8s ease-in-out infinite;
        }

        .ae-portal__core-shell {
          animation:
            ae-core-shell
            8s ease-in-out infinite;
        }

        .ae-portal__core-flame {
          transform-box: fill-box;
          transform-origin: center;
        }

        .ae-portal__core-flame--outer {
          animation:
            ae-flame-outer
            5.6s ease-in-out infinite;
        }

        .ae-portal__core-flame--inner {
          animation:
            ae-flame-inner
            4.1s ease-in-out infinite;
        }

        .ae-portal__core-heart {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            ae-heart
            4.4s ease-in-out infinite;
        }

        .ae-portal__core-heart-light {
          animation:
            ae-heart-light
            4.4s ease-in-out infinite;
        }

        .ae-portal__core-filament {
          animation:
            ae-filament
            7s ease-in-out infinite;
        }

        .ae-portal__node {
          animation:
            ae-node-breathe
            7.2s ease-in-out infinite;
        }

        .ae-portal__signal {
          transform-box: view-box;
          transform-origin: 250px 250px;

          filter:
            drop-shadow(
              0 0 4px
              rgba(255, 241, 245, .68)
            );

          animation:
            ae-signal-travel
            17s linear infinite;
        }

        /* ==================================================
           FLOOR + TAP
        ================================================== */

        .ae-portal__artifact-floor {
          position: absolute;
          z-index: 1;

          bottom: 14%;
          left: 50%;

          width: 47%;
          height: 7%;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(235, 217, 229, .06),
              transparent 72%
            );

          filter: blur(12px);

          animation:
            ae-floor-breathe
            12s ease-in-out infinite;
        }

        .ae-portal__tap-hint {
          position: absolute;
          z-index: 4;

          bottom: 1.5%;
          left: 50%;

          max-width: 100%;

          transform:
            translateX(-50%);

          color:
            rgba(255, 255, 255, .29);

          font-size: 7px;
          font-weight: 500;
          letter-spacing: .12em;

          white-space: nowrap;

          transition:
            color .3s ease,
            transform .3s ease,
            opacity .35s ease;
        }

        /* ==================================================
           VIEWPORT ENTRY
        ================================================== */

        .ae-entry {
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

          background: #07070A;

          transition:
            opacity .12s ease,
            visibility 0s linear
            ${ENTRY_DURATION}ms;
        }

        .ae-entry--active {
          opacity: 1;
          visibility: visible;
          pointer-events: all;

          transition:
            opacity .12s ease;
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
              rgba(255, 255, 255, .68)
                0 .55px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, .25)
                0 .4px,
              transparent .8px
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
              rgba(240, 225, 235, .05)
                79px,
              transparent 80px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 78px,
              rgba(240, 225, 235, .05)
                79px,
              transparent 80px
            );

          transform:
            perspective(900px)
            rotateX(62deg)
            scale(1.6);

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 72%
            );

          -webkit-mask-image:
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
              rgba(0, 0, 0, .34) 54%,
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
              rgba(239, 219, 231, .14),
              rgba(225, 202, 217, .025)
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

          display: grid;
          place-items: center;

          width: min(18vw, 120px);
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(.2);
        }

        .ae-entry__aperture-ring {
          position: absolute;

          aspect-ratio: 1;

          border-radius: 50%;

          box-shadow:
            0 0 30px
            rgba(242, 221, 233, .14);
        }

        .ae-entry__aperture-ring--outer {
          width: 100%;

          border:
            1px solid
            rgba(255, 240, 247, .68);
        }

        .ae-entry__aperture-ring--inner {
          width: 68%;

          border:
            1px solid
            rgba(255, 240, 247, .32);
        }

        .ae-entry__aperture-core {
          width: 19%;
          aspect-ratio: 1;

          border-radius: 50%;

          background: #FFF9F4;

          box-shadow:
            0 0 18px
            rgba(255, 238, 245, .7),
            0 0 52px
            rgba(246, 220, 235, .24);
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
            scale(.1);
        }

        .ae-entry__copy {
          position: absolute;
          z-index: 7;

          bottom:
            clamp(44px, 8vh, 90px);

          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          width: 100%;

          padding: 0 20px;

          opacity: 0;

          transform:
            translate(-50%, 9px);

          text-align: center;

          transition:
            opacity .3s ease .46s,
            transform .4s ease .46s;
        }

        .ae-entry__copy > span {
          color:
            rgba(247, 250, 253, .78);

          font-size: 9px;
          font-weight: 620;
          letter-spacing: .25em;
        }

        .ae-entry__copy > small {
          color:
            rgba(235, 226, 233, .4);

          font-size: 8px;
          letter-spacing: .1em;
        }

        /* ==================================================
           ENTERING — HOME PORTAL
        ================================================== */

        .ae-portal--entering
        .ae-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(.98);

          filter: blur(3px);
        }

        .ae-portal--entering
        .ae-portal__stage {
          opacity: 0;

          transform:
            scale(.975);

          filter:
            brightness(.35)
            blur(8px);
        }

        /* ==================================================
           ENTRY SEQUENCE
        ================================================== */

        .ae-entry--active
        .ae-entry__space {
          animation:
            ae-entry-space
            1.7s ease forwards;
        }

        .ae-entry--active
        .ae-entry__stars {
          animation:
            ae-entry-stars
            1.7s ease forwards;
        }

        .ae-entry--active
        .ae-entry__coordinates {
          animation:
            ae-entry-coordinates
            1.7s ease forwards;
        }

        .ae-entry--active
        .ae-entry__architecture {
          animation:
            ae-entry-architecture
            1.7s
            cubic-bezier(
              .16,
              .76,
              .2,
              1
            )
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__boundary {
          animation:
            ae-entry-boundary
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__orbit--one {
          animation:
            ae-entry-orbit-one
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__orbit--two {
          animation:
            ae-entry-orbit-two
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__orbit--three {
          animation:
            ae-entry-orbit-three
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__spine {
          animation:
            ae-entry-spine
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__chamber {
          animation:
            ae-entry-chamber
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__core {
          animation:
            ae-entry-core
            1.28s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-portal__emblem--transition
        .ae-portal__node {
          animation:
            ae-entry-node
            .72s
            ease-in-out
            forwards;
        }

        .ae-entry--active
        .ae-entry__aperture {
          animation:
            ae-entry-aperture
            1.7s ease forwards;
        }

        .ae-entry--active
        .ae-entry__vignette {
          animation:
            ae-entry-vignette
            1.7s ease forwards;
        }

        .ae-entry--active
        .ae-entry__wave {
          animation:
            ae-entry-wave
            1.7s
            cubic-bezier(.4, 0, .2, 1)
            forwards;
        }

        .ae-entry--active
        .ae-entry__copy {
          opacity: 1;

          transform:
            translate(-50%, 0);
        }

        /* ==================================================
           AMBIENT KEYFRAMES
        ================================================== */

        @keyframes ae-aura-breathe {
          0%,
          100% {
            opacity: .42;
            transform: scale(.97);
          }

          50% {
            opacity: .8;
            transform: scale(1.04);
          }
        }

        @keyframes ae-artifact-float {
          0%,
          100% {
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

        @keyframes ae-boundary-breathe {
          0%,
          100% {
            opacity: .58;
            transform: scale(.99);
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
            opacity: .55;
          }

          50% {
            opacity: .92;
          }
        }

        @keyframes ae-chamber-breathe {
          0%,
          100% {
            opacity: .75;
            transform: scale(.985);
          }

          50% {
            opacity: 1;
            transform: scale(1.018);
          }
        }

        @keyframes ae-core-breathe {
          0%,
          100% {
            transform: scale(.96);
          }

          50% {
            transform: scale(1.045);
          }
        }

        @keyframes ae-core-atmosphere {
          0%,
          100% {
            opacity: .55;
            transform: scale(.88);
          }

          50% {
            opacity: 1;
            transform: scale(1.14);
          }
        }

        @keyframes ae-core-shell {
          0%,
          100% {
            stroke-opacity: .25;
          }

          50% {
            stroke-opacity: .52;
          }
        }

        @keyframes ae-flame-outer {
          0%,
          100% {
            opacity: .62;

            transform:
              translateY(1px)
              scale(.94)
              rotate(-3deg);
          }

          50% {
            opacity: .96;

            transform:
              translateY(-2px)
              scale(1.09)
              rotate(4deg);
          }
        }

        @keyframes ae-flame-inner {
          0%,
          100% {
            opacity: .82;

            transform:
              translateY(1px)
              scale(.94);
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
            opacity: .78;
            transform: scale(.86);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes ae-heart-light {
          0%,
          100% {
            opacity: .58;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ae-filament {
          0%,
          100% {
            opacity: .28;
          }

          50% {
            opacity: .82;
          }
        }

        @keyframes ae-node-breathe {
          0%,
          100% {
            opacity: .42;
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
            opacity: .34;

            transform:
              translateX(-50%)
              scaleX(.9);
          }

          50% {
            opacity: .72;

            transform:
              translateX(-50%)
              scaleX(1.05);
          }
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
            opacity: .48;
          }

          100% {
            opacity: 0;
            transform: scale(.48);
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
            opacity: .44;
          }

          100% {
            opacity: 0;

            transform:
              perspective(900px)
              rotateX(62deg)
              scale(.48);
          }
        }

        @keyframes ae-entry-architecture {
          0% {
            opacity: 0;

            transform:
              translate3d(-50%, -50%, 0)
              scale(.14);

            filter: blur(8px);
          }

          18% {
            opacity: 1;
          }

          46% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(.73);

            filter: blur(0);
          }

          67% {
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
              scale(5.25);

            filter: blur(8px);
          }
        }

        @keyframes ae-entry-boundary {
          0% {
            opacity: .6;
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
            opacity: .75;
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
            opacity: .7;
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
            opacity: .7;
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
            opacity: .45;
            transform: scale(1);
          }

          58% {
            opacity: 1;
            transform: scale(.94);
          }

          100% {
            opacity: 0;
            transform: scale(.58);
          }
        }

        @keyframes ae-entry-chamber {
          0% {
            opacity: .7;
            transform: scale(1);
          }

          58% {
            opacity: 1;
            transform: scale(1.13);
          }

          100% {
            opacity: 0;
            transform: scale(.45);
          }
        }

        @keyframes ae-entry-core {
          0% {
            opacity: .7;
            transform: scale(.82);
          }

          58% {
            opacity: 1;
            transform: scale(1.38);
          }

          100% {
            opacity: 0;
            transform: scale(.08);
          }
        }

        @keyframes ae-entry-node {
          0% {
            opacity: .3;
          }

          38% {
            opacity: 1;
          }

          100% {
            opacity: .18;
          }
        }

        @keyframes ae-entry-aperture {
          0%,
          42% {
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

        @keyframes ae-entry-vignette {
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

        @keyframes ae-entry-wave {
          0%,
          73% {
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
          .ae-portal__entry-button:hover
          .ae-portal__artifact {
            transform:
              translateY(-2px)
              scale(1.025);
          }

          .ae-portal__entry-button:hover
          .ae-portal__emblem {
            filter:
              drop-shadow(
                0 15px 22px
                rgba(0, 0, 0, .43)
              )
              drop-shadow(
                0 0 14px
                rgba(244, 226, 237, .13)
              );
          }

          .ae-portal__entry-button:hover
          .ae-portal__tap-hint {
            color:
              rgba(255, 255, 255, .58);

            transform:
              translate(-50%, -2px);
          }
        }

        /* ==================================================
           MOBILE

           EPISTEME COORDINATE CONTRACT

           690px reference
             ↓
           available-height fit
             ↓
           never compress below reference
             ↓
           Tap remains inside composition
        ================================================== */

        @media (max-width: 700px) {
          .ae-portal {
            --ae-available-height:
              calc(100svh - 42px);

            display: flex;
            flex-direction: column;
            align-self: stretch;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            min-height:
              max(
                var(--ae-reference-height),
                var(--ae-available-height)
              );

            height: auto;
            max-height: none;

            overflow: hidden;
          }

          .ae-portal__stage {
            position: relative;

            flex: 1 0 auto;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            min-height:
              max(
                var(--ae-reference-height),
                var(--ae-available-height)
              );

            height: auto;
            max-height: none;

            display: grid;

            grid-template-rows:
              auto
              minmax(0, 1fr);

            padding:
              25px 18px 23px;

            overflow: hidden;

            overscroll-behavior: auto;
          }

          /* ------------------------------------------
             HEADER
          ------------------------------------------ */

          .ae-portal__header {
            position: relative;

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

            justify-items: initial;

            row-gap: 0;
          }

          .ae-portal__identity {
            grid-column: 2;
            grid-row: 1;

            min-width: 0;

            display: flex;
            flex-direction: column;
            align-items: center;

            gap: 7px;

            text-align: center;
          }

          .ae-portal__identity > span {
            color:
              rgba(255, 255, 255, .82);

            font-size: 7px;
            font-weight: 650;

            letter-spacing: .2em;

            white-space: nowrap;
          }

          .ae-portal__identity > small {
            margin-top: -1px;

            color:
              rgba(255, 255, 255, .24);

            font-size: 4.5px;

            letter-spacing: .1em;

            white-space: nowrap;
          }

          /* ------------------------------------------
             EXPERIENCE
          ------------------------------------------ */

          .ae-portal__experience {
            position: relative;

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
              35px 0 30px;

            overflow-x: hidden;
            overflow-y: auto;

            overscroll-behavior-y:
              contain;

            -webkit-overflow-scrolling:
              touch;

            touch-action: pan-y;
          }

          .ae-portal__statement {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            flex: 0 0 auto;

            gap: 9px;
          }

          .ae-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            margin: 0;

            padding:
              0 4px;

            font-size:
              clamp(
                32px,
                9.4vw,
                46px
              );

            line-height: 1;

            letter-spacing:
              -.052em;

            text-align: center;
          }

          /* ------------------------------------------
             ENTRY ENVELOPE
          ------------------------------------------ */

          .ae-portal__entry-button {
            width:
              min(100%, 350px);

            max-width: 100%;
            min-width: 0;

            flex: 0 0 auto;

            margin:
              8px auto 0;

            padding: 0;
          }

          /* ------------------------------------------
             VISUAL ENVELOPE

             Same external dimensions as Episteme.
             Internal optical occupation remains
             Aetherion-specific.
          ------------------------------------------ */

          .ae-portal__artifact {
            position: relative;

            width:
              min(100%, 305px);

            max-width: 100%;
            min-width: 0;

            aspect-ratio: 1.17;

            display: grid;
            place-items: center;

            margin: 0 auto;
          }

          .ae-portal__artifact-object {
            width: 90%;
            height: 82%;
          }

          .ae-portal__tap-hint {
            bottom: .5%;

            max-width:
              calc(100% - 16px);

            overflow: hidden;

            font-size: 5.5px;

            letter-spacing:
              .1em;

            text-overflow:
              ellipsis;

            white-space: nowrap;
          }

          .ae-entry__architecture {
            width:
              min(88vw, 520px);
          }
        }

        /* ==================================================
           SHORT MOBILE

           690px composition is preserved.
           Only internal optical scale tightens.
        ================================================== */

        @media
          (max-width: 700px)
          and (max-height: 720px) {

          .ae-portal {
            min-height:
              max(
                var(--ae-reference-height),
                var(--ae-available-height)
              );
          }

          .ae-portal__stage {
            min-height:
              max(
                var(--ae-reference-height),
                var(--ae-available-height)
              );

            padding:
              22px 17px 19px;
          }

          .ae-portal__experience {
            padding:
              25px 0 20px;
          }

          .ae-portal__statement h2 {
            font-size:
              clamp(
                30px,
                8.9vw,
                40px
              );
          }

          .ae-portal__entry-button {
            margin-top: 1px;
          }

          .ae-portal__artifact {
            width:
              min(100%, 265px);

            aspect-ratio: 1.17;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .ae-portal__stage {
            min-height:
              max(
                var(--ae-reference-height),
                var(--ae-available-height)
              );

            padding:
              25px 15px 21px;
          }

          .ae-portal__identity > span {
            font-size: 6.5px;
          }

          .ae-portal__identity > small {
            font-size: 4px;
          }

          .ae-portal__statement h2 {
            font-size:
              clamp(
                31px,
                9.7vw,
                41px
              );
          }

          .ae-portal__artifact {
            width:
              min(100%, 285px);

            aspect-ratio: 1.17;
          }

          .ae-portal__tap-hint {
            font-size: 5px;
          }
        }

        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 360px) {
          .ae-portal__stage {
            min-height:
              max(
                var(--ae-reference-height),
                var(--ae-available-height)
              );

            padding:
              23px 13px 19px;
          }

          .ae-portal__identity > small {
            display: none;
          }

          .ae-portal__statement h2 {
            font-size:
              clamp(
                29px,
                9.4vw,
                37px
              );
          }

          .ae-portal__artifact {
            width:
              min(100%, 255px);

            aspect-ratio: 1.17;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
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
            animation:
              none !important;
          }

          .ae-portal__orbit--one {
            transform:
              rotate(0deg);
          }

          .ae-portal__orbit--two {
            transform:
              rotate(60deg);
          }

          .ae-portal__orbit--three {
            transform:
              rotate(-60deg);
          }

          .ae-portal__artifact,
          .ae-portal__stage,
          .ae-portal__statement {
            transition-duration:
              .12s !important;
          }

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
            animation:
              none !important;
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