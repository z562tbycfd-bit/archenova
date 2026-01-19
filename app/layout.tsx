import "../styles/globals.css";
import Menu from "./components/Menu";

export const metadata = {
  title: "ArcheNova",
  description: "What ArcheNova addresses is not ideas or predictions, but the initial conditions(Arche) that generate irreversible outcomes, and their continuous renewal(Nova).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <Menu />
        </header>
        {children}
      </body>
    </html>
  );
}
