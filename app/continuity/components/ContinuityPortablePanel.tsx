"use client";

import { useState } from "react";
import { useContinuity } from "../ContinuityProvider";
import {
  CONTINUITY_PORTABLE_MAX_BYTES,
  createPortableState,
  serializePortableState,
  verifyPortableState,
} from "@/lib/continuity/portableState";

type ExportStatus = "idle" | "preparing" | "success" | "error";

function formatBytes(bytes: number): string {
  return bytes < 1024
    ? `${bytes} B`
    : `${(bytes / 1024).toFixed(1)} KB`;
}

export default function ContinuityPortablePanel() {
  const { state, status, invariantIssues } = useContinuity();
  const [exportStatus, setExportStatus] = useState<ExportStatus>("idle");
  const [message, setMessage] = useState("");
  const [lastDigest, setLastDigest] = useState("");
  const [lastExportedAt, setLastExportedAt] = useState("");
  const [busy, setBusy] = useState(false);

  const canExport =
    status === "ready" && invariantIssues.length === 0 && !busy;

  async function handleExport() {
    if (!canExport) return;

    setBusy(true);
    setExportStatus("preparing");
    setMessage("Validating the current inquiry state…");
    setLastDigest("");
    setLastExportedAt("");

    try {
      const created = await createPortableState(state);
      if (created.ok === false) {
        setExportStatus("error");
        setMessage(created.message);
        return;
      }

      const verified = await verifyPortableState(created.envelope);
      if (verified.ok === false) {
        setExportStatus("error");
        setMessage(`Export verification failed: ${verified.message}`);
        return;
      }

      const json = serializePortableState(verified.envelope);
      const bytes = new TextEncoder().encode(json).byteLength;
      if (bytes > CONTINUITY_PORTABLE_MAX_BYTES) {
        setExportStatus("error");
        setMessage("The serialized export exceeds the 8 MiB size limit.");
        return;
      }

      const blob = new Blob([json], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = verified.envelope.exportedAt
        .replace(/[:.]/g, "-")
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      link.href = url;
      link.download = `archenova-aevum-continuity-${timestamp}.json`;
      link.style.display = "none";

      try {
        document.body.appendChild(link);
        link.click();
      } finally {
        link.remove();
        // Revoke on the next task to allow the browser to begin the download.
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      }

      setLastDigest(verified.envelope.integrity.digest);
      setLastExportedAt(verified.envelope.exportedAt);
      setExportStatus("success");
      setMessage(
        `Verified export prepared (${formatBytes(bytes)}). Check your browser downloads.`,
      );
    } catch {
      setExportStatus("error");
      setMessage("The export could not be completed. Continuity was not changed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="aevum-portable" aria-labelledby="aevum-portable-title">
      <div className="aevum-portable__heading">
        <div>
          <p className="aevum-portable__eyebrow">AEVUM / STATE SOVEREIGNTY</p>
          <h2 id="aevum-portable-title">Portable Continuity</h2>
          <p className="aevum-portable__description">
            Preserve the inquiry beyond this browser. Export a verified,
            self-contained snapshot without a cloud or account dependency.
          </p>
        </div>
        <span className="aevum-portable__edition">01 / EXPORT</span>
      </div>

      <div className="aevum-portable__divider" />

      <div className="aevum-portable__body">
        <div className="aevum-portable__principles">
          <span>SCHEMA-BOUND</span>
          <span>SHA-256 INTEGRITY</span>
          <span>LOCAL DOWNLOAD</span>
          <span>NO STATE MUTATION</span>
        </div>
        <button
          type="button"
          className="aevum-portable__action"
          disabled={!canExport}
          onClick={handleExport}
        >
          {busy ? "VERIFYING STATE…" : "EXPORT CONTINUITY →"}
        </button>
      </div>

      {status !== "ready" && (
        <p className="aevum-portable__notice" role="status">
          Export is unavailable until the Continuity state is ready.
        </p>
      )}
      {invariantIssues.length > 0 && (
        <p className="aevum-portable__notice" role="status">
          Resolve the {invariantIssues.length} state integrity issue(s) before export.
        </p>
      )}
      {message && (
        <p className="aevum-portable__notice" role="status" data-status={exportStatus}>
          {message}
        </p>
      )}
      {lastDigest && (
        <div className="aevum-portable__receipt">
          <span>EXPORTED AT · {lastExportedAt}</span>
          <span>SHA-256 · <code>{lastDigest}</code></span>
        </div>
      )}
      <p className="aevum-portable__boundary">
        Integrity does not prove authorship. Keep the exported file private:
        it may contain the full inquiry, evidence, reasoning, and decisions.
        Import and recovery require a separate explicit review.
      </p>

      <style jsx>{`
        .aevum-portable {
          box-sizing: border-box;
          width: min(100%, 1180px);
          margin: clamp(28px, 4vw, 52px) auto 0;
          padding: clamp(27px, 4vw, 46px);
          border: 1px solid rgba(255,255,255,.075);
          border-radius: 28px;
          color: rgba(238,238,234,.82);
          background: linear-gradient(140deg,rgba(255,255,255,.025),rgba(255,255,255,.008));
          -webkit-backdrop-filter: blur(24px) saturate(60%);
          backdrop-filter: blur(24px) saturate(60%);
        }
        .aevum-portable__heading { display:flex; justify-content:space-between; gap:30px; align-items:start; }
        .aevum-portable__eyebrow, .aevum-portable__edition {
          margin:0; color:rgba(224,224,218,.35); font-size:8px; letter-spacing:.2em;
        }
        h2 { margin:15px 0 0; color:rgba(248,248,246,.96); font-family:Georgia,"Times New Roman",serif; font-size:clamp(27px,3vw,42px); font-weight:400; letter-spacing:-.03em; }
        .aevum-portable__description { max-width:660px; margin:15px 0 0; color:rgba(224,224,218,.47); font-size:12px; line-height:1.9; }
        .aevum-portable__edition { white-space:nowrap; padding-top:4px; }
        .aevum-portable__divider { height:1px; margin:28px 0; background:rgba(255,255,255,.055); }
        .aevum-portable__body { display:flex; align-items:center; justify-content:space-between; gap:25px; }
        .aevum-portable__principles { display:flex; flex-wrap:wrap; gap:12px 19px; color:rgba(255,255,255,.28); font-size:7px; letter-spacing:.14em; }
        .aevum-portable__action { flex-shrink:0; border:1px solid rgba(255,255,255,.13); border-radius:999px; padding:15px 20px; color:rgba(255,255,255,.82); background:rgba(255,255,255,.035); cursor:pointer; font:inherit; font-size:8px; letter-spacing:.16em; transition:background .2s,border-color .2s; }
        .aevum-portable__action:hover:not(:disabled) { border-color:rgba(255,255,255,.3); background:rgba(255,255,255,.07); }
        .aevum-portable__action:disabled { opacity:.4; cursor:not-allowed; }
        .aevum-portable__notice { margin:20px 0 0; color:rgba(255,255,255,.6); font-size:10px; line-height:1.7; }
        .aevum-portable__notice[data-status="error"] { color:rgba(255,205,195,.8); }
        .aevum-portable__receipt { display:grid; gap:9px; margin-top:23px; padding:18px 0 0; border-top:1px solid rgba(255,255,255,.055); color:rgba(255,255,255,.42); font-size:8px; line-height:1.7; letter-spacing:.08em; overflow-wrap:anywhere; }
        .aevum-portable__receipt code { font-size:9px; letter-spacing:0; }
        .aevum-portable__boundary { margin:26px 0 0; color:rgba(224,224,218,.3); font-size:9px; line-height:1.8; }
        @media(max-width:700px) { .aevum-portable { padding:27px 21px; border-radius:22px; } .aevum-portable__heading, .aevum-portable__body { flex-direction:column; align-items:flex-start; } .aevum-portable__edition { order:-1; } .aevum-portable__action { width:100%; } }
        @media(prefers-reduced-motion:reduce) { .aevum-portable__action { transition:none; } }
      `}</style>
    </section>
  );
}
