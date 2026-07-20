/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/types.ts

   Responsibilities:
   - Shared runtime types
   - Cognitive Organ definitions
   - Knowledge Packet types
   - Runtime Store state
   - Engine and Scheduler contracts
   - React-facing runtime interfaces

   Dependency rule:
   This file must not import from any other Episteme file.
========================================================== */

/* ==========================================================
   Cognitive Organs
========================================================== */

export type OrganId =
  | "observation"
  | "understanding"
  | "reasoning"
  | "design"
  | "realization"
  | "memory";

export type OrganNumeral =
  | "Ⅰ"
  | "Ⅱ"
  | "Ⅲ"
  | "Ⅳ"
  | "Ⅴ"
  | "Ⅵ";

export type OrganRuntimeStatus =
  | "idle"
  | "receiving"
  | "processing"
  | "reasoning"
  | "designing"
  | "executing"
  | "encoding"
  | "completed"
  | "error";

export type OrganIntelligenceStatus =
  | "inactive"
  | "active"
  | "updating"
  | "learning"
  | "synchronizing"
  | "degraded";

export interface OrganDefinition {
  id: OrganId;

  index: number;

  numeral: OrganNumeral;

  title: string;

  subtitle: string;

  description: string;

  purpose: string;

  operationLabel: string;

  receivesFrom: OrganId;

  outputsTo: OrganId;
}

/* ==========================================================
   Organ Metrics
========================================================== */

export interface OrganMetrics {
  confidence: number;

  activity: number;

  complexity: number;

  health: number;

  synchronization: number;

  receivedPackets: number;

  emittedPackets: number;

  processedPackets: number;
}

/* ==========================================================
   Runtime Organ
========================================================== */

export interface RuntimeOrgan {
  definition: OrganDefinition;

  runtimeStatus: OrganRuntimeStatus;

  intelligenceStatus: OrganIntelligenceStatus;

  metrics: OrganMetrics;

  isActive: boolean;

  isPrevious: boolean;

  isNext: boolean;

  isCompleted: boolean;

  progress: number;

  activatedAt: number | null;

  completedAt: number | null;

  updatedAt: number;
}

/* ==========================================================
   Knowledge Packet
========================================================== */

export type KnowledgePacketType =
  | "signal"
  | "knowledge"
  | "reasoning"
  | "design"
  | "execution"
  | "memory";

export type KnowledgePacketPriority =
  | "low"
  | "normal"
  | "high"
  | "critical";

export type KnowledgePacketStatus =
  | "created"
  | "queued"
  | "processing"
  | "completed"
  | "archived"
  | "failed";

export interface KnowledgePacketSource {
  name: string;

  provider?: string;

  url?: string;

  publishedAt?: number;

  retrievedAt?: number;
}

export interface KnowledgePacketMetadata {
  tags: string[];

  confidence: number;

  importance: number;

  relevance: number;

  createdAt: number;

  updatedAt: number;

  processedAt?: number;

  archivedAt?: number;
}

export interface KnowledgePacket {
  id: string;

  type: KnowledgePacketType;

  priority: KnowledgePacketPriority;

  status: KnowledgePacketStatus;

  from: OrganId;

  to: OrganId;

  title: string;

  summary: string;

  content: string;

  source?: KnowledgePacketSource;

  metadata: KnowledgePacketMetadata;
}

/* ==========================================================
   Packet Input
========================================================== */

export interface KnowledgePacketInput {
  title: string;

  summary?: string;

  content?: string;

  type?: KnowledgePacketType;

  priority?: KnowledgePacketPriority;

  source?: KnowledgePacketSource;

  tags?: string[];

  confidence?: number;

  importance?: number;

  relevance?: number;

  from?: OrganId;

  to?: OrganId;
}

/* ==========================================================
   Packet Collections
========================================================== */

export interface PacketQueueState {
  items: KnowledgePacket[];

  activePacketId: string | null;

  lastProcessedPacketId: string | null;
}

/* ==========================================================
   Civilization Cycle
========================================================== */

export type RuntimeCycleStatus =
  | "idle"
  | "running"
  | "synchronizing"
  | "completed"
  | "paused"
  | "failed";

export interface RuntimeCycle {
  id: string;

  number: number;

  status: RuntimeCycleStatus;

  activeOrgan: OrganId;

  previousOrgan: OrganId | null;

  nextOrgan: OrganId;

  completedOrgans: OrganId[];

  progress: number;

  startedAt: number | null;

  completedAt: number | null;

  updatedAt: number;

  elapsedMs: number;
}

/* ==========================================================
   Runtime Status
========================================================== */

export type EpistemeRuntimeStatus =
  | "offline"
  | "initializing"
  | "ready"
  | "operating"
  | "waiting"
  | "paused"
  | "synchronizing"
  | "completed"
  | "degraded"
  | "error"
  | "destroyed";

/* ==========================================================
   Runtime Metrics
========================================================== */

