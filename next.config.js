/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 啟用靜態導出
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 確保在 GitHub Pages 上正確加載資源
  basePath: '/secondprice',
  assetPrefix: '.', // 使用相對路徑
  trailingSlash: false,
}

module.exports = nextConfig 