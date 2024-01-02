/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: { remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }] },
};

module.exports = nextConfig;
