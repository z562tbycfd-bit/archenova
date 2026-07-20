/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/constants.ts

   Responsibilities:
   - Six cognitive Organ definitions
   - Organ processing order
   - Runtime default values
   - Store / Engine / Scheduler defaults
   - Packet defaults
   - Status and event labels

   Dependency rule:
   constants.ts may import only shared types.
========================================================== */

import type {
  EpistemeEngineConfig,
  EpistemeRuntimeStatus,
  EpistemeSchedulerConfig,
  EpistemeSchedulerMode,
  EpistemeSchedulerStatus,
  EpistemeStoreConfig,
  KnowledgePacketInput,
  KnowledgePacketPriority,
  KnowledgePacketStatus,
  KnowledgePacketType,
  OrganDefinition,
  OrganId,
  OrganIntelligenceStatus,
  OrganMetrics,
  OrganRuntimeStatus,
  RuntimeCycleStatus,
  RuntimeEventSeverity,
  RuntimeEventType,
  RuntimeMetrics,
} from "./types";

/* ==========================================================
   Runtime Version
========================================================== */

export const EPISTEME_RUNTIME_VERSION =
  "1.0.0";

/* ==========================================================
   Cognitive Organ Order
========================================================== */

export const EPISTEME_ORGAN_ORDER =
  [
    "observation",
    "understanding",
    "reasoning",
    "design",
    "realization",
    "memory",
  ] as const satisfies readonly OrganId[];

/* ==========================================================
   Organ Count
========================================================== */

export const EPISTEME_ORGAN_COUNT =
  EPISTEME_ORGAN_ORDER.length;

/* ==========================================================
   Initial Organ
========================================================== */

export const EPISTEME_INITIAL_ORGAN:
  OrganId = "observation";

/* ==========================================================
   Organ Definitions
========================================================== */

export const EPISTEME_ORGANS:
  Readonly<Record<OrganId, OrganDefinition>> = {
  observation: {
    id: "observation",

    index: 0,

    numeral: "Ⅰ",

    title: "Observation",

    subtitle: "Reality Acquisition",

    description:
      "Acquires signals from reality, identifies change, and distinguishes meaningful evidence from noise.",

    purpose:
      "To establish the most accurate possible contact with current reality before interpretation begins.",

    operationLabel: "Receiving",

    receivesFrom: "memory",

    outputsTo: "understanding",
  },

  understanding: {
    id: "understanding",

    index: 1,

    numeral: "Ⅱ",

    title: "Understanding",

    subtitle: "Meaning Integration",

    description:
      "Organizes evidence into context, relationships, patterns, mechanisms, and coherent models.",

    purpose:
      "To transform isolated observations into structured and transferable knowledge.",

    operationLabel: "Integrating",

    receivesFrom: "observation",

    outputsTo: "reasoning",
  },

  reasoning: {
    id: "reasoning",

    index: 2,

    numeral: "Ⅲ",

    title: "Reasoning",

    subtitle: "Judgment Formation",

    description:
      "Evaluates causality, uncertainty, trade-offs, risk, constraints, and possible future consequences.",

    purpose:
      "To determine what the available knowledge implies and which judgments are justified.",

    operationLabel: "Evaluating",

    receivesFrom: "understanding",

    outputsTo: "design",
  },

  design: {
    id: "design",

    index: 3,

    numeral: "Ⅳ",

    title: "Design",

    subtitle: "Architecture Formation",

    description:
      "Converts judgment into systems, institutions, policies, technologies, and civilizational architectures.",

    purpose:
      "To translate understanding and reasoning into coherent structures capable of guiding action.",

    operationLabel: "Architecting",

    receivesFrom: "reasoning",

    outputsTo: "realization",
  },

  realization: {
    id: "realization",

    index: 4,

    numeral: "Ⅴ",

    title: "Realization",

    subtitle: "Capability Execution",

    description:
      "Transforms architecture into operational capability through implementation, coordination, and feedback.",

    purpose:
      "To convert designed possibility into measurable and durable reality.",

    operationLabel: "Executing",

    receivesFrom: "design",

    outputsTo: "memory",
  },

  memory: {
    id: "memory",

    index: 5,

    numeral: "Ⅵ",

    title: "Memory",

    subtitle: "Civilizational Continuity",

    description:
      "Preserves evidence, models, decisions, outcomes, failures, and lessons for future cycles.",

    purpose:
      "To maintain continuity across time and allow civilization to learn recursively from experience.",

    operationLabel: "Encoding",

    receivesFrom: "realization",

    outputsTo: "observation",
  },
};

/* ==========================================================
   Ordered Organ Definitions
========================================================== */

export const EPISTEME_ORGAN_DEFINITIONS:
  readonly OrganDefinition[] =
  EPISTEME_ORGAN_ORDER.map(
    (organId) =>
      EPISTEME_ORGANS[organId],
  );

