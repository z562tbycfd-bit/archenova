import "../styles/globals.css";
import "../styles/galaxy-atlas.css";
import "../styles/civilization-intelligence.css";

import Menu from "./components/Menu";
import SiteBackground from "./components/SiteBackground";

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
        <SiteBackground />

        <header className="site-header">
          <Menu />
        </header>

        <div className="site-content">
          {children}
        </div>
      </body>
    </html>
  );

}
