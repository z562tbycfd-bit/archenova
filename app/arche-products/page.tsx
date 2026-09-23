"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA — PRODUCTS

   Dedicated product directory.

   Route:
   /arche-products

   Design:
   Minimal black glass
   Product-first presentation
   Functional navigation only

   Existing HOME / Founder / Menu remain unchanged.
========================================================== */

/* ==========================================================
   TYPES
========================================================== */

type ProductStatus =
  | "AVAILABLE"
  | "DEVELOPMENT"
  | "RESEARCH";

type Product = {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  status: ProductStatus;
  href?: string;
  capabilities: readonly string[];
};

/* ==========================================================
   PRODUCT REGISTRY

   Only provide href when the destination exists.

   Add future ArcheNova products here after their
   corresponding pages or applications are implemented.
========================================================== */

const PRODUCTS: readonly Product[] = [
  {
    id: "episteme",

    name: "Episteme",

    category: "COGNITIVE INTELLIGENCE",

    headline:
      "An intelligence interface for scientific and civilizational inquiry.",

    description:
      "Episteme is ArcheNova's cognitive intelligence initiative, designed to connect natural conversation with scientific exploration, engineering reasoning, and questions of long-term civilization design.",

    status: "AVAILABLE",

    href: "/home",

    capabilities: [
      "Conversational intelligence",
      "Scientific exploration",
      "Engineering reasoning",
      "Civilization intelligence",
    ],
  },
];

/* ==========================================================
   ICONS
========================================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
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
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function EpistemeSymbol() {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className="ap-episteme-symbol"
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
   REVEAL
========================================================== */

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (entry) => entry.isIntersecting,
          )
        ) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "ap-reveal",
        visible ? "is-visible" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* ==========================================================
   STATUS
========================================================== */

function ProductStatusLabel({
  status,
}: {
  status: ProductStatus;
}) {
  const labels: Record<ProductStatus, string> = {
    AVAILABLE: "AVAILABLE",
    DEVELOPMENT: "IN DEVELOPMENT",
    RESEARCH: "RESEARCH",
  };

  return (
    <span
      className={[
        "ap-product-status",
        `ap-product-status--${status.toLowerCase()}`,
      ].join(" ")}
    >
      <span className="ap-product-status__dot" />

      {labels[status]}
    </span>
  );
}

