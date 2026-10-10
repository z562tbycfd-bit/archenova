"use client";

import { useMemo, useRef, useState } from "react";
import {
  stageEpistemeTransfer,
} from "../../../lib/continuity/epistemeBridge";
import type {
  EpistemeContinuityTransfer,
} from "../../../lib/continuity/types";

type TransferKind = "question" | "reasoning" | "uncertainty" | "next-test";
type TransferMessage = {
  id: string;
  role: "user" | "episteme";
  text: string;
  streaming?: boolean;
};

type Props = {
  messages: TransferMessage[];
  disabled?: boolean;
};

const MAX_CONTENT_LENGTH = 12000;

function makeTransferId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `episteme-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function EpistemeAevumTransfer({ messages, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [kind, setKind] = useState<TransferKind>("reasoning");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);

  const available = useMemo(
    () => messages.filter((m) => !m.streaming && m.text.trim()).slice(-30).reverse(),
    [messages],
  );
  const selected = available.find((m) => m.id === messageId) ?? null;
  const effectiveKind: TransferKind = selected?.role === "user" ? "question" : kind;
  const content = selected?.text.trim() ?? "";
  const tooLong = content.length > MAX_CONTENT_LENGTH;

  function toggle() {
    setError("");
    if (!open && !messageId && available.length) {
      const initial = available[0];
      setMessageId(initial.id);
      setKind(initial.role === "user" ? "question" : "reasoning");
    }
    setOpen((current) => !current);
  }

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
        className="ep-aevum-transfer__toggle"
        type="button"
        onClick={toggle}
        disabled={disabled || !available.length || sending}
        aria-expanded={open}
      >
        <span>TRANSFER TO AEVUM</span>
        <span aria-hidden="true">{open ? "−" : "↗"}</span>
      </button>
      {open && (
        <div className="ep-aevum-transfer__panel">
          <p>Choose the exact dialogue item to transfer. Aevum will require Review and Accept before committing it.</p>
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
          <label htmlFor="ep-aevum-transfer-preview">EXACT CONTENT PREVIEW</label>
          <textarea id="ep-aevum-transfer-preview" readOnly value={content} rows={5} />
          <div className="ep-aevum-transfer__footer">
            <small>{content.length.toLocaleString()} / {MAX_CONTENT_LENGTH.toLocaleString()} characters · No automatic Evidence promotion</small>
            <button type="button" onClick={send} disabled={!selected || !content || tooLong || sending || disabled}>
              {sending ? "STAGING…" : "STAGE & OPEN AEVUM ↗"}
            </button>
          </div>
          {error && <p className="ep-aevum-transfer__error" role="alert">{error}</p>}
        </div>
      )}
      <style jsx>{`
        /* ==================================================
           EPISTEME → AEVUM
           ABSOLUTE BLACK OPTICAL GLASS

           VISUAL ONLY
           No logic or behavior modifications
        ================================================== */

        .ep-aevum-transfer {
          --transfer-text: rgba(248,248,247,.94);
          --transfer-muted: rgba(235,235,235,.68);
          --transfer-faint: rgba(228,228,228,.49);
          --transfer-edge: rgba(255,255,255,.15);
          --transfer-edge-strong: rgba(255,255,255,.28);
          --transfer-black: #050505;

          position: relative;
          isolation: isolate;

          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          margin: 8px 0 4px;

          color: var(--transfer-text);
          font-family: inherit;
          font-size: 12px;
          -webkit-font-smoothing: antialiased;
        }

        .ep-aevum-transfer,
        .ep-aevum-transfer * {
          box-sizing: border-box;
        }

        /* -----------------------------------------------
           PRIMARY TRANSFER BAR
        ----------------------------------------------- */

        .ep-aevum-transfer__toggle {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;
          width: 100%;
          min-width: 0;
          min-height: 58px;

          padding: 17px 22px;

          border: 1px solid var(--transfer-edge);
          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.038),
              rgba(255,255,255,.009) 65%
            ),
            #050505;

          color: rgba(248,248,248,.88);

          font: inherit;
          font-size: 11px;
          font-weight: 550;
          letter-spacing: .17em;
          text-align: left;

          cursor: pointer;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.085),
            0 12px 38px rgba(0,0,0,.15);

          transition:
            border-color .25s ease,
            background .25s ease,
            color .25s ease,
            box-shadow .25s ease;
        }

        .ep-aevum-transfer__toggle > span:first-child {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .ep-aevum-transfer__toggle > span:last-child {
          flex: 0 0 auto;

          display: grid;
          place-items: center;

          width: 30px;
          height: 30px;

          border: 1px solid rgba(255,255,255,.13);
          border-radius: 50%;

          background: rgba(255,255,255,.025);

          color: rgba(255,255,255,.84);

          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1;
        }

        .ep-aevum-transfer__toggle:hover:not(:disabled) {
          border-color: rgba(255,255,255,.32);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.065),
              rgba(255,255,255,.015)
            ),
            #050505;

          color: #fff;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.13),
            0 17px 48px rgba(0,0,0,.19);
        }

        .ep-aevum-transfer__toggle:disabled {
          opacity: .42;
          cursor: not-allowed;
        }

        .ep-aevum-transfer__toggle:focus-visible,
        .ep-aevum-transfer__panel select:focus-visible,
        .ep-aevum-transfer__panel textarea:focus-visible,
        .ep-aevum-transfer__footer button:focus-visible {
          outline: 2px solid rgba(255,255,255,.86);
          outline-offset: 3px;
        }

        /* -----------------------------------------------
           EXPANDED GLASS PANEL
        ----------------------------------------------- */

        .ep-aevum-transfer__panel {
          position: relative;

          display: grid;
          grid-template-columns: minmax(0,1fr);

          gap: 13px;

          width: 100%;
          min-width: 0;

          margin-top: 10px;
          padding: clamp(20px,2.5vw,34px);

          border: 1px solid rgba(255,255,255,.16);
          border-radius: 22px;

          background:
            linear-gradient(
              155deg,
              rgba(255,255,255,.035) 0%,
              rgba(255,255,255,.012) 42%,
              rgba(255,255,255,.004) 100%
            ),
            #060606;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.09),
            0 25px 65px rgba(0,0,0,.22);

          color: var(--transfer-text);
        }

        .ep-aevum-transfer__panel::before {
          content: "";

          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;

          height: 1px;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.35),
              transparent
            );
        }

        .ep-aevum-transfer__panel p {
          margin: 0 0 9px;

          color: var(--transfer-muted);

          font-size: 12px;
          line-height: 1.85;
          letter-spacing: .012em;
          overflow-wrap: anywhere;
        }

        /* -----------------------------------------------
           FIELD LABELS
        ----------------------------------------------- */

        .ep-aevum-transfer__panel label {
          display: block;

          margin-top: 10px;

          color: rgba(244,244,244,.71);

          font-size: 10px;
          font-weight: 550;
          letter-spacing: .17em;
          line-height: 1.5;
        }

        /* -----------------------------------------------
           SELECT AND CONTENT PREVIEW
        ----------------------------------------------- */

        .ep-aevum-transfer__panel select,
        .ep-aevum-transfer__panel textarea {
          display: block;

          width: 100%;
          min-width: 0;

          padding: 15px 17px;

          border: 1px solid rgba(255,255,255,.14);
          border-radius: 13px;

          background: #0d0d0d;

          color: rgba(249,249,249,.93);

          font-family: inherit;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.65;
          letter-spacing: .005em;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.035);

          transition:
            border-color .25s ease,
            background .25s ease;
        }

        .ep-aevum-transfer__panel select {
          min-height: 50px;

          cursor: pointer;

          color-scheme: dark;
        }

        .ep-aevum-transfer__panel select option {
          background: #0d0d0d;
          color: #f5f5f5;
        }

        .ep-aevum-transfer__panel select:hover:not(:disabled),
        .ep-aevum-transfer__panel textarea:hover {
          border-color: rgba(255,255,255,.25);
        }

        .ep-aevum-transfer__panel select:disabled {
          opacity: .48;
          cursor: not-allowed;
        }

        .ep-aevum-transfer__panel textarea {
          min-height: 150px;
          max-height: min(42vh,420px);

          resize: vertical;

          overflow-y: auto;
          overflow-wrap: anywhere;

          white-space: pre-wrap;

          scrollbar-width: thin;
          scrollbar-color:
            rgba(255,255,255,.23)
            transparent;
        }

        .ep-aevum-transfer__panel textarea::-webkit-scrollbar {
          width: 6px;
        }

        .ep-aevum-transfer__panel textarea::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,.24);
          border-radius: 99px;
        }

        /* -----------------------------------------------
           TRANSFER FOOTER
        ----------------------------------------------- */

        .ep-aevum-transfer__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;

          flex-wrap: wrap;

          margin-top: 10px;
          padding-top: 20px;

          border-top: 1px solid rgba(255,255,255,.095);
        }

        .ep-aevum-transfer__footer small {
          flex: 1 1 220px;

          min-width: 0;

          color: var(--transfer-muted);

          font-size: 11px;
          line-height: 1.75;
          overflow-wrap: anywhere;
        }

        .ep-aevum-transfer__footer button {
          flex: 0 0 auto;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          min-height: 48px;

          padding: 14px 21px;

          border: 1px solid rgba(255,255,255,.32);
          border-radius: 12px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.085),
              rgba(255,255,255,.023)
            ),
            #0a0a0a;

          color: rgba(255,255,255,.96);

          font-family: inherit;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .13em;

          cursor: pointer;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12);

          transition:
            border-color .25s ease,
            background .25s ease,
            box-shadow .25s ease;
        }

        .ep-aevum-transfer__footer button:hover:not(:disabled) {
          border-color: rgba(255,255,255,.56);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.13),
              rgba(255,255,255,.035)
            ),
            #0a0a0a;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.16),
            0 10px 30px rgba(0,0,0,.20);
        }

        .ep-aevum-transfer__footer button:disabled {
          opacity: .40;
          cursor: not-allowed;
        }

        /* -----------------------------------------------
           ERROR STATE
        ----------------------------------------------- */

        .ep-aevum-transfer__error {
          margin: 5px 0 0 !important;

          padding: 13px 15px;

          border: 1px solid rgba(255,160,160,.24);
          border-radius: 11px;

          background: rgba(95,20,20,.12);

          color: rgba(255,190,190,.94) !important;

          font-size: 12px;
          line-height: 1.7;
        }

        /* -----------------------------------------------
           TABLET
        ----------------------------------------------- */

        @media (max-width: 900px) {
          .ep-aevum-transfer__panel {
            padding: 24px;
          }

          .ep-aevum-transfer__footer {
            align-items: stretch;
          }
        }

        /* -----------------------------------------------
           MOBILE
        ----------------------------------------------- */

        @media (max-width: 600px) {
          .ep-aevum-transfer {
            width: 100%;
            margin: 6px 0 4px;
          }

          .ep-aevum-transfer__toggle {
            min-height: 56px;
            padding: 13px 17px;
            border-radius: 16px;

            font-size: 10px;
            letter-spacing: .14em;
          }

          .ep-aevum-transfer__panel {
            gap: 12px;

            margin-top: 9px;
            padding: 20px 16px;

            border-radius: 18px;
          }

          .ep-aevum-transfer__panel p {
            font-size: 12px;
            line-height: 1.75;
          }

          .ep-aevum-transfer__panel select,
          .ep-aevum-transfer__panel textarea {
            font-size: 16px;
            padding: 13px 14px;
          }

          .ep-aevum-transfer__panel textarea {
            min-height: 135px;
            max-height: 32vh;
          }

          .ep-aevum-transfer__footer {
            display: grid;
            grid-template-columns: minmax(0,1fr);

            gap: 16px;
            padding-top: 17px;
          }

          .ep-aevum-transfer__footer small {
            font-size: 11px;
          }

          .ep-aevum-transfer__footer button {
            width: 100%;
            min-height: 50px;
            padding: 15px 14px;

            font-size: 10px;
          }
        }

        /* -----------------------------------------------
           REDUCED MOTION
        ----------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          .ep-aevum-transfer__toggle,
          .ep-aevum-transfer__panel select,
          .ep-aevum-transfer__panel textarea,
          .ep-aevum-transfer__footer button {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
