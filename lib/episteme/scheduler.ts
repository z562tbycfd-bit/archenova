/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/scheduler.ts

   Responsibilities:
   - Control Episteme Runtime timing
   - Start / Pause / Resume / Stop execution
   - Execute one Organ per Tick
   - Coordinate synchronization timing
   - Start subsequent civilization cycles
   - Optionally generate idle Knowledge Packets
   - Pause safely while the browser tab is hidden

   Dependency direction:
   types / constants / utils
              ↓
            store
              ↓
            engine
              ↓
          scheduler

   Important:
   - Scheduler does not own Episteme Runtime State.
   - Runtime Store remains the single source of truth.
   - Scheduler owns only timing and execution-control state.
========================================================== */

import {
  DEFAULT_EPISTEME_SCHEDULER_CONFIG,
  DEFAULT_IDLE_PACKET_TITLES,
  EPISTEME_ERROR_CODES,
  EPISTEME_ORGANS,
} from "./constants";

import {
  createRuntimeId,
  wait,
} from "./utils";

import type {
  EpistemeSchedulerConfig,
  EpistemeSchedulerContract,
  EpistemeSchedulerMode,
  EpistemeSchedulerStatus,
  KnowledgePacketInput,
  OrganId,
  SchedulerTickResult,
} from "./types";

import type {
  EpistemeRuntimeStore,
} from "./store";

import type {
  EpistemeEngine,
} from "./engine";

/* ==========================================================
   Scheduler Public State
========================================================== */

export interface EpistemeSchedulerState {
  id: string;

  status: EpistemeSchedulerStatus;

  mode: EpistemeSchedulerMode;

  running: boolean;

  paused: boolean;

  waiting: boolean;

  processing: boolean;

  destroyed: boolean;

  tickCount: number;

  cycleCount: number;

  startedAt: number | null;

  stoppedAt: number | null;

  lastTickAt: number | null;

  nextTickAt: number | null;

  lastError: string | null;

  hiddenByDocument: boolean;

  pausedByVisibility: boolean;
}

/* ==========================================================
   Scheduler Snapshot
========================================================== */

export interface EpistemeSchedulerSnapshot {
  state: EpistemeSchedulerState;

  revision: number;

  timestamp: number;
}

/* ==========================================================
   Scheduler Listener
========================================================== */

export type EpistemeSchedulerListener = (
  snapshot: EpistemeSchedulerSnapshot,
) => void;

/* ==========================================================
   Internal Tick Options
========================================================== */

interface SchedulerTickOptions {
  ignoreMode?: boolean;

  allowWhenPaused?: boolean;

  scheduleNext?: boolean;
}

/* ==========================================================
   Timer Type
========================================================== */

type SchedulerTimer =
  ReturnType<typeof setTimeout>;

/* ==========================================================
   Default Idle Packet Factory
========================================================== */

function createIdlePacketInput(
  index: number,
): KnowledgePacketInput {
  const title =
    DEFAULT_IDLE_PACKET_TITLES[
      index %
        DEFAULT_IDLE_PACKET_TITLES.length
    ];

  return {
    title,

    summary:
      "A generated civilizational signal awaiting observation and cognitive processing.",

    content:
      [
        "Episteme generated this placeholder Knowledge Packet because the active queue was empty.",

        "The packet begins at Observation and will move through Understanding, Reasoning, Design, Realization, and Memory.",

        "Replace generated packets with verified ArcheNova signals before production intelligence outputs are presented as factual analysis.",
      ].join("\n\n"),

    type: "signal",

    priority: "normal",

    tags: [
      "episteme",
      "generated-signal",
      "runtime",
    ],

    confidence: 45,

    importance: 50,

    relevance: 55,

    from: "memory",

    to: "observation",

    source: {
      name: "Episteme Runtime",

      provider:
        "Idle Packet Generator",

      retrievedAt:
        Date.now(),
    },
  };
}

/* ==========================================================
   Episteme Scheduler
========================================================== */

