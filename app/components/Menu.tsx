"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/* ==========================================================
   ARCHENOVA NAVIGATION

   HOME environments:
   Current State / Founder / Map / Episteme /
   Today's Inquiry / Civilization Space /
   Valley / Aetherion

   Independent pages:
   Scientific Open World / Civilization Intelligence /
   Research / Civilization / Projects /
   Governance / About / Contact
========================================================== */

type MenuItem = {
  href: string;
  label: string;
  note: string;
  sectionId?: string;
};

const ITEMS: readonly MenuItem[] = [
  {
    href: "/home",
    label: "Home",
    note: "ArcheNova digital environment",
  },
  {
    href: "/home#archenova-current-state-section",
    sectionId: "archenova-current-state-section",
    label: "Current State",
    note: "What exists. What comes next.",
  },
  {
    href: "/home#founder-digital-twin",
    sectionId: "founder-digital-twin",
    label: "Founder Digital Twin",
    note: "Purpose and identity",
  },
  {
    href: "/home#archenova-search-section",
    sectionId: "archenova-search-section",
    label: "ArcheNova Map",
    note: "Explore the system",
  },
  {
    href: "/home#episteme-dialogue",
    sectionId: "episteme-dialogue",
    label: "Episteme",
    note: "Dialogue and reasoning",
  },
  {
    href: "/home#todays-inquiry",
    sectionId: "todays-inquiry",
    label: "Today's Inquiry",
    note: "A living research question",
  },
  {
    href: "/home#civilization-space",
    sectionId: "civilization-space",
    label: "Civilization Space",
    note: "Systems and civilization design",
  },
  {
    href: "/home#archenova-valley",
    sectionId: "archenova-valley",
    label: "ArcheNova Valley",
    note: "From knowledge to realization",
  },
  {
    href: "/home#aetherion",
    sectionId: "aetherion",
    label: "Aetherion",
    note: "Orbital megafactory concept",
  },
  {
    href: "/civilization-experience",
    label: "Scientific Open World",
    note: "Explore the scientific city",
  },
  {
    href: "/intelligence-platform/dashboard",
    label: "Civilization Intelligence",
    note: "Signals, systems, and foresight",
  },
  {
    href: "/research",
    label: "Research",
    note: "Scientific inquiry and knowledge",
  },
  {
    href: "/civilization",
    label: "Civilization",
    note: "Civilization-scale architecture",
  },
  {
    href: "/projects",
    label: "Projects",
    note: "From principles to realization",
  },
  {
    href: "/governance",
    label: "Governance",
    note: "Institutions, rules, and continuity",
  },
  {
    href: "/about",
    label: "About",
    note: "Purpose and identity",
  },
  {
    href: "/contact",
    label: "Contact",
    note: "Access and connection",
  },
];

