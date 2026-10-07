import type { Metadata } from "next";

import {
  ContinuityProvider,
} from "./ContinuityProvider";

import ContinuityEnvironment from "./components/ContinuityEnvironment";


/* ==========================================================
   ARCHENOVA CONTINUITY
   PAGE

   Independent environment.

   Continuity is intentionally scoped to this route.
   It does not wrap the wider ArcheNova application.
========================================================== */


export const metadata: Metadata = {
  title:
    "Continuity — ArcheNova",

  description:
    "Where inquiry becomes cumulative capability. Preserve the question, reconnect evidence, continue reasoning, and convert understanding into defensible action.",
};


/* ==========================================================
   PAGE
========================================================== */

export default function ContinuityPage() {
  return (
    <ContinuityProvider>
      <ContinuityEnvironment />
    </ContinuityProvider>
  );
}