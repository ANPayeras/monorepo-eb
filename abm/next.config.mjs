/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/t/:user/:path*",
        destination: `http://localhost:3001/t/:user/:path*`,
      },
      {
        source: "/test/:user/:path*",
        destination: `http://localhost:3001/test/:user/:path*`,
      },
      {
        source: '/view/:path*',
        destination: `http://localhost:3001/view/:path*`,
      },
    ];
  },
};

export default nextConfig;
