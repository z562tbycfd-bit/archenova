"use client";

/* ==========================================================
   ArcheNova
   Civilization Intelligence Runtime

   File:
   app/civilization-intelligence/
   CivilizationIntelligenceRuntime.tsx

   Responsibilities:
   - Create the Episteme Runtime boundary
   - Create Store / Engine / Scheduler through Provider
   - Connect Runtime state to the Kernel Bridge
   - Render the Civilization Intelligence visual system
========================================================== */

import CivilizationIntelligenceDNA from "@/app/components/civilization-intelligence/CivilizationIntelligenceDNA";
import EpistemeKernelBridge from "@/app/components/civilization-intelligence/EpistemeKernelBridge";
import EpistemeProvider from "@/app/components/civilization-intelligence/EpistemeProvider";

/* ==========================================================
   Component
========================================================== */

export default function CivilizationIntelligenceRuntime() {
  return (
    <EpistemeProvider
      autoStart
      ingestInitialPacket
      stopOnUnmount
      destroyOnUnmount
      preserveArchiveOnReset
      config={{
        store: {
          maxQueueSize: 250,

          maxArchiveSize: 500,

          maxEventHistory: 200,

          maxErrorHistory: 100,

          initialConfidence: 45,

          preserveArchiveOnReset: true,

          enableDebugLogging: false,
        },

        engine: {
          confidenceGrowth: 7,

          relevanceGrowth: 3,

          importanceGrowth: 2,

          archiveCompletedPackets: true,
        },

        scheduler: {
          mode: "automatic",

          autoStart: false,

          initialDelayMs: 800,

          organIntervalMs: 2200,

          cycleIntervalMs: 1400,

          synchronizationMs: 1600,

          generatePacketsWhenIdle: false,

          pauseWhenHidden: true,

          resumeWhenVisible: true,
        },
      }}
      onRuntimeError={(error) => {
        console.error(
          "[CivilizationIntelligenceRuntime] Runtime failure:",
          error,
        );
      }}
    >
      <EpistemeKernelBridge
        bridgeId="civilization-intelligence-kernel"
        ariaLabel="ArcheNova Civilization Intelligence"
        announceRuntimeState
        motionEnabled
      >
        <CivilizationIntelligenceDNA />
      </EpistemeKernelBridge>
    </EpistemeProvider>
  );
}