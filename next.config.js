/* eslint-disable @typescript-eslint/no-var-requires */
const headers = require('./headers.config');
const webpack = require('./webpack.config');

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
    domains: ['raw.githubusercontent.com', 'res.cloudinary.com'],
    minimumCacheTTL: 60 * 60 * 24
  }
};

module.exports = nextConfig;
