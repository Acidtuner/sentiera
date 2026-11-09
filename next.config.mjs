/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonical host is sentieratech.com (non-www). Permanent (308) redirect
      // for any request that reaches the app on the www host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sentieratech.com" }],
        destination: "https://sentieratech.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
