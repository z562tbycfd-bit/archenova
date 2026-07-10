/* ==========================================================
   Episteme Operating System
   Scheduler

   File:
   lib/episteme/scheduler.ts

   PART 1 / 2

   Responsibilities in this part:
   - Scheduler types
   - Scheduler configuration
   - Scheduler state
   - Scheduler class definition
   - Kernel subscription
   - Start / stop / pause / resume
   - Tick and automatic-loop management
========================================================== */

import {
  type OrganId,
} from "./organ";

import {
  createEpistemeKernel,
  type EpistemeKernel,
  type EpistemeKernelConfig,
  type EpistemeKernelInput,
  type EpistemeKernelSnapshot,
} from "./kernel";

import type {
  KnowledgePacket,
} from "./packet";

/* ==========================================================
   Scheduler Status
========================================================== */

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

/* ==========================================================
   Scheduler Mode
========================================================== */

export type EpistemeSchedulerMode =
  | "automatic"
  | "manual"
  | "single-cycle";

/* ==========================================================
   Scheduler Tick Reason
========================================================== */

export type EpistemeTickReason =
  | "initial"
  | "automatic"
  | "manual"
  | "resume"
  | "retry"
  | "visibility-restored";

/* ==========================================================
   Packet Provider
========================================================== */

export type EpistemePacketProvider = (
  context: EpistemeSchedulerContext,
) =>
  | EpistemeKernelInput
  | null
  | Promise<EpistemeKernelInput | null>;

/* ==========================================================
   Scheduler Configuration
========================================================== */

export interface EpistemeSchedulerConfig {
  /**
   * automatic:
   * Continuously processes packets.
   *
   * manual:
   * Only processes when tick() or processNext() is called.
   *
   * single-cycle:
   * Processes one packet and then pauses.
   */
  mode: EpistemeSchedulerMode;

  /**
   * Delay before the first scheduler tick.
   */
  initialDelayMs: number;

  /**
   * Delay between automatic ticks.
   */
  tickIntervalMs: number;

  /**
   * Delay before retrying after an error.
   */
  retryDelayMs: number;

  /**
   * Maximum automatic retries.
   */
  maxRetries: number;

  /**
   * Automatically start after construction.
   */
  autoStart: boolean;

  /**
   * Pause when the browser tab becomes hidden.
   */
  pauseWhenHidden: boolean;

  /**
   * Resume when the browser tab becomes visible.
   */
  resumeWhenVisible: boolean;

  /**
   * Generate a Knowledge Packet when the queue is empty.
   */
  generatePacketsWhenIdle: boolean;

  /**
   * Minimum time between automatically generated packets.
   */
  generatedPacketIntervalMs: number;

  /**
   * Optional external packet provider.
   */
  packetProvider?: EpistemePacketProvider;

  /**
   * Kernel configuration passed to a newly created Kernel.
   */
  kernel: Partial<EpistemeKernelConfig>;
}

/* ==========================================================
   Default Configuration
========================================================== */

export const DefaultEpistemeSchedulerConfig:
  EpistemeSchedulerConfig = {
    mode: "automatic",

    initialDelayMs: 800,
    tickIntervalMs: 1_500,

    retryDelayMs: 3_000,
    maxRetries: 3,

    autoStart: false,

    pauseWhenHidden: true,
    resumeWhenVisible: true,

    generatePacketsWhenIdle: true,
    generatedPacketIntervalMs: 12_000,

    packetProvider: undefined,

    kernel: {
      autoStart: false,
      autoContinueCycles: false,
      archiveCompletedPackets: true,
    },
  };

/* ==========================================================
   Scheduler Context
========================================================== */

export interface EpistemeSchedulerContext {
  schedulerStatus: EpistemeSchedulerStatus;

  schedulerMode: EpistemeSchedulerMode;

  kernelSnapshot: EpistemeKernelSnapshot;

  tickCount: number;
  completedCycleCount: number;
  generatedPacketCount: number;

  retryCount: number;

