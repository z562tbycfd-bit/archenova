import "../styles/globals.css";

export const metadata = {
  title: "ArcheNova",
  description: "Engineering irreversibility into knowledge and infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
