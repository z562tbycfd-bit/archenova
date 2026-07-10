"use client";

/* ==========================================================
  Episteme Operating System
  React Hooks and Context

  File:
  lib/episteme/hooks.ts

  PART 1 / 2

  Responsibilities:
  - Episteme React Context
  - Episteme Provider
  - Scheduler state subscription
  - Kernel state subscription
  - Lifecycle controls
  - Knowledge ingestion controls
========================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";

import {
 createEpistemeScheduler,
 type EpistemeScheduler,
 type EpistemeSchedulerConfig,
 type EpistemeSchedulerMode,
 type EpistemeSchedulerState,
 type EpistemeTickResult,
} from "./scheduler";

import type {
 EpistemeKernel,
 EpistemeKernelInput,
 EpistemeKernelSnapshot,
} from "./kernel";

import type {
 KnowledgePacket,
} from "./packet";

import type {
 EpistemeState,
} from "./state";

/* ==========================================================
  Provider Properties
========================================================== */

export interface EpistemeProviderProps {
 children: ReactNode;

 /**
  * Scheduler configuration.
  */
 config?: Partial<EpistemeSchedulerConfig>;

 /**
  * Existing Scheduler instance.
  *
  * Pass this when the application needs to share a
  * Scheduler created elsewhere.
  */
 scheduler?: EpistemeScheduler;

 /**
  * Start automatically when the Provider mounts.
  */
 autoStart?: boolean;

 /**
  * Stop the Scheduler when the Provider unmounts.
  *
  * Keep this false when using a shared singleton.
  */
 stopOnUnmount?: boolean;

 /**
  * Destroy the internally created Scheduler on unmount.
  *
  * This should normally remain true for a Provider-owned
  * Scheduler and false for an externally supplied instance.
  */
 destroyOnUnmount?: boolean;
}

/* ==========================================================
  Lifecycle Controls
========================================================== */

export interface EpistemeLifecycleControls {
 start: () => Promise<void>;

 pause: () => void;

 resume: () => Promise<void>;

 stop: () => void;

 reset: () => void;

 retry: () => Promise<void>;

 clearError: () => void;

 processNext: () => Promise<EpistemeTickResult>;

 tick: () => Promise<EpistemeTickResult>;

 setMode: (
   mode: EpistemeSchedulerMode,
 ) => void;

 ingest: (
   input: EpistemeKernelInput,
 ) => KnowledgePacket;

 ingestMany: (
   inputs: EpistemeKernelInput[],
 ) => KnowledgePacket[];

 generatePacket: () =>
   Promise<KnowledgePacket | null>;
}

/* ==========================================================
  Episteme Context Value
========================================================== */

export interface EpistemeContextValue {
 scheduler: EpistemeScheduler;

 kernel: EpistemeKernel;

 schedulerState: EpistemeSchedulerState;

 kernelState: EpistemeState;

 kernelSnapshot: EpistemeKernelSnapshot;

 controls: EpistemeLifecycleControls;

 ready: boolean;
}

/* ==========================================================
  Context
========================================================== */

const EpistemeContext =
 createContext<EpistemeContextValue | null>(
   null,
 );

/* ==========================================================
  Stable Scheduler Snapshot
========================================================== */

interface SchedulerExternalSnapshot {
 schedulerState: EpistemeSchedulerState;

 kernelSnapshot: EpistemeKernelSnapshot;
}

function createSchedulerSnapshot(
 scheduler: EpistemeScheduler,
): SchedulerExternalSnapshot {
 return {
   schedulerState: scheduler.getState(),

   kernelSnapshot:
     scheduler.getKernelSnapshot(),
 };
}

/* ==========================================================
  useSyncExternalStore Adapter
========================================================== */

function useSchedulerExternalStore(
 scheduler: EpistemeScheduler,
): SchedulerExternalSnapshot {
 /*
  * The snapshot is stored in a ref so that
  * getSnapshot returns the same object until a real
  * Scheduler update occurs.
  */
 const snapshotRef =
   useRef<SchedulerExternalSnapshot>(
     createSchedulerSnapshot(scheduler),
   );

 const subscribe = useCallback(
   (onStoreChange: () => void) => {
     return scheduler.subscribe(
       (
         schedulerState,
         kernelSnapshot,
       ) => {
         snapshotRef.current = {
           schedulerState,
           kernelSnapshot,
         };

         onStoreChange();
       },
     );
   },
   [scheduler],
 );

 const getSnapshot = useCallback(() => {
   return snapshotRef.current;
 }, []);

 const getServerSnapshot = useCallback(() => {
   return snapshotRef.current;
 }, []);

 return useSyncExternalStore(
   subscribe,
   getSnapshot,
   getServerSnapshot,
 );
}

