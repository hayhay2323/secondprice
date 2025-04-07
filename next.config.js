/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'
const repoName = 'secondprice'

const nextConfig = {
  reactStrictMode: true,
  // 啟用靜態導出
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // 確保在 GitHub Pages 上正確加載資源
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
  trailingSlash: true,
  // 確保在生產環境中正確處理樣式
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // 確保靜態資源正確加載
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 