"use client";

/* ==========================================================
   ArcheNova
   Phase 5
   Episteme Runtime Panel

   File:
   app/components/civilization-intelligence/
   EpistemeRuntimePanel.tsx

   Responsibilities:
   - Display current Episteme OS state
   - Show active and next cognitive Organs
   - Visualize Knowledge Packet telemetry
   - Show system health and synchronization
   - Show cycle progress, queue state, and latest event
   - Provide optional Runtime controls
========================================================== */

import {
  useMemo,
  type CSSProperties,
} from "react";

import {
  useActiveKnowledgePacket,
  useCivilizationCycle,
  useEpistemeControls,
  useEpistemeEvents,
  useEpistemeMetrics,
  useEpistemeOrgans,
  useEpistemeQueueSummary,
  useEpistemeReady,
  useEpistemeRuntime,
  useEpistemeSchedulerState,
  useEpistemeStatus,
} from "@/lib/episteme/hooks";

import type {
  KnowledgePacket,
  OrganId,
} from "@/lib/episteme/types";

/* ==========================================================
   Public Properties
========================================================== */

export interface EpistemeRuntimePanelProps {
  className?: string;

  showControls?: boolean;

  showLatestEvent?: boolean;

  showQueue?: boolean;

  compact?: boolean;
}

/* ==========================================================
   Organ Presentation
========================================================== */

interface OrganPresentation {
  numeral: string;

  title: string;

  operation: string;
}

const ORGAN_PRESENTATION: Record<
  OrganId,
  OrganPresentation
> = {
  observation: {
    numeral: "Ⅰ",
    title: "Observation",
    operation: "Receiving",
  },

  understanding: {
    numeral: "Ⅱ",
    title: "Understanding",
    operation: "Integrating",
  },

  reasoning: {
    numeral: "Ⅲ",
    title: "Reasoning",
    operation: "Evaluating",
  },

  design: {
    numeral: "Ⅳ",
    title: "Design",
    operation: "Architecting",
  },

  realization: {
    numeral: "Ⅴ",
    title: "Realization",
    operation: "Executing",
  },

  memory: {
    numeral: "Ⅵ",
    title: "Memory",
    operation: "Encoding",
  },
};

/* ==========================================================
   Runtime CSS Properties
========================================================== */

type RuntimePanelStyle =
  CSSProperties &
  Record<
    `--runtime-${string}`,
    string | number
  >;

/* ==========================================================
   Number Utilities
========================================================== */

