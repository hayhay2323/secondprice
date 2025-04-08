/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 靜態導出設置，始終為 'export' 以確保一致性
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  trailingSlash: true,
  // 確保 Next.js 不會嘗試使用伺服器功能
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
}

module.exports = nextConfig 