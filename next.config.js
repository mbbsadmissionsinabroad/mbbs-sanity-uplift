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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://www.google.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https: wss:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com; media-src 'self' blob: https:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self' https:; upgrade-insecure-requests",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/_next/static/chunks/app/layout-29a6323b7b1a3690.js",
        destination: "/_next/static/chunks/app/layout-3c1cc424ac46a7c7.js",
        permanent: true,
      },
      {
        source: "/_next/static/chunks/webpack-99b0370b468ae749.js",
        destination: "/_next/static/chunks/webpack-23d8c933bc30247a.js",
        permanent: true,
      },
      {
        source: "/contact",
        has: [
          {
            type: "query",
            key: "interest",
          },
        ],
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/nursing-jobs-in-germany",
        destination: "/nursing-job-in-germany",
        permanent: true,
      },
      {
        source: "/medical-pg-in-europe",
        destination: "/medical-pg-in-europe-for-indian-students",
        permanent: true,
      },
      {
        source: "/bsc-nursing",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/mbbs-without-neet",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/mbbs-in-germany",
        destination: "/mbbs-admission-in-germany-for-indian-students",
        permanent: true,
      },
      {
        source: "/mbbs-admission-in-bangladesh",
        destination: "/mbbs-admission-in-bangladesh-for-indian-students",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
