/** @type {import('next').NextConfig} */
const nextConfig = {
  dir: './src',
  reactStrictMode: true,
  webpack5: true,
  pageExtensions: ['ts', 'tsx'],
  images: {
    domains: ['raw.githubusercontent.com']
  },
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en'
  },
  headers: () => {
    return [
      {
        source: '/(.*)',
        headers: [
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

module.exports = nextConfig;
