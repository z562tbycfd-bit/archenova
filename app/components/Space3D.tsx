"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Space3DCanvas = dynamic(() => import("./Space3DCanvas.jsx"), { ssr: false });

type Domain = "quantum" | "gravity";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function hashTo01(input: string) {
  // deterministic 0..1
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) h = (h ^ input.charCodeAt(i)) * 16777619;
  h >>>= 0;
  return (h % 10000) / 10000;
}

function parseABVector(code: string) {
  // code example: Q-ABBA  or G-AABB
  const seq = code.split("-")[1] ?? "";
  const bits = seq.split("").map((c) => (c === "A" ? 1 : c === "B" ? 0 : 0.5));
  while (bits.length < 4) bits.push(0.5);
  return bits.slice(0, 4);
}

export default function Observatory() {
  const sp = useSearchParams();
  const domain = (sp.get("domain") as Domain) || "quantum";
  const code = sp.get("code") || (domain === "quantum" ? "Q-____" : "G-____");

  const params = useMemo(() => {
    const v = parseABVector(code);
    const seed = hashTo01(domain + ":" + code);

    // v[0..3] を「形状・密度・圧・回転」の軸に割り当て
    // A=1（irreversible/constraint寄り）, B=0（coherence/governance寄り）
    const constraintBias = (v[0] + v[1] + v[2] + v[3]) / 4; // 0..1

    // Domainで雰囲気を変える
    const baseStars = domain === "quantum" ? 1800 : 1400;

    return {
      domain,
      code,
      seed,
      // 3D演出パラメータ
      starCount: Math.round(baseStars * (0.75 + constraintBias * 0.7)), // 70%〜145%
      ringCount: domain === "quantum" ? Math.round(1 + v[1] * 3) : Math.round(2 + v[2] * 3),
      coreDetail: Math.round(1 + v[0] * 3), // 1..4
      coreRadius: 1.05 + v[3] * 0.45,       // 1.05..1.5
      pressure: 0.55 + constraintBias * 0.9, // “圧” 0.55..1.45
      drift: 0.06 + (1 - v[2]) * 0.08,       // 0.06..0.14
      cameraZ: clamp(7.4 - constraintBias * 1.6, 5.6, 7.6), // 近づくほど圧
    };
  }, [domain, code]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Space (3D)</h1>
        <p className="page-lead">
          This space is not a visualization of answers. It is a deformation driven by what you fixed.
          The more constraints you selected, the more the geometry loses exits.
        </p>
      </div>

      <div className="glass-block" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div className="contact-manifest-line" style={{ margin: 0 }}>
            DOMAIN: {params.domain.toUpperCase()}
          </div>
          <div className="contact-manifest-line" style={{ margin: 0, opacity: 0.8 }}>
            CODE: {params.code}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <Space3DCanvas domain={params.domain} code={params.code} />

        </div>  

        <div className="page-foot" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="back-link" href="/observatory">← Back to Observatory</Link>
        </div>
      </div>
    </main>
  );
}