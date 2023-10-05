/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   contentDispositionType: "attachment",
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  //   domains: ["http://www.w3.org/2000/svg"],
  // },
  experimental: {
    serverActions: true,
  },
  unstable_allowDynamic: ['./node_modules/lodash/lodash.js'],
};

module.exports = nextConfig;
