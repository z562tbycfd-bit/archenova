"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/capital-responsibility", label: "Capital & Responsibility" },
  { href: "/institutional-position", label: "Institutional Position" },
  { href: "/identity", label: "About / Identity" },
  { href: "/contact", label: "Contact / Access" },
];

export default function Menu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <div className="an-menu">
      <button
        type="button"
        className="an-menu-btn"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <span className="an-menu-icon" />
      </button>

      {open && (
        <div className="an-menu-overlay" onClick={() => setOpen(false)}>
          <div
            className="an-menu-panel"
            ref={panelRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="an-menu-top">
              <div className="an-menu-brand">
                <span className="an-menu-brand-title">ArcheNova</span>
                <span className="an-menu-brand-sub">
                  Irreversible initial conditions
                </span>
              </div>

              <button
                type="button"
                className="an-menu-close"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="an-menu-nav">
              {ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`an-menu-item ${isActive(it.href) ? "active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                  <span className="an-menu-arrow">→</span>
                </Link>
              ))}

              <a
                className="an-menu-item"
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                X (ArcheNova_X)
                <span className="an-menu-arrow">↗</span>
              </a>
            </nav>

            <div className="an-menu-foot">
              <span className="an-menu-foot-note">
                What matters is not control—only constraints that cannot be reversed.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
