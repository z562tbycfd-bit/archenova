"use client";

import { useState } from "react";

/** HOME-only closing landmark. No data-home-section attribute. */
export default function ArcheNovaHomeFooter() {
  const [copied, setCopied] = useState(false);

  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("https://www.archenova.org/home/");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable; the canonical link below remains usable.
    }
  };

  return (
    <footer className="an-home-footer" aria-label="ArcheNova closing footer">
      <div className="an-home-footer__inner">
        <div className="an-home-footer__rule" aria-hidden="true" />
        <div className="an-home-footer__content">
          <div className="an-home-footer__identity">
            <span className="an-home-footer__overline">AN INDEPENDENT CIVILIZATION INITIATIVE</span>
            <p className="an-home-footer__name">ArcheNova<span className="an-home-footer__period">.</span></p>
            <p className="an-home-footer__statement">
              The future is not merely predicted.<br />
              It is shaped by what we choose to make possible.
            </p>
          </div>
          <div className="an-home-footer__utility" aria-label="Page utilities">
            <span className="an-home-footer__utility-label">CONTINUE WITH INTENTION</span>
            <button type="button" className="an-home-footer__top" onClick={backToTop} aria-label="Return to the top of the HOME page">
              <span>Back to top</span><span className="an-home-footer__top-icon" aria-hidden="true">↑</span>
            </button>
            <button type="button" className="an-home-footer__copy" onClick={copyAddress} aria-live="polite">
              {copied ? "Home address copied ✓" : "Copy HOME address ↗"}
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
