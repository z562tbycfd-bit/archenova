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
        .ep-aevum-transfer { margin: 8px 0 4px; color: rgba(235,241,248,.88); font-size: 12px; }
        .ep-aevum-transfer__toggle { display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%; padding:10px 14px; border:1px solid rgba(185,207,230,.18); border-radius:13px; color:rgba(234,241,249,.8); background:rgba(13,19,29,.32); letter-spacing:.11em; cursor:pointer; }
        .ep-aevum-transfer__toggle:hover:not(:disabled) { background:rgba(70,94,119,.18); border-color:rgba(185,207,230,.32); }
        .ep-aevum-transfer__toggle:disabled { opacity:.42; cursor:not-allowed; }
        .ep-aevum-transfer__panel { display:grid; gap:10px; margin-top:8px; padding:16px; border:1px solid rgba(185,207,230,.17); border-radius:16px; background:linear-gradient(145deg,rgba(20,28,41,.93),rgba(8,12,19,.94)); backdrop-filter:blur(18px); }
        .ep-aevum-transfer__panel p { margin:0 0 3px; line-height:1.6; color:rgba(227,236,246,.68); }
        .ep-aevum-transfer__panel label { font-size:10px; letter-spacing:.13em; color:rgba(217,232,249,.67); }
        .ep-aevum-transfer__panel select,.ep-aevum-transfer__panel textarea { box-sizing:border-box; width:100%; min-width:0; padding:11px 12px; border:1px solid rgba(185,207,230,.18); border-radius:11px; background:rgba(5,10,18,.7); color:#edf4fb; font:inherit; }
        .ep-aevum-transfer__panel textarea { resize:vertical; line-height:1.6; }
        .ep-aevum-transfer__footer { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
        .ep-aevum-transfer__footer small { color:rgba(220,230,242,.56); line-height:1.5; }
        .ep-aevum-transfer__footer button { padding:11px 14px; border:1px solid rgba(193,219,245,.34); border-radius:11px; background:rgba(171,203,234,.12); color:#f1f7ff; font-size:11px; letter-spacing:.08em; cursor:pointer; }
        .ep-aevum-transfer__footer button:disabled { opacity:.4; cursor:not-allowed; }
        .ep-aevum-transfer__error { color:#ffb9b9!important; }
      `}</style>
    </section>
  );
}
