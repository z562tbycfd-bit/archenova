/* ==========================================================
   Episteme Operating System
   Global State Management

   File:
   lib/episteme/state.ts
========================================================== */

import {
  CivilizationLoop,
  createRuntimeOrgans,
  getNextOrgan,
  type IntelligenceStatus,
  type OrganId,
  type OrganMetrics,
  type OrganRuntimeState,
  type RuntimeOrgan,
} from "./organ";

import {
  createPacketQueue,
  type KnowledgePacket,
  type PacketQueue,
  type PacketStatus,
} from "./packet";

/* ==========================================================
   Kernel State
========================================================== */

export type KernelStatus =
  | "offline"
  | "initializing"
  | "idle"
  | "running"
  | "paused"
  | "synchronizing"
  | "completed"
  | "error";

export type KernelPhase =
  | "boot"
  | "input"
  | "processing"
  | "routing"
  | "memory"
  | "synchronization"
  | "rest";

/* ==========================================================
   State Event
========================================================== */

export type EpistemeEventType =
  | "kernel_started"
  | "kernel_paused"
  | "kernel_resumed"
  | "kernel_stopped"
  | "cycle_started"
  | "cycle_completed"
  | "organ_activated"
  | "organ_completed"
  | "packet_created"
  | "packet_queued"
  | "packet_routed"
  | "packet_completed"
  | "packet_archived"
  | "synchronization_started"
  | "synchronization_completed"
  | "error";

export interface EpistemeEvent {
  id: string;
  type: EpistemeEventType;
  timestamp: number;
  message: string;
  organId?: OrganId;
  packetId?: string;
}

/* ==========================================================
   Cycle State
========================================================== */

export interface CivilizationCycle {
  id: string;
  number: number;
  startedAt: number | null;
  completedAt: number | null;
  activeOrgan: OrganId;
  previousOrgan: OrganId | null;
  nextOrgan: OrganId;
  completedOrgans: OrganId[];
  progress: number;
}

/* ==========================================================
   System Metrics
========================================================== */

export interface EpistemeSystemMetrics {
  totalCycles: number;
  completedCycles: number;
  totalPacketsCreated: number;
  totalPacketsProcessed: number;
  totalPacketsArchived: number;
  averageConfidence: number;
  synchronization: number;
  health: number;
  activity: number;
  uptime: number;
}

/* ==========================================================
   Error State
========================================================== */

export interface EpistemeError {
  code: string;
  message: string;
  timestamp: number;
  organId?: OrganId;
  packetId?: string;
}

/* ==========================================================
   Root State
========================================================== */

export interface EpistemeState {
  kernelStatus: KernelStatus;
  kernelPhase: KernelPhase;

  organs: Record<OrganId, RuntimeOrgan>;

  queue: PacketQueue;
  archive: KnowledgePacket[];

  cycle: CivilizationCycle;
  metrics: EpistemeSystemMetrics;

  events: EpistemeEvent[];
  errors: EpistemeError[];

  activePacketId: string | null;

  initializedAt: number;
  updatedAt: number;
}

/* ==========================================================
   State Action
========================================================== */

export type EpistemeAction =
  | {
      type: "INITIALIZE_KERNEL";
      timestamp?: number;
    }
  | {
      type: "SET_KERNEL_STATUS";
      status: KernelStatus;
    }
  | {
      type: "SET_KERNEL_PHASE";
      phase: KernelPhase;
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
      type: "ACTIVATE_ORGAN";
      organId: OrganId;
      runtimeState?: OrganRuntimeState;
    }
  | {
      type: "COMPLETE_ORGAN";
      organId: OrganId;
    }
  | {
      type: "SET_ORGAN_RUNTIME_STATE";
      organId: OrganId;
      runtimeState: OrganRuntimeState;
    }
  | {
      type: "SET_ORGAN_INTELLIGENCE_STATUS";
      organId: OrganId;
      intelligenceStatus: IntelligenceStatus;
    }
  | {
      type: "UPDATE_ORGAN_METRICS";
      organId: OrganId;
      metrics: Partial<OrganMetrics>;
    }
  | {
      type: "ENQUEUE_PACKET";
      packet: KnowledgePacket;
    }
  | {
      type: "SET_ACTIVE_PACKET";
      packetId: string | null;
    }
  | {
      type: "UPDATE_PACKET_STATUS";
      packetId: string;
      status: PacketStatus;
    }
  | {
      type: "ROUTE_PACKET";
      packetId: string;
      from: OrganId;
      to: OrganId;
    }
  | {
      type: "ARCHIVE_PACKET";
      packetId: string;
    }
  | {
      type: "ADD_EVENT";
      event: EpistemeEvent;
    }
  | {
      type: "ADD_ERROR";
      error: EpistemeError;
    }
  | {
      type: "CLEAR_ERRORS";
    }
  | {
      type: "RESET_STATE";
      timestamp?: number;
    };