/* ==========================================================
  Provider
========================================================== */

export function EpistemeProvider({
  children,
  config,
  scheduler: externalScheduler,
  autoStart = false,
  stopOnUnmount = true,
  destroyOnUnmount,
}: EpistemeProviderProps): ReactElement {
 /*
  * A Scheduler must only be created once for each Provider.
  * useRef prevents recreation during React rerenders.
  */
 const schedulerRef =
   useRef<EpistemeScheduler | null>(null);

 if (!schedulerRef.current) {
   schedulerRef.current =
     externalScheduler ??
     createEpistemeScheduler({
       ...config,

       /*
        * Provider lifecycle controls startup.
        * This prevents constructor startup and useEffect
        * startup from executing simultaneously.
        */
       autoStart: false,
     });
 }

 const scheduler = schedulerRef.current;

 const internallyCreated =
   externalScheduler === undefined;

 const shouldDestroyOnUnmount =
   destroyOnUnmount ??
   internallyCreated;

 const {
   schedulerState,
   kernelSnapshot,
 } = useSchedulerExternalStore(
   scheduler,
 );

 const kernel = scheduler.getKernel();

 const kernelState =
   kernelSnapshot.state;

 const [ready, setReady] =
   useState(false);

 /* ========================================================
    Provider Lifecycle
 ======================================================== */

 useEffect(() => {
   let active = true;

   setReady(true);

   if (autoStart) {
     void scheduler.start().catch(
       (error: unknown) => {
         if (!active) return;

         console.error(
           "Episteme Provider failed to start:",
           error,
         );
       },
     );
   }

   return () => {
     active = false;

     if (stopOnUnmount) {
       scheduler.stop();
     }

     if (shouldDestroyOnUnmount) {
       scheduler.destroy();
     }
   };
 }, [
   autoStart,
   scheduler,
   shouldDestroyOnUnmount,
   stopOnUnmount,
 ]);

 /* ========================================================
    Lifecycle Callbacks
 ======================================================== */

 const start = useCallback(async () => {
   await scheduler.start();
 }, [scheduler]);

 const pause = useCallback(() => {
   scheduler.pause();
 }, [scheduler]);

 const resume = useCallback(async () => {
   await scheduler.resume();
 }, [scheduler]);

 const stop = useCallback(() => {
   scheduler.stop();
 }, [scheduler]);

 const reset = useCallback(() => {
   scheduler.reset();
 }, [scheduler]);

 const retry = useCallback(async () => {
   await scheduler.retry();
 }, [scheduler]);

 const clearError = useCallback(() => {
   scheduler.clearError();
 }, [scheduler]);

 const processNext =
   useCallback(async () => {
     return scheduler.processNext();
   }, [scheduler]);

 const tick = useCallback(async () => {
   return scheduler.tick("manual");
 }, [scheduler]);

 const setMode = useCallback(
   (mode: EpistemeSchedulerMode) => {
     scheduler.setMode(mode);
   },
   [scheduler],
 );

 const ingest = useCallback(
   (
     input: EpistemeKernelInput,
   ): KnowledgePacket => {
     return scheduler.ingest(input);
   },
   [scheduler],
 );

 const ingestMany = useCallback(
   (
     inputs: EpistemeKernelInput[],
   ): KnowledgePacket[] => {
     return scheduler.ingestMany(inputs);
   },
   [scheduler],
 );

 const generatePacket =
   useCallback(async () => {
     return scheduler.generatePacket();
   }, [scheduler]);

 /* ========================================================
    Stable Controls Object
 ======================================================== */

 const controls =
   useMemo<EpistemeLifecycleControls>(
     () => ({
       start,
       pause,
       resume,
       stop,
       reset,
       retry,
       clearError,
       processNext,
       tick,
       setMode,
       ingest,
       ingestMany,
       generatePacket,
     }),
     [
       start,
       pause,
       resume,
       stop,
       reset,
       retry,
       clearError,
       processNext,
       tick,
       setMode,
       ingest,
       ingestMany,
       generatePacket,
     ],
   );

 /* ========================================================
    Context Value
 ======================================================== */

 const value =
   useMemo<EpistemeContextValue>(
     () => ({
       scheduler,
       kernel,

       schedulerState,
       kernelState,
       kernelSnapshot,

       controls,

       ready,
     }),
     [
       scheduler,
       kernel,
       schedulerState,
       kernelState,
       kernelSnapshot,
       controls,
       ready,
     ],
   );

 return (
    <EpistemeContext.Provider value={value}>
      {children}
    </EpistemeContext.Provider>
  );
}

