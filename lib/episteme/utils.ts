/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/utils.ts

   Responsibilities:
   - Runtime-safe utility functions
   - ID generation
   - Numeric normalization
   - Organ transition helpers
   - Knowledge Packet factories
   - Runtime Event / Error factories
   - Initial Runtime State creation
   - Derived Metrics calculation
   - Runtime validation

   Dependency rule:
   utils.ts may import only:
   - ./types
   - ./constants
========================================================== */

import {
  DEFAULT_EVENT_SEVERITY,
  DEFAULT_EPISTEME_STORE_CONFIG,
  DEFAULT_ORGAN_METRICS,
  DEFAULT_PACKET_CONFIDENCE,
  DEFAULT_PACKET_IMPORTANCE,
  DEFAULT_PACKET_PRIORITY,
  DEFAULT_PACKET_RELEVANCE,
  DEFAULT_PACKET_STATUS,
  DEFAULT_PACKET_TYPE,
  DEFAULT_RUNTIME_METRICS,
  EPISTEME_ACTIVE_RUNTIME_STATUS,
  EPISTEME_INITIAL_ORGAN,
  EPISTEME_ORGAN_COUNT,
  EPISTEME_ORGAN_INDEX,
  EPISTEME_ORGAN_ORDER,
  EPISTEME_ORGANS,
  EPISTEME_RUNTIME_VERSION,
  PACKET_VALUE_MAX,
  PACKET_VALUE_MIN,
  RUNTIME_HEALTHY_THRESHOLD,
  RUNTIME_SYNCHRONIZED_THRESHOLD,
} from "./constants";

import type {
  EpistemeRuntimeState,
  EpistemeRuntimeStatus,
  KnowledgePacket,
  KnowledgePacketInput,
  KnowledgePacketMetadata,
  OrganId,
  OrganMetrics,
  OrganRuntimeStatus,
  PacketQueueState,
  RuntimeCycle,
  RuntimeError,
  RuntimeEvent,
  RuntimeEventSeverity,
  RuntimeEventType,
  RuntimeMetrics,
  RuntimeOrgan,
} from "./types";

/* ==========================================================
   Generic Number Utilities
========================================================== */

export function clamp(
  value: number,
  minimum = 0,
  maximum = 100,
): number {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
}

export function clampPacketValue(
  value: number,
): number {
  return clamp(
    value,
    PACKET_VALUE_MIN,
    PACKET_VALUE_MAX,
  );
}

export function normalizePercentage(
  value: number,
): number {
  return clamp(value, 0, 100);
}

export function roundNumber(
  value: number,
  digits = 0,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const factor = 10 ** digits;

  return (
    Math.round(value * factor) /
    factor
  );
}

export function average(
  values: readonly number[],
): number {
  if (values.length === 0) {
    return 0;
  }

  const validValues =
    values.filter(Number.isFinite);

  if (validValues.length === 0) {
    return 0;
  }

  return (
    validValues.reduce(
      (total, value) =>
        total + value,
      0,
    ) / validValues.length
  );
}

/* ==========================================================
   Time Utilities
========================================================== */

export function now(): number {
  return Date.now();
}

export function calculateElapsedMs(
  startedAt: number | null,
  completedAt: number | null,
  currentTimestamp = Date.now(),
): number {
  if (startedAt === null) {
    return 0;
  }

  return Math.max(
    0,
    (completedAt ?? currentTimestamp) -
      startedAt,
  );
}

export function wait(
  milliseconds: number,
): Promise<void> {
  const safeDelay = Math.max(
    0,
    Number.isFinite(milliseconds)
      ? milliseconds
      : 0,
  );

  return new Promise((resolve) => {
    setTimeout(resolve, safeDelay);
  });
}

/* ==========================================================
   ID Generation
========================================================== */

export function createRuntimeId(
  prefix: string,
): string {
  const safePrefix =
    prefix.trim() || "episteme";

  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID ===
      "function"
  ) {
    return `${safePrefix}-${globalThis.crypto.randomUUID()}`;
  }

  return [
    safePrefix,
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2, 10),
  ].join("-");
}

