"use client";

import type { BuilderTab } from "./BuilderFileExplorer";

type BuilderEditorProps = {
  tab: BuilderTab;
  value: string;
  setValue: (value: string) => void;
  copied: string;
  onCopyCurrent: () => void;
  onCopyAll: () => void;
};

export default function BuilderEditor({
  tab,
  value,
  setValue,
  copied,
  onCopyCurrent,
  onCopyAll,
}: BuilderEditorProps) {
  return (
    <div className="builder-editor">
      <div className="builder-tabs">
        {(["html", "css", "js"] as BuilderTab[]).map((item) => (
          <button
            key={item}
            type="button"
            className={`builder-tab ${tab === item ? "active" : ""}`}
            disabled
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck={false}
        className="builder-code"
      />

      <div className="builder-actions">
        <button type="button" onClick={onCopyCurrent} className="back-link">
          Copy {tab.toUpperCase()}
        </button>

        <button type="button" onClick={onCopyAll} className="back-link">
          Copy All
        </button>

        {copied && <span className="plaza-hint">Copied {copied}</span>}
      </div>
    </div>
  );
}