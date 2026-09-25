"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/* ==========================================================
   EPISTEME DIALOGUE PORTAL

   GEOMETRY CONTRACT
   ----------------------------------------------------------
   Reference entrance geometry:
     690px

   WorkModels may publish:
     --wm-model-height
     --wm-model-scale

   The 690px value is a DESIGN REFERENCE, not a mandatory
   embedded minimum.

   When embedded in WorkModels:
     available height
       → model height
       → proportional internal contraction
       → header / title / brain / tap remain contained

   No internal vertical scrolling is required.

   TRANSITION
   ----------------------------------------------------------
   The cinematic transition is portaled directly to body and
   is therefore independent from WorkModels entrance geometry.

   Transition sequence:
     cognition
       → spacetime distortion
       → black-hole resolution
       → gravitational lensing
       → horizon approach
       → event-horizon crossing
       → Episteme

   ICON
   ----------------------------------------------------------
   Obsidian atmosphere
     → white anatomical wire-frame brain
========================================================== */

const ENTRY_DURATION = 1850;

/* ==========================================================
   WIREFRAME BRAIN
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

        <g strokeWidth="1.55" opacity="0.84">
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

        <g strokeWidth="0.94" opacity="0.76">
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

      <use
        href="#ep-wire-brain-outline"
        stroke="url(#ep-wire-brain-white)"
        strokeWidth="1.55"
        opacity="0.88"
      />

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

        <g strokeWidth="0.72" opacity="0.53">
          <path d="M 535 460 L 583 506" />
          <path d="M 546 480 L 589 528" />
          <path d="M 557 502 L 590 550" />
          <path d="M 548 459 L 577 496" />
          <path d="M 560 467 L 583 513" />
        </g>
      </g>

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

/* ==========================================================
   TRANSITION
========================================================== */

