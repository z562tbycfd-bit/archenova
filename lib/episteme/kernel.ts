/* ==========================================================
   Episteme Operating System
   Kernel

   File:
   lib/episteme/kernel.ts

   Responsibilities:
   - Kernel lifecycle
   - Knowledge ingestion
   - Organ scheduling
   - Packet transformation
   - Civilization cycle control
   - State synchronization
========================================================== */

import {
  CivilizationLoop,
  getNextOrgan,
  type OrganId,
  type OrganRuntimeState,
} from "./organ";

import {
  createPacket,
  type KnowledgePacket,
  type PacketPriority,
  type PacketSource,
  type PacketType,
} from "./packet";

import {
  createEpistemeError,
  createEpistemeEvent,
  createInitialEpistemeState,
  epistemeReducer,
  selectActivePacket,
  selectIsRunning,
  type EpistemeAction,
  type EpistemeEvent,
  type EpistemeState,
} from "./state";

/* ==========================================================
   Kernel Configuration
========================================================== */

export interface EpistemeKernelConfig {
  /**
   * Time spent processing each cognitive organ.
   */
  organProcessingMs: number;

  /**
   * Delay between completed knowledge cycles.
   */
  cycleIntervalMs: number;

  /**
   * Duration of final synchronization.
   */
  synchronizationMs: number;

  /**
   * Start automatically after construction.
   */
  autoStart: boolean;

  /**
   * Continue processing queued packets.
   */
  autoContinueCycles: boolean;

  /**
   * Archive packets after Memory completes.
   */
  archiveCompletedPackets: boolean;

  /**
   * Default confidence assigned to incoming knowledge.
   */
  initialConfidence: number;

  /**
   * Confidence growth applied at each organ.
   */
  confidenceGrowth: number;

  /**
   * Maximum number of waiting packets.
   */
  maxQueueSize: number;
}

export const DefaultEpistemeKernelConfig: EpistemeKernelConfig = {
  organProcessingMs: 2_400,
  cycleIntervalMs: 1_200,
  synchronizationMs: 1_600,

  autoStart: false,
  autoContinueCycles: true,
  archiveCompletedPackets: true,

  initialConfidence: 40,
  confidenceGrowth: 8,

  maxQueueSize: 250,
};

/* ==========================================================
   Kernel Input
========================================================== */

export interface EpistemeKernelInput {
  title: string;

  summary?: string;
  content?: string;

  type?: PacketType;
  priority?: PacketPriority;

  source?: PacketSource;

  tags?: string[];

  confidence?: number;
  importance?: number;
  relevance?: number;
}

/* ==========================================================
   Organ Processing Context
========================================================== */

export interface OrganProcessingContext {
  organId: OrganId;
  nextOrganId: OrganId;

  packet: KnowledgePacket;

  state: EpistemeState;
  cycleNumber: number;
}

/* ==========================================================
   Organ Processor
========================================================== */

export type OrganProcessor = (
  context: OrganProcessingContext,
) => KnowledgePacket | Promise<KnowledgePacket>;

/* ==========================================================
   State Listener
========================================================== */

export type EpistemeStateListener = (
  state: EpistemeState,
  event?: EpistemeEvent,
) => void;

/* ==========================================================
   Kernel Snapshot
========================================================== */

export interface EpistemeKernelSnapshot {
  id: string;

  state: EpistemeState;
  config: Readonly<EpistemeKernelConfig>;

  isRunning: boolean;
  isPaused: boolean;
  isDestroyed: boolean;

  activeOrgan: OrganId;
  nextOrgan: OrganId;

  activePacket: KnowledgePacket | null;
  queuedPacketCount: number;
}

/* ==========================================================
   Internal Utilities
========================================================== */

