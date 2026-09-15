import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep tracing scoped to this app when a parent directory has its own lockfile.
  outputFileTracingRoot: path.join(__dirname),
};
export default nextConfig;