function EpistemeTransition({
  active,
}: {
  active: boolean;
}) {
  return (
    <div
      className={[
        "ep-dialogue-transition-root",
        active
          ? "ep-dialogue-transition-root--active"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!active}
    >
      <div className="ep-dialogue-portal__transition">
        <div className="ep-dialogue-portal__space" />
        <div className="ep-dialogue-portal__deep-space" />

        <div className="ep-dialogue-portal__transition-stars ep-dialogue-portal__transition-stars--far" />
        <div className="ep-dialogue-portal__transition-stars ep-dialogue-portal__transition-stars--near" />

        <div className="ep-dialogue-portal__gravity-well" />

        <div className="ep-dialogue-portal__spacetime-shear">
          <span className="ep-dialogue-portal__shear ep-dialogue-portal__shear--1" />
          <span className="ep-dialogue-portal__shear ep-dialogue-portal__shear--2" />
          <span className="ep-dialogue-portal__shear ep-dialogue-portal__shear--3" />
        </div>

        <div className="ep-dialogue-portal__lensing-field">
          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--1" />
          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--2" />
          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--3" />
          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--4" />
          <span className="ep-dialogue-portal__lens-arc ep-dialogue-portal__lens-arc--5" />
        </div>

        <div className="ep-dialogue-portal__black-hole">
          <span className="ep-dialogue-portal__disk-glow ep-dialogue-portal__disk-glow--wide" />
          <span className="ep-dialogue-portal__disk-glow ep-dialogue-portal__disk-glow--core" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--far" />
          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--outer" />
          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--middle" />
          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--inner" />

          <span className="ep-dialogue-portal__photon-crown" />
          <span className="ep-dialogue-portal__photon-ring" />
          <span className="ep-dialogue-portal__event-horizon" />
          <span className="ep-dialogue-portal__singularity" />
        </div>

        <div className="ep-dialogue-portal__collapse-vignette" />
        <div className="ep-dialogue-portal__black-wave" />

        <div className="ep-dialogue-portal__transition-copy">
          <span>EPISTEME</span>
          <small>Entering cognition</small>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   PORTAL
========================================================== */

export default function EpistemeDialoguePortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<number | null>(null);

  const [entering, setEntering] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  const enterEpisteme = useCallback(() => {
    if (entering) {
      return;
    }

    setEntering(true);

    transitionTimerRef.current =
      window.setTimeout(() => {
        router.push("/episteme-dialogue");
      }, ENTRY_DURATION);
  }, [entering, router]);

  useEffect(() => {
    setMounted(true);

    return () => {
      if (
        transitionTimerRef.current !== null
      ) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);

  return (
    <>
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

          <header className="ep-dialogue-portal__top">
            <div className="ep-dialogue-portal__identity">
              <span>EPISTEME</span>

              <small>
                ArcheNova&apos;s conversational intelligence space
              </small>
            </div>
          </header>

          <div className="ep-dialogue-portal__experience">
            <div className="ep-dialogue-portal__statement">
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
                <span className="ep-dialogue-portal__gravity-field" />
                <span className="ep-dialogue-portal__brain-aura" />

                <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--outer" />
                <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--inner" />
                <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--vertical" />

                <span className="ep-dialogue-portal__organ ep-dialogue-portal__organ--wire">
                  <WireframeBrain />
                </span>

                <span className="ep-dialogue-portal__brain-floor" />
              </span>

              <span className="ep-dialogue-portal__tap-hint">
                Tap Episteme to enter
              </span>
            </button>
          </div>
        </div>
      </section>

      {mounted &&
        createPortal(
          <EpistemeTransition active={entering} />,
          document.body,
        )}

      <style jsx global>{`
        .ep-dialogue-portal,
        .ep-dialogue-portal *,
        .ep-dialogue-portal *::before,
        .ep-dialogue-portal *::after,
        .ep-dialogue-transition-root,
        .ep-dialogue-transition-root *,
        .ep-dialogue-transition-root *::before,
        .ep-dialogue-transition-root *::after {
          box-sizing: border-box;
        }

        /* ==================================================
           ROOT
        ================================================== */

        .ep-dialogue-portal {
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
        }

        .ep-dialogue-portal button {
          font: inherit;
        }

        /* ==================================================
           ENTRANCE CANVAS
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;
          isolation: isolate;

          flex: 1 1 auto;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          min-height:
            clamp(
              560px,
              58vw,
              700px
            );

          display: grid;

          grid-template-rows:
            auto
            minmax(0, 1fr);

          overflow: hidden;

          padding:
            clamp(
              25px,
              4vw,
              50px
            );

          border: 0;
          border-radius: 0;
          outline: 0;

          background: transparent;

          -webkit-backdrop-filter: none;
          backdrop-filter: none;

          box-shadow: none;

          color:
            rgba(
              248,
              249,
              250,
              0.94
            );

          transition:
            opacity 0.55s ease,
            transform 0.8s
              cubic-bezier(
                0.16,
                0.78,
                0.22,
                1
              ),
            filter 0.65s ease;
        }

        .ep-dialogue-portal__card::before,
        .ep-dialogue-portal__card::after {
          content: none;
          display: none;
        }

        .ep-dialogue-portal__ambient {
          position: absolute;
          inset: 0;

          z-index: -6;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 51%,
              rgba(255,255,255,0.026),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 16% 24%,
              rgba(255,255,255,0.012),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 84% 75%,
              rgba(255,255,255,0.01),
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
              rgba(255,255,255,0.36)
                0 0.45px,
              transparent 0.75px
            ),
            radial-gradient(
              circle,
              rgba(255,255,255,0.16)
                0 0.35px,
              transparent 0.65px
            );

          background-size:
            67px 67px,
            109px 109px;

          background-position:
            0 0,
            31px 21px;

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
              rgba(255,255,255,0.014),
              transparent
            );

          filter: blur(28px);
        }

        /* ==================================================
           HEADER
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
          align-self: start;
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

        .ep-dialogue-portal__identity > small {
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

        .ep-dialogue-portal__experience {
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
            clamp(
              28px,
              4vw,
              46px
            )
            0
            clamp(
              20px,
              3vw,
              32px
            );

          overflow: hidden;
        }

        .ep-dialogue-portal__statement {
          position: relative;

          z-index: 5;

          flex: 0 0 auto;

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

        .ep-dialogue-portal__statement h2 {
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
           BRAIN BUTTON
        ================================================== */

        .ep-dialogue-portal__brain-button {
          position: relative;

          z-index: 6;

          flex: 0 1 auto;

          width:
            min(
              100%,
              520px
            );

          max-width: 100%;
          min-width: 0;
          min-height: 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          margin:
            clamp(
              13px,
              1.8vw,
              22px
            )
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

        .ep-dialogue-portal__brain-button:disabled {
          cursor: default;
        }

        .ep-dialogue-portal__brain-button:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.18
            );

          outline-offset: 8px;

          border-radius: 18px;
        }

        .ep-dialogue-portal__brain {
          position: relative;

          flex: 0 1 auto;

          width:
            min(
              100%,
              450px
            );

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

        .ep-dialogue-portal__gravity-field {
          position: absolute;

          z-index: 0;

          width: 86%;
          height: 65%;

          left: 50%;
          top: 48%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.032
              )
              0%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              27%,
              rgba(
                0,
                0,
                0,
                0.11
              )
              49%,
              transparent
              72%
            );

          filter: blur(13px);

          opacity: 0.72;

          pointer-events: none;

          animation:
            ep-gravity-breathe
            11.5s
            ease-in-out
            infinite;
        }

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
              rgba(
                255,
                255,
                255,
                0.032
              )
              34%,
              rgba(
                255,
                255,
                255,
                0.009
              )
              52%,
              transparent 72%
            );

          filter: blur(11px);

          pointer-events: none;

          animation:
            ep-aura-breathe
            10.8s
            ease-in-out
            infinite;
        }

        .ep-dialogue-portal__brain-orbit {
          position: absolute;

          z-index: 2;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

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
            translate(
              -50%,
              -50%
            )
            rotate(-8deg);

          opacity: 0.72;
        }

        .ep-dialogue-portal__brain-orbit--inner {
          width: 58%;
          height: 28%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(17deg);

          opacity: 0.48;
        }

        .ep-dialogue-portal__brain-orbit--vertical {
          width: 28%;
          height: 61%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-19deg);

          opacity: 0.24;
        }

        .ep-dialogue-portal__organ--wire {
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
              0
              27px
              40px
              rgba(
                0,
                0,
                0,
                0.76
              )
            )
            drop-shadow(
              0
              0
              13px
              rgba(
                255,
                255,
                255,
                0.065
              )
            );

          animation:
            ep-brain-breathe
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

        .ep-dialogue-portal__organ--wire
        .ep-dialogue-portal__wire-brain {
          display: block;

          width: 100%;
          height: 100%;

          overflow: visible;

          opacity: 0.94;
        }

        .ep-dialogue-portal__brain-floor {
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
            ep-floor-breathe
            10.8s
            ease-in-out
            infinite;
        }

        /* ==================================================
           TAP
        ================================================== */

        .ep-dialogue-portal__tap-hint {
          position: relative;

          z-index: 10;

          display: block;

          flex: 0 0 auto;

          width: 100%;

          margin:
            clamp(
              4px,
              0.7vw,
              8px
            )
            auto
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.29
            );

          font-size: 7px;
          font-weight: 500;

          line-height: 1.2;

          letter-spacing: 0.12em;

          text-align: center;

          white-space: nowrap;

          overflow: hidden;

          text-overflow:
            ellipsis;

          transition:
            color 0.4s ease,
            transform 0.4s ease,
            opacity 0.35s ease;
        }

        /* ==================================================
           WORK MODELS COORDINATE CONTRACT
        ================================================== */

        #work-models .ep-dialogue-portal {
          flex: 1 1 auto;

          width: 100%;

          height:
            var(
              --wm-model-height,
              100%
            );

          min-height: 0;

          max-height:
            var(
              --wm-model-height,
              100%
            );

          overflow: hidden;
        }

        #work-models
        .ep-dialogue-portal__card {
          flex: 1 1 auto;

          width: 100%;

          height:
            var(
              --wm-model-height,
              100%
            );

          min-height: 0;

          max-height:
            var(
              --wm-model-height,
              100%
            );

          overflow: hidden;
        }

        /* ==================================================
           BODY-OWNED FULL SCREEN TRANSITION
        ================================================== */

        .ep-dialogue-transition-root {
          position: fixed;

          inset: 0;

          z-index: 2147483000;

          width: 100vw;
          width: 100dvw;

          height: 100vh;
          height: 100dvh;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: #000;

          opacity: 0;
          visibility: hidden;

          pointer-events: none;

          isolation: isolate;

          transform: translateZ(0);

          transition:
            opacity 0.1s ease,
            visibility
              0s
              linear
              ${ENTRY_DURATION}ms;
        }

        .ep-dialogue-transition-root--active {
          opacity: 1;
          visibility: visible;

          transition:
            opacity 0.1s ease;
        }

        .ep-dialogue-portal__transition {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;

          display: grid;
          place-items: center;

          background: #000;

          opacity: 1;
          visibility: visible;

          pointer-events: none;

          isolation: isolate;
        }

        /* ==================================================
           SPACE
        ================================================== */

        .ep-dialogue-portal__space {
          position: absolute;

          inset: -12%;

          z-index: 0;

          background:
            radial-gradient(
              ellipse at 50% 50%,
              rgba(21,22,25,1) 0%,
              rgba(7,8,10,1) 27%,
              rgba(1,1,2,1) 59%,
              #000 100%
            );

          opacity: 0;

          transform: scale(1.18);

          will-change:
            transform,
            opacity;
        }

        .ep-dialogue-portal__deep-space {
          position: absolute;

          inset: -30%;

          z-index: 1;

          opacity: 0;

          background:
            radial-gradient(
              ellipse at 50% 50%,
              transparent 0 16%,
              rgba(
                255,
                255,
                255,
                0.014
              )
              23%,
              transparent 31%
            ),
            conic-gradient(
              from 17deg
              at 50% 50%,
              transparent,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent 14%,
              rgba(
                255,
                255,
                255,
                0.022
              )
              26%,
              transparent 39%,
              rgba(
                255,
                255,
                255,
                0.01
              )
              55%,
              transparent 72%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              86%,
              transparent
            );

          filter: blur(24px);

          transform:
            rotate(-8deg)
            scale(1.18);

          will-change:
            transform,
            opacity,
            filter;
        }

        /* ==================================================
           STARS
        ================================================== */

        .ep-dialogue-portal__transition-stars {
          position: absolute;

          inset: -35%;

          pointer-events: none;

          opacity: 0;

          will-change:
            transform,
            opacity,
            filter;
        }

        .ep-dialogue-portal__transition-stars--far {
          z-index: 2;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.5
              )
              0 0.45px,
              transparent 0.85px
            ),
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.24
              )
              0 0.35px,
              transparent 0.75px
            );

          background-size:
            83px 83px,
            137px 137px;

          background-position:
            7px 11px,
            43px 31px;
        }

        .ep-dialogue-portal__transition-stars--near {
          z-index: 3;

          background-image:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.65
              )
              0 0.6px,
              transparent 1.2px
            ),
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                0.28
              )
              0 0.5px,
              transparent 1px
            );

          background-size:
            149px 149px,
            211px 211px;

          background-position:
            19px 7px,
            71px 57px;

          filter: blur(0.15px);
        }

        /* ==================================================
           GRAVITY WELL
        ================================================== */

        .ep-dialogue-portal__gravity-well {
          position: absolute;

          z-index: 4;

          left: 50%;
          top: 50%;

          width: 142vmax;
          height: 142vmax;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.18);

          border-radius: 50%;

          opacity: 0;

          background:
            radial-gradient(
              circle,
              rgba(0,0,0,0)
                0 9%,
              rgba(
                255,
                255,
                255,
                0.018
              )
              14%,
              rgba(
                0,
                0,
                0,
                0.14
              )
              27%,
              rgba(
                0,
                0,
                0,
                0.46
              )
              48%,
              transparent 72%
            );

          filter: blur(22px);

          pointer-events: none;

          will-change:
            transform,
            opacity;
        }

        /* ==================================================
           SPACETIME SHEAR

           A subtle intermediate field between the background
           and the photon/lensing structure.

           It gives the transition a sense of warped geometry
           rather than a simple zoom.
        ================================================== */

        .ep-dialogue-portal__spacetime-shear {
          position: absolute;

          z-index: 4;

          left: 50%;
          top: 50%;

          width: 118vmax;
          height: 118vmax;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.42)
            rotate(-7deg);

          opacity: 0;

          pointer-events: none;

          will-change:
            transform,
            opacity;
        }

        .ep-dialogue-portal__shear {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          transform:
            translate(
              -50%,
              -50%
            );

          filter: blur(0.35px);

          pointer-events: none;
        }

        .ep-dialogue-portal__shear--1 {
          width: 92%;
          height: 31%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-8deg);
        }

        .ep-dialogue-portal__shear--2 {
          width: 68%;
          height: 47%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(14deg);

          opacity: 0.7;
        }

        .ep-dialogue-portal__shear--3 {
          width: 43%;
          height: 72%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-21deg);

          opacity: 0.42;
        }

        /* ==================================================
           GRAVITATIONAL LENSING
        ================================================== */

        .ep-dialogue-portal__lensing-field {
          position: absolute;

          z-index: 5;

          left: 50%;
          top: 50%;

          width:
            min(
              116vmax,
              1600px
            );

          aspect-ratio: 1;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.16)
            rotate(-9deg);

          opacity: 0;

          pointer-events: none;

          will-change:
            transform,
            opacity;
        }

        .ep-dialogue-portal__lens-arc {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border:
            1px solid
            transparent;

          pointer-events: none;
        }

        .ep-dialogue-portal__lens-arc--1 {
          width: 94%;
          height: 94%;

          border-top-color:
            rgba(
              255,
              255,
              255,
              0.11
            );

          border-left-color:
            rgba(
              255,
              255,
              255,
              0.018
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-17deg);
        }

        .ep-dialogue-portal__lens-arc--2 {
          width: 81%;
          height: 81%;

          border-right-color:
            rgba(
              255,
              255,
              255,
              0.085
            );

          border-bottom-color:
            rgba(
              255,
              255,
              255,
              0.025
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(31deg);
        }

        .ep-dialogue-portal__lens-arc--3 {
          width: 112%;
          height: 39%;

          border-top-color:
            rgba(
              255,
              255,
              255,
              0.075
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-10deg);
        }

        .ep-dialogue-portal__lens-arc--4 {
          width: 52%;
          height: 103%;

          border-right-color:
            rgba(
              255,
              255,
              255,
              0.052
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(21deg);
        }

        .ep-dialogue-portal__lens-arc--5 {
          width: 125%;
          height: 23%;

          border-bottom-color:
            rgba(
              255,
              255,
              255,
              0.04
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-7deg);
        }

        /* ==================================================
           BLACK HOLE

           The object no longer begins as an almost-zero dot
           and no longer grows to an exaggerated 3.35 scale.

           The black hole resolves in space first.

           The final full-screen black state is produced by
           the horizon-crossing wave instead.
        ================================================== */

        .ep-dialogue-portal__black-hole {
          position: relative;

          z-index: 8;

          width:
            min(
              74vmax,
              1040px
            );

          aspect-ratio: 1;

          display: grid;
          place-items: center;

          opacity: 0;

          transform:
            scale(0.16)
            rotate(-2deg);

          filter: blur(5px);

          will-change:
            transform,
            opacity,
            filter;
        }

        .ep-dialogue-portal__disk-glow,
        .ep-dialogue-portal__accretion,
        .ep-dialogue-portal__photon-crown,
        .ep-dialogue-portal__photon-ring,
        .ep-dialogue-portal__event-horizon,
        .ep-dialogue-portal__singularity {
          position: absolute;
        }

        /* ==================================================
           ACCRETION LIGHT
        ================================================== */

        .ep-dialogue-portal__disk-glow {
          z-index: 2;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(-11deg);

          pointer-events: none;
        }

        .ep-dialogue-portal__disk-glow--wide {
          width: 126%;
          height: 24%;

          background:
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(
                255,
                255,
                255,
                0.012
              )
              10%,
              rgba(
                255,
                255,
                255,
                0.055
              )
              28%,
              rgba(
                255,
                255,
                255,
                0.28
              )
              46%,
              rgba(
                255,
                255,
                255,
                0.7
              )
              50%,
              rgba(
                255,
                255,
                255,
                0.23
              )
              56%,
              rgba(
                255,
                255,
                255,
                0.045
              )
              73%,
              transparent 100%
            );

          filter: blur(13px);

          opacity: 0.72;
        }

        .ep-dialogue-portal__disk-glow--core {
          width: 102%;
          height: 10%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.08
              )
              25%,
              rgba(
                255,
                255,
                255,
                0.92
              )
              49%,
              rgba(
                255,
                255,
                255,
                0.11
              )
              74%,
              transparent
            );

          filter: blur(4px);

          opacity: 0.74;
        }

        /* ==================================================
           ACCRETION STRUCTURE
        ================================================== */

        .ep-dialogue-portal__accretion {
          z-index: 3;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border-style: solid;

          pointer-events: none;

          transform:
            translate(
              -50%,
              -50%
            )
            rotateX(72deg)
            rotateZ(-11deg);
        }

        .ep-dialogue-portal__accretion--far {
          width: 119%;
          height: 119%;

          border-width: 1px;

          border-color:
            transparent
            rgba(
              255,
              255,
              255,
              0.09
            )
            transparent
            rgba(
              255,
              255,
              255,
              0.025
            );
        }

        .ep-dialogue-portal__accretion--outer {
          width: 101%;
          height: 101%;

          border-width: 1px;

          border-color:
            rgba(
              239,
              243,
              245,
              0.04
            )
            rgba(
              239,
              243,
              245,
              0.24
            )
            rgba(
              239,
              243,
              245,
              0.025
            )
            rgba(
              239,
              243,
              245,
              0.09
            );
        }

        .ep-dialogue-portal__accretion--middle {
          width: 80%;
          height: 80%;

          border-width: 1px;

          border-color:
            rgba(
              247,
              249,
              250,
              0.065
            )
            rgba(
              247,
              249,
              250,
              0.42
            )
            rgba(
              247,
              249,
              250,
              0.035
            )
            rgba(
              247,
              249,
              250,
              0.16
            );
        }

        .ep-dialogue-portal__accretion--inner {
          width: 61%;
          height: 61%;

          border-width: 1px;

          border-color:
            rgba(
              255,
              255,
              255,
              0.1
            )
            rgba(
              255,
              255,
              255,
              0.72
            )
            rgba(
              255,
              255,
              255,
              0.05
            )
            rgba(
              255,
              255,
              255,
              0.22
            );
        }

        /* ==================================================
           PHOTON REGION / EVENT HORIZON
        ================================================== */

        .ep-dialogue-portal__photon-crown {
          z-index: 5;

          width: 49%;
          height: 49%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 58%,
              rgba(
                255,
                255,
                255,
                0.025
              )
              66%,
              rgba(
                255,
                255,
                255,
                0.11
              )
              72%,
              transparent 79%
            );

          filter: blur(5px);
        }

        .ep-dialogue-portal__photon-ring {
          z-index: 6;

          width: 43%;
          height: 43%;

          border:
            1px solid
            rgba(
              250,
              252,
              252,
              0.82
            );

          border-radius: 50%;

          box-shadow:
            0 0 8px
              rgba(
                255,
                255,
                255,
                0.16
              ),
            0 0 27px
              rgba(
                255,
                255,
                255,
                0.055
              );
        }

        .ep-dialogue-portal__event-horizon {
          z-index: 7;

          width: 40.5%;
          height: 40.5%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 47% 43%,
              #020202 0%,
              #000 58%,
              #000 100%
            );

          box-shadow:
            inset
            0
            0
            28px
            rgba(
              255,
              255,
              255,
              0.008
            ),
            0
            0
            42px
            rgba(
              0,
              0,
              0,
              0.96
            );
        }

        .ep-dialogue-portal__singularity {
          z-index: 8;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: #000;
        }

        /* ==================================================
           HORIZON CROSSING
        ================================================== */

        .ep-dialogue-portal__collapse-vignette {
          position: absolute;

          inset: 0;

          z-index: 10;

          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 17%,
              rgba(
                0,
                0,
                0,
                0.05
              )
              31%,
              rgba(
                0,
                0,
                0,
                0.36
              )
              61%,
              rgba(
                0,
                0,
                0,
                0.96
              )
              100%
            );

          pointer-events: none;
        }

        .ep-dialogue-portal__black-wave {
          position: absolute;

          z-index: 20;

          left: 50%;
          top: 50%;

          width: 10vmax;
          height: 10vmax;

          border-radius: 50%;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(0.01);

          background: #000;

          opacity: 0;

          pointer-events: none;

          will-change:
            transform,
            opacity;
        }

        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .ep-dialogue-portal__transition-copy {
          position: absolute;

          z-index: 30;

          bottom:
            max(
              28px,
              env(
                safe-area-inset-bottom
              )
            );

          left: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 8px;

          transform:
            translate(
              -50%,
              8px
            );

          opacity: 0;

          text-align: center;

          pointer-events: none;
        }

        .ep-dialogue-portal__transition-copy > span {
          color:
            rgba(
              246,
              248,
              249,
              0.64
            );

          font-size: 7px;
          font-weight: 620;

          letter-spacing: 0.25em;
        }

        .ep-dialogue-portal__transition-copy > small {
          color:
            rgba(
              221,
              227,
              230,
              0.24
            );

          font-size: 6px;

          letter-spacing: 0.08em;
        }

        /* ==================================================
           ENTERING STATE
        ================================================== */

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__statement {
          opacity: 0;

          transform:
            translateY(-8px)
            scale(0.985);

          filter: blur(2px);
        }

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__organ--wire {
          animation: none;

          transform:
            scale(0.24);

          opacity: 0;

          filter:
            brightness(0.16)
            blur(3px);
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
        .ep-dialogue-portal__card {
          opacity: 0;

          transform:
            scale(0.975);

          filter:
            brightness(0.3)
            blur(11px);
        }

        /* ==================================================
           ACTIVE TRANSITION
        ================================================== */

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__space {
          animation:
            ep-space-fall
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.12,
              0.74,
              0.12,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__deep-space {
          animation:
            ep-deep-space-collapse
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.12,
              0.72,
              0.12,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__transition-stars--far {
          animation:
            ep-stars-fall-far
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.12,
              0.72,
              0.12,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__transition-stars--near {
          animation:
            ep-stars-fall-near
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.12,
              0.72,
              0.12,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__gravity-well {
          animation:
            ep-gravity-collapse
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.1,
              0.74,
              0.1,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__spacetime-shear {
          animation:
            ep-spacetime-shear
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.12,
              0.72,
              0.08,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__lensing-field {
          animation:
            ep-lens-collapse
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.1,
              0.72,
              0.1,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__black-hole {
          animation:
            ep-black-hole-entry
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.08,
              0.74,
              0.08,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__accretion--far {
          animation:
            ep-accretion-far
            7s
            linear
            infinite;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__accretion--outer {
          animation:
            ep-accretion-outer
            5.4s
            linear
            infinite;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__accretion--middle {
          animation:
            ep-accretion-middle
            3.8s
            linear
            infinite;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__accretion--inner {
          animation:
            ep-accretion-inner
            2.6s
            linear
            infinite;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__collapse-vignette {
          animation:
            ep-vignette-collapse
            ${ENTRY_DURATION}ms
            ease
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__black-wave {
          animation:
            ep-black-wave
            ${ENTRY_DURATION}ms
            cubic-bezier(
              0.3,
              0,
              0.12,
              1
            )
            both;
        }

        .ep-dialogue-transition-root--active
        .ep-dialogue-portal__transition-copy {
          animation:
            ep-transition-copy
            ${ENTRY_DURATION}ms
            ease
            both;
        }

        /* ==================================================
           IDLE KEYFRAMES
        ================================================== */

        @keyframes ep-brain-breathe {
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

        @keyframes ep-gravity-breathe {
          0%,
          100% {
            opacity: 0.43;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.93);
          }

          50% {
            opacity: 0.76;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.055);
          }
        }

        @keyframes ep-aura-breathe {
          0%,
          100% {
            opacity: 0.26;

            transform:
              scale(0.93);
          }

          50% {
            opacity: 0.66;

            transform:
              scale(1.055);
          }
        }

        @keyframes ep-floor-breathe {
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
           CINEMATIC KEYFRAMES
        ================================================== */

        @keyframes ep-space-fall {
          0% {
            opacity: 0;

            transform:
              scale(1.12);
          }

          13% {
            opacity: 1;
          }

          62% {
            opacity: 1;

            transform:
              scale(1.02);
          }

          82% {
            opacity: 1;

            transform:
              scale(1.08);
          }

          100% {
            opacity: 1;

            transform:
              scale(1.16);
          }
        }

        @keyframes ep-deep-space-collapse {
          0% {
            opacity: 0;

            transform:
              rotate(-8deg)
              scale(1.22);
          }

          18% {
            opacity: 0.42;
          }

          48% {
            opacity: 0.62;

            transform:
              rotate(-2deg)
              scale(1.02);
          }

          72% {
            opacity: 0.48;

            transform:
              rotate(4deg)
              scale(1.08);
          }

          88% {
            opacity: 0.16;

            transform:
              rotate(9deg)
              scale(1.28);
          }

          100% {
            opacity: 0;

            transform:
              rotate(14deg)
              scale(1.52);
          }
        }

        /*
         * The stars now move outward toward the observer
         * instead of shrinking into the center.
         */

        @keyframes ep-stars-fall-far {
          0% {
            opacity: 0;

            transform:
              scale(1.03)
              rotate(0deg);

            filter: blur(0);
          }

          15% {
            opacity: 0.42;
          }

          48% {
            opacity: 0.58;

            transform:
              scale(1.06)
              rotate(0.5deg);

            filter: blur(0);
          }

          72% {
            opacity: 0.42;

            transform:
              scale(1.15)
              rotate(1.5deg);

            filter: blur(0.5px);
          }

          90% {
            opacity: 0.12;

            transform:
              scale(1.42)
              rotate(4deg);

            filter: blur(2px);
          }

          100% {
            opacity: 0;

            transform:
              scale(1.7)
              rotate(7deg);

            filter: blur(5px);
          }
        }

        @keyframes ep-stars-fall-near {
          0% {
            opacity: 0;

            transform:
              scale(1)
              rotate(0deg);

            filter: blur(0);
          }

          17% {
            opacity: 0.32;
          }

          47% {
            opacity: 0.5;

            transform:
              scale(1.12)
              rotate(-0.8deg);

            filter: blur(0);
          }

          70% {
            opacity: 0.36;

            transform:
              scale(1.34)
              rotate(-2deg);

            filter: blur(0.8px);
          }

          89% {
            opacity: 0.08;

            transform:
              scale(1.82)
              rotate(-5deg);

            filter: blur(3px);
          }

          100% {
            opacity: 0;

            transform:
              scale(2.35)
              rotate(-9deg);

            filter: blur(7px);
          }
        }

        @keyframes ep-gravity-collapse {
          0% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.22);
          }

          22% {
            opacity: 0.18;
          }

          48% {
            opacity: 0.46;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.58);
          }

          72% {
            opacity: 0.72;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.96);
          }

          88% {
            opacity: 0.62;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.28);
          }

          100% {
            opacity: 0.18;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.55);
          }
        }

        /*
         * Spacetime shear appears after the black hole begins
         * resolving and disappears before the final crossing.
         */

        @keyframes ep-spacetime-shear {
          0% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.42)
              rotate(-7deg);
          }

          18% {
            opacity: 0.12;
          }

          42% {
            opacity: 0.48;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.68)
              rotate(-3deg);
          }

          67% {
            opacity: 0.72;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.96)
              rotate(2deg);
          }

          84% {
            opacity: 0.28;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.34)
              rotate(8deg);
          }

          100% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.78)
              rotate(15deg);
          }
        }

        @keyframes ep-lens-collapse {
          0% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.2)
              rotate(-14deg);
          }

          18% {
            opacity: 0.08;
          }

          42% {
            opacity: 0.48;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.56)
              rotate(-8deg);
          }

          62% {
            opacity: 0.82;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.88)
              rotate(-2deg);
          }

          78% {
            opacity: 0.62;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.14)
              rotate(4deg);
          }

          90% {
            opacity: 0.2;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.48)
              rotate(9deg);
          }

          100% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.82)
              rotate(14deg);
          }
        }

        /*
         * Black hole resolves rather than exploding from a
         * point.

         * The final scale remains controlled. Full black is
         * delegated to the event-horizon crossing layer.
         */

        @keyframes ep-black-hole-entry {
          0% {
            opacity: 0;

            transform:
              scale(0.16)
              rotate(-2deg);

            filter: blur(5px);
          }

          12% {
            opacity: 0.18;

            transform:
              scale(0.2)
              rotate(-1.7deg);

            filter: blur(3px);
          }

          27% {
            opacity: 0.82;

            transform:
              scale(0.32)
              rotate(-1.2deg);

            filter: blur(0.8px);
          }

          43% {
            opacity: 1;

            transform:
              scale(0.48)
              rotate(-0.6deg);

            filter: blur(0);
          }

          63% {
            opacity: 1;

            transform:
              scale(0.7)
              rotate(0deg);

            filter: blur(0);
          }

          78% {
            opacity: 1;

            transform:
              scale(0.96)
              rotate(0.4deg);

            filter: blur(0);
          }

          89% {
            opacity: 1;

            transform:
              scale(1.32)
              rotate(0.7deg);

            filter: blur(0);
          }

          100% {
            opacity: 1;

            transform:
              scale(1.72)
              rotate(1deg);

            filter: blur(0.5px);
          }
        }

        @keyframes ep-vignette-collapse {
          0%,
          42% {
            opacity: 0;
          }

          64% {
            opacity: 0.2;
          }

          78% {
            opacity: 0.42;
          }

          88% {
            opacity: 0.76;
          }

          96% {
            opacity: 0.96;
          }

          100% {
            opacity: 1;
          }
        }

        /*
         * The black wave represents crossing the event
         * horizon. It remains absent until the final phase.
         */

        @keyframes ep-black-wave {
          0%,
          76% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.01);
          }

          80% {
            opacity: 0.12;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.4);
          }

          88% {
            opacity: 0.72;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(7);
          }

          96% {
            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(24);
          }

          100% {
            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(40);
          }
        }

        /*
         * Copy is deliberately secondary to the physical
         * transition.
         */

        @keyframes ep-transition-copy {
          0%,
          26% {
            opacity: 0;

            transform:
              translate(
                -50%,
                8px
              );
          }

          42% {
            opacity: 0.62;

            transform:
              translate(
                -50%,
                0
              );
          }

          65% {
            opacity: 0.48;

            transform:
              translate(
                -50%,
                0
              );
          }

          76% {
            opacity: 0.18;

            transform:
              translate(
                -50%,
                -2px
              );
          }

          84%,
          100% {
            opacity: 0;

            transform:
              translate(
                -50%,
                -5px
              );
          }
        }

        /* ==================================================
           ACCRETION ROTATION
        ================================================== */

        @keyframes ep-accretion-far {
          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(-11deg);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(349deg);
          }
        }

        @keyframes ep-accretion-outer {
          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(12deg);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(372deg);
          }
        }

        @keyframes ep-accretion-middle {
          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(-28deg);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(332deg);
          }
        }

        @keyframes ep-accretion-inner {
          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(31deg);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(72deg)
              rotateZ(391deg);
          }
        }

        /* ==================================================
           HOVER
        ================================================== */

        @media
          (hover: hover)
          and (pointer: fine) {

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain {
            transform:
              scale(1.018)
              translateY(-2px);
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__organ--wire {
            filter:
              drop-shadow(
                0
                31px
                48px
                rgba(
                  0,
                  0,
                  0,
                  0.82
                )
              )
              drop-shadow(
                0
                0
                19px
                rgba(
                  255,
                  255,
                  255,
                  0.12
                )
              )
              brightness(1.075);
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__gravity-field {
            opacity: 0.88;
          }

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__tap-hint {
            color:
              rgba(
                255,
                255,
                255,
                0.54
              );

            transform:
              translateY(-2px);
          }
        }

        /* ==================================================
           MOBILE

           Standalone fallback keeps the original presentation.

           Inside #work-models the coordinate contract above
           overrides the hard standalone minimum.
        ================================================== */

        @media (max-width: 700px) {
          .ep-dialogue-portal:not(
            #work-models
            .ep-dialogue-portal
          ) {
            min-height:
              max(
                690px,
                calc(
                  100svh - 42px
                )
              );
          }

          .ep-dialogue-portal__card {
            padding:
              clamp(
                12px,
                calc(
                  25px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                25px
              )
              clamp(
                10px,
                calc(
                  18px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                18px
              )
              clamp(
                11px,
                calc(
                  23px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                23px
              );
          }

          #work-models
          .ep-dialogue-portal__card {
            min-height: 0;
          }

          .ep-dialogue-portal__identity {
            gap:
              clamp(
                3px,
                calc(
                  7px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                7px
              );
          }

          .ep-dialogue-portal__identity > span {
            font-size:
              clamp(
                5.5px,
                calc(
                  7px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                7px
              );

            letter-spacing: 0.2em;
          }

          .ep-dialogue-portal__identity > small {
            margin-top: -1px;

            font-size:
              clamp(
                3.5px,
                calc(
                  4.5px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                4.5px
              );

            letter-spacing: 0.1em;
          }

          .ep-dialogue-portal__experience {
            justify-content: center;

            min-height: 0;

            padding:
              clamp(
                7px,
                calc(
                  35px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                35px
              )
              0
              clamp(
                6px,
                calc(
                  30px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                30px
              );

            overflow: hidden;

            touch-action: pan-y;
          }

          .ep-dialogue-portal__statement {
            gap:
              clamp(
                4px,
                calc(
                  9px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                9px
              );
          }

          .ep-dialogue-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            padding:
              0
              clamp(
                2px,
                calc(
                  4px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                4px
              );

            font-size:
              clamp(
                24px,
                calc(
                  46px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                46px
              );

            line-height: 1;

            letter-spacing: -0.052em;
          }

          .ep-dialogue-portal__brain-button {
            width:
              min(
                100%,
                clamp(
                  218px,
                  calc(
                    350px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  350px
                )
              );

            min-height: 0;

            flex:
              0 1 auto;

            margin:
              clamp(
                1px,
                calc(
                  8px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                8px
              )
              auto
              0;
          }

          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                clamp(
                  190px,
                  calc(
                    305px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  305px
                )
              );

            max-height:
              calc(
                var(
                  --wm-model-height,
                  690px
                )
                *
                0.49
              );

            aspect-ratio: 1.17;
          }

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
            width: 100%;

            max-width:
              calc(
                100% - 12px
              );

            margin:
              clamp(
                3px,
                calc(
                  7px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                7px
              )
              auto
              0;

            font-size:
              clamp(
                4.5px,
                calc(
                  5.5px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                5.5px
              );

            line-height: 1.25;

            letter-spacing: 0.1em;
          }

          /*
           * Transition remains viewport-owned.
           * Only the cinematic object dimensions change.
           */

          .ep-dialogue-portal__black-hole {
            width:
              min(
                94vmax,
                900px
              );
          }

          .ep-dialogue-portal__lensing-field {
            width:
              min(
                142vmax,
                1280px
              );
          }

          .ep-dialogue-portal__spacetime-shear {
            width: 148vmax;
            height: 148vmax;
          }

          .ep-dialogue-portal__gravity-well {
            width: 175vmax;
            height: 175vmax;
          }
        }

        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media
          (max-width: 700px)
          and (max-height: 720px) {

          .ep-dialogue-portal__experience {
            padding:
              clamp(
                5px,
                calc(
                  25px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                25px
              )
              0
              clamp(
                5px,
                calc(
                  20px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                20px
              );
          }

          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                23px,
                calc(
                  40px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                40px
              );
          }

          .ep-dialogue-portal__brain-button {
            margin-top: 1px;
          }

          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                clamp(
                  180px,
                  calc(
                    265px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  265px
                )
              );
          }
        }

        @media (max-width: 430px) {
          .ep-dialogue-portal__identity > span {
            font-size:
              clamp(
                5px,
                calc(
                  6.5px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                6.5px
              );
          }

          .ep-dialogue-portal__identity > small {
            font-size:
              clamp(
                3.3px,
                calc(
                  4px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                4px
              );
          }

          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                23px,
                calc(
                  41px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                41px
              );
          }

          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                clamp(
                  184px,
                  calc(
                    285px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  285px
                )
              );
          }

          .ep-dialogue-portal__tap-hint {
            font-size:
              clamp(
                4.3px,
                calc(
                  5px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                5px
              );
          }

          .ep-dialogue-portal__transition-copy {
            bottom:
              max(
                20px,
                env(
                  safe-area-inset-bottom
                )
              );
          }
        }

        @media (max-width: 360px) {
          .ep-dialogue-portal__identity > small {
            display: none;
          }

          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                22px,
                calc(
                  37px *
                  var(
                    --wm-model-scale,
                    1
                  )
                ),
                37px
              );
          }

          .ep-dialogue-portal__brain {
            width:
              min(
                100%,
                clamp(
                  174px,
                  calc(
                    255px *
                    var(
                      --wm-model-scale,
                      1
                    )
                  ),
                  255px
                )
              );
          }
        }

        /* ==================================================
           LANDSCAPE TRANSITION
        ================================================== */

        @media
          (max-height: 520px)
          and (orientation: landscape) {

          .ep-dialogue-portal__black-hole {
            width:
              min(
                104vmax,
                980px
              );
          }

          .ep-dialogue-portal__lensing-field {
            width:
              min(
                150vmax,
                1380px
              );
          }

          .ep-dialogue-portal__spacetime-shear {
            width: 156vmax;
            height: 156vmax;
          }

          .ep-dialogue-portal__transition-copy {
            bottom:
              max(
                14px,
                env(
                  safe-area-inset-bottom
                )
              );
          }
        }

        /* ==================================================
           LARGE VIEWPORT TRANSITION
        ================================================== */

        @media (min-width: 1440px) {
          .ep-dialogue-portal__black-hole {
            width:
              min(
                80vmax,
                1320px
              );
          }

          .ep-dialogue-portal__lensing-field {
            width:
              min(
                118vmax,
                1900px
              );
          }

          .ep-dialogue-portal__spacetime-shear {
            width:
              min(
                124vmax,
                2000px
              );

            height:
              min(
                124vmax,
                2000px
              );
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .ep-dialogue-portal__gravity-field,
          .ep-dialogue-portal__brain-aura,
          .ep-dialogue-portal__organ--wire,
          .ep-dialogue-portal__brain-floor {
            animation:
              none !important;
          }

          .ep-dialogue-portal__brain,
          .ep-dialogue-portal__organ--wire,
          .ep-dialogue-portal__card {
            transition-duration:
              0.25s !important;
          }

          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__space,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__deep-space,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__transition-stars,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__gravity-well,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__spacetime-shear,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__lensing-field,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__black-hole,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__collapse-vignette,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__black-wave,
          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__transition-copy {
            animation-duration:
              0.55s !important;
          }

          .ep-dialogue-transition-root--active
          .ep-dialogue-portal__accretion {
            animation:
              none !important;
          }
        }
      `}</style>
    </>
  );
}