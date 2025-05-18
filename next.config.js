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
  // Explicitly configure webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Return the modified config
    return config;
  }
}

module.exports = nextConfig