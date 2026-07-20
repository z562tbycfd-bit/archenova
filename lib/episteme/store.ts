/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   lib/episteme/store.ts

   Responsibilities:
   - Single source of truth for Episteme Runtime
   - Immutable state transitions
   - Knowledge Packet ingestion
   - Queue / Archive management
   - Organ and Cycle state updates
   - Runtime Events and Errors
   - Metrics recalculation
   - React-compatible external store subscription

   Dependency rule:
   store.ts may import only:
   - ./types
   - ./constants
   - ./utils
========================================================== */

import {
  DEFAULT_EPISTEME_STORE_CONFIG,
  EPISTEME_ACTIVE_RUNTIME_STATUS,
  EPISTEME_ERROR_CODES,
  EPISTEME_INITIAL_ORGAN,
  EPISTEME_ORGAN_ORDER,
  EPISTEME_ORGANS,
} from "./constants";

import {
  clamp,
  cloneKnowledgePacket,
  cloneRuntimeState,
  createInitialRuntimeState,
  createKnowledgePacket,
  createRuntimeCycle,
  createRuntimeError,
  createRuntimeEvent,
  getNextOrganId,
  recalculateRuntimeMetrics,
  resolveRuntimeStatus,
  selectActivePacket,
  synchronizeRuntimeOrgans,
  updateKnowledgePacket,
  validateRuntimeState,
} from "./utils";

import type {
  EpistemeRuntimeSnapshot,
  EpistemeRuntimeState,
  EpistemeRuntimeStatus,
  EpistemeRuntimeStoreContract,
  EpistemeStoreAction,
  EpistemeStoreConfig,
  EpistemeStoreListener,
  KnowledgePacket,
  KnowledgePacketInput,
  OrganId,
  RuntimeError,
  RuntimeEvent,
  RuntimeMetrics,
  RuntimeOrgan,
} from "./types";

/* ==========================================================
   Internal State Updater
========================================================== */

type StoreStateUpdater =
  | Partial<EpistemeRuntimeState>
  | ((
      state: EpistemeRuntimeState,
    ) => EpistemeRuntimeState);

/* ==========================================================
   Runtime Store
========================================================== */

