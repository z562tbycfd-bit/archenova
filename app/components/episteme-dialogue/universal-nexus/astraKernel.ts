import type { UniversalRouteDecision } from "./mode";

export type AstraKernelPolicy = {
  path: "LIGHT" | "ASTRA" | "ASTRA_WITH_IMPLEMENTATION";
  preserveCaseIsolation: boolean;
  requireEvidenceContract: boolean;
  requireCounterevidence: boolean;
  requireRealityTest: boolean;
  requireImplementationTranslation: boolean;
  allowBoundedRelease: boolean;
  principle: string;
};

export function selectAstraKernelPolicy(
  route: UniversalRouteDecision,
): AstraKernelPolicy {
  if (!route.requiresAstraKernel) {
    return {
      path: "LIGHT",
      preserveCaseIsolation: true,
      requireEvidenceContract: false,
      requireCounterevidence: false,
      requireRealityTest: false,
      requireImplementationTranslation: false,
      allowBoundedRelease: true,
      principle: "Use the lightest sufficient reasoning path; do not manufacture process where direct explanation is enough.",
    };
  }

  const implementation = route.implementationOrientation || route.resolvedMode === "DEPLOY";

  return {
    path: implementation ? "ASTRA_WITH_IMPLEMENTATION" : "ASTRA",
    preserveCaseIsolation: true,
    requireEvidenceContract: true,
    requireCounterevidence: route.depth >= 4,
    requireRealityTest: route.depth >= 3,
    requireImplementationTranslation: implementation,
    allowBoundedRelease: true,
    principle:
      "Astra is the deep-reasoning kernel, not a compulsory presentation layer. It preserves object identity, evidence boundaries, correction, and reality veto while the Universal Nexus adapts the experience around it.",
  };
}