/* ==========================================================
   ID Utility
========================================================== */

function createStateId(prefix: string): string {
  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/* ==========================================================
   Cycle Factory
========================================================== */

export function createCivilizationCycle(
  number = 1,
): CivilizationCycle {
  return {
    id: createStateId("cycle"),
    number,
    startedAt: null,
    completedAt: null,
    activeOrgan: "observation",
    previousOrgan: null,
    nextOrgan: "understanding",
    completedOrgans: [],
    progress: 0,
  };
}

/* ==========================================================
   Metrics Factory
========================================================== */

export function createSystemMetrics(): EpistemeSystemMetrics {
  return {
    totalCycles: 0,
    completedCycles: 0,
    totalPacketsCreated: 0,
    totalPacketsProcessed: 0,
    totalPacketsArchived: 0,
    averageConfidence: 0,
    synchronization: 100,
    health: 100,
    activity: 0,
    uptime: 0,
  };
}

/* ==========================================================
   Initial State Factory
========================================================== */

export function createInitialEpistemeState(
  timestamp = Date.now(),
): EpistemeState {
  return {
    kernelStatus: "offline",
    kernelPhase: "boot",

    organs: createRuntimeOrgans(),

    queue: createPacketQueue(),
    archive: [],

    cycle: createCivilizationCycle(1),
    metrics: createSystemMetrics(),

    events: [],
    errors: [],

    activePacketId: null,

    initializedAt: timestamp,
    updatedAt: timestamp,
  };
}

/* ==========================================================
   Event Factory
========================================================== */

export function createEpistemeEvent(
  type: EpistemeEventType,
  message: string,
  options?: {
    organId?: OrganId;
    packetId?: string;
    timestamp?: number;
  },
): EpistemeEvent {
  return {
    id: createStateId("event"),
    type,
    timestamp: options?.timestamp ?? Date.now(),
    message,
    organId: options?.organId,
    packetId: options?.packetId,
  };
}

/* ==========================================================
   Error Factory
========================================================== */

export function createEpistemeError(
  code: string,
  message: string,
  options?: {
    organId?: OrganId;
    packetId?: string;
    timestamp?: number;
  },
): EpistemeError {
  return {
    code,
    message,
    timestamp: options?.timestamp ?? Date.now(),
    organId: options?.organId,
    packetId: options?.packetId,
  };
}

/* ==========================================================
   Internal Utilities
========================================================== */

function updateOrgan(
  state: EpistemeState,
  organId: OrganId,
  updater: (organ: RuntimeOrgan) => RuntimeOrgan,
): Record<OrganId, RuntimeOrgan> {
  return {
    ...state.organs,
    [organId]: updater(state.organs[organId]),
  };
}

function calculateCycleProgress(
  completedOrgans: OrganId[],
): number {
  return Math.min(
    100,
    Math.round(
      (completedOrgans.length / CivilizationLoop.length) * 100,
    ),
  );
}

function calculateAverageConfidence(
  organs: Record<OrganId, RuntimeOrgan>,
): number {
  const values = CivilizationLoop.map(
    (organId) => organs[organId].metrics.confidence,
  );

  if (values.length === 0) return 0;

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return Math.round(total / values.length);
}

function calculateSystemActivity(
  organs: Record<OrganId, RuntimeOrgan>,
): number {
  const values = CivilizationLoop.map(
    (organId) => organs[organId].metrics.activity,
  );

  if (values.length === 0) return 0;

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return Math.round(total / values.length);
}

function calculateSystemHealth(
  organs: Record<OrganId, RuntimeOrgan>,
): number {
  const values = CivilizationLoop.map(
    (organId) => organs[organId].metrics.health,
  );

  if (values.length === 0) return 100;

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return Math.round(total / values.length);
}

function appendEvent(
  events: EpistemeEvent[],
  event: EpistemeEvent,
  limit = 200,
): EpistemeEvent[] {
  return [...events, event].slice(-limit);
}

/* ==========================================================
   Reducer
========================================================== */

export function epistemeReducer(
  state: EpistemeState,
  action: EpistemeAction,
): EpistemeState {
  const now = Date.now();

  switch (action.type) {
    case "INITIALIZE_KERNEL": {
      const timestamp = action.timestamp ?? now;

      return {
        ...state,
        kernelStatus: "idle",
        kernelPhase: "rest",
        initializedAt: timestamp,
        updatedAt: timestamp,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "kernel_started",
            "Episteme Kernel initialized.",
            { timestamp },
          ),
        ),
      };
    }

    case "SET_KERNEL_STATUS":
      return {
        ...state,
        kernelStatus: action.status,
        updatedAt: now,
      };

    case "SET_KERNEL_PHASE":
      return {
        ...state,
        kernelPhase: action.phase,
        updatedAt: now,
      };

    case "START_CYCLE": {
      const timestamp = action.timestamp ?? now;
      const cycleNumber = state.metrics.totalCycles + 1;

      return {
        ...state,
        kernelStatus: "running",
        kernelPhase: "input",
        cycle: {
          ...createCivilizationCycle(cycleNumber),
          startedAt: timestamp,
        },
        metrics: {
          ...state.metrics,
          totalCycles: cycleNumber,
          activity: Math.max(state.metrics.activity, 10),
        },
        updatedAt: timestamp,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "cycle_started",
            `Civilization cycle ${cycleNumber} started.`,
            {
              organId: "observation",
              timestamp,
            },
          ),
        ),
      };
    }

    case "COMPLETE_CYCLE": {
      const timestamp = action.timestamp ?? now;

      return {
        ...state,
        kernelStatus: "completed",
        kernelPhase: "synchronization",
        cycle: {
          ...state.cycle,
          completedAt: timestamp,
          progress: 100,
        },
        metrics: {
          ...state.metrics,
          completedCycles:
            state.metrics.completedCycles + 1,
          synchronization: 100,
        },
        updatedAt: timestamp,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "cycle_completed",
            `Civilization cycle ${state.cycle.number} completed.`,
            { timestamp },
          ),
        ),
      };
    }

    case "ACTIVATE_ORGAN": {
      const nextOrgan = getNextOrgan(action.organId);

      const organs = updateOrgan(
        state,
        action.organId,
        (organ) => ({
          ...organ,
          runtimeState:
            action.runtimeState ?? "processing",
          intelligenceStatus: "active",
          metrics: {
            ...organ.metrics,
            activity: Math.max(organ.metrics.activity, 50),
          },
          updatedAt: now,
        }),
      );

      return {
        ...state,
        kernelStatus: "running",
        kernelPhase: "processing",
        organs,
        cycle: {
          ...state.cycle,
          previousOrgan: state.cycle.activeOrgan,
          activeOrgan: action.organId,
          nextOrgan,
        },
        metrics: {
          ...state.metrics,
          averageConfidence:
            calculateAverageConfidence(organs),
          activity: calculateSystemActivity(organs),
          health: calculateSystemHealth(organs),
        },
        updatedAt: now,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "organ_activated",
            `${state.organs[action.organId].definition.title} activated.`,
            {
              organId: action.organId,
              timestamp: now,
            },
          ),
        ),
      };
    }

    case "COMPLETE_ORGAN": {
      const completedOrgans = state.cycle.completedOrgans.includes(
        action.organId,
      )
        ? state.cycle.completedOrgans
        : [...state.cycle.completedOrgans, action.organId];

      const organs = updateOrgan(
        state,
        action.organId,
        (organ) => ({
          ...organ,
          runtimeState: "completed",
          intelligenceStatus: "learning",
          metrics: {
            ...organ.metrics,
            activity: Math.max(
              0,
              organ.metrics.activity - 15,
            ),
          },
          updatedAt: now,
        }),
      );

      return {
        ...state,
        organs,
        cycle: {
          ...state.cycle,
          completedOrgans,
          progress:
            calculateCycleProgress(completedOrgans),
        },
        metrics: {
          ...state.metrics,
          averageConfidence:
            calculateAverageConfidence(organs),
          activity: calculateSystemActivity(organs),
          health: calculateSystemHealth(organs),
        },
        updatedAt: now,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "organ_completed",
            `${state.organs[action.organId].definition.title} completed processing.`,
            {
              organId: action.organId,
              timestamp: now,
            },
          ),
        ),
      };
    }

    case "SET_ORGAN_RUNTIME_STATE":
      return {
        ...state,
        organs: updateOrgan(
          state,
          action.organId,
          (organ) => ({
            ...organ,
            runtimeState: action.runtimeState,
            updatedAt: now,
          }),
        ),
        updatedAt: now,
      };

    case "SET_ORGAN_INTELLIGENCE_STATUS":
      return {
        ...state,
        organs: updateOrgan(
          state,
          action.organId,
          (organ) => ({
            ...organ,
            intelligenceStatus:
              action.intelligenceStatus,
            updatedAt: now,
          }),
        ),
        updatedAt: now,
      };

    case "UPDATE_ORGAN_METRICS": {
      const organs = updateOrgan(
        state,
        action.organId,
        (organ) => ({
          ...organ,
          metrics: {
            ...organ.metrics,
            ...action.metrics,
          },
          updatedAt: now,
        }),
      );

      return {
        ...state,
        organs,
        metrics: {
          ...state.metrics,
          averageConfidence:
            calculateAverageConfidence(organs),
          activity: calculateSystemActivity(organs),
          health: calculateSystemHealth(organs),
        },
        updatedAt: now,
      };
    }

    case "ENQUEUE_PACKET": {
      const destination = action.packet.to;

      const organs = updateOrgan(
        state,
        destination,
        (organ) => ({
          ...organ,
          packets: {
            ...organ.packets,
            pending: organ.packets.pending + 1,
          },
          updatedAt: now,
        }),
      );

      return {
        ...state,
        organs,
        queue: {
          packets: [
            ...state.queue.packets,
            {
              ...action.packet,
              status: "queued",
            },
          ],
        },
        metrics: {
          ...state.metrics,
          totalPacketsCreated:
            state.metrics.totalPacketsCreated + 1,
        },
        updatedAt: now,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "packet_queued",
            `Knowledge packet queued for ${destination}.`,
            {
              organId: destination,
              packetId: action.packet.id,
              timestamp: now,
            },
          ),
        ),
      };
    }

    case "SET_ACTIVE_PACKET":
      return {
        ...state,
        activePacketId: action.packetId,
        updatedAt: now,
      };

    case "UPDATE_PACKET_STATUS":
      return {
        ...state,
        queue: {
          packets: state.queue.packets.map(
            (packet) =>
              packet.id === action.packetId
                ? {
                    ...packet,
                    status: action.status,
                  }
                : packet,
          ),
        },
        updatedAt: now,
      };

    case "ROUTE_PACKET": {
      const packets = state.queue.packets.map(
        (packet) =>
          packet.id === action.packetId
            ? {
                ...packet,
                from: action.from,
                to: action.to,
                status: "queued" as PacketStatus,
              }
            : packet,
      );

      const organsAfterSource = updateOrgan(
        state,
        action.from,
        (organ) => ({
          ...organ,
          packets: {
            ...organ.packets,
            emitted: organ.packets.emitted + 1,
          },
          updatedAt: now,
        }),
      );

      const organs = {
        ...organsAfterSource,
        [action.to]: {
          ...organsAfterSource[action.to],
          packets: {
            ...organsAfterSource[action.to].packets,
            received:
              organsAfterSource[action.to].packets.received +
              1,
            pending:
              organsAfterSource[action.to].packets.pending +
              1,
          },
          updatedAt: now,
        },
      };

      return {
        ...state,
        organs,
        kernelPhase: "routing",
        queue: {
          packets,
        },
        updatedAt: now,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "packet_routed",
            `Knowledge packet routed from ${action.from} to ${action.to}.`,
            {
              organId: action.to,
              packetId: action.packetId,
              timestamp: now,
            },
          ),
        ),
      };
    }

    case "ARCHIVE_PACKET": {
      const packet = state.queue.packets.find(
        (item) => item.id === action.packetId,
      );

      if (!packet) {
        return state;
      }

      return {
        ...state,
        queue: {
          packets: state.queue.packets.filter(
            (item) => item.id !== action.packetId,
          ),
        },
        archive: [
          ...state.archive,
          {
            ...packet,
            status: "archived",
          },
        ],
        activePacketId:
          state.activePacketId === action.packetId
            ? null
            : state.activePacketId,
        metrics: {
          ...state.metrics,
          totalPacketsProcessed:
            state.metrics.totalPacketsProcessed + 1,
          totalPacketsArchived:
            state.metrics.totalPacketsArchived + 1,
        },
        updatedAt: now,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "packet_archived",
            `Knowledge packet ${action.packetId} archived.`,
            {
              organId: "memory",
              packetId: action.packetId,
              timestamp: now,
            },
          ),
        ),
      };
    }

    case "ADD_EVENT":
      return {
        ...state,
        events: appendEvent(
          state.events,
          action.event,
        ),
        updatedAt: now,
      };

    case "ADD_ERROR":
      return {
        ...state,
        kernelStatus: "error",
        errors: [...state.errors, action.error].slice(-50),
        updatedAt: now,
        events: appendEvent(
          state.events,
          createEpistemeEvent(
            "error",
            action.error.message,
            {
              organId: action.error.organId,
              packetId: action.error.packetId,
              timestamp: action.error.timestamp,
            },
          ),
        ),
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: [],
        kernelStatus:
          state.kernelStatus === "error"
            ? "idle"
            : state.kernelStatus,
        updatedAt: now,
      };

    case "RESET_STATE":
      return createInitialEpistemeState(
        action.timestamp ?? now,
      );

    default:
      return state;
  }
}

