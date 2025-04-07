/** @type {import('next').NextConfig} */
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
  basePath: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  trailingSlash: true,
  // 確保在生產環境中正確處理樣式
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
}

module.exports = nextConfig 