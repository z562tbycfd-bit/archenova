"use client";

/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   app/components/civilization-intelligence/
   EpistemeKernelBridge.tsx

   PART 1 / 4

   Responsibilities:
   - Bind Episteme Runtime to Civilization Intelligence UI
   - Derive stable visual states from Store and Scheduler
   - Provide DNA / Core / Organ / Packet animation states
   - Expose data attributes and CSS variables
   - Avoid direct DOM mutation
   - Avoid independent timers

   Runtime direction:
   EpistemeProvider
        ↓
   Runtime Store / Scheduler
        ↓
   hooks.ts
        ↓
   EpistemeKernelBridge
        ↓
   Civilization Intelligence UI

   Important:
   - This component must be rendered inside EpistemeProvider.
   - The Bridge does not modify Runtime state during render.
   - The Bridge does not use querySelector or classList.
========================================================== */

import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import {
  EPISTEME_CSS_VARIABLES,
  EPISTEME_DATA_ATTRIBUTES,
  EPISTEME_ORGAN_INDEX,
  EPISTEME_ORGAN_ORDER,
  EPISTEME_ORGANS,
} from "@/lib/episteme/constants";

import {
  useActiveKnowledgePacket,
  useEpistemeControls,
  useEpistemeRuntime,
  useEpistemeSchedulerState,
} from "@/lib/episteme/hooks";

import type {
  EpistemeRuntimeStatus,
  KnowledgePacketPriority,
  KnowledgePacketStatus,
  OrganId,
  RuntimeCycleStatus,
} from "@/lib/episteme/types";

/* ==========================================================
   Bridge Runtime Phase
========================================================== */

export type EpistemeBridgePhase =
  | "offline"
  | "ready"
  | "waiting"
  | "processing"
  | "transitioning"
  | "synchronizing"
  | "completed"
  | "paused"
  | "degraded"
  | "error"
  | "destroyed";

/* ==========================================================
   DNA Animation State
========================================================== */

export type EpistemeDNAState =
  | "dormant"
  | "breathing"
  | "receiving"
  | "thinking"
  | "routing"
  | "synchronizing"
  | "resolved"
  | "degraded"
  | "error";

/* ==========================================================
   Core Animation State
========================================================== */

export type EpistemeCoreState =
  | "dormant"
  | "stable"
  | "awakening"
  | "radiant"
  | "synchronizing"
  | "complete"
  | "degraded"
  | "critical";

/* ==========================================================
   Packet Animation State
========================================================== */

export type EpistemePacketAnimationState =
  | "hidden"
  | "queued"
  | "entering"
  | "processing"
  | "routing"
  | "encoding"
  | "archived"
  | "failed";

/* ==========================================================
   Organ Visual State
========================================================== */

export type EpistemeOrganVisualState =
  | "inactive"
  | "previous"
  | "active"
  | "next"
  | "completed"
  | "synchronizing"
  | "degraded"
  | "error";

/* ==========================================================
   Bridge Animation State
========================================================== */

export interface EpistemeBridgeAnimationState {
  phase: EpistemeBridgePhase;

  dnaState: EpistemeDNAState;

  coreState: EpistemeCoreState;

  packetState:
    EpistemePacketAnimationState;

  activeOrganState:
    EpistemeOrganVisualState;

  motionEnabled: boolean;

  corePulseEnabled: boolean;

  dnaRotationEnabled: boolean;

  helixFlowEnabled: boolean;

  packetVisible: boolean;

  packetMoving: boolean;

  organPulseEnabled: boolean;

  cycleCompletePulse: boolean;

  synchronizationPulse: boolean;

  errorPulse: boolean;
}

/* ==========================================================
   Bridge Data Attributes
========================================================== */

export interface EpistemeBridgeDataAttributes {
  [EPISTEME_DATA_ATTRIBUTES.STATUS]:
    EpistemeRuntimeStatus;

  [EPISTEME_DATA_ATTRIBUTES.ACTIVE_ORGAN]:
    OrganId;

  [EPISTEME_DATA_ATTRIBUTES.NEXT_ORGAN]:
    OrganId;

  [EPISTEME_DATA_ATTRIBUTES.PREVIOUS_ORGAN]:
    OrganId | "none";

  [EPISTEME_DATA_ATTRIBUTES.CYCLE_NUMBER]:
    number;

  [EPISTEME_DATA_ATTRIBUTES.CYCLE_PROGRESS]:
    number;

  [EPISTEME_DATA_ATTRIBUTES.ACTIVE_PACKET]:
    string | "none";

  [EPISTEME_DATA_ATTRIBUTES.SYNCHRONIZING]:
    "true" | "false";

  [EPISTEME_DATA_ATTRIBUTES.READY]:
    "true" | "false";

  "data-bridge-phase":
    EpistemeBridgePhase;

  "data-scheduler-status": string;

  "data-scheduler-mode": string;

  "data-cycle-status":
    RuntimeCycleStatus;

  "data-dna-state":
    EpistemeDNAState;

  "data-core-state":
    EpistemeCoreState;

  "data-packet-state":
    EpistemePacketAnimationState;

  "data-packet-status":
    KnowledgePacketStatus | "none";

  "data-packet-priority":
    KnowledgePacketPriority | "none";

  "data-processing":
    "true" | "false";

  "data-running":
    "true" | "false";

  "data-paused":
    "true" | "false";

  "data-waiting":
    "true" | "false";

  "data-cycle-complete":
    "true" | "false";

  "data-has-error":
    "true" | "false";

  "data-has-fatal-error":
    "true" | "false";

  "data-motion-enabled":
    "true" | "false";
}

/* ==========================================================
   CSS Custom Properties
========================================================== */

type EpistemeCSSProperties =
  CSSProperties &
  Record<
    `--episteme-${string}`,
    string | number
  >;

/* ==========================================================
   Bridge Properties
========================================================== */

export interface EpistemeKernelBridgeProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
  children: ReactNode;

  /**
   * Allows the Bridge output to be disabled without removing
   * the Runtime Provider.
   */
  enabled?: boolean;

  /**
   * Enables visual motion attributes.
   *
   * CSS must still respect prefers-reduced-motion.
   */
  motionEnabled?: boolean;

  /**
   * Adds accessibility status information to the wrapper.
   */
  announceRuntimeState?: boolean;

  /**
   * Optional accessible label for the entire intelligence UI.
   */
  ariaLabel?: string;

  /**
   * Optional callback-ready identifier for testing or CSS.
   */
  bridgeId?: string;
}

/* ==========================================================
   Small Utilities
========================================================== */

function toBooleanAttribute(
  value: boolean,
): "true" | "false" {
  return value
    ? "true"
    : "false";
}

function normalizeRatio(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(0, value),
  );
}

function normalizePercentage(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, value),
  );
}

/* ==========================================================
   Public Organ Binding
========================================================== */

export interface EpistemeBridgeOrganBinding {
  id: OrganId;

  index: number;

  title: string;

  numeral: string;

  operationLabel: string;

  runtimeStatus: string;

  intelligenceStatus: string;

  visualState:
    EpistemeOrganVisualState;

  isActive: boolean;

  isPrevious: boolean;

  isNext: boolean;

  isCompleted: boolean;

  isPacketOrigin: boolean;

  isPacketDestination: boolean;

  isBeforeActive: boolean;

  isAfterActive: boolean;

  progress: number;

  routePosition: number;

  dataAttributes: {
    "data-organ-id":
      OrganId;

    "data-organ-index":
      number;

    "data-organ-state":
      EpistemeOrganVisualState;

    "data-organ-runtime-status":
      string;

    "data-organ-intelligence-status":
      string;

    "data-organ-active":
      "true" | "false";

    "data-organ-previous":
      "true" | "false";

    "data-organ-next":
      "true" | "false";

    "data-organ-completed":
      "true" | "false";

    "data-packet-origin":
      "true" | "false";

    "data-packet-destination":
      "true" | "false";
  };

  style:
    EpistemeCSSProperties;

  ariaLabel: string;
}

/* ==========================================================
   Public Packet Route Binding
========================================================== */

export interface EpistemeBridgePacketRoute {
  packetId:
    string | null;

  title:
    string | null;

  status:
    KnowledgePacketStatus | null;

  priority:
    KnowledgePacketPriority | null;

  type:
    string | null;

  originId:
    OrganId;

  destinationId:
    OrganId;

  originIndex:
    number;

  destinationIndex:
    number;

  originRatio:
    number;

  destinationRatio:
    number;

  routeRatio:
    number;

  routeSpan:
    number;

  direction:
    | "stationary"
    | "forward"
    | "backward"
    | "recursive";

  visible:
    boolean;

  moving:
    boolean;

  processing:
    boolean;

  encoding:
    boolean;

  archived:
    boolean;

