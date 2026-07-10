"use client";

/* ==========================================================
   Phase 5 Part 3
   Episteme UI Bridge

   File:
   app/components/civilization-intelligence/
   EpistemeKernelBridge.tsx

   Responsibilities:
   - Connect Episteme Scheduler / Kernel to the UI
   - Expose the active Organ through CSS data attributes
   - Synchronize Core, DNA, Organ cards, and packet flow
   - Insert an initial Knowledge Packet
   - Keep the current visual layout unchanged
========================================================== */

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  EpistemeProvider,
  useActiveKnowledgePacket,
  useCivilizationCycle,
  useEpistemeControls,
  useEpistemeMetrics,
  useEpistemeOrgans,
  useEpistemeScheduler,
  useEpistemeStatus,
} from "@/lib/episteme/hooks";

import type {
  EpistemeKernelInput,
} from "@/lib/episteme/kernel";

import type {
  OrganId,
} from "@/lib/episteme/organ";

/* ==========================================================
   Public Properties
========================================================== */

export interface EpistemeKernelBridgeProps {
  children: ReactNode;

  /**
   * Start Episteme automatically after the component mounts.
   */
  autoStart?: boolean;

  /**
   * Insert the initial packet automatically.
   */
  ingestInitialPacket?: boolean;

  /**
   * Optional custom first packet.
   */
  initialPacket?: EpistemeKernelInput;

  /**
   * Time between scheduled UI cycles.
   */
  tickIntervalMs?: number;

  /**
   * Time spent inside each Organ.
   */
  organProcessingMs?: number;

  /**
   * Time used by the final synchronization state.
   */
  synchronizationMs?: number;

  /**
   * Generate placeholder packets while the queue is empty.
   *
   * Keep this false when only real ArcheNova data should move
   * through the system.
   */
  generatePacketsWhenIdle?: boolean;

  /**
   * Optional additional class.
   */
  className?: string;
}

/* ==========================================================
   Default Initial Packet
========================================================== */

const DEFAULT_INITIAL_PACKET: EpistemeKernelInput = {
  title:
    "Civilization Intelligence initialization",

  summary:
    "Episteme has begun observing the current state of civilization.",

  content:
    [
      "This initial Knowledge Packet activates the six cognitive organs.",
      "Observation acquires the signal.",
      "Understanding integrates its meaning.",
      "Reasoning evaluates consequences.",
      "Design forms an architecture.",
      "Realization converts architecture into capability.",
      "Memory preserves the completed intelligence cycle.",
    ].join("\n\n"),

  type: "signal",

  priority: "normal",

  source: {
    name: "ArcheNova",
    provider: "Episteme Kernel Bridge",
  },

  tags: [
    "archenova",
    "episteme",
    "civilization-intelligence",
    "initialization",
  ],

  confidence: 64,
  importance: 86,
  relevance: 94,
};

/* ==========================================================
   Organ → CSS number mapping
========================================================== */

const ORGAN_INDEX: Record<OrganId, number> = {
  observation: 1,
  understanding: 2,
  reasoning: 3,
  design: 4,
  realization: 5,
  memory: 6,
};

/* ==========================================================
   Bridge Provider
========================================================== */

export default function EpistemeKernelBridge({
  children,

  autoStart = true,

  ingestInitialPacket = true,

  initialPacket = DEFAULT_INITIAL_PACKET,

  tickIntervalMs = 1_800,

  organProcessingMs = 2_400,

  synchronizationMs = 1_600,

  generatePacketsWhenIdle = false,

  className = "",
}: EpistemeKernelBridgeProps) {
  return (
    <EpistemeProvider
      autoStart={false}
      stopOnUnmount
      destroyOnUnmount
      config={{
        mode: "automatic",

        autoStart: false,

        initialDelayMs: 500,

        tickIntervalMs,

        generatePacketsWhenIdle,

        generatedPacketIntervalMs: 20_000,

        pauseWhenHidden: true,

        resumeWhenVisible: true,

        kernel: {
          autoStart: false,

          autoContinueCycles: false,

          archiveCompletedPackets: true,

          organProcessingMs,

          synchronizationMs,

          cycleIntervalMs: tickIntervalMs,
        },
      }}
    >
      <EpistemeBridgeRuntime
        autoStart={autoStart}
        ingestInitialPacket={ingestInitialPacket}
        initialPacket={initialPacket}
        className={className}
      >
        {children}
      </EpistemeBridgeRuntime>
    </EpistemeProvider>
  );
}

/* ==========================================================
   Runtime Bridge
========================================================== */

interface EpistemeBridgeRuntimeProps {
  children: ReactNode;

  autoStart: boolean;

  ingestInitialPacket: boolean;

  initialPacket: EpistemeKernelInput;

  className: string;
}

