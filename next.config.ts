import type { NextConfig } from 'next';

import headers from './headers.config';
import webpack from './webpack.config';

const nextConfig: NextConfig = {
  /* config options here */
  headers,
  webpack
};

export default nextConfig;
