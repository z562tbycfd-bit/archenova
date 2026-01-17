import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>ArcheNova</h1>

      <p>Engineering irreversibility into knowledge and infrastructure.</p>

      <p>
        <Link href="/log">Log</Link> ・{" "}
        <Link href="/papers">Archive</Link> ・{" "}
        <a
          href="https://x.com/ArcheNova_X"
          target="_blank"
          rel="noreferrer"
        >
          Contact on X
        </a>
      </p>
    </main>
  );
}