function clamp(
  value: number,
  minimum = 0,
  maximum = 100,
): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function createKernelId(prefix: string): string {
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
   Runtime State Mapping
========================================================== */

const RuntimeStateByOrgan: Record<
  OrganId,
  OrganRuntimeState
> = {
  observation: "receiving",
  understanding: "processing",
  reasoning: "reasoning",
  design: "designing",
  realization: "executing",
  memory: "encoding",
};

/* ==========================================================
   Packet Type Mapping
========================================================== */

const PacketTypeByOrgan: Record<OrganId, PacketType> = {
  observation: "signal",
  understanding: "knowledge",
  reasoning: "reasoning",
  design: "design",
  realization: "execution",
  memory: "memory",
};

/* ==========================================================
   Episteme Kernel
========================================================== */

export class EpistemeKernel {
  readonly id: string;

  private state: EpistemeState;

  private readonly config: EpistemeKernelConfig;

  private readonly listeners =
    new Set<EpistemeStateListener>();

  private readonly processors =
    new Map<OrganId, OrganProcessor>();

  private runningPromise: Promise<void> | null = null;

  private executionToken = 0;

  private paused = false;
  private destroyed = false;

  /* ========================================================
     Constructor
  ======================================================== */

  constructor(
    config: Partial<EpistemeKernelConfig> = {},
    initialState?: EpistemeState,
  ) {
    this.id = createKernelId("episteme-kernel");

    this.config = {
      ...DefaultEpistemeKernelConfig,
      ...config,
    };

    this.state =
      initialState ?? createInitialEpistemeState();

    this.registerDefaultProcessors();

    this.dispatch({
      type: "INITIALIZE_KERNEL",
    });

    if (this.config.autoStart) {
      void this.start();
    }
  }

  /* ========================================================
     State Access
  ======================================================== */

  getState(): EpistemeState {
    return this.state;
  }

  getConfig(): Readonly<EpistemeKernelConfig> {
    return this.config;
  }

  getSnapshot(): EpistemeKernelSnapshot {
    return {
      id: this.id,

      state: this.state,
      config: this.config,

      isRunning: selectIsRunning(this.state),
      isPaused: this.paused,
      isDestroyed: this.destroyed,

      activeOrgan: this.state.cycle.activeOrgan,
      nextOrgan: this.state.cycle.nextOrgan,

      activePacket: selectActivePacket(this.state),

      queuedPacketCount:
        this.state.queue.packets.length,
    };
  }

  /* ========================================================
     State Subscription
  ======================================================== */

  subscribe(
    listener: EpistemeStateListener,
  ): () => void {
    if (this.destroyed) {
      return () => undefined;
    }

    this.listeners.add(listener);

    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(event?: EpistemeEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(this.state, event);
      } catch (error) {
        console.error(
          "Episteme state listener failed:",
          error,
        );
      }
    }
  }

  /* ========================================================
     State Dispatch
  ======================================================== */

  dispatch(action: EpistemeAction): void {
    if (this.destroyed) return;

    this.state = epistemeReducer(
      this.state,
      action,
    );

    this.notify();
  }

  private emit(event: EpistemeEvent): void {
    if (this.destroyed) return;

    this.state = epistemeReducer(this.state, {
      type: "ADD_EVENT",
      event,
    });

    this.notify(event);
  }

  /* ========================================================
     Processor Registration
  ======================================================== */

  registerProcessor(
    organId: OrganId,
    processor: OrganProcessor,
  ): void {
    this.processors.set(organId, processor);
  }

  unregisterProcessor(organId: OrganId): void {
    this.processors.delete(organId);
  }

  private registerDefaultProcessors(): void {
    for (const organId of CivilizationLoop) {
      this.registerProcessor(
        organId,
        async ({
          packet,
          nextOrganId,
        }) => {
          const confidence = clamp(
            packet.metadata.confidence +
              this.config.confidenceGrowth,
          );

          const importanceIncrease =
            organId === "reasoning" ||
            organId === "design"
              ? 5
              : 2;

          return {
            ...packet,

            type: PacketTypeByOrgan[organId],
            status: "processing",

            from: organId,
            to: nextOrganId,

            summary: this.createOrganSummary(
              organId,
              packet,
            ),

            content: this.createOrganContent(
              organId,
              packet,
            ),

            metadata: {
              ...packet.metadata,

              confidence,

              importance: clamp(
                packet.metadata.importance +
                  importanceIncrease,
              ),

              relevance: clamp(
                packet.metadata.relevance + 3,
              ),

              timestamp: Date.now(),

              tags: Array.from(
                new Set([
                  ...packet.metadata.tags,
                  organId,
                ]),
              ),
            },
          };
        },
      );
    }
  }

  /* ========================================================
     Default Organ Intelligence
  ======================================================== */

  private createOrganSummary(
    organId: OrganId,
    packet: KnowledgePacket,
  ): string {
    switch (organId) {
      case "observation":
        return (
          packet.summary ||
          `Observed civilizational signal: ${packet.title}`
        );

      case "understanding":
        return [
          "Integrated context, relationships, and meaning from",
          packet.title,
        ].join(" ");

      case "reasoning":
        return [
          "Evaluated causality, uncertainty, risk,",
          "trade-offs, and possible futures for",
          packet.title,
        ].join(" ");

      case "design":
        return [
          "Translated current judgment into a",
          "candidate civilizational architecture for",
          packet.title,
        ].join(" ");

      case "realization":
        return [
          "Converted the proposed architecture into",
          "an implementation pathway for",
          packet.title,
        ].join(" ");

      case "memory":
        return [
          "Encoded the completed knowledge cycle",
          "into civilizational memory:",
          packet.title,
        ].join(" ");

      default:
        return packet.summary;
    }
  }

  private createOrganContent(
    organId: OrganId,
    packet: KnowledgePacket,
  ): string {
    const original =
      packet.content ||
      packet.summary ||
      packet.title;

    switch (organId) {
      case "observation":
        return [
          "OBSERVED REALITY",
          original,
          "The signal has entered the civilization intelligence cycle.",
        ].join("\n\n");

      case "understanding":
        return [
          "INTEGRATED MEANING",
          original,
          "Evidence has been organized into context, relationships, and emerging patterns.",
        ].join("\n\n");

      case "reasoning":
        return [
          "CURRENT JUDGMENT",
          original,
          "Causality, uncertainty, risk, trade-offs, and future implications have been evaluated.",
        ].join("\n\n");

      case "design":
        return [
          "DESIGN DIRECTION",
          original,
          "The judgment has been transformed into a candidate system, institution, policy, or infrastructure.",
        ].join("\n\n");

      case "realization":
        return [
          "EXECUTION STATE",
          original,
          "The architecture has been translated into operational capability and implementation logic.",
        ].join("\n\n");

      case "memory":
        return [
          "LIVING MEMORY",
          original,
          "The full cycle has been preserved for future observation, comparison, and learning.",
        ].join("\n\n");

      default:
        return original;
    }
  }

  /* ========================================================
     Knowledge Ingestion
  ======================================================== */

  ingest(
    input: EpistemeKernelInput,
  ): KnowledgePacket {
    if (this.destroyed) {
      throw new Error(
        "Cannot ingest knowledge into a destroyed Episteme Kernel.",
      );
    }

    if (!input.title.trim()) {
      throw new Error(
        "A knowledge packet requires a title.",
      );
    }

    if (
      this.state.queue.packets.length >=
      this.config.maxQueueSize
    ) {
      throw new Error(
        "The Episteme packet queue has reached its limit.",
      );
    }

    const packet = createPacket({
      type: input.type ?? "signal",
      priority: input.priority ?? "normal",
      status: "created",

      from: "memory",
      to: "observation",

      title: input.title.trim(),
      summary: input.summary ?? "",
      content: input.content ?? "",

      source: input.source,

      metadata: {
        tags: input.tags ?? [],

        confidence: clamp(
          input.confidence ??
            this.config.initialConfidence,
        ),

        importance: clamp(
          input.importance ?? 50,
        ),

        relevance: clamp(
          input.relevance ?? 50,
        ),

        timestamp: Date.now(),
      },
    });

    this.dispatch({
      type: "ENQUEUE_PACKET",
      packet,
    });

    this.emit(
      createEpistemeEvent(
        "packet_created",
        `Knowledge packet created: ${packet.title}`,
        {
          organId: "observation",
          packetId: packet.id,
        },
      ),
    );

    return packet;
  }

  /* ========================================================
     Kernel Lifecycle
  ======================================================== */

  async start(): Promise<void> {
    if (this.destroyed) {
      throw new Error(
        "Cannot start a destroyed Episteme Kernel.",
      );
    }

    if (this.runningPromise) {
      return this.runningPromise;
    }

    this.paused = false;

    this.dispatch({
      type: "SET_KERNEL_STATUS",
      status: "running",
    });

    this.emit(
      createEpistemeEvent(
        "kernel_started",
        "Episteme Kernel started.",
      ),
    );

    const token = ++this.executionToken;

    this.runningPromise = this.runLoop(
      token,
    ).finally(() => {
      if (token === this.executionToken) {
        this.runningPromise = null;
      }
    });

    return this.runningPromise;
  }

  pause(): void {
    if (this.destroyed || this.paused) return;

    this.paused = true;

    this.dispatch({
      type: "SET_KERNEL_STATUS",
      status: "paused",
    });

    this.emit(
      createEpistemeEvent(
        "kernel_paused",
        "Episteme Kernel paused.",
      ),
    );
  }

  async resume(): Promise<void> {
    if (this.destroyed) return;

    if (!this.paused) {
      return this.start();
    }

    this.paused = false;

    this.dispatch({
      type: "SET_KERNEL_STATUS",
      status: "running",
    });

    this.emit(
      createEpistemeEvent(
        "kernel_resumed",
        "Episteme Kernel resumed.",
      ),
    );

    if (!this.runningPromise) {
      return this.start();
    }
  }

  stop(): void {
    if (this.destroyed) return;

    this.paused = false;
    this.executionToken += 1;
    this.runningPromise = null;

    this.dispatch({
      type: "SET_KERNEL_STATUS",
      status: "idle",
    });

    this.dispatch({
      type: "SET_KERNEL_PHASE",
      phase: "rest",
    });

    this.dispatch({
      type: "SET_ACTIVE_PACKET",
      packetId: null,
    });

    this.emit(
      createEpistemeEvent(
        "kernel_stopped",
        "Episteme Kernel stopped.",
      ),
    );
  }

  destroy(): void {
    if (this.destroyed) return;

    this.stop();

    this.destroyed = true;

    this.listeners.clear();
    this.processors.clear();
  }

  reset(): void {
    if (this.destroyed) return;

    this.stop();

    this.state = createInitialEpistemeState();

    this.dispatch({
      type: "INITIALIZE_KERNEL",
    });
  }

  clearErrors(): void {
    this.dispatch({
      type: "CLEAR_ERRORS",
    });
  }

  /* ========================================================
     Main Kernel Loop
  ======================================================== */

  private async runLoop(
    token: number,
  ): Promise<void> {
    while (
      !this.destroyed &&
      token === this.executionToken
    ) {
      if (this.paused) {
        await wait(200);
        continue;
      }

      const packet =
        this.getNextQueuedPacket();

      if (!packet) {
        this.dispatch({
          type: "SET_KERNEL_STATUS",
          status: "idle",
        });

        this.dispatch({
          type: "SET_KERNEL_PHASE",
          phase: "rest",
        });

        await wait(
          this.config.cycleIntervalMs,
        );

        continue;
      }

      this.dispatch({
        type: "SET_KERNEL_STATUS",
        status: "running",
      });

      try {
        await this.runPacketCycle(
          packet,
          token,
        );
      } catch (error) {
        this.handleKernelError(
          error,
          packet,
        );
      }

      if (!this.config.autoContinueCycles) {
        break;
      }

      await wait(
        this.config.cycleIntervalMs,
      );
    }
  }

  /* ========================================================
     Civilization Intelligence Cycle
  ======================================================== */

  private async runPacketCycle(
    initialPacket: KnowledgePacket,
    token: number,
  ): Promise<void> {
    this.dispatch({
      type: "START_CYCLE",
    });

    let packet = initialPacket;

    this.dispatch({
      type: "SET_ACTIVE_PACKET",
      packetId: packet.id,
    });

    for (const organId of CivilizationLoop) {
      if (
        this.destroyed ||
        this.paused ||
        token !== this.executionToken
      ) {
        return;
      }

      packet = await this.processOrgan(
        organId,
        packet,
      );
    }

    this.dispatch({
      type: "COMPLETE_CYCLE",
    });

    await this.synchronizeCycle(token);

    if (
      this.config.archiveCompletedPackets
    ) {
      this.dispatch({
        type: "ARCHIVE_PACKET",
        packetId: packet.id,
      });
    } else {
      this.dispatch({
        type: "UPDATE_PACKET_STATUS",
        packetId: packet.id,
        status: "completed",
      });
    }

    this.dispatch({
      type: "SET_ACTIVE_PACKET",
      packetId: null,
    });
  }

  /* ========================================================
     Organ Processing
  ======================================================== */

  private async processOrgan(
    organId: OrganId,
    packet: KnowledgePacket,
  ): Promise<KnowledgePacket> {
    const processor =
      this.processors.get(organId);

    if (!processor) {
      throw new Error(
        `No intelligence processor is registered for ${organId}.`,
      );
    }

    const nextOrganId =
      getNextOrgan(organId);

    this.dispatch({
      type: "ACTIVATE_ORGAN",
      organId,
      runtimeState:
        RuntimeStateByOrgan[organId],
    });

    this.dispatch({
      type: "SET_ORGAN_INTELLIGENCE_STATUS",
      organId,
      intelligenceStatus: "updating",
    });

    this.dispatch({
      type: "SET_KERNEL_PHASE",
      phase:
        organId === "memory"
          ? "memory"
          : "processing",
    });

    this.dispatch({
      type: "UPDATE_PACKET_STATUS",
      packetId: packet.id,
      status: "processing",
    });

    const currentOrgan =
      this.state.organs[organId];

    this.dispatch({
      type: "UPDATE_ORGAN_METRICS",
      organId,
      metrics: {
        activity: clamp(
          currentOrgan.metrics.activity + 24,
        ),

        complexity: clamp(
          currentOrgan.metrics.complexity + 6,
        ),

        synchronization: clamp(
          currentOrgan.metrics.synchronization,
        ),
      },
    });

    await wait(
      this.config.organProcessingMs,
    );

    const transformedPacket =
      await processor({
        organId,
        nextOrganId,

        packet,

        state: this.state,
        cycleNumber: this.state.cycle.number,
      });

    /*
     * The packet ID remains constant throughout one
     * civilization cycle. This allows the reducer to
     * route, update, and archive the same entity safely.
     */
    const normalizedPacket: KnowledgePacket = {
      ...transformedPacket,
      id: packet.id,
      from: organId,
      to: nextOrganId,
      status: "queued",
    };

    this.replacePacketInQueue(
      packet.id,
      normalizedPacket,
    );

    this.dispatch({
      type: "UPDATE_ORGAN_METRICS",
      organId,
      metrics: {
        confidence:
          normalizedPacket.metadata.confidence,

        activity: clamp(
          this.state.organs[organId]
            .metrics.activity - 12,
        ),

        health: clamp(
          this.state.organs[organId]
            .metrics.health,
        ),

        synchronization: clamp(
          this.state.metrics.synchronization,
        ),
      },
    });

    this.dispatch({
      type: "COMPLETE_ORGAN",
      organId,
    });

    this.dispatch({
      type: "ROUTE_PACKET",
      packetId: normalizedPacket.id,
      from: organId,
      to: nextOrganId,
    });

    this.emit(
      createEpistemeEvent(
        "packet_routed",
        `${organId} transmitted intelligence to ${nextOrganId}.`,
        {
          organId: nextOrganId,
          packetId: normalizedPacket.id,
        },
      ),
    );

    return normalizedPacket;
  }

  /* ========================================================
     Packet Queue
  ======================================================== */

  private getNextQueuedPacket():
    | KnowledgePacket
    | undefined {
    const candidates =
      this.state.queue.packets.filter(
        (packet) =>
          packet.status === "queued" ||
          packet.status === "created",
      );

    if (candidates.length === 0) {
      return undefined;
    }

    const priorityWeight: Record<
      PacketPriority,
      number
    > = {
      low: 1,
      normal: 2,
      high: 3,
      critical: 4,
    };

    return [...candidates].sort(
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
    )[0];
  }

  private replacePacketInQueue(
    previousPacketId: string,
    packet: KnowledgePacket,
  ): void {
    const exists =
      this.state.queue.packets.some(
        (item) =>
          item.id === previousPacketId,
      );

    const packets = exists
      ? this.state.queue.packets.map(
          (item) =>
            item.id === previousPacketId
              ? packet
              : item,
        )
      : [
          ...this.state.queue.packets,
          packet,
        ];

    this.state = {
      ...this.state,

      queue: {
        packets,
      },

      activePacketId: packet.id,
      updatedAt: Date.now(),
    };

    this.notify();
  }

  /* ========================================================
     Civilization Synchronization
  ======================================================== */

  private async synchronizeCycle(
    token: number,
  ): Promise<void> {
    if (
      this.destroyed ||
      token !== this.executionToken
    ) {
      return;
    }

    this.dispatch({
      type: "SET_KERNEL_STATUS",
      status: "synchronizing",
    });

    this.dispatch({
      type: "SET_KERNEL_PHASE",
      phase: "synchronization",
    });

    this.emit(
      createEpistemeEvent(
        "synchronization_started",
        "Civilization Intelligence synchronization started.",
      ),
    );

    await wait(
      this.config.synchronizationMs,
    );

    if (
      this.destroyed ||
      token !== this.executionToken
    ) {
      return;
    }

    this.dispatch({
      type: "SET_KERNEL_STATUS",
      status: "running",
    });

    this.dispatch({
      type: "SET_KERNEL_PHASE",
      phase: "rest",
    });

    this.emit(
      createEpistemeEvent(
        "synchronization_completed",
        "Civilization Intelligence synchronization completed.",
      ),
    );
  }

  /* ========================================================
     Manual Processing
  ======================================================== */

  async processNextPacket(): Promise<void> {
    if (this.destroyed) return;

    const packet =
      this.getNextQueuedPacket();

    if (!packet) return;

    const token =
      ++this.executionToken;

    await this.runPacketCycle(
      packet,
      token,
    );
  }

  async processPacket(
    packetId: string,
  ): Promise<void> {
    if (this.destroyed) return;

    const packet =
      this.state.queue.packets.find(
        (item) => item.id === packetId,
      );

    if (!packet) {
      throw new Error(
        `Knowledge packet not found: ${packetId}`,
      );
    }

    const token =
      ++this.executionToken;

    await this.runPacketCycle(
      packet,
      token,
    );
  }

  /* ========================================================
     Error Handling
  ======================================================== */

  private handleKernelError(
    error: unknown,
    packet?: KnowledgePacket,
  ): void {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown Episteme Kernel failure.";

    const organId =
      this.state.cycle.activeOrgan;

    this.dispatch({
      type: "ADD_ERROR",

      error: createEpistemeError(
        "EPISTEME_KERNEL_FAILURE",
        message,
        {
          organId,
          packetId: packet?.id,
        },
      ),
    });

    this.emit(
      createEpistemeEvent(
        "error",
        message,
        {
          organId,
          packetId: packet?.id,
        },
      ),
    );
  }
}

/* ==========================================================
   Default Kernel Singleton
========================================================== */

let defaultKernel: EpistemeKernel | null = null;

export function getEpistemeKernel(
  config: Partial<EpistemeKernelConfig> = {},
): EpistemeKernel {
  if (!defaultKernel) {
    defaultKernel =
      new EpistemeKernel(config);
  }

  return defaultKernel;
}

/* ==========================================================
   Independent Kernel Factory
========================================================== */

export function createEpistemeKernel(
  config: Partial<EpistemeKernelConfig> = {},
  initialState?: EpistemeState,
): EpistemeKernel {
  return new EpistemeKernel(
    config,
    initialState,
  );
}

/* ==========================================================
   Default Kernel Reset
========================================================== */

export function resetDefaultEpistemeKernel(): void {
  if (defaultKernel) {
    defaultKernel.destroy();
  }

  defaultKernel = null;
}