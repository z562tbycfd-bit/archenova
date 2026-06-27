import {
  createBuilderDiffPlan,
  summarizeBuilderDiff,
  type BuilderDiffPlan,
} from "@/lib/builderDiff";

export type BuilderFile = {
  path: string;
  language: "tsx" | "ts" | "css" | "json" | "md";
  action: "create" | "update" | "delete";
  summary: string;
};

export type BuilderPlan = {
  title: string;
  description: string;
  steps: string[];
};

export type BuilderTerminalCommand = {
  label: string;
  command: string;
};

export type BuilderDiffSummary = ReturnType<typeof summarizeBuilderDiff>;

export type BuilderAgentResponse = {
  conversation: string;
  plan: BuilderPlan;
  files: BuilderFile[];
  terminal: BuilderTerminalCommand[];
  diffPlan: BuilderDiffPlan;
  diffSummary: BuilderDiffSummary;
  nextAction: string;
  deployReady: boolean;
};

export type BuilderAgentRequest = {
  prompt: string;
  program?: string;
  context?: string;
};

function cleanPrompt(input: string) {
  return input.trim() || "Create a new ArcheNova interface";
}

export function runBuilderAgent(
  request: BuilderAgentRequest
): BuilderAgentResponse {
  const title = cleanPrompt(request.prompt);
  const program = request.program?.trim() || "General Builder Workspace";
  const context = request.context?.trim() || "Public Builder request";

  const diffPlan = createBuilderDiffPlan(title);
  const diffSummary = summarizeBuilderDiff(diffPlan);

  return {
    conversation:
      `Builder analyzed "${title}" in the context of ${program}. ` +
      "A safe implementation plan and file-level diff proposal were generated.",

    plan: {
      title,
      description:
        `Transform the request into a structured implementation plan. Context: ${context}.`,
      steps: [
        "Understand the build request",
        "Identify the intended interface or system",
        "Create an implementation plan",
        "Generate a file-level diff proposal",
        "Prepare preview-ready code",
        "Provide terminal and deployment guidance",
        "Wait for human review before applying changes",
      ],
    },

    files: diffPlan.files.map((file) => ({
      path: file.path,
      language:
        file.language === "html" || file.language === "js"
          ? "ts"
          : file.language,
      action: file.action,
      summary: file.summary,
    })),

    terminal: [
      {
        label: "Run locally",
        command: "npm run dev",
      },
      {
        label: "Production build",
        command: "npm run build",
      },
      {
        label: "Commit changes",
        command: 'git add . && git commit -m "Apply Builder changes"',
      },
      {
        label: "Deploy",
        command: "git pull --rebase origin main && git push origin main",
      },
    ],

    diffPlan,

    diffSummary,

    nextAction:
      diffPlan.approvalRequired
        ? "Review the proposed files and approve before applying changes."
        : "Review the generated output and continue refinement.",

    deployReady: false,
  };
}