export interface RuntimeMetrics {
  health: number;

  synchronization: number;

  activity: number;

  cognitiveLoad: number;

  queueLoad: number;

  averageConfidence: number;

  totalCycles: number;

  completedCycles: number;

  totalPacketsCreated: number;

  totalPacketsProcessed: number;

  totalPacketsArchived: number;

  totalErrors: number;

  uptimeMs: number;
}

/* ==========================================================
   Runtime Events
========================================================== */

export type RuntimeEventType =
  | "runtime_initialized"
  | "runtime_started"
  | "runtime_paused"
  | "runtime_resumed"
  | "runtime_stopped"
  | "runtime_reset"
  | "cycle_started"
  | "cycle_completed"
  | "synchronization_started"
  | "synchronization_completed"
  | "organ_activated"
  | "organ_completed"
  | "packet_created"
  | "packet_queued"
  | "packet_processing"
  | "packet_routed"
  | "packet_completed"
  | "packet_archived"
  | "packet_failed"
  | "error";

export type RuntimeEventSeverity =
  | "info"
  | "notice"
  | "warning"
  | "critical";

export interface RuntimeEvent {
  id: string;

  type: RuntimeEventType;

  severity: RuntimeEventSeverity;

  message: string;

  timestamp: number;

  organId?: OrganId;

  packetId?: string;

  cycleId?: string;

  data?: Record<
    string,
    string | number | boolean | null
  >;
}

/* ==========================================================
   Runtime Error
========================================================== */

export interface RuntimeError {
  id: string;

  code: string;

  message: string;

  timestamp: number;

  recoverable: boolean;

  organId?: OrganId;

  packetId?: string;

  cycleId?: string;
}

/* ==========================================================
   Runtime State
========================================================== */

export interface EpistemeRuntimeState {
  version: string;

  status: EpistemeRuntimeStatus;

  ready: boolean;

  running: boolean;

  paused: boolean;

  synchronizing: boolean;

  organs: Record<OrganId, RuntimeOrgan>;

  cycle: RuntimeCycle;

  queue: PacketQueueState;

  archive: KnowledgePacket[];

  metrics: RuntimeMetrics;

  events: RuntimeEvent[];

  errors: RuntimeError[];

  createdAt: number;

  startedAt: number | null;

  stoppedAt: number | null;

  updatedAt: number;

  lastTickAt: number | null;

  lastSynchronizationAt: number | null;
}

/* ==========================================================
   Runtime Snapshot
========================================================== */

export interface EpistemeRuntimeSnapshot {
  state: EpistemeRuntimeState;

  revision: number;

  timestamp: number;
}

/* ==========================================================
   Runtime Store Configuration
========================================================== */

export interface EpistemeStoreConfig {
  maxQueueSize: number;

  maxArchiveSize: number;

  maxEventHistory: number;

  maxErrorHistory: number;

  initialConfidence: number;

  preserveArchiveOnReset: boolean;

  enableDebugLogging: boolean;
}

/* ==========================================================
   Runtime Store Actions
========================================================== */

export type EpistemeStoreAction =
  | {
      type: "SET_STATUS";
      status: EpistemeRuntimeStatus;
    }
  | {
      type: "SET_READY";
      ready: boolean;
    }
  | {
      type: "SET_RUNNING";
      running: boolean;
    }
  | {
      type: "SET_PAUSED";
      paused: boolean;
    }
  | {
      type: "SET_SYNCHRONIZING";
      synchronizing: boolean;
    }
  | {
      type: "SET_ACTIVE_ORGAN";
      organId: OrganId;
    }
  | {
      type: "UPDATE_ORGAN";
      organId: OrganId;
      patch: Partial<RuntimeOrgan>;
    }
  | {
      type: "START_CYCLE";
      timestamp?: number;
    }
  | {
      type: "COMPLETE_CYCLE";
      timestamp?: number;
    }
  | {
      type: "SET_CYCLE";
      cycle: RuntimeCycle;
    }
  | {
      type: "ENQUEUE_PACKET";
      packet: KnowledgePacket;
    }
  | {
      type: "UPDATE_PACKET";
      packetId: string;
      patch: Partial<KnowledgePacket>;
    }
  | {
      type: "SET_ACTIVE_PACKET";
      packetId: string | null;
    }
  | {
      type: "ARCHIVE_PACKET";
      packetId: string;
    }
  | {
      type: "ADD_EVENT";
      event: RuntimeEvent;
    }
  | {
      type: "ADD_ERROR";
      error: RuntimeError;
    }
  | {
      type: "UPDATE_METRICS";
      metrics: Partial<RuntimeMetrics>;
    }
  | {
      type: "RESET_RUNTIME";
      preserveArchive?: boolean;
    };

/* ==========================================================
   Runtime Store Contract
========================================================== */

export type EpistemeStoreListener = (
  snapshot: EpistemeRuntimeSnapshot,
) => void;

export interface EpistemeRuntimeStoreContract {
  getState: () => EpistemeRuntimeState;