/* ==========================================================
   PRODUCT CARD
========================================================== */

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const available =
    product.status === "AVAILABLE" &&
    Boolean(product.href);

  return (
    <article className="ap-product-card">
      <div className="ap-product-card__top">
        <span className="ap-product-card__category">
          {product.category}
        </span>

        <ProductStatusLabel
          status={product.status}
        />
      </div>

      <div className="ap-product-card__visual">
        <div className="ap-product-card__visual-glow" />

        {product.id === "episteme" ? (
          <EpistemeSymbol />
        ) : (
          <span className="ap-product-card__fallback">
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="ap-product-card__body">
        <h2>{product.name}</h2>

        <p className="ap-product-card__headline">
          {product.headline}
        </p>

        <p className="ap-product-card__description">
          {product.description}
        </p>

        <div className="ap-product-card__capabilities">
          {product.capabilities.map(
            (capability) => (
              <span key={capability}>
                {capability}
              </span>
            ),
          )}
        </div>

        <div className="ap-product-card__footer">
          {available && product.href ? (
            <Link
              href={product.href}
              className="ap-product-card__action"
              aria-label={`Explore ${product.name}`}
            >
              Explore {product.name}

              <ArrowIcon diagonal />
            </Link>
          ) : (
            <span className="ap-product-card__unavailable">
              {product.status === "DEVELOPMENT"
                ? "In development"
                : "Research in progress"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ==========================================================
   PAGE
========================================================== */

export default function ArcheProductsPage() {
  return (
    <main className="ap-page">
      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div
        className="ap-background"
        aria-hidden="true"
      >
        <div className="ap-background__glow" />
        <div className="ap-background__grid" />
      </div>

      {/* ==================================================
          TOPBAR
      ================================================== */}

      <header className="ap-topbar">
        <Link
          href="/home"
          className="ap-topbar__brand"
          aria-label="Return to ArcheNova HOME"
        >
          <span className="ap-topbar__mark">
            A
          </span>

          <span>ArcheNova</span>
        </Link>

        <span className="ap-topbar__label">
          PRODUCTS
        </span>
      </header>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="ap-hero"
        aria-labelledby="ap-title"
      >
        <Reveal>
          <div className="ap-eyebrow">
            <span className="ap-eyebrow__line" />

            ARCHENOVA PRODUCTS
          </div>

          <h1 id="ap-title">
            Ideas become
            <br />
            <span>capability.</span>
          </h1>

          <p className="ap-hero__description">
            Products developed through ArcheNova's
            founding initiative—connecting scientific
            inquiry, engineering, and intelligence
            with practical systems designed for
            long-term human value.
          </p>
        </Reveal>

        <div className="ap-hero__bottom">
          <span>
            INDEPENDENT BY DESIGN
          </span>

          <span>
            SCIENCE / TECHNOLOGY / INTELLIGENCE
          </span>
        </div>
      </section>

      {/* ==================================================
          PRODUCT DIRECTORY
      ================================================== */}

      <section
        className="ap-products"
        aria-labelledby="ap-products-title"
      >
        <Reveal>
          <div className="ap-section-heading">
            <span className="ap-section-index">
              01 / PRODUCT DIRECTORY
            </span>

            <h2 id="ap-products-title">
              Explore the products.
            </h2>

            <p>
              Each product represents a distinct
              capability developed within ArcheNova.
              Availability reflects the current
              implementation stage.
            </p>
          </div>
        </Reveal>

        <div className="ap-products__grid">
          {PRODUCTS.map((product) => (
            <Reveal key={product.id}>
              <ProductCard
                product={product}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================================================
          DEVELOPMENT PRINCIPLE
      ================================================== */}

      <section
        className="ap-principle"
        aria-labelledby="ap-principle-title"
      >
        <Reveal>
          <div className="ap-principle__panel">
            <span className="ap-section-index">
              02 / DEVELOPMENT PRINCIPLE
            </span>

            <h2 id="ap-principle-title">
              Built to be useful.
              <br />
              Designed to evolve.
            </h2>

            <p>
              ArcheNova's product development connects
              scientific understanding with reproducible
              engineering. Capabilities are introduced
              through implementation and validation,
              rather than presented as completed
              products before they exist.
            </p>

            <Link
              href="/founder-vision"
              className="ap-principle__link"
            >
              Explore the founder's vision

              <ArrowIcon diagonal />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="ap-footer">
        <span>ARCHENOVA</span>

        <Link href="/home">
          RETURN HOME
          <ArrowIcon />
        </Link>
      </footer>

      {/* ==================================================
          STYLES
      ================================================== */}

      <style jsx global>{`
        /* ==================================================
           ROOT
        ================================================== */

        .ap-page {
          --ap-text:
            rgba(245, 247, 249, 0.94);

          --ap-muted:
            rgba(220, 227, 233, 0.49);

          --ap-faint:
            rgba(220, 227, 233, 0.29);

          position: relative;

          min-height: 100vh;
          min-height: 100dvh;

          overflow: clip;

          isolation: isolate;

          background: #08090b;

          color: var(--ap-text);
        }

        .ap-page *,
        .ap-page *::before,
        .ap-page *::after {
          box-sizing: border-box;
        }

        .ap-page a {
          color: inherit;
        }

        /* ==================================================
           BACKGROUND
        ================================================== */

        .ap-background {
          position: absolute;
          inset: 0;

          z-index: -1;

          overflow: hidden;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 50% 4%,
              rgba(65, 74, 90, 0.13),
              transparent 43%
            ),
            linear-gradient(
              180deg,
              #0b0c0f,
              #08090b 48%,
              #07080a
            );
        }

        .ap-background__glow {
          position: absolute;

          top: -260px;
          left: 50%;

          width: min(1100px, 140vw);
          height: 760px;

          border-radius: 50%;

          transform: translateX(-50%);

          background:
            radial-gradient(
              ellipse,
              rgba(134, 148, 170, 0.085),
              transparent 68%
            );

          filter: blur(50px);
        }

        .ap-background__grid {
          position: absolute;
          inset: 0;

          opacity: 0.07;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            );

          background-size: 90px 90px;

          mask-image:
            linear-gradient(
              180deg,
              black,
              transparent 70%
            );
        }

        /* ==================================================
           TOPBAR
        ================================================== */

        .ap-topbar {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;

          width: 100%;
          max-width: 1480px;

          min-height: 76px;

          margin: 0 auto;

          padding:
            max(16px, env(safe-area-inset-top))
            clamp(24px, 5vw, 72px)
            16px;
        }

        .ap-topbar__brand {
          display: inline-flex;
          align-items: center;

          gap: 11px;

          min-height: 44px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 19px;

          text-decoration: none;

          transition: opacity 220ms ease;
        }

        .ap-topbar__mark {
          display: grid;
          place-items: center;

          width: 30px;
          height: 30px;

          border: 1px solid
            rgba(255, 255, 255, 0.14);

          border-radius: 9px;

          background:
            rgba(255, 255, 255, 0.035);

          font-family: Arial, sans-serif;
          font-size: 13px;
        }

        .ap-topbar__label {
          padding-right: 58px;

          color: var(--ap-faint);

          font-size: 9px;
          letter-spacing: 0.22em;
        }

        /* ==================================================
           HERO
        ================================================== */

        .ap-hero {
          display: flex;
          flex-direction: column;
          justify-content: center;

          width: 100%;
          max-width: 1480px;

          min-height: min(750px, 80svh);

          margin: 0 auto;

          padding:
            clamp(100px, 12vw, 160px)
            clamp(24px, 8vw, 120px)
            38px;
        }

        .ap-eyebrow {
          display: flex;
          align-items: center;

          gap: 13px;

          margin-bottom: 34px;

          color: rgba(230, 236, 242, 0.43);

          font-size: 9px;
          letter-spacing: 0.23em;
        }

        .ap-eyebrow__line {
          width: 24px;
          height: 1px;

          background:
            rgba(234, 239, 244, 0.44);
        }

        .ap-hero h1 {
          margin: 0;

          font-size:
            clamp(48px, 7vw, 100px);

          font-weight: 350;
          line-height: 1.07;

          letter-spacing: -0.06em;
        }

        .ap-hero h1 span {
          color:
            rgba(220, 227, 234, 0.45);
        }

        .ap-hero__description {
          max-width: 610px;

          margin: 35px 0 0;

          color: var(--ap-muted);

          font-size:
            clamp(14px, 1.4vw, 17px);

          line-height: 1.9;
        }

        .ap-hero__bottom {
          display: flex;
          justify-content: space-between;

          gap: 20px;

          margin-top: auto;
          padding-top: 85px;

          color: var(--ap-faint);

          font-size: 8px;
          letter-spacing: 0.17em;
        }

        /* ==================================================
           PRODUCT DIRECTORY
        ================================================== */

        .ap-products {
          width: 100%;
          max-width: 1480px;

          margin: 0 auto;

          padding:
            100px
            clamp(24px, 8vw, 120px)
            150px;
        }

        .ap-section-heading {
          max-width: 700px;
          margin-bottom: 50px;
        }

        .ap-section-index {
          display: inline-block;

          margin-bottom: 26px;

          color:
            rgba(218, 227, 234, 0.36);

          font-size: 9px;
          letter-spacing: 0.21em;
        }

        .ap-section-heading h2 {
          margin: 0;

          font-size:
            clamp(35px, 4.5vw, 62px);

          font-weight: 350;
          letter-spacing: -0.05em;
        }

        .ap-section-heading p {
          max-width: 570px;

          margin: 22px 0 0;

          color: var(--ap-muted);

          font-size: 13px;
          line-height: 1.9;
        }

        .ap-products__grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 18px;
        }

        /* ==================================================
           PRODUCT CARD
        ================================================== */

        .ap-product-card {
          display: flex;
          flex-direction: column;

          min-height: 650px;

          overflow: hidden;

          border: 1px solid
            rgba(255, 255, 255, 0.075);

          border-radius: 26px;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.046),
              rgba(255, 255, 255, 0.013)
            );

          -webkit-backdrop-filter:
            blur(18px) saturate(105%);

          backdrop-filter:
            blur(18px) saturate(105%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.035);
        }

        .ap-product-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          padding: 25px 29px 0;
        }

        .ap-product-card__category {
          color: var(--ap-faint);

          font-size: 9px;
          letter-spacing: 0.16em;
        }

        /* ==================================================
           STATUS
        ================================================== */

        .ap-product-status {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          color:
            rgba(226, 234, 240, 0.55);

          font-size: 8px;
          letter-spacing: 0.11em;

          white-space: nowrap;
        }

        .ap-product-status__dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(224, 237, 232, 0.72);
        }

        .ap-product-status--development
        .ap-product-status__dot {
          background:
            rgba(221, 206, 167, 0.72);
        }

        .ap-product-status--research
        .ap-product-status__dot {
          background:
            rgba(173, 194, 219, 0.65);
        }

        /* ==================================================
           PRODUCT VISUAL
        ================================================== */

        .ap-product-card__visual {
          position: relative;

          display: grid;
          place-items: center;

          min-height: 260px;

          overflow: hidden;
        }

        .ap-product-card__visual-glow {
          position: absolute;

          width: 230px;
          height: 230px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(160, 177, 200, 0.095),
              transparent 70%
            );

          filter: blur(20px);

          pointer-events: none;
        }

        .ap-episteme-symbol {
          position: relative;

          width: min(220px, 65%);
          height: auto;

          color:
            rgba(232, 239, 246, 0.82);

          filter:
            drop-shadow(
              0 0 18px
              rgba(200, 216, 234, 0.06)
            );
        }

        .ap-product-card__fallback {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 100px;

          color:
            rgba(240, 245, 250, 0.65);
        }

        /* ==================================================
           PRODUCT CONTENT
        ================================================== */

        .ap-product-card__body {
          display: flex;
          flex: 1;
          flex-direction: column;

          padding: 0 35px 34px;
        }

        .ap-product-card__body h2 {
          margin: 0;

          font-size:
            clamp(35px, 3.5vw, 50px);

          font-weight: 350;

          letter-spacing: -0.05em;
        }

        .ap-product-card__headline {
          max-width: 430px;

          margin: 15px 0 0;

          color:
            rgba(239, 243, 247, 0.77);

          font-size: 14px;
          line-height: 1.7;
        }

        .ap-product-card__description {
          max-width: 490px;

          margin: 20px 0 0;

          color: var(--ap-muted);

          font-size: 12px;
          line-height: 1.9;
        }

        .ap-product-card__capabilities {
          display: flex;
          flex-wrap: wrap;

          gap: 8px;

          margin-top: 26px;
        }

        .ap-product-card__capabilities span {
          padding: 8px 11px;

          border: 1px solid
            rgba(255, 255, 255, 0.07);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.025);

          color:
            rgba(230, 237, 243, 0.55);

          font-size: 10px;
        }

        /* ==================================================
           PRODUCT ACTION
        ================================================== */

        .ap-product-card__footer {
          margin-top: auto;
          padding-top: 35px;
        }

        .ap-product-card__action {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 13px;

          min-height: 46px;

          padding: 0 19px;

          border: 1px solid
            rgba(255, 255, 255, 0.14);

          border-radius: 13px;

          background:
            rgba(255, 255, 255, 0.065);

          font-size: 11px;

          text-decoration: none;

          transition:
            transform 180ms ease,
            background 220ms ease,
            border-color 220ms ease;
        }

        .ap-product-card__action:active {
          transform: scale(0.96);
        }

        .ap-product-card__unavailable {
          display: inline-flex;
          align-items: center;

          min-height: 46px;

          color: var(--ap-faint);

          font-size: 11px;
        }

        /* ==================================================
           DEVELOPMENT PRINCIPLE
        ================================================== */

        .ap-principle {
          max-width: 1480px;

          margin: 0 auto;

          padding:
            30px
            clamp(24px, 8vw, 120px)
            140px;
        }

        .ap-principle__panel {
          padding:
            clamp(35px, 6vw, 76px);

          border: 1px solid
            rgba(255, 255, 255, 0.075);

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.012)
            );

          -webkit-backdrop-filter:
            blur(20px) saturate(105%);

          backdrop-filter:
            blur(20px) saturate(105%);
        }

        .ap-principle__panel h2 {
          margin: 0;

          font-size:
            clamp(32px, 4.5vw, 60px);

          font-weight: 350;
          line-height: 1.18;

          letter-spacing: -0.05em;
        }

        .ap-principle__panel p {
          max-width: 600px;

          margin: 27px 0 0;

          color: var(--ap-muted);

          font-size: 13px;
          line-height: 1.9;
        }

        .ap-principle__link {
          display: inline-flex;
          align-items: center;

          gap: 13px;

          min-height: 44px;

          margin-top: 30px;

          font-size: 11px;

          text-decoration: none;

          transition: gap 220ms ease;
        }

        /* ==================================================
           FOOTER
        ================================================== */

        .ap-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 20px;

          max-width: 1480px;

          margin: 0 auto;

          padding:
            26px
            clamp(24px, 5vw, 72px)
            40px;

          border-top: 1px solid
            rgba(255, 255, 255, 0.055);

          color: var(--ap-faint);

          font-size: 9px;
          letter-spacing: 0.13em;
        }

        .ap-footer a {
          display: inline-flex;
          align-items: center;

          gap: 10px;

          min-height: 44px;

          text-decoration: none;
        }

        /* ==================================================
           INTERACTION
        ================================================== */

        .ap-page a:focus-visible {
          outline: 2px solid
            rgba(255, 255, 255, 0.75);

          outline-offset: 5px;

          border-radius: 5px;
        }

        @media (hover: hover) {
          .ap-topbar__brand:hover {
            opacity: 0.7;
          }

          .ap-product-card__action:hover {
            background:
              rgba(255, 255, 255, 0.11);

            border-color:
              rgba(255, 255, 255, 0.24);
          }

          .ap-principle__link:hover {
            gap: 20px;
          }
        }

        /* ==================================================
           REVEAL
        ================================================== */

        .ap-reveal {
          opacity: 0;

          transform:
            translate3d(0, 20px, 0);

          transition:
            opacity 700ms ease,
            transform 700ms
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ap-reveal.is-visible {
          opacity: 1;

          transform:
            translate3d(0, 0, 0);
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1000px) {
          .ap-products__grid {
            grid-template-columns: 1fr;
          }

          .ap-product-card {
            min-height: 0;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 640px) {
          .ap-topbar {
            min-height: 66px;

            padding:
              max(12px, env(safe-area-inset-top))
              20px
              12px;
          }

          .ap-topbar__brand {
            font-size: 17px;
          }

          .ap-topbar__label {
            padding-right: 54px;
            font-size: 8px;
          }

          .ap-hero {
            min-height: 72svh;

            padding:
              100px
              24px
              30px;
          }

          .ap-hero h1 {
            font-size:
              clamp(46px, 10vw, 66px);
          }

          .ap-hero__description {
            font-size: 13px;
          }

          .ap-hero__bottom {
            flex-direction: column;

            gap: 10px;

            padding-top: 70px;

            font-size: 7px;
          }

          .ap-products {
            padding:
              85px
              20px
              110px;
          }

          .ap-section-heading h2 {
            font-size: 37px;
          }

          .ap-product-card {
            border-radius: 21px;
          }

          .ap-product-card__top {
            padding: 22px 22px 0;
          }

          .ap-product-card__category {
            font-size: 8px;
          }

          .ap-product-status {
            font-size: 7px;
          }

          .ap-product-card__visual {
            min-height: 220px;
          }

          .ap-episteme-symbol {
            width: 190px;
          }

          .ap-product-card__body {
            padding: 0 24px 27px;
          }

          .ap-product-card__body h2 {
            font-size: 39px;
          }

          .ap-product-card__headline {
            font-size: 13px;
          }

          .ap-product-card__description {
            font-size: 11px;
          }

          .ap-principle {
            padding:
              20px
              20px
              95px;
          }

          .ap-principle__panel {
            padding: 30px 24px;
            border-radius: 22px;
          }

          .ap-principle__panel h2 {
            font-size: 34px;
          }

          .ap-footer {
            padding:
              24px
              24px
              35px;

            font-size: 8px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ap-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .ap-page a {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}