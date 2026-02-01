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

  // ★閉じる“吸い込み”のために、closing状態を短時間保持
  const [closing, setClosing] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const requestClose = () => {
    // すでに閉じ処理中なら何もしない
    if (closing) return;

    setClosing(true);
    // CSSアニメが終わるまで描画を残す（後述CSSと合わせて 260ms）
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

  const showOverlay = open || closing; // ★closing中も表示を残す

  return (
    <div className={`menu ${open ? "is-open" : ""} ${closing ? "is-closing" : ""}`}>
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
          {/* 背景クリックで閉じる領域（panelの外だけ） */}
          <button
            type="button"
            className="menu-backdrop"
            aria-label="Close menu"
            onClick={requestClose}
          />

          {/* panel */}
          <div className="menu-panel" ref={panelRef} tabIndex={-1}>
            <div className="menu-top">
              <div>
                <span className="menu-brand-title">ArcheNova</span>
                <span className="menu-brand-sub">Irreversible initial conditions</span>
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

            <nav className="menu-nav">
              {ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`menu-item ${isActive(it.href) ? "active" : ""}`}
                  onClick={requestClose}
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
                onClick={requestClose}
              >
                X (ArcheNova_X)
                <span className="menu-arrow">↗</span>
              </a>
            </nav>

            <div className="menu-foot">
              <span className="menu-foot-note">
                What matters is not control — only constraints that cannot be reversed.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}