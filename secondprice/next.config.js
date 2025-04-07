/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 啟用靜態導出
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  trailingSlash: true,
  // 環境變數
  env: {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://secondprice-api.example.com' // 替換為實際生產API URL
      : 'http://localhost:5000'
  }
}

module.exports = nextConfig 