// This enables the webpack bundle analyzer for Next.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  turbopack: {
    root: __dirname,
  },
});

module.exports = nextConfig;
