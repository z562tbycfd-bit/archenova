"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useContinuity } from "../ContinuityProvider";
import type { ContinuityState, ContinuityPortableEnvelope } from "@/lib/continuity/types";
import {
  CONTINUITY_PORTABLE_MAX_BYTES,
  createPortableState,
  parsePortableStateJSON,
  serializePortableState,
  verifyPortableState,
} from "@/lib/continuity/portableState";

type Preview = {
  envelope: ContinuityPortableEnvelope;
  incoming: ContinuityState;
  current: ContinuityState;
  currentDigest: string;
  sameSnapshot: boolean;
  sameIdentity: boolean;
  sameInquiry: boolean;
  conflicts: string[];
  filename: string;
};

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
  const [preview, setPreview] = useState<Preview | null>(null);
  const [importMessage, setImportMessage] = useState("");
  const [importBusy, setImportBusy] = useState(false);
  const requestId = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const lastStateRef = useRef(state);
  useEffect(() => {
    if (lastStateRef.current !== state) {
      lastStateRef.current = state;
      if (preview) {
        requestId.current += 1;
        setPreview(null);
        setImportMessage("Current state changed. Select the file again for a fresh comparison.");
        if (fileInput.current) fileInput.current.value = "";
      }
    }
  }, [state, preview]);

  function clearPreview(message = "") {
    requestId.current += 1;
    setPreview(null);
    setImportMessage(message);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const token = ++requestId.current;
    setPreview(null);
    setImportMessage("");
    if (!file) return;
    if (status !== "ready" || invariantIssues.length > 0) {
      setImportMessage("Current Continuity is not ready for a reliable comparison.");
      return;
    }
    if (file.size > CONTINUITY_PORTABLE_MAX_BYTES) {
      setImportMessage("File exceeds the 8 MiB limit. No state was changed.");
      return;
    }
    setImportBusy(true);
    try {
      const json = await file.text();
      const parsed = await parsePortableStateJSON(json);
      if (token !== requestId.current) return;
      if (parsed.ok === false) {
        setImportMessage(`${parsed.message} No state was changed.`);
        return;
      }
      // The current state is validated independently. No reducer action is dispatched.
      const current = await createPortableState(state, parsed.envelope.exportedAt);
      if (token !== requestId.current) return;
      if (current.ok === false) {
        setImportMessage(`Current-state verification failed: ${current.message}`);
        return;
      }
      const incoming = parsed.state;
      const existing = current.state;
      const sameSnapshot = current.envelope.integrity.digest === parsed.envelope.integrity.digest;
      const sameIdentity = incoming.continuityId === existing.continuityId;
      const sameInquiry = incoming.inquiry?.id === existing.inquiry?.id;
      const conflicts: string[] = [];
      if (!sameIdentity) conflicts.push("Different Continuity identity: recovery would replace a different workspace.");
      if (sameIdentity && !sameSnapshot) conflicts.push("Same Continuity identity with different content: diverged revisions.");
      if (!sameInquiry) conflicts.push("Different inquiry identity: active inquiry would change.");
      if (incoming.schemaVersion !== existing.schemaVersion) conflicts.push("Schema version differs.");
      setPreview({ envelope: parsed.envelope, incoming, current: existing,
        currentDigest: current.envelope.integrity.digest, sameSnapshot, sameIdentity,
        sameInquiry, conflicts, filename: file.name });
      setImportMessage("File verified. Preview only — no state has been imported.");
    } catch {
      if (token === requestId.current) setImportMessage("Unable to read the file. No state was changed.");
    } finally {
      if (token === requestId.current) setImportBusy(false);
    }
  }


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
      <div className="aevum-portable__divider" />
      <div className="aevum-portable__heading">
        <div>
          <p className="aevum-portable__eyebrow">LOCAL FILE / READ-ONLY VERIFICATION</p>
          <h2>Import Preview &amp; Review</h2>
          <p className="aevum-portable__description">
            Select an exported JSON file to inspect its schema, SHA-256 integrity,
            inquiry contents and possible collisions with the active state.
            Selecting a file never restores or replaces anything.
          </p>
        </div>
        <span className="aevum-portable__edition">02 / PREVIEW</span>
      </div>
      <div className="aevum-portable__import-actions">
        <label className="aevum-portable__file-label" htmlFor="aevum-portable-file">
          {importBusy ? "VERIFYING FILE…" : "SELECT PORTABLE JSON →"}
        </label>
        <input id="aevum-portable-file" ref={fileInput} type="file"
          accept=".json,application/json" onChange={handleImportFile}
          disabled={importBusy || status !== "ready" || invariantIssues.length > 0}
          aria-label="Select a Continuity portable JSON file" />
        {preview && <button type="button" className="aevum-portable__secondary" onClick={() => clearPreview("Preview discarded. No state was changed.")}>DISCARD PREVIEW</button>}
      </div>
      {importMessage && <p className="aevum-portable__notice" role="status">{importMessage}</p>}
      {preview && (
        <div className="aevum-portable__preview" aria-label="Verified import preview">
          <div className="aevum-portable__preview-top">
            <strong>VERIFIED FILE · PREVIEW ONLY</strong>
            <span>{preview.filename}</span>
          </div>
          <div className="aevum-portable__comparison">
            <div>
              <span>INCOMING SNAPSHOT</span>
              <strong>{preview.incoming.inquiry?.question ?? "No active inquiry"}</strong>
              <small>Evidence {preview.incoming.evidence.length} · Reasoning {preview.incoming.reasoning.length} · Decisions {preview.incoming.decisions.length} · Outputs {preview.incoming.outputs.length}</small>
              <small>Updated {preview.incoming.updatedAt}</small>
            </div>
            <div>
              <span>CURRENT WORKSPACE</span>
              <strong>{preview.current.inquiry?.question ?? "No active inquiry"}</strong>
              <small>Evidence {preview.current.evidence.length} · Reasoning {preview.current.reasoning.length} · Decisions {preview.current.decisions.length} · Outputs {preview.current.outputs.length}</small>
              <small>Updated {preview.current.updatedAt}</small>
            </div>
          </div>
          <div className="aevum-portable__checks">
            <p>SCHEMA · {preview.envelope.schemaVersion} — VERIFIED</p>
            <p>SHA-256 · VERIFIED (integrity, not authorship)</p>
            <p>SNAPSHOT · {preview.sameSnapshot ? "IDENTICAL" : "DIFFERENT"}</p>
            <p>CONTINUITY ID · {preview.sameIdentity ? "MATCH" : "DIFFERENT"}</p>
            <p>INQUIRY ID · {preview.sameInquiry ? "MATCH" : "DIFFERENT"}</p>
            <p>EXPORTED · {preview.envelope.exportedAt}</p>
            <p className="aevum-portable__digest">FILE DIGEST · {preview.envelope.integrity.digest}</p>
            <p className="aevum-portable__digest">CURRENT DIGEST (SAME TIMESTAMP) · {preview.currentDigest}</p>
          </div>
          <div className="aevum-portable__conflicts">
            <strong>{preview.conflicts.length ? "CONFLICTS / REVIEW REQUIRED" : "NO IDENTITY CONFLICT DETECTED"}</strong>
            {preview.conflicts.length ? (
              <ul>{preview.conflicts.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : <p>{preview.sameSnapshot ? "The incoming snapshot matches the current state." : "Content differs; compare before any future recovery."}</p>}
          </div>
          <p className="aevum-portable__boundary">
            Preview is read-only. No automatic merge, promotion, overwrite or recovery is available at this stage.
            File verification cannot establish who created the file.
          </p>
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
        .aevum-portable__import-actions { display:flex; flex-wrap:wrap; gap:14px; align-items:center; margin-top:26px; }
        .aevum-portable__file-label, .aevum-portable__secondary { display:inline-block; border:1px solid rgba(255,255,255,.14); border-radius:999px; padding:15px 20px; background:rgba(255,255,255,.035); color:rgba(255,255,255,.82); font:inherit; font-size:8px; letter-spacing:.14em; cursor:pointer; }
        .aevum-portable__secondary { background:transparent; }
        .aevum-portable__import-actions input { position:absolute; width:1px; height:1px; opacity:0; overflow:hidden; }
        .aevum-portable__import-actions:has(input:disabled) .aevum-portable__file-label { opacity:.4; pointer-events:none; }
        .aevum-portable__import-actions input:focus-visible + * { outline:2px solid white; }
        .aevum-portable__preview { margin-top:28px; padding:clamp(18px,3vw,28px); border:1px solid rgba(255,255,255,.1); border-radius:20px; background:rgba(255,255,255,.018); }
        .aevum-portable__preview-top { display:flex; justify-content:space-between; gap:15px; flex-wrap:wrap; color:rgba(255,255,255,.65); font-size:8px; letter-spacing:.12em; overflow-wrap:anywhere; }
        .aevum-portable__preview-top strong { font-weight:500; }
        .aevum-portable__comparison { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:24px; }
        .aevum-portable__comparison > div { min-width:0; padding:18px; border:1px solid rgba(255,255,255,.075); border-radius:14px; }
        .aevum-portable__comparison span, .aevum-portable__comparison small { display:block; color:rgba(255,255,255,.38); font-size:9px; line-height:1.8; }
        .aevum-portable__comparison strong { display:block; margin:10px 0; color:rgba(255,255,255,.84); font-family:Georgia,serif; font-size:19px; font-weight:400; overflow-wrap:anywhere; }
        .aevum-portable__checks { margin-top:22px; display:grid; gap:8px; }
        .aevum-portable__checks p { margin:0; color:rgba(255,255,255,.5); font-size:9px; line-height:1.8; }
        .aevum-portable__digest { overflow-wrap:anywhere; }
        .aevum-portable__conflicts { margin-top:24px; padding-top:18px; border-top:1px solid rgba(255,255,255,.08); color:rgba(255,255,255,.64); font-size:10px; line-height:1.8; }
        .aevum-portable__conflicts strong { font-size:8px; font-weight:500; letter-spacing:.13em; }
        .aevum-portable__conflicts ul { padding-left:19px; }
        @media(max-width:700px) { .aevum-portable__comparison { grid-template-columns:1fr; } }
        @media(max-width:700px) { .aevum-portable { padding:27px 21px; border-radius:22px; } .aevum-portable__heading, .aevum-portable__body { flex-direction:column; align-items:flex-start; } .aevum-portable__edition { order:-1; } .aevum-portable__action { width:100%; } }
        @media(prefers-reduced-motion:reduce) { .aevum-portable__action { transition:none; } }
      `}</style>
    </section>
  );
}
