"use client";

import { useEffect, useRef, useState } from "react";

/** HOME-only closing landmark. No data-home-section attribute. */
export default function ArcheNovaHomeFooter() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    };
  }, []);

  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("https://www.archenova.org/home/");
      setCopied(true);
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // The canonical HOME link below remains available.
    }
  };

  return (
    <footer className="an-home-footer" aria-label="ArcheNova closing footer">
      <div className="an-home-footer__inner">
        <div className="an-home-footer__rule" aria-hidden="true" />

        <div className="an-home-footer__content">
          <div className="an-home-footer__identity">
            <span className="an-home-footer__overline">INDEPENDENT BY DESIGN</span>
            <p className="an-home-footer__name">
              ArcheNova<span className="an-home-footer__period">.</span>
            </p>
            <p className="an-home-footer__statement">
              Guiding civilization through responsible scientific and technological progress.
            </p>
          </div>

          <div className="an-home-footer__utility" aria-label="Page utilities">
            <button
              type="button"
              className="an-home-footer__top"
              onClick={backToTop}
              aria-label="Return to the top of the HOME page"
            >
              <span>Back to top</span>
              <span className="an-home-footer__top-icon" aria-hidden="true">↑</span>
            </button>
            <button
              type="button"
              className="an-home-footer__copy"
              onClick={copyAddress}
              aria-live="polite"
            >
              {copied ? "Link copied ✓" : "Copy HOME link ↗"}
            </button>
          </div>
        </div>

        <div className="an-home-footer__bottom">
          <span>© {new Date().getFullYear()} ArcheNova</span>
          <span>Independent by design. Accountable to reality.</span>
          <a href="/home/" aria-label="ArcheNova HOME">archenova.org</a>
        </div>
      </div>
    </footer>
  );
}
