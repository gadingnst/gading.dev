/* @ts-check */
/* eslint-disable @typescript-eslint/no-var-requires */
const headers = require('./headers.config');
const webpack = require('./webpack.config');

/** @see https://nextjs.org/docs/api-reference/next.config.js/introduction */
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers,
  webpack,
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en'
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      'res.cloudinary.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net'
      }
    ],
    minimumCacheTTL: 60 * 60 * 24
  }
};

module.exports = nextConfig;