/* ==========================================================
   Organ Validation
========================================================== */

export function isOrganId(
  value: unknown,
): value is OrganId {
  return (
    typeof value === "string" &&
    EPISTEME_ORGAN_ORDER.includes(
      value as OrganId,
    )
  );
}

/* ==========================================================
   Organ Navigation
========================================================== */

export function getOrganIndex(
  organId: OrganId,
): number {
  return EPISTEME_ORGAN_INDEX[
    organId
  ];
}

export function getNextOrganId(
  organId: OrganId,
): OrganId {
  const index =
    getOrganIndex(organId);

  return EPISTEME_ORGAN_ORDER[
    (index + 1) %
      EPISTEME_ORGAN_COUNT
  ];
}

export function getPreviousOrganId(
  organId: OrganId,
): OrganId {
  const index =
    getOrganIndex(organId);

  return EPISTEME_ORGAN_ORDER[
    (
      index -
      1 +
      EPISTEME_ORGAN_COUNT
    ) %
      EPISTEME_ORGAN_COUNT
  ];
}

export function getOrganRuntimeStatus(
  organId: OrganId,
): OrganRuntimeStatus {
  return EPISTEME_ACTIVE_RUNTIME_STATUS[
    organId
  ];
}

/* ==========================================================
   Organ Metrics Factory
========================================================== */

export function createOrganMetrics(
  patch: Partial<OrganMetrics> = {},
): OrganMetrics {
  return {
    ...DEFAULT_ORGAN_METRICS,

    ...patch,

    confidence:
      clampPacketValue(
        patch.confidence ??
          DEFAULT_ORGAN_METRICS.confidence,
      ),

    activity:
      normalizePercentage(
        patch.activity ??
          DEFAULT_ORGAN_METRICS.activity,
      ),

    complexity:
      normalizePercentage(
        patch.complexity ??
          DEFAULT_ORGAN_METRICS.complexity,
      ),

    health:
      normalizePercentage(
        patch.health ??
          DEFAULT_ORGAN_METRICS.health,
      ),

    synchronization:
      normalizePercentage(
        patch.synchronization ??
          DEFAULT_ORGAN_METRICS
            .synchronization,
      ),

    receivedPackets:
      Math.max(
        0,
        patch.receivedPackets ??
          DEFAULT_ORGAN_METRICS
            .receivedPackets,
      ),

    emittedPackets:
      Math.max(
        0,
        patch.emittedPackets ??
          DEFAULT_ORGAN_METRICS
            .emittedPackets,
      ),

    processedPackets:
      Math.max(
        0,
        patch.processedPackets ??
          DEFAULT_ORGAN_METRICS
            .processedPackets,
      ),
  };
}

/* ==========================================================
   Runtime Organ Factory
========================================================== */

export function createRuntimeOrgan(
  organId: OrganId,
  timestamp = Date.now(),
): RuntimeOrgan {
  return {
    definition:
      EPISTEME_ORGANS[organId],

    runtimeStatus: "idle",

    intelligenceStatus:
      "inactive",

    metrics:
      createOrganMetrics(),

    isActive: false,

    isPrevious: false,

    isNext: false,

    isCompleted: false,

    progress: 0,

    activatedAt: null,

    completedAt: null,

    updatedAt: timestamp,
  };
}

export function createRuntimeOrgans(
  timestamp = Date.now(),
): Record<OrganId, RuntimeOrgan> {
  return EPISTEME_ORGAN_ORDER.reduce(
    (
      result,
      organId,
    ) => {
      result[organId] =
        createRuntimeOrgan(
          organId,
          timestamp,
        );

      return result;
    },
    {} as Record<
      OrganId,
      RuntimeOrgan
    >,
  );
}

/* ==========================================================
   Organ State Synchronization
========================================================== */