/* ==========================================================
  Required Context Hook
========================================================== */

export function useEpistemeContext():
 EpistemeContextValue {
 const context =
   useContext(EpistemeContext);

 if (!context) {
   throw new Error(
     "useEpistemeContext must be used inside an EpistemeProvider.",
   );
 }

 return context;
}

/* ==========================================================
  Optional Context Hook
========================================================== */

export function useOptionalEpistemeContext():
 EpistemeContextValue | null {
 return useContext(EpistemeContext);
}

/* ==========================================================
  Scheduler Hook
========================================================== */

export interface UseEpistemeSchedulerResult {
 scheduler: EpistemeScheduler;

 state: EpistemeSchedulerState;

 controls: EpistemeLifecycleControls;

 ready: boolean;

 isRunning: boolean;

 isPaused: boolean;

 isWaiting: boolean;

 isCompleted: boolean;

 hasError: boolean;
}

export function useEpistemeScheduler():
 UseEpistemeSchedulerResult {
 const {
   scheduler,
   schedulerState,
   controls,
   ready,
 } = useEpistemeContext();

 return useMemo(
   () => ({
     scheduler,

     state: schedulerState,

     controls,

     ready,

     isRunning:
       schedulerState.status ===
       "running",

     isPaused:
       schedulerState.status ===
       "paused",

     isWaiting:
       schedulerState.status ===
       "waiting",

     isCompleted:
       schedulerState.status ===
       "completed",

     hasError:
       schedulerState.status ===
         "error" ||
       Boolean(schedulerState.error),
   }),
   [
     scheduler,
     schedulerState,
     controls,
     ready,
   ],
 );
}

/* ==========================================================
  Kernel Hook
========================================================== */

export interface UseEpistemeKernelResult {
 kernel: EpistemeKernel;

 state: EpistemeState;

 snapshot: EpistemeKernelSnapshot;

 activePacket: KnowledgePacket | null;

 isRunning: boolean;

 isPaused: boolean;

 isOperational: boolean;

 queueLength: number;
}

export function useEpistemeKernel():
 UseEpistemeKernelResult {
 const {
   kernel,
   kernelState,
   kernelSnapshot,
 } = useEpistemeContext();

 return useMemo(
   () => ({
     kernel,

     state: kernelState,

     snapshot: kernelSnapshot,

     activePacket:
       kernelSnapshot.activePacket,

     isRunning:
       kernelSnapshot.isRunning,

     isPaused:
       kernelSnapshot.isPaused,

     isOperational:
       !kernelSnapshot.isDestroyed &&
       kernelState.kernelStatus !==
         "error",

     queueLength:
       kernelState.queue.packets.length,
   }),
   [
     kernel,
     kernelState,
     kernelSnapshot,
   ],
 );
}

/* ==========================================================
  Lifecycle Controls Hook
========================================================== */

export function useEpistemeControls():
 EpistemeLifecycleControls {
 return useEpistemeContext().controls;
}

/* ==========================================================
  Provider Readiness Hook
========================================================== */

export function useEpistemeReady():
 boolean {
 return useEpistemeContext().ready;
}

/* ==========================================================
  PART 1 ENDS HERE

  Append PART 2 immediately below this comment.

  Part 2 will add:
  - useEpistemeOrgan
  - useActiveEpistemeOrgan
  - useKnowledgePackets
  - useCivilizationCycle
  - useEpistemeMetrics
  - useEpistemeEvents
  - useEpistemeStatus
  - Selector utilities
========================================================== */

/* ==========================================================
  PART 2 / 2

  Responsibilities:
  - Cognitive Organ hooks
  - Knowledge Packet hooks
  - Civilization Cycle hooks
  - System Metrics hooks
  - Event and Error hooks
  - Status and selector utilities
========================================================== */

/* ==========================================================
  Derived Types
========================================================== */

export type EpistemeOrganId =
 keyof EpistemeState["organs"];

export type EpistemeRuntimeOrgan =
 EpistemeState["organs"][EpistemeOrganId];

export type EpistemeCycle =
 EpistemeState["cycle"];

export type EpistemeMetrics =
 EpistemeState["metrics"];

export type EpistemeEvent =
 EpistemeState["events"][number];

export type EpistemeError =
 EpistemeState["errors"][number];

/* ==========================================================
  Organ Selector
========================================================== */

