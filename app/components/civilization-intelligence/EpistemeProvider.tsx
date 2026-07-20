"use client";

/* ==========================================================
   ArcheNova
   Episteme Runtime Layer

   File:
   app/components/civilization-intelligence/
   EpistemeProvider.tsx

   Responsibilities:
   - Create Runtime Store exactly once
   - Create Engine exactly once
   - Create Scheduler exactly once
   - Supply Runtime services to React Context
   - Insert the initial Knowledge Packet
   - Start and stop the Runtime safely
   - Survive React Strict Mode effect re-execution
   - Expose stable Runtime controls

   Runtime ownership:
   Store
     ↓
   Engine
     ↓
   Scheduler
     ↓
   EpistemeProvider
     ↓
   hooks.ts
     ↓
   UI components
========================================================== */

import {
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

import {
  DEFAULT_INITIAL_PACKET_INPUT,
} from "@/lib/episteme/constants";

import {
  createEpistemeEngine,
  type EpistemeEngine,
} from "@/lib/episteme/engine";

import {
  EpistemeRuntimeContext,
  type EpistemeReactContextValue,
  type EpistemeReactControls,
  type EpistemeReactServices,
} from "@/lib/episteme/hooks";

import {
  createEpistemeScheduler,
  type EpistemeScheduler,
} from "@/lib/episteme/scheduler";

import {
  createEpistemeRuntimeStore,
  type EpistemeRuntimeStore,
} from "@/lib/episteme/store";

import type {
  EpistemeProviderConfig,
  KnowledgePacketInput,
} from "@/lib/episteme/types";

/* ==========================================================
   Public Properties
========================================================== */

export interface EpistemeProviderProps {
  children: ReactNode;

  /**
   * Runtime Store / Engine / Scheduler configuration.
   *
   * Configuration is used when the Provider first creates
   * its Runtime services.
   */
  config?: EpistemeProviderConfig;

  /**
   * Automatically start the Scheduler after mounting.
   */
  autoStart?: boolean;

  /**
   * Insert an initial Knowledge Packet when the queue is empty.
   */
  ingestInitialPacket?: boolean;

  /**
   * Optional custom initial Knowledge Packet.
   */
  initialPacket?: KnowledgePacketInput;

  /**
   * Stop Scheduler activity when the Provider unmounts.
   */
  stopOnUnmount?: boolean;

  /**
   * Permanently destroy Runtime services after unmount.
   *
   * Strict Mode protection delays destruction until React has
   * had an opportunity to execute its development remount.
   */
  destroyOnUnmount?: boolean;

  /**
   * Preserve Memory archive when reset() is called.
   */
  preserveArchiveOnReset?: boolean;

  /**
   * Optional callback for Provider lifecycle failures.
   */
  onRuntimeError?: (
    error: unknown,
  ) => void;
}

/* ==========================================================
   Runtime Service Bundle
========================================================== */

interface RuntimeServiceBundle {
  store: EpistemeRuntimeStore;

  engine: EpistemeEngine;

  scheduler: EpistemeScheduler;
}

/* ==========================================================
   Create Runtime Services
========================================================== */

function createRuntimeServices(
  config: EpistemeProviderConfig,
): RuntimeServiceBundle {
  const store =
    createEpistemeRuntimeStore(
      config.store,
    );

  const engine =
    createEpistemeEngine(
      store,
      config.engine,
    );

  /*
   * Scheduler autoStart is disabled here deliberately.
   *
   * The Provider controls startup only after:
   * 1. React has mounted
   * 2. the initial packet has been inserted
   * 3. lifecycle handlers are ready
   */
  const scheduler =
    createEpistemeScheduler(
      store,
      engine,
      {
        ...config.scheduler,

        autoStart: false,
      },
    );

  return {
    store,
    engine,
    scheduler,
  };
}

/* ==========================================================
   Provider
========================================================== */

export default function EpistemeProvider({
  children,

  config = {},

  autoStart = true,

  ingestInitialPacket = true,

initialPacket =
  DEFAULT_INITIAL_PACKET_INPUT,

  stopOnUnmount = true,

  destroyOnUnmount = true,

  preserveArchiveOnReset,

  onRuntimeError,
}: EpistemeProviderProps) {
  /*
   * Services are created during the first render and remain
   * stable for the entire lifetime of this Provider instance.
   */
  const servicesRef =
    useRef<RuntimeServiceBundle | null>(
      null,
    );

  if (!servicesRef.current) {
    servicesRef.current =
      createRuntimeServices(config);
  }

  const {
    store,
    engine,
    scheduler,
  } = servicesRef.current;

  /*
   * Lifecycle refs prevent duplicate initialization under
   * React Strict Mode.
   */
  const mountedRef =
    useRef(false);

  const initialPacketInsertedRef =
    useRef(false);

  const startupRequestedRef =
    useRef(false);

  const destructionTokenRef =
    useRef<symbol | null>(null);

  /* ========================================================
     Stable Runtime Services
  ======================================================== */

  const services =
    useMemo<EpistemeReactServices>(
      () => ({
        store,
        engine,
        scheduler,
      }),
      [
        store,
        engine,
        scheduler,
      ],
    );

  /* ========================================================
     Stable Runtime Controls
  ======================================================== */

  const controls =
    useMemo<EpistemeReactControls>(
      () => ({
        start: async () => {
          await scheduler.start();
        },

        pause: () => {
          scheduler.pause();
        },

        resume: async () => {
          await scheduler.resume();
        },

        stop: () => {
          scheduler.stop();
        },

        reset: (
          preserveArchive,
        ) => {
          scheduler.reset(
            preserveArchive ??
              preserveArchiveOnReset,
          );
        },

        tick: async () => {
          return scheduler.tick();
        },

        processNextStep:
          async () => {
            return scheduler
              .processNextStep();
          },

        processNextCycle:
          async () => {
            await scheduler
              .processNextCycle();
          },

        ingest: (
          input,
        ) => {
          return store.ingest(
            input,
          );
        },

        setMode: (
          mode,
        ) => {
          scheduler.setMode(
            mode,
          );
        },

        clearQueue: () => {
          store.clearQueue();
        },

        clearArchive: () => {
          store.clearArchive();
        },

        clearErrors: () => {
          store.clearErrors();
        },
      }),
      [
        preserveArchiveOnReset,
        scheduler,
        store,
      ],
    );

  /* ========================================================
     Context Value
  ======================================================== */

  const contextValue =
    useMemo<EpistemeReactContextValue>(
      () => ({
        services,
        controls,
      }),
      [
        services,
        controls,
      ],
    );

  /* ========================================================
     Main Lifecycle
  ======================================================== */

  useEffect(() => {
    mountedRef.current = true;

    /*
     * Cancel any delayed destruction created by a preceding
     * Strict Mode cleanup.
     */
    destructionTokenRef.current =
      null;

    const initialize =
      async (): Promise<void> => {
        try {
          /*
           * Do not insert duplicate packets.
           *
           * The ref blocks Strict Mode duplication while the
           * queue check also protects remounts with a retained
           * Store instance.
           */
          if (
            ingestInitialPacket &&
            !initialPacketInsertedRef.current &&
            store.getState().queue.items
              .length === 0
          ) {
            initialPacketInsertedRef.current =
              true;

            store.ingest(
              initialPacket,
            );
          }

          if (
            autoStart &&
            !startupRequestedRef.current
          ) {
            startupRequestedRef.current =
              true;

            await scheduler.start();
          }
        } catch (error) {
          startupRequestedRef.current =
            false;

          console.error(
            "[EpistemeProvider] Runtime initialization failed:",
            error,
          );

          onRuntimeError?.(
            error,
          );
        }
      };

    void initialize();

    return () => {
      mountedRef.current = false;

      if (stopOnUnmount) {
        scheduler.stop();

        /*
         * Allow the development Strict Mode setup to restart
         * the Scheduler after the artificial cleanup.
         */
        startupRequestedRef.current =
          false;
      }

      if (!destroyOnUnmount) {
        return;
      }

      /*
       * React Strict Mode runs:
       *
       * setup → cleanup → setup
       *
       * A deferred destruction prevents the first artificial
       * cleanup from permanently destroying the services.
       */
      const destructionToken =
        Symbol(
          "episteme-destruction",
        );

      destructionTokenRef.current =
        destructionToken;

      queueMicrotask(() => {
        const shouldDestroy =
          !mountedRef.current &&
          destructionTokenRef.current ===
            destructionToken;

        if (!shouldDestroy) {
          return;
        }

        destructionTokenRef.current =
          null;

        try {
          scheduler.destroy();

          /*
           * Scheduler.destroy() already destroys the Engine in
           * the current implementation. The following guards
           * keep cleanup safe if that implementation changes.
           */
          if (!engine.isDestroyed()) {
            engine.destroy();
          }

          if (!store.isDestroyed()) {
            store.destroy();
          }
        } catch (error) {
          console.error(
            "[EpistemeProvider] Runtime destruction failed:",
            error,
          );

          onRuntimeError?.(
            error,
          );
        }
      });
    };
  }, [
    autoStart,
    destroyOnUnmount,
    engine,
    ingestInitialPacket,
    initialPacket,
    onRuntimeError,
    scheduler,
    stopOnUnmount,
    store,
  ]);

  /* ========================================================
     Browser Runtime Control Events
  ======================================================== */

  useEffect(() => {
    const handleStart =
      (): void => {
        void controls
          .start()
          .catch((error) => {
            console.error(
              "[EpistemeProvider] Start event failed:",
              error,
            );

            onRuntimeError?.(
              error,
            );
          });
      };

    const handlePause =
      (): void => {
        controls.pause();
      };

    const handleResume =
      (): void => {
        void controls
          .resume()
          .catch((error) => {
            console.error(
              "[EpistemeProvider] Resume event failed:",
              error,
            );

            onRuntimeError?.(
              error,
            );
          });
      };

    const handleStop =
      (): void => {
        controls.stop();
      };

    const handleReset =
      (): void => {
        controls.reset();
      };

    const handleTick =
      (): void => {
        void controls
          .tick()
          .catch((error) => {
            console.error(
              "[EpistemeProvider] Tick event failed:",
              error,
            );

            onRuntimeError?.(
              error,
            );
          });
      };

    window.addEventListener(
      "episteme:start",
      handleStart,
    );

    window.addEventListener(
      "episteme:pause",
      handlePause,
    );

    window.addEventListener(
      "episteme:resume",
      handleResume,
    );

    window.addEventListener(
      "episteme:stop",
      handleStop,
    );

    window.addEventListener(
      "episteme:reset",
      handleReset,
    );

    window.addEventListener(
      "episteme:tick",
      handleTick,
    );

    return () => {
      window.removeEventListener(
        "episteme:start",
        handleStart,
      );

      window.removeEventListener(
        "episteme:pause",
        handlePause,
      );

      window.removeEventListener(
        "episteme:resume",
        handleResume,
      );

      window.removeEventListener(
        "episteme:stop",
        handleStop,
      );

      window.removeEventListener(
        "episteme:reset",
        handleReset,
      );

      window.removeEventListener(
        "episteme:tick",
        handleTick,
      );
    };
  }, [
    controls,
    onRuntimeError,
  ]);

  /* ========================================================
     Render
  ======================================================== */

  return (
    <EpistemeRuntimeContext.Provider
      value={contextValue}
    >
      {children}
    </EpistemeRuntimeContext.Provider>
  );
}