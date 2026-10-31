import type { Metadata } from "next";
import CivilizationOSWorkspace from "../components/civilization-os/CivilizationOSWorkspace";

export const metadata: Metadata = {
  title: "Civilization OS | ArcheNova",
  description: "A reproducible research workspace for civilization-scale water and energy resilience.",
};

export default function CivilizationOSPage() {
  return <CivilizationOSWorkspace />;
}