/* ==========================================================
   Organ Index Map
========================================================== */

export const EPISTEME_ORGAN_INDEX:
  Readonly<Record<OrganId, number>> = {
  observation: 0,
  understanding: 1,
  reasoning: 2,
  design: 3,
  realization: 4,
  memory: 5,
};

/* ==========================================================
   Organ Numeral Map
========================================================== */

export const EPISTEME_ORGAN_NUMERAL:
  Readonly<Record<OrganId, string>> = {
  observation: "Ⅰ",
  understanding: "Ⅱ",
  reasoning: "Ⅲ",
  design: "Ⅳ",
  realization: "Ⅴ",
  memory: "Ⅵ",
};

/* ==========================================================
   Organ Runtime Status by Organ
========================================================== */

export const EPISTEME_ACTIVE_RUNTIME_STATUS:
  Readonly<Record<OrganId, OrganRuntimeStatus>> = {
  observation: "receiving",
  understanding: "processing",
  reasoning: "reasoning",
  design: "designing",
  realization: "executing",
  memory: "encoding",
};

/* ==========================================================
   Default Organ Metrics
========================================================== */

export const DEFAULT_ORGAN_METRICS:
  Readonly<OrganMetrics> = {
  confidence: 0,

  activity: 0,

  complexity: 0,

  health: 100,

  synchronization: 100,

  receivedPackets: 0,

  emittedPackets: 0,

  processedPackets: 0,
};

/* ==========================================================
   Default Runtime Metrics
========================================================== */

export const DEFAULT_RUNTIME_METRICS:
  Readonly<RuntimeMetrics> = {
  health: 100,

  synchronization: 100,

  activity: 0,

  cognitiveLoad: 0,

  queueLoad: 0,

  averageConfidence: 0,

  totalCycles: 0,

  completedCycles: 0,

  totalPacketsCreated: 0,

  totalPacketsProcessed: 0,

  totalPacketsArchived: 0,

  totalErrors: 0,

  uptimeMs: 0,
};

/* ==========================================================
   Store Configuration
========================================================== */

export const DEFAULT_EPISTEME_STORE_CONFIG:
  Readonly<EpistemeStoreConfig> = {
  maxQueueSize: 250,

  maxArchiveSize: 500,

  maxEventHistory: 200,

  maxErrorHistory: 100,

  initialConfidence: 45,

  preserveArchiveOnReset: true,

  enableDebugLogging: false,
};

/* ==========================================================
   Engine Configuration
========================================================== */

export const DEFAULT_EPISTEME_ENGINE_CONFIG:
  Readonly<EpistemeEngineConfig> = {
  confidenceGrowth: 7,

  relevanceGrowth: 3,

  importanceGrowth: 2,

  archiveCompletedPackets: true,
};

/* ==========================================================
   Scheduler Configuration
========================================================== */

export const DEFAULT_EPISTEME_SCHEDULER_CONFIG:
  Readonly<EpistemeSchedulerConfig> = {
  mode: "automatic",

  autoStart: false,

  initialDelayMs: 800,

  organIntervalMs: 2_200,

  cycleIntervalMs: 1_400,

  synchronizationMs: 1_600,

  generatePacketsWhenIdle: false,

  pauseWhenHidden: true,

  resumeWhenVisible: true,
};

/* ==========================================================
   Packet Defaults
========================================================== */

export const DEFAULT_PACKET_TYPE:
  KnowledgePacketType = "signal";

export const DEFAULT_PACKET_PRIORITY:
  KnowledgePacketPriority = "normal";

export const DEFAULT_PACKET_STATUS:
  KnowledgePacketStatus = "created";

export const DEFAULT_PACKET_CONFIDENCE = 45;

export const DEFAULT_PACKET_IMPORTANCE = 50;

export const DEFAULT_PACKET_RELEVANCE = 50;

/* ==========================================================
   Packet Limits
========================================================== */

export const PACKET_VALUE_MIN = 0;

export const PACKET_VALUE_MAX = 100;

/* ==========================================================
   Queue Thresholds
========================================================== */

export const QUEUE_LOAD_WARNING_THRESHOLD = 70;

export const QUEUE_LOAD_CRITICAL_THRESHOLD = 90;

/* ==========================================================
   Runtime Thresholds
========================================================== */

export const RUNTIME_HEALTHY_THRESHOLD = 70;

export const RUNTIME_SYNCHRONIZED_THRESHOLD = 80;

export const RUNTIME_DEGRADED_THRESHOLD = 50;

/* ==========================================================
   Event Defaults
========================================================== */

export const DEFAULT_EVENT_SEVERITY:
  RuntimeEventSeverity = "info";

