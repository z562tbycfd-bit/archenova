"use client";

import Link from "next/link";


/* ==========================================================
   TYPES
========================================================== */

type GalaxyNode = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  x: number;
  y: number;
};


/* ==========================================================
   GALAXY NODES
========================================================== */

const galaxyNodes: GalaxyNode[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Observation · Evidence",
    href: "/episteme",
    x: 25,
    y: 39,
  },

  {
    id: "governance",
    title: "Governance",
    subtitle: "Order · Coordination",
    href: "/governance",
    x: 50,
    y: 22,
  },

  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Analysis · Synthesis",
    href: "/intelligence",
    x: 75,
    y: 39,
  },

  {
    id: "realization",
    title: "Realization",
    subtitle: "Engineering · Deployment",
    href: "/realization",
    x: 76,
    y: 69,
  },

  {
    id: "structure",
    title: "Structure",
    subtitle: "Architecture · Continuity",
    href: "/architecture",
    x: 50,
    y: 82,
  },

  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Exchange · Revision",
    href: "/dialogue",
    x: 24,
    y: 69,
  },
];


/* ==========================================================
   SPIRAL GALAXY
========================================================== */

function SpiralGalaxy({
  id,
}: {
  id: string;
}) {
  return (
    <span
      className={`gx-galaxy gx-galaxy-${id}`}
      aria-hidden="true"
    >
      <span className="gx-galaxy-halo" />

      <span className="gx-galaxy-core" />

      <span className="gx-galaxy-arm arm-a" />
      <span className="gx-galaxy-arm arm-b" />
      <span className="gx-galaxy-arm arm-c" />

      <span className="gx-galaxy-star star-a" />
      <span className="gx-galaxy-star star-b" />
      <span className="gx-galaxy-star star-c" />
    </span>
  );
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function GalaxyAtlas() {
  return (
    <div className="gx-page">

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div
        className="gx-space"
        aria-hidden="true"
      />


      {/* ==================================================
          GLASS FRAME
      ================================================== */}

      <div className="gx-frame">

        <div
          className="gx-border"
          aria-hidden="true"
        />


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="gx-topbar">

          <div className="gx-topbar-copy">

            <span>
              ARCHENOVA MAP
            </span>

            <strong>
              Civilization Atlas
            </strong>

          </div>


          <div className="gx-topbar-state">

            <span>
              <i />

              6 SYSTEMS
            </span>

            <span>
              CONNECTED
            </span>

          </div>

        </header>


        {/* =================================================
            INTRO
        ================================================= */}

        <section className="gx-intro">

          <span>
            CIVILIZATION ARCHITECTURE
          </span>

          <h2>
            A connected map
            <br />
            of civilization.
          </h2>

          <p>
            Observation, governance, intelligence,
            realization, structure, and dialogue
            operate as one interdependent system.
          </p>

        </section>


        {/* =================================================
            MAP
        ================================================= */}

        <div className="gx-map">

          {/* ===============================================
              NETWORK
          =============================================== */}

          <svg
            className="gx-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            <ellipse
              cx="50"
              cy="52"
              rx="42"
              ry="25"
              className="gx-orbit stable one"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="35"
              ry="20"
              className="gx-orbit stable two"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="28"
              ry="15"
              className="gx-orbit resonance three"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="48"
              ry="30"
              className="gx-orbit resonance four"
            />


            <polyline
              points="
                25,39
                50,22
                75,39
                76,69
                50,82
                24,69
                25,39
              "
              className="gx-network"
            />


            {galaxyNodes.map(
              (
                node,
              ) => (
                <line
                  key={
                    node.id
                  }
                  x1="50"
                  y1="52"
                  x2={
                    node.x
                  }
                  y2={
                    node.y
                  }
                  className="gx-link"
                />
              ),
            )}

          </svg>


          {/* ===============================================
              CENTRAL CORE
          =============================================== */}

          <Link
            href="/imperial-house"
            className="gx-imperial"
            aria-label="Enter ArcheNova Imperial House"
          >

            <span className="gx-imperial-halo" />

            <span className="gx-imperial-disk" />

            <span className="gx-imperial-core" />

            <span className="gx-imperial-shine" />


            <span className="gx-imperial-copy">

              <small>
                CIVILIZATION CORE
              </small>

              <strong>
                ArcheNova
              </strong>

              <span>
                Imperial House
              </span>

              <em>
                Constitution · Foundation
              </em>

            </span>

          </Link>


          {/* ===============================================
              NODES
          =============================================== */}

          {galaxyNodes.map(
            (
              node,
            ) => (
              <Link
                key={
                  node.id
                }
                href={
                  node.href
                }
                className={`gx-node gx-node-${node.id}`}
                style={{
                  left:
                    `${node.x}%`,

                  top:
                    `${node.y}%`,
                }}
                aria-label={`Enter ${node.title}`}
              >

                <SpiralGalaxy
                  id={
                    node.id
                  }
                />


                <span className="gx-node-marker" />


                <span className="gx-node-label">

                  <strong>
                    {
                      node.title
                    }
                  </strong>

                  <small>
                    {
                      node.subtitle
                    }
                  </small>

                </span>

              </Link>
            ),
          )}

        </div>


        {/* =================================================
            SYSTEM LEGEND
        ================================================= */}

        <div className="gx-system-line">

          <span>
            OBSERVE
          </span>

          <i />

          <span>
            UNDERSTAND
          </span>

          <i />

          <span>
            GOVERN
          </span>

          <i />

          <span>
            REALIZE
          </span>

          <i />

          <span>
            PRESERVE
          </span>

          <i />

          <span>
            REVISE
          </span>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="gx-bottom">

          <span />

          <p>
            IN ORDER, THERE IS FREEDOM.
          </p>

          <span />

        </footer>

      </div>


      {/* ==================================================
          CSS
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .gx-page {
          position:
            relative !important;

          isolation:
            isolate;

          width:
            100% !important;

          min-width:
            0 !important;

          height:
            auto !important;

          min-height:
            0 !important;

          max-height:
            none !important;

          margin:
            0
            auto !important;

          padding:
            clamp(
              8px,
              1.4vw,
              18px
            ) !important;

          overflow:
            visible !important;

          box-sizing:
            border-box !important;

          transform:
            none !important;

          text-align:
            center;
        }


        /* ==================================================
           SPACE
        ================================================== */

        .gx-space {
          position:
            absolute;

          inset:
            -10%;

          z-index:
            -5;

          pointer-events:
            none;

          background:
            radial-gradient(
              ellipse
              at
              50%
              48%,
              rgba(
                142,
                182,
                225,
                0.055
              ),
              transparent
              42%
            ),

            radial-gradient(
              circle
              at
              18%
              30%,
              rgba(
                185,
                217,
                245,
                0.025
              ),
              transparent
              23%
            ),

            radial-gradient(
              circle
              at
              82%
              64%,
              rgba(
                190,
                220,
                245,
                0.02
              ),
              transparent
              24%
            );
        }


        .gx-space::before {
          content: "";

          position:
            absolute;

          inset:
            0;

          opacity:
            0.28;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.46
              )
              0
              0.55px,
              transparent
              0.8px
            );

          background-size:
            50px
            50px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black
              24%,
              transparent
              90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black
              24%,
              transparent
              90%
            );
        }


        /* ==================================================
           GLASS CARD
        ================================================== */

        .gx-frame {
          position:
            relative !important;

          width:
            min(
              1160px,
              100%
            ) !important;

          max-width:
            1160px !important;

          min-width:
            0 !important;

          height:
            auto !important;

          min-height:
            0 !important;

          max-height:
            none !important;

          margin:
            0
            auto !important;

          overflow:
            hidden !important;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            clamp(
              22px,
              2vw,
              30px
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                20,
                23,
                0.72
              ),
              rgba(
                6,
                7,
                9,
                0.86
              )
              54%,
              rgba(
                0,
                0,
                0,
                0.96
              )
            );

          -webkit-backdrop-filter:
            blur(
              28px
            )
            saturate(
              112%
            );

          backdrop-filter:
            blur(
              28px
            )
            saturate(
              112%
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

            0
            28px
            84px
            rgba(
              0,
              0,
              0,
              0.28
            );

          box-sizing:
            border-box !important;
        }


        .gx-frame::before {
          content: "";

          position:
            absolute;

          inset:
            0;

          z-index:
            0;

          pointer-events:
            none;

          background:
            radial-gradient(
              circle
              at
              50%
              43%,
              rgba(
                185,
                219,
                239,
                0.045
              ),
              transparent
              30%
            ),

            linear-gradient(
              125deg,
              rgba(
                255,
                255,
                255,
                0.022
              ),
              transparent
              24%,
              transparent
              73%,
              rgba(
                255,
                255,
                255,
                0.01
              )
            );
        }


        .gx-border {
          position:
            absolute;

          inset:
            1px;

          z-index:
            1;

          pointer-events:
            none;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.017
            );

          border-radius:
            inherit;
        }


        /* ==================================================
           TOP BAR
        ================================================== */

        .gx-topbar {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            18px;

          padding:
            20px
            clamp(
              20px,
              4vw,
              44px
            )
            14px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .gx-topbar-copy {
          display:
            flex;

          align-items:
            baseline;

          gap:
            10px;

          min-width:
            0;
        }


        .gx-topbar-copy
        > span {
          color:
            rgba(
              185,
              218,
              236,
              0.4
            );

          font-size:
            6px;

          font-weight:
            650;

          letter-spacing:
            0.21em;
        }


        .gx-topbar-copy
        > strong {
          color:
            rgba(
              244,
              248,
              250,
              0.7
            );

          font-size:
            10px;

          font-weight:
            410;
        }


        .gx-topbar-state {
          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size:
            5px;

          letter-spacing:
            0.12em;
        }


        .gx-topbar-state
        > span {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            6px;
        }


        .gx-topbar-state i {
          width:
            4px;

          height:
            4px;

          border-radius:
            50%;

          background:
            rgba(
              137,
              235,
              193,
              0.72
            );

          box-shadow:
            0
            0
            9px
            rgba(
              137,
              235,
              193,
              0.28
            );
        }


        /* ==================================================
           INTRO
        ================================================== */

        .gx-intro {
          position:
            relative;

          z-index:
            4;

          width:
            min(
              620px,
              calc(
                100% -
                36px
              )
            );

          margin:
            0
            auto;

          padding:
            23px
            0
            5px;

          text-align:
            center;
        }


        .gx-intro
        > span {
          color:
            rgba(
              186,
              219,
              237,
              0.34
            );

          font-size:
            6px;

          font-weight:
            650;

          letter-spacing:
            0.22em;
        }


        .gx-intro h2 {
          margin:
            12px
            0
            0;

          color:
            rgba(
              248,
              250,
              252,
              0.94
            );

          font-size:
            clamp(
              24px,
              2.7vw,
              38px
            ) !important;

          font-weight:
            280;

          line-height:
            1.02;

          letter-spacing:
            -0.04em;

          text-align:
            center !important;
        }


        .gx-intro p {
          width:
            min(
              470px,
              100%
            );

          margin:
            13px
            auto
            0;

          color:
            rgba(
              217,
              227,
              234,
              0.34
            );

          font-size:
            8px !important;

          line-height:
            1.65 !important;

          text-align:
            center !important;
        }


        /* ==================================================
           MAP

           Fixed coordinate space.
           This is the key to preventing Windows / Edge crush.
        ================================================== */

        .gx-map {
          position:
            relative !important;

          z-index:
            3;

          width:
            calc(
              100% -
              clamp(
                24px,
                5vw,
                62px
              )
            ) !important;

          min-width:
            0 !important;

          height:
            clamp(
              480px,
              46vw,
              620px
            ) !important;

          min-height:
            480px !important;

          max-height:
            620px !important;

          margin:
            0
            auto !important;

          overflow:
            hidden !important;

          box-sizing:
            border-box !important;

          transform:
            none !important;
        }


        /* ==================================================
           SVG
        ================================================== */

        .gx-lines {
          position:
            absolute !important;

          inset:
            0 !important;

          z-index:
            1;

          display:
            block !important;

          width:
            100% !important;

          height:
            100% !important;

          max-width:
            none !important;

          max-height:
            none !important;

          overflow:
            visible !important;

          pointer-events:
            none;
        }


        .gx-orbit {
          fill:
            none;

          stroke:
            rgba(
              190,
              221,
              239,
              0.075
            );

          stroke-width:
            0.11;

          vector-effect:
            non-scaling-stroke;
        }


        .gx-orbit.two {
          stroke:
            rgba(
              255,
              255,
              255,
              0.05
            );

          stroke-dasharray:
            1.1
            1.5;
        }


        .gx-orbit.three {
          stroke:
            rgba(
              172,
              215,
              239,
              0.095
            );
        }


        .gx-orbit.four {
          stroke:
            rgba(
              255,
              255,
              255,
              0.035
            );
        }


        .gx-network {
          fill:
            none;

          stroke:
            rgba(
              190,
              220,
              237,
              0.1
            );

          stroke-width:
            0.13;

          vector-effect:
            non-scaling-stroke;
        }


        .gx-link {
          stroke:
            rgba(
              190,
              220,
              237,
              0.065
            );

          stroke-width:
            0.1;

          vector-effect:
            non-scaling-stroke;
        }


        /* ==================================================
           CENTRAL CORE
        ================================================== */

        .gx-imperial {
          position:
            absolute;

          left:
            50%;

          top:
            52%;

          z-index:
            10;

          width:
            clamp(
              116px,
              13vw,
              160px
            );

          aspect-ratio:
            1;

          display:
            grid;

          place-items:
            center;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          color:
            inherit;

          text-decoration:
            none;

          max-width:
            none !important;

          max-height:
            none !important;

          overflow:
            visible !important;
        }


        .gx-imperial::after {
          display:
            none !important;
        }


        .gx-imperial-halo {
          position:
            absolute;

          inset:
            -42%;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                184,
                223,
                245,
                0.08
              ),
              transparent
              67%
            );

          filter:
            blur(
              7px
            );

          transition:
            transform
            0.45s ease;
        }


        .gx-imperial-disk {
          position:
            absolute;

          inset:
            8%;

          border:
            1px solid
            rgba(
              202,
              229,
              244,
              0.11
            );

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                170,
                216,
                240,
                0.06
              ),
              transparent
              65%
            );
        }


        .gx-imperial-core {
          position:
            absolute;

          inset:
            27%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.15
            );

          border-radius:
            50%;

          background:
            radial-gradient(
              circle
              at
              38%
              32%,
              rgba(
                255,
                255,
                255,
                0.31
              ),
              rgba(
                179,
                219,
                240,
                0.1
              )
              23%,
              rgba(
                5,
                7,
                9,
                0.92
              )
              68%
            );

          box-shadow:
            0
            0
            30px
            rgba(
              160,
              207,
              235,
              0.09
            ),

            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.12
            );
        }


        .gx-imperial-shine {
          position:
            absolute;

          left:
            39%;

          top:
            35%;

          width:
            6px;

          height:
            6px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.84
            );

          box-shadow:
            0
            0
            15px
            rgba(
              220,
              239,
              250,
              0.7
            );
        }


        .gx-imperial-copy {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          width:
            120%;

          text-align:
            center;
        }


        .gx-imperial-copy
        > small {
          color:
            rgba(
              188,
              221,
              239,
              0.4
            );

          font-size:
            5px;

          font-weight:
            650;

          letter-spacing:
            0.18em;
        }


        .gx-imperial-copy
        > strong {
          margin-top:
            6px;

          color:
            rgba(
              250,
              252,
              253,
              0.94
            );

          font-size:
            clamp(
              13px,
              1.5vw,
              17px
            );

          font-weight:
            430;
        }


        .gx-imperial-copy
        > span {
          margin-top:
            4px;

          color:
            rgba(
              232,
              240,
              245,
              0.48
            );

          font-size:
            7px;
        }


        .gx-imperial-copy
        > em {
          margin-top:
            3px;

          color:
            rgba(
              255,
              255,
              255,
              0.21
            );

          font-size:
            5px;

          font-style:
            normal;

          letter-spacing:
            0.07em;
        }


        /* ==================================================
           NODE
        ================================================== */

        .gx-node {
          position:
            absolute;

          z-index:
            7;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          width:
            clamp(
              104px,
              11vw,
              144px
            );

          max-width:
            none !important;

          max-height:
            none !important;

          overflow:
            visible !important;

          transform:
            translate(
              -50%,
              -50%
            );

          color:
            inherit;

          text-decoration:
            none;

          text-align:
            center;

          transition:
            transform
            0.38s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        .gx-node::after {
          display:
            none !important;
        }


        /* ==================================================
           GALAXY
        ================================================== */

        .gx-galaxy {
          position:
            relative;

          display:
            block;

          width:
            clamp(
              56px,
              6vw,
              78px
            );

          aspect-ratio:
            1;

          border-radius:
            50%;

          flex:
            0
            0
            auto;

          transition:
            filter
            0.3s ease;
        }


        .gx-galaxy-halo {
          position:
            absolute;

          inset:
            -28%;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                166,
                211,
                238,
                0.09
              ),
              transparent
              66%
            );

          filter:
            blur(
              6px
            );
        }


        .gx-galaxy-core {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            7px;

          height:
            7px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

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
            14px
            rgba(
              205,
              235,
              250,
              0.58
            );
        }


        .gx-galaxy-arm {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            72%;

          height:
            27%;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              195,
              226,
              243,
              0.23
            );

          border-radius:
            50%;

          transform-origin:
            0
            50%;
        }


        .gx-galaxy-arm.arm-a {
          transform:
            translateY(
              -50%
            )
            rotate(
              16deg
            );
        }


        .gx-galaxy-arm.arm-b {
          transform:
            translateY(
              -50%
            )
            rotate(
              136deg
            );
        }


        .gx-galaxy-arm.arm-c {
          transform:
            translateY(
              -50%
            )
            rotate(
              256deg
            );
        }


        .gx-galaxy-star {
          position:
            absolute;

          width:
            2px;

          height:
            2px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );
        }


        .gx-galaxy-star.star-a {
          left:
            72%;

          top:
            26%;
        }


        .gx-galaxy-star.star-b {
          left:
            28%;

          top:
            73%;
        }


        .gx-galaxy-star.star-c {
          left:
            77%;

          top:
            68%;
        }


        .gx-node-marker {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            2px;

          height:
            2px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.68
            );
        }


        .gx-node-label {
          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          margin-top:
            8px;

          text-align:
            center;
        }


        .gx-node-label
        strong {
          color:
            rgba(
              244,
              248,
              250,
              0.75
            );

          font-size:
            clamp(
              9px,
              1vw,
              12px
            );

          font-weight:
            430;
        }


        .gx-node-label
        small {
          margin-top:
            3px;

          color:
            rgba(
              216,
              227,
              233,
              0.27
            );

          font-size:
            5px;

          line-height:
            1.35;
        }


        /* ==================================================
           SYSTEM LINE
        ================================================== */

        .gx-system-line {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          flex-wrap:
            wrap;

          gap:
            7px;

          width:
            min(
              720px,
              calc(
                100% -
                36px
              )
            );

          margin:
            0
            auto;

          padding:
            11px
            0;

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
              0.21
            );

          font-size:
            5px;

          letter-spacing:
            0.12em;
        }


        .gx-system-line i {
          width:
            10px;

          height:
            1px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .gx-bottom {
          position:
            relative;

          z-index:
            5;

          display:
            grid;

          grid-template-columns:
            minmax(
              24px,
              80px
            )
            auto
            minmax(
              24px,
              80px
            );

          align-items:
            center;

          justify-content:
            center;

          gap:
            12px;

          padding:
            7px
            20px
            24px;
        }


        .gx-bottom
        > span {
          width:
            100%;

          height:
            1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.1
              )
            );
        }


        .gx-bottom
        > span:last-child {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.1
              ),
              transparent
            );
        }


        .gx-bottom p {
          margin:
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size:
            6px !important;

          letter-spacing:
            0.2em;

          white-space:
            nowrap;

          text-align:
            center !important;
        }


        /* ==================================================
           HOVER
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .gx-node:hover {
            transform:
              translate(
                -50%,
                -50%
              )
              translateY(
                -3px
              );
          }


          .gx-node:hover
          .gx-galaxy {
            filter:
              brightness(
                1.22
              );
          }


          .gx-node:hover
          .gx-node-label
          strong {
            color:
              rgba(
                255,
                255,
                255,
                0.96
              );
          }


          .gx-imperial:hover
          .gx-imperial-halo {
            transform:
              scale(
                1.07
              );
          }

        }


        /* ==================================================
           WINDOWS / EDGE / DESKTOP SAFETY
        ================================================== */

        @media (
          min-width: 769px
        ) {

          .archenova-twin-home
          #galaxy-atlas {
            height:
              auto !important;

            min-height:
              100svh !important;

            max-height:
              none !important;

            overflow:
              visible !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          > .gx-page {
            width:
              100% !important;

            max-width:
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            overflow:
              visible !important;

            transform:
              none !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          .gx-frame {
            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          .gx-map {
            flex:
              none !important;

            max-width:
              none !important;
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 980px
        ) and (
          min-width: 769px
        ) {

          .gx-map {
            height:
              520px !important;

            min-height:
              520px !important;

            max-height:
              520px !important;
          }

        }


        /* ==================================================
           MOBILE

           Full card visibility has priority.
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .archenova-twin-home
          #galaxy-atlas {
            height:
              auto !important;

            min-height:
              auto !important;

            max-height:
              none !important;

            padding:
              70px
              8px
              78px !important;

            overflow:
              visible !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          > .gx-page {
            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            overflow:
              visible !important;
          }


          .gx-page {
            padding:
              4px !important;
          }


          .gx-frame {
            width:
              100% !important;

            max-width:
              100% !important;

            height:
              auto !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            border-radius:
              22px;
          }


          .gx-topbar {
            padding:
              17px
              15px
              12px;
          }


          .gx-topbar-copy {
            flex-direction:
              column;

            align-items:
              flex-start;

            gap:
              3px;
          }


          .gx-topbar-copy
          > strong {
            font-size:
              8px;
          }


          .gx-topbar-state
          > span:last-child {
            display:
              none;
          }


          .gx-intro {
            width:
              calc(
                100% -
                28px
              );

            padding:
              20px
              0
              4px;
          }


          .gx-intro h2 {
            font-size:
              clamp(
                24px,
                8vw,
                33px
              ) !important;
          }


          .gx-intro p {
            width:
              min(
                300px,
                100%
              );

            font-size:
              7px !important;
          }


          .gx-map {
            width:
              100% !important;

            height:
              580px !important;

            min-height:
              580px !important;

            max-height:
              580px !important;

            overflow:
              hidden !important;
          }


          /* Mobile galaxy layout */

          .gx-node-governance {
            left:
              50% !important;

            top:
              14% !important;
          }


          .gx-node-observatory {
            left:
              23% !important;

            top:
              34% !important;
          }


          .gx-node-intelligence {
            left:
              77% !important;

            top:
              34% !important;
          }


          .gx-node-dialogue {
            left:
              23% !important;

            top:
              70% !important;
          }


          .gx-node-realization {
            left:
              77% !important;

            top:
              70% !important;
          }


          .gx-node-structure {
            left:
              50% !important;

            top:
              88% !important;
          }


          .gx-imperial {
            width:
              112px;

            top:
              52%;
          }


          .gx-node {
            width:
              92px;
          }


          .gx-galaxy {
            width:
              50px;
          }


          .gx-node-label
          strong {
            font-size:
              8px;
          }


          .gx-node-label
          small {
            display:
              none;
          }


          .gx-system-line {
            width:
              calc(
                100% -
                24px
              );

            gap:
              4px;

            padding:
              10px
              0;
          }


          .gx-system-line
          span {
            font-size:
              4px;
          }


          .gx-system-line i {
            width:
              5px;
          }


          .gx-bottom {
            padding-bottom:
              19px;
          }


          .gx-bottom p {
            font-size:
              5px !important;

            letter-spacing:
              0.16em;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .gx-map {
            height:
              550px !important;

            min-height:
              550px !important;

            max-height:
              550px !important;
          }


          .gx-node {
            width:
              86px;
          }


          .gx-galaxy {
            width:
              47px;
          }


          .gx-imperial {
            width:
              104px;
          }


          .gx-imperial-copy
          > em {
            display:
              none;
          }


          .gx-system-line {
            display:
              grid;

            grid-template-columns:
              repeat(
                3,
                auto
              );

            justify-content:
              center;

            row-gap:
              4px;
          }


          .gx-system-line i {
            display:
              none;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .gx-node,
          .gx-galaxy,
          .gx-imperial-halo {
            transition:
              none !important;
          }

        }

      `}</style>
    </div>
  );
}