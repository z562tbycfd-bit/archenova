"use client";

import { useEffect, useMemo, useState } from "react";

type FieldKey = "A" | "B" | "C" | "D" | "E";

type Choice = {
  field: FieldKey;
  value: string;
};

const FIELDS: Record<
  FieldKey,
  { title: string; items: string[]; note: string }
> = {
  A: {
    title: "Constraint Field A｜Time Density",
    items: ["Operational lifetime", "Maintenance horizon", "Post-human persistence"],
    note: "Longer horizons increase structural strictness.",
  },
  B: {
    title: "Constraint Field B｜Failure Topology",
    items: ["Local failure containment", "Cascading failure elimination", "Failure-as-structure"],
    note: "Failure is treated as geometry, not an incident.",
  },
  C: {
    title: "Constraint Field C｜Control Prohibition",
    items: ["Human intervention banned", "Algorithmic override banned", "Adaptive feedback banned"],
    note: "The system must stand without continuous correction.",
  },
  D: {
    title: "Constraint Field D｜Responsibility Geometry",
    items: ["Point responsibility", "Distributed but fixed responsibility", "Intergenerational lock-in"],
    note: "Responsibility cannot migrate after commitment.",
  },
  E: {
    title: "Constraint Field E｜Record Irreversibility",
    items: ["Data cannot be erased", "Measurements cannot be reinterpreted", "Decisions cannot be anonymized"],
    note: "Records become part of the boundary itself.",
  },
};

