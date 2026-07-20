"use client";

/* ==========================================================
   Phase 5 Part 4
   Episteme Knowledge Packet Flow

   File:
   app/components/civilization-intelligence/
   EpistemePacketFlow.tsx

   Responsibilities:
   - Visualize the active Knowledge Packet
   - Connect the current Organ to the next Organ
   - Synchronize packet motion with Episteme OS
   - Expose packet confidence, priority, and route
   - Preserve the existing DNA and card dimensions
========================================================== */

import {
  useMemo,
  type CSSProperties,
} from "react";

import {
  useActiveKnowledgePacket,
  useCivilizationCycle,
  useEpistemeMetrics,
  useEpistemeOrgans,
  useEpistemeStatus,
  useEpistemeRuntime,
} from "@/lib/episteme/hooks";

import type {
  KnowledgePacket,
  KnowledgePacketPriority,
  OrganId,
} from "@/lib/episteme/types";

/* ==========================================================
   Public Properties
========================================================== */

export interface EpistemePacketFlowProps {
  /**
   * Optional additional CSS class.
   */
  className?: string;

  /**
   * Show packet metadata beside the moving packet.
   */
  showPacketLabel?: boolean;

  /**
   * Show the six Organ anchor points.
   */
  showOrganAnchors?: boolean;

  /**
   * Show the circular return route from Memory to Observation.
   */
  showReturnPath?: boolean;
}

/* ==========================================================
   Organ Descriptor
========================================================== */

interface OrganDescriptor {
  id: OrganId;

  index: number;

  numeral: string;

  title: string;

  operation: string;
}

/* ==========================================================
   Organ Order
========================================================== */

const ORGAN_FLOW: readonly OrganDescriptor[] = [
  {
    id: "observation",
    index: 0,
    numeral: "Ⅰ",
    title: "Observation",
    operation: "Receiving",
  },
  {
    id: "understanding",
    index: 1,
    numeral: "Ⅱ",
    title: "Understanding",
    operation: "Integrating",
  },
  {
    id: "reasoning",
    index: 2,
    numeral: "Ⅲ",
    title: "Reasoning",
    operation: "Evaluating",
  },
  {
    id: "design",
    index: 3,
    numeral: "Ⅳ",
    title: "Design",
    operation: "Architecting",
  },
  {
    id: "realization",
    index: 4,
    numeral: "Ⅴ",
    title: "Realization",
    operation: "Executing",
  },
  {
    id: "memory",
    index: 5,
    numeral: "Ⅵ",
    title: "Memory",
    operation: "Encoding",
  },
] as const;

/* ==========================================================
   Organ Lookup
========================================================== */

const ORGAN_BY_ID: Record<
  OrganId,
  OrganDescriptor
> = ORGAN_FLOW.reduce(
  (
    result,
    organ,
  ) => {
    result[organ.id] = organ;

    return result;
  },
  {} as Record<
    OrganId,
    OrganDescriptor
  >,
);

/* ==========================================================
   Utility: Clamp Percentage
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

/* ==========================================================
   Utility: Priority Weight
========================================================== */

function getPriorityWeight(
  priority:
    | KnowledgePacketPriority
    | undefined,
): number {
  switch (priority) {
    case "critical":
      return 1;

    case "high":
      return 0.82;

    case "normal":
      return 0.62;

    case "low":
      return 0.42;

    default:
      return 0.5;
  }
}

/* ==========================================================
   Utility: Priority Label
========================================================== */

function getPriorityLabel(
  priority:
    | KnowledgePacketPriority
    | undefined,
): string {
  switch (priority) {
    case "critical":
      return "Critical";

    case "high":
      return "High";

    case "normal":
      return "Normal";

    case "low":
      return "Low";

    default:
      return "None";
  }
}

/* ==========================================================
   Utility: Packet State Label
========================================================== */

function getPacketStateLabel(
  packet: KnowledgePacket | null,
  synchronizing: boolean,
): string {
  if (synchronizing) {
    return "Encoding into Memory";
  }

  if (!packet) {
    return "Awaiting Knowledge Packet";
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

    default:
      return "Unknown";
  }
}

/* ==========================================================
   Utility: Route Progress
========================================================== */

function getRouteProgress(
  activeOrgan: OrganId,
  cycleProgress: number,
): number {
  const activeIndex =
    ORGAN_BY_ID[activeOrgan].index;

  const baseProgress =
    activeIndex /
    ORGAN_FLOW.length;

  const localProgress =
    clampPercentage(
      cycleProgress,
    ) /
    100 /
    ORGAN_FLOW.length;

  return Math.min(
    1,
    baseProgress + localProgress,
  );
}

/* ==========================================================
   Empty Packet
========================================================== */

const EMPTY_PACKET_TITLE =
  "Awaiting civilizational signal";

/* ==========================================================
   Component
========================================================== */

