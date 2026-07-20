/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/engine.ts

   Responsibilities:
   - Process the active Knowledge Packet
   - Execute the six cognitive Organs
   - Advance Packet and Organ state
   - Complete and archive intelligence cycles
   - Register custom Organ processors
   - Report processing failures to the Runtime Store

   Dependency direction:
   types / constants / utils
              ↓
            store
              ↓
            engine

   Important:
   - Engine does not own Runtime State.
   - Engine does not create timers.
   - Scheduler controls time.
   - Store remains the single source of truth.
========================================================== */

import {
  DEFAULT_EPISTEME_ENGINE_CONFIG,
  EPISTEME_ERROR_CODES,
  EPISTEME_ORGAN_ORDER,
  EPISTEME_ORGANS,
} from "./constants";

import {
  clampPacketValue,
  getNextOrganId,
  selectActivePacket,
  updateKnowledgePacket,
} from "./utils";

import type {
  EngineProcessingContext,
  EpistemeEngineConfig,
  EpistemeEngineContract,
  KnowledgePacket,
  KnowledgePacketStatus,
  KnowledgePacketType,
  OrganId,
  OrganProcessor,
} from "./types";

import type {
  EpistemeRuntimeStore,
} from "./store";

/* ==========================================================
   Internal Processing Result
========================================================== */

interface ProcessOrganResult {
  packet: KnowledgePacket;

  organId: OrganId;

  nextOrganId: OrganId;

  cycleCompleted: boolean;
}

/* ==========================================================
   Default Packet Type by Organ
========================================================== */

const PACKET_TYPE_BY_ORGAN: Readonly<
  Record<OrganId, KnowledgePacketType>
> = {
  observation: "signal",

  understanding: "knowledge",

  reasoning: "reasoning",

  design: "design",

  realization: "execution",

  memory: "memory",
};

/* ==========================================================
   Confidence Growth by Organ
========================================================== */

const ORGAN_CONFIDENCE_MULTIPLIER: Readonly<
  Record<OrganId, number>
> = {
  observation: 0.55,

  understanding: 1,

  reasoning: 1.2,

  design: 0.9,

  realization: 0.75,

  memory: 0.6,
};

/* ==========================================================
   Relevance Growth by Organ
========================================================== */

const ORGAN_RELEVANCE_MULTIPLIER: Readonly<
  Record<OrganId, number>
> = {
  observation: 0.7,

  understanding: 1.1,

  reasoning: 1,

  design: 0.85,

  realization: 0.8,

  memory: 0.6,
};

/* ==========================================================
   Importance Growth by Organ
========================================================== */

const ORGAN_IMPORTANCE_MULTIPLIER: Readonly<
  Record<OrganId, number>
> = {
  observation: 0.45,

  understanding: 0.65,

  reasoning: 1,

  design: 1.1,

  realization: 1.2,

  memory: 0.7,
};

/* ==========================================================
   Packet Status Resolver
========================================================== */

function getProcessedPacketStatus(
  organId: OrganId,
): KnowledgePacketStatus {
  return organId === "memory"
    ? "completed"
    : "processing";
}

/* ==========================================================
   Default Processor
========================================================== */

function createDefaultOrganProcessor(
  organId: OrganId,
  config: Readonly<EpistemeEngineConfig>,
): OrganProcessor {
  return ({
    packet,
    nextOrganId,
  }) => {
    const timestamp = Date.now();

    const confidenceGrowth =
      config.confidenceGrowth *
      ORGAN_CONFIDENCE_MULTIPLIER[
        organId
      ];

    const relevanceGrowth =
      config.relevanceGrowth *
      ORGAN_RELEVANCE_MULTIPLIER[
        organId
      ];

    const importanceGrowth =
      config.importanceGrowth *
      ORGAN_IMPORTANCE_MULTIPLIER[
        organId
      ];

    return updateKnowledgePacket(
      packet,
      {
        type:
          PACKET_TYPE_BY_ORGAN[
            organId
          ],

        status:
          getProcessedPacketStatus(
            organId,
          ),

        from: organId,

        to: nextOrganId,

        metadata: {
          ...packet.metadata,

          confidence:
            clampPacketValue(
              packet.metadata
                .confidence +
                confidenceGrowth,
            ),

          relevance:
            clampPacketValue(
              packet.metadata
                .relevance +
                relevanceGrowth,
            ),

          importance:
            clampPacketValue(
              packet.metadata
                .importance +
                importanceGrowth,
            ),

          processedAt:
            organId === "memory"
              ? timestamp
              : packet.metadata
                  .processedAt,

          updatedAt: timestamp,
        },
      },
      timestamp,
    );
  };
}

