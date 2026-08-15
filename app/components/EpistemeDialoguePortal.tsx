"use client";

import Link from "next/link";


export default function EpistemeDialoguePortal() {
  return (
    <section
      className="ep-dialogue-portal"
      aria-labelledby="ep-dialogue-portal-title"
    >
      <Link
        href="/episteme-dialogue"
        className="ep-dialogue-portal__card"
        aria-label="Enter Episteme Conversational Intelligence"
      >
        {/* ==================================================
            AMBIENT GLASS
        ================================================== */}

        <div
          className="ep-dialogue-portal__ambient"
          aria-hidden="true"
        />

        <div
          className="ep-dialogue-portal__grid"
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
            MAIN
        ================================================== */}

        <div className="ep-dialogue-portal__main">

          <span className="ep-dialogue-portal__eyebrow">
            ASK · EXPLORE · CHALLENGE
          </span>


          <h2
            id="ep-dialogue-portal-title"
          >
            What do you want
            <br />
            to understand?
          </h2>


          <p>
            Enter a conversational intelligence space
            for science, technology, evidence,
            and civilization.
          </p>


          {/* ================================================
              CHAT PREVIEW
          ================================================= */}

          <div className="ep-dialogue-portal__composer">
            <span>
              Ask Episteme about science or civilization...
            </span>

            <b
              aria-hidden="true"
            >
              ↑
            </b>
          </div>


          {/* ================================================
              MODES
          ================================================= */}

          <div className="ep-dialogue-portal__modes">
            <span>
              ASK
            </span>

            <i />

            <span>
              EXPLORE
            </span>

            <i />

            <span>
              CHALLENGE
            </span>

            <i />

            <span>
              COMPARE
            </span>

            <i />

            <span>
              SIMULATE
            </span>
          </div>

        </div>


        {/* ==================================================
            LIVE SIGNAL PREVIEW
        ================================================== */}

        <div className="ep-dialogue-portal__stream">

          <div className="ep-dialogue-portal__stream-head">
            <span>
              LIVE INTELLIGENCE
            </span>

            <small>
              NOW
            </small>
          </div>


          <div className="ep-dialogue-portal__stream-items">

            <div>
              <i />

              <span>
                Scientific signals are continuously
                entering the intelligence layer.
              </span>
            </div>

            <div>
              <i />

              <span>
                Episteme can question evidence,
                assumptions, and emerging constraints.
              </span>
            </div>

            <div>
              <i />

              <span>
                Dialogue connects inquiry with
                live civilization intelligence.
              </span>
            </div>

          </div>
        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="ep-dialogue-portal__footer">

          <div className="ep-dialogue-portal__footer-copy">
            <span>
              ENTER EPISTEME
            </span>

            <small>
              CONVERSATION · EVIDENCE · INTELLIGENCE
            </small>
          </div>


          <span
            className="ep-dialogue-portal__arrow"
            aria-hidden="true"
          >
            →
          </span>

        </footer>
      </Link>


      <style jsx>{`

        /* ==================================================
           ROOT
        ================================================== */

        .ep-dialogue-portal {
          position: relative;

          width: 100%;

          padding:
            clamp(
              18px,
              3vw,
              34px
            )
            0;
        }


        /* ==================================================
           CARD
        ================================================== */

        .ep-dialogue-portal__card {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            clamp(
              430px,
              50vw,
              610px
            );

          display: grid;

          grid-template-rows:
            auto
            1fr
            auto
            auto;

          overflow: hidden;

          padding:
            clamp(
              26px,
              4vw,
              52px
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
                15,
                17,
                20,
                0.66
              ),
              rgba(
                5,
                6,
                8,
                0.82
              )
              50%,
              rgba(
                0,
                0,
                0,
                0.94
              )
            );

          -webkit-backdrop-filter:
            blur(30px)
            saturate(112%);

          backdrop-filter:
            blur(30px)
            saturate(112%);

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

            0
              32px
              100px
              rgba(
                0,
                0,
                0,
                0.3
              );

          color: white;

          text-decoration: none;

          transform: none;

          transition:
            border-color
              0.45s ease,
            box-shadow
              0.45s ease;
        }


        .ep-dialogue-portal__card::after {
          display:
            none !important;
        }


        /* ==================================================
           AMBIENT
        ================================================== */

        .ep-dialogue-portal__ambient {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              74%
              20%,
              rgba(
                145,
                205,
                235,
                0.07
              ),
              transparent
              28%
            ),

            radial-gradient(
              ellipse
              at
              18%
              105%,
              rgba(
                140,
                180,
                205,
                0.04
              ),
              transparent
              42%
            );
        }


        .ep-dialogue-portal__grid {
          position: absolute;

          inset: 0;

          z-index: -2;

          pointer-events: none;

          opacity: 0.14;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.022
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
                0.022
              )
              1px,
              transparent
              1px
            );

          background-size:
            56px
            56px;

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 75%,
              transparent
            );

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 75%,
              transparent
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .ep-dialogue-portal__top {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: flex-start;

          justify-content:
            space-between;

          gap: 24px;
        }


        .ep-dialogue-portal__identity {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ep-dialogue-portal__identity
        > span {
          color:
            rgba(
              244,
              248,
              250,
              0.62
            );

          font-size: 9px;

          font-weight: 650;

          letter-spacing:
            0.22em;
        }


        .ep-dialogue-portal__identity
        > small {
          color:
            rgba(
              220,
              229,
              235,
              0.24
            );

          font-size: 6px;

          letter-spacing:
            0.14em;
        }


        .ep-dialogue-portal__live {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              220,
              230,
              236,
              0.34
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .ep-dialogue-portal__live i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              137,
              240,
              193,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              137,
              240,
              193,
              0.36
            );
        }


        /* ==================================================
           MAIN
        ================================================== */

        .ep-dialogue-portal__main {
          position: relative;

          z-index: 2;

          align-self: center;

          width: 100%;

          padding:
            clamp(
              40px,
              6vw,
              72px
            )
            0
            clamp(
              28px,
              4vw,
              44px
            );

          text-align: left;
        }


        .ep-dialogue-portal__eyebrow {
          color:
            rgba(
              180,
              220,
              239,
              0.42
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.18em;
        }


        .ep-dialogue-portal__main h2 {
          max-width: 860px;

          margin:
            17px
            0
            0;

          color:
            rgba(
              249,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              48px,
              7vw,
              92px
            );

          font-weight: 250;

          line-height: 0.9;

          letter-spacing:
            -0.062em;

          text-wrap: balance;
        }


        .ep-dialogue-portal__main p {
          max-width: 470px;

          margin:
            clamp(
              25px,
              3vw,
              34px
            )
            0
            0;

          color:
            rgba(
              218,
              227,
              233,
              0.47
            );

          font-size:
            clamp(
              11px,
              1.15vw,
              14px
            );

          line-height: 1.76;
        }


        /* ==================================================
           CHAT COMPOSER PREVIEW
        ================================================== */

        .ep-dialogue-portal__composer {
          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap: 12px;

          width:
            min(
              650px,
              100%
            );

          margin-top:
            clamp(
              30px,
              4vw,
              44px
            );

          padding:
            8px
            8px
            8px
            18px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.095
            );

          border-radius: 19px;

          background:
            linear-gradient(
              145deg,
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
                0.012
              )
            );

          -webkit-backdrop-filter:
            blur(18px);

          backdrop-filter:
            blur(18px);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.035
            );
        }


        .ep-dialogue-portal__composer
        > span {
          overflow: hidden;

          color:
            rgba(
              235,
              242,
              246,
              0.3
            );

          font-size: 10px;

          text-overflow:
            ellipsis;

          white-space: nowrap;
        }


        .ep-dialogue-portal__composer
        > b {
          width: 37px;
          height: 37px;

          display: grid;

          place-items: center;

          border-radius: 12px;

          background:
            rgba(
              246,
              249,
              251,
              0.9
            );

          color:
            rgba(
              0,
              0,
              0,
              0.9
            );

          font-size: 14px;

          font-weight: 500;
        }


        /* ==================================================
           MODES
        ================================================== */

        .ep-dialogue-portal__modes {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 9px;

          margin-top: 18px;

          color:
            rgba(
              210,
              224,
              232,
              0.28
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.13em;
        }


        .ep-dialogue-portal__modes i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.13
            );
        }


        /* ==================================================
           X-LIKE LIVE STREAM
        ================================================== */

        .ep-dialogue-portal__stream {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            150px
            minmax(
              0,
              1fr
            );

          gap:
            clamp(
              18px,
              3vw,
              34px
            );

          padding:
            21px
            0;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );
        }


        .ep-dialogue-portal__stream-head {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ep-dialogue-portal__stream-head
        > span {
          color:
            rgba(
              225,
              235,
              241,
              0.42
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.16em;
        }


        .ep-dialogue-portal__stream-head
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }


        .ep-dialogue-portal__stream-items {
          display: grid;

          gap: 9px;
        }


        .ep-dialogue-portal__stream-items
        > div {
          display: grid;

          grid-template-columns:
            auto
            minmax(
              0,
              1fr
            );

          align-items: start;

          gap: 10px;
        }


        .ep-dialogue-portal__stream-items
        i {
          width: 4px;
          height: 4px;

          margin-top: 5px;

          border-radius: 50%;

          background:
            rgba(
              156,
              218,
              239,
              0.58
            );

          box-shadow:
            0
            0
            8px
            rgba(
              156,
              218,
              239,
              0.18
            );
        }


        .ep-dialogue-portal__stream-items
        span {
          color:
            rgba(
              215,
              225,
              232,
              0.37
            );

          font-size: 8px;

          line-height: 1.55;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .ep-dialogue-portal__footer {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 24px;

          padding-top: 20px;
        }


        .ep-dialogue-portal__footer-copy {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .ep-dialogue-portal__footer-copy
        > span {
          color:
            rgba(
              241,
              246,
              249,
              0.7
            );

          font-size: 7px;

          font-weight: 620;

          letter-spacing:
            0.19em;
        }


        .ep-dialogue-portal__footer-copy
        > small {
          color:
            rgba(
              215,
              225,
              231,
              0.22
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }


        .ep-dialogue-portal__arrow {
          width: 44px;
          height: 44px;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 14px;

          transition:
            border-color
              0.35s ease,
            background
              0.35s ease,
            box-shadow
              0.35s ease;
        }


        /* ==================================================
           HOVER
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .ep-dialogue-portal__card:hover {
            border-color:
              rgba(
                170,
                220,
                242,
                0.14
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
                0.06
              ),

              0
              38px
              110px
              rgba(
                0,
                0,
                0,
                0.36
              );
          }


          .ep-dialogue-portal__card:hover
          .ep-dialogue-portal__arrow {
            border-color:
              rgba(
                170,
                220,
                242,
                0.2
              );

            background:
              rgba(
                170,
                220,
                242,
                0.055
              );

            box-shadow:
              0
              0
              24px
              rgba(
                150,
                210,
                240,
                0.055
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
            padding:
              14px
              0;
          }


          .ep-dialogue-portal__card {
            min-height: 470px;

            padding:
              23px
              21px
              20px;

            border-radius: 23px;

            -webkit-backdrop-filter:
              blur(20px)
              saturate(110%);

            backdrop-filter:
              blur(20px)
              saturate(110%);
          }


          .ep-dialogue-portal__identity
          > span {
            font-size: 7px;
          }


          .ep-dialogue-portal__identity
          > small {
            font-size: 5px;
          }


          .ep-dialogue-portal__main {
            padding:
              42px
              0
              30px;
          }


          .ep-dialogue-portal__main h2 {
            font-size:
              clamp(
                42px,
                13vw,
                60px
              );

            line-height: 0.93;
          }


          .ep-dialogue-portal__main p {
            max-width: 310px;

            margin-top: 22px;

            font-size: 10px;

            line-height: 1.7;
          }


          .ep-dialogue-portal__composer {
            margin-top: 28px;

            border-radius: 17px;
          }


          .ep-dialogue-portal__composer
          > span {
            font-size: 8px;
          }


          .ep-dialogue-portal__composer
          > b {
            width: 34px;
            height: 34px;

            border-radius: 11px;
          }


          .ep-dialogue-portal__stream {
            grid-template-columns:
              1fr;

            gap: 13px;

            padding:
              17px
              0;
          }


          .ep-dialogue-portal__stream-head {
            flex-direction: row;

            align-items: center;

            justify-content:
              space-between;
          }


          .ep-dialogue-portal__footer-copy
          > small {
            display: none;
          }


          .ep-dialogue-portal__arrow {
            width: 38px;
            height: 38px;

            font-size: 12px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ep-dialogue-portal__card {
            min-height: 450px;

            padding:
              21px
              18px
              18px;

            border-radius: 21px;
          }


          .ep-dialogue-portal__main h2 {
            font-size:
              clamp(
                39px,
                12.5vw,
                53px
              );
          }


          .ep-dialogue-portal__modes {
            gap: 6px;

            font-size: 5px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ep-dialogue-portal__card,
          .ep-dialogue-portal__arrow {
            transition:
              none !important;
          }

        }

      `}</style>
    </section>
  );
}