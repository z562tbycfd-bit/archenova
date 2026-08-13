"use client";

import Link
  from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";


/* ==========================================================
   NAVIGATION
========================================================== */

const ITEMS = [
  {
    href:
      "/home",

    label:
      "Home",

    note:
      "ArcheNova",
  },

  {
    href:
      "/civilization-experience",

    label:
      "Scientific Open World",

    note:
      "Explore the scientific city",
  },

  {
    href:
      "/intelligence-platform/dashboard",

    label:
      "Civilization Intelligence",

    note:
      "Signals, systems, and foresight",
  },

  {
    href:
      "/research",

    label:
      "Research",

    note:
      "Scientific inquiry and knowledge",
  },

  {
    href:
      "/civilization",

    label:
      "Civilization",

    note:
      "Civilization-scale architecture",
  },

  {
    href:
      "/projects",

    label:
      "Projects",

    note:
      "From principles to realization",
  },

  {
    href:
      "/governance",

    label:
      "Governance",

    note:
      "Institutions, rules, and continuity",
  },

  {
    href:
      "/about",

    label:
      "About",

    note:
      "Purpose and identity",
  },

  {
    href:
      "/contact",

    label:
      "Contact",

    note:
      "Access and connection",
  },
];


/* ==========================================================
   COMPONENT
========================================================== */

