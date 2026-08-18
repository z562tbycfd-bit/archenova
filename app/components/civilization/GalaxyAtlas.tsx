"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type MapSection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  index: string;
  status: string;
};

const sections: MapSection[] = [
  {
    id: "observatory",
    title: "Observatory",
    subtitle: "Observe reality",
    description:
      "Evidence, records, scientific observation, and persistent reality contact.",
    href: "/episteme",
    index: "01",
    status: "ACTIVE",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Interpret change",
    description:
      "Signals, synthesis, analysis, and emerging civilizational transitions.",
    href: "/civilization-intelligence",
    index: "02",
    status: "LIVE",
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Coordinate power",
    description:
      "Institutional architecture, responsibility, control, and durable order.",
    href: "/governance",
    index: "03",
    status: "SYSTEM",
  },
  {
    id: "realization",
    title: "Realization",
    subtitle: "Build capability",
    description:
      "Engineering, implementation, infrastructure, and physical deployment.",
    href: "/realization",
    index: "04",
    status: "BUILD",
  },
  {
    id: "structure",
    title: "Architecture",
    subtitle: "Preserve continuity",
    description:
      "Civilization-scale structures, succession, memory, and long-term design.",
    href: "/architecture",
    index: "05",
    status: "CORE",
  },
  {
    id: "dialogue",
    title: "Dialogue",
    subtitle: "Challenge assumptions",
    description:
      "Inquiry, revision, exchange, and structured confrontation with uncertainty.",
    href: "/dialogue",
    index: "06",
    status: "OPEN",
  },
];

