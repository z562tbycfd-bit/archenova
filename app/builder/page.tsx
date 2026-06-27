"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import BuilderConversation from "./components/BuilderConversation";
import BuilderPlanner from "./components/BuilderPlanner";
import BuilderFileExplorer from "./components/BuilderFileExplorer";
import BuilderEditor from "./components/BuilderEditor";
import BuilderPreview from "./components/BuilderPreview";
import BuilderTerminal from "./components/BuilderTerminal";
import BuilderDeploy from "./components/BuilderDeploy";
import BuilderHistory from "./components/BuilderHistory";
import BuilderThinking from "./components/BuilderThinking";
import BuilderDiffViewer from "./components/BuilderDiffViewer";
import BuilderApproval from "./components/BuilderApproval";

import type { BuilderTab } from "./components/BuilderFileExplorer";
import type { BuilderPreviewMode } from "./components/BuilderPreview";
import type { BuilderDiffPlan } from "@/lib/builderDiff";

type BuilderMessage = {
  role: string;
  text: string;
};

type ThinkingStep = {
  label: string;
  status: "pending" | "active" | "done";
};

const PROGRAMS = [
  "Adaptive Civilization Intelligence",
  "Civilization Programs Engine",
  "Crossings Global Forum",
  "Builder Operating Layer",
];

const thinkingLabels = [
  "Analyzing request",
  "Reading Program Context",
  "Creating implementation plan",
  "Generating files",
  "Preparing live preview",
];