export default function Menu() {
  const pathname =
    usePathname();


  const [
    open,
    setOpen,
  ] =
    useState(
      false,
    );


  const [
    closing,
    setClosing,
  ] =
    useState(
      false,
    );


  const panelRef =
    useRef<
      HTMLDivElement |
      null
    >(
      null,
    );


  /* ========================================================
     CLOSE
  ======================================================== */

  function requestClose() {
    if (
      closing
    ) {
      return;
    }


    setClosing(
      true,
    );


    window.setTimeout(
      () => {
        setOpen(
          false,
        );

        setClosing(
          false,
        );
      },
      420,
    );
  }


  /* ========================================================
     ESCAPE
  ======================================================== */

  useEffect(() => {
    function onKey(
      event:
        KeyboardEvent,
    ) {
      if (
        event.key ===
          "Escape" &&
        open
      ) {
        requestClose();
      }
    }


    window.addEventListener(
      "keydown",
      onKey,
    );


    return () => {
      window.removeEventListener(
        "keydown",
        onKey,
      );
    };
  }, [
    open,
    closing,
  ]);


  /* ========================================================
     FOCUS + BODY LOCK
  ======================================================== */

  useEffect(() => {
    if (
      !open
    ) {
      return;
    }


    panelRef.current?.focus();


    const previousOverflow =
      document.body.style
        .overflow;


    document.body.style.overflow =
      "hidden";


    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
  ]);


  /* ========================================================
     CLOSE AFTER ROUTE CHANGE
  ======================================================== */

  useEffect(() => {
    if (
      open
    ) {
      setOpen(
        false,
      );

      setClosing(
        false,
      );
    }
  }, [
    pathname,
  ]);


  /* ========================================================
     ACTIVE
  ======================================================== */

  function isActive(
    href:
      string,
  ) {
    if (
      href ===
      "/home"
    ) {
      return (
        pathname ===
        "/home"
      );
    }


    return pathname?.startsWith(
      href,
    );
  }


  const showOverlay =
    open ||
    closing;


  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className={[
        "an-menu",

        open
          ? "is-open"
          : "",

        closing
          ? "is-closing"
          : "",
      ].join(
        " ",
      )}
    >
      {/* ==================================================
          OPEN BUTTON
      ================================================== */}

      {!showOverlay && (
        <button
          type="button"
          className="an-menu__trigger"
          aria-label="Open navigation"
          aria-expanded={
            open
          }
          onClick={() =>
            setOpen(
              true,
            )
          }
        >
          <span className="an-menu__trigger-lines">
            <i />
            <i />
            <i />
          </span>
        </button>
      )}


      {/* ==================================================
          OVERLAY
      ================================================== */}

      {showOverlay && (
        <div className="an-menu__overlay">
          <button
            type="button"
            className="an-menu__backdrop"
            aria-label="Close navigation"
            onClick={
              requestClose
            }
          />


          {/* ==============================================
              PANEL
          ============================================== */}

          <div
            ref={
              panelRef
            }
            className="an-menu__panel"
            tabIndex={
              -1
            }
          >
            {/* ============================================
                TOP
            ============================================ */}

            <header className="an-menu__top">
              <div className="an-menu__brand">
                <span>
                  ARCHENOVA
                </span>

                <small>
                  SCIENCE · TECHNOLOGY · CIVILIZATION
                </small>
              </div>


              <button
                type="button"
                className="an-menu__close"
                aria-label="Close navigation"
                onClick={
                  requestClose
                }
              >
                <span />
                <span />
              </button>
            </header>


            {/* ============================================
                CONTEXT
            ============================================ */}

            <div className="an-menu__context">
              <span>
                NAVIGATION
              </span>

              <span>
                {String(
                  ITEMS.length,
                ).padStart(
                  2,
                  "0",
                )}{" "}
                DESTINATIONS
              </span>
            </div>


            {/* ============================================
                NAVIGATION
            ============================================ */}

            <nav
              className="an-menu__nav"
              aria-label="Primary navigation"
            >
              {ITEMS.map(
                (
                  item,
                  index,
                ) => {
                  const active =
                    isActive(
                      item.href,
                    );


                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      className={[
                        "an-menu__item",

                        active
                          ? "is-active"
                          : "",
                      ].join(
                        " ",
                      )}
                      style={
                        {
                          "--menu-index":
                            index,
                        } as CSSProperties
                      }
                      onClick={
                        requestClose
                      }
                    >
                      <span className="an-menu__item-index">
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>


                      <span className="an-menu__item-copy">
                        <strong>
                          {
                            item.label
                          }
                        </strong>

                        <small>
                          {
                            item.note
                          }
                        </small>
                      </span>


                      <span
                        className="an-menu__item-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  );
                },
              )}
            </nav>


            {/* ============================================
                PUBLIC SIGNAL
            ============================================ */}

            <div className="an-menu__external">
              <a
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noreferrer"
                onClick={
                  requestClose
                }
              >
                <span>
                  <small>
                    PUBLIC SIGNAL
                  </small>

                  <strong>
                    @ArcheNova_X
                  </strong>
                </span>

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>


            {/* ============================================
                FOOT
            ============================================ */}

            <footer className="an-menu__foot">
              <span>
                PHYSICS
              </span>

              <i />

              <span>
                APPLIED SCIENCE
              </span>

              <i />

              <span>
                CIVILIZATION ENGINEERING
              </span>
            </footer>
          </div>
        </div>
      )}


      {/* ==================================================
          STYLE
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           ROOT
        ================================================== */

        .an-menu {
          position: relative;

          z-index: 1000;
        }


        /* ==================================================
           TRIGGER
        ================================================== */

        .an-menu__trigger {
          appearance: none;
          -webkit-appearance: none;

          position: relative;

          width: 58px;
          height: 58px;

          display: grid;

          place-items: center;

          padding: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                20,
                22,
                0.72
              ),
              rgba(
                3,
                4,
                6,
                0.86
              )
            );

          color: white;

          -webkit-backdrop-filter:
            blur(24px)
            saturate(115%);

          backdrop-filter:
            blur(24px)
            saturate(115%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.055
            ),
            0
            14px
            50px
            rgba(
              0,
              0,
              0,
              0.24
            );

          cursor: pointer;

          transition:
            border-color
              0.4s ease,
            background
              0.4s ease,
            transform
              0.4s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }


        .an-menu__trigger-lines {
          width: 22px;

          display: grid;

          gap: 5px;
        }


        .an-menu__trigger-lines i {
          display: block;

          width: 100%;
          height: 1.5px;

          border-radius:
            999px;

          background:
            rgba(
              245,
              248,
              250,
              0.88
            );

          transition:
            transform
              0.35s ease;
        }


        @media (
          hover: hover
        ) {
          .an-menu__trigger:hover {
            border-color:
              rgba(
                255,
                255,
                255,
                0.19
              );

            background:
              linear-gradient(
                145deg,
                rgba(
                  24,
                  27,
                  30,
                  0.78
                ),
                rgba(
                  4,
                  5,
                  7,
                  0.92
                )
              );

            transform:
              translateY(-2px);
          }


          .an-menu__trigger:hover
          .an-menu__trigger-lines
          i:first-child {
            transform:
              translateX(
                3px
              );
          }


          .an-menu__trigger:hover
          .an-menu__trigger-lines
          i:last-child {
            transform:
              translateX(
                -3px
              );
          }
        }


        /* ==================================================
           OVERLAY
        ================================================== */

        .an-menu__overlay {
          position: fixed;

          inset: 0;

          z-index: 2000;

          overflow: hidden;
        }


        .an-menu__backdrop {
          appearance: none;
          -webkit-appearance: none;

          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          padding: 0;

          border: 0;

          background:
            rgba(
              0,
              0,
              0,
              0.42
            );

          -webkit-backdrop-filter:
            blur(7px);

          backdrop-filter:
            blur(7px);

          cursor: default;

          animation:
            anMenuBackdropIn
            0.48s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;
        }


        /* ==================================================
           PANEL
        ================================================== */

        .an-menu__panel {
          position: absolute;

          top:
            max(
              14px,
              env(
                safe-area-inset-top
              )
            );

          right:
            max(
              14px,
              env(
                safe-area-inset-right
              )
            );

          bottom:
            max(
              14px,
              env(
                safe-area-inset-bottom
              )
            );

          width:
            min(
              480px,
              calc(
                100vw -
                28px
              )
            );

          display: flex;

          flex-direction: column;

          overflow: hidden;

          padding:
            30px
            28px
            24px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.085
            );

          border-radius: 30px;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              transparent 28%
            ),
            linear-gradient(
              150deg,
              rgba(
                15,
                17,
                19,
                0.89
              ),
              rgba(
                3,
                4,
                5,
                0.94
              )
              48%,
              rgba(
                0,
                0,
                0,
                0.97
              )
            );

          -webkit-backdrop-filter:
            blur(38px)
            saturate(115%);

          backdrop-filter:
            blur(38px)
            saturate(115%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.055
            ),
            0
            50px
            150px
            rgba(
              0,
              0,
              0,
              0.52
            );

          outline: none;

          animation:
            anMenuPanelIn
            0.58s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;
        }


        /* ==================================================
           TOP
        ================================================== */

        .an-menu__top {
          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap: 24px;

          flex: 0 0 auto;
        }


        .an-menu__brand {
          display: flex;

          flex-direction:
            column;

          align-items:
            flex-start;
        }


        .an-menu__brand
        > span {
          color:
            rgba(
              248,
              250,
              252,
              0.94
            );

          font-size: 15px;

          font-weight: 520;

          letter-spacing:
            0.18em;
        }


        .an-menu__brand
        > small {
          margin-top: 8px;

          color:
            rgba(
              220,
              228,
              234,
              0.3
            );

          font-size: 6px;

          font-weight: 550;

          letter-spacing:
            0.17em;
        }


        /* ==================================================
           CLOSE
        ================================================== */

        .an-menu__close {
          appearance: none;
          -webkit-appearance: none;

          position: relative;

          flex: 0 0 auto;

          width: 42px;
          height: 42px;

          display: grid;

          place-items: center;

          padding: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.075
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          cursor: pointer;

          transition:
            border-color
              0.3s ease,
            background
              0.3s ease,
            transform
              0.4s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }


        .an-menu__close span {
          position: absolute;

          width: 15px;
          height: 1px;

          background:
            rgba(
              244,
              248,
              250,
              0.68
            );
        }


        .an-menu__close
        span:first-child {
          transform:
            rotate(45deg);
        }


        .an-menu__close
        span:last-child {
          transform:
            rotate(-45deg);
        }


        @media (
          hover: hover
        ) {
          .an-menu__close:hover {
            border-color:
              rgba(
                255,
                255,
                255,
                0.15
              );

            background:
              rgba(
                255,
                255,
                255,
                0.045
              );

            transform:
              rotate(4deg);
          }
        }


        /* ==================================================
           CONTEXT
        ================================================== */

        .an-menu__context {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;

          margin-top: 30px;

          padding-bottom: 14px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          color:
            rgba(
              210,
              220,
              228,
              0.27
            );

          font-size: 6px;

          font-weight: 550;

          letter-spacing:
            0.18em;
        }


        /* ==================================================
           NAV
        ================================================== */

        .an-menu__nav {
          min-height: 0;

          flex: 1 1 auto;

          overflow-y: auto;
          overflow-x: hidden;

          padding:
            5px
            0;

          scrollbar-width:
            none;
        }


        .an-menu__nav::-webkit-scrollbar {
          display: none;
        }


        /* ==================================================
           ITEM
        ================================================== */

        .an-menu__item {
          position: relative;

          display: grid;

          grid-template-columns:
            32px
            minmax(
              0,
              1fr
            )
            24px;

          align-items: center;

          gap: 13px;

          min-height: 67px;

          padding:
            11px
            5px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          color: inherit;

          text-decoration: none;

          opacity: 0;

          animation:
            anMenuItemIn
            0.6s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            forwards;

          animation-delay:
            calc(
              0.1s +
              var(
                --menu-index
              ) *
              0.035s
            );

          transition:
            padding
              0.35s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),
            background
              0.35s ease;
        }


        .an-menu__item::before {
          content: "";

          position: absolute;

          top: 17px;
          bottom: 17px;
          left: 0;

          width: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0
            );

          transition:
            background
              0.35s ease;
        }


        .an-menu__item-index {
          color:
            rgba(
              220,
              228,
              234,
              0.2
            );

          font-size: 7px;

          font-weight: 550;

          letter-spacing:
            0.12em;
        }


        .an-menu__item-copy {
          min-width: 0;

          display: flex;

          flex-direction:
            column;

          gap: 5px;
        }


        .an-menu__item-copy
        strong {
          overflow: hidden;

          color:
            rgba(
              244,
              247,
              249,
              0.78
            );

          font-size: 15px;

          font-weight: 390;

          line-height: 1.2;

          letter-spacing:
            -0.015em;

          text-overflow:
            ellipsis;

          white-space: nowrap;

          transition:
            color
              0.3s ease;
        }


        .an-menu__item-copy
        small {
          overflow: hidden;

          color:
            rgba(
              215,
              224,
              230,
              0.28
            );

          font-size: 7px;

          font-weight: 450;

          line-height: 1.3;

          letter-spacing:
            0.055em;

          text-overflow:
            ellipsis;

          white-space: nowrap;
        }


        .an-menu__item-arrow {
          color:
            rgba(
              230,
              237,
              242,
              0.22
            );

          font-size: 13px;

          text-align: right;

          transition:
            color
              0.3s ease,
            transform
              0.35s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }


        /* ==================================================
           ACTIVE ITEM
        ================================================== */

        .an-menu__item.is-active::before {
          background:
            rgba(
              238,
              244,
              248,
              0.6
            );
        }


        .an-menu__item.is-active
        .an-menu__item-index {
          color:
            rgba(
              238,
              244,
              248,
              0.52
            );
        }


        .an-menu__item.is-active
        .an-menu__item-copy
        strong {
          color:
            rgba(
              250,
              252,
              253,
              0.98
            );
        }


        .an-menu__item.is-active
        .an-menu__item-arrow {
          color:
            rgba(
              245,
              248,
              250,
              0.66
            );
        }


        @media (
          hover: hover
        ) {
          .an-menu__item:hover {
            padding-left: 12px;

            background:
              linear-gradient(
                90deg,
                rgba(
                  255,
                  255,
                  255,
                  0.027
                ),
                transparent
              );
          }


          .an-menu__item:hover::before {
            background:
              rgba(
                255,
                255,
                255,
                0.42
              );
          }


          .an-menu__item:hover
          .an-menu__item-copy
          strong {
            color:
              rgba(
                252,
                253,
                254,
                0.98
              );
          }


          .an-menu__item:hover
          .an-menu__item-arrow {
            color:
              rgba(
                255,
                255,
                255,
                0.7
              );

            transform:
              translateX(
                3px
              );
          }
        }


        /* ==================================================
           EXTERNAL
        ================================================== */

        .an-menu__external {
          flex: 0 0 auto;

          padding-top: 13px;
        }


        .an-menu__external a {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;

          min-height: 54px;

          padding:
            12px
            15px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-radius: 15px;

          background:
            rgba(
              255,
              255,
              255,
              0.016
            );

          color:
            rgba(
              240,
              245,
              248,
              0.56
            );

          text-decoration: none;

          transition:
            border-color
              0.3s ease,
            background
              0.3s ease;
        }


        .an-menu__external
        a > span:first-child {
          display: flex;

          flex-direction:
            column;

          gap: 5px;
        }


        .an-menu__external small {
          color:
            rgba(
              215,
              224,
              230,
              0.25
            );

          font-size: 5px;

          letter-spacing:
            0.17em;
        }


        .an-menu__external strong {
          font-size: 10px;

          font-weight: 450;

          letter-spacing:
            0.08em;
        }


        @media (
          hover: hover
        ) {
          .an-menu__external
          a:hover {
            border-color:
              rgba(
                255,
                255,
                255,
                0.12
              );

            background:
              rgba(
                255,
                255,
                255,
                0.035
              );
          }
        }


        /* ==================================================
           FOOT
        ================================================== */

        .an-menu__foot {
          flex: 0 0 auto;

          display: flex;

          flex-wrap: wrap;

          align-items: center;

          gap:
            7px
            10px;

          margin-top: 18px;

          color:
            rgba(
              210,
              220,
              226,
              0.19
            );

          font-size: 5px;

          font-weight: 560;

          letter-spacing:
            0.14em;
        }


        .an-menu__foot i {
          width: 2px;
          height: 2px;

          border-radius: 50%;

          background:
            rgba(
              220,
              228,
              234,
              0.22
            );
        }


        /* ==================================================
           CLOSING
        ================================================== */

        .an-menu.is-closing
        .an-menu__panel {
          animation:
            anMenuPanelOut
            0.4s
            cubic-bezier(
              0.4,
              0,
              1,
              1
            )
            forwards;
        }


        .an-menu.is-closing
        .an-menu__backdrop {
          animation:
            anMenuBackdropOut
            0.4s ease
            forwards;
        }


        /* ==================================================
           ANIMATION
        ================================================== */

        @keyframes anMenuPanelIn {
          from {
            opacity: 0;

            transform:
              translate3d(
                24px,
                0,
                0
              )
              scale(
                0.985
              );
          }

          to {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(
                1
              );
          }
        }


        @keyframes anMenuPanelOut {
          from {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(
                1
              );
          }

          to {
            opacity: 0;

            transform:
              translate3d(
                20px,
                0,
                0
              )
              scale(
                0.99
              );
          }
        }


        @keyframes anMenuBackdropIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }


        @keyframes anMenuBackdropOut {
          from {
            opacity: 1;
          }

          to {
            opacity: 0;
          }
        }


        @keyframes anMenuItemIn {
          from {
            opacity: 0;

            transform:
              translate3d(
                0,
                9px,
                0
              );
          }

          to {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              );
          }
        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 640px
        ) {
          .an-menu__trigger {
            width: 54px;
            height: 54px;

            border-radius: 18px;
          }


          .an-menu__panel {
            top:
              max(
                10px,
                env(
                  safe-area-inset-top
                )
              );

            right: 10px;

            bottom:
              max(
                10px,
                env(
                  safe-area-inset-bottom
                )
              );

            left: 10px;

            width: auto;

            padding:
              24px
              20px
              20px;

            border-radius: 26px;
          }


          .an-menu__brand
          > span {
            font-size: 13px;
          }


          .an-menu__brand
          > small {
            font-size: 5px;
          }


          .an-menu__context {
            margin-top: 25px;
          }


          .an-menu__item {
            grid-template-columns:
              27px
              minmax(
                0,
                1fr
              )
              20px;

            gap: 10px;

            min-height: 61px;

            padding:
              9px
              3px;
          }


          .an-menu__item-copy
          strong {
            font-size: 14px;
          }


          .an-menu__item-copy
          small {
            font-size: 6px;
          }


          .an-menu__external a {
            min-height: 50px;
          }
        }


        /* ==================================================
           SHORT VIEWPORT
        ================================================== */

        @media (
          max-height: 720px
        ) {
          .an-menu__panel {
            padding-top: 22px;
          }


          .an-menu__context {
            margin-top: 20px;
          }


          .an-menu__item {
            min-height: 56px;
          }


          .an-menu__external {
            padding-top: 8px;
          }


          .an-menu__foot {
            margin-top: 12px;
          }
        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .an-menu__panel,
          .an-menu__backdrop,
          .an-menu__item {
            animation:
              none !important;
          }


          .an-menu__trigger,
          .an-menu__close,
          .an-menu__item,
          .an-menu__item-arrow {
            transition:
              none !important;
          }
        }
      `}</style>
    </div>
  );
}