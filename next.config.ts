import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wonderful-kindness-cbe166af41.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wonderful-kindness-cbe166af41.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['@strapi/blocks-react-renderer'],
  },
};

export default nextConfig;