export default function GalaxyAtlas() {
  const [activeId, setActiveId] =
    useState<string>("intelligence");

  const activeSection =
    useMemo(
      () =>
        sections.find(
          (section) =>
            section.id === activeId,
        ) ?? sections[0],
      [activeId],
    );

  return (
    <section className="an-navmap">
      <div
        className="an-navmap__ambient"
        aria-hidden="true"
      />

      <div className="an-navmap__shell">
        {/* ==================================================
            TOP BAR
        ================================================== */}

        <header className="an-navmap__top">
          <div className="an-navmap__brand">
            <span>ARCHENOVA</span>

            <strong>
              Civilization Map
            </strong>
          </div>

          <div className="an-navmap__state">
            <span>
              <i />
              SYSTEM ONLINE
            </span>

            <span>
              06 DOMAINS
            </span>
          </div>
        </header>


        {/* ==================================================
            MAIN WORKSPACE
        ================================================== */}

        <div className="an-navmap__workspace">
          {/* ================================================
              LEFT NAVIGATION
          ================================================= */}

          <nav
            className="an-navmap__navigation"
            aria-label="ArcheNova civilization map"
          >
            <div className="an-navmap__navigation-head">
              <span>
                CIVILIZATION SYSTEMS
              </span>

              <p>
                Select a domain.
              </p>
            </div>

            <div className="an-navmap__navigation-list">
              {sections.map(
                (section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={[
                      "an-navmap__navigation-item",
                      activeId === section.id
                        ? "is-active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      setActiveId(
                        section.id,
                      )
                    }
                  >
                    <span className="an-navmap__navigation-index">
                      {section.index}
                    </span>

                    <span className="an-navmap__navigation-copy">
                      <strong>
                        {section.title}
                      </strong>

                      <small>
                        {section.subtitle}
                      </small>
                    </span>

                    <span className="an-navmap__navigation-state">
                      {section.status}
                    </span>
                  </button>
                ),
              )}
            </div>
          </nav>


          {/* ================================================
              CENTER CORE
          ================================================= */}

          <main className="an-navmap__core">
            <div className="an-navmap__core-header">
              <span>
                ACTIVE DOMAIN
              </span>

              <span>
                {activeSection.index}
              </span>
            </div>

            <div className="an-navmap__core-content">
              <span className="an-navmap__core-kicker">
                {activeSection.status}
              </span>

              <h2>
                {activeSection.title}
              </h2>

              <p className="an-navmap__core-subtitle">
                {activeSection.subtitle}
              </p>

              <p className="an-navmap__core-description">
                {activeSection.description}
              </p>

              <Link
                href={activeSection.href}
                className="an-navmap__enter"
              >
                <span>
                  Enter Domain
                </span>

                <strong>
                  ↗
                </strong>
              </Link>
            </div>

            <div className="an-navmap__core-metrics">
              <div>
                <span>
                  SYSTEM
                </span>

                <strong>
                  ONLINE
                </strong>
              </div>

              <div>
                <span>
                  DOMAIN
                </span>

                <strong>
                  {activeSection.index}
                </strong>
              </div>

              <div>
                <span>
                  ACCESS
                </span>

                <strong>
                  OPEN
                </strong>
              </div>
            </div>
          </main>


          {/* ================================================
              RIGHT SYSTEM PANEL
          ================================================= */}

          <aside className="an-navmap__side">
            <section className="an-navmap__side-section">
              <span className="an-navmap__side-label">
                CIVILIZATION CORE
              </span>

              <h3>
                ArcheNova
              </h3>

              <p>
                A founder-led architecture
                for integrating knowledge,
                institutions, technology,
                and civilization-scale
                capability.
              </p>

              <Link
                href="/imperial-house"
                className="an-navmap__side-link"
              >
                Imperial House
                <span>↗</span>
              </Link>
            </section>

            <section className="an-navmap__side-section">
              <span className="an-navmap__side-label">
                QUICK ACCESS
              </span>

              <div className="an-navmap__quick">
                <Link href="/home">
                  Home
                  <span>↗</span>
                </Link>

                <Link href="/origin">
                  Origin
                  <span>↗</span>
                </Link>

                <Link href="/framework">
                  Framework
                  <span>↗</span>
                </Link>

                <Link href="/civilization-experience">
                  Experience
                  <span>↗</span>
                </Link>
              </div>
            </section>

            <section className="an-navmap__side-section an-navmap__side-section--status">
              <span className="an-navmap__side-label">
                SYSTEM STATE
              </span>

              <div>
                <span>
                  Navigation
                </span>

                <strong>
                  Operational
                </strong>
              </div>

              <div>
                <span>
                  Intelligence
                </span>

                <strong>
                  Live
                </strong>
              </div>

              <div>
                <span>
                  Architecture
                </span>

                <strong>
                  Persistent
                </strong>
              </div>
            </section>
          </aside>
        </div>


        {/* ==================================================
            BOTTOM SYSTEM BAR
        ================================================== */}

        <footer className="an-navmap__footer">
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
        </footer>
      </div>


      <style jsx global>{`
        /* ==================================================
           ROOT
        ================================================== */

        .an-navmap {
          position: relative;

          width: 100%;

          min-height: 100svh;

          display: grid;

          place-items: center;

          padding:
            clamp(
              28px,
              5vw,
              64px
            )
            0;

          overflow: hidden;

          isolation: isolate;

          background:
            transparent;

          color:
            rgba(
              248,
              250,
              252,
              0.94
            );
        }


        /* ==================================================
           AMBIENT
        ================================================== */

        .an-navmap__ambient {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              38%,
              rgba(
                175,
                210,
                230,
                0.055
              ),
              transparent
              33%
            ),

            radial-gradient(
              circle
              at
              18%
              70%,
              rgba(
                120,
                160,
                190,
                0.025
              ),
              transparent
              25%
            ),

            radial-gradient(
              circle
              at
              86%
              28%,
              rgba(
                210,
                225,
                235,
                0.018
              ),
              transparent
              24%
            );
        }


        /* ==================================================
           SHELL
        ================================================== */

        .an-navmap__shell {
          position: relative;

          width:
            min(
              1180px,
              calc(
                100% - 44px
              )
            );

          overflow: hidden;

          border:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            28px;

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                20,
                23,
                0.62
              ),
              rgba(
                7,
                8,
                10,
                0.82
              )
              48%,
              rgba(
                1,
                2,
                3,
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
            30px
            90px
            rgba(
              0,
              0,
              0,
              0.3
            );
        }


        .an-navmap__shell::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          opacity: 0.7;

          background:
            linear-gradient(
              115deg,
              transparent
              0%,
              transparent
              28%,
              rgba(
                255,
                255,
                255,
                0.028
              )
              39%,
              rgba(
                255,
                255,
                255,
                0.055
              )
              45%,
              transparent
              54%,
              transparent
              100%
            );

          transform:
            translateX(
              -90%
            );

          animation:
            anNavMapSheen
            16s
            ease-in-out
            infinite;
        }


        /* ==================================================
           TOP BAR
        ================================================== */

        .an-navmap__top {
          position: relative;

          z-index: 4;

          min-height: 70px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;

          padding:
            0
            28px;

          border-bottom:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .an-navmap__brand {
          display: flex;

          align-items:
            baseline;

          gap: 11px;
        }


        .an-navmap__brand
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.2em;
        }


        .an-navmap__brand
        > strong {
          color:
            rgba(
              248,
              250,
              252,
              0.78
            );

          font-size: 12px;

          font-weight: 420;
        }


        .an-navmap__state {
          display: flex;

          align-items: center;

          gap: 14px;

          color:
            rgba(
              255,
              255,
              255,
              0.23
            );

          font-size: 5px;

          letter-spacing:
            0.13em;
        }


        .an-navmap__state
        > span {
          display: inline-flex;

          align-items: center;

          gap: 6px;
        }


        .an-navmap__state i {
          width: 5px;
          height: 5px;

          border-radius:
            50%;

          background:
            rgba(
              140,
              235,
              190,
              0.78
            );

          box-shadow:
            0
            0
            11px
            rgba(
              140,
              235,
              190,
              0.35
            );
        }


        /* ==================================================
           WORKSPACE
        ================================================== */

        .an-navmap__workspace {
          position: relative;

          z-index: 3;

          display: grid;

          grid-template-columns:
            270px
            minmax(
              0,
              1fr
            )
            250px;

          min-height:
            590px;
        }


        /* ==================================================
           LEFT NAVIGATION
        ================================================== */

        .an-navmap__navigation {
          padding:
            26px
            18px
            24px;

          border-right:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-navmap__navigation-head {
          padding:
            0
            9px
            18px;
        }


        .an-navmap__navigation-head
        > span {
          color:
            rgba(
              185,
              216,
              233,
              0.38
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.17em;
        }


        .an-navmap__navigation-head
        p {
          margin:
            7px
            0
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 7px;
        }


        .an-navmap__navigation-list {
          display: grid;

          gap: 6px;
        }


        .an-navmap__navigation-item {
          position: relative;

          width: 100%;

          display: grid;

          grid-template-columns:
            27px
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap: 10px;

          min-height:
            63px;

          padding:
            9px
            10px;

          border:
            1px
            solid
            transparent;

          border-radius:
            15px;

          background:
            transparent;

          color: inherit;

          text-align:
            left;

          cursor: pointer;

          transition:
            border-color
            0.28s ease,
            background
            0.28s ease,
            transform
            0.28s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        .an-navmap__navigation-item:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          border-color:
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        .an-navmap__navigation-item.is-active {
          border-color:
            rgba(
              185,
              220,
              239,
              0.12
            );

          background:
            linear-gradient(
              145deg,
              rgba(
                180,
                220,
                240,
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.018
              )
            );
        }


        .an-navmap__navigation-index {
          color:
            rgba(
              180,
              215,
              235,
              0.32
            );

          font-size: 6px;
        }


        .an-navmap__navigation-copy {
          min-width: 0;

          display: flex;

          flex-direction:
            column;

          gap: 4px;
        }


        .an-navmap__navigation-copy
        strong {
          color:
            rgba(
              244,
              248,
              250,
              0.72
            );

          font-size: 10px;

          font-weight: 430;
        }


        .an-navmap__navigation-copy
        small {
          overflow: hidden;

          color:
            rgba(
              215,
              225,
              231,
              0.28
            );

          font-size: 6px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }


        .an-navmap__navigation-state {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 4.5px;

          letter-spacing:
            0.1em;
        }


        /* ==================================================
           CORE
        ================================================== */

        .an-navmap__core {
          position: relative;

          min-width: 0;

          display: grid;

          grid-template-rows:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          padding:
            28px
            clamp(
              28px,
              4vw,
              54px
            );

          overflow: hidden;
        }


        .an-navmap__core::before {
          content: "";

          position: absolute;

          left: 50%;
          top: 46%;

          width: 430px;
          height: 430px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          pointer-events: none;

          background:
            radial-gradient(
              circle,
              rgba(
                165,
                210,
                236,
                0.055
              ),
              transparent
              67%
            );

          filter:
            blur(
              12px
            );
        }


        .an-navmap__core-header {
          position: relative;

          z-index: 2;

          display: flex;

          justify-content:
            space-between;

          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 5px;

          letter-spacing:
            0.15em;
        }


        .an-navmap__core-content {
          position: relative;

          z-index: 2;

          align-self: center;

          width:
            min(
              520px,
              100%
            );

          margin:
            0
            auto;

          text-align:
            center;
        }


        .an-navmap__core-kicker {
          color:
            rgba(
              182,
              218,
              237,
              0.42
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.2em;
        }


        .an-navmap__core-content
        h2 {
          margin:
            15px
            0
            0;

          color:
            rgba(
              250,
              252,
              253,
              0.97
            );

          font-size:
            clamp(
              42px,
              5vw,
              68px
            );

          font-weight: 260;

          line-height:
            0.96;

          letter-spacing:
            -0.055em;
        }


        .an-navmap__core-subtitle {
          margin:
            14px
            0
            0;

          color:
            rgba(
              235,
              241,
              245,
              0.52
            );

          font-size: 10px;
        }


        .an-navmap__core-description {
          max-width:
            440px;

          margin:
            20px
            auto
            0;

          color:
            rgba(
              218,
              228,
              234,
              0.36
            );

          font-size: 9px;

          line-height:
            1.8;
        }


        .an-navmap__enter {
          width:
            min(
              240px,
              100%
            );

          min-height:
            48px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin:
            28px
            auto
            0;

          padding:
            0
            17px;

          border:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.085
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.026
            );

          color:
            rgba(
              245,
              248,
              250,
              0.72
            );

          font-size: 8px;

          text-decoration:
            none;

          -webkit-backdrop-filter:
            blur(18px);

          backdrop-filter:
            blur(18px);

          transition:
            transform
            0.3s ease,
            background
            0.3s ease,
            border-color
            0.3s ease;
        }


        .an-navmap__enter::after,
        .an-navmap__side-link::after,
        .an-navmap__quick a::after {
          display:
            none !important;
        }


        .an-navmap__enter:hover {
          transform:
            translateY(
              -2px
            );

          border-color:
            rgba(
              190,
              225,
              243,
              0.16
            );

          background:
            rgba(
              180,
              220,
              240,
              0.045
            );
        }


        .an-navmap__enter
        strong {
          font-size: 12px;

          font-weight: 400;
        }


        .an-navmap__core-metrics {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );

          gap: 1px;

          overflow: hidden;

          border:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          border-radius:
            15px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-navmap__core-metrics
        > div {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            11px
            13px;

          background:
            rgba(
              4,
              5,
              7,
              0.76
            );
        }


        .an-navmap__core-metrics
        span {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 4.5px;

          letter-spacing:
            0.1em;
        }


        .an-navmap__core-metrics
        strong {
          color:
            rgba(
              230,
              238,
              243,
              0.52
            );

          font-size: 6px;

          font-weight: 450;
        }


        /* ==================================================
           SIDE
        ================================================== */

        .an-navmap__side {
          padding:
            26px
            18px;

          border-left:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-navmap__side-section {
          padding:
            18px
            0;

          border-bottom:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .an-navmap__side-section:first-child {
          padding-top: 0;
        }


        .an-navmap__side-label {
          color:
            rgba(
              180,
              215,
              233,
              0.34
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.17em;
        }


        .an-navmap__side-section
        h3 {
          margin:
            11px
            0
            0;

          color:
            rgba(
              247,
              250,
              252,
              0.78
            );

          font-size: 20px;

          font-weight: 320;

          letter-spacing:
            -0.025em;
        }


        .an-navmap__side-section
        p {
          margin:
            12px
            0
            0;

          color:
            rgba(
              215,
              225,
              231,
              0.32
            );

          font-size: 7px;

          line-height:
            1.75;
        }


        .an-navmap__side-link {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin-top: 17px;

          padding:
            10px
            0;

          border-top:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              235,
              241,
              245,
              0.52
            );

          font-size: 7px;

          text-decoration:
            none;
        }


        .an-navmap__quick {
          display: grid;

          margin-top: 12px;
        }


        .an-navmap__quick
        a {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          min-height:
            36px;

          border-bottom:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          color:
            rgba(
              225,
              233,
              238,
              0.4
            );

          font-size: 7px;

          text-decoration:
            none;
        }


        .an-navmap__side-section--status
        > div {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            9px
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 6px;
        }


        .an-navmap__side-section--status
        strong {
          color:
            rgba(
              170,
              225,
              200,
              0.55
            );

          font-size: 5px;

          font-weight: 500;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .an-navmap__footer {
          min-height:
            46px;

          display: flex;

          align-items: center;

          justify-content:
            center;

          flex-wrap: wrap;

          gap: 6px;

          padding:
            8px
            20px;

          border-top:
            1px
            solid
            rgba(
              255,
              255,
              255,
              0.04
            );

          color:
            rgba(
              255,
              255,
              255,
              0.19
            );

          font-size: 4.5px;

          letter-spacing:
            0.12em;
        }


        .an-navmap__footer
        i {
          width: 9px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.07
            );
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 1000px
        ) and (
          min-width: 769px
        ) {

          .an-navmap__workspace {
            grid-template-columns:
              225px
              minmax(
                0,
                1fr
              )
              210px;
          }


          .an-navmap__core {
            padding-left:
              28px;

            padding-right:
              28px;
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .an-navmap {
            min-height:
              auto;

            padding:
              70px
              0;
          }


          .an-navmap__shell {
            width:
              calc(
                100% -
                18px
              );

            border-radius:
              23px;
          }


          .an-navmap__top {
            min-height:
              62px;

            padding:
              0
              14px;
          }


          .an-navmap__brand
          > span {
            display:
              none;
          }


          .an-navmap__brand
          > strong {
            font-size:
              11px;
          }


          .an-navmap__state
          > span:last-child {
            display:
              none;
          }


          .an-navmap__workspace {
            display:
              flex;

            flex-direction:
              column;

            min-height:
              0;
          }


          .an-navmap__navigation {
            order: 2;

            padding:
              16px
              13px;

            border-right:
              0;

            border-top:
              1px
              solid
              rgba(
                255,
                255,
                255,
                0.04
              );
          }


          .an-navmap__navigation-head {
            display:
              none;
          }


          .an-navmap__navigation-list {
            display: flex;

            gap: 7px;

            overflow-x:
              auto;

            scrollbar-width:
              none;
          }


          .an-navmap__navigation-list::-webkit-scrollbar {
            display:
              none;
          }


          .an-navmap__navigation-item {
            flex:
              0
              0
              132px;

            grid-template-columns:
              auto
              1fr;

            min-height:
              68px;
          }


          .an-navmap__navigation-state {
            display:
              none;
          }


          .an-navmap__navigation-copy
          small {
            font-size:
              5px;
          }


          .an-navmap__core {
            order: 1;

            min-height:
              470px;

            padding:
              24px
              20px
              22px;
          }


          .an-navmap__core-content
          h2 {
            font-size:
              clamp(
                40px,
                12vw,
                55px
              );
          }


          .an-navmap__core-description {
            max-width:
              300px;

            font-size:
              8px;
          }


          .an-navmap__side {
            order: 3;

            display:
              grid;

            grid-template-columns:
              1fr
              1fr;

            gap: 0;

            padding:
              0
              14px;

            border-left:
              0;

            border-top:
              1px
              solid
              rgba(
                255,
                255,
                255,
                0.04
              );
          }


          .an-navmap__side-section {
            padding:
              18px
              10px;
          }


          .an-navmap__side-section:first-child {
            padding-top:
              18px;
          }


          .an-navmap__side-section--status {
            display:
              none;
          }


          .an-navmap__footer {
            display:
              none;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .an-navmap__side {
            grid-template-columns:
              1fr;
          }


          .an-navmap__core {
            min-height:
              440px;
          }


          .an-navmap__navigation-item {
            flex-basis:
              122px;
          }

        }


        /* ==================================================
           ANIMATION
        ================================================== */

        @keyframes anNavMapSheen {
          0%,
          18% {
            transform:
              translateX(
                -90%
              );

            opacity: 0;
          }

          35% {
            opacity: 1;
          }

          55% {
            transform:
              translateX(
                90%
              );

            opacity: 0;
          }

          100% {
            transform:
              translateX(
                90%
              );

            opacity: 0;
          }
        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .an-navmap__shell::before {
            animation:
              none !important;
          }


          .an-navmap__navigation-item,
          .an-navmap__enter {
            transition:
              none !important;
          }

        }

      `}</style>
    </section>
  );
}