"use client";

/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/hooks.ts

   Responsibilities:
   - Define the Episteme React Context
   - Subscribe to Runtime Store
   - Subscribe to Scheduler
   - Expose Runtime services and controls
   - Expose Organ / Packet / Cycle / Metrics views
   - Provide UI-focused derived Runtime state

   Important:
   - This file does not create Store, Engine, or Scheduler.
   - EpistemeProvider creates all Runtime services.
   - Runtime Store remains the single source of truth.
========================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  EPISTEME_ORGANS,
  EPISTEME_RUNTIME_STATUS_LABELS,
  EPISTEME_SCHEDULER_STATUS_LABELS,
} from "./constants";

import {
  createRuntimeSummary,
  selectActivePacket,
} from "./utils";

import type {
  EpistemeRuntimeSnapshot,
  EpistemeRuntimeState,
  EpistemeRuntimeStatus,
  EpistemeRuntimeSummary,
  EpistemeSchedulerMode,
  KnowledgePacket,
  KnowledgePacketInput,
  OrganId,
  RuntimeCycle,
  RuntimeError,
  RuntimeEvent,
  RuntimeMetrics,
  RuntimeOrgan,
  SchedulerTickResult,
} from "./types";

import type {
  EpistemeRuntimeStore,
} from "./store";

import type {
  EpistemeEngine,
} from "./engine";

import type {
  EpistemeScheduler,
  EpistemeSchedulerSnapshot,
  EpistemeSchedulerState,
} from "./scheduler";

/* ==========================================================
   Runtime Services
========================================================== */

export interface EpistemeReactServices {
  store: EpistemeRuntimeStore;

  engine: EpistemeEngine;

  scheduler: EpistemeScheduler;
}

/* ==========================================================
   Runtime Controls
========================================================== */

export interface EpistemeReactControls {
  start: () => Promise<void>;

  pause: () => void;

  resume: () => Promise<void>;

  stop: () => void;

  reset: (
    preserveArchive?: boolean,
  ) => void;

  tick: () =>
    Promise<SchedulerTickResult>;

  processNextStep: () =>
    Promise<SchedulerTickResult>;

  processNextCycle: () =>
    Promise<void>;

  ingest: (
    input: KnowledgePacketInput,
  ) => KnowledgePacket;

  setMode: (
    mode: EpistemeSchedulerMode,
  ) => void;

  clearQueue: () => void;

  clearArchive: () => void;

  clearErrors: () => void;
}

/* ==========================================================
   React Context Value
========================================================== */

export interface EpistemeReactContextValue {
  services: EpistemeReactServices;

  controls: EpistemeReactControls;
}

/* ==========================================================
   Runtime Context
========================================================== */

export const EpistemeRuntimeContext =
  createContext<
    EpistemeReactContextValue | null
  >(null);

/* ==========================================================
   Context Hooks
========================================================== */

export function useEpistemeContext():
  EpistemeReactContextValue {
  const context =
    useContext(
      EpistemeRuntimeContext,
    );

  if (!context) {
    throw new Error(
      [
        "Episteme Runtime Context is unavailable.",
        "Wrap this component tree with <EpistemeProvider>.",
      ].join(" "),
    );
  }

  return context;
}

export function useOptionalEpistemeContext():
  EpistemeReactContextValue | null {
  return useContext(
    EpistemeRuntimeContext,
  );
}

/* ==========================================================
   Service Hooks
========================================================== */

export function useEpistemeServices():
  EpistemeReactServices {
  return useEpistemeContext()
    .services;
}

export function useEpistemeStore():
  EpistemeRuntimeStore {
  return useEpistemeServices()
    .store;
}

export function useEpistemeEngine():
  EpistemeEngine {
  return useEpistemeServices()
    .engine;
}

export function useEpistemeScheduler():
  EpistemeScheduler {
  return useEpistemeServices()
    .scheduler;
}

export function useEpistemeControls():
  EpistemeReactControls {
  return useEpistemeContext()
    .controls;
}

/* ==========================================================
   Runtime Store Subscription
========================================================== */

export function useEpistemeSnapshot():
  EpistemeRuntimeSnapshot {
  const store =
    useEpistemeStore();

  const subscribe =
    useCallback(
      (
        onStoreChange:
          () => void,
      ) => {
        return store.subscribe(
          () => {
            onStoreChange();
          },
        );
      },
      [store],
    );

  const getSnapshot =
    useCallback(
      () =>
        store.getSnapshot(),
      [store],
    );

  const getServerSnapshot =
    useCallback(
      () =>
        store.getServerSnapshot(),
      [store],
    );

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}

/* ==========================================================
   Runtime State Hooks
========================================================== */

export function useEpistemeRuntime():
  EpistemeRuntimeState {
  return useEpistemeSnapshot()
    .state;
}