  lastTickAt?: number;
  lastCycleAt?: number;
  lastPacketGeneratedAt?: number;
}

/* ==========================================================
   Scheduler State
========================================================== */

export interface EpistemeSchedulerState {
  status: EpistemeSchedulerStatus;

  mode: EpistemeSchedulerMode;

  activeOrgan: OrganId;
  nextOrgan: OrganId;

  tickCount: number;
  completedCycleCount: number;
  generatedPacketCount: number;

  retryCount: number;

  queueLength: number;

  currentPacket?: KnowledgePacket;

  startedAt?: number;
  pausedAt?: number;
  stoppedAt?: number;

  lastTickAt?: number;
  lastCycleAt?: number;
  lastPacketGeneratedAt?: number;

  nextScheduledAt?: number;

  hiddenByBrowser: boolean;

  error?: string;

  updatedAt: number;
}

/* ==========================================================
   Scheduler Listener
========================================================== */

export type EpistemeSchedulerListener = (
  state: EpistemeSchedulerState,
  kernelSnapshot: EpistemeKernelSnapshot,
) => void;

/* ==========================================================
   Tick Result
========================================================== */

export interface EpistemeTickResult {
  executed: boolean;

  reason: EpistemeTickReason;

  packetId?: string;

  completedCycleCount: number;

  message: string;
}

/* ==========================================================
   Internal Utilities
========================================================== */

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function normalizeDelay(
  value: number,
  fallback: number,
): number {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, value);
}

function resolveErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown Episteme Scheduler error.";
}

/* ==========================================================
   Initial Scheduler State
========================================================== */

export function createInitialSchedulerState(
  mode: EpistemeSchedulerMode = "automatic",
): EpistemeSchedulerState {
  return {
    status: "offline",

    mode,

    activeOrgan: "observation",
    nextOrgan: "understanding",

    tickCount: 0,
    completedCycleCount: 0,
    generatedPacketCount: 0,

    retryCount: 0,

    queueLength: 0,

    currentPacket: undefined,

    startedAt: undefined,
    pausedAt: undefined,
    stoppedAt: undefined,

    lastTickAt: undefined,
    lastCycleAt: undefined,
    lastPacketGeneratedAt: undefined,

    nextScheduledAt: undefined,

    hiddenByBrowser: false,

    error: undefined,

    updatedAt: Date.now(),
  };
}

/* ==========================================================
   Default Packet Provider Data
========================================================== */

const DefaultPacketTitles = [
  "Emerging scientific and technological signals",
  "Civilizational infrastructure transition",
  "Institutional adaptation under uncertainty",
  "Long-term knowledge preservation",
  "Humanity's expanding operational capability",
  "Planetary and interplanetary resilience",
] as const;

function createDefaultPacketInput(
  context: EpistemeSchedulerContext,
): EpistemeKernelInput {
  const index =
    context.generatedPacketCount %
    DefaultPacketTitles.length;

  const title = DefaultPacketTitles[index];

  return {
    title,

    summary:
      "A scheduled knowledge signal entering the Civilization Intelligence cycle.",

    content:
      "This packet awaits observation, understanding, reasoning, design, realization, and memory.",

    type: "signal",
    priority: "normal",

    source: {
      name: "Episteme Scheduler",
      provider: "ArcheNova",
    },

    tags: [
      "episteme",
      "civilization-intelligence",
      "scheduled-cycle",
    ],

    confidence: 52,
    importance: 65,
    relevance: 72,
  };
}

/* ==========================================================
   Episteme Scheduler
========================================================== */

export class EpistemeScheduler {
  private config: EpistemeSchedulerConfig;

  private readonly kernel: EpistemeKernel;

  private state: EpistemeSchedulerState;

  private readonly listeners =
    new Set<EpistemeSchedulerListener>();

  private kernelUnsubscribe:
    | (() => void)
    | null = null;

  private loopPromise:
    | Promise<void>
    | null = null;

  private tickPromise:
    | Promise<EpistemeTickResult>
    | null = null;

  private loopToken = 0;

  private pausedByUser = false;
  private pausedByVisibility = false;

