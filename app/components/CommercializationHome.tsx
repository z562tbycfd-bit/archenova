import Link from "next/link";

export default function CommercializationHome() {
  return (
    <Link href="/commercialization" className="plaza-card">
      <div className="plaza-title">Social Implementation of Science</div>
      <div className="plaza-desc">
        — Where scientific capability becomes institutional adoption,
        public value, scalable systems, and irreversible social infrastructure
      </div>
      <div className="plaza-hint">Enter →</div>
    </Link>
  );
}