/* ==========================================================
   Selectors
========================================================== */

export function selectActiveOrgan(
  state: EpistemeState,
): RuntimeOrgan {
  return state.organs[state.cycle.activeOrgan];
}

export function selectNextOrgan(
  state: EpistemeState,
): RuntimeOrgan {
  return state.organs[state.cycle.nextOrgan];
}

export function selectPreviousOrgan(
  state: EpistemeState,
): RuntimeOrgan | null {
  if (!state.cycle.previousOrgan) return null;

  return state.organs[state.cycle.previousOrgan];
}

export function selectActivePacket(
  state: EpistemeState,
): KnowledgePacket | null {
  if (!state.activePacketId) return null;

  return (
    state.queue.packets.find(
      (packet) =>
        packet.id === state.activePacketId,
    ) ?? null
  );
}

export function selectPacketsForOrgan(
  state: EpistemeState,
  organId: OrganId,
): KnowledgePacket[] {
  return state.queue.packets.filter(
    (packet) => packet.to === organId,
  );
}

export function selectQueuedPackets(
  state: EpistemeState,
): KnowledgePacket[] {
  return state.queue.packets.filter(
    (packet) => packet.status === "queued",
  );
}

export function selectProcessingPackets(
  state: EpistemeState,
): KnowledgePacket[] {
  return state.queue.packets.filter(
    (packet) => packet.status === "processing",
  );
}