  private destroyed = false;

  private visibilityCleanup:
    | (() => void)
    | null = null;

  /* ========================================================
     Constructor
  ======================================================== */

  constructor(
    config: Partial<EpistemeSchedulerConfig> = {},
    kernel?: EpistemeKernel,
  ) {
    this.config = {
      ...DefaultEpistemeSchedulerConfig,
      ...config,

      kernel: {
        ...DefaultEpistemeSchedulerConfig.kernel,
        ...config.kernel,
      },
    };

    this.kernel =
      kernel ??
      createEpistemeKernel(this.config.kernel);

    this.state = createInitialSchedulerState(
      this.config.mode,
    );

    this.subscribeToKernel();
    this.installVisibilityHandling();

    if (this.config.autoStart) {
      void this.start();
    }
  }

  /* ========================================================
     State Access
  ======================================================== */

  getState(): EpistemeSchedulerState {
    return this.state;
  }

  getKernel(): EpistemeKernel {
    return this.kernel;
  }

  getKernelSnapshot(): EpistemeKernelSnapshot {
    return this.kernel.getSnapshot();
  }

  getConfig(): Readonly<EpistemeSchedulerConfig> {
    return this.config;
  }

  getContext(): EpistemeSchedulerContext {
    return {
      schedulerStatus: this.state.status,

      schedulerMode: this.state.mode,

      kernelSnapshot: this.kernel.getSnapshot(),

      tickCount: this.state.tickCount,

      completedCycleCount:
        this.state.completedCycleCount,

      generatedPacketCount:
        this.state.generatedPacketCount,

      retryCount: this.state.retryCount,

      lastTickAt: this.state.lastTickAt,
      lastCycleAt: this.state.lastCycleAt,

      lastPacketGeneratedAt:
        this.state.lastPacketGeneratedAt,
    };
  }

  /* ========================================================
     Configuration Update
  ======================================================== */

  updateConfig(
    config: Partial<EpistemeSchedulerConfig>,
  ): void {
    if (this.destroyed) return;

    this.config = {
      ...this.config,
      ...config,

      kernel: {
        ...this.config.kernel,
        ...config.kernel,
      },
    };

    if (config.mode) {
      this.patchState({
        mode: config.mode,
      });
    }
  }

  /* ========================================================
     Subscription
  ======================================================== */

  subscribe(
    listener: EpistemeSchedulerListener,
  ): () => void {
    if (this.destroyed) {
      return () => undefined;
    }

    this.listeners.add(listener);

    listener(
      this.state,
      this.kernel.getSnapshot(),
    );

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const snapshot = this.kernel.getSnapshot();

    for (const listener of this.listeners) {
      try {
        listener(this.state, snapshot);
      } catch (error) {
        console.error(
          "Episteme Scheduler listener failed:",
          error,
        );
      }
    }
  }

  private patchState(
    patch: Partial<EpistemeSchedulerState>,
  ): void {
    this.state = {
      ...this.state,
      ...patch,
      updatedAt: Date.now(),
    };

    this.notify();
  }

  /* ========================================================
     Kernel Subscription
  ======================================================== */

  private subscribeToKernel(): void {
    this.kernelUnsubscribe = this.kernel.subscribe(
      (kernelState) => {
        const snapshot =
          this.kernel.getSnapshot();

        const completedCycleCount =
          kernelState.metrics.completedCycles;

        const cycleWasCompleted =
          completedCycleCount >
          this.state.completedCycleCount;

        this.patchState({
          activeOrgan:
            kernelState.cycle.activeOrgan,

          nextOrgan:
            kernelState.cycle.nextOrgan,

          queueLength:
            kernelState.queue.packets.length,

          currentPacket:
            snapshot.activePacket ?? undefined,

          completedCycleCount,

          lastCycleAt: cycleWasCompleted
            ? Date.now()
            : this.state.lastCycleAt,
        });
      },
    );
  }

  /* ========================================================
     Start
  ======================================================== */