/* ==========================================================
   Runtime Status Labels
========================================================== */

export const EPISTEME_RUNTIME_STATUS_LABELS:
  Readonly<
    Record<
      EpistemeRuntimeStatus,
      string
    >
  > = {
  offline: "Offline",

  initializing: "Initializing",

  ready: "Ready",

  operating: "Operating",

  waiting: "Awaiting Signal",

  paused: "Paused",

  synchronizing: "Synchronizing",

  completed: "Cycle Complete",

  degraded: "Degraded",

  error: "System Error",

  destroyed: "Destroyed",
};

/* ==========================================================
   Scheduler Status Labels
========================================================== */

export const EPISTEME_SCHEDULER_STATUS_LABELS:
  Readonly<
    Record<
      EpistemeSchedulerStatus,
      string
    >
  > = {
  offline: "Offline",

  starting: "Starting",

  running: "Running",

  waiting: "Waiting",

  paused: "Paused",

  stopping: "Stopping",

  completed: "Completed",

  error: "Error",

  destroyed: "Destroyed",
};

/* ==========================================================
   Scheduler Mode Labels
========================================================== */

export const EPISTEME_SCHEDULER_MODE_LABELS:
  Readonly<
    Record<
      EpistemeSchedulerMode,
      string
    >
  > = {
  automatic: "Automatic",

  manual: "Manual",

  "single-cycle": "Single Cycle",
};

/* ==========================================================
   Cycle Status Labels
========================================================== */

export const EPISTEME_CYCLE_STATUS_LABELS:
  Readonly<
    Record<
      RuntimeCycleStatus,
      string
    >
  > = {
  idle: "Idle",

  running: "Running",

  synchronizing: "Synchronizing",

  completed: "Completed",

  paused: "Paused",

  failed: "Failed",
};

/* ==========================================================
   Packet Type Labels
========================================================== */

export const EPISTEME_PACKET_TYPE_LABELS:
  Readonly<
    Record<
      KnowledgePacketType,
      string
    >
  > = {
  signal: "Signal",

  knowledge: "Knowledge",

  reasoning: "Reasoning",

  design: "Design",

  execution: "Execution",

  memory: "Memory",
};

/* ==========================================================
   Packet Priority Labels
========================================================== */

export const EPISTEME_PACKET_PRIORITY_LABELS:
  Readonly<
    Record<
      KnowledgePacketPriority,
      string
    >
  > = {
  low: "Low",

  normal: "Normal",

  high: "High",

  critical: "Critical",
};

/* ==========================================================
   Packet Status Labels
========================================================== */

export const EPISTEME_PACKET_STATUS_LABELS:
  Readonly<
    Record<
      KnowledgePacketStatus,
      string
    >
  > = {
  created: "Created",

  queued: "Queued",

  processing: "Processing",

  completed: "Completed",

  archived: "Archived",

  failed: "Failed",
};

/* ==========================================================
   Organ Runtime Status Labels
========================================================== */

export const EPISTEME_ORGAN_RUNTIME_STATUS_LABELS:
  Readonly<
    Record<
      OrganRuntimeStatus,
      string
    >
  > = {
  idle: "Idle",

  receiving: "Receiving",

  processing: "Processing",

  reasoning: "Reasoning",

  designing: "Designing",

  executing: "Executing",

  encoding: "Encoding",

  completed: "Completed",

  error: "Error",
};

/* ==========================================================
   Organ Intelligence Status Labels
========================================================== */

export const EPISTEME_ORGAN_INTELLIGENCE_STATUS_LABELS:
  Readonly<
    Record<
      OrganIntelligenceStatus,
      string
    >
  > = {
  inactive: "Inactive",

  active: "Active",

  updating: "Updating",

  learning: "Learning",

  synchronizing: "Synchronizing",

  degraded: "Degraded",
};

/* ==========================================================
   Runtime Event Labels
========================================================== */

export const EPISTEME_EVENT_LABELS:
  Readonly<
    Record<
      RuntimeEventType,
      string
    >
  > = {
  runtime_initialized:
    "Runtime Initialized",

  runtime_started:
    "Runtime Started",

  runtime_paused:
    "Runtime Paused",

  runtime_resumed:
    "Runtime Resumed",

  runtime_stopped:
    "Runtime Stopped",

  runtime_reset:
    "Runtime Reset",

  cycle_started:
    "Cycle Started",

  cycle_completed:
    "Cycle Completed",

  synchronization_started:
    "Synchronization Started",

  synchronization_completed:
    "Synchronization Completed",

  organ_activated:
    "Organ Activated",

  organ_completed:
    "Organ Completed",

  packet_created:
    "Packet Created",

  packet_queued:
    "Packet Queued",

  packet_processing:
    "Packet Processing",

  packet_routed:
    "Packet Routed",

  packet_completed:
    "Packet Completed",

  packet_archived:
    "Packet Archived",

  packet_failed:
    "Packet Failed",

  error:
    "Runtime Error",
};