  getSnapshot: () => EpistemeRuntimeSnapshot;

  getServerSnapshot: () => EpistemeRuntimeSnapshot;

  subscribe: (
    listener: EpistemeStoreListener,
  ) => () => void;

  dispatch: (
    action: EpistemeStoreAction,
  ) => EpistemeRuntimeState;

  ingest: (
    input: KnowledgePacketInput,
  ) => KnowledgePacket;

  reset: (
    preserveArchive?: boolean,
  ) => void;

  destroy: () => void;
}

/* ==========================================================
   Engine
========================================================== */

export interface EpistemeEngineConfig {
  confidenceGrowth: number;

  relevanceGrowth: number;

  importanceGrowth: number;

  archiveCompletedPackets: boolean;
}

export interface EngineProcessingContext {
  state: EpistemeRuntimeState;

  packet: KnowledgePacket;

  organId: OrganId;

  nextOrganId: OrganId;

  cycle: RuntimeCycle;
}

export type OrganProcessor = (
  context: EngineProcessingContext,
) =>
  | KnowledgePacket
  | Promise<KnowledgePacket>;

export interface EpistemeEngineContract {
  registerProcessor: (
    organId: OrganId,
    processor: OrganProcessor,
  ) => void;

  unregisterProcessor: (
    organId: OrganId,
  ) => void;

  processCurrentOrgan: () =>
    Promise<KnowledgePacket | null>;

  advanceOrgan: () =>
    Promise<OrganId>;

  completeCycle: () =>
    Promise<void>;

  processCycle: () =>
    Promise<void>;
}

/* ==========================================================
   Scheduler
========================================================== */

export type EpistemeSchedulerMode =
  | "automatic"
  | "manual"
  | "single-cycle";

export type EpistemeSchedulerStatus =
  | "offline"
  | "starting"
  | "running"
  | "waiting"
  | "paused"
  | "stopping"
  | "completed"
  | "error"
  | "destroyed";

export interface EpistemeSchedulerConfig {
  mode: EpistemeSchedulerMode;

  autoStart: boolean;

  initialDelayMs: number;

  organIntervalMs: number;

  cycleIntervalMs: number;

  synchronizationMs: number;

  generatePacketsWhenIdle: boolean;

  pauseWhenHidden: boolean;

  resumeWhenVisible: boolean;
}

export interface SchedulerTickResult {
  executed: boolean;

  status: EpistemeSchedulerStatus;

  organId: OrganId;

  packetId: string | null;

  cycleNumber: number;

  message: string;
}

export interface EpistemeSchedulerContract {
  start: () => Promise<void>;

  pause: () => void;

  resume: () => Promise<void>;

  stop: () => void;

  tick: () =>
    Promise<SchedulerTickResult>;

  processNextCycle: () =>
    Promise<void>;

  setMode: (
    mode: EpistemeSchedulerMode,
  ) => void;

  destroy: () => void;
}

/* ==========================================================
   Runtime Services
========================================================== */

export interface EpistemeRuntimeServices {
  store: EpistemeRuntimeStoreContract;

  engine: EpistemeEngineContract;

  scheduler: EpistemeSchedulerContract;
}

/* ==========================================================
   React Context
========================================================== */

export interface EpistemeRuntimeControls {
  start: () => Promise<void>;

  pause: () => void;

  resume: () => Promise<void>;

  stop: () => void;

  reset: () => void;

  tick: () =>
    Promise<SchedulerTickResult>;

  processNextCycle: () =>
    Promise<void>;

  ingest: (
    input: KnowledgePacketInput,
  ) => KnowledgePacket;

  setMode: (
    mode: EpistemeSchedulerMode,
  ) => void;
}

export interface EpistemeRuntimeContextValue {
  services: EpistemeRuntimeServices;

  snapshot: EpistemeRuntimeSnapshot;

  state: EpistemeRuntimeState;

  controls: EpistemeRuntimeControls;

  ready: boolean;
}

/* ==========================================================
   Provider Properties
========================================================== */

export interface EpistemeProviderConfig {
  store?: Partial<EpistemeStoreConfig>;

  engine?: Partial<EpistemeEngineConfig>;

  scheduler?: Partial<EpistemeSchedulerConfig>;
}

/* ==========================================================
   Runtime Selectors
========================================================== */

export type EpistemeRuntimeSelector<T> = (
  state: EpistemeRuntimeState,
) => T;

/* ==========================================================
   Public Runtime Summary
========================================================== */

export interface EpistemeRuntimeSummary {
  status: EpistemeRuntimeStatus;

  activeOrgan: OrganId;

  nextOrgan: OrganId;

  cycleNumber: number;

  cycleProgress: number;

  activePacketId: string | null;

  activePacketTitle: string | null;

  queueLength: number;

  archiveLength: number;

  health: number;

  synchronization: number;

  activity: number;

  averageConfidence: number;

  errorCount: number;
}