export function selectEpistemeOrgan(
 state: EpistemeState,
 organId: EpistemeOrganId,
): EpistemeRuntimeOrgan {
 return state.organs[organId];
}

/* ==========================================================
  Active Organ Selector
========================================================== */

export function selectActiveEpistemeOrgan(
 state: EpistemeState,
): EpistemeRuntimeOrgan {
 return state.organs[
   state.cycle.activeOrgan
 ];
}

/* ==========================================================
  Next Organ Selector
========================================================== */

export function selectNextEpistemeOrgan(
 state: EpistemeState,
): EpistemeRuntimeOrgan {
 return state.organs[
   state.cycle.nextOrgan
 ];
}

/* ==========================================================
  Previous Organ Selector
========================================================== */

export function selectPreviousEpistemeOrgan(
 state: EpistemeState,
): EpistemeRuntimeOrgan | null {
 const previousOrgan =
   state.cycle.previousOrgan;

 if (!previousOrgan) {
   return null;
 }

 return state.organs[previousOrgan];
}

/* ==========================================================
  Organ Packets Selector
========================================================== */

export function selectPacketsForEpistemeOrgan(
 state: EpistemeState,
 organId: EpistemeOrganId,
): KnowledgePacket[] {
 return state.queue.packets.filter(
   (packet) =>
     packet.to === organId ||
     packet.from === organId,
 );
}

/* ==========================================================
  Pending Packets Selector
========================================================== */

export function selectPendingPacketsForOrgan(
 state: EpistemeState,
 organId: EpistemeOrganId,
): KnowledgePacket[] {
 return state.queue.packets.filter(
   (packet) =>
     packet.to === organId &&
     (
       packet.status === "created" ||
       packet.status === "queued"
     ),
 );
}

/* ==========================================================
  Processed Packets Selector
========================================================== */

export function selectProcessedPacketsForOrgan(
 state: EpistemeState,
 organId: EpistemeOrganId,
): KnowledgePacket[] {
 return state.archive.filter(
   (packet) =>
     packet.from === organId ||
     packet.to === organId,
 );
}

/* ==========================================================
  Organ Hook Result
========================================================== */

export interface UseEpistemeOrganResult {
 id: EpistemeOrganId;

 organ: EpistemeRuntimeOrgan;

 packets: KnowledgePacket[];

 pendingPackets: KnowledgePacket[];

 archivedPackets: KnowledgePacket[];

 isActive: boolean;

 isPrevious: boolean;

 isNext: boolean;

 isCompleted: boolean;

 isReceiving: boolean;

 isProcessing: boolean;

 isEmitting: boolean;

 operationLabel: string;
}

/* ==========================================================
  Organ Operation Label
========================================================== */

function resolveOrganOperationLabel(
 organId: EpistemeOrganId,
 runtimeState:
   EpistemeRuntimeOrgan["runtimeState"],
): string {
 if (runtimeState === "idle") {
   return "Idle";
 }

 if (runtimeState === "completed") {
   return "Complete";
 }

 switch (organId) {
   case "observation":
     return "Receiving";

   case "understanding":
     return "Integrating";

   case "reasoning":
     return "Evaluating";

   case "design":
     return "Architecting";

   case "realization":
     return "Executing";

   case "memory":
     return "Encoding";

   default:
     return "Processing";
 }
}

/* ==========================================================
  useEpistemeOrgan
========================================================== */

export function useEpistemeOrgan(
 organId: EpistemeOrganId,
): UseEpistemeOrganResult {
 const { kernelState } =
   useEpistemeContext();

 return useMemo(() => {
   const organ =
     selectEpistemeOrgan(
       kernelState,
       organId,
     );

   const packets =
     selectPacketsForEpistemeOrgan(
       kernelState,
       organId,
     );

   const pendingPackets =
     selectPendingPacketsForOrgan(
       kernelState,
       organId,
     );

   const archivedPackets =
     selectProcessedPacketsForOrgan(
       kernelState,
       organId,
     );

   const isActive =
     kernelState.cycle.activeOrgan ===
     organId;

   const isPrevious =
     kernelState.cycle.previousOrgan ===
     organId;

   const isNext =
     kernelState.cycle.nextOrgan ===
     organId;

   const isCompleted =
     kernelState.cycle.completedOrgans.includes(
       organId,
     );

   const isReceiving =
     organ.runtimeState ===
       "receiving" ||
     pendingPackets.length > 0;

   const isProcessing =
     isActive &&
     organ.runtimeState !== "idle" &&
     organ.runtimeState !== "completed";

   const isEmitting =
     isPrevious &&
     organ.packets.emitted > 0;

   return {
     id: organId,

     organ,

     packets,
     pendingPackets,
     archivedPackets,

     isActive,
     isPrevious,
     isNext,
     isCompleted,

     isReceiving,
     isProcessing,
     isEmitting,

     operationLabel:
       resolveOrganOperationLabel(
         organId,
         organ.runtimeState,
       ),
   };
 }, [
   kernelState,
   organId,
 ]);
}

