import Link from "next/link";
import ArcheNovaCosmos from "../components/ArcheNovaCosmos";

export default function ArcheNovaPage() {
  return (
    <main className="archenova-cosmos-page">
      <ArcheNovaCosmos />

      <div className="archenova-cosmos-overlay">
        <span className="home-section-label">
          ARCHENOVA
        </span>

        <h1>ArcheNova</h1>

        <p>
          Reality → Knowledge → Constraint → Design → Infrastructure →
          Civilization
        </p>

        <Link href="/home" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}