  async start(): Promise<void> {
    if (this.destroyed) {
      throw new Error(
        "Cannot start a destroyed Episteme Scheduler.",
      );
    }

    if (this.loopPromise) {
      return this.loopPromise;
    }

    this.pausedByUser = false;

    this.patchState({
      status: "starting",

      startedAt:
        this.state.startedAt ?? Date.now(),

      pausedAt: undefined,
      stoppedAt: undefined,

      error: undefined,
    });

    const initialDelay = normalizeDelay(
      this.config.initialDelayMs,
      DefaultEpistemeSchedulerConfig.initialDelayMs,
    );

    if (initialDelay > 0) {
      this.patchState({
        nextScheduledAt:
          Date.now() + initialDelay,
      });

      await wait(initialDelay);
    }

    if (
      this.destroyed ||
      this.pausedByUser ||
      this.pausedByVisibility
    ) {
      return;
    }

    const token = ++this.loopToken;

    this.patchState({
      status: "running",
      nextScheduledAt: undefined,
    });

    this.loopPromise = this.runLoop(token).finally(
      () => {
        if (token === this.loopToken) {
          this.loopPromise = null;
        }
      },
    );

    return this.loopPromise;
  }

  /* ========================================================
     Main Scheduler Loop
  ======================================================== */

  private async runLoop(token: number): Promise<void> {
    while (
      !this.destroyed &&
      token === this.loopToken
    ) {
      if (
        this.pausedByUser ||
        this.pausedByVisibility
      ) {
        this.patchState({
          status: "paused",
          nextScheduledAt: undefined,
        });

        await wait(250);
        continue;
      }

      if (this.config.mode === "manual") {
        this.patchState({
          status: "waiting",
          nextScheduledAt: undefined,
        });

        await wait(250);
        continue;
      }

      try {
        const result = await this.tick(
          this.state.tickCount === 0
            ? "initial"
            : "automatic",
        );

        this.patchState({
          retryCount: 0,
          error: undefined,

          status: result.executed
            ? "running"
            : "waiting",
        });
      } catch (error) {
        const message =
          resolveErrorMessage(error);

        const retryCount =
          this.state.retryCount + 1;

        this.patchState({
          status: "error",
          retryCount,
          error: message,
          nextScheduledAt: undefined,
        });

        if (
          retryCount > this.config.maxRetries
        ) {
          this.stop();
          return;
        }

        const retryDelay = normalizeDelay(
          this.config.retryDelayMs,
          DefaultEpistemeSchedulerConfig.retryDelayMs,
        );

        this.patchState({
          nextScheduledAt:
            Date.now() + retryDelay,
        });

        await wait(retryDelay);

        if (
          this.destroyed ||
          token !== this.loopToken
        ) {
          return;
        }

        continue;
      }

      if (
        this.config.mode === "single-cycle"
      ) {
        this.pausedByUser = true;

        this.kernel.pause();

        this.patchState({
          status: "completed",
          pausedAt: Date.now(),
          nextScheduledAt: undefined,
        });

        return;
      }

      const tickInterval = normalizeDelay(
        this.config.tickIntervalMs,
        DefaultEpistemeSchedulerConfig.tickIntervalMs,
      );

      this.patchState({
        status: "waiting",

        nextScheduledAt:
          Date.now() + tickInterval,
      });

      await wait(tickInterval);

      if (
        this.destroyed ||
        token !== this.loopToken
      ) {
        return;
      }

      this.patchState({
        status: "running",
        nextScheduledAt: undefined,
      });
    }
  }

  /* ========================================================
     Tick
  ======================================================== */

  async tick(
    reason: EpistemeTickReason = "manual",
  ): Promise<EpistemeTickResult> {
    if (this.destroyed) {
      return {
        executed: false,
        reason,
        completedCycleCount:
          this.state.completedCycleCount,
        message:
          "The Episteme Scheduler has been destroyed.",
      };
    }

    if (this.tickPromise) {
      return this.tickPromise;
    }

    this.tickPromise = this.executeTick(reason).finally(
      () => {
        this.tickPromise = null;
      },
    );

    return this.tickPromise;
  }

