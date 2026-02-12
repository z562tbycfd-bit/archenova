"use client";

import { useSearchParams } from "next/navigation";
import Space3DCanvas from "./Space3DCanvas";

export default function Space3D() {
  const sp = useSearchParams();
  const domain = sp.get("domain") || "quantum";
  const code = sp.get("code") || "";

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Space (3D)</h1>
        <p className="page-lead">
          A cold vacuum you can rotate. The shape subtly shifts with your Observatory result.
        </p>
      </div>

      <div className="glass-block">
        <Space3DCanvas domain={domain} code={code} />
        <p className="text dim" style={{ marginTop: 12 }}>
          Domain: <strong>{domain}</strong> / Code: <strong>{code || "—"}</strong>
        </p>
      </div>
    </main>
  );
}