  failed:
    boolean;
}

/* ==========================================================
   Public Scheduler Transition
========================================================== */

export interface EpistemeBridgeSchedulerTransition {
  state:
    | "idle"
    | "starting"
    | "processing"
    | "waiting"
    | "paused"
    | "completed"
    | "error"
    | "destroyed";

  status: string;

  mode: string;

  running: boolean;

  paused: boolean;

  waiting: boolean;

  processing: boolean;

  hasScheduledTick: boolean;

  nextTickAt:
    number | null;

  tickCount: number;

  cycleCount: number;

  hiddenByDocument: boolean;

  pausedByVisibility: boolean;

  lastError:
    string | null;
}

/* ==========================================================
   Public Bridge Controls
========================================================== */

export interface EpistemeBridgeControls {
  start:
    () => Promise<void>;

  pause:
    () => void;

  resume:
    () => Promise<void>;

  stop:
    () => void;

  reset:
    (
      preserveArchive?: boolean,
    ) => void;

  tick:
    () => Promise<unknown>;

  processNextStep:
    () => Promise<unknown>;

  processNextCycle:
    () => Promise<void>;

  clearErrors:
    () => void;
}

/* ==========================================================
   Bridge Context Value
========================================================== */

export interface EpistemeKernelBridgeContextValue {
  enabled: boolean;

  runtime:
    ReturnType<
      typeof useEpistemeRuntime
    >;

  scheduler:
    ReturnType<
      typeof useEpistemeSchedulerState
    >;

  activePacket:
    ReturnType<
      typeof useActiveKnowledgePacket
    >;

  phase:
    EpistemeBridgePhase;

  animation:
    EpistemeBridgeAnimationState;

  activeOrganId:
    OrganId;

  previousOrganId:
    OrganId | null;

  nextOrganId:
    OrganId;

  organs:
    Record<
      OrganId,
      EpistemeBridgeOrganBinding
    >;

  activeOrgan:
    EpistemeBridgeOrganBinding;

  previousOrgan:
    EpistemeBridgeOrganBinding | null;

  nextOrgan:
    EpistemeBridgeOrganBinding;

  packetRoute:
    EpistemeBridgePacketRoute;

  schedulerTransition:
    EpistemeBridgeSchedulerTransition;

  controls:
    EpistemeBridgeControls;

  dataAttributes:
    EpistemeBridgeDataAttributes;

  extendedDataAttributes:
    Record<
      string,
      string | number
    >;

  style:
    EpistemeCSSProperties;

  accessibilityMessage:
    string;

  metrics: {
    health: number;

    synchronization: number;

    activity: number;

    queueLoad: number;

    packetConfidence: number;

    packetImportance: number;

    packetRelevance: number;
  };

  cycle: {
    number: number;

    status:
      RuntimeCycleStatus;

    progress: number;

    ratio: number;

    complete: boolean;

    synchronizing: boolean;

    completedOrgans:
      number;
  };

  errors: {
    hasAnyError: boolean;

    hasFatalError: boolean;

    recoverableCount: number;

    fatalCount: number;
  };
}

/* ==========================================================
   Bridge Context
========================================================== */

const EpistemeKernelBridgeContext =
  createContext<
    EpistemeKernelBridgeContextValue | null
  >(null);

/* ==========================================================
   Bridge Context Hook
========================================================== */

export function useEpistemeKernelBridge():
  EpistemeKernelBridgeContextValue {
  const context =
    useContext(
      EpistemeKernelBridgeContext,
    );

  if (!context) {
    throw new Error(
      [
        "Episteme Kernel Bridge Context is unavailable.",
        "Render this component inside <EpistemeKernelBridge>.",
      ].join(" "),
    );
  }

  return context;
}

/* ==========================================================
   Optional Bridge Context Hook
========================================================== */

export function useOptionalEpistemeKernelBridge():
  EpistemeKernelBridgeContextValue | null {
  return useContext(
    EpistemeKernelBridgeContext,
  );
}

/* ==========================================================
   Bridge Component
========================================================== */