export function useEpistemeRevision():
  number {
  return useEpistemeSnapshot()
    .revision;
}

/* ==========================================================
   Generic Selector

   Note:
   Define selectors outside React components or wrap them
   with useCallback when their identity must remain stable.
========================================================== */

export function useEpistemeSelector<T>(
  selector: (
    state:
      EpistemeRuntimeState,
  ) => T,
): T {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () => selector(state),
    [selector, state],
  );
}

/* ==========================================================
   Scheduler Subscription
========================================================== */

export function useEpistemeSchedulerSnapshot():
  EpistemeSchedulerSnapshot {
  const scheduler =
    useEpistemeScheduler();

  const subscribe =
    useCallback(
      (
        onStoreChange:
          () => void,
      ) => {
        return scheduler.subscribe(
          () => {
            onStoreChange();
          },
        );
      },
      [scheduler],
    );

  const getSnapshot =
    useCallback(
      () =>
        scheduler.getSnapshot(),
      [scheduler],
    );

  const getServerSnapshot =
    useCallback(
      () =>
        scheduler.getServerSnapshot(),
      [scheduler],
    );

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}

export function useEpistemeSchedulerState():
  EpistemeSchedulerState {
  return useEpistemeSchedulerSnapshot()
    .state;
}

/* ==========================================================
   Runtime Status View
========================================================== */

export interface EpistemeStatusView {
  status:
    EpistemeRuntimeStatus;

  label: string;

  schedulerStatus:
    EpistemeSchedulerState["status"];

  schedulerLabel: string;

  ready: boolean;

  running: boolean;

  paused: boolean;

  synchronizing: boolean;

  waiting: boolean;

  processing: boolean;

  hasError: boolean;

  isOperating: boolean;

  isComplete: boolean;

  isDestroyed: boolean;

  activeOperation: string;
}

export function useEpistemeStatus():
  EpistemeStatusView {
  const state =
    useEpistemeRuntime();

  const scheduler =
    useEpistemeSchedulerState();

  const activeDefinition =
    EPISTEME_ORGANS[
      state.cycle.activeOrgan
    ];

  return useMemo(
    () => ({
      status:
        state.status,

      label:
        EPISTEME_RUNTIME_STATUS_LABELS[
          state.status
        ],

      schedulerStatus:
        scheduler.status,

      schedulerLabel:
        EPISTEME_SCHEDULER_STATUS_LABELS[
          scheduler.status
        ],

      ready:
        state.ready,

      running:
        state.running,

      paused:
        state.paused,

      synchronizing:
        state.synchronizing,

      waiting:
        state.status ===
          "waiting" ||
        scheduler.waiting,

      processing:
        scheduler.processing,

      hasError:
        state.status ===
          "error" ||
        state.errors.length > 0,

      isOperating:
        state.status ===
          "operating" &&
        state.running &&
        !state.paused,

      isComplete:
        state.cycle.status ===
          "completed",

      isDestroyed:
        state.status ===
          "destroyed" ||
        scheduler.destroyed,

      activeOperation:
        activeDefinition
          .operationLabel,
    }),
    [
      activeDefinition.operationLabel,
      scheduler.destroyed,
      scheduler.processing,
      scheduler.status,
      scheduler.waiting,
      state.cycle.status,
      state.errors.length,
      state.paused,
      state.ready,
      state.running,
      state.status,
      state.synchronizing,
    ],
  );
}

/* ==========================================================
   Civilization Cycle View
========================================================== */

export interface EpistemeCycleView
  extends RuntimeCycle {
  activeOrganId: OrganId;

  previousOrganId:
    OrganId | null;

  nextOrganId: OrganId;

  completedOrganIds:
    OrganId[];

  isActive: boolean;

  isComplete: boolean;

  isSynchronizing: boolean;
}

export function useCivilizationCycle():
  EpistemeCycleView {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () => ({
      ...state.cycle,

      activeOrganId:
        state.cycle
          .activeOrgan,

      previousOrganId:
        state.cycle
          .previousOrgan,

      nextOrganId:
        state.cycle
          .nextOrgan,

      completedOrganIds: [
        ...state.cycle
          .completedOrgans,
      ],

      isActive:
        state.cycle.status ===
          "running",

      isComplete:
        state.cycle.status ===
          "completed",

      isSynchronizing:
        state.synchronizing ||
        state.cycle.status ===
          "synchronizing",
    }),
    [
      state.cycle,
      state.synchronizing,
    ],
  );
}

/* ==========================================================
   Organ View
========================================================== */

export interface EpistemeOrganView {
  id: OrganId;

  organ: RuntimeOrgan;

  isActive: boolean;

  isPrevious: boolean;

  isNext: boolean;

  isCompleted: boolean;

  operationLabel: string;
}

