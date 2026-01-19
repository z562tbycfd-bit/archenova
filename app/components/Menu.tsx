"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [open, setOpen] = useState(false);

  // ESCで閉じる
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // メニュー表示中はスクロール止める
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="menu-button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div className="menu-overlay" onClick={() => setOpen(false)}>
          <div
            className="menu-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="menu-top">
              <div className="menu-title">ArcheNova</div>
              <button
                className="menu-close"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="menu-nav">
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/papers" onClick={() => setOpen(false)}>
                Archive
              </Link>
              <a
                href="https://x.com/ArcheNova_X"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                X
              </a>
            </nav>

            <div className="menu-footer">
              <span>Engineering irreversibility into civilization design.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
