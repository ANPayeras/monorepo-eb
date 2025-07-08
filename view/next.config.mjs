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
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/view/_next/:path*",
          destination: "/_next/:path*",
        },
        // {
        //   source: "/relay-KGAR/static/:path*",
        //   destination: "https://us-assets.i.posthog.com/static/:path*",
        // },
        // {
        //   source: "/relay-KGAR/:path*",
        //   destination: "https://us.i.posthog.com/:path*",
        // },
        // {
        //   source: "/relay-KGAR/flags",
        //   destination: "https://us.i.posthog.com/flags",
        // },
      ],
    };
  },
};

export default nextConfig;
