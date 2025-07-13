/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from 'next';

const headers = require('./headers.config');
const webpack = require('./webpack.config');

const nextConfig: NextConfig = {
  /* config options here */
  headers,
  webpack
};

export default nextConfig;