export function useEpistemeOrgan(
  organId: OrganId,
): EpistemeOrganView {
  const state =
    useEpistemeRuntime();

  const organ =
    state.organs[organId];

  return useMemo(
    () => ({
      id:
        organId,

      organ,

      isActive:
        organ.isActive,

      isPrevious:
        organ.isPrevious,

      isNext:
        organ.isNext,

      isCompleted:
        organ.isCompleted,

      operationLabel:
        organ.definition
          .operationLabel,
    }),
    [
      organ,
      organId,
    ],
  );
}

/* ==========================================================
   All Organs View
========================================================== */

export interface EpistemeOrgansView {
  organs: Record<
    OrganId,
    RuntimeOrgan
  >;

  active:
    RuntimeOrgan;

  previous:
    RuntimeOrgan | null;

  next:
    RuntimeOrgan;

  activeOrganId:
    OrganId;

  previousOrganId:
    OrganId | null;

  nextOrganId:
    OrganId;

  completedOrganIds:
    OrganId[];
}

export function useEpistemeOrgans():
  EpistemeOrgansView {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () => {
      const previousOrganId =
        state.cycle
          .previousOrgan;

      return {
        organs:
          state.organs,

        active:
          state.organs[
            state.cycle
              .activeOrgan
          ],

        previous:
          previousOrganId
            ? state.organs[
                previousOrganId
              ]
            : null,

        next:
          state.organs[
            state.cycle
              .nextOrgan
          ],

        activeOrganId:
          state.cycle
            .activeOrgan,

        previousOrganId,

        nextOrganId:
          state.cycle
            .nextOrgan,

        completedOrganIds: [
          ...state.cycle
            .completedOrgans,
        ],
      };
    },
    [
      state.cycle.activeOrgan,
      state.cycle.completedOrgans,
      state.cycle.nextOrgan,
      state.cycle.previousOrgan,
      state.organs,
    ],
  );
}

/* ==========================================================
   Active Organ
========================================================== */

export function useActiveEpistemeOrgan():
  EpistemeOrganView {
  const state =
    useEpistemeRuntime();

  return useEpistemeOrgan(
    state.cycle.activeOrgan,
  );
}

/* ==========================================================
   Next Organ
========================================================== */

export function useNextEpistemeOrgan():
  EpistemeOrganView {
  const state =
    useEpistemeRuntime();

  return useEpistemeOrgan(
    state.cycle.nextOrgan,
  );
}

/* ==========================================================
   Active Knowledge Packet
========================================================== */

export function useActiveKnowledgePacket():
  KnowledgePacket | null {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () =>
      selectActivePacket(
        state,
      ),
    [state],
  );
}

/* ==========================================================
   Packet Queue View
========================================================== */

export interface EpistemePacketQueueView {
  items:
    KnowledgePacket[];

  activePacket:
    KnowledgePacket | null;

  activePacketId:
    string | null;

  lastProcessedPacketId:
    string | null;

  total: number;

  created: number;

  queued: number;

  processing: number;

  completed: number;

  failed: number;

  critical: number;

  highPriority: number;

  archiveTotal: number;
}

export function useEpistemeQueueSummary():
  EpistemePacketQueueView {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () => {
      const items =
        state.queue.items;

      const activePacket =
        selectActivePacket(
          state,
        );

      return {
        items,

        activePacket,

        activePacketId:
          state.queue
            .activePacketId,

        lastProcessedPacketId:
          state.queue
            .lastProcessedPacketId,

        total:
          items.length,

        created:
          items.filter(
            (packet) =>
              packet.status ===
              "created",
          ).length,

        queued:
          items.filter(
            (packet) =>
              packet.status ===
              "queued",
          ).length,

        processing:
          items.filter(
            (packet) =>
              packet.status ===
              "processing",
          ).length,

        completed:
          items.filter(
            (packet) =>
              packet.status ===
              "completed",
          ).length,

        failed:
          items.filter(
            (packet) =>
              packet.status ===
              "failed",
          ).length,

        critical:
          items.filter(
            (packet) =>
              packet.priority ===
              "critical",
          ).length,

        highPriority:
          items.filter(
            (packet) =>
              packet.priority ===
                "high" ||
              packet.priority ===
                "critical",
          ).length,

        archiveTotal:
          state.archive.length,
      };
    },
    [state],
  );
}

/* ==========================================================
   Runtime Metrics View
========================================================== */

export interface EpistemeMetricsView
  extends RuntimeMetrics {
  isHealthy: boolean;

  isSynchronized: boolean;
}

export function useEpistemeMetrics():
  EpistemeMetricsView {
  const metrics =
    useEpistemeRuntime()
      .metrics;

  return useMemo(
    () => ({
      ...metrics,

      isHealthy:
        metrics.health >= 70,

      isSynchronized:
        metrics
          .synchronization >= 80,
    }),
    [metrics],
  );
}