export class EpistemeScheduler
  implements EpistemeSchedulerContract
{
  private readonly store:
    EpistemeRuntimeStore;

  private readonly engine:
    EpistemeEngine;

  private config:
    EpistemeSchedulerConfig;

  private state:
    EpistemeSchedulerState;

  private snapshot:
    EpistemeSchedulerSnapshot;

  private revision = 0;

  private timer:
    SchedulerTimer | null = null;

  private startPromise:
    Promise<void> | null = null;

  private activeTickPromise:
    Promise<SchedulerTickResult> | null =
      null;

  private readonly listeners =
    new Set<EpistemeSchedulerListener>();

  private visibilityHandlerAttached =
    false;

  /* ========================================================
     Constructor
  ======================================================== */

  constructor(
    store: EpistemeRuntimeStore,

    engine: EpistemeEngine,

    config:
      Partial<
        EpistemeSchedulerConfig
      > = {},
  ) {
    this.store = store;

    this.engine = engine;

    this.config = {
      ...DEFAULT_EPISTEME_SCHEDULER_CONFIG,
      ...config,
    };

    const hidden =
      this.isDocumentHidden();

    this.state = {
      id:
        createRuntimeId(
          "scheduler",
        ),

      status: "offline",

      mode:
        this.config.mode,

      running: false,

      paused: false,

      waiting: false,

      processing: false,

      destroyed: false,

      tickCount: 0,

      cycleCount: 0,

      startedAt: null,

      stoppedAt: null,

      lastTickAt: null,

      nextTickAt: null,

      lastError: null,

      hiddenByDocument:
        hidden,

      pausedByVisibility:
        false,
    };

    this.snapshot =
      this.createSnapshot();

    this.attachVisibilityHandler();

    if (this.config.autoStart) {
      queueMicrotask(() => {
        void this.start();
      });
    }
  }

  /* ========================================================
     Public Access
  ======================================================== */

  getStore():
    EpistemeRuntimeStore {
    return this.store;
  }

  getEngine():
    EpistemeEngine {
    return this.engine;
  }

  getConfig():
    Readonly<EpistemeSchedulerConfig> {
    return this.config;
  }

  getState():
    EpistemeSchedulerState {
    return this.state;
  }

  getSnapshot():
    EpistemeSchedulerSnapshot {
    return this.snapshot;
  }

  getServerSnapshot():
    EpistemeSchedulerSnapshot {
    return this.snapshot;
  }

  getStatus():
    EpistemeSchedulerStatus {
    return this.state.status;
  }

  isRunning(): boolean {
    return (
      this.state.running &&
      !this.state.paused &&
      !this.state.destroyed
    );
  }

  isPaused(): boolean {
    return this.state.paused;
  }

  isProcessing(): boolean {
    return this.state.processing;
  }

  isDestroyed(): boolean {
    return this.state.destroyed;
  }

  /* ========================================================
     Subscription
  ======================================================== */

  subscribe(
    listener:
      EpistemeSchedulerListener,
  ): () => void {
    if (this.state.destroyed) {
      return () => undefined;
    }

    this.listeners.add(listener);

    return () => {
      this.listeners.delete(
        listener,
      );
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.snapshot);
      } catch (error) {
        console.error(
          "[Episteme Scheduler] listener failed:",
          error,
        );
      }
    }
  }

  /* ========================================================
     Snapshot
  ======================================================== */

  private createSnapshot():
    EpistemeSchedulerSnapshot {
    return {
      state: this.state,

      revision:
        this.revision,

      timestamp:
        Date.now(),
    };
  }

  private updateState(
    patch:
      | Partial<EpistemeSchedulerState>
      | ((
          state:
            EpistemeSchedulerState,
        ) =>
          EpistemeSchedulerState),
  ): EpistemeSchedulerState {
    if (this.state.destroyed) {
      return this.state;
    }

    const nextState =
      typeof patch === "function"
        ? patch(this.state)
        : {
            ...this.state,
            ...patch,
          };

    this.revision += 1;

    this.state =
      nextState;

    this.snapshot =
      this.createSnapshot();

    this.notify();

    return this.state;
  }

  /* ========================================================
     Configuration
  ======================================================== */

  updateConfig(
    config:
      Partial<
        EpistemeSchedulerConfig
      >,
  ): void {
    if (this.state.destroyed) {
      return;
    }

    this.config = {
      ...this.config,
      ...config,
    };

    this.updateState({
      mode:
        this.config.mode,
    });
  }

  setMode(
    mode:
      EpistemeSchedulerMode,
  ): void {
    if (this.state.destroyed) {
      return;
    }

    this.config = {
      ...this.config,
      mode,
    };

    this.updateState({
      mode,
    });

    if (
      mode === "manual"
    ) {
      this.clearTimer();

      this.updateState({
        nextTickAt: null,
      });
    } else if (
      this.isRunning() &&
      !this.state.processing
    ) {
      this.scheduleNextTick(
        this.config.organIntervalMs,
      );
    }
  }

  /* ========================================================
     Timer Management
  ======================================================== */

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);

      this.timer = null;
    }
  }

  private scheduleNextTick(
    delayMs:
      number = this.config
        .organIntervalMs,
  ): void {
    this.clearTimer();

    if (
      !this.isRunning() ||
      this.state.processing ||
      this.state.mode ===
        "manual" ||
      this.state.destroyed
    ) {
      this.updateState({
        nextTickAt: null,
      });

      return;
    }

    const delay =
      Math.max(0, delayMs);

    this.updateState({
      status: "waiting",

      waiting: true,

      nextTickAt:
        Date.now() + delay,
    });

    this.timer = setTimeout(
      () => {
        this.timer = null;

        void this.tick();
      },
      delay,
    );
  }

  /* ========================================================
     Browser Visibility
  ======================================================== */

  private isDocumentHidden():
    boolean {
    return (
      typeof document !==
        "undefined" &&
      document.hidden
    );
  }

  private attachVisibilityHandler():
    void {
    if (
      typeof document ===
        "undefined" ||
      this.visibilityHandlerAttached
    ) {
      return;
    }

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );

    this.visibilityHandlerAttached =
      true;
  }

  private detachVisibilityHandler():
    void {
    if (
      typeof document ===
        "undefined" ||
      !this.visibilityHandlerAttached
    ) {
      return;
    }

    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );

    this.visibilityHandlerAttached =
      false;
  }

  private readonly handleVisibilityChange =
    (): void => {
      if (this.state.destroyed) {
        return;
      }

      const hidden =
        this.isDocumentHidden();

      this.updateState({
        hiddenByDocument:
          hidden,
      });

      if (
        hidden &&
        this.config
          .pauseWhenHidden &&
        this.isRunning()
      ) {
        this.pauseForVisibility();

        return;
      }

      if (
        !hidden &&
        this.config
          .resumeWhenVisible &&
        this.state
          .pausedByVisibility
      ) {
        void this.resumeFromVisibility();
      }
    };

  private pauseForVisibility():
    void {
    if (
      this.state.destroyed ||
      this.state.paused
    ) {
      return;
    }

    this.clearTimer();

    this.store.pause();

    this.updateState({
      status: "paused",

      paused: true,

      waiting: false,

      pausedByVisibility:
        true,

      nextTickAt: null,
    });
  }

  private async resumeFromVisibility():
    Promise<void> {
    if (
      this.state.destroyed ||
      !this.state
        .pausedByVisibility
    ) {
      return;
    }

    this.store.resume();

    this.updateState({
      status: "running",

      running: true,

      paused: false,

      waiting: false,

      pausedByVisibility:
        false,

      hiddenByDocument:
        false,
    });

    if (
      this.state.mode !==
      "manual"
    ) {
      this.scheduleNextTick(
        this.config.organIntervalMs,
      );
    }
  }

  /* ========================================================
     Runtime Guards
  ======================================================== */

  private canExecute(
    allowWhenPaused = false,
  ): boolean {
    if (
      this.state.destroyed ||
      this.store.isDestroyed() ||
      this.engine.isDestroyed()
    ) {
      return false;
    }

    if (
      this.state.paused &&
      !allowWhenPaused
    ) {
      return false;
    }

    return true;
  }

  /* ========================================================
     Idle Packet Generation
  ======================================================== */

  private generateIdlePacket():
    string | null {
    if (
      !this.config
        .generatePacketsWhenIdle
    ) {
      return null;
    }

    const input =
      createIdlePacketInput(
        this.state.tickCount,
      );

    const packet =
      this.store.ingest(input);

    return packet.id;
  }

  private ensurePacket():
    string | null {
    const activePacket =
      this.store.getActivePacket();

    if (activePacket) {
      return activePacket.id;
    }

    const queuedPacket =
      this.store
        .getQueuedPackets()[0];

    if (queuedPacket) {
      this.store.setActivePacket(
        queuedPacket.id,
      );

      return queuedPacket.id;
    }

    return this.generateIdlePacket();
  }

  /* ========================================================
     Start
  ======================================================== */

  async start(): Promise<void> {
    if (
      this.state.destroyed
    ) {
      return;
    }

    if (this.startPromise) {
      return this.startPromise;
    }

    if (
      this.isRunning()
    ) {
      return;
    }

    this.startPromise =
      this.performStart();

    try {
      await this.startPromise;
    } finally {
      this.startPromise = null;
    }
  }

  private async performStart():
    Promise<void> {
    const timestamp =
      Date.now();

    this.clearTimer();

    this.updateState({
      status: "starting",

      running: true,

      paused: false,

      waiting: false,

      processing: false,

      startedAt:
        this.state.startedAt ??
        timestamp,

      stoppedAt: null,

      lastError: null,

      pausedByVisibility:
        false,

      nextTickAt: null,
    });

    this.store.start();

    const packetId =
      this.ensurePacket();

    if (!packetId) {
      this.store.setStatus(
        "waiting",
      );

      this.updateState({
        status: "waiting",

        waiting: true,
      });

      if (
        this.state.mode !==
        "manual"
      ) {
        this.scheduleNextTick(
          this.config
            .cycleIntervalMs,
        );
      }

      return;
    }

    const initialDelay =
      Math.max(
        0,
        this.config
          .initialDelayMs,
      );

    if (initialDelay > 0) {
      await wait(initialDelay);
    }

    if (
      !this.isRunning()
    ) {
      return;
    }

    this.updateState({
      status: "running",

      waiting: false,
    });

    if (
      this.state.mode ===
      "manual"
    ) {
      return;
    }

    if (
      this.state.mode ===
      "single-cycle"
    ) {
      await this.processNextCycle();

      return;
    }

    this.scheduleNextTick(0);
  }

  /* ========================================================
     Pause
  ======================================================== */

  pause(): void {
    if (
      this.state.destroyed ||
      this.state.paused
    ) {
      return;
    }

    this.clearTimer();

    this.store.pause();

    this.updateState({
      status: "paused",

      paused: true,

      waiting: false,

      nextTickAt: null,

      pausedByVisibility:
        false,
    });
  }

  /* ========================================================
     Resume
  ======================================================== */

  async resume(): Promise<void> {
    if (
      this.state.destroyed ||
      !this.state.paused
    ) {
      return;
    }

    this.store.resume();

    this.updateState({
      status: "running",

      running: true,

      paused: false,

      waiting: false,

      stoppedAt: null,

      lastError: null,

      pausedByVisibility:
        false,
    });

    if (
      this.state.mode ===
      "manual"
    ) {
      return;
    }

    if (
      this.state.mode ===
      "single-cycle"
    ) {
      await this.processNextCycle();

      return;
    }

    this.scheduleNextTick(0);
  }

  /* ========================================================
     Stop
  ======================================================== */

  stop(): void {
    if (this.state.destroyed) {
      return;
    }

    this.clearTimer();

    this.store.stop();

    this.updateState({
      status: "offline",

      running: false,

      paused: false,

      waiting: false,

      processing: false,

      stoppedAt: Date.now(),

      nextTickAt: null,

      pausedByVisibility:
        false,
    });
  }

  /* ========================================================
     Tick
  ======================================================== */

  async tick():
    Promise<SchedulerTickResult> {
    if (this.activeTickPromise) {
      return this.activeTickPromise;
    }

    this.activeTickPromise =
      this.executeTick({
        scheduleNext: true,
      });

    try {
      return await this.activeTickPromise;
    } finally {
      this.activeTickPromise = null;
    }
  }

  private async executeTick(
    options:
      SchedulerTickOptions = {},
  ): Promise<SchedulerTickResult> {
    const {
      allowWhenPaused = false,
      scheduleNext = true,
    } = options;

    const stateBefore =
      this.store.getState();

    const currentOrgan =
      stateBefore.cycle
        .activeOrgan;

    if (
      !this.canExecute(
        allowWhenPaused,
      )
    ) {
      return this.createTickResult(
        false,
        currentOrgan,
        null,
        "Scheduler is not available for execution.",
      );
    }

    if (
      !this.state.running &&
      !allowWhenPaused
    ) {
      return this.createTickResult(
        false,
        currentOrgan,
        null,
        "Scheduler is not running.",
      );
    }

    if (this.state.processing) {
      return this.createTickResult(
        false,
        currentOrgan,
        stateBefore.queue
          .activePacketId,
        "A Scheduler Tick is already processing.",
      );
    }

    this.clearTimer();

    const packetId =
      this.ensurePacket();

    if (!packetId) {
      this.store.setStatus(
        "waiting",
      );

      this.updateState({
        status: "waiting",

        waiting: true,

        processing: false,

        lastTickAt:
          Date.now(),

        nextTickAt: null,
      });

      if (
        scheduleNext &&
        this.state.mode ===
          "automatic"
      ) {
        this.scheduleNextTick(
          this.config
            .cycleIntervalMs,
        );
      }

      return this.createTickResult(
        false,
        currentOrgan,
        null,
        "No Knowledge Packet is available.",
      );
    }

    this.updateState({
      status: "running",

      waiting: false,

      processing: true,

      nextTickAt: null,

      lastError: null,
    });

    try {
      const beforeProcessing =
        this.store.getState();

      const organId =
        beforeProcessing.cycle
          .activeOrgan;

      const result =
        await this.engine
          .processCurrentOrganDetailed();

      if (!result) {
        this.updateState({
          status: "waiting",

          waiting: true,

          processing: false,

          tickCount:
            this.state.tickCount +
            1,

          lastTickAt:
            Date.now(),
        });

        if (
          scheduleNext &&
          this.state.mode ===
            "automatic"
        ) {
          this.scheduleNextTick(
            this.config
              .cycleIntervalMs,
          );
        }

        return this.createTickResult(
          false,
          organId,
          packetId,
          "The current Organ did not produce a result.",
        );
      }

      if (
        result.organId ===
        "memory"
      ) {
        await this.completeMemoryCycle(
          result.packet.id,
        );
      } else {
        await this.engine
          .advanceOrgan();
      }

      const afterProcessing =
        this.store.getState();

      const cycleCompleted =
        afterProcessing.cycle
          .status ===
        "completed";

      this.updateState(
        (schedulerState) => ({
          ...schedulerState,

          status:
            cycleCompleted
              ? "completed"
              : "running",

          waiting: false,

          processing: false,

          tickCount:
            schedulerState
              .tickCount + 1,

          cycleCount:
            cycleCompleted
              ? schedulerState
                  .cycleCount + 1
              : schedulerState
                  .cycleCount,

          lastTickAt:
            Date.now(),

          nextTickAt: null,
        }),
      );

      if (cycleCompleted) {
        await this.handleCompletedCycle(
          scheduleNext,
        );
      } else if (
        scheduleNext &&
        this.state.mode ===
          "automatic"
      ) {
        this.scheduleNextTick(
          this.config
            .organIntervalMs,
        );
      }

      return this.createTickResult(
        true,
        result.organId,
        result.packet.id,
        cycleCompleted
          ? "Civilization Intelligence cycle completed."
          : `${EPISTEME_ORGANS[result.organId].title} completed. ${EPISTEME_ORGANS[result.nextOrganId].title} is next.`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown Scheduler failure.";

      this.store.reportError(
        EPISTEME_ERROR_CODES
          .SCHEDULER_FAILURE,
        message,
        {
          recoverable: true,

          organId:
            this.store.getState()
              .cycle.activeOrgan,

          packetId:
            this.store.getState()
              .queue
              .activePacketId ??
            undefined,

          cycleId:
            this.store.getState()
              .cycle.id,
        },
      );

      this.updateState({
        status: "error",

        waiting: false,

        processing: false,

        lastTickAt:
          Date.now(),

        nextTickAt: null,

        lastError:
          message,
      });

      return this.createTickResult(
        false,
        this.store.getState()
          .cycle.activeOrgan,
        packetId,
        message,
      );
    }
  }

  /* ========================================================
     Memory and Synchronization
  ======================================================== */

  private async completeMemoryCycle(
    packetId: string,
  ): Promise<void> {
    const state =
      this.store.getState();

    this.store.setSynchronizing(
      true,
    );

    this.store.emitEvent(
      "synchronization_started",
      `Civilization Intelligence cycle ${state.cycle.number} entered synchronization.`,
      {
        cycleId:
          state.cycle.id,

        organId: "memory",

        packetId,
      },
    );

    const synchronizationDelay =
      Math.max(
        0,
        this.config
          .synchronizationMs,
      );

    if (
      synchronizationDelay > 0
    ) {
      await wait(
        synchronizationDelay,
      );
    }

    if (
      this.state.destroyed
    ) {
      return;
    }

    await this.engine
      .completeCycle();
  }

  /* ========================================================
     Completed Cycle Handling
  ======================================================== */

  private async handleCompletedCycle(
    scheduleNext: boolean,
  ): Promise<void> {
    if (
      this.state.mode ===
      "single-cycle"
    ) {
      this.store.setRunning(
        false,
      );

      this.updateState({
        status: "completed",

        running: false,

        paused: false,

        waiting: false,

        processing: false,

        stoppedAt:
          Date.now(),

        nextTickAt: null,
      });

      return;
    }

    if (
      this.state.mode ===
      "manual" ||
      !scheduleNext
    ) {
      return;
    }

    const cycleDelay =
      Math.max(
        0,
        this.config
          .cycleIntervalMs,
      );

    this.updateState({
      status: "waiting",

      waiting: true,
    });

    this.scheduleNextTick(
      cycleDelay,
    );
  }

  /* ========================================================
     Start a New Cycle When Needed
  ======================================================== */

  private prepareNextCycle():
    boolean {
    const state =
      this.store.getState();

    if (
      state.cycle.status !==
      "completed"
    ) {
      return true;
    }

    const packetId =
      this.ensurePacket();

    if (!packetId) {
      return false;
    }

    this.store.startCycle();

    return true;
  }

  /* ========================================================
     Manual One-Step Processing
  ======================================================== */

  async processNextStep():
    Promise<SchedulerTickResult> {
    if (this.state.destroyed) {
      return this.createTickResult(
        false,
        this.store.getState()
          .cycle.activeOrgan,
        null,
        "Scheduler has been destroyed.",
      );
    }

    const wasRunning =
      this.state.running;

    const wasPaused =
      this.state.paused;

    if (!wasRunning) {
      this.store.start();

      this.updateState({
        status: "running",

        running: true,

        paused: false,

        waiting: false,
      });
    }

    this.prepareNextCycle();

    const result =
      await this.executeTick({
        allowWhenPaused: true,

        scheduleNext: false,
      });

    if (!wasRunning) {
      this.store.stop();

      this.updateState({
        status:
          result.status ===
          "completed"
            ? "completed"
            : "offline",

        running: false,

        paused:
          wasPaused,

        waiting: false,

        processing: false,

        stoppedAt:
          Date.now(),

        nextTickAt: null,
      });
    }

    return result;
  }

  /* ========================================================
     Process Complete Cycle
  ======================================================== */

  async processNextCycle():
    Promise<void> {
    if (
      !this.canExecute(true)
    ) {
      return;
    }

    this.clearTimer();

    const packetId =
      this.ensurePacket();

    if (!packetId) {
      this.store.setStatus(
        "waiting",
      );

      this.updateState({
        status: "waiting",

        waiting: true,

        processing: false,
      });

      return;
    }

    if (
      this.store.getState()
        .cycle.status ===
      "completed"
    ) {
      this.store.startCycle();
    }

    if (
      this.store.getState()
        .cycle.status ===
      "idle"
    ) {
      this.store.startCycle();
    }

    this.updateState({
      status: "running",

      running: true,

      paused: false,

      waiting: false,

      processing: true,
    });

    try {
      const maximumSteps = 6;

      for (
        let step = 0;
        step < maximumSteps;
        step += 1
      ) {
        if (
          this.state.destroyed ||
          this.state.paused
        ) {
          return;
        }

        const currentOrgan =
          this.store.getState()
            .cycle.activeOrgan;

        const result =
          await this.engine
            .processCurrentOrganDetailed();

        if (!result) {
          break;
        }

        this.updateState(
          (state) => ({
            ...state,

            tickCount:
              state.tickCount + 1,

            lastTickAt:
              Date.now(),
          }),
        );

        if (
          currentOrgan ===
          "memory"
        ) {
          await this.completeMemoryCycle(
            result.packet.id,
          );

          break;
        }

        await this.engine
          .advanceOrgan();

        const organDelay =
          Math.max(
            0,
            this.config
              .organIntervalMs,
          );

        if (
          organDelay > 0 &&
          step <
            maximumSteps - 1
        ) {
          await wait(organDelay);
        }
      }

      const completed =
        this.store.getState()
          .cycle.status ===
        "completed";

      this.updateState(
        (state) => ({
          ...state,

          status: completed
            ? "completed"
            : "waiting",

          waiting:
            !completed,

          processing: false,

          cycleCount:
            completed
              ? state.cycleCount +
                1
              : state.cycleCount,

          lastTickAt:
            Date.now(),
        }),
      );

      if (
        completed &&
        this.state.mode ===
          "automatic"
      ) {
        this.scheduleNextTick(
          this.config
            .cycleIntervalMs,
        );
      } else if (
        completed &&
        this.state.mode ===
          "single-cycle"
      ) {
        this.store.setRunning(
          false,
        );

        this.updateState({
          running: false,

          stoppedAt:
            Date.now(),
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown cycle processing failure.";

      this.store.reportError(
        EPISTEME_ERROR_CODES
          .SCHEDULER_FAILURE,
        message,
        {
          recoverable: true,

          organId:
            this.store.getState()
              .cycle.activeOrgan,

          packetId:
            this.store.getState()
              .queue
              .activePacketId ??
            undefined,

          cycleId:
            this.store.getState()
              .cycle.id,
        },
      );

      this.updateState({
        status: "error",

        waiting: false,

        processing: false,

        lastError:
          message,
      });
    }
  }

  /* ========================================================
     Tick Result
  ======================================================== */

  private createTickResult(
    executed: boolean,

    organId: OrganId,

    packetId:
      string | null,

    message: string,
  ): SchedulerTickResult {
    return {
      executed,

      status:
        this.state.status,

      organId,

      packetId,

      cycleNumber:
        this.store.getState()
          .cycle.number,

      message,
    };
  }

  /* ========================================================
     Reset
  ======================================================== */

  reset(
    preserveArchive?: boolean,
  ): void {
    if (this.state.destroyed) {
      return;
    }

    this.clearTimer();

    this.store.reset(
      preserveArchive,
    );

    this.updateState({
      status: "offline",

      running: false,

      paused: false,

      waiting: false,

      processing: false,

      tickCount: 0,

      cycleCount: 0,

      startedAt: null,

      stoppedAt:
        Date.now(),

      lastTickAt: null,

      nextTickAt: null,

      lastError: null,

      hiddenByDocument:
        this.isDocumentHidden(),

      pausedByVisibility:
        false,
    });
  }

  /* ========================================================
     Destroy
  ======================================================== */

  destroy(): void {
    if (this.state.destroyed) {
      return;
    }

    this.clearTimer();

    this.detachVisibilityHandler();

    this.store.stop();

    this.revision += 1;

    this.state = {
      ...this.state,

      status: "destroyed",

      running: false,

      paused: false,

      waiting: false,

      processing: false,

      destroyed: true,

      stoppedAt:
        Date.now(),

      nextTickAt: null,
    };

    this.snapshot =
      this.createSnapshot();

    this.notify();

    this.listeners.clear();

    this.engine.destroy();
  }
}

/* ==========================================================
   Scheduler Factory
========================================================== */

export function createEpistemeScheduler(
  store: EpistemeRuntimeStore,

  engine: EpistemeEngine,

  config:
    Partial<
      EpistemeSchedulerConfig
    > = {},
): EpistemeScheduler {
  return new EpistemeScheduler(
    store,
    engine,
    config,
  );
}