export default function EpistemeKernelBridge({
  children,

  enabled = true,

  motionEnabled = true,

  announceRuntimeState = true,

  ariaLabel =
    "ArcheNova Civilization Intelligence Runtime",

  bridgeId =
    "episteme-kernel-bridge",

  className,

  style,

  ...htmlAttributes
}: EpistemeKernelBridgeProps) {
  /* ========================================================
     Runtime Binding
  ======================================================== */

  const runtime =
    useEpistemeRuntime();

  const scheduler =
    useEpistemeSchedulerState();

  const activePacket =
    useActiveKnowledgePacket();

  const controls =
    useEpistemeControls();

  /* ========================================================
     Direct Runtime References
  ======================================================== */

  const activeOrganId =
    runtime.cycle.activeOrgan;

  const previousOrganId =
    runtime.cycle.previousOrgan;

  const nextOrganId =
    runtime.cycle.nextOrgan;

  const activeOrgan =
    runtime.organs[
      activeOrganId
    ];

  const previousOrgan =
    previousOrganId
      ? runtime.organs[
          previousOrganId
        ]
      : null;

  const nextOrgan =
    runtime.organs[
      nextOrganId
    ];

  /* ========================================================
     Core Runtime Conditions
  ======================================================== */

  const isReady =
    runtime.ready &&
    runtime.status !==
      "destroyed";

  const isRunning =
    runtime.running &&
    scheduler.running;

  const isPaused =
    runtime.paused ||
    scheduler.paused;

  const isProcessing =
    scheduler.processing;

  const isWaiting =
    runtime.status ===
      "waiting" ||
    scheduler.waiting;

  const isSynchronizing =
    runtime.synchronizing ||
    runtime.cycle.status ===
      "synchronizing";

  const isCycleComplete =
    runtime.cycle.status ===
      "completed";

  const isDestroyed =
    runtime.status ===
      "destroyed" ||
    scheduler.destroyed;

  const recoverableErrors =
    runtime.errors.filter(
      (error) =>
        error.recoverable,
    );

  const fatalErrors =
    runtime.errors.filter(
      (error) =>
        !error.recoverable,
    );

  const hasAnyError =
    runtime.errors.length > 0;

  const hasFatalError =
    fatalErrors.length > 0;

  const isDegraded =
    runtime.status ===
      "degraded" ||
    (
      hasAnyError &&
      !hasFatalError
    );

  /* ========================================================
     Metric Values
  ======================================================== */

  const cycleProgress =
    normalizePercentage(
      runtime.cycle.progress,
    );

  const cycleRatio =
    normalizeRatio(
      cycleProgress / 100,
    );

  const health =
    normalizePercentage(
      runtime.metrics.health,
    );

  const synchronization =
    normalizePercentage(
      runtime.metrics
        .synchronization,
    );

  const activity =
    normalizePercentage(
      runtime.metrics.activity,
    );

  const queueLoad =
    normalizePercentage(
      runtime.metrics.queueLoad,
    );

  const packetConfidence =
    normalizePercentage(
      activePacket?.metadata
        .confidence ?? 0,
    );

  const packetImportance =
    normalizePercentage(
      activePacket?.metadata
        .importance ?? 0,
    );

  const packetRelevance =
    normalizePercentage(
      activePacket?.metadata
        .relevance ?? 0,
    );

  const activeOrganIndex =
    EPISTEME_ORGAN_INDEX[
      activeOrganId
    ];

  const previousOrganIndex =
    previousOrganId
      ? EPISTEME_ORGAN_INDEX[
          previousOrganId
        ]
      : -1;

  const nextOrganIndex =
    EPISTEME_ORGAN_INDEX[
      nextOrganId
    ];

  const maximumOrganIndex =
    Math.max(
      1,
      EPISTEME_ORGAN_ORDER.length -
        1,
    );

  const organRouteRatio =
    normalizeRatio(
      activeOrganIndex /
        maximumOrganIndex,
    );

  const packetRouteRatio =
    isCycleComplete
      ? 1
      : normalizeRatio(
          Math.max(
            cycleRatio,
            organRouteRatio,
          ),
        );

  /* ========================================================
     Derived Bridge Phase
  ======================================================== */

  const bridgePhase =
    useMemo<
      EpistemeBridgePhase
    >(() => {
      if (!enabled) {
        return "offline";
      }

      if (isDestroyed) {
        return "destroyed";
      }

      if (hasFatalError) {
        return "error";
      }

      if (isDegraded) {
        return "degraded";
      }

      if (isPaused) {
        return "paused";
      }

      if (isSynchronizing) {
        return "synchronizing";
      }

      if (isCycleComplete) {
        return "completed";
      }

      if (isProcessing) {
        return "processing";
      }

      if (
        isRunning &&
        scheduler.waiting
      ) {
        return "transitioning";
      }

      if (isWaiting) {
        return "waiting";
      }

      if (isReady) {
        return "ready";
      }

      return "offline";
    }, [
      enabled,
      hasFatalError,
      isCycleComplete,
      isDegraded,
      isDestroyed,
      isPaused,
      isProcessing,
      isReady,
      isRunning,
      isSynchronizing,
      isWaiting,
      scheduler.waiting,
    ]);

  /* ========================================================
     DNA State
  ======================================================== */

  const dnaState =
    useMemo<
      EpistemeDNAState
    >(() => {
      if (
        hasFatalError ||
        bridgePhase === "error"
      ) {
        return "error";
      }

      if (
        bridgePhase ===
        "degraded"
      ) {
        return "degraded";
      }

      if (isSynchronizing) {
        return "synchronizing";
      }

      if (isCycleComplete) {
        return "resolved";
      }

      if (
        isProcessing &&
        activeOrganId ===
          "observation"
      ) {
        return "receiving";
      }

      if (isProcessing) {
        return "thinking";
      }

      if (
        bridgePhase ===
        "transitioning"
      ) {
        return "routing";
      }

      if (
        isReady ||
        isWaiting ||
        isPaused
      ) {
        return "breathing";
      }

      return "dormant";
    }, [
      activeOrganId,
      bridgePhase,
      hasFatalError,
      isCycleComplete,
      isPaused,
      isProcessing,
      isReady,
      isSynchronizing,
      isWaiting,
    ]);

  /* ========================================================
     Core State
  ======================================================== */

  const coreState =
    useMemo<
      EpistemeCoreState
    >(() => {
      if (
        hasFatalError ||
        bridgePhase === "error"
      ) {
        return "critical";
      }

      if (
        bridgePhase ===
        "degraded"
      ) {
        return "degraded";
      }

      if (isSynchronizing) {
        return "synchronizing";
      }

      if (isCycleComplete) {
        return "complete";
      }

      if (isProcessing) {
        return "radiant";
      }

      if (
        bridgePhase ===
          "transitioning" ||
        bridgePhase ===
          "ready"
      ) {
        return "awakening";
      }

      if (
        isReady ||
        isWaiting ||
        isPaused
      ) {
        return "stable";
      }

      return "dormant";
    }, [
      bridgePhase,
      hasFatalError,
      isCycleComplete,
      isPaused,
      isProcessing,
      isReady,
      isSynchronizing,
      isWaiting,
    ]);

  /* ========================================================
     Packet Animation State
  ======================================================== */

  const packetState =
    useMemo<
      EpistemePacketAnimationState
    >(() => {
      if (!activePacket) {
        if (
          isCycleComplete &&
          runtime.archive.length > 0
        ) {
          return "archived";
        }

        return "hidden";
      }

      if (
        activePacket.status ===
        "failed"
      ) {
        return "failed";
      }

      if (
        activePacket.status ===
        "archived"
      ) {
        return "archived";
      }

      if (
        isSynchronizing ||
        activeOrganId === "memory"
      ) {
        return "encoding";
      }

      if (isProcessing) {
        return "processing";
      }

      if (
        scheduler.waiting &&
        runtime.running
      ) {
        return "routing";
      }

      if (
        activePacket.status ===
        "processing"
      ) {
        return "entering";
      }

      return "queued";
    }, [
      activeOrganId,
      activePacket,
      isCycleComplete,
      isProcessing,
      isSynchronizing,
      runtime.archive.length,
      runtime.running,
      scheduler.waiting,
    ]);

  /* ========================================================
     Active Organ Visual State
  ======================================================== */

  const activeOrganState =
    useMemo<
      EpistemeOrganVisualState
    >(() => {
      if (hasFatalError) {
        return "error";
      }

      if (isDegraded) {
        return "degraded";
      }

      if (isSynchronizing) {
        return "synchronizing";
      }

      if (
        activeOrgan.isCompleted
      ) {
        return "completed";
      }

      if (activeOrgan.isActive) {
        return "active";
      }

      if (activeOrgan.isPrevious) {
        return "previous";
      }

      if (activeOrgan.isNext) {
        return "next";
      }

      return "inactive";
    }, [
      activeOrgan.isActive,
      activeOrgan.isCompleted,
      activeOrgan.isNext,
      activeOrgan.isPrevious,
      hasFatalError,
      isDegraded,
      isSynchronizing,
    ]);

  /* ========================================================
     Animation State
  ======================================================== */

  const animationState =
    useMemo<
      EpistemeBridgeAnimationState
    >(() => {
      const runtimeMotionEnabled =
        enabled &&
        motionEnabled &&
        !isDestroyed &&
        !hasFatalError;

      const packetVisible =
        Boolean(activePacket) &&
        packetState !== "hidden" &&
        packetState !== "archived";

      const packetMoving =
        runtimeMotionEnabled &&
        packetVisible &&
        (
          packetState ===
            "entering" ||
          packetState ===
            "processing" ||
          packetState ===
            "routing" ||
          packetState ===
            "encoding"
        );

      return {
        phase:
          bridgePhase,

        dnaState,

        coreState,

        packetState,

        activeOrganState,

        motionEnabled:
          runtimeMotionEnabled,

        corePulseEnabled:
          runtimeMotionEnabled &&
          (
            isProcessing ||
            isSynchronizing ||
            isCycleComplete
          ),

        dnaRotationEnabled:
          runtimeMotionEnabled &&
          (
            isRunning ||
            isSynchronizing
          ) &&
          !isPaused,

        helixFlowEnabled:
          runtimeMotionEnabled &&
          (
            isProcessing ||
            bridgePhase ===
              "transitioning"
          ),

        packetVisible,

        packetMoving,

        organPulseEnabled:
          runtimeMotionEnabled &&
          isProcessing,

        cycleCompletePulse:
          runtimeMotionEnabled &&
          isCycleComplete,

        synchronizationPulse:
          runtimeMotionEnabled &&
          isSynchronizing,

        errorPulse:
          motionEnabled &&
          (
            hasFatalError ||
            bridgePhase ===
              "error"
          ),
      };
    }, [
      activeOrganState,
      activePacket,
      bridgePhase,
      coreState,
      dnaState,
      enabled,
      hasFatalError,
      isCycleComplete,
      isDestroyed,
      isPaused,
      isProcessing,
      isRunning,
      isSynchronizing,
      motionEnabled,
      packetState,
    ]);

  /* ========================================================
     PART 1 ENDS HERE

     Do not close the component yet.

     Append PART 2 immediately below this comment.

     Part 2 will add:
     - Per-Organ visual bindings
     - Packet route bindings
     - Scheduler transition bindings
     - Runtime data attributes
     - CSS custom properties
     - Accessibility status message
  ======================================================== */

  /* ========================================================
     PART 2 / 4

     Responsibilities:
     - Build per-Organ visual bindings
     - Build Packet route bindings
     - Describe Scheduler transition state
     - Generate Runtime data attributes
     - Generate CSS custom properties
     - Generate accessibility status text
  ======================================================== */

  /* ========================================================
     Organ Visual Binding Type
  ======================================================== */

  interface OrganVisualBinding {
    id: OrganId;

    index: number;

    title: string;

    numeral: string;

    operationLabel: string;

    runtimeStatus:
      typeof runtime.organs[
        OrganId
      ]["runtimeStatus"];

    intelligenceStatus:
      typeof runtime.organs[
        OrganId
      ]["intelligenceStatus"];

    visualState:
      EpistemeOrganVisualState;

    isActive: boolean;

    isPrevious: boolean;

    isNext: boolean;

    isCompleted: boolean;

    isPacketOrigin: boolean;

    isPacketDestination: boolean;

    isBeforeActive: boolean;

    isAfterActive: boolean;

    progress: number;

    routePosition: number;

    dataAttributes: {
      "data-organ-id": OrganId;

      "data-organ-index": number;

      "data-organ-state":
        EpistemeOrganVisualState;

      "data-organ-runtime-status":
        string;

      "data-organ-intelligence-status":
        string;

      "data-organ-active":
        "true" | "false";

      "data-organ-previous":
        "true" | "false";

      "data-organ-next":
        "true" | "false";

      "data-organ-completed":
        "true" | "false";

      "data-packet-origin":
        "true" | "false";

      "data-packet-destination":
        "true" | "false";
    };

    style:
      EpistemeCSSProperties;

    ariaLabel: string;
  }

  /* ========================================================
     Resolve Organ Visual State
  ======================================================== */

  const resolveOrganVisualState = (
    organId: OrganId,
  ): EpistemeOrganVisualState => {
    const organ =
      runtime.organs[organId];

    if (hasFatalError) {
      return "error";
    }

    if (isDegraded) {
      return "degraded";
    }

    if (
      isSynchronizing &&
      (
        organId === "memory" ||
        organ.isCompleted
      )
    ) {
      return "synchronizing";
    }

    if (organ.isActive) {
      return "active";
    }

    if (organ.isPrevious) {
      return "previous";
    }

    if (organ.isNext) {
      return "next";
    }

    if (organ.isCompleted) {
      return "completed";
    }

    return "inactive";
  };

  /* ========================================================
     Per-Organ Bindings
  ======================================================== */

  const organBindings =
    useMemo<
      Record<
        OrganId,
        OrganVisualBinding
      >
    >(() => {
      return EPISTEME_ORGAN_ORDER.reduce(
        (
          result,
          organId,
        ) => {
          const organ =
            runtime.organs[
              organId
            ];

          const definition =
            EPISTEME_ORGANS[
              organId
            ];

          const index =
            EPISTEME_ORGAN_INDEX[
              organId
            ];

          const visualState =
            resolveOrganVisualState(
              organId,
            );

          const progress =
            normalizePercentage(
              organ.progress,
            );

          const routePosition =
            normalizeRatio(
              index /
                maximumOrganIndex,
            );

          const isPacketOrigin =
            activePacket?.from ===
            organId;

          const isPacketDestination =
            activePacket?.to ===
            organId;

          const isBeforeActive =
            index <
            activeOrganIndex;

          const isAfterActive =
            index >
            activeOrganIndex;

          const stateDescription =
            visualState === "active"
              ? `${definition.title} is currently active`
              : visualState ===
                  "completed"
                ? `${definition.title} has completed processing`
                : visualState ===
                    "next"
                  ? `${definition.title} is the next intelligence organ`
                  : visualState ===
                      "previous"
                    ? `${definition.title} was the previous intelligence organ`
                    : visualState ===
                        "synchronizing"
                      ? `${definition.title} is synchronizing`
                      : visualState ===
                          "error"
                        ? `${definition.title} is affected by a runtime error`
                        : visualState ===
                            "degraded"
                          ? `${definition.title} is operating in a degraded state`
                          : `${definition.title} is inactive`;

          result[organId] = {
            id:
              organId,

            index,

            title:
              definition.title,

            numeral:
              definition.numeral,

            operationLabel:
              definition
                .operationLabel,

            runtimeStatus:
              organ.runtimeStatus,

            intelligenceStatus:
              organ.intelligenceStatus,

            visualState,

            isActive:
              organ.isActive,

            isPrevious:
              organ.isPrevious,

            isNext:
              organ.isNext,

            isCompleted:
              organ.isCompleted,

            isPacketOrigin,

            isPacketDestination,

            isBeforeActive,

            isAfterActive,

            progress,

            routePosition,

            dataAttributes: {
              "data-organ-id":
                organId,

              "data-organ-index":
                index,

              "data-organ-state":
                visualState,

              "data-organ-runtime-status":
                organ.runtimeStatus,

              "data-organ-intelligence-status":
                organ.intelligenceStatus,

              "data-organ-active":
                toBooleanAttribute(
                  organ.isActive,
                ),

              "data-organ-previous":
                toBooleanAttribute(
                  organ.isPrevious,
                ),

              "data-organ-next":
                toBooleanAttribute(
                  organ.isNext,
                ),

              "data-organ-completed":
                toBooleanAttribute(
                  organ.isCompleted,
                ),

              "data-packet-origin":
                toBooleanAttribute(
                  isPacketOrigin,
                ),

              "data-packet-destination":
                toBooleanAttribute(
                  isPacketDestination,
                ),
            },

            style: {
              "--episteme-organ-index":
                index,

              "--episteme-organ-progress":
                `${progress}%`,

              "--episteme-organ-progress-ratio":
                progress / 100,

              "--episteme-organ-route-position":
                routePosition,

              "--episteme-organ-confidence":
                `${normalizePercentage(
                  organ.metrics
                    .confidence,
                )}%`,

              "--episteme-organ-activity":
                `${normalizePercentage(
                  organ.metrics
                    .activity,
                )}%`,

              "--episteme-organ-health":
                `${normalizePercentage(
                  organ.metrics
                    .health,
                )}%`,

              "--episteme-organ-synchronization":
                `${normalizePercentage(
                  organ.metrics
                    .synchronization,
                )}%`,
            },

            ariaLabel: [
              definition.numeral,
              definition.title,
              stateDescription,
              `${Math.round(
                progress,
              )} percent complete`,
            ].join(". "),
          };

          return result;
        },
        {} as Record<
          OrganId,
          OrganVisualBinding
        >,
      );
    }, [
      activeOrganIndex,
      activePacket?.from,
      activePacket?.to,
      hasFatalError,
      isDegraded,
      isSynchronizing,
      maximumOrganIndex,
      runtime.organs,
    ]);

  /* ========================================================
     Active / Previous / Next Bindings
  ======================================================== */

  const activeOrganBinding =
    organBindings[
      activeOrganId
    ];

  const previousOrganBinding =
    previousOrganId
      ? organBindings[
          previousOrganId
        ]
      : null;

  const nextOrganBinding =
    organBindings[
      nextOrganId
    ];

  /* ========================================================
     Packet Route Binding
  ======================================================== */

  const packetOriginId =
    activePacket?.from ??
    previousOrganId ??
    activeOrganId;

  const packetDestinationId =
    activePacket?.to ??
    nextOrganId;

  const packetOriginIndex =
    EPISTEME_ORGAN_INDEX[
      packetOriginId
    ];

  const packetDestinationIndex =
    EPISTEME_ORGAN_INDEX[
      packetDestinationId
    ];

  const packetRouteDirection:
  EpistemeBridgePacketRoute["direction"] =
    packetDestinationIndex ===
    packetOriginIndex
      ? "stationary"
      : packetDestinationIndex >
          packetOriginIndex
        ? "forward"
        : packetOriginId ===
              "memory" &&
            packetDestinationId ===
              "observation"
          ? "recursive"
          : "backward";

  const packetRouteSpan =
    packetRouteDirection ===
    "recursive"
      ? 1
      : Math.abs(
          packetDestinationIndex -
            packetOriginIndex,
        );

  const packetOriginRatio =
    normalizeRatio(
      packetOriginIndex /
        maximumOrganIndex,
    );

  const packetDestinationRatio =
    normalizeRatio(
      packetDestinationIndex /
        maximumOrganIndex,
    );

  const packetRouteBinding =
  useMemo<EpistemeBridgePacketRoute>(
    () => ({
        packetId:
          activePacket?.id ??
          null,

        title:
          activePacket?.title ??
          null,

        status:
          activePacket?.status ??
          null,

        priority:
          activePacket?.priority ??
          null,

        type:
          activePacket?.type ??
          null,

        originId:
          packetOriginId,

        destinationId:
          packetDestinationId,

        originIndex:
          packetOriginIndex,

        destinationIndex:
          packetDestinationIndex,

        originRatio:
          packetOriginRatio,

        destinationRatio:
          packetDestinationRatio,

        routeRatio:
          packetRouteRatio,

        routeSpan:
          packetRouteSpan,

        direction:
          packetRouteDirection,

        visible:
          animationState
            .packetVisible,

        moving:
          animationState
            .packetMoving,

        processing:
          isProcessing,

        encoding:
          packetState ===
          "encoding",

        archived:
          packetState ===
          "archived",

        failed:
          packetState ===
          "failed",
      }),
      [
        activePacket?.id,
        activePacket?.priority,
        activePacket?.status,
        activePacket?.title,
        activePacket?.type,
        animationState.packetMoving,
        animationState.packetVisible,
        isProcessing,
        packetDestinationId,
        packetDestinationIndex,
        packetDestinationRatio,
        packetOriginId,
        packetOriginIndex,
        packetOriginRatio,
        packetRouteDirection,
        packetRouteRatio,
        packetRouteSpan,
        packetState,
      ],
    );

  /* ========================================================
     Scheduler Transition Binding
  ======================================================== */

  const hasScheduledTick =
    scheduler.nextTickAt !==
    null;

  const schedulerTransition =
    useMemo(
      () => {
        let transitionState:
          | "idle"
          | "starting"
          | "processing"
          | "waiting"
          | "paused"
          | "completed"
          | "error"
          | "destroyed";

        if (
          scheduler.destroyed
        ) {
          transitionState =
            "destroyed";
        } else if (
          scheduler.status ===
          "error"
        ) {
          transitionState =
            "error";
        } else if (
          scheduler.paused
        ) {
          transitionState =
            "paused";
        } else if (
          scheduler.processing
        ) {
          transitionState =
            "processing";
        } else if (
          scheduler.status ===
          "starting"
        ) {
          transitionState =
            "starting";
        } else if (
          scheduler.status ===
          "completed"
        ) {
          transitionState =
            "completed";
        } else if (
          scheduler.waiting ||
          scheduler.nextTickAt !==
            null
        ) {
          transitionState =
            "waiting";
        } else {
          transitionState =
            "idle";
        }

        return {
          state:
            transitionState,

          status:
            scheduler.status,

          mode:
            scheduler.mode,

          running:
            scheduler.running,

          paused:
            scheduler.paused,

          waiting:
            scheduler.waiting,

          processing:
            scheduler.processing,

          hasScheduledTick:
            scheduler.nextTickAt !==
            null,

          nextTickAt:
            scheduler.nextTickAt,

          tickCount:
            scheduler.tickCount,

          cycleCount:
            scheduler.cycleCount,

          hiddenByDocument:
            scheduler
              .hiddenByDocument,

          pausedByVisibility:
            scheduler
              .pausedByVisibility,

          lastError:
            scheduler.lastError,
        };
      },
      [
        scheduler.cycleCount,
        scheduler.destroyed,
        scheduler.hiddenByDocument,
        scheduler.lastError,
        scheduler.mode,
        scheduler.nextTickAt,
        scheduler.paused,
        scheduler.pausedByVisibility,
        scheduler.processing,
        scheduler.running,
        scheduler.status,
        scheduler.tickCount,
        scheduler.waiting,
      ],
    );

  /* ========================================================
     Runtime Data Attributes
  ======================================================== */

  const bridgeDataAttributes =
    useMemo<
      EpistemeBridgeDataAttributes
    >(() => ({
      [EPISTEME_DATA_ATTRIBUTES.STATUS]:
        runtime.status,

      [EPISTEME_DATA_ATTRIBUTES.ACTIVE_ORGAN]:
        activeOrganId,

      [EPISTEME_DATA_ATTRIBUTES.NEXT_ORGAN]:
        nextOrganId,

      [EPISTEME_DATA_ATTRIBUTES.PREVIOUS_ORGAN]:
        previousOrganId ??
        "none",

      [EPISTEME_DATA_ATTRIBUTES.CYCLE_NUMBER]:
        runtime.cycle.number,

      [EPISTEME_DATA_ATTRIBUTES.CYCLE_PROGRESS]:
        cycleProgress,

      [EPISTEME_DATA_ATTRIBUTES.ACTIVE_PACKET]:
        activePacket?.id ??
        "none",

      [EPISTEME_DATA_ATTRIBUTES.SYNCHRONIZING]:
        toBooleanAttribute(
          isSynchronizing,
        ),

      [EPISTEME_DATA_ATTRIBUTES.READY]:
        toBooleanAttribute(
          isReady,
        ),

      "data-bridge-phase":
        bridgePhase,

      "data-scheduler-status":
        scheduler.status,

      "data-scheduler-mode":
        scheduler.mode,

      "data-cycle-status":
        runtime.cycle.status,

      "data-dna-state":
        dnaState,

      "data-core-state":
        coreState,

      "data-packet-state":
        packetState,

      "data-packet-status":
        activePacket?.status ??
        "none",

      "data-packet-priority":
        activePacket?.priority ??
        "none",

      "data-processing":
        toBooleanAttribute(
          isProcessing,
        ),

      "data-running":
        toBooleanAttribute(
          isRunning,
        ),

      "data-paused":
        toBooleanAttribute(
          isPaused,
        ),

      "data-waiting":
        toBooleanAttribute(
          isWaiting,
        ),

      "data-cycle-complete":
        toBooleanAttribute(
          isCycleComplete,
        ),

      "data-has-error":
        toBooleanAttribute(
          hasAnyError,
        ),

      "data-has-fatal-error":
        toBooleanAttribute(
          hasFatalError,
        ),

      "data-motion-enabled":
        toBooleanAttribute(
          animationState
            .motionEnabled,
        ),
    }), [
      activeOrganId,
      activePacket?.id,
      activePacket?.priority,
      activePacket?.status,
      animationState.motionEnabled,
      bridgePhase,
      coreState,
      cycleProgress,
      dnaState,
      hasAnyError,
      hasFatalError,
      isCycleComplete,
      isPaused,
      isProcessing,
      isReady,
      isRunning,
      isSynchronizing,
      isWaiting,
      nextOrganId,
      packetState,
      previousOrganId,
      runtime.cycle.number,
      runtime.cycle.status,
      runtime.status,
      scheduler.mode,
      scheduler.status,
    ]);

  /* ========================================================
     Extended Data Attributes
  ======================================================== */

  const extendedDataAttributes =
    useMemo(
      () => ({
        "data-active-organ-state":
          activeOrganState,

        "data-active-operation":
          activeOrgan.definition
            .operationLabel,

        "data-previous-operation":
          previousOrgan
            ?.definition
            .operationLabel ??
          "none",

        "data-next-operation":
          nextOrgan.definition
            .operationLabel,

        "data-packet-origin":
          packetOriginId,

        "data-packet-destination":
          packetDestinationId,

        "data-packet-direction":
          packetRouteDirection,

        "data-packet-visible":
          toBooleanAttribute(
            animationState
              .packetVisible,
          ),

        "data-packet-moving":
          toBooleanAttribute(
            animationState
              .packetMoving,
          ),

        "data-core-pulse":
          toBooleanAttribute(
            animationState
              .corePulseEnabled,
          ),

        "data-dna-rotation":
          toBooleanAttribute(
            animationState
              .dnaRotationEnabled,
          ),

        "data-helix-flow":
          toBooleanAttribute(
            animationState
              .helixFlowEnabled,
          ),

        "data-organ-pulse":
          toBooleanAttribute(
            animationState
              .organPulseEnabled,
          ),

        "data-cycle-complete-pulse":
          toBooleanAttribute(
            animationState
              .cycleCompletePulse,
          ),

        "data-synchronization-pulse":
          toBooleanAttribute(
            animationState
              .synchronizationPulse,
          ),

        "data-error-pulse":
          toBooleanAttribute(
            animationState
              .errorPulse,
          ),

        "data-scheduler-transition":
          schedulerTransition.state,

        "data-scheduled-tick":
          toBooleanAttribute(
            hasScheduledTick,
          ),

        "data-tab-hidden":
          toBooleanAttribute(
            scheduler
              .hiddenByDocument,
          ),

        "data-paused-by-visibility":
          toBooleanAttribute(
            scheduler
              .pausedByVisibility,
          ),
      }),
      [
        activeOrgan.definition
          .operationLabel,
        activeOrganState,
        animationState
          .corePulseEnabled,
        animationState
          .cycleCompletePulse,
        animationState
          .dnaRotationEnabled,
        animationState
          .errorPulse,
        animationState
          .helixFlowEnabled,
        animationState
          .organPulseEnabled,
        animationState
          .packetMoving,
        animationState
          .packetVisible,
        animationState
          .synchronizationPulse,
        hasScheduledTick,
        nextOrgan.definition
          .operationLabel,
        packetDestinationId,
        packetOriginId,
        packetRouteDirection,
        previousOrgan
          ?.definition
          .operationLabel,
        scheduler.hiddenByDocument,
        scheduler.pausedByVisibility,
        schedulerTransition.state,
      ],
    );

  /* ========================================================
     CSS Custom Properties
  ======================================================== */

  const bridgeCSSProperties =
    useMemo<
      EpistemeCSSProperties
    >(() => ({
      [EPISTEME_CSS_VARIABLES.CYCLE_PROGRESS]:
        `${cycleProgress}%`,

      [EPISTEME_CSS_VARIABLES.HEALTH]:
        `${health}%`,

      [EPISTEME_CSS_VARIABLES.SYNCHRONIZATION]:
        `${synchronization}%`,

      [EPISTEME_CSS_VARIABLES.ACTIVITY]:
        `${activity}%`,

      [EPISTEME_CSS_VARIABLES.CONFIDENCE]:
        `${packetConfidence}%`,

      [EPISTEME_CSS_VARIABLES.ACTIVE_ORGAN_INDEX]:
        activeOrganIndex,

      [EPISTEME_CSS_VARIABLES.QUEUE_LOAD]:
        `${queueLoad}%`,

      "--episteme-cycle-ratio":
        cycleRatio,

      "--episteme-organ-route-ratio":
        organRouteRatio,

      "--episteme-packet-route-ratio":
        packetRouteRatio,

      "--episteme-packet-origin-index":
        packetOriginIndex,

      "--episteme-packet-destination-index":
        packetDestinationIndex,

      "--episteme-packet-origin-ratio":
        packetOriginRatio,

      "--episteme-packet-destination-ratio":
        packetDestinationRatio,

      "--episteme-packet-route-span":
        packetRouteSpan,

      "--episteme-packet-importance":
        `${packetImportance}%`,

      "--episteme-packet-relevance":
        `${packetRelevance}%`,

      "--episteme-active-organ-progress":
        `${normalizePercentage(
          activeOrgan.progress,
        )}%`,

      "--episteme-active-organ-activity":
        `${normalizePercentage(
          activeOrgan.metrics
            .activity,
        )}%`,

      "--episteme-active-organ-confidence":
        `${normalizePercentage(
          activeOrgan.metrics
            .confidence,
        )}%`,

      "--episteme-active-organ-health":
        `${normalizePercentage(
          activeOrgan.metrics
            .health,
        )}%`,

      "--episteme-previous-organ-index":
        previousOrganIndex,

      "--episteme-next-organ-index":
        nextOrganIndex,

      "--episteme-total-organs":
        EPISTEME_ORGAN_ORDER.length,

      "--episteme-completed-organs":
        runtime.cycle
          .completedOrgans.length,

      "--episteme-runtime-error-count":
        runtime.errors.length,

      "--episteme-recoverable-error-count":
        recoverableErrors.length,

      "--episteme-fatal-error-count":
        fatalErrors.length,

      "--episteme-scheduler-tick-count":
        scheduler.tickCount,

      "--episteme-scheduler-cycle-count":
        scheduler.cycleCount,
    }), [
      activeOrgan.metrics.activity,
      activeOrgan.metrics.confidence,
      activeOrgan.metrics.health,
      activeOrgan.progress,
      activeOrganIndex,
      activity,
      cycleProgress,
      cycleRatio,
      fatalErrors.length,
      health,
      nextOrganIndex,
      organRouteRatio,
      packetConfidence,
      packetDestinationIndex,
      packetDestinationRatio,
      packetImportance,
      packetOriginIndex,
      packetOriginRatio,
      packetRelevance,
      packetRouteRatio,
      packetRouteSpan,
      previousOrganIndex,
      queueLoad,
      recoverableErrors.length,
      runtime.cycle
        .completedOrgans.length,
      runtime.errors.length,
      scheduler.cycleCount,
      scheduler.tickCount,
      synchronization,
    ]);

  /* ========================================================
     Accessibility Status Message
  ======================================================== */

  const accessibilityStatusMessage =
    useMemo(
      () => {
        if (isDestroyed) {
          return (
            "Episteme Runtime has been destroyed."
          );
        }

        if (hasFatalError) {
          return [
            "Episteme Runtime has encountered a critical error.",
            fatalErrors[
              fatalErrors.length - 1
            ]?.message ??
              "",
          ]
            .filter(Boolean)
            .join(" ");
        }

        if (isDegraded) {
          return [
            "Episteme Runtime is operating in a degraded state.",
            recoverableErrors[
              recoverableErrors.length -
                1
            ]?.message ??
              "",
          ]
            .filter(Boolean)
            .join(" ");
        }

        if (isSynchronizing) {
          return [
            "Civilization Intelligence is synchronizing.",
            `Cycle ${runtime.cycle.number}.`,
            "Memory is encoding the completed intelligence cycle.",
          ].join(" ");
        }

        if (isCycleComplete) {
          return [
            `Civilization Intelligence cycle ${runtime.cycle.number} is complete.`,
            `${runtime.cycle.completedOrgans.length} of ${EPISTEME_ORGAN_ORDER.length} organs completed.`,
          ].join(" ");
        }

        if (isPaused) {
          return [
            "Episteme Runtime is paused.",
            `${activeOrgan.definition.title} remains the current intelligence organ.`,
          ].join(" ");
        }

        if (isProcessing) {
          return [
            `${activeOrgan.definition.title} is active.`,
            `${activeOrgan.definition.operationLabel} knowledge packet`,
            activePacket?.title
              ? `"${activePacket.title}".`
              : ".",
            `${Math.round(
              cycleProgress,
            )} percent of the cycle is complete.`,
          ].join(" ");
        }

        if (
          scheduler.waiting &&
          runtime.running
        ) {
          return [
            `${activeOrgan.definition.title} completed its current operation.`,
            `${nextOrgan.definition.title} is next.`,
          ].join(" ");
        }

        if (isWaiting) {
          return (
            "Episteme Runtime is awaiting a Knowledge Packet."
          );
        }

        if (isReady) {
          return (
            "Episteme Runtime is ready."
          );
        }

        return (
          "Episteme Runtime is offline."
        );
      },
      [
        activeOrgan.definition
          .operationLabel,
        activeOrgan.definition.title,
        activePacket?.title,
        cycleProgress,
        fatalErrors,
        hasFatalError,
        isCycleComplete,
        isDegraded,
        isDestroyed,
        isPaused,
        isProcessing,
        isReady,
        isSynchronizing,
        isWaiting,
        nextOrgan.definition.title,
        recoverableErrors,
        runtime.cycle
          .completedOrgans.length,
        runtime.cycle.number,
        runtime.running,
        scheduler.waiting,
      ],
    );

  /* ========================================================
     Bridge Control Binding

     These references are prepared for Part 3 controls and
     optional interaction elements.
  ======================================================== */

  const bridgeControls =
    useMemo(
      () => ({
        start:
          controls.start,

        pause:
          controls.pause,

        resume:
          controls.resume,

        stop:
          controls.stop,

        reset:
          controls.reset,

        tick:
          controls.tick,

        processNextStep:
          controls
            .processNextStep,

        processNextCycle:
          controls
            .processNextCycle,

        clearErrors:
          controls.clearErrors,
      }),
      [controls],
    );

  /* ========================================================
     PART 2 ENDS HERE

     Do not close the component yet.

     Append PART 3 immediately below this comment.

     Part 3 will add:
     - Bridge Context
     - Child component access hooks
     - Runtime render payload
     - Optional status announcement
     - Wrapper class composition
     - Style merging
     - Safe disabled-state behavior
  ======================================================== */

  /* ========================================================
     PART 3 / 4

     Responsibilities:
     - Create the child-facing Bridge Context
     - Create the Runtime render payload
     - Compose wrapper classes
     - Merge Runtime CSS variables
     - Build safe disabled-state output
     - Prepare accessibility announcements
     - Prepare final wrapper properties
  ======================================================== */

  /* ========================================================
     Public Organ Bindings
  ======================================================== */

  const publicOrganBindings =
    organBindings as Record<
      OrganId,
      EpistemeBridgeOrganBinding
    >;

  const publicActiveOrganBinding =
    activeOrganBinding as
      EpistemeBridgeOrganBinding;

  const publicPreviousOrganBinding =
    previousOrganBinding as
      | EpistemeBridgeOrganBinding
      | null;

  const publicNextOrganBinding =
    nextOrganBinding as
      EpistemeBridgeOrganBinding;

  /* ========================================================
     Disabled-State Data Attributes

     The Runtime may continue to exist while the visual Bridge
     is disabled. In that case, animation and active visual
     output are suppressed without modifying Store state.
  ======================================================== */

  const disabledDataAttributes =
    useMemo(
      () => ({
        [EPISTEME_DATA_ATTRIBUTES.STATUS]:
          "offline" as
            EpistemeRuntimeStatus,

        [EPISTEME_DATA_ATTRIBUTES.ACTIVE_ORGAN]:
          activeOrganId,

        [EPISTEME_DATA_ATTRIBUTES.NEXT_ORGAN]:
          nextOrganId,

        [EPISTEME_DATA_ATTRIBUTES.PREVIOUS_ORGAN]:
          previousOrganId ??
          "none",

        [EPISTEME_DATA_ATTRIBUTES.CYCLE_NUMBER]:
          runtime.cycle.number,

        [EPISTEME_DATA_ATTRIBUTES.CYCLE_PROGRESS]:
          cycleProgress,

        [EPISTEME_DATA_ATTRIBUTES.ACTIVE_PACKET]:
          activePacket?.id ??
          "none",

        [EPISTEME_DATA_ATTRIBUTES.SYNCHRONIZING]:
          "false" as const,

        [EPISTEME_DATA_ATTRIBUTES.READY]:
          "false" as const,

        "data-bridge-phase":
          "offline" as const,

        "data-scheduler-status":
          scheduler.status,

        "data-scheduler-mode":
          scheduler.mode,

        "data-cycle-status":
          runtime.cycle.status,

        "data-dna-state":
          "dormant" as const,

        "data-core-state":
          "dormant" as const,

        "data-packet-state":
          "hidden" as const,

        "data-packet-status":
          activePacket?.status ??
          "none",

        "data-packet-priority":
          activePacket?.priority ??
          "none",

        "data-processing":
          "false" as const,

        "data-running":
          "false" as const,

        "data-paused":
          "false" as const,

        "data-waiting":
          "false" as const,

        "data-cycle-complete":
          "false" as const,

        "data-has-error":
          toBooleanAttribute(
            hasAnyError,
          ),

        "data-has-fatal-error":
          toBooleanAttribute(
            hasFatalError,
          ),

        "data-motion-enabled":
          "false" as const,
      }),
      [
        activeOrganId,
        activePacket?.id,
        activePacket?.priority,
        activePacket?.status,
        cycleProgress,
        hasAnyError,
        hasFatalError,
        nextOrganId,
        previousOrganId,
        runtime.cycle.number,
        runtime.cycle.status,
        scheduler.mode,
        scheduler.status,
      ],
    );

  /* ========================================================
     Resolved Data Attributes
  ======================================================== */

  const resolvedBridgeDataAttributes =
    enabled
      ? bridgeDataAttributes
      : disabledDataAttributes;

  const resolvedExtendedDataAttributes =
    useMemo(
      () => {
        if (enabled) {
          return (
            extendedDataAttributes
          );
        }

        return {
          ...extendedDataAttributes,

          "data-active-organ-state":
            "inactive",

          "data-packet-visible":
            "false",

          "data-packet-moving":
            "false",

          "data-core-pulse":
            "false",

          "data-dna-rotation":
            "false",

          "data-helix-flow":
            "false",

          "data-organ-pulse":
            "false",

          "data-cycle-complete-pulse":
            "false",

          "data-synchronization-pulse":
            "false",

          "data-error-pulse":
            "false",
        };
      },
      [
        enabled,
        extendedDataAttributes,
      ],
    );

  /* ========================================================
     Wrapper Class Composition
  ======================================================== */

  const bridgeClassName =
    useMemo(
      () => {
        return [
          "episteme-kernel-bridge",

          enabled
            ? "is-episteme-enabled"
            : "is-episteme-disabled",

          `is-phase-${bridgePhase}`,

          `is-dna-${dnaState}`,

          `is-core-${coreState}`,

          `is-packet-${packetState}`,

          `is-organ-${activeOrganId}`,

          animationState
            .motionEnabled
            ? "has-runtime-motion"
            : "has-static-runtime",

          animationState
            .packetVisible
            ? "has-visible-packet"
            : "has-hidden-packet",

          animationState
            .packetMoving
            ? "has-moving-packet"
            : null,

          isProcessing
            ? "is-processing"
            : null,

          isSynchronizing
            ? "is-synchronizing"
            : null,

          isCycleComplete
            ? "is-cycle-complete"
            : null,

          isPaused
            ? "is-paused"
            : null,

          isWaiting
            ? "is-waiting"
            : null,

          isDegraded
            ? "is-degraded"
            : null,

          hasFatalError
            ? "has-fatal-error"
            : null,

          scheduler.hiddenByDocument
            ? "is-document-hidden"
            : null,

          className,
        ]
          .filter(Boolean)
          .join(" ");
      },
      [
        activeOrganId,
        animationState
          .motionEnabled,
        animationState
          .packetMoving,
        animationState
          .packetVisible,
        bridgePhase,
        className,
        coreState,
        dnaState,
        enabled,
        hasFatalError,
        isCycleComplete,
        isDegraded,
        isPaused,
        isProcessing,
        isSynchronizing,
        isWaiting,
        packetState,
        scheduler.hiddenByDocument,
      ],
    );

  /* ========================================================
     User Style Normalization
  ======================================================== */

  const userStyle =
    (
      style ??
      {}
    ) as EpistemeCSSProperties;

  /* ========================================================
     Merged Wrapper Style
  ======================================================== */

  const mergedBridgeStyle =
    useMemo<
      EpistemeCSSProperties
    >(() => ({
      ...bridgeCSSProperties,

      /*
       * User-provided style is intentionally applied last.
       * This allows page-level visual tuning without changing
       * Runtime state or Bridge implementation.
       */
      ...userStyle,
    }), [
      bridgeCSSProperties,
      userStyle,
    ]);

  /* ========================================================
     Context Runtime Metrics
  ======================================================== */

  const bridgeMetrics =
    useMemo(
      () => ({
        health,

        synchronization,

        activity,

        queueLoad,

        packetConfidence,

        packetImportance,

        packetRelevance,
      }),
      [
        activity,
        health,
        packetConfidence,
        packetImportance,
        packetRelevance,
        queueLoad,
        synchronization,
      ],
    );

  /* ========================================================
     Context Cycle State
  ======================================================== */

  const bridgeCycle =
    useMemo(
      () => ({
        number:
          runtime.cycle.number,

        status:
          runtime.cycle.status,

        progress:
          cycleProgress,

        ratio:
          cycleRatio,

        complete:
          isCycleComplete,

        synchronizing:
          isSynchronizing,

        completedOrgans:
          runtime.cycle
            .completedOrgans
            .length,
      }),
      [
        cycleProgress,
        cycleRatio,
        isCycleComplete,
        isSynchronizing,
        runtime.cycle
          .completedOrgans
          .length,
        runtime.cycle.number,
        runtime.cycle.status,
      ],
    );

  /* ========================================================
     Context Error State
  ======================================================== */

  const bridgeErrors =
    useMemo(
      () => ({
        hasAnyError,

        hasFatalError,

        recoverableCount:
          recoverableErrors.length,

        fatalCount:
          fatalErrors.length,
      }),
      [
        fatalErrors.length,
        hasAnyError,
        hasFatalError,
        recoverableErrors.length,
      ],
    );

  /* ========================================================
     Bridge Context Value
  ======================================================== */

  const bridgeContextValue =
    useMemo<
      EpistemeKernelBridgeContextValue
    >(() => ({
      enabled,

      runtime,

      scheduler,

      activePacket,

      phase:
        enabled
          ? bridgePhase
          : "offline",

      animation:
        enabled
          ? animationState
          : {
              ...animationState,

              phase: "offline",

              dnaState:
                "dormant",

              coreState:
                "dormant",

              packetState:
                "hidden",

              activeOrganState:
                "inactive",

              motionEnabled:
                false,

              corePulseEnabled:
                false,

              dnaRotationEnabled:
                false,

              helixFlowEnabled:
                false,

              packetVisible:
                false,

              packetMoving:
                false,

              organPulseEnabled:
                false,

              cycleCompletePulse:
                false,

              synchronizationPulse:
                false,

              errorPulse:
                false,
            },

      activeOrganId,

      previousOrganId,

      nextOrganId,

      organs:
        publicOrganBindings,

      activeOrgan:
        publicActiveOrganBinding,

      previousOrgan:
        publicPreviousOrganBinding,

      nextOrgan:
        publicNextOrganBinding,

      packetRoute:
        packetRouteBinding,

      schedulerTransition,

      controls:
        bridgeControls,

      dataAttributes:
        resolvedBridgeDataAttributes as
          EpistemeBridgeDataAttributes,

      extendedDataAttributes:
        resolvedExtendedDataAttributes,

      style:
        mergedBridgeStyle,

      accessibilityMessage:
        enabled
          ? accessibilityStatusMessage
          : "Episteme visual Runtime bridge is disabled.",

      metrics:
        bridgeMetrics,

      cycle:
        bridgeCycle,

      errors:
        bridgeErrors,
    }), [
      accessibilityStatusMessage,
      activeOrganId,
      activePacket,
      animationState,
      bridgeControls,
      bridgeCycle,
      bridgeErrors,
      bridgeMetrics,
      bridgePhase,
      enabled,
      mergedBridgeStyle,
      nextOrganId,
      packetRouteBinding,
      previousOrganId,
      publicActiveOrganBinding,
      publicNextOrganBinding,
      publicOrganBindings,
      publicPreviousOrganBinding,
      resolvedBridgeDataAttributes,
      resolvedExtendedDataAttributes,
      runtime,
      scheduler,
      schedulerTransition,
    ]);

  /* ========================================================
     Accessibility Announcement Properties
  ======================================================== */

  const announcementProperties =
    useMemo(
      () => ({
        role:
          "status" as const,

        "aria-live":
          hasFatalError
            ? (
                "assertive" as const
              )
            : (
                "polite" as const
              ),

        "aria-atomic":
          true,

        "data-episteme-announcement":
          "true",
      }),
      [
        hasFatalError,
      ],
    );

  /* ========================================================
     Final Wrapper Accessibility
  ======================================================== */

  const wrapperAccessibility =
    useMemo(
      () => ({
        role:
          htmlAttributes.role ??
          "region",

        "aria-label":
          htmlAttributes[
            "aria-label"
          ] ??
          ariaLabel,

        "aria-busy":
          isProcessing ||
          isSynchronizing,

        "aria-describedby":
          announceRuntimeState
            ? `${bridgeId}-runtime-status`
            : htmlAttributes[
                "aria-describedby"
              ],
      }),
      [
        announceRuntimeState,
        ariaLabel,
        bridgeId,
        htmlAttributes,
        isProcessing,
        isSynchronizing,
      ],
    );

  /* ========================================================
     Sanitized HTML Attributes

     Attributes controlled by the Bridge are removed from the
     spread object so they cannot unintentionally override the
     Runtime-derived values.
  ======================================================== */

  const {
    role:
      _providedRole,

    "aria-label":
      _providedAriaLabel,

    "aria-describedby":
      _providedAriaDescribedBy,

    ...safeHTMLAttributes
  } = htmlAttributes;

  /* ========================================================
     Render Payload

     Part 4 uses this payload for optional developer tooling,
     Packet Flow, Runtime Panel and render-prop integration.
  ======================================================== */

  const renderPayload =
    useMemo(
      () => ({
        runtime,

        scheduler,

        activePacket,

        activeOrganId,

        previousOrganId,

        nextOrganId,

        activeOrgan:
          publicActiveOrganBinding,

        previousOrgan:
          publicPreviousOrganBinding,

        nextOrgan:
          publicNextOrganBinding,

        organs:
          publicOrganBindings,

        packetRoute:
          packetRouteBinding,

        schedulerTransition,

        animation:
          animationState,

        controls:
          bridgeControls,

        accessibilityMessage:
          accessibilityStatusMessage,
      }),
      [
        accessibilityStatusMessage,
        activeOrganId,
        activePacket,
        animationState,
        bridgeControls,
        nextOrganId,
        packetRouteBinding,
        previousOrganId,
        publicActiveOrganBinding,
        publicNextOrganBinding,
        publicOrganBindings,
        publicPreviousOrganBinding,
        runtime,
        scheduler,
        schedulerTransition,
      ],
    );

  /*
   * Keep the payload referenced before Part 4 integrates
   * optional debug and render-prop behavior.
   */
  void renderPayload;

  /* ========================================================
     PART 3 ENDS HERE

     Do not close the component yet.

     Append PART 4 immediately below this comment.

     Part 4 will add:
     - Final Context Provider
     - Runtime wrapper output
     - Accessible live status
     - Child rendering
     - Optional debug metadata
     - Component closure
     - Public helper exports
  ======================================================== */

  /* ========================================================
     PART 4 / 4

     Responsibilities:
     - Render the final Bridge Context Provider
     - Render the Runtime-controlled wrapper
     - Apply data attributes and CSS variables
     - Render accessible Runtime announcements
     - Render non-visual Runtime metadata
     - Render Civilization Intelligence children
     - Complete the Bridge component
  ======================================================== */

  /* ========================================================
     Runtime Metadata

     This metadata layer is intentionally non-visual.
     It allows browser inspection and future diagnostic tools
     to read the current Runtime position without directly
     accessing Store internals.
  ======================================================== */

  const runtimeMetadata =
    useMemo(
      () => ({
        runtimeVersion:
          runtime.version,

        runtimeStatus:
          runtime.status,

        schedulerStatus:
          scheduler.status,

        schedulerMode:
          scheduler.mode,

        bridgePhase:
          enabled
            ? bridgePhase
            : "offline",

        cycleStatus:
          runtime.cycle.status,

        cycleNumber:
          runtime.cycle.number,

        cycleProgress:
          cycleProgress,

        activeOrgan:
          activeOrganId,

        previousOrgan:
          previousOrganId ??
          "none",

        nextOrgan:
          nextOrganId,

        activePacket:
          activePacket?.id ??
          "none",

        packetOrigin:
          packetRouteBinding
            .originId,

        packetDestination:
          packetRouteBinding
            .destinationId,

        packetDirection:
          packetRouteBinding
            .direction,

        packetState:
          enabled
            ? packetState
            : "hidden",

        dnaState:
          enabled
            ? dnaState
            : "dormant",

        coreState:
          enabled
            ? coreState
            : "dormant",

        processing:
          enabled &&
          isProcessing,

        synchronizing:
          enabled &&
          isSynchronizing,

        cycleComplete:
          enabled &&
          isCycleComplete,

        errorCount:
          runtime.errors.length,

        fatalErrorCount:
          fatalErrors.length,

        recoverableErrorCount:
          recoverableErrors.length,
      }),
      [
        activeOrganId,
        activePacket?.id,
        bridgePhase,
        coreState,
        cycleProgress,
        dnaState,
        enabled,
        fatalErrors.length,
        isCycleComplete,
        isProcessing,
        isSynchronizing,
        nextOrganId,
        packetRouteBinding
          .destinationId,
        packetRouteBinding
          .direction,
        packetRouteBinding
          .originId,
        packetState,
        previousOrganId,
        recoverableErrors.length,
        runtime.cycle.number,
        runtime.cycle.status,
        runtime.errors.length,
        runtime.status,
        runtime.version,
        scheduler.mode,
        scheduler.status,
      ],
    );

  /* ========================================================
     Development Metadata String

     Kept compact so it can safely live in a data attribute.
  ======================================================== */

  const runtimeMetadataString =
    useMemo(
      () => {
        try {
          return JSON.stringify(
            runtimeMetadata,
          );
        } catch {
          return "";
        }
      },
      [runtimeMetadata],
    );

  /* ========================================================
     Final Render
  ======================================================== */

  return (
    <EpistemeKernelBridgeContext.Provider
      value={bridgeContextValue}
    >
      <div
        {...safeHTMLAttributes}
        {...resolvedBridgeDataAttributes}
        {...resolvedExtendedDataAttributes}
        {...wrapperAccessibility}
        id={bridgeId}
        className={bridgeClassName}
        style={mergedBridgeStyle}
        data-episteme-kernel-bridge="true"
        data-episteme-runtime-version={
          runtime.version
        }
        data-runtime-revision={
          runtime.updatedAt
        }
        data-runtime-metadata={
          runtimeMetadataString
        }
      >
        {/* ==================================================
            Accessible Runtime Status

            This element is visually hidden through CSS but
            remains available to assistive technologies.
        ================================================== */}

        {announceRuntimeState ? (
          <span
            {...announcementProperties}
            id={`${bridgeId}-runtime-status`}
            className="episteme-runtime-announcement"
          >
            {
              enabled
                ? accessibilityStatusMessage
                : "Episteme visual Runtime bridge is disabled."
            }
          </span>
        ) : null}

        {/* ==================================================
            Non-visual Runtime Metadata

            These values are useful for:
            - Browser inspection
            - Automated visual testing
            - Future Runtime diagnostics
            - Packet Flow synchronization
        ================================================== */}

        <span
          className="episteme-runtime-metadata"
          aria-hidden="true"
          hidden
          data-runtime-status={
            runtimeMetadata
              .runtimeStatus
          }
          data-scheduler-status={
            runtimeMetadata
              .schedulerStatus
          }
          data-scheduler-mode={
            runtimeMetadata
              .schedulerMode
          }
          data-bridge-phase={
            runtimeMetadata
              .bridgePhase
          }
          data-cycle-status={
            runtimeMetadata
              .cycleStatus
          }
          data-cycle-number={
            runtimeMetadata
              .cycleNumber
          }
          data-cycle-progress={
            runtimeMetadata
              .cycleProgress
          }
          data-active-organ={
            runtimeMetadata
              .activeOrgan
          }
          data-previous-organ={
            runtimeMetadata
              .previousOrgan
          }
          data-next-organ={
            runtimeMetadata
              .nextOrgan
          }
          data-active-packet={
            runtimeMetadata
              .activePacket
          }
          data-packet-origin={
            runtimeMetadata
              .packetOrigin
          }
          data-packet-destination={
            runtimeMetadata
              .packetDestination
          }
          data-packet-direction={
            runtimeMetadata
              .packetDirection
          }
          data-packet-state={
            runtimeMetadata
              .packetState
          }
          data-dna-state={
            runtimeMetadata
              .dnaState
          }
          data-core-state={
            runtimeMetadata
              .coreState
          }
          data-processing={toBooleanAttribute(
            runtimeMetadata
              .processing,
          )}
          data-synchronizing={toBooleanAttribute(
            runtimeMetadata
              .synchronizing,
          )}
          data-cycle-complete={toBooleanAttribute(
            runtimeMetadata
              .cycleComplete,
          )}
          data-error-count={
            runtimeMetadata
              .errorCount
          }
          data-fatal-error-count={
            runtimeMetadata
              .fatalErrorCount
          }
          data-recoverable-error-count={
            runtimeMetadata
              .recoverableErrorCount
          }
        />

        {/* ==================================================
            Civilization Intelligence UI

            Child components can access the Bridge through:

            useEpistemeKernelBridge()
        ================================================== */}

        <div
          className="episteme-kernel-bridge__content"
          data-episteme-content="true"
        >
          {children}
        </div>
      </div>
    </EpistemeKernelBridgeContext.Provider>
  );
}