"use client";

import {
  useCallback,
  useEffect,
  useRef,
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
  commitEpistemeTransfer,
  hasCommittedTransfer,
} from "@/lib/continuity/transferTransaction";

/* ==========================================================
   ARCHENOVA / AEVUM
   STAGE 1.7.3 — TRANSACTIONAL RECEIVER

   Explicit Review
   → Validated Commit
   → Verified Storage
   → React State
   → Bridge Finalization

   No automatic Evidence promotion.
========================================================== */

type Notice = {
  kind: "info" | "error";
  text: string;
};

export default function ContinuityTransferReceiver() {
  const {
    state,
    status,
    commands,
  } = useContinuity();

  const [envelope, setEnvelope] =
    useState<EpistemeBridgeEnvelope | null>(null);

  const [reviewOpen, setReviewOpen] =
    useState(false);

  const [purpose, setPurpose] =
    useState("");

  const [busy, setBusy] =
    useState(false);

  const [notice, setNotice] =
    useState<Notice | null>(null);

  const processingRef = useRef(false);

  /*
   * A verified transfer is finalized only after the
   * Provider reflects the committed transfer marker.
   */
  const [awaitingFinalization, setAwaitingFinalization] =
    useState<EpistemeBridgeEnvelope | null>(null);

  const refresh = useCallback(() => {
    const result = peekEpistemeTransfer();

    if (result.ok === true) {
      setEnvelope(result.envelope);
      return;
    }

    setEnvelope(null);
    setReviewOpen(false);

    if (
      result.status !== "empty" &&
      result.status !== "expired"
    ) {
      setNotice({
        kind: "error",
        text: result.reason,
      });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /*
   * Complete only when the committed transfer marker
   * is visible in the active Continuity state.
   */
  useEffect(() => {
    if (
      !awaitingFinalization ||
      status !== "ready"
    ) {
      return;
    }

    const transferId =
      awaitingFinalization.transfer.transferId;

    if (!hasCommittedTransfer(state, transferId)) {
      return;
    }

    const completed = completeEpistemeTransfer(
      awaitingFinalization,
    );

    if (completed.ok) {
      setEnvelope(null);
      setReviewOpen(false);
      setPurpose("");
      setNotice({
        kind: "info",
        text:
          "Transfer committed, verified, and finalized.",
      });
    } else {
      setNotice({
        kind: "error",
        text:
          "Continuity was committed. Bridge cleanup is pending and can be retried safely.",
      });
    }

    setAwaitingFinalization(null);
  }, [awaitingFinalization, state, status]);

  function handleDiscard() {
    if (processingRef.current) return;

    const result = discardEpistemeTransfer();

    if (!result.ok) {
      setNotice({
        kind: "error",
        text: "Unable to discard the pending transfer.",
      });
      return;
    }

    setEnvelope(null);
    setReviewOpen(false);
    setPurpose("");
    setNotice({
      kind: "info",
      text:
        "Pending transfer discarded. Continuity was not modified.",
    });
  }

  function handleAccept(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !envelope ||
      processingRef.current ||
      status !== "ready"
    ) {
      return;
    }

    processingRef.current = true;
    setBusy(true);
    setNotice(null);

    try {
      const result = commitEpistemeTransfer({
        expectedEnvelope: envelope,
        currentState: state,
        purpose,
      });

      if (result.ok === false) {
        setNotice({
          kind: "error",
          text: result.message,
        });

        if (result.status === "stale") {
          refresh();
        }

        return;
      }

      /*
       * Synchronize React state using the existing
       * validated Provider import.
       */
      const imported = commands.importState(result.state);

      if (!imported) {
        setNotice({
          kind: "error",
          text:
            "Storage contains the verified commit, but React state synchronization failed. The Bridge remains available for recovery.",
        });
        return;
      }

      if (result.bridgeCleared) {
        setEnvelope(null);
        setReviewOpen(false);
        setPurpose("");
        setNotice({
          kind: "info",
          text:
            "Previously committed transfer recovered.",
        });
        return;
      }

      /*
       * The effect above waits until the Provider
       * exposes the committed transfer marker.
       */
      setAwaitingFinalization(envelope);

      setNotice({
        kind: "info",
        text:
          "Continuity commit verified. Finalizing the Bridge after state synchronization.",
      });
    } catch {
      setNotice({
        kind: "error",
        text:
          "The transaction was interrupted. The pending transfer can be reviewed again.",
      });
    } finally {
      processingRef.current = false;
      setBusy(false);
    }
  }

  const transfer = envelope?.transfer ?? null;

  const blockedReason =
    transfer?.kind === "evidence"
      ? "Evidence requires independent source review."
      : transfer?.kind === "question" && state.inquiry
      ? "The existing inquiry cannot be overwritten."
      : transfer && transfer.kind !== "question" && !state.inquiry
      ? "Begin an inquiry before accepting this transfer."
      : null;

  return (
    <section
      className="aevum-transfer"
      aria-label="Episteme transfer receiver"
    >
      <div className="aevum-transfer__header">
        <div>
          <p className="aevum-transfer__eyebrow">
            ARCHENOVA / EPISTEME BRIDGE
          </p>

          <h2>Intellectual transfer.</h2>

          <p className="aevum-transfer__description">
            Review intellectual state before it enters
            Aevum. Acceptance is validated, verified,
            and explicitly finalized.
          </p>
        </div>

        <span className="aevum-transfer__status">
          {transfer ? "TRANSFER PENDING" : "AWAITING TRANSFER"}
        </span>
      </div>

      {transfer ? (
        <div className="aevum-transfer__body">
          <div className="aevum-transfer__meta">
            <span>{transfer.kind.toUpperCase()}</span>
            <span>REVIEW REQUIRED</span>
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
                {transfer.content}
              </div>

              <p className="aevum-transfer__references">
                {transfer.evidenceReferenceIds.length} evidence
                reference IDs supplied. References are not
                automatically treated as verified evidence.
              </p>

              {transfer.kind === "question" && !state.inquiry ? (
                <label className="aevum-transfer__field">
                  <span>INQUIRY PURPOSE / REQUIRED</span>

                  <textarea
                    required
                    value={purpose}
                    onChange={(event) =>
                      setPurpose(event.target.value)
                    }
                    placeholder="What must this inquiry make possible?"
                  />
                </label>
              ) : null}

              {blockedReason ? (
                <p className="aevum-transfer__warning">
                  {blockedReason}
                </p>
              ) : null}

              <p className="aevum-transfer__principle">
                Transfer acceptance does not establish truth.
                Reasoning confidence remains unknown, and
                Evidence requires independent review.
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
                      !state.inquiry &&
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

          <button type="button" onClick={refresh}>
            CHECK BRIDGE →
          </button>
        </div>
      )}

      {notice ? (
        <p
          className="aevum-transfer__notice"
          data-kind={notice.kind}
          role="status"
        >
          {notice.text}
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
          -webkit-backdrop-filter: blur(26px) saturate(65%);
          backdrop-filter: blur(26px) saturate(65%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
        }

        .aevum-transfer__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 28px;
        }

        .aevum-transfer__eyebrow,
        .aevum-transfer__meta,
        .aevum-transfer__status,
        .aevum-transfer__field span {
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

        .aevum-transfer__body,
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
          color: rgba(255,255,255,.75);
          font-size: 12px;
          line-height: 1.9;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .aevum-transfer__references,
        .aevum-transfer__principle,
        .aevum-transfer__notice,
        .aevum-transfer__warning {
          margin-top: 24px;
          color: rgba(255,255,255,.42);
          font-size: 10px;
          line-height: 1.8;
        }

        .aevum-transfer__field {
          display: block;
          margin-top: 28px;
        }

        .aevum-transfer__field span {
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

        .aevum-transfer__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 30px;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          color: rgba(255,255,255,.25);
          font-size: 8px;
          letter-spacing: .13em;
        }

        .aevum-transfer__notice[data-kind="error"],
        .aevum-transfer__warning {
          color: rgba(255,210,190,.75);
        }

        @media (max-width: 700px) {
          .aevum-transfer {
            border-radius: 22px;
            padding: 25px 21px;
          }

          .aevum-transfer__header {
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
      `}</style>
    </section>
  );
}