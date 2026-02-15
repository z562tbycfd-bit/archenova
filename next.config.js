/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",      // ← GitHub Pages 用に静的出力
  trailingSlash: true,   // ← /home → /home/ (index.html) を作る
  images: { unoptimized: true },
};

module.exports = nextConfig;