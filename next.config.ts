 
import type { NextConfig } from 'next';

const webpack = require('./webpack.config');

const isStatic = process.env.IS_STATIC === 'true';

const nextConfig: NextConfig = {
  /* config options here */
  webpack,
  output: isStatic ? 'export' : undefined,
  images: isStatic ? { unoptimized: true } : undefined
};

if (!isStatic) {
  const headers = require('./headers.config');
  nextConfig.headers = headers;
}

export default nextConfig;
