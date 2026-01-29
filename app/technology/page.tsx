export const dynamic = "force-dynamic";

type Item = {
  title: string;
  summary?: string;
  url: string;
  source: string;
  group: string;
  ts?: number;
};

type GroupBlock = {
  groupTitle: string;
  observation: string;
  items: Item[];
  links?: { label: string; url: string; note?: string }[];
};

async function getData(): Promise<{ ok: boolean; updatedAt?: string; blocks: GroupBlock[] }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/technology?mode=full`, {
      cache: "no-store",
    });

    // Vercel本番では NEXT_PUBLIC_SITE_URL が空でも /api が動くように
    if (!res.ok) {
      const res2 = await fetch(`/api/technology?mode=full`, { cache: "no-store" });
      return await res2.json();
    }

    return await res.json();
  } catch {
    // クライアントではなくサーバーなので、失敗時は空
    return { ok: false, blocks: [] };
  }
}

export default async function TechnologyPage() {
  const data = await getData();
  const blocks = data?.blocks ?? [];

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Technology</h1>
        <p className="page-lead">
          A curated observation surface for irreversible shifts — where systems outrun oversight.
        </p>
        <p className="page-lead" style={{ marginTop: 8, opacity: 0.75 }}>
          Updated: {data?.updatedAt ?? "—"}
        </p>
      </div>

      {blocks.map((b) => (
        <section key={b.groupTitle} className="glass-block">
          <h2>{b.groupTitle}</h2>
          <p className="text">
            <strong>Observation point:</strong> {b.observation}
          </p>

          {b.links?.length ? (
            <div className="diagram-stack" style={{ marginTop: 10 }}>
              {b.links.map((l) => (
                <a key={l.url} className="stack-item ok" href={l.url} target="_blank" rel="noreferrer">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "rgba(245,245,245,0.90)" }}>{l.label}</span>
                    <span style={{ color: "rgba(245,245,245,0.55)" }}>↗</span>
                  </div>
                  {l.note ? <div style={{ marginTop: 6, color: "rgba(245,245,245,0.62)" }}>{l.note}</div> : null}
                </a>
              ))}
            </div>
          ) : null}

          <div className="tech-grid">
            {b.items?.length ? (
              b.items.slice(0, 10).map((it) => (
                <a key={it.url} className="tech-card" href={it.url} target="_blank" rel="noreferrer">
                  <div className="tech-card-meta">
                    <span className="tech-card-source">{it.source}</span>
                  </div>
                  <div className="tech-card-title">{it.title}</div>
                  {it.summary ? <div className="tech-card-summary">{it.summary}</div> : null}
                </a>
              ))
            ) : (
              <div className="text dim">No items could be fetched from this surface right now.</div>
            )}
          </div>
        </section>
      ))}

      <div className="page-foot">
        <a className="back-link" href="/">← Back</a>
      </div>
    </main>
  );
}