export function synchronizeRuntimeOrgans(
  organs: Record<OrganId, RuntimeOrgan>,
  options: {
    activeOrgan: OrganId;
    previousOrgan: OrganId | null;
    nextOrgan: OrganId;
    completedOrgans: readonly OrganId[];
    timestamp?: number;
  },
): Record<OrganId, RuntimeOrgan> {
  const timestamp =
    options.timestamp ??
    Date.now();

  return EPISTEME_ORGAN_ORDER.reduce(
    (
      result,
      organId,
    ) => {
      const current =
        organs[organId];

      const isActive =
        organId ===
        options.activeOrgan;

      const isPrevious =
        organId ===
        options.previousOrgan;

      const isNext =
        organId ===
        options.nextOrgan;

      const isCompleted =
        options.completedOrgans.includes(
          organId,
        );

      result[organId] = {
        ...current,

        runtimeStatus: isActive
          ? getOrganRuntimeStatus(
              organId,
            )
          : isCompleted
            ? "completed"
            : "idle",

        intelligenceStatus: isActive
          ? "active"
          : isCompleted
            ? "learning"
            : "inactive",

        isActive,

        isPrevious,

        isNext,

        isCompleted,

        progress: isCompleted
          ? 100
          : isActive
            ? 50
            : 0,

        activatedAt: isActive
          ? current.activatedAt ??
            timestamp
          : current.activatedAt,

        completedAt: isCompleted
          ? current.completedAt ??
            timestamp
          : null,

        updatedAt: timestamp,
      };

      return result;
    },
    {} as Record<
      OrganId,
      RuntimeOrgan
    >,
  );
}

/* ==========================================================
   Knowledge Packet Metadata Factory
========================================================== */

export function createPacketMetadata(
  input: KnowledgePacketInput,
  timestamp = Date.now(),
): KnowledgePacketMetadata {
  return {
    tags: Array.from(
      new Set(
        input.tags?.filter(Boolean) ??
          [],
      ),
    ),

    confidence:
      clampPacketValue(
        input.confidence ??
          DEFAULT_PACKET_CONFIDENCE,
      ),

    importance:
      clampPacketValue(
        input.importance ??
          DEFAULT_PACKET_IMPORTANCE,
      ),

    relevance:
      clampPacketValue(
        input.relevance ??
          DEFAULT_PACKET_RELEVANCE,
      ),

    createdAt: timestamp,

    updatedAt: timestamp,
  };
}

/* ==========================================================
   Knowledge Packet Factory
========================================================== */

export function createKnowledgePacket(
  input: KnowledgePacketInput,
  timestamp = Date.now(),
): KnowledgePacket {
  const title =
    input.title.trim();

  if (!title) {
    throw new Error(
      "Knowledge Packet title is required.",
    );
  }

  const from =
    input.from ?? "memory";

  const to =
    input.to ?? "observation";

  return {
    id:
      createRuntimeId("packet"),

    type:
      input.type ??
      DEFAULT_PACKET_TYPE,

    priority:
      input.priority ??
      DEFAULT_PACKET_PRIORITY,

    status:
      DEFAULT_PACKET_STATUS,

    from,

    to,

    title,

    summary:
      input.summary?.trim() ?? "",

    content:
      input.content?.trim() ?? "",

    source:
      input.source
        ? {
            ...input.source,
          }
        : undefined,

    metadata:
      createPacketMetadata(
        input,
        timestamp,
      ),
  };
}

/* ==========================================================
   Packet Clone Utility
========================================================== */

export function cloneKnowledgePacket(
  packet: KnowledgePacket,
): KnowledgePacket {
  return {
    ...packet,

    source:
      packet.source
        ? {
            ...packet.source,
          }
        : undefined,

    metadata: {
      ...packet.metadata,

      tags: [
        ...packet.metadata.tags,
      ],
    },
  };
}

/* ==========================================================
   Packet Update Utility
========================================================== */

