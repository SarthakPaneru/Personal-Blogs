/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blogs',
  assetPrefix: '/blogs',
  async rewrites() {
    return [
      {
        source: '/sp/:id',
        destination: '/blogs/:id',
        basePath: undefined,

      },

    ]
  },
};

module.exports = nextConfig;