/* ==========================================================
   Runtime Events View
========================================================== */

export interface EpistemeEventsView {
  events:
    RuntimeEvent[];

  latestEvent:
    RuntimeEvent | null;

  errors:
    RuntimeError[];

  latestError:
    RuntimeError | null;

  hasErrors:
    boolean;
}

export function useEpistemeEvents(
  limit = 20,
): EpistemeEventsView {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () => {
      const safeLimit =
        Math.max(
          0,
          limit,
        );

      const events =
        safeLimit === 0
          ? []
          : state.events.slice(
              -safeLimit,
            );

      return {
        events,

        latestEvent:
          state.events[
            state.events.length -
              1
          ] ?? null,

        errors:
          state.errors,

        latestError:
          state.errors[
            state.errors.length -
              1
          ] ?? null,

        hasErrors:
          state.errors.length > 0,
      };
    },
    [
      limit,
      state.errors,
      state.events,
    ],
  );
}

/* ==========================================================
   Runtime Summary
========================================================== */

export function useEpistemeRuntimeSummary():
  EpistemeRuntimeSummary {
  const state =
    useEpistemeRuntime();

  return useMemo(
    () =>
      createRuntimeSummary(
        state,
      ),
    [state],
  );
}

/* ==========================================================
   Runtime Readiness
========================================================== */

export function useEpistemeReady():
  boolean {
  const state =
    useEpistemeRuntime();

  const scheduler =
    useEpistemeSchedulerState();

  return (
    state.ready &&
    !state.errors.some(
      (error) =>
        !error.recoverable,
    ) &&
    !scheduler.destroyed
  );
}

/* ==========================================================
   Packet Flow View
========================================================== */

export interface EpistemePacketFlowView {
  packet:
    KnowledgePacket | null;

  activeOrganId:
    OrganId;

  previousOrganId:
    OrganId | null;

  nextOrganId:
    OrganId;

  cycleNumber:
    number;

  cycleProgress:
    number;

  routeProgress:
    number;

  synchronizing:
    boolean;

  complete:
    boolean;

  processing:
    boolean;
}

export function useEpistemePacketFlow():
  EpistemePacketFlowView {
  const state =
    useEpistemeRuntime();

  const scheduler =
    useEpistemeSchedulerState();

  const packet =
    useMemo(
      () =>
        selectActivePacket(
          state,
        ),
      [state],
    );

  return useMemo(
    () => {
      const activeIndex =
        EPISTEME_ORGANS[
          state.cycle
            .activeOrgan
        ].index;

      const localProgress =
        state.cycle.progress /
        100 /
        6;

      const routeProgress =
        Math.min(
          1,
          activeIndex / 6 +
            localProgress,
        );

      return {
        packet,

        activeOrganId:
          state.cycle
            .activeOrgan,

        previousOrganId:
          state.cycle
            .previousOrgan,

        nextOrganId:
          state.cycle
            .nextOrgan,

        cycleNumber:
          state.cycle.number,

        cycleProgress:
          state.cycle.progress,

        routeProgress,

        synchronizing:
          state.synchronizing,

        complete:
          state.cycle.status ===
          "completed",

        processing:
          scheduler.processing,
      };
    },
    [
      packet,
      scheduler.processing,
      state.cycle.activeOrgan,
      state.cycle.nextOrgan,
      state.cycle.number,
      state.cycle.previousOrgan,
      state.cycle.progress,
      state.cycle.status,
      state.synchronizing,
    ],
  );
}

/* ==========================================================
   Runtime Panel View
========================================================== */

export interface EpistemeRuntimePanelView {
  status:
    EpistemeStatusView;

  cycle:
    EpistemeCycleView;

  organs:
    EpistemeOrgansView;

  packet:
    KnowledgePacket | null;

  queue:
    EpistemePacketQueueView;

  metrics:
    EpistemeMetricsView;

  events:
    EpistemeEventsView;

  scheduler:
    EpistemeSchedulerState;
}

export function useEpistemeRuntimePanel():
  EpistemeRuntimePanelView {
  const status =
    useEpistemeStatus();

  const cycle =
    useCivilizationCycle();

  const organs =
    useEpistemeOrgans();

  const packet =
    useActiveKnowledgePacket();

  const queue =
    useEpistemeQueueSummary();

  const metrics =
    useEpistemeMetrics();

  const events =
    useEpistemeEvents(12);

  const scheduler =
    useEpistemeSchedulerState();

  return useMemo(
    () => ({
      status,
      cycle,
      organs,
      packet,
      queue,
      metrics,
      events,
      scheduler,
    }),
    [
      status,
      cycle,
      organs,
      packet,
      queue,
      metrics,
      events,
      scheduler,
    ],
  );
}