/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'localhost' },
      { hostname: 'api.addons.florisboard.org' },
    ],
  },
};

module.exports = nextConfig;