export function selectLatestEvents(
  state: EpistemeState,
  limit = 10,
): EpistemeEvent[] {
  return state.events.slice(-limit).reverse();
}

export function selectHasErrors(
  state: EpistemeState,
): boolean {
  return state.errors.length > 0;
}

export function selectIsRunning(
  state: EpistemeState,
): boolean {
  return state.kernelStatus === "running";
}

export function selectCycleComplete(
  state: EpistemeState,
): boolean {
  return (
    state.cycle.completedOrgans.length ===
    CivilizationLoop.length
  );
}

/* ==========================================================
   State Validation
========================================================== */

export function validateEpistemeState(
  state: EpistemeState,
): string[] {
  const errors: string[] = [];

  if (!CivilizationLoop.includes(state.cycle.activeOrgan)) {
    errors.push("Active organ is invalid.");
  }

  if (!CivilizationLoop.includes(state.cycle.nextOrgan)) {
    errors.push("Next organ is invalid.");
  }

  if (
    state.cycle.progress < 0 ||
    state.cycle.progress > 100
  ) {
    errors.push("Cycle progress must be between 0 and 100.");
  }

  if (
    state.metrics.health < 0 ||
    state.metrics.health > 100
  ) {
    errors.push("System health must be between 0 and 100.");
  }

  if (
    state.metrics.synchronization < 0 ||
    state.metrics.synchronization > 100
  ) {
    errors.push(
      "System synchronization must be between 0 and 100.",
    );
  }

  return errors;
}