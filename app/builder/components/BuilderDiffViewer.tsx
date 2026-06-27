"use client";

import type { BuilderDiffPlan } from "@/lib/builderDiff";

type BuilderDiffViewerProps = {
  diffPlan: BuilderDiffPlan | null;
};

export default function BuilderDiffViewer({
  diffPlan,
}: BuilderDiffViewerProps) {
  if (!diffPlan) {
    return (
      <section className="glass-block">
        <span className="home-section-label">DIFF</span>
        <h2>No diff proposal yet.</h2>
        <p>Send a Builder request to generate a file-level implementation plan.</p>
      </section>
    );
  }

  const created = diffPlan.files.filter((file) => file.action === "create").length;
  const updated = diffPlan.files.filter((file) => file.action === "update").length;
  const deleted = diffPlan.files.filter((file) => file.action === "delete").length;

  return (
    <section className="glass-block">
      <span className="home-section-label">BUILDER DIFF</span>

      <h2>Proposed file changes</h2>

      <div className="an-grid-4">
        <div className="an-card">
          <strong>{diffPlan.files.length}</strong>
          <p>Total files</p>
        </div>

        <div className="an-card">
          <strong>{created}</strong>
          <p>Create</p>
        </div>

        <div className="an-card">
          <strong>{updated}</strong>
          <p>Update</p>
        </div>

        <div className="an-card">
          <strong>{deleted}</strong>
          <p>Delete</p>
        </div>
      </div>

      <div className="feed-list" style={{ marginTop: "1rem" }}>
        {diffPlan.files.map((file) => (
          <div key={file.path} className="feed-row wide">
            <div className="feed-source">
              {file.action.toUpperCase()} · {file.language} · Risk {file.risk}
            </div>

            <div className="feed-title">{file.path}</div>

            <div className="feed-summary">{file.summary}</div>
          </div>
        ))}
      </div>

      <div className="builder-actions">
        <button type="button" className="back-link">
          Review Diff
        </button>

        <button type="button" className="back-link" disabled>
          Apply Coming Soon
        </button>
      </div>
    </section>
  );
}