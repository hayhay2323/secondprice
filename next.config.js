/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 啟用靜態導出
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  // GitHub Pages配置，僅在生產環境中使用
  assetPrefix: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  trailingSlash: true,
}

module.exports = nextConfig 