export function updateKnowledgePacket(
  packet: KnowledgePacket,
  patch: Partial<KnowledgePacket>,
  timestamp = Date.now(),
): KnowledgePacket {
  return {
    ...packet,

    ...patch,

    id: packet.id,

    source:
      patch.source !== undefined
        ? patch.source
          ? {
              ...patch.source,
            }
          : undefined
        : packet.source
          ? {
              ...packet.source,
            }
          : undefined,

    metadata: {
      ...packet.metadata,
      ...patch.metadata,

      tags:
        patch.metadata?.tags !==
        undefined
          ? Array.from(
              new Set(
                patch.metadata.tags,
              ),
            )
          : [
              ...packet.metadata.tags,
            ],

      confidence:
        clampPacketValue(
          patch.metadata
            ?.confidence ??
            packet.metadata
              .confidence,
        ),

      importance:
        clampPacketValue(
          patch.metadata
            ?.importance ??
            packet.metadata
              .importance,
        ),

      relevance:
        clampPacketValue(
          patch.metadata
            ?.relevance ??
            packet.metadata
              .relevance,
        ),

      updatedAt: timestamp,
    },
  };
}

/* ==========================================================
   Packet Queue Factory
========================================================== */

export function createPacketQueueState():
  PacketQueueState {
  return {
    items: [],

    activePacketId: null,

    lastProcessedPacketId: null,
  };
}

/* ==========================================================
   Runtime Cycle Factory
========================================================== */

export function createRuntimeCycle(
  number = 1,
  timestamp = Date.now(),
): RuntimeCycle {
  const activeOrgan =
    EPISTEME_INITIAL_ORGAN;

  return {
    id:
      createRuntimeId("cycle"),

    number,

    status: "idle",

    activeOrgan,

    previousOrgan: null,

    nextOrgan:
      getNextOrganId(
        activeOrgan,
      ),

    completedOrgans: [],

    progress: 0,

    startedAt: null,

    completedAt: null,

    updatedAt: timestamp,

    elapsedMs: 0,
  };
}

/* ==========================================================
   Runtime Metrics Factory
========================================================== */

export function createRuntimeMetrics(
  patch: Partial<RuntimeMetrics> = {},
): RuntimeMetrics {
  return {
    ...DEFAULT_RUNTIME_METRICS,

    ...patch,

    health:
      normalizePercentage(
        patch.health ??
          DEFAULT_RUNTIME_METRICS
            .health,
      ),

    synchronization:
      normalizePercentage(
        patch.synchronization ??
          DEFAULT_RUNTIME_METRICS
            .synchronization,
      ),

    activity:
      normalizePercentage(
        patch.activity ??
          DEFAULT_RUNTIME_METRICS
            .activity,
      ),

    cognitiveLoad:
      normalizePercentage(
        patch.cognitiveLoad ??
          DEFAULT_RUNTIME_METRICS
            .cognitiveLoad,
      ),

    queueLoad:
      normalizePercentage(
        patch.queueLoad ??
          DEFAULT_RUNTIME_METRICS
            .queueLoad,
      ),

    averageConfidence:
      normalizePercentage(
        patch.averageConfidence ??
          DEFAULT_RUNTIME_METRICS
            .averageConfidence,
      ),

    totalCycles:
      Math.max(
        0,
        patch.totalCycles ??
          DEFAULT_RUNTIME_METRICS
            .totalCycles,
      ),

    completedCycles:
      Math.max(
        0,
        patch.completedCycles ??
          DEFAULT_RUNTIME_METRICS
            .completedCycles,
      ),

    totalPacketsCreated:
      Math.max(
        0,
        patch.totalPacketsCreated ??
          DEFAULT_RUNTIME_METRICS
            .totalPacketsCreated,
      ),

    totalPacketsProcessed:
      Math.max(
        0,
        patch.totalPacketsProcessed ??
          DEFAULT_RUNTIME_METRICS
            .totalPacketsProcessed,
      ),

    totalPacketsArchived:
      Math.max(
        0,
        patch.totalPacketsArchived ??
          DEFAULT_RUNTIME_METRICS
            .totalPacketsArchived,
      ),

    totalErrors:
      Math.max(
        0,
        patch.totalErrors ??
          DEFAULT_RUNTIME_METRICS
            .totalErrors,
      ),

    uptimeMs:
      Math.max(
        0,
        patch.uptimeMs ??
          DEFAULT_RUNTIME_METRICS
            .uptimeMs,
      ),
  };
}

/* ==========================================================
   Runtime Event Factory
========================================================== */

