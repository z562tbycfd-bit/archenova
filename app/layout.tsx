import "../styles/globals.css";
import Menu from "./components/Menu";

export const metadata = {
  title: "ArcheNova",
  description:
    "What ArcheNova addresses is not ideas or predictions, but the initial conditions(Arche) that generate irreversible outcomes, and their continuous renewal(Nova).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* ✅ 固定背景（PCもモバイルも同じ挙動） */}
        <div className="site-bg" aria-hidden="true" />
        <div className="site-vignette" aria-hidden="true" />

        <header className="site-header">
          <Menu />
        </header>

        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
