"use client";

import Link from "next/link";

type GalaxyNode = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  x: number;
  y: number;
};

const galaxyNodes: GalaxyNode[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Observation and Record",
    href: "/episteme",
    x: 24,
    y: 38,
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Order and Structure",
    href: "/governance",
    x: 50,
    y: 20,
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Intelligence and Analysis",
    href: "/intelligence",
    x: 76,
    y: 38,
  },
  {
    id: "realization",
    title: "Realization",
    subtitle: "Implementation and Creation",
    href: "/realization",
    x: 76,
    y: 70,
  },
  {
    id: "structure",
    title: "Structure",
    subtitle: "System and Succession",
    href: "/architecture",
    x: 50,
    y: 84,
  },
  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Dialogue and Resonance",
    href: "/dialogue",
    x: 24,
    y: 70,
  },
];

function GalaxyMark({
  id,
}: {
  id: string;
}) {
  return (
    <span
      className={`anm-galaxy anm-galaxy--${id}`}
      aria-hidden="true"
    >
      <span className="anm-galaxy__halo" />
      <span className="anm-galaxy__disk" />
      <span className="anm-galaxy__arm anm-galaxy__arm--a" />
      <span className="anm-galaxy__arm anm-galaxy__arm--b" />
      <span className="anm-galaxy__arm anm-galaxy__arm--c" />
      <span className="anm-galaxy__core" />
      <span className="anm-galaxy__star anm-galaxy__star--a" />
      <span className="anm-galaxy__star anm-galaxy__star--b" />
      <span className="anm-galaxy__star anm-galaxy__star--c" />
    </span>
  );
}

