import "../styles/globals.css";
import Menu from "./components/Menu";
import ScrollFX from "./components/ScrollFX";
import PageTransition from "./components/PageTransition"; // 追加

export const metadata = {
  title: "ArcheNova",
  description:
    "What ArcheNova addresses is not ideas or predictions, but the initial conditions(Arche) that generate irreversible outcomes, and their continuous renewal(Nova).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
  <ScrollFX />
  <header className="site-header">
    <Menu />
  </header>
  {children}
</body>
    </html>
  );
}