function keyFor(c: Choice) {
  return `${c.field}::${c.value}`;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Tension (0..3)
 * 0: compatible
 * 1: mild friction
 * 2: strong friction
 * 3: near-incompatible
 */
function pairTension(a: Choice, b: Choice): number {
  const A = a.field;
  const B = b.field;

  // Field-level base tensions (ArcheNova-ish "structural friction")
  const base: Record<string, number> = {
    "A:C": 2, // time density vs control prohibition
    "A:E": 2, // long horizon vs irreversible record
    "B:C": 2, // failure geometry vs control prohibition
    "C:D": 2, // control bans vs responsibility fixation
    "D:E": 2, // responsibility vs non-anonymizable decisions
    "B:E": 1,
    "A:D": 1,
  };

  const k1 = `${A}:${B}`;
  const k2 = `${B}:${A}`;
  let t = base[k1] ?? base[k2] ?? 1;

  // Item-level escalations (specific "no-return" collisions)
  const v1 = a.value.toLowerCase();
  const v2 = b.value.toLowerCase();

  // "Adaptive feedback banned" collides hard with "Failure-as-structure"
  if (
    (v1.includes("adaptive feedback banned") && v2.includes("failure-as-structure")) ||
    (v2.includes("adaptive feedback banned") && v1.includes("failure-as-structure"))
  ) t = 3;

  // "Post-human persistence" + "Data cannot be erased" raises strong long-term burden
  if (
    (v1.includes("post-human persistence") && v2.includes("data cannot be erased")) ||
    (v2.includes("post-human persistence") && v1.includes("data cannot be erased"))
  ) t = Math.max(t, 3);

  // "Decisions cannot be anonymized" + "Distributed but fixed responsibility" creates legal strain
  if (
    (v1.includes("decisions cannot be anonymized") && v2.includes("distributed but fixed responsibility")) ||
    (v2.includes("decisions cannot be anonymized") && v1.includes("distributed but fixed responsibility"))
  ) t = Math.max(t, 3);

  return clamp(t, 0, 3);
}

function domainSacrifice(selected: Choice[]): string[] {
  // Not a "choice": we infer sacrificed domains
  const s = selected.map((c) => c.value.toLowerCase()).join(" | ");
  const out = new Set<string>();

  // Control prohibition stresses Computation
  if (s.includes("banned")) out.add("Computation");

  // Long horizons stress Energy + Capital
  if (s.includes("post-human") || s.includes("operational lifetime") || s.includes("maintenance")) {
    out.add("Energy");
    out.add("Capital");
  }

  // Non-anonymizable decisions stress Institution
  if (s.includes("anonym")) out.add("Institution");

  // Strong failure topology (cascading elimination) stresses Energy (redundancy) + Capital (cost)
  if (s.includes("cascading failure elimination")) {
    out.add("Energy");
    out.add("Capital");
  }

  return Array.from(out);
}

function autoPrompts(selected: Choice[]): string[] {
  const fields = new Set(selected.map((c) => c.field));
  const s = selected.map((c) => c.value.toLowerCase()).join(" | ");

  const prompts: string[] = [];

  // Prompt 1
  if (fields.has("A") || s.includes("underground")) prompts.push("What must now exist underground?"); 
  else prompts.push("What must now be physically fixed, not operationally maintained?");

  // Prompt 2
  if (fields.has("C")) prompts.push("What must never depend on incentives or continuous correction?");
  else prompts.push("What must never be left to optimization or prediction?");

  // Prompt 3
  if (fields.has("E") || s.includes("record")) prompts.push("What decision must be made once and never revisited?");
  else prompts.push("What must become irreversible before anything else begins?");

  return prompts.slice(0, 3);
}

function makeCuts(selected: Choice[]) {
  const lines = selected.map((c) => `• ${FIELDS[c.field].title.split("｜")[1]} — ${c.value}`);
  const setText = lines.join("\n");

  const primary =
    "Primary Structural Cut:\n" +
    "A boundary is fixed where intervention cannot be used as a safety valve.\n" +
    "The system survives only through geometry, materials, and responsibility that cannot migrate.\n\n" +
    setText;

  const secondary =
    "Secondary Stress Cut:\n" +
    "The break point appears where an eliminated option would normally absorb uncertainty.\n" +
    "When correction is forbidden, uncertainty becomes load.\n\n" +
    setText;

  const shadow =
    "Shadow Cut:\n" +
    "What becomes fixed is not only what is built, but what can no longer be denied.\n" +
    "Records, accountability, and persistence quietly harden into infrastructure.\n\n" +
    setText;

  return { primary, secondary, shadow };
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function tensionColor(t: number) {
  // Use alpha only (to keep ArcheNova palette & avoid harsh borders)
  // 0..3 => 0.06..0.22
  const alpha = [0.06, 0.10, 0.16, 0.22][t] ?? 0.10;
  return `rgba(255,255,255,${alpha})`;
}

export default function ConstraintForge() {
  const [selected, setSelected] = useState<Choice[]>([]);
  const [historyKeys, setHistoryKeys] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Persist selection history locally (no server, no logs)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("an_constraint_forge_history");
      if (raw) setHistoryKeys(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      const keys = selected.map(keyFor);
      localStorage.setItem("an_constraint_forge_history", JSON.stringify(keys));
      setHistoryKeys(keys);
    } catch {
      // ignore
    }
  }, [selected]);

  const count = selected.length;
  const strictness = useMemo(() => {
    // 3..5 => stricter
    if (count <= 3) return "Standard strictness";
    if (count === 4) return "High strictness";
    return "Max strictness (few exits remain)";
  }, [count]);

  const warnings = useMemo(() => {
    const warns: string[] = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        const t = pairTension(selected[i], selected[j]);
        if (t >= 3) {
          warns.push(
            `Near-incompatible pair: "${selected[i].value}" × "${selected[j].value}"`
          );
        }
      }
    }
    return warns.slice(0, 5);
  }, [selected]);

  const sacrificed = useMemo(() => domainSacrifice(selected), [selected]);
  const prompts = useMemo(() => autoPrompts(selected), [selected]);
  const cuts = useMemo(() => makeCuts(selected), [selected]);

  const toggle = (field: FieldKey, value: string) => {
    const nextKey = keyFor({ field, value });
    const exists = selected.some((c) => keyFor(c) === nextKey);

    if (exists) {
      setSelected((prev) => prev.filter((c) => keyFor(c) !== nextKey));
      return;
    }

    // min 3, max 5 constraint selection rule (enforced by UI)
    if (selected.length >= 5) return;

    setSelected((prev) => [...prev, { field, value }]);
  };

  const canEnterDeep = selected.length >= 3;

  return (
    <main className="page-standard">
      {/* ① Entry */}
      <header className="page-head">
        <h1>The Constraint Forge</h1>
        <p className="page-lead">— Create Only What Cannot Be Undone</p>

        <div className="glass-block">
          <p className="text">
            The Constraint Forge is a space for creation through commitment.
            Visitors do not generate ideas or solutions, but deliberately select
            constraints that remove possible futures. Nothing is built, and
            nothing is decided—except what can no longer be undone.
          </p>
        </div>

        <div className="glass-block">
          <p className="text">
            <strong>Irreversible Threshold</strong><br />
            This forge does not generate ideas.<br />
            It removes futures.<br />
            The longer you stay, the fewer exits remain.
          </p>
          <p className="text dim">
            Scrolling begins selection. You may go back—but your selection history is kept on this device only.
          </p>
        </div>
      </header>

      {/* ② Constraint Field */}
      <section className="glass-block">
        <h2>Constraint Field｜Select what must NOT be allowed</h2>

        <p className="text dim">
          Choose <strong>at least 3</strong> and up to <strong>5</strong>. More constraints → harsher evaluation.
        </p>

        <div className="diagram-two">
          {(Object.keys(FIELDS) as FieldKey[]).map((k) => {
            const f = FIELDS[k];
            return (
              <div key={k} className="diagram-card">
                <div className="diagram-label">{f.title}</div>
                <p className="text dim" style={{ marginTop: 0 }}>
                  {f.note}
                </p>

                <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                  {f.items.map((v) => {
                    const checked = selected.some((c) => c.field === k && c.value === v);
                    const disabled = !checked && selected.length >= 5;

                    return (
                      <label
                        key={v}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          padding: "10px 12px",
                          borderRadius: 14,
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: checked ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)",
                          opacity: disabled ? 0.55 : 1,
                          cursor: disabled ? "not-allowed" : "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggle(k, v)}
                          style={{ width: 16, height: 16 }}
                        />
                        <span style={{ color: "rgba(245,245,245,0.86)", lineHeight: 1.5 }}>
                          {v}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 14 }}>
          <p className="text">
            <strong>Selected:</strong> {selected.length} / 5{" "}
            <span style={{ color: "rgba(245,245,245,0.60)" }}>— {strictness}</span>
          </p>
          {selected.length > 0 && (
            <ul className="bullets">
              {selected.map((c) => (
                <li key={keyFor(c)}>
                  {c.value} <span style={{ color: "rgba(245,245,245,0.55)" }}>({c.field})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ③ Structural Tension Map */}
      <section className="glass-block">
        <h2>Structural Tension Map｜Immediate evaluation</h2>

        {!canEnterDeep ? (
          <p className="text dim">
            Select at least <strong>3 constraints</strong> to activate evaluation.
          </p>
        ) : (
          <>
            <p className="text dim">
              Tension is not negotiable. Sacrifices are inferred, not chosen.
            </p>

            {/* Heatmap grid */}
            <div className="forge-heatmap-wrap">
            <div
    className="forge-heatmap"
    style={{
      display: "grid",
      gridTemplateColumns: `120px repeat(${selected.length}, 84px)`,
      gap: 8,
      marginTop: 12,
    }}
  >
  <div />
    {selected.map((c) => (
      <div
        key={"col-" + keyFor(c)}
        style={{
                    fontSize: 12,
                    color: "rgba(245,245,245,0.72)",
                    padding: "8px 10px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(0,0,0,0.10)",
                  }}
                  title={c.value}
                >
                  {c.field}
                </div>
              ))}

              {selected.map((row, i) => (
                <>
                  <div
                    key={"rowlabel-" + keyFor(row)}
                    style={{
                      fontSize: 12,
                      color: "rgba(245,245,245,0.75)",
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(0,0,0,0.10)",
                    }}
                    title={row.value}
                  >
                    {row.value}
                  </div>

                  {selected.map((col, j) => {
                    const t = i === j ? 0 : pairTension(row, col);
                    return (
                      <div
                        key={`cell-${i}-${j}`}
                        style={{
                          height: 38,
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: tensionColor(t),
                        }}
                        title={i === j ? "self" : `tension: ${t}/3`}
                      />
                    );
                  })}
                </>
              ))}
            </div>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <p className="text"><strong>Warnings</strong></p>
                <ul className="bullets">
                  {warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sacrificed domains */}
            <div style={{ marginTop: 14 }}>
              <p className="text"><strong>Domain Sacrifice (inferred)</strong></p>
              {sacrificed.length === 0 ? (
                <p className="text dim">No major sacrifice detected yet.</p>
              ) : (
                <ul className="bullets">
                  {sacrificed.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              <p className="text dim">
                Sacrifice is not a preference. It is the structural cost of removing futures.
              </p>
            </div>
          </>
        )}
      </section>

      {/* ④ Deepening Prompts */}
      <section className="glass-block">
        <h2>Structural Deepening Prompts｜Thought pressure</h2>

        {!canEnterDeep ? (
          <p className="text dim">
            Select at least <strong>3 constraints</strong> to generate prompts.
          </p>
        ) : (
          <>
            <p className="text dim">
              Answers are optional and never saved.
            </p>

            <div className="diagram-stack">
              {prompts.map((p) => (
                <div key={p} className="stack-item ok">
                  {p}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {prompts.map((p) => (
                <textarea
                  key={"t-" + p}
                  placeholder={p}
                  value={notes[p] ?? ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [p]: e.target.value }))}
                  style={{
                    width: "100%",
                    minHeight: 86,
                    borderRadius: 16,
                    padding: 12,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(0,0,0,0.18)",
                    color: "rgba(245,245,245,0.86)",
                    outline: "none",
                    lineHeight: 1.6,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ⑤ Multi-Cut Generation */}
      <section className="glass-block">
        <h2>Multi-Cut Generation｜Design cuts</h2>

        {!canEnterDeep ? (
          <p className="text dim">
            Select at least <strong>3 constraints</strong> to generate cuts.
          </p>
        ) : (
          <>
            <p className="text dim">
              You are not given a solution. You are given a bundle of irreversible decisions.
            </p>

            <div className="diagram-stack">
              <div className="stack-item ok">
                <strong>Primary Structural Cut</strong><br />
                {cuts.primary.split("\n").slice(0, 2).join(" ")}
              </div>
              <div className="stack-item ok">
                <strong>Secondary Stress Cut</strong><br />
                {cuts.secondary.split("\n").slice(0, 2).join(" ")}
              </div>
              <div className="stack-item ok">
                <strong>Shadow Cut</strong><br />
                {cuts.shadow.split("\n").slice(0, 2).join(" ")}
              </div>
            </div>
          </>
        )}
      </section>

      {/* ⑥ Artifact Library */}
      <section className="glass-block">
        <h2>Artifact Library｜Take only what you selected</h2>

        <p className="text dim">
          Downloads happen locally in your browser. ArcheNova stores nothing.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <button
            type="button"
            className="inline-link"
            onClick={() => downloadText("constraint-field-summary.txt", selected.map((c) => `- ${c.value}`).join("\n") || "No constraints selected.")}
          >
            Constraint Field Summary
          </button>

          <button
            type="button"
            className="inline-link"
            onClick={() => downloadText("point-of-no-return.txt", `You are leaving with constraints, not conclusions.\n\nSelected:\n${selected.map((c) => `- ${c.value}`).join("\n")}`)}
          >
            Point-of-No-Return Statement
          </button>

          <button
            type="button"
            className="inline-link"
            onClick={() => downloadText("structural-cut-bundle.txt", [cuts.primary, "\n\n---\n\n", cuts.secondary, "\n\n---\n\n", cuts.shadow].join(""))}
            disabled={!canEnterDeep}
            style={{ opacity: canEnterDeep ? 1 : 0.6, cursor: canEnterDeep ? "pointer" : "not-allowed" }}
          >
            Structural Cut Bundle
          </button>
        </div>

        <p className="text dim" style={{ marginTop: 10 }}>
          You are leaving with constraints, not conclusions.
        </p>
      </section>

      {/* ⑦ Exit */}
      <section className="glass-block">
        <h2>Exit｜Reconnect to structure</h2>

        <p className="text">
          {canEnterDeep
            ? "You removed futures. Return to the nearest structural layer before you add anything."
            : "Selection has not begun. Return only when you are ready to remove exits."}
        </p>

        <ul className="bullets">
          <li>
            <a className="back-link" href="/plaza">
              Boundary Plaza
            </a>{" "}
            <span style={{ color: "rgba(245,245,245,0.60)" }}>
              — the conceptual counterpart of your constraints
            </span>
          </li>
          <li>
            <a className="back-link" href="/workshop">
              The Workshop Floor
            </a>{" "}
            <span style={{ color: "rgba(245,245,245,0.60)" }}>
              — the closest implementation slices
            </span>
          </li>
          <li>
            <a className="back-link" href="/capital-responsibility">
              Capital & Responsibility
            </a>{" "}
            <span style={{ color: "rgba(245,245,245,0.60)" }}>
              — where responsibility collisions harden
            </span>
          </li>
        </ul>
      </section>
    </main>
  );
}