function EpistemeBridgeRuntime({
  children,

  autoStart,

  ingestInitialPacket,

  initialPacket,

  className,
}: EpistemeBridgeRuntimeProps) {
  const {
    state: schedulerState,
    ready,
  } = useEpistemeScheduler();

  const controls =
    useEpistemeControls();

  const status =
    useEpistemeStatus();

  const cycle =
    useCivilizationCycle();

  const metrics =
    useEpistemeMetrics();

  const organs =
    useEpistemeOrgans();

  const activePacket =
    useActiveKnowledgePacket();

  /*
   * React Strict Mode can mount effects twice in development.
   * These refs prevent duplicate packet insertion and startup.
   */
  const initialPacketInserted =
    useRef(false);

  const schedulerStarted =
    useRef(false);

  /* ========================================================
     Initial Packet Ingestion
  ======================================================== */

  useEffect(() => {
    if (
      !ready ||
      !ingestInitialPacket ||
      initialPacketInserted.current
    ) {
      return;
    }

    initialPacketInserted.current = true;

    controls.ingest(initialPacket);
  }, [
    controls,
    ingestInitialPacket,
    initialPacket,
    ready,
  ]);

  /* ========================================================
     Automatic Startup
  ======================================================== */

  useEffect(() => {
    if (
      !ready ||
      !autoStart ||
      schedulerStarted.current
    ) {
      return;
    }

    schedulerStarted.current = true;

    void controls.start().catch(
      (error: unknown) => {
        console.error(
          "Episteme UI Bridge failed to start:",
          error,
        );

        schedulerStarted.current = false;
      },
    );
  }, [
    autoStart,
    controls,
    ready,
  ]);

  /* ========================================================
     Derived Runtime Values
  ======================================================== */

  const activeOrganId =
    cycle.activeOrganId;

  const activeOrganIndex =
    ORGAN_INDEX[activeOrganId];

  const previousOrganId =
    cycle.previousOrganId;

  const nextOrganId =
    cycle.nextOrganId;

  const completedOrgans =
    cycle.completedOrganIds;

  const packetId =
    activePacket?.id ?? "";

  const packetType =
    activePacket?.type ?? "";

  const packetPriority =
    activePacket?.priority ?? "";

  const packetConfidence =
    activePacket?.metadata.confidence ?? 0;

  const completedOrganList =
    completedOrgans.join(" ");

  const runtimeClassName =
    useMemo(() => {
      return [
        "episteme-os-bridge",

        `is-system-${status.status}`,

        `is-organ-${activeOrganId}`,

        `is-organ-index-${activeOrganIndex}`,

        cycle.isSynchronizing
          ? "is-synchronizing"
          : "",

        cycle.isComplete
          ? "is-cycle-complete"
          : "",

        status.isOperating
          ? "is-operating"
          : "",

        status.isPaused
          ? "is-paused"
          : "",

        status.hasError
          ? "has-system-error"
          : "",

        activePacket
          ? "has-active-packet"
          : "has-no-active-packet",

        className,
      ]
        .filter(Boolean)
        .join(" ");
    }, [
      activeOrganId,
      activeOrganIndex,
      activePacket,
      className,
      cycle.isComplete,
      cycle.isSynchronizing,
      status.hasError,
      status.isOperating,
      status.isPaused,
      status.status,
    ]);

  /* ========================================================
     UI Bridge Output
  ======================================================== */

  return (
    <div
      className={runtimeClassName}

      data-episteme-ready={
        ready ? "true" : "false"
      }

      data-episteme-status={
        status.status
      }

      data-episteme-label={
        status.label
      }

      data-kernel-status={
        status.kernelStatus
      }

      data-kernel-phase={
        status.kernelPhase
      }

      data-scheduler-status={
        schedulerState.status
      }

      data-active-organ={
        activeOrganId
      }

      data-active-organ-index={
        String(activeOrganIndex)
      }

      data-active-operation={
        status.activeOperation
      }

      data-previous-organ={
        previousOrganId ?? ""
      }

      data-next-organ={
        nextOrganId
      }

      data-completed-organs={
        completedOrganList
      }

      data-cycle-number={
        String(cycle.number)
      }

      data-cycle-progress={
        String(cycle.progress)
      }

      data-cycle-complete={
        cycle.isComplete
          ? "true"
          : "false"
      }

      data-synchronizing={
        cycle.isSynchronizing
          ? "true"
          : "false"
      }

      data-active-packet-id={
        packetId
      }

      data-active-packet-type={
        packetType
      }

      data-active-packet-priority={
        packetPriority
      }

      data-packet-confidence={
        String(packetConfidence)
      }

      data-system-health={
        String(metrics.health)
      }

      data-system-synchronization={
        String(
          metrics.synchronization,
        )
      }

      data-system-activity={
        String(metrics.activity)
      }

      style={
        {
          "--episteme-cycle-progress":
            cycle.progress,

          "--episteme-health":
            metrics.health,

          "--episteme-synchronization":
            metrics.synchronization,

          "--episteme-activity":
            metrics.activity,

          "--episteme-confidence":
            packetConfidence,

          "--episteme-active-index":
            activeOrganIndex,
        }  as CSSProperties
      }
    >
      {/*
        Hidden semantic status.

        This does not change the current visual layout,
        but makes the runtime state available to assistive
        technology and future debugging.
      */}
      <div
        className="episteme-os-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span>
          Episteme:
          {" "}
          {status.label}
        </span>

        <span>
          Active cognitive organ:
          {" "}
          {
            organs.organs[
              activeOrganId
            ].definition.title
          }
        </span>

        <span>
          Operation:
          {" "}
          {status.activeOperation}
        </span>

        <span>
          Cycle progress:
          {" "}
          {cycle.progress}%
        </span>
      </div>

      {children}
    </div>
  );
}