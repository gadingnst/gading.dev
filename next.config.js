/* eslint-disable @typescript-eslint/no-var-requires */

const withCacheControl = (params = []) => ([
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable'
  },
  ...params
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['raw.githubusercontent.com', 'res.cloudinary.com'],
    minimumCacheTTL: 60 * 60 * 24
  },
  webpack: (config) => {
    /**
     * handle SVGR module
     * @see https://react-svgr.com/docs/webpack/
     */
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [{
          loader: '@svgr/webpack',
          options: { typescript: true }
        }]
      }
    ];
    return config;
  },
  headers: () => {
    return [
      {
        source: '/assets/fonts/(.*)',
        headers: withCacheControl()
      },
      {
        source: '/assets/images/authors/(.*)',
        headers: withCacheControl()
      },
      {
        source: '/assets/media/banners/(.*)',
        headers: withCacheControl()
      },
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
