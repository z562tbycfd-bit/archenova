"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Space3DCanvas from "./Space3DCanvas";

export default function Space3D() {
  const [params, setParams] = useState({
    domain: "quantum",
    code: "",
  });

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const domain = search.get("domain") === "gravity" ? "gravity" : "quantum";
    const code = search.get("code") || "";

    setParams({ domain, code });
  }, []);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Space (3D)</h1>
        <p className="page-lead">
          A cold vacuum you can rotate. The shape subtly shifts with your Observatory result.
        </p>
      </div>

      <div className="glass-block">
        <Space3DCanvas domain={params.domain} code={params.code} />

        <p className="text dim" style={{ marginTop: 12 }}>
          Domain: <strong>{params.domain}</strong> / Code:{" "}
          <strong>{params.code || "—"}</strong>
        </p>

        <div className="page-foot" style={{ marginTop: 18 }}>
          <Link className="back-link" href="/observatory">
            ← Back to Observatory
          </Link>
        </div>
      </div>
    </main>
  );
}