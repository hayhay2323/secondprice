/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure for development mode without static export
  ...(process.env.NODE_ENV === 'development' ? {} : {
    // Static export settings for production
    output: 'export',
    images: {
      unoptimized: true,
    },
    // GitHub Pages configuration
    assetPrefix: '/secondprice',
    basePath: '/secondprice',
    trailingSlash: true,
  }),
  
  // Updated experimental section without the deprecated images option
  experimental: {
    // Remove deprecated images configuration
  }
}

module.exports = nextConfig 