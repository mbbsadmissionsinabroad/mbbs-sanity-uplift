/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/nursing-jobs-in-germany",
        destination: "/nursing-job-in-germany",
        permanent: true,
      },
      {
        source: "/nursing-jobs-in-abroad",
        destination: "/contact?interest=nursing-jobs-in-abroad",
        permanent: true,
      },
      {
        source: "/pg-in-abroad",
        destination: "/contact?interest=pg-in-abroad",
        permanent: true,
      },
      {
        source: "/medical-pg-in-europe",
        destination: "/medical-pg-in-europe-for-indian-students",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
