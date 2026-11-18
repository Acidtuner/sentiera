/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "sentieratech.com" }],
        destination: "https://www.sentieratech.com/:path*",
        permanent: true,
      },
      { source: "/services", destination: "/products", permanent: false },
      { source: "/engagements", destination: "/contact", permanent: false },
      { source: "/packages", destination: "/products", permanent: false },
    ];
  },
};

export default nextConfig;
