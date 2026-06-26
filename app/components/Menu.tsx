"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { href: "/home", label: "Home", note: "ArcheNova entrance" },
  { href: "/civilization", label: "Civilization", note: "Integrated civilization model" },
  { href: "/architecture", label: "Architecture", note: "Civilization design architecture" },
  { href: "/senate", label: "Senate", note: "Civilizational deliberation" },
  { href: "/constitution", label: "Constitution", note: "Principles and continuity" },
  { href: "/research", label: "Observatory", note: "Signals, reports, models" },
  { href: "/equation", label: "Equation", note: "ArcheNova equation" },
  { href: "/orientation", label: "Orientation", note: "Framework and domains" },
  { href: "/contact", label: "Contact", note: "Access and connection" },
];

export default function Menu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const requestClose = () => {
    if (closing) return;

    setClosing(true);

    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 260);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closing]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const showOverlay = open || closing;

  return (
    <div
      className={`menu ${open ? "is-open" : ""} ${
        closing ? "is-closing" : ""
      }`}
    >
      {!showOverlay && (
        <button
          type="button"
          className="menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="menu-icon" />
        </button>
      )}

      {showOverlay && (
        <div className="menu-overlay">
          <button
            type="button"
            className="menu-backdrop"
            aria-label="Close menu"
            onClick={requestClose}
          />

          <div className="menu-panel" ref={panelRef} tabIndex={-1}>
            <div className="menu-top">
              <div>
                <span className="menu-brand-title">ArcheNova</span>
                <span className="menu-brand-sub">
                  Founder-led civilization design initiative
                </span>
              </div>

              <button
                type="button"
                className="menu-close"
                aria-label="Close menu"
                onClick={requestClose}
              >
                ✕
              </button>
            </div>

            <div className="menu-index-label">
              Founder / Civilization / Imagination / Design
            </div>

            <nav className="menu-nav">
              {ITEMS.map((it, index) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`menu-item ${isActive(it.href) ? "active" : ""}`}
                  onClick={requestClose}
                >
                  <span className="menu-item-main">
                    <span className="menu-item-number">
                      {String(index).padStart(2, "0")}
                    </span>

                    <span className="menu-item-text">
                      <strong>{it.label}</strong>
                      <small>{it.note}</small>
                    </span>
                  </span>

                  <span className="menu-arrow">→</span>
                </Link>
              ))}

              <a
                className="menu-item"
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noreferrer"
                onClick={requestClose}
              >
                <span className="menu-item-main">
                  <span className="menu-item-number">X</span>

                  <span className="menu-item-text">
                    <strong>ArcheNova_X</strong>
                    <small>Public signal channel</small>
                  </span>
                </span>

                <span className="menu-arrow">↗</span>
              </a>
            </nav>

            <div className="menu-foot">
              <span className="menu-foot-note">
                Not a company. Not an institution. A living architecture of
                civilizational imagination.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}