export function createRuntimeEvent(
  type: RuntimeEventType,
  message: string,
  options: {
    severity?: RuntimeEventSeverity;
    organId?: OrganId;
    packetId?: string;
    cycleId?: string;
    data?: RuntimeEvent["data"];
    timestamp?: number;
  } = {},
): RuntimeEvent {
  return {
    id:
      createRuntimeId("event"),

    type,

    severity:
      options.severity ??
      DEFAULT_EVENT_SEVERITY,

    message,

    timestamp:
      options.timestamp ??
      Date.now(),

    organId:
      options.organId,

    packetId:
      options.packetId,

    cycleId:
      options.cycleId,

    data:
      options.data,
  };
}

/* ==========================================================
   Runtime Error Factory
========================================================== */

export function createRuntimeError(
  code: string,
  message: string,
  options: {
    recoverable?: boolean;
    organId?: OrganId;
    packetId?: string;
    cycleId?: string;
    timestamp?: number;
  } = {},
): RuntimeError {
  return {
    id:
      createRuntimeId("error"),

    code,

    message,

    timestamp:
      options.timestamp ??
      Date.now(),

    recoverable:
      options.recoverable ??
      true,

    organId:
      options.organId,

    packetId:
      options.packetId,

    cycleId:
      options.cycleId,
  };
}

/* ==========================================================
   Initial Runtime State Factory
========================================================== */

export function createInitialRuntimeState(
  timestamp = Date.now(),
): EpistemeRuntimeState {
  const cycle =
    createRuntimeCycle(
      1,
      timestamp,
    );

  const organs =
    synchronizeRuntimeOrgans(
      createRuntimeOrgans(
        timestamp,
      ),
      {
        activeOrgan:
          cycle.activeOrgan,

        previousOrgan:
          cycle.previousOrgan,

        nextOrgan:
          cycle.nextOrgan,

        completedOrgans:
          cycle.completedOrgans,

        timestamp,
      },
    );

  /*
   * Initial state is visually ready but not operating.
   * Observation is marked as the current position,
   * while its runtime status remains idle.
   */
  organs.observation = {
    ...organs.observation,

    runtimeStatus: "idle",

    intelligenceStatus:
      "inactive",

    isActive: false,

    progress: 0,

    activatedAt: null,

    updatedAt: timestamp,
  };

  return {
    version:
      EPISTEME_RUNTIME_VERSION,

    status: "offline",

    ready: false,

    running: false,

    paused: false,

    synchronizing: false,

    organs,

    cycle,

    queue:
      createPacketQueueState(),

    archive: [],

    metrics:
      createRuntimeMetrics(),

    events: [],

    errors: [],

    createdAt: timestamp,

    startedAt: null,

    stoppedAt: null,

    updatedAt: timestamp,

    lastTickAt: null,

    lastSynchronizationAt:
      null,
  };
}

/* ==========================================================
   Active Packet Selector
========================================================== */

export function selectActivePacket(
  state: EpistemeRuntimeState,
): KnowledgePacket | null {
  const activePacketId =
    state.queue.activePacketId;

  if (!activePacketId) {
    return null;
  }

  return (
    state.queue.items.find(
      (packet) =>
        packet.id ===
        activePacketId,
    ) ?? null
  );
}

/* ==========================================================
   Packet Selectors
========================================================== */

export function selectQueuedPackets(
  state: EpistemeRuntimeState,
): KnowledgePacket[] {
  return state.queue.items.filter(
    (packet) =>
      packet.status === "created" ||
      packet.status === "queued",
  );
}

export function selectProcessingPackets(
  state: EpistemeRuntimeState,
): KnowledgePacket[] {
  return state.queue.items.filter(
    (packet) =>
      packet.status ===
      "processing",
  );
}

export function selectCompletedPackets(
  state: EpistemeRuntimeState,
): KnowledgePacket[] {
  return state.queue.items.filter(
    (packet) =>
      packet.status ===
      "completed",
  );
}

