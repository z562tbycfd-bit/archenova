import Space3DCanvas from "../components/Space3DCanvas";
import Link from "next/link";

export default function Page() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Quantum &amp; Gravity Space (3D)</h1>
        <p className="page-lead">
          Rotate the cold vacuum. No narration — only structure.
        </p>
      </div>

      <div className="glass-block">
        <Space3DCanvas />
      </div>

      <div className="page-foot">
        <Link className="back-link" href="/home">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}