export default function Menu() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [menuQuiet, setMenuQuiet] = useState(false);
  const [menuIntent, setMenuIntent] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  /* ========================================================
     CLOSE
  ======================================================== */

  function requestClose() {
    if (closing || !open) return;

    setClosing(true);

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      closeTimerRef.current = null;
    }, 420);
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  /* ========================================================
     ESC
  ======================================================== */

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open && !closing) {
        requestClose();
      }
    }

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closing]);

  /* ========================================================
     FOCUS + BODY LOCK
  ======================================================== */

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  /* ========================================================
     QUIET NAVIGATION
  ======================================================== */

  useEffect(() => {
    if (open) {
      setMenuQuiet(false);
      return;
    }

    setMenuQuiet(false);

    const quietTimer = window.setTimeout(() => {
      setMenuQuiet(true);
    }, 3200);

    return () => {
      window.clearTimeout(quietTimer);
    };
  }, [pathname, open]);

  /* ========================================================
     ROUTE CHANGE
  ======================================================== */

  useEffect(() => {
    setOpen(false);
    setClosing(false);

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, [pathname]);

  /* ========================================================
     HOME HASH
  ======================================================== */

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  /* ========================================================
     ACTIVE ITEM
  ======================================================== */

  function isActive(item: MenuItem) {
    if (item.sectionId) {
      return (
        pathname === "/home" &&
        activeHash === `#${item.sectionId}`
      );
    }

    if (item.href === "/home") {
      return pathname === "/home" && activeHash === "";
    }

    return (
      pathname === item.href ||
      pathname?.startsWith(`${item.href}/`)
    );
  }

  /* ========================================================
     HOME SECTION NAVIGATION

     On /home, scroll the existing HOME container instead
     of relying on browser document scrolling.
  ======================================================== */

  function handleItemClick(item: MenuItem) {
    if (item.sectionId && pathname === "/home") {
      const section = document.getElementById(item.sectionId);

      if (section) {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        section.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });

        window.history.replaceState(
          window.history.state,
          "",
          `#${item.sectionId}`,
        );

        setActiveHash(`#${item.sectionId}`);
      }
    }

    requestClose();
  }

  const showOverlay = open || closing;

  return (
    <div
      className={[
        "an-menu",
        open ? "is-open" : "",
        closing ? "is-closing" : "",
        menuQuiet ? "is-quiet" : "",
        menuIntent ? "has-intent" : "",
      ].join(" ")}
    >
      {/* ==================================================
          TRIGGER
      ================================================== */}

      {!showOverlay && (
        <button
          type="button"
          className="an-menu__trigger"
          aria-label="Open navigation"
          aria-expanded={open}
          onPointerEnter={() => setMenuIntent(true)}
          onPointerLeave={() => setMenuIntent(false)}
          onFocus={() => setMenuIntent(true)}
          onBlur={() => setMenuIntent(false)}
          onPointerDown={() => setMenuIntent(true)}
          onClick={() => setOpen(true)}
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
            onClick={requestClose}
          />

          <div
            ref={panelRef}
            className="an-menu__panel"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="ArcheNova navigation"
          >
            {/* ============================================
                TOP
            ============================================ */}

            <header className="an-menu__top">
              <div className="an-menu__brand">
                <span>ARCHENOVA</span>

                <small>
                  SCIENCE · TECHNOLOGY · CIVILIZATION
                </small>
              </div>

              <button
                type="button"
                className="an-menu__close"
                aria-label="Close navigation"
                onClick={requestClose}
              >
                <span />
                <span />
              </button>
            </header>

            {/* ============================================
                CONTEXT
            ============================================ */}

            <div className="an-menu__context">
              <span>NAVIGATION</span>

              <span>
                {String(ITEMS.length).padStart(2, "0")}{" "}
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
              {ITEMS.map((item, index) => {
                const active = isActive(item);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "an-menu__item",
                      active ? "is-active" : "",
                    ].join(" ")}
                    style={
                      {
                        "--menu-index": index,
                      } as CSSProperties
                    }
                    aria-current={active ? "page" : undefined}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="an-menu__item-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="an-menu__item-copy">
                      <strong>{item.label}</strong>
                      <small>{item.note}</small>
                    </span>

                    <span
                      className="an-menu__item-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ============================================
                PUBLIC SIGNAL
            ============================================ */}

            <div className="an-menu__external">
              <a
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noreferrer"
                onClick={requestClose}
              >
                <span>
                  <small>PUBLIC SIGNAL</small>
                  <strong>@ArcheNova_X</strong>
                </span>

                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* ============================================
                FOOT
            ============================================ */}

            <footer className="an-menu__foot">
              <span>PHYSICS</span>
              <i />
              <span>APPLIED SCIENCE</span>
              <i />
              <span>CIVILIZATION ENGINEERING</span>
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
           TRIGGER — THIN BLACK GLASS
        ================================================== */

        .an-menu__trigger {
          appearance: none;
          -webkit-appearance: none;

          position: fixed;

          top: max(
            16px,
            calc(env(safe-area-inset-top) + 10px)
          );

          right: max(
            16px,
            calc(env(safe-area-inset-right) + 10px)
          );

          z-index: 1990;

          width: 48px;
          height: 48px;

          display: grid;
          place-items: center;

          padding: 0;

          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 16px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 255, 255, 0.025),
              transparent 65%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.20),
              rgba(0, 0, 0, 0.30)
            );

          color: white;

          -webkit-backdrop-filter:
            blur(22px) saturate(106%);

          backdrop-filter:
            blur(22px) saturate(106%);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            inset 0 -1px 0 rgba(255, 255, 255, 0.01);

          cursor: pointer;

          transition:
            border-color 0.35s ease,
            background 0.35s ease,
            transform 0.4s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .an-menu__trigger-lines {
          width: 19px;
          display: grid;
          gap: 4.5px;
        }

        .an-menu__trigger-lines i {
          display: block;

          width: 100%;
          height: 1.25px;

          border-radius: 999px;

          background: rgba(246, 249, 251, 0.88);

          transition: transform 0.35s ease;
        }

        @media (hover: hover) {
          .an-menu__trigger:hover {
            border-color: rgba(255, 255, 255, 0.14);

            background:
              linear-gradient(
                145deg,
                rgba(20, 22, 25, 0.32),
                rgba(0, 0, 0, 0.40)
              );

            transform: translateY(-2px);
          }

          .an-menu__trigger:hover
          .an-menu__trigger-lines i:first-child {
            transform: translateX(2px);
          }

          .an-menu__trigger:hover
          .an-menu__trigger-lines i:last-child {
            transform: translateX(-2px);
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

          background: rgba(0, 0, 0, 0.38);

          -webkit-backdrop-filter: blur(7px);
          backdrop-filter: blur(7px);

          cursor: default;

          animation:
            anMenuBackdropIn
            0.48s
            cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }

        /* ==================================================
           PANEL — SINGLE TRANSLUCENT BLACK GLASS
        ================================================== */

        .an-menu__panel {
          position: absolute;

          top: max(14px, env(safe-area-inset-top));
          right: max(14px, env(safe-area-inset-right));
          bottom: max(14px, env(safe-area-inset-bottom));

          width: min(480px, calc(100vw - 28px));

          display: flex;
          flex-direction: column;

          overflow: hidden;

          padding: 30px 28px 24px;

          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 30px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 255, 255, 0.025) 0%,
              rgba(255, 255, 255, 0.008) 24%,
              transparent 52%
            ),
            linear-gradient(
              145deg,
              rgba(15, 16, 18, 0.20) 0%,
              rgba(7, 8, 10, 0.24) 48%,
              rgba(0, 0, 0, 0.30) 100%
            );

          -webkit-backdrop-filter:
            blur(22px) saturate(106%);

          backdrop-filter:
            blur(22px) saturate(106%);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            inset 0 -1px 0 rgba(255, 255, 255, 0.01);

          outline: none;

          animation:
            anMenuPanelIn
            0.58s
            cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }

        /* ==================================================
           TOP
        ================================================== */

        .an-menu__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 24px;

          flex: 0 0 auto;
        }

        .an-menu__brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .an-menu__brand > span {
          color: rgba(248, 250, 252, 0.94);

          font-size: 15px;
          font-weight: 520;
          letter-spacing: 0.18em;
        }

        .an-menu__brand > small {
          margin-top: 8px;

          color: rgba(220, 228, 234, 0.3);

          font-size: 6px;
          font-weight: 550;
          letter-spacing: 0.17em;
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

          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.02);

          cursor: pointer;

          transition:
            border-color 0.3s ease,
            background 0.3s ease,
            transform 0.4s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .an-menu__close span {
          position: absolute;

          width: 15px;
          height: 1px;

          background: rgba(244, 248, 250, 0.68);
        }

        .an-menu__close span:first-child {
          transform: rotate(45deg);
        }

        .an-menu__close span:last-child {
          transform: rotate(-45deg);
        }

        /* ==================================================
           CONTEXT
        ================================================== */

        .an-menu__context {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          margin-top: 30px;
          padding-bottom: 14px;

          border-bottom:
            1px solid rgba(255, 255, 255, 0.06);

          color: rgba(210, 220, 228, 0.27);

          font-size: 6px;
          font-weight: 550;
          letter-spacing: 0.18em;
        }

        /* ==================================================
           NAV
        ================================================== */

        .an-menu__nav {
          display: block;

          width: 100%;
          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          overflow-x: hidden;
          overflow-y: auto;

          padding: 5px 0;

          scrollbar-width: none;
        }

        .an-menu__nav::-webkit-scrollbar {
          display: none;
        }

        /* ==================================================
           ITEM
        ================================================== */

        .an-menu__item {
          position: relative;

          width: 100%;

          display: grid;

          grid-template-columns:
            32px minmax(0, 1fr) 24px;

          align-items: center;

          gap: 13px;

          min-height: 67px;
          padding: 11px 5px;

          border-bottom:
            1px solid rgba(255, 255, 255, 0.045);

          color: inherit;
          text-decoration: none;

          opacity: 0;
          flex: none;

          animation:
            anMenuItemIn
            0.6s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;

          animation-delay:
            calc(0.1s + var(--menu-index) * 0.035s);

          transition:
            padding 0.35s
              cubic-bezier(0.16, 1, 0.3, 1),
            background 0.35s ease;
        }

        .an-menu__item::before {
          content: "";

          position: absolute;

          top: 17px;
          bottom: 17px;
          left: 0;

          width: 1px;

          background: rgba(255, 255, 255, 0);

          transition: background 0.35s ease;
        }

        .an-menu__item-index {
          color: rgba(220, 228, 234, 0.2);

          font-size: 7px;
          font-weight: 550;
          letter-spacing: 0.12em;
        }

        .an-menu__item-copy {
          min-width: 0;

          display: flex;
          flex-direction: column;

          gap: 5px;
        }

        .an-menu__item-copy strong {
          display: block;

          overflow: hidden;

          color: rgba(244, 247, 249, 0.8);

          font-size: 15px;
          font-weight: 390;
          line-height: 1.2;
          letter-spacing: -0.015em;

          text-overflow: ellipsis;
          white-space: nowrap;

          transition: color 0.3s ease;
        }

        .an-menu__item-copy small {
          display: block;

          overflow: hidden;

          color: rgba(215, 224, 230, 0.28);

          font-size: 7px;
          font-weight: 450;
          line-height: 1.3;
          letter-spacing: 0.055em;

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .an-menu__item-arrow {
          color: rgba(230, 237, 242, 0.22);

          font-size: 13px;
          text-align: right;

          transition:
            color 0.3s ease,
            transform 0.35s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ==================================================
           ACTIVE
        ================================================== */

        .an-menu__item.is-active::before {
          background: rgba(238, 244, 248, 0.6);
        }

        .an-menu__item.is-active
        .an-menu__item-index {
          color: rgba(238, 244, 248, 0.52);
        }

        .an-menu__item.is-active
        .an-menu__item-copy strong {
          color: rgba(250, 252, 253, 0.98);
        }

        .an-menu__item.is-active
        .an-menu__item-arrow {
          color: rgba(245, 248, 250, 0.66);
        }

        @media (hover: hover) {
          .an-menu__item:hover {
            padding-left: 12px;

            background:
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.027),
                transparent
              );
          }

          .an-menu__item:hover::before {
            background: rgba(255, 255, 255, 0.42);
          }

          .an-menu__item:hover
          .an-menu__item-copy strong {
            color: rgba(252, 253, 254, 0.98);
          }

          .an-menu__item:hover
          .an-menu__item-arrow {
            color: rgba(255, 255, 255, 0.7);
            transform: translateX(3px);
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
          justify-content: space-between;

          gap: 20px;

          min-height: 54px;
          padding: 12px 15px;

          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 15px;

          background: rgba(255, 255, 255, 0.016);

          color: rgba(240, 245, 248, 0.56);

          text-decoration: none;
        }

        .an-menu__external a > span:first-child {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .an-menu__external small {
          color: rgba(215, 224, 230, 0.25);

          font-size: 5px;
          letter-spacing: 0.17em;
        }

        .an-menu__external strong {
          font-size: 10px;
          font-weight: 450;
          letter-spacing: 0.08em;
        }

        /* ==================================================
           FOOT
        ================================================== */

        .an-menu__foot {
          flex: 0 0 auto;

          display: flex;
          flex-wrap: wrap;
          align-items: center;

          gap: 7px 10px;

          margin-top: 18px;

          color: rgba(210, 220, 226, 0.19);

          font-size: 5px;
          font-weight: 560;
          letter-spacing: 0.14em;
        }

        .an-menu__foot i {
          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: rgba(220, 228, 234, 0.22);
        }

        /* ==================================================
           CLOSING
        ================================================== */

        .an-menu.is-closing .an-menu__panel {
          animation:
            anMenuPanelOut
            0.4s
            cubic-bezier(0.4, 0, 1, 1)
            forwards;
        }

        .an-menu.is-closing .an-menu__backdrop {
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
              translate3d(24px, 0, 0)
              scale(0.985);
          }

          to {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
        }

        @keyframes anMenuPanelOut {
          from {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          to {
            opacity: 0;
            transform:
              translate3d(20px, 0, 0)
              scale(0.99);
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
            transform: translate3d(0, 9px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 640px) {
          .an-menu__trigger {
            top: max(
              11px,
              calc(env(safe-area-inset-top) + 7px)
            );

            right: max(
              11px,
              calc(env(safe-area-inset-right) + 7px)
            );

            width: 44px;
            height: 44px;

            border-radius: 14px;

            background:
              radial-gradient(
                circle at 50% 0%,
                rgba(255, 255, 255, 0.020),
                transparent 65%
              ),
              linear-gradient(
                145deg,
                rgba(13, 14, 16, 0.16),
                rgba(0, 0, 0, 0.26)
              );

            -webkit-backdrop-filter:
              blur(18px) saturate(104%);

            backdrop-filter:
              blur(18px) saturate(104%);
          }

          .an-menu__trigger-lines {
            width: 18px;
            gap: 4px;
          }

          .an-menu__panel {
            top: max(8px, env(safe-area-inset-top));
            right: max(8px, env(safe-area-inset-right));
            bottom: max(8px, env(safe-area-inset-bottom));
            left: max(8px, env(safe-area-inset-left));

            width: auto;
            max-width: none;

            max-height: calc(100dvh - 16px);

            padding: 23px 19px 18px;

            border-radius: 24px;

            background:
              radial-gradient(
                circle at 50% 0%,
                rgba(255, 255, 255, 0.020) 0%,
                rgba(255, 255, 255, 0.006) 24%,
                transparent 50%
              ),
              linear-gradient(
                145deg,
                rgba(13, 14, 16, 0.16) 0%,
                rgba(6, 7, 9, 0.20) 50%,
                rgba(0, 0, 0, 0.26) 100%
              );

            -webkit-backdrop-filter:
              blur(18px) saturate(104%);

            backdrop-filter:
              blur(18px) saturate(104%);
          }

          .an-menu__brand > span {
            font-size: 13px;
          }

          .an-menu__brand > small {
            margin-top: 6px;
            font-size: 5px;
            letter-spacing: 0.14em;
          }

          .an-menu__close {
            width: 38px;
            height: 38px;
          }

          .an-menu__context {
            margin-top: 20px;
            padding-bottom: 12px;
            font-size: 5px;
          }

          .an-menu__nav {
            display: block !important;

            width: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;

            flex: 1 1 auto !important;

            overflow-x: hidden !important;
            overflow-y: auto !important;

            padding: 3px 0 !important;

            overscroll-behavior: contain;

            -webkit-overflow-scrolling: touch;
          }

          .an-menu__item {
            position: relative !important;

            width: 100% !important;
            max-width: none !important;

            min-height: 58px !important;

            display: grid !important;

            grid-template-columns:
              25px minmax(0, 1fr) 20px !important;

            align-items: center !important;

            gap: 10px !important;

            padding: 9px 3px !important;
            margin: 0 !important;

            border: 0 !important;

            border-bottom:
              1px solid rgba(255, 255, 255, 0.045)
              !important;

            border-radius: 0 !important;

            background: transparent !important;
            box-shadow: none !important;

            flex: none !important;
          }

          .an-menu__item::before {
            top: 14px !important;
            bottom: 14px !important;
          }

          .an-menu__item-index {
            font-size: 6px !important;
          }

          .an-menu__item-copy {
            display: flex !important;

            min-width: 0 !important;

            flex-direction: column !important;
            gap: 4px !important;
          }

          .an-menu__item-copy strong {
            display: block !important;
            overflow: hidden !important;

            font-size: 13px !important;
            font-weight: 410 !important;
            line-height: 1.2 !important;

            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .an-menu__item-copy small {
            display: block !important;
            overflow: hidden !important;

            font-size: 6px !important;
            line-height: 1.25 !important;

            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .an-menu__item-arrow {
            display: block !important;

            font-size: 12px !important;
            text-align: right !important;
          }

          .an-menu__external {
            padding-top: 10px !important;
          }

          .an-menu__external a {
            min-height: 48px !important;
            padding: 10px 13px !important;
            border-radius: 13px !important;
          }

          .an-menu__foot {
            gap: 5px 8px !important;

            margin-top: 12px !important;

            font-size: 4.5px !important;
            letter-spacing: 0.11em !important;
          }
        }

        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 390px) {
          .an-menu__panel {
            padding: 20px 16px 16px;
            border-radius: 21px;
          }

          .an-menu__item {
            min-height: 54px !important;
          }

          .an-menu__item-copy strong {
            font-size: 12px !important;
          }

          .an-menu__brand > small {
            max-width: 210px;
            line-height: 1.45;
          }
        }

        /* ==================================================
           SHORT VIEWPORT
        ================================================== */

        @media (max-height: 720px) {
          .an-menu__panel {
            padding-top: 20px;
          }

          .an-menu__context {
            margin-top: 16px;
          }

          .an-menu__item {
            min-height: 52px;
          }

          .an-menu__external {
            padding-top: 8px;
          }

          .an-menu__foot {
            margin-top: 9px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .an-menu__panel,
          .an-menu__backdrop,
          .an-menu__item {
            animation: none !important;
          }

          .an-menu__item {
            opacity: 1 !important;
          }

          .an-menu__trigger,
          .an-menu__close,
          .an-menu__item,
          .an-menu__item-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}