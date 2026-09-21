"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

/* ==========================================================
   EPISTEME DIALOGUE PORTAL

   HOME owns the only visible outer glass card.

   This component preserves:
   - existing HOME layout
   - black atmosphere
   - wording and navigation
   - internal vertical scrolling
   - full-screen black-hole transition

   ICON CHANGE:
   Obsidian brain → white anatomical wire-frame brain
========================================================== */

function WireframeBrain() {
  const horizontalThreads = Array.from(
    { length: 30 },
    (_, i) => i,
  );

  const verticalThreads = Array.from(
    { length: 38 },
    (_, i) => i,
  );

  const diagonalThreads = Array.from(
    { length: 24 },
    (_, i) => i,
  );

  const cerebellumThreads = Array.from(
    { length: 15 },
    (_, i) => i,
  );

  return (
    <svg
      className="ep-dialogue-portal__wire-brain"
      viewBox="0 0 800 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path
          id="ep-wire-brain-outline"
          d="
            M 100 260
            C 79 231 91 186 125 164
            C 129 120 173 91 215 102
            C 247 63 299 58 338 79
            C 367 52 409 56 438 80
            C 477 53 525 69 549 101
            C 590 91 632 117 641 157
            C 682 168 704 208 694 245
            C 725 274 717 319 689 344
            C 685 390 649 419 605 414
            C 590 451 551 468 514 450
            C 485 470 451 466 429 450
            C 405 470 371 469 349 448
            C 313 470 274 452 260 421
            C 220 435 182 409 175 375
            C 131 370 99 341 108 303
            C 92 289 91 274 100 260
            Z
          "
        />

        <clipPath id="ep-wire-brain-clip">
          <use href="#ep-wire-brain-outline" />
        </clipPath>

        <linearGradient
          id="ep-wire-brain-white"
          x1="115"
          y1="85"
          x2="685"
          y2="465"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity="0.65"
          />

          <stop
            offset="0.48"
            stopColor="#FFFFFF"
            stopOpacity="0.96"
          />

          <stop
            offset="1"
            stopColor="#FFFFFF"
            stopOpacity="0.52"
          />
        </linearGradient>

        <filter
          id="ep-wire-brain-soft-glow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* Dense anatomical network */}

      <g
        clipPath="url(#ep-wire-brain-clip)"
        stroke="url(#ep-wire-brain-white)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeWidth="0.68" opacity="0.67">
          {horizontalThreads.map((i) => {
            const y = 74 + i * 14;

            return (
              <path
                key={`ep-horizontal-${i}`}
                d={`
                  M 66 ${y}
                  C 190 ${y - 69 + (i % 5) * 13},
                    303 ${y + 77 - (i % 6) * 14},
                    412 ${y + 5}
                  S 612 ${y - 64 + (i % 4) * 18},
                    743 ${y + 12}
                `}
              />
            );
          })}
        </g>

        <g strokeWidth="0.7" opacity="0.72">
          {verticalThreads.map((i) => {
            const x = 80 + i * 17;

            return (
              <path
                key={`ep-vertical-${i}`}
                d={`
                  M ${x} 39
                  C ${x - 91 + (i % 5) * 21} 164,
                    ${x + 103 - (i % 4) * 27} 291,
                    ${x - 37 + (i % 6) * 14} 508
                `}
              />
            );
          })}
        </g>

        <g strokeWidth="0.62" opacity="0.55">
          {diagonalThreads.map((i) => {
            const y = 93 + i * 15;

            return (
              <path
                key={`ep-diagonal-${i}`}
                d={`
                  M 72 ${y + 110}
                  Q ${329 + (i % 4) * 23}
                    ${y - 168 + (i % 5) * 26},
                    740 ${y + 42}
                `}
              />
            );
          })}
        </g>

        {/* Recognizable cortical folds */}

        <g
          strokeWidth="1.55"
          opacity="0.84"
        >
          <path d="M 120 236 C 194 150 252 164 320 220 S 437 310 499 230 S 623 167 686 239" />

          <path d="M 117 291 C 187 237 242 284 292 329 S 387 376 444 310 S 570 250 689 303" />

          <path d="M 164 165 C 232 122 272 174 303 220 S 371 289 419 247 S 502 145 590 159" />

          <path d="M 176 370 C 252 335 294 394 354 409 S 473 354 534 391 S 621 393 675 347" />

          <path d="M 339 79 C 306 145 368 182 352 245 S 310 341 349 448" />

          <path d="M 438 80 C 467 144 415 188 443 253 S 481 359 429 450" />

          <path d="M 145 206 C 215 220 239 265 218 314 S 231 390 281 407" />

          <path d="M 588 126 C 559 183 589 217 643 238 S 668 319 627 365" />

          <path d="M 271 111 C 303 149 281 188 253 215 S 251 286 297 313" />

          <path d="M 502 107 C 480 160 507 203 550 223 S 586 288 557 328" />
        </g>

        {/* Smaller interconnected folds */}

        <g
          strokeWidth="0.94"
          opacity="0.76"
        >
          <path d="M 130 269 C 185 249 215 277 242 314 S 303 348 341 320" />

          <path d="M 173 144 C 205 187 241 178 274 155 S 332 129 361 168" />

          <path d="M 290 94 C 337 118 358 161 343 204 S 366 270 407 287" />

          <path d="M 414 91 C 386 133 406 169 449 189 S 500 238 478 283" />

          <path d="M 515 130 C 548 162 546 198 524 230 S 531 295 576 310" />

          <path d="M 607 185 C 574 223 590 263 635 280 S 668 328 636 353" />

          <path d="M 192 334 C 239 318 267 353 279 389 S 327 429 367 414" />

          <path d="M 347 359 C 387 331 420 347 447 382 S 504 413 536 391" />

          <path d="M 469 326 C 504 300 540 321 561 355 S 607 394 645 373" />

          <path d="M 245 218 C 289 205 309 239 299 277 S 315 341 360 354" />

          <path d="M 374 176 C 408 201 397 238 377 262 S 372 318 407 341" />

          <path d="M 461 183 C 432 222 446 255 480 274 S 509 321 489 353" />
        </g>
      </g>

      {/* Outer anatomical silhouette */}

      <use
        href="#ep-wire-brain-outline"
        stroke="url(#ep-wire-brain-white)"
        strokeWidth="1.55"
        opacity="0.88"
      />

      {/* Lower temporal structure */}

      <g
        stroke="url(#ep-wire-brain-white)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="
            M 289 369
            C 318 345 357 348 386 370
            C 415 392 443 396 473 382
            C 501 367 531 375 552 401
            C 526 429 491 445 455 438
            C 421 431 405 454 371 449
            C 333 444 306 414 289 369
            Z
          "
          strokeWidth="0.95"
          opacity="0.58"
        />

        {/* Cerebellum */}

        <path
          d="
            M 492 369
            C 523 335 575 334 610 357
            C 646 381 649 424 617 449
            C 588 474 546 471 520 449
            C 501 433 489 402 492 369
            Z
          "
          strokeWidth="1.25"
          opacity="0.8"
        />

        {cerebellumThreads.map((i) => (
          <path
            key={`ep-cerebellum-${i}`}
            d={`
              M ${492 + i * 9} ${366 + (i % 3) * 5}
              Q ${463 + i * 12} ${408 + (i % 4) * 4},
                ${522 + i * 8} ${454 - (i % 5) * 3}
            `}
            strokeWidth="0.75"
            opacity="0.63"
          />
        ))}

        {/* Brain stem */}

        <path
          d="
            M 524 443
            C 535 464 549 483 559 503
            C 570 526 578 546 574 563
            L 593 563
            C 603 543 594 516 582 490
            C 573 470 567 456 563 443
          "
          strokeWidth="1.3"
          opacity="0.76"
        />

        <g
          strokeWidth="0.72"
          opacity="0.53"
        >
          <path d="M 535 460 L 583 506" />
          <path d="M 546 480 L 589 528" />
          <path d="M 557 502 L 590 550" />
          <path d="M 548 459 L 577 496" />
          <path d="M 560 467 L 583 513" />
        </g>
      </g>

      {/* Very subtle edge illumination */}

      <use
        href="#ep-wire-brain-outline"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity="0.24"
        filter="url(#ep-wire-brain-soft-glow)"
      />
    </svg>
  );
}

