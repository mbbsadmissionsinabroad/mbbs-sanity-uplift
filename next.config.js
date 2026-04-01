/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next-fresh",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

module.exports = nextConfig;
