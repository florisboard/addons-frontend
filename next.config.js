/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  async redirects() {
    return [
      { source: '/login', destination: '/auth', permanent: false },
      { source: '/register', destination: '/auth', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'localhost' },
      { hostname: 's3.addons.florisboard.org' },
    ],
  },
};

module.exports = nextConfig;
