// app/components/LatestXPost.tsx
import Link from "next/link";

type Latest = {
  url: string;
  text: string;
};

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchLatest(): Promise<Latest | null> {
  // Xの埋め込みが使っている公式配信（認証不要）
  const endpoint =
    "https://cdn.syndication.twimg.com/widgets/timelines/profile?screen_name=ArcheNova_X&lang=en";

  const res = await fetch(endpoint, {
    // Vercelでのキャッシュ：更新頻度は好みで調整可（60秒推奨）
    next: { revalidate: 60 },
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json,text/plain,*/*",
    },
  });

  if (!res.ok) return null;

  const data = await res.json();

  // data.body にタイムラインHTMLが入ることが多い
  const body: string = data?.body ?? "";
  if (!body) return null;

  // 先頭のツイートURLを拾う（x.com / twitter.com 両対応）
  const m =
    body.match(/https:\/\/x\.com\/ArcheNova_X\/status\/\d+/) ??
    body.match(/https:\/\/twitter\.com\/ArcheNova_X\/status\/\d+/);

  const url = m?.[0];
  if (!url) return null;

  // 先頭ツイートの本文っぽい部分を抜く（完璧ではないが読みやすくする）
  // tweet本文は <p> ... </p> に入ることが多い
  const p = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const text = stripHtml(p?.[0] ?? "");

  return {
    url,
    text: text || "Open the latest post on X →",
  };
}

export default async function LatestXPost() {
  const latest = await fetchLatest();

  return (
    <section className="x-latest">
      <div className="x-head">
        <h2 className="x-title">Latest from X</h2>
        <a className="x-more" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
          View on X →
        </a>
      </div>

      <div className="x-card">
        {latest ? (
          <>
            <p className="x-text">{latest.text}</p>
            <Link className="x-link" href={latest.url} target="_blank">
              Open the post →
            </Link>
          </>
        ) : (
          <>
            <p className="x-text">
              Unable to fetch the latest post right now.
            </p>
            <a className="x-link" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
              Open on X →
            </a>
          </>
        )}
      </div>
    </section>
  );
}
