"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { stageEpistemeTransfer } from "../../../lib/continuity/epistemeBridge";
import type { EpistemeContinuityTransfer } from "../../../lib/continuity/types";

type TransferKind = "question" | "reasoning" | "uncertainty" | "next-test";
type TransferMessage = {
  id: string;
  role: "user" | "episteme";
  text: string;
  streaming?: boolean;
};
type Props = { messages: TransferMessage[]; disabled?: boolean };

const MAX_CONTENT_LENGTH = 12000;

function makeTransferId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `episteme-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function EpistemeAevumTransfer({ messages, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [kind, setKind] = useState<TransferKind>("reasoning");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const available = useMemo(
    () => messages.filter((m) => !m.streaming && m.text.trim()).slice(-30).reverse(),
    [messages],
  );
  const selected = available.find((m) => m.id === messageId) ?? null;
  const effectiveKind: TransferKind = selected?.role === "user" ? "question" : kind;
  const content = selected?.text.trim() ?? "";
  const tooLong = content.length > MAX_CONTENT_LENGTH;

  function close() {
    if (sendingRef.current) return;
    setOpen(false);
    setError("");
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function toggle() {
    if (open) { close(); return; }
    if (disabled || sending || !available.length) return;
    setError("");
    if (!messageId || !available.some((m) => m.id === messageId)) {
      const initial = available[0];
      setMessageId(initial.id);
      setKind(initial.role === "user" ? "question" : "reasoning");
    }
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !sendingRef.current) {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      if (event.key === "Tab") {
        const dialog = document.getElementById("ep-aevum-dialog");
        if (!dialog) return;
        const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [open]);

  function send() {
    if (sendingRef.current || disabled) return;
    if (!selected || !content || tooLong) {
      setError(tooLong ? "Content exceeds the 12,000-character transfer limit." : "Select a completed message.");
      return;
    }
    sendingRef.current = true;
    setSending(true);
    setError("");
    try {
      const transfer: EpistemeContinuityTransfer = {
        transferId: makeTransferId(),
        kind: effectiveKind,
        title: `${effectiveKind.toUpperCase()} · Episteme dialogue`,
        content,
        evidenceReferenceIds: [],
        createdAt: new Date().toISOString(),
      };
      const result = stageEpistemeTransfer(transfer);
      if (!result.ok) {
        setError("Bridge storage was not confirmed. The transfer was not sent. Check browser storage availability and retry.");
        return;
      }
      window.location.assign("/continuity");
    } catch {
      setError("Bridge storage failed. The transfer was not sent.");
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  return (
    <section className="ep-aevum-transfer" aria-label="Transfer to Aevum">
      <button
        ref={triggerRef}
        className="ep-aevum-transfer__toggle"
        type="button"
        onClick={toggle}
        disabled={disabled || !available.length || sending}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="ep-aevum-dialog"
      >
        <span>TRANSFER TO AEVUM</span>
        <span className="ep-aevum-transfer__arrow" aria-hidden="true">↗</span>
      </button>

      {mounted && open && createPortal(
        <div className="ep-aevum-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) close();
        }}>
          <div
            className="ep-aevum-dialog"
            id="ep-aevum-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ep-aevum-title"
            aria-describedby="ep-aevum-description"
          >
            <header className="ep-aevum-dialog__header">
              <div className="ep-aevum-dialog__identity">
                <span className="ep-aevum-dialog__eyebrow">EPISTEME / CONTINUITY</span>
                <h2 id="ep-aevum-title">Transfer to Aevum</h2>
                <p id="ep-aevum-description">Stage a precise dialogue record for review.</p>
              </div>
              <button
                ref={closeRef}
                className="ep-aevum-dialog__close"
                type="button"
                onClick={close}
                disabled={sending}
                aria-label="Close transfer panel"
              >
                <span aria-hidden="true">×</span>
                <span className="ep-aevum-dialog__close-label">Close</span>
              </button>
            </header>

            <div className="ep-aevum-dialog__scroll">
              <div className="ep-aevum-dialog__content">
                <p className="ep-aevum-dialog__intro">
                  Choose the exact dialogue item to transfer. Aevum requires Review and Accept before committing it.
                </p>

                <div className="ep-aevum-dialog__fields">
                  <div className="ep-aevum-dialog__field">
                    <label htmlFor="ep-aevum-transfer-message">SOURCE MESSAGE</label>
                    <select
                      id="ep-aevum-transfer-message"
                      value={messageId}
                      disabled={sending}
                      onChange={(event) => {
                        const next = available.find((m) => m.id === event.target.value);
                        setMessageId(event.target.value);
                        setKind(next?.role === "user" ? "question" : "reasoning");
                        setError("");
                      }}
                    >
                      <option value="">Select a message</option>
                      {available.map((message) => (
                        <option key={message.id} value={message.id}>
                          {message.role === "user" ? "YOU" : "EPISTEME"} · {message.text.trim().replace(/\s+/g, " ").slice(0, 110)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ep-aevum-dialog__field">
                    <label htmlFor="ep-aevum-transfer-kind">TRANSFER CLASSIFICATION</label>
                    <select
                      id="ep-aevum-transfer-kind"
                      value={effectiveKind}
                      disabled={sending || !selected || selected.role === "user"}
                      onChange={(event) => setKind(event.target.value as TransferKind)}
                    >
                      {selected?.role === "user" ? (
                        <option value="question">Question</option>
                      ) : (
                        <>
                          <option value="reasoning">Reasoning (unverified inference)</option>
                          <option value="uncertainty">Uncertainty</option>
                          <option value="next-test">Next test</option>
                          <option value="question">Question</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="ep-aevum-dialog__field ep-aevum-dialog__preview">
                  <label htmlFor="ep-aevum-transfer-preview">EXACT CONTENT PREVIEW</label>
                  <textarea id="ep-aevum-transfer-preview" readOnly value={content} rows={8} />
                </div>
                {error && <p className="ep-aevum-dialog__error" role="alert">{error}</p>}
              </div>
            </div>

            <footer className="ep-aevum-dialog__footer">
              <small>
                {content.length.toLocaleString()} / {MAX_CONTENT_LENGTH.toLocaleString()} characters
                <span className="ep-aevum-dialog__dot">·</span>
                No automatic Evidence promotion
              </small>
              <button
                className="ep-aevum-dialog__submit"
                type="button"
                onClick={send}
                disabled={!selected || !content || tooLong || sending || disabled}
              >
                {sending ? "STAGING…" : "STAGE & OPEN AEVUM ↗"}
              </button>
            </footer>
          </div>
        </div>,
        document.body,
      )}

      <style jsx>{`
        .ep-aevum-transfer { width:100%; min-width:0; margin:10px 0; box-sizing:border-box; }
        .ep-aevum-transfer__toggle {
          display:inline-flex; align-items:center; justify-content:space-between; gap:24px;
          width:auto; max-width:100%; min-width:0; min-height:54px;
          padding:11px 15px 11px 20px; border:1px solid rgba(255,255,255,.18);
          border-radius:16px; background:linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.012)),#070707;
          color:#f4f4f4; font:inherit; font-size:11px; font-weight:600; letter-spacing:.15em;
          text-align:left; cursor:pointer; box-shadow:inset 0 1px rgba(255,255,255,.08);
        }
        .ep-aevum-transfer__toggle:hover:not(:disabled) { border-color:rgba(255,255,255,.42); }
        .ep-aevum-transfer__toggle:focus-visible { outline:2px solid white; outline-offset:3px; }
        .ep-aevum-transfer__toggle:disabled { opacity:.42; cursor:not-allowed; }
        .ep-aevum-transfer__arrow {
          display:grid; place-items:center; flex:0 0 30px; height:30px;
          border:1px solid rgba(255,255,255,.18); border-radius:50%; font-size:18px;
          font-weight:400; letter-spacing:0;
        }
        @media(max-width:600px) {
          .ep-aevum-transfer__toggle { min-height:52px; padding:10px 12px 10px 16px; font-size:10px; }
        }
      `}</style>

      {/* Global CSS is intentional: the dialog is portaled directly into document.body. */}
      <style>{`
        .ep-aevum-overlay, .ep-aevum-overlay * { box-sizing:border-box; }
        .ep-aevum-overlay {
          position:fixed; inset:0; z-index:2147483000;
          display:flex; align-items:center; justify-content:center;
          padding:clamp(12px,2.5vw,36px);
          padding-top:max(12px,env(safe-area-inset-top));
          padding-bottom:max(12px,env(safe-area-inset-bottom));
          background:rgba(0,0,0,.82); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
          color:#f5f5f5; font-family:inherit; -webkit-font-smoothing:antialiased;
        }
        .ep-aevum-dialog {
          display:flex; flex-direction:column; width:min(100%,860px);
          max-height:100%; max-height:calc(100dvh - 24px);
          min-height:0; overflow:hidden; border:1px solid rgba(255,255,255,.18);
          border-radius:24px; background:linear-gradient(155deg,#131313,#070707 48%,#050505);
          box-shadow:0 36px 110px rgba(0,0,0,.75),inset 0 1px rgba(255,255,255,.10);
        }
        .ep-aevum-dialog__header {
          flex:0 0 auto; display:flex; align-items:flex-start; justify-content:space-between;
          gap:18px; padding:24px clamp(20px,4vw,38px) 20px;
          border-bottom:1px solid rgba(255,255,255,.10);
        }
        .ep-aevum-dialog__identity { min-width:0; }
        .ep-aevum-dialog__eyebrow { color:rgba(255,255,255,.50); font-size:10px; letter-spacing:.19em; font-weight:600; }
        .ep-aevum-dialog__header h2 { margin:9px 0 5px; color:#fff; font-size:clamp(21px,2.5vw,29px); font-weight:500; letter-spacing:-.025em; line-height:1.25; }
        .ep-aevum-dialog__header p { margin:0; color:rgba(255,255,255,.58); font-size:12px; line-height:1.6; }
        .ep-aevum-dialog__close {
          flex:0 0 auto; display:inline-flex; align-items:center; justify-content:center; gap:9px;
          min-width:84px; min-height:42px; padding:8px 12px; border:1px solid rgba(255,255,255,.19);
          border-radius:12px; background:rgba(255,255,255,.045); color:#f5f5f5;
          font:inherit; font-size:12px; cursor:pointer;
        }
        .ep-aevum-dialog__close span:first-child { font-size:23px; line-height:1; }
        .ep-aevum-dialog__close:disabled { opacity:.4; cursor:not-allowed; }
        .ep-aevum-dialog__scroll { flex:1 1 auto; min-height:0; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:#444 transparent; }
        .ep-aevum-dialog__content { display:grid; gap:22px; padding:26px clamp(20px,4vw,38px) 30px; min-width:0; }
        .ep-aevum-dialog__intro { margin:0; max-width:66ch; color:rgba(255,255,255,.7); font-size:13px; line-height:1.8; }
        .ep-aevum-dialog__fields { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:20px; min-width:0; }
        .ep-aevum-dialog__field { display:flex; flex-direction:column; gap:10px; min-width:0; }
        .ep-aevum-dialog__field label { color:rgba(255,255,255,.68); font-size:10px; font-weight:600; letter-spacing:.16em; line-height:1.5; }
        .ep-aevum-dialog__field select, .ep-aevum-dialog__field textarea {
          display:block; width:100%; min-width:0; border:1px solid rgba(255,255,255,.18);
          border-radius:13px; background:#101010; color:#f5f5f5; font-family:inherit;
          font-size:14px; line-height:1.65; padding:14px 16px; color-scheme:dark;
        }
        .ep-aevum-dialog__field select { min-height:52px; cursor:pointer; }
        .ep-aevum-dialog__field select option { background:#101010; color:#fff; }
        .ep-aevum-dialog__field select:disabled { opacity:.55; cursor:not-allowed; }
        .ep-aevum-dialog__field textarea { min-height:200px; max-height:42vh; resize:vertical; white-space:pre-wrap; overflow-wrap:anywhere; overflow-y:auto; }
        .ep-aevum-dialog__footer {
          flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; gap:18px;
          padding:18px clamp(20px,4vw,38px) max(18px,env(safe-area-inset-bottom));
          border-top:1px solid rgba(255,255,255,.11); background:rgba(255,255,255,.018);
        }
        .ep-aevum-dialog__footer small { min-width:0; color:rgba(255,255,255,.6); font-size:11px; line-height:1.6; overflow-wrap:anywhere; }
        .ep-aevum-dialog__dot { padding:0 8px; }
        .ep-aevum-dialog__submit {
          flex:0 0 auto; min-height:48px; padding:13px 20px; border:1px solid rgba(255,255,255,.35);
          border-radius:12px; background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.035));
          color:#fff; font:inherit; font-size:11px; font-weight:600; letter-spacing:.10em; cursor:pointer;
        }
        .ep-aevum-dialog__submit:disabled { opacity:.35; cursor:not-allowed; }
        .ep-aevum-dialog__close:hover:not(:disabled), .ep-aevum-dialog__submit:hover:not(:disabled) { border-color:rgba(255,255,255,.65); }
        .ep-aevum-dialog button:focus-visible, .ep-aevum-dialog select:focus-visible, .ep-aevum-dialog textarea:focus-visible { outline:2px solid #fff; outline-offset:3px; }
        .ep-aevum-dialog__error { margin:0; padding:12px 15px; border:1px solid rgba(255,160,160,.28); border-radius:12px; background:rgba(110,30,30,.18); color:#ffd3d3; font-size:12px; line-height:1.7; }
        @media(max-width:700px) {
          .ep-aevum-overlay { padding:0; align-items:stretch; }
          .ep-aevum-dialog {
            width:100%; max-height:none; height:100%; height:100dvh;
            border:0; border-radius:0;
          }
          .ep-aevum-dialog__header { padding:max(22px,env(safe-area-inset-top)) 20px 18px; }
          .ep-aevum-dialog__close { min-width:44px; min-height:44px; padding:7px; }
          .ep-aevum-dialog__close-label { display:none; }
          .ep-aevum-dialog__content { gap:20px; padding:22px 20px 28px; }
          .ep-aevum-dialog__fields { grid-template-columns:minmax(0,1fr); gap:20px; }
          .ep-aevum-dialog__field select, .ep-aevum-dialog__field textarea { font-size:16px; }
          .ep-aevum-dialog__field textarea { min-height:180px; max-height:40vh; }
          .ep-aevum-dialog__footer { display:grid; grid-template-columns:minmax(0,1fr); gap:12px; padding:16px 20px max(18px,env(safe-area-inset-bottom)); }
          .ep-aevum-dialog__submit { width:100%; min-height:52px; }
        }
        @media(prefers-reduced-motion:reduce) { .ep-aevum-overlay * { scroll-behavior:auto; transition:none!important; } }
      `}</style>
    </section>
  );
}