/* ==========================================================
  Active Organ Hook
========================================================== */

export function useActiveEpistemeOrgan():
 UseEpistemeOrganResult {
 const { kernelState } =
   useEpistemeContext();

 return useEpistemeOrgan(
   kernelState.cycle.activeOrgan,
 );
}

/* ==========================================================
  Next Organ Hook
========================================================== */

export function useNextEpistemeOrgan():
 UseEpistemeOrganResult {
 const { kernelState } =
   useEpistemeContext();

 return useEpistemeOrgan(
   kernelState.cycle.nextOrgan,
 );
}

/* ==========================================================
  All Organs Hook
========================================================== */

export interface UseEpistemeOrgansResult {
 organs: Record<
   EpistemeOrganId,
   EpistemeRuntimeOrgan>
;

 ordered: EpistemeRuntimeOrgan[];

 activeOrganId: EpistemeOrganId;

 nextOrganId: EpistemeOrganId;

 previousOrganId:
   | EpistemeOrganId
   | null;

 completedOrganIds:
   EpistemeOrganId[];
}

export function useEpistemeOrgans():
 UseEpistemeOrgansResult {
 const { kernelState } =
   useEpistemeContext();

 return useMemo(
   () => ({
     organs: kernelState.organs,

     ordered: [
       kernelState.organs.observation,
       kernelState.organs.understanding,
       kernelState.organs.reasoning,
       kernelState.organs.design,
       kernelState.organs.realization,
       kernelState.organs.memory,
     ],

     activeOrganId:
       kernelState.cycle.activeOrgan,

     nextOrganId:
       kernelState.cycle.nextOrgan,

     previousOrganId:
       kernelState.cycle.previousOrgan,

     completedOrganIds:
       kernelState.cycle.completedOrgans,
   }),
   [kernelState],
 );
}

/* ==========================================================
  Knowledge Packet Filters
========================================================== */

export type KnowledgePacketFilter = {
 organId?: EpistemeOrganId;

 status?:
   | KnowledgePacket["status"]
   | KnowledgePacket["status"][];

 priority?:
   | KnowledgePacket["priority"]
   | KnowledgePacket["priority"][];

 type?:
   | KnowledgePacket["type"]
   | KnowledgePacket["type"][];

 includeArchive?: boolean;

 limit?: number;
};

/* ==========================================================
  Filter Utility
========================================================== */

function matchesFilterValue<T extends string>(
 value: T,
 filter:
   | T
   | T[]
   | undefined,
): boolean {
 if (!filter) {
   return true;
 }

 if (Array.isArray(filter)) {
   return filter.includes(value);
 }

 return value === filter;
}

/* ==========================================================
  Knowledge Packet Selector
========================================================== */

export function selectKnowledgePackets(
 state: EpistemeState,
 filter: KnowledgePacketFilter = {},
): KnowledgePacket[] {
 const sourcePackets =
   filter.includeArchive
     ? [
         ...state.queue.packets,
         ...state.archive,
       ]
     : state.queue.packets;

 const packets = sourcePackets.filter(
   (packet) => {
     const organMatches =
       !filter.organId ||
       packet.from === filter.organId ||
       packet.to === filter.organId;

     const statusMatches =
       matchesFilterValue(
         packet.status,
         filter.status,
       );

     const priorityMatches =
       matchesFilterValue(
         packet.priority,
         filter.priority,
       );

     const typeMatches =
       matchesFilterValue(
         packet.type,
         filter.type,
       );

     return (
       organMatches &&
       statusMatches &&
       priorityMatches &&
       typeMatches
     );
   },
 );

 const sorted = [...packets].sort(
   (left, right) =>
     right.metadata.timestamp -
     left.metadata.timestamp,
 );

 if (
   filter.limit !== undefined &&
   filter.limit >= 0
 ) {
   return sorted.slice(
     0,
     filter.limit,
   );
 }

 return sorted;
}

/* ==========================================================
  Knowledge Packets Hook Result
========================================================== */

export interface UseKnowledgePacketsResult {
 packets: KnowledgePacket[];

