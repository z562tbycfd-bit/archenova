"use client";

import OryvanthConstructionSystem from "./OryvanthConstructionSystem";
import type { ReactNode } from "react";

type Props = {
  overview?: ReactNode;
  operations?: ReactNode;
  integrity?: ReactNode;
  continuity?: ReactNode;
};

/** Oryvanth owns one non-duplicated four-workspace interface. Legacy props
 * remain accepted for compatibility with app/home/page.tsx. */
export default function ArcheNovaCivilizationOSFrame(_props: Props) {
  return (
    <div className="an-os-frame">
      <OryvanthConstructionSystem />
    </div>
  );
}
