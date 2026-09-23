"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/* ==========================================================
   ARCHENOVA — SLIM HEADER / FULLSCREEN GLASS OVERLAYS

   LEFT:
     Founder Vision → HOME上の全画面オーバーレイ
     Products       → HOME上の全画面オーバーレイ

   CENTER:
     ArcheNova      → HOME先頭

   RIGHT:
     Existing Menu.tsx

   Does not modify:
     HOME cards / Portal / HomeSectionPager / Menu.tsx
========================================================== */

const ARCHENOVA_MENU_OPEN_EVENT = "archenova:menu-open";
const ARCHENOVA_MENU_STATE_EVENT = "archenova:menu-state";

type Panel = "founder" | "products" | null;

const PRINCIPLES = [
  {
    number: "01",
    title: "Understand reality.",
    statement:
      "Scientific inquiry begins by accepting that reality is not obligated to conform to our explanations.",
    detail:
      "A theory, model, or measurement is a means of approaching reality—not a substitute for it. Every claim must remain open to observation, independent testing, and revision.",
  },
  {
    number: "02",
    title: "Build what can be verified.",
    statement:
      "Knowledge becomes technological capability only when it can be reproduced, tested, and made reliable.",
    detail:
      "The objective is not simply to demonstrate that something is possible. It is to establish the conditions under which it works, where it fails, and how it can be corrected.",
  },
  {
    number: "03",
    title: "Design for continuity.",
    statement:
      "A civilization-scale system must preserve the capacity to learn, recover, and change course.",
    detail:
      "Scale is not an end in itself. Systems should expand only while their consequences remain observable, their failures manageable, and their benefits durable.",
  },
] as const;

const INTENTIONS = [
  {
    index: "I",
    title: "Advance scientific understanding",
    description:
      "Develop questions, models, and experiments that distinguish what is known from what remains uncertain.",
  },
  {
    index: "II",
    title: "Turn knowledge into working systems",
    description:
      "Connect physical principles with engineering, implementation, and the practical constraints of real environments.",
  },
  {
    index: "III",
    title: "Build responsible long-term capability",
    description:
      "Develop systems that can remain useful across changing conditions without placing growth beyond the reach of independent correction.",
  },
] as const;

/* ==========================================================
   ICONS
========================================================== */

function FounderIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="7.5" r="3.25" />
      <path d="M5.5 20v-1.5a6.5 6.5 0 0 1 13 0V20" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.3" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.3" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.3" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.3" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function CloseIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function EpistemeSymbol() {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className="an-header-panel__episteme-symbol"
    >
      <circle
        cx="120"
        cy="120"
        r="83"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.8"
      />
      <circle
        cx="120"
        cy="120"
        r="58"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="0.8"
      />
      <ellipse
        cx="120"
        cy="120"
        rx="37"
        ry="83"
        stroke="currentColor"
        strokeOpacity="0.38"
        strokeWidth="0.9"
        transform="rotate(35 120 120)"
      />
      <ellipse
        cx="120"
        cy="120"
        rx="37"
        ry="83"
        stroke="currentColor"
        strokeOpacity="0.38"
        strokeWidth="0.9"
        transform="rotate(-35 120 120)"
      />
      <path
        d="M37 120H203M120 37V203"
        stroke="currentColor"
        strokeOpacity="0.11"
        strokeWidth="0.8"
      />
      <circle
        cx="120"
        cy="120"
        r="8"
        fill="currentColor"
        fillOpacity="0.88"
      />
      <circle
        cx="120"
        cy="120"
        r="18"
        stroke="currentColor"
        strokeOpacity="0.36"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/* ==========================================================
   SHARED PANEL CONTENT
========================================================== */

function PanelSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="an-header-panel__section">
      <span className="an-header-panel__eyebrow">
        {index}
      </span>

      <h2 className="an-header-panel__section-title">
        {title}
      </h2>

      {children}
    </section>
  );
}

/* ==========================================================
   FOUNDER VISION
========================================================== */

