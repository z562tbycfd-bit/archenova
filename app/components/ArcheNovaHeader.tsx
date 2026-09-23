"use client";

import { useEffect, useRef, useState } from "react";

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

  /*
   * HOME-only class.
   *
   * Hides the original Menu.tsx trigger on HOME,
   * without removing or duplicating the existing menu.
   */
  useEffect(() => {
    document.body.classList.add("an-home-header-active");

    return () => {
      document.body.classList.remove("an-home-header-active");
    };
  }, []);

  /*
   * Observe the existing Menu.tsx state.
   *
   * Menu.tsx remains the single owner of:
   * - menu opening and closing
   * - route navigation
   * - HOME section navigation
   * - body scroll lock
   * - Escape handling
   */
  useEffect(() => {
    const updateMenuState = () => {
      const existingMenu = document.querySelector(".an-menu");

      const isOpen =
        existingMenu?.classList.contains("is-open") ?? false;

      const isClosing =
        existingMenu?.classList.contains("is-closing") ?? false;

      setMenuOpen(isOpen || isClosing);
    };

    updateMenuState();

    const observer = new MutationObserver(updateMenuState);

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Reveal on upward scrolling.
   * Hide on downward scrolling.
   *
   * Keep the header visible while the menu is open.
   */
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

  /*
   * Open the EXISTING Menu.tsx.
   *
   * Its original trigger is visually hidden on HOME,
   * but remains mounted so its established opening
   * behavior can be used without creating a second menu.
   */
  const openExistingMenu = () => {
    const trigger =
      document.querySelector<HTMLButtonElement>(
        ".an-menu__trigger",
      );

    if (trigger) {
      trigger.click();
      setVisible(true);
    }
  };

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
          className="an-top-header__side an-top-header__side--right"
          aria-hidden="true"
        >
          <span className="an-top-header__balance" />
        </div>
      </div>
    </header>
  );
}