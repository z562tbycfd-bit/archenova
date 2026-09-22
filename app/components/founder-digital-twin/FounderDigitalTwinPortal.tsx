"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   ARCHENOVA FOUNDER DIGITAL TWIN PORTAL

   HOME owns the outer card and bottom navigation.

   LAYOUT
   - Match the three-row Episteme portal layout.
   - Keep header, experience, and footer inside HOME's card.
   - Allow the central experience to shrink when necessary.
   - Keep the original figure SVG and visual treatment.
   - Preserve the /founder entry interaction and transition.

   HOME navigation dimensions and positioning remain
   controlled by the HOME component.
========================================================== */

function FounderFigure({
  transition = false,
}: {
  transition?: boolean;
}) {
  const id = useId().replace(/:/g, "");

  const gold = `fdp-gold-${id}`;
  const body = `fdp-body-${id}`;
  const aura = `fdp-aura-${id}`;
  const glow = `fdp-glow-${id}`;

  return (
    <svg
      className={[
        "fdp-figure",
        transition ? "fdp-figure--transition" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 300 460"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gold}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#fffdf0" />
          <stop offset="28%" stopColor="#fff1c5" />
          <stop offset="58%" stopColor="#eecb83" />
          <stop offset="100%" stopColor="#9b713d" />
        </linearGradient>

        <radialGradient id={body}>
          <stop
            offset="0%"
            stopColor="#f7dba3"
            stopOpacity=".18"
          />
          <stop
            offset="55%"
            stopColor="#d6a65c"
            stopOpacity=".075"
          />
          <stop
            offset="100%"
            stopColor="#d6a65c"
            stopOpacity="0"
          />
        </radialGradient>

        <radialGradient id={aura}>
          <stop
            offset="0%"
            stopColor="#fff4d2"
            stopOpacity=".3"
          />
          <stop
            offset="43%"
            stopColor="#e9bf79"
            stopOpacity=".075"
          />
          <stop
            offset="100%"
            stopColor="#e9bf79"
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

      <ellipse
        className="fdp-figure__atmosphere"
        cx="150"
        cy="225"
        rx="145"
        ry="213"
        fill={`url(#${aura})`}
      />

      <path
        className="fdp-figure__body"
        d="
          M150 64
          C131 64 120 79 120 98
          C120 117 131 130 143 136

          C124 141 111 153 104 174
          C97 196 98 226 107 248
          C113 264 122 276 127 291

          C130 309 126 338 126 366
          C126 386 132 405 145 426

          C150 434 154 434 158 426
          C171 405 177 386 177 366
          C177 338 173 309 176 291

          C181 276 190 264 196 248
          C205 226 206 196 199 174
          C192 153 179 141 160 136

          C172 130 183 117 183 98
          C183 79 171 64 150 64 Z
        "
        fill={`url(#${body})`}
      />

      <g
        className="fdp-figure__outline"
        stroke={`url(#${gold})`}
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="
            M150 64
            C131 64 120 79 120 98
            C120 117 131 130 143 136
            C147 139 154 139 160 136
            C172 130 183 117 183 98
            C183 79 171 64 150 64 Z
          "
        />

        <path
          d="
            M142 137
            C121 142 108 155 104 177
            C100 197 104 216 112 237
            C119 255 125 273 127 291
            C130 312 126 341 126 366
            C126 386 132 405 145 426

            M160 137
            C181 142 194 155 198 177
            C202 197 198 216 190 237
            C183 255 177 273 175 291
            C172 312 176 341 176 366
            C176 386 170 405 157 426

            M145 426
            C149 434 153 434 157 426
          "
        />

        <path
          d="
            M122 151
            C117 174 119 201 128 224
            C136 246 139 266 139 286

            M178 151
            C183 174 181 201 172 224
            C164 246 161 266 161 286

            M139 286
            C145 294 155 294 161 286

            M150 149
            C147 181 147 223 150 270

            M127 291
            C139 303 163 303 175 291
          "
          strokeWidth=".75"
          opacity=".68"
        />
      </g>

      <g
        className="fdp-figure__halo-lines"
        stroke="#f5d595"
        strokeWidth="5"
        strokeLinecap="round"
        opacity=".4"
        filter={`url(#${glow})`}
      >
        <path
          d="
            M150 64
            C131 64 120 79 120 98
            C120 117 131 130 143 136

            M160 136
            C172 130 183 117 183 98
            C183 79 171 64 150 64

            M142 137
            C121 142 108 155 104 177
            C100 197 104 216 112 237
            C119 255 125 273 127 291
            C130 312 126 341 126 366
            C126 386 132 405 145 426

            M160 137
            C181 142 194 155 198 177
            C202 197 198 216 190 237
            C183 255 177 273 175 291
            C172 312 176 341 176 366
            C176 386 170 405 157 426
          "
        />
      </g>

      <g
        className="fdp-figure__strands"
        stroke={`url(#${gold})`}
        strokeWidth=".65"
        strokeLinecap="round"
        opacity=".36"
      >
        <path
          d="
            M166 140
            C222 147 232 109 283 124

            M181 155
            C230 177 247 142 295 154

            M189 179
            C231 197 259 179 297 195

            M177 296
            C208 330 194 365 226 396

            M137 308
            C111 340 117 377 89 408

            M158 358
            C183 385 171 410 196 447

            M129 376
            C105 402 112 424 90 452
          "
        />
      </g>

      <g className="fdp-figure__light-points">
        {[
          [148, 84, 1.2],
          [162, 117, 1.4],
          [132, 155, 1.2],
          [169, 172, 1.5],
          [143, 192, 1.1],
          [156, 211, 1.7],
          [122, 233, 1.2],
          [177, 246, 1.1],
          [148, 267, 1.6],
          [162, 302, 1.3],
          [139, 333, 1.1],
          [153, 362, 1.6],
          [145, 392, 1.2],
          [156, 416, 1.2],
          [87, 185, 1.1],
          [216, 208, 1.2],
          [74, 301, 1],
          [229, 326, 1.2],
        ].map(([cx, cy, radius], index) => (
          <circle
            key={index}
            className="fdp-figure__light-point"
            cx={cx}
            cy={cy}
            r={radius}
            fill="#fff2cb"
            style={{
              animationDelay: `${index * -0.47}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

/* ==========================================================
   ENTRY TRANSITION
========================================================== */

function FounderEntryTransition({
  entering,
}: {
  entering: boolean;
}) {
  return (
    <div
      className={[
        "fdp-entry",
        entering ? "fdp-entry--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="fdp-entry__space" />
      <div className="fdp-entry__stars" />

      <div className="fdp-entry__cosmos">
        <span className="fdp-entry__orbit fdp-entry__orbit--one" />
        <span className="fdp-entry__orbit fdp-entry__orbit--two" />
        <span className="fdp-entry__orbit fdp-entry__orbit--three" />
        <span className="fdp-entry__axis fdp-entry__axis--horizontal" />
        <span className="fdp-entry__axis fdp-entry__axis--vertical" />
      </div>

      <div className="fdp-entry__light" />

      <div className="fdp-entry__figure">
        <FounderFigure transition />
      </div>

      <div className="fdp-entry__stellar-origin">
        <div className="fdp-entry__solar-corona" />
        <div className="fdp-entry__solar-rays" />
        <div className="fdp-entry__solar-atmosphere" />
        <div className="fdp-entry__solar-disc" />
        <div className="fdp-entry__solar-heart" />
      </div>

      <div className="fdp-entry__particles">
        {Array.from({ length: 16 }, (_, index) => (
          <span
            key={index}
            className="fdp-entry__particle"
            style={
              {
                "--fdp-angle": `${index * 22.5}deg`,
                "--fdp-distance": `${
                  92 + (index % 4) * 36
                }px`,
                "--fdp-delay": `${(index % 5) * 0.045}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="fdp-entry__wave" />

      <div className="fdp-entry__copy">
        <span>THE FOUNDER&apos;S DIGITAL TWIN</span>
        <small>Entering the origin of ArcheNova</small>
      </div>
    </div>
  );
}

/* ==========================================================
   PORTAL
========================================================== */

export default function FounderDigitalTwinPortal() {
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

  const enterFounder = useCallback(() => {
    if (enteringRef.current) return;

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = setTimeout(() => {
      router.push("/founder");
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
    <>
      <section
        className={[
          "fdp-portal",
          entering ? "fdp-portal--entering" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="fdp-portal-title"
      >
        <div className="fdp-portal__stage">
          <div
            className="fdp-portal__ambient"
            aria-hidden="true"
          />

          <div
            className="fdp-portal__starfield"
            aria-hidden="true"
          />

          <header className="fdp-portal__header">
            <div className="fdp-portal__identity">
              <span>ARCHENOVA FOUNDER DIGITAL TWIN</span>
              <small>ORIGIN · PRINCIPLES · INTENTIONS</small>
            </div>

            <div className="fdp-portal__indicator">
              <i aria-hidden="true" />
              <span>FOUNDER PRESENCE</span>
            </div>
          </header>

          <div className="fdp-portal__experience">
            <div className="fdp-portal__statement">
              
              <h2 id="fdp-portal-title">
                Meet the mind
                <br />
                behind ArcheNova.
              </h2>
            </div>

            <button
              type="button"
              className="fdp-portal__figure-button"
              onClick={enterFounder}
              disabled={entering}
              aria-label="Enter the ArcheNova Founder's Digital Twin"
            >
              <span className="fdp-portal__figure-space">
                <span
                  className="fdp-portal__figure-aura"
                  aria-hidden="true"
                />

                <span
                  className="fdp-portal__figure-object"
                  aria-hidden="true"
                >
                  <FounderFigure />
                </span>

                <span
                  className="fdp-portal__figure-floor"
                  aria-hidden="true"
                />

                <span className="fdp-portal__tap-hint">
                  Tap the figure to enter
                </span>
              </span>
            </button>

            <div className="fdp-portal__sequence">
              <span>FOUNDER</span>
              <i aria-hidden="true" />
              <span>DIGITAL TWIN</span>
            </div>
          </div>

          <footer className="fdp-portal__footer">
            <span>ARCHENOVA / ORIGIN</span>
            <i aria-hidden="true" />
            <span>
              CIVILIZATION CAN BE INTENTIONALLY DESIGNED
            </span>
          </footer>
        </div>
      </section>

      {mounted &&
        createPortal(
          <FounderEntryTransition entering={entering} />,
          document.body,
        )}

      <style jsx global>{`
        /* ==================================================
           ROOT — EPIS­TEME-STYLE CARD PARTICIPATION
        ================================================== */

        .fdp-portal,
        .fdp-portal *,
        .fdp-portal *::before,
        .fdp-portal *::after,
        .fdp-entry,
        .fdp-entry *,
        .fdp-entry *::before,
        .fdp-entry *::after {
          box-sizing: border-box;
        }

        .fdp-portal {
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
          background: transparent;
          box-shadow: none;

          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          color: rgba(247, 249, 251, 0.94);
        }

        .fdp-portal button {
          font: inherit;
        }

        .fdp-portal,
        .fdp-portal__stage,
        .fdp-portal__experience {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .fdp-portal::-webkit-scrollbar,
        .fdp-portal__stage::-webkit-scrollbar,
        .fdp-portal__experience::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        /* ==================================================
           STAGE — HEADER / EXPERIENCE / FOOTER
        ================================================== */

        .fdp-portal__stage {
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
          height: auto;
          max-height: none;

          padding: clamp(18px, 2.5vw, 32px);

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

        .fdp-portal__ambient,
        .fdp-portal__starfield {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fdp-portal__ambient {
          z-index: -2;

          background:
            radial-gradient(
              ellipse at 50% 52%,
              rgba(237, 194, 117, 0.065),
              transparent 43%
            ),
            radial-gradient(
              ellipse at 50% 76%,
              rgba(220, 180, 110, 0.018),
              transparent 53%
            );
        }

        .fdp-portal__starfield {
          z-index: -1;
          opacity: 0.15;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 235, 192, 0.55) 0 0.45px,
              transparent 0.8px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.22) 0 0.35px,
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

        .fdp-portal__header {
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

        .fdp-portal__identity {
          grid-column: 2;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          text-align: center;
        }

        .fdp-portal__identity > span {
          color: rgba(255, 255, 255, 0.88);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.25em;
        }

        .fdp-portal__identity > small {
          color: rgba(255, 255, 255, 0.34);
          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.16em;
          white-space: nowrap;
        }

        .fdp-portal__indicator {
          grid-column: 3;
          justify-self: end;

          display: inline-flex;
          align-items: center;
          gap: 8px;

          color: rgba(240, 244, 249, 0.48);
          font-size: 7px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .fdp-portal__indicator i {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;

          border-radius: 50%;
          background: rgba(246, 214, 155, 0.8);

          box-shadow:
            0 0 10px rgba(246, 214, 155, 0.25);

          animation:
            fdp-indicator-breathe
            8s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .fdp-portal__experience {
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
            clamp(12px, 2vw, 24px)
            0
            clamp(10px, 1.6vw, 18px);

          overflow: hidden;
        }

        .fdp-portal__statement {
          position: relative;
          z-index: 5;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;

          width: 100%;
          min-width: 0;

          text-align: center;

          transition:
            opacity 0.35s ease,
            transform 0.5s ease,
            filter 0.4s ease;
        }

        .fdp-portal__eyebrow {
          color: rgba(255, 255, 255, 0.32);
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.17em;
          text-align: center;
        }

        .fdp-portal__statement h2 {
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
           FIGURE BUTTON — ORIGINAL SVG PRESERVED
        ================================================== */

        .fdp-portal__figure-button {
          position: relative;
          z-index: 6;

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
          color: inherit;

          cursor: pointer;
          appearance: none;

          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;

          touch-action: manipulation;
        }

        .fdp-portal__figure-button:disabled {
          cursor: default;
        }

        .fdp-portal__figure-button:focus-visible {
          outline:
            1px solid rgba(247, 219, 164, 0.55);

          outline-offset: 7px;
          border-radius: 24px;
        }

        .fdp-portal__figure-space {
          position: relative;

          display: grid;
          place-items: center;

          width: min(100%, 330px);
          aspect-ratio: 1.17;

          margin: 0 auto;

          background: transparent;

          transform: translateZ(0);

          transition:
            transform 0.75s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .fdp-portal__figure-aura {
          position: absolute;
          inset: 8% 16%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(246, 209, 144, 0.13),
              rgba(224, 175, 101, 0.035) 43%,
              transparent 75%
            );

          filter: blur(19px);

          animation:
            fdp-aura-breathe
            12s ease-in-out infinite;
        }

        .fdp-portal__figure-object {
          position: relative;
          z-index: 2;

          display: block;
          width: 100%;
          height: 100%;

          animation:
            fdp-figure-float
            13s ease-in-out infinite;
        }

        .fdp-figure {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;

          filter:
            drop-shadow(
              0 12px 19px rgba(0, 0, 0, 0.28)
            )
            drop-shadow(
              0 0 10px rgba(246, 207, 142, 0.1)
            );
        }

        .fdp-figure__atmosphere {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            fdp-atmosphere-breathe
            9s ease-in-out infinite;
        }

        .fdp-figure__outline {
          animation:
            fdp-outline-breathe
            7s ease-in-out infinite;
        }

        .fdp-figure__halo-lines {
          animation:
            fdp-halo-breathe
            6s ease-in-out infinite;
        }

        .fdp-figure__strands {
          animation:
            fdp-strands-breathe
            11s ease-in-out infinite;
        }

        .fdp-figure__light-point {
          animation:
            fdp-light-twinkle
            6s ease-in-out infinite;
        }

        .fdp-portal__figure-floor {
          position: absolute;
          z-index: 1;
          bottom: 10%;

          width: 36%;
          height: 7%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(245, 205, 139, 0.075),
              transparent 72%
            );

          filter: blur(12px);

          animation:
            fdp-floor-breathe
            12s ease-in-out infinite;
        }

        .fdp-portal__tap-hint {
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

        .fdp-portal__sequence {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;

          width: 100%;
          margin-top: 7px;

          color: rgba(255, 255, 255, 0.32);
          font-size: 7px;
          font-weight: 550;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .fdp-portal__sequence i {
          width: clamp(24px, 8vw, 80px);
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(245, 211, 153, 0.28),
              transparent
            );
        }

        /* ==================================================
           FOOTER — ALWAYS THE THIRD GRID ROW
        ================================================== */

        .fdp-portal__footer {
          position: relative;
          z-index: 5;

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

          color: rgba(255, 255, 255, 0.3);

          transition: opacity 0.35s ease;
        }

        .fdp-portal__footer > span {
          font-size: 6px;
          font-weight: 610;
          letter-spacing: 0.15em;
          text-align: center;
        }

        .fdp-portal__footer > i {
          width: 3px;
          height: 3px;
          flex: 0 0 auto;

          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
        }

        /* ==================================================
           VIEWPORT-CENTERED ENTRY
        ================================================== */

        .fdp-entry {
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

          background: #080709;

          transition:
            opacity 0.12s ease,
            visibility 0s linear 1.7s;
        }

        .fdp-entry--active {
          opacity: 1;
          visibility: visible;

          transition: opacity 0.12s ease;
        }

        .fdp-entry__space,
        .fdp-entry__stars,
        .fdp-entry__light {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fdp-entry__space {
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 48%,
              #292119,
              #100d0c 42%,
              #050506 78%,
              #000 100%
            );
        }

        .fdp-entry__stars {
          inset: -20%;
          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 231, 184, 0.7) 0 0.6px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.25) 0 0.4px,
              transparent 0.8px
            );

          background-size: 89px 89px, 137px 137px;

          transform: scale(1.3);
        }

        .fdp-entry__light {
          opacity: 0;

          background:
            radial-gradient(
              ellipse at 50% 48%,
              rgba(245, 210, 147, 0.24),
              rgba(204, 147, 71, 0.045) 35%,
              transparent 69%
            );
        }

        .fdp-entry__cosmos {
          position: absolute;
          z-index: 2;

          top: 50%;
          left: 50%;

          width: min(92vmin, 760px);
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.72);

          pointer-events: none;
        }

        .fdp-entry__orbit {
          position: absolute;
          inset: 13%;

          display: block;

          border:
            1px solid rgba(255, 218, 156, 0.24);

          border-radius: 50%;

          box-shadow:
            0 0 20px rgba(255, 191, 104, 0.045),
            inset 0 0 20px rgba(255, 191, 104, 0.035);
        }

        .fdp-entry__orbit--one {
          transform: rotate(-28deg) scaleY(0.38);
        }

        .fdp-entry__orbit--two {
          transform: rotate(48deg) scaleY(0.38);
          border-color: rgba(255, 239, 206, 0.2);
        }

        .fdp-entry__orbit--three {
          inset: 22%;

          transform: rotate(108deg) scaleY(0.46);

          border-color: rgba(255, 202, 126, 0.15);
        }

        .fdp-entry__axis {
          position: absolute;
          top: 50%;
          left: 50%;

          display: block;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 223, 171, 0.2),
              transparent
            );

          transform: translate(-50%, -50%);
        }

        .fdp-entry__axis--horizontal {
          width: 100%;
          height: 1px;
        }

        .fdp-entry__axis--vertical {
          width: 1px;
          height: 100%;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(255, 223, 171, 0.14),
              transparent
            );
        }

        .fdp-entry__figure {
          position: absolute;
          z-index: 3;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: min(70vw, 460px);
          aspect-ratio: 1;

          margin: 0;
          padding: 0;

          opacity: 0;

          transform:
            translate3d(-50%, -50%, 0)
            scale(0.12);

          transform-origin: center center;

          filter: blur(9px);

          will-change: transform, opacity, filter;
        }

        .fdp-entry__figure > .fdp-figure--transition {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .fdp-entry__figure .fdp-figure__body,
        .fdp-entry__figure .fdp-figure__outline,
        .fdp-entry__figure .fdp-figure__halo-lines,
        .fdp-entry__figure .fdp-figure__strands,
        .fdp-entry__figure .fdp-figure__light-points {
          transform-box: fill-box;
          transform-origin: center;
        }

        .fdp-entry__stellar-origin {
          position: absolute;
          z-index: 4;

          top: 50%;
          left: 50%;

          display: grid;
          place-items: center;

          width: min(66vmin, 470px);
          aspect-ratio: 1;

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0.035);

          transform-origin: center;

          pointer-events: none;
          will-change: transform, opacity;
        }

        .fdp-entry__solar-corona,
        .fdp-entry__solar-rays,
        .fdp-entry__solar-atmosphere,
        .fdp-entry__solar-disc,
        .fdp-entry__solar-heart {
          position: absolute;
          display: block;

          border-radius: 50%;
          pointer-events: none;
        }

        .fdp-entry__solar-corona {
          inset: -45%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 239, 0.48) 0%,
              rgba(255, 233, 180, 0.3) 15%,
              rgba(255, 183, 89, 0.17) 28%,
              rgba(232, 122, 43, 0.055) 47%,
              transparent 68%
            );

          filter: blur(11px);
        }

        .fdp-entry__solar-rays {
          inset: -40%;

          background:
            conic-gradient(
              from 12deg,
              transparent 0deg,
              rgba(255, 238, 194, 0.22) 4deg,
              transparent 10deg,
              transparent 29deg,
              rgba(255, 212, 141, 0.2) 34deg,
              transparent 42deg,
              transparent 67deg,
              rgba(255, 246, 215, 0.26) 72deg,
              transparent 79deg,
              transparent 103deg,
              rgba(255, 211, 135, 0.2) 108deg,
              transparent 116deg,
              transparent 149deg,
              rgba(255, 243, 208, 0.24) 155deg,
              transparent 162deg,
              transparent 194deg,
              rgba(255, 209, 131, 0.22) 200deg,
              transparent 208deg,
              transparent 238deg,
              rgba(255, 241, 201, 0.23) 245deg,
              transparent 253deg,
              transparent 281deg,
              rgba(255, 210, 135, 0.2) 287deg,
              transparent 296deg,
              transparent 326deg,
              rgba(255, 245, 210, 0.22) 333deg,
              transparent 341deg,
              transparent 360deg
            );

          mask-image:
            radial-gradient(
              circle,
              transparent 0 21%,
              black 37%,
              transparent 72%
            );

          -webkit-mask-image:
            radial-gradient(
              circle,
              transparent 0 21%,
              black 37%,
              transparent 72%
            );

          filter: blur(5px);
        }

        .fdp-entry__solar-atmosphere {
          inset: 4%;

          background:
            radial-gradient(
              circle,
              rgba(255, 249, 224, 0.58) 0%,
              rgba(255, 224, 150, 0.5) 30%,
              rgba(255, 167, 67, 0.24) 52%,
              rgba(255, 127, 38, 0.08) 67%,
              transparent 77%
            );

          filter: blur(18px);
        }

        .fdp-entry__solar-disc {
          inset: 23%;

          background:
            radial-gradient(
              circle at 38% 34%,
              #fffefa 0%,
              #fff8de 20%,
              #ffe9ac 45%,
              #f7bb62 72%,
              #c9782e 100%
            );

          box-shadow:
            0 0 12px rgba(255, 250, 226, 0.95),
            0 0 42px rgba(255, 220, 151, 0.72),
            0 0 105px rgba(255, 176, 80, 0.42),
            0 0 180px rgba(255, 149, 62, 0.2);
        }

        .fdp-entry__solar-heart {
          inset: 38%;

          background: #fffefa;

          box-shadow:
            0 0 24px 14px rgba(255, 253, 236, 0.8),
            0 0 60px 28px rgba(255, 236, 183, 0.5);
        }

        .fdp-entry__particles {
          position: absolute;
          z-index: 4;

          top: 50%;
          left: 50%;

          width: 1px;
          height: 1px;

          pointer-events: none;
        }

        .fdp-entry__particle {
          position: absolute;
          top: 0;
          left: 0;

          display: block;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          opacity: 0;

          background: #fff5d8;

          box-shadow:
            0 0 8px 2px rgba(255, 225, 165, 0.7);

          transform:
            rotate(var(--fdp-angle))
            translateX(0)
            scale(0.2);
        }

        .fdp-entry__wave {
          position: absolute;
          z-index: 5;

          top: 50%;
          left: 50%;

          width: 100vmax;
          aspect-ratio: 1;

          border-radius: 50%;

          opacity: 0;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 247, 1) 0%,
              rgba(255, 251, 229, 1) 18%,
              rgba(255, 231, 181, 0.98) 40%,
              rgba(255, 196, 116, 0.92) 64%,
              rgba(255, 171, 89, 0.84) 100%
            );

          transform:
            translate(-50%, -50%)
            scale(0.015);

          pointer-events: none;
        }

        .fdp-entry__copy {
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

        .fdp-entry__copy > span {
          color: rgba(255, 247, 229, 0.8);
          font-size: 9px;
          font-weight: 620;
          letter-spacing: 0.23em;
        }

        .fdp-entry__copy > small {
          color: rgba(255, 235, 196, 0.4);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .fdp-portal--entering
        .fdp-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(0.98);

          filter: blur(3px);
        }

        .fdp-portal--entering
        .fdp-portal__stage {
          opacity: 0;

          transform: scale(0.975);

          filter:
            brightness(0.35)
            blur(8px);
        }

        .fdp-entry--active .fdp-entry__space {
          animation:
            fdp-space-enter 1.7s ease forwards;
        }

        .fdp-entry--active .fdp-entry__stars {
          animation:
            fdp-stars-enter 1.7s ease forwards;
        }

        .fdp-entry--active .fdp-entry__light {
          animation:
            fdp-light-enter 1.7s ease forwards;
        }

        .fdp-entry--active .fdp-entry__cosmos {
          animation:
            fdp-cosmos-enter
            1.7s
            cubic-bezier(0.16, 0.76, 0.2, 1)
            forwards;
        }

        .fdp-entry--active .fdp-entry__figure {
          animation:
            fdp-figure-enter
            1.7s
            cubic-bezier(0.16, 0.76, 0.2, 1)
            forwards;
        }

        .fdp-entry--active
        .fdp-entry__figure
        .fdp-figure__outline {
          animation:
            fdp-founder-illuminate
            1.7s ease forwards;
        }

        .fdp-entry--active
        .fdp-entry__figure
        .fdp-figure__halo-lines {
          animation:
            fdp-founder-halo
            1.7s ease forwards;
        }

        .fdp-entry--active
        .fdp-entry__figure
        .fdp-figure__light-points {
          animation:
            fdp-founder-points
            1.7s ease forwards;
        }

        .fdp-entry--active .fdp-entry__stellar-origin {
          animation:
            fdp-stellar-ignition
            1.7s
            cubic-bezier(0.16, 0.76, 0.2, 1)
            forwards;
        }

        .fdp-entry--active .fdp-entry__solar-corona {
          animation:
            fdp-corona-bloom
            1.7s ease-out forwards;
        }

        .fdp-entry--active .fdp-entry__solar-rays {
          animation:
            fdp-rays-bloom
            1.7s ease-out forwards;
        }

        .fdp-entry--active .fdp-entry__solar-disc {
          animation:
            fdp-disc-bloom
            1.7s ease-out forwards;
        }

        .fdp-entry--active .fdp-entry__particle {
          animation:
            fdp-particle-release
            1.7s
            cubic-bezier(0.2, 0.7, 0.25, 1)
            var(--fdp-delay)
            forwards;
        }

        .fdp-entry--active .fdp-entry__wave {
          animation:
            fdp-wave-enter
            1.7s
            cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .fdp-entry--active .fdp-entry__copy {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* ==================================================
           AMBIENT ANIMATIONS
        ================================================== */

        @keyframes fdp-indicator-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes fdp-aura-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }

        @keyframes fdp-figure-float {
          0%, 100% {
            transform:
              translateY(3px)
              scale(0.995);
          }

          50% {
            transform:
              translateY(-4px)
              scale(1.005);
          }
        }

        @keyframes fdp-atmosphere-breathe {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.96);
          }

          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }

        @keyframes fdp-outline-breathe {
          0%, 100% {
            opacity: 0.72;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes fdp-halo-breathe {
          0%, 100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.75;
          }
        }

        @keyframes fdp-strands-breathe {
          0%, 100% {
            opacity: 0.18;
          }

          50% {
            opacity: 0.48;
          }
        }

        @keyframes fdp-light-twinkle {
          0%, 100% {
            opacity: 0.3;
          }

          50% {
            opacity: 0.95;
          }
        }

        @keyframes fdp-floor-breathe {
          0%, 100% {
            opacity: 0.4;
            transform: scaleX(0.9);
          }

          50% {
            opacity: 0.8;
            transform: scaleX(1.05);
          }
        }

        /* ==================================================
           ENTRY ANIMATIONS — 1700ms
        ================================================== */

        @keyframes fdp-space-enter {
          0% {
            opacity: 0;
          }

          16%, 100% {
            opacity: 1;
          }
        }

        @keyframes fdp-stars-enter {
          0% {
            opacity: 0;
            transform: scale(1.3);
          }

          20% {
            opacity: 0.65;
          }

          43% {
            opacity: 0.85;
            transform: scale(1.08);
          }

          75% {
            opacity: 0.38;
          }

          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        @keyframes fdp-light-enter {
          0% {
            opacity: 0;
          }

          30% {
            opacity: 0.28;
          }

          55% {
            opacity: 0.85;
          }

          82% {
            opacity: 1;
          }

          100% {
            opacity: 0.3;
          }
        }

        @keyframes fdp-cosmos-enter {
          0% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              rotate(-16deg)
              scale(0.72);
          }

          18% {
            opacity: 0;
          }

          35% {
            opacity: 0.8;
          }

          56% {
            opacity: 0.72;

            transform:
              translate(-50%, -50%)
              rotate(0deg)
              scale(1);
          }

          77% {
            opacity: 0.26;
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              rotate(15deg)
              scale(1.48);
          }
        }

        @keyframes fdp-figure-enter {
          0% {
            opacity: 0;

            transform:
              translate3d(-50%, -50%, 0)
              scale(0.12);

            filter: blur(9px);
          }

          16% {
            opacity: 1;
          }

          36% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(0.74);

            filter: blur(0);
          }

          53% {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(0.92);

            filter:
              blur(0)
              brightness(1.2);
          }

          68% {
            opacity: 0.92;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1.04);

            filter:
              blur(1px)
              brightness(2);
          }

          83% {
            opacity: 0.18;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1.35);

            filter:
              blur(12px)
              brightness(3);
          }

          100% {
            opacity: 0;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1.65);

            filter: blur(20px);
          }
        }

        @keyframes fdp-founder-illuminate {
          0%, 32% {
            opacity: 0.72;
            filter: none;
          }

          55% {
            opacity: 1;

            filter:
              drop-shadow(
                0 0 8px rgba(255, 232, 174, 0.85)
              );
          }

          72% {
            opacity: 1;

            filter:
              drop-shadow(
                0 0 20px rgba(255, 246, 209, 1)
              );
          }

          100% {
            opacity: 0;
            filter: blur(12px);
          }
        }

        @keyframes fdp-founder-halo {
          0%, 34% {
            opacity: 0.4;
          }

          58% {
            opacity: 0.95;
          }

          76% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes fdp-founder-points {
          0%, 32% {
            opacity: 0.55;
          }

          56% {
            opacity: 1;
          }

          75% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes fdp-stellar-ignition {
          0%, 32% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.035);
          }

          39% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(0.055);
          }

          53% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(0.18);
          }

          68% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(0.52);
          }

          82% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1.08);
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1.85);
          }
        }

        @keyframes fdp-corona-bloom {
          0%, 38% {
            opacity: 0.25;
            transform: scale(0.72);
          }

          65% {
            opacity: 0.85;
          }

          100% {
            opacity: 1;
            transform: scale(1.32);
          }
        }

        @keyframes fdp-rays-bloom {
          0%, 40% {
            opacity: 0;
            transform: rotate(-24deg) scale(0.6);
          }

          63% {
            opacity: 0.65;
          }

          100% {
            opacity: 1;
            transform: rotate(16deg) scale(1.25);
          }
        }

        @keyframes fdp-disc-bloom {
          0%, 38% {
            opacity: 0.3;
            transform: scale(0.7);
          }

          66% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes fdp-particle-release {
          0%, 38% {
            opacity: 0;

            transform:
              rotate(var(--fdp-angle))
              translateX(0)
              scale(0.2);
          }

          49% {
            opacity: 0.95;
          }

          76% {
            opacity: 0.8;
          }

          100% {
            opacity: 0;

            transform:
              rotate(var(--fdp-angle))
              translateX(var(--fdp-distance))
              scale(0.1);
          }
        }

        @keyframes fdp-wave-enter {
          0%, 77% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.015);
          }

          82% {
            opacity: 0.22;
          }

          92% {
            opacity: 0.86;
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(2.8);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .fdp-portal__figure-button:hover
          .fdp-portal__figure-space {
            transform:
              translateY(-2px)
              scale(1.035);
          }

          .fdp-portal__figure-button:hover
          .fdp-figure {
            filter:
              drop-shadow(
                0 15px 22px rgba(0, 0, 0, 0.32)
              )
              drop-shadow(
                0 0 16px rgba(247, 210, 146, 0.2)
              );
          }

          .fdp-portal__figure-button:hover
          .fdp-portal__tap-hint {
            color: rgba(255, 245, 220, 0.72);

            transform:
              translate(-50%, -2px);
          }
        }

        /* ==================================================
           MOBILE — MATCH EPISTEME'S CARD STRUCTURE

           Do not switch the stage to an auto-height
           flex column. Keep the three-row grid so the
           footer stays at the bottom of the portal.
        ================================================== */

        @media (max-width: 700px) {
          .fdp-portal {
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

          .fdp-portal__stage {
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

          .fdp-portal__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;

            width: 100%;
          }

          .fdp-portal__identity {
            gap: 5px;
          }

          .fdp-portal__identity > span {
            font-size: 9px;
            letter-spacing: 0.21em;
          }

          .fdp-portal__identity > small {
            font-size: 6px;
            letter-spacing: 0.11em;
          }

          .fdp-portal__indicator {
            justify-self: auto;

            gap: 6px;

            font-size: 6px;
            letter-spacing: 0.09em;
          }

          .fdp-portal__indicator i {
            width: 4px;
            height: 4px;
            flex-basis: 4px;
          }

          .fdp-portal__experience {
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

          .fdp-portal__statement {
            flex: 0 0 auto;
            gap: 10px;
          }

          .fdp-portal__eyebrow {
            font-size: 6px;
            letter-spacing: 0.1em;
          }

          .fdp-portal__statement h2 {
            font-size: clamp(30px, 7.6vw, 39px);
            line-height: 1.04;
            letter-spacing: -0.054em;
          }

          .fdp-portal__figure-button {
            flex: 0 0 auto;

            width: min(100%, 310px);
            margin-top: 10px;
          }

          .fdp-portal__figure-space {
            width: min(100%, 275px);
            aspect-ratio: 1.12;
          }

          .fdp-portal__tap-hint {
            font-size: 7px;
            letter-spacing: 0.08em;
          }

          .fdp-portal__sequence {
            flex: 0 0 auto;

            gap: 10px;
            margin-top: 9px;

            font-size: 6px;
            letter-spacing: 0.09em;
          }

          .fdp-portal__sequence i {
            width: 24px;
          }

          .fdp-portal__footer {
            flex: 0 0 auto;
            align-self: end;

            gap: 7px;

            width: 100%;
            min-height: 20px;

            padding-top: 12px;
          }

          .fdp-portal__footer > span {
            font-size: 5.5px;
            letter-spacing: 0.08em;
          }

          .fdp-entry__figure {
            width: min(76vw, 460px);
          }
        }

        /* ==================================================
           NARROW MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .fdp-portal__stage {
            padding: 25px 15px 21px;
          }

          .fdp-portal__statement h2 {
            font-size: clamp(29px, 7.7vw, 36px);
          }

          .fdp-portal__figure-space {
            width: min(100%, 260px);
          }

          .fdp-portal__footer > span {
            font-size: 5px;
          }
        }

        @media (max-width: 360px) {
          .fdp-portal__stage {
            padding: 23px 13px 19px;
          }

          .fdp-portal__statement h2 {
            font-size: 26px;
          }

          .fdp-portal__eyebrow {
            font-size: 5.5px;
          }

          .fdp-portal__figure-space {
            width: min(100%, 235px);
          }

          .fdp-portal__footer > span {
            font-size: 4.5px;
          }
        }

        /* ==================================================
           SHORT VIEWPORTS

           Keep the Episteme-style card height.
           Reduce only the figure's display box and
           internal spacing when viewport height is short.
        ================================================== */

        @media (max-width: 700px) and (max-height: 760px) {
          .fdp-portal__experience {
            padding: 24px 0 20px;
          }

          .fdp-portal__statement {
            gap: 8px;
          }

          .fdp-portal__figure-button {
            margin-top: 6px;
          }

          .fdp-portal__figure-space {
            width: min(100%, 245px);
          }

          .fdp-portal__sequence {
            margin-top: 6px;
          }
        }

        @media (max-width: 700px) and (max-height: 640px) {
          .fdp-portal__experience {
            padding: 18px 0 15px;
          }

          .fdp-portal__statement h2 {
            font-size: clamp(26px, 7vw, 33px);
          }

          .fdp-portal__figure-space {
            width: min(100%, 215px);
          }
        }

        @media (max-width: 430px) and (max-height: 760px) {
          .fdp-portal__figure-space {
            width: min(100%, 235px);
          }
        }

        @media (max-width: 430px) and (max-height: 640px) {
          .fdp-portal__figure-space {
            width: min(100%, 205px);
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .fdp-portal__indicator i,
          .fdp-portal__figure-aura,
          .fdp-portal__figure-object,
          .fdp-figure__atmosphere,
          .fdp-figure__outline,
          .fdp-figure__halo-lines,
          .fdp-figure__strands,
          .fdp-figure__light-point,
          .fdp-portal__figure-floor {
            animation: none !important;
          }

          .fdp-portal__figure-space,
          .fdp-portal__stage,
          .fdp-portal__statement {
            transition-duration: 0.12s !important;
          }

          .fdp-entry--active .fdp-entry__space,
          .fdp-entry--active .fdp-entry__stars,
          .fdp-entry--active .fdp-entry__light,
          .fdp-entry--active .fdp-entry__figure,
          .fdp-entry--active .fdp-entry__cosmos,
          .fdp-entry--active .fdp-entry__stellar-origin,
          .fdp-entry--active .fdp-entry__solar-corona,
          .fdp-entry--active .fdp-entry__solar-rays,
          .fdp-entry--active .fdp-entry__solar-disc,
          .fdp-entry--active .fdp-entry__particle,
          .fdp-entry--active .fdp-entry__wave,
          .fdp-entry--active
          .fdp-entry__figure
          .fdp-figure__outline,
          .fdp-entry--active
          .fdp-entry__figure
          .fdp-figure__halo-lines,
          .fdp-entry--active
          .fdp-entry__figure
          .fdp-figure__light-points {
            animation: none !important;
          }

          .fdp-entry--active .fdp-entry__space {
            opacity: 1;
          }

          .fdp-entry--active .fdp-entry__figure {
            opacity: 1;

            transform:
              translate3d(-50%, -50%, 0)
              scale(1);

            filter: none;
          }

          .fdp-entry--active .fdp-entry__cosmos {
            opacity: 0.35;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          .fdp-entry--active .fdp-entry__stellar-origin {
            opacity: 0.65;

            transform:
              translate(-50%, -50%)
              scale(0.4);
          }

          .fdp-entry--active .fdp-entry__copy {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}