/* ==========================================================
   Event Severity Labels
========================================================== */

export const EPISTEME_EVENT_SEVERITY_LABELS:
  Readonly<
    Record<
      RuntimeEventSeverity,
      string
    >
  > = {
  info: "Information",

  notice: "Notice",

  warning: "Warning",

  critical: "Critical",
};

/* ==========================================================
   Initial Packet
========================================================== */

export const DEFAULT_INITIAL_PACKET_INPUT:
  KnowledgePacketInput = {
  title:
    "Civilization Intelligence initialization",

  summary:
    "Episteme has begun observing the present state of civilization.",

  content: [
    "This Knowledge Packet initiates the six-organ Civilization Intelligence cycle.",

    "Observation acquires the signal.",

    "Understanding integrates meaning.",

    "Reasoning evaluates consequences.",

    "Design forms an architecture.",

    "Realization converts architecture into capability.",

    "Memory preserves the completed cycle.",
  ].join("\n\n"),

  type: "signal",

  priority: "normal",

  tags: [
    "archenova",
    "episteme",
    "civilization-intelligence",
    "initialization",
  ],

  confidence: 64,

  importance: 86,

  relevance: 94,

  from: "memory",

  to: "observation",

  source: {
    name: "ArcheNova",

    provider:
      "Episteme Runtime Layer",
  },
};

/* ==========================================================
   Generated Idle Packet Templates
========================================================== */

export const DEFAULT_IDLE_PACKET_TITLES =
  [
    "Emerging scientific and technological signals",

    "Civilizational infrastructure transition",

    "Institutional adaptation under uncertainty",

    "Long-term knowledge preservation",

    "Humanity's expanding operational capability",

    "Planetary and interplanetary resilience",
  ] as const;

/* ==========================================================
   Default Runtime Error Codes
========================================================== */

export const EPISTEME_ERROR_CODES = {
  STORE_DESTROYED:
    "EPISTEME_STORE_DESTROYED",

  QUEUE_LIMIT_REACHED:
    "EPISTEME_QUEUE_LIMIT_REACHED",

  PACKET_NOT_FOUND:
    "EPISTEME_PACKET_NOT_FOUND",

  NO_ACTIVE_PACKET:
    "EPISTEME_NO_ACTIVE_PACKET",

  INVALID_ORGAN:
    "EPISTEME_INVALID_ORGAN",

  ENGINE_FAILURE:
    "EPISTEME_ENGINE_FAILURE",

  SCHEDULER_FAILURE:
    "EPISTEME_SCHEDULER_FAILURE",

  PROCESSOR_NOT_FOUND:
    "EPISTEME_PROCESSOR_NOT_FOUND",

  INVALID_RUNTIME_STATE:
    "EPISTEME_INVALID_RUNTIME_STATE",
} as const;

/* ==========================================================
   Browser Event Names
========================================================== */

export const EPISTEME_BROWSER_EVENTS = {
  STATE_CHANGE:
    "episteme:statechange",

  START:
    "episteme:start",

  PAUSE:
    "episteme:pause",

  RESUME:
    "episteme:resume",

  STOP:
    "episteme:stop",

  RESET:
    "episteme:reset",

  TICK:
    "episteme:tick",

  INGEST:
    "episteme:ingest",
} as const;

/* ==========================================================
   CSS Data Attribute Values
========================================================== */

export const EPISTEME_DATA_ATTRIBUTES = {
  STATUS:
    "data-episteme-status",

  ACTIVE_ORGAN:
    "data-active-organ",

  NEXT_ORGAN:
    "data-next-organ",

  PREVIOUS_ORGAN:
    "data-previous-organ",

  CYCLE_NUMBER:
    "data-cycle-number",

  CYCLE_PROGRESS:
    "data-cycle-progress",

  ACTIVE_PACKET:
    "data-active-packet",

  SYNCHRONIZING:
    "data-synchronizing",

  READY:
    "data-episteme-ready",
} as const;

/* ==========================================================
   CSS Variable Names
========================================================== */

export const EPISTEME_CSS_VARIABLES = {
  CYCLE_PROGRESS:
    "--episteme-cycle-progress",

  HEALTH:
    "--episteme-health",

  SYNCHRONIZATION:
    "--episteme-synchronization",

  ACTIVITY:
    "--episteme-activity",

  CONFIDENCE:
    "--episteme-confidence",

  ACTIVE_ORGAN_INDEX:
    "--episteme-active-index",

  QUEUE_LOAD:
    "--episteme-queue-load",
} as const;