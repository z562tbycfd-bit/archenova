import Link from "next/link";
import { getAllEntries } from "@/lib/content";

export default function PapersPage() {
  const items = getAllEntries("papers") as any[];

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Archive (PDF)</h1>
      <p>A curated PDF library of ArcheNova notes and references.</p>

      <ul>
        {items.map((p) => (
          <li key={p.slug} style={{ marginBottom: 14 }}>
            <b>{p.title}</b>
            {p.date ? <div style={{ opacity: 0.7 }}>{p.date}</div> : null}
            {p.summary ? <div style={{ opacity: 0.9 }}>{p.summary}</div> : null}
            {p.pdf ? (
              <div>
                <a href={p.pdf} target="_blank" rel="noreferrer">
                  Open PDF →
                </a>
              </div>
            ) : (
              <div style={{ opacity: 0.7 }}>PDF not set</div>
            )}
          </li>
        ))}
      </ul>

      <p>
        <Link href="/">← Back</Link>
      </p>
    </div>
  );
}
