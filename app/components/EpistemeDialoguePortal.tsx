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

   HOME ENTRY

   Design principle:
   One Portal = One Glass Surface

   The outer Black Glass Card is the only card surface.
   Episteme itself is a floating black-glass cognitive object.

   No nested glass card.
   No inner panel.
   No secondary container.

   Internal Complexity ↑
   Visible Complexity ↓
   Reality retains veto.
========================================================== */

export default function EpistemeDialoguePortal() {
  const router = useRouter();

  const transitionTimerRef =
    useRef<number | null>(null);

  const [entering, setEntering] =
    useState(false);


  /* ========================================================
     ENTER EPISTEME
  ======================================================== */

  const enterEpisteme =
    useCallback(() => {
      if (entering) {
        return;
      }

      setEntering(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          router.push(
            "/episteme-dialogue",
          );
        }, 1250);
      },
      [
        entering,
        router,
      ],
    );


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
        "ep-dialogue-portal",
        entering
          ? "ep-dialogue-portal--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="ep-dialogue-portal-title"
    >

      {/* ==================================================
          SINGLE BLACK GLASS CARD
      ================================================== */}

      <div className="ep-dialogue-portal__card">

        {/* ==================================================
            CARD ATMOSPHERE
        ================================================== */}

        <div
          className="ep-dialogue-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__grain"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__grid"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__reflection"
          aria-hidden="true"
        />


        {/* ==================================================
            TOP
        ================================================== */}

        <header className="ep-dialogue-portal__top">

          <div className="ep-dialogue-portal__identity">

            <span>
              EPISTEME
            </span>

            <small>
              CONVERSATIONAL INTELLIGENCE
            </small>

          </div>


          <div className="ep-dialogue-portal__live">

            <i />

            <span>
              LIVE
            </span>

          </div>

        </header>


        {/* ==================================================
            CENTRAL EXPERIENCE
        ================================================== */}

        <div className="ep-dialogue-portal__experience">

          {/* ================================================
              TITLE
          ================================================= */}

          <div className="ep-dialogue-portal__statement">

            <span className="ep-dialogue-portal__eyebrow">
              CONTINUOUS INTELLIGENCE
            </span>


            <h2
              id="ep-dialogue-portal-title"
            >
              Think with Episteme.
            </h2>

          </div>


          {/* ================================================
              EPISTEME OBJECT
          ================================================= */}

          <button
            type="button"
            className="ep-dialogue-portal__brain-button"
            onClick={enterEpisteme}
            disabled={entering}
            aria-label="Tap Episteme to enter the conversational intelligence space"
          >

            <span className="ep-dialogue-portal__brain">

              {/* ============================================
                  OPEN ATMOSPHERE
                  Not a card / not a shell
              ============================================= */}

              <span className="ep-dialogue-portal__brain-aura" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--outer" />

              <span className="ep-dialogue-portal__brain-orbit ep-dialogue-portal__brain-orbit--inner" />


              {/* ============================================
                  BLACK GLASS BRAIN
              ============================================= */}

              <span className="ep-dialogue-portal__organ">

                {/* LEFT HEMISPHERE */}

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--left">

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l1" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l2" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l3" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l4" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--l5" />

                </span>


                {/* RIGHT HEMISPHERE */}

                <span className="ep-dialogue-portal__hemisphere ep-dialogue-portal__hemisphere--right">

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r1" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r2" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r3" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r4" />

                  <span className="ep-dialogue-portal__fold ep-dialogue-portal__fold--r5" />

                </span>


                {/* CENTRAL SEAM */}

                <span className="ep-dialogue-portal__brain-seam" />


                {/* INTERNAL CONNECTIONS */}

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--1" />

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--2" />

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--3" />

                <span className="ep-dialogue-portal__connection ep-dialogue-portal__connection--4" />


                {/* NODES */}

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--1" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--2" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--3" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--4" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--5" />

                <span className="ep-dialogue-portal__node ep-dialogue-portal__node--6" />


                {/* SPARSE SIGNALS */}

                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--1" />

                <span className="ep-dialogue-portal__signal ep-dialogue-portal__signal--2" />

              </span>


              {/* ============================================
                  FLOATING REFLECTION
              ============================================= */}

              <span className="ep-dialogue-portal__brain-floor" />


              {/* ============================================
                  TAP HINT
              ============================================= */}

              <span className="ep-dialogue-portal__tap-hint">
                Tap Episteme to enter
              </span>

            </span>

          </button>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="ep-dialogue-portal__footer">

          <span>
            EPISTEME
          </span>

          <i />

          <span>
            REALITY RETAINS VETO
          </span>

        </footer>

      </div>


      {/* ==================================================
          BLACK HOLE TRANSITION
      ================================================== */}

      <div
        className="ep-dialogue-portal__transition"
        aria-hidden={!entering}
      >

        <div className="ep-dialogue-portal__space" />


        <div className="ep-dialogue-portal__black-hole">

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--outer" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--middle" />

          <span className="ep-dialogue-portal__accretion ep-dialogue-portal__accretion--inner" />

          <span className="ep-dialogue-portal__photon-ring" />

          <span className="ep-dialogue-portal__event-horizon" />

          <span className="ep-dialogue-portal__singularity" />

        </div>


        <div className="ep-dialogue-portal__transition-copy">

          <span>
            EPISTEME
          </span>

          <small>
            Entering cognition
          </small>

        </div>

      </div>


      <style jsx>{`

        /* ==================================================
           ROOT
        ================================================== */

        .ep-dialogue-portal {
          position: relative;

          width: 100%;

          padding:
            clamp(
              14px,
              2.5vw,
              30px
            )
            0;
        }


        button {
          font: inherit;
        }


        /* ==================================================
           SINGLE GLASS SURFACE
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            clamp(
              560px,
              58vw,
              690px
            );

          display: grid;

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          overflow: hidden;

          padding:
            clamp(
              25px,
              4vw,
              50px
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius:
            clamp(
              24px,
              2.8vw,
              34px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                20,
                23,
                0.55
              ),
              rgba(
                7,
                8,
                10,
                0.72
              )
              44%,
              rgba(
                1,
                2,
                3,
                0.86
              )
              100%
            );

          -webkit-backdrop-filter:
            blur(
              32px
            )
            saturate(
              108%
            );

          backdrop-filter:
            blur(
              32px
            )
            saturate(
              108%
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            ),

            inset
            0
            -1px
            0
            rgba(
              255,
              255,
              255,
              0.012
            ),

            0
            34px
            110px
            rgba(
              0,
              0,
              0,
              0.34
            );

          color: white;

          transition:
            opacity
            0.65s ease,
            transform
            0.8s
            cubic-bezier(
              0.16,
              0.78,
              0.22,
              1
            ),
            filter
            0.65s ease;
        }


        .ep-dialogue-portal__card::before {
          content: "";

          position: absolute;

          inset: 0;

          z-index: -2;

          pointer-events: none;

          border-radius: inherit;

          background:
            linear-gradient(
              132deg,
              rgba(
                255,
                255,
                255,
                0.038
              ),
              transparent
              22%,
              transparent
              72%,
              rgba(
                198,
                213,
                220,
                0.016
              )
            );
        }


        /* ==================================================
           CARD ATMOSPHERE
        ================================================== */

        .ep-dialogue-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -6;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              55%,
              rgba(
                215,
                226,
                231,
                0.055
              ),
              transparent
              17%
            ),

            radial-gradient(
              ellipse
              at
              50%
              58%,
              rgba(
                100,
                115,
                123,
                0.04
              ),
              transparent
              40%
            ),

            radial-gradient(
              ellipse
              at
              13%
              105%,
              rgba(
                116,
                135,
                144,
                0.026
              ),
              transparent
              43%
            );
        }


        .ep-dialogue-portal__grain {
          position: absolute;

          inset: 0;

          z-index: -5;

          pointer-events: none;

          opacity: 0.07;

          background:
            radial-gradient(
              rgba(
                255,
                255,
                255,
                0.06
              )
              0.5px,
              transparent
              0.7px
            );

          background-size:
            8px
            8px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              84%
            );

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
              84%
            );
        }


        .ep-dialogue-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.045;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.02
              )
              1px,
              transparent
              1px
            ),

            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.02
              )
              1px,
              transparent
              1px
            );

          background-size:
            66px
            66px;

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at
              50%
              53%,
              black,
              transparent
              73%
            );

          mask-image:
            radial-gradient(
              ellipse
              at
              50%
              53%,
              black,
              transparent
              73%
            );
        }


        .ep-dialogue-portal__reflection {
          position: absolute;

          z-index: -3;

          pointer-events: none;

          top: -24%;
          left: -5%;

          width: 62%;
          height: 62%;

          transform:
            rotate(
              -17deg
            );

          background:
            linear-gradient(
              110deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.025
              ),
              transparent
            );

          filter:
            blur(
              24px
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .ep-dialogue-portal__top {
          position: relative;

          z-index: 10;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: start;

          width: 100%;
        }


        .ep-dialogue-portal__identity {
          grid-column: 2;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          min-width: 0;

          text-align: center;
        }


        .ep-dialogue-portal__identity
        > span {
          color:
            rgba(
              247,
              249,
              250,
              0.69
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.24em;

          white-space: nowrap;
        }


        .ep-dialogue-portal__identity
        > small {
          color:
            rgba(
              216,
              225,
              229,
              0.21
            );

          font-size: 6px;

          letter-spacing:
            0.14em;

          white-space: nowrap;
        }


        .ep-dialogue-portal__live {
          grid-column: 3;

          justify-self: end;

          display: inline-flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(
              220,
              228,
              232,
              0.3
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .ep-dialogue-portal__live i {
          width: 5px;
          height: 5px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(
              176,
              213,
              196,
              0.76
            );

          box-shadow:
            0
            0
            12px
            rgba(
              176,
              213,
              196,
              0.18
            );

          animation:
            ep-live-breathe
            9.6s
            ease-in-out
            infinite;
        }


        /* ==================================================
           CENTRAL EXPERIENCE
        ================================================== */

        .ep-dialogue-portal__experience {
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
              30px,
              4vw,
              48px
            )
            0
            clamp(
              22px,
              3vw,
              34px
            );
        }


        /* ==================================================
           STATEMENT
        ================================================== */

        .ep-dialogue-portal__statement {
          position: relative;

          z-index: 5;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 13px;

          text-align: center;

          transition:
            opacity
            0.5s ease,
            transform
            0.65s ease;
        }


        .ep-dialogue-portal__eyebrow {
          color:
            rgba(
              204,
              215,
              220,
              0.22
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.21em;

          text-align: center;
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
              40px,
              5.2vw,
              72px
            );

          font-weight: 235;

          line-height: 0.98;

          letter-spacing:
            -0.057em;

          text-align: center;

          text-wrap: balance;

          text-shadow:
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        /* ==================================================
           BRAIN BUTTON

           Transparent.
           This is NOT a second card.
        ================================================== */

        .ep-dialogue-portal__brain-button {
          position: relative;

          z-index: 6;

          width:
            min(
              100%,
              500px
            );

          display: block;

          margin-top:
            clamp(
              15px,
              2vw,
              24px
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


        .ep-dialogue-portal__brain-button:disabled {
          cursor: default;
        }


        .ep-dialogue-portal__brain-button:focus-visible {
          outline:
            1px solid
            rgba(
              225,
              233,
              236,
              0.26
            );

          outline-offset: 8px;

          border-radius: 50%;
        }


        /* ==================================================
           BRAIN SPACE

           No background.
           No border.
           No card.
        ================================================== */

        .ep-dialogue-portal__brain {
          position: relative;

          width:
            min(
              100%,
              430px
            );

          aspect-ratio: 1.2;

          display: grid;

          place-items: center;

          margin: 0 auto;

          overflow: visible;

          background: transparent;

          border: 0;

          box-shadow: none;

          transform:
            translateZ(
              0
            );

          transition:
            transform
            0.7s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }


        /* ==================================================
           OPEN AURA
        ================================================== */

        .ep-dialogue-portal__brain-aura {
          position: absolute;

          z-index: 1;

          width: 82%;

          aspect-ratio: 1;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                225,
                233,
                236,
                0.06
              ),
              rgba(
                116,
                130,
                137,
                0.023
              )
              38%,
              transparent
              70%
            );

          filter:
            blur(
              13px
            );

          pointer-events: none;

          animation:
            ep-aura-breathe
            9.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           OPEN ORBITS

           Thin lines only.
           They do not form a container.
        ================================================== */

        .ep-dialogue-portal__brain-orbit {
          position: absolute;

          z-index: 2;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(
              224,
              232,
              235,
              0.04
            );

          border-radius: 50%;

          pointer-events: none;
        }


        .ep-dialogue-portal__brain-orbit--outer {
          width: 72%;
          height: 38%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              -8deg
            );

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black
              24%,
              black
              76%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black
              24%,
              black
              76%,
              transparent
            );
        }


        .ep-dialogue-portal__brain-orbit--inner {
          width: 56%;
          height: 29%;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              17deg
            );

          opacity: 0.68;

          -webkit-mask-image:
            linear-gradient(
              90deg,
              transparent,
              black
              30%,
              black
              70%,
              transparent
            );

          mask-image:
            linear-gradient(
              90deg,
              transparent,
              black
              30%,
              black
              70%,
              transparent
            );
        }


        /* ==================================================
           BRAIN ORGAN
        ================================================== */

        .ep-dialogue-portal__organ {
          position: relative;

          z-index: 5;

          width: 59%;
          height: 47%;

          display: block;

          filter:
            drop-shadow(
              0
              24px
              35px
              rgba(
                0,
                0,
                0,
                0.68
              )
            );

          animation:
            ep-brain-breathe
            9.8s
            cubic-bezier(
              0.45,
              0,
              0.55,
              1
            )
            infinite;

          transition:
            filter
            0.55s ease,
            transform
            0.55s ease,
            opacity
            0.55s ease;
        }


        /* ==================================================
           HEMISPHERES
        ================================================== */

        .ep-dialogue-portal__hemisphere {
          position: absolute;

          top: 0;

          width: 51.5%;
          height: 100%;

          overflow: hidden;

          border:
            1px solid
            rgba(
              232,
              237,
              239,
              0.115
            );

          background:
            radial-gradient(
              circle
              at
              36%
              22%,
              rgba(
                255,
                255,
                255,
                0.078
              ),
              transparent
              23%
            ),

            radial-gradient(
              circle
              at
              65%
              69%,
              rgba(
                177,
                186,
                191,
                0.04
              ),
              transparent
              37%
            ),

            linear-gradient(
              145deg,
              rgba(
                40,
                43,
                46,
                0.76
              ),
              rgba(
                13,
                14,
                16,
                0.91
              )
              50%,
              rgba(
                1,
                1,
                2,
                0.985
              )
            );

          -webkit-backdrop-filter:
            blur(
              18px
            );

          backdrop-filter:
            blur(
              18px
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.07
            ),

            inset
            0
            -24px
            40px
            rgba(
              0,
              0,
              0,
              0.42
            );
        }


        .ep-dialogue-portal__hemisphere--left {
          left: 0;

          border-radius:
            64%
            40%
            45%
            58%
            /
            49%
            43%
            58%
            52%;

          transform:
            rotate(
              -1.6deg
            );
        }


        .ep-dialogue-portal__hemisphere--right {
          right: 0;

          border-radius:
            40%
            64%
            58%
            45%
            /
            43%
            49%
            52%
            58%;

          transform:
            rotate(
              1.6deg
            );
        }


        /* ==================================================
           FOLDS
        ================================================== */

        .ep-dialogue-portal__fold {
          position: absolute;

          display: block;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              230,
              235,
              237,
              0.085
            );

          border-radius: 50%;

          opacity: 0.8;
        }


        .ep-dialogue-portal__fold--l1 {
          width: 67%;
          height: 38%;

          top: 17%;
          left: 15%;

          transform:
            rotate(
              -17deg
            );
        }


        .ep-dialogue-portal__fold--l2 {
          width: 53%;
          height: 46%;

          top: 38%;
          left: 7%;

          transform:
            rotate(
              25deg
            );
        }


        .ep-dialogue-portal__fold--l3 {
          width: 47%;
          height: 36%;

          top: 8%;
          right: 3%;

          transform:
            rotate(
              52deg
            );
        }


        .ep-dialogue-portal__fold--l4 {
          width: 54%;
          height: 31%;

          bottom: 4%;
          right: 5%;

          transform:
            rotate(
              -28deg
            );
        }


        .ep-dialogue-portal__fold--l5 {
          width: 35%;
          height: 28%;

          top: 39%;
          right: 18%;

          transform:
            rotate(
              9deg
            );
        }


        .ep-dialogue-portal__fold--r1 {
          width: 67%;
          height: 38%;

          top: 17%;
          right: 15%;

          transform:
            rotate(
              17deg
            );
        }


        .ep-dialogue-portal__fold--r2 {
          width: 53%;
          height: 46%;

          top: 38%;
          right: 7%;

          transform:
            rotate(
              -25deg
            );
        }


        .ep-dialogue-portal__fold--r3 {
          width: 47%;
          height: 36%;

          top: 8%;
          left: 3%;

          transform:
            rotate(
              -52deg
            );
        }


        .ep-dialogue-portal__fold--r4 {
          width: 54%;
          height: 31%;

          bottom: 4%;
          left: 5%;

          transform:
            rotate(
              28deg
            );
        }


        .ep-dialogue-portal__fold--r5 {
          width: 35%;
          height: 28%;

          top: 39%;
          left: 18%;

          transform:
            rotate(
              -9deg
            );
        }


        /* ==================================================
           CENTRAL SEAM
        ================================================== */

        .ep-dialogue-portal__brain-seam {
          position: absolute;

          z-index: 6;

          top: 9%;
          bottom: 11%;
          left: 50%;

          width: 1px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(
                229,
                235,
                238,
                0.13
              )
              29%,
              rgba(
                229,
                235,
                238,
                0.18
              )
              50%,
              rgba(
                229,
                235,
                238,
                0.09
              )
              72%,
              transparent
            );
        }


        /* ==================================================
           CONNECTIONS
        ================================================== */

        .ep-dialogue-portal__connection {
          position: absolute;

          z-index: 7;

          height: 1px;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                218,
                228,
                232,
                0.12
              ),
              transparent
            );
        }


        .ep-dialogue-portal__connection--1 {
          width: 29%;

          top: 31%;
          left: 20%;

          transform:
            rotate(
              22deg
            );
        }


        .ep-dialogue-portal__connection--2 {
          width: 28%;

          top: 55%;
          left: 19%;

          transform:
            rotate(
              -18deg
            );
        }


        .ep-dialogue-portal__connection--3 {
          width: 29%;

          top: 31%;
          right: 18%;

          transform:
            rotate(
              -22deg
            );
        }


        .ep-dialogue-portal__connection--4 {
          width: 28%;

          top: 55%;
          right: 18%;

          transform:
            rotate(
              18deg
            );
        }


        /* ==================================================
           NODES
        ================================================== */

        .ep-dialogue-portal__node {
          position: absolute;

          z-index: 8;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              226,
              233,
              236,
              0.45
            );

          box-shadow:
            0
            0
            9px
            rgba(
              220,
              231,
              235,
              0.12
            );

          animation:
            ep-node
            9.8s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__node--1 {
          top: 23%;
          left: 28%;
        }


        .ep-dialogue-portal__node--2 {
          top: 51%;
          left: 19%;

          animation-delay:
            -2.4s;
        }


        .ep-dialogue-portal__node--3 {
          bottom: 20%;
          left: 37%;

          animation-delay:
            -5.1s;
        }


        .ep-dialogue-portal__node--4 {
          top: 24%;
          right: 27%;

          animation-delay:
            -6.8s;
        }


        .ep-dialogue-portal__node--5 {
          top: 53%;
          right: 19%;

          animation-delay:
            -3.7s;
        }


        .ep-dialogue-portal__node--6 {
          bottom: 20%;
          right: 36%;

          animation-delay:
            -8.1s;
        }


        /* ==================================================
           SIGNALS
        ================================================== */

        .ep-dialogue-portal__signal {
          position: absolute;

          z-index: 9;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          opacity: 0;

          background:
            rgba(
              241,
              244,
              245,
              0.8
            );

          box-shadow:
            0
            0
            13px
            rgba(
              225,
              235,
              239,
              0.3
            );
        }


        .ep-dialogue-portal__signal--1 {
          top: 32%;
          left: 24%;

          animation:
            ep-signal-one
            13.5s
            ease-in-out
            infinite;
        }


        .ep-dialogue-portal__signal--2 {
          bottom: 28%;
          right: 24%;

          animation:
            ep-signal-two
            15.2s
            ease-in-out
            infinite;

          animation-delay:
            -7.2s;
        }


        /* ==================================================
           FLOOR REFLECTION
        ================================================== */

        .ep-dialogue-portal__brain-floor {
          position: absolute;

          z-index: 3;

          bottom: 17%;

          left: 50%;

          width: 47%;
          height: 6%;

          transform:
            translateX(
              -50%
            );

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                220,
                229,
                233,
                0.07
              ),
              rgba(
                130,
                144,
                151,
                0.015
              )
              45%,
              transparent
              72%
            );

          filter:
            blur(
              8px
            );

          opacity: 0.55;

          animation:
            ep-floor-breathe
            9.8s
            ease-in-out
            infinite;
        }


        /* ==================================================
           TAP HINT
        ================================================== */

        .ep-dialogue-portal__tap-hint {
          position: absolute;

          z-index: 10;

          bottom: 2.5%;

          left: 50%;

          transform:
            translateX(
              -50%
            );

          color:
            rgba(
              215,
              224,
              228,
              0.24
            );

          font-size: 7px;

          font-weight: 500;

          letter-spacing:
            0.12em;

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

        .ep-dialogue-portal__footer {
          position: relative;

          z-index: 8;

          display: flex;

          align-items: center;

          justify-content: center;

          gap:
            clamp(
              9px,
              1.4vw,
              16px
            );

          width: 100%;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          color:
            rgba(
              211,
              222,
              227,
              0.2
            );

          text-align: center;

          transition:
            opacity
            0.5s ease;
        }


        .ep-dialogue-portal__footer
        > span {
          font-size: 5px;

          font-weight: 610;

          letter-spacing:
            0.15em;
        }


        .ep-dialogue-portal__footer
        > i {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.14
            );
        }


        /* ==================================================
           BLACK HOLE TRANSITION
        ================================================== */

        .ep-dialogue-portal__transition {
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
            0.18s ease,
            visibility
            0s linear
            1.3s,
            background
            0.8s ease;
        }


        .ep-dialogue-portal__space {
          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              circle
              at
              50%
              50%,
              rgba(
                20,
                22,
                24,
                0.98
              ),
              rgba(
                3,
                3,
                4,
                0.995
              )
              46%,
              #000
              78%
            );

          opacity: 0;

          transition:
            opacity
            0.55s ease;
        }


        /* ==================================================
           BLACK HOLE
        ================================================== */

        .ep-dialogue-portal__black-hole {
          position: relative;

          z-index: 3;

          width:
            min(
              58vw,
              560px
            );

          aspect-ratio: 1;

          display: grid;

          place-items: center;

          opacity: 0;

          transform:
            scale(
              0.18
            );

          filter:
            blur(
              4px
            );

          transition:
            opacity
            0.3s ease,
            transform
            1.05s
            cubic-bezier(
              0.16,
              0.78,
              0.18,
              1
            ),
            filter
            0.55s ease;
        }


        .ep-dialogue-portal__black-hole::before {
          content: "";

          position: absolute;

          width: 100%;
          height: 37%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              transparent
              36%,
              rgba(
                228,
                234,
                237,
                0.03
              )
              46%,
              rgba(
                227,
                234,
                237,
                0.13
              )
              51%,
              rgba(
                176,
                188,
                194,
                0.04
              )
              59%,
              transparent
              70%
            );

          transform:
            rotate(
              -13deg
            );

          filter:
            blur(
              1px
            );

          animation:
            ep-accretion-drift
            4.8s
            linear
            infinite;
        }


        .ep-dialogue-portal__accretion {
          position: absolute;

          border-radius: 50%;

          border-style: solid;

          transform:
            rotateX(
              68deg
            )
            rotateZ(
              -13deg
            );
        }


        .ep-dialogue-portal__accretion--outer {
          width: 94%;
          height: 94%;

          border-width: 2px;

          border-color:
            rgba(
              223,
              231,
              234,
              0.07
            )
            rgba(
              223,
              231,
              234,
              0.25
            )
            rgba(
              223,
              231,
              234,
              0.035
            )
            rgba(
              223,
              231,
              234,
              0.14
            );

          filter:
            blur(
              1.4px
            );

          animation:
            ep-ring-rotate
            7s
            linear
            infinite;
        }


        .ep-dialogue-portal__accretion--middle {
          width: 73%;
          height: 73%;

          border-width: 2px;

          border-color:
            rgba(
              235,
              240,
              242,
              0.12
            )
            rgba(
              235,
              240,
              242,
              0.42
            )
            rgba(
              235,
              240,
              242,
              0.055
            )
            rgba(
              235,
              240,
              242,
              0.22
            );

          box-shadow:
            0
            0
            24px
            rgba(
              225,
              234,
              238,
              0.05
            );

          animation:
            ep-ring-rotate
            5.4s
            linear
            infinite
            reverse;
        }


        .ep-dialogue-portal__accretion--inner {
          width: 55%;
          height: 55%;

          border-width: 1px;

          border-color:
            rgba(
              245,
              247,
              248,
              0.1
            )
            rgba(
              245,
              247,
              248,
              0.52
            )
            rgba(
              245,
              247,
              248,
              0.08
            )
            rgba(
              245,
              247,
              248,
              0.28
            );

          box-shadow:
            0
            0
            25px
            rgba(
              235,
              241,
              243,
              0.08
            );

          animation:
            ep-ring-rotate
            3.8s
            linear
            infinite;
        }


        /* ==================================================
           PHOTON RING
        ================================================== */

        .ep-dialogue-portal__photon-ring {
          position: absolute;

          width: 37%;
          height: 37%;

          border:
            1px solid
            rgba(
              244,
              247,
              248,
              0.48
            );

          border-radius: 50%;

          box-shadow:
            0
            0
            9px
            rgba(
              239,
              244,
              246,
              0.18
            ),

            0
            0
            28px
            rgba(
              217,
              228,
              233,
              0.09
            );

          animation:
            ep-photon-breathe
            2.6s
            ease-in-out
            infinite;
        }


        /* ==================================================
           EVENT HORIZON
        ================================================== */

        .ep-dialogue-portal__event-horizon {
          position: absolute;

          width: 34%;
          height: 34%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle
              at
              48%
              44%,
              rgba(
                7,
                7,
                8,
                1
              ),
              #000
              65%
            );

          box-shadow:
            inset
            0
            0
            30px
            rgba(
              255,
              255,
              255,
              0.008
            ),

            0
            0
            0
            1px
            rgba(
              255,
              255,
              255,
              0.025
            );
        }


        .ep-dialogue-portal__singularity {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: #000;
        }


        /* ==================================================
           TRANSITION COPY
        ================================================== */

        .ep-dialogue-portal__transition-copy {
          position: absolute;

          z-index: 8;

          bottom:
            clamp(
              44px,
              8vh,
              90px
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
            0.4s ease
            0.42s,
            transform
            0.55s ease
            0.42s;
        }


        .ep-dialogue-portal__transition-copy
        > span {
          color:
            rgba(
              242,
              246,
              247,
              0.56
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.24em;
        }


        .ep-dialogue-portal__transition-copy
        > small {
          color:
            rgba(
              208,
              219,
              224,
              0.21
            );

          font-size: 6px;

          letter-spacing:
            0.08em;
        }


        /* ==================================================
           ENTERING STATE
        ================================================== */

        .ep-dialogue-portal--entering
        .ep-dialogue-portal__statement {
          opacity: 0;

          transform:
            translateY(
              -7px
            );
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__organ {
          animation: none;

          transform:
            scale(
              0.68
            );

          opacity: 0.28;

          filter:
            brightness(
              0.4
            )
            blur(
              1px
            );
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

          transform:
            scale(
              0.975
            );

          filter:
            blur(
              8px
            );
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition {
          visibility: visible;

          opacity: 1;

          background: #000;

          transition:
            opacity
            0.18s ease,
            background
            0.8s ease;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__space {
          opacity: 1;
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__black-hole {
          opacity: 1;

          transform:
            scale(
              1.18
            );

          filter:
            blur(
              0
            );
        }


        .ep-dialogue-portal--entering
        .ep-dialogue-portal__transition-copy {
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

        @keyframes ep-brain-breathe {

          0%,
          100% {
            transform:
              scale(
                0.97
              );

            filter:
              drop-shadow(
                0
                20px
                32px
                rgba(
                  0,
                  0,
                  0,
                  0.62
                )
              )
              brightness(
                0.93
              );
          }


          50% {
            transform:
              scale(
                1.035
              );

            filter:
              drop-shadow(
                0
                25px
                42px
                rgba(
                  0,
                  0,
                  0,
                  0.72
                )
              )
              brightness(
                1.07
              );
          }

        }


        @keyframes ep-aura-breathe {

          0%,
          100% {
            opacity: 0.34;

            transform:
              scale(
                0.92
              );
          }


          50% {
            opacity: 0.76;

            transform:
              scale(
                1.06
              );
          }

        }


        @keyframes ep-floor-breathe {

          0%,
          100% {
            opacity: 0.3;

            transform:
              translateX(
                -50%
              )
              scaleX(
                0.88
              );
          }


          50% {
            opacity: 0.62;

            transform:
              translateX(
                -50%
              )
              scaleX(
                1.08
              );
          }

        }


        @keyframes ep-live-breathe {

          0%,
          100% {
            opacity: 0.38;

            transform:
              scale(
                0.78
              );
          }


          50% {
            opacity: 0.95;

            transform:
              scale(
                1.08
              );
          }

        }


        @keyframes ep-node {

          0%,
          100% {
            opacity: 0.15;

            transform:
              scale(
                0.72
              );
          }


          48% {
            opacity: 0.48;

            transform:
              scale(
                1
              );
          }


          54% {
            opacity: 0.88;

            transform:
              scale(
                1.17
              );
          }


          63% {
            opacity: 0.24;
          }

        }


        @keyframes ep-signal-one {

          0%,
          69%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(
                0.6
              );
          }


          73% {
            opacity: 0.8;
          }


          80% {
            opacity: 0.65;

            transform:
              translate(
                55px,
                17px
              )
              scale(
                1
              );
          }


          86% {
            opacity: 0;

            transform:
              translate(
                91px,
                28px
              )
              scale(
                0.65
              );
          }

        }


        @keyframes ep-signal-two {

          0%,
          72%,
          100% {
            opacity: 0;

            transform:
              translate(
                0,
                0
              )
              scale(
                0.6
              );
          }


          76% {
            opacity: 0.76;
          }


          83% {
            opacity: 0.62;

            transform:
              translate(
                -51px,
                -15px
              )
              scale(
                1
              );
          }


          89% {
            opacity: 0;

            transform:
              translate(
                -84px,
                -25px
              )
              scale(
                0.65
              );
          }

        }


        @keyframes ep-ring-rotate {

          from {
            transform:
              rotateX(
                68deg
              )
              rotateZ(
                -13deg
              );
          }


          to {
            transform:
              rotateX(
                68deg
              )
              rotateZ(
                347deg
              );
          }

        }


        @keyframes ep-accretion-drift {

          from {
            transform:
              rotate(
                -13deg
              )
              scale(
                0.98
              );
          }


          50% {
            transform:
              rotate(
                -10deg
              )
              scale(
                1.03
              );
          }


          to {
            transform:
              rotate(
                -13deg
              )
              scale(
                0.98
              );
          }

        }


        @keyframes ep-photon-breathe {

          0%,
          100% {
            opacity: 0.55;

            transform:
              scale(
                0.98
              );
          }


          50% {
            opacity: 0.92;

            transform:
              scale(
                1.025
              );
          }

        }


        /* ==================================================
           HOVER
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain {
            transform:
              scale(
                1.018
              );
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__organ {
            filter:
              drop-shadow(
                0
                26px
                46px
                rgba(
                  0,
                  0,
                  0,
                  0.74
                )
              )
              brightness(
                1.11
              );
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__tap-hint {
            color:
              rgba(
                228,
                234,
                237,
                0.5
              );

            transform:
              translateX(
                -50%
              )
              translateY(
                -2px
              );
          }


          .ep-dialogue-portal__brain-button:hover
          .ep-dialogue-portal__brain-orbit {
            border-color:
              rgba(
                225,
                233,
                236,
                0.07
              );
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) {

          .ep-dialogue-portal {
            width: 100%;

            padding:
              10px
              0;
          }


          .ep-dialogue-portal__card {
            width: 100%;

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

            border-radius: 22px;

            -webkit-backdrop-filter:
              blur(
                23px
              )
              saturate(
                106%
              );

            backdrop-filter:
              blur(
                23px
              )
              saturate(
                106%
              );
          }


          .ep-dialogue-portal__top {
            grid-template-columns:
              1fr
              auto
              1fr;

            align-items: start;
          }


          .ep-dialogue-portal__identity
          > span {
            font-size: 7px;

            letter-spacing:
              0.2em;
          }


          .ep-dialogue-portal__identity
          > small {
            margin-top: -1px;

            font-size: 4.5px;

            letter-spacing:
              0.1em;
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
            min-height: 0;

            padding:
              18px
              0
              12px;
          }


          .ep-dialogue-portal__statement {
            gap: 9px;
          }


          .ep-dialogue-portal__eyebrow {
            font-size: 5px;

            letter-spacing:
              0.18em;
          }


          .ep-dialogue-portal__statement h2 {
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

            line-height: 0.98;

            letter-spacing:
              -0.052em;
          }


          .ep-dialogue-portal__brain-button {
            width: 100%;

            max-width: 370px;

            margin-top: 7px;
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                78vw,
                320px
              );

            max-width: 100%;

            aspect-ratio: 1.16;
          }


          .ep-dialogue-portal__organ {
            width: 61%;

            height: 46%;
          }


          .ep-dialogue-portal__brain-aura {
            width: 78%;
          }


          .ep-dialogue-portal__brain-orbit--outer {
            width: 69%;
          }


          .ep-dialogue-portal__brain-orbit--inner {
            width: 53%;
          }


          .ep-dialogue-portal__tap-hint {
            bottom: 1%;

            font-size: 5.5px;

            letter-spacing:
              0.1em;
          }


          .ep-dialogue-portal__footer {
            gap: 8px;

            padding-top: 13px;
          }


          .ep-dialogue-portal__footer
          > span {
            font-size: 4.5px;

            letter-spacing:
              0.12em;
          }


          .ep-dialogue-portal__black-hole {
            width:
              min(
                90vw,
                500px
              );
          }

        }


        /* ==================================================
           SHORT MOBILE
        ================================================== */

        @media (
          max-width: 700px
        ) and (
          max-height: 720px
        ) {

          .ep-dialogue-portal__card {
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


          .ep-dialogue-portal__experience {
            padding:
              11px
              0
              8px;
          }


          .ep-dialogue-portal__statement {
            gap: 6px;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                31px,
                9.3vw,
                42px
              );
          }


          .ep-dialogue-portal__brain-button {
            margin-top: 2px;
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                68vw,
                275px
              );
          }


          .ep-dialogue-portal__footer {
            padding-top: 10px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ep-dialogue-portal {
            padding:
              8px
              0;
          }


          .ep-dialogue-portal__card {
            padding:
              18px
              15px
              15px;

            border-radius: 20px;
          }


          .ep-dialogue-portal__identity
          > span {
            font-size: 6.5px;
          }


          .ep-dialogue-portal__identity
          > small {
            font-size: 4px;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                32px,
                10.1vw,
                43px
              );
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                75vw,
                292px
              );
          }


          .ep-dialogue-portal__tap-hint {
            font-size: 5px;
          }


          .ep-dialogue-portal__footer
          > span {
            font-size: 4px;
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (
          max-width: 360px
        ) {

          .ep-dialogue-portal__card {
            padding:
              16px
              13px
              14px;
          }


          .ep-dialogue-portal__identity
          > small {
            display: none;
          }


          .ep-dialogue-portal__statement h2 {
            font-size:
              clamp(
                30px,
                9.7vw,
                38px
              );
          }


          .ep-dialogue-portal__brain {
            width:
              min(
                72vw,
                260px
              );
          }


          .ep-dialogue-portal__footer
          > span:last-child {
            display: none;
          }


          .ep-dialogue-portal__footer
          > i {
            display: none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ep-dialogue-portal__brain-aura,
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__brain-floor,
          .ep-dialogue-portal__live i,
          .ep-dialogue-portal__node,
          .ep-dialogue-portal__signal,
          .ep-dialogue-portal__accretion,
          .ep-dialogue-portal__photon-ring,
          .ep-dialogue-portal__black-hole::before {
            animation:
              none !important;
          }


          .ep-dialogue-portal__brain,
          .ep-dialogue-portal__organ,
          .ep-dialogue-portal__card,
          .ep-dialogue-portal__black-hole {
            transition-duration:
              0.25s !important;
          }

        }

      `}</style>

    </section>
  );
}