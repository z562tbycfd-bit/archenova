// app/gate/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const PRESETS = [
  "I will carry one constraint, not one answer.",
  "I accept that exits disappear by design.",
  "Let structure outlive intention.",
  "Make responsibility non-transferable.",
  "Remove options before they remove us.",
];

export default function GatePage() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const remaining = useMemo(() => Math.max(0, 120 - text.length), [text.length]);

  const submit = async () => {
    setMsg(null);
    const t = text.trim();
    if (t.length < 6) {
      setMsg("Write a short irreversible line (min 6 chars).");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: t }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setMsg(j?.reason ? `Rejected: ${j.reason}` : "Rejected.");
        return;
      }
      // 成功したらHOMEへ
      window.location.href = "/";
    } catch {
      setMsg("Failed to record. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="gate">
      <div className="gate-inner">
        <div className="gate-head">
          <h1 className="gate-title">Irreversibility Gate</h1>
          <p className="gate-sub">This is not a sandbox. These are points of no return.</p>
        </div>

        <div className="glass-block gate-block">
          <p className="text">
            This forge does not generate ideas. It removes futures.
            <br />
            The longer you stay, the fewer exits remain.
          </p>

          <div className="gate-field">
            <label className="gate-label">Leave a single irreversible line</label>
            <textarea
              className="gate-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Example: "Make responsibility non-transferable."'
              rows={3}
            />
            <div className="gate-meta">
              <span className="gate-hint">No names. No emails. No identifiers.</span>
              <span className="gate-count">{remaining}</span>
            </div>

            <div className="gate-presets">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="gate-preset"
                  onClick={() => setText(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {msg && <p className="gate-msg">{msg}</p>}

            <div className="gate-actions">
              <button className="inline-link" onClick={submit} disabled={busy}>
                {busy ? "Recording…" : "Enter →"}
              </button>

              <Link className="back-link" href="/">
                Leave ←
              </Link>
            </div>
          </div>
        </div>

        <p className="gate-foot">
          You are not asked to agree. Only to leave with a constraint.
        </p>
      </div>
    </main>
  );
}