"use client";

import { useEffect, useRef, useState } from "react";

const ARCHENOVA_MENU_OPEN_EVENT = "archenova:menu-open";
const ARCHENOVA_MENU_STATE_EVENT = "archenova:menu-state";

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function ArcheNovaHeader() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const directionDistance = useRef(0);
  const frameRef = useRef<number | null>(null);

  /* ========================================================
     HOME HEADER ACTIVE
     --------------------------------------------------------
     Hide only the original floating Menu.tsx trigger.
     Keep the existing Menu.tsx component mounted.
  ======================================================== */

  useEffect(() => {
    document.body.classList.add("an-home-header-active");

    return () => {
      document.body.classList.remove(
        "an-home-header-active",
      );
    };
  }, []);

  /* ========================================================
     MENU STATE
     --------------------------------------------------------
     Menu.tsx reports its open/closing state.
     The header does not own or duplicate menu state.
  ======================================================== */

  useEffect(() => {
    const onMenuState = (event: Event) => {
      const customEvent = event as CustomEvent<{
        open: boolean;
      }>;

      setMenuOpen(Boolean(customEvent.detail?.open));
    };

    window.addEventListener(
      ARCHENOVA_MENU_STATE_EVENT,
      onMenuState,
    );

    return () => {
      window.removeEventListener(
        ARCHENOVA_MENU_STATE_EVENT,
        onMenuState,
      );
    };
  }, []);

  /* ========================================================
     HEADER REVEAL
     --------------------------------------------------------
     Hide on downward scrolling.
     Reveal on upward scrolling.
     Keep visible while the menu is open.
  ======================================================== */

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      frameRef.current = null;

      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;

      if (currentY <= 80 || menuOpen) {
        setVisible(true);
        directionDistance.current = 0;
      } else if (Math.abs(delta) > 0.5) {
        const previous = directionDistance.current;

        directionDistance.current =
          Math.sign(previous) === Math.sign(delta)
            ? previous + delta
            : delta;

        if (directionDistance.current > 24) {
          setVisible(false);
          directionDistance.current = 0;
        } else if (directionDistance.current < -18) {
          setVisible(true);
          directionDistance.current = 0;
        }
      }

      lastScrollY.current = currentY;
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current =
          window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [menuOpen]);

  /* ========================================================
     OPEN EXISTING MENU DIRECTLY
     --------------------------------------------------------
     No hidden-button lookup.
     No .click() proxy.
     Menu.tsx handles the actual opening.
  ======================================================== */

  const openExistingMenu = () => {
    setVisible(true);

    window.dispatchEvent(
      new Event(ARCHENOVA_MENU_OPEN_EVENT),
    );
  };

  /* ========================================================
     BACK TO HOME TOP
  ======================================================== */

  const backToTop = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.getElementById("home-top")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    setVisible(true);
  };

  return (
    <header
      className={[
        "an-top-header",
        "an-top-header--minimal",
        visible || menuOpen
          ? "an-top-header--visible"
          : "an-top-header--hidden",
      ].join(" ")}
      aria-label="ArcheNova header"
    >
      <div className="an-top-header__bar">
        <div className="an-top-header__side">
          <button
            type="button"
            className="an-top-header__icon"
            aria-label="Open ArcheNova navigation"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={openExistingMenu}
          >
            <MenuIcon />
          </button>
        </div>

        <a
          href="#home-top"
          className="an-top-header__brand"
          aria-label="ArcheNova — Back to top"
          onClick={(event) => {
            event.preventDefault();
            backToTop();
          }}
        >
          ArcheNova
        </a>

        <div
          className={[
            "an-top-header__side",
            "an-top-header__side--right",
          ].join(" ")}
          aria-hidden="true"
        >
          <span className="an-top-header__balance" />
        </div>
      </div>
    </header>
  );
}