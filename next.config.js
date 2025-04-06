/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/secondprice' : '',
  trailingSlash: true,
}

module.exports = nextConfig 