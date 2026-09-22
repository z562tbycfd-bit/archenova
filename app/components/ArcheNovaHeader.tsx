"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "founder-digital-twin", label: "Founder" },
  { id: "archenova-search-section", label: "ArcheNova Map" },
  { id: "todays-inquiry", label: "Today's Inquiry" },
  { id: "humanity-responsibility", label: "Humanity & Responsibility" },
  { id: "works", label: "Works" },
  { id: "work-models", label: "Work Models" },
  { id: "civilization-space", label: "Civilization Space" },
  { id: "archenova-valley", label: "ArcheNova Valley" },
] as const;

type IconName = "menu" | "close" | "search" | "brain" | "arrow";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg {...common}>
        <path d="M5 5l14 14M19 5L5 19" />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    );
  }

  if (name === "brain") {
    return (
      <svg {...common}>
        <path d="M12 5.2a4 4 0 0 0-7.1 2.4 4 4 0 0 0-.5 7.2A4 4 0 0 0 12 18.5V5.2ZM12 5.2a4 4 0 0 1 7.1 2.4 4 4 0 0 1 .5 7.2A4 4 0 0 1 12 18.5V5.2Z" />
        <path d="M8.5 9.5 12 12l3.5-2.5M12 12v6.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/**
 * HOME-only header.
 *
 * - Visible at the top of the page
 * - Hides while scrolling down
 * - Reappears while scrolling up
 * - Remains visible while the menu is open
 * - Does not modify Portal or HomeSectionPager behavior
 */
export default function ArcheNovaHeader() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastY = useRef(0);
  const visibleRef = useRef(true);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;

    if (menuOpen) {
      visibleRef.current = true;
      setVisible(true);
    }
  }, [menuOpen]);

  useEffect(() => {
    lastY.current = window.scrollY;

    let scheduled = false;
    let frameId = 0;

    const update = () => {
      scheduled = false;

      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;

      if (menuOpenRef.current || y < 100) {
        if (!visibleRef.current) {
          visibleRef.current = true;
          setVisible(true);
        }
      } else if (delta > 7 && visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      } else if (delta < -7 && !visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      lastY.current = y;
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        frameId = window.requestAnimationFrame(update);
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
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`an-top-header${
        visible || menuOpen
          ? " an-top-header--visible"
          : " an-top-header--hidden"
      }`}
    >
      <div className="an-top-header__bar">
        <div className="an-top-header__actions">
          <button
            type="button"
            className="an-top-header__icon"
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="an-top-header-menu"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>

          <button
            type="button"
            className="an-top-header__icon"
            aria-label="Go to ArcheNova Map"
            onClick={() => navigate("archenova-search-section")}
          >
            <Icon name="search" />
          </button>
        </div>

        <a
          className="an-top-header__brand"
          href="#home-top"
          aria-label="ArcheNova home"
          onClick={(event) => {
            event.preventDefault();
            navigate("home-top");
          }}
        >
          <span>ArcheNova</span>
          <small>ENGINEERING REALITY</small>
        </a>

        <div className="an-top-header__actions an-top-header__actions--right">
          <button
            type="button"
            className="an-top-header__icon"
            aria-label="Go to Founder"
            onClick={() => navigate("founder-digital-twin")}
          >
            <Icon name="brain" />
          </button>

          <button
            type="button"
            className="an-top-header__icon"
            aria-label="Go to Civilization Space"
            onClick={() => navigate("civilization-space")}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      <nav
        id="an-top-header-menu"
        className="an-top-header__menu"
        aria-label="HOME sections"
        hidden={!menuOpen}
      >
        {SECTIONS.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => navigate(section.id)}
          >
            {section.label}
            <Icon name="arrow" />
          </button>
        ))}
      </nav>
    </header>
  );
}