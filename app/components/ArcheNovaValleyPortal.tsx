"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";


/* ==========================================================
   ARCHENOVA VALLEY PORTAL

   OBSIDIAN COSMIC CIVILIZATION GATEWAY

   Reality
   → Knowledge
   → Intelligence
   → Implementation
   → Governance
   → Experience
   → Civilization

   HOME PRINCIPLE

   One Portal = One Black Glass Surface.

   This component does NOT create another card.
   The HOME environment owns the glass surface.

   Inside the surface exists only a transparent
   civilization canvas:

   Deep Space
   → Orbital Infrastructure
   → Civilization Districts
   → Cosmic City
   → Civilization Axis
   → Stellar Horizon

   Episteme = entrance to cognition.
   Inquiry  = contact with reality.
   Valley   = entrance to civilization.
========================================================== */

export default function ArcheNovaValleyPortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<number | null>(null);

  const [entering, setEntering] =
    useState(false);


  /* ========================================================
     ENTER VALLEY
  ======================================================== */

  const enterValley =
    useCallback(() => {
      if (entering) {
        return;
      }

      setEntering(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          router.push(
            "/archenova-valley",
          );
        }, 1250);
    }, [
      entering,
      router,
    ]);


  /* ========================================================
     CLEANUP
  ======================================================== */

  useEffect(() => {
    return () => {
      if (
        transitionTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);


  return (
    <section
      className={[
        "an-valley-portal",
        entering
          ? "an-valley-portal--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="an-valley-title"
    >

      {/* ==================================================
          TRANSPARENT CIVILIZATION CANVAS

          IMPORTANT:
          This is NOT another glass card.
      ================================================== */}

      <div className="an-valley-portal__card">

        <div
          className="an-valley-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="an-valley-portal__stars"
          aria-hidden="true"
        />

        <div
          className="an-valley-portal__reflection"
          aria-hidden="true"
        />


        {/* ==================================================
            TOP
        ================================================== */}

        <header className="an-valley-portal__top">

          <div className="an-valley-portal__identity">

            <span>
              ARCHENOVA VALLEY
            </span>

            <small>
              CIVILIZATION IMPLEMENTATION ECOSYSTEM
            </small>

          </div>


        </header>


        {/* ==================================================
            CENTRAL EXPERIENCE
        ================================================== */}

        <div className="an-valley-portal__experience">

          <div className="an-valley-portal__statement">
            

            <h2 id="an-valley-title">
              Where knowledge
              <br />
              becomes reality.
            </h2>

          </div>


          {/* ================================================
              COSMIC CIVILIZATION GATEWAY
          ================================================= */}

          <button
            type="button"
            className="an-valley-portal__city-button"
            onClick={enterValley}
            disabled={entering}
            aria-label="Enter ArcheNova Valley"
          >

            <span className="an-valley-portal__city">

              {/* ============================================
                  DEEP SPACE
              ============================================= */}

              <span className="an-valley-portal__cosmic-void" />

              <span className="an-valley-portal__stellar-halo" />

              <span className="an-valley-portal__space-dust" />


              {/* ============================================
                  DISTANT STAR / CIVILIZATION DESTINATION
              ============================================= */}

              <span className="an-valley-portal__destination">

                <span className="an-valley-portal__destination-glow" />

                <span className="an-valley-portal__destination-star" />

                <span className="an-valley-portal__destination-label">
                  CIVILIZATION
                </span>

              </span>


              {/* ============================================
                  ORBITAL SYSTEM
              ============================================= */}

              <span className="an-valley-portal__orbit an-valley-portal__orbit--outer" />

              <span className="an-valley-portal__orbit an-valley-portal__orbit--middle" />

              <span className="an-valley-portal__orbit an-valley-portal__orbit--inner" />

              <span className="an-valley-portal__orbit-node an-valley-portal__orbit-node--1" />

              <span className="an-valley-portal__orbit-node an-valley-portal__orbit-node--2" />

              <span className="an-valley-portal__orbit-node an-valley-portal__orbit-node--3" />


              {/* ============================================
                  CIVILIZATION AXIS
              ============================================= */}

              <span className="an-valley-portal__axis">

                <span className="an-valley-portal__axis-glow" />

                <span className="an-valley-portal__axis-core" />

                <span className="an-valley-portal__axis-signal an-valley-portal__axis-signal--1" />

                <span className="an-valley-portal__axis-signal an-valley-portal__axis-signal--2" />

              </span>


              {/* ============================================
                  COSMIC CITY
              ============================================= */}

              <span className="an-valley-portal__cityscape">

                {/* REAR CITY */}

                <span className="an-valley-portal__tower an-valley-portal__tower--rear-1" />

                <span className="an-valley-portal__tower an-valley-portal__tower--rear-2" />

                <span className="an-valley-portal__tower an-valley-portal__tower--rear-3" />

                <span className="an-valley-portal__tower an-valley-portal__tower--rear-4" />


                {/* MID CITY */}

                <span className="an-valley-portal__tower an-valley-portal__tower--mid-1" />

                <span className="an-valley-portal__tower an-valley-portal__tower--mid-2" />

                <span className="an-valley-portal__tower an-valley-portal__tower--mid-3" />

                <span className="an-valley-portal__tower an-valley-portal__tower--mid-4" />


                {/* CENTRAL CITADEL */}

                <span className="an-valley-portal__citadel">

                  <span className="an-valley-portal__citadel-crown" />

                  <span className="an-valley-portal__citadel-core" />

                  <span className="an-valley-portal__citadel-light" />

                </span>


                {/* CITY LIGHTS */}

                <span className="an-valley-portal__city-light an-valley-portal__city-light--1" />

                <span className="an-valley-portal__city-light an-valley-portal__city-light--2" />

                <span className="an-valley-portal__city-light an-valley-portal__city-light--3" />

                <span className="an-valley-portal__city-light an-valley-portal__city-light--4" />

                <span className="an-valley-portal__city-light an-valley-portal__city-light--5" />

              </span>


              {/* ============================================
                  MONUMENTAL SIDE STRUCTURES
              ============================================= */}

              <span className="an-valley-portal__megastructure an-valley-portal__megastructure--left">

                <span />

                <i />

              </span>

              <span className="an-valley-portal__megastructure an-valley-portal__megastructure--right">

                <span />

                <i />

              </span>


              {/* ============================================
                  CIVILIZATION DISTRICTS
              ============================================= */}

              <span className="an-valley-portal__district an-valley-portal__district--knowledge">

                <i />

                <span>
                  KNOWLEDGE
                </span>

              </span>


              <span className="an-valley-portal__district an-valley-portal__district--intelligence">

                <i />

                <span>
                  INTELLIGENCE
                </span>

              </span>


              <span className="an-valley-portal__district an-valley-portal__district--implementation">

                <i />

                <span>
                  IMPLEMENTATION
                </span>

              </span>


              <span className="an-valley-portal__district an-valley-portal__district--governance">

                <i />

                <span>
                  GOVERNANCE
                </span>

              </span>


              <span className="an-valley-portal__district an-valley-portal__district--experience">

                <i />

                <span>
                  EXPERIENCE
                </span>

              </span>


              {/* ============================================
                  DISTRICT CONNECTIONS
              ============================================= */}

              <span className="an-valley-portal__connection an-valley-portal__connection--1" />

              <span className="an-valley-portal__connection an-valley-portal__connection--2" />

              <span className="an-valley-portal__connection an-valley-portal__connection--3" />

              <span className="an-valley-portal__connection an-valley-portal__connection--4" />


              {/* ============================================
                  CIVILIZATION PLATFORM
              ============================================= */}

              <span className="an-valley-portal__platform">

                <span className="an-valley-portal__platform-ring" />

                <span className="an-valley-portal__platform-core" />

              </span>


              {/* ============================================
                  REALITY / CIVILIZATION BOUNDARY
              ============================================= */}

              <span className="an-valley-portal__boundary an-valley-portal__boundary--reality">
                REALITY
              </span>

              <span className="an-valley-portal__boundary an-valley-portal__boundary--civilization">
                CIVILIZATION
              </span>


              {/* ============================================
                  TAP
              ============================================= */}

              <span className="an-valley-portal__tap">
                Tap ArcheNova Valley to enter
              </span>

            </span>

          </button>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="an-valley-portal__footer">

          <span>
            ARCHENOVA VALLEY
          </span>

          <i />

          <small>
            KNOWLEDGE · INTELLIGENCE · IMPLEMENTATION · GOVERNANCE · EXPERIENCE
          </small>

        </footer>

      </div>


      {/* ==================================================
          COSMIC CIVILIZATION TRANSITION
      ================================================== */}

      <div
        className="an-valley-portal__transition"
        aria-hidden={!entering}
      >

        <div className="an-valley-portal__transition-space" />

        <div className="an-valley-portal__transition-stars" />


        <div className="an-valley-portal__transition-orbit">

          <span />

          <span />

          <span />

        </div>


        <div className="an-valley-portal__transition-horizon">

          <span />

          <i />

        </div>


        <div className="an-valley-portal__transition-city">

          <span className="an-valley-portal__transition-building an-valley-portal__transition-building--1" />

          <span className="an-valley-portal__transition-building an-valley-portal__transition-building--2" />

          <span className="an-valley-portal__transition-building an-valley-portal__transition-building--3" />

          <span className="an-valley-portal__transition-building an-valley-portal__transition-building--4" />

          <span className="an-valley-portal__transition-building an-valley-portal__transition-building--5" />

          <span className="an-valley-portal__transition-spire" />

        </div>


        <div className="an-valley-portal__transition-axis" />


        <div className="an-valley-portal__transition-copy">

          <span>
            ARCHENOVA VALLEY
          </span>

          <small>
            Entering the civilization implementation ecosystem
          </small>

        </div>

      </div>


      <style jsx>{`

        /* ==================================================
           ROOT
        ================================================== */

        .an-valley-portal,
        .an-valley-portal *,
        .an-valley-portal *::before,
        .an-valley-portal *::after {
          box-sizing: border-box;
        }


        .an-valley-portal {
          position: relative;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;
          padding: 0;

          overflow: hidden;
        }


        button {
          font: inherit;
        }


        /* ==================================================
           TRANSPARENT INTERNAL CANVAS

           IMPORTANT:

           This is NOT a glass card.

           HOME owns the single Black Glass Surface.
        ================================================== */

        .an-valley-portal__card {
          position: relative;

          isolation: isolate;

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
            minmax(0, 1fr)
            auto;

          overflow: hidden;

          padding:
            clamp(
              25px,
              4vw,
              50px
            );

          border: 0;

          border-radius: inherit;

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
            opacity
            0.58s ease,

            transform
            0.78s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),

            filter
            0.58s ease;
        }


        .an-valley-portal__card::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -2;

          pointer-events: none;

          background:
            linear-gradient(
              132deg,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              20%,
              transparent
              80%,
              rgba(
                255,
                255,
                255,
                0.004
              )
            );
        }


        /* ==================================================
           CIVILIZATION ATMOSPHERE
        ================================================== */

        .an-valley-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -6;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              64%,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              transparent
              38%
            ),

            radial-gradient(
              ellipse
              at
              50%
              30%,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
              34%
            );
        }


        .an-valley-portal__stars {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          opacity: 0.18;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.36
              )
              0
              0.42px,
              transparent
              0.72px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.16
              )
              0
              0.32px,
              transparent
              0.62px
            );

          background-size:
            73px 73px,
            119px 119px;

          background-position:
            0 0,
            41px 29px;

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at
              50%
              58%,
              black,
              transparent
              86%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              50%
              58%,
              black,
              transparent
              86%
            );
        }


        .an-valley-portal__reflection {
          position: absolute;

          z-index: -3;

          top: -28%;
          left: -12%;

          width: 62%;
          height: 64%;

          pointer-events: none;

          transform:
            rotate(-17deg);

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.012
              ),
              transparent
            );

          filter:
            blur(30px);
        }


        /* ==================================================
           TOP
        ================================================== */

        .an-valley-portal__top {
          position: relative;

          z-index: 20;

          width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: start;
        }


        .an-valley-portal__identity {
          grid-column: 2;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          text-align: center;
        }


        .an-valley-portal__identity
        > span {
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


        .an-valley-portal__identity
        > small {
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


        .an-valley-portal__status {
          grid-column: 3;

          justify-self: end;

          display: inline-flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing: 0.14em;
        }


        .an-valley-portal__status i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.62
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.2
            );

          animation:
            an-city-status
            9s
            ease-in-out
            infinite;
        }


        /* ==================================================
           EXPERIENCE
        ================================================== */

        .an-valley-portal__experience {
          position: relative;

          z-index: 5;

          align-self: center;

          width: 100%;
          min-width: 0;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            clamp(
              26px,
              4vw,
              44px
            )
            0
            clamp(
              18px,
              3vw,
              30px
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .an-valley-portal__statement {
          position: relative;

          z-index: 30;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity
            0.42s ease,
            transform
            0.62s ease;
        }


        .an-valley-portal__eyebrow {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing: 0.21em;
        }


        .an-valley-portal__statement h2 {
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

          line-height: 0.95;

          letter-spacing:
            -0.058em;

          text-align: center;

          text-wrap: balance;
        }


        /* ==================================================
           CITY BUTTON
        ================================================== */

        .an-valley-portal__city-button {
          position: relative;

          z-index: 10;

          width:
            min(
              100%,
              590px
            );

          max-width: 100%;
          min-width: 0;

          display: block;

          margin-top:
            clamp(
              13px,
              1.8vw,
              21px
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


        .an-valley-portal__city-button:disabled {
          cursor: default;
        }


        .an-valley-portal__city-button:focus-visible {
          outline:
            1px solid
            rgba(
              255,
              255,
              255,
              0.16
            );

          outline-offset: 8px;

          border-radius: 20px;
        }


        /* ==================================================
           COSMIC CIVILIZATION OBJECT

           No card.
           No circle container.
           No secondary glass.
        ================================================== */

        .an-valley-portal__city {
          position: relative;

          width:
            min(
              100%,
              500px
            );

          max-width: 100%;
          min-width: 0;

          aspect-ratio: 1.3;

          display: block;

          margin: 0 auto;

          overflow: visible;

          border: 0;

          background: transparent;

          box-shadow: none;

          transform:
            translateZ(0);

          transition:
            transform
            0.72s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            ),

            opacity
            0.45s ease,

            filter
            0.55s ease;
        }


        /* ==================================================
           COSMIC VOID
        ================================================== */

        .an-valley-portal__cosmic-void {
          position: absolute;

          z-index: 0;

          top: 8%;
          left: 50%;

          width: 94%;
          height: 80%;

          transform:
            translateX(-50%);

          background:
            radial-gradient(
              ellipse
              at
              50%
              48%,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              rgba(
                255,
                255,
                255,
                0.008
              )
              34%,
              transparent
              69%
            );

          filter:
            blur(11px);

          opacity: 0.76;
        }


        .an-valley-portal__stellar-halo {
          position: absolute;

          z-index: 1;

          top: 17%;
          left: 50%;

          width: 58%;
          height: 54%;

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
                0.05
              ),
              rgba(
                255,
                255,
                255,
                0.01
              )
              43%,
              transparent
              72%
            );

          filter:
            blur(18px);

          opacity: 0.56;

          animation:
            an-city-halo
            12s
            ease-in-out
            infinite;
        }


        .an-valley-portal__space-dust {
          position: absolute;

          z-index: 1;

          inset: 4% 3% 11%;

          opacity: 0.22;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.48
              )
              0
              0.38px,
              transparent
              0.68px
            );

          background-size:
            47px
            47px;

          -webkit-mask-image:
            radial-gradient(
              ellipse,
              black,
              transparent
              83%
            );

          mask-image:
            radial-gradient(
              ellipse,
              black,
              transparent
              83%
            );
        }


        /* ==================================================
           DESTINATION STAR
        ================================================== */

        .an-valley-portal__destination {
          position: absolute;

          z-index: 15;

          top: 23%;
          left: 50%;

          width: 1px;
          height: 1px;

          transform:
            translateX(-50%);
        }


        .an-valley-portal__destination-glow {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 90px;
          height: 24px;

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
                0.1
              ),
              transparent
              70%
            );

          filter:
            blur(8px);
        }


        .an-valley-portal__destination-star {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 4px;
          height: 4px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.9
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.48
            ),

            0
            0
            30px
            rgba(
              255,
              255,
              255,
              0.13
            );

          animation:
            an-city-star
            7.4s
            ease-in-out
            infinite;
        }


        .an-valley-portal__destination-label {
          position: absolute;

          top: -18px;
          left: 50%;

          transform:
            translateX(-50%);

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 4px;

          font-weight: 620;

          letter-spacing: 0.18em;

          white-space: nowrap;
        }


        /* ==================================================
           ORBITAL INFRASTRUCTURE
        ================================================== */

        .an-valley-portal__orbit {
          position: absolute;

          z-index: 4;

          left: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius: 50%;

          pointer-events: none;
        }


        .an-valley-portal__orbit--outer {
          top: 20%;
          width: 76%;
          height: 35%;

          transform:
            translateX(-50%)
            rotate(-7deg);

          opacity: 0.52;
        }


        .an-valley-portal__orbit--middle {
          top: 27%;
          width: 58%;
          height: 26%;

          transform:
            translateX(-50%)
            rotate(9deg);

          opacity: 0.46;
        }


        .an-valley-portal__orbit--inner {
          top: 33%;
          width: 40%;
          height: 18%;

          transform:
            translateX(-50%)
            rotate(-4deg);

          opacity: 0.42;
        }


        .an-valley-portal__orbit-node {
          position: absolute;

          z-index: 7;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );

          box-shadow:
            0
            0
            8px
            rgba(
              255,
              255,
              255,
              0.18
            );
        }


        .an-valley-portal__orbit-node--1 {
          top: 29%;
          left: 18%;

          animation:
            an-city-orbit-node
            8.2s
            ease-in-out
            infinite;
        }


        .an-valley-portal__orbit-node--2 {
          top: 38%;
          right: 25%;

          animation:
            an-city-orbit-node
            8.2s
            ease-in-out
            infinite
            -2.7s;
        }


        .an-valley-portal__orbit-node--3 {
          top: 45%;
          left: 35%;

          animation:
            an-city-orbit-node
            8.2s
            ease-in-out
            infinite
            -5.4s;
        }


        /* ==================================================
           CIVILIZATION AXIS
        ================================================== */

        .an-valley-portal__axis {
          position: absolute;

          z-index: 14;

          top: 23%;
          bottom: 13%;
          left: 50%;

          width: 12%;

          transform:
            translateX(-50%);

          pointer-events: none;
        }


        .an-valley-portal__axis-glow {
          position: absolute;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 20px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.06
              ),
              rgba(
                255,
                255,
                255,
                0.015
              )
              45%,
              transparent
            );

          filter:
            blur(8px);
        }


        .an-valley-portal__axis-core {
          position: absolute;

          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.72
              ),
              rgba(
                255,
                255,
                255,
                0.24
              )
              28%,
              rgba(
                255,
                255,
                255,
                0.075
              )
              66%,
              transparent
            );

          box-shadow:
            0
            0
            10px
            rgba(
              255,
              255,
              255,
              0.09
            );
        }


        .an-valley-portal__axis-signal {
          position: absolute;

          top: 1%;
          left: 50%;

          width: 4px;
          height: 4px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              255,
              255,
              255,
              0.24
            );

          opacity: 0;
        }


        .an-valley-portal__axis-signal--1 {
          animation:
            an-city-axis
            8.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__axis-signal--2 {
          animation:
            an-city-axis
            8.8s
            ease-in-out
            infinite
            -4.4s;
        }


        /* ==================================================
           COSMIC CITY
        ================================================== */

        .an-valley-portal__cityscape {
          position: absolute;

          z-index: 11;

          left: 50%;
          bottom: 15%;

          width: 66%;
          height: 43%;

          transform:
            translateX(-50%);

          pointer-events: none;
        }


        .an-valley-portal__tower {
          position: absolute;

          bottom: 0;

          display: block;

          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              rgba(
                25,
                27,
                30,
                0.92
              )
              22%,
              rgba(
                5,
                6,
                8,
                0.98
              )
              72%,
              rgba(
                255,
                255,
                255,
                0.018
              )
            );

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          box-shadow:
            inset
            1px
            0
            0
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        .an-valley-portal__tower::after {
          content: "";

          position: absolute;

          top: 15%;
          bottom: 10%;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.14
              ),
              transparent
              72%
            );

          opacity: 0.42;
        }


        /* REAR */

        .an-valley-portal__tower--rear-1 {
          left: 8%;

          width: 9%;
          height: 42%;

          clip-path:
            polygon(
              20% 100%,
              20% 18%,
              50% 0,
              80% 18%,
              80% 100%
            );

          opacity: 0.48;
        }


        .an-valley-portal__tower--rear-2 {
          left: 25%;

          width: 8%;
          height: 57%;

          clip-path:
            polygon(
              14% 100%,
              14% 14%,
              50% 0,
              86% 14%,
              86% 100%
            );

          opacity: 0.58;
        }


        .an-valley-portal__tower--rear-3 {
          right: 25%;

          width: 8%;
          height: 57%;

          clip-path:
            polygon(
              14% 100%,
              14% 14%,
              50% 0,
              86% 14%,
              86% 100%
            );

          opacity: 0.58;
        }


        .an-valley-portal__tower--rear-4 {
          right: 8%;

          width: 9%;
          height: 42%;

          clip-path:
            polygon(
              20% 100%,
              20% 18%,
              50% 0,
              80% 18%,
              80% 100%
            );

          opacity: 0.48;
        }


        /* MID */

        .an-valley-portal__tower--mid-1 {
          left: 15%;

          width: 12%;
          height: 66%;

          clip-path:
            polygon(
              10% 100%,
              10% 18%,
              38% 8%,
              50% 0,
              62% 8%,
              90% 18%,
              90% 100%
            );

          opacity: 0.82;
        }


        .an-valley-portal__tower--mid-2 {
          left: 34%;

          width: 9%;
          height: 78%;

          clip-path:
            polygon(
              14% 100%,
              14% 13%,
              50% 0,
              86% 13%,
              86% 100%
            );
        }


        .an-valley-portal__tower--mid-3 {
          right: 34%;

          width: 9%;
          height: 78%;

          clip-path:
            polygon(
              14% 100%,
              14% 13%,
              50% 0,
              86% 13%,
              86% 100%
            );
        }


        .an-valley-portal__tower--mid-4 {
          right: 15%;

          width: 12%;
          height: 66%;

          clip-path:
            polygon(
              10% 100%,
              10% 18%,
              38% 8%,
              50% 0,
              62% 8%,
              90% 18%,
              90% 100%
            );

          opacity: 0.82;
        }


        /* ==================================================
           CENTRAL CITADEL
        ================================================== */

        .an-valley-portal__citadel {
          position: absolute;

          z-index: 8;

          left: 50%;
          bottom: 0;

          width: 18%;
          height: 96%;

          transform:
            translateX(-50%);
        }


        .an-valley-portal__citadel-core {
          position: absolute;

          inset:
            13%
            20%
            0;

          clip-path:
            polygon(
              32% 100%,
              32% 20%,
              44% 10%,
              50% 0,
              56% 10%,
              68% 20%,
              68% 100%
            );

          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              rgba(
                31,
                33,
                36,
                0.94
              )
              28%,
              rgba(
                4,
                5,
                6,
                0.99
              )
              70%,
              rgba(
                255,
                255,
                255,
                0.025
              )
            );

          box-shadow:
            inset
            1px
            0
            0
            rgba(
              255,
              255,
              255,
              0.07
            ),

            inset
            -1px
            0
            0
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        .an-valley-portal__citadel-crown {
          position: absolute;

          z-index: 5;

          top: 0;
          left: 50%;

          width: 1px;
          height: 22%;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to top,
              rgba(
                255,
                255,
                255,
                0.6
              ),
              transparent
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.12
            );
        }


        .an-valley-portal__citadel-light {
          position: absolute;

          z-index: 6;

          top: 32%;
          left: 50%;

          width: 3px;
          height: 3px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.8
            );

          box-shadow:
            0
            0
            11px
            rgba(
              255,
              255,
              255,
              0.25
            );

          animation:
            an-city-citadel
            8.4s
            ease-in-out
            infinite;
        }


        /* ==================================================
           CITY LIGHTS
        ================================================== */

        .an-valley-portal__city-light {
          position: absolute;

          z-index: 10;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.52
            );

          box-shadow:
            0
            0
            7px
            rgba(
              255,
              255,
              255,
              0.12
            );

          animation:
            an-city-light
            7.6s
            ease-in-out
            infinite;
        }


        .an-valley-portal__city-light--1 {
          left: 17%;
          bottom: 21%;
        }


        .an-valley-portal__city-light--2 {
          left: 35%;
          bottom: 33%;

          animation-delay: -1.4s;
        }


        .an-valley-portal__city-light--3 {
          left: 50%;
          bottom: 16%;

          animation-delay: -2.8s;
        }


        .an-valley-portal__city-light--4 {
          right: 35%;
          bottom: 33%;

          animation-delay: -4.2s;
        }


        .an-valley-portal__city-light--5 {
          right: 17%;
          bottom: 21%;

          animation-delay: -5.6s;
        }


        /* ==================================================
           MEGASTRUCTURES
        ================================================== */

        .an-valley-portal__megastructure {
          position: absolute;

          z-index: 9;

          bottom: 12%;

          width: 29%;
          height: 49%;

          pointer-events: none;

          opacity: 0.84;
        }


        .an-valley-portal__megastructure--left {
          left: -2%;
        }


        .an-valley-portal__megastructure--right {
          right: -2%;

          transform:
            scaleX(-1);
        }


        .an-valley-portal__megastructure
        > span {
          position: absolute;

          inset: 0;

          clip-path:
            polygon(
              0 100%,
              0 48%,
              19% 36%,
              33% 9%,
              47% 20%,
              58% 0,
              69% 34%,
              82% 46%,
              100% 100%
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                34,
                36,
                39,
                0.72
              ),
              rgba(
                5,
                6,
                7,
                0.97
              )
              57%,
              #000
            );

          box-shadow:
            inset
            -1px
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-valley-portal__megastructure
        > i {
          position: absolute;

          top: 23%;
          left: 52%;

          width: 1px;
          height: 58%;

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.11
              ),
              transparent
            );
        }


        /* ==================================================
           DISTRICTS
        ================================================== */

        .an-valley-portal__district {
          position: absolute;

          z-index: 20;

          display: flex;

          align-items: center;

          gap: 5px;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 4px;

          font-weight: 620;

          letter-spacing: 0.11em;

          white-space: nowrap;

          pointer-events: none;
        }


        .an-valley-portal__district i {
          width: 5px;
          height: 5px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.32
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );

          box-shadow:
            0
            0
            9px
            rgba(
              255,
              255,
              255,
              0.08
            );

          animation:
            an-city-node
            10.8s
            ease-in-out
            infinite;
        }


        .an-valley-portal__district--knowledge {
          top: 36%;
          left: 8%;
        }


        .an-valley-portal__district--intelligence {
          top: 54%;
          left: 17%;
        }


        .an-valley-portal__district--implementation {
          top: 69%;
          left: 50%;

          transform:
            translateX(-50%);
        }


        .an-valley-portal__district--governance {
          top: 54%;
          right: 16%;
        }


        .an-valley-portal__district--experience {
          top: 36%;
          right: 7%;
        }


        .an-valley-portal__district--intelligence i {
          animation-delay: -2.16s;
        }


        .an-valley-portal__district--implementation i {
          animation-delay: -4.32s;
        }


        .an-valley-portal__district--governance i {
          animation-delay: -6.48s;
        }


        .an-valley-portal__district--experience i {
          animation-delay: -8.64s;
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .an-valley-portal__connection {
          position: absolute;

          z-index: 12;

          height: 1px;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              transparent
            );

          pointer-events: none;
        }


        .an-valley-portal__connection--1 {
          top: 44%;
          left: 15%;

          width: 30%;

          transform:
            rotate(22deg);
        }


        .an-valley-portal__connection--2 {
          top: 59%;
          left: 25%;

          width: 25%;

          transform:
            rotate(22deg);
        }


        .an-valley-portal__connection--3 {
          top: 59%;
          right: 25%;

          width: 25%;

          transform:
            rotate(-22deg);
        }


        .an-valley-portal__connection--4 {
          top: 44%;
          right: 15%;

          width: 30%;

          transform:
            rotate(-22deg);
        }


        /* ==================================================
           CIVILIZATION PLATFORM
        ================================================== */

        .an-valley-portal__platform {
          position: absolute;

          z-index: 10;

          left: 50%;
          bottom: 9%;

          width: 68%;
          height: 17%;

          transform:
            translateX(-50%);

          pointer-events: none;
        }


        .an-valley-portal__platform-ring {
          position: absolute;

          inset: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          border-radius: 50%;

          transform:
            perspective(350px)
            rotateX(67deg);

          box-shadow:
            0
            0
            18px
            rgba(
              255,
              255,
              255,
              0.02
            );
        }


        .an-valley-portal__platform-core {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 45%;
          height: 45%;

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
                0.06
              ),
              transparent
              72%
            );

          filter:
            blur(7px);
        }


        /* ==================================================
           BOUNDARIES
        ================================================== */

        .an-valley-portal__boundary {
          position: absolute;

          z-index: 20;

          bottom: 10%;

          color:
            rgba(
              255,
              255,
              255,
              0.14
            );

          font-size: 4px;

          font-weight: 600;

          letter-spacing: 0.16em;

          pointer-events: none;
        }


        .an-valley-portal__boundary--reality {
          left: 5%;
        }


        .an-valley-portal__boundary--civilization {
          right: 5%;
        }


        /* ==================================================
           TAP
        ================================================== */

        .an-valley-portal__tap {
          position: absolute;

          z-index: 30;

          bottom: 0;
          left: 50%;

          max-width:
            calc(
              100% -
              16px
            );

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
            color
            0.4s ease,
            transform
            0.4s ease;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .an-valley-portal__footer {
          position: relative;

          z-index: 20;

          width: 100%;

          display: flex;

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              9px,
              1.4vw,
              16px
            );

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          text-align: center;

          transition:
            opacity
            0.45s ease;
        }


        .an-valley-portal__footer
        > span {
          font-size: 5px;

          font-weight: 610;

          letter-spacing: 0.15em;

          white-space: nowrap;
        }


        .an-valley-portal__footer
        > i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.14
            );
        }


        .an-valley-portal__footer
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.16
            );

          font-size: 5px;

          letter-spacing: 0.11em;
        }


        /* ==================================================
           FULLSCREEN TRANSITION
        ================================================== */

        .an-valley-portal__transition {
          position: fixed;

          inset: 0;

          z-index: 9999;

          overflow: hidden;

          display: grid;

          place-items: center;

          background:
            rgba(
              0,
              0,
              0,
              0
            );

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          transition:
            opacity
            0.16s ease,

            visibility
            0s linear
            1.3s,

            background
            0.72s ease;
        }


        .an-valley-portal__transition-space {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              ellipse
              at
              50%
              45%,
              rgba(
                17,
                19,
                21,
                0.99
              ),
              rgba(
                2,
                2,
                3,
                0.998
              )
              49%,
              #000
              83%
            );

          opacity: 0;

          transform:
            scale(1.04);

          transition:
            opacity
            0.46s ease,

            transform
            1.1s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-stars {
          position: absolute;

          inset: -8%;

          opacity: 0;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.38
              )
              0
              0.55px,
              transparent
              0.85px
            ),

            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.18
              )
              0
              0.4px,
              transparent
              0.7px
            );

          background-size:
            83px 83px,
            131px 131px;

          background-position:
            0 0,
            41px 29px;

          transform:
            scale(0.88);

          transition:
            opacity
            0.42s ease
            0.08s,

            transform
            1.1s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        /* ==================================================
           TRANSITION ORBITS
        ================================================== */

        .an-valley-portal__transition-orbit {
          position: absolute;

          z-index: 6;

          inset: 0;

          display: grid;

          place-items: center;

          opacity: 0;

          transform:
            scale(0.48);

          transition:
            opacity
            0.4s ease
            0.1s,

            transform
            1.05s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-orbit
        > span {
          position: absolute;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.065
            );

          border-radius: 50%;
        }


        .an-valley-portal__transition-orbit
        > span:nth-child(1) {
          width: 72vw;
          height: 31vw;

          transform:
            rotate(-8deg);
        }


        .an-valley-portal__transition-orbit
        > span:nth-child(2) {
          width: 54vw;
          height: 23vw;

          transform:
            rotate(10deg);
        }


        .an-valley-portal__transition-orbit
        > span:nth-child(3) {
          width: 36vw;
          height: 15vw;

          transform:
            rotate(-5deg);
        }


        /* ==================================================
           TRANSITION HORIZON
        ================================================== */

        .an-valley-portal__transition-horizon {
          position: absolute;

          z-index: 10;

          top: 39%;
          left: 50%;

          width: 0;
          height: 1px;

          transform:
            translateX(-50%);

          opacity: 0;
        }


        .an-valley-portal__transition-horizon
        > span {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.08
              ),
              rgba(
                255,
                255,
                255,
                0.72
              )
              50%,
              rgba(
                255,
                255,
                255,
                0.08
              ),
              transparent
            );
        }


        .an-valley-portal__transition-horizon
        > i {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 5px;
          height: 5px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.94
            );

          box-shadow:
            0
            0
            12px
            rgba(
              255,
              255,
              255,
              0.5
            ),

            0
            0
            42px
            rgba(
              255,
              255,
              255,
              0.15
            );
        }


        /* ==================================================
           TRANSITION CITY
        ================================================== */

        .an-valley-portal__transition-city {
          position: absolute;

          z-index: 14;

          left: 50%;
          bottom: -3%;

          width: 62vw;
          height: 52vh;

          transform:
            translateX(-50%)
            scale(0.58);

          transform-origin:
            center bottom;

          opacity: 0;

          transition:
            opacity
            0.3s ease,

            transform
            1.08s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            );
        }


        .an-valley-portal__transition-building {
          position: absolute;

          bottom: 0;

          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              rgba(
                18,
                20,
                22,
                0.97
              )
              30%,
              #020203
            );

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );
        }


        .an-valley-portal__transition-building--1 {
          left: 5%;

          width: 14%;
          height: 48%;

          clip-path:
            polygon(
              10% 100%,
              10% 15%,
              50% 0,
              90% 15%,
              90% 100%
            );
        }


        .an-valley-portal__transition-building--2 {
          left: 24%;

          width: 13%;
          height: 68%;

          clip-path:
            polygon(
              10% 100%,
              10% 12%,
              50% 0,
              90% 12%,
              90% 100%
            );
        }


        .an-valley-portal__transition-building--3 {
          left: 43%;

          width: 14%;
          height: 88%;

          clip-path:
            polygon(
              22% 100%,
              22% 15%,
              42% 7%,
              50% 0,
              58% 7%,
              78% 15%,
              78% 100%
            );
        }


        .an-valley-portal__transition-building--4 {
          right: 24%;

          width: 13%;
          height: 68%;

          clip-path:
            polygon(
              10% 100%,
              10% 12%,
              50% 0,
              90% 12%,
              90% 100%
            );
        }


        .an-valley-portal__transition-building--5 {
          right: 5%;

          width: 14%;
          height: 48%;

          clip-path:
            polygon(
              10% 100%,
              10% 15%,
              50% 0,
              90% 15%,
              90% 100%
            );
        }


        .an-valley-portal__transition-spire {
          position: absolute;

          z-index: 10;

          bottom: 86%;
          left: 50%;

          width: 1px;
          height: 28%;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to top,
              rgba(
                255,
                255,
                255,
                0.72
              ),
              transparent
            );

          box-shadow:
            0
            0
            14px
            rgba(
              255,
              255,
              255,
              0.12
            );
        }


        .an-valley-portal__transition-axis {
          position: absolute;

          z-index: 18;

          top: 39%;
          bottom: 0;
          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              rgba(
                255,
                255,
                255,
                0.76
              ),
              rgba(
                255,
                255,
                255,
                0.11
              )
              44%,
              transparent
            );

          opacity: 0;

          box-shadow:
            0
            0
            14px
            rgba(
              255,
              255,
              255,
              0.09
            );
        }


        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .an-valley-portal__transition-copy {
          position: absolute;

          z-index: 30;

          bottom:
            clamp(
              38px,
              7vh,
              76px
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

          transition:
            opacity
            0.36s ease
            0.36s,

            transform
            0.5s ease
            0.36s;
        }


        .an-valley-portal__transition-copy
        > span {
          color:
            rgba(
              245,
              247,
              248,
              0.58
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing: 0.24em;
        }


        .an-valley-portal__transition-copy
        > small {
          color:
            rgba(
              220,
              226,
              229,
              0.2
            );

          font-size: 6px;

          letter-spacing: 0.08em;
        }


        /* ==================================================
           ENTERING — HOME OBJECT
        ================================================== */

        .an-valley-portal--entering
        .an-valley-portal__statement {
          opacity: 0;

          transform:
            translateY(-7px);
        }


        .an-valley-portal--entering
        .an-valley-portal__city {
          transform:
            scale(0.82);

          opacity: 0.12;

          filter:
            brightness(0.36)
            blur(2px);
        }


        .an-valley-portal--entering
        .an-valley-portal__footer {
          opacity: 0;
        }


        .an-valley-portal--entering
        .an-valley-portal__card {
          opacity: 0;

          transform:
            scale(0.98);

          filter:
            blur(7px);
        }


        /* ==================================================
           ENTERING — FULLSCREEN
        ================================================== */

        .an-valley-portal--entering
        .an-valley-portal__transition {
          visibility: visible;

          opacity: 1;

          background: #000;

          transition:
            opacity
            0.16s ease,

            background
            0.72s ease;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-space {
          opacity: 1;

          transform:
            scale(1);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-stars {
          opacity: 0.23;

          transform:
            scale(1.16);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-orbit {
          opacity: 0.72;

          transform:
            scale(1.18);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-horizon {
          width: 78%;

          opacity: 1;

          transition:
            width
            0.82s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            )
            0.08s,

            opacity
            0.2s ease
            0.08s;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-city {
          opacity: 1;

          transform:
            translateX(-50%)
            scale(1.24);
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-axis {
          opacity: 0.72;

          transition:
            opacity
            0.35s ease
            0.25s;
        }


        .an-valley-portal--entering
        .an-valley-portal__transition-copy {
          opacity: 1;

          transform:
            translate(
              -50%,
              0
            );
        }


        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes an-city-status {

          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(0.78);
          }

          50% {
            opacity: 0.95;

            transform:
              scale(1.08);
          }

        }


        @keyframes an-city-halo {

          0%,
          100% {
            opacity: 0.34;

            transform:
              translateX(-50%)
              scale(0.92);
          }

          50% {
            opacity: 0.7;

            transform:
              translateX(-50%)
              scale(1.06);
          }

        }


        @keyframes an-city-star {

          0%,
          100% {
            opacity: 0.5;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.78);
          }

          50% {
            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.14);
          }

        }


        @keyframes an-city-orbit-node {

          0%,
          100% {
            opacity: 0.25;

            transform:
              scale(0.78);
          }

          50% {
            opacity: 0.85;

            transform:
              scale(1.12);
          }

        }


        @keyframes an-city-axis {

          0% {
            top: 1%;

            opacity: 0;
          }

          14% {
            opacity: 0.82;
          }

          72% {
            opacity: 0.42;
          }

          100% {
            top: 94%;

            opacity: 0;
          }

        }


        @keyframes an-city-citadel {

          0%,
          100% {
            opacity: 0.38;

            transform:
              translateX(-50%)
              scale(0.82);
          }

          50% {
            opacity: 1;

            transform:
              translateX(-50%)
              scale(1.12);
          }

        }


        @keyframes an-city-light {

          0%,
          100% {
            opacity: 0.18;
          }

          50% {
            opacity: 0.78;
          }

        }


        @keyframes an-city-node {

          0%,
          100% {
            opacity: 0.2;

            transform:
              scale(0.76);
          }

          48% {
            opacity: 0.54;

            transform:
              scale(1);
          }

          54% {
            opacity: 0.9;

            transform:
              scale(1.12);
          }

          64% {
            opacity: 0.25;
          }

        }


        /* ==================================================
           HOVER
        ================================================== */

        @media
          (hover: hover)
          and
          (pointer: fine) {

          .an-valley-portal__city-button:hover
          .an-valley-portal__city {
            transform:
              scale(1.02);
          }


          .an-valley-portal__city-button:hover
          .an-valley-portal__destination-star {
            box-shadow:
              0
              0
              12px
              rgba(
                255,
                255,
                255,
                0.62
              ),

              0
              0
              38px
              rgba(
                255,
                255,
                255,
                0.18
              );
          }


          .an-valley-portal__city-button:hover
          .an-valley-portal__citadel-light {
            box-shadow:
              0
              0
              15px
              rgba(
                255,
                255,
                255,
                0.34
              );
          }


          .an-valley-portal__city-button:hover
          .an-valley-portal__tap {
            color:
              rgba(
                255,
                255,
                255,
                0.5
              );

            transform:
              translateX(-50%)
              translateY(-2px);
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media
          (max-width: 700px) {

          .an-valley-portal {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            padding: 0;

            overflow: hidden;
          }


          .an-valley-portal__card {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            min-height: 0;

            height:
              min(
                690px,
                calc(
                  100svh -
                  42px
                )
              );

            max-height: 690px;

            padding:
              20px
              18px
              17px;

            border: 0;

            border-radius: inherit;

            background: transparent;

            -webkit-backdrop-filter: none;
            backdrop-filter: none;

            box-shadow: none;
          }


          .an-valley-portal__identity
          > span {
            font-size: 7px;

            letter-spacing: 0.2em;
          }


          .an-valley-portal__identity
          > small {
            margin-top: -1px;

            font-size: 4.5px;

            letter-spacing: 0.1em;
          }


          .an-valley-portal__status {
            gap: 5px;

            font-size: 5px;
          }


          .an-valley-portal__experience {
            min-height: 0;

            padding:
              16px
              0
              10px;

            overflow: hidden;
          }


          .an-valley-portal__statement {
            gap: 8px;
          }


          .an-valley-portal__eyebrow {
            font-size: 5px;

            letter-spacing: 0.18em;
          }


          .an-valley-portal__statement h2 {
            width: 100%;
            max-width: 100%;

            padding:
              0
              4px;

            font-size:
              clamp(
                34px,
                10.3vw,
                48px
              );

            line-height: 0.96;

            letter-spacing:
              -0.052em;
          }


          .an-valley-portal__city-button {
            width:
              min(
                100%,
                390px
              );

            max-width: 100%;

            margin-top: 5px;
          }


          .an-valley-portal__city {
            width:
              min(
                100%,
                340px
              );

            max-width: 100%;

            aspect-ratio: 1.22;
          }


          .an-valley-portal__district {
            font-size: 3.4px;

            gap: 4px;
          }


          .an-valley-portal__district i {
            width: 4px;
            height: 4px;
          }


          .an-valley-portal__destination-label {
            font-size: 3.4px;
          }


          .an-valley-portal__boundary {
            font-size: 3.3px;
          }


          .an-valley-portal__tap {
            max-width:
              calc(
                100% -
                16px
              );

            overflow: hidden;

            font-size: 5.5px;

            letter-spacing: 0.1em;

            text-overflow: ellipsis;
          }


          .an-valley-portal__footer {
            gap: 8px;

            padding-top: 13px;

            overflow: hidden;
          }


          .an-valley-portal__footer
          > span {
            font-size: 4.5px;

            letter-spacing: 0.12em;
          }


          .an-valley-portal__footer
          > small {
            display: none;
          }


          .an-valley-portal__transition-city {
            width: 88vw;
          }


          .an-valley-portal__transition-copy {
            width:
              calc(
                100% -
                32px
              );
          }


          .an-valley-portal__transition-orbit
          > span:nth-child(1) {
            width: 112vw;
            height: 54vw;
          }


          .an-valley-portal__transition-orbit
          > span:nth-child(2) {
            width: 86vw;
            height: 40vw;
          }


          .an-valley-portal__transition-orbit
          > span:nth-child(3) {
            width: 58vw;
            height: 27vw;
          }

        }


        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media
          (max-width: 700px)
          and
          (max-height: 720px) {

          .an-valley-portal__card {
            height:
              calc(
                100svh -
                30px
              );

            padding:
              17px
              17px
              14px;
          }


          .an-valley-portal__experience {
            padding:
              9px
              0
              6px;
          }


          .an-valley-portal__statement {
            gap: 5px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                31px,
                9.3vw,
                42px
              );
          }


          .an-valley-portal__city-button {
            margin-top: 0;
          }


          .an-valley-portal__city {
            width:
              min(
                100%,
                292px
              );
          }


          .an-valley-portal__footer {
            padding-top: 10px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media
          (max-width: 430px) {

          .an-valley-portal {
            padding: 0;
          }


          .an-valley-portal__card {
            padding:
              18px
              15px
              15px;
          }


          .an-valley-portal__identity
          > span {
            font-size: 6.5px;
          }


          .an-valley-portal__identity
          > small {
            font-size: 4px;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                32px,
                10.1vw,
                43px
              );
          }


          .an-valley-portal__city {
            width:
              min(
                100%,
                302px
              );
          }


          .an-valley-portal__district
          > span {
            display: none;
          }


          .an-valley-portal__district i {
            width: 5px;
            height: 5px;
          }


          .an-valley-portal__boundary {
            font-size: 3px;
          }


          .an-valley-portal__tap {
            font-size: 5px;
          }


          .an-valley-portal__footer
          > span {
            font-size: 4px;
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media
          (max-width: 360px) {

          .an-valley-portal__card {
            padding:
              16px
              13px
              14px;
          }


          .an-valley-portal__identity
          > small {
            display: none;
          }


          .an-valley-portal__statement h2 {
            font-size:
              clamp(
                30px,
                9.7vw,
                38px
              );
          }


          .an-valley-portal__city {
            width:
              min(
                100%,
                275px
              );
          }


          .an-valley-portal__boundary {
            display: none;
          }


          .an-valley-portal__footer
          > i {
            display: none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media
          (prefers-reduced-motion: reduce) {

          .an-valley-portal__status i,
          .an-valley-portal__stellar-halo,
          .an-valley-portal__destination-star,
          .an-valley-portal__orbit-node,
          .an-valley-portal__axis-signal,
          .an-valley-portal__citadel-light,
          .an-valley-portal__city-light,
          .an-valley-portal__district i {
            animation:
              none !important;
          }


          .an-valley-portal__city,
          .an-valley-portal__card,
          .an-valley-portal__transition-space,
          .an-valley-portal__transition-stars,
          .an-valley-portal__transition-orbit,
          .an-valley-portal__transition-city {
            transition-duration:
              0.25s !important;
          }

        }

      `}</style>

    </section>
  );
}