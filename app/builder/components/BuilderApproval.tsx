"use client";

type BuilderApprovalProps = {
  approvalRequired: boolean;
  deployReady: boolean;
};

export default function BuilderApproval({
  approvalRequired,
  deployReady,
}: BuilderApprovalProps) {
  return (
    <section className="glass-block">
      <span className="home-section-label">
        APPROVAL
      </span>

      <h2>Review Before Apply</h2>

      <div className="an-grid-3">
        <div className="an-card">
          <strong>
            Approval
          </strong>

          <p>
            {approvalRequired
              ? "Required"
              : "Not Required"}
          </p>
        </div>

        <div className="an-card">
          <strong>
            Deploy Ready
          </strong>

          <p>
            {deployReady
              ? "Ready"
              : "Pending"}
          </p>
        </div>

        <div className="an-card">
          <strong>
            Builder
          </strong>

          <p>
            Waiting for human confirmation.
          </p>
        </div>
      </div>

      <div className="builder-actions">
        <button
          className="back-link"
          disabled
        >
          Apply Changes
          <br />
          (Coming Soon)
        </button>

        <button
          className="back-link"
        >
          Continue Editing
        </button>
      </div>
    </section>
  );
}