/* ==========================================================
   Episteme Engine
========================================================== */

export class EpistemeEngine
  implements EpistemeEngineContract
{
  private readonly store:
    EpistemeRuntimeStore;

  private readonly config:
    EpistemeEngineConfig;

  private readonly processors =
    new Map<
      OrganId,
      OrganProcessor
    >();

  private processing = false;

  private destroyed = false;

  /* ========================================================
     Constructor
  ======================================================== */

  constructor(
    store: EpistemeRuntimeStore,

    config:
      Partial<
        EpistemeEngineConfig
      > = {},
  ) {
    this.store = store;

    this.config = {
      ...DEFAULT_EPISTEME_ENGINE_CONFIG,
      ...config,
    };

    this.registerDefaultProcessors();
  }

  /* ========================================================
     Configuration
  ======================================================== */

  getConfig():
    Readonly<EpistemeEngineConfig> {
    return this.config;
  }

  getStore():
    EpistemeRuntimeStore {
    return this.store;
  }

  isProcessing(): boolean {
    return this.processing;
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  /* ========================================================
     Default Processors
  ======================================================== */

  private registerDefaultProcessors():
    void {
    for (
      const organId of
      EPISTEME_ORGAN_ORDER
    ) {
      this.processors.set(
        organId,

        createDefaultOrganProcessor(
          organId,
          this.config,
        ),
      );
    }
  }

  /* ========================================================
     Register Processor
  ======================================================== */

  registerProcessor(
    organId: OrganId,
    processor: OrganProcessor,
  ): void {
    if (this.destroyed) {
      return;
    }

    this.processors.set(
      organId,
      processor,
    );
  }

  /* ========================================================
     Unregister Processor
  ======================================================== */

  unregisterProcessor(
    organId: OrganId,
  ): void {
    if (this.destroyed) {
      return;
    }

    this.processors.delete(
      organId,
    );
  }

  /* ========================================================
     Restore Default Processor
  ======================================================== */

  restoreDefaultProcessor(
    organId: OrganId,
  ): void {
    if (this.destroyed) {
      return;
    }

    this.processors.set(
      organId,

      createDefaultOrganProcessor(
        organId,
        this.config,
      ),
    );
  }

  /* ========================================================
     Runtime Guard
  ======================================================== */

  private assertOperational():
    boolean {
    if (this.destroyed) {
      this.store.reportError(
        EPISTEME_ERROR_CODES
          .ENGINE_FAILURE,

        "Episteme Engine has already been destroyed.",
        {
          recoverable: false,
        },
      );

      return false;
    }

    if (
      this.store.isDestroyed()
    ) {
      return false;
    }

    return true;
  }

  /* ========================================================
     Resolve Active Packet
  ======================================================== */

  private resolveActivePacket():
    KnowledgePacket | null {
    const state =
      this.store.getState();

    const activePacket =
      selectActivePacket(state);

    if (activePacket) {
      return activePacket;
    }

    const queuedPacket =
      this.store
        .getQueuedPackets()[0] ??
      null;

    if (!queuedPacket) {
      return null;
    }

    this.store.setActivePacket(
      queuedPacket.id,
    );

    return (
      this.store.getActivePacket() ??
      queuedPacket
    );
  }

  /* ========================================================
     Ensure Active Cycle
  ======================================================== */

  private ensureActiveCycle():
    void {
    const state =
      this.store.getState();

    const requiresNewCycle =
      state.cycle.status ===
        "idle" ||
      state.cycle.status ===
        "completed" ||
      state.cycle.status ===
        "failed";

    if (requiresNewCycle) {
      this.store.startCycle();

      return;
    }

    if (!state.running) {
      this.store.start();
    }
  }

  /* ========================================================
     Create Processing Context
  ======================================================== */

  private createProcessingContext(
    packet: KnowledgePacket,
    organId: OrganId,
  ): EngineProcessingContext {
    const state =
      this.store.getState();

    return {
      state,

      packet,

      organId,

      nextOrganId:
        getNextOrganId(
          organId,
        ),

      cycle:
        state.cycle,
    };
  }

  /* ========================================================
     Execute Processor
  ======================================================== */

  private async executeProcessor(
    context:
      EngineProcessingContext,
  ): Promise<KnowledgePacket> {
    const processor =
      this.processors.get(
        context.organId,
      );

    if (!processor) {
      throw new Error(
        `No processor is registered for ${context.organId}.`,
      );
    }

    const result =
      await processor(context);

    if (!result?.id) {
      throw new Error(
        `The ${context.organId} processor returned an invalid Knowledge Packet.`,
      );
    }

    if (
      result.id !==
      context.packet.id
    ) {
      return {
        ...result,

        id:
          context.packet.id,
      };
    }

    return result;
  }

  /* ========================================================
     Process Current Organ
  ======================================================== */

  async processCurrentOrgan():
    Promise<KnowledgePacket | null> {
    if (
      !this.assertOperational()
    ) {
      return null;
    }

    if (this.processing) {
      return this.store
        .getActivePacket();
    }

    const packet =
      this.resolveActivePacket();

    if (!packet) {
      this.store.setRunning(
        false,
      );

      this.store.setStatus(
        "waiting",
      );

      return null;
    }

    this.ensureActiveCycle();

    const state =
      this.store.getState();

    const organId =
      state.cycle.activeOrgan;

    const nextOrganId =
      getNextOrganId(
        organId,
      );

    this.processing = true;

    try {
      this.store.activateOrgan(
        organId,
      );

      this.store.setActivePacket(
        packet.id,
      );

      const processingPacket =
        updateKnowledgePacket(
          packet,
          {
            status: "processing",

            from:
              packet.from,

            to: organId,
          },
        );

      this.store.updatePacket(
        packet.id,
        processingPacket,
      );

      const context =
        this.createProcessingContext(
          processingPacket,
          organId,
        );

      const processedPacket =
        await this.executeProcessor(
          context,
        );

      this.store.updatePacket(
        processedPacket.id,
        processedPacket,
      );

      this.store.completeOrgan(
        organId,
      );

      if (
        organId !== "memory"
      ) {
        this.store.routePacket(
          processedPacket.id,
          organId,
          nextOrganId,
        );
      }

      return (
        this.store.getPacket(
          processedPacket.id,
        ) ??
        processedPacket
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown Organ processing failure.";

      this.store.updateOrgan(
        organId,
        {
          runtimeStatus:
            "error",

          intelligenceStatus:
            "degraded",

          isActive: false,
        },
      );

      this.store.updatePacket(
        packet.id,
        {
          status: "failed",
        },
      );

      this.store.reportError(
        EPISTEME_ERROR_CODES
          .ENGINE_FAILURE,

        message,
        {
          recoverable: true,

          organId,

          packetId:
            packet.id,

          cycleId:
            state.cycle.id,
        },
      );

      return null;
    } finally {
      this.processing = false;
    }
  }

  /* ========================================================
     Process Current Organ with Result
  ======================================================== */

  async processCurrentOrganDetailed():
    Promise<ProcessOrganResult | null> {
    const initialState =
      this.store.getState();

    const organId =
      initialState.cycle
        .activeOrgan;

    const nextOrganId =
      getNextOrganId(
        organId,
      );

    const packet =
      await this.processCurrentOrgan();

    if (!packet) {
      return null;
    }

    return {
      packet,

      organId,

      nextOrganId,

      cycleCompleted:
        organId === "memory",
    };
  }

  /* ========================================================
     Advance Organ
  ======================================================== */

  async advanceOrgan():
    Promise<OrganId> {
    if (
      !this.assertOperational()
    ) {
      return this.store
        .getState()
        .cycle.activeOrgan;
    }

    const state =
      this.store.getState();

    const currentOrgan =
      state.cycle.activeOrgan;

    if (
      currentOrgan === "memory"
    ) {
      await this.completeCycle();

      return "observation";
    }

    const nextOrgan =
      getNextOrganId(
        currentOrgan,
      );

    this.store.setActiveOrgan(
      nextOrgan,
    );

    this.store.activateOrgan(
      nextOrgan,
    );

    return nextOrgan;
  }

  /* ========================================================
     Complete Cycle
  ======================================================== */

  async completeCycle():
    Promise<void> {
    if (
      !this.assertOperational()
    ) {
      return;
    }

    const state =
      this.store.getState();

    const packet =
      this.store.getActivePacket();

    this.store.setSynchronizing(
      true,
    );

    this.store.emitEvent(
      "synchronization_started",
      `Civilization Intelligence cycle ${state.cycle.number} entered synchronization.`,
      {
        cycleId:
          state.cycle.id,

        packetId:
          packet?.id,

        organId:
          "memory",
      },
    );

    if (packet) {
      this.store.completePacket(
        packet.id,
      );

      if (
        this.config
          .archiveCompletedPackets
      ) {
        this.store.archivePacket(
          packet.id,
        );
      } else {
        this.store.setActivePacket(
          null,
        );
      }
    }

    this.store.completeCycle();

    this.store.setSynchronizing(
      false,
    );

    this.store.emitEvent(
      "synchronization_completed",
      `Civilization Intelligence cycle ${state.cycle.number} completed synchronization.`,
      {
        cycleId:
          state.cycle.id,

        packetId:
          packet?.id,

        organId:
          "memory",
      },
    );
  }

  /* ========================================================
     Process One Engine Step
  ======================================================== */

  async processStep():
    Promise<ProcessOrganResult | null> {
    const result =
      await this.processCurrentOrganDetailed();

    if (!result) {
      return null;
    }

    if (
      result.organId === "memory"
    ) {
      await this.completeCycle();

      return {
        ...result,

        cycleCompleted: true,
      };
    }

    await this.advanceOrgan();

    return result;
  }

  /* ========================================================
     Process Full Cycle
  ======================================================== */

  async processCycle():
    Promise<void> {
    if (
      !this.assertOperational()
    ) {
      return;
    }

    const packet =
      this.resolveActivePacket();

    if (!packet) {
      this.store.setStatus(
        "waiting",
      );

      return;
    }

    this.ensureActiveCycle();

    /*
     * Safety guard prevents accidental infinite loops if
     * a custom processor mutates the cycle incorrectly.
     */
    const maximumSteps =
      EPISTEME_ORGAN_ORDER.length;

    for (
      let step = 0;
      step < maximumSteps;
      step += 1
    ) {
      const state =
        this.store.getState();

      if (
        state.errors.length > 0 &&
        state.status === "error"
      ) {
        return;
      }

      const currentOrgan =
        state.cycle.activeOrgan;

      const processedPacket =
        await this.processCurrentOrgan();

      if (!processedPacket) {
        return;
      }

      if (
        currentOrgan === "memory"
      ) {
        await this.completeCycle();

        return;
      }

      await this.advanceOrgan();
    }

    const finalState =
      this.store.getState();

    if (
      finalState.cycle.status !==
      "completed"
    ) {
      this.store.reportError(
        EPISTEME_ERROR_CODES
          .ENGINE_FAILURE,

        "Episteme Engine reached the cycle safety limit before Memory completed.",
        {
          recoverable: true,

          organId:
            finalState.cycle
              .activeOrgan,

          packetId:
            finalState.queue
              .activePacketId ??
            undefined,

          cycleId:
            finalState.cycle.id,
        },
      );
    }
  }

  /* ========================================================
     Reset Processors
  ======================================================== */

  resetProcessors(): void {
    if (this.destroyed) {
      return;
    }

    this.processors.clear();

    this.registerDefaultProcessors();
  }

  /* ========================================================
     Destroy
  ======================================================== */

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    this.processing = false;

    this.processors.clear();
  }
}

/* ==========================================================
   Engine Factory
========================================================== */

export function createEpistemeEngine(
  store: EpistemeRuntimeStore,

  config:
    Partial<
      EpistemeEngineConfig
    > = {},
): EpistemeEngine {
  return new EpistemeEngine(
    store,
    config,
  );
}