export class EpistemeRuntimeStore
  implements EpistemeRuntimeStoreContract
{
  private state: EpistemeRuntimeState;

  private snapshot: EpistemeRuntimeSnapshot;

  private revision = 0;

  private readonly config: EpistemeStoreConfig;

  private readonly listeners =
    new Set<EpistemeStoreListener>();

  private destroyed = false;

  /* ========================================================
     Constructor
  ======================================================== */

  constructor(
    config: Partial<EpistemeStoreConfig> = {},
    initialState?: EpistemeRuntimeState,
  ) {
    this.config = {
      ...DEFAULT_EPISTEME_STORE_CONFIG,
      ...config,
    };

    this.state =
      initialState
        ? cloneRuntimeState(initialState)
        : createInitialRuntimeState();

    this.snapshot =
      this.createSnapshot();

    this.appendEvent(
      createRuntimeEvent(
        "runtime_initialized",
        "Episteme Runtime Store initialized.",
        {
          severity: "info",
        },
      ),
      false,
    );

    this.state = {
      ...this.state,
      ready: true,
      status: "ready",
      updatedAt: Date.now(),
    };

    this.refreshSnapshot();
  }

  /* ========================================================
     State Access
  ======================================================== */

  getState(): EpistemeRuntimeState {
    return this.state;
  }

  getSnapshot(): EpistemeRuntimeSnapshot {
    return this.snapshot;
  }

  getServerSnapshot(): EpistemeRuntimeSnapshot {
    return this.snapshot;
  }

  getRevision(): number {
    return this.revision;
  }

  getConfig(): Readonly<EpistemeStoreConfig> {
    return this.config;
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  /* ========================================================
     Subscription
  ======================================================== */

  subscribe(
    listener: EpistemeStoreListener,
  ): () => void {
    if (this.destroyed) {
      return () => undefined;
    }

    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.snapshot);
      } catch (error) {
        console.error(
          "[Episteme Runtime Store] listener failed:",
          error,
        );
      }
    }
  }

  /* ========================================================
     Snapshot
  ======================================================== */

  private createSnapshot():
    EpistemeRuntimeSnapshot {
    return {
      state: this.state,
      revision: this.revision,
      timestamp: Date.now(),
    };
  }

  private refreshSnapshot(): void {
    this.snapshot =
      this.createSnapshot();
  }

  /* ========================================================
     State Update
  ======================================================== */

  private setState(
    updater: StoreStateUpdater,
    options: {
      recalculateMetrics?: boolean;
      validate?: boolean;
      notify?: boolean;
    } = {},
  ): EpistemeRuntimeState {
    if (this.destroyed) {
      return this.state;
    }

    const {
      recalculateMetrics = true,
      validate = true,
      notify = true,
    } = options;

    const currentState =
      this.state;

    const updatedState =
      typeof updater === "function"
        ? updater(currentState)
        : {
            ...currentState,
            ...updater,
          };

    const timestamp =
      Date.now();

    let nextState: EpistemeRuntimeState = {
      ...updatedState,
      updatedAt: timestamp,
    };

    if (recalculateMetrics) {
      nextState = {
        ...nextState,

        metrics:
          recalculateRuntimeMetrics(
            nextState,
            this.config.maxQueueSize,
            timestamp,
          ),
      };
    }

    nextState = {
      ...nextState,
      status:
        resolveRuntimeStatus(
          nextState,
        ),
    };

    if (validate) {
      const validationErrors =
        validateRuntimeState(
          nextState,
        );

      if (
        validationErrors.length > 0
      ) {
        const message =
          validationErrors.join(" ");

        const runtimeError =
          createRuntimeError(
            EPISTEME_ERROR_CODES
              .INVALID_RUNTIME_STATE,
            message,
            {
              recoverable: true,
            },
          );

        nextState = {
          ...nextState,

          status: "error",

          errors:
            this.limitErrors([
              ...nextState.errors,
              runtimeError,
            ]),

          metrics: {
            ...nextState.metrics,

            totalErrors:
              nextState.metrics
                .totalErrors + 1,
          },
        };
      }
    }

    this.revision += 1;

    this.state =
      nextState;

    this.refreshSnapshot();

    if (
      this.config.enableDebugLogging
    ) {
      console.debug(
        "[Episteme Runtime Store]",
        {
          revision:
            this.revision,

          status:
            this.state.status,

          activeOrgan:
            this.state.cycle
              .activeOrgan,

          cycle:
            this.state.cycle.number,

          packet:
            this.state.queue
              .activePacketId,

          queue:
            this.state.queue.items
              .length,
        },
      );
    }

    if (notify) {
      this.notify();
    }

    return this.state;
  }

  /* ========================================================
     History Limits
  ======================================================== */

  private limitEvents(
    events: RuntimeEvent[],
  ): RuntimeEvent[] {
    const maximum =
      Math.max(
        0,
        this.config.maxEventHistory,
      );

    if (maximum === 0) {
      return [];
    }

    return events.slice(-maximum);
  }

  private limitErrors(
    errors: RuntimeError[],
  ): RuntimeError[] {
    const maximum =
      Math.max(
        0,
        this.config.maxErrorHistory,
      );

    if (maximum === 0) {
      return [];
    }

    return errors.slice(-maximum);
  }

  private limitArchive(
    archive: KnowledgePacket[],
  ): KnowledgePacket[] {
    const maximum =
      Math.max(
        0,
        this.config.maxArchiveSize,
      );

    if (maximum === 0) {
      return [];
    }

    return archive.slice(-maximum);
  }

  /* ========================================================
     Event Operations
  ======================================================== */

  private appendEvent(
    event: RuntimeEvent,
    notify = true,
  ): void {
    this.setState(
      (state) => ({
        ...state,

        events:
          this.limitEvents([
            ...state.events,
            event,
          ]),
      }),
      {
        recalculateMetrics: false,
        validate: false,
        notify,
      },
    );
  }

  addEvent(
    event: RuntimeEvent,
  ): void {
    this.appendEvent(event);
  }

  emitEvent(
    type: RuntimeEvent["type"],
    message: string,
    options: {
      severity?: RuntimeEvent["severity"];
      organId?: OrganId;
      packetId?: string;
      cycleId?: string;
      data?: RuntimeEvent["data"];
    } = {},
  ): RuntimeEvent {
    const event =
      createRuntimeEvent(
        type,
        message,
        options,
      );

    this.appendEvent(event);

    return event;
  }

  /* ========================================================
     Error Operations
  ======================================================== */

  addError(
    error: RuntimeError,
  ): void {
    this.setState(
      (state) => ({
        ...state,

        status: "error",

        errors:
          this.limitErrors([
            ...state.errors,
            error,
          ]),

        metrics: {
          ...state.metrics,

          totalErrors:
            state.metrics
              .totalErrors + 1,
        },
      }),
      {
        recalculateMetrics: false,
      },
    );

    this.appendEvent(
      createRuntimeEvent(
        "error",
        error.message,
        {
          severity: "critical",
          organId: error.organId,
          packetId: error.packetId,
          cycleId: error.cycleId,
          data: {
            code: error.code,
            recoverable:
              error.recoverable,
          },
        },
      ),
    );
  }

  reportError(
    code: string,
    message: string,
    options: {
      recoverable?: boolean;
      organId?: OrganId;
      packetId?: string;
      cycleId?: string;
    } = {},
  ): RuntimeError {
    const error =
      createRuntimeError(
        code,
        message,
        options,
      );

    this.addError(error);

    return error;
  }

  clearErrors(): void {
    this.setState(
      (state) => ({
        ...state,

        errors: [],

        status:
          state.running
            ? "operating"
            : state.ready
              ? "ready"
              : "offline",
      }),
    );
  }

  /* ========================================================
     Dispatch
  ======================================================== */

  dispatch(
    action: EpistemeStoreAction,
  ): EpistemeRuntimeState {
    if (this.destroyed) {
      return this.state;
    }

    switch (action.type) {
      case "SET_STATUS":
        return this.setStatus(
          action.status,
        );

      case "SET_READY":
        return this.setReady(
          action.ready,
        );

      case "SET_RUNNING":
        return this.setRunning(
          action.running,
        );

      case "SET_PAUSED":
        return this.setPaused(
          action.paused,
        );

      case "SET_SYNCHRONIZING":
        return this.setSynchronizing(
          action.synchronizing,
        );

      case "SET_ACTIVE_ORGAN":
        return this.setActiveOrgan(
          action.organId,
        );

      case "UPDATE_ORGAN":
        return this.updateOrgan(
          action.organId,
          action.patch,
        );

      case "START_CYCLE":
        return this.startCycle(
          action.timestamp,
        );

      case "COMPLETE_CYCLE":
        return this.completeCycle(
          action.timestamp,
        );

            case "SET_CYCLE":
        return this.setState(
          (state) => ({
            ...state,

            cycle: {
              ...action.cycle,

              completedOrgans: [
                ...action.cycle.completedOrgans,
              ],

              progress: clamp(
                action.cycle.progress,
                0,
                100,
              ),

              updatedAt: Date.now(),
            },

            organs: synchronizeRuntimeOrgans(
              state.organs,
              {
                activeOrgan:
                  action.cycle.activeOrgan,

                previousOrgan:
                  action.cycle.previousOrgan,

                nextOrgan:
                  action.cycle.nextOrgan,

                completedOrgans:
                  action.cycle.completedOrgans,

                timestamp: Date.now(),
              },
            ),
          }),
        );

      case "ENQUEUE_PACKET":
        return this.enqueuePacket(
          action.packet,
        );

      case "UPDATE_PACKET":
        return this.updatePacket(
          action.packetId,
          action.patch,
        );

      case "SET_ACTIVE_PACKET":
        return this.setActivePacket(
          action.packetId,
        );

      case "ARCHIVE_PACKET":
        return this.archivePacket(
          action.packetId,
        );

      case "ADD_EVENT":
        this.addEvent(action.event);

        return this.state;

      case "ADD_ERROR":
        this.addError(action.error);

        return this.state;

      case "UPDATE_METRICS":
        return this.updateMetrics(
          action.metrics,
        );

      case "RESET_RUNTIME":
        this.reset(
          action.preserveArchive,
        );

        return this.state;

      default:
        return this.state;
    }
  }

  /* ========================================================
     Runtime Status Operations
  ======================================================== */

  setStatus(
    status: EpistemeRuntimeStatus,
  ): EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        status,

        running:
          status === "operating"
            ? true
            : status === "paused"
              ? state.running
              : status === "destroyed"
                ? false
                : state.running,

        paused:
          status === "paused"
            ? true
            : status === "operating"
              ? false
              : state.paused,

        synchronizing:
          status === "synchronizing",
      }),
      {
        recalculateMetrics: false,
      },
    );
  }

  setReady(
    ready: boolean,
  ): EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        ready,

        status: ready
          ? state.running
            ? "operating"
            : "ready"
          : "offline",
      }),
    );
  }

  setRunning(
    running: boolean,
  ): EpistemeRuntimeState {
    const timestamp = Date.now();

    return this.setState(
      (state) => ({
        ...state,

        running,

        paused: running
          ? false
          : state.paused,

        status: running
          ? "operating"
          : state.ready
            ? "waiting"
            : "offline",

        startedAt:
          running
            ? state.startedAt ??
              timestamp
            : state.startedAt,

        stoppedAt:
          running
            ? null
            : timestamp,
      }),
    );
  }

  setPaused(
    paused: boolean,
  ): EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        paused,

        status: paused
          ? "paused"
          : state.running
            ? "operating"
            : state.ready
              ? "waiting"
              : "offline",

        cycle: {
          ...state.cycle,

          status: paused
            ? "paused"
            : state.cycle.status ===
                "paused"
              ? state.running
                ? "running"
                : "idle"
              : state.cycle.status,

          updatedAt: Date.now(),
        },
      }),
    );
  }

  setSynchronizing(
    synchronizing: boolean,
  ): EpistemeRuntimeState {
    const timestamp = Date.now();

    return this.setState(
      (state) => ({
        ...state,

        synchronizing,

        status: synchronizing
          ? "synchronizing"
          : state.running
            ? "operating"
            : state.cycle.status ===
                "completed"
              ? "completed"
              : "waiting",

        lastSynchronizationAt:
          synchronizing
            ? timestamp
            : state.lastSynchronizationAt,

        cycle: {
          ...state.cycle,

          status: synchronizing
            ? "synchronizing"
            : state.cycle.status ===
                "synchronizing"
              ? state.running
                ? "running"
                : "completed"
              : state.cycle.status,

          updatedAt: timestamp,
        },

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

                intelligenceStatus:
                  synchronizing
                    ? "synchronizing"
                    : organ.isActive
                      ? "active"
                      : organ.isCompleted
                        ? "learning"
                        : "inactive",

                updatedAt: timestamp,
              };

              return result;
            },
            {} as Record<
              OrganId,
              RuntimeOrgan
            >,
          ),
      }),
    );
  }

  /* ========================================================
     Organ Operations
  ======================================================== */

  setActiveOrgan(
    organId: OrganId,
  ): EpistemeRuntimeState {
    const timestamp = Date.now();

    return this.setState(
      (state) => {
        const previousOrgan =
          state.cycle.activeOrgan;

        const nextOrgan =
          getNextOrganId(organId);

        return {
          ...state,

          organs:
            synchronizeRuntimeOrgans(
              state.organs,
              {
                activeOrgan: organId,

                previousOrgan:
                  previousOrgan ===
                  organId
                    ? state.cycle
                        .previousOrgan
                    : previousOrgan,

                nextOrgan,

                completedOrgans:
                  state.cycle
                    .completedOrgans,

                timestamp,
              },
            ),

          cycle: {
            ...state.cycle,

            status: "running",

            activeOrgan: organId,

            previousOrgan:
              previousOrgan === organId
                ? state.cycle
                    .previousOrgan
                : previousOrgan,

            nextOrgan,

            updatedAt: timestamp,
          },

          lastTickAt: timestamp,
        };
      },
    );
  }

  updateOrgan(
    organId: OrganId,
    patch: Partial<RuntimeOrgan>,
  ): EpistemeRuntimeState {
    return this.setState(
      (state) => {
        const current =
          state.organs[organId];

        return {
          ...state,

          organs: {
            ...state.organs,

            [organId]: {
              ...current,
              ...patch,

              definition: {
                ...current.definition,
                ...patch.definition,

                id: organId,
              },

              metrics: {
                ...current.metrics,
                ...patch.metrics,

                confidence: clamp(
                  patch.metrics
                    ?.confidence ??
                    current.metrics
                      .confidence,
                ),

                activity: clamp(
                  patch.metrics
                    ?.activity ??
                    current.metrics
                      .activity,
                ),

                complexity: clamp(
                  patch.metrics
                    ?.complexity ??
                    current.metrics
                      .complexity,
                ),

                health: clamp(
                  patch.metrics?.health ??
                    current.metrics.health,
                ),

                synchronization: clamp(
                  patch.metrics
                    ?.synchronization ??
                    current.metrics
                      .synchronization,
                ),
              },

              progress: clamp(
                patch.progress ??
                  current.progress,
              ),

              updatedAt: Date.now(),
            },
          },
        };
      },
    );
  }

  activateOrgan(
    organId: OrganId,
  ): EpistemeRuntimeState {
    const timestamp = Date.now();

    this.emitEvent(
      "organ_activated",
      `${EPISTEME_ORGANS[organId].title} activated.`,
      {
        organId,
        cycleId:
          this.state.cycle.id,
      },
    );

    return this.updateOrgan(
      organId,
      {
        runtimeStatus:
          EPISTEME_ACTIVE_RUNTIME_STATUS[
            organId
          ],

        intelligenceStatus:
          "active",

        isActive: true,

        progress: 50,

        activatedAt: timestamp,

        completedAt: null,

        metrics: {
          ...this.state.organs[
            organId
          ].metrics,

          activity: clamp(
            this.state.organs[
              organId
            ].metrics.activity + 25,
          ),
        },
      },
    );
  }

  completeOrgan(
    organId: OrganId,
  ): EpistemeRuntimeState {
    const timestamp = Date.now();

    const completedOrgans =
      this.state.cycle
        .completedOrgans.includes(
          organId,
        )
        ? this.state.cycle
            .completedOrgans
        : [
            ...this.state.cycle
              .completedOrgans,
            organId,
          ];

    const progress = clamp(
      (
        completedOrgans.length /
        EPISTEME_ORGAN_ORDER.length
      ) * 100,
    );

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        organs: {
          ...currentState.organs,

          [organId]: {
            ...currentState.organs[
              organId
            ],

            runtimeStatus:
              "completed",

            intelligenceStatus:
              "learning",

            isActive: false,

            isCompleted: true,

            progress: 100,

            completedAt: timestamp,

            updatedAt: timestamp,

            metrics: {
              ...currentState.organs[
                organId
              ].metrics,

              activity: clamp(
                currentState.organs[
                  organId
                ].metrics.activity - 10,
              ),

              processedPackets:
                currentState.organs[
                  organId
                ].metrics
                  .processedPackets + 1,
            },
          },
        },

        cycle: {
          ...currentState.cycle,

          completedOrgans,

          progress,

          updatedAt: timestamp,
        },
      }),
    );

    this.emitEvent(
      "organ_completed",
      `${EPISTEME_ORGANS[organId].title} completed processing.`,
      {
        organId,

        cycleId:
          state.cycle.id,

        packetId:
          state.queue
            .activePacketId ??
          undefined,
      },
    );

    return this.state;
  }

  /* ========================================================
     Cycle Operations
  ======================================================== */

  startCycle(
    timestamp = Date.now(),
  ): EpistemeRuntimeState {
    const cycleNumber =
      this.state.cycle.status ===
        "idle" &&
      this.state.metrics
        .totalCycles === 0
        ? 1
        : this.state.cycle.number +
          1;

    const cycle =
      createRuntimeCycle(
        cycleNumber,
        timestamp,
      );

    const activeOrgan =
      EPISTEME_INITIAL_ORGAN;

    const nextOrgan =
      getNextOrganId(activeOrgan);

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        status: "operating",

        running: true,

        paused: false,

        synchronizing: false,

        startedAt:
          currentState.startedAt ??
          timestamp,

        stoppedAt: null,

        cycle: {
          ...cycle,

          status: "running",

          activeOrgan,

          previousOrgan: null,

          nextOrgan,

          startedAt: timestamp,

          updatedAt: timestamp,
        },

        organs:
          synchronizeRuntimeOrgans(
            currentState.organs,
            {
              activeOrgan,

              previousOrgan: null,

              nextOrgan,

              completedOrgans: [],

              timestamp,
            },
          ),

        metrics: {
          ...currentState.metrics,

          totalCycles:
            currentState.metrics
              .totalCycles + 1,
        },

        lastTickAt: timestamp,
      }),
    );

    this.emitEvent(
      "cycle_started",
      `Civilization Intelligence cycle ${state.cycle.number} started.`,
      {
        cycleId:
          state.cycle.id,
      },
    );

    this.emitEvent(
      "organ_activated",
      "Observation activated.",
      {
        organId:
          "observation",

        cycleId:
          state.cycle.id,

        packetId:
          state.queue
            .activePacketId ??
          undefined,
      },
    );

    return this.state;
  }

  completeCycle(
    timestamp = Date.now(),
  ): EpistemeRuntimeState {
    const startedAt =
      this.state.cycle.startedAt ??
      timestamp;

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        status: "completed",

        cycle: {
          ...currentState.cycle,

          status: "completed",

          completedOrgans: [
            ...EPISTEME_ORGAN_ORDER,
          ],

          progress: 100,

          completedAt: timestamp,

          updatedAt: timestamp,

          elapsedMs: Math.max(
            0,
            timestamp - startedAt,
          ),
        },

        organs:
          EPISTEME_ORGAN_ORDER.reduce(
            (
              result,
              organId,
            ) => {
              const organ =
                currentState.organs[
                  organId
                ];

              result[organId] = {
                ...organ,

                runtimeStatus:
                  "completed",

                intelligenceStatus:
                  "learning",

                isActive: false,

                isPrevious:
                  organId === "memory",

                isNext:
                  organId ===
                  "observation",

                isCompleted: true,

                progress: 100,

                completedAt:
                  organ.completedAt ??
                  timestamp,

                updatedAt: timestamp,
              };

              return result;
            },
            {} as Record<
              OrganId,
              RuntimeOrgan
            >,
          ),

        metrics: {
          ...currentState.metrics,

          completedCycles:
            currentState.metrics
              .completedCycles + 1,
        },

        lastTickAt: timestamp,
      }),
    );

    this.emitEvent(
      "cycle_completed",
      `Civilization Intelligence cycle ${state.cycle.number} completed.`,
      {
        cycleId:
          state.cycle.id,
      },
    );

    return this.state;
  }

  resetCycle(): EpistemeRuntimeState {
    const timestamp = Date.now();

    const cycle =
      createRuntimeCycle(
        this.state.cycle.number,
        timestamp,
      );

    return this.setState(
      (state) => ({
        ...state,

        cycle,

        organs:
          EPISTEME_ORGAN_ORDER.reduce(
            (
              result,
              organId,
            ) => {
              const organ =
                state.organs[
                  organId
                ];

              result[organId] = {
                ...organ,

                runtimeStatus: "idle",

                intelligenceStatus:
                  "inactive",

                isActive: false,

                isPrevious: false,

                isNext:
                  organId ===
                  "understanding",

                isCompleted: false,

                progress: 0,

                activatedAt: null,

                completedAt: null,

                updatedAt: timestamp,
              };

              return result;
            },
            {} as Record<
              OrganId,
              RuntimeOrgan
            >,
          ),
      }),
    );
  }

  advanceOrgan():
    EpistemeRuntimeState {
    const currentOrgan =
      this.state.cycle
        .activeOrgan;

    const nextOrgan =
      getNextOrganId(
        currentOrgan,
      );

    if (
      currentOrgan === "memory"
    ) {
      this.completeOrgan(
        currentOrgan,
      );

      return this.completeCycle();
    }

    this.completeOrgan(
      currentOrgan,
    );

    const state =
      this.setActiveOrgan(
        nextOrgan,
      );

    this.activateOrgan(
      nextOrgan,
    );

    return state;
  }

  /* ========================================================
     Packet Ingestion
  ======================================================== */

  ingest(
    input: KnowledgePacketInput,
  ): KnowledgePacket {
    if (this.destroyed) {
      throw new Error(
        EPISTEME_ERROR_CODES
          .STORE_DESTROYED,
      );
    }

    if (
      this.state.queue.items
        .length >=
      this.config.maxQueueSize
    ) {
      this.reportError(
        EPISTEME_ERROR_CODES
          .QUEUE_LIMIT_REACHED,

        "The Episteme Knowledge Packet queue has reached its configured limit.",
        {
          recoverable: true,
        },
      );

      throw new Error(
        "Episteme queue limit reached.",
      );
    }

    const packet =
      createKnowledgePacket(
        input,
      );

    this.enqueuePacket(packet);

    this.emitEvent(
      "packet_created",
      `Knowledge Packet created: ${packet.title}`,
      {
        packetId: packet.id,

        organId: packet.to,

        data: {
          priority:
            packet.priority,

          type: packet.type,
        },
      },
    );

    return packet;
  }

  enqueuePacket(
    packet: KnowledgePacket,
  ): EpistemeRuntimeState {
    const queuedPacket =
      updateKnowledgePacket(
        packet,
        {
          status: "queued",
        },
      );

    const state = this.setState(
      (currentState) => {
        const exists =
          currentState.queue.items.some(
            (item) =>
              item.id ===
              queuedPacket.id,
          );

        const items = exists
          ? currentState.queue.items.map(
              (item) =>
                item.id ===
                queuedPacket.id
                  ? queuedPacket
                  : item,
            )
          : [
              ...currentState.queue
                .items,
              queuedPacket,
            ];

        return {
          ...currentState,

          queue: {
            ...currentState.queue,

            items,
          },

          metrics: {
            ...currentState.metrics,

            totalPacketsCreated:
              exists
                ? currentState
                    .metrics
                    .totalPacketsCreated
                : currentState
                    .metrics
                    .totalPacketsCreated +
                  1,
          },
        };
      },
    );

    this.emitEvent(
      "packet_queued",
      `Knowledge Packet queued: ${queuedPacket.title}`,
      {
        packetId:
          queuedPacket.id,

        organId:
          queuedPacket.to,
      },
    );

    return state;
  }

  setActivePacket(
    packetId: string | null,
  ): EpistemeRuntimeState {
    if (packetId === null) {
      return this.setState(
        (state) => ({
          ...state,

          queue: {
            ...state.queue,

            activePacketId: null,
          },
        }),
      );
    }

    const packet =
      this.state.queue.items.find(
        (item) =>
          item.id === packetId,
      );

    if (!packet) {
      this.reportError(
        EPISTEME_ERROR_CODES
          .PACKET_NOT_FOUND,

        `Knowledge Packet not found: ${packetId}`,
        {
          packetId,
          recoverable: true,
        },
      );

      return this.state;
    }

    const processingPacket =
      updateKnowledgePacket(
        packet,
        {
          status: "processing",
        },
      );

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        queue: {
          ...currentState.queue,

          activePacketId:
            packetId,

          items:
            currentState.queue
              .items.map(
                (item) =>
                  item.id === packetId
                    ? processingPacket
                    : item,
              ),
        },
      }),
    );

    this.emitEvent(
      "packet_processing",
      `Knowledge Packet processing started: ${packet.title}`,
      {
        packetId,

        organId:
          state.cycle.activeOrgan,

        cycleId:
          state.cycle.id,
      },
    );

    return state;
  }

  updatePacket(
    packetId: string,
    patch: Partial<KnowledgePacket>,
  ): EpistemeRuntimeState {
    const existing =
      this.state.queue.items.find(
        (packet) =>
          packet.id === packetId,
      );

    if (!existing) {
      this.reportError(
        EPISTEME_ERROR_CODES
          .PACKET_NOT_FOUND,

        `Knowledge Packet not found: ${packetId}`,
        {
          packetId,
          recoverable: true,
        },
      );

      return this.state;
    }

    const updatedPacket =
      updateKnowledgePacket(
        existing,
        patch,
      );

    return this.setState(
      (state) => ({
        ...state,

        queue: {
          ...state.queue,

          items:
            state.queue.items.map(
              (packet) =>
                packet.id ===
                packetId
                  ? updatedPacket
                  : packet,
            ),
        },
      }),
    );
  }

  routePacket(
    packetId: string,
    from: OrganId,
    to: OrganId,
  ): EpistemeRuntimeState {
    const packet =
      this.getPacket(packetId);

    if (!packet) {
      this.reportError(
        EPISTEME_ERROR_CODES
          .PACKET_NOT_FOUND,

        `Knowledge Packet not found: ${packetId}`,
        {
          packetId,
          organId: from,
        },
      );

      return this.state;
    }

    const routedPacket =
      updateKnowledgePacket(
        packet,
        {
          from,
          to,
          status: "queued",
        },
      );

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        queue: {
          ...currentState.queue,

          activePacketId:
            routedPacket.id,

          items:
            currentState.queue
              .items.map(
                (item) =>
                  item.id ===
                  routedPacket.id
                    ? routedPacket
                    : item,
              ),
        },

        organs: {
          ...currentState.organs,

          [from]: {
            ...currentState.organs[
              from
            ],

            metrics: {
              ...currentState.organs[
                from
              ].metrics,

              emittedPackets:
                currentState.organs[
                  from
                ].metrics
                  .emittedPackets + 1,
            },
          },

          [to]: {
            ...currentState.organs[
              to
            ],

            metrics: {
              ...currentState.organs[
                to
              ].metrics,

              receivedPackets:
                currentState.organs[
                  to
                ].metrics
                  .receivedPackets + 1,
            },
          },
        },
      }),
    );

    this.emitEvent(
      "packet_routed",
      `${EPISTEME_ORGANS[from].title} routed intelligence to ${EPISTEME_ORGANS[to].title}.`,
      {
        packetId,

        organId: to,

        cycleId:
          state.cycle.id,

        data: {
          from,
          to,
        },
      },
    );

    return state;
  }

  completePacket(
    packetId: string,
  ): EpistemeRuntimeState {
    const packet =
      this.getPacket(packetId);

    if (!packet) {
      return this.state;
    }

    const completedPacket =
      updateKnowledgePacket(
        packet,
        {
          status: "completed",

          metadata: {
            ...packet.metadata,

            processedAt:
              Date.now(),
          },
        },
      );

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        queue: {
          ...currentState.queue,

          lastProcessedPacketId:
            packetId,

          items:
            currentState.queue
              .items.map(
                (item) =>
                  item.id === packetId
                    ? completedPacket
                    : item,
              ),
        },

        metrics: {
          ...currentState.metrics,

          totalPacketsProcessed:
            currentState.metrics
              .totalPacketsProcessed +
            1,
        },
      }),
    );

    this.emitEvent(
      "packet_completed",
      `Knowledge Packet completed: ${completedPacket.title}`,
      {
        packetId,

        organId:
          state.cycle.activeOrgan,

        cycleId:
          state.cycle.id,
      },
    );

    return state;
  }

  archivePacket(
    packetId: string,
  ): EpistemeRuntimeState {
    const packet =
      this.getPacket(packetId);

    if (!packet) {
      this.reportError(
        EPISTEME_ERROR_CODES
          .PACKET_NOT_FOUND,

        `Knowledge Packet not found: ${packetId}`,
        {
          packetId,
          recoverable: true,
        },
      );

      return this.state;
    }

    const archivedPacket =
      updateKnowledgePacket(
        packet,
        {
          type: "memory",

          status: "archived",

          from: "memory",

          to: "observation",

          metadata: {
            ...packet.metadata,

            archivedAt:
              Date.now(),
          },
        },
      );

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        queue: {
          items:
            currentState.queue.items
              .filter(
                (item) =>
                  item.id !== packetId,
              ),

          activePacketId:
            currentState.queue
              .activePacketId ===
            packetId
              ? null
              : currentState.queue
                  .activePacketId,

          lastProcessedPacketId:
            packetId,
        },

        archive:
          this.limitArchive([
            ...currentState.archive,
            archivedPacket,
          ]),

        metrics: {
          ...currentState.metrics,

          totalPacketsArchived:
            currentState.metrics
              .totalPacketsArchived +
            1,
        },
      }),
    );

    this.emitEvent(
      "packet_archived",
      `Knowledge Packet encoded into Memory: ${archivedPacket.title}`,
      {
        packetId,

        organId: "memory",

        cycleId:
          state.cycle.id,
      },
    );

    return state;
  }

  removePacket(
    packetId: string,
  ): EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        queue: {
          ...state.queue,

          items:
            state.queue.items.filter(
              (packet) =>
                packet.id !==
                packetId,
            ),

          activePacketId:
            state.queue
              .activePacketId ===
            packetId
              ? null
              : state.queue
                  .activePacketId,
        },
      }),
    );
  }

  clearQueue(): EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        queue: {
          items: [],

          activePacketId: null,

          lastProcessedPacketId:
            state.queue
              .lastProcessedPacketId,
        },
      }),
    );
  }

  clearArchive(): EpistemeRuntimeState {
    return this.setState({
      archive: [],
    });
  }

  /* ========================================================
     Metrics Operations
  ======================================================== */

  updateMetrics(
    metrics: Partial<RuntimeMetrics>,
  ): EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        metrics: {
          ...state.metrics,
          ...metrics,

          health: clamp(
            metrics.health ??
              state.metrics.health,
          ),

          synchronization: clamp(
            metrics.synchronization ??
              state.metrics
                .synchronization,
          ),

          activity: clamp(
            metrics.activity ??
              state.metrics.activity,
          ),

          cognitiveLoad: clamp(
            metrics.cognitiveLoad ??
              state.metrics
                .cognitiveLoad,
          ),

          queueLoad: clamp(
            metrics.queueLoad ??
              state.metrics.queueLoad,
          ),

          averageConfidence:
            clamp(
              metrics.averageConfidence ??
                state.metrics
                  .averageConfidence,
            ),
        },
      }),
    );
  }

  recalculateMetrics():
    EpistemeRuntimeState {
    return this.setState(
      (state) => ({
        ...state,

        metrics:
          recalculateRuntimeMetrics(
            state,
            this.config.maxQueueSize,
          ),
      }),
      {
        recalculateMetrics: false,
      },
    );
  }

  /* ========================================================
     Selectors
  ======================================================== */

  getOrgan(
    organId: OrganId,
  ): RuntimeOrgan {
    return this.state.organs[
      organId
    ];
  }

  getActiveOrgan():
    RuntimeOrgan {
    return this.state.organs[
      this.state.cycle
        .activeOrgan
    ];
  }

  getNextOrgan():
    RuntimeOrgan {
    return this.state.organs[
      this.state.cycle.nextOrgan
    ];
  }

  getPreviousOrgan():
    RuntimeOrgan | null {
    const previousOrgan =
      this.state.cycle
        .previousOrgan;

    return previousOrgan
      ? this.state.organs[
          previousOrgan
        ]
      : null;
  }

  getActivePacket():
    KnowledgePacket | null {
    return selectActivePacket(
      this.state,
    );
  }

  getPacket(
    packetId: string,
  ): KnowledgePacket | null {
    return (
      this.state.queue.items.find(
        (packet) =>
          packet.id === packetId,
      ) ??
      this.state.archive.find(
        (packet) =>
          packet.id === packetId,
      ) ??
      null
    );
  }

  getQueuedPackets():
    KnowledgePacket[] {
    return this.state.queue.items
      .filter(
        (packet) =>
          packet.status ===
            "created" ||
          packet.status ===
            "queued",
      )
      .map(cloneKnowledgePacket);
  }

  getProcessingPackets():
    KnowledgePacket[] {
    return this.state.queue.items
      .filter(
        (packet) =>
          packet.status ===
          "processing",
      )
      .map(cloneKnowledgePacket);
  }

  getArchive():
    KnowledgePacket[] {
    return this.state.archive.map(
      cloneKnowledgePacket,
    );
  }

  getLatestEvent():
    RuntimeEvent | null {
    return (
      this.state.events[
        this.state.events.length -
          1
      ] ?? null
    );
  }

  getLatestError():
    RuntimeError | null {
    return (
      this.state.errors[
        this.state.errors.length -
          1
      ] ?? null
    );
  }

  /* ========================================================
     Runtime Controls
  ======================================================== */

  start(): EpistemeRuntimeState {
    const timestamp = Date.now();

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        ready: true,

        running: true,

        paused: false,

        synchronizing: false,

        status: "operating",

        startedAt:
          currentState.startedAt ??
          timestamp,

        stoppedAt: null,

        lastTickAt: timestamp,
      }),
    );

    this.emitEvent(
      "runtime_started",
      "Episteme Runtime started.",
    );

    return state;
  }

  pause(): EpistemeRuntimeState {
    const state =
      this.setPaused(true);

    this.emitEvent(
      "runtime_paused",
      "Episteme Runtime paused.",
      {
        cycleId:
          state.cycle.id,
      },
    );

    return state;
  }

  resume(): EpistemeRuntimeState {
    const timestamp = Date.now();

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        running: true,

        paused: false,

        status: "operating",

        stoppedAt: null,

        lastTickAt: timestamp,

        cycle: {
          ...currentState.cycle,

          status:
            currentState.cycle
              .status === "paused"
              ? "running"
              : currentState.cycle
                  .status,

          updatedAt: timestamp,
        },
      }),
    );

    this.emitEvent(
      "runtime_resumed",
      "Episteme Runtime resumed.",
      {
        cycleId:
          state.cycle.id,
      },
    );

    return state;
  }

  stop(): EpistemeRuntimeState {
    const timestamp = Date.now();

    const state = this.setState(
      (currentState) => ({
        ...currentState,

        running: false,

        paused: false,

        synchronizing: false,

        status: "ready",

        stoppedAt: timestamp,

        lastTickAt: timestamp,

        cycle: {
          ...currentState.cycle,

          status:
            currentState.cycle
              .status ===
            "running"
              ? "idle"
              : currentState.cycle
                  .status,

          updatedAt: timestamp,
        },
      }),
    );

    this.emitEvent(
      "runtime_stopped",
      "Episteme Runtime stopped.",
      {
        cycleId:
          state.cycle.id,
      },
    );

    return state;
  }

  /* ========================================================
     Reset
  ======================================================== */

  reset(
    preserveArchive =
      this.config
        .preserveArchiveOnReset,
  ): void {
    if (this.destroyed) {
      return;
    }

    const previousArchive =
      preserveArchive
        ? this.state.archive.map(
            cloneKnowledgePacket,
          )
        : [];

    const previousCreatedAt =
      this.state.createdAt;

    const previousMetrics =
      this.state.metrics;

    const timestamp =
      Date.now();

    this.state =
      createInitialRuntimeState(
        timestamp,
      );

    this.state = {
      ...this.state,

      ready: true,

      status: "ready",

      archive:
        this.limitArchive(
          previousArchive,
        ),

      createdAt:
        previousCreatedAt,

      metrics: {
        ...this.state.metrics,

        totalCycles:
          previousMetrics.totalCycles,

        completedCycles:
          previousMetrics
            .completedCycles,

        totalPacketsCreated:
          previousMetrics
            .totalPacketsCreated,

        totalPacketsProcessed:
          previousMetrics
            .totalPacketsProcessed,

        totalPacketsArchived:
          preserveArchive
            ? previousMetrics
                .totalPacketsArchived
            : 0,

        totalErrors: 0,
      },

      events: [
        createRuntimeEvent(
          "runtime_reset",
          "Episteme Runtime reset.",
          {
            data: {
              preserveArchive,
            },
          },
        ),
      ],

      updatedAt: timestamp,
    };

    this.revision += 1;

    this.refreshSnapshot();

    this.notify();
  }

  /* ========================================================
     State Import
  ======================================================== */

  replaceState(
    state: EpistemeRuntimeState,
  ): EpistemeRuntimeState {
    const clonedState =
      cloneRuntimeState(state);

    const validationErrors =
      validateRuntimeState(
        clonedState,
      );

    if (
      validationErrors.length > 0
    ) {
      this.reportError(
        EPISTEME_ERROR_CODES
          .INVALID_RUNTIME_STATE,

        validationErrors.join(" "),
        {
          recoverable: true,
        },
      );

      return this.state;
    }

    return this.setState(
      clonedState,
    );
  }

  /* ========================================================
     Destroy
  ======================================================== */

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const timestamp =
      Date.now();

    this.state = {
      ...this.state,

      status: "destroyed",

      ready: false,

      running: false,

      paused: false,

      synchronizing: false,

      stoppedAt: timestamp,

      updatedAt: timestamp,
    };

    this.revision += 1;

    this.refreshSnapshot();

    this.notify();

    this.listeners.clear();
  }
}

/* ==========================================================
   Runtime Store Factory
========================================================== */

export function createEpistemeRuntimeStore(
  config: Partial<EpistemeStoreConfig> = {},
  initialState?: EpistemeRuntimeState,
): EpistemeRuntimeStore {
  return new EpistemeRuntimeStore(
    config,
    initialState,
  );
}

/* ==========================================================
   Default Runtime Store
========================================================== */

let defaultEpistemeRuntimeStore:
  | EpistemeRuntimeStore
  | null = null;

export function getEpistemeRuntimeStore(
  config: Partial<EpistemeStoreConfig> = {},
): EpistemeRuntimeStore {
  if (
    !defaultEpistemeRuntimeStore ||
    defaultEpistemeRuntimeStore.isDestroyed()
  ) {
    defaultEpistemeRuntimeStore =
      createEpistemeRuntimeStore(
        config,
      );
  }

  return defaultEpistemeRuntimeStore;
}

/* ==========================================================
   Reset Default Runtime Store
========================================================== */

export function resetDefaultEpistemeRuntimeStore():
  void {
  if (
    defaultEpistemeRuntimeStore
  ) {
    defaultEpistemeRuntimeStore.destroy();
  }

  defaultEpistemeRuntimeStore = null;
}