export default function GalaxyAtlas() {
  return (
    <div className="anm-atlas">

      {/* ==================================================
          DEEP UNIVERSE
      ================================================== */}

      <div
        className="anm-deep-space"
        aria-hidden="true"
      />

      <div
        className="anm-cluster-field"
        aria-hidden="true"
      >
        <span className="anm-cluster anm-cluster--a" />
        <span className="anm-cluster anm-cluster--b" />
        <span className="anm-cluster anm-cluster--c" />
        <span className="anm-cluster anm-cluster--d" />
      </div>


      {/* ==================================================
          GLASS SHELL
      ================================================== */}

      <div className="anm-shell">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="anm-header">

          <div className="anm-header__identity">
            <span>
              ARCHENOVA MAP
            </span>

            <strong>
              Civilization Atlas
            </strong>
          </div>


          <p>
            Civilization as a connected
            architecture of observation,
            intelligence, governance,
            realization, structure,
            and dialogue.
          </p>

        </header>


        {/* =================================================
            UNIVERSE
        ================================================= */}

        <div className="anm-universe">

          {/* ===============================================
              COSMIC FILAMENTS
          =============================================== */}

          <div
            className="anm-filaments"
            aria-hidden="true"
          >
            <span className="anm-filament anm-filament--a" />
            <span className="anm-filament anm-filament--b" />
            <span className="anm-filament anm-filament--c" />
          </div>


          {/* ===============================================
              ORBITAL / NETWORK SYSTEM
          =============================================== */}

          <svg
            className="anm-network"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <ellipse
              cx="50"
              cy="52"
              rx="43"
              ry="29"
              className="anm-orbit anm-orbit--outer"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="35"
              ry="23"
              className="anm-orbit anm-orbit--middle"
            />

            <ellipse
              cx="50"
              cy="52"
              rx="27"
              ry="17"
              className="anm-orbit anm-orbit--inner"
            />

            <polyline
              points="
                24,38
                50,20
                76,38
                76,70
                50,84
                24,70
                24,38
              "
              className="anm-hex-network"
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
                  className="anm-core-link"
                />
              ),
            )}
          </svg>


          {/* ===============================================
              CENTRAL CORE
          =============================================== */}

          <Link
            href="/imperial-house"
            className="anm-core"
            aria-label="Enter Imperial House"
          >
            <span
              className="anm-core__halo"
              aria-hidden="true"
            />

            <span
              className="anm-core__ring anm-core__ring--a"
              aria-hidden="true"
            />

            <span
              className="anm-core__ring anm-core__ring--b"
              aria-hidden="true"
            />

            <span
              className="anm-core__body"
              aria-hidden="true"
            />

            <span className="anm-core__copy">
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
              GALAXY NODES
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
                className={`anm-node anm-node--${node.id}`}
                style={{
                  left:
                    `${node.x}%`,

                  top:
                    `${node.y}%`,
                }}
                aria-label={`Enter ${node.title}`}
              >
                <GalaxyMark
                  id={
                    node.id
                  }
                />

                <span className="anm-node__copy">
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
            FOOTER
        ================================================= */}

        <footer className="anm-footer">

          <span />

          <p>
            IN ORDER, THERE IS FREEDOM.
          </p>

          <span />

        </footer>

      </div>


      {/* ==================================================
          COMPONENT CSS
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           ROOT
        ================================================== */

        .anm-atlas {
          position: relative;

          isolation: isolate;

          width:
            min(
              1180px,
              100%
            );

          margin:
            0
            auto;

          padding:
            clamp(
              16px,
              2vw,
              26px
            );

          overflow: visible;

          color:
            rgba(
              248,
              250,
              252,
              0.94
            );
        }


        /* ==================================================
           DEEP SPACE
        ================================================== */

        .anm-deep-space {
          position: absolute;

          inset:
            -10%;

          z-index: -5;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              48%,
              rgba(
                122,
                168,
                222,
                0.055
              ),
              transparent
              34%
            ),

            radial-gradient(
              circle
              at
              18%
              30%,
              rgba(
                184,
                201,
                255,
                0.03
              ),
              transparent
              27%
            ),

            radial-gradient(
              circle
              at
              84%
              60%,
              rgba(
                255,
                218,
                166,
                0.025
              ),
              transparent
              26%
            );
        }


        .anm-deep-space::before {
          content: "";

          position: absolute;

          inset: 0;

          opacity: 0.36;

          background-image:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.44
              )
              0
              0.55px,
              transparent
              0.8px
            );

          background-size:
            46px
            46px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black
              30%,
              transparent
              90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black
              30%,
              transparent
              90%
            );
        }


        /* ==================================================
           DISTANT CLUSTERS
        ================================================== */

        .anm-cluster-field {
          position: absolute;

          inset: 0;

          z-index: -4;

          pointer-events: none;
        }


        .anm-cluster {
          position: absolute;

          width:
            clamp(
              70px,
              10vw,
              150px
            );

          aspect-ratio:
            1;

          border-radius:
            50%;

          opacity: 0.22;

          filter:
            blur(
              1px
            );

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                0.34
              )
              0
              1px,
              transparent
              1.3px
            );

          background-size:
            12px
            12px;
        }


        .anm-cluster--a {
          top: 11%;
          left: 7%;

          transform:
            rotate(
              18deg
            );
        }


        .anm-cluster--b {
          top: 16%;
          right: 8%;

          transform:
            scale(
              0.72
            )
            rotate(
              -22deg
            );
        }


        .anm-cluster--c {
          bottom: 13%;
          left: 12%;

          transform:
            scale(
              0.68
            );
        }


        .anm-cluster--d {
          right: 12%;
          bottom: 10%;

          transform:
            scale(
              0.78
            )
            rotate(
              30deg
            );
        }


        /* ==================================================
           SHELL

           Black liquid-glass aesthetic retained.
        ================================================== */

        .anm-shell {
          position: relative;

          width: 100%;

          overflow: hidden;

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
                13,
                15,
                18,
                0.72
              ),
              rgba(
                2,
                3,
                5,
                0.91
              )
              58%,
              rgba(
                0,
                0,
                0,
                0.98
              )
            );

          -webkit-backdrop-filter:
            blur(
              24px
            )
            saturate(
              112%
            );

          backdrop-filter:
            blur(
              24px
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
            90px
            rgba(
              0,
              0,
              0,
              0.25
            );
        }


        .anm-shell::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              120deg,
              rgba(
                255,
                255,
                255,
                0.035
              ),
              transparent
              24%,
              transparent
              72%,
              rgba(
                180,
                225,
                245,
                0.018
              )
            );
        }


        /* ==================================================
           HEADER
        ================================================== */

        .anm-header {
          position: relative;

          z-index: 4;

          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap:
            30px;

          padding:
            clamp(
              24px,
              3vw,
              38px
            )
            clamp(
              24px,
              4vw,
              48px
            )
            14px;
        }


        .anm-header__identity {
          display: flex;

          flex-direction:
            column;

          gap: 7px;

          text-align: left;
        }


        .anm-header__identity
        > span {
          color:
            rgba(
              188,
              219,
              236,
              0.42
            );

          font-size: 7px;

          font-weight: 650;

          letter-spacing:
            0.23em;
        }


        .anm-header__identity
        > strong {
          color:
            rgba(
              246,
              249,
              251,
              0.83
            );

          font-size:
            clamp(
              16px,
              1.7vw,
              22px
            );

          font-weight: 390;

          letter-spacing:
            -0.015em;
        }


        .anm-header
        > p {
          width:
            min(
              420px,
              48%
            );

          margin: 0;

          color:
            rgba(
              218,
              228,
              234,
              0.32
            );

          font-size:
            9px;

          line-height:
            1.65;

          text-align:
            right;
        }


        /* ==================================================
           UNIVERSE

           Single coordinate system.
           No 100dvh / max-height compression.
        ================================================== */

        .anm-universe {
          position: relative;

          width:
            calc(
              100% -
              clamp(
                30px,
                5vw,
                70px
              )
            );

          aspect-ratio:
            16 / 9.5;

          min-height:
            540px;

          margin:
            0
            auto;

          overflow: visible;
        }


        /* ==================================================
           FILAMENTS
        ================================================== */

        .anm-filaments {
          position: absolute;

          inset:
            6%
            4%;

          z-index: 0;

          pointer-events: none;

          opacity:
            0.32;
        }


        .anm-filament {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 78%;
          height: 1px;

          transform-origin:
            center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                145,
                190,
                220,
                0.13
              ),
              transparent
            );
        }


        .anm-filament--a {
          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              20deg
            );
        }


        .anm-filament--b {
          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              -22deg
            );
        }


        .anm-filament--c {
          transform:
            translate(
              -50%,
              -50%
            )
            rotate(
              90deg
            );
        }


        /* ==================================================
           NETWORK
        ================================================== */

        .anm-network {
          position: absolute;

          inset: 0;

          z-index: 1;

          width: 100%;
          height: 100%;

          overflow: visible;

          pointer-events: none;
        }


        .anm-orbit {
          fill: none;

          stroke:
            rgba(
              196,
              224,
              239,
              0.07
            );

          stroke-width:
            0.12;

          vector-effect:
            non-scaling-stroke;
        }


        .anm-orbit--outer {
          stroke:
            rgba(
              194,
              223,
              239,
              0.055
            );
        }


        .anm-orbit--middle {
          stroke:
            rgba(
              255,
              255,
              255,
              0.065
            );

          stroke-dasharray:
            1.2
            1.5;
        }


        .anm-orbit--inner {
          stroke:
            rgba(
              170,
              213,
              237,
              0.09
            );
        }


        .anm-hex-network {
          fill: none;

          stroke:
            rgba(
              190,
              220,
              237,
              0.105
            );

          stroke-width:
            0.14;

          vector-effect:
            non-scaling-stroke;
        }


        .anm-core-link {
          stroke:
            rgba(
              190,
              220,
              237,
              0.075
            );

          stroke-width:
            0.11;

          vector-effect:
            non-scaling-stroke;
        }


        /* ==================================================
           CORE
        ================================================== */

        .anm-core {
          position: absolute;

          left: 50%;
          top: 52%;

          z-index: 8;

          display: grid;

          width:
            clamp(
              122px,
              15vw,
              174px
            );

          aspect-ratio:
            1;

          place-items: center;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          color: inherit;

          text-decoration:
            none;
        }


        .anm-core::after {
          display:
            none !important;
        }


        .anm-core__halo {
          position: absolute;

          inset:
            -38%;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                190,
                226,
                245,
                0.08
              ),
              transparent
              66%
            );

          filter:
            blur(
              7px
            );

          transition:
            opacity
              0.35s ease,
            transform
              0.45s ease;
        }


        .anm-core__ring {
          position: absolute;

          border:
            1px solid
            rgba(
              205,
              230,
              244,
              0.11
            );

          border-radius:
            50%;
        }


        .anm-core__ring--a {
          inset:
            4%;
        }


        .anm-core__ring--b {
          inset:
            17%;

          border-color:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        .anm-core__body {
          position: absolute;

          inset:
            25%;

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
              40%
              34%,
              rgba(
                255,
                255,
                255,
                0.28
              ),
              rgba(
                166,
                203,
                225,
                0.08
              )
              28%,
              rgba(
                0,
                0,
                0,
                0.88
              )
              70%
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
              0.12
            ),

            0
            0
            38px
            rgba(
              155,
              205,
              235,
              0.08
            );
        }


        .anm-core__copy {
          position: relative;

          z-index: 4;

          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          width:
            112%;

          text-align:
            center;
        }


        .anm-core__copy
        small {
          color:
            rgba(
              185,
              220,
              239,
              0.43
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.19em;
        }


        .anm-core__copy
        strong {
          margin-top:
            7px;

          color:
            rgba(
              249,
              251,
              252,
              0.95
            );

          font-size:
            clamp(
              13px,
              1.5vw,
              18px
            );

          font-weight:
            430;

          letter-spacing:
            -0.02em;
        }


        .anm-core__copy
        > span {
          margin-top:
            5px;

          color:
            rgba(
              235,
              242,
              246,
              0.52
            );

          font-size:
            7px;
        }


        .anm-core__copy
        em {
          margin-top:
            4px;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size:
            5px;

          font-style:
            normal;

          letter-spacing:
            0.08em;
        }


        /* ==================================================
           NODE
        ================================================== */

        .anm-node {
          position: absolute;

          z-index: 6;

          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          width:
            clamp(
              110px,
              12vw,
              150px
            );

          transform:
            translate(
              -50%,
              -50%
            );

          color: inherit;

          text-align:
            center;

          text-decoration:
            none;

          transition:
            transform
              0.4s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }


        .anm-node::after {
          display:
            none !important;
        }


        /* ==================================================
           GALAXY MARK
        ================================================== */

        .anm-galaxy {
          position: relative;

          display: block;

          width:
            clamp(
              58px,
              6.7vw,
              86px
            );

          aspect-ratio:
            1;

          border-radius:
            50%;
        }


        .anm-galaxy__halo {
          position: absolute;

          inset:
            -24%;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                166,
                212,
                239,
                0.09
              ),
              transparent
              65%
            );

          filter:
            blur(
              6px
            );
        }


        .anm-galaxy__disk {
          position: absolute;

          inset:
            15%;

          border-radius:
            50%;

          background:
            radial-gradient(
              ellipse
              at center,
              rgba(
                255,
                255,
                255,
                0.6
              )
              0%,
              rgba(
                188,
                221,
                240,
                0.26
              )
              10%,
              rgba(
                109,
                159,
                197,
                0.09
              )
              34%,
              transparent
              67%
            );

          transform:
            rotate(
              -18deg
            )
            scaleX(
              1.45
            )
            scaleY(
              0.64
            );

          filter:
            blur(
              0.2px
            );
        }


        .anm-galaxy__core {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 7px;
          height: 7px;

          border-radius:
            50%;

          transform:
            translate(
              -50%,
              -50%
            );

          background:
            rgba(
              255,
              255,
              255,
              0.88
            );

          box-shadow:
            0
            0
            14px
            rgba(
              205,
              234,
              249,
              0.62
            );
        }


        .anm-galaxy__arm {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 78%;
          height: 28%;

          border:
            1px solid
            transparent;

          border-top-color:
            rgba(
              204,
              231,
              246,
              0.2
            );

          border-radius:
            50%;

          transform-origin:
            0
            50%;
        }


        .anm-galaxy__arm--a {
          transform:
            translate(
              0,
              -50%
            )
            rotate(
              18deg
            );
        }


        .anm-galaxy__arm--b {
          transform:
            translate(
              0,
              -50%
            )
            rotate(
              138deg
            );
        }


        .anm-galaxy__arm--c {
          transform:
            translate(
              0,
              -50%
            )
            rotate(
              258deg
            );
        }


        .anm-galaxy__star {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.72
            );
        }


        .anm-galaxy__star--a {
          top: 22%;
          left: 69%;
        }


        .anm-galaxy__star--b {
          top: 72%;
          left: 30%;
        }


        .anm-galaxy__star--c {
          top: 65%;
          left: 78%;
        }


        /* ==================================================
           NODE COPY
        ================================================== */

        .anm-node__copy {
          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          margin-top:
            8px;
        }


        .anm-node__copy
        strong {
          color:
            rgba(
              244,
              248,
              250,
              0.76
            );

          font-size:
            clamp(
              9px,
              1vw,
              12px
            );

          font-weight:
            430;

          letter-spacing:
            -0.008em;
        }


        .anm-node__copy
        small {
          margin-top:
            3px;

          color:
            rgba(
              216,
              227,
              233,
              0.26
            );

          font-size:
            5px;

          line-height:
            1.35;
        }


        /* ==================================================
           INTERACTION
        ================================================== */

        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .anm-node:hover {
            transform:
              translate(
                -50%,
                -50%
              )
              translateY(
                -3px
              );
          }


          .anm-node:hover
          .anm-galaxy {
            filter:
              brightness(
                1.15
              );
          }


          .anm-node:hover
          .anm-node__copy
          strong {
            color:
              rgba(
                255,
                255,
                255,
                0.96
              );
          }


          .anm-core:hover
          .anm-core__halo {
            opacity: 1;

            transform:
              scale(
                1.08
              );
          }

        }


        /* ==================================================
           FOOTER
        ================================================== */

        .anm-footer {
          position: relative;

          z-index: 4;

          display: grid;

          grid-template-columns:
            minmax(
              30px,
              90px
            )
            auto
            minmax(
              30px,
              90px
            );

          align-items: center;

          justify-content:
            center;

          gap: 14px;

          padding:
            10px
            24px
            28px;
        }


        .anm-footer
        > span {
          width: 100%;
          height: 1px;

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


        .anm-footer
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


        .anm-footer
        p {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size:
            6px;

          letter-spacing:
            0.22em;

          white-space:
            nowrap;
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 980px
        ) {

          .anm-atlas {
            padding:
              14px;
          }


          .anm-universe {
            width:
              calc(
                100% -
                28px
              );

            min-height:
              500px;
          }


          .anm-header {
            padding:
              24px
              26px
              10px;
          }

        }


        /* ==================================================
           MOBILE

           Important:
           Not a compressed desktop map.
           Same architecture, vertical coordinate system.
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .anm-atlas {
            width: 100%;

            max-width:
              100%;

            padding:
              8px;

            overflow:
              visible;
          }


          .anm-shell {
            border-radius:
              24px;
          }


          .anm-header {
            flex-direction:
              column;

            align-items:
              center;

            gap:
              12px;

            padding:
              24px
              18px
              12px;

            text-align:
              center;
          }


          .anm-header__identity {
            align-items:
              center;

            text-align:
              center;
          }


          .anm-header
          > p {
            width:
              min(
                330px,
                100%
              );

            text-align:
              center;

            font-size:
              8px;

            line-height:
              1.6;
          }


          .anm-universe {
            width:
              100%;

            aspect-ratio:
              auto;

            min-height:
              620px;

            margin:
              0
              auto;

            overflow:
              hidden;
          }


          /*
           * Mobile positions:
           * intentionally expanded vertically.
           */

          .anm-node--governance {
            left:
              50% !important;

            top:
              13% !important;
          }


          .anm-node--observatory {
            left:
              23% !important;

            top:
              33% !important;
          }


          .anm-node--intelligence {
            left:
              77% !important;

            top:
              33% !important;
          }


          .anm-node--dialogue {
            left:
              23% !important;

            top:
              70% !important;
          }


          .anm-node--realization {
            left:
              77% !important;

            top:
              70% !important;
          }


          .anm-node--structure {
            left:
              50% !important;

            top:
              88% !important;
          }


          .anm-core {
            left:
              50%;

            top:
              51%;

            width:
              126px;
          }


          .anm-network {
            opacity:
              0.65;
          }


          .anm-galaxy {
            width:
              58px;
          }


          .anm-node {
            width:
              104px;
          }


          .anm-node__copy
          strong {
            font-size:
              9px;
          }


          .anm-node__copy
          small {
            display:
              none;
          }


          .anm-footer {
            padding:
              12px
              16px
              24px;

            grid-template-columns:
              24px
              auto
              24px;

            gap:
              9px;
          }


          .anm-footer
          p {
            font-size:
              5px;

            letter-spacing:
              0.17em;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .anm-universe {
            min-height:
              580px;
          }


          .anm-node {
            width:
              92px;
          }


          .anm-galaxy {
            width:
              52px;
          }


          .anm-core {
            width:
              112px;
          }


          .anm-core__copy
          strong {
            font-size:
              13px;
          }


          .anm-core__copy
          em {
            display:
              none;
          }

        }


        /* ==================================================
           WINDOWS / EDGE RESILIENCE

           Avoid viewport-height based compression.
           Avoid nested scroll containers.
        ================================================== */

        @media (
          min-width: 769px
        ) {

          .archenova-twin-home
          #galaxy-atlas
          > .anm-atlas {
            width:
              min(
                1180px,
                100%
              ) !important;

            max-width:
              1180px !important;

            min-height:
              0 !important;

            max-height:
              none !important;

            overflow:
              visible !important;
          }


          .archenova-twin-home
          #galaxy-atlas
          .anm-shell,

          .archenova-twin-home
          #galaxy-atlas
          .anm-universe {
            max-height:
              none !important;

            overflow:
              visible;
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .anm-node,
          .anm-core__halo {
            transition:
              none !important;
          }

        }

      `}</style>
    </div>
  );
}