function clean(input: string) {
  return input.trim() || "Create a premium civilization interface";
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function makePlan(prompt: string, program: string) {
  const goal = clean(prompt);

  return [
    `Understand the build intent: ${goal}`,
    `Connect the implementation to ${program}.`,
    "Generate a structured interface.",
    "Separate HTML, CSS, and JavaScript.",
    "Prepare live preview for Desktop, Tablet, and Mobile.",
    "Generate a safe file-level diff proposal.",
    "Wait for human review before applying changes.",
  ];
}

function makeHtml(prompt: string, program: string) {
  const title = escapeHtml(clean(prompt));
  const context = escapeHtml(program);

  return `<main class="runtime">
  <section class="hero">
    <div class="label">ARCHENOVA BUILDER</div>
    <h1>${title}</h1>
    <p>
      Generated inside the Builder workspace with program context:
      <strong>${context}</strong>.
    </p>
  </section>

  <section class="grid">
    <article class="card">
      <span>01</span>
      <h2>Intent</h2>
      <p>Convert a human request into a clear interface direction.</p>
    </article>

    <article class="card">
      <span>02</span>
      <h2>Plan</h2>
      <p>Transform the direction into files, components, and previewable output.</p>
    </article>

    <article class="card">
      <span>03</span>
      <h2>Preview</h2>
      <p>Inspect the result before copying, refining, or deploying.</p>
    </article>
  </section>
</main>`;
}
function makeCss() {
  return `body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 0%, rgba(120, 200, 255, 0.24), transparent 34%),
    radial-gradient(circle at 80% 20%, rgba(210, 160, 255, 0.18), transparent 34%),
    #05070d;
  color: white;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  display: grid;
  place-items: center;
  padding: 28px;
}

.runtime {
  width: min(100%, 980px);
}

.hero {
  padding: 44px;
  border-radius: 32px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 0 90px rgba(120,180,255,0.14);
}

.label {
  font-size: 12px;
  letter-spacing: .18em;
  opacity: .72;
  margin-bottom: 18px;
}

h1 {
  margin: 0 0 18px;
  font-size: clamp(38px, 8vw, 86px);
  line-height: .92;
  letter-spacing: -0.06em;
  background: linear-gradient(90deg, #fff, #8bd0ff, #d0a8ff, #ffe4a3);
  -webkit-background-clip: text;
  color: transparent;
}

p {
  line-height: 1.8;
  opacity: .8;
  max-width: 760px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.card {
  padding: 24px;
  border-radius: 24px;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(255,255,255,0.1);
}

.card span {
  font-size: 12px;
  opacity: .6;
}

.card h2 {
  margin: 14px 0 8px;
}

@media (max-width: 720px) {
  body {
    padding: 18px;
  }

  .hero {
    padding: 28px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}`;
}

function makeJs() {
  return `const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-4px)";
    card.style.transition = "transform 240ms ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});`;
}

function createPreview(html: string, css: string, js: string) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`;
}

export default function ArcheNovaBuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [program, setProgram] = useState(PROGRAMS[0]);

  const [html, setHtml] = useState(makeHtml("", PROGRAMS[0]));
  const [css, setCss] = useState(makeCss());
  const [js, setJs] = useState(makeJs());

  const [tab, setTab] = useState<BuilderTab>("html");
  const [previewMode, setPreviewMode] =
    useState<BuilderPreviewMode>("desktop");

  const [messages, setMessages] = useState<BuilderMessage[]>([
    {
      role: "Builder",
      text: "What would you like to build?",
    },
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const [diffPlan, setDiffPlan] = useState<BuilderDiffPlan | null>(null);

  const [isBuilding, setIsBuilding] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(0);

  const preview = useMemo(() => createPreview(html, css, js), [html, css, js]);
  const plan = useMemo(() => makePlan(prompt, program), [prompt, program]);

  const currentValue = tab === "html" ? html : tab === "css" ? css : js;

  const thinkingSteps: ThinkingStep[] = thinkingLabels.map((label, index) => ({
    label,
    status:
      index < thinkingPhase
        ? "done"
        : index === thinkingPhase && isBuilding
        ? "active"
        : "pending",
  }));

  function setCurrentValue(value: string) {
    if (tab === "html") setHtml(value);
    if (tab === "css") setCss(value);
    if (tab === "js") setJs(value);
  }
  async function generate() {
    setIsBuilding(true);
    setThinkingPhase(0);
    setCopied("");

    for (let index = 0; index < thinkingLabels.length; index += 1) {
      setThinkingPhase(index);
      await new Promise((resolve) => setTimeout(resolve, 260));
    }

    const nextHtml = makeHtml(prompt, program);
    const nextCss = makeCss();
    const nextJs = makeJs();

    setHtml(nextHtml);
    setCss(nextCss);
    setJs(nextJs);

    try {
      const response = await fetch("/api/builder-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: clean(prompt),
          program,
          context: "ArcheNova Builder public workspace",
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.diffPlan) {
          setDiffPlan(result.diffPlan);
        }

        setMessages((previous) => [
          ...previous,
          {
            role: "You",
            text: clean(prompt),
          },
          {
            role: "Builder",
            text:
              result.conversation ??
              `I generated a workspace connected to ${program}.`,
          },
        ]);
      } else {
        setMessages((previous) => [
          ...previous,
          {
            role: "You",
            text: clean(prompt),
          },
          {
            role: "Builder",
            text:
              "I generated a local preview, but the Builder Agent API did not respond successfully.",
          },
        ]);
      }
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "You",
          text: clean(prompt),
        },
        {
          role: "Builder",
          text:
            "I generated a local preview. Builder Agent API connection is currently unavailable.",
        },
      ]);
    }

    setHistory((previous) =>
      [`${new Date().toLocaleTimeString()} · ${clean(prompt)}`, ...previous]
        .slice(0, 8)
    );

    setThinkingPhase(thinkingLabels.length);
    setIsBuilding(false);
  }

  function reset() {
    setPrompt("");
    setProgram(PROGRAMS[0]);
    setHtml(makeHtml("", PROGRAMS[0]));
    setCss(makeCss());
    setJs(makeJs());
    setTab("html");
    setPreviewMode("desktop");
    setCopied("");
    setDiffPlan(null);
    setIsBuilding(false);
    setThinkingPhase(0);
    setMessages([
      {
        role: "Builder",
        text: "What would you like to build?",
      },
    ]);
    setHistory([]);
  }

  async function copy(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
  }
  return (
    <main className="page-standard builder-cosmos-page">
      <div className="page-head">
        <span className="home-section-label">ARCHENOVA BUILDER</span>

        <h1>Builder Agent</h1>

        <p className="page-lead">
          A public CodeX-style workspace with conversation, planning, files,
          editor, live preview, diff review, approval, terminal guidance,
          deployment checklist, and build history.
        </p>
      </div>

      <section className="glass-block builder-agent-shell">
        <BuilderConversation
          prompt={prompt}
          setPrompt={setPrompt}
          messages={messages}
          onSend={generate}
          onReset={reset}
        />

        <div className="builder-panel">
          <span className="home-section-label">PROGRAM CONTEXT</span>

          <h2>Execution context</h2>

          <div className="builder-program-list">
            {PROGRAMS.map((item) => (
              <button
                key={item}
                type="button"
                className={`builder-program ${program === item ? "active" : ""}`}
                onClick={() => setProgram(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="feed-row wide">
            <div className="feed-source">Builder Agent</div>
            <div className="feed-title">Implementation Guidance</div>
            <div className="feed-summary">
              Use Builder to create public interface code without exposing
              ArcheNova source code or private infrastructure.
            </div>
          </div>
        </div>
      </section>

      <section className="glass-block builder-agent-shell">
        <BuilderPlanner plan={plan} />

        <BuilderFileExplorer activeTab={tab} setTab={setTab} />
      </section>
      <section className="glass-block builder-workspace">
        <BuilderEditor
          tab={tab}
          value={currentValue}
          setValue={setCurrentValue}
          copied={copied}
          onCopyCurrent={() => copy(currentValue, tab.toUpperCase())}
          onCopyAll={() => copy(preview, "ALL")}
        />

        <BuilderPreview
          preview={preview}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
        />
      </section>

      <BuilderThinking
        steps={thinkingSteps}
      />

      <BuilderDiffViewer
        diffPlan={diffPlan}
      />

      <BuilderApproval
        approvalRequired={
          diffPlan?.approvalRequired ?? false
        }
        deployReady={false}
      />

      <section className="glass-block builder-agent-shell">
        <BuilderTerminal />

        <BuilderDeploy />
      </section>

      <BuilderHistory
        history={history}
      />

      <section className="glass-block">
        <h2>Builder Principle</h2>

        <p>
          Builder provides a public creation workspace.
          It never exposes ArcheNova source code,
          private repositories,
          deployment tokens,
          API keys,
          environment variables,
          or internal infrastructure.
        </p>

        <div className="an-grid-3">
          <div className="an-card">
            <strong>Conversation</strong>

            <p>
              Transform natural language into an executable
              implementation strategy.
            </p>
          </div>

          <div className="an-card">
            <strong>Planning</strong>

            <p>
              Produce implementation plans,
              file structures,
              and safe review workflows.
            </p>
          </div>

          <div className="an-card">
            <strong>Execution</strong>

            <p>
              Preview, review, approve,
              then eventually deploy.
            </p>
          </div>
        </div>
      </section>

      <div className="page-foot">
        <Link
          href="/home"
          className="back-link"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}