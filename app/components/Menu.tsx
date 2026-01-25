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

  // Escで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 開いたらパネルにフォーカス
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <div className="menu">
      <button
  type="button"
  className="menu-trigger"
  aria-label="Open menu"
  aria-expanded={open}
  onClick={() => setOpen(true)}
>
  <span className="bar" />
  <span className="bar" />
  <span className="bar" />
</button>

      {open && (
        <div className="menu-overlay" onClick={() => setOpen(false)}>
          <div
            className="menu-panel"
            ref={panelRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-top">
              <div className="menu-brand">
                <span className="menu-brand-title">ArcheNova</span>
                <span className="menu-brand-sub">Irreversible initial conditions</span>
              </div>

              <button
                type="button"
                className="menu-close"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="menu-nav">
              {ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`menu-item ${isActive(it.href) ? "active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                  <span className="menu-arrow">→</span>
                </Link>
              ))}

              <a
                className="menu-item"
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                X (ArcheNova_X)
                <span className="menu-arrow">↗</span>
              </a>
            </nav>

            <div className="menu-foot">
              <span className="menu-foot-note">
                What matters is not control—only constraints that cannot be reversed.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