function FounderPanelContent() {
  return (
    <>
      <PanelSection
        index="THE FOUNDER'S PERSPECTIVE"
        title="Understand reality. Build capability. Preserve the future."
      >
        <p className="an-header-panel__description">
          ArcheNova begins with a conviction: scientific
          understanding should become reproducible
          technological capability, and that capability
          should contribute to civilization without
          exceeding humanity&apos;s ability to understand,
          correct, and govern its consequences.
        </p>

        <div className="an-header-panel__statement">
          <span>THE CONTINUOUS PATH</span>

          <p>
            Science → Engineering → Industrialization
            → Infrastructure → Governance → Civilization
          </p>
        </div>
      </PanelSection>

      <PanelSection
        index="01 / PERSPECTIVE"
        title="Three principles. One continuous inquiry."
      >
        <p className="an-header-panel__description">
          The purpose is not to defend a permanent
          explanation or preserve a particular
          technology. It is to establish a way of
          thinking that remains accountable to reality
          as knowledge and capability grow.
        </p>

        <div className="an-header-panel__principles">
          {PRINCIPLES.map((principle) => (
            <article
              key={principle.number}
              className="an-header-panel__principle"
            >
              <span className="an-header-panel__item-index">
                {principle.number}
              </span>

              <h3>{principle.title}</h3>

              <p className="an-header-panel__item-statement">
                {principle.statement}
              </p>

              <div className="an-header-panel__item-divider" />

              <p className="an-header-panel__item-detail">
                {principle.detail}
              </p>
            </article>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        index="02 / INTENTION"
        title="What ArcheNova is intended to realize."
      >
        <p className="an-header-panel__description">
          A connected path from scientific questions
          to practical systems and their long-term
          consequences.
        </p>

        <div className="an-header-panel__intent-list">
          {INTENTIONS.map((intention) => (
            <article
              key={intention.index}
              className="an-header-panel__intent"
            >
              <span className="an-header-panel__item-index">
                {intention.index}
              </span>

              <div>
                <h3>{intention.title}</h3>
                <p>{intention.description}</p>
              </div>
            </article>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        index="03 / RESPONSIBILITY"
        title="Capability is meaningful only when responsibility grows with it."
      >
        <p className="an-header-panel__description">
          The enduring objective is to build systems
          that expand what humanity can understand
          and accomplish while preserving the ability
          to question, correct, recover, and choose
          a different path.
        </p>
      </PanelSection>
    </>
  );
}

/* ==========================================================
   PRODUCTS
========================================================== */

function ProductsPanelContent({
  onExploreEpisteme,
  onOpenFounder,
}: {
  onExploreEpisteme: () => void;
  onOpenFounder: () => void;
}) {
  return (
    <>
      <PanelSection
        index="ARCHENOVA PRODUCTS"
        title="Ideas become capability."
      >
        <p className="an-header-panel__description">
          Products developed through ArcheNova&apos;s
          founding initiative—connecting scientific
          inquiry, engineering, and intelligence with
          practical systems designed for long-term
          human value.
        </p>
      </PanelSection>

      <PanelSection
        index="01 / PRODUCT DIRECTORY"
        title="Explore the products."
      >
        <p className="an-header-panel__description">
          Each product represents a distinct capability
          developed within ArcheNova. Availability
          reflects the current implementation stage.
        </p>

        <article className="an-header-panel__product">
          <div className="an-header-panel__product-top">
            <span>COGNITIVE INTELLIGENCE</span>

            <span className="an-header-panel__status">
              <span className="an-header-panel__status-dot" />
              AVAILABLE
            </span>
          </div>

          <div className="an-header-panel__product-visual">
            <EpistemeSymbol />
          </div>

          <div className="an-header-panel__product-body">
            <h3>Episteme</h3>

            <p className="an-header-panel__product-headline">
              An intelligence interface for scientific
              and civilizational inquiry.
            </p>

            <p className="an-header-panel__description">
              Episteme is ArcheNova&apos;s cognitive
              intelligence initiative, designed to
              connect natural conversation with
              scientific exploration, engineering
              reasoning, and questions of long-term
              civilization design.
            </p>

            <div className="an-header-panel__capabilities">
              <span>Conversational intelligence</span>
              <span>Scientific exploration</span>
              <span>Engineering reasoning</span>
              <span>Civilization intelligence</span>
            </div>

            <button
              type="button"
              className="an-header-panel__action"
              onClick={onExploreEpisteme}
            >
              Explore Episteme
              <ArrowIcon />
            </button>
          </div>
        </article>
      </PanelSection>

      <PanelSection
        index="02 / DEVELOPMENT PRINCIPLE"
        title="Built to be useful. Designed to evolve."
      >
        <p className="an-header-panel__description">
          ArcheNova&apos;s product development connects
          scientific understanding with reproducible
          engineering. Capabilities are introduced
          through implementation and validation,
          rather than presented as completed products
          before they exist.
        </p>

        <button
          type="button"
          className="an-header-panel__text-action"
          onClick={onOpenFounder}
        >
          Explore the founder&apos;s vision
          <ArrowIcon />
        </button>
      </PanelSection>
    </>
  );
}

/* ==========================================================
   FULLSCREEN OVERLAY

   Rendered into document.body so HOME's section layout,
   clipping and stacking contexts cannot constrain it.
========================================================== */

function HeaderPanel({
  panel,
  onClose,
  onOpenFounder,
  onExploreEpisteme,
}: {
  panel: Exclude<Panel, null>;
  onClose: () => void;
  onOpenFounder: () => void;
  onExploreEpisteme: () => void;
}) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    surfaceRef.current?.focus();

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [panel]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const surface = surfaceRef.current;

      if (!surface) return;

      const focusable = Array.from(
        surface.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.getClientRects().length > 0,
      );

      if (focusable.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === surface)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [onClose]);

  const title =
    panel === "founder"
      ? "Founder Vision"
      : "ArcheNova Products";

  return createPortal(
    <div className="an-header-panel">
      <button
        type="button"
        className="an-header-panel__backdrop"
        aria-label={`Close ${title}`}
        onClick={onClose}
      />

      <div
        ref={surfaceRef}
        className="an-header-panel__surface"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className="an-header-panel__top">
          <div className="an-header-panel__identity">
            <span>ArcheNova</span>
            <small>
              {panel === "founder"
                ? "FOUNDER VISION"
                : "PRODUCTS"}
            </small>
          </div>

          <button
            type="button"
            className="an-header-panel__close"
            aria-label={`Close ${title}`}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="an-header-panel__scroll"
        >
          <div className="an-header-panel__content">
            {panel === "founder" ? (
              <FounderPanelContent />
            ) : (
              <ProductsPanelContent
                onExploreEpisteme={onExploreEpisteme}
                onOpenFounder={onOpenFounder}
              />
            )}
          </div>
        </div>

        <div className="an-header-panel__foot">
          <span>ARCHENOVA</span>
          <span>SCIENCE · TECHNOLOGY · CIVILIZATION</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ==========================================================
   HEADER
========================================================== */

export default function ArcheNovaHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/home";

  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [mounted, setMounted] = useState(false);

  const lastScrollY = useRef(0);
  const directionDistance = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    document.body.classList.add(
      "an-home-header-active",
    );

    return () => {
      document.body.classList.remove(
        "an-home-header-active",
      );
    };
  }, []);

  /* ========================================================
     EXISTING MENU STATE
  ======================================================== */

  useEffect(() => {
    const onMenuState = (event: Event) => {
      const customEvent = event as CustomEvent<{
        open: boolean;
      }>;

      const open = Boolean(customEvent.detail?.open);

      setMenuOpen(open);

      if (open) {
        setPanel(null);
        setVisible(true);
      }
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
     SCROLL HIDE / REVEAL
  ======================================================== */

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    directionDistance.current = 0;

    const update = () => {
      frameRef.current = null;

      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;

      if (currentY <= 80 || menuOpen || panel !== null) {
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

    update();

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll,
      );

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [menuOpen, panel, pathname]);

  /* ========================================================
     ROUTE CHANGE
  ======================================================== */

  useEffect(() => {
    setPanel(null);
    setVisible(true);

    directionDistance.current = 0;
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  /* ========================================================
     PANEL ACTIONS
  ======================================================== */

  const openPanel = (
    nextPanel: Exclude<Panel, null>,
  ) => {
    setVisible(true);
    setPanel(nextPanel);
  };

  const closePanel = () => {
    setPanel(null);
  };

  const openExistingMenu = () => {
    setPanel(null);
    setVisible(true);

    window.dispatchEvent(
      new Event(ARCHENOVA_MENU_OPEN_EVENT),
    );
  };

  /* ========================================================
     HOME ACTION
  ======================================================== */

  const backToHome = () => {
    setPanel(null);
    setVisible(true);

    if (!isHome) {
      router.push("/home");
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const behavior: ScrollBehavior = reducedMotion
      ? "auto"
      : "smooth";

    const homeTop = document.getElementById("home-top");

    if (homeTop) {
      homeTop.scrollIntoView({
        behavior,
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior,
      });
    }
  };

  const exploreEpisteme = () => {
    setPanel(null);
    setVisible(true);

    if (!isHome) {
      router.push("/home");
      return;
    }

    const portal = document.querySelector<HTMLElement>(
      "#episteme, #episteme-portal, [data-episteme-portal]",
    );

    if (portal) {
      portal.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={[
          "an-top-header",
          "an-top-header--minimal",
          visible || menuOpen || panel !== null
            ? "an-top-header--visible"
            : "an-top-header--hidden",
        ].join(" ")}
        aria-label="ArcheNova header"
      >
        <div className="an-top-header__bar">
          {/* LEFT */}

          <nav
            className={[
              "an-top-header__side",
              "an-top-header__side--left",
            ].join(" ")}
            aria-label="ArcheNova featured content"
          >
            <button
              type="button"
              className="an-top-header__icon"
              aria-label="Open Founder Vision"
              title="Founder Vision"
              aria-haspopup="dialog"
              aria-expanded={panel === "founder"}
              onClick={() => openPanel("founder")}
            >
              <FounderIcon />
            </button>

            <button
              type="button"
              className="an-top-header__icon"
              aria-label="Open ArcheNova Products"
              title="Products"
              aria-haspopup="dialog"
              aria-expanded={panel === "products"}
              onClick={() => openPanel("products")}
            >
              <ProductsIcon />
            </button>
          </nav>

          {/* CENTER */}

          <button
            type="button"
            className="an-top-header__brand"
            aria-label={
              isHome
                ? "ArcheNova — Back to HOME top"
                : "ArcheNova — Go to HOME"
            }
            onClick={backToHome}
          >
            ArcheNova
          </button>

          {/* RIGHT */}

          <div className="an-top-header__side an-top-header__side--right">
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
        </div>
      </header>

      {mounted && panel !== null && (
        <HeaderPanel
          panel={panel}
          onClose={closePanel}
          onOpenFounder={() => openPanel("founder")}
          onExploreEpisteme={exploreEpisteme}
        />
      )}
    </>
  );
}