 queued: KnowledgePacket[];

 processing: KnowledgePacket[];

 completed: KnowledgePacket[];

 archived: KnowledgePacket[];

 activePacket: KnowledgePacket | null;

 total: number;

 queuedCount: number;

 processingCount: number;

 archivedCount: number;

 getPacket: (
   packetId: string,
 ) => KnowledgePacket | null;
}

/* ==========================================================
  useKnowledgePackets
========================================================== */

export function useKnowledgePackets(
 filter: KnowledgePacketFilter = {},
): UseKnowledgePacketsResult {
 const {
   scheduler,
   kernelState,
   kernelSnapshot,
 } = useEpistemeContext();

 const {
   organId,
   status,
   priority,
   type,
   includeArchive,
   limit,
 } = filter;

 return useMemo(() => {
   const resolvedFilter: KnowledgePacketFilter = {
     organId,
     status,
     priority,
     type,
     includeArchive,
     limit,
   };

   const packets =
     selectKnowledgePackets(
       kernelState,
       resolvedFilter,
     );

   const queued =
     kernelState.queue.packets.filter(
       (packet) =>
         packet.status === "created" ||
         packet.status === "queued",
     );

   const processing =
     kernelState.queue.packets.filter(
       (packet) =>
         packet.status ===
         "processing",
     );

   const completed =
     kernelState.queue.packets.filter(
       (packet) =>
         packet.status ===
         "completed",
     );

   const archived =
     kernelState.archive;

   return {
     packets,

     queued,
     processing,
     completed,
     archived,

     activePacket:
       kernelSnapshot.activePacket,

     total:
       kernelState.queue.packets.length +
       kernelState.archive.length,

     queuedCount: queued.length,

     processingCount:
       processing.length,

     archivedCount:
       archived.length,

     getPacket: (
       packetId: string,
     ) => scheduler.getPacket(
       packetId,
     ),
   };
 }, [
   scheduler,
   kernelState,
   kernelSnapshot.activePacket,
   organId,
   status,
   priority,
   type,
   includeArchive,
   limit,
 ]);
}

/* ==========================================================
  Active Packet Hook
========================================================== */

export function useActiveKnowledgePacket():
 KnowledgePacket | null {
 return useEpistemeContext()
   .kernelSnapshot.activePacket;
}

/* ==========================================================
  Civilization Cycle Hook Result
========================================================== */

export interface UseCivilizationCycleResult {
 cycle: EpistemeCycle;

 number: number;

 progress: number;

 activeOrganId:
   EpistemeOrganId;

 nextOrganId:
   EpistemeOrganId;

 previousOrganId:
   | EpistemeOrganId
   | null;

 completedOrganIds:
   EpistemeOrganId[];

 startedAt: number | null;

 completedAt: number | null;

 isStarted: boolean;

 isComplete: boolean;

 isSynchronizing: boolean;

 elapsedMs: number;
}

/* ==========================================================
  useCivilizationCycle
========================================================== */

export function useCivilizationCycle():
 UseCivilizationCycleResult {
 const {
   kernelState,
 } = useEpistemeContext();

 /*
  * updatedAt changes whenever state changes,
  * providing a stable elapsed-time snapshot
  * without creating an additional interval.
  */
 return useMemo(() => {
   const cycle =
     kernelState.cycle;

   const startedAt =
     cycle.startedAt;

   const completedAt =
     cycle.completedAt;

   const elapsedMs = startedAt
     ? Math.max(
         0,
         (
           completedAt ??
           kernelState.updatedAt
         ) - startedAt,
       )
     : 0;

   return {
     cycle,

     number: cycle.number,

     progress: cycle.progress,

     activeOrganId:
       cycle.activeOrgan,

     nextOrganId:
       cycle.nextOrgan,

     previousOrganId:
       cycle.previousOrgan,

     completedOrganIds:
       cycle.completedOrgans,

     startedAt,

     completedAt,

     isStarted:
       startedAt !== null,

     isComplete:
       cycle.progress >= 100,

     isSynchronizing:
       kernelState.kernelStatus ===
         "synchronizing" ||
       kernelState.kernelPhase ===
         "synchronization",

     elapsedMs,
   };
 }, [kernelState]);
}

/* ==========================================================
  Metrics Hook Result
========================================================== */

export interface UseEpistemeMetricsResult {
 metrics: EpistemeMetrics;

 health: number;

 synchronization: number;

 activity: number;

 averageConfidence: number;

 totalCycles: number;

 completedCycles: number;

 totalPacketsCreated: number;