export function selectCriticalPackets(
  state: EpistemeRuntimeState,
): KnowledgePacket[] {
  return state.queue.items.filter(
    (packet) =>
      packet.priority ===
      "critical",
  );
}

/* ==========================================================
   Organ Metrics Aggregation
========================================================== */

export function calculateAverageOrganMetrics(
  organs: Record<OrganId, RuntimeOrgan>,
): Pick<
  RuntimeMetrics,
  | "health"
  | "synchronization"
  | "activity"
  | "cognitiveLoad"
  | "averageConfidence"
> {
  const organValues =
    EPISTEME_ORGAN_ORDER.map(
      (organId) =>
        organs[organId].metrics,
    );

  const health =
    normalizePercentage(
      average(
        organValues.map(
          (metrics) =>
            metrics.health,
        ),
      ),
    );

  const synchronization =
    normalizePercentage(
      average(
        organValues.map(
          (metrics) =>
            metrics.synchronization,
        ),
      ),
    );

  const activity =
    normalizePercentage(
      average(
        organValues.map(
          (metrics) =>
            metrics.activity,
        ),
      ),
    );

  const averageConfidence =
    normalizePercentage(
      average(
        organValues.map(
          (metrics) =>
            metrics.confidence,
        ),
      ),
    );

  return {
    health,

    synchronization,

    activity,

    cognitiveLoad:
      activity,

    averageConfidence,
  };
}

/* ==========================================================
   Runtime Metrics Recalculation
========================================================== */

export function recalculateRuntimeMetrics(
  state: EpistemeRuntimeState,
  maxQueueSize =
    DEFAULT_EPISTEME_STORE_CONFIG.maxQueueSize,
  currentTimestamp = Date.now(),
): RuntimeMetrics {
  const organMetrics =
    calculateAverageOrganMetrics(
      state.organs,
    );

  const safeMaximum =
    Math.max(1, maxQueueSize);

  const queueLoad =
    normalizePercentage(
      (
        state.queue.items.length /
        safeMaximum
      ) * 100,
    );

  const uptimeMs =
    state.startedAt !== null
      ? Math.max(
          0,
          currentTimestamp -
            state.startedAt,
        )
      : state.metrics.uptimeMs;

  return createRuntimeMetrics({
    ...state.metrics,

    ...organMetrics,

    queueLoad,

    uptimeMs,

    totalErrors:
      state.errors.length,
  });
}

/* ==========================================================
   Runtime Status Resolution
========================================================== */

export function resolveRuntimeStatus(
  state: EpistemeRuntimeState,
): EpistemeRuntimeStatus {
  if (
    state.status === "destroyed"
  ) {
    return "destroyed";
  }

  if (
    state.errors.length > 0 ||
    state.status === "error"
  ) {
    return "error";
  }

  if (
    state.metrics.health <
    RUNTIME_HEALTHY_THRESHOLD
  ) {
    return "degraded";
  }

  if (state.synchronizing) {
    return "synchronizing";
  }

  if (state.paused) {
    return "paused";
  }

  if (state.running) {
    return "operating";
  }

  if (
    state.cycle.status ===
    "completed"
  ) {
    return "completed";
  }

  if (
    state.ready &&
    state.queue.items.length === 0
  ) {
    return "waiting";
  }

  if (state.ready) {
    return "ready";
  }

  return "offline";
}

/* ==========================================================
   Runtime Health Selectors
========================================================== */

export function isRuntimeHealthy(
  state: EpistemeRuntimeState,
): boolean {
  return (
    state.metrics.health >=
    RUNTIME_HEALTHY_THRESHOLD
  );
}

export function isRuntimeSynchronized(
  state: EpistemeRuntimeState,
): boolean {
  return (
    state.metrics
      .synchronization >=
    RUNTIME_SYNCHRONIZED_THRESHOLD
  );
}

/* ==========================================================
   Runtime State Validation
========================================================== */