  private async executeTick(
    reason: EpistemeTickReason,
  ): Promise<EpistemeTickResult> {
    if (
      this.pausedByUser ||
      this.pausedByVisibility
    ) {
      return {
        executed: false,
        reason,
        completedCycleCount:
          this.state.completedCycleCount,
        message:
          "The scheduler is currently paused.",
      };
    }

    const tickCount =
      this.state.tickCount + 1;

    this.patchState({
      status: "running",

      tickCount,

      lastTickAt: Date.now(),

      nextScheduledAt: undefined,

      error: undefined,
    });

    const packet =
      await this.ensurePacketAvailable();

    if (!packet) {
      this.patchState({
        status: "waiting",
      });

      return {
        executed: false,
        reason,
        completedCycleCount:
          this.state.completedCycleCount,
        message:
          "No Knowledge Packet is available for processing.",
      };
    }

    await this.kernel.processNextPacket();

    const completedCycleCount =
      this.kernel.getState()
        .metrics.completedCycles;

    this.patchState({
      status: "completed",

      completedCycleCount,

      lastCycleAt: Date.now(),

      queueLength:
        this.kernel.getState()
          .queue.packets.length,

      currentPacket: undefined,
    });

    return {
      executed: true,

      reason,

      packetId: packet.id,

      completedCycleCount,

      message:
        "A Civilization Intelligence cycle was completed.",
    };
  }

  /* ========================================================
     Pause
  ======================================================== */

  pause(): void {
    if (
      this.destroyed ||
      this.pausedByUser
    ) {
      return;
    }

    this.pausedByUser = true;

    this.kernel.pause();

    this.patchState({
      status: "paused",
      pausedAt: Date.now(),
      nextScheduledAt: undefined,
    });
  }

  /* ========================================================
     Resume
  ======================================================== */

  async resume(): Promise<void> {
    if (this.destroyed) return;

    this.pausedByUser = false;

    this.patchState({
      status: "running",
      pausedAt: undefined,
      error: undefined,
    });

    await this.kernel.resume();

    if (!this.loopPromise) {
      const token = ++this.loopToken;

      this.loopPromise = this.runLoop(token).finally(
        () => {
          if (token === this.loopToken) {
            this.loopPromise = null;
          }
        },
      );
    }
  }

  /* ========================================================
     Stop
  ======================================================== */

  stop(): void {
    if (this.destroyed) return;

    this.patchState({
      status: "stopping",
      nextScheduledAt: undefined,
    });

    this.loopToken += 1;

    this.pausedByUser = false;
    this.pausedByVisibility = false;

    this.kernel.stop();

    this.loopPromise = null;
    this.tickPromise = null;

    this.patchState({
      status: "offline",

      stoppedAt: Date.now(),

      pausedAt: undefined,
      nextScheduledAt: undefined,

      currentPacket: undefined,
    });
  }

  /* ========================================================
     Process One Manual Cycle
  ======================================================== */

  async processNext(): Promise<EpistemeTickResult> {
    return this.tick("manual");
  }

  /* ========================================================
     PART 1 ENDS HERE

     Do not close the EpistemeScheduler class yet.
     Append PART 2 immediately below this comment.
  ======================================================== */

  /* ========================================================
     Ensure Packet Availability
  ======================================================== */

  private async ensurePacketAvailable():
    Promise<KnowledgePacket | null> {
    const existingPacket =
      this.getNextAvailablePacket();

    if (existingPacket) {
      return existingPacket;
    }

    return this.generatePacketIfNeeded();
  }

  /* ========================================================
     Queue Selection
  ======================================================== */

