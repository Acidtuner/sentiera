/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/services", destination: "/products", permanent: false },
      { source: "/engagements", destination: "/contact", permanent: false },
      { source: "/packages", destination: "/products", permanent: false },
    ];
  },
};

export default nextConfig;