function clampPercentage(
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

function formatPercentage(
  value: number,
): string {
  return `${Math.round(
    clampPercentage(value),
  )}%`;
}

function formatCount(
  value: number,
): string {
  const normalizedValue =
    Number.isFinite(value)
      ? Math.max(
          0,
          Math.floor(value),
        )
      : 0;

  return String(
    normalizedValue,
  ).padStart(2, "0");
}

function formatDuration(
  milliseconds: number,
): string {
  if (
    !Number.isFinite(milliseconds) ||
    milliseconds <= 0
  ) {
    return "00:00";
  }

  const totalSeconds =
    Math.floor(
      milliseconds / 1000,
    );

  const minutes =
    Math.floor(
      totalSeconds / 60,
    );

  const seconds =
    totalSeconds % 60;

  return [
    String(minutes).padStart(
      2,
      "0",
    ),

    String(seconds).padStart(
      2,
      "0",
    ),
  ].join(":");
}

/* ==========================================================
   Packet Helpers
========================================================== */

function getPacketTitle(
  packet:
    KnowledgePacket | null,
): string {
  return (
    packet?.title ??
    "Awaiting civilizational signal"
  );
}

function getPacketStateLabel(
  packet:
    KnowledgePacket | null,
): string {
  if (!packet) {
    return "Awaiting Input";
  }

  switch (packet.status) {
    case "created":
      return "Created";

    case "queued":
      return "Queued";

    case "processing":
      return "Processing";

    case "completed":
      return "Completed";

    case "archived":
      return "Archived";

    case "failed":
      return "Failed";
  }
}

function getPriorityLabel(
  packet:
    KnowledgePacket | null,
): string {
  if (!packet) {
    return "None";
  }

  switch (packet.priority) {
    case "critical":
      return "Critical";

    case "high":
      return "High";

    case "normal":
      return "Normal";

    case "low":
      return "Low";
  }
}

function getOrganTitle(
  organId:
    OrganId | null | undefined,
): string {
  if (!organId) {
    return "None";
  }

  return ORGAN_PRESENTATION[
    organId
  ].title;
}

/* ==========================================================
   Safe Runtime Action
========================================================== */

function runRuntimeAction(
  action:
    () => Promise<unknown>,
): void {
  void action().catch(
    (error: unknown) => {
      console.error(
        "[EpistemeRuntimePanel] Runtime action failed:",
        error,
      );
    },
  );
}

/* ==========================================================
   Metric Bar
========================================================== */

interface RuntimeMetricProps {
  label: string;

  value: number;

  detail?: string;

  className?: string;
}

function RuntimeMetric({
  label,

  value,

  detail,

  className = "",
}: RuntimeMetricProps) {
  const normalizedValue =
    clampPercentage(value);

  const metricStyle:
    RuntimePanelStyle = {
    "--runtime-metric-value":
      `${normalizedValue}%`,
  };

  return (
    <div
      className={[
        "episteme-runtime-metric",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={metricStyle}
    >
      <header>
        <span>
          {label}
        </span>

        <strong>
          {formatPercentage(
            normalizedValue,
          )}
        </strong>
      </header>

      <div
        className="episteme-runtime-meter"
        aria-hidden="true"
      >
        <span />
      </div>

      {detail ? (
        <small>
          {detail}
        </small>
      ) : null}
    </div>
  );
}

/* ==========================================================
   Component
========================================================== */

export default function EpistemeRuntimePanel({
  className = "",

  showControls = false,

  showLatestEvent = true,

  showQueue = true,

  compact = false,
}: EpistemeRuntimePanelProps) {
  /* ========================================================
     Runtime Bindings
  ======================================================== */

  const runtime =
    useEpistemeRuntime();

  const schedulerState =
    useEpistemeSchedulerState();

  const ready =
    useEpistemeReady();

  const status =
    useEpistemeStatus();

  const cycle =
    useCivilizationCycle();

  const metrics =
    useEpistemeMetrics();

  const organs =
    useEpistemeOrgans();

  const packet =
    useActiveKnowledgePacket();

  const queue =
    useEpistemeQueueSummary();

  const events =
    useEpistemeEvents(8);

  const controls =
    useEpistemeControls();

  /* ========================================================
     Runtime Conditions
  ======================================================== */

  const isRunning =
    schedulerState.running &&
    !schedulerState.paused;

  const isPaused =
    schedulerState.paused ||
    runtime.paused;

  const isProcessing =
    schedulerState.processing;

  const isWaiting =
    schedulerState.waiting ||
    runtime.status ===
      "waiting";

  const isSynchronizing =
    runtime.synchronizing ||
    cycle.isSynchronizing;

  const isComplete =
    cycle.isComplete;

  const hasError =
    runtime.errors.length > 0 ||
    schedulerState.status ===
      "error";

  const isDestroyed =
    schedulerState.destroyed ||
    runtime.status ===
      "destroyed";

  /* ========================================================
     Active Organ Data
  ======================================================== */

  const activeOrgan =
    ORGAN_PRESENTATION[
      cycle.activeOrganId
    ];

  const nextOrgan =
    ORGAN_PRESENTATION[
      cycle.nextOrganId
    ];

  const previousOrgan =
    cycle.previousOrganId
      ? ORGAN_PRESENTATION[
          cycle.previousOrganId
        ]
      : null;

  const runtimeOrgan =
    organs.organs[
      cycle.activeOrganId
    ];

  /* ========================================================
     Packet Telemetry
  ======================================================== */

  const packetConfidence =
    clampPercentage(
      packet?.metadata.confidence ??
        metrics.averageConfidence,
    );

  const packetImportance =
    clampPercentage(
      packet?.metadata.importance ??
        0,
    );

  const packetRelevance =
    clampPercentage(
      packet?.metadata.relevance ??
        0,
    );

  const packetTitle =
    getPacketTitle(packet);

  const packetStatus =
    getPacketStateLabel(packet);

  const packetPriority =
    getPriorityLabel(packet);

  const latestEvent =
    events.latestEvent;

  const latestError =
    events.latestError;

  /* ========================================================
     Runtime Style
  ======================================================== */

  const runtimeStyle =
    useMemo<
      RuntimePanelStyle
    >(
      () => ({
        "--runtime-cycle-progress":
          `${clampPercentage(
            cycle.progress,
          )}%`,

        "--runtime-health":
          `${clampPercentage(
            metrics.health,
          )}%`,

        "--runtime-synchronization":
          `${clampPercentage(
            metrics.synchronization,
          )}%`,

        "--runtime-confidence":
          `${packetConfidence}%`,

        "--runtime-importance":
          `${packetImportance}%`,

        "--runtime-relevance":
          `${packetRelevance}%`,

        "--runtime-organ-progress":
          `${clampPercentage(
            runtimeOrgan.progress,
          )}%`,

        "--runtime-queue-load":
          `${clampPercentage(
            metrics.queueLoad,
          )}%`,
      }),
      [
        cycle.progress,
        metrics.health,
        metrics.queueLoad,
        metrics.synchronization,
        packetConfidence,
        packetImportance,
        packetRelevance,
        runtimeOrgan.progress,
      ],
    );

  /* ========================================================
     Runtime Classes
  ======================================================== */

  const runtimeClassName =
    useMemo(
      () =>
        [
          "episteme-runtime-panel",

          `is-status-${status.status}`,

          `is-scheduler-${schedulerState.status}`,

          `is-organ-${cycle.activeOrganId}`,

          packet
            ? "has-packet"
            : "has-no-packet",

          isProcessing
            ? "is-processing"
            : null,

          isWaiting
            ? "is-waiting"
            : null,

          isSynchronizing
            ? "is-synchronizing"
            : null,

          isComplete
            ? "is-cycle-complete"
            : null,

          isPaused
            ? "is-paused"
            : null,

          compact
            ? "is-compact"
            : null,

          hasError
            ? "has-error"
            : null,

          isDestroyed
            ? "is-destroyed"
            : null,

          className,
        ]
          .filter(Boolean)
          .join(" "),
      [
        className,
        compact,
        cycle.activeOrganId,
        hasError,
        isComplete,
        isDestroyed,
        isPaused,
        isProcessing,
        isSynchronizing,
        isWaiting,
        packet,
        schedulerState.status,
        status.status,
      ],
    );

  /* ========================================================
     Render
  ======================================================== */

  return (
    <aside
      className={
        runtimeClassName
      }
      style={
        runtimeStyle
      }
      data-runtime-status={
        status.status
      }
      data-scheduler-status={
        schedulerState.status
      }
      data-runtime-organ={
        cycle.activeOrganId
      }
      data-runtime-packet={
        packet?.id ?? "none"
      }
      data-runtime-ready={
        String(ready)
      }
      data-runtime-running={
        String(isRunning)
      }
      data-runtime-paused={
        String(isPaused)
      }
      data-runtime-processing={
        String(isProcessing)
      }
      data-runtime-waiting={
        String(isWaiting)
      }
      data-runtime-synchronizing={
        String(
          isSynchronizing,
        )
      }
      data-runtime-complete={
        String(isComplete)
      }
      data-runtime-error={
        String(hasError)
      }
      aria-label="Episteme Operating System Runtime"
      aria-busy={
        isProcessing ||
        isSynchronizing
      }
    >
      {/* ===================================================
          Runtime Header
      =================================================== */}

      <header className="episteme-runtime-header">
        <div className="episteme-runtime-identity">
          <span className="episteme-runtime-eyebrow">
            EPISTEME OS
          </span>

          <strong>
            Civilization Intelligence
          </strong>

          <small>
            Live Cognitive Runtime
          </small>
        </div>

        <div
          className={[
            "episteme-runtime-status",

            status.isOperating
              ? "is-online"
              : null,

            status.paused
              ? "is-paused"
              : null,

            status.hasError
              ? "is-error"
              : null,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <i aria-hidden="true" />

          <span>
            {status.label}
          </span>
        </div>
      </header>

      {/* ===================================================
          Active Organ
      =================================================== */}

      <section className="episteme-runtime-organ">
        <header>
          <span>
            ACTIVE COGNITIVE ORGAN
          </span>

          <small>
            {status.activeOperation}
          </small>
        </header>

        <div className="episteme-runtime-organ-main">
          <div className="episteme-runtime-organ-number">
            {activeOrgan.numeral}
          </div>

          <div className="episteme-runtime-organ-copy">
            <strong>
              {activeOrgan.title}
            </strong>

            <p>
              {
                runtimeOrgan
                  .definition
                  .description
              }
            </p>
          </div>
        </div>

        <div className="episteme-runtime-organ-route">
          <span>
            <small>
              Previous
            </small>

            <strong>
              {
                previousOrgan?.title ??
                "Memory"
              }
            </strong>
          </span>

          <i aria-hidden="true">
            →
          </i>

          <span>
            <small>
              Current
            </small>

            <strong>
              {activeOrgan.title}
            </strong>
          </span>

          <i aria-hidden="true">
            →
          </i>

          <span>
            <small>
              Next
            </small>

            <strong>
              {nextOrgan.title}
            </strong>
          </span>
        </div>
      </section>

      {/* ===================================================
          Knowledge Packet
      =================================================== */}

      <section className="episteme-runtime-packet">
        <header>
          <span>
            KNOWLEDGE PACKET
          </span>

          <div>
            <i
              className={
                `priority-${
                  packet?.priority ??
                  "none"
                }`
              }
              aria-hidden="true"
            />

            <small>
              {packetPriority}
            </small>
          </div>
        </header>

        <strong className="episteme-runtime-packet-title">
          {packetTitle}
        </strong>

        <div className="episteme-runtime-packet-state">
          <span>
            {packetStatus}
          </span>

          <small>
            {
              packet?.type ??
              "No packet"
            }
          </small>
        </div>

        {packet?.summary ? (
          <p className="episteme-runtime-packet-summary">
            {packet.summary}
          </p>
        ) : null}

        <dl className="episteme-runtime-packet-meta">
          <div>
            <dt>
              From
            </dt>

            <dd>
              {getOrganTitle(
                packet?.from ??
                  cycle
                    .previousOrganId ??
                  "memory",
              )}
            </dd>
          </div>

          <div>
            <dt>
              To
            </dt>

            <dd>
              {getOrganTitle(
                packet?.to ??
                  cycle.nextOrganId,
              )}
            </dd>
          </div>

          <div>
            <dt>
              Status
            </dt>

            <dd>
              {packetStatus}
            </dd>
          </div>
        </dl>

        <div className="episteme-runtime-packet-metrics">
          <RuntimeMetric
            label="Confidence"
            value={
              packetConfidence
            }
          />

          <RuntimeMetric
            label="Importance"
            value={
              packetImportance
            }
          />

          <RuntimeMetric
            label="Relevance"
            value={
              packetRelevance
            }
          />
        </div>
      </section>

      {/* ===================================================
          Cycle State
      =================================================== */}

      <section className="episteme-runtime-cycle">
        <header>
          <span>
            CIVILIZATION CYCLE
          </span>

          <strong>
            #
            {String(
              cycle.number,
            ).padStart(
              3,
              "0",
            )}
          </strong>
        </header>

        <div className="episteme-runtime-cycle-progress">
          <div>
            <span>
              Cycle Progress
            </span>

            <strong>
              {formatPercentage(
                cycle.progress,
              )}
            </strong>
          </div>

          <div
            className="episteme-runtime-cycle-meter"
            aria-hidden="true"
          >
            <span />
          </div>
        </div>

        <div className="episteme-runtime-cycle-grid">
          <div>
            <small>
              Completed Organs
            </small>

            <strong>
              {formatCount(
                cycle
                  .completedOrganIds
                  .length,
              )}
              /06
            </strong>
          </div>

          <div>
            <small>
              Elapsed
            </small>

            <strong>
              {formatDuration(
                cycle.elapsedMs,
              )}
            </strong>
          </div>

          <div>
            <small>
              Synchronization
            </small>

            <strong>
              {isSynchronizing
                ? "Active"
                : "Stable"}
            </strong>
          </div>
        </div>
      </section>

      {/* ===================================================
          System Telemetry
      =================================================== */}

      <section className="episteme-runtime-system">
        <header>
          <span>
            SYSTEM TELEMETRY
          </span>
        </header>

        <RuntimeMetric
          label="System Health"
          value={
            metrics.health
          }
          detail={
            metrics.isHealthy
              ? "Nominal"
              : "Degraded"
          }
        />

        <RuntimeMetric
          label="Synchronization"
          value={
            metrics.synchronization
          }
          detail={
            metrics.isSynchronized
              ? "Coherent"
              : "Converging"
          }
        />

        <RuntimeMetric
          label="Cognitive Activity"
          value={
            metrics.activity
          }
          detail={`${formatCount(
            runtimeOrgan
              .metrics
              .receivedPackets,
          )} received · ${formatCount(
            runtimeOrgan
              .metrics
              .emittedPackets,
          )} emitted · ${formatCount(
            runtimeOrgan
              .metrics
              .processedPackets,
          )} processed`}
        />
      </section>

      {/* ===================================================
          Queue
      =================================================== */}

      {showQueue ? (
        <section className="episteme-runtime-queue">
          <header>
            <span>
              KNOWLEDGE QUEUE
            </span>

            <strong>
              {formatCount(
                queue.total,
              )}
            </strong>
          </header>

          <div className="episteme-runtime-queue-grid">
            <div>
              <small>
                Created
              </small>

              <strong>
                {formatCount(
                  queue.created,
                )}
              </strong>
            </div>

            <div>
              <small>
                Queued
              </small>

              <strong>
                {formatCount(
                  queue.queued,
                )}
              </strong>
            </div>

            <div>
              <small>
                Processing
              </small>

              <strong>
                {formatCount(
                  queue.processing,
                )}
              </strong>
            </div>

            <div>
              <small>
                Critical
              </small>

              <strong>
                {formatCount(
                  queue.critical,
                )}
              </strong>
            </div>
          </div>
        </section>
      ) : null}

      {/* ===================================================
          Latest Event
      =================================================== */}

      {showLatestEvent ? (
        <section className="episteme-runtime-event">
          <header>
            <span>
              LATEST SYSTEM EVENT
            </span>
          </header>

          {latestError ? (
            <div className="episteme-runtime-event-message is-error">
              <i aria-hidden="true" />

              <div>
                <strong>
                  System Exception
                </strong>

                <p>
                  {
                    latestError
                      .message
                  }
                </p>
              </div>
            </div>
          ) : latestEvent ? (
            <div className="episteme-runtime-event-message">
              <i aria-hidden="true" />

              <div>
                <strong>
                  {latestEvent.type
                    .replaceAll(
                      "_",
                      " ",
                    )}
                </strong>

                <p>
                  {
                    latestEvent
                      .message
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="episteme-runtime-event-message is-empty">
              <i aria-hidden="true" />

              <div>
                <strong>
                  Awaiting Event
                </strong>

                <p>
                  Episteme has not emitted a Runtime event yet.
                </p>
              </div>
            </div>
          )}
        </section>
      ) : null}

      {/* ===================================================
          Runtime Controls
      =================================================== */}

      {showControls ? (
        <footer className="episteme-runtime-controls">
          {!isRunning &&
          !isPaused ? (
            <button
              type="button"
              onClick={() => {
                runRuntimeAction(
                  controls.start,
                );
              }}
              disabled={
                isDestroyed
              }
            >
              Start
            </button>
          ) : null}

          {isRunning ? (
            <button
              type="button"
              onClick={
                controls.pause
              }
              disabled={
                isProcessing ||
                isDestroyed
              }
            >
              Pause
            </button>
          ) : null}

          {isPaused ? (
            <button
              type="button"
              onClick={() => {
                runRuntimeAction(
                  controls.resume,
                );
              }}
              disabled={
                isDestroyed
              }
            >
              Resume
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              runRuntimeAction(
                controls
                  .processNextStep,
              );
            }}
            disabled={
              isProcessing ||
              isSynchronizing ||
              isDestroyed
            }
          >
            Process Next
          </button>

          <button
            type="button"
            onClick={() => {
              runRuntimeAction(
                controls
                  .processNextCycle,
              );
            }}
            disabled={
              isProcessing ||
              isSynchronizing ||
              isDestroyed
            }
          >
            Complete Cycle
          </button>

          <button
            type="button"
            onClick={() => {
              controls.reset();
            }}
            disabled={
              isProcessing ||
              isDestroyed
            }
          >
            Reset
          </button>

          {hasError ? (
            <button
              type="button"
              onClick={
                controls.clearErrors
              }
              disabled={
                isDestroyed
              }
            >
              Clear Errors
            </button>
          ) : null}
        </footer>
      ) : null}

      {/* ===================================================
          Accessibility Status
      =================================================== */}

      <div
        className="episteme-runtime-live-region"
        role="status"
        aria-live={
          hasError
            ? "assertive"
            : "polite"
        }
        aria-atomic="true"
      >
        <p>
          Episteme is
          {" "}
          {status.label}.
        </p>

        <p>
          The active cognitive Organ is
          {" "}
          {activeOrgan.title}.
        </p>

        <p>
          The current operation is
          {" "}
          {status.activeOperation}.
        </p>

        <p>
          Cycle progress is
          {" "}
          {Math.round(
            cycle.progress,
          )}
          percent.
        </p>

        <p>
          System health is
          {" "}
          {Math.round(
            metrics.health,
          )}
          percent.
        </p>

        {hasError ? (
          <p>
            A Runtime error is present.
          </p>
        ) : null}
      </div>
    </aside>
  );
}