 totalPacketsProcessed: number;

 totalPacketsArchived: number;

 uptime: number;

 isHealthy: boolean;

 isSynchronized: boolean;

 cognitiveLoad: number;
}

/* ==========================================================
  useEpistemeMetrics
========================================================== */

export function useEpistemeMetrics():
 UseEpistemeMetricsResult {
 const {
   kernelState,
 } = useEpistemeContext();

 return useMemo(() => {
   const metrics =
     kernelState.metrics;

   /*
    * The current state.ts names this field
    * "activity". It represents the aggregate
    * cognitive load across the six organs.
    */
   const cognitiveLoad =
     metrics.activity;

   return {
     metrics,

     health: metrics.health,

     synchronization:
       metrics.synchronization,

     activity: metrics.activity,

     averageConfidence:
       metrics.averageConfidence,

     totalCycles:
       metrics.totalCycles,

     completedCycles:
       metrics.completedCycles,

     totalPacketsCreated:
       metrics.totalPacketsCreated,

     totalPacketsProcessed:
       metrics.totalPacketsProcessed,

     totalPacketsArchived:
       metrics.totalPacketsArchived,

     uptime: metrics.uptime,

     isHealthy:
       metrics.health >= 70,

     isSynchronized:
       metrics.synchronization >= 80,

     cognitiveLoad,
   };
 }, [kernelState.metrics]);
}

/* ==========================================================
  Events Hook Result
========================================================== */

export interface UseEpistemeEventsResult {
 events: EpistemeEvent[];

 latestEvent:
   | EpistemeEvent
   | null;

 errors: EpistemeError[];

 latestError:
   | EpistemeError
   | null;

 hasErrors: boolean;
}

/* ==========================================================
  useEpistemeEvents
========================================================== */

export function useEpistemeEvents(
 limit = 20,
): UseEpistemeEventsResult {
 const {
   kernelState,
 } = useEpistemeContext();

 return useMemo(() => {
   const safeLimit =
     Math.max(0, limit);

   const events = [
     ...kernelState.events,
   ]
     .sort(
       (left, right) =>
         right.timestamp -
         left.timestamp,
     )
     .slice(0, safeLimit);

   const errors = [
     ...kernelState.errors,
   ]
     .sort(
       (left, right) =>
         right.timestamp -
         left.timestamp,
     )
     .slice(0, safeLimit);

   return {
     events,

     latestEvent:
       events[0] ?? null,

     errors,

     latestError:
       errors[0] ?? null,

     hasErrors:
       errors.length > 0,
   };
 }, [
   kernelState.events,
   kernelState.errors,
   limit,
 ]);
}

/* ==========================================================
  System Status
========================================================== */

export type EpistemeSystemStatus =
 | "offline"
 | "booting"
 | "operating"
 | "waiting"
 | "paused"
 | "synchronizing"
 | "complete"
 | "degraded"
 | "error";

/* ==========================================================
  System Status Resolver
========================================================== */

export function resolveEpistemeSystemStatus(
 schedulerState:
   EpistemeSchedulerState,
 kernelState:
   EpistemeState,
): EpistemeSystemStatus {
 if (
   schedulerState.status ===
     "error" ||
   kernelState.kernelStatus ===
     "error" ||
   kernelState.errors.length > 0
 ) {
   return "error";
 }

 if (
   kernelState.metrics.health < 70
 ) {
   return "degraded";
 }

 if (
   schedulerState.status ===
     "starting" ||
   kernelState.kernelStatus ===
     "initializing"
 ) {
   return "booting";
 }

 if (
   schedulerState.status ===
     "paused" ||
   kernelState.kernelStatus ===
     "paused"
 ) {
   return "paused";
 }

 if (
   kernelState.kernelStatus ===
     "synchronizing" ||
   kernelState.kernelPhase ===
     "synchronization"
 ) {
   return "synchronizing";
 }

 if (
   schedulerState.status ===
     "completed" ||
   kernelState.kernelStatus ===
     "completed"
 ) {
   return "complete";
 }

 if (
   schedulerState.status ===
     "running" ||
   kernelState.kernelStatus ===
     "running"
 ) {
   return "operating";
 }

 if (
   schedulerState.status ===
     "waiting" ||
   kernelState.kernelStatus ===
     "idle"
 ) {
   return "waiting";
 }

 return "offline";
}

/* ==========================================================
  Status Label
========================================================== */

