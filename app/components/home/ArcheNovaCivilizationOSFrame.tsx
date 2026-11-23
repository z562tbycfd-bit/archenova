"use client";
import OryvanthCivilizationWorkbench from "./OryvanthCivilizationWorkbench";

/** Single coherent civilization-design workbench. No duplicated legacy panels. */
export default function ArcheNovaCivilizationOSFrame() {
  return (
    <div className="an-os-frame">
      <OryvanthCivilizationWorkbench />
    </div>
  );
}