  private getNextAvailablePacket():
    KnowledgePacket | null {
    const packets =
      this.kernel.getState()
        .queue.packets;

    const candidates = packets.filter(
      (packet) =>
        packet.status === "created" ||
        packet.status === "queued",
    );

    if (candidates.length === 0) {
      return null;
    }

    const priorityWeight: Record<
      KnowledgePacket["priority"],
      number
    > = {
      low: 1,
      normal: 2,
      high: 3,
      critical: 4,
    };

    const sorted = [...candidates].sort(
      (left, right) => {
        const priorityDifference =
          priorityWeight[right.priority] -
          priorityWeight[left.priority];

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return (
          left.metadata.timestamp -
          right.metadata.timestamp
        );
      },
    );

    return sorted[0] ?? null;
  }

  /* ========================================================
     Automatic Packet Generation
  ======================================================== */

  private async generatePacketIfNeeded():
    Promise<KnowledgePacket | null> {
    if (
      !this.config.generatePacketsWhenIdle
    ) {
      return null;
    }

    const now = Date.now();

    const lastGeneratedAt =
      this.state.lastPacketGeneratedAt;

    if (lastGeneratedAt !== undefined) {
      const elapsed =
        now - lastGeneratedAt;

      const minimumInterval =
        normalizeDelay(
          this.config
            .generatedPacketIntervalMs,
          DefaultEpistemeSchedulerConfig
            .generatedPacketIntervalMs,
        );

      if (elapsed < minimumInterval) {
        return null;
      }
    }

    const context =
      this.getContext();

    const provider =
      this.config.packetProvider;

    const input = provider
      ? await provider(context)
      : createDefaultPacketInput(context);

    if (!input) {
      return null;
    }

    const packet =
      this.kernel.ingest(input);

    this.patchState({
      generatedPacketCount:
        this.state.generatedPacketCount + 1,

      lastPacketGeneratedAt: now,

      queueLength:
        this.kernel.getState()
          .queue.packets.length,
    });

    return packet;
  }

  /* ========================================================
     Manual Packet Generation
  ======================================================== */

  async generatePacket():
    Promise<KnowledgePacket | null> {
    if (this.destroyed) {
      return null;
    }

    const provider =
      this.config.packetProvider;

    const context =
      this.getContext();

    const input = provider
      ? await provider(context)
      : createDefaultPacketInput(context);

    if (!input) {
      return null;
    }

    const packet =
      this.kernel.ingest(input);

    this.patchState({
      generatedPacketCount:
        this.state.generatedPacketCount + 1,

      lastPacketGeneratedAt:
        Date.now(),

      queueLength:
        this.kernel.getState()
          .queue.packets.length,
    });

    return packet;
  }

  /* ========================================================
     External Knowledge Ingestion
  ======================================================== */

  ingest(
    input: EpistemeKernelInput,
  ): KnowledgePacket {
    if (this.destroyed) {
      throw new Error(
        "Cannot ingest knowledge into a destroyed Episteme Scheduler.",
      );
    }

    const packet =
      this.kernel.ingest(input);

    this.patchState({
      queueLength:
        this.kernel.getState()
          .queue.packets.length,
    });

    return packet;
  }

  /* ========================================================
     Batch Ingestion
  ======================================================== */

  ingestMany(
    inputs: EpistemeKernelInput[],
  ): KnowledgePacket[] {
    if (this.destroyed) {
      throw new Error(
        "Cannot ingest knowledge into a destroyed Episteme Scheduler.",
      );
    }

    const packets =
      inputs.map((input) =>
        this.kernel.ingest(input),
      );

    this.patchState({
      queueLength:
        this.kernel.getState()
          .queue.packets.length,
    });

    return packets;
  }

  /* ========================================================
     Process Specific Packet
  ======================================================== */

  async processPacket(
    packetId: string,
  ): Promise<void> {
    if (this.destroyed) {
      return;
    }

    this.patchState({
      status: "running",
      error: undefined,
    });

    try {
      await this.kernel.processPacket(
        packetId,
      );

      this.patchState({
        status: "completed",

        completedCycleCount:
          this.kernel.getState()
            .metrics.completedCycles,

        lastCycleAt: Date.now(),

        queueLength:
          this.kernel.getState()
            .queue.packets.length,

        currentPacket: undefined,

        retryCount: 0,
      });
    } catch (error) {
      const message =
        resolveErrorMessage(error);

      this.patchState({
        status: "error",
        error: message,

        retryCount:
          this.state.retryCount + 1,
      });

      throw error;
    }
  }

