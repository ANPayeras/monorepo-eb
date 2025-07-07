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
  assetPrefix: "/view",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/view/_next/:path*",
          destination: "/_next/:path*",
        },
        {
          source: "/oli/static/:path*",
          destination: "https://us-assets.i.posthog.com/static/:path*",
        },
        {
          source: "/oli/:path*",
          destination: "https://us.i.posthog.com/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