export function validateRuntimeState(
  state: EpistemeRuntimeState,
): string[] {
  const errors: string[] = [];

  if (
    !isOrganId(
      state.cycle.activeOrgan,
    )
  ) {
    errors.push(
      "Cycle activeOrgan is invalid.",
    );
  }

  if (
    !isOrganId(
      state.cycle.nextOrgan,
    )
  ) {
    errors.push(
      "Cycle nextOrgan is invalid.",
    );
  }

  if (
    state.cycle.previousOrgan !==
      null &&
    !isOrganId(
      state.cycle.previousOrgan,
    )
  ) {
    errors.push(
      "Cycle previousOrgan is invalid.",
    );
  }

  if (
    state.cycle.progress < 0 ||
    state.cycle.progress > 100
  ) {
    errors.push(
      "Cycle progress must be between 0 and 100.",
    );
  }

  if (
    state.metrics.health < 0 ||
    state.metrics.health > 100
  ) {
    errors.push(
      "Runtime health must be between 0 and 100.",
    );
  }

  if (
    state.metrics
      .synchronization < 0 ||
    state.metrics
      .synchronization > 100
  ) {
    errors.push(
      "Runtime synchronization must be between 0 and 100.",
    );
  }

  if (
    state.queue.items.length >
    DEFAULT_EPISTEME_STORE_CONFIG.maxQueueSize
  ) {
    errors.push(
      "Packet queue exceeds the default maximum size.",
    );
  }

  if (
    state.queue.activePacketId &&
    !state.queue.items.some(
      (packet) =>
        packet.id ===
        state.queue.activePacketId,
    )
  ) {
    errors.push(
      "Active packet ID does not exist in the queue.",
    );
  }

  for (const organId of EPISTEME_ORGAN_ORDER) {
    const organ =
      state.organs[organId];

    if (!organ) {
      errors.push(
        `Runtime Organ is missing: ${organId}.`,
      );

      continue;
    }

    if (
      organ.progress < 0 ||
      organ.progress > 100
    ) {
      errors.push(
        `Organ progress is invalid: ${organId}.`,
      );
    }
  }

  return errors;
}

/* ==========================================================
   Runtime State Clone
========================================================== */

export function cloneRuntimeState(
  state: EpistemeRuntimeState,
): EpistemeRuntimeState {
  return {
    ...state,

    organs:
      EPISTEME_ORGAN_ORDER.reduce(
        (
          result,
          organId,
        ) => {
          const organ =
            state.organs[organId];

          result[organId] = {
            ...organ,

            definition: {
              ...organ.definition,
            },

            metrics: {
              ...organ.metrics,
            },
          };

          return result;
        },
        {} as Record<
          OrganId,
          RuntimeOrgan
        >,
      ),

    cycle: {
      ...state.cycle,

      completedOrgans: [
        ...state.cycle
          .completedOrgans,
      ],
    },

    queue: {
      ...state.queue,

      items:
        state.queue.items.map(
          cloneKnowledgePacket,
        ),
    },

    archive:
      state.archive.map(
        cloneKnowledgePacket,
      ),

    metrics: {
      ...state.metrics,
    },

    events:
      state.events.map(
        (event) => ({
          ...event,

          data: event.data
            ? {
                ...event.data,
              }
            : undefined,
        }),
      ),

    errors:
      state.errors.map(
        (error) => ({
          ...error,
        }),
      ),
  };
}

/* ==========================================================
   Runtime Summary
========================================================== */

export function createRuntimeSummary(
  state: EpistemeRuntimeState,
) {
  const activePacket =
    selectActivePacket(state);

  return {
    status:
      resolveRuntimeStatus(
        state,
      ),

    activeOrgan:
      state.cycle.activeOrgan,

    nextOrgan:
      state.cycle.nextOrgan,

    cycleNumber:
      state.cycle.number,

    cycleProgress:
      state.cycle.progress,

    activePacketId:
      activePacket?.id ?? null,

    activePacketTitle:
      activePacket?.title ?? null,

    queueLength:
      state.queue.items.length,

    archiveLength:
      state.archive.length,

    health:
      state.metrics.health,

    synchronization:
      state.metrics
        .synchronization,

    activity:
      state.metrics.activity,

    averageConfidence:
      state.metrics
        .averageConfidence,

    errorCount:
      state.errors.length,
  };
}