  /* ========================================================
     Scheduler Mode
  ======================================================== */

  setMode(
    mode: EpistemeSchedulerMode,
  ): void {
    if (this.destroyed) return;

    this.config = {
      ...this.config,
      mode,
    };

    this.patchState({
      mode,
    });

    if (mode === "manual") {
      this.patchState({
        status: "waiting",
        nextScheduledAt: undefined,
      });
    }

    if (
      mode === "automatic" &&
      !this.loopPromise &&
      !this.pausedByUser &&
      !this.pausedByVisibility
    ) {
      void this.start();
    }
  }

  /* ========================================================
     Automatic Mode Shortcut
  ======================================================== */

  enableAutomaticMode(): void {
    this.setMode("automatic");
  }

  /* ========================================================
     Manual Mode Shortcut
  ======================================================== */

  enableManualMode(): void {
    this.setMode("manual");
  }

  /* ========================================================
     Single Cycle Mode Shortcut
  ======================================================== */

  enableSingleCycleMode(): void {
    this.setMode("single-cycle");
  }

  /* ========================================================
     Browser Visibility Handling
  ======================================================== */

  private installVisibilityHandling():
    void {
    if (
      typeof document === "undefined"
    ) {
      return;
    }

    const handleVisibilityChange = () => {
      const hidden =
        document.visibilityState ===
        "hidden";

      this.patchState({
        hiddenByBrowser: hidden,
      });

      if (
        hidden &&
        this.config.pauseWhenHidden
      ) {
        this.pausedByVisibility = true;

        this.kernel.pause();

        this.patchState({
          status: "paused",
          nextScheduledAt: undefined,
        });

        return;
      }

      if (
        !hidden &&
        this.pausedByVisibility
      ) {
        this.pausedByVisibility = false;

        if (
          this.config.resumeWhenVisible &&
          !this.pausedByUser
        ) {
          void this.resumeAfterVisibility();
        }
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    this.visibilityCleanup = () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }

  /* ========================================================
     Visibility Resume
  ======================================================== */

  private async resumeAfterVisibility():
    Promise<void> {
    if (
      this.destroyed ||
      this.pausedByUser
    ) {
      return;
    }

    this.patchState({
      status: "running",
      hiddenByBrowser: false,
      error: undefined,
    });

    await this.kernel.resume();

    if (
      !this.loopPromise &&
      this.config.mode !== "manual"
    ) {
      const token = ++this.loopToken;

      this.loopPromise =
        this.runLoop(token).finally(
          () => {
            if (
              token === this.loopToken
            ) {
              this.loopPromise = null;
            }
          },
        );
    }
  }

  /* ========================================================
     Retry
  ======================================================== */

  async retry(): Promise<void> {
    if (this.destroyed) return;

    this.patchState({
      status: "starting",
      error: undefined,
    });

    const retryDelay =
      normalizeDelay(
        this.config.retryDelayMs,
        DefaultEpistemeSchedulerConfig
          .retryDelayMs,
      );

    if (retryDelay > 0) {
      this.patchState({
        nextScheduledAt:
          Date.now() + retryDelay,
      });

      await wait(retryDelay);
    }

    if (this.destroyed) return;

    this.patchState({
      retryCount: 0,
      nextScheduledAt: undefined,
    });

    if (this.config.mode === "manual") {
      await this.processNext();
      return;
    }

    await this.start();
  }

  /* ========================================================
     Clear Error
  ======================================================== */

  clearError(): void {
    if (this.destroyed) return;

    this.kernel.clearErrors();

    this.patchState({
      error: undefined,
      retryCount: 0,

      status:
        this.pausedByUser ||
        this.pausedByVisibility
          ? "paused"
          : "waiting",
    });
  }

  /* ========================================================
     Queue Inspection
  ======================================================== */

  getQueuedPackets():
    KnowledgePacket[] {
    return this.kernel
      .getState()
      .queue.packets
      .filter(
        (packet) =>
          packet.status === "queued" ||
          packet.status === "created",
      );
  }

  getProcessingPackets():
    KnowledgePacket[] {
    return this.kernel
      .getState()
      .queue.packets
      .filter(
        (packet) =>
          packet.status ===
          "processing",
      );
  }

  getArchivedPackets():
    KnowledgePacket[] {
    return [
      ...this.kernel.getState()
        .archive,
    ];
  }

  getPacket(
    packetId: string,
  ): KnowledgePacket | null {
    const state =
      this.kernel.getState();

    return (
      state.queue.packets.find(
        (packet) =>
          packet.id === packetId,
      ) ??
      state.archive.find(
        (packet) =>
          packet.id === packetId,
      ) ??
      null
    );
  }

  /* ========================================================
     Reset
  ======================================================== */

  reset(): void {
    if (this.destroyed) return;

    this.stop();

    this.kernel.reset();

    this.state =
      createInitialSchedulerState(
        this.config.mode,
      );

    this.pausedByUser = false;
    this.pausedByVisibility = false;

    this.notify();
  }

  /* ========================================================
     Destroy
  ======================================================== */

  destroy(): void {
    if (this.destroyed) return;

    this.stop();

    this.kernelUnsubscribe?.();
    this.kernelUnsubscribe = null;

    this.visibilityCleanup?.();
    this.visibilityCleanup = null;

    this.listeners.clear();

    this.kernel.destroy();

    this.destroyed = true;

    this.state = {
      ...this.state,

      status: "destroyed",

      currentPacket: undefined,
      nextScheduledAt: undefined,

      updatedAt: Date.now(),
    };
  }

  /* ========================================================
     Status Helpers
  ======================================================== */

  isRunning(): boolean {
    return (
      this.state.status === "running" ||
      this.state.status === "waiting"
    );
  }

  isPaused(): boolean {
    return (
      this.pausedByUser ||
      this.pausedByVisibility ||
      this.state.status === "paused"
    );
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  isAutomatic(): boolean {
    return (
      this.state.mode === "automatic"
    );
  }

  hasQueuedPackets(): boolean {
    return (
      this.getQueuedPackets().length > 0
    );
  }
}

/* ==========================================================
   Default Scheduler Singleton
========================================================== */

let defaultScheduler:
  | EpistemeScheduler
  | null = null;

/* ==========================================================
   Get Default Scheduler
========================================================== */

export function getEpistemeScheduler(
  config:
    Partial<EpistemeSchedulerConfig> = {},
): EpistemeScheduler {
  if (!defaultScheduler) {
    defaultScheduler =
      new EpistemeScheduler(config);
  }

  return defaultScheduler;
}

/* ==========================================================
   Independent Scheduler Factory
========================================================== */

export function createEpistemeScheduler(
  config:
    Partial<EpistemeSchedulerConfig> = {},
  kernel?: EpistemeKernel,
): EpistemeScheduler {
  return new EpistemeScheduler(
    config,
    kernel,
  );
}

/* ==========================================================
   Default Scheduler Reset
========================================================== */

export function resetDefaultEpistemeScheduler():
  void {
  if (defaultScheduler) {
    defaultScheduler.destroy();
  }

  defaultScheduler = null;
}

/* ==========================================================
   Scheduler Status Label
========================================================== */

export function getSchedulerStatusLabel(
  status: EpistemeSchedulerStatus,
): string {
  switch (status) {
    case "offline":
      return "Offline";

    case "starting":
      return "Starting";

    case "running":
      return "Operating";

    case "waiting":
      return "Awaiting Signal";

    case "paused":
      return "Paused";

    case "stopping":
      return "Stopping";

    case "completed":
      return "Cycle Complete";

    case "error":
      return "System Error";

    case "destroyed":
      return "Destroyed";

    default:
      return "Unknown";
  }
}

/* ==========================================================
   Active Organ Operation Label
========================================================== */

export function getOrganOperationLabel(
  organId: OrganId,
): string {
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