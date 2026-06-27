"use client";

export type BuilderPreviewMode = "desktop" | "tablet" | "mobile";

type BuilderPreviewProps = {
  preview: string;
  previewMode: BuilderPreviewMode;
  setPreviewMode: (mode: BuilderPreviewMode) => void;
};

export default function BuilderPreview({
  preview,
  previewMode,
  setPreviewMode,
}: BuilderPreviewProps) {
  const previewClass =
    previewMode === "desktop"
      ? "builder-preview-desktop"
      : previewMode === "tablet"
      ? "builder-preview-tablet"
      : "builder-preview-mobile";

  return (
    <div className="builder-preview">
      <div className="builder-preview-head">
        <div className="home-card-meta">Live Preview</div>

        <div className="builder-tabs compact">
          {(["desktop", "tablet", "mobile"] as BuilderPreviewMode[]).map(
            (mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPreviewMode(mode)}
                className={`builder-tab ${
                  previewMode === mode ? "active" : ""
                }`}
              >
                {mode}
              </button>
            )
          )}
        </div>
      </div>

      <div className={`builder-preview-frame ${previewClass}`}>
        <iframe
          title="ArcheNova Builder Live Preview"
          srcDoc={preview}
          sandbox="allow-scripts"
          className="builder-iframe"
        />
      </div>
    </div>
  );
}