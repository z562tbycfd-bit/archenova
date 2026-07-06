import Parser from "rss-parser";

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
};

const parser: Parser<any, FeedItem> = new Parser({
  timeout: 12000,
});

function pickDate(it: FeedItem) {
  return it.isoDate || it.pubDate || "";
}

function fmtDate(d: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
}

async function loadFeed(url: string, take = 8) {
  // Next.jsのfetchキャッシュ（本番で自動更新）
  const res = await fetch(url, { next: { revalidate: 600 } }); // 10分更新
  if (!res.ok) return [];
  const xml = await res.text();
  const feed = await parser.parseString(xml);
  return (feed.items || []).slice(0, take);
}

export default async function ScienceTechPage() {
  // フィードURL（現実的に安定している代表例）
  // Nature（マルチディシプリナリ）
  const NATURE = "http://feeds.nature.com/nature/rss/current";
  // APS - Physical Review Letters (Recent)
  const PRL = "http://feeds.aps.org/rss/recent/prl.xml";

  // Science はサイト側がブロックする場合があるため、まずは「Science News RSS」を使うのが安定。
  // 将来、ScienceのeTOC(RSS)が取れる状態なら差し替え可能。
  const SCIENCE_NEWS = "https://www.sciencemag.org/rss/news_current.xml";

  const [nature, science, prl] = await Promise.all([
    loadFeed(NATURE, 8),
    loadFeed(SCIENCE_NEWS, 8),
    loadFeed(PRL, 8),
  ]);

  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Science & Tech</h1>
        <p className="page-lead">
          A scrolling, living window into the latest signals from Nature, Science, and APS (PRL).
          Updated automatically.
        </p>
      </div>

      <section className="feed-grid">
        <div className="feed-col glass-block">
          <div className="feed-col-head">
            <h2>Nature</h2>
            <a className="inline-link" href="https://www.nature.com" target="_blank" rel="noreferrer">
              Open →
            </a>
          </div>

          <div className="feed-list">
            {nature.map((it, idx) => (
              <a
                key={it.link || idx}
                className="feed-item"
                href={it.link || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <div className="feed-title">{it.title || "Untitled"}</div>
                <div className="feed-meta">
                  <span>{fmtDate(pickDate(it))}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="feed-col glass-block">
          <div className="feed-col-head">
            <h2>Science</h2>
            <a className="inline-link" href="https://www.science.org/journal/science" target="_blank" rel="noreferrer">
              Open →
            </a>
          </div>

          <div className="feed-list">
            {science.map((it, idx) => (
              <a
                key={it.link || idx}
                className="feed-item"
                href={it.link || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <div className="feed-title">{it.title || "Untitled"}</div>
                <div className="feed-meta">
                  <span>{fmtDate(pickDate(it))}</span>
                </div>
              </a>
            ))}
          </div>

          <p className="text dim" style={{ marginTop: 12 }}>
            Note: Some Science journal feeds can be blocked; this uses a stable Science RSS source first.
          </p>
        </div>

        <div className="feed-col glass-block">
          <div className="feed-col-head">
            <h2>APS (PRL)</h2>
            <a className="inline-link" href="https://journals.aps.org/prl/" target="_blank" rel="noreferrer">
              Open →
            </a>
          </div>

          <div className="feed-list">
            {prl.map((it, idx) => (
              <a
                key={it.link || idx}
                className="feed-item"
                href={it.link || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <div className="feed-title">{it.title || "Untitled"}</div>
                <div className="feed-meta">
                  <span>{fmtDate(pickDate(it))}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="page-foot">
        <a className="back-link" href="/">← Back to Home</a>
      </div>
    </main>
  );
}