export default function EpistemePacketFlow({
  className = "",

  showPacketLabel = false,

  showOrganAnchors = false,

  showReturnPath = true,
}: EpistemePacketFlowProps) {
  const runtime =
    useEpistemeRuntime();

  const packet =
    useActiveKnowledgePacket();

  const cycle =
    useCivilizationCycle();

  const status =
    useEpistemeStatus();

  const metrics =
    useEpistemeMetrics();

  const organs =
    useEpistemeOrgans();

  const activeOrgan =
    ORGAN_BY_ID[
      cycle.activeOrganId
    ];

  const nextOrgan =
    ORGAN_BY_ID[
      cycle.nextOrganId
    ];

  const previousOrgan =
    cycle.previousOrganId
      ? ORGAN_BY_ID[
          cycle.previousOrganId
        ]
      : null;

  const priorityWeight =
    getPriorityWeight(
      packet?.priority,
    );

  const confidence =
    clampPercentage(
      packet?.metadata
        .confidence ??
        metrics.averageConfidence,
    );

  const importance =
    clampPercentage(
      packet?.metadata
        .importance ?? 0,
    );

  const relevance =
    clampPercentage(
      packet?.metadata
        .relevance ?? 0,
    );

  const routeProgress =
    getRouteProgress(
      cycle.activeOrganId,
      cycle.progress,
    );

  const packetStateLabel =
    getPacketStateLabel(
      packet,
      cycle.isSynchronizing,
    );

  const packetTitle =
    packet?.title ??
    EMPTY_PACKET_TITLE;

  const packetRoute =
    `${activeOrgan.title} → ${nextOrgan.title}`;

  const completedOrganSet =
    useMemo(
      () =>
        new Set<OrganId>(
          cycle.completedOrganIds,
        ),
      [cycle.completedOrganIds],
    );

  /* ========================================================
     Root CSS Variables
  ======================================================== */

  const rootStyle =
    useMemo(
      () =>
        ({
          "--packet-active-index":
            activeOrgan.index,

          "--packet-next-index":
            nextOrgan.index,

          "--packet-previous-index":
            previousOrgan?.index ?? -1,

          "--packet-cycle-progress":
            clampPercentage(
              cycle.progress,
            ),

          "--packet-route-progress":
            routeProgress,

          "--packet-confidence":
            confidence,

          "--packet-importance":
            importance,

          "--packet-relevance":
            relevance,

          "--packet-priority":
            priorityWeight,

          "--packet-system-health":
            clampPercentage(
              metrics.health,
            ),

          "--packet-synchronization":
            clampPercentage(
              metrics.synchronization,
            ),
        }) as CSSProperties,
      [
        activeOrgan.index,
        nextOrgan.index,
        previousOrgan?.index,
        cycle.progress,
        routeProgress,
        confidence,
        importance,
        relevance,
        priorityWeight,
        metrics.health,
        metrics.synchronization,
      ],
    );

  /* ========================================================
     Root Classes
  ======================================================== */

  const rootClassName =
    useMemo(
      () =>
        [
          "episteme-packet-flow",

          `is-organ-${activeOrgan.id}`,

          `is-next-${nextOrgan.id}`,

          `is-packet-${packet?.status ?? "idle"}`,

          `is-priority-${packet?.priority ?? "none"}`,

          packet
            ? "has-packet"
            : "has-no-packet",

          cycle.isSynchronizing
            ? "is-synchronizing"
            : "",

          cycle.isComplete
            ? "is-cycle-complete"
            : "",

          status.hasError
            ? "has-system-error"
            : "",

          className,
        ]
          .filter(Boolean)
          .join(" "),
      [
        activeOrgan.id,
        nextOrgan.id,
        packet,
        packet?.status,
        packet?.priority,
        cycle.isSynchronizing,
        cycle.isComplete,
        status.hasError,
        className,
      ],
    );

  return (
    <div
      className={rootClassName}
      style={rootStyle}

      data-packet-id={
        packet?.id ?? "none"
      }

      data-packet-status={
        packet?.status ?? "idle"
      }

      data-packet-type={
        packet?.type ?? "none"
      }

      data-packet-priority={
        packet?.priority ?? "none"
      }

      data-packet-from={
        packet?.from ??
        activeOrgan.id
      }

      data-packet-to={
        packet?.to ??
        nextOrgan.id
      }

      data-active-organ={
        activeOrgan.id
      }

      data-next-organ={
        nextOrgan.id
      }

      data-cycle-number={
        String(cycle.number)
      }

      data-cycle-progress={
        String(cycle.progress)
      }

      data-synchronizing={
        String(
          cycle.isSynchronizing,
        )
      }

      aria-label="Episteme Knowledge Packet Flow"
    >
      {/* ===================================================
          Circular intelligence route
      =================================================== */}

      <div
        className="episteme-packet-route"
        aria-hidden="true"
      >
        <span className="episteme-packet-orbit orbit-outer" />

        <span className="episteme-packet-orbit orbit-middle" />

        <span className="episteme-packet-orbit orbit-inner" />

        <span className="episteme-packet-route-glow" />

        {showReturnPath && (
          <span className="episteme-packet-return-path" />
        )}
      </div>

      {/* ===================================================
          Six Organ anchors
      =================================================== */}

      {showOrganAnchors && (
        <div
          className="episteme-packet-organs"
          aria-hidden="true"
        >
          {ORGAN_FLOW.map(
            (organ) => {
              const runtimeOrgan =
                organs.organs[
                  organ.id
                ];

              const isActive =
                organ.id ===
                activeOrgan.id;

              const isNext =
                organ.id ===
                nextOrgan.id;

              const isPrevious =
                organ.id ===
                previousOrgan?.id;

              const isCompleted =
                completedOrganSet.has(
                  organ.id,
                );

              return (
                <span
                  key={organ.id}
                  className={[
                    "episteme-packet-organ-anchor",

                    `organ-anchor-${organ.index + 1}`,

                    isActive
                      ? "is-active"
                      : "",

                    isNext
                      ? "is-next"
                      : "",

                    isPrevious
                      ? "is-previous"
                      : "",

                    isCompleted
                      ? "is-completed"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}

                  data-organ-id={
                    organ.id
                  }

                  data-organ-index={
                    String(
                      organ.index,
                    )
                  }

                  data-organ-state={
                    runtimeOrgan.runtimeStatus
                  }

                  data-organ-intelligence={
                    runtimeOrgan.intelligenceStatus
                  }

                data-organ-pending-packets={
  String(
    runtime.queue.items.filter(
      (packet) =>
        packet.to ===
          runtimeOrgan.definition.id &&
        (
          packet.status === "created" ||
          packet.status === "queued"
        ),
    ).length,
  )
}
                >
                  <i />

                  <b>
                    {organ.numeral}
                  </b>

                  <small>
                    {organ.title}
                  </small>
                </span>
              );
            },
          )}
        </div>
      )}

      {/* ===================================================
          Moving Knowledge Packet
      =================================================== */}

      <div
        className="episteme-knowledge-packet"
        aria-hidden="true"
      >
        <span className="episteme-packet-tail tail-1" />

        <span className="episteme-packet-tail tail-2" />

        <span className="episteme-packet-tail tail-3" />

        <span className="episteme-packet-halo halo-outer" />

        <span className="episteme-packet-halo halo-inner" />

        <span className="episteme-packet-core">
          <i />
        </span>

        <span className="episteme-packet-ripple ripple-1" />

        <span className="episteme-packet-ripple ripple-2" />

        <span className="episteme-packet-ripple ripple-3" />
      </div>

      {/* ===================================================
          DNA vertical transit signal
      =================================================== */}

      <div
        className="episteme-dna-packet-transit"
        aria-hidden="true"
      >
        <span className="dna-packet-beam" />

        <span className="dna-packet-photon photon-1" />

        <span className="dna-packet-photon photon-2" />

        <span className="dna-packet-photon photon-3" />

        <span className="dna-packet-photon photon-4" />
      </div>

      {/* ===================================================
          Active connection
      =================================================== */}

      <div
        className="episteme-active-connection"
        aria-hidden="true"
      >
        <span className="connection-line" />

        <span className="connection-energy energy-1" />

        <span className="connection-energy energy-2" />

        <span className="connection-energy energy-3" />
      </div>

      {/* ===================================================
          Packet runtime label
      =================================================== */}

      {showPacketLabel && (
        <aside
          className="episteme-packet-label"
          aria-live="polite"
        >
          <header>
            <span>
              KNOWLEDGE PACKET
            </span>

            <i
              className={`priority-${packet?.priority ?? "none"}`}
            >
              {getPriorityLabel(
                packet?.priority,
              )}
            </i>
          </header>

          <strong>
            {packetTitle}
          </strong>

          <p>
            {packetStateLabel}
          </p>

          <div className="episteme-packet-route-label">
            <span>
              {activeOrgan.numeral}
              {" "}
              {activeOrgan.title}
            </span>

            <i aria-hidden="true">
              →
            </i>

            <span>
              {nextOrgan.numeral}
              {" "}
              {nextOrgan.title}
            </span>
          </div>

          <dl>
            <div>
              <dt>
                Confidence
              </dt>

              <dd>
                {Math.round(
                  confidence,
                )}
                %
              </dd>
            </div>

            <div>
              <dt>
                Importance
              </dt>

              <dd>
                {Math.round(
                  importance,
                )}
                %
              </dd>
            </div>

            <div>
              <dt>
                Relevance
              </dt>

              <dd>
                {Math.round(
                  relevance,
                )}
                %
              </dd>
            </div>
          </dl>

          <div
            className="episteme-packet-progress"
            aria-hidden="true"
          >
            <span
              style={
                {
                  "--packet-label-progress":
                    `${clampPercentage(
                      cycle.progress,
                    )}%`,
                } as CSSProperties
              }
            />
          </div>

          <footer>
            <span>
              Cycle {cycle.number}
            </span>

            <span>
              {Math.round(
                cycle.progress,
              )}
              %
            </span>
          </footer>
        </aside>
      )}
      
    </div>
  );
}