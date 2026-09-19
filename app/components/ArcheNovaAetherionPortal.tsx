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
   ORBITAL MEGAFACTORY / HOME ENTRY

   HOME owns the only visible outer glass card.

   This component owns:
   - internal typography and layout
   - orbital megafactory object
   - six manufacturing docks
   - restrained ambient motion
   - activation and entry transition

   This component does NOT create:
   - an outer card border
   - an outer card background
   - an outer card border-radius
   - an outer card backdrop-filter
   - an outer card shadow

   The six docks represent the production architecture.
   They do not represent live manufacturing activity.
========================================================== */

const DOCKS = [
  { number: "01", name: "ENGINEERING" },
  { number: "02", name: "FABRICATION" },
  { number: "03", name: "TESTING" },
  { number: "04", name: "CORRECTION" },
  { number: "05", name: "REPRODUCTION" },
  { number: "06", name: "RELEASE" },
] as const;

export default function ArcheNovaAetherionPortal() {
  const router = useRouter();

  const transitionTimerRef = useRef<number | null>(
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

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  const enterAetherion = useCallback(() => {
    if (enteringRef.current) {
      return;
    }

    enteringRef.current = true;
    setEntering(true);

    transitionTimerRef.current = window.setTimeout(
      () => {
        router.push("/aetherion");
      },
      reducedMotion ? 160 : 1550,
    );
  }, [reducedMotion, router]);

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

          {/* ==================================================
              INTERACTIVE ORBITAL MEGAFACTORY
          ================================================== */}

          <button
            type="button"
            className="ae-portal__factory-button"
            onClick={enterAetherion}
            disabled={entering}
            aria-label="Enter Aetherion, the ArcheNova engineering and physical realization environment"
          >
            <span className="ae-portal__factory">
              {/* GRAVITATIONAL ATMOSPHERE */}

              <span className="ae-portal__gravity" />
              <span className="ae-portal__aura" />

              {/* OUTER ORBITAL FRAME */}

              <span className="ae-portal__outer-orbit" />

              <span className="ae-portal__outer-orbit ae-portal__outer-orbit--secondary" />

              {/* STATION AXES */}

              <span className="ae-portal__axis ae-portal__axis--horizontal" />

              <span className="ae-portal__axis ae-portal__axis--vertical" />

              {/* SIX MANUFACTURING DOCKS */}

              <span className="ae-portal__dock-system">
                {DOCKS.map((dock, index) => (
                  <span
                    key={dock.number}
                    className={[
                      "ae-portal__dock",
                      `ae-portal__dock--${index + 1}`,
                    ].join(" ")}
                  >
                    <span className="ae-portal__dock-shell">
                      <span className="ae-portal__dock-core" />
                    </span>
                  </span>
                ))}
              </span>

              {/* STRUCTURAL SPOKES */}

              <span className="ae-portal__spokes">
                {DOCKS.map((dock, index) => (
                  <span
                    key={dock.number}
                    className={[
                      "ae-portal__spoke",
                      `ae-portal__spoke--${index + 1}`,
                    ].join(" ")}
                  />
                ))}
              </span>

              {/* ORBITAL MANUFACTURING TRACKS */}

              <span className="ae-portal__track ae-portal__track--outer" />

              <span className="ae-portal__track ae-portal__track--inner" />

              <span className="ae-portal__track ae-portal__track--vertical" />

              {/* CENTRAL FACTORY */}

              <span className="ae-portal__station">
                <span className="ae-portal__station-shadow" />

                <span className="ae-portal__station-hull">
                  <span className="ae-portal__hull-reflection" />

                  <span className="ae-portal__hull-segment ae-portal__hull-segment--top" />

                  <span className="ae-portal__hull-segment ae-portal__hull-segment--right" />

                  <span className="ae-portal__hull-segment ae-portal__hull-segment--bottom" />

                  <span className="ae-portal__hull-segment ae-portal__hull-segment--left" />

                  <span className="ae-portal__inner-chamber">
                    <span className="ae-portal__chamber-aperture">
                      <span className="ae-portal__reactor">
                        <span className="ae-portal__reactor-light" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>

              {/* TRANSFER SIGNALS */}

              <span className="ae-portal__signal ae-portal__signal--one" />

              <span className="ae-portal__signal ae-portal__signal--two" />

              <span className="ae-portal__signal ae-portal__signal--three" />

              {/* FLOOR / INTERACTION LABEL */}

              <span className="ae-portal__floor" />

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
          ENTRY TRANSITION

          A six-dock factory activation sequence,
          followed by an approach into the
          central manufacturing chamber.
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
          <span className="ae-portal__transition-perimeter" />

          <span className="ae-portal__transition-ring ae-portal__transition-ring--one" />

          <span className="ae-portal__transition-ring ae-portal__transition-ring--two" />

          <span className="ae-portal__transition-ring ae-portal__transition-ring--three" />

          <span className="ae-portal__transition-docks">
            {DOCKS.map((dock, index) => (
              <span
                key={dock.number}
                className={[
                  "ae-portal__transition-dock",
                  `ae-portal__transition-dock--${index + 1}`,
                ].join(" ")}
              />
            ))}
          </span>

          <span className="ae-portal__transition-chamber">
            <span className="ae-portal__transition-aperture">
              <span className="ae-portal__transition-core" />
            </span>
          </span>
        </div>

        <div className="ae-portal__transition-wave" />

        <div className="ae-portal__transition-copy">
          <span>AETHERION</span>
          <small>Entering the megafactory</small>
        </div>
      </div>

      <style jsx>{`
        /* ==================================================
           ROOT — HOME OWNS THE OUTER CARD
        ================================================== */

        .ae-portal,
        .ae-portal *,
        .ae-portal *::before,
        .ae-portal *::after {
          box-sizing: border-box;
        }

        .ae-portal {
          position: relative;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          color: rgba(247,249,251,.94);
        }

        .ae-portal button {
          font: inherit;
        }

        /* ==================================================
           INTERNAL STAGE — NOT ANOTHER CARD
        ================================================== */

        .ae-portal__stage {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto minmax(0,1fr) auto;

          width: 100%;
          min-width: 0;
          min-height: clamp(560px,58vw,690px);
          padding: clamp(25px,4vw,50px);
          overflow: hidden;

          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;

          transition:
            opacity .5s ease,
            transform .7s ease,
            filter .6s ease;
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
              ellipse at 50% 52%,
              rgba(232,240,248,.035),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 50% 73%,
              rgba(224,236,248,.012),
              transparent 49%
            );
        }

        .ae-portal__starfield {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .15;
          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.42) 0 .45px,
              transparent .8px
            ),
            radial-gradient(
              circle,
              rgba(255,255,255,.19) 0 .35px,
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
           HEADER
        ================================================== */

        .ae-portal__header {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: start;
          width: 100%;
          min-width: 0;
        }

        .ae-portal__identity {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          text-align: center;
        }

        .ae-portal__identity > span {
          color: rgba(255,255,255,.84);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: .24em;
        }

        .ae-portal__identity > small {
          color: rgba(255,255,255,.26);
          font-size: 6px;
          letter-spacing: .14em;
          white-space: nowrap;
        }

        .ae-portal__indicator {
          grid-column: 3;
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,.31);
          font-size: 6px;
          letter-spacing: .12em;
          white-space: nowrap;
        }

        .ae-portal__indicator i {
          width: 4px;
          height: 4px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: rgba(240,247,252,.68);
          box-shadow: 0 0 8px rgba(240,247,252,.16);
          animation:
            ae-indicator-breathe 9s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .ae-portal__experience {
          position: relative;
          z-index: 4;
          align-self: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-width: 0;
          min-height: 0;

          padding:
            clamp(27px,4vw,44px)
            0
            clamp(18px,3vw,29px);

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
          gap: 13px;
          width: 100%;
          text-align: center;
          transition:
            opacity .35s ease,
            transform .5s ease,
            filter .4s ease;
        }

        .ae-portal__eyebrow {
          color: rgba(255,255,255,.25);
          font-size: 6px;
          font-weight: 600;
          letter-spacing: .17em;
          text-align: center;
        }

        .ae-portal__statement h2 {
          width: 100%;
          margin: 0;
          color: rgba(250,251,252,.97);
          font-size: clamp(40px,5.2vw,72px);
          font-weight: 235;
          line-height: 1.01;
          letter-spacing: -.057em;
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
          width: min(100%,520px);
          min-width: 0;
          margin: clamp(12px,1.8vw,22px) auto 0;
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
          outline: 1px solid rgba(255,255,255,.28);
          outline-offset: 7px;
          border-radius: 50%;
        }

        .ae-portal__factory {
          position: relative;
          display: grid;
          place-items: center;
          width: min(100%,450px);
          aspect-ratio: 1.19;
          margin: 0 auto;
          background: transparent;
          transform: translateZ(0);
          transition:
            transform .7s cubic-bezier(.2,.8,.2,1);
        }

        /* ==================================================
           GRAVITY / AURA
        ================================================== */

        .ae-portal__gravity {
          position: absolute;
          inset: 8% 12%;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(229,239,248,.052),
              rgba(198,215,230,.014) 35%,
              transparent 73%
            );
          filter: blur(15px);
          animation:
            ae-gravity-breathe 11s ease-in-out infinite;
        }

        .ae-portal__aura {
          position: absolute;
          width: 78%;
          aspect-ratio: 1;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              transparent 22%,
              rgba(230,241,251,.031) 44%,
              transparent 72%
            );
          filter: blur(11px);
          animation:
            ae-aura-breathe 12s ease-in-out infinite;
        }

        /* ==================================================
           OUTER ORBITAL FRAME
        ================================================== */

        .ae-portal__outer-orbit {
          position: absolute;
          width: 76%;
          aspect-ratio: 1;
          border: 1px solid rgba(236,245,252,.07);
          border-radius: 50%;
          box-shadow:
            inset 0 0 24px rgba(236,245,252,.009);
        }

        .ae-portal__outer-orbit::before {
          content: "";
          position: absolute;
          inset: 6%;
          border: 1px dashed rgba(236,245,252,.035);
          border-radius: 50%;
        }

        .ae-portal__outer-orbit--secondary {
          width: 86%;
          border-color: rgba(236,245,252,.022);
          transform: rotateX(68deg) rotate(-12deg);
        }

        .ae-portal__outer-orbit--secondary::before {
          content: none;
        }

        /* ==================================================
           STATION AXES
        ================================================== */

        .ae-portal__axis {
          position: absolute;
          z-index: 1;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(236,245,252,.07),
              transparent
            );
        }

        .ae-portal__axis--horizontal {
          width: 88%;
          height: 1px;
        }

        .ae-portal__axis--vertical {
          width: 1px;
          height: 87%;
          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(236,245,252,.07),
              transparent
            );
        }

        /* ==================================================
           SIX MANUFACTURING DOCKS
        ================================================== */

        .ae-portal__dock-system {
          position: absolute;
          z-index: 4;
          width: 76%;
          aspect-ratio: 1;
          border-radius: 50%;
          animation:
            ae-dock-system-drift 90s linear infinite;
        }

        .ae-portal__dock {
          position: absolute;
          display: grid;
          place-items: center;
          width: 11%;
          aspect-ratio: 1;
          transform: translate(-50%,-50%);
        }

        .ae-portal__dock--1 {
          top: 0;
          left: 50%;
        }

        .ae-portal__dock--2 {
          top: 25%;
          left: 93.3%;
        }

        .ae-portal__dock--3 {
          top: 75%;
          left: 93.3%;
        }

        .ae-portal__dock--4 {
          top: 100%;
          left: 50%;
        }

        .ae-portal__dock--5 {
          top: 75%;
          left: 6.7%;
        }

        .ae-portal__dock--6 {
          top: 25%;
          left: 6.7%;
        }

        .ae-portal__dock-shell {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          aspect-ratio: 1;
          border: 1px solid rgba(239,246,252,.22);
          border-radius: 23%;
          background:
            linear-gradient(
              145deg,
              rgba(41,47,54,.97),
              rgba(5,7,9,.99) 62%,
              #010203
            );
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.09),
            inset 0 -7px 12px rgba(0,0,0,.72),
            0 8px 17px rgba(0,0,0,.65);
          transform: rotate(45deg);
          animation:
            ae-dock-breathe 10s ease-in-out infinite;
        }

        .ae-portal__dock--2 .ae-portal__dock-shell {
          animation-delay: -1.5s;
        }

        .ae-portal__dock--3 .ae-portal__dock-shell {
          animation-delay: -3s;
        }

        .ae-portal__dock--4 .ae-portal__dock-shell {
          animation-delay: -4.5s;
        }

        .ae-portal__dock--5 .ae-portal__dock-shell {
          animation-delay: -6s;
        }

        .ae-portal__dock--6 .ae-portal__dock-shell {
          animation-delay: -7.5s;
        }

        .ae-portal__dock-core {
          width: 28%;
          aspect-ratio: 1;
          border: 1px solid rgba(242,249,253,.38);
          border-radius: 50%;
          background: rgba(226,239,249,.12);
          box-shadow:
            0 0 8px rgba(232,243,252,.1);
        }

        /* ==================================================
           STRUCTURAL SPOKES
        ================================================== */

        .ae-portal__spokes {
          position: absolute;
          z-index: 2;
          width: 76%;
          aspect-ratio: 1;
          animation:
            ae-dock-system-drift 90s linear infinite;
        }

        .ae-portal__spoke {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 1px;
          transform-origin: left center;
          background:
            linear-gradient(
              90deg,
              rgba(234,244,252,.15),
              rgba(234,244,252,.065),
              transparent 95%
            );
        }

        .ae-portal__spoke--1 {
          transform: rotate(-90deg);
        }

        .ae-portal__spoke--2 {
          transform: rotate(-30deg);
        }

        .ae-portal__spoke--3 {
          transform: rotate(30deg);
        }

        .ae-portal__spoke--4 {
          transform: rotate(90deg);
        }

        .ae-portal__spoke--5 {
          transform: rotate(150deg);
        }

        .ae-portal__spoke--6 {
          transform: rotate(210deg);
        }

        /* ==================================================
           MANUFACTURING TRACKS
        ================================================== */

        .ae-portal__track {
          position: absolute;
          z-index: 3;
          border: 1px solid transparent;
          border-radius: 50%;
          pointer-events: none;
        }

        .ae-portal__track--outer {
          width: 66%;
          height: 30%;
          border-top-color: rgba(238,246,252,.2);
          border-bottom-color: rgba(238,246,252,.055);
          animation:
            ae-track-outer 20s ease-in-out infinite;
        }

        .ae-portal__track--inner {
          width: 52%;
          height: 24%;
          border-top-color: rgba(242,248,252,.22);
          border-bottom-color: rgba(242,248,252,.075);
          animation:
            ae-track-inner 15s ease-in-out infinite;
        }

        .ae-portal__track--vertical {
          width: 28%;
          height: 65%;
          border-left-color: rgba(242,248,252,.11);
          border-right-color: rgba(242,248,252,.055);
          transform: rotate(-21deg);
          animation:
            ae-track-vertical 24s ease-in-out infinite;
        }

        /* ==================================================
           CENTRAL FACTORY
        ================================================== */

        .ae-portal__station {
          position: relative;
          z-index: 6;
          display: grid;
          place-items: center;
          width: 37%;
          aspect-ratio: 1;
          transform-style: preserve-3d;
          animation:
            ae-station-breathe 10s ease-in-out infinite;
        }

        .ae-portal__station-shadow {
          position: absolute;
          inset: -18%;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(0,0,0,.72),
              rgba(0,0,0,.2) 45%,
              transparent 72%
            );
          filter: blur(12px);
        }

        .ae-portal__station-hull {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid rgba(238,246,252,.2);
          border-radius: 26%;
          background:
            radial-gradient(
              circle at 28% 19%,
              rgba(255,255,255,.085),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              rgba(39,44,50,.98),
              rgba(10,12,15,.99) 49%,
              #010203 86%
            );
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            inset 0 -21px 32px rgba(0,0,0,.76),
            0 24px 44px rgba(0,0,0,.73),
            0 0 25px rgba(237,246,252,.025);
          transform: rotate(45deg);
        }

        .ae-portal__station-hull::before {
          content: "";
          position: absolute;
          inset: 11%;
          border: 1px solid rgba(238,246,252,.09);
          border-radius: 19%;
        }

        .ae-portal__hull-reflection {
          position: absolute;
          top: 8%;
          left: 8%;
          width: 58%;
          height: 26%;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,.085),
              transparent 72%
            );
          filter: blur(7px);
          transform: rotate(-35deg);
        }

        .ae-portal__hull-segment {
          position: absolute;
          z-index: 2;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(240,247,252,.15),
              transparent
            );
        }

        .ae-portal__hull-segment--top,
        .ae-portal__hull-segment--bottom {
          width: 58%;
          height: 1px;
        }

        .ae-portal__hull-segment--top {
          top: 19%;
        }

        .ae-portal__hull-segment--bottom {
          bottom: 19%;
        }

        .ae-portal__hull-segment--left,
        .ae-portal__hull-segment--right {
          width: 1px;
          height: 58%;
          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(240,247,252,.15),
              transparent
            );
        }

        .ae-portal__hull-segment--left {
          left: 19%;
        }

        .ae-portal__hull-segment--right {
          right: 19%;
        }

        .ae-portal__inner-chamber {
          position: relative;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 55%;
          aspect-ratio: 1;
          border: 1px solid rgba(240,248,252,.28);
          border-radius: 25%;
          background:
            linear-gradient(
              145deg,
              rgba(31,36,42,.98),
              #020304 70%
            );
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            inset 0 -9px 18px rgba(0,0,0,.7),
            0 0 18px rgba(236,245,252,.045);
        }

        .ae-portal__chamber-aperture {
          display: grid;
          place-items: center;
          width: 69%;
          aspect-ratio: 1;
          border: 1px solid rgba(245,250,253,.32);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(23,29,35,.95),
              #000 70%
            );
          box-shadow:
            0 0 12px rgba(238,247,252,.065),
            inset 0 0 13px rgba(0,0,0,.85);
        }

        .ae-portal__reactor {
          display: grid;
          place-items: center;
          width: 45%;
          aspect-ratio: 1;
          border: 1px solid rgba(245,250,253,.5);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(226,239,249,.24),
              rgba(9,13,17,.96) 70%
            );
        }

        .ae-portal__reactor-light {
          width: 29%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(248,251,253,.87);
          box-shadow:
            0 0 10px rgba(240,248,253,.52),
            0 0 25px rgba(240,248,253,.13);
          animation:
            ae-reactor-pulse 7s ease-in-out infinite;
        }

        /* ==================================================
           TRANSFER SIGNALS
        ================================================== */

        .ae-portal__signal {
          position: absolute;
          z-index: 7;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(246,250,253,.8);
          box-shadow:
            0 0 9px rgba(240,248,253,.3);
          opacity: 0;
          pointer-events: none;
        }

        .ae-portal__signal--one {
          animation:
            ae-signal-one 11s ease-in-out infinite;
        }

        .ae-portal__signal--two {
          animation:
            ae-signal-two 13s ease-in-out infinite;
          animation-delay: -4s;
        }

        .ae-portal__signal--three {
          animation:
            ae-signal-three 15s ease-in-out infinite;
          animation-delay: -7s;
        }

        /* ==================================================
           FLOOR / TAP HINT
        ================================================== */

        .ae-portal__floor {
          position: absolute;
          bottom: 10%;
          width: 46%;
          height: 7%;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(231,243,252,.055),
              rgba(231,243,252,.01) 45%,
              transparent 75%
            );
          filter: blur(10px);
          animation:
            ae-floor-breathe 10s ease-in-out infinite;
        }

        .ae-portal__tap-hint {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,.29);
          font-size: 7px;
          letter-spacing: .12em;
          white-space: nowrap;
          transition:
            color .3s ease,
            transform .3s ease;
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
          margin-top: 10px;
          color: rgba(255,255,255,.28);
          font-size: 7px;
          letter-spacing: .12em;
          white-space: nowrap;
        }

        .ae-portal__sequence i {
          width: clamp(24px,8vw,80px);
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.2),
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
          gap: clamp(9px,1.4vw,16px);
          width: 100%;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,.035);
          color: rgba(255,255,255,.22);
          transition: opacity .35s ease;
        }

        .ae-portal__footer > span {
          font-size: 5px;
          font-weight: 610;
          letter-spacing: .15em;
        }

        .ae-portal__footer > i {
          width: 3px;
          height: 3px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: rgba(255,255,255,.15);
        }

        /* ==================================================
           FULL-SCREEN TRANSITION
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
            opacity .12s ease,
            visibility 0s linear 1.55s;
        }

        .ae-portal__transition-space {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at center,
              #15191d,
              #050607 44%,
              #000 82%
            );
          opacity: 0;
        }

        .ae-portal__transition-stars {
          position: absolute;
          inset: -15%;
          opacity: 0;
          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.5) 0 .5px,
              transparent .9px
            );
          background-size: 93px 93px;
          transform: scale(1.2);
        }

        .ae-portal__transition-grid {
          position: absolute;
          inset: -30%;
          opacity: 0;
          background:
            repeating-linear-gradient(
              90deg,
              transparent 0 84px,
              rgba(240,247,252,.05) 85px,
              transparent 86px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0 84px,
              rgba(240,247,252,.05) 85px,
              transparent 86px
            );
          transform:
            perspective(800px)
            rotateX(65deg)
            scale(1.5);
          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 68%
            );
          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 68%
            );
        }

        .ae-portal__transition-vignette {
          position: absolute;
          inset: 0;
          z-index: 4;
          background:
            radial-gradient(
              circle at center,
              transparent 8%,
              rgba(0,0,0,.45) 54%,
              #000 100%
            );
          opacity: 0;
        }

        .ae-portal__transition-factory {
          position: relative;
          z-index: 3;
          display: grid;
          place-items: center;
          width: min(78vw,670px);
          aspect-ratio: 1;
          opacity: 0;
          transform: scale(.14);
          filter: blur(8px);
        }

        .ae-portal__transition-perimeter {
          position: absolute;
          width: 83%;
          aspect-ratio: 1;
          border: 1px solid rgba(238,246,252,.13);
          border-radius: 50%;
        }

        .ae-portal__transition-ring {
          position: absolute;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .ae-portal__transition-ring--one {
          width: 78%;
          height: 32%;
          border-top-color: rgba(242,249,253,.33);
          border-bottom-color: rgba(242,249,253,.09);
          transform: rotate(-18deg);
          animation:
            ae-transition-ring-one 2.8s linear infinite;
        }

        .ae-portal__transition-ring--two {
          width: 68%;
          height: 68%;
          border-left-color: rgba(242,249,253,.19);
          border-right-color: rgba(242,249,253,.09);
          transform: rotateY(67deg);
          animation:
            ae-transition-ring-two 3.4s linear infinite;
        }

        .ae-portal__transition-ring--three {
          width: 55%;
          height: 23%;
          border-top-color: rgba(247,251,253,.35);
          border-bottom-color: rgba(247,251,253,.12);
          transform: rotate(24deg);
          animation:
            ae-transition-ring-three 2.3s linear infinite;
        }

        .ae-portal__transition-docks {
          position: absolute;
          width: 83%;
          aspect-ratio: 1;
        }

        .ae-portal__transition-dock {
          position: absolute;
          width: 7%;
          aspect-ratio: 1;
          border: 1px solid rgba(242,249,253,.38);
          border-radius: 22%;
          background:
            linear-gradient(
              145deg,
              #303740,
              #050608 70%
            );
          box-shadow:
            0 0 12px rgba(240,248,253,.08);
          transform:
            translate(-50%,-50%)
            rotate(45deg);
          opacity: .15;
        }

        .ae-portal__transition-dock--1 {
          top: 0;
          left: 50%;
        }

        .ae-portal__transition-dock--2 {
          top: 25%;
          left: 93.3%;
        }

        .ae-portal__transition-dock--3 {
          top: 75%;
          left: 93.3%;
        }

        .ae-portal__transition-dock--4 {
          top: 100%;
          left: 50%;
        }

        .ae-portal__transition-dock--5 {
          top: 75%;
          left: 6.7%;
        }

        .ae-portal__transition-dock--6 {
          top: 25%;
          left: 6.7%;
        }

        .ae-portal__transition-chamber {
          position: relative;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 32%;
          aspect-ratio: 1;
          border: 1px solid rgba(243,249,253,.3);
          border-radius: 25%;
          background:
            linear-gradient(
              145deg,
              #343b43,
              #080a0d 52%,
              #000
            );
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.13),
            0 0 65px rgba(239,248,253,.045);
          transform: rotate(45deg);
        }

        .ae-portal__transition-aperture {
          display: grid;
          place-items: center;
          width: 61%;
          aspect-ratio: 1;
          border: 1px solid rgba(247,251,253,.4);
          border-radius: 50%;
          background: #010203;
          box-shadow:
            inset 0 0 22px rgba(0,0,0,.95),
            0 0 20px rgba(240,248,253,.08);
        }

        .ae-portal__transition-core {
          width: 23%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(247,251,253,.95);
          box-shadow:
            0 0 17px rgba(240,248,253,.6),
            0 0 50px rgba(240,248,253,.18);
        }

        .ae-portal__transition-wave {
          position: absolute;
          z-index: 5;
          top: 50%;
          left: 50%;
          width: 14vmax;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #000;
          opacity: 0;
          transform:
            translate(-50%,-50%)
            scale(.1);
        }

        .ae-portal__transition-copy {
          position: absolute;
          z-index: 6;
          bottom: clamp(44px,8vh,90px);
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 0 20px;
          opacity: 0;
          transform: translate(-50%,9px);
          text-align: center;
          transition:
            opacity .3s ease .48s,
            transform .4s ease .48s;
        }

        .ae-portal__transition-copy > span {
          color: rgba(247,250,253,.7);
          font-size: 8px;
          font-weight: 620;
          letter-spacing: .25em;
        }

        .ae-portal__transition-copy > small {
          color: rgba(229,239,248,.3);
          font-size: 7px;
          letter-spacing: .1em;
        }

        /* ==================================================
           ENTERING STATE
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
          transform: scale(.975);
          filter:
            brightness(.35)
            blur(8px);
        }

        .ae-portal--entering
        .ae-portal__transition {
          opacity: 1;
          visibility: visible;
          transition: opacity .12s ease;
        }

        .ae-portal--entering
        .ae-portal__transition-space {
          animation:
            ae-space-enter 1.5s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-stars {
          animation:
            ae-stars-enter 1.5s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-grid {
          animation:
            ae-grid-enter 1.5s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-factory {
          animation:
            ae-factory-enter
            1.5s
            cubic-bezier(.16,.76,.2,1)
            forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-dock {
          animation:
            ae-dock-activate .28s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-dock--1 {
          animation-delay: .12s;
        }

        .ae-portal--entering
        .ae-portal__transition-dock--2 {
          animation-delay: .23s;
        }

        .ae-portal--entering
        .ae-portal__transition-dock--3 {
          animation-delay: .34s;
        }

        .ae-portal--entering
        .ae-portal__transition-dock--4 {
          animation-delay: .45s;
        }

        .ae-portal--entering
        .ae-portal__transition-dock--5 {
          animation-delay: .56s;
        }

        .ae-portal--entering
        .ae-portal__transition-dock--6 {
          animation-delay: .67s;
        }

        .ae-portal--entering
        .ae-portal__transition-aperture {
          animation:
            ae-aperture-open
            1.35s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-vignette {
          animation:
            ae-vignette-enter
            1.5s ease forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-wave {
          animation:
            ae-wave-enter
            1.5s
            cubic-bezier(.4,0,.2,1)
            forwards;
        }

        .ae-portal--entering
        .ae-portal__transition-copy {
          opacity: 1;
          transform: translate(-50%,0);
        }

        /* ==================================================
           AMBIENT ANIMATIONS
        ================================================== */

        @keyframes ae-indicator-breathe {
          0%,100% {
            opacity: .3;
            transform: scale(.8);
          }

          50% {
            opacity: .95;
            transform: scale(1.1);
          }
        }

        @keyframes ae-gravity-breathe {
          0%,100% {
            opacity: .4;
            transform: scale(.94);
          }

          50% {
            opacity: .8;
            transform: scale(1.06);
          }
        }

        @keyframes ae-aura-breathe {
          0%,100% {
            opacity: .28;
            transform: scale(.94);
          }

          50% {
            opacity: .72;
            transform: scale(1.06);
          }
        }

        @keyframes ae-dock-system-drift {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ae-dock-breathe {
          0%,100% {
            opacity: .62;
            filter: brightness(.82);
          }

          50% {
            opacity: 1;
            filter: brightness(1.15);
          }
        }

        @keyframes ae-track-outer {
          0%,100% {
            transform: rotate(-18deg);
            opacity: .5;
          }

          50% {
            transform: rotate(-10deg);
            opacity: .95;
          }
        }

        @keyframes ae-track-inner {
          0%,100% {
            transform: rotate(25deg);
            opacity: .55;
          }

          50% {
            transform: rotate(40deg);
            opacity: .95;
          }
        }

        @keyframes ae-track-vertical {
          0%,100% {
            transform: rotate(-21deg);
            opacity: .45;
          }

          50% {
            transform: rotate(-9deg);
            opacity: .85;
          }
        }

        @keyframes ae-station-breathe {
          0%,100% {
            transform:
              translateY(2px)
              scale(.985);
            filter: brightness(.9);
          }

          50% {
            transform:
              translateY(-3px)
              scale(1.025);
            filter: brightness(1.08);
          }
        }

        @keyframes ae-reactor-pulse {
          0%,100% {
            opacity: .43;
            transform: scale(.76);
          }

          50% {
            opacity: 1;
            transform: scale(1.13);
          }
        }

        @keyframes ae-floor-breathe {
          0%,100% {
            opacity: .28;
            transform: scaleX(.85);
          }

          50% {
            opacity: .7;
            transform: scaleX(1.08);
          }
        }

        @keyframes ae-signal-one {
          0%,68%,100% {
            opacity: 0;
            transform:
              translate(-64px,0)
              scale(.5);
          }

          72% {
            opacity: .85;
          }

          84% {
            opacity: .55;
            transform:
              translate(-125px,0)
              scale(1);
          }

          91% {
            opacity: 0;
            transform:
              translate(-164px,0)
              scale(.5);
          }
        }

        @keyframes ae-signal-two {
          0%,70%,100% {
            opacity: 0;
            transform:
              translate(56px,-42px)
              scale(.5);
          }

          74% {
            opacity: .85;
          }

          86% {
            opacity: .5;
            transform:
              translate(112px,-84px)
              scale(1);
          }

          92% {
            opacity: 0;
            transform:
              translate(146px,-109px)
              scale(.5);
          }
        }

        @keyframes ae-signal-three {
          0%,72%,100% {
            opacity: 0;
            transform:
              translate(50px,43px)
              scale(.5);
          }

          76% {
            opacity: .8;
          }

          87% {
            opacity: .5;
            transform:
              translate(106px,91px)
              scale(1);
          }

          93% {
            opacity: 0;
            transform:
              translate(138px,119px)
              scale(.5);
          }
        }

        /* ==================================================
           ENTRY ANIMATIONS
        ================================================== */

        @keyframes ae-space-enter {
          0% {
            opacity: 0;
          }

          18%,100% {
            opacity: 1;
          }
        }

        @keyframes ae-stars-enter {
          0% {
            opacity: 0;
            transform: scale(1.2);
          }

          28% {
            opacity: .45;
          }

          100% {
            opacity: 0;
            transform: scale(.55);
          }
        }

        @keyframes ae-grid-enter {
          0% {
            opacity: 0;
            transform:
              perspective(800px)
              rotateX(65deg)
              scale(1.5);
          }

          32% {
            opacity: .38;
          }

          100% {
            opacity: 0;
            transform:
              perspective(800px)
              rotateX(65deg)
              scale(.55);
          }
        }

        @keyframes ae-factory-enter {
          0% {
            opacity: 0;
            transform: scale(.14);
            filter: blur(8px);
          }

          20% {
            opacity: 1;
          }

          49% {
            opacity: 1;
            transform: scale(.76);
            filter: blur(0);
          }

          70% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: scale(3.4);
            filter: blur(7px);
          }
        }

        @keyframes ae-dock-activate {
          0% {
            opacity: .15;
            box-shadow:
              0 0 4px rgba(240,248,253,.03);
          }

          100% {
            opacity: 1;
            box-shadow:
              0 0 20px rgba(240,248,253,.32),
              0 0 42px rgba(240,248,253,.09);
          }
        }

        @keyframes ae-aperture-open {
          0%,45% {
            box-shadow:
              inset 0 0 22px rgba(0,0,0,.95),
              0 0 20px rgba(240,248,253,.08);
          }

          70% {
            box-shadow:
              inset 0 0 22px rgba(0,0,0,.95),
              0 0 28px rgba(240,248,253,.3),
              0 0 65px rgba(240,248,253,.12);
          }

          100% {
            box-shadow:
              inset 0 0 35px rgba(0,0,0,1),
              0 0 70px rgba(240,248,253,.05);
          }
        }

        @keyframes ae-vignette-enter {
          0% {
            opacity: 0;
          }

          55% {
            opacity: .4;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes ae-wave-enter {
          0%,72% {
            opacity: 0;
            transform:
              translate(-50%,-50%)
              scale(.1);
          }

          79% {
            opacity: .18;
          }

          100% {
            opacity: 1;
            transform:
              translate(-50%,-50%)
              scale(18);
          }
        }

        @keyframes ae-transition-ring-one {
          from {
            transform: rotate(-18deg);
          }

          to {
            transform: rotate(342deg);
          }
        }

        @keyframes ae-transition-ring-two {
          from {
            transform:
              rotateY(67deg)
              rotate(0deg);
          }

          to {
            transform:
              rotateY(67deg)
              rotate(360deg);
          }
        }

        @keyframes ae-transition-ring-three {
          from {
            transform: rotate(24deg);
          }

          to {
            transform: rotate(384deg);
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
          .ae-portal__station-hull {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,.15),
              inset 0 -21px 32px rgba(0,0,0,.76),
              0 29px 50px rgba(0,0,0,.78),
              0 0 37px rgba(237,246,252,.045);
          }

          .ae-portal__factory-button:hover
          .ae-portal__tap-hint {
            color: rgba(255,255,255,.55);
            transform:
              translate(-50%,-2px);
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 700px) {
          .ae-portal__stage {
            height: auto;
            min-height: 0;
            padding: 20px 18px 17px;
          }

          .ae-portal__identity > span {
            font-size: 7px;
            letter-spacing: .2em;
          }

          .ae-portal__identity > small {
            font-size: 4.5px;
            letter-spacing: .1em;
          }

          .ae-portal__indicator {
            font-size: 0;
          }

          .ae-portal__experience {
            justify-content: flex-start;
            padding: 24px 0 15px;
            touch-action: pan-y;
          }

          .ae-portal__statement {
            gap: 9px;
          }

          .ae-portal__eyebrow {
            font-size: 5px;
            letter-spacing: .12em;
          }

          .ae-portal__statement h2 {
            font-size: clamp(32px,9.4vw,46px);
            line-height: 1.02;
            letter-spacing: -.052em;
          }

          .ae-portal__factory-button {
            width: min(100%,350px);
            margin-top: 8px;
          }

          .ae-portal__factory {
            width: min(100%,305px);
            aspect-ratio: 1.16;
          }

          .ae-portal__tap-hint {
            font-size: 5.5px;
          }

          .ae-portal__sequence {
            gap: 9px;
            font-size: 5.5px;
          }

          .ae-portal__sequence i {
            width: 25px;
          }

          .ae-portal__footer {
            gap: 8px;
            padding-top: 13px;
          }

          .ae-portal__footer > span {
            font-size: 4.5px;
            letter-spacing: .1em;
          }

          .ae-portal__transition-factory {
            width: min(92vw,520px);
          }
        }

        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media (max-width: 700px) and (max-height: 720px) {
          .ae-portal__stage {
            padding: 16px 17px 13px;
          }

          .ae-portal__experience {
            padding: 13px 0 8px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(30px,8.9vw,40px);
          }

          .ae-portal__factory-button {
            margin-top: 1px;
          }

          .ae-portal__factory {
            width: min(100%,265px);
          }

          .ae-portal__footer {
            padding-top: 10px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {
          .ae-portal__stage {
            padding: 18px 15px 15px;
          }

          .ae-portal__identity > span {
            font-size: 6.5px;
          }

          .ae-portal__identity > small {
            font-size: 4px;
          }

          .ae-portal__statement h2 {
            font-size: clamp(31px,9.7vw,41px);
          }

          .ae-portal__factory {
            width: min(100%,285px);
          }

          .ae-portal__footer > span {
            font-size: 4px;
          }
        }

        @media (max-width: 360px) {
          .ae-portal__stage {
            padding: 16px 13px 14px;
          }

          .ae-portal__identity > small {
            display: none;
          }

          .ae-portal__statement h2 {
            font-size: clamp(29px,9.4vw,37px);
          }

          .ae-portal__factory {
            width: min(100%,255px);
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ae-portal__indicator i,
          .ae-portal__gravity,
          .ae-portal__aura,
          .ae-portal__dock-system,
          .ae-portal__dock-shell,
          .ae-portal__spokes,
          .ae-portal__track,
          .ae-portal__station,
          .ae-portal__reactor-light,
          .ae-portal__signal,
          .ae-portal__floor,
          .ae-portal__transition-ring {
            animation: none !important;
          }

          .ae-portal__factory,
          .ae-portal__stage,
          .ae-portal__statement {
            transition-duration: .12s !important;
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
          .ae-portal__transition-dock,
          .ae-portal--entering
          .ae-portal__transition-aperture,
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
        }
      `}</style>
    </section>
  );
}