export function getEpistemeSystemStatusLabel(
 status: EpistemeSystemStatus,
): string {
 switch (status) {
   case "offline":
     return "Offline";

   case "booting":
     return "Initializing";

   case "operating":
     return "Operating";

   case "waiting":
     return "Awaiting Signal";

   case "paused":
     return "Paused";

   case "synchronizing":
     return "Synchronizing";

   case "complete":
     return "Cycle Complete";

   case "degraded":
     return "Degraded";

   case "error":
     return "System Error";

   default:
     return "Unknown";
 }
}

/* ==========================================================
  Status Hook Result
========================================================== */

export interface UseEpistemeStatusResult {
 status: EpistemeSystemStatus;

 label: string;

 schedulerStatus:
   EpistemeSchedulerState["status"];

 kernelStatus:
   EpistemeState["kernelStatus"];

 kernelPhase:
   EpistemeState["kernelPhase"];

 activeOrganId:
   EpistemeOrganId;

 activeOperation: string;

 ready: boolean;

 isOnline: boolean;

 isOperating: boolean;

 isWaiting: boolean;

 isPaused: boolean;

 isSynchronizing: boolean;

 isComplete: boolean;

 isDegraded: boolean;

 hasError: boolean;
}

/* ==========================================================
  useEpistemeStatus
========================================================== */

export function useEpistemeStatus():
 UseEpistemeStatusResult {
 const {
   schedulerState,
   kernelState,
   ready,
 } = useEpistemeContext();

 return useMemo(() => {
   const status =
     resolveEpistemeSystemStatus(
       schedulerState,
       kernelState,
     );

   const activeOrganId =
     kernelState.cycle.activeOrgan;

   const activeOrgan =
     kernelState.organs[
       activeOrganId
     ];

   return {
     status,

     label:
       getEpistemeSystemStatusLabel(
         status,
       ),

     schedulerStatus:
       schedulerState.status,

     kernelStatus:
       kernelState.kernelStatus,

     kernelPhase:
       kernelState.kernelPhase,

     activeOrganId,

     activeOperation:
       resolveOrganOperationLabel(
         activeOrganId,
         activeOrgan.runtimeState,
       ),

     ready,

     isOnline:
       status !== "offline" &&
       status !== "error",

     isOperating:
       status === "operating",

     isWaiting:
       status === "waiting",

     isPaused:
       status === "paused",

     isSynchronizing:
       status === "synchronizing",

     isComplete:
       status === "complete",

     isDegraded:
       status === "degraded",

     hasError:
       status === "error",
   };
 }, [
   schedulerState,
   kernelState,
   ready,
 ]);
}

/* ==========================================================
  Is Organ Active Hook
========================================================== */

export function useIsEpistemeOrganActive(
 organId: EpistemeOrganId,
): boolean {
 const {
   kernelState,
 } = useEpistemeContext();

 return (
   kernelState.cycle.activeOrgan ===
   organId
 );
}

/* ==========================================================
  Organ Progress Hook
========================================================== */

export function useEpistemeOrganProgress(
 organId: EpistemeOrganId,
): number {
 const {
   kernelState,
 } = useEpistemeContext();

 return useMemo(() => {
   const completed =
     kernelState.cycle.completedOrgans;

   if (completed.includes(organId)) {
     return 100;
   }

   if (
     kernelState.cycle.activeOrgan ===
     organId
   ) {
     return 50;
   }

   return 0;
 }, [
   kernelState.cycle,
   organId,
 ]);
}

/* ==========================================================
  Queue Summary Hook
========================================================== */

export interface UseEpistemeQueueSummaryResult {
 total: number;

 created: number;

 queued: number;

 processing: number;

 completed: number;

 critical: number;

 highPriority: number;
}

export function useEpistemeQueueSummary():
 UseEpistemeQueueSummaryResult {
 const {
   kernelState,
 } = useEpistemeContext();

 return useMemo(() => {
   const packets =
     kernelState.queue.packets;

   return {
     total: packets.length,

     created:
       packets.filter(
         (packet) =>
           packet.status ===
           "created",
       ).length,

     queued:
       packets.filter(
         (packet) =>
           packet.status ===
           "queued",
       ).length,

     processing:
       packets.filter(
         (packet) =>
           packet.status ===
           "processing",
       ).length,

     completed:
       packets.filter(
         (packet) =>
           packet.status ===
           "completed",
       ).length,

     critical:
       packets.filter(
         (packet) =>
           packet.priority ===
           "critical",
       ).length,

     highPriority:
       packets.filter(
         (packet) =>
           packet.priority ===
             "high" ||
           packet.priority ===
             "critical",
       ).length,
   };
 }, [kernelState.queue.packets]);
}