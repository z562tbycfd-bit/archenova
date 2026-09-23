"use client";

import { useEffect, useRef, useState } from "react";

const HOME_LINKS = [
  { id: "founder-digital-twin", label: "Founder" },
  { id: "archenova-search-section", label: "ArcheNova Map" },
  { id: "todays-inquiry", label: "Today's Inquiry" },
  { id: "humanity-responsibility", label: "Humanity & Responsibility" },
  { id: "works", label: "Works" },
  { id: "work-models", label: "Work Models" },
  { id: "civilization-space", label: "Civilization Space" },
  { id: "archenova-valley", label: "ArcheNova Valley" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
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
      {open ? (
        <path d="M5 5l14 14M19 5L5 19" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function EpistemeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5.5a4 4 0 0 0-7 2.4 4 4 0 0 0-.5 7.1A4 4 0 0 0 12 18.5V5.5Z" />
      <path d="M12 5.5a4 4 0 0 1 7 2.4 4 4 0 0 1 .5 7.1 4 4 0 0 1-7.5 3.5v-13Z" />
      <path d="M8.5 9.5 12 12l3.5-2.5M12 12v6.5" />
    </svg>
  );
}

export default function ArcheNovaHeader() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const directionDistance = useRef(0);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;

    if (menuOpen) {
      setVisible(true);
    }
  }, [menuOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    let frame = 0;

    const update = () => {
      frame = 0;

      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;

      if (currentY <= 80 || menuOpenRef.current) {
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
        }

        if (directionDistance.current < -18) {
          setVisible(true);
          directionDistance.current = 0;
        }
      }

      lastScrollY.current = currentY;
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    setVisible(true);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
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
    >
      <div className="an-top-header__bar">
        <div className="an-top-header__side">
          <button
            type="button"
            className="an-top-header__icon"
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="an-top-header-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <a
          href="#home-top"
          className="an-top-header__brand"
          aria-label="ArcheNova — Back to top"
          onClick={(event) => {
            event.preventDefault();
            navigate("home-top");
          }}
        >
          ArcheNova
        </a>

        <div className="an-top-header__side an-top-header__side--right">
          <button
            type="button"
            className="an-top-header__icon"
            aria-label="Go to Episteme"
            title="Episteme"
            onClick={() => navigate("founder-digital-twin")}
          >
            <EpistemeIcon />
          </button>
        </div>
      </div>

      <nav
        id="an-top-header-menu"
        className="an-top-header__menu"
        aria-label="ArcheNova navigation"
        hidden={!menuOpen}
      >
        <div className="an-top-header__menu-label">
          EXPLORE ARCHE NOVA
        </div>

        {HOME_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => navigate(link.id)}
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </nav>
    </header>
  );
}