"use client";

export type BuilderTab = "html" | "css" | "js";

type BuilderFileExplorerProps = {
  activeTab: BuilderTab;
  setTab: (tab: BuilderTab) => void;
};

const files: {
  name: string;
  tab: BuilderTab;
  type: string;
}[] = [
  {
    name: "index.html",
    tab: "html",
    type: "HTML",
  },
  {
    name: "styles.css",
    tab: "css",
    type: "CSS",
  },
  {
    name: "script.js",
    tab: "js",
    type: "JS",
  },
];

export default function BuilderFileExplorer({
  activeTab,
  setTab,
}: BuilderFileExplorerProps) {
  return (
    <div className="builder-panel">
      <span className="home-section-label">FILES</span>

      <h2>Generated files</h2>

      <div className="builder-file-tree">
        {files.map((file) => (
          <button
            key={file.name}
            type="button"
            onClick={() => setTab(file.tab)}
            className={`builder-file ${activeTab === file.tab ? "active" : ""}`}
          >
            <span>{file.name}</span>
            <small>{file.type}</small>
          </button>
        ))}
      </div>
    </div>
  );
}