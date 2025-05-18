/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Configure images for static export
  images: {
    unoptimized: true, // This disables the /_next/image URLs and uses direct image paths
  },
  // Explicitly configure webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize for production builds to Cloudflare
    if (!dev) {
      // Disable cache generation for production builds
      config.cache = false;
      
      // Minimize bundle size
      config.optimization.minimize = true;
    }
    
    // Return the modified config
    return config;
  },
  // Disable webpack cache for production builds
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
      'node_modules/@swc/**',
      'node_modules/esbuild/**',
      'node_modules/webpack/**',
      'cache/**'
    ],
  },
  // This tells Next.js to run in static export mode, which works better with Cloudflare
  output: 'export',
}

module.exports = nextConfig