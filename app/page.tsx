"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";


type CinematicState =
  | "loading"
  | "playing"
  | "failed";


export default function GatePage() {
  const videoRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  const [
    cinematicState,
    setCinematicState,
  ] =
    useState<CinematicState>(
      "loading",
    );


  const failCinematic =
    useCallback(() => {
      setCinematicState(
        "failed",
      );

      videoRef.current?.pause();
    }, []);


  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }


    const timer =
      window.setTimeout(
        () => {
          setCinematicState(
            (
              current,
            ) =>
              current ===
              "playing"
                ? current
                : "failed",
          );
        },
        6000,
      );


    const attemptPlayback =
      async () => {
        try {
          await video.play();
        } catch (
          error
        ) {
          console.warn(
            "[ArcheNova Gate] Video autoplay unavailable:",
            error,
          );

          failCinematic();
        }
      };


    void attemptPlayback();


    return () => {
      window.clearTimeout(
        timer,
      );
    };
  }, [
    failCinematic,
  ]);


  return (
    <main className="an-gate">

      {/* ==================================================
          VIDEO
      ================================================== */}

      <section
        className={[
          "an-gate__video-section",
          `is-${cinematicState}`,
        ].join(" ")}
        aria-label="ArcheNova cinematic"
      >

        <div
          className="an-gate__poster"
          aria-hidden="true"
        />


        {cinematicState !==
          "failed" && (
          <video
            ref={videoRef}
            className="an-gate__video"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster="/images/archenova-gate-poster.jpg"
            onPlaying={() => {
              setCinematicState(
                "playing",
              );
            }}
            onError={() => {
              failCinematic();
            }}
            onStalled={() => {
              console.warn(
                "[ArcheNova Gate] Cinematic stalled.",
              );
            }}
          >
            <source
              src="/videos/archenova-cosmos.mp4"
              type="video/mp4"
            />
          </video>
        )}


        <div
          className="an-gate__video-shade"
          aria-hidden="true"
        />

      </section>


      {/* ==================================================
          DIVIDER
      ================================================== */}

      <div
        className="an-gate__divider"
        aria-hidden="true"
      >
        <span />
      </div>


      {/* ==================================================
          EXISTING HERO
      ================================================== */}

      <section className="an-gate__hero">

        <div
          className="an-gate__hero-light"
          aria-hidden="true"
        />


        <div className="an-gate__hero-inner">

          <div className="an-frame an-stellar-text">
            <span />

            <p>
              FOUNDER-LED CIVILIZATION DESIGN INITIATIVE
            </p>

            <span />
          </div>


          <h1 className="an-title an-stellar-title">
            ArcheNova
          </h1>


          <p className="twin-statement an-stellar-statement">
            Designing the future architecture
            <br />
            of civilization.
          </p>


          <div className="an-lead an-stellar-lead">

            <p>
              ArcheNova is a founder-led civilization
              design initiative dedicated to exploring,
              integrating, designing, and realizing
              civilization.
            </p>

            <p>
              It is not a company, not an institution,
              and not a conventional brand.
            </p>

            <p>
              It is the founder&apos;s digital twin for
              civilization design.
            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          DIVIDER
      ================================================== */}

      <div
        className="an-gate__divider"
        aria-hidden="true"
      >
        <span />
      </div>


      {/* ==================================================
          ENTER / LEAVE
      ================================================== */}

      <section className="an-gate__actions-section">

        <div className="an-gate__actions">

          <Link
            href="/home"
            className="an-gate__enter"
          >
            <span>
              Enter
            </span>

            <i
              aria-hidden="true"
            >
              →
            </i>
          </Link>


          <a
            href="https://x.com/ArcheNova_X"
            target="_blank"
            rel="noreferrer"
            className="an-gate__leave"
          >
            <span>
              Leave to X
            </span>

            <i
              aria-hidden="true"
            >
              ↗
            </i>
          </a>

        </div>

      </section>


      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .an-gate {
          width: 100%;

          max-width: none !important;

          margin: 0 !important;

          padding: 0 !important;

          overflow-x: hidden;

          background:
            #000;

          color:
            #fff;
        }


        /* ==================================================
           VIDEO SECTION
        ================================================== */

        .an-gate__video-section {
          position: relative;

          isolation: isolate;

          width: 100%;

          height:
            min(
              78svh,
              860px
            );

          min-height:
            520px;

          overflow: hidden;

          background:
            #000;
        }


        .an-gate__poster {
          position: absolute;

          inset: 0;

          z-index: -3;

          background:
            #000
            url(
              "/images/archenova-gate-poster.jpg"
            )
            center center
            /
            contain
            no-repeat;

          pointer-events:
            none;
        }


        .an-gate__video {
          position: absolute;

          inset: 0;

          z-index: -2;

          display: block;

          width: 100%;
          height: 100%;

          margin: 0;
          padding: 0;

          border: 0;

          background:
            #000;

          object-fit:
            contain;

          object-position:
            center center;

          opacity: 0;

          transition:
            opacity
            900ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        .an-gate__video-section.is-playing
        .an-gate__video {
          opacity: 1;
        }


        .an-gate__video-shade {
          position: absolute;

          inset: 0;

          z-index: -1;

          pointer-events:
            none;

          background:
            linear-gradient(
              180deg,
              rgba(
                0,
                0,
                0,
                0.02
              ),
              rgba(
                0,
                0,
                0,
                0.08
              )
              72%,
              rgba(
                0,
                0,
                0,
                0.42
              )
              100%
            );
        }


        /* ==================================================
           DIVIDER
        ================================================== */

        .an-gate__divider {
          display: flex;

          align-items: center;

          justify-content: center;

          width: 100%;

          height: 1px;

          background:
            #000;
        }


        .an-gate__divider
        span {
          display: block;

          width:
            min(
              720px,
              calc(
                100% - 48px
              )
            );

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
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
           HERO
        ================================================== */

        .an-gate__hero {
          position: relative;

          isolation: isolate;

          width: 100%;

          min-height:
            82svh;

          display: flex;

          align-items: center;

          justify-content: center;

          padding:
            clamp(
              90px,
              10vw,
              150px
            )
            clamp(
              22px,
              5vw,
              64px
            );

          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              rgba(
                4,
                5,
                7,
                0.96
              ),
              rgba(
                0,
                0,
                0,
                1
              )
            );

          text-align:
            center;
        }


        .an-gate__hero-light {
          position: absolute;

          inset: 0;

          z-index: -1;

          pointer-events:
            none;

          background:
            radial-gradient(
              circle
              at
              50%
              18%,
              rgba(
                175,
                218,
                241,
                0.05
              ),
              transparent
              34%
            );
        }


        .an-gate__hero-inner {
          width:
            min(
              900px,
              100%
            );

          margin:
            0 auto;

          text-align:
            center;
        }


        /* ==================================================
           EXISTING HERO TYPOGRAPHY
        ================================================== */

        .an-gate__hero
        .an-frame {
          display: grid;

          grid-template-columns:
            minmax(
              24px,
              70px
            )
            auto
            minmax(
              24px,
              70px
            );

          align-items: center;

          justify-content: center;

          gap: 16px;

          width:
            fit-content;

          max-width:
            100%;

          margin:
            0 auto;
        }


        .an-gate__hero
        .an-frame
        > span {
          width: 100%;

          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.15
            );
        }


        .an-gate__hero
        .an-frame p {
          margin: 0;

          color:
            rgba(
              224,
              233,
              239,
              0.42
            );

          font-size:
            8px;

          font-weight:
            600;

          line-height: 1;

          letter-spacing:
            0.24em;

          white-space:
            nowrap;
        }


        .an-gate__hero
        .an-title {
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
              250,
              252,
              253,
              0.98
            );

          font-size:
            clamp(
              70px,
              10vw,
              138px
            );

          font-weight:
            240;

          line-height:
            0.88;

          letter-spacing:
            -0.07em;

          text-align:
            center;
        }


        .an-gate__hero
        .twin-statement {
          margin:
            clamp(
              28px,
              3vw,
              38px
            )
            auto
            0;

          color:
            rgba(
              227,
              235,
              240,
              0.62
            );

          font-size:
            clamp(
              17px,
              2vw,
              23px
            );

          font-weight:
            350;

          line-height:
            1.5;

          text-align:
            center;
        }


        .an-gate__hero
        .an-lead {
          width:
            min(
              620px,
              100%
            );

          margin:
            clamp(
              40px,
              5vw,
              58px
            )
            auto
            0;

          text-align:
            center;
        }


        .an-gate__hero
        .an-lead p {
          margin:
            0
            auto
            16px;

          color:
            rgba(
              214,
              224,
              231,
              0.4
            );

          font-size:
            clamp(
              11px,
              1.2vw,
              14px
            );

          line-height:
            1.75;

          text-align:
            center;
        }


        /* ==================================================
           ACTION SECTION
        ================================================== */

        .an-gate__actions-section {
          position: relative;

          width: 100%;

          min-height:
            34svh;

          display: flex;

          align-items: center;

          justify-content: center;

          padding:
            70px
            22px
            90px;

          background:
            #000;
        }


        .an-gate__actions {
          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap: 11px;
        }


        .an-gate__enter,
        .an-gate__leave {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 13px;

          min-width:
            150px;

          min-height:
            48px;

          padding:
            0
            20px;

          border-radius:
            999px;

          text-decoration:
            none;

          font-size:
            9px;

          font-weight:
            600;

          letter-spacing:
            0.1em;

          transition:
            background
              0.3s ease,
            border-color
              0.3s ease,
            color
              0.3s ease,
            box-shadow
              0.3s ease;
        }


        .an-gate__enter {
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.18
            );

          background:
            rgba(
              248,
              250,
              252,
              0.94
            );

          color:
            rgba(
              0,
              0,
              0,
              0.92
            );
        }


        .an-gate__leave {
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              233,
              241,
              245,
              0.52
            );

          -webkit-backdrop-filter:
            blur(18px);

          backdrop-filter:
            blur(18px);
        }


        .an-gate__enter::after,
        .an-gate__leave::after {
          display:
            none !important;
        }


        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .an-gate__enter:hover {
            background:
              #fff;

            box-shadow:
              0
              12px
              36px
              rgba(
                255,
                255,
                255,
                0.075
              );
          }


          .an-gate__leave:hover {
            border-color:
              rgba(
                255,
                255,
                255,
                0.18
              );

            background:
              rgba(
                255,
                255,
                255,
                0.05
              );

            color:
              rgba(
                255,
                255,
                255,
                0.85
              );
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .an-gate__video-section {
            height:
              52svh;

            min-height:
              330px;
          }


          .an-gate__video,
          .an-gate__poster {
            object-fit:
              contain;
          }


          .an-gate__hero {
            min-height:
              78svh;

            padding:
              78px
              20px
              86px;
          }


          .an-gate__hero
          .an-frame {
            grid-template-columns:
              24px
              auto
              24px;

            gap: 10px;
          }


          .an-gate__hero
          .an-frame p {
            font-size:
              6px;

            letter-spacing:
              0.18em;
          }


          .an-gate__hero
          .an-title {
            font-size:
              clamp(
                58px,
                18vw,
                86px
              );
          }


          .an-gate__hero
          .twin-statement {
            max-width:
              330px;

            font-size:
              14px;
          }


          .an-gate__hero
          .an-lead {
            max-width:
              330px;
          }


          .an-gate__hero
          .an-lead p {
            font-size:
              10px;

            line-height:
              1.7;
          }


          .an-gate__actions-section {
            min-height:
              30svh;

            padding:
              60px
              18px
              76px;
          }


          .an-gate__enter,
          .an-gate__leave {
            min-height:
              45px;

            font-size:
              8px;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .an-gate__video-section {
            height:
              46svh;

            min-height:
              300px;
          }


          .an-gate__hero {
            padding:
              68px
              17px
              76px;
          }


          .an-gate__hero
          .an-title {
            font-size:
              clamp(
                54px,
                18vw,
                74px
              );
          }


          .an-gate__actions {
            width:
              min(
                300px,
                100%
              );
          }


          .an-gate__enter,
          .an-gate__leave {
            flex:
              1 1
              130px;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .an-gate__video {
            display:
              none !important;
          }


          .an-gate__enter,
          .an-gate__leave {
            transition:
              none;
          }

        }

      `}</style>
    </main>
  );
}