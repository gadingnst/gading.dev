/* eslint-disable @typescript-eslint/no-var-requires */

const { withAxiom } = require('next-axiom');

/** @type {import('next').NextConfig} */
const nextConfig = {
  dir: './src',
  reactStrictMode: true,
  webpack5: true,
  pageExtensions: ['ts', 'tsx'],
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['raw.githubusercontent.com', 'res.cloudinary.com'],
    minimumCacheTTL: 60 * 60 * 24 * 30
  },
  headers: () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};

module.exports = withAxiom(nextConfig);
