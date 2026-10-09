"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useContinuity } from "../ContinuityProvider";

import {
  peekEpistemeTransfer,
  discardEpistemeTransfer,
  completeEpistemeTransfer,
  type EpistemeBridgeEnvelope,
} from "@/lib/continuity/epistemeBridge";

import {
  acceptEpistemeTransfer,
} from "@/lib/continuity/privacyBoundary";

import type {
  ContinuityReasoningNode,
  ContinuityState,
  ContinuityUncertainty,
  EpistemeContinuityTransfer,
} from "@/lib/continuity/types";

/* ==========================================================
   ARCHENOVA / AEVUM
   STAGE 1.7.2 — CONTINUITY TRANSFER RECEIVER

   Episteme → Bridge → Review → Continuity

   Transfer ≠ Evidence
   Acceptance ≠ Verification
   Continuity of Inquiry ≠ Continuity of Identity
========================================================== */

type ReceiverMessage = {
  tone: "neutral" | "error";
  text: string;
};

function makeId(prefix: string): string {
  const value =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${value}`;
}

function buildCandidateState(
  current: ContinuityState,
  transfer: EpistemeContinuityTransfer,
  purpose: string,
): ContinuityState | null {
  const now = new Date().toISOString();

  if (transfer.kind === "evidence") {
    return null;
  }

  if (transfer.kind === "question") {
    if (current.inquiry || !purpose.trim()) {
      return null;
    }

    const inquiryId = makeId("inquiry");

    return {
      ...current,
      inquiry: {
        id: inquiryId,
        question: transfer.content.trim(),
        purpose: purpose.trim(),
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
      journey: [
        ...current.journey,
        {
          id: makeId("journey"),
          kind: "origin",
          title: "Inquiry received from Episteme",
          description: transfer.title,
          relatedIds: [inquiryId],
          createdAt: now,
        },
      ],
      updatedAt: now,
    };
  }

  if (!current.inquiry) {
    return null;
  }

  if (transfer.kind === "uncertainty") {
    const uncertainty: ContinuityUncertainty = {
      id: makeId("uncertainty"),
      question: transfer.content.trim(),
      significance:
        "Unresolved intellectual question transferred from Episteme; significance requires independent review.",
      confidence: "unknown",
      resolved: false,
      createdAt: now,
    };

    return {
      ...current,
      uncertainties: [
        ...current.uncertainties,
        uncertainty,
      ],
      updatedAt: now,
    };
  }

  if (
    transfer.kind === "reasoning" ||
    transfer.kind === "next-test"
  ) {
    const reasoning: ContinuityReasoningNode = {
      id: makeId("reasoning"),
      kind:
        transfer.kind === "next-test"
          ? "next-test"
          : "inference",
      statement: transfer.content.trim(),
      evidenceIds: [],
      confidence: "unknown",
      createdAt: now,
      updatedAt: now,
    };

    return {
      ...current,
      reasoning: [
        ...current.reasoning,
        reasoning,
      ],
      updatedAt: now,
    };
  }

  return null;
}

export default function ContinuityTransferReceiver() {
  const {
    state,
    status,
    commands,
  } = useContinuity();

  const [envelope, setEnvelope] =
    useState<EpistemeBridgeEnvelope | null>(null);

  const [purpose, setPurpose] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const [message, setMessage] =
    useState<ReceiverMessage | null>(null);

  const refresh = useCallback(() => {
    const result = peekEpistemeTransfer();

    if (result.ok === true) {
      setEnvelope(result.envelope);
      setMessage(null);
      return;
    }

    setEnvelope(null);
    setReviewOpen(false);

    if (
      result.status !== "empty" &&
      result.status !== "expired"
    ) {
      setMessage({
        tone: "error",
        text: result.reason,
      });
    } else {
      setMessage(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function handleDiscard() {
    if (busy) return;

    const result = discardEpistemeTransfer();

    if (result.ok) {
      setEnvelope(null);
      setReviewOpen(false);
      setPurpose("");
      setMessage({
        tone: "neutral",
        text: "The pending transfer was discarded. Continuity was not changed.",
      });
    } else {
      setMessage({
        tone: "error",
        text: "The transfer could not be discarded.",
      });
    }
  }

  function handleAccept(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !envelope ||
      busy ||
      status !== "ready"
    ) {
      return;
    }

    setBusy(true);

    try {
      // Re-read immediately before acceptance.
      const pending = peekEpistemeTransfer();

      if (pending.ok === false) {
        setMessage({
          tone: "error",
          text: "The transfer is no longer available or valid.",
        });
        setEnvelope(null);
        return;
      }

      if (
        JSON.stringify(pending.envelope) !==
        JSON.stringify(envelope)
      ) {
        setMessage({
          tone: "error",
          text: "The pending transfer changed. Review the latest version before accepting.",
        });
        setEnvelope(pending.envelope);
        setReviewOpen(false);
        return;
      }

      const boundary = acceptEpistemeTransfer(
        pending.envelope.transfer,
      );

      if (boundary.accepted === false) {
        setMessage({
          tone: "error",
          text: "The transfer was rejected by the privacy boundary.",
        });
        return;
      }

      const transfer = boundary.data;

      if (!transfer.content.trim()) {
        setMessage({
          tone: "error",
          text: "An empty intellectual transfer cannot be accepted.",
        });
        return;
      }

      if (transfer.kind === "evidence") {
        setMessage({
          tone: "error",
          text:
            "Evidence transfers require independent source review. They cannot be accepted directly into the Evidence Spine.",
        });
        return;
      }

      if (
        transfer.kind === "question" &&
        state.inquiry
      ) {
        setMessage({
          tone: "error",
          text:
            "An inquiry already exists. Its central question will not be overwritten.",
        });
        return;
      }

      if (
        transfer.kind !== "question" &&
        !state.inquiry
      ) {
        setMessage({
          tone: "error",
          text:
            "Begin an inquiry before accepting reasoning, uncertainty, or a next test.",
        });
        return;
      }

      const candidate = buildCandidateState(
        state,
        transfer,
        purpose,
      );

      if (!candidate) {
        setMessage({
          tone: "error",
          text:
            "The transfer could not be converted into a valid Continuity state.",
        });
        return;
      }

      // Provider performs Privacy Boundary and invariant checks.
      const accepted = commands.importState(candidate);

      if (!accepted) {
        setMessage({
          tone: "error",
          text:
            "Continuity rejected the candidate state. The transfer remains pending.",
        });
        return;
      }

      // Import was accepted by the Provider.
      // The Provider persists asynchronously; see implementation note.
      const completed = completeEpistemeTransfer(
        pending.envelope,
      );

      setEnvelope(null);
      setReviewOpen(false);
      setPurpose("");

      setMessage({
        tone: completed.ok ? "neutral" : "error",
        text: completed.ok
          ? "The intellectual transfer was accepted into Continuity."
          : "Continuity accepted the state, but the pending bridge transfer could not be cleared.",
      });
    } catch {
      setMessage({
        tone: "error",
        text:
          "The transfer could not be completed. Review the Continuity state before retrying.",
      });
    } finally {
      setBusy(false);
    }
  }

  const transfer = envelope?.transfer ?? null;

  const blockedReason =
    transfer?.kind === "evidence"
      ? "Evidence requires independent source review."
      : transfer?.kind === "question" && state.inquiry
      ? "An active inquiry already exists."
      : transfer?.kind !== "question" && !state.inquiry
      ? "An inquiry must exist before this transfer can be accepted."
      : null;

  return (
    <section
      className="aevum-transfer"
      aria-label="Episteme transfer receiver"
    >
      <div className="aevum-transfer__top">
        <div>
          <p className="aevum-transfer__eyebrow">
            ARCHENOVA / EPISTEME BRIDGE
          </p>

          <h2>Intellectual transfer.</h2>

          <p className="aevum-transfer__description">
            Carry a deliberate intellectual object from
            Episteme into Aevum. Nothing enters Continuity
            without review.
          </p>
        </div>

        <span className="aevum-transfer__status">
          {transfer ? "TRANSFER PENDING" : "AWAITING TRANSFER"}
        </span>
      </div>

      {transfer ? (
        <div className="aevum-transfer__pending">
          <div className="aevum-transfer__meta">
            <span>{transfer.kind.toUpperCase()}</span>
            <span>UNVERIFIED TRANSFER</span>
          </div>

          <h3>{transfer.title}</h3>

          {!reviewOpen ? (
            <div className="aevum-transfer__actions">
              <button
                type="button"
                onClick={() => setReviewOpen(true)}
              >
                REVIEW TRANSFER →
              </button>

              <button
                type="button"
                onClick={handleDiscard}
              >
                DISCARD
              </button>
            </div>
          ) : (
            <form onSubmit={handleAccept}>
              <div className="aevum-transfer__content">
                <p>{transfer.content}</p>
              </div>

              <div className="aevum-transfer__references">
                <span>EVIDENCE REFERENCES</span>
                <p>
                  {transfer.evidenceReferenceIds.length} reference IDs
                  supplied. These are not independently verified
                  evidence and will not be attached automatically.
                </p>
              </div>

              {transfer.kind === "question" && !state.inquiry ? (
                <label className="aevum-transfer__field">
                  <span>INQUIRY PURPOSE / REQUIRED</span>

                  <textarea
                    value={purpose}
                    onChange={(event) =>
                      setPurpose(event.target.value)
                    }
                    placeholder="What must this inquiry make possible?"
                    required
                  />
                </label>
              ) : null}

              {blockedReason ? (
                <p className="aevum-transfer__notice">
                  {blockedReason}
                </p>
              ) : null}

              <p className="aevum-transfer__principle">
                Acceptance preserves the intellectual object,
                not its presumed truth. Confidence remains
                unknown and evidence remains subject to
                independent review.
              </p>

              <div className="aevum-transfer__actions">
                <button
                  type="submit"
                  disabled={
                    busy ||
                    status !== "ready" ||
                    Boolean(blockedReason) ||
                    (
                      transfer.kind === "question" &&
                      !purpose.trim()
                    )
                  }
                >
                  {busy
                    ? "VALIDATING…"
                    : "ACCEPT INTO CONTINUITY →"}
                </button>

                <button
                  type="button"
                  onClick={() => setReviewOpen(false)}
                >
                  CLOSE REVIEW
                </button>

                <button
                  type="button"
                  onClick={handleDiscard}
                >
                  DISCARD
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="aevum-transfer__empty">
          <span>NO PENDING INTELLECTUAL TRANSFER</span>

          <button
            type="button"
            onClick={refresh}
          >
            CHECK BRIDGE →
          </button>
        </div>
      )}

      {message ? (
        <p
          className="aevum-transfer__message"
          data-tone={message.tone}
          role="status"
        >
          {message.text}
        </p>
      ) : null}

      <style jsx>{`
        .aevum-transfer {
          width: min(100%, 1050px);
          margin: clamp(65px, 8vw, 110px) auto 0;
          padding: clamp(26px, 4vw, 44px);
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,.075);
          border-radius: 28px;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,.028),
            rgba(255,255,255,.007)
          );
          backdrop-filter: blur(26px) saturate(65%);
          -webkit-backdrop-filter: blur(26px) saturate(65%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
        }

        .aevum-transfer__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 28px;
        }

        .aevum-transfer__eyebrow,
        .aevum-transfer__meta,
        .aevum-transfer__status,
        .aevum-transfer__references > span,
        .aevum-transfer__field > span {
          color: rgba(255,255,255,.34);
          font-size: 8px;
          letter-spacing: .18em;
        }

        .aevum-transfer__eyebrow {
          margin: 0;
        }

        h2, h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          letter-spacing: -.03em;
        }

        h2 {
          margin: 14px 0 0;
          color: rgba(255,255,255,.9);
          font-size: clamp(26px, 3vw, 39px);
        }

        h3 {
          margin: 16px 0 0;
          color: rgba(255,255,255,.88);
          font-size: clamp(22px, 2.6vw, 31px);
        }

        .aevum-transfer__description {
          max-width: 570px;
          margin: 17px 0 0;
          color: rgba(255,255,255,.43);
          font-size: 12px;
          line-height: 1.85;
        }

        .aevum-transfer__status {
          flex-shrink: 0;
          margin-top: 5px;
        }

        .aevum-transfer__pending,
        .aevum-transfer__empty {
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid rgba(255,255,255,.065);
        }

        .aevum-transfer__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 23px;
        }

        .aevum-transfer__content {
          margin-top: 25px;
          padding: 22px 24px;
          border: 1px solid rgba(255,255,255,.065);
          border-radius: 17px;
          background: rgba(255,255,255,.015);
        }

        .aevum-transfer__content p {
          margin: 0;
          color: rgba(255,255,255,.75);
          font-size: 12px;
          line-height: 1.9;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .aevum-transfer__references {
          margin-top: 24px;
        }

        .aevum-transfer__references p,
        .aevum-transfer__principle,
        .aevum-transfer__notice,
        .aevum-transfer__message {
          color: rgba(255,255,255,.42);
          font-size: 10px;
          line-height: 1.8;
        }

        .aevum-transfer__field {
          display: block;
          margin-top: 28px;
        }

        .aevum-transfer__field > span {
          display: block;
          margin-bottom: 13px;
        }

        textarea {
          width: 100%;
          min-height: 90px;
          box-sizing: border-box;
          padding: 10px 0;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,.15);
          outline: none;
          resize: vertical;
          color: rgba(255,255,255,.85);
          background: transparent;
          font: inherit;
          font-size: 12px;
          line-height: 1.7;
        }

        textarea:focus {
          border-bottom-color: rgba(255,255,255,.45);
        }

        .aevum-transfer__principle {
          margin-top: 25px;
        }

        .aevum-transfer__actions,
        .aevum-transfer__empty {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px 30px;
        }

        .aevum-transfer__actions {
          margin-top: 28px;
        }

        button {
          border: 0;
          padding: 8px 0;
          color: rgba(255,255,255,.72);
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 8px;
          letter-spacing: .17em;
          text-align: left;
        }

        button:hover {
          color: rgba(255,255,255,.98);
        }

        button:disabled {
          cursor: default;
          opacity: .3;
        }

        .aevum-transfer__empty {
          justify-content: space-between;
          color: rgba(255,255,255,.25);
          font-size: 8px;
          letter-spacing: .13em;
        }

        .aevum-transfer__message {
          margin: 22px 0 0;
        }

        .aevum-transfer__message[data-tone="error"],
        .aevum-transfer__notice {
          color: rgba(255,210,190,.75);
        }

        @media (max-width: 700px) {
          .aevum-transfer {
            border-radius: 22px;
            padding: 25px 21px;
          }

          .aevum-transfer__top {
            flex-direction: column;
            gap: 18px;
          }

          .aevum-transfer__status {
            margin: 0;
          }

          .aevum-transfer__empty {
            align-items: flex-start;
            flex-direction: column;
          }

          .aevum-transfer__content {
            padding: 19px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: .001ms !important;
            animation-duration: .001ms !important;
          }
        }
      `}</style>
    </section>
  );
}