export default function EpistemeDialoguePortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<number | null>(null);

  const [entering, setEntering] =
    useState(false);

  /* ========================================================
     ENTER EPISTEME — ORIGINAL NAVIGATION
  ======================================================== */

  const enterEpisteme = useCallback(() => {
    if (entering) {
      return;
    }

    setEntering(true);

    transitionTimerRef.current =
      window.setTimeout(() => {
        router.push("/episteme-dialogue");
      }, 1250);
  }, [entering, router]);

  /* ========================================================
     CLEANUP
  ======================================================== */

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);

  return (
    <section
      className={[
        "ep-dialogue-portal",
        entering
          ? "ep-dialogue-portal--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="ep-dialogue-portal-title"
    >
      {/* HOME owns the only visible outer card. */}

      <div className="ep-dialogue-portal__card">
        <div
          className="ep-dialogue-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__stars"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__reflection"
          aria-hidden="true"
        />

        {/* HEADER — ORIGINAL */}

        <header className="ep-dialogue-portal__top">
          <div className="ep-dialogue-portal__identity">
            <span>EPISTEME</span>

            <small>
              CONVERSATIONAL INTELLIGENCE
            </small>
          </div>

          <div className="ep-dialogue-portal__live">
            <i />

            <span>LIVE</span>
          </div>
        </header>

        {/* CENTRAL EXPERIENCE — ORIGINAL LAYOUT */}

        <div className="ep-dialogue-portal__experience">
          <div className="ep-dialogue-portal__statement">
            <span className="ep-dialogue-portal__eyebrow">
              CONTINUOUS INTELLIGENCE
            </span>

            <h2 id="ep-dialogue-portal-title">
              Think with Episteme.
            </h2>
          </div>

          <button
            type="button"
            className="ep-dialogue-portal__brain-button"
            onClick={enterEpisteme}
            disabled={entering}
            aria-label="Tap Episteme to enter the conversational intelligence space"
          >
            <span className="ep-dialogue-portal__brain">
              {/* ORIGINAL GRAVITATIONAL ATMOSPHERE */}

              <span className="ep-dialogue-portal__gravity-field" />

              <span className="ep-dialogue-portal__brain-aura" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--outer" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--inner" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--vertical" />

              {/* NEW WHITE WIRE-FRAME BRAIN */}

              <span className="ep-dialogue-portal__organ ep-dialogue-portal__organ--wire">
                <WireframeBrain />
              </span>

              {/* ORIGINAL FLOATING SHADOW */}

              <span className="ep-dialogue-portal__brain-floor" />

              <span className="ep-dialogue-portal__tap-hint">
                Tap Episteme to enter
              </span>
            </span>
          </button>
        </div>

        {/* FOOTER — ORIGINAL */}

        <footer className="ep-dialogue-portal__footer">
          <span>EPISTEME</span>

          <i />

          <span>REALITY RETAINS VETO</span>
        </footer>
      </div>

      {/* ORIGINAL FULL-SCREEN BLACK-HOLE TRANSITION */}

      <div
        className="ep-dialogue-portal__transition"
        aria-hidden={!entering}
      >
        <div className="ep-dialogue-portal__space" />

        <div className="ep-dialogue-portal__transition-stars" />

        <div className="ep-dialogue-portal__collapse-vignette" />

        <div className="ep-dialogue-portal__lensing-field">
          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--1" />

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--2" />

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--3" />

          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--4" />
        </div>

        <div className="ep-dialogue-portal__black-hole">
          <span className="ep-dialogue-portal__disk-glow" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--far" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--outer" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--middle" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--inner" />

          <span className="ep-dialogue-portal__photon-crown" />

          <span className="ep-dialogue-portal__photon-ring" />

          <span className="ep-dialogue-portal__event-horizon" />

          <span className="ep-dialogue-portal__singularity" />
        </div>

        <div className="ep-dialogue-portal__black-wave" />

        <div className="ep-dialogue-portal__transition-copy">
          <span>EPISTEME</span>

          <small>Entering cognition</small>
        </div>
      </div>

      <style jsx>{`
        /* ==================================================
           ROOT — HOME OWNS THE OUTER GLASS CARD
        ================================================== */

        .ep-dialogue-portal,
        .ep-dialogue-portal *,
        .ep-dialogue-portal *::before,
        .ep-dialogue-portal *::after {
          box-sizing: border-box;
        }

        .ep-dialogue-portal {
          position: relative;
          width: 100%;
          max-width: 100%;
          min-width: 0;
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
        }

        button {
          font: inherit;
        }

        /* ==================================================
           INTERNAL LAYOUT — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;
          isolation: isolate;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: clamp(560px, 58vw, 700px);

          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;

          overflow: hidden;
          padding: clamp(25px, 4vw, 50px);

          border: 0;
          border-radius: 0;
          outline: 0;
          background: transparent;
          -webkit-backdrop-filter: none;
          backdrop-filter: none;
          box-shadow: none;

          color: rgba(248, 249, 250, 0.94);

          transition:
            opacity 0.65s ease,
            transform 0.8s cubic-bezier(0.16, 0.78, 0.22, 1),
            filter 0.65s ease;
        }

        .ep-dialogue-portal__card::before,
        .ep-dialogue-portal__card::after {
          content: none;
          display: none;
          border: 0;
          background: none;
          box-shadow: none;
          -webkit-backdrop-filter: none;
          backdrop-filter: none;
        }

        /* ==================================================
           ORIGINAL ATMOSPHERE
        ================================================== */

        .ep-dialogue-portal__ambient {
          position: absolute;
          inset: 0;
          z-index: -6;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 51%,
              rgba(255, 255, 255, 0.026),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 16% 24%,
              rgba(255, 255, 255, 0.012),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 84% 75%,
              rgba(255, 255, 255, 0.01),
              transparent 36%
            );
        }

        .ep-dialogue-portal__stars {
          position: absolute;
          inset: 0;
          z-index: -5;
          pointer-events: none;
          opacity: 0.14;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.36) 0 0.45px,
              transparent 0.75px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.16) 0 0.35px,
              transparent 0.65px
            );

          background-size: 67px 67px, 109px 109px;
          background-position: 0 0, 31px 21px;

          -webkit-mask-image:
            radial-gradient(
              ellipse at 50% 52%,
              black,
              transparent 82%
            );

          mask-image:
            radial-gradient(
              ellipse at 50% 52%,
              black,
              transparent 82%
            );
        }

        .ep-dialogue-portal__reflection {
          position: absolute;
          z-index: -3;
          pointer-events: none;

          top: -30%;
          left: -10%;
          width: 62%;
          height: 62%;

          transform: rotate(-17deg);

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(255, 255, 255, 0.014),
              transparent
            );

          filter: blur(28px);
        }

        /* ==================================================
           HEADER — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__top {
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
        }

        .ep-dialogue-portal__identity {
          grid-column: 2;
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;

          text-align: center;
        }

        .ep-dialogue-portal__identity > span {
          color: rgba(255, 255, 255, 0.82);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.24em;
          white-space: nowrap;
        }

        .ep-dialogue-portal__identity > small {
          color: rgba(255, 255, 255, 0.24);
          font-size: 6px;
          letter-spacing: 0.14em;
          white-space: nowrap;
        }

        .ep-dialogue-portal__live {
          grid-column: 3;
          justify-self: end;

          display: inline-flex;
          align-items: center;
          gap: 7px;

          color: rgba(255, 255, 255, 0.32);
          font-size: 6px;
          font-weight: 600;
          letter-spacing: 0.14em;
        }

        .ep-dialogue-portal__live i {
          width: 4px;
          height: 4px;
          flex: 0 0 auto;
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.62);

          box-shadow:
            0 0 9px rgba(255, 255, 255, 0.24);

          animation:
            ep-live-breathe 9.6s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL EXPERIENCE — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__experience {
          position: relative;
          z-index: 5;

          align-self: center;

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

        .ep-dialogue-portal__experience::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        /* ==================================================
           STATEMENT — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__statement {
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

        .ep-dialogue-portal__eyebrow {
          max-width: 100%;

          color: rgba(255, 255, 255, 0.22);
          font-size: 6px;
          font-weight: 600;
          letter-spacing: 0.21em;

          text-align: center;
        }

        .ep-dialogue-portal__statement h2 {
          width: 100%;
          max-width: 820px;
          margin: 0;

          color: rgba(250, 251, 252, 0.97);

          font-size: clamp(39px, 5.1vw, 70px);
          font-weight: 235;
          line-height: 1.015;
          letter-spacing: -0.058em;

          text-align: center;
          overflow-wrap: break-word;
          text-wrap: balance;

          text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.02);
        }

        /* ==================================================
           BRAIN BUTTON — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__brain-button {
          position: relative;
          z-index: 6;

          width: min(100%, 520px);
          max-width: 100%;
          min-width: 0;

          display: block;

          margin-top: clamp(13px, 1.8vw, 22px);
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
        }

        .ep-dialogue-portal__brain-button:disabled {
          cursor: default;
        }

        .ep-dialogue-portal__brain-button:focus-visible {
          outline:
            1px solid rgba(255, 255, 255, 0.18);

          outline-offset: 8px;
          border-radius: 50%;
        }

        .ep-dialogue-portal__brain {
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
          border: 0;
          box-shadow: none;

          transform: translateZ(0);

          transition:
            transform 0.75s
            cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* ==================================================
           GRAVITY FIELD — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__gravity-field {
          position: absolute;
          z-index: 0;

          width: 86%;
          height: 65%;
          left: 50%;
          top: 48%;

          transform: translate(-50%, -50%);
          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(255, 255, 255, 0.032) 0%,
              rgba(255, 255, 255, 0.012) 27%,
              rgba(0, 0, 0, 0.11) 49%,
              transparent 72%
            );

          filter: blur(13px);
          opacity: 0.72;
          pointer-events: none;

          animation:
            ep-gravity-breathe 11.5s ease-in-out infinite;
        }

        /* ==================================================
           AURA — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__brain-aura {
          position: absolute;
          z-index: 1;

          width: 78%;
          aspect-ratio: 1;
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 16%,
              rgba(255, 255, 255, 0.032) 34%,
              rgba(255, 255, 255, 0.009) 52%,
              transparent 72%
            );

          filter: blur(11px);
          pointer-events: none;

          animation:
            ep-aura-breathe 10.8s ease-in-out infinite;
        }

        /* ==================================================
           ORBITS — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__brain-orbit {
          position: absolute;
          z-index: 2;

          left: 50%;
          top: 50%;

          border:
            1px solid rgba(255, 255, 255, 0.035);

          border-radius: 50%;
          pointer-events: none;

          transition:
            opacity 0.4s ease,
            border-color 0.4s ease;
        }

        .ep-dialogue-portal__brain-orbit--outer {
          width: 76%;
          height: 39%;

          transform:
            translate(-50%, -50%) rotate(-8deg);

          opacity: 0.72;

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 27%,
              black 73%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 27%,
              black 73%,
              transparent
            );
        }

        .ep-dialogue-portal__brain-orbit--inner {
          width: 58%;
          height: 28%;

          transform:
            translate(-50%, -50%) rotate(17deg);

          opacity: 0.48;

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 31%,
              black 69%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black 31%,
              black 69%,
              transparent
            );
        }

        .ep-dialogue-portal__brain-orbit--vertical {
          width: 28%;
          height: 61%;

          transform:
            translate(-50%, -50%) rotate(-19deg);

          opacity: 0.24;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 32%,
              black 68%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 32%,
              black 68%,
              transparent
            );
        }

        /* ==================================================
           NEW ICON — WHITE WIRE-FRAME BRAIN

           Only the icon's appearance and dimensions change.
           The surrounding button and atmosphere remain.
        ================================================== */

        .ep-dialogue-portal__organ--wire {
          position: relative;
          z-index: 5;

          width: 84%;
          height: 76%;

          display: grid;
          place-items: center;

          transform-style: preserve-3d;

          filter:
            drop-shadow(
              0 27px 40px rgba(0, 0, 0, 0.76)
            )
            drop-shadow(
              0 0 13px rgba(255, 255, 255, 0.065)
            );

          animation:
            ep-brain-breathe 10.8s
            cubic-bezier(0.45, 0, 0.55, 1)
            infinite;

          transition:
            filter 0.55s ease,
            transform 0.55s ease,
            opacity 0.55s ease;
        }

        /* The SVG belongs to the child component, so :global
           is used to reach its class from this scoped style. */

        .ep-dialogue-portal__organ--wire
        :global(.ep-dialogue-portal__wire-brain) {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          opacity: 0.94;
        }

        /* ==================================================
           FLOOR SHADOW — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__brain-floor {
          position: absolute;
          z-index: 3;

          bottom: 16%;
          left: 50%;
          width: 49%;
          height: 7%;

          transform: translateX(-50%);
          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(255, 255, 255, 0.047),
              rgba(255, 255, 255, 0.008) 38%,
              rgba(0, 0, 0, 0.24) 59%,
              transparent 76%
            );

          filter: blur(9px);
          opacity: 0.58;

          animation:
            ep-floor-breathe 10.8s ease-in-out infinite;
        }

        /* ==================================================
           TAP HINT — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__tap-hint {
          position: absolute;
          z-index: 10;

          bottom: 1.5%;
          left: 50%;
          max-width: 100%;

          transform: translateX(-50%);

          color: rgba(255, 255, 255, 0.26);
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
           FOOTER — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__footer {
          position: relative;
          z-index: 8;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(9px, 1.4vw, 16px);
          padding-top: 18px;

          border-top:
            1px solid rgba(255, 255, 255, 0.035);

          color: rgba(255, 255, 255, 0.2);
          text-align: center;

          transition: opacity 0.4s ease;
        }

        .ep-dialogue-portal__footer > span {
          font-size: 5px;
          font-weight: 610;
          letter-spacing: 0.15em;
        }

        .ep-dialogue-portal__footer > i {
          width: 3px;
          height: 3px;
          flex: 0 0 auto;
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.14);
        }

        /* ==================================================
           FULL-SCREEN TRANSITION — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__transition {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;

          display: grid;
          place-items: center;

          background: transparent;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition:
            opacity 0.14s ease,
            visibility 0s linear 1.3s;
        }

        .ep-dialogue-portal__space {
          position: absolute;
          inset: -4%;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(17, 18, 20, 0.99) 0%,
              rgba(5, 5, 6, 0.995) 35%,
              rgba(1, 1, 2, 1) 62%,
              #000 100%
            );

          opacity: 0;
          transform: scale(1.08);

          transition:
            opacity 0.42s ease,
            transform 1.15s
            cubic-bezier(0.16, 0.78, 0.18, 1);
        }

        .ep-dialogue-portal__transition-stars {
          position: absolute;
          inset: -18%;
          z-index: 1;
          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.52) 0 0.55px,
              transparent 0.9px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.24) 0 0.45px,
              transparent 0.8px
            );

          background-size: 91px 91px, 137px 137px;
          background-position: 13px 7px, 48px 33px;

          transform: scale(1);
          filter: blur(0);

          -webkit-mask-image:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 15%,
              black 43%,
              black 100%
            );

          mask-image:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 15%,
              black 43%,
              black 100%
            );
        }

        .ep-dialogue-portal__collapse-vignette {
          position: absolute;
          inset: 0;
          z-index: 7;
          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 28%,
              rgba(0, 0, 0, 0.16) 50%,
              rgba(0, 0, 0, 0.88) 100%
            );

          pointer-events: none;
        }

        /* ==================================================
           GRAVITATIONAL LENSING — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__lensing-field {
          position: absolute;
          z-index: 2;

          left: 50%;
          top: 50%;

          width: min(82vw, 790px);
          aspect-ratio: 1;

          transform:
            translate(-50%, -50%) scale(0.34);

          opacity: 0;
          pointer-events: none;
        }

        .ep-dialogue-portal__lensing-field::before {
          content: "";
          position: absolute;
          inset: 7%;
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 0%,
              transparent 43%,
              rgba(255, 255, 255, 0.018) 46%,
              transparent 50%,
              rgba(255, 255, 255, 0.012) 56%,
              transparent 62%
            );

          filter: blur(2px);
        }

        .ep-dialogue-portal__lens-arc {
          position: absolute;
          left: 50%;
          top: 50%;

          border-radius: 50%;
          border: 1px solid transparent;
          pointer-events: none;
        }

        .ep-dialogue-portal__lens-arc--1 {
          width: 82%;
          height: 82%;

          border-top-color:
            rgba(247, 249, 250, 0.09);

          border-right-color:
            rgba(247, 249, 250, 0.025);

          transform:
            translate(-50%, -50%) rotate(-19deg);

          filter: blur(0.5px);
        }

        .ep-dialogue-portal__lens-arc--2 {
          width: 69%;
          height: 69%;

          border-bottom-color:
            rgba(247, 249, 250, 0.075);

          border-left-color:
            rgba(247, 249, 250, 0.022);

          transform:
            translate(-50%, -50%) rotate(27deg);
        }

        .ep-dialogue-portal__lens-arc--3 {
          width: 96%;
          height: 42%;

          border-top-color:
            rgba(255, 255, 255, 0.055);

          transform:
            translate(-50%, -50%) rotate(-11deg);

          filter: blur(1px);
        }

        .ep-dialogue-portal__lens-arc--4 {
          width: 57%;
          height: 91%;

          border-right-color:
            rgba(255, 255, 255, 0.035);

          transform:
            translate(-50%, -50%) rotate(17deg);

          filter: blur(1px);
        }

        /* ==================================================
           BLACK HOLE — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__black-hole {
          position: relative;
          z-index: 4;

          width: min(61vw, 610px);
          aspect-ratio: 1;

          display: grid;
          place-items: center;

          opacity: 0;
          transform: scale(0.08);
          filter: blur(7px);

          transition:
            opacity 0.24s ease,
            transform 1.12s
            cubic-bezier(0.12, 0.72, 0.16, 1),
            filter 0.5s ease;
        }

        .ep-dialogue-portal__black-hole::before {
          content: "";
          position: absolute;
          z-index: 1;

          width: 112%;
          height: 36%;
          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              transparent 0%,
              transparent 31%,
              rgba(255, 255, 255, 0.018) 39%,
              rgba(245, 248, 249, 0.09) 47%,
              rgba(255, 255, 255, 0.23) 50%,
              rgba(226, 232, 235, 0.075) 54%,
              rgba(255, 255, 255, 0.014) 61%,
              transparent 72%
            );

          transform: rotate(-12deg);
          filter: blur(0.7px);

          animation:
            ep-accretion-drift 5.8s ease-in-out infinite;
        }

        .ep-dialogue-portal__black-hole::after {
          content: "";
          position: absolute;
          z-index: 0;

          width: 71%;
          height: 71%;
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.025) 0%,
              transparent 37%,
              rgba(255, 255, 255, 0.022) 52%,
              transparent 70%
            );

          filter: blur(13px);
          opacity: 0.72;
        }

        /* ==================================================
           DISK GLOW — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__disk-glow {
          position: absolute;
          z-index: 2;

          width: 107%;
          height: 23%;
          border-radius: 50%;
          transform: rotate(-12deg);

          background:
            linear-gradient(
              90deg,
              transparent 2%,
              rgba(255, 255, 255, 0.015) 16%,
              rgba(255, 255, 255, 0.12) 42%,
              rgba(255, 255, 255, 0.32) 50%,
              rgba(255, 255, 255, 0.105) 59%,
              rgba(255, 255, 255, 0.012) 84%,
              transparent 98%
            );

          filter: blur(7px);
          opacity: 0.55;

          animation:
            ep-disk-breathe 3.6s ease-in-out infinite;
        }

        /* ==================================================
           ACCRETION STRUCTURE — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__accretion {
          position: absolute;
          z-index: 3;

          border-radius: 50%;
          border-style: solid;

          transform:
            rotateX(70deg) rotateZ(-12deg);
        }

        .ep-dialogue-portal__accretion--far {
          width: 108%;
          height: 108%;
          border-width: 1px;

          border-color:
            transparent
            rgba(255, 255, 255, 0.055)
            transparent
            rgba(255, 255, 255, 0.018);

          filter: blur(2.2px);

          animation:
            ep-ring-rotate 11s linear infinite;
        }

        .ep-dialogue-portal__accretion--outer {
          width: 91%;
          height: 91%;
          border-width: 1px;

          border-color:
            rgba(239, 243, 245, 0.035)
            rgba(239, 243, 245, 0.18)
            rgba(239, 243, 245, 0.02)
            rgba(239, 243, 245, 0.075);

          filter: blur(1.25px);

          animation:
            ep-ring-rotate 8.3s linear infinite reverse;
        }

        .ep-dialogue-portal__accretion--middle {
          width: 72%;
          height: 72%;
          border-width: 1px;

          border-color:
            rgba(247, 249, 250, 0.055)
            rgba(247, 249, 250, 0.34)
            rgba(247, 249, 250, 0.03)
            rgba(247, 249, 250, 0.14);

          box-shadow:
            0 0 24px rgba(255, 255, 255, 0.025);

          animation:
            ep-ring-rotate 6.1s linear infinite;
        }

        .ep-dialogue-portal__accretion--inner {
          width: 54%;
          height: 54%;
          border-width: 1px;

          border-color:
            rgba(255, 255, 255, 0.08)
            rgba(255, 255, 255, 0.54)
            rgba(255, 255, 255, 0.04)
            rgba(255, 255, 255, 0.19);

          box-shadow:
            0 0 17px rgba(255, 255, 255, 0.04);

          animation:
            ep-ring-rotate 4.2s linear infinite reverse;
        }

        /* ==================================================
           PHOTON CROWN — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__photon-crown {
          position: absolute;
          z-index: 5;

          width: 43%;
          height: 43%;
          border-radius: 50%;

          background:
            conic-gradient(
              from 215deg,
              transparent 0deg,
              rgba(255, 255, 255, 0.03) 55deg,
              rgba(255, 255, 255, 0.28) 91deg,
              rgba(255, 255, 255, 0.04) 123deg,
              transparent 168deg,
              transparent 250deg,
              rgba(255, 255, 255, 0.12) 310deg,
              transparent 360deg
            );

          -webkit-mask-image:
            radial-gradient(
              circle,
              transparent 0%,
              transparent 79%,
              black 82%,
              black 88%,
              transparent 92%
            );

          mask-image:
            radial-gradient(
              circle,
              transparent 0%,
              transparent 79%,
              black 82%,
              black 88%,
              transparent 92%
            );

          filter: blur(1.3px);
          opacity: 0.7;

          animation:
            ep-crown-rotate 7.5s linear infinite;
        }

        /* ==================================================
           PHOTON RING — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__photon-ring {
          position: absolute;
          z-index: 6;

          width: 38%;
          height: 38%;

          border:
            1px solid rgba(250, 252, 252, 0.62);

          border-radius: 50%;

          box-shadow:
            0 0 6px rgba(255, 255, 255, 0.18),
            0 0 20px rgba(241, 246, 247, 0.07),
            inset 0 0 8px rgba(255, 255, 255, 0.035);

          animation:
            ep-photon-breathe 2.9s ease-in-out infinite;
        }

        /* ==================================================
           EVENT HORIZON — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__event-horizon {
          position: absolute;
          z-index: 7;

          width: 35.5%;
          height: 35.5%;
          border-radius: 50%;

          background:
            radial-gradient(
              circle at 45% 40%,
              rgba(4, 4, 5, 1) 0%,
              rgba(0, 0, 0, 1) 57%,
              #000 100%
            );

          box-shadow:
            inset -12px -13px 30px rgba(0, 0, 0, 0.92),
            inset 5px 5px 18px rgba(255, 255, 255, 0.004),
            0 0 0 1px rgba(255, 255, 255, 0.018),
            0 0 48px rgba(0, 0, 0, 0.95);

          animation:
            ep-horizon-breathe 4.6s ease-in-out infinite;
        }

        .ep-dialogue-portal__singularity {
          position: absolute;
          z-index: 8;

          width: 2px;
          height: 2px;
          border-radius: 50%;

          background: #000;
        }

        /* ==================================================
           FINAL BLACK WAVE — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__black-wave {
          position: absolute;
          z-index: 6;

          left: 50%;
          top: 50%;

          width: 14vmax;
          height: 14vmax;
          border-radius: 50%;

          transform:
            translate(-50%, -50%) scale(0.1);

          background: #000;
          opacity: 0;
          pointer-events: none;
        }

        /* ==================================================
           TRANSITION COPY — ORIGINAL
        ================================================== */

        .ep-dialogue-portal__transition-copy {
          position: absolute;
          z-index: 9;

          bottom: clamp(44px, 8vh, 90px);
          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          transform: translate(-50%, 9px);
          opacity: 0;
          text-align: center;

          transition:
            opacity 0.32s ease 0.44s,
            transform 0.5s ease 0.44s;
        }

        .ep-dialogue-portal__transition-copy > span {
          color: rgba(246, 248, 249, 0.58);
          font-size: 7px;
          font-weight: 620;
          letter-spacing: 0.25em;
        }

        .ep-dialogue-portal__transition-copy > small {
          color: rgba(221, 227, 230, 0.2);
          font-size: 6px;
          letter-spacing: 0.08em;
        }

        /* ==================================================
           ENTERING STATE — ORIGINAL
        ================================================== */

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__statement {
          opacity: 0;
          transform: translateY(-8px) scale(0.985);
          filter: blur(2px);
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__organ--wire {
          animation: none;
          transform: scale(0.31);
          opacity: 0;
          filter: brightness(0.22) blur(2px);
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__gravity-field {
          opacity: 0;

          transform:
            translate(-50%, -50%) scale(0.36);

          transition:
            opacity 0.24s ease,
            transform 0.5s cubic-bezier(0.4, 0, 1, 1);
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-aura,
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-orbit,
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__brain-floor,
        .ep-dialogue-portal--entering
        .ep-dialogue-portal__tap-hint {
          opacity: 0;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__footer {
          opacity: 0;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__card {
          opacity: 0;
          transform: scale(0.982);
          filter: brightness(0.42) blur(9px);
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition {
          visibility: visible;
          opacity: 1;

          transition:
            opacity 0.12s ease;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__space {
          opacity: 1;
          transform: scale(1);

          animation:
            ep-space-collapse 1.25s
            cubic-bezier(0.16, 0.78, 0.18, 1)
            forwards;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-stars {
          animation:
            ep-stars-collapse 1.18s
            cubic-bezier(0.18, 0.7, 0.18, 1)
            forwards;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__collapse-vignette {
          animation:
            ep-vignette-collapse 1.15s ease-out forwards;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__lensing-field {
          animation:
            ep-lensing-arrive 1.05s
            cubic-bezier(0.12, 0.72, 0.16, 1)
            forwards;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__black-hole {
          opacity: 1;
          transform: scale(1.2);
          filter: blur(0);
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__black-wave {
          animation:
            ep-black-wave 1.25s
            cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-copy {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* ==================================================
           BRAIN AND ATMOSPHERE ANIMATIONS — ORIGINAL
        ================================================== */

        @keyframes ep-brain-breathe {
          0%,
          100% {
            transform:
              translateY(1px) scale(0.975);

            filter:
              drop-shadow(
                0 23px 36px rgba(0, 0, 0, 0.72)
              )
              drop-shadow(
                0 0 12px rgba(255, 255, 255, 0.045)
              )
              brightness(0.94);
          }

          50% {
            transform:
              translateY(-2px) scale(1.028);

            filter:
              drop-shadow(
                0 29px 44px rgba(0, 0, 0, 0.8)
              )
              drop-shadow(
                0 0 17px rgba(255, 255, 255, 0.085)
              )
              brightness(1.055);
          }
        }

        @keyframes ep-gravity-breathe {
          0%,
          100% {
            opacity: 0.43;

            transform:
              translate(-50%, -50%) scale(0.93);
          }

          50% {
            opacity: 0.76;

            transform:
              translate(-50%, -50%) scale(1.055);
          }
        }

        @keyframes ep-aura-breathe {
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

        @keyframes ep-floor-breathe {
          0%,
          100% {
            opacity: 0.25;

            transform:
              translateX(-50%) scaleX(0.84);
          }

          50% {
            opacity: 0.58;

            transform:
              translateX(-50%) scaleX(1.07);
          }
        }

        @keyframes ep-live-breathe {
          0%,
          100% {
            opacity: 0.34;
            transform: scale(0.76);
          }

          50% {
            opacity: 0.94;
            transform: scale(1.08);
          }
        }

        /* ==================================================
           BLACK-HOLE ANIMATIONS — ORIGINAL
        ================================================== */

        @keyframes ep-ring-rotate {
          from {
            transform:
              rotateX(70deg) rotateZ(-12deg);
          }

          to {
            transform:
              rotateX(70deg) rotateZ(348deg);
          }
        }

        @keyframes ep-accretion-drift {
          0%,
          100% {
            transform:
              rotate(-12deg) scaleX(0.98);
          }

          50% {
            transform:
              rotate(-10.5deg) scaleX(1.025);
          }
        }

        @keyframes ep-disk-breathe {
          0%,
          100% {
            opacity: 0.38;

            transform:
              rotate(-12deg) scaleX(0.94);
          }

          50% {
            opacity: 0.68;

            transform:
              rotate(-12deg) scaleX(1.04);
          }
        }

        @keyframes ep-crown-rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ep-photon-breathe {
          0%,
          100% {
            opacity: 0.54;
            transform: scale(0.985);
          }

          50% {
            opacity: 0.94;
            transform: scale(1.025);
          }
        }

        @keyframes ep-horizon-breathe {
          0%,
          100% {
            transform: scale(0.995);
          }

          50% {
            transform: scale(1.012);
          }
        }

        /* ==================================================
           TRANSITION CHOREOGRAPHY — ORIGINAL
        ================================================== */

        @keyframes ep-space-collapse {
          0% {
            filter: brightness(1);
            transform: scale(1.08);
          }

          48% {
            filter: brightness(0.78);
            transform: scale(1.02);
          }

          100% {
            filter: brightness(0.38);
            transform: scale(0.96);
          }
        }

        @keyframes ep-stars-collapse {
          0% {
            opacity: 0;
            transform: scale(1);
            filter: blur(0);
          }

          18% {
            opacity: 0.48;
          }

          62% {
            opacity: 0.32;
            transform: scale(0.78);
            filter: blur(0.4px);
          }

          100% {
            opacity: 0;
            transform: scale(0.5);
            filter: blur(2px);
          }
        }

        @keyframes ep-vignette-collapse {
          0% {
            opacity: 0;
          }

          28% {
            opacity: 0.36;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes ep-lensing-arrive {
          0% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.34)
              rotate(-5deg);

            filter: blur(5px);
          }

          28% {
            opacity: 0.18;
          }

          68% {
            opacity: 0.78;

            transform:
              translate(-50%, -50%)
              scale(0.96)
              rotate(0deg);

            filter: blur(0.5px);
          }

          100% {
            opacity: 0.48;

            transform:
              translate(-50%, -50%)
              scale(1.08)
              rotate(2deg);

            filter: blur(1px);
          }
        }

        @keyframes ep-black-wave {
          0%,
          70% {
            opacity: 0;

            transform:
              translate(-50%, -50%) scale(0.1);
          }

          76% {
            opacity: 0.1;
          }

          100% {
            opacity: 0.96;

            transform:
              translate(-50%, -50%) scale(18);
          }
        }

        /* ==================================================
           HOVER — ORIGINAL BEHAVIOR
        ================================================== */

        @media (hover: hover) and (pointer: fine) {
          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain {
            transform:
              scale(1.018) translateY(-2px);
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__organ--wire {
            filter:
              drop-shadow(
                0 31px 48px rgba(0, 0, 0, 0.82)
              )
              drop-shadow(
                0 0 19px rgba(255, 255, 255, 0.12)
              )
              brightness(1.075);
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__gravity-field {
            opacity: 0.88;
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__tap-hint {
            color: rgba(255, 255, 255, 0.52);

            transform:
              translateX(-50%) translateY(-2px);
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain-orbit {
            border-color:
              rgba(255, 255, 255, 0.065);
          }
        }

        /* ==================================================
           MOBILE — ORIGINAL NATURAL HEIGHT AND SCROLLING
        ================================================== */

        @media (max-width: 700px) {
          .ep-dialogue-portal {
            position: relative;
            width: 100%;
            max-width: 100%;
            min-width: 0;
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
          }

          .ep-dialogue-portal__card {
            position: relative;
            isolation: isolate;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            height: auto;
            min-height: 0;
            max-height: none;
            margin: 0;

            display: grid;

            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto;

            padding: 20px 18px 17px;
            overflow: hidden;

            border: 0;
            border-radius: 0;
            outline: 0;
            background: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
            box-shadow: none;
          }

          .ep-dialogue-portal__card::before,
          .ep-dialogue-portal__card::after {
            content: none;
            display: none;
            border: 0;
            background: none;
            box-shadow: none;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
          }

          .ep-dialogue-portal__ambient {
            border-radius: 0;
          }

          .ep-dialogue-portal__reflection {
            opacity: 0.55;
          }

          .ep-dialogue-portal__top {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            grid-template-columns:
              minmax(0, 1fr)
              auto
              minmax(0, 1fr);

            align-items: start;
          }

          .ep-dialogue-portal__identity > span {
            font-size: 7px;
            letter-spacing: 0.2em;
          }

          .ep-dialogue-portal__identity > small {
            margin-top: -1px;
            font-size: 4.5px;
            letter-spacing: 0.1em;
          }

          .ep-dialogue-portal__live {
            gap: 5px;
            font-size: 5px;
          }

          .ep-dialogue-portal__live i {
            width: 4px;
            height: 4px;
          }

          .ep-dialogue-portal__experience {
            position: relative;

            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            padding: 24px 0 14px;

            overflow-x: hidden;
            overflow-y: auto;

            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y;

            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .ep-dialogue-portal__experience::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }

          .ep-dialogue-portal__statement {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            flex: 0 0 auto;
            gap: 9px;
          }

          .ep-dialogue-portal__eyebrow {
            font-size: 5px;
            letter-spacing: 0.18em;
          }

          .ep-dialogue-portal__statement h2 {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 0 4px;

            font-size: clamp(32px, 9.4vw, 46px);
            line-height: 1;
            letter-spacing: -0.052em;
            text-align: center;

            overflow-wrap: normal;
            word-break: normal;
          }

          .ep-dialogue-portal__brain-button {
            width: min(100%, 350px);
            max-width: 100%;
            min-width: 0;
            flex: 0 0 auto;
            margin: 8px auto 0;
          }

          .ep-dialogue-portal__brain {
            width: min(100%, 305px);
            max-width: 100%;
            min-width: 0;
            aspect-ratio: 1.17;
            margin: 0 auto;
          }

          /* ICON-ONLY MOBILE ADJUSTMENT */

          .ep-dialogue-portal__organ--wire {
            width: 92%;
            height: 82%;
          }

          .ep-dialogue-portal__gravity-field {
            width: 82%;
          }

          .ep-dialogue-portal__brain-aura {
            width: 75%;
          }

          .ep-dialogue-portal__brain-orbit--outer {
            width: 70%;
          }

          .ep-dialogue-portal__brain-orbit--inner {
            width: 53%;
          }

          .ep-dialogue-portal__brain-orbit--vertical {
            width: 26%;
            height: 57%;
          }

          .ep-dialogue-portal__tap-hint {
            bottom: 0.5%;
            max-width: calc(100% - 16px);
            overflow: hidden;
            font-size: 5.5px;
            letter-spacing: 0.1em;
            text-overflow: ellipsis;
          }

          .ep-dialogue-portal__footer {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            gap: 8px;
            padding-top: 13px;
            overflow: hidden;
          }

          .ep-dialogue-portal__footer > span {
            min-width: 0;
            font-size: 4.5px;
            letter-spacing: 0.12em;
            white-space: nowrap;
          }

          .ep-dialogue-portal__black-hole {
            width: min(92vw, 520px);
          }

          .ep-dialogue-portal__lensing-field {
            width: min(118vw, 680px);
          }
        }

        /* ==================================================
           SHORT MOBILE — ORIGINAL
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .ep-dialogue-portal__card {
            height: auto;
            min-height: 0;
            max-height: none;

            padding: 16px 17px 13px;

            border: 0;
            border-radius: 0;
            background: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
            box-shadow: none;
          }

          .ep-dialogue-portal__experience {
            padding: 13px 0 8px;
          }

          .ep-dialogue-portal__statement {
            gap: 6px;
          }

          .ep-dialogue-portal__statement h2 {
            font-size: clamp(30px, 8.9vw, 40px);
          }

          .ep-dialogue-portal__brain-button {
            margin-top: 1px;
          }

          .ep-dialogue-portal__brain {
            width: min(100%, 265px);
          }

          .ep-dialogue-portal__footer {
            padding-top: 10px;
          }
        }

        /* ==================================================
           SMALL MOBILE — ORIGINAL
        ================================================== */

        @media (max-width: 430px) {
          .ep-dialogue-portal {
            padding: 0;
          }

          .ep-dialogue-portal__card {
            height: auto;
            min-height: 0;
            max-height: none;

            padding: 18px 15px 15px;

            border: 0;
            border-radius: 0;
            background: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
            box-shadow: none;
          }

          .ep-dialogue-portal__identity > span {
            font-size: 6.5px;
          }

          .ep-dialogue-portal__identity > small {
            font-size: 4px;
          }

          .ep-dialogue-portal__statement h2 {
            font-size: clamp(31px, 9.7vw, 41px);
          }

          .ep-dialogue-portal__brain {
            width: min(100%, 285px);
          }

          .ep-dialogue-portal__tap-hint {
            font-size: 5px;
          }

          .ep-dialogue-portal__footer > span {
            font-size: 4px;
          }

          .ep-dialogue-portal__black-hole {
            width: min(96vw, 460px);
          }
        }

        /* ==================================================
           VERY SMALL MOBILE — ORIGINAL
        ================================================== */

        @media (max-width: 360px) {
          .ep-dialogue-portal__card {
            height: auto;
            min-height: 0;
            max-height: none;

            padding: 16px 13px 14px;

            border: 0;
            border-radius: 0;
            background: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
            box-shadow: none;
          }

          .ep-dialogue-portal__identity > small {
            display: none;
          }

          .ep-dialogue-portal__statement h2 {
            font-size: clamp(29px, 9.4vw, 37px);
          }

          .ep-dialogue-portal__brain {
            width: min(100%, 255px);
          }

          .ep-dialogue-portal__footer > span:last-child {
            display: none;
          }

          .ep-dialogue-portal__footer > i {
            display: none;
          }
        }

        /* ==================================================
           REDUCED MOTION — ORIGINAL
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ep-dialogue-portal__gravity-field,
          .ep-dialogue-portal__brain-aura,
          .ep-dialogue-portal__organ--wire,
          .ep-dialogue-portal__brain-floor,
          .ep-dialogue-portal__live i,
          .ep-dialogue-portal__accretion,
          .ep-dialogue-portal__photon-crown,
          .ep-dialogue-portal__photon-ring,
          .ep-dialogue-portal__event-horizon,
          .ep-dialogue-portal__black-hole::before,
          .ep-dialogue-portal__disk-glow {
            animation: none !important;
          }

          .ep-dialogue-portal__brain,
          .ep-dialogue-portal__organ--wire,
          .ep-dialogue-portal__card,
          .ep-dialogue-portal__black-hole {
            transition-duration: 0.25s !important;
          }

          .ep-dialogue-portal--entering
          .ep-dialogue-portal__transition-stars,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__collapse-vignette,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__lensing-field,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__black-wave,
          .ep-dialogue-portal--entering
          .ep-dialogue-portal__space {
            animation: none !important;
          }

          .ep-dialogue-portal--entering
          .ep-dialogue-portal__space {
            opacity: 1;
          }

          .ep-dialogue-portal--entering
          .ep-dialogue-portal__lensing-field {
            opacity: 0.4;

            transform:
              translate(-50%, -50%) scale(1);
          }
        }

/* ==========================================================
   EPISTEME HOME — FULL-HEIGHT LAYOUT ALIGNMENT

   Match Civilization Space / Valley:
   - header at the top
   - experience distributed through the center
   - footer at the bottom

   HOME retains ownership of the outer glass card.
   No additional glass surface is introduced.
========================================================== */

.ep-dialogue-portal {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  min-height: 100%;
}

.ep-dialogue-portal__card {
  flex: 1 0 auto;
  width: 100%;
  min-height: clamp(560px, 58vw, 700px);

  display: grid;
  grid-template-rows:
    auto
    minmax(0, 1fr)
    auto;
}

.ep-dialogue-portal__experience {
  align-self: stretch;
  justify-content: center;
}

/* ==========================================================
   MOBILE

   The HOME card is tall on mobile. Give Episteme a
   comparable vertical stage instead of allowing its
   content to collapse into a short central block.

   min-height rather than fixed height preserves access
   to all content on smaller screens.
========================================================== */

@media (max-width: 700px) {
  .ep-dialogue-portal {
    min-height: max(690px, calc(100svh - 42px));
  }

  .ep-dialogue-portal__card {
    height: auto;
    min-height: max(690px, calc(100svh - 42px));
    max-height: none;

    grid-template-rows:
      auto
      minmax(0, 1fr)
      auto;

    padding: 25px 18px 23px;
  }

  .ep-dialogue-portal__top {
    align-self: start;
  }

  .ep-dialogue-portal__experience {
    align-self: stretch;
    justify-content: center;

    padding: 35px 0 30px;

    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .ep-dialogue-portal__experience::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .ep-dialogue-portal__footer {
    align-self: end;
    margin-top: 0;
  }
}

/* Keep the same full-height composition on short phones.
   These rules override the existing short-mobile min-height: 0. */

@media (max-width: 700px) and (max-height: 720px) {
  .ep-dialogue-portal__card {
    min-height: max(690px, calc(100svh - 42px));
  }

  .ep-dialogue-portal__experience {
    padding: 25px 0 20px;
  }
}

@media (max-width: 430px) {
  .ep-dialogue-portal__card {
    min-height: max(690px, calc(100svh - 42px));
    padding: 25px 15px 21px;
  }
}

@media (max-width: 360px) {
  .ep-dialogue-portal__card {
    min-height: max(690px, calc(100svh - 42px));
    padding: 23px 13px 19px;
  }
}

      `}</style>
    </section>
  );
}