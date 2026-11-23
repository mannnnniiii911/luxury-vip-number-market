/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@luxury-vip/shared-types'],
  experimental: {
    // Enable server actions if needed in future
  },
};

module.exports = nextConfig;
